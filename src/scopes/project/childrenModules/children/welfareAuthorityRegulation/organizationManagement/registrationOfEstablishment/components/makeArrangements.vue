<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <div v-if="orgTypes==99">
        <ta-form-item label="筹办区域"
                      fieldDecoratorId="areaName"
                      :fieldDecoratorOptions="this.verificationRulesNotMustFill('规划制定人',72)"
                      :labelCol="{ span: 6}"
                      :wrapperCol="{ span: 18}">
          <ta-input :disabled="true" />
        </ta-form-item>

      </div>
      <div v-else>
        <AddressComponent msg="筹办区域"
                          :ishide="ishide"
                          :isrule='true'
                          :addressmodel="actualAreaAddressmodel"
                          :disabled="disabled"
                          @adsvalchange="actualAreaAddressChange"
                          @setaddress="actualAddress"
                          types="1"></AddressComponent>
      </div>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="实际占地面积（㎡）"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="actualArea"
                    :require="{message:'请输入实际占地面积'}">
        <!-- <ta-input placeholder="" :disabled="disabled"/> -->
        <ta-input-number placeholder="请输入实际占地面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="具体地址"
                    fieldDecoratorId="specificAddress"
                    :labelCol="{ span: 3}"
                    :wrapperCol="{ span: 21}"
                    :fieldDecoratorOptions="verificationRules('具体地址',100)">
        <!-- <textarea placeholder="请输入具体地址"
                  :disabled="disabled"
                  style="width:100%" /> -->
        <ta-input style="width:43%"
                  placeholder="请输入具体地址"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="筹办人"
                    fieldDecoratorId="orgEstablishBidPerson"
                    :fieldDecoratorOptions="verificationRules('筹办人',72)">
        <ta-input placeholder="请输入筹办人"
                  :disabled="disabled"
                  @blur="orgEstablishBidPersonBlur" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="申请日期"
                    fieldDecoratorId="orgEstablishBidDate"
                    :require="{message:'请选择申请日期'}">
        <ta-date-picker @change="orgEstablishBidDateChange"
                        style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="disabled"
                        :disabledDate="disabledDate"
                        placeholder="请选择申请日期" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="筹办申请书、申请表"
                    :labelCol="{span:4}"
                    :wrapperCol="{span:20}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="applicationForOrganization"
                   :fileList="OrganizationfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('OrganizationfileList',$event)"
                   @change="handleChangeaOrganization">
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
    <ta-col :span="24">
      <ta-form-item label="可行性研究报告"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="FSR"
                   :fileList="FSRfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('FSRfileList',$event)"
                   @change="handleChangeaFSR">
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
    <ta-col :span="24">
      <ta-form-item label="筹办人资格证明"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="qualification"
                   :fileList="qualificationfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('qualificationfileList',$event)"
                   @change="handleChangeaqualification">
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
    <ta-col :span="24">
      <ta-form-item label="资金来源证明或验资报告"
                    :labelCol="{span:4}"
                    :wrapperCol="{span:20}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="capitalSource"
                   :fileList="capitalSourcefileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('capitalSourcefileList',$event)"
                   @change="handleChangecapitalSource">
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
    <ta-col :span="24">
      <ta-form-item label="固定场所证明"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="yolene"
                   :fileList="yolenefileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('yolenefileList',$event)"
                   @change="handleChangeyolene">
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
    <ta-col :span="24">
      <ta-form-item label="其他材料"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="otherMaterial"
                   :fileList="otherMaterialfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('otherMaterialfileList',$event)"
                   @change="handleChangeotherMaterial">
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
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      // 筹办申请处资料
      applicationForOrganization: {
        functionalType: '3',
        busiType: '12'
      },
      FSR: {
        functionalType: '3',
        busiType: '13'
      },
      qualification: {
        functionalType: '3',
        busiType: '14'
      },
      capitalSource: {
        functionalType: '3',
        busiType: '15'
      },
      yolene: {
        functionalType: '3',
        busiType: '16'
      },
      otherMaterial: {
        functionalType: '3',
        busiType: '17'
      }
      // orgEstablishBidPerson: ''
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  props: {
    orgTypes: { type: String },
    disabled: {
      type: Boolean
    },
    actualAreaAddressmodel: {
      type: Array,
      required: true
    },
    OrganizationfileList: {
      type: Array
    },
    FSRfileList: {
      type: Array
    },
    qualificationfileList: {
      type: Array
    },
    capitalSourcefileList: {
      type: Array
    },
    yolenefileList: {
      type: Array
    },
    otherMaterialfileList: {
      type: Array
    },
    ishide: {
      type: Boolean
    },
    orgEstablishBidPersonVal: {
      type: String,
      required: true
    },
    orgEstablishBidDateVal: {
      type: String,
      required: true
    },
    actualAreaAddressVal: {
      type: Array
    }
  },
  methods: {

    disabledDate (current) {
      return current > moment().endOf('day')
    },
    preview (file) { this.downloadFile(file) },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleRemove (file, e) {
      const fileId = e.response.data.data.fileid
      const _self = this
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
      // .catch(() => {
      //   _self.$message.error('文件删除失败!')
      // })
    },
    setaddress () {
      this.$emit('setaddress')
    },
    actualAddress () {
      this.$emit('actualAddress')
    },
    orgEstablishBidPersonBlur (val) {
      this.$emit('update:orgEstablishBidPersonVal', val.srcElement.value)
    },
    orgEstablishBidDateChange (val) {
      val = val.format('YYYY-MM-DD')

      this.$emit('update:orgEstablishBidDateVal', val)
    },
    actualAreaAddressChange (val) {
      this.$emit('update:actualAreaAddressVal', val)
    },
    handleChangeaOrganization (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:OrganizationfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }

        this.$emit('update:OrganizationfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.OrganizationfileList.splice(-1, 1)
          return false
        }
        this.OrganizationfileList = info.fileList
        // 上传成功
        this.$emit('update:OrganizationfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeaFSR (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:FSRfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }

        this.$emit('update:FSRfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.FSRfileList.splice(-1, 1)
          return false
        }
        this.FSRfileList = info.fileList
        // 上传成功
        this.$emit('update:FSRfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeaqualification (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:qualificationfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }

        this.$emit('update:qualificationfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.qualificationfileList.splice(-1, 1)
          return false
        }
        this.qualificationfileList = info.fileList
        // 上传成功
        this.$emit('update:qualificationfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChangecapitalSource (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:capitalSourcefileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }

        this.$emit('update:capitalSourcefileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.capitalSourcefileList.splice(-1, 1)
          return false
        }
        this.capitalSourcefileList = info.fileList
        // 上传成功
        this.$emit('update:capitalSourcefileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeyolene (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:yolenefileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }

        this.$emit('update:yolenefileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.yolenefileList.splice(-1, 1)
          return false
        }
        this.yolenefileList = info.fileList
        // 上传成功
        this.$emit('update:yolenefileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeotherMaterial (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:otherMaterialfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }

        this.$emit('update:otherMaterialfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.otherMaterialfileList.splice(-1, 1)
          return false
        }
        this.otherMaterialfileList = info.fileList
        // 上传成功
        this.$emit('update:otherMaterialfileList', info.fileList)
        this.$message.success('文件上传成功!')
      }
    }
  }
}
</script>
<style scoped>
textarea {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.7);
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
