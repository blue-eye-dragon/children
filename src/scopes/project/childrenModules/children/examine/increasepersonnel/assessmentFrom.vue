<template>
  <div class="conts">
    <div class="contin contpadtop">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row style="width: 100%">
          <ta-col :span="8">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入儿童姓名'}]}">
              <ta-input placeholder="请输入儿童姓名"
                        :disabled='true' />
            </ta-form-item>

          </ta-col>

          <ta-col :span="8">
            <ta-form-item label="评估报告出具日期"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="assessmentReportDate"
                          :require="{message:'请选择评估报告出具日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              :valid-now-time="'right'"
                              placeholder="请选择评估报告出具日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="评估专家组建日期"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="expertFormationDate"
                          :require="{message:'请选择评估专家组建日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              placeholder="请选择评估专家组建日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="评估专家组成员"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="assessmentExpertMember"
                          :fieldDecoratorOptions="verificationRules('评估专家组成员',32,false)">
              <ta-textarea placeholder="请输入评估专家组成员"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
            <ta-form-item label="其他人员"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="otherMember"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('其他人员',32,true)">
              <ta-textarea placeholder="请输入其他人员"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
            <ta-form-item label="本机构参与人员"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="orgParticipant"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('本机构参与人员',32,true)">
              <ta-textarea placeholder="请输入本机构参与人员"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="评估起始日期"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="assessmentStartDate"
                          :require="{message:'请选择评估起始日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              placeholder="请选择评估起始日期"
                              @openChange="handleStartOpenChange"
                              :disabledDate="disabledStartDate"
                              v-model="startValue" />
            </ta-form-item>

            <ta-form-item label="是否需长期医疗康复"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="longRecovery"
                          :require="{message:'请选择是否需长期医疗康复'}">
              <ta-select allowClear
                         placeholder="请选择是否需长期医疗康复"
                         :disabled="disabled">
                <ta-select-option v-for="item in canSelfCareList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="评估终止日期"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="assessmentEndDate"
                          :require="{message:'请选择评估终止日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              placeholder="请选择评估终止日期"
                              @openChange="handleEndOpenChange"
                              :disabledDate="disabledEndDate"
                              v-model="endValue" />
            </ta-form-item>
            <ta-form-item label="既往医疗康复情况"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="rehabilitation"
                          :require="{message:'请选择既往医疗康复情况'}">
              <ta-select allowClear
                         placeholder="请选择既往医疗康复情况"
                         :disabled="disabled">
                <ta-select-option v-for="item in rehabilitationList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="能否自理"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="canSelfCare"
                          :require="{message:'请选择能否自理'}">
              <ta-select allowClear
                         placeholder="请选择能否自理"
                         :disabled="disabled">
                <ta-select-option v-for="item in canSelfCareList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="是否需长期专人照料"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="longCareFor"
                          :require="{message:'请选择是否需长期专人照料'}">
              <ta-select allowClear
                         placeholder="请选择是否需长期专人照料"
                         :disabled="disabled">
                <ta-select-option v-for="item in canSelfCareList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="建议安置类型"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="suggestedPlacementType"
                          :fieldDecoratorOptions="{initialValue: '1',rules: [{ required: true, message: '请选择建议安置类型'}]}">
              <ta-radio-group :disabled="disabled">
                <ta-radio v-for="item in suggestedPlacementTypeList"
                          :key="item.value"
                          :value="item.value"
                          :disabled="disabled">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item label="其他建议"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="otherOpinion"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('其他建议',200,true)">
              <ta-textarea placeholder="请输入其他建议"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
            <ta-form-item label="评估报告上传"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 9 }">
              <ta-upload-dragger name="file"
                                 :withCredentials="true"
                                 :multiple="true"
                                 :action="action"
                                 :disabled="disabled"
                                 :fileList="fileList"
                                 @remove="handleRemove"
                                 @preview="preview"
                                 :data="fileData('8','disabilityFileList')"
                                 :beforeUpload="beforeUpload"
                                 @change="filechange">
                <p class="ant-upload-drag-icon">
                  <ta-icon type="cloud-upload" />
                </p>
                <p class="ant-upload-text">点击或将文件拖拽到这里上传，支持jpg、jpeg、png、doc、docx、pdf文件格式</p>
              </ta-upload-dragger>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 v-if="flag=='assessment'"
                 @click="submit">提交</ta-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      reportList: {}, // 增员评估报告列表数据
      assessmentList: {}, // 评估数据
      flag: '', // 区分评估（assessment）和查看（look）

      startValue: null,
      endValue: null,
      endOpen: false,

      canSelfCareList: [], // 能否自理字典数据
      rehabilitationList: [], // 既往医疗康复情况字典数据
      suggestedPlacementTypeList: [], // 建议安置类型字典数据

      disabled: false,
      fileList: [],
      fileIdList: [] // 存放文件id的数组

    }
  },
  activated () {
    this.initDatas()
  },
  methods: {
    // 初始化数据
    initDatas () {
      // 重置表单数据
      this.form.resetFields()
      this.disabled = false
      this.fileIdList = [] // 存放文件id的数组
      this.reportList = JSON.parse(this.$route.query.reportList)
      this.assessmentList = JSON.parse(this.$route.query.assessmentList)
      this.flag = this.$route.query.flag
      this.form.setFieldsValue({
        name: this.reportList.name,
        identityType: this.reportList.childNumber
      })
      if (this.flag == 'look') {
        this.disabled = true
        this.assessmentList.expertFormationDate = moment(this.assessmentList.expertFormationDate)
        this.assessmentList.assessmentReportDate = moment(this.assessmentList.assessmentReportDate)
        this.assessmentList.assessmentStartDate = moment(this.assessmentList.assessmentStartDate)
        this.assessmentList.assessmentEndDate = moment(this.assessmentList.assessmentEndDate)
        // 文件回显
        this.fileList = this.assessmentList.fileList
        this.form.setFieldsValue(this.assessmentList)
      }

      this.getMenu('YESNO', 'canSelfCareList') // 获取能否自理字典数据
      this.getMenu('REHABILITATION', 'rehabilitationList') // 获取既往医疗康复情况字典数据
      this.getMenu('RESETTLEMENTTYPE', 'suggestedPlacementTypeList') // 获取建议安置类型字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 起始日期与终止日期的限制-start
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open
    },
    // 起始日期与终止日期的限制-end

    // 评估提交
    submit () {
      let isok = true
      const _self = this
      _self.form.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      var form = _self.form.getFieldsValue()
      form.childEnterId = _self.reportList.id
      form.upLoadPathIds = _self.fileIdList
      _self.changetime(form)
      if (isok) {
        _self.post('/addChildAssessmentApi/saveChildAssessment', form).then((res) => {
          if (res.serviceSuccess) {
            _self.$message.success('数据保存成功！')
            // 重置表单数据
            _self.form.resetFields()
            _self.backs()
          }
        })
      } else {
        _self.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    // 返回
    backs () {
      this.fileList = []
      this.$router.go(-1)
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.fileIdList.push(info.file.response.data.data.fileid)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) { this.downloadFile(file) },
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
          this.fileIdList.splice(this.fileIdList.indexOf(fileId), 1)
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
<style scoped lang="less">
.contpadtop {
  padding-top: 20px;
}
.preservation {
  margin: 0 20px 0 32px;
}
</style>
