<template>
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
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item>
          <ta-form-item label="现住址详细地址"
                        fieldDecoratorId="currentAddressDetail"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入现住址详细地址" />
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
            <ta-radio-button value="1">监护不当儿童列表</ta-radio-button>
            <ta-radio-button value="2">留守儿童列表</ta-radio-button>
            <ta-radio-button value="3">事实无人抚养儿童列表</ta-radio-button>
          </ta-radio-group>
          <ta-button style="width: 90px; float: right;"
                     icon='rollback'
                     class="btnleft"
                     @click="backout">返回</ta-button>
          <ta-button type="primary"
                     icon='plus'
                     class="btnleft"
                     style="float: right;"
                     v-if="newOk&&type3"
                     @click="visible = true">关联儿童</ta-button>
        </div>

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  class="table-min-width"
                  :pagination="false"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="isRegistered"
                slot-scope="a, b, c">
            <span v-if="nowkey=='3'&&a=='1'">登记在册</span>
            <span v-if="nowkey=='3'&&a=='3'">已减员</span>
            <span v-if="(nowkey=='1'||nowkey=='2')&&a=='0'">登记在册</span>
            <span v-if="(nowkey=='1'||nowkey=='2')&&a=='1'">退出</span>
          </span>
          <div slot="action"
               slot-scope="val,obj"
               class="btnlist">
            <span @click="see(val,obj,true)"
                  class="com_textsee">查看</span>

            <span @click="revoke(val,obj,false)"
                  v-if="newOk&&type3"
                  class="com_publish">解除关联</span>

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
    <ta-modal title="关联儿童"
              v-model="visible"
              width="90%"
              :footer="null">
      <newConnection @handleSubmit="handleSubmit()"
                     v-if="visible"
                     :thisP="this"
                     :ishide="false"></newConnection>
    </ta-modal>

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
    width: '20%',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '15%',
    collectionType: 'sex'
  },
  {
    title: '身份证号',
    width: '20%',
    dataIndex: 'idCard'
  },
  {
    title: '现住址',
    width: '20%',
    dataIndex: 'currentAddress',
    overflowTooltip: true
  },
  {
    title: '健康状况',
    width: '15%',
    align: 'center',
    dataIndex: 'healthStatus',
    collectionType: 'HEALTH'
  },
  {
    title: '人员状态',
    width: '15%',
    align: 'center',
    dataIndex: 'isRegistered',
    scopedSlots: { customRender: 'isRegistered' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: 170,
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
        mixGetDataListURL: '/childdirectorandsupervisor/directorRelatedChildren', // 数据列表接口，API地址
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
      town: '',
      newOk: true,
      type3: window.parent.indexTool.getUserInfo().orgType != '98'

    }
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.newOk = this.$route.query.DDYPlay != 'yes' && window.parent.indexTool.getUserInfo().areaLevel != '3'
    this.getUserOrg()
    this.getCulture()
  },
  activated () {
    this.page = 1
    this.size = 10
    this.pid = this.$route.query.pid
    this.town = this.$route.query.town
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    }
  },
  methods: {
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
    async see (val, obj, tp) {
      let whoname = ''
      let ids = ''
      if (this.nowkey == 1) { // 监护不当儿童
        whoname = 'improperCareCollection'
        ids = obj.childId
      } else if (this.nowkey == 2) { // 留守
        whoname = 'stayAtHomeCollection'
        ids = obj.childId
      } else { // 无人
        whoname = 'noonesupportfact'
        ids = obj.childId
      }
      this.$router.push({
        name: whoname,
        query: {
          jump: 'yes',
          id: ids,
          disabled: tp,
          isdisabled: 1
        }
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
      formData.childType = this.nowkey
      formData.id = this.pid
      formData.areaId = window.parent.indexTool.getUserInfo().areaId
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
