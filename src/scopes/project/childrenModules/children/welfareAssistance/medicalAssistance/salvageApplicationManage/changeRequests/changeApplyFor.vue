<template>
  <!-- 申请 -->
  <div class="conts"
       style="background:#fff">
    <!-- <ta-anchor class="md" :offsetTop="100" @click.native="chans">
      <ta-anchor-link href="#anchorpoint_a" title="儿童基本信息" />
      <ta-anchor-link href="#anchorpoint_b" title="医疗申请信息" />
    </ta-anchor> -->
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="儿童基本信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               ref="one"
               :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
        <childInfoMed :nationList="nationList"
                      :sexList="sexList"
                      :childcategoryaList="childcategoryaList"
                      :illnesstypeList="illnesstypeList"
                      :disabilitylevelList="disabilitylevelList"
                      :censusregisterList="censusregisterList"
                      :disabilitytypeList="disabilitytypeList"
                      @setaddress="setaddress"
                      :addressmodel="addressmodel"
                      :disabled="disabled"
                      ref="additionOne"
                      @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                      :idCardDisabled="idCardDisabled"
                      @idcardchange="idcardchange"></childInfoMed>
      </ta-form>
    </div>

    <div ref="twoout"
         class="mars">
      <Title id="anchorpoint_b"
             title="医疗申请信息"
             :show.sync="showtwo"></Title>
      <ta-form layout="horizontal"
               ref="two"
               :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
        <childInfoMedi :fileListImg.sync="fileListImg"
                       :fileListCard.sync="fileListCard"
                       :fileListFile.sync="fileListFile"
                       :incomeList.sync="incomeList"
                       :diBaoList.sync="diBaoList"
                       @setaddress="setaddress2"
                       :addressmodel="addressmodel2"
                       :disabledM="disabledM"
                       :disabled="disabled"
                       :guardianArray.sync="guardianArray"
                       @actualAddress="actualAddress"
                       @clickSearch="clickSearch"
                       :idcardList="idcardList"
                       :relationList="relationList"
                       :childidentitytypeList="childidentitytypeList"
                       :addreslistsmodel="addreslistsmodel"
                       :goType="goType"
                       :qtsf="qtsf"
                       :disabledSel="disabledSel"
                       ref="addition"></childInfoMedi>
      </ta-form>
    </div>

    <div class="bom">
      <ta-button type="primary"
                 v-if="this.goType=='1' || this.goType=='3'"
                 class="btnleft"
                 @click="submit()">确认</ta-button>
      <ta-button class="btnleft"
                 @click="back">返回</ta-button>
    </div>

    <!-- 申请变更提交确认弹窗 -->
    <div>
      <ta-modal title="提交确认"
                :width="'90%'"
                :closable="false"
                @close="onCloseCanle"
                :visible="editVisible">
        <div>
          <ta-row class="fromintop">
            <ta-radio-group class="radio_grops">
              <ta-col :span="12"
                      type="flex"
                      justify="center"
                      align="middle">
                <div>变更前</div>
              </ta-col>
              <ta-col :span="12"
                      type="flex"
                      justify="center"
                      align="middle">
                <div>变更后</div>
              </ta-col>
            </ta-radio-group>
          </ta-row>
          <ta-form :autoFormCreate="(oldform)=>{this.oldform = oldform}">
            <ta-row class="frominadd">
              <ta-col :span="12">
                <ta-form-item label="救治病种类型"
                              fieldDecoratorId="copy_rescueDiseaseType"
                              :require="{message:'请选择救治病种类型!'}"
                              v-if="rescueDiseaseTypeVisible[0]">
                  <ta-select placeholder="请选择救治病种类型"
                             style="width : 100%"
                             :disabled="true">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in diseasetypeList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="是否加入医保"
                              v-if="whetherAddmedicalInsuranceVisible[0]"
                              fieldDecoratorId="copy_whetherAddmedicalInsurance"
                              :require="{message:'请选择是否加入医保!'}">
                  <ta-select placeholder="请选择是否加入医保"
                             style="width : 100%"
                             :disabled="true">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in yesnoList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="救治病种名称"
                              fieldDecoratorId="copy_rescueDiseaseName"
                              v-if="rescueDiseaseNameVisible[0]"
                              :fieldDecoratorOptions="verificationRules('救治病种名称', 20)">
                  <ta-input placeholder="请输入救治病种名称"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="儿童身份类型"
                              fieldDecoratorId="copy_childIdentityType"
                              :require="{message:'请选择儿童身份类型!'}"
                              v-if="childIdentityTypeVisible[0]">
                  <ta-select placeholder="请选择儿童身份类型"
                             :disabled="true"
                             style="width : 100%">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in childidentitytypeList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="联系人"
                              fieldDecoratorId="copy_contact"
                              v-if="contactVisible[0]"
                              :fieldDecoratorOptions="verificationRules('联系人', 72)">
                  <ta-input placeholder="请输入联系人"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="联系电话"
                              fieldDecoratorId="copy_contactTelephone"
                              :require="{message:'请输入联系电话!'}"
                              v-if="contactTelephoneVisible[0]">
                  <ta-input placeholder="请输入联系电话"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="所属福利机构"
                              v-if="belongToOrgVisible[0]"
                              fieldDecoratorId="copy_belongToOrg"
                              :require="{message:'请输入所属福利机构!'}">
                  <ta-input placeholder="请输入所属福利机构"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="所属民政部门"
                              v-if="civilAdministrationDepartmentVisible[0]"
                              fieldDecoratorId="copy_civilAdministrationDepartment"
                              :require="{message:'请输入所属民政部门!'}">
                  <ta-input placeholder="请输入所属民政部门"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="进入福利机构日期"
                              v-if="intoOrgDateVisible[0]"
                              fieldDecoratorId="copy_intoOrgDateDate"
                              :require="{message:'请选择进入福利机构日期!'}">
                  <ta-date-picker style="width: 100%;"
                                  :disabled="true"
                                  :valid-now-time="'right'"
                                  placeholder="请选择进入民政部门日期" />
                </ta-form-item>

                <ta-form-item label="进入民政部门日期"
                              v-if="intoCivilAdministrationDateVisible[0]"
                              fieldDecoratorId="copy_intoCivilAdministrationDate"
                              :require="{message:'请选择进入民政部门日期!'}">
                  <ta-date-picker style="width: 100%;"
                                  :disabled="true"
                                  :valid-now-time="'right'"
                                  placeholder="请选择进入民政部门日期" />
                </ta-form-item>
                <ta-form-item label="家庭人均年收入(元)"
                              v-if="familyAverageAnnualIncomeVisible[0]"
                              fieldDecoratorId="copy_familyAverageAnnualIncome"
                              :require="{message:'请输入家庭人均年收入!'}">
                  <ta-input placeholder="请输入家庭人均年收入"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="家庭说明"
                              v-if="familyExplainVisible[0]"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18 }"
                              fieldDecoratorId="copy_familyExplain"
                              :require="{message:'请输入家庭说明!'}">
                  <ta-textarea placeholder="请输入家庭说明"
                               :disabled="true"
                               :rows="2" />
                </ta-form-item>
              </ta-col>

              <ta-col :span="12">
                <ta-form-item label="救治病种类型"
                              fieldDecoratorId="rescueDiseaseType"
                              :require="{message:'请选择救治病种类型!'}"
                              v-if="rescueDiseaseTypeVisible[0]">
                  <ta-select placeholder="请选择救治病种类型"
                             style="width : 100%"
                             :disabled="true">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in diseasetypeList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="是否加入医保"
                              v-if="whetherAddmedicalInsuranceVisible[0]"
                              fieldDecoratorId="whetherAddmedicalInsurance"
                              :require="{message:'请选择是否加入医保!'}">
                  <ta-select placeholder="请选择是否加入医保"
                             style="width : 100%"
                             :disabled="true">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in yesnoList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="救治病种名称"
                              fieldDecoratorId="rescueDiseaseName"
                              :require="{message:'请输入救治病种名称!'}"
                              v-if="rescueDiseaseNameVisible[0]">
                  <ta-input placeholder="请输入救治病种名称"
                            :disabled="true" />
                </ta-form-item>

                <ta-form-item label="儿童身份类型"
                              fieldDecoratorId="childIdentityType"
                              :require="{message:'请选择儿童身份类型!'}"
                              v-if="childIdentityTypeVisible[0]">
                  <ta-select placeholder="请选择儿童身份类型"
                             :disabled="true"
                             style="width : 100%">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in childidentitytypeList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="联系人"
                              fieldDecoratorId="contact"
                              v-if="contactVisible[0]"
                              :require="{message:'请输入联系人!'}">
                  <ta-input placeholder="请输入联系人"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="联系电话"
                              fieldDecoratorId="contactTelephone"
                              :require="{message:'请输入联系电话!'}"
                              v-if="contactTelephoneVisible[0]">
                  <ta-input placeholder="请输入联系电话"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="所属福利机构"
                              v-if="belongToOrgVisible[0]"
                              fieldDecoratorId="belongToOrg"
                              :require="{message:'请输入所属福利机构!'}">
                  <ta-input placeholder="请输入所属福利机构"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="所属民政部门"
                              v-if="civilAdministrationDepartmentVisible[0]"
                              fieldDecoratorId="civilAdministrationDepartment"
                              :require="{message:'请输入所属民政部门!'}">
                  <ta-input placeholder="请输入所属民政部门"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="进入福利机构日期"
                              v-if="intoOrgDateVisible[0]"
                              fieldDecoratorId="intoOrgDate"
                              :require="{message:'请选择进入福利机构日期!'}">
                  <ta-date-picker style="width: 100%;"
                                  :disabled="true"
                                  :valid-now-time="'right'"
                                  placeholder="请选择进入民政部门日期" />
                </ta-form-item>

                <ta-form-item label="进入民政部门日期"
                              v-if="intoCivilAdministrationDateVisible[0]"
                              fieldDecoratorId="intoCivilAdministrationDate"
                              :require="{message:'请选择进入民政部门日期!'}">
                  <ta-date-picker style="width: 100%;"
                                  :disabled="true"
                                  :valid-now-time="'right'"
                                  placeholder="请选择进入民政部门日期" />
                </ta-form-item>
                <ta-form-item label="家庭人均年收入(元)"
                              v-if="familyAverageAnnualIncomeVisible[0]"
                              fieldDecoratorId="familyAverageAnnualIncome"
                              :require="{message:'请输入家庭人均年收入!'}">
                  <ta-input placeholder="请输入家庭人均年收入"
                            :disabled="true" />
                </ta-form-item>
                <ta-form-item label="家庭说明"
                              v-if="familyExplainVisible[0]"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18 }"
                              fieldDecoratorId="familyExplain"
                              :require="{message:'请输入家庭说明!'}">
                  <ta-textarea placeholder="请输入家庭说明"
                               :disabled="true"
                               :rows="2" />
                </ta-form-item>
              </ta-col>
            </ta-row>
            <!-- <ta-row class="frominadd">
              <ta-col :span="24">
                <ta-form-item
                  label="变更原因"
                  fieldDecoratorId="changeReason"
                  :labelCol="{ span: 3 }"
                  :wrapperCol="{ span: 21 }"
                >
                  <ta-textarea placeholder="请输入" :rows="4" :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-row>-->
          </ta-form>
        </div>
        <div slot="footer">
          <ta-button key="back"
                     @click="handleOkRevoke('0')">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     @click="handleOkRevoke('1')">确定</ta-button>
        </div>
      </ta-modal>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import childInfoMed from './components/childInfoMed'
