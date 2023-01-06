<template>
  <div>
    <ta-row  class="fromcom">
      <ta-col :span="12">
        <ta-form-item
          label="福利机构名称"

          fieldDecoratorId="name"
          :require="{message:'请输入福利机构名称!'}"
        >
          <ta-input disabled     placeholder="请输入福利机构名称" />
        </ta-form-item>
        <ta-form-item
          label="联系电话"
          fieldDecoratorId="name"
          :require="{message:'请输入联系电话!'}"
        >
          <ta-input disabled     placeholder="请输入联系电话" />
        </ta-form-item>
        <ta-form-item
          label="经办人姓名"
          fieldDecoratorId="name"
          :require="{message:'请输入经办人姓名!'}"
        >
          <ta-input disabled     placeholder="请输入经办人姓名" />
        </ta-form-item>
        <ta-form-item
          label="经办人性别"
          fieldDecoratorId="0"
          :require="{message:'请选择经办人性别!'}"
        >
            <ta-select  disabled        placeholder="请选择经办人性别">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="与被收养人关系"

          fieldDecoratorId="phone"
          :require="{message:'请选择与被收养人关系!'}"
        >
            <ta-select  disabled        placeholder="请选择与被收养人关系">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item
          label="单位地址"
          fieldDecoratorId="name"
          :require="{message:'请输入单位地址!'}"
        >
          <ta-input disabled     placeholder="请输入单位地址" />
        </ta-form-item>
        <ta-form-item
          label="法定代表人姓名"
          fieldDecoratorId="name"
          :require="{message:'请输入法定代表人姓名!'}"
        >
          <ta-input disabled     placeholder="请输入法定代表人姓名" />
        </ta-form-item>
        <ta-form-item
          label="经办人身份证号"
          fieldDecoratorId="name"
          :wrapperCol="{span:18}"
          :require="{message:'请输入经办人身份证号!'}"
        >
          <ta-input disabled     placeholder="请输入经办人身份证号" />
        </ta-form-item>
        <ta-form-item
          label="经办人职务"
          fieldDecoratorId="0"
          :require="{message:'请输入经办人职务!'}"
        >
           <ta-input disabled     placeholder="请输入经办人职务" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="送养机构意见"   :labelCol="{ span: 3 }"  :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  placeholder="请输入送养机构意见" :rows="4"/>
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
