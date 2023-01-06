<template>
  <div class="conts">
    <div class="contin">

      <div class="item_title">
        <div class="lines"></div>
        <p class="item_text"
           style="width:120px">基本信息变更</p>
        <div class="horizontalline"></div>
      </div>
      <div>
        <ta-form layout="horizontal"
                 style="margin-top: 2%;"
                 :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
          <ta-row class="fromcom">
            <ta-col :span="8">
              <ta-form-item fieldDecoratorId="name"
                            :fieldDecoratorOptions="rules.name"
                            label="儿童姓名">
                <ta-input placeholder="请输入儿童姓名"
                          @blur="sendDataToRecipient('name')" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="性别"
                            fieldDecoratorId="sex"
                            :fieldDecoratorOptions="rules.sex">
                <ta-select placeholder="请选择性别"
                           :disabled="disabled">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in sexList"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="身份证号"
                            :fieldDecoratorOptions="!disabledHouse?rules.idCard:rules.idCard2"
                            fieldDecoratorId="idCard">
                <ta-input placeholder="请输入身份证号"
                          :disabled='disabledHouse || isFlag'
                          @blur="sendDataToRecipient('idCard')" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="户口分类"
                            fieldDecoratorId="householdRegistryClassify"
                            :fieldDecoratorOptions="rules.householdRegistryClassify">
                <ta-select placeholder="请选择户口分类"
                           :disabled="disabled"
                           @change="houseChange">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in houseHoldList"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="户籍性质"
                            fieldDecoratorId="censusRegister"
                            :fieldDecoratorOptions="!disabledHouse?rules.censusRegister:this.selectNotMust()">
                <ta-select :placeholder="disabledHouse?'':'请选择户籍性质'"
                           :disabled="disabledHouse">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in censusregisterList"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="出生日期"
                            fieldDecoratorId="birthday"
                            :fieldDecoratorOptions="!disabledHouse?this.selectNotMust() :this.verificationRules('出生日期', true)">
                <ta-date-picker style="width: 100%"
                                :disabledDate="disabledDate"
                                :disabled="!disabledHouse " />
              </ta-form-item>
            </ta-col>
            <!-- <ta-col :span="24"> -->
            <ta-col :span="12">
              <AddressComponent :addressmodel="addressmodel"
                                :disabled="disabledHouse"
                                arealevel="4"
                                :clearPlaceHolder="disabledHouse"
                                :isRequire="!disabledHouse"
                                @setaddress="setaddress"
                                :msg="'户籍所在地'"
                                :labelwidth="{label: 5,wrapper: 19}"></AddressComponent>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label
                            fieldDecoratorId="censusRegisterDetail"
                            :labelCol="{ span: 0 }"
                            :wrapperCol="{ span: 23,offset:1 }"
                            :fieldDecoratorOptions="rules.censusRegisterDetail">
                <ta-input :placeholder="disabledHouse?'':'请输入详细户籍地址'"
                          :disabled="disabledHouse" />
              </ta-form-item>
            </ta-col>

          </ta-row>
        </ta-form>
      </div>
      <div>
        <div class="item_title">
          <div class="lines"></div>
          <p class="item_text"
             style="width:185px">基本生活补贴发放情况变更</p>
          <div class="horizontalline"></div>
        </div>
        <ta-form layout="horizontal"
                 style="margin-top: 2%;"
                 :autoFormCreate="(baselifeForm)=>{this.baselifeForm = baselifeForm}">
          <livingCostsGrant :controMustTip="controMustTip"
                            :isshow="false"
                            :controMustTip2="controMustTip2"
                            :hasSecurityMoney="hasSecurityMoney"
                            @controMustTipChange="controMustTipChange"
                            :disabled="disabled"
                            :iswelfare="iswelfare"
                            :isFlag="isFlag"
                            :birthDate="birthDate"
                            @idCardValid="idCardValid"
                            @idCardTypeValue="idCardTypeValue"
                            @sendDataToRecipient="sendDataToRecipient"
                            @sendAllToRecipient="sendAllToRecipient"
                            :ishide.sync="ishide"
                            @relevechange="relevechange"
                            :receiverToChildRelationhide.sync="receiverToChildRelationhide"
                            :idCardTypeList="idCardTypeList"
                            ref="baselifeForm"></livingCostsGrant>
        </ta-form>
      </div>
      <ta-form layout="horizontal"
               style="margin-top: 2%;"
               :autoFormCreate="(cptAdoptorFrom1)=>{this.cptAdoptorFrom1 = cptAdoptorFrom1}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-form-item label="变更原因"
                          :fieldDecoratorOptions="rules.changeReason"
                          fieldDecoratorId="changeReason"
                          :labelCol="{ span: 2 }"
                          :wrapperCol="{ span: 22 }">
              <ta-textarea placeholder="请输入变更原因"
                           :rows="4"
                           :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
      <div class="bom">
        <ta-button class="btnleft"
                   @click="backs">返回</ta-button>
        <ta-button type="primary"
                   class="btnleft"
                   @click="submit()">提交</ta-button>
      </div>

      <!-- 申请变更提交确认弹窗 -->
      <div>
        <ta-modal title="提交确认"
                  :width="'90%'"
                  :closable="false"
                  @close="onCloseCanle"
                  :visible="editVisible">
          <div>
            <ta-row class="fromintop">
              <ta-radio-group class="radio_grops">
                <ta-col :span="12"
                        type="flex"
                        justify="center"
                        align="middle">
                  <div>变更前</div>
                </ta-col>
                <ta-col :span="12"
                        type="flex"
                        justify="center"
                        align="middle">
                  <div>变更后</div>
                </ta-col>
              </ta-radio-group>
            </ta-row>
            <ta-form :autoFormCreate="(oldform)=>{this.oldform = oldform}">
              <ta-row class="frominadd">
                <ta-col :span="12">
                  <ta-form-item label="儿童姓名"
                                fieldDecoratorId="copy_name"
                                v-if="nameVisible[0]">
                    <ta-input :disabled="true" />
                  </ta-form-item>
                  <ta-form-item label="性别"
                                fieldDecoratorId="copy_sex"
                                v-if="sexVisible[0]">
                    <ta-select style="width : 100%"
                               :disabled="true">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in sexList "
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="身份证号"
                                fieldDecoratorId="copy_idCard"
                                v-if="idCardVisible[0]">
                    <ta-input :disabled="true" />
                  </ta-form-item>
                  <ta-form-item label="户籍性质"
                                fieldDecoratorId="copy_censusRegister"
                                v-if="censusRegisterVisible[0]">
                    <ta-select :disabled="true"
                               style="width : 100%">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in censusregisterList "
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="户口分类"
                                fieldDecoratorId="copy_householdRegistryClassify"
                                v-if="householdRegistryClassifyVisible[0]">
                    <ta-select :disabled="true"
                               style="width : 100%">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in houseHoldList "
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="出生日期"
                                fieldDecoratorId="copy_birthday"
                                v-if="birthdayVisible[0]">
                    <ta-date-picker style="width: 100%"
                                    :disabled="true" />
                  </ta-form-item>
                  <AddressComponent :addressmodel="addressOldModel"
                                    :msg="'户籍所在地'"
                                    :disabled="true"
                                    :clearPlaceHolder="true"
                                    :isRequire="false"
                                    fileldName="copy_censusRegisterDatas"
                                    @setaddress="setOldAddress"
                                    v-if="censusRegisterDatasVisible[0]"></AddressComponent>
                  <ta-form-item label
                                fieldDecoratorId="copy_censusRegisterDetail"
                                :labelCol="{ span: 0 }"
                                :wrapperCol="{ span: 18,offset:6 }"
                                v-if="censusRegisterDatasVisible[0]">
                    <ta-input :disabled="true" />
                  </ta-form-item>
                  <!-- ***************** -->
                  <ta-form-item label="是否享受福利补贴"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{span:14}"
                                v-if="isEnjoyMoneyVisible[0]"
                                fieldDecoratorId="copy_isEnjoyMoney">
                    <ta-radio-group :disabled="true">
                      <ta-radio :value="'0'">否</ta-radio>
                      <ta-radio :value="'1'">是</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>

                  <ta-form-item label="是否集中供养"
                                hidden
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{span:14}"
                                fieldDecoratorId="copy_isConcentratedFeed">

                    <ta-radio-group :disabled="true">
                      <ta-radio :value="'0'">否</ta-radio>
                      <ta-radio :value="'1'">是</ta-radio>
                    </ta-radio-group>

                  </ta-form-item>

                  <ta-form-item label="领取方式"
                                fieldDecoratorId="copy_receiveWay"
                                v-if="receiveWayVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-select placeholder="请选择领取方式"
                               :disabled='true'>
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in receiveList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="证件类型"
                                fieldDecoratorId="copy_memberIdType"
                                v-if="memberIdTypeVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-select placeholder="请选择证件类型"
                               :disabled='true'>
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in idCardTypeList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="开户银行"
                                fieldDecoratorId='copy_depositBank'
                                v-if="depositBankVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">

                    <ta-input placeholder="请输入开户银行"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="起领年月"
                                fieldDecoratorId="copy_startReceiveDate"
                                v-if="startReceiveDateVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-month-picker style="width:100%"
                                     placeholder='请选择起领年月'
                                     :disabled='true' />
                  </ta-form-item>
                  <ta-form-item label="末领年月"
                                fieldDecoratorId="copy_endReceiveDate"
                                v-if="endReceiveDateVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-month-picker style="width:100%"
                                     placeholder='请选择末领年月'
                                     :disabled='true' />
                  </ta-form-item>
                  <ta-form-item label="领取人证件号码"
                                key='1'
                                fieldDecoratorId="copy_receiverIdCard"
                                v-if="receiverIdCardVisible[0]"
                                :labelCol="{ span: 9 }"
                                :wrapperCol="{ span: 15 }">
                    <ta-input placeholder="请输入领取人证件号码"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="银行账号"
                                fieldDecoratorId='copy_bankAccount'
                                v-if="bankAccountVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-input :disabled='true' />

                  </ta-form-item>

                  <ta-form-item label="保障金额（元）"
                                fieldDecoratorId='copy_securityMoney'
                                v-if="securityMoneyVisible[0]"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{ span: 14 }">
                    <ta-input-number :min="0"
                                     :max="9999"
                                     :precision='2'
                                     :disabled='true'
                                     style="width:100%"
                                     placeholder='请输入保障金额' />
                  </ta-form-item>
                  <ta-form-item label="领取人联系电话"
                                fieldDecoratorId='copy_contactNumber'
                                v-if="contactNumberVisible[0]"
                                :labelCol="{ span: 9 }"
                                :wrapperCol="{ span: 15 }">
                    <ta-input placeholder="请输入领取人联系电话"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="开户人"
                                fieldDecoratorId='copy_openCardPerson'
                                v-if="openCardPersonVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-input :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="领取人"
                                fieldDecoratorId='copy_receiverName'
                                v-if="receiverNameVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-input placeholder="请输入领取人"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="领取人与儿童关系"
                                v-if="receiverToChildRelationVisible[0]"
                                fieldDecoratorId='copy_receiverToChildRelation'>
                    <ta-select placeholder="领取人与儿童关系"
                               :disabled='true'>
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in relationList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>

                  <ta-form-item label="其他信息"
                                v-if="relationshipOtherVisible[0]"
                                fieldDecoratorId="copy_relationshipOther"
                                :wrapperCol="{ span: 24}">
                    <ta-input placeholder="请输入其他信息"
                              :disabled='true' />
                  </ta-form-item>

                  <!--  *******************-->
                </ta-col>
                <ta-col :span="12">
                  <ta-form-item label="姓名"
                                fieldDecoratorId="name"
                                v-if="nameVisible[0]">
                    <ta-input :disabled="true" />
                  </ta-form-item>
                  <ta-form-item label="性别"
                                fieldDecoratorId="sex"
                                v-if="sexVisible[0]">
                    <ta-select style="width : 100%"
                               :disabled="true">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in sexList "
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="身份证号"
                                fieldDecoratorId="idCard"
                                v-if="idCardVisible[0]">
                    <ta-input :disabled="true" />
                  </ta-form-item>

                  <ta-form-item label="户籍性质"
                                fieldDecoratorId="censusRegister"
                                v-if="censusRegisterVisible[0]">
                    <ta-select :disabled="true"
                               style="width : 100%">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in censusregisterList "
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="户口分类"
                                fieldDecoratorId="householdRegistryClassify"
                                v-if="householdRegistryClassifyVisible[0]">
                    <ta-select :disabled="true"
                               style="width : 100%">
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in houseHoldList "
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="出生日期"
                                fieldDecoratorId="birthday"
                                v-if="birthdayVisible[0]">
                    <ta-date-picker style="width: 100%"
                                    :disabled="true" />
                  </ta-form-item>
                  <AddressComponent :addressmodel="addressChangeModel"
                                    :msg="'户籍所在地'"
                                    :disabled="true"
                                    :clearPlaceHolder="true"
                                    :isRequire="false"
                                    fileldName="censusRegisterDatas"
                                    @setaddress="setNewAddress"
                                    v-if="censusRegisterDatasVisible[0]"></AddressComponent>
                  <ta-form-item label
                                fieldDecoratorId="censusRegisterDetail"
                                :labelCol="{ span: 0 }"
                                :wrapperCol="{ span: 18,offset:6 }"
                                v-if="censusRegisterDatasVisible[0]"
                                :fieldDecoratorOptions="rules.censusRegisterDetail">
                    <ta-input :disabled="true" />
                  </ta-form-item>

                  <!-- ***************** -->
                  <ta-form-item label="是否享受福利补贴"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{span:14}"
                                v-if="isEnjoyMoneyVisible[0]"
                                fieldDecoratorId="isEnjoyMoney">
                    <ta-radio-group :disabled="true">
                      <ta-radio :value="'0'">否</ta-radio>
                      <ta-radio :value="'1'">是</ta-radio>
                    </ta-radio-group>
                  </ta-form-item>

                  <ta-form-item label="是否集中供养"
                                hidden
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{span:14}"
                                fieldDecoratorId="isConcentratedFeed">

                    <ta-radio-group :disabled="true">
                      <ta-radio :value="'0'">否</ta-radio>
                      <ta-radio :value="'1'">是</ta-radio>
                    </ta-radio-group>

                  </ta-form-item>

                  <ta-form-item label="领取方式"
                                fieldDecoratorId="receiveWay"
                                v-if="receiveWayVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-select placeholder="请选择领取方式"
                               :disabled='true'>
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in receiveList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="证件类型"
                                fieldDecoratorId="memberIdType"
                                v-if="memberIdTypeVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-select placeholder="请选择证件类型"
                               :disabled='true'>
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in idCardTypeList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                  <ta-form-item label="开户银行"
                                v-if="depositBankVisible[0]"
                                fieldDecoratorId='depositBank'
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">

                    <ta-input placeholder="请输入开户银行"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="起领年月"
                                v-if="startReceiveDateVisible[0]"
                                fieldDecoratorId="startReceiveDate"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-month-picker style="width:100%"
                                     placeholder='请选择起领年月'
                                     :disabled='true' />
                  </ta-form-item>
                  <ta-form-item label="末领年月"
                                v-if="endReceiveDateVisible[0]"
                                fieldDecoratorId="endReceiveDate"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-month-picker style="width:100%"
                                     placeholder='请选择末领年月'
                                     :disabled='true' />
                  </ta-form-item>
                  <ta-form-item label="领取人证件号码"
                                key='1'
                                fieldDecoratorId="receiverIdCard"
                                v-if="receiverIdCardVisible[0]"
                                :labelCol="{ span: 9 }"
                                :wrapperCol="{ span: 15 }">
                    <ta-input placeholder="请输入领取人证件号码"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="银行账号"
                                v-if="bankAccountVisible[0]"
                                fieldDecoratorId='bankAccount'
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-input :disabled='true' />

                  </ta-form-item>

                  <ta-form-item label="保障金额（元）"
                                fieldDecoratorId='securityMoney'
                                v-if="securityMoneyVisible[0]"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{ span: 14 }">
                    <ta-input-number :min="0"
                                     :max="9999"
                                     :precision='2'
                                     :disabled='true'
                                     style="width:100%"
                                     placeholder='请输入保障金额' />
                  </ta-form-item>
                  <ta-form-item label="领取人联系电话"
                                fieldDecoratorId='contactNumber'
                                v-if="contactNumberVisible[0]"
                                :labelCol="{ span: 9 }"
                                :wrapperCol="{ span: 15 }">
                    <ta-input placeholder="请输入领取人联系电话"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="开户人"
                                fieldDecoratorId='openCardPerson'
                                v-if="openCardPersonVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-input :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="领取人"
                                fieldDecoratorId='receiverName'
                                v-if="receiverNameVisible[0]"
                                :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 16 }">
                    <ta-input placeholder="请输入领取人"
                              :disabled='true' />
                  </ta-form-item>

                  <ta-form-item label="领取人与儿童关系"
                                v-if="receiverToChildRelationVisible[0]"
                                fieldDecoratorId='receiverToChildRelation'>
                    <ta-select placeholder="领取人与儿童关系"
                               :disabled='true'>
                      <ta-select-option :value="item.value"
                                        v-for="(item,index) in relationList"
                                        :key="index">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>

                  <ta-form-item label="其他信息"
                                v-if="relationshipOtherVisible[0]"
                                fieldDecoratorId="relationshipOther"
                                :wrapperCol="{ span: 24}">
                    <ta-input placeholder="请输入其他信息"
                              :disabled='true' />
                  </ta-form-item>

                </ta-col>
              </ta-row>

            </ta-form>
          </div>
          <div slot="footer">
            <ta-button key="back"
                       @click="handleOkRevoke('0')">取消</ta-button>
            <ta-button key="submit"
                       type="primary"
                       @click="handleOkRevoke('1')">确定</ta-button>
          </div>
        </ta-modal>
      </div>
    </div>
  </div>
