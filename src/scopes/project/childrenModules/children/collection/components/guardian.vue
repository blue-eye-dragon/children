<template>
  <div>
    <div class="titletop">
      <img :src="imgsrc"
           alt />
      <span>{{titletext}}</span>
    </div>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="姓名"
                      fieldDecoratorId='name'
                      :fieldDecoratorOptions="(!poit&&!isphonerule &&!isphonerule1&&types == 1)?rules.name:rules.name2"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }">
          <ta-input :placeholder="disabled?'':'请输入姓名'"
                    maxlength='72'
                    :disabled='disabled' />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :fieldDecoratorOptions="(!poit&&!isphonerule &&!isphonerule1&&types == 1)?rules.sex:rules.sex2"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }">
          <ta-select :placeholder="disabled?'':'请选择性别'"
                     :disabled='disabled'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="证件类型"
                      fieldDecoratorId="memberIdType"
                      :fieldDecoratorOptions="{rules: [{ required: (!poit&&!isphonerule &&!isphonerule1&&types == 1), message: '请选择证件类型' }]}"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }">
          <ta-select :placeholder="disabled?'':'请选择证件类型'"
                     :disabled='disabled'
                     @change="idCardTypeChange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in idCardTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="证件号码"
                      key='2'
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: !poit&&!isphonerule &&!isphonerule1&&types == 1, message: '请输入证件号码' },{validator:idCardValid}]}"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      ref="idCard">
          <ta-input :placeholder="disabled?'':'请输入证件号码'"
                    maxlength='18'
                    :disabled='disabled' />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="联系电话"
                      fieldDecoratorId='contactNumber'
                      :fieldDecoratorOptions="(!poit&&!isphonerule &&!isphonerule1&&types == 1)?rules.contactNumber:rules.contactNumber2"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }">
          <ta-input :placeholder="disabled?'':'请输入联系电话'"
                    maxlength='17'
                    oninput="value=value.replace(/[^\d]/g,'')"
                    :disabled='disabled' />
        </ta-form-item>
      </ta-col>
      <ta-col :span='12'>
        <ta-form-item label="关系"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16}"
                      fieldDecoratorId="relationship"
                      :fieldDecoratorOptions="(!poit&&!isphonerule &&!isphonerule1&&types == 1)?rules.relationship:rules.relationship2">
          <ta-select allowClear
                     collectionFilter="01,02,11"
                     :placeholder="disabled?'':'请选择关系'"
                     :disabled='disabled'
                     @change="relationshipchange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in relationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span='12'
            v-if="relationshiphide">
      <ta-form-item label="其他关系"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }"
                    fieldDecoratorId="relationshipOther"
                    :fieldDecoratorOptions="!(isphonerule ||isphonerule1) &&types == 1?rules.relationshipOther:rules.relationshipOther2">
        <ta-input :placeholder="disabled?'':'请输入其他信息'"
                  maxlength='50'
                  :disabled='disabled' />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="工作单位或家庭住址"
                    :fieldDecoratorOptions="(!poit&&!isphonerule &&!isphonerule1&&types == 1)?rules.workUnit:rules.workUnit2"
                    fieldDecoratorId="workUnit"
                    :labelCol="{ span: 8 }"
                    :wrapperCol="{ span: 16 }">
        <ta-input :placeholder="disabled?'':'请输入工作单位或家庭住址'"
                  maxlength='50'
                  :disabled='disabled' />
      </ta-form-item>
    </ta-col>
    <!-- <ta-col :span='11'
            :offset='1'
            v-if="relationshiphide">
      <ta-form-item label=""
                    fieldDecoratorId="relationshipOther"
                    :fieldDecoratorOptions="!(isphonerule ||isphonerule1) &&types == 1?rules.relationshipOther:rules.relationshipOther2"
                    :wrapperCol="{ span: 24}">
        <ta-input :placeholder="disabled?'':'请输入其他信息'"
                  maxlength='50'
                  :disabled='disabled' />
      </ta-form-item>
    </ta-col> -->
    <!-- </ta-row> -->

  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  props: {
    types: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    relationshiphide: {
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
    idCardTypeList: {
      type: Array,
      required: true
    }
  },
  components: {
    AddressComponent
  },

  data () {
    return {
      poit: false, // 机构类型载体
      titletext: '',
      imgsrc: '',
      selectRelation: null, // 与儿童关系选择的数据
      imgsrc1: require('./img/jh1.png'),
      imgsrc2: require('./img/jh2.png'),
      relationList: [],
      sexList: [],
      isvalidator: false,
      errMsg: null, // 身份证号错误信息
      rules: {
        name: this.verificationRules('姓名', 72),
        name2: this.verificationRulesNotMustFill('姓名', 72),
        idCard: this.types == 1 ? this.verificationRules('身份证号', { type: 'idCard' }) : this.verificationRulesNotMustFill('身份证号', { type: 'idCard' }),
        sex: this.verificationRules('性别'),
        sex2: { validateTrigger: 'change', rules: [{ required: false }] },
        contactNumber: this.phoneRule(true), // this.verificationRulesNotMustFill('联系电话', { type: 'phone' }),
        contactNumber2: this.phoneRule(),
        relationship: this.verificationRules('关系'),
        relationship2: { validateTrigger: 'change', rules: [{ required: false }] },
        workUnit: this.verificationRules('工作单位或家庭住址', 50),
        workUnit2: this.verificationRulesNotMustFill('工作单位或家庭住址', 50),
        relationshipOther: this.verificationRules('其他信息', 50),
        relationshipOther2: this.verificationRulesNotMustFill('其他信息', 50)
      }
    }
  },
  activated () {
    this.zkother = ''
    this.selectRelation = null
    this.poit = window.parent.indexTool.getUserInfo().orgType == '99'
  },
  mounted () {
    this.types == 1 ? (this.titletext = '监护人员一') : (this.titletext = '监护人员二')
    this.types == 1 ? this.imgsrc = this.imgsrc1 : this.imgsrc = this.imgsrc2
    this.getsex()
    this.getrelation()
  },
  methods: {
    idCardTypeChange (val) {
      const text = this.types == 1 ? 'manForm' : 'womanForm'
      this.$emit('idCardTypeValue', text)
    },
    relationshipchange (val) {
      const relationshiphide = val == this.Enum.RELATION.QT
      this.$emit('update:relationshiphide', relationshiphide)
    },
    async getsex () {
      const data = await this.getDictionaries('sex')
      this.sexList = data
    },
    async getrelation () {
      const data = await this.getDictionaries('RELATION')
      this.relationList = data
      this.relationList.splice(0, 2)
      this.relationList.splice(this.relationList.length - 3, 1)// 去掉选项
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const text = this.types == 1 ? 'manForm' : 'womanForm'
      if (!this.isvalidator) {
        callback()
      } else {
        this.$emit('idCardValid', rule, value, callback, this, text)
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
</style>
