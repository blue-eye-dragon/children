<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          class="spilwid3"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
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
        <div class="operateBtn radioClass">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="1">信息变更列表</ta-radio-button>
            <ta-radio-button value="2">监护照料结束列表</ta-radio-button>
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
            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <!-- <ta-divider v-if="nowkey=='1'" type="vertical" /> -->
            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">修改</span>
            <!-- <ta-divider type="vertical" v-if="nowkey=='1'" /> -->
            <span v-if="nowkey=='1'"
                  @click="over(val,obj,index)"
                  class="com_publish">照料结束</span>
            <span v-if="nowkey=='2'"
                  @click="editAll(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='2'"
                  @click="reOver(val,obj,false)"
                  class="com_publish">恢复</span>
            <!-- <ta-divider v-if="nowkey=='2'" type="vertical" /> -->

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
      <ta-drawer title="照料结束"
                 width="500px"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item :labelCol="{span:5}"
                        :wrapperCol="{span:19}"
                        label="结束原因"
                        fieldDecoratorId="tutelageStopReason"
                        :fieldDecoratorOptions="this.verificationRules('结束原因', 200,false)">
            <ta-textarea placeholder="请输入结束原因"
                         style="height: 150px;"> </ta-textarea>
          </ta-form-item>

          <ta-form-item label="监护照料结束日期"
                        fieldDecoratorId="tutelageStopReasonDate"
                        :require="{message:'请选择退监护照料结束日期'}"
                        :labelCol="{span:5}"
                        :wrapperCol="{span:19}">
            <ta-date-picker :disabledDate="disabledDate"
                            style="width:100%;" />
          </ta-form-item>
          <ta-form-item label="id"
                        hidden
                        fieldDecoratorId="id">
            <ta-input />
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
    width: '25%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '儿童姓名',
    width: '25%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '23%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  // {
  //   title: '身份证号',
  //   width: '12%',
  //   dataIndex: 'idCard',
  //   // collectionType: 'ADMINISTRATIVEOFFICE',
  //   overflowTooltip: true
  // },
  {
    title: '出生日期',
    width: '27%',
    align: 'center',
    dataIndex: 'birthday',

    overflowTooltip: true
  },
  // {
  //   title: '儿童类别',
  //   width: '23%',
  //   align: 'center',
  //   dataIndex: 'sourceOfData',
  //   collectionType: 'INFOCOLLECTCHILDTYPE',
  //   overflowTooltip: true
  // },

  {
    title: '操作',
    width: '280px',

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
        mixGetDataListURL: '/difficultiesChildren/pageDifficultiesChildChange', // '/worker/list', // 数据列表接口，API地址
        // mixAddURL: '/employeeManagement/save', // 新增接口
        mixEditURL: '/worker/update', // 编辑接口
        mixDeleteURL: '/worker/updateDelStateById', // 删除接口，API地址
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

      nowkey: '1'

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
    disabledDate (current) {
      return current > moment().endOf('day')
    },
    async editAll (val, obj, tp) {
      let resobj = await this.post('/difficultiesChildren/queryById', { 'id': obj.troubleChildId })

      let dcpgId = resobj.data.data.difficultiesChildrenVo.dcpgId
      let tutelageStopReason = resobj.data.data.difficultiesChildrenVo.tutelageStopReason
      let tutelageStopReasonDate = resobj.data.data.difficultiesChildrenVo.tutelageStopReasonDate

      this.$router.push({
        name: 'LookAllInfo',
        query: {
          jump: 'yes',
          id: obj.troubleChildId,
          dcpgId: dcpgId,
          tutelageStopReasonDate: tutelageStopReasonDate,
          tutelageStopReason: tutelageStopReason
        }
      })
    },

    async edit (val, obj, tp) {
      this.$router.push({
        name: 'protectionJuvenileCollection',
        query: {
          jump: 'yes',
          id: obj.troubleChildId,
          disabled: tp,
          nowkeys: 1
        }
      })
    },

    over (value, obj, index) {
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ id: obj.troubleChildId })
      })
    },
    async  reOver (value, obj, tp) {
      let chenck = await this.post('/difficultiesChildren/getTroubleChildMsgByChildId', { 'id': obj.id })
      if (chenck.data.data == 0) {
        this.$message.error('该儿童处于待提交恢复状态或正在监护中，不允许再次恢复')
      } else {
        this.$router.push({
          name: 'protectionJuvenileCollection',
          query: {
            jump: 'yes',
            id: obj.troubleChildId,
            disabled: tp,
            url: '/difficultiesChildren/restoreGuardianship'
          }
        })
      }
    },
    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let param = this.form.getFieldsValue()
          param.tutelageStopReasonDate = param.tutelageStopReasonDate.format('YYYY-MM-DD')
          let res = await this.post('/difficultiesChildren/saveEndOfGuardianship', param)
          if (!res.errors) {
            this.onClose()
            this.handleSubmit()
          }
        }
      })
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
    handleOk (e) {
      this.Excel()
      this.showOn = false
    },
    handleCancel (e) {
      this.showOn = false
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/welfareEmployeeManagement/export', data)
    },
    async exports () {
      let ss = this.searchForm.getFieldsValue()
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

<style scoped lang="less">
.spilwid3 {
  width: 350px;
}
</style>