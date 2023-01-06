<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <!-- <div class="ant-col-1 ant-form-item-label"><label for="name"
               title="特征"
               class="ant-form-item-required">特征</label></div> -->
      <ta-col :span="6">
        <ta-form-item label="体态"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="posture"
                      :require="{message:'请选择体态'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择体态':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in postureList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="头发"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="hair"
                      :require="{message:'请选择头发'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择头发':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in hairList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="发色"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="hairColor"
                      :require="{message:'请选择发色'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择发色':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in hairColorList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="病残状况表述"
                      :labelCol="{ span: 5 }"
                      :wrapperCol="{span:19}"
                      fieldDecoratorId="disabilityDescription"
                      :fieldDecoratorOptions="verificationRules('病残状况表述',200)">
          <ta-input :placeholder="!disabled?'请输入病残状况表述':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="发现时衣着特征"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      fieldDecoratorId="dressCharacteristics"
                      :fieldDecoratorOptions="verificationRules('发现时衣着特征',200)">
          <ta-input :placeholder="!disabled?'请输入发现时衣着特征':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>

    </ta-col>
    <ta-col :span="24">

      <ta-col :span="6">
        <ta-form-item label="发现时间"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="findTime"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择发现时间'}]}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择发现时间':''"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="发现地点"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="findAddress"
                      :fieldDecoratorOptions="verificationRules('发现地点',100)">
          <ta-input :placeholder="!disabled?'请输入发现地点':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="入院身高(cm)"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="admissionHeight"
                      :require="{message:'请输入入院身高'}">
          <ta-input-number :min="0"
                           :max="999"
                           :precision="2"
                           style="width:100%"
                           :placeholder="!disabled?'请输入入院身高':''"
                           :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="邮箱"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="email"
                      :fieldDecoratorOptions="verificationRules('邮箱',{type: 'email'})">
          <ta-input :placeholder="!disabled?'请输入邮箱':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="telPhone1"
                      :fieldDecoratorOptions="verificationRules('联系电话',{type: 'phone'})">
          <ta-input :placeholder="!disabled?'请输入联系电话':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <!-- <ta-col :span="6">
        <ta-form-item label="联系电话2"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="telPhone2"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('联系电话2',{type: 'phone'})">
          <ta-input :placeholder="disabled?'请输入联系电话2':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="其他联系方式"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="otherPhone"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('其他联系方式',{type: 'phone'})">
          <ta-input :placeholder="disabled?'请输入其他联系方式':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col> -->
    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
export default {
  props: ['disabled'],
  data () {
    return {
      postureList: [], // 体态字典数据
      hairList: [], // 头发字典数据
      hairColorList: [] // 发色字典数据
    }
  },
  activated () {
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.postureList = await this.getDictionaries('POSTURE') // 获取体态字典数据
      this.hairList = await this.getDictionaries('HAIR') // 获取头发字典数据
      this.hairColorList = await this.getDictionaries('HAIRCOLOR') // 获取发色字典数据
    },
    // 发现时间不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    }
  }
}
</script>
<style scoped lang="less">
</style>
