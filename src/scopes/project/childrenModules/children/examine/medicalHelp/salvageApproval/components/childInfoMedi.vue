<template>
  <!-- 医疗申请信息 -->
  <ta-row class="fromcom">
    <ta-col :span="24"
            class="setWidth">
      <ta-col :span="6">
        <AddressComponent :addressmodel="addressmodel"
                          :disabled="disabledM"
                          @setaddress="setaddress"
                          :msg="'地区'"></AddressComponent>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="申请日期"
                      fieldDecoratorId="applyDate"
                      :require="{message:'请输选择申请日期!'}">
          <ta-date-picker style="width: 100%;"
                          :disabled="disabledM"
                          :valid-now-time="'right'"
                          placeholder="请选择申请日期" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="救治病种类型"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="rescueDiseaseType"
                      :require="{message:'请选择救治病种类型!'}">
          <ta-select placeholder="请选择救治病种类型"
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
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="whetherAddmedicalInsurance"
                      :require="{message:'请选择是否加入医保!'}">
          <ta-select placeholder="请选择是否加入医保"
                     style="width : 100%"
                     :disabled="disabledM">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in yesnoList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24"
            class="setWidth">
      <ta-col :span="6">
        <ta-form-item label="联系人"
                      fieldDecoratorId="contact"
                      :fieldDecoratorOptions="rules.contact">
          <ta-input placeholder="请输入联系人"
                    :disabled="disabledM" />
        </ta-form-item>

      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="儿童身份类型"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="childIdentityType"
                      :require="{message:'请选择儿童身份类型!'}">
          <ta-select placeholder="请选择儿童身份类型"
                     :disabled="disabledM"
                     style="width : 100%">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in childidentitytypeList "
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="救治病种名称"
                      :labelCol="{ span: 10 }"
                      :wrapperCol="{span:14}"
                      fieldDecoratorId="rescueDiseaseName"
                      :fieldDecoratorOptions="rules.rescueDiseaseName">
          <ta-input placeholder="请输入救治病种名称"
                    :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactTelephone"
                      :require="{message:'请输入联系电话!'}"
                      :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的联系电话不合法'}]}">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24"
            class="setWidth">
      <ta-col :span="6">
        <ta-form-item label="所属机构"
                      fieldDecoratorId="applyUnit"
                      :require="{message:'请输入所属机构!'}">
          <ta-input placeholder="请输入所属机构"
                    :disabled="jgName" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="6">
        <ta-form-item label="家庭人均年收入(元)"
                      :labelCol="{ span: 12 }"
                      :wrapperCol="{span:12}"
                      v-if="qtsf"
                      fieldDecoratorId="familyAverageAnnualIncome"
                      :require="{message:'请输入家庭人均年收入!'}">
          <ta-input-number :min="0"
                           style="width:100%"
                           :max="99999999"
                           :precision="2"
                           placeholder="请输入家庭人均年收入"
                           :disabled="disabledM" />
        </ta-form-item>
      </ta-col>
    </ta-col>
    <ta-col :span="24">
      <ta-form-item label="家庭说明"
                    v-if="qtsf"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22 }"
                    fieldDecoratorId="familyExplain"
                    :fieldDecoratorOptions="rules.familyExplain">
        <ta-textarea placeholder="请输入家庭说明"
                     :disabled="disabledM"
                     :rows="2" />
      </ta-form-item>
    </ta-col>
    <!-- <ta-row :span="24">
    <ta-col>-->
    <div v-if="qtsf">
      <div v-for="(i,e) in guardianArray"
           :key="e">
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text">监护人{{e+1}}</p>
          <div class="horizontalline"></div>
          <div v-if="!disabledM">
            <div class="addBtn cursors"
                 @click="addOrg"
                 v-if="e==guardianArray.length-1">+</div>
            <div class="addBtn cursors"
                 @click="subtractOrg(e)"
                 v-if="guardianArray.length !='1'">-</div>
          </div>
        </div>
        <ta-col :span="24"
                class="setWidth">
          <ta-col :span="6">
            <ta-form-item label="监护人"
                          :fieldDecoratorId="'guardian'+e"
                          :require="{message:'请输入监护人!'}">
              <ta-input placeholder="请输入监护人"
                        :disabled="disabledM" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="出生日期"
                          :fieldDecoratorId="'birthday'+e"
                          :require="{message:'请选择出生日期!'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabledM"
                              :valid-now-time="'right'"
                              placeholder="请选择出生日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="性别"
                          :fieldDecoratorId="'sex'+e"
                          :require="{message:'请选择性别!'}">
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
                          :require="{message:'请选择监护人与儿童关系!'}">
              <ta-select placeholder="请选择监护人与儿童关系"
                         :disabled="disabledM">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in relationList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24"
                class="setWidth">
          <ta-col :span="6">
            <ta-form-item label="证件类型"
                          :fieldDecoratorId="'idcardType'+e"
                          :require="{message:'请选择证件类型!'}">
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
                          :fieldDecoratorId="'idCard'+e"
                          :require="{message:'请输入证件号!'}">
              <ta-input placeholder="请输入证件号"
                        :disabled="disabledM" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="联系电话"
                          :require="{message:'请输入联系电话!'}"
                          :fieldDecoratorId="'contactNumber'+e"
                          :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的联系电话不合法'}]}">
              <ta-input placeholder="请输入联系电话"
                        :disabled="disabledM" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="6">
            <AddressComponent :addressmodel="addreslistsmodel[e]"
                              :labelwidth="{label:11, wrapper:13}"
                              :disabled="
                              disabledM"
                              :fileldName="'address_Linkage'+e"
                              @setaddress="actualAddress(e)"
                              :msg="'监护人家庭住址'"></AddressComponent>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="详细地址"
                          :fieldDecoratorId="'detail' + e"
                          :require="{message:'请输入详细地址!'}">
              <ta-input placeholder="请输入详细地址"
                        :disabled="disabledM" />
            </ta-form-item>
          </ta-col>
        </ta-col>
      </div>
    </div>
    <ta-col :span="24">
      <ta-form-item label="家庭证明"
                    class="alonerow"
                    v-if="qtsf"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22}"
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
                    class="alonerow"
                    v-if="qtsf"
                    :labelCol="{ span: 2 }"
                    :wrapperCol="{ span: 22}"
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
                    class="alonerow">
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
                    class="alonerow">
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
                    class="alonerow">
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
    addressmodel: {
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
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      // 福利机构
      fljg: false,
      // 民政部门
      mzbm: false,
      nationList: [],
      sexList: [],
      diseasetypeList: [],
      yesnoList: [],
      childidentitytypeList: [],
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
      rules: {
        rescueDiseaseName: this.verificationRules('救治病种名称', 20),
        // name: this.verificationRules('联系人', 72),
        familyExplain: this.verificationRules('家庭说明', 200, true),
        contact: this.verificationRules('联系人', 72)
      }
    }
  },
  activated () {
    this.setLabelAndWrapperWidth('35%', '65%', 'setWidth', null, ['rescueDiseaseType', 'whetherAddmedicalInsurance', 'rescueDiseaseName', 'childIdentityType', 'familyAverageAnnualIncome']) // 字段宽度控制
    this.setLabelAndWrapperWidth('9%', '91%', 'alonerow') // 单独一行的字段宽度控制
  },
  mounted () {
    this.getnation()
    this.getsexList()
    this.getdiseasetypeList()
    this.getyesnoList()
    this.getchildidentitytypeList()
  },
  methods: {
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
    setaddress () {
      console.log('zou')
      this.$emit('setaddress')
    },

    preview (file) {
      this.downloadFile(file)
    },
    // 低保证明
    diBaoChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:diBaoList', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
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
        console.log(info.file.status)
        this.$emit('update:incomeList', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
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
      console.log(info)
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:fileListImg', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        console.log(this.goType)
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
        console.log(this.fileListImg)
        this.$emit('clickSearch')

        this.$message.success('文件上传成功!')
      }
    },
    // 身份信息上传
    upCardChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        // this.fileListCard = info.fileList
        this.$emit('update:fileListCard', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
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
        console.log(this.fileListCard)
        this.$emit('update:fileListCard', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    // 医疗信息附件
    upFileChange (info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        // this.fileListFile = info.fileList
        this.$emit('update:fileListFile', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
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
        console.log(this.fileListFile)
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
      console.log('********1*****')
      console.log(input)
      console.log('*********2****')
      console.log(option)
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
    async getchildidentitytypeList () {
      let data = await this.getDictionaries('CHILDIDENTITYTYPE')
      this.childidentitytypeList = data
    },
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
</style>
