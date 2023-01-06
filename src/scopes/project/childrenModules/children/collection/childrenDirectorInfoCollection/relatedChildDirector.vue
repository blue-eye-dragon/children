<template>
  <div class="conts">
    <div class="contin">
      <ta-form :autoFormCreate="  modelForm => {this.modelForm = modelForm;}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="登记类型"
                          fieldDecoratorId="registType"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 16 }"
                          :fieldDecoratorOptions="{ initialValue: areaLevel=='2'||areaLevel=='3'?'2':'1', rules: [{ required: true, message: '请选择登记类型' }] }">
              <ta-radio-group @change="setArealevel">
                <ta-radio v-for="item in registTypeList"
                          :key="item.value"
                          :value="item.value"
                          :disabled="(areaLevel=='2'||areaLevel=='3'||areaLevel=='4')?true:disabled">
                  {{item.label}}
                </ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="姓名"
                            fieldDecoratorId="name"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            :fieldDecoratorOptions="verificationRules('姓名',72)">
                <ta-input :placeholder="!disabled?'请输入姓名':''"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="民族"
                            fieldDecoratorId="nation"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            :require="{ message: '请选择民族' }">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择民族':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in nationList"
                                    :key="item.value"
                                    :value="item.value"
                                    :require="{ message: '请选择民族' }">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="特长"
                            fieldDecoratorId="speciality"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('特长',72)">
                <ta-input :placeholder="!disabled?'请输入特长':''"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="工作单位"
                            fieldDecoratorId="company"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            :fieldDecoratorOptions="verificationRules('工作单位',72)">
                <ta-input :placeholder="!disabled?'请输入工作单位':''"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="邮箱"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="email"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('邮箱',{type: 'email'})">
                <ta-input :placeholder="!disabled?'请输入邮箱':''"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="证件类型"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="memberIdType"
                            :require="{ message: '请选择证件类型' }">
                <ta-select allowClear
                           @change="changeCardType"
                           :placeholder="!disabled?'请选择证件类型':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in idcardTypeList"
                                    :key="item.value"
                                    :value="item.value"
                                    :require="{ message: '请选择证件类型' }">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item label="性别"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="sex"
                            :require="{ message: '请选择性别' }">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择性别':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in sexList"
                                    :key="item.value"
                                    :value="item.value"
                                    :require="{ message: '请选择性别' }">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="政治面貌"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="politicalStatus"
                            :require="{ message: '请选择政治面貌' }">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择政治面貌':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in politicalStatusList"
                                    :key="item.value"
                                    :value="item.value"
                                    :require="{ message: '请选择政治面貌' }">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <Health fileldName="healthStatusDatas"
                      :disabled="disabled"
                      :isRequire="false"
                      :heathmodel="heathModel"
                      @setheath="setChildHeaths"></Health>
              <ta-form-item label="取得证书"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="certifercate"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('取得证书',100)">
                <ta-input :placeholder="!disabled?'请输入取得证书':''"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="证件号码"
                            fieldDecoratorId="idCard"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            :fieldDecoratorOptions="cardType=='01'?rules.idCard:this.verificationRules('证件号码',18)">
                <ta-input maxlength='20'
                          :placeholder="disabled?'':'请输入证件号码'"
                          :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="出生日期"
                            :key="'birth'"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="birth"
                            :require="{ message: '请选择出生日期' }">
                <ta-date-picker format="YYYY-MM-DD"
                                :placeholder="!disabled?'请选择出生日期':''"
                                style="width: 100%;"
                                :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="文化程度"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="education"
                            :require="{ message: '请选择文化程度' }">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择文化程度':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in educationList"
                                    :key="item.value"
                                    :value="item.value"
                                    :require="{ message: '请选择文化程度' }">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="婚姻状况"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="maritalStatus"
                            :require="{ message: '请选择婚姻状况' }">
                <ta-select allowClear
                           :placeholder="!disabled?'请选择婚姻状况':''"
                           :disabled="disabled">
                  <ta-select-option v-for="item in maritalStatusList"
                                    :key="item.value"
                                    :value="item.value"
                                    :require="{ message: '请选择婚姻状况' }">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="职务"
                            :labelCol="{ span: 8}"
                            :wrapperCol="{ span: 16 }"
                            fieldDecoratorId="duty"
                            :require="{ message: '请选择职务' }">
                <ta-select :collection-type="disabled?'ETZRDDYDUTY':(areaLevel=='4'?'ETZRDUTY':'ETDDYDUTY')"
                           :dropdownMatchSelectWidth="false"
                           :disabled="disabled"
                           v-model="dutyValue"
                           placeholder="请选择职务" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <div class="uploadimg">
                <div class="add_contract">
                  <span @click="del"
                        v-if="delVisible"
                        title="点击可删除">删除</span>
                  <div style="height:100%">
                    <img v-if="imageUrl"
                         :src="imageUrl"
                         style="height:100%" />
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
                           @preview="preview"
                           :beforeUpload="beforeUpload"
                           @change="handleChange">
                  <ta-button :disabled="disabled">上传照片</ta-button>
                </ta-upload>
              </div>
            </ta-col>
          </ta-col>
          <ta-col :span="6"
                  v-if="dutyValue==Enum.ETZRDDYDUTY.QT">
            <ta-form-item label="其他职务"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16 }"
                          fieldDecoratorId="dutyOther"
                          :fieldDecoratorOptions="verificationRules('其他职务',72)">
              <ta-input :placeholder="!disabled?(areaLevel=='4'?'请输入其他职务':'请输入所在单位及职务'):''"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="手机号"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16 }"
                          fieldDecoratorId="cellPhone"
                          :fieldDecoratorOptions="verificationRules('手机号',{type: 'phone'})">
              <ta-input :placeholder="!disabled?'请输入手机号':''"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="座机号"
                          :labelCol="{ span: 8}"
                          :wrapperCol="{ span: 16 }"
                          fieldDecoratorId="fixedPhone"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('座机号',{type: 'phone'})">
              <ta-input :placeholder="!disabled?'请输入座机号':''"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="是否专兼职"
                          fieldDecoratorId="fullOrPart"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          :require="{ message: '请选择是否专兼职' }">
              <ta-select allowClear
                         :placeholder="!disabled?'请选择是否专兼职':''"
                         :disabled="disabled">
                <ta-select-option v-for="item in fullOrPartList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{ message: '请选择是否专兼职' }">{{ item.label }}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="是否政府购买服务"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="isGovernmentBuyService"
                          :require="{ message: '请选择是否政府购买服务' }">
              <ta-select allowClear
                         :placeholder="!disabled?'请选择是否政府购买服务':''"
                         :disabled="disabled">
                <ta-select-option v-for="item in isGovernmentBuyServiceList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{ message: '请选择是否政府购买服务' }">{{ item.label }}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="津贴"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="allowance">
              <ta-select allowClear
                         :placeholder="!disabled?'请选择津贴':''"
                         :disabled="disabled">
                <ta-select-option v-for="item in allowanceList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{ message: '请选择津贴' }">{{ item.label }}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <div v-if='orgType!="98"'>
              <AddressComponent :addressmodel="addressmodel"
                                :msg="'职责范围'"
                                fileldName="dutyBoundaryData"
                                :types="'5'"
                                :orgType='orgType'
                                :isOwnArea="areaLevel!=4"
                                :arealevel="'4'"
                                :labelwidth="labelwidth"
                                @setaddress="setaddress"
                                :disabled="disabled"></AddressComponent>
            </div>
            <div v-else>
              <ta-form-item label="职责范围"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{span:16}"
                            fieldDecoratorId="dutyBoundaryData9">
                <ta-input :disabled="true" />
              </ta-form-item>
            </div>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="村/社区名称"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="addressDetails"
                          :fieldDecoratorOptions="areaLevel=='2'||areaLevel=='3'?verificationRulesNotMustFill('村/社区名称',100):verificationRules('村/社区名称',100)">
              <ta-input :placeholder="!disabled?'请输入村/社区名称':''"
                        :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="从业情况"
                          class="alonerow"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{span:22}"
                          fieldDecoratorId="employment"
                          :fieldDecoratorOptions="verificationRules('从业情况',72,false)">
              <ta-textarea :placeholder="!disabled?'请输入从业情况':''"
                           :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="工作及培训经历"
                          class="alonerow"
                          :labelCol="{ span: 2}"
                          :wrapperCol="{span:22}"
                          fieldDecoratorId="workAndTraining"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('工作及培训经历',200,true)">
              <ta-textarea :placeholder="!disabled?'请输入工作及培训经历，包括起止时间、工作/培训单位、担任职务（培训内容）':''"
                           :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
      <ta-button @click="submit"
                 v-if="!disabled"
                 class="btnleft"
                 type="primary">提交</ta-button>
    </div>
  </div>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
