<template>
  <ta-row class='fromcom'>
    <ta-col :span="12">
      <ta-form-item
        label="姓名"
        fieldDecoratorId="name"
        :require="{message:'请输入姓名!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="性别"
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="民族"
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="证件类别"
        fieldDecoratorId="name"
        :require="{message:'请选择性别!'}"
      >
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="联系电话"
        fieldDecoratorId="phone"
        :require="{message:'请输入电话号码!'}"
        :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的手机号码不合法'}]}"
      >
        <ta-input placeholder="input placeholder" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="身份类别" fieldDecoratorId="identityType" :require="{message:'请选择!'}">
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item label="国籍" fieldDecoratorId="0">
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item label="出生日期" fieldDecoratorId="0" :require="{message:'请选择国籍!'}">
        <ta-input placeholder="表单horizontal布局" />
      </ta-form-item>
      <ta-form-item
        label="身份证号"
        fieldDecoratorId="idcard"
        :require="{message:'请输入身份证号码!'}"
        :fieldDecoratorOptions="{rules: [{ idCard: '2', message: '输入的身份证号码不合法'}]}"
      >
        <ta-input placeholder="input placeholder" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item
        label="住址"

        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="cascader"
      >
        <ta-input-group compact>
          <ta-cascader style="width:330px" :options="address" placeholder="Please select" />
          <ta-input style="width: calc(100% - 330px)" defaultValue="Xihu District, Hangzhou" />
        </ta-input-group>
      </ta-form-item>
      <ta-form-item
        label="申请内容"

       :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :require="{message:'请填写申请内容!'}"
      >
        <ta-textarea placeholder="Basic usage" :rows="4" />
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  name: 'applicant',
  data () {
    return {
      address: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      isDisabled: false
    }
  }
}
</script>
<style scoped lang="less">
</style>
