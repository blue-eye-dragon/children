<template>
  <div>
    <ta-table bordered
              class="tables table-min-width"
              style="padding-top: 17px;"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="mixDataList">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <template slot="sponsorOrOrganizeName"
                slot-scope="a,b,c">
        <a><span @click="look(b)">{{a}}</span></a>
      </template>
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
    title: '助养人/组织',
    dataIndex: 'sponsorOrOrganizeName',
    scopedSlots: { customRender: 'sponsorOrOrganizeName' },
    width: '12%'
  },
  {
    title: '助养方类型',
    dataIndex: 'sponsorPartyType',
    collectionType: 'sex',
    width: '10%'
  },
  {
    title: '助养关系确定日期',
    dataIndex: 'determineDate',
    width: '10%'
  },
  {
    title: '助养关系开始日期',
    dataIndex: 'startDate',
    width: '10%'
  },
  {
    title: '助养关系结束日期',
    width: '15%',
    dataIndex: 'endDate'
  },
  {
    title: '助养状态',
    dataIndex: 'status',
    width: '10%'
  },
  {
    title: '助养关系解除原因',
    dataIndex: 'removeReason',
    width: '10%'
  },
  {
    title: '助养关系解除日期',
    dataIndex: 'removeDate',
    width: '10%'
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
        mixGetDataListURL: '/childArchives/querySponsorInfoByChildBaseId' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值

    }
  },
  mounted () {
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
    // 查看
    look (e) {
      this.$emit('fosterLook', e)
    }
  }
}
</script>
<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
