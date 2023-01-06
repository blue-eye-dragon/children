<template>
  <div class="conts tadrawer">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="家庭基本信息"
                   key="1"
                   :forceRender="true">
        <div ref="oneout"
             class="mars">
          <Title id="fam_a"
                 title="基本信息"
                 :show.sync="showone"></Title>
          <ta-row ref="one"
                  class="frominadd fromcom">
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
                      <ta-input placeholder="请输入姓名"
                                :disabled='isdisabled' />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <ta-form-item label="性別"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="sex"
                                  :fieldDecoratorOptions="rules.sex">
                      <ta-select placeholder="请选择性別"
                                 :disabled='isdisabled'>
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in sexList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="身份证号"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="idCard"
                                  :fieldDecoratorOptions="rules.idCard">
                      <ta-input placeholder="请输入身份证号"
                                :disabled='isdisabled'
                                @blur='idcardcha' />
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
                                  fieldDecoratorId="educationLevel"
                                  :fieldDecoratorOptions="rules.educationLevel">
                      <ta-select placeholder="请选择文化程度"
                                 :disabled='isdisabled'>
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in cultureList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <Health key="2"
                            :labelwidth="{label: 7,wrapper: 17}"
                            :heathmodel="heathmodel"
                            :disabled='isdisabled'
                            @setheath="setheath"></Health>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-form-item label="工作单位及职务"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{ span: 19 }"
                                fieldDecoratorId="workUnit"
                                :fieldDecoratorOptions="rules.workUnit">
                    <ta-input placeholder="请输入工作单位及职务"
                              :disabled='isdisabled' />
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
                      <ta-input placeholder="请输入姓名"
                                :disabled='isdisabled' />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <ta-form-item label="性別"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="sex">
                      <ta-select placeholder="请选择性別"
                                 :disabled='isdisabled'>
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in sexList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='12'>
                    <ta-form-item label="身份证号"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  fieldDecoratorId="idCard"
                                  :fieldDecoratorOptions="rules.copy_idCard">
                      <ta-input placeholder="请输入身份证号"
                                :disabled='isdisabled'
                                @blur="copyidcardcha" />
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
                      <ta-select placeholder="请选择文化程度"
                                 :disabled='isdisabled'>
                        <ta-select-option :value="item.value"
                                          v-for="(item,index) in cultureList"
                                          :key="index">{{item.label}}</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='12'>
                    <Health :isrule="false"
                            :labelwidth="{label: 7,wrapper: 17}"
                            :heathmodel="heathmodel2"
                            :disabled='isdisabled'
                            @setheath="setheath2"></Health>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-form-item label="工作单位及职务"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{ span: 19 }"
                                fieldDecoratorId="workUnit"
                                :fieldDecoratorOptions="rules.copy_workUnit">
                    <ta-input placeholder="请输入工作单位及职务"
                              :disabled='isdisabled' />
                  </ta-form-item>
                </ta-col>
              </ta-form>
            </ta-col>
            <ta-divider />
            <ta-form layout="horizontal"
                     :autoFormCreate="(basicFrom)=>{this.basicFrom = basicFrom}">
              <ta-col :span="24">
                <ta-col :span="8">
                  <AddressComponent msg="家庭住址"
                                    :addressmodel="addressmodel"
                                    @setaddress="setaddress"
                                    :disabled='isdisabled'></AddressComponent>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label
                                :fieldDecoratorOptions="rules.familyAddress"
                                fieldDecoratorId="familyAddress"
                                :labelCol="{ span: 0 }"
                                :wrapperCol="{ span: 23,offset:1 }">
                    <ta-input placeholder="请输入详细地址"
                              :disabled='isdisabled' />
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
                                     :disabled='isdisabled'
                                     placeholder="请输入家庭经济年收入（年/元）" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="家庭联系电话"
                                :fieldDecoratorOptions="rules.telPhone"
                                fieldDecoratorId="telPhone">
                    <ta-input placeholder="请输入家庭联系电话"
                              :disabled='isdisabled' />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-col :span="12">
                    <ta-form-item label="家庭成员有无传染病"
                                  :labelCol="{span:16}"
                                  :wrapperCol="{span:8}"
                                  :fieldDecoratorOptions="rules.isInfectiousDiseases"
                                  fieldDecoratorId="isInfectiousDiseases">
                      <ta-select placeholder="请选择家庭成员有无传染病"
                                 :disabled='isdisabled'
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
                                     :disabled='isdisabled'
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
                      <ta-select placeholder="请选择家庭成员有无精神病"
                                 :disabled='isdisabled'
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
                    <ta-select placeholder="请选择家庭成员有无犯罪记录"
                               :disabled='isdisabled'>
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
                        <ta-icon type="upload"
                                 :disabled='isdisabled' />上传
                      </ta-button>
                    </div>
                  </ta-upload>
                </ta-form-item>
              </ta-col>
            </ta-form>
          </ta-row>
        </div>
        <div ref="twoout"
             class="mars marpad">
          <Title id="fam_b"
                 title="家庭成员"
                 :show.sync="showtwo"></Title>
          <Memberfamily ref="two"
                        :disabled='isdisabled'
                        :listFamilyMember="listFamilyMember"
                        @chaadoptorChildrenVos="chaadoptorChildrenVos"></Memberfamily>
        </div>
        <div ref="threeout"
             class="mars">
          <Title id="fam_c"
                 title="申请信息"
                 :show.sync="showthree"></Title>
          <ta-form layout="horizontal"
                   ref="three"
                   :autoFormCreate="(applyFrom)=>{this.applyFrom = applyFrom}">
            <ta-row class="frominadd fromcom">
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label="申请日期"
                                fieldDecoratorId="applyDate"
                                :fieldDecoratorOptions="rules.applyDate">
                    <ta-date-picker style="width: 100%;"
                                    placeholder="请选择申请日期"
                                    :disabled='isdisabled'
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="照料儿童特长"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="careForChildMerit"
                                :fieldDecoratorOptions="rules.careForChildMerit">
                    <ta-input placeholder="请输入照料儿童特长"
                              :disabled='isdisabled' />
                  </ta-form-item>
                </ta-col>

                <ta-col :span="6">
                  <ta-form-item label="寄养儿童意向"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                :fieldDecoratorOptions="rules.fosterChildIntention"
                                fieldDecoratorId="fosterChildIntention">
                    <ta-select placeholder="请选择寄养儿童意向"
                               :disabled='isdisabled'>
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
                    <ta-input placeholder="请输入申请家庭寄养目的"
                              :disabled='isdisabled' />
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
                               :disabled='isdisabled'
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
                               :disabled='isdisabled'
                               :rows="4" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="培训信息"
                   key="2"
                   :forceRender="true">
        <TrainingInformation :disabled='isdisabled'
                             :listFosterFamilyTrainedInfo="listFosterFamilyTrainedInfo"
                             @chaadoptorChildrenVos="chaadoptorChildrenVos"></TrainingInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="评估信息"
                   key="3"
                   :forceRender="true">
        <EvaluationInformation :disabled='isdisabled'
                               :listFosterFamilyAssessment="listFosterFamilyAssessment"
                               @chaadoptorChildrenVos="chaadoptorChildrenVos"></EvaluationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="体检信息"
                   key="4"
                   :forceRender="true">
        <PhysicalExaminationInformation :disabled='isdisabled'
                                        :listFosterFamilyPhysicalExaminationInfo="listFosterFamilyPhysicalExaminationInfo"
                                        @chaadoptorChildrenVos="chaadoptorChildrenVos"></PhysicalExaminationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="寄养协议"
                   key="5"
                   :forceRender="true">
        <FosterCareAgreement :disabled='isdisabled'
                             :listFosterFamilyFosterAgreement="listFosterFamilyFosterAgreement"
                             @chaadoptorChildrenVos="chaadoptorChildrenVos"></FosterCareAgreement>
      </ta-tab-pane>
      <ta-tab-pane tab="重大事件信息"
                   key="6"
                   :forceRender="true">
        <MajorEvents :disabled='isdisabled'
                     :listFosterFamilyMajorEvents="listFosterFamilyMajorEvents"
                     @chaadoptorChildrenVos="chaadoptorChildrenVos"></MajorEvents>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 @click="submit"
                 class="preservation"
                 v-if="!isdisabled">保存</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import Health from '@component/common/components/health'
