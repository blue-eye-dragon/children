<template>
  <!-- 困境采集 -->

  <div class="conts tadrawer">
    <div class="contin">
      <div v-if="!look">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="儿童类别:"
                        class="fromwid">
            <ta-input defaultValue="困境儿童"
                      :disabled="true" />
          </ta-form-item>
        </ta-form>
      </div>
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="儿童基本信息"
                     key="1"
                     :forceRender="true">
          <div ref="oneout"
               class="mars">
            <Title title="儿童基本信息"
                   :show.sync="showone"></Title>
            <ta-form ref="one"
                     layout="horizontal"
                     :autoFormCreate="(baseForm)=>{this.baseForm = baseForm}">
              <dilemmaBaseInfo :familyPoorOthers="familyPoorOther"
                               :guardianshipDilemmaOthers="guardianshipDilemmaOthers"
                               :unattendedOthers="unattendedOthers"
                               :nobList="nobList"
                               @reasonsOtherSetHeight="reasonsOtherSetHeight"
                               :thisP="thisP"
                               :idcarddisabled="idcarddisabled"
                               @householdRegistryClassifychange="householdRegistryClassifychange"
                               :householdRegistryClassifyhide.sync="householdRegistryClassifyhide"
                               :householdRegistryClassifydisabled.sync="householdRegistryClassifydisabled"
                               :imageUrl.sync="imageUrl"
                               :disabled="disabled"
                               :imglist.sync="imglist"
                               @radiochange="radiochange"
                               @likeaddress="likeaddress"
                               @idcardchanges="idcardchanges"
                               :addressChildModel="addressChildModel"
                               :addressChildModelNow="addressChildModelNow"
                               :heathChildModel="heathChildModel"
                               @setChildAddress="setChildAddress"
                               @setChildAddress1="setChildAddress1"
                               @setChildHeaths="setChildHeaths"
                               @setHeight="setHeight('one', 'oneout')"></dilemmaBaseInfo>
            </ta-form>
          </div>
          <div ref="twoout"
               class="mars">
            <Title title="儿童健康状况"
                   :show.sync="showtwo"></Title>
            <ta-form ref="two"
                     layout="horizontal"
                     :autoFormCreate="(heathForm)=>{this.heathForm = heathForm}">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-form-item label="健康状况"
                                fieldDecoratorId="healthStatus"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 20 }"
                                :fieldDecoratorOptions="rules.healthStatus">
                    <ta-radio-group @change="onChange"
                                    :disabled="disabled">

                      <ta-radio :value="item.value"
                                v-for="(item,index) in heathlist"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                                label="其他"
                                fieldDecoratorId="healthStatusOther"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 10 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                  <div class="canji"
                       v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
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
                       v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
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
                    <ta-form-item v-if="serioushval"
                                  label="其他"
                                  fieldDecoratorId="healthStatusOther"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 9 }"
                                  :fieldDecoratorOptions="rules.healthStatusOther">
                      <ta-input :disabled="disabled"
                                :placeholder="disabled?'':'请输入其他情况'" />
                    </ta-form-item>
                  </div>
                  <!--慢性病-->
                  <div class="canji"
                       v-if="heathval==Enum.HEALTHSTATUS.CHRONICDISEASE">
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
                    <ta-form-item v-if="serioushval"
                                  label="其他"
                                  fieldDecoratorId="healthStatusOther"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 9 }"
                                  :fieldDecoratorOptions="rules.healthStatusOther">
                      <ta-input :disabled="disabled"
                                :placeholder="disabled?'':'请输入其他情况'" />
                    </ta-form-item>
                  </div>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
          <div ref="threeout"
               class="mars">
            <Title title="生活情况"
                   :show.sync="showthree"></Title>
            <ta-form ref="three"
                     layout="horizontal"
                     :autoFormCreate="(statusForm)=>{this.statusForm = statusForm}">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-form-item label="学业状况"
                                fieldDecoratorId="academicStatus"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :fieldDecoratorOptions="rules.academicStatus">
                    <ta-radio-group @change="xyChange"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in xystatus"
                                :key="index">{{item.label}}</ta-radio>
                      <!-- <ta-input
                          :disabled="disabled"
                          v-model="academicStatusOther"
                          v-if="xyval==Enum.SCHOOLWORK.OTHER"
                          placeholder="请选择学业状况"
                          type="text"
                          style="width:200px"
                          />-->
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                v-if="xyval==Enum.SCHOOLWORK.OTHER"
                                fieldDecoratorId="academicStatusOther"
                                :fieldDecoratorOptions="rules.academicStatusOther">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="就学情况"
                                fieldDecoratorId="goSchoolStatus"
                                :fieldDecoratorOptions="rules.goSchoolStatus">
                    <ta-select allowClear
                               :disabled="disabled?true:goSchoolStatusDisabled"
                               :placeholder="(disabled?true:goSchoolStatusDisabled)?'':'请选择就学情况'">
                      <ta-select-option v-for="item in schoolingList"
                                        :disabled="!goSchoolStatusDisabled?item.value==Enum.DEGREEEDUCATION.XLQ:false"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12"
                        v-if="isAtSchool">
                  <ta-form-item label="是否学校寄宿"
                                :fieldDecoratorOptions="rules.boarder"
                                fieldDecoratorId="isBoardingSchool">
                    <ta-select allowClear
                               :disabled="disabled"
                               :placeholder="disabled?'':'请选择是否学校寄宿'">
                      <ta-select-option v-for="item in yesNoList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="监护类型"
                                fieldDecoratorId="guardianshipType"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
                    <ta-radio-group :disabled="disabled">
                      <ta-radio @click="deuRadio(item.value,'guardianshipType',statusForm.getFieldsValue().guardianshipType)"
                                :value="item.value"
                                v-for="(item,index) in jhList"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他特殊情况"
                                fieldDecoratorId="otherSpecialCircumstances"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]">
                    <ta-checkbox-group :options="othersituationList"
                                       :disabled="disabled"
                                       @change="othersituationChange" />
                  </ta-form-item>
                  <ta-form-item v-if="othersituation"
                                label="其他"
                                fieldDecoratorId="otherSpecialCircumstancesOther"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                  <ta-form-item label="社会福利、救助、帮扶落实情况"
                                fieldDecoratorId="helpSituation"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]">
                    <ta-checkbox-group :options="rescueSituationList"
                                       :disabled="disabled"
                                       @change="rescueSituations" />
                  </ta-form-item>
                  <ta-form-item v-if="rescueSituation"
                                label="其他"
                                fieldDecoratorId="helpSituationOther"
                                :labelCol="{ span:4 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                  <ta-form-item label="有无发生遭受监护人侵害的情况"
                                fieldDecoratorId="isStricken"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
                    <ta-radio-group @change="haveEncroach"
                                    :disabled="disabled">
                      <ta-radio @click="deuRadio(item.value,'isStricken',statusForm.getFieldsValue().isStricken)"
                                v-for="(item,index) in haveEncroachList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他"
                                :labelCol="{ span: 4}"
                                :wrapperCol="{ span: 9 }"
                                v-if="haveEncroachs"
                                fieldDecoratorId="isStrickenOther"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <!-- :fieldDecoratorOptions="rules.academicStatusOther" -->
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入其他情况'"
                              type="text" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="父母信息"
                     key="2"
                     :forceRender="true">
          <div ref="ktoneout"
               class="mars">
            <Title title="儿童父母情况"
                   :show.sync="showktone"></Title>
            <ta-row ref="ktone">
              <ta-col :span="11">
                <ta-form layout="horizontal"
                         :autoFormCreate="(fatherForm)=>{this.fatherForm = fatherForm}">
                  <dilemmaParentInfo :parentlist.sync='parentlistF'
                                     :mustTip="mustTipF"
                                     :data_='data_F'
                                     types="1"
                                     :familyBreadwinners="familyBreadwinners1"
                                     @zkChange="zkChange"
                                     :disabled="disabled"
                                     :zkval="zkval"
                                     :isman.sync="isman"
                                     :thisP="thisP"
                                     :heathval="heathvalF"
                                     :serioushval="serioushvalF"
                                     :disabiliytypelist="disabiliytypelistF"
                                     :addressFMModel="addressFMModel1"
                                     :addressFMModelNow="addressFMModelNow1"
                                     @setAddressFM="setAddressF"
                                     @setAddressFMNow="setAddressFNow"></dilemmaParentInfo>
                  <!-- :currentSituationOther.sync='currentSituationOther'
                      :isrequired.sync="isrequired"  //WWWWWWW-->
                </ta-form>

              </ta-col>
              <ta-col :span="11"
                      :offset="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(motherForm)=>{this.motherForm = motherForm}">
                  <!-- :isrequired.sync="isrequired1" -->
                  <dilemmaParentInfo :parentlist.sync='parentlistM'
                                     :mustTip="mustTipM"
                                     :data_='data_M'
                                     :familyBreadwinners="familyBreadwinners2"
                                     :isman.sync="isman"
                                     types="2"
                                     :disabled="disabled"
                                     @zkChange="zkChange"
                                     :zkval="zkval1"
                                     :thisP="thisP"
                                     :heathval="heathvalM"
                                     :serioushval="serioushvalM"
                                     :disabiliytypelist="disabiliytypelistM"
                                     :addressFMModel="addressFMModel2"
                                     :addressFMModelNow="addressFMModelNow2"
                                     @setAddressFM="setAddressM"
                                     @setAddressFMNow="setAddressMNow"></dilemmaParentInfo>
                </ta-form>
              </ta-col>
            </ta-row>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="其他监护人信息"
                     key="3"
                     :forceRender="true">
          <div ref="kttwoout"
               class="mars">
            <Title title="其他监护人信息"
                   :show.sync="showkttwo"></Title>
            <ta-row ref="kttwo">
              <ta-form layout="horizontal"
                       :autoFormCreate="(otherManForm)=>{this.otherManForm = otherManForm}">

                <dilemmaOtherPeope :mustTipO="mustTipO"
                                   @otherPother="otherPother"
                                   :isrequired.sync="isrequiredO"
                                   :disabled="disabled"
                                   :thisP="thisP"
                                   :disabiliytypelist="disabiliytypelistO"
                                   :others="zkvalO"
                                   :heathval="heathvalO"
                                   :serioushval="serioushvalO"></dilemmaOtherPeope>
              </ta-form>
            </ta-row>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="机构信息"
                     key="4"
                     :forceRender="true">
          <div ref="ktthreeout"
               class="mars">
            <Title title="机构信息"
                   :show.sync="showktthree"></Title>
            <ta-row ref="ktthree">
              <ta-form layout="horizontal"
                       :autoFormCreate="(OrgForm)=>{this.OrgForm = OrgForm}">
                <ta-col :span="12">
                  <ta-form-item label="机构名称"
                                fieldDecoratorId="dilemmaOrgName"
                                :fieldDecoratorOptions="this.verificationRules('机构名称', 72)">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入机构名称'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="负责人"
                                fieldDecoratorId="principal"
                                :fieldDecoratorOptions="this.verificationRules('负责人', 72)">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入负责人'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="单位性质"
                                fieldDecoratorId="unitNature">
                    <ta-select allowClear
                               :disabled="disabled"
                               :placeholder="disabled?'':'请选择单位性质'">
                      <ta-select-option v-for="(item,index) in UntTyList"
                                        :value="item.value"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="固定电话"
                                fieldDecoratorId="fixedTelphone"
                                :fieldDecoratorOptions="this.verificationRules('固定电话', 16)">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入固定电话'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="联系电话"
                                fieldDecoratorId="telphone"
                                :fieldDecoratorOptions="this.verificationRules('联系电话', {type: 'phone'})">
                    <ta-input :disabled="disabled"
                              :placeholder="disabled?'':'请输入联系电话'"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-col :span="12">
                    <AddressComponent :addressmodel="addressOrgModel"
                                      :msg="'机构地址'"
                                      :labelwidth=" {label: 6,  wrapper: 18}"
                                      fileldName="orgAddress"
                                      :clearPlaceHolder='disabled'
                                      @setaddress="setOrgAddress"></AddressComponent>
                  </ta-col>
                  <ta-col :span="12">
                    <ta-form-item label
                                  fieldDecoratorId="orgAddressParticulars"
                                  style="margin-left:10px;"
                                  :wrapperCol="{ span: 18}"
                                  :fieldDecoratorOptions="this.verificationRules('详细地址', 100)">
                      <ta-input :placeholder="disabled?'':'请输入详细地址'"
                                :disabled="disabled" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
              </ta-form>
            </ta-row>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="帮扶建议"
                     key="5"
                     :forceRender="true">
          <ta-form :autoFormCreate="(suggestForm)=>(this.suggestForm = suggestForm)">
            <ta-row>
              <ta-col :span="24">
                <ta-form-item label="帮扶建议"
                              fieldDecoratorId="supportRecommendations"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 21 }"
                              :require="{message:'请选择帮扶建议'}">
                  <ta-radio-group @change="supportTypes"
                                  :disabled="disabled">
                    <ta-radio :value="item.value"
                              v-for="(item,index) in supportTypeList"
                              :key="index">{{item.label}}</ta-radio>
                  </ta-radio-group>
                </ta-form-item>
                <ta-form-item label="其他"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              v-if="supportType"
                              fieldDecoratorId="supportRecommendationsOther"
                              :fieldDecoratorOptions="this.verificationRules('其他', 100)">
                  <ta-input :disabled="disabled"
                            :placeholder="disabled?'':'请输入其他'"
                            type="text" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div v-if="!look"
         class="bom">
      <ta-button class="btnleft"
                 v-if="jump"
                 @click="backs">返回</ta-button>
      <ta-button v-if="reSave&&!disabled"
                 class="btnleft temporarystorage"
                 @click="submit('s')">暂存</ta-button>
      <ta-button v-if="!disabled"
                 class="btnleft"
                 type="primary"
                 @click="submit ">提交</ta-button>
    </div>
  </div>
