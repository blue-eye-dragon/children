<template>
  <div class="conts">
    <div class="contin">
      <Additionainformation :childEnterId="childEnterId"
                            :isAnotherPlaceApply="isAnotherPlaceApply"
                            :isOverAge="isOverAge"
                            ref="addition"></Additionainformation>
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
import Additionainformation from '../components/additionainformation'
export default {
  components: {
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
      workflowPointId: '', // 流程节点id
      approveVisible: true, // 审批true、查看false
      isOverAge: false // 是否是超龄补录
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
      const additionVue = _self.$refs.addition
      _self.childEnterId = _self.$route.query.childEnterId // 儿童入院id
      _self.isAnotherPlaceApply = _self.$route.query.isAnotherPlaceApply // 儿童入院id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.workflowPointId = _self.$route.query.workflowPointId // 流程节点id
      _self.isOverAge = _self.$route.query.isOverAge // 是否是超龄补录
      _self.approveVisible = true
      additionVue.reasonDisabled = false
      additionVue.form.resetFields()

      if (_self.$route.query.flag == 'look') { // 审批true、查看false
        _self.approveVisible = false
        additionVue.reasonDisabled = true
      } else {
        _self.$nextTick(() => {
          additionVue.searchForm.resetFields()
        })
      }

      _self.post('/addChildApi/detailWorkflow', { childEnterId: _self.childEnterId, workflowId: _self.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          const list = data.approvalPointList || []
          additionVue.tableData = data.approvalPointList
          for (var i = 0; i < list.length; i++) {
            additionVue.$set(additionVue.attributeObj, 'show' + i, true)
            additionVue.$set(additionVue.attributeObj_copy, 'show' + i, true)
          }
          additionVue.list = list
          _self.$nextTick(() => {
            if (_self.isAnotherPlaceApply) {
              additionVue.tableData1 = data.rejectVoLists
              // additionVue.setHeight('three', 'threeout')
            }
            additionVue.form.setFieldsValue(data)
            additionVue.name = data.name
            additionVue.currentStatus = data.currentStatus
            // for (var i = 0; i < list.length; i++) {
            //   additionVue['form' + i].setFieldsValue({ reason: '' })
            //   additionVue['form' + i].setFieldsValue(list[i])
            //   additionVue.setHeight(i, i + 'out')
            // }
            additionVue.setHeight('two', 'twoout')
            additionVue.setHeight('one', 'oneout')
          })
        }
      })
    },
    submit (e) {
      const additionVue = this.$refs.addition
      const reason = additionVue.searchForm.getFieldsValue().reason
      if (e == '0') { // 驳回
        additionVue.searchForm.validateFields((err, values) => {
          if (!err) {
            this.post('/addChildApi/rejectChildInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
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
        additionVue.searchForm.validateFields((err, values) => {
          if (!err) {
            this.post('/addChildApi/checkChildInfo', { workflowPointId: this.workflowPointId, reason: reason }).then((res) => {
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
