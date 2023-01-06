<template>
  <div>
    <ta-row >
      <ta-col :span="12">
        <ta-form-item
          label="姓名"
          fieldDecoratorId="name"
          :require="{message:'请输入姓名!'}"
        >
          <ta-input disabled    placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item
          label="身份证号"
          fieldDecoratorId="name"
          :require="{message:'请输入身份证号!'}"
        >
          <ta-input disabled    placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item
          label="出生日期"
          fieldDecoratorId="name"
          :require="{message:'请选择出生日期!'}"
        >
          <ta-date-picker style="width: 100%;" placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item
          label="国籍"
          fieldDecoratorId="0"
          :require="{message:'请选择国籍!'}"
        >
            <ta-select  disabled        placeholder="请选择国籍">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="工作单位"
          fieldDecoratorId="phone"
          :require="{message:'请输入工作单位!'}"
        >
          <ta-input disabled    placeholder="请输入工作单位" />
        </ta-form-item>
        <ta-form-item
          label="健康状况"
          fieldDecoratorId="idcard"
          :require="{message:'请选择健康状况!'}"
        >
            <ta-select  disabled        placeholder="请选择健康状况">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="联系电话"
          fieldDecoratorId="phone"
          :require="{message:'请输入电话号码!'}"
          :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的手机号码不合法'}]}"
        >
          <ta-input disabled    placeholder="请输入电话号码" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item
          label="姓名"
          fieldDecoratorId="name"
          :require="{message:'请输入姓名!'}"
        >
          <ta-input disabled    placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item
          label="身份证号"
          fieldDecoratorId="name"
          :require="{message:'请输入身份证号!'}"
        >
          <ta-input disabled    placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item
          label="出生日期"
          fieldDecoratorId="name"
          :wrapperCol="{span:18}"
          :require="{message:'请选择出生日期!'}"
        >
          <ta-date-picker style="width: 100%;" placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item
          label="国籍"
          fieldDecoratorId="0"
          :require="{message:'请选择国籍!'}"
        >
            <ta-select  disabled        placeholder="请选择国籍">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="工作单位"
          fieldDecoratorId="phone"
          :require="{message:'请输入工作单位!'}"
        >
          <ta-input disabled    placeholder="请输入工作单位" />
        </ta-form-item>
        <ta-form-item
          label="健康状况"
          fieldDecoratorId="idcard"
          :require="{message:'请选择健康状况!'}"
        >
            <ta-select  disabled        placeholder="请选择健康状况">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="联系电话"
          fieldDecoratorId="phone"
          :require="{message:'请输入电话号码!'}"
          :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的手机号码不合法'}]}"
        >
          <ta-input disabled    placeholder="请输入电话号码" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="地址" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" fieldDecoratorId="cascader">
          <ta-input-group compact>
            <ta-cascader
              style="width:330px"
              :options="address"
              placeholder="请选择地址"
              :disabled="isDisabled"
            />
            <ta-input disabled    style="width: calc(100% - 330px)" placeholder="请输入详细地址" />
          </ta-input-group>
        </ta-form-item>
      </ta-col>
    </ta-row>
  </div>
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
