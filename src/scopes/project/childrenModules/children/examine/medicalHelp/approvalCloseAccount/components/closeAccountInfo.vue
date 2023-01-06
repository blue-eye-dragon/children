
<template>
  <div>
    <div style="margin-bottom:20px">
      <div ref="fiveout"
           class="contfrime">
        <Title title="治疗情况"
               :show.sync="showfive"></Title>
        <ta-form layout="horizontal"
                 ref="five"
                 :autoFormCreate="(adoptedFromo)=>{this.adoptedFromo = adoptedFromo}">
          <ta-row class="fromintop">
            <ta-col :span="12">
              <ta-form-item label="定点医院"
                            fieldDecoratorId="medicalInstitutionName"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :fieldDecoratorOptions="rules.medicalInstitutionName">
                <ta-input placeholder="请输入定点医院"
                          :disabled="disabledT" />
                <!-- <ta-select placeholder="请选择定点医院名称" style="width : 100%" :disabled="disabledT">
                  <ta-select-option
                    :value="item.hospitalName"
                    v-for="(item,index) in medicalInstitutionNameList"
                    :key="index"
                  >{{item.hospitalName}}</ta-select-option>
                </ta-select> -->
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="是否住院"
                            fieldDecoratorId="hospitalization"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择是否住院!'}">
                <ta-select placeholder="请选择是否住院"
                           style="width : 100%"
                           :disabled="disabledT">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in yesnoList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item v-if="yesnoB"
                            label="住院日期"
                            fieldDecoratorId="admissionDate"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择住院日期!'}">
                <ta-date-picker style="width: 100%;"
                                :valid-now-time="'right'"
                                placeholder="请选择住院日期"
                                :disabled="disabledT" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item v-if="yesnoB"
                            label="出院日期"
                            fieldDecoratorId="dischargeDate"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择出院日期!'}">
                <ta-date-picker style="width: 100%;"
                                :valid-now-time="'right'"
                                placeholder="请选择出院日期"
                                :disabled="disabledT" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item v-if="yesnoB"
                            label="出院小结"
                            fieldDecoratorId="dischargeSummary"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:21}"
                            :fieldDecoratorOptions="rules.dischargeSummary">
                <ta-textarea placeholder="请填入出院小结"
                             :rows="2"
                             :disabled="disabledT" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="治疗评估效果"
                            fieldDecoratorId="therapeuticEvaluation"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择是否住院治疗!'}">
                <ta-select placeholder="请选择治疗评估效果"
                           style="width : 100%"
                           :disabled="disabledT">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in effectList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="评估日期"
                            fieldDecoratorId="valuationDate"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择评估日期!'}">
                <ta-date-picker style="width: 100%;"
                                :valid-now-time="'right'"
                                placeholder="请选择评估日期"
                                :disabled="disabledT" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="主管医师"
                            fieldDecoratorId="chiefPhysician"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :fieldDecoratorOptions="rules.chiefPhysician">
                <ta-input placeholder="请输入主管医师"
                          :disabled="disabledT" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="按拟制意见"
                            fieldDecoratorId="proposedPlacement"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请输入按拟制意见!'}">
                <ta-select placeholder="请选择按拟制意见"
                           style="width : 100%"
                           :disabled="disabledT">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in adviceList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="是否定点医院救治"
                            fieldDecoratorId="designatedHospital"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择!'}">
                <ta-select placeholder="请选择是否定点医院救治"
                           style="width : 100%"
                           :disabled="disabledT">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in yesnoList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="家庭/个人自付比例"
                            fieldDecoratorId="payScale"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请输入家庭/个人自付比例'}">

                <ta-input-number :min="0"
                                 :step="1"
                                 :max="100.00"
                                 :precision="2"
                                 :disabled="disabledT"
                                 style="width: 100%"
                                 placeholder="请输入家庭/个人自付比例"></ta-input-number>
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="儿童治疗后图片"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :data="adoption1"
                           :multiple="true"
                           :action="action"
                           :fileList="fileListChildImg"
                           @change="upfileImgChange"
                           :beforeUpload="beforeUpload"
                           @preview="preview">
                  <ta-button :disabled="disabledT">
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
        </ta-form>
      </div>
      <div ref="twoout"
           class="contfrime">
        <Title title="经费明细"
               :show.sync="showtwo"></Title>
        <p class="marsss"
           style="text-align:right">单位：元</p>
        <ta-form layout="horizontal"
                 ref="two"
                 :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
          <!-- <Title id="anchorpoint_a" title="医疗康复费用"></Title> -->
          <div style="margin-bottom: 30px;">
            <p>医疗康复费用:</p>
            <ul class="ulData">
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi">其他</li>
              <li class="ulDataLi lastLi">小计</li>

              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.rehabilitationTreatmentCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabilitationTreatmentCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.rehabilitationRehabilitationCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabilitationRehabilitationCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.rehabilitationDrugCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabilitationDrugCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.rehabilitationEquipmentCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabilitationEquipmentCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.rehabilitationMedicalCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabilitationMedicalCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.rehabilitationOtherCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeOne('rehabilitationOtherCost')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number v-model="obj.rehabilitationSubtotal"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 :disabled="disabledT"
                                 @blur="blurChangeOne('rehabilitationSubtotal')" />
              </li>
            </ul>
          </div>
          <!-- <Title id="anchorpoint_a" title="扣除项目"></Title> -->
          <div style="margin-bottom: 30px;">
            <p>扣除项目:</p>
            <ul class="ulData">
              <li class="ulDataLi">医保报销</li>
              <li class="ulDataLi">大病保险</li>
              <li class="ulDataLi">医疗救助</li>
              <li class="ulDataLi">康复救助</li>
              <li class="ulDataLi">慈善捐助</li>
              <li class="ulDataLi">其他</li>
              <li class="ulDataLi lastLi">小计</li>

              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.deductReimbursement"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeTwo('deductReimbursement')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.deductIllnessInsurance"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeTwo('deductIllnessInsurance')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.deductMedicalRescue"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeTwo('deductMedicalRescue')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.deductRehabilitationRescue"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeTwo('deductRehabilitationRescue')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.deductCharitableDonation"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeTwo('deductCharitableDonation')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.deductOtherCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeTwo('deductOtherCost')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number v-model="obj.deductSubtotal"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 :disabled="true"
                                 @blur="blurChangeTwo('deductSubtotal')" />
              </li>
            </ul>
          </div>
          <!-- <Title id="anchorpoint_a" title="申请“明天计划”资助金额"></Title> -->
          <div style="margin-bottom: 130px;">
            <p>申请“明天计划”资助金额:</p>
            <ul class="ulData">
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi">住宿服务费</li>
              <li class="ulDataLi lastLi">小计</li>

              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.fundTreatmentCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeThree('fundTreatmentCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.fundRehabilitationCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeThree('fundRehabilitationCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.fundDrugCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeThree('fundDrugCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.fundEquipmentCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeThree('fundEquipmentCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.fundMedicalCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeThree('fundMedicalCost')" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabledT"
                                 v-model="obj.fundAdmissionCost"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 @blur="blurChangeThree('fundAdmissionCost')" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number v-model="obj.fundSubtotal"
                                 :min="0"
                                 :max="max"
                                 :precision="precision"
                                 :disabled="true"
                                 @blur="blurChangeThree('fundSubtotal')" />
              </li>
            </ul>
          </div>
          <ta-row class="fromintop">
            <ta-col :span="24">
              <ta-form-item label="儿童治疗记录附件"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :data="adoption3"
                           :multiple="true"
                           :action="action"
                           :fileList="fileRecode"
                           @change="upCardChange"
                           :beforeUpload="beforeUpload"
                           @preview="preview">
                  <ta-button :disabled="disabledT">
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
              <ta-form-item label="其他票据附件"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :data="adoption4"
                           :multiple="true"
                           :action="action"
                           :fileList="fileqita"
                           @change="fileQitaChange"
                           :beforeUpload="beforeUpload"
                           @preview="preview">
                  <ta-button :disabled="disabledT">
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
        </ta-form>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
export default {
  components: {
    Title
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  props: {
    fileListChildImg: {
      type: Array,
      required: true
    },
    fileRecode: {
      type: Array,
      required: true
    },
    adviceList: {
      type: Array,
      required: true
    },
    effectList: {
      type: Array,
      required: true
    },
    yesnoList: {
      type: Array,
      required: true
    },
    fileqita: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledT: {
      type: Boolean,
      default: true
    },
    goType: {
      type: String
    },
    yesnoB: {
      type: Boolean
    },
    medicalInstitutionNameList: {
      type: Array
    }
  },
  data () {
    return {
      fileListCard: [],
      // fileListImg:[],
      // fileqita:[],
      // fileRecode:[],
      max: 9999999,
      // disabled: false,
      adoption1: {
        functionalType: 'f1'
      },
      adoption2: {
        functionalType: 'f2'
      },
      adoption3: {
        functionalType: 'f3'
      },
      adoption4: {
        functionalType: 'f4'
      },
      obj: {},
      sum: 0,
      sumTwo: 0,
      sumThree: 0,
      precision: 2,
      sumDisabled: true,
      showfive: true,
      showtwo: true,
      // :fieldDecoratorOptions="rules.materialName"
      rules: {
        medicalInstitutionName: this.verificationRules('医疗康复机构名称'),
        dischargeSummary: this.verificationRules('出院小结', 200, true),
        chiefPhysician: this.verificationRules('主管医师', 72),
        payScale: this.verificationRules('家庭/个人自付比例', 6)
        // dischargeSummary: this.verificationRules('出院小结', 200)
      }
    }
  },
  activated () {
    this.sum = 0
    this.sumTwo = 0
    this.sumThree = 0
    window.onresize = () => {
      console.log(this.showfive)
      // this.showone = true
      this.$nextTick(() => {
        this.setHeight('five', 'fiveout', !this.showfive)
        this.setHeight('two', 'twoout', !this.showtwo)
      })
    }
  },
  methods: {
    preview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },

    // 儿童治疗后照片
    upfileImgChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:fileListChildImg', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        console.log(this.goType)
        if (this.goType == '4') {
          return false
        } else {
          this.$emit('update:fileListChildImg', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          this.fileListChildImg.splice(-1, 1)
          return false
        }
        this.fileListChildImg = info.fileList
        // 上传成功
        this.$emit('update:fileListChildImg', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    // 儿童治疗记录附件
    upCardChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:fileRecode', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        if (this.goType == '4') {
          return false
        } else {
          this.$emit('update:fileRecode', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          this.fileRecode.splice(-1, 1)
          return false
        }
        this.fileRecode = info.fileList
        // 上传成功
        this.$emit('update:fileRecode', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    // 其他票据附件
    fileQitaChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.$emit('update:fileqita', info.fileList)
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
        if (this.goType == '4') {
          return false
        } else {
          this.$emit('update:fileqita', info.fileList)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length) {
          this.$message.error('上传失败')
          this.fileqita.splice(-1, 1)
          return false
        }
        this.fileqita = info.fileList
        // 上传成功
        this.$emit('update:fileqita', info.fileList)
        this.$emit('clickSearch')
        this.$message.success('文件上传成功!')
      }
    },
    blurChangeOne (e) {
      console.log(this.obj)
      for (var k in this.obj) {
        console.log(k)
        this.sum = 0
        if (e == k) {
          this.sum += this.obj[e]
        }
      }
      const data = this.sum.toFixed(2)
      console.log(this.sum)
      this.$set(this.obj, 'rehabilitationSubtotal', data)
      console.log(this.obj)
    },
    blurChangeTwo (e) {
      for (var k in this.obj) {
        if (e == k) {
          this.sumTwo += this.obj[e]
        }
      }
      const data = this.sumTwo.toFixed(2)
      this.$set(this.obj, 'deductSubtotal', data)
    },
    blurChangeThree (e) {
      for (var k in this.obj) {
        if (e == k) {
          this.sumThree += this.obj[e]
        }
      }
      const data = this.sumThree.toFixed(2)
      this.$set(this.obj, 'fundSubtotal', data)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    }
  },
  mounted () { },
  watch: {
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.ulData {
  width: 100%;
  height: 100%;
  margin: 10px 0 10px 0;
  border-radius: 4px 4px 0 0;
  margin-left: 2%;
}
.ulData li {
  list-style: none;
  float: left;
  width: 14%;
  height: 46px;
  line-height: 46px;
  text-align: center;
}
.ulData .ulDataLi {
  /* background: #d4eaff; */
  /* border: 1px solid rgba(0, 0, 0, 0.09); */
  background: rgba(240, 247, 253, 1);
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
  /* border-radius: 4px 4px 0px 0px; */
}
.ulData .lastLi {
  border-right: 1px solid rgba(0, 0, 0, 0.09);
}
.ulData .ulDataLiTwo,
.ulData .ulDataLiThree,
.ulData .ulDataLiFour {
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
}
.ulData .ulDataLiFour {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.ant-input-number {
  border: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.contfrime {
  overflow: hidden;
}
.marsss {
  width: 100%;
  // margin-bottom: 15px;
  /* border: 1px dashed rgba(0, 0, 0, 0.34901960784313724); */
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
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
</style>
