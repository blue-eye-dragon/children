<template>
  <!-- 有基地康复儿童 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>
                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              class="spilwid3"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <!-- <ta-form-item label="来源"
                              fieldDecoratorId="source"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择来源">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in comeList "
                                      :value="item.source"
                                      :key="index">{{item.sourcename}}</ta-select-option>
                  </ta-select>
                </ta-form-item> -->
                <ta-form-item label="患病类型"
                              fieldDecoratorId="illnessType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择患病类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in illnesstypeList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="康复类型"
                              fieldDecoratorId="rehabilitTypes"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择康复类型" mode="multiple">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in recoverTypesList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="残疾类型"
                              fieldDecoratorId="disabilityType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择残疾类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in disabilitytypeList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="康复批次"
                              fieldDecoratorId="rehabilitBatches"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择康复批次">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in pcList "
                                      :value="item"
                                      :key="index">{{item}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
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
        <div class="operateBtn">
          <!-- <div style="float: right;">
            <ta-button class="exportbtn"
                       icon='upload'
                       @click="showModal">导出</ta-button>
            <ta-modal :centered="false"
                      style="top: 25%; "
                      :visible="showOn"
                      @ok="Excel"
                      @cancel="handleCancel">
              <div>
                <h3>确认导出查询条件下的全部有效数据吗？</h3>
              </div>
            </ta-modal>
          </div> -->
          <div style="margin-top: 15px;">
            <ta-tabs @change="callback"
                     defaultActiveKey="1">
              <ta-tab-pane tab="康复管理列表"
                           key="1"></ta-tab-pane>
              <ta-tab-pane tab="康复结束列表"
                           key="2"></ta-tab-pane>
            </ta-tabs>
          </div>
        </div>
        <ta-table bordered
                  class="table table-min-width"
                  :showOverflowTooltip="true"
                  :columns="mixColumns"
                  :dataSource="dataSource1"
                  :pagination="false"
                  @change="handleTableChange">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="birthday"
                slot-scope="a, b, c">
            <span>{{ a?a.substring(0,10):"-" }}</span>
          </span>
          <span slot="illnessType"
                slot-scope="a, b, c">
            <span>{{ b.illnessType|doillnessType }}</span>
          </span>
          <span slot="disabilityType"
                slot-scope="a, b, c">
            <span>{{ b.disabilityType|dodisabilityType }}</span>
          </span>
          <span slot="rehabilitTypes"
                slot-scope="a, b, c">
            <span>{{ b.rehabilitTypes|dorehabilitTypes }}</span>
          </span>
          <span slot="recovery"
                slot-scope="a, b, c">
            <span v-if="a"
                  :class="a==1?'com_inaudit':'com_adopt'">{{ b.recovery|untilRecovery }}</span>
            <span v-else
                  class="com_tobesubmitted">{{ b.recovery|untilRecovery }}</span>

          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="obj.recovery=='1'&&obj.delState!='0'"
                  class="com_audit"
                  @click="seeinfo(val,obj)">康复管理</span>
            <span v-if="obj.delState!='0'&&obj.recovery=='2'&&obj.sourceName.trim()=='本院'"
                  class="com_polish"
                  @click="servicepic(val,obj)">服务评价</span>
            <span v-if="(!obj.recovery||obj.recovery==null||obj.recovery==' ')&&obj.delState!='0'"
                  class="com_publish"
                  @click="selectNumber(val,obj ,index)">选择康复批次</span>
            <span v-if="obj.delState=='0'"
                  style="color: #0000007d;    color: rgba(0, 0, 0, 0.49);  background: #eaefff;  border: 1px solid rgba(1, 66, 128, 0.651);">已评价</span>
            <!-- <ta-divider v-if="(obj.delState!='0'&&obj.recovery=='2'&&obj.sourceName.trim()=='本院')||obj.delState=='0'"
                        type="vertical" /> -->
            <span v-if="(obj.recovery&&obj.recovery!=null&&obj.recovery!=' ')&&obj.recovery!='1'"
                  class="com_textsee"
                  @click="see (val, obj, index)">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="dataSource1"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ta-drawer title="选择康复批次"
               width="500px"
               :closable="false"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="康复儿童情况描述"
                      fieldDecoratorId="recoveredDescription"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnValidateMore}]}">
          <ta-textarea :rows="4"
                       :disabled="disabled"
                       placeholder="请输入康复儿童情况描述" />
        </ta-form-item>
        <ta-form-item label="康复类型"
                      fieldDecoratorId="rehabilitTypes"
                      :require="{message:'请选择康复类型'}">
          <ta-select placeholder="请选择康复类型" mode="multiple" size="large">
            <ta-select-option v-for="(item,index) in recoverTypesList"
                              :value="item.value"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <!-- orgnizationsName -->
        <ta-form-item label="来源"
                      fieldDecoratorId="sourceName"
                      :require="{message:'请输入来源'}">
          <ta-input :disabled="true"
                    placeholder="请输入来源" />
        </ta-form-item>
        <ta-form-item hidden
                      label="来源机构id"
                      fieldDecoratorId="source">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item hidden
                      label="儿童基本信息id"
                      fieldDecoratorId="childIds">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item hidden
                      label="入园儿童id"
                      fieldDecoratorId="ids">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="批次"
                      fieldDecoratorId="rehabilitBatches"
                      :require="{message:'请选择批次'}">
          <ta-input :disabled="true"
                    placeholder="请选择批次" />
          <ta-button type="primary"
                     @click="showModalSelect">批次选择</ta-button>
          <ta-modal title="批次选择"
                    v-model="selectVisible"
                    @ok="hideModalSelect"
                    okText="确认"
                    cancelText="取消">
            <div style="border: 1px solid lightgray;margin-top: 10px;height: 300px;     overflow: overlay;">
              <div>
                <ta-e-tree :data="pcdata"
                           node-key="id"
                           :props="defaultProps"
                           :highlight-current="false"
                           :default-expand-all="false"
                           @node-click="fnNodeClick">
                  <span slot-scope="{node,data}">
                    <div style="float: left;">
                      <span>{{data.name}}</span>
                      <!-- 如果是大于等于当前年，则显示后缀增删操作按钮。   style="color:green ;  position: relative;left: 319px;"     v-if="parseInt(nowYear)<=parseInt(data.labelo)"  -->
                      <div style="float: right;"
                           v-if="check(data)">
                        <span @click.stop="addOrDel(node,data,'1')">
                          <ta-icon style="color:green ; position: absolute; left: 414px;"
                                   type="plus-circle" />
                        </span>
                        <!-- <span v-if="deletePiot"
                              @click.stop="addOrDel(node,data,'2')">
                          <ta-icon style="color:red ; position: absolute;left: 432px;"
                                   type="delete" />
                        </span> -->
                      </div>
                    </div>
                  </span>
                </ta-e-tree>
              </div>
            </div>
          </ta-modal>
        </ta-form-item>
        <ta-form-item label="主管康复医师"
                      fieldDecoratorId="chiefPhysician"
                      :fieldDecoratorOptions="verificationRules('主管康复医师',72)">
          <ta-input :disabled="disabled"
                    placeholder="请输入主管康复医师" />
        </ta-form-item>
        <ta-form-item label="康复师"
                      fieldDecoratorId="rehabiliter"
                      :fieldDecoratorOptions="verificationRules('康复师',72)">
          <ta-input :disabled="disabled"
                    placeholder="请输入康复师" />
        </ta-form-item>
        <ta-form-item label="护士"
                      fieldDecoratorId="nurse"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('护士',72)">
          <ta-input placeholder="请输入护士" />
        </ta-form-item>
        <ta-form-item label="登记日期"
                      fieldDecoratorId="registratDate"
                      :require="{message:'请选择登记日期'}">
          <ta-date-picker placeholder="请选择登记日期"
                          format="YYYY-MM-DD"
                          style="width: 100%"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   type="primary"
                   @click="submit()">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
