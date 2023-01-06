<template>
  <div>
    <ta-form layout="inline"
             class="fromwid">
      <ta-form-item label="收养类别:"
                    :require="{message:'请选择'}"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-select v-model="childtype"
                   class="selectwid"
                   @change="selectchange"
                   :disabled="true">
          <ta-select-option v-for="(item,index) in adoptionlist"
                            :value="item.value"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item v-if="applicantval"
                    label="申请人:"
                    :require="{message:'请选择证件类型'}"
                    :labelCol="{span:6}"
                    :wrapperCol="{span:18}">
        <ta-select v-model="applicant"
                   class="selectwid"
                   placeholder="请选择申请人"
                   @change="applicantchange"
                   :disabled="true">
          <ta-select-option v-for="(item,index) in applicantlist"
                            :value="item.value"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-form>
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="被收养人信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               ref="one"
               :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
        <div v-if="this.additionalYesOrNo!='1'">
          <CptAdopted :typesadopteestatusList='typesadopteestatusList'
                      :additionalYesOrNo='additionalYesOrNo'
                      @setheath='setheath'
                      :isAdoptAdd="true"
                      :adoptive="adoptive"
                      :heathmodel='heathmodel'
                      :istenyear.sync="istenyear"
                      :isshowOpiton="isshowOpiton"
                      :basedisabled="basedisabled"
                      @setaddress="setaddress"
                      :addressmodel="addressmodel"
                      :childtype="childtype"
                      :sexList="sexList"
                      :nationList="nationList"
                      :healthList="healthList"
                      :isDisabled="true"
                      :beforeYear="beforeYear"
                      :cultureList="cultureList"
                      :adoptionlist="adoptionlist"
                      :nationalityList="nationalityList"
                      :marriageyList="marriageyList"
                      :occupattioList="occupattioList"
                      :heathlist="heathlist"
                      :heathval="heathval"
                      :disabiliytypelist="disabiliytypelist"
                      :serioushval="serioushval"
                      :canjileave="canjileave"
                      @onChange="onChange"
                      @seriousillnesschange="seriousillnesschange"
                      @mechanismchange="mechanismchange"
                      @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                      :id="id"
                      ref="adoptedFrom"></CptAdopted>
        </div>
        <div v-if="this.additionalYesOrNo=='1'">
          <CptAdoptedBl :typesadopteestatusList='typesadopteestatusList'
                        :additionalYesOrNo='additionalYesOrNo'
                        @setheath='setheath'
                        :istenyear.sync="istenyear"
                        :isshowOpiton="isshowOpiton"
                        :heathmodel='heathmodel'
                        :isAdoptAdd="true"
                        :adoptive="adoptive"
                        :basedisabled="basedisabled"
                        @setaddress="setaddress"
                        :addressmodel="addressmodel"
                        :childtype="childtype"
                        :sexList="sexList"
                        :nationList="nationList"
                        :healthList="healthList"
                        :isDisabled="true"
                        :beforeYear="beforeYear"
                        :cultureList="cultureList"
                        :adoptionlist="adoptionlist"
                        :nationalityList="nationalityList"
                        :marriageyList="marriageyList"
                        :occupattioList="occupattioList"
                        :heathlist="heathlist"
                        :heathval="heathval"
                        :disabiliytypelist="disabiliytypelist"
                        :serioushval="serioushval"
                        :canjileave="canjileave"
                        @onChange="onChange"
                        @seriousillnesschange="seriousillnesschange"
                        @mechanismchange="mechanismchange"
                        @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                        :id="id"
                        ref="adoptedFrom"></CptAdoptedBl>
        </div>

      </ta-form>
    </div>
    <div ref="twoout"
         class="mars">
      <Title id="anchorpoint_b"
             title="收养人信息"
             :show.sync="showtwo"></Title>
      <ta-tabs class="fromcom"
               @change="chs"
               :activeKey="adoptionTabKey"
               type="card"
               ref="two">
        <ta-tab-pane tab="男方单独收养"
                     key="1">
          <ta-form layout="horizontal"
                   :autoFormCreate="(cptAdoptorFrom1)=>{this.cptAdoptorFrom1 = cptAdoptorFrom1}">
            <AdoptionAlone @setheath='setheath2'
                           :additionalYesOrNo='additionalYesOrNo'
                           :heathmodel='heathmodel2'
                           :basedisabled="basedisabled"
                           @setaddress="setaddress2"
                           :addressmodel="addressmodel2"
                           :sexList="sexList"
                           :adoptive="adoptive"
                           :nationList="nationList"
                           :healthList="healthList"
                           :cultureList="cultureList"
                           :identityList="identityList"
                           :marriageyList="marriageyList"
                           :nationalityList="nationalityList"
                           :occupattioList="occupattioList"
                           :idcardTypeList="idcardTypeList"
                           :familyincomeList='familyincomeList'></AdoptionAlone>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="女方单独收养"
                     key="2">
          <ta-form layout="horizontal"
                   :autoFormCreate="(cptAdoptorFrom2)=>{this.cptAdoptorFrom2 = cptAdoptorFrom2}">
            <AdoptionAlone @setheath='setheath2'
                           :additionalYesOrNo='additionalYesOrNo'
                           :heathmodel='heathmodel2'
                           :basedisabled="basedisabled"
                           @setaddress="setaddress2"
                           :addressmodel="addressmodel2"
                           :sexList="sexList"
                           :adoptive="adoptive"
                           :nationList="nationList"
                           :healthList="healthList"
                           :cultureList="cultureList"
                           :identityList="identityList"
                           :marriageyList="marriageyList"
                           :nationalityList="nationalityList"
                           :occupattioList="occupattioList"
                           :idcardTypeList="idcardTypeList"
                           :familyincomeList='familyincomeList'></AdoptionAlone>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="夫妻双方共同收养"
                     key="3">
          <ta-form layout="horizontal"
                   :autoFormCreate="(cptAdoptorFrom3)=>{this.cptAdoptorFrom3 = cptAdoptorFrom3}">
            <JointAdoption :issameaddress.sync='issameaddress1'
                           @mensetheath='mensetheath'
                           :adoptive="adoptive"
                           :additionalYesOrNo='additionalYesOrNo'
                           @womensetheath='womensetheath'
                           :menheathmodel='menheathmodel'
                           :womenheathmodel='womenheathmodel'
                           :basedisabled="basedisabled"
                           @mensetaddress="mensetaddress"
                           @womensetaddress="womensetaddress"
                           :menaddressmodel="menaddressmodel"
                           :womenaddressmodel="womenaddressmodel"
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
                           :familyincomeList='familyincomeList'></JointAdoption>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
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
                     :adoptive="adoptive"
                     :isrequire="isrequire"
                     :isbulu="isbulu"
                     :additionalYesOrNo='additionalYesOrNo'
                     :mechanismList="mechanismList"
                     :basedisabled="basedisabled"
                     :relationsadopteesList="relationsadopteesList"
                     :disabled="true"></FiveRaise>
        </ta-form>
      </template>
      <template v-else>
        <ta-tabs class="fromcom"
                 :activeKey="sendTabKey"
                 type="card"
                 ref="three">
          <ta-tab-pane tab="男方单独送养"
                       key="1">
            <ta-form layout="horizontal"
                     :autoFormCreate="(maintenanceFrom1)=>{this.maintenanceFrom1 = maintenanceFrom1}">
              <AdoptionAlone @setheath='setheath3'
                             :additionalYesOrNo='additionalYesOrNo'
                             :heathmodel='heathmodel3'
                             :adoptive="adoptive"
                             :basedisabled="basedisabled"
                             :isshow1="isshow1"
                             :isrequire="isrequire"
                             :isshyang="true"
                             @changeDeath="changeDeath"
                             @setaddress="setaddress3"
                             :addressmodel="addressmodel3"
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
                             :familyincomeList='familyincomeList'></AdoptionAlone>
            </ta-form>
          </ta-tab-pane>
          <ta-tab-pane tab="女方单独送养"
                       key="2">
            <ta-form layout="horizontal"
                     :autoFormCreate="(maintenanceFrom2)=>{this.maintenanceFrom2 = maintenanceFrom2}">
              <AdoptionAlone @setheath='setheath3'
                             :heathmodel='heathmodel3'
                             :adoptive="adoptive"
                             :additionalYesOrNo='additionalYesOrNo'
                             :basedisabled="basedisabled"
                             @setaddress="setaddress3"
                             :isshow1="isshow1"
                             :isrequire="isrequire"
                             :isshyang="true"
                             @changeDeath="changeDeath"
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
                             :familyincomeList='familyincomeList'></AdoptionAlone>
            </ta-form>
          </ta-tab-pane>
          <ta-tab-pane tab="夫妻双方共同送养"
                       key="3">
            <ta-form layout="horizontal"
                     :autoFormCreate="(maintenanceFrom3)=>{this.maintenanceFrom3 = maintenanceFrom3}">
              <JointAdoption :issameaddress.sync='issameaddress2'
                             @mensetheath='mensetheath2'
                             :adoptive="adoptive"
                             :isrequire="isrequire"
                             :isshyang="true"
                             @womensetheath='womensetheath2'
                             :additionalYesOrNo='additionalYesOrNo'
                             :menheathmodel='menheathmodel2'
                             :womenheathmodel='womenheathmodel2'
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
                             :familyincomeList='familyincomeList'></JointAdoption>
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
                       @parentmensetheath='parentmensetheath'
                       @parentwomensetheath='parentwomensetheath'
                       :parentmenheathmodel='parentmenheathmodel'
                       :parentwomenheathmodel='parentwomenheathmodel'
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
                       :idcardTypeList="idcardTypeList"
                       @clearErrorInfo="clearErrorInfo"
                       ref="parentFrom"></NotcptAdoptor>
      </ta-form>
    </div>

  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import CptAdoptedBl from './cptAdoptedBl'
