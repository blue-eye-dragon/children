<template>
  <div class="menu-content topmen lllll"
       :class="hiddenIndex?'topmen2':''"
       :style="menuHeight">
    <ta-menu
        mode="horizontal"
        :theme="state.menuType == 'top' ? 'base' : 'light'"
        :data="menuList" 
        :props="props" 
        :selectedKeys="selectedKey" 
        @click="clickMenu" 
        ref="menuHorizon" 
        class="index-top-menu" 
        :style="menuHeight"></ta-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      flag: 'false',
      moreLeft: 0,
      hiddenIndex: 0,
      moreList: [{
        name: '更多',
        icon: 'appstore',
        id: 'menuMore',
        children: [],
      }],
      props: {
        key: 'id',
        title: 'name',
      }
    }
  },
  computed: {
    ...mapGetters({
      state: 'getStateValue'
    }),
    selectedKey () {
      let result = ''
      const { activeMenuOne, activeMenuTwo, menuType } = this.state
      result = menuType == 'top' ? activeMenuTwo : activeMenuOne
      return [result || '']
    },
    menuList () {
      let result = []
      const { menuList, menuType } = this.state
      if (menuType == 'top') {
        result = menuList
      } else if (menuType == 'leftTop') {
        const temp = JSON.parse(JSON.stringify(menuList))
        temp.forEach((item) => {
          delete item.children
          result.push(item)
        })
      }
      return result
    },
    menuHeight () {
      //  const { headerHeight } = this.state
      const height = parseInt(45)
      return {
        height: height + 25 + 'px',
        lineHeight: '200%',

        // backgroundColor:'#FFFFFF',
        // color: '#FFFFFF',
        fontSize: '16px'
      }
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      // this.setValue()
      this.setValueFront()
    }, false)
    setTimeout(() => {
      const morefront = document.getElementsByClassName('more-menu')[0]
      if (morefront) {
        morefront.addEventListener('mouseover', () => {
          this.setValueFront()
        }, false)
      }
    }, 1000)
  },
  updated () {
    // this.setValue()
    this.setValueFront()
  },
  methods: {
    setValueFront () {
      if (this.flag) {
        clearTimeout(this.flag)
      }
      this.flag = setTimeout(() => {
        this.setValue()
      }, 500)
    },
    setValue () {
      if (this.state.menuType != 'left') {
           let liList = this.$refs.menuHorizon ? this.$refs.menuHorizon.$el.children : [],
          moreLeft = 0,
          hiddenIndex = 0

        for (let i = 0; i < liList.length; i++) {
          let li = liList[i].getBoundingClientRect()
          if (li.top <= 2) {
            moreLeft += li.width
          } else {
            hiddenIndex = i; break
          }
        }
        this.moreLeft = moreLeft
        this.hiddenIndex = hiddenIndex
        if (hiddenIndex) {
          this.moreList[0].children = this.menuList.slice(hiddenIndex)
        }
      }
      this.moreIcon()
    },

    moreIcon () {
      this.$nextTick(function () {
        const arr = document.querySelectorAll('.lllll .anticon')

        for (let i = 0; i < arr.length; i++) {
          // arr[i].classList.remove('anticon')
          // arr[i].classList.remove('anticon-')
          if (arr[i].nodeName == 'I') {
            //    console.log(arr[i], ' arr[i] arr[i]')
            arr[i].style.fontSize = '30px'
            arr[i].style.marginRight = '5px'
            arr[i].style.verticalAlign = '-5%'
            arr[i].style.paddingTop = '5px'

            arr[i].style.display = 'block'
            arr[i].style.textAlign = 'center'
            arr[i].style.fontSize = '30px'
          }
        }
        const more = document.getElementsByClassName('anticon-appstore')[0]
        if (more) {
          more.style.display = 'block'
          more.style.textAlign = 'center'
          more.style.fontSize = '32px'
          more.style.verticalAlign = 'center'
          more.style.paddingTop = '5px'
          more.style.paddingLeft = '10px'
          more.parentNode.parentNode.style.textAlign = 'center'
          more.parentNode.getElementsByTagName('span')[0].style.paddingLeft = '10px'
        }

        // var moremm  = document.getElementsByClassName("more-menu")[0]
        // //    console.log(moremm,"moremmmoremmmoremm")
        // moremm.style.position = "fixed"
        // moremm.style.right = "200px"
      })
    },

    clickMenu ({ key, keyPath }) {
      const { menuType, menuList, barType } = this.state
      const breadcrumb = []
      if (menuType == 'top') {
        this.$store.dispatch('setActiveMenu', { level: 'one', menuId: keyPath[keyPath.length - 1] })
        this.$store.dispatch('setActiveMenu', { level: 'two', menuId: key })
        let tabMenu = menuList
        for (let i = keyPath.length - 1; i > -1; i--) {
          if (keyPath[i] != 'menuMore') {
            tabMenu = tabMenu.filter(item => item.id == keyPath[i])[0]
            if (barType == 'breadcrumb') {
              breadcrumb.push(tabMenu.name)
            }
            tabMenu = i ? tabMenu.children : tabMenu
          }
        }
        if (breadcrumb.length) {
          this.$store.dispatch('setStateValue', { breadcrumb: breadcrumb })
        }
        this.$store.dispatch('addTabMenuList', { value: tabMenu })
      } else if (menuType == 'leftTop') {
        this.$store.dispatch('setActiveMenu', { level: 'one', menuId: key })
      }
    }
  }
}
</script>
<style type="text/less" lang="less">
body,
html {
  padding: 0;
  margin: 0;
}

.menu-content {
  width: 100%;
  overflow: hidden;
  position: relative;
  .index-top-menu{
    text-align: right;
    font-size: 16px;
    &.ant-menu-horizontal {
      border-bottom: none;
    }
  }
  
}
topmen2 {
  padding-right: 50px;
}
.topmen .ant-menu {
  background: transparent;
  color: rgba(255, 255, 255);
}
/*  .ant-menu-horizontal {
    border-bottom: none !important;
  }*/
.topmen .ant-menu-item:hover {
  // background: #056CBC !important;
  background: rgba(0, 0, 0, 0.15) !important;
  color: rgba(255, 255, 255, 1) !important;
}
.topmen .ant-menu .ant-menu-item-selected {
  // background: #0260A8 !important;
  background: rgba(0, 0, 0, 0.15) !important;
  color: rgba(255, 255, 255, 1) !important;
}

.lllll {
  width: calc(100% - 0px); //用来设置头部导航显示的多少
  float: right;
  padding-left: 25px;
}
.ant-menu-horizontal > .ant-menu-submenu-selected {
  color: #fff;
}
</style>
