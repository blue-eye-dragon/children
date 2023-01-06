// require('./font/iconfont.css')
// require('./font/save.css')
// require('./font/new.css')
// require('./font/huitui.css')
// require('./worktable.scss')// 引入公共样式
// require('./js/createApp.js')
// require('./font/save.js')
// document.body.addEventListener('mousedown', (e) => {
//   window.parent.indexTool.closeIndexPops()
// })

import Vue from 'vue'
import Vuex from 'vuex'
import faceConfig from 'faceConfig'
import Ta404UI from '@yh/ta404-ui/dist/ta404-ui'
import '@yh/ta404-ui'
// import app from './worktable.vue'
// import appGLY from './worktableGLY.vue'
// window.parent.indexTool.getUserInfo()

import echarts from 'echarts'

// 引入百度统计插件
import ba from 'vue-ba'

import { post, downloadFile } from '@/common/js/util/request'
import './js/module' // 引入需要的组件
import inpage from './inpage.vue'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ba, 'b0668f30d62e1597bdb36d05edea8960')
Vue.config.productionTip = false
require('@/common/less/uicss.less')
require('@/common/less/reset.less')
require('@/common/less/index.less')
// 引入组件化页面
Vue.prototype.post = post
Vue.prototype.downloadFile = downloadFile
window.faceConfig = faceConfig
Vue.use(Ta404UI)
Vue.use(Vuex)
// alert(10)
setTimeout(() => {
  const indexPage = new Vue({
    render: h => h(inpage)
  }).$mount('#app')
}, 500)
// themeChange(localStorage.theme)
