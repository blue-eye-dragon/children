<template>
  <div>
    <ta-row>
      <ta-col :span="24">
        <ta-col :span="6">
          <AddressComponent msg="业务办理区域"
                            class="area"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"
                            :disabled="basedisabled"></AddressComponent>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="6">
          <ta-form-item label="收养登记机构"
                        fieldDecoratorId="adoptionRegisterOrgName">
            <ta-input :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="预约人姓名"
                        fieldDecoratorId="name">
            <ta-input :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="预约人联系电话"
                        fieldDecoratorId="contactNumber">
            <ta-input :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="预约人身份证号"
                        fieldDecoratorId="idCard">
            <ta-input :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  name: 'applicant',
  components: {
    AddressComponent
  },
  props: [
    'addressmodel',
    'basedisabled'
  ],
  data () {
    return {
    }
  },
  methods: {
    // 地址处理
    setaddress () {
      this.$emit('setaddress')
    }
  }
}
</script>
<style scoped lang="less">
</style>
