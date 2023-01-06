<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="12">
        <ta-form-item label="选择要合并的机构"
                      fieldDecoratorId="orgName">
          <ta-select placeholder="请选择机构名称"
                     mode="multiple"
                     style="width:80%"
                     :disabled="disabled">
            <ta-select-option :value="item.orgName"
                              v-for="(item,index) in orgNameList"
                              :key="index">{{item.orgName}}</ta-select-option>
          </ta-select>
          <ta-button type="primary"
                     @click="conditionSearch()"
                     style="margin-left:10px">添加</ta-button>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="申办人"
                      fieldDecoratorId="applicant"
                      :fieldDecoratorOptions="this.verificationRules('申办人',72)">
          <ta-input placeholder="请输入申办人"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="已选择机构"
                      :labelCol="{span:3}"
                      :wrapperCol="{span:21}"
                      fieldDecoratorId="aaaaaa"
                      :validateStatus='!isorgSelected?"error":""'
                      :help='!isorgSelected?"请选择机构":""'
                      :required="true">
          <div class="chosechild"
               :disabled="disabled">
            <div v-for="(item,index) in orgSelected"
                 :key="index"
                 :value="item.id"
                 class="children">
              {{item.orgName}}
              <ta-popconfirm title="确定删除吗?"
                             @confirm="del(item)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <ta-icon class="dels"
                         :hidden='disabled'
                         type="close" />
              </ta-popconfirm>
            </div>
          </div>
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="合并后机构名称"
                      fieldDecoratorId="mergeName"
                      :fieldDecoratorOptions="this.verificationRules('合并后机构名称',72)">
          <ta-input placeholder="请输入合并后机构名称"
                    :disabled="disabled" />
        </ta-form-item>
        <AddressComponent msg="所在区域"
                          :ishide="ishide"
                          :disabled="disabled"
                          @setaddress="actualAddress"
                          types="1"
                          :addressmodel="combinAddressmodel"></AddressComponent>
        <ta-form-item label="占地面积(㎡)"
                      fieldDecoratorId="areaCovered"
                      :require="{message:'请输入占地面积'}">
          <!-- <ta-input placeholder="请输入占地面积" :disabled="disabled"/> -->
          <ta-input-number :disabled="disabled"
                           :min="0"
                           :max='99999'
                           placeholder="请输入占地面积"
                           style="width:100%" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="合并日期"
                      fieldDecoratorId="mergeDate"
                      :require="{message:'请选择合并日期'}">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="disabled"
                          :disabledDate="disabledDate"
                          placeholder="请选择合并日期" />
        </ta-form-item>
        <ta-form-item label="具体地址"
                      fieldDecoratorId="address"
                      :fieldDecoratorOptions="this.verificationRules('具体地址',100)">
          <ta-input placeholder="请输入具体地址"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="资金来源"
                      fieldDecoratorId="sourceOfFunds"
                      :fieldDecoratorOptions="this.verificationRules('资金来源',100)">
          <ta-input placeholder="请输入资金来源"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="附件上传"
                      :labelCol="{span:3}"
                      :wrapperCol="{span:21}">
          <ta-upload :withCredentials="true"
                     name="file"
                     :action="action"
                     :data="othersData"
                     :fileList="others2fileList"
                     :beforeUpload="beforeUpload"
                     @preview="preview"
                     @remove="handleRemove('others2fileList',$event)"
                     @change="handleChangeOthers2">
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
  </div>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      othersData: {
        functionalType: '3',
        busiType: '35-35'
      }
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    ishide: {
      type: Boolean,
      default: true
    },
    combinAddressmodel: {
      type: Array,
      required: true
    },
    orgNameList: {
      type: Array,
      required: true
    },
    orgSelected: {
      type: Array,
      required: true
    },
    isorgSelected: {
      type: Boolean,
      required: true
    },
    others2fileList: {
      type: Array
    }
  },
  methods: {

    disabledDate (current) {
      return current > moment().endOf('day')
    },
    conditionSearch () {
      this.$emit('conditionSearch')
    },
    setaddress () {
      this.$emit('setaddress')
    },
    actualAddress () {
      this.$emit('actualAddress')
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleChangeOthers2 (info) {
      console.log('chans')
      console.log(info)
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        // this.otherfileList = info.fileList
        this.$emit('update:others2fileList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.filedisabled) {
          return false
        }
        console.log(info.file.status)
        // this.otherfileList = info.fileList
        this.$emit('update:others2fileList', info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.others2fileList.splice(-1, 1)
          return false
        }
        this.others2fileList = info.fileList
        // 上传成功
        // this.otherfileList = info.fileList
        this.$emit('update:others2fileList', info.fileList)
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
    cancel () { },
    del (val) {
      console.log(val)
      this.orgSelected.map((item, index) => {
        if (item == val) {
          this.orgSelected.splice(index, 1)
          this.$emit('delSelectVal', this.orgSelected)
        }
      })
    }
  }
}
</script>
<style scoped>
.chosechild {
  padding: 11px 15px 0 15px;
  /* border: 1px solid rgba(0, 0, 0, 0.14901960784313725); */
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 40px;
  cursor: pointer;
}
.children {
  padding: 0 10px;
  background: rgba(218, 238, 255, 1);
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
  margin-bottom: 11px;
}
</style>
