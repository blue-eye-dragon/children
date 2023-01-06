<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div class="operateBtn">
        <ta-button type="primary"
                   @click="publishNeeds">发布需求信息</ta-button>
      </div>
      <ta-table bordered
                class="tables table-min-width"
                :showOverflowTooltip="true"
                :columns="tableColumns"
                :dataSource="mixDataList">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="status"
              slot-scope="a, b, c">
          <span>{{a=='0'?'未提交':(a=='1'?'未匹配':'已匹配')}}</span>
        </span>

        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span @click="continueToHandle(obj)"
                class="com_continue">编辑</span>
          <span @click="continueToQuery(obj)"
                class="com_textsee">查看</span>
          <!-- <ta-divider type="vertical" /> -->
          <ta-popconfirm title="你确定删除本条数据吗?"
                         @confirm="deletes(obj)"
                         okText="确定"
                         cancelText="取消">
            <span class="com_textdel">删除</span>
          </ta-popconfirm>
        </div>
      </ta-table>
      <!-- </ta-tab-pane>
      </ta-tabs> -->
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
    title: '机构名称',
    width: '18%',
    dataIndex: 'departmentName'
  },
  {
    title: '经办人',
    width: '18%',
    dataIndex: 'agent'
  },
  {
    title: '经办人联系电话',
    width: '14%',
    dataIndex: 'agentPhone'
  },
  {
    title: '需求类型',
    width: '14%',
    dataIndex: 'demandType',
    collectionType: 'RESOURCE_TYPE'
  },
  {
    title: '需求数量',
    width: '14%',
    dataIndex: 'demandTotal'
  },
  {
    title: '事项状态',
    width: '10%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/socialCareService/releaseDemandList', // 数据列表接口，API地址
        mixGetDataListIsPage: false // 数据列表接口，是否需要分页？
      }

    }
  },
  mounted () {
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 读取列表 无分页形式
    async getlist () {
      let res = await this.post(this.mixListOptions.mixGetDataListURL, {})
      if (res.serviceSuccess) {
        this.mixDataList = res.data.pageBean.list
      }
    },
    // 发布需求
    publishNeeds () {
      this.$router.push({
        name: 'publishNeeds',
        query: { flag: 'publish' }
      })
    },
    // 删除
    deletes (e) {
      this.post('/socialCareService/demandDelete', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('数据删除成功！')
          this.getlist()
        }
      })
    },
    // 继续办理
    continueToHandle (e) {
      this.$router.push({
        name: 'publishNeeds',
        query: { flag: 'handle', id: e.id }
      })
    },
    continueToQuery (e) {
      this.$router.push({
        name: 'publishNeeds',
        query: { flag: 'query', id: e.id }
      })
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
