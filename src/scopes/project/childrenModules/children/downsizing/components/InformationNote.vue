<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-form-item
        label="撤销收养登记原因"
        fieldDecoratorId="radioRevokeReason"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :require="{message:'请选择撤销收养登记原因!'}"
      >
        <ta-radio-group @change="onChange">
          <div>
            <ta-radio :value="1">送养人提供送养人虚假证明骗取登记</ta-radio>
            <ta-radio style="margin-left:120px;" :value="2">送养人提供被收养人虚假证明骗取登记</ta-radio>
          </div>
          <div>
            <ta-radio :value="3">收养人提供收养人虚假证明骗取登记</ta-radio>
            <ta-radio style="margin-left:120px;" :value="4">其他</ta-radio>
          </div>
        </ta-radio-group>
      </ta-form-item>
      <ta-form-item
        label="解除收养事由"
        
        fieldDecoratorId="name"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :require="{message:'请输入解除收养事由!'}"
      >
        <ta-textarea placeholder="请输入解除收养事由" :rows="4" />
      </ta-form-item>
      <ta-form-item
        label="协议事项"
        
        fieldDecoratorId="name"
         :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :require="{message:'请输入协议事项!'}"
      >
        <ta-textarea placeholder="请输入协议事项" :rows="4" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item
        label="办理收养登记日期"
        
        fieldDecoratorId="name"
        :require="{message:'请选择办理收养登记日期!'}"
      >
       <ta-date-picker style="width: 100%;" placeholder="请选择办理收养登记日期" />
      </ta-form-item>
      <ta-form-item
        label="原收养登记证号"
        
        fieldDecoratorId="name"
        :require="{message:'请输入原收养登记证号!'}"
      >
        <ta-input placeholder="请输入原收养登记证号" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="原登记机关" fieldDecoratorId="identityType" :require="{message:'请输入原登记机关!'}">
        <ta-input placeholder="请输入原登记机关" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item
        label="送养人提供的证件情况"
        
         :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="dddddd"
        :require="{message:'请输入送养人提供的证件情况!'}"
      >
        <ta-textarea placeholder="请输入送养人提供的证件情况" :rows="4" />
      </ta-form-item>
      <ta-form-item
        label="收养人提供的证件情况"
        
         :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="name"
        :require="{message:'请输入收养人提供的证件情况!'}"
      >
        <ta-textarea placeholder="请输入收养人提供的证件情况" :rows="4" />
      </ta-form-item>
      <ta-form-item
        label="审核意见"
         :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="remark"
        :require="{message:'请选择审核意见!'}"
      >
       <ta-select placeholder="请选择性别">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
      </ta-form-item>
       <ta-form-item
        label="备注"
         :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="name"
        :require="{message:'请输入备注!'}"
      >
        <ta-textarea placeholder="请输入备注" :rows="1" />
      </ta-form-item>
    </ta-col>
     <ta-col :span="12">
         <ta-form-item label="印制号" fieldDecoratorId="0"  :require="{message:'请输入印制号!'}">
           <ta-input placeholder="系统自动生成" />
        </ta-form-item>
          <ta-form-item
            label="登记日期"
            fieldDecoratorId="name"
            :require="{message:'请选择登记日期!'}"
          >
            <ta-date-picker style="width: 100%;" placeholder="请选择登记日期" />
          </ta-form-item>
        </ta-col>
      <ta-col :span="12">
        <ta-form-item label="档案页数" fieldDecoratorId="0" :require="{message:'请输入档案页数!'}">
          <ta-input placeholder="请输入档案页数" />
        </ta-form-item>
        <ta-form-item label="解除收养关系证明字号"   fieldDecoratorId="0" :require="{message:'请输入解除收养关系证明字号!'}">
          <ta-input placeholder="系统自动生成" />
        </ta-form-item>
      </ta-col>
  </ta-row>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    onChange (e) {
      console.log('radio checked', e.target.value)
    }
  }
}
</script>
