<template>
  <div class="indexLayout">
    <header :style="{height: headerHeight}">
      <div class="logo">
        <slot name="logo"></slot>
      </div>
      <!--<div class="collapse" @click="toggleCollapsed" v-if="state.menuType != 'top'">-->
      <!--<ta-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"></ta-icon>-->
      <!--</div>-->
      <div style="flex: 1; margin-right: 20px;">
        <slot name="topMenu"></slot>
      </div>
      <div class="userInfo">
        <!--<span :style="{height:headerHeight,lineHeight:headerHeight}"-->
        <!--@click="fullScreen"-->
        <!--v-if="fullscreenVisible"-->
        <!--&gt;{{pageSizeCtr?'退出全屏':'全屏显示'}}</span>-->
        <!--<span :style="{height:headerHeight,lineHeight:headerHeight}"-->
        <!--@click="visible = true"-->
        <!--&gt;<ta-icon type="message"></ta-icon>消息<ta-badge :count="noticeNum" style="height:45px" :numberStyle="{boxShadow: '0 0 0 1px #d9d9d9 inset'}"/></span>-->
        <!--<msg-list :visible.sync="visible" :noticeNum.sync="noticeNum" @close="visible = false"></msg-list>-->
        <!--<span class="userPaneBar" :style="{height:headerHeight,lineHeight:headerHeight}"-->
        <!--@click="showUserInfo"-->
        <!--&gt;<ta-icon type="user"></ta-icon>{{state.userInfo.userName}}</span>-->
        <div class="outs"
             @click="logout()">
          <!--<ta-divider type="vertical" style="height:3em;width:2px"/>-->
          <div class="line"></div>
          <div class="out">
            <img src="../img/out.png"
                 alt />
            <span>退出</span>
          </div>
        </div>
      </div>
    </header>
    <modify-password v-if="changePwd"
                     @close="changePwd = false">
    </modify-password>
    <slot name="userInfo"></slot>
    <div class="content"
         :style="{top:headerHeight, paddingLeft: state.menuType != 'top' ? leftWidth: 0}">
      <div class="leftCon"
           :style="{width:leftWidth}"
           v-if="state.menuType != 'top'">
        <div class="leftConHeader"
             v-if="!collapsed"
             :style="{height:tabHeight, lineHeight:tabHeight}">
          <span class="searchPaneBar"
                :class="{active:ifSearchPane}">
            <!--<input placeholder="搜索..." type="text" v-model="seValue"-->
            <!--@keyup.enter="searchMenuListHandle($event)">-->
          </span>
          <!--<ta-icon :type="ifSearchPane? 'close': 'search'" @click="searchPaneBarHandle"></ta-icon>-->
        </div>
        <div class="leftConContent">
          <slot name="leftMenu"></slot>
          <slot name="searchPane"
                v-if="ifSearchPane"></slot>
        </div>
      </div>
      <div class="dragBar"
           id="dragBar"
           :style="{left:leftWidth,'z-index': '999',resize:'horizontal',cursor:'e-resize'}"
           v-if="state.menuType != 'top'"></div>
      <div class="centerCon">
        <div :class="!$store.state.indexStore.collapsed?'collapse':'collapse2'"
             :style="{left: leftWidth}"
             @click="toggleCollapsed"
             v-if="state.menuType != 'top'">
          <!-- <ta-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"></ta-icon> -->
        </div>
        <div class="tabsCon"
             :style="{height:tabHeight}">
          <slot name="tabs"></slot>
        </div>
        <div class="iframesCon"
             :style="{paddingTop:tabHeight}">
          <slot name="iframes"></slot>
        </div>
        <!-- 右下角工具栏 -->
        <ta-page-tool :toolMenu="toolMenu"
                      :class="{'pagetool1':isOpen, 'pagetool2':!isOpen}"
                      v-if="isShowLogTools&&isShow"
                      :isRefresh="false"></ta-page-tool>
      </div>
    </div>
    <ta-modal title="密码"
              :visible="pwdVisible"
              @ok="handleOk"
              cancelText="取消"
              okText="确认"
              width="380px"
              height="110px"
              @cancel="pwdVisible=false">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.pwdForm = form}">
        <ta-form-item label="密码"
                      :labelCol="{span:6}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="pwd">
          <ta-input type="password"
                    @keyup.enter="handleOk"
                    placeholder="请输入开启密码" />
        </ta-form-item>
      </ta-form>
    </ta-modal>
    <ta-modal title="发送消息"
              :visible="msgVisible"
              @ok="handleOk1"
              cancelText="取消"
              okText="发送"
              width="380px"
              height="150px"
              @cancel="msgVisible=false">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.msgForm = form}">
        <ta-form-item label="内容"
                      :require="{message:'请输入内容'}"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{span:20}"
                      fieldDecoratorId="content"
                      :fieldDecoratorOptions="{rules: [{ max: 300, message: '字段最大长度为300' }]}">
          <ta-textarea :placeholder="'请输入内容'"
                       :rows="4"
                       @keyup.enter="handleOk1" />
        </ta-form-item>
      </ta-form>
    </ta-modal>
    <ta-modal :visible="visible1"
              centered
              :maskClosable="false"
              @cancel="handleCancel"
              width="1000px">
      <template slot="title">
        <div style="text-align:center;height:30px;line-height:30px">督办消息提醒
        </div>
      </template>
      <template slot="footer">
        <div style="text-align:center">
          <ta-button key="submit"
                     type="primary"
                     @click="handleOk3">
            关闭
          </ta-button>
        </div>
      </template>
      <div v-if="roleConfig.type === 'ministerial'">
        <div class="power">
          <p>【督办提醒】：有超七天未更新数据的区域，请到维护情况统计处理具体情况，督办其及时跟新！
            <a href="javascript:;"
               @click="lookClick('1')">查看</a>
          </p>
        </div>
      </div>
      <div v-if="roleConfig.type === 'province' &&orgType!='99'&&orgType!='98'">
        <div class="borderBox">
          <p>【审批提醒】</p>
          <p v-if="OverSeeOverAgeReturnVo.downOrgNoApprovalResult">
            {{OverSeeOverAgeReturnVo.downOrgNoApprovalResult}}超过十五天未审批的事项
            <a href="javascript:;"
               @click="showClick('1')">查看</a>
          </p>
        </div>
        <div class="borderBox">
          <p>【督办提醒】</p>
          <p v-if="OverSeeOverAgeReturnVo.overAgeReturnResult">
            {{OverSeeOverAgeReturnVo.overAgeReturnResult}}有未处理的超龄儿童，请督办其及时处理！
            <a href="javascript:;"
               @click="showClick('2')">查看</a>
          </p>
        </div>
      </div>
      <div v-if="roleConfig.type === 'county'&& areaLevel!=4&& orgType !=99 &&orgType != 98">
        <div class="borderBox"
             v-if="OverSeeOverAgeReturnVo.noOverAgeFactReturnResult || OverSeeOverAgeReturnVo.noOverAgeReturnResult">
          <p>【超龄提醒】</p>
          <p>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeFactReturnResult">有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('2')">{{OverSeeOverAgeReturnVo.noOverAgeFactReturnResult}}个</a>即将超龄事实无人抚养儿童，</span>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('3')">{{OverSeeOverAgeReturnVo.noOverAgeReturnResult}}个</a>即将超龄孤儿，</span>请及时处理！
          </p>
        </div>
        <div class="borderBox">
          <p>【督办提醒】</p>
          <p v-if="OverSeeOverAgeReturnVo.overAgeReturnResult">
            {{OverSeeOverAgeReturnVo.overAgeReturnResult}}有未处理的超龄儿童，请督办其及时处理！
            <a href="javascript:;"
               @click="showClick('2')">查看</a>
          </p>
        </div>
        <div>
          <p class="infoMes">请您及时维护本辖区孤儿基本生活费申请、明天计划、孤儿助学等情况</p>
        </div>
      </div>
      <div v-if="orgType == 99">
        <div class="borderBox">
          <p>【超龄提醒】：</p>
          <p>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeFactReturnResult">有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('2')">{{OverSeeOverAgeReturnVo.noOverAgeFactReturnResult}}个</a>即将超龄事实无人抚养儿童</span>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">，有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('3')">{{OverSeeOverAgeReturnVo.noOverAgeReturnResult}}个</a>即将超龄孤儿，</span>请及时处理！
          </p>
        </div>
      </div>
      <div v-if="areaLevel==4 || orgType == 98">
        <div class="borderBox">
          <p>【超龄提醒】：</p>
          <p>
            <span>有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('2')">{{OverSeeOverAgeReturnVo.noOverAgeFactReturnResult}}个</a>即将超龄事实无人抚养儿童</span>
            <span v-if="OverSeeOverAgeReturnVo.noOverAgeReturnResult">，有
              <a href="javascript:;"
                 class="infoShowA"
                 @click="lookClick('3')">{{OverSeeOverAgeReturnVo.noOverAgeReturnResult}}个</a>即将超龄孤儿</span>
            ，请及时处理！
          </p>
        </div>
      </div>
      <div>
        <p style="text-align:center">
          <input type="checkbox"
                 width="14px"
                 @change="changeHuey"
                 height="14px"
                 id="huey">
          <label for="huey"
                 style="font-size:16px;font-weight:500">当天不再提醒</label>
        </p>
      </div>
    </ta-modal>
    <ta-modal :visible="visible2"
              centered
              :maskClosable="false"
              @cancel="handleCancel1"
              width="1000px">
      <template slot="title">
        <div style="text-align:center;height:30px;line-height:30px">详情
        </div>
      </template>
      <template slot="footer">
        <div style="text-align:center">
        </div>
      </template>
      <ta-table class="tableWidth"
                :columns="tableColumns"
                :dataSource="mixDataList"
                :scroll="{ x: 900, y: 500 }">
      </ta-table>
    </ta-modal>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import modifyPassword from './user/modifyPassword'
