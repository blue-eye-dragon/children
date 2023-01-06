<template>
  <ta-row>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="申请人"
                      fieldDecoratorId="applyPersonName"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorOptions="isSanju&&!isChange?verificationRules('申请人姓名',72):verificationRulesNotMustFill('申请人姓名',72)">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入申请人姓名'" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="申请人联系电话"
                      fieldDecoratorId="contactPhone"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorOptions="isSanju&&!isChange?verificationRules('申请人联系电话', { type: 'phone' }):verificationRulesNotMustFill('申请人联系电话', { type: 'phone' })">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入申请人联系电话'" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="relationshipValue==Enum.RELATION.QT?4:8">
        <ta-form-item label="申请人与儿童关系"
                      :labelCol="{span:relationshipValue==Enum.RELATION.QT?14:7}"
                      :wrapperCol="{span:relationshipValue==Enum.RELATION.QT?10:17}"
                      fieldDecoratorId="relationship">
          <ta-select :disabled="disabled"
                     :placeholder="disabled?'':'请选择申请人与儿童关系'"
                     v-model="relationshipValue">
            <ta-select-option v-for="item in relationshipList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="4"
              v-if="relationshipValue==Enum.RELATION.QT">
        <ta-form-item label
                      fieldDecoratorId="relationshipOther"
                      :wrapperCol="{span:24}"
                      :fieldDecoratorOptions="isSanju&&!isChange?verificationRules('其他关系',50):verificationRulesNotMustFill('其他关系',50)">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入其他关系'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="申请人身份证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorId="'idCard'"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: isSanju&&!isChange, message: '请输入申请人身份证号' },{validator:idCardValid}]}">
          <ta-input :placeholder="!disabled?'请输入申请人身份证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="申请人出生日期"
                      fieldDecoratorId="birthday"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span:17}">
          <ta-input :disabled="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="申请人性别"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="sex">
          <ta-select :disabled="true">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <AddressComponent :labelwidth="{ label: 7, wrapper: 17}"
                          msg="申请人户籍地"
                          :addressmodel="addressmodel1"
                          @setaddress="setaddress('censusRegister','addressmodel1')"
                          fileldName="censusRegister"
                          arealevel="4"
                          :isRequire="false"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6"
              class="leftClass">
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :wrapperCol="{span:24}"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('详细地址',100)">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入详细地址'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <AddressComponent :labelwidth="{ label: 7, wrapper: 17}"
                          msg="申请人现住址"
                          :addressmodel="addressmodel2"
                          @setaddress="setaddress('currentAddress','addressmodel2')"
                          fileldName="currentAddress"
                          arealevel="4"
                          :isRequire="false"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6"
              class="leftClass">
        <ta-form-item label
                      fieldDecoratorId="currentAddressDetail"
                      :wrapperCol="{span:24}"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('详细地址',100)">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入详细地址'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>

<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: { AddressComponent },
  props: ['disabled', 'isChange', 'isSanju'],
  data () {
    return {
      relationshipValue: null, // 申请人与儿童关系选择的值
      relationshipList: [], // 申请人与儿童关系字典数据
      sexList: [], // 性别字典数据
      addressmodel1: [], // 申请人户籍地
      addressmodel2: [], // 申请人现住址
      id: '' // 编辑时的id
    }
  },
  mounted () {
    // 获取字典数据
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.relationshipList = await this.getDictionaries('RELATION') // 获取申请人与儿童关系字典数据
      this.sexList = await this.getDictionaries('SEX') //  获取性别字典数据
    },
    // 身份证号校验
    idCardValid (rule, value, callback) {
      const _self = this
      this.idCardValidate(rule, value, callback, _self)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndSex', sex, birth)
    },
    // 申请人户籍地/现住址赋值
    setaddress (filedName, fieldValue) {
      this.$emit('setaddress', filedName, this[fieldValue])
    }
  }
}
</script>

<style scoped>
.leftClass {
  margin-left: 10px;
}
</style>
