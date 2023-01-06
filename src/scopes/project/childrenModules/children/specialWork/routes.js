// 导出该模块路由
export default [
  // 社会关爱-关爱服务资源发布
  {
    title: 'careServiceResourcesDe',
    name: 'careServiceResourcesDe',
    path: 'careServiceResourcesDe',
    component: () =>
      import('./socialCareServices/informationDelivery/careServiceResourcesDe.vue')
  },
  // 社会关爱-发布资源信息
  {
    title: 'publishResources',
    name: 'publishResources',
    path: 'publishResources',
    component: () =>
      import('./socialCareServices/components/publishResources.vue')
  },
  // 社会关爱-儿童需求发布
  {
    title: 'childrenNeedsDe',
    name: 'childrenNeedsDe',
    path: 'childrenNeedsDe',
    component: () =>
      import('./socialCareServices/informationDelivery/childrenNeedsDe.vue')
  },
  // 社会关爱-发布需求信息
  {
    title: 'publishNeeds',
    name: 'publishNeeds',
    path: 'publishNeeds',
    component: () => import('./socialCareServices/components/publishNeeds.vue')
  },
  // 社会关爱-关爱服务资源信息查询
  {
    title: 'careServiceResourcesQu',
    name: 'careServiceResourcesQu',
    path: 'careServiceResourcesQu',
    component: () =>
      import('./socialCareServices/informationQuery/careServiceResourcesQu.vue')
  },
  // 社会关爱-儿童需求信息查询
  {
    title: 'childrenNeedsQu',
    name: 'childrenNeedsQu',
    path: 'childrenNeedsQu',
    component: () =>
      import('./socialCareServices/informationQuery/childrenNeedsQu.vue')
  },
  // 社会关爱-匹配记录
  {
    title: 'matchingRecord',
    name: 'matchingRecord',
    path: 'matchingRecord',
    component: () =>
      import('./socialCareServices/informationMatching/matchingRecord.vue')
  },
  // 社会关爱-匹配记录详情
  {
    title: 'needsAndResourcesDetail',
    name: 'needsAndResourcesDetail',
    path: 'needsAndResourcesDetail',
    component: () =>
      import('./socialCareServices/components/needsAndResourcesDetail.vue')
  },
  // 专项排查-专项指标库管理
  {
    title: 'specialIndexDatabase',
    name: 'specialIndexDatabase',
    path: 'specialIndexDatabase',
    component: () =>
      import('./specialInvestigation/specialIndexDatabase/specialIndexDatabase.vue')
  },
  // 专项排查-专项指标库管理-新增
  {
    title: 'specialIndexDatabaseAdd',
    name: 'specialIndexDatabaseAdd',
    path: 'specialIndexDatabaseAdd',
    component: () =>
      import('./specialInvestigation/specialIndexDatabase/specialIndexDatabaseAdd.vue')
  },
  // 专项排查-专项排查任务维护
  {
    title: 'specialTaskMaintenance',
    name: 'specialTaskMaintenance',
    path: 'specialTaskMaintenance',
    component: () =>
      import('./specialInvestigation/specialTaskManagement/specialTaskMaintenance.vue')
  },
  // 专项排查-专项排查任务下载
  {
    title: 'specialTaskDownload',
    name: 'specialTaskDownload',
    path: 'specialTaskDownload',
    component: () =>
      import('./specialInvestigation/specialTaskManagement/specialTaskDownload.vue')
  },
  // 专项排查-发布大排查任务
  {
    title: 'releaseBigTroubleshootingTasks',
    name: 'releaseBigTroubleshootingTasks',
    path: 'releaseBigTroubleshootingTasks',
    component: () =>
      import('./specialInvestigation/specialTaskManagement/releaseBigTroubleshootingTasks.vue')
  },
  // 专项排查-自查结果录入
  {
    title: 'specialSelfInspectionResults',
    name: 'specialSelfInspectionResults',
    path: 'specialSelfInspectionResults',
    component: () =>
      import('./specialInvestigation/specialSelfInspectionResults/specialSelfInspectionResults.vue')
  },
  // 专项排查-自查结果录入-录入专项排查结果
  {
    title: 'enterSpecialTroubleshootingResults',
    name: 'enterSpecialTroubleshootingResults',
    path: 'enterSpecialTroubleshootingResults',
    component: () =>
      import('./specialInvestigation/specialSelfInspectionResults/enterSpecialTroubleshootingResults.vue')
  },
  // 专项排查-检查结果录入
  {
    title: 'specialInspectionResults',
    name: 'specialInspectionResults',
    path: 'specialInspectionResults',
    component: () =>
      import('./specialInvestigation/specialInspectionResults/specialInspectionResults.vue')
  },
  // 专项排查-检查结果录入-录入专项排查结果
  {
    title: 'enterSpecialTroubleResult',
    name: 'enterSpecialTroubleResult',
    path: 'enterSpecialTroubleResult',
    component: () =>
      import('./specialInvestigation/specialInspectionResults/enterSpecialTroubleResult.vue')
  },
  // 专项排查-专项排查综合查询
  {
    title: 'specialComprehensiveQuery',
    name: 'specialComprehensiveQuery',
    path: 'specialComprehensiveQuery',
    component: () =>
      import('./specialInvestigation/specialComprehensiveQuery/specialComprehensiveQuery.vue')
  },
  // 专项排查-专项排查综合查询-查看详情
  {
    title: 'lookDetail',
    name: 'lookDetail',
    path: 'lookDetail',
    component: () =>
      import('./specialInvestigation/specialComprehensiveQuery/lookDetail.vue')
  },
  // 专项排查-专项排查统计报表-专项排查综合统计
  {
    title: 'comprehensiveStatistics',
    name: 'comprehensiveStatistics',
    path: 'comprehensiveStatistics',
    component: () =>
      import('./specialInvestigation/specialStatisticalReport/comprehensiveStatistics.vue')
  },
  // 专项排查-专项排查统计报表-散居儿童养育情况统计
  {
    title: 'parentingStatistics',
    name: 'parentingStatistics',
    path: 'parentingStatistics',
    component: () =>
      import('./specialInvestigation/specialStatisticalReport/parentingStatistics.vue')
  }

]
