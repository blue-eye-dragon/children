<template>
  <div>
    <ta-row class="fromintop">
      <ta-radio-group class="radio_grops">
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
          fieldDecoratorId="copy_rescueDiseaseType"
          :require="{message:'请选择救治病种类型!'}"
          v-if="rescueDiseaseTypeVisible[0]"
        >
          <ta-select placeholder="请选择救治病种类型" style="width : 100%" :disabled="true">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in diseasetypeList "
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="是否加入医保"
          v-if="whetherAddmedicalInsuranceVisible[0]"
          fieldDecoratorId="copy_whetherAddmedicalInsurance"
          :require="{message:'请选择是否加入医保!'}"
        >
          <ta-select placeholder="请选择是否加入医保" style="width : 100%" :disabled="true">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in yesnoList "
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="救治病种名称"
          fieldDecoratorId="copy_rescueDiseaseName"
          :require="{message:'请输入救治病种名称!'}"
          v-if="rescueDiseaseNameVisible[0]"
        >
          <ta-input placeholder="请输入救治病种名称" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="儿童身份类型"
          fieldDecoratorId="copy_childIdentityType"
          :require="{message:'请选择儿童身份类型!'}"
          v-if="childIdentityTypeVisible[0]"
        >
          <ta-select placeholder="请选择儿童身份类型" :disabled="true" style="width : 100%">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in childidentitytypeList "
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="联系人"
          fieldDecoratorId="copy_contact"
          v-if="contactVisible[0]"
          :require="{message:'请输入联系人!'}"
        >
          <ta-input placeholder="请输入联系人" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="联系电话"
          fieldDecoratorId="copy_contactTelephone"
          :require="{message:'请输入联系电话!'}"
          v-if="contactTelephoneVisible[0]"
        >
          <ta-input placeholder="请输入联系电话" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="所属福利机构"
          v-if="belongToOrgVisible[0]"
          fieldDecoratorId="copy_belongToOrg"
          :require="{message:'请输入所属福利机构!'}"
        >
          <ta-input placeholder="请输入所属福利机构" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="进入福利机构日期"
          v-if="intoCivilAdministrationDateVisible[0]"
          fieldDecoratorId="copy_intoCivilAdministrationDate"
          :require="{message:'请选择进入福利机构日期!'}"
        >
          <ta-date-picker
            style="width: 100%;"
            :disabled="true"
            :valid-now-time="'right'"
            placeholder="请选择进入民政部门日期"
          />
        </ta-form-item>
        <ta-form-item
          label="所属民政部门"
          v-if="civilAdministrationDepartmentVisible[0]"
          fieldDecoratorId="copy_civilAdministrationDepartment"
          :require="{message:'请输入所属民政部门!'}"
        >
          <ta-input placeholder="请输入所属民政部门" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="进入民政部门日期"
          v-if="intoCivilAdministrationDateVisible[0]"
          fieldDecoratorId="copy_intoCivilAdministrationDate"
          :require="{message:'请选择进入民政部门日期!'}"
        >
          <ta-date-picker
            style="width: 100%;"
            :disabled="true"
            :valid-now-time="'right'"
            placeholder="请选择进入民政部门日期"
          />
        </ta-form-item>
        <ta-form-item
          label="家庭人均年收入(元)"
          v-if="familyAverageAnnualIncomeVisible[0]"
          fieldDecoratorId="copy_familyAverageAnnualIncome"
          :require="{message:'请输入家庭人均年收入!'}"
        >
          <ta-input placeholder="请输入家庭人均年收入" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="家庭说明"
          v-if="familyExplainVisible[0]"
          :labelCol="{ span: 6 }"
          :wrapperCol="{ span: 18 }"
          fieldDecoratorId="copy_familyExplain"
          :require="{message:'请输入家庭说明!'}"
        >
          <ta-textarea placeholder="请输入家庭说明" :disabled="true" :rows="2" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item
          label="救治病种类型"
          fieldDecoratorId="rescueDiseaseType"
          :require="{message:'请选择救治病种类型!'}"
          v-if="rescueDiseaseTypeVisible[0]"
        >
          <ta-select placeholder="请选择救治病种类型" style="width : 100%" :disabled="true">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in diseasetypeList "
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
        v-if="whetherAddmedicalInsuranceVisible[0]"
          label="是否加入医保"
          fieldDecoratorId="whetherAddmedicalInsurance"
          :require="{message:'请选择是否加入医保!'}"
        >
          <ta-select placeholder="请选择是否加入医保" style="width : 100%" :disabled="true">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in yesnoList "
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="救治病种名称"
          fieldDecoratorId="rescueDiseaseName"
          :require="{message:'请输入救治病种名称!'}"
          v-if="rescueDiseaseNameVisible[0]"
        >
          <ta-input placeholder="请输入救治病种名称" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="儿童身份类型"
          fieldDecoratorId="childIdentityType"
          :require="{message:'请选择儿童身份类型!'}"
          v-if="childIdentityTypeVisible[0]"
        >
          <ta-select placeholder="请选择儿童身份类型" :disabled="true" style="width : 100%">
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in childidentitytypeList "
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item
          label="联系人"
          fieldDecoratorId="contact"
          v-if="contactVisible[0]"
          :require="{message:'请输入联系人!'}"
        >
          <ta-input placeholder="请输入联系人" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="联系电话"
          fieldDecoratorId="contactTelephone"
          :require="{message:'请输入联系电话!'}"
          v-if="contactTelephoneVisible[0]"
        >
          <ta-input placeholder="请输入联系电话" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="所属福利机构"
          v-if="belongToOrgVisible[0]"
          fieldDecoratorId="belongToOrg"
          :require="{message:'请输入所属福利机构!'}"
        >
          <ta-input placeholder="请输入所属福利机构" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="进入福利机构日期"
          v-if="intoCivilAdministrationDateVisible[0]"
          fieldDecoratorId="intoCivilAdministrationDate"
          :require="{message:'请选择进入福利机构日期!'}"
        >
          <ta-date-picker
            style="width: 100%;"
            :disabled="true"
            :valid-now-time="'right'"
            placeholder="请选择进入民政部门日期"
          />
        </ta-form-item>
        <ta-form-item
          label="所属民政部门"
          v-if="civilAdministrationDepartmentVisible[0]"
          fieldDecoratorId="civilAdministrationDepartment"
          :require="{message:'请输入所属民政部门!'}"
        >
          <ta-input placeholder="请输入所属民政部门" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="进入民政部门日期"
          v-if="intoCivilAdministrationDateVisible[0]"
          fieldDecoratorId="intoCivilAdministrationDate"
          :require="{message:'请选择进入民政部门日期!'}"
        >
          <ta-date-picker
            style="width: 100%;"
            :disabled="true"
            :valid-now-time="'right'"
            placeholder="请选择进入民政部门日期"
          />
        </ta-form-item>
        <ta-form-item
          label="家庭人均年收入(元)"
          v-if="familyAverageAnnualIncomeVisible[0]"
          fieldDecoratorId="familyAverageAnnualIncome"
          :require="{message:'请输入家庭人均年收入!'}"
        >
          <ta-input placeholder="请输入家庭人均年收入" :disabled="true" />
        </ta-form-item>
        <ta-form-item
          label="家庭说明"
          v-if="familyExplainVisible[0]"
          :labelCol="{ span: 6 }"
          :wrapperCol="{ span: 18 }"
          fieldDecoratorId="familyExplain"
          :require="{message:'请输入家庭说明!'}"
        >
          <ta-textarea placeholder="请输入家庭说明" :disabled="true" :rows="2" />
        </ta-form-item>
      </ta-col>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="24">
        <ta-form-item
          label="变更原因"
          fieldDecoratorId="changeReason"
          :labelCol="{ span: 3 }"
          :wrapperCol="{ span: 21 }"
        >
          <ta-textarea placeholder="" :rows="4" :disabled="true" />
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
  data () {
    return {
      isDisabled: false,
      fileldName: 'copy_address_Linkage',
      sameaddress: [{ label: '是', value: '1' }, { label: '否', value: '2' }],
      issameaddress: '1',
      manchecked: true,
      womenchecked: false,
      isman: 1,
      diseasetypeList: [],
      childidentitytypeList: [],
      yesnoList: [],
      rescueDiseaseTypeVisible: [false, '救治病种类型'],
      rescueDiseaseNameVisible: [false, '救治病种名称'],
      childIdentityTypeVisible: [false, '儿童身份类型'],
      contactVisible: [false, '联系人'],
      contactTelephoneVisible: [false, '联系电话'],
      belongToOrgVisible: [false, '所属福利机构'],
      intoCivilAdministrationDateVisible: [false, '进入福利机构日期'],
      civilAdministrationDepartmentVisible: [false, '所属民政部门'],
      intoCivilAdministrationDateVisible: [false, '进入民政部门日期'],
      address_LinkageVisible: [false, '户籍所在地'],
      familyAverageAnnualIncomeVisible: [false, '家庭人均年收入(元)'],
      familyExplainVisible: [false, '家庭说明'],
      applyDateVisible: [false, '申请日期'],
      whetherAddmedicalInsuranceVisible: [false, '是否加入低保'],
      changeReasonVisible: [false, '变更原因'],
      upLoadPathIdVisible: [false, '附件']
    }
  },
  activated () {
    this.getdiseasetypeList()
    this.getchildidentitytypeList()
    this.getyesnoList()
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
    },
    // 救治病种类型
    async getdiseasetypeList () {
      let data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },
    // 儿童身份类型
    async getchildidentitytypeList () {
      let data = await this.getDictionaries('CHILDIDENTITYTYPE')
      this.childidentitytypeList = data
    },
    // 是否
    async getyesnoList () {
      let data = await this.getDictionaries('YESNO')
      this.yesnoList = data
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
