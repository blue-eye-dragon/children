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
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="就读年级"
                      fieldDecoratorId="grade">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择就读年级':''"
                     :disabled="disabled"
                     :options="gradeList">
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="儿童联系电话"
                      fieldDecoratorId="telephone"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('联系电话',{type: 'phone'})">
          <ta-input :disabled="disabled"
                    :placeholder="!disabled?'请输入联系电话':''" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="助学开始日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="startDate"
                      :require="{message:'请选择助学开始日期'}">
          <ta-month-picker style="width: 100%;"
                           :placeholder="!disabled?'请选择助学开始日期':''"
                           :disabled="disabled"
                           v-model="startValue"
                           :disabledDate="disabledStartDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="助学结束日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="endDate"
                      :require="{message:'请选择助学结束日期'}">
          <ta-month-picker style="width: 100%;"
                           :placeholder="!disabled?'请选择助学结束日期':''"
                           :disabled="disabled"
                           :disabledDate="disabledEndDate"
                           v-model="endValue" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="学制"
                      :require="{message:'请选择学制'}">
          <ta-input-group>
            <ta-col :span="20">
              <ta-input :disabled="disabled"
                        v-model="educationalSystem" />
            </ta-col>
            <ta-col :span="4">
              <div class="textClass">年</div>
            </ta-col>
          </ta-input-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="证明人姓名"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="witnessName"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('证明人姓名',72)">
          <ta-input :disabled="disabled"
                    :placeholder="!disabled?'请输入证明人姓名':''" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="证明人联系电话"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="witnessPhone"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('证明人联系电话',{type: 'phone'})">
          <ta-input :disabled="disabled"
                    :placeholder="!disabled?'请输入证明人联系电话':''" />
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
  props: ['disabled', 'changedisabled', 'childtype', 'addressmodelPm', 'operateFlag'],
  data () {
    return {
      educationList: [], // 页面使用的字典数据
      education: [], // 学历字典数据
      gradeList: [], // 就学年级字典数据
      educationLenghtList: [], // 学制字典数据
      bankRequire: false, // 儿童本人开户行、儿童本人银行账号必填控制
      receiveRequire: true, // 领取人、领取人与儿童关系必填控制
      educationalSystem: 0, // 计算出的学制数据

      dataSource: [],
      startValue: null, // 开始日期
      endValue: null // 结束日期
    }
  },
  activated () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      const _self = this
      _self.education = await this.getDictionaries('DEGREEEDUCATION') // 学历字典数据
      const arr = [_self.Enum.DEGREEEDUCATION.BSYJS, _self.Enum.DEGREEEDUCATION.SJYJS, _self.Enum.DEGREEEDUCATION.DXBK, _self.Enum.DEGREEEDUCATION.DXZKHZKXX, _self.Enum.DEGREEEDUCATION.ZDZYXXHZDJSXX]
      if (_self.operateFlag == 'add') {
        _self.educationList = _self.education.filter(item => {
          return arr.indexOf(item.value) != -1
        })
      } else {
        _self.education.forEach(item => {
          item.disabled = arr.indexOf(item.value) == -1
        })
        _self.educationList = _self.education
      }

      this.gradeList = await this.getDictionaries('GRADE') // 就学年级字典数据
      this.educationLenghtList = await this.getDictionaries('LENGTHOFSCHOOLING') // 学制字典数据
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
    // 地址数据回调
    setaddress2 () {
      this.$emit('setaddress2')
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
  },
  watch: {
    // 根据开始日期与结束日期计算学制
    startValue (val) {
      // this.educationalSystem = val && this.endValue ? this.endValue.diff(val, 'years') : 0
    },
    // 根据开始日期与结束日期计算学制
    endValue (val) {
      // this.educationalSystem = val && this.startValue ? val.diff(this.startValue, 'years') : 0
    }
  }
}
</script>
<style scoped lang="less">
.textClass {
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  width: 20px;
}
</style>
