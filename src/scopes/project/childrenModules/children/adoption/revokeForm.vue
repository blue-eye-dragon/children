<template>
  <div :class="evaluate=='yes'?'':'conts tadrawer'">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="onPrev">
        <ta-tab-pane tab="基本信息"
                     key="1"
                     :forceRender="true">
          <div class="hei">
            <ta-form layout="horizontal"
                     :autoFormCreate="(appFormData)=>{this.appFormData = appFormData}">
              <applicant :addressmodel="addressmodel"
                         @setdate="setdate"
                         @changeOrg="changeOrg"
                         @setIdCard="setIdCard"
                         @setaddress="setaddress"
                         @mechanismchange="mechanismchange"
                         :identityList="identityList"
                         :mechanismList.sync="mechanismList"
                         :sexList="sexList"
                         :nationalityList="nationalityList"
                         :nationList="nationList"
                         ref="applicant"
                         :idcardTypeList="idcardTypeList"
                         :disabled="isdisabled"></applicant>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="撤销收养情况说明"
                     key="4"
                     :forceRender="true">
          <div class="hei"
               style="padding-bottom: 80px;">
            <ta-form layout="horizontal"
                     ref="two"
                     :autoFormCreate="(sitFormData)=>{this.sitFormData = sitFormData}">
              <situation :disabled="isdisabled"
                         :isZY="isZY"
                         :revokeOtherReasonshow.sync='revokeOtherReasonshow'
                         :revokeOtherReason.sync='revokeOtherReason'
                         :placingOutPerson="placingOutPerson"
                         :additionalYesOrNo='additionalYesOrNo'
                         :causesrvocationList="causesrvocationList"></situation>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="文件上传"
                     key="2"
                     :forceRender="true">
          <FileUpload :fileList.sync="fileList"
                      :filedisabled="filedisabled"
                      :adoptionfileList.sync="adoptionfileList"
                      :adopterfileList.sync='adopterfileList'></FileUpload>
        </ta-tab-pane>
        <ta-tab-pane tab="打印"
                     key="3"
                     v-if='isprint'
                     :forceRender="true">
          <Printing :printlist='printlist'
                    :printId='printId'></Printing>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom"
         v-if="evaluate!='yes'">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 @click="submit('1')"
                 v-if="!isdisabled">提交</ta-button>
    </div>
    <ta-modal title="提交成功"
              :visible="printshow"
              ontext
              @ok="printOk"
              okText="打印"
              @cancel="printno">
      <p><b>撤销收养登记提交成功！是否需要打印相关材料？</b></p>
      <p>后续打印请到收养业务查询页面打印。</p>
    </ta-modal>
  </div>
</template>

