/*
 * @Date: 2021-06-15 17:23:41
 * @information: 跨省通办证明材料相关路由
 */
export default [
  // 跨省通办材料新增
  {
    title: 'acrossProvinceFileExplainAdd',
    name: 'acrossProvinceFileExplainAdd',
    path: 'acrossProvinceFileExplainAdd',
    component: () => import('./acrossProvinceFileExplainAdd.vue')
  },
  // 跨省通办材料查询
  {
    title: 'acrossProvinceFileExplainQuery',
    name: 'acrossProvinceFileExplainQuery',
    path: 'acrossProvinceFileExplainQuery',
    component: () => import('./acrossProvinceFileExplainQuery.vue')
  },

]


