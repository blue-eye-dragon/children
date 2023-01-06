<template>
  <div id="ad-informationnote">
    <ta-row class="fromcom">
      <ta-col :span="24">
        <ta-form-item label="照片上传"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="photoId"
                      :fieldDecoratorOptions="{rules: [{required: true, message: '请上传收养人与被收养人合影照片!'}]}">
          <ta-upload :withCredentials="true"
                     name="file"
                     listType="picture-card"
                     :action="action"
                     :fileList="imgfilelist"
                     @remove="handleRemove"
                     @preview="handlePreview"
                     @change="handleChange"
                     :disabled="basedisabled"
                     :beforeUpload="beforeUpload">
            <div v-if="imgfilelist.length==0"
                 class="imgupload">
              <ta-icon type="plus"
                       class="imgicon" />
              <div class="ant-upload-text">选择照片</div>
            </div>
          </ta-upload>
          <p class="warntext">
            <ta-icon type="info-circle-o"
                    class="icons" />请上传收养人与被收养人合影照片。
          </p>
        </ta-form-item>
        <ta-form-item label="收养原因"
                      :labelCol="{ span: 3 }"
                      :fieldDecoratorOptions="rules.adoptionReason"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="adoptionReason">
          <ta-textarea :placeholder="basedisabled?'':'请输入收养原因'"
                       :rows="4"
                       :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="收养人提供证件情况"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      :fieldDecoratorOptions="rules.adoptorCredentials"
                      fieldDecoratorId="adoptorCredentials">
          <ta-textarea :placeholder="basedisabled?'':'请输入收养人提供证件情况'"
                       :rows="4"
                       :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="送养人提供证件情况"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="placingOutCredentials"
                      :fieldDecoratorOptions="rules.placingOutCredentials">
          <ta-textarea :placeholder="basedisabled?'':'请输入送养人提供证件情况'"
                       :rows="4"
                       :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="其他有关事项"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="otherMatters"
                      :fieldDecoratorOptions="{rules: [{ min:0,max:70, message: '最大输入70个字符!' }]}">
          <ta-textarea :placeholder="basedisabled?'':'请输入其他有关事项'"
                       :rows="1"
                       :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="备注"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="remark"
                      :fieldDecoratorOptions="{rules: [{ min:0,max:70, message: '最大输入70个字符!' }]}">
          <ta-textarea :placeholder="basedisabled?'':'请输入备注'"
                       :rows="1"
                       :disabled="basedisabled" />
        </ta-form-item>
        <ta-form-item label="审核意见"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="approveOpinions"
                      :fieldDecoratorOptions="rules.approveOpinions">
          <ta-textarea :placeholder="basedisabled?'':'请输入审核意见'"
                       :rows="1"
                       :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item :label="additionalYesOrNo ==1?'收养登记日期':'登记日期'"
                      fieldDecoratorId="registerDate"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                      :require="{message:additionalYesOrNo ==1?'收养登记日期':'登记日期'}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="basedisabled?'':additionalYesOrNo ==1?'收养登记日期':'登记日期'"
                          :disabledDate="disabledDate"
                          :disabled="basedisabled" />
        </ta-form-item>

      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="档案页数"
                      fieldDecoratorId="archivesCount"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                      :require="{message:'请输入档案页数'}">
          <ta-input-number :placeholder="basedisabled?'':'请输入档案页数'"
                           :min="1"
                           :max="999999"
                           :precision=0
                           style="width:100%"
                           :disabled="basedisabled" />
        </ta-form-item>

      </ta-col>
      <!-- :fieldDecoratorOptions="rules.adoptionRegistionPrintNumber" -->
      <ta-col :span="8">
        <ta-form-item label="收养登记证印制号"
                      fieldDecoratorId="adoptionRegistionPrintNumber"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-input :placeholder="basedisabled?'':'请输入收养登记证印制号'"
                    :disabled="basedisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12"
              v-if="isZY">
        <ta-form-item label="收养登记证字号"
                      fieldDecoratorId="adoptionRegistionCertificateNumber"
                      :fieldDecoratorOptions="rules.adoptionRegistionCertificateNumber">
          <!-- v-if="additionalYesOrNo ==1 || basedisabled" -->
          <ta-input :placeholder="basedisabled?'':'请输入收养登记证字号'"
                    :disabled="basedisabled || !infomationType" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12" class="ta-col_registerOrgName">
        <ta-form-item label="收养登记机关"
                      fieldDecoratorId="registerOrgName"
                      :initValue="loginOrgName"
                      :fieldDecoratorOptions="rules.registerOrgName">
          <ta-input :placeholder="basedisabled?'':'请输入收养登记机关'"
                    :disabled="basedisabled"/>
        </ta-form-item>
      </ta-col>

    </ta-row>
  </div>
