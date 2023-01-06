// 导出该模块路由
export default [
  // 户口办理
  {
    title: 'householdRegistration',
    name: 'householdRegistration',
    path: 'householdRegistration',
    component: () => import('./householdRegistration/householdRegistration.vue')
  },
  // 受教育办理
  {
    title: 'education',
    name: 'education',
    path: 'education',
    component: () => import('./education/education.vue')
  },
  // 受教育详情
  {
    title: 'educationDetail',
    name: 'educationDetail',
    path: 'educationDetail/:obj/:type',
    component: () => import('./education/educationDetail.vue')
  },
  // 医疗保险
  {
    title: 'medicalInsurance',
    name: 'medicalInsurance',
    path: 'medicalInsurance',
    component: () => import('./medicalInsurance/medicalInsurance.vue')
  },
  // 医疗保险 录入
  {
    title: 'input',
    name: 'input',
    path: 'input/:obj',
    component: () => import('./medicalInsurance/input.vue')
  },
  // 体检保险
  {
    title: 'physicalExamination',
    name: 'physicalExamination',
    path: 'physicalExamination',
    component: () => import('./physicalExamination/physicalExamination.vue')
  },
  // 体检录入
  {
    title: 'physicalExaminationEntry',
    name: 'physicalExaminationEntry',
    path: 'physicalExaminationEntry/:obj',
    component: () => import('./physicalExamination/physicalExaminationEntry.vue')
  },
  // 疫苗接种
  {
    title: 'vaccinationStatus',
    name: 'vaccinationStatus',
    path: 'vaccinationStatus',
    component: () => import('./vaccinationStatus/vaccinationStatus.vue')
  },
  // 疫苗接种录入
  {
    title: 'vaccineInput',
    name: 'vaccineInput',
    path: 'vaccineInput/:obj',
    component: () => import('./vaccinationStatus/vaccineInput.vue')
  },
  // 跟踪回访
  {
    title: 'followUp',
    name: 'followUp',
    path: 'followUp',
    component: () => import('./followUp/followUp.vue')
  },
  // 跟踪回访详情
  {
    title: 'followUpDetails',
    name: 'followUpDetails',
    path: 'followUpDetails/:obj',
    component: () => import('./followUp/followUpDetails.vue')
  },
  // 测试打印
  {
    title: 'prints',
    name: 'prints',
    path: 'prints',
    component: () => import('./education/print.vue')
  }
]
