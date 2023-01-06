<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="24">
        <ta-col :span="6">
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions=" {validateTrigger: 'blur',rules: [{ required: false, message: '请输入身份证号' },{validator:idCardValid}]}">
            <ta-input :placeholder="basedisabled?'':'请输入身份证号'"
                      :disabled=" basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:9}"
                        :fieldDecoratorOptions="verificationRules('姓名',72)"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="this.id?'':'请输入姓名'"
                      :disabled="basedisabled" />

          </ta-form-item>
        </ta-col>

        <ta-col :span="6">
          <ta-form-item label="性别"
                        fieldDecoratorId="sex"
                        :fieldDecoratorOptions="rules.sex"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder=" '请选择性别'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="民族"
                        :initValue='this.Enum.NATION.HZ'
                        fieldDecoratorId="nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="(welfare?true:(!isAdoptAdd?true:basedisabled))?'':'请选择民族'"
                       showSearch
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="6">
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

        <ta-col :span="6">
          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :fieldDecoratorOptions="rules.birthday"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            @change="birthdayChange"
                            :disabled=" basedisabled"
                            :disabledDate="disabledDate"
                            :placeholder=" '请选择出生日期'" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="6"
                v-if="!adoptive">
          <ta-form-item label="收养后姓名"
                        fieldDecoratorId="nickName"
                        :fieldDecoratorOptions="rules.nickName"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入收养后姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="身份类别"
                        fieldDecoratorId="identityCategory"
                        :fieldDecoratorOptions="rules.identityCategory"
                        :initValue='"1"'
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder=" '请选择身份类别'"
                       :disabled="childtype==6?basedisabled:true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in (childtype==6?typesadopteestatusList:adoptionlist)"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-if="adoptive">
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
        <ta-col :span="0"
                v-if="adoptive">
          <ta-form-item label="国籍"
                        fieldDecoratorId="nationality"
                        :initValue='this.Enum.NATIONALITY.ZG'
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       showSearch>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <!-- <ta-col :span="6">
          <ta-form-item label="民族"
                        :initValue='this.Enum.NATION.HZ'
                        fieldDecoratorId="nation"
                        :fieldDecoratorOptions="rules.nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="(welfare?true:(!isAdoptAdd?true:basedisabled))?'':'请选择民族'"
                       showSearch
                       :disabled="welfare?true:(!isAdoptAdd?true:basedisabled)">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="身份类别"
                        fieldDecoratorId="identityCategory"
                        :fieldDecoratorOptions="rules.identityCategory"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="(childtype==6?basedisabled:true)?'':'请选择身份类别'"
                       :disabled="childtype==6?basedisabled:true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in (childtype==6?typesadopteestatusList:adoptionlist)"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col> -->
        <ta-col :span="6"
                v-if="(childtype==6||childtype==4)||adoptive">
          <ta-form-item label="职业"
                        fieldDecoratorId="career"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择职业'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                :title='item.label.length>9?item.label:null'
                                v-for="(item,index) in occupattioList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-if="(childtype==6||childtype==4)&&!adoptive">
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
        <ta-col :span="6"
                v-if="(childtype==6||childtype==4)||adoptive">
          <ta-form-item label="工作单位"
                        fieldDecoratorId="workplace"
                        :fieldDecoratorOptions="rules.workplace"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="6"
                v-if="(childtype==1||childtype==8)&&!adoptive">
          <ta-form-item label="捡拾时间"
                        fieldDecoratorId="pickupDate"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <!-- :disabled="basedisabled" -->
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabled="basedisabled"
                            :disabledDate="disabledDate"
                            :placeholder=" '请选择捡拾时间'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12"
                v-if="childtype==8||childtype==1">

          <ta-col :span="12"
                  v-if="!adoptive">
            <ta-form-item key="2"
                          label="登报时间"
                          fieldDecoratorId="publishDate"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="basedisabled"
                              :disabledDate="disabledDate"
                              :placeholder="basedisabled?'':'请选择登报时间'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="!adoptive">
            <ta-form-item label="寻亲公告登报报刊"
                          fieldDecoratorId="publishPeriodical"
                          :fieldDecoratorOptions="rules.publishPeriodical"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input :placeholder="basedisabled?'':'请输入报刊'"
                        :disabled="basedisabled" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="6"
                v-if="(childtype==1||childtype==2)&&!adoptive">
          <ta-form-item key="1"
                        label="入院时间"
                        fieldDecoratorId="enterDate"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabledDate="disabledDate"
                            :placeholder=" '请选择入院时间'"
                            :disabled=" basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="12">
          <!-- !welfare -->
          <AddressComponent msg="户籍地或现住址"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"
                            arealevel="4"
                            :isRequire="true"
                            :disabled=" basedisabled "></AddressComponent>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label
                        :fieldDecoratorOptions="rules.censusRegisterDetail"
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input :placeholder=" '请输入详细地址'"
                      :disabled=" basedisabled " />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item :label="beforeYear?'年满十周岁被收养人对收养登记的意见':'年满八周岁被收养人对收养登记的意见'"
                      v-if="istenyear || isshowOpiton"
                      :labelCol="{ span: 5 }"
                      :wrapperCol="{ span: 19 }"
                      fieldDecoratorId="opinion"
                      :fieldDecoratorOptions="rules.opinion">
          <ta-textarea :placeholder="basedisabled?'':'请输入年满八周岁被收养人对收养登记的意见'"
                       :disabled="basedisabled"
                       :rows="4" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="健康状况"
                      fieldDecoratorId="healthCondition"
                      :labelCol="{ span: 2 }"
                      :wrapperCol="{ span: 22 }"
                      :fieldDecoratorOptions="rules.healthStatus">
          <ta-radio-group @change="onChange"
                          :disabled="basedisabled">
            <ta-radio :value="item.value"
                      v-for="(item,index) in heathlist"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                      label="其他"
                      fieldDecoratorId="healthOther"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      :fieldDecoratorOptions="rules.healthStatusOther">
          <ta-input :disabled="basedisabled"
                    placeholder="请输入其他情况" />
        </ta-form-item>
        <div class="canji"
             v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
          <ta-form-item label="残疾类型"
                        fieldDecoratorId="healthSecondLevel"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 22 }"
                        :initValue="[]"
                        :require="{message:'请选择残疾类型'}">
            <ta-checkbox-group :options="disabiliytypelist"
                               @change="setMulti"
                               :disabled="basedisabled"
                               :values="disabilityTypeValues" />
          </ta-form-item>
          <ta-form-item label="残疾等级"
                        fieldDecoratorId="disabilityLevel"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 22 }">
            <ta-radio-group :disabled="basedisabled">
              <ta-radio :value="item.value"
                        v-for="(item,index) in canjileave"
                        :key="index">{{item.label}}</ta-radio>
            </ta-radio-group>
            <ta-radio-group style="float:left;"></ta-radio-group>
          </ta-form-item>
        </div>
        <!--重病-->
        <div class="canji"
             v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
          <ta-form-item label="重病"
                        fieldDecoratorId="healthSecondLevel"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 22 }"
                        :initValue="[]"
                        :require="{message:'请选择重病!'}">
            <ta-checkbox-group :options="disabiliytypelist"
                               :disabled="basedisabled"
                               @change="seriousillnesschange" />
          </ta-form-item>
          <ta-form-item v-if="serioushval"
                        label="其他"
                        fieldDecoratorId="healthSecondLevelOther"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 9 }"
                        :fieldDecoratorOptions="rules.healthStatusOther">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入其他情况" />
          </ta-form-item>
        </div>
        <!--慢性病-->
        <div class="canji"
             v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
          <ta-form-item label="慢性病"
                        fieldDecoratorId="healthSecondLevel"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 22 }"
                        :initValue="[]"
                        :require="{message:'请选择慢性病!'}">
            <ta-checkbox-group :options="disabiliytypelist"
                               :disabled="basedisabled"
                               @change="seriousillnesschange" />
          </ta-form-item>
          <ta-form-item v-if="serioushval"
                        label="其他"
                        fieldDecoratorId="healthSecondLevelOther"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 9 }"
                        :fieldDecoratorOptions="rules.healthStatusOther">
            <ta-input :disabled="basedisabled"
                      placeholder="请输入其他情况" />
          </ta-form-item>
        </div>
      </ta-col>

    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  name: 'applicant',
  props: {
    additionalYesOrNo: { type: String, required: false },
    adoptive: {
      type: Boolean,
      default: false
    },
    isshowOpiton: {
      type: Boolean,
      required: false
    },
    beforeYear: {
      type: Boolean,
      required: false
    },
    isAdoptAdd: {
      type: Boolean,
      required: false
    },
    mechanismList: {
      type: Array,
      required: false
    },
    id: {
      type: String
    },
    isSix: {
      type: String
    },
    heathval: {
      type: String
    },
    heathlist: {
      type: Array,
      required: true
    },
    disabiliytypelist: {
      type: Array,
      required: true
    },
    canjileave: {
      type: Array,
      required: true
    },
    addressmodel: {
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
    },
    serioushval: {
      type: Boolean
    }
  },
  components: {
    AddressComponent
  },
  data () {
    return {
      fetching: false,
      data: [],
      valueT: undefined,

      welfare: this.childtype == '1' || this.childtype == '2',
      nowelfare: this.childtype != '1' && this.childtype != '2',
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      rules: {
        healthStatus: this.verificationRulesNotMustFill('健康状况', true),
        healthStatusOther: this.verificationRules('其他情况', 50),
        birthday: this.verificationRules('出生日期', true),
        nation: this.verificationRules('民族'),
        publishPeriodical: this.verificationRulesNotMustFill('寻亲公告登报报刊', 50),
        name: this.verificationRules('姓名', 72),
        censusRegisterDetail: this.verificationRules(
          '详细地址',
          100
        ),
        career: this.verificationRules('职业'),
        enterDate: this.verificationRulesNotMustFill('入院时间', true),
        maritalStatus: this.verificationRules('婚姻状况'),
        sex: this.verificationRules('性别'),
        nationality: this.verificationRules('国籍'),
        healthCondition: this.verificationRules('健康状况'),
        pickupDate: this.verificationRules('捡拾时间', true),
        identityCategory: this.verificationRules('身份类别'),
        publishDate: this.verificationRulesNotMustFill('登报时间', true),
        workplace: this.verificationRulesNotMustFill('工作单位', 50),
        nickName: this.verificationRulesNotMustFill('收养后姓名', 72),
        opinion: this.verificationRulesNotMustFill(
          '年满八周岁被收养人对收养登记的意见',
          200, false
        )
      },
      disabilityTypeValues: [],
      childrenNameList: []
    }
  },
  watch: {
    childtype (val) {
      this.nowelfare = this.childtype != '1' && this.childtype != '2'
      this.welfare = this.childtype == '1' || this.childtype == '2'
    }
  },
  activated () {
    this.disabilityTypeValues = []
    this.childrenNameList = []
  },
  mounted () {
  },
  methods: {
    // 出生日期change
    birthdayChange (e) {
      if (e) {
        var r = moment(e).format('YYYY-MM-DD').match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        if (r == null) return false
        var d = new Date(r[1], r[3] - 1, r[4])
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
          var Y = new Date().getFullYear()
          this.$emit('update:istenyear', (Y - r[1]) >= 8)
          this.$emit('setHeiOne')
        }
      }
    },
    clearList () {

    },
    async handleSearch (value) {
      this.fetching = true
      const data = await this.post('welfareOrgManagement/queryListByOrgId', { orgName: value })
      this.$emit('update:mechanismList', data.data.data)
    },
    // 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
    handleChange2 (value) {
      this.valueT = value
    },
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
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
    // 姓名change事件
    handleChange (value, option) {
      if (value) {
        this.$emit('setDataByName', option.data.attrs.datas)
      }
    },
    // 机构名称change事件
    mechanismchange (val) {
      this.valueT = val
      if (val) {
        this.$emit('mechanismchange', val)// 赋值
        this.post('adoption/queryChildBaseInfoByOrgIdAndName', { orgId: val }).then((res) => {
          if (res.serviceSuccess) {
            this.childrenNameList = res.data.data
          }
        })
      }
    },
    setaddress () {
      this.$emit('setaddress')
    },
    onChange (e) {
      this.$emit('onChange', e)
    },
    seriousillnesschange (val) {
      this.$emit('seriousillnesschange', val)
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const _self = this
      this.idCardValidate(rule, value, callback, _self, null)
    },
    // 身份证号后台验证
    async validateIdCard (val) {
      let datas = null
      let childtypes = this.childtype
      if (this.additionalYesOrNo == '1') {
        if (this.childtype == '1') {
          childtypes = '101'
        }
        if (this.childtype == '2') {
          childtypes = '102'
        }
      }
      await this.post('adoption/checkChildBaseInfo', {
        idCard: val,
        adoptionCategory: childtypes,
        bizKey: this.id || ''
      }).then((res) => {
        if (!res.errors) {
          this.$emit('setFrom', res.data.data)
        } else {
          this.$emit('clearIdCard')
        }
        datas = res
      })
      return datas
    },
    // 身份证号回调
    callbackByIdCard (sex, age, birth, key, val) {
      this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
    },
    // 日期处理
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

  }
}
</script>
<style scoped lang="less" >
.canji {
  width: 90%;
  margin: 0 auto;
  padding: 10px 0 1px 0;
  box-sizing: border-box;
  background: rgba(230, 247, 255, 0.5);
}
</style>
