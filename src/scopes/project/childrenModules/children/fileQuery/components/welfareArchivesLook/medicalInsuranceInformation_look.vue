<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-row>
        <ta-col :span="8">
          <ta-form-item label="缴费日期"
                        fieldDecoratorId="payTime">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="周期"
                        fieldDecoratorId="medicalInsuranceCycle">
            <ta-input :disabled="idedit" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="类型"
                        fieldDecoratorId="medicalInsuranceType">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="金额"
                        fieldDecoratorId="money">
            <ta-input :disabled="idedit" />
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
