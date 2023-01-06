<template>
  <div class="searchdata"
       id='tmd'>
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item class="spilwid"
                          label="起始日期"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          style="width:350px">
              <ta-range-picker :allowClear='false'
                               :placeholder="['开始年月', '结束年月']"
                               format="YYYY-MM"
                               :value="value"
                               :mode="mode2"
                               @panelChange="datechange" />
            </ta-form-item>
            <AreaQuery v-if="ishide"
                       class="spilwid"
                       :ishide.sync="ishide"
                       msg="地区"
                       @adsvalchange="adsvalchange"></AreaQuery>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="searchslist">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <ta-tabs :activeKey="nowkey"
                 @change="callback">
          <ta-tab-pane tab="统计报表"
                       key="1">
            <ta-table class="tables table-min-width  "
                      :columns="tableColumns"
                      :showOverflowTooltip="true"
                      :dataSource="tableData"
                      bordered
                      :scroll="{ x: 2600 }"></ta-table>
          </ta-tab-pane>
          <ta-tab-pane tab="统计图表"
                       key="2">
            <div class="echarts">
              <div class="circular">
                <div class="echarttitle">事实无人抚养儿童总数量</div>
                <div class="circularout">
                  <div class="ecs">
                    <!-- <div style="margin-left:20px"><span class="peopleSum">{{sum}}</span>人</div> -->
                    <ta-e-charts chartsType="line"
                                 :data="childrenSum"
                                 :settings="chartSettings"
                                 :data-empty="dataEmpty1"
                                 :colors="colors1"
                                 height="250px"
                                 :xAxis="childrenSumxAxis"
                                 :yAxis="yAxis"
                                 :tooltip="childrenSumtooltip"
                                 :legend-visible="false" />
                    <!-- <div>日均儿童变化数量 <span style="margin-left:10px">{{dailyVariation}}</span> 人</div> -->
                  </div>
                </div>
              </div>
              <div class="circular">
                <div class="echarttitle">事实无人抚养儿童年龄占比</div>
                <div class="circularout">
                  <div class="ecs"
                       style="margin-top:-70px">
                    <ta-e-charts :data="ringdata"
                                 chartsType="ring"
                                 :settings="chartSettingsloop"
                                 :extend="chartExtend"
                                 :data-empty="dataEmpty2"
                                 :legend-visible="false"
                                 height='320px' />
                  </div>
                </div>
              </div>
            </div>
            <div class="echarts">
              <div class="circular">
                <div class="echarttitle">事实无人抚养儿童父母情况分类统计</div>
                <div class="circularout">
                  <div class="ecs">
                    <!-- <span class="nameStyle">{{zhName}}</span> -->
                    <!-- <div style="margin-left:20px"><span class="peopleSum">{{perentsum}}</span>人</div> -->
                    <!-- <ta-e-charts
                  :data="parentdata"
                  chartsType="histogram"
                  height='250px'
                  :data-empty="dataEmpty3"
                  :colors="colors2"
                  :legend-visible="false"
                  :xAxis="parentdataxAxis"
                  :tooltip="parentdatatooltip"
                /> -->
                    <ta-e-charts chartsType="histogram"
                                 :data="parentdata"
                                 :xAxis="parentdataxAxis"
                                 height='340px'
                                 :colors="colors3"
                                 :data-empty="dataEmpty3"
                                 :tooltip="parentdatatooltip"
                                 :extend="parentdataExtend"
                                 :yAxis="yAxis"
                                 :legend-visible="false" />
                    <!-- <ta-table
                  style="width:100%;padding:0"
                  :columns="tableColumnsParent"
                  :showOverflowTooltip="true"
                  :dataSource="parentTableData"
                  class="tableHeight"

                >
                <span slot="num" slot-scope="val, obj, index">
                  <span>{{index + 1 }}</span>
                </span>
                <div slot="action"
                slot-scope="val,obj,index"
                class="btnlist">
                  <span @click="dataChange(val,obj)">{{val}}</span>
                </div>
                </ta-table> -->
                  </div>
                </div>
              </div>
              <div class="circular"
                   style="margin-left:20px">
                <div class="echarttitle">事实无人抚养儿童就学情况统计</div>
                <div class="circularout">
                  <div class="ecs">
                    <ta-e-charts chartsType="histogram"
                                 :data="schoolSituationData"
                                 :data-empty="dataEmpty4"
                                 :colors="colors2"
                                 :xAxis="xAxis"
                                 :tooltip="schoolSituationDatatooltip"
                                 height='340px'
                                 :extend="parentdataExtend"
                                 :yAxis="yAxis"
                                 :legend-visible="false" />
                  </div>
                </div>
              </div>
            </div>
          </ta-tab-pane>
          <!-- <ta-button :hidden='tobeshow'
                     @click="exportFileList"
                     slot="tabBarExtraContent"
                     icon='upload'
                     class="exportbtn">导出</ta-button> -->
        </ta-tabs>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
