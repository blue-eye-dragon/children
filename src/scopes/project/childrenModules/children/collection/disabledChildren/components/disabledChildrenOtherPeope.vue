<template>
  <div class="nofy">
    <ta-col :span="24">

      <ta-col :span='8'>
        <ta-form-item label="受委托监护人姓名"
                      fieldDecoratorId="nameOfGuardian"
                      :fieldDecoratorOptions="mustTipO && !(isphonerule ||isphonerule1)?rules.name:rules.name2"
                      :labelCol="{span:12}"
                      :wrapperCol="{span:12}">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    maxlength='72'
                    :disabled="disabled" />
        </ta-form-item>

        <ta-form-item label="证件号码"
                      fieldDecoratorId="idCardOfGuardian"
                      :fieldDecoratorOptions="!(isphonerule ||isphonerule1)?((cordTypes=='01'?rules.idCard:this.verificationRules('证件号码',18))):(cordTypes=='01'?rules.idCard2:this.verificationRulesNotMustFill('证件号码',18))"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="disabled?'':'请输入证件号码'"
                    maxlength='18'
                    :disabled="disabled?disabled:(cordTypes==0 && !isread)" />
        </ta-form-item>
      </ta-col>
      <ta-col :span='8'>

        <ta-form-item label="证件类型"
                      fieldDecoratorId="memberIdTypeOfGuardian"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                      :fieldDecoratorOptions="mustTipO && !(isphonerule ||isphonerule1)?this.verificationRules('证件类型'):rules.currentSituation2">
          <ta-select :allowClear='true'
                     @change="showIdcord"
                     :placeholder="disabled?'':'请选择证件类型'"
                     :disabled="disabled">

            <ta-select-option v-for="(item,index) in cardTypeList"
                              :value="item.value"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactNumberOfGuardian"
                      :fieldDecoratorOptions="mustTipO  && !(isphonerule ||isphonerule1)?rules.contactNumber:rules.contactNumber2"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="disabled?'':'请输入联系电话'"
                    maxlength='17'
                    oninput="value=value.replace(/[^\d]/g,'')"
                    :disabled="disabled" />
        </ta-form-item>

        <!-- <ta-form-item label="父母一方外出，另一方无监护能力"
                      fieldDecoratorId="name2"
                      :require="{message:'请选择!'}"
                      :labelCol="{span:13}"
                      :wrapperCol="{span:11}"
                      initValue='4'>
          <ta-radio-group :disabled="disabled">
            <ta-radio :value="item.value"
                      v-for="(item,index) in  [{label:'是',value:'3'},{label:'否',value:'4'}]"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item label="父母外出有无委托其他监护人"
                      fieldDecoratorId="name4"
                      :require="{message:'请选择父母外出有无委托其他监护人!'}"
                      initValue='8'
                      :labelCol="{span:12}"
                      :wrapperCol="{span:12}">
          <ta-radio-group @change="mustTipOCtrls"
                          :disabled="disabled">
            <ta-radio :value="item.value"
                      v-for="(item,index) in [{label:'是',value:'7'},{label:'否',value:'8'}]"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item> -->

      </ta-col>
      <ta-col :span='8'>
        <ta-form-item label="与儿童关系"
                      fieldDecoratorId="relationship"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="mustTipO  && !(isphonerule ||isphonerule1)?this.verificationRules('与儿童关系'):rules.currentSituation2">
          <ta-select allowClear
                     collectionFilter="01,02,11"
                     :placeholder="disabled?'':'请选择与儿童关系'"
                     :disabled="disabled"
                     @change="ortherR">
            <ta-select-option v-for="(item,index) in relationList"
                              :value="item.value"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <div v-if="ortherRe">
          <ta-form-item label="其他关系"
                        fieldDecoratorId="relationshipOther"
                        :fieldDecoratorOptions="this.verificationRules('其他',50)"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input :placeholder="disabled?'':'请输入其他关系'"
                      maxlength='50'
                      :disabled="disabled" />
          </ta-form-item>
        </div>
      </ta-col>
    </ta-col>
    <!-- <ta-col :span="24">
        <ta-form-item label="健康状况"
                      fieldDecoratorId="healthStatus"
                      :labelCol="{ span: 4}"
                      :wrapperCol="{ span: 20 }"

                      :fieldDecoratorOptions="mustTipO?thisP.rules.healthStatus:rules.currentSituation2">
          <ta-radio-group @change="onChangeOther"
                          :disabled="disabled">
            <ta-radio :value="item.value"
                      v-for="(item,index) in thisP.heathlist"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                      label="其他"
                      fieldDecoratorId="healthStatusOther"
                      :labelCol="{ span: 4}"
                      :wrapperCol="{ span: 20 }"
                      :fieldDecoratorOptions="thisP.rules.healthStatusOther">
          <ta-input :disabled="disabled"
                    maxlength='50'
                    :placeholder="disabled?'':'请输入其他情况'" />
        </ta-form-item>

        <div class="canji"
             v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
          <ta-form-item label="残疾类型"
                        fieldDecoratorId="disabledType"
                        :labelCol="{ span: 4}"
                        :wrapperCol="{ span: 20 }"
                        :initValue="[]"
                        :require="{message:'请选择残疾类型'}">
            <ta-checkbox-group :options="disabiliytypelist"
                               @change="setMulti"
                               :disabled="disabled"
                               :values="disabilityTypeValues" />
          </ta-form-item>
          <ta-form-item label="残疾等级"
                        fieldDecoratorId="disabledLevel"
                        :labelCol="{ span: 4}"
                        :wrapperCol="{ span: 20 }">
            <ta-radio-group :disabled="disabled">
              <ta-radio :value="item.value"
                        v-for="(item,index) in thisP.canjileave"
                        :key="index">{{item.label}}</ta-radio>
            </ta-radio-group>
            <ta-radio-group style="float:left;"></ta-radio-group>
          </ta-form-item>
        </div> -->
    <!--重病-->
    <!-- <div class="canji"
             v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
          <ta-form-item label="重病"
                        fieldDecoratorId="disabledType"
                        :labelCol="{ span: 4}"
                        :wrapperCol="{ span: 20 }"
                        :initValue="[]"
                        :require="{message:'请选择重病!'}">
            <ta-checkbox-group :options="disabiliytypelist"
                               :disabled="disabled"
                               @change="seriousillnesschange" />
          </ta-form-item>
          <ta-form-item v-if="serioushvalserioushval"
                        label="其他"
                        fieldDecoratorId="healthStatusOther"
                        :labelCol="{ span: 4}"
                        :wrapperCol="{ span: 20 }"
                        :fieldDecoratorOptions="thisP.rules.healthStatusOther">
            <ta-input :disabled="disabled"
                      maxlength='50'
                      :placeholder="disabled?'':'请输入其他情况'" />
          </ta-form-item>
        </div> -->
    <!--慢性病-->
    <!-- <div class="canji"
             v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
          <ta-form-item label="慢性病"
                        fieldDecoratorId="disabledType"
                        :labelCol="{ span: 4}"
                        :wrapperCol="{ span: 20 }"
                        :initValue="[]"
                        :require="{message:'请选择慢性病!'}">
            <ta-checkbox-group :options="disabiliytypelist"
                               :disabled="disabled"
                               @change="seriousillnesschange" />
          </ta-form-item>
          <ta-form-item v-if="serioushvalserioushval"
                        label="其他"
                        fieldDecoratorId="healthStatusOther"
                        :labelCol="{ span: 4}"
                        :wrapperCol="{ span: 20 }"
                        :fieldDecoratorOptions="thisP.rules.healthStatusOther">
            <ta-input :disabled="disabled"
                      maxlength='50'
                      :placeholder="disabled?'':'请输入其他情况'" />
          </ta-form-item>
        </div>
        <ta-form-item label="其他特殊情况"
                      fieldDecoratorId="otherSpecialCircumstances"
                      :labelCol="{ span: 4}"
                      :wrapperCol="{ span: 20 }"

                      :fieldDecoratorOptions="rules.currentSituation2">

          <ta-radio-group @change="zkChange"
                          :disabled="disabled">
            <ta-radio :value="item.value"
                      v-for="(item,index) in presentsituationlist"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>

        <ta-form-item v-if="others==9"
                      label="其他"
                      fieldDecoratorId="otherSpecialCircumstancesOther"
                      :labelCol="{ span: 4}"
                      :wrapperCol="{ span: 20 }"
                      :fieldDecoratorOptions="thisP.rules.healthStatusOther">
          <ta-input :disabled="disabled"
                    maxlength='50'
                    :placeholder="disabled?'':'请输入其他情况'" />
        </ta-form-item>
      </ta-col> -->
    </ta-col>
    <!-- <ta-col :span="1"
            style="padding: 1%;">
      <ta-divider style="top: 0px;height: 224px;"
                  type="vertical" />
    </ta-col> -->

    <ta-col :span="11">
      <!-- <ta-col :span="12">

        <ta-form-item label="祖父姓名"
                      fieldDecoratorId="grandFatherName"
                      :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    maxlength='72'
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="外祖父姓名"
                      fieldDecoratorId="grandFatherTwoName"
                      :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    maxlength='72'
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="祖母姓名"
                      fieldDecoratorId="grandMotherName"
                      :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    maxlength='72'
                    :disabled="disabled" />
        </ta-form-item>

        <ta-form-item label="外祖母姓名"
                      fieldDecoratorId="grandMotherTwoName"
                      :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    maxlength='72'
                    :disabled="disabled" />
        </ta-form-item>

      </ta-col> -->
      <!-- <ta-col :span="12">

        <ta-form-item label="出生日期"
                      fieldDecoratorId="grandFatherBirthday"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-date-picker :placeholder="disabled?'':'请输入出生日期'"
                          style="width: 100%;"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="grandFatherTwoBirthday"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-date-picker :placeholder="disabled?'':'请输入出生日期'"
                          style="width: 100%;"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="grandMotherBirthday"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-date-picker :placeholder="disabled?'':'请输入出生日期'"
                          style="width: 100%;"
                          :disabled="disabled" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      fieldDecoratorId="grandMotherTwoBirthday"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}">
          <ta-date-picker :placeholder="disabled?'':'请输入出生日期'"
                          style="width: 100%;"
                          :disabled="disabled" />
        </ta-form-item>

      </ta-col> -->
    </ta-col>
  </div>
