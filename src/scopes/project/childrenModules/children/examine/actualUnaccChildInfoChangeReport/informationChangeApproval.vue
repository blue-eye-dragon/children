<template>
  <div class="searchdata">
    <!--信息变更审核  -->
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          style="width:320px"
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
        <div class="radioClass visitbtntop">
          <ta-radio-group :value="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <!-- <ta-radio-button value="0">待提交</ta-radio-button> -->
            <ta-radio-button value="1">待审核</ta-radio-button>
            <ta-radio-button value="3">通过</ta-radio-button>
            <ta-radio-button value="4">驳回</ta-radio-button>
            <ta-radio-button value="5">全部</ta-radio-button>
          </ta-radio-group>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{addAdoption(null,record,index)}}})"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>

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
            <span class="com_audit"
                  v-if="obj.currentStatus=='1'"
                  @click="addAdoption(text,obj,index)">审核</span>
            <span class="com_textsee"
                  v-if="obj.currentStatus!='1'"
                  @click="addAdoption(text,obj,index)">查看</span>
          </div>
          <!-- <a
            slot="action"
            slot-scope="text,obj,index"
            href="javascript:;"
            @click="addAdoption(text,obj,index)"
          >{{obj.currentStatus=='1' ? '审核' : '查看'}}</a>-->
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       style="float:right;margin-top:10px"
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
    width: '12%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '15%',
    collectionType: 'SEX'
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
    width: '16%'
  },
  {
    title: '上报日期',
    dataIndex: 'reportTime',
    align: 'center',
    width: '16%'
  },
  {
    title: '上报单位',
    dataIndex: 'reportUnit',
    width: '16%'
  },
  {
    title: '变更原因',
    dataIndex: 'changeReason',
    width: '18%'
  },
  {
    title: '当前状态',
    dataIndex: 'currentStatusLabel',
    scopedSlots: { customRender: 'currentStatusLabel' },
    align: 'center',
    width: '14%'
  },
  {
    title: '操作',
    align: 'center',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '1',
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
    }
  },
  mounted () { },
  activated () {
    if (this.Base.getNowPageParam()._modulePartId_ == '2') {
      this.nowkey = '1'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {
    add () {
      this.$router.push({
        name: 'actualUnaccChildChangeFor'
      })
    },
    addAdoption (text, obj, index) {
      let goType
      if (obj.currentStatus == '4' || obj.currentStatus == '3') {
        goType = 'informationChangeApproval-reject'
      } else {
        goType = 'informationChangeApproval-apply'
      }
      const str = {
        obj: obj,
        index: index,
        goType: goType
      }
      const paramsData = JSON.stringify(str)
      this.$router.push({
        name: 'actualUnaccChildChangeFor',
        query: {
          paramsData
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
      formData.pageFlag = '1'
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style scoped lang="less">
</style>
