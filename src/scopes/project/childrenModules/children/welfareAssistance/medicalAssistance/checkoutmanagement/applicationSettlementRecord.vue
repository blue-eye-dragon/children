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
                <ta-form-item label="救治病种名称"
                              class="spilwid"
                              fieldDecoratorId="rescueDiseaseName"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入救治病种名称" />
                </ta-form-item>
                <ta-form-item label="申请日期"
                              style="width:400px"
                              fieldDecoratorId="applyDate"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
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
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">审批中</ta-radio-button>
              <ta-radio-button value="4">通过</ta-radio-button>
              <ta-radio-button value="5">驳回</ta-radio-button>
              <ta-radio-button value=" ">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon="plus"
                       @click="add">新增</ta-button>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="(nowkey == '1'||nowkey == '3')? tableColumns1:tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="curStatus"
                slot-scope="a">
            <span :class="curStatusClass(a)">{{CollectionLabel('MEDICAL_RESCUE_APPLY_LIST_STATUS',a)}}</span>
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
          <a slot="action"
             class="btnlist"
             slot-scope="text,obj,index">
            <span @click="see(text,obj,index)"
                  v-if="obj.status=='3' || obj.status=='4' || obj.status=='5'"
                  class="com_textsee">查看</span>
            <span @click="edit(text,obj,index,'5')"
                  class="com_continue"
                  v-if="obj.status=='5'">继续办理</span>
            <span @click="edit(text,obj,index)"
                  v-if="obj.status=='0' || obj.status=='2'"
                  class="com_textedit">编辑</span>

            <span @click="returnBack(text,obj,index)"
                  v-if="obj.status=='1'"
                  class="com_revocation">撤回</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.status=='0' || obj.status=='2'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </a>
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
    title: '姓名',
    dataIndex: 'childName',
    align: 'center',
    scopedSlots: { customRender: 'childName' },
    width: '13%'
  },
  {
    title: '救治病种类型',
    align: 'center',
    dataIndex: 'rescueDiseaseType',
    width: '14%',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '救治病种名称',
    dataIndex: 'rescueDiseaseName',
    width: '14%'
  },
  {
    title: '医疗康复费用(元)',
    dataIndex: 'rehabilitation',
    width: '17%'
  },
  {
    title: '申请明天计划资助金额(元)',
    dataIndex: 'fund',
    width: '24%'
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    scopedSlots: { customRender: 'applyDate' },
    width: '13%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'curStatus' },
    width: '10%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: 'childName',
    align: 'center',
    scopedSlots: { customRender: 'childName' },
    width: '13%'
  },
  {
    title: '救治病种类型',
    align: 'center',
    dataIndex: 'rescueDiseaseType',
    width: '14%',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '救治病种名称',
    dataIndex: 'rescueDiseaseName',
    width: '14%'
  },
  {
    title: '医疗康复费用(元)',
    dataIndex: 'rehabilitation',
    width: '17%'
  },
  {
    title: '申请明天计划资助金额(元)',
    dataIndex: 'fund',
    width: '15%'
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    scopedSlots: { customRender: 'applyDate' },
    width: '13%'
  },
  {
    title: '审核级别',
    dataIndex: 'nextAuditOrgLevel',
    width: '13%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'curStatus' },
    width: '10%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 160,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'revoke',
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableColumns1,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      nowkey: ' ',
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueSettlement/settlementList' // 数据列表接口，API地址
      },
      sexList: [],
      childType: [],
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      minRehabilitation: 0,
      maxRehabilitation: 9999999999999,
      maxFund: 9999999999999,
      minFund: 0,
      orgType: '',
      issearch: false
    }
  },
  mounted () {
    this.getsexList()
    this.getChildType()
    this.getdiseasetypeList()
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    this.orgType = window.parent.indexTool.getUserInfo().orgType
  },
  methods: {
    // 新增
    add () {
      this.$router.push({
        name: 'applicationSettlement',
        query: {
          returnName: 'applicationSettlementRecord'
        }
      })
    },
    // 状态样式
    curStatusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.CURSTATUS.DSP1:
          classValue = 'com_tobeaudited'
          break
        case this.Enum.CURSTATUS.SPZ3:
          classValue = 'com_inaudit'
          break
        case this.Enum.CURSTATUS.TG4:
          classValue = 'com_adopt'
          break
        case this.Enum.CURSTATUS.BH5:
          classValue = 'com_reject'
          break
        default:
          classValue = 'no_submit'
          break
      }
      return classValue
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },

    returnBack (text, obj, index) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'applicationSettlementDetails',
        query: {
          obj: str,
          index: index,
          goType: 'applicationSettlementDetails-return'
        }
      })
    },
    see (text, obj, index) {
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          id: obj.id,
          childEnterId: obj.childEnterId,
          childId: obj.childId,
          startWorkflowId: obj.startWorkflowId,
          workflowId: obj.workflowId,
          medicalRescueApplyId: obj.medicalRescueApplyId,
          isNotBatch: obj.isBatch == 1,
          flag: 'approvalLook'
        }
      })
    },
    edit (text, obj, index, type) { // type为5时是继续办理
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          id: obj.id,
          childEnterId: obj.childEnterId,
          childId: obj.childId,
          medicalRescueApplyId: obj.medicalRescueApplyId,
          isNotBatch: obj.isBatch == 1,
          flag: 'edit'
        }
      })
    },
    async dels (text, obj, index) {
      await this.post(obj.isBatch == 1 ? '/medicalRescueSettlement/batchDelete' : '/medicalRescueSettlement/delete', { id: obj.id }).then(
        res => {
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
        }
      )
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
      formData.status = this.nowkey
      if (formData.status == ' ') {
        formData.status = null
      }
      this.changetime(formData)
      return formData
    },
    onSelectTime (date, dateString) {
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
            goType: 'applicationRecord-details'
          }
        })
      }
    },
    // 比较大小
    comparChange (e) {
      const inputStart = this.searchForm.getFieldValue('rehabilitationStart')
      const inputEnd = this.searchForm.getFieldValue('rehabilitationEnd')
      const inputFundStart = this.searchForm.getFieldValue('fundStart')
      const inputFundEnd = this.searchForm.getFieldValue('fundEnd')
      this.$nextTick(() => {
        if (e == '0') {
          if (inputStart != undefined) {
            this.maxRehabilitation = inputEnd
            this.minRehabilitation = inputStart
          }
        }
        if (e == '1') {
          if (inputEnd != undefined) {
            this.minRehabilitation = inputStart
            this.maxRehabilitation = inputEnd
          }
        }
        if (e == '3') {
          if (inputFundStart != undefined) {
            this.maxFund = inputFundEnd
            this.minFund = inputFundStart
          }
        }
        if (e == '4') {
          if (inputFundEnd != undefined) {
            this.minFund = inputFundStart
            this.maxFund = inputFundEnd
          }
        }
      })
    },
    // 儿童类型
    async getChildType () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.childType = data
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
    }
  }
}
</script>

<style scoped lang="less">
</style>
