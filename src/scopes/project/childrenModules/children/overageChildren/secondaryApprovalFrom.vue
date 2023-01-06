<template>
  <!-- 续发审核页面 -->
  <div class="conts">
    <div class="contin">
      <AttritionBaseFrom :id="childEnterId"
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
      <ta-button type="primary"
                 class="preservation"
                 @click="backInfo()"
                 v-if="this.$route.query.flag == 'back'">撤回</ta-button>
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
      reductionType: '',
      showone: true,
      showtwo: true,
      showthree: true,
      id: '', // 儿童入院id
      workflowId: '', // 儿童流程id

      childEnterId: '',
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
    async getShowDatas () {
      this.workflowId = this.$route.query.workflowId // 儿童流程id
      this.id = this.$route.query.id // 流程节点id
      this.workflowPointId = this.$route.query.workflowPointId // 流程节点id
      this.childEnterId = this.$route.query.childEnterId// 入园id
      this.approveVisible = true
      this.$refs.attrition.list = []
      this.$refs.attrition.fileList = []
      this.$refs.attrition.reasonDisabled = false
      if (this.$route.query.flag == 'look') {
        this.$refs.attrition.reasonDisabled = true
        this.approveVisible = false
      }
      if (
        this.$route.query.flag == 'back'
      ) {
        this.approveVisible = false
      }

      const res = await this.post('/overAgeTipApi/childSuperventionWorkflow', { id: this.id, workflowId: this.workflowId })
      if (res.serviceSuccess) {
        const dataUtil = res.data.data
        const childSuperventionDetailVo = dataUtil.childSuperventionDetailVo
        const approvalPointList = dataUtil.approvalWorkflow.approvalPointList || []
        this.$refs.attrition.overAgeReasons = childSuperventionDetailVo.overAgeReason
        childSuperventionDetailVo.applyDate = childSuperventionDetailVo.applyDate.substring(0, 10)
        childSuperventionDetailVo.birthday = childSuperventionDetailVo.birthday ? moment(childSuperventionDetailVo.birthday) : null
        childSuperventionDetailVo.superventionOverDate = childSuperventionDetailVo.superventionOverDate ? moment(childSuperventionDetailVo.superventionOverDate, 'YYYY-MM') : null

        this.$refs.attrition.form.setFieldsValue(childSuperventionDetailVo)
        this.$nextTick(() => {
          if (this.$refs.attrition.overAgeReason == 2) {
            this.$refs.attrition.form.setFieldsValue({
              overAgeReasonOther: childSuperventionDetailVo.overAgeReasonOther
            })
          }
        })

        this.$refs.attrition.name = childSuperventionDetailVo.name
        this.$refs.attrition.currentStatus = childSuperventionDetailVo.currentStatus

        if (childSuperventionDetailVo.fileList.length > 0) {
          childSuperventionDetailVo.fileList.forEach(t => {
            this.$refs.attrition.fileList.push(t)
          })
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.attrition.setHeight('one', 'oneout')
          }, 500)
        })

        if (
          this.$route.query.flag != 'back'
        ) {
          this.$refs.attrition.list = approvalPointList

          for (var i = 0; i < approvalPointList.length; i++) {
            this.$refs.attrition.$set(this.$refs.attrition.attributeObj, 'show' + i, true)
            this.$refs.attrition.$set(this.$refs.attrition.attributeObj_copy, 'show' + i, true)
          }
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.attrition.setHeight('one', 'oneout')
            }, 100)
            for (var i = 0; i < this.$refs.attrition.list.length; i++) {
              this.$refs.attrition['form' + i].setFieldsValue({ reason: '' })
              this.$refs.attrition['form' + i].setFieldsValue(this.$refs.attrition.list[i])
              this.$refs.attrition.setHeight(i, i + 'out')
            }
          })
        }
      }
    },
    submit (e) {
      const attritionVue = this.$refs.attrition
      const len = attritionVue.list.length - 1
      const reason = attritionVue['form' + len].getFieldsValue().reason
      if (e == '0') { // 驳回
        attritionVue['form' + len].validateFields((err, values) => {
          if (!err) {
            this.post('/overAgeTipApi/rejectChildSupervention', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
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
            this.post('/overAgeTipApi/checkChildSuperventionInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
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

    async backInfo () {
      const res = await this.post('/overAgeTipApi/recallChildSupervention', { id: this.id })
      if (res.serviceSuccess) {
        this.$message.success('撤回成功！')
        this.backs()
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
