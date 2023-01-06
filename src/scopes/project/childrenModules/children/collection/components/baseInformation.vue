<template>
  <ta-row class="fromcom tadrawer">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="儿童编号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="childNumber">
          <ta-input placeholder="请输入儿童编号"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="身份证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorId="'idCard'"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: idCardRequire, message: '请输入身份证号' },{validator:idCardValid}]}">
          <ta-input :placeholder="!idCardDisabled?'请输入身份证号':''"
                    :disabled="idCardDisabled" />
        </ta-form-item>

        <ta-form-item label="年龄"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="age">
          <ta-input placeholder=""
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="户籍性质"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="censusRegister"
                      :require="(tag==1?localDisabled:changedisabled)
                        ?false
                        :(togather
                          ?{message:'请选择户籍性质'}
                          :false)">
          <ta-select allowClear
                     @change="togatherChange($event,'censusRegister')"
                     :placeholder="!(tag==1?localDisabled:changedisabled)?'请选择户籍性质':''"
                     :disabled="tag==1?localDisabled:changedisabled">
            <ta-select-option v-for="item in censusRegisterList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <AddressComponent :addressmodel="addressmodel"
                          :msg="'户籍所在地'"
                          @adsvalchange="adsvalchange"
                          :clearPlaceHolder="tag==1?localDisabled:changedisabled"
                          :labelwidth="labelwidth"
                          arealevel="4"
                          :isRequire="(tag==1?localDisabled:changedisabled)
                        ?false
                        :(togather
                          ?true
                          :false)"
                          :disabled="isWshEdit||(tag==1?localDisabled:changedisabled)||isOnlyShow"
                          fileldName='censusRegisterDatas'
                          @setaddress="setaddress"
                          :isOrphanOrFact="isOther"
                          @clearAddress="clearAddress"
                          :key="timer"></AddressComponent>
        <AddressComponent :addressmodel="addressmodelNow"
                          :msg="'现住地址'"
                          arealevel="4"
                          :labelwidth="labelwidth1"
                          :isRequire="true"
                          fileldName='currentAddressDatas'
                          @setaddress="setaddress"
                          :disabled="disabled"></AddressComponent>
        <ta-form-item label="福利证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="welfareNumber"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('福利证号',20)">
          <ta-input :placeholder="!disabled?'请输入福利证号':''"
                    :disabled="disabled||isOther" />
        </ta-form-item>
        <ta-form-item label="养育类型"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="rearingType"
                      :require="{message:'请选择养育类型'}">
          <ta-select allowClear
                     @change="rearingTypeChange"
                     :placeholder="!disabled?'请选择养育类型':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in rearingTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>

      <ta-col :span="6">
        <ta-form-item label="儿童情况"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="childSituation"
                      :require="{message:'请选择儿童情况'}">
          <ta-input :placeholder="!disabled?'请选择儿童情况':''"
                    :class="disabled?'ant-input-disabled':''"
                    @click="chose('childSituation','childSituationList','儿童情况')"
                    :readOnly="true" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="birthday"
                      :require="togather?{message:'请选择出生日期'}:false">
          <ta-date-picker style="width: 100%;"
                          :allowClear="true"
                          :placeholder="!changedisabled&&!birthable?'请选择出生日期':''"
                          :disabled="changedisabled|| birthable || birthDisabled"
                          @change="setAgeByBirth($event,'birthday')"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="民族"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="nation"
                      :initValue="Enum.NATION.HZ"
                      :require="togather?{message:'请选择民族'}:false">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择民族':''"
                     @change="togatherChange($event,'nation')"
                     :disabled="disabled">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="申请日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="registerDate"
                      :require="{message:'请选择登记日期'}"
                      :initValue='registerDateValue'>
          <ta-date-picker style="width: 100%;"
                          :placeholder="!changedisabled?'请选择登记日期':''"
                          :disabled="isWshEdit||changedisabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="(tag==1?localDisabled:changedisabled)
                        ?verificationRulesNotMustFill('详细地址',100)
                        :(togather
                          ?verificationRules('详细地址',100)
                          :verificationRulesNotMustFill('详细地址',100))">
          <ta-input :placeholder="!(tag==1?localDisabled:changedisabled)?'请输入详细地址':''"
                    @change="togatherChange($event,'censusRegisterDetail')"
                    :disabled="isWshEdit||(tag==1?localDisabled:changedisabled)||isOnlyShow" />
        </ta-form-item>
        <ta-form-item label
                      fieldDecoratorId="currentAddressDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="verificationRules('详细地址',100)">
          <ta-input :placeholder="!disabled?'请输入详细地址':''"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="体检前是否隔离照料"
                      :labelCol="{ span: 13 }"
                      :wrapperCol="{span:11}"
                      fieldDecoratorId="ifIsolatedCare">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择体检前是否隔离照料':''"
                     :disabled="disabled||isOther">
            <ta-select-option v-for="item in ifIsolatedCareList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="接收后多久体检"
                      :labelCol="{ span: 11 }"
                      :wrapperCol="{span:13}"
                      fieldDecoratorId="physicalExaminationDay">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择接收后多久体检':''"
                     :disabled="disabled||isOther">
            <ta-select-option v-for="item in physicalExaminationDayList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="儿童姓名"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="verificationRules('儿童姓名',72)">
          <ta-input :placeholder="!changedisabled?'请输入儿童姓名':''"
                    :disabled="changedisabled" />
        </ta-form-item>
        <ta-form-item label="性别"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="sex"
                      :require="{message:'请选择性别'}">
          <ta-select allowClear
                     :placeholder="!changedisabled?'请选择性别':''"
                     :disabled="changedisabled">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="户口分类"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :initValue="isOther?Enum.HOUSEHOLDREGISTRYCLASSIFY.BXQHK:Enum.HOUSEHOLDREGISTRYCLASSIFY.FLYJTH"
                      fieldDecoratorId="householdRegistryClassify"
                      :require="togather?{message:'请选择户口分类'}:false">
          <ta-select :allowClear="false"
                     :placeholder="!disabled?'请选择户口分类':''"
                     :disabled="changedisabled||isOther"
                     @change="getRegistered($event,'householdRegistryClassify')">
            <ta-select-option v-for="item in householdRegistryClassifyList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="捡拾日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="pickingDate"
                      :require="{enable:!adoptOrSanju&&pickingRequire,message:'请选择捡拾日期'}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择捡拾日期':''"
                          :disabled="disabled||isOther"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="报请区域"
                      v-if="isOther"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="anotherPlaceAreaName"
                      :fieldDecoratorOptions="verificationRules('报请区域',100)">
          <ta-input :placeholder="'请输入报请区域'"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="捡拾地"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="pickingUpLand"
                      :fieldDecoratorOptions="!adoptOrSanju&&pickingRequire?verificationRules('捡拾地',100):verificationRulesNotMustFill('捡拾地', 100)">
          <ta-input :placeholder="!disabled?'请输入捡拾地':''"
                    :disabled="disabled||isOther" />
        </ta-form-item>
        <ta-form-item label="委托日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="principalDate">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择委托日期':''"
                          :disabled="disabled||isOther"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="工学情况"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="workStudy"
                      :require="{message:'请选择工学情况'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择工学情况':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in workStudyList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="残疾证号"
                      v-if="!isOther"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="physicalDisabilityNo"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('残疾证号',100)">
          <ta-input :placeholder="!disabled?'请输入残疾证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <div class="uploadimg">
          <div class="add_contract">
            <span @click="del"
                  v-if="delVisible"
                  title="点击可删除">删除</span>
            <div style="height:100%">
              <img v-if="imageUrl"
                   style="height:100%"
                   :src="imageUrl" />
            </div>
          </div>
          <ta-upload :withCredentials="true"
                     name="file"
                     class="avatar-uploader"
                     :action="actionUrl"
                     :showUploadList="false"
                     :data="adoption"
                     :fileList="fileList"
                     :limit=1
                     :beforeUpload="beforeUploadImg"
                     @preview="preview"
                     @change="handleChange">
            <ta-button :disabled="disabled">上传照片</ta-button>
          </ta-upload>
        </div>
        <ta-form-item label="委托方"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="principal">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择委托方':''"
                     :disabled="disabled||isOther">
            <ta-select-option v-for="item in principalList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="特教类型"
                      fieldDecoratorId="specialEducationType"
                      :require="childType=='3'?false:{message:'请选择特教类型'}">
          <ta-input :placeholder="!disabled?'请选择特教类型':''"
                    :class="disabled||isOther?'ant-input-disabled':''"
                    @click="chose('specialEducationType','specialEducationTypeList','特教类型')"
                    :readOnly="true" />
        </ta-form-item>
        <ta-form-item label="残疾证号"
                      v-if="isOther"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="physicalDisabilityNo"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('残疾证号',100)">
          <ta-input :placeholder="!disabled?'请输入残疾证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="12">
        <ta-form-item label="健康状况"
                      fieldDecoratorId="health"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      :require="{message:'请选择健康状况'}">
          <ta-radio-group @change="onChange"
                          :disabled="disabled">
            <ta-radio :value="item.value"
                      v-for="(item,index) in healthList"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item v-if="healthval==Enum.HEALTHSTATUS.OTHER"
                      label
                      fieldDecoratorId="healthOther"
                      :fieldDecoratorOptions="this.verificationRules('其他情况', 50)">
          <ta-input :disabled="disabled"
                    :placeholder="disabled?'':'请输入其他情况'" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="患病类型"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="illnessType"
                      :require="{enable:healthval==Enum.HEALTHSTATUS.CHRONICDISEASE||healthval==Enum.HEALTHSTATUS.SERIOUSILLNESS,message:'请选择患病类型'}">
          <ta-input :placeholder="!disabled?'请选择患病类型':''"
                    :class="disabled?'ant-input-disabled':''"
                    @click="chose('illnessType','illnessTypeList','患病类型')"
                    :readOnly="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="残疾等级"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="disabilityLevel"
                      :require="{enable:healthval==Enum.HEALTHSTATUS.DISABILITY,message:'请选择残疾等级'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择残疾等级':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in disabilityLevelList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="残疾类别"
                    :labelCol="{span:2}"
                    :wrapperCol="{span:22}"
                    fieldDecoratorId="disabilityType"
                    :initValue="[]"
                    :require="{enable:healthval==Enum.HEALTHSTATUS.DISABILITY,message:'请选择残疾类别'}">
        <ta-checkbox-group class="grant-checkbox"
                           :placeholder="!disabled?'请选择残疾类别':''"
                           :disabled="disabled"
                           @change="setMulti"
                           :values="disabilityTypeValues"
                           :options="disabilityTypeList">
        </ta-checkbox-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="患艾滋病情况"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{span:22}"
                    fieldDecoratorId="adisCondition"
                    :fieldDecoratorOptions="{initialValue: '1',rules: [{ required: true, message: '请选择患艾滋病情况'}]}">
        <ta-radio-group @change="radiochange"
                        style="width:100%"
                        :disabled="changedisabled">
          <ta-radio v-for="(item,index) in adisConditionList"
                    :key="index"
                    :disabled="item.value==Enum.ADISCONDITION.QT || radiovalue1 == Enum.ADISCONDITION.XDHGRAZB"
                    :value="item.value">{{item.label}}</ta-radio>
          <ta-input v-if="radiovalue==Enum.ADISCONDITION.QT"
                    :placeholder="!disabled?'请输入原因':''"
                    ref="adisConditionOther"
                    style='width:300px;'
                    :disabled="true" />
        </ta-radio-group>

      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">

      <ta-form-item label='确认艾滋病感染时间'
                    fieldDecoratorId="infectionTime"
                    :labelCol="{ span: 3 }"
                    style=" width: 100% !important;"
                    :wrapperCol="{span:21}"
                    :require="{message:'请选择确认艾滋病感染时间'}">
        <ta-date-picker style="width: 20%;"
                        :placeholder="!changedisabled?'请选择确认艾滋病感染时间':''"
                        :disabled="changedisabled"
                        :disabledDate="disabledDate" />
      </ta-form-item>
      <ta-form-item label='最有可能感染艾滋病途径'
                    fieldDecoratorId="transmissionWay"
                    :labelCol="{ span: 4 }"
                    :wrapperCol="{span:20}"
                    style=" width: 100% !important;"
                    :fieldDecoratorOptions="{initialValue: '1',rules: [{ required: true, message: '请选择最有可能感染艾滋病途径'}]}">
        <ta-radio-group @change="channel"
                        style="width:100%"
                        :disabled="changedisabled">
          <ta-radio v-for="(item,index) in transmissionWayList"
                    :key="index"
                    :value="item.value">{{item.label}}</ta-radio>
          <ta-input v-if="radiovalues==Enum.TRANSMISSIONWAYOTHER.QT"
                    :placeholder="!changedisabled?'请输入其他途径':''"
                    ref="transmissionWayOther"
                    style='width:300px;'
                    :disabled="changedisabled" />
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="其他救助"
                    :labelCol="{span:2}"
                    :wrapperCol="{span:22}"
                    fieldDecoratorId="otherRescue">

        <ta-input :placeholder="!disabled?'请选择其他救助':''"
                  :class="disabled?'ant-input-disabled':''"
                  @click="chose('otherRescue','otherRescueList','其他救助')"
                  :readOnly="true" />
      </ta-form-item>
      <ta-form-item label='备注'
                    fieldDecoratorId="remark"
                    :labelCol="{span:2}"
                    :wrapperCol="{span:22}"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
        <ta-textarea :placeholder="!disabled?'请输入备注':''"
                     :rows="4"
                     :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-drawer :title="title"
               placement="right"
               :getContainer="setContainer"
               :width="590"
               :closable="false"
               @close="handleCancel"
               :visible="choseshow">
      <selectModule v-if="choseshow"
                    :disabled="type=='specialEducationTypeList'?isOther:disabled"
                    :labelval.sync="labelval"
                    :selection.sync='selection'
                    :defaultval="defaultval"
                    :firstSelectNot="type=='childSituationList'||type=='otherRescueList'?true:false"
                    :otherval.sync='otherval'
                    :data="type=='illnessTypeList'?illnessTypeList:
                    (type=='specialEducationTypeList'?specialEducationTypeList:
                    (type=='childSituationList'?childSituationList:otherRescueList))"></selectModule>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="handleCancel">取消</ta-button>
        <ta-button @click="handleOk"
                   v-if="!disabled"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </ta-row>
