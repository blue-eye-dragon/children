// 导出该模块路由
export default [
  // 待收养儿童发布管理
  {
    title: 'adoptionReleaseManagement',
    name: 'adoptionReleaseManagement',
    path: 'adoptionReleaseManagement',
    component: () => import('./adoptionReleaseManagement.vue')
  },
  // 待收养发布管理--新增
  {
    title: 'adoptionReleaseManagementNew',
    name: 'adoptionReleaseManagementNew',
    path: 'adoptionReleaseManagementNew',
    component: () => import('./adoptionReleaseManagementNew.vue')
  }

]
