<template>
  <div class="padbottom conts">
    <div class="contin">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.Afform = form}">
        <AssessmentOrFuse :label="label"
                          :flag="flag"
                          :basedisabled="false"
                          :isEdit="isEdit"
                          ref="assessment"></AssessmentOrFuse>

      </ta-form>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <template>
        <ta-button type="primary"
                   class="preservation btnleft"
                   @click="submit">提交</ta-button>
      </template>
    </div>
  </div>
</template>
<script>
import AssessmentOrFuse from './components/assessmentOrFuse'
import moment from 'moment'
export default {
  components: {
    AssessmentOrFuse
  },
  data () {
    return {
      label: '', // 评估或融合
      id: '', // 列表跳转传过来的id
      childNumber: '', // 列表跳转传过来的childNumber
      flag: '', // 列表跳转传过来的flag 1评估 2融合
      isEdit: 0, // 是否是从评估事项列表过来的编辑
      assessOrFuseId: '' // 列表传过来的评估/融合id
    }
  },
  activated () {
    this.id = this.$route.query.id
    this.isEdit = this.$route.query.isEdit
    this.childNumber = this.$route.query.childNumber
    this.flag = this.$route.query.flag
    this.label = this.flag == '1' ? '评估' : '融合'
    this.assessOrFuseId = this.$route.query.assessOrFuseId
    this.Afform.resetFields()
    this.$refs.assessment.fileList = []
    this.$refs.assessment.fileList1 = []
    this.$refs.assessment.fileList2 = []
    if (!this.isEdit) { // 新增
      this.$nextTick(() => {
        this.Afform.setFieldsValue({
          handlePersonName: window.parent.indexTool.getUserInfo().userName,
          handleOrgName: window.parent.indexTool.getUserInfo().orgName,
          handleTime: moment()
        })
      })
    } else { // 编辑
      this.post('/adoptionAssessmentFuse/queryById', { id: this.assessOrFuseId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.$refs.assessment.isshow2 = data.ajax1913 == '0'
          this.$refs.assessment.isshow1 = data.ajax1912 == '0'
          JSON.parse(data.filePathVos).forEach(element => {
            this.$refs.assessment['fileList' + (element.functionType == 'f0' ? '' : (element.functionType == 'f1' ? '1' : '2'))].push(element)
          })
          data.handleTime = data.handleTime ? moment(data.handleTime) : null
          data.ajax1901 = data.ajax1901 ? moment(data.ajax1901) : null
          this.$nextTick(() => {
            this.Afform.setFieldsValue(data)
          })
        }
      })
    }
  },
  methods: {
    // 返回
    backs () {
      this.$router.go(-1)
    },
    // 提交
    submit () {
      const _self = this
      const fileList = _self.$refs.assessment.fileList
      const fileList1 = _self.$refs.assessment.fileList1
      const fileList2 = _self.$refs.assessment.fileList2
      const form = this.Afform.getFieldsValue()
      if ((form.ajax1912 == 0 && fileList1.length == 0) || (form.ajax1913 == 0 && fileList2.length == 0)) {
        this.$message.error('请上传必要附件！')
      } else {
        this.Afform.setFieldsValue({
          XX: '1',
          XXX: '2'
        })
        _self.Afform.validateFields((err, values) => {
          if (!err) {
            form.upLoadPathIds = []
            form.ajax1901 = form.ajax1901 ? moment(form.ajax1901).format('YYYY-MM-DD') : null
            form.ajax1910 = this.flag
            form.ajax2000 = this.id
            form.childNumber = this.childNumber
            form.id = this.isEdit ? this.assessOrFuseId : this.id
            for (let k = 0; k < fileList.length; k++) {
              form.upLoadPathIds.push(fileList[k].response.data.data.fileid)
            }
            for (let k = 0; k < fileList1.length; k++) {
              form.upLoadPathIds.push(fileList1[k].response.data.data.fileid)
            }
            for (let k = 0; k < fileList2.length; k++) {
              form.upLoadPathIds.push(fileList2[k].response.data.data.fileid)
            }
            if (form.ajax1908 == '1' && form.ajax1911 == '0') {
              this.$message.error('收养人无抚养、教育和保护被收养人的能力，不符合收养条件')
              return false
            }
            if (form.ajax1908 == '1' && form.ajax1912 == '1' && form.ajax1913 == '1') {
              this.$message.error('收养人患有医学上认为不应当收养子女的疾病且有不利于被收养人健康成长的违法犯罪记录，不符合收养条件')
              return false
            }
            if (form.ajax1908 == '1' && form.ajax1912 == '1') {
              this.$message.error('收养人患有医学上认为不应当收养子女的疾病，不符合收养条件')
              return false
            }
            if (form.ajax1908 == '1' && form.ajax1913 == '1') {
              this.$message.error('收养人有不利于被收养人健康成长的违法犯罪记录，不符合收养条件')
              return false
            }
            this.post(this.isEdit ? '/adoptionAssessmentFuse/update' : '/adoptionAssessmentFuse/save', form, true).then((res) => {
              if (res.serviceSuccess) {
                _self.$message.success('信息保存/修改成功！')
                _self.backs()
              } else {
                _self.$message.error(res.errors[0].msg)
              }
            })
          } else {
            _self.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
