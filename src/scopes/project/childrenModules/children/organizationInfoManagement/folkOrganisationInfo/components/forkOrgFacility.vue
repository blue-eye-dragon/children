<template>
  <div>
    <ta-row>
      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="场所权属"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="siteUseRight">
            <ta-select :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in proprietorshipList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="场所占地面积(m²)"
                        :labelCol="{ span: 12}"
                        :wrapperCol="{span:12}"
                        :require="{message:'请输入场所占地面积'}"
                        fieldDecoratorId="siteAcreage">
            <ta-input-number :disabled="disabled"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="室外场所面积(m²)"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请输入室外场所面积'}"
                        fieldDecoratorId="outdoorAcreage">
            <ta-input-number :disabled="disabled"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="房屋建筑面积(m²)"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请输入房屋建筑面积'}"
                        fieldDecoratorId="houseAcreage">
            <ta-input-number :disabled="disabled"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="房屋使用面积(m²)"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请输入房屋使用面积'}"
                        fieldDecoratorId="useAcreage">
            <ta-input-number :disabled="disabled"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="房屋建成时间"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        fieldDecoratorId="houseTime">
            <ta-date-picker placeholder
                            style="width: 100%"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="房屋结构"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择房屋结构'}"
                        fieldDecoratorId="houseStructure">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in houseStructureList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="房屋层数"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :fieldDecoratorOptions="this.verificationRules('房屋层数',20)"
                        fieldDecoratorId="housePlies">
            <!-- <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in housePliesList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select> -->
            <ta-input :disabled="disabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="儿童起居室总面积(m²)"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请输入儿童起居室总面积'}"
                        fieldDecoratorId="childrenLivingAcreage">
            <ta-input-number :disabled="disabled"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="儿童室外活动总面积(m²)"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请输入儿童室外活动总面积'}"
                        fieldDecoratorId="childrenOutAcreage">
            <ta-input-number :disabled="disabled"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否配备厨房"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择是否配备厨房'}"
                        fieldDecoratorId="kitchen">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否取得食品卫生许可证"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择是否取得食品卫生许可证'}"
                        fieldDecoratorId="foodHygieneLicence">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="是否进行环评备案"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择是否进行环评备案'}"
                        fieldDecoratorId="environmentRecord">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否通过消防验收"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择是否通过消防验收'}"
                        fieldDecoratorId="fireFightingAccept">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否通过建筑工程验收"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择是否通过建筑工程验收'}"
                        fieldDecoratorId="architectureAccept">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="厨房用电用气情况"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择厨房用电用气情况'}"
                        fieldDecoratorId="kitchenCondition">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in kitchenConditionList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是配备空调等降温设施"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择是否配备空调等降温设施'}"
                        fieldDecoratorId="coolingFacilities">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="冬季取暖方式"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择冬季取暖方式'}"
                        fieldDecoratorId="heatingWay">
            <ta-select :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in heatingWayList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="8">

        <ta-form-item label="康复设备"
                      :labelCol="{ span:12 }"
                      :wrapperCol="{span:12}"
                      :fieldDecoratorOptions="this.verificationRules('康复设备',100)"
                      fieldDecoratorId="rehabilitationEquipment">
          <ta-input :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="其他特种设备"
                      :labelCol="{ span:12 }"
                      :wrapperCol="{span:12}"
                      :fieldDecoratorOptions="this.verificationRules('其他特种设备',100)"
                      fieldDecoratorId="otherEquipment">
          <ta-input :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="生活设施设备"
                      :labelCol="{ span:12 }"
                      :wrapperCol="{span:12}"
                      :require="{message:'请选择生活设施设备'}"
                      fieldDecoratorId="lifeEquipment">
          <ta-select mode="multiple"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in lifeEquipmentList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">

        <ta-col :span="8">
          <ta-form-item label="教育设备"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择教育设备'}"
                        fieldDecoratorId="educationEquipment">
            <ta-select mode="multiple"
                       :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in educationEquipmentList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">

          <ta-form-item label="医疗设施设备"
                        :labelCol="{ span:12 }"
                        :wrapperCol="{span:12}"
                        :require="{message:'请选择医疗设施设备'}"
                        fieldDecoratorId="medicalEquipment">
            <ta-select mode="multiple"
                       :disabled="disabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in medicalEquipmentList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

    </ta-row>
  </div>
</template>
<script>

export default {
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    thisP: { required: true }
  },
  data () {
    return {
      houseStructureList: [],
      housePliesList: [],
      yesOrNoList: [],
      kitchenConditionList: [],
      heatingWayList: [],
      lifeEquipmentList: [],
      medicalEquipmentList: [],
      educationEquipmentList: [],
      proprietorshipList: []
    }
  },
  mounted () {
    this.dictionariesFrom()
  },
  methods: {

    async dictionariesFrom () {
      // 房屋结构
      this.houseStructureList = await this.getDictionaries('HOUSESTRUCTURE')
      // 房屋层数
      this.housePliesList = await this.getDictionaries('HOUSEPLIES')
      // 是否
      this.yesOrNoList = await this.getDictionaries('YESNO')
      // 厨房用电用气情况
      this.kitchenConditionList = await this.getDictionaries('KITCHENCONDITION')
      // 冬季取暖方式
      this.heatingWayList = await this.getDictionaries('KITCHENCONDITION')
      // 生活设施设备
      this.lifeEquipmentList = await this.getDictionaries('LIFEEQUIPMENT')
      // 医疗设施设备
      this.medicalEquipmentList = await this.getDictionaries('MEDICALEQUIPMENT')
      // 教育设备
      this.educationEquipmentList = await this.getDictionaries('EDUCATIONEQUIPMENT')
      // 场所权属
      this.proprietorshipList = await this.getDictionaries('SITEUSERIGHT')
    }
  }
}
</script>
