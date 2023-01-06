<!--
 * @Date: 2021-07-06 18:05:26
 * @information: 选择人员
-->
<template>
  <div id="select-person"
       class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div style="height: 570px;">
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.searchForm = form}">

            <ta-form-item label="姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{span:18}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>

            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>

          </ta-form>
        </div>
        <!-- 按钮组 -->
        <div class="operateBtn">
          <ta-button type="primary"
                     :disabled="!selectedRows.length"
                     @click="batchAdd"
                     icon="plus">批量添加</ta-button>
          <ta-button type="primary"
                     @click="allAdd"
                     icon="plus">全部添加</ta-button>
        </div>
        <!-- tab组 -->
        <ta-tabs type="line"
                 :activeKey="nowkey"
                 @change="onChangeTab">
          <ta-tab-pane tab="工作人员"
                       key="1">
            <ta-table bordered
                      class="tables table-min-width"
                      :showOverflowTooltip="true"
                      :columns="tableColumns"
                      :dataSource="tableData"
                      :rowSelection="mixRowSelection"
                      row-key="id">

              <span slot="num"
                    slot-scope="a, b, c">
                <span>{{ size * (page - 1) + c + 1 }}</span>
              </span>

              <span slot="action"
                    class="btnlist btnponter"
                    slot-scope="text,obj">
                <span v-if="!selectedPersonArr.map(el => el.id).includes(obj.id)"
                      @click="sureAdd(obj)">确认添加</span>
                <span v-else
                      class="sureAddClass">确认添加</span>
              </span>

            </ta-table>
          </ta-tab-pane>
          <ta-tab-pane tab="社工人员"
                       key="2">
            <ta-table bordered
                      class="tables table-min-width"
                      :showOverflowTooltip="true"
                      :columns="tableColumns"
                      :dataSource="tableData"
                      :rowSelection="mixRowSelection"
                      row-key="id">

              <span slot="num"
                    slot-scope="a, b, c">
                <span>{{ size * (page - 1) + c + 1 }}</span>
              </span>

              <span slot="action"
                    class="btnlist btnponter"
                    slot-scope="text,obj">
                <span v-if="!selectedPersonArr.map(el => el.id).includes(obj.id)"
                      @click="sureAdd(obj)">确认添加</span>
                <span v-else
                      class="sureAddClass">确认添加</span>
              </span>

            </ta-table>
          </ta-tab-pane>
        </ta-tabs>
      </div>
      <!-- 底部 -->
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'

const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '50px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    width: 130,
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '联系方式',
    width: 170,
    align: 'center',
    dataIndex: 'telephone'
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: 80,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  props: {
    // 机构id
    selectedOrganizationId: {
      type: [String, Number],
      default: ''
    },
    // 已经在列表中的数据
    selectedPersonArr: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      mixListOptions: {
        mixGetDataListURL: '/rescueEmployeeManagement/queryWorkerList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      selectedRows: [], // 选择的行数据
      page: 1,
      size: 10,
      nowkey: '1' // 活跃的key 1工作人员，2社工人员
    }
  },
  created () {

  },
  mounted () {
    this.handleSubmit('search')
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:18:33
     * @information: tab切换的change事件
     */
    onChangeTab (e) {
      this.nowkey = e
      this.page = 1
      this.size = 10
      this.handleSubmit('search')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:19:25
     * @information: 参数处理
     */
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.organizationId = this.selectedOrganizationId
      // 区分工作 和 社工
      formData.orgPersonType = this.nowkey == '1' ? '01' : '02'
      return formData
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:19:08
     * @information: 确认添加
     */
    sureAdd (e) {
      this.$emit('onAddPerson', { arr: [e], msgText: `人员(${e.name})添加成功` })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:19:52
     * @information: 批量添加
     */
    batchAdd () {
      this.$emit('onAddPerson', { arr: this.selectedRows, msgText: '批量添加成功' })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:20:16
     * @information: 全部添加
     */
    async allAdd () {
      const params = this.userPageParams()
      const model = {
        pageSize: 0,
        pageNumber: 1,
        ...params
      }
      let res = await this.post(this.mixListOptions.mixGetDataListURL, model)
      if (!res.serviceSuccess) return
      const { list } = res.data.pageBean
      this.$emit('onAddPerson', { arr: list, msgText: '全部添加成功', isTotal: true })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:20:56
     * @information: 分页change
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:47:13
     * @information: 点击选项改变触发事件,传入当前选中的所有选项
     */
    onSelectChange (selectedRowKeys, selectedRows) {
      // 设置选中项为点击选中的项
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },




  },
}
</script>

<style lang="less">
#select-person {
  /deep/ .borderLayout.showBorder {
    border: unset !important;
  }
  .sureAddClass {
    color: #ccc;
    cursor: not-allowed;
  }
}
</style>

