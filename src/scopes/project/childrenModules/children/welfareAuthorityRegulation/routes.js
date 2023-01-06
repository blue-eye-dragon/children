// 福利立构监管
export default [
  // 机构设置管理
  // 机构设置登记
  {
    title: 'registrationOfEstablishment',
    name: 'registrationOfEstablishment',
    path: 'registrationOfEstablishment',
    component: () => import('./organizationManagement/registrationOfEstablishment/registrationOfEstablishment.vue')
  },
  // 机构设置记录
  {
    title: 'organizationSettingRecord',
    name: 'organizationSettingRecord',
    path: 'organizationSettingRecord',
    component: () => import('./organizationManagement/organizationSettingRecord/organizationSettingRecord.vue')
  },
  // 机构变更登记
  {
    title: 'organizationChangeRegister',
    name: 'organizationChangeRegister',
    path: 'organizationChangeRegister',
    component: () => import('./organizationChange/organizationChangeRegister/organizationChangeRegister.vue')
  },
  // 机构变更记录
  {
    title: 'organizationChangeRecord',
    name: 'organizationChangeRecord',
    path: 'organizationChangeRecord',
    component: () => import('./organizationChange/organizationChangeRecord/organizationChangeRecord.vue')
  },
  // 机构分立、合并、解散登记
  {
    title: 'orgDiscreteOrCombineRegister',
    name: 'orgDiscreteOrCombineRegister',
    path: 'orgDiscreteOrCombineRegister',
    component: () => import('./orgDiscreteOrCombine/orgDiscreteOrCombineRegister/orgDiscreteOrCombineRegister.vue')
  },
  // 机构分立、合并、解散记录
  {
    title: 'orgDiscreteOrCombineRecord',
    name: 'orgDiscreteOrCombineRecord',
    path: 'orgDiscreteOrCombineRecord',
    component: () => import('./orgDiscreteOrCombine/orgDiscreteOrCombineRecord/orgDiscreteOrCombineRecord.vue')
  },
  // 机构制度标准备案管理
  // 机构标准备案
  {
    title: 'institutionalStandardRegister',
    name: 'institutionalStandardRegister',
    path: 'institutionalStandardRegister',
    component: () => import('./orgSystemRecordManage/institutionalStandardRegister/institutionalStandardRegister.vue')
  },
  // 机构标准备案记录
  {
    title: 'institutionalStandardRecord',
    name: 'institutionalStandardRecord',
    path: 'institutionalStandardRecord',
    component: () => import('./orgSystemRecordManage/institutionalStandardRecord/institutionalStandardRecord.vue')
  },
  /* 监督处罚管理 */
  // 机构处罚登记
  {
    title: 'orgPunishmentRegister',
    name: 'orgPunishmentRegister',
    path: 'orgPunishmentRegister',
    component: () => import('./orgSupervisionPunishManage/orgPunishmentRegister/orgPunishmentRegister.vue')
  },
  // 处罚记录
  {
    title: 'punishmentRecord',
    name: 'punishmentRecord',
    path: 'punishmentRecord',
    component: () => import('./orgSupervisionPunishManage/orgPunishmentRecord/punishmentRecord.vue')
  },
  // 年度检查报告
  {
    title: 'orgAnnualInspectionRegister',
    name: 'orgAnnualInspectionRegister',
    path: 'orgAnnualInspectionRegister',
    component: () => import('./orgAnnualInspectionManagement/orgAnnualInspectionRegister/orgAnnualInspectionRegister.vue')
  },
  // 年度检查报告记录
  {
    title: 'orgAnnualInspectionRecord',
    name: 'orgAnnualInspectionRecord',
    path: 'orgAnnualInspectionRecord',
    component: () => import('./orgAnnualInspectionManagement/orgAnnualInspectionRecord/orgAnnualInspectionRecord.vue')
  },
  // 工作报告报送
  {
    title: 'workReportSubmission',
    name: 'workReportSubmission',
    path: 'workReportSubmission',
    component: () => import('./orgWorkReportManagement/workReportSubmission/workReportSubmission.vue')
  },
  // 工作报告记录
  {
    title: 'workReportRecord',
    name: 'workReportRecord',
    path: 'workReportRecord',
    component: () => import('./orgWorkReportManagement/workReportRecord/workReportRecord.vue')
  }
]
