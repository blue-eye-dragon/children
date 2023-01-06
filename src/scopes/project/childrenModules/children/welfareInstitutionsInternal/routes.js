// 导出该模块路由
export default [
// 从业人员管理
  {
    title: 'employeeManagement',
    name: 'employeeManagement',
    path: 'employeeManagement',
    component: () => import('./employeeManagement.vue')
  },
  // 从业机构管理
  {
    title: 'employmentInstitution',
    name: 'employmentInstitution',
    path: 'employmentInstitution',
    component: () => import('./employmentInstitution.vue')
  },
  {// 物资管理-入库管理
    title: 'warehousingManagement',
    name: 'warehousingManagement',
    path: 'warehousingManagement',
    component: () => import('./materialManagement/warehousingManagement.vue')
  },
  // 物资管理-出库管理
  {
    title: 'depotManagement',
    name: 'depotManagement',
    path: 'depotManagement',
    component: () => import('./materialManagement/depotManagement.vue')
  },
  // 物资管理-物资总揽
  {
    title: 'materialOverall',
    name: 'materialOverall',
    path: 'materialOverall',
    component: () => import('./materialManagement/materialOverall.vue')
  },
  // 物资管理-物资总揽-物资类型管理
  {
    title: 'materialType',
    name: 'materialType',
    path: 'materialType',
    component: () => import('./materialManagement/materialType.vue')
  },
  // 救助机构内部管理--物资管理-入库
  {
    title: 'internalwareManagement',
    name: 'internalwareManagement',
    path: 'internalwareManagement',
    component: () => import('./internalManagement/internalwareManagement.vue')
  },
  // 救助机构内部管理--物资管理-出库
  {
    title: 'internaldepotManagement',
    name: 'internaldepotManagement',
    path: 'internaldepotManagement',
    component: () => import('./internalManagement/internaldepotManagement.vue')
  },
  {
    title: 'materialTypeTwo',
    name: 'materialTypeTwo',
    path: 'materialTypeTwo',
    component: () => import('./materialManagement/materialTypeTwo.vue')
  }

]
