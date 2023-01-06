<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div id="content">
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              fieldDecoratorId="childName"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>

                <ta-form-item label="儿童类别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType">
                  <ta-select class="selectwid"
                             :getPopupContainer="setPopupContainer"
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childrenTypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="儿童性别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="sex">
                  <ta-select class="selectwid"
                             :getPopupContainer="setPopupContainer"
                             placeholder="请选择儿童性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="登记增员日期"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              class="spilwid2"
                              fieldDecoratorId="registerDate">
                  <ta-range-picker :getCalendarContainer="setPopupContainer" />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>

        </div>
        <!-- 正常的列表 -->
        <div class="operateBtn">
          <ta-button icon='rollback'
                     v-if="returnName&&!isNotChoseChildren"
                     @click="returns">返回</ta-button>
          <ta-button type="primary"
                     icon="plus"
                     @click="batchApplication">{{!isNotChoseChildren?'批量申请体检费用':'批量添加'}}</ta-button>
        </div>
        <ta-table class="table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered
                  ref="table"
                  :show-checkbox="isNotChoseChildren"
                  row-key="childEnterId">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="childName"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.childName}}</a>
          <span slot="auditDate"
                slot-scope="text">{{text | auditDate}}</span>
          <div slot="auditDate"
               slot-scope="val">
            <span>
              <span>{{val | datafilter}}</span>
            </span>
          </div>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_publish"
                  v-if="!isNotChoseChildren"
                  @click="addAdoption(text,obj,index)">申请</span>
            <span v-if="isNotChoseChildren&&selectedChildId.indexOf(obj.childEnterId)==-1"
                  @click="addsure(text,obj,index)">确认添加</span>
            <span v-if="isNotChoseChildren&&selectedChildId.indexOf(obj.childEnterId)!=-1"
                  class="sureAddClass">确认添加</span>
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
                       :pageSizeOptions="['10','20','30','40','50']"
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    align: 'center',
    width: 150,
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    align: 'center',
    width: 350,
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '登记增员日期',
    dataIndex: 'registerDate',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'registerDate' }
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
  mixins: [listMixin],
  props: ['selectedChildId'],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueSettlement/pageChildInfoForSettlement' // 数据列表接口，API地址
      },
      walfareType: {
        authority: '0',
        createDate: '2019-08-28',
        createUser: '1',
        label: '福利机构养育孤弃儿童',
        name: '儿童类别-福利院',
        newType: '0',
        sort: 10,
        status: '1',
        system: '1',
        type: 'CHILDCATEGORYF',
        value: '1',
        version: 1
      },
      sexList: [],
      childrenTypeList: [], // 儿童类别字典数据
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      issearch: false,
      isNotChoseChildren: false, // 是否是选择儿童弹窗
      excludeChildEnterIds: [], // 需要传到后台的要筛选掉的儿童入院id数组
      includeChildEnterIds: [], // 点击选择儿童按钮需要被勾选的儿童
      returnName: null // 返回按钮要返回的页面
    }
  },
  activated () {
    this.returnName = this.$route.query.returnName
    this.issearch = false
    this.isNotChoseChildren = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getsexList()
    this.getChildType()
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  watch: {
    tableData (val) {
      if (this.isNotChoseChildren) {
        const tableDataIds = []
        val.forEach(item => {
          if (this.selectedChildId.includes(item.childEnterId)) {
            tableDataIds.push(item.childEnterId)
          }
        })
        this.$nextTick(() => {
          this.$refs.table.setChecked([...(new Set([...tableDataIds]))])
        })
      }
    }
  },
  methods: {
    // 处理下拉框随底层页面滚动的问题
    setPopupContainer (trigger) {
      // trigger为触发弹出框的节点
      // 设置他的弹出框容器为content,如果不设置默认为body
      // 设置弹出框容器主要是为了解决页面滚动时可能会出现的弹出框脱离输入框的情况
      return document.getElementById('content')
    },
    // 批量申请体检费用
    batchApplication () {
      const selectedArr = this.$refs.table.getChecked().selectedRows
      if (this.isNotChoseChildren && selectedArr.length == 0) {
        this.$message.warn('请选择儿童！')
        return false
      } else if (this.isNotChoseChildren) { // 选择儿童弹窗-批量添加
        this.$emit('addsure', selectedArr, this.tableData)
      } else { // 批量申请体检费用按钮进入
        this.$router.push({
          name: 'settlementChangeFor',
          query: {
            flag: 'add',
            isNotBatch: true
          }
        })
      }
    },
    // 确认添加
    addsure (e, obj, index) {
      const selectChildEnterIds = [] // 选中的（包括未被添加的）
      const addObjs = [] // 需要被添加的
      const selectedRows = this.$refs.table.getChecked().selectedRows
      selectedRows.forEach(element => {
        if (this.selectedChildId.indexOf(element.childEnterId) != -1) {
          addObjs.push(element)
        }
        selectChildEnterIds.push(element.childEnterId)
      })
      this.$refs.table.setChecked([...(new Set([...selectChildEnterIds, obj.childEnterId]))])
      this.$emit('addsure', [...(new Set([...addObjs, obj]))], this.tableData)
    },
    // 返回 到原页面
    returns () {
      this.$router.push({
        name: this.returnName
      })
    },
    // 读取列表 分页形式
    handleSubmit (e) {
      const _self = this
      if (e) { // 只有点查询才重置参数
        _self.page = 1
        _self.size = 10
      }
      _self.nowtype = 0
      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      const ref = _self.mixPageRef
      _self.$nextTick(() => {
        _self.$refs[ref].loadData(data => {
          if (_self.isNotChoseChildren) {
            this.$nextTick(() => {
              _self.$refs.table.setChecked(_self.includeChildEnterIds)
            })
          }
        })
      })
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (this.isNotChoseChildren && this.excludeChildEnterIds.length > 0) { // 作为批量申请的弹窗时
        formData.childEnterIds = this.excludeChildEnterIds
      }

      this.changetime(formData)
      return formData
    },
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 结账
    addAdoption (text, obj, index) {
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          id: obj.id,
          childEnterId: obj.childEnterId,
          childId: obj.childId,
          medicalRescueApplyId: obj.medicalRescueApplyId,
          flag: 'add'
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
    // 儿童类别
    async getChildType () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.childrenTypeList = data
      if (this.childTypeCode == 'CHILDCATEGORYM') {
        const index = this.childrenTypeList.findIndex(item => item.value == this.Enum.CHILDCATEGORYA.AZBBDGRET)
        if (index != -1) {
          this.childrenTypeList.splice(index, 1)
        }
        this.childrenTypeList.splice(this.childrenTypeList.length - 1, 0, this.walfareType)
      }
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    }
  }
}
</script>
<style lang="less" scoped>
.sureAddClass {
  color: #ccc;
}
</style>
