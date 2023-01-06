<template>
  <div class="searchdata"
       id="content">
    <!-- 身份状态变更记录 -->
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          class="spilwid"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入身份证号"></ta-input>
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
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="9">待提交</ta-radio-button>
              <ta-radio-button value="1">待审核</ta-radio-button>
              <ta-radio-button value="3">通过</ta-radio-button>
              <ta-radio-button value="4">驳回</ta-radio-button>
              <ta-radio-button value="5">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">

            <ta-button type="primary"
                       icon='plus'
                       @click="toNew">新增</ta-button>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{see(null,record,index)}}})"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>

          <span slot="reportTime"
                slot-scope="a,b,c">
            {{a=='1970-01-01'?'--':a}}
          </span>

          <div slot="currentStatusLabel"
               slot-scope="a,b,c">
            <span v-if="b.currentStatus==2||a == '待提交'"
                  class="com_tobesubmitted">待提交</span>
            <span v-if="b.currentStatus==1"
                  class="com_tobeaudited">待审核</span>

            <span v-if="nowkey!=9&&b.currentStatus==3"
                  class="com_adopt">通过</span>

            <span v-if="b.currentStatus==4"
                  class="com_reject">驳回</span>
          </div>
          <div slot="fatherStatu"
               slot-scope="a,b,c">
            {{setData(b)}}
          </div>
          <div slot="fatherTimeEnd"
               slot-scope="a,b,c">
            {{(b.fatherTimeEnd?b.fatherTimeEnd:'--')+'/'+(b.motherTimeEnd?b.motherTimeEnd:'--')}}
          </div>

          <div v-if="nowkey==9"
               slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  v-if="obj.currentStatus=='3' "
                  @click="see9(text,obj,index)">查看</span>

            <span class="com_textedit"
                  v-if="obj.currentStatus=='3' "
                  @click="addAdoption(text,obj,index)">减员</span>
            <span class="com_textedit"
                  v-if="obj.currentStatus=='2'||obj.currentStatus=='0'"
                  @click="edit(text,obj,index)">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.currentStatus=='2'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <span class="com_continue"
                  @click="openBack(obj)"
                  v-if="obj.currentStatus=='0'">退回</span>
          </div>
          <div v-else
               slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  v-if="obj.currentStatus=='3'||obj.currentStatus=='4'||obj.currentStatus=='1'||obj.currentStatus=='9'"
                  @click="see(text,obj,index)">查看</span>
            <span class="com_textedit"
                  v-if="obj.currentStatus == '9' "
                  @click="addAdoption(text,obj,index)">减员</span>
            <span class="com_textreject"
                  v-if="obj.currentStatus=='1'"
                  @click="returnBack(text,obj,index)">撤回</span>
            <span class="com_textedit"
                  v-if="obj.currentStatus=='2'||obj.currentStatus=='0'||obj.currentStatus=='4'"
                  @click="edit(text,obj,index)">编辑</span>
            <span class="com_continue"
                  @click="openBack(obj)"
                  v-if="obj.isAnotherPlaceApply=='3'">退回</span>

            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.currentStatus=='2'||obj.currentStatus=='0'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>

        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="mixPageRef" />
      </div>
      <ta-drawer title="退回原因"
                 width="500px"
                 placement="right"
                 :closable="false"
                 :maskClosable="false"
                 :visible="contentVisible"
                 :getContainer="setContainer">
        <ta-form layout="inline"
                 :autoFormCreate="(form)=>{this.backForm=form}">
          <ta-form-item label="退回原因"
                        fieldDecoratorId="remark"
                        style="width:450px"
                        :fieldDecoratorOptions="this.verificationRules('退回原因', 60,false)"
                        :labelCol="{ span:5}"
                        :wrapperCol="{ span: 19 }">
            <ta-textarea placeholder="请输入退回原因"
                         :rows="10" />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button style="margin-right: 8"
                     @click="onClose">
            返回
          </ta-button>
          <ta-button @click="onSubmit"
                     type="primary">提交</ta-button>
        </div>
      </ta-drawer>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '15%'
  },
  {
    title: '儿童姓名',
    align: 'center',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '15%',
    collectionType: 'SEX'
  },

  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '15%'
  },
  {
    title: '上报日期',
    dataIndex: 'reportTime',
    align: 'center',
    scopedSlots: { customRender: 'reportTime' },
    width: '15%'
  },
  {
    title: '上报单位',
    dataIndex: 'reportUnit',
    align: 'center',
    width: '15%'
  },
  {
    title: '当前状态',
    align: 'center',
    dataIndex: 'currentStatusLabel',
    scopedSlots: { customRender: 'currentStatusLabel' },
    width: '15%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
]
const tableColumns2 = [
  {
    title: '序号',
    dataIndex: 'num',
    overflowTooltip: true,
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童编号',
    overflowTooltip: true,
    dataIndex: 'childNumber',
    width: '15%'
  },
  {
    title: '儿童姓名',
    overflowTooltip: true,
    align: 'center',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '性别',
    overflowTooltip: true,
    dataIndex: 'sex',
    align: 'center',
    width: '15%',
    collectionType: 'SEX'
  },

  {
    title: '出生日期',
    overflowTooltip: true,
    dataIndex: 'birthday',
    align: 'center',
    width: '15%'
  },
  {
    title: '上报日期',
    overflowTooltip: true,
    dataIndex: 'reportTime',
    align: 'center',
    scopedSlots: { customRender: 'reportTime' },
    width: '15%'
  },
  {
    title: '上报单位',
    overflowTooltip: true,
    dataIndex: 'reportUnit',
    align: 'center',
    width: '15%'
  },
  {
    title: '当前状态',
    align: 'center',
    overflowTooltip: true,
    dataIndex: 'currentStatusLabel',
    scopedSlots: { customRender: 'currentStatusLabel' },
    width: '15%'
  },
  {
    title: '父/母现状况',
    dataIndex: 'fatherStatu',
    overflowTooltip: true,
    width: '25%',
    scopedSlots: { customRender: 'fatherStatu' }
  },
  {
    title: '父/母状况结束日期',
    dataIndex: 'fatherTimeEnd',
    align: 'center',
    overflowTooltip: true,
    width: 230,
    scopedSlots: { customRender: 'fatherTimeEnd' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '9',
      tableColumns: this.tableColumns1,
      tableColumns1,
      tableColumns2,

      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL:
          '/changeStatusUnattendedApi/pageApplyChangeStatusUnattended' // 数据列表接口，API地址
      },
      mixPageRef: 'mixPageRef',
      contentVisible: false,
      key: '5',
      orgId: '',
      areaCode: '',
      obj: {},
      backObj: {},
      situationList: []

    }
  },
  mounted () {
    this.orgId = window.parent.indexTool.getUserInfo().orgId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.getDict()
  },
  activated () {
    this.tableColumns = this.tableColumns1
    if (this.Base.getNowPageParam()._modulePartId_ == '3') {
      this.nowkey = '3'
    } else if (this.Base.getNowPageParam()._modulePartId_ == '4') {
      this.nowkey = '4'
    } else if (this.Base.getNowPageParam()._modulePartId_ == '2') {
      this.nowkey = '1'
    } else {
      this.nowkey = '9'
      this.tableColumns = this.tableColumns2
    }
    this.obj = {}
    this.backObj = {}
    this.contentVisible = false
    const url = window.location.href
    var params = url.split('?')[1].split('&')
    params.map((item) => { this.obj[item.split('=')[0]] = item.split('=')[1] })
  },
  methods: {
    setData (v) {
      let far = '--', mo = '--'
      this.situationList.forEach((e) => {
        if (e.value == v.fatherStatu) {
          far = e.label
        }
        if (e.value == v.motherStatu) {
          mo = e.label
        }
      })
      return far + '/' + mo
    },
    async getDict () {
      this.situationList = await this.getDictionaries('PRESENTSITUATION')
    },
    // 新增
    toNew () {
      this.$router.push({
        name: 'factRaiseChildStatusChange',
        query: {
          goto: 1

        }
      })
    },

    //   编辑
    async edit (text, obj, index) {
      // 判断是否为驳回编辑，驳回时重新获取数据
      if (obj.currentStatus == '4') {
        // 驳回时编辑获取数据请求
        const res = await this.post('/changeStatusUnattendedApi/detailChangeStatusUnattended', { changeStatusId: obj.changeStateId })
        if (res.errors == []) {
          obj = res.data.data
        }
      }
      const str = {
        obj: obj,
        index: index,
        goType: 'infoChangeReportRecord-edit'
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'actualUnaccChildStatuChangeFor',
        query: {
          paramsData
        }
      })
    },
    //   撤回
    returnBack (text, obj, index) {
      let approval = false
      if (obj.currentStatus == '0') {
        // 待提交(撤回)
        approval = false
      }
      const str = {
        obj: obj,
        index: index,
        approval: approval,
        goType: 'infoChangeReportRecord-reject'
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'actualUnaccChildStatuChangeFor',
        query: {
          paramsData
        }
      })
    },
    //   查看
    see (text, obj, index) {
      let approval = false
      if (obj.currentStatus == '4') {
        // 驳回
        approval = true
      } else if (obj.currentStatus == '3') {
        // 通过
        approval = true
      } else if (obj.currentStatus == '1') {
        // 待审核
        approval = false
      }
      const str = {
        obj: obj,
        index: index,
        approval: approval,
        goType: 'infoChangeReportRecord-see'
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'actualUnaccChildStatuChangeFor',
        query: {
          paramsData
        }
      })
    },
    async dels (text, obj, index) {
      const params = {
        changeStatusId: obj.changeStateId
      }
      this.post(
        '/changeStatusUnattendedApi/deleteChangeStatusUnattended',
        params
      ).then(res => {
        if (res.errors == null) {
          this.$message.success('删除成功')
          this.handleSubmit()
        }
      })
    },
    setContainer () {
      return document.getElementById('content')
    },
    // 打开退回栏
    openBack (obj) {
      this.backObj = obj
      this.contentVisible = true
      this.backForm.resetFields()
    },
    onClose () {
      this.contentVisible = false
      this.backForm.resetFields()
    },
    onSubmit () {
      const params = this.backForm.getFieldsValue()
      params.changeStatusId = this.backObj.changeStateId
      const _self = this
      _self.post('changeStatusUnattendedApi/backToUnattendedChild', params).then(res => {
        if (res.data.data) {
          _self.$message.success('退回成功!')
          _self.contentVisible = false
          _self.handleSubmit()
        }
      })
    },
    see9 (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          id: obj.addUnattendedId,
          childtypedisabled: 1,
          isdisabled: 1
        }
      })
    },
    addAdoption (text, obj, index) {
      const str = {
        leg: true,
        obj: obj,
        index: index,
        goType: 'factRaiseChildStatusChange-apply'
      }
      const paramsData = JSON.stringify(str)
      this.post('/unattendedStateChangeApi/checkStateChangeApply', { addUnattendedId: obj.addUnattendedId }).then((res) => {
        if (res.data.data == '1') {
          this.$message.error('该儿童已提出减员申请，还未审核，请等待审核完成后再提身份状态变更申请', 5)
        } else {
          this.$router.push({
            name: 'actualUnaccChildStatuChangeFor',
            query: {
              paramsData
            }
          })
        }
      })
    },

    typechange (val) {
      this.nowkey = val.target.value
      if (this.nowkey != 9) {
        this.tableColumns = this.tableColumns1
      } else {
        this.tableColumns = this.tableColumns2
      }
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.pageFlag = 0
      formData.orgId = this.orgId
      formData.areaCode = this.areaCode
      formData.type = this.nowkey
      if (this.obj.workbenchType == '1' && formData.type == '9') {
        formData.workbenchType = 1
      }

      return formData
    }
  }
}
</script>
