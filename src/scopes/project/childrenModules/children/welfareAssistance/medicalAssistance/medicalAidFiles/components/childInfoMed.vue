<template>
  <ta-row class="fromcom">

    <ta-col :span="8">
      <ta-form-item label="儿童编号"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="childNumber"
                    :require="{message:'请输入儿童编号!'}">
        <ta-input :placeholder="!disabled?'请输入儿童编号':''"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="儿童姓名"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="name"
                    :require="{message:'请输入儿童姓名!'}">
        <ta-input :placeholder="!disabled?'请输入儿童姓名':''"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="出生日期"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="birthday"
                    :require="{message:'请选择出生日期!'}">
        <ta-date-picker style="width: 100%;"
                        :valid-now-time="'right'"
                        :placeholder="!disabled?'请选择出生日期':''"
                        :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="登记(增员)日期"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="addChildDate"
                    :require="{message:'请选择登记（增员）日期!'}">
        <ta-date-picker style="width: 100%;"
                        :disabled="disabled"
                        :valid-now-time="'right'"
                        :placeholder="!disabled?'请选择登记（增员）日期':''" />
        <!-- <ta-date-picker style="width: 100%;" placeholder="请选择登记（增员）日期" /> -->
      </ta-form-item>
    </ta-col>

    <ta-col :span="8">
      <ta-form-item label="儿童类别"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
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
    <ta-col :span="8">
      <ta-form-item label="性别"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="sex"
                    :require="{message:'请输选择性别!'}">
        <ta-select :placeholder="!disabled?'请选择性别':''"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in sexList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="身份证号"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="idCard">
        <ta-input :placeholder="!disabled?'请输入身份证号':''"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="民族"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
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

    <ta-col :span="8">
      <ta-form-item label="所属机构"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="orgName"
                    :require="{message:'请输入所属机构!'}">
        <ta-input placeholder="请输入所属机构"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="残疾级别"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="disabilityLevel">
        <ta-select :placeholder="!disabled?'请选择残疾级别':''"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in disabilitylevelList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item label="户籍性质"
                    :labelCol="{span:11}"
                    :wrapperCol="{span:13}"
                    fieldDecoratorId="censusRegister"
                    :require="{message:'请输选择户籍性质!'}">
        <ta-select :placeholder="!disabled?'请选择户籍性质':''"
                   :disabled="disabled"
                   @change="handleChange">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in censusregisterList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
        <ta-input v-if="qita"
                  :placeholder="!disabled?'请输入其他情况':''"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>

    <ta-col :span="24">

      <AddressComponent :addressmodel="addressmodel"
                        :disabled="disabled"
                        :labelwidth='{label: 3,
          wrapper: 10}'
                        @setaddress="setaddress"
                        :msg="'户籍所在地'"></AddressComponent>

      <ta-form-item label="患病类型"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:10}"
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
    }
  },
  data () {
    return {
      name: '',
      qita: false,
      disabilityTypeValues: [] // 残疾类别选择的数据
      // disabled: false
    }
  },
  updated () {
    // this.setLabelAndWrapperWidth('8.7%', '91.3%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.disabilityTypeValues = []
  },
  mounted () { },
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
    handleChange (value) {
      if (value == 2) {
        // 民政机构
        this.qita = true
      }
      // this.$emit('clickSearch')
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
