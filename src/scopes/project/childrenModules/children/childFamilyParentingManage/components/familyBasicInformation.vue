<template>
  <ta-row style="padding: 0 1%;">
    <ta-col :span="24">
      <ta-col :span="8">
        <AddressComponent msg="地址"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"
                          :disabled="disabled"
                          :labelwidth="labelwidth"></AddressComponent>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label
                      :fieldDecoratorOptions="verificationRules('详细地址', 100)"
                      fieldDecoratorId="addr"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input :placeholder="disabled?'':'请输入详细地址'"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="家庭经济年收入（年/元）"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="annualIncome">
          <ta-input-number :min="0"
                           :max="99999999"
                           :precision="2"
                           style="width:100%"
                           :disabled="disabled"
                           :placeholder="!disabled ? '请输入年收入' : ''" />
        </ta-form-item>
      </ta-col>

    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="人均住房面积（m²）"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="housingArea">
          <ta-input-number :min="0"
                           :max="99999999"
                           :precision="2"
                           style="width:100%"
                           :disabled="disabled"
                           :placeholder="!disabled ? '请输入人均住房面积' : ''" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="家庭联系电话"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="familyTel"
                      :fieldDecoratorOptions="verificationRules('家庭联系电话', { type: 'phone' })">
          <ta-input :disabled="disabled"
                    :placeholder="!disabled ? '请输入家庭联系电话' : ''" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="家庭成员有无精神病"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="isMentalDisease"
                      :require="{message:'请选择家庭成员有无精神病'}">
          <ta-input-group compact>
            <ta-select allowClear
                       :placeholder="!disabled?'请选择家庭成员有无精神病':''"
                       @change="getRelation"
                       :disabled="disabled"
                       v-model="valueSelect"
                       :style="{width: valueSelect!=Enum.YESNO.SHI? '100%':'45%'}">
              <ta-select-option v-for="item in yesnoList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
            <!-- mentalDiseaseName -->
            <ta-auto-complete :dataSource="dataSource"
                              v-if="valueSelect==Enum.YESNO.SHI"
                              :disabled="disabled"
                              v-model="valueInput"
                              style="width: 55%;"
                              placeholder="请输入精神病名称" />
          </ta-input-group>
        </ta-form-item>
      </ta-col>

    </ta-col>
    <ta-col :span="24">
      <ta-col :span="8">
        <ta-form-item label="家庭成员有无传染病"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{span:16}"
                      fieldDecoratorId="isInfectiousDiseases"
                      :require="{message:'请选择家庭成员有无传染病'}">
          <ta-input-group compact>
            <ta-select allowClear
                       :placeholder="!disabled?'请选择家庭成员有无传染病':''"
                       @change="getRelation1"
                       :disabled="disabled"
                       v-model="valueSelect1"
                       :style="{width: valueSelect1!=Enum.YESNO.SHI? '100%':'45%'}">
              <ta-select-option v-for="item in yesnoList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
            <!-- infectiousDiseasesName -->
            <ta-auto-complete :dataSource="dataSource"
                              v-if="valueSelect1==Enum.YESNO.SHI"
                              :disabled="disabled"
                              v-model="valueInput1"
                              style="width: 55%;"
                              placeholder="请输入传染病名称" />
          </ta-input-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="家庭成员有无犯罪记录"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="isCriminalRecord"
                      :require="{ message: '请选择家庭成员有无犯罪记录' }">
          <ta-select :disabled="disabled"
                     :placeholder="!disabled ? '请选择家庭成员有无犯罪记录' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in yesnoList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="上传"
                    class="upload">
        <ta-upload :withCredentials="true"
                   name="file"
                   :multiple="true"
                   listType="picture"
                   class="upload-list-inline"
                   :action="action"
                   :disabled="disabled"
                   :fileList="fileList"
                   @remove="handleRemove"
                   @preview="preview"
                   :data="fileData('9','fileList')"
                   :beforeUpload="beforeUpload"
                   @change="filechange">
          <ta-button>
            <ta-icon type="upload" /> 上传文件
          </ta-button>
        </ta-upload>

      </ta-form-item>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
export default {
  props: ['addressmodel', 'disabled'],
  components: {
    AddressComponent
  },
  data () {
    return {
      labelwidth: {
        label: 8,
        wrapper: 16
      },
      valueSelect: null, // 家庭成员有无传染病下拉框数据
      valueInput: '', // 家庭成员有无传染病其他输入框数据
      valueSelect1: null, // 家庭成员有无犯罪记录下拉框数据
      valueInput1: '', // 家庭成员有无犯罪记录其他输入框数据
      dataSource: [],

      fileList: [],

      yesnoList: [] // 是否字典数据
    }
  },
  activated () {
    this.valueSelect = null
    this.valueInput = ''
    this.valueSelect1 = null
    this.valueInput1 = ''
  },
  mounted () {
    this.getMenuDatas()
  },
  updated () {
    this.setLabelAndWrapperWidth('11.1%', '88.9%', 'upload') // 单独一行字段宽度控制
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.yesnoList = await this.getDictionaries('YESNO') // 是否字典数据
    },
    // 选择家庭成员有无精神病
    getRelation (e) {
      this.valueSelect = e
    },
    // 选择家庭成员有无传染病
    getRelation1 (e) {
      this.valueSelect1 = e
    },
    // 设置地址
    setaddress () {
      this.$emit('setaddress', this.addressmodel)
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
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
      if (this.disabled) {
        return false
      }
      let fileId = e.response.data.data.fileid
      let _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    valueInput: function (newval, oldval) {
      this.$emit('setErrorMessage', newval, 'isMentalDisease')
    },
    valueSelect: function (newval, oldval) {
      if (newval != this.Enum.YESNO.SHI) {
        this.$emit('setErrorMessage', '1', 'isMentalDisease')
      } else {
        this.$emit('setErrorMessage', this.valueInput, 'isMentalDisease')
      }
    },
    valueInput1: function (newval, oldval) {
      this.$emit('setErrorMessage', newval, 'isInfectiousDiseases')
    },
    valueSelect1: function (newval, oldval) {
      if (newval != this.Enum.YESNO.SHI) {
        this.$emit('setErrorMessage', '1', 'isInfectiousDiseases')
      } else {
        this.$emit('setErrorMessage', this.valueInput1, 'isInfectiousDiseases')
      }
    }
  }
}
</script>
<style scoped>
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
