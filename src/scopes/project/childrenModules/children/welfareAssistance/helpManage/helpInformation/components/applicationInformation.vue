<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="助养类型"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :require="{message:'请选择助养类型'}"
                      fieldDecoratorId="sponsorshipType">
          <ta-select placeholder="请选择类型"
                     :disabled="disabled">
            <ta-select-option v-for="(item ,index) in sponsorshipType"
                              :key="index"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="助养儿童意向"
                      :labelCol="{ span:11}"
                      :wrapperCol="{span:13}"
                      fieldDecoratorId="sponsorshipIntention">
          <ta-select placeholder="请选择助养儿童意向"
                     :disabled="disabled">
            <ta-select-option v-for="(item ,index) in sponsorshipIntention"
                              :key="index"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="申请日期"
                      :labelCol="{ span:9}"
                      :wrapperCol="{span:15}"
                      :require="{message:'请选择申请日期'}"
                      fieldDecoratorId="applicationDate">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="disabled"
                          :disabledDate="disabledDate"
                          placeholder="请选择申请日期" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="助养内容描述"
                    :fieldDecoratorOptions="rules.sponsorshipContent"
                    fieldDecoratorId="sponsorshipContent"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-textarea placeholder="请输入助养内容描述"
                     style="width:100%"
                     :disabled="disabled"></ta-textarea>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="审核意见"
                    fieldDecoratorId="auditOpinion"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('审核意见',200,true)">
        <ta-textarea placeholder="请输入审核意见"
                     style="width:100%"
                     :disabled="disabled"></ta-textarea>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="备注"
                    :fieldDecoratorOptions="{rules: [{ max: 200, message: '允许输入字段最大长度为200个字符' }]}"
                    fieldDecoratorId="remark"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-textarea placeholder="请输入备注"
                     style="width:100%"
                     :disabled="disabled"></ta-textarea>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="材料上传"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    :require="{message:'请上传材料'}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="personUploadFile"
                   :multiple="true"
                   :action="action"
                   :fileList="personUploadFileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('personUploadFileList',$event)"
                   @change="handleChange">
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
  </ta-row>

</template>
<script>
import moment from 'moment'
export default {
  name: 'organizationInformation',
  data () {
    return {
      personUploadFile: {
        functionalType: '1',
        busiType: '40'
      },
      rules: {
        sponsorshipContent: this.verificationRules('助养内容描述', 200, false)
      }
    }
  },
  components: {

  },
  props: {
    sponsorshipType: {
      type: Array,
      required: true
    },
    sponsorshipIntention: {
      type: Array
    },
    disabled: {
      type: Boolean
    },
    personUploadFileList: {
      type: Array
    }

  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleRemove (file, e) {
      let fileId = e.response.data.data.fileid
      let _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          if (response.serviceSuccess == true) {
            _self.$message.success('文件删除成功!')
            this.file.splice(this.file.indexOf(val), 1)
          } else {
            _self.$message.error('文件删除失败!')
          }
        })
    },
    preview (file) { this.downloadFile(file) },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:personUploadFileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        this.$emit('update:personUploadFileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.personUploadFileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.personUploadFileList = info.fileList
        this.$emit('update:personUploadFileList', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    }
  }
}
</script>
<style scoped lang="less">
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
