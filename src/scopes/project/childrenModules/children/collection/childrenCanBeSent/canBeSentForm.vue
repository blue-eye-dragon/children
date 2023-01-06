<template>
  <div class="conts tadrawer"
       @click="allvalidator">
    <div class="contin">
    <ta-form :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-form-item label="儿童类别:"
                    class="fromwid"
                    :labelCol="{span: 3}"
                    :wrapperCol="{span:21}"
                    :require="{message:'请选择!'}">
        <ta-select v-model="childtype"
                   class="selectwid"
                   @change="selectchange"
                   collection-filter="3,5"
                   :reverseFilter="true"
                   collection-type="ADOPTIONCATEGORY"
                   :disabled="typedisabled">
        </ta-select>
      </ta-form-item>
    </ta-form>
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="基本信息"
                   :forceRender="true"
                   key="1">
        <div ref="oneout"
             class="mars">
          <Title id="anchorpoint_a"
                 title="儿童信息"
                 :show.sync="showone"></Title>
          <ta-form layout="horizontal"
                   ref="one"
                   :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
            <CptAdopted :additionalYesOrNo="additionalYesOrNo"
                        :id="id"
                        ref="CptAdopted"
                        @changehei="changehei"
                        :basedisabled="basedisabled"
                        :istenyear.sync="istenyear"
                        @setaddress="setaddress"
                        :addressmodel="addressmodel"
                        @setheath="setheath"
                        @resizeForm="resizeForm"
                        :heathmodel="heathmodel"
                        :childtype="childtype"
                        :sexList="sexList"
                        :nationList="nationList"
                        :healthList="healthList"
                        :cultureList="cultureList"
                        :adoptionlist="adoptionlist"
                        :nationalityList="nationalityList"
                        :marriageyList="marriageyList"
                        :occupattioList="occupattioList"
                        :adisConditionList='adisConditionList'
                        :typesadopteestatusList="typesadopteestatusList"
                        :transmissionWayList='transmissionWayList'
                        @setFrom="setFrom"></CptAdopted>
          </ta-form>
        </div>
        <div ref="twoout"
             class="mars">
          <Title title="儿童健康状况"
                 :show.sync="showtwo"></Title>
          <ta-form ref="two"
                   layout="horizontal"
                   :autoFormCreate="(heathForm)=>{this.heathForm = heathForm}">
            <ta-row class="fromcom">
              <ta-col :span="24">
                <ta-form-item label="健康状况"
                              fieldDecoratorId="health"
                              :labelCol="{ span: 4 }"
                              :wrapperCol="{ span: 20 }"
                              :fieldDecoratorOptions="rules.healthStatus">
                  <ta-radio-group @change="onChange"
                                  :disabled="disabled">
                    <ta-radio :value="item.value"
                              v-for="(item,index) in heathlist"
                              :key="index">{{item.label}}</ta-radio>
                  </ta-radio-group>
                </ta-form-item>
                <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                              label="其他"
                              fieldDecoratorId="healthOther"
                              :labelCol="{ span: 4 }"
                              :wrapperCol="{ span: 10 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">
                  <ta-input :disabled="disabled"
                            :placeholder="disabled?'':'请输入其他情况'" />
                </ta-form-item>
                <div class="canji"
                     v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
                  <ta-form-item label="残疾类型"
                                fieldDecoratorId="healthSecondLevel"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]"
                                :require="{message:'请选择残疾类型'}">
                    <ta-checkbox-group :disabled="disabled"
                                       :options="disabiliytypelist"
                                       @change="setMulti"
                                       :values="disabilityTypeValues" />
                  </ta-form-item>
                  <ta-form-item label="残疾等级"
                                fieldDecoratorId="disabilityLevel"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
                    <ta-radio-group :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in canjileave"
                                :key="index">{{item.label}}</ta-radio>

                    </ta-radio-group>
                    <ta-radio-group style="float:left;"></ta-radio-group>
                  </ta-form-item>
                </div>

                <div class="canji"
                     v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
                  <ta-form-item label="重病"
                                fieldDecoratorId="healthSecondLevel"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]"
                                :require="{message:'请选择重病!'}">
                    <ta-checkbox-group :options="disabiliytypelist"
                                       :disabled="disabled"
                                       @change="seriousillnesschange" />
                  </ta-form-item>
                  <ta-form-item v-if="serioushval"
                                label="其他"
                                fieldDecoratorId="healthSecondLevelOther"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                </div>

                <div class="canji"
                     v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
                  <ta-form-item label="慢性病"
                                fieldDecoratorId="healthSecondLevel"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]"
                                :require="{message:'请选择慢性病!'}">
                    <ta-checkbox-group :options="disabiliytypelist"
                                       :disabled="disabled"
                                       @change="seriousillnesschange" />
                  </ta-form-item>
                  <ta-form-item v-if="serioushval"
                                label="其他"
                                fieldDecoratorId="healthSecondLevelOther"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                </div>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>
        <div ref="threeout"
             class="mars"
             v-if="childtype!=8">
          <Title id="anchorpoint_c"
                 title="送养人信息"
                 :show.sync="showthree"></Title>
          <template v-if="childtype<=2">
            <ta-form layout="horizontal"
                     ref="three"
                     :autoFormCreate="(fiveRaiseFrom)=>{this.fiveRaiseFrom = fiveRaiseFrom}">
              <FiveRaise :sexList="sexList"
                         :mechanismList="mechanismList"
                         @mechanismchange="mechanismchange"
                         :basedisabled="basedisabled"
                         :relationsadopteesList="relationsadopteesList"
                         :disabled="disabled"></FiveRaise>
            </ta-form>
          </template>
          <template v-else>
            <ta-tabs class="fromcom"
                     @change="maintancechange"
                     :activeKey="sendTabKey"
                     type="card"
                     ref="three">
              <ta-tab-pane tab="男方单独送养"
                           :forceRender="true"
                           key="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(maintenanceFrom1)=>{this.maintenanceFrom1 = maintenanceFrom1}">
                  <AdoptionAlone @setdate="setsenddate"
                                 :basedisabled="basedisabled"
                                 @setaddress="setaddress3"
                                 :addressmodel="addressmodel3"
                                 @setheath="setheath3"
                                 @setIdCard="setIdCard3"
                                 :heathmodel="heathmodel3"
                                 :ishide="true"
                                 :relationsadopteesList="relationsadopteesList"
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
              <ta-tab-pane tab="女方单独送养"
                           :forceRender="true"
                           key="2">
                <ta-form layout="horizontal"
                         :autoFormCreate="(maintenanceFrom2)=>{this.maintenanceFrom2 = maintenanceFrom2}">
                  <AdoptionAlone @setheath="setheath3"
                                 :heathmodel="heathmodel3"
                                 @setdate="setsenddate"
                                 :basedisabled="basedisabled"
                                 @setaddress="setaddress3"
                                 @setIdCard="setIdCard3"
                                 :addressmodel="addressmodel3"
                                 :ishide="true"
                                 :sexList="sexList"
                                 :relationsadopteesList="relationsadopteesList"
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
              <ta-tab-pane tab="夫妻双方共同送养"
                           :forceRender="true"
                           key="3">
                <ta-form layout="horizontal"
                         :autoFormCreate="(maintenanceFrom3)=>{this.maintenanceFrom3 = maintenanceFrom3}">
                  <JointAdoption :issameaddress.sync='issameaddress2'
                                 @mensetheath="mensetheath2"
                                 @womensetheath="womensetheath2"
                                 :menheathmodel="menheathmodel2"
                                 :womenheathmodel="womenheathmodel2"
                                 @setmendate="setsendmendate"
                                 @setIdCard="setIdCard2"
                                 :basedisabled="basedisabled"
                                 @mensetaddress="mensetaddress2"
                                 @womensetaddress="womensetaddress2"
                                 :menaddressmodel="menaddressmodel2"
                                 :womenaddressmodel="womenaddressmodel2"
                                 :ishide="true"
                                 :sexList="sexList"
                                 :relationsadopteesList="relationsadopteesList"
                                 :nationList="nationList"
                                 :healthList="healthList"
                                 :cultureList="cultureList"
                                 :identityList="identityList"
                                 :marriageyList="marriageyList"
                                 :nationalityList="nationalityList"
                                 :occupattioList="occupattioList"
                                 :idcardTypeList="idcardTypeList"
                                 :familyincomeList="familyincomeList"></JointAdoption>
                </ta-form>
              </ta-tab-pane>
            </ta-tabs>
          </template>
        </div>
        <div ref="fiveout"
             class="mars"
             v-if="childtype==3">
          <Title id="anchorpoint_e"
                 title="生父母信息"
                 :show.sync="showfive"></Title>
          <ta-form layout="horizontal"
                   ref="five"
                   :autoFormCreate="(parentFrom)=>{this.parentFrom = parentFrom}">
            <NotcptAdoptor :issameaddress.sync='issameaddress3'
                           @parentmensetheath="parentmensetheath"
                           @parentwomensetheath="parentwomensetheath"
                           :parentmenheathmodel="parentmenheathmodel"
                           :parentwomenheathmodel="parentwomenheathmodel"
                           @setmendate="setparentdate"
                           @setIdCard="setIdCard4"
                           :basedisabled="basedisabled"
                           @parentmensetaddress="parentmensetaddress"
                           @parentwomensetaddress="parentwomensetaddress"
                           :parentmenmodel="parentmenmodel"
                           :parentwomenmodel="parentwomenmodel"
                           :sexList="sexList"
                           :nationList="nationList"
                           :healthList="healthList"
                           :cultureList="cultureList"
                           :identityList="identityList"
                           :marriageyList="marriageyList"
                           :nationalityList="nationalityList"
                           :occupattioList="occupattioList"
                           :idcardTypeList="idcardTypeList"></NotcptAdoptor>
          </ta-form>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="文件上传"
                   :forceRender="true"
                   key="5">
        <ta-form layout="horizontal"
                 :autoFormCreate="(fileForm)=>{this.fileForm = fileForm}">
          <FileUpload :fileList.sync="fileList"
                      :basedisabled="basedisabled"
                      :filedisabled="filedisabled"
                      :imgfilelist.sync="imgfilelist"
                      :adoptionfileList.sync="adoptionfileList"
                      :adopterfileList.sync="adopterfileList">
          </FileUpload>
        </ta-form>
      </ta-tab-pane>
      <!-- <ta-tab-pane tab="送养人信息" :forceRender="true" key="6">
      </ta-tab-pane> -->
    </ta-tabs>
   </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <template v-if="handleType==2">
        <ta-button type="primary"
                   class="preservation"
                   @click="completionsubmit">提交</ta-button>
      </template>
      <template v-else>
        <ta-button type="primary"
                   class="preservation temporarystorage"
                   @click.stop="submit('0')"
                   v-if="handleType!=0">暂存</ta-button>
        <ta-button type="primary"
                   class="preservation"
                   @click.stop="submit('1')"
                   v-if="handleType!=0">提交</ta-button>
      </template>
    </div>
    <ta-modal title="提交成功"
              :visible="printshow"
              @ok="printOk"
              okText="打印"
              @cancel="printno">
      <p><b>收养登记提交成功！是否需要打印相关材料？</b></p>
      <p>后续打印请到收养业务查询页面打印。</p>
    </ta-modal>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import CptAdopted from './components/cptAdopted'
