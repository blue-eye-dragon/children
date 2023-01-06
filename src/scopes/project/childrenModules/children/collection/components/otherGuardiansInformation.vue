<template>
  <ta-row class="divClass">
    <ta-col :span="24">
      <!-- <label class="fontclass">其他监护人信息</!-->
      <Title title="其他监护人信息"
             :ishide='false'></Title>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="父母双方同时外出"
                    fieldDecoratorId="parentsOut">
        <ta-radio-group>
          <ta-radio v-for="item in parentsOutList"
                    :key="item.value"
                    :value="item.value"
                    :disabled="disabled">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="父母一方外出，另一方无监护能力"
                    fieldDecoratorId="oneParentGuard">
        <ta-radio-group>
          <ta-radio v-for="item in parentsOutList"
                    :key="item.value"
                    :value="item.value"
                    :disabled="disabled">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="无监护能力"
                    fieldDecoratorId="guardAbility">
        <ta-radio-group>
          <ta-radio v-for="item in parentsOutList"
                    :key="item.value"
                    :value="item.value"
                    :disabled="disabled">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="父母外出有无委托其他监护人"
                    fieldDecoratorId="otherGuardians">
        <ta-radio-group>
          <ta-radio v-for="item in parentsOutList"
                    :key="item.value"
                    :value="item.value"
                    :disabled="disabled">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="祖父姓名"
                    fieldDecoratorId="grandpa">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="祖母姓名"
                    fieldDecoratorId="grandma">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="外祖父姓名"
                    fieldDecoratorId="wgrandpa">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="外祖父姓名"
                    fieldDecoratorId="wgrandpa">
        <ta-input :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="出生日期"
                    fieldDecoratorId="grandpaBirth">
        <ta-date-picker format="YYYY-MM-DD"
                        placeholder=""
                        style="width: 100%;"
                        :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="出生日期"
                    fieldDecoratorId="grandmaBirth">
        <ta-date-picker format="YYYY-MM-DD"
                        placeholder=""
                        style="width: 100%;"
                        :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="出生日期"
                    fieldDecoratorId="wgrandpaBirth">
        <ta-date-picker format="YYYY-MM-DD"
                        placeholder=""
                        style="width: 100%;"
                        :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="出生日期"
                    fieldDecoratorId="wgrandmaBirth">
        <ta-date-picker format="YYYY-MM-DD"
                        placeholder=""
                        style="width: 100%;"
                        :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="受委托监护人姓名"
                    fieldDecoratorId="name">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="身份证号"
                    fieldDecoratorId="idCard">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <Health fileldName='healthConditionDatas'
              :disabled="disabled"
              :clearPlaceHolder="true"
              :heathmodel="heathOtherModel"
              @setheath="setOtherHeaths"></Health>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="与儿童关系"
                    fieldDecoratorId="relationship">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="联系电话"
                    fieldDecoratorId="cellPhone">
        <ta-input :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="其他特殊情况"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="specialSituate">
        <ta-checkbox v-for="item in specialSituateList"
                     :key="item.value"
                     :value="item.value"
                     :disabled="disabled"
                     style="float:left;">{{item.label}}</ta-checkbox>
      </ta-form-item>
    </ta-col>

    <ta-col :span="24">
      <!-- <label class="fontclass">机构信息</label> -->
      <Title title="机构信息"
             :ishide='false'></Title>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="机构名称"
                    fieldDecoratorId="organizationName">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="固定电话"
                    fieldDecoratorId="leaderPhone">
        <ta-input :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="负责人"
                    fieldDecoratorId="leader">
        <ta-input :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="联系电话"
                    fieldDecoratorId="contactNumber">
        <ta-input :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="单位性质"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    fieldDecoratorId="unitProperty">
        <ta-checkbox v-for="item in specialSituateList"
                     :key="item.value"
                     :value="item.value"
                     :disabled="disabled">{{item.label}}</ta-checkbox>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <AddressComponent :addressmodel="addressOtherModel"
                          :msg="'机构地址'"
                          fileldName='unitDatas'
                          :clearPlaceHolder="true"
                          @setaddress="setOtherAddress"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label
                      fieldDecoratorId="unitDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>

  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import Health from '@/scopes/project/common/components/health'
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  components: {
    AddressComponent,
    Health,
    Title
  },
  props: {
    addressOtherModel: {},
    heathOtherModel: {},
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // disabled: true,
      parentsOutList: [], // 父母双方同时外出字典数据
      specialSituateList: [], // 其他特殊情况
      inancialSourceList: [] // 家庭经济来源字典数据
    }
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.parentsOutList = await this.getDictionaries('YESNO') // 获取父母双方同时外出（是否）字典数据
      this.specialSituateList = await this.getDictionaries('OTHERSPECIALCASES') // 获取其他特殊情况字典数据
      this.inancialSourceList = await this.getDictionaries('FAMILYSOURCEINCOME') // 获取家庭经济来源字典数据
    },
    // 地址传值
    setOtherAddress () {
      this.$emit('setOtherAddress')
    },
    // 健康状况传值
    setOtherHeaths () {
      this.$emit('setOtherHeaths')
    },
    callback (key) {
      console.log(key)
    }
  }
}
</script>
<style scoped>
.fontclass {
  float: left;
  font-weight: 400;
  padding: 10px;
}
.divClass {
  padding: 0 5%;
}
</style>