<script>
import tabBasicMsg from './components/tabBasicMsg.vue'
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import alTitle from '@component/common/components/Title'
import applicant from './components/applicant.vue'
import situation from './components/situation.vue'
import moment from 'moment'
export default {
  name: 'revokeForm',
  props: {
    evaluate: { type: String, require: false }
  },
  components: {
    tabBasicMsg,
    FileUpload,
    Printing,
    applicant,
    situation,
    alTitle
  },
  data () {
    return {
      isZY: true,
      fileList: [],
      adoptionfileList: [],
      filedisabled: false,
      isdisabled: false,
      submitYesOrNo: '1',
      id: '',
      addressmodel: [],
      // 是否补录
      additionalYesOrNo: '0',
      identityList: [],
      sexList: [],
      nationalityList: [],
      nationList: [],
      idcardTypeList: [],
      mechanismList: [],
      causesrvocationList: [],
      handleType: 4,
      nowkey: '1',
      placingOutPerson: '',
      adopterfileList: [],
      revokeOtherReason: '',
      revokeOtherReasonshow: false,
      printlist: [
        { name: '撤销收养登记申请书', url: '/adoption/printRevoke', src: 'static/img/revoke1.jpg' },
        { name: '撤销收养登记决定书 ', url: '/adoption/printRevokeApproverecord', src: 'static/img/revoke2.jpg' }
      ],
      printId: '',
      printshow: false,
      isprint: false,
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.loadData()
    this.id = this.$route.query.id
    this.printId = this.id
    this.handleType = this.$route.query.handleType
    this.additionalYesOrNo = this.$route.query.additionalYesOrNo
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (this.handleType == 0) {
      this.isdisabled = true
      this.filedisabled = true
    } else {
      this.isdisabled = false
      this.filedisabled = false
    }
    this.getdetails()
  },
  mounted () {
    this.getIdentity()
    this.getsex()
    this.getnationality()
    this.getnation()
    this.getmechanismList()
    this.getIdcardtype()
    this.getcausesrvocation()
  },
  methods: {
    async mechanismchange (val) {
      this.appFormData.setFieldsValue({
        orgName: null,
        orgAddressDetail: null,
        unifiedSocialCreditCode: null
      })
      this.post('/welfareOrgManagement/queryListByOrgId', { id: val }).then(
        (res) => {
          if (res.serviceSuccess) {
            const data = res.data.data[0]
            for (var key in data) {
              if (key == 'orgName') {
                this.appFormData.setFieldsValue({
                  orgName: data[key]
                })
              }
              if (key == 'address') {
                this.appFormData.setFieldsValue({
                  orgAddressDetail: data[key]
                })
              }
              if (key == 'unifiedSocialCreditCode') {
                this.appFormData.setFieldsValue({
                  unifiedSocialCreditCode: data[key]
                })
              }
            }
          }
        }
      )
    },
    changeOrg (e) {
      if (e == '1') {
        this.$refs.applicant.isshow = true
      } else {
        this.$refs.applicant.isshow = false
      }
    },
    setdate (val) {
      this.appFormData.setFieldsValue({
        birthday: moment(val.birth)
      })
    },
    setIdCard () {
      this.appFormData.setFieldsValue({
        idCard: ''
      })
    },
    // 撤销收养原因 CAUSESOFREVOCATION
    async getcausesrvocation () {
      const data = await this.getDictionaries('CAUSESOFREVOCATION')
      this.causesrvocationList = data
    },
    // 证件类型 IDCARD_TYPE
    async getIdcardtype () {
      const data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardTypeList = data
    },
    // 机构类表 welfareOrgManagement/queryListByOrgId
    async getmechanismList () {
      const data = await this.post('welfareOrgManagement/queryListByOrgId')
      this.mechanismList = data.data.data
    },
    // 民族
    async getnation () {
      const data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // NATIONALITY 國籍
    async getnationality () {
      const data = await this.getDictionaries('NATIONALITY')
      this.nationalityList = data
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // IDENTITCATEGORY 身份类别
    async getIdentity () {
      const data = await this.getDictionaries('IDENTITCATEGORY')
      this.identityList = data
    },
    loadData () {
      this.isFromSearch = false
      this.formDataSearch = {}
      this.isZY = true
      this.isprint = false
      this.printshow = false
      this.printId = ''
      this.fileList = []
      this.adoptionfileList = []
      this.mechanismList = []
      this.adopterfileList = []
      this.revokeOtherReason = ''
      this.placingOutPerson = ''
      this.revokeOtherReasonshow = false
      this.filedisabled = false
      this.additionalYesOrNo = '0'
      this.handleType = 4
      this.nowkey = '1'
      this.appFormData.resetFields()
      this.sitFormData.resetFields()
      this.sitFormData.setFieldsValue({
        handlePersonName: window.parent.indexTool.getUserInfo().userName,
        handleOrgName: window.parent.indexTool.getUserInfo().orgName,
        handleTime: moment()
      })
    },
    setaddress () {
      this.appFormData.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 获取详情
    async getdetails () {
      const params = {
        id: this.id
      }
      const data = await this.post('/adoption/queryRevokeById', params)
      if (data.data.data.isOrg == '1') {
        this.$refs.applicant.isshow = true
      }
      if (data.data.data.revokeReason == 4) {
        this.revokeOtherReasonshow = true
        this.revokeOtherReason = data.data.data.revokeOtherReason
      }
      if (data.data.data.placingOutPerson) {
        this.placingOutPerson = data.data.data.placingOutPerson
      } else {
        this.placingOutPerson = ''
      }

      // birthday
      this.$nextTick(() => {
        const sitFormData = this.sitFormData.getFieldsValue()
        for (var k in sitFormData) {
          if (data.data.data[k]) {
            if (k == 'revokeDate' || k == 'registerDate' || k == 'handleTime') {
              this.sitFormData.setFieldsValue({
                [k]: moment(data.data.data[k])
              })
            } else {
              this.sitFormData.setFieldsValue({
                [k]: data.data.data[k]
              })
            }
          }
        }
        const appFormData = this.appFormData.getFieldsValue()
        for (var j in appFormData) {
          if (data.data.data[j]) {
            if (j == 'birthday') {
              this.appFormData.setFieldsValue({
                [j]: moment(data.data.data[j])
              })
            } else {
              this.appFormData.setFieldsValue({
                [j]: data.data.data[j]
              })
            }
          }
        }
      })

      if (data.data.data.province) {
        this.addressmodel = [
          data.data.data.province,
          data.data.data.city,
          data.data.data.county,
          data.data.data.town
        ]
      }
      // 文件信息 filePathVos
      if (data.data.data.filePathVos) {
        const filePathVos = JSON.parse(data.data.data.filePathVos)
        filePathVos.map(item => {
          if (item.busiType == '1') {
            this.fileList.push(item)
          } else if (item.busiType == '2') {
            this.adoptionfileList.push(item)
          } else {
            this.adopterfileList.push(item)
          }
        })
      }
    },
    // 返回
    backs () {
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
    onPrev (key) {
      this.nowkey = key
    },
    printOk () {
      this.isdisabled = true
      this.isprint = true
      this.printshow = false
      this.nowkey = '3'
      this.isZY = false
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    // 提交
    async submit (val) {
      let isok = true
      this.submitYesOrNo = val
      const vm = this
      this.appFormData.validateFields((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '1'
        }
      })
      this.sitFormData.validateFields((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '4'
        }
      })
      if (isok) {
        const appFormData = this.appFormData.getFieldsValue()
        const sitFormData = this.sitFormData.getFieldsValue()
        this.changetime(appFormData)
        this.changetime(sitFormData)
        if (appFormData.address_Linkage) {
          appFormData.province = appFormData.address_Linkage[0]
          appFormData.city = appFormData.address_Linkage[1]
          appFormData.county = appFormData.address_Linkage[2]
          appFormData.town = appFormData.address_Linkage[3]
          delete appFormData.address_Linkage
        }
        sitFormData.revokeOtherReason = this.revokeOtherReason
        const params = { ...appFormData, ...sitFormData }
        params.additionalYesOrNo = this.additionalYesOrNo
        params.registrationAdoptionId = this.id
        // 文件信息
        const upLoadPathIds = []
        const fileids = [...this.fileList, ...this.adoptionfileList, ...this.adopterfileList]
        fileids.map(item => {
          upLoadPathIds.push(item.response.data.data.fileid)
        })
        params.upLoadPathIds = upLoadPathIds
        let url = ''
        if (this.$route.query.isedit) {
          url = '/adoption/updateRevoke'
        } else {
          url = '/adoption/revoke'
        }
        const data = await this.post(url, params, true)
        if (data.errors == null) {
          this.$message.success('提交成功')
          if (this.additionalYesOrNo == 0) {
            this.printshow = true
          } else {
            this.backs()
          }
        }
      } else {
        // 导航切换
        // this.nowkey = '1'
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    }
  }
}
</script>

<style scoped>
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
