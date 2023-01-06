<template>
  <div class="conts">
    <div class="contin">
      <div class="marcont">
        <ta-row class="fromcom">
          <ta-col :span="8">
            <ta-form-item label="寄养儿童"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="idCard">
              <div style="margin-top:9px">{{childData.childrenName}}</div>
            </ta-form-item>
            <ta-form-item label="主照料人姓名"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="idCard">
              <div style="margin-top:9px">{{childData.primaryCaregiverName}}</div>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="性别"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="idCard">
              <div style="margin-top:9px">{{childSex}}</div>
            </ta-form-item>
            <ta-form-item label="性别"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="idCard">
              <div style="margin-top:9px">{{childData.sex}}</div>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="出生日期"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="idCard">
              <div style="margin-top:9px">{{childBirthday}}</div>
            </ta-form-item>
            <ta-form-item label="出生日期"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="idCard">
              <div style="margin-top:9px">{{childData.birthday}}</div>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </div>
      <div ref="oneout"
           v-show="isshow"
           class="mars">
        <Title id="anchorpoint_a"
               title="融合信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(From)=>{this.From = From}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="融合开始日期"
                            fieldDecoratorId='fuseStartDate'>
                <ta-date-picker style="width: 100%;"
                                :disabled='true'
                                format="YYYY-MM-DD" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="融合结束日期"
                            fieldDecoratorId='fuseEndDate'>
                <ta-date-picker style="width: 100%;"
                                :disabled='true'
                                format="YYYY-MM-DD" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="取消融合原因"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='cancelFuseReason'>
                <ta-textarea :disabled='true'
                             :rows="4" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="取消融合日期"
                            fieldDecoratorId='cancelFuseDate'>
                <ta-date-picker :disabled='true'
                                placeholder=''
                                style="width: 100%;"
                                format="YYYY-MM-DD" />
              </ta-form-item>
              <ta-form-item label="评估日期"
                            fieldDecoratorId='assessmentDate'>
                <ta-date-picker :disabled='true'
                                style="width: 100%;"
                                format="YYYY-MM-DD" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="评估人员"
                            fieldDecoratorId='assessmentMenber'>
                <ta-input :disabled='true' />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="评估意见"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            fieldDecoratorId='assessmentOpinion'>
                <ta-textarea :disabled='true'
                             :rows="4" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="评估结果"
                            fieldDecoratorId='assessmentResult'>
                <ta-select :disabled='true'>
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
               title="确立寄养关系信息"
               :show.sync="showtwo"></Title>
        <ta-form layout="horizontal"
                 ref="two"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-col :span="12">

                <ta-form-item label="寄养关系确定日期"
                              fieldDecoratorId='fosterRelationConfirmDate'>
                  <ta-date-picker :disabled='true'
                                  style="width: 100%;"
                                  format="YYYY-MM-DD" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item label="寄养开始日期"
                              fieldDecoratorId='fosterStartDate'>
                  <ta-date-picker :disabled='true'
                                  style="width: 100%;"
                                  format="YYYY-MM-DD" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="寄养结束日期"
                            fieldDecoratorId='forsterEndDate'
                            :labelCol="{span:3}"
                            :wrapperCol="{span:9}">
                <ta-date-picker :disabled='true'
                                style="width: 100%;"
                                format="YYYY-MM-DD" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="12">
              <ta-form-item label="附件">
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
                    <ta-button :disabled='true'>
                      <ta-icon type="upload" />上传
                    </ta-button>
                  </div>
                </ta-upload>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
                </p>
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div ref="threeout"
           class="mars"
           v-show="relationStatus==5">
        <Title id="anchorpoint_c"
               title="解除寄养关系信息"
               :show.sync="showthree"></Title>
        <ta-form layout="horizontal"
                 ref="three"
                 :autoFormCreate="(faFrom)=>{this.faFrom = faFrom}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="解除寄养关系原因"
                            fieldDecoratorId='cancelFosterRelationReason'>
                <ta-textarea :disabled='true'
                             :rows="4" />
              </ta-form-item>
              <ta-form-item label="寄养关系解除日期"
                            fieldDecoratorId='cancelFosterRelationDate'>
                <ta-date-picker :disabled='true'
                                style="width: 100%;"
                                format="YYYY-MM-DD" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
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
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    }
  },
  data () {
    return {
      showone: true,
      isshow: true,
      showtwo: true,
      showthree: true,
      rules: {},
      assessmentresultList: [],
      fileList: [],
      adoption: {
        functionalType: '1',
        busiType: '39'
      },
      fosterChildId: '',
      relationStatus: '',
      childData: {},
      childBirthday: '',
      childSex: ''
    }
  },
  activated () {
    this.loadData()
    this.childData = JSON.parse(this.$route.query.dataStr)
    this.fosterChildId = this.childData.fosterChildId
    this.relationStatus = this.childData.relationStatus
    this.id = this.childData.id
    this.fuseId = this.childData.fuseId
    this.getDetails()
  },
  mounted () {
    this.getassessmentresult()
    this.setHeight('one', 'oneout')
    this.setHeight('two', 'twoout')
  },
  methods: {
    loadData () {
      this.childBirthday = ''
      this.childSex = ''
      this.fileList = []
      this.showone = true
      this.showtwo = true
      this.isshow = true
      this.showthree = true
      this.childData = {}
    },
    async getDetails () {
      const params = {
        fosterChildId: this.fosterChildId,
        relationStatus: this.relationStatus,
        id: this.id,
        fuseId: this.fuseId
      }
      const data = await this.post('/fosterRecord/queryByChildIdAndFosterFamilyId', params)
      if (data.errors == null) {
        const fosterFamilyAndChildRelationVo = data.data.data
        if (fosterFamilyAndChildRelationVo.fosterStartDate) {
          fosterFamilyAndChildRelationVo.fosterStartDate = moment(fosterFamilyAndChildRelationVo.fosterStartDate)
        }
        if (fosterFamilyAndChildRelationVo.fuseEndDate) {
          fosterFamilyAndChildRelationVo.fuseEndDate = moment(fosterFamilyAndChildRelationVo.fuseEndDate)
        } else {
          this.isshow = false
        }
        if (fosterFamilyAndChildRelationVo.fuseStartDate) {
          fosterFamilyAndChildRelationVo.fuseStartDate = moment(fosterFamilyAndChildRelationVo.fuseStartDate)
        } else {
          this.isshow = false
        }
        if (fosterFamilyAndChildRelationVo.forsterEndDate) {
          fosterFamilyAndChildRelationVo.forsterEndDate = moment(fosterFamilyAndChildRelationVo.forsterEndDate)
        }
        if (fosterFamilyAndChildRelationVo.fosterRelationConfirmDate) {
          fosterFamilyAndChildRelationVo.fosterRelationConfirmDate = moment(fosterFamilyAndChildRelationVo.fosterRelationConfirmDate)
        }

        const filePathVos = JSON.parse(fosterFamilyAndChildRelationVo.filePathVos)
        this.fileList = [...filePathVos]
        this.childBirthday = fosterFamilyAndChildRelationVo.childBirthday
        this.childSex = fosterFamilyAndChildRelationVo.childSex
        if (this.relationStatus == 5) {
          fosterFamilyAndChildRelationVo.cancelFosterRelationDate = moment(fosterFamilyAndChildRelationVo.cancelFosterRelationDate)
          this.faFrom.setFieldsValue({
            cancelFosterRelationDate: fosterFamilyAndChildRelationVo.cancelFosterRelationDate,
            cancelFosterRelationReason: fosterFamilyAndChildRelationVo.cancelFosterRelationReason
          })
        }
        const fosterFamilyChildFuseAssessmentVo = data.data.data
        if (fosterFamilyChildFuseAssessmentVo.assessmentDate) {
          fosterFamilyChildFuseAssessmentVo.assessmentDate = moment(fosterFamilyChildFuseAssessmentVo.assessmentDate)
        }
        if (fosterFamilyChildFuseAssessmentVo.fuseEndDate) {
          fosterFamilyChildFuseAssessmentVo.fuseEndDate = moment(fosterFamilyChildFuseAssessmentVo.fuseEndDate)
        }
        if (fosterFamilyChildFuseAssessmentVo.fuseStartDate) {
          fosterFamilyChildFuseAssessmentVo.fuseStartDate = moment(fosterFamilyChildFuseAssessmentVo.fuseStartDate)
        }
        fosterFamilyAndChildRelationVo.assessmentMenber = fosterFamilyChildFuseAssessmentVo.assessmentMenber
        fosterFamilyAndChildRelationVo.assessmentOpinion = fosterFamilyChildFuseAssessmentVo.assessmentOpinion
        fosterFamilyAndChildRelationVo.assessmentResult = fosterFamilyChildFuseAssessmentVo.assessmentResult
        fosterFamilyAndChildRelationVo.assessmentDate = fosterFamilyChildFuseAssessmentVo.assessmentDate
        this.$nextTick(() => {
          this.From.setFieldsValue(fosterFamilyAndChildRelationVo)
          this.adoptedFrom.setFieldsValue({
            fosterStartDate: fosterFamilyAndChildRelationVo.fosterStartDate,
            forsterEndDate: fosterFamilyAndChildRelationVo.forsterEndDate,
            fosterRelationConfirmDate: fosterFamilyAndChildRelationVo.fosterRelationConfirmDate
          })

          if (this.isshow == true) {
            this.setHeight('one', 'oneout')
          }
          if (this.relationStatus == 5) {
            this.setHeight('three', 'threeout')
          }
          this.setHeight('two', 'twoout')
        })
      }
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChangeadoption (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        return false
        // this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
        this.setHeight('two', 'twoout')
      }
    },
    backs () {
      this.$router.go(-1)
    },
    // ASSESSMENT_RESULT
    async getassessmentresult () {
      const data = await this.getDictionaries('ASSESSMENT_RESULT')
      this.assessmentresultList = data
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
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
.marcont {
  width: 83%;
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
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
  width: 147%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
