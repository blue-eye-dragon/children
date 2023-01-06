<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-row>
        <ta-col :span="24">
          <ta-form-item label="生活状况"
                        fieldDecoratorId="liveCondition"
                        :labelCol="{span:2}"
                        :wrapperCol="{span:14}">
            <ta-textarea :disabled="idedit"
                         :autosize="{ minRows: 2, maxRows: 6 }" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="成长状况"
                        fieldDecoratorId="growUpCondition"
                        :labelCol="{span:2}"
                        :wrapperCol="{span:14}">
            <ta-textarea :disabled="idedit"
                         :autosize="{ minRows: 2, maxRows: 6 }" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="健康状况"
                        fieldDecoratorId="healthCondition"
                        :labelCol="{span:2}"
                        :wrapperCol="{span:14}">
            <ta-textarea :disabled="idedit"
                         :autosize="{ minRows: 2, maxRows: 6 }" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="8">
            <ta-form-item label="回访人员"
                          fieldDecoratorId="returnPerson">
              <ta-input :disabled="idedit" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="回访日期"
                          fieldDecoratorId="returnTime">
              <ta-input :disabled="idedit" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="回访小结"
                        fieldDecoratorId="returnSummary"
                        :labelCol="{span:2}"
                        :wrapperCol="{span:14}">
            <ta-textarea :disabled="idedit"
                         :autosize="{ minRows: 2, maxRows: 6 }" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>
    <div class="btnclass">
      <ta-button @click="returns"
                 style="left: 20px; top: 7px;">返回</ta-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      idedit: true
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
  },
  methods: {
    // 初始化数据
    initDatas () {
      let obj = JSON.parse(this.$route.query.obj)
      this.form.setFieldsValue(obj)
    },
    returns () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.btnclass {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: 74%;
  height: 45px;
}
</style>
