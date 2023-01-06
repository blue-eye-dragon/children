<template>
  <!-- 实事无人抚养儿童管理 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

          <div class="visitbtn">
            <ta-button type="primary"
                       @click="back">返回</ta-button>
            <!-- <ta-button style=" margin-left: 10px;" class="exportbtn" @click="showModal">导出</ta-button>
            <ta-modal
              :centered="false"
              style="top: 25%;"
              :visible="showOn"
              @ok="Excel"
              @cancel="handleCancel"
            >
              <div>
                <h3>确认导出全部有效数据吗？</h3>
              </div>
            </ta-modal> -->
          </div>
        </ta-form>

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  class="table-min-width"
                  :showOverflowTooltip="true"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"  class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"

                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
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
import AreaQuery from '@component/common/components/areaQuery'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '发放月份',
    width: '12%',
    dataIndex: 'issuingYears',
    overflowTooltip: true
  },
  {
    title: '当月发放金额(元)',
    width: '14%',
    dataIndex: 'costOfLiving',
    overflowTooltip: true
  },
  {
    title: '补发放月份',
    width: '12%',
    dataIndex: 'replacementYears',
    overflowTooltip: true
  },
  {
    title: '补发放金额(元)',
    width: '12%',
    dataIndex: 'replacementAmount',
    overflowTooltip: true
  },
  {
    title: '总金额(元)',
    width: '10%',
    dataIndex: 'costOfLivingTotal',
    overflowTooltip: true
  },

  {
    title: '领取方式',
    width: '10%',
    dataIndex: 'receiveType',
    collectionType: 'PAYMENT',
    overflowTooltip: true
  },
  {
    title: '领取人',
    width: '10%',
    dataIndex: 'receivePerson',
    overflowTooltip: true
  },

  {
    title: '银行账号',
    width: '12%',
    dataIndex: 'bankAccount',
    overflowTooltip: true
  },
  {
    title: '发放日期',
    width: '12%',
    dataIndex: 'issuingDate',
    overflowTooltip: true
  }
]
const mixDataList = [

]
var that = ''
export default {
  mixins: [listMixin],
  components: {
    AddressComponent,
    AreaQuery
  },
  data () {
    return {
      mixPageRef: 'mixPageRef',
      showOn: false,
      page: 1,
      size: 10,
      width: '500px',
      mixListOptions: {
        mixGetDataListURL: '/orphanLivingExpensesAndChildren/list' // 数据列表接口，API地址
      },
      mixColumns: mixColumns,
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList,
      addressmodel: [],
      baseId: ''

    }
  },
  created () {
    that = this
  },
  mounted () {
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
  },
  activated () {
    this.baseId = this.$route.query.baseId
  },
  methods: {
    moment,

    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.childId = this.baseId

      return formData
    },
    back () {
      this.$router.go(-1)
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    Excel () {
      var data = { childId: this.baseId }
      this.exportFile('/orphanLivingExpenses/exportUnmennedLivingExpensesDetail', data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    }
  },
  filters: {

  }
}
</script>

<style scoped lang="less">
.active {
  /* background: #eee; */
  color: #1e82d2;
  font-weight: bolder;
}
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.but {
  margin-left: 20px;
}
</style>
