<template>
  <div class="conts tadrawer aaa"
       @click='allvalidator'>
    <ta-modal title="选择信息采集方式"
              :width="590"
              @cancel="handleCancel"
              @ok="handleOk()"
              :visible="addOrImportVisible">
      <ta-form :autoFormCreate="(form)=>{this.addOrImportform = form}"
               layout="horizontal">
        <ta-form-item label=""
                      :initValue="'2'"
                      fieldDecoratorId="addOrImport">
          <ta-select class="selectwid"
                     :disabled="true">
            <ta-select-option v-if="orgType !='99'"
                              value="1">新增</ta-select-option>
            <ta-select-option value="2">导入</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-form>
    </ta-modal>

    <ta-modal title="导入孤儿信息"
              :width="'90%'"
              :footer="false"
              @cancel="handleCancelImport"
              :visible="importVisible">
      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(form)=>{this.searchForm=form}">
          <ta-form-item label="儿童姓名"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        class="spilwid"
                        fieldDecoratorId="name">
            <ta-input placeholder="请输入儿童姓名" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        class="spilwid1"
                        fieldDecoratorId="idCard">
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item>
          <ta-form-item>
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="handleSubmit('search')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
      </div>
      <ta-table class="tables table-min-width"
                :columns="tableColumns"
                :showOverflowTooltip="true"
                :dataSource="tableData"
                bordered>
        <span slot="num"
              slot-scope="a,b,c">
          <span>{{size*(page-1)+c+1}}</span>
        </span>
        <div slot="action"
             class="btnlist"
             slot-scope="text,obj">
          <span @click="importData(obj)"
                class='com_audit'>导入</span>
        </div>
      </ta-table>
      <ta-pagination :defaultCurrent="page"
                     style="display: flex !important;  height: 39px; align-items: center; justify-content: flex-end; overflow: visible; line-height: normal; white-space: normal;"
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="tableData"
                     :params="userPageParams"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     :ref="mixPageRef" />
    </ta-modal>
    <div class="contin">
      <ta-spin tip="加载中..."
               :spinning="spinning">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="儿童类别:"
                        class="fromwid"
                        :require="{message:'请选择!'}"
                        :initValue="childType"
                        fieldDecoratorId="childType"
                        style="margin-top: 5px; margin-bottom: 15px;">
            <ta-select class="selectwid"
                       @change="typeChange"
                       :disabled="disabled">
              <ta-select-option v-for="(item,index) in childrenType"
                                :value="item.value"
                                :disabled="item.value == Enum.CHILDCATEGORYA.FLJGGYKJET"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form>
        <ta-tabs :activeKey="nowkey"
                 @change="callback"
                 type="line">
          <ta-tab-pane tab="儿童基本信息"
                       key="1"
                       :forceRender="true">
            <div ref="oneout"
                 class="mars">
              <Title id="anchorpoint_a"
                     class="bassInfor"
                     title="基本信息"
                     :show.sync="showone"></Title>
              <ta-form layout="horizontal"
                       ref="one"
                       :autoFormCreate="(form)=>{this.basicInformationForChildren = form}">
                <BasicInformationForChildren @changehei="changehei"
                                             :thisP="this"
                                             :addressmodel="addressmodel"
                                             :addressmodelNow="addressmodelNow"
                                             @chosedata="chosedata"
                                             @setaddress="setaddress"
                                             @setaddress1="setaddress1"
                                             :disabled="disabled"
                                             :choselist.sync='choselist'
                                             :childType="childType"
                                             @setValueByIdCard="setValueByIdCard"
                                             @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                                             @setAgeByBirth="setAgeByBirth"
                                             @setIdCardErr="setIdCardErr"
                                             @clearDatas="clearDatas"
                                             @clearIfSeriously="clearIfSeriously"
                                             ref="childbase"></BasicInformationForChildren>
              </ta-form>
            </div>
            <div ref="sixout"
                 class="mars">
              <Title id="anchorpoint_b"
                     title="相关证明信息"
                     :show.sync="showsix"></Title>
              <ta-form layout="horizontal"
                       ref="six">
                <ChildBaseFile @uochanhei="uochanhei"
                               :disabled="disabled"
                               ref="childbaseFile"></ChildBaseFile>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="家庭成员及社会关系"
                       key="2"
                       :forceRender="true">
            <div ref="fam_oneout"
                 class="mars">
              <Title id="fam_a"
                     title="基本信息"
                     :show.sync="fam_showone"></Title>
              <ta-form layout="horizontal"
                       ref="fam_one"
                       class="formStyle"
                       :autoFormCreate="(form)=>{this.familyFrom = form}">
                <FamilyBase :disabled="disabled"
                            ref="fambase"></FamilyBase>
              </ta-form>
            </div>

            <div ref="fam_twoout"
                 class="mars">
              <Title id="fam_b"
                     title="家庭成员"
                     :show.sync="fam_showtwo"></Title>
              <div class="familyout">
                <Family ref="fam_two"
                        types="1"
                        :disabled="disabled"
                        @changehei="changeFamHei"
                        @getTableDatas="getTableDatas"></Family>
              </div>

            </div>
            <div ref="fam_threeout"
                 class="mars">
              <Title id="fam_c"
                     title="相关证明信息"
                     :show.sync="fam_showthree"></Title>
              <ta-form layout="horizontal"
                       ref="fam_three"
                       :autoFormCreate="(form)=>{this.fiveRaiseFrom2 = form}">
                <FamilyCertificateInformation @uochanhei="uochanhei"
                                              :disabled="disabled"
                                              ref="famFile"></FamilyCertificateInformation>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="助学情况"
                       key="3"
                       :forceRender="true">
            <div ref="onepointfiveout"
                 class="mars">
              <Title id="anchorpoint_b"
                     title="学籍信息"
                     :show.sync="showonepointfive"></Title>
              <ta-form layout="horizontal"
                       ref="onepointfive"
                       :autoFormCreate="(form)=>{this.studentStatusForm = form}">
                <SchoolRoll :disabled="disabledStu"
                            :childtype="childType"
                            :operateFlag="operateFlag"
                            @setaddress2="setaddress2"
                            :addressmodelPm="addressmodelPm"
                            ref="stubase"></SchoolRoll>
              </ta-form>
            </div>

            <div ref="twoout"
                 class="mars">
              <Title id="anchorpoint_b"
                     title="助学金信息"
                     :show.sync="showtwo"></Title>
              <ta-form layout="horizontal"
                       ref="two"
                       :autoFormCreate="(form)=>{this.studentSubsidiesForm = form}">
                <FinancialAid :disabled="disabledStu"
                              @getPayment="getPayment"
                              :childtype="childType"
                              ref="moneyInfo"></FinancialAid>
              </ta-form>
            </div>
            <div ref="twoout2"
                 v-if="operateFlag2"
                 class="mars">
              <Title id="anchorpoint_b"
                     title="退出信息"
                     :show.sync="showtwo2"></Title>
              <ta-form layout="horizontal"
                       ref="two2"
                       :autoFormCreate="(form)=>{this.outForm = form}">
                <div style="height:150px">
                  <ta-col :span="6">
                    <ta-form-item label="退出日期"
                                  fieldDecoratorId="signOutDate"
                                  :labelCol="{ span: 9 }"
                                  :wrapperCol="{span:15}"
                                  :require="{message:'请选择退出日期'}">
                      <ta-month-picker style="width:100%"
                                       :disabled="true"
                                       :placeholder=" '请选择退出日期'" />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span='24'>
                    <ta-col :span='18'>
                      <ta-form-item label="退出原因"
                                    fieldDecoratorId="signOutReason"
                                    :labelCol="{ span: 3 }"
                                    :wrapperCol="{span:15}"
                                    :fieldDecoratorOptions="this.verificationRules('退出原因', 200,true)">
                        <ta-textarea :placeholder=" '请输入退出原因'"
                                     :disabled="true"
                                     style="height: 80px;"> </ta-textarea>
                      </ta-form-item>
                    </ta-col>
                  </ta-col>
                </div>
              </ta-form>
            </div>

            <div ref="threeout"
                 class="mars">
              <Title id="anchorpoint_c"
                     title="相关证明信息"
                     :show.sync="showthree"></Title>
              <ta-form layout="horizontal"
                       ref="three"
                       :autoFormCreate="(form)=>{this.fiveRaiseFrom = form}">
                <OrphanProjectEvidenceInformation @uochanhei="uochanhei"
                                                  :disabled="disabledStu"
                                                  ref="baseFile"></OrphanProjectEvidenceInformation>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="其他附件材料"
                       key="4"
                       :forceRender="true">
            <div class="mars">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.fiveRaiseFrom3 = form}">
                <MultiMedia @uochanhei="uochanhei"
                            :disabled="disabledStu"
                            ref="mul"></MultiMedia>
              </ta-form>
            </div>
          </ta-tab-pane>
        </ta-tabs>
      </ta-spin>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="btnleft temporarystorage"
                 @click="submit(0)"
                 v-if="(!disabled||!disabledStu)&&this.tabVal =='02'">暂存</ta-button>
      <ta-button type="primary"
                 class="btnleft"
                 @click="submit(1)"
                 v-if="!disabled||!disabledStu">提交</ta-button>
    </div>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import Title from '@component/common/components/Title'
