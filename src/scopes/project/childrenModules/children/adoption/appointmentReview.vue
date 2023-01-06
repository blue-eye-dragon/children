<template>
  <div class="conts tadrawer"
       @click="allvalidator">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="收养人基本信息"
                     key="1"
                     :forceRender="true">
          <ta-tabs class="fromcom"
                   @change="chs"
                   :activeKey="adoptionTabKey"
                   type="card"
                   ref="two">
            <ta-tab-pane tab="男方单独收养"
                         key="1"
                         :forceRender="true">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.cptAdoptorFrom1 = form}">
                <AdoptionAlone @setdate="setdate"
                               :basedisabled="basedisabled"
                               @setaddress="setaddress2"
                               @setheath="setheath2"
                               :heathmodel="heathmodel2"
                               :addressmodel="addressmodel2"
                               :sexList="sexList"
                               :nationList="nationList"
                               :healthList="healthList"
                               :cultureList="cultureList"
                               :identityList="identityList"
                               :marriageyList="marriageyList"
                               :nationalityList="nationalityList"
                               :occupattioList="occupattioList"
                               :idcardTypeList="idcardTypeList"
                               :familyincomeList="familyincomeList"></AdoptionAlone>
              </ta-form>
            </ta-tab-pane>
            <ta-tab-pane tab="女方单独收养"
                         key="2"
                         :forceRender="true">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.cptAdoptorFrom2 = form}">
                <AdoptionAlone @setheath="setheath2"
                               :heathmodel="heathmodel2"
                               @setdate="setdate"
                               :basedisabled="basedisabled"
                               @setaddress="setaddress2"
                               :addressmodel="addressmodel2"
                               :sexList="sexList"
                               :nationList="nationList"
                               :healthList="healthList"
                               :cultureList="cultureList"
                               :identityList="identityList"
                               :marriageyList="marriageyList"
                               :nationalityList="nationalityList"
                               :occupattioList="occupattioList"
                               :idcardTypeList="idcardTypeList"
                               :familyincomeList="familyincomeList"></AdoptionAlone>
              </ta-form>
            </ta-tab-pane>
            <ta-tab-pane tab="夫妻双方共同收养"
                         key="3"
                         :forceRender="true">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.cptAdoptorFrom3 = form}">
                <JointAdoption @mensetheath="mensetheath"
                               @womensetheath="womensetheath"
                               :menheathmodel="menheathmodel"
                               :womenheathmodel="womenheathmodel"
                               @setmendate="setmendate"
                               :basedisabled="basedisabled"
                               @mensetaddress="mensetaddress"
                               @womensetaddress="womensetaddress"
                               :menaddressmodel="menaddressmodel"
                               :womenaddressmodel.sync="womenaddressmodel"
                               :applytype.sync="applytype"
                               :sexList="sexList"
                               :nationList="nationList"
                               :healthList="healthList"
                               :cultureList="cultureList"
                               :identityList="identityList"
                               :marriageyList="marriageyList"
                               :nationalityList="nationalityList"
                               :occupattioList="occupattioList"
                               :idcardTypeList="idcardTypeList"
                               :familyincomeList="familyincomeList"
                               :issameaddress.sync="issameaddress"></JointAdoption>
              </ta-form>
            </ta-tab-pane>
          </ta-tabs>
          <ta-divider />
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.otherForm = form}">
            <OtherInfo :basedisabled="basedisabled"></OtherInfo>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="家庭子女信息"
                     key="2"
                     :forceRender="true">
          <Family :basedisabled="basedisabled"
                  :adoptorChildrenVos="adoptorChildrenVos"
                  :adoptionTabKey="adoptionTabKey"
                  :childrensParentSituationList="childrensParentSituationList"
                  :eelationsApplicantsList="eelationsApplicantsList"
                  :sexList="sexList"
                  :cultureList="cultureList"
                  :nationList="nationList"
                  :nationalityList="nationalityList"
                  :healthList="healthList"
                  :occupattioList="occupattioList"></Family>
        </ta-tab-pane>
        <ta-tab-pane tab="被收养儿童信息"
                     key="3"
                     :forceRender="true">
          <div>
            <ta-form :autoFormCreate="(form)=>{this.form = form}"
                     layout="horizontal">
              <ta-col :span="24">
                <ta-form-item label="收养类别:"
                              class="fromwid"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              :require="{message:'请选择!'}">
                  <ta-select v-model="childtype"
                             class="selectwid"
                             :disabled="basedisabled">
                    <ta-select-option v-for="(item,index) in adoptionlist"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
            </ta-form>
          </div>
          <div class="mars">
            <ta-form layout="horizontal"
                     ref="one"
                     :autoFormCreate="(form)=>{this.adoptedFrom = form}">
              <CptAdopted :id="id"
                          :basedisabled="basedisabled"
                          @setaddress="setaddress"
                          :addressmodel="addressmodel"
                          :childtype="childtype"
                          :sexList="sexList"
                          :nationList="nationList"
                          :healthList="healthList"
                          :heathlist="heathlist"
                          :cultureList="cultureList"
                          :disabiliytypelist="disabiliytypelist"
                          :adoptionlist="adoptionlist"
                          :nationalityList="nationalityList"
                          :marriageyList="marriageyList"
                          :occupattioList="occupattioList"
                          :canjileave="canjileave"
                          :isDisabled="isDisabled"
                          :typesadopteestatusList="typesadopteestatusList"></CptAdopted>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="资料上传"
                     key="4"
                     :forceRender="true">
          <FileUpload :fileList.sync="fileList"
                      :filedisabled="basedisabled"
                      :adoptionfileList.sync="adoptionfileList"
                      :adopterfileList.sync="adopterfileList"></FileUpload>
        </ta-tab-pane>
        <ta-tab-pane tab="预约申请信息"
                     key="5"
                     :forceRender="true">
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.appointmentForm = form}">
            <AppointmentApply :basedisabled="basedisabled"
                              :addressmodel="applyaddressmodel"
                              @setaddress="applysetaddress"></AppointmentApply>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click.stop="backs">返回</ta-button>
      <ta-button type="primary"
                 class="preservation btnleft"
                 @click.stop="submit('0')"
                 v-if="this.flag!='look'">通过</ta-button>
      <ta-button type="danger"
                 class="preservation btnleft"
                 @click.stop="submit('1')"
                 v-if="this.flag!='look'">驳回</ta-button>
    </div>
    <ta-modal title="驳回信息"
              v-model="visible"
              width="800px"
              @ok="handleOk"
              @cancel="handleCancel">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal"
               style="height: 120px;">
        <ta-col :span="24">
          <ta-form-item label="驳回原因"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="rejectReason"
                        :fieldDecoratorOptions="verificationRulesNotMustFill('驳回原因',60,true)">
            <ta-textarea :placeholder="'驳回原因'"
                         :rows="4"
                         :disabled="false" />
          </ta-form-item>
        </ta-col>

      </ta-form>
    </ta-modal>
  </div>
