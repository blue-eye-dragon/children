
<template>
  <div>
    <div>
      <p class="textSize">医疗康复费用:</p>
      <ul class="ulData">
        <li class="ulDataLi">诊疗费用</li>
        <li class="ulDataLi">康复费用</li>
        <li class="ulDataLi">特殊药品费用</li>
        <li class="ulDataLi">康复器具费用</li>
        <li class="ulDataLi">体检费用</li>
        <li class="ulDataLi">其他</li>
        <li class="ulDataLi lastLi">小计</li>

        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj.rehabilitationTreatmentCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeOne('rehabilitationTreatmentCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj.rehabilitationRehabilitationCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeOne('rehabilitationRehabilitationCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj.rehabilitationDrugCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeOne('rehabilitationDrugCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj.rehabilitationEquipmentCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeOne('rehabilitationEquipmentCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj.rehabilitationMedicalCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeOne('rehabilitationMedicalCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj.rehabilitationOtherCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeOne('rehabilitationOtherCost')" />
        </li>
        <li class="ulDataLiTwo lastLi">
          <ta-input-number v-model="obj.rehabilitationSubtotal"
                           :min="0"
                           :max="max"
                           :precision="2"
                           :disabled="true"
                           @blur="blurChangeOne('rehabilitationSubtotal')" />
        </li>
      </ul>
    </div>
    <div>
      <p class="textSize">扣除项目:</p>
      <ul class="ulData">
        <li class="ulDataLi">医保报销</li>
        <li class="ulDataLi">大病保险</li>
        <li class="ulDataLi">医疗救助</li>
        <li class="ulDataLi">康复救助</li>
        <li class="ulDataLi">慈善捐助</li>
        <li class="ulDataLi">其他</li>
        <li class="ulDataLi lastLi">小计</li>

        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj2.deductReimbursement"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeTwo('deductReimbursement')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj2.deductIllnessInsurance"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeTwo('deductIllnessInsurance')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj2.deductMedicalRescue"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeTwo('deductMedicalRescue')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj2.deductRehabilitationRescue"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeTwo('deductRehabilitationRescue')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj2.deductCharitableDonation"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeTwo('deductCharitableDonation')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj2.deductOtherCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeTwo('deductOtherCost')" />
        </li>
        <li class="ulDataLiTwo lastLi">
          <ta-input-number v-model="obj2.deductSubtotal"
                           :min="0"
                           :max="max"
                           :precision="2"
                           :disabled="true"
                           @blur="blurChangeTwo('deductSubtotal')" />
        </li>
      </ul>
    </div>
    <div style="margin-bottom: 30px;">
      <p class="textSize">申请“明天计划”资助金额:</p>
      <ul class="ulData">
        <li class="ulDataLi">诊疗费用</li>
        <li class="ulDataLi">康复费用</li>
        <li class="ulDataLi">特殊药品费用</li>
        <li class="ulDataLi">康复器具费用</li>
        <li class="ulDataLi">体检费用</li>
        <li class="ulDataLi">住院服务费</li>
        <li class="ulDataLi lastLi">小计</li>

        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj3.fundTreatmentCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeThree('fundTreatmentCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj3.fundRehabilitationCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeThree('fundRehabilitationCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj3.fundDrugCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeThree('fundDrugCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj3.fundEquipmentCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeThree('fundEquipmentCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj3.fundMedicalCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeThree('fundMedicalCost')" />
        </li>
        <li class="ulDataLiTwo">
          <ta-input-number :disabled="disabled"
                           v-model="obj3.fundAdmissionCost"
                           :min="0"
                           :max="max"
                           :precision="2"
                           @blur="blurChangeThree('fundAdmissionCost')" />
        </li>
        <li class="ulDataLiTwo lastLi">
          <ta-input-number v-model="obj3.fundSubtotal"
                           :min="0"
                           :max="max"
                           :precision="2"
                           :disabled="true"
                           @blur="blurChangeThree('fundSubtotal')" />
        </li>
      </ul>
    </div>
    <ta-row class="fromintop">
      <ta-col :span="24">
        <ta-form-item label="相关医疗票据"
                      :labelCol="{ span: 2 }"
                      :wrapperCol="{ span: 22}">
          <ta-upload :withCredentials="true"
                     :multiple="true"
                     :action="action"
                     name="file"
                     :disabled="disabled"
                     :fileList="fileList"
                     @remove="handleRemove"
                     @preview="preview"
                     :data="fileData"
                     :beforeUpload="beforeUpload"
                     @change="filechange($event,'other')">
            <ta-button>
              <ta-icon type="upload" /> 上传文件
            </ta-button>
          </ta-upload>
          <p class="warntext">
            <ta-icon type="info-circle-o"
                     class="icons" />{{childTypeName}}提供儿童诊疗、康复、特殊药品、康复器具、体检票据。附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
          </p>
        </ta-form-item>
      </ta-col>
    </ta-row>
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
    disabled: {
      type: Boolean,
      default: false
    },
    childId: {
      type: String
    },
    childTypeName: {
      type: String,
      Default: ''
    }
  },
  data () {
    return {
      max: 9999999,
      obj: {}, // 医疗康复费用对象
      obj2: {}, // 扣除项目对象
      obj3: {}, // 申请“明天计划”资助金额
      fileList: [], // 相关医疗票据
      // 上传需要的参数
      fileData: {
        busiType: 11,
        functionalType: '2'
      }
    }
  },
  methods: {
    // 医疗康复费用change事件
    blurChangeOne (e) {
      this.sum = 0
      for (var k in this.obj) {
        if (this.obj[k] != undefined) {
          this.sum += this.obj[k]
        }
      }
      if (this.obj.rehabilitationSubtotal) {
        this.sum = this.sum - this.obj.rehabilitationSubtotal
      }
      if (this.obj.updateTime) {
        this.sum = this.obj.rehabilitationTreatmentCost + this.obj.rehabilitationRehabilitationCost +
          this.obj.rehabilitationDrugCost + this.obj.rehabilitationEquipmentCost +
          this.obj.rehabilitationMedicalCost + this.obj.rehabilitationOtherCost
      }
      this.$set(this.obj, 'rehabilitationSubtotal', this.sum)
    },
    // 扣除项目change事件
    blurChangeTwo (e) {
      this.sumTwo = 0
      for (var k in this.obj2) {
        if (this.obj2[k] != undefined) {
          this.sumTwo += this.obj2[k]
        }
      }
      if (this.obj2.deductSubtotal) {
        this.sumTwo = this.sumTwo - this.obj2.deductSubtotal
      }
      this.$set(this.obj2, 'deductSubtotal', this.sumTwo)
    },
    // 申请“明天计划”资助金额change事件
    async blurChangeThree (e) {
      if (e == 'fundRehabilitationCost' || e == 'fundMedicalCost' || e == 'fundAdmissionCost') {
        const params = {}
        if (e == 'fundRehabilitationCost') {
          params.fundRehabilitationCost = this.obj3[e]
        }
        if (e == 'fundMedicalCost') {
          params.fundMedicalCost = this.obj3[e]
        }
        if (e == 'fundAdmissionCost') {
          params.fundAdmissionCost = this.obj3[e]
        }
        params.childId = this.childId
        const data = await this.post('/medicalRescueSettlement/amountCheck', params)
        if (!data.data.data.result) {
          this.$confirm({
            title: data.data.data.reason,
            onOk: () => {
              console.log('OK')
            },
            onCancel: () => {
              this.obj3[e] = undefined
              this.sumThree = 0
              for (var k in this.obj3) {
                if (this.obj3[k] != undefined) {
                  this.sumThree += this.obj3[k]
                }
              }
              if (this.obj3.fundSubtotal) {
                this.sumThree = this.sumThree - this.obj3.fundSubtotal
              }
              this.$set(this.obj3, 'fundSubtotal', this.sumThree)
            }
          })
        }
      }
      this.sumThree = 0
      for (var k in this.obj3) {
        if (this.obj3[k] != undefined) {
          this.sumThree += this.obj3[k]
        }
      }
      if (this.obj3.fundSubtotal) {
        this.sumThree = this.sumThree - this.obj3.fundSubtotal
      }
      this.$set(this.obj3, 'fundSubtotal', this.sumThree)
    },
    // 附件预览
    preview (file) { this.downloadFile(file) },
    // 附件change事件
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

      this.$emit('uochanhei')
    },
    // 附件上传前的验证
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 附件删除
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
          _self.$emit('fileDataProcess', 'del', fileId)
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
      this.$emit('uochanhei')
    }
  }

}
</script>
<style scoped lang="less">
.ulData {
  width: 100%;
  height: 100px;
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
  font-size: 16px;
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
.textSize {
  font-size: 16px;
  padding-top: 20px;
}
.warntext {
  width: 100%;
  height: 75px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
