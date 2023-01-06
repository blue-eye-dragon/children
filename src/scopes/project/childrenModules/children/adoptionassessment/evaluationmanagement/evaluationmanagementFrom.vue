  <template>
  <div :class="evaluate=='yes'?'':'conts tadrawer'"
       @click="allvalidator">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="收养人基本信息"
                     key="1"
                     :forceRender="true">
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.maritalForm = form}">
            <ta-form-item label="收养人婚姻状况"
                          fieldDecoratorId="maritalType"
                          :labelCol="{span:6}"
                          style="width:700px"
                          :wrapperCol="{span:18}"
                          :require="{message:'请选择收养人婚姻状况'}">
              <!-- :initValue="this.Enum.IDCARD_TYPE.NDJMSFZ" -->
              <ta-radio-group @change="onChangeMarital"
                              :disabled="basedisabled"
                              v-model="maritalType">
                <ta-radio :value="item.value"
                          :disabled="item.value == '90'"
                          v-for="(item,index) in maritallist"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-form>
          <ta-tabs class="fromcom"
                   @change="chs"
                   :activeKey="adoptionTabKey"
                   type="line"
                   ref="two">
            <ta-tab-pane tab="男方单独收养"
                         :disabled="flag=='add'?(maritalType == '20' && childtype != 4):isHidden!=1"
                         key="1"
                         :forceRender="true">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.cptAdoptorFrom1 = form}">
                <AdoptionAlone @setdate="setdate"
                               :basedisabled="basedisabled"
                               @setaddress="setaddress2"
                               :isshow="true"
                               @setheath="setheath2"
                               :heathmodel="heathmodel2"
                               :formdata="adoptionformdata"
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
                         :disabled="flag=='add'?(maritalType == '20' && childtype != 4):isHidden!=2"
                         :forceRender="true">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.cptAdoptorFrom2 = form}">
                <AdoptionAlone @setheath="setheath2"
                               :heathmodel="heathmodel2"
                               :formdata="adoptionformdata"
                               @setdate="setdate"
                               :isshow="true"
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
                         :disabled="flag=='add'?maritalType != '20':isHidden!=3"
                         :forceRender="true">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.cptAdoptorFrom3 = form}">
                <JointAdoption @mensetheath="mensetheath"
                               @womensetheath="womensetheath"
                               :menheathmodel="menheathmodel"
                               :womenheathmodel="womenheathmodel"
                               :idAdopttype="idAdopttype"
                               @setmendate="setmendate"
                               :isshow="true"
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
                               :marriageyList1="marriageyList1"
                               :nationalityList="nationalityList"
                               :occupattioList="occupattioList"
                               :idcardTypeList="idcardTypeList"
                               :familyincomeList="familyincomeList"
                               :issameaddress.sync="issameaddress"></JointAdoption>
              </ta-form>
            </ta-tab-pane>
          </ta-tabs>
          <ta-divider style="margin-top: -56px;" />
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
                  @chaadoptorChildrenVos="chaadoptorChildrenVos"
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
                             @change="selectchange"
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
              <CptAdopted :basedisabled="basedisabled"
                          :istenyear.sync="istenyear"
                          @clearAdoptedFrom="clearAdoptedFrom"
                          @setFrom="setFrom"
                          @setaddress="setaddress"
                          :addressmodel="addressmodel"
                          @setheath="setheath"
                          :heathmodel="heathmodel"
                          :childtype="childtype"
                          :mechanismList.sync='mechanismList'
                          :sexList="sexList"
                          :nationList="nationList"
                          :healthList="healthList"
                          :cultureList="cultureList"
                          :adoptionlist="adoptionlist"
                          :nationalityList="nationalityList"
                          :marriageyList="marriageyList"
                          :occupattioList="occupattioList"
                          :typesadopteestatusList="typesadopteestatusList"
                          :heathlist="heathlist"
                          :heathval="heathval"
                          :disabiliytypelist="disabiliytypelist"
                          :serioushval="serioushval"
                          :canjileave="canjileave"
                          @onChange="onChange"
                          @seriousillnesschange="seriousillnesschange"
                          @setDataByName="setDataByName"
                          @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                          :isAdoptAdd="isAdoptAdd"
                          @clearIdCard="clearIdCard"
                          :adptFlag="adptFlag"
                          :isEvaluation="true"
                          ref="adoptedFrom"></CptAdopted>
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
        <ta-tab-pane tab="收养能力评估信息"
                     key="5"
                     :forceRender="true"
                     v-if="this.flag!='lookInfo'&&this.flag!='add'">
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.assessmentForm = form}">
            <AssessmentOrFuse :label="'评估'"
                              :flag="'1'"
                              :yesNoList="yesNoList"
                              :basedisabled="basedisabled"
                              ref="assessment"></AssessmentOrFuse>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="融合期调查信息"
                     key="6"
                     :forceRender="true"
                     v-if="this.flag!='lookInfo'&&this.flag!='add'">
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.fuseForm = form}">
            <AssessmentOrFuse :label="'融合'"
                              :basedisabled="basedisabled"
                              ref="fuse"></AssessmentOrFuse>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom"
         v-if="evaluate!='yes'">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <template>
        <ta-button type="primary"
                   class="preservation"
                   @click="submit"
                   v-if="this.flag!='lookInfo'&&this.flag!='look'">提交</ta-button>
      </template>
    </div>
  </div>
