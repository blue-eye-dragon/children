<template>
  <div>
    <ta-table bordered
              class="tables table-min-width"
              style="padding-top: 17px;"
              :showOverflowTooltip="true"
              :columns="tableColumns"
              :dataSource="tableData">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <div slot="action"
           slot-scope="e,obj,index"
           class="btnlist">
        <span @click="look(e, obj, index)"
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
    title: '体检日期',
    dataIndex: 'physicalExaminationDate',
    width: '13%'
  },
  {
    title: '身高(cm)',
    dataIndex: 'height',
    width: '12%'
  },
  {
    title: '体重(kg)',
    dataIndex: 'weight',
    width: '12%'
  },
  {
    title: '体检总结',
    dataIndex: 'physicalExaminationSummary',
    width: '16%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '13%'
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
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryChildArchivesPhyInfo', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  mounted () {
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },
    look (e, obj, index) {
      this.$emit('physicalLook', obj)
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
