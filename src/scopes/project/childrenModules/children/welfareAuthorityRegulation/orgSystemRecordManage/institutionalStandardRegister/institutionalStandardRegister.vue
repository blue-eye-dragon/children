<template>
  <div class="conts">

      <div class="contin">
        <ta-form layout="horizontal"
                 :autoFormCreate="(standardRegister)=>{this.standardRegister = standardRegister}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="区域"
                            :require="{message:'请输入区域'}"
                            fieldDecoratorId="areaName"
                            :initValue="areaName">
                <ta-input :disabled="true" />
              </ta-form-item>
              <ta-form-item label="备案人"
                            fieldDecoratorId="recordPerson"
                            :fieldDecoratorOptions="this.verificationRules('备案人',72)">
                <ta-input placeholder="请输入备案人"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="机构名称"
                            fieldDecoratorId="welfareOrgId"
                            v-show="isshow"
                            :require="{message:'请输入机构名称'}">
                <!-- <ta-input placeholder="请输入机构名称"
                              :disabled="disabled"/> -->
                <ta-select placeholder="请选择机构名称"
                           :disabled="ifdisabled"
                           @change="orgNameChange">
                  <ta-select-option :value="item.id"
                                    v-for="(item,index) in orgName"
                                    :key="index">{{item.orgName}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="机构名称"
                            fieldDecoratorId="orgName"
                            v-if="!isshow"
                            :fieldDecoratorOptions="this.verificationRules('机构名称',72)">
                <ta-input :disabled="ifdisabled" />
              </ta-form-item>
              <ta-form-item label="备案日期"
                            fieldDecoratorId="recordDate"
                            :require="{message:'请选择申请日期'}">
                <ta-date-picker style="width: 100%;"
                                format="YYYY-MM-DD"
                                :disabled="disabled"
                                :disabledDate="disabledDate"
                                placeholder="请选择备案日期" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
        <ta-form layout="horizontal"
                 :autoFormCreate="(WelfareOrgRecordManagementDetail )=>{this.WelfareOrgRecordManagementDetail  = WelfareOrgRecordManagementDetail }">
          <ta-row class="fromcom">
            <div class="item_title">
              <div class="lines"></div>
              <p class="item_text">规章制度备案</p>
              <div class="horizontalline"></div>
            </div>
            <ta-col :span="12">
              <ta-form-item label="规章制度制定人"
                            fieldDecoratorId="enactingPerson"
                            :fieldDecoratorOptions="this.verificationRules('规章制度制定人',72)">
                <ta-input placeholder="请输入规章制度制定人"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="制定日期"
                            fieldDecoratorId="enactingDate"
                            :require="{message:'请选择制定日期'}">
                <ta-date-picker style="width: 100%;"
                                format="YYYY-MM-DD"
                                :disabled="disabled"
                                :disabledDate="disabledDate"
                                placeholder="请选择制定日期" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="规章制度附件"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="regulations"
                           :fileList="regulationsfileList"
                           :beforeUpload="beforeUpload"
                           @remove="handleRemove('regulationsfileList',$event)"
                           @change="handleChangeregulations"
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
              <ta-form-item label="附件上传"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="other"
                           :fileList="otherfileList"
                           :beforeUpload="beforeUpload"
                           @remove="handleRemove('otherfileList',$event)"
                           @change="handleChangeOther"
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
        <ta-form layout="horizontal"
                 style="margin-bottom:200px"
                 :autoFormCreate="(WelfareOrgRecordManagementDetail2 )=>{this.WelfareOrgRecordManagementDetail2  = WelfareOrgRecordManagementDetail2 }">
          <ta-row class="fromcom">
            <div class="item_title">
              <div class="lines"></div>
              <p class="item_text">服务标准备案</p>
              <div class="horizontalline"></div>
            </div>
            <ta-col :span="12">
              <ta-form-item label="服务标准制定人"
                            fieldDecoratorId="enactingPerson"
                            :fieldDecoratorOptions="this.verificationRules('服务标准制定人',72)">
                <ta-input placeholder="请输入服务标准制定人"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="制定日期"
                            fieldDecoratorId="enactingDate"
                            :require="{message:'请选择制定日期'}">
                <ta-date-picker style="width: 100%;"
                                format="YYYY-MM-DD"
                                :disabled="disabled"
                                :disabledDate="disabledDate"
                                placeholder="请选择制定日期" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="服务标准附件"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="serviceStandard "
                           :fileList="serviceStandardfileList"
                           :beforeUpload="beforeUpload"
                           @remove="handleRemove('serviceStandardfileList',$event)"
                           @change="handleChangeserviceStandard"
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
              <ta-form-item label="附件上传"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :multiple="true"
                           :action="action"
                           :data="other2"
                           :fileList="other2fileList"
                           :beforeUpload="beforeUpload"
                           @remove="handleRemove('other2fileList',$event)"
                           @change="handleChangeOther2"
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
        <div class="bom"
             style="left:14px;">
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
      ifdisabled: false,
      area: '',
      areaName: '',
      orgName: [],
      orgId: [],
      orgNm: '',
      regulationsfileList: [],
      otherfileList: [],
      serviceStandardfileList: [],
      other2fileList: [],
      regulations: {
        functionalType: '3',
        busiType: '41'
      },
      other: {
        functionalType: '3',
        busiType: '35'
      },
      serviceStandard: {
        functionalType: '3',
        busiType: '42'
      },
      other2: {
        functionalType: '3',
        busiType: '35-35'
      },
      id: '',
      editData: {},
      isshow: true
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.regulationsfileList = []
    this.otherfileList = []
    this.serviceStandardfileList = []
    this.other2fileList = []
    this.standardRegister.resetFields()
    this.WelfareOrgRecordManagementDetail.resetFields()
    this.WelfareOrgRecordManagementDetail2.resetFields()
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    this.ifdisabled = this.$route.query.ifdisabled
    // this.getarea()
    if (this.id) {
      this.getDetails()
      this.isshow = false
    }
  },
  mounted () {
    this.getarea()
    this.getOrgName()
  },
  methods: {

    disabledDate (current) {
      return current > moment().endOf('day')
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
    orgNameChange (val) {
      this.orgName.map(item => {
        if (item.id == val) {
          this.orgNm = item.orgName
        }
      })
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeregulations (info) {
      if (info.file.status === 'uploading') {
        this.regulationsfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.regulationsfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.regulationsfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.regulationsfileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeOther (info) {
      if (info.file.status === 'uploading') {
        this.otherfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.otherfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.otherfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.otherfileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeserviceStandard (info) {
      if (info.file.status === 'uploading') {
        this.serviceStandardfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.serviceStandardfileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.serviceStandardfileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.serviceStandardfileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    handleChangeOther2 (info) {
      if (info.file.status === 'uploading') {
        this.other2fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        this.other2fileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.other2fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.other2fileList = info.fileList
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
        ...this.regulationsfileList,
        ...this.otherfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    fileUpload2 () {
      let upLoadPathIds = []
      let fileidsGather = [
        ...this.serviceStandardfileList,
        ...this.other2fileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    async submit () {
      let isok = true
      let welfareOrgRecordManagementVo = {}
      let welfareOrgRecordManagementDetailVos = []
      let welfareOrgRecordManagementDetailVos1 = {}
      let welfareOrgRecordManagementDetailVos2 = {}

      let fileContent = this.fileUpload()
      let fileContent2 = this.fileUpload2()
      this.standardRegister.validateFields((err, values) => {
        welfareOrgRecordManagementVo = values
        values.orgName = this.orgNm

        if (err) {
          isok = false
        }
      })
      this.WelfareOrgRecordManagementDetail.validateFields((err, values) => {
        welfareOrgRecordManagementDetailVos1 = values
        if (err) {
          isok = false
        }
      })
      this.WelfareOrgRecordManagementDetail2.validateFields((err, values) => {
        welfareOrgRecordManagementDetailVos2 = values
        if (err) {
          isok = false
        }
      })
      if (isok) {
        let text = ''
        let url = ''
        let data = {}

        welfareOrgRecordManagementVo.orgName = this.orgNm
        // welfareOrgRecordManagementVo.areaName = this.areaName
        welfareOrgRecordManagementVo.area = this.area
        welfareOrgRecordManagementVo.recordDate = welfareOrgRecordManagementVo.recordDate.format('YYYY-MM-DD')
        welfareOrgRecordManagementDetailVos1.enactingDate = welfareOrgRecordManagementDetailVos1.enactingDate.format('YYYY-MM-DD')
        welfareOrgRecordManagementDetailVos2.enactingDate = welfareOrgRecordManagementDetailVos2.enactingDate.format('YYYY-MM-DD')
        welfareOrgRecordManagementDetailVos1.upLoadPathIds = fileContent
        welfareOrgRecordManagementDetailVos2.upLoadPathIds = fileContent2
        welfareOrgRecordManagementDetailVos.push(welfareOrgRecordManagementDetailVos1, welfareOrgRecordManagementDetailVos2)
        if (this.id) {
          text = '编辑成功'
          url = '/welfareOrgRecordManagement/update'
          welfareOrgRecordManagementVo.createTime = this.editData.welfareOrgRecordManagementVo.createTime
          welfareOrgRecordManagementVo.createUser = this.editData.welfareOrgRecordManagementVo.createUser
          welfareOrgRecordManagementVo.delState = this.editData.welfareOrgRecordManagementVo.delState
          welfareOrgRecordManagementVo.updateTime = this.editData.welfareOrgRecordManagementVo.updateTime
          welfareOrgRecordManagementVo.createUser = this.editData.welfareOrgRecordManagementVo.createUser
          welfareOrgRecordManagementVo.id = this.editData.welfareOrgRecordManagementVo.id
          welfareOrgRecordManagementVo.orgId = this.editData.welfareOrgRecordManagementVo.orgId
          if (!welfareOrgRecordManagementVo.orgName) {
            welfareOrgRecordManagementVo.orgName = this.editData.welfareOrgRecordManagementVo.orgName
          }
          welfareOrgRecordManagementDetailVos[0].id = this.editData.welfareOrgRecordManagementDetailVos[0].id
          welfareOrgRecordManagementDetailVos[0].recordId = this.editData.welfareOrgRecordManagementDetailVos[0].recordId
          welfareOrgRecordManagementDetailVos[0].recordType = this.editData.welfareOrgRecordManagementDetailVos[0].recordType
          welfareOrgRecordManagementDetailVos[1].id = this.editData.welfareOrgRecordManagementDetailVos[1].id
          welfareOrgRecordManagementDetailVos[1].recordId = this.editData.welfareOrgRecordManagementDetailVos[1].recordId
          welfareOrgRecordManagementDetailVos[1].recordType = this.editData.welfareOrgRecordManagementDetailVos[1].recordType
          data = {
            // ...this.editData,
            welfareOrgRecordManagementVo,
            welfareOrgRecordManagementDetailVos
          }
        } else {
          text = '新增成功'
          url = '/welfareOrgRecordManagement/save'
          data = {
            welfareOrgRecordManagementVo,
            welfareOrgRecordManagementDetailVos
          }
        }
        let res = await this.post(url, data, true)
        if (res.errors == null) {
          this.$router.push({
            name: 'institutionalStandardRecord'
          })
          this.$message.success(text)
          this.standardRegister.resetFields()
          this.WelfareOrgRecordManagementDetail.resetFields()
          this.WelfareOrgRecordManagementDetail2.resetFields()
        }
      }
    },
    async getDetails () {
      let params = {
        id: this.id
      }
      let data = await this.post('/welfareOrgRecordManagement/queryById', params)
      const detailData = data.data.data
      this.editData = data.data.data
      if (detailData.welfareOrgRecordManagementDetailVos[0].fileList) {
        let fileData = detailData.welfareOrgRecordManagementDetailVos[0].fileList
        fileData.map(item => {
          if (item.functionType == '3' && item.busiType == '41') {
            this.regulationsfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '35') {
            this.otherfileList.push(item)
          }
        })
      }
      if (detailData.welfareOrgRecordManagementDetailVos[1].fileList) {
        let fileData = detailData.welfareOrgRecordManagementDetailVos[1].fileList
        fileData.map(item => {
          if (item.functionType == '3' && item.busiType == '42') {
            this.serviceStandardfileList.push(item)
          }
          if (item.functionType == '3' && item.busiType == '35-35') {
            this.other2fileList.push(item)
          }
        })
      }
      this.$nextTick(() => {
        detailData.welfareOrgRecordManagementVo.recordDate = moment(detailData.welfareOrgRecordManagementVo.recordDate)
        this.standardRegister.setFieldsValue(detailData.welfareOrgRecordManagementVo)
        detailData.welfareOrgRecordManagementDetailVos[0].enactingDate = moment(detailData.welfareOrgRecordManagementDetailVos[0].enactingDate)
        detailData.welfareOrgRecordManagementDetailVos[1].enactingDate = moment(detailData.welfareOrgRecordManagementDetailVos[1].enactingDate)
        this.WelfareOrgRecordManagementDetail.setFieldsValue(detailData.welfareOrgRecordManagementDetailVos[0])
        this.WelfareOrgRecordManagementDetail2.setFieldsValue(detailData.welfareOrgRecordManagementDetailVos[1])
      })
    }
  }
}
</script>
<style scoped>
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  width: 84px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 135px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
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
