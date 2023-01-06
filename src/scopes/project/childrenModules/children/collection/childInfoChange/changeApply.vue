<template>
  <div class="conts">
    <div class="contin">
      <div class="foruout">
        <ta-form :autoFormCreate="(form)=>{this.form = form}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="儿童姓名"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="name"
                              :fieldDecoratorOptions="verificationRulesNotMustFill('儿童姓名',100)">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="身份证号"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="idCard"
                              :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{required: idCardRequire,validator: idCardValid}]}">
                  <ta-input :disabled="!idCardRequire||disabled || isFlag" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="性别"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="sex">
                  <ta-select placeholder="请选择性别"
                             :disabled="disabled">
                    <ta-select-option v-for="(item ,index) in sexList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="出生日期"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="birthday"
                              :require="{enable:!idCardRequire,message:'请选择出生日期'}">
                  <ta-date-picker style="width:100%"
                                  :disabled="idCardRequire" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="儿童类别"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="childType">
                  <ta-select placeholder="请选择儿童类别"
                             @change="selectchange"
                             :disabled="isTown||disabled">
                    <ta-select-option v-for="(item ,index) in childTypeList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="登记增员日期"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="registerDate">
                  <ta-date-picker style="width:100%"
                                  :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="户籍性质"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="censusRegister"
                              :require="{enable:householdRegistryVisible,message:'请选择户籍性质'}">
                  <ta-select placeholder="请选择户籍性质"
                             :disabled="!householdRegistryVisible||disabled">
                    <ta-select-option v-for="(item ,index) in censusRegisterList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="户口分类"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="householdRegistryClassify">
                  <ta-select placeholder="请选择户口分类"
                             @change="getRegistered"
                             :disabled="disabled">
                    <ta-select-option v-for="(item ,index) in householdRegistryClassifyList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="养育类型"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              :require="{message:'请选择养育类型'}"
                              fieldDecoratorId="rearingType">
                  <ta-select placeholder="请选择养育类型"
                             :disabled="disabled">
                    <ta-select-option v-for="(item ,index) in rearingTypeList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="12">
                <AddressComponent :addressmodel="addressmodel"
                                  :msg="'户籍所在地'"
                                  :isRequire="householdRegistryVisible"
                                  :disabled="!householdRegistryVisible||disabled"
                                  :labelwidth="{label: 4, wrapper: 20}"
                                  arealevel="4"
                                  fileldName="censusRegisterDatas"
                                  @setaddress="setaddress"></AddressComponent>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item label
                              fieldDecoratorId="censusRegisterDetail"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 15,offset:1 }"
                              :fieldDecoratorOptions="householdRegistryVisible?verificationRules('详细地址',100):verificationRulesNotMustFill('详细地址',100)">
                  <ta-input placeholder="请输入详细地址"
                            :disabled="!householdRegistryVisible||disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="12">
                <ta-form-item class="radios"
                              label="患艾滋病情况"
                              fieldDecoratorId="adisCondition"
                              :labelCol="{ span: 5 }"
                              :wrapperCol="{ span: 19 }">
                  <ta-radio-group @change="radiochange"
                                  style="width:100%"
                                  :disabled="disabled">
                    <ta-radio v-for="(item,index) in adisConditionList"
                              :disabled="item.value==Enum.ADISCONDITION.QT"
                              :key="index"
                              :value="item.value">{{item.label}}</ta-radio>
                  </ta-radio-group>
                </ta-form-item>
              </ta-col>

              <ta-col :span="12">
                <ta-form-item fieldDecoratorId="adisConditionOther"
                              :fieldDecoratorOptions="verificationRulesNotMustFill('原因',50)">
                  <ta-input v-if="radiovalue==Enum.ADISCONDITION.QT"
                            placeholder="请输入原因"
                            style="width:300px;"
                            :disabled="true"
                            :defaultValue="null" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24"
                    v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">
              <ta-col :span="16">
                <ta-form-item label="最有可能感染艾滋病途径"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18 }"
                              fieldDecoratorId="transmissionWay"
                              :require="{message:'请选择最有可能感染艾滋病途径'}">
                  <ta-radio-group @change="channel"
                                  style="width:100%"
                                  :disabled="disabled">
                    <ta-radio v-for="(item,index) in transmissionWayList"
                              :key="index"
                              :value="item.value">{{item.label}}</ta-radio>
                  </ta-radio-group>
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item fieldDecoratorId="transmissionWayOther">
                  <ta-input v-if="radiovalues==Enum.TRANSMISSIONWAYOTHER.QT"
                            :placeholder="'请输入其他途径'"
                            style="width:300px;"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24"
                    key="1">
              <ta-col :span="6"
                      v-if="radiovalue==Enum.ADISCONDITION.XDHGRAZB">
                <ta-form-item label="确认艾滋病感染时间"
                              :labelCol="{ span: 13}"
                              :wrapperCol="{span:11}"
                              fieldDecoratorId="infectionTime"
                              :require="{message:'请选择确认艾滋病感染时间!'}">
                  <ta-date-picker style="width: 100%;"
                                  :placeholder="'请选择感染时间'"
                                  :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-divider />
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="起领年月"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="startTime"
                              :fieldDecoratorOptions="obj.bringUpType != '14'?verificationRules('起领年月'):verificationRulesNotMustFill('起领年月')">
                  <ta-month-picker style="width:100%"
                                   :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="末领年月"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="endTime"
                              :fieldDecoratorOptions="obj.bringUpType != '14'?verificationRules('末领年月'):verificationRulesNotMustFill('末领年月')">
                  <ta-month-picker style="width:100%"
                                   :allowClear="false"
                                   :disabledDate="disabledEndDate"
                                   :disabled="disabled || isFlag" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="领取人"
                              :labelCol="{ span: 6}"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="receiver"
                              :fieldDecoratorOptions="obj.bringUpType != '14'?verificationRules('领取人', 72):verificationRulesNotMustFill('领取人', 72)">
                  <ta-input placeholder="请输入领取人"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="领取方式"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="payment"
                              :fieldDecoratorOptions="obj.bringUpType != '14'?verificationRules('领取方式'):verificationRulesNotMustFill('领取方式')">
                  <ta-select placeholder="请选择领取方式"
                             :disabled="disabled"
                             allowClear
                             @change="getPayment">
                    <ta-select-option v-for="item in paymentList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="开户行"
                              :labelCol="{ span: 6}"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="openBank"
                              :fieldDecoratorOptions="bankRequire&&!iswelfare?verificationRules('开户行', 20):verificationRulesNotMustFill('儿童本人开户行', 20)">
                  <ta-input placeholder="请输入开户行"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="银行账号"
                              :labelCol="{ span: 7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="bankNumber"
                              :fieldDecoratorOptions="bankRequire&&!iswelfare?verificationRules('银行账号', 30):verificationRulesNotMustFill('儿童本人银行账号', 30)">
                  <ta-input placeholder="请输入银行账号"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="领取人与儿童关系"
                              :labelCol="{ span: 12}"
                              :wrapperCol="{span:12}"
                              fieldDecoratorId="receiverRelation"
                              :fieldDecoratorOptions="obj.bringUpType != '14'?verificationRules('领取人与儿童关系'):verificationRulesNotMustFill('领取人与儿童关系')">
                  <ta-select placeholder="请选择领取人与儿童关系"
                             @change="getRelation"
                             :disabled="disabled">
                    <ta-select-option v-for="item in receiverRelationList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>

                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label
                              fieldDecoratorId="receiverRelationOther"
                              :fieldDecoratorOptions="verificationRules('其他关系', 20)"
                              class="otherclass"
                              v-if="valueSelect==Enum.RECEIVERRELATION.QT"
                              :labelCol="{span:0}"
                              :wrapperCol="{span:24}">
                  <ta-input :disabled="disabled"
                            placeholder="请输入其他关系" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="变更原因"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 21 }"
                            fieldDecoratorId="changeReason"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('变更原因',200,true)">
                <ta-textarea placeholder="请输入变更原因"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="back">返回</ta-button>
      <ta-button class="btnleft"
                 type="primary"
                 @click="submit">提交</ta-button>

    </div>
    <!-- 对比弹窗 -->
    <ta-modal title="提交确认"
              :visible="visible"
              @ok="handleOk"
              :width="'90%'"
              @cancel="handleCancel">
      <ta-row class="fromcom">
        <ta-col :span="10"
                ref="left">
          <ta-form :autoFormCreate="(form)=>{this.oldform = form}"
                   :hideRequiredMark="true">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="nameVisible[0]">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="birthdayVisible[0]">
              <ta-date-picker style="width:100%"
                              :disabled="true" />
            </ta-form-item>
            <ta-form-item label="性别"
                          fieldDecoratorId="sex"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="sexVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in sexList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="idCardVisible[0]">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="儿童类别"
                          fieldDecoratorId="childType"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="childTypeVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in childTypeList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="登记增员日期"
                          fieldDecoratorId="registerDate"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="registerDateVisible[0]">
              <ta-date-picker style="width:100%"
                              :disabled="true" />
            </ta-form-item>
            <ta-col :span="24">
              <ta-col :span="16">
                <AddressComponent :addressmodel="addressOldModel"
                                  :msg="'户籍所在地'"
                                  :disabled="true"
                                  arealevel="4"
                                  fileldName="censusRegisterDatas"
                                  @setaddress="setOldAddress"
                                  v-show="censusRegisterDatasVisible[0]"></AddressComponent>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label
                              fieldDecoratorId="censusRegisterDetail"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              v-show="censusRegisterDetailVisible[0]">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-form-item label="户籍性质"
                          fieldDecoratorId="censusRegister"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="censusRegisterVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in censusRegisterList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="户口分类"
                          fieldDecoratorId="householdRegistryClassify"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="householdRegistryClassifyVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in householdRegistryClassifyList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="养育类型"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{span:20}"
                          :require="{message:'请选择养育类型'}"
                          fieldDecoratorId="rearingType"
                          v-if="rearingTypeVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in rearingTypeAllList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item class="radios"
                          label="患艾滋病情况"
                          fieldDecoratorId="adisCondition"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择患艾滋病情况'}]}"
                          v-if="adisConditionVisible[0]">
              <ta-radio-group @change="radiochange"
                              style="width:100%"
                              :disabled="true">
                <ta-radio v-for="(item,index) in adisConditionList"
                          :key="index"
                          :value="item.value">{{item.label}}</ta-radio>
                <ta-form-item fieldDecoratorId="adisConditionOther"
                              class="otherclass"
                              v-if="adisConditionOtherVisible[0]"
                              :labelCol="{span:0}"
                              :wrapperCol="{span:24}">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item label="确认艾滋病感染时间"
                          fieldDecoratorId="infectionTime"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="infectionTimeVisible[0]">
              <ta-date-picker style="width: 100%;"
                              placeholder
                              :disabled="true" />
            </ta-form-item>
            <ta-form-item label="最有可能感染艾滋病途径"
                          fieldDecoratorId="transmissionWay"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="transmissionWayVisible[0]">
              <ta-radio-group @change="channel"
                              style="width:100%"
                              :disabled="true">
                <ta-radio v-for="(item,index) in transmissionWayList"
                          :key="index"
                          :value="item.value">{{item.label}}</ta-radio>
                <ta-form-item fieldDecoratorId="transmissionWayOther"
                              style="margin-bottom: 0;">
                  <ta-input v-if="transmissionWayOtherVisible[0]"
                            style="width:300px;"
                            :disabled="true" />
                </ta-form-item>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item label="起领年月"
                          fieldDecoratorId="startTime"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="startTimeVisible[0]">
              <ta-month-picker style="width:100%"
                               :disabled="true"
                               placeholder />
            </ta-form-item>
            <ta-form-item label="末领年月"
                          fieldDecoratorId="endTime"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="endTimeVisible[0]">
              <ta-month-picker style="width:100%"
                               :disabled="true" />
            </ta-form-item>
            <ta-form-item label="领取人"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="receiver"
                          v-if="receiverVisible[0]">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
            <ta-form-item label="领取方式"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="payment"
                          v-if="paymentVisible[0]">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option v-for="item in paymentList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="领取人与儿童关系"
                          :labelCol="{ span: 6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="receiverRelation"
                          v-if="receiverRelationVisible[0]">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option v-for="item in receiverRelationList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="其他关系"
                          fieldDecoratorId="receiverRelationOther"
                          v-if="receiverRelationOtherVisible[0]"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="开户行"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="openBank"
                          v-if="openBankVisible[0]">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
            <ta-form-item label="银行账号"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="bankNumber"
                          v-if="bankNumberVisible[0]">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-form>
        </ta-col>
        <ta-col :span="4"
                class="centerclass"
                ref="center">
          <h2>变更后>></h2>
        </ta-col>
        <ta-col :span="10"
                style="float:right">
          <ta-form :autoFormCreate="(form)=>{this.newform = form}"
                   :hideRequiredMark="true">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="nameVisible[0]">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="birthdayVisible[0]">
              <ta-date-picker style="width:100%"
                              :disabled="true" />
            </ta-form-item>
            <ta-form-item label="性别"
                          fieldDecoratorId="sex"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="sexVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in sexList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="idCardVisible[0]">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="儿童类别"
                          fieldDecoratorId="childType"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="childTypeVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in childTypeList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="登记增员日期"
                          fieldDecoratorId="registerDate"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="registerDateVisible[0]">
              <ta-date-picker style="width:100%"
                              :disabled="true" />
            </ta-form-item>
            <ta-col :span="24">
              <ta-col :span="16">
                <AddressComponent :addressmodel="addressNewModel"
                                  :msg="'户籍所在地'"
                                  :disabled="true"
                                  arealevel="4"
                                  fileldName="censusRegisterDatas"
                                  @setaddress="setNewAddress"
                                  v-show="censusRegisterDatasVisible[0]"></AddressComponent>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label
                              fieldDecoratorId="censusRegisterDetail"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              v-show="censusRegisterDetailVisible[0]">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-form-item label="户籍性质"
                          fieldDecoratorId="censusRegister"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="censusRegisterVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in censusRegisterList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="户口分类"
                          fieldDecoratorId="householdRegistryClassify"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="householdRegistryClassifyVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in householdRegistryClassifyList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="养育类型"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{span:20}"
                          :require="{message:'请选择养育类型'}"
                          fieldDecoratorId="rearingType"
                          v-if="rearingTypeVisible[0]">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item ,index) in rearingTypeAllList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item class="radios"
                          label="患艾滋病情况"
                          fieldDecoratorId="adisCondition"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="adisConditionVisible[0]">
              <ta-radio-group @change="radiochange"
                              style="width:100%"
                              :disabled="true">
                <ta-radio v-for="(item,index) in adisConditionList"
                          :key="index"
                          :value="item.value">{{item.label}}</ta-radio>
                <ta-form-item fieldDecoratorId="adisConditionOther"
                              v-if="adisConditionOtherVisible[0]"
                              class="otherclass"
                              :labelCol="{span:0}"
                              :wrapperCol="{span:24}">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item label="确认艾滋病感染时间"
                          fieldDecoratorId="infectionTime"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="infectionTimeVisible[0]">
              <ta-date-picker style="width: 100%;"
                              :disabled="true"
                              placeholder />
            </ta-form-item>
            <ta-form-item label="最有可能感染艾滋病途径"
                          fieldDecoratorId="transmissionWay"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="transmissionWayVisible[0]">
              <ta-radio-group @change="channel"
                              style="width:100%"
                              :disabled="true">
                <ta-radio v-for="(item,index) in transmissionWayList"
                          :key="index"
                          :value="item.value">{{item.label}}</ta-radio>
                <ta-form-item fieldDecoratorId="transmissionWayOther"
                              style="margin-bottom: 0;">
                  <ta-input v-if="transmissionWayOtherVisible[0]"
                            style="width:300px;"
                            :disabled="true" />
                </ta-form-item>
              </ta-radio-group>
            </ta-form-item>
            <ta-form-item label="起领年月"
                          fieldDecoratorId="startTime"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="startTimeVisible[0]">
              <ta-month-picker style="width:100%"
                               :disabled="true"
                               placeholder />
            </ta-form-item>
            <ta-form-item label="末领年月"
                          fieldDecoratorId="endTime"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          v-if="endTimeVisible[0]">
              <ta-month-picker style="width:100%"
                               :disabled="true" />
            </ta-form-item>
            <ta-form-item label="领取人"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="receiver"
                          v-if="receiverVisible[0]">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
            <ta-form-item label="领取方式"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="payment"
                          v-if="paymentVisible[0]">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option v-for="item in paymentList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="领取人与儿童关系"
                          :labelCol="{ span: 6}"
                          :wrapperCol="{span:18}"
                          fieldDecoratorId="receiverRelation"
                          v-if="receiverRelationVisible[0]">
              <ta-select placeholder
                         :disabled="true">
                <ta-select-option v-for="item in receiverRelationList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="其他关系"
                          fieldDecoratorId="receiverRelationOther"
                          v-if="receiverRelationOtherVisible[0]"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item label="开户行"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="openBank"
                          v-if="openBankVisible[0]">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
            <ta-form-item label="银行账号"
                          :labelCol="{span:4}"
                          :wrapperCol="{span:20}"
                          fieldDecoratorId="bankNumber"
                          v-if="bankNumberVisible[0]">
              <ta-input placeholder
                        :disabled="true" />
            </ta-form-item>
          </ta-form>
        </ta-col>
      </ta-row>
    </ta-modal>
  </div>
