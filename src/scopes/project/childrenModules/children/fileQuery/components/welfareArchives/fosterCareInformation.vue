<template>
  <div>
    <div class="butnclass">
      <ta-button type="primary"
                 @click="trackRecord"
                 :disabled='this.chose_data.length==0'>寄养情况跟踪评估记录</ta-button>
      <ta-button type="primary"
                 @click="expenditureRecord"
                 :disabled='this.chose_data.length==0'>寄养经费记录</ta-button>
    </div>
    <ta-table bordered
              class="tables table-min-width"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="mixDataList"
              :rowSelection="mixRowSelection">
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
    title: '主要照料人姓名',
    dataIndex: 'primaryCaregiverName',
    width: '12%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '7%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '10%'
  },
  {
    title: '寄养关系确定日期',
    dataIndex: 'fosterRelationConfirmDate',
    width: '13%'
  },
  {
    title: '寄养开始日期',
    width: '15%',
    dataIndex: 'fosterStartDate'
  },
  {
    title: '寄养结束日期',
    dataIndex: 'forsterEndDate',
    width: '10%'
  },
  {
    title: '寄养状态',
    dataIndex: 'relationStatus',
    width: '10%'
  },
  {
    title: '寄养关系解除原因',
    dataIndex: 'cancelFosterRelationReason',
    width: '12%'
  },
  {
    title: '寄养关系解除日期',
    dataIndex: 'cancelFosterRelationDate',
    width: '12%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
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
        mixGetDataListURL: '/fosterRecord/list' // 数据列表接口，API地址
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
      // return {}
    },
    // 查看详情
    look (e) {
      this.$emit('FosterCareLook', e)
    },
    // 寄养情况跟踪评估记录
    trackRecord () {
      this.$emit('setFosterCareType', '1')
    },
    // 寄养经费记录
    expenditureRecord () {
      this.$emit('setFosterCareType', '2')
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
