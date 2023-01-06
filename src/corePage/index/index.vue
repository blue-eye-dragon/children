<template>
  <div id="app">
    <index-layout ref="indexLayout"
                  :cookieName="cookieName"
                  :userid="userid"
                  :areaLevel="areaLevel"
                  :orgType="orgType"
                  :roleConfig="roleConfig"
                  :OverSeeOverAgeReturnVo="OverSeeOverAgeReturnVo"
                  @resetTopMenu="resetTopMenu">
      <div slot="logo"
           class="logionout">
        <img src="./img/gztLogo.png"
             class='logo1'
             alt="logo">
        <!-- <template v-if="!isshow">
        <img  src="./img/logo_noone2.png"  class='logo1'  alt="logo">
        </template>
        <img v-else src="./img/logo_noone.png"  class='logo1'  alt="logo"> -->
      </div>
      <!--顶部菜单-->
      <menu-horizon slot="topMenu"
                    v-show="$store.state.indexStore.menuType != 'left'"
                    ref="horizon"></menu-horizon>
      <!--左侧菜单-->
      <menu-vertical slot="leftMenu"></menu-vertical>
      <search-pane slot="searchPane"></search-pane>
      <index-tab slot="tabs"
                 @showModal="showModal"
                 ref="indexTab"></index-tab>
      <iframe-list slot="iframes"
                   ref="iframelist"></iframe-list>
      <user-menu slot="userInfo"></user-menu>

    </index-layout>
    <iframe v-show='false'
            :src="src"
            id='abcd'></iframe>
  </div>
