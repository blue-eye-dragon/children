<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="24">
        <ta-col :span="6"
                key="a">
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="rules.idCard">
            <ta-input :placeholder="basedisabled?'':'请输入身份证号'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="文化程度"
                        fieldDecoratorId="degreeOfEducation"
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
        <ta-col :span="6"
                key="b">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="rules.name"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="性别"
                        fieldDecoratorId="sex"
                        :fieldDecoratorOptions="rules.sex"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择性别'"
                       :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>

      </ta-col>
      <ta-col :span="24">
        <ta-col :span="6">
          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :fieldDecoratorOptions="rules.birthday"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabled="true"
                            :disabledDate="disabledDate"
                            :placeholder="basedisabled?'':'请选择出生日期'" />
          </ta-form-item>
        </ta-col>

        <!-- <ta-col :span="6">
          <ta-form-item label="收养后姓名"
                        fieldDecoratorId="nickName"
                        :fieldDecoratorOptions="rules.nickName"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入收养后姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col> -->
        <ta-col :span="6"
                v-show="false">
          <ta-form-item label="国籍"
                        fieldDecoratorId="nationality"
                        :require="{message:'请选择国籍'}"
                        :initValue='this.Enum.NATIONALITY.ZG'
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       showSearch
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="民族"
                        :initValue='this.Enum.NATION.HZ'
                        fieldDecoratorId="nation"
                        :fieldDecoratorOptions="rules.nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择民族'"
                       showSearch
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        v-if="childtype==6"
                        fieldDecoratorId="identityCategory"
                        :fieldDecoratorOptions="rules.identityCategory"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in typesadopteestatusList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="身份类别"
                        v-if="childtype!=6"
                        fieldDecoratorId="identityCategory"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                       :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in adoptionlist"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <!-- <ta-col :span="6">
          <Health :disabled="basedisabled"
                  :heathmodel="heathmodel"
                  @setheath="setheath"
                  :labelwidth="labelwidth"></Health>
        </ta-col> -->
      </ta-col>
      <ta-col :span="12">
        <ta-col :span="6"
                v-if="childtype==6||childtype==4">
          <ta-form-item label="职业"
                        fieldDecoratorId="career"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择职业'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in occupattioList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-if="childtype==6||childtype==4">
          <ta-form-item label="婚姻状况"
                        fieldDecoratorId="maritalStatus"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue='this.Enum.MARRIAGE.WH'>
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in marriageyList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6" v-if="childtype==6||childtype==4">
          <ta-form-item label="工作单位"
                        fieldDecoratorId="workplace"
                        :fieldDecoratorOptions="rules.workplace"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6" v-if="childtype==1||childtype==2">
          <ta-form-item key="1"
                        label="入院时间"
                        fieldDecoratorId="enterDate"
                        :fieldDecoratorOptions="rules.enterDate"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabledDate="disabledDate"
                            :placeholder="basedisabled?'':'请选择入院时间'"
                            :disabled="isDisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-if="childtype==1||childtype==8">
          <ta-form-item label="寻亲公告登报报刊"
                        fieldDecoratorId="publishPeriodical"
                        :fieldDecoratorOptions="rules.publishPeriodical"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入寻亲公告登报报刊'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-if="childtype==8||childtype==1">
          <ta-form-item key="2"
                        label="登报时间"
                        fieldDecoratorId="publishDate"
                        :fieldDecoratorOptions="rules.publishDate"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabled="basedisabled"
                            :disabledDate="disabledDate"
                            :placeholder="basedisabled?'':'请选择登报时间'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-if="childtype==1||childtype==8">
          <ta-form-item label="捡拾时间"
                        fieldDecoratorId="pickupDate"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabled="isDisabled"
                            :disabledDate="disabledDate"
                            :placeholder="basedisabled?'':'请选择捡拾时间'" />
          </ta-form-item>
        </ta-col>

      </ta-col>
      <ta-col hidden :span="24">
        <ta-col :span="12">
          <ta-form-item class="radios"
                        label="患艾滋病情况"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        fieldDecoratorId="aidsSituation"
                      >
                        <!-- :fieldDecoratorOptions="this.verificationRules('患艾滋病情况', true)" -->
            <ta-radio-group @change="radiochange"
                            style="width:100%"
                            :disabled="basedisabled">
              <ta-radio v-for="(item,index) in adisConditionList"
                        :key="index"
                        :value="item.value">{{item.label}}</ta-radio>
              <ta-input v-if="false"
                        :placeholder="!isDisabled?'请输入原因':''"
                        ref="adisConditionOther"
                        style='width:300px;'
                        :disabled="false" />
            </ta-radio-group>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12"
                v-if="radiovalue==Enum.ADISCONDITION.QT">
          <ta-form-item label=""
                        fieldDecoratorId="aidsSituationOther"
                        :labelCol="{span:0}"
                        :wrapperCol="{span:24}">
            <ta-input :placeholder="!isDisabled?'请输入原因':''"
                      ref="adisConditionOther"
                      style='width:300px;'
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24"
              v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">
        <ta-form-item label='确认艾滋病感染时间'
                      fieldDecoratorId="infectionDate"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      :require="true">
          <ta-date-picker style="width: 20%;"
                          :disabledDate="disabledDate"
                          :placeholder="!disabled?'请选择确认艾滋病感染时间':''"
                          :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">
        <ta-col :span="12">
          <ta-form-item label='最有可能感染艾滋病途径'
                        fieldDecoratorId="probablyInfectedWay"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}"
                        :require="true">
            <ta-radio-group @change="channel"
                            style="width:100%"
                            :disabled="basedisabled">
              <ta-radio v-for="(item,index) in transmissionWayList"
                        :key="index"
                        :value="item.value">{{item.label}}</ta-radio>
              <ta-input v-if="false"
                        :placeholder="!basedisabled?'请输入其他途径':''"
                        ref="transmissionWayOther"
                        style='width:300px;'
                        :disabled="basedisabled" />
            </ta-radio-group>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12"
                v-if="radiovalues==Enum.TRANSMISSIONWAYOTHER.QT">
          <ta-form-item label=''
                        fieldDecoratorId="probablyInfectedWayOther"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{span:24}">
            <ta-input :placeholder="!basedisabled?'请输入其他途径':''"
                      ref="transmissionWayOther"
                      style='width:300px;'
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="12">
          <AddressComponent msg="户籍地或现住址"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"
                            :disabled="basedisabled"></AddressComponent>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label
                        :fieldDecoratorOptions="rules.censusRegisterDetail"
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="年满八周岁被收养人对收养登记的意见"
                      v-if="istenyear"
                      :labelCol="{ span: 5 }"
                      :wrapperCol="{ span: 19 }"
                      fieldDecoratorId="tenOpinion"
                      :fieldDecoratorOptions="rules.tenOpinion">
          <ta-textarea :placeholder="basedisabled?'':'请输入年满八周岁被收养人对收养登记的意见'"
                       :disabled="basedisabled"
                       :rows="4" />
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
  props: {
    id: {
      type: String
    },
    adisConditionList: {
      type: Array
    },
    transmissionWayList: {
      type: Array
    },
    addressmodel: {
      type: Array,
      required: true
    },
    heathmodel: {
      type: Array,
      required: true
    },
    childtype: {
      type: String,
      required: true
    },
    sexList: {
      type: Array,
      required: true
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
    adoptionlist: {
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
    typesadopteestatusList: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    },
    istenyear: {
      type: Boolean
    }
  },
  components: {
    AddressComponent,
    Health
  },
  data () {
    return {
      disabled: false,
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        birthday: this.verificationRules('出生日期', true), // { rules: [{ required: true, message: '请选择出生日期' }] },
        nation: this.verificationRules('民族'), // { rules: [{ required: true, message: '请选择民族' }] },
        publishPeriodical: this.verificationRules('寻亲公告登报报刊', 50),
        name: this.verificationRules('姓名', 24),
        censusRegisterDetail: this.verificationRules(
          '详细地址',
          100,
          false
        ),
        career: this.verificationRules('职业'),
        enterDate: this.verificationRules('入院时间', true),
        // enterDate: {
        //   validateTrigger: 'change',
        //   rules: [
        //     { required: true, message: '请选择入院时间' }
        //   ]
        // },
        maritalStatus: this.verificationRules('婚姻状况'),
        sex: this.verificationRules('性别'),
        nationality: this.verificationRules('国籍'),
        healthCondition: this.verificationRules('健康状况'),
        pickupDate: this.verificationRules('捡拾时间', true),
        identityCategory: this.verificationRules('身份类别'),
        publishDate: this.verificationRules('登报时间', true),
        workplace: this.verificationRulesNotMustFill('工作单位', 50),
        nickName: this.verificationRulesNotMustFill('收养后姓名', 50),
        tenOpinion: this.verificationRules(
          '年满八周岁被收养人对收养登记的意见',
          200, true
        )
      },
      isDisabled: false,
      addressdetailval2: '',
      cityval2: []
    }
  },
  mounted () {
  },
  methods: {
    disabledDate (current) {
      const startDates = moment(new Date())
      return current && current > startDates
    },
    // 患艾滋病情况
    radiochange (val) {
      const newval = val.target.value
      this.radiovalue = newval + ''
      if (newval != this.Enum.ADISCONDITION.XDHGRAZB) {
        this.radiovalues = ''
      }
      this.$emit('changehei')
      this.$emit('resizeForm')
    },
    loadRadiovalue (val, ps) {
      this.radiovalue = val + ''
      if (ps) {
        this.radiovalues = ps + ''
      }
    },
    // 最有可能感染艾滋病途径
    channel (val) {
      this.radiovalues = val.target.value + ''
      this.$emit('changehei')
      this.$emit('resizeForm', true)
    },
    setaddress () {
      this.$emit('setaddress')
    },
    setheath () {
      this.$emit('setheath')
    },
    async idcardblur (value) {
      const data = await this.idcardrule(value.target.value)
      if (data.errors) {
        this.$message.error(data.errors[0].msg)
      } else {
        this.$emit('setFrom', data.data.data, value)
      }
    },
    async idcardrole (rule, value, callback) {
      const _IDRe18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      const _IDre15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
      // 校验身份证：
      if (!value || value == '') {
        callback()
        return false
      }
      if (_IDRe18.test(value) || _IDre15.test(value)) {
        // let data = await this.idcardrule(value)
        const data = {
          errors: null,
          data: {
            data: { cellStyleMap: {} }
          }
        }
        if (data.errors) {
          callback(data.errors[0].msg)
          this.$emit('setFrom', data.data, value)
        } else {
          // this.getage(value)
          if (data.data.data.name) {
            // this.isDisabled = true
            if (data.data.data.inputEnabled == 1) {
              this.isDisabled = false
            } else {
              this.isDisabled = true
            }
          } else {
            this.isDisabled = false
          }
          this.$emit('setFrom', data.data.data, value)
          // if (this.childtype > 2) {
          //   this.isDisabled = false
          // }
          callback()
        }
      } else {
        callback('请输入正确的身份证格式')
      }
    },
    // 身份證验证
    async idcardrule (val) {
      const data = await this.postRules('adoption/checkChildBaseInfo', {
        idCard: val,
        adoptionCategory: this.childtype,
        bizKey: this.id
      })
      return data
    },
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      return current && current > moment().endOf('day')
    }
  }
}
</script>
<style scoped lang="less">
</style>