import childInfoMedi from './components/childInfoMedi'
import { setTimeout } from 'timers'
import moment from 'moment'
// import listMixin from '@component/common/js/mixins/listMixin'
export default {
  name: 'register',
  // mixins: [listMixin],
  components: {
    Title,
    childInfoMed,
    childInfoMedi
  },
  data () {
    return {
      goType: '0',
      showone: true,
      saveOrno: true,
      showtwo: true,
      bg: false, // 变更申请显示状态标志
      nowkey: '1',
      objTemp: [], // 上一个页面数据传入
      id: '',
      nationList: [],
      sexList: [],
      childcategoryaList: [],
      illnesstypeList: [],
      disabilitylevelList: [],
      censusregisterList: [],
      disabilitytypeList: [],
      diseasetypeList: [],
      childidentitytypeList: [],
      // 是否提交保存
      buttonType: '1',
      fileListImg: [],
      fileListCard: [],
      fileListFile: [],
      incomeList: [],
      diBaoList: [],
      yesnoList: [],
      addressmodel: [],
      addressmodel2: [],
      childBaseId: '',
      medicalId: '',
      orgId: '',
      disabled: false,
      disabledM: true,
      editVisible: false,
      idCardDisabled: false,
      medicalRescueVoOld: {},
      visible: false, // 对比弹窗的显隐
      rescueDiseaseTypeVisible: [false, '救治病种类型'],
      // whetherAddmedicalInsuranceVisible: [false, '是否加入医保'],
      rescueDiseaseNameVisible: [false, '救治病种名称'],
      childIdentityTypeVisible: [false, '儿童身份类型'],
      contactVisible: [false, '联系人'],
      contactTelephoneVisible: [false, '联系电话'],
      belongToOrgVisible: [false, '所属福利机构'],
      intoOrgDateVisible: [false, '进入福利机构日期'],
      civilAdministrationDepartmentVisible: [false, '所属民政部门'],
      intoCivilAdministrationDateVisible: [false, '进入民政部门日期'],
      address_LinkageVisible: [false, '户籍所在地'],
      familyAverageAnnualIncomeVisible: [false, '家庭人均年收入(元)'],
      familyExplainVisible: [false, '家庭说明'],
      applyDateVisible: [false, '申请日期'],
      whetherAddmedicalInsuranceVisible: [false, '是否加入低保'],
      changeReasonVisible: [false, '变更原因'],
      upLoadPathIdVisible: [false, '附件'],
      medicalRescueApplyId: '',
      medicalRescueApplyChangeVo: {},
      workflowId: '',
      curFlowId: '',
      addreslistsmodel: [],
      // 添加监护人
      guardianArray: [1],
      qtsf: false,
      idcardList: [],
      relationList: [],
      disabledSel: false
    }
  },
  created () { },
  activated () {
    this.$nextTick(() => { })
    this.loadData()
    this.getdiseasetypeList()
    this.getchildidentitytypeList()
    this.getchildcategoryaList()
    this.guardianArray = []

    let goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    if (goTypeTemp == 'salvageApplication-biangengApp') {
      // 申请变更---确定
      this.bg = false // 隐藏变更说明弹框
      this.goType = '1'
      // let data = this.$route.query.obj
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.disabled = true
      this.disabledM = false
      this.idCardDisabled = true
      // this.guardianArray = []
      this.$nextTick(() => {
        this.getDetails()
      })
    } else if (goTypeTemp == 'applicationRecord-edit') {
      // 申请变更记录---编辑
      this.bg = false // 隐藏变更说明弹框
      this.goType = '3'
      // let data = this.$route.query.obj
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.medicalRescueApplyId = data.medicalRescueApplyId
      this.curFlowId = data.curFlowId
      this.disabled = true
      this.disabledM = false
      this.idCardDisabled = true
      // this.guardianArray = []
      this.getDetails()
    } else if (goTypeTemp == 'salvageApplication-biangengcancle') {
      // 变更申请---取消
      this.bg = false // 隐藏变更说明弹框
      this.goType = '7'
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      // this.guardianArray = []
      this.getDetails()
    }
    window.onresize = () => {
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.showone)
        this.setHeight('two', 'twoout', !this.showtwo)
      })
    }
  },
  mounted () {
    this.getnation()
    this.getsexList()
    this.getyesnoList()
    // this.getchildcategoryaList()
    this.getillnesstypeList()
    this.getdisabilitytypeList()
    this.getdisabilitylevelList()
    this.getcensusregisterList()
    this.getIdcardList()
    this.getRelationList()
    window.onresize = () => {
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.showone)
        this.setHeight('two', 'twoout', !this.showtwo)
      })
    }
  },
  methods: {
    loadData () {
      this.adoptedFrom.resetFields()
      this.cptAdoptorFrom.resetFields()
      // this.idCardDisabled = false
      this.fileListImg = []
      this.fileListCard = []
      this.fileListFile = []
      this.incomeList = []
      this.diBaoList = []
      this.childidentitytypeList = []
    },
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      // this.idCardDisabled = true
    },
    idcardchange () {
      if (this.goType == '1') {
        this.adoptedFrom.resetFields()
        this.idCardDisabled = false
      } else {
        this.idCardDisabled = true
      }
    },
    // 处理数据
    processingData () {
      let MedicalApplyVo = {}
      // 是否保存提交
      MedicalApplyVo.buttonType = this.buttonType
      // 儿童基本信数据
      let medicalRescueApplyChildInfoVo = {}
      medicalRescueApplyChildInfoVo = Object.assign(
        {},
        this.adoptedFrom.getFieldsValue()
      )
      this.changetime(medicalRescueApplyChildInfoVo)
      if (medicalRescueApplyChildInfoVo.address_Linkage) {
        medicalRescueApplyChildInfoVo.province =
          medicalRescueApplyChildInfoVo.address_Linkage[0]
        medicalRescueApplyChildInfoVo.city =
          medicalRescueApplyChildInfoVo.address_Linkage[1]
        medicalRescueApplyChildInfoVo.county =
          medicalRescueApplyChildInfoVo.address_Linkage[2]
        delete medicalRescueApplyChildInfoVo.address_Linkage
      }
      medicalRescueApplyChildInfoVo.id = this.id
      MedicalApplyVo.medicalRescueApplyChildInfoVo = medicalRescueApplyChildInfoVo

      // 医疗申请信息
      let medicalRescueVo = {}
      medicalRescueVo = Object.assign({}, this.cptAdoptorFrom.getFieldsValue())
      this.changetime(medicalRescueVo)
      // 文件信息
      let upLoadPathIds = []
      if (medicalRescueVo.address_Linkage) {
        medicalRescueVo.province = medicalRescueVo.address_Linkage[0]
        medicalRescueVo.city = medicalRescueVo.address_Linkage[1]
        medicalRescueVo.county = medicalRescueVo.address_Linkage[2]
        delete medicalRescueVo.address_Linkage
      }
      let fileids = [
        ...this.fileListImg,
        ...this.fileListCard,
        ...this.fileListFile,
        ...this.incomeList,
        ...this.diBaoList
      ]
      fileids.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      medicalRescueVo.upLoadPathId = upLoadPathIds

      MedicalApplyVo.medicalRescueVo = medicalRescueVo
      return MedicalApplyVo
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
      }
    },
    // 提交---确定
    submit () {
      let isok = true
      this.cptAdoptorFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        let collectionObj = this.medicalRescueVoOld
        let formData = this.cptAdoptorFrom.getFieldsValue()
        delete formData.address_Linkage
        // 未显示其他原因时添加患艾滋病其他原因字段用做遍历控制显隐
        let oldObj = {} // 变更前展示的对象
        let newObj = {} // 变更后展示的对象
        let changeAttr = [] // 变更数据存放的数组
        let beforeChangeFieldInfo = {}
        let afterChangeFieldInfo = {}
        let fieldComparison = {}
        let form = {}
        let areaShow = false // 判断省市县是否显示
        let k1 = Object.keys(formData)
        let k2 = Object.keys(collectionObj)
        form = {
          rescueDiseaseType: formData.rescueDiseaseType,
          rescueDiseaseName: formData.rescueDiseaseName,
          childIdentityType: formData.childIdentityType,
          contact: formData.contact,
          contactTelephone: formData.contactTelephone,
          whetherAddmedicalInsurance: formData.whetherAddmedicalInsurance
        }
        if (this.qtsf == true) {
          form.familyAverageAnnualIncome = formData.familyAverageAnnualIncome
          form.familyExplain = formData.familyExplain
        }
        let klist = { ...form, ...collectionObj }
        for (var k in form) {
          let changeObj = {}
          let beforeChange = {}
          let afterChange = {}
          let comparisonChange = {}
          if (this[`${k}Visible`]) {
            this[`${k}Visible`][0] = false
          }

          if (form[k] == '' || form[k] == undefined) {
            // 针对原有null值，编辑后再次清空为''的情况处理
            // form[k] = null
          }
          if (form[k] != collectionObj[k] && k != 'changeReason') {
            // 除变更原因之外的变更
            this.editVisible = true // 变更弹窗显示
            // 后台接口所需参数处理 start
            if (
              k == 'intoCivilAdministrationDate' ||
              k == 'intoOrgDate' ||
              k == 'applyDate'
            ) {
            } else {
              afterChange[k] = form[k]
              beforeChange['copy_' + `${k}`] = collectionObj[k]
            }

            if (this[`${k}Visible`]) {
              comparisonChange[k] =
                k == 'province'
                  ? '省'
                  : k == 'city'
                    ? '市'
                    : k == 'county'
                      ? '县'
                      : this[`${k}Visible`][1]
            }

            // comparisonChange[k] = k
            // 后台接口所需参数处理 end

            // 赋值给变更前后需展示的对象
            oldObj[k] = collectionObj[k]
            newObj[k] = form[k]
            // 除区划外的处理（显示dom）
            if (k != 'province' || k != 'city' || k != 'county') {
              if (this[`${k}Visible`]) {
                this[`${k}Visible`][0] = true
              }
            }
            beforeChangeFieldInfo['copy_' + `${k}`] =
              beforeChange['copy_' + `${k}`]
            afterChangeFieldInfo[k] = afterChange[`${k}`]
            fieldComparison[k] = comparisonChange[`${k}`]
            changeAttr.push(changeObj) // 后台接口提交时需要的数据
          } else if (
            k != 'province' &&
            k != 'city' &&
            k != 'county' &&
            k != 'changeReason'
          ) {
            // 区划外未变更的隐藏dom
            if (this[`${k}Visible`]) {
              this[`${k}Visible`][0] = false
            }
          }
        }
        var arr = Object.keys(afterChangeFieldInfo)
        if (arr.length > 0) {
          this.medicalRescueApplyChangeVo = {
            medicalRescueApplyId: this.medicalRescueVoOld.id,
            id: this.id
          }
          this.medicalRescueApplyChangeVo.beforeChangeFieldInfo = JSON.stringify(
            beforeChangeFieldInfo
          )
          this.medicalRescueApplyChangeVo.afterChangeFieldInfo = JSON.stringify(
            afterChangeFieldInfo
          )
          this.medicalRescueApplyChangeVo.fieldComparison = JSON.stringify(
            fieldComparison
          )
          // 变更弹窗除区划外的其他数据的赋值，并调整样式
          this.$nextTick(() => {
            let formData = {
              ...afterChangeFieldInfo,
              ...beforeChangeFieldInfo,
              ...form
            }
            formData.changeReason = this.cptAdoptorFrom.getFieldsValue().changeReason
            this.oldform.setFieldsValue(formData)
          })
        } else {
          this.$message.error('没有数据变更！')
        }
      } else {
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
    },
    handleOkRevoke (val) {
      if (val == '0') {
        // let form = this.cptAdoptorFrom.getFieldsValue()
        // delete form.address_Linkage
        // for (var k in form) {
        //   this[`${k}Visible`][0] = false
        // }
        this.editVisible = false
      } else if (val == '1') {
        this.medicalRescueApplyChangeVo.changeReason = this.cptAdoptorFrom.getFieldsValue().changeReason
        let url
        let text
        if (this.goType == '1') {
          url = '/medicalRescueApplyChange/save'
          text = '信息提交成功！'
        } else if (this.goType == '3') {
          // this.medicalRescueApplyChangeVo.id = JSON.parse(this.$route.query.obj).id
          url = '/medicalRescueApplyChange/update'
          text = '信息修改成功！'
        }
        this.post(url, this.medicalRescueApplyChangeVo, true).then(res => {
          if (res.serviceSuccess) {
            this.$message.success(text)
            // this.form.resetFields()
            this.oldform.resetFields()
            // this.newform.resetFields()
            this.editVisible = false
            this.back()
          }
        })
      }
    },
    // async returnGo () {
    //   let params = {}
    //   params.id = this.workflowId
    //   this.post('/medicalRescueApplyChangeAudit/revoke', params).then(res => {
    //     if (res.errors == null) {
    //       this.$message.success(res.data.success)
    //       this.visible = false
    //       this.back()
    //     }
    //   })
    // },
    // 获取详情
    async getDetails () {
      let params = {}
      let url = ''
      let data
      let obj
      if (this.goType == '1' || this.goType == '3') {
        // 申请记录--编辑
        url = '/medicalRescueApplyChange/queryByMedicalRescueApplyId'
        if (this.goType == '3') {
          params.curFlowId = this.curFlowId
          params.medicalRescueApplyId = this.medicalRescueApplyId
        }
        if (this.goType == '1') {
          params.medicalRescueApplyId = this.id
        }
        // params.medicalRescueApplyId = this.medicalRescueApplyId
        data = await this.post(url, params)
        if (data.serviceSuccess == true) {
          obj = data.data.data
          // 儿童基本信息赋值
          let medicalRescueApplyChildInfoVo = obj.medicalRescueApplyChildInfoVo || {}
          medicalRescueApplyChildInfoVo.birthday = moment(
            medicalRescueApplyChildInfoVo.birthday
          )
          if (
            medicalRescueApplyChildInfoVo.addChildDate == '' ||
            medicalRescueApplyChildInfoVo.addChildDate == null
          ) {
            delete medicalRescueApplyChildInfoVo.addChildDate
          } else {
            medicalRescueApplyChildInfoVo.addChildDate = moment(
              medicalRescueApplyChildInfoVo.addChildDate
            )
          }
          let illnessArr = medicalRescueApplyChildInfoVo.illnessType
          medicalRescueApplyChildInfoVo.illnessType = illnessArr ? illnessArr.split(',') : []
          let arr = []
          arr.push(
            medicalRescueApplyChildInfoVo.province,
            medicalRescueApplyChildInfoVo.city,
            medicalRescueApplyChildInfoVo.county
          )
          this.addressmodel = [...arr]
          // 医疗基本信息赋值
          let medicalRescueVo = obj.medicalRescueVo
          if (medicalRescueVo.intoCivilAdministrationDate) {
            medicalRescueVo.intoCivilAdministrationDate = moment(
              medicalRescueVo.intoCivilAdministrationDate
            )
          }
          if (medicalRescueVo.intoOrgDate) {
            medicalRescueVo.intoOrgDate = moment(medicalRescueVo.intoOrgDate)
          }
          // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().orgName
          medicalRescueVo.applyDate = moment(medicalRescueVo.applyDate)
          let arrAddress = []
          arrAddress.push(
            medicalRescueVo.province,
            medicalRescueVo.city,
            medicalRescueVo.county
          )
          this.addressmodel2 = [...arrAddress]
          this.childBaseId = medicalRescueVo.childBaseId
          this.medicalId = medicalRescueVo.id
          this.orgId = medicalRescueVo.orgId
          let filePathVos = JSON.parse(medicalRescueVo.filePathVos)
          filePathVos.map(item => {
            if (item.functionType == 'f1') {
              this.fileListImg.push(item)
            } else if (item.functionType == 'f2') {
              this.fileListCard.push(item)
            } else if (item.functionType == 'f0') {
              this.fileListFile.push(item)
            } else if (item.functionType == 'f3') {
              this.incomeList.push(item)
            } else if (item.functionType == 'f4') {
              this.diBaoList.push(item)
            }
          })
          if (
            obj.medicalRescueGuardianVos != null &&
            obj.medicalRescueGuardianVos.length > 0
          ) {
            this.guardianArray = []
            let medicalRescueGuardianVos = obj.medicalRescueGuardianVos
            medicalRescueGuardianVos.map((item, index) => {
              this.guardianArray.push(index)
              this.addreslistsmodel[index] = []
              this.$nextTick(() => {
                if (item.county && item.province && item.city) {
                  let arr = []
                  arr.push(item.province, item.city, item.county)
                  this.$set(this.addreslistsmodel, index, arr)
                }
                item = {
                  [`detail${index}`]: item.detail,
                  [`birthday${index}`]: moment(item.birthday),
                  [`contactNumber${index}`]: item.contactNumber,
                  [`guardian${index}`]: item.guardian,
                  [`idCard${index}`]: item.idCard,
                  [`idcardType${index}`]: item.idcardType,
                  [`relationship${index}`]: item.relationship,
                  [`sex${index}`]: item.sex
                }
                medicalRescueVo = { ...item, ...medicalRescueVo }
              })
            })
          } else if (
            obj.medicalRescueGuardianVos == [] ||
            obj.medicalRescueGuardianVos == null
          ) {
            if (this.goType == '2') {
              this.guardianArray = [1]
            } else {
              this.guardianArray = []
            }
          }
          // 残疾类型赋值
          medicalRescueApplyChildInfoVo.disabilityType = medicalRescueApplyChildInfoVo.disabilityType ? medicalRescueApplyChildInfoVo.disabilityType.split(',') : []
          this.$nextTick(() => {
            this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
            this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
          })
          this.medicalRescueVoOld = medicalRescueVo
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this.setHeight('one', 'oneout')
            this.setHeight('two', 'twoout')
          }, 1000)
        })
      }
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      this.cptAdoptorFrom.setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    actualAddress (values) {
      this.cptAdoptorFrom.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
      })
    },
    clickSearch () {
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
      })
    },
    // 撤回弹框打开
    returnInfo () {
      this.visible = true
      this.$nextTick(() => {
        // this.form.resetFields()
      })
    },
    onCloseCanle () {
      this.editVisible = false
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      let codeType = ''
      let orgType = window.parent.indexTool.getUserInfo().orgType
      if (orgType == '99') {
        codeType = 'CHILDCATEGORYF'
        this.qtsf = false
        this.guardianArray = []
      }
      if (orgType != '98' && orgType != '99') {
        codeType = 'CHILDCATEGORYM'
        this.qtsf = true
      }
      this.post('codetable/getCode', { codeType: codeType }).then(res => {
        if (res.serviceSuccess) {
          this.childcategoryaList = res.data.codeList
        }
      })
    },
    //  儿童身份类型
    async getchildidentitytypeList () {
      await this.getDictionaries('CHILDIDENTITYTYPE').then(res => {
        let data = res
        let orgType = window.parent.indexTool.getUserInfo().orgType
        if (orgType == '99') {
          data.map((item, index) => {
            if (item.value == '1') {
              this.childidentitytypeList.push(item)
            }
          })
          this.cptAdoptorFrom.setFieldsValue({
            childIdentityType: '1'
          })
          this.disabledSel = true
        } else if (orgType != '98' && orgType != '99') {
          data.map((item, index) => {
            if (item.value != '1') {
              this.childidentitytypeList.push(item)
            }
          })

          if (this.goType == '4' || this.goType == '5' || this.goType == '6') {
            this.disabledSel = true
          } else {
            this.disabledSel = false
          }
        } else {
          this.childidentitytypeList = data
          this.disabledSel = true
        }
      })
    },
    // 与儿童关系
    async getRelationList () {
      let data = await this.getDictionaries('RELATION')
      this.relationList = data
    },
    //  证件类型
    async getIdcardList () {
      let data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardList = data
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },

    // 残疾等级
    async getdisabilitylevelList () {
      let data = await this.getDictionaries('DISABILITYLEVEL')
      this.disabilitylevelList = data
    },
    // 户籍性质
    async getcensusregisterList () {
      let data = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // 救治病种类型
    async getdiseasetypeList () {
      let data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },
    // 是否
    async getyesnoList () {
      let data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    }
    // 儿童身份类型
    // async getchildidentitytypeList () {
    //   let data = await this.getDictionaries('CHILDIDENTITYTYPE')
    //   this.childidentitytypeList = data
    // }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin: 0 20px 0 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
}

.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 83%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.fromintop {
  margin: 0px 0 0 5px 0;
  position: relative;
}
.equally {
  position: absolute;
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;
}
.fromin {
  width: calc(100% - 60px);
  margin-left: 60px;
  margin-top: 20px;
}
.frominadd {
  margin-top: 0;
}
.radio_grops {
  width: 100%;
}
.apply {
  position: absolute;
  top: 20px;
  right: 140px;
}
</style>
