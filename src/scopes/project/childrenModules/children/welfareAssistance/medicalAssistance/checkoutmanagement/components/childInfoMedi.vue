<template>
  <div>
    <div ref="oneout"
         class="mars">
      <Title title="医疗申请信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               ref="one"
               :autoFormCreate="(form)=>{this.medicalApplyForm = form}">
        <ta-row class="fromcom">
          <ta-col :span="8">
            <ta-form-item label="费用种类"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="costCategory"
                          :require="{message:'请输选择费用种类'}"
                          initValue="1">
              <ta-select :placeholder="disabled?'':'请选择费用种类'"
                         style="width : 100%"
                         @change="changeMust"
                         :disabled="isNotBatch||disabled">
                <ta-select-option key="1"
                                  :value="'1'">体检费用</ta-select-option>
                <ta-select-option key="2"
                                  :value="'2'">医疗费用</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="申请日期"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="applyDate"
                          :require="{message:'请输选择申请日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              :valid-now-time="'right'"
                              :placeholder="disabled?'':'请选择申请日期'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="救治病种类型"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="rescueDiseaseType"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择救治病种类型')">
              <ta-select :placeholder="disabled?'':'请选择救治病种类型'"
                         style="width : 100%"
                         :disabled="disabled">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in rescueDiseaseTypeList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="救治病种名称"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="rescueDiseaseName"
                          :fieldDecoratorOptions="MustTip=='1'?verificationRulesNotMustFill('救治病种名称',30):verificationRules('救治病种名称',30)">
              <ta-input :placeholder="disabled?'':'请输入救治病种名称'"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="联系人"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="contact"
                          :fieldDecoratorOptions="verificationRules('联系人',20)">
              <ta-input :placeholder="disabled?'':'请输入联系人'"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="联系电话"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="contactTelephone"
                          :fieldDecoratorOptions="verificationRules('联系电话',{type:'phone'})">
              <ta-input :placeholder="disabled?'':'请输入联系电话'"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="家庭人均年收入(元)"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="familyAverageAnnualIncome">
              <ta-input-number :min="0"
                               style="width:100%"
                               :max="99999999"
                               :precision="2"
                               :placeholder="disabled?'':'请输入家庭人均年收入'"
                               :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否加入医保"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="whetherAddmedicalInsurance"
                          :require="{message:'请选择是否加入医保'}">
              <ta-select :placeholder="disabled?'':'请选择是否加入医保'"
                         style="width : 100%"
                         :disabled="disabled">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesnoList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="家庭说明"
                          class="alonerow1"
                          fieldDecoratorId="familyExplain"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('家庭说明',200,true)">
              <ta-textarea :placeholder="disabled?'':'请输入家庭说明'"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div ref="twoout"
         class="mars">
      <Title title="治疗情况"
             :show.sync="showtwo"></Title>
      <ta-form layout="horizontal"
               ref="two"
               :autoFormCreate="(form)=>{this.treatmentForm = form}">
        <ta-row class="fromintop">
          <ta-col :span="8">
            <ta-form-item label="定点医院名称"
                          fieldDecoratorId="medicalInstitutionName"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :require="{message:'请选择定点医院名称'}">
              <ta-select showSearch
                         :dropdownStyle="{ maxHeight: '400px', overflow: 'auto'}"
                         optionFilterProp="children"
                         :filterOption="filterOption"
                         :placeholder="disabled?'':'请选择定点医院名称'"
                         style="width : 100%"
                         @search="handleSearch"
                         :notFoundContent="fetching ? undefined : null"
                         :disabled="disabled">
                <ta-select-option :value="item.hospitalName"
                                  v-for="(item,index) in medicalInstitutionNameList "
                                  :key="index">{{item.hospitalName}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <!-- :require="{message:'请选择是否住院治疗'}" -->
          <ta-col :span="8">
            <ta-form-item label="治疗评估效果"
                          fieldDecoratorId="therapeuticEvaluation"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择是否住院治疗')">
              <ta-select :placeholder="disabled?'':'请选择治疗评估效果'"
                         style="width : 100%"
                         :disabled="disabled">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in therapeuticEvaluationList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="评估日期"
                          fieldDecoratorId="valuationDate"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择评估日期')">
              <ta-date-picker style="width: 100%;"
                              :valid-now-time="'right'"
                              :placeholder="disabled?'':'请选择评估日期'"
                              :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="主管医师"
                          fieldDecoratorId="chiefPhysician"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('主管医师',20)">
              <ta-input :placeholder="disabled?'':'请输入主管医师'"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <!-- :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择是否部级定点医院救治')" -->
            <ta-form-item label="是否部级定点医院救治"
                          fieldDecoratorId="designatedHospital"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}">
              <ta-select placeholder=""
                         style="width : 100%"
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesnoList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="家庭/个人自付比例"
                          fieldDecoratorId="payScale"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <!-- :require="{message:'请输入家庭/个人自付比例'}" -->

              <ta-input-number :min="0"
                               :step="1"
                               :max="100.00"
                               :precision="2"
                               :disabled="disabled"
                               :formatter="value => `${value}%`"
                               :parser="value => value.replace('%', '')"
                               style="width: 100%"
                               placeholder="请输入家庭/个人自付比例"></ta-input-number>
            </ta-form-item>
          </ta-col>

          <ta-col :span="8">
            <ta-form-item label="是否住院治疗"
                          fieldDecoratorId="hospitalization"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择是否住院治疗')">
              <ta-select :placeholder="disabled?'':'请选择是否住院治疗'"
                         style="width : 100%"
                         :disabled="disabled"
                         @change="changeSel">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesnoList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="是否配置康复辅助器具"
                          fieldDecoratorId="isAuxEquipmentConfig"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择是否配置康复辅助器具')">
              <ta-select :placeholder="disabled?'':'请选择是否配置康复辅助器具'"
                         style="width : 100%"
                         @change="changes"
                         :disabled="disabled">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in yesnoList "
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="辅助器具配置机构"
                          v-if="isAuxEquipmentConfigValue==this.Enum.YESNO.SHI"
                          fieldDecoratorId="auxEquipmentConfigOrgId"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择辅助器具配置机构')">
              <ta-select showSearch
                         optionFilterProp="children"
                         @change="handleChange"
                         :filterOption="filterOption"
                         :placeholder="disabled?'':'请选择辅助器具配置机构'"
                         style="width : 100%"
                         :disabled="disabled">
                <ta-select-option :value="item.id"
                                  v-for="(item,index) in auxEquipmentConfigOrgIdList"
                                  :tag="item.hospitalName"
                                  :key="index">{{item.hospitalName}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="8">
            <ta-form-item label="住院日期"
                          v-if="hospitalizationValue==this.Enum.YESNO.SHI"
                          fieldDecoratorId="admissionDate"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择住院日期')">
              <ta-date-picker style="width: 100%;"
                              v-model="startValue"
                              :placeholder="disabled?'':'请选择住院日期'"
                              :disabled="disabled"
                              :disabledDate="disabledStartDate" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="出院日期"
                          v-if="hospitalizationValue==this.Enum.YESNO.SHI"
                          fieldDecoratorId="dischargeDate"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          :fieldDecoratorOptions="MustTip=='1'?selectNotMust():verificationRules('请选择出院日期')">
              <ta-date-picker style="width: 100%;"
                              :placeholder="disabled?'':'请选择出院日期'"
                              :disabled="disabled"
                              :disabledDate="disabledEndDate"
                              v-model="endValue" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="出院小结"
                          v-if="hospitalizationValue==this.Enum.YESNO.SHI"
                          class="alonerow1"
                          fieldDecoratorId="dischargeSummary"
                          :labelCol="{span:3}"
                          :wrapperCol="{span:21}"
                          :fieldDecoratorOptions="this.verificationRulesNotMustFill('出院小结', 500, false)">
              <ta-textarea :placeholder="disabled?'':'请填入出院小结'"
                           :rows="2"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="治疗记录证明材料"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 21}">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :disabled="disabled"
                         :fileList="fileList"
                         @remove="handleRemove"
                         @preview="preview"
                         :data="fileData"
                         :beforeUpload="beforeUpload"
                         @change="filechange">
                <ta-button>
                  <ta-icon type="upload" /> 上传文件
                </ta-button>
              </ta-upload>
              <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />包括门诊病历、出院小结、体检报告结论、康复末期评估等。附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    isNotBatch: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Title
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      MustTip: '1',
      rescueDiseaseTypeList: [], // 救治病种类型字典数据
      yesnoList: [], // 是否字典数据
      medicalInstitutionNameList: [], // 定点医院名称字典数据
      therapeuticEvaluationList: [], // 治疗评估结果字典数据
      auxEquipmentConfigOrgIdList: [], // 辅助器具配置机构
      auxEquipmentConfigOrgName: null, // 辅助器具配置机构name
      isAuxEquipmentConfigValue: '', // 是否配置康复辅助器具选择的值
      hospitalizationValue: '', // 是否住院治疗选择的值
      showone: true, // 医疗申请信息
      showtwo: true, // 治疗情况
      fileList: [], // 附件列表
      // 上传需要的参数
      fileData: {
        busiType: 9,
        functionalType: '2'
      },
      startValue: null, // 入院日期
      endValue: null, // 出院日期
      fetching: false
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('9.63%', '90.37%', 'alonerow1') // 单独一行字段宽度控制
  },
  activated () {
    this.showone = true
    this.showtwo = true
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  mounted () {
    // 获取字典数据
    this.getAllMenus()
  },
  methods: {
    changeMust (e) {
      this.MustTip = e
    },
    async handleSearch (value) {
      this.fetching = true
      const res = await this.post('/designatedHospital/querDesignatedHospitalList', { hospitalName: value })
      this.medicalInstitutionNameList = res.data.data
    },
    // 获取所有字典数据
    getAllMenus () {
      this.getMenu('DISEASETYPE', 'rescueDiseaseTypeList') // 获取救治病种类型字典数据
      this.getMenu('YESNO', 'yesnoList') // 获取是否字典数据
      this.getMenu('', 'medicalInstitutionNameList') // 获取定点医院名称字典数据
      this.getMenu('', 'auxEquipmentConfigOrgIdList') // 获取辅助器具配置机构字典数据
      this.getMenu('THERAPEUTICEVALUATION', 'therapeuticEvaluationList') // 获取治疗评估结果字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      if (name == 'medicalInstitutionNameList') { // 定点医院名称
        _self.post('/designatedHospital/list', {}).then(res => {
          _self[name] = res.data.pageBean.list
        })
      } else if (name == 'auxEquipmentConfigOrgIdList') { // 辅助器具配置机构
        _self.post('/applianceInstitution/queryAll', {}).then(res => {
          _self[name] = res.data.data
        })
      } else {
        _self.post('codetable/getCode', { codeType: code }).then(res => {
          if (res.serviceSuccess) {
            res.data.codeList.sort(function (a, b) {
              return parseInt(a.value) - parseInt(b.value)
            })
            _self[name] = res.data.codeList
          }
        })
      }
    },
    // 是否配置康复辅助器具change事件
    changes (e) {
      this.isAuxEquipmentConfigValue = e
    },
    // 入院日期控制
    disabledStartDate (startValue) {
      const endValue = this.endValue

      if (!startValue || !endValue) { // 未选择出院日期，则入院日期小于当前日期
        return startValue > moment().endOf('day')
      } else { // 选择了出院日期，则入院日期小于当前日期且小于出院日期
        return endValue > moment().endOf('day') ? startValue.valueOf() >= moment().endOf('day') : startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 出院日期控制
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!startValue || !endValue) {
        return false
      } else {
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 是否住院治疗change事件
    changeSel (e) {
      this.hospitalizationValue = e
      this.setHeight('two', 'twoout')
    },
    // 选中辅助器具配置机构 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
    handleChange (value, option) {
      this.auxEquipmentConfigOrgName = option.data.attrs.tag
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
      this.setHeight('two', 'twoout')
    },
    // 附件上传前验证
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 附件预览
    preview (file) { this.downloadFile(file) },
    // 附件删除
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
      this.setHeight('two', 'twoout')
    },
    // 布局调整
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            // node.style.height = height + 150 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        }
      })
    }
  },
  watch: {
    showone (val) {
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !val)
      })
    },
    showtwo (val) {
      this.$nextTick(() => {
        this.setHeight('two', 'twoout', !val)
      })
    }
  }
}
</script>
<style scoped lang="less">
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