import CptAdopted from './cptAdopted'
import AdoptionAlone from './adoptionAlone'
import JointAdoption from './jointAdoption'
import FiveRaise from './fiveRaise'
import NotcptAdoptor from './notcptAdoptor'
import moment from 'moment'
import { setTimeout } from 'timers'
export default {
  components: {
    Title,
    CptAdopted,
    CptAdoptedBl,
    AdoptionAlone,
    JointAdoption,
    FiveRaise,
    NotcptAdoptor
  },
  props: {
    thisP: {
      required: true
    },
    isbulu: {
      type: String
    },
    basedisabled: {
      type: Boolean,
      required: true
    },
    notSubmit: {
      type: Boolean,
      required: true
    },
    isnext: {
      type: Boolean,
      default: false
    },
    adoptive: {
      type: Boolean,
      default: false
    },
    jichu: {
      type: Boolean,
      default: false
    },
    additionalYesOrNo: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    adoptionCategory: {
      type: String,
      default: ''
    },
    applicantval: {
      type: String
    }

  },
  data () {
    return {
      familyIncome: '', // 家庭收入
      isshowFile: false,
      isshow1: false,
      isrequire: false,
      beforeYear: false,
      isshowOpiton: false,
      heathlist: [],
      heathval: '0',
      disabiliytypelist: [],
      canjileave: [],
      serioushval: false,
      childtype: '',
      addressmodel: [],
      sexList: [],
      nationList: [],
      healthList: [],
      cultureList: [],
      identityList: [],
      nationalityList: [],
      marriageyList: [],
      occupattioList: [],
      idcardTypeList: [],
      relationsadopteesList: [],
      eelationsApplicantsList: [],
      mechanismList: [],
      adoptionlist: [],
      istenyear: false,
      showone: true,
      showtwo: true,
      showthree: true,
      showfive: true,
      adoptionTabKey: '1',
      sendTabKey: '1',
      typeadoption: '1',
      nowformname: 'cptAdoptorFrom1',
      nowmaintenanceFrom: 'maintenanceFrom1',
      addressmodel2: [],
      menaddressmodel: [],
      womenaddressmodel: [],
      addressmodel3: [],
      womenaddressmodel2: [],
      menaddressmodel2: [],
      parentmenmodel: [],
      parentwomenmodel: [],
      applicantlist: [],
      applytype: '1',
      applicant: '',
      heathmodel: [],
      heathmodel2: [],
      menheathmodel: [],
      womenheathmodel: [],
      heathmodel3: [],
      womenheathmodel2: [],
      menheathmodel2: [],
      parentwomenheathmodel: [],
      parentmenheathmodel: [],
      typesadopteestatusList: [],
      familyincomeList: [],
      issameaddress1: '0',
      issameaddress2: '0',
      issameaddress3: '0',
      dateobj: {}
    }
  },
  activated () {
    this.loaddata()
    this.getmechanismList()
    setTimeout(() => {
      this.getDetails()
    })
  },
  mounted () {
    this.gettypeCertification()
    this.getchildtype()
    this.getsex()
    this.getnation()
    this.getleave()
    this.getheathio()
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
    this.getapplicant()
    this.gettypesadopteestatus()
    this.getfamilyincome()
  },
  methods: {
    loaddata () {
      this.familyIncome = ''
      this.dateobj = {}
      this.isshow1 = false
      this.isshowFile = false
      this.beforeYear = false
      this.isrequire = false
      this.isshowOpiton = false
      this.issameaddress1 = '0'
      this.issameaddress2 = '0'
      this.issameaddress3 = '0'
      this.typeadoption = '1'
      this.childtype = ''
      this.istenyear = false
      this.applytype = '1'
      this.ishide = true
      this.welfareInstitutionId = ''
      this.heathmodel = []
      this.heathmodel2 = []
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.nowformname = 'cptAdoptorFrom1'
      this.nowmaintenanceFrom = 'maintenanceFrom1'
      this.fiveRaiseFrom.resetFields()
      this[this.nowformname].resetFields()
      this.adoptedFrom.resetFields()
      this.adoptedFrom.setFieldsValue({
        identityCategory: this.childtype
      })
    },
    // 申请人change
    applicantchange (val) {
      this.$emit('updata:applicantval', val)
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
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      if (!this.jichu) {
        this.istenyear = age >= 8
      }
      this.setHeight('one', 'oneout')
      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
    },
    async mechanismchange (val) {
      this.adoptedFrom.setFieldsValue({
        name: null
      })
      this.post('welfareOrgManagement/queryListByOrgId', { id: val }).then(
        (res) => {
          if (res.serviceSuccess) {
            const data = res.data.data[0]
            for (var key in data) {
              if (key == 'address') {
                this.fiveRaiseFrom.setFieldsValue({
                  welfareInstitutionAddress: data[key]
                })
              }
              if (key == 'orgName') {
                this.fiveRaiseFrom.setFieldsValue({
                  welfareInstitutionName: data[key]
                })
              }
              if (key == 'id') {
                this.welfareInstitutionId = data[key]
              }
              this.fiveRaiseFrom.setFieldsValue({
                [key]: data[key]
              })
            }
          }
        }
      )
    },
    // 获取详情
    async getDetails (v) {
      let obj = []
      let obj2 = []
      let data = []
      let data2 = []
      if (this.id || v) {
        if (this.id || v) {
          const params = {
            id: this.id || v
          }
          if (this.isnext == true) {
            data2 = await this.post('/adoption/queryRelieveById', params)
            data = await this.post('/adoption/queryRegisterById', params)
          } else {
            data = await this.post('/adoption/queryRegisterById', params)
          }
        }
        if (this.isnext == true) {
          obj = data.data.data
          obj2 = data2.data.data
        } else {
          obj = data.data.data
        }
        this.thisP.additionalYesOrNo = obj.registrationAdoptionVo.additionalYesOrNo

        // 情况说明赋值
        const registrationAdoptionVo = obj.registrationAdoptionVo
        if (registrationAdoptionVo.registerDate) {
          const years = registrationAdoptionVo.registerDate.substring(0, 4)
          if (+years < 2021) {
            this.beforeYear = true
          } else {
            this.beforeYear = false
          }
        }
        if (registrationAdoptionVo.imagefileList) {
          const imgobj = JSON.parse(registrationAdoptionVo.imagefileList)
          imgobj[0].thumbUrl = 'data:image/png;base64,' + imgobj[0].thumbUrl
          this.imgfilelist = imgobj
        }
        // 儿童类别
        if (this.isnext == true) {
          this.childtype = this.adoptionCategory
        } else {
          this.childtype = registrationAdoptionVo.adoptionCategory
        }

        if (this.childtype == 4) {
          this.isshow1 = true
        } else {
          this.isshow1 = false
        }
        // 被收养人赋值
        const adopteeVo = this.isnext == true ? obj2.relieveAdopteeVo : obj.adopteeVo
        const nowBirth = moment(new Date()).format('YYYY-MM-DD').split('-').join('')
        const oldBirth = adopteeVo.birthday.split('-').join('')
        const AgeNum = nowBirth - oldBirth
        this.istenyear = AgeNum >= 80000
        adopteeVo.birthday = moment(adopteeVo.birthday)
        if (adopteeVo.enterDate) {
          adopteeVo.enterDate = moment(adopteeVo.enterDate)
        }
        if (adopteeVo.publishDate) {
          adopteeVo.publishDate = moment(adopteeVo.publishDate)
        }
        if (adopteeVo.pickupDate) {
          adopteeVo.pickupDate = moment(adopteeVo.pickupDate)
        }
        if (adopteeVo.idCard) {
          this.dateobj = this.go(
            adopteeVo.idCard,
            adopteeVo.idCard ? adopteeVo.idCard.length : 0,
            this,
            null
          )
          this.istenyear = this.dateobj.age >= 8
        }
        if (adopteeVo.opinion) {
          this.isshowOpiton = true
        } else {
          this.isshowOpiton = false
          this.istenyear = false
        }
        // 健康狀況賦值
        // 健康狀況賦值
        if (adopteeVo.healthCondition) {
          this.heathmodel = adopteeVo.healthCondition.split(',')
          this.getdisabiliytype(adopteeVo.healthCondition)
        }
        // 健康状况
        if (adopteeVo.healthSecondLevel) {
          adopteeVo.healthSecondLevel = adopteeVo.healthSecondLevel.split(',')
          if (
            adopteeVo.healthSecondLevel[adopteeVo.healthSecondLevel.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
            adopteeVo.healthSecondLevel[adopteeVo.healthSecondLevel.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
          ) {
            this.serioushval = true
          } else {
            this.serioushval = false
          }
          this.heathval = adopteeVo.healthCondition
        } else {
          this.heathval = ''
        }

        this.$nextTick(() => {
          this.$emit('setBirthDay', adopteeVo.birthday.format('YYYY-MM-DD'))
          setTimeout(() => {
            this.addressmodel = [
              adopteeVo.censusRegisterPro || '',
              adopteeVo.censusRegisterCity || '',
              adopteeVo.censusRegisterCounty || '',
              adopteeVo.censusRegisterTown || ''
            ]
            this.adoptedFrom.setFieldsValue(adopteeVo)
          }, 500)
          if (this.childtype == 1 || this.childtype == 2) {
            this.post('adoption/queryChildBaseInfoByOrgIdAndName', { orgId: this.isnext == true ? (obj2.relieveAdoptionAgencyVo.welfareInstitutionId ? obj2.relieveAdoptionAgencyVo.welfareInstitutionId.trim() : '') : (obj.adoptionAgencyVo.welfareInstitutionId ? obj.adoptionAgencyVo.welfareInstitutionId.trim() : '') }).then((res) => {
              if (res.serviceSuccess) {
                this.$refs.adoptedFrom.childrenNameList = res.data.data
              }
              this.$nextTick(() => {
                setTimeout(() => {
                  this.adoptedFrom.setFieldsValue({ name: adopteeVo.name })
                }, 300)
              })
            })
          }
          this.$emit('getData', obj2)
          // this.adoptedFrom.setFieldsValue({
          //   healthCondition: [adopteeVo.healthCondition]
          // })
          //  adopteeVo.healthCondition = [adopteeVo.healthCondition]
        })

        // 收养人信息
        const adoptorVos = this.isnext == true ? obj2.relieveAdoptorVos : obj.adoptorVos
        adoptorVos.map((item, index) => {
          item.birthday = moment(item.birthday)
        })
        let adoptorVo = {}
        if (adoptorVos.length > 1) {
          // 主申请人
          if (adoptorVos[0].keyMember == 1) {
            this.applytype = '1'
            this.applicant = '1'
          } else {
            this.applicant = '2'
            this.applytype = '0'
          }

          this.adoptionTabKey = '3'
          this.nowformname = 'cptAdoptorFrom' + 3
          this.issameaddress1 = adoptorVos[0].sameAddress

          adoptorVo = this.detailobj(adoptorVos)
          this.$nextTick(() => {
            this.menheathmodel = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            adoptorVo.healthCondition = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            this.womenheathmodel = adoptorVo.copy_healthCondition ? adoptorVo.copy_healthCondition.split(',') : []
            adoptorVo.copy_healthCondition = adoptorVo.copy_healthCondition ? adoptorVo.copy_healthCondition.split(',') : []
            this.menaddressmodel = [
              adoptorVo.censusRegisterPro,
              adoptorVo.censusRegisterCity,
              adoptorVo.censusRegisterCounty,
              adoptorVo.censusRegisterTown
            ]
          })

          setTimeout(() => {
            if (this.issameaddress1 != 1) {
              this.womenaddressmodel = [
                adoptorVo.copy_censusRegisterPro || '',
                adoptorVo.copy_censusRegisterCity || '',
                adoptorVo.copy_censusRegisterCounty || '',
                adoptorVo.copy_censusRegisterTown || ''
              ]
            }
          }, 500)
        } else {
          adoptorVos[0].sex == 1 ? this.applicant = '1' : this.applicant = '2'
          adoptorVos[0].sex == 1 ? this.adoptionTabKey = '1' : this.adoptionTabKey = '2'
          adoptorVos[0].sex == 1 ? this.nowformname = 'cptAdoptorFrom' + 1 : this.nowformname = 'cptAdoptorFrom' + 2
          adoptorVo = adoptorVos[0]
          this.$nextTick(() => {
            // 健康狀況賦值
            this.heathmodel2 = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            adoptorVo.healthCondition = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            this.addressmodel2 = [
              adoptorVo.censusRegisterPro || '',
              adoptorVo.censusRegisterCity || '',
              adoptorVo.censusRegisterCounty || '',
              adoptorVo.censusRegisterTown || ''
            ]
          })
        }
        // 家庭年收入
        this.$nextTick(() => {
          this.familyIncome = obj.familyIncome
          adoptorVo.familyIncome = obj.familyIncome
          this[this.nowformname].setFieldsValue(adoptorVo)
        })

        // 送样信息处理
        if (this.childtype != 8) {
          if (this.childtype <= 2) {
            const adoptionAgencyVo = this.isnext == true ? obj2.relieveAdoptionAgencyVo : obj.adoptionAgencyVo
            this.$nextTick(() => {
              this.adoptedFrom.setFieldsValue({
                welfareInstitutionName: adoptionAgencyVo.welfareInstitutionName
              })
            })
            this.welfareInstitutionId = adoptionAgencyVo.welfareInstitutionId
            this.fiveRaiseFrom.setFieldsValue(adoptionAgencyVo)
            if (this.adoptive && this.dateobj.age >= 18) {
              this.isrequire = true
            }
            // 送样机构
          } else {
            // 送养人
            let placingOutPersonVo = {}
            const placingOutPersonVos = this.isnext == true ? obj2.relievePlacingOutPersonVos : obj.placingOutPersonVos
            if (placingOutPersonVos && placingOutPersonVos.length == 1) {
              if (placingOutPersonVos[0].isDeath == '1') {
                this.isshowFile = true
                this.isrequire = true
              } else {
                this.isshowFile = false
                this.isrequire = false
              }
            }
            if (this.adoptive && this.dateobj.age >= 18) {
              this.isrequire = true
            }
            placingOutPersonVos.map(item => {
              item.birthday = moment(item.birthday)
              // item.idCard = item.smIdCard
            })
            if (placingOutPersonVos.length > 1) {
              this.sendTabKey = '3'
              this.nowmaintenanceFrom = 'maintenanceFrom3'
              this.issameaddress2 = placingOutPersonVos[0].sameAddress

              this.$nextTick(() => {
                placingOutPersonVo = this.detailobj(placingOutPersonVos)
                this.menheathmodel2 = placingOutPersonVo.healthCondition ? placingOutPersonVo.healthCondition.split(',') : []
                placingOutPersonVo.healthCondition = placingOutPersonVo.healthCondition ? placingOutPersonVo.healthCondition.split(',') : []
                this.womenheathmodel2 = placingOutPersonVo.copy_healthCondition ? placingOutPersonVo.copy_healthCondition.split(',') : []
                placingOutPersonVo.copy_healthCondition = placingOutPersonVo.copy_healthCondition ? placingOutPersonVo.copy_healthCondition.split(',') : []

                this.menaddressmodel2 = [
                  placingOutPersonVo.censusRegisterPro || '',
                  placingOutPersonVo.censusRegisterCity || '',
                  placingOutPersonVo.censusRegisterCounty || '',
                  placingOutPersonVo.censusRegisterTown || ''
                ]
                if (this.issameaddress2 != 1) {
                  this.womenaddressmodel2 = [
                    placingOutPersonVo.copy_censusRegisterPro || '',
                    placingOutPersonVo.copy_censusRegisterCity || '',
                    placingOutPersonVo.copy_censusRegisterCounty || '',
                    placingOutPersonVo.copy_censusRegisterTown || ''
                  ]
                }
              })
            } else {
              placingOutPersonVos[0].sex == 1 ? this.sendTabKey = '1' : this.sendTabKey = '2'
              placingOutPersonVos[0].sex == 1 ? this.nowmaintenanceFrom = 'maintenanceFrom' + 1 : this.nowmaintenanceFrom = 'maintenanceFrom' + 2
              placingOutPersonVo = placingOutPersonVos[0]
              this.$nextTick(() => {
                this.heathmodel3 = placingOutPersonVo.healthCondition ? placingOutPersonVo.healthCondition.split(',') : []
                placingOutPersonVo.healthCondition = placingOutPersonVo.healthCondition ? placingOutPersonVo.healthCondition.split(',') : []
                this.addressmodel3 = [
                  placingOutPersonVo.censusRegisterPro || '',
                  placingOutPersonVo.censusRegisterCity || '',
                  placingOutPersonVo.censusRegisterCounty || '',
                  placingOutPersonVo.censusRegisterTown || ''
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
          const parentsVos = this.isnext == true ? obj2.relieveParentsVos : obj.parentsVos
          parentsVos.map(item => {
            item.birthday = moment(item.birthday)
          })
          let parentsVo = {}
          this.issameaddress3 = parentsVos[0].sameAddress
          this.$nextTick(() => {
            // 单亲
            if (parentsVos[0].isOneParent == '0') { // 非单亲
              this.$refs.parentFrom.isman = []
              this.$refs.parentFrom.iswoman = []
            } else if (parentsVos[0].isOneParent == '1') { // 男方单亲
              this.$refs.parentFrom.isman = ['1']
              this.$refs.parentFrom.iswoman = []
            } else if (parentsVos[0].isOneParent == '2') { // 女方单亲
              this.$refs.parentFrom.isman = []
              this.$refs.parentFrom.iswoman = ['2']
            }
            parentsVo = this.detailobj(parentsVos)
            this.parentmenheathmodel = parentsVo.healthCondition ? parentsVo.healthCondition.split(',') : []
            parentsVo.healthCondition = parentsVo.healthCondition ? parentsVo.healthCondition.split(',') : []
            this.parentwomenheathmodel = parentsVo.copy_healthCondition ? parentsVo.copy_healthCondition.split(',') : []
            parentsVo.copy_healthCondition = parentsVo.copy_healthCondition ? parentsVo.copy_healthCondition.split(',') : []

            this.parentmenmodel = [parentsVo.censusRegisterPro || '', parentsVo.censusRegisterCity || '', parentsVo.censusRegisterCounty || '']
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
        this.$emit('setData', registrationAdoptionVo)
        this.$nextTick(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
          if (this.childtype == 3) {
            this.setHeight('five', 'fiveout')
          }
          if (this.childtype != 8) {
            this.setHeight('three', 'threeout')
          }
        })
      }
    },
    changeDeath (val) {
      if (val == '1') {
        this.isshowFile = true
        this.isrequire = true
        if (this.adoptive && this.dateobj.age >= 18) {
          this.isrequire = true
        }
      } else {
        this.isshowFile = false
        this.isrequire = false
      }
    },
    // 清空错误信息
    clearErrorInfo (formName, flag) { // formName为form名字，flag为区分男方（true）、女方（false）标识
      const errorObj = this[formName].getFieldsError()
      for (const j in errorObj) {
        if (flag ? !j.includes('copy') : j.includes('copy')) {
          this[formName].setFields({
            [j]: {
              value: this[formName].getFieldsValue()[j],
              errors: null
            }
          })
        }
      }
    },
    chs (val) {
      this.typeadoption = val
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue && node && node.style) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else if (node && node.style) {
          node.style.height = '50px'
        }
        if (node && node.style) {
          node.style.transition = 'all 1s'
        }
      })
    },
    // FAMILYINCOME 家庭收入
    async getfamilyincome () {
      const data = await this.getDictionaries('FAMILYINCOME')
      this.familyincomeList = data
    },
    async gettypesadopteestatus () {
      const data = await this.getDictionaries('TYPESOFADOPTEESTATUS')
      this.typesadopteestatusList = data
    },
    // 申请人 APPLICANT
    async getapplicant () {
      const data = await this.getDictionaries('APPLICANT')
      this.applicantlist = data
      this.applicant = '1'
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
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
    // RELATIONSAPPLICANTS 与申请人关系
    async getRelationsApplicants () {
      const data = await this.getDictionaries('RELATIONSAPPLICANTS')
      this.eelationsApplicantsList = data
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
    setheath () {
      this.adoptedFrom.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    parentmensetheath () {
      this.parentFrom.setFieldsValue({
        healthCondition: this.parentmenheathmodel
      })
    },
    setheath3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        healthCondition: this.heathmodel3
      })
    },
    mensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        healthCondition: this.menheathmodel
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
    womensetheath () {
      this.cptAdoptorFrom3.setFieldsValue({
        copy_healthCondition: this.womenheathmodel
      })
    },
    parentwomensetheath () {
      this.parentFrom.setFieldsValue({
        copy_healthCondition: this.parentwomenheathmodel
      })
    },
    setheath2 () {
      this[this.nowformname].setFieldsValue({
        healthCondition: this.heathmodel2
      })
    },
    setaddress3 () {
      this[this.nowmaintenanceFrom].setFieldsValue({
        address_Linkage: this.addressmodel3
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
    parentmensetaddress () {
      this.parentFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    parentwomensetaddress () {
      this.parentFrom.setFieldsValue({
        copy_address_Linkage: this.addressmodel
      })
    },
    // TYPEOFCERTIFICATION 出具证明类型
    async gettypeCertification () {
      const data = await this.getDictionaries('TYPEOFCERTIFICATION')
      this.typeCertificationList = data
    },
    selectchange () { },
    // DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
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
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    },
    id: {
      handler: function (val, oldval) {
        this.getDetails(val)
      },
      deep: true
    }

  }
}
</script>
<style lang="less" scoped>
.fromwid {
  margin-top: 24px;
  margin-bottom: 30px;
}
.selectwid {
  width: 224px;
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
