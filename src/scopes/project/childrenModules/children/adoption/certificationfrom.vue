<template>
  <div :class="evaluate=='yes'?'':'conts tadrawer'">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="基本信息"
                     :forceRender="true"
                     key="1">
          <Basic :id="id"
                 :thisP="thisP"
                 :basedisabled="true"
                 @setData="setData"
                 :applicantval.sync="applicantval"></Basic>

        </ta-tab-pane>
        <ta-tab-pane tab="笔录信息"
                     :forceRender="true"
                     key="2">
          <Record :basedisabled="basedisabled"
                  :notesRecordVos="notesRecordVos"
                  @chaadoptorChildrenVos="chaadoptorChildrenVos"></Record>
        </ta-tab-pane>
        <ta-tab-pane tab="情况说明"
                     :forceRender="true"
                     key="5">
          <div ref="fourout"
               class="mars">
            <Title id="anchorpoint_d"
                   title="出具证明情况说明"
                   :show.sync="showfour"></Title>
            <ta-form layout="horizontal"
                     ref="four"
                     :autoFormCreate="(from)=>{this.from = from}">
              <ta-row>
                <ta-col :span="12">
                  <ta-form-item label="出具证明类型"
                                fieldDecoratorId="certificateType"
                                :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择出具证明类型'}]}">
                    <ta-select placeholder="请选择出具证明类型"
                               :disabled="true">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in typeCertificationList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <!-- :require="{message:'请输入登记证印制号'}" -->
                  <ta-form-item v-if="!ishide"
                                label="登记证印制号"
                                fieldDecoratorId="adoptionRegistionPrintNumber">
                    <ta-input placeholder="请输入登记证印制号"
                              :disabled="true" />
                  </ta-form-item>
                  <!-- <template v-else> -->
                  <ta-form-item v-else
                                label="解除登记证印制号"
                                fieldDecoratorId="printNumber">
                    <ta-input placeholder="请输入解除登记证印制号"
                              :disabled="true" />
                  </ta-form-item>
                  <!-- </template> -->
                </ta-col>

                <ta-col :span="12">
                  <ta-form-item v-if="!ishide"
                                label="收养登记日期"
                                fieldDecoratorId="registerDate"
                                :require="{message:'请选择登记日期'}">
                    <ta-date-picker style="width: 100%;"
                                    placeholder="请选择登记日期"
                                    :disabled="true" />
                  </ta-form-item>
                  <ta-form-item v-else
                                label="解除登记日期"
                                fieldDecoratorId="relieveDate"
                                :require="{message:'请选择解除登记日期'}">
                    <ta-date-picker style="width: 100%;"
                                    placeholder="请选择解除登记日期"
                                    :disabled="true" />
                  </ta-form-item>
                  <ta-form-item v-if="!ishide"
                                label="登记证字号"
                                fieldDecoratorId="adoptionRegistionCertificateNumber"
                                :require="{message:'请输入登记证字号'}">
                    <ta-input placeholder="请输入登记证字号"
                              :disabled="true" />
                  </ta-form-item>
                  <ta-form-item v-else
                                label="解除登记证字号"
                                fieldDecoratorId="relieveCertificateNumber"
                                :require="{message:'请输入解除登记证字号'}">
                    <ta-input placeholder="请输入解除登记证字号"
                              :disabled="true" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="出具证明原因"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="provideReason"
                                :fieldDecoratorOptions="rules.provideReason">
                    <ta-textarea placeholder="请输入出具证明原因"
                                 :rows="2"
                                 :disabled="basedisabled" />
                  </ta-form-item>
                  <ta-form-item label="送养人提供的证件情况"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="placingOutCredentials"
                                :fieldDecoratorOptions="rules.placingOutCredentials">
                    <ta-textarea placeholder="请输入送养人提供的证件情况"
                                 :disabled="basedisabled"
                                 :rows="2" />
                  </ta-form-item>
                  <ta-form-item label="收养人提供的证件情况"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="adoptorCredentials"
                                :fieldDecoratorOptions="rules.adoptorCredentials">
                    <ta-textarea placeholder="请输入收养人提供的证件情况"
                                 :disabled="basedisabled"
                                 :rows="2" />
                  </ta-form-item>
                  <ta-form-item label="审核意见"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="opinion"
                                :fieldDecoratorOptions="rules.opinion">
                    <ta-input placeholder="请输入审核意见"
                              :disabled="basedisabled" />
                  </ta-form-item>
                  <ta-form-item label="备注"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                fieldDecoratorId="remarks"
                                :fieldDecoratorOptions="rules.remarks">
                    <ta-textarea :placeholder="basedisabled?'':'请输入备注'"
                                 :rows="2"
                                 :disabled="basedisabled" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="登记日期"
                                fieldDecoratorId="certificateDate"
                                :require="{message:'请选择登记日期'}">
                    <ta-date-picker style="width: 100%;"
                                    placeholder="请选择登记日期"
                                    :disabled="basedisabled"
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                  <ta-form-item v-if="otherid"
                                label="证明字号"
                                fieldDecoratorId="certificateNumber"
                                :fieldDecoratorOptions="rules.certificateNumber">
                    <ta-input placeholder="请输入证明字号"
                              :disabled="true" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="档案页数"
                                fieldDecoratorId="archivesCount"
                                :require="{message:'请输入档案页数'}">
                    <ta-input-number :min="1"
                                     :max="999999"
                                     :precision=0
                                     style="width:100%"
                                     :disabled="basedisabled"
                                     placeholder="请输入档案页数" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <processingInformation></processingInformation>
                </ta-col>
              </ta-row>
              <!-- </ta-form> -->
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="文件上传"
                     :forceRender="true"
                     key="3">
          <FileUpload :fileList.sync="fileList"
                      :adoptionfileList.sync="adoptionfileList"
                      :adopterfileList.sync='adopterfileList'
                      :filedisabled="filedisabled"></FileUpload>
        </ta-tab-pane>
        <ta-tab-pane tab="打印"
                     :forceRender="true"
                     key="4"
                     v-if='isprint'>
          <Printing :printlist='printlist'
                    :printId='printId'
                    :bizId="bizId"></Printing>
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
                 @click="submit"
                 v-if="handleType!=0">提交</ta-button>
    </div>
    <ta-modal title="提交成功"
              :visible="printshow"
              @ok="printOk"
              okText="打印"
              @cancel="printno">
      <p><b>出具收养登记证明提交成功！是否需要打印相关材料？</b></p>
      <p>后续打印请到收养业务查询页面打印。</p>
    </ta-modal>
  </div>
