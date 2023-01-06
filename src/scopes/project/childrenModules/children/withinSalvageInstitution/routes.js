// 导出该模块路由
export default [
  // 从业人员管理
  {
    title: 'salvageEmployeeManagement',
    name: 'salvageEmployeeManagement',
    path: 'salvageEmployeeManagement',
    component: () => import('./salvageEmployeeManagement.vue')
  },
  // 从业机构管理
  {
    title: 'salvageEmploymentInstitution',
    name: 'salvageEmploymentInstitution',
    path: 'salvageEmploymentInstitution',
    component: () => import('./salvageEmploymentInstitution.vue')
  },
  // // 物资管理-入库管理
  // {
  //   title: 'withinWarehousingManagement',
  //   name: 'withinWarehousingManagement',
  //   path: 'withinWarehousingManagement',
  //   component: () => import('./withinMaterialManagement/withinWarehousingManagement.vue')
  // },
  // // 物资管理-出库管理
  // {
  //   title: 'withinDepotManagement',
  //   name: 'withinDepotManagement',
  //   path: 'withinDepotManagement',
  //   component: () => import('./withinMaterialManagement/withinDepotManagement.vue')
  // },
  // // 物资管理-物资总揽
  // {
  //   title: 'withinMaterialOverall',
  //   name: 'withinMaterialOverall',
  //   path: 'withinMaterialOverall',
  //   component: () => import('./withinMaterialManagement/withinMaterialOverall.vue')
  // },
  // // 物资管理-物资总揽-物资类型管理
  // {
  //   title: 'materialType',
  //   name: 'materialType',
  //   path: 'materialType',
  //   component: () => import('./withinMaterialManagement/materialType.vue')
  // }

  // 社工人员信息管理
  {
    title: 'socialWorkerInfoManagement',
    name: 'socialWorkerInfoManagement',
    path: 'socialWorkerInfoManagement',
    component: () => import('./socialWorkerInfoManagement.vue')
  },
  // 参加未保工作培训情况
  {
    title: 'attendWorkTrainManagement',
    name: 'attendWorkTrainManagement',
    path: 'attendWorkTrainManagement',
    component: () => import('./attendWorkTrainManagement.vue')
  },
  // 举办未保工作培训情况
  {
    title: 'holdWorkTrainManagement',
    name: 'holdWorkTrainManagement',
    path: 'holdWorkTrainManagement',
    component: () => import('./holdWorkTrainManagement.vue')
  },
]