</template>
<script>
import SelectModule from './selectModule'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    SelectModule,
    AddressComponent
  },
  props: ['disabled', 'isWshEdit', 'isOverAge', 'changedisabled', 'addressmodel', 'addressmodelNow', 'choselist', 'childType', 'adopt', 'adoptOrSanju', 'thisP', 'birthable', 'welfare', 'mechanismList', 'isOther', 'isOnlyShow'],
  data () {
    return {
      valueT: undefined,
      imageUrl: 'static/img/defalimg.png',
      loading: false,
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      radiovalue1: '', // 判断儿童类型是否为艾滋病
      choseshow: false, // 患病类型/特教类型抽屉
      filed: '',
      name: '',
      title: '',
      selection: [],
      labelval: '',
      othername: '',
      otherval: '',
      nowdata: [],
      defaultval: '',
      idCardRequire: true, // 身份证号的必填
      idCardDisabled: false, // 身份证号的只读
      birthDisabled: true, // 出生日期的只读
      pickingRequire: false, // 捡拾地、捡拾日期的必填
      togather: true, // 出生日期、民族、户口分类、户籍性质、户籍所在地一个填了全都必填
      censusRegisterRequire: true, // 户籍所在地的必填
      tag: 0, // 户籍性质与户籍所在地的只读控制开关，0不控制，1控制
      localDisabled: false, // 户籍性质与户籍所在地的只读
      tag1: 0, // 是否重病的只读控制开关，0不控制，1控制
      localIfSeriously: false, // 是否重病的只读控制
      id: '', // vo的id
      oldIdCard: null, // 刚进页面时的身份证号
      operateFlag: null, // 刚进页面时的操作标识

      childSituationList: [], // 儿童情况字典数据
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      censusRegisterList: [], // 户籍性质字典数据
      householdRegistryClassifyList: [], // 户口分类字典数据
      principalList: [], // 委托方字典数据
      physicalExaminationDayList: [], // 接收后多久体检字典数据
      ifIsolatedCareList: [], // 体检前是否隔离照料字典数据
      rearingTypeList: [], // 养育类型字典数据
      workStudyList: [], // 工学情况字典数据
      illnessTypeList: [], // 患病类型字典数据
      ifSeriouslyList: [], // 是否重病字典数据
      disabilityTypeList: [], // 残疾类别字典数据
      disabilityLevelList: [], // 残疾等级字典数据
      specialEducationTypeList: [], // 特教类型字典数据
      adisConditionList: [], // 患艾滋病情况字典数据
      transmissionWayList: [], // 最有可能感染艾滋病途径字典数据
      otherRescueList: [], // 其他救助字典数据
      healthList: [], // 健康状况的字典数据

      healthval: '', // 健康状况选择的数据
      selectValue: 0, // 选择的数据
      type: '', // 区分患病类型（illnessTypeList）、残疾类别（disabilityType）和特教类型（specialEducationTypeList）的标识符
      disabilityTypeValues: [], // 残疾类别选择的数据

      resobj: {}, // 身份证号后台验重后返回的数据
      isNotSubmit: true, // 是否是暂存或提交的操作

      delVisible: false, // 文件上传的删除按钮显示
      adoption: { // 头像上传的参数
        busiType: '50', // 头像
        functionalType: '2'
      },
      sameaddresslist: [{ label: '', value: '1' }],
      headImgId: '', // 上传的头像id
      fileList: [], // 文件列表
      labelwidth: {
        label: 8,
        wrapper: 16
      },
      labelwidth1: {
        label: 7,
        wrapper: 17
      },
      idCardWhitList: [ // 过滤超过18周岁的身份证号码
        // 广西壮族自治区
        '45012120000910631X',
        '450804199901012329',
        '450922200109130931',
        '450922200201181563',
        '450922200103280162',
        '450922200102033725',
        '450922199906150489',
        '450922200102181699',
        '450922199908140188',
        '450922200102231705',
        '450922200012180756',
        '450922200108222615',
        '450922200012040892',
        '450922200202040885',
        '450922200006182499',
        '450922199911082994',
        '450922199811012948',
        '450922199902052523',
        '45092220001108309X',
        '450902200202196083',
        '450902200110071267',
        '452627200011090107',
        '452627200003250721',
        '452627199908181876',
        '452627200208050715',
        '451229200010012713',
        '452731200104062121',
        '451229199507025733',
        // 山西
        '140224200204139346',
        '142732200106134022',
        '14082919991123005X',
        '140429200001295624',
        '140423200001090823',
        '140427200010118088',
        '14043019991221002X',
        '140430199908278443',
        '140602200103298800',
        // 福建
        '350102200007111710',
        '350181199804271784',
        '350181199908191826',
        '350505199811108526',
        '350582200001142528',
        '350524199912044663',
        '350426200005245018',
        '350427200009293021',
        '350425200202092616',
        '350781199912103625',
        '350783200004291219',
        '350723200204242829',
        '350821199404062117',
        '35220319990429202X',
        '350982199504070024',
        '350924200106290111',
        '350128200108133269',
        // 辽宁
        '21031120010408241X',
        '210381200011124915',
        '210381199406220236',
        '210302200205152417',
        '210302200002291513',
        '210302200110290323',
        '210321199912160823',
        '210321200204250815',
        '210321200101161414',
        '210321200005141624',
        '210321200102051823',
        '210321200305020648',
        '210403200201260914',
        '210503200102280616',
        '21052220001208352X',
        '210522200011040018',
        '210502200004150926',
        '210502200006100324',
        '210726200206286719',
        '210921200111099143',
        '210921200104097326',
        '210921200008304911',
        '210921200002011111',
        '210921200205301429',
        '210921200203065223',
        '210902200006255512',
        '211021199411133522',
        '211021200208303528',
        '211011200106075621',
        '21100520021228311X',
        '211021200012288813',
        '211022199607171017',
        '21102220000626001X',
        '211121200304140015',
        '211121200304013630',
        '211122200009091720',
        '211122200009152618',
        '211103200312124012',
        '211204200001171518',
        '211223200004022031',
        '211223200005293845',
        '211223200010031022',
        '211223200101280817',
        '211223200310290210',
        '211223200002210645',
        '211223199906110641',
        '211224200106057717',
        '211224200106112210',
        '211224200208087212',
        '211202200306080016',
        '211202200103010536',
        '211203199903010017',
        '211481200201142248',
        '211421200104201414',
        '211421200104283018',
        '211422200004200920',
        '21142220010726701X',
        '210112200204251626',
        '210112200204091829',
        // 海南
        // '460200199805014029',
        // '460200200211180535',
        // '460200199905110018',
        // '460027200303027318',
        // '46000219980722462X',
        // '46900720020522082X',
        // '460028200001252014',
        // '460028200106066824',
        // '460028199905230429',
        // '469024200010132420',
        // '469024200003107219',
        // '460028199909013229',
        // '460028200009230020',
        // '469024200002155622',
        // '460028200109233210',
        // '460028199909166049',
        // '469024199904065620',
        // '46902420021231242x',
        // '469024200302225610',
        // '469024200204185635',
        // 浙江
        '330227200105241825',
        '330381200107282245',
        '330381200102264013',
        '330326200211044373',
        '330481200209272035',
        '330421200206280041',
        '330682200202285068',
        '330825200207030420',
        '331102200011236521',
        '332502200110010029',
        '332502200006253987',
        // 河北
        '130185200108150049',
        '130184200005284910',
        '130184200012064019',
        '130130200101010320',
        '130323200111162624',
        '130323200110263116',
        '130283200008043353',
        '130223200109137213',
        '130827199704180024',
        '130802199811021611',
        '13082820010329671X',
        '130823200112175926',
        '130528199303166061',
        '130528199908183614',
        '130528200012010812',
        '130528200208081217',
        '130705199905207218',
        '130729200110132925',
        '130604200101250927',
        '130804200001030012',
        '130822200205030025'
      ],
      registerDateValue: moment().locale('zh-cn'), // 登记类型默认显示当前日期
      options: [{
        value: '1000000000000272394',
        label: '虚拟A省',
        children: [
          {
            value: '1100000000003319304',
            label: '虚拟一市',
            children: [{
              value: '1100000000003319380',
              label: '虚拟一县',
              children: [{
                value: '1100000000003319408',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008359842',
              label: '虚拟二县',
              children: [{
                value: '1100000000008359902',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008359915',
              label: '虚拟三县',
              children: [{
                value: '1100000000008359970',
                label: '虚拟一街道'
              }]
            }]
          },
          {
            value: '1100000000003333178',
            label: '虚拟二市',
            children: [{
              value: '1100000000003333206',
              label: '虚拟一县 ',
              children: [{
                value: '1100000000003333277',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360293',
              label: '虚拟二县 ',
              children: [{
                value: '1100000000008360623',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360303',
              label: '虚拟三县 ',
              children: [{
                value: '1100000000008360639',
                label: '虚拟一街道'
              }]
            }]
          },
          {
            value: '1100000000003333313',
            label: '虚拟三市',
            children: [{
              value: '1100000000003333341',
              label: '虚拟一县',
              children: [{
                value: '1100000000003333360',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360330',
              label: '虚拟二县',
              children: [{
                value: '1100000000008360659',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360341',
              label: '虚拟三县',
              children: [{
                value: '1100000000008360672',
                label: '虚拟一街道'
              }]
            }]
          },
          {
            value: '1100000000003333649',
            label: '虚拟四市',
            children: [{
              value: '1100000000003333672',
              label: '虚拟一县',
              children: [{
                value: '1100000000003333707',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360429',
              label: '虚拟二县',
              children: [{
                value: '1100000000008360705',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360440',
              label: '虚拟三县',
              children: [{
                value: '1100000000008360714',
                label: '虚拟一街道'
              }]
            }]
          },
          {
            value: '1100000000003333385',
            label: '虚拟五市',
            children: [{
              value: '1100000000003333401',
              label: '虚拟一县',
              children: [{
                value: '1100000000003333424',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360386',
              label: '虚拟二县',
              children: [{
                value: '1100000000008360684',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360397',
              label: '虚拟三县',
              children: [{
                value: '1100000000008360696',
                label: '虚拟一街道'
              }]
            }]
          },
          {
            value: '1100000000003333770',
            label: '虚拟六市',
            children: [{
              value: '1100000000003333797',
              label: '虚拟一县',
              children: [{
                value: '1100000000003333820',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360493',
              label: '虚拟二县',
              children: [{
                value: '1100000000008360731',
                label: '虚拟一街道'
              }]
            }, {
              value: '1100000000008360504',
              label: '虚拟三县',
              children: [{
                value: '1100000000008360744',
                label: '虚拟一街道'
              }]
            }]
          }
        ]
      }],
      timer: '' // 户籍地的key
    }
  },
  activated () {
    this.tag = 0
    this.tag1 = 0
    this.disabilityTypeValues = []
    this.idCardRequire = true
    // 重置户籍地的key 防止共用时出现问题
    this.timer = new Date().getTime()
    this.setTogather(false)
  },
  updated () {
    // this.setLabelAndWrapperWidth('7%', '93%', 'alonerow') // 单独一行字段宽度控制
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 户籍地选择为“新疆兵团或新疆维吾尔自治区”时，页面给出提示“系统尚未联通” 2021年6月17日16:35:49
    clearAddress (msg, isClear) {
      this.$message.warn(msg)
      if (isClear) {
        this.$emit('clearAddress')
      }
    },
    // 初始判断控制禁用或编辑
    judgeDisabledOrEdit (e) {
      // 判断户口类别控制身份证号、出生日期、户籍性质、户籍所在地等的禁用编辑
      if (e && e.childBaseInformationVo.householdRegistryClassify == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.idCardDisabled = true
        this.birthDisabled = false
        this.localDisabled = true // denghiameng  无户口暂存编辑
      }
    },

    // 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
    handleChange2 (value) {
      this.valueT = value
    },
    async handleSearch (value) {
      const data = await this.post('welfareOrgManagement/queryListByOrgId', { orgName: value })
      this.$emit('update:mechanismList', data.data.data)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    preview (file) { this.downloadFile(file) },
    // 儿童基本信息的字典数据获取
    async getMenuDatas () {
      this.childSituationList = await this.getDictionaries('CHILDSITUATION') // 获取儿童情况字典数据
      // 进行排序，将其他放到最后
      this.childSituationList.sort(function (a, b) {
        return parseInt(a.value) - parseInt(b.value)
      })
      this.sexList = await this.getDictionaries('SEX') //  获取性别字典数据
      this.nationList = await this.getDictionaries('NATION') // 获取民族字典数据
      this.censusRegisterList = await this.getDictionaries('CENSUSREGISTER') // 获取户籍性质字典数据
      this.householdRegistryClassifyList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY') // 获取户口分类字典数据
      this.principalList = await this.getDictionaries('PRINCIPAL') // 获取委托方字典数据
      this.physicalExaminationDayList = await this.getDictionaries('PHYSICALEXAMINATIONDAY') // 获取接收后多久体检字典数据
      this.ifIsolatedCareList = await this.getDictionaries('YESNO') // 获取体检前是否隔离照料字典数据
      this.workStudyList = await this.getDictionaries('WORKSTUDY') // 获取工学情况字典数据
      this.illnessTypeList = await this.getDictionaries('ILLNESSTYPE') // 获取患病类型字典数据
      // 进行排序，将其他放到最后
      this.illnessTypeList.sort(function (a, b) {
        return parseInt(a.value) - parseInt(b.value)
      })
      this.ifSeriouslyList = await this.getDictionaries('YESNO') // 获取是否重病字典数据
      this.disabilityTypeList = await this.getDictionaries('DISABILITYTYPE') // 获取残疾类别字典数据
      this.disabilityLevelList = await this.getDictionaries('DISABILITYLEVEL') // 获取残疾等级字典数据
      this.specialEducationTypeList = await this.getDictionaries('SPECIALEDUCATIONTYPE') // 获取特教类型字典数据
      this.adisConditionList = await this.getDictionaries('ADISCONDITION') // 获取患艾滋病情况字典数据
      this.transmissionWayList = await this.getDictionaries('TRANSMISSIONWAYOTHER') // 获取最有可能感染艾滋病途径字典数据
      this.otherRescueList = await this.getDictionaries('OTHERRESCUE') // 获取其他救助字典数据
      this.healthList = await this.getDictionaries('HEALTHONE') // 获取健康状况字典数据
    },
    // 健康状况的change事件
    onChange (e) {
      this.healthval = e.target.value
    },
    // 编辑查看时，其他数据的赋值
    setOtherDatas (a, b) {
      this.$nextTick(() => {
        if (this.$refs.transmissionWayOther != undefined) {
          this.$refs.transmissionWayOther.stateValue = a
        }
        if (this.$refs.adisConditionOther != undefined) {
          this.$refs.adisConditionOther.stateValue = b
        }
      })
    },
    // 患病类型、特教类型、其他救助、儿童情况
    chose (filed, dataname, title) {
      // 抽屉打开时清空缓存数据、
      this.selection = []
      this.filed = ''
      this.othername = ''
      this.otherval = ''
      this.labelval = ''
      this.defaultval = ''

      this.type = dataname
      if (this.choselist[filed]) {
        this.defaultval = this.choselist[filed]
      } else {
        this.defaultval = ''
      }
      if (this.choselist[`${filed}Other`]) {
        this.otherval = this.choselist[`${filed}Other`]
      } else {
        this.otherval = ''
      }
      this.labelval = this.choselist[`${filed}Label`]

      this.selection = this.choselist[`${filed}`]

      this.choseshow = true
      this.filed = filed
      this.name = name
      this.title = title
    },
    handleCancel () {
      this.choseshow = false
    },
    handleOk () {
      const obj = {
        filed: this.filed,
        val: this.selection,
        othername: this.othername,
        otherval: this.otherval,
        labelval: this.labelval
      }
      // 当儿童情况为“疑似被遗弃儿童05”、“疑似遗失走失06”，则捡拾地、捡拾日期为必填项，否则为不可填项。
      if (this.filed == 'childSituation') {
        if (this.selection.indexOf(this.Enum.CHILDSITUATION.YSBYQET) != -1 || this.selection.indexOf(this.Enum.CHILDSITUATION.YSYSZS) != -1) {
          this.pickingRequire = true
        } else {
          this.pickingRequire = false
          this.thisP.adoptedFrom.setFieldsValue({ pickingDate: null, pickingUpLand: null })
        }
      }
      // 患病类型选择无疾病时，是否重病禁用，并置空
      if (this.filed == 'illnessType') {
        if (this.selection == this.Enum.ILLNESSTYPE.WJB) {
          this.tag1 = 1 // 开启是否重病本页面只读控制权限
          this.localIfSeriously = true
          this.$emit('clearIfSeriously')
        } else {
          this.localIfSeriously = false
        }
      }

      this.$emit('chosedata', obj)
      this.choseshow = false
    },
    // 患艾滋病情况
    radiochange (val) {
      this.radiovalue = val.target.value + ''
      if (val.target.value != this.Enum.ADISCONDITION.XDHGRAZB) {
        this.radiovalues = ''
      }
      this.$emit('changehei')
    },
    // 最有可能感染艾滋病途径
    channel (val) {
      this.radiovalues = val.target.value + ''

      this.$emit('changehei')
    },
    // 如果选了多重残疾外的超过2个残疾，则多重残疾为选中
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    // 查看或编辑时 是否显示条件模块处理（确认感染艾滋病时间等）
    ifDatasProcess (e, state) {
      if (e && e != undefined) {
        if (state == 'look_now') { // 实时
          this.radiovalue = e.childBaseInformationVo ? e.childBaseInformationVo.adisCondition : ''
          this.radiovalues = e.childBaseInformationVo ? e.childBaseInformationVo.transmissionWay : ''
          this.selectValue = e.childBaseEnterWelfareInstitutionVo ? e.childBaseEnterWelfareInstitutionVo.otherRescue : ''
        } else if (state == 'look_zd') { // 在档
          this.radiovalue = e.adisCondition
          this.radiovalues = e.transmissionWay
          this.selectValue = e.otherRescue
        } else {
          this.radiovalue = ''
          this.radiovalues = ''
          this.selectValue = ''
        }
      } else {
        this.radiovalue = ''
        this.radiovalues = ''
        this.selectValue = ''
      }
    },
    // 出生日期（登记日期、委托时间）不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 地址数据回调
    setaddress () {
      this.$emit('setaddress')
    },
    // 养育类型的change事件
    rearingTypeChange (e) {
      if (this.childType == '1' || this.childType == '2') {
        if (!this.changedisabled) {
          this.$emit('clearDataAndErroInfo', 'cptAdoptorFrom', ['startTime', 'receiver', 'payment', 'receiverRelation', 'openBank', 'bankNumber'])
          this.$emit('clearDataAndErroInfo', 'physicalPxaminationForm', ['physicalDate', 'physicalOrg', 'physicalSummed', 'file'])
          // 类型为收养时
          e == this.Enum.REARINGTYPE.SY && this.$emit('adoptionEmitEvent')
        }
        this.$emit('update:adopt', e == this.Enum.REARINGTYPE.SY)
        this.$emit('update:adoptOrSanju', e == this.Enum.REARINGTYPE.SY)
      } else {
        this.$emit('update:adopt', false)
        this.$emit('update:adoptOrSanju', this.childType == this.Enum.CHILDCATEGORYA.SHSJET || this.childType == '6')// 区县的散居孤儿
      }
      this.$emit('assignEndTime')
    },
    handleChange (info) {
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
        // Get this url from response in real world.

        if (info.file.response.serviceSuccess) {
          this.headImgId = info.file.response.data.data.fileid
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl
            this.loading = false

            this.delVisible = true
          })
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUploadImg (file) {
      if (this.headImgId != '') {
        this.$message.error('请删除原有头像再进行上传！')
        return false
      }
      const typelist = [
        'image/jpeg',
        'image/png'
      ]
      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传jpeg、png图片格式')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小大于10M!')
      }
      return isaccord && isLt10M
    },
    // 重置附件列表
    resetFileDatas () {
      this.imageUrl = 'static/img/defalimg.png'
      this.delVisible = false
      this.headImgId = '' // 上传的头像id
      this.fileList = [] // 文件列表
    },
    // 文件点击删除
    del () {
      if (this.disabled) {
        return false
      }
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: _self.headImgId
      })
        .then((response) => {
          _self.$message.success('头像删除成功!')

          _self.headImgId = ''
        })
        .catch(() => {
          _self.$message.error('头像删除失败!')
        })

      _self.imageUrl = 'static/img/defalimg.png'
      _self.delVisible = false
    },
    // 户口分类选择的数据
    getRegistered (e) {
      this.$emit('update:hasRegistered', !!(e && e != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK))
      this.tag = 1 // 开始控制户籍性质及户籍所在地的只读
      // 有户口时，身份证必填，户籍性质及户籍所在地设为非只读
      if (e && e != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.idCardRequire = true
        this.localDisabled = false
        this.idCardDisabled = false
        this.birthDisabled = true
        // this.censusRegisterRequire = true
      }
      // 无户口时，身份证不必填，户籍性质及户籍所在地设为只读
      if (e == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.idCardRequire = false
        this.idCardDisabled = true
        this.localDisabled = true
        this.birthDisabled = false
        // this.censusRegisterRequire = false
        this.$emit('clearDatas')
      }
      // 设置togather
      if (e) { // 有值
        this.setTogather(true, 'householdRegistryClassify')
      } else { // 无值
        this.setTogather(false, 'householdRegistryClassify')
        this.idCardRequire = false
      }
    },
    onChangecensusRegisterDatas (value, selectedOptions) {
      // 设置togather
      if (value) { // 有值
        if (this.isOther) {
          const orgData = {
            anotherPlaceAreaId: selectedOptions[selectedOptions.length - 2].value,
            anotherPlaceAreaName: selectedOptions[selectedOptions.length - 2].label
          }
          this.thisP.orgData = orgData
          this.thisP.adoptedFrom.setFieldsValue({ anotherPlaceAreaName: orgData.anotherPlaceAreaName })
        }
        this.setTogather(true, 'censusRegisterDatas')
      } else { // 无值
        this.setTogather(false, 'censusRegisterDatas')
      }
    },
    idCardValid (rule, value, callback) {
      setTimeout(() => {
        const _self = this
        let age
        if (value) {
          age = this.isAgeOver(value)
        }
        if (this.idCardWhitList.indexOf(value) == -1) {
          if (!this.isOverAge && age >= 18 && this.isNotSubmit) {
            this.$message.error('该儿童已满18周岁，不能进行基本生活费申请')
            this.thisP.adoptedFrom.setFieldsValue({ idCard: null })
            return false
          }
          if (this.isOverAge && age < 18 && this.isNotSubmit) {
            this.$message.error('该儿童未满18周岁，不能进行超龄补录申请')
            this.thisP.adoptedFrom.setFieldsValue({ idCard: null })
            return false
          }
        }
        if (!this.id || value != this.oldIdCard) { // 新增或编辑但身份证号改变时，进行验重操作
          const dictValue = this.Enum.CHILDCATEGORYA
          let childType = ''
          switch (this.childType) {
            case dictValue.FLJGYYGQET:// 福利机构养育孤弃儿童
              childType = '202'
              break
            case dictValue.FLJGGYKJET:// 福利机构供养困境儿童
              childType = '199'
              break
            case dictValue.SHSJET:// 社会散居儿童
              childType = '201'
              break
            case dictValue.MBJGYYGQET:// 民间机构养育孤弃儿童
              childType = '203'
              break
            case dictValue.AZBBDGRET:// 艾滋病病毒感染儿童
              childType = '300'
              break
            case dictValue.QT:// 其他
              childType = '999'
              break
          }
          this.idCardValidate(rule, value, callback, _self, null, childType)
        } else { // 否则不进行验重
          this.idCardValidate(rule, value, callback, _self, null)
        }
      }, 300)
    },
    isAgeOver (value) {
      const iden = value
      const myDate = new Date()
      const month = myDate.getMonth() + 1
      const day = myDate.getDate()
      const len = value.length
      let age = 0
      if (len === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1
        if (
          iden.substring(10, 12) < month ||
          (iden.substring(10, 12) == month && iden.substring(12, 14) < day)
        ) {
          age++
        }
      }
      if (len === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901
        if (
          iden.substring(8, 10) < month ||
          (iden.substring(8, 10) == month && iden.substring(10, 12) < day)
        ) {
          age++
        }
      }
      return age
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      this.$emit('setValueByIdCard', val)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
    },
    // 出生日期change事件
    setAgeByBirth (e) {
      this.$emit('setAgeByBirth', e ? moment(e).format('YYYY-MM-DD') : null)
      // 设置togather
      if (e) { // 有值
        this.setTogather(true, 'birthday')
      } else { // 无值
        this.setTogather(false, 'birthday')
      }
      this.$emit('assignEndTime')
    },
    // 出生日期、民族、户口分类、户籍性质、户籍所在地一个填了全都必填
    setTogather (e, name) {
      this.$emit('setTogather', e, name)
    },
    // 户籍地址判断有没有值
    async adsvalchange (e, areaLevel) {
      // 设置togather
      if (e) { // 有值
        if (this.isOther) {
          const orgData = {
            anotherPlaceAreaId: areaLevel[areaLevel.length - 1].areaid,
            anotherPlaceAreaName: areaLevel[areaLevel.length - 1].areaname
          }
          this.thisP.orgData = orgData
          this.thisP.adoptedFrom.setFieldsValue({ anotherPlaceAreaName: orgData.anotherPlaceAreaName })
        }
        this.setTogather(true, 'censusRegisterDatas')
      } else { // 无值
        this.setTogather(false, 'censusRegisterDatas')
      }
    },
    // 民族、详细地址/户籍性质判断有没有值
    togatherChange (e, name) {
      if (e) { // 有值
        this.setTogather(true, name)
      } else { // 无值
        this.setTogather(false, name)
      }
    }
  },
  computed: {
    actionUrl () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
<style scoped lang="less">
.uploadimg {
  width: 100%;
  height: 230px;
  display: flex;
  margin-bottom: 50px;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}
.add_contract {
  width: 50%;
  height: 75%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.add_contract span {
  width: 100%;
  z-index: 1111;
  position: absolute;
  bottom: 0;
  padding: 6px;
  background: #000;
  opacity: 0.7;
  color: #fff;
  display: none;
}
.add_contract:hover span {
  display: block;
}
.avatar-uploader {
  margin-top: 5%;
}
.grant-checkbox {
  width: 100%;
}
</style>
