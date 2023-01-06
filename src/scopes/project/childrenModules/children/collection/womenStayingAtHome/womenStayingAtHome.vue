<template>
  <!-- 留守妇女采集 -->

  <div class="conts tadrawer"
       @click='allvalidator'>

    <div class="contin">

      <div ref="oneout"
           class="mars">

        <Title title="基本情况"
               :show.sync="showone"></Title>

        <ta-form ref="one"
                 layout="horizontal"
                 :autoFormCreate="(baseForm)=>{this.baseForm = baseForm}">

          <ta-row class="fromcom">

            <ta-col :span="6">

              <ta-form-item label="妇女编号"
                            fieldDecoratorId="womenNumber"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }">

                <ta-input :disabled="true" />

              </ta-form-item>

              <ta-form-item label="证件类型"
                            fieldDecoratorId="memberIdType"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }"
                            :require="{message:'请选择证件类型'}">

                <ta-select @change="changeCardType"
                           allowClear
                           :placeholder="disabled?'':'请选择证件类型'"
                           :disabled="disabled">

                  <ta-select-option v-for="(item,index) in cardTypeList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>

                </ta-select>

              </ta-form-item>

              <ta-form-item label="文化程度"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="educationLevel"
                            :require="{message:'请选择文化程度'}">

                <ta-select allowClear
                           :disabled="disabled"
                           :placeholder="disabled?'':'请选择文化程度'">

                  <ta-select-option v-for="item in eduLevelList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>

                </ta-select>

              </ta-form-item>

            </ta-col>

            <ta-col :span="6">

              <ta-form-item label="姓名"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="name"
                            :fieldDecoratorOptions="this.verificationRules('姓名', 72)">

                <ta-input :disabled="disabled"
                          maxlength='72'
                          :placeholder="disabled?'':'请输入姓名'" />

              </ta-form-item>

              <ta-form-item label="证件号码"
                            fieldDecoratorId="idCard"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }"
                            :fieldDecoratorOptions="cardType=='01'?rules.idCard:this.verificationRules('证件号码',18)">

                <ta-input :disabled="disabled?disabled:cardType=='0'"
                          maxlength='18'
                          :placeholder="disabled?'':'请输入证件号码'" />

              </ta-form-item>

              <ta-form-item label="是否登记户口"
                            fieldDecoratorId="isRegisteredAccount"
                            :require="{message:'请选择是否登记户口'}"
                            :labelCol="{ span: 12 }"
                            :wrapperCol="{ span: 12 }">

                <ta-select allowClear
                           @change="changeIsRegisteredAccount"
                           :disabled="disabled"
                           :placeholder="disabled?'':'请选择'">

                  <ta-select-option v-for="item in yesNoList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>

                </ta-select>

              </ta-form-item>

            </ta-col>

            <ta-col :span="6">

              <ta-form-item label="民族"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="nation"
                            :fieldDecoratorOptions="rules.nation">

                <ta-select allowClear
                           :disabled="disabled"
                           :placeholder="disabled?'':'请选择民族'">

                  <ta-select-option v-for="item in nationList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>

                </ta-select>

              </ta-form-item>

              <ta-form-item :labelCol="{ span: 9 }"
                            :wrapperCol="{ span: 15 }"
                            label="出生日期"
                            fieldDecoratorId="birthday"
                            :require="{message:'请选择出生日期'}">

                <!--  -->

                <ta-date-picker style="width: 100%;"
                                :placeholder="disabled?'':'请选择出生日期'"
                                :disabled="disabled"
                                :disabledDate="disabledDate" />

              </ta-form-item>

            </ta-col>

            <ta-col :span="6">

              <div style="    margin-top: -22px;">
                <UpLoad :thisP='this'
                        :thisP2='this'
                        :imglist.sync='imglist'
                        :disabled='disabled'
                        :delVisible='delVisible'
                        :imageUrl.sync='imageUrl'
                        @fileControl="fileControl"
                        :uploadPar='adoption'></UpLoad>
                <!--
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
                           @change="fileControl"
                           :beforeUpload="beforeUpload">

                  <ta-button :disabled="disabled"
                             :ghost="true"
                             type="primary">上传照片</ta-button>

                </ta-upload> -->

              </div>

            </ta-col>

            <ta-col :span="18"
                    style="top: -64px;">

              <ta-col :span="12">

                <AddressComponent :addressmodel="addressmodel"
                                  :msg="'户籍所在地'"
                                  :isRequire="isRegisteredAccountFlag"
                                  :disabled="disabled"
                                  :labelwidth="{label: 6,wrapper: 18}"
                                  fileldName="censusRegisterSD"
                                  @setaddress="setaddress"
                                  arealevel="4"
                                  :clearPlaceHolder='disabled'
                                  @adsvalchange="likeOut"></AddressComponent>

              </ta-col>

              <ta-col :span="9">

                <ta-form-item label
                              fieldDecoratorId="censusRegisterDetail"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              :fieldDecoratorOptions="isRegisteredAccountFlag?this.verificationRules('详细地址', 100):this.verificationRulesNotMustFill('详细地址', 100)">

                  <ta-input @change="likeOut"
                            maxlength='100'
                            :isRequire="isRegisteredAccountFlag"
                            :disabled="disabled"
                            :placeholder="disabled?'':'请输入详细地址'" />

                </ta-form-item>

              </ta-col>

              <ta-col :span="3">

                <ta-form-item label="同现住址"
                              fieldDecoratorId="sameAddress"
                              :labelCol="{ span: 20}"
                              :wrapperCol="{ span: 4}"
                              :fieldDecoratorOptions="{initialValue: []}">

                  <ta-checkbox-group :options="[{ label: '', value: '1' }]"
                                     @change="likeaddress"
                                     :disabled="disabled " />

                </ta-form-item>

              </ta-col>

            </ta-col>

            <ta-col :span="18"
                    style="top: -64px;">

              <ta-col :span="12">

                <AddressComponent :addressmodel="addressmodelNow"
                                  :msg="'现住址'"
                                  :isRequire="true"
                                  :labelwidth="{label: 6,wrapper: 18}"
                                  fileldName="currentAddress"
                                  @setaddress="setaddress2"
                                  :disabled="disabled"
                                  arealevel="4"
                                  :clearPlaceHolder='disabled'
                                  @adsvalchange="likeOut">

                  <!-- :clearPlaceHolder="true" -->

                </AddressComponent>

              </ta-col>

              <ta-col :span="12">

                <ta-form-item label
                              fieldDecoratorId="currentAddressDetail"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              :fieldDecoratorOptions="this.verificationRules('详细地址', 100)">

                  <ta-input @change="likeOut"
                            maxlength='100'
                            :disabled="disabled"
                            :placeholder="disabled?'':'请输入详细地址'" />

                </ta-form-item>

              </ta-col>

            </ta-col>

            <ta-col :span="24"
                    style="top: -64px;     left: -34px;">

              <ta-form-item label="健康状况"
                            fieldDecoratorId="healthStatus"
                            :labelCol="{ span: 3}"
                            :wrapperCol="{ span: 21 }"
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
                            fieldDecoratorId="healthStatusOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="rules.healthStatusOther">

                <ta-input :disabled="disabled"
                          maxlength='50'
                          :placeholder="disabled?'':'请输入其他情况'" />

              </ta-form-item>

              <div class="canji"
                   v-if="healthType==Enum.HEALTHSTATUS.DISABILITY">

                <ta-form-item label="残疾类型"
                              fieldDecoratorId="disabledType"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :initValue="[]"
                              :require="{message:'请选择残疾类型'}">

                  <ta-checkbox-group :options="disabiliytypelist"
                                     @change="setMulti"
                                     :disabled="disabled"
                                     :values="disabilityTypeValues" />

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
                              :require="{message:'请选择重病'}">

                  <ta-checkbox-group :options="disabiliytypelist"
                                     :disabled="disabled"
                                     @change="seriousillnesschange" />

                </ta-form-item>

                <ta-form-item v-if="illOther"
                              label="其他"
                              fieldDecoratorId="healthStatusOther"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">

                  <ta-input :disabled="disabled"
                            maxlength='50'
                            :placeholder="disabled?'':'请输入其他情况'" />

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
                              :require="{message:'请选择慢性病'}">

                  <ta-checkbox-group :options="disabiliytypelist"
                                     :disabled="disabled"
                                     @change="seriousillnesschange" />

                </ta-form-item>

                <ta-form-item v-if="illOther"
                              label="其他"
                              fieldDecoratorId="healthStatusOther"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              :fieldDecoratorOptions="rules.healthStatusOther">

                  <ta-input :disabled="disabled"
                            maxlength='50'
                            :placeholder="disabled?'':'请输入其他情况'" />

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

            <ta-col :span="10">

              <ta-form-item label
                            fieldDecoratorId="marriageRegisterCase"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:2 }">

                <ta-radio-group :disabled="disabled"
                                @change="toOrShow">

                  <ta-radio :value="item.value"
                            v-for="(item,index) in [{label:'登记领证',value:'1'},{label:'未登记领证',value:'0'}]"
                            :key="index">{{item.label}}</ta-radio>

                </ta-radio-group>

              </ta-form-item>

            </ta-col>

            <ta-col :span="7">
              <!-- :fieldDecoratorOptions="orShow?this.selectNotMust():this.verificationRules('结婚具体日期', true)" -->
              <ta-form-item label="结婚具体日期"
                            fieldDecoratorId="marryTime"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14  }">

                <ta-date-picker :disabledDate="disabledDate"
                                :placeholder="disabled?'':'请选择结婚具体日期'"
                                :disabled="disabled" />

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

            <ta-col :span="12">

              <ta-form-item label="公婆情况"
                            fieldDecoratorId="parentsInLawCase"
                            :require="{message:'请选择公婆情况'}">

                <ta-radio-group :disabled="disabled">

                  <ta-radio :value="item.value"
                            v-for="(item,index) in [{label:'双方健在',value:'1'},{label:'一方健在',value:'2'},{label:'双方去世',value:'3'}]"
                            :key="index">{{item.label}}</ta-radio>

                </ta-radio-group>

              </ta-form-item>

            </ta-col>

            <ta-col :span="5">

              <ta-form-item label="子女数量"
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{ span:15}"
                            fieldDecoratorId="childNum"
                            :require="{message:'请输入子女数量'}">

                <ta-input-number :disabled="disabled"
                                 :min="0"
                                 :step="1"
                                 :max='30'
                                 :precision="0"
                                 style="width: 100%"
                                 :placeholder="disabled?'':'请输入子女数量'"></ta-input-number>
                <!-- @change="changChildNum" -->

              </ta-form-item>

            </ta-col>

            <ta-col :span="7">

              <ta-form-item label="丈夫外出年限（年）"
                            fieldDecoratorId="husbandGoOutYear"
                            :labelCol="{ span: 14 }"
                            :wrapperCol="{ span:10}"
                            :require="{message:'请输入丈夫外出年限'}">

                <ta-input-number :disabled="disabled"
                                 :min="0.5"
                                 :step="0.5"
                                 :max='99'
                                 :precision="1"
                                 style="width: 100%"
                                 :placeholder="disabled?'':'请输入丈夫外出年限'"></ta-input-number>

              </ta-form-item>

            </ta-col>

            <ta-col :span='24'>

              <ta-col :span="12">

                <ta-form-item label="丈夫最近一次回家探望时间"
                              fieldDecoratorId="husbandGoHomeTime"
                              :require="{message:'请选择丈夫最近一回家探望时间'}"
                              :labelCol="{ span: 11 }"
                              :wrapperCol="{ span:12}">

                  <ta-date-picker :disabledDate="disabledDate"
                                  :placeholder="disabled?'':'请选择时间'"
                                  :disabled="disabled" />

                </ta-form-item>

              </ta-col>

            </ta-col>

            <ta-col :span="11">

              <ta-form-item label="获得生产帮扶情况"
                            fieldDecoratorId="getHelpCase"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}"
                            :initValue="[]"
                            :require="{message:'请选择获得生产帮扶情况'}">

                <ta-checkbox-group :options="productionList"
                                   :disabled="disabled"
                                   @change="helpstatus" />

              </ta-form-item>

              <ta-form-item v-if="helpstatusOther"
                            label="其他"
                            fieldDecoratorId="getHelpCaseOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="this.verificationRules('其他', 50)">

                <ta-input :disabled="disabled"
                          maxlength='50'
                          :placeholder="disabled?'':'请输入其他情况'" />

              </ta-form-item>

            </ta-col>

            <ta-col :span="13">

              <ta-form-item label="家庭经济来源情况 "
                            fieldDecoratorId="familyBreadwinner"
                            :labelCol="{ span: 8 }"
                            :require="{message:'请选择家庭经济来源情况'}"
                            :wrapperCol="{ span: 16 }"
                            :initValue="[]">

                <ta-checkbox-group :options="familyBreadwinnerList"
                                   :disabled="disabled"
                                   @change="homemoney" />

              </ta-form-item>

              <ta-form-item v-if="homemoenyOther"
                            label="其他"
                            fieldDecoratorId="familyBreadwinnerOther"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 10 }"
                            :fieldDecoratorOptions="this.verificationRules('其他', 50)">

                <ta-input :disabled="disabled"
                          maxlength='50'
                          :placeholder="disabled?'':'请输入其他情况'" />

              </ta-form-item>

            </ta-col>

          </ta-row>

        </ta-form>

      </div>

    </div>

    <div class="bom">

      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>

      <ta-button v-if="reSave&&!disabled&&nowkeys"
                 class="btnleft temporarystorage"
                 @click="submit('s')">暂存</ta-button>

      <ta-button v-if="!disabled"
                 class="btnleft"
                 type="primary"
                 @click="submit ">提交</ta-button>
      <ta-button v-if="isshow=='1'"
                 class="btnleft"
                 type="primary"
                 @click="doGet ">认领</ta-button>
      <ta-button v-if="isshow=='2'"
                 class="btnleft"
                 type="primary"
                 @click="del ">取消认领</ta-button>

    </div>

  </div>
