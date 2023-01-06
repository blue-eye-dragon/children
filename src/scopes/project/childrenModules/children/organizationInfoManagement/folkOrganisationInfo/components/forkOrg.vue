<template>
  <div>
    <ta-row>

      <ta-col :span="24">
        <ta-col :span="8">
          <!-- area -->
          <ta-form-item label="行政区划代码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="areaCode">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item label="行政区划id"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        hidden
                        fieldDecoratorId="areaId">
            <ta-input :disabled="true"
                      :placeholder="'选床位数范围'" />
          </ta-form-item>

        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="统一社会信用代码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('统一社会信用代码',18)"
                        fieldDecoratorId="unifyTheSocialCreditCode">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入统一社会信用代码'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="组织单位编码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('组织单位编码',18)"
                        fieldDecoratorId="orgCode">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入组织单位编码'" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="机构名称"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('机构名称',72)"
                        fieldDecoratorId="orgName">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入机构名称'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="机构注册性质"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择业机构注册性质'}"
                        fieldDecoratorId="orgRegistered">
            <ta-select :disabled="disabled"
                       :placeholder="'请输入机构注册性质'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in orgRegisteredList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="注册地址"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('注册地址',100)"
                        fieldDecoratorId="registeredAddress">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入注册地址'" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="实际经营地址"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('实际经营地址',100)"
                        fieldDecoratorId="realityAddress">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入实际经营地址'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="注册业务范围"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('注册业务范围',100)"
                        fieldDecoratorId="registeredScope">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入注册业务范围'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="实际业务范围"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('实际业务范围',18)"
                        fieldDecoratorId="realityScope">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入实际业务范围'" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="法定代表人"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('法定代表人',72)"
                        fieldDecoratorId="corporation">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入法定代表人'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="法定代表人身份证号码"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('法定代表人身份证号码',{type: 'idCard'})"
                        fieldDecoratorId="corporation1">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入法定代表人身份证号码'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="法人联系电话"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.phoneRule(true,'法人联系电话')"
                        fieldDecoratorId="corporationTel">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入法人联系电话'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="注册资金(万元)"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="registeredFund"
                        :require="{message:'请输入注册资金'}">
            <ta-input-number :disabled="disabled"
                             :placeholder="'请输入注册资金'"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="资金来源"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择资金来源'}"
                        fieldDecoratorId="capitalSource">
            <ta-select :disabled="disabled"
                       :placeholder="'请选择资金来源'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in capitalSourceList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否有委托代养协议"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择是否有委托代养协议'}"
                        fieldDecoratorId="raisingAgreement">
            <ta-select :disabled="disabled"
                       @change="orUpload"
                       :placeholder="'请选择是否有委托代养协议'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="业务主管单位"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.verificationRules('业务主管单位',72)"
                        fieldDecoratorId="competentOrganization">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入业务主管单位'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="登记机关"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择登记机关'}"
                        fieldDecoratorId="registrationAuthority">
            <ta-select :disabled="disabled"
                       :placeholder="'请选择登记机关'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in registrationAuthorityList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="登记时间"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择登记时间'}"
                        fieldDecoratorId="registrationTime">
            <ta-date-picker :placeholder="'请选择登记时间'"
                            style="width: 100%"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="登记有效开始日期"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择登记有效开始日期'}"
                        fieldDecoratorId="validPeriodStart">
            <ta-date-picker :placeholder="'请选择登记有效开始日期'"
                            :disabledDate="disabledStartDate"
                            @openChange="handleStartOpenChange"
                            v-model="startValue"
                            style="width: 100%"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="登记有效结束日期"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择登记有效结束日期'}"
                        fieldDecoratorId="validPeriodEnd">
            <ta-date-picker :placeholder="'请选择登记有效结束日期'"
                            :disabledDate="disabledEndDate"
                            @openChange="handleEndOpenChange"
                            v-model="endValue"
                            style="width: 100%"
                            :open="endOpen"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="机构成立时间"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择机构成立时间'}"
                        fieldDecoratorId="establishTime">
            <ta-date-picker :placeholder="'请选择机构成立时间'"
                            style="width: 100%"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>

      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="传真"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.phoneRule(true,'传真')"
                        fieldDecoratorId="fax">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入传真'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="机构咨询电话"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :fieldDecoratorOptions="this.phoneRule(true,'机构咨询电话')"
                        fieldDecoratorId="hotline">
            <ta-input :disabled="disabled"
                      :placeholder="'请输入机构咨询电话'" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="咨询电话是否114可查"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择咨询电话是否114可查'}"
                        fieldDecoratorId="hotlineSearchable">
            <ta-select :disabled="disabled"
                       :placeholder="'请选择咨询电话是否114可查'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="是否属于其他组织或机构二级单位"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择是否属于其他组织或机构二级单位'}"
                        fieldDecoratorId="subjectionOther">
            <ta-select :disabled="disabled"
                       :placeholder="'前选择是否属于其他组织或机构二级单位'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="业务范围是否包括抚养儿童"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择业务范围是否包括抚养儿童'}"
                        fieldDecoratorId="raisingChild">
            <ta-select :disabled="disabled"
                       :placeholder="'请选择业务范围是否包括抚养儿童'">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesOrNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="场所权属"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择场所权属'}"
                        fieldDecoratorId="siteUseRight">
            <ta-select :disabled="disabled"
                       :placeholder="'请选择场所权属'"
                       @change=" setSiteUseRight">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in proprietorshipList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-col>

      <ta-col :span="24">
        <ta-col :span="8">
          <ta-form-item label="经营规模"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请选择经营规模'}"
                        fieldDecoratorId="raisingAgreement1">
            <ta-select :disabled="disabled"
                       :placeholder="'请选择床位数范围'"
                       @change="orUpload">
              <ta-select-option :value="0">10-50</ta-select-option>
              <ta-select-option :value="1">51-100</ta-select-option>
              <ta-select-option :value="2">101-150</ta-select-option>
              <ta-select-option :value="3">151-200</ta-select-option>
              <ta-select-option :value="4">201-250</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="实际在院人数"
                        :labelCol="{ span:7 }"
                        :wrapperCol="{span:17}"
                        :require="{message:'请输入实际在院人数'}"
                        fieldDecoratorId="houseAcreage1">
            <ta-input-number :disabled="disabled"
                             :placeholder="'请输入实际在院人数'"
                             :min="0"
                             :max='999999'
                             style="width:100%" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="8">

          <ta-form-item label="委托代养协议证明材料"
                        fieldDecoratorId="uploadFileT"
                        :labelCol="{ span: 7 }"
                        :wrapperCol="{span:17}"
                        v-if="showUpload"
                        :require="{message:'请上传委托代养协议证明材料'}">

            <ta-upload :withCredentials="true"
                       name="file"
                       :data="data_"
                       :multiple="true"
                       :action="action"
                       :fileList="orgFileList"
                       @change="handleChange"
                       @preview="confirmDownload"
                       :beforeUpload="beforeUpload">

              <ta-button v-if="!disabled">

                <ta-icon type="upload" />上传文件

              </ta-button>

            </ta-upload>

          </ta-form-item>

        </ta-col>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>

