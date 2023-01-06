// 导出该模块路由
export default [
// 政策发布
  {
    title: 'policyrelease',
    name: 'policyrelease',
    path: '/policyrelease',
    component: () => import('./policyrelease.vue')
  },
  // 政策查看
  {
    title: 'policyView',
    name: 'policyView',
    path: '/policyView',
    component: () => import('./policyView.vue')
  },
  // 政策查看详情
  {
    title: 'policyViewDetail',
    name: 'policyViewDetail',
    path: '/policyViewDetail',
    component: () => import('./policyViewDetail.vue')
  }

]
