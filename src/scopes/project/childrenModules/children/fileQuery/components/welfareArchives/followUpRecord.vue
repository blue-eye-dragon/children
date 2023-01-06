<template>
  <div style="height:100%"
       ref="twoout">
    <div>
      <ta-table bordered
                ref="two"
                class="tables table-min-width"
                :showOverflowTooltip="true"
                :columns="tableColumns"
                :dataSource="tableData">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="see(val,obj)"
                class="com_textsee">查看</span>
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"  class='pagination'
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="tableData"
                     
                     :params="userPageParams"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     ref="gridPager" />
    </div>
    <ta-drawer title="回访记录"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="生活状况"
                      fieldDecoratorId="liveCondition"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-textarea :disabled="idedit"
                       :autosize="{ minRows: 2, maxRows: 6 }" />
        </ta-form-item>
        <ta-form-item label="成长状况"
                      fieldDecoratorId="growUpCondition"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-textarea :disabled="idedit"
                       :autosize="{ minRows: 2, maxRows: 6 }" />
        </ta-form-item>
        <ta-form-item label="健康状况"
                      fieldDecoratorId="healthCondition"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-textarea :disabled="idedit"
                       :autosize="{ minRows: 2, maxRows: 6 }" />
        </ta-form-item>
        <ta-form-item label="回访人员"
                      fieldDecoratorId="returnPerson"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit"
                    placeholder="请输入回访人员" />
        </ta-form-item>
        <ta-form-item label="回访日期"
                      fieldDecoratorId="returnTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="回访小结"
                      fieldDecoratorId="returnSummary"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-textarea :disabled="idedit"
                       :autosize="{ minRows: 2, maxRows: 6 }" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">返回</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMinxin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import { setTimeout } from 'timers'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '回访小结',
    dataIndex: 'returnSummary',
    width: '13%'
  },
  {
    title: '回访人员',
    dataIndex: 'returnPerson',
    width: '16%'
  },
  {
    title: '回访日期',
    dataIndex: 'returnTime',
    width: '16%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '16%'
  },
  //   {
  //     title: '记录人员',
  //     dataIndex: 'recordPerson'
  //   },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMinxin],
  props: {
    childBaseId: {
      types: String
    }
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      tableData: [],
      page: 1,
      size: 10,
      obj: {},
      adoptionlist: [],
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryChildArchivesFollowUpReturnInfo' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },

  mounted () {
  },
  methods: {
    loadData () { },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.btnlist span {
  cursor: pointer;
}
</style>
