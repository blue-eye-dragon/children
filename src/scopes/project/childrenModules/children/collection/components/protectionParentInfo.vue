<template>
  <div class="nofy">
    <!-- <ta-col :span="24"> -->
    <div class="titletop">
      <img :src="imgsrc" alt />
      <span>{{titletext}}</span>
      <!-- <ta-checkbox-group
        @change="ismanChange"
        v-model="copyisman"
        class="radio_grops"
        :disabled="disabled"
      >
        <ta-checkbox  :value="types" class="apply">单亲</ta-checkbox>
      </ta-checkbox-group> -->
    </div>
    <ta-col :span="12">
      <ta-form-item
            label="姓名"
            fieldDecoratorId="name"
            :fieldDecoratorOptions="isrequired?rules.name:rules.name2"
             :labelCol="{ span: 9 }"
            :wrapperCol="{ span: 15 }"
          >
        <ta-input :placeholder="disabled?'':'请输入姓名'" :disabled="false" />
      </ta-form-item>
       <ta-form-item
      label="联系电话"
      fieldDecoratorId="contactNumber"
      :fieldDecoratorOptions="rules.contactNumber"
       :labelCol="{ span: 9 }"
            :wrapperCol="{ span: 15 }"
    >
      <ta-input :placeholder="disabled?'':'请输入联系电话'" :disabled="disabled" />
    </ta-form-item>
    <ta-form-item
      label="详细地址"
      fieldDecoratorId="censusRegisterDetail"
       :labelCol="{ span: 9 }"
            :wrapperCol="{ span: 15 }"

    >
      <ta-input

        :placeholder="disabled?'':'请输入详细地址'"
        :disabled="disabled"
          @change="likeOut"
        :fieldDecoratorOptions="rules.censusRegisterDetail"
      />
         <!-- @change="likeaddress" -->
    </ta-form-item>
    <AddressComponent
      :labelwidth="labelwidth"
      :disabled="disabled"
      :addressmodel="addressFMModelNow"
      :msg="'现居住地址'"
      fileldName="currentAddress"
      @setaddress="setAddressFMNow"
      arealevel="5"
        @adsvalchange="likeOut"
    ></AddressComponent>
    </ta-col>
    <ta-col :span="12">
        <ta-form-item
      label="身份证号"
      fieldDecoratorId="idCard"
      :fieldDecoratorOptions="isrequired?rules.idCard:rules.idCard2"
       :labelCol="{ span: 9 }"
            :wrapperCol="{ span: 15 }"
    >
      <ta-input :placeholder="disabled?'':'请输入身份证号'" :disabled="disabled" />
    </ta-form-item>
    <AddressComponent
      :clearPlaceHolder="disabled"
      :addressmodel="addressFMModel"
      :msg="'户籍所在地'"
      :disabled="disabled"
      :isRequire="isrequired"
      arealevel="5"
      :labelwidth="labelwidth"
      fileldName="censusRegister"
      @setaddress="setAddressFM"
  @adsvalchange="likeOut"
    ></AddressComponent>

     <ta-form-item
      label="同现住址"
      fieldDecoratorId="sameAddress"
      :fieldDecoratorOptions="{initialValue: []}"
      :labelCol="{ span: 9 }"
     :wrapperCol="{ span: 15 }"
    >
      <ta-checkbox-group :options="sameaddresslist" @change="likeaddress" :disabled="disabled" />
    </ta-form-item>
     <ta-form-item
      label="详细地址"
      fieldDecoratorId="currentAddressDetail"
       :labelCol="{ span: 9 }"
       :wrapperCol="{ span: 15 }"

    >
      <ta-input
        placeholder="请输入详细地址"
        :disabled="disabled"
         @change="likeOut"
        :fieldDecoratorOptions="rules.currentAddressDetail"
      />
    </ta-form-item>
    </ta-col>