</template>
<script>
import moment from 'moment'
import Title from '@component/common/components/Title'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import UpLoad from '@/scopes/project/common/components/uploadForPhoto'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: {
    UpLoad,
    Title,
    AddressComponent
  },

  data () {
    return {
      orShow: false,
      isshow: '',
      disabilityTypeValues: [],
      isvalidator: false, // 提交时不重新加载
      id: '',
      saveUrl: '',
      reSave: true,
      showone: true,
      showtwo: true,
      showthree: true,

      disabled: false,

      illOther: false,
      healthType: '0',

      homemoenyOther: false,
      helpstatusOther: false,
      nowkeys: false,

      imglist: [],
      adoption: {
        // 头像上传的参数
        busiType: '47', // 头像
        functionalType: '1'
      },
      cardTypeList: [],
      eduLevelList: [],
      addressmodelNow: [],
      addressmodel: [],
      yesNoList: [],
      heathlist: [],
      canjileave: [],
      nationList: [],
      productionList: [],
      familyBreadwinnerList: [],
      disabiliytypelist: [],
      isRegisteredAccountFlag: true,
      imageUrl: 'static/img/defalimg.png',
      delVisible: false,
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
        birthday: this.verificationRules('出生日期', true),
        householdRegistryProperty: this.verificationRules('户口性质'),
        householdRegistryClassify: this.verificationRules('户口分类'),
        censusRegisterDetail: this.verificationRules('户籍所在地详细地址', 100),
        currentAddressDetail: this.verificationRules('现住地详细地址', 100),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入证件号码' },
            { validator: this.idcardrole }
          ]
        }
      },
      cardType: '0',
      IDRe18: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      IDre15: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/,
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.disabilityTypeValues = []
    this.restart()
    this.nowkeys = this.$route.query.nowkeys == 0
    if (this.$route.query.isshow) {
      this.isshow = this.$route.query.isshow
    }
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getDetails()
    } else {
      this.id = ''
      this.getChildNum()
    }
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (this.$route.query.url) {
      // hf
      this.saveUrl = this.$route.query.url
      this.reSave = false
    }
    this.disabled = !!this.$route.query.disabled // true 查看
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
    this.isvalidator = false
  },
  methods: {
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    changeIsRegisteredAccount (v) {
      if (v === '1') {
        this.isRegisteredAccountFlag = true
        this.baseForm.setFieldsValue({ censusRegisterSD: null, censusRegisterDetail: null })
      } else {
        this.isRegisteredAccountFlag = false
        this.baseForm.setFieldsValue({ censusRegisterSD: null, censusRegisterDetail: null })
      }
    },
    changeCardType (v) {
      this.cardType = v
      if (v == undefined) {
        this.cardType = 0
        this.$nextTick(() => {
          this.baseForm.setFieldsValue({
            idCard: ''
          })
        })
      }
    },
    toOrShow (v) {
      if (v.target.value == '1') {
        this.orShow = false
      } else {
        this.orShow = true
      }
      this.merForm.resetFields()
    },
    restart () {
      this.isFromSearch = false
      this.formDataSearch = {}
      this.delVisible = false
      this.isshow = ''
      this.cardType = 0
      this.homemoenyOther = false
      this.helpstatusOther = false
      this.baseForm.resetFields()
      this.baseForm.setFieldsValue({ healthStatus: '10' })
      this.healthType = ''
      this.illOther = false
      this.imglist = []
      this.imageUrl = 'static/img/defalimg.png'
      this.merForm.resetFields()
      this.homForm.resetFields()
      this.orShow = false
      this.merForm.setFieldsValue({ marriageRegisterCase: '1' })
      setTimeout(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout', null, '120px')
        this.setHeight('three', 'threeout')
      }, 800)
    },
    async submit (s) {
      let url = ''
      const params = { ...this.baseForm.getFieldsValue(), ...this.merForm.getFieldsValue(), ...this.homForm.getFieldsValue() }
      let pass = 0
      this.isvalidator = false
      if (s == 's') { // 暂存
        url = '/LeftOverWomen/tssaveOrUpdate'
        if (params.name) {
          if (params.sameAddress == '') {
            params.sameAddress = '0'
          }
          this.dispose(params)
          params.state = 0
          pass = 0
          await this.baseForm.validateFields(async (err, values) => {
            if (err) {
              if (err.healthStatusOther && err.healthStatusOther.errors[0].message.includes('50')) {
                pass += 1
                this.$message.warning('健康状况其他信息长度过长！')
              }
            }
          })
          await this.homForm.validateFields(async (err, values) => {
            if (values.childNum) {
              if (!/^[0-9]$/i.test(values.childNum.toString())) {
                this.$message.warning('子女数量请填写0-9之间的整数！！')
                pass += 1
              }
            }
            if (err) {
              if (values.husbandGoOutYear) {
                if (!/^([1-9])?[0-9](\.[0-9])?$/i.test(values.husbandGoOutYear.toString())) {
                  this.$message.warning('丈夫外出年限填写有误！')
                  pass += 1
                }
              }
              if (err.familyBreadwinnerOther && err.familyBreadwinnerOther.errors[0].message.includes('50')) {
                pass += 1
                this.$message.warning('其他经济来源填写内容过长！')
              }
              if (err.getHelpCaseOther && err.getHelpCaseOther.errors[0].message.includes('50')) {
                pass += 1
                this.$message.warning('其他帮扶填写内容过长！')
              }
            }
          })
        } else {
          this.$message.warning('暂存至少要填写姓名！')
          pass += 1
        }
      } else {
        await this.baseForm.validateFields(async (err, values) => {
          if (!err) {
            if (params.sameAddress == '') {
              params.sameAddress = '0'
            }
            this.dispose(params)
            if (this.saveUrl != '') {
              // 恢复
              url = this.saveUrl
              params.exitFlag = '1'
            } else {
              // 新增
              url = '/LeftOverWomen/saveOrUpdate'
            }
            pass = 0
          } else {
            console.log(err)
            pass += 1
          }
        })

        await this.merForm.validateFields(async (err, values) => {
          if (!err) {

          } else { pass += 1 }
        })
        await this.homForm.validateFields(async (err, values) => {
          if (!err) {

          } else {
            pass += 1
          }
        })
        params.state = 1
      }
      const upLoadPathIds = []
      this.imglist.map(element => {
        upLoadPathIds.push(element.response.data.data.fileid)
      })
      params.upLoadPathIds = upLoadPathIds

      if (this.id) {
        params.id = this.id
      }
      if (pass == 0) {
        const data = await this.post(url, params)
        if (data.errors === null) {
          this.$message.success('提交成功')
          this.backs()
        }
      }
    },
    async getDetails () {
      const params = { id: this.id }
      const resobj = await this.post('/LeftOverWomen/queryById', params)
      const baseData = resobj.data.data
      if (!resobj.errors) {
        const ffOAll = baseData.fileList

        if (ffOAll && ffOAll.length > 0) {
          this.imglist.push(ffOAll[0])
          const returnFileIds = ffOAll[0].response.data.data.fileid
          this.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
          this.delVisible = true
        }
        this.addressmodel = []
        this.addressmodelNow = []
        if (baseData.censusRegisterPro) {
          this.addressmodel.push(baseData.censusRegisterPro)
        }
        if (baseData.censusRegisterCity) {
          this.addressmodel.push(baseData.censusRegisterCity)
        }
        if (baseData.censusRegisterCounty) {
          this.addressmodel.push(baseData.censusRegisterCounty)
        }
        if (baseData.censusRegisterTown) {
          this.addressmodel.push(baseData.censusRegisterTown)
        }
        if (baseData.censusRegisterVillage) {
          this.addressmodel.push(baseData.censusRegisterVillage)
        }
        if (baseData.currentAddressPro) {
          this.addressmodelNow.push(
            baseData.currentAddressPro
          )
        }
        if (baseData.currentAddressCity) {
          this.addressmodelNow.push(
            baseData.currentAddressCity
          )
        }
        if (baseData.currentAddressCounty) {
          this.addressmodelNow.push(
            baseData.currentAddressCounty
          )
        }
        if (baseData.currentAddressTown) {
          this.addressmodelNow.push(
            baseData.currentAddressTown
          )
        }
        if (baseData.currentAddressVillage) {
          this.addressmodelNow.push(baseData.currentAddressVillage)
        }
        if (baseData.sameAddress) {
          baseData.sameAddress = baseData.sameAddress == '0' ? [] : ['1']
        }

        this.setaddress2()
        this.setaddress()
        // 基本时间
        baseData.birthday = baseData.birthday
          ? moment(baseData.birthday, 'YYYY-MM-DD')
          : null
        baseData.marryTime = baseData.marryTime
          ? moment(baseData.marryTime, 'YYYY-MM-DD')
          : null
        baseData.husbandGoHomeTime = baseData.husbandGoHomeTime
          ? moment(baseData.husbandGoHomeTime, 'YYYY-MM-DD')
          : null
        this.healthType = baseData.healthStatus
          ? baseData.healthStatus
          : ''
        await this.setHeight('one', 'oneout')

        // 健康状况
        if (baseData.disabledType) {
          baseData.disabledType = baseData.disabledType.split(',')
          if (
            baseData.disabledType[baseData.disabledType.length - 1] ==
            this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
            baseData.disabledType[baseData.disabledType.length - 1] ==
            this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
          ) {
            this.illOther = true
          } else {
            this.illOther = false
          }
        }
        await this.getdisabiliytype(baseData.healthStatus)
        if (!baseData.disabledType) {
          baseData.disabledType = []
        }
        if (baseData.getHelpCase) {
          baseData.getHelpCase = baseData.getHelpCase.split(',')

          if (baseData.getHelpCase.indexOf('5') == 0) {
            this.helpstatusOther = true
          } else {
            this.helpstatusOther = false
          }
        } else {
          baseData.getHelpCase = []
        }
        if (baseData.familyBreadwinner) {
          baseData.familyBreadwinner = baseData.familyBreadwinner.split(',')

          if (baseData.familyBreadwinner == 5) {
            this.homemoenyOther = true
          } else { this.homemoenyOther = false }
        } else {
          baseData.familyBreadwinner = []
        }
        if (this.disabled) {
          baseData.idCard = baseData.idCard ? baseData.smIdCard : ''
        } else {
          baseData.idCard = baseData.idCard ? baseData.idCard : ''
        }
        if (baseData.memberIdType) {
          this.cardType = baseData.memberIdType
        }

        if (baseData.marriageRegisterCase == '1') {
          this.orShow = false
        } else {
          this.orShow = true
        }

        await this.$nextTick(() => {
          this.baseForm.setFieldsValue(baseData)
          this.merForm.setFieldsValue(baseData)
          this.homForm.setFieldsValue(baseData)

          this.baseForm.setFieldsValue({ healthStatus: baseData.healthStatus || '' })
        })
      }
    },
    async getChildNum () {
      const data = await this.post('/serialApi/getWomenNumber', {})
      this.baseForm.setFieldsValue({
        womenNumber: data.data.code
      })
    },
    backs () {
      this.$router.go(-1)
    },
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
    },
    allvalidator () {
      this.isvalidator = true
    },
    dispose (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            const arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'censusRegisterSD') {
            // 后期修改下
            data.censusRegisterPro = data[k][0]
            data.censusRegisterCity = data[k][1]
            data.censusRegisterCounty = data[k][2]
            data.censusRegisterTown = data[k][3]
            data.censusRegisterVillage = data[k][4]
            delete data[k]
          } else if (k == 'currentAddress') {
            data.currentAddressPro = data[k][0]
            data.currentAddressCity = data[k][1]
            data.currentAddressCounty = data[k][2]
            data.currentAddressTown = data[k][3]
            data.currentAddressVillage = data[k][4]
            delete data[k]
          } else if (k == 'orgAddress') {
            data.orgAddressProvince = data[k][0]
            data.orgAddressCity = data[k][1]
            data.orgAddressCounty = data[k][2]

            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },
    likeOut () {
      const nowData = this.baseForm.getFieldsValue()
      if (nowData.sameAddress == []) { } else {
        this.baseForm.setFieldsValue({
          sameAddress: []
        })
      }
    },
    likeaddress (q) {
      const data = this.baseForm.getFieldsValue()
      this.$nextTick(() => {
        if (q == '1') {
          let arrs = []
          if (data.censusRegisterSD != undefined) {
            arrs = [...data.censusRegisterSD]
          }
          this.addressmodelNow = arrs
          this.baseForm.setFieldsValue({
            currentAddress: arrs
          })
          this.baseForm.setFieldsValue({
            currentAddressDetail: data.censusRegisterDetail ? data.censusRegisterDetail : ''
          })
        } else {

        }
      })
    },
    // 禁用时间,不能选择比当前时间大的日期
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    setaddress () {
      this.baseForm.setFieldsValue({
        censusRegisterSD: this.addressmodel

      })
    },
    setaddress2 () {
      this.baseForm.setFieldsValue({

        currentAddress: this.addressmodelNow

      })
    },
    async idcardrole (rule, value, callback) {
      if (!this.isvalidator) {
        return false
      }
      if (!value || value == '') {
        callback()
        return false
      }
      if (this.IDRe18.test(value) || this.IDre15.test(value)) {
        const data = this.go(value, value.length, this, null)
        if (data.birth) {
          this.baseForm.setFieldsValue({
            birthday: moment(data.birth)
          })
        }

        this.gochenge()

        callback()
      } else {
        callback('请输入格式正确的证件号码')
      }
    },
    async doGet () {
      let list = []
      list.push(this.$route.query.id)
      const pra = { womanIdVo: list, claimFlag: '0' }
      // /LeftOverWomen/claimInfoUpdate
      const res = await this.post('/LeftOverWomen/claimInfoUpdate', pra)
      if (!res.errors) {
        this.$router.push({
          name: 'affirmWomenStayAtHome',
          query: {}
        })
        this.$message.success('操作成功！')
        this.resetFrom()
      }
    },

    async del () {
      const res = await this.post('/LeftOverWomen/claimInfoUpdate', { id: this.$route.query.id, claimFlag: '1' })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$router.push({
          name: 'affirmWomenStayAtHome',
          query: {}
        })
        this.$message.success('操作成功！')
        this.handleSubmit()
      }
    },
    async gochenge () {
      if (!this.isvalidator) {
        return false
      } else {
        const values = this.baseForm.getFieldsValue().idCard

        const params = {
          id: this.id,
          idCard: values
        }
        // 验重
        const res = await this.post(
          '/LeftOverWomen/checkAgainByIdCard',
          params
        )
        if (!res.errors) {
          if (res.data.data != 0) {
            let masegges = ''
            switch (res.data.data) {
              case '1':
                masegges = '此妇女已是暂存状态，可前往采集列表查看，不可重复采集！'
                break
              case '2':
                masegges = '此妇女是已采集状态，可前往采集列表查看，不可重复采集！'
                break
              case '3':
                masegges = '此妇女已是退出状态，可前往变更列表查看，不可重复采集！'
                break
              case '4':
                masegges = '该妇女已在待认领菜单列表，请在认领列表中认领！'
                break
            }

            this.$message.error(masegges)
            this.$nextTick(() => {
              this.baseForm.setFieldsValue({
                idCard: '',
                birthday: null,
                sex: null

              })
            })
          }
        }
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
    fileControl (info) {
      const arr = []
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
        const returnFileIds = info.fileList[0].response.data.data.fileid
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.delVisible = true
        })
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
            if (refout == 'twoout') {
              node.style.height = this.$refs[ref].$el.offsetHeight + 60 + 'px'
            } else {
              node.style.height = this.$refs[ref].$el.offsetHeight + 80 + 'px'
            }
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

      this.getdisabiliytype(e.target.value)
      this.setHeight('one', 'oneout')
    },
    homemoney (v) {
      let arr = []
      arr = v
      if (v) {
        if (v.indexOf('5') != -1 && v.indexOf('5') != 0) {
          if (v.length >= 1) {
            arr = ['5']
            this.homemoenyOther = true
          } else {
            this.homemoenyOther = true
          }
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              familyBreadwinner: arr
            })
          })
        } else if (v.length > 1 && v.indexOf('5') == 0) {
          arr.shift()
          this.homemoenyOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              familyBreadwinner: arr
            })
          })
        } else if (v.length == 1 && v.indexOf('5') == 0) {
          this.homemoenyOther = true
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              familyBreadwinner: arr
            })
          })
        } else {
          this.homemoenyOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              familyBreadwinner: arr
            })
          })
        }
      }

      this.setHeight('three', 'threeout')
    },
    helpstatus (v) {
      let arr = v
      if (v) {
        if (v.indexOf('5') != -1 && v.indexOf('5') != 0) {
          if (v.length >= 1) {
            arr = ['5']
            this.helpstatusOther = true
          } else {
            this.helpstatusOther = false
          }
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        } else if (v.length > 1 && v.indexOf('5') == 0) {
          arr.shift()
          this.helpstatusOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        } else if (v.length == 1 && v.indexOf('5') == 0) {
          this.helpstatusOther = true
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        } else if (v.length > 1 && v.indexOf('6') == 0) {
          arr.shift()
          this.helpstatusOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        } else if (v.length == 1 && v.indexOf('6') == 0) {
          this.helpstatusOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        } else if (v.indexOf('6') != -1 && v.indexOf('6') != 0) {
          arr = ['6']
          this.helpstatusOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        } else {
          this.helpstatusOther = false
          this.$nextTick(() => {
            this.homForm.setFieldsValue({
              getHelpCase: arr
            })
            this.setHeight('three', 'threeout')
          })
        }
      }
      // this.setHeight('three', 'threeout')
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
      if (
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
        val[val.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
      ) {
        this.illOther = true
      } else {
        this.illOther = false
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
      this.eduLevelList = await this.getDictionaries('DEGREEEDUCATION')
      this.cardTypeList = await this.getDictionaries('IDCARD_TYPE')
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

// .uploadimg {
//   width: 100%;
//   height: 220px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-around;
//   margin-top: 32px;
// }

// .uploadimg img {
//   max-width: 160px;
//   max-height: 136px;
// }
.contin1 {
  margin-bottom: 3%;
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 25px 24px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
