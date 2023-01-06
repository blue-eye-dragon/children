<template>
  <div>
    <ta-table bordered
              class="tables table-min-width"
              style="padding-top: 17px;"
              :columns="tableColumns"
              :dataSource="tableData"
              :showOverflowTooltip="true">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <div slot="action"
           slot-scope="e,obj,index"
           class="btnlist">
        <span @click="look(e,obj,index)"
              class="com_textsee">查看</span>
      </div>
    </ta-table>
    <ta-pagination  :defaultCurrent="page"
                   
                   class='pagination'
                   showSizeChanger
                   showQuickJumper
                   :dataSource.sync="tableData"
                   
                   :params="userPageParams"
                   @change="pagechange"
                   :url="mixListOptions.mixGetDataListURL"
                   ref="gridPager" />
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '疫苗名称',
    dataIndex: 'vaccineName',
    width: '23%'
  },
  {
    title: '疫苗批号',
    dataIndex: 'vaccineBatchNumber',
    width: '23%'
  },
  {
    title: '接种日期',
    dataIndex: 'inoculateTime',
    width: '21%'
  },
  {
    title: '是否已接种',
    dataIndex: 'isInoculated',
    collectionType: 'YESNO',
    width: '20%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '21%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
    // fixed: 'right'
  }
]
export default {
  mixins: [listMixin],
  name: 'revoke',
  props: ['childBaseId'],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryChildArchivesVaccinationInfo' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'

    }
  },
  activated () { },
  mounted () {
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },

    look (e, obj, index) {
      this.$emit('vaccinationLook', obj)
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
