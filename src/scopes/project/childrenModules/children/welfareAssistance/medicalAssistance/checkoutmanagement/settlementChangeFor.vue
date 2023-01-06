<template>
  <div class="conts">
    <div class="contin">
      <ta-tabs :activeKey="nowkey"
               @change="callback">
        <ta-tab-pane tab="儿童基本信息和监护人信息"
                     key="1"
                     :forceRender="true"
                     v-if="!isNotBatch">
          <ChildInfoAndGuardian :disabled="true"
                                :childId="childId"
                                :childEnterId="childEnterId"
                                :childTypeNam.sync="childTypeName"
                                ref="childbase"></ChildInfoAndGuardian>
        </ta-tab-pane>
        <ta-tab-pane tab="医疗康复信息"
                     key="2"
                     :forceRender="true">
          <ChildInfoMedi :disabled="disabled"
                         :isNotBatch="isNotBatch"
                         ref="medical"></ChildInfoMedi>
        </ta-tab-pane>
        <ta-tab-pane tab="医疗康复费用"
                     key="3"
                     :forceRender="true">
          <div ref="twoout"
               class="mars">
            <Title title="经费明细（单位：元）"
                   :show.sync="showtwo"></Title>
            <ta-form layout="horizontal"
                     ref="two">
              <CloseAccountInfo :disabled="disabled"
                                :childTypeName="childTypeName"
                                @uochanhei="changeHei('two')"
                                :childId="childId"
                                v-if="!this.$route.query.isNotBatch"
                                ref="costs"></CloseAccountInfo>
              <CloseAccountInfoBatch :disabled="disabled"
                                     :prominentChildId="prominentChildId"
                                     @uochanhei="changeHei('two')"
                                     v-else
                                     ref="costs_batch"></CloseAccountInfoBatch>
            </ta-form>
          </div>
        </ta-tab-pane>
      </ta-tabs>
      <div class="paddingClass">
        <div v-show="this.flag.includes('approval')"
             ref="oneout"
             class="mars">
          <Title :title="'审核信息'"
                 :show.sync="showone"></Title>
          <div ref="one">
            <div style="overflow: hidden;"
                 v-if="approvalDisabled">
              <ta-form layout="horizontal"
                       :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
                <ta-col :span="24">
                  <ta-form-item label="审核意见"
                                :labelCol="{span:2}"
                                :wrapperCol="{span:22}"
                                fieldDecoratorId="auditOpinion"
                                :fieldDecoratorOptions="verificationRules('审核意见', 200,false)">
                    <ta-textarea :rows="4" />
                  </ta-form-item>
                </ta-col>
              </ta-form>
            </div>
            <div>
              <ta-table :columns="tableColumns"
                        :dataSource="tableData"
                        bordered>
                <span slot="num"
                      slot-scope="a, b, c">
                  <span>{{ c + 1 }}</span>
                </span>
                <div slot="auditStatus"
                     slot-scope="val">
                  <span :class="statusClass(val)">{{val}}</span>
                </div>
              </ta-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bom"
         v-if="this.flag.includes('approval')">
      <ta-button type="primary"
                 class="btnleft"
                 v-if="this.flag=='approval'"
                 @click="submits('1')">通过</ta-button>
      <ta-button type="danger"
                 class="btnleft"
                 v-if="this.flag=='approval'"
                 @click="submits('0')">驳回</ta-button>
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
    </div>
    <div class="bom"
         v-if="!this.flag.includes('approval')">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 v-if="!disabled"
                 class="btnleft temporarystorage"
                 @click="submit('1')">暂存</ta-button>
      <ta-button v-if="!disabled"
                 type="primary"
                 class="btnleft"
                 @click="submit('2')">提交</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChildInfoAndGuardian from './components/childInfoAndGuardian'