</template>
<script>
import AdoptionAlone from '../../adoption/components/adoptionAlone'
import CptAdopted from '../../adoption/components/cptAdopted'
import JointAdoption from '../../adoption/components/jointAdoption'
import OtherInfo from './components/otherInfo'
import Family from '../../adoption/components/family'
import AssessmentOrFuse from './components/assessmentOrFuse'
import FileUpload from '../../adoption/components/fileUpload'
import moment from 'moment'
export default {
  name: 'register',
  props: {
    evaluate: { type: String, require: false },
    goId: { type: String, require: false },
    bizId: { type: String, require: false }
  },
  components: {
    AdoptionAlone,
    JointAdoption,
    OtherInfo,
    Family,
    CptAdopted,
    AssessmentOrFuse,
    FileUpload
  },
  data () {
    return {
      adptFlag: '1', // adptFlag不为空，排除该福利机构下已送样的和做过收养登记的儿童信息
      heathlist: [],
      adoptionformdata: '01',
      heathval: '0',
      disabiliytypelist: [],
      idAdopttype: [],
      canjileave: [],
      isDisabled: true,
      serioushval: false,
      nowkey: '1',
      adoptionTabKey: '1',
      basedisabled: false,
      istenyear: false,
      childrensParentSituationList: [],
      nowformname: 'cptAdoptorFrom1', // 当前男方、女方、夫妻共同收养的form名称
      heathmodel: [], // 被收养人健康状况
      addressmodel: [], // 被收养人地址
      heathmodel2: [], // 男方女方健康状况
      addressmodel2: [], // 男方女方地址
      menheathmodel: [], // 夫妻共同中男方健康状况
      womenheathmodel: [], // 夫妻共同中女方健康状况
      applytype: '1', // 夫妻共同中是否是男方（0不是，1是）
      menaddressmodel: [], // 夫妻共同中男方地址
      womenaddressmodel: [], // 夫妻共同中女方地址
      issameaddress: '0', // 夫妻共同中地址是否一致
      mechanismList: [], // 福利机构名称字典数据
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      healthList: [], // 健康状况字典数据
      cultureList: [], // 文化字典数据
      identityList: [], // 身份类别字典数据
      nationalityList: [], // 国籍字典数据
      marriageyList: [], // 婚姻字典数据
      marriageyList1: [
        { label: '初婚', value: '21' },
        { label: '已婚', value: '20' },
        { label: '再婚', value: '22' },
        { label: '复婚', value: '23' }
      ],
      occupattioList: [], // 职业字典数据
      idcardTypeList: [], // 证件类型字典数据
      relationsadopteesList: [], // 与被收养人关系字典数据
      eelationsApplicantsList: [], // 与申请人关系字典数据
      familyincomeList: [], // 家庭收入字典数据
      adoptionlist: [], // 收养类别字典数据
      typesadopteestatusList: [], // 三代以内被收养人身份类别

      adoptorChildrenVos: [], // 家庭子女信息vo

      maritallist: [
        { label: '未婚', value: '10' },
        { label: '已婚', value: '20' },
        { label: '丧偶', value: '30' },
        { label: '离婚', value: '40' },
        { label: '未说明的婚姻情况', value: '90' }
      ],
      maritalType: '10',
      childtype: '', // 收养类别选择的数据
      isvalidator: false,
      isHidden: '',
      yesNoList: [],

      // 文件上传
      fileList: [], // 送养人的附件
      adoptionfileList: [], // 收养人的附件
      adopterfileList: [], // 被收养人的附件

      flag: '', // 列表跳转过来传的标识符
      id: '', // 列表跳转过了=来传的id
      childBaseId: '', // 儿童基本信息id
      isAdoptAdd: true, // 区分儿童基本信息数据是不是收养登记模块录入的
      applicantType: '', // 编辑查看时区分收养人的类型 1男2女3夫妻
      childNumber: null // 儿童编号
    }
  },
  activated () {
    this.loadData()
  },
  mounted () {
    this.getleave()
    this.getParentsInfo()
    this.getheathio()
    this.getHealth()
    this.getchildtype()
    this.getmechanismList()
    this.getsex()
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
    this.gettypesadopteestatus()
    this.getfamilyincome()
    this.getdit()
  },
  methods: {
    loadData () {
      this.issameaddress = '0'
      this.isHidden = null
      this.nowkey = '1'
      this.childNumber = null
      this.isAdoptAdd = true
      this.childtype = '1'
      this.maritalType = '10'
      this.applicantType = '1'
      this.isvalidator = false
      this.fileList = []
      this.adoptionfileList = []
      this.adopterfileList = []
      // this.$refs.assessment.fileList = []
      // this.$refs.fuse.fileList = []
      this.adoptionTabKey = '1'
      this.basedisabled = false
      this.flag = this.$route.query.flag
      if (this.flag != 'add' && this.flag != 'lookInfo' && this.flag != 'look') {
        this.$refs.assessment.fileList = []
        this.$refs.fuse.fileList = []
        this.fuseForm.resetFields()
      }

      this.adoptionTabKey = '1'
      this.basedisabled = false

      this.cptAdoptorFrom1.resetFields()
      this.cptAdoptorFrom2.resetFields()
      this.cptAdoptorFrom3.resetFields()
      this.otherForm.resetFields()
      this.adoptorChildrenVos = []
      this.adoptedFrom.resetFields()
      this.assessmentForm.resetFields()
      this.fuseForm.resetFields()
      this.otherForm.setFieldsValue({
        handlePersonName: window.parent.indexTool.getUserInfo().userName,
        handleOrgName: window.parent.indexTool.getUserInfo().orgName,
        handleTime: moment()
      })
      this.maritalForm.setFieldsValue({ maritalType: '10' })
      this.$nextTick(() => {
        this.adoptedFrom.setFieldsValue({
          identityCategory: this.childtype
        })
      })
      this.idAdopttype = [this.Enum.IDCARD_TYPE.NDJMSFZ, this.Enum.IDCARD_TYPE.NDJMSFZ]
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        this.registrationAdoptionId = this.$route.query.registrationAdoptionId
        if (this.flag == 'lookInfo' || this.flag == 'look') {
          this.basedisabled = true
        }
        if (this.evaluate == 'yes') {
          this.id = this.bizId
          this.registrationAdoptionId = this.goId
          this.basedisabled = true
        }
        this.post('/adoptionAppointment/query', { id: this.id, registrationAdoptionId: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            if (data.adoptionAppointment.handleTime) {
              data.adoptionAppointment.handleTime = moment(data.adoptionAppointment.handleTime, 'YYYY-MM-DD')
            }
            this.applicantType = data.adoptionAppointment ? data.adoptionAppointment.applicantType : null
            // 收养人基本信息

            this.isHidden = data.adoptionAppointment ? data.adoptionAppointment.applicantType : null
            const adoptorVos = data.adopterList
            console.log(data.adoptionAppointment, data.adopterList, 888)
            if (data.adoptionAppointment.applicantType == '3') {
              this.maritalForm.setFieldsValue({ maritalType: '20' })
              this.maritalType = '20'
            } else {
              if (adoptorVos[0].maritalStatus == '22' || adoptorVos[0].maritalStatus == '21' || adoptorVos[0].maritalStatus == '20' || adoptorVos[0].maritalStatus == '23') {
                this.maritalForm.setFieldsValue({ maritalType: '20' })
                this.maritalType = '20'
              }
              if (adoptorVos[0].maritalStatus == '30') {
                this.maritalForm.setFieldsValue({ maritalType: '30' })
              }
              if (adoptorVos[0].maritalStatus == '10') {
                this.maritalForm.setFieldsValue({ maritalType: '10' })
              }
              if (adoptorVos[0].maritalStatus == '90') {
                this.maritalForm.setFieldsValue({ maritalType: '90' })
              }
              if (adoptorVos[0].maritalStatus == '40') {
                this.maritalForm.setFieldsValue({ maritalType: '40' })
              }
            }

            if (data.adoptionAppointment && (data.adoptionAppointment.applicantType == '1' || data.adoptionAppointment.applicantType == '2')) { // 男方或女方
              this.adoptionTabKey = data.adoptionAppointment.applicantType
              this.nowformname = 'cptAdoptorFrom' + this.adoptionTabKey
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
                    this.idAdopttype = [adoptorVos[0].memberIdType || '', adoptorVos[1].copy_memberIdType || '']
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
                this.adoptionformdata = adoptorVo.memberIdType
              })
            }
            this.otherForm.setFieldsValue(data.adoptionAppointment)
            // 家庭子女信息赋值
            this.adoptorChildrenVos = data.familyMemberList || []
            // 被收养儿童信息赋值
            let { childBaseInformationVo } = data
            // 被收养儿童信息赋值
            const { readyAdoptionChildrenVo } = data
            // 被收养
            const { adopteeVo } = data
            const { adoptionAgencyVo } = data
            if (data.adoptionAppointment && data.adoptionAppointment.isAssessmentInsert == '0') { // 非新增（平台推送的数据）
              childBaseInformationVo = data.pushToBeAdoptedChildVo
            }
            if (data.adoptionAppointment && data.adoptionAppointment.isAssessmentInsert == '0') { // 非新增（平台推送的数据）
              childBaseInformationVo = data.pushToBeAdoptedChildVo
            }
            if (readyAdoptionChildrenVo) {
              this.childtype = readyAdoptionChildrenVo.adoptionType
            }
            this.$nextTick(() => {
              if (childBaseInformationVo) {
                if (childBaseInformationVo.idCard) {
                  const dateobj = this.go(
                    childBaseInformationVo.idCard,
                    childBaseInformationVo.idCard ? childBaseInformationVo.idCard.length : 0,
                    this,
                    null
                  )
                  this.istenyear = dateobj.age >= 8
                }
                const nowBirth = moment(new Date()).format('YYYY-MM-DD').split('-').join('')
                const oldBirth = childBaseInformationVo.birthday.split('-').join('')
                const AgeNum = nowBirth - oldBirth
                this.istenyear = AgeNum >= 80000

                childBaseInformationVo.birthday = childBaseInformationVo.birthday ? moment(childBaseInformationVo.birthday) : null
                childBaseInformationVo.enterDate = childBaseInformationVo.enterDate ? moment(childBaseInformationVo.enterDate) : null
                if (adopteeVo && childBaseInformationVo.enterDate == null) {
                  childBaseInformationVo.enterDate = moment(adopteeVo.enterDate)
                }
                childBaseInformationVo.pickupDate = childBaseInformationVo.pickupDate ? moment(childBaseInformationVo.pickupDate) : null
                if (adopteeVo && childBaseInformationVo.pickupDate == null) {
                  childBaseInformationVo.pickupDate = moment(adopteeVo.pickupDate)
                }
                childBaseInformationVo.publishDate = childBaseInformationVo.publishDate ? moment(childBaseInformationVo.publishDate) : null
                if (adopteeVo && childBaseInformationVo.publishDate == null) {
                  childBaseInformationVo.publishDate = moment(adopteeVo.publishDate)
                }
                let welfareInstitutionName = adoptionAgencyVo ? adoptionAgencyVo.welfareInstitutionName : ''
                if (welfareInstitutionName == '') {
                  welfareInstitutionName = readyAdoptionChildrenVo ? readyAdoptionChildrenVo.welfareInstitution : ''
                }
                childBaseInformationVo.welfareInstitutionName = welfareInstitutionName

                this.heathmodel = childBaseInformationVo.healthCondition ? childBaseInformationVo.healthCondition.split(',') : []
                // delete childBaseInformationVo.healthCondition
                if (adopteeVo) {
                  childBaseInformationVo.healthCondition = adopteeVo.healthCondition || readyAdoptionChildrenVo ? readyAdoptionChildrenVo.health : ''
                  childBaseInformationVo.educationLevel = adopteeVo.educationLevel || readyAdoptionChildrenVo ? readyAdoptionChildrenVo.degreeOfEducation : ''
                  childBaseInformationVo.nickName = adopteeVo.nickName
                  childBaseInformationVo.publishPeriodical = adopteeVo.publishPeriodical
                  // 登报时间 publishDate
                } else {
                  childBaseInformationVo.healthCondition = readyAdoptionChildrenVo ? readyAdoptionChildrenVo.health : ''
                  childBaseInformationVo.educationLevel = readyAdoptionChildrenVo ? readyAdoptionChildrenVo.degreeOfEducation : ''
                }
                childBaseInformationVo.identityCategory = readyAdoptionChildrenVo.identityCategory.trim()
                console.log(childBaseInformationVo.identityCategory, childBaseInformationVo.identityCategory.length, 999)
                // console.log(this.childtype, 444);
                this.addressmodel = [
                  childBaseInformationVo.censusRegisterPro ? childBaseInformationVo.censusRegisterPro : '',
                  childBaseInformationVo.censusRegisterCity ? childBaseInformationVo.censusRegisterCity : '',
                  childBaseInformationVo.censusRegisterCounty ? childBaseInformationVo.censusRegisterCounty : '',
                  childBaseInformationVo.censusRegisterTown ? childBaseInformationVo.censusRegisterTown : '',
                  childBaseInformationVo.censusRegisterVillage ? childBaseInformationVo.censusRegisterVillage : ''
                ]

                // 新增数据回显情况
                if (data.adoptionAppointment.isAssessmentInsert == '1') {
                  childBaseInformationVo.enterDate = readyAdoptionChildrenVo.beHospitalizedDate ? moment(readyAdoptionChildrenVo.beHospitalizedDate) : null
                  childBaseInformationVo.publishDate = readyAdoptionChildrenVo.publishDate ? moment(readyAdoptionChildrenVo.publishDate) : null
                  childBaseInformationVo.publishPeriodical = readyAdoptionChildrenVo.publishPeriodical
                  childBaseInformationVo.opinion = readyAdoptionChildrenVo.tenOpinion
                }

                this.$nextTick(() => {
                  this.adoptedFrom.setFieldsValue(childBaseInformationVo)
                })
              }
            })
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
            // 收养能力评估信息赋值
            const assessmentInfo = data.assessmentInfo
            if (assessmentInfo) {
              this.$refs.assessment.isshow1 = assessmentInfo.ajax1912 == 0
              this.$refs.assessment.isshow2 = assessmentInfo.ajax1913 == 0

              assessmentInfo.handleTime = moment(assessmentInfo.handleTime, 'YYYY-MM-DD')

              assessmentInfo.ajax1901 = assessmentInfo.ajax1901 ? moment(assessmentInfo.ajax1901) : null
              // this.$refs['assessment'].fileList = assessmentInfo.filePathVos || []
              // 文件信息 filePathVos
              const filePathVos = JSON.parse(data.assessmentFilePathVos)

              filePathVos.map((item) => {
                if (item.functionType == 'f0') {
                  this.$refs.assessment.fileList.push(item)
                }
                if (item.functionType == 'f1') {
                  this.$refs.assessment.fileList1.push(item)
                }
                if (item.functionType == 'f2') {
                  this.$refs.assessment.fileList2.push(item)
                }
              })

              setTimeout(() => {
                this.assessmentForm.setFieldsValue(assessmentInfo)
              }, 70)
            }

            // 融合期调查信息赋值
            const fuseInfo = data.fuseInfo
            if (fuseInfo) {
              fuseInfo.handleTime = moment(fuseInfo.handleTime, 'YYYY-MM-DD')
              fuseInfo.ajax1901 = fuseInfo.ajax1901 ? moment(fuseInfo.ajax1901) : null
              // this.$refs['fuse'].fileList = fuseInfo.filePathVos || []
              this.$refs.fuse.fileList = data.fuseFilePathVos ? JSON.parse(data.fuseFilePathVos) : []
              this.fuseForm.setFieldsValue(fuseInfo)
            }
          }
        })
      }
    },
    // 重置被收养人表单
    clearAdoptedFrom () {
      this.$nextTick(() => {
        this.$forceUpdate()
        const { identityCategory } = this.adoptedFrom.getFieldsValue()
        this.adoptedFrom.resetFields()
        this.adoptedFrom.setFieldsValue({ identityCategory })
        this.istenyear = false
      })
    },
    moment,
    setDataByName (val) {
      this.childNumber = val.childNumber
      this.childBaseId = val.id
      if (val.name) {
        const nowDate = moment(new Date()).format('YYYY-MM-DD').split('-').join('')
        for (var k in val) {
          const { birthday } = val
          if (birthday) {
            const oldBirth = birthday.split('-').join('')
            console.log(oldBirth, nowDate, 999)
            this.istenyear = nowDate - oldBirth >= 80000
          }
          if (val[k]) {
            if (k == 'birthday' || k == 'pickupDate' || k == 'enterDate') {
              this.adoptedFrom.setFieldsValue({
                [k]: this.moment(val[k], 'YYYY-MM-DD')
              })
            } else if (k == 'censusRegisterPro') {
              this.addressmodel = [
                val.censusRegisterPro || '',
                val.censusRegisterCity || '',
                val.censusRegisterCounty || '',
                val.censusRegisterTown || ''
              ]
            } else {
              this.adoptedFrom.setFieldsValue({
                [k]: val[k]
              })
            }
          }
        }
      } else {
        const data = this.adoptedFrom.getFieldsValue()
        const keylist = Object.keys(data)
        const arrlist = []
        keylist.map(item => {
          if (item == 'idCard' || item == 'identityCategory') {
          } else {
            arrlist.push(item)
          }
        })
        this.adoptedFrom.resetFields(arrlist)
      }
    },
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      this.istenyear = age >= 8
      if (!this.isvalidator) {
        return false
      }
      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      const idCard = this.adoptedFrom.getFieldsValue().idCard
      const oldBirth = birth.split('-').join('')
      const personBir = idCard.substring(6, 14)
      const personSex = idCard.substring(16, 17) % 2 == 0 ? '2' : '1'
      if (this.maritalType != '20' && idCard) {
        // if (oldBirth - personBir < 400000 && this.childtype != 6 && sex != personSex && !(this.maritalType == '30' && this.childtype == 4)) {
        if (oldBirth - personBir < 400000 && this.childtype != 6 && sex != personSex && this.childtype != 4) {
          this.$message.error('收养人与被收养人的年龄应当相差40周岁以上')
        }
      }
    },
    // 清空身份证号
    clearIdCard () {
      this.adoptedFrom.setFieldsValue({
        idCard: null
      })
    },
    setIdvalue (val) {
      this.idAdopttype = val
    },
    onChangeMarital (e) {
      this.maritalType = e.target.value
      if (this.maritalType == '20') {
        this.adoptionTabKey = '3'
        this.nowformname = 'cptAdoptorFrom' + 3
        this.cptAdoptorFrom3.setFieldsValue({ maritalStatus: e.target.value })
        this.cptAdoptorFrom3.setFieldsValue({ copy_maritalStatus: e.target.value })
      } else {
        this.adoptionTabKey = '1'
        this.nowformname = 'cptAdoptorFrom' + 1
        this.cptAdoptorFrom1.setFieldsValue({ maritalStatus: e.target.value })
        this.cptAdoptorFrom2.setFieldsValue({ maritalStatus: e.target.value })
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    // 机构类表 welfareOrgManagement/queryListByOrgId
    async getmechanismList () {
      const data = await this.post('welfareOrgManagement/queryListByOrgId')
      this.mechanismList = data.data.data
    },
    // 提交
    async submit () {
      const _self = this
      _self.isvalidator = false
      let isOk = true
      let currentTab = '1'
      var errList = ''
      // 融合期调查信息
      await _self.fuseForm.validateFields((err, values) => {
        if (err) {
          errList += err + '**fuseForm**'
          isOk = false
          currentTab = '6'
        }
      })
      // 收养能力评估信息
      await _self.assessmentForm.validateFields((err, values) => {
        if (err) {
          errList += err + '**assessmentForm**'
          isOk = false
          currentTab = '5'
        }
      })
      // 被收养儿童信息
      await _self.adoptedFrom.validateFields((err, values) => {
        if (err) {
          errList += err + '**adoptedFrom**'
          isOk = false
          currentTab = '3'
        }
      })
      // 收养人基本信息
      await _self[this.nowformname].validateFields((err, values) => {
        if (err) {
          errList += err + '**nowformname**'
          isOk = false
          currentTab = '1'
        }
      })
      await _self.otherForm.validateFields((err, values) => {
        if (err) {
          errList += err + '**nowformname**'
          isOk = false
          currentTab = '1'
        }
      })
      if (isOk) {
        const url = '/adoptionAppointment/submit'
        const submitObj = {}
        // 收养人基本信息数据处理
        submitObj.adopterList = []
        const adoptForm = _self[_self.nowformname].getFieldsValue()
        if (_self.nowformname == 'cptAdoptorFrom1' || _self.nowformname == 'cptAdoptorFrom2') { // 男方或女方
          adoptForm.birthday = adoptForm.birthday ? moment(adoptForm.birthday).format('YYYY-MM-DD') : null
          adoptForm.healthCondition = adoptForm.healthCondition instanceof Array ? adoptForm.healthCondition.join(',') : adoptForm.healthCondition
          adoptForm.censusRegisterPro = adoptForm.address_Linkage instanceof Array ? adoptForm.address_Linkage[0] : null
          adoptForm.censusRegisterCity = adoptForm.address_Linkage instanceof Array ? adoptForm.address_Linkage[1] : null
          adoptForm.censusRegisterCounty = adoptForm.address_Linkage instanceof Array ? adoptForm.address_Linkage[2] : null
          adoptForm.censusRegisterTown = adoptForm.address_Linkage instanceof Array ? adoptForm.address_Linkage[3] : null
          delete adoptForm.address_Linkage
          adoptForm.isApplicant = '1'
          adoptForm.sex = _self.nowformname == 'cptAdoptorFrom1' ? '1' : '2'
          submitObj.adopterList.push(adoptForm)//* *****sex */

          submitObj.adoptionAppointment = _self.otherForm.getFieldsValue()
          submitObj.adoptionAppointment.isAssessmentInsert = '1' // 新增标识
          submitObj.adoptionAppointment.familyIncome = adoptForm.familyIncome // 年收入***********
          submitObj.adoptionAppointment.applicantType = _self.nowformname == 'cptAdoptorFrom1' ? '1' : '2'
        } else { // 夫妻共同收养
          submitObj.adoptionAppointment = _self.otherForm.getFieldsValue()
          submitObj.adoptionAppointment.isAssessmentInsert = '1' // 新增标识
          submitObj.adoptionAppointment.applicantType = '3'
          submitObj.adoptionAppointment.familyIncome = adoptForm.familyIncome // 年收入***********
          submitObj.adoptionAppointment.isAddressEqual = adoptForm.sameAddress // 是否相同地址
          submitObj.adopterList = _self.dataProcess(adoptForm)
        }
        submitObj.adoptionAppointment.adoptionAppointmentType = _self.childtype
        // 家庭子女信息数据处理
        submitObj.familyMemberList = _self.adoptorChildrenVos || []
        // 被收养儿童信息数据处理
        const adoptedFrom = this.adoptedFrom.getFieldsValue()
        adoptedFrom.birthday = adoptedFrom.birthday ? moment(adoptedFrom.birthday).format('YYYY-MM-DD') : null
        adoptedFrom.enterDate = adoptedFrom.enterDate ? moment(adoptedFrom.enterDate).format('YYYY-MM-DD') : null
        adoptedFrom.pickupDate = adoptedFrom.pickupDate ? moment(adoptedFrom.pickupDate).format('YYYY-MM-DD') : null
        adoptedFrom.publishDate = adoptedFrom.publishDate ? moment(adoptedFrom.publishDate).format('YYYY-MM-DD') : null
        // adoptedFrom.healthCondition = adoptedFrom.healthCondition // null//* **** */
        adoptedFrom.censusRegisterPro = adoptedFrom.address_Linkage instanceof Array ? adoptedFrom.address_Linkage[0] : null
        adoptedFrom.censusRegisterCity = adoptedFrom.address_Linkage instanceof Array ? adoptedFrom.address_Linkage[1] : null
        adoptedFrom.censusRegisterCounty = adoptedFrom.address_Linkage instanceof Array ? adoptedFrom.address_Linkage[2] : null
        adoptedFrom.censusRegisterTown = adoptedFrom.address_Linkage instanceof Array ? adoptedFrom.address_Linkage[3] : null
        delete adoptedFrom.address_Linkage
        adoptedFrom.childNumber = this.childNumber
        submitObj.childBaseInformationVo = adoptedFrom

        const myDate = new Date()
        let isAgeOver = true
        let ageNumOver = true
        const idCardVal = submitObj.childBaseInformationVo.idCard
        const birthday = submitObj.childBaseInformationVo.birthday.split('-').join('')
        const sex = submitObj.childBaseInformationVo.sex
        const adoptorVos = submitObj.adopterList
        adoptorVos.forEach(item => {
          if (item.idCard) {
            if (idCardVal) {
              if (item.idCard.length === 18) {
                // if (myDate.getFullYear() - item.idCard.substring(6, 10) < 30 && !(this.maritalType == '30' && this.childtype == 4)) {
                if (myDate.getFullYear() - item.idCard.substring(6, 10) < 30 && this.childtype != 4) {
                  isAgeOver = false
                }
                // if (idCardVal.substring(6, 14) - item.idCard.substring(6, 14) < 400000 && (idCardVal.substring(16, 17) - item.idCard.substring(16, 17)) % 2 != 0 && !(this.maritalType == '30' && this.childtype == 4) && this.childtype != 6 && this.maritalType != '20') {
                if (idCardVal.substring(6, 14) - item.idCard.substring(6, 14) < 400000 && (idCardVal.substring(16, 17) - item.idCard.substring(16, 17)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                  ageNumOver = false
                }
              } else {
                if (myDate.getFullYear() - item.idCard.substring(6, 8) - 1900 < 30 && this.childtype != 4) {
                  isAgeOver = false
                }
                if (idCardVal.substring(6, 10) - item.idCard.substring(6, 8) - 1900 < 40 && (idCardVal.substring(16, 17) - item.idCard.substring(14, 15)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                  ageNumOver = false
                }
              }
            } else {
              if (item.idCard.length === 18) {
                // if (myDate.getFullYear() - item.idCard.substring(6, 10) < 30 && !(this.maritalType == '30' && this.childtype == 4)) {
                if (myDate.getFullYear() - item.idCard.substring(6, 10) < 30 && this.childtype != 4) {
                  isAgeOver = false
                }
                // if (idCardVal.substring(6, 14) - item.idCard.substring(6, 14) < 400000 && (idCardVal.substring(16, 17) - item.idCard.substring(16, 17)) % 2 != 0 && !(this.maritalType == '30' && this.childtype == 4) && this.childtype != 6 && this.maritalType != '20') {
                if (birthday - item.idCard.substring(6, 14) < 400000 && (sex - item.idCard.substring(16, 17)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                  ageNumOver = false
                }
              } else {
                if (myDate.getFullYear() - item.idCard.substring(6, 8) - 1900 < 30 && this.childtype != 4) {
                  isAgeOver = false
                }
                if (birthday - item.idCard.substring(6, 12) - 19000000 < 400000 && (sex - item.idCard.substring(14, 15)) % 2 != 0 && this.childtype != 4 && this.childtype != 6 && this.maritalType != '20') {
                  ageNumOver = false
                }
              }
            }
          }
        })
        if (!isAgeOver) {
          this.$message.error('收养人年龄不满三十周岁，不符合收养条件')
          return false
        }
        if (!ageNumOver) {
          this.$message.error('收养人与被收养人的年龄应当相差40周岁以上')
          return false
        }

        const orgid = adoptedFrom.welfareInstitutionName ? adoptedFrom.welfareInstitutionName : false
        let orgname = ''
        submitObj.adopteeVo = adoptedFrom
        if (orgid) {
          submitObj.adopteeVo = adoptedFrom
          this.mechanismList.forEach(e => {
            if (orgid == e.id) {
              orgname = e.orgName
            }
          })
          const adoptionAgencyVos = {}
          submitObj.adoptionAgencyVo = {}

          adoptionAgencyVos.welfareInstitutionId = orgid
          adoptionAgencyVos.welfareInstitutionName = orgname
          submitObj.adoptionAgencyVo = adoptionAgencyVos
        }

        // 附件处理
        submitObj.upLoadPathIds = []
        const fileList = _self.fileList.concat(_self.fileList, _self.adoptionfileList, _self.adopterfileList) || []
        for (var i = 0; i < fileList.length; i++) {
          submitObj.upLoadPathIds.push(fileList[i].response.data.data.fileid)
        }
        submitObj.assessmentInfo = {}
        submitObj.fuseInfo = {}
        if (this.flag != 'add') {
          // 收养能力评估信息数据处理
          const assessmentForm = _self.assessmentForm.getFieldsValue()
          assessmentForm.upLoadPathIds = []
          assessmentForm.ajax1901 = assessmentForm.ajax1901 ? moment(assessmentForm.ajax1901).format('YYYY-MM-DD') : null
          const assessmentFileList = _self.$refs.assessment.fileList
          for (var j = 0; j < assessmentFileList.length; j++) {
            assessmentForm.upLoadPathIds.push(assessmentFileList[j].response.data.data.fileid)
          }
          submitObj.assessmentUpLoadPathIds = assessmentForm.upLoadPathIds
          submitObj.assessmentInfo = assessmentForm
          // 融合期调查信息数据处理
          const fuseForm = _self.fuseForm.getFieldsValue()
          fuseForm.upLoadPathIds = []
          fuseForm.ajax1901 = fuseForm.ajax1901 ? moment(fuseForm.ajax1901).format('YYYY-MM-DD') : null
          const fuseFileList = _self.$refs.fuse.fileList
          for (var k = 0; k < fuseFileList.length; k++) {
            fuseForm.upLoadPathIds.push(fuseFileList[k].response.data.data.fileid)
          }
          submitObj.fuseUpLoadPathIds = fuseForm.upLoadPathIds
          submitObj.fuseInfo = fuseForm
        }
        const res = await this.post(url, submitObj, true)
        if (res.serviceSuccess) {
          _self.$message.success('信息保存成功！')
          _self.backs()
        }
      } else {
        _self.nowkey = currentTab
        _self.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    // 夫妻共同收养数据处理
    dataProcess (e) {
      const adopterList = []
      const manObj = {}
      const womanObj = {}
      for (var i in e) {
        if (i == 'familyIncome') { // 家庭收入
          manObj[i] = e[i]
          womanObj[i] = e[i]
        } else {
          if (i.indexOf('copy_') != -1) { // 夫妻中的女方
            womanObj[i.replace('copy_', '')] = e[i]
          } else if (i != 'sameAddress') { // 夫妻中的男方
            manObj[i] = e[i]
          }
        }
      }
      manObj.censusRegisterPro = manObj.address_Linkage instanceof Array ? manObj.address_Linkage[0] : null
      manObj.censusRegisterCity = manObj.address_Linkage instanceof Array ? manObj.address_Linkage[1] : null
      manObj.censusRegisterCounty = manObj.address_Linkage instanceof Array ? manObj.address_Linkage[2] : null
      manObj.censusRegisterTown = manObj.address_Linkage instanceof Array ? manObj.address_Linkage[3] : null
      if (e.sameAddress == '1') { // 相同地址
        womanObj.censusRegisterPro = manObj.censusRegisterPro
        womanObj.censusRegisterCity = manObj.censusRegisterCity
        womanObj.censusRegisterCounty = manObj.censusRegisterCounty
      } else { // 不同地址
        womanObj.censusRegisterPro = womanObj.address_Linkage instanceof Array ? womanObj.address_Linkage[0] : null
        womanObj.censusRegisterCity = womanObj.address_Linkage instanceof Array ? womanObj.address_Linkage[1] : null
        womanObj.censusRegisterCounty = manObj.address_Linkage instanceof Array ? manObj.address_Linkage[2] : null
        womanObj.censusRegisterTown = womanObj.address_Linkage instanceof Array ? womanObj.address_Linkage[3] : null
      }
      delete manObj.address_Linkage
      delete womanObj.address_Linkage
      manObj.birthday = manObj.birthday ? moment(manObj.birthday).format('YYYY-MM-DD') : null
      manObj.healthCondition = manObj.healthCondition instanceof Array ? manObj.healthCondition.join(',') : null
      manObj.isApplicant = this.applytype == '1' ? '1' : '0'
      manObj.sex = this.Enum.SEX.NAN
      womanObj.birthday = womanObj.birthday ? moment(womanObj.birthday).format('YYYY-MM-DD') : null
      womanObj.healthCondition = womanObj.healthCondition instanceof Array ? womanObj.healthCondition.join(',') : null
      womanObj.isApplicant = this.applytype == '0' ? '1' : '0'
      womanObj.sex = this.Enum.SEX.NV
      adopterList.push(manObj)
      adopterList.push(womanObj)
      return adopterList
    },
    // 身份证变化引发的赋值
    setFrom (val, dates) {
      if (!this.isvalidator) {
        return false
      }
      if (val.name) {
        const value = val.idCard
        this.childNumber = val.childNumber
        for (var k in val) {
          if (val[k]) {
            if (k == 'birthday' || k == 'pickupDate' || k == 'enterDate') {
              this.adoptedFrom.setFieldsValue({
                [k]: moment(val[k])
              })
            } else if (k == 'censusRegisterPro') {
              this.addressmodel = [
                val.censusRegisterPro || '',
                val.censusRegisterCity || '',
                val.censusRegisterCounty || '',
                val.censusRegisterTown || ''
              ]
            } else {
              this.adoptedFrom.setFieldsValue({
                [k]: val[k]
              })
            }
          }
        }
      } else {
        this.disabled = false
        const data = this.adoptedFrom.getFieldsValue()
        const keylist = Object.keys(data)
        const arrlist = []
        keylist.map(item => {
          if (item == 'idCard' || item == 'identityCategory') {
          } else {
            arrlist.push(item)
          }
        })
        this.adoptedFrom.resetFields(arrlist)
      }
    },
    // 被收养人根据身份证号设置出生日期及性别
    // setFrom (data, dates) {
    //   if (!this.isvalidator) {
    //     return false
    //   }
    //   let dateobj = this.go(dates, dates.length, this, null)
    //   this.adoptedFrom.setFieldsValue({
    //     birthday: moment(dateobj.birth),
    //     sex: dateobj.sex
    //   })
    // },
    // 收养类别change
    selectchange (val) {
      console.log(val, 444)
      if (this.flag == 'lookInfo' || this.flag == 'look') {

      } else {
        this.$nextTick(() => {
          this.istenyear = false
          this.$forceUpdate()
          this.adoptedFrom.resetFields()
          const identityCategory = this.childtype == 6 ? null : this.childtype
          setTimeout(() => {
            this.adoptedFrom.setFieldsValue({ identityCategory })
          }, 300)
        })
      }
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
      const val1 = this.maritalForm.getFieldsValue().maritalType
      if (this.flag == 'add') {
        // eslint-disable-next-line no-unused-expressions
        this[this.nowformname] ? this[this.nowformname].resetFields() : null
        this[this.nowformname] ? this[this.nowformname].setFieldsValue({ maritalStatus: val1 }) : null
      } else {
        if (val != this.applicantType) {
          // eslint-disable-next-line no-unused-expressions
          this[this.nowformname] ? this[this.nowformname].resetFields() : null
          this[this.nowformname] ? this[this.nowformname].setFieldsValue({ maritalStatus: val1 }) : null
        }
      }
    },
    // 家庭子女 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        this[tablename] = val
      }
    },
    setmendate (val) {
      if (val.age < 30 && this.childtype != 4) {
        this.$message.error('收养人年龄不满三十周岁，不符合收养条件')
        // this.$confirm({
        //   title: '收养人年龄不满三十周岁，不符合收养条件',
        //   content: ' ',
        //   onOk: () => {
        //     console.log('OK')
        //   },
        // })
      }
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
      if (val.age < 30 && this.childtype != 4) {
        this.$message.error('收养人年龄不满三十周岁，不符合收养条件')
      }
      if (!this.isvalidator) {
        return false
      }
      this[this.nowformname].setFieldsValue({
        birthday: moment(val.birth)
      })
      const birthday1 = this.adoptedFrom.getFieldsValue().birthday.format('YYYY-MM-DD')
      const sex1 = this.adoptedFrom.getFieldsValue().sex
      const ageNum = birthday1.split('-').join('') - val.birth.split('-').join('')
      if (birthday1) {
        // if (ageNum < 400000 && this.childtype != 6 && sex1 != val.sex && !(this.maritalType == '30' && this.childtype == 4)) {
        if (ageNum < 400000 && this.childtype != 6 && sex1 != val.sex && this.childtype != 4) {
          this.$message.error('收养人与被收养人的年龄应当相差40周岁以上')
        }
      }
    },
    // 被收养人地址传值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 被收养人健康传值
    setheath () {
      this.adoptedFrom.setFieldsValue({
        healthCondition: this.heathmodel
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
    // CHILDREN_PARENT_STITUATION 子女所属父母情况
    async getParentsInfo () {
      const data = await this.getDictionaries('CHILDREN_PARENT_STITUATION')
      this.childrensParentSituationList = data
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
    // DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
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
    async getdit () {
      this.yesNoList = await this.getDictionaries('YESNO')
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
      this.heathval = '0'
      this.$router.go(-1)
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
    // 健康狀況
    async getheathio () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    onChange (e) {
      this.adoptedFrom.setFieldsValue({
        healthSecondLevel: [],
        healthSecondLevelOther: ''
      })
      // this.healthStatusOther = ''
      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('one', 'oneout')
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue && node) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else if (node) {
          node.style.height = '50px'
        }
        if (node) {
          node.style.transition = 'all 1s'
        }
      })
    },
    seriousillnesschange (val) {
      if (
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
      ) {
        this.serioushval = true
      } else {
        this.serioushval = false
      }
      if (val.length > 1) {
        if (
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = []
          arr.push(val[val.length - 1])
          this.$nextTick(() => {
            this.adoptedFrom.setFieldsValue({
              healthSecondLevel: arr
            })
          })
        }
        if (
          val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = [...val]
          arr.shift()
          this.$nextTick(() => {
            this.adoptedFrom.setFieldsValue({
              healthSecondLevel: arr
            })
          })
        }
      }
      this.setHeight('one', 'oneout')
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
