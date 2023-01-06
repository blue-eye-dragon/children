<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="体检日期"
                      fieldDecoratorId="physicalDate"
                      :require="adoptOrSanju?{enable:!adoptOrSanju}:{message:'请选择体检日期'}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择体检日期':''"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="体检机构"
                      fieldDecoratorId="physicalOrg"
                      :fieldDecoratorOptions="adoptOrSanju?verificationRulesNotMustFill('体检机构', 100):verificationRules('体检机构',100)">
          <ta-input :disabled="disabled"
                    :placeholder="!disabled?'请输入体检机构':''" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身高(cm)"
                      fieldDecoratorId="childHeight">
          <ta-input-number :min="0"
                           :max="999"
                           :precision="0"
                           style="width:100%"
                           :placeholder="!disabled?'请输入身高':''"
                           :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="体重(kg)"
                      fieldDecoratorId="childWeight">
          <ta-input-number :min="0"
                           :max="999"
                           :precision="2"
                           style="width:100%"
                           :placeholder="!disabled?'请输入体重':''"
                           :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <AddressComponent :addressmodel="addressmodelPm"
                          :msg="'体检机构地址'"
                          :labelwidth="{ label: 7, wrapper: 17}"
                          :disabled="disabled"
                          :isRequire="false"
                          fileldName="physicalDatas"
                          @setaddress="setAddress"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label
                      fieldDecoratorId="physicalDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 15,offset:1 }"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('详细地址',100)">
          <ta-input :disabled="disabled"
                    :placeholder="!disabled?'请输入详细地址':''" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="体检总结"
                    class="alonerow"
                    fieldDecoratorId="physicalSummed"
                    :fieldDecoratorOptions="adoptOrSanju?verificationRulesNotMustFill('体检总结', 200):verificationRules('体检总结',200, false)">
        <ta-textarea :disabled="disabled"
                     :placeholder="!disabled?'请输入体检总结':''"
                     :rows="2" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="附件上传"
                    :fieldDecoratorOptions="{validateTrigger: ['blur','change'],rules: [{ required: !adoptOrSanju, message: '请上传附件'}]}"
                    class="alonerow"
                    fieldDecoratorId="file">
        <ta-upload :withCredentials="true"
                   name="file"
                   :disabled="disabled"
                   :multiple="true"
                   :action="action"
                   :fileList="fileList"
                   @remove="handleRemove"
                   :data="fileData('52')"
                   :beforeUpload="beforeUpload"
                   @preview="preview"
                   @change="filechange">
          <ta-button>
            <ta-icon type="upload" /> 上传文件
          </ta-button>
        </ta-upload>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <p class="warntext"
         style="font-size:14px">
        <ta-icon type="info-circle-o"
                 class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
      </p>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  props: ['disabled', 'addressmodelPm', 'adoptOrSanju'],
  data () {
    return {
      fileList: [] // 入院/增员体检信息附件
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('6.3%', '93.7%', 'alonerow') // 体检单独一行字段宽度控制
  },
  methods: {
    // 地址传值
    setAddress () {
      this.$emit('setphysicaladdress')
    },
    // 体检日期不能选择未来日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
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
        this.$emit('uochanhei')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e) {
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
          _self.$emit('uochanhei')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    },
    // 重置附件列表
    resetFileDatas () {
      this.fileList = [] // 文件列表
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
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
  .icons {
    margin: 0 7px 0 24px;
  }
}
</style>
