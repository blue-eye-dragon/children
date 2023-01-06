<template>
  <div class="conts">
    <div class="contin">
      <!-- <ta-anchor class="md" :offsetTop="100">
          <ta-anchor-link href="#anchorpoint_a" title="寄养儿童评估信息" />
          <ta-anchor-link href="#anchorpoint_b" title="寄养家庭评估信息" />
        </ta-anchor> -->
      <div ref="oneout"
           class="mars martop">
        <Title id="anchorpoint_a"
               title="寄养儿童评估信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(From)=>{this.From = From}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="生活状况"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='livingConditions'
                            :fieldDecoratorOptions="rules.livingConditions">
                <ta-textarea placeholder="请输入生活状况"
                             :disabled='status'
                             :rows="4" />
              </ta-form-item>
              <ta-form-item label="健康状况"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='healthConditions'
                            :fieldDecoratorOptions="rules.healthConditions">
                <ta-textarea placeholder="请输入健康状况"
                             :disabled='status'
                             :rows="4" />
              </ta-form-item>
              <ta-form-item label="成长状况"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='growUpConditions'
                            :fieldDecoratorOptions="rules.growUpConditions">
                <ta-textarea placeholder="请输入成长状况"
                             :disabled='status'
                             :rows="4" />
              </ta-form-item>
              <ta-form-item label="康复教育目标完成情况"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='recureEduGoalCondition'
                            :fieldDecoratorOptions="rules.recureEduGoalCondition">
                <ta-textarea placeholder="请输入康复教育目标完成情况"
                             :disabled='status'
                             :rows="4" />
              </ta-form-item>
              <ta-form-item label="是否有更换家庭意愿"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='idReplaceFamilyAspirotion'
                            :fieldDecoratorOptions="rules.idReplaceFamilyAspirotion">
                <ta-select placeholder="请选择是否有更换家庭意愿"
                           :disabled='status'>
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in assessmentresultList"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars">
        <Title id="anchorpoint_b"
               title="寄养家庭评估信息"
               :show.sync="showtwo"></Title>
        <ta-form layout="horizontal"
                 ref="two"
                 :autoFormCreate="(familyFrom)=>{this.familyFrom = familyFrom}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="跟踪评估量表"
                            fieldDecoratorId='followAssessmentTable'
                            :fieldDecoratorOptions="rules.followAssessmentTable">
                <ta-input placeholder="请输入跟踪评估量表"
                          :disabled='status' />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="跟踪评估分数"
                            fieldDecoratorId='followAssessmentGrade'
                            :fieldDecoratorOptions="rules.followAssessmentGrade">
                <ta-input-number placeholder="请輸入跟踪评估分数"
                                 :disabled='status'
                                 :min="1"
                                 :max="100"
                                 :precision='1'
                                 style="width:100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="评估附件"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='filePathVoId'>
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="adoption"
                           :fileList="fileList"
                           @preview="handlePreview"
                           :beforeUpload="beforeUpload"
                           @change="handleChangeadoption">
                  <div>
                    <ta-button :disabled='status'>
                      <ta-icon type="upload" />上传
                    </ta-button>
                  </div>
                </ta-upload>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
                </p>
              </ta-form-item>
              <ta-form-item label="评估负责人"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:4}"
                            fieldDecoratorId='assessmentPersonInCharge'
                            :fieldDecoratorOptions="rules.assessmentPersonInCharge">
                <!-- <ta-textarea placeholder="请输入评估负责人"

                             :disabled='status'
                             :rows="4" /> -->
                <ta-input placeholder="请输入评估负责人"
                          :disabled='status' />
              </ta-form-item>
              <ta-form-item label="评估意见"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='assessmentOpinion'
                            :fieldDecoratorOptions="rules.assessmentOpinion">
                <ta-textarea placeholder="请输入评估意见"
                             :disabled='status'
                             :rows="4" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="登记人"
                            fieldDecoratorId='registerMember'
                            :fieldDecoratorOptions="rules.registerMember">
                <ta-input placeholder="请输入登记人"
                          :disabled='status' />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="评估日期"
                            fieldDecoratorId='assessmentDate'
                            :fieldDecoratorOptions="rules.assessmentDate">
                <ta-date-picker style="width: 100%;"
                                :disabled='status'
                                format="YYYY-MM-DD"
                                placeholder="请选择评估日期" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button class="preservation"
                 type='primary'
                 @click="submit"
                 v-if='!status'>提交</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  components: {
    Title
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      rules: {
        livingConditions: this.verificationRulesNotMustFill('生活状况', 200, true),
        healthConditions: this.verificationRulesNotMustFill('健康状况', 200, true),
        growUpConditions: this.verificationRulesNotMustFill('成长状况', 200, true),
        recureEduGoalCondition: this.verificationRulesNotMustFill('康复教育目标完成情况', 200, true),
        idReplaceFamilyAspirotion: this.verificationRules('是否有更换家庭意愿'),
        followAssessmentTable: this.verificationRulesNotMustFill('跟踪评估量表', 72),
        assessmentPersonInCharge: this.verificationRules('评估负责人', 72),
        assessmentOpinion: this.verificationRules('评估意见', 72, false),
        registerMember: this.verificationRules('登记人', 72),
        assessmentDate: this.verificationRules('评估日期', true)
      },
      showone: true,
      showtwo: true,
      assessmentresultList: [],
      fileList: [],
      adoption: {
        functionalType: '1',
        busiType: '40'
      },
      childBaseId: '',
      id: '',
      status: false
    }
  },
  activated () {
    this.loadData()
    this.childBaseId = this.$route.query.childBaseId
    this.status = this.$route.query.status != 0
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getDetails()
    }
  },
  mounted () {
    this.getassessmentresult()
    this.setHeight('one', 'oneout')
    this.setHeight('two', 'twoout')
  },
  methods: {
    loadData () {
      this.childBaseId = ''
      this.id = ''
      this.status = false
      this.fileList = []
      this.familyFrom.resetFields()
      this.From.resetFields()
    },
    async getDetails () {
      let params = {
        id: this.id
      }
      let data = await this.post('/fosterFamilyChildAssessment/queryById', params)
      console.log('shuju')
      console.log(data)
      if (data.errors == null) {
        let resData = data.data.data
        resData.assessmentDate = moment(resData.assessmentDate)
        this.familyFrom.setFieldsValue(resData)
        this.From.setFieldsValue(resData)
        if (resData.filePathVos) {
          let filePathVos = JSON.parse(resData.filePathVos)
          this.fileList = [...filePathVos]
        }
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 500)
      }
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChangeadoption (info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.status) {
          return false
        }
        this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
        this.setHeight('two', 'twoout')
      }
    },
    async getassessmentresult () {
      let data = await this.getDictionaries('YESNO')
      this.assessmentresultList = data
    },
    backs () {
      this.$router.go(-1)
    },
    async submit () {
      let isok = true
      this.From.validateFields(async (err, values) => {
        if (err) {
          console.log(err)
          isok = false
        }
      })
      this.familyFrom.validateFields((err, values) => {
        if (err) {
          console.log(err)
          isok = false
        }
      })
      if (isok) {
        let fromData = this.From.getFieldsValue()
        let familyFromData = this.familyFrom.getFieldsValue()
        familyFromData.assessmentDate = familyFromData.assessmentDate.format('YYYY-MM-DD')
        if (familyFromData.filePathVoId) {
          let arr = []
          let fileids = familyFromData.filePathVoId.fileList
          // filePathVoId
          fileids.map(item => {
            arr.push(item.response.data.data.fileid)
          })
          familyFromData.filePathVoId = arr
        }
        let params = { ...fromData, ...familyFromData }
        params.childBaseId = this.childBaseId
        console.log(params)
        // assessmentDate
        let url = ''
        if (this.id) {
          url = '/fosterFamilyChildAssessment/update'
          params.id = this.id
        } else {
          url = '/fosterFamilyChildAssessment/save'
        }
        let resObj = await this.post(url, params)
        if (resObj.errors == null) {
          this.$message.success('提交成功')
          this.backs()
        }
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.martop {
  margin-top: 20px;
}
.preservation {
  margin-left: 20px;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
