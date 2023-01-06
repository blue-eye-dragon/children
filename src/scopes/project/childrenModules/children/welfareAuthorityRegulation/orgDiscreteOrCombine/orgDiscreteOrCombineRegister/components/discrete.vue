<template>
  <ta-row class="fromcom">
    <ta-col :span="12">
      <ta-form-item label="原机构名称"
                    fieldDecoratorId="orgName"
                    :require="{message:'请选择机构名称'}">
        <ta-select placeholder="请选择机构名称"
                   @change="orgNameChange"
                   :disabled="disabled">
          <ta-select-option :value="item.orgName"
                            v-for="(item,index) in orgNameList"
                            :key="index">{{item.orgName}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="12">
      <ta-form-item label="申办人"
                    :fieldDecoratorOptions="this.verificationRules('申办人',72)"
                    fieldDecoratorId="applicant">
        <ta-input placeholder="请输入申办人"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <div v-for="(i,e) in titleArry"
           :key='e'>
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">分立机构{{e+1}}</p>
          <div class="horizontalline"></div>
          <div v-if="!disabled">
            <div class="addBtn cursors"
                 @click="addOrg"
                 v-if="e==titleArry.length-1">+</div>
            <div class="addBtn cursors"
                 @click="subtractOrg(e)"
                 v-if="titleArry.length !='1'">-</div>
          </div>
        </div>
        <!-- <ta-form
            layout="horizontal"
            :autoFormCreate="(discreteOrg)=>{this.discreteOrg = discreteOrg}">
            </ta-form> -->
        <ta-form-item :fieldDecoratorId="fieldDecoratorIdName">
          <ta-col :span="12">
            <ta-form-item label="分立机构名称"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16}"
                          :fieldDecoratorId='"branchName" + e'
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入分立机构名称' },{ max: 72, message: '最大输入72个字符' }]}">
              <ta-input placeholder="请输入分立机构名称"
                        :disabled="disabled" />
            </ta-form-item>
            <AddressComponent msg="所在区域"
                              :ishide="ishide"
                              :disabled="disabled"
                              :labelwidth="{ label: 8, wrapper: 16}"
                              :fileldName='"address_Linkage"+e'
                              :addressmodel="addreslistsmodel[e]"
                              @setaddress="actualAddress(e)"
                              types="1"></AddressComponent>
            <!-- :addressmodel ='"actualAreaAddressmodel" + i' -->
            <ta-form-item label="占地面积(㎡)"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16}"
                          :fieldDecoratorId='"areaCovered"+e'
                          :require="{message:'请输入占地面积'}">
              <!-- <ta-input placeholder="请输入占地面积"
                    :disabled="disabled"/> -->
              <ta-input-number :disabled="disabled"
                               :min="0"
                               :max='999999.99'
                               :precision="2"
                               placeholder="请输入占地面积"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="分立日期"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16}"
                          :fieldDecoratorId='"branchDate" +e'
                          :require="{message:'请选择分立日期'}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="disabled"
                              :disabledDate="disabledDate"
                              placeholder="请选择分立日期" />
            </ta-form-item>
            <ta-form-item label="具体地址"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16}"
                          :fieldDecoratorId='"address" + e'
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入具体地址' },{ max: 100, message: '最大输入100个字符' }]}">
              <ta-input placeholder="请输入具体地址"
                        :disabled="disabled" />
            </ta-form-item>
            <ta-form-item label="资金来源"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16}"
                          :fieldDecoratorId='"sourceOfFunds" + e'
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入资金来源' },{ max: 100, message: '最大输入100个字符' }]}">
              <ta-input placeholder="请输入资金来源"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-form-item>
      </div>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="附件上传"
                    :labelCol="{span:3}"
                    :wrapperCol="{span:21}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :multiple="true"
                   :action="action"
                   :data="others"
                   :fileList="othersfileList"
                   :beforeUpload="beforeUpload"
                   @preview="preview"
                   @remove="handleRemove('othersfileList',$event)"
                   @change="handleChangeOthers">
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
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      others: {
        functionalType: '3',
        busiType: '35'
      },
      titleNum: 1,
      // titleArry: [1],
      fieldDecoratorIdName: ''
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    othersfileList: {
      type: Array
    },
    ishide: {
      type: Boolean,
      default: true
    },
    titleArry: {
      type: Array,
      required: true
    },
    addreslistsmodel: {
      type: Array,
      required: true
    },
    orgNameList: {
      type: Array,
      required: true
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {

    disabledDate (current) {
      return current > moment().endOf('day')
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeOthers (info) {
      if (info.file.status === 'uploading') {
        // this.otherfileList = info.fileList
        this.$emit('update:othersfileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        // this.otherfileList = info.fileList
        this.$emit('update:othersfileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.othersfileList.splice(-1, 1)
          return false
        }
        this.othersfileList = info.fileList
        // this.otherfileList = info.fileList
        this.$emit('update:othersfileList', info.fileList)
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
    setaddress () {
      this.$emit('setaddress')
    },
    actualAddress (e) {
      this.$emit('actualAddress', e)
    },
    orgNameChange (val) {
      let orgId
      this.orgNameList.map(item => {
        if (item.orgName == val) {
          orgId = item.orgId
          this.$emit('getOrgId', orgId)
        }
      })
    },
    addOrg () {
      this.titleNum++
      this.titleArry.push(this.titleNum)
      this.fieldDecoratorId = 'WelfareOrgBranch' + this.titleNum
      this.$emit('upload:titleArry', this.titleArry)
    },
    subtractOrg (index) {
      this.titleArry.splice(index, 1)

      this.$emit('upload:titleArry', this.titleArry)
    }
  }
}
</script>
<style scoped>
textarea {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.7);
}
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
  width: calc(100% - 170px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
/* .item_title img {
  width: 18px;
  height: 18px;
} */
.addBtn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  line-height: 11px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #ccc;
  color: #1890ff;
  float: left;
  margin-right: 5px;
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
