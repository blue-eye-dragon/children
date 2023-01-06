<template>
  <div class="conts tadrawer"
       @click="allvalidator">
    <!-- 多余信息查看 -->
    <div class="rejectcont"
         v-if="status == 6">
      <ta-form class="drawerFrom"
               :autoFormCreate="
          (detailform) => {
            this.detailform = detailform;
          }
        "
               layout="horizontal">
        <ta-row>
          <ta-col :span="16"
                  v-if="currentStatus == 4">
            <ta-form-item label="驳回原因"
                          fieldDecoratorId="remark"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }">
              <ta-textarea placeholder="请输入驳回原因"
                           :rows="4"
                           :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="上报日期"
                          fieldDecoratorId="createTime"
                          v-if="currentStatus == 3 || currentStatus == 1">
              <ta-date-picker style="width: 100%"
                              format="YYYY-MM-DD"
                              :disabled="true"
                              placeholder="请选择上报日期" />
            </ta-form-item>
            <ta-form-item label="审核日期"
                          fieldDecoratorId="updateTime"
                          v-if="currentStatus == 3">
              <ta-date-picker style="width: 100%"
                              format="YYYY-MM-DD"
                              :disabled="true"
                              placeholder="请选择审核日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="上报单位"
                          fieldDecoratorId="reportUnit"
                          v-if="currentStatus == 3 || currentStatus == 1">
              <ta-input placeholder="请输入上报单位"
                        :disabled="true" />
            </ta-form-item>
            <ta-form-item label="审核单位"
                          fieldDecoratorId="approvalUnit"
                          v-if="currentStatus == 3">
              <ta-input placeholder="请输入审核单位"
                        :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="contin">
      <!-- <div v-if="isOtherAdd == '12'"
           style="font-size: 20px;text-align: center;">{{isAnotherPlaceApply=='2'?'此儿童为公众服务平台上报':'此儿童为异地申请'}}</div> -->
      <ta-form layout="horizontal"
               v-show="type != 'add'&&isLocal"
               :autoFormCreate="(form)=>{this.topInfoForm = form}">
        <ta-row ref="one"
                class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="数据来源"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="currentStatus">
                <span class="lineHeight"
                      v-if="isAnotherPlaceApply=='0'">本地申请</span>
                <span class="lineHeight"
                      v-if="isAnotherPlaceApply=='1'">异地申请</span>
                <span class="lineHeight"
                      v-if="isAnotherPlaceApply=='2'">公众服务平台申请</span>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item :label="isAnotherPlaceApply=='0'?'上报日期':'申请日期'"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="applicationTime">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='0'">
              <ta-form-item label="上报单位"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="reportUnit">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12"
                    v-if="isAnotherPlaceApply=='1'">
              <ta-form-item label="受理地"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:16}"
                            class="form-item-applyUnit"
                            fieldDecoratorId="applyUnit">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='2'">
              <ta-form-item label="申请人"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="applyPerson">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='2'">
              <ta-form-item label="申请人手机号"
                            :labelCol="{span:8}"
                            :wrapperCol="{span:16}"
                            fieldDecoratorId="applyPhone">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
      <ta-form :autoFormCreate="(form) => {this.form = form;}"
               layout="horizontal">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="儿童类别"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-input :disabled="true"
                          v-model="childtypename" />
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
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
                     :autoFormCreate="
                (baseForm) => {
                  this.baseForm = baseForm;
                }
              ">
              <Nochildbasic :idcarddisabled="idcarddisabled"
                            :justEdit="justEdit"
                            :id="id"
                            :thisP="this"
                            :isOnlyShow="isOnlyShow"
                            :oldIdCard="oldIdCard"
                            :isOther="isOtherAdd == '12'"
                            :householdRegistryClassifyhide.sync="householdRegistryClassifyhide"
                            :householdRegistryClassifydisabled.sync="householdRegistryClassifydisabled"
                            :imageUrl.sync="imageUrl"
                            :delVisible="delVisible"
                            :disabled="disabled"
                            :imglist.sync="imglist"
                            @householdRegistryClassifychange="householdRegistryClassifychange"
                            @sendDataToRecipient="sendDataToRecipient"
                            @changeaddress="changeaddress"
                            @radiochange="radiochange"
                            @likeaddress="likeaddress"
                            @setValueByIdCard="setValueByIdCard"
                            @callbackByIdCard="callbackByIdCards"
                            :addressChildModel="addressChildModel"
                            :addressChildModelNow="addressChildModelNow"
                            :heathChildModel="heathChildModel"
                            @clearAddress="clearAddress"
                            @setChildAddress="setChildAddress"
                            @setChildAddress1="setChildAddress1"
                            @setChildHeaths="setChildHeaths"
                            @computeEndTime="computeEndTime"
                            :isOffSite="isOffSite"
                            :isWshEdit="isWshEdit"
                            ref="baseForm"></Nochildbasic>
            </ta-form>
          </div>
          <div ref="twoout"
               class="mars">
            <Title title="儿童健康状况"
                   :show.sync="showtwo"></Title>
            <ta-form ref="two"
                     layout="horizontal"
                     :autoFormCreate="
                (heathForm) => {
                  this.heathForm = heathForm;
                }
              ">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-form-item label="健康状况"
                                fieldDecoratorId="healthStatus"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 22 }"
                                :fieldDecoratorOptions="rules.healthStatus">
                    <ta-radio-group @change="onChange"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item, index) in heathlist"
                                :key="index">{{ item.label }}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item v-if="heathval == Enum.HEALTHSTATUS.OTHER"
                                label="其他"
                                fieldDecoratorId="healthStatusOther"
                                :labelCol="{ span: 3 }"
                                :wrapperCol="{ span: 9 }"
                                :fieldDecoratorOptions="rules.healthStatusOther">
                    <ta-input :disabled="disabled"
                              maxlength="50"
                              placeholder="请输入其他情况" />
                  </ta-form-item>
                  <div class="canji"
                       v-if="heathval == Enum.HEALTHSTATUS.DISABILITY">
                    <ta-form-item label="残疾类型"
                                  fieldDecoratorId="disabledType"
                                  :labelCol="{ span: 2 }"
                                  :wrapperCol="{ span: 22 }"
                                  :initValue="[]"
                                  :require="{ message: '请选择残疾类型' }">
                      <ta-checkbox-group :options="disabiliytypelist"
                                         @change="setMulti"
                                         :disabled="disabled"
                                         :values="disabilityTypeValues" />
                    </ta-form-item>
                    <ta-form-item label="残疾等级"
                                  fieldDecoratorId="disabledLevel"
                                  :labelCol="{ span: 2 }"
                                  :wrapperCol="{ span: 22 }">
                      <ta-radio-group :disabled="disabled">
                        <ta-radio :value="item.value"
                                  v-for="(item, index) in canjileave"
                                  :key="index">{{ item.label }}</ta-radio>
                      </ta-radio-group>
                      <ta-radio-group style="float: left"></ta-radio-group>
                    </ta-form-item>
                  </div>
                  <!--重病-->
                  <div class="canji"
                       v-if="heathval == Enum.HEALTHSTATUS.SERIOUSILLNESS">
                    <ta-form-item label="重病"
                                  fieldDecoratorId="disabledType"
                                  :labelCol="{ span: 2 }"
                                  :wrapperCol="{ span: 22 }"
                                  :initValue="[]"
                                  :require="{ message: '请选择重病!' }">
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
                                placeholder="请输入其他情况" />
                    </ta-form-item>
                  </div>
                  <!--慢性病-->
                  <div class="canji"
                       v-if="heathval == Enum.HEALTHSTATUS.CHRONICDISEASE">
                    <ta-form-item label="慢性病"
                                  fieldDecoratorId="disabledType"
                                  :labelCol="{ span: 2 }"
                                  :wrapperCol="{ span: 22 }"
                                  :initValue="[]"
                                  :require="{ message: '请选择慢性病!' }">
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
                                placeholder="请输入其他情况" />
                    </ta-form-item>
                  </div>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
          <div ref="threeout"
               class="mars">
            <Title title="生活状况"
                   :show.sync="showthree"></Title>
            <ta-form ref="three"
                     layout="horizontal"
                     :autoFormCreate="
                (statusForm) => {
                  this.statusForm = statusForm;
                }
              ">
              <ta-row class="fromcom">
                <ta-col :span="24">
                  <ta-form-item label="学业状况"
                                fieldDecoratorId="academicStatus"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 22 }"
                                :fieldDecoratorOptions="rules.academicStatus">
                    <ta-radio-group @change="xyChange"
                                    :disabled="disabled">
                      <ta-radio :value="item.value"
                                v-for="(item, index) in xystatus"
                                :key="index">{{ item.label }}</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>
                  <ta-form-item label="其他"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 22 }"
                                v-if="xyval == Enum.SCHOOLWORK.OTHER"
                                fieldDecoratorId="academicStatusOther"
                                :fieldDecoratorOptions="rules.academicStatusOther">
                    <ta-input :disabled="disabled"
                              maxlength="50"
                              placeholder="请输入其他"
                              type="text" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item v-if="disabledG"
                                label="就学情况"
                                fieldDecoratorId="goSchoolStatus"
                                key="goSchoolStatus"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 20 }"
                                :fieldDecoratorOptions="rules.goSchoolStatus">
                    <ta-select allowClear
                               :disabled="disabled ? true : goSchoolStatusDisabled"
                               :placeholder="
                        (disabled ? true : goSchoolStatusDisabled)
                          ? ''
                          : '请选择就学情况'
                      ">
                      <ta-select-option v-for="item in schoolingList"
                                        :disabled="
                          !goSchoolStatusDisabled
                            ? item.value == Enum.DEGREEEDUCATION.XLQ
                            : false
                        "
                                        :key="item.value"
                                        :value="item.value">{{ item.label }}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item v-if="!disabledE"
                                label="就业情况"
                                key="employmentStatus"
                                :labelCol="{ span: 4 }"
                                :wrapperCol="{ span: 20 }"
                                fieldDecoratorId="employmentStatus">
                    <ta-select allowClear
                               :disabled="disabled"
                               :placeholder="disabled ? '' : '请选择就业情况'">
                      <ta-select-option v-for="item in employmentlist"
                                        :key="item.value"
                                        :value="item.value">{{ item.label }}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="生活状况概述"
                                key="statusoverview"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 22 }"
                                fieldDecoratorId="statusoverview"
                                :fieldDecoratorOptions="rules.statusoverview">
                    <ta-textarea placeholder="请简要描述儿童目前生活状况，200字以内"
                                 :rows="4"
                                 :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="父母信息"
                     key="2"
                     :forceRender="true">
          <ta-row ref="ktone">
            <ta-col :span="11">
              <ta-form layout="horizontal"
                       :autoFormCreate="
                  (fatherForm) => {
                    this.fatherForm = fatherForm;
                  }
                ">
                <Parentsituation types="1"
                                 :showOverTime="showOverTimeF"
                                 :thisP="this"
                                 @idCardValid="idCardValid"
                                 :validateStatus.sync="validateStatus"
                                 :parentlist.sync="parentlist"
                                 :updataparent="updataparent"
                                 @ismanChange="ismanChange"
                                 :iscomplete.sync="iscomplete"
                                 @zkChange="zkChange"
                                 @changeRequire="changeRequire"
                                 :isphonerule.sync="isphonerule"
                                 @sendDataToRecipient="sendDataToRecipient"
                                 :disabled="disabled"
                                 :zkval="zkval"
                                 @idCardTypeValue="idCardTypeValue"
                                 :isman.sync="isman"
                                 :isrequired.sync="isrequired"
                                 :idCardTypeList="idCardTypeList"
                                 ref="fatherForm"
                                 :isGuardiandisabled="isGuardiandisabled"></Parentsituation>
              </ta-form>
            </ta-col>
            <ta-col :span="11"
                    :offset="1">
              <ta-form layout="horizontal"
                       :autoFormCreate="
                  (motherForm) => {
                    this.motherForm = motherForm;
                  }
                ">
                <Parentsituation :validateStatus.sync="validateStatus1"
                                 :isrequired.sync="isrequired1"
                                 @idCardValid="idCardValid"
                                 @ismanChange="ismanChange"
                                 :parentlist.sync="parentlist1"
                                 :updataparent="updataparent1"
                                 :iscomplete.sync="iscomplete1"
                                 @changeRequire="changeRequire"
                                 :isman.sync="isman"
                                 types="2"
                                 :showOverTime="showOverTimeM"
                                 :thisP="this"
                                 @idCardTypeValue="idCardTypeValue"
                                 :disabled="disabled"
                                 @zkChange="zkChange"
                                 :isphonerule.sync="isphonerule1"
                                 @sendDataToRecipient="sendDataToRecipient"
                                 :zkval="zkval1"
                                 :idCardTypeList="idCardTypeList"
                                 ref="motherForm"
                                 :isGuardiandisabled="isGuardiandisabled1"></Parentsituation>
              </ta-form>
            </ta-col>
          </ta-row>
        </ta-tab-pane>
        <ta-tab-pane tab="其他监护人信息"
                     key="4"
                     :forceRender="true">
          <ta-row ref="kttwo">
            <ta-col :span="11">
              <ta-form layout="horizontal"
                       :autoFormCreate="
                  (manForm) => {
                    this.manForm = manForm;
                  }
                ">
                <Guardian types="1"
                          :isphonerule="isphonerule"
                          :isphonerule1="isphonerule1"
                          @idCardValid="idCardValid"
                          @idCardTypeValue="idCardTypeValue"
                          :idCardValueAttr="idCardValueAttr"
                          :idCardNameAttr="idCardNameAttr"
                          :disabled="disabled"
                          :relationshiphide.sync="relationshiphide"
                          :idCardTypeList="idCardTypeList"
                          ref="manForm"></Guardian>
              </ta-form>
            </ta-col>
            <ta-col :span="11"
                    :offset="1">
              <ta-form layout="horizontal"
                       :autoFormCreate="
                  (womanForm) => {
                    this.womanForm = womanForm;
                  }
                ">
                <Guardian types="2"
                          :isphonerule="isphonerule"
                          :isphonerule1="isphonerule1"
                          @idCardValid="idCardValid"
                          @idCardTypeValue="idCardTypeValue"
                          :disabled="disabled"
                          :relationshiphide.sync="relationshiphide1"
                          :idCardTypeList="idCardTypeList"
                          ref="womanForm"></Guardian>
              </ta-form>
            </ta-col>
          </ta-row>
        </ta-tab-pane>
        <ta-tab-pane tab="社会关系信息"
                     key="5"
                     :forceRender="true">
          <Othersocialrelations ref="ktthree"
                                @pagechange="pagechange"
                                :disabled="disabled"
                                @chaadoptorChildrenVos="chaadoptorChildrenVos"
                                :idCardTypeList="idCardTypeList"
                                :adoptorChildrenVos.sync="adoptorChildrenVos"></Othersocialrelations>
        </ta-tab-pane>
        <ta-tab-pane tab="帮扶建议"
                     key="3"
                     :forceRender="true">
          <div ref="khoneout"
               class="mars">
            <Title title="基本生活补贴发放情况"
                   :show.sync="showkhone"></Title>
            <ta-form ref="khone"
                     layout="horizontal"
                     :autoFormCreate="
                (baselifeForm) => {
                  this.baselifeForm = baselifeForm;
                }
              ">
              <Paymentexpenses :controMustTip="controMustTip"
                               :hasSecurityMoney="hasSecurityMoney"
                               :isshow="false"
                               :isOther="isOtherAdd == '12'"
                               :controMustTip2="controMustTip2"
                               @controMustTipChange="controMustTipChange"
                               :disabled="justEdit?true:disabled"
                               :iswelfare="iswelfare"
                               @idCardValid="idCardValid"
                               @idCardTypeValue="idCardTypeValue"
                               @sendDataToRecipient="sendDataToRecipient"
                               @sendAllToRecipient="sendAllToRecipient"
                               :ishide.sync="ishide"
                               :birthDate="birthDate"
                               @relevechange="relevechange"
                               :receiverToChildRelationhide.sync="receiverToChildRelationhide"
                               :idCardTypeList="idCardTypeList"
                               :isOffSite="isOffSite"
                               @computeEndTime="computeEndTime"
                               :isInfoMaintain="isInfoMaintain"
                               ref="baselifeForm"></Paymentexpenses>
              <div>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />基本生活费补贴自儿童资格认定审核通过后次月开始享受，若儿童户籍所在地乡镇录入了起领年月、末领年月信息，最终以录入信息为准。
                </p>
              </div>
            </ta-form>
          </div>
          <div ref="khtwoout"
               class="mars">
            <Title title="其他救助"
                   :show.sync="showkhtwo"></Title>
            <ta-form ref="khtwo"
                     layout="horizontal"
                     :autoFormCreate="
                (otherhelpForm) => {
                  this.otherhelpForm = otherhelpForm;
                }
              ">
              <ta-row>
                <ta-col :span="24">
                  <ta-form-item label="救助措施"
                                fieldDecoratorId="helpMeasure"
                                :require="{ message: '请选择救助措施' }"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 18 }"
                                :initValue="[]">
                    <ta-checkbox-group :options="measureslist"
                                       :disabled="disabled"
                                       @change="helpMeasurechs" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="救助标准（元）"
                                v-if="isrescue"
                                fieldDecoratorId="helpStandard"
                                :fieldDecoratorOptions="{}"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{ span: 12 }">
                    <ta-input-number :min="0"
                                     :max="9999"
                                     :precision="2"
                                     :disabled="disabled"
                                     style="width: 100%"
                                     placeholder="请输入救助标准" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8">
                  <ta-form-item label="救助起始时间"
                                v-if="isrescue"
                                fieldDecoratorId="helpStartTime"
                                :labelCol="{ span: 7 }"
                                :wrapperCol="{ span: 12 }"
                                :fieldDecoratorOptions="{}">
                    <ta-date-picker style="width: 100%"
                                    :disabled="disabled"
                                    placeholder="请选择救助起始时间" />
                  </ta-form-item>
                </ta-col>

                <ta-col :span="24">
                  <ta-form-item label="救助情况"
                                v-if="isrescue"
                                :labelCol="{ span: 2 }"
                                :wrapperCol="{ span: 18 }"
                                fieldDecoratorId="helpStationOther"
                                :fieldDecoratorOptions="rules.helpStationOther">
                    <ta-textarea :placeholder="disabled ? '' : '请输入救助情况'"
                                 :rows="4"
                                 :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
          <div ref="khthreeout"
               class="mars">
            <Title title="相关证明"
                   :show.sync="showkhthree"></Title>
            <ta-form ref="khthree"
                     layout="horizontal"
                     :autoFormCreate="(form) => {this.proveForm = form}">
              <ta-row :key="timer">
                <ta-col :span="24">
                  <ta-col :span="8">
                    <ta-form-item label="儿童本人身份证（户口本）"
                                  fieldDecoratorId="childFileList"
                                  :labelCol="{ span: 11 }"
                                  :wrapperCol="{ span: 13 }"
                                  :fieldDecoratorOptions="{rules: [{ required: !isInfoMaintain&&!justEdit && householdRegistryClassifyhide, message: '请选择儿童本人身份证（户口本）'}]}">
                      <ta-upload :withCredentials="true"
                                 :multiple="true"
                                 name="file"
                                 :action="action"
                                 :data="{busiType: '50'}"
                                 :fileList="childFileList"
                                 @preview="handlePreview"
                                 :beforeUpload="beforeUpload"
                                 @change="handleChange($event,'child')">
                        <div>
                          <ta-button :disabled="disabled">
                            <ta-icon type="upload" />上传
                          </ta-button>
                        </div>
                      </ta-upload>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="8">
                    <ta-form-item label="父母情况证明"
                                  fieldDecoratorId="famFileList"
                                  :labelCol="{ span: 6 }"
                                  :wrapperCol="{ span: 18 }"
                                  :fieldDecoratorOptions="{rules: [{ required:!isInfoMaintain&&!justEdit, message: '请选择父母情况证明'}]}">
                      <ta-upload :withCredentials="true"
                                 :multiple="true"
                                 name="file"
                                 :action="action"
                                 :data="{busiType: '51'}"
                                 :fileList="famFileList"
                                 @preview="handlePreview"
                                 :beforeUpload="beforeUpload"
                                 @change="handleChange($event,'fam')">
                        <div>
                          <ta-button :disabled="disabled">
                            <ta-icon type="upload" />上传
                          </ta-button>
                        </div>
                      </ta-upload>
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="8">
                    <ta-form-item label="其他材料"
                                  :labelCol="{ span: 4 }"
                                  :wrapperCol="{ span: 20 }">
                      <ta-upload :withCredentials="true"
                                 :multiple="true"
                                 name="file"
                                 :action="action"
                                 :data="updata"
                                 :fileList="otherFileList"
                                 @preview="handlePreview"
                                 :beforeUpload="beforeUpload"
                                 @change="handleChange($event,'other')">
                        <div>
                          <ta-button :disabled="disabled">
                            <ta-icon type="upload" />上传
                          </ta-button>
                        </div>
                      </ta-upload>
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span="24">
                  <div class="warntextNew"
                       :style="{height: disabled?'80px':(isOffSite=='1'&&!disabled?'130px':'150px')}">
                    <p v-if="isOffSite!='1'&&!disabled">
                      <ta-icon type="info-circle-o"
                               class="icons" /> 请上传关于其父母重残、重病、服刑在押、强制隔离戒毒、被执行其他限制人身自由的措施、被撤销监护资格、被遣送（驱逐）出境的有关文书资料，父母失联提交的《儿童失联父母查找情况回执单》或《儿童失联父母查找情况回执单》。
                    </p>

                    <p v-if="isOffSite=='1'&&!disabled">
                      <ta-icon type="info-circle-o"
                               class="icons" />请根据儿童户籍地“跨省通办”业务办理要求，上传相关证明材料。相关证明材料说明可到【跨省通办证明材料说明】菜单下查看。
                    </p>
                    <p>
                      <ta-icon type="info-circle-o"
                               class="icons" />上传附件说明：上传附件支持jpg、jpeg、png、doc、docx、pdf格式，单个文件大小不能超过10M。如附件为图片，请确保图片内容清晰，建议拍摄工具像素在1000万以上，正面拍摄，拍摄尽量避免使用闪光灯，如需上传多张证明材料，请按照顺序依次上传。
                    </p>
                  </div>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="减员信息"
                     key="6"
                     v-if="tm"
                     :forceRender="true">
          <div class="item_title">
            <div class="lines"></div>
            <p class="item_text"
               style="width:120px">减员信息</p>
            <div class="horizontalline"></div>
          </div>
          <div class="margins">
            <ta-form layout="horizontal"
                     :autoFormCreate="(topForm)=>{this.topForm = topForm}">
              <ta-row class="fromcom">
                <ta-col :span='24'>
                  <ta-col :span="8">
                    <ta-form-item label="末领年月"
                                  :labelCol="{ span: 8 }"
                                  :wrapperCol="{ span: 16 }"
                                  fieldDecoratorId="endGetDate">
                      <ta-input :disabled="true"
                                placeholder=" " />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span='24'>
                  <ta-col :span='21'>
                    <ta-form-item label="退出原因"
                                  :labelCol="{ span: 3 }"
                                  :wrapperCol="{ span: 21 }"
                                  fieldDecoratorId="exitReason">
                      <ta-radio-group name="aa"
                                      :disabled="true">
                        <ta-radio v-for="(item ,index) in exitReasonList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-radio>
                      </ta-radio-group>
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col v-if="exitReasonOtherTip"
                        :span="8">
                  <ta-form-item label="其他"
                                fieldDecoratorId="exitReasonOther"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span:16}">
                    <ta-input :disabled="true"
                              placeholder=" " />
                  </ta-form-item>
                </ta-col>
                <ta-col :span='21'>
                  <ta-form-item label="附件上传"
                                :labelCol="{ span:  3}"
                                :wrapperCol="{ span: 9 }">
                    <ta-upload :withCredentials="true"
                               :multiple="true"
                               name="file"
                               :action="action"
                               :data="updataX"
                               :fileList="fileListX"
                               @preview="handlePreview"
                               :beforeUpload="beforeUpload"
                               @change="handleChangeX">
                      <div>
                        <ta-button :disabled="disabled">
                          <ta-icon type="upload" />上传
                        </ta-button>
                      </div>
                    </ta-upload>
                  </ta-form-item>

                  <ta-form-item label="备注"
                                :labelCol="{ span:3}"
                                :wrapperCol="{ span: 16 }"
                                fieldDecoratorId="remark">
                    <ta-textarea :disabled="true"
                                 :rows="3"
                                 placeholder=" " />
                  </ta-form-item>

                </ta-col>

              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="申请人/经办人信息"
                     key="7"
                     :forceRender="true">
          <div ref="peroneout"
               class="mars">
            <Title title="申请人信息"
                   :show.sync="showperone"></Title>
            <ta-form ref="perone"
                     layout="horizontal"
                     :autoFormCreate="(form) => {this.applicantForm = form;}">
              <Applicant :disabled="disabled"
                         @setaddress="setaddress"
                         @setBirthAndSex="setBirthAndSex"
                         :isChange="justEdit||isInfoMaintain"
                         :isSanju="true"
                         ref="applicant"></Applicant>
            </ta-form>
          </div>
          <div ref="pertwoout"
               class="mars">
            <Title title="经办人信息"
                   :show.sync="showpertwo"></Title>
            <ta-form ref="pertwo"
                     layout="horizontal"
                     :autoFormCreate="(form) => {this.agentForm = form;}">
              <ta-row>
                <ta-col :span="24">
                  <ta-col :span="8">
                    <ta-form-item label="办理人"
                                  fieldDecoratorId="agentPersonName"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{span:17}"
                                  :fieldDecoratorOptions="justEdit||isInfoMaintain?verificationRulesNotMustFill('办理人姓名',72):verificationRules('办理人姓名',72)">
                      <ta-input :disabled="disabled"
                                :placeholder="disabled?'':'请输入办理人姓名'" />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="8">
                    <ta-form-item label="办理人联系电话"
                                  fieldDecoratorId="agentPersonTel"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{span:17}"
                                  :fieldDecoratorOptions="justEdit||isInfoMaintain?verificationRulesNotMustFill('办理人联系电话', { type: 'phone' }):verificationRules('办理人联系电话', { type: 'phone' })">
                      <ta-input :disabled="disabled"
                                :placeholder="disabled?'':'请输入办理人联系电话'" />
                    </ta-form-item>
                  </ta-col>
                  <ta-col :span="8">
                    <ta-form-item label="办理机构"
                                  fieldDecoratorId="orgName"
                                  :labelCol="{ span: 7 }"
                                  :wrapperCol="{span:17}">
                      <ta-input :disabled="true" />
                    </ta-form-item>
                  </ta-col>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="bom">
      <template>
        <ta-button class="btnleft"
                   v-if="isFromSearch"
                   @click="backsSearch">返回</ta-button>
        <ta-button class="btnleft"
                   v-if="!isFromSearch"
                   @click="backs">返回</ta-button>
      </template>
      <template v-if="(status == 1 && !disabled)||yes">
        <ta-button v-if="clickSourceType!='continue'"
                   class="btnleft temporarystorage"
                   type="primary"
                   @click="submit('0')">暂存</ta-button>
        <ta-button class="btnleft"
                   type="primary"
                   @click="submit('1')">提交</ta-button>
      </template>
      <template v-if="status == 2 && (currentStatus == 1 || currentStatus == 0)">
        <ta-button class="btnleft"
                   @click="reject"
                   type="danger">驳回</ta-button>
        <ta-button class="btnleft successbtn"
                   @click="adopt">通过</ta-button>
      </template>
      <template v-if="status == 3">
        <ta-button class="btnleft"
                   @click="withdraw"
                   type="danger">撤回</ta-button>
      </template>
      <ta-button class="btnleft"
                 v-if="status == 4"
                 type="primary"
                 @click="submit('2')">提交</ta-button>
    </div>
    <ta-drawer title="驳回原因"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px); overflow: 'auto'; paddingbottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="
          (rejectform) => {
            this.rejectform = rejectform;
          }
        "
               layout="horizontal">
        <ta-form-item label="驳回原因"
                      fieldDecoratorId="remark"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.remark">
          <ta-textarea placeholder="请输入驳回原因"
                       :rows="4" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="rejectbtn"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import Nochildbasic from '../components/nochildbasic'
