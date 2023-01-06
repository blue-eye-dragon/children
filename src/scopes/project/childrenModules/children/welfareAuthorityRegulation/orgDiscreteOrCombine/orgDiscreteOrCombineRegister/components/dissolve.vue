<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="原机构名称"
                    fieldDecoratorId="orgName"
                    :require="{message:'请选择机构名称'}">
        <!-- <ta-input placeholder="请输入机构名称"
                 :disabled="disabled"/> -->
        <ta-select placeholder="请选择机构名称"
                   style="width:80%"
                   :disabled="disabled">
          <ta-select-option :value="item.orgName"
                            v-for="(item,index) in orgNameList"
                            :key="index">{{item.orgName}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="解散日期"
                    fieldDecoratorId="dissolutionDate"
                    :require="{message:'请选择解散日期'}">
        <ta-date-picker style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="disabled"
                        :disabledDate="disabledDate"
                        placeholder="请选择解散日期" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="申办人"
                    fieldDecoratorId="applicant"
                    :fieldDecoratorOptions="this.verificationRules('申办人',72)">
        <ta-input placeholder="请输入申办人"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="解散原因"
                    fieldDecoratorId="dissolutionReason"
                    :labelCol="{ span: 3}"
                    :wrapperCol="{ span: 21}"
                    :fieldDecoratorOptions="rules.dissolutionReason">
        <ta-textarea placeholder="请输入解散原因"
                     :disabled="disabled"
                     style="width:100%" />
      </ta-form-item>
      <ta-form-item label="附件上传"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :multiple="true"
                   :action="action"
                   :data="other"
                   :fileList="otherfileList"
                   :beforeUpload="beforeUpload"
                   @preview="preview"
                   @remove="handleRemove('otherfileList',$event)"
                   @change="handleChangeOther">
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
  data () {
    return {
      other: {
        functionalType: '3',
        busiType: '35-35-35'
      },
      rules: {
        applicant: this.verificationRules('申办人', 20),
        dissolutionReason: this.verificationRules('解散原因', 200, true)
      }
    }
  },
  props: {
    orgNameList: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean
    },
    otherfileList: {
      type: Array
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    moment,
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeOther (info) {
      console.log('chans')
      console.log(info)
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        // this.otherfileList = info.fileList
        this.$emit('update:otherfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        console.log(info.file.status)
        // this.otherfileList = info.fileList
        this.$emit('update:otherfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.otherfileList.splice(-1, 1)
          return false
        }
        this.otherfileList = info.fileList
        // 上传成功
        // this.otherfileList = info.fileList
        this.$emit('update:otherfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },

    disabledDate (current) {
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
    }
  }
}
</script>
