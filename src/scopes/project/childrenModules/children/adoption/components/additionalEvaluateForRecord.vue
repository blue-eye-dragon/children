<template>
  <ta-row>

    <ta-col :span='8'>
      <ta-form-item :label="label+'日期'"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :require="{message:'请填写'+label+'日期'}"
                    fieldDecoratorId="ajax1901">
        <ta-date-picker style="width: 100%;"
                        :placeholder="!basedisabled?'请选择'+label+'日期':''"
                        :disabledDate="disabledDate"
                        :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item :label="label+'机构'"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="ajax1902"
                    :fieldDecoratorOptions="verificationRules(label+'机构',32)">

        <ta-input :disabled='basedisabled'
                  :placeholder="basedisabled?'':'请输入'+label+'机构'" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item :label="label+'小组人数'"
                    fieldDecoratorId="ajax1903"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}">
        <ta-input-number :min="1"
                         :max="99"
                         :precision=0
                         style="width:100%"
                         :placeholder="!basedisabled?'请输入'+label+'小组人数':''"
                         :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>

    <ta-col :span="8"
            v-if="label=='融合'">
      <ta-form-item :label="label+'结论'"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :require="{message:'请填写'+label+'结论'}"
                    fieldDecoratorId="ajax1908">
        <ta-select :placeholder="basedisabled?'':'请选择'+label+'结论'"
                   :disabled="basedisabled">

          <ta-select-option :key="3"
                            v-if="label=='融合'"
                            :value="'1'">融合成功</ta-select-option>
          <ta-select-option :key="4"
                            v-if="label=='融合'"
                            :value="'0'">融合失败</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>

    <ta-col :span="8"
            v-else>
      <ta-form-item :label="label+'结论'"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    :require="{message:'请填写'+label+'结论'}"
                    fieldDecoratorId="ajax1908">
        <ta-select :placeholder="basedisabled?'':'请选择'+label+'结论'"
                   :disabled="basedisabled">
          <ta-select-option :key="1"
                            v-if="label=='评估'"
                            :value="'1'">符合收养条件</ta-select-option>
          <ta-select-option :key="2"
                            v-if="label=='评估'"
                            :value="'0'">不符合收养条件</ta-select-option>

        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item :label="label+'小组负责人'"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    fieldDecoratorId="ajax1904"
                    :fieldDecoratorOptions="verificationRulesNotMustFill(label+'小组负责人',32)">
        <ta-input :disabled='basedisabled'
                  :placeholder="basedisabled?'':'请输入'+label+'小组负责人'" />
      </ta-form-item>
    </ta-col>

    <ta-col :span="24">
      <ta-form-item :label="label+'小组成员'"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="ajax1905"
                    :fieldDecoratorOptions="verificationRulesNotMustFill(label+'小组成员',100,true)">
        <ta-textarea :placeholder="!basedisabled?label+'小组成员':''"
                     :rows="3"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item :label="label+'访谈记录'"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="ajax1906"
                    :fieldDecoratorOptions="verificationRulesNotMustFill(label+'访谈记录',200,true)">
        <ta-textarea :placeholder="!basedisabled?label+'访谈记录':''"
                     :rows="3"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item :label="label+'机构意见'"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="ajax1907"
                    :fieldDecoratorOptions="verificationRulesNotMustFill(label+'机构意见',200,true)">
        <ta-textarea :placeholder="!basedisabled?label+'机构意见':''"
                     :rows="3"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if="label=='评估'">
      <ta-form-item :label="'是否有抚养、教育和保护被收养人的能力'"
                    fieldDecoratorId="ajax1911"
                    :labelCol="{span:6}"
                    :wrapperCol="{span:18}">
        <ta-radio-group :disabled="basedisabled">
          <ta-radio v-for="(item,index) in yesNoList"
                    :key="index"
                    :value="item.value">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if="label=='评估'">
      <ta-form-item :label="'是否患有医学上认为不应当收养子女的疾病'"
                    fieldDecoratorId="ajax1912"
                    :labelCol="{span:6}"
                    :wrapperCol="{span:18}">
        <ta-radio-group @change="onChange1"
                        :disabled="basedisabled">
          <ta-radio v-for="(item,index) in yesNoList"
                    :key="index"
                    :value="item.value">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if="label=='评估' && isshow1">
      <ta-form-item label="附件上传"
                    fieldDecoratorId="XXX"
                    :require="{message:'请上传附件!'}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="{functionalType: 'f1'}"
                   :multiple="true"
                   :action="action"
                   :fileList="fileList1"
                   @change="filechange1"
                   :beforeUpload="beforeUpload"
                   @preview="preview">
          <ta-button :disabled="basedisabled">
            <ta-icon type="upload" />上传文件
          </ta-button>
        </ta-upload>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if="label=='评估'">
      <ta-form-item :label="'是否有不利于被收养人健康成长的违法犯罪记录'"
                    fieldDecoratorId="ajax1913"
                    :labelCol="{span:6}"
                    :wrapperCol="{span:18}">
        <ta-radio-group @change="onChange2"
                        :disabled="basedisabled">
          <ta-radio v-for="(item,index) in yesNoList"
                    :key="index"
                    :value="item.value">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24"
            v-if="label=='评估' && isshow2">
      <ta-form-item label="附件上传"
                    fieldDecoratorId="XX"
                    :require="{message:'请上传附件!'}">
        <ta-input hidden />
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="{functionalType: 'f2'}"
                   :multiple="true"
                   :action="action"
                   :fileList="fileList2"
                   @change="filechange2"
                   :beforeUpload="beforeUpload"
                   @preview="preview">
          <ta-button :disabled="basedisabled">
            <ta-icon type="upload" />上传文件
          </ta-button>
        </ta-upload>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label='备注'
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}"
                    fieldDecoratorId="ajax1909"
                    :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
        <ta-textarea :placeholder="!basedisabled?'请输入备注':''"
                     :rows="3"
                     :disabled="basedisabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="附件上传"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="{functionalType: 'f0'}"
                   :multiple="true"
                   :action="action"
                   :fileList="fileList"
                   @change="filechange"
                   :beforeUpload="beforeUpload"
                   @preview="preview">
          <ta-button :disabled="basedisabled">
            <ta-icon type="upload" />上传文件
          </ta-button>
        </ta-upload>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <processingInformation></processingInformation>
    </ta-col>
  </ta-row>
