<template>
  <div>
    <ta-tabs @change="callback"
             defaultActiveKey="1"
             type="line">
      <ta-tab-pane tab="救助保护记录"
                   key="1"
                   :forceRender="true">
        <div class="searchdata"
             v-if="protectType">
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
                   slot-scope="e, obj, index"
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
        </div>
      </ta-tab-pane>

    </ta-tabs>
    <keep-alive>
      <router-view v-show="protectVisible"></router-view>
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
    title: '救助日期',
    dataIndex: 'rescueTime',
    width: '33%'
  },
  {
    title: '离开日期',
    dataIndex: 'leaveTime',
    width: '33%'
  },
  {
    title: '帮扶进度',
    dataIndex: 'helpProgress',
    collectionType: 'SUPPORTSTATE',
    width: '35%'
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
        mixGetDataListURL:
          '/childArchives/queryRescueProtectRecordsByChildBaseId', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',

      protectType: true, // 是否显示table
      protectVisible: false // 是否显示查看
    }
  },
  activated () {
    this.childBaseId = this.$route.query.childBaseId
    this.protectType = true
    this.protectVisible = false
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
        // childBaseId: '8207eea7c7a7424a8209bb38d6d0a849' // 本地
      }
    },
    callback () { },
    // 查看
    look (e, obj, index) {
      this.protectVisible = true
      this.$router.push({
        name: 'protectionFilesLook',
        query: {
          obj: JSON.stringify(obj)
        }
      })
    }
  },
  watch: {
    $route: function (newval, oldval) {
      if (newval.name == 'protectionFilesLook') { // 查看
        this.protectType = false
      } else if (newval.name == 'protectionFiles') { // 首页
        if (!this.protectType) {
          this.protectType = true
          this.$nextTick(() => {
            this.handleSubmit()
          })
        }
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
