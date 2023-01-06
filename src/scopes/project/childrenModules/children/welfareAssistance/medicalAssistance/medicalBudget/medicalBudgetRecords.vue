
<template>
  <!-- 预算---上报记录 -->
  <!-- <ta-border-layout> -->
  <!--<div style="width:15%;float:left">
      &lt;!&ndash; <Tree></Tree> &ndash;&gt;
      <ta-e-tree :load="loadNode"
                 highlight-current
                 :props="defaultProps"
                 node-key="areaId"
                 @node-click="click"
                 :expand-on-click-node="false"
                 lazy></ta-e-tree>
    </div>-->
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <!-- <ta-row> -->
            <ta-form-item label="年度"
                          class="spilwid"
                          fieldDecoratorId="year"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-year-picker placeholder='请选择年度' />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="fnQueryInfo">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>

          </ta-form>

        </div>
        <ta-tabs :activeKey="nowkey"
                 @change="callback">
          <ta-tab-pane tab="年度预算"
                       key="1">
            <div class="zj">
              <span>资金单位：万元</span>
            </div>
            <ta-table bordered
                      class="tables table-min-width"
                      :showOverflowTooltip="true"
                      :columns="tableColumn"
                      :dataSource="mixDataList">
              <p slot="id"
                 slot-scope="val,obj,index">{{record.id}}</p>
              <span slot="num"
                    slot-scope="val,obj,index">
                <span>{{ size * (page - 1) + index + 1 }}</span>
              </span>
              <span slot="dataType"
                    slot-scope="val,obj,index">
                <span v-if="val == '1'">本级预算</span>
                <span v-if="val == '2'">下级预算</span>
              </span>
              <div slot="action"
                   slot-scope="text,obj,index"
                   class="btnlist">
                <span @click="gorecord(obj,index)"
                      class="com_textsee">查看</span>
              </div>
            </ta-table>
          </ta-tab-pane>
          <ta-tab-pane tab="上报记录"
                       key="2">
            <div class="zj">
              <span>资金单位：万元</span>
            </div>
            <ta-table bordered
                      class="tables table-min-width"
                      :showOverflowTooltip="true"
                      :columns="tableColumns"
                      :dataSource="mixDataList">
              <p slot="id"
                 slot-scope="val,obj,index">{{record.id}}</p>
              <span slot="num"
                    slot-scope="val,obj,index">
                <span>{{ size * (page - 1) + index + 1 }}</span>
              </span>
              <div slot="action"
                   slot-scope="text,obj,index"
                   class="btnlist">
                <span @click="gorecord(obj,index)"
                      class="com_textsee">查看</span>
              </div>
            </ta-table>
          </ta-tab-pane>
          <ta-button @click="add(2)"
                     slot="tabBarExtraContent"
                     type="primary"
                     style="margin-right: 10px;">本单位年度预算</ta-button>
          <ta-button @click="add(1)"
                     slot="tabBarExtraContent"
                     type="primary">预算汇总上报</ta-button>
        </ta-tabs>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :total="total"
                       @change="pagechange"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
