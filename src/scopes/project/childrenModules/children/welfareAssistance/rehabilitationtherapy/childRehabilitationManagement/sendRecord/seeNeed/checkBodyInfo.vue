<template>
  <!-- 体检--操作 -->
  <div class="conts">
    <div class="contin">
      <ta-form layout="horizontal"
               :autoFormCreate="(checkFrom)=>{this.checkFrom = checkFrom}">
        <ta-row class="fromcom"
                style=" margin-bottom: 200px;">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="体检日期"
                            fieldDecoratorId="examinationDate"
                            :require="{message:'请选择体检日期'}">
                <ta-date-picker :disabled="noEdit"
                                style="width: 100%;"
                                placeholder="请选择体检日期"
                                :disabledDate="disabledDate" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="诊断"
                          class="textarea"
                          fieldDecoratorId="diagnosis"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入诊断" />
            </ta-form-item>
            <ta-form-item label="既往史"
                          class="textarea"
                          fieldDecoratorId="pastMedicalHistory"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入既往史" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="身高（CM）"
                            fieldDecoratorId="height">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入身高（CM）" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="体重（KG）"
                            fieldDecoratorId="weight">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入体重（KG）" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="坐高（CM）"
                            fieldDecoratorId="sittingHeight">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入坐高（CM）" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="胸围（CM）"
                            fieldDecoratorId="theChest">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入胸围（CM）" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="头围（CM）"
                            fieldDecoratorId="headCircumference">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入头围（CM）" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="营养"
                            fieldDecoratorId="nutrition"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('营养',20)">
                <ta-input :disabled="noEdit"
                          placeholder="请输入营养" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="视力 左"
                            fieldDecoratorId="visionLeft">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入左眼视力" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="右"
                            fieldDecoratorId="visionRight">
                <ta-input-number :disabled="noEdit"
                                 :min="1"
                                 :max="9999"
                                 :precision="2"
                                 style="width:100%"
                                 placeholder="请输入右眼视力" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="眼球协调"
                            fieldDecoratorId="eyeCoordination">
                <ta-select :disabled="noEdit"
                           placeholder="请选择眼球协调">
                  <ta-select-option v-for="(item,index) in eyeList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="斜视"
                            fieldDecoratorId="strabismus"
                            :initValue="[]">
                <!--     <ta-checkbox-group :options="plainOptions" :value="checkList" @change="onChange" />
            :value="checkList" @change="onChange"
            -->
                <ta-checkbox-group :disabled="noEdit">
                  <ta-checkbox v-for="(item,index) in rfList "
                               :key="index"
                               :value="item.value">{{item.label}}</ta-checkbox>
                </ta-checkbox-group>
                <!-- <ta-select :disabled="noEdit" placeholder="请选择斜视">
              <ta-select-option
                v-for="(item,index) in eyeList "
                :key="index"
                :value="item.value"
              >{{item.label}}</ta-select-option>
            </ta-select>-->
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="眼震"
                            fieldDecoratorId="eyeShake"
                            :initValue="[]">
                <!-- <ta-checkbox-group :options="plainOptions" :value="checkList" @change="onChange" /> -->
                <ta-checkbox-group :disabled="noEdit">
                  <ta-checkbox v-for="(item,index) in rfList "
                               :key="index"
                               :value="item.value">{{item.label}}</ta-checkbox>
                </ta-checkbox-group>
                <!-- <ta-select :disabled="noEdit" placeholder="请选择眼震">
              <ta-select-option
                v-for="(item,index) in eyeList "
                :key="index"
                :value="item.value"
              >{{item.label}}</ta-select-option>
            </ta-select>-->
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="鼻腔通畅"
                            fieldDecoratorId="nasalPatency"
                            :initValue="[]">
                <ta-checkbox-group :disabled="noEdit">
                  <ta-checkbox v-for="(item,index) in rfList "
                               :key="index"
                               :value="item.value">{{item.label}}</ta-checkbox>
                </ta-checkbox-group>
                <!-- <ta-select :disabled="noEdit" placeholder="请选择鼻腔通畅">
              <ta-select-option
                v-for="(item,index) in eyeList "
                :key="index"
                :value="item.value"
              >{{item.label}}</ta-select-option>
            </ta-select>-->
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="扁平鼻"
                            fieldDecoratorId="flatNose">
                <ta-select :disabled="noEdit"
                           placeholder="请选择扁平鼻">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="息肉"
                            fieldDecoratorId="polyps">
                <ta-select :disabled="noEdit"
                           placeholder="请选择息肉">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="鼻中隔扭曲"
                            fieldDecoratorId="septumContorted">
                <ta-select :disabled="noEdit"
                           placeholder="请选择鼻中隔扭曲">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="唇（情况）"
                          class="textarea"
                          fieldDecoratorId="lipCcondition"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入唇（情况）" />
            </ta-form-item>
            <ta-form-item label="牙齿（情况）"
                          class="textarea1"
                          fieldDecoratorId="teethCcondition"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入牙齿（情况）" />
            </ta-form-item>
            <ta-form-item label="牙齿排列"
                          class="textarea"
                          fieldDecoratorId="teethArranged"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入牙齿排列" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="舌"
                            fieldDecoratorId="theTongue">
                <ta-select :disabled="noEdit"
                           placeholder="请选择舌">
                  <ta-select-option v-for="(item,index) in theTongueList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="吞咽功能"
                            fieldDecoratorId="swallowingFunction">
                <ta-select :disabled="noEdit"
                           placeholder="请选择吞咽功能">
                  <ta-select-option v-for="(item,index) in SWALLOWINGList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="咀嚼功能"
                            fieldDecoratorId="chewingFunction">
                <ta-select :disabled="noEdit"
                           placeholder="请选择咀嚼功能">
                  <ta-select-option v-for="(item,index) in chewingFunctionList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="听觉"
                          class="textarea"
                          fieldDecoratorId="auditory"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入听觉" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="颈部"
                            fieldDecoratorId="theNeck">
                <ta-select :disabled="noEdit"
                           placeholder="请选择颈部">
                  <ta-select-option v-for="(item,index) in THENECKList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="胸部"
                            fieldDecoratorId="chest">
                <ta-select :disabled="noEdit"
                           placeholder="请选择胸部">
                  <ta-select-option v-for="(item,index) in CHESTList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="肩部"
                            fieldDecoratorId="theShoulder">
                <ta-select :disabled="noEdit"
                           placeholder="请选择肩部">
                  <ta-select-option v-for="(item,index) in THESHOULDERList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="上肢"
                            fieldDecoratorId="upperLimb">
                <ta-select :disabled="noEdit"
                           placeholder="请选择上肢">
                  <ta-select-option v-for="(item,index) in UPPERLIMBList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="手"
                            fieldDecoratorId="hand">
                <ta-select :disabled="noEdit"
                           placeholder="请选择手">
                  <ta-select-option v-for="(item,index) in HANDList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="脊柱"
                            fieldDecoratorId="theSpine">
                <ta-select :disabled="noEdit"
                           placeholder="请选择脊柱">
                  <ta-select-option v-for="(item,index) in THESPINEList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="双下肢"
                            fieldDecoratorId="doubleLowerLimbs">
                <ta-select :disabled="noEdit"
                           placeholder="请选择双下肢">
                  <ta-select-option v-for="(item,index) in DOUBLELOWERLIMBSList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="足"
                            fieldDecoratorId="theFoot">
                <ta-select :disabled="noEdit"
                           placeholder="请选择足">
                  <ta-select-option v-for="(item,index) in THEFOOTLsit "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="脚趾"
                            fieldDecoratorId="toes">
                <ta-select :disabled="noEdit"
                           placeholder="请选择脚趾">
                  <ta-select-option v-for="(item,index) in bnormalList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="步态"
                            fieldDecoratorId="theGait">
                <ta-select :disabled="noEdit"
                           placeholder="请选择步态">
                  <ta-select-option v-for="(item,index) in THEGAITList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="肌张力检查"
                            fieldDecoratorId="myotonometry">
                <ta-select :disabled="noEdit"
                           placeholder="请选择肌张力检查">
                  <ta-select-option v-for="(item,index) in MYOTONOMETRYList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="语言功能"
                            fieldDecoratorId="languageFeatures">
                <ta-select :disabled="noEdit"
                           placeholder="请选择语言功能">
                  <ta-select-option v-for="(item,index) in LANGUAGEFEATURESList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="精神状态"
                            fieldDecoratorId="mentalState">
                <ta-select :disabled="noEdit"
                           placeholder="请选择精神状态">
                  <ta-select-option v-for="(item,index) in MENTALSTATEList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="情绪与行为"
                            fieldDecoratorId="emotionBehavior">
                <ta-select :disabled="noEdit"
                           placeholder="请选择情绪与行为">
                  <ta-select-option v-for="(item,index) in EMOTIONBEHAVIORList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="记忆力"
                            fieldDecoratorId="memory">
                <ta-select :disabled="noEdit"
                           placeholder="请选择记忆力">
                  <ta-select-option v-for="(item,index) in MEMORYList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="注意力"
                            fieldDecoratorId="attention">
                <ta-select :disabled="noEdit"
                           placeholder="请选择注意力">
                  <ta-select-option v-for="(item,index) in ATTENTIONList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="配合程度"
                            fieldDecoratorId="cooperateDegree">
                <ta-select :disabled="noEdit"
                           placeholder="请选择配合程度">
                  <ta-select-option v-for="(item,index) in COOPERATEDEGREEList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="运动能力"
                            fieldDecoratorId="sportsAbility">
                <ta-select :disabled="noEdit"
                           placeholder="请选择运动能力">
                  <ta-select-option v-for="(item,index) in bnormalList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="呼吸系统疾病"
                          class="textarea1"
                          fieldDecoratorId="respiratoryDiseases"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入呼吸系统疾病" />
            </ta-form-item>

            <ta-form-item label="体检小结"
                          class="textarea"
                          fieldDecoratorId="medicalSummary"
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnmustKeep }]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请输入体检小结" />
            </ta-form-item>
            <ta-form-item label="附件"
                          fieldDecoratorId="uploadFileT"
                          :require="{message:'请上传附件'}"
                          :labelCol="{ span: 3 }">
              <ta-upload :withCredentials="true"
                         name="file"
                         :data="goTo_"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         @change="handleChange"
                         @preview="confirmDownload"
                         :beforeUpload="beforeUpload">
                <!-- @remove="handleRemove('fileList',$event)" -->
                <ta-button v-if="!noEdit">
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
    <div class="bom">
      <ta-button type="primary"
                 v-if="!noEdit"
                 class="preservation"
                 @click="save">保存</ta-button>
      <ta-button v-if="noEdit"
                 class="preservation"
                 @click="back">返回</ta-button>
      <ta-button v-if="!noEdit"
                 @click="back">取消</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import moment from 'moment'
