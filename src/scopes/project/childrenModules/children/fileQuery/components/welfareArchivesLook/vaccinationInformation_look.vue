<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-row>
        <ta-col :span="8">
          <ta-form-item label="疫苗名称"
                        fieldDecoratorId="vaccineName">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="接种部位"
                        fieldDecoratorId="inoculationPosition">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="接种人"
                        fieldDecoratorId="vaccinator">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="接种日期"
                        fieldDecoratorId="inoculateTime">
            <ta-input :disabled="idedit" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="疫苗批号"
                        fieldDecoratorId="vaccineBatchNumber">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="疫苗生产企业"
                        fieldDecoratorId="vaccineProductionEnterprise">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="接种单位"
                        fieldDecoratorId="inoculateUnit">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="是否已接种"
                        fieldDecoratorId="isInoculated">
            <ta-select :disabled="idedit">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in isInoculatedList"
                                :key="index">{{item.label}}</ta-select-option>>
            </ta-select>
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
      isInoculatedList: [] // 是否已接种
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getYESNO()
  },
  methods: {
    // 初始化数据
    initDatas () {
      let obj = JSON.parse(this.$route.query.obj)
      this.form.setFieldsValue(obj)
    },
    // 获取是否已接种
    async getYESNO () {
      let data = await this.getDictionaries('YESNO')
      this.isInoculatedList = data
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
