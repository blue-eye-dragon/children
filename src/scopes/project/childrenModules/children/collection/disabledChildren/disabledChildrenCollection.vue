<template>
  <!-- 残疾儿童-->

  <div class="conts tadrawer abc"
       @click="allvalidator">
    <div class="contin">
      <div v-if="!look">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="儿童类别:"
                        class="fromwid">
            <ta-input defaultValue="残疾儿童"
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
              <disabledChildrenBaseInfo :familyPoorOthers="familyPoorOther"
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
                                        :id="id"
                                        :oldIdCard="oldIdCard"
                                        @callbackByIdCard="callbackByIdCard"
                                        @setValueByIdCard="setValueByIdCard"
                                        :addressChildModel="addressChildModel"
                                        :addressChildModelNow="addressChildModelNow"
                                        :heathChildModel="heathChildModel"
                                        @setChildAddress="setChildAddress"
                                        @setChildAddress1="setChildAddress1"
                                        @setChildHeaths="setChildHeaths"
                                        @setHeight="setHeight('one', 'oneout')"></disabledChildrenBaseInfo>
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
                <!-- <ta-col :span="24">
                  <ta-form-item label="患艾滋病情况"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{span:20}"
                                fieldDecoratorId="adisCondition"
                                :fieldDecoratorOptions="{ initialValue: '1', rules: [{ required: true, message: '请选择患艾滋病情况' }] }">
                    <ta-radio-group @change="radiochangeAdis"
                                    style="width:100%"
                                    :disabled="disabled">
                      <ta-radio v-for="(item,index) in adisConditionList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-radio>

                    </ta-radio-group>

                  </ta-form-item>
                  <ta-form-item v-if="radiovalueAdis==Enum.ADISCONDITION.QT"
                                label="其他"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{span:20}"
                                fieldDecoratorId="adisConditionOther"
                                :fieldDecoratorOptions="this.verificationRules('请输入其他情况', 50)">
                    <ta-input :placeholder="!disabled?'请输入其他情况':''"
                              style='width:300px;'
                              maxlength='50'
                              :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item v-if="radiovalueAdis==Enum.ADISCONDITION.XDHGRAZB"
                                label='确认艾滋病感染时间'
                                fieldDecoratorId="infectionTime"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{span:19}"
                                :require="true">
                    <ta-date-picker style="width: 20%;"
                                    :placeholder="!disabled?'请选择确认艾滋病感染时间':''"
                                    :disabled="disabled"
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label='最有可能感染艾滋病途径'
                                v-if="radiovalueAdis==Enum.ADISCONDITION.XDHGRAZB"
                                fieldDecoratorId="transmissionWay"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{span:19}"
                                :require="true">
                    <ta-radio-group @change="channel"
                                    style="width:100%"
                                    :disabled="disabled">
                      <ta-radio v-for="(item,index) in transmissionWayList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-radio>

                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item v-if="radiovalues==Enum.TRANSMISSIONWAYOTHER.QT"
                                label="其他"
                                :labelCol="{ span: 5}"
                                :wrapperCol="{span:19}"
                                fieldDecoratorId="transmissionWayOther"
                                :fieldDecoratorOptions="this.verificationRules('请输入其他途径', 50)">
                    <ta-input :placeholder="!disabled?'请输入其他途径':''"
                              style='width:300px;'
                              maxlength='50'
                              :disabled="disabled" />
                  </ta-form-item>
                </ta-col>-->
                <ta-col :span="24">
                  <ta-form-item label="健康状况"
                                fieldDecoratorId="healthStatus"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :defaultValue="10"
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
                              maxlength="50"
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>

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
                                maxlength="50"
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
                                maxlength="50"
                                :placeholder="disabled?'':'请输入其他情况'" />
                    </ta-form-item>
                  </div>

                  <ta-form-item label="残疾类型"
                                fieldDecoratorId="illnessType"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]"
                                :require="{message:'请选择残疾类型'}">
                    <ta-checkbox-group :options="disabiliytypelistCj"
                                       @change="setMulti"
                                       :disabled="disabled"
                                       :values="disabilityTypeValues" />
                  </ta-form-item>

                  <ta-form-item label="残疾等级"
                                fieldDecoratorId="disabledLevel"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :require="{message:'请选择残疾等级'}">
                    <ta-radio-group :disabled="disabled"
                                    @change="setLevel">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in canjileave"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>

                    <ta-radio-group style="float:left;"></ta-radio-group>
                  </ta-form-item>

                  <ta-form-item label="残疾证号"
                                fieldDecoratorId="disabledNumber"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 6 }"
                                :require="{message:'请选择残疾证号'}">
                    <ta-input :disabled="true" />
                  </ta-form-item>
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
                <!-- <ta-col :span="24">

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

                    </ta-radio-group>

                  </ta-form-item>

                  <ta-form-item label="其他"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                v-if="xyval==Enum.SCHOOLWORK.OTHER"
                                fieldDecoratorId="academicStatusOther"
                                :fieldDecoratorOptions="rules.healthStatusOther">

                    <ta-input :disabled="disabled"
                              maxlength='50'
                              :placeholder="disabled?'':'请输入其他情况'"
                              type="text" />

                  </ta-form-item>

                </ta-col>-->

                <ta-col :span="24">
                  <ta-form-item label="是否学校寄宿"
                                :require="{message:'请选择是否学校寄宿'}"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 6 }"
                                fieldDecoratorId="isBoardingSchool">
                    <ta-radio-group :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                </ta-col>

                <ta-col :span="24">
                  <ta-form-item label="就学情况"
                                fieldDecoratorId="goSchoolStatus"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 6 }"
                                :fieldDecoratorOptions="rules.goSchoolStatus">
                    <ta-select allowClear
                               :disabled="disabled"
                               :placeholder="disabled?'':'请选择就学情况'">
                      <ta-select-option v-for="item in schoolingList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <!-- v-if="isAtSchool" -->

                  <!-- <ta-select allowClear
                               :disabled="disabled"
                               :placeholder="disabled?'':'请选择是否学校寄宿'">

                      <ta-select-option v-for="item in yesNoList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>

                  </ta-select>-->
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="生活补贴金额(元)"
                                fieldDecoratorId="subsidyMoneyOfLife"
                                :labelCol="{ span: 12 }"
                                :wrapperCol="{ span:12 }"
                                :fieldDecoratorOptions="isshow?this.verificationRules('生活补贴金额(元)'):this.verificationRulesNotMustFill('生活补贴金额(元)', 200)">
                    <!-- :fieldDecoratorOptions="this.verificationRules('生活补贴金额(元)')" -->
                    <ta-input-number :min="0"
                                     :step="1"
                                     :max="9999.99"
                                     :precision="2"
                                     :disabled="disabled"
                                     style="width: 100%"
                                     placeholder="请输入生活补贴金额"></ta-input-number>
                  </ta-form-item>
                  <ta-form-item label="护理补贴金额(元)"
                                fieldDecoratorId="subsidyMoneyOfNurse"
                                :labelCol="{ span: 12 }"
                                :wrapperCol="{ span:12 }"
                                :fieldDecoratorOptions="isshow?this.verificationRules('护理补贴金额(元)'):this.verificationRulesNotMustFill('护理补贴金额(元)', 200)">
                    <!-- :fieldDecoratorOptions="this.verificationRules('护理补贴金额(元)')" -->
                    <ta-input-number :min="0"
                                     :step="1"
                                     :max="9999.99"
                                     :precision="2"
                                     :disabled="disabled"
                                     style="width: 100%"
                                     placeholder="请输入护理补贴金额"></ta-input-number>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="生活补贴发放起始时间"
                                fieldDecoratorId="issueStartTimeOfLife"
                                :labelCol="{ span: 14 }"
                                :wrapperCol="{ span:10 }">
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择起始时间':''"
                                    :disabled="disabled"
                                    @change="onChangeTime1"
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                  <ta-form-item label="护理补贴发放起始时间"
                                fieldDecoratorId="issueStartTimeOfNurse"
                                :labelCol="{ span: 14 }"
                                :wrapperCol="{ span:10 }">
                    <!-- :fieldDecoratorOptions="this.verificationRules('发放起始时间')" -->
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择起始时间':''"
                                    :disabled="disabled"
                                    @change="onChangeTime2"
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                </ta-col>

                <ta-col :span="8">
                  <ta-form-item label="生活补贴发放结束时间"
                                fieldDecoratorId="issueEndTimeOfLife"
                                :labelCol="{ span: 14 }"
                                :wrapperCol="{ span:10 }">
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择结束时间':''"
                                    :disabled="disabled"
                                    :disabledDate="disabledDate1" />
                  </ta-form-item>
                  <ta-form-item label="护理补贴发放结束时间"
                                fieldDecoratorId="issueEndTimeOfNurse"
                                :labelCol="{ span: 14 }"
                                :wrapperCol="{ span:10 }">
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择结束时间':''"
                                    :disabled="disabled"
                                    :disabledDate="disabledDate2" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>

        <ta-tab-pane tab="父母家庭信息"
                     key="2"
                     :forceRender="true">
          <!-- <div ref="ktoneout"
               class="mars">

            <Title title="儿童父母情况"
                   :show.sync="showktone"></Title>

          <ta-row ref="ktone">-->
          <div class="mars1"
               ref="ktoneout">
            <Divider title="儿童父母情况"></Divider>
            <ta-row ref="ktone">
              <ta-col :span="11">
                <ta-form layout="horizontal"
                         :autoFormCreate="(fatherForm)=>{this.fatherForm = fatherForm}">
                  <disabledChildrenParentInfo :parentlist.sync="parentlistF"
                                              :isrequired.sync="isrequired"
                                              :isGuardiandisabled="isGuardiandisabled"
                                              :isphonerule.sync="isphonerule"
                                              :mustTip="mustTipF"
                                              :isread="isread1"
                                              :data_="data_F"
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
                                              @setAddressFMNow="setAddressFNow"></disabledChildrenParentInfo>
                </ta-form>
              </ta-col>

              <ta-col :span="11"
                      :offset="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(motherForm)=>{this.motherForm = motherForm}">
                  <!-- :isrequired.sync="isrequired1" -->

                  <disabledChildrenParentInfo :parentlist.sync="parentlistM"
                                              :isrequired.sync="isrequired1"
                                              :isGuardiandisabled="isGuardiandisabled1"
                                              :isphonerule.sync="isphonerule1"
                                              :mustTip="mustTipM"
                                              :data_="data_M"
                                              :isread="isread2"
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
                                              @setAddressFMNow="setAddressMNow"></disabledChildrenParentInfo>
                </ta-form>
              </ta-col>
            </ta-row>
          </div>
        </ta-tab-pane>

        <ta-tab-pane tab="其他监护人信息"
                     key="3"
                     :forceRender="true">
          <!-- <div ref="kttwoout"
               class="mars">

            <Title title="其他监护人信息"
                   :show.sync="showkttwo"></Title>

          <ta-row ref="kttwo">-->
          <div ref="kttwoout"
               class="mars1">
            <Divider title="其他监护人信息"></Divider>
            <ta-row ref="kttwo">
              <!-- <ta-col :span="11"> -->

              <ta-form layout="horizontal"
                       :autoFormCreate="(otherManForm)=>{this.otherManForm = otherManForm}">
                <disabledChildrenOtherPeope @otherPother="otherPother"
                                            :ortherRe='ortherRe'
                                            :isread="isread3"
                                            :isphonerule="isphonerule"
                                            :isphonerule1="isphonerule1"
                                            :mustTipO="true"
                                            :isrequired.sync="isrequiredO"
                                            :disabled="disabled"
                                            :thisP="thisP"
                                            :disabiliytypelist="disabiliytypelistO"
                                            :others="zkvalO"
                                            :heathval="heathvalO"
                                            :serioushval="serioushvalO"></disabledChildrenOtherPeope>
              </ta-form>

              <!-- </ta-col> -->
            </ta-row>
          </div>
        </ta-tab-pane>
      </ta-tabs>
    </div>

    <div v-if="!look"
         class="bom">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch&&jump"
                 @click="backs">返回</ta-button>
      <!-- v-if="reSave&&!disabled&&nowkeyP!='2'" -->
      <ta-button v-if="false"
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
import disabledChildrenBaseInfo from './components/disabledChildrenBaseInfo'
import disabledChildrenParentInfo from './components/disabledChildrenParentInfo'
import disabledChildrenOtherPeope from './components/disabledChildrenOtherPeope'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
import Title from '@component/common/components/Title'
import Divider from '@component/common/components/divider'
export default {
  props: {
    look: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    disabledChildrenBaseInfo,
    Title,
    Divider,
    disabledChildrenParentInfo,
    disabledChildrenOtherPeope,
    AddressComponent
  },
  data () {
    return {
      disabilityTypeValues: [], // 残疾类别选择的数据
      radiovalueAdis: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      adisConditionList: [],
      transmissionWayList: [],
      isread1: false,
      isread2: false,
      isread3: false,

      mustTipM: true,
      mustTipF: true,
      mustTipO: false,
      data_M: { functionalType: '77', busiType: '29' },
      data_F: { functionalType: '76', busiType: '29' },
      parentlistM: [],
      parentlistF: [],
      thisP: this,
      // 儿童地址与健康状况
      addressChildModel: [],
      addressOrgModel: [],
      addressChildModelNow: [],
      heathChildModel: [],
      // 其他监护人地址与健康状况
      familyBreadwinners1: false,
      familyBreadwinners2: false,
      isGuardiandisabled: false,
      isGuardiandisabled1: false,
      isphonerule: false,
      isphonerule1: false,
      ortherRe: false,
      addressFMModel2: [],
      addressFMModel1: [],
      addressFMModelNow1: [],
      addressFMModelNow2: [],
      addressFMModelM: [],
      addressFMModelNowM: [],

      addressOtherModel: [],
      heathOtherModel: [],
      disabled: false,
      nowkey: '1',
      showone: true,
      showtwo: true,
      showthree: true,
      showktthree: true,

      heathlist: [],
      disabiliytypelist: [],
      disabiliytypelistCj: [],
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

      isshow: false,

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
      childtype: '04',

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
      reSave: true,
      nowkeyP: '0',
      isvalidator: false, // 提交时不验证
      oldIdCard: null, // 进入编辑时的身份证号
      childId: null, // 存放儿童身份证号验重时带出来的儿童id
      baseIdBj: '',
      ywBjId: '',
      nowkeys: '',
      nowTime1: null,
      nowTime2: null,
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.disabilityTypeValues = []
    this.getchildType()
    this.loadData()
    this.jump = false
    this.jump = !!this.$route.query.jump
    this.nowkeyP = this.$route.query.nowkey ? this.$route.query.nowkey : '0'

    // 查看详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.bj = true

      this.getDetails()
      if (this.nowkeyP == '0') {
        this.getChildNum()
      }
    } else {
      this.bj = false
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
    this.isGuardiandisabled = !!this.$route.query.disabled
    this.isGuardiandisabled1 = !!this.$route.query.disabled
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
    this.loadData()
    this.getnation()
    this.getleave()
    this.getxystatus()
    this.getschooling()
    this.getemployment()
    this.getyesNoType()
    this.getUnList()
    this.statusForm.setFieldsValue({ academicStatus2: '1' })
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
    // 患艾滋病情况
    radiochangeAdis (val) {
      this.radiovalueAdis = val.target.value
      // this.heathForm.getFieldsValue().healthStatus

      if (val.target.value != this.Enum.ADISCONDITION.XDHGRAZB) {
        this.radiovalues = ''
      }
      this.setHeight('two', 'twoout')
    },
    // 最有可能感染艾滋病途径
    channel (val) {
      this.radiovalues = val.target.value + ''

      this.setHeight('two', 'twoout')
    },
    mustTipchange (v, types) {
      if (types == '1') {
        this.mustTipF = v
        this.fatherForm.resetFields()
      } else {
        this.mustTipM = v
        this.motherForm.resetFields()
      }
    },
    mustTipOCtrl (v) {
      // WWWWW
      this.mustTipO = v
      this.heathvalO = '0'
      this.zkvalO = ''
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
          this.statusForm.setFieldsValue({})
          this.othersituation = false
        })
      }

      this.setHeight('three', 'threeout')
    },
    rescueSituations (v) {
      // if (v[v.length - 1] == '7') {
      //   v = ['7']
      //   this.$nextTick(() => {
      //     this.statusForm.setFieldsValue({
      //       improperCare: v,
      //       improperCareOther: ''
      //     })
      //     this.rescueSituation = true
      //     this.setHeight('three', 'threeout')
      //   })
      // } else if (v[v.length - 1] != '7') {
      //   if (v[0] == '7') {
      //     v.shift()
      //   }
      //   this.$nextTick(() => {
      //     this.statusForm.setFieldsValue({
      //       improperCare: v,
      //       improperCareOther: ''
      //     })

      if (v.target.value == 7) {
        this.rescueSituation = true
      } else {
        this.rescueSituation = false
      }

      this.setHeight('three', 'threeout')
      return v
      //   })
      // }
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
          censusRegister: undefined,
          idCard: undefined,
          birthday: undefined,
          sex: undefined
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
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
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
      this.isFromSearch = false
      this.formDataSearch = {}
      this.isread1 = false
      this.isread2 = false
      this.isread3 = false
      this.baseIdBj = ''
      this.ywBjId = ''
      this.nowkeys = ''
      this.ortherRe = false
      this.childId = null
      this.rescueSituation = false
      this.mustTipM = true
      this.mustTipF = true
      this.mustTipO = false
      this.parentlistM = []
      this.parentlistF = []
      this.saveUrl = ''
      this.reSave = true
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
      this.isGuardiandisabled = false
      this.isGuardiandisabled1 = false
      this.isphonerule = false
      this.isphonerule1 = false
      // this.relationshiphide = false
      // this.relationshiphide1 = false
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
      this.heathvalF = '0'
      this.heathvalM = '0'
      this.heathvalO = '0'
      this.radiovalueAdis = '1'

      this.issameaddress = '0'
      this.showone = true
      this.showtwo = true
      this.showthree = true
      this.baseForm.resetFields()
      this.heathForm.resetFields()
      this.statusForm.resetFields()
      this.showktone = true
      this.fatherForm.resetFields()
      this.otherManForm.resetFields()
      this.motherForm.resetFields()

      this.showkttwo = true

      this.iscanshow = true
      this.showktthree = true
      this.showkhone = true

      this.showkhtwo = true

      this.showkhthree = true

      this.heathForm.setFieldsValue({
        healthStatus: '10',
        adisCondition: '1'
      })

      this.statusForm.setFieldsValue({ academicStatus2: '1' })
      this.statusForm.setFieldsValue({
        academicStatus: '1'
      })
      this.isAtSchool = true
      const dates = this.getnowTime()
      this.baseForm.setFieldsValue({
        nation: '01'
        // applicationTime: moment(dates, 'YYYY-MM-DD')
      })
      this.othersituation = false
      this.supportType = false
    },
    getnowTime () {
      // 获取当前信息格式
      const date = new Date()
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 < 10
          ? '0' + date.getMonth() + 1
          : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const dates = year + '-' + month + '-' + day
      return dates
    },
    // 回显时 时间字段处理
    momentValue (val) {
      return val ? moment(val) : null
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      if (val) {
        // 需要进行回显
        this.childId = val.id // 儿童id
        // val['applicationTime'] = this.momentValue(val.applicationTime)
        val.birthday = this.momentValue(val.birthday)
        val.sameAddress = ['0']
        this.baseForm.setFieldsValue(val)
        if (
          val.householdRegistryClassify ==
          this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
        ) {
          this.householdRegistryClassifydisabled = true
        }
        // 户籍所在地处理
        this.addressChildModel = [
          val.censusRegisterPro || '',
          val.censusRegisterCity || '',
          val.censusRegisterCounty || '',
          val.censusRegisterTown || '',
          val.censusRegisterVillage || ''
        ]
        // 现住址处理
        this.addressChildModelNow = [
          val.currentAddressPro || '',
          val.currentAddressCity || '',
          val.currentAddressCounty || '',
          val.currentAddressTown || '',
          val.currentAddressVillage || ''
        ]
      } else {
        // 不能进行回显（报错：已暂存。。）则清除身份证号信息
        this.getChildNum()
        this.baseForm.setFieldsValue({
          idCard: null
        })
      }
    },
    // 根据身份证号回显出生日期与性别
    callbackByIdCard (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }
      const idCardValue = this.baseForm.getFieldsValue().idCard
      if (!idCardValue) {
        this.baseForm.setFieldsValue({
          birthday: null,
          sex: null
        })
      } else {
        const res = age - 18
        this.baseForm.setFieldsValue({
          birthday: birth ? moment(birth) : null,
          sex: sex
        })
        if (res >= 0) {
          this.$confirm({
            title: '该儿童已经超龄，是否确定继续录入？',
            content: ' ',
            onOk: () => {
              console.log('OK')
            },
            onCancel: () => {
              console.log('Cancel')
              this.backs()
            },
            class: 'test'
          })
        }
      }
    },

    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        this[tablename] = val
      }
      this.setHeight('ktthree', 'ktthreeout')
    },
    // 儿童类型
    async getchildType () {
      this.adisConditionList = await this.getDictionaries('ADISCONDITION')
      this.transmissionWayList = await this.getDictionaries(
        'TRANSMISSIONWAYOTHER'
      )
      const data = await this.getchildtypelist()
      this.childrenType = data
    },
    // 是否、监护类型
    async getyesNoType () {
      this.yesNoList = await this.getDictionaries('YESNO')
      this.jhList = await this.getDictionaries('GUARDIANSHIPTYPE')
      this.othersituationList = await this.getDictionaries('OTHERSPECIALCASES')
      this.rescueSituationList = await this.getDictionaries(
        'IMPROPERCARECONDITION'
      )
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
      this.heathlist.splice(4, 1)
      console.log('this.heathlist--->', this.heathlist)
      const formdata2 = {
        parentValue: '60',
        codeType: 'HEALTH'
      }
      const data2 = await this.post('dict/queryDictByParentValue', formdata2)
      this.disabiliytypelistCj = data2.data.codeList
    },
    async getUnList () {
      const formdata = {
        parentValue: 10,
        codeType: 'TROUBLEMONITORING'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.nobList = data.data.codeList
    },
    setLevel (e) {
      console.log(e.target.value, 444)
      if (e.target.value == '01' || e.target.value == '02') {
        this.isshow = true
      } else {
        this.isshow = false
      }
    },
    xyChange (e) {
      this.xyval = e.target.value

      if (this.xyval == '1') {
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
    onChangeTime1 (date, dateString) {
      this.nowTime1 = date
    },
    onChangeTime2 (date, dateString) {
      this.nowTime2 = date
    },
    disabledDate (current) {
      return current > moment().endOf('day')
    },
    disabledDate1 (current) {
      return current < this.nowTime1
    },
    disabledDate2 (current) {
      return current < this.nowTime2
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
    async getDetails () {
      let url = ''
      const params = {
        id: this.id,
        childType: this.nowkeyP
      }
      if (this.nowkeyP == '0') {
        // 确认信息
        url = '/disabledChildren/queryById'
      } else {
        url = '/disabledChildrenNew/getDisabledChildrenNewById'
      }
      let data = {}

      const resobj = await this.post(url, params)
      data = resobj.data.data // 加载数据 2020年1月9日11:56:07

      if (!data.errors) {
        if (this.nowkeyP == '0') {
          this.baseForm.setFieldsValue({
            name: data.name,
            idCard: data.idCard
          })

          this.heathForm.setFieldsValue({
            disabledNumber: data.disabledNumber
          })
          if (data.list && data.list != []) {
            data.list.forEach((e) => {
              if (e.subsidyType == '护理补贴') {
                this.statusForm.setFieldsValue({
                  subsidyMoneyOfNurse: e.subsidyMoney,
                  issueStartTimeOfNurse: e.issueStartTime
                    ? moment(e.issueStartTime, 'YYYY-MM-DD')
                    : null,
                  issueEndTimeOfNurse: e.issueEndTime
                    ? moment(e.issueEndTime, 'YYYY-MM-DD')
                    : null
                })
              } else {
                this.statusForm.setFieldsValue({
                  subsidyMoneyOfLife: e.subsidyMoney,
                  issueStartTimeOfLife: e.issueStartTime
                    ? moment(e.issueStartTime, 'YYYY-MM-DD')
                    : null,
                  issueEndTimeOfLife: e.issueEndTime
                    ? moment(e.issueEndTime, 'YYYY-MM-DD')
                    : null
                })
              }
            })
          }
          // 根据身份证号调验重接口带出数据
          this.post('/orphansDisabledChildrenApi/getChildByNameAndTypeAll', {
            idCard: data.idCard,
            childType: '140'
          }).then((res) => {
            if (res.serviceSuccess) {
              if (res.data && res.data.data) { // 存在重复数据，且需要带出回显
                this.setValueByIdCard(res.data.data)
              }
            }
          })
        } else {
          // 登记在册列表进入--》
          const baseData = data.childBaseInformationVo // 基本信息
          const poolChildrenData = data.disabledChildrenNewVo || {} // 业务信息
          if (poolChildrenData) {
            // 是否是监护人控制必填
            this.isphonerule = poolChildrenData.isGuardianOfFather == '1'
            this.isphonerule1 = poolChildrenData.isGuardianOfMother == '1'

            poolChildrenData.illnessType = poolChildrenData.illnessType
              ? poolChildrenData.illnessType.split(',')
              : []

            this.oldIdCard = baseData ? baseData.idCard : null // 保存进入编辑刚加载时的身份证号
            this.ywBjId = poolChildrenData.id // 业务id
            this.baseIdBj = baseData.id // 儿童基本id

            if (
              baseData.householdRegistryClassify ==
              this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
            ) {
              this.householdRegistryClassifydisabled = true
            }

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
              this.addressChildModelNow.push(baseData.currentAddressPro)
            }
            if (baseData.currentAddressCity) {
              this.addressChildModelNow.push(baseData.currentAddressCity)
            }
            if (baseData.currentAddressCounty) {
              this.addressChildModelNow.push(baseData.currentAddressCounty)
            }
            if (baseData.currentAddressTown) {
              this.addressChildModelNow.push(baseData.currentAddressTown)
            }
            if (baseData.currentAddressVillage) {
              this.addressChildModelNow.push(baseData.currentAddressVillage)
            }

            // 基本时间
            baseData.birthday = baseData.birthday
              ? moment(baseData.birthday, 'YYYY-MM-DD')
              : null
            if (poolChildrenData.fileList) {
              const ffOAll = poolChildrenData.fileList
              if (ffOAll.length > 0) {
                await this.$nextTick(() => {
                  ffOAll.forEach((s) => {
                    if (s.functionType == '1') {
                      this.imglist.push(s)
                      const returnFileIds = s.response.data.data.fileid
                      this.imageUrl =
                        window.faceConfig.basePath +
                        '/file/getFileFromDfs/' +
                        returnFileIds
                    }
                    if (s.functionType == '76') {
                      this.parentlistF.push(s)
                      console.log('this.parentlistF,-->', this.parentlistF)
                      this.$nextTick(() => {
                        this.fatherForm.setFieldsValue({
                          uploadFileT: s
                        })
                      })
                    }
                    if (s.functionType == '77') {
                      this.parentlistM.push(s)
                      this.$nextTick(() => {
                        this.motherForm.setFieldsValue({
                          uploadFileT: s
                        })
                      })
                    }
                  })
                })
              }
            }

            // 儿童健康状况
            this.heathval = poolChildrenData.healthStatus
              ? poolChildrenData.healthStatus
              : ''
            // 健康状况
            if (poolChildrenData.disabledType) {
              poolChildrenData.disabledType = poolChildrenData.disabledType.split(
                ','
              )
              if (
                poolChildrenData.disabledType && (poolChildrenData.disabledType[
                  poolChildrenData.disabledType.length - 1
                ] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
                  poolChildrenData.disabledType[
                  poolChildrenData.disabledType.length - 1
                  ] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
                )) {
                this.serioushval = true
              } else {
                this.serioushval = false
              }
            }
            await this.getdisabiliytype(poolChildrenData.healthStatus)
            if (!poolChildrenData.disabledType) {
              poolChildrenData.disabledType = []
            }
            if (poolChildrenData.helpMeasure == 4) {
              this.supportType = true
            } else {
              this.supportType = false
            }

            poolChildrenData.issueStartTimeOfLife = poolChildrenData.issueStartTimeOfLife
              ? moment(poolChildrenData.issueStartTimeOfLife, 'YYYY-MM-DD')
              : null
            poolChildrenData.issueStartTimeOfNurse = poolChildrenData.issueStartTimeOfNurse
              ? moment(poolChildrenData.issueStartTimeOfNurse, 'YYYY-MM-DD')
              : null
            poolChildrenData.issueEndTimeOfLife = poolChildrenData.issueEndTimeOfLife
              ? moment(poolChildrenData.issueEndTimeOfLife, 'YYYY-MM-DD')
              : null
            poolChildrenData.issueEndTimeOfNurse = poolChildrenData.issueEndTimeOfNurse
              ? moment(poolChildrenData.issueEndTimeOfNurse, 'YYYY-MM-DD')
              : null
            if (poolChildrenData.disabledLevel == '01' || poolChildrenData.disabledLevel == '02') {
              this.isshow = true
            } else {
              this.isshow = false
            }
            await this.$nextTick(() => {
              this.baseForm.setFieldsValue(baseData)
              this.baseForm.setFieldsValue({
                sameAddress: poolChildrenData.sameAddress == '0' ? [] : ['1']
              })

              this.heathForm.setFieldsValue(poolChildrenData)
              this.statusForm.setFieldsValue(poolChildrenData)
            })
            if (poolChildrenData) {
              this.doPig(poolChildrenData)
            }

            if (poolChildrenData.relationship == '99') { // 其他监护人与儿童关系
              this.ortherRe = true
            } else {
              this.ortherRe = false
            }
            if (poolChildrenData.memberIdTypeOfGuardian) {
              this.isread3 = true
            }
            this.$nextTick(() => {
              this.otherManForm.setFieldsValue(poolChildrenData)
            })
          }
        }
      } else {
      }
      this.nowTime1 = this.statusForm.getFieldValue('issueStartTimeOfLife')
      this.nowTime2 = this.statusForm.getFieldValue('issueStartTimeOfNurse')
    },
    doPig (data) {
      const fat = {}
      const mot = {}
      for (const key in data) {
        if (key.indexOf('OfMother') != -1) {
          mot[key.substr(0, key.length - 8)] = data[key]
        }
        if (key.indexOf('OfFather') != -1) {
          fat[key.substr(0, key.length - 8)] = data[key]
        }
      }
      this.delAdr(fat, '1')
      this.delAdr(mot, '2')
    },
    delAdr (e, ty) {
      let infoCaseStatus = true
      const addressFMModels = []
      const addressFMModelNows = []
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
      this.getdisabiliytype(e.healthStatus, ty)
      e.sameAddress = e.sameAddress == '0' ? [] : ['1']
      if (e.infoCase == '1') {
        // 信息完整
        infoCaseStatus = true
      } else {
        infoCaseStatus = false
      }

      if (ty == '1') {
        this.mustTipF = infoCaseStatus
        this.addressFMModel1 = addressFMModels || [] // 户籍
        this.addressFMModelNow1 = addressFMModelNows || [] // 现地址
        this.setAddressFNow()
        this.setAddressF()
        this.heathvalF = heaths || '' // 健康状况其他
        this.serioushvalF = serioush // 慢性病 ... 其他
        if (e.memberIdType) {
          this.isread1 = true
        }
        this.$nextTick(() => {
          this.fatherForm.setFieldsValue(e)
        })
      } else {
        this.mustTipM = infoCaseStatus
        this.addressFMModel2 = addressFMModels || []
        this.addressFMModelNow2 = addressFMModelNows
        this.setAddressM()
        this.setAddressMNow()
        this.heathvalM = heaths || ''
        this.serioushvalM = serioush
        if (e.memberIdType) {
          this.isread2 = true
        }
        this.$nextTick(() => {
          this.motherForm.setFieldsValue(e)
        })
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

    validateLots (formDate) {
      let FMO = false
      for (const k in formDate) {
        if (formDate[k] != undefined && formDate[k] != '') {
          FMO = true
        }
      }
      return FMO
    },
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
        } else {
          this.unattendedOthers = false
        }
      }

      this.setHeight('one', 'oneout')
    },
    dispose (data, e) {
      for (var k in data) {
        if (k != 'uploadFileT') {
          // 是对象 不是数组
          if (!(data[k] instanceof Array) && data[k] instanceof Object) {
            if (data[k].file) {
              const arr = []
              data[k].fileList.map((item) => {
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
              if (e == '1') {
                data.censusRegisterProOfFather = data[k][0]
                data.censusRegisterCityOfFather = data[k][1]
                data.censusRegisterCountyOfFather = data[k][2]
                data.censusRegisterTownOfFather = data[k][3]
                data.censusRegisterVillageOfFather = data[k][4]
              } else if (e == '2') {
                data.censusRegisterProOfMother = data[k][0]
                data.censusRegisterCityOfMother = data[k][1]
                data.censusRegisterCountyOfMother = data[k][2]
                data.censusRegisterTownOfMother = data[k][3]
                data.censusRegisterVillageOfMother = data[k][4]
              } else {
                data.censusRegisterPro = data[k][0]
                data.censusRegisterCity = data[k][1]
                data.censusRegisterCounty = data[k][2]
                data.censusRegisterTown = data[k][3]
                data.censusRegisterVillage = data[k][4]
              }
              delete data[k]
            } else if (k == 'currentAddress') {
              if (e == '1') {
                data.currentAddressProOfFather = data[k][0]
                data.currentAddressCityOfFather = data[k][1]
                data.currentAddressCountyOfFather = data[k][2]
                data.currentAddressTownOfFather = data[k][3]
                data.currentAddressVillageOfFather = data[k][4]
              } else if (e == '2') {
                data.currentAddressProOfMother = data[k][0]
                data.currentAddressCityOfMother = data[k][1]
                data.currentAddressCountyOfMother = data[k][2]
                data.currentAddressTownOfMother = data[k][3]
                data.currentAddressVillageOfMother = data[k][4]
              } else {
                data.currentAddressPro = data[k][0]
                data.currentAddressCity = data[k][1]
                data.currentAddressCounty = data[k][2]
                data.currentAddressTown = data[k][3]
                data.currentAddressVillage = data[k][4]
              }
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
        if (e == '1') {
          data[k + 'OfFather'] = data[k]

          delete data[k]
        }
        if (e == '2') {
          data[k + 'OfMother'] = data[k]
          delete data[k]
        }
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    async submit (val) {
      let isPass = true
      const message = ''

      const baseData = this.baseForm.getFieldsValue() // 儿童基本信息
      const heathData = this.heathForm.getFieldsValue() // 儿童健康状况
      const statusData = this.statusForm.getFieldsValue() // 生活情况

      const motherData = this.motherForm.getFieldsValue() // 父母及其他监护人信息：
      const fatherData = this.fatherForm.getFieldsValue()
      const otherManData = this.otherManForm.getFieldsValue()

      this.isvalidator = false
      if (fatherData.infoCase != '1') {
        // 完整 父亲
        if (this.parentlistF.length == 0) {
          this.fatherForm.setFieldsValue({
            uploadFileT: null
          })
        } else {
          this.fatherForm.setFieldsValue({
            uploadFileT: 'yes'
          })
        }
      }
      // 上传
      if (motherData.infoCase != '1') {
        // 完整 母亲
        if (this.parentlistM.length == 0) {
          this.motherForm.setFieldsValue({
            uploadFileT: null
          })
        } else {
          this.motherForm.setFieldsValue({
            uploadFileT: 'yes'
          })
        }
      }
      if (baseData.sameAddress == '') {
        baseData.sameAddress = '0'
      }
      if (motherData.sameAddress == '') {
        motherData.sameAddress = '0'
      }
      if (fatherData.sameAddress == '') {
        fatherData.sameAddress = '0'
      }

      let DilemmaChildrenAllVo = {}
      const leftOverSupportAdviseVo = {} // 建议
      const leftOverUnitVo = {} // 机构
      const leftOverParentsVoList = [] // 监护人
      let childBaseInformationVo = {} // 基本信息
      let leftOverChildVo = {} // 留守儿童

      // const FMOM = await this.validateLots(motherData)
      // const FMOF = await this.validateLots(fatherData)
      // const FMOO = await this.validateLots(otherManData)

      if (val != 's') {
        await this.motherForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '2'
            isPass = false
          }
        })
        await this.fatherForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '2'
            isPass = false
          }
        })
        await this.otherManForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '3'
            isPass = false
          }
        })

        // teb1
        await this.baseForm.validateFields((err, values) => {
          if (err) {
            console.log('err-->', err)
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
            console.log('err-->', err)

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
        this.dispose(motherData, '2')
        this.dispose(fatherData, '1')
        this.dispose(otherManData)

        const upload = []
        const filelist = [
          ...this.imglist,
          ...this.parentlistF,
          ...this.parentlistM
        ]
        if (filelist.length > 0) {
          filelist.map((item) => {
            upload.push(item.response.data.data.fileid)
          })
          baseData.upLoadPathIds = upload // 上传
        }
        leftOverChildVo = { ...baseData, ...heathData, ...statusData }
        baseData.id = this.childId
        childBaseInformationVo = baseData

        leftOverParentsVoList.push(fatherData, motherData, otherManData) // = [...motherData, ...fatherData, ...otherManData]
        const improperCareChildVo = leftOverChildVo
        const improperCareUnitVo = leftOverUnitVo
        const improperCareParentsVoList = leftOverParentsVoList
        const disabledChildrenNewVo = {
          ...heathData,
          ...statusData,
          ...motherData,
          ...fatherData,
          ...otherManData
        }
        // const disabledChildrenNewVo = {
        //   ...baseData,
        //   ...heathData,
        //   ...statusData,
        //   ...motherData,
        //   ...fatherData,
        //   ...otherManData,
        // }
        disabledChildrenNewVo.deleteId = this.id
        disabledChildrenNewVo.upLoadPathIds = upload
        DilemmaChildrenAllVo = {
          childBaseInformationVo,
          disabledChildrenNewVo
        }

        let urls = '/disabledChildrenNew/saveDisabledChildrenNew'

        if (this.saveUrl) {
          urls = this.saveUrl
        }

        const ImproperCareChildAllVo = DilemmaChildrenAllVo
        if (this.nowkeyP == '1') {
          ImproperCareChildAllVo.childBaseInformationVo.id = this.baseIdBj
          ImproperCareChildAllVo.disabledChildrenNewVo.id = this.ywBjId
          ImproperCareChildAllVo.disabledChildrenNewVo.childBaseId = this.baseIdBj
        }
        const res = await this.post(urls, ImproperCareChildAllVo, true)
        if (!res.errors) {
          this.$message.success('信息保存成功')
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
          this.$message.error('校验不通过，无法提交，请再次检查!')
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
.mars1 {
  width: 100%;
  margin-bottom: 30px;
  // border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
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

.abc
  /deep/
  .ant-checkbox-disabled.ant-checkbox-checked
  .ant-checkbox-inner:after {
  -webkit-animation-name: none;
  animation-name: none;
  border-color: rgb(100, 94, 94) !important;
}
</style>
