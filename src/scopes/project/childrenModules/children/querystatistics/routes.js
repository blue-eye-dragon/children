// 导出该模块路由
export default [
  // 未保机构人员统计
  {
    title: 'juvenileStatistics',
    name: 'juvenileStatistics',
    path: 'juvenileStatistics',
    component: () => import('./juvenileStatistics.vue')
  },
  // 民间机构综合查询
  {
    title: 'folkOrgComprehensiveInquiry',
    name: 'folkOrgComprehensiveInquiry',
    path: 'folkOrgComprehensiveInquiry',
    component: () => import('./folkOrgComprehensiveInquiry.vue')
  },
  // 民间机构统计
  {
    title: 'folkOrgStatistics',
    name: 'folkOrgStatistics',
    path: 'folkOrgStatistics',
    component: () => import('./folkOrgStatistics.vue')
  },
  // 福利机构养育儿童情况统计表
  {
    title: 'welfarChildrenStatistics',
    name: 'welfarChildrenStatistics',
    path: 'welfarChildrenStatistics',
    component: () => import('./welfarChildrenStatistics.vue')
  },
  // 新增随访记录
  {
    title: 'newHouseHoldFollow',
    name: 'newHouseHoldFollow',
    path: 'newHouseHoldFollow',
    component: () => import('./houseHoldFollow/newHouseHoldFollow.vue')
  },
  // 随访记录
  {
    title: 'followUpStatistics',
    name: 'followUpStatistics',
    path: 'followUpStatistics',
    component: () => import('./houseHoldFollow/followUpStatistics.vue')
  },
  // 入户随访管理
  {
    title: 'houseHoldFollowStatistics',
    name: 'houseHoldFollowStatistics',
    path: 'houseHoldFollowStatistics',
    component: () => import('./houseHoldFollowStatistics.vue')
  },
  // 入户随访查询
  {
    title: 'houseHoldFollowSearch',
    name: 'houseHoldFollowSearch',
    path: 'houseHoldFollowSearch',
    component: () => import('./houseHoldFollowSearch.vue')
  },
  // 系统业务量统计
  {
    title: 'systemBusinessStatistics',
    name: 'systemBusinessStatistics',
    path: 'systemBusinessStatistics',
    component: () => import('./systemBusinessStatistics.vue')
  },
  // 系统访问量及用户量统计
  {
    title: 'pageViews',
    name: 'pageViews',
    path: 'pageViews',
    component: () => import('./pageViews.vue')
  },
  // 维护情况统计
  {
    title: 'maintenanceStatistics',
    name: 'maintenanceStatistics',
    path: 'maintenanceStatistics',
    component: () => import('./maintenanceStatistics.vue')
  },
  // 孤儿助学数量统计
  {
    title: 'approvalofOrphanStatistics',
    name: 'approvalofOrphanStatistics',
    path: 'approvalofOrphanStatistics',
    component: () => import('./approvalofOrphanStatistics.vue')
  },
  // 福利机构查询
  {
    title: 'welfareInstitutionsSearch',
    name: 'welfareInstitutionsSearch',
    path: 'welfareInstitutionsSearch',
    component: () => import('./welfareInstitutionsSearch.vue')
  },
  // 福利机构情况统计
  {
    title: 'welfareInstitutionsStatistics',
    name: 'welfareInstitutionsStatistics',
    path: 'welfareInstitutionsStatistics',
    component: () => import('./welfareInstitutionsStatistics.vue')
  },

  // 孤儿助学登记统计
  {
    title: 'approvalofOrphanAidRecorStatistics',
    name: 'approvalofOrphanAidRecorStatistics',
    path: 'approvalofOrphanAidRecorStatistics',
    component: () => import('./approvalofOrphanAidRecorStatistics.vue')
  },
  // 留守妇女情况统计
  {
    title: 'stayBehindWomenSituation',
    name: 'stayBehindWomenSituation',
    path: 'stayBehindWomenSituation',
    component: () => import('./stayBehindWomenSituation.vue')
  },
  // 留守儿童情况统计
  {
    title: 'stayBehindChildSituation',
    name: 'stayBehindChildSituation',
    path: 'stayBehindChildSituation',
    component: () => import('./stayBehindChildSituation.vue')
  },
  // 明天计划结账申请查询
  {
    title: 'applicationSettlementRecordSearch',
    name: 'applicationSettlementRecordSearch',
    path: 'applicationSettlementRecordSearch',
    component: () => import('./applicationSettlementRecordSearch.vue')
  },
  // 孤儿助学等级查询
  {
    title: 'approvalofOrphanAidRecordSearch',
    name: 'approvalofOrphanAidRecordSearch',
    path: 'approvalofOrphanAidRecordSearch',
    component: () => import('./approvalofOrphanAidRecordSearch.vue')
  },
  // 留守妇女统计
  {
    title: 'stayBehindWomenSearchToStatistics',
    name: 'stayBehindWomenSearchToStatistics',
    path: 'stayBehindWomenSearchToStatistics',
    component: () => import('./stayBehindWomenSearchToStatistics.vue')
  },
  // 留守儿童统计
  {
    title: 'stayBehindChildSearchToStatistics',
    name: 'stayBehindChildSearchToStatistics',
    path: 'stayBehindChildSearchToStatistics',
    component: () => import('./stayBehindChildSearchToStatistics.vue')
  },
  // 孤残儿童数量查询
  {
    title: 'orphanedDisChildStatistics',
    name: 'orphanedDisChildStatistics',
    path: 'orphanedDisChildStatistics',
    component: () => import('./orphanedDisChildStatistics.vue')
  },
  // -----------------------------------------------------------------------------------------------
  // 儿童情况
  {
    title: 'childsituation',
    name: 'childsituation',
    path: 'childsituation',
    component: () => import('./basicinformationchildren/childsituation.vue')
  },
  // 救助儿童分类统计表
  {
    title: 'savechildren',
    name: 'savechildren',
    path: 'savechildren',
    component: () => import('./basicinformationchildren/savechildren.vue')
  },
  // 福利救助查询统计--综合查询--起领年月情况查询
  {
    title: 'startDateQuery',
    name: 'startDateQuery',
    path: 'startDateQuery',
    component: () => import('./welfareAssistance/comprehensiveQuery/startDateQuery.vue')
  },
  // 福利救助查询统计--统计分析--儿童残疾情况统计表
  {
    title: 'childrenDisabilityStatistics',
    name: 'childrenDisabilityStatistics',
    path: 'childrenDisabilityStatistics',
    component: () => import('./welfareAssistance/statisticalAnalysis/childrenDisabilityStatistics.vue')
  },
  // 福利救助查询统计--统计分析--儿童年龄统计表
  {
    title: 'childAgeStatistics',
    name: 'childAgeStatistics',
    path: 'childAgeStatistics',
    component: () => import('./welfareAssistance/statisticalAnalysis/childAgeStatistics.vue')
  },
  // 福利救助查询统计--统计分析--艾滋儿童情况统计表
  {
    title: 'childAidsStatistics',
    name: 'childAidsStatistics',
    path: 'childAidsStatistics',
    component: () => import('./welfareAssistance/statisticalAnalysis/childAidsStatistics.vue')
  },
  // 福利救助查询统计--统计分析--儿童患病类型统计表
  {
    title: 'childDiseaseTypeStatistical',
    name: 'childDiseaseTypeStatistical',
    path: 'childDiseaseTypeStatistical',
    component: () => import('./welfareAssistance/statisticalAnalysis/childDiseaseTypeStatistical.vue')
  },
  // 孤残儿童数量综合统计表
  {
    title: 'Statisticsorphannhandicapped',
    name: 'Statisticsorphannhandicapped',
    path: 'Statisticsorphannhandicapped',
    component: () => import('./Statisticsorphannhandicapped.vue')
  },
  // 收养登记整体情况统计
  {
    title: 'adoptiveparties',
    name: 'adoptiveparties',
    path: 'adoptiveparties',
    component: () => import('./adoptionbusiness/adoptiveparties.vue')
  },
  // 收养当事人情况统计
  {
    title: 'statisticsparties',
    name: 'statisticsparties',
    path: 'statisticsparties',
    component: () => import('./adoptionbusiness/statisticsparties.vue')
  },
  // adoptionbusinessquery 收养业务查询
  {
    title: 'adoptionbusinessquery',
    name: 'adoptionbusinessquery',
    path: 'adoptionbusinessquery',
    component: () => import('./adoptionbusiness/adoptionbusinessquery.vue')
  },
  // 福利救助查询统计--统计分析--资金到账情况统计列表
  {
    title: 'fundsToTheAccount',
    name: 'fundsToTheAccount',
    path: 'fundsToTheAccount',
    component: () => import('./welfareAssistance/statisticalAnalysis/fundsToTheAccount.vue')
  },
  // 福利救助查询统计--统计分析--资金下拨情况统计列表
  {
    title: 'fundsAllocated',
    name: 'fundsAllocated',
    path: 'fundsAllocated',
    component: () => import('./welfareAssistance/statisticalAnalysis/fundsAllocated.vue')
  },
  // 儿童主任督导员数量统计
  {
    title: 'childDirectorAndSupervisor',
    name: 'childDirectorAndSupervisor',
    path: 'childDirectorAndSupervisor',
    component: () => import('./childDirectorAndSupervisor/childDirectorAndSupervisor.vue')
  },
  // 机构统计名册
  {
    title: 'registerOfOrganizations',
    name: 'registerOfOrganizations',
    path: 'registerOfOrganizations',
    component: () => import('./welfareAssistance/statisticalAnalysis/registerOfOrganizations.vue')
  },
  // 事实无人抚养儿童整体情况统计
  {
    title: 'theOverallSituation',
    name: 'theOverallSituation',
    path: 'theOverallSituation',
    component: () => import('./theOverallSituation.vue')
  },
  // 事实无人抚养儿童分布情况地理图
  {
    title: 'geographicMap',
    name: 'geographicMap',
    path: 'geographicMap',
    component: () => import('./geographicMap.vue')
  },
  // 儿童综合统计
  {
    title: 'comprehensiveChildStatistics',
    name: 'comprehensiveChildStatistics',
    path: 'comprehensiveChildStatistics',
    component: () => import('./comprehensiveChildStatistics.vue')
  },
  // 福利机构-儿童综合统计
  {
    title: 'comprehensiveChildStatistics1',
    name: 'comprehensiveChildStatistics1',
    path: 'comprehensiveChildStatistics1',
    component: () => import('./comprehensiveChildStatistics1.vue')
  },
  // 困境儿童统计
  {
    title: 'comprehensiveChildCollect',
    name: 'comprehensiveChildCollect',
    path: 'comprehensiveChildCollect',
    component: () => import('./comprehensiveChildCollect.vue')
  },
  // 事实无人抚养儿童统计
  {
    title: 'comprehensiveChildCollect1',
    name: 'comprehensiveChildCollect1',
    path: 'comprehensiveChildCollect1',
    component: () => import('./comprehensiveChildCollect1.vue')
  },
  // 儿童救助措施统计
  {
    title: 'childAssistanceMeasuresStatistics',
    name: 'childAssistanceMeasuresStatistics',
    path: 'childAssistanceMeasuresStatistics',
    component: () => import('./childAssistanceMeasuresStatistics.vue')
  },
  // 资金发放情况统计
  {
    title: 'fundDistributionStatistics',
    name: 'fundDistributionStatistics',
    path: 'fundDistributionStatistics',
    component: () => import('./fundDistributionStatistics.vue')
  },
  // 资金发放查询
  {
    title: 'fundDistributionSearch',
    name: 'fundDistributionSearch',
    path: 'fundDistributionSearch',
    component: () => import('./fundDistributionSearch.vue')
  },
  // 机构数量查询
  {
    title: 'institutionNumberQuery',
    name: 'institutionNumberQuery',
    path: 'institutionNumberQuery',
    component: () => import('./institutionNumberQuery.vue')
  },
  // 机构数量统计
  {
    title: 'institutionNumberStatistic',
    name: 'institutionNumberStatistic',
    path: 'institutionNumberStatistic',
    component: () => import('./institutionNumberStatistic.vue')
  },
  // 孤儿台账导出
  {
    title: 'orphanLedgerExport',
    name: 'orphanLedgerExport',
    path: 'orphanLedgerExport',
    component: () => import('./orphanLedgerExport.vue')
  },
  // 资金发放情况统计
  {
    title: 'disbursementOfFunds',
    name: 'disbursementOfFunds',
    path: 'disbursementOfFunds',
    component: () => import('./disbursementOfFunds.vue')
  },
  // 留守儿童综合
  {
    title: 'stayBehindChildSearch',
    name: 'stayBehindChildSearch',
    path: 'stayBehindChildSearch',
    component: () => import('./stayBehindChildSearch.vue')
  },
  // 留守妇女综合
  {
    title: 'stayBehindWomenSearch',
    name: 'stayBehindWomenSearch',
    path: 'stayBehindWomenSearch',
    component: () => import('./stayBehindWomenSearch.vue')
  },
  // 儿童福利机构
  {
    title: 'childWelfareAgencySearch',
    name: 'childWelfareAgencySearch',
    path: 'childWelfareAgencySearch',
    component: () => import('./childWelfareAgencySearch.vue')
  },
  // 未成年人救助
  {
    title: 'protectionAgencySearch',
    name: 'protectionAgencySearch',
    path: 'protectionAgencySearch',
    component: () => import('./protectionAgencySearch.vue')
  },
  // 未保中心情况统计
  {
    title: 'uninsuredCenterStatistics',
    name: 'uninsuredCenterStatistics',
    path: 'uninsuredCenterStatistics',
    component: () => import('./uninsuredCenterStatistics.vue')
  },
  // 跨省通办数量统计
  {
    title: 'acrossProNumberStatistics',
    name: 'acrossProNumberStatistics',
    path: 'acrossProNumberStatistics',
    component: () => import('./acrossProStatistics/acrossProNumberStatistics.vue')
  },


]
