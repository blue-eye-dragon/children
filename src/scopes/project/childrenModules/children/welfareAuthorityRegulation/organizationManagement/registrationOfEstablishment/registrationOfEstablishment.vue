<template>
  <div class="conts">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="机构设置规划"
                     key="1"
                     :forceRender='forceRenderBool'>
          <ta-form layout="horizontal"
                   :autoFormCreate="(setupPlanForm)=>{this.setupPlanForm = setupPlanForm}">
            <InstitutionalSetupPlan :disabled="disabled"
                                    :ishide="ishide"
                                    :orgType="orgType"
                                    :orgNature="orgNature"
                                    :censusAddressmodel="censusAddressmodel"
                                    @censusAddress="censusAddress"
                                    :uploadFileList.sync="uploadFileList"
                                    :taorgId.sync="taorgId"
                                    :orgName.sync="orgName"
                                    :orgTypeVal.sync="orgTypeVal"
                                    :orgNatureVal.sync="orgNatureVal"></InstitutionalSetupPlan>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="机构筹办"
                     key="2"
                     :forceRender='forceRenderBool'>
          <ta-form layout="horizontal"
                   :autoFormCreate="(makeArrangementsForm)=>{this.makeArrangementsForm = makeArrangementsForm}">
            <MakeArrangements :ishide="ishide"
                              :disabled="disabled"
                              :actualAreaAddressmodel="actualAreaAddressmodel"
                              @actualAddress="actualAddress"
                              :OrganizationfileList.sync="OrganizationfileList"
                              :FSRfileList.sync="FSRfileList"
                              :qualificationfileList.sync="qualificationfileList"
                              :capitalSourcefileList.sync="capitalSourcefileList"
                              :yolenefileList.sync="yolenefileList"
                              :otherMaterialfileList.sync="otherMaterialfileList"
                              :orgEstablishBidPersonVal.sync="orgEstablishBidPersonVal"
                              :orgEstablishBidDateVal.sync="orgEstablishBidDateVal"></MakeArrangements>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="机构设置"
                     key="3"
                     :forceRender='forceRenderBool'>
          <ta-form layout="horizontal"
                   :autoFormCreate="(setUpForm)=>{this.setUpForm = setUpForm}">
            <SetUp ref="setupTab"
                   :disabled="disabled"
                   :orgType="orgType"
                   :yesorno="yesorno"
                   :orgNature="orgNature"
                   :medicalModel="medicalModel"
                   :havingFunctionalAreas="havingFunctionalAreas"
                   :registerOrg="registerOrg"
                   :claimReportfileList="claimReportfileList"
                   @claimReportFun='claimReportFun'
                   :siteOwnershipfileList="siteOwnershipfileList"
                   @siteOwnershipFun="siteOwnershipFun"
                   :capitalVerificationfileList="capitalVerificationfileList"
                   @capitalVerificationFun="capitalVerificationFun"
                   :institutionalfileList="institutionalfileList"
                   @institutionalFun="institutionalFun"
                   :otherInformationfileList="otherInformationfileList"
                   @otherInformationFun="otherInformationFun"
                   :approvalOfOrganizationfileList="approvalOfOrganizationfileList"
                   @approvalOfOrganizationFun="approvalOfOrganizationFun"
                   :constructionfileList="constructionfileList"
                   @constructionFun="constructionFun"
                   :shenbanrenfileList="shenbanrenfileList"
                   @shenbanrenFun="shenbanrenFun"
                   :keyPersonnelfileList="keyPersonnelfileList"
                   @keyPersonnelFun="keyPersonnelFun"></SetUp>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs"
                 style="margin-left:20px">返回</ta-button>
      <ta-button type="primary"
                 v-if="!disabled"
                 class="preservation"
                 @click="submit()"
                 :disabled="disabled"
                 style="margin-left:20px">提交</ta-button>
    </div>
  </div>
