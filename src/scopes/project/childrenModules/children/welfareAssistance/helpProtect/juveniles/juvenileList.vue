<template>
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
        <div class="operateBtn">
          <div class="radioClass leftClass">
            <ta-radio-group v-model="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">暂存列表</ta-radio-button>
              <ta-radio-button value="1">登记在册列表</ta-radio-button>

            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button icon='plus'
                       type="primary"
                       @click="goAdd">新增</ta-button>
          </div>
        </div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,false)"
                  class="com_publish">编辑</span>
            <!-- <ta-divider v-if="nowkey=='0'"
                          type="vertical" /> -->

            <ta-popconfirm v-if="nowkey=='0'"
                           title="确认删除吗?"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">

              <span class="com_textdel">删除</span>

            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
    width: '18%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '18%',
    dataIndex: 'name',
    overflowTooltip: true
  }, {
    title: '登记日期',
    align: 'center',
    width: '16%',
    dataIndex: 'registrationDate',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '15%',
    dataIndex: 'sex',
    collectionType: 'SEX',
    align: 'center',
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
    width: '16%',
    dataIndex: 'birthday',
    align: 'center',
    overflowTooltip: true
  },
  // {
  //   title: '儿童类别',
  //   width: '12%',
  //   align: 'center',
  //   dataIndex: 'sourceOfData',
  //   collectionType: 'INFOCOLLECTCHILDTYPE',
  //   overflowTooltip: true
  // },

  {
    title: '操作',
    width: 200,

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
        mixGetDataListURL: '/difficultiesChildren/pageDifficultiesChild', // '/worker/list', // 数据列表接口，API地址
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

      nowkey: '0'
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
      this.nowkey = '0'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {
    async del (v, o) {
      let res = await this.post('/difficultiesChildren/updateDelStateById', { 'id': o.troubleChildId })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$message.success('删除成功')
        this.handleSubmit()
      }
    },
    cancel (e) { },
    goAdd () {
      this.$router.push({
        name: 'protectionJuvenileCollection',
        query: {
          jump: 'yes'
        }
      })
    },

    //   ************
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'protectionJuvenileCollection',
        query: {
          jump: 'yes',
          id: obj.troubleChildId,
          disabled: tp
        }
      })
    },

    over (value, obj, index) {
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ id: obj.troubleChildId })
      })
    },
    async reOver (value, obj, tp) {
      this.$router.push({
        name: 'protectionJuvenileCollection',
        query: {
          jump: 'yes',
          id: obj.troubleChildId,
          disabled: tp,
          url: '/difficultiesChildren/restoreGuardianship'
        }
      })
      // let res = await this.post('/difficultiesChildren/restoreGuardianship', {id: obj.id})// 恢复照料接口 参数问题2020年1月13日17:35:34
    },
    async submit () {
      let param = this.form.getFieldsValue()
      param.tutelageStopReasonDate = param.tutelageStopReasonDate.format(
        'YYYY-MM-DD'
      )
      let res = await this.post(
        '/difficultiesChildren/saveEndOfGuardianship',
        param
      )
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
      formData.insertType = this.nowkey
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
<style scoped lang='less'>
.spilwid3 {
  width: 350px;
}
</style>
