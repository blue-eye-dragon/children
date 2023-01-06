// 导出该模块路由
export default [
  // 孤儿基本生活费发放
  {
    title: 'paymentOfLivingExpenses',
    name: 'paymentOfLivingExpenses',
    path: 'paymentOfLivingExpenses',
    component: () => import('./fundsToIssue/paymentOfLivingExpenses.vue')
  },
  // 孤儿基本生活费发放详情（1）
  {
    title: 'paymentOfLivingExpensesInfo',
    name: 'paymentOfLivingExpensesInfo',
    path: 'paymentOfLivingExpensesInfo',
    component: () => import('./fundsToIssue/paymentOfLivingExpensesInfo.vue')
  },
  // 新增发放
  {
    title: 'newAdd',
    name: 'newAdd',
    path: 'newAdd',
    component: () => import('./fundsToIssue/newAdd.vue')
  },
  // 新增补发
  {
    title: 'reissueAdd',
    name: 'reissueAdd',
    path: 'reissueAdd',
    component: () => import('./fundsToIssue/reissueAdd.vue')
  },
  // 孤儿助学工程
  {
    title: 'orphanassistance',
    name: 'orphanassistance',
    path: 'orphanassistance',
    component: () => import('./fundsToIssue/orphanassistance/orphanassistance.vue')
  },
  // 孤儿助学工程详情
  {
    title: 'studentassistanceDetail',
    name: 'studentassistanceDetail',
    path: 'studentassistanceDetail/:obj',
    component: () => import('./fundsToIssue/orphanassistance/studentassistanceDetail.vue')
  },
  // 经费
  {
    title: 'funds',
    name: 'funds',
    path: 'funds',
    component: () => import('./fundsToIssue/orphanassistance/funds.vue')
  },
  // 经费详情列表
  {
    title: 'fundsDetail',
    name: 'fundsDetail',
    path: 'fundsDetail',
    component: () => import('./fundsToIssue/orphanassistance/fundsDetail.vue')
  },
  // 经费新增
  {
    title: 'fundsAdd',
    name: 'fundsAdd',
    path: 'fundsAdd',
    component: () => import('./fundsToIssue/orphanassistance/fundsAdd.vue')
  },
  // 无人扶养
  {
    title: 'nosupport',
    name: 'nosupport',
    path: 'nosupport',
    component: () => import('./fundsToIssue/nosupport/nosupport.vue')
  },
  // 艾滋病
  {
    title: 'aids',
    name: 'aids',
    path: 'aids',
    component: () => import('./fundsToIssue/aids/aids.vue')
  },
  // 福利資金發放
  {
    title: 'paymentfunds',
    name: 'paymentfunds',
    path: 'paymentfunds',
    component: () => import('./fundsToIssue/paymentfunds.vue')
  },
  // 儿童福利补贴预算管理----儿童福利补贴预算任务维护
  {
    title: 'childWelfareSubsMaintain',
    name: 'childWelfareSubsMaintain',
    path: 'childWelfareSubsMaintain',
    component: () => import('./welfareSubsidyManage/childWelfareSubsMaintain.vue')
  },
  // 儿童福利补贴预算管理----儿童福利补贴预算任务下载
  {
    title: 'childWelfareSubsDownload',
    name: 'childWelfareSubsDownload',
    path: 'childWelfareSubsDownload',
    component: () => import('./welfareSubsidyManage/childWelfareSubsDownload.vue')
  },
  // 儿童福利补贴预算管理----困境儿童福利补贴预算方案制定
  {
    title: 'childsubsDifficultFormulation',
    name: 'childsubsDifficultFormulation',
    path: 'childsubsDifficultFormulation',
    component: () => import('./welfareSubsidyManage/childsubsDifficultFormulation.vue')
  },
  // 儿童福利补贴预算管理----困境儿童福利补贴预算方案上报记录
  {
    title: 'childsubsDifficultFormulRecord',
    name: 'childsubsDifficultFormulRecord',
    path: 'childsubsDifficultFormulRecord',
    component: () => import('./welfareSubsidyManage/childsubsDifficultFormulRecord.vue')
  },
  // 儿童福利补贴预算管理----孤儿基本生活费福利补贴预算方案制定
  {
    title: 'childsubsOrphanFormulation',
    name: 'childsubsOrphanFormulation',
    path: 'childsubsOrphanFormulation',
    component: () => import('./welfareSubsidyManage/childsubsOrphanFormulation.vue')
  },
  // 儿童福利补贴预算管理----孤儿基本生活费福利补贴预算方案上报记录
  {
    title: 'childsubsOrphanFormulRecord',
    name: 'childsubsOrphanFormulRecord',
    path: 'childsubsOrphanFormulRecord',
    component: () => import('./welfareSubsidyManage/childsubsOrphanFormulRecord.vue')
  },

  // 困境儿童福利补贴到账
  {
    title: 'childDifficultSubsidies',
    name: 'childDifficultSubsidies',
    path: 'childDifficultSubsidies',
    component: () => import('./fundDifficultChildren/childDifficultSubsidies.vue')
  },
  // 孤儿儿童福利补贴到账
  {
    title: 'childOrphanSubsidies',
    name: 'childOrphanSubsidies',
    path: 'childOrphanSubsidies',
    component: () => import('./fundOrphanChildren/childOrphanSubsidies.vue')
  },
  // 儿童福利项目补贴到账
  {
    title: 'childProjectSubsidies',
    name: 'childProjectSubsidies',
    path: 'childProjectSubsidies',
    component: () => import('./fundProjectChildren/childProjectSubsidies.vue')
  },
  // 困境儿童福利补贴下拨
  {
    title: 'childDiffSubsAllocation',
    name: 'childDiffSubsAllocation',
    path: 'childDiffSubsAllocation',
    component: () => import('./fundDifficultChildren/childDiffSubsAllocation.vue')
  },
  // 资金下拨登记---第一步
  {
    title: 'registrationFund',
    name: 'registrationFund',
    path: 'registrationFund',
    component: () => import('./fundDifficultChildren/registrationFund.vue')
  },
  // 资金下拨登记---第二步
  {
    title: 'registrationFundTwo',
    name: 'registrationFundTwo',
    path: 'registrationFundTwo',
    component: () => import('./fundDifficultChildren/registrationFundTwo.vue')
  },
  // 孤儿儿童福利补贴下拨
  {
    title: 'childOrphanAllocation',
    name: 'childOrphanAllocation',
    path: 'childOrphanAllocation',
    component: () => import('./fundOrphanChildren/childOrphanAllocation.vue')
  },
  // 资金下拨登记---第一步
  {
    title: 'registrationOrphanFund',
    name: 'registrationOrphanFund',
    path: 'registrationOrphanFund',
    component: () => import('./fundOrphanChildren/registrationOrphanFund.vue')
  },
  // 资金下拨登记---第二步
  {
    title: 'registrationOrphanFundTwo',
    name: 'registrationOrphanFundTwo',
    path: 'registrationOrphanFundTwo',
    component: () => import('./fundOrphanChildren/registrationOrphanFundTwo.vue')
  },
  // 详情
  {
    title: 'registrationOrphanFundTwoDetail',
    name: 'registrationOrphanFundTwoDetail',
    path: 'registrationOrphanFundTwoDetail',
    component: () => import('./fundOrphanChildren/registrationOrphanFundTwoDetail.vue')
  },
  {
    title: 'registrationProjectFundTwoDetail',
    name: 'registrationProjectFundTwoDetail',
    path: 'registrationProjectFundTwoDetail',
    component: () => import('./fundProjectChildren/registrationProjectFundTwoDetail.vue')
  },
  {
    title: 'registrationFundTwoDetail',
    name: 'registrationFundTwoDetail',
    path: 'registrationFundTwoDetail',
    component: () => import('./fundDifficultChildren/registrationFundTwoDetail.vue')
  },
  // 儿童福利资助下拨
  {
    title: 'childProjectAllocation',
    name: 'childProjectAllocation',
    path: 'childProjectAllocation',
    component: () => import('./fundProjectChildren/childProjectAllocation.vue')
  },
  // 资金下拨登记---第一步
  {
    title: 'registrationProjectFund',
    name: 'registrationProjectFund',
    path: 'registrationProjectFund',
    component: () => import('./fundProjectChildren/registrationProjectFund.vue')
  },
  // 资金下拨登记---第二步
  {
    title: 'registrationProjectFundTwo',
    name: 'registrationProjectFundTwo',
    path: 'registrationProjectFundTwo',
    component: () => import('./fundProjectChildren/registrationProjectFundTwo.vue')
  },
  // 儿童福利机构建设资助到账
  {
    title: 'childWelfarFund',
    name: 'childWelfarFund',
    path: 'childWelfarFund',
    component: () => import('./fundProjectChildren/childWelfarFund.vue')
  },
  // 儿童福利机构建设资助下拨
  {
    title: 'childwelfarInstitu',
    name: 'childwelfarInstitu',
    path: 'childwelfarInstitu',
    component: () => import('./fundProjectChildren/childwelfarInstitu.vue')
  },
  // 儿童福利资金统计
  {
    title: 'childWelfareFundsStatistics',
    name: 'childWelfareFundsStatistics',
    path: 'childWelfareFundsStatistics',
    component: () => import('./fundProjectChildren/childWelfareFundsStatistics.vue')
  },
  // 实事无人扶养儿童管理
  {
    title: 'managementOfUnsupportedChildren',
    name: 'managementOfUnsupportedChildren',
    path: 'managementOfUnsupportedChildren',
    component: () => import('./managementOfUnsupportedChildren/managementOfUnsupportedChildren.vue')
  },
  // 实事无人扶养儿童管理-费用记录
  {
    title: 'maintenancePaymentRecord',
    name: 'maintenancePaymentRecord',
    path: 'maintenancePaymentRecord',
    component: () => import('./managementOfUnsupportedChildren/maintenancePaymentRecord.vue')
    // 事实无人抚养儿童生活补贴发放
  },
  {
    title: 'paymentOfLivingAllowance',
    name: 'paymentOfLivingAllowance',
    path: 'paymentOfLivingAllowance',
    component: () => import('./paymentOfLivingAllowance/paymentOfLivingAllowance.vue')
  },
  // 新增发放
  {
    title: 'addIssue',
    name: 'addIssue',
    path: 'addIssue',
    component: () => import('./paymentOfLivingAllowance/addIssue.vue')
  },
  // 事实无人抚养儿童生活补贴发放-详情
  {
    title: 'detail',
    name: 'detail',
    path: 'detail',
    component: () => import('./paymentOfLivingAllowance/detail.vue')
  },
  // 儿童福利资金管理--资金下拨
  {
    title: 'childzijinxiabo',
    name: 'childzijinxiabo',
    path: 'childzijinxiabo',
    component: () => import('./childWelfareManage/childzijinxiabo.vue')
  },
  // 儿童福利资金管理--资金下拨--第一步
  {
    title: 'xiaboOne',
    name: 'xiaboOne',
    path: 'xiaboOne',
    component: () => import('./childWelfareManage/xiaboOne.vue')
  },
  // 儿童福利资金管理--资金下拨--第二步
  {
    title: 'xiaboTwo',
    name: 'xiaboTwo',
    path: 'xiaboTwo',
    component: () => import('./childWelfareManage/xiaboTwo.vue')
  },
  // 儿童福利资金管理--资金下拨--查看
  {
    title: 'childxiaboDetail',
    name: 'childxiaboDetail',
    path: 'childxiaboDetail',
    component: () => import('./childWelfareManage/childxiaboDetail.vue')
  },
  // 儿童福利资金管理--资金到账
  {
    title: 'childZijindaozhang',
    name: 'childZijindaozhang',
    path: 'childZijindaozhang',
    component: () => import('./childWelfareManage/childZijindaozhang.vue')
  },
  // 资金发放计划
  {
    title: 'fundDistributionPlan',
    name: 'fundDistributionPlan',
    path: 'fundDistributionPlan',
    component: () => import('./fundsToIssue/fundDistributionPlan.vue')
  }
]