</template>
<script>
import indexLayout from './component/indexLayout'
import MenuHorizon from './component/menu/menuHorizon'
import MenuVertical from './component/menu/menuVertical'
import searchPane from './component/menu/searchPane'
import IndexTab from './component/menu/indexTab'
import IframeList from './component/menu/iframeList'
import UserMenu from './component/user/userMenu'
import indexTool from './js/indexTools'
import cookies from './js/cookie'
import axios from 'axios'
import { mapGetters } from 'vuex'
// 处理同浏览器不同页面登录问题 start
window.addEventListener('storage', function (event) {
  if (event.key == 'loginId' && event.newValue && event.oldValue && event.newValue != 'null' && event.oldValue != 'null') {
    if (localStorage.getItem('loginId') != 'null') {
      Modal.warning({
        title: '下线通知',
        content: '用户' + localStorage.getItem('userName') + '已在该浏览器其他页面登录，您需要重新登录！',
        okText: '确定',
        onOk () {
          localStorage.setItem('userName1', localStorage.getItem('userName'))
          localStorage.setItem('loginId1', localStorage.getItem('loginId'))
          window.location.href = 'login.html?flag'
        }
      })
    }
  }
}, false)
// 处理同浏览器不同页面登录问题 end
export default {
  name: 'index',
  components: {
    UserMenu,
    IframeList,
    IndexTab,
    MenuVertical,
    MenuHorizon,
    indexLayout,
    searchPane,
    // eslint-disable-next-line vue/no-unused-components
    myapp: {
      template: '<div v-html="this.content"></div>',
      data () {
        return {
          content: ''
        }
      }
    }
  },
  data () {
    return {
      src: '',
      OverSeeOverAgeReturnVo: {},
      cookieName: '',
      userid: '',
      areaLevel: '',
      orgType: '',
      isshow: false
    }
  },
  computed: {
    ...mapGetters({
      activeTab: 'getActiveIframe'
    }),
    roleConfig () {
      const o = {
        isShowTypeCardBox: false,
        isTypeCardCanClick: false,
        isShowMainBox: false,
        isShowMessageBox: false,
        isShowCountyMonthBox: true,
        type: 'none'
      }
      const areaLevel = parseInt(this.areaLevel)

      switch (areaLevel) {
        case 0:
          o.isShowTypeCardBox = true
          o.isTypeCardCanClick = true
          o.isShowMainBox = true
          o.isShowMessageBox = false
          o.type = 'ministerial'
          break
        case 1:
        case 2:
          o.isShowTypeCardBox = true
          o.isTypeCardCanClick = true
          o.isShowMainBox = true
          o.isShowMessageBox = false
          o.type = 'province'
          break
        case 3:
        case 4:
          o.isShowTypeCardBox = true
          o.isTypeCardCanClick = false
          o.isShowMainBox = false
          o.isShowMessageBox = true
          o.type = 'county'
          break
      }
      if (areaLevel === 3) {
        o.isShowCountyMonthBox = false
      }
      return o
    }
  },
  created () {
    const _self = this
    this.isshow = window.faceConfig.isshow
    // 获取用户信息
    this.$store.dispatch('setUserInfo').then(() => {
      this.cookieName = window.parent.indexTool.getUserInfo().loginId
      this.userid = window.parent.indexTool.getUserInfo().userId
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.orgType = window.parent.indexTool.getUserInfo().orgType
      // this.showOverSee()
      console.log(this.cookieName, this.userid, this.areaLevel, 22233)
      const uid = this.nowUserId = window.parent.indexTool.getUserInfo().userId
      if (typeof uid != 'string') {
        this.$message.error('message 未获取到登录人员')
        return
      }
      let path = null
      if (faceConfig.basePath.includes('http')) {
        path = faceConfig.basePath.replace('http://', '')
      } else {
        path = faceConfig.devServer.replace('http://', '')
      }

      let websocket
      try {
        if ('WebSocket' in window) {
          websocket = new WebSocket('ws://' + path + '/webSocketZkhyServer')
        } else if ('MozWebSocket' in window) {
          websocket = new MozWebSocket('ws://' + path + '/webSocketZkhyServer')
        } else {
          websocket = new SockJS('http://' + path + '/sockjs/webSocketZkhyServer')
        }
      } catch (err) {
        console.log('该浏览器无法正常使用websocket: ' + err)
      }
      // 线上环境暂时去掉websocket功能
      if (typeof websocket !== 'undefined') {
        websocket.onopen = function (event) {
          console.log('webSocket open')
          if (path.includes('upgrade')) { // 测试环境
            console.log('this is test env')
            //websocket.send(uid + Date.parse(new Date()))
          } else {
            console.log('this is not test env')
            //websocket.send(uid)
          }
        }
        websocket.onmessage = function (event) {
          if (event.data != 'delete') {
            const { announcementsVo } = JSON.parse(event.data)
            console.log('收到消息' + event.data)
            _self.$notification.info({
              placement: 'bottomRight',
              message: announcementsVo.title,
              description: (<myapp ref="tip" />),
              duration: 0,
              style: {
                width: '600px',
                marginLeft: `${335 - 600}px`
              }
            })
            _self.$nextTick(() => {
              setTimeout(() => {
                _self.$refs.tip.content = announcementsVo.content
              }, 0)
            })
          }

          // 判断页面是否在工作台
          if (_self.activeTab.module == 'worktable') { // 工作台，局部刷新div
            _self.$refs.iframelist.$refs.worktableiframe.contentWindow.sendMsg()
          }
        }
        websocket.onerror = function (event) {
          console.log('webSocket连接断开')
        }
        websocket.onclose = function (event) {
          console.log('webSocket连接关闭')
        }
      }
    })
    // 获取menu
    this.Base.submit(null, {
      url: 'menu/menuAction/queryRootChildrenMenus'
    }, {
      successCallback: (data) => {
        let menuList = []
        try {
          menuList = data.data.menus.children

          menuList = this.getMyMenu(menuList)
        } catch (error) {
          console.log(error)
        }
        this.$store.dispatch('loadMenuList', { menuList: menuList })
      },
      serviceCallback: (type, data) => {
        if (!data.errors || data.errors.length == 0) {
          let menuList = []
          try {
            menuList = data.data.menus.children
            menuList = this.getMyMenu(menuList)
          } catch (error) {

          }
          this.$store.dispatch('loadMenuList', { menuList: menuList })
        }
        if (data.errors && data.errors.length > 0 && data.errors[0].msg == '用户ID为空，无法获取功能资源！') {
          window.location.href = 'login.html'
        }
      }
    })
    // 获取权限信息
    this.$store.dispatch('setAuthority')
  },
  mounted () {
    // ie9 不存在history.pushState
    // TODO:引入html5.js保证一致体验
    if (history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    }
    window.indexTool = indexTool(this)
    // this.geturl()
    // 处理同浏览器不同页面登录问题 start
    window.addEventListener('beforeunload', e => this.unloadHandler(e))
    // 处理同浏览器不同页面登录问题  end
  },
  methods: {
    async post (url, data, isheader = false, isload = false) {
      return new Promise((resolve, reject) => {
        const submitParameter = {
          url: url,
          data: data,
          method: 'POST',
          showPageLoading: !isload
        }
        if (isheader) {
          submitParameter.autoQs = false
          submitParameter.headers = {
            'Content-Type': 'application/json'
          }
        }
        this.Base.submit(null, submitParameter, {
          serviceCallback: (type, data) => {
            if (data.errors == null || data.errors.length == 0) {
              data.errors = null
              resolve(data)
            } else {
              resolve(data)
              const errlist = ['E0001', 'E0002', 'E0003', 'E0004']
              if (data.errors && data.errors.length > 0) {
                if (!errlist.includes(data.errors[0].errorCode)) {
                  this.$message.error(data.errors[0].msg)
                }
              }
              // for (let i = 0; i < data.errors.length; i++) {
              //   this.$message.error(data.errors[i].msg)
              // }
            }
          },
          errorCallBack: error => {
            // error 无回调，只有console
            switch (error.response.status) {
              case 400:
                this.$message.error('输入条件错误')
                break
              case 401:
                this.$message.error('没有登陆')
                break
              case 404:
                this.$message.error('未知错误')
                break
              case 500:
                this.$message.error('服务器错误')
                break
            }
            reject(error)
          }
        })
      })
    },
    async showModal () {
      const res = await this.post('/overseeApi/overSeeWorkTable')
      if (JSON.stringify(res.data) == '{}') {
        this.$refs.indexLayout.visible1 = false
        this.OverSeeOverAgeReturnVo = {}
      } else {
        this.$refs.indexLayout.visible1 = true
        this.OverSeeOverAgeReturnVo = res.data.data
      }
    },
    async showOverSee () {
      console.log(this.cookieName, this.userid, 1122)
      console.log(cookies.getCookie(this.cookieName), 222)
      if (cookies.getCookie(this.cookieName) == this.userid) {
        this.$refs.indexLayout.visible1 = false
      } else {
        const res = await this.post('/overseeApi/overSeeWorkTable')
        console.log(res.data, 222)
        if (JSON.stringify(res.data) == '{}') {
          this.$refs.indexLayout.visible1 = false
          this.OverSeeOverAgeReturnVo = {}
        } else {
          this.$refs.indexLayout.visible1 = true
          this.OverSeeOverAgeReturnVo = res.data.data
        }
      }
    },
    // 重置页面的顶部菜单
    resetTopMenu () {
      this.$refs.horizon.setValueFront()
    },
    getMyMenu (m) { // menuList1级
      if (!m) {
        // 参数为空，或未传入
        return false
      }
      for (let i = 0; i < m.length; i++) {
        const mm = m[i]
        if (mm.name == '全国儿童福利信息系统') {
          // 递归终止条件
          return mm.children
        }
        const re = getMyMenu(mm.children)// 2级
        if (re) {
          // 递归终止条件
          if (re instanceof Array) {
            // 返回是数组，则正是我们想要的。
            return re
          } else {
            // 返回是对象，继续查询子节点
            return re.children
          }
        }
      }
      // 循环完
    },
    // geturl () {
    //   const url = `${window.faceConfig.exportUrl}/adoption/exportlogin`
    //   axios.get(`${url}?frontUrl=${url}`, {
    //     withCredentials: true
    //   }).then((data) => {
    //     if (data.data.redirectUrl) {
    //       // window.location.href = data.data.redirectUrl
    //       // axios.get(data.data.redirectUrl)
    //       this.src = data.data.redirectUrl
    //       // location.href = data.data.redirectUrl
    //     }
    //   })
    // },
    // 处理同浏览器不同页面登录问题 start
    // 离开或关闭页面时，清空localStorage的用户数据
    unloadHandler (e) {
      localStorage.removeItem('userName')
      localStorage.removeItem('loginId')
    }
    // 处理同浏览器不同页面登录问题 end
  },
  watch: {
    '$store.state.indexStore.userInfo.userName': function (val) {
      if (val == '未登录') {
        window.location.href = 'login.html'
      }
    }
  }
}
</script>
<style scoped type="text/less" lang="less">
#app {
  height: 100%;
}
.logionout {
  display: flex;
  align-items: center;
  padding: 0 18px 0 0;
}
.logo {
  margin-top: 2px;
  width: 40px;
}
.logo1 {
  width: 460px;
  margin-left: 14px;
  margin-right: 5px;
}
.logo {
  margin-left: 36px;
}
</style>
