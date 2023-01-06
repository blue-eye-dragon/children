<template>
  <!-- 未成年人保护采集 -->
  <div :class="show?'conts tadrawer':'tadrawer'"
       @click='allvalidator'>
    <div class="contin">
      <div v-if="!look">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="儿童类别:"
                        class="fromwid">
            <ta-input defaultValue="未保中心救助儿童"
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
              <protectionBaseInfo :reasonsOther="baseDataReasonsOther"
                                  @reasonsOtherSetHeight="reasonsOtherSetHeight"
                                  :thisP="thisP"
                                  :delVisible="delVisible"
                                  :idcarddisabled="idcarddisabled"
                                  @householdRegistryClassifychange="householdRegistryClassifychange"
                                  :householdRegistryClassifyhide.sync="householdRegistryClassifyhide"
                                  :householdRegistryClassifydisabled.sync="householdRegistryClassifydisabled"
                                  :imageUrl.sync="imageUrl"
                                  :disabled="disabled"
                                  :imglist.sync="imglist"
                                  @radiochange="radiochange"
                                  @likeaddress="likeaddress"
                                  @callbackByIdCard="callbackByIdCard"
                                  @setValueByIdCard="setValueByIdCard"
                                  :addressChildModel="addressChildModel"
                                  :addressChildModelNow="addressChildModelNow"
                                  :heathChildModel="heathChildModel"
                                  @setChildAddress="setChildAddress"
                                  @setChildAddress1="setChildAddress1"
                                  @setChildHeaths="setChildHeaths"
                                  :id="id"
                                  :oldIdCard="oldIdCard"
                                  @setHeight="setHeight('one', 'oneout')"></protectionBaseInfo>
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
                                :initValue="this.Enum.HEALTHSTATUS.JK"
                                :fieldDecoratorOptions="rules.healthStatus">
                    <ta-radio-group @change="onChange"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in heathlist"
                                :key="index">{{item.label}}</ta-radio>
                      <!-- <ta-input
                      :disabled="disabled"
                      v-model="healthStatusOther"
                      v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                      placeholder="请输入其他情况"
                      type="text"
                      style="width:200px"
                      />-->
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item v-if="heathval==Enum.HEALTHSTATUS.OTHER"
                                label="其他"
                                fieldDecoratorId="healthStatusOther"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 10 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              maxlength='50'
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <div class="canji"
                       v-if="heathval==Enum.HEALTHSTATUS.DISABILITY">
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
                       v-if="heathval==Enum.HEALTHSTATUS.SERIOUSILLNESS">
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
                    <ta-form-item v-if="serioushval"
                                  label="其他"
                                  fieldDecoratorId="healthStatusOther"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 9 }"
                                  :fieldDecoratorOptions="rules.healthStatusOther">
                      <ta-input :disabled="disabled"
                                maxlength='50'
                                placeholder="请输入其他情况" />
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
                                  :require="{message:'请选择慢性病'}">
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
                                maxlength='50'
                                placeholder="请输入其他情况" />
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
                              maxlength='50'
                              placeholder="请输入其他"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item v-if="!(xyval==Enum.SCHOOLWORK.OTHER)"
                                label="就学情况"
                                fieldDecoratorId="goSchoolStatus"
                                :fieldDecoratorOptions="rules.goSchoolStatus">
                    <ta-select allowClear
                               :disabled="disabled || disabledG"
                               placeholder="请选择就学情况">
                      <ta-select-option v-for="item in schoolingList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="是否学校寄宿"
                                v-if="isAtSchool"
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
                                :wrapperCol="{ span: 21 }"
                                :require="{message:'请选择监护类型!'}">
                    <ta-radio-group :disabled="disabled">
                      <ta-radio :value="item.value"
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
                              maxlength='50'
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <ta-form-item label="社会福利、救助、帮扶落实情况"
                                fieldDecoratorId="helpSituation"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]"
                                :require="{message:'请选择社会福利、救助、帮扶落实情况!'}">
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
                              maxlength='50'
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <ta-form-item label="有无发生遭受监护人侵害的情况"
                                fieldDecoratorId="isStricken"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 20 }"
                                :require="{message:'请选择有无发生遭受监护人侵害的情况!'}">
                    <ta-radio-group @change="haveEncroach"
                                    :disabled="disabled">
                      <ta-radio v-for="(item,index) in haveEncroachList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他"
                                :labelCol="{ span: 4}"
                                :wrapperCol="{ span: 9 }"
                                v-if="haveEncroachs"
                                fieldDecoratorId="isStrickenOther"
                                :require="{message:'请输入其他情形!'}">
                    <!-- :fieldDecoratorOptions="rules.academicStatusOther" -->
                    <ta-input :disabled="disabled"
                              maxlength='50'
                              placeholder="请输入其他"
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
          <!-- <div ref="ktoneout"
               class="mars">
            <Title title="儿童父母情况"
                   :show.sync="showktone"></Title>
            <ta-row ref="ktone"> -->
          <div class="mars1"
               ref="ktoneout">
            <Divider title="儿童父母情况"></Divider>
            <ta-row ref="ktone">
              <ta-col :span="11">
                <ta-form layout="horizontal"
                         :autoFormCreate="(fatherForm)=>{this.fatherForm = fatherForm}">
                  <Parentsituation :parentlist.sync='parentlistF'
                                   @goHandle="goHandle1"
                                   @goHealth="goHealth1"
                                   :mustTip="mustTipF"
                                   :isdanqin="isdanqin1"
                                   :isdqrs="isdqrs1"
                                   :islive="islive1"
                                   :isknow="isknow1"
                                   :issure="issure1"
                                   :isjianhu="isjianhu1"
                                   :isjiedu="isjiedu1"
                                   :data_='data_F'
                                   types="1"
                                   ref='faInfo'
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
                                   @setAddressFMNow="setAddressFNow"
                                   :cardType='cardTypeF'></Parentsituation>
                  <!-- :currentSituationOther.sync='currentSituationOther'
                  :isrequired.sync="isrequired"-->
                </ta-form>
              </ta-col>
              <ta-col :span="11"
                      :offset="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(motherForm)=>{this.motherForm = motherForm}">
                  <!-- :isrequired.sync="isrequired1" -->
                  <Parentsituation :parentlist.sync='parentlistM'
                                   @goHandle="goHandle2"
                                   @goHealth="goHealth2"
                                   :mustTip="mustTipM"
                                   :isdanqin="isdanqin2"
                                   :isdqrs="isdqrs2"
                                   :isknow="isknow2"
                                   :issure="issure2"
                                   :islive="islive2"
                                   :isjianhu="isjianhu2"
                                   :isjiedu="isjiedu2"
                                   :data_='data_M'
                                   :familyBreadwinners="familyBreadwinners2"
                                   :isman.sync="isman"
                                   types="2"
                                   ref='maInfo'
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
                                   @setAddressFMNow="setAddressMNow"
                                   :cardType='cardTypeM'></Parentsituation>
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
            <ta-row ref="kttwo"> -->
          <div class="mars1"
               ref="kttwoout">
            <Divider title="其他监护人信息"></Divider>
            <ta-row ref="kttwo">
              <!-- <ta-col :span="11"> -->
              <ta-form layout="horizontal"
                       :autoFormCreate="(otherManForm)=>{this.otherManForm = otherManForm}">
                <protectionOtherPeope @otherPother="otherPother"
                                      :mustTipO="mustTipO"
                                      @goHandle="goHandle3"
                                      @goHealth="goHealth3"
                                      :isjianhu="isjianhu0"
                                      :isjiedu="isjiedu0"
                                      :isknow="isknow0"
                                      :islive="islive0"
                                      :isrequired.sync="isrequiredO"
                                      :disabled="disabled"
                                      :thisP="thisP"
                                      ref="otherInfo"
                                      :disabiliytypelist="disabiliytypelistO"
                                      :others="zkvalO"
                                      :heathval="heathvalO"
                                      :cardType="cardTypeO"
                                      :serioushval="serioushvalO"></protectionOtherPeope>
              </ta-form>
              <!-- </ta-col> -->
            </ta-row>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="机构信息"
                     key="4"
                     :forceRender="true">

          <!-- <div ref="ktthreeout"
               class="mars">
            <Title title="机构信息"
                   :show.sync="showktthree"></Title>
            <ta-row ref="ktthree"> -->
          <div class="mars1"
               ref="ktthreeout">
            <Divider title="机构信息"></Divider>
            <ta-row ref="ktthree">
              <!-- <ta-col :span="11"> -->
              <ta-form layout="horizontal"
                       :autoFormCreate="(OrgForm)=>{this.OrgForm = OrgForm}">
                <ta-col :span="12">
                  <ta-form-item label="机构名称"
                                fieldDecoratorId="troubleOrgName"
                                :fieldDecoratorOptions="{rules: [{ max: 72, message: '最大长度为72' }]}">
                    <ta-input :disabled="disabled"
                              maxlength='72'
                              :placeholder="disabled?'':'请输入机构名称'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="负责人"
                                fieldDecoratorId="principal"
                                :fieldDecoratorOptions="{rules: [{ max: 72, message: '最大长度为72' }]}">
                    <ta-input :disabled="disabled"
                              maxlength='72'
                              :placeholder="disabled?'':'请输入负责人'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="机构性质"
                                fieldDecoratorId="unitNature">
                    <ta-select :placeholder="disabled?'':'请选择机构性质'"
                               :disabled="disabled">
                      <ta-select-option v-for="(item,index) in UntTyList"
                                        :value="item.value"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="固定电话"
                                fieldDecoratorId="fixedTelphone"
                                :fieldDecoratorOptions="this.phoneRule(false,'固定电话')">
                    <ta-input :disabled="disabled"
                              maxlength='17'
                              oninput="value=value.replace(/[^\d]/g,'')"
                              :placeholder="disabled?'':'请输入固定电话'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="联系电话"
                                fieldDecoratorId="telphone"
                                :fieldDecoratorOptions="this.phoneRule(false)">
                    <!-- :fieldDecoratorOptions="this.verificationRules('联系电话', {type: 'phone'})"> -->
                    <ta-input :disabled="disabled"
                              maxlength='17'
                              oninput="value=value.replace(/[^\d]/g,'')"
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
                                      :disabled="disabled"
                                      :isRequire="false"
                                      :clearPlaceHolder='disabled'
                                      @setaddress="setOrgAddress"></AddressComponent>
                  </ta-col>
                  <ta-col :span="12">
                    <ta-form-item label
                                  fieldDecoratorId="orgAddressParticulars"
                                  style="margin-left:10px;"
                                  :wrapperCol="{ span: 18}"
                                  :fieldDecoratorOptions="{rules: [{ max: 100, message: '最大长度为100' }]}">
                      <ta-input placeholder="请输入详细地址"
                                maxlength='100'
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
                              :initValue="[Enum.SUPPORTTYPES.JJBF]"
                              :require="{message:'请选择帮扶建议'}">

                  <ta-checkbox-group :options="supportTypeList"
                                     :disabled="disabled"
                                     @change="supportTypes" />
                </ta-form-item>

                <ta-form-item label="其他"
                              :labelCol="{ span: 3 }"
                              :wrapperCol="{ span: 9 }"
                              v-if="supportType"
                              fieldDecoratorId="supportRecommendationsOther"
                              :fieldDecoratorOptions="this.verificationRules('其他', 50)">
                  <ta-input :disabled="disabled"
                            maxlength='50'
                            placeholder="请输入其他"
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
                 @click="backs">返回</ta-button>

      <ta-button v-if="reSave&&!disabled &&!nowkeys "
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
import protectionBaseInfo from './components/protectionBaseInfo'
import Parentsituation from './components/protectionParentInfo'
import protectionOtherPeope from './components/protectionOtherPeope'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
import Title from '@component/common/components/Title'
import Divider from '@component/common/components/divider'

