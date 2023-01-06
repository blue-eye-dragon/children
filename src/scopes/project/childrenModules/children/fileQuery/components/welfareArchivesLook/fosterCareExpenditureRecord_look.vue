<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-row>
        <ta-col :span="8">
          <ta-form-item label="年度"
                        fieldDecoratorId="year">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="发放季度"
                        fieldDecoratorId="sentoutDateStyle">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="劳务补贴（元）"
                        fieldDecoratorId="labourServicesAllowance">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="总计（元）"
                        fieldDecoratorId="totalOutlay">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="登记日期"
                        fieldDecoratorId="registerDate">
            <ta-input :disabled="idedit" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="发放周期"
                        fieldDecoratorId="sentoutCycle">
            <ta-select placeholder="请选择发放周期"
                       :disabled="idedit">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in issuingcycleList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="养育费用补贴（元）"
                        fieldDecoratorId="upbringingCostsAllowance">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="寄养工作经费（元）"
                        fieldDecoratorId="fosterWorkOutlay">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="登记人"
                        fieldDecoratorId="registerMenber">
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
      idedit: true,
      issuingcycleList: [] // 发放周期的字典数据
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getissuingcycle()
  },
  methods: {
    // 初始化数据
    initDatas () {
      let obj = JSON.parse(this.$route.query.obj)
      this.form.setFieldsValue(obj)
    },
    // 发放周期
    async getissuingcycle () {
      let data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingcycleList = data
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
