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
                             v-if="!walfare"
                             style="width:250px"
                             :ishide="true"
                             :labelCol="{span:7}"
                             :wrapperCol="{span:17}"
                             @adsvalchange="adsvalchange"
                             @setaddress="setaddress"
                             :addressmodel="addressmodel"
                             :fileldName="'address_Linkage'"
                             types="2"></AreaQuery>
                  <ta-form-item label="申请日期"
                                fieldDecoratorId="applyDate"
                                style="width:380px"
                                :labelCol="{span:6}"
                                :wrapperCol="{span:18}">
                    <ta-range-picker />
                  </ta-form-item>
                  <ta-form-item label="人员状态"
                                :labelCol="{span:10}"
                                :wrapperCol="{span:14}"
                                fieldDecoratorId="sfStatus"
                                style="width:250px"
                                :initValue="'3'">
                    <ta-select :placeholder="'人员状态'">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in sfStatus"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                    <!-- <ta-radio-group>
                      <ta-radio :value="item.value"
                                v-for="(item,index) in sfStatus"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group> -->
                  </ta-form-item>
                  <ta-col>
                    <ta-form-item label="是否享受补贴"
                                  fieldDecoratorId="isEnjoySubsidies"
                                  :labelCol="{ span: 12 }"
                                  :wrapperCol="{ span: 12 }"
                                  style="width:250px">
                      <ta-radio-group @change="changeIsEnjoySubsidies"
                                      :disabled="disabledEnjoy"
                                      :options="[{'value':'1','label':' 是'},{'value':'0','label':'否'} ]" />
                    </ta-form-item>
                    <ta-form-item label="享受状态"
                                  fieldDecoratorId="issueType"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{ span: 17 }"
                                  style="width:300px">
                      <ta-checkbox-group @change="changeIssueType"
                                         :disabled="disabledType1"
                                         :options="[{'value':'0','label':'正常发放'},{'value':'1','label':' 超龄续发'}]" />
                    </ta-form-item>
                    <ta-form-item label="享受年月"
                                  fieldDecoratorId='yearsStart'
                                  class="spilwid"
                                  :labelCol="{span:7}"
                                  :wrapperCol="{span:17}">
                      <ta-month-picker :allowClear='false'
                                       format="YYYY/MM"
                                       :disabled="disabledType1"
                                       :placeholder="'开始年月'" />
                    </ta-form-item>
                    <!-- <ta-form-item class="spilwid2"
                                  fieldDecoratorId="attritionDate"
                                  label="减员日期"
                                  :labelCol="{span:7}"
                                  :wrapperCol="{span:17}">
                      <ta-range-picker />
                    </ta-form-item> -->
                  </ta-col>
                  <ta-form-item label="出生日期"
                                fieldDecoratorId="birthday"
                                class="spilwid2"
                                :labelCol="{span:5}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item>

                  <ta-form-item class="spilwid"
                                fieldDecoratorId="thisMonthDate"
                                label="起领年月"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-month-picker :allowClear='false'
                                     :placeholder="'请选择起领年月'" />
                  </ta-form-item>

                </div>
                <div class="searchbtn searchButton">
                  <ta-button type="primary"
                             class="search"
                             icon="search"
                             @click="searchslist('000')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             @click="advancedquery">高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>
              </div>
              <!-- <ta-form-item label="享受状态"
                            fieldDecoratorId="issueType"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{ span: 17 }"
                            class="spilwid1">
                <ta-checkbox-group @change="changeIssueType" :disabled="disabledType1" :options="[{'value':'1','label':' 超龄续发'},{'value':'0','label':'正常发放'},{'value':'2','label':'已停发'} ]" />
              </ta-form-item>
              <ta-form-item label="是否享受补贴"
                            fieldDecoratorId="isEnjoySubsidies"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{ span: 17 }"
                            class="spilwid1">
                <ta-radio-group @change="changeIsEnjoySubsidies" :disabled="disabledEnjoy" :options="[{'value':'1','label':' 是'},{'value':'0','label':'否'} ]" />
              </ta-form-item> -->
              <ta-form-item label="性别"
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
                <!-- <ta-checkbox-group :options="disabiliytypelist"
                                   placeholder='请选择残疾类别'
                                   @change="setMulti"
                                   :values="disabilityTypeValues" /> -->
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

              </ta-form-item>

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
            <template slot="totle"
                      slot-scope="val,obj,index">
              <span v-if="obj.areaName =='合计'">{{obj.zongshu + obj.zongshu2}}</span>
              <span v-else>{{obj.concentratedFeedCount + obj.noConcentratedFeedCount}}</span>
            </template>
            <span slot="concentratedFeedCount"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 v-if="0!=obj.concentratedFeedCount && obj.areaName !='合计' && obj.areaId"
                 @click="lookInfo(val,obj,index,'1')">{{obj.concentratedFeedCount}}</a>
              <span v-else-if="obj.areaName =='合计'">{{obj.zongshu}}</span>
              <span v-else>{{obj.concentratedFeedCount}}</span>
            </span>

            <span slot="noConcentratedFeedCount"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 v-if="0!=obj.noConcentratedFeedCount && obj.areaName !='合计' && obj.areaId"
                 @click="lookInfo(val,obj,index,'0')">{{obj.noConcentratedFeedCount}}</a>
              <span v-else-if="obj.areaName =='合计'">{{obj.zongshu2}}</span>
              <span v-else>{{obj.noConcentratedFeedCount}}</span>
            </span>

            <template slot="bfb"
                      slot-scope="a, b, c">
              <span> {{calculate(b)}} </span>
            </template>
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
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      arealevel: '',
      spinning: true,
      disabledType1: false,
      disabledEnjoy: false,
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
          width: '28%',
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '合计',
          dataIndex: 'totle',
          align: 'center',
          width: '16%',
          scopedSlots: { customRender: 'totle' }
        },
        {
          title: '集中供养事实无人抚养儿童',
          dataIndex: 'concentratedFeedCount',
          align: 'center',
          width: '28%',
          scopedSlots: { customRender: 'concentratedFeedCount' }
        },
        {
          title: '社会散居事实无人抚养儿童',
          dataIndex: 'noConcentratedFeedCount',
          align: 'center',
          width: '28%',
          scopedSlots: { customRender: 'noConcentratedFeedCount' }
        }

      ],
      areaId: '',
      areaCode: '',
      walfare: window.parent.indexTool.getUserInfo().orgType == '99',
      mixListOptions: {
        mixGetDataListURL: '/factNoOneRaisedWholeApi/queryFactsNoRaiseChildCount',
        mixActivatedIsNeed: false
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
    console.log()
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
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey1

      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        this.areaId = formData.areaId
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = formData.areaId
      }
      if (window.parent.indexTool.getUserInfo().orgType == '99') {
        formData.orgId = window.parent.indexTool.getUserInfo().orgId
      }

      this.changetime(formData)

      if (formData.yearsStart) {
        formData.yearsStart = moment(formData.yearsStart).format('YYYY-MM')
      }
      if (formData.applyDateStart) {
        formData.applyDateStartStr = formData.applyDateStart
        delete formData.applyDateStart
      }
      if (formData.applyDateEnd) {
        formData.applyDateEndStr = formData.applyDateEnd
        delete formData.applyDateEnd
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
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.disabledType1 = false
      this.disabledEnjoy = false
      this.addressmodel = [this.areaId]
      this.value = []
      this.heathval = '1'
      this.mode2 = ['month', 'month']
      this.statisticTimeStart = ''
      this.statisticTimeEnd = ''
      this.searchslist()// 2020年5月29日11点42分，重置查询。
    },
    handlePanelChange2 (value, mode) {
      if (value.length == 0) {
        this.value = []
      }
    },

    changeIssueType (e) {
      if (e.length > 0) {
        this.searchForm.setFieldsValue({ isEnjoySubsidies: '1' })
        this.searchForm.setFieldsValue({ yearsStart: moment(new Date(), 'YYYY-MM') })
      }
      // else {
      //   this.searchForm.setFieldsValue({isEnjoySubsidies: null})
      //   this.searchForm.setFieldsValue({yearsStart: null})
      // }
    },
    changeIsEnjoySubsidies (e) {
      if (e.target.value == '0') {
        this.searchForm.setFieldsValue({ issueType: null })
        this.searchForm.setFieldsValue({ yearsStart: null })
        this.disabledType1 = true
      } else {
        this.disabledType1 = false
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ yearsStart: moment(new Date(), 'YYYY-MM-DD') })
          this.searchForm.setFieldsValue({ issueType: ['0'] })
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
    adsvalchange (value, areaLevel) {
      if (areaLevel) {
        this.arealevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.arealevel = ''
      }
      console.log(this.arealevel, 888)
    },
    searchslist (value, type) {
      this.spinning = true
      const searchValue = this.userPageParams()
      const areaId = ''
      if (value == '000') {
        this.issearch = !this.issearch
        this.advancedquery()
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
      let res = {}
      res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data.list
      if (this.issearch) {
        this.advancedquery()
      }
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
      const formData = this.userPageParams()
      formData.orgType = window.parent.indexTool.getUserInfo().orgType
      if (this.arealevel) {
        formData.areaLevel = this.arealevel
      } else {
        formData.areaLevel = window.parent.indexTool.getUserInfo().arealevel
      }
      this.exportdata = formData
      this.exportFile('/factNoOneRaisedWholeApi/exportFactsNoChildrenNum', this.exportdata)
      this.showOn = false
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },
    lookInfo (val, obj, index, type) {
      const formData = this.searchForm.getFieldsValue()
      const welfareList = ''
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
          isConcentratedFeed: type,
          welfareOrgId: obj.welfareOrgId || '',
          areaCode: obj.areaId,
          areaArray: obj.idPath,
          formData: formData

        }
      })
    }
  }

}
</script>
<style scoped>
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
