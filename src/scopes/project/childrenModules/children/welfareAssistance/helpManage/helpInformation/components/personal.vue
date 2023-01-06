<template>
  <div>
    <div class="mars">
      <al-title :title="'个人基本信息'" :show.sync="applSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(appFormData)=>{this.appFormData = appFormData}"
        >
          <personalInformation></personalInformation>
        </ta-form>
      </div>
    </div>
    <div class="mars">
      <al-title :title="'家庭成员'" :show.sync="situSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(sitFormData)=>{this.sitFormData = sitFormData}"
        >
          <familyNumber></familyNumber>
        </ta-form>
      </div>
    </div>
    <div class="mars">
      <al-title :title="'申请信息'" :show.sync="situSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(applicationFormData)=>{this.applicationFormData = applicationFormData}"
        >
          <applicationInformation></applicationInformation>
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
export default {
  name: 'personal',
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
    applicationInformation
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
