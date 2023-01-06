<template>
  <div class="searchdata">
    <!--信息上报审核  -->
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
                          style="width:320px"
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
        <div class="radioClass visitbtntop">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="1">待审核</ta-radio-button>
            <ta-radio-button value="3">通过</ta-radio-button>
            <ta-radio-button value="4">驳回</ta-radio-button>
            <ta-radio-button value="5">全部</ta-radio-button>
          </ta-radio-group>
        </div>
        <!-- <ta-tabs @change="typechange" defaultActiveKey="5">
          <ta-tab-pane tab="全部" key="5"></ta-tab-pane>
          <ta-tab-pane tab="待审核" key="1"></ta-tab-pane>
          <ta-tab-pane tab="通过" key="3"></ta-tab-pane>
          <ta-tab-pane tab="驳回" key="4"></ta-tab-pane>
        </ta-tabs> -->
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
          <!-- <div slot="idCard" slot-scope="val,obj,index" >
            <span>{{val?val.substr(0,4)+'***'+val.substr(14,val.length):'-'}}</span>
          </div> -->
          <div slot="currentStatusLabel"
               slot-scope="a,b,c">
            <span v-if="b.currentStatus==2"
                  class="com_tobesubmitted">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==1"
                  class="com_tobeaudited">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==3"
                  class="com_adopt">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==4"
                  class="com_reject">{{b.currentStatusLabel}}</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">

            <span @click="addAdoption(obj,true)"
                  v-if="obj.currentStatus==1||obj.currentStatus==0"
                  class='com_audit'>审核</span>
            <span @click="addAdoption(obj,false)"
                  v-else
                  class='com_textsee'>查看</span>
            <span v-if="obj.currentStatus!=0"
                  @click="auditLog(obj,index)"
                  class="com_textedit">审核记录</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
    width: '24%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '15%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '11%'
  //   // scopedSlots: { customRender: 'idCard' }
  // },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '16%',
    align: 'center'
  },
  {
    title: '上报日期',
    dataIndex: 'reportTime',
    width: '16%',
    align: 'center'
  },
  {
    title: '上报单位',
    dataIndex: 'reportUnit',
    width: '16%'
  },
  {
    title: '当前状态',
    dataIndex: 'currentStatusLabel',
    scopedSlots: { customRender: 'currentStatusLabel' },
    width: '14%',
    align: 'center'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '1',
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/AddUnattendedChildApi/pageAuditUnattendedChild' // 数据列表接口，API地址
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
      this.nowkey = '1'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    auditLog (a, b) {
      this.$router.push({
        name: 'auditLog',
        query: {
          obj: JSON.stringify(a)
        }
      })
    },
    addAdoption (val, isdisabled) {
      const status = isdisabled ? 2 : 6
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          audit: true,
          status: status,
          id: val.addUnattendedId,
          childtypedisabled: 1,
          isdisabled: 1,
          currentStatus: val.currentStatus
        }
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.pageFlag = 1
      formData.orgId = this.orgId
      formData.areaCode = this.areaCode
      // if (this.key != 0) {
      formData.type = this.nowkey
      // }
      this.changetime(formData)
      return formData
    }
  }
}
</script>
<style scoped lang="less">
</style>
