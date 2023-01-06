<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div class="operateBtn">
        <ta-button type="primary"
                   @click="publishResources">发布资源信息</ta-button>
      </div>
      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns"
                :showOverflowTooltip="true"
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
    width: '20%',
    dataIndex: 'orgName'
  },
  {
    title: '经办人',
    width: '20%',
    dataIndex: 'agent'
  },
  {
    title: '经办人联系电话',
    width: '15%',
    dataIndex: 'agentPhone'
  },
  {
    title: '资源类型',
    width: '15%',
    dataIndex: 'resourceType',
    collectionType: 'RESOURCE_TYPE'
  },
  {
    title: '资源总价值(元)',
    width: '15%',
    dataIndex: 'resourceValue'
  },
  {
    title: '事项状态',
    width: '10%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
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
        mixGetDataListURL: '/socialCareService/releaseResourceList', // 数据列表接口，API地址
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
      let params = {}
      let res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.mixDataList = res.data.pageBean.list
      }
    },
    // 发布资源
    publishResources () {
      this.$router.push({
        name: 'publishResources',
        query: { flag: 'publish' }
      })
    },
    // 删除
    deletes (e) {
      this.post('/socialCareService/resourceDelete', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('数据删除成功！')
          this.getlist()
        }
      })
    },
    // 继续办理
    continueToHandle (e) {
      console.log(e)
      this.$router.push({
        name: 'publishResources',
        query: { flag: 'handle', id: e.id }
      })
    },
    continueToQuery (e) {
      console.log(e)
      this.$router.push({
        name: 'publishResources',
        query: { flag: 'query', id: e.id }
      })
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
