<template>
  <div class="conts">
    <div class="contin">
      <ta-tabs id="#anchorpoint_a"
               :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="明天计划申请信息"
                     key="1"
                     :forceRender="true">
          <div ref="oneout"
               class="mars">
            <Title id="anchorpoint_a"
                   title="儿童基本信息"
                   :show.sync="showone"></Title>
            <ta-form layout="horizontal"
                     ref="one"
                     :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
              <ChildInfoMed :nationList="nationList"
                            :sexList="sexList"
                            :childcategoryaList="childcategoryaList"
                            :illnesstypeList="illnesstypeList"
                            :disabilitylevelList="disabilitylevelList"
                            :censusregisterList="censusregisterList"
                            :disabilitytypeList="disabilitytypeList"
                            @setaddress="setaddress"
                            :addressmodel="addressmodel"
                            :disabled="disabled"></ChildInfoMed>
            </ta-form>
          </div>
          <div ref="twoout"
               class="mars">
            <Title id="anchorpoint_b"
                   title="医疗申请信息"
                   :show.sync="showtwo"></Title>
            <ta-form layout="horizontal"
                     ref="two"
                     :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
              <childInfoMedi :fileListImg.sync="fileListImg"
                             :fileListCard.sync="fileListCard"
                             :fileListFile.sync="fileListFile"
                             :incomeList.sync="incomeList"
                             :diBaoList.sync="diBaoList"
                             @setaddress="setaddress2"
                             :addressmodel="addressmodel2"
                             @clickSearch="clickSearch"
                             :disabledM="disabledM"
                             :guardianArray.sync="guardianArray"
                             @actualAddress="actualAddress"
                             :idcardList="idcardList"
                             :relationList="relationList"
                             :addreslistsmodel="addreslistsmodel"
                             :goType="goType"
                             :qtsf="qtsf"
                             ref="addition"></childInfoMedi>
            </ta-form>
          </div>
        </ta-tab-pane>
        <ta-tab-pane tab="结账信息"
                     key="2"
                     :forceRender="true">
          <div class="mars">
            <!-- <Title id="anchorpoint_d" title="填报信息" :show.sync="showthree"></Title> -->
            <ta-form layout="horizontal"
                     :autoFormCreate="(buggetFrom)=>{this.buggetFrom = buggetFrom}">
              <CloseAccountInfo :fileListChildImg.sync="fileListChildImg"
                                :fileRecode.sync="fileRecode"
                                :fileqita.sync="fileqita"
                                :effectList="effectList"
                                :medicalInstitutionNameList="medicalInstitutionNameList"
                                :adviceList="adviceList"
                                :yesnoList="yesnoList"
                                :disabled="disabled"
                                :disabledT="disabledT"
                                :goType="goType"
                                :yesnoB.sync="yesnoB"
                                ref="closeAccount"></CloseAccountInfo>
            </ta-form>
          </div>
        </ta-tab-pane>
      </ta-tabs>
      <div :ref="index+'out'"
           class="mars"
           v-for="(item,index) in list"
           :key="index">
        <Title :title="item.auditName||''"
               :show.sync="attributeObj['show'+index]"></Title>
        <ta-form layout="horizontal"
                 :autoFormCreate="function(form){setForm(form,index)}">
          <ta-row :ref="index"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="8">
                <ta-form-item label="审核类型"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="auditType">
                  <ta-select :placeholder="!disabled?'审核类型':''"
                             style="width:100%"
                             :disabled="disabled">
                    <ta-select-option :value="items.value"
                                      v-for="(items,indexs) in audittypeList "
                                      :key="indexs">{{items.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="item.auditShow=='2'">
                <ta-form-item label="审核单位"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="auditUnit">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8"
                      v-if="item.auditShow=='2'">
                <ta-form-item label="审核人"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="auditUser">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>

            </ta-col>
            <ta-col :span="24">

              <ta-col :span="8"
                      v-if="item.auditShow=='2'">
                <ta-form-item label="审核日期"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="auditDate">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="审核结果"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="auditStatus">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>

            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="审核意见"
                            class="auditOpinion"
                            :labelCol="{span:3}"
                            :wrapperCol="{span:20}"
                            fieldDecoratorId="auditOpinion"
                            :fieldDecoratorOptions="rules.countyAuditOpinion">
                <ta-textarea :disabled="reasonDisabled||list.length != index+1?true:false"
                             :rows="4" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button type="primary"
                 class="btnleft"
                 v-if="approveVisible"
                 @click="submit('1')">通过</ta-button>
      <ta-button type="danger"
                 class="btnleft"
                 v-if="approveVisible"
                 @click="submit('0')">驳回</ta-button>
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChildInfoMed from './components/childInfoMed'
import childInfoMedi from './components/childInfoMedi'
import CloseAccountInfo from './components/closeAccountInfo'
// import listMixin from '@component/common/js/mixins/listMixin'
import { setTimeout } from 'timers'
import moment from 'moment'
import { parse } from 'path'
export default {
  name: 'medicalBudgetReport',
  components: {
    Title,
    ChildInfoMed,
    childInfoMedi,
    CloseAccountInfo
  },
  // mixins: [listMixin],
  data () {
    return {
      page: 1,
      size: 10,
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      showsix: true,
      nowkey: '2',
      id: '',
      goType: '1',
      disabled: true,
      disabledM: true,
      totalDisabled: true,
      disabledT: true,
      nationList: [],
      sexList: [],
      childcategoryaList: [],
      illnesstypeList: [],
      disabilitylevelList: [],
      censusregisterList: [],
      disabilitytypeList: [],
      addressmodel: [],
      addressmodel2: [],
      fileListImg: [],
      fileListCard: [],
      fileListFile: [],
      incomeList: [],
      diBaoList: [],
      fileListChildImg: [],
      fileqita: [],
      fileRecode: [],
      idCardDisabled: '',
      medicalRescueApplyId: '',
      startWorkflowId: '',
      effectList: [],
      adviceList: [],
      yesnoList: [],
      currentStatus: '',
      auditType: '',
      // startWorkflowId: '',
      approveVisible: false,
      workflowId: '',
      qtsf: false,
      idcardList: [],
      relationList: [],
      addreslistsmodel: [],
      list: [],
      reasonDisabled: true,
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      // 添加监护人
      guardianArray: [],
      audittypeList: [],
      medicalInstitutionNameList: [],
      disabledProReason: true, // 控制省审核意见的只读
      disabledCityReason: true, // 控制市审核意见的只读
      disabledCountyReason: true, // 控制县审核意见的只读
      proAuditShow: '2', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '2', // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      countyAuditShow: '2', // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      currentShow: '', // 当前待审批的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
      rules: {
        proAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200),
        // name: this.verificationRules('联系人', 72),
        cityAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200),
        countyAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200, true)
      },
      yesnoB: true,
      settlementId: ''
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('9.8%', '90.2%', 'auditOpinion') // 审核意见字段宽度控制
  },
  activated () {
    this.loadData()
    this.qtsf = false
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      if (this.countyAuditShow != '0') {
        this.setHeight('four', 'fourout')
      }
      if (this.cityAuditShow != '0') {
        this.setHeight('five', 'fiveout')
      }
      if (this.proAuditShow != '0') {
        this.setHeight('six', 'sixout')
      }
    })
    this.getnation()
    this.getsexList()
    this.getchildList()
    this.getchildcategoryaList()
    this.getillnesstypeList()
    this.getdisabilitytypeList()
    this.getdisabilitylevelList()
    this.getcensusregisterList()
    this.geteffectList()
    this.getadviceList()
    this.getyesnoList()
    this.getIdcardList()
    this.getRelationList()
    this.getMedicalInstitutionName()

    const goTypeTemp = this.$route.query.goType
    if (goTypeTemp == 'approvalCloseAccountBatches-edit') {
      this.goType = '4'
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.medicalRescueApplyId = data.medicalRescueApplyId
      this.startWorkflowId = data.startWorkflowId
      this.disabled = true
      this.disabledM = true
      this.idCardDisabled = true
      this.getDetailsData()
    } else if (goTypeTemp == 'details') {
      this.goType = '9'
      const data = JSON.parse(this.$route.query.obj)
      this.settlementId = data.settlementIds
      this.startWorkflowId = data.startWorkflowId
      this.disabled = true
      this.disabledM = true
      this.idCardDisabled = true
      this.getDetailsData()
    }
    this.getAudittypeList()
  },
  mounted () { },
  methods: {
    loadData () {
      this.adoptedFrom.resetFields()
      this.cptAdoptorFrom.resetFields()
      this.$refs.closeAccount.adoptedFromo.resetFields()
      this.$refs.closeAccount.cptAdoptorFrom.resetFields()
      this.$refs.closeAccount.obj = {}
      this.nowkey = '2'
      this.disabled = true
      this.disabledM = true
      this.totalDisabled = true
      this.disabledT = true
      this.fileListImg = []
      this.fileListCard = []
      this.fileListFile = []
      this.incomeList = []
      this.diBaoList = []
      this.fileListChildImg = []
      this.fileqita = []
      this.fileRecode = []
      this.qtsf = false
      // 添加监护人
      this.guardianArray = []
    },
    setForm (e, index) {
      this['form' + index] = e
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
      }
    },
    // 审批通过驳回
    submit (e) {
      const len = this.list.length - 1
      const reason = this['form' + len].getFieldsValue().auditOpinion
      const params = {}
      params.reason = reason
      params.workflowId = this.workflowId
      if (this.currentShow == 'countyAuditOpinion') {
        params.reason = countyAuditOpinion
      }
      if (this.currentShow == 'cityAuditOpinion') {
        params.reason = cityAuditOpinion
      }
      if (this.currentShow == 'proAuditOpinion') {
        params.reason = proAuditOpinion
      }
      let isok = true
      this['form' + len].validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        if (e == '0') {
          // 驳回
          this.post('/medicalRescueSettlementAudit/reject', params).then(
            res => {
              if (res.serviceSuccess) {
                if (!res.errors) {
                  this.$message.success('信息已驳回!')
                  this.$router.go(-1)
                }
              }
            }
          )
        }
        if (e == '1') {
          // 通过
          this.post('/medicalRescueSettlementAudit/audit', params).then(res => {
            if (res.serviceSuccess) {
              if (!res.errors) {
                this.$message.success('信息已通过!')
                this.$router.go(-1)
              }
            }
          })
        }
      }
    },
    async getDetailsData () {
      const _self = this
      const aa = JSON.parse(_self.$route.query.obj)
      _self.startWorkflowId = aa.startWorkflowId // 流程节点id
      _self.workflowId = aa.workflowId // 流程节点id
      _self.approveVisible = _self.$route.query.approveVisible // 审批true、查看false
      if (_self.approveVisible) {
        _self.reasonDisabled = false
      } else {
        _self.reasonDisabled = true
      }
      _self.proAuditShow = '2' // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.cityAuditShow = '2' // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.countyAuditShow = '2' // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      let params = {}
      let url = ''
      if (this.goType == '4') {
        params = {
          businessId: this.id,
          startWorkflowId: this.startWorkflowId
        }
        url = '/medicalRescueSettlementAudit/queryWorkflow'
      } else if (this.goType == '9') {
        params = {
          settlementId: this.settlementId,
          startWorkflowId: this.startWorkflowId
        }
        url = '/medicalRescueSettleAccounts/queryById'
      }

      this.post(url, params).then(res => {
        if (res.serviceSuccess) {
          _self.disabled = true
          const obj = res.data.data
          if (obj.countyAuditStatus == 2) {
            obj.countyAuditStatus = '待审核'
          }
          if (obj.cityAuditStatus == 2) {
            obj.cityAuditStatus = '待审核'
          }
          if (obj.proAuditStatus == 2) {
            obj.proAuditStatus = '待审核'
          }
          if (obj.countyAuditStatus == 3) {
            obj.countyAuditStatus = '通过'
          }
          if (obj.cityAuditStatus == 3) {
            obj.cityAuditStatus = '通过'
          }
          if (obj.proAuditStatus == 3) {
            obj.proAuditStatus = '通过'
          }
          if (obj.countyAuditStatus == 4) {
            obj.countyAuditStatus = '驳回'
          }
          if (obj.cityAuditStatus == 4) {
            obj.cityAuditStatus = '驳回'
          }
          if (obj.proAuditStatus == 4) {
            obj.proAuditStatus = '驳回'
          }

          _self.list = res.data.data.auditResultsList
          const additionVue = {}
          for (var i = 0; i < _self.list.length; i++) {
            _self.$set(_self.attributeObj, 'show' + i, true)
            _self.$set(_self.attributeObj_copy, 'show' + i, true)
          }
          _self.$nextTick(() => {
            for (var i = 0; i < _self.list.length; i++) {
              _self['form' + i].setFieldsValue(_self.list[i])
              _self.setHeight(i, i + 'out')
            }
          })
          // 儿童基本信息赋值
          const medicalRescueApplyChildInfoVo =
            res.data.data.medicalRescueApplyChildInfoVo
          // 经费明细
          const medicalRescueSettlementCostVo =
            res.data.data.medicalRescueSettlementCostVo
          // 治疗情况
          const medicalRescueSettlementTreatmentVo =
            res.data.data.medicalRescueSettlementTreatmentVo

          const medicalRescueSettlementVo =
            res.data.data.medicalRescueSettlementVo
          // 救助申请信息
          let medicalRescueVo = res.data.data.medicalRescueVo
          // 儿童基本信息赋值
          if (medicalRescueApplyChildInfoVo.birthday) {
            medicalRescueApplyChildInfoVo.birthday = moment(
              medicalRescueApplyChildInfoVo.birthday
            )
          }
          if (medicalRescueApplyChildInfoVo.addChildDate) {
            medicalRescueApplyChildInfoVo.addChildDate = moment(
              medicalRescueApplyChildInfoVo.addChildDate
            )
          }
          const illnessArr = medicalRescueApplyChildInfoVo.illnessType
          medicalRescueApplyChildInfoVo.illnessType = illnessArr ? illnessArr.split(',') : []
          const arr = []
          arr.push(
            medicalRescueApplyChildInfoVo.province,
            medicalRescueApplyChildInfoVo.city,
            medicalRescueApplyChildInfoVo.county
          )
          this.addressmodel = [...arr]
          // 医疗基本信息赋值
          if (medicalRescueVo.intoCivilAdministrationDate) {
            medicalRescueVo.intoCivilAdministrationDate = moment(
              medicalRescueVo.intoCivilAdministrationDate
            )
          }
          if (medicalRescueVo.applyDate) {
            medicalRescueVo.applyDate = moment(medicalRescueVo.applyDate)
          }
          if (medicalRescueVo.intoOrgDate) {
            medicalRescueVo.intoOrgDate = moment(medicalRescueVo.intoOrgDate)
          }
          const arrAddress = []
          arrAddress.push(
            medicalRescueVo.province,
            medicalRescueVo.city,
            medicalRescueVo.county
          )
          this.addressmodel2 = [...arrAddress]
          this.childBaseId = medicalRescueVo.childBaseId
          this.medicalId = medicalRescueVo.id
          this.orgId = medicalRescueVo.orgId
          if (medicalRescueSettlementVo.filePathVos) {
            const filePathVos = JSON.parse(medicalRescueSettlementVo.filePathVos)
            filePathVos.map(item => {
              if (item.functionType == 'f1') {
                this.fileListChildImg.push(item)
              } else if (item.functionType == 'f2') {
                this.fileListCard.push(item)
              } else if (item.functionType == 'f0') {
                this.fileListFile.push(item)
              } else if (item.functionType == 'f3') {
                this.fileRecode.push(item)
              } else if (item.functionType == 'f4') {
                this.fileqita.push(item)
              }
            })
          }

          let medicalRescueVoFile
          if (medicalRescueVo.filePathVos) {
            this.fileListImg = []
            this.fileListCard = []
            this.fileListFile = []
            this.incomeList = []
            this.diBaoList = []
            medicalRescueVoFile = JSON.parse(medicalRescueVo.filePathVos)
            medicalRescueVoFile.map(item => {
              if (item.functionType == 'f1') {
                this.fileListImg.push(item)
              } else if (item.functionType == 'f2') {
                this.fileListCard.push(item)
              } else if (item.functionType == 'f0') {
                this.fileListFile.push(item)
              } else if (item.functionType == 'f3') {
                this.incomeList.push(item)
              } else if (item.functionType == 'f4') {
                this.diBaoList.push(item)
              }
            })
          }
          // 结账信息---治疗情况赋值
          if (medicalRescueSettlementTreatmentVo.hospitalization == '0') {
            this.yesnoB = false
          } else if (
            medicalRescueSettlementTreatmentVo.hospitalization == '1'
          ) {
            this.yesnoB = true
          }
          if (medicalRescueSettlementTreatmentVo.admissionDate) {
            medicalRescueSettlementTreatmentVo.admissionDate = moment(
              medicalRescueSettlementTreatmentVo.admissionDate
            )
          }
          if (medicalRescueSettlementTreatmentVo.dischargeDate) {
            medicalRescueSettlementTreatmentVo.dischargeDate = moment(
              medicalRescueSettlementTreatmentVo.dischargeDate
            )
          }
          if (medicalRescueSettlementTreatmentVo.valuationDate) {
            medicalRescueSettlementTreatmentVo.valuationDate = moment(
              medicalRescueSettlementTreatmentVo.valuationDate
            )
          }
          if (
            obj.medicalRescueGuardianVos != null &&
            obj.medicalRescueGuardianVos.length > 0
          ) {
            this.guardianArray = []
            if (obj.medicalRescueGuardianVos.length > 0) {
              this.qtsf = true
              const medicalRescueGuardianVos = obj.medicalRescueGuardianVos
              medicalRescueGuardianVos.map((item, index) => {
                this.guardianArray.push(index)
                this.addreslistsmodel[index] = []
                this.$nextTick(() => {
                  if (item.county && item.province && item.city) {
                    const arr = []
                    arr.push(item.province, item.city, item.county)
                    this.$set(this.addreslistsmodel, index, arr)
                  }
                  item = {
                    [`detail${index}`]: item.detail,
                    [`birthday${index}`]: moment(item.birthday),
                    [`contactNumber${index}`]: item.contactNumber,
                    [`guardian${index}`]: item.guardian,
                    [`idCard${index}`]: item.idCard,
                    [`idcardType${index}`]: item.idcardType,
                    [`relationship${index}`]: item.relationship,
                    [`sex${index}`]: item.sex
                  }
                  medicalRescueVo = { ...item, ...medicalRescueVo }
                })
              })
            } else {
              this.qtsf = false
            }
          } else if (
            obj.medicalRescueGuardianVos == [] ||
            obj.medicalRescueGuardianVos == null
          ) {
            if (this.goType == '2') {
              this.guardianArray = [1]
            } else {
              this.guardianArray = []
            }
          }
          // 残疾类型赋值
          medicalRescueApplyChildInfoVo.disabilityType = medicalRescueApplyChildInfoVo.disabilityType ? medicalRescueApplyChildInfoVo.disabilityType.split(',') : []
          this.$nextTick(() => {
            this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
            this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
          })
          this.$nextTick(() => {
            this.$refs.closeAccount.adoptedFromo.setFieldsValue(
              medicalRescueSettlementTreatmentVo
            )

            this.$refs.closeAccount.obj = medicalRescueSettlementCostVo
            this.$refs.closeAccount.cptAdoptorFrom.setFieldsValue(
              this.$refs.closeAccount.obj
            )
            setTimeout(() => {
              this.setHeight('one', 'oneout')
              this.setHeight('two', 'twoout')
              if (this.countyAuditShow != '0') {
                this.setHeight('four', 'fourout')
              }
              if (this.cityAuditShow != '0') {
                this.setHeight('five', 'fiveout')
              }
              if (this.proAuditShow != '0') {
                this.setHeight('six', 'sixout')
              }
              this.$refs.closeAccount.setHeight('two', 'twoout')
              this.$refs.closeAccount.setHeight('five', 'fiveout')
            }, 1000)
          })
          //
        }
      })
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (
            !(this.$refs[ref] instanceof Array) &&
            this.$refs[ref].$el != undefined
          ) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
          if (
            this.$refs[ref] instanceof Array &&
            this.$refs[ref][0].$el != undefined
          ) {
            if (!istrue) {
              node[0].style.height =
                this.$refs[ref][0].$el.offsetHeight + 90 + 'px'
            } else {
              node[0].style.height = '50px'
            }
            node[0].style.transition = 'all 1s'
          }
        }
      })
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      this.cptAdoptorFrom.setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    clickSearch () {
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
        if (this.countyAuditShow != '0') {
          this.setHeight('four', 'fourout')
        }
        if (this.cityAuditShow != '0') {
          this.setHeight('five', 'fiveout')
        }
        if (this.proAuditShow != '0') {
          this.setHeight('six', 'sixout')
        }
      })
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildList () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.childcategoryaList = data
    },
    // 儿童身份类别
    async getchildcategoryaList () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.childcategoryaList = data
    },
    // 与儿童关系
    async getRelationList () {
      const data = await this.getDictionaries('RELATION')
      this.relationList = data
    },
    //  证件类型
    async getIdcardList () {
      const data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardList = data
    },
    actualAddress (values) {
      this.cptAdoptorFrom.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
      })
    },
    // 患病类型
    async getillnesstypeList () {
      const data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    async getMedicalInstitutionName () {
      await this.post('/designatedHospital/list', {}).then(res => {
        this.medicalInstitutionNameList = res.data.pageBean.list
      })
    },
    // 残疾类型
    async getdisabilitytypeList () {
      const data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },
    // 审核类型
    async getAudittypeList () {
      const data = await this.getDictionaries('PLANTOMORROWAUDITTYPE')
      this.audittypeList = data
    },
    // 残疾等级
    async getdisabilitylevelList () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
      this.disabilitylevelList = data
    },
    // 户籍性质
    async getcensusregisterList () {
      const data = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data
    },
    // 民族
    async getnation () {
      const data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // 治疗评估效果
    async geteffectList () {
      const data = await this.getDictionaries('THERAPEUTICEVALUATION')
      this.effectList = data
    },
    // 拟安置意见
    async getadviceList () {
      const data = await this.getDictionaries('PROPOSEDPLACEMENT')
      this.adviceList = data
    },
    // 是否
    async getyesnoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    },
    backs () {
      this.$router.go(-1)
    },
    // 对比获取相同属性名不同值的属性名
    getChangeAttr (newVal) {
      const oldVal = this.attributeObj_copy
      let attrname = ''
      for (var k in oldVal) {
        if (newVal[k] != oldVal[k]) {
          attrname = k
        }
      }
      this.attributeObj_copy = JSON.parse(JSON.stringify(this.attributeObj))
      return attrname
    }
  },

  watch: {
    attributeObj: {
      handler (newVal) {
        const keyname = this.getChangeAttr(newVal)
        this.setHeight(
          keyname.replace('show', ''),
          keyname.replace('show', '') + 'out',
          !newVal[keyname]
        )
      },
      deep: true
    },
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    },
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showsix (val) {
      this.setHeight('six', 'sixout', !val)
    },
    maintenanceType () {
      this.setHeight('three', 'threeout', !this.showthree)
    }
  }
}
</script>
<style scoped type="text/less">
.ulData {
  width: 100%;
  height: 100%;
  border-radius: 4px 4px 0 0;
}
.ulData li {
  list-style: none;
  float: left;
  width: 14%;
  height: 46px;
  line-height: 46px;
  text-align: center;
}
.ulData .ulDataLi {
  /* background: #d4eaff; */
  /* border: 1px solid rgba(0, 0, 0, 0.09); */
  background: rgba(240, 247, 253, 1);
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
  /* border-radius: 4px 4px 0px 0px; */
}
.ulData .lastLi {
  border-right: 1px solid rgba(0, 0, 0, 0.09);
}
.ulData .ulDataLiTwo,
.ulData .ulDataLiThree,
.ulData .ulDataLiFour {
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
}
.ulData .ulDataLiFour {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.ant-input-number {
  border: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
/* .ant-input-number .ant-input-number-handler-wrap{
    display: none !important;
    z-index: -1;
} */
.preservation {
  margin-left: 20px;
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
  width: 83%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
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
.marsss {
  width: 83%;
  margin-bottom: 15px;
  /* border: 1px dashed rgba(0, 0, 0, 0.34901960784313724); */
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.tables {
  margin-bottom: 20px;
}
</style>
