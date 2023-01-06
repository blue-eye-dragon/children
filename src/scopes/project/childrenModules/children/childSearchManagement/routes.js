// 导出该模块路由
export default [
  // 儿童寻亲信息发布
  {
    title: 'searchRelatives',
    name: 'searchRelatives',
    path: 'searchRelatives',
    component: () => import('./searchRelatives/searchRelatives.vue')
  },
  // 儿童寻亲信息--发布
  {
    title: 'releaseInfo',
    name: 'releaseInfo',
    path: 'releaseInfo',
    component: () => import('./searchRelatives/releaseInfo.vue')
  },
  // 儿童寻亲信息--撤销
  {
    title: 'backout',
    name: 'backout',
    path: 'backout',
    component: () => import('./searchRelatives/backout.vue')
  },
  // 待收养儿童信息发布
  {
    title: 'adoptRelease',
    name: 'adoptRelease',
    path: 'adoptRelease',
    component: () => import('./adoptRelease/adoptRelease.vue')
  },
  // 待收养儿童信息发布-新增
  {
    title: 'newOne',
    name: 'newOne',
    path: 'newOne',
    component: () => import('./adoptRelease/newOne.vue')
  },
  // 待收养儿童信息发布-收养业务
  {
    title: 'adoptReleaseAdoptionbusiness',
    name: 'adoptReleaseAdoptionbusiness',
    path: 'adoptReleaseAdoptionbusiness',
    component: () => import('./adoptReleaseAdoptionbusiness/adoptReleaseAdoptionbusiness.vue')
  },
  // 待收养儿童信息发布-收养业务-新增
  {
    title: 'adoptAdd',
    name: 'adoptAdd',
    path: 'adoptAdd',
    component: () => import('./adoptReleaseAdoptionbusiness/adoptAdd.vue')
  },
  // 待收养儿童信息发布-收养业务-撤销
  {
    title: 'adoptRevoke',
    name: 'adoptRevoke',
    path: 'adoptRevoke',
    component: () => import('./adoptReleaseAdoptionbusiness/adoptRevoke.vue')
  },
  // 待收养儿童信息发布-收养业务-撤销查看
  {
    title: 'adoptRevokeLook',
    name: 'adoptRevokeLook',
    path: 'adoptRevokeLook',
    component: () => import('./adoptReleaseAdoptionbusiness/adoptRevokeLook.vue')
  }
]
