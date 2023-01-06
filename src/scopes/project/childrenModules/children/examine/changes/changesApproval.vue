<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="身份证号"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              style="width:320px"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <!--<ta-form-item label="性别"-->
                <!--:labelCol="{span:7}"-->
                <!--:wrapperCol="{span:17}"-->
                <!--class="spilwid"-->
                <!--fieldDecoratorId="sex">-->
                <!--<ta-select allowClear-->
                <!--placeholder="请选择性别">-->
                <!--<ta-select-option value>全部</ta-select-option>-->
                <!--<ta-select-option v-for="item in sexList"-->
                <!--:key="item.value"-->
                <!--:value="item.value"-->
                <!--:require="{message:'请选择性别!'}">{{item.label}}</ta-select-option>-->
                <!--</ta-select>-->
                <!--</ta-form-item>-->
                <ta-form-item label="儿童类别"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType">
                  <ta-select class="selectwid"
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childrenTypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <!--<ta-form-item label="出生日期"-->
                <!--:labelCol="{span:7}"-->
                <!--:wrapperCol="{span:17}"-->
                <!--class="spilwid"-->
                <!--fieldDecoratorId="birthday">-->
                <!--<ta-range-picker @change="onSelectTime" />-->
                <!--</ta-form-item>-->
                <!--<ta-form-item label="变更申请日期"-->
                <!--:labelCol="{span:8}"-->
                <!--:wrapperCol="{span:16}"-->
                <!--class="spilwid"-->
                <!--fieldDecoratorId="applyDay">-->
                <!--<ta-range-picker @change="onSelectTime" />-->
                <!--</ta-form-item>-->
                <ta-form-item label="审批日期"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}"
                              class="spilwid2"
                              fieldDecoratorId="approveDay">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>

              </div>
              <div class="searchbtn">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             style="    width: 109px;"
                             @click="advancedquery">
                    高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>
              </div>
            </div>
          </ta-form>
        </div>
        <div class="operateBtn">
          <div style="float: right;">
            <!-- <ta-button class="exportbtn"
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
            <ta-button type="primary"
                       class="btnleft"
                       @click="gobatch"
                       :disabled="isdisabled">批量审批</ta-button>
          </div>
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">已驳回</ta-radio-button>
              <ta-radio-button value="2">已通过</ta-radio-button>
              <!-- <ta-radio-button value="4">全部</ta-radio-button> -->
            </ta-radio-group>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList"
                  :rowSelection="rowSelection">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b, c">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a, b, c">
            <span v-if="a">{{a!=undefined?a.substring(0,10):''}}</span>
            <span v-else>-</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <span slot="statusLabel"
                slot-scope="a, b, c">
            <span :class="statusClass(a)">{{CollectionLabel('MEDICAL_RESCUE_NODE_STATUS',a)}}</span>
          </span>
          <div slot="action"
               slot-scope="a,b,c"
               class="btnlist">
            <span @click="addAdoption(b)"
                  :class="b.status=='4' ? 'com_audit' : 'com_textsee'">{{b.status=='4' ? '审批' : '查看'}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ApprovalBatches :visible.sync='visible'
                     msg="变更申请信息"
                     @handleSubmit="handleSubmit"
                     :chosedata="chosedata"
                     :types="types"></ApprovalBatches>
  </div>
</template>
<script>
import ApprovalBatches from '../components/approvalBatches'
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%',
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '身份证号',
  //   width: '15%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '15%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '16%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '18%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '变更申请日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '18%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '审批日期',
    width: '15%',
    dataIndex: 'approveDate'
  },
  {
    title: '变更原因',
    width: '18%',
    dataIndex: 'changeReason'
  },
  {
    title: '状态',
    width: '14%',
    dataIndex: 'statusLabel',
    scopedSlots: { customRender: 'statusLabel' }
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
  components: {
    ApprovalBatches
    // chosedata: []
  },
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      idedit: false,
      nowkey: '1', // tab 点击的值
      childrenTypeList: [], // 儿童类别字典数据
      sexList: [], // 性别字典数据
      types: '3', // 类别（入院1，离院2，变更3）

      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childChangeRequestApi/pageChangeChildCheck' // 数据列表接口，API地址
      },
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        selectedRowValues: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      isdisabled: true,
      chosedata: [],
      visible: false,
      issearch: false
    }
  },
  mounted () {
    this.getMenuDatas()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.CH:// 撤回
          classValue = 'com_tobesubmitted'
          break
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.DSP:// 待审批
          classValue = 'com_tobeaudited'
          break
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.TG:// 通过
          classValue = 'com_adopt'
          break
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.BH:// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },

    // 字典数据获取
    getMenuDatas () {
      // 儿童类别字典（福利院用户用福利院的，民政局用全的）
      let childTypeDict = 'CHILDCATEGORYF' // 福利院的字典
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用户
        childTypeDict = 'CHILDCATEGORYA' // 全的字典
      }
      this.getMenu(childTypeDict, 'childrenTypeList') // 获取儿童类别字典数据
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 导出
    async exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/changeChild/exportChangeChildCheck', data)
    },
    deletes (val) {
      this.list.splice(val, 1)
    },
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      this.rowSelection.selectedRowValues = val2
      this.chosedata = val2
      val.length > 0 && (this.nowkey == '1' || this.nowkey == '4') ? (this.isdisabled = false) : (this.isdisabled = true)
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.type = this.nowkey
      return formData
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    addAdoption (e) {
      let flag = 'look' // 审批true、查看fasle
      if (e.status == '4') { // 待审批
        flag = 'approval'
      }

      this.$router.push({
        name: 'changeApprovalFrom',
        query: { id: e.id, childChangeId: e.childChangeId, workflowId: e.workflowId, workflowPointId: e.workflowPointId, flag: flag }
      })
    },
    gobatch () {
      let tag = true
      this.chosedata = JSON.parse(JSON.stringify(this.rowSelection.selectedRowValues))
      this.chosedata.forEach((item, index) => {
        if (item.status != '4') {
          tag = false
        }
      })
      if (tag) {
        this.visible = true
      } else {
        this.$message.error('存在已审批的数据，请重新选择！')
      }
    },
    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
