<template>
  <ta-form :autoFormCreate="(form)=>{this.form = form}"
           layout="vertical">
    <ta-form-item fieldDecoratorId="username"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名!' }]}">
      <ta-input placeholder="用户名"
                @keyup.enter="handleSubmit">
        <ta-icon slot="prefix"
                 type="user" />
      </ta-input>
    </ta-form-item>
    <ta-form-item fieldDecoratorId="password"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码!' }]}">
      <ta-input placeholder="密码"
                type="password"
                style="width: 70%"
                @keyup.enter="handleSubmit"
                autocomplete="new-password">
        <ta-icon slot="prefix"
                 type="lock" />
      </ta-input>
      <ta-button @click="showModifyPasswordPane"
                 style="width: 30%; font-size: 12px; border:none; margin: 0; box-shadow: none;">密码修改</ta-button>
    </ta-form-item>
    <ta-form-item v-if="simpleCheckCodeState"
                  fieldDecoratorId="checkCode"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入验证码!' }]}">
      <ta-input style="width: 60%"
                placeholder="验证码"
                ref="checkCode"
                @keyup.enter="handleSubmit">
        <ta-icon slot="prefix"
                 type="appstore" />
      </ta-input>
      <img style="width: 40%"
           @click="refreshCode()"
           :src="imgSrc"
           title="点击获取验证码" />
    </ta-form-item>
    <div id="loginCheckCodeDiv"
         v-show="slideCheckCodeState">
      <div class="codeDragValidate-layout-div">
        <div class="codeDragBar-drag-div">
          <div class="codeDrag-win-div">
            <div class="codeDrag-win-div-body">
              <div class="codeDrag-bg-img-div">
                <img class="codeDrag-code-img"
                     src="#"
                     alt="背景图" />
                <img class="codeDrag-darg-img"
                     src="#"
                     alt="拖动图" />
              </div>
              <div class="codeDrag-code-refresh"></div>
            </div>
          </div>
          <div class="dragBar">
            <span></span>
          </div>
          <div class="dragBar-inDrag-bg"></div>
          <div class="dragBar-base-bg">
            <span>向右滑动确认修改</span>
          </div>
        </div>
      </div>
    </div>
    <ta-form-item>
      <ta-button id="sbbtn"
                 type="primary"
                 block
                 @click="handleSubmit"
                 @keyup.enter="handleSubmit">立即登录</ta-button>
    </ta-form-item>
  </ta-form>