const plainOptions = [
  {
    label: '左',
    value: '1'
  },
  {
    label: '右',
    value: '2'
  }
]
export default {
  moment,
  name: 'register',
  components: {
    Title
  },
  data () {
    return {
      eyeList: [],
      theTongueList: [],
      chewingFunctionList: [],
      rfList: [],
      SWALLOWINGList: [],
      THENECKList: [],
      CHESTList: [],
      THESHOULDERList: [],
      HANDList: [],
      UPPERLIMBList: [],
      THESPINEList: [],
      DOUBLELOWERLIMBSList: [],
      THEGAITList: [],
      THEFOOTLsit: [],
      MYOTONOMETRYList: [],
      LANGUAGEFEATURESList: [],
      EMOTIONBEHAVIORList: [],
      MENTALSTATEList: [],
      ATTENTIONList: [],
      MEMORYList: [],
      COOPERATEDEGREEList: [],
      yesNoList: [],
      bnormalList: [
        { label: '正常', value: '1' },
        { label: '不正常', value: '2' }
      ],

      nowkey: '1',

      noEdit: true,

      goTo_: {
        functionalType: 1,
        busiType: 31
      },
      fileList: [],
      relationIds: '',
      fileIds: [],
      ids: '',
      types: '',
      contextId: '',
      moveIdList: ''
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  created () { },
  activated () {
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'textarea') // 文本框 字段宽度控制
    this.setLabelAndWrapperWidth('7%', '93%', 'textarea1') // 牙齿（情况）、呼吸系统疾病 字段宽度控制
    this.reset()
    let params = this.$route.query
    this.ids = params.ids // 当前操作数据id(或康复id)
    this.types = params.types // 当前操作类型
    this.dataInt(this.types, this.ids)
  },
  mounted () {
    // 是否初始化数据
    this.getLists()
    // this.getGuardianshipList()
    // this.getyesOrNo()
    // this.getsexList()
    // this.geteyeList()
  },
  methods: {
    con (v) {
      console.log(v)
    },
    // onChange (v) {
    //   this.checkList = v
    // },
    fnValidateMore (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '', value, callback, '0')
    },
    fnmustKeep (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '体检小结', value, callback)
    },

    dataInt (types, ids) {
      // 初始化数据？
      switch (types) {
        case 1: // 新增
          this.noEdit = false

          break
        case 2: // 编辑
          this.noEdit = false
          this.datas(ids)
          break
        case 3: // 查看
          this.noEdit = true
          this.datas(ids)
          break
        default:
          break
      }
    },
    reset () {
      this.moveIdList = ''
      this.fileIds = []
      this.fileList = []
    },
    // 体检日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (!this.noEdit) {
          this.fileList = info.fileList

          this.moveIdList += info.file.response.data.data.fileid + ','
        } else {
          return false
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList

        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    confirmDownload (file) {
      this.downloadFile(file)
    },
    thetwo (a) {
      let pos = ''
      if (a) {
        a.forEach(e => {
          if (e && e != '') {
            pos += e + ','
          }
        })
        return pos.toString().substring(0, pos.length - 1)
      } else {
        return null
      }
    },
    async save () {
      if (this.fileList.length == '0') {
        this.checkFrom.setFieldsValue({
          uploadFileT: null
        })
      }

      this.checkFrom.validateFields(async (err, values) => {
        if (!err) {
          let params = this.checkFrom.getFieldsValue()
          this.changetime(params)

          let url = ''
          if (this.types == 1) {
            url = '/medicalInformation/save'
            params.rehabiliteId = this.ids
          }
          if (this.types == 2) {
            // 编辑
            url = '/medicalInformation/update'
            params.id = this.contextId
          }
          params = this.addother(params)
          params.strabismus = params.strabismus.toString()
          params.nasalPatency = params.nasalPatency.toString()
          params.eyeShake = params.eyeShake.toString()
          let res = await this.post(url, params)
          this.moveIdList = this.moveIdList.substring(
            0,
            this.moveIdList.length - 1
          )
          if (this.moveIdList) {
            let res2 = await this.post('file/deleteBatchFileByReturnFileIds', {
              returnFileIds: this.moveIdList
            })
          }

          if (!res.errors) {
            this.back()
          } else {
          }
        } else {
          this.$message.error('请完整填写必填项信息')
        }
      })
    },
    addother (obj) {
      this.fileIds = []
      obj.rehabiliteId = this.ids // 添加相应的康复id
      let resultId = ''
      let upLoadPathIds = [...this.fileList]
      upLoadPathIds.map(item => {
        this.fileIds.push(item.response.data.data.fileid)
      })
      resultId = this.fileIds.join(',')

      obj.upLoadPathId = resultId

      return obj
    },
    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组

        if (
          k != 'uploadFileT' &&
          !(data[k] instanceof Array) &&
          data[k] instanceof Object
        ) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
      }
    },

    // ----
    async datas (ids) {
      // 获取数据
      let p = { id: ids }

      let data = await this.post('/medicalInformation/queryById', p)
      this.contextId = data.data.data.id

      let ffO = JSON.parse(data.data.data.filePathVos)
      this.fileList = ffO // 文件列表赋值回显

      this.relationIds = data.data.data.id // 下载需要参数
      let fp = data.data.data
      this.changetime(fp)
      fp.examinationDate = moment(fp.examinationDate)
      fp.uploadFileT = data.data.data.filePathVos

      this.$nextTick(() => {
        this.checkFrom.setFieldsValue(fp) // data未处理2019年9月24日09:22:02
        this.checkFrom.setFieldsValue({
          strabismus: this.chengetwo(fp.strabismus),
          // fp.strabismus && fp.strabismus.indexOf(',') != -1
          //   ? fp.strabismus.split(',')
          //   : fp.strabismus.toArray(), // 斜眼
          nasalPatency: this.chengetwo(fp.nasalPatency),
          // fp.nasalPatency && fp.nasalPatency.indexOf(',') != -1
          //   ? fp.nasalPatency.split(',')
          //   : fp.nasalPatency.toArray(),
          eyeShake: this.chengetwo(fp.eyeShake)
          // fp.eyeShake && fp.eyeShake.indexOf(',') != -1
          //   ? fp.eyeShake.split(',')
          //   : fp.eyeShake.toArray()
        })
      })
    },
    chengetwo (a) {
      if (a) {
        if (a.indexOf(',') != -1) {
          return a.split(',')
        } else {
          return [a]
        }
      } else { return [] }
    },
    // .............
    async getLists () {
      // 是否
      this.yesNoList = await this.getDictionaries('YESNO')
      // 眼球协调
      this.eyeList = await this.getDictionaries('EYE_COORDINATION')
      // 斜视、眼震、鼻腔通畅 方向
      this.rfList = await this.getDictionaries('DIRECTION')

      // 舌
      this.theTongueList = await this.getDictionaries('THE_TONGUE')

      // 咀嚼功能厅
      this.chewingFunctionList = await this.getDictionaries('CHEWING_FUNCTION')

      // 吞咽功能
      this.SWALLOWINGList = await this.getDictionaries('SWALLOWING_FUNCTION')
      // 颈部
      this.THENECKList = await this.getDictionaries('THE_NECK')
      // 胸部
      this.CHESTList = await this.getDictionaries('CHEST')
      // 肩部
      this.THESHOULDERList = await this.getDictionaries('THE_SHOULDER')

      // 上肢
      this.UPPERLIMBList = await this.getDictionaries('UPPER_LIMB')
      // 手
      this.HANDList = await this.getDictionaries('HAND')
      // 脊柱
      this.THESPINEList = await this.getDictionaries('THE_SPINE')
      // 双下肢
      this.DOUBLELOWERLIMBSList = await this.getDictionaries(
        'DOUBLE_LOWER_LIMBS'
      )
      // 足
      this.THEFOOTLsit = await this.getDictionaries('THE_FOOT')
      // 步态
      this.THEGAITList = await this.getDictionaries('THE_GAIT')
      // 肌张力检查
      this.MYOTONOMETRYList = await this.getDictionaries('MYOTONOMETRY')
      // 语言功能
      this.LANGUAGEFEATURESList = await this.getDictionaries(
        'LANGUAGE_FEATURES'
      )
      // 精神状态
      this.MENTALSTATEList = await this.getDictionaries('MENTAL_STATE')
      // 情绪与行为
      this.EMOTIONBEHAVIORList = await this.getDictionaries('EMOTION_BEHAVIOR')
      // 记忆力
      this.MEMORYList = await this.getDictionaries('MEMORY')
      // 注意力
      this.ATTENTIONList = await this.getDictionaries('ATTENTION')
      // 配合程度
      this.COOPERATEDEGREEList = await this.getDictionaries('COOPERATE_DEGREE')
    },

    back () {
      // 取消。提交

      // this.$router.push({
      //   path: 'see',
      //   query: {
      //     ids: this.ids
      //   }
      // })
      this.$router.go(-1)

      this.checkFrom.resetFields()
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin: 0 20px 0 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
}

.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 83%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
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
