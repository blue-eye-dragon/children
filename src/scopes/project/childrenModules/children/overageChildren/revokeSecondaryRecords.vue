<template>
  <div class="conts">
    <div class="contin">
      <AttritionBaseFrom
        :childReductionId="childReductionId"
        :id="id"
        ref="attrition"
      ></AttritionBaseFrom>
    </div>
    <div class="bom">
      <ta-button
        type="danger"
        class="preservation"
        @click="submit"
        v-if="status == '1'"
        >撤回</ta-button
      >
      <ta-button class="preservation" @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import AttritionBaseFrom from './components/secondaryBaseFrom'
import moment from 'moment'
export default {
  components: {
    AttritionBaseFrom
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      id: '', // 儿童入院id
      childReductionId: '', // 儿童减员id
      workflowId: '', // 儿童流程id
      status: '' // 状态 撤回是1
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {},
  methods: {
    // 初始化数据
    initDatas () {
      const _self = this
      const attritionVue = _self.$refs.attrition
      _self.id = _self.$route.query.id // 儿童入院id
      _self.childReductionId = _self.$route.query.childReductionId // 儿童减员id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.status = _self.$route.query.status // 状态

      _self
        .post('/reductionChildRequestApi/childReductionWorkflow', {
          childReductionId: _self.childReductionId,
          workflowId: _self.workflowId
        })
        .then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            const list = data.approvalWorkflow.approvalPointList || []
            for (var i = 0; i < list.length; i++) {
              attritionVue.$set(attritionVue.attributeObj, 'show' + i, true)
              attritionVue.$set(
                attritionVue.attributeObj_copy,
                'show' + i,
                true
              )
            }
            attritionVue.list = list
            attritionVue.changeLabelByReason(
              data.reductionChildVo.reductionType
            )
            attritionVue.type = data.reductionChildVo.reductionType
            _self.$nextTick(() => {
              attritionVue.form.setFieldsValue(data.approvalWorkflow)
              attritionVue.name = data.approvalWorkflow.name
              attritionVue.currentStatus = data.approvalWorkflow.currentStatus
              const reductionChildVo = data.reductionChildVo
              reductionChildVo.birthday = reductionChildVo.birthday
                ? moment(reductionChildVo.birthday)
                : null
              reductionChildVo.reductionDate = reductionChildVo.reductionDate
                ? moment(reductionChildVo.reductionDate)
                : null
              reductionChildVo.endTime = reductionChildVo.endTime
                ? moment(reductionChildVo.endTime)
                : null
              reductionChildVo.businessDate = reductionChildVo.businessDate
                ? moment(reductionChildVo.businessDate)
                : null

              attritionVue.form.setFieldsValue(reductionChildVo)
              attritionVue.fileList = reductionChildVo.fileList
              setTimeout(() => {
                attritionVue.setHeight('one', 'oneout')
              }, 1000)
              for (var i = 0; i < list.length; i++) {
                attritionVue['form' + i].setFieldsValue(list[i])
                attritionVue.setHeight(i, i + 'out')
              }
            })
          }
        })
    },
    submit () {
      this.post('/reductionChildRequestApi/recallChildReduction', {
        childReductionId: this.childReductionId
      }).then((res) => {
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
  watch: {}
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
