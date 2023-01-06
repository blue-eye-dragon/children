<template>
  <div class="iframeList">
    <iframe :style="{display:activeTab.module=='worktable'?'block':'none'}"
            :src="activeTab.module=='worktable'?'worktable.html':''"
            frameborder="none"
            scrolling="auto"
            ref="worktableiframe">
    </iframe>
    <iframe :style="{display:activeTab.module==menu.module?'block':'none'}"
            ref="iframe"
            id="children.html"
            :key="menu.id"
            v-for="menu in iframeList"
            :src="activeTab.module=='worktable'?'':srcGetters(menu)"
            frameborder="none"
            scrolling="auto">
    </iframe>
    <div class="mask"
         v-if="showMask"></div>
    <div v-if="false"
         class="refresh-box"
         id="refresh_box"
         v-show="activeTab.module != 'worktable'">
      <div class="btn-refresh"
           :style="{'background-color': mainColor}"
           @click="fnRefresh"
           id="refresh"
           @mousedown="fnMousedown"
           @mouseup="fnMouseup">
        <ta-icon type="reload" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
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
  name: 'iframe-list',
  data () {
    const _self = this
    window.notification = function (e) {
      _self.notification(e)
    }
    return {
      src: '',
      showMask: false
    }
  },
  computed: {
    ...mapGetters({
      tabList: 'getTabMenuList',
      iframeList: 'getIframeList',
      activeTab: 'getActiveIframe',
      mainColor: 'getThemeColor'
    }),
    srcGetters (menu) {
      return (menu) => {
        let src = '',
          _modulePartId_ = ''
        if (menu.module == this.activeTab.module) {
          console.log(this.activeTab, 8899)
          src = menu.module + '#/' + this.activeTab.part
          _modulePartId_ = '_modulePartId_=' + this.activeTab.partId
        } else {
          src = menu.module + '#/' + menu.part
          _modulePartId_ = '_modulePartId_=' + menu.partId
        }

        if (src.indexOf('?') > -1) {
          src += '&' + _modulePartId_
        } else {
          src += '?' + _modulePartId_
        }
        return src
      }
    }
  },
  methods: {
    // 通知提醒框
    notification (e) {
      const offHeight = document.body.clientHeight - 300
      this.$notification.info({
        placement: 'bottomRight',
        message: e.title.trim(),
        description: (<myapp ref="tip" />),
        duration: 0,
        style: {
          width: '600px',
          height: `${offHeight}px`,
          overflowY: 'auto',
          // overflow: 'scroll',
          paddingBottom: '50px',
          marginLeft: `${335 - 600}px`
        }
      })
      let str = ''
      if (e.fileList) {
        e.fileList.forEach(item => {
          str = str + '<span><a href="' + window.faceConfig.basePath + '/file/getFileFromDfs/' + item.response.data.data.fileid + '">' + item.name + '<a></span>'
        })
      } else {
        str = '&nbsp&nbsp&nbsp&nbsp&nbsp无附件'
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.tip.content = `<div style="height:${offHeight - 100}px;overflow-y:auto">` + e.content + '<p>升级内容操作说明:' + str + '</p></div>'
        }, 0)
      })
    },
    fnMousedown (e) {
      this.showMask = true
      const refresh_box = document.getElementById('refresh_box')
      var event = e || window.event
      var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft
      var pageY = event.pageY || event.clientY + document.documentElement.scrollTop
      var innerX = pageX - refresh_box.offsetLeft
      var innerY = pageY - refresh_box.offsetTop
      document.onmousemove = function (e) {
        var event = e || window.event
        var moveX = event.pageX || event.clientX + document.documentElement.scrollLeft
        var moveY = event.pageY || event.clientY + document.documentElement.scrollTop
        var demoX = moveX - innerX
        var demoY = moveY - innerY
        const docWidth = document.body.clientWidth, docHeight = document.body.clientHeight
        if (demoX < 0) {
          demoX = 10
        } else if (demoX + 50 > docWidth) {
          demoX = docWidth - 50
        }
        if (demoY < 0) {
          demoY = 10
        } else if (demoY + 50 > docHeight) {
          demoY = docHeight - 50
        }
        refresh_box.style.left = demoX + 'px'
        refresh_box.style.top = demoY + 'px'
      }
    },
    fnMouseup () {
      this.showMask = false
      document.onmousemove = null
    },
    fnRefresh () {
      let iframeList = this.$refs.iframe, pageVmObj
      for (let i = 0; i < iframeList.length; i++) {
        if (iframeList[i].src.indexOf(this.activeTab.module) != -1) {
          pageVmObj = iframeList[i].contentWindow.pageVmObj; break
        }
      }
      const NewPage = '_empty' + '?time=' + new Date().getTime() / 1000
      if (pageVmObj) {
        pageVmObj.$router.push(NewPage)
        pageVmObj.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped type="text/less" lang="less">
// .notificationInfo {
//   //   width: '600px',
//   //   height: '800px',
//   //   overflow: scroll,
//   //   marginLeft: `${335 - 600}px`
// }
.iframeList {
  width: 100%;
  height: 100%;
  .user-select();
  background: transparent;
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1000;
  }
  .refresh-box {
    width: 40px;
    height: 40px;
    position: fixed;
    right: 10px;
    bottom: 30px;
    border-radius: 100%;
    overflow: hidden;
    z-index: 1001;
  }
  .btn-refresh {
    line-height: 40px;
    text-align: center;
    background-color: #1890ff;
    cursor: move;
    color: #ffffff;
    font-size: 16px;
  }
}
</style>
