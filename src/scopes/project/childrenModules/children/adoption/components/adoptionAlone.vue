<template>
  <div>
    <ta-row>
      <ta-col :span="6">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="(isrequire && isshyang)?rules.name2:rules.name"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="basedisabled?'':'请输入姓名'"
                    @change="changeName"
                    :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="是否死亡"
                      fieldDecoratorId="isDeath"
                      v-if="isshow1 && isshyang"
                      :fieldDecoratorOptions="(isrequire && isshyang)?rules.isDeath2:rules.isDeath"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-select :placeholder="'请选择是否死亡'"
                     @change="changeDeath"
                     :disabled="basedisabled">
            <ta-select-option :value="'1'">是</ta-select-option>
            <ta-select-option :value="'0'">否</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :initValue='this.Enum.NATION.HZ'>
          <ta-select :placeholder="basedisabled?'':'请选择民族'"
                     @change="changeNation"
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
                     @change="changeProfession"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              :title='item.label.length>9?item.label:null'
                              v-for="(item,index) in occupattioList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">

        <ta-form-item label="身份类别"
                      fieldDecoratorId="identityCategory"
                      :fieldDecoratorOptions="(isrequire && isshyang)?rules.identityCategory2:rules.identityCategory"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :initValue="this.isCounty?this.Enum.IDENTITCATEGORY.NDJM:''">
          <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                     @change="changeIdentityCategory"
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
                      :fieldDecoratorOptions="(isrequire && isshyang)?rules.birthday2:rules.birthday">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          @change="changeBirthday"
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
                    @change="changeWorkUnit"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="6">

        <ta-form-item label="证件类型"
                      fieldDecoratorId="memberIdType"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="(isrequire && isshyang)?rules.memberIdType2:rules.memberIdType"
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
                      :fieldDecoratorOptions="additionalYesOrNo=='1' || (isrequire && isshyang)?this.selectNotMust():rules.maritalStatus"
                      :initValue='this.Enum.MARRIAGE.WH'>
          <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                     @change="changeMaritalStatus"
                     :disabled="basedisabled || isshow">
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
                     @change="changeEducationLevel"
                     :disabled="basedisabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in cultureList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>
      <ta-col :span="6">

        <ta-form-item label="证件号码"
                      fieldDecoratorId="idCard"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="(isrequire && isshyang)?rules.idCard3:formdata == '01'?rules.idCard:rules.idCard2">
          <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                    :disabled="basedisabled"
                    @change="changeIdCard"
                    @blur="idcardBuler" />
        </ta-form-item>
        <ta-form-item label="手机号码"
                      fieldDecoratorId="contactNumber"
                      :fieldDecoratorOptions="additionalYesOrNo=='1' || (isrequire && isshyang)?rules.contactNumber2:rules.contactNumber"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="basedisabled?'':'请输入手机号码'"
                    @change="changeContactNumber"
                    :disabled="basedisabled" />
        </ta-form-item>
        <Health :labelwidth="labelwidth"
                :disabled="basedisabled"
                :heathmodel="heathmodel"
                @healthchange="healthchange"
                :isRequire='additionalYesOrNo!="1" && !(isrequire && isshyang)'
                @setheath="setheath"></Health>

      </ta-col>
      <ta-col :span="24">
        <ta-col :span="9">
          <AddressComponent msg="地址"
                            class="area"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"
                            arealevel="4"
                            @adsvalchange="adsvalchange"
                            :isRequire="!(isrequire && isshyang)"
                            :disabled="basedisabled"></AddressComponent>
        </ta-col>
        <ta-col :span="9">
          <ta-form-item label
                        :fieldDecoratorOptions="(isrequire && isshyang)?rules.censusRegisterDetail2:rules.censusRegisterDetail"
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                      @change="changeCensusRegisterDetail"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="家庭年收入(元)"
                        fieldDecoratorId="familyIncome"
                        :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?rules.familyIncomeNo:rules.familyIncome"
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
                      :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?this.selectNotMust():this.verificationRules('与被收养人关系')">
          <ta-select :placeholder="basedisabled?'':'请选择与被收养人关系'"
                     @change="changeRelationShip"
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
                      :fieldDecoratorOptions="additionalYesOrNo=='1'||(isrequire && isshyang)?this.verificationRulesNotMustFill('送养人意见',200,false):rules.opinion">
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
    isshow: {
      type: Boolean,
      default: false
    },
    isshow1: {
      type: Boolean,
      default: false
    },
    isshyang: {
      type: Boolean,
      default: false
    },
    isrequire: {
      type: Boolean,
      default: false
    },
    additionalYesOrNo: { // 1---->补录
      type: String
    },
    formdata: {
      type: String,
      default: ''
    },
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
        contactNumber: {
          validateTrigger: ['change', 'blur'],
          rules: [
            { required: true, message: '请输入正确手机号' },
            { validator: this.phonerole }
          ]
        },
        contactNumber2: {
          validateTrigger: ['change', 'blur'],
          rules: [
            { required: false, message: '请输入正确手机号' },
            { validator: this.phonerole }
          ]
        },
        familyIncome: this.verificationRules('家庭年收入(元)', '0'),
        // idCard: this.idCardValidate('证件号码'),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        familyIncomeNo: {
          rules: [
            { required: false, message: '请输入家庭年收入(元)' }
          ]
        },
        idCard2: this.verificationRules('证件号码', 18),
        idCard3: this.verificationRulesNotMustFill('证件号码', 18),
        maritalStatus: this.verificationRules('婚姻状况'),
        educationLevel: this.verificationRules('文化程度'),
        isDeath: this.verificationRules('是否死亡'),
        isDeath2: this.verificationRulesNotMustFill('是否死亡'),
        profession: this.verificationRules('职业'),
        nation: this.verificationRules('民族'),
        memberIdType: this.verificationRules('证件类型'),
        memberIdType2: this.verificationRulesNotMustFill('证件类型'),
        identityCategory: this.verificationRules('身份类别'),
        identityCategory2: this.verificationRulesNotMustFill('身份类别'),
        nationality: this.verificationRules('国籍'),
        birthday: this.verificationRules('出生日期', true),
        birthday2: this.verificationRulesNotMustFill('出生日期'),
        name: this.verificationRules('姓名', 72),
        name2: this.verificationRulesNotMustFill('姓名', 72),
        workUnit: this.verificationRulesNotMustFill('工作单位', 50),
        healthCondition: this.verificationRules('健康状况'),
        censusRegisterDetail: this.verificationRules('详细地址', 100),
        censusRegisterDetail2: this.verificationRulesNotMustFill('详细地址', 100),
        opinion: this.verificationRules('送养人意见', 200, false)
      },
      IdCardTypeValue: '01'
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('25%', '75%', 'area') // 单独一行字段宽度控制
  },
  mounted () {
    this.IdCardTypeValue = this.formdata
  },
  methods: {
    changeRelationShip (e) {
      this.$emit('changeRelationShip', e)
    },
    changeName (e) {
      this.$emit('changeMan', e.target.value, 'name')
    },
    changeNation (e) {
      this.$emit('changeMan', e, 'nation')
    },
    changeProfession (e) {
      this.$emit('changeMan', e, 'profession')
    },
    changeIdentityCategory (e) {
      this.$emit('changeMan', e, 'identityCategory')
    },
    changeBirthday (e) {
      this.$emit('changeMan', e, 'birthday')
    },
    changeWorkUnit (e) {
      this.$emit('changeMan', e.target.value, 'workUnit')
    },
    changeMaritalStatus (e) {
      this.$emit('changeMan', e, 'maritalStatus')
    },
    changeEducationLevel (e) {
      this.$emit('changeMan', e, 'educationLevel')
    },
    changeIdCard (e) {
      this.$emit('changeMan', e.target.value, 'idCard')
    },
    changeContactNumber (e) {
      this.$emit('changeMan', e.target.value, 'contactNumber')
    },
    changeCensusRegisterDetail (e) {
      this.$emit('changeMan', e.target.value, 'censusRegisterDetail')
    },
    healthchange (e) {
      this.$emit('changeMan', e, 'health')
    },
    adsvalchange (e) {
      this.$emit('changeMan', e, 'address')
    },
    idcardBuler (re) {
      re.target.value = re.target.value.replace(/\s+/g, '')
    },
    changeIdCardTypeValue (v) {
      this.IdCardTypeValue = v
      this.$emit('changeMan', v, 'memberIdType')
      this.$emit('setIdCard')
    },
    // 禁用时间,不能选择比当前时间小的日期
    disabledDate (current) {
      return current && current > (moment().endOf('day'))
    },
    idcardrole (rule, value, callback) {
      if (this.IdCardTypeValue == '01') {
        this.idCardValidate(rule, value, callback, this)
      }
    },
    phonerole (rule, value, callback) {
      if (!value || value == '') {
        callback()
      } else {
        if (value.length > 10 && value.length < 15) {
          callback()
        } else {
          callback('请输入正确的手机号码')
        }
      }
    },
    callbackByIdCard (sex, age, birth) {
      const obj = {
        sex,
        age,
        birth
      }
      this.$emit('setdate', obj)
    },
    setheath () {
      this.$emit('setheath')
    },
    changeDeath (val) {
      this.$emit('changeDeath', val)
    },
    setaddress () {
      this.$emit('setaddress')
    }
  }
}
</script>
<style scoped lang="less">
</style>
