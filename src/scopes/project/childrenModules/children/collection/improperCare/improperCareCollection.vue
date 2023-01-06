<template>
  <!-- 留守采集  2020年2月13日23点03分-->
  <div class="conts abc"
       @click='allvalidator'>
    <div class="contin">
      <div v-if="!look">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="儿童类别:"
                        class="fromwid">
            <ta-input defaultValue="监护不当儿童"
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
              <stayAtHomeBaseInfo :familyPoorOthers="familyPoorOther"
                                  :guardianshipDilemmaOthers="guardianshipDilemmaOthers"
                                  :unattendedOthers="unattendedOthers"
                                  :nobList="nobList"
                                  @reasonsOtherSetHeight="reasonsOtherSetHeight"
                                  :thisP="thisP"
                                  :type="type"
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
                                  @setHeight="setHeight('one', 'oneout')"></stayAtHomeBaseInfo>
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
                <ta-col hidden
                        :span="24">
                  <ta-form-item label="患艾滋病情况"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{span:20}"
                                fieldDecoratorId="adisCondition">
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
                <ta-col hidden
                        :span="24">
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
                <ta-col hidden
                        :span="24">
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
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="健康状况"
                                fieldDecoratorId="healthStatus"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 20 }"
                                :defaultValue='10'
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
                              maxlength='50'
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
                                maxlength='50'
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
                                maxlength='50'
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
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item v-if="!(xyval==Enum.SCHOOLWORK.OTHER)"
                                label="就学情况"
                                fieldDecoratorId="goSchoolStatus"
                                :fieldDecoratorOptions="rules.goSchoolStatus">
                    <ta-select allowClear
                               :disabled="disabled || disabledG"
                               :placeholder="disabled?'':'请选择就学情况'">
                      <ta-select-option v-for="item in schoolingList"
                                        :key="item.value"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="是否学校寄宿"
                                v-if="isAtSchool"
                                :require="{message:'请选择是否学校寄宿'}"
                                fieldDecoratorId="isBoardingSchool">
                    <ta-radio-group :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item,index) in yesNoList"
                                :key="index">{{item.label}}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="帮扶建议"
                                fieldDecoratorId="supportRecommendations"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }"
                                :initValue="[]"
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
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              maxlength='50'
                              :placeholder="disabled?'':'请输入其他'"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item hidden
                                label="监护类型"
                                fieldDecoratorId="guardianshipType"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
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
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                  <ta-form-item label="监护不当情形"
                                fieldDecoratorId="improperCare"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
                    <ta-checkbox-group :options="rescueSituationList"
                                       :disabled="disabled"
                                       @change="rescueSituations"
                                       class="radioClass" />
                  </ta-form-item>
                  <ta-form-item v-if="rescueSituation"
                                label="其他"
                                fieldDecoratorId="improperCareOther"
                                :labelCol="{ span:4 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              maxlength='50'
                              :placeholder="disabled?'':'请输入其他情况'" />
                  </ta-form-item>
                  <ta-form-item hidden
                                label="有无发生遭受监护人侵害的情况"
                                fieldDecoratorId="isStricken"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 21 }">
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
                                fieldDecoratorId="isStrickenOther">
                    <ta-input :disabled="disabled"
                              maxlength='50'
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
          <div class="mars1"
               ref="ktoneout">
            <Divider title="儿童父母情况"></Divider>
            <ta-row ref="ktone">
              <ta-col :span="11">
                <ta-form layout="horizontal"
                         :autoFormCreate="(fatherForm)=>{this.fatherForm = fatherForm}">
                  <stayAtHomeParentInfo :parentlist.sync='parentlistF'
                                        :citizenship="citizenshipF"
                                        :islive="islive1"
                                        :isknow="isknow1"
                                        :issure="issure1"
                                        :isjianhu="isjianhu1"
                                        :isjiedu="isjiedu1"
                                        :mustTip="mustTipF"
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
                                        @reForm="reForm"
                                        @setAddressFM="setAddressF"
                                        @setAddressFMNow="setAddressFNow"
                                        :cardType='cardTypeF'></stayAtHomeParentInfo>
                </ta-form>
              </ta-col>
              <ta-col :span="11"
                      :offset="1">
                <ta-form layout="horizontal"
                         :autoFormCreate="(motherForm)=>{this.motherForm = motherForm}">
                  <stayAtHomeParentInfo :parentlist.sync='parentlistM'
                                        :citizenship="citizenshipM"
                                        :islive="islive2"
                                        :isknow="isknow2"
                                        :issure="issure2"
                                        :isjianhu="isjianhu2"
                                        :isjiedu="isjiedu2"
                                        :mustTip="mustTipM"
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
                                        @reForm="reForm"
                                        @setAddressFM="setAddressM"
                                        @setAddressFMNow="setAddressMNow"
                                        :cardType='cardTypeM'></stayAtHomeParentInfo>
                </ta-form>
              </ta-col>
            </ta-row>
          </div>
        </ta-tab-pane>
        <!-- <ta-tab-pane tab="其他监护人信息"
                     key="3"
                     :forceRender="true">
          <div class="mars1"
               ref="kttwoout">
            <ta-row ref="kttwo">
              <ta-form layout="horizontal"
                       :autoFormCreate="(otherManForm)=>{this.otherManForm = otherManForm}">
                <stayAtHomeOtherPeope @otherPother="otherPother"
                                      :mustTipO="mustTipO"
                                      :isjianhu="isjianhu0"
                                      :isjiedu="isjiedu0"
                                      :isknow="isknow0"
                                      :islive="islive0"
                                      ref="otherInfo"
                                      :isrequired.sync="isrequiredO"
                                      :disabled="disabled"
                                      :thisP="thisP"
                                      :disabiliytypelist="disabiliytypelistO"
                                      :others="zkvalO"
                                      :heathval="heathvalO"
                                      :serioushval="serioushvalO"
                                      :ortherRe="ortherRe"
                                      :cardType='cardTypeO'></stayAtHomeOtherPeope>
              </ta-form>
            </ta-row>
          </div>
        </ta-tab-pane> -->
        <ta-tab-pane tab="机构信息"
                     key="4"
                     :forceRender="true">
          <div class="mars1"
               ref="ktthreeout">
            <Divider title="机构信息"></Divider>
            <ta-row ref="ktthree">
              <ta-form layout="horizontal"
                       :autoFormCreate="(OrgForm)=>{this.OrgForm = OrgForm}">
                <ta-col :span="12">
                  <ta-form-item label="机构名称"
                                fieldDecoratorId="imrpoperCareOrgName"
                                :fieldDecoratorOptions="this.verificationRulesNotMustFill('机构名称' ,72)">
                    <ta-input :disabled="disabled"
                              maxlength='72'
                              :placeholder="disabled?'':'请输入机构名称'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="负责人"
                                fieldDecoratorId="principal"
                                :fieldDecoratorOptions="this.verificationRulesNotMustFill('负责人' ,72)">
                    <ta-input :disabled="disabled"
                              maxlength='72'
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
                                :fieldDecoratorOptions="this.phoneRule(false,'请输入固定电话')">
                    <ta-input :disabled="disabled"
                              maxlength='17'
                              oninput="value=value.replace(/[^\d]/g,'')"
                              :placeholder="disabled?'':'请输入固定电话'"
                              type="text" />
                  </ta-form-item>
                  <ta-form-item label="联系电话"
                                fieldDecoratorId="telphone"
                                :fieldDecoratorOptions="this.phoneRule(false,'请输入联系电话')">
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
                                      :disabled='disabled'
                                      :isRequire='false'
                                      :clearPlaceHolder='disabled'
                                      :labelwidth=" {label: 6,  wrapper: 18}"
                                      fileldName="orgAddress"
                                      @setaddress="setOrgAddress"></AddressComponent>
                  </ta-col>
                  <ta-col :span="12">
                    <ta-form-item label
                                  fieldDecoratorId="orgAddressParticulars"
                                  style="margin-left:10px;"
                                  :wrapperCol="{ span: 18}"
                                  :fieldDecoratorOptions="this.verificationRulesNotMustFill('详细地址' ,100)">
                      <ta-input :placeholder="disabled?'':'请输入详细地址'"
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
                     v-if="false"
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
                              :fieldDecoratorOptions="rules.healthStatusOther">
                  <ta-input :disabled="disabled"
                            maxlength='50'
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
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch&&jump"
                 @click="backs">返回</ta-button>
      <ta-button v-if="reSave&&!disabled&&nowkeyP!='2'"
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
import stayAtHomeBaseInfo from './components/stayAtHomeBaseInfo'
import stayAtHomeParentInfo from './components/stayAtHomeParentInfo'
import stayAtHomeOtherPeope from './components/stayAtHomeOtherPeope'
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
    stayAtHomeBaseInfo,
    Title,
    Divider,
    stayAtHomeParentInfo,
    stayAtHomeOtherPeope,
    AddressComponent
  },
  data () {
    return {
      disabledG: false,
      cardTypeF: '0',
      cardTypeM: '0',
      cardTypeO: '0',
      disabilityTypeValues: [], // 残疾类别选择的数据
      radiovalueAdis: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径选择的数据
      adisConditionList: [],
      transmissionWayList: [],
      issure1: true,
      issure2: true,
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

      mustTipM: true,
      mustTipF: true,
      mustTipO: true,
      ortherRe: false,
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
      type: false,

      citizenshipM: false, // 父母现住址情况
      citizenshipF: false,

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
      delVisible: false,
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.id = null
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
    reForm () {
      this.setHeight('ktone', 'ktoneout')
    },
    mustTipchange (v, types) {
      if (types == '1') {
        this.mustTipF = v
        this.fatherForm.resetFields()
        if (v) {
          this.$nextTick(() => {
            this.fatherForm.setFieldsValue({
              citizenship: ['1'],
              currentAddressDetail: '',
              sameAddress: [],
              currentAddress: []
            })
            this.citizenshipF = false
          })
        } else {
          this.$nextTick(() => {
            this.fatherForm.setFieldsValue({
              citizenship: [],
              currentAddressDetail: '',
              sameAddress: [],
              currentAddress: []
            })
            this.citizenshipF = false
          })
        }
      } else {
        if (v) {
          this.$nextTick(() => {
            this.motherForm.setFieldsValue({
              citizenship: ['1'],
              currentAddressDetail: '',
              sameAddress: [],
              currentAddress: []
            })
            this.citizenshipM = false
          })
        } else {
          this.$nextTick(() => {
            this.motherForm.setFieldsValue({
              citizenship: [],
              currentAddressDetail: '',
              sameAddress: [],
              currentAddress: []
            })
            this.citizenshipM = false
          })
        }
        this.mustTipM = v
        this.motherForm.resetFields()
      }
    },
    mustTipOCtrl (v) { // WWWWW
      const otherData1 = this.otherManForm.getFieldsValue()
      this.otherManForm.resetFields()
      this.otherManForm.setFieldsValue(otherData1)
      this.mustTipO = v
      this.heathvalO = '0'
      this.zkvalO = ''
    },
    supportTypes (v) {
      if (v[v.length - 1] == '7') {
        v = ['7']
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
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
          this.statusForm.setFieldsValue({
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
        })
      } else if (v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }
        this.$nextTick(() => {
          this.statusForm.setFieldsValue({
          })
          this.othersituation = false
        })
      }
      this.setHeight('three', 'threeout')
    },
    rescueSituations (checkedList) {
      const improperCare = [...(checkedList.length > 0 ? checkedList.pop() : '')]
      setTimeout(() => {
        this.statusForm.setFieldsValue({ improperCare })
        this.rescueSituation = improperCare[0] == 7
        this.setHeight('three', 'threeout')
      }, 0)
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
        this.type = true
        this.baseForm.setFieldsValue({
          censusRegisterSD: undefined,
          censusRegisterDetail: undefined,
          censusRegister: undefined,
          idCard: undefined,
          birthday: undefined,
          sex: undefined
        })
      } else {
        this.type = false
      }
    },

    zkChange (val, e) {
      // fm
      if (e == 1) {
        this.zkval = val
        this.islive1 = val != '1'
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
        this.isknow1 = val != '2' && val != '5'
        this.isjianhu1 = val == '8' || val == '6'
        this.isjiedu1 = val == '7'
        this.$nextTick(() => {
          this.$refs.faInfo.textphone1()
        })
        const faData = this.fatherForm.getFieldsValue()
        this.fatherForm.resetFields()
        this.fatherForm.setFieldsValue(faData)
      } else {
        this.zkval1 = val
        this.islive2 = val != '1'
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
        this.isknow2 = val != '2' && val != '5'
        this.isjianhu2 = val == '8' || val == '6'
        this.isjiedu2 = val == '7'
      }
      this.$nextTick(() => {
        this.$refs.maInfo.textphone1()
      })
      const maData = this.motherForm.getFieldsValue()
      this.motherForm.resetFields()
      this.motherForm.setFieldsValue(maData)
      this.setHeight('ktone', 'ktoneout')
    },
    otherPother (val) {
      const otherData = this.otherManForm.getFieldsValue()
      this.otherManForm.resetFields()
      this.otherManForm.setFieldsValue(otherData)
      this.zkvalO = val
      this.islive0 = val != '1'

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
      this.isjianhu0 = val == '8' || val == '6'
      this.isknow0 = val != '2' && val != '5'
      this.isjiedu0 = val == '7'
      this.$nextTick(() => {
        this.$refs.otherInfo.textphone1()
      })
      // this.setHeight('kttwo', 'kttwoout')
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
      this.isFromSearch = false
      this.formDataSearch = {}
      this.delVisible = false
      this.disabledG = false
      this.ortherRe = false
      this.cardTypeF = '0'
      this.cardTypeM = '0'
      this.cardTypeO = '0'
      this.childId = null
      this.rescueSituation = false
      this.issure1 = true
      this.issure2 = true
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
      this.mustTipM = true
      this.mustTipF = true
      this.mustTipO = true
      this.citizenshipM = false
      this.citizenshipF = false
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
      this.type = false
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
      // this.otherManForm.resetFields()
      this.motherForm.resetFields()
      this.OrgForm.resetFields()
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
      this.othersituation = false
      this.supportType = false
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        this.setHeight('three', 'threeout')
      })
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
            },
            onCancel: () => {
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
      this.transmissionWayList = await this.getDictionaries('TRANSMISSIONWAYOTHER')
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

      if (this.xyval == '1') {
        this.isAtSchool = true
      } else {
        this.isAtSchool = false
      }
      this.$nextTick(() => {
        this.disabledG = this.xyval == '7'
        this.statusForm.setFieldsValue({ goSchoolStatus: this.xyval == '7' ? '91' : null })
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
      this[type === '1' ? 'serioushvalF' : 'serioushvalM'] = a
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
    citizenshipChange (v, types) {
      if (types == '2') {
        this.citizenshipM = v
        this.$nextTick(() => {
          this.motherForm.setFieldsValue({
            currentAddressDetail: '',
            sameAddress: [],
            currentAddress: []
          })
        })
      } else {
        this.citizenshipF = v
        this.$nextTick(() => {
          this.fatherForm.setFieldsValue({
            currentAddressDetail: '',
            sameAddress: [],
            currentAddress: []
          })
        })
      }
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
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (refout == 'twoout') {
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
        const resobj = await this.post('/improperCareChildApi/queryById', params)
        data = resobj.data.data // 加载数据 2020年1月9日11:56:07
      }

      if (!data.errors) {
        // 基本
        // 基本地址
        const baseData = data.childBaseInformationVo
        this.oldIdCard = baseData
          ? baseData.idCard
          : null // 保存进入编辑刚加载时的身份证号
        this.childBaseInformationVoId = baseData.id

        if (baseData.householdRegistryClassify == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
          this.householdRegistryClassifydisabled = true
        }

        if (baseData.censusRegisterPro) {
          this.addressChildModel.push(baseData.censusRegisterPro || '')
        }
        if (baseData.censusRegisterCity) {
          this.addressChildModel.push(baseData.censusRegisterCity || '')
        }
        if (baseData.censusRegisterCounty) {
          this.addressChildModel.push(baseData.censusRegisterCounty || '')
        }
        if (baseData.censusRegisterTown) {
          this.addressChildModel.push(baseData.censusRegisterTown || '')
        }
        if (baseData.censusRegisterVillage) {
          this.addressChildModel.push(baseData.censusRegisterVillage || '')
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
          this.addressChildModelNow.push(baseData.currentAddressVillage || '')
        }
        if (baseData.householdRegistryClassify && baseData.householdRegistryClassify == '4') {
          this.type = true
        } else {
          this.type = false
        }
        // 基本时间
        baseData.birthday = baseData.birthday
          ? moment(baseData.birthday, 'YYYY-MM-DD')
          : null
        const diffcultData = data.improperCareChildVo // 困境儿童
        baseData.isDisabled = diffcultData.isDisabled
        // 上传
        if (diffcultData.fileList) {
          const ffOAll = diffcultData.fileList
          if (ffOAll.length > 0) {
            await this.$nextTick(() => {
              ffOAll.forEach((s) => {
                if (s.functionType == '1') {
                  this.imglist.push(s)
                  const returnFileIds = s.response.data.data.fileid
                  this.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + returnFileIds
                  this.delVisible = true
                }
                if (s.functionType == '76') {
                  this.parentlistF.push(s)
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
        this.difficultiesChildrenVoId = diffcultData.id
        this.difficultiesChildrenVoChildId = diffcultData.childId
        if (baseData.adisCondition) {
          this.radiovalueAdis = baseData.adisCondition
        }
        diffcultData.adisCondition = baseData.adisCondition
        diffcultData.adisConditionOther = baseData.adisConditionOther
        if (diffcultData.transmissionWay) {
          this.radiovalues = diffcultData.transmissionWay
        }
        if (diffcultData.infectionTime) {
          diffcultData.infectionTime = moment(diffcultData.infectionTime, 'YYYY-MM-DD')
        }

        // 处理条件联动
        if (diffcultData.familyPoor == 4) {
          // 家困qt
          this.familyPoorOther = true
        }
        if (diffcultData.guardianshipDilemma) {
          // 监护困qt
          this.guardianshipDilemmaOthers = diffcultData.guardianshipDilemma
          if (diffcultData.guardianshipDilemma == 10) {
            this.getUnList()
          }
        }
        // 无人其他
        this.unattendedOthers = diffcultData.unattended == 15

        // 儿童健康状况
        this.heathval = diffcultData.healthStatus
          ? diffcultData.healthStatus
          : ''
        // 健康状况
        if (diffcultData.disabledType) {
          diffcultData.disabledType = diffcultData.disabledType.split(',')

          this.serioushval = diffcultData.disabledType[diffcultData.disabledType.length - 1] ==
            this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
            diffcultData.disabledType[diffcultData.disabledType.length - 1] ==
            this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
        }
        await this.getdisabiliytype(diffcultData.healthStatus)
        if (!diffcultData.disabledType) {
          diffcultData.disabledType = []
        }
        if (diffcultData.academicStatus) {
          // 学业情况 其他
          this.xyval = diffcultData.academicStatus
        }
        // 学业情况 住校
        this.isAtSchool = diffcultData.academicStatus == 1

        this.disabledG = diffcultData.academicStatus == '7'
        this.statusForm.setFieldsValue({ goSchoolStatus: diffcultData.academicStatus == '7' ? '91' : null })

        // 其他特殊情况
        this.othersituation = diffcultData.otherSpecialCircumstances == 5

        if (diffcultData.otherSpecialCircumstances) {
          diffcultData.otherSpecialCircumstances = diffcultData.otherSpecialCircumstances.split(
            ','
          )
        } else {
          diffcultData.otherSpecialCircumstances = []
        }
        // 监护不当情况
        this.rescueSituation = diffcultData.improperCare == 7
        // 侵害
        this.haveEncroachs = diffcultData.isStricken == 6
        this.supportType = diffcultData.supportRecommendations == 7
        diffcultData.supportRecommendations = diffcultData.supportRecommendations ? diffcultData.supportRecommendations.split(',') : []

        this.$nextTick(() => {
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

          this.heathForm.setFieldsValue(diffcultData)
          diffcultData.improperCare = diffcultData.improperCare ? [...diffcultData.improperCare.trim()] : []
          this.statusForm.setFieldsValue(diffcultData)
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
          this.setHeight('three', 'threeout')
        })

        const orgData = data.improperCareUnitVo // 机构
        this.troubledUnitVoTroubleChildId = orgData.improperCareChildId ? orgData.improperCareChildId : ''
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

        const manData = data.improperCareParentsVoList // 监护人

        if (manData) {
          const fatherData = manData[0]
          const motherData = manData[1]
          const otherManData = manData[2]
          this.fatherId = fatherData.id
          this.fatherParentsId = fatherData.parentsId
          this.fatherTroubleChildId = fatherData.improperCareChildId

          this.motherDataId = motherData.id
          this.motherDataParentsId = motherData.parentsId
          this.motherDataTroubleChildId = motherData.improperCareChildId

          this.otherManDataId = otherManData.id
          this.otherManDataParentsId = otherManData.parentsId
          this.otherManDataTroubleChildId = otherManData.improperCareChildId

          manData.forEach((e, i) => {
            if (e) {
              if (i < 2) {
                let citizenships = false
                let infoCaseStatus = true
                const addressFMModels = []
                const addressFMModelNows = []
                let zkvals = ''
                let familyBreadwinnerss = false
                let heaths = '0'
                let serioush = false
                let cardType = '0'
                cardType = e.memberIdType ? e.memberIdType : '0'
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
                  familyBreadwinnerss = e.familyBreadwinner == '5'
                  e.familyBreadwinner = e.familyBreadwinner.split(',')
                } else {
                  e.familyBreadwinner = []
                }

                heaths = e.healthStatus || ''
                if (e.disabledType) {
                  e.disabledType = e.disabledType.split(',')

                  serioush = e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
                    e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
                } else {
                  e.disabledType = []
                }
                this.getdisabiliytype(e.healthStatus, i + 1)
                e.sameAddress = e.sameAddress == '0' ? [] : ['1']
                infoCaseStatus = e.infoCase == '1' // 信息完整

                if (e.citizenship == '2') {
                  // 现住址2  ->国外。
                  citizenships = true
                } else {
                  citizenships = false
                }
                if (i == 0) {
                  this.citizenshipF = citizenships
                  this.cardTypeF = cardType
                  this.mustTipF = infoCaseStatus
                  this.addressFMModel1 = addressFMModels || [] // 户籍
                  this.addressFMModelNow1 = addressFMModelNows || [] // 现地址
                  this.setAddressFNow()
                  this.setAddressF()
                  this.zkval = zkvals // 其他特殊情况 其他 9
                  this.familyBreadwinners1 = familyBreadwinnerss // 经济来源其他
                  this.heathvalF = heaths || '' // 健康状况其他
                  this.serioushvalF = serioush // 慢性病 ... 其他

                  this.islive1 = e.otherSpecialCircumstances != '1'
                  this.isknow1 = e.otherSpecialCircumstances != '2' && e.otherSpecialCircumstances != '5'
                  this.isjianhu1 = e.otherSpecialCircumstances == '8' || e.otherSpecialCircumstances == '6'
                  this.isjiedu1 = e.otherSpecialCircumstances == '7'

                  this.$nextTick(() => {
                    this.fatherForm.setFieldsValue(e)
                  })
                } else {
                  this.citizenshipM = citizenships
                  this.cardTypeM = cardType
                  this.mustTipM = infoCaseStatus
                  this.addressFMModel2 = addressFMModels || []
                  this.addressFMModelNow2 = addressFMModelNows
                  this.setAddressM()
                  this.setAddressMNow()
                  this.zkval1 = zkvals
                  this.familyBreadwinners2 = familyBreadwinnerss
                  this.heathvalM = heaths || ''
                  this.serioushvalM = serioush
                  this.islive2 = e.otherSpecialCircumstances != '1'
                  this.isknow2 = e.otherSpecialCircumstances != '2' && e.otherSpecialCircumstances != '5'
                  this.isjianhu2 = e.otherSpecialCircumstances == '8' || e.otherSpecialCircumstances == '6'
                  this.isjiedu2 = e.otherSpecialCircumstances == '7'
                  this.$nextTick(() => {
                    this.motherForm.setFieldsValue(e)
                  })
                }
              }

              if (i == 2) {
                if (e.memberIdType) {
                  this.cardTypeO = e.memberIdType
                } else { this.cardTypeO = '0' }
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
                } else {
                  e.otherSpecialCircumstances = []
                } // 其他特殊

                this.heathvalO = e.healthStatus || ''
                if (e.disabledType) {
                  e.disabledType = e.disabledType.split(',')
                  this.serioushvalO = e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
                    e.disabledType[e.disabledType.length - 1] ==
                    this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
                }
                this.ortherRe = e.relationship == '99'// 其他关系
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
                if (e.name4 == '7') {
                  this.mustTipO = true
                  // this.setHeight('kttwo', 'kttwoout')
                } else {
                  this.mustTipO = false
                  // this.setHeight('kttwo', 'kttwoout')
                }
                // 渲染其他监护人信息
                this.islive0 = e.otherSpecialCircumstances != '1'
                this.isjianhu0 = e.otherSpecialCircumstances == '8' || e.otherSpecialCircumstances == '6'
                this.isknow0 = e.otherSpecialCircumstances != '2' && e.otherSpecialCircumstances != '5'
                this.isjiedu0 = e.otherSpecialCircumstances == '7'
                // this.$nextTick(() => {
                //   this.$refs.otherInfo.textphone1()
                // })
                // this.setHeight('kttwo', 'kttwoout')
                // this.$nextTick(() => {
                //   this.otherManForm.setFieldsValue(e)
                // })
              }
            }
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
    reasonsOtherSetHeight (v, ty) {
      if (ty == 1) {
        this.familyPoorOther = v == 4
      }
      if (ty == 2) {
        this.guardianshipDilemmaOthers = v
        if (v == 10) {
          this.unattendedOthers = false
        }
      }
      if (ty == 3) {
        this.unattendedOthers = v == 15
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
      // 处理监护不当情形
      statusData.improperCare ? statusData.improperCare = statusData.improperCare[0] : delete statusData.improperCare

      const motherData = this.motherForm.getFieldsValue() // 父母及其他监护人信息：
      const fatherData = this.fatherForm.getFieldsValue()
      //  const otherManData = this.otherManForm.getFieldsValue()
      const otherManData = {}

      this.isvalidator = false
      if (fatherData.infoCase != '1') { // 完整 父亲
        this.fatherForm.setFieldsValue({
          uploadFileT: this.parentlistF.length == 0 ? null : 'yes'
        })
      }
      // 上传
      if (motherData.infoCase != '1') { // 完整 母亲
        this.motherForm.setFieldsValue({
          uploadFileT: this.parentlistM.length == 0 ? null : 'yes'
        })
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
      const orgData = this.OrgForm.getFieldsValue() /// 机构信息
      let DilemmaChildrenAllVo = {}
      const leftOverSupportAdviseVo = {} // 建议
      let leftOverUnitVo = {} // 机构
      const leftOverParentsVoList = [] // 监护人
      let childBaseInformationVo = {} // 基本信息
      let leftOverChildVo = {} // 留守儿童

      const FMOM = await this.validateLots(motherData)
      const FMOF = await this.validateLots(fatherData)
      // const FMOO = await this.validateLots(otherManData)
      // teb3
      if (val != 's') {
        if (FMOM) {
          await this.motherForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '2'
              this.setHeight('ktone', 'ktoneout')
              isPass = false
            }
          })
        }
        if (FMOF) {
          await this.fatherForm.validateFields((err, values) => {
            if (err) {
              this.nowkey = '2'
              this.setHeight('ktone', 'ktoneout')
              isPass = false
            }
          })
        }
        // if (FMOO) {
        //   await this.otherManForm.validateFields((err, values) => {
        //     if (err) {
        //       this.nowkey = '3'
        //       this.setHeight('kttwo', 'kttwoout')
        //       isPass = false
        //     }
        //   })
        // }
        await this.OrgForm.validateFields((err, values) => {
          if (err) {
            this.nowkey = '4'
            this.setHeight('ktthree', 'ktthreeout')
            isPass = false
          }
        })
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
        leftOverChildVo = { ...baseData, ...heathData, ...statusData }
        baseData.adisCondition = heathData.adisCondition
        baseData.adisConditionOther = heathData.adisConditionOther
        childBaseInformationVo = baseData
        // leftOverSupportAdviseVo = suggestData
        leftOverUnitVo = orgData
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
          otherGuardianReason = otherGuardianReason.substring(0, otherGuardianReason.length - 1)
        }
        otherManData.otherGuardianReason = otherGuardianReason
        leftOverParentsVoList.push(fatherData, motherData, otherManData)
        const improperCareChildVo = leftOverChildVo
        const improperCareUnitVo = leftOverUnitVo
        const improperCareParentsVoList = leftOverParentsVoList
        DilemmaChildrenAllVo = {
          improperCareChildVo,
          childBaseInformationVo,
          improperCareUnitVo,
          improperCareParentsVoList
        }
        DilemmaChildrenAllVo.improperCareParentsVoList[0].parentType = 1
        DilemmaChildrenAllVo.improperCareParentsVoList[1].parentType = 2
        DilemmaChildrenAllVo.improperCareParentsVoList[2].parentType = 3
        let urls = '/improperCareChildApi/saveOrUpdate'
        DilemmaChildrenAllVo.childBaseInformationVo.id = this.childId
        if (this.bj) {
          DilemmaChildrenAllVo.childBaseInformationVo.id = this.childId ? this.childId : this.childBaseInformationVoId

          DilemmaChildrenAllVo.improperCareChildVo.id = this.difficultiesChildrenVoId
          DilemmaChildrenAllVo.improperCareChildVo.childId = this.difficultiesChildrenVoChildId

          DilemmaChildrenAllVo.improperCareUnitVo.improperCareChildId = this.troubledUnitVoTroubleChildId
          DilemmaChildrenAllVo.improperCareUnitVo.id = this.troubledUnitVoId

          DilemmaChildrenAllVo.improperCareParentsVoList[0].id = this.fatherId
          DilemmaChildrenAllVo.improperCareParentsVoList[0].parentsId = this.fatherParentsId
          DilemmaChildrenAllVo.improperCareParentsVoList[0].improperCareChildId = this.fatherTroubleChildId

          DilemmaChildrenAllVo.improperCareParentsVoList[2].id = this.otherManDataId
          DilemmaChildrenAllVo.improperCareParentsVoList[2].parentsId = this.otherManDataParentsId
          DilemmaChildrenAllVo.improperCareParentsVoList[2].improperCareChildId = this.otherManDataTroubleChildId

          DilemmaChildrenAllVo.improperCareParentsVoList[1].id = this.motherDataId
          DilemmaChildrenAllVo.improperCareParentsVoList[1].parentsId = this.motherDataParentsId
          DilemmaChildrenAllVo.improperCareParentsVoList[1].improperCareChildId = this.motherDataTroubleChildId
        } else { }
        if (this.saveUrl) {
          urls = this.saveUrl
        }
        // 0   暂存， 1   保存
        if (val == 's') {
          urls = '/improperCareChildApi/tssaveOrUpdate'
          DilemmaChildrenAllVo.state = 0
        } else {
          DilemmaChildrenAllVo.state = 1
        }
        const ImproperCareChildAllVo = DilemmaChildrenAllVo
        const res = await this.post(urls, ImproperCareChildAllVo, true)
        if (!res.errors) {
          this.loadData()
          if (this.jump) {
            this.backs()
          }
        }
      } else {
        if (val == 's') {
          this.$message.error('界面中至少填写儿童姓名，暂存失败')
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
      this.setHeight('ktone', 'ktoneout')
      // this.setHeight('kttwo', 'kttwoout')
      this.setHeight('ktthree', 'ktthreeout')
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
    // showkttwo (val) {
    //   this.setHeight('kttwo', 'kttwoout', !val)
    // },
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
