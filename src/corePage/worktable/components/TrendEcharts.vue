<template>
  <ta-e-charts
    :tooltip="qstooltip"
    :yAxis="qsyAxis"
    :chartsType="'line'"
    :legend-visible="false"
    :data="data"
    :settings="chartSettingsqushi"
    :grid="gridqushi"
    height="100%"
  ></ta-e-charts>
</template>

<script>
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
export default {
  components: {
    TaECharts
  },
  props: {
    data: Object
  },
  data () {
    return {
      qstooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function (parse) {
          return '日期：' + (parse[0].data[0] || '') + '<br>' + '人数：' + (parse[0].data[1] || '')
        }
      },
      qsyAxis: {
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
            color: '#ccc'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      gridqushi: {
        top: '17%',
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      chartSettingsqushi: {
        area: true,
        lineStyle: { color: '#013584' },
        itemStyle: {
          normal: {
            color: '#2374FF'
          }
        },
        areaStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(70, 94, 255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(70, 94, 255, 0.1)'
                }
              ],
              false
            )
          }
        }
      }
    }
  }
}
</script>

<style></style>
