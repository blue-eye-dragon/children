<template >

  <ta-form-item :label="msg"
                :fieldDecoratorId="fileldName"
                :fieldDecoratorOptions="isRequire?rules[this.fileldName]:this.selectNotMust()"
                :labelCol="{span:labelwidth.label}"
                :wrapperCol="{span:labelwidth.wrapper}">
    <ta-cascader :options.sync="addressdata"
                 v-if="drawer"
                 :getPopupContainer="setPopupContainer"
                 :disabled="disabled"
                 @change="onChangeComeBoy"
                 @focus="getInitData"
                 :placeholder="clearPlaceHolder?'':'请选择'+msg"
                 :loadData="loadData"
                 :changeOnSelect="changeOnSelect"
                 :fieldNames="{ label: 'areaname', value: 'areaid', isLeaf: 'isLeaf', children: 'children' }" />
    <ta-cascader :options.sync="addressdata"
                 v-else
                 :disabled="disabled"
                 @change="onChangeComeBoy"
                 @focus="getInitData"
                 :placeholder="clearPlaceHolder?'':'请选择'+msg"
                 :loadData="loadData"
                 :changeOnSelect="changeOnSelect"
                 :fieldNames="{ label: 'areaname', value: 'areaid', isLeaf: 'isLeaf', children: 'children' }" />
  </ta-form-item>
