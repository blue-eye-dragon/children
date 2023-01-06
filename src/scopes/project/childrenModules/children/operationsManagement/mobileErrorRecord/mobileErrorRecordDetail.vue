<!--
 * @Date: 2021-06-21 11:08:02
 * @information: 移动端错误日志详情
-->
<template>
  <div id="mobile-error-record-detail"
       class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div class="searchcont wrap-btn-list">
        <ta-button class="btnleft"
                   icon="rollback"
                   @click="$router.go(-1)">返回</ta-button>
      </div>
      <ta-table :columns="mixColumns"
                :dataSource="mixDataList"
                bordered>

        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>

        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="onLook(val,obj,index)"
                class="com_textsee">查看详情</span>
        </div>

      </ta-table>

      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>

    <!-- 详情侧滑 -->
    <ta-drawer title="日志详情"
               width="600"
               placement="right"
               :getContainer="setContainer"
               @close="isShowDrawer=false"
               :visible="isShowDrawer"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <div v-if="isShowDrawer"
           class="container-record-detail">
        <div class="detail-text">
          {{tableRow.exceptionReason || '暂无数据'}}
        </div>
      </div>

      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="isShowDrawer=false">关闭</ta-button>
      </div>
    </ta-drawer>

  </div>
</template>

<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'

const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '错误日志时间',
    width: '15%',
    dataIndex: 'errorLogTime',
    overflowTooltip: true,
    align: 'center'
  },
  {
    title: '错误日志内容',
    width: '60%',
    dataIndex: 'exceptionReason',
    overflowTooltip: true
  },
  {
    title: '操作',
    width: '120px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      mixListOptions: {
        mixGetDataListURL: 'deviceManagement/singleExceptionLogList',
        mixActivatedIsNeed: true
      },
      mixDataList: [], // 表体数据
      mixColumns, // 表头
      mixPageRef: 'gridPager', // 分页组件ref
      page: 1,
      size: 10,
      isShowDrawer: false, // 是否显示侧滑详情
      tableRow: {}, // 当前行信息
    }
  },
  created () {

  },
  mounted () {

  },
  activated () {

  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 14:47:44
     * @information: 查询参数
     */
    userPageParams () {
      let { equipmentNum } = this.$route.query
      return { equipmentNum }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 14:33:26
     * @information: 页码改变
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 15:38:28
     * @information: 查看详情
     */
    onLook (val, obj, index) {
      this.tableRow = obj || {}
      this.isShowDrawer = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:51:26
     * @information: 抽屉容器悬浮处理
     */
    setContainer () {
      return document.body
    }

  }
}
</script>

<style lang="less">
#mobile-error-record-detail {
  .wrap-btn-list {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
