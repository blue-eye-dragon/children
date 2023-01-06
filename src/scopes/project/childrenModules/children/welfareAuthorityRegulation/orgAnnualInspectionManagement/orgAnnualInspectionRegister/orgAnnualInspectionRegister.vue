<template>
  <div class="conts">

      <div class="contin">
        <ta-form layout="horizontal"
                 :autoFormCreate="(annualInspectionForm)=>{this.annualInspectionForm = annualInspectionForm}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="区域"
                            :require="{message:'请输入区域!'}"
                            fieldDecoratorId="areaName"
                            :initValue="areaName">
                <ta-input :disabled="true" />
              </ta-form-item>
              <ta-form-item label="检查人"
                            fieldDecoratorId="inspectPerson"
                            :fieldDecoratorOptions="rules.inspectPerson">
                <ta-input placeholder="请输入检查人"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="检查日期"
                            fieldDecoratorId="inspectDate"
                            :require="{message:'请选择检查日期'}">
                <ta-date-picker style="width: 100%;"
                                format="YYYY-MM-DD"
                                :disabled="disabled"
                                :disabledDate="disabledDate"
                                placeholder="请选择检查日期" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="机构名称"
                            fieldDecoratorId="welfareOrgId"
                            v-show="!ifdisabled"
                            :require="{message:'请选择福利机构名称'}">
                <ta-select placeholder="请选择福利机构名称"
                           :disabled="disabled"
                           @change="orgNameChange">
                  <ta-select-option :value="item.id"
                                    :tag="item.orgName"
                                    v-for="(item,index) in orgName"
                                    :key="index">{{item.orgName}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="机构名称"
                            v-show="ifdisabled"
                            fieldDecoratorId="orgName">
                <ta-input :disabled="true" />
              </ta-form-item>
              <ta-form-item label="年度"
                            fieldDecoratorId="year"
                            :require="{message:'请选择年度'}">
                <ta-year-picker style="width: 100%;"
                                :disabled="disabled"
                                :valid-now-time="'right'"
                                @change="disabledYear"
                                placeholder="请选择年度" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="附件上传"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}">
                <ta-upload :withCredentials="true"
                           :multiple="true"
                           name="file"
                           :action="action"
                           :data="upload "
                           :fileList="uploadfileList"
                           :beforeUpload="beforeUpload"
                           @preview="preview"
                           @remove="handleRemove('uploadfileList',$event)"
                           @change="handleChangeupload">
                  <ta-button :disabled="disabled">
                    <ta-icon type="upload" /> 上传
                  </ta-button>
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
        <div class="bom"
             style="    left: 14px;">
          <ta-button class="preservation"
                     @click="backs"
                     style="margin-left:20px">返回</ta-button>
          <ta-button type="primary"
                     v-if="!disabled"
                     class="preservation"
                     @click="submit()"
                     :disabled="disabled"
                     style="margin-left:20px">提交</ta-button>
        </div>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      validNowTime: 'left',
      disabled: false,
      ifdisabled: false,
      area: '',
      areaName: '',
      orgName: [],
      orgId: [],
      orgNm: '',
      uploadfileList: [],
      upload: {
        functionalType: '3',
        busiType: '35'
      },
      id: '',
      editData: {},
      rules: {
        inspectPerson: this.verificationRules('检查人', 72)
      }
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.getOrgName()
    this.uploadfileList = []
    this.annualInspectionForm.resetFields()
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    this.ifdisabled = this.$route.query.ifdisabled
    this.getarea()
    if (this.id) {
      this.getDetails()
    }
  },
  mounted () {
    this.getarea()

  },
  methods: {
    // disabledYear (a, b) {
    //   let year = moment().year()
    //   if (Math.abs(b - year) > 100) {
    //     this.$message.error('请选择当前年前后100年的年份')
    //     this.annualInspectionForm.setFieldsValue({
    //       year: null
    //     })
    //   }
    // },
    disabledYear (current) {
      console.log(current);
      if(current){
        let toYear = current._d.getFullYear()
        let year = moment().year()
        if (toYear - year > 0) {
          this.$message.error('请选择当前年份或之前')
          this.form.resetFields()
        }
      }
    },
    handlePanelChange3 (value, mode) {
      // 不能选择去年和明年
      console.log('value-->', value)
      const year = moment().year()
      return year// current && Math.abs(current - year) == 10
    },
    // 区域
    async getarea () {
      let data = await this.post('/areaManagement/getAreaByCurrentUser')
      this.area = data.data.data.areaId
      this.areaName = data.data.data.areaName
    },
    // 机构名称
    async getOrgName () {
      let data = await this.post('/welfareOrgChangeManagement/queryByOrgId')
      if (data == '') {
        this.$message.error('请确认该部门下是否有相关福利机构')
      } else {
        this.orgName = data.data.data
      }
    },
    orgNameChange (val, options) {
      this.orgNm = options.data.attrs.tag
    },
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeupload (info) {
      if (info.file.status === 'uploading') {
        this.uploadfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        console.log('shanchu')
        console.log(info)
        if (this.filedisabled) {
          return false
        }
        this.uploadfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.uploadfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.uploadfileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleRemove (file, e) {
      let fileId = e.response.data.data.fileid
      let _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          if (response.serviceSuccess == true) {
            _self.$message.success('文件删除成功!')
            this.file.splice(this.file.indexOf(val), 1)
          } else {
            _self.$message.error('文件删除失败!')
          }
        })
    },
    backs () {
      this.$router.go(-1)
    },
    // 文件上传
    fileUpload () {
      let upLoadPathIds = []
      let fileidsGather = [
        ...this.uploadfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    async submit () {
      let isok = true
      let data = {}
      this.annualInspectionForm.validateFields((err, values) => {
        data = values
        if (err) {
          isok = false
        }
      })
      if (isok) {
        let text = ''
        let url = ''
        let fileContent = this.fileUpload()
        data.orgName = this.orgNm
        data.area = this.area
        data.inspectDate = data.inspectDate.format('YYYY-MM-DD')
        data.year = data.year.format('YYYY')
        data.upLoadPathIds = fileContent
        if (this.id) {
          text = '编辑成功'
          url = '/welfareOrgAnnualInspectionManagement/update'
          data.createTime = this.editData.createTime
          data.createUser = this.editData.createUser
          data.updateTime = this.editData.updateTime
          data.updateUser = this.editData.updateUser
          data.delState = this.editData.delState
          data.id = this.editData.id
          data.orgId = this.editData.orgId
          if (!data.orgName) {
            data.orgName = this.editData.orgName
          }
          if (!this.editData.orgName) {
            this.orgName.map(item => {
              if (this.editData.welfareOrgId == item.id) {
                data.orgName = item.orgName
              }
            })
          }
        } else {
          text = '新增成功'
          url = '/welfareOrgAnnualInspectionManagement/save'
        }
        let res = await this.post(url, data)
        if (res.errors == null) {
          this.$router.push({
            name: 'orgAnnualInspectionRecord'
          })
          this.$message.success(text)
          this.annualInspectionForm.resetFields()
        }
      }
    },
    async getDetails () {
      let params = {
        id: this.id
      }
      let data = await this.post('/welfareOrgAnnualInspectionManagement/queryById', params)
      this.editData = data.data.data
      if (this.editData.fileList) {
        this.editData.fileList.map(item => {
          if (item.functionType == '3' && item.busiType == '35') {
            this.uploadfileList.push(item)
          }
        })
      }
      this.$nextTick(() => {
        this.editData.inspectDate = moment(this.editData.inspectDate)
        this.editData.year = moment(this.editData.year)
        this.annualInspectionForm.setFieldsValue(this.editData)
      })
    }
  }
}
</script>
<style scoped>
.warntext {
  margin-bottom: 40px;
}
</style>
