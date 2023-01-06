<template>
  <!-- 督导员确认列表 -->

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

          <ta-form-item label="手机号码"
                        fieldDecoratorId="cellPhone"
                        class="spilwid"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">

            <ta-input placeholder="请输入手机号码" />

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

            <ta-radio-button value="0">待认领列表</ta-radio-button>
            <ta-radio-button value="1">已认领列表</ta-radio-button>

          </ta-radio-group>
          <!-- <ta-button type="primary"
                     icon='plus'
                     style="    float: right;"
                     @click="goAdd">新增</ta-button> -->

        </div>
        <div class="visitbtntop"
             :hidden='nowkey!="0"'>
          <ta-radio-group v-model="nowkey2"
                          buttonStyle="solid"
                          @change="typechange2">
            <ta-radio-button value="0">本地区</ta-radio-button>
            <ta-radio-button value="1">未明确地区</ta-radio-button>

          </ta-radio-group>
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
                  @click="lookDirector(obj,true)"
                  class="com_textsee">查看</span>

            <span v-if="nowkey=='0'"
                  @click="toShow(obj)"
                  class="com_textedit">认领</span>

            <span v-if="nowkey=='1'"
                  @click="lookDirector(obj,true)"
                  class="com_textsee">查看</span>
            <ta-popconfirm v-if="nowkey=='1'"
                           title="确认取消认领吗?"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">

              <span v-if="nowkey=='1'"
                    class="com_textdel">取消认领</span>

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

    <div>

      <ta-drawer title="认领"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="show">

        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="this.verificationRules('姓名', 72,true)">
            <ta-input :disabled='true' />
          </ta-form-item>
          <ta-form-item label="mbid"
                        hidden
                        fieldDecoratorId="id">
            <ta-input />

          </ta-form-item>

          <ta-form-item label="职责范围"
                        fieldDecoratorId="areaId"
                        :require="{message:'请选择职责范围'}">
            <ta-select>
              <ta-select-option :value='item.areaId'
                                v-for="item in areaList"
                                :key="item.areaId">{{item.areaName}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="村/社区名称"
                        fieldDecoratorId="dutyBoundary"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('村/社区名称', 200,true)">

            <ta-textarea :placeholder=" '请输入村/社区名称'"
                         style="height: 150px;"> </ta-textarea>

          </ta-form-item>
        </ta-form>

        <div slot="footer">
          <ta-button key="back"
                     @click="onClose">取消</ta-button>

          <ta-button key="submit"
                     type="primary"
                     @click="doGet()">确定</ta-button>

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
const mixColumns = [{
  title: '序号',
  dataIndex: 'num',
  align: 'center',
  width: '80px',
  scopedSlots: { customRender: 'num' }
},
{
  title: '姓名',

  overflowTooltip: true,
  dataIndex: 'name'

},
{
  title: '手机号',
  overflowTooltip: true,

  dataIndex: 'cellPhone'
},

{
  title: '单位',

  overflowTooltip: true,
  dataIndex: 'company'
},
{
  title: '操作',
  overflowTooltip: false,
  width: '200px',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}
]
export default {
  mixins: [listMixin],
  data () {
    return {
      areaList: [],
      show: false,
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',

      width: '620px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/childdirectorandsupervisor/claimListDirector', // '/worker/list', // 数据列表接口，API地址

        mixExportURL: '' // 导出接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      areaId: '',
      areaName: '',
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: [],

      nowkey: '0',
      nowkey2: '0' // 本地区0、未明确地区1
    }
  },
  mounted () {
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
  },
  activated () {
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    } else {

    }
  },
  methods: {
    moment,
    toShow (v) {
      this.show = true

      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: v.name,
          id: v.id
        })
      })
    },
    onClose () {
      this.form.resetFields()
      this.show = false
      this.disabled = false
      this.handleSubmit()
    },

    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.claimFlag = this.nowkey == '0' ? this.nowkey2 : '2'
      this.changetime(formData)
      return formData
    },
    // 获取单位
    async getUserOrg () {
      this.areaName = window.parent.indexTool.getUserInfo().areaName
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      const res = await this.post('/org/orguser/areaManagementRestService/queryAllArea', { areaId: this.areaId })
      if (!res.errors) {
        this.areaList = res.data.areaList[0].children
      }
    },

    // 查看儿童主任信息
    lookDirector (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'look' }
      })
    },
    async doGet (a, b, c) {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = this.form.getFieldsValue()
          formData.claimFlag = '0'
          const res = await this.post('/childdirectorandsupervisor/claimDirectorInfoUpdate', formData)
          if (!res.errors) {
            this.$message.success('操作成功！')
            this.onClose()
          }
        }
      })
    },

    async del (v, o) {
      const res = await this.post('/childdirectorandsupervisor/claimDirectorInfoUpdate', { id: o.id, claimFlag: '1' })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$message.success('操作成功！')
        this.handleSubmit()
      }
    },
    cancel (e) { },
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    // 本地区0、未明确地区1
    typechange2 (key) {
      this.nowkey2 = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },

    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
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