import AddressComponent from '@component/common/components/addressComponent'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '康复编号',
    width: '12%',
    dataIndex: 'rehabilitNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '12%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    overflowTooltip: true
  },
  {
    title: '性别',
    align: 'center',
    width: '7%',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },

  {
    title: '患病类型',
    width: '11%',
    dataIndex: 'illnessType',
    scopedSlots: { customRender: 'illnessType' },
    overflowTooltip: true
  },
  {
    title: '残疾类型',
    width: '12%',
    dataIndex: 'disabilityType',
    scopedSlots: { customRender: 'disabilityType' },
    overflowTooltip: true
  },

  {
    title: '康复类型',
    width: '12%',
    dataIndex: 'rehabilitTypes',
    scopedSlots: { customRender: 'rehabilitTypes' },
    overflowTooltip: true
  },
  {
    title: '康复批次',
    width: '10%',
    dataIndex: 'rehabilitBatches',
    overflowTooltip: true
  },
  {
    title: '来源',
    width: '7%',
    dataIndex: 'sourceName',
    // orgnizationsName
    overflowTooltip: true
  },
  {
    title: '康复状态',
    width: '10%',
    dataIndex: 'recovery',
    // collectionType: 'RECOVERYSTATUS',
    scopedSlots: { customRender: 'recovery' },
    overflowTooltip: true
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]

