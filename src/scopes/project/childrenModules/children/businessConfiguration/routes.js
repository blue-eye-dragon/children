// 导出该模块路由
export default [
  // 续发申请配置
  {
    title: 'renewalConfiguration',
    name: 'renewalConfiguration',
    path: 'renewalConfiguration',
    component: () => import('./renewalConfiguration.vue')
  },
  // 业务配置
  {
    title: 'businessConfiguration',
    name: 'businessConfiguration',
    path: 'businessConfiguration',
    component: () => import('./businessConfiguration.vue')
  },
  // 业务配置详情
  {
    title: 'roleConfig',
    name: 'roleConfig',
    path: 'roleConfig',
    component: () => import('./roleConfig.vue')
  },
  // 业务配置信息管理
  {
    title: 'businessConfigurationTow',
    name: 'businessConfigurationTow',
    path: 'businessConfigurationTow',
    component: () => import('./businessConfigurationTow.vue')
  }
]
