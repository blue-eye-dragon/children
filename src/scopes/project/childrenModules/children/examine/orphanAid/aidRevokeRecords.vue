<template>
  <div class="conts">
    <div class="contin">
      <AidForm :id="id"
               :startWorkflowId="startWorkflowId"
               ref="addition"></AidForm>

    </div>
    <div class="bom">
      <ta-button type="danger"
                 @click="submit"
                 v-if="status=='1'">撤回</ta-button>
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import AidForm from './aidForm'
export default {
  components: {
    Title,
    AidForm
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      workflowId: '', // 儿童流程id
      id: '', // 列表跳转带过来的id
      startWorkflowId: '', // 列表跳转带过来的startWorkflowId
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
      let _self = this
      let additionVue = _self.$refs['addition']
      _self.id = _self.$route.query.id // 儿童入院id
      _self.startWorkflowId = _self.$route.query.startWorkflowId // 儿童开始流程id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.status = _self.$route.query.status // 状态

      additionVue.reasonDisabled = true

      _self.post('/childrenInStudentAssistanceProjec/detailWorkflow', { businessId: _self.id, startWorkflowId: _self.startWorkflowId }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          let list = data.auditResultsList || []
          for (var i = 0; i < list.length; i++) {
            additionVue.$set(additionVue.attributeObj, 'show' + i, true)
            additionVue.$set(additionVue.attributeObj_copy, 'show' + i, true)
          }
          additionVue.list = list
          _self.$nextTick(() => {
            additionVue.form.setFieldsValue(data)
            additionVue.name = data.childName
            additionVue.currentStatus = data.currentStatus
            for (var i = 0; i < list.length; i++) {
              additionVue['form' + i].setFieldsValue(list[i])
              additionVue.setHeight(i, i + 'out')
            }
            additionVue.setHeight('one', 'oneout')
          })
        }
      })
    },
    submit () {
      this.post('/childrenInStudentAssistanceProjec/revoke', { id: this.id }).then((res) => {
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