<ta-col :span="24">
    <ta-form-item
      label="健康状况"
      fieldDecoratorId="healthStatus"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      :fieldDecoratorOptions="isrequired?thisP.rules.healthStatus:null"
    >
      <ta-radio-group @change="onChangeFM" :disabled="disabled">
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
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      :fieldDecoratorOptions="thisP.rules.healthStatusOther"
    >
      <ta-input :disabled="disabled" placeholder="请输入其他情况" />
    </ta-form-item>

    <div class="canji" v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
      <ta-form-item
        label="残疾类型"
        fieldDecoratorId="disabledType"
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span:18 }"
        :initValue="[]"
        :require="{message:'请选择残疾类型'}"
      >
        <ta-checkbox-group :options="disabiliytypelist" />
      </ta-form-item>
      <ta-form-item
        label="残疾等级"
        fieldDecoratorId="disabledLevel"
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
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
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
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
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
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
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
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
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
        :fieldDecoratorOptions="thisP.rules.healthStatusOther"
      >
        <ta-input :disabled="disabled" placeholder="请输入其他情况" />
      </ta-form-item>
    </div>

    <ta-form-item
      label="其他特殊情况"
      fieldDecoratorId="otherSpecialCircumstances"
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
      label="其他"
      v-if="zkval==9"
      fieldDecoratorId="otherSpecialCircumstancesOther"
      :fieldDecoratorOptions="isrequired?rules.currentSituationOther:rules.currentSituationOther2"
    >
      <ta-input :disabled="disabled" placeholder="请输入其他情况" />
    </ta-form-item>
    <!-- <ta-form-item
      v-if="familyBreadwinners"
      label="家庭经济来源"
      fieldDecoratorId="familyBreadwinner"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      :initValue="[]"
      :require="{message:'家庭经济来源!'}"
    >
      <ta-checkbox-group :options="familyComeList" :disabled="disabled" @change="familyCome" />
    </ta-form-item> v-else -->
    <ta-form-item

      label="家庭经济来源"
      fieldDecoratorId="familyBreadwinner"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
      :initValue="[]"

    >
      <ta-checkbox-group :options="familyComeList" :disabled="disabled" @change="familyCome" />
    </ta-form-item>
    <ta-form-item
      v-if="familyBreadwinners"
      label="其他"
      fieldDecoratorId="familyBreadwinnerOther"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 18 }"
    >
      <ta-input :disabled="disabled" placeholder="请输入其他 " />
    </ta-form-item>
