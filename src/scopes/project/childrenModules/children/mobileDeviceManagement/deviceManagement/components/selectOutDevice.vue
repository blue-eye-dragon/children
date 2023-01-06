<!--
 * @Date: 2021-06-24 16:29:14
 * @information: 选择出库设备
-->
<template>
  <div id="select-out-device">
    <div class="wrap-btn">
      <ta-button type="primary"
                 @click="batchAdd"
                 :disabled="!selectedRowsArr.length">批量添加</ta-button>
    </div>

    <ta-table bordered
              class="tables"
              :columns="tableColumns"
              :dataSource="tableData"
              :rowSelection="rowSelection">

      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>

      <div slot="action"
           slot-scope="e,obj,index"
           class="btnlist btnponter">
        <span @click="addsure(e,obj,index)">添加</span>
      </div>
    </ta-table>

    <ta-pagination  :defaultCurrent="page"
                   style="float: right;margin-top: 10px"
                   showSizeChanger
                   :dataSource.sync="tableData"
                   :params="userPageParams"
                   @change="pagechange"
                   :url="mixListOptions.mixGetDataListURL"
                   :ref="mixPageRef" />

  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'

export default {
  mixins: [listMixin],
  props: {
    // 表头
    tableColumns: {
      type: Array,
      default: () => ([])
    },
    // 接口url
    url: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      mixPageRef: 'gridPager', // 分页ref
      tableData: [], // 表体字段
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true,
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      selectedRowsArr: [], // 已选的行信息

    }
  },
  created () {
  },
  mounted () {
    this.mixListOptions.mixGetDataListURL = this.url
    this.$nextTick(() => {
      this.handleSubmit()
    })
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 16:44:37
     * @information: 参数
     */
    userPageParams () {
      // equipmentState 0 未出库
      let model = { equipmentState: '0' }
      return model
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 16:44:54
     * @information: 页码改变
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 16:37:20
     * @information: 批量添加
     */
    batchAdd () {
      this.$emit('selectAdd', this.selectedRowsArr)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 16:42:31
     * @information: 添加
     */
    addsure (e, obj, index) {
      this.$emit('selectAdd', [obj])
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 16:43:21
     * @information: 多选时触发
     */
    onSelectChange (selectedRowKeys, selectedRows) {
      this.rowSelection.selectedRowKeys = selectedRowKeys
      this.selectedRowsArr = selectedRows
    },

  },
}
</script>

<style lang="scss">
#select-out-device {
  .wrap-btn {
    margin-bottom: 10px;
  }
}
</style>