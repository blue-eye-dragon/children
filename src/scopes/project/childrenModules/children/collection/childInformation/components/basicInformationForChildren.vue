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
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :require="{message:'请选择性别'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择性别':''"
                     :disabled="disabled || isIdcard">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :initValue="Enum.NATION.HZ"
                      :require="{message:'请选择民族'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择民族':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <AddressComponent :addressmodel="addressmodel"
                          :msg="'户籍所在地'"
                          :labelwidth="labelwidth"
                          arealevel="4"
                          :isRequire="censusRegisterRequire"
                          :disabled="localDisabled?localDisabled:disabled"
                          fileldName='censusRegisterDatas'
                          @adsvalchange='radiochange1'
                          @setaddress="setaddress"></AddressComponent>
      </ta-col>

      <ta-col :span="6">
        <ta-form-item label="儿童姓名"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="verificationRules('儿童姓名',72)">
          <ta-input placeholder="请输入儿童姓名"
                    :disabled="disabled" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="birthday"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :placeholder="!disabled?'请选择出生日期':''"
                          :disabled="disabled || isIdcard"
                          @change="setAgeByBirth"
                          :disabledDate="disabledDate1" />
        </ta-form-item>
        <ta-form-item label="户籍性质"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="censusRegister"
                      :require="censusRegisterRequire?{message:'请选择户籍性质'}:false">
          <ta-select allowClear
                     :placeholder="!(localDisabled?localDisabled:disabled)?'请选择户籍性质':''"
                     :disabled="localDisabled?localDisabled:disabled">
            <ta-select-option v-for="item in censusRegisterList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="censusRegisterRequire?verificationRules('详细地址',100):verificationRulesNotMustFill('详细地址',100)">
          <ta-input :placeholder="!(localDisabled?localDisabled:disabled)?'请输入详细地址':''"
                    :disabled="localDisabled?localDisabled:disabled"
                    @change="radiochange1" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身份证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: idCardRequire, message: '请输入身份证号' },{validator:idCardValid}]}">
          <ta-input :placeholder="!disabled?'请输入身份证号':''"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="年龄"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="age">
          <ta-input placeholder="请输入儿童年龄"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="户口分类"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="householdRegistryClassify"
                      :require="{message:'请选择户口分类'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择户口分类':''"
                     :disabled="disabled"
                     @change="getRegistered">
            <ta-select-option v-for="item in householdRegistryClassifyList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="捡拾日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="pickingDate">
          <!-- :require="{message:'请选择捡拾日期'}" -->
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择捡拾日期':''"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <!-- <ta-form-item label="同现住址"
                      fieldDecoratorId='sameAddress'
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }">
          <ta-checkbox-group :options="sameaddresslist"
                             @change="radiochange1"
                             :disabled="localDisabled?localDisabled:disabled" />
        </ta-form-item> -->
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
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <AddressComponent :addressmodel="addressmodelNow"
                          :msg="'现住址'"
                          arealevel="4"
                          :labelwidth="labelwidth"
                          :isRequire="true"
                          fileldName='currentAddressDatas'
                          @setaddress="setaddress1"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label
                      fieldDecoratorId="currentAddressDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="verificationRules('详细地址',100)">
          <ta-input :placeholder="!disabled?'请输入详细地址':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="特教类型"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="specialEducationType"
                      :require="{message:'请选择特教类型'}">
          <ta-input :placeholder="!disabled?'请选择特教类型':''"
                    @click="chose('specialEducationType','specialEducationTypeList','特教类型')"
                    :disabled="disabled"
                    :readOnly="true" />
        </ta-form-item>
      </ta-col>
      <!-- <ta-col :span="6">
        <ta-form-item label="是否重病"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="ifSeriously">
          <ta-select allowClear
                     placeholder="请选择是否重病"
                     :disabled="tag1==1?localIfSeriously:disabled">
            <ta-select-option v-for="item in ifSeriouslyList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col> -->
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="委托方"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="principal">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择委托方':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in principalList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="委托日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="principalDate">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择委托日期':''"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="福利证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="welfareNumber"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('福利证号',20)">
          <ta-input :placeholder="!disabled?'请输入福利证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <!-- <ta-col :span="6">
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
      </ta-col> -->
      <ta-col :span="6">
        <ta-form-item label="养育类型"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="rearingType"
                      :require="{message:'请选择养育类型'}">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择养育类型':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in rearingTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="体检前是否隔离照料"
                      :labelCol="{ span: 13 }"
                      :wrapperCol="{span:11}"
                      fieldDecoratorId="ifIsolatedCare">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择体检前是否隔离照料':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in ifIsolatedCareList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="接收后多久体检"
                      :labelCol="{ span: 11 }"
                      :wrapperCol="{span:13}"
                      fieldDecoratorId="physicalExaminationDay">
          <ta-select allowClear
                     :placeholder="!disabled?'请选择接收后多久体检':''"
                     :disabled="disabled">
            <ta-select-option v-for="item in physicalExaminationDayList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="残疾证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="physicalDisabilityNo"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('残疾证号',20)">
          <ta-input :placeholder="!disabled?'请输入残疾证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="24">
        <ta-col :span="16">
          <ta-form-item label="健康状况"
                        fieldDecoratorId="health"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 21 }"
                        :require="{message:'请选择健康状况'}">
            <ta-radio-group @change="onChange"
                            :disabled="disabled">
              <ta-radio :value="item.value"
                        v-for="(item,index) in healthList"
                        :key="index">{{item.label}}</ta-radio>
            </ta-radio-group>
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
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
                        fieldDecoratorId="illnessType">
            <ta-input :placeholder="!disabled?'请选择患病类型':''"
                      @click="chose('illnessType','illnessTypeList','患病类型')"
                      :disabled="disabled"
                      :readOnly="true" />
          </ta-form-item>

        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="残疾等级"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="disabilityLevel">
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
                      class='alonerow'
                      fieldDecoratorId="disabilityType"
                      :fieldDecoratorOptions="{initialValue: []}">
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
        <ta-form-item :labelCol="{ span: 2 }"
                      :wrapperCol="{span:22}"
                      label="患艾滋病情况"
                      fieldDecoratorId="adisCondition"
                      :fieldDecoratorOptions="{initialValue: '1',rules: [{ required: true, message: '请选择患艾滋病情况'}]}">
          <ta-radio-group @change="radiochange"
                          style="width:100%"
                          :disabled="disabled">
            <ta-radio v-for="(item,index) in adisConditionList"
                      :key="index"
                      :value="item.value">{{item.label}}</ta-radio>
            <ta-input v-if="radiovalue==Enum.ADISCONDITION.QT"
                      :placeholder="!disabled?'请输入原因':''"
                      ref="adisConditionOther"
                      style='width:300px;'
                      :disabled="disabled" />
          </ta-radio-group>

        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">
        <ta-form-item label='确认艾滋病感染时间'
                      fieldDecoratorId="infectionTime"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      :require="{message:'请选择确认艾滋病感染时间'}">
          <ta-date-picker style="width: 20%;"
                          :placeholder="!disabled?'请选择确认艾滋病感染时间':''"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">
        <ta-form-item label='最有可能感染艾滋病途径'
                      fieldDecoratorId="transmissionWay"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      :fieldDecoratorOptions="{initialValue: '1',rules: [{ required: true, message: '请选择最有可能感染艾滋病途径'}]}">
          <ta-radio-group @change="channel"
                          style="width:100%"
                          :disabled="disabled">
            <ta-radio v-for="(item,index) in transmissionWayList"
                      :key="index"
                      :value="item.value">{{item.label}}</ta-radio>
            <ta-input v-if="radiovalues==Enum.TRANSMISSIONWAYOTHER.QT"
                      :placeholder="!disabled?'请输入其他途径':''"
                      ref="transmissionWayOther"
                      style='width:300px;'
                      :disabled="disabled" />
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="其他救助"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="otherRescue">
          <ta-input :placeholder="!disabled?'请选择其他救助':''"
                    @click="chose('otherRescue','otherRescueList','其他救助')"
                    :disabled="disabled"
                    :readOnly="true" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label='备注'
                    fieldDecoratorId="remark"
                    class='alonerow'
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
  props: ['disabled', 'addressmodel', 'addressmodelNow', 'choselist', 'childType', 'thisP'],
  data () {
    return {
      isIdcard: false,
      birthday: '',
      healthval: '',
      imageUrl: 'static/img/defalimg.png',
      loading: false,
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      choseshow: false, // 患病类型/特教类型抽屉
      filed: '', // 抽屉多选框用到的数据
      name: '', // 抽屉多选框用到的数据
      title: '', // 抽屉多选框用到的数据
      selection: [], // 抽屉多选框用到的数据
      labelval: '', // 抽屉多选框用到的数据
      othername: '', // 抽屉多选框用到的数据
      otherval: '', // 抽屉多选框用到的数据
      nowdata: [], // 抽屉多选框用到的数据
      defaultval: '', // 抽屉多选框用到的数据
      idCardRequire: true, // 身份证号的必填
      censusRegisterRequire: true, // 户籍所在地的必填
      localDisabled: false, // 户籍性质与户籍所在地的只读
      tag1: 0, // 是否重病的只读控制开关，0不控制，1控制
      localIfSeriously: false, // 是否重病的只读控制
      id: '', // vo的id
      oldIdCard: null, // 刚进页面时的身份证号
      operateFlag: null, // 刚进页面时的操作标识

      childSituationList: [], // 儿童情况字典数据
      sexList: [], // 性别字典数据
      healthList: [], // 健康状况的字典数据
      nationList: [], // 民族字典数据
      censusRegisterList: [], // 户籍性质字典数据
      householdRegistryClassifyList: [], // 户口分类字典数据
      illnessTypeList: [], // 患病类型字典数据
      ifSeriouslyList: [], // 是否重病字典数据
      disabilityTypeList: [], // 残疾类别字典数据
      disabilityLevelList: [], // 残疾等级字典数据
      specialEducationTypeList: [], // 特教类型字典数据
      adisConditionList: [], // 患艾滋病情况字典数据
      transmissionWayList: [], // 最有可能感染艾滋病途径字典数据
      otherRescueList: [], // 其他救助字典数据

      workStudyList: [], // 工学情况字典数据
      physicalExaminationDayList: [], // 接收后多久体检字典数据
      rearingTypeList: [], // 养育类型字典数据
      principalList: [], // 委托方字典数据
      ifIsolatedCareList: [], // 体检前是否隔离照料字典数据

      selectValue: 0, // 选择的数据
      type: '', // 区分患病类型（illnessTypeList）、残疾类别（disabilityType）和特教类型（specialEducationTypeList）的标识符
      disabilityTypeValues: [], // 残疾类别选择的数据

      resobj: {}, // 身份证号后台验重后返回的数据
      isNotSubmit: false, // 是否是暂存或提交的操作

      delVisible: false, // 文件上传的删除按钮显示
      adoption: { // 头像上传的参数
        busiType: '50', // 头像
        functionalType: '2'
      },
      headImgId: '', // 上传的头像id
      fileList: [], // 文件列表
      labelwidth: {
        label: 7,
        wrapper: 17
      },
      // sameaddresslist: [{ label: '', value: '1' }],
      // sameAddress: [],
      isvalidator: false,
      errMsg: null // 身份证号错误信息
    }
  },
  activated () {
    this.isIdcard = false
    this.birthday = ''
    this.tag = 0
    this.tag1 = 0
    this.disabilityTypeValues = []
  },
  updated () {
    this.setLabelAndWrapperWidth('7.3%', '92.7%', 'alonerow') // 单独一行字段宽度控制
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    preview (file) { this.downloadFile(file) },
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('YESNO', 'ifIsolatedCareList') // 获取体检前是否隔离照料字典数据
      this.getMenu('PRINCIPAL', 'principalList') // 获取委托方字典数据
      this.getMenu('WORKSTUDY', 'workStudyList') // 获取工学情况字典数据
      this.getMenu('REARINGTYPE', 'rearingTypeList') // 获取养育类型情况字典数据
      this.getMenu('PHYSICALEXAMINATIONDAY', 'physicalExaminationDayList') // 接收后多久体检字典数据
      this.getMenu('CHILDSITUATION', 'childSituationList') // 获取儿童情况字典数据
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('CENSUSREGISTER', 'censusRegisterList') // 获取户籍性质字典数据
      this.getMenu('HOUSEHOLDREGISTRYCLASSIFY', 'householdRegistryClassifyList') // 获取户口分类字典数据
      this.getMenu('ILLNESSTYPE', 'illnessTypeList') // 获取患病类型字典数据
      this.getMenu('YESNO', 'ifSeriouslyList') // 获取是否重病字典数据
      this.getMenu('DISABILITYTYPE', 'disabilityTypeList') // 获取残疾类别字典数据
      this.getMenu('DISABILITYLEVEL', 'disabilityLevelList') // 获取残疾等级字典数据
      this.getMenu('SPECIALEDUCATIONTYPE', 'specialEducationTypeList') // 获取特教类型字典数据
      this.getMenu('OTHERRESCUE', 'otherRescueList') // 获取其他救助字典数据
      this.getMenu('ADISCONDITION', 'adisConditionList') // 获取患艾滋病情况字典数据
      this.getMenu('TRANSMISSIONWAYOTHER', 'transmissionWayList') // 获取最有可能感染艾滋病途径字典数据
      this.getMenu('HEALTHONE', 'healthList') // 获取健康状况字典数据
    },
    // 健康状况的change事件
    onChange (e) {
      this.healthval = e.target.value
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })

          const { codeList } = res.data || []
          // 户口分类去掉无户口
          if (name == 'householdRegistryClassifyList') {
            let index
            for (let i = 0; i < codeList.length; i++) {
              if (codeList[i].value == _self.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
                index = i
              }
            }
            if (index || index == 0) {
              codeList.splice(index, 1)
            }
            _self[name] = codeList
          } else {
            _self[name] = codeList
          }
        }
      })
    },
    // 患病类型、特教类型、其他救助
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
    // 抽屉多选框的取消
    handleCancel () {
      this.choseshow = false
    },
    // 抽屉多选框的确认
    handleOk () {
      const obj = {
        filed: this.filed,
        val: this.selection,
        othername: this.othername,
        otherval: this.otherval,
        labelval: this.labelval
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
    // 地址的change事件
    radiochange1 (val) {
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
      if (state == 'look') {
        this.radiovalue = e ? e.adisCondition : ''
        this.radiovalues = e ? e.transmissionWay : ''
        this.selectValue = e ? e.otherRescue : ''
      } else {
        this.radiovalue = ''
        this.radiovalues = ''
        this.selectValue = ''
      }
    },
    // 出生日期（登记日期）不能大于当前日期
    disabledDate1 (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 地址数据回调
    setaddress () {
      this.$emit('setaddress')
    },
    setaddress1 () {
      this.$emit('setaddress1')
    },
    // 上传的change
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
    // 上传前的校验
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
      }).then((response) => {
        _self.$message.success('头像删除成功!')

        _self.headImgId = ''
      }).catch(() => {
        _self.$message.error('头像删除失败!')
      })

      _self.imageUrl = 'static/img/defalimg.png'
      _self.delVisible = false
    },
    // 户口分类选择的数据
    getRegistered (e) {
      this.tag = 1 // 开始控制户籍性质及户籍所在地的只读
      // 有户口时，身份证必填，户籍性质及户籍所在地设为非只读
      if (e != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.idCardRequire = { message: '请选择身份证号!' }
        this.localDisabled = false
        this.censusRegisterRequire = true
      }
      // 无户口时，身份证不必填，户籍性质及户籍所在地设为只读
      if (e == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.idCardRequire = false
        this.localDisabled = true
        this.censusRegisterRequire = false
        this.$emit('clearDatas')
      }
    },
    // 身份证号校验
    async idCardValid (rule, value, callback) {
      const _self = this
      if (!_self.isvalidator) {
        // _self.errMsg ? callback(_self.errMsg[0]) : callback()
        callback()
      } else {
        if (!this.id || value != this.oldIdCard) { // 新增或编辑但身份证号改变时，进行验重操作
          const dictValue = this.Enum.CHILDCATEGORYA
          this.thisP.childBaseId = ''
          this.idCardValidate(rule, value, callback, _self, null, 'student')
        } else { // 否则不进行验重
          this.idCardValidate(rule, value, callback, _self, null)
        }
      }
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      this.$emit('setValueByIdCard', val)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth, key, val) {
      if (age < 18) {
        // 设置错误提示信息
        this.$emit('setIdCardErr')
      } else {
        this.birthday = birth
        this.isIdcard = true
        this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
      }
    },
    setAgeByBirth (e) {
      this.birthday = moment(e).format('YYYY-MM-DD')
      this.$emit('setAgeByBirth', moment(e).format('YYYY-MM-DD'))
    },
    // 确认感染时间不能大于当前日期
    disabledDate (current) {
      console.log(this.birthday, 444)
      // 不能选择今天以后的日期
      if (this.birthday) {
        return current < moment(this.birthday) || current > moment().endOf('day')
      } else {
        return current > moment().endOf('day')
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
  height: 225px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 85%;
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
  margin-top: 10%;
}
.grant-checkbox {
  width: 100%;
}
</style>
