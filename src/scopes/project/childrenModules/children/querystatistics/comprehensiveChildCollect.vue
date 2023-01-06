<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
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
              <div class="__form-spec-line__">
                <div>
                  <AreaQuery msg="区域"
                             class="spilwid"
                             :ishide="true"
                             :labelCol="{span:7}"
                             :wrapperCol="{span:17}"
                             @setaddress="setaddress"
                             :addressmodel="addressmodel"
                             :fileldName="'address_Linkage'"
                             types="2"></AreaQuery>
                  <!-- <ta-form-item label="申请日期"
                                fieldDecoratorId="applyDate"
                                class="spilwid2"
                                :labelCol="{span:5}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item> -->
                  <ta-col>
                    <!-- <ta-form-item label="享受年月"
                                  fieldDecoratorId='yearsStart'
                                  class="spilwid"
                                  :labelCol="{span:7}"
                                  :wrapperCol="{span:17}">
                      <ta-month-picker :allowClear='false'
                                       format="YYYY/MM"
                                       :placeholder="'开始年月'" />
                    </ta-form-item> -->
                    <!-- <ta-form-item label="发放类型"
                                  fieldDecoratorId="1"
                                  :initValue="''"
                                  class="spilwid"
                                  :labelCol="{span:8}"
                                  :wrapperCol="{span:16}">
                      <ta-select defaultValue="1">
                        <ta-select-option value="1">正常发放</ta-select-option>
                        <ta-select-option value="2">续发</ta-select-option>
                        <ta-select-option value>全部</ta-select-option>
                      </ta-select>
                    </ta-form-item> -->
                    <!-- <ta-form-item label="享受年月"
                                  fieldDecoratorId='yearsStart'
                                  class="spilwid"
                                  :labelCol="{span:7}"
                                  :wrapperCol="{span:17}">
                      <ta-month-picker :allowClear='false'
                                       format="YYYY-MM"
                                       :placeholder="'开始年月'" />
                    </ta-form-item>
                    <span>{{'~'}}</span>
                    <ta-form-item fieldDecoratorId='yearsEnd'
                                  class="spilwid"
                                  :labelCol="{span:7}"
                                  :wrapperCol="{span:17}">
                      <ta-month-picker :allowClear='false'
                                       format="YYYY-MM"
                                       :placeholder="'结束年月'" />
                    </ta-form-item> -->
                  </ta-col>
                  <!-- <ta-form-item label="出生日期"
                                fieldDecoratorId="birthday"
                                class="spilwid2"
                                :labelCol="{span:5}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item>

                  <ta-form-item class="spilwid"
                                fieldDecoratorId="thisMonthDate"
                                label="新增年月"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-month-picker :allowClear='false'
                                     :placeholder="'请选择新增年月'" />
                  </ta-form-item> -->

                </div>
                <div class="searchbtn searchButton">
                  <ta-button type="primary"
                             class="search"
                             icon="search"
                             @click="searchslist('000')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <!-- <ta-button class="btnleft"
                             @click="advancedquery">高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button> -->
                </div>
              </div>

              <!-- <ta-form-item label="性别"
                            fieldDecoratorId="sex"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in sexList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="户籍性质"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="householdRegistrationStatus"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in censusregisterList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="就学情况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="schoolStatus"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in schoolingList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label=" 统计维度"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="sfStatus"
                            class="spilwid1"
                            :initValue="'3'">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in sfStatus"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="保障情况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="helpMeasure"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in helpMeasurelist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="健康状况"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1"
                            fieldDecoratorId="healthStatus">
                <ta-radio-group @change="onChange">
                  <ta-radio @click="goHandle(item.value,'healthStatus',searchForm, true)"
                            :value="item.value"
                            v-for="(item,index) in heathlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="残疾类型"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            v-if="heathval==Enum.HEALTHSTATUS.DISABILITY"
                            fieldDecoratorId="disabledType"
                            class="spilwid1"
                            :initValue="[]">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'disabledType',searchForm,false)"
                            :value="item.value"
                            v-for="(item,index) in disabiliytypelist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="残疾等级"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            v-if="heathval==Enum.HEALTHSTATUS.DISABILITY"
                            fieldDecoratorId="disabledLevel"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'disabledLevel',searchForm,false)"
                            :value="item.value"
                            v-for="(item,index) in canjileave"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
                <ta-radio-group style="float:left;"></ta-radio-group>
              </ta-form-item>
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

              <ta-form-item label="父亲状况"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            fieldDecoratorId="fatherOfCurrentSituation"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'fatherOfCurrentSituation',searchForm,false)"
                            :value="item.value"
                            v-for="(item,index) in presentsituationlist"
                            :key="index">{{item.label}}</ta-radio>

                </ta-radio-group>

              </ta-form-item>
              <ta-form-item label="母亲状况"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            fieldDecoratorId="motherOfCurrentSituation"
                            class="spilwid1">
                <ta-radio-group>
                  <ta-radio @click="goHandle(item.value,'motherOfCurrentSituation',searchForm,false)"
                            :value="item.value"
                            v-for="(item,index) in presentsituationlist"
                            :key="index">{{item.label}}</ta-radio>

                </ta-radio-group>

              </ta-form-item> -->

            </ta-form>

          </div>
        </div>
        <div style="text-align:right;margin-bottom:10px">
          <ta-button class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-button v-if="!isgoback"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table class="table-min-width"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="tableData"
                    bordered>
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel==4 || b.areaName=='合计'||!b.areaId ||  b.isIn=='01'">{{a}}</span>
              <a @click="searchslist(b,'click')"
                 v-else>{{a}}</a>
            </template>
            <span slot="noNum"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 v-if="0!=obj.unattendedAmount && obj.areaName !='合计' && obj.areaId && obj.isIn!='01'"
                 @click="lookInfo(val,obj,index,'1')">{{obj.unattendedAmount}}</a>
              <span v-else>{{obj.unattendedAmount}}</span>
            </span>
            <span slot="impNum"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 v-if="0!=obj.improperCareAmount && obj.areaName !='合计' && obj.areaId && obj.isIn!='01'"
                 @click="lookInfo(val,obj,index,'2')">{{obj.improperCareAmount}}</a>
              <span v-else>{{obj.improperCareAmount}}</span>
            </span>
            <!-- <div slot="famNum"
                 slot-scope="val,obj,index">
              <span>
                <a href="javascript:;"
                   v-if="0!=obj.familyDifficultAmount && obj.areaName !='合计' && obj.areaId && areaLevel < 2"
                   @click="lookInfo(val,obj,index,'3')">{{obj.familyDifficultAmount}}</a>
                <span v-else>{{obj.familyDifficultAmount}}</span>
              </span>
            </div>
            <div slot="disNum"
                 slot-scope="val,obj,index">
              <span>
                <a href="javascript:;"
                   v-if="0!=obj.disabledAmount && obj.areaName !='合计' && obj.areaId && areaLevel < 2"
                   @click="lookInfo(val,obj,index,'4')">{{obj.disabledAmount}}</a>
                <span v-else>{{obj.disabledAmount}}</span>
              </span>
            </div> -->
            <div slot="abcde"
                 slot-scope=" a,b,c">
              <span>
                {{b.noConfirmDisabledAmount+'/'+b.disabledAmount}}
              </span>
            </div>
          </ta-table>
        </ta-spin>
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
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
// import request from '@component/common/js/util/request'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel,
      spinning: true,
      value1: {},
      isgoback: true,
      value: [],
      forceRenderBool: true,
      mode2: ['month', 'month'],
      ishide: true,
      tableData: [],
      mixDataList: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: '19%',
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '小计',
          dataIndex: 'subtotal',
          align: 'center',
          width: '10%'
        },
        {
          title: '事实无人抚养儿童人数',
          dataIndex: 'unattendedAmount',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'noNum' }
        },
        {
          title: '监护不当儿童人数',
          dataIndex: 'improperCareAmount',
          align: 'center',
          width: '13%',
          scopedSlots: { customRender: 'impNum' }
        },
        {
          title: '家庭贫困儿童人数 ',
          align: 'center',
          // dataIndex: 'familyDifficultAmount',
          // scopedSlots: { customRender: 'famNum' }
          children: [
            {
              title: '小计',
              width: '8%',
              dataIndex: 'pkSubtotal'
            },
            {
              title: '低保 ',
              width: '8%',
              dataIndex: 'dibaoDifficultAmount'
            },
            {
              title: '特困',
              width: '8%',
              dataIndex: 'tekunDifficultAmount'
            },
            {
              title: '建档立卡',
              width: '8%',
              dataIndex: 'jdlkDifficultAmount'
            }
          ]
        },
        {
          title: '残疾儿童人数',
          align: 'center',
          dataIndex: 'disabledAmount',
          scopedSlots: { customRender: 'disNum' }
        }

        // {
        //   title: '合计',
        //   dataIndex: 'sumAmount',
        //   align: 'center',
        //   width: '15%'
        // }

      ],
      areaId: '',
      areaCode: '',
      mixListOptions: {
        mixGetDataListURL: '/factNoOneRaisedWholeApi/queryChildCount',
        mixActivatedIsNeed: false
        // mixGetDataListIsPage: false
      },
      choes: true,
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange,
        // hideDefaultSelections: true,
        type: 'radio'
      },
      statisticTimeStart: '',
      statisticTimeEnd: '',
      params: {},
      sexList: [],
      addressmodel: [],
      nationList: [],
      censusregisterList: [],
      houseHoldList: [],
      schoolingList: [],
      employmentlist: [],
      helpMeasurelist: [], // 保障情况字典数据
      heathlist: [], // 健康状况字典数据
      disabiliytypelist: [], // 残疾类型等字典数据
      canjileave: [], // 残疾等级字典数据
      disabilityTypeValues: [], // 残疾类别选择的数据
      heathval: '', // 健康状况选择的值
      issearch: false,
      sfStatus: [{ label: '登记在册', value: '3' }, { label: '已减员', value: '2' }, { label: '全部', value: '1' }],
      nowkey1: '1', // 详细列表页面

      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      presentsituationlist: [],
      choesP: [],
      tablist: [{ name: '事实无人抚养儿童', value: '1' }, { name: '监护不当儿童', value: '2' }, { name: '家庭贫困儿童', value: '3' }, { name: '残疾儿童', value: '4' }] // 详细列表查询 中的tab数据
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('87px', '91.3%', 'spilwid1') // 单独一行字段宽度控制
  },
  mounted () {
    this.getDictionarieMore()
    this.getnation() // 健康状况字典上数据
    this.getdisabiliytype() // 残疾类型字典数据
    this.getleave() // 残疾等级字典数据
    this.searchslist('000')
  },
  activated () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    // this.searchForm.setFieldsValue({'1': ''})
    if (this.areaId != 1000000000000000000) {
      this.addressmodel = [this.areaId]
      this.setaddress()
    }
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    goback () {
      this.isgoback = true
      this.resetFrom()
    },
    setaddress () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    async getDictionarieMore () {
      this.employmentlist = await this.getDictionaries('EMPLOYMENTSITUATION')
      this.presentsituationlist = await this.getDictionaries('PRESENTSITUATION')
      this.sexList = await this.getDictionaries('SEX')
      this.nationList = await this.getDictionaries('NATION')
      this.censusregisterList = await this.getDictionaries('CENSUSREGISTER')
      this.houseHoldList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY')
      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
      this.helpMeasurelist = await this.getDictionaries('OTHERSALVATIONOFUNATTENDED') // 保障情况字典
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
    goHandle (value, id, searchForm, b) {
      this.deuRadios(value, id, searchForm, b, this)
    },
    nullThen () {
      this.heathval = ''
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
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
    // advancedquery () {
    //   this.issearch = !this.issearch
    //   this.setHeight('one', 'oneout', !this.issearch)
    // },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey1

      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      }

      this.changetime(formData)
      console.log(formData, '--------')
      // if (this.value.length > 0) {
      //   formData.yearsStart = this.value[0].format('YYYY-MM')
      //   formData.yearsEnd = this.value[1].format('YYYY-MM')
      // }
      // if (formData.length > 0) {
      //   formData.yearsStart = formData.years[0].format('YYYY-MM')
      //   formData.yearsEnd = formData.years[1].format('YYYY-MM')
      // }
      // if (this.areaId) {
      //   formData.areaCode = this.areaId
      //   formData.areaId = this.areaId
      // }
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
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.value = []
      this.heathval = '1'
      this.mode2 = ['month', 'month']
      this.statisticTimeStart = ''
      this.statisticTimeEnd = ''
      // let searchValue = this.searchForm.getFieldsValue()
      this.searchslist()// 2020年5月29日11点42分，重置查询。
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
    adsvalchange (value) {

    },
    searchslist (value, type) {
      this.spinning = true
      const searchValue = this.searchForm.getFieldsValue()
      const areaId = ''
      if (searchValue.address_Linkage && searchValue.address_Linkage.length > 0) {
        searchValue.areaId = searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        this.areaId = searchValue.areaId
      } else {
        searchValue.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = searchValue.areaId
      }

      this.changetime(searchValue)
      if (searchValue.yearsStart) {
        searchValue.yearsStart = moment(searchValue.yearsStart).format('YYYY-MM')
      }
      if (value == '000') {
        this.issearch = !this.issearch
        // this.advancedquery()
      }
      if (!value) {
      } else {
        if (value && value != '6') {
          if (value.areaId) {
            searchValue.areaId = value.areaId
            this.areaId = value.areaId
          }
          this.changetime(searchValue)
          if (searchValue.yearsStart) {
            searchValue.yearsStart = moment(searchValue.yearsStart).format('YYYY-MM')
          }
        }
      }
      // if (!value || value == '6' || value.target) {
      //   console.log(value, 78965)
      //   this.isgoback = true
      // } else {
      //   console.log(value, 78965)
      //   this.isgoback = false
      // }
      // if (type == 'click') {
      //   this.isgoback = false
      // } else {
      //   this.isgoback = true
      // }
      if (type == 'click') {
        // 点击下转
        this.dealArea(value.idPath)
      }
      if (this.areaId == window.parent.indexTool.getUserInfo().areaId) {
        this.isgoback = true
      } else {
        this.isgoback = false
      }
      this.getlist(searchValue, value)
      // this.$nextTick(() => {
      //   this.spinning = false
      // })
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
        console.log(this.addressmodel)
      }
    },
    async getlist (params, value) {
      // let s, e
      // if (params.yearsStart) {
      //   s = params.yearsStart.replace('-', '').replace('-', '')
      // }
      // if (params.yearsEnd) {
      //   e = params.yearsEnd.replace('-', '').replace('-', '')
      // }

      // if (s || e) {
      //   if (parseInt(s) - parseInt(e) > 0) {
      //     this.$message.error('享受年月结束日期不能小于开始日期！')
      //     return false
      //   }
      // }

      let res = {}
      res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data
      if (this.issearch) {
        // this.advancedquery()
      }
      // if (value != '6') {
      //   if (this.nowkey == '2') {
      //     this.handleSubmit()
      //   }
      // }
      this.$nextTick(() => {
        this.spinning = false
      })
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
      }
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    Excel () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      formData.orgType = window.parent.indexTool.getUserInfo().orgType
      if (formData.address_Linkage) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (formData.yearsStart) {
        formData.yearsStart = moment(formData.yearsStart).format('YYYY-MM')
      }
      // if (this.value.length > 0) {
      //   // startDateStart
      //   formData.startDateStart = this.value[0].format('YYYY-MM')
      //   formData.startDateEnd = this.value[1].format('YYYY-MM')
      // }
      this.exportdata = formData
      this.exportFile('/factNoOneRaisedWholeApi/exportUnattendedNum', this.exportdata)
      this.showOn = false
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },
    // pagechange (page, size) {
    //   this.page = page
    //   this.size = size
    // },
    lookInfo (val, obj, index, type) {
      const formData = this.searchForm.getFieldsValue()
      const welfareList = ''
      // this.tableData.forEach(item => {
      //   if (item.isIn != '01') {
      //     welfareList = item.idpath
      //   }
      // })
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }

      this.changetime(formData)
      if (formData.yearsStart) {
        formData.yearsStart = moment(formData.yearsStart).format('YYYY-MM')
      }
      this.$router.push({
        name: 'comprehensiveChildStatistics',
        query: {
          url: './comprehensiveChildStatistics',
          registType: type,
          welfareOrgId: obj.welfareOrgId || '',
          areaCode: obj.areaId,
          areaArray: obj.idPath,
          // welfareList: welfareList,
          formData: formData
        }
      })
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
  width: 100%;
}
.searchbtn {
  width: 330px;
  flex: 0 0 auto;
  margin-left: 20px;
  margin-top: 2px;
}
.ant-tabs-extra-content {
  display: none;
}
.searchdata {
  height: 100%;
}
.spilwid1 {
  width: 100%;
}
.spilwid2 {
  width: 410px;
}
.__form-spec-line__ {
  display: flex;
}
</style>
