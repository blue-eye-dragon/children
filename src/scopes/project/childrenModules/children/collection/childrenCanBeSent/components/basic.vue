<template>
  <div>
    <!-- <ta-anchor class="md" :offsetTop="100">
        <ta-anchor-link href="#anchorpoint_a" title="被收养人信息" />
        <ta-anchor-link href="#anchorpoint_b" title="收养人信息" />
        <ta-anchor-link v-if="childtype!=8" href="#anchorpoint_c" title="送养人信息" />
        <ta-anchor-link v-if="childtype==3" href="#anchorpoint_e" title="生父母信息" />
        <ta-anchor-link href="#anchorpoint_d" title="情况说明" />
      </ta-anchor> -->
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
        <CptAdopted :typesadopteestatusList='typesadopteestatusList'
                    @setheath='setheath'
                    :heathmodel='heathmodel'
                    :basedisabled="true"
                    @setaddress="setaddress"
                    :addressmodel="addressmodel"
                    :childtype="childtype"
                    :sexList="sexList"
                    :nationList="nationList"
                    :healthList="healthList"
                    :cultureList="cultureList"
                    :adoptionlist="adoptionlist"
                    :nationalityList="nationalityList"
                    :marriageyList="marriageyList"
                    :occupattioList="occupattioList"></CptAdopted>
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
                           :heathmodel='heathmodel2'
                           :basedisabled="true"
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
                           :familyincomeList='familyincomeList'></AdoptionAlone>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="女方单独收养"
                     key="2">
          <ta-form layout="horizontal"
                   :autoFormCreate="(cptAdoptorFrom2)=>{this.cptAdoptorFrom2 = cptAdoptorFrom2}">
            <AdoptionAlone @setheath='setheath2'
                           :heathmodel='heathmodel2'
                           :basedisabled="true"
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
                           :familyincomeList='familyincomeList'></AdoptionAlone>
          </ta-form>
        </ta-tab-pane>
        <ta-tab-pane tab="夫妻双方共同收养"
                     key="3">
          <ta-form layout="horizontal"
                   :autoFormCreate="(cptAdoptorFrom3)=>{this.cptAdoptorFrom3 = cptAdoptorFrom3}">
            <JointAdoption :issameaddress.sync='issameaddress1'
                           @mensetheath='mensetheath'
                           @womensetheath='womensetheath'
                           :menheathmodel='menheathmodel'
                           :womenheathmodel='womenheathmodel'
                           :basedisabled="true"
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
                     :mechanismList="mechanismList"
                     :basedisabled="true"
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
                             :heathmodel='heathmodel3'
                             :basedisabled="true"
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
                             :basedisabled="true"
                             @setaddress="setaddress3"
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
                             @womensetheath='womensetheath2'
                             :menheathmodel='menheathmodel2'
                             :womenheathmodel='womenheathmodel2'
                             :basedisabled="true"
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
                       :basedisabled="true"
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

  </div>