import Memberfamily from '../../components/memberfamily'
import TrainingInformation from '../../components/trainingInformation'
import EvaluationInformation from '../../components/evaluationInformation'
import PhysicalExaminationInformation from '../../components/physicalExaminationInformation'
import FosterCareAgreement from '../../components/fosterCareAgreement'
import MajorEvents from '../../components/majorEvents'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
import { setTimeout } from 'timers'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday'
  },
  {
    title: '单位/学校',
    dataIndex: 'workUnit'
  },
  {
    title: '健康状况',
    dataIndex: 'healthCondition'
  },
  {
    title: '与主照料人关系',
    dataIndex: 'relationship',
    collectionType: 'FOSTER_FAMILYRELATIONS'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    Title,
    Health,
    Memberfamily,
    AddressComponent,
    TrainingInformation,
    EvaluationInformation,
    PhysicalExaminationInformation,
    FosterCareAgreement,
    MajorEvents
  },
  data () {
    return {
      nowkey: '1',
      tableColumns,
      showone: true,
      showtwo: true,
      showthree: true,
      listFamilyMember: [],
      listFosterFamilyTrainedInfo: [],
      listFosterFamilyAssessment: [],
      listFosterFamilyPhysicalExaminationInfo: [],
      listFosterFamilyFosterAgreement: [],
      listFosterFamilyMajorEvents: [],
      rules: {
        name: this.verificationRules('姓名', 50),
        copy_name: this.verificationRulesNotMustFill('姓名', 50),
        sex: this.verificationRules('性别'),
        idCard: this.verificationRules('身份证号', { type: 'idCard' }),
        copy_idCard: this.verificationRulesNotMustFill('身份证号', {
          type: 'idCard'
        }),
        birthday: this.verificationRules('出生日期', true),
        educationLevel: this.verificationRules('文化程度'),
        workUnit: this.verificationRulesNotMustFill('工作单位及职务', 100),
        copy_workUnit: this.verificationRulesNotMustFill('工作单位及职务', 100),
        familyIncome: this.verificationRules('家庭经济年收入（年/元）', 0),
        telPhone: this.verificationRules('家庭联系电话', { type: 'phone' }),
        isInfectiousDiseases: this.verificationRules('家庭成员有无传染病'),
        infectiousDiseasesName1: this.verificationRules(
          '传染病名称',
          72
        ),
        infectiousDiseasesName2: this.verificationRulesNotMustFill(
          '传染病名称',
          72
        ),
        livingSpace: this.verificationRules('人均住房面积（m²）', 0),
        isMentalDisease: this.verificationRules('家庭成员有无精神病'),
        mentalDiseaseName1: this.verificationRules('精神病名称', 72),
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
        familyAddress: this.verificationRules('详细地址', 100)
      },
      sexList: [],
      cultureList: [],
      yesnoList: [],
      fousterfamilyintentionList: [],
      updata: {
        functionalType: '1',
        busiType: '26'
      },
      fileList: [],
      id: '',
      familyId: '',
      addressmodel: [],
      heathmodel: [],
      heathmodel2: [],
      isInfectiousDiseasesval: '1',
      isMentalDiseaseval: '1',
      dataIds: {},
      isdisabled: false,
      fosterChildNumber: '',
      haveChildNumber: ''
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    }
  },
  activated () {
    this.loadData()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.familyId = this.$route.query.familyId
      if (this.$route.query.isedit) {
        this.isdisabled = true
      }
      this.getDetails()
    }
  },
  mounted () {
    this.getsex()
    this.getCulture()
    this.getyesno()
    this.getfousterfamilyintention()
    this.setHeight('one', 'oneout')
    this.setHeight('two', 'twoout')
    this.setHeight('three', 'threeout')
  },
  methods: {
    // 申请日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
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
      this.isdisabled = false
      this.dataIds = {}
      this.fileList = []
      this.nowkey = '1'
      this.fosterChildNumber = ''
      this.haveChildNumber = ''
      this.showone = true
      this.showtwo = true
      this.showthree = true
      this.isInfectiousDiseasesval = '1'
      this.isMentalDiseaseval = '1'
      this.listFamilyMember = []
      this.listFosterFamilyTrainedInfo = []
      this.listFosterFamilyAssessment = []
      this.listFosterFamilyPhysicalExaminationInfo = []
      this.listFosterFamilyFosterAgreement = []
      this.listFosterFamilyMajorEvents = []
      this.From.resetFields()
      this.applyFrom.resetFields()
      this.basicFrom.resetFields()
      this.womenFrom.resetFields()
    },
    idcardcha (value) {
      const val = value.target.value
      const data = this.go(val, val.length, this, null)
      if (data.birth) {
        this.From.setFieldsValue({
          birthday: moment(data.birth)
        })
      }
    },
    copyidcardcha (value) {
      const val = value.target.value
      const data = this.go(val, val.length, this, null)
      if (data.birth) {
        this.womenFrom.setFieldsValue({
          birthday: moment(data.birth)
        })
      }
    },
    setaddress () {
      this.basicFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setheath () {
      this.From.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    setheath2 () {
      this.womenFrom.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    async getDetails () {
      const params = {
        fosterFamilyId: this.id,
        familyId: this.familyId
      }
      const data = await this.post('/fosterFamilyInfo/selectUpdateDataById', params)
      if (data.errors == null) {
        // let str=adopteeVo.healthCondition.split(',')
        // this.heathmodel = str
        // adopteeVo.healthCondition = str
        // this.addressmodel = [adopteeVo.censusRegisterPro, adopteeVo.censusRegisterCity, adopteeVo.censusRegisterCounty]
        // data.data.data fosterFamilyInfoVo
        const familyInfoVo = data.data.data.familyInfoVo
        this.basicFrom.setFieldsValue(familyInfoVo)
        this.isMentalDiseaseval = familyInfoVo.isMentalDisease
        this.isInfectiousDiseasesval = familyInfoVo.isInfectiousDiseases
        // 地址赋值
        this.addressmodel = [familyInfoVo.province || '', familyInfoVo.city || '', familyInfoVo.district || '']
        const fosterFamilyInfoVo = data.data.data.fosterFamilyInfoVo
        if (fosterFamilyInfoVo.fosterChildNumber) {
          this.fosterChildNumber = fosterFamilyInfoVo.fosterChildNumber
        }
        if (fosterFamilyInfoVo.haveChildNumber) {
          this.haveChildNumber = fosterFamilyInfoVo.haveChildNumber
        }
        fosterFamilyInfoVo.applyDate = moment(fosterFamilyInfoVo.applyDate)
        this.applyFrom.setFieldsValue(fosterFamilyInfoVo)
        const filelist = JSON.parse(fosterFamilyInfoVo.filePathVos)
        this.fileList = filelist || []
        setTimeout(() => {
          this.setHeight('one', 'oneout')
        }, 1000)
        // householderInfoVo
        const householderInfoVo = data.data.data.householderInfoVo
        householderInfoVo.birthday = moment(householderInfoVo.birthday)
        this.dataIds.id = householderInfoVo.id
        // 健康状况赋值
        const arr = householderInfoVo.healthCondition.split(',')
        this.heathmodel = arr
        householderInfoVo.healthCondition = arr
        this.From.setFieldsValue(householderInfoVo)
        // womenFrom spouseInfoVo
        if (data.data.data.spouseInfoVo) {
          const spouseInfoVo = data.data.data.spouseInfoVo
          this.dataIds.key = spouseInfoVo.id
          if (spouseInfoVo.birthday) {
            spouseInfoVo.birthday = moment(spouseInfoVo.birthday)
          }
          if (spouseInfoVo.healthCondition) {
            const brr = spouseInfoVo.healthCondition.split(',')
            this.heathmodel2 = brr
            spouseInfoVo.healthCondition = brr
          }
          this.womenFrom.setFieldsValue(spouseInfoVo)
        }

        this.listFamilyMember = data.data.data.listFamilyMember
        this.listFosterFamilyAssessment = data.data.data.listFosterFamilyAssessment
        this.listFosterFamilyFosterAgreement = data.data.data.listFosterFamilyFosterAgreement
        this.listFosterFamilyMajorEvents = data.data.data.listFosterFamilyMajorEvents
        this.listFosterFamilyPhysicalExaminationInfo = data.data.data.listFosterFamilyPhysicalExaminationInfo
        this.listFosterFamilyTrainedInfo = data.data.data.listFosterFamilyTrainedInfo
      }
    },
    preview (file) { this.downloadFile(file) },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.isdisabled) {
          return false
        }
        this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
        this.setHeight('one', 'oneout')
      }
    },
    // 寄养家庭一项 FOSTER_FAMILY_INTENTION
    async getfousterfamilyintention () {
      const data = await this.getDictionaries('FOSTER_FAMILY_INTENTION')
      this.fousterfamilyintentionList = data
    },
    // 是否 YESNO
    async getyesno () {
      const data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // DEGREEEDUCATION 文化程度
    async getCulture () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
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
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    callback (key) {
      this.nowkey = key
    },
    backs () {
      this.$router.go(-1)
    },
    dataProcessing () {
      // 家庭信息
      const familyInfoVo = this.basicFrom.getFieldsValue()
      // familyInfoVo.address_Linkage
      familyInfoVo.province = familyInfoVo.address_Linkage[0]
      familyInfoVo.city = familyInfoVo.address_Linkage[1]
      familyInfoVo.district = familyInfoVo.address_Linkage[2]
      delete familyInfoVo.address_Linkage
      familyInfoVo.id = this.id
      familyInfoVo.familyBaseIds = this.familyId
      // 申請信息
      const fosterFamilyInfoVo = this.applyFrom.getFieldsValue()
      fosterFamilyInfoVo.id = this.id
      fosterFamilyInfoVo.familyBaseId = this.familyId
      fosterFamilyInfoVo.fosterChildNumber = this.fosterChildNumber
      fosterFamilyInfoVo.haveChildNumber = this.haveChildNumber
      fosterFamilyInfoVo.applyDate = fosterFamilyInfoVo.applyDate.format(
        'YYYY-MM-DD'
      )
      const filePathVos = []
      const fileids = [...this.fileList]
      fileids.map(item => {
        filePathVos.push(item.response.data.data.fileid)
      })
      fosterFamilyInfoVo.filePathVoId = filePathVos
      // 家庭成員列表
      const listFamilyMember = this.listFamilyMember
      // 主照料人
      const householderInfoVo = this.From.getFieldsValue()
      householderInfoVo.id = this.dataIds.id
      householderInfoVo.birthday = householderInfoVo.birthday.format(
        'YYYY-MM-DD'
      )
      householderInfoVo.healthCondition = householderInfoVo.healthCondition.join(
        ','
      )
      // 配偶
      const spouseInfoVo = this.womenFrom.getFieldsValue()
      spouseInfoVo.id = this.dataIds.key
      if (spouseInfoVo.birthday) {
        spouseInfoVo.birthday = spouseInfoVo.birthday.format('YYYY-MM-DD')
      }
      if (spouseInfoVo.healthCondition) {
        spouseInfoVo.healthCondition = spouseInfoVo.healthCondition.join(',')
      }
      // listFosterFamilyTrainedInfo: [],
      // listFosterFamilyAssessment: [],
      // listFosterFamilyPhysicalExaminationInfo: [],
      // listFosterFamilyFosterAgreement: [],
      // listFosterFamilyMajorEvents: [],
      const params = {
        familyInfoVo,
        listFamilyMember,
        householderInfoVo,
        fosterFamilyInfoVo,
        spouseInfoVo,
        listFosterFamilyTrainedInfo: this.listFosterFamilyTrainedInfo,
        listFosterFamilyAssessment: this.listFosterFamilyAssessment,
        listFosterFamilyPhysicalExaminationInfo: this.listFosterFamilyPhysicalExaminationInfo,
        listFosterFamilyFosterAgreement: this.listFosterFamilyFosterAgreement,
        listFosterFamilyMajorEvents: this.listFosterFamilyMajorEvents
      }
      return params
    },
    async submit () {
      var isok = true
      // applyFrom
      this.From.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      this.applyFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      }) // basicFrom womenFrom
      this.basicFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      this.womenFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        const params = this.dataProcessing()
        if (this.$route.query.id) {
          const data = await this.post('/fosterFamilyInfo/updateFosterFamilyInfo', params, true)
          // let url = '/fosterFamilyInfo/updateFosterFamilyInfo'
          // let successText = '修改成功'
          if (data.errors == null) {
            this.$message.success('修改成功')
            this.backs()
          }
        } else {
          const data = await this.post('/fosterFamilyInfo/save', params, true)
          // let url = '/fosterFamilyInfo/save'
          // let successText = '提交成功'
          if (data.errors == null) {
            this.$message.success('提交成功')
            this.backs()
          }
        }
        // let data = await this.post(url, params, true)
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
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.tables {
  margin-top: 17px;
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
