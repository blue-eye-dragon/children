import moment from 'moment'
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () { },
  activated () { },
  methods: {
    // 提交时的数据处理 buttonType 按钮类型
    // adoptedFrom 基本信息、cptAdoptorFrom 生活费信息、searchRelativesFrom 寻亲信息、fiveRaiseFrom相关证明信息、adoptedFamFrom 家庭基本信息
    // familyMemberInfoFrom 家庭成员信息、
    dataProcess (
      buttonType,
      adoptedFrom,
      physicalPxaminationForm,
      cptAdoptorFrom,
      searchRelativesFrom,
      adoptedFamFrom,
      familyMemberInfoFrom,
      childAnotherPlaceApplyPersonVo
    ) {
      const _self = this
      const submitDatas = {
        buttonType: buttonType,
        // 儿童基本信息-入院
        childBaseEnterWelfareInstitutionVo: {
          id: adoptedFrom.ids, // 入院id
          ifIsolatedCare: adoptedFrom.ifIsolatedCare, // 体检前是否隔离照料
          otherReliefOther: adoptedFrom.otherRescueOther, // 其他救助的其他
          otherRescue: adoptedFrom.otherRescue, // 其他救助
          physicalExaminationDay: adoptedFrom.physicalExaminationDay, // 接收后多久体检
          pickingDate: adoptedFrom.pickingDate
            ? moment(adoptedFrom.pickingDate).format('YYYY-MM-DD')
            : null, // 捡拾日期
          pickingUpLand: adoptedFrom.pickingUpLand, // 捡拾地
          principal: adoptedFrom.principal, // 委托方
          principalDate: adoptedFrom.principalDate
            ? moment(adoptedFrom.principalDate).format('YYYY-MM-DD')
            : null, // 委托日期
          rearingType: adoptedFrom.rearingType, // 养育类型
          childType: adoptedFrom.childType, // 儿童类别
          isBulu: adoptedFrom.isBulu, // 是否是超龄补录（是1，否0）
          buluReason: adoptedFrom.buluReason, // 补录原因
          registerDate: adoptedFrom.registerDate
            ? moment(adoptedFrom.registerDate).format('YYYY-MM-DD')
            : null, // 登记（增员）日期
          welfareNumber: adoptedFrom.welfareNumber, // 福利证号
          upLoadPathIds: adoptedFrom.upLoadPathIds, // 文件上传id数据
          health: adoptedFrom.health, // 健康状况
          healthOther: adoptedFrom.healthOther // 健康状况其他
        },
        // 儿童入院体检信息
        childEnterPhysicalVo: {
          id: physicalPxaminationForm.id, // 入院体检id
          physicalDate: physicalPxaminationForm.physicalDate ? moment(physicalPxaminationForm.physicalDate).format('YYYY-MM-DD') : null, // 体检日期
          physicalOrg: physicalPxaminationForm.physicalOrg, // 体检机构
          physicalPro: physicalPxaminationForm.physicalDatas instanceof Array
            ? physicalPxaminationForm.physicalDatas[0]
            : null, // 体检机构地址-省
          physicalCity: physicalPxaminationForm.physicalDatas instanceof Array
            ? physicalPxaminationForm.physicalDatas[1]
            : null, // 体检机构地址-市
          physicalCounty: physicalPxaminationForm.physicalDatas instanceof Array
            ? physicalPxaminationForm.physicalDatas[2]
            : null, // 体检机构地址-县
          physicalDetail: physicalPxaminationForm.physicalDetail, // 体检机构地址-详细地址
          childHeight: physicalPxaminationForm.childHeight, // 身高
          childWeight: physicalPxaminationForm.childWeight, // 体重
          physicalSummed: physicalPxaminationForm.physicalSummed // 体检总结
        },
        // 儿童基本信息
        childBaseInformationVo: {
          id: adoptedFrom.id, // 基本信息id
          adisCondition: adoptedFrom.adisCondition, // 患艾滋病情况
          infectionTime: adoptedFrom.infectionTime ? moment(adoptedFrom.infectionTime).format(
            'YYYY-MM-DD'
          ) : null, // 确认艾滋病感染时间
          transmissionWay: adoptedFrom.transmissionWay, // 最有可能感染的途径
          transmissionWayOther: adoptedFrom.transmissionWayOther, // 最可能的传播途径其他原因
          adisConditionOther: adoptedFrom.adisConditionOther, // 患艾滋病情况其他
          birthday: adoptedFrom.birthday ? moment(adoptedFrom.birthday).format('YYYY-MM-DD') : null, // 出生日期
          censusRegister: adoptedFrom.censusRegister, // 户籍性质
          censusRegisterCity: adoptedFrom.censusRegisterDatas instanceof Array
            ? adoptedFrom.censusRegisterDatas[1]
            : null, // 户籍所在地-市
          censusRegisterCounty: adoptedFrom.censusRegisterDatas instanceof Array
            ? adoptedFrom.censusRegisterDatas[2]
            : null, // 户籍所在地-县
          censusRegisterTown: adoptedFrom.censusRegisterDatas instanceof Array
            ? adoptedFrom.censusRegisterDatas[3]
            : null, // 户籍所在地-县
          censusRegisterDetail: adoptedFrom.censusRegisterDetail, // 户籍所在地-详情
          censusRegisterPro: adoptedFrom.censusRegisterDatas instanceof Array
            ? adoptedFrom.censusRegisterDatas[0]
            : null, // 户籍所在地-省
          childNumber: adoptedFrom.childNumber, // 儿童编号
          childSituation: adoptedFrom.childSituation, // 儿童情况(下拉框多选)
          childSituationOther: adoptedFrom.childSituationOther, // 儿童情况(其他)
          age: adoptedFrom.age, // 年龄
          currentAddressCity: adoptedFrom.currentAddressDatas instanceof Array
            ? adoptedFrom.currentAddressDatas[1]
            : null, // 现住址-市
          currentAddressCounty: adoptedFrom.currentAddressDatas instanceof Array
            ? adoptedFrom.currentAddressDatas[2]
            : null, // 现住址-县
          currentAddressTown: adoptedFrom.currentAddressDatas instanceof Array
            ? adoptedFrom.currentAddressDatas[3]
            : null, // 现住址-县
          currentAddressDetail: adoptedFrom.currentAddressDetail, // 现住址-详情
          currentAddressPro: adoptedFrom.currentAddressDatas instanceof Array
            ? adoptedFrom.currentAddressDatas[0]
            : null, // 现住址-省
          disabilityLevel: adoptedFrom.disabilityLevel, // 残疾级别
          disabilityType: adoptedFrom.disabilityType, // 残疾类型(下拉框多选)
          disabilityTypeOther: adoptedFrom.disabilityTypeOther, // 残疾类型(其他)
          householdRegistryClassify: adoptedFrom.householdRegistryClassify, // 户口分类
          idCard: adoptedFrom.idCard, // 身份证号
          ifSeriously: adoptedFrom.ifSeriously, // 是否重病
          illnessType: adoptedFrom.illnessType, // 患病类型(下拉框多选)
          illnessTypeOther: adoptedFrom.illnessTypeOther, // 患病类型(其他)
          name: adoptedFrom.name, // 儿童姓名
          nation: adoptedFrom.nation, // 民族
          physicalDisabilityNo: adoptedFrom.physicalDisabilityNo, // 残疾证号
          remark: adoptedFrom.remark, // 备注
          sex: adoptedFrom.sex, // 性别
          specialEducationType: adoptedFrom.specialEducationType, // 特教类型(下拉框多选)
          specialEducationTypeOther: adoptedFrom.specialEducationTypeOther, // 特教类型(其他)
          workStudy: adoptedFrom.workStudy, // 工学情况
          workStudyOther: adoptedFrom.workStudyOther // 工学情况其他
        },
        // 儿童基本信息-入院-寻亲信息
        childBaseRelativesVo: {
          id: searchRelativesFrom ? searchRelativesFrom.id : null, // 寻亲信息id
          admissionHeight: searchRelativesFrom
            ? searchRelativesFrom.admissionHeight
            : null, // 入院身高
          disabilityDescription: searchRelativesFrom
            ? searchRelativesFrom.disabilityDescription
            : null, // 病残描述
          dressCharacteristics: searchRelativesFrom
            ? searchRelativesFrom.dressCharacteristics
            : null, // 发现时衣着特征
          email: searchRelativesFrom ? searchRelativesFrom.email : null, // 邮箱
          findAddress: searchRelativesFrom
            ? searchRelativesFrom.findAddress
            : null, // 发现地点
          findTime: searchRelativesFrom
            ? searchRelativesFrom.findTime
              ? moment(searchRelativesFrom.findTime).format('YYYY-MM-DD')
              : null
            : null, // 发现时间
          hair: searchRelativesFrom ? searchRelativesFrom.hair : null, // 头发
          hairColor: searchRelativesFrom ? searchRelativesFrom.hairColor : null, // 发色
          otherPhone: searchRelativesFrom
            ? searchRelativesFrom.otherPhone
            : null, // 其他联系方式
          posture: searchRelativesFrom ? searchRelativesFrom.posture : null, // 体态
          telPhone1: searchRelativesFrom ? searchRelativesFrom.telPhone1 : null, // 联系电话1
          telPhone2: searchRelativesFrom ? searchRelativesFrom.telPhone2 : null // 联系电话2
        },
        // 家庭信息
        familyInfoVo: {
          id: adoptedFamFrom.id, // 家庭信息id
          familyIncome: adoptedFamFrom.familyIncome, // 家庭收入（元/月)
          familyProperty: adoptedFamFrom.familyProperty, // 家庭资产（元/月）
          livingSpace: adoptedFamFrom.livingSpace, // 人均居住面积
          remark: adoptedFamFrom.remark // 备注
        },
        // 家庭成员信息
        familyMemberInfoList: familyMemberInfoFrom,
        // 生活费信息
        livingCostVo: {
          id: cptAdoptorFrom.id, // 生活费id
          bankNumber: cptAdoptorFrom.bankNumber, // 儿童本人银行账号
          openBank: cptAdoptorFrom.openBank, // 儿童本人开户行
          payment: cptAdoptorFrom.payment, // 领取方式
          receiver: cptAdoptorFrom.receiver, // 领取人姓名
          receiverRelation: cptAdoptorFrom.receiverRelation, // 领取人与儿童关系
          receiverRelationOther: cptAdoptorFrom.receiverRelationOther, // 领取人与儿童关系-其他
          startTime: cptAdoptorFrom.startTime
            ? moment(cptAdoptorFrom.startTime).format('YYYY-MM-DD')
            : null // 起领年月
        },
        // 申请人信息
        childAnotherPlaceApplyPersonVo
      }
      return submitDatas
    }
  }
}