</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      walfareType: {
        authority: '0',
        createDate: '2019-08-28',
        createUser: '1',
        label: '福利机构养育孤弃儿童',
        name: '儿童类别-福利院',
        newType: '0',
        sort: 10,
        status: '1',
        system: '1',
        type: 'CHILDCATEGORYF',
        value: '1',
        version: 1
      },
      radiovalue: '1', // 患艾滋病情况选择的数据
      radiovalues: '1', // 最有可能感染艾滋病的途径
      valueSelect: '', // 与儿童关系下拉框数据
      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      censusRegisterList: [], // 户籍性质字典数据
      adisConditionList: [], // 患艾滋病情况字典数据
      transmissionWayList: [], // 最有可能感染艾滋病途径字典数据
      paymentList: [], // 领取方式字典数据
      receiverRelationList: [], // 领取人与儿童关系字典数据
      householdRegistryClassifyList: [], // 户口分类的字典数据
      rearingTypeList: [], // 养育类型字典数据
      rearingTypeAllList: [], // 养育类型全字典数据
      addressmodel: [],
      addressOldModel: [], // 变更前的地址数据
      addressNewModel: [], // 变更后的地址数据
      idCardRequire: true, // 身份证号的必填控制
      disabled: false,
      householdRegistryVisible: true, // 控制户籍性质及户籍所在地的必填及只读

      collectionObj: {}, // 儿童信息变更的列表数据
      submitObj: {
        // 儿童信息变更时需要提交的数据
        childChangeVo: {
          id: null,
          changeDate: moment(moment().locale('zh-cn')).format('YYYY-MM-DD'),
          changeReason: null,
          childEnterId: null
        },
        childChangeHisRecordVo: []
      },
      obj: {},
      isNotSubmit: false,
      iswelfare: window.parent.indexTool.getUserInfo().orgType == '99', // 是否是福利院
      bankRequire: true, // 儿童本人开户行、儿童本人银行账号必填控制

      visible: false, // 对比弹窗的显隐
      nameVisible: [true, '姓名'],
      birthdayVisible: [true, '出生日期'],
      sexVisible: [true, '性别'],
      idCardVisible: [true, '身份证号'],
      childTypeVisible: [true, '儿童类别'],
      registerDateVisible: [true, '登记增员日期'],
      censusRegisterDatasVisible: [true, '户籍所在地'],
      censusRegisterDetailVisible: [true, '详细地址'],
      censusRegisterVisible: [true, '户籍性质'],
      householdRegistryClassifyVisible: [true, '户口分类'],
      rearingTypeVisible: [true, '养育类型'],
      adisConditionVisible: [true, '患艾滋病情况'],
      adisConditionOtherVisible: [true, '患艾滋病情况其他'],
      infectionTimeVisible: [true, '确认艾滋病感染时间'],
      transmissionWayVisible: [true, '最有可能感染艾滋病途径'],
      transmissionWayOtherVisible: [true, '最有可能感染艾滋病途径其他'],
      startTimeVisible: [true, '起领年月'],
      endTimeVisible: [true, '末领年月'],
      changeReasonVisible: [true, '变更原因'],
      receiverVisible: [true, '领取人'],
      paymentVisible: [true, '领取方式'],
      receiverRelationVisible: [true, '领取人与儿童关系'],
      receiverRelationOtherVisible: [true, '领取人与儿童关系其他'],
      openBankVisible: [true, '开户行'],
      bankNumberVisible: [true, '银行账号'],
      isFlag: false,
      birthDate: '',
      isTown: window.parent.indexTool.getUserInfo().areaLevel == 4, // 是否是乡镇用户
      childTypeCode: (window.parent.indexTool.getUserInfo().orgType == '99'
        ? 'CHILDCATEGORYF' // 儿童类别-福利院
        : (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99'
          ? 'CHILDCATEGORYM' // 儿童类别-民政局
          : 'CHILDCATEGORYA')) // 儿童类别-全
    }
  },
  activated () {
    this.childTypeList = []
    this.initDatas()
    this.getMenuDatas()
  },
  methods: {
    // 初始化数据
    async initDatas () {
      this.submitObj = {
        // 初始化
        childChangeVo: {
          id: null,
          changeDate: moment(moment().locale('zh-cn')).format('YYYY-MM-DD'),
          changeReason: null,
          childEnterId: null
        },
        childChangeHisRecordVo: []
      }
      const _self = this
      // 重置开户行、银行账号必填
      _self.bankRequire = true

      if (_self.$route.query.flag == 'edit_change') {
        _self.submitObj.childChangeVo.id = _self.$route.query.childChangeId
        await _self
          .post(_self.$route.query.url, _self.$route.query.params)
          .then(res => {
            if (res.serviceSuccess) {
              console.log(res.data.data, 322)
              _self.obj = res.data.data
              this.isFlag = _self.obj.isSuperventioned == '1'
            }
          })
      } else {
        this.isFlag = _self.$route.query.isFlag
        _self.obj = JSON.parse(_self.$route.query.obj)
      }
      _self.submitObj.childChangeVo.childEnterId = _self.obj.id
      _self.birthDate = _self.obj.birthday
      // 如果儿童有户口，则显示户籍性质和户籍所在地，无户口4则不显示
      if (
        _self.obj.householdRegistryClassify ==
        _self.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
      ) {
        _self.idCardRequire = false
        _self.householdRegistryVisible = false
        _self.addressmodel = []
      } else {
        _self.idCardRequire = true
        _self.householdRegistryVisible = true
        // 户籍所在地赋值
        _self.$nextTick(() => {
          if (_self.obj.censusRegisterPro) {
            _self.addressmodel = [
              _self.obj.censusRegisterPro ? _self.obj.censusRegisterPro : '',
              _self.obj.censusRegisterCity ? _self.obj.censusRegisterCity : '',
              _self.obj.censusRegisterCounty ? _self.obj.censusRegisterCounty : '',
              _self.obj.censusRegisterTown ? _self.obj.censusRegisterTown : ''
            ]
          }
        })
      }
      // 开户行、银行账号的必填
      _self.bankRequire = _self.obj.payment == _self.Enum.PAYMENT.YHZZ // 银行转账
      // 针对原有值为''的处理
      for (var k in _self.obj) {
        if (_self.obj[k] == '') {
          _self.obj[k] = null
        }
      }
      _self.collectionObj = JSON.parse(JSON.stringify(_self.obj)) // 变更对比的旧数据
      if (_self.collectionObj.startTime) {
        _self.collectionObj.startTime = _self.collectionObj.startTime.substring(0, 7)
      }
      _self.obj.birthday = _self.obj.birthday
        ? moment(_self.obj.birthday)
        : null
      _self.obj.registerDate = _self.obj.registerDate
        ? moment(_self.obj.registerDate)
        : null
      _self.obj.startTime = _self.obj.startTime
        ? moment(_self.obj.startTime)
        : null
      _self.obj.endTime = _self.obj.endTime
        ? moment(_self.obj.endTime)
        : null
      _self.obj.infectionTime = _self.obj.infectionTime
        ? moment(_self.obj.infectionTime)
        : null
      _self.radiovalue = _self.obj.adisCondition
      if (_self.obj.adisCondition == _self.Enum.ADISCONDITION.XDHGRAZB) {
        _self.radiovalues = _self.obj.transmissionWay
      }
      _self.valueSelect = _self.obj.receiverRelation
      _self.rearingTypeList = await this.getDictionaries(_self.obj.childType == '1' ? 'REARINGTYPEWO' : 'REARINGTYPEORG')
      _self.rearingTypeAllList = await this.getDictionaries('REARINGTYPE')
      _self.$nextTick(() => {
        _self.form.setFieldsValue(_self.obj)
      })
    },
    // 户口分类的change事件
    getRegistered (e) {
      // 有户口时，身份证必填，显示户籍性质和户籍所在地
      // 无户口时，身份证非必填，隐藏户籍性质和户籍所在地
      const oldIdCardRequire = this.idCardRequire
      this.idCardRequire = e != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
      if (oldIdCardRequire != this.idCardRequire) { // 只有当有户口切换至无户口时才清空身份证号和出生日期
        this.form.setFieldsValue({
          idCard: null,
          birthday: null
        })
      }

      this.householdRegistryVisible = e != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
      if (!this.householdRegistryVisible) {
        this.form.setFieldsValue({
          censusRegister: null,
          censusRegisterDatas: [],
          censusRegisterDetail: null
        })
      }
    },
    // 儿童基本信息的字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.censusRegisterList = await this.getDictionaries('CENSUSREGISTER') // 获取户籍性质字典数据
      this.householdRegistryClassifyList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY') // 获取户口分类字典数据
      this.principalList = await this.getDictionaries('PRINCIPAL') // 获取委托方字典数据
      this.adisConditionList = await this.getDictionaries('ADISCONDITION') // 获取患艾滋病情况字典数据
      this.transmissionWayList = await this.getDictionaries('TRANSMISSIONWAYOTHER') // 获取最有可能感染艾滋病途径字典数据
      this.paymentList = await this.getDictionaries('PAYMENT') // 获取领取方式字典数据
      this.receiverRelationList = await this.getDictionaries('RECEIVERRELATION') // 获取领取人与儿童关系字典数据
      this.childTypeList = await this.getDictionaries(this.childTypeCode) // 获取儿童类别字典数据
      this.$nextTick(() => {
        const index = this.childTypeList.findIndex(item => item.value == this.Enum.CHILDCATEGORYA.QT)
        if (index != -1) {
          this.childTypeList.splice(index, 1)
          this.childTypeList.push(this.walfareType)
        }
      })
    },
    // 选择与儿童关系
    getRelation (e) {
      this.valueSelect = e
    },
    // 领取方式change事件
    getPayment (e) {
      const _self = this
      _self.bankRequire = e == _self.Enum.PAYMENT.YHZZ // 银行转账

      _self.form.setFields({
        openBank: {
          value: null,
          errors: null
        },
        bankNumber: {
          value: null,
          errors: null
        }
      })
    },
    // 患艾滋病情况
    radiochange (val) {
      this.radiovalue = val.target.value + ''
      if (val.target.value != this.Enum.ADISCONDITION.QT) {
        this.radiovalues = ''
      }
    },
    // 最有可能感染艾滋病途径
    channel (val) {
      this.radiovalues = val.target.value + ''
    },
    back () {
      // 返回到followUp页
      this.$router.go(-1)
      this.form.resetFields()
    },
    // 地址传值
    setaddress () {
      this.form.setFieldsValue({
        censusRegisterDatas: this.addressmodel
      })
    },
    // 变更前地址传值
    setOldAddress () {
      this.oldform.setFieldsValue({
        censusRegisterDatas: this.addressOldModel
      })
    },
    // 变更后地址传值
    setNewAddress () {
      this.newform.setFieldsValue({
        censusRegisterDatas: this.addressNewModel
      })
    },
    async idCardValid (rule, value, callback) {
      const _self = this
      let params = {}
      if (!value) {
        this.idCardRequire ? callback('请输入身份证号') : callback()
      }
      if (value == this.obj.idCard) {
        params = {
          childId: this.obj.childId,
          idCard: value
        }
      } else {
        params = {
          idCard: value
        }
      }
      if (this.isNotSubmit) {
        callback()
      } else {
        await this.post('/checkChildApi/verifyChildIdCardUnique', params).then((res) => {
          if (res.errors == null) {
            this.idCardValidate(rule, value, callback, _self)
          } else {
            this.form.setFieldsValue({
              idCard: this.obj.idCard
            })
          }
        })
      }
    },
    // 根据身份证号回显性别、年龄、生日（不需要可以不定义）
    callbackByIdCard (sex, age, birth) {
      this.birthDate = birth
      // 性别、年龄、生日等赋值
      if (this.isFlag) {
        this.form.setFieldsValue({
          birthday: birth ? moment(birth) : null
        })
      } else {
        this.form.setFieldsValue({
          birthday: birth ? moment(birth) : null,
          endTime: birth ? moment(birth, 'YYYY-MM').add({ years: 18 }) : null
        })
      }
    },
    disabledEndDate (current) {
      if (this.birthDate) {
        return current > moment(this.birthDate, 'YYYY-MM').add({ years: 18 })
      }
    },
    // 变更对比后的提交
    handleOk () {
      this.submitObj.childChangeVo.changeReason = this.form.getFieldsValue().changeReason
      this.post('/childInfoApi/submitChildChange', this.submitObj, true).then(
        res => {
          if (res.serviceSuccess) {
            this.$message.success('信息提交成功！')
            this.form.resetFields()
            this.oldform.resetFields()
            this.newform.resetFields()
            this.visible = false
            this.back()
          }
        }
      )
    },
    handleCancel () {
      this.visible = false
    },
    submit () {
      this.isNotSubmit = true
      // 选择无户口提交取消后再选择有户口会出现校验不到的问题
      if (this.householdRegistryVisible) {
        if (!this.form.getFieldsValue().censusRegisterDatas || this.form.getFieldsValue().censusRegisterDatas.length == 0) {
          this.form.setFields({
            censusRegisterDatas: {
              value: [],
              errors: '请选择户籍所在地'
            }
          })
        }
        if (!this.form.getFieldsValue().censusRegisterDetail) {
          this.form.setFields({
            censusRegisterDetail: {
              value: null,
              errors: '请输入详细地址'
            }
          })
        }
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          // 户籍所在地、户籍性质处理
          this.censusRegisterDatasVisible[0] = false
          this.censusRegisterDetailVisible[0] = false
          this.censusRegisterVisible[0] = false

          const form = this.form.getFieldsValue() // 新对象

          // 如果页面显示了户籍所在地，则进行户籍变更对比
          if (this.householdRegistryVisible) {
            // 添加省市县数据、并删除新对象原有区划数组
            form.censusRegisterPro =
              form.censusRegisterDatas != undefined
                ? form.censusRegisterDatas[0]
                : null
            form.censusRegisterCity =
              form.censusRegisterDatas != undefined
                ? form.censusRegisterDatas[1]
                : null
            form.censusRegisterCounty =
              form.censusRegisterDatas != undefined
                ? form.censusRegisterDatas[2]
                : null
            form.censusRegisterTown =
              form.censusRegisterDatas != undefined
                ? form.censusRegisterDatas[3]
                : null
            delete form.censusRegisterDatas
          }

          // 新对象时间格式数据处理
          form.birthday = form.birthday
            ? moment(form.birthday).format('YYYY-MM-DD')
            : null
          form.registerDate = form.registerDate
            ? moment(form.registerDate).format('YYYY-MM-DD')
            : null
          form.startTime = form.startTime
            ? moment(form.startTime).format('YYYY-MM')
            : null
          form.endTime = form.endTime
            ? moment(form.endTime).format('YYYY-MM')
            : null
          form.infectionTime = form.infectionTime
            ? moment(form.infectionTime).format('YYYY-MM-DD')
            : null

          // 未显示其他原因时添加患艾滋病其他原因字段用做遍历控制显隐
          if (form.adisCondition != this.Enum.ADISCONDITION.QT) {
            form.adisConditionOther = null
          }
          // 患艾滋病情况非携带感染时，添加感染时间，感染途径及其他
          if (form.adisCondition != this.Enum.ADISCONDITION.XDHGRAZB) {
            form.infectionTime = null
            form.transmissionWay = null
            form.transmissionWayOther = null
          } else if (
            form.transmissionWay != this.Enum.TRANSMISSIONWAYOTHER.QT
          ) {
            // 携带非其他
            form.transmissionWayOther = null
          }
          const { collectionObj } = this // 旧对象
          const oldObj = {} // 变更前展示的对象
          const newObj = {} // 变更后展示的对象
          const changeAttr = [] // 变更数据存放的数组
          let areaShow = false // 判断省市县是否显示
          const areaAttr = [
            'censusRegisterPro',
            'censusRegisterCity',
            'censusRegisterCounty',
            'censusRegisterTown',
            'censusRegisterDetail'
          ]
          for (var k in form) {
            const changeObj = {}
            if (form[k] == '') {
              // 针对原有null值，编辑后再次清空为''的情况处理
              form[k] = null
            }

            // 除区划外的处理（显示dom）
            if (areaAttr.indexOf(k) == -1) {
              if (form[k] != collectionObj[k] && k != 'changeReason') {
                // 除变更原因之外的变更
                this.visible = true // 变更弹窗显示
                // 后台接口所需参数处理 start
                changeObj.changeAfter = form[k]
                changeObj.changeBefore = collectionObj[k] || ''
                changeObj.changeColumnName = this[`${k}Visible`][1]
                changeObj.columnName = k
                changeAttr.push(changeObj) // 后台接口提交时需要的数据
                // 后台接口所需参数处理 end

                this[`${k}Visible`][0] = true

                // 旧对象时间格式数据处理
                if (
                  k == 'birthday' ||
                  k == 'registerDate' ||
                  k == 'startTime' ||
                  k == 'infectionTime'
                ) {
                  collectionObj[k] = collectionObj[k]
                    ? moment(collectionObj[k])
                    : null
                  form[k] = form[k] ? moment(form[k]) : null
                }
                if (k == 'endTime') {
                  collectionObj[k] = collectionObj[k] ? moment(collectionObj[k], 'YYYY-MM') : null
                  form[k] = form[k] ? moment(form[k], 'YYYY-MM') : null
                }
              } else if (
                k != 'censusRegisterPro' &&
                k != 'censusRegisterCity' &&
                k != 'censusRegisterCounty' &&
                k != 'censusRegisterTown'
              ) {
                // 区划外未变更的隐藏dom
                this[`${k}Visible`][0] = false
              }
            } else {
              // 区划处理
              if (form[k] != collectionObj[k]) {
                // 有变更
                this.visible = true // 变更弹窗显示
                areaShow = true
              }
            }

            // 赋值给变更前后需展示的对象
            oldObj[k] = collectionObj[k]
            newObj[k] = form[k]
          }
          // 患艾滋病情况非携带感染时，添加感染时间，感染途径及其他隐藏
          if (form.adisCondition != this.Enum.ADISCONDITION.XDHGRAZB) {
            this.infectionTimeVisible[0] = false
            this.transmissionWayVisible[0] = false
            this.transmissionWayOtherVisible[0] = false
          }
          // 领取人与儿童关系为非其他时，其他隐藏
          if (form.receiverRelation != this.Enum.RECEIVERRELATION.QT) {
            this.receiverRelationOtherVisible[0] = false
          }
          if (areaShow || (!areaShow && changeAttr.length > 0)) {
            // 存在变更的数据
            if (areaShow) {
              // 区划地址有变更
              this.censusRegisterDatasVisible[0] = true
              this.censusRegisterDetailVisible[0] = true
              for (var i = 0; i < areaAttr.length; i++) {
                const k = areaAttr[i]
                const changeObj = {}
                changeObj.changeAfter = form[k]
                changeObj.changeBefore = collectionObj[k] || ''
                changeObj.changeColumnName =
                  k == 'censusRegisterPro'
                    ? '省'
                    : k == 'censusRegisterCity'
                      ? '市'
                      : k == 'censusRegisterCounty'
                        ? '县'
                        : k == 'censusRegisterTown'
                          ? '乡镇'
                          : this[`${k}Visible`][1]
                changeObj.columnName = k
                changeAttr.push(changeObj) // 后台接口提交时需要的数据
              }
              this.$nextTick(() => {
                // 变更前地址赋值
                this.addressOldModel = [
                  collectionObj.censusRegisterPro,
                  collectionObj.censusRegisterCity,
                  collectionObj.censusRegisterCounty,
                  collectionObj.censusRegisterTown
                ]
                // 变更后地址赋值
                this.addressNewModel = [
                  form.censusRegisterPro,
                  form.censusRegisterCity,
                  form.censusRegisterCounty,
                  form.censusRegisterTown
                ]
              })
            }
            this.submitObj.childChangeHisRecordVo = changeAttr

            // 变更弹窗除区划外的其他数据的赋值，并调整样式
            this.$nextTick(() => {
              this.oldform.setFieldsValue(oldObj)
              this.newform.setFieldsValue(newObj)
            })
          } else {
            this.$message.error('没有数据变更！')
          }
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
      this.isNotSubmit = false
    },
    // 儿童类别change
    async selectchange (val) {
      // 儿童类别为艾滋病毒感染儿童时，患艾滋病情况默认为携带或感染艾滋病
      const adisCondition = val == this.Enum.CHILDCATEGORYA.AZBBDGRET ? this.Enum.ADISCONDITION.XDHGRAZB : this.Enum.ADISCONDITION.WAZB
      this.form.setFieldsValue({ adisCondition })
      this.radiovalue = adisCondition
      this.form.setFieldsValue({ rearingType: undefined })
      this.rearingTypeList = await this.getDictionaries(val == '1' ? 'REARINGTYPEWO' : 'REARINGTYPEORG')
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.foruout {
  width: 83%;
  padding-top: 1px;
}
.inbut {
  width: 77px;
  background-color: #1890ff;
  left: 92%;
  color: #ffffffe8;
  font-size: 16.5px;
  margin-bottom: 12px;
}
.centerclass {
  text-align: center;
}
.otherclass {
  float: right;
  width: 200px;
  margin-right: 100px;
  margin-bottom: 0;
}
</style>
