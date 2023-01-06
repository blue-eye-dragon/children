<template>
  <!-- 仅供查看 -->
  <div class="conts">
    <div class="contin  ">
      <ta-tabs :activeKey="nowkey"
               @change="callback"
               class="tabout"
               type="card">

        <ta-tab-pane tab="机构设置规划"
                     key="1"
                     :forceRender='forceRenderBool'>
          <ta-form layout="horizontal"
                   :autoFormCreate="(setupPlanForm)=>{this.setupPlanForm = setupPlanForm}">
            <InstitutionalSetupPlan :disabled="disabled"
                                    :ishide="ishide"
                                    :orgNameLists="orgNameList"
                                    :orgType="orgType"
                                    :orgTypes="orgTypes"
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
                              :orgTypes="orgTypes"
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

        <ta-tab-pane tab="机构信息"
                     key="4"
                     :forceRender="true">
          <ta-form :autoFormCreate="(orgFrom)=>{this.orgFrom = orgFrom}">
            <insInfo :isAdr="isAdr"
                     :orgNameLists="orgNameList"
                     @setFrom="setFrom"
                     :yesNoList="yesNoList"
                     :basedisabled="basedisabled"
                     @clearData="clearData"
                     :newLins.sync='newLinsss'
                     :thisP="this"></insInfo>
            <!--  -->
          </ta-form>
        </ta-tab-pane>

        <ta-tab-pane tab="人员信息"
                     key="5"
                     :disabled="addinfoOn"
                     :forceRender="true"
                     v-model="person">
          <ta-form :autoFormCreate="(personFrom)=>{this.personFrom = personFrom}">
            <personnel :personOK="personOK"
                       ref="knone"></personnel>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="人员历史记录"
                     key="6"
                     :disabled="addinfoOn"
                     :forceRender="true">
          <personLog :idd="id"></personLog>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="but"
                 @click="submit"
                 v-if="this.nowkey!='3'&&!basedisabled">提交</ta-button>
    </div>
  </div>
</template>

<script>
import InstitutionalSetupPlan from '../../welfareAuthorityRegulation/organizationManagement/registrationOfEstablishment/components/institutionalSetupPlan.vue'
import MakeArrangements from '../../welfareAuthorityRegulation/organizationManagement/registrationOfEstablishment/components/makeArrangements.vue'
import SetUp from '../../welfareAuthorityRegulation/organizationManagement/registrationOfEstablishment/components/setUp.vue'

import InsInfo from './insInfo'
import Personnel from './personnel'
import PersonLog from './personLog'
import moment from 'moment'

