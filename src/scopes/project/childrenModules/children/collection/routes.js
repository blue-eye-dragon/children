// 导出该模块路由
export default [
  // 儿童信息采集 修改
  {
    title: 'childInfoCollection',
    name: 'childInfoCollection',
    path: 'childInfoCollection',
    component: () => import('./childInfoCollection/collectionout.vue')

  },

  // 孤残
  {
    title: 'orphansHandicapped',
    name: 'orphansHandicapped',
    path: 'orphansHandicapped',
    component: () => import('./childInformation/orphansHandicapped.vue')
  },
  // 信息变更
  {
    title: 'childInfoChange',
    name: 'childInfoChange',
    path: 'childInfoChange',
    component: () => import('./childInfoChange/childInfoChange.vue')
  },
  // 事实无人扶养
  {
    title: 'noonesupportfact',
    name: 'noonesupportfact',
    path: 'noonesupportfact',
    component: () => import('./childInfoCollection/noonesupportfact.vue')
  },
  // 留守儿童
  {
    title: 'leftbehindchildren',
    name: 'leftbehindchildren',
    path: 'leftbehindchildren',
    component: () => import('./childInfoCollection/leftbehindchildren.vue')
  },
  // 困境儿童
  {
    title: 'dilemmachildren',
    name: 'dilemmachildren',
    path: 'dilemmachildren',
    component: () => import('./childInfoCollection/dilemmachildren.vue')
  },
  // 变更申请
  {
    title: 'changeApply',
    name: 'changeApply',
    path: 'changeApply',
    component: () => import('./childInfoChange/changeApply.vue')
  },
  // 儿童 家庭成员
  {
    title: 'family',
    name: 'family',
    path: 'family',
    component: () => import('./childInformation/family.vue')
  },
  // 儿童信息采集重复数据列表
  {
    title: 'judgeRepetition',
    name: 'judgeRepetition',
    path: 'judgeRepetition',
    component: () => import('./childInfoCollection/judgeRepetition.vue')
  },
  // 儿童信息采集重复数据列表2
  {
    title: 'copyjudgeRepetition',
    name: 'copyjudgeRepetition',
    path: 'copyjudgeRepetition',
    component: () => import('./childInfoCollection/copyjudgeRepetition.vue')
  },
  // 儿童信息采集重复数据查看（在流程中）
  {
    title: 'lookProcess',
    name: 'lookProcess',
    path: 'lookProcess',
    component: () => import('./childInfoCollection/lookProcess.vue')
  },
  // 儿童主任信息维护
  {
    title: 'childrenDirectorInfoMaintain',
    name: 'childrenDirectorInfoMaintain',
    path: 'childrenDirectorInfoMaintain',
    component: () =>
      import('./childrenDirectorInfoCollection/childrenDirectorInfoMaintain.vue')
  },
  // 督导员1
  {
    title: 'childrenDirectorInfoMaintain1',
    name: 'childrenDirectorInfoMaintain1',
    path: 'childrenDirectorInfoMaintain1',
    component: () =>
      import('./childrenDirectorInfoCollection/childrenDirectorInfoMaintain1.vue')
  },
  // 儿童主任2
  {
    title: 'childrenDirectorInfoMaintain2',
    name: 'childrenDirectorInfoMaintain2',
    path: 'childrenDirectorInfoMaintain2',
    component: () =>
      import('./childrenDirectorInfoCollection/childrenDirectorInfoMaintain2.vue')
  },
  // 关联儿童列表
  {
    title: 'relatedChildrenList',
    name: 'relatedChildrenList',
    path: 'relatedChildrenList',
    component: () =>
      import('./childrenDirectorInfoCollection/relatedChildrenList.vue')
  },
  // 关联儿童主任列表
  {
    title: 'relatedChildDirectorList',
    name: 'relatedChildDirectorList',
    path: 'relatedChildDirectorList',
    component: () =>
      import('./childrenDirectorInfoCollection/relatedChildDirectorList.vue')
  },
  // 关联儿童信息
  {
    title: 'relatedChildren',
    name: 'relatedChildren',
    path: 'relatedChildren',
    component: () =>
      import('./childrenDirectorInfoCollection/relatedChildren.vue')
  },
  // 关联儿童主任信息
  {
    title: 'relatedChildDirector',
    name: 'relatedChildDirector',
    path: 'relatedChildDirector',
    component: () =>
      import('./childrenDirectorInfoCollection/relatedChildDirector.vue')
  },
  // 事实无人抚养儿童信息变更
  {
    title: 'factRaiseChildInfoChange',
    name: 'factRaiseChildInfoChange',
    path: 'factRaiseChildInfoChange',
    component: () =>
      import('./childInformationChange/factRaiseChildInfoChange.vue')
  },
  // 事实无人抚养儿童身份状态变更
  {
    title: 'factRaiseChildStatusChange',
    name: 'factRaiseChildStatusChange',
    path: 'factRaiseChildStatusChange',
    component: () =>
      import('./childInformationChange/factRaiseChildStatusChange.vue')
  },
  // 变更申请
  {
    title: 'applyChangeFrom',
    name: 'applyChangeFrom',
    path: 'applyChangeFrom',
    component: () =>
      import('./childInformationChange/applyChangeFrom.vue')
  },
  // 变更申请-生活费情况
  {
    title: 'livingCostsGrant',
    name: 'livingCostsGrant',
    path: 'livingCostsGrant',
    component: () =>
      import('./childInformationChange/livingCostsGrant.vue')
  },
  // 留守妇女
  {
    title: 'leftbehindwomen',
    name: 'leftbehindwomen',
    path: 'leftbehindwomen',
    component: () => import('./childInfoCollection/leftbehindwomen.vue')
  },
  // 孤儿助学工程信息采集
  {
    title: 'orphanProject',
    name: 'orphanProject',
    path: 'orphanProject',
    component: () => import('./childInformation/orphanProject.vue')
  },
  // 孤儿助学工程信息采集信息重复
  {
    title: 'judgeRepetition2',
    name: 'judgeRepetition2',
    path: 'judgeRepetition2',
    component: () => import('./childInformation/components/judgeRepetition2.vue')
  },
  // 困境采集
  {
    title: 'dilemmaCollection',
    name: 'dilemmaCollection',
    path: 'dilemmaCollection',
    component: () => import('./dilemma/dilemmaCollection.vue')
  },
  // 困境采集list
  {
    title: 'dilemmaList',
    name: 'dilemmaList',
    path: 'dilemmaList',
    component: () => import('./dilemma/dilemmaList.vue')
  },
  // 困境采集变更
  {
    title: 'dilemmaChangeInfo',
    name: 'dilemmaChangeInfo',
    path: 'dilemmaChangeInfo',
    component: () => import('./dilemma/dilemmaChangeInfo.vue')
  },
  // 留守儿童列表
  {
    title: 'stayAtHomeList',
    name: 'stayAtHomeList',
    path: 'stayAtHomeList',
    component: () => import('./stayAtHome/stayAtHomeList.vue')
  }, // 留守儿童新增
  {
    title: 'stayAtHomeCollection',
    name: 'stayAtHomeCollection',
    path: 'stayAtHomeCollection',
    component: () => import('./stayAtHome/stayAtHomeCollection.vue')
  },
  // 留守儿童变更列表
  {
    title: 'stayAtHomeChangeInfo',
    name: 'stayAtHomeChangeInfo',
    path: 'stayAtHomeChangeInfo',
    component: () => import('./stayAtHome/stayAtHomeChangeInfo.vue')
  }, // 留守妇女新增
  {
    title: 'womenStayingAtHome',
    name: 'womenStayingAtHome',
    path: 'womenStayingAtHome',
    component: () => import('./womenStayingAtHome/womenStayingAtHome.vue')
  }, // 留守妇女列表
  {
    title: 'womenStayingAtHomeList',
    name: 'womenStayingAtHomeList',
    path: 'womenStayingAtHomeList',
    component: () => import('./womenStayingAtHome/womenStayingAtHomeList.vue')
  }, // 留守妇女变更
  {
    title: 'womenStayingAtHomeChangeInfo',
    name: 'womenStayingAtHomeChangeInfo',
    path: 'womenStayingAtHomeChangeInfo',
    component: () => import('./womenStayingAtHome/womenStayingAtHomeChangeInfo.vue')
  }, // 留守妇女-统计信息
  {
    title: 'womenList',
    name: 'womenList',
    path: 'womenList',
    component: () => import('./womenStayingAtHome/statistics/womenList.vue')
  }, // 留守妇女-综合统计信息
  {
    title: 'womenOverallStatistics',
    name: 'womenOverallStatistics',
    path: 'womenOverallStatistics',
    component: () => import('./womenStayingAtHome/statistics/womenOverallStatistics.vue')
  }, // 留守困境回访-列表
  {
    title: 'troubleStayingCallbackList',
    name: 'troubleStayingCallbackList',
    path: 'troubleStayingCallbackList',
    component: () => import('./troubleStayingCallback/troubleStayingCallbackList.vue')
  }, // 留守困境回访-详情
  {
    title: 'troubleStayingCallbackInfo',
    name: 'troubleStayingCallbackInfo',
    path: 'troubleStayingCallbackInfo',
    component: () => import('./troubleStayingCallback/troubleStayingCallbackInfo.vue')
  }, // 关联主任-详情
  {
    title: 'toAssociation',
    name: 'toAssociation',
    path: 'toAssociation',
    component: () => import('./childrenDirectorInfoCollection/toAssociation.vue')
  },
  // // 监护不当儿童-信息采集olde
  // {
  //   title: 'improperCustodyChildren',
  //   name: 'improperCustodyChildren',
  //   path: 'improperCustodyChildren',
  //   component: () => import('./improperCustodyChildren/improperCustodyChildren.vue')
  // },
  // 监护不当儿童列表
  {
    title: 'improperCareList',
    name: 'improperCareList',
    path: 'improperCareList',
    component: () => import('./improperCare/improperCareList.vue')
  },
  // 监护不当儿童采集
  {
    title: 'improperCareCollection',
    name: 'improperCareCollection',
    path: 'improperCareCollection',
    component: () => import('./improperCare/improperCareCollection.vue')
  },
  // 残疾儿童列表
  {
    title: 'disabledChildrenList',
    name: 'disabledChildrenList',
    path: 'disabledChildrenList',
    component: () => import('./disabledChildren/disabledChildrenList.vue')
  },
  // 残疾儿童表单
  {
    title: 'disabledChildrenCollection',
    name: 'disabledChildrenCollection',
    path: 'disabledChildrenCollection',
    component: () => import('./disabledChildren/disabledChildrenCollection.vue')
  },
  // 贫困家庭列表
  {
    title: 'poorFamiliesChildrenList',
    name: 'poorFamiliesChildrenList',
    path: 'poorFamiliesChildrenList',
    component: () => import('./poorFamiliesChildren/poorFamiliesChildrenList.vue')
  },
  // 贫困家庭表单
  {
    title: 'poorFamiliesChildrenCollection',
    name: 'poorFamiliesChildrenCollection',
    path: 'poorFamiliesChildrenCollection',
    component: () => import('./poorFamiliesChildren/poorFamiliesChildrenCollection.vue')
  },
  // 可送养儿童列表
  {
    title: 'childrenCanBeSentList',
    name: 'childrenCanBeSentList',
    path: 'childrenCanBeSentList',
    component: () => import('./childrenCanBeSent/childrenCanBeSentList.vue')
  },
  {
    title: 'childrenCanSuretList',
    name: 'childrenCanSuretList',
    path: 'childrenCanSuretList',
    component: () => import('./childrenCanBeSent/childrenCanSuretList.vue')
  },
  // 可送养儿童表单
  {
    title: 'canBeSentForm',
    name: 'canBeSentForm',
    path: 'canBeSentForm',
    component: () => import('./childrenCanBeSent/canBeSentForm.vue')
  },
  // 留守妇女信息确认
  {
    title: 'affirmWomenStayAtHome',
    name: 'affirmWomenStayAtHome',
    path: 'affirmWomenStayAtHome',
    component: () => import('./womenStayingAtHome/affirmWomenStayAtHome.vue')
  },
  // 留守儿童信息确认
  {
    title: 'affirmChildStayAtHome',
    name: 'affirmChildStayAtHome',
    path: 'affirmChildStayAtHome',
    component: () => import('./stayAtHome/affirmChildStayAtHome.vue')
  },
  // 督导员信息确认
  {
    title: 'affirmSupervisor',
    name: 'affirmSupervisor',
    path: 'affirmSupervisor',
    component: () =>
      import('./childrenDirectorInfoCollection/affirmSupervisor.vue')
  },
  // 儿童主任信息确认
  {
    title: 'affirmDirectorInfo',
    name: 'affirmDirectorInfo',
    path: 'affirmDirectorInfo',
    component: () =>
      import('./childrenDirectorInfoCollection/affirmDirectorInfo.vue')
  },
  // 业务信息管理
  {
    title: 'businessTrainingList',
    name: 'businessTrainingList',
    path: 'businessTrainingList',
    component: () =>
      import('./businessTraining/businessTrainingList.vue')
  },
  // 业务信息管理-新增
  {
    title: 'businessTrainingAdd',
    name: 'businessTrainingAdd',
    path: 'businessTrainingAdd',
    component: () =>
      import('./businessTraining/businessTrainingAdd.vue')
  },
  // 跨省通办详情
  {
    title: 'acrossProvinceDetail',
    name: 'acrossProvinceDetail',
    path: 'acrossProvinceDetail',
    component: () =>
      import('./childInfoCollection/acrossProvinceDetail.vue')
  }

]
