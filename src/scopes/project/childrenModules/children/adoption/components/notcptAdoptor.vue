<template>
  <div class="fromcom">
    <ta-row class="fromin fromintop">
      <ta-col :span="12"
              type="flex"
              justify="center"
              align="middle">
        <img src="static/img/man.png"
             alt />
        <span class="fontClass">男方信息</span>
        <ta-checkbox-group @change="ismanChange"
                           v-model="isman"
                           class="radio_grops"
                           :disabled='basedisabled'>
          <ta-checkbox value="1">单亲</ta-checkbox>
        </ta-checkbox-group>
      </ta-col>
      <ta-col :span="12"
              type="flex"
              justify="center"
              align="middle">
        <img src="static/img/woman.png"
             alt />
        <span class="fontClass">女方信息</span>
        <ta-checkbox-group @change="iswomanChange"
                           v-model="iswoman"
                           class="radio_grops"
                           :disabled='basedisabled'>
          <ta-checkbox value="2">单亲</ta-checkbox>
        </ta-checkbox-group>

      </ta-col>
      <!-- <div class="equally">
        <ta-checkbox @change="chradio" v-model="isidentical">同男方住址</ta-checkbox>
      </div>-->
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="12">
        <ta-col :span="12">
          <ta-form-item label="男方姓名"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="this.manrequire ? this.verificationRules('姓名', 72) : this.verificationRulesNotMustFill('姓名', 72)">
            <ta-input :placeholder="basedisabled?'':'请输入男方姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="identityCategory"
                        :require="this.manrequire ?{message:'请选择身份类别'}:null">
            <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in identityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        label="证件类型"
                        fieldDecoratorId="memberIdType"
                        :require="this.manrequire ?{message:'请选择证件类型'}:null"
                        :initValue='this.Enum.IDCARD_TYPE.NDJMSFZ'>
            <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                       :disabled="basedisabled"
                       @change="changeIdCardTypeValue1">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="证件号码"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="idCard"
                        :fieldDecoratorOptions="IdCardTypeValue1=='01'?
                        {validateTrigger: 'blur',rules: [{ required: this.manrequire, message: '请输入身份证号' },{ validator: this.idcardrole }]}
                        :this.manrequire ?
                         this.verificationRules('证件号码', 18)
                         : this.verificationRulesNotMustFill('证件号码', 18)">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="出生日期"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="birthday"
                        :require="this.manrequire?{message:'请选择出生日期'}:null">
            <ta-date-picker style="width: 100%;"
                            :placeholder="basedisabled?'':'请选择出生日期'"
                            :disabledDate="disabledDate"
                            :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="民族"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="nation"
                        :initValue='this.Enum.NATION.HZ'>
            <ta-select :placeholder="basedisabled?'':'请选择民族'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="国籍"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="nationality"
                        :require="this.manrequire?{message:'请选择国籍'}:null"
                        :fieldDecoratorOptions="{initialValue: '001'}">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="职业"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="profession">
            <ta-select :placeholder="basedisabled?'':'请选择职业'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in occupattioList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="工作单位"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="workUnit"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('工作单位', 50)">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="文化程度"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="educationLevel">
            <ta-select :placeholder="basedisabled?'':'请选择文化程度'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in cultureList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
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
          </ta-form-item>-->
          <Health :disabled="basedisabled"
                  :isRequire="this.manrequire"
                  :labelwidth="labelwidth"
                  :heathmodel="parentmenheathmodel"
                  @setheath="parentmensetheath"></Health>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="婚姻状况"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="maritalStatus"
                        :require="this.manrequire?{message:'请选择婚姻状况'}:null"
                        :initValue='this.Enum.MARRIAGE.WH'>
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in marriageyList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="联系电话"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="contactNumber"
                        :fieldDecoratorOptions="this.manrequire ? this.verificationRules('电话号码', { type: 'phone' }) : this.verificationRulesNotMustFill('电话号码', { type: 'phone' })">
            <ta-input :placeholder="basedisabled?'':'请输入联系电话'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
      <ta-col :span="12">
        <ta-col :span="12">
          <ta-form-item label="女方姓名"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_name"
                        :fieldDecoratorOptions="this.womanrequire ? this.verificationRules('姓名', 72) : this.verificationRulesNotMustFill('姓名', 72)">
            <ta-input :placeholder="basedisabled?'':'请输入女方姓名'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="身份类别"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_identityCategory"
                        :require="this.womanrequire ?{message:'请选择身份类别'}:null">
            <ta-select :placeholder="basedisabled?'':'请选择身份类别'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in identityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="证件类型"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_memberIdType"
                        :require="this.womanrequire ?{message:'请选择证件类型'}:null"
                        :initValue='this.Enum.IDCARD_TYPE.NDJMSFZ'>
            <ta-select :placeholder="basedisabled?'':'请选择证件类型'"
                       :disabled="basedisabled"
                       @change="changeIdCardTypeValue2">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardTypeList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="证件号码"
                        fieldDecoratorId="copy_idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="IdCardTypeValue2=='01'
                          ? {validateTrigger: 'blur',rules: [{ required: this.womanrequire, message: '请输入身份证号' },{ validator: this.copy_idcardrole }]}
                          :this.womanrequire
                            ? this.verificationRules('证件号码', 18)
                            : this.verificationRulesNotMustFill('证件号码', 18)">
            <ta-input :placeholder="basedisabled?'':'请输入证件号码'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="出生日期"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_birthday"
                        :require="this.womanrequire ?{message:'请选择出生日期'}:null">
            <ta-date-picker style="width: 100%;"
                            :disabledDate="disabledDate"
                            :placeholder="basedisabled?'':'请选择出生日期'"
                            :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="民族"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_nation"
                        :initValue='this.Enum.NATION.HZ'>
            <ta-select :placeholder="basedisabled?'':'请选择民族'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="国籍"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_nationality"
                        :require="this.womanrequire ?{message:'请选择国籍'}:null"
                        :fieldDecoratorOptions="{initialValue: '001'}">
            <ta-select :placeholder="basedisabled?'':'请选择国籍'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in nationalityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
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
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="工作单位"
                        fieldDecoratorId="copy_workUnit"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('工作单位', 50)">
            <ta-input :placeholder="basedisabled?'':'请输入工作单位'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="文化程度"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_educationLevel">
            <ta-select :placeholder="basedisabled?'':'请选择文化程度'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in cultureList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <!-- <ta-form-item
          label="健康状况"
          fieldDecoratorId="copy_healthCondition"
          :require="{message:'请选择健康状况!'}"
        >
          <ta-select placeholder="请选择健康状况" :disabled="basedisabled">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in healthList"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
          </ta-form-item>-->
          <Health :disabled="basedisabled"
                  :isRequire="womanrequire"
                  :fileldName="fileldHeathName"
                  :labelwidth="labelwidth"
                  :heathmodel="parentwomenheathmodel"
                  @setheath="parentwomensetheath"></Health>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="婚姻状况"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_maritalStatus"
                        :require="this.womanrequire ?{message:'请选择婚姻状况'}:null"
                        :initValue='this.Enum.MARRIAGE.WH'>
            <ta-select :placeholder="basedisabled?'':'请选择婚姻状况'"
                       :disabled="basedisabled">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in marriageyList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="联系电话"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="copy_contactNumber"
                        :fieldDecoratorOptions=" this.womanrequire ? this.verificationRules('电话号码', { type: 'phone' }) : this.verificationRulesNotMustFill('电话号码', { type: 'phone' })">
            <ta-input :placeholder="basedisabled?'':'请输入联系电话'"
                      :disabled="basedisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="12"
              key="1">
        <AddressComponent msg="地址"
                          :isRequire="manrequire"
                          :addressmodel="parentmenmodel"
                          @setaddress="parentmensetaddress"
                          :disabled="basedisabled"
                          :labelwidth="labelwidth2"></AddressComponent>
        <ta-form-item label
                      :fieldDecoratorOptions=" this.manrequire ? this.verificationRules('详细地址', 72) : this.verificationRulesNotMustFill('详细地址', 72)"
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 20 ,offset:4}">
          <ta-input :placeholder="basedisabled?'':'请输入详细地址'"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12"
              v-show="issameaddress!=1"
              key="2">
        <template v-if="issameaddress!=1">
          <AddressComponent msg="地址"
                            :isRequire="womanrequire"
                            :addressmodel="parentwomenmodel"
                            @setaddress="parentwomensetaddress"
                            :fileldName="fileldName"
                            :disabled="basedisabled"
                            :labelwidth="labelwidth2"></AddressComponent>
          <ta-form-item label
                        :fieldDecoratorOptions="this.womanrequire ? this.verificationRules('详细地址', 72) : this.verificationRulesNotMustFill('详细地址', 72)"
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
                      fieldDecoratorId="sameAddress"
                      :fieldDecoratorOptions="{initialValue: '0'}"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9}">
          <ta-radio-group :options="sameaddress"
                          @change="radiochange"
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
    // ishide: {
    //   type: Boolean
    // },
    parentwomenheathmodel: {
      type: Array,
      required: true
    },
    parentmenheathmodel: {
      type: Array,
      required: true
    },
    parentwomenmodel: {
      type: Array,
      required: true
    },
    parentmenmodel: {
      type: Array,
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
    basedisabled: {
      type: Boolean,
      required: true
    },
    issameaddress: {
      type: String,
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
      sameaddress: [],
      isDisabled: false,
      isidentical: false,
      fileldName: 'copy_address_Linkage',
      fileldHeathName: 'copy_healthCondition',
      IdCardTypeValue1: '01',
      IdCardTypeValue2: '01',
      isman: [], // 男方单亲的值
      iswoman: [], // 女方单亲的值
      manrequire: true, // 男方必填
      womanrequire: true // 女方必填
    }
  },
  mounted () {
    this.getyesno()
  },
  methods: {
    // 男方信息单亲change
    ismanChange (e) {
      if (e.length > 0) {
        if (this.iswoman.length > 0) {
          this.iswoman = []
        }
        this.isman[0] = e[0]
      }
    },
    // 女方信息单亲change
    iswomanChange (e) {
      if (e.length > 0) {
        if (this.isman.length > 0) {
          this.isman = []
        }
        this.iswoman[0] = e[0]
      }
    },
    changeIdCardTypeValue1 (v) {
      this.IdCardTypeValue1 = v
      this.$emit('setIdCard', '1')
    },
    changeIdCardTypeValue2 (v) {
      this.IdCardTypeValue2 = v
      this.$emit('setIdCard', '2')
    },
    radiochange (val) {
      this.$emit('update:parentwomensetaddress', [])
      this.$emit('update:issameaddress', val.target.value)
    },
    // YESNO
    async getyesno () {
      const data = await this.getDictionaries('YESNO')
      this.sameaddress = data
    },
    // 禁用时间,不能选择比当前时间小的日期
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this, 'idCard')
    },
    copy_idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this, 'copy_idCard')
    },
    callbackByIdCard (sex, age, birth, key) {
      const obj = {
        sex,
        age,
        birth,
        key
      }
      this.$emit('setmendate', obj)
    },
    chradio (e) {
    },
    parentmensetheath () {
      this.$emit('parentmensetheath')
    },
    parentwomensetheath () {
      this.$emit('parentwomensetheath')
    },
    parentmensetaddress () {
      this.$emit('parentmensetaddress')
    },
    parentwomensetaddress () {
      this.$emit('parentwomensetaddress')
    }

  },
  watch: {
    isman (val) {
      this.manrequire = val.length > 0 || val.length == 0 && this.iswoman.length == 0
      this.womanrequire = val.length == 0
    },
    iswoman (val) {
      this.manrequire = val.length == 0
      this.womanrequire = val.length > 0 || val.length == 0 && this.isman.length == 0
    },
    manrequire (val) {
      if (!val) { // 非必填，则清空错误信息
        this.$emit('clearErrorInfo', 'parentFrom', true)
      }
    },
    womanrequire (val) {
      if (!val) { // 非必填，则清空错误信息
        this.$emit('clearErrorInfo', 'parentFrom', false)
      }
    }
  }
}
</script>
<style scoped lang="less">
.fromintop {
  margin: 20px 0;
  position: relative;
}
.equally {
  position: absolute;
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;
}
.frominadd {
  margin-top: 0;
}
.radio_grops {
  margin-left: 20px;
}
.fontClass {
  font-size: 16px;
  font-weight: bold;
}
</style>
