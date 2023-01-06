<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div style="height: 50px;">
          <div style="float: right;">
            <ta-button type="primary"
                       @click="toadd(0)"
                       class="btnleft">新增</ta-button>
            <ta-popconfirm title="是否确定删除?"
                           @confirm="batchDeletion"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <ta-button class="btnleft"
                         type='danger'
                         :disabled="iscanchose">删除</ta-button>
            </ta-popconfirm>
            <ta-button @click="backs"
                       class="btnleft">返回</ta-button>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :rowSelection="mixRowSelection"
                  :dataSource="tableData"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="godetail(obj,0)"
                  class="com_textedit">编辑</span>
            <span @click="godetail(obj,1)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"  class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"

                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
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
    width: '6%',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '评估日期',
    width: '17%',
    dataIndex: 'assessmentDate'
  },
  {
    title: '评估负责人',
    width: '22%',
    dataIndex: 'assessmentPersonInCharge'
  },
  {
    title: '评估意见',
    width: '22%',
    dataIndex: 'assessmentOpinion'
  },
  {
    title: '登记人',
    width: '22%',
    dataIndex: 'registerMember'
  },
  {
    title: '登记日期',
    width: '17%',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/fosterFamilyChildAssessment/list', // 数据列表接口，API地址
        mixDeleteURL: '/fosterFamilyChildAssessment/updateDelStateById'
      },
      mixPageRef: 'gridPager',
      fosterList: [],
      childBaseId: ''
      // hideDefaultSelections
    }
  },
  activated () {
    this.childBaseId = this.$route.query.childBaseId
    console.log(this.childBaseId)
  },
  mounted () {
    this.getfoster()
  },
  methods: {
    backs () {
      this.$router.go(-1)
    },
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },
    // 寄养状态 FOSTER_STATUS
    async getfoster () {
      let data = await this.getDictionaries('FOSTER_STATUS')
      this.fosterList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    toadd (status) {
      this.$router.push({
        path: 'fostercareevaluation',
        query: {
          childBaseId: this.childBaseId,
          status: status
        }
      })
    },
    godetail (val, status) {
      console.log(val)
      this.$router.push({
        path: 'fostercareevaluation', // 补领解除
        query: {
          childBaseId: this.childBaseId,
          status: status,
          id: val.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.numwid {
  width: 118px;
}
.textnum {
  width: 600px;
  display: inline-block;
}
.textnum .spilwid {
  width: 300px;
}
.textnum .numwid {
  width: 200px;
}
.numwidwid {
  width: 210px;
}
.line {
  line-height: 40px;
  margin: 0 5px;
}
</style>
