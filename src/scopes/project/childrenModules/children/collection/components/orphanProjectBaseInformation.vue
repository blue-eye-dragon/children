<template>
  <ta-row class="fromcom tadrawer">
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber">
          <ta-input placeholder="请输入儿童编号"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :require="submitNotSave?{message:'请选择性别'}:false">
          <ta-select allowClear
                     :placeholder="!changedisabled?'请选择性别':''"
                     :disabled="changedisabled">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :initValue="Enum.NATION.HZ"
                      :require="submitNotSave?{message:'请选择民族'}:false">
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
                          :isRequire="submitNotSave?censusRegisterRequire:false"
                          :disabled="tag==1?localDisabled:changedisabled"
                          fileldName='censusRegisterDatas'
                          @setaddress="setaddress"></AddressComponent>
      </ta-col>

      <ta-col :span="6">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="verificationRules('儿童姓名',72)">
          <ta-input placeholder="请输入儿童姓名"
                    :disabled="disabled" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :require="submitNotSave?{message:'请选择出生日期'}:false">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled?'请选择出生日期':''"
                          :disabled="disabled"
                          @change="setAgeByBirth"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="户籍性质"
                      fieldDecoratorId="censusRegister"
                      :require="submitNotSave?(censusRegisterRequire?{message:'请选择户籍性质'}:false):false">
          <ta-select allowClear
                     :placeholder="!(tag==1?localDisabled:changedisabled)?'请选择户籍性质':''"
                     :disabled="tag==1?localDisabled:changedisabled">
            <ta-select-option v-for="item in censusRegisterList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="submitNotSave?(censusRegisterRequire?verificationRules('详细地址',100):verificationRulesNotMustFill('详细地址',100)):verificationRulesNotMustFill('详细地址',100)">
          <ta-input :placeholder="!(tag==1?localDisabled:changedisabled)?'请输入详细地址':''"
                    :disabled="tag==1?localDisabled:changedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="submitNotSave
                    ?({validateTrigger: 'blur',rules: [{ required: idCardRequire, message: '请输入身份证号' },{validator:idCardValid}]})
                    :({validateTrigger: 'blur',rules: [{ required: false, message: '请输入身份证号' },{validator:idCardValid}]})">
          <ta-input :placeholder="!idCardDisabled?'请输入身份证号':''"
                    :disabled="idCardDisabled" />
        </ta-form-item>
        <ta-form-item label="年龄"
                      fieldDecoratorId="age">
          <ta-input placeholder="请输入儿童年龄"
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="户口分类"
                      fieldDecoratorId="householdRegistryClassify"
                      :require="submitNotSave?{message:'请选择户口分类'}:false">
          <ta-select allowClear
                     :placeholder="!changedisabled?'请选择户口分类':''"
                     :disabled="changedisabled"
                     @change="getRegistered">
            <ta-select-option v-for="item in householdRegistryClassifyList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="是否重病"
                      fieldDecoratorId="ifSeriously">
          <ta-select allowClear
                     placeholder="请选择是否重病"
                     :disabled="tag1==1?localIfSeriously:disabled">
            <ta-select-option v-for="item in ifSeriouslyList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
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
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <AddressComponent :addressmodel="addressmodelNow"
                          :msg="'现住址'"
                          :isRequire="submitNotSave?true:false"
                          fileldName='currentAddressDatas'
                          @setaddress="setaddress"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label
                      fieldDecoratorId="currentAddressDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }"
                      :fieldDecoratorOptions="submitNotSave?verificationRules('详细地址',100):verificationRulesNotMustFill('详细地址',100)">
          <ta-input :placeholder="!disabled?'请输入详细地址':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="残疾证号"
                      fieldDecoratorId="physicalDisabilityNo"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('残疾证号',100)">
          <ta-input :placeholder="!disabled?'请输入残疾证号':''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">

      <ta-col :span="6">
        <ta-form-item label="患病类型"
                      fieldDecoratorId="illnessType"
                      :require="submitNotSave?{message:'请选择患病类型'}:false">
          <ta-input :placeholder="!disabled?'请选择患病类型':''"
                    @click="chose('illnessType','illnessTypeList','患病类型')"
                    :disabled="disabled"
                    :readOnly="true" />
        </ta-form-item>

      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="特教类型"
                      fieldDecoratorId="specialEducationType"
                      :require="submitNotSave?{message:'请选择特教类型'}:false">
          <ta-input :placeholder="!disabled?'请选择特教类型':''"
                    @click="chose('specialEducationType','specialEducationTypeList','特教类型')"
                    :disabled="disabled"
                    :readOnly="true" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="残疾等级"
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
      <ta-col :span="6">
        <ta-form-item label="其他救助"
                      fieldDecoratorId="otherRescue">
          <ta-input :placeholder="!disabled?'请选择其他救助':''"
                    @click="chose('otherRescue','otherRescueList','其他救助')"
                    :disabled="disabled"
                    :readOnly="true" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="残疾类别"
                    class='alonerow'
                    fieldDecoratorId="disabilityType"
                    :initValue="[]">
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
  props: ['disabled', 'idCardDisabled', 'changedisabled', 'addressmodel', 'addressmodelNow', 'choselist', 'childType'],
  data () {
    return {
      imageUrl: 'static/img/defalimg.png',
      loading: false,
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
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
      idCardRequire: false, // 身份证号的必填
      principalRequire: false, // 委托方及委托日期的必填
      pickingRequire: false, // 捡拾地、捡拾日期的必填
      censusRegisterRequire: true, // 户籍所在地的必填
      tag: 0, // 户籍性质与户籍所在地的只读控制开关，0不控制，1控制
      localDisabled: false, // 户籍性质与户籍所在地的只读
      tag1: 0, // 是否重病的只读控制开关，0不控制，1控制
      localIfSeriously: false, // 是否重病的只读控制
      submitNotSave: false, // 点击提交按钮true，点击暂存按钮false
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
      registerDateValue: moment().locale('zh-cn') // 登记类型默认显示当前日期
    }
  },
  activated () {
    this.tag = 0
    this.tag1 = 0
    this.disabilityTypeValues = []
    this.submitNotSave = true
  },
  updated () {
    this.setLabelAndWrapperWidth('6.3%', '93.7%', 'alonerow') // 单独一行字段宽度控制
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
      this.getMenu('CHILDSITUATION', 'childSituationList') // 获取儿童情况字典数据
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('CENSUSREGISTER', 'censusRegisterList') // 获取户籍性质字典数据
      this.getMenu('HOUSEHOLDREGISTRYCLASSIFY', 'householdRegistryClassifyList') // 获取户口分类字典数据
      this.getMenu('PRINCIPAL', 'principalList') // 获取委托方字典数据
      this.getMenu('PHYSICALEXAMINATIONDAY', 'physicalExaminationDayList') // 获取接收后多久体检字典数据
      this.getMenu('YESNO', 'ifIsolatedCareList') // 获取体检前是否隔离照料字典数据
      //   this.getMenu('REARINGTYPE', 'rearingTypeList') // 获取养育类型字典数据
      this.getMenu('WORKSTUDY', 'workStudyList') // 获取工学情况字典数据
      this.getMenu('ILLNESSTYPE', 'illnessTypeList') // 获取患病类型字典数据
      this.getMenu('YESNO', 'ifSeriouslyList') // 获取是否重病字典数据
      this.getMenu('DISABILITYTYPE', 'disabilityTypeList') // 获取残疾类别字典数据
      this.getMenu('DISABILITYLEVEL', 'disabilityLevelList') // 获取残疾等级字典数据
      this.getMenu('SPECIALEDUCATIONTYPE', 'specialEducationTypeList') // 获取特教类型字典数据
      this.getMenu('ADISCONDITION', 'adisConditionList') // 获取患艾滋病情况字典数据
      this.getMenu('TRANSMISSIONWAYOTHER', 'transmissionWayList') // 获取最有可能感染艾滋病途径字典数据
      this.getMenu('OTHERRESCUE', 'otherRescueList') // 获取其他救助字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
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
    // 出生日期（登记日期）不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 地址数据回调
    setaddress () {
      this.$emit('setaddress')
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
    idCardValid (rule, value, callback) {
      const _self = this
      this.idCardValidate(rule, value, callback, _self)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
    },
    async validateIdCard (e) {
      await this.post('/orphansDisabledChildrenApi/getChildByNameAndType', { idCard: e, childType: this.childType }).then((res) => {
        this.resobj = res
      })
      return this.resobj
    },
    otherOperation (e, res) {
      let flag = true
      // 只有非暂存（提交）时才会校验重复性
      if (!this.isNotSubmit) {
        // 编辑时身份证号与进来时相同则不验证重复性
        if (this.operateFlag == 'add' || e != this.oldIdCard) {
          if (res.data && res.data.data.length > 0) {
            this.$confirm({
              title: '儿童档案重复',
              content: '系统档案中已存在该儿童信息，是否前往查看',
              onOk: () => {
                this.$router.push({
                  name: 'judgeRepetition',
                  query: {
                    repetitionList: JSON.stringify(this.resobj.data.data)
                  }
                })
                flag = false
              },
              onCancel: () => {
              }
            })
          }
        }
      }

      return flag
    },
    setAgeByBirth (e) {
      this.$emit('setAgeByBirth', moment(e).format('YYYY-MM-DD'))
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
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}
.radios /deep/ .ant-radio-wrapper {
  margin-right: 9%;
}
.radios /deep/ .ant-radio-wrapper:nth-child(4) {
  margin-right: 0;
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
