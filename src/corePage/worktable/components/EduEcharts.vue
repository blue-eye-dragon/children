<template>
  <ta-e-charts :chartsType="'ring'"
               :data="data"
               :extend="educationExtend"
               :settings="educationSettings"
               width="100%"
               height="100%" />
</template>

<script>
// 明天 调下数字显示未知
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
export default {
  components: {
    TaECharts
  },
  props: {
    data: Object,
    isstyle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      total: 0,
      offsetY: this.isstyle ? 'center' : 170,
      text: this.isstyle ? '总数' : '总数',
      left: this.isstyle ? '30%' : '50%',
      radius: this.isstyle ? ['40%', '65%'] : ['35%', '60%']
    }
  },
  computed: {
    legend () {
      let legend = {}
      if (this.isstyle) {
        legend = {
          orient: 'horizontal',
          left: '65%',
          top: 50,
          itemGap: 25,
          width: 160

        }
      } else {
        legend = {
          bottom: 30,
          left: 'center',
          itemGap: 30
        }
      }
      return legend
    },

    educationExtend () {
      return {
        series: {
          center: [this.left, this.offsetY]
        },
        color: ['#1D357E', '#30C72B', '#297EFF', '#6AFFE0', '#1D83C5', '#139ECD'],
        title: {
          show: true,
          text: this.text,
          subtext: this.total,
          left: this.left,
          top: this.offsetY == 170 ? 160 : this.offsetY,
          textAlign: 'center',
          textStyle: {
            fontSize: '14',
            fontWeight: 'bold'
          },
          subtextStyle: {
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        legend: this.legend
      }
    },
    educationSettings () {
      return {
        radius: this.radius,
        offsetY: this.offsetY,
        hoverAnimation: true,
        label: {
          normal: {
            show: true,
            position: 'outside'
          },
          emphasis: {
            show: true,
            formatter: '{b}:{d}%',
            textStyle: {
              fontSize: '16'
            }
          }
        }
      }
    }
  },
  mounted () { },
  watch: {
    data: {
      deep: true,
      handler (val) {
        let total = 0
        val.rows.forEach((res) => {
          total += parseInt(res.childNum)
        })
        this.total = total
      }
    }
  }
}
</script>

<style></style>
