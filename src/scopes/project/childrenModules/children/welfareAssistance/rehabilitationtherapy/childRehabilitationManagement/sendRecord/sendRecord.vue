<template>
  <!-- 选送记录 -->
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
                <ta-form-item label="康复编号"
                              fieldDecoratorId="rehabilitNumber"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入康复编号" />
                </ta-form-item>
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
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
                  <ta-select placeholder="请选择康复类型">
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
                <!-- <ta-form-item
            label="康复状态"
            fieldDecoratorId="recovery"
            class="spilwid"
            :labelCol="{span:9}"
            :wrapperCol="{span:15}"
          >
            <ta-select placeholder="请选择康复状态">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option
                v-for="(item,index) in recoverList "
                :value="item.value"
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item> -->
                <ta-form-item class="spilwid">

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
        <div style="height: 50px;margin-top: 15px;">
          <!-- <ta-button class="exportbtn"
                     style="float: right;"
                     icon='upload'
                     @click="showModal">导出</ta-button> -->
          <ta-modal :centered="false"
                    style="top: 25%; "
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
          <div style="float:left;">

            <ta-tabs @change="callback"
                     defaultActiveKey="0">
              <ta-tab-pane tab="全部"
                           key="0"></ta-tab-pane>
              <ta-tab-pane tab="康复中"
                           key="1"></ta-tab-pane>
              <ta-tab-pane tab="康复结束"
                           key="2"></ta-tab-pane>
            </ta-tabs>
          </div>
        </div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  class="table-min-width"
                  :showOverflowTooltip="true"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
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
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="obj.delState!='0'&&obj.recovery=='2'"
                  class="com_polish"
                  @click="servicepic(val,obj)">服务评价</span>

            <span v-if="obj.delState=='0'"
                  style="  color: rgba(0, 0, 0, 0.49);  background: #eaefff;  border: 1px solid rgba(1, 66, 128, 0.651); } ">已评价</span>
            <!-- <ta-divider v-if="(obj.delState!='0'&&obj.recovery=='2')||obj.delState=='0'"
                        type="vertical" /> -->
            <span class="com_textsee"
                  @click="see(val,obj)">查看</span>
          </div>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
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
    width: '10%',
    dataIndex: 'rehabilitNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '13%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    overflowTooltip: true
  },
  // {
  //   title: '身份证号',
  //   width: '11%',
  //   dataIndex: 'idCard',
  //   overflowTooltip: true
  // },
  {
    title: '性别',
    width: '8%',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },

  {
    title: '患病类型',
    width: '12%',
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
    dataIndex: 'rehabilitTypes',
    scopedSlots: { customRender: 'rehabilitTypes' },
    width: '10%',
    overflowTooltip: true
  },
  {
    title: '康复状态',
    width: '10%',
    dataIndex: 'recovery',
    collectionType: 'RECOVERYSTATUS',
    overflowTooltip: true
  },
  {
    title: '康复批次',
    width: '10%',
    dataIndex: 'rehabilitBatches',

    overflowTooltip: true
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const mixDataList = [
  {
    childNumber: '3',
    sex: '0',
    workflowState: 'Joe Black',
    age: 32,
    progress: 10,
    action: '',
    address: 'Sidney No. 1 Lake Park'
  },
  {
    childNumber: '3',
    sex: '0',
    workflowState: 'Joe Black',
    age: 32,
    progress: 10,
    action: '',
    address: 'Sidney No. 1 Lake Park'
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
      issearch: false,
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
        mixGetDataListURL: '/rehabilitManage/rehabilitChildsRecord', // 数据列表接口，API地址
        mixAddURL: '/rehabilitManage/save', // 新增接口
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
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
      mixDataList,

      illnesstypeList: [],
      nationList: [],
      disabilitytypeList: [],
      addressmodel: [],
      activeClass: 0,
      recoverList: [],
      recoverTypesList: [],

      tp: 0,
      changeblue: 0,
      butonList: [
        { value: '0', label: '全部' },
        { value: '1', label: '康复中' },
        { value: '2', label: '康复结束' }
      ]
    }
  },
  created () {
    that = this
  },
  mounted () {
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()

    this.getillnesstypeList()
    this.getnation()
    this.getdisabilitytypeList()
    this.getrecoverList()
    this.getrecoverTypesList()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    moment,
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    servicepic (val, obj) {
      // 服务评价
      this.$router.push({
        path: 'servicepic',
        query: {
          ids: obj.rehabiliteId
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/exportRecordChilds', data)
      this.showOn = false
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()

      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    see (val, obj) {
      // 查看跳转
      this.$router.push({
        path: 'see',
        query: {
          id: obj.id,
          rehabiliteId: obj.rehabiliteId,
          toto: obj.delState == '0' ? '1' : '2'// 1显示，2隐藏
        }
      })
    },
    callback (key) {
      this.tp = key
      this.userPageParams()
      this.handleSubmit('search')
    },
    childInfo (val, obj, index) {
      let param = {
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
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      if (this.tp != 0) {
        formData.recovery = this.tp
      } // 添加康复类型参数
      this.changetime(formData)
      return formData
    },
    // -----------
    // 性别字典
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },
    // 康复状态
    async getrecoverList () {
      let data = await this.getDictionaries('RECOVERYSTATUS')
      this.recoverList = data
    },
    // 康复类型
    async getrecoverTypesList () {
      let data = await this.getDictionaries('REHABILITATTYPES')
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
    async submit (types) {
      // 判断是保存还是选送
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let logo = types // 操作标志
          let params = this.form.getFieldsValue()
          params.onlyState = logo

          this.changetime(params)
          url = this.mixListOptions.mixAddURL
          text = '操作成功'
          let data = await this.post(url, params)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()
            this.handleSubmit()
          }
        }
      })
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },
    edit (val, obj) {
      // 选送儿童
      let str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.birthday) {
        obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
        this.changeAge('hello', obj.birthday)
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    changeAge (value, dateString) {
      // 年龄赋值
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: this.age
        })
      })
    },

    handleOk (e) {
      this.exports()
      this.showOn = false
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
  },
  filters: {
    dodisabilityType (val) {
      let list = that.disabilitytypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
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
      let list = that.illnesstypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
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
      let list = that.recoverTypesList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
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
  /* background: #eee; */
  color: #1e82d2;
  font-weight: bolder;
}
</style>
