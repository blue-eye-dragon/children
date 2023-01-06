<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="是否蓝天计划项目"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="inBlueSkyProjectYOrN"
                    :require="{message:'请选择是否蓝天计划项目'}">
        <ta-select placeholder="请选择是否蓝天计划项目"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="占地面积（㎡）"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="areaCovered"
                    :require="{message:'请输入占地面积'}">

        <ta-input-number placeholder="占地面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="使用面积（㎡）"
                    fieldDecoratorId="areaOfUse"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    :require="{message:'请输入使用面积'}">

        <ta-input-number placeholder="使用面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="儿童起居室总面积（㎡）"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="areaOfChildrenLivingRoom"
                    :require="{message:'儿童起居室总面积'}">

        <ta-input-number placeholder="儿童起居室总面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="是否配备安全设备"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="safetyEquipmentYOrN"
                    :require="{message:'请选择是否配备安全设备'}">
        <ta-select placeholder="请选择是否配备安全设备"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="是否有专人负责机构内感染控制"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="personnelspecificInfectionControlYOrN"
                    :require="{message:'请选择是否有专人负责机构内感染控制'}">
        <ta-select placeholder="请选择是否有专人负责机构内感染控制"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="是否有消毒和隔离制度"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="disinfectionAndIsolationSystemYOrN"
                    :require="{message:'请选择是否有消毒和隔离制度'}">
        <ta-select placeholder="请选择是否有消毒和隔离制度"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="是否为儿童提供安宁服务"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="providingPeaceServicesForChildrenYOrN"
                    :require="{message:'请选择是否为儿童提供安宁服务'}">
        <ta-select placeholder="请选择是否为儿童提供安宁服务"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="建筑面积（㎡）"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="floorage"
                    :require="{message:'请输入建筑面积'}">

        <ta-input-number placeholder="请输入建筑面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="核定床位数(个)"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="approvedBedNumber"
                    :require="{message:'请输入核定床位数(个)'}">

        <ta-input-number placeholder="请输入核定床位数(个)"
                         :min="0"
                         :max="999999"
                         :precision="0"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="儿童室外活动场所总面积（㎡）"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="areaOfOutdoorActivitiesForChildren"
                    :require="{message:'请输入儿童室外活动场所总面积'}">

        <ta-input-number placeholder="请输入儿童室外活动场所总面积"
                         :min="0"
                         :max="99999"
                         :precision="2"
                         :disabled="disabled"
                         style="width:100%" />
      </ta-form-item>
      <ta-form-item label="医疗模式"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="medicalModel"
                    :require="{message:'请选择医疗模式'}">
        <ta-select placeholder="请选择医疗模式"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in medicalModel"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="是否有机构内感染预防和处理办法"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="preventionAndTreatmentOfInfectionYOrN"
                    :require="{message:'请选择是否有机构内感染预防和处理办法'}">
        <ta-select placeholder="请选择是否有机构内感染预防和处理办法"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="拥有功能区域"
                    fieldDecoratorId="havingFunctionalAreas"
                    :require="{message:'请选择拥有功能区域'}"
                    :labelCol="{ span: 6}"
                    :wrapperCol="{ span: 18}">
        <ta-select placeholder="请选择拥有功能区域"
                   mode="multiple"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in havingFunctionalAreas"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="无障碍环境"
                    fieldDecoratorId="accessibilityEnvironment"
                    :require="{message:'请选择无障碍环境'}"
                    :labelCol="{ span: 6}"
                    :wrapperCol="{ span: 18}">
        <ta-select placeholder="请选择无障碍环境"
                   mode="multiple"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in havingFunctionalAreas"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="活动室地面是否采用地板或地垫"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="floorOrMattress"
                    :require="{message:'请选择活动室地面是否采用地板或地垫'}">
        <ta-select placeholder="请选择活动室地面是否采用地板或地垫"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="卫生间及浴室是否地面防滑"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="bathroomGroundAntiskidHandle"
                    :require="{message:'请选择卫生间及浴室是否地面防滑'}">
        <ta-select placeholder="请选择卫生间及浴室是否地面防滑"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="是否配备消防负责人"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="fireChiefYOrN"
                    :require="{message:'请选择是否配备消防负责人'}">
        <ta-select placeholder="请选择是否配备消防负责人"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="机构内地面是否做防滑处理"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="groundAntiskidHandle"
                    :require="{message:'请选择机构内地面是否做防滑处理'}">
        <ta-select placeholder="请选择机构内地面是否做防滑处理"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="是否有微型消防站"
                    :labelCol="{span:12}"
                    :wrapperCol="{span:12}"
                    fieldDecoratorId="miniFireStationYOrN"
                    :require="{message:'请选择是否有微型消防站'}">
        <ta-select placeholder="请选择是否有微型消防站"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="是否配备有资质的专（兼）职消防管理人员"
                    :labelCol="{span:14}"
                    :wrapperCol="{span:10}"
                    fieldDecoratorId="qualifiedFireChiefYOrN"
                    :require="{message:'请选择是否配备有资质的专（兼）职消防管理人员'}">
        <ta-select placeholder="请选择是否配备有资质的专（兼）职消防管理人员"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean
    },
    yesorno: {
      type: Array
    },
    // 医疗模式
    medicalModel: {
      type: Array,
      require: true
    },
    // 拥有功能区域
    havingFunctionalAreas: {
      type: Array,
      require: true
    }
  }
}
</script>
