<template>
  <!-- 消息更多 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="消息类型"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="msgType">
              <ta-select allowClear
                         placeholder="请选择消息类型">

                <ta-select-option v-for="(item,index ) in [{value:'1',label:'通知公告'},{value:'2',label:'系统消息'}]"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="标题"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="name">
              <ta-input placeholder="请输入标题" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="readState"
               slot-scope="val, obj">
            <span :class="obj.readState==0?'com_reject':'com_adopt'">{{obj.readState==0?'未读':'已读'}}</span>
          </div>
          <div slot="msgType"
               slot-scope="val, obj">
            <span>{{obj.msgType=='1'?'通知公告':'系统消息'}}</span>
          </div>
          <div slot="action"
               slot-scope="val, obj "
               class="btnlist">
            <span v-if=" obj.msgType==1"
                  @click="continueprocessing(obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>

      </div>
      <div slot="footer">
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
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '消息类型',
    width: '25%',
    scopedSlots: { customRender: 'msgType' },
    align: 'center',
    dataIndex: 'msgType'
  },

  {
    title: '标题',
    width: '25%',
    dataIndex: 'name'

  },
  {
    title: '接收时间',
    width: '25%',
    align: 'center',
    dataIndex: 'msgTime'

  },
  {
    title: '状态',
    width: '25%',
    scopedSlots: { customRender: 'readState' },
    align: 'center',
    dataIndex: 'readState'
  },

  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    align: 'center',
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
      mixListOptions: {
        mixGetDataListURL: '/MsgRemindApi/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },

  mounted () { },
  methods: {
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // userPageParams () {
    //   let formData = this.form.getFieldsValue()
    //   return {
    //     apap0003: formData.apap0003
    //   }
    // },
    continueprocessing (obj) {
      this.$router.push({
        path: 'contactsMessageList'

      })
    }
  }
}
</script>

