<template>
  <ta-drawer
    @close="onClose"
    :visible="state.showUserInfo"
    destroyOnClose
    width="300px"
    wrapClassName="user-menu"
  >
    <div class="usercontshow" @mouseleave.stop='usercontshow'>
      <div class="user-info">
        <div class="person-head">
          <img :alt="userInfo.userName" :src="require('../../img/' + userInfo.userImg)">
        </div>
        <div>
          <div class="user-name">{{userInfo.userName}}</div>
          <div class="user-position">{{userInfo.mainRoleName}}</div>
        </div>
      </div>
      <!-- <div class="menu-item">签到</div> -->
      <div class="menu-item" @click="changePwd = !changePwd" :class="{active: changePwd}" :style="{'border-color': changePwd ? mainColor: '#fff'}">修改密码</div>
      <div class="user-panel" v-if="changePwd">
        <img src="../../img/user-pw-bg.png" style="width: 100%"/>
        <modify-password @close="changePwd = false"></modify-password>
      </div>
      <!-- <div class="menu-item">换肤
        <ul class="menu-color">
          <li v-for="(item, key, index) in colorList" :key="index" :style="{'background-color': item['primary-color']}" @click="themeChange(key)" :class="{'active': key == colorDefault}"></li>
        </ul>
      </div> -->
      <!-- <div class="menu-item">导航模式
        <ul class="menu-mode">
          <li v-for="(item, index) in modeList" :key="index" :style="{'background-image': 'url('+ require('../../img/' + item + '.png') +')'}" @click="modeChange(item)" :class="{'active': item == state.menuType}"></li>
        </ul>
      </div> -->
      <div class="btn-logout">
        <ta-button block @click="logout()">退出当前账号</ta-button>
      </div>
    </div>
  </ta-drawer>
</template>
<script>
import modifyPassword from './modifyPassword'
import socialBinding from './socialBinding'
import { mapGetters, } from 'vuex'
import colorList from '@/style/theme.js'
let time
const modeList = ['left', 'top', 'leftTop']
export default {
  name: 'user-menu',
  components: { modifyPassword, },
  data () {
    return {
      changePwd: false,
      colorList,
      modeList,
      colorDefault: 'default',
      /* themeStorage: null,
      modeStorage: null,
      socialBinding: false, */
    }
  },
  created () {
    this.$store.dispatch('setStateValue', { menuType: 'leftTop', })
    /* this.themeStorage = this.Base.webStorage.init('index_theme', { isLocal: true, })
    this.modeStorage = this.Base.webStorage.init('index_mode', { isLocal: true, }) */
  },
  /* mounted () {
    this.colorDefault = this.themeStorage.get('index_theme') || 'default'
  }, */
  computed: {
    ...mapGetters({
      state: 'getStateValue',
    }),
    userInfo () {
      return this.state.userInfo
    },
    /* sysInfo () {
      return this.$store.state.indexStore.sysInfo
    }, */
  },
  methods: {
    onClose () {
      this.$store.dispatch('setStateValue', { showUserInfo: false, })
      this.changePwd = false
    },
    usercontshow () {
      if (time) {
        clearTimeout(time)
      }
      time = setTimeout(() => {
        this.$store.dispatch('setStateValue', { showUserInfo: false, })
        this.changePwd = false
        time = null
      }, 200)
    },
    /* themeChange (value) {
      this.changePwd = false
      this.colorDefault = value
      if (!Base.testIE) {
        this.themeStorage.set('index_theme', value)
      } else {
        localStorage.index_theme = value
      }
      Base.changeTheme(value)
      this.$message.success('修改主题色成功')
    },
    modeChange (type) {
      this.changePwd = false
      if (!this.modeStorage) {
        this.modeStorage = this.Base.webStorage.init('index_mode', { isLocal: true, })
      }
      this.modeStorage.set('mode', type)
      this.$store.dispatch('setStateValue', { menuType: type, })
      this.$message.success('导航模式切换成功')
    }, */
    // 退出登录
    // 退出登录
    logout () {
      this.Base.submit(null, {
        url: '/logout',
        frontUrl: top.window.location.href
      }, {
        successCallback: (data) => {
          if (data.serviceSuccess) {
            if (this.userInfo.isSSO == 'false') {
              window.location.href = 'login.html'
            } else {
              top.window.location.href = data.redirectUrl || 'login.html'
            }
          }
        }
      })
    }
  },
}
</script>
<style lang="less" type="text/less">
  .user-menu {
    .ant-drawer-body {
      padding: 24px 0;height:100%;z-index:99999;
    }
  }
