<template>
  <div style="padding: 1%;">

    <ta-form class="drawerFrom"
             :autoFormCreate="(form)=>{this.form = form}"
             layout="horizontal">
      <ta-row>
        <ta-col :span="8">
          <ta-form-item label="体检日期"
                        fieldDecoratorId="physicalExaminationDate">
            <ta-input :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="身高(cm)"
                        fieldDecoratorId="height">
            <ta-input :disabled="idedit" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label="体重(kg)"
                        fieldDecoratorId="weight">
            <ta-input :disabled="idedit" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="体检总结"
                        fieldDecoratorId="physicalExaminationSummary"
                        :labelCol="{span: 2}"
                        :wrapperCol="{span: 14}">
            <ta-textarea :disabled="idedit"
                         :rows="4" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="附件上传"
                        fieldDecoratorId="filePathVo"
                        :labelCol="{span: 2}">
            <ta-upload :withCredentials="true"
                       name="file"
                       :multiple="true"
                       :fileList="fileList"
                       :disabled="true"
                       @preview="preview">

            </ta-upload>
          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>
    <div class="btnclass">
      <ta-button @click="returns"
                 style="left: 20px; top: 7px;">返回</ta-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      idedit: true,
      fileList: []
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.fileList = []
  },
  methods: {
    // 初始化数据
    initDatas () {
      let obj = JSON.parse(this.$route.query.obj)
      this.fileList = obj.filePathVos ? JSON.parse(obj.filePathVos) : []
      this.form.setFieldsValue(obj)
    },
    returns () {
      this.$router.go(-1)
    },
    preview (file) {
      this.downloadFile(file)
    }
  }
}
</script>
<style scoped>
.btnclass {
  position: fixed;
  bottom: 0px;
  background-color: white;
  width: 74%;
  height: 45px;
}
</style>