</template>
<script>
export default {
  props: {
    isread: {
      type: Boolean,
      required: true
    },
    others: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },

    isrequired: {
      type: Boolean,
      required: true
    },
    isphonerule: {
      type: Boolean,
      required: true
    },
    isphonerule1: {
      type: Boolean,
      required: true
    },
    thisP: {
      required: true
    },
    heathval: {
      type: String,
      required: true
    },
    serioushval: {
      type: Boolean,
      required: true
    },
    disabiliytypelist: {
      type: Array,
      required: true
    },
    mustTipO: {
      type: Boolean,
      required: true,
      default: true
    },
    ortherRe: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      titletext: '',
      presentsituationlist: [],
      rules: {
        name: this.verificationRules('姓名', 72),
        name2: this.verificationRulesNotMustFill('姓名', 72),
        idCard: this.verificationRules('证件号码', { type: 'idCard' }),
        idCard2: this.verificationRulesNotMustFill('证件号码', {
          type: 'idCard'
        }),
        // healthStatus: this.verificationRulesNotMustFill('健康状况',),
        contactNumber: this.phoneRule(true, '请输入联系电话'),
        contactNumber2: this.phoneRule(false, '请输入联系电话'),
        currentSituation: this.verificationRules('其他特殊情况'),
        currentSituation2: {
          validateTrigger: 'change',
          rules: [{ required: false }]
        },
        currentSituationOther: this.verificationRules('其他情况', 50),
        currentSituationOther2: this.verificationRulesNotMustFill(
          '其他情况',
          50
        )
      },
      copyisman: [],

      familyBreadwinners: false,
      serioushvalserioushval: false,
      relationList: [],
      yesNoList: [],
      cordTypes: '0',
      zkval: '',
      // ortherRe: false,
      cardTypeList: [],
      disabilityTypeValues: []

    }
  },
  activated () {
    this.disabilityTypeValues = []
    // this.thisP.setHeight('kttwo', 'kttwoout')
    this.cordTypes = '0'
  },
  mounted () {
    // this.thisP.setHeight('kttwo', 'kttwoout')
    this.serioushvalserioushval = this.serioushval
    this.getpresentsituation()
  },
  methods: {
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
    mustTipOCtrls (v) {
      const status = (v.target.value == '7')
      this.thisP.mustTipOCtrl(status)
      this.thisP.ortherRe = false
      this.serioushvalserioushval = false
      this.thisP.setHeight('kttwo', 'kttwoout')
    },

    showIdcord (a) {
      this.cordTypes = a
      if (a == undefined) {
        this.cordTypes = 0
        this.$nextTick(() => {
          this.thisP.otherManForm.setFieldsValue({
            idCard: ''
          })
        })
      }
    },
    ortherR (e) {
      this.thisP.otherManForm.setFieldsValue({
        relationship: e,
        relationshipOther: ''
      })
      if (e == '99') {
        this.thisP.ortherRe = true
      } else {
        this.thisP.ortherRe = false
      }
      this.thisP.setHeight('kttwo', 'kttwoout')
    },
    onChangeOther (e) {
      this.thisP.otherManForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.thisP.serioushvalsOther(false)
      this.thisP.heathvalsOther(e, this.types)
      this.thisP.getdisabiliytype(e.target.value, '3') // disabiliytypelist
      this.thisP.setHeight('kttwo', 'kttwoout')
    },
    seriousillnesschange (val) {
      if (
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
      ) {
        this.serioushvalserioushval = true
      } else {
        this.serioushvalserioushval = false
      }
      if (val.length > 1) {
        if (
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = []
          arr.push(val[val.length - 1])
          this.$nextTick(() => {
            this.thisP.otherManForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
        if (
          val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = [...val]
          arr.shift()
          this.$nextTick(() => {
            this.thisP.otherManForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
      }
      this.thisP.setHeight('kttwo', 'kttwoout')
    },

    // 字典
    async getpresentsituation () {
      this.presentsituationlist = await this.getDictionaries('PRESENTSITUATION')
      this.relationList = await this.getDictionaries('RELATION')
      this.relationList.splice(0, 2)
      this.relationList.splice(this.relationList.length - 3, 1)// 去掉选项
      this.yesNoList = await this.getDictionaries('YESNO')
      this.cardTypeList = await this.getDictionaries('IDCARD_TYPE')
    },
    zkChange (v) {
      this.$emit('otherPother', v.target.value)
    }

  }
}
</script>
<style lang="less" scoped>
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
