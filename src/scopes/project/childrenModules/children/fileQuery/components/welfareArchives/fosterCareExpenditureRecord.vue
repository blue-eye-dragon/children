<template>
  <div>
    <div class="butnclass">
      <ta-button @click="returns">返回</ta-button>
    </div>
    <ta-table bordered
              class="tables table-min-width"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="mixDataList">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <template slot="name"
                slot-scope="a,b,c">
        <a><span @click="childDetail(b)">{{a}}</span></a>
      </template>
      <div slot="action"
           slot-scope="text,obj,index"
           class="btnlist">
        <span @click="look(obj)"
              class="com_textsee">查看</span>
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
    title: '年度',
    width: '7%',
    dataIndex: 'year'
  },
  {
    title: '发放周期',
    width: '7%',
    dataIndex: 'sentoutCycle',
    collectionType: 'ISSUINGCYCLE'
  },
  {
    title: '发放月份',
    width: '12%',
    dataIndex: 'sentoutDateStyle'
  },
  {
    title: '养育费用补贴（元）',
    width: '12%',
    dataIndex: 'upbringingCostsAllowance'
  },
  {
    title: '劳务补贴（元）',
    width: '10%',
    dataIndex: 'labourServicesAllowance'
  },
  {
    title: '寄养工作经费（元）',
    width: '12%',
    dataIndex: 'fosterWorkOutlay'
  },
  {
    title: '总计（元）',
    width: '8%',
    dataIndex: 'totalOutlay'
  },
  {
    title: '登记人',
    width: '15%',
    dataIndex: 'registerMenber'
  },
  {
    title: '登记日期',
    width: '12%',
    dataIndex: 'registerDate'
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
  mixins: [listMixin],
  props: ['childBaseId'],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/fosterOutlay/list' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      disabled: false

    }
  },
  mounted () {
    this.handleSubmit()
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      return { childBaseId: this.childBaseId }
    },
    // 查看详情
    look (e) {
      this.$emit('fosterCareExpenditureRecordLook', e)
    },
    // 返回
    returns () {
      this.$emit('setFosterCareType', '0')
    }
  }
}
</script>
<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.butnclass {
  padding: 1% 0;
}
</style>