</template>
<script>
import moment from 'moment'
import processingInformation from './processingInformation'
export default {
  props: ['label', 'basedisabled', 'yesNoList'],
  data () {
    return {
      fileList1: [],
      fileList2: [],
      isshow1: false,
      isshow2: false,

      fileList: [] // 附件
    }
  },
  components: {
    processingInformation
  },
  activated () {
    this.initDatas()
  },
  mounted () {

  },

  methods: {

    initDatas () {
      if (this.label == '融合') {

      } else {
        this.isshow2 = false
        this.isshow1 = false
        this.fileList1 = []
        this.fileList2 = []
      }
      this.fileList = []
    },
    onChange1 (e) {
      if (e.target.value == '0') {
        this.isshow1 = true
      } else {
        this.fileList1 = []
        this.isshow1 = false
      }
    },
    onChange2 (e) {
      if (e.target.value == '0') {
        this.isshow2 = true
      } else {
        this.fileList2 = []
        this.isshow2 = false
      }
    },

    filechange1 (info) {
      if (info.file.status === 'uploading') {
        this.fileList1 = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.basedisabled) {
          return false
        }
        this.fileList1 = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList1 = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList1 = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    // 上传
    filechange2 (info) {
      if (info.file.status === 'uploading') {
        this.fileList2 = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.basedisabled) {
          return false
        }
        this.fileList2 = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList2 = info.fileList

          this.$message.success('文件上传成功!')
        } else {
          this.fileList2 = []
          this.$message.error('文件上传失败!')
        }
      }
    },

    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.basedisabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) { this.downloadFile(file) },
    handleRemove (e) {
      if (this.basedisabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
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
      return current && current > moment().endOf('day')
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
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
.icons {
  margin: 0 7px 0 24px;
}
</style>
