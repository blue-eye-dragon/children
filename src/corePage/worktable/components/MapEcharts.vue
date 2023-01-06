<template>
  <div class="__map-echarts__" ref="map"></div>
</template>

<script>
import mapjs from '../js/map.json'
export default {
  mounted () {
    this.mapInit()
  },
  methods: {
    echartsMapClick (params) {
      if (params.data.value === 0) return
      // 地图点击事件
      if (params.data.level !== 'district' && params.data.level !== 'street') {
        this.$emit('mapClick', params)
      }
    },
    mapInit () {
      this.echartsMap = this.$echarts.init(this.$refs.map)
      this.echartsMap.on('click', this.echartsMapClick)
      this.$echarts.registerMap('china', mapjs)
      var option = {
        visualMap: {
          show: true,
          bottom: '2%',
          left: '2%',
          text: ['高', '低'],
          min: 0,
          max: 10,
          inRange: { color: ['#fff', '#90CBF2', 'rgba(23, 134, 238, 0.73)'] },
          pieces: [
            { max: 1, color: 'rgb(197, 227, 255)' },
            { min: 1, max: 2 },
            { min: 2, max: 10 },
            { min: 10, max: 15 },
            { min: 15, max: 20 },
            { min: 20, max: 30 },
            { min: 30, max: 40 },
            { min: 40, max: 50 },
            { min: 50, max: 200 },
            { min: 200 }
          ],
          calculable: true
        },
        tooltip: {
          trigger: 'item',
          formatter: function (item) {
            if (item.name == '南海诸岛') {
              return ''
            } else {
              let value = isNaN(item.value) ? 0 : item.value
              return item.name + '<br>地区人数：' + value + ' 个'
            }
          }
        },
        grid: {
          top: '5px',
          left: '5px',
          right: '5px',
          bottom: '5px'
        },
        series: [
          {
            name: '地区人数',
            type: 'map',
            aspectScale: 0.75,
            zoom: 1.2,
            geoIndex: 0,
            roam: false,
            mapType: 'china',
            selectedMode: 'single',
            showLegendSymbol: false,
            visibility: 'off',
            itemStyle: {
              normal: {
                color: '#ccc',
                borderColor: '#21212f',
                areaColor: '#ffffff',
                borderWidth: 0.5,
                label: {
                  show: true,
                  textStyle: {
                    color: '#003767'
                  }
                }
              },
              emphasis: {
                areaColor: '#4382F6',
                borderColor: '#fff',
                areaStyle: {
                  color: '#fff'
                },
                label: {
                  show: true,
                  textStyle: {
                    color: '#003767'
                  }
                }
              }
            }
          }
        ]
      }
      this.echartsMap.setOption(option)
    }
  }
}
</script>

<style lang="less">
.__map-echarts__ {
  width: 100%;
  height: 100%;
}
</style>
