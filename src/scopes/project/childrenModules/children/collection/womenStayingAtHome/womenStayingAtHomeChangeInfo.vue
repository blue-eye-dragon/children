<template>
  <!-- 留守妇女变更    -->

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

            <ta-form-item label="证件号码"
                          fieldDecoratorId="idCard"
                          class="spilwid1"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">

              <ta-input placeholder="请输入证件号码" />

            </ta-form-item>

            <ta-form-item>
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

              <ta-radio-button value="2">退出记录列表</ta-radio-button>

            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon='plus'
                       @click="goAdd">新增</ta-button>

          </div>
        </div>

        <ta-table :columns.sync="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  ref="table1"
                  @change="handleTableChange"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">

            <span>{{ size * (page - 1) + c + 1 }}</span>

          </span>
          <span slot="censusRegisterDetailAll"
                slot-scope="a, b, c">

            <span v-if="a">{{a.indexOf('全国合计')==-1?a:a.substring(4,a.length)}}</span>
            <span v-else>{{a}}</span>

          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="nowkey=='2'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">修改</span>

            <ta-popconfirm v-if="nowkey=='0'"
                           title="确认删除吗?"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">

              <span class="com_textdel">删除</span>

            </ta-popconfirm>

            <span v-if="nowkey=='1'||nowkey=='3'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>

            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">修改</span>

            <span v-if="nowkey=='1'"
                  @click="over(val,obj,index)"
                  class="com_publish">退出</span>

            <span v-if="nowkey=='2'"
                  @click="reOver(val,obj,false)"
                  class="com_publish">恢复</span>

            <span v-if="nowkey=='2'"
                  @click="over(val,obj,'see')"
                  class="com_text_out">退出原因</span>

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
                            :disabled='orSee'
                            :disabledDate="disabledDate" />

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
const mixColumns1 = [

  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '上报日期',
    width: '22%',
    align: 'center',
    dataIndex: 'reportTime',
    overflowTooltip: true
  },

  {
    title: '留守妇女编号',
    width: '24%',
    dataIndex: 'womenNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '22%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    width: '20%',
    align: 'center',
    dataIndex: 'birthday',

    overflowTooltip: true
  },

  {
    title: '户籍地址',
    width: '22%',
    dataIndex: 'censusRegisterDetailAll',
    scopedSlots: { customRender: 'censusRegisterDetailAll' },
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '250px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const mixColumns2 = [

  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '退出日期',
    width: '10%',
    align: 'center',
    dataIndex: 'exitTime',
    overflowTooltip: true
  },

  {
    title: '留守妇女编号',
    width: '13%',
    dataIndex: 'womenNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '12%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    width: '10%',
    align: 'center',
    dataIndex: 'birthday',

    overflowTooltip: true
  },
  // {
  //   title: '证件号码',
  //   width: '12%',
  //   dataIndex: 'idCard',
  //   overflowTooltip: true
  // },
  {
    title: '户籍地址',
    width: '15%',
    dataIndex: 'censusRegisterDetailAll',
    scopedSlots: { customRender: 'censusRegisterDetailAll' },
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
        // mixGetDataListURL0: '/LeftOverWomen/listChange', // 数据列表接口，API地址
        mixGetDataListURL: '/LeftOverWomen/list'// 暂存。0
      },
      dataSource: [],
      mixColumns: mixColumns1,
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

      nowkey: '0',
      orSee: false

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
    console.log(this.Base.getNowPageParam())
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '0'
    } else {
      this.nowkey = '0'
    }
    // if (this.nowkey == 1) {
    //   this.$refs.table1.hideColumns(['exitTime'])
    //   // this.$refs.table1.showColumns(['reportTime'])
    // } else {
    //   this.$refs.table1.hideColumns(['reportTime'])
    //   // this.$refs.table1.showColumns(['exitTime'])
    // }
  },
  methods: {
    goAdd () {
      this.$router.push({
        name: 'womenStayingAtHome',
        query: {

          nowkeys: 0
        }
      })
    },
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
    // 禁用时间,不能选择比当前时间大的日期
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'womenStayingAtHome',
        query: {
          id: obj.id, // 未定id
          disabled: tp,
          nowkeys: this.nowkey
        }
      })
    },

    async over (value, obj, index) {
      this.visible = true
      if (index == 'see') {
        this.orSee = true
        const res = await this.post('/LeftOverWomen/queryById', { id: obj.id }) // id未定
        const data = res.data.data
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
    async reOver (value, obj, tp) {
      const chenck = await this.post('/LeftOverWomen/getTroubleChildMsgByChildId', { womenNumber: obj.womenNumber }) // id未定
      if (chenck.data.data == 1) {
        this.$message.error('该妇女处于待提交恢复状态或正在监护中，不允许再次恢复！')
      } else {
        this.$router.push({
          name: 'womenStayingAtHome',
          query: {
            id: obj.id, // 未定
            disabled: tp,
            url: '/LeftOverWomen/restoreGuardianship',
            nowkeys: this.nowkey
          }
        })
      }
    },
    async submit () {
      const param = this.form.getFieldsValue()
      param.exitTime = moment(param.exitTime).format('YYYY-MM-DD')

      this.form.validateFields(async (err, values) => {
        if (!err) {
          const res = await this.post('/LeftOverWomen/saveExitMsg', param)
          if (!res.errors) {
            this.onClose()
            this.handleSubmit()
          }
        }
      })
    },
    typechange (key) {
      this.nowkey = key.target.value
      this.$nextTick(() => {
        if (this.nowkey == 1 || this.nowkey == 0) {
          this.mixColumns = mixColumns1
          // if (this.nowkey == 0) {
          //   this.mixGetDataListURL = mixGetDataListURL
          // } else {
          //   this.mixGetDataListURL = mixGetDataListURL0
          // }
        } else {
          this.mixColumns = mixColumns2
          // this.mixGetDataListURL = mixGetDataListURL0
        }
      })
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

.spilwid1 {
  width: 320px;
}
</style>
