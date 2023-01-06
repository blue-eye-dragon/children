<template>
  <ta-row class="fromcom">
    <ta-col :span="8">
      <ta-form-item label="儿童本人身份证（户口本）"
                    :labelCol="{ span:11 }"
                    :wrapperCol="{span:13}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   :action="action"
                   name="file"
                   :fileList="childFileList"
                   :remove="handleRemove"
                   @preview="preview"
                   :disabled="disabled"
                   :data="fileData('5','childFileList')"
                   :beforeUpload="beforeUpload"
                   @change="filechange($event,'child')">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传文件
          </ta-button>
        </ta-upload>
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="续留证明"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   :action="action"
                   name="file"
                   :fileList="stayFileList"
                   :remove="handleRemove"
                   @preview="preview"
                   :disabled="disabled"
                   :data="fileData('7','stayFileList')"
                   :beforeUpload="beforeUpload"
                   @change="filechange($event,'stay')">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传文件
          </ta-button>
        </ta-upload>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['disabled'],
  data () {
    return {
      childFileList: [], // 儿童本人身份证（户口本）
      stayFileList: [] // 续留证明
    }
  },
  methods: {
    preview (file) { this.downloadFile(file) },
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this[`${flag}FileList`] = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this[`${flag}FileList`] = info.fileList
      }
      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this[`${flag}FileList`] = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this[`${flag}FileList`] = []
          this.$message.error('文件上传失败!')
        }

        this.$emit('uochanhei')
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
          _self.$emit('uochanhei')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    },
    // 重置附件列表
    resetFileDatas () {
      this.childFileList = [] // 儿童本人身份证（户口本）
      this.stayFileList = [] // 续留证明
    }
  },
  updated: function () {
    this.$emit('uochanhei')
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
