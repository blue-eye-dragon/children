<template>
  <!-- 留守妇女  列表 -->

  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'80px',footer:'80px'}">

      <div slot="header">

        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入姓名" />

          </ta-form-item>

          <ta-form-item label="证件号码"
                        fieldDecoratorId="idCard"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入证件号码" />

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
      <div>
        <div class="visitbtntop">

          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">

            <ta-radio-button value="0">暂存列表</ta-radio-button>
            <ta-radio-button value="1">登记在册列表</ta-radio-button>

          </ta-radio-group>
          <ta-button type="primary"
                     icon='plus'
                     style="    float: right;"
                     @click="goAdd">新增</ta-button>

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

            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,false)"
                  class="com_publish">编辑</span>

            <!-- <ta-divider v-if="nowkey=='0'" type="vertical" /> -->

            <!-- <ta-divider v-if="nowkey=='0'" type="vertical" /> -->

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

    <div></div>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [{
  title: '序号',
  dataIndex: 'num',
  align: 'center',
  width: '80px',
  scopedSlots: { customRender: 'num' }
},
{
  title: '留守妇女编号',
  width: '12%',
  dataIndex: 'womenNumber',
  overflowTooltip: true
},
{
  title: '姓名',
  width: '12%',
  dataIndex: 'name',
  overflowTooltip: true
},

// {
//   title: '证件号码',
//   width: '14%',
//   dataIndex: 'idCard',
//   overflowTooltip: true
// },
{
  title: '出生日期',
  width: '12%',
  dataIndex: 'birthday',
  align: 'center',
  overflowTooltip: true
},
{
  title: '户籍所在地',
  width: '15%',
  align: 'center',
  dataIndex: 'censusRegisterDetailAll',

  overflowTooltip: true
},
{
  title: '上报日期', // 上报
  width: '10%',
  align: 'center',
  dataIndex: 'reportTime',
  overflowTooltip: true
},
{
  title: '操作',
  width: '200px',
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
        mixGetDataListURL: '/LeftOverWomen/list', // '/worker/list', // 数据列表接口，API地址

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
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getCulture()
    this.getksList()
  },
  activated () {
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    } else {

    }
  },
  methods: {
    async del (v, o) {
      const res = await this.post('/LeftOverWomen/updateDelStateById', { id: o.id })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$message.success('删除成功！')
        this.handleSubmit()
      }
    },
    cancel (e) { },
    goAdd () {
      this.$router.push({
        name: 'womenStayingAtHome'
      })
    },

    //   ************
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'womenStayingAtHome',
        query: {
          id: obj.id, // id未定
          disabled: tp
        }
      })
    },

    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.insertType = this.nowkey
      this.changetime(formData)
      return formData
    },
    async getksList () {
      const param = { orgId: window.parent.indexTool.getUserInfo().orgId }
      const res = await this.post('/departMent/list', param)

      if (!res.errors) {
        this.ksList = res.data.pageBean.list
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 文化程度
    async getCulture () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
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
      const ss = this.searchForm.getFieldsValue()

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
      const ss = this.searchForm.getFieldsValue()
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
.searchdata {
  height: 100%;
}

.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
