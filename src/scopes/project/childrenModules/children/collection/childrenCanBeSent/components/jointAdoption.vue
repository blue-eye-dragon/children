<template>
  <div>
    <ta-row class="fromintop">
      <ta-radio-group @change="ismanChange"
                      v-model="isman"
                      class="radio_grops"
                      :disabled="basedisabled">
        <ta-col :span="12"
                type="flex"
                justify="center"
                align="center">
          <ta-col :span="6"
                  :offset='10'>
            <!-- <img src="../../../../../../../static/img/man.png" /> -->
            <div class="texts">男方信息</div>
          </ta-col>
          <ta-col :span="4"
                  type="flex"
                  justify="center"
                  align="center">
            <ta-radio v-if="applytype||applytype==0"
                      value="1"
                      class="apply">主申请人</ta-radio>
          </ta-col>
        </ta-col>
        <ta-col :span="12"
                type="flex"
                justify="center"
                align="middle">
          <ta-col :span="6"
                  :offset='10'>
            <!-- <img src="../../../../../../../static/img/woman.png" /> -->
            <div class="texts">女方信息</div>
          </ta-col>
          <ta-col :span="4"
                  type="flex"
                  justify="center"
                  align="center">
            <ta-radio v-if="applytype||applytype==0"
                      value="0"
                      class="apply">主申请人</ta-radio>
          </ta-col>
        </ta-col>
      </ta-radio-group>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="11">
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
        <ta-col :span="12">
          <ta-form-item label="男方姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="rules.name"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入男方姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>

          <ta-form-item label="证件类型"
                        fieldDecoratorId="memberIdType"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :require="{message:'请选择证件类型'}"
                        :initValue='this.Enum.IDCARD_TYPE.NDJMSFZ'>
            <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                       :disabled="basedisabled"
                       @change="changeIdCardTypeValue1">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :require="{message:'请选择出生日期'}">
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

          <!-- <ta-form-item
          label="健康状况"
          fieldDecoratorId="healthCondition"
          :require="{message:'请选择健康状况!'}"
        >
          <ta-select placeholder="请选择健康状况" :disabled="basedisabled">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in healthList"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item> -->
          <Health :labelwidth="labelwidth"
                  :disabled="basedisabled"
                  :heathmodel="menheathmodel"
                  @setheath="mensetheath"></Health>

          <ta-form-item label="联系电话"
                        fieldDecoratorId="contactNumber"
                        :fieldDecoratorOptions="rules.contactNumber"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入联系电话'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        fieldDecoratorId="identityCategory"
                        :require="{message:'请选择身份类别'}"
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
          <ta-form-item label="证件号码"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="IdCardTypeValue1=='01'?rules.idCard:rules.idCard2">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      :disabled="basedisabled" />
          </ta-form-item>
          <ta-form-item label="民族"
                        fieldDecoratorId="nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :require="{message:'请选择民族'}"
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
          <ta-form-item label="婚姻状况"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="maritalStatus"
                        :initValue='this.Enum.MARRIAGE.YH'
                        :require="{message:'请选择婚姻状况'}">
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in marriageyList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="2">
      </ta-col>
      <ta-col :span="11">
        <ta-col :span="0">
          <ta-form-item label="国籍"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_nationality"
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
        <ta-col :span="12">
          <ta-form-item label="女方姓名"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_name"
                        :fieldDecoratorOptions="rules.name">
            <ta-input :placeholder="basedisabled?'':'请输入女方姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>

          <ta-form-item label="证件类型"
                        fieldDecoratorId="copy_memberIdType"
                        :require="{message:'请选择证件类型'}"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :initValue='this.Enum.IDCARD_TYPE.NDJMSFZ'>
            <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                       :disabled="basedisabled"
                       @change="changeIdCardTypeValue2">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="出生日期"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_birthday"
                        :require="{message:'请选择出生日期'}">
            <ta-date-picker style="width: 100%;"
                            format="YYYY-MM-DD"
                            :disabled="basedisabled"
                            :placeholder="basedisabled?'':'请选择出生日期'"
                            :disabledDate="disabledDate" />
          </ta-form-item>

          <ta-form-item label="工作单位"
                        fieldDecoratorId="copy_workUnit"
                        :fieldDecoratorOptions="rules.workUnit"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      :disabled="basedisabled" />
          </ta-form-item>

          <Health :labelwidth="labelwidth"
                  :disabled="basedisabled"
                  :fileldName="fileldHeathName"
                  :heathmodel="womenheathmodel"
                  @setheath="womensetheath"></Health>

          <ta-form-item label="联系电话"
                        fieldDecoratorId="copy_contactNumber"
                        :fieldDecoratorOptions="rules.contactNumber"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入联系电话'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        fieldDecoratorId="copy_identityCategory"
                        :require="{message:'请选择身份类别'}"
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
          <ta-form-item label="证件号码"
                        fieldDecoratorId="copy_idCard"
                        :fieldDecoratorOptions="IdCardTypeValue2=='01'?rules.copy_idCard:rules.idCard2"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      :disabled="basedisabled" />
          </ta-form-item>
          <ta-form-item label="民族"
                        fieldDecoratorId="copy_nation"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :require="{message:'请选择民族'}"
                        :initValue='this.Enum.NATION.HZ'>
            <ta-select :placeholder="basedisabled?'':'请选择民族'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="职业"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_profession">
            <ta-select :placeholder="basedisabled?'':'请选择职业'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in occupattioList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="文化程度"
                        fieldDecoratorId="copy_educationLevel"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择文化程度'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in cultureList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="婚姻状况"
                        fieldDecoratorId="copy_maritalStatus"
                        :require="{message:'请选择婚姻状况'}"
                        :initValue='this.Enum.MARRIAGE.YH'
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       :disabled="true">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in marriageyList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>
    </ta-row>

    <ta-row class="frominadd">
      <ta-col :span="11"
              key='1'>
        <AddressComponent msg="地址"
                          :addressmodel="menaddressmodel"
                          @setaddress="mensetaddress"
                          :disabled="basedisabled"
                          :labelwidth="labelwidth2"></AddressComponent>
        <ta-form-item label
                      :fieldDecoratorOptions="rules.censusRegisterDetail"
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 20 ,offset:4}">
          <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="2">
      </ta-col>
      <ta-col :span="11"
              v-show="issameaddress!=1"
              key='2'>
        <template v-if="issameaddress!=1">
          <AddressComponent msg="地址"
                            :fileldName="fileldName"
                            :addressmodel="womenaddressmodel"
                            @setaddress="womensetaddress"
                            :disabled="basedisabled"
                            :labelwidth="labelwidth2"></AddressComponent>
          <ta-form-item label
                        :fieldDecoratorOptions="rules.censusRegisterDetail"
                        fieldDecoratorId="copy_censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 20 ,offset:4}">
            <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </template>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="是否地址一致"
                      fieldDecoratorId='sameAddress'
                      :fieldDecoratorOptions="{initialValue: '0'}"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }">
          <ta-radio-group :options="sameaddress"
                          @change="radiochange"
                          :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="家庭年收入(元)"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      fieldDecoratorId="familyIncome"
                      :fieldDecoratorOptions="rules.familyIncome">
          <!-- <ta-input-number :min="0" :max="999999999" :precision="2" placeholder="请输入家庭年收入" style="width:100%" :disabled="basedisabled" /> -->
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
                       :disabled="basedisabled"
                       :rows="1" />
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
    menheathmodel: {
      type: Array,
      required: true
    },
    womenheathmodel: {
      type: Array,
      required: true
    },
    menaddressmodel: {
      type: Array,
      required: true
    },
    womenaddressmodel: {
      type: Array,
      required: true
    },
    applytype: {
      type: String,
      required: false
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
    issameaddress: {
      type: String,
      required: false
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
        contactNumber: this.verificationRules('电话号码', { type: 'phone' }),
        familyIncome: this.verificationRules('家庭年收入(元)', '0'),
        // idCard: this.idCardrules('证件号码'),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: this.verificationRules('证件号码', 18),
        copy_idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.copy_idcardrole }
          ]
        },
        name: this.verificationRules('姓名', 72),
        workUnit: this.verificationRulesNotMustFill('工作单位', 50),
        censusRegisterDetail: this.verificationRules('详细地址', 100),
        opinion: this.verificationRules('送养人意见', 100, true)
      },
      isDisabled: false,
      fileldName: 'copy_address_Linkage',
      fileldHeathName: 'copy_healthCondition',
      sameaddress: [],
      manchecked: true,
      womenchecked: false,
      isman: '1',
      IdCardTypeValue1: '01',
      IdCardTypeValue2: '01'
    }
  },
  mounted () {
    this.isman = this.applytype
    this.getyesno()
  },
  methods: {
    changeIdCardTypeValue1 (v) {
      this.IdCardTypeValue1 = v
      this.$emit('setIdCard', '1')
    },
    changeIdCardTypeValue2 (v) {
      this.IdCardTypeValue2 = v
      this.$emit('setIdCard', '2')
    },
    radiochange (val) {
      this.$emit('update:womenaddressmodel', [])
      // this.issameaddress = val.target.value
      this.$emit('update:issameaddress', val.target.value)
    },
    // YESNO
    async getyesno () {
      let data = await this.getDictionaries('YESNO')
      this.sameaddress = data
    },
    // 禁用时间,不能选择比当前时间小的日期
    disabledDate (current) {
      return current && current > (moment().endOf('day'))
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this, 'idCard')
    },
    copy_idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this, 'copy_idCard')
    },
    callbackByIdCard (sex, age, birth, key) {
      let obj = {
        sex,
        age,
        birth,
        key
      }
      console.info(obj)
      this.$emit('setmendate', obj)
    },
    ismanChange (e) {
      let val = e.target.value + ''
      this.$emit('update:applytype', val)
    },
    womensetheath () {
      this.$emit('womensetheath')
    },
    mensetheath () {
      this.$emit('mensetheath')
    },
    womensetaddress () {
      this.$emit('womensetaddress')
    },
    mensetaddress () {
      this.$emit('mensetaddress')
    }
  }
}
</script>
<style scoped lang="less">
.fromintop {
  margin: 20px 0 0 0;
  position: relative;
}
.equally {
  position: absolute;
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;
}
.fromin {
  width: calc(100% - 60px);
  margin-left: 60px;
  margin-top: 20px;
}
.frominadd {
  margin-top: 0;
}
/deep/ .radio_grops {
  width: 100%;
}
.apply {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 74px;
}
.texts {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}
</style>
