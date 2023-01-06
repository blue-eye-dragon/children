<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="领取方式"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="receiveType"
                      :require="{message:'请选择领取方式'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择领取方式':''"
                     :disabled="disabled"
                     @change="getPayment">
            <ta-select-option v-for="item in paymentList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="领取人姓名"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="contactPerson"
                      :fieldDecoratorOptions="receiveRequire?verificationRules('领取人姓名', 72):verificationRulesNotMustFill('领取人姓名', 72)">
          <ta-input :placeholder="!disabled?'请输入领取人姓名':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="领取人开户行"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="bank"
                      :fieldDecoratorOptions="bankRequire?verificationRules('领取人开户行', 19):verificationRulesNotMustFill('领取人开户行', 19)">
          <ta-input :placeholder="!disabled?'请输入领取人开户行':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="领取人银行账号"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="bankAccount"
                      :fieldDecoratorOptions="bankRequire?verificationRules('领取人银行账号', 30):verificationRulesNotMustFill('领取人银行账号', 30)">
          <ta-input :placeholder="!disabled?'请输入领取人银行账号':''"
                    :disabled="disabled" />
        </ta-form-item>

      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="领取人联系电话"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="contactNumber"
                      :fieldDecoratorOptions="verificationRules('领取人联系电话', {type: 'phone'})">
          <ta-input placeholder="请输入领取人联系电话"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['disabled', 'changedisabled', 'childtype'],
  data () {
    return {
      paymentList: [], // 领取方式字典数据
      receiverRelationList: [], // 领取人与儿童关系字典数据
      bankRequire: false, // 领取人开户行、领取人银行账号必填控制
      receiveRequire: true, // 领取人、领取人与儿童关系必填控制

      dataSource: [],
      valueSelect: null, // 与儿童关系下拉框数据
      valueInput: '' // 与儿童关系其他输入框数据
    }
  },
  activated () {
    this.valueSelect = null
    this.valueInput = ''
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.paymentList = await this.getDictionaries('PAYMENT') // 获取领取方式字典数据
      this.receiverRelationList = await this.getDictionaries('RELATION') // 获取领取人与儿童关系字典数据
    },
    // 选择与儿童关系
    getRelation (e) {
      this.valueSelect = e
    },
    getPayment (e) {
      const _self = this
      _self.bankRequire = false
      if (e == _self.Enum.PAYMENT.XJLQ) { // 现金领取
        _self.bankRequire = false
      }
      if (e == _self.Enum.PAYMENT.YHZZ) { // 银行转账
        _self.bankRequire = true
      }
      this.$emit('getPayment')
    }
  },
  watch: {
    valueInput: function (newval, oldval) {
      this.$emit('setErrorMessage', newval)
    },
    valueSelect: function (newval, oldval) {
      if (newval != this.Enum.RELATION.QT) {
        this.$emit('setErrorMessage', '1')
      } else {
        this.$emit('setErrorMessage', this.valueInput)
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>
