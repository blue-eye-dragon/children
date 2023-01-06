<template>

  <!-- dilemmaChildId     -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入身份证号" />
            </ta-form-item>
            <ta-form-item class="spilwid">
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
        <div class="operateBtn">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="1">信息变更列表</ta-radio-button>
            <ta-radio-button value="2">信息退出列表</ta-radio-button>
            <ta-radio-button value="3">超龄儿童列表</ta-radio-button>
          </ta-radio-group>
        </div>

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
          <!-- :haveSn="true"
          :rowSelection="mixRowSelection"-->
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="nowkey=='1'||nowkey=='3'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <!-- <ta-divider v-if="nowkey=='1'"
                        type="vertical" /> -->
            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">修改</span>
            <!-- <ta-divider type="vertical"
                        v-if="nowkey=='1'" /> -->
            <span v-if="nowkey=='1'"
                  @click="over(val,obj,index)"
                  class="com_publish">退出</span>

            <span v-if="nowkey=='2'"
                  @click="reOver(val,obj,false)"
                  class="com_publish">恢复</span>
            <!-- <ta-divider v-if="nowkey=='2'"
                        type="vertical" /> -->
            <span v-if="nowkey=='2'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <!-- <ta-divider v-if="nowkey=='2'"
                        type="vertical" /> -->
            <span v-if="nowkey=='2'"
                  @click="over(val,obj,'see')"
                  class="com_text_out">退出原因</span>
            <!-- editAll -->

          </div>

        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>

    <div>
      <ta-drawer title="退出"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="退出原因"
                        fieldDecoratorId="exitReason"
                        :fieldDecoratorOptions="this.verificationRules('退出原因', 200,true)">
            <ta-textarea :placeholder="orSee?'':'请输入退出原因'"
                         :disabled='orSee'
                         style="height: 150px;"> </ta-textarea>
          </ta-form-item>

          <ta-form-item label="退出日期"
                        fieldDecoratorId="exitTime"
                        :require="{message:'请选择退出日期'}">
            <ta-date-picker :placeholder="orSee?'':'请选择退出日期'"
                            :disabledDate="disabledDate"
                            :disabled='orSee' />
          </ta-form-item>
          <ta-form-item label="id"
                        hidden
                        fieldDecoratorId="id">
            <ta-input />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button v-if="orSee"
                     key="back"
                     @click="onClose">返回</ta-button>
          <ta-button v-if="!orSee"
                     key="back"
                     @click="onClose">取消</ta-button>
          <ta-button v-if="!orSee"
                     key="submit"
                     type="primary"
                     @click="submit()">确定</ta-button>

        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [

  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童编号',
    width: '17%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '17%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '15%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  // {
  //   title: '身份证号',
  //   width: '12%',
  //   dataIndex: 'idCard',
  //   overflowTooltip: true
  // },
  {
    title: '出生日期',
    width: '17%',
    dataIndex: 'birthday',
    align: 'center',
    overflowTooltip: true
  },
  {
    title: '儿童类别',
    width: '17%',
    align: 'center',
    dataIndex: 'sourceOfData',
    collectionType: 'INFOCOLLECTCHILDTYPE',
    overflowTooltip: true
  },
  {
    title: '上报日期',
    width: '17%',
    align: 'center',
    dataIndex: 'reportTime',
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '220px',
    align: 'center',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
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
      width: '620px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/LeftOverChild/listChange', // 数据列表接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: [],

      nowkey: '1',
      orSee: false

    }
  },
  mounted () {
    let nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getCulture()
    this.getksList()
  },
  activated () {
    console.log(this.Base.getNowPageParam())
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {

    async editAll (val, obj, tp) {
      let resobj = await this.post('/difficultiesChildren/queryById', { 'id': obj.dilemmaChildId })

      let dcpgId = resobj.data.data.difficultiesChildrenVo.dcpgId
      let tutelageStopReason = resobj.data.data.difficultiesChildrenVo.tutelageStopReason
      let exitTime = resobj.data.data.difficultiesChildrenVo.exitTime

      this.$router.push({
        name: 'LookAllInfo',
        query: {
          jump: 'yes',
          id: obj.dilemmaChildId,
          dcpgId: dcpgId,
          exitTime: exitTime,
          tutelageStopReason: tutelageStopReason
        }
      })
    },
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'stayAtHomeCollection',
        query: {
          jump: 'yes',
          id: obj.leftOverChildId,
          disabled: tp
        }
      })
    },

    async over (value, obj, index) {
      this.visible = true
      if (index == 'see') {
        this.orSee = true
        let res = await this.post('/LeftOverChild/queryById', { id: obj.leftOverChildId })
        let data = res.data.data.leftOverChildVo
        if (data) {
          this.$nextTick(() => {
            this.form.setFieldsValue({
              exitTime: data.exitTime ? moment(data.exitTime, 'YYYY-MM-DD') : null,
              exitReason: data.exitReason
            })
          })
        }
      } else { this.orSee = false }

      this.$nextTick(() => {
        this.form.setFieldsValue({ id: obj.leftOverChildId })
      })
    },
    async  reOver (value, obj, tp) {
      // 接口未 2020年1月18日15:32:00
      let chenck = await this.post('/LeftOverChild/getTroubleChildMsgByChildId', { 'id': obj.id })
      if (chenck.data.data == 1) {
        this.$message.error('该儿童处于待提交恢复状态或正在监护中，不允许再次恢复')
      } else {
        this.$router.push({
          name: 'stayAtHomeCollection',
          query: {
            jump: 'yes',
            id: obj.leftOverChildId,
            disabled: tp,
            url: '/LeftOverChild/restoreGuardianship'
          }
        })
      }
    },
    async submit () {
      let param = this.form.getFieldsValue()
      param.exitTime = param.exitTime.format('YYYY-MM-DD')
      let res = await this.post('/LeftOverChild/saveExitMsg', param)
      if (!res.errors) {
        this.onClose()
        this.handleSubmit()
      }
    },
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey
      this.changetime(formData)
      return formData
    },
    async getksList () {
      let param = { orgId: window.parent.indexTool.getUserInfo().orgId }
      let res = await this.post('/departMent/list', param)

      if (!res.errors) {
        this.ksList = res.data.pageBean.list
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      let endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 文化程度
    async getCulture () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },

    changeAge (date, dateString) {
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: this.age ? this.age : ''
        })
      })
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()

      this.namename = ss.name
      this.number = ss.employeeNumber

      this.showOn = true
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
