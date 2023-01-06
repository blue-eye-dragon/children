<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="监护协议">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="retentionFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('45','retentionFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'retention')">
            <ta-button :disabled="disabled">
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="其他">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="oldPeopleFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('46','oldPeopleFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'oldPeople')">
            <ta-button :disabled="disabled">
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['disabled', 'guardian', 'childType'],
  data () {
    return {
      retentionFileList: [], // 监护协议
      oldPeopleFileList: [] // 其他
    }
  },
  methods: {
    filechange (info, flag) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this[`${flag}FileList`] = info.fileList
      }
      if (info.file.status === 'removed') {
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
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    },
    // 重置附件列表
    resetFileDatas () {
      this.retentionFileList = [] // 监护协议
      this.oldPeopleFileList = [] // 其他
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
</style>
