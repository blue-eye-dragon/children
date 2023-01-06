<template>
  <div class="conts tadrawer">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="基本信息"
                     key="1"
                     :forceRender="true">
          <Basic :id="id"
                 :thisP="thisP"
                 :basedisabled="true"
                 @setData="setData"
                 :applicantval.sync="applicantval"></Basic>

        </ta-tab-pane>
        <ta-tab-pane tab="笔录信息"
                     key="2"
                     :forceRender="true">
          <Record :basedisabled="basedisabled"
                  :notesRecordVos="notesRecordVos"
                  @chaadoptorChildrenVos="chaadoptorChildrenVos"></Record>
        </ta-tab-pane>
        <ta-tab-pane tab="文件上传"
                     key="3"
                     :forceRender="true">
          <FileUpload :fileList.sync="fileList"
                      :adoptionfileList.sync="adoptionfileList"
                      :adopterfileList.sync='adopterfileList'
                      :filedisabled="basedisabled"></FileUpload>
        </ta-tab-pane>
        <ta-tab-pane tab="情况说明"
                     key="5"
                     :forceRender="true">
          <div ref="fourout"
               class="mars">
            <Title id="anchorpoint_d"
                   title="补领情况说明"
                   :show.sync="showfour"></Title>
            <ta-form layout="horizontal"
                     ref="four"
                     :autoFormCreate="(from)=>{this.from = from}">
              <ta-row>
                <ta-col :span="12">
                  <ta-form-item label="补领原因"
                                fieldDecoratorId="renewReason"
                                :fieldDecoratorOptions="rules.renewReason">
                    <ta-select placeholder="请选择补领原因"
                               :disabled='basedisabled'>
                      <ta-select-option v-for="(item,index) in reasonreimbursementlist"
                                        :value="item.value"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <!-- :fieldDecoratorOptions="rules.adoptionRegistionPrintNumber" -->
                  <ta-form-item label="收养登记证印制号"
                                fieldDecoratorId="adoptionRegistionPrintNumber">
                    <ta-input placeholder="请输入登记证印制号"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="解除收养登记日期"
                                fieldDecoratorId="relieveDate"
                                :fieldDecoratorOptions="rules.relieveDate">
                    <ta-date-picker style="width: 100%;"
                                    :disabled="true"
                                    placeholder="请选择解除收养登记日期" />
                  </ta-form-item>

                  <ta-form-item label="解除收养登记证号"
                                fieldDecoratorId="relieveCertificateNumber">
                    <ta-input placeholder="请输入解除收养登记证号"
                              :disabled="true" />
                  </ta-form-item>

                </ta-col>

                <ta-col :span="12">
                  <ta-form-item label="收养登记日期"
                                fieldDecoratorId="registerDate"
                                :require="{message:'请选择原收养登记日期!'}">
                    <ta-date-picker :disabled="true"
                                    style="width: 100%;"
                                    placeholder="请选择收养登记日期" />
                  </ta-form-item>
                  <ta-form-item label="收养登记证号"
                                fieldDecoratorId="adoptionRegistionCertificateNumber"
                                :fieldDecoratorOptions="rules.adoptionRegistionCertificateNumber">
                    <ta-input placeholder="请输入收养登记证号"
                              :disabled="true" />
                  </ta-form-item>
                  <ta-form-item label="解除收养登记证印制号"
                                fieldDecoratorId="printNumber">
                    <ta-input placeholder="请输入解除收养登记证印制号"
                              :disabled="true" />
                  </ta-form-item>

                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="解除收养登记原因"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="relieveReason"
                                :require="{message:'请选择解除收养登记原因!'}">
                    <ta-select placeholder="请选择解除收养登记原因"
                               :disabled="true">
                      <ta-select-option v-for="(item,index) in causeforreleaseList"
                                        :value="item.value"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="送养人提供的证件情况"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="placingOutCredentials"
                                :fieldDecoratorOptions="rules.placingOutCredentials">
                    <ta-textarea placeholder="请输入送养人提供的证件情况"
                                 :disabled='basedisabled'
                                 :rows="2" />
                  </ta-form-item>
                  <ta-form-item label="收养人提供的证件情况"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="adoptorCredentials"
                                :fieldDecoratorOptions="rules.adoptorCredentials">
                    <ta-textarea placeholder="请输入收养人提供的证件情况"
                                 :disabled='basedisabled'
                                 :rows="2" />
                  </ta-form-item>
                  <ta-form-item label="审核意见"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="opinion"
                                :fieldDecoratorOptions="rules.opinion">
                    <ta-textarea placeholder="请输入审核意见"
                                 :disabled='basedisabled' />
                  </ta-form-item>
                  <ta-form-item label="备注"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="remarks"
                                :fieldDecoratorOptions="rules.remarks">
                    <ta-textarea placeholder="请输入备注"
                                 :disabled='basedisabled'
                                 :rows="2" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="补发证件印制号"
                                fieldDecoratorId="renewPrintNumber"
                                :fieldDecoratorOptions="rules.renewPrintNumber">
                    <ta-input placeholder="请输入补发证件印制号"
                              :disabled='basedisabled' />
                  </ta-form-item>
                  <ta-form-item label="补领日期"
                                fieldDecoratorId="renewDate"
                                :require="{message:'请选择补领日期'}">
                    <ta-date-picker style="width: 100%;"
                                    :disabled='basedisabled'
                                    :disabledDate="disabledDate"
                                    placeholder="请选择补领日期" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="档案页数"
                                fieldDecoratorId="archivesCount"
                                :require="{message:'请输入档案页数'}">
                    <ta-input-number :disabled='basedisabled'
                                     :min="1"
                                     :max="999999"
                                     :precision=0
                                     placeholder="请输入档案页数"
                                     style="width:100%" />
                  </ta-form-item>
                  <ta-form-item v-if='otherid'
                                label="补发证明字号"
                                fieldDecoratorId="renewCertificateNumber">
                    <ta-input placeholder="系统自动生成补发证件字号"
                              :disabled="true" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <processingInformation></processingInformation>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="打印"
                     key="4"
                     :forceRender="true"
                     v-if='isprint'>
          <Printing :printlist='printlist'
                    :printId='printId'
                    :bizId="bizId"></Printing>
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
                 @click="submit"
                 v-if="!basedisabled">提交</ta-button>
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
import Record from './components/record'
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import Title from '@component/common/components/Title'
import processingInformation from './components/processingInformation'
import Basic from './components/basic'
import moment from 'moment'
export default {
  name: 'applicant',
  components: {
    Record,
    FileUpload,
    Printing,
    Basic,
    Title,
    processingInformation
  },
  data () {
    return {
      thisP: this,
      adoptionlist: [],
      id: '',
      otherid: '',
      applicantval: '1',
      showfour: true,
      reasonreimbursementlist: [],
      basedisabled: false,
      notesRecordVos: [],
      fileList: [],
      adoptionfileList: [],
      adopterfileList: [],
      filedisabled: false,
      causeforreleaseList: [],
      rules: {
        renewReason: this.verificationRules('补领原因'),
        adoptionRegistionPrintNumber: this.verificationRules('原收养登记证印制号', 50),
        relieveDate: this.verificationRules('原解除收养登记日期', true),
        relieveCertificateNumber: this.verificationRules('原解除收养登记证号', 50),
        adoptionRegistionCertificateNumber: this.verificationRules('原收养登记证号', 50),
        printNumber: this.verificationRules('原解除收养登记证印制号', 50),
        placingOutCredentials: this.verificationRules('送养人提供的证件情况', 200, true),
        adoptorCredentials: this.verificationRules('收养人提供的证件情况', 200, true),
        opinion: this.verificationRules('审核意见', 70, true),
        remarks: this.verificationRules('备注', 70, true),
        renewPrintNumber: this.verificationRulesNotMustFill('补发证件印制号', 50),
        // archivesCount: this.verificationRules('档案页数', 20),
        renewCertificateNumber: this.verificationRules('补发证明字号', 50)
      },
      printlist: [
        { name: ' 补领解除收养登记证明申请书', url: '/adoption/printAdditionRelieveCertificate', src: 'static/img/replacementRelive1.jpg' },
        { name: '补领解除收养登记证询问笔录', url: '/adoption/printAdditionRelieveCertificateNotes', src: 'static/img/replacementRelive2.jpg' },
        { name: '补领解除收养登记证审查处理表', url: '/adoption/printAdditionRelieveCertificateApproverecord', src: 'static/img/replacementRelive3.jpg' }
      ],
      nowkey: '1',
      printId: '',
      bizId: '',
      isprint: false,
      printshow: false,
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.loadData()
    this.id = this.$route.query.id
    this.printId = this.$route.query.id
    if (this.$route.query.otherid) {
      this.otherid = this.$route.query.otherid
      this.getdetails()
    }
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (this.$route.query.handleType == 0) {
      this.basedisabled = true
    }
    this.getval()
    this.setHeight('four', 'fourout', !this.showfour)
  },
  mounted () {
    this.getreasonreimbursement()
    this.getcauseforrelease()
  },
  methods: {
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
      this.showfour = true
      this.setHeight('four', 'fourout')
    },
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
    loadData () {
      this.isFromSearch = false
      this.formDataSearch = {}
      this.nowkey = '1'
      this.id = ''
      this.otherid = ''
      this.fileList = []
      this.showfour = true
      this.basedisabled = false
      this.printId = ''
      this.bizId = ''
      this.isprint = false
      this.printshow = false
      this.adoptionfileList = []
      this.adopterfileList = []
      this.notesRecordVos = []
      this.from.resetFields()
      this.from.setFieldsValue({
        handlePersonName: window.parent.indexTool.getUserInfo().userName,
        handleOrgName: window.parent.indexTool.getUserInfo().orgName,
        handleTime: moment()
      })
    },
    // 补领原因 REASONSREIMBURSEMENT
    async getreasonreimbursement () {
      const data = await this.getDictionaries('REASONSREIMBURSEMENT')
      this.reasonreimbursementlist = data
    },
    // 解除收养原因 CAUSEFORRELEASE
    async getcauseforrelease () {
      const data = await this.getDictionaries('CAUSEFORRELEASE')
      this.causeforreleaseList = data
    },
    async getval () {
      const params = {
        id: this.id
      }
      const data = await this.post('/adoption/queryRelieveById', params)
      const val = data.data.data
      this.from.setFieldsValue({
        relieveCertificateNumber: val.relieveCertificateNumber,
        printNumber: val.printNumber,
        relieveDate: moment(val.relieveDate),
        relieveReason: val.relieveReason
      })
    },
    // 获取详情
    async getdetails () {
      const params = {
        id: this.otherid
      }
      /// adoption/queryRenewRelieveById
      const data = await this.post('/adoption/queryRenewRelieveById', params)
      const fromData = this.from.getFieldsValue()
      this.adoptee = data.data.data.adoptee
      this.adoptor = data.data.data.adoptor
      this.adoptionAgency = data.data.data.adoptionAgency
      if (data.data.data.notesRecordVos) {
        this.notesRecordVos = data.data.data.notesRecordVos
      }

      // birthday adoptionCategory
      for (var k in fromData) {
        if (data.data.data[k]) {
          if (k == 'registerDate' || k == 'renewDate' || k == 'handleTime') {
            this.from.setFieldsValue({
              [k]: moment(data.data.data[k])
            })
          } else {
            this.from.setFieldsValue({
              [k]: data.data.data[k]
            })
          }
        }
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
    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
        }
      } else {
        this[tablename] = val
      }
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    setData (val) {
      this.from.setFieldsValue({
        adoptionRegistionPrintNumber: val.adoptionRegistionPrintNumber,
        registerDate: moment(val.registerDate),
        adoptionRegistionCertificateNumber: val.adoptionRegistionCertificateNumber
      })
    },
    printOk () {
      this.isprint = true
      this.printshow = false
      this.basedisabled = true
      this.nowkey = '4'
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    submit () {
      this.from.validateFields(async (err, values) => {
        if (!err) {
          const fromData = this.from.getFieldsValue()
          // ata[k].format('YYYY-MM-DD') k == 'registerDate' || k == 'certificateDate'
          fromData.relieveDate = fromData.relieveDate.format('YYYY-MM-DD')
          fromData.registerDate = fromData.registerDate.format('YYYY-MM-DD')
          fromData.renewDate = fromData.renewDate.format('YYYY-MM-DD')
          // 文件信息
          const upLoadPathIds = []
          const fileids = [...this.fileList, ...this.adoptionfileList, ...this.adopterfileList]
          fileids.map(item => {
            upLoadPathIds.push(item.response.data.data.fileid)
          })
          fromData.upLoadPathIds = upLoadPathIds
          // 笔录信息
          fromData.notesRecordVos = this.notesRecordVos
          fromData.applyPerson = this.applicantval
          fromData.registrationAdoptionId = this.id
          let url = ''
          if (this.otherid) {
            // 编辑
            url = '/adoption/renewUpdateRelieve'
            fromData.id = this.otherid
          } else {
            url = '/adoption/renewRelieve'
          }
          const data = await this.post(url, fromData, true)
          if (data.errors == null) {
            this.$message.success('提交成功')
            this.printshow = true
            this.bizId = data.data.data
            // this.backs()
          }
        } else {
          this.nowkey = '5'
          this.setHeight('four', 'fourout')
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 登记日期（登记日期）不能大于当前日期
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    }
  },
  watch: {
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.preservation {
  margin: 0 20px 0 32px;
}
</style>
