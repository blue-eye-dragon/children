<template>
  <ta-row>
    <ta-col :span="24">
      <ta-col :span='6'>
        <ta-form-item label="是否享受福利补贴"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="isEnjoyMoney"
                      :require="{message:'是否享受福利补贴'}"
                      initValue="1">
          <ta-radio-group @change="changeData2"
                          :disabled="isOffSite||disabled">
            <ta-radio :value="'0'">否</ta-radio>
            <ta-radio :value="'1'">是</ta-radio>
          </ta-radio-group>

        </ta-form-item>
      </ta-col>
      <ta-col :span='6'>
        <ta-form-item label="是否集中供养"
                      hidden
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="isConcentratedFeed">

          <ta-radio-group @change="changeData"
                          :disabled="disabled">
            <ta-radio :value="'0'">否</ta-radio>
            <ta-radio :value="'1'">是</ta-radio>
          </ta-radio-group>

        </ta-form-item>
      </ta-col>
      <ta-col :span='6'>
        <ta-form-item v-if=" !controMustTip"
                      hidden
                      label="福利机构"
                      class="spilwid lk"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="welfareOrgId">
          <ta-select allowClear
                     showSearch
                     :filterOption="filterOption"
                     :placeholder=" '请选择登记机关'">
            <ta-select-option v-for="item in orgList"
                              :key="item.taorgId"
                              :value="item.taorgId">{{item.orgName}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="6">

      <ta-form-item label="领取方式"
                    fieldDecoratorId="receiveWay"
                    :fieldDecoratorOptions="!controMustTip2?rules.receiveWay:rules.receiverToChildRelation2"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-select placeholder="请选择领取方式"
                   :disabled='disabled?disabled:controMustTip2'
                   @change="relevechange">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in receiveList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="领取人"
                    fieldDecoratorId='receiverName'
                    :fieldDecoratorOptions="(isSelf2||isSelf)?rules.receiverName2:(!controMustTip2?rules.receiverName:rules.receiverName2)"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-input placeholder="请输入领取人"
                  @blur="sendDataToRecipient('receiverName')"
                  :disabled='isSelf2||isSelf?true:(disabled?disabled:controMustTip2)' />
      </ta-form-item>
      <div>
        <ta-col :span="receiverToChildRelationhide?16:24">
          <ta-form-item label="领取人与儿童关系"
                        :labelCol="{ span: receiverToChildRelationhide?15:10 }"
                        :wrapperCol="{ span: receiverToChildRelationhide?9:14}"
                        fieldDecoratorId='receiverToChildRelation'
                        :fieldDecoratorOptions="(!controMustTip2&&controMustTip)?rules.receiverToChildRelation:rules.receiverToChildRelation2">
            <ta-select placeholder="领取人与儿童关系"
                       :disabled='disabled?disabled:controMustTip2'
                       @change='receiverToChildRelationchange'>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in relationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="receiverToChildRelationhide?8:0">
          <ta-form-item label=""
                        v-if="receiverToChildRelationhide"
                        fieldDecoratorId="relationshipOther"
                        :wrapperCol="{ span: 24}"
                        :fieldDecoratorOptions="rules.relationshipOther">
            <ta-input placeholder="请输入其他信息"
                      :disabled='disabled' />
          </ta-form-item>
        </ta-col>
      </div>

    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="起领年月"
                    fieldDecoratorId="startReceiveDate"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }"
                    :require="{enable:isInfoMaintain&&!controMustTip2,message:'请选择起领年月'}">
        <ta-month-picker style="width:100%"
                         placeholder='请选择起领年月'
                         :disabled='disabled?disabled:controMustTip2||isOther' />
      </ta-form-item>
      <ta-form-item label="证件类型"
                    fieldDecoratorId="memberIdType"
                    :fieldDecoratorOptions="{rules: [{ required:(isSelf||isSelf2)?false:(!controMustTip2&&controMustTip), message: '请选择证件类型' }]}"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-select placeholder="请选择证件类型"
                   :disabled='isSelf||isSelf2?true:(controMustTip2?true:disabled)'
                   @change="idCardTypeChange">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in idCardTypeList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="
                    开户银行"
                    v-if='ishide'
                    fieldDecoratorId='depositBank'
                    :fieldDecoratorOptions="(!controMustTip2&&!iswelfare)?rules.depositBank:rules.depositBank2"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <!-- <ta-input placeholder="请输入开户银行" :max='99999999999999999999999999999' :disabled='disabled'/> -->
        <ta-input placeholder="请输入开户银行"
                  :disabled='disabled?disabled:controMustTip2' />
      </ta-form-item>

    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="末领年月"
                    fieldDecoratorId="endReceiveDate"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }"
                    :require="{enable:!controMustTip2,message:'请选择末领年月'}">
        <ta-month-picker style="width:100%"
                         placeholder='请选择末领年月'
                         :allowClear="false"
                         :disabledDate="disabledEndDate"
                         :disabled='disabled||controMustTip2' />
      </ta-form-item>
      <ta-form-item label="领取人证件号码"
                    key='1'
                    fieldDecoratorId="idCard"
                    :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: ((isSelf||isSelf2)?false:(!controMustTip2&&controMustTip)), message: '请输入领取人证件号码' },{validator:idCardValid}]}"
                    ref='idCard'
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{ span: 15 }">
        <ta-input placeholder="请输入领取人证件号码"
                  @blur="sendDataToRecipient('idCard')"
                  :disabled='(isSelf||isSelf2)?true:(disabled?disabled:controMustTip2)' />
      </ta-form-item>
      <ta-form-item label="银行账号"
                    v-if='ishide'
                    fieldDecoratorId='bankAccount'
                    :fieldDecoratorOptions="(!controMustTip2&&!iswelfare)?rules.bankAccount:rules.bankAccount2"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-input placeholder="请输入银行账号"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :disabled='disabled?disabled:controMustTip2' />
        <!-- <ta-input-number style="width:100%" :precision='1' placeholder="请输入银行账号" /> -->
      </ta-form-item>

    </ta-col>
    <ta-col :span="6">
      <ta-row>

        <ta-col>
          <ta-form-item label="保障金额（元）"
                        v-if="!(isOffSite&&isTown)"
                        fieldDecoratorId='securityMoney'
                        :require="{enable: !controMustTip2&&hasSecurityMoney,message:'请输入保障金额'}"
                        :labelCol="{ span: 10 }"
                        :wrapperCol="{ span: 14 }">
            <!-- :fieldDecoratorOptions="hasSecurityMoney?rules.securityMoney:rules.receiverToChildRelation2" -->
            <ta-input-number :min="0"
                             :max="9999"
                             :precision='2'
                             :disabled='disabled||controMustTip2'
                             style="width:100%"
                             placeholder='请输入保障金额' />
          </ta-form-item>
          <ta-form-item label="领取人联系电话"
                        fieldDecoratorId='contactNumber'
                        :fieldDecoratorOptions="(isSelf||isSelf2)?rules.contactNumber2:((!controMustTip2&&controMustTip)?rules.contactNumber:rules.contactNumber2)"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{ span: 15 }">
            <ta-input placeholder="请输入领取人联系电话"
                      @blur="sendDataToRecipient('contactNumber')"
                      :disabled='isSelf2?true:(disabled?disabled:controMustTip2)' />
          </ta-form-item>
          <ta-form-item label="开户人"
                        v-if='ishide'
                        fieldDecoratorId='openCardPerson'
                        :fieldDecoratorOptions="(!controMustTip2&&controMustTip)?rules.openCardPerson:rules.openCardPerson2"
                        :labelCol="{ span: 8 }"
                        :wrapperCol="{ span: 16 }">
            <ta-input placeholder="请输入开户人"
                      :disabled='disabled?disabled:controMustTip2' />
          </ta-form-item>

        </ta-col>
      </ta-row>
    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    hasSecurityMoney: { // 保障金额是否有值
      type: Boolean,
      default: true
    },
    birthDate: {
      type: String
    },
    isOffSite: {
      type: Boolean,
      default: false
    },
    isOther: {
      type: Boolean,
      default: false
    },
    iswelfare: {
      type: Boolean,
      default: true
    },
    isshow: {
      type: Boolean,
      default: true
    },
    controMustTip: {
      type: Boolean,
      required: true
    },
    controMustTip2: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    ishide: {
      type: Boolean,
      required: true
    },
    receiverToChildRelationhide: {
      type: Boolean,
      required: true
    },
    idCardTypeList: {
      type: Array,
      required: true
    },
    isInfoMaintain: {
      type: Boolean
    }
  },
  data () {
    return {
      orgList: [],
      receiveList: [],
      relationList: [],
      yesNoList: [],
      rules: {
        receiveWay: this.verificationRules('领取方式'),
        openCardPerson: this.verificationRules('开户人', 50),
        openCardPerson2: this.verificationRulesNotMustFill('开户人', 50),
        depositBank: this.verificationRules('开户银行', 100),
        depositBank2: this.verificationRulesNotMustFill('开户银行', 100),
        startReceiveDate: this.verificationRulesNotMustFill('起领年月', true),
        endReceiveDate: this.verificationRulesNotMustFill('末领年月', true),
        receiverName: this.verificationRules('领取人', 72),
        receiverName2: this.verificationRulesNotMustFill('领取人', 72),
        bankAccount: this.verificationRules('银行账号', 72),
        bankAccount2: this.verificationRulesNotMustFill('银行账号', 72),
        securityMoney: this.verificationRulesNotMustFill('保障金额', '0'),
        receiverToChildRelation: this.verificationRules('领取人与儿童关系'),
        receiverToChildRelation2: { rules: [{ validator: this.nullMasegge }] },
        relationshipOther: this.verificationRules('其他信息', 50),
        idCard: this.verificationRules('领取人身份证号', { type: 'idCard' }),
        contactNumber2: this.phoneRule(false),
        contactNumber: this.phoneRule(true)

      },
      isvalidator: false,
      errMsg: null, // 身份证号错误信息
      isSelf: false, // 关系是否选择本人
      isSelf2: false, // 关系时父母
      isTown: window.parent.indexTool.getUserInfo().areaLevel == 4 // 乡镇用户
    }
  },
  mounted () {
    this.retreleve()
    this.getrelation()
  },
  methods: {
    // 同步数据到父母及儿童的领取人
    sendDataToRecipient (name) {
      // this.$emit('sendDataToRecipient', name, null, 'baselifeForm')
    },
    nullMasegge (rule, value, callback) {
      callback()
    },
    changeData (e) {
      this.$emit('controMustTipChange', e.target.value, '0')
    },
    changeData2 (e) {
      this.isSelf = false
      this.isSelf2 = false
      this.$emit('controMustTipChange', e.target.value, '1')
      if (e.target.value == '1') {
        this.$emit('computeEndTime')
      }
    },
    disabledEndDate (current) {
      if (this.birthDate) {
        const time = moment(this.birthDate, 'YYYY-MM-DD').add({ years: 18 }).format('YYYY-MM')
        return current > moment(time, 'YYYY-MM')
      }
    },
    async orginfo () { // 登记机构列表
      const orgdata = await this.post('welfareOrgManagement/queryAllWelfareOrg')

      this.orgList = orgdata.data.data
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    idCardTypeChange (val) {
      // this.$emit('idCardTypeValue', 'baselifeForm')
      // // 同步数据到父母亲及儿童
      // this.$emit('sendDataToRecipient', 'memberIdType', null, 'baselifeForm', val)
    },
    receiverToChildRelationchange (val, option) {
      this.$emit('update:receiverToChildRelationhide', val == this.Enum.RELATION.QT)
      this.isSelf = val == this.Enum.RELATION.BR
      this.isSelf2 = (val == this.Enum.RELATION.FQ || val == this.Enum.RELATION.MQ)
      if (val == this.Enum.RELATION.FQ || val == this.Enum.RELATION.MQ || val == this.Enum.RELATION.BR) {
        // 将父母亲及儿童数据同步到领取人
        this.$emit('sendAllToRecipient', val == this.Enum.RELATION.FQ ? 'fatherForm' : (val == this.Enum.RELATION.MQ ? 'motherForm' : 'baseForm'))
      }
    },
    relevechange (val) {
      const ishide = val != 1
      this.$emit('relevechange', ishide)
    },
    async retreleve () {
      const data = await this.getDictionaries('PAYMENT')
      this.receiveList = data
      this.yesNoList = await this.getDictionaries('YESNO')
    },
    async getrelation () {
      const data = await this.getDictionaries('RELATION')
      this.relationList = data
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const _self = this
      if (!_self.isvalidator) {
        callback()
      } else {
        this.$emit('idCardValid', rule, value, callback, this, 'baselifeForm')
      }
    }
  }
}
</script>
