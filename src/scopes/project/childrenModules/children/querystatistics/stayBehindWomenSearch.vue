<template>
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
                           :allowClear="false"
                           @adsvalchange='adsvalchange'
                           :labelCol="{span:7}"
                           :wrapperCol="{span:17}"
                           types="2"></AreaQuery>
                <ta-form-item label="姓名"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}"
                              style="width:300px"
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
              <ta-form-item label="出生日期"
                            fieldDecoratorId="birthday"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="上报日期"
                            fieldDecoratorId="createTime"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="结婚时间"
                            fieldDecoratorId="marryTime"
                            style="width:410px;"
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
              <ta-form-item label="丈夫外出年限"
                            fieldDecoratorId="husbandGoOutYear"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}"
                            class="spilwid2">
                <ta-input-group compact>
                  <ta-input-number style=" width: 128px; text-align: center"
                                   placeholder=""
                                   :min=0
                                   :max=99
                                   :precision="1"
                                   v-model="minVal"
                                   @blur="compareData('minVal')" />
                  <ta-input style=" width: 31px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                            placeholder="~"
                            disabled />
                  <ta-input-number style="width: 128px; text-align: center; border-left: 0"
                                   placeholder=""
                                   :min=0
                                   :max=99
                                   :precision="1"
                                   v-model="maxVal"
                                   @blur="compareData('maxVal')" />
                </ta-input-group>
              </ta-form-item>

              <ta-form-item label="在册状态"
                            fieldDecoratorId="isRegistered"
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 17 }"
                            class="spilwid2"
                            :initValue="['0']">
                <ta-checkbox-group :options="[
                      { label: '登记在册', value: '0' },
                      { label: '退出', value: '1' },
                    ]" />
              </ta-form-item>
              <div v-if="arealevel1==3||arealevel1==4">
                <ta-form-item label="现住址详细地址"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{span:18}"
                              class="spilwid1"
                              fieldDecoratorId="address">
                  <ta-input placeholder="请输入现住址详细地址" />
                </ta-form-item>
              </div>
              <ta-col>
                <ta-form-item label="文化程度"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="educationLevelList"
                              :initValue="[]"
                              class="spilwid1">
                  <ta-checkbox-group :options="cultureList" />
                </ta-form-item>
              </ta-col>
              <ta-col>
                <ta-form-item label="健康状况"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              class="spilwid1"
                              fieldDecoratorId="healthStatusList">
                  <ta-radio-group @change="onChange">
                    <ta-radio :value="item.value"
                              @click=" goHandle (item.value, 'healthStatusList', searchForm,  true)"
                              v-for="(item,index) in heathlist"
                              :key="index">{{item.label}}</ta-radio>
                  </ta-radio-group>
                </ta-form-item>
              </ta-col>
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
                            :require="{message:'请选择重病!'}">
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
                            :require="{message:'请选择慢性病!'}">
                <ta-checkbox-group :options="disabiliytypelist" />
              </ta-form-item>
              <ta-form-item label="是否登记领证"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="marriageRegisterCase"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            @click=" goHandle (item.value, 'marriageRegisterCase', searchForm,  false)"
                            v-for="(item,index) in boolStatus"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="公婆情况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="parentsInLawCaseList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="gongpoCase" />
              </ta-form-item>
              <ta-form-item label="获得生产帮扶情况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="getHelpCaseList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="obtainList" />
              </ta-form-item>
              <ta-form-item label="家庭经济来源"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="familyBreadwinnerList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="familySourceList" />
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
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       v-if="(arealevel > '1')||(arealevel1 > '1') && isshow"
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
            <ta-button icon="rollback"
                       v-if="goFrom"
                       @click="goback">返回</ta-button>
          </div>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table :columns="mixColumns"
                    :locale="{emptyText: tableText}"
                    :dataSource="mixDataList"
                    class="table-min-width"
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
                 slot-scope="val,obj,index"
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
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import $ from 'jquery'
import moment from 'moment'

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
      isgoback: true,
      value: [],
      forceRenderBool: true,
      mode2: ['month', 'month'],
      ishide: true,
      tableData: [],
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
          width: '60%',
          dataIndex: 'censusRegisterDetail',
          overflowTooltip: true
        },
        {
          title: '姓名',
          width: '20%',
          dataIndex: 'name',
          overflowTooltip: true
        },
        {
          title: '上报日期',
          width: '20%',
          align: 'center',
          dataIndex: 'createTime',
          overflowTooltip: true
        },
        {
          title: '退出日期',
          dataIndex: 'exitTime',
          align: 'center',
          width: '15%',
          overflowTooltip: true
        },
        {
          title: '操作',
          overflowTooltip: false,
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      areaId: '',
      areaCode: '',
      arealevel: '',
      arealevel1: '',
      mixListOptions: {
        mixGetDataListURL: '/leftBehindWomenStatistics/queryLeftBehindWoman',
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

      heathlist: [], // 健康状况字典数据
      disabiliytypelist: [], // 残疾类型等字典数据
      canjileave: [], // 残疾等级字典数据
      cultureList: [], // 文化程度字典数据
      obtainList: [],
      familySourceList: [],
      disabilityTypeValues: [], // 残疾类别选择的数据
      heathval: '', // 健康状况选择的值
      issearch: false,
      boolStatus: [{ label: '是', value: '1' }, { label: '否', value: '2' }],
      gongpoCase: [{ label: '双方健在', value: '1' }, { label: '一方健在', value: '2' }, { label: '双方去世', value: '3' }],
      nowkey: '1',
      nowkey1: '1', // 详细列表页面

      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      choesP: [],
      addressmodel: [],
      tableText: '暂请根据检索条件查询详细列表信息无数据',
      minVal: null, // 丈夫外出开始年限
      maxVal: null // 丈夫外出结束年限

    }
  },

  updated () {
    this.setLabelAndWrapperWidth('9.3%', '90.7%', 'spilwid1') // 单独一行字段宽度控制
  },
  mounted () {
    this.getDictionarieMore()
    this.getnation() // 健康状况字典上数据
    this.getdisabiliytype() // 残疾类型字典数据
    this.getleave() // 残疾等级字典数据
    this.heathval = ''
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.arealevel1 = window.parent.indexTool.getUserInfo().areaLevel
    this.setHeight('one', 'oneout', !this.issearch)
    this.nowkey = '1'
    if (this.areaId == '1000000000000000000') {
      this.mixDataList = []
      this.tableText = '请根据检索条件查询详细列表信息'
    } else {
      this.tableText = '暂无数据'
      this.addressmodel = [this.areaId]
    }
    if (this.areaId != '1000000000000000000') {
      this.$nextTick(() => {
        this.search('000')
      })
    }
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
      if (this.areaId != '1000000000000000000') {
        this.$nextTick(() => {
          this.search('000')
        })
      }
    } else {
      this.goFrom = false
      this.isshow = true
    }
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
        this.setaddr()
      }
      if (this.$route.query.formDataSearch.healthStatusList) {
        this.heathval = this.$route.query.formDataSearch.healthStatusList
      }
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
      })
    }
  },
  methods: {
    // 比较数据大小
    compareData (e) {
      const minVal = this.minVal
      const maxVal = this.maxVal
      if (typeof minVal == 'number' && typeof maxVal == 'number' && minVal > maxVal) {
        this.$message.warn('初始值不能大于结束值！')
        this[e] = null
      }
    },
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
      if (this.nowkey == '2') {
        formData.type = this.nowkey1
      }
      if (this.$route.query.isBenJi) {
        formData.isBenJi = this.$route.query.isBenJi
      }
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      // 丈夫外出年限处理
      if (this.minVal) {
        formData.husbandGoOutYearStart = this.minVal
      }
      if (this.maxVal) {
        formData.husbandGoOutYearEnd = this.maxVal
      }
      delete formData.husbandGoOutYear
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

    resetFrom () {
      this.maxVal = null
      this.minVal = null
      this.heathval = ''
      this.page = 1
      this.size = 10
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.addressmodel = [this.areaId]
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.value = []
      this.adsvalchange()
      this.mode2 = ['month', 'month']
      if (this.areaId == '1000000000000000000') {
        this.mixDataList = []
        this.tableText = '请根据检索条件查询详细列表信息'
      } else {
        this.$nextTick(() => {
          this.search('000')
        })
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

    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
      }
    },
    goRecord () {
      this.$router.push({
        path: 'maintenancePaymentRecord',
        query: {
          baseId: this.choesP[0].baseId
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      if (this.arealevel) {
        data.arealevel = this.arealevel
      } else {
        data.arealevel = window.parent.indexTool.getUserInfo().areaLevel
      }
      data.orgId = window.parent.indexTool.getUserInfo().orgId
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      let url = '/leftOverWoman/exportLeftOverWoman'
      if (this.nowkey1 == '2') { // 监护不当
        url = '/leftOverWoman/exportLeftOverWoman'
      }
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    see (val, obj) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      this.$router.push({
        name: 'womenStayingAtHome',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          id: obj.id, // id未定
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

    async getDictionarieMore () {
      this.cultureList = await this.getDictionaries('DEGREEEDUCATION')
      this.obtainList = await this.getDictionaries('OBTAINPRODUCTIONASSISTANCE')
      this.familySourceList = await this.getDictionaries('FAMILYSOURCEINCOME')
    },
    // 健康狀況字典
    async getnation () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
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
    goHandle (value, id, searchForm, b) {
      this.deuRadios(value, id, searchForm, b, this)
    },
    nullThen () {
      this.heathval = ''
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
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
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    adsvalchange (value, areaLevel) {
      if (areaLevel) {
        this.arealevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.arealevel = ''
      }
    },

    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
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
</style>
