/*
 * @Date: 2021-06-24 15:31:48
 * @information: 通讯录route
 */
// 导出该模块路由
export default [
  // 通讯录
  {
    title: 'contacts',
    name: 'contacts',
    path: 'contacts',
    component: () => import('./contacts.vue')
  },
  // 通知公告
  {
    title: 'contactsMessage',
    name: 'contactsMessage',
    path: 'contactsMessage',
    component: () => import('./contactsMessage.vue')
  }, // 消息列表
  {
    title: 'contactsMessageList',
    name: 'contactsMessageList',
    path: 'contactsMessageList',
    component: () => import('./contactsMessageList.vue')
  }, // 消息列表
  {
    title: 'orgSelect',
    name: 'orgSelect',
    path: 'orgSelect',
    component: () => import('./orgSelect.vue')
  }, // 全部消息列表
  {
    title: 'LookAllMessage',
    name: 'LookAllMessage',
    path: 'LookAllMessage',
    component: () => import('./LookAllMessage.vue')
  },
  // 系统通知
  {
    title: 'systemNotification',
    name: 'systemNotification',
    path: 'systemNotification',
    component: () => import('./systemNotification.vue')
  },
  // 系统通知详情
  {
    title: 'systemNotificationDetails',
    name: 'systemNotificationDetails',
    path: 'systemNotificationDetails',
    component: () => import('./systemNotificationDetails.vue')
  },
  // 系统公告
  {
    title: 'systemNoticeList',
    name: 'systemNoticeList',
    path: 'systemNoticeList',
    component: () => import('./systemNoticeList.vue')
  }
]
