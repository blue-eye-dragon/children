<template>
  <div class="conts tadrawer">
    <div class="contin">

      <div ref="oneout"
           class="mars">

        <Title title="儿童基本情况"
               :show.sync="showone"></Title>

        <ta-form ref="one"
                 layout="horizontal"
                 :autoFormCreate="(baseForm)=>{this.baseForm = baseForm}">
          <ta-col :span="12">

            <ta-form-item label="儿童类型"
                          fieldDecoratorId="type"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}">
              <ta-select placeholder="请选择儿童类型"
                         mode="multiple"
                         :disabled="true">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in adoptionlist"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="儿童姓名"
                          :labelCol="{span:9}"
                          fieldDecoratorId="name"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名"
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="儿童身份证号"
                          :labelCol="{span:9}"
                          fieldDecoratorId="idCard"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童身份证号"
                        :disabled="true" />
            </ta-form-item>

          </ta-col>
          <ta-col :span="6">

            <ta-form-item label="性别"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="sex">
              <ta-select placeholder="请选择性别"
                         :disabled="true">
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in sexList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          :disabled="true">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :placeholder="'请选择出生日期'" />
            </ta-form-item>
          </ta-col>
        </ta-form>

      </div>

      <div ref="twoout"
           class="mars">

        <Title title="随访情况"
               :show.sync="showtwo"></Title>

        <ta-form ref="two"
                 layout="horizontal"
                 :autoFormCreate="(merForm)=>{this.followForm = merForm}">
          <ta-row>
            <ta-col :span="12">
              <ta-col :span="14">
                <AddressComponent :addressmodel="addressmodel"
                                  :msg="'随访地点'"
                                  :isRequire="true"
                                  :disabled="disabled"
                                  :labelwidth="{label: 7,wrapper: 17}"
                                  fileldName="followVisitAdress"
                                  @setaddress="setaddress"
                                  arealevel="4"
                                  @adsvalchange="likeOut">
                </AddressComponent>
                <ta-form-item label="问询对象姓名"
                              :labelCol="{span:7}"
                              fieldDecoratorId="enquiryObjectName"
                              :wrapperCol="{span:17}"
                              :fieldDecoratorOptions="rules.enquiryObjectName">
                  <ta-input placeholder="请输入问询对象姓名"
                            :disabled="disabled" />
                </ta-form-item>
                <ta-form-item label="最近一次与父母联系时间"
                              fieldDecoratorId="firstContactParentsTime"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <!-- :fieldDecoratorOptions="rules.firstContactParentsTime" -->
                  <ta-date-picker style="width: 100%;"
                                  format="YYYY-MM-DD"
                                  :disabled="disabled"
                                  :placeholder="'请选择联系时间'" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="10">

                <ta-form-item label
                              fieldDecoratorId="followVisitAdressDetail"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              :fieldDecoratorOptions="this.verificationRules('详细地址', 100)">
                  <ta-input maxlength='100'
                            :disabled="disabled"
                            :placeholder="'请输入详细地址'" />
                </ta-form-item>
                <ta-form-item label="问询对象与儿童关系"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="enquiryObjectRelation"
                              :fieldDecoratorOptions="rules.enquiryObjectRelation">
                  <ta-select placeholder="请选择问询对象与儿童关系"
                             :disabled="disabled">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in relationsadopteesList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

              </ta-col>
            </ta-col>
            <ta-col :span="12">
              <ta-row>
                <ta-form-item label="随访时间"
                              class="spilwid"
                              fieldDecoratorId="followVisitTime"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="rules.followVisitTime">
                  <ta-date-picker style="width: 100%;"
                                  :disabled="disabled"
                                  format="YYYY-MM-DD"
                                  :placeholder="'请选择随访时间'" />
                </ta-form-item>
              </ta-row>
              <ta-row>
                <ta-col :span="14">
                  <AddressComponent :addressmodel="addressmodelNow"
                                    :msg="'问询对象常驻地址'"
                                    :isRequire="true"
                                    :disabled="disabled"
                                    :labelwidth="{label: 8,wrapper: 16}"
                                    fileldName="enquiryObjectPermanentAddress"
                                    @setaddress="setaddress1"
                                    arealevel="4"
                                    @adsvalchange="likeOut">
                  </AddressComponent>

                </ta-col>
                <ta-col :span="10">
                  <ta-form-item label
                                fieldDecoratorId="enquiryObjectPermanentAddressDetail"
                                :labelCol="{ span: 0 }"
                                :wrapperCol="{ span: 23,offset:1 }"
                                :fieldDecoratorOptions="this.verificationRules('详细地址', 100)">
                    <ta-input maxlength='100'
                              :disabled="disabled"
                              :placeholder="'请输入详细地址'" />
                  </ta-form-item>

                </ta-col>
              </ta-row>
            </ta-col>
          </ta-row>
          <ta-row>
            <ta-form-item label="生活状况"
                          fieldDecoratorId="lifeConditionDetail"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.lifeConditionDetail">
              <ta-textarea :placeholder="'请输入随访儿童个人的吃、穿、用、住、行等情况'"
                           :rows="4"
                           :disabled="disabled"
                           @keyup.enter="handleOk1" />
            </ta-form-item>
            <ta-form-item label="家庭状况"
                          fieldDecoratorId="familyCondition"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.familyCondition">
              <ta-textarea :placeholder="'请输入随访儿童家庭成员、家庭成员健康状况、家庭主要经济来源及财产情况'"
                           :rows="4"
                           :disabled="disabled"
                           @keyup.enter="handleOk1" />
            </ta-form-item>
            <ta-form-item label="监护状况"
                          fieldDecoratorId="guardianShipCondition"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.guardianShipCondition">
              <ta-textarea :placeholder="'请输入监护状况'"
                           :rows="4"
                           :disabled="disabled"
                           @keyup.enter="handleOk1" />
            </ta-form-item>
            <ta-form-item label="儿童精神状况"
                          fieldDecoratorId="childMentalCondition"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.childMentalCondition">
              <ta-textarea :placeholder="'请输入儿童精神状况'"
                           :rows="4"
                           :disabled="disabled"
                           @keyup.enter="handleOk1" />
            </ta-form-item>
            <ta-form-item label="监护人意见"
                          fieldDecoratorId="guardianOpinion"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.guardianOpinion">
              <ta-textarea :placeholder="'请输入监护人意见'"
                           :rows="4"
                           :disabled="disabled"
                           @keyup.enter="handleOk1" />
            </ta-form-item>
            <ta-form-item label="学业状况"
                          fieldDecoratorId="academicStatus"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.academicStatus">
              <ta-radio-group @change="xyChange"
                              :disabled="disabled">
                <ta-radio :value="item.value"
                          v-for="(item,index) in xystatus"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item v-if="!(xyval==Enum.SCHOOLWORK.OTHER)"
                          label="就学情况"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 8 }"
                          fieldDecoratorId="goSchoolStatus"
                          :fieldDecoratorOptions="rules.goSchoolStatus">

              <ta-select allowClear
                         :disabled="disabledG || disabled"
                         :placeholder="'请选择就学情况'">

                <ta-select-option v-for="item in schoolingList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>

              </ta-select>

            </ta-form-item>
            <ta-form-item label="其他"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 8 }"
                          v-if="xyval==Enum.SCHOOLWORK.OTHER"
                          fieldDecoratorId="academicStatusOther"
                          :fieldDecoratorOptions="rules.healthStatusOther">
              <ta-input maxlength='50'
                        :disabled="disabled"
                        :placeholder="'请输入其他情况'"
                        type="text" />
            </ta-form-item>
            <ta-form-item label="帮扶建议"
                          fieldDecoratorId="supportRecommendations"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :initValue="[]"
                          :fieldDecoratorOptions="rules.supportRecommendations">
              <ta-checkbox-group :options="supportTypeList"
                                 :disabled="disabled"
                                 @change="supportTypes" />
            </ta-form-item>
            <ta-form-item label="其他"
                          :labelCol="{ span: 3 }"
                          :wrapperCol="{ span: 9 }"
                          v-if="supportType"
                          fieldDecoratorId="supportRecommendationsOther"
                          :fieldDecoratorOptions="rules.supportRecommendationsOther">
              <ta-input maxlength='50'
                        :disabled="disabled"
                        :placeholder="'请输入其他'"
                        type="text" />
            </ta-form-item>
            <ta-form-item label="是否加入重点关注"
                          fieldDecoratorId="iseEmphasisAttention"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }"
                          :fieldDecoratorOptions="rules.iseEmphasisAttention">
              <ta-radio-group :disabled="disabled">
                <ta-radio :value="item.value"
                          v-for="(item,index) in yesNoList"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-row>
        </ta-form>

      </div>

      <div ref="threeout"
           class="mars">

        <Title title="相关证明"
               :show.sync="showthree"></Title>

        <ta-form ref="three"
                 layout="horizontal">

          <MultiMedia @uochanhei="uochanhei"
                      :disabled="disabled"
                      ref="mul"></MultiMedia>
          <!-- <ta-form-item label="上传"
                        :labelCol="{ span: 2 }"
                        :wrapperCol="{ span: 22}"
                        :required="true">
            <ta-upload :withCredentials="true"
                       :multiple="true"
                       name="file"
                       :action="action"
                       :data="updata"
                       :fileList="fileList"
                       @preview="handlePreview"
                       :beforeUpload="beforeUpload"
                       @change="handleChange">
              <div>
                <ta-button :disabled="disabled">
                  <ta-icon type="upload" />上传
                </ta-button>
              </div>
            </ta-upload>
          </ta-form-item>
          <ta-form-item label=""
                        :labelCol="{ span: 0 }"
                        :wrapperCol="{ span: 22,offset:2}">
            <p class="warntext">
              <ta-icon type="info-circle-o"
                       class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
            </p>
          </ta-form-item> -->
        </ta-form>

      </div>

    </div>
    <div class="bom">

      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>

      <ta-button class="btnleft"
                 type="primary"
                 v-if="!disabled"
                 @click="submit ">提交</ta-button>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import MultiMedia from '../../collection/components/multiMedia'
