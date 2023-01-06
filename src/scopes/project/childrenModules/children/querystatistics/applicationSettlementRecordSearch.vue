<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <AreaQuery v-if="isorgType"
                           msg="区域"
                           class="spilwid"
                           :ishide="true"
                           :addressmodel='addressmodel'
                           @setaddress='setaddr'
                           @adsvalchange='adsvalchange'
                           :labelCol="{span:7}"
                           :wrapperCol="{span:17}"
                           ref="areaselect"
                           types="1"></AreaQuery>
                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              fieldDecoratorId="childName"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="性别"
                              style="width:240px"
                              fieldDecoratorId="sex"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="结账申请日期"
                              fieldDecoratorId="applyDate"
                              class="spilwid2"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-range-picker />
                </ta-form-item>

              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="search('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>

          </ta-form>
        </div>
      </div>
      <div style="height: 50px;">
        <div style="float:right;">
          <!-- <ta-button @click="returns"
                       slot="tabBarExtraContent"
                       icon="rollback"
                       v-if="returnName">返回</ta-button> -->
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
      </div>
      <ta-spin tip="加载中..."
               size="small"
               :spinning="spinning">
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="childName"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.childName}}</a>
          <span slot="auditDate"
                slot-scope="text,obj,index">{{text | auditDate}}</span>
          <div slot="auditDate"
               slot-scope="val,obj,index">
            <span>
              <span>{{val | datafilter}}</span>
            </span>
          </div>
          <span slot="action"
                slot-scope="text,obj"
                class="btnlist">
            <span class="com_textsee"
                  @click="addAdoption(obj)">查看</span>
          </span>
        </ta-table>
      </ta-spin>
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
import AreaQuery from '@component/common/components/areaQuery'
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
    dataIndex: 'areaName',
    width: '16%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'childName',
    align: 'center',
    scopedSlots: { customRender: 'childName' },
    width: '15%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    width: '12%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '12%'
  },
  {
    title: '结账申请日期',
    dataIndex: 'applyDate',
    align: 'center',
    width: '16%'
  },
  {
    title: '所属机构',
    dataIndex: 'orgName',
    align: 'center',
    width: '16%'
  },
  {
    title: '医疗费用(元)',
    dataIndex: 'rehabilitation',
    align: 'center',
    width: '14%'
  },
  {
    title: '“明天计划”资助金额(元)',
    dataIndex: 'fundSubtotal',
    align: 'center',
    width: '20%'
  },
  // {
  //   title: '医疗救助申请次数',
  //   dataIndex: 'count',
  //   width: '18%'
  // },
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
  name: 'revoke',
  components: {
    AreaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      spinning: null,
      tableColumns,
      isorgType: true,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      nowkey: ' ',
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueArchives/querySettlementList' // 数据列表接口，API地址
      },
      isdisabled: true,
      showOn: false, // 导出提示弹窗的显隐控制
      chosedata: [],
      visible: false,
      sexList: [],
      childType: [],
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      fileldName: 'address_Linkage',
      types: '1',
      ishide: false,
      issearch: false,
      addressmodel: []
      // diseasetypeList: []
    }
  },
  activated () {
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
      }
      this.setaddr()
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
      })
    }
  },
  mounted () {
    this.getsexList()
    this.getChildType()
    this.getchildmedicaltypeList()
    this.getchildidentitytypeList()
    this.getdiseasetypeList()
    const nowDate = new Date()
    const nowyear = nowDate.getFullYear()
    const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
    const nowday = nowDate.getDate()
    const yearstart = nowyear + '-01-01'
    const yearend = nowyear + '-' + nowmonth + '-' + nowday
    this.searchForm.resetFields()
    this.searchForm.setFieldsValue({ applyDate: [moment(yearstart), moment(yearend)] })
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    if (this.areaId == '1000000000000000000') {
      this.addressmodel = []
    } else {
      this.addressmodel = [this.areaId]
    }
    if (window.parent.indexTool.getUserInfo().orgType == '99') {
      this.isorgType = false
    }
    this.$nextTick(() => {
      this.search()
    })
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  methods: {
    adsvalchange () {

    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    setaddr () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      this.chosedata = val2
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      for (var i = 0; i < this.chosedata.length; i++) {
        if (this.chosedata.nodesState == '2') {
        } else {
        }
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.nodesState = this.nowkey
      if (formData.nodesState == ' ') {
        formData.nodesState = null
      }

      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      this.changetime(formData)
      return formData
    },

    // setHeight (ref, refout, istrue) {
    //   const node = this.$refs[refout]
    //   this.$nextTick(() => {
    //     if (!istrue) {
    //       node.style.height = this.$refs[ref].$el.offsetHeight + 50 + 'px'
    //     } else {
    //       node.style.height = '50px'
    //     }
    //     node.style.transition = 'all 1s'
    //   })
    // },
    search () {
      this.page = 1
      this.size = 10
      this.spinning = true
      this.handleSubmit()
      this.$nextTick(() => {
        this.spinning = false
        this.issearch = !this.issearch
        this.advancedquery()
      })
    },
    // onSelectTime (date, dateString) {
    // },
    resetFrom () {
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      const nowday = nowDate.getDate()
      const yearstart = nowyear + '-01-01'
      const yearend = nowyear + '-' + nowmonth + '-' + nowday
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({ applyDate: [moment(yearstart), moment(yearend)] })
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      if (this.areaId == '1000000000000000000') {
        this.addressmodel = []
      } else {
        this.addressmodel = [this.areaId]
      }
      this.search()
    },
    addAdoption (obj) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          id: obj.id,
          childEnterId: obj.childEnterId,
          childId: obj.childId,
          isNotBatch: obj.isBatch == 1,
          prominentChildId: obj.childId, // 综合查询点查看进去后需要凸显此儿童
          flag: 'look'
        }
      })
    },
    childInfo (val, obj, index) {
      if (obj.childEnterId) {
        const param = {
          id: obj.childEnterId
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
    // 儿童身份类型
    async getchildidentitytypeList () {
      const data = await this.getDictionaries('CHILDIDENTITYTYPE')
      this.childidentitytypeList = data
    },
    // 儿童类型
    async getChildType () {
      const data = await this.getDictionaries('CHILDTYPE')
      this.childType = data
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
    // 导出按钮的点击事件
    showModal () {
      this.showOn = true
    },
    // 导出提示弹窗的取消事件
    handleCancel (e) {
      this.showOn = false
    },
    // 导出事件
    Excel () {
      var data = this.userPageParams()
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      const url = '/medicalRescueArchives/querySettlementListExport'
      this.exportFile(url, data)
      this.showOn = false
    }
    // // 儿童身份类型
    // async getchildidentitytypeList () {
    //   let data = await this.getDictionaries('CHILDIDENTITYTYPE')
    //   this.childidentitytypeList = data
    // }
    // // 救治病种类型
    // async getdiseasetypeList () {
    //   let data = await this.getDictionaries('DISEASETYPE')
    //   this.diseasetypeList = data
    // }
  }
}
</script>