export default {
  components: {
    InstitutionalSetupPlan, MakeArrangements, SetUp, InsInfo, Personnel, PersonLog
    // registrationOfEstablishment
  },
  data () {
    return {
      page: 1,
      size: 10,
      mixDataList: [],
      mixPageRef: 'gridPager',
      person: '',
      parentId: '',
      parentOrgName: '',
      nowtype: '',
      orgTypes: '',
      personOK: true, // 人员编辑false
      basedisabled: false, // 机构信息编辑false
      addinfoOn: false,
      yesNoList: [],
      allDate: [], // 编辑时获取初始数据,
      addressmodel: [],
      id: '',
      isAdr: true,
      havespell: [], // 拥有功能区域
      dallspell: [], // 无障碍区域
      registId: '',
      newLinsss: false,
      nowkey: '1', // 当前tab页,
      isFromSearch: false,
      formDataSearch: {},
      // -------------------------------
      orgNameList: [],

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
      detailAll: [],
      setupPlanUploadFileList: [],
      areaCode: '',
      taorgId: '' // 机构设置规划选择的机构名称中的taorgId
    }
  },

  activated () {
    this.disabled = this.$route.query.disabled
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

    const that = this
    that.nowkey = '1'
    this.isshow = false
    this.isFromSearch = false
    this.formDataSearch = {}
    const param = that.$route.query
    that.parentOrgName = param.parentOrgName
    that.parentId = param.parentId
    that.nowtype = param.nowtype
    that.orgTypes = param.orgType // 2019年12月3日11:00:51 福利院 99；
    that.id = param.id

    if (this.id) {
      this.getDetails()
    }

    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (that.nowtype == 1) {
      that.isAdr = false
      that.personOK = true
      that.basedisabled = false
      that.addinfoOn = true
      that.orgFrom.setFieldsValue({
        parentOrgId: that.parentId,
        parentOrgName: that.parentOrgName ? that.parentOrgName : '无'
      })
    } else {
      this.getallData(that.id)
    }
  },
  mounted () {
    this.getyesNoList() // 是否字典
    this.getfunctionalAreaList()
    this.getorgType()
    this.getorgNature()
    this.getregisterOrg()
    this.getyesorno()
    this.getmedicalModel()
    this.gethavingFunctionalAreas()
    this.gainAri()
  },
  methods: {
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
    async gainAri () {
      const data = await this.post(
        'welfareOrgManagement/listOfWelfareToBefund'
      )
      this.orgNameList = data.data.data
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
      const areaCodev = this.orgTypes == 99 ? window.parent.indexTool.getUserInfo().areaCode : data.data.data[0].areacode.toString()
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
    // 详情-机构创建
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
          // if (item.functionType == '3' && item.busiType == '35') {
          //   this.uploadFileList.push(item)
          // }
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
        if (this.orgTypes == 99) {
          detail.orgEstablishPlanVo.areaName = window.parent.indexTool.getUserInfo().areaName
          detail.orgPreparationVo.areaName = window.parent.indexTool.getUserInfo().areaName
        }

        detail.orgPreparationVo.orgEstablishBidDate = detail.orgPreparationVo.orgEstablishBidDate ? moment(detail.orgPreparationVo.orgEstablishBidDate) : null
        detail.orgEstablishRegisterVo.orgEstablishBidDate = detail.orgEstablishRegisterVo.orgEstablishBidDate ? moment(detail.orgEstablishRegisterVo.orgEstablishBidDate) : null
        detail.orgEstablishRegisterVo.foundDate = detail.orgEstablishRegisterVo.foundDate ? moment(detail.orgEstablishRegisterVo.foundDate) : null
        detail.orgEstablishRegisterVo.businessLicenseExpirationDate = detail.orgEstablishRegisterVo.businessLicenseExpirationDate ? moment(detail.orgEstablishRegisterVo.businessLicenseExpirationDate) : null
        detail.orgEstablishRegisterVo.businessLicenseIssueDate = detail.orgEstablishRegisterVo.businessLicenseIssueDate ? moment(detail.orgEstablishRegisterVo.businessLicenseIssueDate) : null
        detail.orgEstablishRegisterVo.havingFunctionalAreas = detail.orgEstablishRegisterVo.havingFunctionalAreas ? detail.orgEstablishRegisterVo.havingFunctionalAreas?.split(',') : []
        detail.orgEstablishRegisterVo.accessibilityEnvironment = detail.orgEstablishRegisterVo.accessibilityEnvironment ? detail.orgEstablishRegisterVo.accessibilityEnvironment.split(',') : []
        this.setupPlanForm.setFieldsValue(detail.orgEstablishPlanVo)
        this.makeArrangementsForm.setFieldsValue(detail.orgPreparationVo)
        this.setUpForm.setFieldsValue(detail.orgEstablishRegisterVo)
      })
    },

    // --------------------------------------------------

    // tab切换时的change方法
    callback (e) {
      this.nowkey = e

      this.showone = true
      this.showtwo = true
      this.$refs.setupTab.setHeight('one', 'oneout')
      this.$refs.setupTab.setHeight('two', 'twoout')

      const persontabs = this.$refs.knone
      persontabs.showone = true
      persontabs.showtwo = true
      persontabs.showthree = true
      persontabs.showfour = true
      persontabs.setHeight('one', 'oneout')
      persontabs.setHeight('two', 'twoout')
      persontabs.setHeight('three', 'threeout')
      persontabs.setHeight('four', 'fourout')
    },
    zdxyContrs (v) {
      this.newLinsss = v
    },
    setFrom (obj) {
      this.registId = obj.id
      // 2020年3月8日18点43分
      obj.welfareOrgId = obj.taorgId
      // 2019年12月16日14:56:44
      obj.taorgId = obj.parentId
      obj.orgId = window.parent.indexTool.getUserInfo().orgId
      // 需求变动2019年12月3日14:27:29
      this.$nextTick(() => {
        this.orgFrom.setFieldsValue(obj)
        this.orgFrom.setFieldsValue({ parentName: obj.parentName ? obj.parentName : '无数据' })
      })
    },

    async getfunctionalAreaList () {
      const data = await this.getDictionaries('FUNCTIONALAREA')
      this.functionalAreaList = data
    },
    // 清空
    clearData () {
      this.orgFrom.setFieldsValue({
        identificationOrgName: null,
        identificationOrgCode: null,
        identificationDate: null
      })
    },
    async getallData (ids) {
      // 数据加载获取
      this.isAdr = true
      const that = this
      that.addinfoOn = false
      const paramEdit = {
        id: ids
      }
      const allData = await this.post(
        '/welfareOrgManagement/queryInfoForEdit',
        paramEdit
      )

      that.allDateEdit = allData.data.data
      this.newLinsss = (that.allDateEdit.rehabilitationCenterYOrN == '1')

      const onespell = that.allDateEdit.havingFunctionalAreas // 拥有功能区域
      this.havespell = onespell ? onespell.split(',') : []
      const twospell = that.allDateEdit.accessibilityEnvironment // 拥有功能区域
      this.dallspell = twospell ? twospell.split(',') : []

      if (that.nowtype == 3) {
        // 查看
        that.personOK = true
        that.basedisabled = true
        // this.newLinsss = false
      }

      if (that.orgTypes == '99' && that.nowtype == 2) {
        // 福利院编辑
        that.personOK = false // 人员可编辑
        that.basedisabled = false // 机构信息可编辑
      }

      if (that.orgTypes != '99' && that.nowtype == 2) {
        // 民政局编辑
        that.personOK = true // 人员不可编辑
        that.basedisabled = true // 机构信息不可编辑
      }

      if (that.nowtype == 2 || that.nowtype == 3) {
        // 显示机构信息数据
        that.$nextTick(() => {
          that.orgFrom.setFieldsValue(that.allDateEdit)

          that.orgFrom.setFieldsValue({
            havingFunctionalAreas: this.havespell,
            accessibilityEnvironment: this.dallspell,
            businessLicenseIssueDate: that.allDateEdit.businessLicenseIssueDate ? moment(
              that.allDateEdit.businessLicenseIssueDate
            ) : null,
            foundDate: that.allDateEdit.foundDate ? moment(that.allDateEdit.foundDate) : null,
            businessLicenseExpirationDate: that.allDateEdit.businessLicenseExpirationDate ? moment(
              that.allDateEdit.businessLicenseExpirationDate
            ) : null,
            identificationDate: that.allDateEdit.identificationDate ? moment(that.allDateEdit.identificationDate) : null

          })
          if (that.allDateEdit.foodBusinessLicenseIssueDate) {
            that.orgFrom.setFieldsValue({
              foodBusinessLicenseIssueDate: that.allDateEdit.foodBusinessLicenseIssueDate ? moment(
                that.allDateEdit.foodBusinessLicenseIssueDate
              ) : null
            })
          }
          if (that.allDateEdit.foodBusinessLicenseExpirationDate) {
            that.orgFrom.setFieldsValue({
              foodBusinessLicenseExpirationDate: that.allDateEdit.foodBusinessLicenseExpirationDate ? moment(
                that.allDateEdit.foodBusinessLicenseExpirationDate
              ) : null
            })
          }

          that.personFrom.setFieldsValue(
            // 如果存在机构人员信息数据则显示
            that.allDateEdit
          )

          that.personFrom.setFieldsValue({
            welfOrgId: that.id
          })
          if (that.allDateEdit.birthday) {
            that.personFrom.setFieldsValue({
              birthday: that.allDateEdit.birthday ? moment(that.allDateEdit.birthday) : null
            })
          }
          // 如果是否残联定点康复中心为否 则清空认定机构名称、认定机构编码认定日期数据
          if (!this.newLinsss) {
            this.clearData()
          }
        })
      }
    },

    async getyesNoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesNoList = data
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      // this.nowtype = ''
      this.orgFrom.resetFields()
      this.personFrom.resetFields()
      this.$router.go(-1)
    },
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
    },
    // 基本信息提交
    submit () {
      if (this.nowkey == '1') { // 机构信息提交
        this.orgFrom.validateFields(async (err, values) => {
          if (!err) {
            let url = '/welfareOrgManagement/save'
            let text = '增加成功'
            const params = this.orgFrom.getFieldsValue()
            params.spell = this.Base.pinyin.getCamelChars(params.orgName)
            this.changetime(params)
            const areaPath = params.areaPath ? params.areaPath.split('/') : null

            if (areaPath) {
              params.province = areaPath[0] ? areaPath[0] : null
              params.city = areaPath[1] ? areaPath[1] : null
              params.county = areaPath[2] ? areaPath[2] : null
            }

            if (this.nowtype != 1) {
              // 编辑
              text = '修改成功'
              url = '/welfareOrgManagement/update'
              params.id = this.id
            }
            params.registId = this.registId
            this.post(url, params).then((res) => {
              if (res.serviceSuccess) {
                this.$message.success(text)
                this.onClose()
              }
            })
          } else {
            this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      } else if (this.nowkey == '2') { // 人员信息提交
        this.personFrom.validateFields(async (err, values) => {
          if (!err) {
            const url = '/welfareOrgManagement/savePeople'
            let text = ''
            const params = this.personFrom.getFieldsValue()
            this.changetime(params)
            // 新增
            if (values.chairmanName) {
              params.id = this.id
              text = '修改成功'
            } else {
              text = '增加成功'
            }
            if (this.nowtype != 1) {
              // 编辑
              text = '修改成功'
              params.id = this.id
            }
            this.post(url, params).then((res) => {
              if (res.serviceSuccess) {
                this.$message.success(text)
                this.onClose()
              }
            })
          } else {
            this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      }
    },
    onClose () {
      this.$router.go(-1)
    },
    // 数据处理
    changetime (data) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            data.province = data[k][0]
            data.city = data[k][1]
            data.county = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
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
.but {
  margin-left: 20px;
}
.tabout {
  background: #fff;
  padding: 20px 20px 0;
}
</style>