export default {
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    showUpload: {
      type: Boolean,
      required: true
    },
    orgFileList: {
      type: Array,
      required: true
    },
    thisP: { required: true }
  },
  data () {
    return {
      data_: { functionalType: '21', busiType: '21' },
      orgRegisteredList: [],
      yesOrNoList: [],
      proprietorshipList: [],
      capitalSourceList: [],
      registrationAuthorityList: [],
      startValue: null,
      endValue: null,
      endOpen: false
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
  },
  mounted () {
    this.dictionariesFrom()
  },
  methods: {
    orUpload (a) {
      this.thisP.orUpload(a)
    },
    setSiteUseRight (v) {
      this.thisP.setSiteUseRight(v)
    },
    // 附件
    handleChange (info) {
      if (this.disabled) {
        return false
      }
      if (info.file.status === 'uploading') {
        this.thisP.orgFileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('update:orgFileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.orgFileList]
          arrlist.splice(-1, 1)
          this.thisP.orgFileList = arrlist
          return false
        }
        // 上传成功
        this.thisP.orgFileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    confirmDownload (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    async dictionariesFrom () {
      // 机构注册性质
      this.orgRegisteredList = await this.getDictionaries('ORGREGISTERED')
      // 是否
      this.yesOrNoList = await this.getDictionaries('YESNO')
      // 场所权属
      this.proprietorshipList = await this.getDictionaries('SITEUSERIGHT')
      // 资金来源
      this.capitalSourceList = await this.getDictionaries('CAPITALSOURCE')
      // 登记机关
      this.registrationAuthorityList = await this.getDictionaries('REGISTRATIONAUTHORITY')
    },

    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() == endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf() || startValue.valueOf() == endValue.valueOf()
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open
    }
    // // 日期不能选择未来日期
    // disabledDate (current) {
    //   // 不能选择今天以后的日期
    //   return current > moment().endOf('day')

  }
}
</script>
