<template>
  <!-- 申请 -->
  <div class="conts">
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="院长信息"
             :show.sync="showone"></Title>
      <ta-row ref="one">
        <ta-col :span="8">
          <ta-form-item label="姓名"
                        fieldDecoratorId="chairmanName"
                        :fieldDecoratorOptions="verificationRules('院长姓名',72)">
            <ta-input :disabled="personOK"
                      placeholder="请输入院长姓名" />
          </ta-form-item>
          <ta-form-item hidden
                        label="welfOrgId"
                        fieldDecoratorId="welfOrgId">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item label="学历"
                        fieldDecoratorId="education"
                        :require="{message:'请选择院长学历!'}">
            <!-- <ta-input :disabled="personOK" /> -->
            <ta-select :disabled="personOK"
                       placeholder="请选择院长学历">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in educationalBackgroundList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="是否法定代表人"
                        fieldDecoratorId="legalRepresentativeYOrN"
                        :require="{message:'请选择是否法定代表人'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择是否法定代表人">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>

        <ta-col :span="8">
          <ta-form-item label="性别"
                        fieldDecoratorId="sex"
                        :require="{message:'请选择院长性别'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择院长性别">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="专业"
                        fieldDecoratorId="major"
                        :fieldDecoratorOptions="verificationRules('院长专业',80)">
            <ta-input :disabled="personOK"
                      placeholder="请输入院长专业" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="8">
          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :require="{message:'请选择院长出生日期'}"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-date-picker :disabled="personOK"
                            style="width: 100%;"
                            placeholder="请选择院长出生日期" />
          </ta-form-item>
          <ta-form-item label="职称"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="title"
                        :require="{message:'请输入院长职称'}">
            <ta-select :disabled="personOK"
                       placeholder="请选择院长职称">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in titleList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>

    <div ref="twoout"
         class="mars">
      <Title id="anchorpoint_b"
             title="工作人员数量情况"
             :show.sync="showtwo"></Title>
      <ta-row ref="two">
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>正式编制人员</p>
          </ta-form-item>
          <ta-form-item label="社会工作者"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="socialWorkerRegularNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社会工作者数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="职工（非社会工作者）"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="workerRegularNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入职工（非社会工作者）数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>临聘人员</p>
          </ta-form-item>
          <ta-form-item label="社会工作者"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="socialWorkerTemporaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社会工作者数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="职工（非社会工作者）"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="workerTemporaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入职工（非社会工作者）数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>公益岗位</p>
          </ta-form-item>
          <ta-form-item label="社会工作者"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="socialWorkerPublicWelfareNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社会工作者数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="职工（非社会工作者）"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        fieldDecoratorId="workerPublicWelfareNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入职工（非社会工作者）数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
    <div ref="threeout"
         class="mars">
      <Title id="anchorpoint_c"
             title="专业技术人员数量"
             :show.sync="showthree"></Title>
      <ta-row ref="three">
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>初级</p>
          </ta-form-item>
          <ta-form-item label="医生"
                        fieldDecoratorId="doctorPrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入医生数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护士"
                        fieldDecoratorId="nursePrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入护士数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="教育"
                        fieldDecoratorId="teacherPrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入教育数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="康复保健师"
                        fieldDecoratorId="healthCareProfessionalsPrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入康复保健师数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="营养配餐师"
                        fieldDecoratorId="nutritionalCatererPrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入营养配餐师数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="社工人员"
                        fieldDecoratorId="socialWorkerPrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社工人员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护理员"
                        fieldDecoratorId="attendantPrimaryNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="其他"
                        fieldDecoratorId="otherPrimaryNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>中级</p>
          </ta-form-item>
          <ta-form-item label="医生"
                        fieldDecoratorId="doctorIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入医生数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护士"
                        fieldDecoratorId="nurseIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入护士数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="教育"
                        fieldDecoratorId="teacherIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入教育数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="康复保健师"
                        fieldDecoratorId="healthCareProfessionalsIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入康复保健师数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="营养配餐师"
                        fieldDecoratorId="nutritionalCatererIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入营养配餐师数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="社工人员"
                        fieldDecoratorId="socialWorkerIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社工人员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护理员"
                        fieldDecoratorId="attendantIntermediateNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="其他"
                        fieldDecoratorId="otherIntermediateNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p>高级</p>
          </ta-form-item>
          <ta-form-item label="医生"
                        fieldDecoratorId="doctorSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入医生数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护士"
                        fieldDecoratorId="nurseSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入护士数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="教育"
                        fieldDecoratorId="teacherSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入教育数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="康复保健师"
                        fieldDecoratorId="healthCareProfessionalsSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入康复保健师数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="营养配餐师"
                        fieldDecoratorId="nutritionalCatererSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入营养配餐师数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="社工人员"
                        fieldDecoratorId="socialWorkerSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入社工人员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="护理员"
                        fieldDecoratorId="attendantSeniorNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
          <ta-form-item label="其他"
                        fieldDecoratorId="otherSeniorNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
    <div ref="fourout"
         class="mars">
      <Title id="anchorpoint_d"
             title="工勤岗位人员数量情况"
             :show.sync="showfour"></Title>
      <ta-row ref="four">
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p style="margin-left: 115px;       width: 80px;">高级护理师</p>
          </ta-form-item>
          <ta-form-item label="孤残儿童护理员"
                        :labelCol="{span:17}"
                        :wrapperCol="{span:7}"
                        fieldDecoratorId="childCareSeniorNurseNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入孤残儿童护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p style="margin-left: 125px;       width: 80px;">护理师</p>
          </ta-form-item>
          <ta-form-item label="孤残儿童护理员"
                        :labelCol="{span:17}"
                        :wrapperCol="{span:7}"
                        fieldDecoratorId="childCareNurseNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入孤残儿童护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p style="margin-left: 115px;       width: 80px;">初级护理员</p>
          </ta-form-item>
          <ta-form-item label="孤残儿童护理员"
                        :labelCol="{span:17}"
                        :wrapperCol="{span:7}"
                        fieldDecoratorId="childCarePrimaryAttendantNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入孤残儿童护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p style="margin-left: 100px;       width: 80px;">中级护理员</p>
          </ta-form-item>
          <ta-form-item label="孤残儿童护理员"
                        :labelCol="{span:17}"
                        :wrapperCol="{span:7}"
                        fieldDecoratorId="childCareIntermediateAttendantNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入孤残儿童护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label
                        fieldDecoratorId="yz8">
            <p style="margin-left: 100px;       width: 80px;">高级护理员</p>
          </ta-form-item>
          <ta-form-item label="孤残儿童护理员"
                        :labelCol="{span:17}"
                        :wrapperCol="{span:7}"
                        fieldDecoratorId="childCareSeniorAttendantNum"
                        :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入孤残儿童护理员数量' }]}">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label="其他"
                        :labelCol="{ span: 17 }"
                        :wrapperCol="{ span: 7 }"
                        fieldDecoratorId="otherSeniorNurseNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label="其他"
                        :labelCol="{ span: 17 }"
                        :wrapperCol="{ span: 7 }"
                        fieldDecoratorId="otherNurseNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label="其他"
                        :labelCol="{ span: 17 }"
                        :wrapperCol="{ span: 7 }"
                        fieldDecoratorId="otherPrimaryAttendantNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label="其他"
                        :labelCol="{ span: 17 }"
                        :wrapperCol="{ span: 7 }"
                        fieldDecoratorId="otherIntermediateAttendantNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="4"
                style=" width: 20%;">
          <ta-form-item label="其他"
                        :labelCol="{ span: 17 }"
                        :wrapperCol="{ span: 7 }"
                        fieldDecoratorId="otherSeniorAttendantNum">
            <ta-input-number :min="0"
                             :max="9999"
                             :precision="0"
                             style="width:100%"
                             :disabled="personOK" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24"
                style=" float: right;width: 99%;">
          <ta-col :span="8">
            <ta-form-item label="护理人员"
                          fieldDecoratorId="nursingStaffNum"
                          :fieldDecoratorOptions="{rules: [{ required: isrequire, message: '请输入孤残护理人员数量' }]}">
              <ta-input-number :min="0"
                               :max="9999"
                               :precision="0"
                               style="width:100%"
                               :disabled="personOK" />
            </ta-form-item>
          </ta-col>
        </ta-col>
      </ta-row>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
// import childInfoMed from '../../../components/childInfoMed'
// import childInfoMedi from '../../../components/childInfoMedi'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'register',
  components: {
    Title
    // Title,
    // childInfoMed,
    // childInfoMedi
  },
  props: {
    personOK: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      goType: 0,
      showone: true,
      showthree: true,
      showfour: true,
      showtwo: true,
      // isrequire: window.parent.indexTool.getUserInfo().orgType == 99,
      isrequire: true,
      sexList: [],
      yesNoList: [],
      educationalBackgroundList: [],
      titleList: []
    }
  },
  mounted () {
    this.getyesNoList()
    this.getsexList()
    this.geteducationalBackgroundList()
    this.gettitleList()
  },
  methods: {
    // 是否字典
    async getyesNoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesNoList = data
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    async gettitleList () {
      const data = await this.getDictionaries('TITLE')
      this.titleList = data
    },
    // 学历
    async geteducationalBackgroundList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationalBackgroundList = data
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
      }
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    back () {
      this.$router.go(-1)
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
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin: 0 20px 0 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
}

.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 100%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.conts {
  width: 100%;
  min-height: 600px;
  background: #ffffff;
  padding: 14px 14px 98px 14px;
}
</style>
