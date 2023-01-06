<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-form-item
        label="撤销收养登记原因"
        fieldDecoratorId="radioRevokeReason"
      :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :require="{message:'请输入姓名!'}"
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
    </ta-col>
    <ta-col :span="12">
      <ta-form-item
        label="收养人姓名"
        
        fieldDecoratorId="name"
        :require="{message:'请输入姓名!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="被收养人姓名"
        
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="收养登记证号"
        
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="件数"
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="登记日期"
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="送养人姓名" fieldDecoratorId="identityType" :require="{message:'请选择!'}">
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item label="收养登记时间" fieldDecoratorId="0" :require="{message:'请选择!'}">
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item label="档案页数" fieldDecoratorId="0" :require="{message:'请选择!'}">
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="撤销字号"
        fieldDecoratorId="name"
        :labelCol="{ span: 6 }"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item
        label="提供证件材料"
        
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="dddddd"
        :require="{message:'请填写申请内容!'}"
      >
        <ta-textarea placeholder="Basic usage" :rows="4" />
      </ta-form-item>
      <ta-form-item
        label="审核意见"
        
       :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-textarea placeholder="Basic usage" :rows="4" />
      </ta-form-item>
      <ta-form-item
        label="备注"
        
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="remark"
        :require="{message:'请填写申请内容!'}"
      >
        <ta-textarea placeholder="Basic usage" :rows="4" />
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
