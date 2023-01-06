<template>
  <!-- 留守儿童综合查询之详情查询 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contin"
           style="padding-top:15px">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form layout="inline"
                     ref="one"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <ta-col>
                <AreaQuery msg="区域"
                           class="spilwid"
                           :ishide="true"
                           :addressmodel='addressmodel'
                           @setaddress='setaddr'
                           @adsvalchange='adsvalchange'
                           :allowClear="false"
                           :labelCol="{span:7}"
                           :wrapperCol="{span:17}"
                           ref="areaselect"
                           types="2"></AreaQuery>
                <ta-form-item label="姓名"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              class="spilwid"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入姓名"
                            style="width : 100%" />
                </ta-form-item>
                <ta-form-item label="身份证号"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              class="spilwid"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号"
                            style="width : 100%" />
                </ta-form-item>
                <ta-form-item label="是否认领"
                              :labelCol="{ span: 10 }"
                              :wrapperCol="{span:14}"
                              style="width:220px"
                              fieldDecoratorId="isConfirm"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select>
                    <ta-select-option value="1">已认领</ta-select-option>
                    <ta-select-option value="2">未认领</ta-select-option>
                    <ta-select-option value="">全部</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-form-item label="上报日期"
                            fieldDecoratorId="createTime"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="退出日期"
                            fieldDecoratorId="exitDate"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="在册状态"
                            fieldDecoratorId="isRegistered"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{ span: 17 }"
                            class="spilwid"
                            :initValue="['0']">
                <ta-checkbox-group :options="[
                    { label: '登记在册', value: '0' },
                    { label: '退出', value: '1' },
                  ]" />
              </ta-form-item>
              <ta-form-item label="出生日期"
                            fieldDecoratorId="birthday"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="寄宿情况"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{span:17}"
                            class="spilwid"
                            fieldDecoratorId="isBoarding">
                <!-- :fieldDecoratorOptions="{initialValue: ''}" -->
                <ta-select :placeholder="'请选择寄宿情况'">
                  <ta-select-option value="1">寄宿生</ta-select-option>
                  <ta-select-option value="0">非寄宿生</ta-select-option>
                  <ta-select-option value="99">未采集</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-col>
                <ta-form-item label="有无委托照料人"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span: 15 }"
                              class="spilwid3"
                              fieldDecoratorId="isHavingCareParson">
                  <ta-select allowClear
                             :placeholder="'请选择有无委托照料人'">
                    <ta-select-option value="1"> 有</ta-select-option>
                    <ta-select-option value="0"> 无</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="监护人与儿童关系"
                              :labelCol="{ span: 11 }"
                              :wrapperCol="{span: 13 }"
                              class="spilwid3"
                              fieldDecoratorId="relationship">
                  <ta-select allowClear
                             collectionFilter="01,02,11"
                             :placeholder="'请选择与儿童关系'"
                             collection-type="RELATION"
                             collection-filter="01,02,11" />
                </ta-form-item>
                <ta-form-item label="委托照料原因"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span: 15 }"
                              class="spilwid3"
                              fieldDecoratorId="careReason">
                  <ta-select allowClear
                             :placeholder="'请选择委托照料原因'">
                    <ta-select-option v-for="(item,index) in careReasonList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                    <ta-select-option value="99">未采集</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <div v-if="arealevel1==3||arealevel1==4">
                <ta-form-item label="现住址详细地址"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{span:18}"
                              class="spilwid1"
                              fieldDecoratorId="address">
                  <ta-input placeholder="请输入现住址详细地址" />
                </ta-form-item>
              </div>
              <ta-form-item label="性别"
                            fieldDecoratorId="sexList"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="sexList" />
              </ta-form-item>
              <ta-form-item label="户籍性质"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="householdRegistrationStatusList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="censusregisterList" />
              </ta-form-item>
              <ta-form-item label="学业状况"
                            class="spilwid1"
                            fieldDecoratorId="academicStatusList"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]">
                <ta-checkbox-group :options="xystatus" />
              </ta-form-item>
              <ta-form-item label="就学情况"
                            class="spilwid1"
                            fieldDecoratorId="goSchoolStatusList"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]">
                <ta-checkbox-group :options="schoolingList" />
              </ta-form-item>

              <ta-form-item label="监护类型"
                            fieldDecoratorId="guardianshipList"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]">
                <ta-checkbox-group :options="guardianlist" />
              </ta-form-item>
              <ta-form-item label="健康状况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1"
                            fieldDecoratorId="healthCondition">
                <ta-radio-group @change="onChange">
                  <ta-radio @click="goHandle(item.value,'healthCondition',searchForm,  true)"
                            :value="item.value"
                            v-for="(item,index) in heathlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="残疾类型"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            v-if="heathval==Enum.HEALTHSTATUS.DISABILITY"
                            fieldDecoratorId="disabledTypeList"
                            class="spilwid1"
                            :require="{message:'请选择残疾类型'}"
                            :initValue="[]">
                <ta-checkbox-group :options="disabiliytypelist"
                                   placeholder='请选择残疾类型' />
              </ta-form-item>
              <ta-form-item label="残疾等级"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            v-if="heathval==Enum.HEALTHSTATUS.DISABILITY"
                            fieldDecoratorId="disabledLevelList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="canjileave"
                                   placeholder='请选择残疾等级' />

              </ta-form-item>
              <!--重病-->
              <ta-form-item label="重病"
                            v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS"
                            fieldDecoratorId="disabledType"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]"
                            :require="{message:'请选择重病'}">
                <ta-checkbox-group :options="disabiliytypelist" />
              </ta-form-item>
              <!--慢性病-->
              <ta-form-item label="慢性病"
                            v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE"
                            class="spilwid1"
                            fieldDecoratorId="disabledType"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]"
                            :require="{message:'请选择慢性病'}">
                <ta-checkbox-group :options="disabiliytypelist" />
              </ta-form-item>
              <ta-form-item label="其他特殊情况"
                            fieldDecoratorId="specialSituateList"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]">
                <ta-checkbox-group :options="otherSpecialist" />
              </ta-form-item>
              <ta-form-item label="救助措施"
                            fieldDecoratorId="welfareAssistAssistancList"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]">
                <ta-checkbox-group :options="socialWelfarelist" />
              </ta-form-item>
              <ta-form-item label="监护不当情形"
                            fieldDecoratorId="victimizatByguardiansList"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :initValue="[]">
                <ta-checkbox-group :options="guaediancilationlist" />
              </ta-form-item>
            </ta-form>
            <div class="searchbtn searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="search('000')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft"
                         @click="advancedquery">高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button>
            </div>
          </div>
        </div>
        <div>
          <div style="float: right;position: relative;z-index: 98;margin-bottom: 10px;">
            <ta-button v-if="goFrom"
                       icon="rollback"
                       @click="goback">返回</ta-button>
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       v-if="(arealevel >= '2')||(arealevel1 >= '2') && isshow"
                       @click="showModal">导出</ta-button>
            <ta-modal :centered="false"
                      style="top: 25%;"
                      :visible="showOn"
                      @ok="Excel"
                      @cancel="handleCancel">
              <div>
                <h3>确认导出查询条件下的全部有效数据吗？</h3>
              </div>
            </ta-modal>

          </div>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table :columns="mixColumns"
                    :locale="{emptyText: tableText}"
                    :dataSource="mixDataList"
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    @change="handleTableChange"
                    :customRow="fnCustomRow"
                    :pagination="false"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj"
                 class="btnlist">
              <span @click="see(val,obj)"
                    class="com_textsee">查看</span>
            </div>
          </ta-table>
        </ta-spin>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL2"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      spinning: null,
      goFrom: false,
      isshow: true,
      value: [],
      forceRenderBool: true,
      mode2: ['month', 'month'],
      mixDataList: [],
      mixColumns: [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '现住址',
          width: '40%',
          dataIndex: 'censusRegisterDetailAll',
          overflowTooltip: true
        },
        {
          title: '姓名',
          width: '16%',
          dataIndex: 'name',
          overflowTooltip: true
        },
        {
          title: '性别',
          width: '16%',
          align: 'center',
          dataIndex: 'sex',
          collectionType: 'SEX',
          overflowTooltip: true
        },
        {
          title: '上报日期',
          width: '16%',
          align: 'center',
          dataIndex: 'reportTime',
          overflowTooltip: true
        },
        {
          title: '儿童编号',
          width: '20%',
          dataIndex: 'childNumber',
          overflowTooltip: true
        },
        {
          title: '退出日期',
          dataIndex: 'exitDate',
          align: 'center',
          width: '15%',
          overflowTooltip: true
        },
        {
          title: '操作',
          overflowTooltip: false,
          width: '150px',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      areaId: '',
      areaCode: '',
      arealevel: '',
      arealevel1: '',
      mixListOptions: {
        mixGetDataListURL2: 'leftBehindChildren/queryLeftBehindChildren',
        mixActivatedIsNeed: false
      },
      choes: true,
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange,
        // hideDefaultSelections: true,
        type: 'checkbox'
      },
      notGetInfo: {
        label: '未采集',
        value: '999'
      },
      sexList: [],
      xystatus: [],
      schoolingList: [],
      careReasonList: [], // 委托照料人原因字典
      censusregisterList: [],
      guardianlist: [],
      otherSpecialist: [],
      xuejiList: [],
      guaediancilationlist: [],

      socialWelfarelist: [],
      heathlist: [], // 健康状况字典数据
      disabiliytypelist: [], // 残疾类型等字典数据
      canjileave: [], // 残疾等级字典数据
      heathval: '', // 健康状况选择的值

      issearch: false,
      showOn: false,

      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      choesP: [],
      addressmodel: [],
      tableText: '暂请根据检索条件查询详细列表信息无数据'

    }
  },
  updated () {
    this.setLabelAndWrapperWidth('9.3%', '90.7%', 'spilwid1') // 单独一行字段宽度控制
  },
  mounted () {
    this.getDictionary()
    this.getnation() // 健康状况字典上数据
    this.getdisabiliytype() // 残疾类型字典数据
    this.getleave() // 残疾等级字典数据
    this.tableText = '请根据检索条件查询详细列表信息'
    this.heathval = ''
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.arealevel1 = window.parent.indexTool.getUserInfo().areaLevel
    this.setHeight('one', 'oneout', !this.issearch)
    if (this.areaId == '1000000000000000000') {
      this.mixDataList = []
      this.tableText = '请根据检索条件查询详细列表信息'
    } else {
      this.tableText = '暂无数据'
      this.addressmodel = [this.areaId]
    }
    this.$nextTick(() => {
      if (this.areaId != '1000000000000000000') {
        this.search('000')
      }
    })
  },
  activated () {
    if (this.$route.query.areaId) {
      this.goFrom = true
      this.isshow = false
      this.areaId = this.$route.query.areaId
      this.dealArea(this.$route.query.areaIdPath)
      if (this.$route.query.isConfirm) {
        this.searchForm.setFieldsValue({
          isConfirm: this.$route.query.isConfirm
        })
      }
      if (this.$route.query.areaId) {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      }
      this.$nextTick(() => {
        if (this.areaId != '1000000000000000000') {
          this.search('000')
        }
      })
    } else {
      this.goFrom = false
      this.isshow = true
    }

    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
        this.setaddr()
      }
      if (this.$route.query.formDataSearch.healthCondition) {
        this.heathval = this.$route.query.formDataSearch.healthCondition
      }
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
      })
    }
  },
  methods: {
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
    },
    goback () { this.$router.go(-1) },
    setaddr () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    search (e) {
      this.searchForm.validateFields((err) => {
        if (!err) {
          this.page = 1
          this.size = 10
          this.issearch = false
          this.setHeight('one', 'oneout', !this.issearch)
          this.spinning = true
          const formData = this.userPageParams()
          if (e == '000' && formData.areaId && formData.areaId != '1000000000000000000') {
            this.handleSubmit()
          }
          this.$nextTick(() => {
            this.spinning = false
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (this.$route.query.isBenJi) {
        formData.isBenJi = this.$route.query.isBenJi
      }
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }

      this.changetime(formData)
      if (this.value.length > 0) {
        formData.yearsStart = this.value[0].format('YYYY-MM')
        formData.yearsEnd = this.value[1].format('YYYY-MM')
      }
      this.tableText = '暂无数据'
      if (formData.areaId == '1000000000000000000' || !formData.areaId) {
        this.$message.error('无区域信息，请选择查询的区域')
        this.tableText = '请根据检索条件查询详细列表信息'
      }

      return formData
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },

    goHandle (value, id, searchForm, b) {
      this.deuRadios(value, id, searchForm, b, this)
    },
    nullThen () {
      this.heathval = ''
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.page = 1
      this.size = 10
      this.heathval = ''
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.adsvalchange()
      this.value = []
      this.mode2 = ['month', 'month']
      if (this.areaId == '1000000000000000000') {
        this.mixDataList = []
        this.tableText = '请根据检索条件查询详细列表信息'
        this.addressmodel = []
      } else {
        this.addressmodel = [this.areaId]
        this.$nextTick(() => {
          this.search('000')
        })
      }
    },
    handlePanelChange2 (value, mode) {
      if (value.length == 0) {
        this.value = []
      }
    },
    datechange (value, mode) {
      if (value.length == 0) {
        this.value = []
      }
      this.value = value

      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    adsvalchange (value, areaLevel) {
      if (areaLevel) {
        this.arealevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.arealevel = ''
      }
    },
    getDictionary () {
      this.getDictionarieMore()
    },
    async getDictionarieMore () {
      this.careReasonList = await this.getDictionaries('ENTRUSTEDCAREREASONS')
      this.sexList = await this.getDictionaries('SEX')
      this.xystatus = await this.getDictionaries('ACADEMICSTATUS')
      this.xystatus.push(this.notGetInfo)
      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
      this.censusregisterList = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList.push(this.notGetInfo)
      this.xuejiList = await this.getDictionaries('CENSUSREGISTER')
      this.guardianlist = await this.getDictionaries('GUARDIANSHIPTYPE')// 监护类型
      this.guardianlist.push(this.notGetInfo)
      this.otherSpecialist = await this.getDictionaries('OTHERSPECIALCASES')// 其他特殊情况
      this.socialWelfarelist = await this.getDictionaries('SOCIALWELFAREIMPLEMENTATION')// 福利救助帮扶
      this.socialWelfarelist.sort((a, b) => {
        return a.value - b.value
      })
      this.guaediancilationlist = await this.getDictionaries('IMPROPERCARECONDITION')// 遭监护人侵害情况
    },

    // 健康状况的change事件
    onChange (e) {
      this.searchForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
    },

    // 健康狀況字典
    async getnation () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
      this.heathlist.push(this.notGetInfo)
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.disabiliytypelist = data.data.codeList
    },

    // 残疾等级  DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    // 如果选了多重残疾外的超过2个残疾，则多重残疾为选中

    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
      }
    },

    Excel () {
      const data = this.userPageParams()
      if (!data.areaId) {
        data.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (this.arealevel) {
        data.arealevel = this.arealevel
      } else {
        data.arealevel = window.parent.indexTool.getUserInfo().arealevel
      }
      data.orgId = window.parent.indexTool.getUserInfo().orgId
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      const url = '/leftOverChild/exportLeftOverChild'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },

    async see (val, obj) {
      const formData = this.searchForm.getFieldsValue()
      console.log(formData)
      formData.pathUrl = this.$route.path.substr(1)
      this.$router.push({
        name: 'stayAtHomeCollection',
        query: {
          isFromSearch: true,
          tm: !!obj.exitDate, // formData.isRegistered.indexOf('1') > -1,
          formDataSearch: JSON.stringify(formData),
          jump: 'yes',
          id: obj.id,
          tm: obj.isRegistered == '1',
          disabled: true
        }
      })
    },
    fnCustomRow (record, index) {
      return {
        props: {},
        on: {
          // 事件:支持DOM的标准事件,使用箭头表达式写法
          click: e => {
            if (this.choesP) {
              this.mixRowSelection.selectedRowKeys = []
              this.choesP = []
              this.choes = true
            }
            if (event.detail == 2) {
              this.see('', record)
            }
          }
        }
      }
    },
    handleOk (e) {
      this.exports()
      this.showOn = false
    },
    async exports () {
      const ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }

}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 16px; /*滚动条宽度*/
  height: 16px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: red; /*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: green; /*滚动条的背景颜色*/
}
.searchcont {
  width: 100%;
  position: relative;
  height: 100px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
  margin-bottom: 10px;
}
.searchcont {
  height: 66px;
  transition: all 1s ease 0s;
  position: absolute;
  width: 100%;
  z-index: 100;
  background: rgb(255, 255, 255);
}
.searchfroms {
  width: calc(100% - 330px);
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 0;
}
.ant-tabs-extra-content {
  display: none;
}
.searchdata {
  height: 100%;
}
.spilwid1 {
  width: 900px;
}
.spilwid2 {
  width: 410px;
}
.spilwid3 {
  width: 360px;
}
</style>
