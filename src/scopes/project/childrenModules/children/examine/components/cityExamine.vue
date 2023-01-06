
<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-form-item
        label="审核类型"
        fieldDecoratorId="aa"
        :labelCol="{ span: 3 }"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <p>{{msg}}</p>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item
        label="审核意见"
        fieldDecoratorId="aa"
        :labelCol="{ span: 3 }"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <ta-textarea placeholder="请输入审核意见" :rows="4" />
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped lang="less">
</style>
