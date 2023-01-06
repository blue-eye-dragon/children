<template>

  <!-- dilemmaChildId     -->
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
          <!-- <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item> -->
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
        <div class="visitbtn">
          <ta-button icon="rollback"
                     style="    margin-top: 10px;"
                     @click="backout">返回</ta-button>
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
            <span @click="see(val,obj,true)"
                  class="com_textsee">查看</span>
            <span @click="getChildrenInfo(obj)"
                  class="com_correlation">查看关联儿童信息 </span>
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
import newConnection from './newConnection'
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
    title: '姓名',
    width: '25%',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '10%',
    collectionType: 'sex'
  },

  {
    title: '健康状况',
    width: '30%',
    dataIndex: 'healthStatus',
    collectionType: 'HEALTH'
  }, {
    title: '操作',
    overflowTooltip: false,
    width: 300,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }]
export default {
  components: { newConnection },
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
        mixGetDataListURL: '/childdirectorandsupervisor/relatedDirector', // 数据列表接口，API地址
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
      orSee: false,
      pid: '',
      dutyBoundaryTown: ''

    }
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getCulture()
  },
  activated () {
    // this.pid = this.$route.query.pid
    // console.log(this.Base.getNowPageParam())
    // if (this.Base.getNowPageParam()._modulePartId_ == '1') {
    //   this.nowkey = '1'
    // } else {
    //   // this.nowkey = '1'
    // }
    this.dutyBoundaryTown = this.$route.query.dutyBoundaryTown
  },
  methods: {
    getChildrenInfo (e) {
      console.log('e---->', e)
      this.$router.push({
        name: 'relatedChildrenList',
        query: { DDYPlay: 'yes', pid: e.id, town: e.town, childList: JSON.stringify(e) }
      })
    },
    goNew () {

    },
    backout () {
      this.$router.go(-1)
    },
    async editAll (val, obj, tp) {
      const resobj = await this.post('/difficultiesChildren/queryById', { id: obj.dilemmaChildId })

      const dcpgId = resobj.data.data.difficultiesChildrenVo.dcpgId
      const tutelageStopReason = resobj.data.data.difficultiesChildrenVo.tutelageStopReason
      const exitTime = resobj.data.data.difficultiesChildrenVo.exitTime

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
    async revoke (val, obj, tp) {
      const res = await this.post('/childdirectorandsupervisor/updateRelationDelState', { relationId: obj.relationId })
      if (!res.errors) {
        this.$message.success('解除关联成功！')
        this.handleSubmit()
      }
    },
    async see (a, e, c) {
      console.log('e---->', e)
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'look' }
      })
    },

    async submit () {
      const param = this.form.getFieldsValue()
      param.exitTime = param.exitTime.format('YYYY-MM-DD')
      const res = await this.post('/LeftOverChild/saveExitMsg', param)
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
      const formData = this.searchForm.getFieldsValue()
      formData.cuttingTown = this.dutyBoundaryTown
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
