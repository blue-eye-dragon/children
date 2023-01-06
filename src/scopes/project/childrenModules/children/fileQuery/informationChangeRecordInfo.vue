<template>
  <div>
    <ta-tabs @change="callback"
             defaultActiveKey="1"
             type="line">
      <ta-tab-pane tab="信息变更记录"
                   key="1"
                   :forceRender="true">
        <div v-if="informationChangeType">
          <ta-form layout="inline"
                   :autoFormCreate="searchForm => { this.searchForm = searchForm;}"
                   style="padding: 1%;">
            <ta-form-item label="变更日期"
                          class="spilwid"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{ span: 17 }"
                          fieldDecoratorId="changeTime">
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item label="申请部门"
                          class="spilwid"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{ span: 17 }"
                          fieldDecoratorId="applyDepartment">
              <ta-input placeholder="请输入申请部门" />
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
          <ta-table bordered
                    class="tables table-min-width"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :showOverflowTooltip="true">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="e, obj, index"
                 class="btnlist">
              <span @click="look(obj)"
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
      </ta-tab-pane>
    </ta-tabs>
    <keep-alive>
      <router-view v-show="routeVisible"></router-view>
    </keep-alive>
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '33%'
  },
  {
    title: '变更日期',
    dataIndex: 'changeTime',
    width: '33%'
  },
  {
    title: '变更原因',
    dataIndex: 'changeReason',
    width: '35%'
  },
  {
    title: '申请部门',
    dataIndex: 'applyDepartment',
    width: '33%'
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
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryInfoChangeRecordsByChildBaseId', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',

      childBaseId: [], // 儿童基本信息id

      routeVisible: true,
      informationChangeType: true // 列表为true，查看为false
    }
  },
  activated () {
    this.childBaseId = this.$route.query.childBaseId
  },
  mounted () { },
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
    // 信息变更记录查看
    look (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'informationChangeRecordInfo_changeApprovalFrom',
        query: {
          id: e.id,
          childChangeId: e.childChangeId,
          workflowId: e.workflowId,
          flag: 'look'
        }
      })
    },
    callback () { }
  },
  watch: {
    $route: function (newval, oldval) {
      if (newval.name == 'informationChangeRecordInfo_changeApprovalFrom') { // 信息变更查看
        this.informationChangeType = false
      } else {
        this.informationChangeType = true
        this.handleSubmit()
      }
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
