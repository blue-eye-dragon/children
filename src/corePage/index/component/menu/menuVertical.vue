<template>
  <div style="width: 100%;height: 100%">
    <div class="menu-vertical"
         :class="$store.state.indexStore.collapsed?'menu-vertical2':''">
      <div class="tops"
           :class="!$store.state.indexStore.collapsed?'':'hides'">
        <img src="../../img/users2.png"
             alt="">
        <p v-if='!$store.state.indexStore.collapsed'
           class='names'>您好，{{state.userInfo.userName}}</p>
        <p v-if='!$store.state.indexStore.collapsed'
           class="times"> 当前组织机构: {{ state.userInfo.orgName}}</p>
      </div>
      <ta-menu :isIconFont="true"
               :mode="state.menuLeftStyle == 'dropdown' ? 'inline':'vertical'"
               :inlineCollapsed="collapsed"
               theme="light"
               :inlineIndent="10"
               :props="props"
               :selectedKeys="[state.activeMenuTwo || '']"
               @click="clickMenu"
               :style="{width:'100%'}">
        <template v-for="item in menuList">
          <ta-menu-item v-if="!item.children"
                        :key="item.id"
                        :data-item="item">
            <ta-icon :type="item.icon || ''" />
            <span>{{item.name}}</span>
          </ta-menu-item>
          <sub-menu v-else
                    :menuInfo="item"
                    :key="item.id" />
        </template>
      </ta-menu>
    </div>
  </div>
