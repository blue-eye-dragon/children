<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="姓名"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name">
          <ta-input placeholder="请输入姓名"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="性别"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="sex"
                      :require="{message:'请选择性别'}">
          <ta-select placeholder="请选择性别"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身份证号"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入身份证号"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="出生日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="birthday"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="disabled"
                          placeholder="请选择出生日期" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">

      <ta-col :span="6">
        <AddressComponent msg="户籍所在地"
                          :labelwidth="{ label: 9,
          wrapper: 15}"
                          fieldDecoratorId="censusRegisterCity"
                          @setaddress="censusAddress"
                          :addressmodel="censusAddressmodel"
                          :disabled="disabled"></AddressComponent>
      </ta-col>

      <ta-col :span="6">
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="rules.censusRegisterDetail">
          <ta-input placeholder="请输入详细地址"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <AddressComponent msg="常居住地址"
                          :labelwidth="{ label: 9,wrapper: 15}"
                          :fileldName="fileldName"
                          fieldDecoratorId="currentAddressCity"
                          @setaddress="currentAddress"
                          :addressmodel="currentAddressmodel"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label
                      fieldDecoratorId="currentAddressDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="rules.currentAddressDetail">
          <ta-input placeholder="请输入详细地址"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="telephone"
                      :fieldDecoratorOptions="rules.telephone">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="工作单位"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="unit">
          <ta-input placeholder="请输入工作单位"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="18">
        <ta-form-item label="证明材料上传"
                      :labelCol="{span:3}"
                      :wrapperCol="{span:21}">
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="personInfUploadFile"
                     :multiple="true"
                     :action="action"
                     :fileList="personInfUploadFileList"
                     :beforeUpload="beforeUpload"
                     @preview="preview"
                     @remove="handleRemove('personInfUploadFileList',$event)"
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

    </ta-col>

  </ta-row>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  name: 'personalInformation',
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
      fileldName: 'copy_address_Linkage',
      headers: {
        authorization: 'authorization-text'
      },
      isvalidator: false,
      errMsg: null, // 身份证号错误信息
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        // telephone: this.verificationRules('电话号码', { type: 'phone' }),
        telephone: this.phoneRule(true, '请输入正确的电话号码'),
        name: this.verificationRules('姓名', 72),
        censusRegisterDetail: this.verificationRules('详细地址', 100),
        currentAddressDetail: this.verificationRules('详细地址', 100),
        applyContent: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入申请内容' },
            { max: 200, message: '最大输入200个字符' }
          ]
        }
      },
      personInfUploadFile: {
        functionalType: '1',
        busiType: '39'
      }
    }
  },
  props: {
    sexList: {
      type: Array,
      required: true
    },
    censusAddressmodel: {
      type: Array,
      required: true
    },
    currentAddressmodel: {
      type: Array,
      required: true
    },
    censusreguster: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean
    },
    personInfUploadFileList: {
      type: Array
    }
  },
  methods: {
    censusAddress () {
      this.$emit('censusAddress')
    },
    currentAddress () {
      this.$emit('currentAddress')
    },
    idcardrole (rule, value, callback) {
      let _self = this
      if (!_self.isvalidator) {
        // _self.errMsg ? callback(_self.errMsg[0]) : callback()
        callback()
      } else {
        this.idCardValidate(rule, value, callback, _self)
      }
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setdate', sex, age, birth)
    },
    setaddress () {
      this.$emit('setaddress')
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    preview (file) { this.downloadFile(file) },
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
    handleChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:personInfUploadFileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        this.$emit('update:personInfUploadFileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.personInfUploadFileList.splice(-1, 1)
          return false
        }
        this.personInfUploadFileList = info.fileList
        // 上传成功
        this.$emit('update:personInfUploadFileList', info.fileList)
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
