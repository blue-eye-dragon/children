// 导出该模块路由
export default [
  // 调查评估-列表
  {
    title: 'processSetting',
    name: 'processSetting',
    path: 'processSetting',
    component: () =>
      import('./processSetting.vue')
  }
]
