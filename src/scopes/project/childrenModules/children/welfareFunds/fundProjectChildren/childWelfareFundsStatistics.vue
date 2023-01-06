<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-col :span='4'>
              <AreaQuery :fileldName="'areaCode'"
                         :msg="'区域'"
                         :isRequire="false"
                         :ishide="false"
                         class="spilwid1"
                         :addressmodel="addressmodel"
                         @setaddress="setaddress"></AreaQuery>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="年度"
                            class="spilwid"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}">
                <ta-range-picker :placeholder="['开始年度', '结束年度']"
                                 format="YYYY"
                                 :value="value"
                                 :mode="mode"
                                 @panelChange="handlePanelChange" />
              </ta-form-item>
            </ta-col>

            <ta-form-item label="资金类型"
                          fieldDecoratorId="fundType"
                          class="spilwid3"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select allowClear
                         placeholder="请选择资金类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="item in fundTypeList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>

          </ta-form>
        </div>
        <!-- 到账 -->
        <div class="left">
          <div class="echarttitle">到账合计金额：{{reachAccountTotalMoney }}元</div>
          <ta-e-charts :chartsType="'ring'"
                       :data="chartData"
                       :settings="chartSettings"
                       :data-empty="dataempty"
                       :legend-visible="true"
                       :extend="chartExtend"></ta-e-charts>
          <ta-table class="tables"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="mixDataList"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
          </ta-table>
          <ta-pagination  :defaultCurrent="page"
                         class='pagination'
                         showSizeChanger
                         showQuickJumper
                         :dataSource.sync="mixDataList"
                         :params="userPageParams"
                         @change="pagechange"
                         :url="'/welfareFundStatistics/queryReachAccountList'"
                         ref="gridPager" />
        </div>
        <div class="right">
          <!-- 下拨 -->
          <div class="echarttitle">下拨合计金额：{{allocateTotalMoney  }}元</div>
          <ta-e-charts :chartsType="'ring'"
                       :data="chartData1"
                       :settings="chartSettings1"
                       :data-empty="dataempty1"
                       :legend-visible="true"
                       :extend="chartExtend1"></ta-e-charts>
          <ta-table class="tables"
                    :columns="tableColumns1"
                    :showOverflowTooltip="true"
                    :dataSource="mixDataList1"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="allocateUnitTotalSum"
                  slot-scope="val, obj, index">
              <a @click="getAllocateUnitInfo(obj)">{{ val }}</a>
            </span>
          </ta-table>
          <ta-pagination  :defaultCurrent="page"
                         class='pagination'
                         showSizeChanger
                         showQuickJumper
                         :dataSource.sync="mixDataList1"
                         :params="userPageParams"
                         @change="pagechange1"
                         :url="'/welfareFundStatistics/queryAllocateList'"
                         ref="gridPager1" />
        </div>
      </div>
    </ta-border-layout>
    <ta-modal title="下拨信息"
              :visible="visible"
              @cancel="handleCancel"
              width="600px">
      <div slot="footer">
        <ta-button @click="handleCancel">返回</ta-button>
      </div>
      <ta-table class="tables"
                :columns="tableColumns2"
                :showOverflowTooltip="true"
                :dataSource="mixDataList2"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
      </ta-table>
    </ta-modal>
  </div>
