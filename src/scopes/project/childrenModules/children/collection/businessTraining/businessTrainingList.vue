<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.searchForm = form}">
            <ta-form-item label="培训地点"
                          class="spilwid"
                          fieldDecoratorId="trainingLocation"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入培训地点" />
            </ta-form-item>
            <ta-form-item label="培训日期"
                          class="spilwid2"
                          fieldDecoratorId="trainingDate"
                          :labelCol="{ span: 6 }"
                          :wrapperCol="{span:18}">
              <ta-range-picker />
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
                     @click="add"
                     icon="plus">新增培训记录</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="trainingDate"
                slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </span>
          <span slot="action"
                class="btnlist"
                slot-scope="text,obj">
            <span @click="see(obj)"
                  class="com_textsee">查看</span>
            <span class="com_textedit"
                  @click="edit(obj)">编辑</span>
            <ta-popconfirm title="确认删除吗?"
                           @confirm="del(obj)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </span>
        </ta-table>
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
    title: '培训标题',
    align: 'center',
    dataIndex: 'trainingTitle',
    width: '20%'
  },
  {
    title: '培训日期',
    align: 'center',
    scopedSlots: { customRender: 'trainingDate' },
    dataIndex: 'trainingDate',
    width: '22%'
  },
  {
    title: '培训地点',
    dataIndex: 'trainingLocation',
    width: '30%'
  },
  {
    title: '登记人员',
    dataIndex: 'registrationOfficer',
    align: 'center',
    width: '20%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      mixListOptions: {
        mixGetDataListURL: '/businessTrainingInfo/businessTrainingList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      page: 1,
      size: 10
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () {
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
        query: { flag: 'look', id: e.id }
      })
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'businessTrainingAdd',
        query: { flag: 'edit', id: e.id }
      })
    },
    // 删除
    del (e) {
      this.post('/businessTrainingInfo/deleteById', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('删除成功')
          this.handleSubmit('search')
        }
      })
    },
    // 分页change
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }

}
</script>
