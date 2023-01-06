<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="12">
        <ta-form-item label="福利机构名称"
                      fieldDecoratorId="welfareInstitutionName"
                      :require="{message:'请选择福利机构名称'}"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <!-- <ta-input placeholder="请输入福利机构名称" :disabled="true" /> -->
          <ta-select :placeholder="disabled?'':'请选择福利机构名称'"
                     :disabled="disabled"
                     @change="mechanismchange">
            <ta-select-option :value="item.id"
                              v-for="(item,index) in mechanismList"
                              :key="index">{{item.orgName}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="tel"
                      :fieldDecoratorOptions="rules.tel"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-input :placeholder="''"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="经办人姓名"
                      fieldDecoratorId="handlerName"
                      :fieldDecoratorOptions="rules.handlerName"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-input :placeholder="basedisabled?'':'请输入经办人姓名'"
                    :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="经办人性别"
                      fieldDecoratorId="handlerSex"
                      :fieldDecoratorOptions="rules.handlerSex"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-select :placeholder="basedisabled?'':'请选择经办人性别'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="与被收养人关系"
                      fieldDecoratorId="relationship"
                      :require="{message:'请选择与被收养人关系'}"
                      initValue='1'
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-select :placeholder="''"
                     :disabled="true">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in relationsadopteesList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item label="法定代表人姓名"
                      fieldDecoratorId="legalRepresentative"
                      :fieldDecoratorOptions="rules.legalRepresentative"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-input :placeholder="''"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="单位地址"
                      fieldDecoratorId="welfareInstitutionAddress"
                      :fieldDecoratorOptions="rules.welfareInstitutionAddress"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-input :placeholder="''"
                    :disabled="true" />
        </ta-form-item>

        <ta-form-item label="经办人身份证号"
                      fieldDecoratorId="handlerId"
                      :fieldDecoratorOptions="rules.handlerId"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-input :placeholder="basedisabled?'':'请输入经办人身份证号'"
                    :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="经办人职务"
                      fieldDecoratorId="handlerPosition"
                      :fieldDecoratorOptions="rules.handlerPosition"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 17 }">
          <ta-input :placeholder="basedisabled?'':'请输入经办人职务'"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="送养机构意见"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="opinion"
                      :fieldDecoratorOptions="rules.opinion">
          <ta-textarea :placeholder="basedisabled?'':'请输入送养机构意见'"
                       :rows="4"
                       :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
export default {
  name: 'applicant',
  props: {
    sexList: {
      type: Array,
      required: true
    },
    mechanismList: {
      type: Array,
      required: true
    },
    relationsadopteesList: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      rules: {
        handlerName: this.verificationRules('经办人姓名', 72),
        handlerSex: this.verificationRules('性别'),
        handlerPosition: this.verificationRules('经办人职务', 50),
        opinion: this.verificationRules('送养机构意见', 200, true),
        // tel: this.verificationRules('联系电话', {type: 'phone'}),
        legalRepresentative: this.verificationRules('法定代表人姓名', 72),
        handlerId: this.verificationRules('经办人身份证号', { type: 'idCard' })
      },
      isDisabled: false
    }
  },
  methods: {
    mechanismchange (val) {
      this.$emit('mechanismchange', val)
    }
  }
}
</script>
<style scoped lang="less">
</style>
