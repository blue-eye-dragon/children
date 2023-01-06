<template>
  <div class="conts">
    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-col :span="24">
        <ta-form-item label="标题"
                      fieldDecoratorId="title"
                      :labelCol="{ span: 2 }"
                      :wrapperCol="{ span: 20}"
                      :fieldDecoratorOptions="this.verificationRules('标题', 72)">
          <ta-input :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-form>
    <ta-col :span="24">
      <ta-form-item label="内容"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{span:20}"
                    style="height:450px"
                    fieldDecoratorId="content">
        <ta-rich-editor :custom-config="customConfig"
                        ref="richEditor"
                        style="height:400px"
                        :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="升级内容操作说明"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{span:20}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :multiple="true"
                   :action="action"
                   :fileList="fileList"
                   :remove="handleRemove"
                   :beforeUpload="beforeUpload"
                   @preview="preview"
                   @change="filechange">
          <ta-button :disabled='disabled'>
            <ta-icon type="upload" />上传文件
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
    </ta-col>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
export default {
  // mixins: [listMixin],
  data () {
    return {
      fileList: [],
      uploadFiles: [],
      obj: {},
      disabled: false,
      // 配置可输入图片内容
      customConfig: {
        uploadImgShowBase64: true
      }
    }
  },
  activated () {
    this.fileList = []
    this.disabled = false
    this.uploadFiles = []
    this.obj = {}
    const url = window.location.href
    var params = url.split('?')[1].split('&')
    params.map((item) => { this.obj[item.split('=')[0]] = item.split('=')[1] })
    if (this.obj.id) {
      this.getDetails(this.obj.id)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    async getDetails (val) {
      const _self = this
      const res = await this.post('/announcements/querySystemUpgradeMsg', { id: val })
      if (res.serviceSuccess) {
        this.$nextTick(() => {
          _self.form.setFieldsValue(res.data.data)
          _self.$refs.richEditor.setContent(res.data.data.content)
          _self.fileList = res.data.data.fileList
          this.disabled = true
        })
      }
    },
    preview (file) { this.downloadFile(file) },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleRemove (e) {
      return false
      // const fileId = e.response.data.data.fileid
      // const _self = this
      // _self.post('file/deleteBatchFileByReturnFileIds', {
      //   returnFileIds: fileId
      // })
      //   .then((response) => {
      //     _self.$message.success('文件删除成功!')
      //   })
      //   .catch(() => {
      //     _self.$message.error('文件删除失败!')
      //   })
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    backs () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
// .conts {
//   width: 100%;
//   min-height: 600px;
//   background: #e4e4e4;
//   padding: 14px 14px;
// }
</style>
