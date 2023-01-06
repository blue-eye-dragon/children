// 导出该模块路由
export default [
  // 档案管理
  {
    title: 'fileQuery',
    name: 'fileQuery',
    path: 'fileQuery',
    component: () => import('./fileQuery.vue')
  },
  // 档案管理-查看
  {
    title: 'fileQueryLook',
    name: 'fileQueryLook',
    path: 'fileQueryLook',
    component: () => import('./fileQueryLook.vue'),
    children: [
      // 身份档案
      {
        title: 'fileQueryLook_orphansHandicapped',
        name: 'fileQueryLook_orphansHandicapped',
        path: 'fileQueryLook_orphansHandicapped',
        component: () =>
                    import('../collection/childInformation/orphansHandicapped.vue')
      },
      // 福利档案
      {
        title: 'welfareArchives',
        name: 'welfareArchives',
        path: 'welfareArchives',
        component: () => import('./welfareArchives.vue'),
        children: [
          // 增员查看
          {
            title: 'welfareArchives_orphansHandicapped',
            name: 'welfareArchives_orphansHandicapped',
            path: 'welfareArchives_orphansHandicapped',
            component: () =>
                            import('../collection/childInformation/orphansHandicapped.vue')
          },
          // 受教育查看
          {
            title: 'educationInformation_look',
            name: 'educationInformation_look',
            path: 'educationInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/educationInformation_look.vue')
          },
          // 体检查看
          {
            title: 'physicalExaminationInformation_look',
            name: 'physicalExaminationInformation_look',
            path: 'physicalExaminationInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/physicalExaminationInformation_look.vue')
          },
          // 医疗保险查看
          {
            title: 'medicalInsuranceInformation_look',
            name: 'medicalInsuranceInformation_look',
            path: 'medicalInsuranceInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/medicalInsuranceInformation_look.vue')
          },
          // 疫苗接种查看
          {
            title: 'vaccinationInformation_look',
            name: 'vaccinationInformation_look',
            path: 'vaccinationInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/vaccinationInformation_look.vue')
          },
          // 医疗查看
          {
            title: 'medicalInformation_look',
            name: 'medicalInformation_look',
            path: 'medicalInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/medicalInformation_look.vue')
          },
          // 跟踪回访
          {
            title: 'followUpInformation_look',
            name: 'followUpInformation_look',
            path: 'followUpInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/followUpInformation_look.vue')
          },
          // 助养查看
          {
            title: 'welfareArchives_sponsorInfo',
            name: 'welfareArchives_sponsorInfo',
            path: 'welfareArchives_sponsorInfo',
            component: () =>
                            import('../welfareAssistance/helpManage/helpInformation/sponsorInfo.vue')
          },
          // 寄养查看
          {
            title: 'welfareArchives_recorddetails',
            name: 'welfareArchives_recorddetails',
            path: 'welfareArchives_recorddetails',
            component: () =>
                            import('../welfareAssistance/foster/fosterRecord/recorddetails.vue')
          },
          // 寄养情况跟踪评估记录查看
          {
            title: 'welfareArchives_fostercareevaluation',
            name: 'welfareArchives_fostercareevaluation',
            path: 'welfareArchives_fostercareevaluation',
            component: () =>
                            import('../welfareAssistance/foster/fosterRecord/fostercareevaluation.vue')
          },
          // 寄养经费记录查看
          {
            title: 'fosterCareExpenditureRecord_look',
            name: 'fosterCareExpenditureRecord_look',
            path: 'fosterCareExpenditureRecord_look',
            component: () =>
                            import('./components/welfareArchivesLook/fosterCareExpenditureRecord_look.vue')
          },
          // 医疗救助查看
          {
            title: 'welfareArchives_medicalAidFilesDetails',
            name: 'welfareArchives_medicalAidFilesDetails',
            path: 'welfareArchives_medicalAidFilesDetails',
            component: () =>
                            import('../welfareAssistance/medicalAssistance/medicalAidFiles/medicalAidFilesDetails.vue')
          },
          // 康复治疗查看
          {
            title: 'welfareArchives_see',
            name: 'welfareArchives_see',
            path: 'welfareArchives_see',
            component: () =>
                            import('../welfareAssistance/rehabilitationtherapy/childRehabilitationManagement/sendRecord/see.vue')
          },
          // 减员管理查看
          {
            title: 'downsizingInformation_look',
            name: 'downsizingInformation_look',
            path: 'downsizingInformation_look',
            component: () =>
                            import('./components/welfareArchivesLook/downsizingInformation_look.vue')
          }
        ]
      },
      // 保护档案
      {
        title: 'protectionFiles',
        name: 'protectionFiles',
        path: 'protectionFiles',
        component: () => import('./protectionFiles.vue'),
        children: [
          // 保护档案-查看
          {
            title: 'protectionFilesLook',
            name: 'protectionFilesLook',
            path: 'protectionFilesLook',
            component: () => import('./protectionFilesLook.vue')
          }
        ]
      },

      // 收养档案
      {
        title: 'adoptionArchives',
        name: 'adoptionArchives',
        path: 'adoptionArchives',
        component: () => import('./adoptionArchives.vue'),
        children: [
          // 收养信息查看
          {
            title: 'adoptionArchives_registration',
            name: 'adoptionArchives_registration',
            path: 'adoptionArchives_registration',
            component: () => import('../adoption/registration.vue')
          },
          // 解除收养信息查看
          {
            title: 'adoptionArchives_relieve',
            name: 'adoptionArchives_relieve',
            path: 'adoptionArchives_relieve',
            component: () => import('../adoption/relieve.vue')
          },
          // 撤销收养信息查看
          {
            title: 'adoptionArchives_revokeForm',
            name: 'adoptionArchives_revokeForm',
            path: 'adoptionArchives_revokeForm',
            component: () => import('../adoption/revokeForm.vue')
          },
          // 补录信息查看
          {
            title: 'adoptionArchives_registration1',
            name: 'adoptionArchives_registration1',
            path: 'adoptionArchives_registration1',
            component: () => import('../adoption/registration.vue')
          },
          // 补领信息查看
          {
            title: 'adoptionArchives_replacementFrom',
            name: 'adoptionArchives_replacementFrom',
            path: 'adoptionArchives_replacementFrom',
            component: () => import('../adoption/replacementFrom.vue')
          }
        ]
      },
      // 信息变更记录
      {
        title: 'informationChangeRecordInfo',
        name: 'informationChangeRecordInfo',
        path: 'informationChangeRecordInfo',
        component: () => import('./informationChangeRecordInfo.vue'),
        children: [
          // 收养信息查看
          {
            title: 'informationChangeRecordInfo_changeApprovalFrom',
            name: 'informationChangeRecordInfo_changeApprovalFrom',
            path: 'informationChangeRecordInfo_changeApprovalFrom',
            component: () => import('../examine/changes/changeApprovalFrom.vue')
          }
        ]
      }
    ]
  }
]
