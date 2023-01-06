<template>
  <div class="conts tadrawer">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="家庭基本信息"
                   key="1"
                   :forceRender="true">
        <div class="fromcont">
          <!-- <ta-form layout="horizontal" :autoFormCreate="(From)=>{this.From = From}"> -->
          <ta-row class="frominadd fromcom">
            <ta-col :span="10">
              <ta-col :span="10"
                      :offset="10">
                <div class="titlebar">主照料人信息</div>
              </ta-col>
            </ta-col>
            <ta-col :span="10">
              <ta-col :span="10"
                      :offset="10">
                <div class="titlebar titlebarmen">配偶信息</div>
              </ta-col>
            </ta-col>
            <ta-col :span="10">

              <ta-form layout="horizontal"
                       :autoFormCreate="(From)=>{this.From = From}">
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="姓名"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="name"
                                  :fieldDecoratorOptions="rules.name">
                      <ta-input placeholder="请输入姓名" />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <ta-form-item label="身份证号"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="idCard"
                                  :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: true, message: '请输入身份证号' },{validator:idCardValid}]}">
                      <ta-input placeholder="请输入身份证号" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="性別"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="sex"
                                  :fieldDecoratorOptions="rules.sex">
                      <ta-select placeholder="请选择性別"
                                 :disabled="true">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in sexList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <ta-form-item label="出生日期"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  key="4"
                                  fieldDecoratorId="birthday"
                                  :fieldDecoratorOptions="rules.birthday">
                      <ta-date-picker style="width: 100%;"
                                      :disabled="true"
                                      placeholder="请选择出生日期"
                                      :disabledDate="disabledDate" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="文化程度"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="educationLevel"
                                  :fieldDecoratorOptions="rules.educationLevel">
                      <ta-select placeholder="请选择文化程度">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in cultureList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <Health key="2"
                            :labelwidth="{label: 7,wrapper: 17}"></Health>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-form-item label="工作单位及职务"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{ span: 19 }"
                                fieldDecoratorId="workUnit"
                                :fieldDecoratorOptions="rules.workUnit">
                    <ta-input placeholder="请输入工作单位及职务" />
                  </ta-form-item>
                </ta-col>

              </ta-form>
            </ta-col>
            <ta-col :span="2">
            </ta-col>
            <ta-col :span="10">
              <ta-form layout="horizontal"
                       :autoFormCreate="(womenFrom)=>{this.womenFrom = womenFrom}">
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="姓名"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="name"
                                  :fieldDecoratorOptions="rules.copy_name">
                      <ta-input placeholder="请输入姓名" />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <ta-form-item label="身份证号"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="idCard"
                                  :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: false, message: '请输入身份证号' },{validator:copyIdCardValid}]}">
                      <ta-input placeholder="请输入身份证号" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="性別"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="sex">
                      <ta-select placeholder="请选择性別"
                                 :disabled="true">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in sexList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <ta-form-item key="3"
                                  label="出生日期"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="birthday">
                      <ta-date-picker style="width: 100%;"
                                      :disabled='true'
                                      placeholder="请选择出生日期"
                                      :disabledDate="disabledDate" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="文化程度"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="educationLevel">
                      <ta-select placeholder="请选择文化程度">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in cultureList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <Health :isrule="false"
                            :labelwidth="{label: 7,wrapper: 17}"></Health>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-form-item label="工作单位及职务"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{ span: 19 }"
                                fieldDecoratorId="workUnit">
                    <ta-input placeholder="请输入工作单位及职务" />
                  </ta-form-item>
                </ta-col>
              </ta-form>
            </ta-col>
            <ta-divider />
            <ta-form layout="horizontal"
                     :autoFormCreate="(basicFrom)=>{this.basicFrom = basicFrom}">
              <ta-col :span="24">
                <ta-col :span="8">
                  <AddressComponent msg="家庭住址"></AddressComponent>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label
                                :fieldDecoratorOptions="rules.familyAddress"
                                fieldDecoratorId="familyAddress"
                                :labelCol="{ span: 0 }"
                                :wrapperCol="{ span: 23,offset:1 }">
                    <ta-input placeholder="请输入详细地址" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="8">
                  <ta-form-item label="家庭经济年收入（年/元）"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{ span: 14 }"
                                :fieldDecoratorOptions="rules.familyIncome"
                                fieldDecoratorId="familyIncome">
                    <ta-input-number :min="1"
                                     :max="999999"
                                     :precision="2"
                                     style="width:100%"
                                     placeholder="请输入家庭经济年收入（年/元）" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="家庭联系电话"
                                :fieldDecoratorOptions="rules.telPhone"
                                fieldDecoratorId="telPhone">
                    <ta-input placeholder="请输入家庭联系电话" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-col :span="12">
                    <ta-form-item label="家庭成员有无传染病"
                                  :labelCol="{span:16}"
                                  :wrapperCol="{span:8}"
                                  :fieldDecoratorOptions="rules.isInfectiousDiseases"
                                  fieldDecoratorId="isInfectiousDiseases">
                      <ta-select placeholder="请选择"
                                 @change="isInfectiousDiseaseschs">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in yesnoList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="12">
                    <ta-form-item label
                                  :labelCol="{span:0}"
                                  :wrapperCol="{span:23,offset:1}"
                                  :fieldDecoratorOptions="isInfectiousDiseasesval==1?rules.infectiousDiseasesName1:rules.infectiousDiseasesName2"
                                  fieldDecoratorId="infectiousDiseasesName">
                      <ta-input placeholder="请输入传染病名称"
                                :disabled="isInfectiousDiseasesval==0?true:false" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="8">
                  <ta-form-item label="人均住房面积（m²）"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{ span: 14 }"
                                :fieldDecoratorOptions="rules.livingSpace"
                                fieldDecoratorId="livingSpace">
                    <ta-input-number :min="1"
                                     :max="999999"
                                     :precision="2"
                                     style="width:100%"
                                     placeholder="请输入人均住房面积（m²）" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-col :span="12">
                    <ta-form-item label="家庭成员有无精神病"
                                  :labelCol="{span:16}"
                                  :wrapperCol="{span:8}"
                                  :fieldDecoratorOptions="rules.isMentalDisease"
                                  fieldDecoratorId="isMentalDisease">
                      <ta-select placeholder="请选择 "
                                 @change="isMentalDiseasechs">
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in yesnoList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="12">
                    <ta-form-item label
                                  :labelCol="{span:0}"
                                  :wrapperCol="{span:23,offset:1}"
                                  :fieldDecoratorOptions="isMentalDiseaseval==1?rules.mentalDiseaseName1:rules.mentalDiseaseName2"
                                  fieldDecoratorId="mentalDiseaseName">
                      <ta-input placeholder="请输入精神病名称"
                                :disabled="isMentalDiseaseval==0?true:false" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="家庭成员有无犯罪记录"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}"
                                :fieldDecoratorOptions="rules.isCriminalRecord"
                                fieldDecoratorId="isCriminalRecord">
                    <ta-select placeholder="请选择家庭成员有无犯罪记录">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in yesnoList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="证明材料上传"
                              :labelCol="{ span: 2 }"
                              :wrapperCol="{ span: 22 }"
                              :fieldDecoratorOptions="rules.filePathVos">
                  <ta-upload :withCredentials="true"
                             name="file"
                             :multiple="true"
                             :action="action"
                             :data="updata"
                             :fileList="fileList"
                             :beforeUpload="beforeUpload"
                             @change="handleChange"
                             @preview="preview">
                    <div>
                      <ta-button>
                        <ta-icon type="upload" />上传
                      </ta-button>
                    </div>
                  </ta-upload>
                </ta-form-item>
              </ta-col>
            </ta-form>
          </ta-row>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="家庭成员"
                   key="2"
                   :forceRender="true">
        <Memberfamily :disabled="false"
                      :listFamilyMember="listFamilyMember"
                      @chaadoptorChildrenVos="chaadoptorChildrenVos"></Memberfamily>
      </ta-tab-pane>
      <ta-tab-pane tab="申请信息"
                   key="3"
                   :forceRender="true">
        <div class="fromcont">
          <ta-form layout="horizontal"
                   :autoFormCreate="(applyFrom)=>{this.applyFrom = applyFrom}">
            <ta-row class="frominadd fromcom">
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label="申请日期"
                                fieldDecoratorId="applyDate"
                                :fieldDecoratorOptions="rules.applyDate">
                    <ta-date-picker style="width: 100%;"
                                    placeholder="请选择申请日期"
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="照料儿童特长"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="careForChildMerit"
                                :fieldDecoratorOptions="rules.careForChildMerit">
                    <ta-input placeholder="请输入照料儿童特长" />
                  </ta-form-item>
                </ta-col>

                <ta-col :span="6">
                  <ta-form-item label="寄养儿童意向"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                :fieldDecoratorOptions="rules.fosterChildIntention"
                                fieldDecoratorId="fosterChildIntention">
                    <ta-select placeholder="请选择寄养儿童意向">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in fousterfamilyintentionList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="申请家庭寄养目的"
                                :labelCol="{span:10}"
                                :wrapperCol="{span:14}"
                                :fieldDecoratorOptions="rules.applyGoal"
                                fieldDecoratorId="applyGoal">
                    <ta-input placeholder="请输入申请家庭寄养目的" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="所在社区或单位意见"
                              :labelCol="{span:3}"
                              :wrapperCol="{span:21}"
                              :fieldDecoratorOptions="rules.communityOpinion"
                              fieldDecoratorId="communityOpinion">
                  <ta-textarea placeholder="请输入所在社区或单位意见"
                               :rows="4" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="备注"
                              :labelCol="{span:3}"
                              :wrapperCol="{span:21}"
                              :fieldDecoratorOptions="rules.remarks"
                              fieldDecoratorId="remarks">
                  <ta-textarea placeholder="请输入备注"
                               :rows="4" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 @click="submit"
                 class="preservation">保存</ta-button>
    </div>
  </div>
