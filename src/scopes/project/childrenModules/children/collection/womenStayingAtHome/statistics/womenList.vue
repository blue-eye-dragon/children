<template>

  <!-- 留守妇女信息   -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入姓名" />
          </ta-form-item>
          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-range-picker />
          </ta-form-item>
          <ta-form-item label="身体情况"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{ span: 15 }"
                        fieldDecoratorId="healthStatus">
            <ta-select allowClear
                       :disabled="disabled"
                       placeholder="请选择身体情况">
              <ta-select-option v-for="item in heathlist"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="文化程度"
                        :labelCol="{ span: 9 }"
                        :wrapperCol="{ span: 15 }"
                        fieldDecoratorId="educationLevel">
            <ta-select allowClear
                       :disabled="disabled"
                       placeholder="请选择文化程度">
              <ta-select-option v-for="item in cultureList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
          </ta-form-item>
        </ta-form>
        <!-- <div class="visitbtntop">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="1">信息变更列表</ta-radio-button>
            <ta-radio-button value="2">信息退出列表</ta-radio-button>

          </ta-radio-group>
      </div> -->

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
            <span @click="edit(val,obj,true)"
                  class="com_textsee">详情</span>

          </div>

        </ta-table>
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
      <!-- <ta-drawer
        title="退出"
        :width="width"
        :closable="false"
        :getContainer="setContainer"
        @close="onClose"
        :visible="visible"
      >
        <ta-form :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
          <ta-form-item label="退出原因" fieldDecoratorId="exitReason">
          <ta-textarea :disabled='orSee' style="height: 150px;"> </ta-textarea>
          </ta-form-item>

          <ta-form-item
            label="退出日期"
            fieldDecoratorId="exitTime"
          >
           <ta-date-picker :disabled='orSee' />
          </ta-form-item>
    <ta-form-item
            label="id"
            hidden
            fieldDecoratorId="id"
          >
          <ta-input />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button v-if="orSee" key="back" @click="onClose">返回</ta-button>
          <ta-button v-if="!orSee" key="back" @click="onClose">取消</ta-button>
          <ta-button v-if="!orSee" key="submit" type="primary"   @click="submit()">确定</ta-button>

        </div>
      </ta-drawer> -->
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
    title: '上报日期',
    width: '11%',
    dataIndex: 'reportTime',
    overflowTooltip: true
  },
  {
    title: '留守妇女编号',
    width: '12%',
    dataIndex: 'womenNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '14%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    width: '12%',
    dataIndex: 'birthday',

    overflowTooltip: true
  },
  {
    title: '身份证号',
    width: '12%',
    dataIndex: 'idCard',
    overflowTooltip: true
  },
  {
    title: '户籍地址',
    width: '15%',
    dataIndex: 'censusRegisterDetailAll',

    overflowTooltip: true
  },
  // {
  //   title: '儿童类别',
  //   width: '12%',
  //   dataIndex: 'sourceOfData',
  //   collectionType: 'INFOCOLLECTCHILDTYPE',
  //   overflowTooltip: true
  // },

  {
    title: '操作',
    width: '250px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      heathlist: [],
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
        mixGetDataListURL: '/LeftOverWomen/listChange', // 数据列表接口，API地址
        // mixAddURL: '/employeeManagement/save', // 新增接口

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
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'womenStayingAtHome',
        query: {
          id: obj.id, // 未定id
          disabled: tp
        }
      })
    },

    async over (value, obj, index) {
      this.visible = true
      if (index == 'see') {
        this.orSee = true
        let res = await this.post('/LeftOverWomen/queryById', { id: obj.id })// id未定
        let data = res.data.data
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
        this.form.setFieldsValue({ id: obj.id })
      })
    },
    async  reOver (value, obj, tp) {
      let chenck = await this.post('/LeftOverWomen/getTroubleChildMsgByChildId', { 'id': obj.id })// id未定
      if (chenck.data.data == 0) {
        this.$message.error('该妇女处于待提交恢复状态或正在监护中，不允许再次恢复！')
      } else {
        this.$router.push({
          name: 'womenStayingAtHome',
          query: {
            id: obj.id, // 未定
            disabled: tp,
            url: '/LeftOverWomen/restoreGuardianship'
          }
        })
      }
    },
    async submit () {
      let param = this.form.getFieldsValue()
      param.exitTime = param.exitTime.format('YYYY-MM-DD')
      let res = await this.post('/LeftOverWomen/saveExitMsg', param)
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

      let formdata = { parentValue: null, codeType: 'HEALTH' }
      let data2 = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data2.data.codeList
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
.searchdata {
  height: 100%;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
