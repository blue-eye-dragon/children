// 导出该模块路由
export default [
  // 收养档案详情
  {
    title: 'fileDetails',
    name: 'fileDetails',
    path: 'fileDetails',
    component: () => import('./fileDetails.vue')
  },
  // 收养档案管理
  {
    title: 'adoptionManage',
    name: 'adoptionManage',
    path: 'adoptionManage',
    component: () => import('./adoptionManage.vue')
  },
  // 补录评价
  {
    title: 'additionalRecordingAssessment',
    name: 'additionalRecordingAssessment',
    path: 'additionalRecordingAssessment',
    component: () => import('./additionalRecordingAssessment.vue')
  },
  {
    title: 'additionalToEvaluate',
    name: 'additionalToEvaluate',
    path: 'additionalToEvaluate',
    component: () => import('./additionalToEvaluate.vue')
  },
  // 打印 print
  {
    title: 'print',
    name: 'print',
    path: 'print',
    component: () => import('./print.vue')
  },
  // 出具收养登记证明
  {
    title: 'certification',
    name: 'certification',
    path: 'certification',
    component: () => import('./certification.vue')
  },
  // 出具收养登记证明表单
  {
    title: 'certificationfrom',
    name: 'certificationfrom',
    path: 'certificationfrom',
    component: () => import('./certificationfrom.vue')
  },
  // 收养信息维护
  {
    title: 'informationMaintenance',
    name: 'informationMaintenance',
    path: 'informationMaintenance',
    component: () => import('./informationMaintenance.vue')
  },
  // 回访记录
  {
    title: 'visitrecord',
    name: 'visitrecord',
    path: 'visitrecord',
    component: () => import('./visitrecord.vue')
  },
  // 收养登记
  {
    title: 'register',
    name: 'register',
    path: 'register',
    component: () => import('./register.vue')
  },
  // 收养登记表单
  {
    title: 'registration',
    name: 'registration',
    path: 'registration/:id/:name',
    component: () => import('./registration.vue')
  },
  // 解除收养登记
  {
    title: 'relieveList',
    name: 'relieveList',
    path: 'relieveList',
    component: () => import('./relieveList.vue')
  },
  // 解除收养登记表单
  {
    title: 'relieve',
    name: 'relieve',
    path: 'relieve',
    component: () => import('./relieve.vue')
  },
  // 补领收养登记
  {
    title: 'replacement',
    name: 'replacement',
    path: 'replacement',
    component: () => import('./replacement.vue')
  },
  // 补领解除收养登记
  {
    title: 'releaseCollar',
    name: 'releaseCollar',
    path: 'releaseCollar',
    component: () => import('./releaseCollar.vue')
  },
  // 补领解除收养登记比表单
  {
    title: 'replacementnotFrom',
    name: 'replacementnotFrom',
    path: 'replacementnotFrom',
    component: () => import('./replacementnotFrom.vue')
  },
  // 补领收养登记表单
  {
    title: 'replacementFrom',
    name: 'replacementFrom',
    path: 'replacementFrom',
    component: () => import('./replacementFrom.vue')
  },
  // 撤销收养登记
  {
    title: 'revokeList',
    name: 'revokeList',
    path: 'revokeList',
    component: () => import('./revokeList.vue')
  },
  // 撤销收养登记表单
  {
    title: 'revokeForm',
    name: 'revokeForm',
    path: 'revokeForm',
    component: () => import('./revokeForm.vue')
  },
  // 补录收养登记
  {
    title: 'supplement',
    name: 'supplement',
    path: 'supplement',
    component: () => import('./supplement.vue')
  },
  // 补录解除收养登记
  {
    title: 'releaseAddendum',
    name: 'releaseAddendum',
    path: 'releaseAddendum',
    component: () => import('./releaseAddendum.vue')
  },
  // 补录撤销收养登记
  {
    title: 'revocationSupplement',
    name: 'revocationSupplement',
    path: 'revocationSupplement',
    component: () => import('./revocationSupplement.vue')
  },
  // 收养预约审核
  {
    title: 'adoptionAppointmentReview',
    name: 'adoptionAppointmentReview',
    path: 'adoptionAppointmentReview',
    component: () => import('./adoptionAppointmentReview.vue')
  },
  // 收养预约审核-审核
  {
    title: 'appointmentReview',
    name: 'appointmentReview',
    path: 'appointmentReview',
    component: () => import('./appointmentReview.vue')
  },
  // 收养解除外地
  {
    title: 'relieveListRegistration',
    name: 'relieveListRegistration',
    path: 'relieveListRegistration',
    component: () => import('./relieveListRegistration.vue')
  },
  // 收养机构信息维护
  {
    title: 'organizationInformationMaintenance',
    name: 'organizationInformationMaintenance',
    path: 'organizationInformationMaintenance',
    component: () => import('./organizationInformationMaintenance.vue')
  },
  {
    title: 'organizationInformationAdd',
    name: 'organizationInformationAdd',
    path: 'organizationInformationAdd',
    component: () => import('./organizationInformationAdd.vue')
  }

]
