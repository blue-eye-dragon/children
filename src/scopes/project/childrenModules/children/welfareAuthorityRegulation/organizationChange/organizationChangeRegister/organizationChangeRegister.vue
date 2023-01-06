<template>
  <div class="conts">
      <div class="contin">
        <ta-form layout="horizontal"
                 :autoFormCreate="(orgChangeRegister)=>{this.orgChangeRegister = orgChangeRegister}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="区域"
                            :require="{message:'请输入区域'}"
                            fieldDecoratorId="areaName"
                            :initValue="areaName">
                <ta-input :disabled="true" />
              </ta-form-item>
              <ta-form-item label="具体地址"
                            fieldDecoratorId="address"
                            :fieldDecoratorOptions="this.verificationRules('具体地址',100)">
                <ta-input placeholder="请输入具体地址"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="机构性质"
                            fieldDecoratorId="orgNature"
                            :require="{message:'请选择机构性质'}">
                <ta-select placeholder="请选择机构性质"
                           :disabled="disabled">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in orgNature"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="变更人"
                            fieldDecoratorId="orgEstablishBidPerson"
                            :fieldDecoratorOptions="this.verificationRules('变更人',72)">
                <ta-input placeholder="请输入变更人"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="机构名称"
                            v-show="isshow"
                            fieldDecoratorId="welfareOrgId"
                            :require="{message:'请输入机构名称'}">
                <!-- <ta-input placeholder="请输入机构名称"
                              :disabled="disabled"/> -->
                <ta-select placeholder="请选择机构名称"
                           :disabled="disabled"
                           @change="orgNameChange">
                  <ta-select-option :value="item.id"
                                    v-for="(item,index) in orgName"
                                    :key="index">{{item.orgName}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="机构名称"
                            v-if="!isshow"
                            fieldDecoratorId="orgName"
                            :fieldDecoratorOptions="this.verificationRules('机构名称',72)">
                <ta-input :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="机构类型"
                            fieldDecoratorId="orgType"
                            :require="{message:'请选择机构类型'}">
                <ta-select placeholder="请选择机构类型"
                           :disabled="disabled">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in orgType"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="负责人"
                            fieldDecoratorId="responsiblePerson"
                            :fieldDecoratorOptions="this.verificationRules('负责人',72)">
                <ta-input placeholder="请输入负责人"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="变更日期"
                            fieldDecoratorId="orgEstablishBidDate"
                            :require="{message:'请选择变更日期'}">
                <ta-date-picker style="width: 100%;"
                                format="YYYY-MM-DD"
                                :disabled="disabled"
                                placeholder="请选择变更日期" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="机构章程和规章制度"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="orgConstitution"
                           :fileList="orgConstitutionfileList"
                           :beforeUpload="beforeUpload"
                           @remove="handleRemove('orgConstitutionfileList',$event)"
                           @change="handleChangeaOrgConstitution"
                           @preview="preview">
                  <ta-button :disabled="disabled">
                    <ta-icon type="upload" /> 上传
                  </ta-button>
                </ta-upload>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
                </p>
              </ta-form-item>
              <ta-form-item label="其他附件上传"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="otherMaterial"
                           :fileList="otherMaterialfileList"
                           :beforeUpload="beforeUpload"
                           @remove="handleRemove('otherMaterialfileList',$event)"
                           @change="handleChangeOtherMaterial"
                           @preview="preview">
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
        <div class="bom">
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
      disabled: false,
      ishide: false,
      orgNature: [],
      orgType: [],
      orgConstitutionfileList: [],
      otherMaterialfileList: [],
      orgConstitution: {
        functionalType: '3',
        busiType: '36'
      },
      otherMaterial: {
        functionalType: '3',
        busiType: '37'
      },
      id: '',
      area: '',
      areaName: '',
      orgName: [],
      orgId: [],
      orgNm: '',
      rules: {
        orgEstablishBidPerson: this.verificationRules('变更人', 60),
        address: this.verificationRules('具体地址', 200)
      },
      isshow: true
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.getOrgName()
    this.orgConstitutionfileList = []
    this.otherMaterialfileList = []
    this.orgChangeRegister.resetFields()
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    if (this.id) {
      this.getDetails()
      this.isshow = false
    } else {
      this.isshow = true
    }
  },
  mounted () {
    this.getorgNature()
    this.getorgType()
    this.getarea()

  },
  methods: {
    preview (file) { this.downloadFile(file) },
    // 机构性质
    async getorgNature () {
      let data = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.orgNature = data
    },
    // 机构类型
    async getorgType () {
      let data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.orgType = data
    },
    // 区域
    async getarea () {
      let data = await this.post('/areaManagement/getAreaByCurrentUser')
      this.area = data.data.data.areaId
      this.areaName = data.data.data.areaName
    },
    // 机构名称
    async getOrgName () {
      let data = await this.post('/welfareInstitutionChanges/queryOrgNameList')
      if (data == '') {
        this.$message.error('请确认该部门下是否有相关福利机构')
      } else {
        this.orgName = data.data.data
      }
    },
    orgNameChange (val) {
      this.orgName.map(item => {
        if (item.id == val) {
          this.orgChangeRegister.setFieldsValue({
            address: item.address,
            orgType: item.orgType,
            orgNature: item.orgNature,
            responsiblePerson: item.responsiblePerson
          })
          this.orgNm = item.orgName
        }
      })
    },
    handleChangeaOrgConstitution (info) {
      if (info.file.status === 'uploading') {
        this.orgConstitutionfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.orgConstitutionfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.orgConstitutionfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.orgConstitutionfileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeOtherMaterial (info) {
      if (info.file.status === 'uploading') {
        this.otherMaterialfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.otherMaterialfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.otherMaterialfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.otherMaterialfileList = info.fileList
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
        ...this.orgConstitutionfileList,
        ...this.otherMaterialfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    async submit () {
      let isok = true
      let params = []
      let fileContent = this.fileUpload()
      this.orgChangeRegister.validateFields((err, values) => {
        params = values
        if (err) {
          isok = false
          // this.$message.error('请正确完整')
        }
      })
      if (isok) {
        let text = '新增成功'
        let url = '/welfareOrgChangeManagement/save'
        params.orgEstablishBidDate = params.orgEstablishBidDate.format('YYYY-MM-DD')
        let data = {
          ...params,
          orgName: this.orgNm,
          areaName: this.areaName,
          area: this.area,
          upLoadPathIds: fileContent
        }
        let res = await this.post(url, data)
        if (res.errors == null) {
          this.$router.push({
            name: 'organizationChangeRecord'
          })
          this.$message.success(text)
          this.orgChangeRegister.resetFields()
        }
      }
    },
    async getDetails () {
      let params = {
        id: this.id
      }
      let data = await this.post('/welfareOrgChangeManagement/queryById', params)
      if (data.data.resultData) {
        data.data.resultData.fileList.map(item => {
          if (item.functionType == '3' && item.busiType == '36') {
            this.orgConstitutionfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '37') {
            this.otherMaterialfileList.push(item)
          }
        })
      }
      this.$nextTick(() => {
        data.data.resultData.orgEstablishBidDate = moment(data.data.resultData.orgEstablishBidDate)
        this.orgChangeRegister.setFieldsValue(data.data.resultData)
      })
    }
  }
}
</script>
<style scoped>
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
