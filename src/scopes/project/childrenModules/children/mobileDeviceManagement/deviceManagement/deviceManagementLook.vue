<template>
  <div class="padbottom conts tadrawer">
    <div class="contin">
      <ta-tabs defaultActiveKey="1"
               @change="callback"
               :activeKey="nowkey">
        <!-- 设备信息 -->
        <ta-tab-pane tab="设备信息"
                     key="0">
          <deviceDetailInfo :obj="obj"></deviceDetailInfo>
        </ta-tab-pane>

        <!-- <ta-tab-pane tab="设备激活记录"
                     key="1">
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns1"
                    :dataSource="tableData1">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="activationDate"
                  slot-scope="a">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
            </span>
          </ta-table>
          <div class="pagination">
            <ta-pagination v-model="current"
                           :total="total"
                           @change="pagechange"
                           @showSizeChange="sizeChange" />
          </div>
        </ta-tab-pane> -->
        <ta-tab-pane tab="挂失解挂记录"
                     key="2">
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns2"
                    :dataSource="tableData2">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="operationTime"
                  slot-scope="a">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
            </span>
            <span slot="operationTime_1"
                  slot-scope="a">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
            </span>
          </ta-table>
          <div class="pagination">
            <ta-pagination v-model="current"
                           :total="total"
                           @change="pagechange"
                           @showSizeChange="sizeChange" />
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="数据清除记录"
                     key="3">
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns3"
                    :dataSource="tableData3">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="operationTime"
                  slot-scope="a">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
            </span>
          </ta-table>
          <div class="pagination">
            <ta-pagination v-model="current"
                           :total="total"
                           @change="pagechange"
                           @showSizeChange="sizeChange" />
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="设备解绑记录"
                     key="4">
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns4"
                    :dataSource="tableData4">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="operationTime"
                  slot-scope="a">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
            </span>
          </ta-table>
          <div class="pagination">
            <ta-pagination v-model="current"
                           :total="total"
                           @change="pagechange"
                           @showSizeChange="sizeChange" />
          </div>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <ta-button @click="backs">返回</ta-button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import deviceDetailInfo from './components/deviceDetailInfo.vue'

