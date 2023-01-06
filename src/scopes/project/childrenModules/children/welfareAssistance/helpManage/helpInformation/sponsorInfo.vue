<template>
  <div class="conts"
       @click='allvalidator'>
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="onPrev">
        <ta-tab-pane tab="个人"
                     key="1"
                     :disabled="ispersonShow">
          <div ref="oneout"
               class="mars">
            <al-title :title="'个人基本信息'"
                      id="anchorpoint_a"
                      :show.sync="showone"></al-title>
            <div class="hei">
              <ta-form ref="one"
                       layout="horizontal"
                       :autoFormCreate="(appFormData)=>{this.appFormData = appFormData}">
                <personalInformation :censusreguster="censusreguster"
                                     :censusAddressmodel="censusAddressmodel"
                                     :currentAddressmodel="currentAddressmodel"
                                     @setdate="setdate"
                                     @censusAddress="censusAddress"
                                     @currentAddress="currentAddress"
                                     :sexList="sexList"
                                     :personInfUploadFileList.sync="personInfUploadFileList"
                                     :disabled="disabled"
                                     ref="childbase"></personalInformation>
              </ta-form>
            </div>
          </div>
          <div class="mars"
               ref="twoout">
            <al-title :title="'家庭成员'"
                      id="anchorpoint_b"
                      :show.sync="showtwo"></al-title>
            <div class="hei">
              <ta-form layout="horizontal"
                       ref="two"
                       :autoFormCreate="(sitFormData)=>{this.sitFormData = sitFormData}">
                <familyNumber @chaadoptorChildrenVos="chaadoptorChildrenVos"
                              :notesRecordVos="notesRecordVos"
                              @familyChange="familyChange"
                              :thisP='this'
                              :disabled="disabled"></familyNumber>
              </ta-form>
            </div>
          </div>
          <div class="mars"
               ref="threeout">
            <al-title :title="'申请信息'"
                      id="anchorpoint_c"
                      :show.sync="showthree"></al-title>
            <div class="hei">
              <ta-form layout="horizontal"
                       ref="three"
                       :autoFormCreate="(applicationFormData)=>{this.applicationFormData = applicationFormData}">
                <applicationInformation :sponsorshipIntention="sponsorshipIntention"
                                        :sponsorshipType="sponsorshipType"
                                        :personUploadFileList.sync="personUploadFileList"
                                        :disabled="disabled"></applicationInformation>
              </ta-form>
            </div>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="组织"
                     key="2"
                     forceRender
                     :disabled="isorgShow">
          <div ref="fourout"
               class="mars">
            <al-title :title="'组织基本信息'"
                      id="anchorpoint_d"
                      :show.sync="showfour"></al-title>
            <div class="hei">
              <ta-form ref="four"
                       layout="horizontal"
                       :autoFormCreate="(orgFormData)=>{this.orgFormData = orgFormData}">
                <organizationInformation :disabled="disabled"
                                         :censusreguster="censusreguster"
                                         :businessCategory="businessCategory"
                                         :organizeNature="organizeNature"
                                         :credentialList.sync="credentialList"></organizationInformation>
              </ta-form>
            </div>
          </div>
          <div class="mars"
               ref="fiveout">
            <al-title :title="'申请信息'"
                      id="anchorpoint_e"
                      :show.sync="showfive"></al-title>
            <div class="hei">
              <ta-form layout="horizontal"
                       ref="five"
                       :autoFormCreate="(applicationFormData2)=>{this.applicationFormData2 = applicationFormData2}">
                <orgApplicationInformation :disabled="disabled"
                                           :credentialAppList.sync="credentialAppList"
                                           :sponsorshipIntention="sponsorshipIntention"
                                           :sponsorshipType="sponsorshipType"></orgApplicationInformation>
              </ta-form>
            </div>
          </div>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 @click="submit()"
                 v-show="!isdisabled">提交</ta-button>
    </div>
  </div>
</template>
<script>
import alTitle from '@component/common/components/Title'
import personal from './components/personal.vue'
import personalInformation from './components/personalInformation.vue'
import familyNumber from './components/familyNumber.vue'
import applicationInformation from './components/applicationInformation.vue'
import organization from './components/organization.vue'
import organizationInformation from './components/organizationInformation.vue'
import orgApplicationInformation from './components/orgApplicationInformation.vue'
import moment from 'moment'

