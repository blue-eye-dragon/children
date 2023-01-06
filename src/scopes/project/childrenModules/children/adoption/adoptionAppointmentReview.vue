<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item class="spilwid2"
                          label="申请日期"
                          fieldDecoratorId="time"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-range-picker :placeholder="['开始时间', '结束时间']"
                               format="YYYY-MM-DD" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn radioClass">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="1">待审核</ta-radio-button>
            <ta-radio-button value="2">通过</ta-radio-button>
            <ta-radio-button value="5">驳回</ta-radio-button>
            <ta-radio-button value="">全部</ta-radio-button>
          </ta-radio-group>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="currentStatusLabel"
               slot-scope="text,record">
            <span v-if="record.auditStatus==='1'"
                  class="com_tobesubmitted">待审核</span>
            <span v-if="record.auditStatus==='2'||record.auditStatus==='3'||record.auditStatus==='4'"
                  class="com_tobeaudited">通过</span>
            <span v-if="record.auditStatus==='5'"
                  class="com_adopt">驳回</span>
            <span v-if="record.auditStatus==='6'"
                  class="com_cancle">已取消</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span @click="check(obj)"
                  v-if="obj.auditStatus==='1'"
                  class='com_audit'>审核</span>
            <span @click="look(obj)"
                  v-else
                  class='com_textsee'>查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :defaultCurrent="page"
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
    title: '申请日期',
    dataIndex: 'applicationTime',
    width: '9%'
  },
  {
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '10%'
  },
  {
    title: '被收养人姓名',
    dataIndex: 'childName',
    width: '9%'
  },
  // {
  //   title: '儿童身份证号',
  //   dataIndex: 'idCard',
  //   width: '11%'
  //   // scopedSlots: { customRender: 'idCard' }
  // },
  {
    title: '收养申请人姓名',
    dataIndex: 'name',
    width: '12%'
  },

  {
    title: '收养申请人身份证号',
    dataIndex: 'idCard',
    width: '14%'
  },
  {
    title: '审核日期',
    dataIndex: 'reviewTime',
    width: '9%'
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    align: 'center',
    scopedSlots: { customRender: 'currentStatusLabel' },
    width: '8%'
  },
  {
    title: '操作',
    align: 'center',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
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
        mixGetDataListURL: '/adoptionAppointment/approveandassesslist' // 数据列表接口，API地址
      }
    }
  },
  methods: {
    typechange (key) {
      this.nowkey = key.target.value
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.isAuditPage = '1'
      if (this.nowkey == '1') {
        formData.auditStatus = '1'
      }
      if (this.nowkey == '2') {
        formData.auditStatus = ''
        formData.auditStatusList = [2, 3, 4]
      }
      if (this.nowkey == '5') {
        formData.auditStatus = '5'
      }
      if (this.nowkey == '') {
        formData.auditStatus = ''
        formData.auditStatusList = [1, 2, 3, 4, 5]
      }
      this.changetime(formData)
      return formData
    },
    // 审核
    check (e) {
      this.$router.push({
        name: 'appointmentReview',
        query: {
          id: e.id,
          flag: 'check'
        }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'appointmentReview',
        query: {
          id: e.id,
          flag: 'look'
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.spilwid2 {
  width: 430px;
}
</style>
