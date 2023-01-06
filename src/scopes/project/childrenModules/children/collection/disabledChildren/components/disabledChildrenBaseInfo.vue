<template>
  <ta-row class="fromcom">
    <ta-col :span="18">
      <ta-col :span="8">
        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">

          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                      :fieldDecoratorOptions="this.verificationRules('姓名', 72)">
          <ta-input :disabled="true"
                    maxlength='72'
                    :placeholder="disabled?'':'请输入姓名'" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :require="{enable: !householdRegistryClassifydisabled,message: '请选择出生日期'}"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-date-picker :placeholder="disabled?'':'请选择出生日期'"
                          style="width: 100%;"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>

      </ta-col>
      <ta-col :span="8">
        <!--  :fieldDecoratorOptions="!householdRegistryClassifydisabled?rules.idCard:rules.idCard2" -->
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <!-- ?disabled:householdRegistryClassifydisabled -->
          <ta-input :disabled="true"
                    maxlength='18'
                    :placeholder="disabled?'':'请输入身份证号'" />
        </ta-form-item>

        <ta-form-item label="户口性质"
                      fieldDecoratorId="householdRegistryClassify"
                      :fieldDecoratorOptions="rules.householdRegistryClassify"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select allowClear
                     :disabled="disabled"
                     :placeholder="disabled?'':'请选择户口性质'"
                     @change="householdRegistryClassifychange"
                     :wrapperCol="{ span: 15 }">
            <ta-select-option v-for="item in householdclassificationList"
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
                     :disabled="disabled"
                     :placeholder="disabled?'':'请选择性别'">
            <!-- ?disabled:(householdRegistryClassifydisabled?false:true) -->
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :fieldDecoratorOptions="rules.nation"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }">
          <ta-select allowClear
                     :disabled="disabled"
                     :placeholder="disabled?'':'请选择民族'">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

      </ta-col>
      <ta-col :span="24">
        <ta-col :span="12">
          <AddressComponent :labelwidth="labelwidth"
                            :disabled="disabled||householdRegistryClassifydisabled"
                            :addressmodel="addressChildModel"
                            :msg="'户籍地'"
                            fileldName="censusRegisterSD"
                            @setaddress="setChildAddress"
                            arealevel="4"
                            :isRequire='!householdRegistryClassifydisabled'
                            @adsvalchange="likeOut"
                            :clearPlaceHolder='disabled||householdRegistryClassifydisabled'></AddressComponent>

        </ta-col>
        <ta-col :span="9">
          <ta-form-item label
                        fieldDecoratorId="censusRegisterDetail"
                        :labelCol="{ span: 0 }"
                        style="margin-left:10px;"
                        :wrapperCol="{ span: 24 }"
                        :fieldDecoratorOptions="householdRegistryClassifydisabled?this.verificationRulesNotMustFill('详细地址',100):this.verificationRules('详细地址', 100)">
            <ta-input @change="likeOut"
                      maxlength='100'
                      :placeholder="disabled||householdRegistryClassifydisabled?'':'请输入详细地址'"
                      :disabled="disabled||householdRegistryClassifydisabled"
                      :fieldDecoratorOptions="rules.censusRegisterDetail" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="3">
          <ta-form-item label="同现住址"
                        fieldDecoratorId="sameAddress"
                        :labelCol="{ span: 18 }"
                        :wrapperCol="{ span: 6}"
                        :fieldDecoratorOptions="{initialValue: []}">

            <ta-checkbox-group :options="sameaddresslist"
                               @change="likeaddress"
                               :disabled="disabled||householdRegistryClassifydisabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="12">
          <AddressComponent :labelwidth="labelwidth"
                            :disabled="disabled"
                            :addressmodel="addressChildModelNow"
                            :msg="'现住址'"
                            fileldName="currentAddress"
                            @setaddress="setChildAddress1"
                            arealevel="4"
                            :clearPlaceHolder='disabled'
                            @adsvalchange="likeOut"></AddressComponent>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label
                        style="margin-left:10px;"
                        fieldDecoratorId="currentAddressDetail"
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 24 }"
                        :fieldDecoratorOptions="this.verificationRules('详细地址', 100)">
            <ta-input :placeholder="disabled?'':'请输入详细地址'"
                      maxlength='100'
                      :disabled="disabled"
                      @change="likeOut"
                      :fieldDecoratorOptions="rules.currentAddressDetail" />
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
      <template>

      </template>
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
    familyPoorOthers: { // 家庭困境
      type: Boolean,
      required: true
    },
    guardianshipDilemmaOthers: { // 监护困境
      type: String,
      required: true
    },
    unattendedOthers: { // 无人qt
      type: Boolean,
      required: true
    },
    nobList: {
      type: Array,
      required: true
    },
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
    },
    id: { // 进入编辑时的id
      type: String,
      required: false
    },
    oldIdCard: { // 进入编辑时的身份证号
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
      poorFimlyList: [],
      etionList: [],

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

        reasonsPlacementCareOther: this.verificationRules('其他情况', 50),

        birthday: this.verificationRules('出生日期', true),

        householdRegistryProperty: this.verificationRules('户口性质'),
        householdRegistryClassify: this.verificationRules('户口性质'),
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
          if (data.censusRegisterSD != undefined) {
            arrs = [...data.censusRegisterSD]
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

    onChange1 (e) {
      this.$emit('reasonsOtherSetHeight', e.target.value, 1)
    },
    onChange2 (e) {
      this.$emit('reasonsOtherSetHeight', e.target.value, 2)
    },
    onChange3 (e) {
      this.$emit('reasonsOtherSetHeight', e.target.value, 3)
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

        this.$emit('update:imglist', arr)
        this.$message.success('文件上传成功!')
      }
    },
    async getyesno () {
      const data = await this.getDictionaries('YESNO')
      this.sameaddress = data
      this.yesNolist = data
    },
    // 身份证号格式验证
    async idcardrole (rule, value, callback) {
      if (!this.id || value != this.oldIdCard) { // 新增或编辑但身份证号改变时，进行验重操作
        this.idCardValidate(rule, value, callback, this, null, '140')
      } else { // 否则不进行验重
        this.idCardValidate(rule, value, callback, this, null)
      }
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      this.$emit('setValueByIdCard', val)
    },
    // 根据身份证号回显出生日期与性别
    callbackByIdCard (sex, age, birth) {
      this.$emit('callbackByIdCard', sex, age, birth)
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
      this.poorFimlyList = await this.getDictionaries('POORFAMILY') // 获取家庭贫困字典数据
      //   this.etionList = await this.getDictionaries('TROUBLEMONITORING') // 获取监护困境字典数据

      let formdata = {
        parentValue: null,
        codeType: 'TROUBLEMONITORING'
      }
      let data = await this.post('dict/queryDictByParentValue', formdata)
      this.etionList = data.data.codeList
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
    },
    disabledDate (current) { return current > (moment().endOf('day')) }
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
</style>
