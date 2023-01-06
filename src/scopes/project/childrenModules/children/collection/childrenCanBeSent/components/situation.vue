<template>
  <ta-row class="fromcom">
    <ta-col :span="20">
      <ta-form-item label="撤销原因"
                    :labelCol="{span:5}"
                    :wrapperCol="{span:19}"
                    fieldDecoratorId="revokeReason"
                    class="alonerow revokwidth"
                    :require="{message:'请选择撤销原因'}">
        <ta-radio-group @change="onChange"
                        :disabled="disabled">
          <ta-radio :value="item.value"
                    v-for="(item,index) in causesrvocationList"
                    :key="index">{{item.label}}</ta-radio>
          <!-- <ta-input @change='textchange'
                    :disabled="disabled"
                    v-model='revokeOtherReasontext'
                    v-if="revokeOtherReasonshow"
                    type="text"
                    style='width:200px' /> -->
        </ta-radio-group>
      </ta-form-item>

    </ta-col>
    <ta-col :span="3">
      <ta-form-item :labelCol="{span:0}"
                    :wrapperCol="{span:24}"
                    fieldDecoratorId="revokeOtherReason"
                    :fieldDecoratorOptions="{ rules: [{ required: true, message: '请输入其他撤销原因' },{ max: 40, message: '最大输入40个字符' }]}"
                    class="alonerow">
        <ta-input @change='textchange'
                  :disabled="disabled"
                  v-model='revokeOtherReasontext'
                  v-if="revokeOtherReasonshow"
                  type="text"
                  style='width:200px' />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="收养人姓名"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="adoptor"
                      :fieldDecoratorOptions="rules.adoptor">
          <ta-input placeholder="请输入收养人姓名"
                    :disabled="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="送养人姓名"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="placingOutPerson"
                      v-if="placingOutPerson!=''"
                      :fieldDecoratorOptions="rules.placingoutPerson">
          <ta-input placeholder="请输入送养人姓名"
                    :disabled="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="被收养人姓名"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="adoptee"
                      :fieldDecoratorOptions="rules.adoptee">
          <ta-input placeholder="请输入被收养人姓名"
                    :disabled="true" />
        </ta-form-item>
      </ta-col>

    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="收养登记时间"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="registerDate"
                      :require="{message:'请选择收养登记时间'}">
          <ta-date-picker style="width: 100%;"
                          :disabled="true"
                          placeholder="请选择收养登记时间" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="收养登记证号"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="rules.adoptionRegistionCertificateNumber"
                      fieldDecoratorId="adoptionRegistionCertificateNumber">
          <ta-input placeholder="请输入收养登记证号"
                    :disabled="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="档案页数"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="archivesCount"
                      :require="{message:'请输入档案页数'}">
          <ta-input-number placeholder="请输入档案页数"
                           :min="1"
                           :precision=0
                           :max="999999"
                           style="width:100%"
                           :disabled="disabled" />
        </ta-form-item>
      </ta-col>

    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="件数"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="fileCount"
                      :require="{message:'请输入件数'}">
          <ta-input-number placeholder="请输入件数"
                           style="width:100%"
                           :min="1"
                           :precision=0
                           :max="9999"
                           :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="登记日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="revokeDate"
                      :require="{message:'请选择登记日期'}">
          <ta-date-picker style="width: 100%;"
                          :disabled="disabled"
                          placeholder="请选择登记日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <!-- <ta-form-item
        label="撤销字号"
        fieldDecoratorId="revokeCertificateNumber"
        :labelCol="{ span: 6 }"
        :require="{message:'请输入撤销字号'}"
      >
        <ta-input placeholder="请输入撤销字号" :disabled="disabled"/>
      </ta-form-item> -->
    <ta-col :span="24">
      <ta-form-item label="提供证件材料"
                    class="alonerow"
                    fieldDecoratorId="evidenceMaterial"
                    :fieldDecoratorOptions="rules.evidenceMaterial">
        <ta-textarea placeholder="请输入提供证件材料"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="审核意见"
                    class="alonerow"
                    fieldDecoratorId="opinion"
                    :fieldDecoratorOptions="rules.opinion">
        <ta-textarea placeholder="请输入审核意见"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="备注"
                    class="alonerow"
                    fieldDecoratorId="remarks"
                    :fieldDecoratorOptions="rules.remarks">
        <ta-textarea :placeholder="disabled?'':'请输入备注'"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    causesrvocationList: {
      type: Array,
      required: true
    },
    placingOutPerson: {
      type: String,
      required: true
    },
    revokeOtherReason: {
      type: String,
      required: true
    },
    revokeOtherReasonshow: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isDisabled: false,
      revokeOtherReasontext: '',
      rules: {
        idCard: this.verificationRules('手机号', { type: 'idCard' }),
        phoneNumber: this.verificationRules('手机号', { type: 'phone' }),
        adoptor: this.verificationRules('收养人姓名', 72),
        adoptee: this.verificationRules('被收养人姓名', 72),
        adoptionRegistionCertificateNumber: this.verificationRules('收养登记证号', 72),
        placingoutPerson: this.verificationRules('送养人姓名', 72),
        evidenceMaterial: this.verificationRules('提供证件材料', 200, true),
        opinion: this.verificationRules('审核意见', 200, true),
        remarks: this.verificationRulesNotMustFill('备注', 200, true)
      }
    }
  },
  activated () {

  },
  updated () {
    this.setLabelAndWrapperWidth('12.3%', '87.7%', 'alonerow') // 单独一行字段宽度控制
  },
  watch: {
    revokeOtherReason () {
      this.revokeOtherReasontext = this.revokeOtherReason
    }
  },
  methods: {
    onChange (e) {
      let statue = null
      e.target.value == 4 ? statue = true : statue = false
      this.$emit('update:revokeOtherReasonshow', statue)
      this.$emit('update:revokeOtherReason', '')
    },
    // 登记日期（登记日期）不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    textchange (val) {
      this.$emit('update:revokeOtherReason', val.target.value)
    }
  }
}
</script>
<style scoped type="text/less">
/deep/.revokwidth .ant-col-5 {
  width: 200px !important;
}
/deep/.revokwidth .ant-col-19 {
  width: 81.7% !important;
}
</style>