import Health from '@/scopes/project/common/components/health'
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
  data () {
    return {
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: this.verificationRules('证件号码', { type: 'idCard' })
      },
      cardType: '0',
      idcardTypeList: [], // 证件类型
      registTypeList: [], // 登记类型字典数据
      sexList: [], // 性别字典数据
      nationList: [], // 民族字典数据
      maritalStatusList: [], // 婚姻状况字典数据
      politicalStatusList: [], // 政治面貌字典数据
      educationList: [], // 文化程度字典数据
      fullOrPartList: [], // 是否专兼职字典数据
      isGovernmentBuyServiceList: [], // 是否政府购买服务
      allowanceList: [], // 津贴字典数据
      labelwidth: { label: 4, wrapper: 20 },
      // arealevel: '4', // 督导员到乡镇，主任到村
      areaLevel: '', // 当前登录人的区划级别
      delVisible: false, // 文件上传的删除按钮显示
      imageUrl: 'static/img/defalimg.png',
      loading: false,
      isReIdCard: true,
      adoption: {
        // 头像上传的参数
        busiType: '13', // 头像
        functionalType: '2'
      },
      headImgId: '', // 上传的头像id
      fileList: [], // 文件列表
      upLoadPathIds: [], // 传给后台的附件id数组
      disabled: false,
      addressmodel: [],
      orgType: '',
      heathModel: [],
      directorList: [], // 查看传过来的儿童主任数据
      flag: '', // 编辑（edit）、查看（look）的标识
      isFromSearch: false,
      formDataSearch: {},
      dutyValue: '' // 职务选择的数据
    }
  },
  activated () {
    this.initDatas()
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    this.cardType = '01'
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  updated () {
    this.setLabelAndWrapperWidth('8.3%', '91.7%', 'alonerow') // 单独一行字段宽度控制
  },
  methods: {
    async idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this, null)
    },
    callbackByIdCard (sex, age, birth) {
      if (this.isReIdCard) {
        const idCardValue = this.modelForm.getFieldsValue().idCard
        if (!idCardValue) {
          this.modelForm.setFieldsValue({
            birth: null,
            sex: null
          })
        } else {
          const res = age - 18
          this.modelForm.setFieldsValue({
            birth: birth ? moment(birth) : null,
            sex: sex
          })
        }
      }
    },
    changeCardType (v) {
      this.cardType = v
      if (v == undefined) {
        this.cardType = 0
        this.$nextTick(() => {
          this.modelForm.setFieldsValue({
            idCard: ''
          })
        })
      }
    },
    preview (file) {
      this.downloadFile(file)
    },
    async initDatas () {
      // 重置数据
      this.dutyValue = ''
      this.isFromSearch = false
      this.formDataSearch = {}
      this.isReIdCard = true
      this.disabled = false
      this.modelForm.resetFields()
      this.headImgId = []
      this.fileList = []
      this.upLoadPathIds = []
      this.delVisible = false
      this.imageUrl = 'static/img/defalimg.png'
      this.flag = this.$route.query.flag
      const userInfo = window.parent.indexTool.getUserInfo()
      const areaLevel = userInfo.areaLevel
      this.areaLevel = areaLevel
      this.orgType = userInfo.orgType// 98--未保
      const areaId = userInfo.areaId

      if (this.orgType == '98') {
        this.areaLevel = '4'
      } else {
        this.arealevel = (this.areaLevel == '2' || this.areaLevel == '3') ? '3' : '4' // 登记类型
      }
      if (this.flag == 'edit' || this.flag == 'look') {
        const idgo = JSON.parse(this.$route.query.directorList)

        const res = await this.post('/childdirectorandsupervisor/queryById', { id: idgo.id })
        if (!res.error) {
          this.directorList = res.data.data
        } else {
          return
        }
        // 编辑或查看
        if (this.flag == 'look') {
          this.disabled = true
        }
        if (this.orgType == '98') {
          const res = await this.post('/org/orguser/areaManagementRestService/queryAreaByAreaId', { areaId: this.directorList.town })

          if (res.serviceSuccess) {
            this.directorList.dutyBoundaryData9 = res.data.areaList.areaName ? res.data.areaList.areaName : this.directorList.dutyBoundaryData
          }
        }
        // 附件赋值
        if (this.directorList.fileList && this.directorList.fileList.length > 0) {
          this.fileList = this.directorList.fileList
          this.headImgId = this.directorList.fileList[0].response.data.data.fileid
          this.upLoadPathIds = []
          this.upLoadPathIds.push(this.directorList.fileList[0].response.data.data.fileid)
          this.delVisible = true
          this.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + this.directorList.fileList[0].response.data.data.fileid
        }

        this.directorList.birth = this.directorList.birth
          ? moment(this.directorList.birth)
          : null

        this.addressmodel = []
        if (this.directorList.town) {
          this.addressmodel.push(this.directorList.town)
        }
        this.setaddress()
        // 健康状况赋值
        this.heathModel = this.directorList.healthStatus
          ? this.directorList.healthStatus.split(',')
          : []
        // 职务赋值
        this.dutyValue = this.directorList.duty
        this.$nextTick(() => {
          this.modelForm.setFieldsValue(this.directorList)
        })
        if (this.flag == 'look') {
          this.disabled = true
        }
      }
    },
    // 儿童基本信息的字典数据获取
    async getMenuDatas () {
      this.idcardTypeList = await this.getDictionaries('IDCARD_TYPE') //  获取证件类型字典数据
      this.registTypeList = await this.getDictionaries('REGISTRATIONTYPE') //  获取登记类型字典数据
      this.sexList = await this.getDictionaries('SEX') //  获取性别字典数据
      this.nationList = await this.getDictionaries('NATION') //  获取民族字典数据
      this.maritalStatusList = await this.getDictionaries('MARRIAGE') //  获取婚姻状况字典数据
      this.politicalStatusList = await this.getDictionaries('POLITICAL_OUTLOOK') //  获取政治面貌字典数据
      this.educationList = await this.getDictionaries('DEGREEEDUCATION') //  获取文化程度字典数据
      this.fullOrPartList = await this.getDictionaries('MTCSOL') //  获取是否专兼职字典数据
      this.isGovernmentBuyServiceList = await this.getDictionaries('YESNO') //  获取是否专政府购买服务字典数据
      this.allowanceList = await this.getDictionaries('ALLOWANCE') //  获取津贴字典数据
    },
    backs () {
      if (!this.isFromSearch) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          path: this.formDataSearch.pathUrl,
          query: {
            isFromSearch: true,
            formDataSearch: this.formDataSearch
          }
        })
      }
    },
    // 健康状况传值
    setChildHeaths () {
      this.modelForm.setFieldsValue({
        healthStatusDatas: this.heathModel
      })
    },
    // 根据所选登记类型设置职责范围的arealevel，儿童主任到村，督导员到乡镇
    setArealevel (e) {
    },
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
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false

          this.delVisible = true
        })

        this.headImgId = info.file.response.data.data.fileid
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.upLoadPathIds.push(info.file.response.data.data.fileid)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      if (this.headImgId != '') {
        this.$message.error('请删除原有头像再进行上传！')
        return false
      }
      const typelist = ['image/jpeg', 'image/png']
      const isaccord = typelist.includes(file.type)
      if (!isaccord) {
        this.$message.error('请上传jpeg、png图片格式')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('文件大小大于10M!')
      }
      return isaccord && isLt10M
    },
    // 重置附件列表
    resetFileDatas () {
      this.imageUrl = 'static/img/defalimg.png'
      this.delVisible = false
      this.headImgId = '' // 上传的头像id
      this.upLoadPathIds = []
      this.fileList = [] // 文件列表
    },
    // 文件点击删除
    del () {
      if (this.disabled) {
        return false
      }
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: _self.headImgId
      }).then(response => {
        _self.$message.success('头像删除成功!')
        _self.fileList = []
        _self.upLoadPathIds = []

        _self.headImgId = ''
      }).catch(() => {
        _self.$message.error('头像删除失败!')
      })

      _self.imageUrl = 'static/img/defalimg.png'
      _self.delVisible = false
    },
    submit () {
      let isok = true
      this.isReIdCard = false
      const _self = this
      _self.modelForm.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        this.isReIdCard = true
        let url = '/childdirectorandsupervisor/save'
        if (this.flag == 'edit') {
          url = '/childdirectorandsupervisor/update'
        }
        const modelForm = _self.modelForm.getFieldsValue()
        if (_self.directorList != undefined) {
          modelForm.id = _self.directorList.id
          modelForm.orgId = _self.directorList.orgId
          modelForm.delState = _self.directorList.delState
        }

        // 出生日期数据处理
        modelForm.birth = modelForm.birth
          ? moment(modelForm.birth).format('YYYY-MM-DD')
          : ''
        // 职责范围数据处理

        const userInfo = window.parent.indexTool.getUserInfo()

        modelForm.province = userInfo.provinceId
        modelForm.city = userInfo.areaLevel == '2' ? userInfo.areaId : userInfo.cityId
        modelForm.county = userInfo.countyId
        modelForm.town = modelForm.dutyBoundaryData[0]
        // modelForm['village'] = modelForm.dutyBoundaryData[0]
        delete modelForm.dutyBoundaryData
        // 附件数据处理
        modelForm.upLoadPathIds = _self.upLoadPathIds
        // 健康状况处理
        modelForm.healthStatus = modelForm.healthStatusDatas
          ? modelForm.healthStatusDatas.join(',')
          : ''
        delete modelForm.healthStatusDatas
        _self.post(url, modelForm).then(res => {
          if (res.serviceSuccess) {
            _self.$message.success('数据保存/修改成功！')
            _self.modelForm.resetFields()
            _self.delVisible = false
            _self.headImgId = []
            _self.fileList = []
            _self.upLoadPathIds = []
            _self.imageUrl = 'static/img/defalimg.png'
            _self.backs()
          }
        })
        // _self.backs()
      } else {
        this.isReIdCard = true
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
    },
    // 地址传值
    setaddress () {
      this.modelForm.setFieldsValue({
        dutyBoundaryData: this.addressmodel
      })
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
  width: 300px;
  margin-left: 17%;
  height: 252px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.uploadimg img {
  width: 100%;
}

.avatar-uploader {
  margin-top: 5%;
}
.add_contract {
  width: 200px;
  height: 150px;
  cursor: pointer;
  display: flex;
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
</style>
