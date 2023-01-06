<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="行政区划代码"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="areaCode">
        <ta-input placeholder="请输入行政区划代码"
                  :disabled="true" />
      </ta-form-item>
      <ta-form-item label="组织单位编码"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('组织单位编码',18)"
                    fieldDecoratorId="orgCode">
        <ta-input placeholder="请输入组织单位编码"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="机构名称"
                    hidden
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="orgName">
        <ta-input :disabled="true" />
      </ta-form-item>
      <ta-form-item label="登记机关"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="registerOrg"
                    :require="{message:'请选择登记机关'}">
        <ta-select placeholder="请选择登记机关"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in registerOrg"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="营业执照颁发日期"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="businessLicenseIssueDate"
                    :require="{message:'请选择营业执照颁发日期'}">
        <ta-date-picker style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="disabled"
                        placeholder="请选择营业执照颁发日期"
                        :disabledDate="disabledDate" />
      </ta-form-item>
      <ta-form-item label="院址"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="address"
                    :fieldDecoratorOptions="rules.address">
        <ta-input placeholder="请输入院址"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="咨询电话"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="tel"
                    :fieldDecoratorOptions="this.phoneRule(true,'请输入咨询电话')">
        <ta-input placeholder="请输入咨询电话"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="传真"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="fax"
                    :fieldDecoratorOptions="this.phoneRule(true,'请输入传真')">
        <ta-input placeholder="请输入传真"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="负责人"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="responsiblePerson"
                    :fieldDecoratorOptions="this.verificationRules('负责人',72)">
        <ta-input placeholder="请输入负责人"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="申办人"
                    hidden
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="orgEstablishBidPerson">
        <ta-input :disabled="true" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="统一社会信用代码"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    :fieldDecoratorOptions="this.verificationRulesNotMustFill('统一社会信用代码',18)"
                    fieldDecoratorId="unifiedSocialCreditCode">
        <ta-input placeholder="请输入统一社会信用代码"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="机构类型"
                    hidden
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="orgType">
        <ta-select :disabled="true">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in orgType"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="机构性质"
                    hidden
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="orgNature">
        <ta-select placeholder="请选择机构性质"
                   :disabled="true">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in orgNature"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="成立日期"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="foundDate"
                    :require="{message:'请选择成立日期'}">
        <ta-date-picker style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="disabled"
                        placeholder="请选择成立日期"
                        :disabledDate="disabledDate" />
      </ta-form-item>
      <ta-form-item label="营业执照失效日期"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="businessLicenseExpirationDate"
                    :require="{message:'请选择营业执照失效日期'}">
        <ta-date-picker style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="disabled"
                        placeholder="请选择营业执照失效日期" />
      </ta-form-item>
      <ta-form-item label="邮政编码"
                    fieldDecoratorId="postCode"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    :fieldDecoratorOptions="{validateTrigger: ['change', 'blur'],rules: [{ required: true,message:'' },{validator: fnValidatePostCode}]}">
        <ta-input placeholder="请输入邮政编码"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="咨询电话是否114可查"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="call114ForConsultationYOrN"
                    :require="{message:'请选择咨询电话是否114可查'}">
        <ta-select placeholder="请选择咨询电话是否114可查"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="业务范围是否包括抚养儿童"
                    :labelCol="{span:10}"
                    :wrapperCol="{span:14}"
                    fieldDecoratorId="businessScopeIncludesChildRearingYOrN"
                    :require="{message:'请选择业务范围是否包括抚养儿童'}">
        <ta-select placeholder="请选择业务范围是否包括抚养儿童"
                   :disabled="disabled">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in yesorno"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="负责人联系电话"
                    :labelCol="{ span: 8}"
                    :wrapperCol="{ span: 16}"
                    :fieldDecoratorOptions="this.verificationRules('电话号码', { type: 'phone' })"
                    fieldDecoratorId="contactNumber">
        <ta-input placeholder="请输入负责人联系电话"
                  :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="申请日期"
                    hidden
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}"
                    fieldDecoratorId="orgEstablishBidDate">
        <ta-date-picker style="width: 100%;"
                        format="YYYY-MM-DD"
                        :disabled="true"
                        placeholder="请选择申请日期" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="财务是否民政部门接管"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="civilAdministrationDepartmentTakeOverYOrN"
                      :require="{message:'请选择财务是否民政部门接管'}">
          <ta-select placeholder="请选择财务是否民政部门接管"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in yesorno"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="是否社会福利机构"
                      :labelCol="{span:8}"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="isSocialWelfareOrg"
                      :fieldDecoratorOptions="{initialValue: '0'}">
          <ta-select placeholder="请选择是否社会福利机构"
                     @change="changeSocialWelfareOrg"
                     :disabled="disabled">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in yesorno"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="申领报告"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">

        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="claimReport"
                   :fileList="claimReportfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('claimReportfileList',$event)"
                   @change="handleChangeclaimReport">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="场所所有权证明或租用合同"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="siteOwnership"
                   :fileList="siteOwnershipfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('siteOwnershipfileList',$event)"
                   @change="handleChangesiteOwnership">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="验资证明或资产评估报告"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="capitalVerification"
                   :fileList="capitalVerificationfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('capitalVerificationfileList',$event)"
                   @change="handleChangecapitalVerification">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="机构章程和规章制度"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="institutional"
                   :fileList="institutionalfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('institutionalfileList',$event)"
                   @change="handleChangeinstitutional">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="其他材料"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="otherInformation"
                   :fileList="otherInformationfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('otherInformationfileList',$event)"
                   @change="handleChangeotherInformation">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="筹办批准书"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="approvalOfOrganization"
                   :fileList="approvalOfOrganizationfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('approvalOfOrganizationfileList',$event)"
                   @change="handleChangeapprovalOfOrganization">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="建设、消防等部门验收报告或意见书"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="construction"
                   :fileList="constructionfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('constructionfileList',$event)"
                   @change="handleChangeconstruction">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="申办人证明文件"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="shenbanren"
                   :fileList="shenbanrenfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('shenbanrenfileList',$event)"
                   @change="handleChangeshenbanren">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
      <ta-form-item label="主要工作人员登记表、身份及健康证明"
                    :labelCol="{span:8}"
                    :wrapperCol="{span:16}">
        <ta-upload :withCredentials="true"
                   :multiple="true"
                   name="file"
                   :action="action"
                   :data="keyPersonnel"
                   :fileList="keyPersonnelfileList"
                   @preview="preview"
                   :beforeUpload="beforeUpload"
                   @remove="handleRemove('keyPersonnelfileList',$event)"
                   @change="handleChangekeyPersonnel">
          <ta-button :disabled="disabled">
            <ta-icon type="upload" /> 上传
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      claimReport: {
        functionalType: '3',
        busiType: '18'
      },
      siteOwnership: {
        functionalType: '3',
        busiType: '19'
      },
      capitalVerification: {
        functionalType: '3',
        busiType: '20'
      },
      institutional: {
        functionalType: '3',
        busiType: '21'
      },
      otherInformation: {
        functionalType: '3',
        busiType: '17-17'
      },
      approvalOfOrganization: {
        functionalType: '3',
        busiType: '22'
      },
      construction: {
        functionalType: '3',
        busiType: '23'
      },
      shenbanren: {
        functionalType: '3',
        busiType: '24'
      },
      keyPersonnel: {
        functionalType: '3',
        busiType: '25'
      },
      rules: {
        address: this.verificationRules('院址', 100),
        postCode: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入邮政编码' },
            { pattern: '^[1-9]\d{5}(?!\d)', message: '请输入六位数字' }]
        }
      }
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    // 登记机关
    registerOrg: {
      type: Array,
      require: true
    },
    // 机构类型
    orgType: {
      type: Array,
      require: true
    },
    // 机构性质
    orgNature: {
      type: Array,
      require: true
    },
    yesorno: {
      type: Array
    },
    claimReportfileList: {
      type: Array
    },
    siteOwnershipfileList: {
      type: Array
    },
    capitalVerificationfileList: {
      type: Array
    },
    institutionalfileList: {
      type: Array
    },
    otherInformationfileList: {
      type: Array
    },
    approvalOfOrganizationfileList: {
      type: Array
    },
    constructionfileList: {
      type: Array
    },
    shenbanrenfileList: {
      type: Array
    },
    keyPersonnelfileList: {
      type: Array
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    changeSocialWelfareOrg (e) {
      if (e == '1') {
        this.$message.info('将该机构标记为“社会福利机构”后，可对同级福利机构录入的孤儿进行孤儿助学登记')
      }
    },
    fnValidatePostCode (rule, value, callback) {
      if (value == '') {
        callback('请输入邮政编码！')
      } else if (!/^[0-9]{6}$/.test(value)) {
        callback('请输入正确的邮政编码')
      } else {
        callback()
      }
    },
    preview (file) { this.downloadFile(file) },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleRemove (file, e) {
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          if (response.serviceSuccess == true) {
            _self.$message.success('文件删除成功!')
            this.file.splice(this.file.indexOf(val), 1)
          } else {
            _self.$message.error('文件删除失败!')
          }
          this.$emit('reForm')
        })
    },
    handleChangeclaimReport (info) {
      if (info.file.status === 'uploading') {
        this.$emit('claimReportFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('claimReportFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.claimReportfileList.splice(-1, 1)
          return false
        }
        this.claimReportfileList = info.fileList
        // 上传成功
        this.$emit('claimReportFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangesiteOwnership (info) {
      if (info.file.status === 'uploading') {
        this.$emit('siteOwnershipFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('siteOwnershipFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.siteOwnershipfileList.splice(-1, 1)
          return false
        }
        this.siteOwnershipfileList = info.fileList
        // 上传成功
        this.$emit('siteOwnershipFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangecapitalVerification (info) {
      if (info.file.status === 'uploading') {
        this.$emit('capitalVerificationFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('capitalVerificationFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.capitalVerificationfileList.splice(-1, 1)
          return false
        }
        this.capitalVerificationfileList = info.fileList
        // 上传成功
        this.$emit('capitalVerificationFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangeinstitutional (info) {
      if (info.file.status === 'uploading') {
        this.$emit('institutionalFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('institutionalFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.institutionalfileList.splice(-1, 1)
          return false
        }
        this.institutionalfileList = info.fileList
        // 上传成功
        this.$emit('institutionalFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangeotherInformation (info) {
      if (info.file.status === 'uploading') {
        this.$emit('otherInformationFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('otherInformationFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.otherInformationfileList.splice(-1, 1)
          return false
        }
        this.otherInformationfileList = info.fileList
        // 上传成功
        this.$emit('otherInformationFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangeapprovalOfOrganization (info) {
      if (info.file.status === 'uploading') {
        this.$emit('approvalOfOrganizationFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('approvalOfOrganizationFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.approvalOfOrganizationfileList.splice(-1, 1)
          return false
        }
        this.approvalOfOrganizationfileList = info.fileList
        // 上传成功
        this.$emit('approvalOfOrganizationFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangeconstruction (info) {
      if (info.file.status === 'uploading') {
        this.$emit('constructionFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('constructionFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.constructionfileList.splice(-1, 1)
          return false
        }
        this.constructionfileList = info.fileList
        // 上传成功
        this.$emit('constructionFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangeshenbanren (info) {
      if (info.file.status === 'uploading') {
        this.$emit('shenbanrenFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('shenbanrenFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.shenbanrenfileList.splice(-1, 1)
          return false
        }
        this.shenbanrenfileList = info.fileList
        // 上传成功
        this.$emit('shenbanrenFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    handleChangekeyPersonnel (info) {
      if (info.file.status === 'uploading') {
        this.$emit('keyPersonnelFun', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('keyPersonnelFun', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.keyPersonnelfileList.splice(-1, 1)
          return false
        }
        this.keyPersonnelfileList = info.fileList
        // 上传成功
        this.$emit('keyPersonnelFun', info.fileList)
        this.$message.success('文件上传成功!')
        this.$emit('reForm')
      }
    },
    // 禁用时间,不能选择比当前时间小的日期
    disabledDate (current) {
      return current && current > (moment().endOf('day'))
    }
  }
}
</script>
<style scoped>
.warntext {
  width: 100%;
  /* height: 47px; */
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
