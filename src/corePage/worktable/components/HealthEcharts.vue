<template>
  <ta-e-charts
    chartsType="pie"
    :data="data"
    :extend="piechartExtend"
    :settings="piechartSettings"
    width="100%"
    height="100%"
  />
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
      piechartExtend: {
        color: ['#30C72B', '#FF6F00', '#139ECD'],
        legend: {
          bottom: 10,
          left: 'center'
        },
        series: [
          {
            radius: '50%',
            center: ['30%', '55%']
          }
        ]
      },
      piechartSettings: {
        radius: 70,
        offsetY: 120,
        label: {
          color: '#21212F'
        }
      }
    }
  }
}
</script>

<style></style>
