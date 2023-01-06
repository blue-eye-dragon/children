<template>
  <div style="height:100%">
    <div class="topmsg">
      1、请按要求，尽可能全部上传送养人，收养人相关证件。送养人证件包括：法定代表人户口簿、居民身份证、经办人户口簿、居民身份证、入院证明、收养协议、抚养义务人同意送养的证明、被收养人户口簿、捡拾报案证明、生父母死亡证明、身体检查证明。收养人证件包括：户口簿、居民身份证、子女情况证明、婚姻状况及有抚养教育被收养人能力的证明、身体健康检查证明。
      <br />
      2、文件名称命名规则，建议为：姓名+证件类型（例：XXX-身份证）
    </div>
    <div class="separate">
      <div class="line"></div>
      <p>送养人相关证件</p>
    </div>
    <ta-upload :withCredentials="true"
               name="file"
               :action="action"
               listType="picture-card"
               :fileList="fileList"
               :multiple="true"
               @preview="handlePreview"
               :beforeUpload="beforeUpload"
               @change="handleChange">
      <div v-if="fileList.length < 3">
        <ta-icon type="plus" />
        <div class="ant-upload-text">点击选择图片</div>
      </div>
    </ta-upload>
    <p class="warntext">
      <ta-icon type="info-circle-o"
               class="icons" />
      支持文件格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
    </p>
    <div class="separate">
      <div class="line"></div>
      <p>收养人相关证件</p>
    </div>
    <ta-upload :withCredentials="true"
               name="file"
               :action="action"
               listType="picture-card"
               :fileList="fileList2"
               :multiple="true"
               @preview="handlePreview"
               @change="handleChange">
      <div v-if="fileList.length < 3">
        <ta-icon type="plus" />
        <div class="ant-upload-text">点击选择图片</div>
      </div>
    </ta-upload>
    <p class="warntext">
      <ta-icon type="info-circle-o"
               class="icons" />
      支持文件格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
    </p>
    <ta-modal :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel">
      <img alt="example"
           style="width: 100%"
           :src="previewImage" />
    </ta-modal>
  </div>
</template>
<script>
export default {
  name: 'revoke',
  props: {
    types: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fileList: [],
      fileList2: [],
      previewVisible: false,
      previewImage: '',
      action: ''
    }
  },
  mounted () {
    this.action = window.faceConfig.basePath + '/file/uploadFile'
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      // this.previewImage = file.url || file.thumbUrl
      this.downloadFile(file)
      this.previewVisible = true
    },
    handleChange (val) {
      // this.fileList = fileList
      console.log('chans')
      console.log(val)
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
</style>
