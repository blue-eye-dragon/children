<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div style="height: 570px;">
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.searchForm = form}">
            <AreaQuery msg="区域"
                       class="spilwid"
                       :labelCol="{ span: 9 }"
                       :wrapperCol="{span:15}"
                       :types="'2'"
                       :addressmodel="addressmodel"
                       @setaddress="setaddress"
                       :fileldName="'areaId'"
                       :ishide.sync="ishide"></AreaQuery>
            <ta-form-item label="姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
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
        <div class="operateBtn">
          <ta-button type="primary"
                     @click="batchAdd"
                     :disabled="selectedRows.length==0"
                     icon="plus">批量添加</ta-button>
          <ta-button type="primary"
                     @click="allAdd"
                     icon="plus">全部添加</ta-button>
        </div>
        <ta-tabs type="line"
                 :activeKey="nowkey"
                 @change="callback">
          <ta-tab-pane tab="儿童主任"
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
                <span v-if="!selectIds.includes(obj.id)"
                      @click="sureAdd(obj)">确认添加</span>
                <span v-else
                      class="sureAddClass">确认添加</span>
              </span>
            </ta-table>
          </ta-tab-pane>
          <ta-tab-pane tab="儿童督导员"
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
                <span v-if="!selectIds.includes(obj.id)"
                      @click="sureAdd(obj)">确认添加</span>
                <span v-else
                      class="sureAddClass">确认添加</span>
              </span>
            </ta-table>
          </ta-tab-pane>
        </ta-tabs>

      </div>
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
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    width: 130,
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '性别',
    width: 100,
    align: 'center',
    collectionType: 'sex',
    dataIndex: 'sex'
  },
  {
    title: '手机号',
    width: 170,
    align: 'center',
    dataIndex: 'cellPhone'
  },
  {
    title: '职责范围',
    dataIndex: 'dutyBoundary'
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: 120,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  props: ['selectIds'],
  data () {
    return {
      addressmodel: [],
      tableColumns,
      tableData: [],
      mixListOptions: {
        mixGetDataListURL: '/childdirectorandsupervisor/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      selectedRows: [], // 选择的行数据
      page: 1,
      size: 10,
      ishide: false, // 区域是否隐藏
      nowkey: '1' // 活跃的key
    }
  },
  methods: {
    // 查询地址
    setaddress () {
      this.searchForm.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    // tab切换的change事件
    callback (e) {
      this.nowkey = e
      this.page = 1
      this.size = 10
      this.handleSubmit('search')
    },
    // 确认添加
    sureAdd (e) {
      this.$emit('setSelectData', [e], [], e.name)
    },
    // 参数处理
    userPageParams () {
      // 这里返回的对象是分页要一同提交的参数
      const formData = this.searchForm.getFieldsValue()
      formData.whereFlag = 2
      formData.registType = this.nowkey
      formData.areaId = formData.areaId && formData.areaId.length > 0 ? formData.areaId[formData.areaId.length - 1] : null
      this.changetime(formData)
      return formData
    },
    // 批量添加
    batchAdd () {
      this.$emit('setSelectData', this.selectedRows, this.tableData, '批量数据', this.nowkey)
    },
    // 全部添加
    allAdd () {
      this.post('/childdirectorandsupervisor/list', Object.assign({}, { pageNumber: 1, pageSize: 0 }, this.userPageParams())).then((res) => {
        if (res.serviceSuccess) {
          const { list } = res.data.pageBean
          const ids = []
          list.forEach(item => {
            ids.push(item)
          })
          this.$emit('setSelectData', list, list, '全部数据', this.nowkey)
        }
      })
    },
    // 点击选项改变触发事件,传入当前选中的所有选项,以及行
    onSelectChange (selectedRowKeys, selectedRows) {
      // 设置选中项为点击选中的项
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 新增
    add () {
      this.$router.push({
        name: 'businessTrainingAdd',
        query: { flag: 'add' }
      })
    },
    // 查看
    see (e) {
      this.$router.push({
        name: 'businessTrainingAdd',
        query: { flag: 'look' }
      })
    },
    // 分页change
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },
  watch: {
    tableData (val) {
      this.$nextTick(() => {
        this.mixRowSelection.selectedRowKeys = this.selectIds
        const selectedRows = []
        val.forEach(item => {
          if (this.selectIds.includes(item.id)) {
            selectedRows.push(item)
          }
        })
        this.selectedRows = selectedRows
      })
    },
    selectIds (val) {
      this.$nextTick(() => {
        this.mixRowSelection.selectedRowKeys = this.selectIds
        const selectedRows = []
        this.tableData.forEach(item => {
          if (this.selectIds.includes(item.id)) {
            selectedRows.push(item)
          }
        })
        this.selectedRows = selectedRows
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .borderLayout.showBorder {
  border: unset !important;
}
.sureAddClass {
  color: #ccc;
}
</style>