</template>
<script>
import Memberfamily from '../../components/memberfamily'
import Health from '@component/common/components/health'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      nowkey: '1',
      // 家庭成员
      listFamilyMember: [],
      rules: {
        name: this.verificationRules('姓名', 50),
        copy_name: this.verificationRulesNotMustFill('姓名', 50),
        sex: this.verificationRules('性别'),
        birthday: this.verificationRules('出生日期', true),
        educationLevel: this.verificationRules('文化程度'),
        workUnit: this.verificationRulesNotMustFill('工作单位及职务', 100),
        copy_workUnit: this.verificationRulesNotMustFill('工作单位及职务', 100),
        familyIncome: this.verificationRules('家庭经济年收入（年/元）', '0'),
        telPhone: this.verificationRules('家庭联系电话', { type: 'phone' }),
        // isInfectiousDiseases: this.verificationRules('家庭成员有无传染病'),
        isInfectiousDiseases: this.verificationRules(''),
        infectiousDiseasesName1: this.verificationRules(
          '传染病名称',
          72,
          false
        ),
        infectiousDiseasesName2: this.verificationRulesNotMustFill(
          '传染病名称',
          72
        ),
        livingSpace: this.verificationRules('人均住房面积（m²）', '0'),
        // isMentalDisease: this.verificationRules('家庭成员有无精神病'),
        isMentalDisease: this.verificationRules(''),
        mentalDiseaseName1: this.verificationRules('精神病名称', 72, false),
        mentalDiseaseName2: this.verificationRulesNotMustFill('精神病名称', 72),
        isCriminalRecord: this.verificationRules('家庭成员有无犯罪记录'),
        applyDate: this.verificationRules('申请日期'),
        careForChildMerit: this.verificationRulesNotMustFill(
          '照料儿童特长',
          100
        ),
        applyGoal: this.verificationRules('申请家庭寄养目的', 100),
        communityOpinion: this.verificationRulesNotMustFill(
          '所在社区或单位意见',
          200, true
        ),
        remarks: this.verificationRulesNotMustFill('备注', 200, true),
        familyAddress: this.verificationRules('详细家庭住址', 100, false)
      },
      sexList: [],
      cultureList: [],
      fileldName: 'copy_healthCondition',
      updata: {
        functionalType: '1',
        busiType: '26'
      },
      fileList: [],
      yesnoList: [],
      fousterfamilyintentionList: [],
      isInfectiousDiseasesval: '1',
      isMentalDiseaseval: '1'
    }
  },
  components: {
    Memberfamily,
    Health,
    AddressComponent
  },
  activated () {
    this.loadData()
  },
  mounted () {
    this.getsex()
    this.getCulture()
    this.getyesno()
    this.getfousterfamilyintention()
  },
  methods: {
    // 身份证号校验
    idCardValid (rule, value, callback) {
      let _self = this
      _self.idCardValidate(rule, value, callback, _self, 'From')
    },
    copyIdCardValid (rule, value, callback) {
      let _self = this
      _self.idCardValidate(rule, value, callback, _self, 'womenFrom')
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth, key) {
      this[key].setFieldsValue({
        birthday: birth ? moment(birth) : null,
        sex: sex
      })
    },
    isInfectiousDiseaseschs (val) {
      this.isInfectiousDiseasesval = val
      // infectiousDiseasesName
      this.basicFrom.setFieldsValue({
        infectiousDiseasesName: ''
      })
    },
    isMentalDiseasechs (val) {
      this.isMentalDiseaseval = val
      // infectiousDiseasesName
      this.basicFrom.setFieldsValue({
        mentalDiseaseName: ''
      })
    },
    loadData () {
      this.listFamilyMember = []
      this.nowkey = '1'
      this.fileList = []
      this.isInfectiousDiseasesval = '1'
      this.isMentalDiseaseval = '1'
      this.From.resetFields()
      this.applyFrom.resetFields()
      this.basicFrom.resetFields()
      this.womenFrom.resetFields()
    },
    preview (file) { this.downloadFile(file) },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 申请日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 寄养家庭一项 FOSTER_FAMILY_INTENTION
    async getfousterfamilyintention () {
      let data = await this.getDictionaries('FOSTER_FAMILY_INTENTION')
      this.fousterfamilyintentionList = data
    },
    // 是否 YESNO
    async getyesno () {
      let data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // DEGREEEDUCATION 文化程度
    async getCulture () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        this[tablename] = val
      }
    },
    callback (key) {
      this.nowkey = key
    },
    backs () {
      this.$router.go(-1)
    },
    dataProcessing () {
      // 家庭信息
      let familyInfoVo = this.basicFrom.getFieldsValue()
      // familyInfoVo.address_Linkage
      familyInfoVo.province = familyInfoVo.address_Linkage[0]
      familyInfoVo.city = familyInfoVo.address_Linkage[1]
      familyInfoVo.district = familyInfoVo.address_Linkage[2]
      delete familyInfoVo.address_Linkage
      // 申請信息
      let fosterFamilyInfoVo = this.applyFrom.getFieldsValue()
      fosterFamilyInfoVo.applyDate = fosterFamilyInfoVo.applyDate.format('YYYY-MM-DD')
      let filePathVos = []
      let fileids = [...this.fileList]
      fileids.map(item => {
        filePathVos.push(item.response.data.data.fileid)
      })
      fosterFamilyInfoVo.filePathVoId = filePathVos
      // 家庭成員列表
      let listFamilyMember = this.listFamilyMember
      // 主照料人
      let householderInfoVo = this.From.getFieldsValue()
      householderInfoVo.birthday = householderInfoVo.birthday.format('YYYY-MM-DD')
      householderInfoVo.healthCondition = householderInfoVo.healthCondition.join(',')
      // 配偶
      let spouseInfoVo = this.womenFrom.getFieldsValue()
      if (spouseInfoVo.birthday) {
        spouseInfoVo.birthday = spouseInfoVo.birthday.format('YYYY-MM-DD')
      }
      if (spouseInfoVo.healthCondition) {
        spouseInfoVo.healthCondition = spouseInfoVo.healthCondition.join(',')
      }
      let params = {
        familyInfoVo,
        listFamilyMember,
        householderInfoVo,
        fosterFamilyInfoVo,
        spouseInfoVo
      }
      return params
    },
    async submit () {
      var isok = true
      // applyFrom basicFrom womenFrom
      this.From.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      this.applyFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '3'
        }
      })// basicFrom womenFrom
      this.basicFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '1'
        }
      })
      this.womenFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          this.nowkey = '1'
        }
      })
      // 处理数据
      if (isok) {
        let params = this.dataProcessing()
        let data = await this.post('/fosterFamilyInfo/save', params, true)
        if (data.errors == null) {
          this.$message.success('增加成功')
          this.backs()
        }
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.preservation {
  margin-left: 20px;
}
.fromcont {
  padding-right: 2%;
  box-sizing: border-box;
}
.titlebar {
  width: 100%;
  height: 46px;
  background: rgba(135, 197, 255, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(24, 144, 255, 1);
}
.titlebarmen {
  background: rgba(255, 167, 170, 0.15);
  color: rgba(0, 0, 0, 0.85);
}
</style>
