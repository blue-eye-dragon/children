<template>
  <ta-row class="fromcom">
    <ta-col :span="18">
      <ta-col :span="8">
        <ta-form-item label="儿童编号"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      fieldDecoratorId="childNumber">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="儿童姓名"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name">
          <ta-input :disabled="justEdit?true:disabled"
                    @blur="sendDataToRecipient('name')"
                    maxlength="72"
                    :placeholder="disabled ? '' : '请输入儿童姓名'" />
        </ta-form-item>

        <ta-form-item label="申请日期"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      fieldDecoratorId="applicationTime"
                      :fieldDecoratorOptions="rules.applicationTime">
          <ta-date-picker style="width: 100%"
                          :disabled=" isWshEdit||disabled"
                          :disabledDate="disabledDate"
                          :placeholder="disabled ? '' : '请选择申请日期'" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      :fieldDecoratorOptions="  householdRegistryClassifyhide ? rules.idCard : rules.idCard2">
          <ta-input :disabled="justEdit?true:(householdRegistryClassifydisabled||idcarddisabled)"
                    maxlength="18"
                    @blur="sendDataToRecipient('idCard')"
                    :placeholder="(householdRegistryClassifydisabled||idcarddisabled) ? '' : '请输入身份证号'" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      :fieldDecoratorOptions="rules.sex">
          <ta-select allowClear
                     :disabled="justEdit?true:(disabled || !householdRegistryClassifydisabled)">
            <ta-select-option v-for="item in sexList"
                              :key="item.value"
                              :value="item.value">{{ item.label }}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="户口分类"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      fieldDecoratorId="householdRegistryClassify"
                      :initValue="isOther?Enum.HOUSEHOLDREGISTRYCLASSIFY.BXQHK:''"
                      :fieldDecoratorOptions="rules.householdRegistryClassify">
          <ta-select allowClear
                     :disabled="justEdit?true:disabled||isOther"
                     :placeholder="disabled ? '' : '请选择户口分类'"
                     @change="householdRegistryClassifychange">
            <ta-select-option v-for="item in householdclassificationList"
                              :key="item.value"
                              :value="item.value">{{ item.label }}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="8">
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                      :fieldDecoratorOptions="rules.birthday">
          <ta-date-picker :placeholder="disabled ? '' : '请选择出生日期'"
                          style="width: 100%"
                          @change="ageStu"
                          :disabledDate="disabledDate"
                          :disabled="justEdit?true:(!householdRegistryClassifydisabled||disabled)" />
        </ta-form-item>
        <ta-form-item label="民族"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      fieldDecoratorId="nation"
                      :fieldDecoratorOptions="rules.nation">
          <ta-select allowClear
                     :disabled="disabled"
                     :placeholder="disabled ? '' : '请选择民族'">
            <ta-select-option v-for="item in nationList"
                              :key="item.value"
                              :value="item.value">{{ item.label }}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="户籍性质"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                      fieldDecoratorId="censusRegister"
                      :fieldDecoratorOptions="
            householdRegistryClassifyhide ? rules.censusRegister : {} ">
          <ta-select allowClear
                     :disabled="justEdit?true:(householdRegistryClassifydisabled  ? householdRegistryClassifydisabled  : disabled)"
                     :placeholder="!householdRegistryClassifydisabled ? '请选择户籍性质' : '' "
                     :options="censusRegisterList">

          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                      label="患艾滋情况"
                      fieldDecoratorId="adisCondition"
                      :fieldDecoratorOptions="{
            initialValue: '1',
            rules: [{ required: true, message: '请选择患艾滋情况' }],
          }">
          <ta-radio-group @change="radiochange1"
                          style="width: 100%"
                          :disabled="disabled">
            <ta-radio v-for="(item, index) in adisConditionList"
                      :key="index"
                      :value="item.value">{{ item.label }}</ta-radio>
            <ta-input v-if="radiovalue == Enum.ADISCONDITION.QT"
                      :placeholder="!disabled ? '请输入原因' : ''"
                      ref="adisConditionOther"
                      style="width: 300px"
                      maxlength="50"
                      :disabled="disabled" />
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="radiovalue == Enum.ADISCONDITION.XDHGRAZB">
        <ta-form-item label="确认艾滋病感染时间"
                      fieldDecoratorId="infectionTime"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      :require="{ message: '请选择确认艾滋病感染时间' }">
          <ta-date-picker style="width: 25%"
                          :placeholder="!disabled ? '请选择确认艾滋病感染时间' : ''"
                          :disabled="disabled"
                          :disabledDate="disabledDate" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24"
              v-if="radiovalue == Enum.ADISCONDITION.XDHGRAZB">
        <ta-form-item label="最有可能感染艾滋病途径"
                      fieldDecoratorId="transmissionWay"
                      :labelCol="{ span: 5 }"
                      :wrapperCol="{ span: 19 }"
                      :fieldDecoratorOptions="{
            initialValue: '1',
            rules: [
              { required: true, message: '请选择最有可能感染艾滋病途径' },
            ],
          }">
          <ta-radio-group @change="channel"
                          style="width: 100%"
                          :disabled="disabled">
            <ta-radio v-for="(item, index) in transmissionWayList"
                      :key="index"
                      :value="item.value">{{ item.label }}</ta-radio>
            <ta-input v-if="radiovalues == Enum.TRANSMISSIONWAYOTHER.QT"
                      :placeholder="!disabled ? '请输入其他途径' : ''"
                      ref="transmissionWayOther"
                      style="width: 300px"
                      maxlength="50"
                      :disabled="disabled" />
          </ta-radio-group>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-col :span="10">
          <AddressComponent :clearPlaceHolder="householdRegistryClassifydisabled"
                            :addressmodel="addressChildModel"
                            :msg="'户籍地'"
                            :disabled="isWshEdit||justEdit||disabled || householdRegistryClassifydisabled||isOnlyShow"
                            :isRequire="!householdRegistryClassifydisabled"
                            arealevel="4"
                            :labelwidth="labelwidth"
                            fileldName="censusRegisterp"
                            :isOrphanOrFact="isOffSite"
                            @setaddress="setChildAddress"
                            @clearAddress="clearAddress"
                            @adsvalchange="adsvalchange"
                            :key="timer"></AddressComponent>
        </ta-col>
        <ta-col :span="14">
          <ta-col :span="11">
            <ta-form-item label
                          fieldDecoratorId="censusRegisterDetail"
                          :fieldDecoratorOptions="
                householdRegistryClassifydisabled
                  ? rules.censusRegisterDetail1
                  : rules.censusRegisterDetail
              "
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 24 }">
              <ta-input @change="adsvalchanges"
                        maxlength="100"
                        :placeholder="  householdRegistryClassifydisabled ? '' : '请输入详细地址'  "
                        :disabled=" isWshEdit||justEdit||disabled || householdRegistryClassifydisabled||isOnlyShow  " />
            </ta-form-item>
          </ta-col>
          <ta-col :span="9"
                  v-if="!isOther">
            <ta-form-item label="同现住址"
                          fieldDecoratorId="sameAddress"
                          :fieldDecoratorOptions="{ initialValue: ['1'] }"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 6 }">
              <ta-checkbox-group :options="sameaddresslist"
                                 @change="adsvalchanges"
                                 :disabled=" (disabled || householdRegistryClassifydisabled)" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="13">
            <ta-form-item label="报请区域"
                          v-if="isOther"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="anotherPlaceAreaName"
                          :fieldDecoratorOptions="verificationRules('报请区域',100)">
              <ta-input :placeholder="'请输入报请区域'"
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>
      </ta-col>
      <ta-col :span="24">
        <template>
          <ta-col :span="10">
            <AddressComponent :labelwidth="labelwidth"
                              :disabled=" disabled"
                              :addressmodel="addressChildModelNow"
                              :msg="'现住址'"
                              fileldName="currentAddress"
                              @setaddress="setChildAddress1"
                              @adsvalchange="adsvalchange2"
                              arealevel="4"></AddressComponent>
          </ta-col>
          <ta-col :span="10">
            <ta-form-item label
                          fieldDecoratorId="currentAddressDetail"
                          :fieldDecoratorOptions="rules.currentAddressDetail"
                          :labelCol="{ span: 0 }"
                          :wrapperCol="{ span: 24 }">
              <ta-input :placeholder="disabled ? '' : '请输入详细地址'"
                        maxlength="100"
                        @change="adsvalchange2s"
                        :disabled=" disabled" />
            </ta-form-item>
          </ta-col>
        </template>
      </ta-col>
    </ta-col>
    <ta-col :span="6">
      <UpLoad :thisP='thisP'
              :thisP2='this'
              :imglist.sync='imglist'
              :disabled='disabled'
              :delVisible='delVisible'
              :imageUrl.sync='imageUrl'
              :uploadPar='adoption'></UpLoad>
    </ta-col>
  </ta-row>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import UpLoad from '@/scopes/project/common/components/uploadForPhoto'
