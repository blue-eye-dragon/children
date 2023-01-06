<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="12">
        <ta-form-item label="儿童类别"
                      fieldDecoratorId="childType">
          <ta-select placeholder="请选择儿童类别"
                     :disabled='true'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in childTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name">
          <ta-input placeholder="请输入儿童姓名"
                    :disabled='true' />
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard">
          <ta-input placeholder="请输入身份证号"
                    :disabled='true' />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation">
          <ta-select placeholder="请选择民族"
                     :disabled='true'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="登记（入院）日期"
                      fieldDecoratorId="registerDate">
          <ta-date-picker :disabled='true'
                          style="width: 100%;"
                          format="YYYY-MM-DD"
                          placeholder="请选择登记（入院）日期" />
        </ta-form-item>
        <!-- <ta-form-item label="残疾类型"
                      fieldDecoratorId="disabilityType">
          <ta-select placeholder="请选择残疾类型" 
                     :disabled='true'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in disabilityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item> -->
        <ta-form-item label="建议安置类型"
                      fieldDecoratorId="suggestedPlacementType">
          <ta-select placeholder="请选择建议安置类型"
                     :disabled='true'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in resettlementList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="首次寄养日期"
                      fieldDecoratorId="firstFosterDate"
                      :fieldDecoratorOptions="rules.firstFosterDate">
          <ta-date-picker style="width: 100%;"
                          :valid-now-time="'right'"
                          :disabled='basedisabled'
                          format="YYYY-MM-DD"
                          placeholder="请选择首次寄养日期" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber">
          <ta-input placeholder="请输入儿童编号"
                    :disabled='true' />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex">
          <ta-select placeholder="请选择性别"
                     :disabled="true">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday">
          <ta-date-picker style="width: 100%;"
                          :disabled='true'
                          format="YYYY-MM-DD"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="所属福利机构"
                      fieldDecoratorId="sffiliatedWelfareInstitution">
          <ta-input placeholder="请输入所属福利机构"
                    :disabled='true' />
          <!-- <ta-select placeholder="请选择所属福利机构"  :disabled='basedisabled'>
            <ta-select-option
              :value="item.value"
              v-for="(item,index) in sexList"
              :key="index"
            >{{item.label}}</ta-select-option>
          </ta-select> -->
        </ta-form-item>
        <ta-form-item label="患病类型"
                      fieldDecoratorId="illnessType">
          <ta-select placeholder="请选择患病类型"
                     mode="multiple"
                     :disabled='true'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in illnessList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="工学情况"
                      fieldDecoratorId="workStudy">
          <ta-select placeholder="请选择工学情况"
                     :disabled='true'>
            <ta-select-option :value="item.value"
                              v-for="(item,index) in workstudyList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="残疾类别"
                      class='alonerow'
                      fieldDecoratorId="disabilityType"
                      :fieldDecoratorOptions="{initialValue: []}">
          <ta-checkbox-group class="grant-checkbox"
                             :disabled="true"
                             :options="disabilityList">
          </ta-checkbox-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="12">
          <AddressComponent :disabled='true'
                            msg="户籍所在地"
                            :isRequire="false"
                            :addressmodel="addressmodel"
                            @setaddress="setaddress"></AddressComponent>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input placeholder="请输入详细地址"
                      :disabled='true' />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="特殊需求"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 21 }"
                        fieldDecoratorId="specialRequire"
                        :fieldDecoratorOptions="rules.specialRequire">
            <ta-textarea placeholder="请输入特殊需求"
                         :rows="4"
                         :disabled='basedisabled' />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="康复与教育目标"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 21 }"
                        fieldDecoratorId="recureAndEduGoal"
                        :fieldDecoratorOptions="rules.recureAndEduGoal">
            <ta-textarea placeholder="请输入康复与教育目标"
                         :rows="4"
                         :disabled='basedisabled' />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="康复医师"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 21 }"
                        fieldDecoratorId="majorDoctor"
                        :fieldDecoratorOptions="rules.majorDoctor">
            <ta-textarea placeholder="请输入康复医师"
                         :rows="4"
                         :disabled='basedisabled' />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="备注"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 21 }"
                        fieldDecoratorId="remarks"
                        :fieldDecoratorOptions="rules.remarks">
            <ta-textarea placeholder="请输入备注"
                         :rows="4"
                         :disabled='basedisabled' />
          </ta-form-item>
        </ta-col>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  props: {
    addressmodel: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    },
    sptdisabled: {
      type: Boolean,
      required: true
    }
  },
  components: {
    AddressComponent
  },
  data () {
    return {
      rules: {
        childType: this.verificationRules('儿童类别'),
        name: this.verificationRules('姓名', 50),
        idCard: this.verificationRulesNotMustFill('身份证号', { type: 'idCard' }),
        nation: this.verificationRules('民族'),
        registerDate: this.verificationRules('登记（入院）日期', true),
        disabilityType: this.verificationRules('残疾类型'),
        suggestedPlacementType: this.verificationRules('建议安置类型'),
        childNumber: this.verificationRules('儿童编号', 32),
        sex: this.verificationRules('儿童性别'),
        birthday: this.verificationRules('出生日期', true),
        sffiliatedWelfareInstitution: this.verificationRules('所属福利机构'),
        illnessType: this.verificationRules('患病类型'),
        workStudy: this.verificationRules('工学情况'),
        firstFosterDate: this.verificationRules('首次寄养日期', true),
        specialRequire: this.verificationRulesNotMustFill('特殊需求', 200, true),
        recureAndEduGoal: this.verificationRules('康复与教育目标', 200, false),
        majorDoctor: this.verificationRulesNotMustFill('康复医师', 72, true),
        remarks: this.verificationRulesNotMustFill('备注', 200, true)
      },
      nationList: [],
      sexList: [],
      childTypeList: [],
      disabilityList: [],
      resettlementList: [],
      illnessList: [],
      workstudyList: [],
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('12.6%', '87.4%', 'alonerow') // 单独一行字段宽度控制
  },
  mounted () {
    this.getnation()
    this.getsex()
    this.getchildType()
    this.getdisability()
    this.getresettlement()
    this.getillness()
    this.getworkstudy()
  },
  methods: {
    setaddress () {
      this.$emit('setaddress')
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // // CHILDCATEGORYA
    async getchildType () {
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
    },

    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },

    // 残疾类型DISABILITYTYPE
    async getdisability () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilityList = data
    },
    // 建议安置类型 RESETTLEMENTTYPE
    async getresettlement () {
      let data = await this.getDictionaries('RESETTLEMENTTYPE')
      this.resettlementList = data
    },
    // ILLNESSTYPE 患病类型
    async getillness () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnessList = data
    },
    // WORKSTUDY 工学
    async getworkstudy () {
      let data = await this.getDictionaries('WORKSTUDY')
      this.workstudyList = data
    }
  }
}
</script>
<style scoped lang="less">
</style>
