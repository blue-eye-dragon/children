<template>
  <div class="conts tadrawer">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="收养登记信息"
                   :forceRender="true"
                   key="1">
        <See :evaluate='"yes"'
             :goId='id'
             :handleType='"0"'
             :additionalYesOrNo='"0"'
             ref="seeMode"
             :info='"0"'></See>
      </ta-tab-pane>
      <ta-tab-pane :tab="titleName+'信息'"
                   :forceRender="true"
                   key="2">
        <ta-form layout="horizontal"
                 style="margin-top: 30px;  margin-right: 97px;"
                 :autoFormCreate="(EvaluateForm)=>{this.EvaluateForm = EvaluateForm}">
          <Evaluate :label="titleName"
                    :yesNoList="yesNoList"
                    :basedisabled="seeContent"
                    ref="assessment"></Evaluate>

        </ta-form>
      </ta-tab-pane>
      <ta-tab-pane :tab="'融合信息'"
                   v-if="reveal=='2'"
                   :forceRender="true"
                   key="3">
        <ta-form layout="horizontal"
                 style="margin-top: 30px;  margin-right: 97px;"
                 :autoFormCreate="(fuse)=>{this.fuse = fuse}">
          <Evaluate :label="'融合'"
                    :basedisabled="seeContent"
                    ref="fuse1"></Evaluate>

        </ta-form>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <ta-button class="leftbton"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 :hidden="nowkey=='1'||seeContent"
                 class="preservation"
                 @click="submit">提交</ta-button>

    </div>
  </div>
</template>
<script>
import See from './registration.vue'
import Evaluate from './components/additionalEvaluateForRecord.vue'
import moment from 'moment'
export default {
  components: {
    See,
    Evaluate
  },
  props: {},
  data () {
    return {
      yesNoList: [],
      nowkey: '1',
      id: '',
      titleName: '',
      flag: '',
      seeContent: false,
      reveal: ''
    }
  },
  activated () {
    this.reveal = '1'
    this.nowkey = '1'
    this.EvaluateForm.resetFields()
    this.id = this.$route.query.id
    if (this.$route.query.titleName == '22') {
      this.seeContent = true
      this.titleName = '评估'
      this.getData()
    } else {
      this.seeContent = false
      this.titleName = this.$route.query.titleName
      this.flag = this.$route.query.flag
    }
    this.$nextTick(() => {
      this.$refs.seeMode.loaddata()
      this.EvaluateForm.setFieldsValue({
        handlePersonName: window.parent.indexTool.getUserInfo().userName,
        handleOrgName: window.parent.indexTool.getUserInfo().orgName,
        handleTime: moment()
      })
    })
  },
  mounted () {
    this.id = this.$route.query.id
    this.getdit()
  },
  methods: {
    async getdit () {
      this.yesNoList = await this.getDictionaries('YESNO')
    },
    async getData () {
      const response = await this.post('/adoptionAppointment/queryAdoptionRegisterAssessInfoByRegisterId', { id: this.id })
      if (!response.error) {
        const seeContentData = response.data.data
        this.reveal = seeContentData.length

        seeContentData[0].ajax1901 = seeContentData[0].ajax1901 ? moment(seeContentData[0].ajax1901) : null
        seeContentData[0].handleTime = seeContentData[0].handleTime ? moment(seeContentData[0].handleTime) : null

        this.$refs.assessment.isshow1 = seeContentData[0].ajax1912 == 0
        this.$refs.assessment.isshow2 = seeContentData[0].ajax1913 == 0

        // this.$refs.assessment.fileList
        JSON.parse(seeContentData[0].filePathVos).forEach((a) => {
          switch (a.functionType) {
            case 'f0':
              this.$refs.assessment.fileList.push(a)
              break
            case 'f1':
              this.$refs.assessment.fileList1.push(a)
              break
            case 'f2':
              this.$refs.assessment.fileList2.push(a)
              break
            default: this.$message.error('返回附件标识非法!')
          }
        })

        // setTimeout(() => {
        //   this.EvaluateForm.setFieldsValue({ ajax1913: seeContentData[0].ajax1913 })
        // }, 500)
        if (this.reveal == '2') {
          seeContentData[1].ajax1901 = seeContentData[1].ajax1901 ? moment(seeContentData[1].ajax1901) : null
          seeContentData[1].handleTime = seeContentData[1].handleTime ? moment(seeContentData[1].handleTime) : null
          this.$nextTick(() => {
            if (seeContentData[1].filePathVos) {
              this.$refs.fuse1.fileList = JSON.parse(seeContentData[1].filePathVos)
            }
            this.fuse.setFieldsValue(seeContentData[1])
          })
        }

        this.$nextTick(() => {
          setTimeout(() => {
            this.EvaluateForm.setFieldsValue(seeContentData[0])
          }, 4000)
        })
      }
      // if()
    },
    submit () {
      const fileList = this.$refs.assessment.fileList
      const fileList1 = this.$refs.assessment.fileList1
      const fileList2 = this.$refs.assessment.fileList2
      const form = this.EvaluateForm.getFieldsValue()
      if ((form.ajax1912 == 0 && fileList1.length == 0) || (form.ajax1913 == 0 && fileList2.length == 0)) {
        this.$message.error('请上传必要附件！')
      } else {
        this.EvaluateForm.setFieldsValue({
          XX: '1',
          XXX: '2'
        })
      }
      this.EvaluateForm.validateFields((err, values) => {
        if (!err) {
          form.upLoadPathIds = []
          form.ajax1901 = form.ajax1901 ? moment(form.ajax1901).format('YYYY-MM-DD') : null
          form.ajax1910 = this.flag
          form.ajax0100 = this.id
          form.id = this.id
          const fileList = this.$refs.assessment.fileList
          for (var k = 0; k < fileList.length; k++) {
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

          this.post('/adoptionAssessmentFuse/saveAdoptionRegisterAssess', form, true).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('信息保存成功！')
              this.backs()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    backs () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.leftbton {
  right: 26px;
}
</style>
