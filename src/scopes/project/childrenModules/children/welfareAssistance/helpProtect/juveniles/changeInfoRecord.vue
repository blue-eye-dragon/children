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
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          class="spilwid3"
                          :labelCol="{ span: 8 }"
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
            <span @click="edit(val,obj,index)"
                  class="com_textsee">详情</span>

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
    <!-- <ta-modal title="新增员工" v-model="visible" width="1200px" :footer="null">
      <adoptionReleaseManagement @handleSubmit="handleSubmit()" v-if="visible" :ishide="false"></adoptionReleaseManagement>
    </ta-modal>-->
    <!-- 新增、编辑、详情弹窗 -->

    <div>
      <ta-drawer title="照料结束"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="结束原因"
                        fieldDecoratorId="name">
            <!--
              :fieldDecoratorOptions="verificationRules('员工姓名',72)"
            -->

            <ta-textarea style="height: 150px;"> </ta-textarea>
          </ta-form-item>

          <ta-form-item label="监护照料结束日期"
                        fieldDecoratorId="contact">
            <ta-date-picker />
          </ta-form-item>
          <ta-form-item label="id"
                        hidden
                        fieldDecoratorId="id">
            <ta-date-picker />
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
  // {
  //   title: '员工编号',
  //   width: '100px',
  //   dataIndex: 'employeeNumber',
  //   overflowTooltip: true
  // },
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童编号',
    width: '22%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '名称',
    width: '22%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '20%',
    align: 'center',
    dataIndex: 'sex',
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
    width: '22%',
    align: 'center',
    dataIndex: 'birthday',
    overflowTooltip: true
  },
  {
    title: '累计救助次数',
    width: '24%',
    align: 'center',
    dataIndex: 'rescueCount',
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '200px',

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
        mixGetDataListURL: '/difficultiesChildren/pageDifficultiesChildCaseManagement', // 数据列表接口，API地址     /difficultiesChildren/pageDifficultiesChildCaseManagement
        // mixAddURL: '/employeeManagement/save', // 新增接口/worker/list
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
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'changeInfoRecordInfo',
        query: {
          jump: 'yes',
          id: obj.id,
          childNumber: obj.childNumber,
          name: obj.name,
          sex: obj.sex,
          birthday: obj.birthday,
          idCard: obj.idCard,
          rescueCount: obj.rescueCount,
          disabled: false,
          ifdisabled: true
        }
      })
    },

    over (value, obj, index) {
      this.visible = true
      this.form.setFieldsValue({ id: obj.id })
    },
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit()
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
    // async edit (val, obj, tp) {
    //   this.type = 1
    //   if (tp == '2') {
    //     this.type = 2
    //     this.disabled = true
    //   }
    //   let str = JSON.stringify(obj)
    //   obj = JSON.parse(str)
    //   let data = await this.post('/worker/queryById', { userId: obj.userid })
    //   console.log('获取查看--》', data)

    //   if (data.data.data) {
    //     obj = data.data.data
    //   }
    //   this.id = obj.id
    //   this.visible = true
    //   this.nowtype = 2
    //   if (obj.birthday) {
    //     obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
    //     this.changeAge('hello', obj.birthday)
    //   }

    //   this.$nextTick(() => {
    //     this.form.setFieldsValue(obj)
    //   })
    // },
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
