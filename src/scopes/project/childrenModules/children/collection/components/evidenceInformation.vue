<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="儿童本人身份证（户口本）"
                      :labelCol="{ span: 15}"
                      fieldDecoratorId="copyFileList"
                      :require="{enable: hasRegistered&&operateFlag!='edit_change',message:'请上传儿童本人身份证（户口本）'}"
                      :wrapperCol="{span:9}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     :disabled="disabled"
                     name="file"
                     :fileList="copyFileList"
                     @preview="preview"
                     :data="fileData('5','copyFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'copy')">
            <ta-button>
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="1"
              v-if="childType==Enum.CHILDCATEGORYA.AZBBDGRET||childType==Enum.CHILDCATEGORYA.SHSJET">
        <ta-form-item label="父母死亡或失踪证明"
                      fieldDecoratorId="parentsProveFileList"
                      :labelCol="{ span: 12 }"
                      :wrapperCol="{span:12}"
                      :fieldDecoratorOptions="{rules: [{ required: childType==Enum.CHILDCATEGORYA.SHSJET&&operateFlag!='edit_change', message: '请选择父母死亡或失踪证明'}]}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="parentsProveFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('43','parentsProveFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'parentsProve')">
            <ta-button>
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="2"
              v-if="childType==Enum.CHILDCATEGORYA.AZBBDGRET||childType==Enum.CHILDCATEGORYA.SHSJET">
        <ta-form-item :label="(childType==Enum.CHILDCATEGORYA.AZBBDGRET?'父母或':'')+'监护人身份证、户口本'"
                      fieldDecoratorId="jhrFileList"
                      :labelCol="{ span: 16 }"
                      :wrapperCol="{span:8}"
                      :fieldDecoratorOptions="{rules: [{ required: operateFlag!='edit_change', message: '请选择监护人身份证、户口本'}]}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="jhrFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('44','jhrFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'jhr')">
            <ta-button :disabled="disabled">
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8"
              key="3"
              v-if="childType==Enum.CHILDCATEGORYA.FLJGYYGQET||childType==Enum.CHILDCATEGORYA.MBJGYYGQET">
        <ta-form-item label="公安开具的拾捡证明或儿童父母死亡或失踪证明"
                      fieldDecoratorId="gaFileList"
                      :labelCol="{ span: 18 }"
                      :wrapperCol="{span:6}"
                      :fieldDecoratorOptions="{rules: [{ required: operateFlag!='edit_change', message: '请选择拾捡、死亡或失踪证明'}]}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="gaFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('54','gaFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'ga')">
            <ta-button :disabled="disabled">
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
      <ta-col :span="(childType==Enum.CHILDCATEGORYA.FLJGYYGQET||childType==Enum.CHILDCATEGORYA.MBJGYYGQET)?4:6">
        <ta-form-item label="续留证明"
                      :labelCol="{ span:12 }"
                      :wrapperCol="{span:12}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="stayFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('7','stayFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'stay')">
            <ta-button>
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="其他材料"
                      :labelCol="{ span:15 }"
                      :wrapperCol="{span:9}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :fileList="otherFileList"
                     @preview="preview"
                     :disabled="disabled"
                     :data="fileData('53','otherFileList')"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'other')">
            <ta-button>
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <div class="warntext"
           :style="{height: isOther&&!disabled?'130px':'80px'}">
        <p v-if="isOther&&!disabled">
          <ta-icon type="info-circle-o"
                   class="icons" />请根据儿童户籍地“跨省通办”业务办理要求，上传相关证明材料。相关证明材料说明可到【跨省通办证明材料说明】菜单下查看。
        </p>
        <p>
          <ta-icon type="info-circle-o"
                   class="icons" />上传附件说明：上传附件支持jpg、jpeg、png、doc、docx、pdf格式，单个文件大小不能超过10M。如附件为图片，请确保图片内容清晰，建议拍摄工具像素在1000万以上，正面拍摄，拍摄尽量避免使用闪光灯，如需上传多张证明材料，请按照顺序依次上传。
        </p>
      </div>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['disabled', 'childType', 'hasRegistered', 'operateFlag', 'isOther'],
  data () {
    return {
      copyFileList: [], // 身份证明复印件
      parentsProveFileList: [], // 父母死亡或失踪证明
      otherFileList: [], // 其他
      jhrFileList: [], // 监护人身份证明
      gaFileList: [], // 公安开具的拾捡证明或儿童父母死亡或失踪证明
      stayFileList: [] // 续留证明
    }
  },
  mounted () {
    this.resetFileDatas()
  },
  methods: {
    preview (file) { this.downloadFile(file) },
    filechange (info, flag) {
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
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    },
    // 重置附件列表
    resetFileDatas () {
      this.copyFileList = [] // 身份证明复印件
      this.parentsProveFileList = [] // 父母死亡或失踪证明
      this.otherFileList = [] // 其他
      this.jhrFileList = [] // 监护人身份证明
      this.gaFileList = [] // 公安开具的拾捡证明或儿童父母死亡或失踪证明
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
<style scoped lang="less">
.warntext {
  width: 100%;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  align-items: center;
  p {
    margin-top: 20px;
  }
}
.icons {
  margin: 0 7px 0 24px;
}
</style>
