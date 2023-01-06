<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="家庭收入（元/月）"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="familyIncome">
          <ta-input-number :min="0"
                           :max="9999999999"
                           :precision="2"
                           style="width:100%"
                           :placeholder="!disabled?'请输入家庭收入':''"
                           :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="人均居住面积（m²）"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="livingSpace"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('人均居住面积',20)">
          <ta-input :placeholder="!disabled?'请输入人均居住面积':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="备注"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }"
                    fieldDecoratorId="remark"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
        <ta-textarea :placeholder="!disabled?'请输入备注':''"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['disabled']
}
</script>
<style scoped lang="less">
</style>
