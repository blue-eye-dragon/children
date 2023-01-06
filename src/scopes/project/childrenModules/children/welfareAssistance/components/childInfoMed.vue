<template>
  <ta-row class="fromcom">
    <ta-col :span="6">
      <ta-form-item label="儿童编号"
                    fieldDecoratorId="childNumber"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :require="{message:'请输入儿童编号'}">
        <ta-input :placeholder="!jgName?'请输入儿童编号':''"
                  :disabled="jgName" />
      </ta-form-item>

      <ta-form-item label="出生日期"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="birthday"
                    :require="submitNotSave?{message:'请选择出生日期'}:false">
        <ta-date-picker style="width: 100%;"
                        :valid-now-time="'right'"
                        :placeholder="!idCardDisabled?'请选择出生日期':''"
                        :disabled="idCardDisabled" />
      </ta-form-item>
      <AddressComponent :labelwidth="labelwidth"
                        :addressmodel="addressmodel"
                        :disabled="disabled"
                        @setaddress="setaddress"
                        :isRequire="submitNotSave?true:false"
                        :msg="'户籍所在地'"></AddressComponent>
      <ta-form-item label="患病类型"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="illnessType">
        <ta-select :placeholder="!disabled?'请选择患病类型':''"
                   @change="changeD()"
                   mode="multiple"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in illnesstypeList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="儿童类别"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="childType"
                    :require="submitNotSave?{message:'请选择儿童类别'}:false">
        <ta-select :placeholder="!disabled?'请选择儿童类别':''"
                   style="width : 100%"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in childcategoryaList "
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>

      <ta-form-item label="性别"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="sex"
                    :require="submitNotSave?{message:'请输选择性别'}:false">
        <ta-select :placeholder="!idCardDisabled?'请选择性别':''"
                   :disabled="idCardDisabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in sexList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="所属机构"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="orgName"
                    :require="submitNotSave?{message:'请输入所属机构'}:false">
        <ta-input :placeholder="!jgName?'请输入所属机构':''"
                  :disabled="jgName" />
      </ta-form-item>

    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="儿童姓名"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="name"
                    :fieldDecoratorOptions="rules.name">
        <ta-input :placeholder="!disabled?'请输入儿童姓名':''"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="登记（增员）日期"
                    fieldDecoratorId="addChildDate"
                    :require="submitNotSave?{message:'请选择登记（增员）日期'}:false"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}">
        <ta-date-picker style="width: 100%;"
                        :disabled="disabled"
                        :valid-now-time="'right'"
                        :placeholder="!disabled?'请选择登记（增员）日期':''" />
      </ta-form-item>
      <ta-form-item label="户籍性质"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="censusRegister"
                    :require="submitNotSave?{message:'请选择户籍性质'}:false">
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
      <ta-form-item label="身份证号"
                    fieldDecoratorId="idCard"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: false },{validator: idCardValid}]}">
        <ta-input :placeholder="!disabled?'请输入身份证号':''"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="民族"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="nation"
                    :require="submitNotSave?{message:'请选择民族'}:false">
        <ta-select :placeholder="!disabled?'请选择民族':''"
                   style="width : 100%"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in nationList "
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="残疾级别"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="disabilityLevel">
        <ta-select :placeholder="!disabled?'请选择残疾级别':''"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in disabilitylevelList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>

    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="残疾类别"
                    class='alonerow'
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
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      name: '',
      qita: false,
      canji: false,
      jgName: true,
      rules: {
        name: this.verificationRules('儿童姓名', 72)
      },
      disabilityTypeValues: [], // 残疾类别选择的数据
      submitNotSave: false, // 点击提交按钮true，点击暂存按钮false
      isvalidator: false,
      errMsg: null // 身份证号错误信息
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.7%', '91.3%', 'alonerow') // 单独一行字段宽度控制
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
      if (!_self.isvalidator) {
        // _self.errMsg ? callback(_self.errMsg[0]) : callback()
        callback()
      } else {
        this.idCardValidate(rule, value, callback, _self).then(res => {
          if (res == '1') {
            this.$emit('idcardchange')
          }
        })
      }
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
    },
    changeD () {
      this.$emit('clickSearch')
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
