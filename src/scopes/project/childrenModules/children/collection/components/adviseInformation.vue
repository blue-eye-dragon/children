<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-form-item label="帮扶建议"
      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="supportRecommend">
        <ta-textarea :rows="20"
                     :disabled="disabled" />
      </ta-form-item>

    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {

  }
}

</script>
<style scoped lang="less">
</style>