import moment from 'moment'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    UpLoad,
    AddressComponent
  },
  props: {
    thisP: {
      required: true
    },
    justEdit: {
      type: Boolean,
      default: false
    },
    isOnlyShow: {
      type: Boolean,
      default: false
    },
    isOther: {
      type: Boolean,
      default: false
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
    id: {
      // 编辑查看时的id
      type: String,
      required: false
    },
    oldIdCard: {
      // 进入编辑时的身份证号
      type: String,
      required: false
    },
    imageUrl: {
      type: String,
      required: false
    },
    delVisible: {
      type: Boolean,
      default: false
    },
    // 是否异地
    isOffSite: {
      type: Boolean
    },
    isWshEdit: { // 是否从未审核的编辑跳转过来的
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flieObj: [],
      labelwidth: {
        label: 5,
        wrapper: 19
      },
      loading: false,
      filed: '',
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      censusRegisterList1: [],
      censusRegisterList: [], // 户籍性质字典数据
      // delVisible: false, // 文件上传的删除按钮显示
      householdclassificationList: [],
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      adisConditionList: [], // 患艾滋病情况字典数据
      transmissionWayList: [], // 最有可能感染艾滋病途径字典数据
      anotherPlaceList: [],
      adoption: {
        // 头像上传的参数
        busiType: '47', // 头像
        functionalType: '1'
      },
      headImgId: '', // 上传的头像id
      sameaddress: [],
      sameaddresslist: [{ label: '', value: '1' }],
      rules: {
        name: this.verificationRules('儿童姓名', 72),
        sex: this.verificationRulesNotMustFill('性别'),
        nation: this.verificationRules('民族'),
        applicationTime: this.verificationRules('申请日期', true),
        birthday: this.verificationRules('出生日期', true),
        censusRegister: this.verificationRules('户籍性质'),
        householdRegistryClassify: this.verificationRules('户口分类'),
        censusRegisterDetail: this.verificationRules('户籍所在地详细地址', 100),
        currentAddressDetail: this.verificationRules('现住地详细地址', 100),
        censusRegisterDetail1: this.verificationRulesNotMustFill(
          '户籍所在地详细地址',
          100
        ),
        currentAddressDetail1: this.verificationRulesNotMustFill(
          '现住地详细地址',
          100
        ),
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
      isNotSubmit: false, // 是否是暂存或提交的操作
      timer: '' // 户籍地的key
    }
  },
  activated () {
    // 重置户籍地的key 防止共用时出现问题
    this.timer = new Date().getTime()
    this.getMenuDatas()
  },
  mounted () {
    // this.getyesno()
  },
  methods: {
    // 限制超龄输入
    ageStu (dates) {
      dates = moment(dates).format('YYYYMMDD')
      this.$emit('computeEndTime', dates)
      // 2021年4月28日14:29:30 2021.4.30号上线。
      if (!this.householdRegistryClassifyhide) {
        let nowDate = new Date()
        nowDate = moment(nowDate).format('YYYYMMDD')
        if (nowDate - dates > 180000) {
          this.$message.error('该儿童已超龄，请勿录入超龄儿童！')
          this.$nextTick(() => {
            this.thisP.baseForm.setFieldsValue({
              birthday: undefined
            })
          })
        }
      }
    },

    // 同步数据到帮扶建议的领取人
    sendDataToRecipient (name) {
      this.$emit('sendDataToRecipient', name, 'baselifeForm', 'baseForm')
    },
    // 患艾滋病情况
    radiochange1 (val) {
      this.radiovalue = val.target.value + ''
      if (val.target.value != this.Enum.ADISCONDITION.XDHGRAZB) {
        this.radiovalues = ''
      }
      this.$emit('radiochange')
    },
    // 最有可能感染艾滋病途径
    channel (val) {
      this.radiovalues = val.target.value + ''

      this.$emit('radiochange')
    },
    // 查看或编辑时 是否显示条件模块处理（确认感染艾滋病时间等）
    ifDatasProcess (e, state) {
      if (state == 'look') {
        this.radiovalue = e ? e.adisCondition : ''
        this.radiovalues = e ? e.transmissionWay : ''
      } else {
        this.radiovalue = ''
        this.radiovalues = ''
      }
      this.$emit('radiochange')
    },
    // 确认感染艾滋病时间不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 编辑查看时，其他数据的赋值
    setOtherDatas (a, b) {
      this.$nextTick(() => {
        if (this.$refs.transmissionWayOther != undefined) {
          this.$refs.transmissionWayOther.stateValue = a
        }
        if (this.$refs.adisConditionOther != undefined) {
          this.$refs.adisConditionOther.stateValue = b
        }
      })
    },
    beforeUpload (file) {
      if (this.imglist.length > 0) {
        this.$message.error('请删除原有头像再进行上传！')
        return false
      }
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
    // 文件点击删除
    async del () {
      const ar = this.imageUrl.split('/')
      const air = ar[ar.length - 1]

      if (this.disabled) {
        return false
      }
      this.$confirm({
        title: '确认删除头像吗？',
        content: '删除后不可恢复，请谨慎操作。',
        okText: '确认',
        // okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          const res = await this.post('file/deleteBatchFileByReturnFileIds', {
            returnFileIds: air
          })
          if (res.serviceSuccess) {
            this.$message.success('头像删除成功!')
            this.thisP.imglist = []
            this.thisP.delVisible = false
            this.thisP.imageUrl = 'static/img/defalimg.png'
          } else {
            this.$message.error('头像删除失败!')
          }
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    handlePreview () {
      const file = this.imglist[0]
      if (file) {
        this.downloadFile(file)
      }
    },

    likeaddress () {
      this.$emit('likeaddress')
    },
    birthdays (rule, value, callback) {
      // 注意，callback 必须被调用
      callback()
    },
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
      if (info && info.fileList) {
        arr.push(info.fileList[info.fileList.length - 1])
      }

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
        if (
          info.file.response.errors &&
          info.file.response.errors.length != 0
        ) {
          this.$message.error('上传失败')
          const arrlist = [...this.imglist]
          arrlist.splice(-1, 1)
          this.$emit('update:imglist', arrlist)
          return false
        }
        // 上传成功
        const returnFileIds = info.fileList[0].response.data.data.fileid
        this.$emit(
          'update:imageUrl',
          window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
        )
        this.thisP.delVisible = true
        this.$emit('update:imglist', arr)
        this.$message.success('文件上传成功!')
      }
    },
    async adsvalchange (val, areaLevel) {
      if (val) { // 有值
        if (this.isOther) {
          this.anotherPlaceList = {
            anotherPlaceAreaId: areaLevel[areaLevel.length - 1].areaid,
            anotherPlaceAreaName: areaLevel[areaLevel.length - 1].areaname
          }
        }
        this.thisP.baseForm.setFieldsValue({ anotherPlaceAreaName: this.anotherPlaceList.anotherPlaceAreaName })
      }
      this.$emit('likeaddress')
    },
    // 户籍地选择为“新疆兵团或新疆维吾尔自治区”时，页面给出提示“系统尚未联通” 2021年6月17日16:35:49
    clearAddress (msg, isClear) {
      this.$message.warn(msg)
      if (isClear) {
        this.$emit('clearAddress')
      }
    },
    adsvalchanges (val) {
      this.$emit('likeaddress')
    },
    adsvalchange2 () {
      this.$emit('changeaddress')
    },
    adsvalchange2s () {
      this.$emit('changeaddress')
    },
    // 身份证号格式验证
    async idcardrole (rule, value, callback) {
      if (this.isNotSubmit) {
        callback()
      } else {
        if (!this.id || value != this.oldIdCard) {
          // 新增或编辑但身份证号改变时，进行验重操作
          this.idCardValidate(rule, value, callback, this, null, '120')
        } else {
          // 否则不进行验重
          this.idCardValidate(rule, value, callback, this, null)
        }
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

    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.nationList = await this.getDictionaries('NATION') // 获取民族字典数据
      this.censusRegisterList1 = await this.getDictionaries('CENSUSREGISTER') // 获取户籍性质字典数据
      if (this.thisP.$route.query.type == 'add') {
        this.censusRegisterList = this.censusRegisterList1.filter((item) => {
          return item.value != '99'
        })
      } else {
        this.censusRegisterList1.forEach((item) => {
          if (item.value == '99') {
            item.disabled = true
          }
        })
        this.censusRegisterList = this.censusRegisterList1
      }
      this.householdclassificationList = await this.getDictionaries(
        'HOUSEHOLDREGISTRYCLASSIFYNOONE'
      ) // 获取户口分类字典数据
      this.adisConditionList = await this.getDictionaries('ADISCONDITION') // 获取患艾滋病情况字典数据
      this.transmissionWayList = await this.getDictionaries(
        'TRANSMISSIONWAYOTHER'
      ) // 获取最有可能感染艾滋病途径字典数据
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
  width: 160px;
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