</ta-col>
    <!-- </ta-col> -->
  </div>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  props: {
    types: {
      type: String,
      required: true
    },
    zkval: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    isman: {
      type: Array,
      required: true
    },
    // isrequired: {
    //   type: Boolean,
    //   required: true
    // },
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
    addressFMModelNow: {
      type: Array,
      required: true
    },
    addressFMModel: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isrequired: false,
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      //  householdRegistryClassifydisabled: false,
      // disabled: false,
      sameaddresslist: [{ label: '', value: '1' }],

      titletext: '',
      imgsrc: '',
      imgsrc1: require('./img/parentman.png'),
      imgsrc2: require('./img/parentwomen.png'),
      // zkother: '',
      presentsituationlist: [],
      rules: {
        // familyBreadwinner2: this.verificationRulesNotMustFill('家庭经济来源'),
        // familyBreadwinner: this.verificationRules('家庭经济来源'),
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
      familyComeList: [],
      familyBreadwinners: false,
      serioushvalserioushval: false,
      formName: []
    }
  },
  activated () {

  },
  mounted () {
    this.isrequired = false
    this.getpresentsituation()
    if (this.types == 1) {
      this.formName = this.thisP.fatherForm
    } else {
      this.formName = this.thisP.motherForm
    }
    this.serioushvalserioushval = this.serioushval
    this.types == 1 ? (this.titletext = '父亲') : (this.titletext = '母亲')
    this.types == 1
      ? (this.imgsrc = this.imgsrc1)
      : (this.imgsrc = this.imgsrc2)
  },
  methods: {
    // 地址传值
    setAddressFMNow (q) {
      this.$emit('setAddressFMNow', this.types)
    },
    setAddressFM () {
      this.$emit('setAddressFM', this.types)
    },
    likeOut () {
      const nowData = this.formName.getFieldsValue()
      if (nowData.sameAddress == []) {} else {
        this.formName.setFieldsValue({
          sameAddress: []
        })
      }
    },
    likeaddress (q) {
      const data = this.formName.getFieldsValue()
      this.$nextTick(() => {
        if (q == '1') {
          let arrs = []
          if (data.censusRegister != undefined) {
            arrs = [...data.censusRegister]
          }
          this.thisP.addressFMModelNow = arrs
          this.formName.setFieldsValue({
            currentAddress: arrs
          })
          this.formName.setFieldsValue({
            currentAddressDetail: data.censusRegisterDetail ? data.censusRegisterDetail : ''
          })
        } else {

        }
      })
    },

    familyCome (v) {
      if (v[v.length - 1] == '5' && this.types == 1) {
        (v = ['5']),
        this.$nextTick(() => {
          this.thisP.fatherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          }),
          (this.familyBreadwinners = true),
          this.thisP.setHeight('ktone', 'ktoneout')
        })
      } else if (this.types == 1 && v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }
        this.$nextTick(() => {
          this.thisP.fatherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          }),
          (this.familyBreadwinners = false),
          this.thisP.setHeight('ktone', 'ktoneout')
        })
      }
      if (v[v.length - 1] == '5' && this.types == 2) {
        (v = ['5']),
        this.$nextTick(() => {
          this.thisP.motherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          }),
          (this.familyBreadwinners = true),
          this.thisP.setHeight('ktone', 'ktoneout')
        })
      } else if (this.types == 2 && v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }
        this.$nextTick(() => {
          this.thisP.motherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          }),
          (this.familyBreadwinners = false),
          this.thisP.setHeight('ktone', 'ktoneout')
        })
      }
    },
    onChangeFM (e) {
      if (this.types === '1') {
        this.thisP.fatherForm.setFieldsValue({
          disabledType: [],
          healthStatusOther: ''
        })
      } else {
        this.thisP.motherForm.setFieldsValue({
          disabledType: [],
          healthStatusOther: ''
        })
      }
      this.thisP.serioushvals(false, this.types)
      this.thisP.heathvals(e, this.types)
      this.thisP.getdisabiliytype(e.target.value, this.types)
      this.thisP.setHeight('ktone', 'ktoneout')
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
            if (this.types == '1') {
              this.thisP.fatherForm.setFieldsValue({
                disabledType: arr
              })
            } else {
              this.thisP.motherForm.heathForm.setFieldsValue({
                disabledType: arr
              })
            }
          })
        }
        if (
          val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = [...val]
          arr.shift()
          this.$nextTick(() => {
            if (this.types == '1') {
              this.thisP.fatherForm.setFieldsValue({
                disabledType: arr
              })
            } else {
              this.thisP.motherForm.heathForm.setFieldsValue({
                disabledType: arr
              })
            }
          })
        }
      }
      this.thisP.setHeight('ktone', 'ktoneout')
    },

    ismanChange (val) {
      const arr = []
      arr.push(val[val.length - 1])
      this.$emit('update:isman', arr)
    },
    // 字典
    async getpresentsituation () {
      this.presentsituationlist = await this.getDictionaries(
        'PRESENTSITUATION'
      )
      this.familyComeList = await this.getDictionaries('FAMILYSOURCEINCOME')
    },
    inpchanges (e) {

    },
    zkChange (e) {
      this.$emit('zkChange', e.target.value, this.types)
    }
  },
  watch: {

    isman (val) {
      this.copyisman = [...val]
      if (val.length == 0) {
        this.$emit('update:isrequired', true)
      } else {
        if (!val[0]) {
          this.$emit('update:isrequired', true)
        } else {
          if (this.types != val[val.length - 1]) {
            this.$emit('update:isrequired', false)
          } else {
            this.$emit('update:isrequired', true)
          }
        }
      }
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
