<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="起领年月"
                      :labelCol="{ span: 7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="startTime">
          <!-- :fieldDecoratorOptions="adopt?verificationRulesNotMustFill('起领年月'):verificationRules('起领年月')" -->
          <ta-month-picker style="width: 100%;"
                           :placeholder="!changedisabled?'请选择起领年月':''"
                           :disabled="changedisabled||isOther" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="末领年月"
                      :labelCol="{ span: 7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="endTime"
                      :fieldDecoratorOptions="isNotRequiredEndTime ?  undefined: verificationRules('末领年月')">
          <ta-month-picker style="width: 100%;"
                           :allowClear="false"
                           :disabledDate="disabledEndDate"
                           :placeholder="'请选择末领年月'"
                           :disabled="changedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="领取人"
                      :labelCol="{ span: 7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="receiver"
                      :fieldDecoratorOptions="adopt?verificationRulesNotMustFill('领取人', 72):verificationRules('领取人', 72)">
          <ta-input :placeholder="!changedisabled?'请输入领取人':''"
                    :disabled="changedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="领取方式"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="payment"
                      :initValue="Enum.PAYMENT.YHZZ"
                      :fieldDecoratorOptions="{validateTrigger: ['blur','change'],rules: [{ required: !adopt, message: '请选择领取方式'}]}">
          <ta-select allowClear
                     :placeholder="!changedisabled?'请选择领取方式':''"
                     :disabled="changedisabled"
                     @change="getPayment">
            <ta-select-option v-for="item in paymentList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="领取人与儿童关系"
                      :labelCol="{ span: 12}"
                      :wrapperCol="{span:12}"
                      fieldDecoratorId="receiverRelation"
                      :require="{enable:!adopt,message:'请选择领取人与儿童关系'}">
          <ta-input-group compact>
            <ta-select allowClear
                       :placeholder="!changedisabled?'请选择领取人与儿童关系':''"
                       @change="getRelation"
                       :disabled="changedisabled"
                       v-model="valueSelect"
                       :style="{width: valueSelect!=Enum.RECEIVERRELATION.QT? '100%':'45%'}">
              <ta-select-option v-for="item in receiverRelationList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
            <ta-input v-if="valueSelect==Enum.RECEIVERRELATION.QT"
                      :disabled="changedisabled"
                      v-model="valueInput"
                      style="width: 55%;"
                      placeholder="请输入其他关系" />
          </ta-input-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="开户行"
                      :labelCol="{ span: 7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="openBank"
                      :fieldDecoratorOptions="!adopt&&bankRequire&&!iswelfare?verificationRules('开户行', 20):verificationRulesNotMustFill('儿童本人开户行', 20)">
          <ta-input :placeholder="!changedisabled?'请输入开户行':''"
                    :disabled="changedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="银行账号"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="bankNumber"
                      :fieldDecoratorOptions="!adopt&&bankRequire&&!iswelfare?verificationRules('银行账号', 30):verificationRulesNotMustFill('儿童本人银行账号', 30)">
          <ta-input :placeholder="!changedisabled?'请输入银行账号':''"
                    :disabled="changedisabled" />
        </ta-form-item>

      </ta-col>

    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
export default {
  props: ['changedisabled', 'childtype', 'adopt', 'iswelfare', 'birthDate', 'isOther'],
  data () {
    return {
      paymentList: [], // 领取方式字典数据
      receiverRelationList: [], // 领取人与儿童关系字典数据
      bankRequire: true, // 儿童本人开户行、儿童本人银行账号必填控制

      dataSource: [],
      valueSelect: null, // 与儿童关系下拉框数据
      valueInput: '', // 与儿童关系其他输入框数据
      isNotRequiredEndTime: false // 末领年月不必填标志
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
    disabledEndDate (current) {
      if (this.birthDate) {
        return current > moment(this.birthDate, 'YYYY-MM').add({ years: 18 })
      }
    },
    // 字典数据获取
    async getMenuDatas () {
      this.paymentList = await this.getDictionaries('PAYMENT') // 获取领取方式字典数据
      this.receiverRelationList = await this.getDictionaries('RECEIVERRELATION') // 获取领取人与儿童关系字典数据
    },
    // 选择与儿童关系
    getRelation (e) {
      this.valueSelect = e
    },
    // 领取方式change事件
    getPayment (e) {
      const _self = this
      if (e == _self.Enum.PAYMENT.YHZZ) { // 银行转账
        _self.bankRequire = true
      } else {
        _self.bankRequire = false
      }
      _self.$emit('clearDataAndErroInfo', 'cptAdoptorFrom', ['openBank', 'bankNumber'])
    }
  },
  watch: {
    valueInput: function (newval, oldval) {
      this.$emit('setErrorMessage', newval)
    },
    valueSelect: function (newval, oldval) {
      if (newval != this.Enum.RECEIVERRELATION.QT) {
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
