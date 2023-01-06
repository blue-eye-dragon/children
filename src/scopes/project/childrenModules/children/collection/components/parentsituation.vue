<template>
  <div class="nofy">
    <div class="titletop">
      <img :src="imgsrc"
           alt />
      <span>{{titletext}}</span>
      <ta-checkbox-group @change="ismanChange"
                         v-model="copyisman"
                         class="radio_grops"
                         :disabled='disabled'>
        <ta-checkbox :value="types"
                     class="apply">单亲</ta-checkbox>
      </ta-checkbox-group>
    </div>
    <ta-col :span="14">
      <ta-form-item label="信息状况"
                    fieldDecoratorId='infoCase'
                    :fieldDecoratorOptions="isrequired?rules.infoCase:rules.infoCase2"
                    :labelCol="{ span: 7 }"
                    initValue='1'
                    :wrapperCol="{ span: 16 }">
        <ta-radio-group @change="infoCasechs"
                        :disabled='disabled2'>
          <ta-radio :value="item.value"
                    v-for="(item,index) in infocaseList"
                    :key="index">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="10">
      <ta-form-item label="是否监护人"
                    fieldDecoratorId='isGuardian'
                    initValue='1'
                    :fieldDecoratorOptions="isrequired?rules.isGuardian:rules.isGuardian2"
                    :labelCol="{ span: 11 }"
                    :wrapperCol="{ span: 13 }">
        <ta-radio-group @change="isGuardianchs"
                        :disabled='(this.isGuardiandisabled || !this.isrequired)||disabled2'>
          <ta-radio :value="item.value"
                    v-for="(item,index) in isInoculatedList"
                    :key="index">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="现状况"
                    fieldDecoratorId='currentSituation'
                    :fieldDecoratorOptions="isrequired?rules.currentSituation:rules.currentSituation2"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 20 }">
        <ta-radio-group @change="zkChange"
                        :disabled='disabled2'>
          <ta-radio :value="item.value"
                    v-for="(item,index) in presentsituationlist"
                    :key="index">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
      <ta-form-item label="其他"
                    v-if="zkval==9"
                    fieldDecoratorId="currentSituationOther"
                    :fieldDecoratorOptions="isrequired?rules.currentSituationOther:rules.currentSituationOther2"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 20 }">
        <ta-input :disabled="disabled2"
                  maxlength='50'
                  placeholder="请输入其他情况"
                  type="text" />
      </ta-form-item>
    </ta-col>
    <ta-col v-if="showOverTime=='6'||showOverTime=='7'"
            :span="12">
      <ta-form-item :label="showOverTime=='6'?'服刑结束日期':'戒毒结束日期'"
                    fieldDecoratorId='overTime'
           :fieldDecoratorOptions=" this.selectNotMust()"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-date-picker placeholder="请选择结束日期"  :disabled='disabled2'/>
      </ta-form-item>
    </ta-col>

    <ta-col :span="12">
      <ta-form-item label="姓名"
                    fieldDecoratorId='name'
                    :fieldDecoratorOptions="(isrequired&&iscomplete)?rules.name:rules.name2"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-input :placeholder="disabled2?'':'请输入姓名'"
                  @blur="sendDataToRecipient('name')"
                  maxlength='72'
                  :disabled='disabled2' />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="联系电话"
                    fieldDecoratorId='contactNumber'
                    :fieldDecoratorOptions="isphonerule&&isrequired&&iscomplete?rules.contactNumber:rules.contactNumber1"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-input :placeholder="disabled2?'':'请输入联系电话'"
                  @blur="sendDataToRecipient('contactNumber')"
                  maxlength='17'
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :disabled='disabled2' />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="证件类型"
                    fieldDecoratorId="memberIdType"
                    :fieldDecoratorOptions="(isrequired&&iscomplete)?
                    {rules: [{ required: true, message: '请选择证件类型' }]}
                    :{rules: [{ required: false, message: '请选择证件类型' }]}"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-select :placeholder="disabled?'':'请选择证件类型'"
                   :disabled='disabled2'
                   @change="idCardTypeChange">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in idCardTypeList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="证件号码"
                    fieldDecoratorId="idCard"
                    key='2'
                    :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: (isrequired&&iscomplete), message: '请输入证件号码' },{validator:idCardValid}]}"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }"
                    ref='idCard'>
        <ta-input :placeholder="disabled2?'':'请输入证件号码'"
                  @blur="sendDataToRecipient('idCard')"
                  :disabled='disabled2' />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if='!iscomplete'>
      <ta-form-item label="文件上传"
                    fieldDecoratorId="fileid"
                    :fieldDecoratorOptions="{rules: [{ required: false, message: '' }]}"
                    :validateStatus="validateStatus"
                    :help="validateStatus=='success'?'':helptext"
                    :required='true'
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{ span: 20 }">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="updataparent"
                   :fileList="parentlist"
                   @preview="handlePreview"
                   :beforeUpload="beforeUpload"
                   @change="handleChange">
          <div>
            <ta-button :disabled="disabled2">
              <ta-icon type="upload" />上传
            </ta-button>
          </div>
        </ta-upload>
      </ta-form-item>
    </ta-col>
  </div>