</template>
<script>
import InstitutionalSetupPlan from './components/institutionalSetupPlan.vue'
import MakeArrangements from './components/makeArrangements.vue'
import SetUp from './components/setUp.vue'
import moment from 'moment'
export default {
  name: 'registrationOfEstablishment',
  components: {
    InstitutionalSetupPlan,
    MakeArrangements,
    SetUp
  },
  data () {
    return {
      ishide: false,
      disabled: false,
      orgType: [],
      orgNature: [],
      censusAddressmodel: [],
      uploadFileList: [],
      actualAreaAddressmodel: [],
      // 登记机关
      registerOrg: [],
      yesorno: [],
      medicalModel: [],
      havingFunctionalAreas: [],
      OrganizationfileList: [],
      FSRfileList: [],
      qualificationfileList: [],
      capitalSourcefileList: [],
      yolenefileList: [],
      otherMaterialfileList: [],
      claimReportfileList: [],
      siteOwnershipfileList: [],
      capitalVerificationfileList: [],
      institutionalfileList: [],
      otherInformationfileList: [],
      approvalOfOrganizationfileList: [],
      constructionfileList: [],
      shenbanrenfileList: [],
      keyPersonnelfileList: [],
      orgEstablishBidPersonVal: '',
      forceRenderBool: true,
      orgName: '',
      orgTypeVal: '',
      orgNatureVal: '',
      orgEstablishBidDateVal: '',
      // actualAreaAddressVal: [],
      id: '',
      detailAll: [],
      setupPlanUploadFileList: [],
      nowkey: '1',
      areaCode: '',
      taorgId: '' // 机构设置规划选择的机构名称中的taorgId

    }
  },
  activated () {
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    if (this.id) {
      this.getDetails()
    }
    this.uploadFileList = []
    this.OrganizationfileList = []
    this.FSRfileList = []
    this.qualificationfileList = []
    this.capitalSourcefileList = []
    this.yolenefileList = []
    this.otherMaterialfileList = []
    this.claimReportfileList = []
    this.siteOwnershipfileList = []
    this.capitalVerificationfileList = []
    this.institutionalfileList = []
    this.otherInformationfileList = []
    this.approvalOfOrganizationfileList = []
    this.constructionfileList = []
    this.shenbanrenfileList = []
    this.keyPersonnelfileList = []
    this.setupPlanForm.resetFields()
    this.makeArrangementsForm.resetFields()
    this.setUpForm.resetFields()
    this.nowkey = '1'
    this.getareaCode()
    this.getorgNature()
  },
  mounted () {
    this.getorgType()
    this.getorgNature()
    this.getregisterOrg()
    this.getyesorno()
    this.getmedicalModel()
    this.gethavingFunctionalAreas()
    this.getareaCode()
  },
  methods: {
    callback (key) {
      this.nowkey = key
      this.showone = true
      this.showtwo = true
      this.$refs.setupTab.setHeight('one', 'oneout')
      this.$refs.setupTab.setHeight('two', 'twoout')
    },
    claimReportFun (val) {
      this.claimReportfileList = val
    },
    siteOwnershipFun (val) {
      this.siteOwnershipfileList = val
    },
    capitalVerificationFun (val) {
      this.capitalVerificationfileList = val
    },
    institutionalFun (val) {
      this.institutionalfileList = val
    },
    otherInformationFun (val) {
      this.otherInformationfileList = val
    },
    approvalOfOrganizationFun (val) {
      this.approvalOfOrganizationfileList = val
    },
    constructionFun (val) {
      this.constructionfileList = val
    },
    shenbanrenFun (val) {
      this.shenbanrenfileList = val
    },
    keyPersonnelFun (val) {
      this.keyPersonnelfileList = val
    },
    // 获取行政区域代码
    async getareaCode () {
      const data = await this.post('/checkChildApi/queryAreaByCurrentUserCounty')
      const areaCodev = data.data.data[0].areacode.toString()
      this.setUpForm.setFieldsValue({ areaCode: areaCodev })
    },
    // 机构类型
    async getorgType () {
      const data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.orgType = data
    },
    // 机构性质
    async getorgNature () {
      const data = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.orgNature = data
    },
    // 登记机关
    async getregisterOrg () {
      const data = await this.getDictionaries('REGISTRATIONAUTHORITY')
      this.registerOrg = data
    },
    // 是否
    async getyesorno () {
      const data = await this.getDictionaries('YESNO')
      this.yesorno = data
    },
    // 医疗模式
    async getmedicalModel () {
      const data = await this.getDictionaries('MEDICALMODEL')
      this.medicalModel = data
    },
    // 拥有功能区域
    async gethavingFunctionalAreas () {
      const data = await this.getDictionaries('FUNCTIONALAREA')
      this.havingFunctionalAreas = data
    },
    censusAddress () {
      this.setupPlanForm.setFieldsValue({
        address_Linkage: this.censusAddressmodel
      })
    },
    actualAddress () {
      this.makeArrangementsForm.setFieldsValue({
        address_Linkage: this.actualAreaAddressmodel
      })
    },
    backs () {
      this.$router.go(-1)
    },
    // 处理数据
    // 机构设置规划文件上传
    orgEstablishPlanProcessingData () {
      const upLoadPathIds = []
      const fileidsGather = [
        ...this.uploadFileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    // 机构筹办文件上传
    orgPreparationProcessingData () {
      const upLoadPathIds = []
      const fileidsGather = [
        ...this.OrganizationfileList,
        ...this.FSRfileList,
        ...this.qualificationfileList,
        ...this.capitalSourcefileList,
        ...this.yolenefileList,
        ...this.otherMaterialfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    // 机构设立文件上传
    orgEstablishRegisterProcessingData () {
      const upLoadPathIds = []
      const fileidsGather = [
        ...this.claimReportfileList,
        ...this.siteOwnershipfileList,
        ...this.capitalVerificationfileList,
        ...this.institutionalfileList,
        ...this.otherInformationfileList,
        ...this.approvalOfOrganizationfileList,
        ...this.constructionfileList,
        ...this.shenbanrenfileList,
        ...this.keyPersonnelfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    async submit () {
      let isok = true
      // 机构设置规划
      let orgEstablishPlanVo = {}
      // 机构筹办
      let orgPreparationVo = {}
      // 机构设立
      let orgEstablishRegisterVo = {}
      const key = []
      const fileContent = this.orgEstablishPlanProcessingData()
      const fileContent2 = this.orgPreparationProcessingData()
      const fileContent3 = this.orgEstablishRegisterProcessingData()
      this.setUpForm.validateFields((err, values) => {
        orgEstablishRegisterVo = values
        if (err) {
          isok = false

          const key3 = '3'
          key.push(key3)
          this.nowkey = key3
          return false
        }
      })
      this.makeArrangementsForm.validateFields((err, values) => {
        orgPreparationVo = values
        if (err) {
          isok = false
          const key2 = '2'
          key.push(key2)
          this.nowkey = key2
          return false
        }
      })

      this.setupPlanForm.validateFields((err, values) => {
        orgEstablishPlanVo = values
        if (err) {
          isok = false
          const key1 = '1'
          key.push(key1)
          this.nowkey = key1
          return false
        }
      })
      if (key != []) {
        this.$nextTick(() => {
          this.$refs.setupTab.setHeight('one', 'oneout')
          this.$refs.setupTab.setHeight('two', 'twoout')
        })
      }
      if (isok) {
        let text = ''
        let url = ''
        if (orgEstablishPlanVo.address_Linkage) {
          if (orgEstablishPlanVo.address_Linkage.length == 1) {
            orgEstablishPlanVo.county = orgEstablishPlanVo.address_Linkage[0]
          }
          if (orgEstablishPlanVo.address_Linkage.length == 2) {
            orgEstablishPlanVo.city = orgEstablishPlanVo.address_Linkage[0]
            orgEstablishPlanVo.county = orgEstablishPlanVo.address_Linkage[1]
          }
          if (orgEstablishPlanVo.address_Linkage.length == 3) {
            orgEstablishPlanVo.province = orgEstablishPlanVo.address_Linkage[0]
            orgEstablishPlanVo.city = orgEstablishPlanVo.address_Linkage[1]
            orgEstablishPlanVo.county = orgEstablishPlanVo.address_Linkage[2]
          }
        }
        if (orgPreparationVo.address_Linkage) {
          if (orgPreparationVo.address_Linkage.length == 1) {
            orgPreparationVo.county = orgPreparationVo.address_Linkage[0]
          }
          if (orgPreparationVo.address_Linkage.length == 2) {
            orgPreparationVo.city = orgPreparationVo.address_Linkage[0]
            orgPreparationVo.county = orgPreparationVo.address_Linkage[1]
          }
          if (orgPreparationVo.address_Linkage.length == 3) {
            orgPreparationVo.province = orgPreparationVo.address_Linkage[0]
            orgPreparationVo.city = orgPreparationVo.address_Linkage[1]
            orgPreparationVo.county = orgPreparationVo.address_Linkage[2]
          }
        }
        orgEstablishRegisterVo.id = this.taorgId
        if (this.id) {
          orgEstablishPlanVo.id = this.detailAll.orgEstablishPlanVo.id
          orgEstablishPlanVo.orgEstablishRegisterId = this.detailAll.orgEstablishPlanVo.orgEstablishRegisterId
          orgPreparationVo.id = this.detailAll.orgPreparationVo.id
          orgPreparationVo.orgEstablishRegisterId = this.detailAll.orgPreparationVo.orgEstablishRegisterId
          orgEstablishRegisterVo.id = this.detailAll.orgEstablishRegisterVo.id
          orgEstablishRegisterVo.createTime = this.detailAll.orgEstablishRegisterVo.createTime
          orgEstablishRegisterVo.createUser = this.detailAll.orgEstablishRegisterVo.createUser
          orgEstablishRegisterVo.delState = this.detailAll.orgEstablishRegisterVo.delState
          orgEstablishRegisterVo.updateTime = this.detailAll.orgEstablishRegisterVo.updateTime
          orgEstablishRegisterVo.updateUser = this.detailAll.orgEstablishRegisterVo.updateUser
          orgEstablishRegisterVo.orgId = this.detailAll.orgEstablishRegisterVo.orgId
          orgEstablishRegisterVo.havingFunctionalAreas = orgEstablishRegisterVo.havingFunctionalAreas.join(',')
          orgEstablishRegisterVo.accessibilityEnvironment = orgEstablishRegisterVo.accessibilityEnvironment.join(',')
          orgEstablishPlanVo.upLoadPathIds = fileContent
          orgPreparationVo.upLoadPathIds = fileContent2
          orgEstablishRegisterVo.upLoadPathIds = fileContent3
          text = '编辑成功'
          url = '/orgEstablishRegister/update'
          const data = {
            orgEstablishPlanVo,
            orgPreparationVo,
            orgEstablishRegisterVo
          }
          const res = await this.post(url, data, true)
          if (res.errors == null) {
            this.$router.go(-1)
            // this.$router.push({
            //   name: 'organizationSettingRecord'
            // })
            this.$message.success(text)
            this.setupPlanForm.resetFields()
            this.makeArrangementsForm.resetFields()
            this.setUpForm.resetFields()
          }
        } else {
          text = '新增成功'
          url = '/orgEstablishRegister/save'
          orgEstablishPlanVo.upLoadPathIds = fileContent
          orgPreparationVo.upLoadPathIds = fileContent2
          orgEstablishRegisterVo.upLoadPathIds = fileContent3
          orgEstablishRegisterVo.havingFunctionalAreas = orgEstablishRegisterVo.havingFunctionalAreas.join(',')
          orgEstablishRegisterVo.accessibilityEnvironment = orgEstablishRegisterVo.accessibilityEnvironment.join(',')

          const data = {
            orgEstablishPlanVo,
            orgPreparationVo,
            orgEstablishRegisterVo
          }
          const res = await this.post(url, data, true)
          if (res.errors == null) {
            this.$router.go(-1)
            // this.$router.push({
            //   name: 'organizationSettingRecord'
            // })
            this.$message.success(text)

            this.setupPlanForm.resetFields()
            this.makeArrangementsForm.resetFields()
            this.setUpForm.resetFields()
          }
        }
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    // 详情
    async getDetails () {
      const params = {
        id: this.id
      }
      const data = await this.post('/orgEstablishRegister/queryById', params)
      const detail = data.data.data
      this.detailAll = data.data.data
      if (detail.orgEstablishPlanVo.fileList) {
        detail.orgEstablishPlanVo.fileList.map(item => {
          if (item.functionType == '3' && item.busiType == '35') {
            this.uploadFileList.push(item)
          }
        })
      }
      if (detail.orgPreparationVo.fileList) {
        detail.orgPreparationVo.fileList.map(item => {
          if (item.functionType == '3' && item.busiType == '12') {
            this.OrganizationfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '13') {
            this.FSRfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '14') {
            this.qualificationfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '15') {
            this.capitalSourcefileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '16') {
            this.yolenefileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '17') {
            this.otherMaterialfileList.push(item)
          }
        })
      }
      if (detail.orgEstablishRegisterVo.fileList) {
        detail.orgEstablishRegisterVo.fileList.map(item => {
          if (item.functionType == '3' && item.busiType == '18') {
            this.claimReportfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '19') {
            this.siteOwnershipfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '20') {
            this.capitalVerificationfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '21') {
            this.institutionalfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '17-17') {
            this.otherInformationfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '22') {
            this.approvalOfOrganizationfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '23') {
            this.constructionfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '24') {
            this.shenbanrenfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '25') {
            this.keyPersonnelfileList.push(item)
          }
        })
      }
      this.$nextTick(() => {
        if (detail.orgEstablishPlanVo.city && detail.orgEstablishPlanVo.county && detail.orgEstablishPlanVo.province) {
          this.censusAddressmodel = [detail.orgEstablishPlanVo.province, detail.orgEstablishPlanVo.city, detail.orgEstablishPlanVo.county]
        } else if (detail.orgEstablishPlanVo.city && detail.orgEstablishPlanVo.county && !detail.orgEstablishPlanVo.province) {
          this.censusAddressmodel = [detail.orgEstablishPlanVo.city, detail.orgEstablishPlanVo.county]
        } else if (!detail.orgEstablishPlanVo.city && detail.orgEstablishPlanVo.county && !detail.orgEstablishPlanVo.province) {
          this.censusAddressmodel = [detail.orgEstablishPlanVo.county]
        }

        if (detail.orgPreparationVo.city && detail.orgPreparationVo.county && detail.orgPreparationVo.province) {
          this.actualAreaAddressmodel = [detail.orgPreparationVo.province, detail.orgPreparationVo.city, detail.orgPreparationVo.county]
        } else if (detail.orgPreparationVo.city && detail.orgPreparationVo.county && !detail.orgPreparationVo.province) {
          this.actualAreaAddressmodel = [detail.orgPreparationVo.city, detail.orgPreparationVo.county]
        } else if (!detail.orgPreparationVo.city && detail.orgPreparationVo.county && !detail.orgPreparationVo.province) {
          this.actualAreaAddressmodel = [detail.orgPreparationVo.county]
        }

        detail.orgPreparationVo.orgEstablishBidDate = detail.orgPreparationVo.orgEstablishBidDate ? moment(detail.orgPreparationVo.orgEstablishBidDate) : null
        detail.orgEstablishRegisterVo.orgEstablishBidDate = detail.orgEstablishRegisterVo.orgEstablishBidDate ? moment(detail.orgEstablishRegisterVo.orgEstablishBidDate) : null
        detail.orgEstablishRegisterVo.foundDate = detail.orgEstablishRegisterVo.foundDate ? moment(detail.orgEstablishRegisterVo.foundDate) : null
        detail.orgEstablishRegisterVo.businessLicenseExpirationDate = detail.orgEstablishRegisterVo.businessLicenseExpirationDate ? moment(detail.orgEstablishRegisterVo.businessLicenseExpirationDate) : null
        detail.orgEstablishRegisterVo.businessLicenseIssueDate = detail.orgEstablishRegisterVo.businessLicenseIssueDate ? moment(detail.orgEstablishRegisterVo.businessLicenseIssueDate) : null
        detail.orgEstablishRegisterVo.havingFunctionalAreas = detail.orgEstablishRegisterVo.havingFunctionalAreas ? detail.orgEstablishRegisterVo.havingFunctionalAreas.split(',') : []
        detail.orgEstablishRegisterVo.accessibilityEnvironment = detail.orgEstablishRegisterVo.accessibilityEnvironment ? detail.orgEstablishRegisterVo.accessibilityEnvironment.split(',') : []
        this.setupPlanForm.setFieldsValue(detail.orgEstablishPlanVo)
        this.makeArrangementsForm.setFieldsValue(detail.orgPreparationVo)
        this.setUpForm.setFieldsValue(detail.orgEstablishRegisterVo)
      })
    }
  },
  watch: {
    orgEstablishBidPersonVal (val) {
      this.setUpForm.setFieldsValue({ orgEstablishBidPerson: val })
    },
    orgEstablishBidDateVal (val) {
      val = val ? moment(val) : null
      this.setUpForm.setFieldsValue({ orgEstablishBidDate: val })
    },
    orgName (val) {
      this.setUpForm.setFieldsValue({ orgName: val })
    },
    orgTypeVal (val) {
      this.setUpForm.setFieldsValue({ orgType: val })
    },
    orgNatureVal (val) {
      this.setUpForm.setFieldsValue({ orgNature: val })
    }
  }
}
</script>
<style scoped>
</style>