</template>
<script>
import AreaQuery from '@/scopes/project/common/components/areaQuery'
import moment from 'moment'
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
import '@yh/ta404-ui/es/echarts/lib/style.css'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '编号',
    width: '35%',
    dataIndex: 'fileOrProjectCode'
  },
  {
    title: '资金类别',
    width: '35%',
    dataIndex: 'fundType',
    collectionType: 'CHILDWELFAREFUNDTYPESTATISTICS'
  },
  {
    title: '到账金额(元)',
    width: '35%',
    dataIndex: 'reachAccountMoney'
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
    title: '编号',
    width: '20%',
    dataIndex: 'fileOrProjectCode'
  },
  {
    title: '资金类别',
    width: '25%',
    dataIndex: 'fundType',
    collectionType: 'CHILDWELFAREFUNDTYPESTATISTICS'
  },
  {
    title: '下拨单位个数',
    width: '25%',
    dataIndex: 'allocateUnitTotalSum',
    scopedSlots: { customRender: 'allocateUnitTotalSum' }
  },
  {
    title: '总金额(元)',
    width: '20%',
    dataIndex: 'allocateMoney'
  }
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
    title: '下拨单位名称',
    width: '50%',
    dataIndex: 'allocateUnitName'
  },
  {
    title: '下拨金额(元)',
    width: '50%',
    dataIndex: 'allocateMoney'
  }
]
export default {
  components: {
    AreaQuery,
    TaECharts
  },
  data () {
    return {
      tableColumns, // 到账表头
      mixDataList: [], // 到账数据
      reachAccountTotalMoney: 0, // 到账总金额
      dataempty: false,
      page: 1, // 到账
      size: 10,

      tableColumns1, // 下拨表头
      mixDataList1: [], // 下拨数据
      allocateTotalMoney: 0, // 下拨总金额
      dataempty1: false,
      page1: 1, // 下拨
      size1: 10,

      tableColumns2, // 弹窗表头
      mixDataList2: [], // 弹窗数据
      mode: ['year', 'year'],
      value: [], // 年度选择的数据
      visible: false,

      fundTypeList: [], // 资金类型的字典数据
      addressmodel: [],

      chartData: {
        columns: ['资金类型', '金额'],
        rows: [
          //   { '资金类型': '儿童福利资助', '金额': 1523 }
        ]
      },
      chartSettings: {
        radius: ['40%', '55%'], // 环大小
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          show: true
        }
      },
      chartExtend: {
        legend: {
          orient: 'horizontal',
          x: '20%',
          y: '85%',
          itemWidth: 12,
          itemHeight: 12
        }
      },
      chartData1: {
        columns: ['资金类型', '金额'],
        rows: [
          //   { '资金类型': '儿童福利资助', '金额': 1523 }
        ]
      },
      chartSettings1: {
        radius: ['40%', '55%'], // 环大小
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          show: true
        }
      },
      chartExtend1: {
        legend: {
          orient: 'horizontal',
          x: '20%',
          y: '85%',
          itemWidth: 12,
          itemHeight: 12
        }
      }
    }
  },
  activated () {
    this.page = 1
    this.size = 10
    this.page1 = 1
    this.size1 = 10
    this.handleSubmit()
  },
  mounted () {
    this.getMenus()
  },
  methods: {
    getMenus () {
      this.getMenu('CHILDWELFAREFUNDTYPESTATISTICS', 'fundTypeList') // 获取资金类型字典数据
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
    // 点击下拨单位数获取下拨单位信息
    getAllocateUnitInfo (e) {
      let url = '/welfareFundStatistics/queryOrgMoneyListByOrgBuildAllocateId'
      // 是否机构建设类型：1是 0否 ,
      if (e.isOrgBuild == '0') {
        url = '/welfareFundStatistics/queryOrgMoneyListByAllocateId'
      }
      this.post(url, { allocateId: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.visible = true
          this.mixDataList2 = res.data.pageBean.list
          //   alert(res.data.pageBean.list)
        }
      })
    },
    // 读取列表 分页形式
    handleSubmit () {
      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      this.$refs.gridPager.loadData(data => { })
      this.$refs.gridPager1.loadData(data => { })
    },
    // 到账/下拨提交的参数
    userPageParams () {
      // 这里返回的对象是分页要一同提交的参数
      const formData = this.searchForm.getFieldsValue()
      if (this.value.length > 0) {
        formData.useYearStart = moment(this.value[0]).format('YYYY')
        formData.useYearEnd = moment(this.value[1]).format('YYYY')
      }
      if (formData.areaCode && formData.areaCode.length > 0) {
        formData.areaId = formData.areaCode.slice(-1).toString()
        delete formData.areaCode
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
        delete formData.areaCode
      }
      if (!formData.fundType) {
        delete formData.fundType
      }

      return formData
    },

    // 到账的分页
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 下拨的分页
    pagechange1 (page, size) {
      this.page1 = page
      this.size1 = size
    },
    // 重置
    resetFrom () {
      this.value = []
      this.searchForm.resetFields()
      this.handleSubmit()
    },
    // 弹窗关闭
    handleCancel () {
      this.visible = false
    },
    handlePanelChange (value, mode) {
      this.value = value
      this.mode = ['year', 'year']
    },
    // 设置地址
    setaddress () {
      this.searchForm.setFieldsValue({
        area: this.addressmodel
      })
    }
  },
  watch: {
    mixDataList: {
      handler (newName, oldName) {
        const attr_1 = [] // 饼图数据
        const attr_flag = [] // 判断attr_1数组中是否已存在重复的资金类型
        let totalMoney = 0 // 饼图总金额
        for (var i = 0; i < newName.length; i++) {
          if (attr_flag.indexOf(newName[i].fundType) != -1) { // 存在
            attr_1[attr_flag.indexOf(newName[i].fundType)]['金额'] = this.add(attr_1[attr_flag.indexOf(newName[i].fundType)]['金额'], newName[i].reachAccountMoney || 0)
          } else { // 不存在
            attr_flag.push(newName[i].fundType)
            attr_1.push({ 资金类型: newName[i].fundTypeLabel, 金额: newName[i].reachAccountMoney || 0 })
          }
          totalMoney = this.add(totalMoney, newName[i].reachAccountMoney || 0)
        }
        this.chartData.rows = attr_1
        this.reachAccountTotalMoney = totalMoney
        totalMoney == 0 ? this.dataempty = true : this.dataempty = false
      },
      deep: true,
      immediate: true
    },
    mixDataList1: {
      handler (newName, oldName) {
        const attr_1 = [] // 饼图数据
        const attr_flag = [] // 判断attr_1数组中是否已存在重复的资金类型
        let totalMoney = 0 // 饼图总金额
        for (var i = 0; i < newName.length; i++) {
          if (attr_flag.indexOf(newName[i].fundType) != -1) { // 存在
            attr_1[attr_flag.indexOf(newName[i].fundType)]['金额'] += this.add(attr_1[attr_flag.indexOf(newName[i].fundType)]['金额'], newName[i].allocateMoney || 0)
          } else { // 不存在
            attr_flag.push(newName[i].fundType)
            attr_1.push({ 资金类型: newName[i].fundTypeLabel, 金额: newName[i].allocateMoney || 0 })
          }
          totalMoney = this.add(totalMoney, newName[i].allocateMoney || 0)
        }
        this.chartData1.rows = attr_1

        this.allocateTotalMoney = totalMoney
        totalMoney == 0 ? this.dataempty1 = true : this.dataempty1 = false
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.left {
  float: left;
  width: 45%;
  height: 100%;
}
.right {
  margin-left: 5%;
  width: 45%;
  float: left;
  height: 100%;
}
.echarttitle {
  width: 100%;
  font-size: 18px;
  height: 54px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  text-indent: 20px;
  line-height: 54px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
}
.spilwid {
  width: 270px;
}
.spilwid1 {
  width: 200px;
}
.spilwid3 {
  width: 320px;
}
</style>
