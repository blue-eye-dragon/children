import '@/common/js/util/ieCompatibility'
import faceConfig from 'faceConfig'
import Vue from 'vue'
import './js/module' // 引入需要的组件
import app from './login.vue'
import store from './store/loginStore'
// 覆盖form.util.js
import formUtil from '../../common/js/util/form.util.js'
Vue.use(formUtil)
window.faceConfig = faceConfig
window.Base.submit = Vue.prototype.Base.submit = formUtil.submit
new Vue({
  store,
  render: h => h(app)
}).$mount('#app')
