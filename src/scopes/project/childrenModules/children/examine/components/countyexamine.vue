
<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item
        label="审核类型"
        fieldDecoratorId="aa"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <p>{{msg}}</p>
      </ta-form-item>
      <ta-form-item
        label="审核单位"
        fieldDecoratorId="aa"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <ta-input placeholder="请输入审核单位" />
      </ta-form-item>
      <ta-form-item
        label="审核状态"
        fieldDecoratorId="aa"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <ta-select placeholder="请选择审核状态">
          <ta-select-option value="jack">Jack</ta-select-option>
          <ta-select-option value="lucy">Lucy</ta-select-option>
          <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
          <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item
        label="审核日期"
        fieldDecoratorId="aa"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <ta-date-picker style="width: 100%;" placeholder="请选择审核日期" />
      </ta-form-item>
      <ta-form-item
        label="审核人"
        fieldDecoratorId="aa"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
      >
        <ta-input placeholder="请输审核人" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item
        label="审核意见"
        fieldDecoratorId="aa"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
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
    types: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  },
  mounted () {
    switch (this.types) {
      case '1':
        console.log(111)
        break
      case '2':
        console.log(222)
        break
      case '3':
        console.log(333)
        break
    }
  }
}
</script>
<style scoped lang="less">
</style>
