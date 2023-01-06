<template>
  <div class="searchdata"
       id='tmd'>
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px'  }">
      <div style="height:90%;">

        <div class="operateBtn">
          <div class="radioClass leftClass">
            <ta-radio-group v-model="nowkey"
                            buttonStyle="solid"
                            @change="callback">

              <ta-radio-button value="1">事实无人抚养儿童</ta-radio-button>
              <ta-radio-button value="2">监护不当儿童</ta-radio-button>
              <!-- <ta-radio-button value="3">贫困儿童</ta-radio-button>
              <ta-radio-button value="4">残疾儿童</ta-radio-button> -->

            </ta-radio-group>
          </div>

        </div>
        <div style="float:right;margin-top:-44px">
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
          <ta-button v-if="isgoback"
                     icon="rollback"
                     @click="goback">返回</ta-button>
        </div>

        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table class="tables table-min-width  hight "
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="tableData"
                    bordered
                    :scroll="{ x: 3400,y: 550 }">
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel==4 || b.areaName=='合计' ||b.orgOrWelfare == '0' || b.isIn == '01'">{{a}}</span>
              <a @click="searchslist(b)"
                 v-else>{{a}}</a>
            </template>
          </ta-table>
        </ta-spin>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
// import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
import '@yh/ta404-ui/es/echarts/lib/style.css'
var that = null
export default {
  // mixins: [listMixin],
  components: {
    AreaQuery,
    TaECharts
  },
  data () {
    return {
      spinning: null,
      tobeshow: false,
      isgoback: false,
      value: [],
      mode2: ['month', 'month'],
      colors1: ['#9400d3'],
      colors2: ['#1890ff'],
      colors3: ['#7AB439'],

      nowkey: '1',
      termCategory: '3',

      nowcode: '',
      ishide: true,
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          fixed: 'left',
          align: 'center',
          width: 220,
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '总人数',
          width: 130,
          fixed: 'left',
          customHeaderCell: (a) => {
            const myCol = {
              class: 'myHeaderCellAge'

            }
            return myCol
          },
          customCell: (a) => {
            const myCell = {
              class: 'myCellClass'

            }
            return myCell
          },
          align: 'center',
          dataIndex: 'childSum'
        },
        {
          title: '儿童性别',
          children: [
            {
              title: '男',
              width: 110,
              align: 'center',
              dataIndex: 'manCount'
            },
            {
              title: '女',
              width: 110,
              align: 'center',
              dataIndex: 'womanCount'
            },
            {
              title: '其他',
              width: 120,
              align: 'center',
              dataIndex: 'sexOtherCount'
            }
          ]
        },
        {
          title: '健康状况',
          children: [
            {
              title: '健康',
              width: 120,
              align: 'center',
              dataIndex: 'healthCount'
            },
            {
              title: '一般或较弱',
              // title: '非健康',
              width: 130,
              align: 'center',
              dataIndex: 'yibanCount'
            },
            {
              title: '重病',
              width: 130,
              align: 'center',
              dataIndex: 'zhongbingCount'
            },
            {
              title: '慢性病',
              width: 130,
              align: 'center',
              dataIndex: 'manxingbingCount'
            },
            {
              title: '残疾',
              width: 130,
              align: 'center',
              dataIndex: 'canjiCount'
            },
            // {
            //   title: '未说明情况',
            //   width: 130,
            //   align: 'center',
            //   dataIndex: 'noHealthCount5'
            // }
            // ,
            {
              title: '其他',
              width: 120,
              align: 'center',
              dataIndex: 'healthOtherCount'
            }
          ]
        },
        {
          title: '教育',
          children: [
            {
              title: '学龄前',
              width: 130,
              align: 'center',
              dataIndex: 'beforeSchoolCount'
            },
            {
              title: '小学',
              width: 120,
              align: 'center',
              dataIndex: 'primarySchoolCount'
            },
            {
              title: '初中',
              width: 120,
              align: 'center',
              dataIndex: 'juniorHighSchoolCount'
            },
            {
              title: '高中',
              width: 120,
              align: 'center',
              dataIndex: 'seniorHighSchoolCount'
            },
            {
              title: '大中专及以上',
              width: 200,
              align: 'center',
              dataIndex: 'technicalSchoolCount'
            },
            {
              title: '其他',
              width: 180,
              align: 'center',
              dataIndex: 'educationOtherCount'
            }
          ]
        },

        {
          title: '户籍性质',
          children: [
            {
              title: '农村居民户口',
              width: 170,
              align: 'center',
              dataIndex: 'geoponicsRegisterCount'
            },
            {
              title: '城镇居民户口',
              width: 170,
              align: 'center',
              dataIndex: 'noGeoponicsRegisterCount'
            },
            {
              title: '居民户口',
              width: 170,
              align: 'center',
              dataIndex: 'residentRegisterCount'
            },
            {
              title: '其他户口人数',
              width: 180,
              align: 'center',
              dataIndex: 'otherRegisterCount'
            }
          ]
        },

        {
          title: '保障措施',
          children: [
            {
              title: '建档立卡贫困户家庭人数',
              width: 280,
              align: 'center',
              dataIndex: 'jdlkFamilyCount'
            },
            {
              title: '城乡低保家庭人数',
              width: 230,
              align: 'center',
              dataIndex: 'dibaoChildCount'
            },
            {
              title: '纳入特困人员救助供养人数',
              width: 280,
              align: 'center',
              dataIndex: 'tekunHelpCount'
            },
            {
              title: '其它救助人数',
              width: 180,
              align: 'center',
              dataIndex: 'otherHelpCount'
            },
            {
              title: '无',
              width: 110,
              align: 'center',
              dataIndex: 'noHelpCount'
            }
          ]
        }

      ],

      dateText: '全部',
      tableData: [],
      parentTableData: [],

      orgId: '',
      areaCode: '',
      areaLevel: '',
      areaId: '',
      params: {},
      sum: 0,
      childrenSum: {
        columns: ['registerDate', 'totalNumber'],
        rows: []
      },
      dailyVariation: '0',
      chartSettings: {
        area: true

      },
      ringdata: {
        // columns: ['lessOne', 'oneToThree', 'fourToFix', 'sevenToTen', 'elevenToEighteen', 'greaterEighteen'],
        columns: ['name', 'sum'],
        rows: []
      },

      chartExtend: {

      },
      // 父母情况
      parentdata: {
        columns: ['registerName', 'perentTotalNumber'],
        rows: []
      },
      parentdataExtend: {
        barWidth: 20

      },
      showOn: false,
      zhName: '',
      parentdataAll: {},
      tableListData: {},
      parentdataxAxis: [

      ],
      // 就学情况
      schoolSituationData: {
        columns: ['schoolSituationName', 'schoolSituationNum'],
        rows: []
      },
      schoolSituationlist: [],
      perentsum: '',
      dataEmpty1: false,
      dataEmpty2: false,
      dataEmpty3: false,
      dataEmpty4: false,
      xAxis: [

      ],
      childrenSumxAxis: [

      ],
      yAxis: [

      ],
      childrenSumtooltip: {

      },
      parentdatatooltip: {

      },
      schoolSituationDatatooltip: {

      },
      areaIdNow: window.parent.indexTool.getUserInfo().areaId
    }
  },
  created () {
    that = this
  },
  activated () {
    this.nowkey = '1'
  },
  mounted () {
    this.getData()
  },
  methods: {
    Excel () {
      const par = {
        areaId: this.areaIdNow,
        childType: this.nowkey
      }
      const url = '/factNoOneRaisedWholeApi/exportDifficultFourAllNum'
      this.exportFile(url, par)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    async getData () { // 获去列表。
      this.spinning = true
      const par = {
        // areaLevel: window.parent.indexTool.getUserInfo().areaLevel,
        areaId: window.parent.indexTool.getUserInfo().areaId,
        childType: this.nowkey
      }
      const res = await this.post('factNoOneRaisedWholeApi/queryFactNoOneRaisedWholeReportNew', par)

      if (!res.erros) {
        this.tableData = res.data.data || []
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    async searchslist (value) {
      this.isgoback = true
      this.areaIdNow = value.areaId
      const par = {
        // areaLevel: window.parent.indexTool.getUserInfo().areaLevel,
        areaId: value.areaId,
        childType: this.nowkey
      }
      const res = await this.post('factNoOneRaisedWholeApi/queryFactNoOneRaisedWholeReportNew', par)

      if (!res.erros) {
        this.tableData = res.data.data || []
      }
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key.target.value
      this.getData()
      if (this.nowkey == 2) {
        this.tobeshow = true
      } else {
        this.tobeshow = false
      }
    },

    datechange (value, mode) {
      this.termCategory = null
      if (value.length == 0) {
        this.termCategory = 3
      }
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },

    resetFrom () {
      this.searchForm.resetFields()
      this.termCategory = 3
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.value = []
      this.mode2 = ['month', 'month']
    },

    adsvalchange (val) {
      this.nowcode = val[val.length - 1]
    },
    goback () {
      this.isgoback = false
      this.areaIdNow = window.parent.indexTool.getUserInfo().areaId
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  display: flex;
}
.circular {
  width: calc((100% - 20px) / 2);
}
.circulartop {
  width: calc((100% - 300px) / 2);

  margin-right: 110px;
  margin-left: 50px;
  border: 1px solid #ccc;
  height: 120% !important;
  margin-top: 20px;
}
.echarttitle1 {
  width: 100%;
  font-size: 16px;
  height: 40px;

  color: rgba(0, 0, 0, 0.85);
  text-indent: 20px;
  line-height: 40px;
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
.circularout {
  width: 100%;
  display: flex;
}
.ecs {
  width: 90% !important;
  margin-left: 1%;
}
.echarttext {
  width: 32%;
  margin-left: 2%;
  display: flex;
  align-items: center;
}
.echarttext ul {
  width: 100%;
}
.echarttext ul li {
  width: 100%;
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 20px;
  height: 30px;
}
.linetwo {
  width: 10px;
  background: rgba(239, 241, 244, 1);
}
.lines {
  width: 100%;
  background: rgba(239, 241, 244, 1);
  height: 10px;
  margin-top: 20px;
}
.textchild {
  font-size: 24px;
  font-weight: bold;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}
.totaschild {
  font-size: 26px;
  font-weight: bold;
  line-height: 22px;
  color: rgba(24, 144, 255, 1);
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
.ecnum {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(21, 169, 193, 1);
  line-height: 22px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.ectext {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.ecnumtwo {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  line-height: 22px;
  text-align: center;
  background: rgba(35, 194, 219, 1);
  color: rgba(255, 255, 255, 1);
}
.ecline {
  flex: 1;
  height: 1px;
  border: 1px dashed rgba(0, 0, 0, 0.25);
}
.ecmoney {
  margin-left: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.circularout /deep/ .v-charts-data-empty {
  left: 40%;
}
.peopleSum {
  font-size: 30px;
  font-weight: bold;
  margin-right: 30px;
}
.schoolSituationlist {
  width: 30%;
  float: right;
}
.schoolSituationlist li {
  list-style: none;
  line-height: 35px;
  position: relative;
}
.schoolSituationlist li .ranking {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  margin-right: 10px;
  position: absolute;
  top: 9px;
  line-height: 20px;
}
.schoolSituationlist li:nth-child(1) .ranking,
.schoolSituationlist li:nth-child(2) .ranking,
.schoolSituationlist li:nth-child(3) .ranking,
.schoolSituationlist li:nth-child(4) .ranking {
  background-color: #096dd9;
  color: #fff;
}
.schoolSituationlist li .font {
  margin-left: 30px;
}
.schoolSituationlist li .peopleNum {
  float: right;
  // background-color:#9400d3
}
.noData {
  position: relative;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.nameStyle {
  height: 35px;
  display: inline-block;
  line-height: 35px;
  margin-top: 20px;
}
.tableHeight td {
  padding: 4px 16px !important;
}
.visitbtnRight {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
// /deep/ .ant-table-tbody > tr > td > div {
//   width: unset !important;
// }
// /deep/.borderLayout .header {
//   border-bottom: 14px solid #e4e4e4;
// }

// #tmd /deep/.myCellClass {
//   border-right-color: #8181824d !important;
//   border-right-width: 5px !important;
// }
// #tmd /deep/.myHeaderCellAge {
//   border-right-width: 5px !important;
//   border-right-color: #8181824d !important;
// }

// #tmd /deep/.ant-table-body-inner {
//   //固定列下部滚动条。
//   max-height: calc(100vh - 218px) !important;
//   width: 358px !important;
//   overflow: hidden !important;
// }

#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}

// #tmd /deep/.ant-table-body {
//   overflow: scroll !important;
//   max-height: calc(100vh - 210px) !important;
// }
</style>
