<template>
 <div class="conts">
    <div class="contin">
       <div ref="oneout" class="mars">
        <Title id="anchorpoint_a" title="增员申请信息" :ishide='false'></Title>
        <ta-form
          layout="horizontal"
          ref="one"
          :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
        >
          <ta-row class="fromcom">
            <ta-col :span="24">
               <ta-form-item
                label="已选择儿童"
                fieldDecoratorId="aa"
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 21 }"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
              >
               <ta-select mode="multiple">
                <ta-select-option value="jack">Jack</ta-select-option>
                <ta-select-option value="lucy">Lucy</ta-select-option>
                <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
        <div  class="mars">
        <Title id="anchorpoint_a" title="批量审核" :ishide='false'></Title>
        <ta-form
          layout="horizontal"
          :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
        >
          <ta-row class="fromcom">
            <ta-col :span="24">
               <ta-form-item
                label="已选择儿童"
                fieldDecoratorId="aa"
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 21 }"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'}]}"
              >
               <ta-textarea placeholder="请输入审核意见" :rows="4" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
     <div class="bom">
      <ta-button type="primary" class="preservation" >通过</ta-button>
      <ta-button type="danger" class="preservation" >驳回</ta-button>
      <ta-button  class="preservation" @click="backs">返回</ta-button>
    </div>
</div>
</template>
<script>
import Title from '@component/common/components/Title'
export default {
  components: {
    Title
  },
  data () {
    return {

    }
  },
  mounted () {
    console.log('datas')
    console.log(this.$route.params.data)
  },
  methods: {
    backs () {
      console.log(111)
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  width: 83%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  min-height:135px;
}
.bom {
  width: calc(100% - 28px);
  height: 80px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 14px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-left: 32px;
}
</style>
