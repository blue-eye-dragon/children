<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="机构名称"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="orgName"
                    :require="{message:'请选择机构名称'}">
        <ta-select placeholder="请选择机构名称"
                   @change="orgNameChange"
                   ref="orgName"
                   :disabled="disabled">
          <ta-select-option :value="item.orgName"
                            v-for="(item,index) in orgNameList"
                            :key="index"
                            :tag="item.taorgId">{{item.orgName}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="机构类型"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="orgType"
                    :require="{message:'请选择机构类型'}">
        <ta-select placeholder="请选择机构类型"
                   @change="orgTypeBlur"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in orgType"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="机构责任人"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="orgResponsiblePerson"
                    :fieldDecoratorOptions="this.verificationRules('机构责任人',72)">
        <ta-input placeholder="请输入机构责任人"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="总投资（万元）"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="investmentTotal"
                    :require="{message:'请输入总投资'}">
        <!-- <ta-input placeholder="" :disabled="disabled"/> -->
        <ta-input-number placeholder="请输入总投资"
                         :min="0"
                         :precision="2"
                         :max="99999"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="规划床位(个)"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="planBedNumber"
                    :require="{message:'请输入规划床位'}">
        <ta-input-number placeholder="请输入规划床位"
                         :max="99999"
                         :min="0"
                         :precision="0"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="机构承办单位"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('机构承办单位',72)"
                    fieldDecoratorId="orgUndertakeCompany">
        <ta-input placeholder="请输入机构承办单位"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="机构性质"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="orgNature"
                    :require="{message:'请选择机构性质'}">
        <ta-select placeholder="请选择机构性质"
                   @change="orgNatureChange"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in orgNature"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="占地面积（㎡）"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    fieldDecoratorId="areaCovered"
                    :require="{message:'请输入占地面积'}">
        <!-- <ta-input placeholder="" :disabled="disabled"/> -->
        <ta-input-number placeholder="请输入占地面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <div v-if="orgTypes==99">
        <ta-form-item label="规划区域"
                      fieldDecoratorId="areaName"
                      :fieldDecoratorOptions="this.verificationRulesNotMustFill('规划制定人',72)"
                      :labelCol="{ span: 8}"
                      :wrapperCol="{ span: 16}">
          <ta-input :disabled="true" />
        </ta-form-item>

      </div>
      <div v-else>
        <AddressComponent msg="规划区域"
                          :labelwidth=" { label: 8,  wrapper: 16  }"
                          :ishide="ishide"
                          @setaddress="censusAddress"
                          :addressmodel="censusAddressmodel"
                          :disabled="disabled"
                          types='1'></AddressComponent>
      </div>

      <ta-form-item label="规划制定人"
                    fieldDecoratorId="planDesignatedPerson"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('规划制定人',72)"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}">
        <ta-input placeholder="请输入规划制定人"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="资金来源"
                    fieldDecoratorId="sourceOfFunds"
                    :labelCol="{ span: 4}"
                    :wrapperCol="{ span: 20}"
                    :fieldDecoratorOptions="this.verificationRules('资金来源',100)">
        <textarea placeholder="请输入资金来源"
                  maxlength='100'
                  :rows="1"
                  :disabled="disabled"
                  style="width:100%" />
      </ta-form-item>
      <ta-form-item label="建设主要内容及规模"
                    fieldDecoratorId="constructionContentsAndScale"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('建设主要内容及规模',100)"
                    :labelCol="{ span: 4}"
                    :wrapperCol="{ span: 20}">
        <textarea placeholder="请输入建设主要内容及规模"
                  maxlength='100'
                  :rows="1"
                  :disabled="disabled"
                  style="width:100%" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="附件上传"
                    :labelCol="{span:4}"
                    :wrapperCol="{span:20}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :data="attachmentUploadFile"
                   :action="action"
                   :fileList="uploadFileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('uploadFileList',$event)"
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
import AddressComponent from '@component/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      orgNameList: [], // 机构名称字典数据
      attachmentUploadFile: {
        functionalType: '3',
        busiType: '35'
      }
    }
  },
  props: {
    orgTypes: { type: String },
    disabled: {
      type: Boolean
    },
    ishide: {
      type: Boolean
    },
    // 机构类型
    orgType: {
      type: Array,
      require: true
    },
    // 机构性质
    orgNature: {
      type: Array,
      require: true
    },
    censusAddressmodel: {
      type: Array,
      required: true
    },
    uploadFileList: {
      type: Array
    },
    orgName: {
      type: String,
      require: true
    },
    orgTypeVal: {
      type: String,
      require: true
    },
    orgNatureVal: {
      type: String,
      require: true
    },
    orgNameLists: {
      type: Array
    }
  },
  activated () {
    if (!this.orgNameLists) {
      this.getOrgName()
    } else {
      this.orgNameList = this.orgNameLists
    }
  },
  methods: {
    // 获取机构名称字典数据
    getOrgName () {
      this.post('welfareOrgManagement/listOfWelfareToBefund').then((res) => {
        if (res.serviceSuccess) {
          this.orgNameList = res.data.data
        }
      })
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
    },
    setaddress () {
      this.$emit('setaddress')
    },
    censusAddress () {
      this.$emit('censusAddress')
    },
    // 机构名称change事件
    orgNameChange (val, option) {
      this.$emit('update:taorgId', option.data.attrs.tag)
      this.$emit('update:orgName', val)
    },
    orgTypeBlur (val) {
      this.$emit('update:orgTypeVal', val)
    },
    orgNatureChange (val) {
      this.$emit('update:orgNatureVal', val)
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:uploadFileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('update:uploadFileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.uploadFileList.splice(-1, 1)
          return false
        }
        this.uploadFileList = info.fileList
        // 上传成功
        this.$emit('update:uploadFileList', info.fileList)
        this.$emit('clickSearch')
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
