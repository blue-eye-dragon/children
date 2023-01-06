<template>
  <div class="searchdata">
    <!--信息上报审核  -->
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
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button :value="'0'">待审核</ta-radio-button>
            <ta-radio-button value="1">已审核</ta-radio-button>
          </ta-radio-group>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{addAdoption(record,false)}}})"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="statusLabel"
               slot-scope="a,b">
            <!-- 用statusLabel 文字判断颜色，因为status状态码返回的不对 -->
            <span v-if="b.statusLabel && b.statusLabel.trim()=='待提交'"
                  class="across_wait_submit">{{a}}</span>
            <span v-if="b.statusLabel && b.statusLabel.trim()=='待审核'"
                  class="across_wait_examine">{{a}}</span>
            <span v-if="b.statusLabel && b.statusLabel.trim()=='审核中'"
                  class="across_examining">{{a}}</span>
            <span v-if="b.statusLabel && b.statusLabel.trim()=='通过'"
                  class="across_pass">{{a}}</span>
            <span v-if="b.statusLabel && b.statusLabel.trim()=='不通过'"
                  class="across_not_pass">{{a}}</span>
            <span v-if="b.statusLabel && b.statusLabel.trim()=='待补充材料'"
                  class="across_wait_replenish">{{a}}</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">

            <span @click="addAdoption(obj,true)"
                  v-if="userInfo.areaLevel!='4'&&obj.status==1||userInfo.areaLevel=='4'&&obj.status==0"
                  class='com_audit'>审核</span>
            <span @click="addAdoption(obj,false)"
                  v-if="userInfo.areaLevel=='4'&&obj.status!=0||userInfo.areaLevel!='4'&&obj.status!=1"
                  class='com_textsee'>查看</span>
          </div>
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
                       :ref="mixPageRef" />
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '20%'
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
    collectionType: 'sex',
    width: '8%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '16%',
    align: 'center'
  },
  {
    title: '申请日期',
    dataIndex: 'registerDate',
    width: '16%',
    align: 'center'
  },
  {
    title: '受理地',
    dataIndex: 'reportUnit',
    width: '30%'
  },
  {
    title: '审核状态',
    dataIndex: 'statusLabel',
    scopedSlots: { customRender: 'statusLabel' },
    width: '14%',
    align: 'center'
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
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '0',
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: 'unattendedChildApplyAnotherPlaceApi/queryUnattendedAnotherPlaceApplyListByTownOrCounty' // 数据列表接口，API地址
      },
      key: '5',
      userInfo: window.parent.indexTool.getUserInfo() // 当前登录人的用户信息
    }
  },
  activated () {
    this.nowkey = '0'
  },
  methods: {
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 审核/查看
    addAdoption (val, isAudit) {
      val.isAnotherPlaceApply = '1' // 先暂时写死 列表中后续会返
      val.isAudit = isAudit
      val.addUnattendedId = val.id
      val.reportTime = val.registerDate
      this.$router.push({
        name: 'auditOtherLog',
        query: {
          obj: JSON.stringify(val)
        }
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.pageFlag = 1
      formData.orgId = this.userInfo.orgId
      formData.areaId = this.userInfo.areaId
      formData.tabState = this.nowkey
      this.changetime(formData)
      return formData
    }
  }
}
</script>
<style scoped lang="less">
</style>
