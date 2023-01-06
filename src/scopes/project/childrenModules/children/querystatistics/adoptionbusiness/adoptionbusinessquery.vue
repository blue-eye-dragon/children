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
                           @adsvalchange="adsvalchange"
                           @setaddress="setaddress"
                           msg="区域"></AreaQuery>
                <ta-form-item label="办理机构"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="orgid"
                              :wrapperCol="{span:15}">
                  <!-- <ta-input placeholder="请选择组织机构" /> -->
                  <ta-select showSearch
                             allowClear
                             :disabled="disabled"
                             :placeholder="disabled?'请先选择区域':'请选择办理机构'">
                    <ta-select-option :value="item.orgId"
                                      v-for="(item,index) in OrgNameList"
                                      :key="index">{{item.orgName}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="childName"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="性别"
                              class="spilwid"
                              fieldDecoratorId="sex"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="健康状况"
                              class="spilwid"
                              fieldDecoratorId="healthCondition"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in heathlist"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="业务类别"
                              class="spilwid"
                              fieldDecoratorId="biztype"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select placeholder="请选择业务类别"
                             @change="chs">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionbiztypelist"
                                      :key="index">{{item.label}}</ta-select-option>
                    <ta-select-option value>全部</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="收养类别"
                              class="spilwid"
                              fieldDecoratorId="adoptionCategory"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select placeholder="请选择收养类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="收养登记证字号"
                              class="spilwid4"
                              :labelCol="{span:9}"
                              fieldDecoratorId="registionNumber"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入收养登记证字号"
                            class="numwid" />
                </ta-form-item>

                <ta-form-item label="儿童身份证号"
                              class="spilwid1"
                              :labelCol="{span:10}"
                              fieldDecoratorId="idCard"
                              :wrapperCol="{span:14}">
                  <ta-input placeholder="请输入儿童身份证号" />
                </ta-form-item>

                <!-- <ta-form-item label="当前状态"
                              class="spilwid"
                              fieldDecoratorId="recordStatus"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: '2'}">
                  <ta-select placeholder="请选择当前状态"
                             @change="changeEx">
                    <ta-select-option value="2">有效</ta-select-option>
                    <ta-select-option value="4">作废</ta-select-option>
                  </ta-select>
                </ta-form-item> -->
                <ta-form-item label="登记日期"
                              class="spilwid3"
                              fieldDecoratorId="registerDate"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="收养人"
                              class="spilwid"
                              fieldDecoratorId="adopterName"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-input placeholder="请输入收养人姓名" />
                </ta-form-item>
                <ta-form-item label="收养人身份证号"
                              class="spilwid1"
                              fieldDecoratorId="adopterIdCard"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-input placeholder="请输入收养人身份证号" />
                </ta-form-item>
                <ta-form-item label="送养人"
                              class="spilwid"
                              fieldDecoratorId="sendAdopterName"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-input placeholder="请输入送养人姓名" />
                </ta-form-item>
                <ta-form-item label="送养人身份证号"
                              class="spilwid1"
                              fieldDecoratorId="sendAdopterIdCard"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-input placeholder="请输入送养人身份证号" />
                </ta-form-item>
                <ta-form-item label="送养机构"
                              class="spilwid1"
                              fieldDecoratorId="adoptionAgenciesName"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-input placeholder="请输入送养机构" />
                </ta-form-item>
                <ta-form-item label="是否为补录"
                              class="spilwid1"
                              fieldDecoratorId="isAdditional"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select placeholder="请选择是否为补录">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in yesNoList "
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
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

        <div style="margin-bottom: 16px;"></div>
        <div style="height: 50px;"
             :hidden="ExShow">
          <div style="float:right;">
            <ta-button @click="returns"
                       slot="tabBarExtraContent"
                       icon="rollback"
                       v-if="returnName">返回</ta-button>
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       @click="onExportAdopt">收养登记档案目录导出</ta-button>
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       v-if="isshow"
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
                    :locale="{emptyText: tableText}"
                    :showOverflowTooltip="false"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :customRow="fnCustomRow">
            <span slot="num"
                  slot-scope="val, obj, index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>
            <span slot="childName"
                  slot-scope="val, obj, index">
              <a @click="continueprocessing(obj,'0')">{{obj.childName}}</a>
            </span>
            <span slot="recordStatus"
                  slot-scope="val, obj, index">
              <span v-if="obj.recordStatus==4">已作废</span>
              <span v-else>正常</span>
            </span>
            <div slot="action"
                 slot-scope="val, obj, index"
                 class="btnlist">
              <span @click="continueprocessing(obj,'0')"
                    class="com_textsee">查看</span>
              <!-- <span @click="seerevoke(obj)"
                    class="com_revocation"
                    v-if="obj.recordStatus==0||obj.recordStatus==3">作废原因</span> -->
              <!-- <span @click="prient(obj)"
                    class="com_correlation">打印</span> -->
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
    <ta-modal title="作废"
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
    </ta-modal>

    <ta-drawer title="打印"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <p class="prienttitle">选择需要打印的表单</p>
      <div class="prientout">
        <ta-radio-group @change="radiochange"
                        v-model="radiovalue">
          <ta-radio :value="item.url"
                    v-for="(item,index) in printlist"
                    :key="index">{{item.name}}</ta-radio>
        </ta-radio-group>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import $ from 'jquery'
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
    title: '儿童姓名',
    dataIndex: 'childName',
    scopedSlots: { customRender: 'childName' }
  },
  {
    title: '登记字号',
    width: '20%',
    dataIndex: 'certificateNumber'
  },

  {
    title: '收养类别',
    dataIndex: 'adoptionCategory',
    collectionType: 'ADOPTIONCATEGORY'
  },
  {
    title: '是否补录',
    dataIndex: 'additionalYesOrNo',
    collectionType: 'YESNO'
  },
  {
    title: '业务类别',
    dataIndex: 'biztype',
    collectionType: 'ADOPTIONBIZTYPESEARCH'
  },
  {
    title: '登记日期',
    dataIndex: 'registerDate'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    moment
  },
  name: 'revoke',
  data () {
    return {
      spinning: null,
      disabled: true,
      OrgNameList: [],
      yesNoList: [],
      addressmodel: [],
      tableColumns,
      tableData: [],
      showOn: false,
      isshow: true,
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/adoptionList', // 数据列表接口，API地址
        mixActivatedIsNeed: false
      },
      mixPageRef: 'gridPager',
      visible: false,
      visible2: false,
      adoptionlist: [],
      sexList: [],
      heathlist: [], // 健康状况字典数据
      adoptionbiztypelist: [],
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
      // 出具登记证明
      printlist4: [
        { name: '收养登记证明书', url: '/adoption/printRegisterCertificate', src: 'static/img/certificationfrom1.jpg' },
        { name: '出具收养登记证明申请书 ', url: '/adoption/printCertificateApply', src: 'static/img/certificationfrom2.jpg' },
        { name: '出具收养登记证明询问笔录', url: '/adoption/printCertificateNotes', src: 'static/img/certificationfrom3.jpg' },
        { name: '出具收养登记证明审查处理表', url: '/adoption/printCertificateApproverecord', src: 'static/img/certificationfrom4.jpg' }
      ],
      // 收养登记
      printlist1: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        },
        {
          name: '收养登记证',
          url: '/adoption/printRegistration',
          src: 'static/img/register5.jpg'
        }
      ],
      // 补录收养登记
      printlist5: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        }
      ],
      // 撤销收养登记
      printlist3: [
        { name: '撤销收养登记申请书', url: '/adoption/printRevoke', src: 'static/img/revoke1.jpg' },
        { name: '撤销收养登记决定书 ', url: '/adoption/printRevokeApproverecord', src: 'static/img/revoke2.jpg' }
      ],
      // 补录撤销收养登记
      printlist7: [
        { name: '撤销收养登记申请书', url: '/adoption/printRevoke', src: 'static/img/revoke1.jpg' },
        { name: '撤销收养登记决定书 ', url: '/adoption/printRevokeApproverecord', src: 'static/img/revoke2.jpg' }
      ],
      // 解除收养登记
      printlist2: [
        { name: '解除收养登记申请书', url: '/adoption/printRelieve', src: 'static/img/relive1.jpg' },
        { name: '解除收养登记询问笔录', url: '/adoption/printRelieveNotes', src: 'static/img/relive2.jpg' },
        { name: '解除收养登记审查处理表', url: '/adoption/printRelieveApproverecord', src: 'static/img/relive3.jpg' },
        { name: '解除收养关系证明', url: '/adoption/printRelieveAdoptRelationProve', src: 'static/img/relive4.jpg' }
      ],
      // 补录解除收养登记
      printlist6: [
        { name: '解除收养登记申请书', url: '/adoption/printRelieve', src: 'static/img/relive1.jpg' },
        { name: '解除收养登记询问笔录', url: '/adoption/printRelieveNotes', src: 'static/img/relive2.jpg' },
        { name: '解除收养登记审查处理表', url: '/adoption/printRelieveApproverecord', src: 'static/img/relive3.jpg' }
      ],
      // 补领收养登记
      printlist8: [
        { name: '补领收养登记证明申请书', url: '/adoption/printAdditionCertificate', src: 'static/img/replacement1.jpg' },
        { name: '补领收养登记证询问笔录 ', url: '/adoption/printAdditionCertificateNotes', src: 'static/img/replacement2.jpg' },
        { name: '补领收养登记证审查处理表', url: '/adoption/printAdditionCertificateApproverecord', src: 'static/img/replacement3.jpg' },
        { name: '收养登记证', url: '/adoption/printRegistration', src: 'static/img/register5.jpg' }
      ],
      // 补领解除
      printlist9: [
        { name: ' 补领解除收养登记证明申请书', url: '/adoption/printAdditionRelieveCertificate', src: 'static/img/replacement1.jpg' },
        { name: '补领解除收养登记证询问笔录', url: '/adoption/printAdditionRelieveCertificateNotes', src: 'static/img/replacement2.jpg' },
        { name: '补领解除收养登记证审查处理表', url: '/adoption/printAdditionRelieveCertificateApproverecord', src: 'static/img/replacement3.jpg' }
      ],
      prientData: {},
      tableText: '暂请根据检索条件查询详细列表信息无数据',
      returnName: null, // 返回按钮要返回的页面
      type: '0', // 收养类型 type: 0收养业务总数 1收养登记总数 2解除收养登记总数 3撤销收养登记总数 4出具收养关系证明总数
      orgid: window.parent.indexTool.getUserInfo().orgId,
      exportType: 1, // 当前导出类型（1 导出，2 收养登记档案目录导出）
    }
  },
  activated () {
    this.initData()
  },
  mounted () {
    this.getchildtype()
    this.getyesNoList()
    this.getsexList()
    this.getheathlist()
    this.getadoptionbiztype()
    // this.getoffice()
    this.page = 1
    this.size = 10
    this.OrgNameList = []
    this.ExShow = false
    this.issearch = false
    this.tableText = '请根据检索条件查询详细列表信息'
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.exportType = 1
    if (this.areaId == '1000000000000000000') {
      this.tableData = []
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
  methods: {
    // 初始化数据
    initData () {
      if (this.$route.query.returnName) {
        this.returnName = this.$route.query.returnName
        this.type = this.$route.query.type
        this.timeArray1 = this.$route.query.timeArray1
        this.timeArray2 = this.$route.query.timeArray2
        let biztype = ''
        switch (this.type) {
          case '0': // 收养业务总数
            biztype = ''
            break
          case '1': // 收养登记总数
            biztype = this.Enum.ADOPTIONBIZTYPE.SYDJ
            break
          case '2': // 解除收养登记总数
            biztype = this.Enum.ADOPTIONBIZTYPE.JCSYDJ
            break
          case '3': // 撤销收养登记总数
            biztype = this.Enum.ADOPTIONBIZTYPE.CXSYDJ
            break
          case '4': // 出具收养关系证明总数
            biztype = this.Enum.ADOPTIONBIZTYPE.CJSYGXZM
            break
          default:
            biztype = ''
            break
        }
        this.searchForm.setFieldsValue({ biztype: biztype })
        this.setHeight('one', 'oneout', !this.issearch, this)
        const formData1 = JSON.parse(this.$route.query.formData)
        if (this.timeArray1 && this.timeArray2) {
          this.searchForm.setFieldsValue({ registerDate: [moment(this.timeArray1, 'YYYY-MM-DD'), moment(this.timeArray2, 'YYYY-MM-DD')] })
        }
        if (formData1.adoptionCategory) {
          this.searchForm.setFieldsValue({ adoptionCategory: formData1.adoptionCategory })
        }
        // 统计跳转
        this.isshow = false
        this.addressmodel = this.$route.query.areaArray.split('/').slice(window.parent.indexTool.getUserInfo().areaLevel == 0 ? 1 : window.parent.indexTool.getUserInfo().areaLevel) || []
        this.setaddress()
        this.getOrgNameList()
        this.$nextTick(() => {
          if (this.$route.query.isBenJi == 1) {
            this.searchForm.setFieldsValue({ orgid: this.orgid })
          }
          this.search('000')
        })
      }
      if (this.$route.query.isFromSearch) {
        if (this.$route.query.formDataSearch.address_Linkage) {
          this.addressmodel = this.$route.query.formDataSearch.address_Linkage
          this.setaddress()
          this.getOrgNameList()
        }
        this.$nextTick(() => {
          this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
        })
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-29 16:48:08
     * @information: 收养登记档案目录导出
     */
    onExportAdopt () {
      // 判断当前查询条件 - 只有业务类别为收养登记时才可继续导出
      let { biztype } = this.searchForm.getFieldsValue()
      if (biztype != 1) {
        this.$message.error('业务类别有误，请选择业务类别为收养登记并查询后，才可继续导出')
        return;
      }
      this.exportType = 2
      this.showOn = true
    },
    adsvalchange () {
      this.getOrgNameList()
    },
    // 获取住址机构数据
    getOrgNameList () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ orgid: undefined })
        const addressAttr = this.searchForm.getFieldsValue().address_Linkage

        console.log(addressAttr)
        if (addressAttr && addressAttr.length > 0) {
          this.post('org/queryMzOrgByArea', { areaId: addressAttr[addressAttr.length - 1] }).then((res) => {
            if (res.serviceSuccess) {
              this.OrgNameList = res.data.orgList || []
            }
          })
          this.disabled = false
        } else {
          this.OrgNameList = []
          this.disabled = true
        }
      })
    },
    resetFrom (e) {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      if (window.parent.indexTool.getUserInfo().areaLevel != 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      } else {
        this.addressmodel = []
      }
      // if (e != 'back') {
      //   this.handleSubmit('search')
      // }
      this.tableData = []
      if (this.areaId == '1000000000000000000') {
        this.mixDataList = []
        this.tableText = '请根据检索条件查询详细列表信息'
      } else {
        this.search('000')
      }
    },
    // 返回 到原页面
    returns () {
      this.$router.push({
        name: this.returnName
      })
    },
    // 读取列表 分页形式
    // handleSubmit (e) {
    //   if (e) { // 只有点查询才重置参数
    //     this.page = 1
    //     this.size = 10
    //   }
    //   this.nowtype = 0
    //   // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
    //   const ref = this.mixPageRef
    //   this.$nextTick(() => {
    //     this.$refs[ref].loadData(data => {
    //     }, err => { })
    //   })
    // },
    changeEx (v) {
      if (v == '4') {
        this.ExShow = true
      } else {
        this.ExShow = false
      }
    },
    Excel () {
      var data = this.userPageParams()
      if (data.areaId == '1000000000000000000') {
        return false
      }
      let url = '/adoption/exportAdoptionBusinessVolume'
      // 判断导出类型，若为 收养登记档案目录导出
      if (this.exportType == 2) {
        url = '/adoption/exportRegisterAdoptionRecordsML'
        data.biztype = 1
      }
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.exportType = 1
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },

    onok () { },
    seerevoke (val) {
      this.visible2 = true
      this.reasondis = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          revokeReason: val.revokeReason
        })
      })
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
      if (e == '000' && formData.areaId && formData.areaId != '1000000000000000000') {
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

      this.changetime(formData)
      this.tableText = '暂无数据'
      formData.queryType = '2'
      if (formData.areaId == '1000000000000000000') {
        this.$message.error('无区域信息，请选择查询的区域')
        this.tableText = '请根据检索条件查询详细列表信息'
      }
      console.log(formData, '=>16497')
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
    chs (val) { },
    // 导出
    // async exportFileList () {
    //   var data = this.userPageParams()
    //   this.exportFile('/adoption/export', data)
    // },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 获取登记机关 officelist
    // async getoffice () {
    //   const data = await this.post('welfareOrgManagement/listOwnerOrgs')
    //   this.officelist = data.data.data
    // },
    // 业务类别 ADOPTIONBIZTYPE
    async getadoptionbiztype () {
      const _self = this
      _self.adoptionbiztypelist = await _self.getDictionaries('ADOPTIONBIZTYPESEARCH') || []
      console.log(_self.adoptionbiztypelist, 222)
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    async getyesNoList () {
      this.yesNoList = await this.getDictionaries('YESNO')
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 健康狀況字典
    async getheathlist () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    radiochange (val) {
      let url = `${window.faceConfig.basePath}${val.target.value}?id=${this.prientData.registrationAdoptionId}`
      if (this.prientData.biztype == '4' || this.prientData.biztype == '8' || this.prientData.biztype == '9') {
        url += `&&bizId=${this.prientData.id}`
      }
      window.open('static/print.html?src=' + url)
    },
    onClose () {
      this.visible2 = false
      this.visible = false
    },
    prient (val) {
      this.prientData = JSON.parse(JSON.stringify(val))
      const name = 'printlist' + val.biztype
      this.printlist = this[name]
      this.radiovalue = ''
      this.visible = true
    },
    continueprocessing (val, e) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      switch (val.biztype) {
        case '1':
          this.$router.push({
            name: 'registration', // 收养登记
            query: {
              isFromSearch: true,
              formDataSearch: JSON.stringify(formData),
              id: val.registrationAdoptionId,
              handleType: e || 1,
              additionalYesOrNo: val.additionalYesOrNo
            }
          })
          break
        case '2':
          this.$router.push({
            path: 'relieve', // 解除
            query: {
              zcjcsy: '1',
              isFromSearch: true,
              childType: val.adoptionCategory,
              formDataSearch: JSON.stringify(formData),
              id: val.registrationAdoptionId,
              otherid: val.id,
              additionalYesOrNo: val.additionalYesOrNo,
              handleType: e || 1,
              islook: '1',
              type: 'see'
            }
          })
          break
        case '3':
          this.$router.push({
            path: 'revokeForm', // 作废收养登记
            query: {
              isFromSearch: true,
              formDataSearch: JSON.stringify(formData),
              id: val.registrationAdoptionId,
              isedit: true,
              handleType: e || 1,
              additionalYesOrNo: val.additionalYesOrNo
            }
          })
          break
        case '4':
          this.$router.push({
            path: 'certificationfrom', // 出具证明
            query: {
              isFromSearch: true,
              formDataSearch: JSON.stringify(formData),
              id: val.registrationAdoptionId,
              otherid: val.id,
              handleType: e || 5
              // handleType: 5
            }
          })
          break
        // case '5':
        //   this.$router.push({
        //     name: 'registration', // 补录收养
        //     query: {
        //       isFromSearch: true,
        //       formDataSearch: JSON.stringify(formData),
        //       id: val.registrationAdoptionId,
        //       handleType: e || 1,
        //       additionalYesOrNo: '1',
        //       info: '1'
        //     }
        //   })
        //   break
        // case '6':
        //   this.$router.push({
        //     path: 'relieve', // 补录解除收养
        //     query: {
        //       zcjcsy: '1',
        //       isFromSearch: true,
        //       formDataSearch: JSON.stringify(formData),
        //       id: val.registrationAdoptionId,
        //       otherid: val.id,
        //       additionalYesOrNo: '1',
        //       handleType: e || 1,
        //       islook: '1',
        //       type: 'see'
        //     }
        //   })
        //   break
        // case '7':
        //   this.$router.push({
        //     path: 'revokeForm', // 补录作废收养
        //     query: {
        //       isFromSearch: true,
        //       formDataSearch: JSON.stringify(formData),
        //       id: val.registrationAdoptionId,
        //       handleType: e || 1,
        //       isedit: true,
        //       additionalYesOrNo: '1'
        //     }
        //   })
        //   break
        case '5':
          this.$router.push({
            path: 'replacementFrom', // 补领收养
            query: {
              isFromSearch: true,
              formDataSearch: JSON.stringify(formData),
              id: val.registrationAdoptionId,
              otherid: val.id,
              additionalYesOrNo: '1',
              handleType: e || 1
            }
          })
          break
        case '6':
          this.$router.push({
            path: 'replacementnotFrom', // 补领解除
            query: {
              isFromSearch: true,
              formDataSearch: JSON.stringify(formData),
              id: val.registrationAdoptionId,
              otherid: val.id,
              additionalYesOrNo: '1',
              handleType: e || 1,
              type: 'see'
            }
          })
          break
      }
    },
    gorecord () {
      this.$router.push({
        path: 'visitrecord',
        query: {
          id: this.adoptionid,
          childId: this.childId,
          adoptorName: this.adoptorName,
          registrationAdoptionId: this.registrationAdoptionId
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 380px;
}
.spilwid4 {
  width: 390px;
}
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