import CptAdoptor from './components/cptAdoptor'
import FiveRaise from './components/fiveRaise'
import Family from './components/family'
import Record from './components/record'
import Investigation from './components/investigation'
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import NotcptAdoptor from './components/notcptAdoptor'
import AdInformationnote from './components/adInformationnote'
import AdoptionAlone from './components/adoptionAlone'
import JointAdoption from './components/jointAdoption'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'register',
  components: {
    Title,
    CptAdopted,
    CptAdoptor,
    FiveRaise,
    AdInformationnote,
    Family,
    Record,
    Investigation,
    FileUpload,
    Printing,
    NotcptAdoptor,
    AdoptionAlone,
    JointAdoption
  },
  data () {
    return {
      serioushval: false,
      adisConditionList: [],
      rules: {
        helpStationOther: this.verificationRulesNotMustFill('其他救助', 200),
        academicStatus: this.verificationRules('学业状况'),
        healthStatus: this.verificationRules('健康状况'),
        disabledType: this.verificationRules('残疾类型'),
        disabledType1: this.verificationRules('重病'),
        disabledType2: this.verificationRules('慢性病'),
        goSchoolStatus: this.verificationRules('就学情况'),
        statusoverview: this.verificationRules('生活状况概述', 200),
        remark: this.verificationRules('驳回原因', 200),
        healthStatusOther: this.verificationRules('其他情况', 50),
        academicStatusOther: this.verificationRules('其他情况', 50),
        boarder: this.verificationRules('是否学校寄宿')
      },
      current: ['1'],
      menulist: [
        { title: '基本信息', key: '1' },
        { title: '家庭子女信息', key: '2' },
        { title: '笔录信息', key: '3' },
        { title: '调查信息', key: '4' },
        { title: '文件上传', key: '5' },
        { title: '打印', key: '6' }
      ],
      adoptionlist: [],
      heathlist: [],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      // 男 女 收养
      // typeadoption: '1',
      // maintenanceType: '1',
      childtype: '3',
      // 家庭信息数据
      adoptorChildrenVos: [],
      // 笔录信息
      notesRecordVos: [],
      // 調查信息
      surveyRecordVos: [],
      fileList: [],
      // 文件上传
      adoptionfileList: [],
      adopterfileList: [],
      nowkey: '1',
      nowformname: 'cptAdoptorFrom1',
      nowmaintenanceFrom: 'maintenanceFrom1',
      sexList: [],
      nationList: [],
      healthList: [],
      disabiliytypelist: [],
      canjileave: [],
      heathval: '0',
      cultureList: [],
      identityList: [],
      nationalityList: [],
      marriageyList: [],
      occupattioList: [],
      idcardTypeList: [],
      relationsadopteesList: [],
      eelationsApplicantsList: [],
      addressmodel: [],
      addressmodel2: [],
      addressmodel3: [],
      parentmenmodel: [],
      parentwomenmodel: [],
      mechanismList: [],
      typesadopteestatusList: [],
      disabilityTypeValues: [],
      // 是否补录
      additionalYesOrNo: '0',
      submitYesOrNo: '1',
      id: '',
      applytype: '1',
      menaddressmodel: [],
      womenaddressmodel: [],
      menaddressmodel2: [],
      womenaddressmodel2: [],
      familyincomeList: [],
      adoptionTabKey: '1',
      sendTabKey: '1',
      disabled: false,
      welfareInstitutionId: '',
      basedisabled: false,
      filedisabled: false,
      handleType: 1,
      istenyear: false,
      typedisabled: false,
      isprint: false,
      printshow: false,
      heathmodel: [],
      heathmodel2: [],
      menheathmodel: [],
      womenheathmodel: [],
      heathmodel3: [],
      womenheathmodel2: [],
      menheathmodel2: [],
      parentwomenheathmodel: [],
      parentmenheathmodel: [],
      isvalidator: false,
      printlist: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        }
      ],
      printId: '',
      imgfilelist: [],
      transmissionWayList: [],
      isupload: true,
      issameaddress1: '0',
      issameaddress2: '0',
      issameaddress3: '0',
      validatesRegisters: [],
      isCounty: window.parent.indexTool.getUserInfo().areaLevel == '3'
    }
  },
  created () { },
  activated () {
    // 初始化数据
    this.disabilityTypeValues = []
    this.loaddata()
    // this.getbase64()
    // this[this.nowmaintenanceFrom].resetFields()
    // nowmaintenanceFrom
    this.additionalYesOrNo = this.$route.query.additionalYesOrNo
    if (this.$route.query.id) {
      this.typedisabled = true
      this.id = this.$route.query.id
      this.handleType = this.$route.query.handleType
      if (this.$route.query.handleType == 0) {
        this.basedisabled = true
        this.filedisabled = true
        this.disabled = true
        this.isDisabled = true
      } else if (this.$route.query.handleType == 1) {
        this.basedisabled = false
        this.filedisabled = false
        this.disabled = false
      } else {
        this.basedisabled = true
        this.filedisabled = false
        this.nowkey = '5'
      }
      this.getDetails()
      // this.getimglist()
    } else {
      this.typedisabled = false
    }
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('four', 'fourout')
      if (this.childtype == 3) {
        this.setHeight('five', 'fiveout')
      }
      if (this.childtype != 8) {
        this.setHeight('three', 'threeout')
      }
      // this.setHeight('five', 'fiveout')
    })
  },
  mounted () {
    this.getchildtype()
    // window.onresize = () => {
    //   // this.showone = true
    //   this.$nextTick(() => {
    //     this.setHeight('one', 'oneout', !this.showone)
    //     this.setHeight('two', 'twoout', !this.showtwo)
    //     // this.setHeight('three', 'threeout', !this.showthree)
    //     this.setHeight('four', 'fourout', !this.showfour)
    //     if (this.childtype == 3) {
    //       this.setHeight('five', 'fiveout', !this.showfive)
    //     }
    //     if (this.childtype != 8) {
    //       this.setHeight('three', 'threeout')
    //     }
    //   })
    // }
    this.adoptedFrom.setFieldsValue({
      identityCategory: '1'
    })
    this.getsex()
    this.getleave()
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
    this.getmechanismList()
    this.gettypesadopteestatus()
    this.getfamilyincome()
    this.getheathlist()
  },
  methods: {
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    resizeFormField () {
      this.adoptedFrom.resetFields()
      this.heathForm.resetFields()
      this.maintenanceFrom1.resetFields()
      this.maintenanceFrom2.resetFields()
      this.maintenanceFrom3.resetFields()
      if (this.parentFrom) {
        this.parentFrom.resetFields()
      }
      if (this.fiveRaiseFrom) {
        this.fiveRaiseFrom.resetFields()
      }
      this.$refs.CptAdopted.loadRadiovalue('1', '1')
    },
    // getbase64 () {
    //   let returnFileIds = this.imgfilelist[0].response.data.data.fileid
    //   this.post('/file/getFileUrls', {
    //     returnFileIds: returnFileIds
    //   }).then(res => {
    //     console.log('BASE')
    //     console.log(res.data.fileUrlList[0])
    //     let blobs = res.data.fileUrlList[0]
    //     var reader = new FileReader()
    //     reader.readAsDataURL(blobs)
    //     reader.onload = function (e) {
    //       // callback(e.target.result)
    //       console.log(e)
    //     }
    //     // file.url = res.data.fileUrlList[0];
    //   })
    // },
    loaddata () {
      this.heathval = '0'
      this.validatesRegisters = []
      this.issameaddress1 = '0'
      this.issameaddress2 = '0'
      this.issameaddress3 = '0'
      this.isupload = true
      this.imgfilelist = []
      // this.typeadoption = '1'
      // this.maintenanceType = '1'
      this.basedisabled = false
      this.filedisabled = false
      this.handleType = 1
      this.nowkey = '1'
      this.id = ''
      this.applytype = '1'
      this.ishide = true
      this.welfareInstitutionId = ''
      this.adoptorChildrenVos = []
      this.notesRecordVos = []
      this.surveyRecordVos = []
      this.fileList = []
      this.adoptionfileList = []
      this.adopterfileList = []
      this.heathmodel = []
      this.heathmodel2 = []
      this.childtype = '3'
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.printId = ''
      this.nowformname = 'cptAdoptorFrom1'
      this.nowmaintenanceFrom = 'maintenanceFrom1'
      this.isprint = false
      this.isvalidator = false
      this.printshow = false
      if (this.fiveRaiseFrom) {
        this.fiveRaiseFrom.resetFields()
        this.adoptedFrom.resetFields()
      }
      this.adoptedFrom.setFieldsValue({
        identityCategory: this.childtype
      })
    },
    // 健康狀況
    async getheathlist () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    async getdisabiliytype (val, ty) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      if (ty && ty == '1') {
        this.disabiliytypelistF = data.data.codeList
      } else if (ty && ty == '2') {
        this.disabiliytypelistM = data.data.codeList
      } else if (ty && ty == '3') {
        this.disabiliytypelistO = data.data.codeList
      } else {
        this.disabiliytypelist = data.data.codeList
      }
    },
    changehei () {
      this.setHeight('one', 'oneout')
    },
    onChange (e) {
      this.heathForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('two', 'twoout')
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
            this.heathForm.setFieldsValue({
              disabledType: arr
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
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
      }
      this.setHeight('two', 'twoout')
    },
    setdate (val) {
      if (!this.isvalidator) {
        return false
      }
      this[this.nowformname].setFieldsValue({
        birthday: val.birth ? moment(val.birth) : null
      })
    },
    setsenddate (val) {
      if (!this.isvalidator) {
        return false
      }
      this[this.nowmaintenanceFrom].setFieldsValue({
        birthday: val.birth ? moment(val.birth) : null
      })
    },
    setsendmendate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowmaintenanceFrom].setFieldsValue({
          copy_birthday: val.birth ? moment(val.birth) : null
        })
      } else {
        this[this.nowmaintenanceFrom].setFieldsValue({
          birthday: val.birth ? moment(val.birth) : null
        })
      }
    },
    setparentdate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this.parentFrom.setFieldsValue({
          copy_birthday: val.birth ? moment(val.birth) : null
        })
      } else {
        this.parentFrom.setFieldsValue({
          birthday: val.birth ? moment(val.birth) : null
        })
      }
    },
    setIdCard4 (val) {
      if (val == '1') {
        this.parentFrom.setFieldsValue({
          idCard: '', birthday: null
        })
      } else {
        this.parentFrom.setFieldsValue({
          copy_idCard: '', copy_birthday: null
        })
      }
    },
    setmendate (val) {
      if (!this.isvalidator) {
        return false
      }
      const key = val.key
      if (key.includes('copy')) {
        this[this.nowformname].setFieldsValue({
          copy_birthday: val.birth ? moment(val.birth) : null
        })
      } else {
        this[this.nowformname].setFieldsValue({
          birthday: val.birth ? moment(val.birth) : null
        })
      }
    },
    setIdCard2 (val) {
      if (val == '1') {
        this[this.nowformname].setFieldsValue({
          idCard: '', birthday: null
        })
      } else {
        this[this.nowformname].setFieldsValue({
          copy_idCard: '', copy_birthday: null
        })
      }
    },
    parentmensetaddress () {
      this.parentFrom.setFieldsValue({
        address_Linkage: this.parentmenmodel
      })
    },
    parentwomensetaddress () {
      this.parentFrom.setFieldsValue({
        copy_address_Linkage: this.parentwomenmodel
      })
    },
    parentmensetheath () {
      this.parentFrom.setFieldsValue({
        healthCondition: this.parentmenheathmodel
      })
    },
    parentwomensetheath () {
      this.parentFrom.setFieldsValue({
        copy_healthCondition: this.parentwomenheathmodel
      })
    },
    setheath () {
      this.adoptedFrom.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    setIdCard () {
      this[this.nowformname].setFieldsValue({
        idCard: ''
      })
    },
    setheath2 () {
      this[this.nowformname].setFieldsValue({
        healthCondition: this.heathmodel2
      })
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      this[this.nowformname].setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    setIdCard3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        idCard: ''
      })
    },
    setaddress3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        address_Linkage: this.addressmodel3
      })
    },
    setheath3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        healthCondition: this.heathmodel3
      })
    },
    mensetaddress () {
      this.cptAdoptorFrom3.setFieldsValue({
        address_Linkage: this.menaddressmodel
      })
    },
    womensetaddress () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_address_Linkage: this.womenaddressmodel
      })
    },
    mensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        healthCondition: this.menheathmodel
      })
    },
    womensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_healthCondition: this.womenheathmodel
      })
    },
    mensetaddress2 () {
      this.maintenanceFrom3.setFieldsValue({
        address_Linkage: this.menaddressmodel2
      })
    },
    womensetaddress2 () {
      this.maintenanceFrom3.setFieldsValue({
        copy_address_Linkage: this.womenaddressmodel2
      })
    },
    womensetheath2 () {
      this.maintenanceFrom3.setFieldsValue({
        copy_healthCondition: this.womenheathmodel2
      })
    },
    mensetheath2 () {
      this.maintenanceFrom3.setFieldsValue({
        healthCondition: this.menheathmodel2
      })
    },
    // 家庭子女 笔录信息 调查信息 对应的数据变化
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
    async mechanismchange (val) {
      const Fromdata = await this.getsearchmechanismList(val)
      const data = Fromdata.data.data[0]
      for (var key in data) {
        if (key == 'address') {
          this.fiveRaiseFrom.setFieldsValue({
            welfareInstitutionAddress: data[key]
          })
        }
        this.fiveRaiseFrom.setFieldsValue({
          [key]: data[key]
        })
      }
    },
    // 身份证变化引发的赋值
    setFrom (val, dates) {
      if (!this.isvalidator) {
        return false
      }
      if (val.name) {
        const value = val.idCard
        for (var k in val) {
          if (val[k]) {
            if (k == 'adoptionAgencyVo') {
              if (this.childtype <= 2) {
                if (val.inputEnabled == 1) {
                  this.disabled = false
                } else {
                  this.disabled = true
                }

                this.welfareInstitutionId = val[k].welfareInstitutionId
                // this.fiveRaiseFrom.setFieldsValue()
                for (var key in val[k]) {
                  this.fiveRaiseFrom.setFieldsValue({
                    [key]: val[k][key]
                  })
                }
              }
            } else {
              if (k == 'birthday' || k == 'pickupDate' || k == 'enterDate') {
                this.adoptedFrom.setFieldsValue({
                  [k]: this.moment(val[k], 'YYYY-MM-DD')
                })
              } else if (k == 'censusRegisterPro') {
                this.addressmodel = [
                  val.censusRegisterPro || '',
                  val.censusRegisterCity || '',
                  val.censusRegisterCounty || ''
                ]
              } else {
                this.adoptedFrom.setFieldsValue({
                  [k]: val[k]
                })
              }
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
        // this.adoptedFrom.resetFields(arrlist)
        //  送样机构
        if (this.childtype <= 2) {
          this.fiveRaiseFrom.resetFields()
        }
      }
      const dateobj = this.go(dates, dates.length, this, null)
      this.adoptedFrom.setFieldsValue({
        birthday: dateobj.birth ? moment(dateobj.birth) : null,
        sex: dateobj.sex
      })
      if (dateobj.age >= 10) {
        this.istenyear = true
      } else {
        this.istenyear = false
      }
      this.setHeight('one', 'oneout')
    },
    // 机构类表 welfareOrgManagement/queryListByOrgId
    async getmechanismList () {
      const data = await this.post('welfareOrgManagement/queryListByOrgId')
      this.mechanismList = data.data.data
    },
    // 查询机构类表 welfareOrgManagement/queryListByOrgId
    async getsearchmechanismList (val) {
      const params = {
        id: val
      }
      const data = await this.post(
        'welfareOrgManagement/queryListByOrgId',
        params
      )
      return data
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
      this.adisConditionList = await this.getDictionaries('ADISCONDITION')
      this.transmissionWayList = await this.getDictionaries('TRANSMISSIONWAYOTHER')
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
    // 送样tabb切换
    maintancechange (val) {
      // this.maintenanceType = val
      this.sendTabKey = val
      this.nowmaintenanceFrom = 'maintenanceFrom' + val
      if (!this.typedisabled) {
        this.$nextTick(() => {
          this[this.nowmaintenanceFrom].resetFields()
        })
      }
    },
    // 收养tab切换
    chs (val) {
      // this.typeadoption = val
      this.adoptionTabKey = val
      this.nowformname = 'cptAdoptorFrom' + val
      if (!this.typedisabled) {
        this.$nextTick(() => {
          this[this.nowformname].resetFields()
        })
      }
    },
    moment,
    // 获取收养类别ADOPTIONCATEGORY
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue && node) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          if (node) {
            node.style.height = '50px'
          }
        }
        if (node) {
          node.style.transition = 'all 1s'
        }
      })
    },
    // 收养类别change
    selectchange (val) {
      this.istenyear = false
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.$nextTick(() => {
        if (this.childtype != 8) {
          if (this.childtype <= 2) {
            this.fiveRaiseFrom.resetFields()
          } else {
            this.nowmaintenanceFrom = 'maintenanceFrom1'
            this[this.nowmaintenanceFrom].resetFields()
          }
          this.setHeight('three', 'threeout', !this.showthree)
        }
        this.setHeight('one', 'oneout', !this.showone)
        if (this.childtype == 3) {
          this.parentFrom.resetFields()
          this.$nextTick(() => {
            this.setHeight('five', 'fiveout')
          })
        }

        this.adoptedFrom.resetFields()
        if (this.childtype == 6) {
          this.adoptedFrom.setFieldsValue({
            identityCategory: null
          })
        } else {
          this.adoptedFrom.setFieldsValue({
            identityCategory: this.childtype
          })
        }

        this.nowformname = 'cptAdoptorFrom1'
        this.nowmaintenanceFrom = 'maintenanceFrom1'
        if (this[this.nowformname]) {
          this[this.nowformname].resetFields()
          this.adInformationnoteFrom.resetFields()
        }
      })
    },

    // 筛选数据
    screeningData (data) {
      const arrdata = []
      const mendata = {}
      const womandata = {}
      for (var k in data) {
        if (k.includes('copy')) {
          if (k == 'copy_address_Linkage') {
            womandata.address_Linkage = data[k]
          } else {
            const keys = k.split('_')[1]
            womandata[keys] = data[k]
          }
        } else {
          mendata[k] = data[k]
        }
      }
      womandata.sameAddress = mendata.sameAddress
      // 健康状况
      if (mendata.healthCondition) {
        mendata.healthCondition = mendata.healthCondition.join(',')
      }
      if (womandata.healthCondition) {
        womandata.healthCondition = womandata.healthCondition.join(',')
      }
      mendata.sex = '1'
      womandata.sex = '2'
      if (mendata.address_Linkage) {
        mendata.censusRegisterPro = mendata.address_Linkage[0]
        mendata.censusRegisterCity = mendata.address_Linkage[1]
        mendata.censusRegisterCounty = mendata.address_Linkage[2]
        delete mendata.address_Linkage
      }
      if (womandata.address_Linkage) {
        womandata.censusRegisterPro = womandata.address_Linkage[0]
        womandata.censusRegisterCity = womandata.address_Linkage[1]
        womandata.censusRegisterCounty = womandata.address_Linkage[2]
        delete womandata.address_Linkage
      } else {
        womandata.censusRegisterPro = mendata.censusRegisterPro
        womandata.censusRegisterCity = mendata.censusRegisterCity
        womandata.censusRegisterCounty = mendata.censusRegisterCounty
        womandata.censusRegisterDetail = mendata.censusRegisterDetail
      }
      if (mendata.familyIncome) {
        womandata.familyIncome = mendata.familyIncome
        womandata.relationship = mendata.relationship
        womandata.opinion = mendata.opinion
      }
      arrdata.push(mendata, womandata)
      return arrdata
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (data[k]) {
          if (!(data[k] instanceof Array) && data[k] instanceof Object) {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
      }
    },
    // 詳情数组处理
    detailobj (val) {
      for (var k in val[1]) {
        val[1][`copy_${k}`] = val[1][k]
        delete val[1][k]
      }
      const obj = { ...val[0], ...val[1] }
      return obj
    },
    async getimglist () {
      const params = {
        id: this.id
      }
      const data = await this.post('/adoption/getAdoptioPhoto', params)
      if (data.data) {
        const registrationAdoptionVo = data.data.data
        if (registrationAdoptionVo && registrationAdoptionVo.imagefileList) {
          const imgobj = JSON.parse(registrationAdoptionVo.imagefileList)
          imgobj[0].thumbUrl = 'data:image/png;base64,' + imgobj[0].thumbUrl
          this.imgfilelist = imgobj
        }
      }
    },
    // 重置部分数据
    resizeForm (bl) {
      if (bl) {
        this.adoptedFrom.setFieldsValue({
          probablyInfectedWayOther: null
        })
      } else {
        this.adoptedFrom.setFieldsValue({
          aidsSituationOther: null,
          infectionDate: null,
          probablyInfectedWay: null,
          probablyInfectedWayOther: null
        })
      }
    },
    // 获取详情
    async getDetails () {
      const params = {
        id: this.id
      }
      const data = await this.post('/readyAdoptionChildren/queryById', params)
      const obj = data.data.data
      // 情况说明赋值
      const registrationAdoptionVo = obj.registrationAdoptionVo
      // data:image/png;base64,
      // if (registrationAdoptionVo.imagefileList) {
      //   let imgobj = JSON.parse(registrationAdoptionVo.imagefileList)
      //   imgobj[0].thumbUrl = 'data:image/png;base64,' + imgobj[0].thumbUrl
      //   this.imgfilelist = imgobj
      //   console.log(imgobj)
      // }
      // 儿童类别
      const filedis = obj.fileList// fileList
      if (filedis && filedis.length > 0) {
        filedis.map((item) => {
          if (item.busiType == '13') {
            const imgobj = JSON.parse(JSON.stringify(item))
            imgobj.thumbUrl = 'data:image/png;base64,' + imgobj.thumbUrl
            this.imgfilelist.push(imgobj)
          } else {
            this.fileList.push(item)
          }
        })
      }
      this.childtype = obj.adoptionType
      // 被收养人赋值
      const adopteeVo = obj
      adopteeVo.birthday = adopteeVo.birthday ? moment(adopteeVo.birthday) : null
      if (adopteeVo.enterDate) {
        adopteeVo.enterDate = moment(adopteeVo.enterDate)
      }
      if (adopteeVo.publishDate) {
        adopteeVo.publishDate = moment(adopteeVo.publishDate)
      }
      if (adopteeVo.pickupDate) {
        adopteeVo.pickupDate = moment(adopteeVo.pickupDate)
      }
      if (adopteeVo.infectionDate) {
        adopteeVo.infectionDate = moment(adopteeVo.infectionDate)
      }
      const dateobj = this.go(
        adopteeVo.idCard,
        adopteeVo.idCard ? adopteeVo.idCard.length : 0,
        this,
        null
      )
      if (dateobj.age > 10) {
        this.istenyear = true
      } else {
        this.istenyear = false
      }

      // 健康狀況賦值
      if (adopteeVo.health) {
        this.heathmodel = adopteeVo.healthSecondLevel.split(',')
        adopteeVo.healthSecondLevel = adopteeVo.healthSecondLevel.split(',')
        this.heathval = adopteeVo.health
        this.getdisabiliytype(adopteeVo.health)
        this.seriousillnesschange(adopteeVo.healthSecondLevel)
        this.getleave()
        this.setHeight('two', 'twoout')
      }
      // 健康状况
      // registerAdoptionVo.healthCondition = registerAdoptionVo.healthCondition.join(',')
      adopteeVo.censusRegisterDetail = adopteeVo.addrDetaile
      adopteeVo.identityCategory = adopteeVo.adoptionType
      this.$nextTick(() => {
        setTimeout(() => {
          this.adoptedFrom.setFieldsValue(adopteeVo)
          this.addressmodel = [
            adopteeVo.province || '',
            adopteeVo.city || '',
            adopteeVo.country || ''
          ]
        }, 500)
        this.heathForm.setFieldsValue(adopteeVo)
        this.$refs.CptAdopted.loadRadiovalue(adopteeVo.aidsSituation, adopteeVo.probablyInfectedWay)
      })
      // 送样信息处理
      if (this.childtype != 8) {
        if (this.childtype <= 2) {
          const adoptionAgencyVo = obj.adoptionAgencyVo
          this.welfareInstitutionId = obj.adoptionAgencyVo.welfareInstitutionId
          this.fiveRaiseFrom.setFieldsValue(adoptionAgencyVo)
          // 送样机构
        } else {
          // 送养人
          let placingOutPersonVo = {}
          const placingOutPersonVos = obj.placingOutPersonVos
          placingOutPersonVos.map(item => {
            if (item.birthday) {
              item.birthday = item.birthday ? moment(item.birthday) : null
            }
          })
          if (placingOutPersonVos.length > 1) {
            this.sendTabKey = '3'
            this.nowmaintenanceFrom = 'maintenanceFrom3'

            this.issameaddress2 = placingOutPersonVos[0].sameAddress
            this.$nextTick(() => {
              placingOutPersonVo = this.detailobj(placingOutPersonVos)
              if (placingOutPersonVo.healthCondition) {
                this.menheathmodel2 = placingOutPersonVo.healthCondition.split(
                  ','
                )
                placingOutPersonVo.healthCondition = placingOutPersonVo.healthCondition.split(
                  ','
                )
              }
              if (placingOutPersonVo.copy_healthCondition) {
                this.womenheathmodel2 = placingOutPersonVo.copy_healthCondition.split(
                  ','
                )
                placingOutPersonVo.copy_healthCondition = placingOutPersonVo.copy_healthCondition.split(
                  ','
                )
              }

              this.menaddressmodel2 = [
                placingOutPersonVo.censusRegisterPro || '',
                placingOutPersonVo.censusRegisterCity || '',
                placingOutPersonVo.censusRegisterCounty || ''
              ]
              if (this.issameaddress2 != 1) {
                this.womenaddressmodel2 = [
                  placingOutPersonVo.copy_censusRegisterPro || '',
                  placingOutPersonVo.copy_censusRegisterCity || '',
                  placingOutPersonVo.copy_censusRegisterCounty || ''
                ]
              }
            })
          } else {
            placingOutPersonVos[0].sex == 1
              ? (this.sendTabKey = '1')
              : (this.sendTabKey = '2')
            placingOutPersonVos[0].sex == 1
              ? (this.nowmaintenanceFrom = 'maintenanceFrom' + 1)
              : (this.nowmaintenanceFrom = 'maintenanceFrom' + 2)
            placingOutPersonVo = placingOutPersonVos[0]
            this.$nextTick(() => {
              if (placingOutPersonVo.healthCondition) {
                this.heathmodel3 = placingOutPersonVo.healthCondition.split(
                  ','
                )
                placingOutPersonVo.healthCondition = placingOutPersonVo.healthCondition.split(
                  ','
                )
              }
              this.addressmodel3 = [
                placingOutPersonVo.censusRegisterPro || '',
                placingOutPersonVo.censusRegisterCity || '',
                placingOutPersonVo.censusRegisterCounty || ''
              ]
            })
          }
          this.$nextTick(() => {
            this[this.nowmaintenanceFrom].setFieldsValue(placingOutPersonVo)
          })
        }
      }
      // 生父母 parentFrom
      if (this.childtype == 3) {
        const parentsVos = obj.parentsVos
        parentsVos.map(item => {
          if (item.birthday) {
            item.birthday = item.birthday ? moment(item.birthday) : null
          }
        })
        let parentsVo = {}
        this.issameaddress3 = parentsVos[0].sameAddress
        this.$nextTick(() => {
          parentsVo = this.detailobj(parentsVos)
          if (parentsVo.healthCondition) {
            this.parentmenheathmodel = parentsVo.healthCondition.split(',')
            parentsVo.healthCondition = parentsVo.healthCondition.split(',')
          }
          if (parentsVo.copy_healthCondition) {
            this.parentwomenheathmodel = parentsVo.copy_healthCondition.split(
              ','
            )
            parentsVo.copy_healthCondition = parentsVo.copy_healthCondition.split(
              ','
            )
          }

          this.parentmenmodel = [
            parentsVo.censusRegisterPro || '',
            parentsVo.censusRegisterCity || '',
            parentsVo.censusRegisterCounty || ''
          ]
          if (this.issameaddress3 != 1) {
            this.parentwomenmodel = [
              parentsVo.copy_censusRegisterPro || '',
              parentsVo.copy_censusRegisterCity || '',
              parentsVo.copy_censusRegisterCounty || ''
            ]
          }
        })
        // parentFrom
        this.$nextTick(() => {
          this.parentFrom.setFieldsValue(parentsVo)
        })
      }

      // 情况说明
      // registrationAdoptionVo.registerDate = registrationAdoptionVo.registerDate ? moment(registrationAdoptionVo.registerDate) : null
      // this.adInformationnoteFrom.setFieldsValue(registrationAdoptionVo)

      // 家庭子女信息
      this.adoptorChildrenVos = obj.adoptorChildrenVos || []
      // 笔录信息
      this.notesRecordVos = obj.notesRecordVos
      // 调查信息
      this.surveyRecordVos = obj.surveyRecordVos
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        // this.setHeight('three', 'threeout')
        this.setHeight('four', 'fourout')
        if (this.childtype == 3) {
          this.setHeight('five', 'fiveout')
        }
        if (this.childtype != 8) {
          this.setHeight('three', 'threeout')
        }
      })
    },
    // 获取的数据处理

    // 处理数据
    processingData () {
      // 总数据对象
      const registerAdoptionVo = {}
      // 家庭年收入
      const familyIncome = ''
      // 被收养人数据
      let adopteeVo = {}, heathForm = {}

      adopteeVo = Object.assign({}, this.adoptedFrom.getFieldsValue())
      heathForm = Object.assign({}, this.heathForm.getFieldsValue())
      this.changetime(adopteeVo)
      if (adopteeVo.address_Linkage) {
        adopteeVo.censusRegisterPro = adopteeVo.address_Linkage[0] || null
        adopteeVo.censusRegisterCity = adopteeVo.address_Linkage[1] || null
        adopteeVo.censusRegisterCounty = adopteeVo.address_Linkage[2] || null
        delete adopteeVo.address_Linkage
      }

      // 健康状况
      if (adopteeVo.healthCondition) {
        adopteeVo.healthCondition = adopteeVo.healthCondition.join(',')
      }
      registerAdoptionVo.adopteeVo = adopteeVo
      registerAdoptionVo.familyIncome = familyIncome
      if (this.childtype != 8) {
        // 送样信息处理
        if (this.childtype <= 2) {
          const fromData = Object.assign({}, this.fiveRaiseFrom.getFieldsValue())
          this.changetime(fromData)
          // 送样机构
          let adoptionAgencyVo = {}
          adoptionAgencyVo = Object.assign(
            { welfareInstitutionId: this.welfareInstitutionId },
            fromData
          )
          registerAdoptionVo.adoptionAgencyVo = adoptionAgencyVo
        } else {
          // 送养人
          let placingOutPersonVos = []
          // nowmaintenanceFrom
          const PlacingOutPersonVo = Object.assign(
            {},
            this[this.nowmaintenanceFrom].getFieldsValue()
          )
          this.changetime(PlacingOutPersonVo)
          if (this.sendTabKey == 3) {
            placingOutPersonVos = this.screeningData(PlacingOutPersonVo)
          } else {
            // 1男 2 女
            PlacingOutPersonVo.sex = this.sendTabKey
            PlacingOutPersonVo.keyMember = 1
            // 健康状况
            if (PlacingOutPersonVo.healthCondition) {
              PlacingOutPersonVo.healthCondition = PlacingOutPersonVo.healthCondition.join(
                ','
              )
            }
            if (PlacingOutPersonVo.address_Linkage) {
              PlacingOutPersonVo.censusRegisterPro =
                PlacingOutPersonVo.address_Linkage[0]
              PlacingOutPersonVo.censusRegisterCity =
                PlacingOutPersonVo.address_Linkage[1]
              PlacingOutPersonVo.censusRegisterCounty =
                PlacingOutPersonVo.address_Linkage[2]
            }
            delete PlacingOutPersonVo.address_Linkage
            placingOutPersonVos.push(PlacingOutPersonVo)
          }
          // 送不养数据
          registerAdoptionVo.placingOutPersonVos = placingOutPersonVos
        }
      }
      // 生父母 parentFrom
      if (this.childtype == 3) {
        let parentsVos = []
        const parentsVo = Object.assign({}, this.parentFrom.getFieldsValue())
        this.changetime(parentsVo)
        parentsVos = this.screeningData(parentsVo)
        registerAdoptionVo.parentsVos = parentsVos
      }
      // 文件信息
      const upLoadPathIds = []
      const fileids = [
        ...this.fileList,
        ...this.imgfilelist
      ]
      if (fileids.length > 0) {
        fileids.map(item => {
          upLoadPathIds.push(item.response.data.data.fileid)
        })
        registerAdoptionVo.upLoadPathIds = upLoadPathIds
      }

      // 家庭子女信息
      registerAdoptionVo.adoptorChildrenVos = this.adoptorChildrenVos

      // 笔录信息
      registerAdoptionVo.notesRecordVos = this.notesRecordVos
      // 调查信息
      registerAdoptionVo.surveyRecordVos = this.surveyRecordVos

      // 提交暂存状态
      registerAdoptionVo.submitYesOrNo = this.submitYesOrNo

      // 是否补录
      registerAdoptionVo.additionalYesOrNo = this.additionalYesOrNo
      // 收养类别
      registerAdoptionVo.adoptionCategory = this.childtype
      // 健康状况
      registerAdoptionVo.heathForm = heathForm
      return registerAdoptionVo
    },
    // 补全材料
    async completionsubmit () {
      const params = {
        bizKey: this.id
      }
      const upLoadPathIds = []
      const fileids = [
        ...this.fileList,
        ...this.adoptionfileList,
        ...this.adopterfileList
      ]
      fileids.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      if (upLoadPathIds.length == 0) {
        this.$message.error('请上传文件')
        return false
      }
      params.upLoadPathIds = upLoadPathIds
      const res = await this.post('/adoption/annex', params, true)
      if (res.errors == null) {
        this.$message.success('提交成功')

        this.backs()
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    // 提交按钮
    async submit (val) {
      // validatesRegisters
      this.isvalidator = false
      // this.$nextTick(async () => {
      let isok = true
      this.submitYesOrNo = val
      const baseData = this.adoptedFrom.getFieldsValue()
      if (val != 0) {
        if (this.childtype == 3) {
         await this.parentFrom.validateFields((err, values) => {
           if (err) {
             isok = false
             this.nowkey = '1'
           }
            // if (err) {
            //   if (val == 0) {
            //     for (const k in err) {
            //       if (!this.parentFrom.getFieldsValue()[k]) {
            //         this.parentFrom.resetFields(k)
            //       } else {
            //         isok = false
            //         this.nowkey = '1'
            //       }
            //     }
            //   } else {
            //     isok = false
            //     this.nowkey = '1'
            //   }
            // } else {
            //   isok = true
            // }
          })
        }
        if (this.childtype != 8) {
          // 送养人信息
          if (this.childtype > 2) {
           await this[this.nowmaintenanceFrom].validateFields((err, values) => {
              if (err) {
                isok = false
                this.nowkey = '1'
              }
              // if (err) {
              //   if (val == 0) {
              //     for (const k in err) {
              //       if (!this[this.nowmaintenanceFrom].getFieldsValue()[k]) {
              //         this[this.nowmaintenanceFrom].resetFields(k)
              //       } else {
              //         isok = false
              //         this.nowkey = '1'
              //       }
              //     }
              //   } else {
              //     isok = false
              //     this.nowkey = '1'
              //   }
              // } else {
              //   isok = true
              // }
            })
          } else {
           await this.fiveRaiseFrom.validateFields((err, values) => {
              if (err) {
                isok = false
                this.nowkey = '1'
              }

              // if (err) {
              //   if (val == 0) {
              //     for (const k in err) {
              //       if (!this.fiveRaiseFrom.getFieldsValue()[k]) {
              //         this.fiveRaiseFrom.resetFields(k)
              //       } else {
              //         isok = false
              //         this.nowkey = '1'
              //       }
              //     }
              //   } else {
              //     isok = false
              //     this.nowkey = '1'
              //   }
              // } else {
              //   isok = true
              // }
            })
          }
        }
        // 被收养人信息 isupload
        // if(this.imgfilelist.length==0)
        await this.adoptedFrom.validateFields((err, values) => {
          if (err) {
            isok = false
            this.nowkey = '1'
          }
          // if (err) {
          //   if (val == 0) {
          //     for (const k in err) {
          //       if (!this.adoptedFrom.getFieldsValue()[k] && (k != 'idCard' && k != 'name')) {
          //         this.adoptedFrom.resetFields(k)
          //       } else {
          //         isok = false
          //         this.nowkey = '1'
          //       }
          //     }
          //   } else {
          //     isok = false
          //     this.nowkey = '1'
          //   }
          // } else {
          //   isok = true
          // }
        })
        await this.heathForm.validateFields((err, values) => {
          if (err) {
            isok = false
            this.nowkey = '1'
          }
          // if (err) {
          //   if (val == 0) {
          //     for (const k in err) {
          //       if (!this.heathForm.getFieldsValue()[k] && (k != 'idCard' && k != 'name')) {
          //         this.heathForm.resetFields(k)
          //       } else {
          //         isok = false
          //         this.nowkey = '1'
          //       }
          //     }
          //   } else {
          //     isok = false
          //     this.nowkey = '1'
          //   }
          // } else {
          //   isok = true
          // }
        })
        // 情况说明
        await this.fileForm.validateFields((err, values) => {
          if (err) {
            isok = false
            this.nowkey = '5'
          }
          // if (err) {
          //   if (val == 0) {
          //     for (const k in err) {
          //       if (!this.fileForm.getFieldsValue()[k]) {
          //         this.fileForm.resetFields(k)
          //       } else {
          //         isok = false
          //         this.nowkey = '5'
          //       }
          //     }
          //   } else {
          //     isok = false
          //     this.nowkey = '5'
          //   }
          // } else {
          //   isok = true
          // }
        })
      } else {
        isok = false
      }
      
      if (isok || (val == 0 && baseData.name)) {
        const data = this.processingData()
        // 新添加字段
        data.validatesRegisters = this.validatesRegisters
        const url = val == '0' ? '/readyAdoptionChildren/save' : '/readyAdoptionChildren/submit'
        const text = '保存成功'
        // if (this.id) {
        //   // 编辑
        //   url = val == 0 ? '/adoption/tempupdate' : '/adoption/update'
        //   data.bizKey = this.id
        //   text = '编辑成功'
        // } else {
        //   // 新增
        //   url = val == 0 ? '/adoption/tempregister' : '/adoption/register'
        //   text = '新增成功'
        // }
        let finData = {}
        finData = data.adopteeVo
        finData.parentsVos = data.parentsVos
        finData.placingOutPersonVos = data.placingOutPersonVos
        finData = Object.assign(finData, data.heathForm)
        finData.healthSecondLevel = finData.healthSecondLevel ? finData.healthSecondLevel.join(',') : ''
        finData.province = finData.censusRegisterPro
        finData.city = finData.censusRegisterCity
        finData.country = finData.censusRegisterCounty
        finData.addrDetaile = finData.censusRegisterDetail
        finData.adoptionType = this.childtype
        finData.upLoadPathIds = data.upLoadPathIds
        finData.reserve2 = 1
        if (this.id) {
          finData.id = this.id
        }
        // console.log(finData)
        if (url) {
          // return false
        }
        const res = await this.post(url, finData, true)
        if (res.errors == null) {
          this.$message.success(text)
          if (val == 1 && this.additionalYesOrNo == 0) {
            this.printshow = true
            this.printId = res.data.data
          } else {
            this.backs()
          }
        } else {
          const errlist = ['E0001', 'E0002', 'E0003', 'E0004']
          if (res.errors.length > 0) {
            if (errlist.includes(res.errors[0].errorCode)) {
              // this.validatesRegisters.push(res.errors[0].errorCode)
              this.$confirm({
                title: res.errors[0].msg,
                onOk: () => {
                  // this.submit(val)
                }
                // onCancel: () => {
                //   console.log('Cancel')
                // }
              })
            }
          }
        }
      } else {
        // 导航切换
        // this.nowkey = '1'
        if (val == 0) {
          this.$message.error('界面中至少填写儿童姓名，暂存失败')
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      }
      // })
    },
    printOk () {
      this.isprint = true
      this.printshow = false
      this.nowkey = '6'
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    backs () {
      // this.$router.go(-1)
      const nameType = this.$route.query.type == 'detail' ? 'childrenCanSuretList' : 'childrenCanBeSentList'
      this.resizeFormField()
      this.$router.push({
        name: nameType
      })
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    },
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    },
    adoptionTabKey () {
      this.setHeight('two', 'twoout', !this.showtwo)
      // this.cptAdoptorFrom.resetFields()
    },
    sendTabKey () {
      this.setHeight('three', 'threeout', !this.showthree)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin-left: 20px;
}

.fromwid {
  width: 424px;
  margin-top: 5px;
  padding: 10px 0;
  background: #fff;
  width: 100%;
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