// import { threadId } from 'worker_threads'

export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    look: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    protectionBaseInfo,
    Title,
    Divider,
    Parentsituation,
    protectionOtherPeope,
    AddressComponent
  },
  data () {
    return {
      thisP: this,
      delVisible: false,
      disabledG: false,
      mustTipM: true, // WWWWWWW
      mustTipF: true,
      mustTipO: true,
      data_M: { busiType: '77', functionalType: '29' },
      data_F: { busiType: '76', functionalType: '29' },
      parentlistM: [],
      parentlistF: [], // WWWWWWW
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

      issure1: true,
      issure2: true,
      isdanqin1: false,
      isdanqin2: false,
      isdanqin0: false,
      isdqrs1: false,
      isdqrs2: false,
      isdqrs0: false,
      islive1: true,
      islive2: true,
      islive0: true,
      isknow1: true,
      isknow2: true,
      isknow0: true,
      isjianhu1: false,
      isjianhu2: false,
      isjianhu0: false,
      isjiedu1: false,
      isjiedu2: false,
      isjiedu0: false,

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
      isvalidator: false, // 提交时不重新加载
      id: '',
      oldIdCard: null,
      childId: null,
      visible: false,
      exportid: '',
      ishide: true,
      updata: {
        busiType: '75', functionalType: '29'
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
      childtype: '621',

      childtypedisabled: false,
      isAtSchool: true,
      othersituation: false,
      rescueSituation: false,
      haveEncroachs: false,
      supportTypeList: [],
      supportType: false,
      UntTyList: [],
      baseDataReasonsOther: false,
      bj: true,

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
      nowkeys: false,
      cardTypeF: '0',
      cardTypeM: '0',
      cardTypeO: '0',

      disabilityTypeValues: []
    }
  },
  activated () {
    this.getchildType()
    this.loadData()
    this.nowkeys = this.$route.query.nowkeys == 1
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
    this.$nextTick(() => {
      setTimeout(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('three', 'threeout')
      }, 300)
    })
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
    deuRadios (v, id, formName, isQustion, type) {
      const b = formName.getFieldsValue()[id]
      if (b == v) {
        this.$nextTick(() => {
          formName.setFieldsValue({
            [id]: ''
          })
          if (isQustion) {
            // 置空时操作，thats自己页面方法
            if (type == '1') {
              this.nullThen1(v, id, formName)
            }
            if (type == '2') {
              this.nullThen2(v, id, formName)
            }
            if (type == '3') {
              this.nullThen3(v, id, formName)
            }
            if (type == '4') {
              this.nullHealth1(v, id, formName)
            }
            if (type == '5') {
              this.nullHealth2(v, id, formName)
            }
            if (type == '6') {
              this.nullHealth3(v, id, formName)
            }
          }
        })
      } else {
        if (isQustion) {
          // 非空时操作
          return
        }
      }
    },
    goHandle1 (value, id, b) {
      let fatherForm = this.fatherForm
      this.deuRadios(value, id, fatherForm, b, '1')
    },
    goHandle2 (value, id, b) {
      let motherForm = this.motherForm
      this.deuRadios(value, id, motherForm, b, '2')
    },
    goHandle3 (value, id, b) {
      let otherManForm = this.otherManForm
      this.deuRadios(value, id, otherManForm, b, '3')
    },
    goHealth1 (value, id, b) {
      let fatherForm = this.fatherForm
      this.deuRadios(value, id, fatherForm, b, '4')
    },
    goHealth2 (value, id, b) {
      let motherForm = this.motherForm
      this.deuRadios(value, id, motherForm, b, '5')
    },
    goHealth3 (value, id, b) {
      let otherManForm = this.otherManForm
      this.deuRadios(value, id, otherManForm, b, '6')
    },
    nullThen1 () {
      this.heathvalF = ''
      this.zkval = ''
      this.islive1 = true
      this.isknow1 = true
      this.isjianhu1 = false
      this.isjiedu1 = false
      this.$nextTick(() => {
        this.$refs.faInfo.textphone1()
        this.fatherForm.setFieldsValue({ healthStatus: '' })
        this.setHeight('ktone', 'ktoneout')
      })
    },
    nullThen2 () {
      this.heathvalM = ''
      this.zkval1 = ''
      this.islive2 = true
      this.isknow2 = true
      this.isjianhu2 = false
      this.isjiedu2 = false
      this.$nextTick(() => {
        this.$refs.maInfo.textphone1()
        this.motherForm.setFieldsValue({ healthStatus: '' })
        this.setHeight('ktone', 'ktoneout')
      })
    },
    nullThen3 () {
      this.heathvalO = ''
      this.zkvalO = ''
      this.islive0 = true
      this.isknow0 = true
      this.isjianhu0 = false
      this.isjiedu0 = false
      this.$nextTick(() => {
        this.otherManForm.setFieldsValue({ healthStatus: '' })
        this.$refs.otherInfo.textphone1()
        // this.setHeight('ktone', 'kttwoout')
      })
    },
    nullHealth1 () {
      this.heathvalF = ''
      this.$nextTick(() => {
        this.setHeight('ktone', 'ktoneout')
      })
    },
    nullHealth2 () {
      this.heathvalM = ''
      this.$nextTick(() => {
        this.setHeight('ktone', 'ktoneout')
      })
    },
    nullHealth3 () {
      this.heathvalO = ''
      // this.$nextTick(() => {
      //   this.setHeight('ktone', 'kttwoout')
      // })
    },
    mustTipchange (v, types) { // WWWWWWW
      if (types == '1') {
        this.mustTipF = v
        if (!v) {
          this.fatherForm.resetFields()
          this.cardTypeF = '0'
          this.heathvalF = '0'
          this.zkval = '0'
          this.serioushvalF = false
          this.familyBreadwinners1 = false
        }
      } else {
        if (!v) {
          this.motherForm.resetFields()
          this.cardTypeM = '0'
          this.heathvalM = '0'
          this.zkval1 = '0'
          this.serioushvalM = false
          this.familyBreadwinners2 = false
        }
        this.mustTipM = v
      }
    },
    mustTipOCtrl (v) { // WWWWW
      this.mustTipO = v
      this.zkvalO = ''
      this.cardTypeO = '0'
      this.heathvalO = ''
      this.serioushvalO = false
      this.otherManForm.resetFields()
      this.otherManForm.setFieldsValue({
        healthStatus: '10'
      })
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
    // hightS () {
    //   setTimeout(() => {
    //     this.setHeight('one', 'oneout')
    //     this.setHeight('two', 'twoout')
    //     this.setHeight('three', 'threeout')
    //     this.setHeight('ktone', 'ktoneout')
    //     this.setHeight('kttwo', 'kttwoout')
    //     this.setHeight('ktthree', 'ktthreeout')
    //   }, 800)
    // },
    supportTypes (v) {
      if (v[v.length - 1] == '7') {
        v = ['7']
        this.$nextTick(() => {
          this.suggestForm.setFieldsValue({
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
          this.suggestForm.setFieldsValue({
            supportRecommendations: v,
            supportRecommendationsOther: ''
          })
          this.supportType = false
        })
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
          this.setHeight('three', 'threeout')
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
          this.setHeight('three', 'threeout')
        })
      } else if (v[v.length - 1] == '11') {
        v = ['11']
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
            helpSituation: v,
            helpSituationOther: ''
          })
          this.rescueSituation = false
          this.setHeight('three', 'threeout')
        })
      } else if (v[v.length - 1] != '10' && v[v.length - 1] != '11') {
        if (v[0] == '10' || v[0] == '11') {
          v.shift()
        }
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
            helpSituation: v,
            helpSituationOther: ''
          })
          this.rescueSituation = false
          this.setHeight('three', 'threeout')
        })
      }
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
        if (val == '1') {
          this.islive1 = false
        } else {
          this.islive1 = true
        }
        if (val == '3') {
          this.fatherForm.setFieldsValue({ healthStatus: '22' })
          this.getdisabiliytype('22', '1')
          this.heathvalF = '22'
        } else if (val == '4') {
          this.fatherForm.setFieldsValue({ healthStatus: '60' })
          this.getdisabiliytype('60', '1')
          this.heathvalF = '60'
        } else {
          this.fatherForm.setFieldsValue({ healthStatus: '' })
          this.heathvalF = '0'
        }
        if (val == '2' || val == '5') {
          this.isknow1 = false
        } else {
          this.isknow1 = true
        }
        if (val == '8' || val == '6') {
          this.isjianhu1 = true
        } else {
          this.isjianhu1 = false
        }
        if (val == '7') {
          this.isjiedu1 = true
        } else {
          this.isjiedu1 = false
        }
        this.$nextTick(() => {
          this.$refs.faInfo.textphone1()
          let faData = this.fatherForm.getFieldsValue()
          this.fatherForm.resetFields()
          this.fatherForm.setFieldsValue(faData)
        })
      } else {
        this.zkval1 = val
        if (val == '1') {
          this.islive2 = false
        } else {
          this.islive2 = true
        }
        if (val == '3') {
          this.motherForm.setFieldsValue({ healthStatus: '22' })
          this.getdisabiliytype('22', '2')
          this.heathvalM = '22'
        } else if (val == '4') {
          this.motherForm.setFieldsValue({ healthStatus: '60' })
          this.getdisabiliytype('60', '2')
          this.heathvalM = '60'
        } else {
          this.motherForm.setFieldsValue({ healthStatus: '' })
          this.heathvalM = '0'
        }
        if (val == '2' || val == '5') {
          this.isknow2 = false
        } else {
          this.isknow2 = true
        }
        if (val == '8' || val == '6') {
          this.isjianhu2 = true
        } else {
          this.isjianhu2 = false
        }
        if (val == '7') {
          this.isjiedu2 = true
        } else {
          this.isjiedu2 = false
        }
        this.$nextTick(() => {
          this.$refs.maInfo.textphone1()
          let maData = this.motherForm.getFieldsValue()
          this.motherForm.resetFields()
          this.motherForm.setFieldsValue(maData)
        })
      }

      this.setHeight('ktone', 'ktoneout')
    },
    otherPother (val) {
      let otherData = this.otherManForm.getFieldsValue()
      this.otherManForm.resetFields()
      this.otherManForm.setFieldsValue(otherData)
      this.zkvalO = val
      if (val == '1') {
        this.islive0 = false
      } else {
        this.islive0 = true
      }
      if (val == '3') {
        this.otherManForm.setFieldsValue({ healthStatus: '22' })
        this.getdisabiliytype('22', '3')
        this.heathvalO = '22'
      } else if (val == '4') {
        this.otherManForm.setFieldsValue({ healthStatus: '60' })
        this.getdisabiliytype('60', '3')
        this.heathvalO = '60'
      } else {
        this.otherManForm.setFieldsValue({ healthStatus: '' })
        this.heathvalO = ''
      }
      if (val == '8' || val == '6') {
        this.isjianhu0 = true
      } else {
        this.isjianhu0 = false
      }
      if (val == '2' || val == '5') {
        this.isknow0 = false
      } else {
        this.isknow0 = true
      }
      if (val == '7') {
        this.isjiedu0 = true
      } else {
        this.isjiedu0 = false
      }
      this.$nextTick(() => {
        this.$refs.otherInfo.textphone1()
      })
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
    changeCardType (v, t) {
      if (t == 1) {
        this.cardTypeF = v
        if (v == undefined) {
          this.cardTypeF = '0'
          this.$nextTick(() => {
            this.fatherForm.setFieldsValue({
              idCard: ''
            })
          })
        }
      } else if (t == 2) {
        this.cardTypeM = v
        if (v == undefined) {
          this.cardTypeM = '0'
          this.$nextTick(() => {
            this.motherForm.setFieldsValue({
              idCard: ''
            })
          })
        }
      } else {
        this.cardTypeO = v
        if (v == undefined) {
          this.cardTypeO = '0'
          this.$nextTick(() => {
            this.otherManForm.setFieldsValue({
              idCard: ''
            })
          })
        }
      }
    },
    loadData () {
      this.disabilityTypeValues = []
      this.cardTypeF = '0'
      this.cardTypeM = '0'
      this.cardTypeO = '0'
      this.delVisible = false

      this.issure1 = true
      this.issure2 = true
      this.isdanqin1 = false
      this.isdanqin2 = false
      this.isdanqin0 = false
      this.isdqrs1 = false
      this.isdqrs2 = false
      this.isdqrs0 = false
      this.islive1 = true
      this.islive2 = true
      this.islive0 = true
      this.isknow1 = true
      this.isknow2 = true
      this.isknow0 = true
      this.isjianhu1 = false
      this.isjianhu2 = false
      this.isjianhu0 = false
      this.isjiedu1 = false
      this.isjiedu2 = false
      this.isjiedu0 = false

      this.haveEncroachs = false
      this.othersituation = false
      this.saveUrl = ''
      this.reSave = true
      this.disabledG = false
      this.rescueSituation = false
      this.childId = null
      this.isAtSchool = true
      this.mustTipM = true // WWWWWWW
      this.mustTipF = true
      this.mustTipO = true
      this.parentlistM = []
      this.parentlistF = [] // WWWWWWW
      this.baseDataReasonsOther = false
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
      // this.currentSituationOther = ''
      this.zkval = ''
      // this.currentSituationOther1 = ''
      this.zkval1 = ''
      this.imglist = []
      // this.academicStatusOther = ''
      this.xyval = '0'
      this.nowkey = '1'
      this.heathval = this.Enum.HEALTHSTATUS.JK
      this.heathvalO = this.Enum.HEALTHSTATUS.JK
      this.heathvalF = this.Enum.HEALTHSTATUS.JK
      this.heathvalM = this.Enum.HEALTHSTATUS.JK
      this.zkvalO = ''
      this.setHeight('two', 'twoout')
      this.setHeight('ktone', 'ktoneout')
      this.setHeight('kttwo', 'kttwoout')
      this.supportType = false
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
      this.post('childProtectOrgManagement/getProjectOrgMsgByOrgId', { taorgId: window.parent.indexTool.getUserInfo().orgId }).then(res => {
        if (res.data.data) {
          if (res.data.data.areaPath) {
            const areaList = res.data.data.areaPath.split('/')
            // console.log(areaList)
            this.addressOrgModel.push(
              areaList[1] || '',
              areaList[2] || '',
              areaList[3] || ''
            )
          }
          this.$nextTick(() => {
            this.OrgForm.setFieldsValue({
              troubleOrgName: res.data.data.orgName,
              principal: res.data.data.legalRepresentative,
              unitNature: res.data.data.orgNature,
              telphone: res.data.data.tel,
              orgAddressParticulars: res.data.data.address
            })
          })
        } else {
          this.OrgForm.resetFields()
        }
      })
      this.suggestForm.resetFields()
      this.showkttwo = true

      this.iscanshow = true
      this.showktthree = true
      this.showkhone = true
      //   this.baselifeForm.resetFields()
      this.showkhtwo = true
      //   this.otherhelpForm.resetFields()
      this.showkhthree = true
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
    // 回显时 时间字段处理
    momentValue (val) {
      return val ? moment(val) : null
    },

    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      if (val) { // 需要进行回显
        this.childId = val.id // 儿童id
        val.applicationTime = this.momentValue(val.applicationTime)
        val.birthday = this.momentValue(val.birthday)
        val.sameAddress = ['0']
        this.baseForm.setFieldsValue(val)
        if (val.householdRegistryClassify == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
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
      } else { // 不能进行回显（报错：已暂存。。）则清除身份证号信息
        this.getChildNum()
        this.baseForm.setFieldsValue({
          idCard: null
        })
      }
    },
    allvalidator () {
      this.isvalidator = true
    },
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
          // this.$message.error('此儿童超过最大年龄（18岁）限制，不符合采集要求！')
          // this.$nextTick(() => {
          //   this.baseForm.setFieldsValue({
          //     idCard: '',
          //     birthday: null,
          //     sex: null
          //   })
          // })
          // } else {
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
      this.UntTyList = await this.getDictionaries('ORGNATURE')
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
    xyChange (e) {
      // this.academicStatusOther = ''
      this.xyval = e.target.value
      if (this.xyval == '1') {
        this.isAtSchool = true
      } else {
        this.isAtSchool = false
      }
      this.$nextTick(() => {
        if (this.xyval == '7') {
          this.disabledG = true
          this.statusForm.setFieldsValue({ goSchoolStatus: '91' })
        } else {
          this.disabledG = false
          this.statusForm.setFieldsValue({ goSchoolStatus: null })
        }
        this.setHeight('three', 'threeout')
      })
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
          node.style.height = this.$refs[ref].$el.offsetHeight + 140 + 'px'
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
        const resobj = await this.post('/difficultiesChildren/queryById', params)
        data = resobj.data.data // 加载数据 2020年1月9日11:56:07
      }

      if (!data.errors) {
        // 基本
        // 基本地址
        const baseData = data.childBaseInformationVo
        this.oldIdCard = baseData.idCard // 编辑进入页面时的idCard
        this.childBaseInformationVoId = baseData.id
        if (baseData.householdRegistryClassify == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
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
          this.addressChildModelNow.push(
            baseData.currentAddressPro || '',
            baseData.currentAddressCity || '',
            baseData.currentAddressCounty || '',
            baseData.currentAddressTown || ''
          )
        }
        if (baseData.currentAddressVillage) {
          this.addressChildModelNow.push(baseData.currentAddressVillage)
        }
        if (baseData.sameAddress) {
          baseData.sameAddress = baseData.sameAddress ? ['1'] : []
        }
        // 基本时间
        baseData.birthday = baseData.birthday
          ? moment(baseData.birthday, 'YYYY-MM-DD')
          : null
        const diffcultData = data.difficultiesChildrenVo // 困境儿童
        if (diffcultData.fileList) {
          const ffOAll = diffcultData.fileList
          if (ffOAll.length > 0) {
            await this.$nextTick(() => {
              ffOAll.forEach((s) => {
                if (s.busiType == '75') {
                  this.imglist.push(s)
                  const returnFileIds = s.response.data.data.fileid
                  this.delVisible = true
                  this.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
                }
                if (s.busiType == '76') {
                  this.parentlistF.push(s)
                  this.fatherForm.setFieldsValue({
                    uploadFileT: 'yes'
                  })
                }
                if (s.busiType == '77') {
                  this.parentlistM.push(s)
                  this.motherForm.setFieldsValue({
                    uploadFileT: 'yes'
                  })
                }
              })
            })
          }
        }
        this.difficultiesChildrenVoId = diffcultData.id
        this.difficultiesChildrenVoChildId = diffcultData.childId

        // 处理条件联动
        if (diffcultData.placeReason == 4) {
          // 安置原因
          this.baseDataReasonsOther = true
          this.baseForm.setFieldsValue({
            placeReasonOther: diffcultData.placeReasonOther
          })
        }
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
        // if (diffcultData.academicStatus == 1) {
        //   // 学业情况 住校
        //   this.isAtSchool = true
        // } else {
        //   this.isAtSchool = false
        // }
        if (diffcultData.academicStatus == '1') {
          this.isAtSchool = true
        } else {
          this.isAtSchool = false
        }
        if (diffcultData.academicStatus == '7') {
          this.disabledG = true
          this.statusForm.setFieldsValue({ goSchoolStatus: '91' })
        } else {
          this.disabledG = false
          this.statusForm.setFieldsValue({ goSchoolStatus: null })
        }
        // if (diffcultData.academicStatus == '6') {
        //   this.isshow = false
        // } else {
        //   this.isshow = true
        // }
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
        const suggestData = data.troubleSupportAdviseVo
          ? data.troubleSupportAdviseVo
          : [] // 建议
        this.troubleSupportAdviseVoId = suggestData.id
        this.troubleSupportAdviseVoTroubleChildId = suggestData.troubleChildId
        if (suggestData.supportRecommendations == 7) {
          this.supportType = true
        } else {
          this.supportType = false
        }
        if (suggestData.supportRecommendations) {
          suggestData.supportRecommendations = suggestData.supportRecommendations.split(',')
        } else {
          suggestData.supportRecommendations = []
        }
        await this.$nextTick(() => {
          this.baseForm.setFieldsValue(baseData)
          this.baseForm.setFieldsValue({
            sameAddress: diffcultData.sameAddress == '0' ? [] : ['1'],
            placeReason: diffcultData.placeReason,
            placeReasonOther: diffcultData.placeReasonOther,
            isDisabled: diffcultData.isDisabled
          })
          // this.baseForm.setFieldsValue(diffcultData)
          this.heathForm.setFieldsValue(diffcultData)
          this.setHeight('two', 'twoout')
          this.statusForm.setFieldsValue(diffcultData)
          // this.statusForm.setFieldsValue({isStricken: diffcultData.isStricken})
          this.suggestForm.setFieldsValue(suggestData)
        })

        // let orgData = this.OrgForm.getFieldsValue() /// 机构信息
        this.addressOrgModel = []
        const orgData = data.troubledUnitVo // 机构
        this.troubledUnitVoTroubleChildId = orgData.troubleChildId
        this.troubledUnitVoId = orgData.id
        if (orgData.orgAddressProvince) {
          this.addressOrgModel.push(
            orgData.orgAddressProvince || '',
            orgData.orgAddressCity || '',
            orgData.orgAddressCounty || ''
          )
        }
        this.$nextTick(() => {
          this.OrgForm.setFieldsValue(orgData)
        })
        //  let motherData = this.motherForm.getFieldsValue() // 父母及其他监护人信息：
        // let fatherData = this.fatherForm.getFieldsValue()
        // let otherManData = this.otherManForm.getFieldsValue()
        const manData = data.troubledParentsListVo // 监护人

        if (manData) {
          const fatherData = manData[0]
          const motherData = manData[1]
          const otherManData = manData[2]
          this.fatherId = fatherData.id
          this.fatherParentsId = fatherData.parentsId
          this.fatherTroubleChildId = fatherData.troubleChildId

          this.motherDataId = motherData.id
          this.motherDataParentsId = motherData.parentsId
          this.motherDataTroubleChildId = motherData.troubleChildId

          this.otherManDataId = otherManData.id
          this.otherManDataParentsId = otherManData.parentsId
          this.otherManDataTroubleChildId = otherManData.troubleChildId

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
                let cardType = '0'
                if (e.memberIdType) {
                  cardType = e.memberIdType
                } else {
                  cardType = '0'
                }
                if (e.censusRegisterPro) {
                  addressFMModels.push(
                    e.censusRegisterPro || '',
                    e.censusRegisterCity || '',
                    e.censusRegisterCounty || ''
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
                    e.currentAddressPro || '',
                    e.currentAddressCity || '',
                    e.currentAddressCounty || ''
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
                  this.cardTypeF = cardType
                  this.mustTipF = infoCaseStatus // WWWWWWWF
                  this.addressFMModel1 = addressFMModels || [] // 户籍
                  this.addressFMModelNow1 = addressFMModelNows || [] // 现地址
                  this.setAddressFNow()
                  this.setAddressF()
                  this.zkval = zkvals // 其他特殊情况 其他 9
                  this.familyBreadwinners1 = familyBreadwinnerss // 经济来源其他
                  this.heathvalF = heaths || '' // 健康状况其他
                  this.serioushvalF = serioush // 慢性病 ... 其他

                  if (e.otherSpecialCircumstances == '1') {
                    this.islive1 = false
                  } else {
                    this.islive1 = true
                  }
                  // if (e.otherSpecialCircumstancesl == '3') {
                  //   this.fatherForm.setFieldsValue({healthStatus: '22'})
                  //   this.getdisabiliytype('22', '1')
                  //   this.heathvalF = '22'
                  // } else if (e.otherSpecialCircumstances == '4') {
                  //   this.fatherForm.setFieldsValue({healthStatus: '60'})
                  //   this.getdisabiliytype('60', '1')
                  //   this.heathvalF = '60'
                  // } else {
                  //   this.fatherForm.setFieldsValue({healthStatus: ''})
                  //   this.heathvalF = '0'
                  // }
                  if (e.otherSpecialCircumstances == '2' || e.otherSpecialCircumstances == '5') {
                    this.isknow1 = false
                  } else {
                    this.isknow1 = true
                  }
                  if (e.otherSpecialCircumstances == '8' || e.otherSpecialCircumstances == '6') {
                    this.isjianhu1 = true
                  } else {
                    this.isjianhu1 = false
                  }
                  if (e.otherSpecialCircumstances == '7') {
                    this.isjiedu1 = true
                  } else {
                    this.isjiedu1 = false
                  }

                  this.$nextTick(() => {
                    this.fatherForm.setFieldsValue(e)
                    this.setHeight('ktone', 'ktoneout')
                  })
                } else {
                  this.cardTypeM = cardType
                  this.mustTipM = infoCaseStatus // WWWWWWW
                  this.addressFMModel2 = addressFMModels || []
                  this.addressFMModelNow2 = addressFMModelNows
                  this.setAddressM()
                  this.setAddressMNow()

                  this.zkval1 = zkvals
                  this.familyBreadwinners2 = familyBreadwinnerss
                  this.heathvalM = heaths || ''
                  this.serioushvalM = serioush

                  if (e.otherSpecialCircumstances == '1') {
                    this.islive2 = false
                  } else {
                    this.islive2 = true
                  }
                  // if (e.otherSpecialCircumstancesl == '3') {
                  //   this.motherForm.setFieldsValue({healthStatus: '22'})
                  //   this.getdisabiliytype('22', '2')
                  //   this.heathvalM = '22'
                  // } else if (e.otherSpecialCircumstances == '4') {
                  //   this.motherForm.setFieldsValue({healthStatus: '60'})
                  //   this.getdisabiliytype('60', '2')
                  //   this.heathvalM = '60'
                  // } else {
                  //   this.motherForm.setFieldsValue({healthStatus: ''})
                  //   this.heathvalM = '0'
                  // }
                  if (e.otherSpecialCircumstances == '2' || e.otherSpecialCircumstances == '5') {
                    this.isknow2 = false
                  } else {
                    this.isknow2 = true
                  }
                  if (e.otherSpecialCircumstances == '8' || e.otherSpecialCircumstances == '6') {
                    this.isjianhu2 = true
                  } else {
                    this.isjianhu2 = false
                  }
                  if (e.otherSpecialCircumstances == '7') {
                    this.isjiedu2 = true
                  } else {
                    this.isjiedu2 = false
                  }

                  this.$nextTick(() => {
                    this.motherForm.setFieldsValue(e)
                    this.setHeight('ktone', 'ktoneout')
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
                if (e.memberIdType) {
                  this.cardTypeO = e.memberIdType
                } else { this.cardTypeO = '0' }

                if (e.otherSpecialCircumstances) {
                  this.zkvalO = e.otherSpecialCircumstances
                  // this.otherManForm.setFieldsValue({otherSpecialCircumstances: e.otherSpecialCircumstances})
                } else {
                  e.otherSpecialCircumstances = ''
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

                //渲染其他监护人信息
                if (e.otherSpecialCircumstances == '1') {
                  this.islive0 = false
                } else {
                  this.islive0 = true
                }
                // if (e.otherSpecialCircumstances == '3') {
                //   this.otherManForm.setFieldsValue({healthStatus: '22'})
                //   this.getdisabiliytype('22', '3')
                //   this.heathvalO = '22'
                // } else if (e.otherSpecialCircumstances == '4') {
                //   this.otherManForm.setFieldsValue({healthStatus: '60'})
                //   this.getdisabiliytype('60', '3')
                //   this.heathvalO = '60'
                // } else {
                //   this.otherManForm.setFieldsValue({healthStatus: ''})
                //   this.heathvalO = ''
                // }
                if (e.otherSpecialCircumstances == '8' || e.otherSpecialCircumstances == '6') {
                  this.isjianhu0 = true
                } else {
                  this.isjianhu0 = false
                }
                if (e.otherSpecialCircumstances == '2' || e.otherSpecialCircumstances == '5') {
                  this.isknow0 = false
                } else {
                  this.isknow0 = true
                }
                if (e.otherSpecialCircumstances == '7') {
                  this.isjiedu0 = true
                } else {
                  this.isjiedu0 = false
                }

                this.$nextTick(() => {
                  this.otherManForm.setFieldsValue(e)
                  // this.$nextTick(() => {
                  //   this.otherManForm.setFieldsValue({otherSpecialCircumstances: e.otherSpecialCircumstances})
                  // })
                  setTimeout(() => {
                    this.otherManForm.setFieldsValue({ otherSpecialCircumstances: e.otherSpecialCircumstances })
                  }, 300);
                  this.setHeight('kttwo', 'kttwoout')
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
    async processingData () {
      // 儿童基本信息
      const childBaseInformationVo = this.baseForm.getFieldsValue()

      if (childBaseInformationVo.birthday) {
        childBaseInformationVo.birthday = childBaseInformationVo.birthday.format(
          'YYYY-MM-DD'
        )
      }
      if (childBaseInformationVo.censusRegisterSD) {
        childBaseInformationVo.censusRegisterPro =
          childBaseInformationVo.censusRegisterSD[0]
        childBaseInformationVo.censusRegisterCity =
          childBaseInformationVo.censusRegisterSD[1]
        childBaseInformationVo.censusRegisterCounty =
          childBaseInformationVo.censusRegisterSD[2]
        childBaseInformationVo.censusRegisterTown =
          childBaseInformationVo.censusRegisterSD[3]
        childBaseInformationVo.censusRegisterVillage =
          childBaseInformationVo.censusRegisterSD[4]
        delete childBaseInformationVo.censusRegisterSD
      }

      if (childBaseInformationVo.currentAddress) {
        childBaseInformationVo.currentAddressPro =
          childBaseInformationVo.currentAddress[0]
        childBaseInformationVo.currentAddressCity =
          childBaseInformationVo.currentAddress[1]
        childBaseInformationVo.currentAddressCounty =
          childBaseInformationVo.currentAddress[2]
        childBaseInformationVo.currentAddressTown =
          childBaseInformationVo.currentAddress[3]
        childBaseInformationVo.currentAddressVillage =
          childBaseInformationVo.currentAddress[4]
        delete childBaseInformationVo.currentAddress
      }
      // 健康状况 生活状况
      const heathForm = this.heathForm.getFieldsValue()
      const statusForm = this.statusForm.getFieldsValue()
      const unattendedChildBaseInfoVo = { ...heathForm, ...statusForm }
      if (unattendedChildBaseInfoVo.disabledType) {
        unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.join(
          ','
        )
      }
      const arr = []
      const filelist = [...this.imglist, ...this.fileList]
      filelist.map(item => {
        arr.push(item.response.data.data.fileid)
      })
      unattendedChildBaseInfoVo.upLoadPathIds = arr

      // 特殊处理申请时间
      if (childBaseInformationVo.applicationTime) {
        unattendedChildBaseInfoVo.applicationTime = childBaseInformationVo.applicationTime.format(
          'YYYY-MM-DD'
        )
      }
      // 地址一致 sameAddress
      if (childBaseInformationVo.sameAddress.length > 0) {
        unattendedChildBaseInfoVo.sameAddress = '1'
      } else {
        unattendedChildBaseInfoVo.sameAddress = '0'
      }
      // 父母及监护人信息
      let unattendedParentInfoVoList = []
      let uniparental = '0'

      uniparental = this.isman[0] || '0'

      const fatherForm = this.fatherForm.getFieldsValue()
      fatherForm.typeRelation = 1
      fatherForm.uniparental = uniparental

      const motherForm = this.motherForm.getFieldsValue()
      motherForm.typeRelation = 2
      motherForm.uniparental = uniparental

      unattendedParentInfoVoList = [...this.adoptorChildrenVos]
      if (this.getnum(fatherForm) > 2) {
        unattendedParentInfoVoList.push(fatherForm)
      }
      if (this.getnum(motherForm) > 2) {
        unattendedParentInfoVoList.push(motherForm)
      }

      const registerAdoptionVo = {
        childBaseInformationVo,
        unattendedChildBaseInfoVo,
        unattendedParentInfoVoList
      }

      return registerAdoptionVo
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
    formattingDate () { },
    reasonsOtherSetHeight (v) {
      if (v == 4) {
        this.baseDataReasonsOther = true
      } else {
        this.baseDataReasonsOther = false
      }
      this.setHeight('one', 'oneout')
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
            // data.currentAddressTown = data[k][3]
            // data.currentAddressVillage = data[k][4]
            delete data[k]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },
    async submit (val) {
      let isPass = true
      const message = ''
      this.isvalidator = false
      const baseData = this.baseForm.getFieldsValue() // 儿童基本信息
      if (this.heathval == this.Enum.HEALTHSTATUS.DISABILITY) {
        baseData.isDisabled = '1'
      } else {
        baseData.isDisabled = '0'
      }
      const heathData = this.heathForm.getFieldsValue() // 儿童健康状况
      const statusData = this.statusForm.getFieldsValue() // 生活情况

      const motherData = this.motherForm.getFieldsValue() // 父母及其他监护人信息：
      const fatherData = this.fatherForm.getFieldsValue()

      if (fatherData.infoCase != '1') { // 完整 父亲
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
      if (motherData.infoCase != '1') { // 完整 母亲
        if (this.parentlistM.length == 0) {
          this.motherForm.setFieldsValue({
            uploadFileT: null
          })
        } else {
          this.motherForm.setFieldsValue({
            uploadFileT: 'yes'
          })
        }
      } // WWWWWW

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

      let DifficultiesChildrenAllVo = {}
      let troubleSupportAdviseVo = {} // 建议
      let troubledUnitVo = {} // 机构
      const troubledParentsListVo = [] // 监护人
      let childBaseInformationVo = {} // 基本信息
      let difficultiesChildrenVo = {} // 困境儿童

      const FMOM = await this.validateLots(motherData)
      const FMOF = await this.validateLots(fatherData)
      const FMOO = await this.validateLots(otherManData)
      // teb3
      if (val != 's') {
        await this.suggestForm.validateFields((err, values) => {
          if (err) {
            isPass = false
            this.nowkey = '5'
          }
        })
        // teb2
        // if (FMOM || FMOF || FMOO) {
        // } else {
        //   isPass = false
        //   this.nowkey = '2'
        //   message = '父母及其他监护人需要至少填写一类信息'
        // }

        await this.OrgForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '4'
            isPass = false
            this.setHeight('ktthree', 'ktthreeout')
          }
        })
        if (FMOO) {
          await this.otherManForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '3'
              isPass = false
              this.setHeight('kttwo', 'kttwoout')
            }
          })
        }
        if (FMOM) {
          await this.motherForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '2'
              isPass = false
              this.setHeight('ktone', 'ktoneout')
            }
          })
        }
        if (FMOF) {
          await this.fatherForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '2'
              isPass = false
              this.setHeight('ktone', 'ktoneout')
            }
          })
        }
        // 身份证号必填时的验证
        if (!this.baseForm.getFieldsValue().idCard && !this.householdRegistryClassifydisabled) {
          this.baseForm.setFields({
            idCard: {
              value: null,
              errors: '请输入身份证号'
            }
          })
        }
        // teb1
        await this.baseForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '1'
            isPass = false
            this.setHeight('one', 'oneout')
            this.setHeight('two', 'twoout')
            this.setHeight('three', 'threeout')
          }
        })
        await this.heathForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '1'
            isPass = false
            this.setHeight('one', 'oneout')
            this.setHeight('two', 'twoout')
            this.setHeight('three', 'threeout')
          }
        })
        await this.statusForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '1'
            isPass = false
            this.setHeight('one', 'oneout')
            this.setHeight('two', 'twoout')
            this.setHeight('three', 'threeout')
          }
        })
      } else {
        isPass = false
      }

      if (isPass || (val == 's' && baseData.name)) {
        this.dispose(baseData)
        this.dispose(heathData)
        this.dispose(statusData)
        this.dispose(suggestData)
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
        difficultiesChildrenVo = { ...baseData, ...heathData, ...statusData }
        childBaseInformationVo = baseData
        troubleSupportAdviseVo = suggestData
        troubledUnitVo = orgData
        const name1 = otherManData.name1
        const name2 = otherManData.name2
        const name3 = otherManData.name3
        const name4 = otherManData.name4
        const namelist = []
        let otherGuardianReason = ''
        namelist.push(
          otherManData.name1 || '',
          otherManData.name2 || '',
          otherManData.name3 || '',
          otherManData.name4 || ''
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
        troubledParentsListVo.push(fatherData, motherData, otherManData) // = [...motherData, ...fatherData, ...otherManData]

        DifficultiesChildrenAllVo = {
          difficultiesChildrenVo,
          childBaseInformationVo,
          troubleSupportAdviseVo,
          troubledUnitVo,
          troubledParentsListVo
        }
        DifficultiesChildrenAllVo.troubledParentsListVo[0].parentType = 1
        DifficultiesChildrenAllVo.troubledParentsListVo[1].parentType = 2
        DifficultiesChildrenAllVo.troubledParentsListVo[2].parentType = 3
        let urls = '/difficultiesChildren/save'
        DifficultiesChildrenAllVo.childBaseInformationVo.id = this.childId
        if (this.bj) {
          DifficultiesChildrenAllVo.childBaseInformationVo.id = this.childId ? this.childId : this.childBaseInformationVoId

          DifficultiesChildrenAllVo.difficultiesChildrenVo.id = this.difficultiesChildrenVoId
          DifficultiesChildrenAllVo.difficultiesChildrenVo.childId = this.difficultiesChildrenVoChildId

          DifficultiesChildrenAllVo.troubleSupportAdviseVo.id = this.troubleSupportAdviseVoId
          DifficultiesChildrenAllVo.troubleSupportAdviseVo.troubleChildId = this.troubleSupportAdviseVoTroubleChildId

          DifficultiesChildrenAllVo.troubledUnitVo.childId = this.troubledUnitVoTroubleChildId
          DifficultiesChildrenAllVo.troubledUnitVo.id = this.troubledUnitVoId

          DifficultiesChildrenAllVo.troubledParentsListVo[0].id = this.fatherId
          DifficultiesChildrenAllVo.troubledParentsListVo[0].parentsId = this.fatherParentsId
          DifficultiesChildrenAllVo.troubledParentsListVo[0].troubleChildId = this.fatherTroubleChildId

          DifficultiesChildrenAllVo.troubledParentsListVo[2].id = this.otherManDataId
          DifficultiesChildrenAllVo.troubledParentsListVo[2].parentsId = this.otherManDataParentsId
          DifficultiesChildrenAllVo.troubledParentsListVo[2].troubleChildId = this.otherManDataTroubleChildId

          DifficultiesChildrenAllVo.troubledParentsListVo[1].id = this.motherDataId
          DifficultiesChildrenAllVo.troubledParentsListVo[1].parentsId = this.motherDataParentsId
          DifficultiesChildrenAllVo.troubledParentsListVo[1].troubleChildId = this.motherDataTroubleChildId
        } else {
        }
        if (this.saveUrl) {
          urls = this.saveUrl
        }
        // 0   暂存， 1   保存
        if (val == 's') {
          urls = '/difficultiesChildren/tssave'
          DifficultiesChildrenAllVo.state = 0
        } else {
          DifficultiesChildrenAllVo.state = 1
        }

        const res = await this.post(urls, DifficultiesChildrenAllVo, true).then((res) => {
          if (res.serviceSuccess) {
            this.$message.success('数据保存/修改成功')
            this.backs()
          }
        })
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
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('three', 'threeout')
        this.setHeight('ktone', 'ktoneout')
        this.setHeight('kttwo', 'kttwoout')
        this.setHeight('ktthree', 'ktthreeout')
      })
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
</style>