// import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
const tableColumn = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '年度',
    dataIndex: 'year',
    width: '10%'
  },

  {
    title: '单位',
    dataIndex: 'orgName',
    width: '13%'
  },
  {
    title: '预算类型',
    dataIndex: 'dataType',
    width: '13%',
    scopedSlots: { customRender: 'dataType' }
  },
  {
    title: '总例数',
    dataIndex: 'totalNum',
    width: '10%'
  },
  {
    title: '诊疗总资金',
    dataIndex: 'diagnoseCostCapitalTotal',
    width: '13%'
  },

  {
    title: '康复总资金',
    dataIndex: 'recoveryCostCapitalTotal',
    width: '13%'
  },
  {
    title: '特殊药品总资金',
    dataIndex: 'specialDrugfeeCapitalTotal',
    width: '15%'
  },

  {
    title: '康复器具总资金',
    dataIndex: 'rehabApparatusCostCapitalTotal',
    width: '15%'
  },
  {
    title: '体检总资金',
    dataIndex: 'physicalCostCapitalTotal',
    width: '13%'
  },
  {
    title: '住院服务资金',
    dataIndex: 'hospitallCostCapitalTotal',
    width: '14%'
  },
  {
    title: '总计',
    dataIndex: 'totalMoney',
    width: '8%'
  },

  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' }
    // fixed: 'right'
  }
]
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '年度',
    dataIndex: 'year',
    width: '10%'
  },

  {
    title: '单位',
    dataIndex: 'orgName',
    width: '13%'
  },
  {
    title: '总例数',
    dataIndex: 'totalNum',
    width: '10%'
  },
  {
    title: '诊疗总资金',
    dataIndex: 'diagnoseCostCapitalTotal',
    width: '13%'
  },

  {
    title: '康复总资金',
    dataIndex: 'recoveryCostCapitalTotal',
    width: '13%'
  },
  {
    title: '特殊药品总资金',
    dataIndex: 'specialDrugfeeCapitalTotal',
    width: '15%'
  },

  {
    title: '康复器具总资金',
    dataIndex: 'rehabApparatusCostCapitalTotal',
    width: '15%'
  },
  {
    title: '体检总资金',
    dataIndex: 'physicalCostCapitalTotal',
    width: '13%'
  },
  {
    title: '住院服务资金',
    dataIndex: 'hospitallCostCapitalTotal',
    width: '14%'
  },
  {
    title: '总计',
    dataIndex: 'totalMoney',
    width: '8%'
  },

  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' }
    // fixed: 'right'
  }
]
export default {
  // mixins: [listMixin],
  data () {
    return {
      mixDataList: [],
      size: 10,
      page: 1,
      tableColumn,
      tableColumns,
      sexList: [],
      childType: [],
      mixPageRef: 'gridPager',
      defaultExpandedRowKeys: [],
      dataObj: {
        pageNumber: 1,
        pageSize: 10
      },
      areaId: '',
      nowkey: '1',
      total: 0,
      defaultProps: {
        label: 'areaName', // 指定json数组中，当前节点在页面上显示的文本的key，默认：label
        id: 'areaId', // 指定json数组中节点的唯一标识，默认：id，必须与node-key属性指定的值一致
        isLeaf: 'isLeaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      }
    }
  },
  activated () {
    this.fnQueryInfo()
  },
  mounted () {
    this.getsexList()
    this.getChildType()
    let params = this.$route.params
  },
  methods: {
    add (type) {
      this.post('/medicalRescueBudgetReport/verifyBudget', { dataType: type == 1 ? 2 : 1 }).then((res) => {
        if (res.serviceSuccess) {
          if (type == 1) { //预算汇总上报
            this.$router.push({
              name: 'medicalBudgetReport',
              params: {
                goType: 'medicalBudgetReport-detail'
              }
            })
          } else if (type == 2) { // 本单位年度预算
            this.$router.push({
              name: 'medicalBudgetReport',
              params: {
                goType: 'medicalBudgetReport'
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
      this.fnQueryInfo()
    },
    // 重置
    resetFrom () {
      this.searchForm.resetFields()
      this.fnQueryInfo()
    },
    // 查询数据
    async fnQueryInfo () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      let params = this.dataObj
      params = { ...formData }
      this.post('/checkChildApi/queryAreaByCurrentUserCounty')
        .then(res => {
          this.areaId = res.data.data && res.data.data.length > 0 ? res.data.data[0].areaid : ''
          params.areaId = this.areaId
          params.queryListType = this.nowkey
        })
        .then(() => {
          this.post('/medicalRescueBudgetReport/list', params).then(res => {
            // 分页中数据的总条数
            this.total = res.data.pageBean.total
            this.mixDataList = res.data.pageBean.list
          })
        })
    },
    changetime (data) {
      // 是对象 不是数组
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY')
        }
      }
    },
    /*click (data, node, self) {
      this.mixDataList = []
      let params = {}
      params.areaCode = node.key
      params.queryListType = this.nowkey
      this.post('/medicalRescueBudgetReport/list', params).then(res => {
        this.total = res.data.pageBean.total
        this.mixDataList = res.data.pageBean.list
      })
    },*/
    // 加载子节点方法
    /*loadNode (node, resolve) {
      if (node.level > 2) return resolve([]) // 该示例对超过3级的数据不进行异步加载
      Base.submit(null, {
        url: '/areaManagement/queryAreaByAsync',
        data: { areaId: node.key, areaLevel: '3' }
      }).then(result => {
        if (node.level == 3) {
          result.data.areaList.map((item, index) => {
            item.isLeaf = false
          })
        }
        const treeData = result.data.areaList
        resolve(treeData)
      })
      //   }
    },*/
    gorecord (obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'medicalBudgetDetail',
        params: {
          obj: str,
          index: index,
          goType: 'medicalBudgetReport-detail'
        }
      })
    },
    // 儿童类型
    async getChildType () {
      let data = await this.getDictionaries('CHILDTYPE')
      this.childType = data
    },
    // 儿童性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    pagechange (page, size) {
      this.dataObj.pageSize = size
      this.dataObj.pageNumber = page
      this.fnQueryInfo()
    }
  }
}
</script>
<style scoped>
.zj {
  float: right;
}
</style>
