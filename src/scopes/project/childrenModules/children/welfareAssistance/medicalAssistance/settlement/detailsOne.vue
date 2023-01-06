<template>
  <div class="searchdata tadrawer">
    <!-- 结算明细 -->
    <ta-border-layout :header-cfg="{showBorder:false}" :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline" :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
        </ta-form>
         <template>
          <ta-button class="marginBtm" @click="back()">返回</ta-button>
          <!-- <ta-button type="primary" class="marginBtm" @click="save()">保存</ta-button> -->
        </template>
        <ta-table
          class="tables table-min-width"
          :columns="tableColumns"
          :showOverflowTooltip="true"
          :dataSource="tableData"
          bordered
        >
          <span slot="num" slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a
            slot="name"
            slot-scope="val,obj,index"
            href="javascript:;"
            @click="childInfo(val,obj,index)"
          >{{obj.name}}</a>
          <span slot="auditDate" slot-scope="text,obj,index">{{text | auditDate}}</span>
          <div slot="auditDate" slot-scope="val,obj,index">
            <span>
              <span>{{val | datafilter}}</span>
            </span>
          </div>
          <div
            slot="action"
            slot-scope="text,obj,index"
           class="btnlist"
          >
          <span
          class="com_textsee"
          @click="addAdoption(text,obj,index)">详情</span>
         </div>
        </ta-table>
        <ta-pagination
          class='pagination'
          showSizeChanger
          showQuickJumper
          :dataSource.sync="tableData"
          
          :params="userPageParams"
          @change="pagechange"
          :url="mixListOptions.mixGetDataListURL"
          ref="gridPager"
        />
      </div>
    </ta-border-layout>

  </div>
</template>
<script>
import areaQuery from '@component/common/components/areaQuery'
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
    width: '13%',
    dataIndex: 'childNumber'
  },
  {
    title: '姓名',
    width: '13%',
    scopedSlots: { customRender: 'childName' },
    dataIndex: 'childName'
  },
  {
    title: '救治病种类型',
    width: '13%',
    dataIndex: 'rescueDiseaseType',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '救治病种名称',
    width: '13%',
    dataIndex: 'rescueDiseaseName'
  },
  {
    title: '所属单位',
    width: '13%',
    dataIndex: 'orgName'
  },
  //   {
  //     title: '治疗次数',
  //     width: '13%',
  //     dataIndex: 'treatmentNumber'
  //   },
  {
    title: '医疗康复费用总金额（元）',
    width: '13%',
    dataIndex: 'rehabilitation'

  },
  {
    title: '申请明天计划资助总金额（元）',
    width: '13%',
    dataIndex: 'fund'
  },
  {
    title: '结账状态',
    width: '13%',
    dataIndex: 'status'

  },
  {
    title: '结账审定日期',
    width: '13%',
    dataIndex: 'settlementDate'

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
  name: 'revoke',
  components: {
    areaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueSettleAccounts/childDetailList' // 数据列表接口，API地址
      },
      visible: false,
      types: '1',
      ishide: true,
      mixPageRef: 'gridPager',
      fileldName: 'address_Linkage',
      settlementIds: ''
      // diseasetypeList: []
    }
  },
  mounted () {
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.settlementIds = ''
    let data = JSON.parse(this.$route.query.obj)
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      let data = JSON.parse(this.$route.query.obj)
      let params = {}
      params.ids = data.settlementIds
      return params
    },
    addAdoption (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'approvalCloseAccountBatches',
        query: {
          obj: str,
          index: index,
          goType: 'details'
        }
      })
    },
    back () {
      this.$router.go(-1)
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
  width: 350px;
}

.marginBtm {
  margin-bottom: 15px;
}
</style>
