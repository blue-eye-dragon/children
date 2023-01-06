// 导出该模块路由
export default [
  // 调查评估-列表
  {
    title: 'investigateEvaluation',
    name: 'investigateEvaluation',
    path: 'investigateEvaluation',
    component: () =>
      import('./helpProtect/socialProtection/investigateEvaluation.vue')
  },
  // 调查评估
  {
    title: 'investigateEvaluationDo',
    name: 'investigateEvaluationDo',
    path: 'investigateEvaluationDo',
    component: () =>
      import('./helpProtect/socialProtection/investigateEvaluationDo.vue')
  },
  // 临时监护-列表
  {
    title: 'temporaryCustody',
    name: 'temporaryCustody',
    path: 'temporaryCustody',
    component: () =>
      import('./helpProtect/socialProtection/temporaryCustody.vue')
  },
  // 临时监护
  {
    title: 'temporaryCustodyDo',
    name: 'temporaryCustodyDo',
    path: 'temporaryCustodyDo',
    component: () =>
      import('./helpProtect/socialProtection/temporaryCustodyDo.vue')
  },
  // 转介帮扶-列表
  {
    title: 'referralAssistance',
    name: 'referralAssistance',
    path: 'referralAssistance',
    component: () =>
      import('./helpProtect/socialProtection/referralAssistance.vue')
  },
  // 转介帮扶
  {
    title: 'referralAssistanceDo',
    name: 'referralAssistanceDo',
    path: 'referralAssistanceDo',
    component: () =>
      import('./helpProtect/socialProtection/referralAssistanceDo.vue')
  },
  // 落实催办-列表
  {
    title: 'implementUrge',
    name: 'implementUrge',
    path: 'implementUrge',
    component: () => import('./helpProtect/socialProtection/implementUrge.vue')
  },
  {
    // 救助申请(医疗)
    title: 'salvageApplication',
    name: 'salvageApplication',
    path: 'salvageApplication',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/salvageApplication/salvageApplication.vue')
  },
  {
    // 申请(医疗)
    title: 'applyFor',
    name: 'applyFor',
    path: 'applyFor',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/salvageApplication/applyFor.vue')
  },

  {
    // 救助申请记录
    title: 'applicationRecord',
    name: 'applicationRecord',
    path: 'applicationRecord',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/applicationRecord/applicationRecord.vue')
  },
  {
    // 救助申请记录
    title: 'detailDatas',
    name: 'detailDatas',
    path: 'detailDatas',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/applicationRecord/detailDatas.vue')
  },
  {
    // 救助申请记录-详情
    title: 'details',
    name: 'details',
    path: 'details',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/applicationRecord/details.vue')
  },
  {
    // 预算上报
    title: 'medicalBudgetReport',
    name: 'medicalBudgetReport',
    path: 'medicalBudgetReport',
    component: () =>
      import('./medicalAssistance/medicalBudget/medicalBudgetReport.vue')
  },
  {
    // 预算上报记录
    title: 'medicalBudgetRecords',
    name: 'medicalBudgetRecords',
    path: 'medicalBudgetRecords',
    component: () =>
      import('./medicalAssistance/medicalBudget/medicalBudgetRecords.vue')
  },
  {
    // 预算上报记录----详情
    title: 'medicalBudgetDetail',
    name: 'medicalBudgetDetail',
    path: 'medicalBudgetDetail',
    component: () =>
      import('./medicalAssistance/medicalBudget/medicalBudgetDetail.vue')
  },
  {
    // 变更申请
    title: 'changeRequests',
    name: 'changeRequests',
    path: 'changeRequests',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/changeRequests/changeRequests.vue')
  },
  {
    // 申请(变更)
    title: 'changeApplyFor',
    name: 'changeApplyFor',
    path: 'changeApplyFor',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/changeRequests/changeApplyFor.vue')
  },

  {
    // 变更申请记录
    title: 'requestRecord',
    name: 'requestRecord',
    path: 'requestRecord',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/requestRecord/requestRecord.vue')
  },

  {
    // 变更申请记录
    title: 'edit',
    name: 'edit',
    path: 'edit',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/requestRecord/edit.vue')
  },
  {
    // 救助申请记录-详情
    title: 'requeirDetails',
    name: 'requeirDetails',
    path: 'requeirDetails',
    component: () =>
      import('./medicalAssistance/salvageApplicationManage/requestRecord/requeirDetails.vue')
  },
  {
    // 结账申请
    title: 'applicationSettlement',
    name: 'applicationSettlement',
    path: 'applicationSettlement',
    component: () =>
      import('./medicalAssistance/checkoutmanagement/applicationSettlement.vue')
  },
  {
    // 结账
    title: 'settlementChangeFor',
    name: 'settlementChangeFor',
    path: 'settlementChangeFor',
    component: () =>
      import('./medicalAssistance/checkoutmanagement/settlementChangeFor.vue')
  },

  {
    // 结账申请记录
    title: 'applicationSettlementRecord',
    name: 'applicationSettlementRecord',
    path: 'applicationSettlementRecord',
    component: () =>
      import('./medicalAssistance/checkoutmanagement/applicationSettlementRecord.vue')
  },
  {
    // 结账申请记录详情
    title: 'applicationSettlementDetails',
    name: 'applicationSettlementDetails',
    path: 'applicationSettlementDetails',
    component: () =>
      import('./medicalAssistance/checkoutmanagement/applicationSettlementDetails.vue')
  },
  {
    // 儿童医疗救助档案
    title: 'medicalAidFilesChild',
    name: 'medicalAidFilesChild',
    path: 'medicalAidFilesChild',
    component: () =>
      import('./medicalAssistance/medicalAidFiles/medicalAidFilesChild.vue')
  },
  {
    // 儿童医疗救助档案---详情
    title: 'medicalAidFilesChildDetail',
    name: 'medicalAidFilesChildDetail',
    path: 'medicalAidFilesChildDetail',
    component: () =>
      import('./medicalAssistance/medicalAidFiles/medicalAidFilesChildDetail.vue')
  },
  {
    // 儿童医疗救助档案---详情--医疗救助登记表详情
    title: 'medicalAidFilesDetails',
    name: 'medicalAidFilesDetails',
    path: 'medicalAidFilesDetails',
    component: () =>
      import('./medicalAssistance/medicalAidFiles/medicalAidFilesDetails.vue')
  },
  // 儿童医疗管理---结算
  // 结算明细
  {
    title: 'settlementDetails',
    name: 'settlementDetails',
    path: 'settlementDetails',
    component: () =>
      import('./medicalAssistance/settlement/settlementDetails.vue')
  },
  // 结算明细--详情
  {
    title: 'detailsOne',
    name: 'detailsOne',
    path: 'detailsOne',
    component: () =>
      import('./medicalAssistance/settlement/detailsOne.vue')
  },
  // 结算记录--部级
  {
    title: 'settlementRecord',
    name: 'settlementRecord',
    path: 'settlementRecord',
    component: () =>
      import('./medicalAssistance/settlement/settlementRecord.vue')
  },

  {
    title: 'bujiRecordDetails',
    name: 'bujiRecordDetails',
    path: 'bujiRecordDetails',
    component: () =>
      import('./medicalAssistance/settlement/bujiRecordDetails.vue')
  },
  // 结算记录--省级
  {
    title: 'settlementRecordPro',
    name: 'settlementRecordPro',
    path: 'settlementRecordPro',
    component: () =>
      import('./medicalAssistance/settlement/settlementRecordPro.vue')
  },
  // 结算记录--省级--编辑
  {
    title: 'settlementRecordProEdit',
    name: 'settlementRecordProEdit',
    path: 'settlementRecordProEdit',
    component: () =>
      import('./medicalAssistance/settlement/settlementRecordProEdit.vue')
  },
  {
    // 儿童医疗救助档案---详情--医疗救助登记表详情
    title: 'medicalAidFilesApplyFor',
    name: 'medicalAidFilesApplyFor',
    path: 'medicalAidFilesApplyFor',
    component: () =>
      import('./medicalAssistance/medicalAidFiles/medicalAidFilesApplyFor.vue')
  },
  {
    // 助养人/组织信息（列表页）
    title: 'sponsorOrOrganization',
    name: 'sponsorOrOrganization',
    path: 'sponsorOrOrganization',
    component: () =>
      import('./helpManage/helpInformation/sponsorOrOrganization.vue')
  },
  {
    // 助养人/组织信息（增加和详情）(个人)
    title: 'sponsorInfo',
    name: 'sponsorInfo',
    path: 'sponsorInfo',
    component: () => import('./helpManage/helpInformation/sponsorInfo.vue')
  },
  // {// 助养人/组织信息（增加和详情）(组织)
  //   title: 'organization',
  //   name: 'organization',
  //   path: 'organization',
  //   component: () => import('./helpManage/helpInformation/organization.vue')
  // },
  {
    // 助养关系管理
    title: 'helpRelation',
    name: 'helpRelation',
    path: 'helpRelation',
    component: () => import('./helpManage/helpRelation/helpRelation.vue')
  },
  {
    // 助养记录
    title: 'helpRecord',
    name: 'helpRecord',
    path: 'helpRecord',
    component: () => import('./helpManage/helpRecord/helpRecord.vue')
  },
  // rehabilitationtherapy Rehabilitationassistance
  {
    // 康复救助
    title: 'Rehabilitationassistance',
    name: 'Rehabilitationassistance',
    path: 'Rehabilitationassistance',
    component: () =>
      import('./rehabilitationtherapy/Rehabilitationassistance.vue')
  },
  {
    // 康复救助 新增
    title: 'newChildren',
    name: 'newChildren',
    path: 'newChildren',
    component: () => import('./rehabilitationtherapy/newChildren.vue')
  },
  {
    // 基地管理 basemanagement
    title: 'basemanagement',
    name: 'basemanagement',
    path: 'basemanagement',
    component: () => import('./rehabilitationtherapy/basemanagement.vue')
  },
  {
    // training 培训人员
    title: 'training',
    name: 'training',
    path: 'training',
    component: () => import('./rehabilitationtherapy/training.vue')
  },
  {
    // 儿童选送
    title: 'sendChildren',
    name: 'sendChildren',
    path: 'sendChildren',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/sendChildren.vue')
  },
  {
    // 选送记录
    title: 'sendRecord',
    name: 'sendRecord',
    path: 'sendRecord',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/sendRecord/sendRecord.vue')
  },
  {
    // 选送记录-查看
    title: 'see',
    name: 'see',
    path: 'see',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/sendRecord/see.vue')
  },
  {
    // 选送记录-体检信息-操作
    title: 'checkBodyInfo',
    name: 'checkBodyInfo',
    path: 'checkBodyInfo',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/sendRecord/seeNeed/checkBodyInfo.vue')
  },
  {
    // 康复儿童（有基地）
    title: 'rehabilitationChildren',
    name: 'rehabilitationChildren',
    path: 'rehabilitationChildren',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/rehabilitationChildren/rehabilitationChildren.vue')
  },
  {
    // 选送记录-评估信息-操作
    title: 'assessInfo',
    name: 'assessInfo',
    path: 'assessInfo',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/sendRecord/seeNeed/assessInfo.vue')
  },
  {
    // 服务评价（有基地）
    title: 'servicepic',
    name: 'servicepic',
    path: 'servicepic',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/rehabilitationChildren/servicepic.vue')
  },
  {
    // 儿童康档案
    title: 'rehabilitationRecord',
    name: 'rehabilitationRecord',
    path: 'rehabilitationRecord',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/rehabilitationRecord/rehabilitationRecord.vue')
  },
  {
    // 儿童康档案详情
    title: 'rehabilitationRecordSee',
    name: 'rehabilitationRecordSee',
    path: 'rehabilitationRecordSee',
    component: () =>
      import('./rehabilitationtherapy/childRehabilitationManagement/rehabilitationRecord/rehabilitationRecordSee.vue')
  },
  {
    // 寄养儿童信息
    title: 'childInformation',
    name: 'childInformation',
    path: 'childInformation',
    component: () => import('./foster/InformationBoth/childInformation.vue')
  },
  {
    // 寄养家庭信息
    title: 'familyInformation',
    name: 'familyInformation',
    path: 'familyInformation',
    component: () => import('./foster/InformationBoth/familyInformation.vue')
  },
  {
    // 寄养儿童表单
    title: 'fosterFrom',
    name: 'fosterFrom',
    path: 'fosterFrom',
    component: () => import('./foster/InformationBoth/fosterFrom.vue')
  },
  {
    // familyInformationFrom 寄养家庭表单-增加
    title: 'familyInformationFrom',
    name: 'familyInformationFrom',
    path: 'familyInformationFrom',
    component: () =>
      import('./foster/InformationBoth/familyInformationFrom.vue')
  },
  {
    // familyInformationEditFrom.vue 寄养家庭表单-编辑
    title: 'familyInformationEditFrom',
    name: 'familyInformationEditFrom',
    path: 'familyInformationEditFrom',
    component: () =>
      import('./foster/InformationBoth/familyInformationEditFrom.vue')
  },
  {
    // 寄养关系
    title: 'fosterrelations',
    name: 'fosterrelations',
    path: 'fosterrelations',
    component: () => import('./foster/fosterrelations/fosterrelations.vue')
  },
  {
    // 寄养记录
    title: 'fosterRecord',
    name: 'fosterRecord',
    path: 'fosterRecord',
    component: () => import('./foster/fosterRecord/fosterRecord.vue')
  },
  {
    // 寄养记录详情
    title: 'recorddetails',
    name: 'recorddetails',
    path: 'recorddetails',
    component: () => import('./foster/fosterRecord/recorddetails.vue')
  },
  {
    // fostercare 寄养情况跟踪评估
    title: 'fostercare',
    name: 'fostercare',
    path: 'fostercare',
    component: () => import('./foster/fosterRecord/fostercare.vue')
  },
  {
    // 寄养评估 新增
    title: 'fostercareevaluation',
    name: 'fostercareevaluation',
    path: 'fostercareevaluation',
    component: () => import('./foster/fosterRecord/fostercareevaluation.vue')
  },
  {
    // fosterCarefund 家用经费
    title: 'fosterCarefund',
    name: 'fosterCarefund',
    path: 'fosterCarefund',
    component: () => import('./foster/fosterRecord/fosterCarefund.vue')
  },
  {
    // 定点医院备案
    title: 'designatedHospitalFiling',
    name: 'designatedHospitalFiling',
    path: 'designatedHospitalFiling',
    component: () =>
      import('./medicalAssistance/designatedHospitalFiling/designatedHospitalFiling.vue')
  },
  {
    // 定点医院备案-新增
    title: 'designatedHospitalFilingAdd',
    name: 'designatedHospitalFilingAdd',
    path: 'designatedHospitalFilingAdd',
    component: () =>
      import('./medicalAssistance/designatedHospitalFiling/designatedHospitalFilingAdd.vue')
  },
  {
    // 辅具器具配置机构
    title: 'applianceInstitution',
    name: 'applianceInstitution',
    path: 'applianceInstitution',
    component: () =>
      import('./medicalAssistance/applianceInstitution/applianceInstitution.vue')
  },
  {
    // 辅具器具配置机构-新增
    title: 'applianceInstitutionAdd',
    name: 'applianceInstitutionAdd',
    path: 'applianceInstitutionAdd',
    component: () =>
      import('./medicalAssistance/applianceInstitution/applianceInstitutionAdd.vue')
  },
  {
    // 基地管理-操作 basemanagement
    title: 'newBase',
    name: 'newBase',
    path: 'newBase',
    component: () => import('./rehabilitationtherapy/newBase.vue')
  },
  // 未成年人登记表单
  {
    title: 'protectionJuvenileCollection',
    name: 'protectionJuvenileCollection',
    path: 'protectionJuvenileCollection',
    component: () =>
      import('./helpProtect/juveniles/protectionJuvenileCollection.vue')
  },
  // 未成年人变更
  {
    title: 'changeInfo',
    name: 'changeInfo',
    path: 'changeInfo',
    component: () =>
      import('./helpProtect/juveniles/changeInfo.vue')
  },
  // 未成年个案
  {
    title: 'changeInfoRecord',
    name: 'changeInfoRecord',
    path: 'changeInfoRecord',
    component: () =>
      import('./helpProtect/juveniles/changeInfoRecord.vue')
  },
  // 未成年个案详情
  {
    title: 'changeInfoRecordInfo',
    name: 'changeInfoRecordInfo',
    path: 'changeInfoRecordInfo',
    component: () =>
      import('./helpProtect/juveniles/changeInfoRecordInfo.vue')
  },

  // 登记 2020年1月14日17:41:21
  {
    title: 'juvenileList',
    name: 'juvenileList',
    path: 'juvenileList',
    component: () =>
      import('./helpProtect/juveniles/juvenileList.vue')
  },
  // 登记 2020年1月14日17:41:21
  {
    title: 'LookAllInfo',
    name: 'LookAllInfo',
    path: 'LookAllInfo',
    component: () =>
      import('./helpProtect/juveniles/LookAllInfo.vue')
  }
]