import BasicInformationForChildren from './components/basicInformationForChildren'
import ChildBaseFile from './components/childBaseFile'
import SchoolRoll from './components/schoolRoll'
import FinancialAid from '../components/financialAid'
import OrphanProjectEvidenceInformation from '../components/orphanProjectEvidenceInformation'
import FamilyBase from '../components/familyBase'
import Family from './components/family'
import FamilyCertificateInformation from '../components/familyCertificateInformation'
import MultiMedia from './components/multiMedia'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '10%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '11%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '11%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '11%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '11%'
  // },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    width: '10%'
  },
  {
    title: '登记(增员)日期',
    dataIndex: 'registDate',
    width: '13%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'register',
  components: {
    Title,
    BasicInformationForChildren,
    ChildBaseFile,
    SchoolRoll,
    FinancialAid,
    OrphanProjectEvidenceInformation,
    FamilyBase,
    Family,
    FamilyCertificateInformation,
    MultiMedia
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 5,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childrenInStudentAssistanceProjec/listOrphan' // 数据列表接口，API地址
      },
      childrenType: [], // 儿童类别字典数据
      addOrImportVisible: false, // 新增、导入控制显隐
      orgType: window.parent.indexTool.getUserInfo().orgType, // 当前登录人的区划类型
      importVisible: false, // 导入孤儿信息弹窗控制显隐
      disabled: false, // 控制表单只读（除助学外）
      disabledStu: false, // 助学控制表单只读
      nowkey: '1', // 控制当前tab
      list: [],

      addressmodelNow: [], // 现住址
      addressmodel: [], // 户籍所在地
      addressmodelPm: [], // 录取通知邮寄地址
      choselist: {}, // 抽屉多选框选择的数据
      familyMemberInfoList: [], // 家庭成员数据
      childType: window.parent.indexTool.getUserInfo().orgType == '99' ? this.Enum.CHILDCATEGORYA.FLJGYYGQET : this.Enum.CHILDCATEGORYA.SHSJET, // 儿童类别初始值
      operateFlag: '', // 区分新增（add）、编辑（edit）、查看（look）的标识符
      operateFlag2: false,
      id: '', // 跳转带过来的id
      childBaseId: null, // 儿童基本信息id（身份证号重复后带出来的）
      tabVal: '02', // 列表的tab（暂存02，登记在册4）
      spinning: false, // 加载中

      startWorkflowId: '',
      workflowId: '',
      // 新增还是导入
      dataSources: '1', // 区分新增1、导入2
      isvalidator: false, // 身份证号是否验证
      // 编辑查看时
      childObj: {}, // 儿童基本信息的对象
      famObj: {}, // 家庭基本信息的对象
      stuObj: {}, // 助学工程信息的对象
      fileObj: {}, // 附件的对象
      orphansHandicappedList: {}, // 存放路由跳转儿童基本信息列表数据

      // 样式
      showone: true, // 儿童基本信息-基本信息
      showsix: true, // 儿童基本信息-附件
      showtwo2: true, // 助学情况-助学金信息
      showtwo: true, // 助学情况-助学金信息
      showthree: true, // 助学情况-相关证明信息
      fam_showone: true, // 家庭成员-基本信息
      fam_showtwo: true, // 家庭成员-成员信息
      fam_showthree: true, // 家庭成员-相关证明信息
      showonepointfive: true, // 助学情况-学籍信息,
      isFromSearch: false,
      formDataSearch: {},
      childEnterId: ''
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
    this.isvalidator = false
    this.$refs.childbase.isvalidator = false
  },
  methods: {
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('CHILDCATEGORYA', 'childrenType') // 获取儿童情况字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          const { codeList } = res.data
          codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = codeList
        }
      })
    },
    // 选择新增和导入弹出框-取消
    handleCancel () {
      this.addOrImportVisible = false
      this.backs()
    },
    getPayment () {
      // studentSubsidiesForm
      const studentData = this.studentSubsidiesForm.getFieldsValue()
      this.studentSubsidiesForm.resetFields()
      this.studentSubsidiesForm.setFieldsValue(studentData)
    },
    // 选择新增和导入弹出框-确定
    handleOk (e) {
      let value = {}
      //   // 直接跳新增
      //   value.addOrImport = '1'
      if (e == '2') { // 福利院用户直接跳转
        value.addOrImport = '2'
      } else {
        value = this.addOrImportform.getFieldsValue()
      }
      // 新增1，导入2
      if (value.addOrImport == '1') { // 新增
        this.dataSources = '1'
        this.getChildNum()
        this.disabled = false
        this.disabledStu = false
      } else { // 导入
        this.dataSources = '2'
        this.disabled = true
        this.disabledStu = false
        this.importVisible = true
        this.handleSubmit()
      }
      this.addOrImportVisible = false
    },
    // 初始化数据
    initDatas () {
      this.form.resetFields()
      this.basicInformationForChildren.resetFields()
      this.studentStatusForm.resetFields()
      this.studentSubsidiesForm.resetFields()
      this.spinning = false
      this.disabled = false
      this.disabledStu = false
      this.addOrImportVisible = false
      this.childEnterId = ''
      this.$refs.childbase.id = null
      this.$refs.stubase.startValue = null // 开始日期
      this.$refs.stubase.endValue = null // 结束日期
      this.$refs.stubase.educationalSystem = 0 // 学制
      this.$refs.childbase.resetFileDatas()
      this.$refs.childbaseFile.resetFileDatas()
      this.$refs.famFile.resetFileDatas()
      this.$refs.baseFile.resetFileDatas()
      this.$refs.mul.resetFileDatas()
      this.choselist = {} // 重置多选抽屉的数据（新增时）
      this.childObj = {} // 儿童基本信息的对象
      this.famObj = {} // 家庭基本信息的对象
      this.stuObj = {} // 助学工程信息的对象
      this.fileObj = {} // 附件的对象
      this.isFromSearch = false
      this.formDataSearch = {}
      this.nowkey = '1'
      this.operateFlag = this.$route.query.operateFlag
      this.operateFlag2 = !!this.$route.query.operateFlag2
      this.tabVal = this.$route.query.tabVal || '02'
      // 是否是从查询跳转
      if (this.$route.query.isFromSearch) {
        this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
        this.isFromSearch = this.$route.query.isFromSearch
      }
      this.childType = window.parent.indexTool.getUserInfo().orgType == '99' ? this.Enum.CHILDCATEGORYA.FLJGYYGQET : this.Enum.CHILDCATEGORYA.SHSJET // 儿童类别初始值
      if (this.operateFlag == 'add') { // 新增或导入
        // // 直接跳新增
        // this.handleOk('2')

        if (window.parent.indexTool.getUserInfo().orgType == '99') { // 福利院用户
          this.handleOk('2')
        } else {
          this.addOrImportVisible = true
        }
        // 是否展示儿童基本信息中的条件模块（确认艾滋病感染时间、其他情况、其他途径等）
        this.$refs.childbase.ifDatasProcess(null, 'add')
      } else { // 编辑或查看
        this.id = this.$route.query.id
        this.startWorkflowId = this.$route.query.startWorkflowId
        if (this.$route.query.operateFlag == 'look') {
          this.disabled = true
          this.disabledStu = true
        }
        this.addOrUpdate()
      }
      setTimeout(() => {
        this.uochanhei()
      }, 300)
    },
    // 导入孤儿信息的取消
    handleCancelImport () {
      this.importVisible = false
      this.backs()
    },
    // 获取患病类型、特教类型、其他救助字典数据，并进行赋值（code为字典编码，val为数据值，name为字段名）
    typeDataProcess (code, val, otherval, name, compare = (a, b) => a === b) {
      let list = []
      let attr = []
      let showData = ''
      const _self = this
      _self.choselist[name] = val
      _self.choselist[`${name}Other`] = otherval

      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          list = res.data.codeList
          if (val && val.length > 0) {
            attr = val.split(',')
            attr.forEach((val, index) => {
              list.forEach((item, index) => {
                if (compare(item.value, val)) {
                  showData = showData + item.label + ','
                }
              })
            })
          }
          if (showData != '') {
            showData = showData.substring(0, showData.length - 1)
          }
          if (name == 'illnessType') {
            if (val == _self.Enum.ILLNESSTYPE.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.basicInformationForChildren.setFieldsValue({ illnessType: showData + (otherval != null ? otherval : '') })
            } else {
              _self.basicInformationForChildren.setFieldsValue({ illnessType: showData })
            }
          }
          if (name == 'specialEducationType') {
            if (val == _self.Enum.SPECIALEDUCATIONTYPE.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.basicInformationForChildren.setFieldsValue({ specialEducationType: showData + (otherval != null ? otherval : '') })
            } else {
              _self.basicInformationForChildren.setFieldsValue({ specialEducationType: showData })
            }
          }
          if (name == 'otherRescue') {
            if (val == _self.Enum.OTHERRESCUE.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.basicInformationForChildren.setFieldsValue({ otherRescue: showData + (otherval != null ? otherval : '') })
            } else {
              _self.basicInformationForChildren.setFieldsValue({ otherRescue: showData })
            }
          }
          this.choselist[`${name}Label`] = showData
        }
      })
    },
    // 回显时 时间字段处理
    momentValue (val) {
      return val ? moment(val) : null
    },
    // 儿童类别change事件
    typeChange (e) {
      this.childType = e
    },
    // 设置身份证号错误信息
    setIdCardErr (val) {
      this.basicInformationForChildren.setFields({
        idCard: {
          errors: [{ message: '年龄必须年满18周岁' }]
        }
      })
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      if (val) { // 需要进行回显
        this.childBaseId = val.id
        val.infectionTime = this.momentValue(val.infectionTime)
        val.birthday = this.momentValue(val.birthday)
        val.disabilityType = val.disabilityType ? val.disabilityType.split(',') : []
        // 将其他途径、患艾滋病情况的其他数据传到页面
        this.$refs.childbase.setOtherDatas(val.transmissionWayOther, val.adisConditionOther)
        // 患病类型、特教类型 赋值
        this.typeDataProcess('ILLNESSTYPE', val.illnessType, val.illnessTypeOther, 'illnessType')
        this.typeDataProcess('SPECIALEDUCATIONTYPE', val.specialEducationType, val.specialEducationTypeOther, 'specialEducationType')
        this.$nextTick(() => {
          this.basicInformationForChildren.setFieldsValue(val)
        })

        // 户籍所在地处理
        this.addressmodel = [
          val.censusRegisterPro || '',
          val.censusRegisterCity || '',
          val.censusRegisterCounty || '',
          val.censusRegisterTown || ''

        ]
        // 现住址处理
        this.addressmodelNow = [
          val.currentAddressPro || '',
          val.currentAddressCity || '',
          val.currentAddressCounty || '',
          val.currentAddressTown || ''
        ]
      } else { // 不能进行回显（报错：已暂存。。）则清除身份证号信息
        this.getChildNum()
        this.basicInformationForChildren.setFieldsValue({
          idCard: null
        })
      }
    },
    // 处理回显问题
    async addOrUpdate (e) {
      let childType = ''
      if (e) { // 导入
        this.childObj = e.childBaseInformationVo || {} // 儿童基本信息的对象
        this.famObj = e.familyInfoVo || {} // 家庭基本信息的对象
        this.stuObj = e.childrenInStudentAssistanceProjecVo || {} // 助学信息的对象

        const memberDatas = e.familyMemberInfoList || []
        for (var i = 0; i < memberDatas.length; i++) {
          if (memberDatas[i].disabilityType) {
            memberDatas[i].disabilityType = memberDatas[i].disabilityType.split(',')
          } else {
            memberDatas[i].disabilityType = []
          }
        }
        this.$refs.fam_two.tableDatas = memberDatas // 家庭成员数组
        this.fileObj = e.fileList || {} // 附件的对象
        this.childEnterId = e.childBaseEnterWelfareInstitutionVo.id
        childType = e.childBaseEnterWelfareInstitutionVo ? e.childBaseEnterWelfareInstitutionVo.childType : ''
        this.$refs.childbase.healthval = e.childBaseEnterWelfareInstitutionVo.health ? e.childBaseEnterWelfareInstitutionVo.health : ''
        this.childObj = Object.assign(e.childBaseEnterWelfareInstitutionVo, e.childBaseInformationVo)
        this.childObj.pickingDate = moment(this.childObj.pickingDate, 'YYYY-MM-DD')
        this.childObj.principalDate = moment(this.childObj.principalDate, 'YYYY-MM-DD')
      } else { // 编辑或查看
        const params = {
          businessId: this.id,
          startWorkflowId: this.startWorkflowId
        }
        this.spinning = true
        const res = await this.post('/childrenInStudentAssistanceProjec/queryWorkflow', params)
        if (res.serviceSuccess) {
          this.spinning = false
          this.dataSources = res.data.data.childrenInStudentAssistanceProjecVo.dataSources
          if (this.dataSources == '2' && this.$route.query.operateFlag != 'look') {
            this.disabled = true
            this.disabledStu = false
          }
          this.childEnterId = res.data.data.childrenInStudentAssistanceProjecVo.childEnterId
          this.childObj = res.data.data.childBaseInformationVo || {} // 儿童基本信息的对象
          this.$refs.childbase.id = this.childObj.id
          this.$refs.childbase.healthval = res.data.data.childBaseEnterWelfareInstitutionVo.health ? res.data.data.childBaseEnterWelfareInstitutionVo.health : ''
          this.childObj = Object.assign(res.data.data.childBaseEnterWelfareInstitutionVo, this.childObj)
          this.childObj.pickingDate = moment(this.childObj.pickingDate, 'YYYY-MM-DD')
          this.childObj.principalDate = moment(this.childObj.principalDate, 'YYYY-MM-DD')
          this.famObj = res.data.data.familyInfoVo || {} // 家庭基本信息的对象
          this.stuObj = res.data.data.childrenInStudentAssistanceProjecVo || {} // 助学信息的对象

          if (this.operateFlag2) {
            this.stuObj.signOutDate = this.stuObj.signOutDate ? moment(this.stuObj.signOutDate) : null
            this.$nextTick(() => {
              this.outForm.setFieldsValue(this.stuObj)
            })
          }
          const memberDatas = res.data.data.familyMemberInfoList || []
          for (var i = 0; i < memberDatas.length; i++) {
            if (memberDatas[i].disabilityType) {
              memberDatas[i].disabilityType = memberDatas[i].disabilityType.split(',')
            } else {
              memberDatas[i].disabilityType = []
            }
          }
          this.$refs.fam_two.tableDatas = memberDatas // 家庭成员数组
          this.fileObj = res.data.data.fileList || {} // 附件的对象
          childType = res.data.data.childrenInStudentAssistanceProjecVo ? res.data.data.childrenInStudentAssistanceProjecVo.childType : ''
        }
      }
      console.log(this.childObj, 223344)
      // 儿童类别赋值
      this.form.setFieldsValue({
        childType: childType
      })
      this.childType = childType
      // 1.儿童基本信息赋值
      const { childObj } = this
      childObj.birthday = childObj.birthday ? moment(childObj.birthday) : null
      childObj.infectionTime = childObj.infectionTime ? moment(childObj.infectionTime) : null
      // 户籍所在地
      this.addressmodel = [
        childObj.censusRegisterPro || '',
        childObj.censusRegisterCity || '',
        childObj.censusRegisterCounty || '',
        childObj.censusRegisterTown || ''
      ]
      // 现住址
      this.addressmodelNow = [
        childObj.currentAddressPro || '',
        childObj.currentAddressCity || '',
        childObj.currentAddressCounty || '',
        childObj.currentAddressTown || ''
      ]

      // 残疾类型转为数组
      if (childObj.disabilityType) {
        childObj.disabilityType = childObj.disabilityType.split(',')
      } else {
        childObj.disabilityType = []
      }
      // 如果户口分类为有户口，则身份证号必填
      if (this.childObj.householdRegistryClassify != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) { // 有户口
        this.$refs.childbase.idCardRequire = true
        this.$refs.childbase.localDisabled = false
      } else {
        this.$refs.childbase.idCardRequire = false
        this.$refs.childbase.localDisabled = true
      }
      this.$refs.childbase.ifDatasProcess(this.childObj, 'look')
      // 将其他途径、患艾滋病情况的其他数据传到页面
      this.$refs.childbase.setOtherDatas(this.childObj.transmissionWayOther, this.childObj.adisConditionOther)
      // 患病类型、特教类型 赋值
      this.typeDataProcess('ILLNESSTYPE', this.childObj.illnessType, this.childObj.illnessTypeOther, 'illnessType')
      this.typeDataProcess('SPECIALEDUCATIONTYPE', this.childObj.specialEducationType, this.childObj.specialEducationTypeOther, 'specialEducationType')

      this.$nextTick(() => {
        this.basicInformationForChildren.setFieldsValue(childObj)
      })
      // 2.家庭基本信息赋值
      this.familyFrom.setFieldsValue(this.famObj)

      // 附件处理
      this.fileShow(this.fileObj, this.dataSources)
      // 3.助学信息赋值
      const { stuObj } = this
      if (Object.keys(stuObj).length > 0) {
        stuObj.startDate = stuObj.startDate ? moment(stuObj.startDate) : null
        stuObj.endDate = stuObj.endDate ? moment(stuObj.endDate) : null
        this.$refs.stubase.startValue = stuObj.startDate // 开始日期
        this.$refs.stubase.endValue = stuObj.endDate // 结束日期

        this.$nextTick(() => {
          this.$refs.stubase.educationalSystem = stuObj.educationalSystem // 学制
          this.studentStatusForm.setFieldsValue(stuObj)
          this.studentSubsidiesForm.setFieldsValue(stuObj)
        })

        this.addressmodelPm = [
          stuObj.province || '',
          stuObj.city || '',
          stuObj.county || ''
        ]
        // 开户行、银行账号必填控制
        if (stuObj.payment == this.Enum.PAYMENT.XJLQ) {
          this.$refs.childbase.bankRequire = false
        } else {
          this.$refs.childbase.bankRequire = true
        }
        // 其他救助赋值
        this.typeDataProcess('OTHERRESCUE', this.stuObj.otherRescue, this.stuObj.otherReliefOther, 'otherRescue')
      }
    },
    // 附件回显（编辑或查看时）
    fileShow (fileList, type) { // type包括导入（2）和非导入的（1）
      const _self = this
      if (fileList && fileList.length > 0) {
        fileList.forEach((item, index) => {
          switch (item.busiType) {
            case '50': // 头像
              _self.$refs.childbase.fileList.push(item)
              _self.$refs.childbase.headImgId = item.response.data.data.fileid
              if (_self.operateFlag.indexOf('look') == -1) {
                _self.$refs.childbase.delVisible = true
              }
              _self.$refs.childbase.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + item.response.data.data.fileid
              break
            case '5': // 儿童本人身份证（户口本）
              _self.$refs.childbaseFile.childFileList.push(item)
              break
            case '7': // 续留证明
              _self.$refs.childbaseFile.stayFileList.push(item)
              break
            case '56': // 助学附件
              _self.$refs.baseFile.proveFileList.push(item)
              break
            case '45':
              _self.$refs.famFile.retentionFileList.push(item)
              break
            case '46':
              _self.$refs.famFile.oldPeopleFileList.push(item)
              break
            case '57':
              _self.$refs.mul.imgFileList.push(item)
              break
            case '58':
              _self.$refs.mul.videoFileList.push(item)
              break
            default:
          }
          this.$nextTick(() => {
            setTimeout(() => {
              _self.uochanhei()
            }, 300)
          })
        })
      }
    },
    // 导入
    async importData (e) {
      const res = await this.post('/childrenInStudentAssistanceProjec/queryByChildId', { beHospitalizedId: e.beHospitalizedId })
      this.addOrUpdate(res.data.data || {})
      this.importVisible = false
    },
    // tab的callback事件
    callback (key) {
      this.nowkey = key
      this.uochanhei()
      if (key == '2') {
        // 切换到家庭时，将输入的儿童信息作为家庭成员进行赋值-新增
        this.autoSet()

        this.$nextTick(() => {
          this.setHeight('fam_one', 'fam_oneout', !this.fam_showone)
          this.setHeight('fam_two', 'fam_twoout', !this.fam_showtwo)
        })
      }
    },
    // tab 切换到家庭时，将输入的儿童信息作为家庭成员进行赋值
    autoSet () {
      const famTableDatas = this.$refs.fam_two.tableDatas
      const basicData = this.basicInformationForChildren.getFieldsValue()
      let datas = {}
      const _self = this
      if (famTableDatas instanceof Array && famTableDatas.length > 0) {
        let index1 = 0
        famTableDatas.forEach((item, index) => {
          if (item.relationship == _self.Enum.RELATION.BR) {
            index1 = index
          }
        })
        if (index1) {
          famTableDatas[0] = famTableDatas.splice(index1, 1, famTableDatas[0])[0]
        }
        datas = famTableDatas[0]
        datas.name = basicData.name
        datas.sex = basicData.sex
        datas.idCard = basicData.idCard
        datas.adisCondition = basicData.adisCondition
        datas.disabilityType = basicData.disabilityType || []
        datas.illnessType = this.choselist.illnessType != undefined
          ? this.choselist.illnessType
          : (this.orphansHandicappedList && this.childObj != undefined
            ? this.childObj.illnessType
            : null)
        datas.illnessTypeOther = this.choselist.illnessType != undefined
          ? this.choselist.illnessTypeOther
          : (this.orphansHandicappedList && this.childObj != undefined
            ? this.childObj.illnessTypeOther
            : null)
        datas.remark = basicData.remark
      } else {
        datas = {
          name: basicData.name,
          sex: basicData.sex,
          relationship: this.Enum.RELATION.BR,
          idCard: basicData.idCard,
          adisCondition: basicData.adisCondition,
          ifGuardian: this.Enum.YESNO.FOU,
          currentSituation: this.Enum.CURRENTSITUATION.ZC,
          disabilityType: basicData.disabilityType || [],
          illnessType:
            this.choselist.illnessType != undefined
              ? this.choselist.illnessType
              : (this.orphansHandicappedList && this.childObj != undefined
                ? this.childObj.illnessType
                : null),
          illnessTypeOther:
            this.choselist.illnessType != undefined
              ? this.choselist.illnessTypeOther
              : (this.orphansHandicappedList && this.childObj != undefined
                ? this.childObj.illnessTypeOther
                : null),
          remark: basicData.remark
        }
      }
      // 患艾滋病情况其他
      if (basicData.adisCondition == this.Enum.ADISCONDITION.QT) {
        datas.adisConditionOther = this.$refs.childbase.$refs.adisConditionOther.stateValue
      }
      // 若患艾滋病情况为携带或感染艾滋病时，传入确认艾滋病感染时间、最有可能感染艾滋病途径数据
      if (basicData.adisCondition == this.Enum.ADISCONDITION.XDHGRAZB) {
        datas.infectionTime = basicData.infectionTime ? moment(basicData.infectionTime).format('YYYY-MM-DD') : null
        datas.transmissionWay = basicData.transmissionWay
        // 最有可能感染艾滋病途径数据-其他
        if (basicData.transmissionWay == this.Enum.TRANSMISSIONWAYOTHER.QT) {
          datas.transmissionWayOther = this.$refs.childbase.$refs.transmissionWayOther.stateValue
        }
      }
      if (basicData.birthday != undefined) {
        const birthday = basicData.birthday ? moment(basicData.birthday).format('YYYY-MM-DD') : null
        datas.birthday = birthday
      }
      if (famTableDatas.length == 0) {
        famTableDatas.push(datas)
      } else {
        famTableDatas.splice(0, 1, datas)
      }
      this.getTableDatas(famTableDatas)
    },
    // 分页change事件
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 患病类型为无疾病时，清空是否重病数据
    clearIfSeriously () {
      this.childbase.setFieldsValue({
        ifSeriously: null
      })
    },
    // 抽屉多选框的数据处理
    chosedata (val) {
      this[`${val.filed}Data`] = val.val
      let str = ''
      // 判斷是不是其他
      if (val.otherval == '') {
        str = val.labelval
        this.choselist[`${val.filed}Other`] = ''
      } else {
        str = val.labelval + val.otherval
        this.choselist[`${val.filed}Other`] = val.otherval
      }
      this.basicInformationForChildren.setFieldsValue({
        [val.filed]: str
      })
      this.choselist[`${val.filed}Label`] = str
      this.choselist[val.filed] = val.val
      if (val.filed == 'illnessType') {
        this.choselistillnessType = val.val
        if (val.otherval) {
          this.choselistillnessTypeother = val.otherval
        } else {
          this.choselistillnessTypeother = ''
        }
      }
      if (val.filed == 'specialEducationType') {
        this.choselistspecialEducationType = val.val
        if (val.otherval) {
          this.choselistspecialEducationTypeother = val.otherval
        } else {
          this.choselistspecialEducationTypeother = ''
        }
      }
      if (val.filed == 'otherRescue') {
        this.choselistotherRescue = val.val
        if (val.otherval) {
          this.choselistotherRescueother = val.otherval
        } else {
          this.choselistotherRescueother = ''
        }
      }
      if (val.filed == 'childSituation') {
        this.childSituation = val.val
      }
    },
    // 户籍所在地地址传值
    setaddress () {
      this.basicInformationForChildren.setFieldsValue({
        censusRegisterDatas: this.addressmodel
      })
    },
    // 现住址地址传值
    setaddress1 (val) {
      this.basicInformationForChildren.setFieldsValue({
        currentAddressDatas: this.addressmodelNow
      })
    },
    // 邮寄地址
    setaddress2 () {
      this.studentStatusForm.setFieldsValue({
        addressDatas2: this.addressmodelPm
      })
    },
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }

      this.basicInformationForChildren.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      this.setAgeByBirth(birth)
    },
    // 无户口时，清空户籍性质及户籍所在地数据
    clearDatas () {
      this.basicInformationForChildren.setFieldsValue({
        censusRegister: null,
        censusRegisterDatas: [],
        censusRegisterDetail: null
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      if (node) {
        this.$nextTick(() => {
          if (!istrue) {
            if (ref == 'fam_two') {
              node.style.height =
                this.$refs[ref].$el.offsetHeight + 140 + 'px'
            } else if (ref == 'fam_three') {
              node.style.height =
                this.$refs[ref].$el.offsetHeight + 180 + 'px'
            } else {
              if (this.$refs[ref] && this.$refs[ref] != undefined) {
                node.style.height =
                  this.$refs[ref].$el.offsetHeight + 90 + 'px'
              }
            }
          } else {
            node.style.height = '50px'
          }
          if (node && node != undefined) {
            node.style.transition = 'all 1s'
          }
        })
      }
    },
    // 子组件改变高度
    changehei () {
      this.setHeight('one', 'oneout')
      this.setHeight('six', 'sixout')
      this.$nextTick(() => {
        const data = this.basicInformationForChildren.getFieldsValue()
        if (data.sameAddress && data.sameAddress.length > 0) {
          const ads = data.censusRegisterDatas
          const deads = data.censusRegisterDetail
          this.basicInformationForChildren.setFieldsValue({
            currentAddressDetail: deads
          })
          this.$nextTick(() => {
            this.addressmodelNow = ads || []
            if (ads && ads.length == 0) {
              this.basicInformationForChildren.setFieldsValue({
                censusRegisterDatas: []
              })
            }
          })
        }
      })
    },
    // 子组件改变高度-家庭成员
    changeFamHei () {
      this.setHeight('fam_two', 'fam_twoout')
    },
    // 家庭成员数据获取
    getTableDatas (val) {
      this.familyMemberInfoList = val
    },
    // 附件的样式处理
    uochanhei () {
      this.setHeight('six', 'sixout')
      this.setHeight('three', 'threeout')
      this.setHeight('fam_three', 'fam_threeout')
      this.setHeight('three', 'threeout')
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
      this.$refs.childbase.isvalidator = true
    },
    // 根据出生日期设置年龄
    setAgeByBirth (e) {
      this.post('/orphansDisabledChildrenApi/getAgeByBirthday', { birthday: e }).then((res) => {
        if (res.serviceSuccess) {
          this.basicInformationForChildren.setFieldsValue({
            age: res.data.data
          })
        }
      })
    },
    backs () {
      this.$refs.baseFile.resetFileDatas()
      this.$refs.famFile.resetFileDatas()
      this.$router.go(-1)
    },
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
    },
    // 儿童编号接口获取数据
    getChildNum () {
      this.post('/serialApi/getChildNumber', {}).then((res) => {
        if (res.serviceSuccess) {
          this.basicInformationForChildren.setFieldsValue({ childNumber: res.data.code }) // 儿童编号
        }
      })
    },
    // 暂存（0）和提交（1）
    submit (val) {
      let isok = true
      let nowkey = '1'
      const _self = this
      _self.isvalidator = false
      _self.$refs.childbase.errMsg = _self.basicInformationForChildren.getFieldError('idCard')

      _self.$refs.childbase.isNotSubmit = true // 暂存时不走身份证号重复验证
      _self.$nextTick(async () => {
        _self.isvalidator = false
        _self.$refs.childbase.isvalidator = false

        // 儿童基本信息
        if (_self.dataSources != '2') { // 导入时不走验证
          await _self.basicInformationForChildren.validateFields((err, values) => {
            if (err) {
              if (val == 0) {
                for (const k in err) {
                  if (k != 'name' && k != 'idCard' && (!this.basicInformationForChildren.getFieldsValue()[k] || this.basicInformationForChildren.getFieldsValue()[k].length == 0)) {
                    this.basicInformationForChildren.resetFields(k)
                  } else {
                    isok = false
                    nowkey = '1'
                  }
                }
              } else {
                isok = false
                nowkey = '1'
              }
            }
          })
        }
        // 助学情况-学籍信息
        await _self.studentStatusForm.validateFields((err, values) => {
          if (err) {
            if (val == 0) {
              for (const k in err) {
                if (!this.studentStatusForm.getFieldsValue()[k] || this.studentStatusForm.getFieldsValue()[k].length == 0) {
                  this.studentStatusForm.resetFields(k)
                } else {
                  isok = false
                  nowkey = '3'
                }
              }
            } else {
              isok = false
              nowkey = '3'
            }
          }
        })
        // 助学情况-助学金信息
        await _self.studentSubsidiesForm.validateFields((err, values) => {
          if (err) {
            if (val == 0) {
              for (const k in err) {
                if (!this.studentSubsidiesForm.getFieldsValue()[k] || this.studentSubsidiesForm.getFieldsValue()[k].length == 0) {
                  this.studentSubsidiesForm.resetFields(k)
                } else {
                  isok = false
                  nowkey = '3'
                }
              }
            } else {
              isok = false
              nowkey = '3'
            }
          }
        })

        _self.$refs.childbase.isNotSubmit = true
        if (isok) {
          // 1.儿童基本信息数据处理
          const childBaseInformationVo = _self.basicInformationForChildren.getFieldsValue()
          childBaseInformationVo.birthday = childBaseInformationVo.birthday ? moment(childBaseInformationVo.birthday).format('YYYY-MM-DD') : null
          childBaseInformationVo.infectionTime = childBaseInformationVo.infectionTime ? moment(childBaseInformationVo.infectionTime).format('YYYY-MM-DD') : null
          // 户籍所在地
          childBaseInformationVo.censusRegisterPro = childBaseInformationVo.censusRegisterDatas instanceof Array ? childBaseInformationVo.censusRegisterDatas[0] : ''
          childBaseInformationVo.censusRegisterCity = childBaseInformationVo.censusRegisterDatas instanceof Array ? childBaseInformationVo.censusRegisterDatas[1] : ''
          childBaseInformationVo.censusRegisterCounty = childBaseInformationVo.censusRegisterDatas instanceof Array ? childBaseInformationVo.censusRegisterDatas[2] : ''
          delete childBaseInformationVo.censusRegisterDatas
          // 现住址
          childBaseInformationVo.currentAddressPro = childBaseInformationVo.currentAddressDatas instanceof Array ? childBaseInformationVo.currentAddressDatas[0] : ''
          childBaseInformationVo.currentAddressCity = childBaseInformationVo.currentAddressDatas instanceof Array ? childBaseInformationVo.currentAddressDatas[1] : ''
          childBaseInformationVo.currentAddressCounty = childBaseInformationVo.currentAddressDatas instanceof Array ? childBaseInformationVo.currentAddressDatas[2] : ''
          delete childBaseInformationVo.currentAddressDatas

          // 患艾滋病情况其他
          if (childBaseInformationVo.adisCondition == this.Enum.ADISCONDITION.QT) {
            childBaseInformationVo.adisConditionOther = this.$refs.childbase.$refs.adisConditionOther.stateValue
          }
          // 处理儿童基本信息的其他字段（患病类型、特教类型、其他救助）
          // 患病类型
          if (_self.choselist.illnessType == _self.Enum.ILLNESSTYPE.QT) {
            childBaseInformationVo.illnessTypeOther = _self.choselist.illnessTypeOther
          }
          childBaseInformationVo.illnessType = _self.choselist.illnessType
          // 特教类型
          if (_self.choselist.specialEducationType == _self.Enum.SPECIALEDUCATIONTYPE.QT) {
            childBaseInformationVo.specialEducationTypeOther = _self.choselist.specialEducationTypeOther
          }
          childBaseInformationVo.specialEducationType = _self.choselist.specialEducationType
          // 其他救助
          if (_self.choselist.otherRescue == _self.Enum.OTHERRESCUE.QT) {
            childBaseInformationVo.otherRescueOther = _self.choselist.otherRescueOther
          }
          childBaseInformationVo.otherRescue = _self.choselist.otherRescue
          // 残疾类别处理
          if (childBaseInformationVo.disabilityType && childBaseInformationVo.disabilityType.length > 0) {
            childBaseInformationVo.disabilityType = childBaseInformationVo.disabilityType.join(',')
          } else {
            childBaseInformationVo.disabilityType = ''
          }
          // 填写完儿童基本信息tab页直接点击提交时将儿童信息存入家庭成员
          _self.autoSet()
          // 2.家庭数据处理
          const familyInfoVo = _self.familyFrom.getFieldsValue()
          const { familyMemberInfoList } = _self
          for (var i = 0; i < familyMemberInfoList.length; i++) {
            familyMemberInfoList[i].familyId = _self.famObj.id
            familyMemberInfoList[i].memberIdType = '01'
            if (familyMemberInfoList[i].disabilityType instanceof Array && familyMemberInfoList[i].disabilityType.length > 0) {
              familyMemberInfoList[i].disabilityType = familyMemberInfoList[i].disabilityType.join(',')
            } else if (typeof familyMemberInfoList[i].disabilityType != 'string') {
              familyMemberInfoList[i].disabilityType = ''
            }
          }
          // 其他途径
          if (childBaseInformationVo.transmissionWay == _self.Enum.TRANSMISSIONWAYOTHER.QT) {
            childBaseInformationVo.transmissionWayOther = _self.$refs.childbase.$refs.transmissionWayOther.stateValue // 添加其他途径
          }
          // 3.助学数据处理
          let childrenInStudentAssistanceProjecVo = _self.studentStatusForm.getFieldsValue()
          childrenInStudentAssistanceProjecVo.educationalSystem = _self.$refs.stubase.educationalSystem // 学制
          childrenInStudentAssistanceProjecVo.childEnterId = this.childEnterId
          childrenInStudentAssistanceProjecVo.startDate = childrenInStudentAssistanceProjecVo.startDate ? moment(childrenInStudentAssistanceProjecVo.startDate).format('YYYY-MM') : null
          childrenInStudentAssistanceProjecVo.endDate = childrenInStudentAssistanceProjecVo.endDate ? moment(childrenInStudentAssistanceProjecVo.endDate).format('YYYY-MM') : null
          // 其他救助
          childrenInStudentAssistanceProjecVo.otherRescue = childBaseInformationVo.otherRescue
          childrenInStudentAssistanceProjecVo.otherReliefOther = childBaseInformationVo.otherRescueOther
          // 儿童类别
          childrenInStudentAssistanceProjecVo.childType = _self.form.getFieldsValue().childType
          // 邮寄地址
          childrenInStudentAssistanceProjecVo.province = childrenInStudentAssistanceProjecVo.addressDatas2 instanceof Array ? childrenInStudentAssistanceProjecVo.addressDatas2[0] : ''
          childrenInStudentAssistanceProjecVo.city = childrenInStudentAssistanceProjecVo.addressDatas2 instanceof Array ? childrenInStudentAssistanceProjecVo.addressDatas2[1] : ''
          childrenInStudentAssistanceProjecVo.county = childrenInStudentAssistanceProjecVo.addressDatas2 instanceof Array ? childrenInStudentAssistanceProjecVo.addressDatas2[2] : ''
          delete childrenInStudentAssistanceProjecVo.addressDatas2
          childrenInStudentAssistanceProjecVo.dataSources = _self.dataSources // 区分新增1，导入2
          childrenInStudentAssistanceProjecVo = Object.assign({}, childrenInStudentAssistanceProjecVo, _self.studentSubsidiesForm.getFieldsValue())
          const submitObj = {} // 提交的数据对象
          let url = '/childrenInStudentAssistanceProjec/informationCollection'
          childrenInStudentAssistanceProjecVo.buttonType = val == 1 ? '2' : '1'
          // 身份证号已存在，带出的儿童基本信息id
          if (this.childBaseId) {
            childBaseInformationVo.id = this.childBaseId
          }
          if (_self.operateFlag == 'edit') { // 编辑
            url = _self.tabVal == '02' ? '/childrenInStudentAssistanceProjec/informationCollectionUpdate' : '/childrenInStudentAssistanceProjec/informationCollectionUpdateForRegistered'
            childBaseInformationVo.id = _self.childObj.id
            familyInfoVo.id = _self.famObj.id
            childrenInStudentAssistanceProjecVo.id = _self.stuObj.id
          } else if (_self.dataSources == '2') {
            childBaseInformationVo.id = _self.childObj.id
            familyInfoVo.id = _self.famObj.id
            childrenInStudentAssistanceProjecVo.id = _self.stuObj.id
          }
          // 附件处理
          const fileList = [
            ...this.$refs.childbase.fileList,
            ...this.$refs.baseFile.proveFileList,
            ...this.$refs.mul.imgFileList,
            ...this.$refs.mul.videoFileList
          ]
          const upLoadPathIds = []
          for (let i = 0; i < fileList.length; i++) {
            upLoadPathIds.push(fileList[i].response.data.data.fileid)
          }
          submitObj.upLoadPathIds = upLoadPathIds // 附件
          submitObj.childBaseInformationVo = childBaseInformationVo // 儿童基本信息
          submitObj.familyInfoVo = familyInfoVo // 家庭基本信息
          submitObj.familyMemberInfoList = familyMemberInfoList // 家庭成员信息
          submitObj.childrenInStudentAssistanceProjecVo = childrenInStudentAssistanceProjecVo // 助学工程信息
          submitObj.childBaseInformationVo = childBaseInformationVo
          submitObj.childBaseInformationVo = childBaseInformationVo
          _self.post(url, submitObj, true).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息提交成功!')
              _self.backs()
            }
          })
        } else {
          _self.nowkey = nowkey
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    }
  },

  watch: {
    // 儿童基本信息-基本信息
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    // 儿童基本信息-附件
    showsix (val) {
      this.setHeight('six', 'sixout', !val)
    },
    // 助学情况-助学金信息
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }, // 助学情况-助学金信息
    showtwo2 (val) {
      this.setHeight('two2', 'twoout2', !val)
    },
    // 家庭成员-基本信息
    fam_showone (val) {
      this.setHeight('fam_one', 'fam_oneout', !val)
    },
    // 家庭成员-成员信息
    fam_showtwo (val) {
      this.setHeight('fam_two', 'fam_twoout', !val)
    },
    // 家庭成员-相关证明信息
    fam_showthree (val) {
      this.setHeight('fam_three', 'fam_threeout', !val)
    },
    // 助学情况-学籍信息
    showonepointfive (val) {
      this.setHeight('onepointfive', 'onepointfiveout', !val)
    },
    // 助学情况-相关证明信息
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    },
    // 处理家庭成员disabled
    disabled (val) {
      this.$refs.fam_two.operateVisible = !val
    }
  }
}
</script>

<style scoped type="text/less">
.fromwid {
  width: 400px;
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
.familyout {
  width: calc(100% - 28px);
}
.bom1 {
  width: calc(100% - 28px);
  height: 50px;
  background: white;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
  z-index: 999;
}
.aaa /deep/ .ant-modal-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  padding-bottom: 44px;
}
</style>
