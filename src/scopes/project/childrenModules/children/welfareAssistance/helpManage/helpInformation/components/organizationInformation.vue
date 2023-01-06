<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="机构代码"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="creditCode"
                      :fieldDecoratorOptions="verificationRules('机构代码',18)">
          <ta-input placeholder="请输入机构代码"
                    onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="名称"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="organizeName"
                      :fieldDecoratorOptions="rules.organizeName">
          <ta-input placeholder="请输入名称"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="性质"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="organizeNature"
                      :require="{message:'请选择性质'}">
          <ta-select placeholder="请选择性质"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in organizeNature"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="业务类别"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="businessCategory">
          <ta-select placeholder="请选择业务类别"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in businessCategory"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="邮政编码"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="{validateTrigger: ['blur','change'],rules: [{ required: true, message: '请输入邮政编码' },{ pattern: /^[0-9]{6}$/, message: '请输入正确的邮政编码' }]}"
                      fieldDecoratorId="postcode">
          <!-- <ta-input-number
           /^[0-9]{6}$/
                           :len='6'
                           :max='999999'
                           :precision="0"
                           style="width:100%"
                           :disabled="disabled" /> -->
          <ta-input placeholder="请输入邮政编码"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="通讯地址"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="address"
                      :fieldDecoratorOptions="verificationRules('通讯地址',100)">
          <ta-input placeholder="请输入通讯地址"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="telephone"
                      :fieldDecoratorOptions="verificationRules('电话号码', { type: 'phone' })">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="建立日期"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="establishmentDate">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="disabled"
                          :disabledDate="disabledDate"
                          placeholder="请选择建立日期" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="主要负责人"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="head"
                      :fieldDecoratorOptions="rules.head">
          <ta-input placeholder="请输入主要负责人"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身份证号"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入身份证号"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="现有人数"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="organizeNumber">
          <ta-input-number :min="0"
                           :max="999999"
                           :precision="0"
                           style="width:100%"
                           :placeholder="!disabled?'请输入现有人数':''"
                           :disabled="disabled" />

        </ta-form-item>
      </ta-col>
    </ta-col>

    <ta-col :span="24">
      <ta-form-item label="证明材料上传"
                    class="upload"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="upload">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="credential"
                   :multiple="true"
                   :action="action"
                   :fileList="credentialList"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('personUploadFileList',$event)"
                   @preview="preview"
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
// import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  name: 'organizationInformation',
  components: {
    // AddressComponent
  },
  props: {
    organizeNature: {
      type: Array,
      required: true
    },
    businessCategory: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean
    },
    credentialList: {
      type: Array
    }

  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      credential: {
        functionalType: '1',
        busiType: '39-39'
      },
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            // { type: 'idCard', message: '请输入正确身份证号' },
            { validator: this.idcardrole }
          ]
        },
        organizeNumber: {
          validateTrigger: 'blur',
          rules: [
            { pattern: '^[0-9]*[1-9][0-9]*$', message: '请输入正整数！' }
          ]
        },
        organizeName: this.verificationRules('名称', 100),
        head: this.verificationRules('主要负责人', 72)
      }
    }
  },
  activated () {
    this.setLabelAndWrapperWidth('9.33%', '90.67%', 'upload') // 附件 字段宽度控制
  },
  methods: {
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this)
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
    },
    preview (file) { this.downloadFile(file) },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:credentialList', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        this.$emit('update:credentialList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.credentialList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.credentialList = info.fileList
        // 上传成功
        this.$emit('update:credentialList', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
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
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
