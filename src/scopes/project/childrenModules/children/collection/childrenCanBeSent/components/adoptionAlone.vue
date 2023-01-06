<template>
  <div>
    <ta-row>
      <ta-col :span="6">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="basedisabled?'':'请输入姓名'"
                    :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :fieldDecoratorOptions="rules.nation"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :initValue='this.Enum.NATION.HZ'>
          <ta-select :placeholder="basedisabled?'':'请选择民族'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="职业"
                      fieldDecoratorId="profession"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-select :placeholder="basedisabled?'':'请选择职业'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in occupattioList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <!-- <ta-form-item label="身份证号" fieldDecoratorId="idCard" :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入身份证号" :disabled="basedisabled" />
        </ta-form-item> -->

        <!-- <ta-form-item
          label="健康状况"
          fieldDecoratorId="healthCondition"
           :fieldDecoratorOptions="rules.healthCondition"
        >
          <ta-select placeholder="请选择健康状况" :disabled="basedisabled">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in healthList"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item> -->

      </ta-col>
      <ta-col :span="6">

        <ta-form-item label="身份类别"
                      fieldDecoratorId="identityCategory"
                      :fieldDecoratorOptions="rules.identityCategory"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :initValue="this.isCounty?this.Enum.IDENTITCATEGORY.NDJM:''">
          <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in identityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="rules.birthday">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :placeholder="basedisabled?'':'请选择出生日期'"
                          :disabled="basedisabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="工作单位"
                      fieldDecoratorId="workUnit"
                      :fieldDecoratorOptions="rules.workUnit"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="6">

        <ta-form-item label="证件类型"
                      fieldDecoratorId="memberIdType"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="rules.memberIdType"
                      :initValue='this.Enum.IDCARD_TYPE.NDJMSFZ'>
          <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                     @change="changeIdCardTypeValue"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in idcardTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="婚姻状况"
                      fieldDecoratorId="maritalStatus"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="rules.maritalStatus"
                      :initValue='this.Enum.MARRIAGE.YH'>
          <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in marriageyList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="文化程度"
                      fieldDecoratorId="educationLevel"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-select :placeholder="basedisabled?'':'请选择文化程度'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in cultureList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>
      <ta-col :span="0">
        <ta-form-item label="国籍"
                      fieldDecoratorId="nationality"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :require="{message:'请选择国籍'}"
                      :initValue='this.Enum.NATIONALITY.ZG'>
          <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationalityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">

        <ta-form-item label="证件号码"
                      fieldDecoratorId="idCard"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="IdCardTypeValue == '01'?rules.idCard:rules.idCard2">
          <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                    :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="手机号码"
                      fieldDecoratorId="contactNumber"
                      :fieldDecoratorOptions="rules.contactNumber"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="basedisabled?'':'请输入手机号码'"
                    :disabled="basedisabled" />
        </ta-form-item>
        <Health :labelwidth="labelwidth"
                :disabled="basedisabled"
                :heathmodel="heathmodel"
                @setheath="setheath"></Health>

      </ta-col>
      <ta-col :span="24">
        <ta-col :span="9">
          <AddressComponent msg="地址"
                            class="area"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"
                            :disabled="basedisabled"></AddressComponent>
        </ta-col>
        <ta-col :span="9">
          <ta-form-item label
                        :fieldDecoratorOptions="rules.censusRegisterDetail"
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="家庭年收入(元)"
                        fieldDecoratorId="familyIncome"
                        :fieldDecoratorOptions="rules.familyIncome"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <!-- <ta-select placeholder="请选择家庭年收入" :disabled="basedisabled">
              <ta-select-option
                :value="item.value"
                v-for="(item,index) in familyincomeList"
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select> -->
            <ta-input-number :min="1"
                             :max="999999999"
                             :precision='2'
                             style="width:100%"
                             :placeholder="basedisabled?'':'请输入家庭年收入(元)'"
                             :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>

      </ta-col>
      <ta-col :span="24"
              v-if="ishide">
        <ta-form-item label="与被收养人关系"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      fieldDecoratorId="relationship"
                      :require="{message:'与被收养人关系'}">
          <ta-select :placeholder="basedisabled?'':'请选择与被收养人关系'"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in relationsadopteesList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="ishide">
        <ta-form-item label="送养人意见"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                      fieldDecoratorId="opinion"
                      :fieldDecoratorOptions="rules.opinion">
          <ta-textarea :placeholder="basedisabled?'':'请输入送养人意见'"
                       :rows="1"
                       :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import Health from '@component/common/components/health'
import moment from 'moment'
export default {
  name: 'applicant',
  components: {
    AddressComponent,
    Health
  },
  props: {
    addressmodel: {
      type: Array,
      required: true
    },
    heathmodel: {
      type: Array,
      required: true
    },
    ishide: {
      type: Boolean,
      default: false
    },
    sexList: {
      type: Array,
      required: true
    },
    relationsadopteesList: {
      type: Array
    },
    nationList: {
      type: Array,
      required: true
    },
    healthList: {
      type: Array,
      required: true
    },
    cultureList: {
      type: Array,
      required: true
    },
    identityList: {
      type: Array,
      required: true
    },
    nationalityList: {
      type: Array,
      required: true
    },
    marriageyList: {
      type: Array,
      required: true
    },
    occupattioList: {
      type: Array,
      required: true
    },
    idcardTypeList: {
      type: Array,
      required: true
    },
    familyincomeList: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    },
    isCounty: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      labelwidth2: {
        label: 4,
        wrapper: 20
      },
      rules: {
        contactNumber: this.verificationRules('手机号码', { type: 'phone' }),
        familyIncome: this.verificationRules('家庭年收入(元)', '0'),
        // idCard: this.idCardValidate('证件号码'),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: this.verificationRules('证件号码', 18),
        maritalStatus: this.verificationRules('婚姻状况'),
        educationLevel: this.verificationRules('文化程度'),
        profession: this.verificationRules('职业'),
        nation: this.verificationRules('民族'),
        memberIdType: this.verificationRules('证件类型'),
        identityCategory: this.verificationRules('身份类别'),
        nationality: this.verificationRules('国籍'),
        birthday: this.verificationRules('出生日期', true),
        name: this.verificationRules('姓名', 72),
        workUnit: this.verificationRulesNotMustFill('工作单位', 50),
        healthCondition: this.verificationRules('健康状况'),
        censusRegisterDetail: this.verificationRules('详细地址', 100),
        opinion: this.verificationRules('送养人意见', 200, true)
      },
      address: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      isDisabled: false,
      addressdetailval2: '',
      cityval2: [],
      IdCardTypeValue: '01'
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('25%', '75%', 'area') // 单独一行字段宽度控制
  },
  methods: {
    changeIdCardTypeValue (v) {
      this.IdCardTypeValue = v;
      this.$emit('setIdCard');
    },
    // 禁用时间,不能选择比当前时间小的日期
    disabledDate (current) {
      return current && current > (moment().endOf('day'))
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this)
    },
    callbackByIdCard (sex, age, birth) {
      let obj = {
        sex,
        age,
        birth
      }
      this.$emit('setdate', obj)
    },
    setheath () {
      this.$emit('setheath')
    },
    setaddress () {
      this.$emit('setaddress')
    }
  }
}
</script>
<style scoped lang="less">
</style>
