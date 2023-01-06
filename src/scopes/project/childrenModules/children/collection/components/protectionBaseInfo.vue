<template>
  <ta-row class="fromcom">
    <ta-col :span="18">
      <ta-col :span="8">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                      :fieldDecoratorOptions="this.verificationRules('姓名', 72)">
          <ta-input :disabled="disabled"
                    placeholder="请输入儿童编号" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :fieldDecoratorOptions="rules.birthday"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-date-picker style="width: 100%;"
                          :disabled="disabled" />
          <!-- placeholder="请选择出生日期" -->
        </ta-form-item>
        <ta-form-item label="户口性质"
                      fieldDecoratorId="householdRegistryProperty"
                      :fieldDecoratorOptions="rules.householdRegistryProperty"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select allowClear
                     :disabled="householdRegistryClassifydisabled"
                     placeholder="请选择户籍性质">
            <ta-select-option v-for="item in censusRegisterList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="rules.idCard2"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-input :disabled="idcarddisabled"
                    placeholder="请输入身份证号"
                    @blur="idcardchange" />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :fieldDecoratorOptions="rules.nation"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select allowClear
                     :disabled="disabled"
                     placeholder="请选择民族">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="自身残疾"
                      fieldDecoratorId="isDisabled "
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select :disabled="disabled"
                     placeholder="请选择自身残疾">
            <ta-select-option v-for="item in yesNolist"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :fieldDecoratorOptions="rules.sex"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select allowClear
                     :disabled="disabled">
            <!-- placeholder="请选择性别" -->
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="户口分类"
                      fieldDecoratorId="householdRegistryClassify"
                      :fieldDecoratorOptions="rules.householdRegistryClassify"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select allowClear
                     :disabled="disabled"
                     placeholder="请选择户口分类"
                     @change="householdRegistryClassifychange"
                     :wrapperCol="{ span: 15 }">
            <ta-select-option v-for="item in householdclassificationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="12">
          <AddressComponent :clearPlaceHolder="householdRegistryClassifydisabled"
                            :addressmodel="addressChildModel"
                            :msg="'户籍所在地'"
                            :disabled="householdRegistryClassifydisabled"
                            :isRequire="!householdRegistryClassifydisabled"
                            arealevel="5"
                            :labelwidth="labelwidth"
                            fileldName="censusRegister"
                            @setaddress="setChildAddress"
                            @adsvalchange="likeOut"></AddressComponent>
        </ta-col>
        <ta-col :span="9">
          <ta-form-item label
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        style="margin-left:10px;"
                        :wrapperCol="{ span: 24 }">
            <ta-input @change="likeOut"
                      :placeholder="householdRegistryClassifydisabled?'':'请输入详细地址'"
                      :disabled="householdRegistryClassifydisabled"
                      :fieldDecoratorOptions="rules.censusRegisterDetail" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="3">
          <ta-form-item label="同现住址"
                        fieldDecoratorId="sameAddress"
                        :fieldDecoratorOptions="{initialValue: [ ]}"
                        :labelCol="{ span: 14 }"
                        :wrapperCol="{ span: 10}">
            <ta-checkbox-group :options="sameaddresslist"
                               @change="likeaddress"
                               :disabled="householdRegistryClassifydisabled" />
          </ta-form-item>
        </ta-col>
      </ta-col>

    </ta-col>
    <ta-col :span="6">
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
    <ta-col :span="24">
      <ta-col :span="16">

      </ta-col>
      <ta-col :span="5">

      </ta-col>

    </ta-col>
    <ta-col :span="24">
      <template>
        <ta-col :span="13">
          <AddressComponent :labelwidth="labelwidth2"
                            :disabled="disabled"
                            :addressmodel="addressChildModelNow"
                            :msg="'儿童现住址'"
                            fileldName="currentAddress"
                            @setaddress="setChildAddress1"
                            arealevel="5"
                            @adsvalchange="likeOut"></AddressComponent>
        </ta-col>
        <ta-col :span="10">
          <ta-form-item label
                        style="margin-left:10px;"
                        fieldDecoratorId="currentAddressDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 24 }">
            <ta-input placeholder="请输入详细地址"
                      :disabled="disabled"
                      @change="likeOut"
                      :fieldDecoratorOptions="rules.currentAddressDetail" />
          </ta-form-item>
        </ta-col>
      </template>
    </ta-col>
    <ta-col :span="18">
      <ta-form-item label="安置照料原因"
                    fieldDecoratorId="placeReason"
                    :fieldDecoratorOptions="rules.placeReason"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }">
        <ta-radio-group @change="onChange"
                        :disabled="disabled">
          <ta-radio :value="item.value"
                    v-for="(item,index) in reasonsPlacementCareList"
                    :key="index">{{item.label}}</ta-radio>
        </ta-radio-group>
      </ta-form-item>
      <ta-form-item v-if="reasonsOther"
                    label="其他"
                    fieldDecoratorId="placeReasonOther"
                    :fieldDecoratorOptions="rules.reasonsPlacementCareOther"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }">
        <ta-input :disabled="disabled"
                  placeholder="请输入其他情况" />
      </ta-form-item>
    </ta-col>
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
    // issameaddress: {
    //   type: String,
    //   required: false
    // },
    thisP: {
      required: true
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
        label: 6,
        wrapper: 18
      },
      labelwidth2: {
        label: 4,
        wrapper: 20
      },
      loading: false,
      filed: '',
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      reasonsPlacementCareList: [], // 安置原因
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
      yesNolist: [],
      sameaddresslist: [{ label: '', value: '1' }],
      rules: {
        name: this.verificationRules('姓名', 72),
        sex: this.verificationRules('性别'),
        nation: this.verificationRules('民族'),
        placeReason: this.verificationRules('安置照料原因'),
        reasonsPlacementCareOther: this.verificationRules('其他情况', 50),
        // applicationTime: this.verificationRules('申请日期', true),
        birthday: this.verificationRules('出生日期', true),
        householdRegistryProperty: this.verificationRules('户口性质'),
        householdRegistryClassify: this.verificationRules('户口分类'),
        censusRegisterDetail: this.verificationRules('户籍所在地详细地址', 100),
        currentAddressDetail: this.verificationRules('现住地详细地址', 100),
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
      },
      IDRe18: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      IDre15: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/,
      reasonsOther: false,
      formName: []
    }
  },
  mounted () {
    this.getMenuDatas()
    this.getyesno()

    this.formName = this.thisP.baseForm
  },
  methods: {

    likeOut () {
      const nowData = this.formName.getFieldsValue()
      if (nowData.sameAddress == []) { } else {
        this.formName.setFieldsValue({
          sameAddress: []
        })
      }
    },
    likeaddress (q) {
      const data = this.formName.getFieldsValue()
      this.$nextTick(() => {
        if (q == '1') {
          let arrs = []
          if (data.censusRegister != undefined) {
            arrs = [...data.censusRegister]
          }
          this.thisP.addressChildModelNow = arrs
          this.formName.setFieldsValue({
            currentAddress: arrs
          })
          this.formName.setFieldsValue({
            currentAddressDetail: data.censusRegisterDetail ? data.censusRegisterDetail : ''
          })
        } else {

        }
      })
    },

    onChange (e) {
      if (e.target.value == 4) {
        this.reasonsOther = true
      } else {
        this.reasonsOther = false
      }
      this.$emit('setHeight')
    },
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
    // likeaddress () {
    //   this.$emit('likeaddress')
    // },
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
      console.log(info)
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
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.imglist]
          arrlist.splice(-1, 1)
          this.$emit('update:imglist', arrlist)
          return false
        }
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
      this.yesNolist = data
    },
    // radiochange (val) {
    //   // this.$emit('update:womenaddressmodel', [])
    //   // this.issameaddress = val.target.value
    //   // this.$emit('update:issameaddress', val.target.value)
    //   // this.$emit('radiochange')
    //   this.$emit('likeaddress')
    // },
    idcardchange (value) {
      const val = value.target.value
      // 校验身份证：
      if (!val || val == '') {
        return false
      }
      if (this.IDRe18.test(val) || this.IDre15.test(val)) {
        this.$emit('idcardchanges', val)
      }
    },
    async idcardrole (rule, value, callback) {
      if (!value || value == '') {
        callback()
        return false
      }
      if (this.IDRe18.test(value) || this.IDre15.test(value)) {
        callback()
      } else {
        callback('请输入正确的身份证格式')
      }
    },
    preview (file) {
      this.downloadFile(file)
    },
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.nationList = await this.getDictionaries('NATION') // 获取民族字典数据
      this.censusRegisterList = await this.getDictionaries('CENSUSREGISTER') // 获取户籍性质字典数据
      this.householdclassificationList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY') // 获取户口分类字典数据
      this.reasonsPlacementCareList = await this.getDictionaries('REASONSPLACEMENTCARE') // 获取安置原因字典数据
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
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 32px;
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
