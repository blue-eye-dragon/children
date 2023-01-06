<template>
  <div class="conts">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="发放设置"
                   key="1"
                   v-if="nowkey == '1'">
        <div ref="oneout"
             class="mars">
          <Title id="anchorpoint_a"
                 title="助学资金发放标准"
                 :show.sync="showone"></Title>
          <ta-form layout="horizontal"
                   ref="one"
                   :autoFormCreate="(lifeFrom)=>{this.lifeFrom = lifeFrom}">
            <ta-row class="fromcom">
              <ta-col :span="8">
                <ta-form-item label="发放年份"
                              fieldDecoratorId="issuingYear"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}"
                              :fieldDecoratorOptions="rules.issuingYear">
                  <ta-year-picker placeholder="请选择发放年份"
                                  style="width:100%"
                                  @change="timeChange" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="发放周期"
                              fieldDecoratorId="issuingType"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-select placeholder="请选择发放标准"
                             :disabled="true">
                    <ta-select-option v-for="(item,index) in issuingCycleList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="发放时间"
                              v-show="type == '2'"
                              fieldDecoratorId="issuingYears1"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <input placeholder="请选择发放时间"
                         :disabled="true"
                         style="width:100%" />
                </ta-form-item>
                <ta-form-item label="发放时间"
                              v-if="type == '1'"
                              fieldDecoratorId="issuingYears"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="rules.issuingYears">
                  <ta-select placeholder="请选择发放时间">
                    <ta-select-option :value="'1季度'">第一季度</ta-select-option>
                    <ta-select-option :value="'2季度'">第二季度</ta-select-option>
                    <ta-select-option :value="'3季度'">第三季度</ta-select-option>
                    <ta-select-option :value="'4季度'">第四季度</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="发放时间"
                              v-if="type == '0'"
                              fieldDecoratorId="issuingYears"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="rules.issuingYears">
                  <ta-select placeholder="请选择发放时间">
                    <ta-select-option :value="'01'">一月</ta-select-option>
                    <ta-select-option :value="'02'">二月</ta-select-option>
                    <ta-select-option :value="'03'">三月</ta-select-option>
                    <ta-select-option :value="'04'">四月</ta-select-option>
                    <ta-select-option :value="'05'">五月</ta-select-option>
                    <ta-select-option :value="'06'">六月</ta-select-option>
                    <ta-select-option :value="'07'">七月</ta-select-option>
                    <ta-select-option :value="'08'">八月</ta-select-option>
                    <ta-select-option :value="'09'">九月</ta-select-option>
                    <ta-select-option :value="'10'">十月</ta-select-option>
                    <ta-select-option :value="'11'">十一月</ta-select-option>
                    <ta-select-option :value="'12'">十二月</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      style="position: absolute;top: 65px">
                <ta-form-item label="发放金额"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}"
                              fieldDecoratorId="unsupportedChildren"
                              :fieldDecoratorOptions="disabled?this.verificationRulesNotMustFill('发放金额', true):this.verificationRules('发放金额', true)">
                  <ta-input-number :min="1"
                                   :max="999999"
                                   placeholder="请输入本次发放金额（元）"
                                   :precision="2"
                                   :disabled="disabled"
                                   style="width:100%" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>

        <div ref="twoout"
             class="mars">
          <Title id="anchorpoint_b"
                 title="发放儿童"
                 :show.sync="showtwo"></Title>
          <ta-form layout="horizontal"
                   ref="two">
            <Setliving types="1"
                       @searchall="searchall"
                       @deleteall="deleteall"
                       :childList.sync="grantList"></Setliving>
          </ta-form>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="补发设置"
                   key="2"
                   v-if="nowkey == '2'">
        <div ref="threeout"
             class="mars">
          <Title id="anchorpoint_a"
                 title="补发放助学资金标准"
                 :show.sync="showthree"></Title>
          <ta-form layout="horizontal"
                   ref="three"
                   :autoFormCreate="(lifeaddFrom)=>{this.lifeaddFrom = lifeaddFrom}">
            <ta-row class="fromcom">
              <ta-col :span="8">
                <ta-form-item label="补发年份"
                              fieldDecoratorId="issuingYear"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}"
                              :fieldDecoratorOptions="rules.issuingYear1">
                  <ta-year-picker placeholder="请选择补发年份"
                                  style="width:100%"
                                  @change="timeChange" />
                </ta-form-item>
                <ta-form-item label="补发放金额"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="unsupportedChildren"
                              :fieldDecoratorOptions="rules.unsupportedChildren2">
                  <ta-input-number :min="1"
                                   :max="999999"
                                   placeholder="请输入本次发放金额（元）"
                                   :precision="2"
                                   style="width:100%" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="补发周期"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}"
                              fieldDecoratorId="issuingType">
                  <ta-select placeholder="请选择补发周期"
                             :disabled="true">
                    <ta-select-option v-for="(item,index) in issuingCycleList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="备注"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="remark"
                              :fieldDecoratorOptions="rules.remark">
                  <ta-input placeholder="请输入备注"
                            style="width:100%" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="补发时间"
                              v-if="type1 == '2'"
                              fieldDecoratorId="replacementYears1"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <input placeholder="请选择补发时间"
                         :disabled="true"
                         style="width:100%" />
                </ta-form-item>
                <ta-form-item label="补发时间"
                              v-if="type1 == '1'"
                              fieldDecoratorId="replacementYears"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="rules.issuingYears1">
                  <ta-select placeholder="请选择补发时间">
                    <ta-select-option :value="'1季度'">第一季度</ta-select-option>
                    <ta-select-option :value="'2季度'">第二季度</ta-select-option>
                    <ta-select-option :value="'3季度'">第三季度</ta-select-option>
                    <ta-select-option :value="'4季度'">第四季度</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="补发时间"
                              v-if="type1 == '0'"
                              fieldDecoratorId="replacementYears"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="rules.issuingYears1">
                  <ta-select placeholder="请选择补发时间">
                    <ta-select-option :value="'01'">一月</ta-select-option>
                    <ta-select-option :value="'02'">二月</ta-select-option>
                    <ta-select-option :value="'03'">三月</ta-select-option>
                    <ta-select-option :value="'04'">四月</ta-select-option>
                    <ta-select-option :value="'05'">五月</ta-select-option>
                    <ta-select-option :value="'06'">六月</ta-select-option>
                    <ta-select-option :value="'07'">七月</ta-select-option>
                    <ta-select-option :value="'08'">八月</ta-select-option>
                    <ta-select-option :value="'09'">九月</ta-select-option>
                    <ta-select-option :value="'10'">十月</ta-select-option>
                    <ta-select-option :value="'11'">十一月</ta-select-option>
                    <ta-select-option :value="'12'">十二月</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>

            </ta-row>
          </ta-form>
        </div>

        <div ref="fourout"
             class="mars">
          <Title id="anchorpoint_b"
                 title="补发放儿童"
                 :show.sync="showfour"></Title>
          <ta-form layout="horizontal"
                   ref="four">
            <Setliving types="2"
                       @searchall="searchall"
                       @deleteall="deleteall"
                       :childList.sync="replacementList"></Setliving>
          </ta-form>
        </div>
      </ta-tab-pane>

    </ta-tabs>
    <div class="bom">
      <ta-button @click="back"
                 class="preservation">返回</ta-button>
      <ta-button type="primary"
                 @click="submit">确定</ta-button>
    </div>
    <ta-modal title
              v-model="childresshow"
              width="90%"
              @ok="handleOk"
              @cancel="handleCancel">
      <div class="modelcont">
        <ta-table bordered
                  class="tables"
                  :columns="nowkey == '1'?tableColumnsshow:tableColumnsshow2"
                  :dataSource="showlist"
                  :scroll="{x: 2300}">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="costOfLiving"
                slot-scope="a, b, c">
            <input type="text"
                   :value="a"
                   @change="chCostOfLiving($event,b,'costOfLiving')">
          </span>
          <span slot="replacementAmount"
                slot-scope="a, b, c">
            <input type="text"
                   :value="a"
                   @change="chCostOfLiving($event,b,'replacementAmount')">
          </span>
        </ta-table>
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       @change="pagechange"
                       :total="total" />
      </div>
    </ta-modal>
    <ta-modal title="选择儿童"
              v-model="visible"
              width="90%"
              :footer="null">
      <ChoiceChildren :tableColumns="tableColumns"
                      v-if="visible"
                      :ishide1="true"
                      :isType="'funds'"
                      @addsure="addsure"
                      url="/welfarePlan/orphanAssistanceList"
                      :searchdata="searchdata"></ChoiceChildren>
    </ta-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Title from '@component/common/components/Title'