var that = ''
export default {
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '500px',
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/rehabilitManage/rehabilitChildsBase', // 数据列表接口，API地址
        mixAddURL: '/rehabilitManage/save', // 新增接口
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      dataSource1: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      illnesstypeList: [],

      disabilitytypeList: [],
      addressmodel: [],
      activeClass: 0,
      recoverList: [],
      recoverTypesList: [],
      tp: 1,
      changeblue: 0,
      butonList: [
        { value: '0', label: '全部' },
        { value: '1', label: '康复中' },
        { value: '2', label: '康复结束' }
      ],
      comeList: [], // 来源list
      pcList: [], // 批次list
      selectVisible: false,
      nowYear: '',
      pcdata: [],
      defaultProps: {
        id: 'id',
        children: 'children',
        name: 'name'
      },
      nowkey: '',
      selectValue: null, // 康复批次选择的数据
      deletePiot: true,
      issearch: false
    }
  },
  created () {
    that = this
  },
  activated () {
    const nowDate = new Date()
    this.nowYear = moment(nowDate).format('YYYY') // + '000'
    this.getpcdata()
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getillnesstypeList()
    this.getdisabilitytypeList()
    this.getrecoverList()
    this.getrecoverTypesList()
    // this.comelist()
    this.pcLists()
  },
  methods: {
    moment,
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    see (val, obj, index) {
      this.$router.push({
        path: 'see',
        query: {
          rehabiliteId: obj.rehabiliteId,
          toto: obj.delState == '0' ? '1' : '2'
        }
      })
    },
    // 登记日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    async pcLists () {
      const res = await this.post('/rehabilitManage/queryRehabilitBatches')
      this.pcList = res.data.data
    },
    // async comelist () {
    //   const res = await this.post('/rehabilitManage/querySource')
    //   this.comeList = res.data.data
    // },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '康复儿童情况描述', value, callback)
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/exportBaseChilds', data)
      this.showOn = false
    },
    selectNumber (val, obj, index) {
      // 选择康复批次
      this.visible = true
      this.nowtype = 1

      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgnizationsName: obj.orgnizationsName,
          sourceName: obj.sourceName,
          ids: obj.id,
          childIds: obj.childId
        })
      })
    },
    async getpcdata () {
      const { data } = await this.post('/pitchManager/getTreeJson')
      this.pcdata = JSON.parse(data.resultData)
    },
    // 选择批次
    showModalSelect () {
      this.selectValue = null
      this.selectVisible = true
    },
    // 批次选择的确定事件
    hideModalSelect () {
      this.selectVisible = false
      // 只有在点击树中的批次时才进行批次赋值
      if (this.selectValue) {
        this.form.setFieldsValue({
          rehabilitBatches: this.selectValue
        })
      }
    },

    /**
     * 节点被点击时调用
     * @param data data数组中表示该节点的对象
     * @param node 当前节点
     * @param nodeComponent 节点组件本身
     */
    fnNodeClick (data, node, nodeComponent) {
      // 除去一级节点
      if (data.parentid != '0' && node.isLeaf) {
        this.$nextTick(() => {
          this.selectValue = data.name
          //   this.form.setFieldsValue({
          //     rehabilitBatches: data.name
          //   })
        })
        // this.hideModalSelect()
      }
    },
    async addOrDel (node, data, or) {
      let url = ''
      if (or == '1') {
        url = '/pitchManager/addTreeNode'
      } else {
        url = '/pitchManager/updateDelStateById'
      }
      const param = {
        name: data.name
      }
      if (data.name == this.nowYear + '年' && or == '2') {
        this.$message.error('当前年不能删除')
      } else if (data.name == this.nowYear + '001' && or == '2') {
        this.$message.error('当前年第一批次不能删除')
      } else {
        const add = await this.post(url, param)
        if (!add.error) {
          this.getpcdata()
        }
      }
    },

    // -----------
    servicepic (val, obj) {
      // 服务评价
      this.$router.push({
        path: 'servicepic',
        query: {
          ids: obj.rehabiliteId
        }
      })
    },
    seeinfo (val, obj) {
      // 查看跳转
      this.$router.push({
        path: 'see',
        query: {
          rehabiliteId: obj.rehabiliteId,
          comeId: obj.id,
          elementary: true
        }
      })
    },
    callback (key) {
      this.tp = key
      this.userPageParams()
      this.handleSubmit('search')
    },

    childInfo (val, obj, index) {
      const param = {
        id: obj.id
      }
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },
    typechange (val) {
      // console.log(val.target.value)
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()

      formData.recovery = this.tp
      // formData.recovery = this.nowkey

      this.changetime(formData)
      return formData
    },
    // -----------
    // 性别字典
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 患病类型
    async getillnesstypeList () {
      const data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },

    // 残疾类型
    async getdisabilitytypeList () {
      const data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },
    // 康复状态
    async getrecoverList () {
      const data = await this.getDictionaries('RECOVERYSTATUS')
      this.recoverList = data
    },
    // 康复类型
    async getrecoverTypesList () {
      const data = await this.getDictionaries('REHABILITATTYPES')
      this.recoverTypesList = data
    },

    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },

    showModal () {
      const ss = this.searchForm.getFieldsValue()

      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    check (a) {
      const len = parseInt(a.name).toString().length
      this.deletePiot = true
      if (len == 4) {
        // 年
        if (this.nowYear <= parseInt(a.name)) {
          const labelList = []
          this.pcdata.forEach(e => {
            if (parseInt(e.name).toString().length == 4) {
              labelList.push(parseInt(e.name))
            }
          })
          labelList.sort(function (a, b) {
            return a - b
          })
          if (parseInt(a.name) == labelList[labelList.length - 1]) {
            return true
          }
        } else {
          return false
        }
      } else {
        if (a.name <= parseInt(this.nowYear + '000')) {
          return false
        } else {
          // 当前以后批次号
          const labelList = []
          let bol = false
          this.pcdata.forEach(e => {
            // if(e.name==a.name)
            if (e.name == a.name.substr(0, 4) + '年' && e.children) {
              e.children.forEach(item => {
                labelList.push(item.name)
              })
              labelList.sort(function (a, b) {
                return a - b
              })
              if (a.name == labelList[labelList.length - 1]) {
                bol = true
              }
            }
          })
          return bol
        }
      }
    }
  },
  filters: {
    untilRecovery (val) {
      const list = that.recoverList
      let dataShow = ''
      if (parseInt(val)) {
        list.forEach((item, index) => {
          if (item.value == val) {
            dataShow = item.label
          }
        })
      } else {
        dataShow = '待康复'
      }
      return dataShow
    },
    dodisabilityType (val) {
      const list = that.disabilitytypeList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    doillnessType (val) {
      const list = that.illnesstypeList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    dorehabilitTypes (val) {
      const list = that.recoverTypesList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: #1e82d2;
  font-weight: bolder;
}
.spilwid3 {
  width: 350px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
/deep/ .el-tree-node:focus > .el-tree-node__content {
  background-color: #a2cfe8 !important;
}
</style>
