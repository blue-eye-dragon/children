<template>
  <div>
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
                     :params="userPageParams"
                     :dataSource.sync="mixDataList"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     ref="gridPager" />
    </div>
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
    title: '缴费日期',
    dataIndex: 'payTime',
    width: '19%'
  },
  {
    title: '类型',
    dataIndex: 'medicalInsuranceType',
    collectionType: 'medicalInsuranceType',
    width: '20%'
  },
  {
    title: '周期',
    dataIndex: 'medicalInsuranceCycle',
    collectionType: 'medicalInsuranceCycle',
    width: '20%'
  },
  {
    title: '金额（元）',
    dataIndex: 'money',
    width: '20%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '19%'
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
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryChildArchivesMedicalInsuranceInfo', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager'

    }
  },
  mounted () {
  },
  methods: {
    // 查询参数
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查看
    look (e, obj, index) {
      this.$emit('medicalInsuranceLook', obj)
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
