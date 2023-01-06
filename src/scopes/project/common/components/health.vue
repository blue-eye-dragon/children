<template>
  <ta-form-item label="健康状况"
                :fieldDecoratorId="fileldName"
                :fieldDecoratorOptions="isRequire?rules.healthCondition:{rules: [{validator: this.abc}]}"
                :labelCol="{span:labelwidth.label}"
                :wrapperCol="{span:labelwidth.wrapper}">
    <ta-cascader :options="addressdata"
                 v-if="drawer"
                 :getPopupContainer="setPopupContainer"
                 :loadData="loadData"
                 :changeOnSelect="false"
                 @focus="getInitData"
                 @change="onChange"
                 :placeholder="clearPlaceHolder?'':'请选择健康状况'"
                 :disabled='disabled'
                 :fieldNames="{ label: 'label', value: 'value',  children: 'children' }" />
    <ta-cascader :options="addressdata"
                 v-else
                 :loadData="loadData"
                 :changeOnSelect="false"
                 @focus="getInitData"
                 @change="onChange"
                 :placeholder="clearPlaceHolder?'':'请选择健康状况'"
                 :disabled='disabled'
                 :fieldNames="{ label: 'label', value: 'value',  children: 'children' }" />

  </ta-form-item>
</template>
<script>
export default {
  props: {
    drawer: {
      type: String,
      default: null
    },
    isrule: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileldName: {
      type: String,
      default: 'healthCondition'
    },
    heathmodel: {
      type: Array,
      default () {
        return []
      }
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
          label: 8,
          wrapper: 16
        }
      }

    }
  },
  watch: {
    // 监听父组件赋值的数据变化
    heathmodel: {
      handler: function (val, oldval) {
        this.setheaths(val)
      },
      deep: true
    }
  },
  data () {
    return {
      addressdata: [],
      rules: {
        healthCondition: this.isrule ? this.verificationRules('健康状况') : {}
      }
    }
  },
  mounted () {
    if (this.heathmodel.length == 0) {
      this.loadData()
    }
  },
  methods: {
    setPopupContainer (trigger) {
      return document.getElementById(this.drawer)
    },
    abc (rule, value, callback) {
      callback()
    },
    // 由于某些原因导致级联数据加载不到，获取焦点时进行判断，若无数据则重新加载数据
    getInitData () {
      if (!this.addressdata || (this.addressdata && this.addressdata.length == 0)) {
        this.getHealth().then(val => {
          // 首次
          this.addressdata = val
        })
      }
    },
    async setheaths (data) {
      this.loadData().then(async () => {
        // if (this.arealevel == 0) {
        //   this.$emit('setheath')
        //   return false
        // }
        const dataarr = data.filter((item) => {
          return item
        })
        const prevdatra = await this.firstVal(this.addressdata, { value: dataarr[0] })
        this.$emit('setheath')
      })
    },
    firstVal (data, node) {
      return new Promise((reslove, reject) => {
        data.map(item => {
          if (node.value == item.value) {
            this.getHealth(node).then(val => {
              item.children = val
              reslove(item)
            })
          }
        })
      })
    },
    onChange (val) {
      this.$emit('healthchange', val)
    },
    // HEALTH 健康状况
    async loadData (selectedOptions) {
      return new Promise((reslove, reject) => {
        if (selectedOptions) {
          const targetOption = selectedOptions[selectedOptions.length - 1]
          targetOption.loading = true
          this.getHealth(targetOption).then(val => {
            // 下一级
            targetOption.loading = false
            targetOption.children = val
            this.addressdata = [...this.addressdata]
            reslove()
          })
        } else {
          this.getHealth().then(val => {
            // 首次
            this.addressdata = val
            reslove()
          })
        }
      })
    },
    // HEALTH 健康状况
    async getHealth (targetOption) {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      if (targetOption) {
        formdata.parentValue = targetOption.value
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      data.data.codeList.map((item, index) => {
        if (item.field01 == 1) {
          item.isLeaf = false
        } else {
          item.isLeaf = true
        }
      })
      return data.data.codeList
    }
  }
}
</script>
