<template>
  <!-- 通知list   -->

  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :forceRender="true"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="标题"
                          fieldDecoratorId="title"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">

              <ta-input placeholder="请输入标题" />

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

              <ta-radio-button value="1">已收到通知</ta-radio-button>

              <ta-radio-button value="2">已发送通知</ta-radio-button>

            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon='plus'
                       @click="NewMessage">发送通知</ta-button>
          </div>
        </div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  :customRow="fnCustomRow"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">

            <span>{{ size * (page - 1) + c + 1 }}</span>

          </span>
          <span slot="pushState"
                slot-scope="val,obj,index">
            <span :class="obj.pushState==0?'com_reject':'com_adopt'">{{obj.pushState==0?'未发送':'已发送'}}</span>
          </span>
          <span slot="readCounts"
                slot-scope="val,obj,index">
            <span>{{obj.readCounts+'/'+obj.counts}}</span>
          </span>
          <span slot="readState"
                slot-scope="val,obj,index">
            <span :class="obj.readState==0?'com_reject':'com_adopt'">{{obj.readState==0?'未读':'已读'}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="nowkey==1&&obj.readState==0"
                  @click="visit(val,obj,'yd')"
                  class="com_textsee">阅读</span>
            <span v-if="nowkey==1&&obj.readState==1"
                  @click="visit(val,obj,'yd2')"
                  class="com_textsee">查看</span>
            <span v-if="nowkey==2"
                  @click="visit(val,obj,'see')"
                  class="com_textsee">查看</span>
            <!-- <ta-divider v-if="nowkey==2&&obj.readCounts==0&&obj.pushState==0"
                        type="vertical" /> -->
            <span v-if="nowkey==2&&obj.readCounts==0&&obj.pushState==0"
                  @click="visit(val,obj,index)"
                  class="com_textedit">编辑</span>
            <!-- <ta-divider v-if="nowkey==2&&obj.readCounts==0&&obj.pushState==1"
                        type="vertical" /> -->
            <span v-if="nowkey==2&&obj.readCounts==0&&obj.pushState==1"
                  @click="withdraw(val,obj,index)"
                  class="com_revocation">撤回</span>
            <!-- <ta-divider v-if="nowkey==2&&obj.pushState==0"
                        type="vertical" /> -->
            <ta-popconfirm v-if="nowkey==2&&obj.pushState==0"
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
    title: '标题',
    width: '25%',
    dataIndex: 'title',
    overflowTooltip: true
  },
  {
    title: '接收时间',
    width: '25%',
    dataIndex: 'pushTime',
    overflowTooltip: true
  },
  {
    title: '发件人',
    width: '25%',
    dataIndex: 'pushName',
    // collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '状态',
    width: '25%',
    dataIndex: 'readState', // 0weidu 1yidu1
    scopedSlots: { customRender: 'readState' },
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
    title: '标题',
    width: '27%',
    dataIndex: 'title',
    overflowTooltip: true
  },
  {
    title: '发送时间',
    width: '25%',
    dataIndex: 'pushTime',
    overflowTooltip: true
  },

  {
    title: '阅读数量',
    width: '25%',
    dataIndex: 'readCounts',
    scopedSlots: { customRender: 'readCounts' },
    overflowTooltip: true
  },
  // {
  //   title: '阅读状态',
  //   width: '12%',
  //   dataIndex: 'readCounts',
  //   scopedSlots: { customRender: 'readCounts' },
  //   overflowTooltip: true
  // },
  {
    title: '发送状态',
    width: '25%',
    dataIndex: 'pushState',
    scopedSlots: { customRender: 'pushState' },
    overflowTooltip: true
  },
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
      childTypeList: [{ value: '4', label: '留守儿童' }, { value: '6', label: '困境儿童' }],
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
        mixGetDataListURL: '/announcements/receivedList', // 数据列表接口，API地址

        mixExportURL: '' // 导出接口，API地址
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

      nowkey: '1'

    }
  },
  mounted () {
    let nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
  },
  activated () {
    console.log(this.Base.getNowPageParam())
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '4'
    } else {

    }
  },
  methods: {
    async withdraw (v, o, i) {
      let res = await this.post('/announcements/undoOne', { id: o.id })
      if (!res.errors) {
        this.$message.success('撤回成功!')
        this.handleSubmit()
      }
    },
    NewMessage () {
      this.$router.push({
        name: 'contactsMessage',
        query: {

        }
      })
    },
    async del (v, o) { // 删除
      let res = await this.post('/announcements/updateDelStateById', { 'id': o.id })
      if (res.errors) {

      } else {
        this.$message.success('删除成功！')
        this.handleSubmit()
      }
    },
    cancel (e) { },

    async visit (val, obj, see) {
      if (see == 'yd' || see == 'yd2') {
        this.$router.push({
          name: 'contactsMessage',
          query: {
            id: obj.id, // 未定id
            disabled: 'see',
            content: obj.content,
            namePath: obj.createName,
            pushName: obj.pushName,
            title: obj.title,
            yd: true,
            fileList: obj.fileList

          }
        })
      } else {
        this.$router.push({
          name: 'contactsMessage',
          query: {
            id: obj.id, // 未定id
            disabled: see,
            content: obj.content,
            bj: true
          }
        })
      }
    },

    typechange (key) {
      this.nowkey = key.target.value
      if (this.nowkey == '1') {
        this.mixColumns = mixColumns1
        this.mixListOptions.mixGetDataListURL = '/announcements/receivedList'
      } else {
        this.mixListOptions.mixGetDataListURL = '/announcements/readList'
        this.mixColumns = mixColumns2
      }

      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      return formData
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

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

