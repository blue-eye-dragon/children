<template>
  <div>
    <ta-row  class='fromcom'>
      <ta-col :span="24">
        <ta-form-item label="收养原因"  :labelCol="{ span: 3 }"
         :require="{message:'请输入收养原因!'}"
        :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  disabled    placeholder="请输入收养原因" :rows="4"/>
        </ta-form-item>
          <ta-form-item label="收养人提供证件情况"
           :require="{message:'请输入收养人提供证件情况!'}"  :labelCol="{ span: 3 }" :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  disabled    placeholder="请输入收养人提供证件情况" :rows="4"/>
        </ta-form-item>
          <ta-form-item label="送养人提供证件情况"
          :require="{message:'请输入送养人提供证件情况!'}"   :labelCol="{ span: 3 }" :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  disabled    placeholder="请输入送养人提供证件情况" :rows="4"/>
        </ta-form-item>
          <ta-form-item label="其他有关事项"

          :require="{message:'请输入其他有关事项!'}"
           :labelCol="{ span: 3 }" :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  disabled    placeholder="请输入其他有关事项" :rows="1"/>
        </ta-form-item>
          <ta-form-item label="备注"
          :require="{message:'请输入备注!'}"
         :labelCol="{ span: 3 }" :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  disabled    placeholder="请输入备注" :rows="1"/>
        </ta-form-item>
        <ta-form-item label="审核意见"
          :require="{message:'请输入审核意见!'}"
         :labelCol="{ span: 3 }" :wrapperCol="{span:21}" fieldDecoratorId="cascader">
            <ta-textarea  disabled    placeholder="请输入审核意见" :rows="1"/>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item
          label="登记日期"
          fieldDecoratorId="name"
          :require="{message:'请选择登记日期!'}"
        >
          <ta-date-picker disabled     style="width: 100%;" placeholder="请选择登记日期" />
        </ta-form-item>
        <ta-form-item
          label="收养登记证印制号"

          fieldDecoratorId="0"
          :require="{message:'请选择收养登记证印制号!'}"
        >
            <ta-select   disabled          placeholder="请选择收养登记证印制号">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
       <ta-col :span="12">
        <ta-form-item
          label="档案页数"
          fieldDecoratorId="0"
          :require="{message:'请选择档案页数!'}"
        >
            <ta-select   disabled          placeholder="请选择档案页数">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="收养登记证字号"
          fieldDecoratorId="0"
          :require="{message:'请选择收养登记证字号!'}"
        >
            <ta-select   disabled          placeholder="请选择收养登记证字号">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
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
