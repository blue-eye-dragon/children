<template>
  <ta-drawer title="批量审批"
             placement="right"
             :width="500"
             @close="onReturn"
             :visible="visible">
    <div class="batchfrom">
      <Title id="anchorpoint_a"
             :title="msg"
             :ishide="false"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="已选择儿童"
                          fieldDecoratorId="aa"
                          :labelCol="{ span: 6 }"
                          :wrapperCol="{ span: 18 }">
              <div class="chosechild">
                <div v-for="(item,index) in chosedata"
                     :key="index"
                     class="children">
                  <span class="textclass"
                        :title="item.name">{{item.name}}</span>
                  <ta-icon class="dels"
                           type="close"
                           @click="deletes(index)" />
                </div>
              </div>
            </ta-form-item>
          </ta-col>
        </ta-row>
        <Title id="anchorpoint_a"
               title="批量审核"
               :ishide="false"></Title>
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="审核意见"
                          fieldDecoratorId="auditOpinion"
                          :labelCol="{ span: 6 }"
                          :wrapperCol="{ span: 18 }"
                          :fieldDecoratorOptions="verificationRules('审核意见',200,true)">
              <ta-textarea placeholder="请输入审核意见"
                           :rows="4" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div slot="footer">
      <ta-button type="primary"
                 class="preservation"
                 @click="onSubmit">通过</ta-button>
      <ta-button type="danger"
                 class="preservation"
                 @click="onClose">驳回</ta-button>
      <ta-button class="preservation"
                 @click="onReturn">返回</ta-button>
    </div>
  </ta-drawer>
</template>
<script>
import Title from '@component/common/components/Title'
export default {
  components: {
    Title
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    msg: {
      type: String,
      required: true
    },
    types: {
      type: String,
      required: true
    },
    chosedata: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 驳回
    onClose () {
      if (this.chosedata && this.chosedata.length == 0) {
        this.$message.error('请选择儿童！')
        return
      }
      let workflowPointIds = ''
      this.chosedata.forEach((item) => {
        workflowPointIds = workflowPointIds + item.workflowPointId + ','
      })
      workflowPointIds = workflowPointIds.substring(0, workflowPointIds.length - 1)
      let url = ''
      if (this.types == '1') { // 入院
        url = '/addChildApi/batchRejectChildInfo'
      }
      if (this.types == '2') { // 减员
        url = '/reductionChildRequestApi/batchRejectReductionChildInfo'
      }
      if (this.types == '3') { // 变更
        url = '/childChangeRequestApi/batchRejectChangeChildInfo'
      }
      let isok = true
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        this.post(url, {
          workflowPointIds: workflowPointIds,
          reason: this.adoptedFrom.getFieldsValue().auditOpinion
        }).then((res) => {
          this.$message.success('审批已驳回！')
          this.adoptedFrom.resetFields()
          this.$emit('update:visible', false)
          this.$emit('handleSubmit')
        })
      }
    },
    deletes (e) {
      this.chosedata.splice(e, 1)
    },
    // 通过
    onSubmit () {
      if (this.chosedata && this.chosedata.length == 0) {
        this.$message.error('请选择儿童！')
        return
      }
      let workflowPointIds = ''
      this.chosedata.forEach((item) => {
        workflowPointIds = workflowPointIds + item.workflowPointId + ','
      })
      workflowPointIds = workflowPointIds.substring(0, workflowPointIds.length - 1)
      let url = ''
      if (this.types == '1') { // 入院
        url = '/addChildApi/batchCheckChildInfo'
      }
      if (this.types == '2') { // 减员
        url = '/reductionChildRequestApi/batchCheckReductionChildInfo'
      }
      if (this.types == '3') { // 变更
        url = '/childChangeRequestApi/batchCheckChangeChildInfo'
      }
      let isok = true
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        this.post(url, {
          workflowPointIds: workflowPointIds,
          reason: this.adoptedFrom.getFieldsValue().auditOpinion
        }).then((res) => {
          if (res.serviceSuccess) {
            this.$message.success('审批已通过！')
            this.adoptedFrom.resetFields()
            this.$emit('update:visible', false)
            this.$emit('handleSubmit')
          }
        })
      }
    },
    // 返回
    onReturn () {
      this.adoptedFrom.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="less">
.chosechild {
  padding: 0 0 17px 0;
  //   border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 40px;
}
.children {
  width: 80px;
  height: 30px;
  background: rgba(218, 238, 255, 1);
  border-radius: 4px 0px 0px 4px;
  font-size: 12px;
  display: flex;

  align-items: center;
  justify-content: space-around;
  margin-left: 15px;
  margin-top: 17px;
}
.textclass {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dels {
  margin-left: 10px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