</template>
<script>
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'applicant',
  props: {

    basedisabled: {
      type: Boolean,
      required: true
    },
    infomationType: {
      type: Boolean,
      required: true
    },
    additionalYesOrNo: { // 是否补录
      type: String,
      required: true
    },
    imgfilelist: {
      type: Array,
      required: true
    },
    isZY: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    },
    // 当前登录的组织机构名称
    loginOrgName() {
      return window.parent.indexTool.getUserInfo().orgName
    },
  },
  data () {
    return {
      rules: {
        adoptionReason: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, whitespace: true, message: '请输入收养原因' },
            { max: 200, message: '最大输入200个字符' }
          ]
        },
        adoptorCredentials: {
          initialValue:
            '户口簿，居民身份证，子女情况证明，婚姻状况及有抚养教育被收养人能力的证明，身体健康检查证明',
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, whitespace: true, message: '请输入收养人提供证件情况' },
            { max: 200, message: '最大输入200个字符' }
          ]
        },
        placingOutCredentials: {
          initialValue:
            '法定代表人户口簿、居民身份证，经办人户口簿、居民身份证，弃婴入院证明，收养协议，被收养人户口簿，捡拾报案证明，生父母死亡证明，身体检查证明',
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, whitespace: true, message: '送养人提供证件情况!' },
            { max: 200, message: '最大输入200个字符' }
          ]
        },
        approveOpinions: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, whitespace: true, message: '请输入审核意见' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        adoptionRegistionPrintNumber: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, whitespace: true, message: '请输入收养登记证印制号' },
            { max: 50, message: '最大输入50个字符' }
          ]
        },
        adoptionRegistionPrintNumber1: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: false, whitespace: true, message: '请输入收养登记证印制号' },
            { max: 50, message: '最大输入50个字符' }
          ]
        },
        adoptionRegistionCertificateNumber: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入收养登记证字号' },
            { max: 30, message: '最大输入30个字符' }
          ]
        },
        registerOrgName: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入收养登记机关' },
          ]
        },
      },
      isDisabled: false
    }
  },
  methods: {
    handlePreview (file) {
      this.downloadFile(file)
    },
    handleCancel () {
      this.previewVisible = false
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:imgfilelist', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.basedisabled) {
          return false
        }
        this.$emit('update:imgfilelist', info.fileList)
      }
      if (info.file.status === 'done') {
        // 上传成功
        this.$emit('update:imgfilelist', info.fileList)
        this.$message.success('文件上传成功!')
        setTimeout(() => {
          this.$forceUpdate()
        }, 500)
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    // 附件删除
    handleRemove (e) {
      if (this.basedisabled) {
        return false
      }

      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: e.response.data.data.fileid
      }).then(response => {
        _self.$message.success('删除成功!')
      }).catch(() => {
        _self.$message.error('删除失败!')
      })
    },
    beforeUpload (file) {
      const typelist = [
        'image/jpeg',
        'image/png'
      ]
      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传图片(jpg、jpeg、png)格式的文件')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('单个文件不能超过10M')
      }
      return isaccord && isLt10M
    },
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      const year = moment().year()
      if (this.additionalYesOrNo == 0) {
        return current > moment().endOf('day') || current.year() - year < 0
      } else {
        return current > moment().endOf('day')
      }
    }
  }
}
</script>
<style lang="less">
#ad-informationnote {
.imhcont {
  width: 80%;
  height: 236px;
  border: 1px solid red;
}
.imgupload {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background: #fafafa;
  border: 1px dashed #e3e3e3;
}
.imgupload .imgicon {
  font-size: 30px;
  color: #2bafff;
}

.ta-col_registerOrgName {
  .ant-form-item-control-wrapper {
    width: 42%;
  }
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
  
  .icons {
    margin: 0 7px 0 24px;
  }
}

}
</style>