import cookies from '../js/cookie'
import pwdStr from '@yh/ta404-ui/es/utils/js/encryption'
export default {
  name: 'index-layout',
  props: {
    OverSeeOverAgeReturnVo: {
      type: Object
    },
    roleConfig: {
      type: Object,
      required: true
    },
    cookieName: {
      type: String,
      required: true
    },
    userid: {
      type: String,
      required: true
    },
    areaLevel: {
      type: String,
      required: true
    },
    orgType: {
      type: String,
      required: true
    }
  },
  data () {
    const toolMenu = [{
      icon: 'form',
      name: '开启',
      onClick: () => {
        if (!this.isOpen) {
          this.Base.submit(null, { url: 'writeLog/writeDiskInfo' })
          this.isOpen = true
          this.$message.info('已开启日志接管功能')
        } else {
          this.$message.info('日志接管功能已开启，请勿重复开启')
        }
      }
    },
    {
      icon: 'stop',
      name: '取消',
      onClick: () => {
        if (this.isOpen) {
          this.Base.submit(null, { url: 'writeLog/cancleDiskInfo' }, {
            successCallback: data => {
              if (data.serviceSuccess) {
                window.console.log('%c 后台日志：%c 开始 %c',
                  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
                  'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
                  'background:transparent')
                // eslint-disable-next-line vue/no-parsing-error
                window.console.log(data.data.data.replace(/\\[0;39m/g, '').replace(/\\[2m/g, '\\[30m').replace(/\\[36m/g, '\\[34m'))
                window.console.log('%c 后台日志：%c 结束 %c',
                  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
                  'background:#f56c6c ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
                  'background:transparent')
              }
            }
          })
          this.isOpen = false
          this.$message.info('已返还日志接管功能')
        } else {
          this.$message.info('请先开启日志接管功能')
        }
      }
    },
    {
      icon: 'edit',
      name: '消息',
      onClick: () => {
        if (faceConfig.basePath.includes('upgrade')) { // 测试环境才允许发消息
          this.msgVisible = true
        } else {
          this.$message.error('非测试环境不允许发送消息')
        }
      }
    }]
    return {
      // fullscreenVisible: !Base.isIE(),
      visible1: false,
      visible2: false,
      changeData: false,
      mixDataList: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'orgName',
          align: 'center',
          width: '30%'
        },
        {
          title: '儿童类型',
          dataIndex: 'childTypeName',
          align: 'center',
          width: '30%'
        },
        {
          title: '儿童姓名',
          dataIndex: 'name',
          align: 'center',
          width: '40%'
        }
      ],
      pageSizeCtr: false,
      seValue: '',
      visible: false,
      tabHeight: '40px',
      changePwd: false,
      // color:'linear-gradient(270deg,rgba(0,141,204,1) 0%,rgba(1,96,177,1) 100%)',
      // noticeNum: 0
      toolMenu,
      isShow: false,
      isShowLogTools: window.faceConfig.indexPageConfig.isShowLogTools, // 是否显示测试使用的接管后台日志pageTool工具箱
      isOpen: false, // 接管后台日志是否已开启
      pwdVisible: false, // 密码弹窗
      msgVisible: false // 消息弹窗
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { modifyPassword },
  computed: {
    ...mapGetters({
      state: 'getStateValue',
      collapsed: 'getCollapsed',
      activeTab: 'getActiveIframe'
    }),
    userInfo () {
      return this.state.userInfo
    },
    logoWidth () {
      const { leftCloseWidth, leftWidth, logoWidth, collapsed, menuType } = this.state
      let width = logoWidth
      if (menuType != 'top') {
        if (collapsed) {
          width = leftCloseWidth
        } else {
          width = leftWidth
        }
      }
      return { width: width, minWidth: width }
    },
    leftWidth () {
      const { leftCloseWidth, leftWidth, collapsed } = this.state
      return collapsed ? leftCloseWidth : leftWidth
    },
    headerHeight () {
      return this.state.headerHeight
    },
    ifSearchPane () {
      return this.state.ifSearchPane
    }
  },
  watch: {
    activeTab (val) { // 再次进入工作台后，防止绑定的iframe失效
      const _self = this
      const iframe0 = $('.iframeList').children('iframe').eq(0)[0]
      if (_self.isShowLogTools && val.module == 'worktable' && iframe0) {
        setTimeout(() => {
          _self.listenKeyDown(iframe0.contentWindow.document)
        }, 1000)
      }
    }
  },
  created () {
    const that = this
    document.addEventListener('fullscreenchange', function (e) {
      if (document.fullscreenElement) {
      } else {
        that.pageSizeCtr = false
      }
    })
  },
  mounted () {
    this.msgVisible = false
    // 监听键盘事件
    this.initKeyDown()
    this.pwdVisible = false
    this.isOpen = false
    // 实现菜单鼠标拖拽功能
    this.BlockDrag('dragBar', function (l, t, _self) {
      _self.$store.dispatch('setStateValue', { leftWidth: l + 'px' })
      _self.$emit('resetTopMenu')
    })
  },
  methods: {
    changeHuey (e) {
      this.changeData = e.target.checked
    },
    // 弹窗取消
    handleCancel () {
      if (this.changeData) {
        cookies.setCookie(this.cookieName, this.userid)
      } else {
        cookies.removeCookie(this.cookieName)
      }
      this.visible1 = false
    },
    // 弹窗取消
    handleCancel1 () {
      this.visible2 = false
    },
    handleOk3 () {
      if (this.changeData) {
        cookies.setCookie(this.cookieName, this.userid)
      } else {
        cookies.removeCookie(this.cookieName)
      }
      this.visible1 = false
    },
    showClick (val) {
      this.visible2 = true
      if (this.OverSeeOverAgeReturnVo.overAgeChildList && val == '2') {
        this.mixDataList = this.OverSeeOverAgeReturnVo.overAgeChildList
      }
      if (this.OverSeeOverAgeReturnVo.downOrgNoApprovalList && val == '1') {
        this.mixDataList = this.OverSeeOverAgeReturnVo.downOrgNoApprovalList
      }
    },
    lookClick (val) {
      const obj1 = {
        id: '1000000000000297830',
        url: 'children.html#/maintenanceStatistics',
        name: '维护情况统计'
      }
      const obj2 = {
        id: '1000000000000270603',
        url: 'children.html#/infoOverageTips?todoFlag=2',
        name: '超龄管理'
      }
      const obj3 = {
        id: '1000000000000253673',
        url: 'children.html#/overageTips?todoFlag=2',
        name: '超龄管理'
      }
      if (val == '1') {
        Base.openTabMenu(obj1)
      }
      if (val == '2') {
        Base.openTabMenu(obj2)
      }
      if (val == '3') {
        Base.openTabMenu(obj3)
      }
      this.visible1 = false
    },
    // 监听键盘事件（控制pageTool显示隐藏）
    initKeyDown () {
      const _self = this
      if (_self.isShowLogTools) {
        // iframe内部的绑定
        // 先绑定工作台iframe
        const iframe0 = $('.iframeList').children('iframe').eq(0)[0]
        if (iframe0) {
          setTimeout(() => {
            _self.listenKeyDown(iframe0.contentWindow.document)
          }, 1000)
        }
        // 再绑定业务模块iframe
        $('.iframeList').bind('DOMNodeInserted', function (e) { // 正常加载出工作台时的处理
          const iframe1 = $('.iframeList').children('iframe').eq(1)[0]
          if (iframe1) {
            setTimeout(() => {
              _self.listenKeyDown(iframe1.contentWindow.document)
            }, 1000)
          }
        })
        const iframe2 = $('.iframeList').children('iframe').eq(1)[0]
        if (iframe2) { // 没有加载出工作台时的处理
          setTimeout(() => {
            _self.listenKeyDown(iframe2.contentWindow.document)
          }, 1000)
        }
        // iframe外部的绑定
        _self.listenKeyDown(document)
      }
    },
    // 监听键盘输入事件
    listenKeyDown (domObj) {
      const _self = this
      if (domObj) {
        domObj.onkeydown = function (event) {
          // eslint-disable-next-line no-caller
          const e = event || window.event || arguments.callee.caller.arguments[0]
          // Ctrl+Alt+o显示/隐藏pagetool
          if (e.ctrlKey && e.altKey && (e.keyCode || e.which || e.charCode) == 79) {
            _self.pwdVisible = !_self.isShow // 关闭状态下开启需要密码
            _self.$nextTick(() => {
              if (!_self.isShow) { // 定位到输入框
                _self.pwdForm.resetFields()
                _self.pwdForm.getFieldInstance('pwd').focus()
              }
            })
            if (_self.isShow) { // 关闭
              _self.isShow = false
            }
          }
        }
      }
    },
    // 密码提交
    handleOk () {
      if (pwdStr.encryptString(this.pwdForm.getFieldsValue().pwd) === '3d388bf15b6474c58667b8d491fe98b022f894716fcd5af26a9c041b8835ea37faf598d5e62d2b8ccc9c29fa82003d80ae7aaa136930af22d2fa4e3d9c1df7dbe21649b6b76878fb9ce698b3878c09cd5156fcb32a09b978efb99c2433eca8fd46cc17cd46cc3dbffe4b4951e50362e397c620b1ab69e4763ab6110b42bdbdaf') { // 密码正确
        this.isShow = true
        this.pwdVisible = false
        this.$forceUpdate()
      } else { // 密码错误
        this.isShow = false
        this.$message.error('密码错误，请重新输入')
      }
    },
    // 消息提交
    handleOk1 () {
      this.msgForm.validateFields((err, values) => {
        if (!err) {
          const { content } = this.msgForm.getFieldsValue()
          this.Base.submit(null, { url: 'writeLog/sendMsg', data: { content } }, {
            successCallback: data => {
              if (data.serviceSuccess) {
                this.$message.success('消息发送成功')
                this.msgVisible = false
              }
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 鼠标拖拽事件
    BlockDrag (divId, callback) {
      const _self = this
      const div = document.getElementById(divId)
      let dragging = false
      div.onmousedown = function (e1) {
        const e = e1 || event
        const disX = e.clientX - div.offsetLeft
        const disY = e.clientY - div.offsetTop
        div.style.position = 'absolute'
        dragging = true
        let l, t
        document.getElementsByClassName('content')[0].onmousemove = function (e2) {
          if (dragging) {
            const e = e2 || event
            l = e.clientX - disX
            t = e.clientY - disY
            div.style.left = l + 'px'
            //   div.style.top = t + 'px'
            if (typeof callback == 'function') {
              if (l !== undefined && t !== undefined) {
                callback(l, t, _self)
              }
            }
          }
        }
      }
      document.getElementsByClassName('content')[0].onmouseup = function (e) {
        dragging = false
        e.cancelBubble = true
      }
    },
    returnPage (obj) {
      Base.openTabMenu(obj)
    },
    /* searchMenuListHandle (e) {
      const value = e.target.value.trim()
      if (this.state.searchValue !== value) {
        this.$store.dispatch('setStateValue', { searchValue: value })
      }
      this.$store.dispatch('setStateValue', { ifSearchPane: true })
    },
    searchPaneBarHandle () {
      this.$store.dispatch('setStateValue', { ifSearchPane: !this.ifSearchPane })
    }, */
    toggleCollapsed () {
      this.$store.dispatch('setStateValue', { collapsed: !this.collapsed })
    },
    showUserInfo () {
      this.$store.dispatch('setStateValue', { showUserInfo: true })
    },
    // 全屏显示控制
    fullScreen () {
      if (this.pageSizeCtr === true) {
        this.pageSizeCtr = false
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else {
          if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else {
            if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen()
            } else {
              if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
              }
            }
          }
        }
      } else {
        this.pageSizeCtr = true
        const d = document.documentElement
        if (d.requestFullscreen) {
          d.requestFullscreen()
        } else {
          if (d.msRequestFullscreen) {
            d.msRequestFullscreen()
          } else {
            if (d.mozRequestFullScreen) {
              d.mozRequestFullScreen()
            } else {
              if (d.webkitRequestFullScreen) {
                d.webkitRequestFullScreen()
              }
            }
          }
        }
      }
    },
    // 退出登录
    logout () {
      this.Base.submit(
        null,
        {
          url: '/logout',
          frontUrl: top.window.location.href
        },
        {
          successCallback: data => {
            if (data.serviceSuccess) {
              if (this.userInfo.isSSO == 'false') {
                localStorage.removeItem('code_list')
                window.location.href = 'login.html'
              } else {
                top.window.location.href = data.redirectUrl || 'login.html'
              }
            }
          }
        }
      )
    }
  }
}
</script>
<style scoped type="text/less" lang="less">
@import "~@yh/ta404-ui/es/style/themes/default";
/*  .indexLayout {
    height: 100%;
    position: relative;
  }*/
.power {
  min-height: 220px;
  padding: 50px 20px;
  font-size: 22px;
  font-weight: 500;
  text-indent: 2em;
}
.tableWidth {
  width: 100%;
}
.infoShowA {
  text-align: center;
  width: 60px;
  font-size: 18px;
  display: inline-block;
}
.infoMes {
  margin-top: 40px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
}
.borderBox {
  border: black solid 1px;
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
  margin-bottom: 10px;
}
header {
  width: 100%;
  //background-color: #fff;
  background: linear-gradient(
    270deg,
    rgba(0, 167, 242, 1) 0%,
    rgba(0, 119, 221, 1) 100%
  );
  background-size: 100% 104%;
  white-space: nowrap;
  display: flex;
  box-sizing: border-box;
  min-width: 600px;
  .user-select();
  > div {
    display: table-cell;
    vertical-align: middle;
    &.collapse {
      width: 60px;
      min-width: 60px;
      text-align: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.15);
        //color: @primary-color;
      }
    }
  }
}

.logo {
  //text-align: center;
  color: #fff;
  display: flex;
  //vertical-align: top;
  //box-sizing: border-box;
}
.userInfo {
  width: 60px;
  //padding-right: 20px;
  color: rgba(255, 255, 255, 1);
  > span {
    vertical-align: top;
    padding: 0px 10px;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    .text-overflow();
    .user-select();
    > i {
      margin-right: 8px;
      font-size: 14px;
    }
    /*&:hover {
        color: @primary-color;
      }*/
  }
  /*    &.menu-top {
      span:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.2);
      }
      background: @primary-color;
      color: #ffffff;
    }*/
}

.dragBar {
  height: 100%;
  width: 20px;
  cursor: w-resize;
  position: absolute;
  opacity: 0;
}

.content {
  width: 100%;
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding: 0px;
  box-sizing: border-box;
  margin: 0px;
  overflow: auto;
  .leftCon /deep/ .ant-menu {
    background: #d8edfe;
    color: rgba(0, 0, 0, 0.65);
  }
  .leftCon /deep/ .ant-menu span {
    font-size: 16px !important;
  }
  .leftCon /deep/ .ant-menu /deep/ .ant-menu {
    background: rgba(167, 212, 255, 1);
    color: #fff;
    //border-bottom: 1px solid rgba(190, 214, 234, 1);
  }
  .leftCon /deep/ .ant-menu /deep/ .ant-menu span {
    font-size: 16px !important;
  }
  .leftCon /deep/ .ant-menu-item-selected {
    /*background: rgba(0, 68, 130, 0.3)!important;*/
    // background:#3C89C4 !important;
    // color: rgba(255, 255, 255, 1)!important;
    //background:rgba(167, 212, 255, 1);
    background: linear-gradient(
      270deg,
      rgba(0, 167, 242, 1) 0%,
      rgba(0, 119, 221, 1) 100%
    ) !important;
    color: #fff !important;
    //opacity:1;
  }

  .leftCon /deep/ .ant-menu-item-active {
    background: linear-gradient(
      270deg,
      rgba(0, 167, 242, 1) 0%,
      rgba(0, 119, 221, 1) 100%
    ) !important;
    color: #fff !important;
    //opacity:1;
  }

  .leftCon /deep/ .ant-menu-submenu-arrow:before {
    // background-image: linear-gradient(90deg,rgba(255,255,255,.7),rgba(255,255,255,.7));
    background: rgba(0, 0, 0, 0.85);
    right: 1px;
  }
  .leftCon /deep/ .ant-menu-submenu-arrow:after {
    right: 1px;
    //background-image: linear-gradient(90deg,rgba(255,255,255,.7),rgba(255,255,255,.7));
    background: rgba(0, 0, 0, 0.85);
  }

  .leftCon /deep/ .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0 !important;
  }
  .leftCon /deep/ .ant-menu-item:after {
    border-right: 0 !important;
  }

  .leftCon /deep/ .ant-menu-item {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    border-bottom: 1px solid rgba(189, 199, 206, 0.6);
  }
  .leftCon /deep/ .ant-menu-submenu-inline {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
    border-bottom: 1px solid rgba(189, 199, 206, 0.6);
  }
  .leftCon /deep/ .ant-menu-item /deep/ .ant-menu-item {
    border-bottom: 1px solid rgba(190, 214, 234, 1) !important;
  }

  .leftCon {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    box-sizing: border-box;
    z-index: 1;
    border-right: 1px solid #acaaae;
    background: #d8edfe;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom left;
    .user-select();

    .leftConHeader {
      position: absolute;
      top: 0px;
      width: 100%;
      //background-color:rgba(230,241,250, 1);
      color: #fff;
      overflow: hidden;

      > span {
        display: inline-block;
        height: 100%;
        line-height: inherit;
        cursor: pointer;
        width: calc(100% - 45px);

        &.searchPaneBar {
          overflow: hidden;

          > input {
            width: calc(100% - 25px);
            margin: 0px 10px 0px 15px;
            height: 26px;
            padding: 0px 10px;
            box-sizing: border-box;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.22);
            border: 1px solid rgba(0, 0, 0, 0.10196078431372549);
            border-radius: 4px;
            outline: none;
            color: rgba(1, 21, 40, 1);

            &::-webkit-input-placeholder {
              color: rgba(255, 255, 255, 0.29);
              font-size: 14px;
            }
          }
        }
      }
      .searchcor {
        color: rgba(1, 21, 40, 1);
      }
      > i {
        position: absolute;
        right: 13px;
        opacity: 0.6;
        font-size: 18px;
        top: 10px;
        cursor: pointer;
      }
    }

    .leftConContent {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }

  .centerCon {
    width: 100%;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    background-color: #e4e4e4;
    > div {
      width: 100%;
    }
    .collapse {
      float: left;
      // width: 30px;
      // height: 39px;
      width: 18px;
      height: 60px;
      top: 0px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("../img/showbtn.png") center center no-repeat;
      position: fixed;
      top: 50%;
      z-index: 999;
      margin-top: -3px;
      // left: 260px;
      background-size: 100% 100%;
    }
    .collapse2 {
      width: 18px;
      height: 60px;
      position: fixed;
      top: 50%;
      z-index: 99999;
      margin-top: -3px;
      // left:50px;
      background: url("../img/showbtn2.png") center center no-repeat;
      background-size: 100% 100%;
    }
    .tabsCon {
      height: 40px !important;
      position: absolute;
    }

    .iframesCon {
      height: 100%;
      position: relative;
    }
  }
}
.userInfo .userPaneBar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  display: inline-block;
}
.outs img {
  width: 24px;
}
.outs {
  display: flex;
  width: 60px;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  margin-right: 20px;
  float: right;
}
.outs1 {
  display: flex;
  width: 60px;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  // margin-right:20px;
  float: right;
}
.out {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  float: right;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
  padding-top: 5px;
  span {
    padding-left: 4px;
    //color: white;
  }
}
.out img {
  width: 36px;
}
.out1 {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  float: right;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
  padding-top: 10px;
  span {
    padding-left: 9px;
  }
}
.out1 img {
  width: 36px;
  margin-left: 11px;
}
.line {
  width: 2px;
  height: 60%;
  background: rgba(255, 255, 255, 1);
}
.line1 {
  width: 0px;
  height: 60%;
  background: transparent;
}
// 日志接管图标class
/deep/ .pagetool1 .anticon-form {
  color: red;
}
/deep/ .pagetool2 .anticon-form {
  color: green;
}
/deep/ .pagetool2 .anticon-stop {
  color: red;
}
/deep/ .pagetool1 .anticon-stop {
  color: green;
}
/deep/ .anticon-edit {
  color: darkolivegreen;
}
</style>