import Parentsituation from '../components/parentsituation'
import Guardian from '../components/guardian'
import Othersocialrelations from '../components/othersocialrelations'
import Paymentexpenses from '../components/paymentexpenses'
import Applicant from '../components/applicantInfo'
import moment from 'moment'
import Title from '@component/common/components/Title'
export default {
  components: {
    Nochildbasic,
    Title,
    Parentsituation,
    Guardian,
    Othersocialrelations,
    Paymentexpenses,
    Applicant
  },
  data () {
    return {
      exitReasonOtherTip: false,
      childTypeList: [],
      exitReasonList: [],
      tm: false,
      showOverTimeF: '',
      showOverTimeM: '',
      disabilityTypeValues: [], // 残疾类别选择的数据
      controMustTip: true,
      controMustTip2: false,
      nowData: null,
      // 儿童地址与健康状况
      addressChildModel: [],
      addressChildModelNow: [],
      heathChildModel: [],
      // 其他监护人地址与健康状况
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
      canjileave: [],
      schoolingList: [],
      employmentlist: [],
      heathval: '0',
      xystatus: [],
      xyval: '0',
      childrenType: [],
      showktone: true,
      showkttwo: true,
      iscanshow: true,
      showkhtwo: true,
      showkhthree: true,
      showkhone: true,
      showperone: true, // 申请人
      showpertwo: true, // 经办人
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
        helpMeasure: this.verificationRules('救助措施')
      },
      issameaddress: '0',
      status: '',
      imglist: [],
      zkval: '',
      zkval1: '',
      id: '',
      visible: false,
      isOtherRedit: false,
      exportid: '',
      ishide: true,
      currentStatus: '0',
      updata: {
        functionalType: '1',
        busiType: '48'
      },
      updataX: {
        functionalType: '2',
        busiType: '49'
      },
      fileListX: [],
      iswelfare: false,
      childFileList: [], // 儿童本人身份证（户口本）-帮扶建议
      famFileList: [], // 父母情况证明-帮扶建议
      otherFileList: [], // 其他材料-帮扶建议
      imageUrl: '',
      relationshiphide: false,
      relationshiphide1: false,
      householdRegistryClassifydisabled: false,
      receiverToChildRelationhide: false,
      resData: {},
      householdRegistryClassifyhide: true,
      serioushval: false,
      isman: [],
      isrequired: true,
      isrequired1: true,
      codelist: [],
      idcarddisabled: false,
      childtype: '03',
      childtypename: '事实无人抚养儿童',
      isbackhide: false,
      childtypedisabled: false,
      disabledE: true,
      disabledG: true,
      goSchoolStatusDisabled: false, // 就学情况的只读

      idCardValueAttr: [], // 存放各tab页输入的身份证号
      idCardNameAttr: [], // 存放各tab页输入的身份证号信息
      oldIdCard: null, // 进入编辑时的身份证号
      childId: '', // 存放儿童身份证号验重时带出来的儿童id
      backData: '',
      isvalidator: false, // 提交时不验证
      yes: false,
      isreject: false,
      idCardTypeList: [],
      isGuardiandisabled: false,
      isGuardiandisabled1: false,
      isphonerule: false,
      isphonerule1: false,
      iscomplete1: true,
      iscomplete: true,
      parentlist1: [],
      parentlist: [],
      delVisible: false,

      updataparent: {
        functionalType: '1',
        busiType: '53'
      },
      updataparent1: {
        functionalType: '1',
        busiType: '54'
      },
      measureslist: [],
      isrescue: false,
      validateStatus1: 'success',
      validateStatus: 'success',
      justEdit: false, // 变更的直接修改
      isOtherAdd: '', // 异地新增传值
      isOtherEdit: '', // 异地新增传值
      isAnotherPlaceApply: '', // 是否异地
      isOnlyShow: false,
      isFromSearch: false,
      formDataSearch: {},
      birthDate: '',
      type: '',
      isLocal: false, // 是否显示数据来源等（当前登录用户区划和申请单位不相等时需要展示）
      isOffSite: false, // 是否是从异地菜单进来的
      clickSourceType: '', // 点击的按钮类别：continue继续办理
      hasSecurityMoney: true, // 保障金额是否有值
      isInfoMaintain: false, // 是否是从基础信息维护菜单进来的
      minsize: 1, // 单个文件的最小限制
      maxsize: 10, // 单个文件的最大限制
      userInfo: window.parent.indexTool.getUserInfo(), // 当前用户信息
      businessId: null, // 申请人/经办人编辑所需的字段
      timer: '', // 儿童基本信息附件的key
      isWshEdit: false // 是从未审核的编辑跳转过来的
    }
  },
  activated () {
    // 重置儿童基本信息附件的key 防止共用时出现问题
    this.timer = new Date().getTime()
    this.justEdit = !!this.$route.query.justEdit
    this.isInfoMaintain = !!this.$route.query.isInfoMaintain
    this.tm = this.$route.query.tm
    this.isWshEdit = this.$route.query.isWshEdit
    this.isOtherRedit = this.$route.query.isOtherRedit
    this.isLocal = false
    this.id = null
    this.disabilityTypeValues = []
    this.type = this.$route.query.type
    this.isOffSite = this.$route.query.isOffSite == 1
    const yes = this.$route.query.holle ? this.$route.query.holle : null
    const orgType = this.userInfo.orgType
    this.iswelfare = orgType == '99'
    this.isreject = this.$route.query.isreject
    this.yes = yes == 'yes'
    this.getchildType()
    this.loadData()
    this.getdefaultads()
    this.status = this.$route.query.status
    this.backData = this.$route.query.backData
    this.clickSourceType = this.$route.query.clickSourceType
    if (this.$route.query.currentStatus) {
      this.currentStatus = this.$route.query.currentStatus
    }
    if (this.$route.query.isOtherAdd) {
      this.isOtherAdd = this.$route.query.isOtherAdd
    }
    if (this.$route.query.isOtherEdit) {
      this.isOtherEdit = this.$route.query.isOtherEdit
    }
    // 查看详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getDetails()
    }
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    // 导入查看详情
    if (this.$route.query.exportid) {
      this.id = this.$route.query.exportid
      this.getexportDetails()
    }
    // exportid
    this.disabled = !!this.$route.query.isdisabled
    this.childtypedisabled = !!this.$route.query.childtypedisabled
    this.idcarddisabled = !!this.$route.query.isdisabled
    // this.householdRegistryClassifydisabled = !!this.$route.query.isdisabled
    this.isGuardiandisabled = !!this.$route.query.isdisabled
    this.isGuardiandisabled1 = !!this.$route.query.isdisabled
    if (this.$route.query.isadd) {
      this.getChildNum()
      this.isbackhide = false
      // 是否展示儿童基本信息中的条件模块（确认艾滋病感染时间、其他情况、其他途径等）
      this.$refs.baseForm.ifDatasProcess(null, 'add')
    } else {
      this.isbackhide = true
    }
    if (this.$route.query.childrenFrom) {
      const childrenFrom = JSON.parse(this.$route.query.childrenFrom)
      this.getDetails(childrenFrom)
    }

    setTimeout(() => {
      this.setHeight('one', 'oneout')
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
    },
    showkhone (val) {
      this.setHeight('khone', 'khoneout', !val)
    },
    showkhtwo (val) {
      this.setHeight('khtwo', 'khtwoout', !val)
    },
    showkhthree (val) {
      this.setHeight('khthree', 'khthreeout', !val)
    },
    showperone (val) {
      this.setHeight('perone', 'peroneout', !val)
    },
    showpertwo (val) {
      this.setHeight('pertwo', 'pertwoout', !val)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.getexitReason()
    this.getChildTypeList()
    this.getnation()
    this.getleave()
    this.getxystatus()
    this.getschooling()
    this.getemployment()
    this.getidCardTypeList()
    this.getehelpMeasure()
    this.isvalidator = false
    this.$refs.manForm.isvalidator = false
    this.$refs.womanForm.isvalidator = false
    this.$refs.fatherForm.isvalidator = false
    this.$refs.motherForm.isvalidator = false
    this.$refs.baselifeForm.isvalidator = false
  },
  methods: {
    // 清除户籍地
    clearAddress () {
      this.$nextTick(() => {
        this.addressChildModel = []
        this.baseForm.setFieldsValue({
          censusRegisterp: []
        })
      })
    },
    // 根据身份证号设置出生日期和性别-申请人/经办人信息
    setBirthAndSex (sex, birth) {
      this.applicantForm.setFieldsValue({
        sex: sex,
        birthday: birth
      })
    },
    // 申请人户籍地/现住址赋值
    setaddress (filedName, fieldValue) {
      this.applicantForm.setFieldsValue({
        [filedName]: fieldValue
      })
    },
    // 同步数据
    sendDataToRecipient (name, setFormName, getFormName, val) {
      const baselifeForm = this.baselifeForm.getFieldsValue()
      const fatherFlag = baselifeForm.receiverToChildRelation == this.Enum.RELATION.FQ
      const motherFlag = baselifeForm.receiverToChildRelation == this.Enum.RELATION.MQ
      const childFlag = baselifeForm.receiverToChildRelation == this.Enum.RELATION.BR

      // 领取人关系为父亲或母亲或本人时才进行赋值
      if (fatherFlag && getFormName == 'fatherForm' || motherFlag && getFormName == 'motherForm' || childFlag && getFormName == 'baseForm' || getFormName == 'baselifeForm') {
        if (childFlag && getFormName == 'baseForm' && name == 'idCard' && baselifeForm.memberIdType != this.Enum.IDCARD_TYPE.NDJMSFZ) {
          return false
        }
        const key = name == 'name' ? 'receiverName' : (name == 'receiverName' ? 'name' : name)
        const value = val || this[getFormName].getFieldsValue()[name]
        setFormName = !setFormName && fatherFlag ? 'fatherForm' : (!setFormName && motherFlag ? 'motherForm' : (!setFormName && childFlag ? 'baseForm' : setFormName))
        if (setFormName) {
          this[setFormName].setFieldsValue({
            [key]: value
          })
        }
      }
    },
    // 领取人关系切换为父母亲或本人时同步父母亲或本人数据到领取人
    sendAllToRecipient (formName) {
      const formData = this[formName].getFieldsValue()
      this.baselifeForm.setFieldsValue({
        receiverName: formData.name,
        contactNumber: formName == 'baseForm' ? '' : formData.contactNumber,
        memberIdType: formName == 'baseForm' ? this.Enum.IDCARD_TYPE.NDJMSFZ : formData.memberIdType,
        idCard: formData.idCard
      })
    },
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

    // 退出原因
    async getexitReason () {
      const data = await this.getDictionaries('EXITREASON')
      this.exitReasonList = data
    },
    controMustTipChange (v, t) {
      if (t == 0) {
        if (v == 0) {
          this.controMustTip = true // 全
        } else {
          this.controMustTip = false
          this.baselifeForm.resetFields()
          this.baselifeForm.setFieldsValue({
            memberIdType: '01',
            receiveWay: ['2']
          })
          this.relevechange(true)
        }
      } else {
        if (v == 0) {
          this.controMustTip2 = true // 不显示
          this.baselifeForm.resetFields()
          this.relevechange(true)
        } else {
          this.controMustTip2 = false // 全
        }
      }
    },
    helpMeasurechs (v) {
      if (v[v.length - 1] == '5') {
        v = ['5']
        this.$nextTick(() => {
          this.otherhelpForm.setFieldsValue({
            helpMeasure: v
          })
          this.isrescue = false
        })
      } else if (v[v.length - 1] != '5') {
        if (v[0] == 5) {
          v.shift()
        }

        this.$nextTick(() => {
          this.otherhelpForm.setFieldsValue({})
        })
        this.isrescue = true
      }

      this.$nextTick(() => {
        this.setHeight('khtwo', 'khtwoout')
      })
    },
    ismanChange (val) {
      const wherekey = val[val.length - 1]
      if (wherekey == 1) {
        this.motherForm.resetFields()
        this.showOverTimeM = ''
        this.isphonerule1 = true
        this.isGuardiandisabled1 = false
        this.iscomplete1 = true
        this.zkval1 = ''
      }
      if (wherekey == 2) {
        this.fatherForm.resetFields()
        this.showOverTimeF = ''
        this.isphonerule = true
        this.isGuardiandisabled = false
        this.iscomplete = true
        this.zkval = ''
      }
    },
    pagechange () { },
    godetail (val) {
      if (val == 5) {
        // 无人扶养
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1,
            childtype: this.childtype,
            isadd: 1
          }
        })
      } else if (val == 8) {
        // 留守
        this.$message.error('正在开发中，请稍后')
      } else if (val == 9) {
        // 困境
        this.$message.error('正在开发中，请稍后')
      } else {
        this.$router.push({
          name: 'orphansHandicapped'
        })
      }
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
      this.$refs.manForm.isvalidator = true
      this.$refs.womanForm.isvalidator = true
      this.$refs.motherForm.isvalidator = true
      this.$refs.fatherForm.isvalidator = true
      this.$refs.baselifeForm.isvalidator = true
    },
    childrenTypechange (val) {
      this.godetail(val)
    },
    likeaddress () {
      this.$nextTick(() => {
        const data = this.baseForm.getFieldsValue()
        if (data.sameAddress && data.sameAddress.length > 0) {
          const ads = data.censusRegisterp || []
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
            } else {
              this.setChildAddress1()
            }
          })
        }
      })
    },
    // 获取默认地址
    async getdefaultads () {
      const params = {
        areaCode: this.userInfo.areaId
      }
      const data = await this.post(
        '/UnattendedChildrenApi/getNamePathByAreaCode',
        params
      )
      if (data.data.data) {
        this.codelist = data.data.data.split('/')
      }
    },
    handlePreview (file) {
      const vm = this
      vm.downloadFile(file)
    },
    // 减员 相关证明-帮扶建议
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChangeX (info) {
      if (info.file.status === 'uploading') {
        this.fileListX = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileListX = info.fileList
      }
      if (info.file.status === 'done') {
        if (
          info.file.response.errors &&
          info.file.response.errors.length != 0
        ) {
          this.$message.error('上传失败')
          this.fileListX.splice(-1, 1)
          return false
        }
        this.fileListX = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    handleChange (info, type) {
      if (info.file.status === 'uploading') {
        this[`${type}FileList`] = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this[`${type}FileList`] = info.fileList
      }
      if (info.file.status === 'done') {
        if (
          info.file.response.errors &&
          info.file.response.errors.length != 0
        ) {
          this.$message.error('上传失败')
          this[`${type}FileList`].splice(-1, 1)
          return false
        }
        this[`${type}FileList`] = info.fileList
        this.$message.success('文件上传成功!')
        this.setHeight('khthree', 'khthreeout')
      }
    },
    async getexportDetails () {
      const params = {
        id: this.id
      }
      const resdata = await this.post(
        '/UnattendedChildrenApi/getUnattendedChildBaseInformationById',
        params
      )
      this.resdata = resdata
      if (!resdata.errors) {
        const data = resdata.data.data
        if (data.birthday) {
          data.birthday = moment(data.birthday)
        }
        if (
          data.householdRegistryClassify &&
          data.householdRegistryClassify ==
          this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
        ) {
          this.householdRegistryClassifyhide = false
          this.householdRegistryClassifydisabled = true
        }
        this.$nextTick(() => {
          if (data.censusRegisterPro) {
            this.addressChildModel.push(
              data.censusRegisterPro || '',
              data.censusRegisterCity || '',
              data.censusRegisterCounty || '',
              data.censusRegisterTown || ''
            )
            if (data.censusRegisterVillage) {
              this.addressChildModel.push(data.censusRegisterVillage)
            }
          }
          if (data.currentAddressPro) {
            this.addressChildModelNow.push(
              data.currentAddressPro,
              data.currentAddressCity,
              data.currentAddressCounty,
              data.currentAddressTown
            )
            if (data.currentAddressVillage) {
              this.addressChildModelNow.push(data.currentAddressVillage)
            }
          }
          this.baseForm.setFieldsValue(data)
        })
      }
    },
    zkChange (val, e) { // 6服刑7戒毒
      if (e == 1) {
        this.showOverTimeF = val

        this.zkval = val
        if (val == 1 || val == 2 || val == 5) {
          this.isGuardiandisabled = true
          this.isphonerule = false
          this.fatherForm.setFieldsValue({
            isGuardian: '0'
          })
        } else {
          this.isGuardiandisabled = false
        }
      } else {
        this.showOverTimeM = val
        this.zkval1 = val
        if (val == 1 || val == 2 || val == 5) {
          this.isGuardiandisabled1 = true
          this.isphonerule1 = false
          this.motherForm.setFieldsValue({
            isGuardian: '0'
          })
        } else {
          this.isGuardiandisabled1 = false
        }
      }
    },
    backs () {
      this.$router.go(-1)
    },
    radiochange () {
      this.setHeight('one', 'oneout')
    },
    // 驳回
    reject () {
      this.visible = true
      this.$nextTick(() => {
        this.rejectform.resetFields()
      })
    },
    // 撤回
    async withdraw () {
      this.$confirm({
        title: '确认撤回吗?',
        onOk: async () => {
          const params = {
            addUnattendedId: this.id
          }
          const data = this.post(
            '/AddUnattendedChildApi/withdrawUnattendedChild',
            params
          )
          if (!data.errors) {
            this.$message.success('撤回成功')
            this.backs()
          }
        },
        onCancel: () => { }
      })
    },
    // 通过
    async adopt () {
      const params = {
        addUnattendedId: this.id
      }
      const data = await this.post(
        '/AddUnattendedChildApi/agreeAuditUnattendedChild',
        params
      )
      if (!data.errors) {
        this.$message.success('审批通过')
        this.backs()
      }
    },
    async rejectbtn () {
      this.rejectform.validateFields(async (err, values) => {
        if (!err) {
          const params = {
            addUnattendedId: this.id,
            remark: this.rejectform.getFieldsValue().remark
          }
          const data = await this.post(
            '/AddUnattendedChildApi/rejectAuditUnattendedChild',
            params
          )
          if (!data.errors) {
            this.$message.success('驳回成功')
            this.backs()
          }
        }
      })
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
      this.isOtherAdd = ''
      this.isOtherEdit = ''
      this.clickSourceType = ''
      this.isAnotherPlaceApply = ''
      this.showOverTimeF = ''
      this.showOverTimeM = ''
      this.birthDate = ''
      this.isOnlyShow = false
      this.$refs.baselifeForm.isSelf = false
      this.$refs.baselifeForm.isSelf2 = false
      this.delVisible = false
      this.childId = null // 儿童身份证号
      // 清空判断身份证号重复的数组
      this.idCardValueAttr = []
      this.idCardNameAttr = []
      this.goSchoolStatusDisabled = false
      this.idcarddisabled = false
      this.codelist = []
      this.isrequired = true
      this.isrequired1 = true
      this.isman = []
      this.serioushval = false
      this.householdRegistryClassifydisabled = false
      this.householdRegistryClassifyhide = true
      this.resData = {}
      this.receiverToChildRelationhide = false
      this.relationshiphide = false
      this.relationshiphide1 = false
      this.imageUrl = 'static/img/defalimg.png'
      this.childFileList = []
      this.famFileList = []
      this.otherFileList = []
      this.currentStatus = '0'
      this.adoptorChildrenVos = []
      this.addressChildModel = []
      this.addressChildModelNow = []
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
      // 申请人信息初始化
      this.showperone = true
      this.showpertwo = true
      this.applicantForm.resetFields()
      // 经办人初始化值
      this.agentForm.resetFields()
      this.agentForm.setFieldsValue({
        agentPersonName: this.userInfo.userName,
        orgName: this.userInfo.orgName
      })

      this.baseForm.resetFields()
      this.heathForm.resetFields()
      this.statusForm.resetFields()
      this.fatherForm.resetFields()
      this.motherForm.resetFields()
      this.showkttwo = true
      this.manForm.resetFields()
      this.womanForm.resetFields()
      this.iscanshow = true
      this.showktthree = true
      this.showkhone = true
      this.baselifeForm.resetFields()
      this.baselifeForm.setFieldsValue({ receiveWay: ['2'] })
      this.showkhtwo = true
      this.otherhelpForm.resetFields()
      this.proveForm.resetFields()
      this.showkhthree = true
      this.heathForm.setFieldsValue({
        healthStatus: '10'
      })
      this.statusForm.setFieldsValue({
        academicStatus: '1'
      })

      const date = new Date()
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const dates = year + '-' + month + '-' + day
      this.nowData = moment(dates, 'YYYY-MM-DD')
      this.baseForm.setFieldsValue({
        nation: '01',
        applicationTime: moment(dates, 'YYYY-MM-DD')
      })
      this.fatherForm.setFieldsValue({
        memberIdType: '01'
      })
      this.motherForm.setFieldsValue({
        memberIdType: '01'
      })
      this.manForm.setFieldsValue({
        memberIdType: '01'
      })
      this.womanForm.setFieldsValue({
        memberIdType: '01'
      })
      this.baselifeForm.setFieldsValue({
        memberIdType: '01'
      })

      this.baselifeForm.setFieldsValue({
        isConcentratedFeed: '0'
      })
      this.baselifeForm.setFieldsValue({
        isEnjoyMoney: '1'
      })
      this.controMustTip = true
      this.controMustTip2 = false
      this.isGuardiandisabled = false
      this.isGuardiandisabled1 = false
      this.isphonerule = true
      this.isphonerule1 = true
      this.iscomplete1 = true
      this.iscomplete = true
      this.parentlist1 = []
      this.parentlist = []
      this.isrescue = false
      this.validateStatus1 = 'success'
      this.validateStatus = 'success'

      // 区分福利院和乡镇督导员
      const areaLevels = this.userInfo.areaLevel
      const orgTypes = this.userInfo.orgType
      if (areaLevels == '4' && orgTypes != '99') {
        // 督導員 設置為非集中供養
        this.baselifeForm.setFieldsValue({
          isConcentratedFeed: '0'
        })
        this.controMustTip = true
      } else if (areaLevels != '4' && orgTypes == '99') {
        this.baselifeForm.setFieldsValue({
          isConcentratedFeed: '1'
        })
        this.controMustTip = false
      }
    },
    idCardTypeValue (val) {
      const { receiverToChildRelation } = this.baselifeForm.getFieldsValue()
      const fatherFlag = receiverToChildRelation == this.Enum.RELATION.FQ
      const motherFlag = receiverToChildRelation == this.Enum.RELATION.MQ
      // 改变父母亲证件类型时判断是否清空领取人身份证号
      if (val == 'fatherForm' && fatherFlag ||
        val == 'motherForm' && motherFlag) {
        this.baselifeForm.setFieldsValue({
          idCard: undefined
        })
      }
      // 改变领取人证件类型时判断是否清空父亲身份证号
      if (val == 'baselifeForm' && fatherFlag) {
        this.fatherForm.setFieldsValue({
          idCard: undefined
        })
      }
      // 改变领取人证件类型时判断是否清空母亲身份证号
      if (val == 'baselifeForm' && motherFlag) {
        this.motherForm.setFieldsValue({
          idCard: undefined
        })
      }
      this[val].setFieldsValue({
        idCard: undefined
      })
    },
    idCardValid (rule, value, callback, self, text) {
      const idtext = this[text].getFieldsValue().memberIdType
      if (idtext == '01') {
        this.idCardValidate(rule, value, callback, this)
      } else {
        this.otherCardrules(rule, value, callback, this)
      }
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

        val.applicationTime = this.momentValue(val.applicationTime)
        val.birthday = this.momentValue(val.birthday)
        val.sameAddress = ['0']
        if (!val.applicationTime) {
          val.applicationTime = this.nowData
        }
        // 户籍所在地处理
        this.addressChildModel = [
          val.censusRegisterPro || '',
          val.censusRegisterCity || '',
          val.censusRegisterCounty || '',
          val.censusRegisterTown || '',
          val.censusRegisterVillage || ''
        ]
        // this.setChildAddress()
        // this.$refs.baseForm.getAnotherPlaceList(this.addressChildModel)
        // 现住址处理
        this.addressChildModelNow = [
          val.currentAddressPro || '',
          val.currentAddressCity || '',
          val.currentAddressCounty || '',
          val.currentAddressTown || '',
          val.currentAddressVillage || ''
        ]
        this.$nextTick(() => {
          this.baseForm.setFieldsValue(val)
        })
      } else {
        // 不能进行回显（报错：已暂存。。）则清除身份证号信息
        this.getChildNum()
        this.baseForm.setFieldsValue({
          idCard: null
        })
      }
    },
    // 根据身份证号回显出生日期与性别
    callbackByIdCards (sex, age, birth) {
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
        this.computeEndTime(birth)

        const res = age - 18
        this.baseForm.setFieldsValue({
          birthday: birth ? moment(birth) : null,
          sex: sex
        })
        // // 2021年4月25日16:59:56 29号后上线
        if (res >= 0) {
          this.$message.error('该儿童已超龄，请勿录入超龄儿童！')
          this.baseForm.setFieldsValue({
            birthday: undefined,
            sex: undefined,
            idCard: undefined
          })
        }
      }
    },
    // 计算末领年月
    computeEndTime (e) {
      this.$nextTick(() => {
        if (!this.controMustTip2) {
          this.birthDate = e || moment(this.baseForm.getFieldsValue().birthday).format('YYYY-MM-DD')
          this.baselifeForm.setFieldsValue({ endReceiveDate: moment(this.birthDate, 'YYYY-MM').add({ years: 18 }) })
        }
      })
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
    },
    // 儿童类型
    async getchildType () { // CHILDTYPE
      const data = await this.getchildtypelist()
      this.childrenType = data
    },
    async getChildTypeList () { // CHILDTYPE
      const data = await this.getDictionaries('CHILDTYPE')
      this.childTypeList = data
    },
    // EMPLOYMENTSITUATION 就业
    async getehelpMeasure () {
      const data = await this.getDictionaries('OTHERSALVATIONOFUNATTENDED')
      this.measureslist = data
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
    // 身份类型
    async getidCardTypeList () {
      const data = await this.getDictionaries('IDCARD_TYPE')
      this.idCardTypeList = data
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
    changeRequire () {
      const manFormData = this.manForm.getFieldsValue()
      this.manForm.resetFields()
      this.manForm.setFieldsValue(manFormData)
    },
    xyChange (e) {
      this.xyval = e.target.value
      // 学业状况为学龄前时，就学情况设为学龄前并只读
      if (
        this.xyval == this.Enum.ACADEMICSTATUS.ZD ||
        this.xyval == this.Enum.ACADEMICSTATUS.XLQ
      ) {
        this.disabledE = true
        this.disabledG = true
      } else if (this.xyval == 6) {
        this.disabledG = false
        this.disabledE = true
      } else {
        this.disabledG = true
        this.disabledE = false
      }
      this.$nextTick(() => {
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
        this.setHeight('three', 'threeout')
      })
    },
    // 残疾类型 DISABILITYTYPE
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
      // this.healthStatusOther = ''
      this.serioushval = false
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.setHeight('two', 'twoout')
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (refout == 'ktthreeout') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 140 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 100 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 儿童编号接口获取数据
    async getChildNum () {
      const data = await this.post('/serialApi/getChildNumber', {})
      // this.childNumber=data.data.code
      this.baseForm.setFieldsValue({
        childNumber: data.data.code
      })
      // return data.data.code
    },
    householdRegistryClassifychange (val) {
      if (val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.baseForm.setFieldsValue({ idCard: null })
      }
    },
    relevechange (val) {
      this.ishide = val
      this.setHeight('khone', 'khoneout')
    },
    changeaddress () {
      this.baseForm.setFieldsValue({ sameAddress: [] })
    },
    objectch (obj) {
      for (var k in obj) {
        if (!obj[k]) {
          obj[k] = undefined
        }
      }
    },
    async getDetails (val) {
      let data = {}
      if (val) {
        data = { ...val }
      } else {
        const params = {
          id: this.id
        }
        const resobj = await this.post(
          '/UnattendedChildrenApi/getUnattendedChildren',
          params
        )
        data = resobj.data.data
      }
      if (this.tm) {
        this.topForm.resetFields()
        this.fileListX = []
        this.exitReasonOtherTip = false

        if (data.unattendedChangeDetailVo) {
          if (data.unattendedChangeDetailVo.fileList && data.unattendedChangeDetailVo.fileList.length > 0) {
            this.fileListX = data.unattendedChangeDetailVo.fileList
          }

          if (data.unattendedChangeDetailVo.exitReason && data.unattendedChangeDetailVo.exitReason == '7') {
            this.exitReasonOtherTip = true
          } else {
            this.exitReasonOtherTip = false
          }
          this.$nextTick(() => {
            this.topForm.setFieldsValue(data.unattendedChangeDetailVo)
          })
        }
      }

      this.idCardValueAttr.push(data.childBaseInformationVo.idCard)
      this.idCardNameAttr.push('child')
      data.unattendedParentInfoVoList.map((item) => {
        if (item.typeRelation == 1) {
          // 父亲
          this.idCardNameAttr.push('father')
          this.idCardValueAttr.push(item.idCard)
        } else if (item.typeRelation == 2) {
          // 母亲
          this.idCardNameAttr.push('mother')
          this.idCardValueAttr.push(item.idCard)
        } else if (
          item.typeRelation == 3 &&
          item.relationship != this.Enum.RELATION.FQ &&
          item.relationship != this.Enum.RELATION.MQ
        ) {
          // 监护人1
          this.idCardNameAttr.push('man')
          this.idCardValueAttr.push(item.idCard)
        } else if (
          item.typeRelation == 4 &&
          item.relationship != this.Enum.RELATION.FQ &&
          item.relationship != this.Enum.RELATION.MQ
        ) {
          // 监护人2
          this.idCardNameAttr.push('woman')
          this.idCardValueAttr.push(item.idCard)
        } else if (
          item.typeRelation == 5 &&
          item.relationship != this.Enum.RELATION.FQ &&
          item.relationship != this.Enum.RELATION.MQ
        ) {
          // 其他社会关系
          this.idCardValueAttr.push(item.idCard)
          this.idCardNameAttr.push('other')
        }
      })
      if (!data.errors) {
        const resData = data
        this.resData = data
        this.iswelfare = this.resData.unattendedChildBaseInfoVo.welfareFlag == 1
        if (
          this.resData.unattendedChildBaseInfoVo.academicStatus == '1' ||
          this.resData.unattendedChildBaseInfoVo.academicStatus == '7'
        ) {
          this.disabledE = true
          this.disabledG = true
        } else if (
          this.resData.unattendedChildBaseInfoVo.academicStatus == '6'
        ) {
          this.disabledG = false
          this.disabledE = true
        } else {
          this.disabledG = true
          this.disabledE = false
        }
        const childBaseInformationVo = resData.childBaseInformationVo || {}
        this.oldIdCard = childBaseInformationVo
          ? childBaseInformationVo.idCard
          : null // 保存进入编辑刚加载时的身份证号
        const unattendedChildBaseInfoVo =
          resData.unattendedChildBaseInfoVo || {}
        const unattendedParentInfoVoList =
          resData.unattendedParentInfoVoList || []
        const unattendedBaseLivingCostVo =
          resData.unattendedBaseLivingCostVo || {}
        const unattendedPrecessStatusVo =
          resData.unattendedPrecessStatusVo || {}

        // 上报单位赋值
        unattendedChildBaseInfoVo.reportUnit = unattendedPrecessStatusVo.reportUnit
        // 附件
        if (unattendedChildBaseInfoVo.fileList) {
          const filePathVos = unattendedChildBaseInfoVo.fileList
          filePathVos.map((item) => {
            if (item.busiType == '48') {
              this.otherFileList.push(item)
              setTimeout(() => {
                this.setHeight('khthree', 'khthreeout')
              }, 800)
            } else if (item.busiType == '50') {
              this.childFileList.push(item)
              setTimeout(() => {
                this.setHeight('khthree', 'khthreeout')
              }, 800)
            } else if (item.busiType == '51') {
              this.famFileList.push(item)
              setTimeout(() => {
                this.setHeight('khthree', 'khthreeout')
              }, 800)
            } else if (item.busiType == '47') {
              this.imglist.push(item)
              const returnFileIds = item.response.data.data.fileid
              this.imageUrl =
                window.faceConfig.basePath +
                '/file/getFileFromDfs/' +
                returnFileIds
              this.delVisible = true
            } else if (item.busiType == '53') {
              this.parentlist.push(item)
            } else {
              this.parentlist1.push(item)
            }
          })
        }

        if (this.status == 6) {
          if (unattendedPrecessStatusVo.createTime) {
            unattendedPrecessStatusVo.createTime = moment(
              unattendedPrecessStatusVo.createTime
            )
          }
          if (unattendedPrecessStatusVo.updateTime) {
            unattendedPrecessStatusVo.updateTime = moment(
              unattendedPrecessStatusVo.updateTime
            )
          }
          this.detailform.setFieldsValue(unattendedPrecessStatusVo)
        }
        if (childBaseInformationVo.birthday) {
          this.birthDate = childBaseInformationVo.birthday
          childBaseInformationVo.birthday = moment(
            childBaseInformationVo.birthday
          )
        }
        if (this.resData.unattendedChildBaseInfoVo.isAnotherPlaceApply) {
          this.isAnotherPlaceApply = this.resData.unattendedChildBaseInfoVo.isAnotherPlaceApply
          if (this.isAnotherPlaceApply == '1' || this.isAnotherPlaceApply == '2') {
            this.isOtherAdd = '12'
          }
        }
        childBaseInformationVo.infectionTime = unattendedChildBaseInfoVo.infectionTime
          ? moment(unattendedChildBaseInfoVo.infectionTime)
          : null
        // 特殊处理申请时间
        if (unattendedChildBaseInfoVo.applicationTime) {
          childBaseInformationVo.applicationTime = moment(
            unattendedChildBaseInfoVo.applicationTime
          )
        }
        if (
          childBaseInformationVo.householdRegistryClassify &&
          childBaseInformationVo.householdRegistryClassify ==
          this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
        ) {
          this.householdRegistryClassifyhide = false
          this.householdRegistryClassifydisabled = true
        }
        if (unattendedChildBaseInfoVo.sameAddress == '1') {
          childBaseInformationVo.sameAddress = ['1']
        } else {
          childBaseInformationVo.sameAddress = []
        }
        if (unattendedChildBaseInfoVo.anotherPlaceAreaId) {
          if (unattendedChildBaseInfoVo.anotherPlaceAreaId == this.userInfo.orgId) {
            this.isOnlyShow = true
          }
        }
        if (unattendedChildBaseInfoVo.anotherPlaceAreaName) {
          this.$refs.baseForm.anotherPlaceList = {
            anotherPlaceAreaId: unattendedChildBaseInfoVo.anotherPlaceAreaId,
            anotherPlaceAreaName: unattendedChildBaseInfoVo.anotherPlaceAreaName
          }
        }
        // 患艾滋病情况处理
        childBaseInformationVo.transmissionWay =
          unattendedChildBaseInfoVo.transmissionWay
        this.$refs.baseForm.ifDatasProcess(childBaseInformationVo, 'look')

        // 将其他途径、患艾滋病情况的其他数据传到页面
        this.$refs.baseForm.setOtherDatas(
          unattendedChildBaseInfoVo.transmissionWayOther,
          childBaseInformationVo.adisConditionOther
        )
        this.isLocal = unattendedChildBaseInfoVo.applyUnit && unattendedChildBaseInfoVo.applyUnit != this.userInfo.orgName
        this.$nextTick(() => {
          if (childBaseInformationVo.censusRegisterPro) {
            this.addressChildModel.push(
              childBaseInformationVo.censusRegisterPro || '',
              childBaseInformationVo.censusRegisterCity || '',
              childBaseInformationVo.censusRegisterCounty || '',
              childBaseInformationVo.censusRegisterTown || ''
            )
            if (childBaseInformationVo.censusRegisterVillage) {
              this.addressChildModel.push(
                childBaseInformationVo.censusRegisterVillage
              )
            }
          }
          if (childBaseInformationVo.currentAddressPro) {
            this.addressChildModelNow.push(
              childBaseInformationVo.currentAddressPro || '',
              childBaseInformationVo.currentAddressCity || '',
              childBaseInformationVo.currentAddressCounty || '',
              childBaseInformationVo.currentAddressTown || ''
            )
            if (childBaseInformationVo.currentAddressVillage) {
              this.addressChildModelNow.push(
                childBaseInformationVo.currentAddressVillage
              )
            }
          }

          this.objectch(childBaseInformationVo)
          this.baseForm.setFieldsValue(childBaseInformationVo)
          this.topInfoForm.setFieldsValue(unattendedChildBaseInfoVo)
          setTimeout(() => {
            this.baseForm.setFieldsValue({ anotherPlaceAreaName: unattendedChildBaseInfoVo.anotherPlaceAreaName })
          }, 300)
        })
        // 健康状况
        if (unattendedChildBaseInfoVo.disabledType) {
          unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.split(
            ','
          )
          if (
            unattendedChildBaseInfoVo.disabledType[unattendedChildBaseInfoVo.disabledType.length - 1] == this.Enum.HEALTHSTATUS.OTHERSERIOUSILLNESS ||
            unattendedChildBaseInfoVo.disabledType[unattendedChildBaseInfoVo.disabledType.length - 1] == this.Enum.HEALTHSTATUS.OTHERCHRONICDISEASE
          ) {
            this.serioushval = true
          } else {
            this.serioushval = false
          }
        }
        this.getdisabiliytype(unattendedChildBaseInfoVo.healthStatus)
        if (!unattendedChildBaseInfoVo.disabledType) {
          unattendedChildBaseInfoVo.disabledType = []
        }
        this.heathval = unattendedChildBaseInfoVo.healthStatus
        this.xyval = unattendedChildBaseInfoVo.academicStatus
        this.$nextTick(() => {
          this.objectch(unattendedChildBaseInfoVo)
          this.heathForm.setFieldsValue(unattendedChildBaseInfoVo)
          this.statusForm.setFieldsValue(unattendedChildBaseInfoVo)
          this.goSchoolStatusDisabled =
            unattendedChildBaseInfoVo.academicStatus ==
            this.Enum.ACADEMICSTATUS.XLQ
        })
        // 父母及监护人信息 this.isman[0] uniparental
        const otherlist = []
        unattendedParentInfoVoList.map((item) => {
          if (item.typeRelation == 1) {
            if (item.currentSituation) {
              this.zkval = item.currentSituation
              this.showOverTimeF = this.zkval
            }
            if (
              this.zkval == 1 ||
              this.zkval == 2 ||
              this.zkval == 5 ||
              this.zkval == 9
            ) {
              this.isGuardiandisabled = true
            } else {
              this.isGuardiandisabled = false
            }
            if (item.infoCase) {
              this.iscomplete = item.infoCase == 1
            }
            // isphonerule
            this.isphonerule = item.isGuardian == 1
            const arr = []
            if (item.uniparental && item.uniparental != '0') {
              arr.push(item.uniparental)
              this.isman = arr
            }
            item.overTime = item.overTime ? moment(item.overTime) : null
            this.$nextTick(() => {
              this.fatherForm.setFieldsValue(item)
            })
          } else if (item.typeRelation == 2) {
            if (item.currentSituation) {
              this.zkval1 = item.currentSituation
              this.showOverTimeM = this.zkval1
            }
            item.overTime = item.overTime ? moment(item.overTime) : null
            if (
              this.zkval1 == 1 ||
              this.zkval1 == 2 ||
              this.zkval1 == 5 ||
              this.zkval1 == 9
            ) {
              this.isGuardiandisabled1 = true
            } else {
              this.isGuardiandisabled1 = false
            }
            if (item.infoCase) {
              this.iscomplete1 = item.infoCase == 1
            }
            this.isphonerule1 = item.isGuardian == 1
            const arr = []
            if (item.uniparental && item.uniparental != '0') {
              arr.push(item.uniparental)
              this.isman = arr
            }
            this.$nextTick(() => {
              this.motherForm.setFieldsValue(item)
            })
          } else if (item.typeRelation == 3) {
            this.relationshiphide = item.relationship == 99
            this.$nextTick(() => {
              this.manForm.setFieldsValue(item)
            })
          } else if (item.typeRelation == 4) {
            this.relationshiphide1 = item.relationship == 99
            this.$nextTick(() => {
              this.womanForm.setFieldsValue(item)
            })
          } else {
            otherlist.push(item)
          }
        })
        this.adoptorChildrenVos = [...otherlist]
        // 帮扶建议 unattendedBaseLivingCostVo
        if (unattendedBaseLivingCostVo) {
          this.hasSecurityMoney = !!unattendedBaseLivingCostVo.securityMoney
          if (unattendedBaseLivingCostVo.isConcentratedFeed == 1) {
            this.controMustTip = false
          } else {
            this.controMustTip = true
          }
          if (!unattendedBaseLivingCostVo.isConcentratedFeed) {
            unattendedBaseLivingCostVo.isConcentratedFeed = 0
          }
          if (unattendedBaseLivingCostVo.isEnjoyMoney == 0) {
            this.controMustTip2 = true
          } else {
            this.controMustTip2 = false
          }
          if (!unattendedBaseLivingCostVo.isEnjoyMoney) {
            unattendedBaseLivingCostVo.isEnjoyMoney = 1
          }
          this.ishide = unattendedBaseLivingCostVo.receiveWay != 1
          this.receiverToChildRelationhide =
            unattendedBaseLivingCostVo.receiverToChildRelation == this.Enum.RELATION.QT
          // 如果关系为本人，则将证件类型设为只读
          this.$refs.baselifeForm.isSelf = unattendedBaseLivingCostVo.receiverToChildRelation == this.Enum.RELATION.BR
          this.$refs.baselifeForm.isSelf2 = (unattendedBaseLivingCostVo.receiverToChildRelation == this.Enum.RELATION.FQ || unattendedBaseLivingCostVo.receiverToChildRelation == this.Enum.RELATION.MQ)
          if (unattendedBaseLivingCostVo.startReceiveDate) {
            unattendedBaseLivingCostVo.startReceiveDate = moment(
              unattendedBaseLivingCostVo.startReceiveDate,
              'YYYY-MM'
            )
          }
          if (unattendedBaseLivingCostVo.endReceiveDate) {
            unattendedBaseLivingCostVo.endReceiveDate = moment(
              unattendedBaseLivingCostVo.endReceiveDate,
              'YYYY-MM'
            )
          }
          if (unattendedBaseLivingCostVo.helpStartTime) {
            unattendedBaseLivingCostVo.helpStartTime = moment(
              unattendedBaseLivingCostVo.helpStartTime,
              'YYYY-MM-DD'
            )
          }
        }
        this.isrescue = unattendedBaseLivingCostVo.helpMeasure != 5
        unattendedBaseLivingCostVo.helpMeasure = unattendedBaseLivingCostVo.helpMeasure
          ? unattendedBaseLivingCostVo.helpMeasure.split(',')
          : []
        // isrescue
        this.$nextTick(() => {
          this.objectch(unattendedBaseLivingCostVo)
          this.baselifeForm.setFieldsValue(unattendedBaseLivingCostVo)
          this.otherhelpForm.setFieldsValue(unattendedBaseLivingCostVo)
        })
        this.setHeight('khone', 'khoneout')
        this.setHeight('khtwo', 'khtwoout')
        this.setHeight('khthree', 'khthreeout')
        // 申请人/经办人信息赋值
        const { childAnotherPlaceApplyPersonVo } = resData
        if (childAnotherPlaceApplyPersonVo) {
          this.$refs.applicant.relationshipValue = childAnotherPlaceApplyPersonVo.relationship
          this.$nextTick(() => {
            const { agentPersonName, orgName } = childAnotherPlaceApplyPersonVo
            this.applicantForm.setFieldsValue(childAnotherPlaceApplyPersonVo)
            this.agentForm.setFieldsValue(childAnotherPlaceApplyPersonVo)
            // 处理历史数据问题 赋值办理人、办理机构
            this.agentForm.setFieldsValue({
              agentPersonName: agentPersonName || null,
              orgName: orgName || null
            })
          })
          this.$refs.applicant.addressmodel1 = [
            childAnotherPlaceApplyPersonVo.censusRegisterPro || '',
            childAnotherPlaceApplyPersonVo.censusRegisterCity || '',
            childAnotherPlaceApplyPersonVo.censusRegisterCounty || '',
            childAnotherPlaceApplyPersonVo.censusRegisterTown || ''
          ]
          this.$refs.applicant.addressmodel2 = [
            childAnotherPlaceApplyPersonVo.currentAddressPro || '',
            childAnotherPlaceApplyPersonVo.currentAddressCity || '',
            childAnotherPlaceApplyPersonVo.currentAddressCounty || '',
            childAnotherPlaceApplyPersonVo.currentAddressTown || ''
          ]
          this.businessId = childAnotherPlaceApplyPersonVo.businessId
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

      childBaseInformationVo.id = this.childId // 儿童id
      if (childBaseInformationVo.birthday) {
        childBaseInformationVo.birthday = childBaseInformationVo.birthday.format(
          'YYYY-MM-DD'
        )
      }
      if (childBaseInformationVo.anotherPlaceAreaName) {
        childBaseInformationVo.anotherPlaceAreaId = this.$refs.baseForm.anotherPlaceList.anotherPlaceAreaId
      }
      if (childBaseInformationVo.censusRegisterp) {
        childBaseInformationVo.censusRegisterPro =
          childBaseInformationVo.censusRegisterp[0]
        childBaseInformationVo.censusRegisterCity =
          childBaseInformationVo.censusRegisterp[1]
        childBaseInformationVo.censusRegisterCounty =
          childBaseInformationVo.censusRegisterp[2]
        childBaseInformationVo.censusRegisterTown =
          childBaseInformationVo.censusRegisterp[3]
        childBaseInformationVo.censusRegisterVillage =
          childBaseInformationVo.censusRegisterp[4]
        delete childBaseInformationVo.censusRegisterp
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
      // 患艾滋病情况其他
      if (childBaseInformationVo.adisCondition == this.Enum.ADISCONDITION.QT) {
        childBaseInformationVo.adisConditionOther = this.$refs.baseForm.$refs
          .adisConditionOther
          ? this.$refs.baseForm.$refs.adisConditionOther.stateValue
          : null
      }
      if (childBaseInformationVo.anotherPlaceAreaName) {
        unattendedChildBaseInfoVo.anotherPlaceAreaName = childBaseInformationVo.anotherPlaceAreaName
        unattendedChildBaseInfoVo.anotherPlaceAreaId = this.$refs.baseForm.anotherPlaceList.anotherPlaceAreaId
      }
      if (this.isAnotherPlaceApply) {
        unattendedChildBaseInfoVo.isAnotherPlaceApply = this.isAnotherPlaceApply
      }
      unattendedChildBaseInfoVo.transmissionWay =
        childBaseInformationVo.transmissionWay
      // 其他途径
      if (
        unattendedChildBaseInfoVo.transmissionWay ==
        this.Enum.TRANSMISSIONWAYOTHER.QT
      ) {
        unattendedChildBaseInfoVo.transmissionWayOther = this.$refs.baseForm.$refs.transmissionWayOther.stateValue // 添加其他途径
      }
      unattendedChildBaseInfoVo.infectionTime = childBaseInformationVo.infectionTime
        ? moment(childBaseInformationVo.infectionTime).format('YYYY-MM-DD')
        : null
      if (unattendedChildBaseInfoVo.disabledType) {
        unattendedChildBaseInfoVo.disabledType = unattendedChildBaseInfoVo.disabledType.join(
          ','
        )
      }
      const arr = []
      const filelist = [
        ...this.imglist,
        ...this.childFileList,
        ...this.famFileList,
        ...this.otherFileList,
        ...this.parentlist,
        ...this.parentlist1
      ]
      filelist.map((item) => {
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
      if (childBaseInformationVo.sameAddress) {
        if (childBaseInformationVo.sameAddress.length > 0) {
          unattendedChildBaseInfoVo.sameAddress = '1'
        } else {
          unattendedChildBaseInfoVo.sameAddress = '0'
        }
      }
      // 父母及监护人信息
      let unattendedParentInfoVoList = []
      let uniparental = '0'
      uniparental = this.isman[0] || '0'
      // }
      const fatherForm = this.fatherForm.getFieldsValue()

      if (fatherForm.overTime) {
        fatherForm.overTime = fatherForm.overTime.format(
          'YYYY-MM-DD'
        )
      }

      fatherForm.typeRelation = 1
      fatherForm.uniparental = uniparental
      const motherForm = this.motherForm.getFieldsValue()
      if (motherForm.overTime) {
        motherForm.overTime = motherForm.overTime.format(
          'YYYY-MM-DD'
        )
      }
      motherForm.typeRelation = 2
      motherForm.uniparental = uniparental
      const manForm = this.manForm.getFieldsValue()

      manForm.typeRelation = 3
      const womanForm = this.womanForm.getFieldsValue()
      womanForm.typeRelation = 4
      unattendedParentInfoVoList = [...this.adoptorChildrenVos]
      if (this.getnum(fatherForm) > 2) {
        unattendedParentInfoVoList.push(fatherForm)
      }
      if (this.getnum(motherForm) > 2) {
        unattendedParentInfoVoList.push(motherForm)
      }
      if (this.getnum(manForm) > 1) {
        unattendedParentInfoVoList.push(manForm)
      }
      if (this.getnum(womanForm) > 1) {
        unattendedParentInfoVoList.push(womanForm)
      }
      // 帮扶建议
      const baselifeForm = this.baselifeForm.getFieldsValue()
      const otherhelpForm = this.otherhelpForm.getFieldsValue()
      otherhelpForm.helpMeasure = otherhelpForm.helpMeasure.join(',')
      const unattendedBaseLivingCostVo = { ...baselifeForm, ...otherhelpForm }
      if (unattendedBaseLivingCostVo.startReceiveDate) {
        unattendedBaseLivingCostVo.startReceiveDate = unattendedBaseLivingCostVo.startReceiveDate.format(
          'YYYY-MM'
        )
      }
      if (unattendedBaseLivingCostVo.endReceiveDate) {
        unattendedBaseLivingCostVo.endReceiveDate = unattendedBaseLivingCostVo.endReceiveDate.format(
          'YYYY-MM'
        )
      }
      if (unattendedBaseLivingCostVo.helpStartTime) {
        unattendedBaseLivingCostVo.helpStartTime = unattendedBaseLivingCostVo.helpStartTime.format(
          'YYYY-MM-DD'
        )
      }
      if (unattendedBaseLivingCostVo.isConcentratedFeed == 1) {
        this.controMustTip = false
      } else {
        this.controMustTip = true
      }
      if (unattendedBaseLivingCostVo.isEnjoyMoney == 0) {
        this.controMustTip2 = true
      } else {
        this.controMustTip2 = false
      }

      if (!unattendedBaseLivingCostVo.isConcentratedFeed) {
        unattendedBaseLivingCostVo.isConcentratedFeed = 0
      }
      if (!unattendedBaseLivingCostVo.isEnjoyMoney) {
        unattendedBaseLivingCostVo.isEnjoyMoney = 1
      }
      // 申请人/经办人信息
      const childAnotherPlaceApplyPersonVo = Object.assign({}, this.applicantForm.getFieldsValue(), this.agentForm.getFieldsValue())
      if (this.type != 'add') {
        childAnotherPlaceApplyPersonVo.businessId = this.businessId
      }

      // 申请人户籍所在地处理
      const { censusRegister } = childAnotherPlaceApplyPersonVo
      if (censusRegister && censusRegister.length > 0) {
        childAnotherPlaceApplyPersonVo.censusRegisterPro = censusRegister[0]
        childAnotherPlaceApplyPersonVo.censusRegisterCity = censusRegister[1]
        childAnotherPlaceApplyPersonVo.censusRegisterCounty = censusRegister[2]
        childAnotherPlaceApplyPersonVo.censusRegisterTown = censusRegister[3]
        delete childAnotherPlaceApplyPersonVo.censusRegister
      }

      // 申请人现住址处理
      const { currentAddress } = childAnotherPlaceApplyPersonVo
      if (currentAddress && currentAddress.length > 0) {
        childAnotherPlaceApplyPersonVo.currentAddressPro = currentAddress[0]
        childAnotherPlaceApplyPersonVo.currentAddressCity = currentAddress[1]
        childAnotherPlaceApplyPersonVo.currentAddressCounty = currentAddress[2]
        childAnotherPlaceApplyPersonVo.currentAddressTown = currentAddress[3]
        delete childAnotherPlaceApplyPersonVo.currentAddress
      }

      const registerAdoptionVo = {
        childBaseInformationVo,
        unattendedChildBaseInfoVo,
        unattendedParentInfoVoList,
        unattendedBaseLivingCostVo,
        childAnotherPlaceApplyPersonVo
      }
      return registerAdoptionVo
    },
    async submit (val) {
      this.isvalidator = false
      this.$refs.manForm.isvalidator = false
      this.$refs.womanForm.isvalidator = false
      this.$refs.fatherForm.isvalidator = false
      this.$refs.motherForm.isvalidator = false
      this.$refs.baselifeForm.isvalidator = false
      this.$refs.manForm.errMsg = this.manForm.getFieldError('idCard')
      this.$refs.womanForm.errMsg = this.womanForm.getFieldError('idCard')
      this.$refs.fatherForm.errMsg = this.fatherForm.getFieldError('idCard')
      this.$refs.motherForm.errMsg = this.motherForm.getFieldError('idCard')
      this.$refs.baselifeForm.errMsg = this.baselifeForm.getFieldError(
        'idCard'
      )
      this.$refs.baseForm.isNotSubmit = true
      let isok = true

      // 申请人信息
      await this.applicantForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.applicantForm.getFieldsValue()[k]) {
                this.applicantForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '7'
            isok = false
            this.setHeight('perone', 'peroneout')
          }
        }
      })
      // 经办人信息
      await this.agentForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.agentForm.getFieldsValue()[k]) {
                this.agentForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '7'
            isok = false
            this.setHeight('pertwo', 'pertwoout')
          }
        }
      })
      // 其他救助
      await this.otherhelpForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                !this.otherhelpForm.getFieldsValue()[k] ||
                this.otherhelpForm.getFieldsValue()[k].length == 0
              ) {
                this.otherhelpForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '3'
            isok = false
          }
        }
      })
      // 帮扶建议
      await this.baselifeForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.baselifeForm.getFieldsValue()[k]) {
                this.baselifeForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '3'
            isok = false
            this.setHeight('khone', 'khoneout')
            this.setHeight('khtwo', 'khtwoout')
            this.setHeight('khthree', 'khthreeout')
          }
        }
      })
      if (val == 1) {
        const fatherdata = this.fatherForm.getFieldsValue()
        if (fatherdata.infoCase && fatherdata.infoCase == 0) {
          if (this.parentlist.length == 0) {
            this.validateStatus = 'error'
            isok = false
            this.nowkey = '2'
          }
        }
      }
      await this.fatherForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.fatherForm.getFieldsValue()[k]) {
                this.fatherForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '2'
            isok = false
          }
        }
      })
      if (val == 1) {
        const motherdata = this.motherForm.getFieldsValue()
        if (motherdata.infoCase && motherdata.infoCase == 0) {
          if (this.parentlist1.length == 0) {
            this.validateStatus1 = 'error'
            isok = false
            this.nowkey = '2'
          }
        }
      }
      await this.motherForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.motherForm.getFieldsValue()[k]) {
                this.motherForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '2'
            isok = false
          }
        }
      })
      await this.manForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.manForm.getFieldsValue()[k]) {
                this.manForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '4'
            isok = false
          }
        }
      })
      await this.statusForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.statusForm.getFieldsValue()[k]) {
                this.statusForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '1'
            isok = false
          }
        }
      })
      await this.heathForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                !this.heathForm.getFieldsValue()[k] ||
                this.heathForm.getFieldsValue()[k].length == 0
              ) {
                this.heathForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '1'
            isok = false
          }
        }
      })
      // 附件的必填校验
      this.proveForm.setFieldsValue({
        childFileList: this.childFileList.length == 0 && val == '1' && !this.justEdit ? undefined : 1,
        famFileList: this.famFileList.length == 0 && val == '1' && !this.justEdit ? undefined : 1
      })
      await this.proveForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (
                !this.proveForm.getFieldsValue()[k] ||
                this.proveForm.getFieldsValue()[k].length == 0
              ) {
                this.proveForm.resetFields(k)
              } else {
                isok = false
              }
            }
          } else {
            this.nowkey = '3'
            isok = false
            this.setHeight('khone', 'khoneout')
            this.setHeight('khtwo', 'khtwoout')
            this.setHeight('khthree', 'khthreeout')
          }
        }
      })

      // 身份证号必填时的验证
      if (
        !this.baseForm.getFieldsValue().idCard &&
        this.householdRegistryClassifyhide
      ) {
        this.baseForm.setFields({
          idCard: {
            value: null,
            errors: '请输入身份证号'
          }
        })
      }
      await this.baseForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            if (err.name) {
              isok = false
            } else {
              isok = true
            }
            for (const k in err) {
              if (k != 'name' && !this.baseForm.getFieldsValue()[k]) {
                this.baseForm.resetFields(k)
              }
            }
          } else {
            this.nowkey = '1'
            isok = false
          }
        }
      })

      this.$refs.baseForm.isNotSubmit = false
      if (isok) {
        const data = await this.processingData() //* **** */
        data.buttonType = val
        let url = ''
        let text = ''
        if (this.id) {
          for (var k in data) {
            if (!(data[k] instanceof Array) && data[k] instanceof Object) {
              if (this.resData[k]) {
                data[k].id = this.resData[k].id
              }
            }
            if (k == 'unattendedParentInfoVoList') {
              data[k].map((item, index) => {
                if (this.resData[k]) {
                  this.resData[k].map((val) => {
                    if (item.typeRelation == val.typeRelation) {
                      item.id = val.id
                    }
                  })
                }
              })
            }
          }

          if (this.childId) {
            data.childBaseInformationVo.id = this.childId
          }
          // 编辑
          // data.bizKey = this.id
        } else {
          // 新增
        }
        val == 0 ? (text = '暂存成功') : (text = '提交成功')
        if (this.isreject) {
          if (val == 0) {
            url = '/UnattendedChildrenApi/stagingbhCompileUnattendedChildren'
          } else {
            url = '/UnattendedChildrenApi/bhCompileUnattendedChildren'
          }
        } else {
          if (val == 0) {
            url = '/UnattendedChildrenApi/stagingUnattendedChildren'
            if (this.isOtherAdd == '12' && this.isOtherEdit != '11') {
              url = 'UnattendedChildrenApi/saveUnattendedChildrenAnotherPlaceApply'
            }
          } else {
            url = '/UnattendedChildrenApi/saveUnattendedChildren'
            if (this.isOtherAdd == '12' && this.isOtherEdit != '11') {
              url = 'UnattendedChildrenApi/saveUnattendedChildrenAnotherPlaceApply'
            }
          }
        }
        if (this.isWshEdit) { // 未审核的编辑
          url = 'UnattendedChildrenApi/saveUnattendedChildrenAnotherPlaceApplyForAudit'
        }
        if (val == 1) {
          const idcardlist = []
          let isrepeat = false
          idcardlist.push({
            idCard: data.childBaseInformationVo.idCard,
            memberIdType: '01',
            name: '儿童身份',
            relationship: '00'
          })
          data.unattendedParentInfoVoList.map((item) => {
            // relationshipchange
            let name = ''
            let relationship = item.relationship
            if (item.typeRelation == 1) {
              name = '父亲'
              relationship = '01'
            } else if (item.typeRelation == 2) {
              name = '母亲'
              relationship = '02'
            } else if (item.typeRelation == 3) {
              name = '监护人一'
            } else if (item.typeRelation == 4) {
              name = '监护人二'
            } else {
              name = '社会关系信息'
            }
            idcardlist.push({
              idCard: item.idCard,
              memberIdType: item.memberIdType,
              name,
              relationship
            })
          })
          for (let i = 0; i < idcardlist.length; i++) {
            for (let j = 0; j < idcardlist.length; j++) {
              if (i != j) {
                if (
                  idcardlist[i].idCard == idcardlist[j].idCard &&
                  idcardlist[i].memberIdType == idcardlist[j].memberIdType &&
                  idcardlist[i].idCard &&
                  idcardlist[i].relationship != idcardlist[j].relationship
                ) {
                  isrepeat = true
                  const msg =
                    idcardlist[i].name +
                    '和' +
                    idcardlist[j].name +
                    '证件号码重复'
                  this.$message.error(msg)
                  break
                }
              }
            }
            if (isrepeat) {
              break
            }
          }
          if (isrepeat) {
            return false
          }
        }
        if (data.unattendedBaseLivingCostVo.receiveWay) {
          data.unattendedBaseLivingCostVo.receiveWay = data.unattendedBaseLivingCostVo.receiveWay[0]
        } else {
          data.unattendedBaseLivingCostVo.receiveWay = ''
        }
        // data.unattendedBaseLivingCostVo.receiveWay =
        //   data.unattendedBaseLivingCostVo.receiveWay[0] || ''
        const moData = this.motherForm.getFieldsValue()
        const faData = this.fatherForm.getFieldsValue()
        if (
          (moData.currentSituation == '1' || moData.currentSituation == '2') &&
          (faData.currentSituation == '1' || faData.currentSituation == '2')
        ) {
          this.$message.error(
            '根据事实无人抚养儿童认定依据，该儿童不符合登记条件'
          )
          return
        }
        const parms = {
          id: this.id,
          idCard: this.baseForm.getFieldsValue().idCard,
          childType: '120'
        }
        let res1 = {}
        if (val != '2' && this.baseForm.getFieldsValue().idCard) {
          res1 = await this.post('/orphansDisabledChildrenApi/getChildByNameAndTypeAll', parms)
        } else {
          res1 = {}
        }
        if (res1.errors) {
          return false
        } else {
          const res = await this.post(url, data, true)
          if (res.errors == null) {
            this.$message.success(text)
            if (this.backData == 'changes') {
              this.$route.push({
                name: 'factRaiseChildInfoChange'
              })
            }

            if (this.$route.query.exportid) {
              this.$router.go(-3)
            } else {
              this.backs()
            }
          }
        }
      } else {
        if (val === 0) {
          this.$message.error('请至少输入儿童姓名')
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      }
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
    // 儿童地址传值
    setChildAddress () {
      this.baseForm.setFieldsValue({
        censusRegisterp: this.addressChildModel
      })
    },
    setChildAddress1 () {
      this.baseForm.setFieldsValue({
        currentAddress: this.addressChildModelNow
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
      if (this.nowkey == '3') {
        this.setHeight('khone', 'khoneout')
        this.setHeight('khtwo', 'khtwoout')
        this.setHeight('khthree', 'khthreeout')
      }
    }
  }
}
</script>
<style scoped lang='less'>
.form-item-applyUnit .ant-form-item-control {
  // width: 450px;
}

.mars {
  width: 100%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.canji {
  width: 90%;
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
  margin-left: 20px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
  .icons {
    margin: 0 7px 0 24px;
  }
}
.warntextNew {
  width: 100%;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  align-items: center;
  p {
    margin-top: 20px;
  }
  .icons {
    margin: 0 7px 0 24px;
  }
}
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.item_text {
  width: 60px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 135px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
</style>