export default {
  // name:'sponsorInfo',
  props: {
  },
  components: {
    alTitle,
    personal,
    personalInformation,
    familyNumber,
    applicationInformation,
    organization,
    organizationInformation,
    orgApplicationInformation
  },
  data () {
    return {
      sexList: [],
      nationList: [],
      sponsorshipType: [],
      sponsorshipIntention: [],
      businessCategory: [],
      organizeNature: [],
      censusreguster: [],
      disabled: false,
      isdisabled: false,
      nowkey: '1',
      showone: true,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      notesRecordVos: [],
      censusAddressmodel: [],
      currentAddressmodel: [],
      personInfUploadFileList: [],
      personUploadFileList: [],
      credentialList: [],
      credentialAppList: [],
      rules: {
        birthday: this.verificationRules('出生日期', true)
      },
      //   familyInfor: []
      sponsorFamilyMemberInfoVoList: [],
      id: '',
      ispersonShow: false,
      isorgShow: false,
      isvalidator: false // 身份证号是否验证
    }
  },
  activated () {
    this.appFormData.resetFields()
    // this.sitFormData.resetFields()
    this.applicationFormData.resetFields()
    this.orgFormData.resetFields()
    this.applicationFormData2.resetFields()
    this.notesRecordVos = []
    this.credentialList = []
    this.credentialAppList = []
    this.personInfUploadFileList = []
    this.personUploadFileList = []
    this.id = this.$route.query.id
    this.nowkey = this.$route.query.nowkey
    this.type = this.$route.query.type
    this.disabled = this.$route.query.disabled
    this.isdisabled = this.$route.query.isdisabled
    this.url = this.$route.query.url
    if (this.id) {
      this.getDetails()
    }
    this.isorgShow = this.$route.query.isorgShow
    this.ispersonShow = this.$route.query.ispersonShow
    this.showone = true
    this.showtwo = true
    this.showthree = true
    this.showfour = true
    this.showfive = true
    this.$nextTick(() => {
      this.initHeight('one', 'oneout')
      this.initHeight('two', 'twoout')
      this.initHeight('three', 'threeout')
      // this.initHeight('four', 'fourout')
      // this.initHeight('five', 'fiveout')
    })
  },
  mounted () {
    this.loadData()
    this.getsex()
    this.getHelpType()
    this.getSponsorshipIntention()
    this.getBusinessCategory()
    this.getOrganizeNature()
    this.getCensusreguster()
    this.isvalidator = false
    this.$refs.childbase.isvalidator = false
  },
  methods: {
    familyChange (val) {
      this.sponsorFamilyMemberInfoVoList = val
    },
    setdate (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }
      this.appFormData.setFieldsValue({
        birthday: birth ? moment(birth) : null,
        sex: sex
      })
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 获取助养类型
    async getHelpType () {
      let data = await this.getDictionaries('SPONSORSHIPTYPE')
      this.sponsorshipType = data
    },
    // 获取助养儿童意向
    async getSponsorshipIntention () {
      let data = await this.getDictionaries('SPONSORSHIPINTENTION')
      var newarr = []
      data.forEach(function (element, index) {
        var label = element.label
        if (label !== '社会散居孤儿' && label !== '父母养育艾滋病病毒感染儿童' && label !== '民间机构养育孤弃儿童' && label !== '事实无人抚养儿童') {
          newarr.push(element)
        }
      })
      this.sponsorshipIntention = newarr
    },
    // 获取组织所属业务类别
    async getBusinessCategory () {
      let data = await this.getDictionaries('UNIT_INDUSTY')
      this.businessCategory = data
    },
    // 获取组织性质
    async getOrganizeNature () {
      let data = await this.getDictionaries('UNIT_PORPERTY')
      this.organizeNature = data
    },
    // 获取户籍所在地
    async getCensusreguster () {
      let data = await this.getDictionaries('CENSUSREGISTER')
      this.censusreguster = data
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          // node.style.height = height + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    initHeight (ref, refout) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
      })
    },
    onPrev (key) {
      this.nowkey = key
      this.initHeight('one', 'oneout')
      this.initHeight('two', 'twoout')
      this.initHeight('three', 'threeout')
      this.initHeight('four', 'fourout')
      this.initHeight('five', 'fiveout')
    },
    // 返回
    backs () {
      this.$router.go(-1)
    },
    loadData () {
      this.nowkey = '1'
      this.showone = true
      this.showtwo = true
      this.showthree = true
      // this.setHeight('one', 'oneout', !this.showone)
      // this.setHeight('two', 'twoout', !this.showtwo)
      // this.setHeight('three', 'threeout', !this.showthree)
      // this.setHeight('four', 'fourout', !this.showfour)
      // this.setHeight('five', 'fiveout', !this.showfive)
      // 添加家庭成员列表
      this.sitFormData.resetFields()
      this.appFormData.resetFields()
      this.applicationFormData.resetFields()
      this.orgFormData.resetFields()
      this.applicationFormData2.resetFields()
    },

    // 家庭成员 对应的数据变化

    chaadoptorChildrenVos (tablename, val, e) {
      // familyInfor = val
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
      return val
    },

    censusAddress () {
      this.appFormData.setFieldsValue({
        address_Linkage: this.censusAddressmodel
      })
    },
    currentAddress () {
      this.appFormData.setFieldsValue({
        copy_address_Linkage: this.currentAddressmodel
      })
    },

    // 处理数据
    processingData () {
      let upLoadPathId = []
      let sponsorshipVo = {}
      let fileids1 = [
        ...this.personInfUploadFileList,
        ...this.personUploadFileList
      ]
      fileids1.map(item => {
        upLoadPathId.push(item.response.data.data.fileid)
      })
      sponsorshipVo.upLoadPathId = upLoadPathId
      return sponsorshipVo
    },
    processingData2 () {
      let upLoadPathId = []
      let sponsorshipVo = {}
      let fileids2 = [
        ...this.credentialList,
        ...this.credentialAppList
      ]
      fileids2.map(item => {
        upLoadPathId.push(item.response.data.data.fileid)
      })
      sponsorshipVo.upLoadPathId = upLoadPathId
      return sponsorshipVo
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
      this.$refs.childbase.isvalidator = true
    },
    submit () {
      this.isvalidator = false
      this.$refs.childbase.isvalidator = false
      this.$refs.childbase.errMsg = this.appFormData.getFieldError('idCard')
      let isok = true
      let orgok = true
      let personalSponsorshipVo = {}
      let organizeSponsorshipVo = {}
      let sponsorshipVo = {}
      let data = {}

      // 个人基本信息
      if (this.nowkey == '1') {
        orgok = false
        this.appFormData.validateFields((err, values) => {
          personalSponsorshipVo = values
          if (err) {
            isok = false
          }
        })
        // 家庭成员
        this.sitFormData.validateFields((err, values) => {
          if (err) {
            isok = false
            this.$message.error('家庭成员填写错误')
          }
        })
        // 申请信息
        this.applicationFormData.validateFields((err, values) => {
          sponsorshipVo = values
          if (err) {
            isok = false
            // this.$message.error('申请信息填写错误')
          }
        })
      } else {
        // 组织信息
        this.orgFormData.validateFields((err, values) => {
          organizeSponsorshipVo = values
          if (err) {
            isok = false
          }
        })
        // 申请信息
        this.applicationFormData2.validateFields((err, values) => {
          sponsorshipVo = values
          if (err) {
            isok = false
          }
        })
      }
      setTimeout(async () => {
        if (isok) {
          if (!orgok) {
            let fileContent = this.processingData()
            const sponsorFamilyMemberInfoVoList = this.notesRecordVos

            let url = ''
            let text = ''
            personalSponsorshipVo.province = personalSponsorshipVo.address_Linkage[0]
            personalSponsorshipVo.city = personalSponsorshipVo.address_Linkage[1]
            personalSponsorshipVo.county = personalSponsorshipVo.address_Linkage[2]
            personalSponsorshipVo.currentAddressPro = personalSponsorshipVo.copy_address_Linkage[0]
            personalSponsorshipVo.currentAddressCity = personalSponsorshipVo.copy_address_Linkage[1]
            personalSponsorshipVo.currentAddressCounty = personalSponsorshipVo.copy_address_Linkage[2]
            if (this.id) {
              sponsorshipVo.sponsorshipId = this.$route.query.id
              sponsorshipVo.upLoadPathId = fileContent.upLoadPathId
              data = {
                personalSponsorshipVo,
                sponsorFamilyMemberInfoVoList,
                sponsorshipVo
              }
              // 编辑
              url = '/sponsorship/personalUpdate'
              text = '编辑成功'
            } else {
              // 新增
              sponsorshipVo.upLoadPathId = fileContent.upLoadPathId

              data = {
                personalSponsorshipVo,
                sponsorFamilyMemberInfoVoList,
                sponsorshipVo
              }
              url = '/sponsorship/personalSave'
              text = '新增成功'
            }
            let res = await this.post(url, data, true)
            if (res.errors == null) {
              this.$message.success(text)

              this.backs()
            }
          }
          if (orgok) {
            let fileContent = this.processingData2()
            let url = ''
            let text = ''
            if (this.id) {
              sponsorshipVo.sponsorshipId = this.$route.query.id
              sponsorshipVo.upLoadPathId = fileContent.upLoadPathId
              data = {
                organizeSponsorshipVo,
                sponsorshipVo
              }
              // 编辑
              url = '/sponsorship/organizeUpdate'
              text = '编辑成功'
            } else {
              // 新增
              sponsorshipVo.upLoadPathId = fileContent.upLoadPathId
              data = {
                organizeSponsorshipVo,
                sponsorshipVo
              }
              url = '/sponsorship/organizeSave'
              text = '新增成功'
            }
            let res = await this.post(url, data, true)
            if (res.errors == null) {
              this.$message.success(text)
              this.backs()
            }
          }
        } else {
          // this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      }, 300);

    },
    // 详情
    async getDetails () {
      let data = {}
      if (this.url) {
        let params = {
          sponsorshiHistoryId: this.id,
          type: this.type
        }
        data = await this.post('/sponsorshipRelation/queryById', params)
      } else {
        let params = {
          sponsorshipId: this.id,
          type: this.type
        }
        data = await this.post('/sponsorship/queryById', params)
      }

      let dataGather = data.data.data
      // 个人
      if (dataGather.personalSponsorshipVo) {
        let personalSponsorshipVo = dataGather.personalSponsorshipVo
        let sponsorFamilyMemberInfoVoList = dataGather.sponsorFamilyMemberInfoVoList
        let sponsorshipVo = dataGather.sponsorshipVo
        personalSponsorshipVo.birthday = moment(personalSponsorshipVo.birthday)
        sponsorshipVo.applicationDate = moment(sponsorshipVo.applicationDate)
        if (dataGather.sponsorshipVo.filePathVos) {
          let filePathVosf4 = JSON.parse(dataGather.sponsorshipVo.filePathVos)
          filePathVosf4.map(item => {
            if (item.functionType == '1' && item.busiType == '39') {
              this.personInfUploadFileList.push(item)
            }
            if (item.functionType == '1' && item.busiType == '40') {
              this.personUploadFileList.push(item)
            }
          })
        }

        this.$nextTick(() => {
          this.censusAddressmodel = [personalSponsorshipVo.province || '', personalSponsorshipVo.city || '', personalSponsorshipVo.county || '']
          this.currentAddressmodel = [personalSponsorshipVo.currentAddressPro || '', personalSponsorshipVo.currentAddressCity || '', personalSponsorshipVo.currentAddressCounty || '']
          this.appFormData.setFieldsValue(personalSponsorshipVo)
          this.notesRecordVos = sponsorFamilyMemberInfoVoList
          this.applicationFormData.setFieldsValue(sponsorshipVo)
          this.setHeight('two', 'twoout')
        })
      }
      if (dataGather.organizeSponsorshipVo) {
        let organizeSponsorshipVo = dataGather.organizeSponsorshipVo
        let sponsorshipVo = dataGather.sponsorshipVo
        if (sponsorshipVo.filePathVos) {
          let filePathVosf4 = JSON.parse(sponsorshipVo.filePathVos)
          filePathVosf4.map(item => {
            if (item.functionType == '1' && item.busiType == '39-39') {
              this.credentialList.push(item)
            }
            if (item.functionType == '1' && item.busiType == '40-40') {
              this.credentialAppList.push(item)
            }
          })
        }
        sponsorshipVo.applicationDate = sponsorshipVo.applicationDate ? moment(sponsorshipVo.applicationDate) : null
        organizeSponsorshipVo.establishmentDate = organizeSponsorshipVo.establishmentDate ? moment(organizeSponsorshipVo.establishmentDate) : null
        this.$nextTick(() => {
          this.orgFormData.setFieldsValue(organizeSponsorshipVo)
          this.applicationFormData2.setFieldsValue(sponsorshipVo)
        })
      }
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
    }
  }
}
</script>
<style scoped lang="less">
.preservation {
  margin-left: 20px;
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
