<template>
  <ta-row style=" height: 246px;"
          class="fromcom">
    <ta-col :span="5">
      <ta-form-item label="儿童姓名"
                    fieldDecoratorId="name"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }">
        <ta-input :disabled="disabled" />
      </ta-form-item>

      <ta-form-item label="健康状况"
                    fieldDecoratorId="healthCondition"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }">
        <ta-select allowClear
                   :placeholder="''"
                   :disabled="disabled">
          <ta-select-option v-for="item in healthList"
                            :key="item.value"
                            :value="item.value">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="登记日期"
                    fieldDecoratorId="registrationDate"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }">
        <ta-date-picker style="width: 110%;"
                        :placeholder="''"
                        :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="6">
      <ta-form-item label="出生日期"
                    fieldDecoratorId="birth"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }">
        <ta-date-picker style="width: 100%;"
                        :placeholder="''"
                        :disabled="disabled" />
      </ta-form-item>
      <ta-form-item label="身份证号"
                    fieldDecoratorId="idCard"
                    :labelCol="{ span: 10 }"
                    :wrapperCol="{ span: 14 }">
        <ta-input :placeholder="''"
                  :disabled="disabled" />
      </ta-form-item>
    </ta-col>
    <ta-col :span="4">
      <ta-form-item label="性别"
                    fieldDecoratorId="sex"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{ span: 15 }">
        <ta-select allowClear
                   :placeholder="''"
                   :disabled="disabled">
          <ta-select-option v-for="item in sexList"
                            :key="item.value"
                            :value="item.value">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="民族"
                    fieldDecoratorId="nation"
                    :labelCol="{ span: 9 }"
                    :wrapperCol="{ span: 15 }">
        <ta-select allowClear
                   :placeholder="''"
                   :disabled="disabled">
          <ta-select-option v-for="item in nationList"
                            :key="item.value"
                            :value="item.value">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>

      <!--
      <Health
        fileldName="healthCondition"
        :disabled="disabled"
        :clearPlaceHolder="true"
        :isRequire="false"
        :heathmodel="heathModel"
        :labelwidth="{label: 10, wrapper: 14}"
        @setheath="setHeaths"
      ></Health> -->

    </ta-col>
    <ta-col :span="4">

    </ta-col>
    <ta-col :span="8">
      <div class="uploadimg">
        <div class="add_contract">
          <div style="height:100%">
            <img v-if="imageUrl"
                 style="height:100%"
                 :src="imageUrl" />
          </div>
        </div>
        <ta-upload :withCredentials="true"
                   name="file"
                   class="avatar-uploader"
                   :action="actionUrl"
                   :showUploadList="false"
                   :data="adoption"
                   :fileList="fileList"
                   :limit="1"
                   :beforeUpload="beforeUploadImg"
                   @preview="preview"
                   @change="handleChange">
          <ta-button :disabled="disabled">上传头像</ta-button>
        </ta-upload>
      </div>
    </ta-col>

    <ta-col :span="16"
            style="top: -63px;">
      <ta-col :span="12">
        <AddressComponent :addressmodel="addressmodel"
                          :msg="'户籍地址'"
                          :isRequire="false"
                          :disabled="disabled"
                          :labelwidth="{label: 6,wrapper: 18}"
                          fileldName="censusRegisterDatas"
                          :clearPlaceHolder="true"
                          @setaddress="setaddress"></AddressComponent>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label
                      fieldDecoratorId="censusRegisterAddr"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input placeholder
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="16"
            style="top: -73px;">
      <ta-col :span="12">
        <AddressComponent :addressmodel="addressmodelNow"
                          :msg="'现住地址'"
                          :isRequire="false"
                          :labelwidth="{label: 6,wrapper: 18}"
                          fileldName="currentAddressDatas"
                          @setaddress="setaddress"
                          :clearPlaceHolder="true"
                          :disabled="disabled"></AddressComponent>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label
                      fieldDecoratorId="livingAddr"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input :placeholder="''"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-col>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import Health from '@/scopes/project/common/components/health'
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    AddressComponent,
    Health
  },
  props: ['addressmodel', 'addressmodelNow', 'heathModel'],
  data () {
    return {
      healthList: [],
      imageUrl: 'static/img/defalimg.png',
      disabled: true,

      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      engineeringSituationList: [], // 工学情况字典数据

      adoption: {
        // 头像上传的参数
        busiType: '13', // 头像
        functionalType: '2'
      },
      fileList: [], // 文件列表
      upLoadPathIds: []
    }
  },
  activated () {
    this.fileList = []
    this.imageUrl = 'static/img/defalimg.png'
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('WORKSTUDY', 'engineeringSituationList') // 获取工学情况字典数据
      this.getMenu('HEALTH', 'healthList') // 获取工学情况字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    idCardValid (rule, value, callback) {
      let _self = this
      this.idCardValidate(rule, value, callback, _self)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.$emit('setBirthAndAgeByIdCard', sex, age, birth)
    },
    // 地址传值
    setaddress () {
      this.$emit('setaddress')
    },
    // 健康状况传值
    setHeaths () {
      this.$emit('setHeaths')
    },
    // 上传
    handleChange (info) {
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
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl
            this.loading = false
          })
          this.fileList = info.fileList
          this.upLoadPathIds.push(info.file.response.data.data.fileid)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUploadImg (file) {
      if (this.upLoadPathIds.length > 0) {
        this.$message.error('请删除原有资源图片再进行上传！')
        return false
      }
      let typelist = ['image/jpeg', 'image/png']
      let isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传jpeg、png图片格式')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小大于10M!')
      }
      return isaccord && isLt10M
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) {
      this.downloadFile(file)
    },
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      let _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: e.response.data.data.fileid
      }).then(response => {
        _self.$message.success('资源图片删除成功!')
        _self.upLoadPathIds.splice(
          _self.upLoadPathIds.indexOf(e.response.data.data.fileid),
          1
        )
        _self.upLoadPathIds = []
      }).catch(() => {
        _self.$message.error('资源图片删除失败!')
      })

      _self.imageUrl = 'static/img/defalimg.png'
    }
  },
  computed: {
    actionUrl () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
<style scoped>
.uploadimg {
  width: 200px;
  margin: 0 auto;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}
.add_contract {
  width: 80%;
  height: 65%;
  cursor: pointer;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.add_contract span {
  width: 100%;
  z-index: 1111;
  position: absolute;
  bottom: 0;
  padding: 6px;
  background: #000;
  opacity: 0.7;
  color: #fff;
  display: none;
}
.add_contract:hover span {
  display: block;
}
.avatar-uploader {
  margin-top: 10%;
}
.fontclass {
  float: left;
  font-size: 20px;
  font-weight: 400;
  padding: 10px;
}
</style>
