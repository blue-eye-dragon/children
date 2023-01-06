<template>
  <ta-row>
    <ta-col :span="24">
      <ta-form-item label="解除原因"
                    fieldDecoratorId="relieveReason"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    :require="{message:'请选择解除收养登记原因'}">
        <ta-radio-group @change="onChange"
                        :disabled="basedisabled">
          <!-- <div> -->
          <ta-radio :value="item.value"
                    v-for="(item,index) in causeforreleaseList"
                    :key="index">{{item.label}}</ta-radio>
          <ta-input @change='textchange'
                    :disabled="basedisabled"
                    v-model='revokeOtherReasontext'
                    v-if="relieveOtherReasonshow"
                    type="text"
                    maxlength="40"
                    style='width:200px' />
        </ta-radio-group>
      </ta-form-item>
      <ta-form-item label="解除收养事由"
                    fieldDecoratorId="relieveCasue"
                    :fieldDecoratorOptions="rules.relieveCasue"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }">
        <ta-textarea :placeholder="basedisabled?'':'请输入解除收养事由'"
                     :rows="4"
                     maxlength="201"
                     :disabled="basedisabled" />
      </ta-form-item>
      <ta-form-item label="协议事项"
                    :fieldDecoratorOptions="rules.agreements"
                    fieldDecoratorId="agreements"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }">
        <ta-textarea :placeholder="basedisabled?'':'请输入协议事项'"
                     :rows="4"
                     maxlength="201"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="收养登记日期"
                    fieldDecoratorId="registerDate"
                    :require="{message:'请选择收养登记日期'}">
        <ta-date-picker style="width: 100%;"
                        :disabled="true"
                        placeholder="请选择收养登记日期"
                        :disabledDate="disabledDate" />
      </ta-form-item>
      <ta-form-item label="收养登记证号"
                    fieldDecoratorId="adoptionRegistionCertificateNumber"
                    :fieldDecoratorOptions="rules.adoptionRegistionCertificateNumber">
        <ta-input placeholder="请输入原收养登记证号"
                  maxlength="201"
                  :disabled="true" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="收养登记机关"
                    fieldDecoratorId="registerOrgName"
                    :require="{message:'请输入收养登记机关'}">
        <ta-input placeholder="请输入收养登记机关"
                  :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="送养人提供的证件情况"
                    :fieldDecoratorOptions="this.verificationRules('送养人提供的证件情况', 200,false)"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="placingOutCredentials">
        <ta-textarea placeholder="请输入送养人提供的证件情况"
                     :rows="4"
                     :disabled="basedisabled" />
      </ta-form-item>
      <ta-form-item label="收养人提供的证件情况"
                    :fieldDecoratorOptions="this.verificationRules('收养人提供的证件情况', 200,false)"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="adoptorCredentials">
        <ta-textarea placeholder="请输入收养人提供的证件情况"
                     :rows="4"
                     :disabled="basedisabled" />
      </ta-form-item>
      <ta-form-item label="年满八周岁被收养人对解除收养登记的意见"
                    v-if="isshow"
                    :fieldDecoratorOptions="this.verificationRules('年满八周岁被收养人对解除收养登记的意见', 40,false)"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="adopteeOpinion">
        <ta-textarea placeholder="请输入年满八周岁被收养人对解除收养登记的意见"
                     :rows="4"
                     :disabled="basedisabled" />
      </ta-form-item>
      <ta-form-item label="审核意见"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="opinion"
                    :fieldDecoratorOptions="this.verificationRules('审核意见', 200,false)">
        <ta-textarea placeholder="请输入审核意见"
                     :rows="1"
                     maxlength="201"
                     :disabled="basedisabled" />
      </ta-form-item>
      <ta-form-item label="备注"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="remarks"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('备注', 200,true)">
        <ta-textarea :placeholder="basedisabled?'':'请输入备注'"
                     :rows="1"
                     maxlength="201"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="印制号"
                    fieldDecoratorId="printNumber"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('印制号', 50)">
        <ta-input placeholder="请输入印制号"
                  maxlength="201"
                  :disabled="basedisabled" />
      </ta-form-item>
      <ta-form-item label="登记日期"
                    fieldDecoratorId="relieveDate"
                    :require="{message:'请选择登记日期'}">
        <ta-date-picker style="width: 100%;"
                        placeholder="请选择登记日期"
                        :disabled="basedisabled"
                        :disabledDate="disabledDate" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-col :span="12">
        <ta-form-item label="档案页数"
                      fieldDecoratorId="archivesCount"
                      :require="{message:'请输入档案页数'}">
          <ta-input-number style="width:100%"
                           placeholder="请输入档案页数"
                           :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12"
              :hidden="!isZY?true: additionalYesOrNo =='1'?false:basedisabled?false:true">
        <ta-form-item label="解除收养关系证明字号"
                      fieldDecoratorId="relieveCertificateNumber"
                      :fieldDecoratorOptions="(basedisabled||additionalYesOrNo == 1)?this.verificationRules('解除收养关系证明字号',50): this.verificationRulesNotMustFill('解除收养关系证明字号', 50)">
          <ta-input placeholder="请输入解除收养关系证明字号"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12"
              :hidden="true">
        <ta-form-item label="certificateNumber"
                      fieldDecoratorId="certificateNumber">
          <ta-input placeholder="certificateNumber"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <processingInformation></processingInformation>
    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
import processingInformation from './processingInformation'
export default {
  props: {
    isshow: {
      type: Boolean,
      required: false
    },
    isZY: {
      type: Boolean,
      required: true
    },
    // 是否可编辑
    basedisabled: {
      type: Boolean,
      required: true
    },
    relieveOtherReason: {
      type: String,
      required: true
    },
    relieveOtherReasonshow: {
      type: Boolean,
      required: true
    },
    additionalYesOrNo: {
      type: String,
      required: true
    }
  },
  watch: {
    relieveOtherReason () {
      this.revokeOtherReasontext = this.relieveOtherReason
    }
  },
  components: {
    processingInformation
  },
  data () {
    return {
      causeforreleaseList: [],
      revokeOtherReasontext: '',
      rules: {
        relieveCasue: this.verificationRulesNotMustFill('解除收养事由', 200, true),
        agreements: this.verificationRulesNotMustFill('协议事项', 200, true),
        adoptionRegistionCertificateNumber: this.verificationRulesNotMustFill('收养登记证号', 50)
      }
    }
  },
  mounted () {
    this.getcauseforrelease()
  },
  methods: {
    textchange (val) {
      this.$emit('update:relieveOtherReason', val.target.value)
    },
    onChange (e) {
      let statue = null
      e.target.value == 4 ? statue = true : statue = false
      this.$emit('update:relieveOtherReasonshow', statue)
      this.$emit('update:relieveOtherReason', '')
    },
    // 登记日期（登记日期）不能大于当前日期
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      const year = moment().year()
      if (this.additionalYesOrNo == 0) {
        return current > moment().endOf('day') || current.year() - year < 0
      } else {
        return current > moment().endOf('day')
      }
    },
    // 解除收养原因 CAUSEFORRELEASE
    async getcauseforrelease () {
      const data = await this.getDictionaries('CAUSEFORRELEASE')
      this.causeforreleaseList = data
    }
  }
}
</script>
