<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="申请人类型"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="isOrg"
                      :initValue="'0'"
                      :require="{message:'请选择申请人类型'}">
          <ta-select placeholder="请选择申请人类型"
                     :disabled="disabled"
                     @change="changeOrg">
            <ta-select-option :value="'0'">个人</ta-select-option>
            <ta-select-option :value="'1'">机构</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="orgName"
              v-if="isshow">
        <ta-form-item label="机构名称"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="orgName"
                      :fieldDecoratorOptions="rules.orgName">
          <ta-input placeholder="请输入机构名称"
                    :disabled="disabled" />

          <!-- <ta-select showSearch
                     :disabled="disabled"
                     optionFilterProp="children"
                     :value="valueT"
                     placeholder="请输入福利机构名称"
                     :defaultActiveFirstOption="false"
                     :showArrow="false"
                     :filterOption="false"
                     :searchDelay="1"
                     @search="handleSearch"
                     @change="mechanismchange">
            <ta-select-option v-for="d in mechanismList"
                              :key="d.id"
                              :value='d.id'>{{d.orgName}}</ta-select-option> -->
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="name"
              v-if="!isshow">
        <ta-form-item label="姓名"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="!isshow?this.verificationRules('姓名', 72):this.verificationRulesNotMustFill('姓名', 72)">
          <ta-input placeholder="请输入姓名"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="legalName"
              v-if="isshow">
        <ta-form-item label="法人姓名"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="legalName">
          <!-- :fieldDecoratorOptions="rules.legalName" -->
          <ta-input placeholder="请输入法人姓名"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="legalIdCard"
              v-if="isshow">
        <ta-form-item label="法人身份证号"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="legalIdCard"
                      :fieldDecoratorOptions="this.verificationRulesNotMustFill('身份证号', 18)">
          <ta-input placeholder="请输入身份证号"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="sex"
              v-if="!isshow">
        <ta-form-item label="性别"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
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
      <ta-col :span="6"
              key="nation"
              v-if="!isshow">
        <ta-form-item label="民族"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="nation"
                      :require="{message:'请选择民族'}">
          <ta-select placeholder="请选择民族"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6"
              key="birthday"
              v-if="!isshow">
        <ta-form-item label="出生日期"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="birthday"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="disabled"
                          :disabledDate="disabledDate"
                          placeholder="请选择出生日期" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="identityCategory"
              v-if="!isshow">
        <ta-form-item label="身份类别"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="identityCategory"
                      :require="{message:'请选择身份类别'}">
          <ta-select placeholder="请选择身份类别"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in identityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="memberIdType"
              v-if="!isshow">
        <ta-form-item label="证件类别"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="memberIdType"
                      :require="{message:'请选择证件类别'}"
                      :initValue='this.Enum.IDCARD_TYPE.NDJMSFZ'>
          <ta-select placeholder="请选择证件类别"
                     @change="changeIdCardTypeValue"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in idcardTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="0">
        <ta-form-item label="国籍"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="nationality"
                      :require="{message:'请选择国籍'}"
                      :initValue='this.Enum.NATIONALITY.ZG'>
          <ta-select placeholder="请选择国籍"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationalityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="idCard"
              v-if="!isshow">
        <ta-form-item label="证件号码"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="IdCardTypeValue == '01'?rules.idCard:rules.idCard2">
          <ta-input placeholder="请输入证件号码"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="unifiedSocialCreditCode"
              v-if="isshow">
        <ta-form-item label="统一社会信用代码"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="unifiedSocialCreditCode">
          <!-- :fieldDecoratorOptions="rules.orgName" -->
          <ta-input placeholder="请输入统一社会信用代码"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12"
              key="orgAddressDetail"
              v-if="isshow">
        <ta-form-item label="机构地址"
                      :labelCol="{span:4}"
                      :wrapperCol="{span:20}"
                      fieldDecoratorId="orgAddressDetail">
          <ta-input placeholder="请输入机构地址"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6"
              key="phoneNumber"
              v-if="!isshow">
        <ta-form-item label="联系电话"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="phoneNumber"
                      :fieldDecoratorOptions="rules.phoneNumber">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6"
              key="address_Linkage"
              v-if="!isshow">
        <AddressComponent :labelwidth="labelwidth"
                          msg="户籍地"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6"
              key="censusRegisterDetail"
              v-if="!isshow">
        <ta-form-item label
                      :fieldDecoratorOptions="rules.censusRegisterDetail"
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input placeholder="请输入详细住址"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="申请内容"
                    class="alonerow1"
                    fieldDecoratorId="applyContent"
                    :labelCol="{span:2}"
                    :wrapperCol="{span:22}"
                    :fieldDecoratorOptions="rules.applyContent">
        <ta-textarea placeholder="请输入申请内容"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  name: 'applicant',
  components: {
    AddressComponent
  },
  props: {
    addressmodel: {
      type: Array,
      required: true
    },
    mechanismList: {
      type: Array,
      required: false
    },
    identityList: {
      type: Array,
      required: true
    },
    sexList: {
      type: Array,
      required: true
    },
    nationalityList: {
      type: Array,
      required: true
    },
    nationList: {
      type: Array,
      required: true
    },
    idcardTypeList: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  activated () {
    this.isshow = false
  },
  data () {
    return {
      isshow: false,
      valueT: undefined,
      labelwidth: {
        label: 8,
        wrapper: 16
      },
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: this.verificationRules('证件号码', 18),
        phoneNumber: {
          validateTrigger: ['change', 'blur'],
          rules: [
            { required: true, message: '请输入正确手机号' },
            { validator: this.phonerole }
          ]
        },
        //  {
        //   validateTrigger: 'blur',
        //   rules: [
        //     { required: true, message: '请输入电话号码' },
        //     { type: 'phone', message: '请输入正确请输入电话号码' }
        //   ]
        // },
        name: {
          validateTrigger: 'change',
          rules: [
            { required: true, whitespace: true, message: '请输入姓名' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        orgName: {
          validateTrigger: 'change',
          rules: [
            { required: true, whitespace: true, message: '请输入机构名称' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        legalName: {
          validateTrigger: 'change',
          rules: [
            { required: true, whitespace: true, message: '请输入法人姓名' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        censusRegisterDetail: {
          validateTrigger: 'change',
          rules: [
            { required: true, whitespace: true, message: '请输入详细住址' },
            { max: 100, message: '详细住址不超过100个字符' }
          ]
        },
        applyContent: {
          validateTrigger: 'change',
          rules: [
            { required: true, whitespace: true, message: '请输入申请内容' },
            { max: 150, message: '最大输入150个字符' }
          ]
        }
      },
      IdCardTypeValue: '01'
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.3%', '91.7%', 'alonerow1') // 单独一行字段宽度控制
  },
  methods: {
    async handleSearch (value) {
      const data = await this.post('welfareOrgManagement/queryListByOrgId', { orgName: value.trim() })
      this.$emit('update:mechanismList', data.data.data)
    },
    // 机构名称change事件
    mechanismchange (val) {
      this.valueT = val
      this.$emit('mechanismchange', val)// 赋值
    },
    changeIdCardTypeValue (v) {
      this.IdCardTypeValue = v
      this.$emit('setIdCard')
    },
    changeOrg (e) {
      this.$emit('changeOrg', e)
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this)
    },
    phonerole (rule, value, callback) {
      if (!value || value == '') {
        callback()
      } else {
        if (value.length > 10 && value.length < 15) {
          callback()
        } else {
          callback('请输入正确的手机号码')
        }
      }
    },
    callbackByIdCard (sex, age, birth) {
      const obj = {
        sex,
        age,
        birth
      }
      this.$nextTick(() => {
        this.$emit('setdate', obj)
      })
    },
    setaddress () {
      this.$emit('setaddress')
    },
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      return current && current > moment().endOf('day')
    }
  }
}
</script>
<style scoped lang="less">
</style>
