<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                     >
      <div >
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
          <ta-form-item label="日期"
                        fieldDecoratorId="statisticTimeEnd"
                        class="spilwid2"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-date-picker style="width:100%"
                            placeholder="请选择截止日期" />
          </ta-form-item>
          <ta-form-item>
                 <div class="searchbtn">
            <div class="searchButton">
            <ta-button class="search "
                icon="search"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button v-if='backshow'
                       @click="backs"
                       class="btnleft">返回</ta-button>
            </div>
                 </div>
            <!-- <ta-button class="btnleft" @click="resetFrom">重置</ta-button> -->
          </ta-form-item>
        </ta-form>
      </div>
      <!-- <div style="width:100%;height:900px">
        <div class="ringClass">
          <h3 style="padding:10px 10px;border-bottom:1px solid rgba(0, 0, 0, 0.09)">全国事实无人抚养儿童地理分布图</h3>
            <ta-e-charts
              :chartsType="'map'"
              :type="map"
              :data="chartData"
              :events="chartEvents"
              :extend="chartExtend"
              height="800px"
            ></ta-e-charts>
        </div>
      </div>-->
      <div>
      <div style="width:100%;height:100%">
        <div class="ringClass">
          <h3 class="mapText">全国事实无人抚养儿童各省市分布图</h3>
          <div style="width:60%;left:5%;position:absolute">
            <ta-e-charts :chartsType="'map'"
                         :data="chartDataTwo"
                         :settings="chartSettingsTwo"
                         :events="chartEventsTwo"
                         :extend="chartExtendTwo"
                         height="800px"></ta-e-charts>
          </div>
          <div style="width:44%;right:0;bottom:255px;position:absolute;z-index:0;">
            <ta-e-charts :chartsType="'ring'"
                         :data="chartDataThree"
                         :events="chartEventsThree"
                         :extend="chartExtendThree"
                         height="300px">
              <div v-if="dataEmpty"
                   class="data-empty">暂无数据</div>
            </ta-e-charts>
          </div>
        </div>
      </div>
      <!-- <div style="width:100%;height:100%">
        <div class="mapClass">
          <h3
            style="padding:10px 10px;border-bottom:1px solid rgba(0, 0, 0, 0.09)"
          >全国事实无人赋抚养儿童各省市分布图</h3>
          <ta-col :span="3">
            <ta-e-charts
              :chartsType="'ring'"
              :data="chartDataThree"
              :events="chartEventsThree"
              :extend="chartExtendThree"
              :data-empty="dataEmpty"
              height="300px"
            ></ta-e-charts>
          </ta-col>
          <ta-col :span="18">
            <ta-e-charts
              :chartsType="'map'"
              :data="chartDataTwo"
              :settings="chartSettingsTwo"
              :events="chartEventsTwo"
              :extend="chartExtendTwo"
              height="800px"
            ></ta-e-charts>
          </ta-col>
          <ta-col :span="3"></ta-col>
        </div>
        <div class="ringClass">
          <ta-e-charts
            :chartsType="'ring'"
            :data="chartDataThree"
            :events="chartEventsThree"
            :extend="chartExtendThree"
            :data-empty="dataEmpty"
            height="300px"
          ></ta-e-charts>
        </div>
      </div>-->
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
// import listMixin from '@component/common/js/mixins/listMixin'
var geoCoordMap = {}

