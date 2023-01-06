<template>
  <ta-row>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="住房情况"
                      fieldDecoratorId="housingSituation"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :require="{message:'请选择住房情况'}">
          <ta-select :placeholder="!basedisabled?'请选择住房情况':''"
                     :disabled="basedisabled"
                     style="width: 100%;">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in housingSituationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="9">
        <ta-form-item label="自住房面积（m²）"
                      fieldDecoratorId="owningArea"
                      :labelCol="{span:11}"
                      :wrapperCol="{span:13}">
          <ta-input-number :min="1"
                           :max="99999"
                           :precision='2'
                           style="width:100%"
                           placeholder="请输入自住房面积"
                           :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="9">
        <ta-form-item label="是否给被收养人安排独立房间"
                      fieldDecoratorId="isPrivateRoom"
                      :labelCol="{span:14}"
                      :wrapperCol="{span:10}"
                      :require="{message:'请选择是否安排独立房间'}">
          <ta-select :placeholder="!basedisabled?'请选择是否安排独立房间':''"
                     :disabled="basedisabled"
                     style="width: 100%;">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in isPrivateRoomList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="收养动机"
                    class="alonerow2"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="adoptionMotivation"
                    :fieldDecoratorOptions="verificationRules('收养动机',200,false)">
        <ta-textarea :placeholder="!basedisabled?'请输入收养动机':''"
                     :rows="4"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="其他情况说明"
                    class="alonerow2"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="otherDescription"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('其他情况说明',200,true)">
        <ta-textarea :placeholder="!basedisabled?'请输入其他情况说明':''"
                     :rows="4"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <processingInformation></processingInformation>
    </ta-col>
  </ta-row>
</template>
<script>
import processingInformation from '../../../adoption/components/processingInformation'
export default {
  props: {
    basedisabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      housingSituationList: '', // 住房情况字典数据
      isPrivateRoomList: '' //  是否给被收养人安排独立房间字典数据
    }
  },
  components: {
    processingInformation
  },
  mounted () {
    this.getMenuDatas()
  },
  updated () {
    this.setLabelAndWrapperWidth('9.33%', '90.67%', 'alonerow2') // 单独一行字段宽度控制
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.housingSituationList = await this.getDictionaries('HOUSINGNATURE') // 获取住房情况字典数据
      this.isPrivateRoomList = await this.getDictionaries('YESNO') // 获取是否给被收养人安排独立房间字典数据
    },
  }
}
</script>
