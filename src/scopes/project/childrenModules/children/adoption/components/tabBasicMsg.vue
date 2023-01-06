<template>
  <div>
    <div class="mars">
      <al-title :title="'申请人信息'" :show.sync="applSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(appFormData)=>{this.appFormData = appFormData}"
        >
          <applicant></applicant>
        </ta-form>
      </div>
    </div>
    <div class="mars">
      <al-title :title="'情况说明'" :show.sync="situSwitchBtn"></al-title>
      <div class="hei">
        <ta-form
          layout="horizontal"
          :autoFormCreate="(sitFormData)=>{this.sitFormData = sitFormData}"
        >
          <situation></situation>
        </ta-form>
      </div>
    </div>

  </div>
</template>

<script>
import alTitle from '@component/common/components/Title'
import applicant from './applicant.vue'
import situation from './situation.vue'

export default {
  name: 'tabBasicMsg',
  data () {
    return {
      applSwitchBtn: false,
      situSwitchBtn: false
    }
  },
  components: {
    alTitle,
    applicant,
    situation
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
