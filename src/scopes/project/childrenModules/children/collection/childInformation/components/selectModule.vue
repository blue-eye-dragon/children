<template>
  <ta-checkbox-group @change="onChange"
                     v-model="selectval"
                     class="selectmodule">
    <!-- <ta-row>
      <ta-col :span="8" v-for="(item,index) in data" :key="index"> -->
    <ta-checkbox v-for="(item,index) in data"
                 :key="index"
                 :value="item.value">{{item.label}}</ta-checkbox>
    <!-- </ta-col>
       <ta-col :span="8" v-if="isshow"> -->
    <ta-input size="small"
              v-if="isshow"
              v-model="othertext"
              class="inpwid" />
    <!-- </ta-col>
    </ta-row> -->
  </ta-checkbox-group>
</template>
<script>
export default {
  // firstSelectNot 第一个选项是否不处理，传true不处理，否则传false处理，或不传，默认处理
  props: ['selection', 'otherval', 'data', 'defaultval', 'labelval', 'firstSelectNot'],
  data () {
    return {
      selectval: [],
      isshow: false,
      othertext: ''
    }
  },
  mounted () {
    this.isshow = false
    if (this.defaultval != '') {
      this.isshow = false
      this.selectval = this.defaultval.split(',')
      if (this.selectval.length == 1) {
        let index = this.data.length - 1
        if (this.data[index].value == this.selectval[0]) {
          this.isshow = true
          this.$emit('update:labelval', '其他：')
        }
      }
    }
    this.othertext = this.otherval
  },
  methods: {
    onChange (checkedValues) {
      let e = checkedValues.length - 1
      let index = this.data.length - 1
      let labelstr = ''
      if (this.firstSelectNot == undefined || !this.firstSelectNot) { // 默认处理第一个
        if (checkedValues[e] == this.data[index].value) {
          this.selectval = [this.data[index].value]
          this.isshow = true
          labelstr = '其他：'
        } else if (checkedValues[e] == this.data[0].value) {
          this.selectval = [this.data[0].value]
          this.isshow = false
          this.othertext = ''
          labelstr = this.data[0].label
        } else {
          this.isshow = false
          this.selectval = this.selectval.filter((item) => {
            return item != this.data[0].value && item != this.data[index].value
          })
          this.othertext = ''
          // 获取label值

          let labellist = []
          this.selectval.map(item => {
            this.data.map(val => {
              if (val.value == item) {
                labellist.push(val.label)
              }
            })
          })
          labelstr = labellist.join(',')
        }
      } else if (this.firstSelectNot) { // 第一个不处理
        if (checkedValues[e] == this.data[index].value) {
          this.selectval = [this.data[index].value]
          this.isshow = true
          labelstr = '其他：'
        } else {
          this.isshow = false
          this.selectval = this.selectval.filter((item) => {
            return item != this.data[index].value
          })
          this.othertext = ''
          // 获取label值

          let labellist = []
          this.selectval.map(item => {
            this.data.map(val => {
              if (val.value == item) {
                labellist.push(val.label)
              }
            })
          })
          labelstr = labellist.join(',')
        }
      }

      let str = this.selectval.join(',')
      this.$emit('update:selection', str)
      this.$emit('update:labelval', labelstr)
    }
  },
  watch: {
    othertext () {
      this.$emit('update:otherval', this.othertext)
    }
  }
}
</script>
<style scoped lang="less">
.inpwid {
  width: 80%;
  margin-top: 20px;
}
</style>
