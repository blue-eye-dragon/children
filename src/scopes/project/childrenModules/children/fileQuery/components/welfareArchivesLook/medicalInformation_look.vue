<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-row>
        <ta-col :span="8">
          <ta-form-item label="患病名称"
                        fieldDecoratorId="patientName">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="治疗医院"
                        fieldDecoratorId="treatmentHospital">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="治疗结果"
                        fieldDecoratorId="treatmentResult">
            <ta-input :disabled="idedit" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="治疗日期"
                        fieldDecoratorId="treatmentDate">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="陪同人员"
                        fieldDecoratorId="accompanyMen">
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
