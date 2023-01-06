<template>
  <!-- 审核 -->
  <div class="conts">
    <div class="contin">
      <div class="mars"
           ref="oneout">
        <Title id="anchorpoint_a"
               title="减员信息"
               :show.sync="showone"></Title>
        <ta-form ref="one"
                 layout="horizontal"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ta-row class="fromcom">
            <ta-col :span="6">
              <ta-form-item label="儿童姓名"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}">

                <span>
                  <p class="nameClass"
                     @click="childDetail"
                     style="cursor: pointer;color: #1890ff;width: 100%;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap;line-height: 38px;    margin-bottom: -10px;"
                     :title="name"><a>{{name}}</a></p>

                </span>
              </ta-form-item>
              <ta-form-item label="身份证号"
                            fieldDecoratorId="smIdCard"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}">
                <ta-input placeholder="请输入身份证号"
                          :disabled="disabledM" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="儿童编号"
                            fieldDecoratorId="childNumber"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}">
                <ta-input placeholder="请输入儿童编号"
                          :disabled="disabledM" />
              </ta-form-item>
              <ta-form-item label="儿童类别"
                            fieldDecoratorId="childTypeLabel"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}">
                <ta-input :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="性别"
                            fieldDecoratorId="sex"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}">
                <ta-select placeholder="请选择性别"
                           :disabled="disabledM">
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in sexList"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>

            <ta-col :span="6">
              <ta-form-item label="出生日期"
                            fieldDecoratorId="birthday"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 16}">
                <ta-date-picker :disabled="disabledM"
                                style="width: 100%;"
                                :valid-now-time="'right'"
                                placeholder="请选择出生日期" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="12">
              <ta-form-item label="现住址"
                            :labelCol="{ span: 4 }"
                            :wrapperCol="{ span: 20}"
                            fieldDecoratorId="currentAddressDetailAll">
                <ta-input placeholder="请输入现住址"
                          :disabled="disabledM" />
              </ta-form-item>
            </ta-col>
            <!-- <ta-col :span="24">
              <ta-form-item label="变更后儿童类型"
                            :initValue="['4']"
                            fieldDecoratorId="changeChildType"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            :require="{message:'请选择变更后儿童类型!'}">

                <ta-checkbox-group @change="onChange"
                                   :disabled="disabled">
                  <ta-checkbox v-for="(item ,index) in plainOptions "
                               :key="index"
                               :value="item.value"
                               :disabled="item.value==4?false:true">{{item.label}}</ta-checkbox>
                </ta-checkbox-group>

              </ta-form-item>
            </ta-col> -->

            <ta-col :span="24">
              <ta-form-item label="退出原因"
                            :fieldDecoratorOptions="rules.exitReason"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            v-if="isShow"
                            fieldDecoratorId="exitReason">
                <ta-radio-group name="aa"
                                @change="onChangeExitReason"
                                :disabled="disabled">
                  <ta-radio v-for="(item ,index) in exitReasonList "
                            :key="index"
                            :value="item.value">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item v-if="exitReasonOtherTip"
                            label="其他"
                            fieldDecoratorId="exitReasonOther"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 6}"
                            :fieldDecoratorOptions="this.verificationRules('其他', 50)">
                <ta-input :disabled="disabled"
                          maxlength='50'
                          placeholder="请输入其他" />
              </ta-form-item>
            </ta-col>
            <div v-if="isShowLing">
              <ta-col :span="8">
                <ta-form-item label="父母刑满释放日期"
                              fieldDecoratorId="parentReleasedDate"
                              :require="{message:'请选择父母刑满释放日期!'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择父母刑满释放日期" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="退出日期"
                              fieldDecoratorId="exitDate"
                              :require="{message:'请选择退出日期'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择退出日期" />
                </ta-form-item>
              </ta-col>

            </div>
            <div v-if="isShowOne">
              <ta-col :span="8"
                      v-if="isShowOne">
                <ta-form-item label="父/母戒毒成功日期"
                              fieldDecoratorId="parentReleasedDate"
                              :require="{message:'请选择父/母戒毒成功日期!'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择父/母戒毒成功日期" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="isShowOne">
                <ta-form-item label="退出日期"
                              :require="{message:'请选择退出日期'}"
                              fieldDecoratorId="exitDate"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择退出日期" />
                </ta-form-item>
              </ta-col>

            </div>
            <div v-if="isShowTwo">
              <ta-col :span="8"
                      v-if="isShowTwo">
                <ta-form-item label="找回父母日期"
                              fieldDecoratorId="parentReleasedDate"
                              :require="{message:'请选择找回父母日期!'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择找回父母日期" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="isShowTwo">
                <ta-form-item label="退出日期"
                              fieldDecoratorId="exitDate"
                              :require="{message:'请选择退出日期'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择退出日期" />
                </ta-form-item>
              </ta-col>

            </div>

            <div v-if="isShowFour">
              <ta-col :span="8"
                      v-if="isShowFour">
                <ta-form-item label="死亡原因"
                              fieldDecoratorId="deadReason"
                              :require="{message:'请选择死亡原因!'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-select placeholder="请选择死亡原因"
                             :disabled="disabled">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in deathreasonList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="isShowFour">
                <ta-form-item label="死亡处理方式"
                              fieldDecoratorId="deadHandleWay"
                              v-if="isShowFour"
                              :require="{message:'请选择死亡处理方式!'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-select placeholder="请选择死亡处理方式"
                             :disabled="disabled">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in diedealList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="isShowFour">
                <ta-form-item label="死亡日期"
                              fieldDecoratorId="parentReleasedDate"
                              v-if="isShowFour"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  :valid-now-time="'right'"
                                  placeholder="请选择死亡日期" />
                </ta-form-item>
              </ta-col>

            </div>
            <div v-if="isShowFive">
              <ta-col :span="8"
                      v-if="isShowFive">
                <ta-form-item label="退出日期"
                              fieldDecoratorId="exitDate"
                              :require="{message:'请选择退出日期'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{ span: 18}">
                  <ta-date-picker :disabled="disabled"
                                  style="width: 100%;"
                                  placeholder="请选择退出日期" />
                </ta-form-item>
              </ta-col>

            </div>
            <ta-col :span="24">
              <ta-form-item label="末领年月"
                            v-if="isShow"
                            fieldDecoratorId="endGetDate"
                            :require="isEnjoyMoney=='1'?{message:'请选择末领年月!'}:false"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 6}">
                <ta-month-picker :disabled="goType=='7'?false:disabled"
                                 style="width: 100%;"
                                 placeholder="请选择末领年月" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="备注"
                            fieldDecoratorId="remark"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            :fieldDecoratorOptions="rules.remark">
                <ta-textarea placeholder="请输入备注"
                             :disabled="disabled"
                             :rows="3" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="附件上传"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22}">
                <ta-upload :withCredentials="true"
                           name="file"
                           :data="adoptionIncome"
                           :multiple="true"
                           :action="action"
                           :fileList="fileList"
                           :beforeUpload="beforeUpload"
                           @change="incomeFileChange"
                           @preview="preview">
                  <ta-button :disabled="goType=='7'?false:disabled">
                    <ta-icon type="upload" />上传文件
                  </ta-button>
                </ta-upload>
                <p class="warntext">
                  <ta-icon type="info-circle-o"
                           class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M
                </p>
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
      <div class="mars"
           ref="twoout"
           v-if="applyShow">
        <ta-form ref="two"
                 layout="horizontal"
                 :autoFormCreate="(cptAdoptedFrom)=>{this.cptAdoptedFrom = cptAdoptedFrom}">
          <Title id="anchorpoint_b"
                 title="审核信息"
                 :show.sync="showtwo"></Title>
          <ta-row class="fromcom">
            <div v-if="countyAuditShow">
              <ta-col :span="12">
                <ta-form-item label="上报日期"
                              fieldDecoratorId="reportTime"
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
        </ta-form>
      </div>
      <div class="bom">
        <ta-button class="btnleft"
                   @click="back">返回</ta-button>
        <ta-button v-if="goType=='6'"
                   class="btnleft"
                   type="danger"
                   @click="returnBack">撤回</ta-button>
        <ta-button v-if="goType=='1'||goType=='2'||goType=='7'"
                   class="btnleft"
                   type="primary"
                   @click="submit">提交</ta-button>
        <ta-button type="danger"
                   class="btnleft"
                   v-if="goType=='3'"
                   @click="submitApp('0')">驳回</ta-button>
        <ta-button type="primary"
                   class="btnleft successbtn"
                   v-if="goType=='3'"
                   @click="submitApp('1')">通过</ta-button>
      </div>

      <div>

        <ta-drawer title="驳回原因"
                   width="500"
                   placement="right"
                   @close="onCloseCanle"
                   :visible="visible"
                   style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
          <div style="height:100px">
            <ta-form class="drawerFrom"
                     layout="horizontal"
                     :autoFormCreate="(cptAdoptedFromO)=>{this.cptAdoptedFromO = cptAdoptedFromO}">
              <ta-col :span="24">
                <ta-form-item label="驳回原因"
                              :labelCol="{ span: 5 }"
                              :wrapperCol="{ span: 19 }"
                              fieldDecoratorId="reason"
                              :fieldDecoratorOptions="this.verificationRules('驳回原因', 200)">
                  <ta-textarea placeholder="请输入驳回原因"
                               :rows="3" />
                </ta-form-item>
              </ta-col>
            </ta-form>
          </div>
          <div slot="footer">
            <ta-button @click="onCloseCanle()">取消</ta-button>
            <ta-button type="primary"
                       @click="handleOkRevoke()">确定</ta-button>
          </div>
        </ta-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import { setTimeout } from 'timers'
