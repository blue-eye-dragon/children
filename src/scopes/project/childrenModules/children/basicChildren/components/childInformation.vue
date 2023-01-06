<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="儿童姓名">
        <a @click="childInfo" style="line-height:38px">{{name}}</a>
      </ta-form-item>
      <ta-form-item label="身份证号"
                    fieldDecoratorId="idCard">
        <ta-input :disabled="true" />
      </ta-form-item>
      <ta-form-item label="儿童类别"
                    fieldDecoratorId="childType">
        <ta-select :disabled="true">
          <ta-select-option :value="item.value"
                            v-for="(item,index) in adoptionlist"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="儿童编号"
                    fieldDecoratorId="childNumber">
        <ta-input :disabled="true" />
      </ta-form-item>
      <ta-form-item label="登记增员日期"
                    fieldDecoratorId="registerDate">
        <ta-date-picker style="width: 100%;"
                        :disabled="true"
                        placeholder />
      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
export default {
  props: ['name', 'childEnterId'],
  data () {
    return {
      adoptionlist: []
    }
  },
  mounted () {
    this.getchildtype()
  },
  methods: {
    childInfo () {
      let param = {
        id: this.childEnterId
      }
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },
    // 获取儿童类型
    // 儿童类别
    async getchildtype () {
      let data = await this.getchildtypelist(this.childTypeCode)
      this.adoptionlist = data
    }
  }
}
</script>name

<style lang="less" scoped>
// .name {

// }
</style>
