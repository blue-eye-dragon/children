import '@/common/js/util/ieCompatibility'
import faceConfig from 'faceConfig'
import Vue from 'vue'
import Vuex from 'vuex'
import indexStore from './store/indexStore'
// 完整引入
// import Vue from 'vue'
// import Ta404UI from '@yh/ta404-ui'
// import '@yh/ta404-ui/es/style/components.less'
// import '@yh/ta404-ui/es/style/index.less'
// 模块化引入
import './js/module'
import app from './index.vue'
import '@/common/less/reset.less'
// 覆盖form.util.js
import formUtil from '../../common/js/util/form.util.js'
require('@/common/less/uicss.less')
window.faceConfig = faceConfig
Vue.use(Vuex)
Vue.use(formUtil)
window.Base.submit = Vue.prototype.Base.submit = formUtil.submit
const store = new Vuex.Store({
  modules: {
    indexStore
  }
})
const indexPage = new Vue({
  store,
  render: h => h(app)
}).$mount('#app')
