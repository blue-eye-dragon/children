<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery class="spilwid"
                           :labelCol="{span:9}"
                           :wrapperCol="{span:15}"
                           types="1"
                           :ishide="true"
                           :addressmodel="addressmodel"
                           @setaddress="setaddress"
                           msg="区域"></AreaQuery>
                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="name"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{validator:nameValid}]}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>

                <ta-form-item label="儿童身份证号"
                              style="width:340px"
                              :labelCol="{span:10}"
                              fieldDecoratorId="idCard"
                              :wrapperCol="{span:14}"
                              :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{validator:idCardValid}]}">
                  <ta-input placeholder="请输入儿童身份证号" />
                </ta-form-item>
                <!-- <ta-form-item label="儿童类型"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择儿童类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item> -->
                <ta-form-item label="资金发放类型"
                              class="spilwid"
                              fieldDecoratorId="issueType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             :placeholder="'请选择资金发放类型'">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="发放方式"
                              style="width:200px"
                              fieldDecoratorId="isBufaFlag"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select allowClear
                             :placeholder="'请选择登记状态'">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option value="0">正常发放</ta-select-option>
                    <ta-select-option value="1">补发</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="发放周期"
                              style="width:220px"
                              fieldDecoratorId="issuingCycle"
                              :fieldDecoratorOptions="{initialValue: ''}"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-select placeholder="请选择发放周期"
                             @change="handleChange">
                    <ta-select-option value="">全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in issuingCycleList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="发放年份"
                              v-show="type == '2'"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              style="width:300px">
                  <ta-range-picker :placeholder="['开始年份', '结束年份']"
                                   format="YYYY"
                                   :mode="mode3"
                                   :value="value3"
                                   @panelChange="handlePanelChange3" />
                </ta-form-item>
                <ta-form-item label="发放季度"
                              v-show="type == '1'"
                              fieldDecoratorId="issueQuarter"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid">
                  <ta-quarter-picker placeholder="请选择发放季度"
                                     style="width:100%" />
                </ta-form-item>
                <ta-form-item label="发放年月"
                              v-show="type == '0'"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              style="width:300px">
                  <ta-range-picker :placeholder="['开始年月', '结束年月']"
                                   format="YYYY-MM"
                                   :mode="mode2"
                                   :value="value2"
                                   @panelChange="handlePanelChange2" />
                </ta-form-item>

              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="search('000')">查询</ta-button>
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
          </ta-form>
        </div>

        <!-- <div style="margin-bottom: 16px;"></div> -->
        <div style="height: 50px;"
             :hidden="ExShow">
          <div style="float:right;">
            <!-- <ta-button @click="returns"
                       slot="tabBarExtraContent"
                       icon="rollback"
                       v-if="returnName">返回</ta-button> -->
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
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
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="false"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :customRow="fnCustomRow">
            <span slot="num"
                  slot-scope="val, obj, index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>
            <span slot="areaName"
                  slot-scope="a">
              <span>{{a.indexOf('全国合计')==-1?a:a.substring(5,a.length)}}</span>
            </span>
            <span slot="issueType"
                  slot-scope="val">
              <span v-if="val == '201'">社会散居孤儿基本生活费</span>
              <span v-else-if="val == '202'">福利机构养育孤弃儿童基本生活费</span>
              <span v-else-if="val == '199'">福利机构代养困境儿童基本生活费</span>
              <span v-else-if="val == '203'">民间机构养育孤弃儿童基本生活费</span>
              <span v-else-if="val == '300'">艾滋病病毒感染儿童基本生活费</span>
              <span v-else-if="val == '121'">集中供养事实无人抚养儿童基本生活费</span>
              <span v-else-if="val == '120'">社会散居事实无人抚养儿童基本生活费</span>
              <span v-else-if="val == '205'">孤儿助学工程</span>
              <span v-else>其他儿童基本生活费</span>
            </span>
            <span slot="birthday"
                  slot-scope="text">{{ text != null ? text.substring(0, 10) : ''}}</span>
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
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ta-drawer title="详情"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>

        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber"
                      :labelCol="{ span: 6 }">
          <ta-input placeholder="请输入登记人"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 6 }">
          <ta-select placeholder="请选择性别"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }">
          <ta-input placeholder="请输入身份证号"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="发放方式"
                      fieldDecoratorId="isBuFa"
                      :labelCol="{ span: 6 }">
          <ta-select placeholder="请选择发放方式"
                     :disabled="idedit">
            <ta-select-option :value="'0'">正常发放</ta-select-option>
            <ta-select-option :value="'1'">补发</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="发放时间"
                      fieldDecoratorId="issuingYears"
                      :labelCol="{ span: 6 }">
          <ta-input style="width: 100%;"
                    :disabled="idedit"
                    placeholder="请选择发放时间" />
        </ta-form-item>
        <ta-form-item label="发放金额(元)"
                      fieldDecoratorId="costOfLiving"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="资金发放类型"
                      fieldDecoratorId="issueTypeText"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="领取方式"
                      fieldDecoratorId="receiveType"
                      :labelCol="{ span: 6 }">
          <ta-select placeholder="请选择领取方式"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in paymentList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="领取人"
                      fieldDecoratorId="receivePerson"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="银行账号"
                      fieldDecoratorId="bankAccount"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <!-- <ta-form-item label="发放日期"
                      fieldDecoratorId="issuingDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="idedit"
                          placeholder="请选择发放日期" />
        </ta-form-item> -->
        <ta-form-item label="备注"
                      :labelCol="{ span: 6 }"
                      fieldDecoratorId="remark">
          <ta-input placeholder="请输入备注"
                    :disabled="idedit"
                    style="width:100%" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
    <!-- <ta-modal title="作废"
              :visible="visible2"
              :closable="false">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="作废原因"
                      fieldDecoratorId="revokeReason"
                      :fieldDecoratorOptions="this.verificationRules('作废原因', 60,true)"
                      :labelCol="{ span: 5 }">
          <ta-textarea placeholder="请输入作废原因"
                       :disabled="reasondis"
                       :rows="4" />
        </ta-form-item>
      </ta-form>
      <template slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   v-if="!reasondis"
                   type="primary"
                   @click="onok">确定</ta-button>
      </template>
    </ta-modal> -->
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
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
    title: '区域',
    width: '25%',
    dataIndex: 'areaName',
    scopedSlots: { customRender: 'areaName' },
    overflowTooltip: true
  },
  {
    title: '儿童姓名',
    width: '15%',
    dataIndex: 'name',
    overflowTooltip: true,
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '儿童类型',
  //   width: '15%',
  //   dataIndex: 'childType',
  //   overflowTooltip: true,
  //   scopedSlots: { customRender: 'childType' }
  // },
  {
    title: '性别',
    width: '10%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '15%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '发放方式',
    dataIndex: 'isBuFaListShow',
    width: '13%',
    align: 'center',
    overflowTooltip: true
  },
  {
    title: '发放时间',
    dataIndex: 'issuingYears',
    width: '13%',
    align: 'center',
    overflowTooltip: true
  },
  {
    title: '资金发放类型',
    dataIndex: 'issueType',
    align: 'center',
    width: '15%',
    overflowTooltip: true,
    scopedSlots: { customRender: 'issueType' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  name: 'revoke',
  data () {
    return {
      spinning: null,
      idedit: true,
      addressmodel: [],
      paymentList: [],
      sexList: [],
      tableColumns,
      tableData: [],
      showOn: false,
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: 'WelfareMaster/queryFundsToIssue', // 数据列表接口，API地址
        mixActivatedIsNeed: true
      },
      mixPageRef: 'gridPager',
      visible: false,
      visible2: false,
      issuingCycleList: [],
      adoptionlist: [
        { label: '社会散居孤儿基本生活费', value: '201' },
        { label: '福利机构养育孤弃儿童基本生活费', value: '202' },
        { label: '福利机构代养困境儿童基本生活费', value: '199' },
        { label: '民间机构养育孤弃儿童基本生活费', value: '203' },
        { label: '艾滋病病毒感染儿童基本生活费', value: '300' },
        { label: '集中供养事实无人抚养儿童基本生活费', value: '121' },
        { label: '社会散居事实无人抚养儿童基本生活费', value: '120' },
        { label: '孤儿助学工程', value: '205' },
        { label: '其他儿童基本生活费', value: '999' }
      ],
      educationList: [],
      adoptionid: '',
      registrationAdoptionId: '',
      adoptorName: '',
      childId: '',
      officelist: [],
      nowdata: {},
      reasondis: false,
      issearch: false,
      ishide: true,
      radiovalue: '',
      printlist: [],
      ExShow: false,
      mode2: ['month', 'month'],
      mode3: ['year', 'year'],
      value2: [],
      value3: [],
      type: '',
      returnName: null // 返回按钮要返回的页面
    }
  },
  activated () {
    this.initData()
  },
  mounted () {
    this.geteducationList()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-10 10:08:55
     * @information: 姓名失焦时
     */
    nameValid (rule, value, callback) {
      this.searchForm.setFieldsValue({ name: value.trim() })
    },

    /**
     * @author: yinpengfei
     * @Date: 2021-06-10 10:09:40
     * @information: 身份证号失焦时
     */
    idCardValid (rule, value, callback) {
      this.searchForm.setFieldsValue({ idCard: value.trim() })
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    async getissuingCycle () {
      const data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingCycleList = data
    },
    // 领取方式 PAYMENT
    async getpayment () {
      const data = await this.getDictionaries('PAYMENT')
      this.paymentList = data
    },
    // 初始化数据
    initData () {
      this.ExShow = false
      this.type = ''
      this.issearch = false
      this.getsexList()
      this.getpayment()
      this.getissuingCycle()
      this.setHeight('one', 'oneout', !this.issearch, this)
      const userInfo = window.parent.indexTool.getUserInfo()
      this.ishide = userInfo.areaLevel == 1
      if (userInfo.areaId == '1000000000000000000') {
        this.addressmodel = []
      } else {
        this.addressmodel = [userInfo.areaId]
      }
      this.setaddress()
      this.search('000')
    },
    resetFrom (e) {
      this.page = 1
      this.size = 10
      this.type = ''
      this.mode2 = ['month', 'month']
      this.mode3 = ['year', 'year']
      this.value2 = []
      this.value3 = []
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.searchForm.resetFields()
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      }
      this.setaddress()
      this.tableData = []
      this.search('000')
    },
    Excel () {
      var data = this.userPageParams()
      if (!data.areaId) {
        data.areaId = '1000000000000000000'
      }
      const url = '/WelfareMasterApi/queryFundsToIssueExport'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    search (e) {
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch, this)
      this.spinning = true
      const formData = this.userPageParams()
      if (e == '000') {
        this.handleSubmit()
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }

      if (formData.issuingCycle == '2' && this.value3.length > 0) {
        formData.issueYearsStart = this.value3[0].format('YYYY')
        formData.issueYearsEnd = this.value3[1].format('YYYY')
      }
      if (formData.issuingCycle == '1' && formData.issueQuarter) {
        formData.issueQuarter = formData.issueQuarter.format('YYYY-Q季度')
      }
      if (formData.issuingCycle == '0' && this.value2.length > 0) {
        formData.issueYearsStart = this.value2[0].format('YYYY-MM')
        formData.issueYearsEnd = this.value2[1].format('YYYY-MM')
      }
      return formData
    },
    handleChange (e) {
      this.type = e
      this.value2 = []
      this.value3 = []
      this.searchForm.setFieldsValue({ issueQuarter: null })
    },
    handlePanelChange2 (value, mode) {
      this.value2 = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    handlePanelChange3 (value, mode) {
      this.value3 = value
      this.mode3 = ['year', 'year']
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    async geteducationList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    see (val, obj) {
      this.visible = true
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      data.birthday = moment(data.birthday)
      data.issuingDate = moment(data.issuingDate)
      // 处理 资金发放类型
      let issueTypeObj = this.adoptionlist.find(el => el.value == data.issueType)
      data.issueTypeText = issueTypeObj ? issueTypeObj.label : null
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.prienttitle {
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 24px;
}
.prientout {
  width: 100%;
  padding: 0 20px;
}
.prientout /deep/.ant-radio-wrapper {
  width: 50%;
  margin-right: 0;
  margin-bottom: 32px;
}
</style>
