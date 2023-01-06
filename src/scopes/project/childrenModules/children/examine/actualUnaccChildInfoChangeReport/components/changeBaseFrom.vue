<template>
  <div>
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="减员信息"
             :show.sync="showone"></Title>
      <ta-row ref="one"
              class="fromcom">
        <!-- <ta-col :span="24"> -->
        <ta-col :span="12">
          <ta-form-item label="儿童姓名"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <a @click="childDetail"
               style="display :inline-block ;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap;line-height: 38px;margin-bottom: -20px;"
               :title="name">{{name}}</a>
          </ta-form-item>
        </ta-col>
        <ta-col :span="12"
                v-if="countyAuditShow">
          <ta-form-item label="当前状态"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <span style="line-height: 38px;margin-bottom: -20px;">{{currentStatusLabel}}</span>
          </ta-form-item>
        </ta-col>
        <!-- </ta-col> -->
        <!-- </ta-row>
      <ta-row> -->
        <!-- <ta-col :span="24">
          <ta-table :columns="tableColumns" :dataSource="tableData" class="tableclass"></ta-table>
        </ta-col>-->
        <div style="margin-top:30px">
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
          <!-- <ta-form :autoFormCreate="(oldform)=>{this.oldform = oldform}"> -->
          <ta-row class="frominadd">
            <ta-col :span="12">
              <ta-form-item label="儿童姓名"
                            fieldDecoratorId="copy_name"
                            :require="{message:'请选择儿童姓名!'}"
                            v-if="nameVisible[0]">
                <ta-input :disabled="true"
                          placeholder="请输入儿童姓名" />
              </ta-form-item>
              <ta-form-item label="性别"
                            fieldDecoratorId="copy_sex"
                            :require="{message:'请选择性别!'}"
                            v-if="sexVisible[0]">
                <ta-select placeholder="请选择性别"
                           style="width : 100%"
                           :disabled="true">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in sexList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="身份证号"
                            fieldDecoratorId="copy_idCard"
                            :require="{message:'请输入身份证号!'}"
                            v-if="smIdCardVisible[0]">
                <ta-input placeholder="请输入身份证号"
                          :disabled="true" />
              </ta-form-item>
              <ta-form-item label="户籍性质"
                            fieldDecoratorId="copy_censusRegister"
                            :require="{message:'请选择户籍性质!'}"
                            v-if="censusRegisterVisible[0]">
                <ta-select placeholder="请选择户籍性质"
                           :disabled="true"
                           style="width : 100%">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in censusregisterList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="户口分类"
                            fieldDecoratorId="copy_householdRegistryClassify"
                            v-if="householdRegistryClassifyVisible[0]"
                            :require="{message:'请选择户口分类!'}">
                <ta-select placeholder="请选择户口分类"
                           :disabled="true"
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

              <!--********************** -->
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

              <!-- <ta-form-item
                                hidden
                                label="福利机构"
                                class="spilwid lk"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="welfareOrgId">
                    <ta-select allowClear
                               showSearch
                               :filterOption="filterOption"
                               :placeholder=" '请选择登记机关'">
                      <ta-select-option v-for="item in orgList"
                                        :key="item.taorgId"
                                        :value="item.taorgId">{{item.orgName}}</ta-select-option>
                    </ta-select>
                  </ta-form-item> -->

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
              <ta-form-item label="末领时间"
                            fieldDecoratorId="copy_endReceiveDate"
                            v-if="endReceiveDateVisible[0]"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16 }">
                <ta-month-picker style="width:100%"
                                 placeholder='请选择末领时间'
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
                            :require="{message:'请输入姓名!'}"
                            v-if="nameVisible[0]">
                <ta-input placeholder="请输入姓名"
                          :disabled="true" />
              </ta-form-item>
              <ta-form-item label="性别"
                            fieldDecoratorId="sex"
                            :require="{message:'请选择性别!'}"
                            v-if="sexVisible[0]">
                <ta-select placeholder="请选择性别"
                           style="width : 100%"
                           :disabled="true">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in sexList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="身份证号"
                            fieldDecoratorId="idCard"
                            :require="{message:'请输入身份证号!'}"
                            v-if="smIdCardVisible[0]">
                <ta-input :disabled="true" />
              </ta-form-item>

              <ta-form-item label="户籍性质"
                            fieldDecoratorId="censusRegister"
                            :require="{message:'请选择户籍性质!'}"
                            v-if="censusRegisterVisible[0]">
                <ta-select placeholder="请选择户籍性质"
                           :disabled="true"
                           style="width : 100%">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in censusregisterList "
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="户口分类"
                            fieldDecoratorId="householdRegistryClassify"
                            v-if="householdRegistryClassifyVisible[0]"
                            :require="{message:'请选择户口分类!'}">
                <ta-select placeholder="请选择户口分类"
                           :disabled="true"
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
                                fileldName="censusRegisterDatas"
                                @setaddress="setNewAddress"
                                v-if="censusRegisterDatasVisible[0]"></AddressComponent>
              <ta-form-item label
                            fieldDecoratorId="censusRegisterDetail"
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

              <!-- <ta-form-item
                                hidden
                                label="福利机构"
                                class="spilwid lk"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="welfareOrgId">
                    <ta-select allowClear
                               showSearch
                               :filterOption="filterOption"
                               :placeholder=" '请选择登记机关'">
                      <ta-select-option v-for="item in orgList"
                                        :key="item.taorgId"
                                        :value="item.taorgId">{{item.orgName}}</ta-select-option>
                    </ta-select>
                  </ta-form-item> -->

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
              <ta-form-item label="末领时间"
                            v-if="endReceiveDateVisible[0]"
                            fieldDecoratorId="endReceiveDate"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16 }">
                <ta-month-picker style="width:100%"
                                 placeholder='请选择末领时间'
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

        </div>
        <ta-col :span="24">
          <ta-form-item label="变更原因"
                        :labelCol="{ span: 3 }"
                        :wrapperCol="{ span: 21 }"
                        fieldDecoratorId="changeReason">
            <ta-textarea placeholder="请输入变更原因"
                         :rows="4"
                         :disabled="true" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>

    <div ref="twoout"
         class="mars"
         v-if="applyShow">
      <Title id="anchorpoint_b"
             title="审核信息"
             :show.sync="showtwo"></Title>
      <ta-row ref="two"
              class="fromcom">
        <div v-if="countyAuditShow">
          <ta-col :span="12">
            <ta-form-item label="上报日期"
                          fieldDecoratorId="requestChangeDate"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              :valid-now-time="'right'"
                              placeholder="请选择上报日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12">
            <ta-form-item label="上报单位"
                          fieldDecoratorId="reportUnit"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="approval">
            <ta-form-item label="审核日期"
                          fieldDecoratorId="auditDate"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-date-picker :disabled="disabled"
                              style="width: 100%;"
                              :valid-now-time="'right'"
                              placeholder="请选择审核日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="12"
                  v-if="approval">
            <ta-form-item label="审核单位"
                          fieldDecoratorId="auditUnit"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
        </div>
        <ta-col :span="24">
          <ta-form-item v-if="rejectBoolean"
                        label="驳回原因"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="rejectPassReason">
            <ta-textarea placeholder="请输入驳回原因"
                         :rows="4"
                         :disabled="true" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  name: 'register',
  components: {
    Title,
    AddressComponent
  },
  props: {
    name: {
      type: String
    },
    countyAuditShow: {
      type: Boolean
    },
    rejectBoolean: {
      type: Boolean
    },
    currentStatusLabel: {
      type: String
    },
    approval: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    applyShow: {
      type: Boolean
    },
    addressChangeModel: {
      type: Array
    }
  },
  data () {
    return {
      // tableColumns,
      // tableData: [],

      current: ['1'],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      censusregisterList: [],
      houseHoldList: [],
      sexList: [],
      addressmodel: [],
      addressOldModel: [], // 变更前的地址数据
      // addressChangeModel: [], // 变更后的地址数据
      isRevoke: false, // 是否是撤回
      nameVisible: [false, '姓名'],
      smIdCardVisible: [false, '身份证号'],
      sexVisible: [false, '联系人'],
      censusRegisterVisible: [false, '户籍性质'],
      householdRegistryClassifyVisible: [false, '户口分类'],
      censusRegisterDatasVisible: [true, '户籍所在地'],
      birthdayVisible: [false, ''],

      relationList: [],
      receiveList: [],
      idCardTypeList: [],

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

      activeKey: ['1', '2', '3', '4'],
      // name: '',
      currentStatus: '',
      auditType: '',

      radiovalue: '1', // 患艾滋病情况选择的数据

      proAuditShow: '2', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '2' // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      // countyAuditShow: '2' // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
    }
  },
  activated () {
    this.isRevoke = false
    this.getsexList()
    this.getCensusregisterList()
    this.getHouseHoldList()
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  methods: {
    // 查看儿童详情
    childDetail () {
      this.$emit('childDetail')
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
      const data4 = await this.getDictionaries('IDCARD_TYPE')
      this.idCardTypeList = data4
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
    },
    setOldAddress () {
      this.$emit('setOldAddress')
    },
    setNewAddress () {
      this.$emit('setNewAddress')
    },

    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (this.$refs[ref].$el != undefined) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
        }
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
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin-left: 32px;
}
.mars {
  width: 96%;
  /* border:none; */
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.tableclass {
  margin: 0 auto;
  width: 67%;
  margin-bottom: 24px;
}
.fromintop {
  margin: 0px 0 5px 0;
  position: relative;
}
.frominadd {
  margin-top: 0;
}
.radio_grops {
  width: 100%;
}
</style>