import moment from 'moment'

export default {
  name: 'actualUnaccChildStatuChangeFor',

  components: {
    Title
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      visible: false,
      addressmodel: [],
      disabled: false,
      disabledM: true,
      sexList: [],
      adoptionIncome: {
        functionalType: 'f1'
      },
      fileList: [],
      plainOptions: [], // checkboxgroup数据
      checkedList: [],
      exitReasonList: [],
      rules: {
        childNumber: this.verificationRules('儿童编号', 30),
        name: this.verificationRules('姓名', 24),
        sex: this.verificationRules('性别'),
        remark: this.verificationRulesNotMustFill('备注', 200, true),
        exitReason: this.verificationRules('退出原因'),
        rejectPassReason: this.verificationRules('驳回原因', 65, true),
        changeChildType: this.verificationRules('变更后儿童类型')
      },
      changeStateId: '',
      currentStatus: '',
      name: '',
      detailData: {},
      changeChildTypeList: '',
      isSubmit: false,
      exitReasonValue: [],
      isShow: true,
      isShowLing: false,
      isShow1: false,
      isShowOne: false,
      isShowTwo: false,
      isShowFour: false,
      isShowFive: false,
      addUnattendedId: '',
      addUnattendedIdDetail: '',
      deathreasonList: [],
      diedealList: [],
      goType: '0',
      rejectBoolean: false,
      countyAuditShow: false,
      approval: false,
      applyShow: false,
      startDate: '',
      exitReasonOtherTip: false,
      leg: '',
      isEnjoyMoney: '',
      isAnotherPlaceApply: '',
      anotherPlaceUserId: ''
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  created () { },
  activated () {
    this.loadData()
    this.disabled = false
    this.adoptedFrom.setFieldsValue({ childTypeLabel: '事实无人抚养儿童' })

    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })

    this.getsexList()
    this.getchildtype()
    this.getdeathreason()
    this.getdiedeal()
    this.getchangeChildType()
    this.getexitReason()
    const paramsData = JSON.parse(this.$route.query.paramsData)
    if (paramsData.obj.unattendedChildId) {
      this.addUnattendedIdDetail = paramsData.obj.unattendedChildId
    } else {
      this.addUnattendedIdDetail = paramsData.obj.addUnattendedId
    }
    this.startDate = paramsData.obj.startDate
    this.isAnotherPlaceApply = paramsData.obj.isAnotherPlaceApply
    this.anotherPlaceUserId = paramsData.obj.anotherPlaceUserId
    // 标志页面跳转
    const goTypeTemp = paramsData.goType
    if (goTypeTemp == 'factRaiseChildStatusChange-apply') {
      // 身份状态变更申请
      this.leg = paramsData.leg
      this.goType = '1'
      this.addUnattendedId = paramsData.obj.addUnattendedId
      this.getDetails()
      this.disabled = false
      this.countyAuditShow = false
      this.rejectBoolean = false
      this.applyShow = false
    } else if (goTypeTemp == 'infoChangeReportRecord-edit') {
      // 身份状态变更申请-编辑
      this.goType = '2'

      this.changeStateId = paramsData.obj.changeStateId
      this.getDetails()
      this.disabled = false
      this.countyAuditShow = false
      this.rejectBoolean = false
      this.applyShow = false
    } else if (goTypeTemp == 'infoChangeReportRecord-see') {
      // 身份状态变更申请记录---查看
      this.goType = '5'
      this.countyAuditShow = true
      this.rejectBoolean = false
      this.disabled = true
      this.approval = paramsData.approval
      if (paramsData.obj.changeStateId != '') {
        this.changeStateId = paramsData.obj.changeStateId
      } else {
        this.addUnattendedId = paramsData.obj.addUnattendedId
      }
      console.log(this.changeStateId, '-----', this.addUnattendedId)
      this.applyShow = true
      this.getDetails()
      if (paramsData.obj.currentStatus == '4') {
        this.rejectBoolean = true
      }
    } else if (goTypeTemp == 'infoChangeReportRecord-reject') {
      // 变更申请记录---撤回
      this.goType = '6'
      this.countyAuditShow = false
      this.rejectBoolean = false
      this.disabled = true
      this.applyShow = false
      this.changeStateId = paramsData.obj.changeStateId
      this.approval = paramsData.approval
      this.getDetails()
    } else if (goTypeTemp == 'infoChangeReportApproval-reject') {
      // 驳回通过查看
      this.goType = '4'
      this.countyAuditShow = false
      this.disabled = true
      this.rejectBoolean = true
      this.changeStateId = paramsData.obj.changeStateId
      this.applyShow = true
      if (paramsData.obj.currentStatus == '4') {
        this.rejectBoolean = true
        this.applyShow = true
      } else if (paramsData.obj.currentStatus == '3') {
        this.rejectBoolean = false
        this.applyShow = false
      }
      this.getDetails()
    } else if (goTypeTemp == 'infoChangeReportApproval-apply') {
      // 审核
      this.goType = '3'
      this.changeStateId = paramsData.obj.changeStateId
      this.countyAuditShow = false
      this.disabled = true
      this.rejectBoolean = false
      this.applyShow = false
      this.getDetails()
    } else if (goTypeTemp == 'attritionInformation-modify') {
      // 身份状态变更申请
      this.leg = paramsData.leg
      this.goType = '7'// 操作类型的标志
      this.changeStateId = paramsData.obj.changeStateId
      this.getDetails()
      this.disabled = true
      this.countyAuditShow = false// 是否显示(除驳回原因外的)审核信息
      this.rejectBoolean = false// 是否显示驳回原因
      this.applyShow = false// 是否显示审核信息
    }
  },
  mounted () {
    this.getchangeChildType()
  },
  methods: {
    loadData () {
      this.adoptedFrom.resetFields()

      this.checkedList = []
      this.exitReasonList = []
      this.addUnattendedId = ''
      this.changeStateId = ''
      this.isEnjoyMoney = ''
      this.isAnotherPlaceApply = ''
      this.anotherPlaceUserId = ''
      this.fileList = []
      this.detailData = {}
      this.isShow = true
      this.isShowLing = false
      this.isShow1 = false
      this.isShowOne = false
      this.isShowTwo = false
      this.isShowFour = false
      this.isShowFive = false
      this.countyAuditShow = false
      this.rejectBoolean = false
      this.disabled = false
      this.approval = false
      this.showone = true
      this.showtwo = true
      this.exitReasonOtherTip = false
    },

    submit () {
      let isok = true
      this.adoptedFrom.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        let unattendedChildStatusChangeVo = {}
        const formData = this.adoptedFrom.getFieldsValue()
        this.changetimeSub(formData)
        // if (formData.changeChildType) {
        //   formData.changeChildType = formData.changeChildType[0]
        // }
        formData.changeChildType = '4'
        formData.unattendedChildId = JSON.parse(
          this.$route.query.paramsData
        ).obj.addUnattendedId
        const upLoadPathIds = []
        if (this.fileList.length > 0) {
          this.fileList.map(item => {
            upLoadPathIds.push(item.response.data.data.fileid)
          })
        }
        formData.upLoadPathIds = upLoadPathIds
        unattendedChildStatusChangeVo = { ...formData }
        unattendedChildStatusChangeVo.isAnotherPlaceApply = this.isAnotherPlaceApply
        unattendedChildStatusChangeVo.anotherPlaceUserId = this.anotherPlaceUserId
        let text = ''
        let url = '/unattendedStateChangeApi/submitChangeStateApply'
        if (this.goType == '1') {
          text = '儿童身份减员申请提交成功'
        } else if (this.goType == '2') {
          text = '儿童身份减员申请修改成功'
          unattendedChildStatusChangeVo.id = this.changeStateId
        } else if (this.goType == '7') {
          text = '操作成功'
          unattendedChildStatusChangeVo.id = this.changeStateId
          url = '/unattendedStateChangeApi/reductionChange'
        }

        this.post(
          url,
          unattendedChildStatusChangeVo
        ).then(res => {
          if (res.errors == null) {
            this.$message.success(text)
            this.back()
          }
        })
      }
    },
    // 通过驳回
    async submitApp (e) {
      if (e == '0') {
        this.visible = true
      }
      if (e == '1') {
        this.visible = false
        const params = {}
        params.changeStatusId = this.changeStateId
        params.isAnotherPlaceApply = this.isAnotherPlaceApply
        this.post(
          '/changeStatusUnattendedApi/checkChangeStatusUnattended',
          params
        ).then(res => {
          if (res.errors == null) {
            this.$message.success('信息审核通过')
            this.back()
          }
        })
      }
    },
    handleOkRevoke () {
      const form = this.cptAdoptedFromO.getFieldsValue()
      form.changeStatusId = this.changeStateId
      form.isAnotherPlaceApply = this.isAnotherPlaceApply
      // })
      // 驳回
      this.cptAdoptedFromO.validateFields((err, values) => {
        if (!err) {
          this.post(
            '/changeStatusUnattendedApi/rejectChangeStatusUnattended',
            form
          ).then(res => {
            if (res.errors == null) {
              this.visible = false
              this.$message.success('信息审核驳回')
              this.cptAdoptedFromO.resetFields()
              this.back()
            }
          })
        }
      })
    },
    // 数据处理
    changetimeSub (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (k == 'endGetDate') {
            data[k] = data[k].format('YYYY-MM')
          } else {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
      }
    },
    async getchangeChildType () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.changeChildTypeList = data
      console.log(this.changeChildTypeList)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    incomeFileChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (
          this.goType == '3' ||
          this.goType == '4' ||
          this.goType == '5' ||
          this.goType == '6'
        ) {
          return false
        } else {
          this.fileList = info.fileList
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$nextTick(() => {
          this.setHeight('one', 'oneout')
        })
        this.$message.success('文件上传成功!')
      }
    },
    onChange (checkedList) {
      this.checkedList = checkedList
      if (checkedList.length == 1) {
        this.isShow = true
      } else {
        this.isShow = false
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      }
    },
    onChangeExitReason (exitReasonList) {
      let newdate = new Date()
      newdate = moment(newdate, 'YYYY-MM-DD')
      if (exitReasonList.target.value == 1) {
        this.isShowLing = true
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (exitReasonList.target.value == 2) {
        this.isShowOne = true
        this.isShowLing = false
        this.isShowTwo = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (exitReasonList.target.value == 3) {
        this.isShowTwo = true
        this.isShowLing = false
        this.isShowOne = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (exitReasonList.target.value == 4) {
        this.isShowFour = true
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (exitReasonList.target.value == 5) {
        this.isShowFive = true
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.exitReasonOtherTip = false
      } else if (exitReasonList.target.value == 7) {
        this.isShowFive = false
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.exitReasonOtherTip = true
      } else {
        this.isShowFive = false
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.exitReasonOtherTip = false
      }
      if (exitReasonList.target.value != 4) {
        this.$nextTick(() => {
          this.adoptedFrom.setFieldsValue({
            exitDate: newdate
          })
        })
      }
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
      })
    },
    idCardValid (rule, value, callback) {
      const _self = this
      this.idCardValidate(rule, value, callback, _self).then(res => {
        if (res == '1') {
          this.$emit('idcardchange')
        }
      })
    },
    preview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 撤回
    async returnBack () {
      const params = {
        changeStatusId: this.changeStateId
      }
      await this.post(
        '/changeStatusUnattendedApi/recallChangeStatusUnattended',
        params
      ).then(res => {
        if (res.errors == null) {
          this.back()
        }
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      if (this.$refs[ref] != undefined) {
        this.$nextTick(() => {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        })
      }
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    back () {
      // this.adoptedFrom.setFieldsValue({
      //   changeChildType: []
      // })
      this.$router.go(-1)
    },
    onCloseCanle () {
      this.visible = false
    },
    // 获取变更后儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('CHANGECHILDTYPE')
      this.plainOptions = data
    },
    // 死亡原因
    async getdeathreason () {
      const data = await this.getDictionaries('DEATHREASON')
      this.deathreasonList = data
    },
    // 死亡处理方式
    async getdiedeal () {
      const data = await this.getDictionaries('DIEDEAL')
      this.diedealList = data
    },
    // 退出原因
    async getexitReason () {
      const data = await this.getDictionaries('EXITREASON')
      this.exitReasonList = data
      if (this.leg) {
        this.exitReasonList = this.exitReasonList.slice(0, 2)
      }
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 姓名详情
    childDetail () {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          id: this.addUnattendedIdDetail,
          childtypedisabled: 1,
          isdisabled: 1
        }
      })
    },
    // 儿童类别
    async getchildcategoryaList () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.childcategoryaList = data
      if (window.parent.indexTool.getUserInfo().orgType == '99') {
        this.guardianArray = []
      }
    },
    disabledDate (current) {
      const startDates = moment(this.startDate)
      return current && current <= startDates
    },
    async getDetails () {
      const url = this.addUnattendedId ? '/unattendedBaseChangeApi/queryChangeApply' : '/changeStatusUnattendedApi/detailChangeStatusUnattended'
      const param = this.addUnattendedId ? { addUnattendedId: this.addUnattendedId } : { changeStatusId: this.changeStateId }
      this.post(url, param).then((res) => {
        if (res.serviceSuccess) {
          if (this.addUnattendedId) {
            this.detailData = res.data.data.childBaseInformationVo
            this.name = res.data.data.childBaseInformationVo.name
            // 享受状态为享受中1末领年月为必填，享受状态为不享受0末领年月为非必填
            this.isEnjoyMoney = res.data.data.childBaseInformationVo.isEnjoyMoney
          } else {
            this.detailData = res.data.data
            this.name = res.data.data.name
            // 享受状态为享受中1末领年月为必填，享受状态为不享受0末领年月为非必填
            this.isEnjoyMoney = res.data.data.isEnjoyMoney
          }
          if (this.detailData.birthday) {
            this.detailData.birthday = moment(this.detailData.birthday)
          }
          if (this.detailData.exitDate) {
            this.detailData.exitDate = moment(this.detailData.exitDate)
          }
          if (this.detailData.endReceiveDate) {
            this.detailData.endGetDate = moment(
              this.detailData.endReceiveDate,
              'YYYY-MM'
            )
          }
          if (this.detailData.parentReleasedDate) {
            this.detailData.parentReleasedDate = moment(
              this.detailData.parentReleasedDate
            )
          }
          if (this.detailData.auditDate) {
            this.detailData.auditDate = moment(this.detailData.auditDate)
          }
          if (this.detailData.reportTime) {
            this.detailData.reportTime = moment(this.detailData.reportTime)
          }
          // if (this.detailData.changeChildType) {
          //   this.checkedList.push(this.detailData.changeChildType)
          //   this.detailData.changeChildType = this.checkedList
          //   this.onChange(this.checkedList)
          // }
          if (this.detailData.exitReason) {
            this.exitReason(this.detailData.exitReason)
          }
          if (this.detailData.fileList == null) {
            this.fileList = []
          } else {
            this.fileList = this.detailData.fileList
          }
          this.detailData.endGetDate = this.detailData.endGetDate ? moment(this.detailData.endGetDate) : null
          this.$nextTick(() => {
            this.adoptedFrom.setFieldsValue(this.detailData)
            if (this.applyShow == true) {
              this.cptAdoptedFrom.setFieldsValue(this.detailData)
            }
            setTimeout(() => {
              this.setHeight('one', 'oneout')
              this.setHeight('two', 'twoout')
            }, 500)
          })
        }
      })
    },
    exitReason (e) {
      if (e == '1') {
        this.isShowLing = true
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (e == '2') {
        this.isShowOne = true
        this.isShowLing = false
        this.isShowTwo = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (e == '3') {
        this.isShowTwo = true
        this.isShowLing = false
        this.isShowOne = false
        this.isShowFour = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (e == '4') {
        this.isShowFour = true
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFive = false
        this.exitReasonOtherTip = false
      } else if (e == '5') {
        this.isShowFive = true
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.exitReasonOtherTip = false
      } else if (e == '7') {
        this.isShowFive = false
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.exitReasonOtherTip = true
      } else if (e == '6') {
        this.isShowFive = false
        this.isShowLing = false
        this.isShowOne = false
        this.isShowTwo = false
        this.isShowFour = false
        this.exitReasonOtherTip = false
      }
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
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
.preservation {
  margin: 0 20px 0 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
}

.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 99%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  margin-top: 20px;
  overflow: hidden;
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
.fromintop {
  margin: 0px 0 0 5px 0;
  position: relative;
}
.equally {
  position: absolute;
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;
}
.fromin {
  width: calc(100% - 60px);
  margin-left: 60px;
  margin-top: 20px;
}
.frominadd {
  margin-top: 0;
}
.radio_grops {
  width: 100%;
}
.apply {
  position: absolute;
  top: 20px;
  right: 140px;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
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
</style>
