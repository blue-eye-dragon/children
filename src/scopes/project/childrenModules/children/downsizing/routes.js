// 导出该模块路由
export default [
  // 儿童减员
  {
    title: 'depletion',
    name: 'depletion',
    path: 'depletion',
    component: () => import('./downsizing/depletion.vue')
  },
  // 收养记录
  {
    title: 'adoptionLog',
    name: 'adoptionLog',
    path: 'adoptionLog',
    component: () => import('./adoptionLog/adoptionLog.vue')
  },
  // 收养详情
  {
    title: 'adoptionInfo',
    name: 'adoptionInfo',
    path: 'adoptionInfo',
    component: () => import('./adoptionLog/adoptionInfo.vue')
  }
]
