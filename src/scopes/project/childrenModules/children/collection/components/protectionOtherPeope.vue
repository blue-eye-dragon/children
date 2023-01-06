<template>
  <div class="nofy">
    <ta-col :span="6">
      <ta-form-item
        label="父母双方同时外出"
        fieldDecoratorId="name1"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
          :wrapperCol="{span:15}"
      >
        <ta-radio-group :disabled="disabled">
          <ta-radio
            :value="item.value"
            v-for="(item,index) in yesNoList"
            :key="index"
          >{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
       <ta-form-item
        label="祖父姓名"
        fieldDecoratorId="grandFatherName"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>
       <ta-form-item
        label="外祖父姓名"
        fieldDecoratorId="grandFatherTwoName"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>
      <ta-form-item
        label="受委托监护人姓名"
        fieldDecoratorId="name"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="6">
      <ta-form-item
        label="父母一方外出，另一方无监护能力"
        fieldDecoratorId="name4"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-radio-group :disabled="disabled">
          <ta-radio
            :value="item.value"
            v-for="(item,index) in yesNoList"
            :key="index"
          >{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
        <ta-form-item
        label="出生日期"
        fieldDecoratorId="grandFatherBirthday"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>
       <ta-form-item
        label="出生日期"
        fieldDecoratorId="grandFatherTwoBirthday"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>
      <ta-form-item
        label="身份证号"
        fieldDecoratorId="idCard"
        :fieldDecoratorOptions="isrequired?rules.idCard:rules.idCard2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入身份证号'" :disabled="disabled" />
      </ta-form-item>

    </ta-col>
    <ta-col :span="6">
       <ta-form-item
        label="无监护能力"
        fieldDecoratorId="name2"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-radio-group :disabled="disabled">
          <ta-radio
            :value="item.value"
            v-for="(item,index) in yesNoList"
            :key="index"
          >{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>

      <ta-form-item
        label="祖母姓名"
        fieldDecoratorId="grandMotherName"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>

      <ta-form-item
        label="外祖母姓名"
        fieldDecoratorId="grandMotherTwoName"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>

      <ta-form-item
        label="与儿童关系"
        fieldDecoratorId="relationship"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
        :wrapperCol="{span:15}"
      >
        <!-- <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled='disabled' /> -->
        <ta-select @change="ortherR">
          <ta-select-option
            v-for="(item,index) in relationList"
            :value="item.value"
            :key="index"
          >{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
       <ta-form-item
       v-if="ortherRe"
        label="与儿童其他关系"
        fieldDecoratorId="relationshipOther"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled='disabled' />

      </ta-form-item>
    </ta-col>
    <ta-col :span="6">
       <ta-form-item
        label="父母外出有无委托其他监护人"
        fieldDecoratorId="name3"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-radio-group :disabled="disabled">
          <ta-radio
            :value="item.value"
            v-for="(item,index) in yesNoList"
            :key="index"
          >{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>

      <ta-form-item
        label="出生日期"
        fieldDecoratorId="grandMotherBirthday"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>

      <ta-form-item
        label="出生日期"
        fieldDecoratorId="grandMotherTwoBirthday"
        :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="disabled" />
      </ta-form-item>

      <ta-form-item
        label="联系电话"
        fieldDecoratorId="contactNumber"
        :fieldDecoratorOptions="rules.contactNumber"
         :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
      >
        <ta-input :placeholder="disabled?'':'请输入联系电话'" :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item
        label="健康状况"
        fieldDecoratorId="healthStatus"
        :labelCol="{ span: 3}"
        :wrapperCol="{ span: 21 }"
        :fieldDecoratorOptions="isrequired?thisP.rules.healthStatus:null"
      >
        <ta-radio-group @change="onChangeOther" :disabled="disabled">
          <ta-radio
            :value="item.value"
            v-for="(item,index) in thisP.heathlist"
            :key="index"
          >{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
      <ta-form-item
        v-if="heathval==Enum.HEALTHSTATUS.OTHER"
        label="其他"
        fieldDecoratorId="healthStatusOther"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :fieldDecoratorOptions="thisP.rules.healthStatusOther"
      >
        <ta-input :disabled="disabled" placeholder="请输入其他情况" />
      </ta-form-item>

      <div class="canji" v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
        <ta-form-item
          label="残疾类型"
          fieldDecoratorId="disabledType"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span:21 }"
          :initValue="[]"
          :require="{message:'请选择残疾类型'}"
        >
          <ta-checkbox-group :options="disabiliytypelist" />
        </ta-form-item>
        <ta-form-item
          label="残疾等级"
          fieldDecoratorId="disabledLevel"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
        >
          <ta-radio-group :disabled="disabled">
            <ta-radio
              :value="item.value"
              v-for="(item,index) in thisP.canjileave"
              :key="index"
            >{{item.label}}</ta-radio>
          </ta-radio-group>
          <ta-radio-group style="float:left;"></ta-radio-group>
        </ta-form-item>
      </div>
      <!--重病-->
      <div class="canji" v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
        <ta-form-item
          label="重病"
          fieldDecoratorId="disabledType"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
          :initValue="[]"
          :require="{message:'请选择重病!'}"
        >
          <ta-checkbox-group
            :options="disabiliytypelist"
            :disabled="disabled"
            @change="seriousillnesschange"
          />
        </ta-form-item>
        <ta-form-item
          v-if="serioushvalserioushval"
          label="其他"
          fieldDecoratorId="healthStatusOther"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
          :fieldDecoratorOptions="thisP.rules.healthStatusOther"
        >
          <ta-input :disabled="disabled" placeholder="请输入其他情况" />
        </ta-form-item>
      </div>
      <!--慢性病-->
      <div class="canji" v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
        <ta-form-item
          label="慢性病"
          fieldDecoratorId="disabledType"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
          :initValue="[]"
          :require="{message:'请选择慢性病!'}"
        >
          <ta-checkbox-group
            :options="disabiliytypelist"
            :disabled="disabled"
            @change="seriousillnesschange"
          />
        </ta-form-item>
        <ta-form-item
          v-if="serioushvalserioushval"
          label="其他"
          fieldDecoratorId="healthStatusOther"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
          :fieldDecoratorOptions="thisP.rules.healthStatusOther"
        >
          <ta-input :disabled="disabled" placeholder="请输入其他情况" />
        </ta-form-item>
      </div>

      <ta-form-item
        label="其他特殊情况"
        fieldDecoratorId="otherSpecialCircumstances"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :fieldDecoratorOptions="isrequired?rules.currentSituation:rules.currentSituation2"
      >
        <ta-radio-group @change="zkChange" :disabled="disabled">
          <ta-radio
            :value="item.value"
            v-for="(item,index) in presentsituationlist"
            :key="index"
          >{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>

      <ta-form-item
        v-if="familyBreadwinners"
        label="其他"
        fieldDecoratorId="otherSpecialCircumstancesOther"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        :fieldDecoratorOptions="thisP.rules.healthStatusOther"
      >
        <ta-input :disabled="disabled" placeholder="请输入其他 " />
      </ta-form-item>
    </ta-col>
  </div>
</template>
<script>
export default {
  props: {
    // types: {
    //   type: String,
    //   required: true
    // },
    // zkval: {
    //   type: String,
    //   required: true
    // },
    disabled: {
      type: Boolean,
      required: true
    },
    // isman: {
    //   type: Array,
    //   required: true
    // },
    isrequired: {
      type: Boolean,
      required: true
    },
    thisP: {
      required: true
    },
    // heathval: {
    //   type: String,
    //   required: true
    // },
    // serioushval: {
    //   type: Boolean,
    //   required: true
    // },
    disabiliytypelist: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      titletext: '',
      imgsrc: '',
      imgsrc1: require('./img/parentman.png'),
      imgsrc2: require('./img/parentwomen.png'),
      // zkother: '',
      presentsituationlist: [],
      rules: {
        name: this.verificationRules('姓名', 72),
        name2: this.verificationRulesNotMustFill('姓名', 72),
        idCard: this.verificationRules('身份证号', { type: 'idCard' }),
        idCard2: this.verificationRulesNotMustFill('身份证号', {
          type: 'idCard'
        }),
        // healthStatus: this.verificationRulesNotMustFill('健康状况',),
        contactNumber: this.verificationRulesNotMustFill('联系电话', {
          type: 'phone'
        }),
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
      heathval: '0',
      serioushval: false,
      zkval: '',
      ortherRe: false
    }
  },
  activated () {
    // alert(1)
    // this.zkother = ''
    // this.thisP.texts()
  },
  mounted () {
    this.serioushvalserioushval = this.serioushval
    this.getpresentsituation()
  },
  methods: {
    ortherR (e) {
      if (e == '99') {
        this.ortherRe = true
      } else {
        this.ortherRe = false
      }
      this.thisP.setHeight('kttwo', 'kttwoout')
    },
    onChangeOther (e) {
      this.thisP.otherManForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.serioushvalserioushval = false
      this.heathval = e.target.value
      this.thisP.getdisabiliytype(e.target.value) // disabiliytypelist
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
      this.presentsituationlist = await this.getDictionaries(
        'PRESENTSITUATION'
      )
      // this.familyComeList = await this.getDictionaries('FAMILYSOURCEINCOME')
      this.relationList = await this.getDictionaries('RELATION')
      this.yesNoList = await this.getDictionaries('YESNO')
    },
    inpchanges (e) {
      console.log(e.target.value)
      // this.$emit('update:currentSituationOther', e.target.value)
    },
    zkChange (e) {
      // this.zkother = ''
      // this.$emit('update:currentSituationOther', '')
      this.zkval = e.target.value
      // this.$emit('zkChange', e.target.value, this.types)
    }
  }
  // watch: {
  //   // currentSituationOther (val) {
  //   //   this.zkother = val
  //   // },
  //   isman (val) {
  //     this.copyisman = [...val]
  //     if (val.length == 0) {
  //       this.$emit('update:isrequired', true)
  //     } else {
  //       if (!val[0]) {
  //         this.$emit('update:isrequired', true)
  //       } else {
  //         if (this.types != val[val.length - 1]) {
  //           this.$emit('update:isrequired', false)
  //         } else {
  //           this.$emit('update:isrequired', true)
  //         }
  //       }
  //     }
  //   }
  // }
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
