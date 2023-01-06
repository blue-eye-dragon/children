<template>
  <!-- 未成年人保护采集 -->
  <div class="conts tadrawer">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title title="基本情况"
               :show.sync="showone"></Title>
        <ta-form ref="one"
                 layout="horizontal"
                 :autoFormCreate="(baseForm)=>{this.baseForm = baseForm}">
          <!-- style=" height: 270px;" -->
          <ta-row class="fromcom">
            <ta-col :span="4">
              <ta-form-item label="姓名"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="2name">
                <ta-input :disabled="disabled"
                          placeholder="请输入儿童编号" />
              </ta-form-item>
              <ta-form-item label="文化程度"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="3householdRegistryClassify111"
                            :fieldDecoratorOptions="rules.householdRegistryClassify">
                <ta-select allowClear
                           :disabled="disabled"
                           placeholder="请选择文化程度">
                  <ta-select-option v-for="item in yesNoList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="5">
              <ta-form-item label="身份证号"
                            fieldDecoratorId="4idCard"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 14 }"
                            :fieldDecoratorOptions="rules.idCard ">
                <ta-input :disabled="disabled"
                          placeholder="请输入身份证号" />
              </ta-form-item>
              <ta-form-item label="是否登记户口"
                            fieldDecoratorId="5householdRegistryClassify"
                            :fieldDecoratorOptions="rules.householdRegistryClassify"
                            :labelCol="{ span: 12 }"
                            :wrapperCol="{ span: 12 }">
                <ta-select allowClear
                           :disabled="disabled"
                           placeholder="请选择是否登记户口">
                  <ta-select-option v-for="item in yesNoList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="4">
              <ta-form-item :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            label="出生日期"
                            fieldDecoratorId="6birthday"
                            :fieldDecoratorOptions="rules.birthday">
                <ta-date-picker style="width: 100%;"
                                :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="3">
              <ta-form-item label="民族"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="7nation"
                            :fieldDecoratorOptions="rules.nation">
                <ta-select allowClear
                           :disabled="disabled"
                           placeholder="请选择民族">
                  <ta-select-option v-for="item in nationList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>

            <ta-col :span="8">
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
            <ta-col :span="16"
                    style="top: -126px;">
              <ta-col :span="12">
                <AddressComponent :addressmodel="addressmodel"
                                  :msg="'户籍所在地'"
                                  :isRequire="false"
                                  :disabled="disabled"
                                  :labelwidth="{label: 5,wrapper: 19}"
                                  fileldName="q8censusRegisterDatas"
                                  :clearPlaceHolder="true"
                                  @setaddress="setaddress"></AddressComponent>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item label
                              fieldDecoratorId="9censusRegisterAddr"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }">
                  <ta-input placeholder
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="16"
                    style="top: -126px;">
              <ta-col :span="12">
                <AddressComponent :addressmodel="addressmodelNow"
                                  :msg="'现住址'"
                                  :isRequire="false"
                                  :labelwidth="{label: 5,wrapper: 19}"
                                  fileldName="q10currentAddressDatas"
                                  @setaddress="setaddress"
                                  :clearPlaceHolder="true"
                                  :disabled="disabled"></AddressComponent>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item label
                              fieldDecoratorId="11livingAddr"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }">
                  <ta-input :placeholder="''"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>

            <ta-col :span="24"
                    style="top: -126px;     left: -19px;">
              <ta-form-item label="健康状况"
                            fieldDecoratorId="12healthStatus"
                            :labelCol="{ span: 2 ,offset:-1}"
                            :wrapperCol="{ span: 22 }"
                            :fieldDecoratorOptions="rules.healthStatus">
                <ta-radio-group @change="onChange"
                                :disabled="disabled">
                  <ta-radio :value="item.value"
                            v-for="(item,index) in heathlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item v-if="healthType==Enum.HEALTHSTATUS.OTHER"
                            label="其他"
                            fieldDecoratorId="13healthStatusOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="rules.healthStatusOther">
                <ta-input :disabled="disabled"
                          placeholder="请输入其他情况" />
              </ta-form-item>
              <div class="canji"
                   v-if="healthType==Enum.HEALTHSTATUS.DISABILITY">
                <ta-form-item label="残疾类型"
                              fieldDecoratorId="disabledType"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择残疾类型'}">
                  <ta-checkbox-group :options="disabiliytypelist" />
                </ta-form-item>
                <ta-form-item label="残疾等级"
                              fieldDecoratorId="disabledLevel"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }">
                  <ta-radio-group :disabled="disabled">
                    <ta-radio :value="item.value"
                              v-for="(item,index) in canjileave"
                              :key="index">{{item.label}}</ta-radio>
                  </ta-radio-group>
                  <ta-radio-group style="float:left;"></ta-radio-group>
                </ta-form-item>
              </div>
              <!--重病-->
              <div class="canji"
                   v-if="healthType==Enum.HEALTHSTATUS.SERIOUSILLNESS">
                <ta-form-item label="重病"
                              fieldDecoratorId="disabledType"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择重病!'}">
                  <ta-checkbox-group :options="disabiliytypelist"
                                     :disabled="disabled"
                                     @change="seriousillnesschange" />
                </ta-form-item>
                <ta-form-item v-if="illOther"
                              label="其他"
                              fieldDecoratorId="15healthStatusOther"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">
                  <ta-input :disabled="disabled"
                            placeholder="请输入其他情况" />
                </ta-form-item>
              </div>
              <!--慢性病-->
              <div class="canji"
                   v-if="healthType==Enum.HEALTHSTATUS.CHRONICDISEASE">
                <ta-form-item label="慢性病"
                              fieldDecoratorId="disabledType"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择慢性病!'}">
                  <ta-checkbox-group :options="disabiliytypelist"
                                     :disabled="disabled"
                                     @change="seriousillnesschange" />
                </ta-form-item>
                <ta-form-item v-if="illOther"
                              label="其他"
                              fieldDecoratorId="17healthStatusOther"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">
                  <ta-input :disabled="disabled"
                            placeholder="请输入其他情况" />
                </ta-form-item>
              </div>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars">
        <Title title="婚姻登记情况"
               :show.sync="showtwo"></Title>

        <ta-form style=" height: 50px;"
                 ref="two"
                 layout="horizontal"
                 :autoFormCreate="(merForm)=>{this.merForm = merForm}">
          <ta-row style=" height:50px;"
                  ref="fromcom">
            <ta-col :span="7">
              <ta-form-item label="结婚具体时间"
                            fieldDecoratorId="18academicStatusOth2e22r"
                            :fieldDecoratorOptions="rules.birthday"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{ span: 12  }">
                <ta-date-picker :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label
                            fieldDecoratorId="19academicStatusOth2e22r"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:2 }">
                <ta-radio-group :disabled="disabled">
                  <ta-radio :value="item.value"
                            v-for="(item,index) in [{label:'登记领证',value:'1'},{label:'未登记领证',value:'2'}]"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div ref="threeout"
           class="mars">
        <Title title="家庭情况"
               :show.sync="showthree"></Title>

        <ta-form ref="three"
                 layout="horizontal"
                 :autoFormCreate="(homForm)=>{this.homForm = homForm}">
          <ta-row class="fromcom">
            <ta-col :span="7">
              <ta-form-item label="公婆情况"
                            fieldDecoratorId="20academicStatusOth2e22r"
                            :fieldDecoratorOptions="rules.birthday">
                <ta-radio-group :disabled="disabled">
                  <ta-radio :value="item.value"
                            v-for="(item,index) in [{label:'双方健在',value:'1'},{label:'一方健在',value:'2'},{label:'双方去世',value:'3'}]"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
            </ta-col>
            <ta-col :span="4">
              <ta-form-item label="子女数量"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span:15}"
                            fieldDecoratorId="21academicStatusOth2e22r"
                            :fieldDecoratorOptions="rules.academicStatusOther">
                <ta-input :disabled="disabled"
                          placeholder="请输入机构名称"
                          type="text" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="丈夫外出年限"
                            fieldDecoratorId="22academicStatusOth2e22r"
                            :fieldDecoratorOptions="rules.academicStatusOther"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span:12}">
                <ta-input :disabled="disabled"
                          placeholder="请输入机构名称"
                          type="text" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="7">
              <ta-form-item label="丈夫最近一回家探望时间"
                            fieldDecoratorId="23academicStatusOth2e22r"
                            :fieldDecoratorOptions="rules.birthday"
                            :labelCol="{ span: 11 }"
                            :wrapperCol="{ span:12}">
                <ta-date-picker :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="11">
              <ta-form-item label="获得生产帮扶情况"
                            fieldDecoratorId="w24healthStatus"
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 19 }">
                <ta-checkbox-group :options="productionList"
                                   :disabled="disabled"
                                   @change="helpstatus" />
                <!-- <ta-radio-group @change="onChange" :disabled="disabled">
                  <ta-radio
                    :value="item.value"
                    v-for="(item,index) in productionList"
                    :key="index"
                  >{{item.label}}</ta-radio>
                </ta-radio-group>-->
              </ta-form-item>
              <ta-form-item v-if="helpstatusOther"
                            label="其他"
                            fieldDecoratorId="25healthStatusOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="rules.healthStatusOther">
                <ta-input :disabled="disabled"
                          placeholder="请输入其他情况" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="家庭经济来源情况 "
                            fieldDecoratorId="h26healthStatus"
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 19 }">
                <ta-checkbox-group :options="familyBreadwinnerList"
                                   :disabled="disabled"
                                   @change="homemoney" />
                <!-- <ta-radio-group @change="onChange" :disabled="disabled">
                  <ta-radio
                    :value="item.value"
                    v-for="(item,index) in familyBreadwinnerList"
                    :key="index"
                  >{{item.label}}</ta-radio>
                </ta-radio-group>-->
              </ta-form-item>
              <ta-form-item v-if="homemoenyOther"
                            label="其他"
                            fieldDecoratorId="e27healthStatusOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="rules.healthStatusOther">
                <ta-input :disabled="disabled"
                          placeholder="请输入其他情况" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 type="primary"
                 @click="submit('2')">提交</ta-button>
      <ta-button class="btnleft"
                 v-if="false"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import Title from '@component/common/components/Title'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
