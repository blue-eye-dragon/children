/*
 * @Date: 2021-06-19 13:50:11
 * @information: 运维管理route
 */
// 工作台督办跳转页面
export default [
  // sql客户端
  {
    title: 'sql客户端',
    name: 'sqlClient',
    path: 'sqlClient',
    component: () =>
      import('./sqlClient.vue')
  },
  // 儿童维护客户端
  {
    title: '儿童维护客户端',
    name: 'childClient',
    path: 'childClient',
    component: () =>
      import('./childClient.vue')
  },
  // 事实儿童信息维护客户端
  {
    title: '事实儿童信息维护客户端',
    name: 'factChildClient',
    path: 'factChildClient',
    component: () =>
      import('./factChildClient.vue')
  },
  // 移动端错误日志列表
  {
    title: 'mobileErrorRecordList',
    name: 'mobileErrorRecordList',
    path: 'mobileErrorRecordList',
    component: () => import('./mobileErrorRecord/mobileErrorRecordList.vue')
  },
  // 移动端错误日志详情
  {
    title: 'mobileErrorRecordDetail',
    name: 'mobileErrorRecordDetail',
    path: 'mobileErrorRecordDetail',
    component: () => import('./mobileErrorRecord/mobileErrorRecordDetail.vue')
  },
  // 收养登记信息维护
  {
    title: 'adoptInfoSafeguard',
    name: 'adoptInfoSafeguard',
    path: 'adoptInfoSafeguard',
    component: () => import('./adoptInfoSafeguard.vue')
  },


]