</template>
<script>
import '../css/SlideCheckCode.less'
import pwdStr from '@yh/ta404-ui/es/utils/js/encryption'
import getCodeSrc from '../js/getCodeSrc'
import systemInfo from '../js/clientEnvironment'
import slideCheckCode from '../js/SlideCheckCode'
import { mapGetters } from 'vuex'
export default {
  name: 'loginForm',
  data () {
    return {
      imgSrc: getCodeSrc(),
      slideCode: null
    }
  },
  computed: {
    ...mapGetters({
      showSimpleCheckCode: 'showSimpleCheckCode',
      simpleCheckCodeState: 'simpleCheckCodeState',
      slideCheckCodeState: 'slideCheckCodeState',
      showSlideCheckCode: 'showSlideCheckCode',
      passwordRSAState: 'passwordRSAState'
    })
  },
  mounted () {
    document.getElementById('username').focus()

    if (this.showSlideCheckCode) {
      const obj = this
      this.slideCode = new SlideCheckCode('loginCheckCodeDiv', {
        successCallBack: function () {
          obj.handleSubmit()
        }
      })
    }
  },
  methods: {
    // checkUser
    checkUser (e) {
      const value = e.target.value
      if (value) {
        this.Base.submit(null, {
          url: 'loginRestService/checkUser',
          showPageLoading: false,
          withCredentials: false,
          data: {
            username: value
          }
        }).then((data) => {
          // 校验成功处理次数
          this.$store.commit('setSysCfg', {
            sessionPasswordErrorNumber: data.data.sessionPasswordErrorNumber
          })
        })
      }
    },
    refreshCode () {
      if (this.showSimpleCheckCode) {
        this.imgSrc = getCodeSrc()
      }

      if (this.showSlideCheckCode && this.slideCode != null) {
        this.slideCode.refreshSlideCheckCode()
      }
    },
    handleSubmit () {
      let formData = this.form.getFieldsValue()
      // 系统信息
      formData = Object.assign(formData, systemInfo)
      this.form.validateFields((err) => {
        if (!err) {
          // 用户名和密码去除两边空格
          formData.username = formData.username.trim()
          formData.password = formData.password.trim()
          // 加密
          this.passwordRSAState && (formData.password = pwdStr.encryptString(formData.password))
          // 处理同浏览器不同页面登录问题 start
          if (localStorage.getItem('loginId') && localStorage.getItem('loginId') != 'null') {
            if (localStorage.getItem('loginId') == formData.username) {
              this.$message.error('用户' + localStorage.getItem('userName') + '已在其他页面登录，请勿重复登录！')
            } else {
              this.$confirm({
                title: '登录通知',
                content: `已有用户${localStorage.getItem('userName')}在同一浏览器登录，您的操作将导致其退出系统。
            您确定重新登录吗？`,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                  this.Base.submit(
                    null,
                    {
                      url: '/login',
                      data: formData
                    }, { serviceCallback: (type, data) => { this.serviceCallback(type, data) } })
                    .then(() => {
                      window.location.href = 'index.html'
                      // 登录前清空sessionStorage的数据，防止缓存影响字典及地址的显示问题
                      sessionStorage.clear()
                    })
                    .catch((err) => {
                      if (!err.errors) {
                        window.location.href = '500.html'
                      } else {
                        err.data.passwordDefaultNum !== null &&
                          this.$store.commit('setSysCfg', {
                            sessionPasswordErrorNumber: err.data.passwordDefaultNum
                          })
                        this.refreshCode()
                      }
                    })
                },
                onCancel: () => { }
              })
            }
            // 处理同浏览器不同页面登录问题 end
          } else {
            this.Base.submit(
              null,
              {
                url: '/login',
                data: formData
              }, { serviceCallback: (type, data) => { this.serviceCallback(type, data) } })
              .then(() => {
                window.location.href = 'index.html'
                // 登录前清空sessionStorage的数据，防止缓存影响字典及地址的显示问题
                sessionStorage.clear()
              })
              .catch((err) => {
                if (!err.errors) {
                  window.location.href = '500.html'
                } else {
                  err.data.passwordDefaultNum !== null &&
                    this.$store.commit('setSysCfg', {
                      sessionPasswordErrorNumber: err.data.passwordDefaultNum
                    })
                  this.refreshCode()
                }
              })
          }
        }
      })
    },
    // 自定义错误提示
    serviceCallback (type, data) {
      // 如果业务失败 弹出提示消息
      if (type === false) {
        if (data.errors && data.errors instanceof Array) {
          if (data.errors[0].errorCode == '401') {
            if (data.errors[0].msg.indexOf('用户名或密码不正确') != -1) { // 非首次登录且用户名或密码输入错误时
              const { passwordDefaultNum } = data.data || 0
              data.errors[0].msg = data.errors[0].msg + '，您还可输入' + (5 - passwordDefaultNum) + '次'
            }
          }

          // 弹出消息
          for (let i = 0; i < data.errors.length; i++) {
            message.error(data.errors[i].msg, 3)
          }
        } else {
          if (data.errors[0].errorCode == '401') {
            if (data.errors[0].msg.indexOf('用户名或密码不正确') != -1) { // 非首次登录且用户名或密码输入错误时
              const { passwordDefaultNum } = data.data || 0
              message.error(data.errors[0].msg + '，您还可输入' + (5 - passwordDefaultNum) + '次')
            }
          } else {
            message.error(data.errors || '业务失败', 3)
          }
        }
      }
    },
    gotoDeal (e, nextEl) {
      const event = e || window.event
      const el = event.target || event.srcElement
      if (el.value) {
        document.getElementById(nextEl).focus()
      } else {
        el.focus()
      }
    },
    showModifyPasswordPane () {
      this.$emit('modifyPasswordPaneCtr')
    }
  },
  watch: {
    simpleCheckCodeState (now, old) {
      this.refreshCode()
    }
  }
}
</script>
