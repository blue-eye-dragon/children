// 导出该模块路由
export default [
  {
    title: '项目模块实例part 1',
    name: 'templateMg',
    path: 'templateMg',
    component: () => import('./templateMg.vue')
  }
]
