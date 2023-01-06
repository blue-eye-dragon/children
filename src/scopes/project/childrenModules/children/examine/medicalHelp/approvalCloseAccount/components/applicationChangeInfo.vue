<template>
  <div>
    <ta-row class="fromintop">
      <ta-radio-group @change="ismanChange" v-model="isman" class="radio_grops">
        <ta-col :span="12" type="flex" justify="center" align="middle">
          <div>变更前</div>
        </ta-col>
        <ta-col :span="12" type="flex" justify="center" align="middle">
          <div>变更后</div>
        </ta-col>
      </ta-radio-group>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="12">
        <ta-form-item
          label="救治病种类型"
          fieldDecoratorId="identityCategory"
          :require="{message:'请选择身份类别!'}"
        >
          <ta-select placeholder="请选择">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="救治病种名称"
          fieldDecoratorId="idCard"
          :fieldDecoratorOptions="rules.idCard"
        >
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item
          label="儿童身份类型"
          fieldDecoratorId="memberIdType"
          :require="{message:'请选择证件类型!'}"
        >
          <ta-select placeholder="请选择">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="所属福利机构"
          fieldDecoratorId="idCard"
          :fieldDecoratorOptions="rules.idCard"
        >
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item
          label="所属民政部门"
          fieldDecoratorId="idCard"
          :fieldDecoratorOptions="rules.idCard"
        >
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item label="联系人" fieldDecoratorId="idCard" :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item label="联系电话" fieldDecoratorId="idCard" :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item
          label="救治病种类型"
          fieldDecoratorId="copy_identityCategory"
          :require="{message:'请选择救治病种类型!'}"
        >
          <ta-select placeholder="请选择">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="救治病种名称"
          fieldDecoratorId="copy_idCard"
          :fieldDecoratorOptions="rules.copy_idCard"
        >
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item
          label="儿童身份类型"
          fieldDecoratorId="copy_memberIdType"
          :require="{message:'请选择证件类型!'}"
        >
          <ta-select placeholder="请选择">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled" :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="所属福利机构"
          fieldDecoratorId="copy_birthday"
          :require="{message:'请选择出生日期!'}"
        >
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item label="所属民政部门" fieldDecoratorId="copy_nation" :require="{message:'请选择民族!'}">
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item label="联系人" fieldDecoratorId="copy_nationality" :require="{message:'请选择国籍!'}">
          <ta-input placeholder="请输入" />
        </ta-form-item>
        <ta-form-item label="联系电话" fieldDecoratorId="copy_profession" :require="{message:'请选择职业!'}">
          <ta-input placeholder="请输入" />
        </ta-form-item>
      </ta-col>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="24">
        <ta-form-item
          label="变更原因"
          :fieldDecoratorOptions="rules.censusRegisterDetail"
          fieldDecoratorId="censusRegisterDetail"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
        >
          <ta-textarea placeholder="请输入" :rows="4" />
        </ta-form-item>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  name: 'applicant',
  components: {
    AddressComponent
  },
  props: {
    menaddressmodel: {
      type: Array,
      required: true
    },
    womenaddressmodel: {
      type: Array,
      required: true
    },
    applytype: {
      type: Number,
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
    }
  },
  data () {
    return {
      rules: {
        contactNumber: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入电话号码' },
            { type: 'phone', message: '请输入正确的电话号码格式' }
          ]
        },
        familyIncome: {
          validateTrigger: 'blur',
          rules: [{ required: true, message: '请输入家庭年收入' }]
        },
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { type: 'idCard', message: '请输入正确身份证号' }
          ]
        },
        copy_idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { type: 'idCard', message: '请输入正确身份证号' }
          ]
        },
        name: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入姓名' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        workUnit: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入工作单位' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        censusRegisterDetail: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入详细地址' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        opinion: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入送养人意见' },
            { max: 100, message: '最大输入100个字符' }
          ]
        }
      },
      isDisabled: false,
      fileldName: 'copy_address_Linkage',
      sameaddress: [{ label: '是', value: '1' }, { label: '否', value: '2' }],
      issameaddress: '1',
      manchecked: true,
      womenchecked: false,
      isman: 1
    }
  },
  mounted () {
    this.isman = this.applytype
  },
  methods: {
    ismanChange (e) {
      let val = e.target.value
      this.$emit('update:applytype', val)
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
  position: absolute;
  top: 20px;
  right: 140px;
}
</style>