var data = []
// var dataRes = []
var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  console.log(res)
  return res
}
export default {
  name: 'civil',
  // mixins: [listMixin],
  data () {
    this.chartEvents = {
      click: v => {
        console.log(111222)
      }
    }
    this.chartEventsTwo = {
      mouseover: v => {
        this.getPieCharts(v)
      },
      click: v => {
        this.backshow = true
        console.log(v.name)
        let pinYin = this.Base.pinyin
        let str = pinYin.getFullChars(v.name)
        this.chartSettingsTwo.position = 'province/' + str.toLowerCase()
        // this.getPieCharts(v)
      }
    }
    this.chartEventsThree = {
      click: v => {
        this.getPieCharts(v)
      }
    }

    this.chartExtendTwo = {
      // showLegendSymbol: false,
      // 取消地图上小圆点的方法
      series: {
        itemStyle: {
          color: 'transparent',
          areaColor: '#C4EDFA'
        }
      },
      legend: {
        show: false
      }
    }
    this.chartExtendThree = {
      showLegendSymbol: false,
      // 取消地图上小圆点的方法
      series: {
        label: {
          formatter: '{b}({d}%)'
        }
      },
      legend: {
        show: false
      },

      tooltip: {
        show: true,
        trigger: 'item',
        formatter: function (params) {
          return params.name + ' : ' + params.value
        }
      }
    }
    return {
      dataEmpty: true,
      yeartext: '',
      chartExtend: {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)'
            ]
          },
          textStyle: {
            color: '#000'
          }
        },
        geo: {
          map: 'china',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false
            }
          },
          // roam: true,
          itemStyle: {
            normal: {
              areaColor: '#C4EDFA',
              borderColor: 'rgb(9, 54, 95)'
            },
            emphasis: {
              // areaColor: "rgb(10, 105, 187)"
            }
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },

          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            // aspectScale: 0.75, // 长宽比
            tooltip: {
              show: false
            }
          }
        ]
      },
      dataRes: [],
      mapListTwo: [],
      mapListOne: [],
      chartData: {
        // columns: ['areaName', 'areaName'],
        columns: ['name'],
        // rows: [{ 位置: '新疆', name: '海门', value: 200 }, { 位置: '新疆', name: '乌鲁木齐', value: 3000 }, { 位置: '黑龙江', name: '齐齐哈尔', value: 1233331 }]
        rows: []
      },
      chartDataTwo: {
        // columns: ['areaName', 'areaName'],
        columns: ['位置', '数量'],
        rows: []
      },
      chartDataThree: {
        // columns: ['areaName', 'areaName'],
        columns: ['areaName', 'totalNumber'],
        rows: []
      },
      chartSettings: {
        position: 'china-cities', // 请求数据时url后面的字段
        selectedMode: 'single',
        // mapURLProfix:"",//请求数据时url前面的字段
        positionJsonLink:
          'https://unpkg.com/echarts@3.6.2/map/json/china-cities.json', // 请求数据时完整的url链接
        // mapOrigin:{},//不用请求，可自己写入的数据
        beforeRegisterMap (citys) {
          console.log(
            citys,
            'compareCityscompareCityscompareCityscompareCityscompareCitys'
          )
          return citys
        }
      },
      chartSettingsTwo: {
        position: 'china', // 请求数据时url后面的字段
        selectedMode: 'single',
        // mapURLProfix:"",//请求数据时url前面的字段
        // positionJsonLink: "https://unpkg.com/echarts@3.6.2/map/json/china.json", // 请求数据时完整的url链接
        // mapOrigin:{},//不用请求，可自己写入的数据
        beforeRegisterMap (citys) {
          console.log(
            citys,
            'compareCityscompareCityscompareCityscompareCityscompareCitys'
          )
          return citys
        }
      },
      backshow: false
    }
  },
  created () { },
  activated () {
    this.loadData()
    let nowDate = new Date()
    let nowyear = nowDate.getFullYear()
    let nowmonth = nowDate.getMonth() + 1 // 取上一個月的
    let nowdate = nowDate.getDate() // 取上一個月的
    this.yeartext = nowyear + '-' + nowmonth + '-' + nowdate
    console.log(this.yeartext)
  },
  watch: {
    dataRes: {
      handler (newName, oldName) {
        // ...

        var arr = Array.from(newName)
        this.chartExtend.series[0].data = arr
        console.log(this)
        // [{name: '中原区', value: [113.61333, 34.74827, 8]}, {name: '殷都区',value: [114.3034, 36.1099, 1]}]
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // this.getMapList()
    this.getMapListTwo()
  },
  components: {
    // TaCol,
    TaECharts
  },
  methods: {
    backs () {
      this.chartSettingsTwo.position = 'china'
      this.backshow = false
    },
    loadData () {
      this.backshow = false
      this.dataEmpty = true
    },
    handleSubmit () {
      // this.getMapList()
      this.getMapListTwo()
    },
    async getMapList () {
      let nowDate = new Date()
      let nowyear = nowDate.getFullYear()
      let nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      let nowdate = nowDate.getDate() // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth + '-' + nowdate
      let params = {}
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      if (formData.statisticTimeEnd) {
        params.statisticTimeEnd = formData.statisticTimeEnd
      } else {
        params.statisticTimeEnd = this.yeartext
      }
      console.log(params)
      this.chartData.rows = []
      this.post('/factNoOneRaisedDistributionApi/queryMapOverLay', params).then(
        res => {
          console.log(res)
          // mapListOne
          if (res.data.data.length > 0) {
            let dataArr = res.data.data
            res.data.data.map(item => {
              data.push({
                name: item.areaName,
                areaCode: item.areaCode,
                value: item.totalNumber
              })
            })
            for (var i = 0; i < dataArr.length; i++) {
              geoCoordMap[dataArr[i].areaName] = [
                Number(dataArr[i].lng),
                Number(dataArr[i].lat)
              ]
            }
            this.dataRes = convertData(data)
          } else {
            this.dataRes = []
          }
        }
      )
    },
    async getMapListTwo () {
      let nowDate = new Date()
      let nowyear = nowDate.getFullYear()
      let nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      let nowdate = nowDate.getDate() // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth + '-' + nowdate
      let params = {}
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      if (formData.statisticTimeEnd) {
        params.statisticTimeEnd = formData.statisticTimeEnd
      } else {
        params.statisticTimeEnd = this.yeartext
      }
      this.post(
        '/factNoOneRaisedDistributionApi/queryProvCityDistributionMap',
        params
      ).then(res => {
        console.log(res)
        if (res.data.data.length == 0) {
          // this.dataEmpty = true
          this.chartDataTwo.rows = []
          this.mapListTwo = []
        } else {
          this.mapListTwo = res.data.data
          res.data.data.map(item => {
            this.chartDataTwo.rows.push({
              位置: item.proAreaName,
              数量: item.totalNumber
            })
          })
        }

        console.log(this.chartDataTwo.rows)
      })
    },
    // 地图2的点击事件
    async getPieCharts (v) {
      this.chartDataThree.rows = []
      console.log(v)
      let areaName = v.name
      let areaCode = ''
      if (this.mapListTwo.length > 0) {
        this.mapListTwo.map(item => {
          if (item.proAreaName == areaName) {
            areaCode = item.proAreaCode
            if (areaCode) {
              this.post('/factNoOneRaisedDistributionApi/queryCityPieChart', {
                areaCode: areaCode
              }).then(res => {
                console.log(res)
                if (res.data.data == []) {
                  this.dataEmpty = true
                } else {
                  this.dataEmpty = false
                  this.chartDataThree.rows = res.data.data
                }
              })
            }
          } else {
            this.dataEmpty = true
          }
        })
      }
    },
    // 数据处理
    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            let arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            // 后期修改下
            data.province = data[k][0]
            data.city = data[k][1]
            data.county = data[k][2]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    }
  }
}
</script>
<style>
/* .select .ant-select-selection{
     border: 0px;
   } */
.ringClass {
  width: 100%;
  margin: auto;
  height: 900px;
  position: relative;
}
.mapText {
  padding: 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  font-size: 16px;
}
.data-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(255, 255, 255, 0.7); */
  color: #888;
  font-size: 14px;
}
.spilwid2 {
  width: 350px;
}
.searchdata {
  height: 100%;
}
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  /* width: 110px; */
  /* width: 84px; */
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  /* width: calc(100% - 135px); */
  flex: 1;
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
.mapClass {
  width: 83%;
  margin-left: 7.5%;
  height: 100%;
  margin: auto;
}
</style>