</style>
<style lang="less" scoped type="text/less">
  .user-info {
    padding: 0 24px;
    margin-bottom: 25px;

    &:after {
      content: "";
      display: block;
      clear: both;
    }

    > div {
      float: left;

      &:first-child {
        width: 60px;
        height: 60px;

        > img {
          width: 100%;
          height: 100%;
        }
      }

      &:last-child {
        > div {
          &:first-child {
            font-size: 18px;
            color: #606266;
            padding-top: 10px;
            margin-left: 10px;
          }

          &:last-child {
            color: @success-color;
            margin: 5px 0px 0px 10px;
          }
        }
      }
    }
  }

  .menu-item {
    padding: 10px 24px;
    cursor: pointer;
    position: relative;
    border-left: 3px solid #fff;

    &:after {
      content: "";
      display: block;
      border-bottom: 1px solid #eee;
      width: 252px;
      position: absolute;
      bottom: 0px;
    }

    &:hover {
      background: #fafafa;
      border-left: 3px solid #fafafa;
    }

   /* &.active {
      border-left: 3px solid @primary-color;
    }*/

    .menu-color {
      list-style-type: none;
      margin: 10px 0 0;
      padding: 0;
      height: 20px;

      & > li {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 2px;
        margin-right: 5px;
        vertical-align: top;

        &.active:after {
          content: '\E632';
          font-family: anticon!important;
          display: block;
          color: #ffffff;
          text-align: center;
          /*width: 20px;
          height: 20px;
          //content: url("data:image/svg+xml;charset=utf-8,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M896 213.34q18.33 0 30.495 12.165T938.66 256q0 18.002-12.33 30.33l-512 512q-12.328 12.33-30.33 12.33t-30.33-12.33l-256-256Q85.34 530.003 85.34 512q0-18.33 12.165-30.495T128 469.34q18.002 0 30.33 12.33L384 707.665l481.67-481.997Q877.997 213.34 896 213.34z' fill='%23fff'/%3E%3C/svg%3E");
          background-position: center;
          background-size: 14px;
          background-repeat: no-repeat;*/
        }
      }
    }

    .menu-mode {
      list-style-type: none;
      margin: 10px 0 0;
      padding: 0;
      height: 39px;

      & > li {
        display: inline-block;
        width: 48px;
        height: 39px;
        margin-right: 8px;
        vertical-align: top;
        background-size: contain;
        /*background-position: center;
        background-repeat: no-repeat;*/

        &.active:after {
          content: '\E632';
          font-family: anticon!important;
          display: block;
          color: #001529; text-align: center; line-height: 39px;
          /*width: 48px;
          height: 39px;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M896 213.34q18.33 0 30.495 12.165T938.66 256q0 18.002-12.33 30.33l-512 512q-12.328 12.33-30.33 12.33t-30.33-12.33l-256-256Q85.34 530.003 85.34 512q0-18.33 12.165-30.495T128 469.34q18.002 0 30.33 12.33L384 707.665l481.67-481.997Q877.997 213.34 896 213.34z' fill='%23001529'/%3E%3C/svg%3E");
          background-position: center;
          background-size: 14px;
          background-repeat: no-repeat;*/
        }
      }
    }
  }

  .btn-logout {
    margin: 50px 24px 0;
  }

  .user-panel {
    position: absolute;
    width: 350px;
    height: 100%;
    right: 300px;
    top: 0px;
    overflow: auto;
    z-index: 9999;
    background: #fff;
    box-shadow: @box-shadow-base;
    .beautifyScrollbar();
  }
  .usercontshow{
    width:100%;
    height:100%;
  }
</style>
