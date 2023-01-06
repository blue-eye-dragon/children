<template>
  <div class="divClass">
    <ta-form layout="horizontal"
             :hideRequiredMark="true"
             :autoFormCreate="(form)=>{this.fatherForm = form}">
      <ta-row>
        <ta-col :span="24">
          <!-- <label class="fontclass">父亲</label> -->
          <Title title="父亲"
                 :ishide='false'></Title>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name">
            <ta-input :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard">
            <ta-input :disabled="disabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="联系电话"
                        fieldDecoratorId="contactNumber">
            <ta-input :disabled="disabled" />
          </ta-form-item>
          <Health fileldName='healthConditionDatas'
                  :disabled="disabled"
                  :clearPlaceHolder="true"
                  :heathmodel="heathFatherModel"
                  @setheath="setFatherHeaths"></Health>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="12">
            <AddressComponent :addressmodel="addressFatherModel"
                              :msg="'户籍所在地'"
                              :clearPlaceHolder="true"
                              :disabled="disabled"
                              arealevel="5"
                              fileldName='censusRegisterDatas'
                              @setaddress="setFatherAddress"></AddressComponent>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label
                          fieldDecoratorId="censusRegisterDetail"
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 23,offset:1 }">
              <ta-input :disabled="disabled" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="12">
            <AddressComponent :addressmodel="addressFatherModelNow"
                              :msg="'现住址'"
                              :clearPlaceHolder="true"
                              fileldName='currentAddressDatas'
                              @setaddress="setFatherAddress"
                              arealevel="5"
                              :disabled="disabled"></AddressComponent>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label
                          fieldDecoratorId="currentAddressDetail"
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 23,offset:1 }">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
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
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="24">
            <ta-form-item label="家庭经济来源"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="inancialSource">
              <ta-checkbox v-for="item in inancialSourceList"
                           :key="item.value"
                           :value="item.value"
                           :disabled="disabled"
                           style="float:left;">{{item.label}}</ta-checkbox>
            </ta-form-item>
          </ta-col>
        </ta-col>
      </ta-row>
    </ta-form>
    <ta-form layout="horizontal"
             :hideRequiredMark="true"
             :autoFormCreate="(form)=>{this.motherForm = form}">
      <ta-row>
        <ta-col :span="24">
          <!-- <label class="fontclass">母亲</label> -->
          <Title title="母亲"
                 :ishide='false'></Title>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name">
            <ta-input :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard">
            <ta-input :disabled="disabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="联系电话"
                        fieldDecoratorId="contactNumber">
            <ta-input :disabled="disabled" />
          </ta-form-item>
          <Health fileldName='healthConditionDatas'
                  :disabled="disabled"
                  :clearPlaceHolder="true"
                  :heathmodel="heathMotherModel"
                  @setheath="setMotherHeaths"></Health>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="12">
            <AddressComponent :addressmodel="addressMotherModel"
                              :msg="'户籍所在地'"
                              :disabled="disabled"
                              :clearPlaceHolder="true"
                              arealevel="5"
                              fileldName='censusRegisterDatas'
                              @setaddress="setMotherAddress"></AddressComponent>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label
                          fieldDecoratorId="censusRegisterDetail"
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 23,offset:1 }">
              <ta-input :disabled="disabled" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="12">
            <AddressComponent :addressmodel="addressMotherModelNow"
                              :msg="'现住址'"
                              fileldName='currentAddressDatas'
                              :clearPlaceHolder="true"
                              @setaddress="setMotherAddress"
                              arealevel="5"
                              :disabled="disabled"></AddressComponent>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label
                          fieldDecoratorId="currentAddressDetail"
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 23,offset:1 }">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
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
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="24">
            <ta-form-item label="家庭经济来源"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21 }"
                          fieldDecoratorId="inancialSource">
              <ta-checkbox v-for="item in inancialSourceList"
                           :key="item.value"
                           :value="item.value"
                           :disabled="disabled"
                           style="float:left;">{{item.label}}</ta-checkbox>
            </ta-form-item>
          </ta-col>
        </ta-col>
      </ta-row>
    </ta-form>
  </div>
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
    addressFatherModel: {},
    addressFatherModelNow: {},
    addressMotherModel: {},
    addressMotherModelNow: {},
    heathFatherModel: {},
    heathMotherModel: {},
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // disabled: true,
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
      this.specialSituateList = await this.getDictionaries('OTHERSPECIALCASES') // 获取其他特殊情况字典数据
      this.inancialSourceList = await this.getDictionaries('FAMILYSOURCEINCOME') // 获取家庭经济来源字典数据
    },
    // 父亲地址传值
    setFatherAddress () {
      this.fatherForm.setFieldsValue({
        censusRegisterDatas: this.addressFatherModel,
        currentAddressDatas: this.addressFatherModelNow
      })
    },
    // 母亲地址传值
    setMotherAddress () {
      this.motherForm.setFieldsValue({
        censusRegisterDatas: this.addressMotherModel,
        currentAddressDatas: this.addressMotherModelNow
      })
    },
    // 父亲健康状况传值
    setFatherHeaths () {
      this.fatherForm.setFieldsValue({
        healthConditionDatas: this.heathFatherModel
      })
    },
    // 母亲健康状况传值
    setMotherHeaths () {
      this.motherForm.setFieldsValue({
        healthConditionDatas: this.heathMotherModel
      })
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