</template>
<script>
import Record from './components/record'
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import processingInformation from './components/processingInformation'
import Basic from './components/basic'
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  name: 'applicant',
  props: {
    evaluate: { type: String, require: false },
    goId: { type: String, require: false }
  },
  components: {
    Basic,
    Record,
    FileUpload,
    Printing,
    Title,
    processingInformation
  },
  data () {
    return {
      thisP: this,
      applicantval: '1',
      showfour: true,
      // 笔录信息
      notesRecordVos: [],
      fileList: [],
      // 文件上传
      adoptionfileList: [],
      adopterfileList: [],
      nowkey: '1',
      id: '',
      otherid: '',
      handleType: '',
      filedisabled: false,
      basedisabled: false,
      // 不在表单的数据
      typeCertificationList: [],
      flowStatus: '',
      printlist: [
        { name: '收养登记证明书', url: '/adoption/printRegisterCertificate', src: 'static/img/certificationfrom1.jpg' },
        { name: '出具收养登记证明申请书 ', url: '/adoption/printCertificateApply', src: 'static/img/certificationfrom2.jpg' },
        { name: '出具收养登记证明询问笔录', url: '/adoption/printCertificateNotes', src: 'static/img/certificationfrom3.jpg' },
        { name: '出具收养登记证明审查处理表', url: '/adoption/printCertificateApproverecord', src: 'static/img/certificationfrom4.jpg' }
      ],
      printId: '',
      bizId: '',
      isprint: false,
      printshow: false,
      ishide: false,
      rules: {
        provideReason: this.verificationRules('出具证明原因', 200, true),
        opinion: this.verificationRules('审核意见', 200),
        remarks: this.verificationRulesNotMustFill('备注', 200, true),
        certificateNumber: this.verificationRules('证明字号', 100),
        placingOutCredentials: this.verificationRules('送养人提供的证件情况', 200, true),
        adoptorCredentials: this.verificationRules('收养人提供的证件情况', 200, true)
      },
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.loadData()
    this.id = this.$route.query.id
    if (this.evaluate == 'yes') {
      this.id = this.goId
    }
    this.printId = this.id
    this.handleType = this.$route.query.handleType
    if (this.$route.query.flowStatus) {
      this.flowStatus = this.$route.query.flowStatus
      // certificateType
      this.from.setFieldsValue({
        certificateType: this.flowStatus
      })
      if (this.flowStatus == 2) {
        this.ishide = true
        this.getRelieveData()
      } else {
        this.ishide = false
      }
    }
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (this.$route.query.otherid) {
      this.otherid = this.$route.query.otherid
      this.getdetails()
    }
    if (this.evaluate == 'yes') {
      this.id = this.goId
      this.printId = this.goId
      this.otherid = this.goId
      this.getdetails()
      this.basedisabled = true
    }
    if (this.handleType == 5) {
      this.filedisabled = false
      this.basedisabled = false
    } else {
      this.filedisabled = true
      this.basedisabled = true
    }
    this.showfour = true
    // this.initHeight('four', 'fourout')
  },
  mounted () {
    // window.onresize = () => {
    //   this.setHeight('four', 'fourout', !this.showfour)
    // }
    this.gettypeCertification()
  },
  methods: {
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
    // 出具证明 TYPEOFCERTIFICATION
    async gettypeCertification () {
      const data = await this.getDictionaries('TYPEOFCERTIFICATION')
      this.typeCertificationList = data
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
    // 登记日期不能选择收养（解除）登记日期之前及当前日期之后的日期
    disabledDate (current) {
      const date = this.from.getFieldsValue()[this.ishide ? 'relieveDate' : 'registerDate']
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
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
      const node = this.$refs[refout]
      this.$nextTick(() => {
        node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
      })
    },
    loadData () {
      this.isFromSearch = false
      this.formDataSearch = {}
      this.notesRecordVos = []
      this.fileList = []
      this.adoptionfileList = []
      this.adopterfileList = []
      this.nowkey = '1'
      this.ishide = false
      this.id = ''
      this.otherid = ''
      this.printId = ''
      this.bizId = ''
      this.isprint = false
      this.printshow = false
      this.handleType = ''
      this.filedisabled = false
      this.basedisabled = false
      this.flowStatus = ''
      this.from.resetFields()
      this.from.setFieldsValue({
        handlePersonName: window.parent.indexTool.getUserInfo().userName,
        handleOrgName: window.parent.indexTool.getUserInfo().orgName,
        handleTime: moment()
      })
    },
    async getRelieveData () {
      const params = {
        id: this.id
      }
      const data = await this.post('/adoption/queryRelieveById', params)
      if (data.errors == null) {
        const obj = data.data.data
        this.from.setFieldsValue({
          printNumber: obj.printNumber,
          relieveDate: moment(obj.relieveDate),
          relieveCertificateNumber: obj.relieveCertificateNumber
        })
      }
    },
    setData (val) {
      this.from.setFieldsValue({
        adoptionRegistionPrintNumber: val.adoptionRegistionPrintNumber,
        registerDate: moment(val.registerDate),
        adoptionRegistionCertificateNumber: val.adoptionRegistionCertificateNumber
      })
    },
    // 获取详情
    async getdetails () {
      const params = {
        id: this.otherid
      }
      const data = await this.post('/adoption/queryCertificateById', params)
      const fromData = this.from.getFieldsValue()

      // notesRecordVos
      if (data.data.data.notesRecordVos) {
        this.notesRecordVos = data.data.data.notesRecordVos
      }
      // adoptionCategory 儿童类别
      // birthday
      for (var k in fromData) {
        if (data.data.data[k]) {
          if (k == 'registerDate' || k == 'certificateDate' || k == 'handleTime') {
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
    callback (key) {
      this.nowkey = key
      this.initHeight('four', 'fourout')
    },
    printOk () {
      this.isprint = true
      this.printshow = false
      this.handleType = 0
      this.nowkey = '4'
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    async submit () {
      this.from.validateFields(async (err, values) => {
        if (!err) {
          const fromData = this.from.getFieldsValue()
          // ata[k].format('YYYY-MM-DD') k == 'registerDate' || k == 'certificateDate'
          fromData.registerDate = fromData.registerDate.format('YYYY-MM-DD')
          fromData.certificateDate = fromData.certificateDate.format(
            'YYYY-MM-DD'
          )
          // 文件信息
          const upLoadPathIds = []
          const fileids = [...this.fileList, ...this.adoptionfileList, ...this.adopterfileList]
          fileids.map(item => {
            upLoadPathIds.push(item.response.data.data.fileid)
          })
          fromData.upLoadPathIds = upLoadPathIds
          // 笔录信息
          fromData.notesRecordVos = this.notesRecordVos

          fromData.registrationAdoptionId = this.id

          // 申请人
          fromData.applyPerson = this.applicantval
          let url = ''
          if (this.otherid) {
            // 编辑
            url = '/adoption/updateCertificate'
            fromData.id = this.otherid
          } else {
            url = '/adoption/provideCertificate'
          }
          const data = await this.post(
            url,
            fromData,
            true
          )
          if (data.errors == null) {
            this.$message.success('提交成功')
            this.printshow = true
            this.bizId = data.data.data
          }
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
          this.nowkey = '5'
          this.setHeight('four', 'fourout')
        }
      })
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
    }
  },
  watch: {
    showfour (val) {
      this.$nextTick(() => {
        this.setHeight('four', 'fourout', !val)
      })
    }
  }
}
</script>
<style scoped lang="less">
.preservation {
  margin-left: 20px;
}
</style>
