<template>
  <div style="height:100%">
    <!-- <div class="topmsg">
      1、请按要求，尽可能全部上传送养人，收养人相关证件。送养人证件包括：法定代表人户口簿、居民身份证、经办人户口簿、居民身份证、入院证明、收养协议、抚养义务人同意送养的证明、被收养人户口簿、捡拾报案证明、生父母死亡证明、身体检查证明。收养人证件包括：户口簿、居民身份证、子女情况证明、婚姻状况及有抚养教育被收养人能力的证明、身体健康检查证明。
      <br />2、文件名称命名规则，建议为：姓名+证件类型（例：XXX-身份证）
    </div>-->
    <div v-if="additionalYesOrNo=='1'">
      <div class="separate">
        <div class="line"></div>
        <div>
          <div style="position: absolute;color: red;font-size: 22px;left: 0px;">*</div>收养登记证
        </div>
      </div>
      <div class="files">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="syCardData"
                   :fileList="syCardFileList"
                   @preview="handlePreview"
                   :beforeUpload="beforeUpload"
                   @change="syCardHandleChange">
          <div>
            <ta-button :disabled="filedisabled">
              <ta-icon type="upload" />上传
            </ta-button>
          </div>
        </ta-upload>
      </div>
      <p class="warntext">
        <ta-icon type="info-circle-o"
                 class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
      </p>
    </div>
    <div class="separate">
      <div class="line"></div>
      <div>
        <div v-if="isshowFile"
             style="position: absolute;color: red;font-size: 22px;left: 0px;">*</div>送养人相关证件
      </div>
    </div>
    <div class="files">
      <ta-upload :withCredentials="true"
                 :multiple="true"
                 name="file"
                 :action="action"
                 :data="updata"
                 :fileList="fileList"
                 @preview="handlePreview"
                 :beforeUpload="beforeUpload"
                 @change="handleChange">
        <div>
          <ta-button :disabled="filedisabled">
            <ta-icon type="upload" />上传
          </ta-button>
        </div>
      </ta-upload>
    </div>
    <p class="warntext">
      <ta-icon type="info-circle-o"
               class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
    </p>
    <div class="separate">
      <div class="line"></div>
      <p>收养人相关证件</p>
    </div>
    <div class="files">
      <ta-upload :withCredentials="true"
                 :multiple="true"
                 name="file"
                 :action="action"
                 :data="adoption"
                 :fileList="adoptionfileList"
                 @preview="handlePreview"
                 :beforeUpload="beforeUpload"
                 @change="handleChangeadoption">
        <div>
          <ta-button :disabled="filedisabled">
            <ta-icon type="upload" />上传
          </ta-button>
        </div>
      </ta-upload>
    </div>
    <p class="warntext">
      <ta-icon type="info-circle-o"
               class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
    </p>
    <div class="separate">
      <div class="line"></div>
      <p>被收养人相关证件</p>
    </div>
    <div class="files">
      <ta-upload :withCredentials="true"
                 :multiple="true"
                 name="file"
                 :action="action"
                 :data="Adopterdata"
                 :fileList="adopterfileList"
                 @preview="handlePreview"
                 :beforeUpload="beforeUpload"
                 @change="adoptionfileChange">
        <div>
          <ta-button :disabled="filedisabled">
            <ta-icon type="upload" />上传
          </ta-button>
        </div>
      </ta-upload>
    </div>
    <p class="warntext">
      <ta-icon type="info-circle-o"
               class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
    </p>
  </div>
</template>
<script>
export default {
  name: 'revoke',
  props: {
    additionalYesOrNo: {
      type: String
    },
    isshowFile: {
      type: Boolean,
      default: false
    },
    adoptionfileList: {
      type: Array,
      required: true
    },
    adopterfileList: {
      type: Array,
      required: true
    },
    syCardFileList: {
      type: Array
    },
    fileList: {
      type: Array,
      required: true
    },
    filedisabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      // 送养人相关证件
      updata: {
        functionalType: '1',
        busiType: '1'
      },
      syCardData: {
        functionalType: '1',
        busiType: '22'
      },
      // 送养人相关证件
      adoption: {
        functionalType: '1',
        busiType: '2'
      },
      Adopterdata: {
        functionalType: '1',
        busiType: '11'
      }
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    // this.action = window.faceConfig.basePath + '/file/uploadFile'
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    syCardHandleChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:syCardFileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.$emit('update:syCardFileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.syCardFileList.splice(-1, 1)
          return false
        }
        this.syCardFileList = info.fileList
        // 上传成功
        this.$emit('update:syCardFileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    adoptionfileChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:adopterfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.$emit('update:adopterfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.adopterfileList.splice(-1, 1)
          return false
        }
        this.adopterfileList = info.fileList
        // 上传成功
        this.$emit('update:adopterfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:fileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.$emit('update:fileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        this.fileList = info.fileList
        // 上传成功
        this.$emit('update:fileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeadoption (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:adoptionfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.$emit('update:adoptionfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.adoptionfileList.splice(-1, 1)
          return false
        }
        this.adoptionfileList = info.fileList
        // 上传成功
        this.$emit('update:adoptionfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    }
  }
}
</script>

<style scoped lang="less">
.topmsg {
  width: 100%;
  height: 133px;
  background: rgba(238, 247, 251, 1);
  padding: 21px 27px 22px 43px;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
}
.separate {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 22px 0;
  height: 22px;
}
.line {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  margin-right: 3px;
}
.separate p {
  font-size: 14px;
  font-weight: 400;
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
.icons {
  margin: 0 7px 0 24px;
}
.files {
  width: 300px;
}
</style>
