<template>
  <div>
    <div class="mars">
      <al-title :title="'组织基本信息'" :show.sync="applSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(orgFormData)=>{this.orgFormData = orgFormData}"
        >
          <organizationInformation></organizationInformation>
        </ta-form>
      </div>
    </div>
    <div class="mars">
      <al-title :title="'申请信息'" :show.sync="situSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(appFormData)=>{this.appFormData = appFormData}"
        >
          <orgApplicationInformation></orgApplicationInformation>
        </ta-form>
      </div>
    </div>

  </div>
</template>
<script>
import alTitle from '@component/common/components/Title'
import personalInformation from './personalInformation.vue'
import familyNumber from './familyNumber.vue'
import applicationInformation from './applicationInformation.vue'
import organizationInformation from './organizationInformation.vue'
import orgApplicationInformation from './orgApplicationInformation.vue'
export default {
  name: 'organization',
  data () {
    return {
      applSwitchBtn: false,
      situSwitchBtn: false
    }
  },
  components: {
    alTitle,
    personalInformation,
    familyNumber,
    applicationInformation,
    organizationInformation,
    orgApplicationInformation
  }
}
</script>
<style scoped lang="less">
  .mars {
    width: 83%;
    margin-bottom: 30px;
    border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
    padding-left: 38px;
    box-sizing: border-box;
    overflow: hidden;
  }

</style>
