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
                <areaQuery class="spilwid"
                           :msg="'区域'"
                           v-if="ishide"
                           :fileldName="fileldName"
                           :labelCol="{span:9}"
                           :wrapperCol="{span:15}"
                           :ishide="ishide"
                           :types="types"></areaQuery>
                <ta-form-item label="姓名"
                              class="spilwid"
                              fieldDecoratorId="childName"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>
                <ta-form-item label="救治病种类型"
                              class="spilwid"
                              fieldDecoratorId="rescueDiseaseType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择救治病种类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in diseasetypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="申请日期"
                              style="width:420px"
                              fieldDecoratorId="applyDate"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
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
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            style="float: left;"
                            @change="typechange">
              <ta-radio-button value="2">待审批</ta-radio-button>
              <ta-radio-button value="4">已驳回</ta-radio-button>
              <ta-radio-button value="3">已通过</ta-radio-button>
            </ta-radio-group>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="childName"
                slot-scope="a, b">

            <a v-if="b.isBatch != 1"
               @click="childInfo(b)">{{a}}</a>
            <ta-popover width="800"
                        placement="top-start"
                        trigger="hover"
                        v-else>
              <ta-list :grid="{ gutter: 16, column: 4 }"
                       bordered
                       split
                       :dataSource="a.split(',')">
                <ta-list-item slot="renderItem"
                              slot-scope="item,index"
                              @click="childInfo(b,index)"><a>{{item}}</a></ta-list-item>
              </ta-list>
              <a slot="reference">{{a}}</a>
            </ta-popover>
          </span>
          <span slot="auditDate"
                slot-scope="text">{{text | auditDate}}</span>
          <div slot="auditDate"
               slot-scope="val">
            <span>
              <span>{{val | datafilter}}</span>
            </span>
          </div>
          <div slot="action"
               slot-scope="text,obj"
               class="btnlist">
            <ta-popconfirm title="确定要撤回这条数据吗?"
                           @confirm="dels(obj)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消"
                           v-if="nowkey=='3'">
              <span class="com_textdel">撤回</span>
            </ta-popconfirm>
            <span @click="addAdoption(obj)"
                  :class="obj.status=='2' ? 'com_audit' : 'com_textsee'"> {{obj.status=='2' ? '审批' : '查看'}}</span>
          </div>
          <div slot="status"
               slot-scope="val">
            <span :class="statusClass(val)">{{CollectionLabel('MEDICAL_RESCUE_NODE_STATUS',val)}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
import areaQuery from '@component/common/components/areaQuery'
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
    title: '区域',
    width: '10%',
    dataIndex: 'areaName'
  },
  {
    title: '儿童姓名',
    width: '11%',
    scopedSlots: { customRender: 'childName' },
    dataIndex: 'childName'
  },
  {
    title: '救治病种名称',
    width: '14%',
    dataIndex: 'rescueDiseaseName'
  },
  {
    title: '申请单位',
    width: '13%',
    dataIndex: 'applyOrgName'
  },
  {
    title: '申请日期',
    width: '13%',
    dataIndex: 'applyDate'
  },
  {
    title: '审核状态',
    align: 'center',
    width: '11%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
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
  name: 'revoke',
  components: {
    areaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      nowkey: '2',
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueSettlementAudit/list' // 数据列表接口，API地址
      },
      isdisabled: true,
      chosedata: [],
      visible: false,
      sexList: [],
      childrenTypeList: [], // 儿童类别字典数据
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      // 区划查询
      fileldName: 'address_Linkage',
      types: '1',
      ishide: true,
      isExpand: false,
      issearch: false,
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel
    }
  },
  mounted () {
    this.getsexList()
    this.getChildType()
    this.getchildmedicaltypeList()
    this.getchildidentitytypeList()
    this.getdiseasetypeList()
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    deletes (val) {
      this.list.splice(val, 1)
    },
    // 状态颜色处理
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
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },

    childInfo (obj, index) {
      if (obj.childEnterId) {
        const param = {
          id: index || index == 0 ? obj.childEnterId.split(',')[index] : obj.childEnterId
        }
        this.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify(param),
            operateFlag: 'look_now'
          }
        })
      } else {
        // let str = JSON.stringify(obj)
        this.$router.push({
          name: 'detailDatas',
          query: {
            obj: obj,
            index: index,
            goType: 'applicationRecord-details'
          }
        })
      }
    },
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      this.chosedata = val2
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      for (var i = 0; i < this.chosedata.length; i++) {
        if (this.chosedata.status == '2') {
        } else {
        }
      }
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.status = this.nowkey
      if (formData.status == ' ') {
        formData.status = null
      }
      if (formData.address_Linkage) {
        const area = formData.address_Linkage
        delete formData.address_Linkage
        const length = area.length
        const lengthId = length - 1
        formData.areaCode = area[lengthId]
      }
      this.changetime(formData)
      return formData
    },
    addAdoption (obj) {
      let flag = 'approvalLook' // 审批approval、查看approvalLook
      if (obj.status == '2') {
        // 待审批
        flag = 'approval'
      }
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          id: obj.id,
          childId: obj.childId,
          childEnterId: obj.childEnterId,
          startWorkflowId: obj.startWorkflowId,
          workflowId: obj.workflowId,
          medicalRescueApplyId: obj.medicalRescueApplyId,
          isNotBatch: obj.isBatch == 1,
          flag: flag
        }
      })
    },
    dels (e) {
      this.post('/medicalRescueSettlementAudit/revokeForPro', {
        workflowId: e.workflowId,
        id: e.id
      }).then(res => {
        if (res.serviceSuccess) {
          this.$message.success('撤回成功!')
          this.handleSubmit()
        } else {
          this.$message.error('撤回失败!')
        }
      })
    },
    gobatch () {
      this.visible = true
      // this.$router.push({
      //   name: 'batch'
      // })
    },
    // 儿童类型
    async getChildType () {
      // 儿童类别字典（福利院用户用福利院的，民政局用全的）
      let childTypeDict = 'CHILDCATEGORYF' // 福利院的字典
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用户
        childTypeDict = 'CHILDCATEGORYA' // 全的字典
      }
      const data = await this.getDictionaries(childTypeDict)
      this.childrenTypeList = data
    },
    // 状态类型
    async getchildmedicaltypeList () {
      const data = await this.getDictionaries('MEDICAL_RESCUE_NODE_STATUS')
      this.getchildmedicalList = data
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 救治病种类型
    async getdiseasetypeList () {
      const data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },
    // 儿童身份类型
    async getchildidentitytypeList () {
      // 儿童类别字典（福利院用户用福利院的，民政局用全的）
      let childTypeDict = 'CHILDCATEGORYF' // 福利院的字典
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用户
        childTypeDict = 'CHILDCATEGORYA' // 全的字典
      }
      const data = await this.getDictionaries(childTypeDict)
      this.childidentitytypeList = data
    }
    // // 救治病种类型
    // async getdiseasetypeList () {
    //   let data = await this.getDictionaries('DISEASETYPE')
    //   this.diseasetypeList = data
    // }
  }
}
</script>

<style scoped lang="less">
</style>
