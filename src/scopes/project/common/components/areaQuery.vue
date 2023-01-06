<template>
  <ta-form-item :label="msg"
                v-if="isshow1"
                :fieldDecoratorId="fileldName"
                :fieldDecoratorOptions="rules[this.fileldName]"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol">
    <ta-cascader :options.sync="addressdata"
                 v-if="drawer"
                 :getPopupContainer="setPopupContainer"
                 @change="onChangeComeBoy"
                 :allowClear="allowClear"
                 :disabled="disabled"
                 :placeholder="'请选择'+msg"
                 :loadData="loadData"
                 :fieldNames="{ label: 'areaName', value: 'areaId', areaLevel: 'areaLevel', isLeaf: 'isLeaf', children: 'children' }" />
    <ta-cascader :options.sync="addressdata"
                 v-else
                 @change="onChangeComeBoy"
                 :allowClear="allowClear"
                 :disabled="disabled"
                 :placeholder="'请选择'+msg"
                 :loadData="loadData"
                 :fieldNames="{ label: 'areaName', value: 'areaId', areaLevel: 'areaLevel', isLeaf: 'isLeaf', children: 'children' }" />
  </ta-form-item>
</template>
<script>
export default {
  props: {
    areaLevel1: {
      type: String,
      default: null
    },
    drawer: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    msg: {
      type: String,
      required: true
    },
    fileldName: {
      type: String,
      default: 'address_Linkage'
    },
    types: {
      type: String,
      default: '1'
    },
    isshow1: {
      type: Boolean,
      default: true
    },
    ishide: {
      type: Boolean,
      required: true,
      default () {
        return true
      }
    },
    isrule: {
      type: Boolean,
      required: false
    },
    addressmodel: {
      type: Array,
      default () {
        return []
      }
    },
    labelCol: {
      type: Object,
      default () {
        return { span: 6 }
      }
    },
    wrapperCol: {
      type: Object,
      default () {
        return { span: 18 }
      }
    }
  },
  data () {
    return {
      selectlevel: '',
      addressdata: [],
      rules: {
        [this.fileldName]: this.isrule ? this.verificationRules(this.msg, true) : {}
      }
    }
  },
  activated () { },
  mounted () {
    if (this.addressmodel.length == 0) {
      this.selectlevel = ''
      this.loadData()
    }
  },
  watch: {
    // 监听父组件赋值的数据变化
    addressmodel: {
      handler: function (val, oldval) {
        this.setaddressdata(val)
      },
      deep: true
    }
  },
  methods: {
    setPopupContainer (trigger) {
      return document.getElementById(this.drawer)
    },
    // 选择地区
    onChangeComeBoy (val, areaLevel) {
      this.$emit('adsvalchange', val, areaLevel)
    },
    async setaddressdata (data) {
      this.loadData().then(async () => {
        if (this.arealevel == 1) {
          this.$emit('setaddress')
          return false
        }
        const dataarr = data.filter((item) => {
          return item
        })
        let prevdatra = await this.firstVal(this.addressdata, { areaId: dataarr[0] })
        for (var i = 1; i < dataarr.length - 1; i++) {
          prevdatra = await this.firstVal(prevdatra.children, { areaId: dataarr[i] })
        }
        this.$emit('setaddress')
      })
    },
    firstVal (data, node) {
      // eslint-disable-next-line promise/param-names
      return new Promise((reslove, reject) => {
        data.map(item => {
          if (node.areaId == item.areaId) {
            this.getPlaceOptions(node).then(val => {
              if (val && val.length > 0) {
                item.children = val
              }
              reslove(item)
            })
          }
        })
      })
    },
    loadData (selectedOptions) {
      // eslint-disable-next-line promise/param-names
      return new Promise((reslove, reject) => {
        if (selectedOptions) {
          const targetOption = selectedOptions[selectedOptions.length - 1]
          targetOption.loading = true
          this.getPlaceOptions(targetOption).then(val => {
            // 下一级
            targetOption.loading = false
            if (val.length > 0) {
              targetOption.children = val
            } else {
              delete targetOption.children
            }
            this.addressdata = [...this.addressdata]
            reslove()
          })
        } else {
          this.getPlaceOptions().then(val => {
            // 首次
            this.addressdata = val
            if (val.length == 0) {
              this.$emit('update:ishide', false)
            } else {
              this.$emit('update:ishide', true)
            }
            reslove()
          })
        }
      })
    },
    // 地区级联查询
    async getPlaceOptions (targetOption) {
      const formdata = {
        areaId: null
      }
      formdata.areaLevel = this.types == 1 ? '3' : '5'
      if (targetOption) {
        formdata.areaId = targetOption.areaId
        if (targetOption.areaLevel && targetOption.areaLevel == '3' && this.areaLevel1) {
          return []
        }
      }

      // 1 到区 2到村
      // let url = this.types == 1 ? '/checkChildApi/queryAreaByCurrentUserCounty' : '/checkChildApi/queryAreaByCurrentUser'
      // let url = this.types == 1 ? '/checkChildApi/queryAreaByCurrentUserVillage' : '/checkChildApi/queryAreaByCurrentUser'
      const url = '/areaManagement/queryAreaByAsync'
      if (this.areaLevel1 == '1') {
        formdata.areaLevel = '1'
      }
      if (this.areaLevel1 == '3') {
        formdata.areaLevel = '3'
      }
      if (this.areaLevel1 == '4') {
        formdata.areaLevel = '5'
      }
      // 使用缓存
      let data = {}
      const returnObj = this.getDataBySession(formdata.areaId, url)
      if (returnObj) { // 缓存中有
        data = returnObj
      } else { // 缓存中没有
        const res = await this.post(url, formdata)
        if (res.serviceSuccess) {
          this.getDataBySession(formdata.areaId, url, res) // 放入缓存
          data = res
        } else { // 请求失败
          data = []
        }
      }
      data.data.areaList.map((item, index) => {
        item.isLeaf = false
        if (item.childNum == 0 || !item.childNum) {
          item.isLeaf = true
        } else {
          if ((this.areaLevel1 && item.areaLevel == '3') || (this.areaLevel1 && item.areaLevel == '1')) {
            item.isLeaf = true
            item.childNum = 0
          } else {
            item.isLeaf = false
          }
        }
      })
      const goalData = [...data.data.areaList]
      return goalData
    },
    // 取出缓存中的数据
    getDataBySession (areaId, url, returnObj) {
      areaId = areaId || window.parent.indexTool.getUserInfo().areaLevel
      if (!returnObj) { // 判断sessionStorage中是否已存在数据
        if (this.types == 1 && sessionStorage.getItem('areaLevel_3') && JSON.parse(sessionStorage.getItem('areaLevel_3'))[areaId]) { // sessionStorage存在数据
          return JSON.parse(sessionStorage.getItem('areaLevel_3'))[areaId]
        } else if (this.types != 1 && sessionStorage.getItem('areaLevel_5') && JSON.parse(sessionStorage.getItem('areaLevel_5'))[areaId]) {
          return JSON.parse(sessionStorage.getItem('areaLevel_5'))[areaId]
        } else { // 调接口获取数据
          return null
        }
      } else { // 不存在
        let data = {}
        if (this.types == 1) {
          if (sessionStorage.getItem('areaLevel_3')) {
            data = JSON.parse(sessionStorage.getItem('areaLevel_3'))
          }
          data[areaId] = returnObj
          sessionStorage.setItem('areaLevel_3', JSON.stringify(data))
        } else {
          if (sessionStorage.getItem('areaLevel_5')) {
            data = JSON.parse(sessionStorage.getItem('areaLevel_5'))
          }
          data[areaId] = returnObj
          sessionStorage.setItem('areaLevel_5', JSON.stringify(data))
        }
      }
    }
  }
}
</script>
