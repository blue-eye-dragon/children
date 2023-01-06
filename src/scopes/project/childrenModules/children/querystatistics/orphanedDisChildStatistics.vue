<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer:'80px'}">
      <div class="contin"
           style="padding-top:15px">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form ref="one"
                     layout="inline"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <div class="__form-spec-line__">
                <div>
                  <ta-col :span="24">
                    <AreaQuery msg="区域"
                               :isshow1="!isshow1"
                               class="spilwid3"
                               :ishide="true"
                               :labelCol="{span:7}"
                               :types="'2'"
                               :areaLevel1="areaLevel"
                               :wrapperCol="{span:17}"
                               @setaddress="setaddress"
                               :addressmodel="addressmodel"
                               @adsvalchange="adsvalchange"
                               :fileldName="'address_Linkage'"
                               ref="areaselect"></AreaQuery>
                    <ta-form-item label="福利机构"
                                  fieldDecoratorId="welfareOrgId"
                                  v-if="!isshow1"
                                  class="spilwid3"
                                  :labelCol="{span:8}"
                                  :wrapperCol="{span:16}">
                      <!--  多选 mode="multiple" -->
                      <ta-select showSearch
                                 optionFilterProp="children"
                                 :value="valueT"
                                 placeholder="请输入福利机构名称"
                                 :defaultActiveFirstOption="false"
                                 :showArrow="false"
                                 :filterOption="false"
                                 :searchDelay="1"
                                 @search="handleSearch"
                                 @change="mechanismchange">
                        <ta-select-option :value="item.taorgId"
                                          v-for="(item,index) in welfareOrgNameList"
                                          :key="index">{{item.orgName}}</ta-select-option>
                      </ta-select>
                      <!-- <ta-select showSearch
                             :disabled="disabled"
                             optionFilterProp="children"
                             :filterOption="filterOption"
                             :placeholder="disabled?'请先选择区域':'请选择福利机构'">
                    <ta-select-option :value="item.taorgId"
                                      v-for="(item,index) in welfareOrgNameList"
                                      :key="index">{{item.orgName}}</ta-select-option>
                  </ta-select> -->
                    </ta-form-item>

                    <ta-form-item style="width:220px"
                                  fieldDecoratorId="isRegistered"
                                  :initValue="'1'"
                                  label="人员状态"
                                  :labelCol="{span:10}"
                                  :wrapperCol="{span:14}">
                      <ta-select placeholder="请选择人员状态">
                        <ta-select-option value="1">登记在册</ta-select-option>
                        <ta-select-option value="2">已减员</ta-select-option>
                        <ta-select-option value>全部</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                    <ta-form-item label="是否享受补贴"
                                  style="width:250px"
                                  :labelCol="{span:14}"
                                  :wrapperCol="{span:10}"
                                  fieldDecoratorId="isEnjoySubsidies"
                                  :fieldDecoratorOptions="{initialValue: ''}">
                      <ta-select :placeholder="'请选择是否享受补贴'"
                                 @change="changeIsEnjoySubsidies">
                        <ta-select-option value>全部</ta-select-option>
                        <ta-select-option value="1">是</ta-select-option>
                        <ta-select-option value="0">否</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                  <ta-col v-if="!issearch">
                    <div class="formBtn">
                      <ta-button :type="isType == '1'?'primary':'dashed'"
                                 @click="Register">登记在册</ta-button>
                      <ta-button :type="isType == '2'?'primary':'dashed'"
                                 @click="RegisterEnjoy">本月享受</ta-button>
                      <ta-button :type="isType == '3'?'primary':'dashed'"
                                 @click="RegisterNotEnjoy">本月不享受</ta-button>
                    </div>
                  </ta-col>
                  <ta-form-item label="年月"
                                fieldDecoratorId='startDate'
                                class="spilwid"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-month-picker :disabled="disabledType1&&disabledType2"
                                     :allowClear="false"
                                     width='100%'
                                     format="YYYY-MM"
                                     :placeholder="'年月'" />
                  </ta-form-item>
                  <ta-form-item label="享受状态"
                                fieldDecoratorId="issueType"
                                :labelCol="{ span: 7 }"
                                :wrapperCol="{ span: 17 }"
                                class="spilwid">
                    <ta-checkbox-group :placeholder=" '请选择享受状态'"
                                       :disabled="disabledType1">
                      <ta-checkbox value="0">正常发放</ta-checkbox>
                      <ta-checkbox value="1">超龄续发</ta-checkbox>
                    </ta-checkbox-group>
                  </ta-form-item>
                  <ta-form-item label="是否补录"
                                fieldDecoratorId="isBulu"
                                :labelCol="{ span: 7 }"
                                :wrapperCol="{ span: 17 }"
                                class="spilwid">
                    <ta-radio-group>
                      <ta-radio :value="1">是</ta-radio>
                      <ta-radio :value="0">否</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>

                  <ta-form-item label="儿童类型"
                                class="spilwid1"
                                fieldDecoratorId="childTypeList"
                                :labelCol="{span:2}"
                                :wrapperCol="{span:22}">
                    <ta-checkbox-group :options="childTypeList" />
                    <!-- <ta-select :placeholder=" '请选择儿童类型'">
                      <ta-select-option value="">全部</ta-select-option>
                      <ta-select-option v-for="item in childTypeList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select> -->
                  </ta-form-item>

                  <ta-form-item label='姓名'
                                class="spilwid3"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="childName">
                    <ta-input placeholder="请输入姓名" />
                  </ta-form-item>
                  <ta-form-item label="儿童身份证号"
                                style="width:400px"
                                fieldDecoratorId="childIdCard"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:14}">
                    <ta-input placeholder="请输入儿童身份证号" />
                  </ta-form-item>
                  <ta-form-item label="儿童编号"
                                class="spilwid"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="childNumber">
                    <ta-input placeholder="请输入儿童编号" />
                  </ta-form-item>
                  <ta-form-item label="性别"
                                fieldDecoratorId="childSex"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                style="width:250px">
                    <ta-select placeholder="请选择性别">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in sexList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="民族"
                                class="spilwid"
                                fieldDecoratorId="childNation"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-select :placeholder="'请选择民族'">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in nationList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="出生日期"
                                fieldDecoratorId="childBirthDate"
                                class="spilwid2"
                                :labelCol="{span:6}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item>
                  <ta-form-item label="登记入院日期"
                                fieldDecoratorId="registerDate"
                                style="width:385px"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item>
                  <ta-form-item label="福利证号"
                                class="spilwid"
                                fieldDecoratorId="welfareCardNumber"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-input placeholder="请输入福利证号" />
                  </ta-form-item>
                  <ta-form-item label="儿童现住址"
                                fieldDecoratorId="childCurrentAddress"
                                class="spilwid2"
                                :labelCol="{span:6}"
                                :wrapperCol="{span:17}">
                    <ta-input placeholder="请输入儿童现住址" />
                  </ta-form-item>

                  <ta-form-item label="户籍性质"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="censusRegister"
                                class="spilwid">
                    <ta-select placeholder="请选择户籍性质">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in censusregisterList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="工学情况"
                                class="spilwid"
                                fieldDecoratorId="workStudySituation"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}">
                    <ta-select placeholder="请选择工学情况">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in worktudyList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="养育类型"
                                style="width:280px"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="rearingType">
                    <ta-select :placeholder="'请选择养育类型'">
                      <ta-select-option v-for="item in rearingTypeList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="领取方式"
                                style="width:250px"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="receiveWay">
                    <ta-select :placeholder="'请选择领取方式'">
                      <ta-select-option v-for="item in paymentList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="登记减员日期"
                                fieldDecoratorId="registerLeaveDate"
                                style="width:385px"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}">
                    <ta-range-picker />
                  </ta-form-item>
                  <ta-form-item label="数据来源"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}"
                                class="spilwid"
                                fieldDecoratorId="isAnotherPlaceApply">
                    <ta-select allowClear
                               placeholder="请选择数据来源">
                      <ta-select-option :value="'0'">本地申请</ta-select-option>
                      <ta-select-option :value="'1'">异地申请</ta-select-option>
                      <!-- <ta-select-option :value="'2'">公众服务平台</ta-select-option> -->
                    </ta-select>
                  </ta-form-item>
                </div>
                <div class="searchbtn searchButton">
                  <div class="searchButton">
                    <ta-button class="search "
                               icon="search"
                               @click="searchslist('search')">查询</ta-button>
                    <ta-button class="btnleft reset"
                               icon="reload"
                               @click="resetFrom">重置</ta-button>
                    <ta-button class="btnleft"
                               @click="advancedquery">
                      高级查询
                      <ta-icon :type="issearch?'up':'down'" />
                    </ta-button>
                  </div>
                </div>
              </div>

              <ta-form-item style="width:750px"
                            label="患艾滋病情况"
                            fieldDecoratorId="adisCondition"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}">
                <ta-radio-group @change="radiochangeAdis">
                  <ta-radio v-for="(item,index) in adisConditionList"
                            :key="index"
                            :value="item.value">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="健康状况"
                            :labelCol="{span:2}"
                            :wrapperCol="{span:22}"
                            class="spilwid1"
                            fieldDecoratorId="healthStatus">
                <ta-radio-group @change="onChange">
                  <ta-radio @click="goHandle(item.value,'healthStatus',searchForm, true)"
                            :value="item.value"
                            v-for="(item,index) in healthList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="患病类型"
                            :labelCol="{span:2}"
                            :wrapperCol="{span:22}"
                            fieldDecoratorId="illnessTypelist"
                            class="spilwid1"
                            :require="{enable:healthval==Enum.HEALTHSTATUS.CHRONICDISEASE||healthval==Enum.HEALTHSTATUS.SERIOUSILLNESS,message:'请选择患病类型'}"
                            :initValue="[]">
                <ta-checkbox-group :options="illnessTypeList"
                                   placeholder='请选择残疾类型' />
              </ta-form-item>
              <ta-form-item label="残疾类型"
                            :labelCol="{span:2}"
                            :wrapperCol="{span:22}"
                            fieldDecoratorId="disabledTypeList"
                            class="spilwid1"
                            :require="{enable:healthval==Enum.HEALTHSTATUS.DISABILITY,message:'请选择残疾类别'}"
                            :initValue="[]">
                <ta-checkbox-group :options="disabiliyTypeList"
                                   placeholder='请选择残疾类型' />
              </ta-form-item>
              <ta-form-item label="残疾等级"
                            :labelCol="{span:2}"
                            :wrapperCol="{span:22}"
                            fieldDecoratorId="disabledLevelList"
                            :require="{enable:healthval==Enum.HEALTHSTATUS.DISABILITY,message:'请选择残疾等级'}"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="disabledLevelList"
                                   placeholder='请选择残疾等级' />

              </ta-form-item>
              <ta-col :span="24"
                      v-if="issearch">
                <div class="formBtn">
                  <ta-button :type="isType == '1'?'primary':'dashed'"
                             @click="Register">登记在册</ta-button>
                  <ta-button :type="isType == '2'?'primary':'dashed'"
                             @click="RegisterEnjoy">本月享受</ta-button>
                  <ta-button :type="isType == '3'?'primary':'dashed'"
                             @click="RegisterNotEnjoy">本月不享受</ta-button>
                </div>
              </ta-col>
            </ta-form>
          </div>
        </div>
        <div style="height: 50px;margin-top:60px">
          <div style="float:right;">
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       v-if="isshow"
                       icon="upload"
                       @click="showModal">导出</ta-button>
            <ta-button v-if="isgoback"
                       @click="goback">返回</ta-button>
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
                    :locale="{emptyText: emptyText}"
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
            <span slot="name"
                  slot-scope="a, b, c">
              <a @click="childDetail(b)">{{a}}</a>
            </span>
            <span slot="isRegistered"
                  slot-scope="a, b, c">
              <span v-if="a == '1'">登记在册</span>
              <span v-if="a == '2'">已减员</span>
            </span>
          </ta-table>
          <div style="font-size:14px;margin: 15px;">
            <p>1.登记在册是指对应查询条件为：“人员状态”显示为 登记在册，“是否享受福利” 显示为 全部 。</p>
            <p>
              2.本月享受是指对应查询条件为：“人员状态”显示 全部 ，“是否享受福利” 显示为 是 ，“年月”显示为 当前月份 ，“享受状态”显示 正常发放、超龄续发 。</p>
            <p>
              3.本月不享受是指对应查询条件为：“人员状态”显示 登记在册 ，“是否享受福利” 显示为 否 ，“年月”显示为 当前月份 。</p>
          </div>
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
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      valueT: '',
      isType: '',
      spinning: null,
      isshow1: window.parent.indexTool.getUserInfo().orgType == '99',
      isshow: true,
      emptyText: '',
      value1: {},
      isgoback: false,
      value: [],
      forceRenderBool: true,
      mode2: ['month', 'month'],
      tableData: [],
      mixDataList: [],
      addressmodel: [],
      mixColumns: [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: 80,
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '姓名',
          width: '12%',
          dataIndex: 'name',
          overflowTooltip: true,
          scopedSlots: { customRender: 'name' }
        },
        // {
        //   title: '儿童编号',
        //   width: '12%',
        //   dataIndex: 'childNumber'
        // },
        // {
        //   title: '身份证号',
        //   width: '12%',
        //   dataIndex: 'idCard',
        //   overflowTooltip: true
        // },
        {
          title: '性别',
          width: '8%',
          align: 'center',
          dataIndex: 'sex',
          collectionType: 'SEX',
          overflowTooltip: true
        },
        // {
        //   title: '民族',
        //   width: '10%',
        //   align: 'center',
        //   collectionType: 'NATION',
        //   dataIndex: 'childNation'
        // },
        {
          title: '出生日期',
          width: '10%',
          dataIndex: 'birthday',
          overflowTooltip: true
        },
        {
          title: '儿童类别',
          width: '12%',
          dataIndex: 'childType',
          collectionType: 'CHILDCATEGORYA',
          overflowTooltip: true
        },
        {
          title: '养育类型',
          width: '12%',
          dataIndex: 'bringUpType',
          collectionType: 'REARINGTYPE',
          overflowTooltip: true
        },
        {
          title: '登记(入院)日期',
          width: '12%',
          align: 'center',
          dataIndex: 'registerDate',
          overflowTooltip: true
        },
        {
          title: '起领年月',
          width: '10%',
          align: 'center',
          dataIndex: 'startTime',
          overflowTooltip: true
        },
        {
          title: '末领年月',
          width: '10%',
          align: 'center',
          dataIndex: 'endTime',
          overflowTooltip: true
        },
        {
          title: '人员状态',
          width: '10%',
          align: 'center',
          dataIndex: 'isRegistered',
          scopedSlots: { customRender: 'isRegistered' }
        },
        {
          title: '减员日期',
          width: '10%',
          dataIndex: 'registerLeaveDate'
        }
        // {
        //   title: '减员原因',
        //   width: '10%',
        //   dataIndex: 'isRegistered',
        //   scopedSlots: { customRender: 'isRegistered' }
        // }
      ],
      areaId: '',
      areaCode: '',
      mixListOptions: {
        mixGetDataListURL: 'orphanLivingExpenses/queryOrphanDisabledChildren',
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
      sexList: [], // 性别
      yesNoList: [],
      nationList: [], // 民族
      welfareOrgNameList: [], // 福利机构列表
      censusregisterList: [], // 户籍性质
      houseHoldList: [], // 户口分类
      schoolingList: [], // 文化程度
      employmentlist: [], // 就业状况
      paymentList: [], // 领取方式
      rearingTypeList: [], // 养育类型字典数据
      helpMeasurelist: [], // 保障情况字典数据
      healthList: [], // 健康状况字典数据
      worktudyList: [], // 工学情况字典类型
      childTypeList: [], // 儿童类型字典数据
      adisConditionList: [], // 患艾滋病情况字典数据
      illnessTypeList: [], // 患病类型字典数据
      disabiliyTypeList: [], // 残疾类型等字典数据
      disabledLevelList: [], // 残疾等级字典数据
      disabilityTypeValues: [], // 残疾类别选择的数据
      presentsituationlist: [], // 父母现状况
      issearch: false,
      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      choesP: [],
      disabled: true,
      radiovalueAdis: '1',
      disabledType1: true,
      disabledType2: true,
      disabledEnjoy: true,
      obj: {},
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel,
      healthval: '', // 健康状况选择的数据

      // 从工作台跳转过来时携带的参数配置
      WorkJumpConfigArr: [
        { type: '7', childTypeArr: ['3'] },
        { type: '4', childTypeArr: ['1'] },
        { type: '10', childTypeArr: ['3', '1'] },
      ],
    }
  },
  mounted () {
    this.getDictionarieMore()
    this.healthval = ''
    this.valueT = ''
    this.emptyText = '请根据检索条件查询详细列表信息'
    this.disabledType1 = true
    this.disabledType2 = true
    this.setHeight('one', 'oneout', !this.issearch)
    this.$refs.areaselect.selectlevel = ''
    this.searchForm.resetFields()
    this.searchForm.setFieldsValue({
      illnessTypelist: [],
      disabledTypeList: [],
      disabledLevelList: []
    })
    this.isshow = true
    this.isType = ''
    this.isgoback = false
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    if (this.areaId != '1000000000000000000') {
      this.addressmodel = [this.areaId]
    } else {
      this.addressmodel = []
    }
    this.$nextTick(() => {
      this.searchslist()
    })
  },
  activated () {
    if (this.$route.query.areaCode) {
      this.isshow = false
      this.isgoback = true
      this.page = 1
      this.areaId = this.$route.query.areaCode
      const params = this.$route.query.params
      if (params.startDate) {
        params.startDate = moment(params.startDate, 'YYYY-MM')
      }
      if (params.isEnjoySubsidies) {
        if (params.isEnjoySubsidies == '1') {
          this.disabledType1 = false
          this.disabledType2 = false
        } else {
          if (params.isEnjoySubsidies == '0') {
            this.disabledType1 = true
            this.disabledType2 = false
          } else {
            this.disabledType1 = true
            this.disabledType2 = true
          }
        }
      }
      if (params.issueType) {
        params.issueType = params.issueType.split(',')
      }

      // this.searchForm.setFieldsValue({ childType: this.$route.query.registType })
      this.searchForm.setFieldsValue({ childTypeList: [this.$route.query.registType] })
      this.searchForm.setFieldsValue(params)
      if (this.$route.query.areaArray.trim()) {
        let areaArray = this.$route.query.areaArray.split('/').slice(1)
        areaArray = areaArray.map(item => {
          return item.trim()
        })
        this.addressmodel = areaArray
      } else {
        let areaArray = this.$route.query.welfareList.split('/').slice(1)
        areaArray = areaArray.map(item => {
          return item.trim()
        })
        areaArray.pop()
        this.addressmodel = areaArray
        this.searchForm.setFieldsValue({ welfareOrgId: this.$route.query.areaCode })
      }
      if (this.areaLevel == '3' || this.areaLevel == '4') {
        this.addressmodel = [this.addressmodel[this.addressmodel.length - 1]]
      }
      if (this.areaLevel == '2') {
        this.addressmodel.shift()
      }
      this.setaddress()
      // this.getWelfareOrgNameList()
      this.$nextTick(() => {
        if (!this.$route.query.areaArray.trim()) {
          this.searchForm.setFieldsValue({ welfareOrgId: this.$route.query.areaCode })
          this.searchslist()
        }
      })
    }
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
      }
      this.setaddress()
      // this.getWelfareOrgNameList()
      if (this.$route.query.formDataSearch.healthStatus) {
        this.healthval = this.$route.query.formDataSearch.healthStatus
      }
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
      })
    }
    this.obj = {}
    const url = window.location.href
    var params = url.split('?')[1].split('&')
    params.map((item) => { this.obj[item.split('=')[0]] = item.split('=')[1] })
    if (this.obj.satate) {
      let obj = this.WorkJumpConfigArr.find(el => el.type == this.obj.type)
      this.searchForm.setFieldsValue({
        childTypeList: obj?.childTypeArr || []
      })
      if (this.obj.satate == '1') {
        this.isType = '1'
      }
      if (this.obj.satate == '2') {
        this.isType = '2'
        this.disabledType1 = false
        this.searchForm.setFieldsValue({
          isRegistered: '',
          isEnjoySubsidies: '1',
          startDate: moment(),
          issueType: ['0', '1']
        })
      }
      if (this.obj.satate == '4') {
        this.disabledType1 = false
        this.searchForm.setFieldsValue({
          isRegistered: '1',
          isEnjoySubsidies: '1',
          startDate: moment(),
          issueType: ['0', '1']
        })
      }
      if (this.obj.satate == '5') {
        this.disabledType1 = false
        this.searchForm.setFieldsValue({
          isRegistered: '2',
          isEnjoySubsidies: '1',
          startDate: moment(),
          issueType: ['0', '1']
        })
      }
      if (this.obj.satate == '3') {
        this.isType = '3'
        this.disabledType2 = false
        this.searchForm.setFieldsValue({
          isRegistered: '1',
          isEnjoySubsidies: '0',
          issueType: [],
          startDate: moment()
        })
      }
    }
  },
  methods: {
    async getDictionarieMore () {
      this.yesNoList = await this.getDictionaries('YESNO')
      this.paymentList = await this.getDictionaries('PAYMENT') // 领取方式
      this.rearingTypeList = await this.getDictionaries('REARINGTYPE') // 养育类型
      this.worktudyList = await this.getDictionaries('WORKSTUDY') // 工学情况
      this.childTypeList = await this.getDictionaries('CHILDCATEGORYA') // 儿童类型
      this.adisConditionList = await this.getDictionaries('ADISCONDITION') // 患艾滋病情况下拉框数据
      this.employmentlist = await this.getDictionaries('EMPLOYMENTSITUATION') // 就业情况
      this.presentsituationlist = await this.getDictionaries('PRESENTSITUATION') // 现状况
      this.sexList = await this.getDictionaries('SEX') // 性别
      this.nationList = await this.getDictionaries('NATION') // 民族
      this.censusregisterList = await this.getDictionaries('CENSUSREGISTER') // 户籍性质
      this.houseHoldList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY') // 户口分类
      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION') // 文化程度
      this.helpMeasurelist = await this.getDictionaries('OTHERSALVATIONOFUNATTENDED') // 保障情况字典
      this.healthList = await this.getDictionaries('HEALTHONE') // 获取健康状况字典数据
      this.illnessTypeList = await this.getDictionaries('ILLNESSTYPE') // 获取患病类型字典数据
      this.disabiliyTypeList = await this.getDictionaries('DISABILITYTYPE') // 获取残疾类别字典数据
      this.disabledLevelList = await this.getDictionaries('DISABILITYLEVEL') // 获取残疾等级字典数据
    },
    setaddress () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    // 健康状况的change事件
    onChange (e) {
      this.searchForm.setFieldsValue({
        illnessTypelist: [],
        disabledTypeList: [],
        disabledLevelList: []
      })
      this.healthval = e.target.value
    },
    mechanismchange (value) {
      this.valueT = value
    },
    async handleSearch (value) {
      const res = await this.post('/welfareOrgManagement/queryWelfareOrgsByCurrentUserAreaId', { welfareOrgName: value })
      this.welfareOrgNameList = res.data.data
    },
    // 健康状况点击事件
    goHandle (e, id, searchForm, b) {
      this.deuRadios(e, id, searchForm, b, this)
    },
    // 重置null
    nullThen (a, b, c, d) {
      if (d) { // 取消操作
        this.searchForm.setFieldsValue({
          illnessTypelist: [],
          disabledTypeList: [],
          disabledLevelList: []
        })
        this.healthval = ''
      }
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
      this.$nextTick(() => {
      })
    },
    searchslist () {
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch)
      this.spinning = true
      this.handleSubmit('search')
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    Register () {
      this.isType = '1'
      this.disabledType1 = true
      this.disabledType2 = true
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({
        isEnjoySubsidies: '',
        illnessTypelist: [],
        disabledTypeList: [],
        disabledLevelList: []
      })
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      }
      if (this.obj.type) {
        let obj = this.WorkJumpConfigArr.find(el => el.type == this.obj.type)
        this.searchForm.setFieldsValue({
          childTypeList: obj?.childTypeArr || []
        })
      }
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    RegisterEnjoy () {
      this.isType = '2'
      if (this.obj.type) {
        let obj = this.WorkJumpConfigArr.find(el => el.type == this.obj.type)
        this.searchForm.setFieldsValue({
          childTypeList: obj?.childTypeArr || []
        })
      }
      this.disabledType1 = false
      this.disabledType2 = true
      this.searchForm.setFieldsValue({
        isRegistered: '',
        isEnjoySubsidies: '1',
        startDate: moment(),
        issueType: ['0', '1']
      })
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    RegisterNotEnjoy () {
      this.isType = '3'
      if (this.obj.type) {
        let obj = this.WorkJumpConfigArr.find(el => el.type == this.obj.type)
        this.searchForm.setFieldsValue({
          childTypeList: obj?.childTypeArr || []
        })
      }
      this.disabledType1 = true
      this.disabledType2 = false
      this.searchForm.setFieldsValue({
        isRegistered: '1',
        isEnjoySubsidies: '0',
        issueType: [],
        startDate: moment()
      })
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (formData.isRegistered == '全部') {
        formData.isRegistered = ''
      }

      this.changetime(formData)
      if (formData.yearsStart) {
        formData.yearsStart = moment(formData.yearsStart).format('YYYY-MM')
      }
      if (formData.birthdayStart) {
        formData.birthdayStart = moment(formData.birthdayStart).format('YYYY-MM-DD')
      }
      if (formData.birthdayEnd) {
        formData.birthdayEnd = moment(formData.birthdayEnd).format('YYYY-MM-DD')
      }
      if (formData.applyDateStart) {
        formData.applyDateStart = moment(formData.applyDateStart).format('YYYY-MM-DD')
      }
      if (formData.applyDateEnd) {
        formData.applyDateEnd = moment(formData.applyDateEnd).format('YYYY-MM-DD')
      }
      if (formData.startDate) {
        formData.startDate = moment(formData.startDate).format('YYYY-MM')
      }
      if (formData.registerLeaveDateStart) {
        formData.registerLeaveDateStart = moment(formData.registerLeaveDateStart).format('YYYY-MM-DD')
      }
      if (formData.registerLeaveDateEnd) {
        formData.registerLeaveDateEnd = moment(formData.registerLeaveDateEnd).format('YYYY-MM-DD')
      }
      this.emptyText = '暂无数据'
      return formData
    },

    changeIsEnjoySubsidies (e) {
      if (e == '1') {
        this.disabledType1 = false
        this.disabledType2 = false
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ startDate: moment(new Date(), 'YYYY-MM') })
          this.searchForm.setFieldsValue({ issueType: ['0'] })
        })
      } else {
        if (e == '0') {
          this.disabledType1 = true
          this.disabledType2 = false
          this.$nextTick(() => {
            this.searchForm.setFieldsValue({ startDate: moment(new Date(), 'YYYY-MM') })
            this.searchForm.setFieldsValue({ issueType: null })
          })
        } else {
          this.disabledType1 = true
          this.disabledType2 = true
          this.$nextTick(() => {
            this.searchForm.setFieldsValue({ startDate: null })
            this.searchForm.setFieldsValue({ issueType: null })
          })
        }
      }
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '115px'
        }
        node.style.transition = 'all 1s'
      })
    },
    resetFrom () {
      this.isType = ''
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({
        isEnjoySubsidies: '',
        illnessTypelist: [],
        disabledTypeList: [],
        disabledLevelList: []
      })
      this.healthval = ''
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      }
      this.setaddress()
      this.value = []
      this.radiovalueAdis = '1'
      this.disabledType1 = true
      this.disabledType2 = true
      this.mode2 = ['month', 'month']
      const searchValue = this.searchForm.getFieldsValue()
      this.$nextTick(() => {
        this.searchslist()
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
      }
    },
    radiochangeAdis (val) {
      this.radiovalueAdis = val.target.value
    },
    // 获取福利机构数据
    getWelfareOrgNameList () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ welfareOrgId: undefined })
        const addressAttr = this.searchForm.getFieldsValue().address_Linkage
        if (addressAttr && addressAttr.length > 0) {
          this.post('welfareOrgManagement/queryWelfareOrgsByareaId', { areaId: addressAttr[addressAttr.length - 1] }).then((res) => {
            if (res.serviceSuccess) {
              this.welfareOrgNameList = res.data.data || []
            }
          })
          this.disabled = false
        } else {
          this.welfareOrgNameList = []
          this.disabled = true
        }
      })
    },
    adsvalchange () {
      // this.getWelfareOrgNameList()
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    Excel () {
      var data = this.userPageParams()
      if (!data.areaId) {
        data.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (this.$refs.areaselect.selectlevel) {
        data.areaLevel = this.$refs.areaselect.selectlevel
      } else {
        data.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      }
      data.orgId = window.parent.indexTool.getUserInfo().orgId
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      const url = '/orphanLivingExpenses/queryOrphanDisabledChildren'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
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
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    goback () {
      this.$router.go(-1)
      this.isgoback = false
    },
    childDetail (e) {
      const _self = this
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: e.childEnterId }),
          operateFlag: 'look_now'
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
.searchdata {
  height: 100%;
}
.spilwid1,
.spilwid4,
.alonerow1,
.alonerow2,
.alonerow3 {
  width: 100%;
}
.alonerow1 {
  width: 100%;
}
.spilwid2 {
  width: 410px;
}
.__form-spec-line__ {
  display: flex;
}
.spilwid3 {
  width: 280px;
}
.formBtn {
  margin-bottom: 20px;
  margin-left: 32px;
}
</style>