</template>
<script>
import Title from '@component/common/components/Title'
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
    AdoptionAlone,
    JointAdoption,
    FiveRaise,
    NotcptAdoptor
  },
  props: {
    id: {
      type: String,
      required: true
    },
    applicantval: {
      type: String
    }

  },
  data () {
    return {
      childtype: '1',
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
      issameaddress3: '0'
    }
  },
  activated () {
    // window.onresize = () => {
    //   this.$nextTick(() => {
    //     this.setHeight('one', 'oneout', !this.showone)
    //     this.setHeight('two', 'twoout', !this.showtwo)
    //     this.setHeight('four', 'fourout', !this.showfour)
    //     if (this.childtype == 3) {
    //       this.setHeight('five', 'fiveout', !this.showfive)
    //     }
    //     if (this.childtype != 8) {
    //       this.setHeight('three', 'threeout')
    //     }
    //   })
    // }
    this.loaddata()
    setTimeout(() => {
      this.getDetails()
    })
  },
  mounted () {
    this.gettypeCertification()
    this.getchildtype()
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
    this.getmechanismList()
    this.getapplicant()
    this.gettypesadopteestatus()
    this.getfamilyincome()
    this.getDetails()
  },
  methods: {
    loaddata () {
      this.issameaddress1 = '0'
      this.issameaddress2 = '0'
      this.issameaddress3 = '0'
      this.typeadoption = '1'
      this.childtype = '1'
      this.basedisabled = false
      this.applytype = '1'
      this.ishide = true
      this.welfareInstitutionId = ''
      this.heathmodel = []
      this.heathmodel2 = []
      this.childtype = '1'
      this.adoptionTabKey = '1'
      this.sendTabKey = '1'
      this.nowformname = 'cptAdoptorFrom1'
      this.nowmaintenanceFrom = 'maintenanceFrom1'
      this.fiveRaiseFrom.resetFields()
      this[this.nowformname].resetFields()
      // this.cptAdoptorFrom3.resetFields()
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
      let obj = { ...val[0], ...val[1] }
      return obj
    },
    // 获取详情
    async getDetails (v) {
      let obj = []
      let data = []
      if (this.id || v) {
        if (this.id || v) {
          let params = {
            id: this.id || v
          }
          data = await this.post('/adoption/queryRegisterById', params)
        }

        obj = data.data.data

        // 情况说明赋值
        let registrationAdoptionVo = obj.registrationAdoptionVo
        if (registrationAdoptionVo.imagefileList) {
          let imgobj = JSON.parse(registrationAdoptionVo.imagefileList)
          imgobj[0].thumbUrl = 'data:image/png;base64,' + imgobj[0].thumbUrl
          this.imgfilelist = imgobj
        }
        // 儿童类别
        this.childtype = registrationAdoptionVo.adoptionCategory
        // 被收养人赋值
        let adopteeVo = obj.adopteeVo
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
        let dateobj = this.go(
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

        // console.log('adopteeVo.healthCondition -->', adopteeVo.healthCondition.split(','))
        // this.heathmodel = adopteeVo.healthCondition ? adopteeVo.healthCondition.split(',') : []//* *** */
        // adopteeVo.healthCondition = adopteeVo.healthCondition ? adopteeVo.healthCondition.split(',') : []
        // 健康状况
        // registerAdoptionVo.healthCondition = registerAdoptionVo.healthCondition.join(',')
        this.addressmodel = [adopteeVo.censusRegisterPro, adopteeVo.censusRegisterCity, adopteeVo.censusRegisterCounty]
        this.$nextTick(() => {
          this.heathmodel = adopteeVo.healthCondition ? adopteeVo.healthCondition.split(',') : []
          // adopteeVo.healthCondition = adopteeVo.healthCondition ? adopteeVo.healthCondition.split(',') : []
          adopteeVo.healthCondition = adopteeVo.healthCondition ? adopteeVo.healthCondition.split(',') : []
          adopteeVo.idCard = adopteeVo.smIdCard
          this.adoptedFrom.setFieldsValue(adopteeVo)
          // this.adoptedFrom.setFieldsValue({
          //   healthCondition: [adopteeVo.healthCondition]
          // })
          //  adopteeVo.healthCondition = [adopteeVo.healthCondition]
        })

        // 收养人信息
        let adoptorVos = obj.adoptorVos
        adoptorVos.map(item => {
          item.birthday = moment(item.birthday)
          item.idCard = item.smIdCard
        })
        let adoptorVo = {}
        if (adoptorVos.length > 1) {
          // 主申请人
          if (adoptorVos[0].keyMember == 1) {
            this.applytype = '1'
          } else {
          }
          this.applicant = '3'
          this.adoptionTabKey = '3'
          this.nowformname = 'cptAdoptorFrom' + 3
          this.issameaddress1 = adoptorVos[0].sameAddress

          this.$nextTick(() => {
            adoptorVo = this.detailobj(adoptorVos)
            this.menheathmodel = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            adoptorVo.healthCondition = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            this.womenheathmodel = adoptorVo.copy_healthCondition ? adoptorVo.copy_healthCondition.split(',') : []
            adoptorVo.copy_healthCondition = adoptorVo.copy_healthCondition ? adoptorVo.copy_healthCondition.split(',') : []
            this.menaddressmodel = [adoptorVo.censusRegisterPro, adoptorVo.censusRegisterCity, adoptorVo.censusRegisterCounty]
            if (this.issameaddress1 != 1) {
              this.womenaddressmodel = [
                adoptorVo.copy_censusRegisterPro,
                adoptorVo.copy_censusRegisterCity,
                adoptorVo.copy_censusRegisterCounty
              ]
            }
          })
        } else {
          adoptorVos[0].sex == 1 ? this.applicant = '1' : this.applicant = '2'
          adoptorVos[0].sex == 1 ? this.adoptionTabKey = '1' : this.adoptionTabKey = '2'
          adoptorVos[0].sex == 1 ? this.nowformname = 'cptAdoptorFrom' + 1 : this.nowformname = 'cptAdoptorFrom' + 2
          adoptorVo = adoptorVos[0]
          this.$nextTick(() => {
            // 健康狀況賦值
            this.heathmodel2 = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            adoptorVo.healthCondition = adoptorVo.healthCondition ? adoptorVo.healthCondition.split(',') : []
            this.addressmodel2 = [adoptorVo.censusRegisterPro, adoptorVo.censusRegisterCity, adoptorVo.censusRegisterCounty]
          })
        }
        // 家庭年收入
        adoptorVo.familyIncome = obj.familyIncome

        this.$nextTick(() => {
          this[this.nowformname].setFieldsValue(adoptorVo)
        })

        // 送样信息处理
        if (this.childtype != 8) {
          if (this.childtype <= 2) {
            let adoptionAgencyVo = obj.adoptionAgencyVo
            this.welfareInstitutionId = obj.adoptionAgencyVo.welfareInstitutionId
            this.fiveRaiseFrom.setFieldsValue(adoptionAgencyVo)
            // 送样机构
          } else {
            // 送养人
            let placingOutPersonVo = {}
            let placingOutPersonVos = obj.placingOutPersonVos
            placingOutPersonVos.map(item => {
              item.birthday = moment(item.birthday)
              item.idCard = item.smIdCard
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

                this.menaddressmodel2 = [placingOutPersonVo.censusRegisterPro, placingOutPersonVo.censusRegisterCity, placingOutPersonVo.censusRegisterCounty]
                if (this.issameaddress2 != 1) {
                  this.womenaddressmodel2 = [
                    placingOutPersonVo.copy_censusRegisterPro,
                    placingOutPersonVo.copy_censusRegisterCity,
                    placingOutPersonVo.copy_censusRegisterCounty
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
                this.addressmodel3 = [placingOutPersonVo.censusRegisterPro, placingOutPersonVo.censusRegisterCity, placingOutPersonVo.censusRegisterCounty]
              })
            }
            this.$nextTick(() => {
              this[this.nowmaintenanceFrom].setFieldsValue(placingOutPersonVo)
            })
          }
        }
        // 生父母 parentFrom
        if (this.childtype == 3) {
          let parentsVos = obj.parentsVos
          parentsVos.map(item => {
            item.birthday = moment(item.birthday)
          })
          let parentsVo = {}
          this.issameaddress3 = parentsVos[0].sameAddress
          this.$nextTick(() => {
            parentsVo = this.detailobj(parentsVos)
            this.parentmenheathmodel = parentsVo.healthCondition ? parentsVo.healthCondition.split(',') : []
            parentsVo.healthCondition = parentsVo.healthCondition ? parentsVo.healthCondition.split(',') : []
            this.parentwomenheathmodel = parentsVo.copy_healthCondition ? parentsVo.copy_healthCondition.split(',') : []
            parentsVo.copy_healthCondition = parentsVo.copy_healthCondition ? parentsVo.copy_healthCondition.split(',') : []

            this.parentmenmodel = [parentsVo.censusRegisterPro, parentsVo.censusRegisterCity, parentsVo.censusRegisterCounty]
            if (this.issameaddress3 != 1) {
              this.parentwomenmodel = [
                parentsVo.copy_censusRegisterPro,
                parentsVo.copy_censusRegisterCity,
                parentsVo.copy_censusRegisterCounty
              ]
            }
          })
          // parentFrom
          this.$nextTick(() => {
            this.parentFrom.setFieldsValue(parentsVo)
          })
        }

        // 情况说明
        //   registrationAdoptionVo.registerDate = moment(registrationAdoptionVo.registerDate)
        //   this.adInformationnoteFrom.setFieldsValue(registrationAdoptionVo)
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
    chs (val) {
      this.typeadoption = val
      //   this.adoptionTabKey = val
      //   this.nowformname = 'cptAdoptorFrom' + val
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // FAMILYINCOME 家庭收入
    async getfamilyincome () {
      let data = await this.getDictionaries('FAMILYINCOME')
      this.familyincomeList = data
    },
    async gettypesadopteestatus () {
      let data = await this.getDictionaries('TYPESOFADOPTEESTATUS')
      this.typesadopteestatusList = data
    },
    // 申请人 APPLICANT
    async getapplicant () {
      let data = await this.getDictionaries('APPLICANT')
      this.applicantlist = data
      this.applicant = '1'
    },
    // 获取儿童类型
    async getchildtype () {
      let data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 机构类表 welfareOrgManagement/queryListByOrgId
    async getmechanismList () {
      let data = await this.post('welfareOrgManagement/queryListByOrgId')
      this.mechanismList = data.data.data
    },
    // 查询机构类表 welfareOrgManagement/queryListByOrgId
    async getsearchmechanismList (val) {
      let params = {
        id: val
      }
      let data = await this.post(
        'welfareOrgManagement/queryListByOrgId',
        params
      )
      return data
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // HEALTH 健康状况
    async getHealth () {
      let data = await this.getDictionaries('HEALTH')
      this.healthList = data
    },
    // DEGREEEDUCATION 文化程度
    async getCulture () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // IDENTITCATEGORY 身份类别
    async getIdentity () {
      let data = await this.getDictionaries('IDENTITCATEGORY')
      this.identityList = data
    },
    // NATIONALITY 國籍
    async getnationality () {
      let data = await this.getDictionaries('NATIONALITY')
      this.nationalityList = data
    },
    // MARRIAGE 婚姻
    async getmarriage () {
      let data = await this.getDictionaries('MARRIAGE')
      this.marriageyList = data
    },
    // 职业 OCCUPATION
    async getOccupattion () {
      let data = await this.getDictionaries('OCCUPATION')
      this.occupattioList = data
    },
    // 证件类型 IDCARD_TYPE
    async getIdcardtype () {
      let data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardTypeList = data
    },
    // RELATIONSADOPTEES 与被收养人的关系
    async getRelationsadoptees () {
      let data = await this.getDictionaries('RELATIONSADOPTEES')
      this.relationsadopteesList = data
    },
    // RELATIONSAPPLICANTS 与申请人关系
    async getRelationsApplicants () {
      let data = await this.getDictionaries('RELATIONSAPPLICANTS')
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
        copy_address_Linkage: this.womenheathmodel
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
      let data = await this.getDictionaries('TYPEOFCERTIFICATION')
      this.typeCertificationList = data
    },
    selectchange () { }
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
    id (val) {
      if (val) {
        this.getDetails(val)
      }
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
