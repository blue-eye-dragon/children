/*
 * @Date: 2021-06-19 13:50:12
 * @information: 设备管理route
 */
export default [
  // 设备管理
  {
    title: 'deviceManagementList',
    name: 'deviceManagementList',
    path: 'deviceManagementList',
    component: () => import('./deviceManagement/deviceManagementList.vue')
  },
  // 设备管理-查看
  {
    title: 'deviceManagementLook',
    name: 'deviceManagementLook',
    path: 'deviceManagementLook',
    component: () => import('./deviceManagement/deviceManagementLook.vue')
  },
  // 设备应用管理
  {
    title: 'applicationManagementList',
    name: 'applicationManagementList',
    path: 'applicationManagementList',
    component: () => import('./applicationManagement/applicationManagementList.vue')
  },
  // SIM卡管理
  {
    title: 'SIMmanagement',
    name: 'SIMmanagement',
    path: 'SIMmanagement',
    component: () => import('./applicationManagement/SIMmanagement.vue')
  },
  // 应用历史记录查看
  {
    title: 'applicationManagementDetails',
    name: 'applicationManagementDetails',
    path: 'applicationManagementDetails',
    component: () => import('./applicationManagement/applicationManagementDetails.vue')
  },
  // 设备出库记录列表
  {
    title: 'deviceOutRecordList',
    name: 'deviceOutRecordList',
    path: 'deviceOutRecordList',
    component: () => import('./deviceOutRecord/deviceOutRecordList.vue')
  }



]
