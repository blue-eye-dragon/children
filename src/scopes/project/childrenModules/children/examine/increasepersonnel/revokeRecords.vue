<template>
  <div class="conts">
    <div class="contin">
      <Additionainformation :childEnterId="childEnterId"
                            :isAnotherPlaceApply="isAnotherPlaceApply"
                            ref="addition"></Additionainformation>

    </div>
    <div class="bom">
      <ta-button type="danger"
                 class="preservation"
                 @click="submit"
                 v-if="status=='1'">撤回</ta-button>
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import Additionainformation from '../components/additionainformation'
export default {
  components: {
    Title,
    Additionainformation
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      isAnotherPlaceApply: '',
      childEnterId: '', // 儿童入院id
      workflowId: '', // 儿童流程id
      status: '' // 状态 撤回是1
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {

  },
  methods: {
    // 初始化数据
    initDatas () {
      const _self = this
      const additionVue = _self.$refs.addition
      _self.childEnterId = _self.$route.query.childEnterId // 儿童入院id
      _self.isAnotherPlaceApply = _self.$route.query.isAnotherPlaceApply // 儿童入院id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.status = _self.$route.query.status // 状态

      additionVue.reasonDisabled = true

      _self.post('/addChildApi/detailWorkflow', { childEnterId: _self.childEnterId, workflowId: _self.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          const list = data.approvalPointList || []
          for (var i = 0; i < list.length; i++) {
            additionVue.$set(additionVue.attributeObj, 'show' + i, true)
            additionVue.$set(additionVue.attributeObj_copy, 'show' + i, true)
          }
          additionVue.list = list
          additionVue.tableData = data.approvalPointList
          _self.$nextTick(() => {
            additionVue.form.setFieldsValue(data)
            additionVue.name = data.name
            additionVue.currentStatus = data.currentStatus
            // for (var i = 0; i < list.length; i++) {
            //   additionVue['form' + i].setFieldsValue(list[i])
            //   additionVue.setHeight(i, i + 'out')
            // }
            additionVue.setHeight('two', 'twoout')
            additionVue.setHeight('one', 'oneout')
          })
        }
      })
    },
    submit () {
      this.post('/addChildApi/recallChildInfo', { childEnterId: this.childEnterId }).then((res) => {
        if (res.serviceSuccess) {
          if (!res.errors) {
            this.$message.success('信息撤回成功!')
            this.$router.go(-1)
          }
        }
      })
    },
    backs () {
      this.$router.go(-1)
    }
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  width: 83%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
.bom {
  width: calc(100% - 28px);
  height: 80px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 14px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-left: 32px;
}
</style>
