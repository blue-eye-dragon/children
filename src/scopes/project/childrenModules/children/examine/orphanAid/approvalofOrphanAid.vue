<template>

  <!--信息上报审批  -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'80px',footer:'80px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        class="spilwid2"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入姓名" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        class="spilwid2"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-input placeholder="请输入身份证号"></ta-input>
          </ta-form-item>
          <ta-form-item label="申请日期"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        class="spilwid"
                        fieldDecoratorId="applyDate">
            <ta-range-picker @change="onSelectTime" />
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
      <div>
        <div class="visitbtntop">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="2">待审核</ta-radio-button>
            <ta-radio-button value="3">通过</ta-radio-button>
            <ta-radio-button value="4">驳回</ta-radio-button>
            <ta-radio-button value="">全部</ta-radio-button>
          </ta-radio-group>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{addAdoption(record,false)}}})"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="status"
               slot-scope="a,b,c">
            <span v-if="b.status==2"
                  class="com_tobeaudited">待审批</span>
            <span v-if="b.status==1"
                  class="com_tobeaudited">撤回</span>
            <span v-if="b.status==3"
                  class="com_adopt">通过</span>
            <span v-if="b.status==4"
                  class="com_reject">驳回</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span @click="addAdoption(obj,true)"
                  v-if="obj.status==2"
                  class='com_audit'>审核</span>

            <span @click="addAdoption(obj,false)"
                  v-if="obj.status!=2"
                  class='com_textsee'>查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
const tableColumns = [
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
    width: '10%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '11%'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '11%'
  },
  {
    title: '审批时间',
    dataIndex: 'auditDate',
    width: '10%'
  },
  {
    title: '当前状态',
    dataIndex: 'status',
    width: '10%',
    // collectionType: 'MEDICAL_RESCUE_NODE_STATUS',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '2',
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childrenInStudentAssistanceProjec/auditList' // 数据列表接口，API地址
      },
      key: '5',
      orgId: '',
      areaCode: ''
    }
  },
  mounted () {
    this.orgId = window.parent.indexTool.getUserInfo().orgId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
  },
  activated () {
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '2'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {
    onSelectTime (date, dateString) {
    },
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 审核、查看
    addAdoption (e) {
      let flag = 'look' // 审批true、查看fasle
      if (e.status == '2') { // 待审批
        flag = 'approval'
      }
      this.$router.push({
        name: 'aidApproval',
        query: { id: e.id, workflowId: e.workflowId, startWorkflowId: e.startWorkflowId, flag: flag }
      })
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData.pageFlag = 1
      formData.orgId = this.orgId
      formData.areaCode = this.areaCode
      // if (this.key != 0) {
      formData.status = this.nowkey
      // }
      this.changetime(formData)
      return formData
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.batchfrom {
  position: relative;
  width: 100%;
  height: 100%;
}
.boms {
  width: 100%;
  height: 58px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-right: 20px;
}
.spilwid {
  width: 300px;
}
.spilwid2 {
  width: 250px;
}
</style>
