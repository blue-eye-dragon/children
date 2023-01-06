<template>
  <ta-e-charts :chartsType="'chart'"
               height="100%"
               :data="data"
               :settings="chartSettings"
               :extend="chartExtend"
               :yAxis="qsyAxis"
               :xAxis="qsxAxis"
               :legend="legend"
               :series="series"
               :grid="grid"></ta-e-charts>
</template>

<script>
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
export default {
  components: {
    TaECharts
  },
  props: {
    data: Object,
    series: Array
  },
  data () {
    return {
      legend: {
        right: 10
      },
      grid: {
        right: 50,
        bottom: 20
      },
      chartExtend: {
        barGap: 0,
        color: ['#297EFF', '#FF6F00','#5FFF29'],
        barWidth: 30
      },
      chartSettings: {
        type: 'histogram'
      },
      chartsType: 'histogram',
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ],

      qsyAxis: {
        type: 'value',
        name: '人数',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#333'
        },
        axisLabel: {
          show: true,
          color: '#333'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#707070'
          }
        },
        splitNumber: 5,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#707070'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        }
      }
    }
  },
  computed: {
    qsxAxis () {
      return {
        type: 'category',
        name: '地区',
        nameLocation: 'end',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#707070'
          }
        },
        axisLabel: {
          show: true,
          color: '#333',
          fontSize: 14,
          rotate: 35
          // interval: 0,
          // formatter: function (value, index) {
          //   if (index % 2 != 0) {
          //     return '\n' + value
          //   } else {
          //     return value
          //   }
          // }
          // formatter: function (value) {
          //   return value.split('').join('\n')
          // }
        },
        data: this.data.rows.map(item => {
          return item.areaName
        })

      }
    }
  },
  mounted () { console.log(this.series) },
  methods: {}
}
</script>

<style></style>
