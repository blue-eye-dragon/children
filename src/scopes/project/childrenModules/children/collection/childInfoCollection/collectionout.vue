<template>
  <div class="conts">
    <!-- <div class='contin'>
               <ta-form :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
          <ta-form-item
            label="儿童类别:"
            class="fromwid"
          >
            <ta-select class="selectwid" :disabled="disabled" v-model='childtype' @change="childrenTypechange">
              <ta-select-option
                v-for="(item,index) in childrenType"
                :value="item.value"
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form> -->
    <!-- <router-view></router-view> -->
    <!-- <div :is="comname"></div> -->
    <!-- </div> -->
  </div>
</template>
<script>
import Copynoonesupportfact from './copynoonesupportfact.vue'
import CopyorphansHandicapped from '../childInformation/copyorphansHandicapped.vue'
export default {
  components: {
    Copynoonesupportfact,
    CopyorphansHandicapped
  },
  data () {
    return {
      // childrenType: [],
      childtype: '1'
      // disabled: false,
      // comname: ''
    }
  },
  mounted () {

  },
  activated () {
    // this.disabled = !!this.$route.query.isdisabled
    this.getchildtype()
  },
  methods: {
    async getchildtype () {
      const data = await this.getchildtypelist()
      this.childrenType = data
      console.log('LUYOU')
      console.log(data)
      // if (this.$route.query.childtype) {
      //   this.childtype = this.$route.query.childtype
      //   this.godetail(this.childtype, this.$route.query)
      //   this.disabled = true
      // } else {
      this.childtype = this.childrenType[0].value
      this.godetail(this.childtype)
      // }
    },
    godetail (val, params) {
      if (val == 5) {
        // 无人扶养
        this.comname = 'Copynoonesupportfact'
        this.$router.push({
          name: 'noonesupportfact',
          query: params || {
            status: 1,
            childtype: this.childtype,
            isadd: 1
          }
        })
      } else if (val == 8) {
        // 留守
        this.$message.error('正在开发中，请稍后')
      } else if (val == 9) {
        // 困境
        this.$message.error('正在开发中，请稍后')
      } else {
        this.$router.push({
          name: 'orphansHandicapped',
          query: {
            operateFlag: 'add', childType: val
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.fromwid {
  width: 424px;
  margin-top: 24px;
  margin-bottom: 10px;
}
.bom {
  left: 14px;
}
</style>