export default {
  components: {
    Title,
    AddressComponent
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,

      disabled: false,

      illOther: false,
      healthType: '0',

      homemoenyOther: false,
      helpstatusOther: false,

      imglist: [],
      adoption: {
        // 头像上传的参数
        busiType: '47', // 头像
        functionalType: '1'
      },

      addressmodelNow: [],
      addressmodel: [],
      yesNoList: [],
      heathlist: [],
      canjileave: [],
      nationList: [],
      productionList: [],
      familyBreadwinnerList: [],
      disabiliytypelist: [],
      imageUrl: 'static/img/defalimg.png',
      rules: {
        helpStationOther: this.verificationRulesNotMustFill('其他救助', 200),
        academicStatus: this.verificationRules('学业状况'),
        healthStatus: this.verificationRules('健康状况'),
        disabledType: this.verificationRules('残疾类型'),
        disabledType1: this.verificationRules('重病'),
        disabledType2: this.verificationRules('慢性病'),
        goSchoolStatus: this.verificationRules('就学情况'),
        statusoverview: this.verificationRules('生活状况概述', 200),
        remark: this.verificationRules('驳回原因', 200),
        healthStatusOther: this.verificationRules('其他情况', 50),
        academicStatusOther: this.verificationRules('其他情况', 50),
        boarder: this.verificationRules('是否学校寄宿'),
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
        }
      },
      IDRe18: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      IDre15: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
    }
  },
  activated () {
    setTimeout(() => {
      this.setHeight('one', 'oneout', null, '370px')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
    }, 800)
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
  mounted () {
    this.getdic()
  },
  methods: {
    setaddress () {
      this.baseForm.setFieldsValue({
        q8censusRegisterDatas: this.addressmodel,
        q10currentAddressDatas: this.addressmodelNow
      })
    },

    async idcardrole (rule, value, callback) {
      if (!value || value == '') {
        callback()
        return false
      }
      if (this.IDRe18.test(value) || this.IDre15.test(value)) {
        callback() // 后台验重？
      } else {
        callback('请输入正确的身份证格式')
      }
    },

    preview (file) {
      this.downloadFile(file)
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
    adoptionfileChange (info) {
      const arr = []
      console.log(info)
      arr.push(info.fileList[info.fileList.length - 1])
      if (info.file.status === 'uploading') {
        this.imglist = arr
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.imglist = arr
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          const arrlist = [...this.imglist]
          arrlist.splice(-1, 1)

          this.imglist = arrlist
          return false
        }
        // 上传成功
        console.log(info)
        const returnFileIds = info.fileList[0].response.data.data.fileid
        this.$emit('update:imageUrl', window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds)
        // this.post('/file/getFileUrls', {
        //   returnFileIds: returnFileIds
        // }).then(res => {
        //   if (res.data) {
        //     this.$emit('update:imageUrl', window.faceConfig.basePath + res.data.fileUrlList[0])
        //   }
        // })
        this.imglist = arr
        this.$message.success('文件上传成功!')
      }
    },
    setHeight (ref, refout, istrue, px) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (px && !istrue) {
          node.style.height = px
        } else {
          if (!istrue && !px) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 50 + 'px'
          } else {
            node.style.height = '50px'
          }
        }

        node.style.transition = 'all 1s'
      })
    },
    onChange (e) {
      // 健康况
      this.baseForm.setFieldsValue({
        // 残疾其他.清
        disabledType: [],
        healthStatusOther: ''
      })

      this.illOther = false
      this.healthType = e.target.value

      // alert(this.Enum.HEALTHSTATUS.OTHER)

      this.getdisabiliytype(e.target.value)
      if (['10', '20', '70'].indexOf(this.healthType) == -1) {
        this.setHeight('one', 'oneout')
      } else {
        this.setHeight('one', 'oneout', null, '370px')
      }
    },
    homemoney (v) {
      let arr = v
      if (v.indexOf('5') != -1 && v.indexOf('5') != 0) {
        if (v.length >= 1) {
          arr = ['5']
          this.homemoenyOther = true
        } else {
          this.homemoenyOther = true
        }
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            h26healthStatus: arr
          })
        })
      } else if (v.indexOf('5') == 0 && v.length > 1) {
        arr.shift()
        this.homemoenyOther = false
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            h26healthStatus: arr
          })
        })
      } else if (v.indexOf('5') == 0 && v.length == 1) {
        this.homemoenyOther = true
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            h26healthStatus: arr
          })
        })
      } else {
        this.homemoenyOther = false
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            h26healthStatus: arr
          })
        })
      }
      this.setHeight('three', 'threeout')
    },
    helpstatus (v) {
      let arr = v
      if (v.indexOf('5') != -1 && v.indexOf('5') != 0) {
        if (v.length >= 1) {
          arr = ['5']
          this.helpstatusOther = true
        } else {
          this.helpstatusOther = true
        }
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            w24healthStatus: arr
          })
        })
      } else if (v.indexOf('5') == 0 && v.length > 1) {
        arr.shift()
        this.helpstatusOther = false
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            w24healthStatus: arr
          })
        })
      } else if (v.indexOf('5') == 0 && v.length == 1) {
        this.helpstatusOther = true
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            w24healthStatus: arr
          })
        })
      } else {
        this.helpstatusOther = false
        this.$nextTick(() => {
          this.homForm.setFieldsValue({
            w24healthStatus: arr
          })
        })
      }
      this.setHeight('three', 'threeout')
    },
    // 残疾类
    async getdisabiliytype (val) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.disabiliytypelist = data.data.codeList
    },
    seriousillnesschange (val) {
      console.log(val)
      if (
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
      ) {
        this.serioushval = true
      } else {
        this.serioushval = false
      }
      if (val.length > 1) {
        if (
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = []
          arr.push(val[val.length - 1])
          this.$nextTick(() => {
            this.baseForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
        if (
          val[0] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
          val[0] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        ) {
          const arr = [...val]
          arr.shift()
          this.$nextTick(() => {
            this.baseForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
      }
      this.setHeight('one', 'oneout')
    },

    async getdic () {
      this.productionList = await this.getDictionaries(
        'OBTAINPRODUCTIONASSISTANCE'
      )
      this.familyBreadwinnerList = await this.getDictionaries(
        'FAMILYSOURCEINCOME'
      )
      this.yesNoList = await this.getDictionaries('YESNO')
      this.nationList = await this.getDictionaries('NATION')
      const formdata = { parentValue: null, codeType: 'HEALTH' }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
      this.canjileave = await this.getDictionaries('DISABILITYLEVEL')
    }
  }
}
</script>
<style scoped lang='less'>
.mars {
  width: 100%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.canji {
  width: 88%;
  margin: 0 auto;
  padding: 10px 0 1px 0;
  box-sizing: border-box;
  background: rgba(230, 247, 255, 0.5);
}
.tables {
  margin-top: 17px;
}
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
</style>