const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '设备编号',
    align: 'center',
    dataIndex: 'equipmentNum',
    width: '18%'
  },
  {
    title: 'SN编码',
    align: 'center',
    dataIndex: 'equipmentNumber',
    width: '18%'
  },
  {
    title: '设备型号',
    align: 'center',
    dataIndex: 'equipmentModel',
    width: '18%'
  },
  {
    title: '设备激活人',
    align: 'center',
    dataIndex: 'activatorName',
    width: '18%'
  },
  {
    title: '设备激活人业务账号',
    align: 'center',
    dataIndex: 'loginId',
    width: '20%'
  },
  {
    title: '设备激活人职责范围',
    dataIndex: 'activatorOrg',
    width: '35%'
  },
  {
    title: '设备激活日期',
    align: 'center',
    dataIndex: 'activationDate',
    scopedSlots: { customRender: 'activationDate' },
    width: '20%'
  }
  // {
  //   title: '设备激活备注',
  //   dataIndex: 'remark',
  //   width: '30%'
  // }
]
const tableColumns2 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '设备编号',
    align: 'center',
    dataIndex: 'equipmentNum',
    width: '18%'
  },
  {
    title: 'SN编码',
    align: 'center',
    dataIndex: 'equipmentNumber',
    width: '18%'
  },
  {
    title: '设备锁定时间',
    align: 'center',
    dataIndex: 'operationTime',
    scopedSlots: { customRender: 'operationTime' },
    width: '10%'
  },
  {
    title: '锁定人',
    align: 'center',
    dataIndex: 'operationUser',
    width: '12%'
  },
  {
    title: '设备锁定备注',
    dataIndex: 'operationReason',
    width: '28%'
  },
  {
    title: '设备解锁时间',
    align: 'center',
    dataIndex: 'operationTime_1',
    scopedSlots: { customRender: 'operationTime_1' },
    width: '10%'
  },
  {
    title: '解锁人',
    align: 'center',
    dataIndex: 'operationUser_1',
    width: '12%'
  },
  {
    title: '设备解锁备注',
    dataIndex: 'operationReason_1',
    width: '28%'
  }
]
const tableColumns3 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '设备编号',
    align: 'center',
    dataIndex: 'equipmentNum',
    width: '18%'
  },
  {
    title: 'SN编码',
    align: 'center',
    dataIndex: 'equipmentNumber',
    width: '18%'
  },
  {
    title: '数据清除时间',
    align: 'center',
    dataIndex: 'operationTime',
    width: '23%'
  },
  {
    title: '操作人',
    align: 'center',
    dataIndex: 'operationUser',
    width: '23%'
  },
  {
    title: '数据清除原因',
    dataIndex: 'operationReason',
    width: '35%'
  }
]
const tableColumns4 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '设备编号',
    align: 'center',
    dataIndex: 'equipmentNum',
    width: '18%'
  },
  {
    title: 'SN编码',
    align: 'center',
    dataIndex: 'equipmentNumber',
    width: '18%'
  },
  {
    title: '设备解绑时间',
    align: 'center',
    dataIndex: 'operationTime',
    width: '15%'
  },
  {
    title: '设备解绑人',
    align: 'center',
    dataIndex: 'operationUser',
    width: '15%'
  },
  {
    title: '解绑原因',
    dataIndex: 'operationReason',
    width: '30%'
  },
  {
    title: '设备备注',
    dataIndex: 'remark',
    width: '30%'
  }
]
export default {
  components: {
    deviceDetailInfo
  },
  data () {
    return {
      nowkey: '0', // 当前激活 tab 面板的 key
      current: 1, // 当前页
      total: 0, // 总页数
      page: 1,
      size: 10,
      obj: null, // 查看时接口返回的对象
      tableColumns1, // 设备激活记录数据
      tableColumns2, // 挂失解挂记录数据
      tableColumns3, // 数据清除记录数据
      tableColumns4, // 设备解绑记录数据
      tableData1: [], // 设备激活记录数据
      tableData2: [], // 挂失解挂记录数据
      tableData3: [], // 数据清除记录数据
      tableData4: [] // 设备解绑记录数据
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 初始化数据
    initData () {
      this.nowkey = '0'
      this.current = 1
      this.tableData1 = []
      this.tableData2 = []
      this.tableData3 = []
      this.tableData4 = []

      this.post('/deviceManagement/queryById', { equipmentId: this.$route.query.equipmentId }).then(res => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.obj = data
          // 处理挂失/解挂数据
          this.obj.reportLossAndReleaseList = this.handleData()
          this.setTableData(true)
        }
      })
    },
    // 分页change
    pagechange (page, size) {
      this.page = page
      this.size = size
      this.setTableData()
    },
    // pageSize 变化的回调
    sizeChange (current, size) {
      this.page = current
      this.size = size
      this.setTableData()
    },
    // tab切换
    callback (e) {
      this.page = 1
      this.size = 10
      this.nowkey = e
      this.current = 1
      this.setTableData(true)
    },
    // table表格赋值
    setTableData (isCallback) {
      if (this.nowkey == '0') return;
      let objName
      if (this.nowkey == '1') {
        objName = 'deviceActivatorList'
      } else if (this.nowkey == '2') {
        objName = 'reportLossAndReleaseList'
      } else if (this.nowkey == '3') {
        objName = 'dataDumpList'
      } else {
        objName = 'unbundlingList'
      }
      this.$nextTick(() => {
        this['tableData' + this.nowkey] = JSON.parse(JSON.stringify((this.obj[objName] || []).slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size)))
        if (isCallback) { // tab切换时改变总数
          this.total = this.obj[objName].length
        }
        if (this['tableData' + this.nowkey] && this['tableData' + this.nowkey].length == 0) {
          // 无数据时显示暂无数据
          $('.ant-table .no-data').addClass('pop')
        }
      })
    },
    // 处理挂失/解挂数据
    handleData () {
      const arr = this.obj.reportLossAndReleaseList || []
      const odd = [] // 奇数元素
      const even = [] // 偶数元素
      const newArr = [] // 处理后的数据
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) { // 偶数（解挂的数据）
          if (arr[i].equipmentNumber) {
            arr[i] = JSON.parse(JSON.stringify(arr[i]).replace(/operationTime/g, 'operationTime_1').replace(/operationReason/g, 'operationReason_1').replace(/operationUser/g, 'operationUser_1'))
          }
          even.push(arr[i])
        } else { // 奇数（挂失的数据）
          odd.push(arr[i])
        }
      }
      // 合并数据
      for (let j = 0; j < odd.length; j++) {
        newArr.push(Object.assign(odd[j], even[j]))
      }
      return newArr
    },
    // 返回
    backs () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.pagination {
  float: right;
  margin: 30px auto;
}
</style>
