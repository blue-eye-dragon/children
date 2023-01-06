<template>
  <div>
    <ta-col :span="8">
      <ta-form-item label="办理人员"
                    fieldDecoratorId="handlePersonName"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}">
        <ta-input :placeholder="'请输入办理人员'"
                  :disabled="true" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="办理机构"
                    fieldDecoratorId="handleOrgName"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}">
        <ta-input :placeholder="'请输入办理机构'"
                  :disabled="true" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="办理时间"
                    fieldDecoratorId="handleTime"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}">
        <ta-date-picker style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="true"
                        :placeholder="'请选择办理时间'" />
      </ta-form-item>
    </ta-col>
  </div>
</template>

<script>

export default {
  name: 'processingInformation',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style scoped lang="less">
</style>
