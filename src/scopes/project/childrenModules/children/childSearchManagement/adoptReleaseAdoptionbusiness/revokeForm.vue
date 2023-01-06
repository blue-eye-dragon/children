<template>
  <ta-row>

    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="撤销原因"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="revokeReason"
                      :require="{message:'请选择撤销原因'}"
                      :initValue="this.Enum.REVOKEREASON.BSY">
          <ta-select :placeholder="disabled?'':'请选择撤销原因'"
                     :disabled="disabled"
                     @change="selectChange">
            <ta-select-option v-for="item in revokeReasonList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label
                      fieldDecoratorId="otherReason"
                      v-if="this.selectValue == this.Enum.REVOKEREASON.QT"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="verificationRules('其他原因',60)">
          <ta-input :disabled='disabled'
                    :placeholder="disabled?'':'请输入其他原因'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="错误信息描述"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    class="alonerow"
                    v-if="this.selectValue==this.Enum.REVOKEREASON.XXCW"
                    fieldDecoratorId="errorInfo"
                    :fieldDecoratorOptions="verificationRules('错误信息描述',200,true)">
        <ta-textarea :placeholder="disabled?'':'请输入错误信息描述'"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="死亡日期"
                      fieldDecoratorId="deathDate"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if="this.selectValue==this.Enum.REVOKEREASON.ETSW"
                      :require="{message:'请选择死亡日期'}">
          <ta-date-picker style="width: 100%;"
                          :disabled='disabled'
                          :placeholder="disabled?'':'请选择死亡日期'" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="死亡原因"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if="this.selectValue==this.Enum.REVOKEREASON.ETSW"
                      :require="{message:'请选择死亡原因'}"
                      fieldDecoratorId="deathReason">
          <ta-select :disabled="disabled">
            <ta-select-option v-for="(item,index) in deathReasonList"
                              :value="item.value"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="收养登记日期"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if="this.selectValue==this.Enum.REVOKEREASON.BSY"
                      :require="{message:'请选择收养登记日期'}"
                      fieldDecoratorId="adopetDate">
          <ta-date-picker style="width:100%;"
                          :placeholder="disabled?'':'请选择收养登记日期'"
                          :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="收养登记证号"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if="this.selectValue==this.Enum.REVOKEREASON.BSY"
                      fieldDecoratorId="adopetNo"
                      :fieldDecoratorOptions="verificationRules('收养登记证号',20)">
          <ta-input :disabled='disabled'
                    :placeholder="disabled?'':'请输入收养登记证号'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="备注"
                    class="alonerow"
                    fieldDecoratorId="mark"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('备注',60,true)">
        <ta-textarea :placeholder="disabled?'':'请输入备注'"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="撤销日期"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if="disabled"
                      fieldDecoratorId="revokeDate">
          <ta-date-picker style="width:100%;"
                          :placeholder="''"
                          :disabled="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="撤销人"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      v-if="disabled"
                      fieldDecoratorId="revokePerson">
          <ta-input :disabled='true'
                    :placeholder="''" />
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['disabled'],
  data () {
    return {
      selectValue: this.Enum.REVOKEREASON.BSY, // 撤销原因选择的数据
      revokeReasonList: [], // 撤销原因字典数据
      deathReasonList: [] // 死亡原因字典数据
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.3%', '91.7%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.selectValue = this.Enum.REVOKEREASON.BSY
  },
  mounted () {
    this.getMenuDatas() // 获取字典数据
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.revokeReasonList = await this.getDictionaries('REVOKEREASON') // 获取撤销原因字典数据
      this.deathReasonList = await this.getDictionaries('DEATHREASON') // 获取死亡原因字典数据
    },
    // 撤销原因change事件
    selectChange (e) {
      this.selectValue = e
    }
  }

}
</script>
<style scoped>
</style>
