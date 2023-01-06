<template>
  <div class="nofy">

    <div class="titletop">

      <img :src="imgsrc"
           alt />

      <span>{{titletext}}</span>

    </div>

    <ta-col :span='24'>

      <ta-col :span="12">

        <ta-form-item label="信息是否完整"
                      fieldDecoratorId="infoCase"
                      :labelCol="{ span: 12 }"
                      :wrapperCol="{ span: 12 }"
                      initValue='1'
                      :require="{message:'请选择信息是否完整!'}">

          <ta-radio-group :disabled="disabled"
                          @change="mustController">

            <ta-radio :value="item.value"
                      v-for="(item,index) in [{value:'1',label:'是'},{value:'0',label:'否'}]"
                      :key="index">{{item.label}}</ta-radio>

          </ta-radio-group>

        </ta-form-item>

      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="是否监护人"
                      :fieldDecoratorId="'isGuardian'"
                      initValue='0'
                      :fieldDecoratorOptions="rules.isGuardian"
                      :labelCol="{ span: 11 }"
                      :wrapperCol="{ span: 13 }">
          <ta-radio-group @change="isGuardianchs"
                          :disabled='isGuardiandisabled'>
            <ta-radio :value="item.value"
                      v-for="(item,index) in isInoculatedList"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
      <!-- <ta-col :span="12">

        <ta-form-item label="证明材料"
                      fieldDecoratorId="uploadFileT"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{ span: 14 }"
                      v-if="!mustTip"
                      :require="{message:'请上传证明材料'}">

          <ta-upload :withCredentials="true"
                     name="file"
                     :data="data_"
                     :multiple="true"
                     :action="action"
                     :fileList="parentlist"
                     @change="handleChange"
                     @preview="confirmDownload"
                     :beforeUpload="beforeUpload">

            <ta-button v-if="!disabled">

              <ta-icon type="upload" />上传文件

            </ta-button>

          </ta-upload>

        </ta-form-item>
        </ta-col> -->

    </ta-col>

    <ta-col :span="24">

      <ta-form-item label="证明材料"
                    fieldDecoratorId="uploadFileT"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 7 }"
                    v-if="!mustTip"
                    :require="{message:'请上传证明材料'}">

        <ta-upload :withCredentials="true"
                   name="file"
                   :data="data_"
                   :multiple="true"
                   :action="action"
                   :fileList="parentlist"
                   @change="handleChange"
                   @preview="confirmDownload"
                   :beforeUpload="beforeUpload">

          <ta-button v-if="!disabled">

            <ta-icon type="upload" />上传文件

          </ta-button>

        </ta-upload>

      </ta-form-item>

    </ta-col>
    <ta-col :span="12">

      <ta-form-item label="姓名"
                    fieldDecoratorId="name"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }"
                    :fieldDecoratorOptions="mustTip?rules.name:rules.name2">

        <ta-input maxlength='72'
                  :placeholder="disabled?'':'请输入姓名'"
                  :disabled="disabled" />

      </ta-form-item>
      <ta-form-item label="证件号码"
                    fieldDecoratorId="idCard"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{ span: 15 }"
                    v-if="mustTip!='1'"
                    :fieldDecoratorOptions="cardType=='01'?rules.idCard2:this.verificationRulesNotMustFill('证件号码',18)">

        <ta-input maxlength='20'
                  :placeholder="disabled?'':'请输入证件号码'"
                  :disabled="disabled?disabled:(cardType==0 && !isread)" />

      </ta-form-item>
      <ta-form-item label="证件号码"
                    fieldDecoratorId="idCard"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }"
                    v-else
                    :fieldDecoratorOptions="cardType=='01'?rules.idCard:this.verificationRules('证件号码',18)">

        <ta-input maxlength='20'
                  :placeholder="disabled?'':'请输入证件号码'"
                  :disabled="disabled?disabled:(cardType==0 && !isread)" />

      </ta-form-item>
      <AddressComponent :labelwidth="labelwidth"
                        :disabled="disabled"
                        :addressmodel="addressFMModel"
                        :msg="'户籍所在地'"
                        :fileldName="'censusRegisterSD'"
                        @setaddress="setAddressFM"
                        :arealevel="'4'"
                        :clearPlaceHolder='disabled'
                        @adsvalchange="likeOut"
                        :isRequire="mustTip"></AddressComponent>

      <AddressComponent :labelwidth="labelwidth"
                        :disabled="disabled"
                        :addressmodel="addressFMModelNow"
                        :msg="'现居住地址'"
                        :fileldName="'currentAddress'"
                        @setaddress="setAddressFMNow"
                        :clearPlaceHolder='disabled'
                        :arealevel="'4'"
                        @adsvalchange="likeOut"
                        :isRequire="mustTip"></AddressComponent>

    </ta-col>

    <ta-col :span="12">

      <ta-form-item label="证件类型"
                    fieldDecoratorId="memberIdType"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{ span: 15 }"
                    :fieldDecoratorOptions="mustTip?this.verificationRules('证件类型'):{rules: [{ required: false }]}">

        <ta-select allowClear
                   @change="changeCardType"
                   :placeholder="disabled?'':'请选择证件类型'"
                   :disabled="disabled">

          <ta-select-option v-for="(item,index) in cardTypeList"
                            :value="item.value"
                            :key="index">{{item.label}}</ta-select-option>

        </ta-select>

      </ta-form-item>
      <ta-form-item label="联系电话"
                    fieldDecoratorId="contactNumber"
                    :labelCol="{ span: 9}"
                    :wrapperCol="{ span: 15 }"
                    :fieldDecoratorOptions=" phoneRule(false,'联系电话')">

        <ta-input maxlength='17'
                  oninput="value=value.replace(/[^\d]/g,'')"
                  :placeholder="disabled?'':'请输入联系电话'"
                  :disabled="disabled " />

      </ta-form-item>

      <ta-col :span='17'>

        <ta-form-item label=""
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 24,offset: 1 }"
                      :fieldDecoratorOptions="mustTip?this.verificationRules('详细地址',100):this.verificationRulesNotMustFill('详细地址',100)">

          <ta-input maxlength='100'
                    :placeholder="disabled?'':'请输入详细地址'"
                    :disabled="disabled"
                    @change="likeOut" />

        </ta-form-item>

      </ta-col>

      <ta-col :span='7'>

        <ta-form-item label="同现住址"
                      fieldDecoratorId="sameAddress"
                      :fieldDecoratorOptions="{initialValue: []}"
                      :labelCol="{ span: 23 }"
                      :wrapperCol="{ span: 1 }">

          <ta-checkbox-group :options="sameaddresslist"
                             @change="likeaddress"
                             :disabled="disabled" />

        </ta-form-item>

      </ta-col>

      <ta-col :span='24'>

        <ta-form-item label=""
                      fieldDecoratorId="currentAddressDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 24,offset: 1 }"
                      :fieldDecoratorOptions="mustTip?this.verificationRules('详细地址',100):this.verificationRulesNotMustFill('详细地址',100)">

          <ta-input maxlength='100'
                    :placeholder="disabled?'':'请输入详细地址'"
                    :disabled="disabled"
                    @change="likeOut" />

        </ta-form-item>

      </ta-col>

    </ta-col>

    <ta-col :span="24">

      <ta-form-item label="健康状况"
                    fieldDecoratorId="healthStatus"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 19 }"
                    :fieldDecoratorOptions="mustTip?this.verificationRules('健康状况'):{rules: [{ required: false }]}">

        <ta-radio-group @change="onChangeFM"
                        :disabled="disabled">

          <ta-radio :value="item.value"
                    v-for="(item,index) in thisP.heathlist"
                    :key="index">{{item.label}}</ta-radio>

        </ta-radio-group>

      </ta-form-item>

      <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                    label="其他"
                    fieldDecoratorId="healthStatusOther"
                    :labelCol="{ span: 6 }"
                    :wrapperCol="{ span: 18 }"
                    :fieldDecoratorOptions="this.verificationRules('其他',50)">

        <ta-input maxlength='50'
                  :disabled="disabled"
                  :placeholder="disabled?'':'请输入其他情况'" />

      </ta-form-item>

      <div class="canji"
           v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">

        <ta-form-item label="残疾类型"
                      fieldDecoratorId="disabledType"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span:18 }"
                      :initValue="[]"
                      :require="{message:'请选择残疾类型'}">

          <ta-checkbox-group :options="disabiliytypelist"
                             @change="setMulti"
                             :disabled="disabled"
                             :values="disabilityTypeValues" />

        </ta-form-item>

        <ta-form-item label="残疾等级"
                      fieldDecoratorId="disabledLevel"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }">

          <ta-radio-group :disabled="disabled">

            <ta-radio :value="item.value"
                      v-for="(item,index) in thisP.canjileave"
                      :key="index">{{item.label}}</ta-radio>

          </ta-radio-group>

          <ta-radio-group style="float:left;"></ta-radio-group>

        </ta-form-item>

      </div>

      <!--重病-->

      <div class="canji"
           v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">

        <ta-form-item label="重病"
                      fieldDecoratorId="disabledType"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }"
                      :initValue="[]"
                      :require="{message:'请选择重病!'}">

          <ta-checkbox-group :options="disabiliytypelist"
                             :disabled="disabled"
                             @change="seriousillnesschange" />

        </ta-form-item>

        <ta-form-item v-if="serioushvalserioushval"
                      label="其他"
                      fieldDecoratorId="healthStatusOther"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }"
                      :fieldDecoratorOptions="this.verificationRules('其他',50)">

          <ta-input maxlength='50'
                    :disabled="disabled"
                    :placeholder="disabled?'':'请输入其他情况'" />

        </ta-form-item>

      </div>

      <!--慢性病-->

      <div class="canji"
           v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">

        <ta-form-item label="慢性病"
                      fieldDecoratorId="disabledType"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }"
                      :initValue="[]"
                      :require="{message:'请选择慢性病!'}">

          <ta-checkbox-group :options="disabiliytypelist"
                             :disabled="disabled"
                             @change="seriousillnesschange" />

        </ta-form-item>

        <ta-form-item v-if="serioushvalserioushval"
                      label="其他"
                      fieldDecoratorId="healthStatusOther"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }"
                      :fieldDecoratorOptions="this.verificationRules('其他',50)">

          <ta-input maxlength='50'
                    :disabled="disabled"
                    :placeholder="disabled?'':'请输入其他情况'" />

        </ta-form-item>

      </div>

    </ta-col>

  </div>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: {
    AddressComponent
  },
  props: {
    isread: {
      type: Boolean,
      required: true
    },
    types: {
      type: String,
      required: true
    },
    zkval: {
      type: String,
      required: true
    },
    familyBreadwinners: {
      type: Boolean,
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
      required: true,
      default: '0'
    },
    serioushval: {
      type: Boolean,
      required: true
    },
    isrequired: {
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
    },
    isGuardiandisabled: {
      type: Boolean,
      required: true
    },
    isphonerule: {
      type: Boolean,
      required: true
    },
    mustTip: {
      type: Boolean,
      required: true
    },
    parentlist: {
      type: Array,
      required: true
    },
    data_: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      disabilityTypeValues: [], // 残疾类别选择的数据
      labelwidth: {
        label: 10,
        wrapper: 14
      },
      //  householdRegistryClassifydisabled: false,
      // disabled: false,
      sameaddresslist: [{ label: '', value: '1' }],

      titletext: '',
      imgsrc: '',
      imgsrc1: require('./images/parentman.png'),
      imgsrc2: require('./images/parentwomen.png'),
      // zkother: '',
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
        currentSituationOther: this.verificationRules('其他情况', 100),
        currentSituationOther2: this.verificationRulesNotMustFill(
          '其他情况',
          100
        ),
        isGuardian: this.verificationRules('是否监护人'),
        isGuardian2: { validateTrigger: 'change', rules: [{ required: false }] }
      },
      copyisman: [],
      familyComeList: [],
      cardTypeList: [],
      serioushvalserioushval: false,
      cardType: '0',
      judge: false,
      isInoculatedList: []

    }
  },
  activated () {
    this.disabilityTypeValues = []
    this.cardType = '0'
  },
  mounted () {
    this.getpresentsituation()
    this.getYESNO()
    this.serioushvalserioushval = this.serioushval
    this.types == 1 ? (this.titletext = '父亲') : (this.titletext = '母亲')
    this.types == 1
      ? (this.imgsrc = this.imgsrc1)
      : (this.imgsrc = this.imgsrc2)
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
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
    // 附件
    handleChange (info) {
      if (this.disabled) {
        return false
      }
      if (info.file.status === 'uploading') {
        this.$emit('update:parentlist', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('update:parentlist', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.parentlist]
          arrlist.splice(-1, 1)
          this.$emit('update:parentlist', arrlist)
          return false
        }
        // 上传成功
        this.$emit('update:parentlist', info.fileList)
        this.$message.success('文件上传成功!')
      }
    },
    confirmDownload (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // en

    //  @click="deuRadio(item.value,'healthStatus',types)"
    // deuRadio (v, a, b) {
    //   if (b == 1) {
    //     if (a == 'healthStatus') {
    //       if (v == this.thisP.fatherForm.getFieldsValue().healthStatus) {
    //         this.thisP.fatherForm.setFieldsValue({healthStatus: ''})
    //       }
    //     }
    //   }
    // },
    mustController (v) {
      const status = (v.target.value == '1')
      this.thisP.mustTipchange(status, this.types)
      if (this.types == 1) {
        this.thisP.heathvalF = v.target.value
      } else {
        this.thisP.heathvalM = v.target.value
      }
      
    },
    idCardValidate (rule, value, callback) {
      if (this.mustTip) {
        if (this.cardType == '01') {
          callback(this.verificationRules('证件号码', { type: 'idCard' }))
        } else {
          callback(this.verificationRules('证件号码', 18))
        }
      } else {
        if (this.cardType == '01') {
          callback(this.verificationRulesNotMustFill('证件号码', { type: 'idCard' }))
        } else {
          callback(this.verificationRulesNotMustFill('证件号码', 18))
        }
      }
    },

    changeCardType (v) {
      this.cardType = v
      if (v == undefined) {
        this.cardType = 0
        if (this.types == 1) {
          this.$nextTick(() => {
            this.thisP.fatherForm.setFieldsValue({
              idCard: ''
            })
          })
        } else {
          this.$nextTick(() => {
            this.thisP.motherForm.setFieldsValue({
              idCard: ''
            })
          })
        }
      }
    },
    // 地址传值
    setAddressFMNow () {
      // this.$emit('setAddressFMNow', this.types)
      this.$nextTick(() => {
        if (this.types == 1) { this.$emit('setAddressFNow') } else { this.$emit('setAddressMNow') }
      })
    },
    setAddressFM () {
      this.$nextTick(() => {
        if (this.types == 1) { this.$emit('setAddressF') } else { this.$emit('setAddressM') }
      })
    },
    isGuardianchs (e) {
      console.log(e.target.value, 753)
      this.$emit('update:isphonerule', e.target.value == 1)
      this.thisP.otherManForm.resetFields()
    },
    // 获取是否监护人
    async getYESNO () {
      const data = await this.getDictionaries('YESNO')
      this.isInoculatedList = data
    },
    likeOut () {
      let formName = []
      if (this.types == 1) {
        formName = this.thisP.fatherForm
      } else {
        formName = this.thisP.motherForm
      }
      const nowData = formName.getFieldsValue()
      if (nowData.sameAddress == []) { } else {
        formName.setFieldsValue({
          sameAddress: []
        })
      }
    },
    likeaddress (q) {
      let formName = []

      if (this.types == 1) {
        formName = this.thisP.fatherForm
      } else {
        formName = this.thisP.motherForm
      }
      const data = formName.getFieldsValue()
      this.$nextTick(() => {
        if (q == '1') {
          let arrs = []
          if (data.censusRegisterSD != undefined) {
            arrs = [...data.censusRegisterSD]
          }
          if (this.types == 1) {
            this.thisP.addressFMModelNow1 = arrs
          } else {
            this.thisP.addressFMModelNow2 = arrs
          }
          formName.setFieldsValue({
            currentAddress: arrs
          })
          formName.setFieldsValue({
            currentAddressDetail: data.censusRegisterDetail
              ? data.censusRegisterDetail
              : ''
          })
        } else { }
      })
    },

    familyCome (v) {
      this.thisP.familyCome(v, this.types)
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
      this.cardTypeList = await this.getDictionaries('IDCARD_TYPE')
    },
    inpchanges (e) { },
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
