<template>
  <!-- 这个组件是当前登录人区划组件前拼了单上级上上级，但是回显是用placeholder回显的，编辑时的业务代码需要处理，可参考designatedHospitalFilingAdd.vue文件 -->
  <!-- 本组件只处理到区县 -->
  <ta-form-item :label="msg"
                :fieldDecoratorId="fileldName"
                :fieldDecoratorOptions="isRequire?rules[this.fileldName]:this.selectNotMust()"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol">
    <ta-cascader :options="options"
                 :disabled="disabled"
                 @change="onChange"
                 :loadData="loadData"
                 :placeholder="placeholder"
                 :fieldNames="{ label: 'areaName', value: 'areaId', isLeaf: 'isLeaf', children: 'children' }" />
  </ta-form-item>
</template>
<script>
const ORG_URL = 'areaManagement/queryAreaByAsync' // 获取区划数据接口
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    arealevel: {
      type: String,
      default: '3'
    },
    msg: {
      type: String,
      required: true
    },
    fileldName: {
      type: String,
      default: 'address_Linkage'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    isRequire: {
      type: Boolean,
      default: true
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
      options: [],
      rules: {
        [this.fileldName]: this.verificationRules(this.msg, true)
      },
      completionObj: [] // 要补全的区划数据
    }
  },
  // vue的声明周期
  activated () {
    this.initData()
  },
  methods: {
    onChange (value) {
      //   console.log(value)
    },
    // 加载数据
    async  loadData (selectedOptions) {
      // 获取最后一个
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      // 使用缓存
      let data = {}
      const returnObj = this.getDataBySession(targetOption.areaId)
      if (returnObj) { // 缓存中有
        data = returnObj
      } else { // 缓存中没有
        const res = await this.post(ORG_URL, { areaId: targetOption.areaId, areaLevel: this.arealevel })
        if (res.serviceSuccess) {
          this.getDataBySession(targetOption.areaId, res) // 放入缓存
          data = res
        } else { // 请求失败
          data = []
        }
      }
      // 从后台获取数据,然后添加到当前options中
      data.data.areaList.map((item, index) => {
        item.isLeaf = item.areaLevel >= this.arealevel
      })
      targetOption.loading = false
      if (data.data.areaList && data.data.areaList.length > 0 && data.data.areaList[0].areaLevel <= this.arealevel) {
        targetOption.children = data.data.areaList
      } else {
        delete targetOption.children
      }
      this.options = [...this.options]
    },
    // 初始化加载options数据
    async  initData () {
      const userInfo = window.parent.indexTool.getUserInfo()
      // 使用缓存
      let data = {}
      const returnObj = this.getDataBySession(null)
      if (returnObj) { // 缓存中有
        data = returnObj
      } else { // 缓存中没有
        const res = await this.post(ORG_URL, { areaLevel: this.arealevel })
        if (res.serviceSuccess) {
          this.getDataBySession(null, res) // 放入缓存
          data = res
        } else { // 请求失败
          data = []
        }
      }

      data.data.areaList.map((item, index) => {
        item.isLeaf = item.areaLevel >= this.arealevel
      })
      if (userInfo.areaLevel == '1' || userInfo.areaLevel == '0') { // 省级或部级
        this.options = data.data.areaList
      } else if (userInfo.areaLevel == '2') { // 市级
        this.options = [{
          areaName: userInfo.provinceName,
          areaId: userInfo.provinceId,
          isLeaf: true,
          children: data.data.areaList
        }]
      } else if (userInfo.areaLevel == '3') { // 县级
        this.options = [{
          areaName: userInfo.provinceName,
          areaId: userInfo.provinceId,
          isLeaf: true,
          children: [{
            areaName: userInfo.cityName,
            areaId: userInfo.cityId,
            isLeaf: true,
            children: data.data.areaList
          }]
        }]
      }
    },
    // 取出缓存中的数据
    getDataBySession (areaId, returnObj) {
      areaId = areaId || window.parent.indexTool.getUserInfo().areaLevel
      if (!returnObj) { // 判断sessionStorage中是否已存在数据
        if (sessionStorage.getItem('addressNew') && JSON.parse(sessionStorage.getItem('addressNew'))[areaId]) { // sessionStorage存在数据
          return JSON.parse(sessionStorage.getItem('addressNew'))[areaId]
        } else { // 调接口获取数据
          return null
        }
      } else { // 不存在
        let data = {}
        if (sessionStorage.getItem('addressNew')) {
          data = JSON.parse(sessionStorage.getItem('addressNew'))
        }
        data[areaId] = returnObj
        sessionStorage.setItem('addressNew', JSON.stringify(data))
      }
    }
  }
}
</script>
