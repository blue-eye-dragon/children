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
    <ta-pagination  :defaultCurrent="page"  class='pagination'
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
    title: '患病名称',
    dataIndex: 'patientName'
  },
  {
    title: '治疗日期',
    dataIndex: 'treatmentDate'
  },
  {
    title: '治疗医院',
    dataIndex: 'treatmentHospital'
  },
  {
    title: '治疗结果',
    dataIndex: 'treatmentResult'
  },
  {
    title: '陪同人员',
    dataIndex: 'accompanyMen'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  props: ['childBaseId', 'childFosterId'],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childArchives/queryMedicalInfoByChildFosterId', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager'

    }
  },
  activated () {
    if (this.childFosterId) {
      this.handleSubmit()
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
      return {
        childFosterId: this.childFosterId
      }
    },

    look (e, obj, index) {
      this.$emit('medicalLook', obj)
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
