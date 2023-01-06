<template>
  <div class="padbottom conts ">
    <div class="contin">
      <ta-form layout="horizontal"
               style="margin-bottom:100px"
               :autoFormCreate="(workReportForm)=>{this.workReportForm = workReportForm}">
        <ta-row class="fromcom">
          <ta-col :span="8">
            <ta-form-item label="区域"
                          :require="{message:'请输入区域'}"
                          fieldDecoratorId="areaName"
                          :initValue="areaName">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="机构名称"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="orgName"
                          :require="{message:'请输入机构名称'}"
                          :initValue="orgName">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="报送年度"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="reportSendYear"
                          :require="{message:'请选择报送年度'}">
              <ta-year-picker style="width: 100%;"
                              :disabled="disabled"
                              @change="disabledYear"
                              placeholder="请选择报送年度" />
            </ta-form-item>
          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text"
                 style="width:120px">儿童养育经费标准</p> -->
            <h3>儿童养育经费标准(元)</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="8">
            <ta-form-item label="院内儿童"
                          :labelCol="{ span: 6}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="courtyardChildren">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="寄养儿童"
                          :labelCol="{ span: 6 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="fostercareChildren">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="生活费标准"
                          :labelCol="{ span: 6}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="costOfLivingStandard">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="特困儿童补贴"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="povertyStrickenChildSubsidy">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="当地城市低保标准"
                          :labelCol="{ span: 14}"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="localMinimumLivingStandard">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="当地艾滋特困救助标准"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="localAIDSReliefStandard">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="寄养家长劳务补贴"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="laborSubsidyForFosterParents">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="当地城镇居民平均生活水平"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="localUrbanResidentsAverageStandard">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>

            <ta-form-item label="当地农村居民平均生活水平"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="localRuralResidentsAverageStandard">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>

          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text"
                 style="width:150px">城镇居民基本医疗保险</p> -->
            <h3>城镇居民基本医疗保险(元)</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="24">
            <ta-form layout="horizontal"
                     :autoFormCreate="(cityForm)=>{this.cityForm = cityForm}">
              <ta-row class="fromcom">
                <ta-col :span="8">
                  <ta-form-item label="起付标准"
                                fieldDecoratorId="payStandard">
                    <ta-input-number :min="0"
                                     :max="max"
                                     :precision="precision"
                                     :disabled="disabled"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="支付限额"
                                fieldDecoratorId="paymentLimit">
                    <ta-input-number :min="0"
                                     :max="max"
                                     :precision="precision"
                                     :disabled="disabled"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="支付比例"
                                fieldDecoratorId="paymentRatio"
                                initValue="0">
                    <ta-input-number :min="0"
                                     :disabled="disabled"
                                     :precision="precision"
                                     :max="100"
                                     :formatter="value => `${value}%`"
                                     :parser="value => value.replace('%', '')"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text"
                 style="width:110px">新农村合作医疗</p> -->
            <h3>新农村合作医疗(元)</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="24">
            <ta-form layout="horizontal"
                     :autoFormCreate="(newCountryForm)=>{this.newCountryForm = newCountryForm}">
              <ta-row class="fromcom">
                <ta-col :span="8">
                  <ta-form-item label="起付标准"
                                fieldDecoratorId="payStandard">
                    <ta-input-number :min="0"
                                     :max="max"
                                     :precision="precision"
                                     :disabled="disabled"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="支付限额"
                                fieldDecoratorId="paymentLimit">
                    <ta-input-number :min="0"
                                     :max="max"
                                     :precision="precision"
                                     :disabled="disabled"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="支付比例"
                                fieldDecoratorId="paymentRatio"
                                initValue="0">
                    <ta-input-number :min="0"
                                     :max="100"
                                     :precision="precision"
                                     :disabled="disabled"
                                     :formatter="value => `${value}%`"
                                     :parser="value => value.replace('%', '')"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text"
                 style="width:100px">农村医疗救助</p> -->
            <h3>农村医疗救助(元)</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="24">
            <ta-form layout="horizontal"
                     :autoFormCreate="(countryForm)=>{this.countryForm = countryForm}">
              <ta-row class="fromcom">
                <ta-col :span="8">
                  <ta-form-item label="起付标准"
                                fieldDecoratorId="payStandard">
                    <ta-input-number :min="0"
                                     :max="max"
                                     :precision="precision"
                                     :disabled="disabled"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="支付限额"
                                fieldDecoratorId="paymentLimit">
                    <ta-input-number :min="0"
                                     :max="max"
                                     :precision="precision"
                                     :disabled="disabled"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="支付比例"
                                fieldDecoratorId="paymentRatio"
                                initValue="0">
                    <ta-input-number :min="0"
                                     :disabled="disabled"
                                     :max="100"
                                     :precision="precision"
                                     :formatter="value => `${value}%`"
                                     :parser="value => value.replace('%', '')"
                                     style="width:100%" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text"
                 style="width:30px">收入</p> -->
            <h3>收入(元)</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="8">
            <ta-form-item label="财政收入"
                          fieldDecoratorId="revenue">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="公益金"
                          fieldDecoratorId="publicWelfareFund">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="捐赠收入"
                          fieldDecoratorId="donationIncome">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="其他收入"
                          fieldDecoratorId="otherIncome">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="其中：收养捐赠收入"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="incomeFromAdoptionAndDonation">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text"
                 style="width:30px">支出</p> -->
            <h3>支出(元)</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="8">
            <ta-form-item label="人员工资支出"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="personnelWageExpenditure">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="寄养儿童家长保育津贴"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="fostercareParentalCareAllowance">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="在院儿童生活费"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="costOfLivingForChildCourtyard">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="行政经费"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="administrativeExpenses">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="寄养儿童生活费"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="fostercareLivingExpenses">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
            <ta-form-item label="其他"
                          :labelCol="{ span: 14 }"
                          :wrapperCol="{span:10}"
                          fieldDecoratorId="other">
              <ta-input-number :min="0"
                               :max="max"
                               :precision="precision"
                               :disabled="disabled"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <div class="item_title">
            <div class="lines"></div>
            <!-- <p class="item_text">上传附件</p> -->
            <h3>上传附件</h3>
            <div class="horizontalline"></div>
          </div>
          <ta-col :span="24">
            <ta-form-item label="附件上传"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :data="other"
                         :fileList="otherfileList"
                         :beforeUpload="beforeUpload"
                         @remove="handleRemove('otherfileList',$event)"
                         @change="handleChangeOther"
                         @preview="preview">
                <ta-button :disabled="disabled">
                  <ta-icon type="upload" /> 上传
                </ta-button>
              </ta-upload>
              <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="报送人"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="reportSendPerson"
                          :fieldDecoratorOptions="this.verificationRules('报送人', 72)">
              <ta-input placeholder="请输入报送人"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="报送日期"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="reportSendDate"
                          :require="{message:'请选择报送日期'}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="disabled"
                              :valid-now-time="'right'"
                              placeholder="请选择报送日期" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs"
                 style="margin-left:20px">返回</ta-button>
      <ta-button type="primary"
                 v-if="!disabled"
                 class="preservation"
                 @click="submit()"
                 :disabled="disabled"
                 style="margin-left:20px">提交</ta-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      disabled: false,
      ifdisabled: false,
      ishide: false,
      area: '',
      areaName: '',
      orgName: '',
      otherfileList: [],
      other: {
        functionalType: '3',
        busiType: '35'
      },
      id: '',
      welfareOrgId: '',
      max: 99999999999999,
      precision: 2,
      editData: {}
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.otherfileList = []
    this.workReportForm.resetFields()
    this.cityForm.resetFields()
    this.newCountryForm.resetFields()
    this.countryForm.resetFields()
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    this.ifdisabled = this.$route.query.ifdisabled
    this.getarea()
    if (this.id) {
      this.getDetails()
    }
  },
  mounted () {
    this.getarea()
  },
  methods: {
    disabledYear (a, b) {
      const year = moment().year()
      if (Math.abs(b - year) > 100) {
        this.$message.error('请选择当前年前后100年的年度')
        this.$nextTick(() => {
          this.workReportForm.setFieldsValue({
            reportSendYear: null
          })
        })
      }
    },
    // 区域
    async getarea () {
      const data = await this.post('/welfareOrgWorkReportManagement/queryAreaAndOrgInfo')
      this.area = data.data.data.area
      this.areaName = data.data.data.areaName
      this.orgName = data.data.data.orgName
      this.welfareOrgId = data.data.data.welfareOrgId
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeOther (info) {
      if (info.file.status === 'uploading') {
        this.otherfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.otherfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.otherfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.otherfileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleRemove (file, e) {
      const _file = file
      console.log(_file)
      console.log(this._file)
      const fileId = e.response.data.data.fileid
      console.log(fileId)
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          if (response.serviceSuccess == true) {
            _self.$message.success('文件删除成功!')
          } else {
            _self.$message.error('文件删除失败!')
          }
        })
      console.log(this._file)
    },
    backs () {
      this.$router.go(-1)
    },
    // 文件上传
    fileUpload () {
      const upLoadPathIds = []
      const fileidsGather = [
        ...this.otherfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    async submit () {
      let isok = true
      const fileContent = this.fileUpload()
      // let WelfareOrgWorkReportManagementInfoVo = {}
      const welfareOrgWorkReportManagementDetailVos = []
      let welfareOrgWorkReportManagementDetailVos1 = {}
      let welfareOrgWorkReportManagementDetailVos2 = {}
      let welfareOrgWorkReportManagementDetailVos3 = {}
      let welfareOrgWorkReportManagementVo = {}
      this.workReportForm.validateFields((err, values) => {
        welfareOrgWorkReportManagementVo = values
        if (err) {
          isok = false
          this.$message.error('校验不通过，无法提交，请再次检查！')
        }
      })
      this.cityForm.validateFields((err, values) => {
        welfareOrgWorkReportManagementDetailVos1 = values
        if (err) {
          isok = false
          this.$message.error('校验不通过，无法提交，请再次检查！')
        }
      })
      this.newCountryForm.validateFields((err, values) => {
        welfareOrgWorkReportManagementDetailVos2 = values
        if (err) {
          isok = false
          this.$message.error('校验不通过，无法提交，请再次检查！')
        }
      })
      this.countryForm.validateFields((err, values) => {
        welfareOrgWorkReportManagementDetailVos3 = values
        if (err) {
          isok = false
          this.$message.error('校验不通过，无法提交，请再次检查！')
        }
      })
      if (isok) {
        let text = ''
        let url = ''
        let data = {}
        welfareOrgWorkReportManagementVo.area = this.area
        welfareOrgWorkReportManagementVo.welfareOrgId = this.welfareOrgId
        welfareOrgWorkReportManagementVo.reportSendYear = welfareOrgWorkReportManagementVo.reportSendYear.format('YYYY')
        welfareOrgWorkReportManagementVo.reportSendDate = welfareOrgWorkReportManagementVo.reportSendDate.format('YYYY-MM-DD')
        welfareOrgWorkReportManagementVo.upLoadPathIds = fileContent
        welfareOrgWorkReportManagementDetailVos1.medicalType = '1'
        welfareOrgWorkReportManagementDetailVos2.medicalType = '2'
        welfareOrgWorkReportManagementDetailVos3.medicalType = '3'
        welfareOrgWorkReportManagementDetailVos.push(welfareOrgWorkReportManagementDetailVos1, welfareOrgWorkReportManagementDetailVos2, welfareOrgWorkReportManagementDetailVos3)
        if (this.id) {
          text = '编辑成功'
          url = '/welfareOrgWorkReportManagement/update'
          welfareOrgWorkReportManagementVo.createTime = this.editData.welfareOrgWorkReportManagementVo.createTime
          welfareOrgWorkReportManagementVo.createUser = this.editData.welfareOrgWorkReportManagementVo.createUser
          welfareOrgWorkReportManagementVo.delState = this.editData.welfareOrgWorkReportManagementVo.delState
          welfareOrgWorkReportManagementVo.updateTime = this.editData.welfareOrgWorkReportManagementVo.updateTime
          welfareOrgWorkReportManagementVo.updateUser = this.editData.welfareOrgWorkReportManagementVo.updateUser
          welfareOrgWorkReportManagementVo.id = this.editData.welfareOrgWorkReportManagementVo.id
          welfareOrgWorkReportManagementVo.orgId = this.editData.welfareOrgWorkReportManagementVo.orgId
          welfareOrgWorkReportManagementDetailVos[0].id = this.editData.welfareOrgWorkReportManagementDetailVos[0].id
          welfareOrgWorkReportManagementDetailVos[0].workReportId = this.editData.welfareOrgWorkReportManagementDetailVos[0].workReportId
          welfareOrgWorkReportManagementDetailVos[1].id = this.editData.welfareOrgWorkReportManagementDetailVos[1].id
          welfareOrgWorkReportManagementDetailVos[1].workReportId = this.editData.welfareOrgWorkReportManagementDetailVos[1].workReportId
          welfareOrgWorkReportManagementDetailVos[2].id = this.editData.welfareOrgWorkReportManagementDetailVos[2].id
          welfareOrgWorkReportManagementDetailVos[2].workReportId = this.editData.welfareOrgWorkReportManagementDetailVos[2].workReportId
          if (!welfareOrgWorkReportManagementVo.orgName) {
            welfareOrgWorkReportManagementVo.orgName = this.editData.welfareOrgWorkReportManagementVo.orgName
          }
          data = {
            welfareOrgWorkReportManagementVo,
            welfareOrgWorkReportManagementDetailVos
          }
        } else {
          text = '新增成功'
          url = '/welfareOrgWorkReportManagement/save'
          data = {
            welfareOrgWorkReportManagementVo,
            welfareOrgWorkReportManagementDetailVos
          }
        }
        const res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$router.push({
            name: 'workReportRecord'
          })
          this.$message.success(text)
          this.workReportForm.resetFields()
          this.cityForm.resetFields()
          this.newCountryForm.resetFields()
          this.countryForm.resetFields()
        }
      }
    },
    async getDetails () {
      const params = {
        id: this.id
      }
      const data = await this.post('/welfareOrgWorkReportManagement/queryById', params)
      const detailData = data.data.data
      this.editData = data.data.data
      if (detailData.welfareOrgWorkReportManagementVo.fileList) {
        const fileData = detailData.welfareOrgWorkReportManagementVo.fileList
        fileData.map(item => {
          if (item.functionType == '3' && item.busiType == '35') {
            this.otherfileList.push(item)
          }
        })
      }
      this.$nextTick(() => {
        detailData.welfareOrgWorkReportManagementVo.reportSendDate = moment(detailData.welfareOrgWorkReportManagementVo.reportSendDate)
        detailData.welfareOrgWorkReportManagementVo.reportSendYear = moment(detailData.welfareOrgWorkReportManagementVo.reportSendYear)
        this.workReportForm.setFieldsValue(detailData.welfareOrgWorkReportManagementVo)
        this.cityForm.setFieldsValue(detailData.welfareOrgWorkReportManagementDetailVos[0])
        this.newCountryForm.setFieldsValue(detailData.welfareOrgWorkReportManagementDetailVos[1])
        this.countryForm.setFieldsValue(detailData.welfareOrgWorkReportManagementDetailVos[2])
      })
    }
  }
}
</script>
<style scoped>
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
  margin-bottom: 0.5em;
  margin-right: 5px;
}
.item_text {
  width: 60px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 250px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
