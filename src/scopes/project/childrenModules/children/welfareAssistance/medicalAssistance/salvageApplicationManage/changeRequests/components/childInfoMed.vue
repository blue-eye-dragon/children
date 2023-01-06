<template>
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="儿童编号"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="childNumber"
                      :require="{message:'请输入儿童编号!'}">
          <ta-input :placeholder="!jgName?'请输入儿童编号':''"
                    :disabled="jgName" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="儿童姓名"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="name"
                      :require="{message:'请输入儿童姓名!'}">
          <ta-input :placeholder="!disabled?'请输入儿童姓名':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="出生日期"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="birthday"
                      :require="{message:'请选择出生日期!'}">
          <ta-date-picker style="width: 100%;"
                          :valid-now-time="'right'"
                          :placeholder="!idCardDisabled?'请选择出生日期':''"
                          :disabled="idCardDisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">

        <ta-form-item label="患病类型"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="illnessType">
          <ta-select :placeholder="!disabled?'请选择患病类型':''"
                     mode="multiple"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in illnesstypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="儿童类别"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="childType"
                      :require="{message:'请选择儿童类别!'}">
          <ta-select :placeholder="!disabled?'请选择儿童类别':''"
                     style="width : 100%"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in childcategoryaList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身份证号"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: false },{validator: idCardValid}]}">
          <ta-input :placeholder="!disabled?'请输入身份证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="性别"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="sex"
                      :require="{message:'请输选择性别!'}">
          <ta-select :placeholder="!idCardDisabled?'请选择性别':''"
                     :disabled="idCardDisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="民族"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="nation"
                      :require="{message:'请选择民族!'}">
          <ta-select :placeholder="!disabled?'请选择民族':''"
                     style="width : 100%"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="户籍性质"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="censusRegister"
                      :require="{message:'请选择户籍性质!'}">
          <ta-select :placeholder="!disabled?'请选择户籍性质':''"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in censusregisterList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
          <!-- <ta-input v-if="qita" placeholder="请输入其他情况" :disabled="disabled"/> -->
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="所属机构"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="orgName"
                      :require="{message:'请输入所属机构!'}">
          <ta-input :placeholder="!jgName?'请输入所属机构':''"
                    :disabled="jgName" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="残疾级别"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="disabilityLevel">
          <ta-select :placeholder="!disabled?'请选择残疾级别':''"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in disabilitylevelList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">

      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="登记(增员)日期"
                      :labelCol="{span:10}"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="addChildDate"
                      :require="{message:'请选择登记（增员）日期!'}">
          <ta-date-picker style="width: 100%;"
                          :disabled="disabled"
                          :valid-now-time="'right'"
                          :placeholder="!disabled?'请选择登记（增员）日期':''" />
          <!-- <ta-date-picker style="width: 100%;" placeholder="请选择登记（增员）日期" /> -->
        </ta-form-item>
      </ta-col>
      <ta-col :span='16'>

        <AddressComponent :addressmodel="addressmodel"
                          :disabled="disabled"
                          :labelwidth="{
                              label:10,  wrapper: 14
                          }"
                          @setaddress="setaddress"
                          :msg="'户籍所在地'"></AddressComponent>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="残疾类别"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="disabilityType"
                    :initValue="[]">
        <ta-checkbox-group class="grant-checkbox"
                           :placeholder="!disabled?'请选择残疾类别':''"
                           :disabled="disabled"
                           @change="setMulti"
                           :values="disabilityTypeValues"
                           :options="disabilitytypeList">
        </ta-checkbox-group>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  props: {
    addressmodel: {
      type: Array,
      required: true
    },
    nationList: {
      type: Array,
      required: true
    },
    sexList: {
      type: Array,
      required: true
    },
    childcategoryaList: {
      type: Array,
      required: true
    },
    illnesstypeList: {
      type: Array,
      required: true
    },
    disabilitylevelList: {
      type: Array,
      required: true
    },
    disabilitytypeList: {
      type: Array,
      required: true
    },
    censusregisterList: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean
    },
    idCardDisabled: {
      type: Boolean
    }
  },
  data () {
    return {
      name: '',
      qita: false,
      canji: false,
      jgName: true,
      disabilityTypeValues: [] // 残疾类别选择的数据
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('4%', '95%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.disabilityTypeValues = []
  },
  mounted () {
  },
  methods: {
    setaddress () {
      this.$emit('setaddress')
    },
    // 如果选了多重残疾外的超过2个残疾，则多重残疾为选中
    setMulti (e) {
      let index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    idCardValid (rule, value, callback) {
      let _self = this
      this.idCardValidate(rule, value, callback, _self).then((res) => {
        if (res == '1') {
          this.$emit('idcardchange')
        }
      })
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
    },
    handleChange (value) {
      if (value == 1) {
        this.canji = false
      } else if (
        value == 2 ||
        value == 3 ||
        value == 4 ||
        value == 5 ||
        value == 6 ||
        value == 7 ||
        value == 8 ||
        value == 9
      ) {
        this.canji = true
      } else {
        this.canji = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.radios /deep/ .ant-radio-wrapper {
  margin-right: 9%;
}
.radios /deep/ .ant-radio-wrapper:nth-child(4) {
  margin-right: 0;
}
</style>
