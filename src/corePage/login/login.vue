<template>
  <div class="body">
    <header>
      <div class="logo">
        <img src="./img/loginlogo.png"
             alt="log">
      </div>
    </header>

    <img v-if="false"
         src="./img/taimg.png"
         style="height:60%;margin-left: 10%" />
    <!--    <article>-->
    <div class="login-con">
      <div class="header1">
        系统登录
        <span>SYSTEM LOGINING</span>
      </div>
      <login-form ref="loginForm"
                  @modifyPasswordPaneCtr="modifyPasswordPaneCtr"></login-form>
    </div>

    <ta-modal title="修改密码"
              :visible="showModifyPasswordPane"
              :footer="null"
              @cancel="modifyPasswordPaneCtr"
              width="400px"
              :bodyStyle="{paddingBottom:'10px'}">
      <modify-password :show.sync="showModifyPasswordPane"
                       passState="1"></modify-password>
    </ta-modal>

    <!--    </article>-->

    <footer>
    </footer>
  </div>

</template>

<script>

import loginForm from './part/loginForm'
import modifyPassword from './part/modifyPassword'
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  components: { modifyPassword, loginForm },
  data () {
    return {
      showModifyPasswordPane: false
    }
  },
  /*  computed: {
      ...mapGetters({
        openSocialLogin: 'openSocialLogin',
        openSmsLogin: 'openSmsLogin'
      })
    }, */
  created () {
    this.$store.dispatch('getSysCfg')
    // 处理同浏览器不同页面登录问题 start
    if (location.search.indexOf('flag') != -1) { // 其他用户挤下来的
      localStorage.setItem('userName', localStorage.getItem('userName1'))
      localStorage.setItem('loginId', localStorage.getItem('loginId1'))
      localStorage.removeItem('userName1')
      localStorage.removeItem('loginId1')
    }
  },
  methods: {
    modifyPasswordPaneCtr () {
      this.showModifyPasswordPane = !this.showModifyPasswordPane
    }
    /* showSmsLoginMethod () {
      this.showSmsLogin = !this.showSmsLogin
    } */

  },
  watch: {
    showModifyPasswordPane (value, old) {
      if (value === false) {
        this.$refs.loginForm.refreshCode()
      }
    }
  }

}
</script>

<style scoped type="text/less" lang="less">
.body {
  background-image: url("./img/backimg.png");
  -moz-background-size:100% 100%;
  background-size:100% 100%;
  height: 100%;
  // background: url(/img/backimg.39424979.png) no-repeat;
  // height: 100%;
  // background-size: cover;
}

.tree {
  height: 460px;
  width: 618px;
  background-image: url("./img/login_tree.png");
  position: absolute;
  left: 15%;
  bottom: 0%;
}

.title {
  color: white;
  font-size: 36px;
  height: 40px;
  width: 366px;
  position: absolute;
  right: 15%;
  top: 26%;
}

header {
  padding: 50px 50px;
}

footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
  text-align: center;

  span {
    width: 576px;
    height: 13px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 90px;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

.login-con {
  background: #fff;
  border-radius: 2px;
  padding: 35px;
  width: 360px;
  box-sizing: border-box;
  position: absolute;
  left: 53.7%;
  top: 24%;
  box-shadow: 0 2px 12px 0 rgba(107, 180, 232, 0.78);

  .header1 {
    height: 60px;
    font-size: 24px;
    color: @text-color;

    > span {
      margin-left: 10px;
      font-size: 16px;
      color: @text-color-secondary;
    }
  }

  .header2 {
    height: 60px;
    font-size: 20px;
    color: @text-color;

    > span {
      margin-left: 10px;
      font-size: 12px;
      color: @text-color-secondary;
    }
  }
}
.logo {
  text-align: center;
}
</style>
