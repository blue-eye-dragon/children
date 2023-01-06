<template>
  <div class="conts">
    <div class="contin">
      <ChangeBaseFrom :childChangeId="childChangeId"
                      :id="id"
                      ref="changes"></ChangeBaseFrom>
    </div>
    <div class="bom">
      <ta-button @click="backs">返回</ta-button>
      <ta-button type="danger"
                 class="btnleft "
                 @click="submit"
                 v-if="status=='1'">撤回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChangeBaseFrom from '../components/changeBaseFrom'
import moment from 'moment'
export default {
  components: {
    Title,
    ChangeBaseFrom
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      childChangeId: '', // 儿童变更id
      id: '', // 儿童入院id
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
      const changesVue = _self.$refs.changes
      _self.id = _self.$route.query.id // 儿童入院id
      _self.childChangeId = _self.$route.query.childChangeId // 儿童变更id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.status = _self.$route.query.status // 状态

      _self.post('/childChangeRequestApi/childChangeWorkflow', { childChangeId: _self.childChangeId, workflowId: _self.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          const list = data.approvalWorkflow.approvalPointList || []
          for (var i = 0; i < list.length; i++) {
            changesVue.$set(changesVue.attributeObj, 'show' + i, true)
            changesVue.$set(changesVue.attributeObj_copy, 'show' + i, true)
          }
          changesVue.list = list
          changesVue.tableData = data.childChangeHisRecordVo
          _self.$nextTick(() => {
            changesVue.form.setFieldsValue(data.approvalWorkflow)
            changesVue.name = data.approvalWorkflow.name
            changesVue.currentStatus = data.approvalWorkflow.currentStatus
            changesVue.form.setFieldsValue(data.childChangeHisRecordVo)

            changesVue.setHeight('one', 'oneout')
            for (var i = 0; i < list.length; i++) {
              changesVue['form' + i].setFieldsValue(list[i])
              changesVue.setHeight(i, i + 'out')
            }
          })
        }
      })
    },
    submit () {
      this.post('/childChangeRequestApi/recallChildChange', { childChangeId: this.childChangeId }).then((res) => {
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