</template>
<script>
import livingCostsGrant from './livingCostsGrant.vue'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    livingCostsGrant,
    AddressComponent

  },
  data () {
    return {
      homeList: [],
      id: '',
      oldIdCard: '',
      birthDate: '',
      relationList: [],
      receiveList: [],
      idCardTypeList: [],
      receiverToChildRelationhide: false,
      ishide: true,
      iswelfare: false,
      controMustTip: true,
      controMustTip2: false,

      showone: true,
      sexList: [],
      disabled: false,
      addressmodel: [],
      editVisible: false,
      disabledHouse: false,
      isFlag: false,
      goType: '0',
      addUnattendedId: '',
      changeBaseId: '',
      censusregisterList: [],
      houseHoldList: [],
      codelist: [],
      addressOldModel: [], // 变更前的地址数据
      addressChangeModel: [], // 变更后的地址数据
      collectionObj: {},
      unattendedObj: {},
      unattendedObjAfter: {},
      unattendedObjBefore: {},
      nameVisible: [false, '姓名'],
      idCardVisible: [false, '身份证号'],
      sexVisible: [false, '联系人'],
      censusRegisterVisible: [false, '户籍性质'],
      householdRegistryClassifyVisible: [false, '户口分类'],
      censusRegisterDatasVisible: [false, '户籍所在地'],
      birthdayVisible: [false, ''],
      //,
      isEnjoyMoneyVisible: [false, ' '],
      receiveWayVisible: [false, ' '],
      memberIdTypeVisible: [false, ' '],
      depositBankVisible: [false, ' '],
      startReceiveDateVisible: [false, ' '],
      endReceiveDateVisible: [false, ' '],
      receiverIdCardVisible: [false, ' '],
      bankAccountVisible: [false, ' '],
      securityMoneyVisible: [false, ' '],
      contactNumberVisible: [false, ' '],
      openCardPersonVisible: [false, ' '],
      receiverNameVisible: [false, ' '],
      receiverToChildRelationVisible: [false, ' '],
      relationshipOtherVisible: [false, ' '],
      isNotSubmit: false,
      hasSecurityMoney: true, // 保障金额是否有值
      // censusRegisterDetailVisible: [false, '详细地址'],
      rules: {
        sex: this.verificationRules('性别'),
        name: this.verificationRules('儿童姓名', 72),
        censusRegister: this.verificationRules('户籍性质'),
        householdRegistryClassify: this.verificationRules('户口分类'),
        changeReason: this.verificationRules('变更原因', 200, true),
        censusRegisterDetail: this.verificationRulesNotMustFill('户籍所在地详情', 100),
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        },
        idCard2: {
          validateTrigger: 'blur',
          rules: [{ validator: this.idcardrole }]
        }
      }
    }
  },
  activated () {
    this.loadData()
    this.getsexList()
    this.getdefaultads()
    this.getCensusregisterList()
    this.getHouseHoldList()
    const paramsData = JSON.parse(this.$route.query.paramsData)
    const goTypeTemp = paramsData.goType // 标志是在哪个页面跳转过来的
    if (goTypeTemp == 'factRaiseChildInfoChange-apply') {
      // 变更申请
      this.goType = '1'
      this.addUnattendedId = paramsData.obj.addUnattendedId
      this.getDetails()
    } else if (goTypeTemp == 'factRaiseChildInfoChange-edit') {
      // 变更申请记录编辑
      this.goType = '2'
      this.addUnattendedId = paramsData.obj.addUnattendedId
      this.changeBaseId = paramsData.obj.changeBaseId
      this.getDetails()
    }
  },
  mounted () { this.getidCardTypeList() },
  methods: {
    loadData () {
      this.$refs.baselifeForm.isSelf2 = false
      this.$refs.baselifeForm.isSelf = false
      this.cptAdoptorFrom1.resetFields()
      this.homeList = []
      this.oldIdCard = ''
      this.birthDate = ''
      this.isFlag = false
      this.id = ''
      this.showone = true
      this.cptAdoptorFrom.resetFields()
      this.collectionObj = {}
      this.unattendedObj = {}
      this.unattendedObjAfter = {}
      this.unattendedObjBefore = {}
      this.nameVisible = [false, '姓名']
      this.idCardVisible = [false, '身份证号']
      this.sexVisible = [false, '联系人']
      this.censusRegisterVisible = [false, '户籍性质']
      this.householdRegistryClassifyVisible = [false, '户口分类']
      this.censusRegisterDatasVisible = [false, '户籍所在地']
      this.birthdayVisible = [false, '']
      this.disabledHouse = false

      this.isEnjoyMoneyVisible = [false, ' ']
      this.receiveWayVisible = [false, ' ']
      this.memberIdTypeVisible = [false, ' ']
      this.depositBankVisible = [false, ' ']
      this.startReceiveDateVisible = [false, ' ']
      this.endReceiveDateVisible = [false, ' ']
      this.receiverIdCardVisible = [false, ' ']
      this.bankAccountVisible = [false, ' ']
      this.securityMoneyVisible = [false, ' ']
      this.contactNumberVisible = [false, ' ']
      this.openCardPersonVisible = [false, ' ']
      this.receiverNameVisible = [false, ' ']
      this.receiverToChildRelationVisible = [false, ' ']
      this.relationshipOtherVisible = [false, ' ']

      this.receiverToChildRelationhide = false
      this.controMustTip = true
      this.controMustTip2 = false
      this.ishide = true
      // 区分福利院和乡镇督导员
      const areaLevels = window.parent.indexTool.getUserInfo().areaLevel
      const orgTypes = window.parent.indexTool.getUserInfo().orgType

      if (orgTypes == '99') {
        this.iswelfare = true
      } else {
        this.iswelfare = false
      }
      this.baselifeForm.resetFields()
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
    async getidCardTypeList () {
      const data = await this.getDictionaries('IDCARD_TYPE')
      this.idCardTypeList = data
    },
    relevechange (val) {
      this.ishide = val
    },
    // 领取人关系切换为父母亲或本人时同步父母亲或本人数据到领取人
    sendAllToRecipient (formName) {
      if (formName == 'baseForm') {
        const file = this.cptAdoptorFrom.getFieldsValue()
        this.baselifeForm.setFieldsValue({
          receiverIdCard: file.idCard ? file.idCard : '',
          memberIdType: this.Enum.IDCARD_TYPE.NDJMSFZ,
          receiverName: file.name ? file.name : ''
        })
      }
      if (formName == 'fatherForm' || formName == 'motherForm') {
        let fatherInfo = []
        let motherInfo = []
        this.homeList.forEach((e, i) => {
          if (e.typeRelation == '1') {
            fatherInfo = e
          }
          if (e.typeRelation == '2') {
            motherInfo = e
          }
        })
        if (formName == 'fatherForm') {
          this.baselifeForm.setFieldsValue({
            receiverIdCard: fatherInfo.idCard ? fatherInfo.idCard : '',
            memberIdType: fatherInfo.memberIdType ? fatherInfo.memberIdType : '',
            receiverName: fatherInfo.name ? fatherInfo.name : '',
            contactNumber: fatherInfo.contactNumber ? fatherInfo.contactNumber : ''
          })
        }
        if (formName == 'motherForm') {
          this.baselifeForm.setFieldsValue({
            receiverIdCard: motherInfo.idCard ? motherInfo.idCard : '',
            memberIdType: motherInfo.memberIdType ? motherInfo.memberIdType : '',
            receiverName: motherInfo.name ? motherInfo.name : '',
            contactNumber: motherInfo.contactNumber ? motherInfo.contactNumber : ''
          })
        }
      }
    },
    sendDataToRecipient (name, setFormName, getFormName, val) {
      const baselifeForm = this.baselifeForm.getFieldsValue()

      const childFlag = baselifeForm.receiverToChildRelation == this.Enum.RELATION.BR

      if (childFlag) {
        if (name == 'name') {
          this.baselifeForm.setFieldsValue({
            receiverName: this.cptAdoptorFrom.getFieldsValue()[name]
          })
        } else {
          this.baselifeForm.setFieldsValue({
            receiverIdCard: this.cptAdoptorFrom.getFieldsValue()[name]
          })
        }
      }
    },
    idCardTypeValue (val) {
      this[val].setFieldsValue({
        receiverIdCard: undefined
      })
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

    houseChange (val) {
      const disabledHouse = val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
      this.disabledHouse = disabledHouse

      if (this.disabledHouse && this.$refs.baselifeForm.isSelf) {
        this.baselifeForm.setFieldsValue({
          receiverIdCard: undefined
        })
      }
      this.householdRegistryClassifychange(val)
    },
    houseChangeSS (val) {
      const disabledHouse = val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
      this.disabledHouse = disabledHouse
      if (this.disabledHouse && this.$refs.baselifeForm.isSelf) {
        this.baselifeForm.setFieldsValue({
          receiverIdCard: undefined
        })
      }
    },
    householdRegistryClassifychange (val) {
      if (val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) {
        this.cptAdoptorFrom.setFieldsValue({
          idCard: undefined,
          address_Linkage: [],
          censusRegister: undefined,
          censusRegisterDetail: undefined
        })
      }
      if (
        val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.FLYJTH ||
        val == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.BXQHK
      ) {
        // this.getdefaultads()
        const data = this.cptAdoptorFrom.getFieldsValue()
        if (!data.address_Linkage || data.address_Linkage.length == 0) {
          this.addressmodel = [...this.codelist]
        }
      }
    },
    // 获取默认地址
    async getdefaultads () {
      const params = {
        areaCode: window.parent.indexTool.getUserInfo().areaId
      }
      const data = await this.post(
        '/UnattendedChildrenApi/getNamePathByAreaCode',
        params
      )
      this.codelist = data.data.data.split('/')
    },
    // 获取详情
    async getDetails () {
      const params = {
        addUnattendedId: this.addUnattendedId
      }
      await this.post('/unattendedBaseChangeApi/queryChangeApply', params).then(
        res => {
          this.collectionObj = res.data.data.childBaseInformationVo
          const data = res.data.data.childBaseInformationVo
          this.hasSecurityMoney = !!data.securityMoney
          if (data.isXuFa == '0') {
            this.isFlag = false
          } else {
            this.isFlag = true
          }

          this.homeList = res.data.data.unattendedParentInfoVoList

          const arrAddress = []
          arrAddress.push(
            data.censusRegisterPro,
            data.censusRegisterCity,
            data.censusRegisterCounty,
            data.censusRegisterTown,
            data.censusRegisterVillage
          )
          this.addressmodel = [...arrAddress]
          if (data.householdRegistryClassify) {
            this.houseChangeSS(data.householdRegistryClassify)
          }
          data.startReceiveDate = data.startReceiveDate ? moment(data.startReceiveDate, 'YYYY-MM') : null
          data.endReceiveDate = data.endReceiveDate ? moment(data.endReceiveDate, 'YYYY-MM') : null
          if (data.birthday) {
            this.birthDate = data.birthday
          }
          data.birthday = data.birthday ? moment(data.birthday, 'YYYY-MM-DD') : null
          this.oldIdCard = data.idCard ? data.idCard : ''
          this.id = data.id
          if (data.isConcentratedFeed == 1) {
            this.controMustTip = false
          } else {
            this.controMustTip = true
          }
          if (!data.isConcentratedFeed) {
            data.isConcentratedFeed = 0
          }
          if (data.isEnjoyMoney == 0) {
            this.controMustTip2 = true
          } else {
            this.controMustTip2 = false
          }
          if (!data.isEnjoyMoney) {
            data.isEnjoyMoney = 1
          }
          this.ishide = data.receiveWay != 1
          this.receiverToChildRelationhide =
            data.receiverToChildRelation == this.Enum.RELATION.QT
          // 如果关系为本人，则将证件类型设为只读
          this.$refs.baselifeForm.isSelf = data.receiverToChildRelation == this.Enum.RELATION.BR
          this.$refs.baselifeForm.isSelf2 = (data.receiverToChildRelation == this.Enum.RELATION.FQ || data.receiverToChildRelation == this.Enum.RELATION.MQ)
          if (data.startReceiveDate) {
            data.startReceiveDate = moment(
              data.startReceiveDate,
              'YYYY-MM'
            )
          }
          if (data.endReceiveDate) {
            data.endReceiveDate = moment(
              data.endReceiveDate,
              'YYYY-MM'
            )
          }
          this.$nextTick(() => {
            this.baselifeForm.setFieldsValue(data)
            this.cptAdoptorFrom.setFieldsValue(data)
          })
        }
      )
    },
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    async submit () {
      this.isNotSubmit = true
      var isok = true
      await this.cptAdoptorFrom.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('cptAdoptorFrom->', err)
        }
      })
      await this.cptAdoptorFrom1.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('cptAdoptorFrom1->', err)
        }
      })
      await this.baselifeForm.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('baselifeForm->', err)
        }
      })
      this.isNotSubmit = false
      if (isok) {
        const collectionObj = this.collectionObj// 原来信息
        const preform = this.baselifeForm.getFieldsValue()
        const resion = this.cptAdoptorFrom1.getFieldsValue()
        const form = this.cptAdoptorFrom.getFieldsValue()// 现在信息
        Object.assign(form, preform)
        Object.assign(form, resion)

        // 添加省市县数据、并删除新对象原有区划数组
        form.censusRegisterPro =
          form.address_Linkage != undefined ? form.address_Linkage[0] : null
        form.censusRegisterCity =
          form.address_Linkage != undefined ? form.address_Linkage[1] : null
        form.censusRegisterCounty =
          form.address_Linkage != undefined ? form.address_Linkage[2] : null
        form.censusRegisterTown =
          form.address_Linkage != undefined ? form.address_Linkage[3] : null
        form.censusRegisterVillage =
          form.address_Linkage != undefined ? form.address_Linkage[4] : null
        delete form.address_Linkage
        // 未显示其他原因时添加患艾滋病其他原因字段用做遍历控制显隐
        const oldObj = {} // 变更前展示的对象
        const newObj = {} // 变更后展示的对象
        const changeAttr = [] // 变更数据存放的数组
        const beforeChangeFieldInfo = {}
        const afterChangeFieldInfo = {}
        const fieldComparison = {}
        // let form = {}
        let areaShow = false // 判断省市县是否显示
        const areaAttr = [
          'censusRegisterPro',
          'censusRegisterCity',
          'censusRegisterCounty',
          'censusRegisterTown',
          'censusRegisterVillage'
        ]
        for (var k in form) {
          const changeObj = {}
          const beforeChange = {}
          const afterChange = {}
          const comparisonChange = {}
          if (this[`${k}Visible`]) {
            this[`${k}Visible`][0] = false
          }

          if (form[k] == '' || form[k] == undefined) {
            // 针对原有空值，统一undefined处理
            form[k] = undefined
            if (k == 'receiveWay') {
              form[k] = ''
            }
          }
          if (form[k] != collectionObj[k] && k != 'changeReason' && k != 'censusRegisterPro' && k != 'censusRegisterCity' && k != 'censusRegisterCounty' && k != 'censusRegisterDetail' && k != 'censusRegisterTown' && k != 'censusRegisterVillage') {
            // 除变更原因之外的变更
            this.editVisible = true // 变更弹窗显示
            // 后台接口所需参数处理 start
            if (k == 'intoCivilAdministrationDate' || k == 'intoOrgDate' || k == 'applyDate') {
            } else {
              afterChange[k] = form[k]
              beforeChange['copy_' + `${k}`] = collectionObj[k]
            }
            // 赋值给变更前后需展示的对象
            oldObj[k] = collectionObj[k]
            newObj[k] = form[k]
            // 除区划外的处理（显示dom）
            if (k != 'censusRegisterPro' || k != 'censusRegisterCity' || k != 'censusRegisterCounty' || k != 'censusRegisterDetail' || k != 'censusRegisterTown' || k != 'censusRegisterVillage') {
              if (this[`${k}Visible`]) { this[`${k}Visible`][0] = true }
            }
            beforeChangeFieldInfo['copy_' + `${k}`] = beforeChange['copy_' + `${k}`]
            afterChangeFieldInfo[k] = afterChange[`${k}`]
            fieldComparison[k] = comparisonChange[`${k}`]
            changeAttr.push(changeObj) // 后台接口提交时需要的数据
          } else if (
            k != 'censusRegisterPro' &&
            k != 'censusRegisterCity' &&
            k != 'censusRegisterCounty' &&
            k != 'censusRegisterDetail' &&
            k != 'changeReason' &&
            k != 'censusRegisterTown' &&
            k != 'censusRegisterVillage'
          ) {
            // 区划外未变更的隐藏dom
            if (this[`${k}Visible`]) {
              this[`${k}Visible`][0] = false
            }
          } else if (
            k == 'censusRegisterPro' ||
            k == 'censusRegisterCity' ||
            k == 'censusRegisterCounty' ||
            k == 'censusRegisterDetail' ||
            k == 'censusRegisterTown' ||
            k == 'censusRegisterVillage'
          ) {
            if (form[k] != collectionObj[k]) {
              this.editVisible = true // 变更弹窗显示
              areaShow = true
            }
          }
        }
        var arr = Object.keys(afterChangeFieldInfo)
        if (areaShow || arr.length > 0) {
          if (areaShow) {
            this.censusRegisterDatasVisible[0] = true
            for (var i = 0; i < areaAttr.length; i++) {
              const k = areaAttr[i]
            }
            beforeChangeFieldInfo.copy_censusRegisterDetail =
              collectionObj.censusRegisterDetail
            beforeChangeFieldInfo.censusRegisterPro =
              collectionObj.censusRegisterPro
            beforeChangeFieldInfo.censusRegisterCity =
              collectionObj.censusRegisterCity
            beforeChangeFieldInfo.censusRegisterCounty =
              collectionObj.censusRegisterCounty
            beforeChangeFieldInfo.censusRegisterTown =
              collectionObj.censusRegisterTown
            beforeChangeFieldInfo.censusRegisterVillage =
              collectionObj.censusRegisterVillage

            afterChangeFieldInfo.censusRegisterDetail =
              form.censusRegisterDetail
            afterChangeFieldInfo.censusRegisterPro = form.censusRegisterPro
            afterChangeFieldInfo.censusRegisterCity = form.censusRegisterCity
            afterChangeFieldInfo.censusRegisterCounty =
              form.censusRegisterCounty
            afterChangeFieldInfo.censusRegisterTown = form.censusRegisterTown
            afterChangeFieldInfo.censusRegisterVillage =
              form.censusRegisterVillage
            this.$nextTick(() => {
              // 变更前地址赋值
              const arrT = []
              arrT.push(collectionObj.censusRegisterPro, collectionObj.censusRegisterCity, collectionObj.censusRegisterCounty, collectionObj.censusRegisterTown, collectionObj.censusRegisterVillage)
              this.addressOldModel = arrT

              // 变更后地址赋值
              const arr = []
              arr.push(form.censusRegisterPro, form.censusRegisterCity, form.censusRegisterCounty, form.censusRegisterTown, form.censusRegisterVillage)
              this.addressChangeModel = arr
            })
          }
          // 变更弹窗除区划外的其他数据的赋值，并调整样式
          this.$nextTick(() => {
            let formData = {}
            formData = {
              ...afterChangeFieldInfo,
              ...beforeChangeFieldInfo
            }
            this.unattendedObj = formData

            this.unattendedObjAfter = afterChangeFieldInfo
            this.unattendedObjBefore = beforeChangeFieldInfo
            this.oldform.setFieldsValue(formData)
          })
        } else {
          this.$message.error('没有数据变更！')
        }
      } else {
        this.$message.error(
          '校验不通过，无法提交，请再次检查!'
        )
      }
    },
    handleOkRevoke (val) {
      const unattendedChildInfoChangeVo = {}
      unattendedChildInfoChangeVo.unattendedChildId = this.addUnattendedId
      const unattendedHisList = []
      const before = {}
      for (var k in this.unattendedObjBefore) {
        const kk = k.replace(/copy_/g, '')
        before[kk] = this.unattendedObjBefore[k]
      }
      let after = {}
      after = this.unattendedObjAfter
      after.changeStatus = '1'
      before.changeStatus = '0'
      if (after.birthday) {
        after.birthday = after.birthday.format('YYYY-MM-DD')
      }
      if (after.startReceiveDate) {
        after.startReceiveDate = after.startReceiveDate.format('YYYY-MM')
      }
      if (after.endReceiveDate) {
        after.endReceiveDate = after.endReceiveDate.format('YYYY-MM')
      }
      if (before.birthday) {
        before.birthday = before.birthday.format('YYYY-MM-DD')
      }
      if (before.startReceiveDate) {
        before.startReceiveDate = before.startReceiveDate.format('YYYY-MM')
      }
      if (before.endReceiveDate) {
        before.endReceiveDate = before.endReceiveDate.format('YYYY-MM')
      }
      unattendedHisList.push(before)
      unattendedHisList.push(after)
      unattendedChildInfoChangeVo.changeReason = this.cptAdoptorFrom1.getFieldsValue().changeReason
      const params = {}
      params.unattendedChildInfoChangeVo = unattendedChildInfoChangeVo
      params.unattendedHisList = unattendedHisList
      if (val == '0') {
        this.editVisible = false
      } else if (val == '1') {
        let url
        let text
        if (this.goType == '1') {
          url = '/unattendedBaseChangeApi/submitChangeApply'
          text = '信息提交成功！'
        } else if (this.goType == '2') {
          params.unattendedChildInfoChangeVo.unattendedChildId = this.addUnattendedId
          params.unattendedChildInfoChangeVo.id = this.changeBaseId

          url = '/unattendedBaseChangeApi/submitChangeApply'
          text = '信息修改成功！'
        }
        this.post(url, params, true).then(res => {
          if (res.serviceSuccess) {
            this.$message.success(text)

            this.oldform.resetFields()

            this.editVisible = false
            this.backs()
          }
        })
      }
    },

    async idcardrole (rule, value, callback) {
      if (this.isNotSubmit) {
        callback()
      } else {
        if (value != this.oldIdCard) {
          // 新增或编辑但身份证号改变时，进行验重操作
          this.idCardValidate(rule, value, callback, this, null, '120')
        } else {
          // 否则不进行验重
          this.idCardValidate(rule, value, callback, this, null)
        }
      }
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      // this.$emit('setValueByIdCard', val)
    },
    // 根据身份证号回显出生日期与性别
    callbackByIdCard (sex, age, birth) {
      this.birthDate = birth
      this.cptAdoptorFrom.setFieldsValue({
        birthday: birth ? moment(birth) : null
      })
      if (!this.isFlag && !this.controMustTip2) {
        this.baselifeForm.setFieldsValue({
          endReceiveDate: birth ? moment(birth, 'YYYY-MM').add({ years: 18 }) : null
        })
      }
    },

    // 变更前地址传值
    setOldAddress () {
      this.oldform.setFieldsValue({
        copy_censusRegisterDatas: this.addressOldModel
      })
    },
    // 变更后地址传值
    setNewAddress () {
      this.oldform.setFieldsValue({
        censusRegisterDatas: this.addressChangeModel
      })
    },
    backs () {
      this.$router.go(-1)
    },
    onCloseCanle () {
      this.editVisible = false
    },

    idCardValid (rule, value, callback, self, text) {
      const idtext = this[text].getFieldsValue().memberIdType
      if (idtext == '01') {
        this.idCardValidate(rule, value, callback, this)
      } else {
        this.otherCardrules(rule, value, callback, this)
      }
    },

    // 对应表单的地址赋值
    setaddress () {
      this.cptAdoptorFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data

      const data2 = await this.getDictionaries('PAYMENT')
      this.receiveList = data2

      const data3 = await this.getDictionaries('RELATION')
      this.relationList = data3
    },
    // 户口分类 HOUSEHOLDREGISTRYCLASSIFY
    async getHouseHoldList () {
      const data = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY')
      this.houseHoldList = data
    },
    // 户籍性质 CENSUSREGISTER
    async getCensusregisterList () {
      const data = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data
    }
  }

}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  width: 99%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
.bom {
  width: calc(100% - 28px);
  height: 80px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 14px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-left: 32px;
}
.fromintop {
  margin: 0px 0 0 5px 0;
  position: relative;
}
.frominadd {
  margin-top: 0;
}
.radio_grops {
  width: 100%;
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
