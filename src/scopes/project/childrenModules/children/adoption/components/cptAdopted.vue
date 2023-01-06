<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="24"
              v-if="welfare&&!this.id">
        <ta-col :span="12">
          <ta-form-item label="福利机构是否已录入被收养人信息"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{ span: 15 }">
            <ta-radio-group v-model="selectvalue"
                            :disabled='(this.id||basedisabled)?true:false'
                            @change="onChanges">
              <ta-radio :value="1">是</ta-radio>
              <ta-radio :value="0">否</ta-radio>
            </ta-radio-group>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="6"
                :hidden="!welfare"
                key="a">
          <ta-form-item label="福利机构名称"
                        v-if="welfare"
                        fieldDecoratorId="welfareInstitutionName"
                        :require="{message:'请输入福利机构名称'}"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{ span: 15 }">
            <ta-select showSearch
                       :disabled='(this.id||basedisabled)?true:false'
                       optionFilterProp="children"
                       :value="valueT"
                       placeholder="请输入福利机构名称"
                       :defaultActiveFirstOption="false"
                       :showArrow="false"
                       :filterOption="false"
                       :searchDelay="1"
                       @search="handleSearch"
                       @change="mechanismchange">
              <ta-select-option v-for="d in mechanismList"
                                :key="d.id"
                                :value='d.id'>{{d.orgName}}</ta-select-option>
            </ta-select>
          </ta-form-item>

        </ta-col>
        <ta-col :span="6"
                v-if="!welfare||(welfare&&selectvalue==0)">
          <!-- :hidden="welfare&&selectvalue==1" -->
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:9}"
                        :fieldDecoratorOptions="verificationRules('姓名',72)"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="this.id?'':'请输入姓名'"
                      :disabled="(basedisabled || adoptive)?true:false" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6"
                v-else>
          <!-- v-if="welfare&&selectvalue!=0" -->
          <!-- :hidden="!welfare||welfare&&selectvalue==0" -->
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:9}"
                        :require="{message:'请输入姓名'}"
                        :wrapperCol="{span:15}">
            <ta-select showSearch
                       :showArrow="false"
                       :placeholder="this.id?'':'请输入姓名'"
                       :disabled="(basedisabled || adoptive)?true:false"
                       @change="handleChange"
                       optionFilterProp="children"
                       :filterOption="filterOption">
              <ta-select-option v-for="(item,index) in childrenNameList"
                                :datas="item"
                                :key="index"
                                :value="item.name">{{item.name}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: false, message: '请输入身份证号' },{validator:idCardValid}]}">
            <ta-input :placeholder="basedisabled?'':'请输入身份证号'"
                      :disabled="basedisabled || adoptive" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="性别"
                        fieldDecoratorId="sex"
                        :fieldDecoratorOptions="rules.sex"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="(welfare&&selectvalue==1?true:(!isAdoptAdd?true:(basedisabled)))?'':'请选择性别'"
                       :disabled="welfare&&selectvalue==1?true:(!isAdoptAdd?true:basedisabled || adoptive)">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
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
                            :disabled="welfare&&selectvalue==1?true:(!isAdoptAdd?true:(basedisabled || adoptive))"
                            :disabledDate="disabledDate"
                            :placeholder="(welfare&&selectvalue==1?true:(!isAdoptAdd?true:basedisabled))?'':'请选择出生日期'" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="6"
                v-if="!isEvaluation&&!adoptive">
          <ta-form-item label="收养后姓名"
                        fieldDecoratorId="nickName"
                        :fieldDecoratorOptions="rules.nickName"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入收养后姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="0"
                v-if="adoptive">
          <ta-form-item label="国籍"
                        fieldDecoratorId="nationality"
                        :require="{message:'请选择国籍'}"
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

      </ta-col>
      <ta-col :span="24">
        <ta-col :span="6">
          <ta-form-item label="民族"
                        :initValue='this.Enum.NATION.HZ'
                        fieldDecoratorId="nation"
                        :fieldDecoratorOptions="rules.nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="(welfare&&selectvalue==1?true:(!isAdoptAdd?true:basedisabled))?'':'请选择民族'"
                       showSearch
                       :disabled="!isAdoptAdd?true:basedisabled">
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
        </ta-col>
        <ta-col :span="6"
                v-if="(childtype==6||childtype==4)||adoptive">
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
                            :disabled="!isAdoptAdd?true:basedisabled"
                            :disabledDate="disabledDate"
                            :placeholder="(welfare&&selectvalue==1?true:(!isAdoptAdd?true:basedisabled))?'':'请选择捡拾时间'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12"
                v-if="(childtype==8||childtype==1)&&!adoptive">
          <ta-col :span="12">
            <ta-form-item label="寻亲公告登报报刊"
                          fieldDecoratorId="publishPeriodical"
                          :fieldDecoratorOptions="this.id||selectvalue==0?this.selectNotMust():rules.publishPeriodical"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input :placeholder="basedisabled?'':'请输入寻亲公告登报报刊'"
                        :disabled="basedisabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="!adoptive">
            <ta-form-item key="2"
                          label="登报时间"
                          fieldDecoratorId="publishDate"
                          :fieldDecoratorOptions="this.id||selectvalue==0?this.selectNotMust():rules.publishDate"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="basedisabled"
                              :disabledDate="disabledDate"
                              :placeholder="basedisabled?'':'请选择登报时间'" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="6"
                v-if="(childtype==1||childtype==2)&&!adoptive">
          <ta-form-item key="1"
                        label="入院时间"
                        fieldDecoratorId="enterDate"
                        :fieldDecoratorOptions="this.id||selectvalue==0?this.selectNotMust():rules.enterDate"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabledDate="disabledDate"
                            :placeholder="(welfare&&selectvalue==1?true:(!isAdoptAdd?true:basedisabled))?'':'请选择入院时间'"
                            :disabled="!isAdoptAdd?true:basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="12">
          <AddressComponent msg="户籍地或现住址"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"
                            arealevel="4"
                            :isRequire="!welfare||welfare&&selectvalue==0"
                            :disabled="!isAdoptAdd?true:basedisabled"></AddressComponent>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label
                        :fieldDecoratorOptions="!welfare||welfare&&selectvalue==0?this.verificationRules('详细地址',100):this.verificationRulesNotMustFill('详细地址',100)"
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input :placeholder="(welfare&&selectvalue==1?true:(!isAdoptAdd?true:basedisabled))?'':'请输入详细地址'"
                      :disabled="!isAdoptAdd?true:basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item :label="beforeYear?'年满10周岁被收养人对收养登记的意见':'年满8周岁被收养人对收养登记的意见'"
                      v-if="istenyear || isshowOpiton"
                      :labelCol="{ span: 5 }"
                      :wrapperCol="{ span: 19 }"
                      fieldDecoratorId="opinion"
                      :fieldDecoratorOptions="rules.opinion">
          <ta-textarea :placeholder="basedisabled?'':'请输入年满八周岁被收养人对收养登记的意见'"
                       :disabled="(basedisabled || adoptive)?true:false"
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
    },
    adptFlag: {
      type: String
    },
    isEvaluation: { // 是否是评估业务办理列表的查看
      type: Boolean,
      required: false
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
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      rules: {
        healthStatus: this.verificationRules('健康状况'),
        healthStatusOther: this.verificationRules('其他情况', 50),
        birthday: this.verificationRules('出生日期', true),
        nation: this.verificationRules('民族'),
        publishPeriodical: this.verificationRules('寻亲公告登报报刊', 50),
        name: this.verificationRules('姓名', 50000000),
        career: this.verificationRules('职业'),
        enterDate: this.verificationRules('入院时间', true),
        maritalStatus: this.verificationRules('婚姻状况'),
        sex: this.verificationRules('性别'),
        nationality: this.verificationRules('国籍'),
        healthCondition: this.verificationRules('健康状况'),
        pickupDate: this.verificationRules('捡拾时间', true),
        identityCategory: this.verificationRules('身份类别'),
        publishDate: this.verificationRules('登报时间', true),
        workplace: this.verificationRulesNotMustFill('工作单位', 50),
        nickName: this.verificationRulesNotMustFill('收养后姓名', 72),
        opinion: this.verificationRules(
          '年满八周岁被收养人对收养登记的意见',
          200, false
        )
      },
      disabilityTypeValues: [],
      childrenNameList: [],
      selectvalue: 1 // 福利机构是否已采集（是1，否0）
    }
  },
  watch: {
    childtype (val) {
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
        const selectDate = r[1] + r[3] + r[4]
        const nowDate = moment().format('YYYY-MM-DD').split('-').join('')
        this.$emit('update:istenyear', (nowDate - selectDate) >= 80000)
        this.$emit('setHeiOne')
      }
    },
    async handleSearch (value) {
      this.fetching = true
      const data = await this.post('welfareOrgManagement/queryListByOrgId', { orgName: value.trim() })
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
    // 福利机构是否已采集change事件
    onChanges () {
      this.$emit('clearAdoptedFrom')
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
      this.$emit('mechanismchange', val)// 赋值
      if (val && this.selectvalue == 1) {
        // adptFlag不为空，排除该福利机构下已送样的和做过收养登记的儿童信息
        // if (this.adptFlag) {
        //   this.post('adoption/queryChildBaseInfoByOrgIdAndNameExt', { orgId: val, flag: this.adptFlag }).then((res) => {
        //     if (res.serviceSuccess) {
        //       this.childrenNameList = res.data.data
        //     }
        //   })
        // } else {
        this.post('adoption/queryChildBaseInfoByOrgIdAndName', { orgId: val }).then((res) => {
          if (res.serviceSuccess) {
            this.childrenNameList = res.data.data
          }
        })
        // }
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
      await this.post('adoption/checkChildBaseInfo', {
        idCard: val,
        adoptionCategory: this.childtype,
        bizKey: this.id || ''
      }).then((res) => {
        if (!res.errors) {
          if (Object.getOwnPropertyNames(res.data.data).length != 1 || !res.data.data.cellStyleMap) {
            this.$emit('setFrom', res.data.data)
          }
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
<style scoped lang="less">
.canji {
  width: 90%;
  margin: 0 auto;
  padding: 10px 0 1px 0;
  box-sizing: border-box;
  background: rgba(230, 247, 255, 0.5);
}
</style>
