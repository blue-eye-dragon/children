<template>
  <!-- 医疗申请信息 -->
  <ta-row class="fromcom">
    <ta-col :span="24">
      <ta-col :span="6">
        <AddressComponent :labelwidth="labelwidth"
                          :isRequire="submitNotSave?true:false"
                          :addressmodel="addressmodel2"
                          :disabled="disabledM"
                          @setaddress="setaddress2"
                          :msg="'地区'"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="申请日期"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="applyDate"
                      :require="submitNotSave?{message:'请输选择申请日期'}:false">
          <ta-date-picker style="width: 100%;"
                          :disabled="disabledM"
                          :valid-now-time="'right'"
                          placeholder="请选择申请日期" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="救治病种类型"
                      fieldDecoratorId="rescueDiseaseType"
                      :require="submitNotSave?{message:'请选择救治病种类型'}:false"
                      :labelCol="{span:12}"
                      :wrapperCol="{span:12}">
          <ta-select placeholder="请选择类型"
                     style="width : 100%"
                     :disabled="disabledM">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in diseasetypeList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="是否加入医保"
                      fieldDecoratorId="whetherAddmedicalInsurance"
                      :require="submitNotSave?{message:'请选择是否加入医保'}:false"
                      :labelCol="{span:11}"
                      :wrapperCol="{span:13}">
          <ta-select placeholder="请选择是否"
                     style="width : 100%"
                     :disabled="disabledM">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in yesnoList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="救治病种名称"
                      fieldDecoratorId="rescueDiseaseName"
                      :fieldDecoratorOptions="submitNotSave?rules.rescueDiseaseName:rules.rescueDiseaseName1"
                      :labelCol="{span:11}"
                      :wrapperCol="{span:13}">
          <ta-input placeholder="请输入病种名称"
                    :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="儿童身份类型"
                      fieldDecoratorId="childIdentityType"
                      :labelCol="{span:11}"
                      :wrapperCol="{span:13}"
                      :require="submitNotSave?{message:'请选择儿童身份类型'}:false">
          <ta-select placeholder="请选择类型"
                     :disabled="disabledSel"
                     style="width : 100%">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in childidentitytypeList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="联系人"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="contact"
                      :fieldDecoratorOptions="submitNotSave?rules.contact:rules.contact1">
          <ta-input placeholder="请输入联系人"
                    :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactTelephone"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      :fieldDecoratorOptions="submitNotSave?rules.contactTelephone:rules.contactTelephone1">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-col :span="6">
        <ta-form-item label="所属机构"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      fieldDecoratorId="applyUnit"
                      :require="submitNotSave?{message:'请输入所属机构'}:false">
          <ta-input placeholder="请输入所属机构"
                    :disabled="jgName" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="10">
        <ta-form-item label="家庭人均年收入(元)"
                      :labelCol="{span:9}"
                      :wrapperCol="{span:15}"
                      v-if="qtsf"
                      fieldDecoratorId="familyAverageAnnualIncome"
                      :require="submitNotSave?{message:'请输入家庭人均年收入'}:false">
          <ta-input-number :min="0"
                           style="width:100%"
                           :max="99999999"
                           :precision="2"
                           placeholder="请输入家庭人均年收入"
                           :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <!-- <ta-row :span="24">
    <ta-col>-->
    <ta-col :span="24">
      <ta-form-item label="家庭说明"
                    v-if="qtsf"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }"
                    fieldDecoratorId="familyExplain"
                    :fieldDecoratorOptions="submitNotSave?rules.familyExplain:rules.familyExplain1">
        <ta-textarea placeholder="请输入家庭说明"
                     :disabled="disabledM"
                     :rows="2" />
      </ta-form-item>
    </ta-col>
    <div v-if="qtsf">
      <div v-for="(i,e) in guardianArray"
           :key="e">
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">监护人{{e+1}}</p>
          <div class="horizontalline"></div>
          <div v-if="!disabledM">
            <ta-button type="primary"
                       @click="addOrg"
                       v-if="e==guardianArray.length-1">添加</ta-button>
            <ta-button type="primary"
                       @click="subtractOrg(e)"
                       v-if="guardianArray.length !='1'">删除</ta-button>
          </div>
        </div>
        <ta-col :span="6">
          <ta-form-item label="监护人"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorId="'guardian'+e"
                        :require="submitNotSave?{message:'请输入监护人'}:false">
            <ta-input placeholder="请输入监护人"
                      :disabled="disabledM" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="出生日期"
                        :fieldDecoratorId="'birthday'+e"
                        :require="submitNotSave?{message:'请选择出生日期'}:false"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-date-picker style="width: 100%;"
                            :disabled="disabledM"
                            :valid-now-time="'right'"
                            placeholder="请选择出生日期" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="性别"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorId="'sex'+e"
                        :require="submitNotSave?{message:'请选择性别'}:false">
            <ta-select placeholder="请选择性别"
                       :disabled="disabledM">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="监护人与儿童关系"
                        :fieldDecoratorId="'relationship'+e"
                        :require="submitNotSave?{message:'请选择监护人与儿童关系'}:false"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select placeholder="请选择监护人与儿童关系"
                       :disabled="disabledM">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in relationList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="证件类型"
                        :fieldDecoratorId="'idcardType'+e"
                        :require="submitNotSave?{message:'请选择证件类型'}:false"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select placeholder="请选择证件类型"
                       :disabled="disabledM">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in idcardList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="证件号"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorId="'idCard'+e"
                        :require="submitNotSave?{message:'请输入证件号'}:false">
            <ta-input placeholder="请输入证件号"
                      :disabled="disabledM" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="6">
          <ta-form-item label="联系电话"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :fieldDecoratorId="'contactNumber'+e"
                        :fieldDecoratorOptions="{rules: [{required:submitNotSave?true:false,message:'请输入联系电话'},{ phone: 'mobile', message: '输入的联系电话不合法'}]}">
            <ta-input placeholder="请输入联系电话"
                      :disabled="disabledM" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <AddressComponent :addressmodel="addreslistsmodel[e]"
                            :disabled="disabledM"
                            :labelwidth="labelwidth2"
                            :fileldName="'address_Linkage'+e"
                            :isRequire="submitNotSave?true:false"
                            @setaddress="actualAddress(e)"
                            :msg="'监护人家庭住址'"></AddressComponent>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="详细地址"
                        :labelCol="{span:5}"
                        :wrapperCol="{span:19}"
                        :fieldDecoratorId="'detail' + e"
                        :fieldDecoratorOptions="rules.detail">
            <ta-input placeholder="请输入详细地址"
                      :disabled="disabledM" />
          </ta-form-item>
        </ta-col>
      </div>
    </div>
    <!-- </ta-col>
    </ta-row>-->

    <!-- <ta-col :span="24">
      <ta-form-item
        label="变更说明"
        v-if="bg"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
        fieldDecoratorId="remark"
        :require="{message:'请输入变更说明!'}"
      >
        <ta-textarea placeholder="请输入变更说明" :rows="2" :disabled="disabledM" />
      </ta-form-item>
       <p class="warntext">
          <ta-icon type="info-circle-o" class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
    </ta-col>-->
    <ta-col :span="24">
      <ta-form-item label="家庭证明"
                    v-if="qtsf"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21}"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择收入证明'}]}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="adoptionIncome"
                   :multiple="true"
                   :action="action"
                   :fileList="incomeList"
                   :beforeUpload="beforeUpload"
                   @change="incomeFileChange"
                   @preview="preview">
          <ta-button :disabled="disabledM">
            <ta-icon type="upload" />上传文件
          </ta-button>
        </ta-upload>
        <p class="warntext"
           v-if="qtsf">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
    </ta-col>

    <ta-col :span="24"
            style="display:none">
      <ta-form-item label="低保证明"
                    v-if="qtsf"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21}"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择低保证明'}]}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="adoptionDiBao"
                   :multiple="true"
                   :action="action"
                   :fileList="diBaoList"
                   :beforeUpload="beforeUpload"
                   @change="diBaoChange"
                   @preview="preview">
          <ta-button :disabled="disabledM">
            <ta-icon type="upload" />上传文件
          </ta-button>
        </ta-upload>
        <p class="warntext"
           v-if="qtsf">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form-item>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="儿童术前照片"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="adoption1"
                   :multiple="true"
                   :action="action"
                   :fileList="fileListImg"
                   :beforeUpload="beforeUpload"
                   @change="upImgChange"
                   @preview="preview">
          <ta-button :disabled="disabledM">
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
      <ta-form-item label="儿童身份信息"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="adoption2"
                   :multiple="true"
                   :action="action"
                   :fileList="fileListCard"
                   :beforeUpload="beforeUpload"
                   @change="upCardChange"
                   @preview="preview">
          <ta-button :disabled="disabledM">
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
      <ta-form-item label="医疗信息附件"
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21}">
        <ta-upload :withCredentials="true"
                   name="file"
                   :data="adoption"
                   :multiple="true"
                   :action="action"
                   :fileList="fileListFile"
                   :beforeUpload="beforeUpload"
                   @change="upFileChange"
                   @preview="preview">
          <ta-button :disabled="disabledM">
            <ta-icon type="upload" />上传文件
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
export default {
  components: {
    AddressComponent
  },
  props: {
    bg: {
      type: Boolean,
      default: false
    },
    idcardList: {
      type: Array,
      required: true
    },
    relationList: {
      type: Array,
      required: true
    },
    fileListImg: {
      type: Array,
      required: true
    },
    fileListCard: {
      type: Array,
      required: true
    },
    fileListFile: {
      type: Array,
      required: true
    },
    incomeList: {
      type: Array,
      required: true
    },
    diBaoList: {
      type: Array,
      required: true
    },
    addressmodel2: {
      type: Array,
      required: true
    },
    addreslistsmodel: {
      type: Array,
      required: true
    },
    disabledM: {
      type: Boolean
    },
    goType: {
      type: String,
      default: '0'
    },
    ishide: {
      type: Boolean,
      default: true
    },
    qtsf: {
      type: Boolean,
      default: false
    },
    guardianArray: {
      type: Array,
      required: true
    },
    childidentitytypeList: {
      type: Array
      // required: true
    },
    disabledSel: {
      type: Boolean
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      labelwidth: {
        label: 9,
        wrapper: 15
      },
      labelwidth2: {
        label: 5,
        wrapper: 19
      },
      // 福利机构
      fljg: false,
      // 民政部门
      mzbm: false,
      nationList: [],
      sexList: [],
      diseasetypeList: [],
      yesnoList: [],
      // childidentitytypeList: [],
      jgName: true,
      name: '',
      adoption: {
        functionalType: 'f0'
      },
      adoption1: {
        functionalType: 'f1'
      },
      adoption2: {
        functionalType: 'f2'
      },
      adoptionIncome: {
        functionalType: 'f3'
      },
      adoptionDiBao: {
        functionalType: 'f4'
      },
      titleNum: 1,
      // disabledSel: false,
      rules: {
        contactTelephone: this.verificationRules('联系电话', { type: 'phone' }),
        contactTelephone1: this.verificationRulesNotMustFill('联系电话', { type: 'phone' }),
        rescueDiseaseName: this.verificationRules('救治病种名称', 20),
        rescueDiseaseName1: this.verificationRulesNotMustFill('救治病种名称', 20),
        // name: this.verificationRules('联系人', 72),
        familyExplain: this.verificationRules('家庭说明', 200, true),
        familyExplain1: this.verificationRulesNotMustFill('家庭说明', 200, true),
        contact: this.verificationRules('联系人', 72),
        contact1: this.verificationRulesNotMustFill('联系人', 72),
        detail: this.verificationRulesNotMustFill('详细地址', 100)
      },
      submitNotSave: false // 点击提交按钮true，点击暂存按钮false
    }
  },
  activated () {
    // this.childidentitytypeList = []
  },
  mounted () {
    this.getnation()
    this.getsexList()
    this.getdiseasetypeList()
    this.getyesnoList()
    // this.getchildidentitytypeList()
  },
  methods: {
    handleRemove (file, e) {
      let fileId = e.response.data.data.fileid
      let _self = this
      _self
        .post('file/deleteBatchFileByReturnFileIds', {
          returnFileIds: fileId
        })
        .then(response => {
          if (response.serviceSuccess == true) {
            _self.$message.success('文件删除成功!')
            this.file.splice(this.file.indexOf(val), 1)
          } else {
            _self.$message.error('文件删除失败!')
          }
        })
      // .catch(() => {

      // })
    },
    addOrg () {
      this.titleNum++
      this.guardianArray.push(this.titleNum)
      this.fieldDecoratorId = 'WelfareOrgBranch' + this.titleNum
      this.$emit('upload:guardianArray', this.guardianArray)
    },
    subtractOrg (e) {
      this.guardianArray.splice(e, 1)
      this.$emit('update:guardianArray', this.guardianArray)
    },
    actualAddress (e) {
      this.$emit('actualAddress', e)
    },
    setaddress2 () {
      this.$emit('setaddress2')
    },

    preview (file) {
      this.downloadFile(file)
    },
    // 低保证明
    diBaoChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:diBaoList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.goType == '4' || this.goType == '5' || this.goType == '11') {
          return false
        } else {
          this.$emit('update:diBaoList', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.diBaoList.splice(-1, 1)
          return false
        }
        this.diBaoList = info.fileList
        // 上传成功
        this.$emit('update:diBaoList', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    // 收入证明
    incomeFileChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:incomeList', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.goType == '4' || this.goType == '5' || this.goType == '11') {
          return false
        } else {
          this.$emit('update:incomeList', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.incomeList.splice(-1, 1)
          return false
        }
        this.incomeList = info.fileList
        // 上传成功
        this.$emit('update:incomeList', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    // 术前图片上传
    upImgChange (info) {
      if (info.file.status === 'uploading') {
        this.$emit('update:fileListImg', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.goType == '4' || this.goType == '5' || this.goType == '11') {
          return false
        } else {
          this.$emit('update:fileListImg', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileListImg.splice(-1, 1)
          return false
        }
        this.fileListImg = info.fileList
        // 上传成功
        this.$emit('update:fileListImg', info.fileList)
        this.$emit('clickSearch')

        this.$message.success('文件上传成功!')
      }
    },
    // 身份信息上传
    upCardChange (info) {
      if (info.file.status === 'uploading') {
        // this.fileListCard = info.fileList
        this.$emit('update:fileListCard', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.goType == '4' || this.goType == '5' || this.goType == '11') {
          return false
        } else {
          this.$emit('update:fileListCard', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileListCard.splice(-1, 1)
          return false
        }
        this.fileListCard = info.fileList
        // 上传成功
        this.$emit('update:fileListCard', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    // 医疗信息附件
    upFileChange (info) {
      if (info.file.status === 'uploading') {
        // this.fileListFile = info.fileList
        this.$emit('update:fileListFile', info.fileList)
      }
      if (info.file.status === 'removed') {
        if (this.goType == '4' || this.goType == '5' || this.goType == '11') {
          return false
        } else {
          this.$emit('update:fileListFile', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileListFile.splice(-1, 1)
          return false
        }
        this.fileListFile = info.fileList
        // 上传成功
        this.$emit('update:fileListFile', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    typeChange () {
      if (this.goType == '4' || this.goType == '5') {
        return false
      }
    },

    // 对name进行过滤,注意选项中必须要存在name字段
    filterNameOption (input, option) {
      return (
        option.data.props.key.toLowerCase().indexOf(input.toLowerCase()) >= 2
      )
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 救治病种类型
    async getdiseasetypeList () {
      let data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },
    // 是否
    async getyesnoList () {
      let data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    },
    // 儿童身份类型
    // async getchildidentitytypeList () {
    //   await this.getDictionaries('CHILDIDENTITYTYPE').then(res => {
    //     let data = res
    //     let orgType = window.parent.indexTool.getUserInfo().orgType
    //     if (orgType == '04') {
    //       alert(orgType)
    //       data.map((item, index) => {
    //         if (item.value == '1') {
    //           this.childidentitytypeList.push(item)
    //         }
    //       })
    //     } else if (orgType == '01') {
    //       data.map((item, index) => {
    //         if (item.value != '1') {
    //           this.childidentitytypeList.push(item)
    //         }
    //       })
    //     } else {
    //       this.childidentitytypeList = data
    //     }
    //   })
    // },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    filechange () {
      this.$emit('uochanhei')
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    }
  }
}
</script>
<style scoped lang="less">
.radios /deep/ .ant-radio-wrapper {
  margin-right: 9%;
}
.radios /deep/ .ant-radio-wrapper:nth-child(4) {
  margin-right: 0;
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
  width: calc(100% - 270px);
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
  width: 50px;
  height: 20px;
  // border-radius: 50%;
  text-align: center;
  line-height: 11px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #ccc;
  color: #1890ff;
  float: left;
  margin-right: 5px;
}
</style>