import ChildInfoMedi from './components/childInfoMedi'
import CloseAccountInfo from './components/closeAccountInfo'
import CloseAccountInfoBatch from './components/closeAccountInfoBatch'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '审核类型',
    dataIndex: 'auditType',
    align: 'center',
    collectionType: 'PLANTOMORROWAUDITTYPE',
    width: '13%'
  },
  {
    title: '审核级别',
    align: 'center',
    dataIndex: 'auditName',
    width: '14%'
  },
  {
    title: '审核单位',
    align: 'center',
    dataIndex: 'auditUnit',
    width: '14%',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '审核人',
    align: 'center',
    dataIndex: 'auditUser',
    width: '14%'
  },
  {
    title: '审核日期',
    align: 'center',
    dataIndex: 'auditDate',
    width: '17%'
  },
  {
    title: '审核结果',
    align: 'center',
    dataIndex: 'auditStatus',
    width: '10%',
    scopedSlots: { customRender: 'auditStatus' }
  },
  {
    title: '审核意见',
    align: 'center',
    dataIndex: 'auditOpinion',
    width: '30%'
  }
]
export default {
  name: 'medicalBudgetReport',
  components: {
    Title,
    ChildInfoAndGuardian,
    ChildInfoMedi,
    CloseAccountInfo,
    CloseAccountInfoBatch
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      isshow: false,
      showone: true,
      disabled: false, // 只读控制
      approvalDisabled: false, // 审核意见的只读控制
      childId: '', // 儿童id
      childEnterId: '', // 列表带过来的childEnterId
      id: '', // 列表带过来的id
      batchId: '', // 查询接口返回的批次id
      prominentChildId: '', // 综合查询过来时，此时需要凸显此儿童
      settlementBatchVo: {}, // 查询接口返回的批次vo
      startWorkflowId: '', // 开始流程节点id
      workflowId: '', // 流程节点id
      medicalRescueApplyId: '', // 列表带过来的medicalRescueApplyId
      medicalRescueVoID: '', // 编辑时medicalRescueVo里面的id
      flag: 'add', // 区分新增（add）、编辑（edit）还是查看（look）
      nowkey: '1', // 当前tab

      showtwo: true, // 医疗康复费用
      sexList: [], // 性别字典数据
      audittypeList: [], // 审核类型字典数据
      list: [], // 审批表单的list数据
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      childcategoryaList: [],
      childTypeName: '',
      isNotBatch: false, // 是否是批量申请体检费用过来的,
      isFromSearch: false,
      formDataSearch: {}

    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  mounted () {
    // 获取字典数据
    this.getAllMenus()
  },
  methods: {
    // 获取所有字典数据
    getAllMenus () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('PLANTOMORROWAUDITTYPE', 'audittypeList') // 获取审核类型字典数据
      this.getMenu('CHILDCATEGORYA', 'childcategoryaList') // 获取儿童类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case '撤回':// 撤回
          classValue = 'com_tobesubmitted'
          break
        case '待审批':// 待审批
          classValue = 'com_tobeaudited'
          break
        case '通过':// 通过
          classValue = 'com_adopt'
          break
        case '驳回':// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    // 初始化数据
    initData () {
      this.isNotBatch = false
      this.$refs.medical.MustTip = '1'
      this.$refs.medical.medicalApplyForm.resetFields()
      this.$refs.medical.treatmentForm.resetFields()

      // 清除附件信息
      this.$refs.medical.fileList = []

      this.isshow = false
      this.isFromSearch = false
      this.formDataSearch = {}
      this.childTypeName = ''
      this.disabled = false
      this.approvalDisabled = false
      this.flag = this.$route.query.flag
      this.id = this.$route.query.id
      this.childId = this.$route.query.childId
      this.childEnterId = this.$route.query.childEnterId
      this.prominentChildId = this.$route.query.prominentChildId || 0
      this.medicalRescueApplyId = this.$route.query.medicalRescueApplyId
      this.settlementBatchVo = {}
      // 是否是从查询跳转
      if (this.$route.query.isFromSearch) {
        this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
        this.isFromSearch = this.$route.query.isFromSearch
      }

      if (this.$route.query.isNotBatch) { // 批量申请体检费用过来的
        this.isNotBatch = this.$route.query.isNotBatch
        this.$nextTick(() => {
          // 初始化经费数据
          this.$refs.costs_batch.initData()
        })
        this.high()
      } else {
        this.$nextTick(() => {
          this.$refs.costs.obj = {}
          this.$refs.costs.obj2 = {}
          this.$refs.costs.obj3 = {}
          this.$refs.costs.fileList = []

          // 加载儿童基本信息和监护人信息数据
          this.$refs.childbase.loadData()
        })
      }
      if (this.flag != 'add') {
        if (this.flag == 'look') {
          this.disabled = true
          if (this.isNotBatch) {
            this.$refs.costs_batch.disabled = true
          }
        }

        this.post(!this.isNotBatch ? '/medicalRescueSettlement/queryById' : '/medicalRescueSettlement/queryByBatchId', { [!this.isNotBatch ? 'id' : 'batchId']: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            // 医疗申请信息赋值
            const { medicalRescueVo } = data
            if (medicalRescueVo) {
              this.$refs.medical.MustTip = medicalRescueVo.costCategory
              medicalRescueVo.applyDate = medicalRescueVo.applyDate ? moment(medicalRescueVo.applyDate) : null
              this.medicalRescueVoID = medicalRescueVo.id
              this.childEnterId = medicalRescueVo.childEnterId
              this.$refs.medical.medicalApplyForm.setFieldsValue(medicalRescueVo)
            }

            // 治疗情况赋值
            const { medicalRescueSettlementTreatmentVo } = data
            if (medicalRescueSettlementTreatmentVo) {
              medicalRescueSettlementTreatmentVo.valuationDate = medicalRescueSettlementTreatmentVo.valuationDate ? moment(medicalRescueSettlementTreatmentVo.valuationDate) : null
              // 是否住院治疗处理
              this.$refs.medical.hospitalizationValue = medicalRescueSettlementTreatmentVo.hospitalization
              if (medicalRescueSettlementTreatmentVo.hospitalization == this.Enum.YESNO.SHI) { // 是否住院治疗选择是
                medicalRescueSettlementTreatmentVo.admissionDate = medicalRescueSettlementTreatmentVo.admissionDate ? moment(medicalRescueSettlementTreatmentVo.admissionDate) : null
                medicalRescueSettlementTreatmentVo.dischargeDate = medicalRescueSettlementTreatmentVo.dischargeDate ? moment(medicalRescueSettlementTreatmentVo.dischargeDate) : null
              }
              // 是否配置康复辅助器具处理
              this.$refs.medical.isAuxEquipmentConfigValue = medicalRescueSettlementTreatmentVo.isAuxEquipmentConfig
              this.$refs.medical.auxEquipmentConfigOrgName = medicalRescueSettlementTreatmentVo.auxEquipmentConfigOrgName
              this.$nextTick(() => {
                this.$refs.medical.treatmentForm.setFieldsValue(medicalRescueSettlementTreatmentVo)
              })
            }

            // 医疗康复费用
            if (!this.isNotBatch) { // 单个申请
              const { medicalRescueSettlementCostVo } = data
              if (medicalRescueSettlementCostVo) {
                this.$refs.costs.obj = {
                  rehabilitationTreatmentCost: medicalRescueSettlementCostVo.rehabilitationTreatmentCost,
                  rehabilitationRehabilitationCost: medicalRescueSettlementCostVo.rehabilitationRehabilitationCost,
                  rehabilitationDrugCost: medicalRescueSettlementCostVo.rehabilitationDrugCost,
                  rehabilitationEquipmentCost: medicalRescueSettlementCostVo.rehabilitationEquipmentCost,
                  rehabilitationMedicalCost: medicalRescueSettlementCostVo.rehabilitationMedicalCost,
                  rehabilitationOtherCost: medicalRescueSettlementCostVo.rehabilitationOtherCost,
                  rehabilitationSubtotal: medicalRescueSettlementCostVo.rehabilitationSubtotal
                }
                this.$refs.costs.obj2 = {
                  deductReimbursement: medicalRescueSettlementCostVo.deductReimbursement,
                  deductIllnessInsurance: medicalRescueSettlementCostVo.deductIllnessInsurance,
                  deductMedicalRescue: medicalRescueSettlementCostVo.deductMedicalRescue,
                  deductRehabilitationRescue: medicalRescueSettlementCostVo.deductRehabilitationRescue,
                  deductCharitableDonation: medicalRescueSettlementCostVo.deductCharitableDonation,
                  deductOtherCost: medicalRescueSettlementCostVo.deductOtherCost,
                  deductSubtotal: medicalRescueSettlementCostVo.deductSubtotal
                }
                this.$refs.costs.obj3 = {
                  fundTreatmentCost: medicalRescueSettlementCostVo.fundTreatmentCost,
                  fundRehabilitationCost:
                    medicalRescueSettlementCostVo.fundRehabilitationCost,
                  fundDrugCost: medicalRescueSettlementCostVo.fundDrugCost,
                  fundEquipmentCost: medicalRescueSettlementCostVo.fundEquipmentCost,
                  fundMedicalCost: medicalRescueSettlementCostVo.fundMedicalCost,
                  fundAdmissionCost: medicalRescueSettlementCostVo.fundAdmissionCost,
                  fundSubtotal: medicalRescueSettlementCostVo.fundSubtotal
                }
              }
            } else { // 批量申请
              this.batchId = data.medicalRescueSettlementVo.batchId
              this.settlementBatchVo = data.settlementBatchVo
              const { costs_batch } = this.$refs
              const { medicalRescueSettlementCostBatchVos } = data
              costs_batch.listArr = medicalRescueSettlementCostBatchVos
              const selectedChildId = []
              medicalRescueSettlementCostBatchVos.forEach(item => {
                item.childInfoForSettlementBatchVos.forEach(item1 => {
                  selectedChildId.push(item1.childEnterId)
                })
              })
              costs_batch.selectedChildId = selectedChildId

              for (let i = 0; i < costs_batch.listArr.length; i++) {
                costs_batch.$set(costs_batch.attributeObj, 'show' + i, true)
                costs_batch.$set(costs_batch.attributeObj_copy, 'show' + i, true)
              }
            }

            // 附件赋值
            const { medicalRescueSettlementVo } = data
            const _self = this

            if (medicalRescueSettlementVo && medicalRescueSettlementVo.filePathVos) {
              const filePathVos = medicalRescueSettlementVo.filePathVos instanceof Array ? medicalRescueSettlementVo.filePathVos : JSON.parse(medicalRescueSettlementVo.filePathVos)
              filePathVos.forEach(element => {
                if (element.busiType == '9') { // 治疗记录证明材料
                  _self.$refs.medical.fileList.push(element)
                } else if (element.busiType == '11') { // 相关医疗票据
                  _self.$refs[this.isNotBatch ? 'costs_batch' : 'costs'].fileList.push(element)
                }
              })
            }
          }
          this.$nextTick(() => {
            this.setHeight('two', 'twoout')
            setTimeout(() => {
              this.$refs.medical.setHeight('two', 'twoout')
            }, 300)
          })
        })
      }
      //   审批跳转过来的
      if (this.flag.includes('approval')) {
        const _self = this
        _self.disabled = true
        if (this.isNotBatch) {
          _self.$refs.costs_batch.disabled = true
        }
        if (_self.flag == 'approval') {
          _self.approvalDisabled = true
          this.$nextTick(() => {
            this.searchForm.resetFields()
          })
        }
        _self.startWorkflowId = _self.$route.query.startWorkflowId// 开始流程节点id
        _self.workflowId = _self.$route.query.workflowId// 流程节点id
        let params = {}
        const url = this.isNotBatch ? '/medicalRescueSettlementAudit/querySettlementWorkflow' : '/medicalRescueSettlementAudit/queryWorkflow'
        params = {
          businessId: _self.id,
          startWorkflowId: _self.startWorkflowId
        }
        _self.post(url, params).then(res => {
          if (res.serviceSuccess) {
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
            _self.tableData = res.data.data.auditResultsList
            this.$nextTick(() => {
              setTimeout(() => {
                this.setHeight('one', 'oneout')
              }, 500)
            })
          }
        })
      }
      this.nowkey = this.isNotBatch ? '2' : '1'
    },
    // 审批form
    setForm (e, index) {
      this['form' + index] = e
    },
    high () {
      this.setHeight('two', 'twoout')
      this.setHeight('one', 'oneout')
      this.$refs.medical.setHeight('one', 'oneout')
      this.$refs.medical.setHeight('two', 'twoout')
    },
    // 审批通过驳回
    submits (e) {
      const len = this.list.length - 1
      const reason = this.searchForm.getFieldsValue().auditOpinion
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
      this.searchForm.validateFields((err, values) => {
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
                  this.backs()
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
                this.backs()
              }
            }
          })
        }
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    // tab切换change事件
    callback (e) {
      this.nowkey = e
      this.high()
    },
    // 暂存与提交
    async submit (val) {
      let isok = true
      let errMsg = '校验不通过，无法提交，请再次检查!'
      // 医疗康复信息-医疗申请信息
      await this.$refs.medical.medicalApplyForm.validateFields((err, values) => {
        if (err) {
          if (val == 1) {
            for (const k in err) {
              if (k != 'rescueDiseaseType' && k != 'rescueDiseaseName' && (!this.$refs.medical.medicalApplyForm.getFieldsValue()[k] || this.$refs.medical.medicalApplyForm.getFieldsValue()[k].length == 0)) {
                this.$refs.medical.medicalApplyForm.resetFields(k)
              } else {
                isok = false
                this.nowkey = '2'
                this.high()
              }
              // eslint-disable-next-line no-prototype-builtins
              if (err.hasOwnProperty('rescueDiseaseType') || err.hasOwnProperty('rescueDiseaseName')) { // 救治病种名称、救治病种类型必填
                isok = false
                this.nowkey = '2'
                this.high()
              }
            }
          } else {
            this.nowkey = '2'
            this.high()
            isok = false
          }
        }
      })
      // 医疗康复信息-治疗情况
      await this.$refs.medical.treatmentForm.validateFields((err, values) => {
        if (err) {
          if (val == 1) {
            for (const k in err) {
              if (k != 'medicalInstitutionName' && (!this.$refs.medical.treatmentForm.getFieldsValue()[k] || this.$refs.medical.treatmentForm.getFieldsValue()[k].length == 0)) {
                this.$refs.medical.treatmentForm.resetFields(k)
              } else {
                isok = false
                this.nowkey = '2'
                this.high()
              }
              // eslint-disable-next-line no-prototype-builtins
              if (err.hasOwnProperty('medicalInstitutionName')) { // 定点医院名称必填
                isok = false
                this.nowkey = '2'
                this.high()
              }
            }
          } else {
            this.nowkey = '2'
            this.high()
            isok = false
          }
        }
      })
      // 医疗康复费用-医疗康复费用(单个)
      if (!this.isNotBatch && val == 2 && !this.$refs.costs.obj.rehabilitationSubtotal) {
        errMsg = '请至少填写医疗康复费用的任意一项!'
        this.nowkey = '3'
        this.high()
        isok = false
      }
      if (this.isNotBatch) {
        // 每一项体检费用儿童至少一位
        const { listArr } = this.$refs.costs_batch
        for (let i = 0; i < listArr.length; i++) {
          if (listArr[i].childInfoForSettlementBatchVos == 0) {
            errMsg = '儿童体检费用' + (i + 1) + '请至少选择一名儿童!'
            this.nowkey = '3'
            for (let j = 0; j < i + 1; j++) {
              this.$refs.costs_batch.$set(this.$refs.costs_batch.attributeObj, 'show' + j, j == i)
            }
            setTimeout(() => {
              this.setHeight('two', 'twoout')
            }, 0)
            isok = false
            break
          }
        }
        // 单批次儿童不能超过100人
        if (this.$refs.costs_batch.childNum > 100) {
          errMsg = '批量申请的体检费用，最多可添加100位儿童！'
          this.nowkey = '3'
          this.high()
          isok = false
        }
      }
      if (isok) {
        let url = this.isNotBatch ? 'medicalRescueSettlement/batchSave' : '/medicalRescueSettlement/save'

        const medicalRescueSettlementVo = { buttonType: val, medicalRescueApplyId: this.medicalRescueApplyId } // 结账信息vo
        // 附件处理
        const fileList = [...this.$refs.medical.fileList || [], ...this.$refs[this.isNotBatch ? 'costs_batch' : 'costs'].fileList || []]
        const upLoadPathId = []
        fileList.map(item => {
          upLoadPathId.push(item.response.data.data.fileid)
        })
        medicalRescueSettlementVo.upLoadPathId = upLoadPathId

        const medicalRescueVo = this.$refs.medical.medicalApplyForm.getFieldsValue() // 明天计划申请vo（对应页面上医疗申请信息表单）
        medicalRescueVo.childBaseId = this.childId
        medicalRescueVo.childEnterId = this.childEnterId
        medicalRescueVo.applyDate = medicalRescueVo.applyDate ? moment(medicalRescueVo.applyDate).format('YYYY-MM-DD') : null
        const medicalRescueSettlementTreatmentVo = this.$refs.medical.treatmentForm.getFieldsValue() // 结账信息-治疗情况vo（对应页面上结账信息表单）
        medicalRescueSettlementTreatmentVo.valuationDate = medicalRescueSettlementTreatmentVo.valuationDate ? moment(medicalRescueSettlementTreatmentVo.valuationDate).format('YYYY-MM-DD') : null
        medicalRescueSettlementTreatmentVo.auxEquipmentConfigOrgName = this.$refs.medical.auxEquipmentConfigOrgName
        if (medicalRescueSettlementTreatmentVo.hospitalization == this.Enum.YESNO.SHI) { // 是否住院治疗选择是
          medicalRescueSettlementTreatmentVo.admissionDate = medicalRescueSettlementTreatmentVo.admissionDate ? moment(medicalRescueSettlementTreatmentVo.admissionDate).format('YYYY-MM-DD') : null
          medicalRescueSettlementTreatmentVo.dischargeDate = medicalRescueSettlementTreatmentVo.dischargeDate ? moment(medicalRescueSettlementTreatmentVo.dischargeDate).format('YYYY-MM-DD') : null
        }

        // 编辑
        if (this.flag == 'edit') {
          medicalRescueSettlementVo.id = this.id
          medicalRescueSettlementVo.batchId = this.batchId
          medicalRescueVo.id = this.medicalRescueVoID
          url = this.isNotBatch ? '/medicalRescueSettlement/batchUpdat' : '/medicalRescueSettlement/update'
        }
        const params = {}

        params.medicalRescueSettlementVo = medicalRescueSettlementVo// 结账信息vo
        params.medicalRescueVo = medicalRescueVo// 明天计划申请vo（对应页面上医疗申请信息表单）
        params.medicalRescueSettlementTreatmentVo = medicalRescueSettlementTreatmentVo// 结账信息-治疗情况vo（对应页面上结账信息表单）
        if (this.isNotBatch) { // 批量
          const { costs_batch } = this.$refs
          params.medicalRescueSettlementCostBatchVos = costs_batch.listArr // 结账信息-费用明细vo（对应页面上医疗康复费用表单）
          this.settlementBatchVo.childNumTotal = costs_batch.childNum // 儿童数量总和
          this.settlementBatchVo.rehabilitationSubtotal = costs_batch.firstTotal // 医疗康复费用-小计（元）
          this.settlementBatchVo.fundSubtotal = costs_batch.thirdTotal // 申请“明天计划”资助金额-小计（元）
          this.settlementBatchVo.dataSaveStatus = this.flag == 'add' ? 1 : 2
          params.settlementBatchVo = this.settlementBatchVo
        } else { // 单个申请
          const medicalRescueSettlementCostVo = {
            ...this.$refs.costs.obj,
            ...this.$refs.costs.obj2,
            ...this.$refs.costs.obj3
          } // 结账信息-费用明细vo（对应页面上医疗康复费用表单）
          params.medicalRescueSettlementCostVo = medicalRescueSettlementCostVo// 结账信息-费用明细vo（对应页面上医疗康复费用表单）
        }

        this.post(url, params, true).then((res) => {
          if (res.serviceSuccess) {
            this.$message.success('数据保存/更新成功')
            if (this.isNotBatch) {
              this.$refs.costs_batch.selectedChildId = []
            }
            this.$router.push({
              name: 'applicationSettlementRecord'
            })
          }
        })
      } else {
        this.$message.error(errMsg)
      }
    },
    // 返回
    backs () {
      if (this.isNotBatch) {
        this.$refs.costs_batch.selectedChildId = []
      }
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
    // 附件上传或删除后改变布局
    changeHei (e) {
      this.setHeight(e, e + 'out')
    },
    // 布局调整
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else if (ref == 'one') {
            node.style.height = this.$refs[ref].offsetHeight + 90 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 对比获取相同属性名不同值的属性名
    getChangeAttr (newVal) {
      const oldVal = this.attributeObj_copy
      let attrname = ''
      for (const k in oldVal) {
        if (newVal[k] != oldVal[k]) {
          attrname = k
        }
      }
      this.attributeObj_copy = JSON.parse(JSON.stringify(this.attributeObj))
      return attrname
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
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
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    }
  }
}
</script>
<style scoped type="text/less">
.mars {
  width: 99%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.paddingClass {
  padding: 0 10px 10px 10px;
}
/deep/ .ant-tabs {
  margin-bottom: 0;
}
</style>
