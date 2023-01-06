<template>
  <div class="searchdata">
    <!-- 信息变更记录 -->
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          class="spilwid"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入身份证号"></ta-input>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
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
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">通过</ta-radio-button>
              <ta-radio-button value="4">驳回</ta-radio-button>
              <ta-radio-button value="5">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <!-- <ta-button icon='rollback'
                       class="btnleft"
                       v-if="this.returnName"
                       @click="returns">返回</ta-button> -->
            <ta-button type="primary"
                       icon='plus'
                       @click="toNew">新增</ta-button>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{see(null,record,index)}}})"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <!-- <div slot="idCard" slot-scope="val,obj,index" >
            <span>{{val?val.substr(0,4)+'***'+val.substr(14,val.length):'-'}}</span>
          </div> -->
          <div slot="currentStatusLabel"
               slot-scope="a,b,c">
            <span v-if="b.currentStatus==2"
                  class="com_tobesubmitted">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==1"
                  class="com_tobeaudited">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==3"
                  class="com_adopt">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==4"
                  class="com_reject">{{b.currentStatusLabel}}</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  v-if="obj.currentStatus=='3'||obj.currentStatus=='4'||obj.currentStatus=='1'"
                  @click="see(text,obj,index)">查看</span>
            <!-- <ta-divider type="vertical"
                        v-if="obj.currentStatus=='1'" /> -->
            <span class="com_textreject"
                  v-if="obj.currentStatus=='1'"
                  @click="returnBack(text,obj,index)">撤回</span>
            <span class="com_textedit"
                  v-if="obj.currentStatus=='2'||obj.currentStatus=='0'"
                  @click="edit(text,obj,index)">编辑</span>
            <!-- <ta-divider v-if="obj.currentStatus=='2'"
                        type="vertical" /> -->
            <!-- <ta-divider type="vertical" /> -->
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.currentStatus=='2'||obj.currentStatus=='0'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '15%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    width: '15%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '11%'
  //   // scopedSlots: { customRender: 'idCard' }
  // },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '15%'
  },
  {
    title: '上报日期',
    dataIndex: 'reportTime',
    align: 'center',
    width: '15%'
  },
  {
    title: '上报单位',
    dataIndex: 'reportUnit',
    align: 'center',
    width: '15%'
  },
  {
    title: '当前状态',
    dataIndex: 'currentStatusLabel',
    align: 'center',
    scopedSlots: { customRender: 'currentStatusLabel' },
    width: '15%'
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
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '0',
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL:
          '/changeBaseUnattendedApi/pageApplyChangeBaseUnattended' // 数据列表接口，API地址
      }
      // returnName: null // 返回按钮要返回的页面
    }
  },
  mounted () { },
  activated () {
    // this.returnName = this.$route.query.returnName
    this.nowkey = '0'
    if (this.Base.getNowPageParam()._modulePartId_ == '3') {
      this.nowkey = '3'
    } else if (this.Base.getNowPageParam()._modulePartId_ == '4') {
      this.nowkey = '4'
    } else if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    } else {
      this.nowkey = '0'
    }
  },
  methods: {
    // 新增
    toNew () {
      this.$router.push({
        name: 'factRaiseChildInfoChange',
        query: {
          goto: true
        }
      })
    },
    //   编辑
    edit (text, obj, index) {
      const str = {
        obj: obj,
        index: index,
        goType: 'factRaiseChildInfoChange-edit'
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'applyChangeFrom',
        query: {
          paramsData
        }
      })
    },
    //   撤回
    returnBack (text, obj, index) {
      let approval = false
      if (obj.currentStatus == '0') {
        // 待提交(撤回)
        approval = false
      }
      const str = {
        obj: obj,
        index: index,
        approval: approval,
        goType: 'informationChangeRecord-reject'
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'actualUnaccChildChangeFor',
        query: {
          paramsData
        }
      })
    },
    //   查看
    see (text, obj, index) {
      let approval = false
      if (obj.currentStatus == '4') {
        // 驳回
        approval = true
      } else if (obj.currentStatus == '3') {
        // 通过
        approval = true
      } else if (obj.currentStatus == '1') {
        // 待审核
        approval = false
      }
      const str = {
        obj: obj,
        index: index,
        approval: approval,
        goType: 'informationChangeRecord-see'
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'actualUnaccChildChangeFor',
        query: {
          paramsData
        }
      })
    },
    async dels (text, obj, index) {
      const params = {
        changeBaseId: obj.changeBaseId
      }
      this.post(
        '/changeBaseUnattendedApi/deleteChangeBaseUnattended',
        params
      ).then(res => {
        if (res.errors == null) {
          this.$message.success('删除成功')
          this.handleSubmit()
        }
      })
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.type = this.nowkey
      formData.pageFlag = '0'
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
