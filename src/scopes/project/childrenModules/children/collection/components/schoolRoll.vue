<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="就读学校名称"
                      :labelCol="{span:11}"
                      :wrapperCol="{span:13}"
                      fieldDecoratorId="schoolName"
                      :fieldDecoratorOptions="verificationRules('就读学校名称',72)">
          <ta-input placeholder="请输入名称"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="学历"
                      fieldDecoratorId="education"
                      :require="{message:'请选择学历'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择学历':''"
                     :disabled="disabled"
                     @change="getPayment"
                     :options="educationList">
            <!-- <ta-select-option v-for="item in educationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option> -->
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="学制"
                      fieldDecoratorId="educationalSystem"
                      :require="{message:'请选择学制'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择学制':''"
                     :disabled="disabled"
                     @change="getPayment">
            <ta-select-option v-for="item in educationLenghtList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="开始日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="startDate"
                      :require="{message:'请选择开始日期'}">
          <ta-month-picker style="width: 100%;"
                           :placeholder="!disabled?'请选择开始日期':''"
                           :disabled="disabled"
                           v-model="startValue"
                           :disabledDate="disabledStartDate" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="结束日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="endDate"
                      :require="{message:'请选择结束日期'}">
          <ta-month-picker style="width: 100%;"
                           :placeholder="!disabled?'请选择结束日期':''"
                           :disabled="disabled"
                           :disabledDate="disabledEndDate"
                           v-model="endValue" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="9">
        <AddressComponent :addressmodel="addressmodelPm"
                          :msg="'录取通知邮寄地址'"
                          :labelwidth="{
                              label:7,  wrapper: 17
                          }"
                          :isRequire="false"
                          fileldName='addressDatas2'
                          @setaddress="setaddress2"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="9">
        <ta-form-item label
                      fieldDecoratorId="detail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('详细地址',100)">
          <ta-input :placeholder="!disabled?'请输入详细地址':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  props: ['disabled', 'changedisabled', 'childtype', 'addressmodelPm','thisP'],
  data () {
    return {
      educationList: [], // 页面使用的字典数据
      educationList1: [], // 学历字典数据
      educationLenghtList: [], // 学制字典数据
      bankRequire: false, // 儿童本人开户行、儿童本人银行账号必填控制
      receiveRequire: true, // 领取人、领取人与儿童关系必填控制
      // submitNotSave: false, // 点击提交按钮true，点击暂存按钮false

      dataSource: [],
      startValue: null, // 开始日期
      endValue: null // 结束日期
    }
  },
  activated () {
    // this.valueSelect = null
    // this.valueInput = ''
    // this.submitNotSave = true
    this.getMenuDatas()
  },
  mounted () {
    // this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.educationList1 = await this.getDictionaries('DEGREEEDUCATION') // 学历字典数据
      this.educationLenghtList = await this.getDictionaries('LENGTHOFSCHOOLING') // 学制字典数据
      if (this.thisP.$route.query.operateFlag == 'add') {
        this.educationList = this.educationList1.filter(item => {
          return item.value == 40 || item.value == 30 || item.value == 20 || item.value == 92 || item.value == 93
        })
      } else {
        this.educationList1.forEach(item => {
          if (item.value != 40 && item.value != 30 && item.value != 20 && item.value != 92 && item.value != 93) {
            item.disabled = true
          }
        })
        this.educationList = this.educationList1
      }
    },
    // 地址数据回调
    setaddress2 () {
      this.$emit('setaddress2')
    },
    // 开始日期控制
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      } else {
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 结束日期控制
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!startValue || !endValue) {
        return false
      } else {
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 选择与儿童关系
    getRelation (e) {
      this.valueSelect = e
    },
    getPayment (e) {
      const _self = this
      // 当儿童类型为“社会散居孤儿3”且领取方式为“银行转账2”时，字段“儿童本人开户行、儿童本人银行账号、领取人、领取人与儿童关系”为必填项；当领取方式为：“现金领取1”时，字段“儿童本人开户行、儿童本人银行账号“为非必填项，”领取人、领取人与儿童关系”为必填项。
      _self.bankRequire = false
      _self.receiveRequire = true
      if (_self.childtype == '3') {
        if (e == '1') { // 现金领取
          _self.bankRequire = false
          _self.receiveRequire = true
        }
        if (e == '2') { // 银行转账
          _self.bankRequire = true
          _self.receiveRequire = true
        }
      }
    }
  }
  // watch: {
  //   valueInput: function (newval, oldval) {
  //     this.$emit('setErrorMessage', newval)
  //   },
  //   valueSelect: function (newval, oldval) {
  //     if (newval != this.Enum.RELATION.QT) {
  //       this.$emit('setErrorMessage', '1')
  //     } else {
  //       this.$emit('setErrorMessage', this.valueInput)
  //     }
  //   }
  // }
}
</script>
<style scoped lang="less">
</style>