import '@yh/ta404-ui/es/echarts/lib/style.css'
var that = null
export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    TaECharts
  },
  data () {
    return {
      tobeshow: false,
      value: [],
      mode2: ['month', 'month'],
      colors1: ['#9400d3'],
      colors2: ['#1890ff'],
      colors3: ['#7AB439'],
      // colors3: ['#1890ff', '#EE521D', '#068C07', '#F98B02', '4B6BEE', '#FCD737'],
      nowkey: '1',
      termCategory: '3',
      // termCategorylist: [
      //   { value: '0', label: '今日' },
      //   { value: '1', label: '本周' },
      //   { value: '2', label: '本月' },
      //   { value: '3', label: '全部' }
      // ],
      nowcode: '',
      ishide: true,
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: 170
        },
        {
          title: '总人数',
          width: 70,
          align: 'center',
          dataIndex: 'totalNumber'
        },
        {
          title: '事实无人抚养儿童年龄情况统计',
          children: [
            {
              title: '小于1岁',
              width: 70,
              align: 'center',
              dataIndex: 'lessOne'
            },
            {
              title: '1~3岁',
              width: 70,
              align: 'center',
              dataIndex: 'oneToThree'
            },
            {
              title: '4~6岁',
              width: 70,
              align: 'center',
              dataIndex: 'fourToFix'
            },
            {
              title: '7~10岁',
              width: 70,
              align: 'center',
              dataIndex: 'sevenToTen'
            },
            {
              title: '11~18岁',
              width: 80,
              align: 'center',
              dataIndex: 'elevenToEighteen'
            },
            {
              title: '超过18岁',
              width: 80,
              align: 'center',
              dataIndex: 'greaterEighteen'
            }
          ]
        },
        {
          title: '事实无人抚养儿童父母情况统计',
          children: [
            {
              title: '重病',
              width: 50,
              align: 'center',
              dataIndex: 'seriousIllness'
            },
            {
              title: '重残',
              width: 50,
              align: 'center',
              dataIndex: 'heavyDisability'
            },
            {
              title: '服刑在押',
              width: 80,
              align: 'center',
              dataIndex: 'imprisonment'
            },
            {
              title: '强制隔离戒毒',
              width: 70,
              align: 'center',
              dataIndex: 'givingUpDrugs'
            },
            {
              title: '失联',
              width: 50,
              align: 'center',
              dataIndex: 'outOfContact'
            },
            {
              title: '被执行其他限制人身自由的措施',
              width: 130,
              align: 'center',
              dataIndex: 'otherRestrictFreedom'
            },
            {
              title: '死亡',
              width: 50,
              align: 'center',
              dataIndex: 'death'
            },
            {
              title: '失踪',
              width: 50,
              align: 'center',
              dataIndex: 'disappear'
            },
            {
              title: '其他',
              width: 50,
              align: 'center',
              dataIndex: 'other'
            }
          ]
        },
        {
          title: '事实无人抚养儿童就学情况统计',
          children: [
            {
              title: '文盲或半文盲',
              width: 70,
              align: 'center',
              dataIndex: 'illiteracy'
            },
            {
              title: '幼儿园',
              width: 60,
              align: 'center',
              dataIndex: 'kindergarten'
            },
            {
              title: '学龄前',
              width: 60,
              align: 'center',
              dataIndex: 'preschoolAge'
            },
            {
              title: '小学',
              width: 50,
              align: 'center',
              dataIndex: 'primarySchool'
            },
            {
              title: '初中',
              width: 50,
              align: 'center',
              dataIndex: 'juniorMiddleSchool'
            },
            {
              title: '高中',
              width: 50,
              align: 'center',
              dataIndex: 'highSchool'
            },
            {
              title: '技工学校',
              width: 80,
              align: 'center',
              dataIndex: 'technicalSchool'
            },
            {
              title: '中等专业学校或中等技术学校',
              width: 110,
              align: 'center',
              dataIndex: 'secondaryVocationalSchool'
            },
            {
              title: '未说明情况',
              width: 90,
              align: 'center',
              dataIndex: 'unspecified'
            }
          ]
        }

      ],
      tableColumnsParent: [
        {
          title: '排名',
          dataIndex: 'num',
          align: 'center',
          width: '30%',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '类别',
          dataIndex: 'zh',
          align: 'center',
          width: '30%',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '儿童数量',
          dataIndex: 'value',
          align: 'center',
          width: '30%'
        }
      ],
      dateText: '全部',
      tableData: [],
      parentTableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/factNoOneRaisedWholeApi/queryFactNoOneRaisedWholeReport',
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        childrenSumURL: '/factNoOneRaisedWholeApi/queryDailyAverageTrend',
        parentdataURL: '/factNoOneRaisedWholeApi/queryParentsSituationTypeTrend'
      },
      mixPageRef: 'gridPager',
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
      chartSettingsloop: {
        radius: ['40%', '55%'], // 环大小
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          show: false
        }
      },
      chartExtend: {
        title: {
          text: '儿童总数',
          subtext: 0,
          textAlign: 'center',
          textStyle: {
            fontSize: 16,
            color: '#2a2a2a'
          },
          subtextStyle: {
            fontSize: 16,
            color: '#1990ff'
          },
          x: '49%',
          y: '56%'
        },
        legend: {
          orient: 'vertical',
          x: '75%',
          y: '40%',
          itemWidth: 12,
          itemHeight: 12
        }

      },
      // 父母情况
      parentdata: {
        columns: ['registerName', 'perentTotalNumber'],
        rows: []
      },
      parentdataExtend: {
        barWidth: 20
        // itemStyle: {
        //   color: function (params) {
        //     var colorList = [
        //       '#018879', '#E4151A', '#068C07', '#D81A62', '#7AB439',
        //       '#9023A4', '#BCCA31', '#5B33B1', '#FCD737', '#3948AA',
        //       '#F9B601', '#4B6BEE', '#F98B02', '#059AE1', '#EE521D', '#03ABBE'
        //     ]

        //     return colorList[params.dataIndex]
        //   }
        // }
      },
      zhName: '',
      parentdataAll: {},
      tableListData: {},
      parentdataxAxis: [
        {
          axisLabel: {
            rotate: 40
          },
          data: ['重病', '重残', '服刑在押', '强制隔离戒毒', '失联', '限制人身自由', '死亡', '失踪', '其他']
        }
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
        {
          axisLabel: {
            rotate: 40
          },
          data: ['文盲或半文盲', '幼儿园', '学龄前', '小学', '初中', '高中', '技工学校', '中等专业学校', '未说明情况']
        }
      ],
      childrenSumxAxis: [
        {
          axisLabel: {
            rotate: 30
          },
          data: []
          // splitLine: {
          //   lineStyle: {
          //     show: false
          //   }
          // }
          // axisLine: {
          //   // lineStyle: {
          //   //   show: false
          //   // }
          // }
        }
      ],
      yAxis: [
        {
          name: '人数（人）',
          axisTick: {
            show: false
          },
          minInterval: 1,
          nameTextStyle: {
            padding: [0, 0, 0, 20]
          }
        }
      ],
      childrenSumtooltip: {
        visible: false,
        formatter: function (params) {
          var res = '<div><p>时间：' + params.data[0] + '</br>' + '人数：' + params.data[1] + '</p></div>'
          return res
        }
      },
      parentdatatooltip: {
        formatter: function (params) {
          var res = '<div><p>' + params.name + '</br>' + '人数：' + params.data + '</p></div>'
          return res
        }
      },
      schoolSituationDatatooltip: {
        formatter: function (params) {
          var res = '<div><p>' + params.name + '</br>' + '人数：' + params.data + '</p></div>'
          return res
        }
      }
    }
  },
  created () {
    that = this
  },
  activated () {
    this.nowkey = '1'

    setTimeout(() => {

    }, 500)
    this.childrenSumxAxis[0].data = []
    this.parentdata.rows = []
    this.chartExtend.rows = []
    this.ringdata.rows = []
    this.childrenSum.rows = []
    this.sum = 0
  },
  mounted () {
    this.orgId = window.parent.indexTool.getUserInfo().orgId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    // 当前时间
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    this.params.statisticTimeStart = ''
    this.params.statisticTimeEnd = `${year}-${month}-${day}`
  },
  methods: {
    // 导出
    exportFile (url, obj) {
      const paramsUrl = window.parent.indexTool.getUserInfo()
      url = `${window.faceConfig.exportUrl + url}?userId=${paramsUrl.userId}`
      if (paramsUrl.orgId) {
        url += `&orgId=${paramsUrl.orgId}`
      }

      for (var i in obj) {
        if (obj[i] != undefined) {
          url += `&${i}=${obj[i]}`
        }
      }
      window.location.href = url
    },
    exportFileList () {
      const data = {
        statisticTimeStart: this.params.statisticTimeStart,
        statisticTimeEnd: this.params.statisticTimeEnd,
        areaId: this.params.areaId
      }
      this.exportFile('/factNoOneRaisedWholeApi/export', data)
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
      if (this.nowkey == 2) {
        this.tobeshow = true
      } else {
        this.tobeshow = false
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
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
    radiochange () {
      this.searchForm.setFieldsValue({
        date: []
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.termCategory = 3
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.value = []
      this.mode2 = ['month', 'month']

      this.searchslist()// 重置后查询
    },
    searchslist () {
      let dateText = ''
      this.sum = 0
      this.chartExtend.title.subtext = 0
      this.chartExtend.rows = []
      this.ringdata.rows = []
      this.childrenSum.rows = []
      this.parentdata.rows = []
      if (this.termCategory !== null) {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        if (this.termCategory == 0) {
          dateText = `今日（${year}-${month}-${day}）`
          this.params.statisticTimeStart = `${year}-${month}-${day}`
          this.params.statisticTimeEnd = `${year}-${month}-${day}`
        } else if (this.termCategory == 1) {
          // 本周第一天
          var WeekFirstDay = (new Date(date - (date.getDay() - 1) * 86400000)).getDate()
          // 本周最后一天
          // var WeekLastDay = (new Date((date / 1000 + 6 * 86400) * 1000)).getDate()
          dateText = `本周（${year}-${month}-${WeekFirstDay}~${year}-${month}-${day}）`
          this.params.statisticTimeStart = `${year}-${month}-${WeekFirstDay}`
          this.params.statisticTimeEnd = `${year}-${month}-${day}`
        } else if (this.termCategory == 2) {
          dateText = `本月（${year}-${month}-01~${year}-${month}-${day}）`
          this.params.statisticTimeStart = `${year}-${month}-01`
          this.params.statisticTimeEnd = `${year}-${month}-${day}`
        } else if (this.termCategory == 3) {
          dateText = '全部'
          this.params.statisticTimeStart = ''
          this.params.statisticTimeEnd = `${year}-${month}-${day}`
        }
      }
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (this.value.length > 0) {
        this.params.statisticTimeStart = this.value[0].format('YYYY-MM')
        this.params.statisticTimeEnd = this.value[1].format('YYYY-MM')
        dateText = `${this.params.statisticTimeStart}~${this.params.statisticTimeEnd}`
      }
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        this.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        this.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      this.tableColumns[0].title = dateText

      this.getlist()
    },
    async getlist () {
      let res = {}
      this.params.orgId = this.orgId
      this.params.areaCode = this.areaCode
      this.params.areaLevel = this.areaLevel
      this.params.areaId = this.areaId
      if (!this.params.areaCode) {
        this.params.areaCode = window.parent.indexTool.getUserInfo().areaCode
      }
      res = await this.post(this.mixListOptions.mixGetDataListURL, this.params)
      if (!res.errors) {
        this.tableData = res.data.data
        this.tableListData = res
      }
      if (res.data.data.length != 0) {
        this.sum = res.data.data[res.data.data.length - 1].totalNumber
      }
      this.childrenSumFun()
      if (res.data.data.length != 0) {
        const jointData = res.data.data[res.data.data.length - 1]
        this.chartExtend.title.text = '儿童总数'
        this.chartExtend.title.subtext = this.sum
        this.ringdata.rows = [
          {
            name: '小于1',
            sum: jointData.lessOne
          },
          {
            name: '1~3岁',
            sum: jointData.oneToThree
          },
          {
            name: '4~6岁',
            sum: jointData.fourToFix
          },
          {
            name: '7~10岁',
            sum: jointData.sevenToTen
          },
          {
            name: '11~18岁',
            sum: jointData.elevenToEighteen
          },
          {
            name: '超过18岁',
            sum: jointData.greaterEighteen
          }
        ]

        this.dataEmpty1 = false
        this.dataEmpty2 = false
        this.dataEmpty3 = false
        this.dataEmpty4 = false
        this.yAxis[0].name = '人数（人）'
      } else if (res.data.data.length == 0) {
        this.dataEmpty1 = true
        this.dataEmpty2 = true
        this.dataEmpty3 = true
        this.dataEmpty4 = true
        this.dailyVariation = 0
        this.chartExtend.title.text = ''
        this.childrenSum.rows = []
        this.childrenSumxAxis[0].data = []
        this.yAxis[0].name = ''
      }
      // 父母情况
      this.parentdataFun()
      if (res.data.data.length != 0) {
        this.parentTableData = res.data.data[res.data.data.length - 1].parentStatusVoList
      } else {
        this.parentTableData = []
      }
      // 就学情况
      this.schoolSituationFun()
    },
    async childrenSumFun () {
      this.childrenSum.rows = []
      this.childrenSumxAxis[0].data = []
      const data = await this.post(this.mixListOptions.childrenSumURL, this.params)
      if (!data.errors) {
        if (this.tableListData.data.data.length != 0) {
          this.dailyVariation = data.data.data[0].changeNumber
          data.data.data.map(item => {
            item.registerDate = item.registerDate.toString().slice(0, 10)
          })
          this.childrenSum.rows = data.data.data
          this.childrenSum.rows.map(item => {
            this.childrenSumxAxis[0].data.push(item.registerDate)
          })
        }
        if (this.tableListData.data.data.length == 0) {
          this.childrenSum.rows = []
          this.childrenSumxAxis[0].data = []
        }
      }
    },
    async parentdataFun () {
      if (this.tableListData.data.data.length != 0) {
        const schoolSituationTotel = this.tableListData.data.data[this.tableListData.data.data.length - 1]
        this.parentdata.rows = [
          {
            registerName: '重病',
            perentTotalNumber: schoolSituationTotel.seriousIllness
          },
          {
            registerName: '重残',
            perentTotalNumber: schoolSituationTotel.heavyDisability
          },
          {
            registerName: '服刑在押',
            perentTotalNumber: schoolSituationTotel.imprisonment
          },
          {
            registerName: '强制隔离戒毒',
            perentTotalNumber: schoolSituationTotel.givingUpDrugs
          },
          {
            registerName: '失联',
            perentTotalNumber: schoolSituationTotel.outOfContact
          },
          {
            registerName: '被执行其他限制人身自由的措施',
            perentTotalNumber: schoolSituationTotel.otherRestrictFreedom
          },
          {
            registerName: '死亡',
            perentTotalNumber: schoolSituationTotel.death
          },
          {
            registerName: '失踪',
            perentTotalNumber: schoolSituationTotel.disappear
          },
          {
            registerName: '其他',
            perentTotalNumber: schoolSituationTotel.other
          }
        ]
        this.parentdataxAxis[0].data = ['重病', '重残', '服刑在押', '强制隔离戒毒', '失联', '限制人身自由', '死亡', '失踪', '其他']
      } else {
        this.parentdata.rows = []
        this.parentdataxAxis[0].data = []
      }
    },

    // 就学情况
    async schoolSituationFun () {
      if (this.tableListData.data.data.length != 0) {
        const schoolSituationTotel = this.tableListData.data.data[this.tableListData.data.data.length - 1]
        this.schoolSituationData.rows = [
          {
            schoolSituationName: '文盲或半文盲',
            schoolSituationNum: schoolSituationTotel.illiteracy
          },
          {
            schoolSituationName: '幼儿园',
            schoolSituationNum: schoolSituationTotel.kindergarten
          },
          {
            schoolSituationName: '学龄前',
            schoolSituationNum: schoolSituationTotel.preschoolAge
          },
          {
            schoolSituationName: '小学',
            schoolSituationNum: schoolSituationTotel.primarySchool
          },
          {
            schoolSituationName: '初中',
            schoolSituationNum: schoolSituationTotel.juniorMiddleSchool
          },
          {
            schoolSituationName: '高中',
            schoolSituationNum: schoolSituationTotel.highSchool
          },
          {
            schoolSituationName: '技工学校',
            schoolSituationNum: schoolSituationTotel.technicalSchool
          },
          {
            schoolSituationName: '中等专业学校或中等技术学校 ',
            schoolSituationNum: schoolSituationTotel.secondaryVocationalSchool
          },
          {
            schoolSituationName: '未说明情况',
            schoolSituationNum: schoolSituationTotel.unspecified
          }
        ]
        this.schoolSituationlist = schoolSituationTotel.attendSchoolVoList
        this.xAxis[0].data = ['文盲或半文盲', '幼儿园', '学龄前', '小学', '初中', '高中', '技工学校', '中等专业学校', '未说明情况']
      } else {
        this.schoolSituationData.rows = []
        this.schoolSituationlist = []
        this.xAxis[0].data = []
      }
    },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1]
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
  height: 60% !important;
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
/deep/ .ant-table-tbody > tr > td > div {
  width: unset !important;
}
/deep/.borderLayout .header {
  border-bottom: 14px solid #e4e4e4;
}
</style>
