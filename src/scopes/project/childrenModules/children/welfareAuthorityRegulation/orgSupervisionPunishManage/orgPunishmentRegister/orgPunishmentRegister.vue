<template>
  <div class="conts">

      <div class="contin">
        <ta-form layout="horizontal"
                 :autoFormCreate="(orgPunishmentRegister)=>{this.orgPunishmentRegister = orgPunishmentRegister}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="区域"
                            :require="{message:'请输入区域'}"
                            fieldDecoratorId="areaName"
                            :initValue="areaName">
                <ta-input :disabled="true" />
              </ta-form-item>
              <ta-form-item label="处罚类型"
                            fieldDecoratorId="punishType"
                            :require="{message:'请选择处罚类型'}">
                <ta-select placeholder="请选择处罚类型"
                           :disabled="disabled">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in punishType"
                                    :key="index">{{item.label}}
                  </ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <!-- ifdisabled -->
              <ta-form-item label="机构名称"
                            v-show="!ifdisabled"
                            fieldDecoratorId="welfareOrgId"
                            :require="{message:'请选择机构名称'}">
                <ta-select placeholder="请选择机构名称"
                           :disabled="disabled"
                           @change="orgNameChange">
                  <ta-select-option :value="item.id"
                                    v-for="(item,index) in orgName"
                                    :tag="item.orgName"
                                    :key="index">{{item.orgName}}
                  </ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="机构名称"
                            v-show="ifdisabled"
                            fieldDecoratorId="orgName">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="处罚原因"
                            fieldDecoratorId="punishReason"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            :fieldDecoratorOptions="rules.punishReason">
                <ta-textarea placeholder="请输入处罚原因"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="处罚单位"
                            fieldDecoratorId="punishUnit"
                            :fieldDecoratorOptions="rules.punishUnit">
                <ta-input placeholder="请输入处罚单位"
                          :disabled="disabled" />
              </ta-form-item>

            </ta-col>
            <ta-col :span="12">

              <ta-form-item label="处罚日期"
                            fieldDecoratorId="punishDate"
                            :require="{message:'请选择处罚日期'}">
                <ta-date-picker style="width: 100%;"
                                format="YYYY-MM-DD"
                                :disabled="disabled"
                                placeholder="请选择处罚日期"
                                :disabledDate="disabledDate" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="附件"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}">
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
                    <ta-icon type="upload" />
                    上传
                  </ta-button>
                </ta-upload>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />
                  附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
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
      formobj: {},
      disabled: false,
      ifdisabled: false,
      ishide: false,
      punishType: [],
      otherMaterialfileList: [],
      otherMaterial: {
        functionalType: '3',
        busiType: '35'
      },
      id: '',
      area: '',
      areaName: '',
      orgName: [],
      orgId: [],
      orgNm: '',
      rules: {
        punishUnit: this.verificationRules('处罚单位', 70),
        punishReason: this.verificationRules('处罚原因', 200, true)
      }
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  activated () {
    this.otherMaterialfileList = []
    this.orgPunishmentRegister.resetFields()
    this.id = this.$route.query.id
    this.disabled = this.$route.query.disabled
    this.ifdisabled = this.$route.query.ifdisabled
    this.getarea()
    this.getOrgName()
    if (this.id) {
      this.getDetails()
    }
  },
  mounted () {
    this.getPunishType()
    this.getarea()
  },
  methods: {
    // 处罚类型
    async getPunishType () {
      let data = await this.getDictionaries('PUNISH_TYPE')
      this.punishType = data
    },
    // 区域
    async getarea () {
      let data = await this.post('/areaManagement/getAreaByCurrentUser')
      this.area = data.data.data.areaId
      this.areaName = data.data.data.areaName
      this.orgPunishmentRegister.setFieldsValue({
        address_Linkage: this.areamodel
      })
    },
    // 处罚日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
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
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeOtherMaterial (info) {
      if (info.file.status === 'uploading') {
        this.otherMaterialfileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
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
        ...this.otherMaterialfileList
      ]
      fileidsGather.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      return upLoadPathIds
    },
    // 提交表单
    async submit () {
      let isok = true
      let params = []
      let fileContent = this.fileUpload()
      this.orgPunishmentRegister.validateFields((err, values) => {
        params = values
        params.punishDate = params.punishDate.format('YYYY-MM-DD')
        if (err) {
          isok = false
          // this.$message.error('信息填写有误')
        }
      })
      if (isok) {
        let text = ''
        let url = ''
        params.upLoadPathIds = fileContent
        if (this.id) {
          text = '编辑成功'
          url = '/welfareOrgSupervisionPunishManagement/update'
          params.id = this.formobj.id
          params.area = this.formobj.area
          // params.areaName = this.formobj.areaName
          params.orgName = this.formobj.orgName
          params.createTime = this.formobj.createTime
          params.createUser = this.formobj.createUser
          params.delState = this.formobj.delState
          params.orgId = this.formobj.orgId
        } else {
          text = '新增成功'
          url = '/welfareOrgSupervisionPunishManagement/save'
          params.area = this.area
          // params.areaName = this.areaName
          params.orgName = this.orgNm
        }
        let res = await this.post(url, params)
        if (res.errors == null) {
          this.$router.push({
            name: 'punishmentRecord'
          })
          this.$message.success(text)
          this.orgPunishmentRegister.resetFields()
        }
      }
    },
    // 根据id获取数据
    async getDetails () {
      let params = {
        id: this.id
      }
      let data = await this.post('/welfareOrgSupervisionPunishManagement/queryById', params)
      this.formobj = data.data.data
      if (this.formobj.fileList) {
        this.formobj.fileList.map(item => {
          if (item.functionType == '3' && item.busiType == '35') {
            this.otherMaterialfileList.push(item)
          }
        })
      }
      this.$nextTick(() => {
        this.formobj.punishDate = moment(this.formobj.punishDate)
        this.orgPunishmentRegister.setFieldsValue(this.formobj)
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
