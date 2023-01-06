<template>
  <ta-row class="fromcom">
    <!-- <ta-col :span="8">
      <ta-form-item label="儿童编号" fieldDecoratorId="childNumber">
        <ta-input :disabled="true" placeholder="请输入儿童编号" />
      </ta-form-item>
      <ta-form-item label="儿童姓名" fieldDecoratorId="name" :fieldDecoratorOptions="rules.name">
        <ta-input :disabled="disabled" placeholder="请输入儿童姓名" />
      </ta-form-item>
      <ta-form-item label="性别" fieldDecoratorId="sex" :fieldDecoratorOptions="rules.sex">
        <ta-select allowClear :disabled="true" placeholder="请选择性别">
          <ta-select-option
            v-for="item in sexList"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item
        label="申请日期"
        fieldDecoratorId="applicationTime"
        :fieldDecoratorOptions="rules.applicationTime"
      >
        <ta-date-picker style="width: 100%;" :disabled="disabled" placeholder="请选择申请日期" />
      </ta-form-item>
      <ta-form-item
        label="户籍性质"
        fieldDecoratorId="censusRegister"
        :fieldDecoratorOptions="householdRegistryClassifyhide?rules.censusRegister:{}"
      >
        <ta-select allowClear :disabled="householdRegistryClassifydisabled" placeholder="请选择户籍性质">
          <ta-select-option
            v-for="item in censusRegisterList"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>
    <ta-col :span="8">
      <ta-form-item
        label="身份证号"
        fieldDecoratorId="idCard"
        :fieldDecoratorOptions="householdRegistryClassifyhide?rules.idCard:rules.idCard2"
      >
        <ta-input :disabled="idcarddisabled" placeholder="请输入身份证号" @blur="idcardchange" />
      </ta-form-item>
      <ta-form-item
        label="出生日期"
        fieldDecoratorId="birthday"
        :fieldDecoratorOptions="rules.birthday"
      >
        <ta-date-picker style="width: 100%;" :disabled="true" placeholder="请选择出生日期" />
      </ta-form-item>
      <ta-form-item label="民族" fieldDecoratorId="nation" :fieldDecoratorOptions="rules.nation">
        <ta-select allowClear :disabled="disabled" placeholder="请选择民族">
          <ta-select-option
            v-for="item in nationList"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item
        label="户口分类"
        fieldDecoratorId="householdRegistryClassify"
        :fieldDecoratorOptions="rules.householdRegistryClassify"
      >
        <ta-select
          allowClear
          :disabled="disabled"
          placeholder="请选择户口分类"
          @change="householdRegistryClassifychange"
        >
          <ta-select-option
            v-for="item in householdclassificationList"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
    </ta-col>-->
    <ta-col :span="20">
      <ta-col :span="8">
        <ta-form-item label="儿童编号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="childNumber">
          <ta-input :disabled="true"
                    placeholder="请输入儿童编号" />
        </ta-form-item>
        <ta-form-item label="儿童姓名"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name">
          <ta-input :disabled="disabled"
                    placeholder="请输入儿童姓名" />
        </ta-form-item>
        <ta-form-item label="性别"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="sex"
                      :fieldDecoratorOptions="rules.sex">
          <ta-select allowClear
                     :disabled="true"
                     placeholder="请选择性别">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorOptions="householdRegistryClassifyhide?rules.idCard:rules.idCard2">
          <ta-input :disabled="idcarddisabled"
                    placeholder="请输入身份证号"
                    @blur="idcardchange" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="birthday"
                      :fieldDecoratorOptions="rules.birthday">
          <ta-date-picker style="width: 100%;"
                          :disabled="true"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="民族"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="nation"
                      :fieldDecoratorOptions="rules.nation">
          <ta-select allowClear
                     :disabled="disabled"
                     placeholder="请选择民族">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="申请日期"
                      fieldDecoratorId="applicationTime"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      :fieldDecoratorOptions="rules.applicationTime">
          <ta-date-picker style="width: 100%;"
                          :disabled="disabled"
                          placeholder="请选择申请日期" />
        </ta-form-item>
        <ta-form-item label="户籍性质"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="censusRegister"
                      :fieldDecoratorOptions="householdRegistryClassifyhide?rules.censusRegister:{}">
          <ta-select allowClear
                     :disabled="householdRegistryClassifydisabled"
                     placeholder="请选择户籍性质">
            <ta-select-option v-for="item in censusRegisterList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="户口分类"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      fieldDecoratorId="householdRegistryClassify"
                      :fieldDecoratorOptions="rules.householdRegistryClassify">
          <ta-select allowClear
                     :disabled="disabled"
                     placeholder="请选择户口分类"
                     @change="householdRegistryClassifychange">
            <ta-select-option v-for="item in householdclassificationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="4">
      <div class="uploadimg">
        <img v-if="imageUrl"
             :src="imageUrl" />
        <ta-upload :withCredentials="true"
                   name="file"
                   :action="action"
                   :showUploadList="false"
                   :data="adoption"
                   @preview="preview"
                   :fileList="imglist"
                   :limit="1"
                   @change="adoptionfileChange"
                   :beforeUpload="beforeUpload">
          <ta-button :disabled="disabled"
                     :ghost="true"
                     type="primary">上传照片</ta-button>
        </ta-upload>
      </div>
    </ta-col>
    <ta-col :span="20">
      <ta-col :span="16">
        <AddressComponent :addressmodel="addressChildModel"
                          :msg="'户籍所在地'"
                          :disabled="householdRegistryClassifydisabled"
                          :isRequire="!householdRegistryClassifydisabled"
                          arealevel="5"
                          :labelwidth="labelwidth"
                          fileldName="censusRegisterp"
                          @setaddress="setChildAddress"></AddressComponent>
      </ta-col>
      <ta-col :span="5">
        <ta-form-item label
                      fieldDecoratorId="censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 23,offset:1 }">
          <ta-input placeholder="请输入详细地址"
                    :disabled="householdRegistryClassifydisabled" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="3">
        <ta-form-item label
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 24 }">
          <ta-button class="sanmebutton"
                     :disabled="householdRegistryClassifydisabled"
                     @click="likeaddress">
            <ta-icon type="switcher" />
            <span>同现住址</span>
          </ta-button>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <!-- v-show="issameaddress!=1" -->
    <ta-col :span="20">
      <template>
        <ta-col :span="16">
          <AddressComponent :labelwidth="labelwidth"
                            :disabled="disabled"
                            :addressmodel="addressChildModelNow"
                            :msg="'现住址'"
                            fileldName="currentAddress"
                            @setaddress="setChildAddress1"
                            arealevel="5"></AddressComponent>
        </ta-col>
        <ta-col :span="8">
          <ta-form-item label
                        fieldDecoratorId="currentAddressDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 23,offset:1 }">
            <ta-input placeholder="请输入详细地址"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>
      </template>
    </ta-col>
    <!-- <ta-col :span="24">
        <ta-form-item label="是否地址一致" fieldDecoratorId='sameAddress'
        :fieldDecoratorOptions="{initialValue: '0'}"
         :labelCol="{ span: 2 }" :wrapperCol="{ span: 9 }">
          <ta-radio-group :options="sameaddress" @change="radiochange"  :disabled="householdRegistryClassifydisabled" />
        </ta-form-item>
    </ta-col>-->
  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    AddressComponent
  },
  props: {
    addressChildModel: {
      type: Array,
      required: true
    },
    addressChildModelNow: {
      type: Array,
      required: true
    },
    imglist: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    householdRegistryClassifyhide: {
      type: Boolean,
      required: true
    },
    householdRegistryClassifydisabled: {
      type: Boolean,
      required: true
    },
    idcarddisabled: {
      type: Boolean,
      required: true
    },
    issameaddress: {
      type: String,
      required: false
    },
    imageUrl: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      // imageUrl: '',
      labelwidth: {
        label: 3,
        wrapper: 21
      },
      loading: false,
      filed: '',
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      censusRegisterList: [], // 户籍性质字典数据
      delVisible: false, // 文件上传的删除按钮显示
      householdclassificationList: [],
      adoption: {
        // 头像上传的参数
        busiType: '47', // 头像
        functionalType: '1'
      },
      headImgId: '', // 上传的头像id
      sameaddress: [],
      rules: {
        name: this.verificationRules('姓名', 72),
        sex: this.verificationRules('性别'),
        nation: this.verificationRules('民族'),
        applicationTime: this.verificationRules('申请日期', true),
        birthday: this.verificationRules('出生日期', true),
        censusRegister: this.verificationRules('户籍性质'),
        householdRegistryClassify: this.verificationRules('户口分类'),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: {
          validateTrigger: 'blur',
          rules: [{ validator: this.idcardrole }]
        }
      }
    }
  },
  mounted () {
    this.getMenuDatas()
    this.getyesno()
  },
  methods: {
    beforeUpload (file) {
      const typelist = ['image/jpeg', 'image/png']
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
    likeaddress () {
      this.$emit('likeaddress')
    },
    householdRegistryClassifychange (val) {
      console.log(val)
      const householdRegistryClassifyhide =
        val != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
      // 无户口触发
      this.$emit('householdRegistryClassifychange', val)
      // householdRegistryClassifydisabled
      this.$emit(
        'update:householdRegistryClassifydisabled',
        !householdRegistryClassifyhide
      )
      this.$emit(
        'update:householdRegistryClassifyhide',
        householdRegistryClassifyhide
      )
    },
    adoptionfileChange (info) {
      const arr = []
      arr.push(info.fileList[info.fileList.length - 1])
      if (info.file.status === 'uploading') {
        this.$emit('update:imglist', arr)
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.$emit('update:imglist', arr)
      }
      if (info.file.status === 'done') {
        // if (info.file.response.errors && info.file.response.errors.length != 0) {
        //   this.$message.error('上传失败')
        //   this.imglist.splice(-1, 1)
        //   return false
        // }
        // 上传成功
        const returnFileIds = info.fileList[0].response.data.data.fileid
        this.$emit('update:imageUrl', window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds)
        // this.post('/file/getFileUrls', {
        //   returnFileIds: returnFileIds
        // }).then(res => {
        //   if (res.data) {
        //     this.$emit('update:imageUrl', window.faceConfig.basePath + res.data.fileUrlList[0])
        //   }
        // })
        this.$emit('update:imglist', arr)
        this.$message.success('文件上传成功!')
      }
    },
    async getyesno () {
      const data = await this.getDictionaries('YESNO')
      this.sameaddress = data
    },
    radiochange (val) {
      console.log(val)
      // this.$emit('update:womenaddressmodel', [])
      // this.issameaddress = val.target.value
      this.$emit('update:issameaddress', val.target.value)
      this.$emit('radiochange')
    },
    idcardchange (value) {
      const val = value.target.value
      const _IDRe18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      const _IDre15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
      // 校验身份证：
      if (!val || val == '') {
        return false
      }
      if (_IDRe18.test(val) || _IDre15.test(val)) {
        this.$emit('idcardchanges', val)
      }
    },
    async idcardrole (rule, value, callback) {
      const _IDRe18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      const _IDre15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
      // 校验身份证：
      if (!value || value == '') {
        callback()
        return false
      }
      if (_IDRe18.test(value) || _IDre15.test(value)) {
        callback()
      } else {
        callback('请输入正确的身份证格式')
      }
    },
    preview (file) {
      this.downloadFile(file)
    },
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('CENSUSREGISTER', 'censusRegisterList') // 获取户籍性质字典数据
      this.getMenu('HOUSEHOLDREGISTRYCLASSIFY', 'householdclassificationList') // 户口分类 HOUSEHOLDREGISTRYCLASSIFY
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 地址传值
    setChildAddress () {
      this.$emit('setChildAddress')
    },
    setChildAddress1 () {
      this.$emit('setChildAddress1')
    },
    // 健康状况传值
    setChildHeaths () {
      this.$emit('setChildHeaths')
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>
<style scoped lang="less">
.uploadimg {
  width: 100%;
  //   height: 220px;
  height: 188px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  //   margin-top: 32px;
}
.uploadimg img {
  max-width: 160px;
  max-height: 136px;
}
.radios /deep/ .ant-radio-wrapper {
  margin-right: 9%;
}
.radios /deep/ .ant-radio-wrapper:nth-child(4) {
  margin-right: 0;
}

.add_contract {
  width: 80%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  margin-top: 30px;
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
.divClass {
  padding: 20px;
}
.adreementImg img {
  width: 120px;
}
.sanmebutton {
  width: 100%;
  color: rgba(24, 144, 255, 0.85);
  background: rgba(240, 242, 245, 1);
  border-left: 0;
}
.sanmebutton span {
  margin-left: 10px;
}
.sanmebutton[disabled] {
  color: rgba(0, 0, 0, 0.7);
}
// .sanmebutton:hover{
//   color:rgba(0, 0, 0, 0.7);
// }
</style>
