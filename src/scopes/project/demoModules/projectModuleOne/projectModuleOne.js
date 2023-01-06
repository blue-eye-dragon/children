import {Vue, store, taMixins} from '@/common/js/public-ant.js'// 引入公共文件
import router from './router/index' // 引入 改模块的路由模块
new Vue({
  mixins: [taMixins],
  router,
  store
}).$mount('#app')