</template>
<script type="text/jsx">
import { mapGetters } from 'vuex'
import SubMenu from './SubMenu.vue'
import $ from 'jquery'
// $(document).on('mouseover', '.leftConContent ul li', function (event) {
//   event.stopPropagation()
//   let title = ''
//   title = $(this).text()
//   $(this).css({
//     background: '#056CBC',
//     color: 'rgba(0, 0, 0, 1)'
//   })
//   if (title.length < 11) {
//     return false
//   }
//   // $(this).attr({ title })
// })
// $(document).on('mouseout', '.leftConContent ul li', function () {
//   $(this).css({
//     background: 'transparent',
//     color: 'rgba(0, 0, 0, 1)'
//   })
// })
// $(document).on('mouseover', '.leftConContent ul li div', function (event) {
//   event.stopPropagation()
//   let title = ''
//   title = $(this).text()
//   $(this).css({
//     background: '#056CBC',
//     color: 'rgba(0, 0, 0, 1)'
//   })
//   if (title.length < 11) {
//     return false
//   }
//   // $(this).attr({ title })
// })
// $(document).on('mouseout', '.leftConContent ul li div', function () {
//   $(this).css({
//     background: 'transparent',
//     color: 'rgba(0, 0, 0, 1)'
//   })
// })
// $(document).on('mouseover', '.ant-menu-submenu ul li', function (event) {
//   event.stopPropagation()
//   let title = ''
//   title = $(this).text()
//   if (title.length < 11) {
//     return false
//   }
//   // $(this).attr({ title })
// })
export default {
  name: 'menu-vertical',
  components: {
    SubMenu
  },
  data () {
    return {
      areaUser: '',
      props: {
        key: 'id',
        title: 'name',
        areaUser: ''
      }
    }
  },
  /*  created(){
    // 当前登录用户
    var basePath = window.faceConfig.basePath
    let submitParameter = {
      url: basePath+"/user/getUser",
      data: "",
      method: 'POST'
    }
    this.Base.submit(this, submitParameter, {
      serviceCallback: (type, data) => {
        console.log(data.data,'data')
        if (data.serviceSuccess) {
          var index = data.data.user.namePath.lastIndexOf("/");
          this.areaUser = data.data.user.namePath.substr(index + 1,data.data.user.namePath.length);
          console.log(this.areaUser,'areaUser')
        }
      },
    })

  }, */
  computed: {
    ...mapGetters({
      state: 'getStateValue',
      collapsed: 'getCollapsed',
      menuList: 'getMenuListLeft'
    })
  },
  methods: {
    clickMenu (e) {
      // console.log(key)
      // console.log(keyPath)
      // this.$store.dispatch('setActiveMenu', { level: 'two', menuId: key })
      // let tabMenu = this.menuList
      // for (let i = keyPath.length - 1; i > -1; i--) {
      //   tabMenu = i
      //     ? tabMenu.filter(item => item.id == keyPath[i])[0].children
      //     : tabMenu.filter(item => item.id == keyPath[i])[0]
      // }
      // this.$store.dispatch('addTabMenuList', { value: tabMenu })
      // /* 面包屑名称 */
      // if (this.state.barType == 'breadcrumb') {
      //   let breadcrumb = []
      //   const { menuType, menuList, activeMenuOne } = this.state
      //   let leftMenu = this.menuList
      //   if (menuType == 'leftTop') {
      //     breadcrumb.push(
      //       menuList.filter(item => item.id == activeMenuOne)[0].name
      //     )
      //   }
      //   for (let i = keyPath.length - 1; i > -1; i--) {
      //     leftMenu = leftMenu.filter(item => item.id == keyPath[i])[0]
      //     breadcrumb.push(leftMenu.name)
      //     leftMenu = i ? leftMenu.children : leftMenu
      //   }
      //   this.$store.dispatch('setStateValue', { breadcrumb: breadcrumb })
      // }

      const item = e.item.$attrs['data-item']
      this.$store.dispatch('addTabMenuList', { value: item })
      this.$store.dispatch('setActiveMenu', { level: 'two', menuId: e.key })
    }
  }
}
</script>
<style type="text/less" lang="less">
@bgcolor: #001529;
.menu-vertical {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .beautifyScrollbar(
    lighten(@bgcolor, 10%),
    #001529,
    lighten(@bgcolor, 40%)
  );
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-inline-collapsed > .ant-menu-item {
    text-align: center;
    padding: 0 !important;
  }
}
.menu-vertical::-webkit-scrollbar {
  background: transparent !important;
}
.menu-vertical::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(163, 172, 185, 1) !important;
}
.menu-vertical ul li {
  color: rgba(0, 0, 0, 1);
  text-indent: 10px;
  // padding-left:10px;
  box-sizing: border-box;
  // padding-right:5px;
  //border-bottom: 1px solid rgba(189, 199, 206, 0.6);
}
.menu-vertical2 ul li {
  text-indent: 0px;
  // padding-left:10px;
  box-sizing: border-box;
}
.menu-vertical ul li i {
  margin-left: -10px;
}
.menu-vertical .ant-menu-sub li {
  height: 38px !important;
  border-bottom: 1px solid #99c3e7 !important;
}
.ant-menu-submenu-title {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.ant-menu-submenu ul {
  color: rgba(0, 0, 0, 1);
  height: 100% !important;
}
.ant-menu-submenu-placement-rightTop > .ant-menu-submenu-popup::before {
  height: 100% !important;
}

.ant-menu-submenu > .ant-menu {
  height: 100% !important;
}
.tops {
  width: 100%;
  // height:140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  // background:rgba(43, 53, 78, 1);
  // background:rgba(246,250,252,1)
  background: url("../../img/user_bg.png") no-repeat center center;
  background-size: 100% 100%;
  border-bottom: 1px solid #bdc7ce;
}
.hides {
  height: 40px;
}

.tops img {
  width: 62px;
  margin-top: 10px;
}
.hides img {
  width: 20px;
  margin-top: 10px;
}
.names {
  margin: 5px 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}
.times {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  //text-align:center;
}
.leftConContent > .menu-vertical > .ant-menu > li {
  //background:linear-gradient(270deg,rgba(0,167,242,1) 0%,rgba(0,119,221,1) 100%) !important;
  background-color: #0468b6;
  margin: 2px 0;
}
.ant-menu-inline > .ant-menu-item,
.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 50px;
  line-height: 50px;
  margin: 2px 0;
}
</style>
