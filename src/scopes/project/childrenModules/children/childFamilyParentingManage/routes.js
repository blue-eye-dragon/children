// 导出该模块路由
export default [
  // 类家庭养育情况信息维护-列表
  {
    title: 'familyParentingInfoMaintain',
    name: 'familyParentingInfoMaintain',
    path: 'familyParentingInfoMaintain',
    component: () => import('./familyParentingInfoMaintain.vue')
  },
  // 类家庭养育情况信息维护-新增
  {
    title: 'addFamilyParenting',
    name: 'addFamilyParenting',
    path: 'addFamilyParenting',
    component: () => import('./addFamilyParenting.vue')
  },
  // 类家庭养育档案
  {
    title: 'similarFamilyUpbringingFiles',
    name: 'similarFamilyUpbringingFiles',
    path: 'similarFamilyUpbringingFiles',
    component: () => import('./similarFamilyUpbringingFiles.vue')
  },
  // 类家庭养育详情
  {
    title: 'similarFamilyUpbringingList',
    name: 'similarFamilyUpbringingList',
    path: 'similarFamilyUpbringingList',
    component: () => import('./similarFamilyUpbringingList.vue')
  }
]
