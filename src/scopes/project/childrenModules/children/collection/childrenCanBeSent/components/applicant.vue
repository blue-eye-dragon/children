<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="姓名"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name">
          <ta-input placeholder="请输入姓名"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
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
      <ta-col :span="6">
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
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="phoneNumber"
                      :fieldDecoratorOptions="rules.phoneNumber">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
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
      <ta-col :span="6">
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
      <ta-col :span="6">
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
      <ta-col :span="6">
        <ta-form-item label="证件号码"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="IdCardTypeValue == '01'?rules.idCard:rules.idCard2">
          <ta-input placeholder="请输入证件号码"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <AddressComponent :labelwidth="labelwidth"
                          msg="住址"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
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
import moment from 'moment';
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
  data () {
    return {
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
        phoneNumber: this.verificationRules('联系电话', { type: 'phone' }),
        //  {
        //   validateTrigger: 'blur',
        //   rules: [
        //     { required: true, message: '请输入电话号码' },
        //     { type: 'phone', message: '请输入正确请输入电话号码' }
        //   ]
        // },
        name: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入姓名' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        censusRegisterDetail: {
          validateTrigger: 'change',
          rules: [
            { required: true, message: '请输入详细住址' },
            { max: 100, message: '详细住址不超过100个字符' }
          ]
        },
        applyContent: {
          validateTrigger: 'change',
          rules: [
            { required: true, message: '请输入申请内容' },
            { max: 200, message: '最大输入200个字符' }
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
    changeIdCardTypeValue (v) {
      this.IdCardTypeValue = v;
      this.$emit('setIdCard');
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this)
    },
    callbackByIdCard (sex, age, birth) {
      let obj = {
        sex,
        age,
        birth
      }
      this.$emit('setdate', obj)
    },
    setaddress () {
      this.$emit('setaddress')
    },
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
        return current && current > moment().endOf('day');
    }
  }
}
</script>
<style scoped lang="less">
</style>
