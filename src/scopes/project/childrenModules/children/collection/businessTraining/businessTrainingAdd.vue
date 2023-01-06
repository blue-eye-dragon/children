<template>
  <div class="padbottom conts tadrawer">
    <div class="contin">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="培训标题"
                          fieldDecoratorId="trainingTitle"
                          :fieldDecoratorOptions="verificationRules('培训标题',72)">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入培训标题'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="培训地点"
                          fieldDecoratorId="trainingLocation"
                          :fieldDecoratorOptions="verificationRules('培训地点',72)">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入培训地点'" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="培训日期"
                          fieldDecoratorId="trainingDate"
                          :require="{message:'请选择培训日期'}">
              <ta-date-picker style="width: 100%;"
                              :placeholder="disabled?'':'请选择培训日期'"
                              :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="培训老师"
                          fieldDecoratorId="trainingTeachers"
                          :fieldDecoratorOptions="verificationRules('培训老师',72)">
              <ta-input :disabled='disabled'
                        :placeholder="disabled?'':'请输入培训老师'" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="培训内容"
                        class="alonerow"
                        :require="{message:'请输入培训内容'}"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{span:22}"
                        fieldDecoratorId="trainingContent">
            <ta-textarea placeholder="请输入培训内容"
                         :disabled='disabled'
                         :rows="4" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="培训人员"
                        class="alonerow"
                        :require="{message:'请选择培训人员'}"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{span:22}"
                        fieldDecoratorId="trainingPeople">
            <ChosePersonnel ref="ChosePersonnel"
                            :disabled='disabled'
                            @clearTip="clearTip"></ChosePersonnel>
          </ta-form-item>
        </ta-col>
      </ta-form>
      <div class="clearfloat"></div>
    </div>
    <div class="bom">
      <ta-button @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="btnleft"
                 @click="submit"
                 v-if="!disabled">提交</ta-button>
    </div>
  </div>
</template>

<script>
import ChosePersonnel from './components/chosePersonnel'
import moment from 'moment'
export default {
  components: {
    ChosePersonnel
  },
  data () {
    return {
      disabled: false,
      id: '', // 编辑、查看带过来的列表数据id
      flag: 'add' // 区分新增、编辑、查看操作
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  methods: {
    initData () {
      this.setLabelAndWrapperWidth('6.33%', '93.67%', 'alonerow') // 单独一行字段宽度控制
      this.form.resetFields()
      this.id = this.$route.query.id
      this.flag = this.$route.query.flag
      this.disabled = this.flag == 'look'
      // 初始化培训人员数据
      const { ChosePersonnel } = this.$refs
      ChosePersonnel.selectIds = []
      ChosePersonnel.tableData = []

      if (this.flag != 'add') { // 编辑或查看
        this.post('/businessTrainingInfo/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            data.trainingDate = data.trainingDate ? moment(data.trainingDate) : null
            ChosePersonnel.tableData = data.trainingPeoples
            ChosePersonnel.selectIds = data.chiefSupervisorIds
            this.$nextTick(() => {
              this.form.setFieldsValue(data)
            })
          }
        })
      }
    },
    // 返回
    backs () {
      this.$router.go(-1)
    },
    // 提交
    submit () {
      const { selectIds } = this.$refs.ChosePersonnel
      if (selectIds.length == 0) {
        this.form.setFieldsValue({ trainingPeople: undefined })
      } else {
        this.form.setFieldsValue({ trainingPeople: 1 })
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = this.form.getFieldsValue()
          delete formData.trainingPeople
          formData.trainingDate = formData.trainingDate ? moment(formData.trainingDate).format('YYYY-MM-DD') : ''
          formData.ChiefSupervisorIds = selectIds
          let url = '/businessTrainingInfo/save'
          if (this.flag == 'edit') {
            url = '/businessTrainingInfo/update'
            formData.id = this.id
          }
          this.post(url, formData, true).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据提交成功')
              this.backs()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 清除培训人员错误提示
    clearTip () {
      this.form.setFieldsValue({ trainingPeople: 1 })
    }
  }

}
</script>
<style lang="less" scoped>
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
</style>
