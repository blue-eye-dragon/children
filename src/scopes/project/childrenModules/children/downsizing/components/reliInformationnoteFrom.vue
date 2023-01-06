<template>
  <div>
    <ta-row style="width: 80%;margin-left:60px;margin-top:20px">
      <ta-col :span="24">
        <ta-form-item
          label="撤销收养登记原因"
          fieldDecoratorId="radioRevokeReason"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 18 }"
          :require="{message:'请输入姓名!'}"
        >
          <ta-radio-group>
            <div>
              <ta-radio :value="1">收养人和送养人双方自愿解除收养关系</ta-radio>
              <ta-radio style="margin-left:120px;" :value="2">收养人不履行义务，送养人要求解除收养关系</ta-radio>
            </div>
            <div>
              <ta-radio :value="3">养父母与成年子女关系恶化、无法共同生活，双方自愿解除收养关系</ta-radio>
              <ta-radio style="margin-left:120px;" :value="4">其他</ta-radio>
            </div>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label="解除收养事由"
          :labelCol="{ span: 2 }"
          :require="{message:'请输入收养原因!'}"
          :wrapperCol="{span:22}"
          fieldDecoratorId="cascader"
        >
          <ta-textarea placeholder="（内容包括：解除收养的原因）" :rows="4" />
        </ta-form-item>
        <ta-form-item
          label="协议事项"
          :require="{message:'请输入收养人提供证件情况!'}"

          :labelCol="{ span: 2 }"
          :wrapperCol="{span:22}"
          fieldDecoratorId="cascader"
        >
          <ta-textarea placeholder="（内容包括：收养人送养人间经济补偿问题、成年子女对收养人的经济补偿等问题）" :rows="4" />
        </ta-form-item>
        <ta-form-item
          label="其他有关事项"

          :require="{message:'请输入其他有关事项!'}"
          :labelCol="{ span: 2 }"
          :wrapperCol="{span:22}"
          fieldDecoratorId="cascader"
        >
          <ta-textarea placeholder="请输入其他有关事项" :rows="1" />
        </ta-form-item>
        <ta-form-item
          label="备注"
          :require="{message:'请输入备注!'}"
          :labelCol="{ span: 2 }"
          :wrapperCol="{span:22}"
          fieldDecoratorId="cascader"
        >
          <ta-textarea placeholder="请输入备注" :rows="1" />
        </ta-form-item>
        <ta-form-item
          label="审核意见"
          :require="{message:'请输入审核意见!'}"
          :labelCol="{ span: 2 }"
          :wrapperCol="{span:22}"
          fieldDecoratorId="cascader"
        >
          <ta-textarea placeholder="请输入审核意见" :rows="1" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item
          label="登记日期"
          fieldDecoratorId="name"
          :labelCol="{ span: 4 }"
          :wrapperCol="{span:18}"
          :require="{message:'请选择登记日期!'}"
        >
          <ta-date-picker style="width: 100%;" placeholder="请选择登记日期" />
        </ta-form-item>
        <ta-form-item
          label="收养登记证印制号"

          fieldDecoratorId="0"
          :labelCol="{ span: 4 }"
          :require="{message:'请选择收养登记证印制号!'}"
        >
          <ta-select placeholder="请选择收养登记证印制号">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
          <ta-form-item
            label="办理收养登记日期"
            fieldDecoratorId="name"
            :labelCol="{ span: 4 }"
            :wrapperCol="{span:18}"
            :require="{message:'请选择登记日期!'}"
          >
            <ta-date-picker style="width: 100%;" placeholder="请选择登记日期" />
          </ta-form-item>
          <ta-form-item
            label="原登记机关"

            fieldDecoratorId="0"
            :labelCol="{ span: 4 }"
            :require="{message:'请选择收养登记证印制号!'}"
          >
            <ta-select placeholder="请选择收养登记证印制号">
              <ta-select-option value="jack">Jack</ta-select-option>
              <ta-select-option value="lucy">Lucy</ta-select-option>
              <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
              <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item
            label="原收养登记证号"

            fieldDecoratorId="name"
            :labelCol="{ span: 4 }"
            :wrapperCol="{span:18}"
            :require="{message:'请选择登记日期!'}"
          >
            <ta-date-picker style="width: 100%;" placeholder="请选择登记日期" />
          </ta-form-item>
        </ta-col>
      <ta-col :span="12">
        <ta-form-item label="档案页数" fieldDecoratorId="0" :require="{message:'请选择档案页数!'}">
          <ta-select placeholder="请选择档案页数">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="收养登记证字号" fieldDecoratorId="0" :require="{message:'请选择收养登记证字号!'}">
          <ta-select placeholder="请选择收养登记证字号">
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
.fromin {
  width: calc(100% - 60px);
  margin-left: 60px;
  margin-top: 20px;
}
</style>
