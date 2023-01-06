// 导出该模块路由
export default [
  // 增员评估报告
  {
    title: 'examineAssessment',
    name: 'examineAssessment',
    path: 'examineAssessment',
    component: () => import('./increasepersonnel/examineAssessment.vue')
  },
  // 增员审批
  {
    title: 'increasepersonnel',
    name: 'increasepersonnel',
    path: 'increasepersonnel',
    component: () => import('./increasepersonnel/increasepersonnel.vue')
  },
  // 增员审批-异地
  {
    title: 'ipOtherIncreasepersonnel',
    name: 'ipOtherIncreasepersonnel',
    path: 'ipOtherIncreasepersonnel',
    component: () => import('./increasepersonnel/ipOtherIncreasepersonnel.vue')
  },
  // 增员审批详情
  {
    title: 'ipApproval',
    name: 'ipApproval',
    path: 'ipApproval',
    component: () => import('./increasepersonnel/ipApproval.vue')
  },
  // 增员审批详情-异地
  {
    title: 'ipOtheripApproval',
    name: 'ipOtheripApproval',
    path: 'ipOtheripApproval',
    component: () => import('./increasepersonnel/ipOtheripApproval.vue')
  },
  // 批量审批
  {
    title: 'batch',
    name: 'batch',
    path: 'batch',
    component: () => import('./increasepersonnel/batch.vue')
  },
  // 异地增员申请记录
  {
    title: 'ipOtherApplicationRecord',
    name: 'ipOtherApplicationRecord',
    path: 'ipOtherApplicationRecord',
    component: () => import('./increasepersonnel/ipOtherApplicationRecord.vue')
  },
  // 增员申请记录
  {
    title: 'ipApplicationRecord',
    name: 'ipApplicationRecord',
    path: 'ipApplicationRecord',
    component: () => import('./increasepersonnel/ipApplicationRecord.vue')
  },
  // 超龄补录
  {
    title: 'overAgeSupplement',
    name: 'overAgeSupplement',
    path: 'overAgeSupplement',
    component: () => import('./increasepersonnel/overAgeSupplement.vue')
  },
  // 查看增员申请记录
  {
    title: 'viewRecords',
    name: 'viewRecords',
    path: 'viewRecords',
    component: () => import('./increasepersonnel/viewRecords.vue')
  },
  // 编辑增员申请记录
  // {
  //   title: 'editingRecords',
  //   name: 'editingRecords',
  //   path: 'editingRecords',
  //   component: () => import('./increasepersonnel/editingRecords.vue')
  // },
  // 撤销增员申请记录
  {
    title: 'revokeRecords',
    name: 'revokeRecords',
    path: 'revokeRecords',
    component: () => import('./increasepersonnel/revokeRecords.vue')
  },
  // 评估表单
  {
    title: 'assessmentFrom',
    name: 'assessmentFrom',
    path: 'assessmentFrom',
    component: () => import('./increasepersonnel/assessmentFrom.vue')
  },
  // 减员申请列表
  {
    title: 'attritionRecord',
    name: 'attritionRecord',
    path: 'attritionRecord',
    component: () => import('./attrition/attritionRecord.vue')
  },
  // 减员审批
  {
    title: 'attritionApproval',
    name: 'attritionApproval',
    path: 'attritionApproval',
    component: () => import('./attrition/attritionApproval.vue')
  },
  // 减员审批表单
  {
    title: 'attritionApprovalFrom',
    name: 'attritionApprovalFrom',
    path: 'attritionApprovalFrom',
    component: () => import('./attrition/attritionApprovalFrom.vue')
  },
  // 撤销增员申请记录
  {
    title: 'revokeAttritionRecords',
    name: 'revokeAttritionRecords',
    path: 'revokeAttritionRecords',
    component: () => import('./attrition/revokeAttritionRecords.vue')
  },
  // 变更申请记录
  {
    title: 'changesRecord',
    name: 'changesRecord',
    path: 'changesRecord',
    component: () => import('./changes/changesRecord.vue')
  },
  // 变更审批
  {
    title: 'changesApproval',
    name: 'changesApproval',
    path: 'changesApproval',
    component: () => import('./changes/changesApproval.vue')
  },
  // 变更详情
  {
    title: 'changeApprovalFrom',
    name: 'changeApprovalFrom',
    path: 'changeApprovalFrom',
    component: () => import('./changes/changeApprovalFrom.vue')
  },
  // 撤销变更申请记录
  {
    title: 'revokeChangeRecords',
    name: 'revokeChangeRecords',
    path: 'revokeChangeRecords',
    component: () => import('./changes/revokeChangeRecords.vue')
  },
  // 医疗救助-救助审批
  {
    title: 'salvageApproval',
    name: 'salvageApproval',
    path: 'salvageApproval',
    component: () => import('./medicalHelp/salvageApproval/salvageApproval.vue')
  },
  // 审核管理-医疗救助-救助审批-审批
  {
    title: 'salvageApprovalBatches',
    name: 'salvageApprovalBatches',
    path: 'salvageApprovalBatches',
    component: () =>
      import('./medicalHelp/salvageApproval/salvageApprovalBatches.vue')
  },
  // 审核管理-医疗救助-变更审批
  {
    title: 'applicationChange',
    name: 'applicationChange',
    path: 'applicationChange',
    component: () =>
      import('./medicalHelp/applicationChange/applicationChange.vue')
  },
  // 审核管理-医疗救助-变更审批--审批
  {
    title: 'applicationChangeBatches',
    name: 'applicationChangeBatches',
    path: 'applicationChangeBatches',
    component: () =>
      import('./medicalHelp/applicationChange/applicationChangeBatches.vue')
  },

  // 审核管理-医疗救助-结账审批
  {
    title: 'approvalCloseAccount',
    name: 'approvalCloseAccount',
    path: 'approvalCloseAccount',
    component: () =>
      import('./medicalHelp/approvalCloseAccount/approvalCloseAccount.vue')
  },
  // 审核管理-医疗救助-结账审批-详情
  {
    title: 'approvalCloseAccountBatches',
    name: 'approvalCloseAccountBatches',
    path: 'approvalCloseAccountBatches',
    component: () =>
      import('./medicalHelp/approvalCloseAccount/approvalCloseAccountBatches.vue')
  },
  // 事实无人抚养儿童信息上报审批
  // 信息上报审批列表
  {
    title: 'infoReportApproval',
    name: 'infoReportApproval',
    path: 'infoReportApproval',
    component: () =>
      import('./actualUnaccompanChildReport/infoReportApproval.vue')
  },
  // 信息上报审批列表-异地
  {
    title: 'infoOtherReportApproval',
    name: 'infoOtherReportApproval',
    path: 'infoOtherReportApproval',
    component: () =>
      import('./actualUnaccompanChildReport/infoOtherReportApproval.vue')
  },
  // 异地信息上报审批列表
  {
    title: 'infoOtherReportRecord',
    name: 'infoOtherReportRecord',
    path: 'infoOtherReportRecord',
    component: () =>
      import('./actualUnaccompanChildReport/infoOtherReportRecord.vue')
  },
  // 信息上报审批记录
  {
    title: 'auditLog',
    name: 'auditLog',
    path: 'auditLog',
    component: () =>
      import('./actualUnaccompanChildReport/auditLog.vue')
  },
  // 信息上报审批记录-异地
  {
    title: 'auditOtherLog',
    name: 'auditOtherLog',
    path: 'auditOtherLog',
    component: () =>
      import('./actualUnaccompanChildReport/auditOtherLog.vue')
  },
  // 信息上报列表
  {
    title: 'infoReportRecord',
    name: 'infoReportRecord',
    path: 'infoReportRecord',
    component: () =>
      import('./actualUnaccompanChildReport/infoReportRecord.vue')
  },
  // 事实无人抚养儿童身份状态变更审批
  // 身份状态变更审批
  {
    title: 'infoChangeReportApproval',
    name: 'infoChangeReportApproval',
    path: 'infoChangeReportApproval',
    component: () =>
      import('./actualUnaccChildStatuChangeReport/infoChangeReportApproval.vue')
  },
  // 身份状态变更记录
  {
    title: 'infoChangeReportRecord',
    name: 'infoChangeReportRecord',
    path: 'infoChangeReportRecord',
    component: () =>
      import('./actualUnaccChildStatuChangeReport/infoChangeReportRecord.vue')
  },
  // 审批
  {
    title: 'actualUnaccChildStatuChangeFor',
    name: 'actualUnaccChildStatuChangeFor',
    path: 'actualUnaccChildStatuChangeFor',
    component: () =>
      import('./actualUnaccChildStatuChangeReport/actualUnaccChildStatuChangeFor.vue')
  },
  // 事实无人抚养儿童信息变更审批
  // 信息变更审批
  {
    title: 'informationChangeApproval',
    name: 'informationChangeApproval',
    path: 'informationChangeApproval',
    component: () =>
      import('./actualUnaccChildInfoChangeReport/informationChangeApproval.vue')
  },
  // 信息变更记录
  {
    title: 'informationChangeRecord',
    name: 'informationChangeRecord',
    path: 'informationChangeRecord',
    component: () =>
      import('./actualUnaccChildInfoChangeReport/informationChangeRecord.vue')
  },
  // 审批
  {
    title: 'actualUnaccChildChangeFor',
    name: 'actualUnaccChildChangeFor',
    path: 'actualUnaccChildChangeFor',
    component: () =>
      import('./actualUnaccChildInfoChangeReport/actualUnaccChildChangeFor.vue')
  },
  // 孤儿助学审批
  {
    title: 'approvalofOrphanAid',
    name: 'approvalofOrphanAid',
    path: 'approvalofOrphanAid',
    component: () =>
      import('./orphanAid/approvalofOrphanAid.vue')
  },
  // {
  //   title: 'studentExamination',
  //   name: 'studentExamination',
  //   path: 'studentExamination',
  //   component: () =>
  //     import('./orphanAid/studentExamination.vue')
  // },
  // 孤儿助学申请-审批
  {
    title: 'aidApproval',
    name: 'aidApproval',
    path: 'aidApproval',
    component: () =>
      import('./orphanAid/aidApproval.vue')
  },
  // 孤儿助学申请-撤回
  {
    title: 'aidRevokeRecords',
    name: 'aidRevokeRecords',
    path: 'aidRevokeRecords',
    component: () =>
      import('./orphanAid/aidRevokeRecords.vue')
  },
  // 孤儿助学申请记录
  {
    title: 'approvalofOrphanAidRecord',
    name: 'approvalofOrphanAidRecord',
    path: 'approvalofOrphanAidRecord',
    component: () =>
      import('./orphanAid/approvalofOrphanAidRecord.vue')
  },
  // 异地儿童的查看
  {
    title: 'otherInformation',
    name: 'otherInformation',
    path: 'otherInformation',
    component: () =>
      import('./components/otherInformation.vue')
  }

]
