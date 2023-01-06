// 导出该模块路由
export default [
  // 评估业务办理 表格
  {
    title: 'evaluationmanagementList',
    name: 'evaluationmanagementList',
    path: 'evaluationmanagementList',
    component: () => import('./evaluationmanagement/evaluationmanagementList.vue')
  },
  // 评估业务办理 表单
  {
    title: 'evaluationmanagementFrom',
    name: 'evaluationmanagementFrom',
    path: 'evaluationmanagementFrom',
    component: () => import('./evaluationmanagement/evaluationmanagementFrom.vue')
  },
  // 评估事项列表
  {
    title: 'evaluationList',
    name: 'evaluationList',
    path: 'evaluationList',
    component: () => import('./evaluationList.vue')
  },
  // 评估融合操作
  {
    title: 'assessOrFuse',
    name: 'assessOrFuse',
    path: 'assessOrFuse',
    component: () => import('./evaluationmanagement/assessOrFuse.vue')
  }
]