</template>
<script>
import AdoptionAlone from './components/adoptionAlone'
import CptAdopted from './components/cptAdopted'
import JointAdoption from './components/jointAdoption'
import OtherInfo from '../adoptionassessment/evaluationmanagement/components/otherInfo'
import Family from './components/family'
import AppointmentApply from './components/appointmentApply'
import FileUpload from './components/fileUpload'
import moment from 'moment'
export default {
  name: 'register',
  components: {
    AdoptionAlone,
    JointAdoption,
    OtherInfo,
    Family,
    CptAdopted,
    AppointmentApply,
    FileUpload
  },
  data () {
    return {
      disabiliytypelist: [],
      canjileave: [],
      nowkey: '1',
      adoptionTabKey: '1',
      basedisabled: true,
      isDisabled: false,
      visible: false,
      childrensParentSituationList: [],
      nowformname: 'cptAdoptorFrom1', // 当前男方、女方、夫妻共同收养的form名称
      addressmodel: [], // 被收养人地址
      heathmodel2: [], // 男方女方健康状况
      addressmodel2: [], // 男方女方地址
      menheathmodel: [], // 夫妻共同中男方健康状况
      womenheathmodel: [], // 夫妻共同中女方健康状况
      applytype: '1', // 夫妻共同中是否是男方（0不是，1是）
      menaddressmodel: [], // 夫妻共同中男方地址
      womenaddressmodel: [], // 夫妻共同中女方地址
      issameaddress: '0', // 夫妻共同中地址是否一致
      applyaddressmodel: [], // 预约申请地址
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      heathlist: [],
      healthList: [], // 健康状况字典数据
      cultureList: [], // 文化字典数据
      identityList: [], // 身份类别字典数据
      nationalityList: [], // 国籍字典数据
      marriageyList: [], // 婚姻字典数据
      occupattioList: [], // 职业字典数据
      idcardTypeList: [], // 证件类型字典数据
      relationsadopteesList: [], // 与被收养人关系字典数据
      eelationsApplicantsList: [], // 与申请人关系字典数据
      familyincomeList: [], // 家庭收入字典数据
      adoptionlist: [], // 收养类别字典数据
      typesadopteestatusList: [], // 三代以内被收养人身份类别

      adoptorChildrenVos: [], // 家庭子女信息vo
      childtype: '', // 收养类别选择的数据
      isvalidator: false,

      // 文件上传
      fileList: [], // 送养人的附件
      adoptionfileList: [], // 收养人的附件
      adopterfileList: [], // 被收养人的附件
      flag: '', // 列表跳转过来传的标识符
      id: '' // 列表跳转过了=来传的id
    }
  },
  activated () {
    this.loadData()
  },
  mounted () {
    this.getsex()
    this.getParentsInfo()
    this.getnation()
    this.getHealth()
    this.getCulture()
    this.getIdentity()
    this.getnationality()
    this.getmarriage()
    this.getOccupattion()
    this.getIdcardtype()
    this.getRelationsadoptees()
    this.getRelationsApplicants()
    // this.getmechanismList()
    this.gettypesadopteestatus()
    this.getfamilyincome()
    this.getdisabiliytype()
    this.getleave()
    this.getheathio()
    this.getchildtype()
  },
  methods: {
    isDisabledtype (val) {
      this.isDisabled = val
    },
    // 健康狀況
    async getheathio () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.disabiliytypelist = data.data.codeList
    },
    // DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    loadData () {
      this.nowkey = '1'
      this.visible = false
      this.isvalidator = false
      this.fileList = []
      this.adoptionfileList = []
      this.adopterfileList = []
      this.assessmentFileList = []
      this.fuseFileList = []
      this.adoptionTabKey = '1'
      this.basedisabled = true
      this.cptAdoptorFrom1.resetFields()
      this.cptAdoptorFrom2.resetFields()
      this.cptAdoptorFrom3.resetFields()
      this.adoptorChildrenVos = []
      this.adoptedFrom.resetFields()
      this.$nextTick(() => {
        this.adoptedFrom.setFieldsValue({
          identityCategory: this.childtype
        })
      })

      this.flag = this.$route.query.flag
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        this.post('/adoptionAppointment/query', { id: this.id, registrationAdoptionId: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            this.applicantType = data.adoptionAppointment ? data.adoptionAppointment.applicantType : null

            // 收养人基本信息
            if (data.adoptionAppointment && (data.adoptionAppointment.applicantType == '1' || data.adoptionAppointment.applicantType == '2')) { // 男方或女方
              this.adoptionTabKey = data.adoptionAppointment.applicantType
              this.nowformname = 'cptAdoptorFrom' + this.adoptionTabKey
              //   let cptAdoptorFrom = data.adopterList && data.adopterList.l
              const cptAdoptorFrom = data.adopterList && data.adopterList.length > 0 ? data.adopterList[0] : {}
              cptAdoptorFrom.birthday = cptAdoptorFrom.birthday ? moment(cptAdoptorFrom.birthday) : null
              this.heathmodel2 = cptAdoptorFrom.healthCondition ? cptAdoptorFrom.healthCondition.split(',') : []
              delete cptAdoptorFrom.healthCondition
              cptAdoptorFrom.familyIncome = data.adoptionAppointment ? data.adoptionAppointment.familyIncome : '' // 年收入
              this.$nextTick(() => {
                this[this.nowformname].setFieldsValue(cptAdoptorFrom)
              })

              this.addressmodel2 = [
                cptAdoptorFrom.censusRegisterPro ? cptAdoptorFrom.censusRegisterPro : '',
                cptAdoptorFrom.censusRegisterCity ? cptAdoptorFrom.censusRegisterCity : '',
                cptAdoptorFrom.censusRegisterCounty ? cptAdoptorFrom.censusRegisterCounty : '',
                cptAdoptorFrom.censusRegisterTown ? cptAdoptorFrom.censusRegisterTown : '',
                cptAdoptorFrom.censusRegisterVillage ? cptAdoptorFrom.censusRegisterVillage : ''
              ]
            } else if (data.adoptionAppointment && data.adoptionAppointment.applicantType == '3') { // 夫妻共同收养
              this.adoptionTabKey = data.adoptionAppointment.applicantType
              const address = []
              if (data.adopterList && data.adopterList.length > 1) {
                const objs = data.adopterList[0]
                const objs1 = data.adopterList[1]

                if (data.adopterList[0].sex == this.Enum.SEX.NAN) { // 第一条是男方
                  // 设置主申请人
                  if (objs.isApplicant == '1') {
                    this.applytype = '1'
                  } else {
                    this.applytype = '0'
                  }
                  // 男方赋值
                  objs.birthday = objs.birthday ? moment(objs.birthday) : null
                  this.menheathmodel = objs.healthCondition ? objs.healthCondition.split(',') : []
                  this.menaddressmodel = address
                  this.$nextTick(() => {
                    delete objs.healthCondition
                    this.cptAdoptorFrom3.setFieldsValue(objs)
                  })
                  this.menaddressmodel = [
                    objs.censusRegisterPro ? objs.censusRegisterPro : '',
                    objs.censusRegisterCity ? objs.censusRegisterCity : '',
                    objs.censusRegisterCounty ? objs.censusRegisterCounty : '',
                    objs.censusRegisterTown ? objs.censusRegisterTown : '',
                    objs.censusRegisterVillage ? objs.censusRegisterVillage : ''
                  ]
                  // 女方赋值
                  objs1.birthday = objs1.birthday ? moment(objs1.birthday) : null
                  this.womenheathmodel = objs1.healthCondition ? objs1.healthCondition.split(',') : []
                  for (var k in objs1) {
                    objs1['copy_' + k] = objs1[k]
                    delete objs1[k]
                  }
                  this.$nextTick(() => {
                    delete objs1.copy_healthCondition
                    this.cptAdoptorFrom3.setFieldsValue(objs1)
                  })
                  if (data.adoptionAppointment && data.adoptionAppointment.isAddressEqual == '1') { // 地址相等
                    this.womenaddressmodel = this.menaddressmodel
                  } else {
                    this.womenaddressmodel = [
                      objs1.censusRegisterPro ? objs1.censusRegisterPro : '',
                      objs1.censusRegisterCity ? objs1.censusRegisterCity : '',
                      objs1.censusRegisterCounty ? objs1.censusRegisterCounty : '',
                      objs1.censusRegisterTown ? objs1.censusRegisterTown : '',
                      objs1.censusRegisterVillage ? objs1.censusRegisterVillage : ''
                    ]
                  }
                } else { // 第一条是女方
                  // 设置主申请人
                  if (objs.isApplicant == '1') {
                    this.applytype = '0'
                  } else {
                    this.applytype = '1'
                  }
                  // 男方赋值
                  objs1.birthday = objs1.birthday ? moment(objs1.birthday) : null
                  this.menheathmodel = objs1.healthCondition ? objs1.healthCondition.split(',') : []
                  this.menaddressmodel = address
                  this.$nextTick(() => {
                    delete objs1.healthCondition
                    this.cptAdoptorFrom3.setFieldsValue(objs1)
                  })
                  this.menaddressmodel = [
                    objs.censusRegisterPro ? objs.censusRegisterPro : '',
                    objs.censusRegisterCity ? objs.censusRegisterCity : '',
                    objs.censusRegisterCounty ? objs.censusRegisterCounty : '',
                    objs.censusRegisterTown ? objs.censusRegisterTown : '',
                    objs.censusRegisterVillage ? objs.censusRegisterVillage : ''
                  ]
                  // 女方赋值
                  objs.birthday = objs.birthday ? moment(objs.birthday) : null
                  this.womenheathmodel = objs.healthCondition ? objs.healthCondition.split(',') : []
                  for (var j in objs) {
                    objs['copy_' + j] = objs[j]
                    delete objs[j]
                  }
                  this.$nextTick(() => {
                    delete objs.copy_healthCondition
                    this.cptAdoptorFrom3.setFieldsValue(objs)
                  })
                  if (data.adoptionAppointment && data.adoptionAppointment.isAddressEqual == '1') { // 地址相等
                    this.womenaddressmodel = this.menaddressmodel
                  } else {
                    this.womenaddressmodel = [
                      objs.censusRegisterPro ? objs.censusRegisterPro : '',
                      objs.censusRegisterCity ? objs.censusRegisterCity : '',
                      objs.censusRegisterCounty ? objs.censusRegisterCounty : '',
                      objs.censusRegisterTown ? objs.censusRegisterTown : '',
                      objs.censusRegisterVillage ? objs.censusRegisterVillage : ''
                    ]
                  }
                }
              }
              this.$nextTick(() => {
                this.cptAdoptorFrom3.setFieldsValue({
                  familyIncome: data.adoptionAppointment.familyIncome,
                  sameAddress: data.adoptionAppointment.isAddressEqual
                })
              })
            }
            this.otherForm.setFieldsValue(data.adoptionAppointment)
            // 家庭子女信息赋值
            // 证件类型为null时默认设为内地居民身份证
            let familyMemberList = data.familyMemberList || []
            familyMemberList.forEach(element => {
              if (!element.memberIdType) element.memberIdType = this.Enum.IDCARD_TYPE.NDJMSFZ
            });
            this.adoptorChildrenVos = familyMemberList
            // 被收养儿童信息赋值
            let { readyAdoptionChildrenVo } = data
            if (readyAdoptionChildrenVo) {
              // 身份类别处理
              readyAdoptionChildrenVo.identityCategory = readyAdoptionChildrenVo.adoptionType;
              this.childtype = readyAdoptionChildrenVo.adoptionType;
              readyAdoptionChildrenVo.birthday = readyAdoptionChildrenVo.birthday ? moment(readyAdoptionChildrenVo.birthday) : null;
              readyAdoptionChildrenVo.enterDate = readyAdoptionChildrenVo.enterDate ? moment(readyAdoptionChildrenVo.enterDate) : null;
              readyAdoptionChildrenVo.pickupDate = readyAdoptionChildrenVo.pickupDate ? moment(readyAdoptionChildrenVo.pickupDate) : null;
              readyAdoptionChildrenVo.publishDate = readyAdoptionChildrenVo.publishDate ? moment(readyAdoptionChildrenVo.publishDate) : null;
              readyAdoptionChildrenVo.healthCondition = readyAdoptionChildrenVo.health;
              readyAdoptionChildrenVo.educationLevel = readyAdoptionChildrenVo.educationLevel || readyAdoptionChildrenVo.degreeOfEducation;
              readyAdoptionChildrenVo.censusRegisterDetail = readyAdoptionChildrenVo.addrDetaile;
              readyAdoptionChildrenVo.welfareInstitutionName = readyAdoptionChildrenVo.welfareInstitution;
              this.$nextTick(() => {
                this.adoptedFrom.setFieldsValue(readyAdoptionChildrenVo)
              })
              this.addressmodel = [
                readyAdoptionChildrenVo.province ? readyAdoptionChildrenVo.province : '',
                readyAdoptionChildrenVo.city ? readyAdoptionChildrenVo.city : '',
                readyAdoptionChildrenVo.country ? readyAdoptionChildrenVo.country : '',
                readyAdoptionChildrenVo.town ? readyAdoptionChildrenVo.town : ''
              ]
            }
            // 资料上传赋值
            if (data.filePathVos) {
              JSON.parse(data.filePathVos).forEach((item, index) => {
                switch (item.busiType) {
                  case '1':// 送养人相关证件
                    this.fileList.push(item)
                    break
                  case '2':// 收养人相关证件
                    this.adoptionfileList.push(item)
                    break
                  case '11':// 被收养人相关证件
                    this.adopterfileList.push(item)
                    break
                }
              })
            }
            // 预约申请信息赋值
            if (data.appointments) {
              this.appointmentForm.setFieldsValue(data.appointments)
              this.applyaddressmodel = [
                data.appointments.businessAreaPro ? data.appointments.businessAreaPro : '',
                data.appointments.businessAreaCity ? data.appointments.businessAreaCity : '',
                data.appointments.businessAreaCounty ? data.appointments.businessAreaCounty : ''
              ]
            }
          }
        })
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    // 提交
    async submit (e) {
      if (e == '0') { // 通过
        this.post('/adoptionAppointment/approve', { auditStatus: '2', id: this.id }, true).then((res) => {
          if (res.serviceSuccess) {
            this.$message.success('信息已通过')
            this.backs()
          }
        })
      } else {
        this.visible = true
      }
    },
    // 弹窗确定
    handleOk () {
      this.post('/adoptionAppointment/approve', { auditStatus: '5', id: this.id, rejectReason: this.form.getFieldsValue().rejectReason }, true).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('信息已驳回')
          this.form.resetFields()
          this.visible = false
          this.backs()
        }
      })
    },
    // 弹窗取消
    handleCancel () {
      this.form.resetFields()
      this.visible = false
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    // 收养tab切换
    chs (val) {
      // this.typeadoption = val
      this.adoptionTabKey = val
      this.nowformname = 'cptAdoptorFrom' + val
    },
    setmendate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowformname].setFieldsValue({
          copy_birthday: moment(val.birth)
        })
      } else {
        this[this.nowformname].setFieldsValue({
          birthday: moment(val.birth)
        })
      }
    },
    setdate (val) {
      if (!this.isvalidator) {
        return false
      }
      this[this.nowformname].setFieldsValue({
        birthday: moment(val.birth)
      })
    },
    // 预约申请地址传值
    applysetaddress () {
      this.appointmentForm.setFieldsValue({
        address_Linkage: this.applyaddressmodel
      })
    },
    // 被收养人地址传值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 男方、女方地址传值
    setaddress2 () {
      this[this.nowformname].setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    // 男方、女方健康传值
    setheath2 () {
      this[this.nowformname].setFieldsValue({
        healthCondition: this.heathmodel2
      })
    },
    // 夫妻共同中男方地址传值
    mensetaddress () {
      this.cptAdoptorFrom3.setFieldsValue({
        address_Linkage: this.menaddressmodel
      })
    },
    // 夫妻共同中女方地址传值
    womensetaddress () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_address_Linkage: this.womenaddressmodel
      })
    },
    // 夫妻共同中男方健康传值
    mensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        healthCondition: this.menheathmodel
      })
    },
    // 夫妻共同中女方健康传值
    womensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_healthCondition: this.womenheathmodel
      })
    },
    // 获取收养类型 ADOPTIONCATEGORY
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // CHILDREN_PARENT_STITUATION 子女所属父母情况
    async getParentsInfo () {
      const data = await this.getDictionaries('CHILDREN_PARENT_STITUATION')
      this.childrensParentSituationList = data
    },
    // TYPESOFADOPTEESTATUS 三代以内被收养人身份类别 TYPESOFADOPTEESTATUS
    async gettypesadopteestatus () {
      const data = await this.getDictionaries('TYPESOFADOPTEESTATUS')
      this.typesadopteestatusList = data
    },
    // 民族
    async getnation () {
      const data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // HEALTH 健康状况
    async getHealth () {
      const data = await this.getDictionaries('HEALTH')
      this.healthList = data
    },
    // FAMILYINCOME 家庭收入
    async getfamilyincome () {
      const data = await this.getDictionaries('FAMILYINCOME')
      this.familyincomeList = data
    },
    // DEGREEEDUCATION 文化程度
    async getCulture () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // IDENTITCATEGORY 身份类别
    async getIdentity () {
      const data = await this.getDictionaries('IDENTITCATEGORY')
      this.identityList = data
    },
    // NATIONALITY 國籍
    async getnationality () {
      const data = await this.getDictionaries('NATIONALITY')
      this.nationalityList = data
    },
    // MARRIAGE 婚姻
    async getmarriage () {
      const data = await this.getDictionaries('MARRIAGE')
      this.marriageyList = data
    },
    // 职业 OCCUPATION
    async getOccupattion () {
      const data = await this.getDictionaries('OCCUPATION')
      this.occupattioList = data
    },
    // 证件类型 IDCARD_TYPE
    async getIdcardtype () {
      const data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardTypeList = data
    },
    // RELATIONSADOPTEES 与被收养人的关系
    async getRelationsadoptees () {
      const data = await this.getDictionaries('RELATIONSADOPTEES')
      this.relationsadopteesList = data
    },
    // RELATIONSAPPLICANTS 与申请人关系 FAMILYRELATIONS
    async getRelationsApplicants () {
      const data = await this.getDictionaries('FAMILYCHIDRELATIONSHIP')
      this.eelationsApplicantsList = data
    },
    backs () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.preservation {
  margin-left: 20px;
}

.fromwid {
  width: 424px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.selectwid {
  width: 324px;
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
</style>