import ChoiceChildren from '@component/common/components/ChoiceChildren'
// import listMixin from '@component/common/js/mixins/listMixin';
import Setliving from '../../fundsToIssue/components/setliving'
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
    dataIndex: 'childNumber'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard'
  },
  {
    title: '上报日期',
    dataIndex: 'reportTime'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
const tableColumnsshow = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: 80,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '地区',
    align: 'center',
    width: 150,
    dataIndex: 'areaName'
  },
  {
    title: '儿童姓名',
    align: 'center',
    width: 150,
    dataIndex: 'name'
  },
  {
    title: '身份证号',
    align: 'center',
    width: 150,
    dataIndex: 'idCard',
    overflowTooltip: true
  },
  {
    title: '起领年月',
    align: 'center',
    width: 150,
    dataIndex: 'startReceiveDate'
  },
  {
    title: '末领年月',
    align: 'center',
    width: 150,
    dataIndex: 'endReceiveDate'
  },
  {
    title: '发放时间',
    align: 'center',
    width: 150,
    dataIndex: 'issuingYears'
  },
  {
    title: '本次发放金额（元）',
    align: 'center',
    width: 200,
    dataIndex: 'costOfLiving',
    scopedSlots: { customRender: 'costOfLiving' }
  },
  // {
  //   title: '补发放年月',
  //   align: 'center',
  //   width: 150,
  //   dataIndex: 'replacementYears'
  // },
  // {
  //   title: '补发放金额（元）',
  //   align: 'center',
  //   width: 200,
  //   dataIndex: 'replacementAmount',
  //   scopedSlots: { customRender: 'replacementAmount' }
  // },
  {
    title: '领取方式',
    align: 'center',
    width: 150,
    dataIndex: 'receiveType',
    collectionType: 'PAYMENT'
  },
  {
    title: '领取人',
    align: 'center',
    width: 150,
    dataIndex: 'receivePerson',
    overflowTooltip: true
  },
  {
    title: '银行账号',
    align: 'center',
    width: 150,
    dataIndex: 'bankAccount',
    overflowTooltip: true
  },
  {
    title: '开户人',
    align: 'center',
    width: 150,
    dataIndex: 'accountPerson',
    overflowTooltip: true
  },
  {
    title: '开户银行',
    align: 'center',
    width: 150,
    dataIndex: 'bank',
    overflowTooltip: true
  }
]
const tableColumnsshow2 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: 80,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '地区',
    align: 'center',
    width: 150,
    dataIndex: 'areaName'
  },
  {
    title: '儿童姓名',
    align: 'center',
    width: 150,
    dataIndex: 'name'
  },
  {
    title: '身份证号',
    align: 'center',
    width: 150,
    dataIndex: 'idCard',
    overflowTooltip: true
  },
  {
    title: '起领年月',
    align: 'center',
    width: 150,
    dataIndex: 'startReceiveDate'
  },
  {
    title: '末领年月',
    align: 'center',
    width: 150,
    dataIndex: 'endReceiveDate'
  },
  // {
  //   title: '发放年月',
  //   align: 'center',
  //   width: 150,
  //   dataIndex: 'issuingYears'
  // },
  // {
  //   title: '本次发放金额（元）',
  //   align: 'center',
  //   width: 200,
  //   dataIndex: 'costOfLiving',
  //   scopedSlots: { customRender: 'costOfLiving' }
  // },
  {
    title: '补发时间',
    align: 'center',
    width: 150,
    dataIndex: 'replacementYears'
  },
  {
    title: '补发放金额（元）',
    align: 'center',
    width: 200,
    dataIndex: 'replacementAmount',
    scopedSlots: { customRender: 'replacementAmount' }
  },
  {
    title: '领取方式',
    align: 'center',
    width: 150,
    dataIndex: 'receiveType',
    collectionType: 'PAYMENT'
  },
  {
    title: '领取人',
    align: 'center',
    width: 150,
    dataIndex: 'receivePerson',
    overflowTooltip: true
  },
  {
    title: '银行账号',
    align: 'center',
    width: 150,
    dataIndex: 'bankAccount',
    overflowTooltip: true
  },
  {
    title: '开户人',
    align: 'center',
    width: 150,
    dataIndex: 'accountPerson',
    overflowTooltip: true
  },
  {
    title: '开户银行',
    align: 'center',
    width: 150,
    dataIndex: 'bank',
    overflowTooltip: true
  }
]
export default {
  name: 'register',
  components: {
    Title,
    Setliving,
    ChoiceChildren
  },
  data () {
    return {
      disabled: true,
      isshoow: true,
      isshoow1: true,
      type: '2',
      type1: '2',
      tableColumns,
      tableColumnsshow,
      tableColumnsshow2,
      tableDatashow: [],
      issuingCycleList: [],
      page: 1,
      size: 10,
      showone: true,
      yesOrNo: [],
      showtwo: true,
      showfour: true,
      showthree: true,
      nowkey: '1',
      visible: false,
      suingcycleList: [],
      grantList: [],
      replacementList: [],
      repeatdata: [],
      childresshow: false,
      showdata: [],
      searchdata: {},
      rules: {
        issuingType: this.verificationRules('发放周期', true),
        issuingType1: this.verificationRules('补发周期', true),
        issuingYear: this.verificationRules('发放年份', true),
        issuingYears: this.verificationRules('发放时间', true),
        issuingYear1: this.verificationRules('补发年份', true),
        issuingYears1: this.verificationRules('补发时间', true),
        replacementYears: this.verificationRules('补发周期', true),
        unsupportedChildren1: this.verificationRules('发放金额', true),
        unsupportedChildren2: this.verificationRules('补发金额', true),
        remark: this.verificationRulesNotMustFill('备注', true)
      },
      params: {},
      getSearchFormData: {},
      cycleIndex: ''
    }
  },
  created () { },
  activated () {
    this.loadData()
    this.nowkey = this.$route.query.nowkey
    this.$nextTick(() => {
      if (this.nowkey == '1') {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.lifeFrom.resetFields()
      } else {
        this.setHeight('three', 'threeout')
        this.setHeight('four', 'fourout')
        this.lifeaddFrom.resetFields()
      }
    })
  },
  mounted () {
    this.getyesOrNo()
    this.getissuingCycle()
    window.onresize = () => {
    }
  },
  computed: {
    // 总条数字段
    total () {
      return this.showdata.length
    },
    // 渲染列表数据
    showlist () {
      return this.showdata.filter((item, index) => {
        return (
          (this.page - 1) * this.size <= index &&
          (this.page - 1) * 10 + this.size > index
        )
      })
    }
  },
  methods: {
    loadData () {
      this.disabled = true
      this.isshoow = true
      this.isshoow1 = true
      this.isshoow2 = true
      this.type = '2'
      this.type1 = '2'
      this.nowkey = '1'
      this.grantList = []
      this.replacementList = []
      this.repeatdata = []
      this.showdata = []
    },
    // 表格编辑
    changecostOfLiving ({ newData, record, columnKey }) {
      record[columnKey] = newData
      record.costOfLivingTotal = (parseFloat(record.costOfLiving) + parseFloat(record.replacementAmount)).toFixed(2)
    },
    chCostOfLiving (val, record, columnKey) {
      const newData = val.target.value
      this.changecostOfLiving({ newData, record, columnKey })
    },
    timeChange (date, dateString) {
      this.nowkey == '1' ? this.grantList = [] : this.replacementList = []
      this.loadMoney(dateString)
    },
    times (val) {
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    async getissuingCycle () {
      const data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingCycleList = data
    },
    // tab切换事件
    callback (e) {
      this.nowkey = e
      this.isshoow2 = true
      if (e == '1') {
        this.replacementList = []
        this.disabled = true
        this.isshoow1 = true
        this.type = '2'
        this.lifeaddFrom.resetFields()
      } else {
        this.grantList = []
        this.isshoow = true
        this.type1 = '2'
        this.lifeFrom.resetFields()
      }
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('three', 'threeout')
        this.setHeight('four', 'fourout')
      })
    },
    // 判断是否可以查询
    iscanquery (val) {
      let nowkey = '0'
      let isok = true
      this[val == '1' ? 'lifeFrom' : 'lifeaddFrom'].validateFields((err) => {
        if (err) {
          isok = false
          nowkey = val
        }
      })

      if (nowkey != '0') {
        this.nowkey = nowkey
        this.$message.error(
          nowkey == '1'
            ? '请输入生活费补贴发放标准必填项'
            : '请输入补发放生活费标准必填项'
        )
      }
      return isok
    },
    // 清除所有已选儿童
    deleteall () {
      this.nowkey == 1 ? this.grantList = [] : this.replacementList = []
    },
    // 查找全部 回调
    searchall (val) {
      if (!this.iscanquery(val)) {
        return false
      }
      this.searchdata.childType = 205 // 1.事实无人抚养、2.孤儿、3.助学
      if (this.nowkey == 1) {
        this.searchdata.isFaOrBuFa = 0 // 正常发放
        this.searchdata.issuingCycle = this.dataProcessing().issuingCycle
        this.searchdata.issuingYears = this.dataProcessing().issuingYears
      }
      if (this.nowkey == 2) {
        this.searchdata.isFaOrBuFa = 1 // 补发
        this.searchdata.issuingCycle = this.dataProcessing().issuingCycle
        this.searchdata.issuingYears = this.dataProcessing().replacementYears
      }
      this.searchdata.name = ''
      this.nowkey = val
      this.visible = true
    },
    // 添加
    addsure (val, type) { // type有值时表示全部添加
      const isrepeat = this.duplicateremoval(val, this.nowkey == 1 ? this.grantList : this.replacementList)
      if (!type && isrepeat) { // 非全部添加时进行验重
        this.$message.error(`${this.repeatdata.name}已添加`)
        return false
      }
      this.visible = !type
      this.$message.success('添加成功')
      if (this.nowkey == 1) {
        this.grantList = type ? val : [...this.grantList, ...val]
        this.setHeight('two', 'twoout')
      } else {
        this.replacementList = type ? val : [...this.replacementList, ...val]
        this.setHeight('four', 'fourout')
      }
    },
    // 去重
    duplicateremoval (val, data) {
      let isrepeat = false
      val.map(item => {
        data.map(e => {
          if (e.childId == item.childId) {
            isrepeat = true
            this.repeatdata = item
            return false
          }
        })
      })
      return isrepeat
    },
    // 获取是否
    async getyesOrNo () {
      const data = await this.getDictionaries('YESNO')
      this.yesOrNo = data
    },
    //  获取补贴标准资金
    async loadMoney (time) {
      const _self = this
      if (_self.nowkey == '1') {
        _self.lifeFrom.setFieldsValue({ issuingType: null, unsupportedChildren: null, issuingYears: null, issuingYears1: null })
      } else {
        _self.lifeaddFrom.setFieldsValue({ issuingType: null, unsupportedChildren: null, replacementYears: null, replacementYears1: null })
      }
      _self.post('/WelfareConfig/queryByChildTypeAndOrgId', { childType: 205, issuingYear: time }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          if (data) {
            _self.type = data.issuingCycle
            _self.type1 = data.issuingCycle
            _self.disabled = false
            _self[_self.nowkey == '1' ? 'lifeFrom' : 'lifeaddFrom'].setFieldsValue({
              [_self.nowkey == '1' ? 'issuingYears1' : 'replacementYears1']: time,
              issuingType: data.issuingCycle,
              unsupportedChildren: data.costOfLiving
            })
          } else {
            _self.type = '2'
            _self.type1 = '2'
            _self.disabled = true
          }
        } else { // 失败后清空
          _self[_self.nowkey == '1' ? 'lifeFrom' : 'lifeaddFrom'].setFieldsValue({
            issuingYear: undefined
          })
        }
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 150 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    back () {
      this.$router.push({
        name: 'funds',
        unmennedRaiseYOrN: '1'
      })
    },
    // 数据处理
    dataProcessing () {
      var lifeFromData = {}
      var lifeaddFromData = {}
      if (this.nowkey == '1') {
        lifeFromData = this.lifeFrom.getFieldsValue()
      } else {
        lifeaddFromData = this.lifeaddFrom.getFieldsValue()
      }
      if (lifeFromData.issuingType) {
        switch (lifeFromData.issuingType) {
          case '0':
            lifeFromData.issuingYears = lifeFromData.issuingYears ? lifeFromData.issuingYear.format('YYYY') + '-' + lifeFromData.issuingYears : null
            break
          case '1':
            lifeFromData.issuingYears = lifeFromData.issuingYears ? lifeFromData.issuingYear.format('YYYY') + '-' + lifeFromData.issuingYears : null
            break
          case '2':
            lifeFromData.issuingYears = lifeFromData.issuingYears1 ? lifeFromData.issuingYear.format('YYYY') : null
            break
        }
      }
      if (lifeaddFromData.issuingType) {
        switch (lifeaddFromData.issuingType) {
          case '0':
            lifeaddFromData.replacementYears = lifeaddFromData.replacementYears ? lifeaddFromData.issuingYear.format('YYYY') + '-' + lifeaddFromData.replacementYears : null
            break
          case '1':
            lifeaddFromData.replacementYears = lifeaddFromData.replacementYears ? lifeaddFromData.issuingYear.format('YYYY') + '-' + lifeaddFromData.replacementYears : null
            break
          case '2':
            lifeaddFromData.replacementYears = lifeaddFromData.replacementYears1 ? lifeaddFromData.issuingYear.format('YYYY') : null
            break
        }
      }
      for (const k in lifeFromData) {
        if (!lifeFromData[k]) {
          lifeFromData[k] = 0
        }
      }
      for (const k in lifeaddFromData) {
        if (!lifeaddFromData[k]) {
          lifeaddFromData[k] = 0
        }
      }
      const str = JSON.stringify(this.grantList)
      let arr = []
      arr = JSON.parse(str)
      arr.map(item => {
        item.issuingYears = lifeFromData.issuingYears
        item.issuingYear = lifeFromData.issuingYear.format('YYYY')
        item.costOfLiving = lifeFromData.unsupportedChildren
      })
      const replacementstr = JSON.stringify(this.replacementList)
      const replacementarr = JSON.parse(replacementstr)
      replacementarr.map(item => {
        item.copymounth = item.months
        item.issuingYear = lifeaddFromData.issuingYear.format('YYYY')
        item.replacementAmount = lifeaddFromData.unsupportedChildren
        item.replacementYears = lifeaddFromData.replacementYears
      })
      if (replacementarr.length > 0) {
        replacementarr.map(val => {
          const e = arr.findIndex(item => {
            return item.childId == val.childId
          })
          if (e == '-1') {
            val.costOfLiving = 0
            arr.push(val)
          } else {
            const arritem = { ...val, ...arr[e] }
            arr.splice(e, 1, arritem)
          }
        })
      }
      arr.map(item => {
        if (!item.issuingYears) {
          item.replacementYears = lifeaddFromData.replacementYears
          item.remark = lifeaddFromData.remark
        }
        item.costOfLivingTotal = (parseFloat(item.costOfLiving || 0)) + (parseFloat(item.replacementAmount || 0))
      })
      let paramsFile = {}
      if (this.nowkey == '1') {
        paramsFile = {
          welfareSlaveVoList: arr,
          issuingYear: lifeFromData.issuingYear.format('YYYY'),
          issuingCycle: lifeFromData.issuingType || '',
          issuingYears: lifeFromData.issuingYears,
          costOfLiving: lifeFromData.unsupportedChildren,
          childType: 205,
          grantingNumber: this.grantList.length,
          isBuFa: 0
        }
      }
      if (this.nowkey == '2') {
        paramsFile = {
          welfareSlaveVoList: arr,
          issuingYear: lifeaddFromData.issuingYear.format('YYYY'),
          issuingCycle: lifeaddFromData.issuingType || '',
          replacementYears: lifeaddFromData.replacementYears,
          replacementAmount: lifeaddFromData.unsupportedChildren,
          childType: 120,
          grantingNumber: this.replacementList.length,
          isBuFa: 1
        }
      }
      return paramsFile
    },
    async submit () {
      let isok = true
      let nowkey = '1'
      if (this.nowkey == '1') {
        this.lifeFrom.validateFields((err, values) => {
          if (err) {
            isok = false
            nowkey = '1'
          }
        })
      }
      if (this.nowkey == '2') {
        this.lifeaddFrom.validateFields((err, values) => {
          if (err) {
            isok = false
            nowkey = '2'
          }
        })
      }
      if (isok) {
        if (this.nowkey == '1' ? this.grantList.length > 0 : this.replacementList.length > 0) {
          this.childresshow = true
          this.params = this.dataProcessing()
          const showdata = this.params.welfareSlaveVoList
          this.showdata = showdata
        } else {
          this.$message.error(this.nowkey == '1' ? '请选择发放儿童' : '请选择补发放儿童')
        }
      } else {
        this.nowkey = nowkey
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    async handleOk () {
      const userData = window.parent.indexTool.getUserInfo()
      this.params.childType = 205
      this.params.areaId = userData.areaId
      this.params.orgId = userData.orgId
      this.params.welfareSlaveVoList.forEach(item => {
        item.id = null
        item.childBusinessId = item.childId
        item.childId = item.childBaseId
        item.childType = 205
        item.areaId = userData.areaId
      })
      const datares = await this.post('/WelfareMaster/saveWalfareInfo', this.params, true)
      if (datares.errors == null) {
        this.$message.success('提交成功')
        this.childresshow = false
        this.$router.push({
          name: 'funds'
        })
      }
    },
    handleCancel (e) {
      this.childresshow = false
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
  margin-top: 20px;
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
.item_text[data-v-f8064454] {
  width: 98px;
}
.modelcont {
  margin-bottom: 40px;
}
.tables {
  margin-top: 20px;
}
</style>
