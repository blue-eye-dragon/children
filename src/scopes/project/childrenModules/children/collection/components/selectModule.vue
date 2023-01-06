<template>
  <ta-checkbox-group @change="onChange"
                     v-model="selectval"
                     class="selectmodule">
    <ta-checkbox v-for="(item,index) in data"
                 :disabled="disabled||item.label=='无疾病' || judgeDisabledRadios(item)"
                 :key="index"
                 :value="item.value">{{item.label}}</ta-checkbox>
    <ta-input size="small"
              @change="Zlength"
              maxlength="50"
              :disabled="disabled||false"
              v-if="isshow"
              v-model="othertext"
              class="inpwid" />
  </ta-checkbox-group>
</template>
<script>
export default {
  // firstSelectNot 第一个选项是否不处理，传true不处理，否则传false处理，或不传，默认处理
  props: ['selection', 'otherval', 'data', 'defaultval', 'labelval', 'firstSelectNot', 'disabled'],
  data () {
    return {
      selectval: [],
      isshow: false,
      othertext: ''
    }
  },
  mounted () {
    // 将其他调整到最后一个
    if (this.data && this.data.length > 0) {
      let indexS = 0
      const indexE = this.data.length - 1
      this.data.forEach((item, index) => {
        if (item.value == this.Enum.ILLNESSTYPE.QT) {
          indexS = index
        }
      })
      if (indexS) {
        this.data[indexE] = this.data.splice(indexS, 1, this.data[indexE])[0]
      }
    }

    this.isshow = false
    if (this.defaultval != '') {
      this.isshow = false
      this.selectval = this.defaultval.split(',')
      if (this.selectval.length == 1) {
        const index = this.data.length - 1
        if (this.data[index].value == this.selectval[0]) {
          this.isshow = true
          this.$emit('update:labelval', '其他：')
        }
      }
    }
    this.othertext = this.otherval
  },
  methods: {  
    /**
     * @author: yinpengfei
     * @Date: 2021-06-04 11:10:17
     * @information: 初始禁用部分radio
     */     
    judgeDisabledRadios(item) {
      if(!item || !item.sort) return false
      // 角色信息
      const userInfo = top.indexTool.getUserInfo()
      if(userInfo.areaLevel == 4) { // 若是街道类型
        const disabledArr = [21, 31, 41, 51]
        let mark = disabledArr.includes(item.sort)
        return mark
      }
      return false
    },

    Zlength (e) {
      const tex = e.target.value
      if (tex.lenght == 50) {
        this.$message.error('输入字符长度最大为50')
      }
    },
    onChange (checkedValues) {
      const e = checkedValues.length - 1
      const index = this.data.length - 1
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

          const labellist = []
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

          const labellist = []
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

      const str = this.selectval.join(',')
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
