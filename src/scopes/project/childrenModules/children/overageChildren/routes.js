// 导出该模块路由
export default [
  // 续发申请
  {
    title: 'secondaryApplication',
    name: 'secondaryApplication',
    path: 'secondaryApplication',
    component: () => import('./secondaryApplication.vue')
  },
  // 续发审核
  {
    title: 'secondaryApprovalFrom',
    name: 'secondaryApprovalFrom',
    path: 'secondaryApprovalFrom',
    component: () => import('./secondaryApprovalFrom.vue')
  },
  // 续发撤回
  {
    title: 'revokeSecondaryRecords',
    name: 'revokeSecondaryRecords',
    path: 'revokeSecondaryRecords',
    component: () => import('./revokeSecondaryRecords.vue')
  },
  // 续发审批
  {
    title: 'secondaryApproval',
    name: 'secondaryApproval',
    path: 'secondaryApproval',
    component: () => import('./secondaryApproval.vue')
  },
  // 减员记录
  {
    title: 'reductionRecord',
    name: 'reductionRecord',
    path: 'reductionRecord',
    component: () => import('./reductionRecord.vue')
  },
  // 事实无人抚养超龄提示办理
  {
    title: 'infoOverageTips',
    name: 'infoOverageTips',
    path: 'infoOverageTips',
    component: () => import('./infoOverageTips.vue')
  },
  // 事实无人抚养超龄续发审批
  {
    title: 'infosecondaryApproval',
    name: 'infosecondaryApproval',
    path: 'infosecondaryApproval',
    component: () => import('./infosecondaryApproval.vue')
  },
  // 事实无人抚养超龄续发申请
  {
    title: 'infosecondaryApplication',
    name: 'infosecondaryApplication',
    path: 'infosecondaryApplication',
    component: () => import('./infosecondaryApplication.vue')
  },
  // 事实无人抚养超龄续发记录
  {
    title: 'infoOverageRenewal',
    name: 'infoOverageRenewal',
    path: 'infoOverageRenewal',
    component: () => import('./infoOverageRenewal.vue')
  },
  // 事实无人抚养超龄减员记录
  {
    title: 'infoOverageAttrition',
    name: 'infoOverageAttrition',
    path: 'infoOverageAttrition',
    component: () => import('./infoOverageAttrition.vue')
  },
  // 超龄提示办理
  {
    title: 'overageTips',
    name: 'overageTips',
    path: 'overageTips',
    component: () => import('./overageTips.vue')
  },
  // 超龄续发记录
  {
    title: 'overageRenewal',
    name: 'overageRenewal',
    path: 'overageRenewal',
    component: () => import('./overageRenewal.vue')
  },
  // 超龄减员记录
  {
    title: 'overageAttrition',
    name: 'overageAttrition',
    path: 'overageAttrition',
    component: () => import('./overageAttrition.vue')
  }

]
