<template>
  <div class="conts">
    <div class="contin">
      <ChangeBaseFrom :id="id"
                      ref="changes"></ChangeBaseFrom>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button type="danger"
                 class="preservation"
                 @click="submit('0')"
                 v-if="approveVisible">驳回</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 @click="submit('1')"
                 v-if="approveVisible">通过</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChangeBaseFrom from '../components/changeBaseFrom'
import moment from 'moment'
export default {
  components: {
    ChangeBaseFrom
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      id: '', // 儿童入院id
      workflowId: '', // 儿童流程id
      workflowPointId: '', // 流程节点id
      approveVisible: false // 审批true、查看false

    }
  },
  activated () {
    this.getShowDatas()
  },
  mounted () {
  },
  methods: {
    // 点击审批或查看时的页面数据获取
    getShowDatas () {
      const _self = this
      const changesVue = _self.$refs.changes
      _self.id = _self.$route.query.id // 儿童入院id
      _self.childChangeId = _self.$route.query.childChangeId // 儿童变更id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.workflowPointId = _self.$route.query.workflowPointId // 流程节点id
      _self.approveVisible = true
      changesVue.reasonDisabled = false
      changesVue.form.resetFields()

      if (_self.$route.query.flag == 'look') {
        _self.approveVisible = false
        changesVue.reasonDisabled = true
      }

      _self.post('/childChangeRequestApi/childChangeWorkflow', { childChangeId: _self.childChangeId, workflowId: _self.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          const list = data.approvalWorkflow.approvalPointList || []
          for (var i = 0; i < list.length; i++) {
            changesVue.$set(changesVue.attributeObj, 'show' + i, true)
            changesVue.$set(changesVue.attributeObj_copy, 'show' + i, true)
          }
          changesVue.list = list
          const childChangeHisRecordVo = data.childChangeHisRecordVo
          // 处理null
          for (let i = 0; i < childChangeHisRecordVo.length; i++) {
            childChangeHisRecordVo[i].changeAfter = childChangeHisRecordVo[i].changeAfter ? childChangeHisRecordVo[i].changeAfter.replace(/null/g, '') : ''
            childChangeHisRecordVo[i].changeBefore = childChangeHisRecordVo[i].changeBefore ? childChangeHisRecordVo[i].changeBefore.replace(/null/g, '') : ''
          }
          changesVue.tableData = childChangeHisRecordVo
          _self.$nextTick(() => {
            changesVue.form.setFieldsValue(data.approvalWorkflow)
            changesVue.name = data.approvalWorkflow.name
            changesVue.currentStatus = data.approvalWorkflow.currentStatus
            changesVue.form.setFieldsValue(childChangeHisRecordVo)

            changesVue.setHeight('one', 'oneout')
            for (var i = 0; i < list.length; i++) {
              changesVue['form' + i].setFieldsValue({ reason: '' })
              changesVue['form' + i].setFieldsValue(list[i])
              changesVue.setHeight(i, i + 'out')
            }
          })
        }
      })
    },
    submit (e) {
      const changesVue = this.$refs.changes
      const len = changesVue.list.length - 1
      const reason = changesVue['form' + len].getFieldsValue().reason
      if (e == '0') { // 驳回
        changesVue['form' + len].validateFields((err, values) => {
          if (!err) {
            this.post('/childChangeRequestApi/rejectChangeChildInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
              if (res.serviceSuccess) {
                if (!res.errors) {
                  this.$message.success('信息已驳回!')
                  this.$router.go(-1)
                }
              }
            })
          }
        })
      }
      if (e == '1') { // 通过
        changesVue['form' + len].validateFields((err, values) => {
          if (!err) {
            this.post('/childChangeRequestApi/checkChangeChildInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
              if (res.serviceSuccess) {
                if (!res.errors) {
                  this.$message.success('信息已通过!')
                  this.$router.go(-1)
                }
              }
            })
          }
        })
      }
    },
    backs () {
      this.$router.go(-1)
    }
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