</template>
<script>
import dilemmaBaseInfo from './components/dilemmaBaseInfo'
import dilemmaParentInfo from './components/dilemmaParentInfo'
import dilemmaOtherPeope from './components/dilemmaOtherPeope'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
import Title from '@component/common/components/Title'

export default {
  props: {
    look: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    dilemmaBaseInfo,
    Title,
    dilemmaParentInfo,
    dilemmaOtherPeope,
    AddressComponent
  },
  data () {
    return {
      mustTipM: true, // WWWWWWW
      mustTipF: true,
      mustTipO: true,
      data_M: { functionalType: '77', busiType: '29' },
      data_F: { functionalType: '76', busiType: '29' },
      parentlistM: [],
      parentlistF: [], // WWWWWWW
      thisP: this,
      // 儿童地址与健康状况
      addressChildModel: [],
      addressOrgModel: [],
      addressChildModelNow: [],
      heathChildModel: [],
      // 其他监护人地址与健康状况
      familyBreadwinners1: false,
      familyBreadwinners2: false,
      addressFMModel2: [],
      addressFMModel1: [],
      addressFMModelNow1: [],
      addressFMModelNow2: [],
      addressFMModelM: [],
      addressFMModelNowM: [],

      addressOtherModel: [],
      heathOtherModel: [],
      disabled: false,
      goSchoolStatusDisabled: false, // 就学情况的只读
      nowkey: '1',
      showone: true,
      showtwo: true,
      showthree: true,
      showktthree: true,
      // healthStatusOther: '',
      heathlist: [],
      disabiliytypelist: [],
      disabiliytypelistF: [],
      disabiliytypelistM: [],
      disabiliytypelistO: [],
      canjileave: [],
      schoolingList: [],
      employmentlist: [],
      yesNoList: [],
      jhList: [],
      othersituationList: [],
      rescueSituationList: [],
      haveEncroachList: [],
      heathval: '0',
      heathvalF: '0',
      heathvalM: '0',
      heathvalO: '0',

      xystatus: [],
      xyval: '0',
      childrenType: [],
      showktone: true,
      showkttwo: true,
      iscanshow: true,
      showkhtwo: true,
      showkhthree: true,
      showkhone: true,
      adoptorChildrenVos: [],
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
        boarder: this.verificationRules('是否学校寄宿')
      },
      issameaddress: '0',
      status: '',
      imglist: [],
      zkval: '',
      zkval1: '',
      zkvalO: '',

      id: '',
      visible: false,
      exportid: '',
      ishide: true,
      updata: {
        functionalType: '75',
        busiType: '29'
      },
      fileList: [],
      imageUrl: '',
      householdRegistryClassifydisabled: false,
      receiverToChildRelationhide: false,
      resData: {},
      householdRegistryClassifyhide: true,
      serioushval: false,
      serioushvalM: false,
      serioushvalF: false,
      serioushvalO: false,
      isman: [],
      isrequired: true,
      isrequired1: true,
      isrequiredO: false,
      codelist: [],
      idcarddisabled: false,
      childtype: '6',

      childtypedisabled: false,
      isAtSchool: true,
      othersituation: false,
      rescueSituation: false,
      haveEncroachs: false,
      supportTypeList: [],
      supportType: false,
      jump: false,
      UntTyList: [],
      familyPoorOther: false,
      guardianshipDilemmaOthers: '50',
      unattendedOthers: false,
      bj: true,
      nobList: [],

      // idAll
      childBaseInformationVoId: '',
      difficultiesChildrenVoId: '',
      difficultiesChildrenVoChildId: '',
      troubleSupportAdviseVoId: '',
      troubleSupportAdviseVoTroubleChildId: '',
      troubledUnitVoTroubleChildId: '',
      troubledUnitVoId: '',
      fatherId: '',
      fatherParentsId: '',
      fatherTroubleChildId: '',
      motherDataId: '',
      motherDataParentsId: '',
      motherDataTroubleChildId: '',
      otherManDataId: '',
      otherManDataParentsId: '',
      otherManDataTroubleChildId: '',

      saveUrl: '',
      reSave: true
    }
  },
  activated () {
    this.getchildType()
    this.loadData()
    this.jump = false
    this.jump = !!this.$route.query.jump
    // 查看详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.bj = true

      this.getDetails()
    } else {
      this.bj = false
      this.getChildNum()
    }
    if (this.$route.query.url) {
      // hf
      this.saveUrl = this.$route.query.url
      this.reSave = false
    }
    this.disabled = !!this.$route.query.disabled // true 查看
    if (this.look) {
      this.disabled = true
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.getnation()
    this.getleave()
    this.getxystatus()
    this.getschooling()
    this.getemployment()
    this.getyesNoType()
    this.getUnList()
    this.statusForm.setFieldsValue({ academicStatus2: '1' })
  },
  methods: {
    mustTipchange (v, types) { // WWWWWWW
      if (types == '1') {
        this.mustTipF = v
      } else {
        this.mustTipM = v
      }
    },
    mustTipOCtrl (v) { // WWWWW
      this.mustTipO = v
    },
    deuRadio (v, a, b) {
      if (b == v) {
        this.$nextTick(() => {
          if (a == 'isStricken') {
            this.statusForm.setFieldsValue({
              isStricken: ''
            })
          } else if (a == 'guardianshipType') {
            this.statusForm.setFieldsValue({
              guardianshipType: ''
            })
          }
        })
      }
    },
    hightS () {
      setTimeout(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('three', 'threeout')
        this.setHeight('ktone', 'ktoneout')
        this.setHeight('kttwo', 'kttwoout')
        this.setHeight('ktthree', 'ktthreeout')
      }, 800)
    },
    supportTypes (v) {
      if (v.target.value == 7) {
        this.supportType = true
      } else {
        this.supportType = false
      }
    },
    othersituationChange (v) {
      if (v[v.length - 1] == '5') {
        v = ['5']
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
            otherSpecialCircumstances: v,
            otherSpecialCircumstancesOther: ''
          })
          this.othersituation = true
        })
      } else if (v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
            otherSpecialCircumstances: v,
            otherSpecialCircumstancesOther: ''
          })
          this.othersituation = false
        })
      }

      this.setHeight('three', 'threeout')
    },
    rescueSituations (v) {
      if (v[v.length - 1] == '10') {
        v = ['10']
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
            helpSituation: v,
            helpSituationOther: ''
          })
          this.rescueSituation = true
        })
      } else if (v[v.length - 1] != '10') {
        if (v[0] == '10') {
          v.shift()
        }
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
            helpSituation: v,
            helpSituationOther: ''
          })
          this.rescueSituation = false
        })
      }
      this.setHeight('three', 'threeout')
    },
    haveEncroach (v) {
      if (v.target.value == 6) {
        this.haveEncroachs = true
      } else {
        this.haveEncroachs = false
      }
      this.setHeight('three', 'threeout')
      return v
    },
    likeaddress () {
      this.$nextTick(() => {
        const data = this.baseForm.getFieldsValue()
        if (data.sameAddress.length > 0) {
          const ads = data.censusRegisterSD
          const deads = data.censusRegisterDetail
          this.baseForm.setFieldsValue({
            currentAddressDetail: deads
          })
          this.$nextTick(() => {
            this.addressChildModelNow = ads || []
            if (ads.length == 0) {
              this.baseForm.setFieldsValue({
                currentAddress: []
              })
            }
          })
        }
      })
    },
    householdRegistryClassifychange (val) {
      if (val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.baseForm.setFieldsValue({
          censusRegisterSD: undefined,
          censusRegisterDetail: undefined,
          censusRegister: undefined
        })
      }
      if (
        val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.FLYJTH ||
        val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.BXQHK
      ) {
        // this.getdefaultads()
        const data = this.baseForm.getFieldsValue()

        if (!data.censusRegisterSD || data.censusRegisterSD.length == 0) {
          // 户口分类联动获取默认地址
          // this.addressChildModel = [...this.codelist];
        }
      }
    },

    zkChange (val, e) {
      // fm
      if (e == 1) {
        this.zkval = val
      } else {
        this.zkval1 = val
      }
      this.setHeight('ktone', 'ktoneout')
    },
    otherPother (val) {
      this.zkvalO = val
      this.setHeight('kttwo', 'kttwoout')
    },
    backs () {
      this.$router.go(-1)
    },
    radiochange () {
      this.setHeight('one', 'oneout')
    },
    onClose () {
      this.visible = false
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    loadData () {
      this.mustTipM = true // WWWWWWW
      this.mustTipF = true
      this.mustTipO = true
      this.parentlistM = []
      this.parentlistF = [] // WWWWWWW
      this.familyPoorOther = false
      this.guardianshipDilemmaOthers = '50'
      this.unattendedOthers = false
      this.familyBreadwinners1 = false
      this.familyBreadwinners2 = false
      this.idcarddisabled = false
      this.codelist = []
      this.isrequired = true
      this.isrequired1 = true
      this.isrequiredO = false
      this.isman = []
      this.serioushval = false
      this.householdRegistryClassifydisabled = false
      this.householdRegistryClassifyhide = true
      this.resData = {}
      this.receiverToChildRelationhide = false

      this.imageUrl = 'static/img/defalimg.png'
      this.fileList = []
      this.adoptorChildrenVos = []
      this.addressChildModel = []
      this.addressOrgModel = []
      this.addressChildModelNow = []
      this.addressFMModel1 = []
      this.addressFMModel2 = []
      this.addressFMModelNow1 = []
      this.addressFMModelNow2 = []
      this.addressFMModelM = []
      this.addressFMModelNowM = []

      this.ishide = true
      this.exportid = ''
      this.visible = false
      this.id = ''

      this.zkval = ''

      this.zkval1 = ''
      this.imglist = []

      this.xyval = '0'
      this.nowkey = '1'
      this.heathval = '0'

      this.issameaddress = '0'
      this.showone = true
      this.showtwo = true
      this.showthree = true
      this.baseForm.resetFields()
      this.heathForm.resetFields()
      this.statusForm.resetFields()
      this.showktone = true
      this.fatherForm.resetFields()
      this.motherForm.resetFields()
      this.otherManForm.resetFields()
      this.OrgForm.resetFields()

      this.showkttwo = true

      this.iscanshow = true
      this.showktthree = true
      this.showkhone = true

      this.showkhtwo = true

      this.showkhthree = true
      this.heathForm.setFieldsValue({
        healthStatus: '10'
      })
      this.statusForm.setFieldsValue({ academicStatus2: '1' })
      this.statusForm.setFieldsValue({
        academicStatus: '1'
      })
      const date = new Date()
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 < 10
          ? '0' + date.getMonth() + 1
          : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const dates = year + '-' + month + '-' + day
      this.baseForm.setFieldsValue({
        nation: '01',
        applicationTime: moment(dates, 'YYYY-MM-DD')
      })
      this.suggestForm.setFieldsValue()
    },
    // 身份账号回调
    async idcardchanges (val) {
      const data = this.go(val, val.length, this, null)
      if (data.age) {
        const res = data.age - 18
        if (res >= 0) {
          this.$message.error('此儿童超过最大年龄（18岁）限制，不符合采集要求！')
          this.$nextTick(() => {
            this.baseForm.setFieldsValue({
              idCard: ''
            })
          })
        } else {
          if (data.birth) {
            await this.$nextTick(() => {
              this.baseForm.setFieldsValue({
                birthday: moment(data.birth),
                sex: data.sex
              })
            })
          }
        }
      }

      const params = {
        idCard: val,
        childType: this.childtype
      }
      // 验重
      const res = await this.post(
        '/DilemmaChildApi/checkAgain',
        params
      )
      if (!res.errors) {
        if (res.data.data != 0) {
          let masegges = ''
          let tiped = 0
          switch (res.data.data) {
            case '1':
              tiped = 1
              masegges = '此儿童已是暂存状态，可前往采集列表查看，不可重复采集！'
              break
            case '2':
              tiped = 2
              masegges = '此儿童是已采集状态，可前往采集列表查看，不可重复采集！'
              break
            case '3':
              tiped = 3
              masegges = '此儿童已是退出状态，可前往变更列表查看，不可重复采集！'
              break
          }
          // alert(tiped)
          // tiped = 3
          // if (tiped == 1 || tiped == 2) {
          //   this.$confirm({
          //     title: '提示',
          //     content: masegges,
          //     okText: '跳转',
          //     // okType: 'danger',
          //     cancelText: '取消',
          //     onOk: () => {
          //       this.$router.go(-1)
          //       // this.backs()
          //       // this.$router.push({
          //       //   name: 'dilemmaCollection'
          //       // // query: {
          //       // //   jump: 'yes',
          //       // //   id: obj.dilemmaChildId,
          //       // //   disabled: tp
          //       // // }
          //       // })
          //     },
          //     onCancel: () => {
          //       console.log('Cancel')
          //     }
          //   })
          // }
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
    },

    // 儿童类型
    async getchildType () {
      const data = await this.getchildtypelist()
      this.childrenType = data
    },
    // 是否、监护类型
    async getyesNoType () {
      this.yesNoList = await this.getDictionaries('YESNO')
      this.jhList = await this.getDictionaries('GUARDIANSHIPTYPE')
      this.othersituationList = await this.getDictionaries('OTHERSPECIALCASES')
      this.rescueSituationList = await this.getDictionaries(
        'SOCIALWELFAREIMPLEMENTATION'
      )
      this.rescueSituationList.sort((a, b) => {
        return a.value - b.value
      })
      this.haveEncroachList = await this.getDictionaries('GUARDIANVIOLATION')
      this.supportTypeList = await this.getDictionaries('SUPPORTTYPES')
      this.UntTyList = await this.getDictionaries('UNIT_PORPERTY')
    },
    // EMPLOYMENTSITUATION 就业
    async getemployment () {
      const data = await this.getDictionaries('EMPLOYMENTSITUATION')
      this.employmentlist = data
    },
    // ACADEMICSTATUS 学业
    async getxystatus () {
      const data = await this.getDictionaries('ACADEMICSTATUS')
      this.xystatus = data
    },
    // SCHOOLSITUATION 就学情况
    async getschooling () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.schoolingList = data
    },
    // DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    // 健康狀況
    async getnation () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    async getUnList () {
      const formdata = {
        parentValue: 10,
        codeType: 'TROUBLEMONITORING'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.nobList = data.data.codeList
    },

    xyChange (e) {
      this.xyval = e.target.value
      // 学业状况为学龄前时，就学情况设为学龄前并只读
      if (this.xyval == this.Enum.ACADEMICSTATUS.XLQ) {
        this.statusForm.setFieldsValue({
          goSchoolStatus: this.Enum.DEGREEEDUCATION.XLQ
        })
        this.goSchoolStatusDisabled = true
      } else {
        this.statusForm.setFieldsValue({
          goSchoolStatus: null
        })
        this.goSchoolStatusDisabled = false
      }
      if (this.xyval == this.Enum.ACADEMICSTATUS.ZD) {
        this.isAtSchool = true
      } else {
        this.isAtSchool = false
      }
      this.setHeight('three', 'threeout')
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val, ty) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      if (ty && ty == '1') {
        this.disabiliytypelistF = data.data.codeList
      } else if (ty && ty == '2') {
        this.disabiliytypelistM = data.data.codeList
      } else if (ty && ty == '3') {
        this.disabiliytypelistO = data.data.codeList
      } else {
        this.disabiliytypelist = data.data.codeList
      }
    },
    heathvals (e, t) {
      if (t === '1') {
        this.heathvalF = e.target.value
      } else {
        this.heathvalM = e.target.value
      }
    },
    serioushvals (a, type) {
      if (type === '1') {
        this.serioushvalF = a
      } else {
        this.serioushvalM = a
      }
    },
    heathvalsOther (e) {
      this.heathvalO = e.target.value
    },
    serioushvalsOther (a) {
      this.serioushvalO = a
    },
    // 儿童编号接口获取数据
    async getChildNum () {
      const data = await this.post('/serialApi/getChildNumber', {})
      this.baseForm.setFieldsValue({
        childNumber: data.data.code
      })
    },
    seriousillnesschange (val) {
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
            this.heathForm.setFieldsValue({
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
            this.heathForm.setFieldsValue({
              disabledType: arr
            })
          })
        }
      }
      this.setHeight('two', 'twoout')
    },
    onChange (e) {
      this.heathForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })

      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('two', 'twoout')
    },
    familyCome (v, types) {
      if (v[v.length - 1] == '5' && types == 1) {
        v = ['5']
        this.$nextTick(() => {
          this.fatherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          })

          this.familyBreadwinners1 = true
          this.setHeight('ktone', 'ktoneout')
        })
      } else if (types == 1 && v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }
        this.$nextTick(() => {
          this.fatherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          })
          this.familyBreadwinners1 = false

          this.setHeight('ktone', 'ktoneout')
        })
      }
      if (v[v.length - 1] == '5' && types == 2) {
        v = ['5']
        this.$nextTick(() => {
          this.motherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          })

          this.familyBreadwinners2 = true
          this.setHeight('ktone', 'ktoneout')
        })
      } else if (types == 2 && v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }
        this.$nextTick(() => {
          this.motherForm.setFieldsValue({
            familyBreadwinner: v,
            familyBreadwinnerOther: ''
          })

          this.familyBreadwinners2 = false
          this.setHeight('ktone', 'ktoneout')
        })
      }
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (refout == 'ktthreeout') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 140 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    async getDetails (val) {
      let data = {}
      if (val) {
        data = { ...val }
      } else {
        const params = { id: this.id }
        const resobj = await this.post('/DilemmaChildApi/queryById', params)
        data = resobj.data.data // 加载数据 2020年1月9日11:56:07
      }

      if (!data.errors) {
        // 基本
        // 基本地址
        const baseData = data.childBaseInformationVo
        this.childBaseInformationVoId = baseData.id
        if (baseData.censusRegisterPro) {
          this.addressChildModel.push(baseData.censusRegisterPro)
        }
        if (baseData.censusRegisterCity) {
          this.addressChildModel.push(baseData.censusRegisterCity)
        }
        if (baseData.censusRegisterCounty) {
          this.addressChildModel.push(baseData.censusRegisterCounty)
        }
        if (baseData.censusRegisterTown) {
          this.addressChildModel.push(baseData.censusRegisterTown)
        }
        if (baseData.censusRegisterVillage) {
          this.addressChildModel.push(baseData.censusRegisterVillage)
        }
        if (baseData.currentAddressPro) {
          this.addressChildModelNow.push(
            baseData.currentAddressPro,
            baseData.currentAddressCity,
            baseData.currentAddressCounty,
            baseData.currentAddressTown
          )
        }
        if (baseData.currentAddressVillage) {
          this.addressChildModelNow.push(baseData.currentAddressVillage)
        }
        // if (baseData.sameAddress) {
        //   baseData.sameAddress = baseData.sameAddress == '0' ? [] : ['1']
        // }
        // 基本时间
        baseData.birthday = baseData.birthday
          ? moment(baseData.birthday, 'YYYY-MM-DD')
          : null
        const diffcultData = data.dilemmaChildVo // 困境儿童
        baseData.isDisabled = diffcultData.isDisabled // WWWWWWW
        // 上传
        if (diffcultData.fileList) {
          const ffOAll = diffcultData.fileList // WWWWWWW
          console.log('ffOAllffOAll-->', ffOAll)
          if (ffOAll.length > 0) {
            await this.$nextTick(() => {
              // let returnFileIds = info.fileList[0].response.data.data.fileid
              //       this.post('/file/getFileUrls', {
              //         returnFileIds: returnFileIds
              //       }).then(res => {
              //         if (res.data) {
              //           this.$emit('update:imageUrl', res.data.fileUrlList[0])
              //         }
              //       })

              ffOAll.forEach((s) => {
                if (s.functionType == '75') {
                  this.imglist.push(s)
                  const returnFileIds = s.response.data.data.fileid
                  this.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
                  //   this.post('/file/getFileUrls', {
                  //     returnFileIds: returnFileIds
                  //   }).then(res => {
                  //     if (res.data) {
                  //       this.imageUrl = window.faceConfig.basePath +
                  //         res.data.fileUrlList[0]// window.faceConfig.basePath +
                  //     }
                  //   })
                }
                if (s.functionType == '76') {
                  this.parentlistF.push(s)
                }
                if (s.functionType == '77') {
                  this.parentlistM.push(s)
                }
              })
            })
          }

          // if()
          // this.imglist = ffOimg // 文件列表赋值回显

          //   this.parentlistM = ffO2 // 文件列表赋值回显

          //   this.parentlistF = ffO // 文件列表赋值回显
        }

        this.difficultiesChildrenVoId = diffcultData.id
        this.difficultiesChildrenVoChildId = diffcultData.childId

        // 处理条件联动
        if (diffcultData.familyPoor == 4) {
          // 家困qt
          this.familyPoorOther = true
          // this.baseForm.setFieldsValue({
          //   placeReasonOther: diffcultData.familyPoor
          // })
        }
        if (diffcultData.guardianshipDilemma) {
          // 监护困qt
          this.guardianshipDilemmaOthers = diffcultData.guardianshipDilemma
          if (diffcultData.guardianshipDilemma == 10) {
            this.getUnList()
          }
        }
        if (diffcultData.unattended == 15) {
          // 无人其他
          this.unattendedOthers = true
        } else { this.unattendedOthers = false }

        // 儿童健康状况
        this.heathval = diffcultData.healthStatus
          ? diffcultData.healthStatus
          : ''
        // 健康状况
        if (diffcultData.disabledType) {
          diffcultData.disabledType = diffcultData.disabledType.split(',')
          if (
            diffcultData.disabledType[diffcultData.disabledType.length - 1] ==
            this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
            diffcultData.disabledType[diffcultData.disabledType.length - 1] ==
            this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
          ) {
            this.serioushval = true
          } else {
            this.serioushval = false
          }
        }
        await this.getdisabiliytype(diffcultData.healthStatus)
        if (!diffcultData.disabledType) {
          diffcultData.disabledType = []
        }
        if (diffcultData.academicStatus) {
          // 学业情况 其他
          this.xyval = diffcultData.academicStatus
        }
        if (diffcultData.academicStatus == 1) {
          // 学业情况 住校
          this.isAtSchool = true
        } else {
          this.isAtSchool = false
        }
        if (diffcultData.otherSpecialCircumstances == 5) {
          // 其他特殊情况
          this.othersituation = true
        } else {
          this.othersituation = false
        }
        if (diffcultData.otherSpecialCircumstances) {
          diffcultData.otherSpecialCircumstances = diffcultData.otherSpecialCircumstances.split(
            ','
          )
        } else {
          diffcultData.otherSpecialCircumstances = []
        }
        if (diffcultData.helpSituation == 10) {
          // 社会福利、救助、帮扶落实情况
          this.rescueSituation = true
        } else {
          this.rescueSituation = false
        }
        if (diffcultData.helpSituation) {
          diffcultData.helpSituation = diffcultData.helpSituation.split(',')
        } else {
          diffcultData.helpSituation = []
        }
        if (diffcultData.isStricken == 6) {
          // 侵害
          this.haveEncroachs = true
        } else {
          this.haveEncroachs = false
        }
        // let suggestData = this.suggestForm.getFieldsValue() // 帮扶建议
        const suggestData = data.dilemmaSupportAdviseVo
          ? data.dilemmaSupportAdviseVo
          : [] // 建议
        this.troubleSupportAdviseVoId = suggestData.id
        this.troubleSupportAdviseVoTroubleChildId = suggestData.dilemmaChildId
        if (suggestData.supportRecommendations == 7) {
          this.supportType = true
        } else {
          this.supportType = false
        }
        await this.$nextTick(() => {
          this.baseForm.setFieldsValue(baseData)
          this.baseForm.setFieldsValue({
            sameAddress: diffcultData.sameAddress == '0' ? [] : ['1'],
            placeReason: diffcultData.placeReason,
            placeReasonOther: diffcultData.placeReasonOther,
            familyPoor: diffcultData.familyPoor,
            familyPoorOther: diffcultData.familyPoorOther,
            guardianshipDilemma: diffcultData.guardianshipDilemma,
            unattended: diffcultData.unattended,
            guardianshipDilemmaOther: diffcultData.guardianshipDilemmaOther
          })
          // this.baseForm.setFieldsValue(diffcultData)
          this.heathForm.setFieldsValue(diffcultData)
          this.statusForm.setFieldsValue(diffcultData)
          this.goSchoolStatusDisabled = unattendedChildBaseInfoVo.academicStatus == this.Enum.ACADEMICSTATUS.XLQ
          // this.statusForm.setFieldsValue({isStricken: diffcultData.isStricken})
          this.suggestForm.setFieldsValue(suggestData)
        })

        // let orgData = this.OrgForm.getFieldsValue() /// 机构信息
        const orgData = data.dilemmaUnitVo // 机构
        this.troubledUnitVoTroubleChildId = orgData.dilemmaChildId ? orgData.dilemmaChildId : ''
        this.troubledUnitVoId = orgData.id ? orgData.id : ''
        if (orgData.orgAddressProvince) {
          this.addressOrgModel.push(
            orgData.orgAddressProvince,
            orgData.orgAddressCity,
            orgData.orgAddressCounty
          )
        }
        this.$nextTick(() => {
          this.OrgForm.setFieldsValue(orgData)
        })
        //  let motherData = this.motherForm.getFieldsValue() // 父母及其他监护人信息：
        // let fatherData = this.fatherForm.getFieldsValue()
        // let otherManData = this.otherManForm.getFieldsValue()
        const manData = data.dilemmaParentsVoList // 监护人

        if (manData) {
          const fatherData = manData[0]
          const motherData = manData[1]
          const otherManData = manData[2]

          this.fatherId = fatherData.id
          this.fatherParentsId = fatherData.parentsId
          this.fatherTroubleChildId = fatherData.dilemmaChildId

          this.motherDataId = motherData.id
          this.motherDataParentsId = motherData.parentsId
          this.motherDataTroubleChildId = motherData.dilemmaChildId

          this.otherManDataId = otherManData.id
          this.otherManDataParentsId = otherManData.parentsId
          this.otherManDataTroubleChildId = otherManData.dilemmaChildId

          manData.forEach((e, i) => {
            if (e) {
              if (i < 2) {
                let infoCaseStatus = true // WWWWWWW

                const addressFMModels = []
                const addressFMModelNows = []
                let zkvals = ''
                let familyBreadwinnerss = false
                let heaths = '0'
                let serioush = false
                if (e.censusRegisterPro) {
                  addressFMModels.push(
                    e.censusRegisterPro,
                    e.censusRegisterCity,
                    e.censusRegisterCounty
                  )
                }
                if (e.censusRegisterTown) {
                  addressFMModels.push(e.censusRegisterTown)
                }
                if (e.censusRegisterVillage) {
                  addressFMModels.push(e.censusRegisterVillage)
                }
                if (e.currentAddressPro) {
                  addressFMModelNows.push(
                    e.currentAddressPro,
                    e.currentAddressCity,
                    e.currentAddressCounty
                  )
                }
                if (e.currentAddressTown) {
                  addressFMModelNows.push(e.currentAddressTown)
                }
                if (e.currentAddressVillage) {
                  addressFMModelNows.push(e.currentAddressVillage)
                }
                if (e.otherSpecialCircumstances) {
                  zkvals = e.otherSpecialCircumstances
                } else {
                  e.otherSpecialCircumstances = []
                }

                if (e.familyBreadwinner) {
                  if (e.familyBreadwinner == '5') {
                    familyBreadwinnerss = true
                  } else {
                    familyBreadwinnerss = false
                  }
                  e.familyBreadwinner = e.familyBreadwinner.split(',')
                } else {
                  e.familyBreadwinner = []
                }

                heaths = e.healthStatus || ''
                if (e.disabledType) {
                  e.disabledType = e.disabledType.split(',')
                  if (
                    e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
                    e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
                  ) {
                    serioush = true
                  } else {
                    serioush = false
                  }
                } else {
                  e.disabledType = []
                }
                this.getdisabiliytype(e.healthStatus, i + 1)
                e.sameAddress = e.sameAddress == '0' ? [] : ['1']
                // WWWWWWW
                if (e.infoCase == '1') { // 信息完整
                  infoCaseStatus = true
                } else {
                  infoCaseStatus = false
                }
                if (i == 0) {
                  this.mustTipF = infoCaseStatus // WWWWWWWF
                  this.addressFMModel1 = addressFMModels || [] // 户籍
                  this.addressFMModelNow1 = addressFMModelNows || [] // 现地址
                  this.setAddressFNow()
                  this.setAddressF()
                  this.zkval = zkvals // 其他特殊情况 其他 9
                  this.familyBreadwinners1 = familyBreadwinnerss // 经济来源其他
                  this.heathvalF = heaths || '' // 健康状况其他
                  this.serioushvalF = serioush // 慢性病 ... 其他

                  this.$nextTick(() => {
                    this.fatherForm.setFieldsValue(e)
                  })
                } else {
                  this.mustTipM = infoCaseStatus // WWWWWWW
                  this.addressFMModel2 = addressFMModels || []
                  this.addressFMModelNow2 = addressFMModelNows
                  this.setAddressM()
                  this.setAddressMNow()

                  this.zkval1 = zkvals
                  this.familyBreadwinners2 = familyBreadwinnerss
                  this.heathvalM = heaths || ''
                  this.serioushvalM = serioush
                  this.$nextTick(() => {
                    this.motherForm.setFieldsValue(e)
                  })
                }
              }

              if (i == 2) {
                // 其他监护人
                if (e.otherGuardianReason) {
                  const nameList = e.otherGuardianReason.split(',')

                  nameList.forEach(a => {
                    switch (a) {
                      case '1':
                        e.name1 = '1'
                        break
                      case '2':
                        e.name1 = '2'
                        break
                      case '3':
                        e.name2 = '3'
                        break
                      case '4':
                        e.name2 = '4'
                        break
                      case '5':
                        e.name3 = '5'
                        break
                      case '6':
                        e.name3 = '6'
                        break
                      case '7':
                        e.name4 = '7'
                        break
                      case '8':
                        e.name4 = '8'
                        break
                    }
                  })
                }

                if (e.otherSpecialCircumstances) {
                  this.zkvalO = e.otherSpecialCircumstances
                  // this.otherManForm.setFieldsValue({otherSpecialCircumstances: e.otherSpecialCircumstances})
                } else {
                  e.otherSpecialCircumstances = []
                } // 其他特殊

                this.heathvalO = e.healthStatus || ''
                if (e.disabledType) {
                  e.disabledType = e.disabledType.split(',')
                  if (
                    e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
                    e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
                  ) {
                    this.serioushvalO = true
                  } else {
                    this.serioushvalO = false
                  }
                }
                this.getdisabiliytype(e.healthStatus, '3') // ***
                if (!e.disabledType) {
                  e.disabledType = []
                }
                e.grandFatherBirthday = e.grandFatherBirthday
                  ? moment(e.grandFatherBirthday, 'YYYY-MM-DD')
                  : null
                e.grandFatherTwoBirthday = e.grandFatherTwoBirthday
                  ? moment(e.grandFatherTwoBirthday, 'YYYY-MM-DD')
                  : null
                e.grandMotherBirthday = e.grandMotherBirthday
                  ? moment(e.grandMotherBirthday, 'YYYY-MM-DD')
                  : null
                e.grandMotherTwoBirthday = e.grandMotherTwoBirthday
                  ? moment(e.grandMotherTwoBirthday, 'YYYY-MM-DD')
                  : null

                if (e.name4 == '7') { // WWWWWW
                  this.mustTipO = true
                } else {
                  this.mustTipO = false
                }
                this.$nextTick(() => {
                  this.otherManForm.setFieldsValue(e)
                })
              }
            }
          })
        }
        if (this.disabled) {
          // smIdCard
          this.baseForm.setFieldsValue({
            idCard: baseData.smIdCard ? baseData.smIdCard : ''
          })
          this.fatherForm.setFieldsValue({
            idCard: manData[0].smIdCard ? manData[0].smIdCard : ''
          })
          this.motherForm.setFieldsValue({
            idCard: manData[1].smIdCard ? manData[1].smIdCard : ''
          })
          this.otherManForm.setFieldsValue({
            idCard: manData[2].smIdCard ? manData[2].smIdCard : ''
          })
        }
      }
    },

    getnum (val) {
      let num = 0
      for (const k in val) {
        if (val[k]) {
          num++
        }
      }
      return num
    },
    // async processingData () {
    //   // 儿童基本信息
    //   let childBaseInformationVo = this.baseForm.getFieldsValue()

    //   if (childBaseInformationVo.birthday) {
    //     childBaseInformationVo.birthday = childBaseInformationVo.birthday.format(
    //       'YYYY-MM-DD'
    //     )
    //   }
    //   if (childBaseInformationVo.censusRegisterSD) {
    //     childBaseInformationVo.censusRegisterPro =
    //       childBaseInformationVo.censusRegisterSD[0]
    //     childBaseInformationVo.censusRegisterCity =
    //       childBaseInformationVo.censusRegisterSD[1]
    //     childBaseInformationVo.censusRegisterCounty =
    //       childBaseInformationVo.censusRegisterSD[2]
    //     childBaseInformationVo.censusRegisterTown =
    //       childBaseInformationVo.censusRegisterSD[3]
    //     childBaseInformationVo.censusRegisterVillage =
    //       childBaseInformationVo.censusRegisterSD[4]
    //     delete childBaseInformationVo.censusRegisterSD
    //   }

    //   if (childBaseInformationVo.currentAddress) {
    //     childBaseInformationVo.currentAddressPro =
    //       childBaseInformationVo.currentAddress[0]
    //     childBaseInformationVo.currentAddressCity =
    //       childBaseInformationVo.currentAddress[1]
    //     childBaseInformationVo.currentAddressCounty =
    //       childBaseInformationVo.currentAddress[2]
    //     childBaseInformationVo.currentAddressTown =
    //       childBaseInformationVo.currentAddress[3]
    //     childBaseInformationVo.currentAddressVillage =
    //       childBaseInformationVo.currentAddress[4]
    //     delete childBaseInformationVo.currentAddress
    //   }
    //   // 健康状况 生活状况
    //   let heathForm = this.heathForm.getFieldsValue()
    //   let statusForm = this.statusForm.getFieldsValue()
    //   let unattendedChildBaseInfoVo = { ...heathForm, ...statusForm }
    //   if (unattendedChildBaseInfoVo.disabledType) {
    //     unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.join(
    //       ','
    //     )
    //   }
    //   let arr = []
    //   let filelist = [...this.imglist, ...this.fileList]
    //   filelist.map(item => {
    //     arr.push(item.response.data.data.fileid)
    //   })
    //   unattendedChildBaseInfoVo.upLoadPathIds = arr

    //   // 特殊处理申请时间
    //   if (childBaseInformationVo.applicationTime) {
    //     unattendedChildBaseInfoVo.applicationTime = childBaseInformationVo.applicationTime.format(
    //       'YYYY-MM-DD'
    //     )
    //   }
    //   // 地址一致 sameAddress
    //   if (childBaseInformationVo.sameAddress.length > 0) {
    //     unattendedChildBaseInfoVo.sameAddress = '1'
    //   } else {
    //     unattendedChildBaseInfoVo.sameAddress = '0'
    //   }
    //   // 父母及监护人信息
    //   let unattendedParentInfoVoList = []
    //   let uniparental = '0'

    //   uniparental = this.isman[0] || '0'

    //   let fatherForm = this.fatherForm.getFieldsValue()
    //   fatherForm.typeRelation = 1
    //   fatherForm.uniparental = uniparental

    //   let motherForm = this.motherForm.getFieldsValue()
    //   motherForm.typeRelation = 2
    //   motherForm.uniparental = uniparental

    //   unattendedParentInfoVoList = [...this.adoptorChildrenVos]
    //   if (this.getnum(fatherForm) > 2) {
    //     unattendedParentInfoVoList.push(fatherForm)
    //   }
    //   if (this.getnum(motherForm) > 2) {
    //     unattendedParentInfoVoList.push(motherForm)
    //   }

    //   let registerAdoptionVo = {
    //     childBaseInformationVo,
    //     unattendedChildBaseInfoVo,
    //     unattendedParentInfoVoList
    //   }

    //   return registerAdoptionVo
    // },
    validateLots (formDate) {
      let FMO = false
      for (const k in formDate) {
        if (formDate[k] != undefined && formDate[k] != '') {
          FMO = true
        }
      }
      return FMO
    },
    formattingDate () { },
    reasonsOtherSetHeight (v, ty) {
      if (ty == 1) {
        if (v == 4) {
          this.familyPoorOther = true
        } else {
          this.familyPoorOther = false
        }
      }
      if (ty == 2) {
        this.guardianshipDilemmaOthers = v
        if (v == 10) {
          this.unattendedOthers = false
        }
      }
      if (ty == 3) {
        if (v == 15) {
          this.unattendedOthers = true
        } else { this.unattendedOthers = false }
      }

      this.setHeight('one', 'oneout')
    },
    dispose (data, e) {
      for (var k in data) {
        if (k != 'uploadFileT') { // WWWWWW
          // 是对象 不是数组
          if (!(data[k] instanceof Array) && data[k] instanceof Object) {
            // if (data[k].file) {
            //   let arr = []
            //   data[k].fileList.map(item => {
            //     arr.push(item.response.data.data.fileid)
            //   })
            //   data[`${k}Id`] = arr
            // } else {
            data[k] = data[k].format('YYYY-MM-DD')
            // }
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
              // data.currentAddressTown = data[k][3]
              // data.currentAddressVillage = data[k][4]
              delete data[k]
            } else {
              data[k] = data[k].join(',')
            }
          }
        }
      }
    },
    async submit (val) {
      let isPass = true
      const message = ''
      const baseData = this.baseForm.getFieldsValue() // 儿童基本信息

      const heathData = this.heathForm.getFieldsValue() // 儿童健康状况

      const statusData = this.statusForm.getFieldsValue() // 生活情况

      const motherData = this.motherForm.getFieldsValue() // 父母及其他监护人信息：

      const fatherData = this.fatherForm.getFieldsValue()

      // WWWWWW

      if (fatherData.infoCase != '1') { // 完整 父亲
        if (this.parentlistF.length == 0) {
          this.fatherForm.setFieldsValue({
            uploadFileT: null
          })
        } else { }
      }
      // 上传
      if (motherData.infoCase != '1') { // 完整 母亲
        if (this.parentlistM.length == 0) {
          this.motherForm.setFieldsValue({
            uploadFileT: null
          })
        } else { }
      } // WWWWWW

      // 同地址
      if (baseData.sameAddress == '') {
        baseData.sameAddress = '0'
      }
      if (motherData.sameAddress == '') {
        motherData.sameAddress = '0'
      }
      if (fatherData.sameAddress == '') {
        fatherData.sameAddress = '0'
      }

      const otherManData = this.otherManForm.getFieldsValue()

      const orgData = this.OrgForm.getFieldsValue() /// 机构信息
      const suggestData = this.suggestForm.getFieldsValue() // 帮扶建议

      let DilemmaChildrenAllVo = {}
      let dilemmaSupportAdviseVo = {} // 建议
      let dilemmaUnitVo = {} // 机构
      const dilemmaParentsVoList = [] // 监护人
      let childBaseInformationVo = {} // 基本信息
      let dilemmaChildVo = {} // 困境儿童

      const FMOM = await this.validateLots(motherData)
      const FMOF = await this.validateLots(fatherData)
      const FMOO = await this.validateLots(otherManData)
      // teb3
      if (val != 's') {
        await this.suggestForm.validateFields((err, values) => {
          if (err) {
            this.isPass = false
            this.nowkey = '5'
          }
        })
        // teb2
        // if (FMOM.name || FMOF.name || FMOO) { //WWWWWW
        if (FMOM) {
          await this.motherForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '2'
              isPass = false
            }
          })
        }
        if (FMOF) {
          await this.fatherForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '2'
              isPass = false
            }
          })
        }
        if (FMOO) {
          await this.otherManForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '3'
              isPass = false
            }
          })
        }

        await this.OrgForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '4'
            isPass = false
          }
        })

        // teb1
        await this.baseForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '1'
            isPass = false
          }
        })
        await this.heathForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '1'
            isPass = false
          }
        })
        await this.statusForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '1'
            isPass = false
          }
        })
      } else {
        isPass = false
      }

      if (isPass || (val == 's' && baseData.name)) {
        this.dispose(baseData)
        this.dispose(heathData)
        this.dispose(statusData)
        this.dispose(statusData)
        this.dispose(motherData)
        this.dispose(fatherData)
        this.dispose(otherManData)
        this.dispose(orgData)
        const upload = []
        const filelist = [...this.imglist, ...this.parentlistF, ...this.parentlistM]
        if (filelist.length > 0) {
          filelist.map(item => {
            upload.push(item.response.data.data.fileid)
          })
          baseData.upLoadPathIds = upload // 上传
        }
        dilemmaChildVo = { ...baseData, ...heathData, ...statusData }
        childBaseInformationVo = baseData
        dilemmaSupportAdviseVo = suggestData
        dilemmaUnitVo = orgData
        const name1 = otherManData.name1
        const name2 = otherManData.name2
        const name3 = otherManData.name3
        const name4 = otherManData.name4
        const namelist = []
        let otherGuardianReason = ''
        namelist.push(
          otherManData.name1,
          otherManData.name2,
          otherManData.name3,
          otherManData.name4
        )

        namelist.forEach(e => {
          if (e) {
            otherGuardianReason += e + ','
          }
        })
        if (otherGuardianReason) {
          otherGuardianReason = otherGuardianReason.substring(
            0,
            otherGuardianReason.length - 1
          )
        }
        otherManData.otherGuardianReason = otherGuardianReason
        dilemmaParentsVoList.push(fatherData, motherData, otherManData) // = [...motherData, ...fatherData, ...otherManData]

        DilemmaChildrenAllVo = {
          dilemmaChildVo,
          childBaseInformationVo,
          dilemmaSupportAdviseVo,
          dilemmaUnitVo,
          dilemmaParentsVoList
        }
        DilemmaChildrenAllVo.dilemmaParentsVoList[0].parentType = 1
        DilemmaChildrenAllVo.dilemmaParentsVoList[1].parentType = 2
        DilemmaChildrenAllVo.dilemmaParentsVoList[2].parentType = 3
        let urls = '/DilemmaChildApi/saveOrUpdate'
        if (this.bj) {
          DilemmaChildrenAllVo.childBaseInformationVo.id = this.childBaseInformationVoId

          DilemmaChildrenAllVo.dilemmaChildVo.id = this.difficultiesChildrenVoId
          DilemmaChildrenAllVo.dilemmaChildVo.childId = this.difficultiesChildrenVoChildId

          DilemmaChildrenAllVo.dilemmaSupportAdviseVo.id = this.troubleSupportAdviseVoId
          DilemmaChildrenAllVo.dilemmaSupportAdviseVo.dilemmaChildId = this.troubleSupportAdviseVoTroubleChildId

          DilemmaChildrenAllVo.dilemmaUnitVo.childId = this.troubledUnitVoTroubleChildId
          DilemmaChildrenAllVo.dilemmaUnitVo.id = this.troubledUnitVoId

          DilemmaChildrenAllVo.dilemmaParentsVoList[0].id = this.fatherId
          DilemmaChildrenAllVo.dilemmaParentsVoList[0].parentsId = this.fatherParentsId
          DilemmaChildrenAllVo.dilemmaParentsVoList[0].dilemmaChildId = this.fatherTroubleChildId

          DilemmaChildrenAllVo.dilemmaParentsVoList[2].id = this.otherManDataId
          DilemmaChildrenAllVo.dilemmaParentsVoList[2].parentsId = this.otherManDataParentsId
          DilemmaChildrenAllVo.dilemmaParentsVoList[2].dilemmaChildId = this.otherManDataTroubleChildId

          DilemmaChildrenAllVo.dilemmaParentsVoList[1].id = this.motherDataId
          DilemmaChildrenAllVo.dilemmaParentsVoList[1].parentsId = this.motherDataParentsId
          DilemmaChildrenAllVo.dilemmaParentsVoList[1].dilemmaChildId = this.motherDataTroubleChildId
        } else { }
        if (this.saveUrl) {
          urls = this.saveUrl
        }
        // 0   暂存， 1   保存
        if (val == 's') {
          urls = '/DilemmaChildApi/tssaveOrUpdate'
          DilemmaChildrenAllVo.state = 0
        } else {
          DilemmaChildrenAllVo.state = 1
        }

        const res = await this.post(urls, DilemmaChildrenAllVo, true)
        if (!res.errors) {
          this.loadData()
          if (this.jump) {
            this.backs()
          }
        }
      } else {
        if (val == 's') {
          this.$message.error('界面中至少填写儿童姓名，暂存失败')
        } else if (message != '') {
          this.nowkey = '2'
          this.$message.error(message)
        } else {
          this.$message.error(
            '校验不通过，无法提交，请再次检查!'
          )
        }
      }
    },
    // 机构地址
    setOrgAddress () {
      this.OrgForm.setFieldsValue({
        orgAddress: this.addressOrgModel
      })
    },
    // 儿童地址传值
    setChildAddress () {
      this.baseForm.setFieldsValue({
        censusRegisterSD: this.addressChildModel
      })
    },
    setChildAddress1 () {
      this.baseForm.setFieldsValue({
        currentAddress: this.addressChildModelNow
      })
    },
    // 父母地址传值
    setAddressM () {
      this.motherForm.setFieldsValue({
        censusRegisterSD: this.addressFMModel2
      })
    },
    // 父母地址传值
    setAddressF () {
      this.fatherForm.setFieldsValue({
        censusRegisterSD: this.addressFMModel1
      })
    },
    setAddressFNow () {
      this.fatherForm.setFieldsValue({
        currentAddress: this.addressFMModelNow1
      })
    },
    setAddressMNow () {
      this.motherForm.setFieldsValue({
        currentAddress: this.addressFMModelNow2
      })
    },
    // 其他监护人地址传值
    setOtherAddress () {
      this.otherForm.setFieldsValue({
        unitDatas: this.addressOtherModel
      })
    },

    // 儿童健康状况传值
    setChildHeaths () {
      this.childForm.setFieldsValue({
        healthConditionDatas: this.heathChildModel
      })
    },
    // 其他监护人健康状况传值
    setOtherHeaths () {
      this.otherForm.setFieldsValue({
        healthConditionDatas: this.heathOtherModel
      })
    },

    // 父母基本信息、其他监护人信息的tab切换
    callback (key) {
      this.nowkey = key
    }
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
    },
    showktone (val) {
      this.setHeight('ktone', 'ktoneout', !val)
    },
    showkttwo (val) {
      this.setHeight('kttwo', 'kttwoout', !val)
    },
    showktthree (val) {
      this.setHeight('ktthree', 'ktthreeout', !val)
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

.selectwid {
  width: 324px;
}

.fromwid {
  width: 424px;
  margin-top: 24px;
  margin-bottom: 10px;
}

.rejectcont {
  width: 100%;
  margin-bottom: 14px;
  background: #fff;
  padding: 20px 0 5px 0;
  box-sizing: border-box;
}

.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
}
</style>