</template>
<script>
import { setTimeout } from 'timers'
import Vue from 'vue'
export default {
  props: {
    drawer: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    isOwnArea: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      required: true
    },
    addressmodel: {
      type: Array,
      default () {
        return []
      }
    },
    fileldName: {
      type: String,
      default: 'address_Linkage'
    },
    arealevel: {
      type: String,
      default: '3'
    },
    types: {
      type: String,
      default: '0'
    },
    clearPlaceHolder: {
      type: Boolean,
      default: false
    },
    isRequire: {
      type: Boolean,
      default: true
    },
    labelwidth: {
      type: Object,
      default: function () {
        return {
          label: 6,
          wrapper: 18
        }
      }
    },
    // 最终要加载到的叶节点（0全部，1省级，2市级，3区县级 ）- 这里和 arealevel 的不同是: loadLeafLevel会处理省级市和县级市等的问题
    loadLeafLevel: {
      type: Number,
      default: 0
    },
    // 孤儿和事实的异地 户籍地选择为“新疆兵团或新疆维吾尔自治区”时，页面给出提示“系统尚未联通” 2021年6月17日16:35:49
    isOrphanOrFact: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addressdata: [],
      rules: {
        [this.fileldName]: this.verificationRules(this.msg, true)
      },
      time: null,
      selectedAreaArr: [] // 选择的地区id数组
    }
  },
  activated () {

  },
  mounted () {
    this.time = null
    // if (this.addressmodel.length == 0) {
    //   this.loadData()
    // }
    this.time = setTimeout(() => {
      if (this.addressmodel.length == 0) {
        this.loadData()
      }
    }, 1000)
  },
  watch: {
    // 监听父组件赋值的数据变化
    addressmodel: {
      handler: function (val, oldval) {
        clearTimeout(this.time)
        if (val.length > 0) {
          this.setaddressdata(val)
        }
      },
      deep: true
    }
  },
  methods: {
    setPopupContainer (trigger) {
      return document.getElementById(this.drawer)
    },
    // 由于某些原因导致级联数据加载不到，获取焦点时进行判断，若无数据则重新加载数据
    getInitData () {
      if (!this.addressdata || (this.addressdata && this.addressdata.length == 0)) {
        this.getPlaceOptions().then(val => {
          // 首次
          let arr = []
          arr = [...val]
          this.addressdata = arr
        })
      }
    },
    // 选择地区
    async onChangeComeBoy (val, areaLevel) {
      // 异地户籍地乡镇不允许选择当前登录人的区划
      if (this.isOrphanOrFact && window.parent.indexTool.getUserInfo().areaLevel == '4' && val && val.length > 0 && val[val.length - 1] == window.parent.indexTool.getUserInfo().areaId) {
        this.$emit('clearAddress', '不可选择自己所在区域', true)
        this.selectedAreaArr = []
        return false
      }
      // 暂存一下下选择的地区id数组
      this.selectedAreaArr = val
      this.$emit('adsvalchange', val, areaLevel)
    },
    // 赋值
    async setaddressdata (data) {
      this.loadData().then(async () => {
        if (this.arealevel == 1) {
          this.$emit('setaddress')
          return false
        }
        const dataarr = data.filter((item) => {
          return item
        })

        let prevdatra = await this.firstVal(this.addressdata, { areaid: dataarr[0] })

        for (let i = 1; i < dataarr.length - 1; i++) {
          prevdatra = await this.firstVal(prevdatra.children, { areaid: dataarr[i] })
        }
        this.$emit('setaddress', this.fileldName, this.addressdata)
      })
    },
    firstVal (data, node) {
      return new Promise((reslove, reject) => {
        data.map(item => {
          if (node.areaid == item.areaid) {
            if (!this.isOwnArea) { // xswt
              this.getPlaceOptions(node).then(val => {
                // item.children = val
                Vue.set(item, 'children', val)
                reslove(item)
              })
            } else {
              reslove(item)
            }
          }
        })
      })
    },
    loadData (selectedOptions) {
      return new Promise((reslove, reject) => {
        if (selectedOptions) {
          const targetOption = selectedOptions[selectedOptions.length - 1]
          targetOption.loading = true
          this.getPlaceOptions(targetOption).then(val => {
            // 判断要加载到的最终叶节点级别
            if (this.loadLeafLevel != 0 && Number(targetOption.arealevel) + 1 == this.loadLeafLevel) {
              val.forEach(el => { el.isLeaf = true })
            }
            // 判断接口返参是否在指定的最终叶节点下面（只是单纯为了解决县级市eg：辛集市的问题）
            if (this.loadLeafLevel == 3 && Number(val[0].arealevel) > this.loadLeafLevel) {
              // 已选择的市列表
              const selectedCityArr = this.addressdata.find(el => el.areaid == this.selectedAreaArr[0])
              // 将此县级市置为最终叶节点
              selectedCityArr.children.forEach(el => {
                el.areaid == this.selectedAreaArr[1] && (el.isLeaf = true)
              })
            } else if (this.loadLeafLevel == 2 && Number(val[val.length - 1].arealevel) > this.loadLeafLevel) { // 这里主要解决省级市的问题
              // 已选择的当前省级
              const selectedPro = this.addressdata.find(el => el.areaid == this.selectedAreaArr[0])
              // 将此省级置为最终叶节点
              selectedPro.isLeaf = true
            } else {
              // 下一级
              // targetOption.children = val
              Vue.set(targetOption, 'children', val)
              let arr = []
              arr = [...this.addressdata]
              this.addressdata = arr
            }
            targetOption.loading = false
            reslove()
          })
        } else {
          this.getPlaceOptions().then(val => {
            // 首次

            let arr = []
            arr = [...val]
            this.addressdata = arr
            reslove()
          })
        }
      })
    },
    // 地区级联查询
    async getPlaceOptions (targetOption) {
      // 异地户籍地选择为“新疆兵团或新疆维吾尔自治区”时，页面给出提示“系统尚未联通” （开通时删除此代码） 2021年6月17日16:35:49 start
      if (this.isOrphanOrFact && targetOption && (targetOption.areaid == '650000000000' || targetOption.areaid == '659900000000')) {
        this.$emit('clearAddress', '系统尚未联通')
        return false
      }
      // 异地户籍地选择为“新疆兵团或新疆维吾尔自治区”时，页面给出提示“系统尚未联通” 2021年6月17日16:35:49 end

      const formdata = {
        parentId: null
      }
      let url = ''
      if (targetOption) {
        formdata.parentId = targetOption.areaid
      }
      if (this.types == 0) {
        url = '/zoning/queryStatistics'
      } else if (this.types == 1) {
        url = '/checkChildApi/queryAreaByCurrentUserCounty'
      } else {
        url = '/checkChildApi/queryAreaByCurrentUser'
      }
      if (this.isOwnArea) { // 只显示下级。
        formdata.parentId = window.parent.indexTool.getUserInfo().areaId
        formdata.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      }

      // 使用缓存
      let data = {}
      const returnObj = this.getDataBySession(formdata.parentId, url)
      if (returnObj) { // 缓存中有
        data = returnObj
      } else { // 缓存中没有
        const res = await this.post(url, formdata)
        this.getDataBySession(formdata.parentId, url, res) // 放入缓存
        data = res
      }

      data.data.data.map((item, index) => {
        item.isLeaf = false
        if (item.arealevel >= this.arealevel) {
          item.isLeaf = true
        } else {
          item.isLeaf = false
        }
      })
      let arr = [], newarr = []
      arr = [...data.data.data]
      if (this.isOwnArea && window.parent.indexTool.getUserInfo().areaLevel == '4') {
        arr.map((item, index) => {
          if (item.areaid == window.parent.indexTool.getUserInfo().areaId) {
            newarr.push(item)
          }
        })
        arr = newarr
      }
      const goalData = arr

      return goalData
    },
    // 取出缓存中的数据
    getDataBySession (parentId, url, returnObj) {
      parentId = parentId || window.parent.indexTool.getUserInfo().areaLevel
      if (!returnObj) { // 判断sessionStorage中是否已存在数据
        if (this.types == 0 && sessionStorage.getItem('queryStatisticst') && JSON.parse(sessionStorage.getItem('queryStatisticst'))[parentId]) { // sessionStorage存在数据
          return JSON.parse(sessionStorage.getItem('queryStatisticst'))[parentId]
        } else if (this.types == 1 && sessionStorage.getItem('queryAreaByCurrentUserCounty') && JSON.parse(sessionStorage.getItem('queryAreaByCurrentUserCounty'))[parentId]) {
          return JSON.parse(sessionStorage.getItem('queryAreaByCurrentUserCounty'))[parentId]
        } else if (url == '/checkChildApi/queryAreaByCurrentUser' && sessionStorage.getItem('queryAreaByCurrentUser') && JSON.parse(sessionStorage.getItem('queryAreaByCurrentUser'))[parentId]) {
          return JSON.parse(sessionStorage.getItem('queryAreaByCurrentUser'))[parentId]
        } else { // 调接口获取数据
          return null
        }
      } else { // 不存在
        let data = {}
        if (this.types == 0) {
          if (sessionStorage.getItem('queryStatisticst')) {
            data = JSON.parse(sessionStorage.getItem('queryStatisticst'))
          }
          data[parentId] = returnObj
          sessionStorage.setItem('queryStatisticst', JSON.stringify(data))
        } else if (this.types == 1) {
          if (sessionStorage.getItem('queryAreaByCurrentUserCounty')) {
            data = JSON.parse(sessionStorage.getItem('queryAreaByCurrentUserCounty'))
          }
          data[parentId] = returnObj
          sessionStorage.setItem('queryAreaByCurrentUserCounty', JSON.stringify(data))
        } else {
          if (sessionStorage.getItem('queryAreaByCurrentUser')) {
            data = JSON.parse(sessionStorage.getItem('queryAreaByCurrentUser'))
          }
          data[parentId] = returnObj
          sessionStorage.setItem('queryAreaByCurrentUser', JSON.stringify(data))
        }
      }
    }
  }
}
</script>
