// 导出该模块路由
export default [
  // 福利机构信息查看
  {
    title: 'seeAll',
    name: 'seeAll',
    path: 'seeAll',
    component: () => import('./welfareOrganisationInfo/seeAll.vue')
  },
  // 民间机构列表
  {
    title: 'folkOrgInfoList',
    name: 'folkOrgInfoList',
    path: 'folkOrgInfoList',
    component: () => import('./folkOrganisationInfo/folkOrgInfoList.vue')
  },
  // 民间机构列表
  {
    title: 'folkOrgWorker',
    name: 'folkOrgWorker',
    path: 'folkOrgWorker',
    component: () => import('./folkOrganisationInfo/folkOrgWorker.vue')
  },
  // 民间机构信息
  {
    title: 'folkOrgInfo',
    name: 'folkOrgInfo',
    path: 'folkOrgInfo',
    component: () => import('./folkOrganisationInfo/folkOrgInfo.vue')
  },
  // 福利机构信息操作界面
  {
    title: 'operationInfo',
    name: 'operationInfo',
    path: 'operationInfo',
    component: () => import('./welfareOrganisationInfo/operationInfo.vue')
  },
  // 福利机构信息
  {
    title: 'welfareOrganisationInfo',
    name: 'welfareOrganisationInfo',
    path: 'welfareOrganisationInfo',
    component: () => import('./welfareOrganisationInfo/welfareOrganisationInfo.vue')
  },
  // 保护机构信息操作界面
  {
    title: 'protectOperationInfo',
    name: 'protectOperationInfo',
    path: 'protectOperationInfo',
    component: () => import('./protectOrganisationInfo/protectOperationInfo.vue')
  },
  // 保护机构信息
  {
    title: 'protectOrganisationInfo',
    name: 'protectOrganisationInfo',
    path: 'protectOrganisationInfo',
    component: () => import('./protectOrganisationInfo/protectOrganisationInfo.vue')
  },
  // 机构设置
  {
    title: 'orgSetting',
    name: 'orgSetting',
    path: 'orgSetting',
    component: () => import('./protectOrganisationInfo/orgSetting.vue')
  },
  // 科室管理
  {
    title: 'departmentMag',
    name: 'departmentMag',
    path: 'departmentMag',
    component: () => import('./departmentMag/departmentMag.vue')
  },
  // 工作人员管理
  {
    title: 'worker',
    name: 'worker',
    path: 'worker',
    component: () => import('./worker/worker.vue')
  }

]
