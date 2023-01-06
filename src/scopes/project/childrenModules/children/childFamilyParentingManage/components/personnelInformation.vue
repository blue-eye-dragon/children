<template>
  <div class="nofy">
    <!-- <ta-col :span="24"> -->
    <div class="titletop">
      <img :src="imgsrc"
           alt />
      <span>{{titletext}}</span>
      <ta-radio-group @change="setHouseholderChange"
                      class="radio_grops"
                      :disabled='disabled'
                      v-model="householder">
        <ta-radio :value="types">户主</ta-radio>
      </ta-radio-group>
    </div>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="姓名"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId='name'
                      :fieldDecoratorOptions="verificationRules('姓名', 72)">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    :disabled='disabled' />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="性别"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="sex"
                      :require="{message:'请选择性别'}">
          <ta-select allowClear
                     placeholder="请选择性别"
                     :disabled='true'>
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="民族"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="nation"
                      :require="{ message: '请选择民族' }">
          <ta-select :disabled="disabled"
                     :placeholder="!disabled ? '请选择民族' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in nationList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="身份证号"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId='idCard'
                      :fieldDecoratorOptions="({validateTrigger: 'blur',rules: [{ required: true, message: '请输入身份证号' },{validator:idCardValid}]})"
                      ref='idCard'>
          <ta-input :placeholder="disabled?'':'请输入身份证号'"
                    :disabled='disabled' />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="出生日期"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="birth"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择出生日期':''"
                          :disabled="true"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="文化程度"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="educationLevels">
          <ta-select allowClear
                     placeholder="请选择文化程度"
                     :disabled='disabled'>
            <ta-select-option v-for="item in educationLevelsList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="工作单位"
                      fieldDecoratorId='workUnit'
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('工作单位', 50)">
          <ta-input :placeholder="disabled?'':'请输入工作单位'"
                    :disabled='disabled' />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="职务"
                      fieldDecoratorId='occupation'
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}">
          <ta-select allowClear
                     placeholder="请选择职务"
                     :disabled='disabled'>
            <ta-select-option v-for="item in occupationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <!-- healthCondition -->
        <Health :labelwidth="labelwidth"
                :fileldName="'health'"
                :disabled="disabled"
                :heathmodel="types=='1'?heathmodel:heathmodels"
                @setheath="setheath"></Health>
      </ta-col>
    </ta-col>
  </div>
</template>
<script>
import Health from '@component/common/components/health'
import moment from 'moment'
export default {
  components: {
    Health
  },
  props: {
    types: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    heathmodel: {
      type: Array,
      required: true
    },
    heathmodels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      titletext: '',
      sexList: [], // 性别字典数据
      educationLevelsList: [], // 文化程度字典数据
      occupationList: [], // 职务字典数据
      nationList: [], // 民族字典数据
      householder: '1', // 户主

      imgsrc: '',
      imgsrc1: require('./img/parentman.png'),
      imgsrc2: require('./img/parentwomen.png'),

      labelwidth:
      {
        label: 7,
        wrapper: 17
      },
      isvalidator: false,
      errMsg: null // 身份证号错误信息
    }
  },
  activated () {

  },

  mounted () {
    this.types == 1 ? (this.titletext = '男方信息') : (this.titletext = '女方信息')
    this.types == 1 ? this.imgsrc = this.imgsrc1 : this.imgsrc = this.imgsrc2
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.educationLevelsList = await this.getDictionaries('DEGREEEDUCATION') // 获取文化程度字典数据
      this.occupationList = await this.getDictionaries('OCCUPATION') // 获取职务字典数据
      this.nationList = await this.getDictionaries('NATION') // 民族字典数据
    },
    // 出生日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 户主的选择
    setHouseholderChange (val) {
      this.$emit('setHouseholder', val.target.value)
    },
    // 设置健康状况
    setheath () {
      this.$emit('setheath', this.types == '1' ? this.heathmodel : this.heathmodels, this.types)
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      let _self = this
      if (!_self.isvalidator) {
        // _self.errMsg ? callback(_self.errMsg[0]) : callback()
        callback()
      } else {
        this.idCardValidate(rule, value, callback, _self)
      }
    },
    // 身份证号格式验证通过后，请求后台验证前的前端其他验证（重复性等），需要返回值（返回错误信息或空）
    beforeBackstage (value) {
      // 身份证号验重处理
      this.$emit('judgeIdCardIsNotRepeat', value, this.types == '1' ? 'womanForm' : 'manForm', function (callback) {
        message = callback == '' ? null : callback
      })
      return message
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndAgeByIdCard', birth, this.types == '1' ? 'manForm' : 'womanForm', 'birth')
    }
  }
}
</script>
<style lang="less" scoped>
.nofy {
  padding: 0 7%;
}
.titletop {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin: 10px 0 20px 0;
}
.titletop img {
  height: 100%;
  margin-right: 10px;
  margin-left: 12%;
}
.nofy /deep/.ant-radio-wrapper {
  margin-right: 11px;
}
.radio_grops {
  margin-left: 20px;
}
</style>
