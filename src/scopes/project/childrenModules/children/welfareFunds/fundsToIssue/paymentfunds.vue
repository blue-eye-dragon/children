<template>
  <!-- =孤儿基本生活费发放详情 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item class="spilwid">
            <ta-button class="btnleft exportbtn"
                       @click="showModal">批量导出</ta-button>
            <ta-modal :visible="showOn"
                      @ok="handleOk"
                      @cancel="handleCancel">
              <div v-if="areaCode||issueYears">
                <h3>确认导出当前条件下的全部有效数据吗？</h3>
                <P>地区 : {{areaCode}}</P>
                <p>员工姓名 : {{issueYears}}</p>
              </div>
              <div v-if="!areaCode&&!issueYears">
                <h3>确认导出全部有效数据吗？</h3>
              </div>
            </ta-modal>
            <ta-button class="btnleft"
                       v-if="isFromSearch"
                       @click="backsSearch">返回</ta-button>
            <ta-button class="btnleft"
                       v-if="!isFromSearch"
                       @click="back">返回</ta-button>
          </ta-form-item>
        </ta-form>
        <ta-table bordered
                  class="tables"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj)">查看</span>
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
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import AddressComponent from '@component/common/components/addressComponent'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '地区',
    dataIndex: 'areaName',
    overflowTooltip: true
  },
  {
    title: '发放年月',
    dataIndex: 'issuingYears'
  },
  {
    title: '当月发放金额（元）',
    dataIndex: 'costOfLiving',
    width: 160
  },
  {
    title: '补发放年月',
    dataIndex: 'replacementYears'
  },
  {
    title: '补发放金额（元）',
    dataIndex: 'replacementAmount'
  },
  {
    title: '资金发放总额（元）',
    dataIndex: 'costOfLivingTotal',
    width: 160
  },
  {
    title: '领取方式',
    dataIndex: 'receiveType'
  },
  {
    title: '领取人',
    dataIndex: 'receivePerson',
    collectionType: 'PAYMENT'
  },
  {
    title: '银行账号',
    dataIndex: 'bankAccount'
  },
  {
    title: '发放日期',
    dataIndex: 'createTime'
  }
]

export default {
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      showOn: false,
      issueYears: '',
      areaCode: '',

      mixDataList: [],
      mixListOptions: {
        mixGetDataListURL: 'orphanLivingExpensesAndChildren/queryByChildId', // 数据列表接口，API地址
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },

      tableColumns,
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      childType: '',
      sexList: [],
      childTypeList: [],
      paymentList: [],
      childId: '',
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  computed: {},
  activated () {
    this.isFromSearch = false
    this.formDataSearch = {}
    this.childId = this.$route.query.childId
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    // this.getDataList()
  },
  mounted () {
    this.getsexList()
    this.getchildType()
    this.getpayment()
  },
  methods: {
    // 领取方式 PAYMENT
    async getpayment () {
      const data = await this.getDictionaries('CHILDTYPE')
      this.paymentList = data
    },
    userPageParams () {
      const formData = {
        childId: this.childId,
        supportType: '1'
      }

      return formData
    },
    other (obj) {
      console.log(obj)
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      data.birthday = moment(data.birthday)
      data.issuingYears = moment(data.issuingYears)
      return data
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类型
    async getchildType () {
      const data = await this.getDictionaries('CHILDTYPE')
      this.childTypeList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    back () {
      this.$router.go(-1)
    },
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
    },
    showModal () {
      const ss = this.searchForm.getFieldsValue()
      console.log(ss)
      this.issueYears = ss.issueYears
      this.areaCode = ss.areaCode

      this.showOn = true
    },
    handleCancel (e) {
      console.log(e)
      this.showOn = false
    },
    handleOk (e) {
      console.log(e)
      this.exportFile('/orphanLivingExpenses/list')
      this.showOn = false
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