</template>
<script>
export default {
  props: {
    showOverTime: {
      type: String
    },
    types: {
      type: String,
      required: true
    },
    thisP: {
      required: true
    },
    zkval: {
      type: String,
      required: true
    },
    validateStatus: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    isGuardiandisabled: {
      type: Boolean,
      required: true
    },
    isman: {
      type: Array,
      required: true
    },
    isrequired: {
      type: Boolean,
      required: true
    },
    isphonerule: {
      type: Boolean,
      required: true
    },
    idCardTypeList: {
      type: Array,
      required: true
    },
    iscomplete: {
      type: Boolean,
      required: true
    },
    parentlist: {
      type: Array,
      required: true
    },
    updataparent: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      titletext: '',
      imgsrc: '',
      imgsrc1: require('./img/parentman.png'),
      imgsrc2: require('./img/parentwomen.png'),
      presentsituationlist: [],
      rules: {
        name: this.verificationRules('姓名', 72),
        name2: this.verificationRulesNotMustFill('姓名', 72),
        idCard: this.verificationRules('身份证号', { type: 'idCard' }),
        idCard2: this.verificationRulesNotMustFill('身份证号', { type: 'idCard' }),
        contactNumber: this.phoneRule(true),
        contactNumber1: this.phoneRule(),
        currentSituation: this.verificationRules('现状况'),
        currentSituation2: { validateTrigger: 'change', rules: [{ required: false }] },
        infoCase: this.verificationRules('信息状况'),
        infoCase2: { validateTrigger: 'change', rules: [{ required: false }] },
        isGuardian: this.verificationRules('是否监护人'),
        isGuardian2: { validateTrigger: 'change', rules: [{ required: false }] },
        currentSituationOther: this.verificationRules('其他情况', 50),
        currentSituationOther2: this.verificationRulesNotMustFill('其他情况', 50)
      },
      copyisman: [],
      isInoculatedList: [],
      infocaseList: [],
      helptext: '请上传文件',
      isvalidator: false,
      errMsg: null // 身份证号错误信息
    }
  },
  mounted () {
    this.types == 1 ? (this.titletext = '父亲') : (this.titletext = '母亲')
    this.types == 1 ? this.imgsrc = this.imgsrc1 : this.imgsrc = this.imgsrc2
    this.getpresentsituation()
    this.getYESNO()
    this.getINFOCASE()
  },
  methods: {
    // 同步数据到帮扶建议的领取人
    sendDataToRecipient (name) {
      this.$emit('sendDataToRecipient', name, 'baselifeForm', this.types == 1 ? 'fatherForm' : 'motherForm')
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChange (info) {
      if (this.disabled2) {
        return false
      }
      this.$emit('update:validateStatus', info.fileList.length == 0 ? 'error' : 'success')
      if (info.file.status === 'uploading') {
        this.$emit('update:parentlist', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled2) {
          return false
        }
        this.$emit('update:parentlist', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.parentlist]
          arrlist.splice(-1, 1)
          this.$emit('update:parentlist', arrlist)
          return false
        }
        // 上传成功
        this.$emit('update:parentlist', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    // 信息状况 INFOCASE
    async getINFOCASE () {
      const data = await this.getDictionaries('INFOCASE')
      this.infocaseList = data
    },
    // 获取是否监护人
    async getYESNO () {
      const data = await this.getDictionaries('YESNO')
      this.isInoculatedList = data
    },
    idCardTypeChange (val) {
      const text = this.types == 1 ? 'fatherForm' : 'motherForm'
      this.$emit('idCardTypeValue', text)
      // 同步数据到帮扶建议领取人
      this.$emit('sendDataToRecipient', 'memberIdType', 'baselifeForm', text, val)
    },
    ismanChange (val) {
      const arr = []
      arr.push(val[val.length - 1])
      this.$emit('update:isman', arr)
      this.$emit('ismanChange', arr)
    },
    // 现状况字典
    async getpresentsituation () {
      const data = await this.getDictionaries('PRESENTSITUATION')
      this.presentsituationlist = data
    },
    inpchanges (e) {
    },
    // 监护人change
    isGuardianchs (e) {
      this.$emit('changeRequire')
      this.$emit('update:isphonerule', e.target.value == 1)
    },
    // 信息状况
    infoCasechs (e) {
      this.$emit('update:iscomplete', e.target.value == 1)
      if (this.types == 1) {
        this.thisP.fatherForm.resetFields()
        this.thisP.zkval = '0'
        this.thisP.isphonerule = true
        this.thisP.isGuardiandisabled = false
      } else {
        this.thisP.motherForm.resetFields()//
        this.thisP.zkval1 = '0'
        this.thisP.isphonerule1 = true
        this.thisP.isGuardiandisabled = false
      }

      this.$emit('update:parentlist', [])
    },
    zkChange (e) {
      this.$emit('zkChange', e.target.value, this.types)
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const text = this.types == 1 ? 'fatherForm' : 'motherForm'
      if (!this.isvalidator) {
        callback()
      } else {
        this.$emit('idCardValid', rule, value, callback, this, text)
      }
    }

  },
  computed: {
    disabled2 () {
      return this.disabled || !this.isrequired
    },
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    isman (val) {
      this.copyisman = [...val]
      if (val.length == 0) {
        this.$emit('update:isrequired', true)
      } else {
        if (!val[0]) {
          this.$emit('update:isrequired', true)
        } else {
          if (this.types != val[val.length - 1]) {
            this.$emit('update:isrequired', false)
          } else {
            this.$emit('update:isrequired', true)
          }
        }
      }
    }

  }
}
</script>
<style lang="less" scoped>
.titletop {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin: 10px 0 20px 0;
}
.titletop img {
  height: 100%;
  margin-right: 10px;
  margin-left: 12%;
}
.nofy /deep/.ant-radio-wrapper {
  margin-right: 11px;
}
.radio_grops {
  margin-left: 20px;
}
</style>
