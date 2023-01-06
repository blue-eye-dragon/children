// 工作台督办跳转页面
export default [
  // 超龄督办
  {
    title: 'allOveAgeSupervision',
    name: 'allOveAgeSupervision',
    path: 'allOveAgeSupervision',
    component: () =>
      import('./allOveAgeSupervision.vue')
  },
  // 超龄事实督办
  {
    title: 'infoOverAgeSupervisor',
    name: 'infoOverAgeSupervisor',
    path: 'infoOverAgeSupervisor',
    component: () =>
      import('./infoOverAgeSupervisor.vue')
  },
  // 超龄孤儿督办
  {
    title: 'overAgeSupervisor',
    name: 'overAgeSupervisor',
    path: 'overAgeSupervisor',
    component: () =>
      import('./overAgeSupervisor.vue')
  },
  // 审批事项督办
  {
    title: 'approvalSupervisor',
    name: 'approvalSupervisor',
    path: 'approvalSupervisor',
    component: () =>
      import('./approvalSupervisor.vue')
  },
  // 跨省通办提醒
  {
    title: 'acrossProvinceSupervisor',
    name: 'acrossProvinceSupervisor',
    path: 'acrossProvinceSupervisor',
    component: () =>
      import('./acrossProvinceSupervisor.vue')
  }

]