import Title from '@component/common/components/Title'
import AddressComponent from '@/scopes/project/common/components/addressComponent'

export default {
  components: {
    Title,
    MultiMedia,
    AddressComponent
  },
  data () {
    return {
      id: '',
      obj: {},
      xyval: '',
      supportType: false,
      disabledG: false,
      bzType: false,
      showone: true,
      showtwo: true,
      showthree: true,
      disabled: false,
      updata: {
        functionalType: '1',
        busiType: '48'
      },
      rules: {
        firstContactParentsTime: this.verificationRules('最近一次与父母联系时间'),
        enquiryObjectName: this.verificationRules('问询对象姓名'),
        enquiryObjectRelation: this.verificationRules('问询对象与儿童关系'),
        followVisitTime: this.verificationRules('随访时间'),
        lifeConditionDetail: this.verificationRules('生活状况概述', 200),
        familyCondition: this.verificationRules('家庭状况', 200),
        guardianShipCondition: this.verificationRules('监护状况', 200),
        childMentalCondition: this.verificationRules('儿童精神状况', 200),
        guardianOpinion: this.verificationRules('监护人意见', 200),
        academicStatus: this.verificationRules('学业状况'),
        goSchoolStatus: this.verificationRules('就学情况'),
        supportRecommendations: this.verificationRulesNotMustFill('帮扶建议'),
        supportRecommendationsOther: this.verificationRulesNotMustFill('其他救助', 200),
        iseEmphasisAttention: this.verificationRules('是否加入重点关注')
      },
      fileList: [],
      sexList: [],
      xystatus: [],
      schoolingList: [],
      yesNoList: [],
      supportTypeList: [],
      addressmodel: [],
      addressmodelNow: [],
      relationsadopteesList: [],
      adoptionlist: [
        {
          label: '监护不当儿童',
          value: '110'
        },
        {
          label: '留守儿童',
          value: '400'
        },
        {
          label: '事实无人抚养儿童',
          value: '120'
        }
      ]
    }
  },
  activated () {
    this.initData()
  },
  mounted () {
    this.initData()
    this.getDiction()
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    initData () {
      this.id = ''
      this.obj = {}
      this.xyval = ''
      this.supportType = false
      this.disabledG = false
      this.disabled = false
      this.bzType = false
      this.showone = true
      this.showtwo = true
      this.showthree = true
      this.fileList = []
      this.followForm.resetFields()
      this.$refs.mul.resetFileDatas()
      this.followForm.setFieldsValue({ iseEmphasisAttention: '0' })
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.getDetails()
      }
      if (this.$route.query.disabled) {
        this.disabled = this.$route.query.disabled
      }
      if (this.$route.query.obj) {
        this.obj = JSON.parse(this.$route.query.obj)
        this.obj.birthday = moment(this.obj.birthday, 'YYYY-MM-DD')
        this.obj.type = this.obj.type.split(',')
        this.obj.type = this.obj.type.filter(item => {
          return item == '110' || item == '120' || item == '400'
        })
        this.baseForm.setFieldsValue(this.obj)
      }
      // if (this.id) {
      //   this.getDetails()
      // }
    },
    async getDetails () {
      const res = await this.post('/followVisit/queryFollowVisitById', { id: this.id })
      const resobj = res.data.data
      if (resobj.followVisitAdressPro) {
        this.addressmodel.push(resobj.followVisitAdressPro)
      }
      if (resobj.followVisitAdressCity) {
        this.addressmodel.push(resobj.followVisitAdressCity)
      }
      if (resobj.followVisitAdressCounty) {
        this.addressmodel.push(resobj.followVisitAdressCounty)
      }
      if (resobj.followVisitAdressTown) {
        this.addressmodel.push(resobj.followVisitAdressTown)
      }
      if (resobj.enquiryObjectPermanentAddressPro) {
        this.addressmodelNow.push(resobj.enquiryObjectPermanentAddressPro)
      }
      if (resobj.enquiryObjectPermanentAddressCity) {
        this.addressmodelNow.push(resobj.enquiryObjectPermanentAddressCity)
      }
      if (resobj.enquiryObjectPermanentAddressCounty) {
        this.addressmodelNow.push(resobj.enquiryObjectPermanentAddressCounty)
      }
      if (resobj.enquiryObjectPermanentAddressTown) {
        this.addressmodelNow.push(resobj.enquiryObjectPermanentAddressTown)
      }
      if (resobj.followVisitTime) {
        resobj.followVisitTime = moment(resobj.followVisitTime, 'YYYY-MM-DD')
      }
      if (resobj.firstContactParentsTime) {
        resobj.firstContactParentsTime = moment(resobj.firstContactParentsTime, 'YYYY-MM-DD')
      }
      // if (resobj.supportRecommendations) {
      //   console.log(resobj.supportRecommendations, 11)
      //   resobj.supportRecommendations = resobj.supportRecommendations.split(',')
      // }
      if (resobj.fileList) {
        resobj.fileList.forEach((item) => {
          if (item.busiType == '49') {
            this.$refs.mul.imgFileList.push(item)
          }
          if (item.busiType == '51') {
            this.$refs.mul.videoFileList.push(item)
          }
        })
      }
      if (resobj.academicStatus) {
        this.xyval = resobj.academicStatus
      }
      if (resobj.supportRecommendations == 7) {
        this.supportType = true
      } else {
        this.supportType = false
      }
      if (resobj.supportRecommendations) {
        resobj.supportRecommendations = resobj.supportRecommendations.split(',')
      } else {
        resobj.supportRecommendations = []
      }
      this.setaddress()
      this.setaddress1()
      this.$nextTick(() => {
        this.followForm.setFieldsValue(resobj)
        this.setHeight('three', 'threeout')
      })
    },
    uochanhei () {
      this.setHeight('three', 'threeout')
    },
    bzChange (e) {
      if (e.target.value == '0') {
        this.supportType = false
        this.bzType = false
      } else {
        this.bzType = true
      }
    },
    xyChange (e) {
      this.xyval = e.target.value

      this.$nextTick(() => {
        if (this.xyval == '7') {
          this.disabledG = true
          this.followForm.setFieldsValue({ goSchoolStatus: '91' })
        } else {
          this.disabledG = false
          this.followForm.setFieldsValue({ goSchoolStatus: null })
        }
        this.setHeight('three', 'threeout')
      })
    },
    supportTypes (v) {
      if (v[v.length - 1] == '7') {
        v = ['7']
        this.$nextTick(() => {
          this.followForm.setFieldsValue({
            supportRecommendations: v,
            supportRecommendationsOther: ''
          })
          this.supportType = true
        })
      } else if (v[v.length - 1] != '7') {
        if (v[0] == '7') {
          v.shift()
        }
        this.$nextTick(() => {
          this.followForm.setFieldsValue({
            supportRecommendations: v,
            supportRecommendationsOther: ''
          })
          this.supportType = false
        })
      }
    },
    async getDiction () {
      this.supportTypeList = await this.getDictionaries('SUPPORTTYPES')
      this.yesNoList = await this.getDictionaries('YESNO')
      this.xystatus = await this.getDictionaries('ACADEMICSTATUS')
      this.relationsadopteesList = await this.getDictionaries('RECEIVERRELATION')
      this.sexList = await this.getDictionaries('SEX')
      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 儿童地址传值
    setaddress () {
      this.followForm.setFieldsValue({
        followVisitAdress: this.addressmodel
      })
    },
    setaddress1 () {
      this.followForm.setFieldsValue({
        enquiryObjectPermanentAddress: this.addressmodelNow
      })
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // handleChange (info) {
    //   if (info.file.status === 'uploading') {
    //     this.fileList = info.fileList
    //   }
    //   if (info.file.status === 'removed') {
    //     this.fileList = info.fileList
    //   }
    //   if (info.file.status === 'done') {
    //     if (info.file.response.errors && info.file.response.errors.length != 0) {
    //       this.$message.error('上传失败')
    //       this.fileList.splice(-1, 1)
    //       return false
    //     }
    //     this.fileList = info.fileList
    //     this.$message.success('文件上传成功!')
    //     this.setHeight('three', 'threeout')
    //   }
    // },
    likeOut () {

    },
    backs () {
      this.$router.go(-1)
    },
    dispose () {

    },
    submit () {
      const _self = this
      const form = this.followForm.getFieldsValue()
      this.fileList = [
        ..._self.$refs.mul.imgFileList,
        ..._self.$refs.mul.videoFileList
      ]
      if (this.fileList.length == 0) {
        this.$message.error('请上传必要附件！')
      } else {
        _self.followForm.validateFields((err, values) => {
          if (!err) {
            if (this.id) {
              form.id = this.id
            }
            form.followVisitTime = form.followVisitTime.format('YYYY-MM-DD')
            if (form.firstContactParentsTime) {
              form.firstContactParentsTime = form.firstContactParentsTime.format('YYYY-MM-DD')
            }
            form.followVisitAdressPro = form.followVisitAdress[0]
            form.followVisitAdressCity = form.followVisitAdress[1]
            form.followVisitAdressCounty = form.followVisitAdress[2]
            form.followVisitAdressTown = form.followVisitAdress[3]
            form.enquiryObjectPermanentAddressPro = form.enquiryObjectPermanentAddress[0]
            form.enquiryObjectPermanentAddressCity = form.enquiryObjectPermanentAddress[1]
            form.enquiryObjectPermanentAddressCounty = form.enquiryObjectPermanentAddress[2]
            form.enquiryObjectPermanentAddressTown = form.enquiryObjectPermanentAddress[3]
            form.supportRecommendations = form.supportRecommendations.join(',')
            form.childId = this.obj.childId
            form.unaChildId = this.obj.unaChildId
            form.improperChildId = this.obj.improperChildId
            form.leftOverChildId = this.obj.leftOverChildId

            form.type = this.obj.type.join(',')
            form.upLoadPathIds = []
            this.fileList.forEach(item => {
              form.upLoadPathIds.push(item.response.data.data.fileid)
            })
            this.post('/followVisit/save', form, true).then((res) => {
              if (res.serviceSuccess) {
                _self.$message.success('信息保存成功！')
                _self.backs()
              } else {
                _self.$message.error(res.errors[0].msg)
              }
            })
          } else {
            _self.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
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
