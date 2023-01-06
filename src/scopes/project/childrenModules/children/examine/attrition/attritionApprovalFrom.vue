<template>
  <div class="conts">
    <div class="contin">
      <AttritionBaseFrom :id="id"
                         :reductionType="reductionType"
                         ref="attrition"></AttritionBaseFrom>
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
import AttritionBaseFrom from '../components/attritionBaseFrom'
import moment from 'moment'
export default {
  components: {
    Title,
    AttritionBaseFrom,
    childReductionId: ''
  },
  data () {
    return {
      reductionType: '',
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
    this.reductionType = ''
    this.getShowDatas()
  },
  mounted () {
  },
  methods: {
    // 点击审批或查看时的页面数据获取
    getShowDatas () {
      const _self = this
      const attritionVue = _self.$refs.attrition
      _self.id = _self.$route.query.id // 儿童入院id
      _self.childReductionId = _self.$route.query.childReductionId // 儿童减员id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.workflowPointId = _self.$route.query.workflowPointId // 流程节点id
      _self.approveVisible = true
      attritionVue.reasonDisabled = false
      if (_self.$route.query.flag == 'look') {
        _self.approveVisible = false
        attritionVue.reasonDisabled = true
      }

      _self.post('/reductionChildRequestApi/childReductionWorkflow', { childReductionId: _self.childReductionId, workflowId: _self.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          const list = data.approvalWorkflow.approvalPointList || []
          for (var i = 0; i < list.length; i++) {
            attritionVue.$set(attritionVue.attributeObj, 'show' + i, true)
            attritionVue.$set(attritionVue.attributeObj_copy, 'show' + i, true)
          }
          console.log(res.data, 888)
          attritionVue.list = list
          attritionVue.changeLabelByReason(data.reductionChildVo.reductionType)
          attritionVue.type = data.reductionChildVo.reductionType
          this.reductionType = data.reductionChildVo.reductionType
          _self.$nextTick(() => {
            attritionVue.form.setFieldsValue(data.approvalWorkflow)
            attritionVue.name = data.approvalWorkflow.name
            attritionVue.currentStatus = data.approvalWorkflow.currentStatus
            const reductionChildVo = data.reductionChildVo
            reductionChildVo.birthday = reductionChildVo.birthday ? moment(reductionChildVo.birthday) : null
            reductionChildVo.reductionDate = reductionChildVo.reductionDate ? moment(reductionChildVo.reductionDate) : null
            reductionChildVo.endTime = reductionChildVo.endTime ? moment(reductionChildVo.endTime) : null
            reductionChildVo.businessDate = reductionChildVo.businessDate ? moment(reductionChildVo.businessDate) : null

            attritionVue.form.setFieldsValue(reductionChildVo)
            attritionVue.fileList = reductionChildVo.fileList
            this.$nextTick(() => {
              setTimeout(() => {
                attritionVue.setHeight('one', 'oneout')
              }, 500)
            })
            for (var i = 0; i < list.length; i++) {
              attritionVue['form' + i].setFieldsValue({ reason: '' })
              attritionVue['form' + i].setFieldsValue(list[i])
              attritionVue.setHeight(i, i + 'out')
            }
          })
        }
      })
    },
    submit (e) {
      const attritionVue = this.$refs.attrition
      const len = attritionVue.list.length - 1
      const reason = attritionVue['form' + len].getFieldsValue().reason
      if (e == '0') { // 驳回
        attritionVue['form' + len].validateFields((err, values) => {
          if (!err) {
            this.post('/reductionChildRequestApi/rejectReductionChildInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
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
        attritionVue['form' + len].validateFields((err, values) => {
          if (!err) {
            this.post('/reductionChildRequestApi/checkReductionChildInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
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
