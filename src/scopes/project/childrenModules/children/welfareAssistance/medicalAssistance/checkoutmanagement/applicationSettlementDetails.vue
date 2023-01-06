<template>
  <div class="conts">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="结账申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(detailForm)=>{this.detailForm = detailForm}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="儿童姓名"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}"
                            fieldDecoratorId="name">
                <div style="line-height: 38px;margin-bottom: -20px;">
                  <a @click="childDetail">{{name}}</a>
                </div>
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="12">
                <ta-form-item label="申请日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="applyDate">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12">
                <ta-form-item label="当前状态"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="currentStatus">
                  <div style="line-height: 38px;margin-bottom: -20px;">
                    <span>{{currentStatus}}</span>
                  </div>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="12">
                <ta-form-item label="申请单位"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="applyUnit">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12"
                      v-if="approveVisible==false">
                <ta-form-item label="申请人"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="applicant">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>

      <div>
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
                                fieldDecoratorId="auditType">
                    <ta-select placeholder="审核类型"
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
                                fieldDecoratorId="auditUnit">
                    <ta-input :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="8">
                  <ta-form-item label="审核结果"
                                fieldDecoratorId="auditStatus">
                    <ta-input :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8"
                        v-if="item.auditShow=='2'">
                  <ta-form-item label="审核日期"
                                fieldDecoratorId="auditDate">
                    <ta-input :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="8"
                        v-if="item.auditShow=='2'">
                  <ta-form-item label="审核人"
                                fieldDecoratorId="auditUser">
                    <ta-input :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="审核意见"
                              class="auditOpinion"
                              :labelCol="{span:2}"
                              :wrapperCol="{span:22}"
                              fieldDecoratorId="auditOpinion">
                  <ta-textarea :disabled="reasonDisabled||list.length != index+1?true:false"
                               :rows="4" />
                </ta-form-item>
              </ta-col>
            </ta-row>
          </ta-form>
        </div>
      </div>
    </div>
    <div class="bom">
      <ta-button type="danger"
                 v-if="this.goType == '3'"
                 class="btnleft"
                 @click="returnInfo()">撤回</ta-button>
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
import moment from 'moment'
// import listMixin from '@component/common/js/mixins/listMixin'
export default {
  name: 'settlementChangeFor',
  components: {
    Title
  },
  // mixins: [listMixin],
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      key: '1',
      fileListImg: [],
      fileqita: [],
      fileRecode: [],
      id: '',
      isBatch: '', // 列表传过来的批次id
      childId: '', // 儿童id
      childEnterId: '',
      disabledM: '',
      disabled: '',
      disabledT: false,
      idCardDisabled: '',
      goType: '',
      medicalRescueApplyId: '',
      startWorkflowId: '',
      effectList: [],
      adviceList: [],
      yesnoList: [],
      audittypeList: [],
      disabledProReason: true, // 控制省审核意见的只读
      disabledCityReason: true, // 控制市审核意见的只读
      disabledCountyReason: true, // 控制县审核意见的只读
      activeKey: ['1', '2', '3', '4'],
      getchildmedicalList: [],
      name: '',
      addressmodel: [],
      addressmodel2: [],
      currentStatus: '',
      auditType: '',
      list: [],
      reasonDisabled: true,
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      // startWorkflowId: '',
      approveVisible: false,
      workflowId: '',
      proAuditShow: '', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '', // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      countyAuditShow: '', // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      currentShow: '' // 当前待审批的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
    }
  },
  activated () {
    this.name = ''
    this.currentStatus = ''
    this.detailForm.resetFields()
    const goTypeTemp = this.$route.query.goType
    if (goTypeTemp == 'applicationSettlementDetails-details') {
      this.goType = 1
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.isBatch = data.isBatch
      this.childId = data.childId
      this.childEnterId = data.childEnterId
      this.medicalRescueApplyId = data.medicalRescueApplyId
      this.startWorkflowId = data.startWorkflowId
      this.disabled = true
      this.disabledM = true
      this.disabledT = true
      this.idCardDisabled = true
      this.getDetailsData(data)
    } else if (goTypeTemp == 'applicationSettlementDetails-return') {
      this.goType = 3
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.isBatch = data.isBatch
      this.childId = data.childId
      this.childEnterId = data.childEnterId
      this.medicalRescueApplyId = data.medicalRescueApplyId
      this.startWorkflowId = data.startWorkflowId
      this.disabled = true
      this.disabledM = true
      this.disabledT = true
      this.idCardDisabled = true
      this.getDetailsData(data)
    }
    this.geteffectList()
    this.getadviceList()
    this.getAudittypeList()
    this.getyesnoList()
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      if (this.countyAuditShow != '0') {
        this.setHeight('three', 'threeout')
      }
      if (this.cityAuditShow != '0') {
        this.setHeight('four', 'fourout')
      }
      if (this.proAuditShow != '0') {
        this.setHeight('five', 'fiveout')
      }
    })
  },
  methods: {
    chans () {

    },
    preservation () { },
    backs () {
      this.detailForm.resetFields()
      this.$router.go(-1)
    },
    // 审批通过驳回
    submit (e) {
      const countyAuditOpinion = this.from.getFieldsValue()[
        `${this.currentShow}`
      ]
      const cityAuditOpinion = this.fromOne.getFieldsValue()[
        `${this.currentShow}`
      ]
      const proAuditOpinion = this.fromTwo.getFieldsValue()[
        `${this.currentShow}`
      ]
      const params = {}
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
      if (e == '0') {
        // 驳回
        this.post('/medicalRescueSettlementAudit/reject', params).then(res => {
          if (res.serviceSuccess) {
            if (!res.errors) {
              this.$message.success('信息已驳回!')
              this.$router.go(-1)
            }
          }
        })
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
    },
    // 时间处理
    changetime (data) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
      }
    },
    async getDetailsData (e) {
      const _self = this
      const aa = JSON.parse(_self.$route.query.obj)
      _self.startWorkflowId = aa.startWorkflowId // 流程节点id
      _self.workflowId = aa.workflowId // 流程节点id
      _self.approveVisible = _self.$route.query.approveVisible // 审批true、查看false

      _self.proAuditShow = '2' // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.cityAuditShow = '2' // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.countyAuditShow = '2' // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）

      const params = {
        businessId: this.id,
        startWorkflowId: this.startWorkflowId
      }
      this.post(e.isBatch == 1 ? '/medicalRescueSettlementAudit/querySettlementWorkflow' : '/medicalRescueSettlementAudit/queryWorkflow', params).then(
        res => {
          if (res.serviceSuccess) {
            if (e.isBatch == 1) {
              _self.list = res.data.data.auditResultsList
              for (var i = 0; i < _self.list.length; i++) {
                _self.$set(_self.attributeObj, 'show' + i, true)
                _self.$set(_self.attributeObj_copy, 'show' + i, true)
              }
              this.currentStatus = res.data.data.currentStatus
              this.name = e.childName
              this.detailForm.setFieldsValue({
                applyUnit: res.data.data.applyOrg,
                applyDate: res.data.data.applyDate
              })

              _self.$nextTick(() => {
                this.setHeight('one', 'oneout')
                for (var i = 0; i < _self.list.length; i++) {
                  _self['form' + i].setFieldsValue(_self.list[i])
                  _self.setHeight(i, i + 'out')
                }
              })
            } else {
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
              for (let i = 0; i < _self.list.length; i++) {
                _self.$set(_self.attributeObj, 'show' + i, true)
                _self.$set(_self.attributeObj_copy, 'show' + i, true)
              }
              _self.$nextTick(() => {
                for (let i = 0; i < _self.list.length; i++) {
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
              const medicalRescueVo = res.data.data.medicalRescueVo
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
              let illnessArr
              if (medicalRescueApplyChildInfoVo.illnessType) {
                illnessArr = medicalRescueApplyChildInfoVo.illnessType
                medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
              }
              const arr = []
              arr.push(
                medicalRescueApplyChildInfoVo.province,
                medicalRescueApplyChildInfoVo.city,
                medicalRescueApplyChildInfoVo.county
              )
              // 医疗基本信息赋值
              if (medicalRescueVo.intoCivilAdministrationDate) {
                medicalRescueVo.intoCivilAdministrationDate = moment(
                  medicalRescueVo.intoCivilAdministrationDate
                )
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
              // medicalRescueVo.orgName = window.parent.indexTool.getUserInfo().orgName
              this.childBaseId = medicalRescueVo.childBaseId
              this.medicalId = medicalRescueVo.id
              this.orgId = medicalRescueVo.orgId
              const filePathVos = JSON.parse(medicalRescueVo.filePathVos)
              filePathVos.map(item => {
                if (item.functionType == 'f1') {
                  this.fileListImg.push(item)
                } else if (item.functionType == 'f3') {
                  this.fileRecode.push(item)
                } else if (item.functionType == 'f4') {
                  this.fileqita.push(item)
                }
              })
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
              this.name = medicalRescueApplyChildInfoVo.name
              this.currentStatus = obj.currentStatus
              this.detailForm.setFieldsValue({
                name: this.name,
                currentStatus: this.currentStatus,
                applyOrg: obj.applyOrg,
                applyUnit: medicalRescueVo.applyUnit,
                applyDate: medicalRescueVo.applyDate
              })
            }
          }
        }
      )
    },
    // 撤回确定
    async returnInfo () {
      const params = {}
      params.id = this.id
      await this.post('/medicalRescueSettlementAudit/revoke', params).then(
        res => {
          if (res.errors == null) {
            this.$message.success(res.data.success)
            this.backs()
          }
        }
      )
    },
    // 查看儿童详情
    childDetail () {
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          id: this.id,
          childId: this.childId,
          childEnterId: this.childEnterId,
          startWorkflowId: this.startWorkflowId,
          workflowId: this.workflowId,
          isNotBatch: this.isBatch == 1,
          flag: 'look',
          disabledD: true,
          goType: 'settlementChangeFor-detail'
        }
      })
    },
    // 治疗评估效果
    async geteffectList () {
      const data = await this.getDictionaries('THERAPEUTICEVALUATION')
      this.effectList = data
    },
    // 审核类型
    async getAudittypeList () {
      const data = await this.getDictionaries('PLANTOMORROWAUDITTYPE')
      this.audittypeList = data
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
        if (this.countyAuditShow != '0') {
          this.setHeight('three', 'threeout')
        }
        if (this.cityAuditShow != '0') {
          this.setHeight('four', 'fourout')
        }
        if (this.proAuditShow != '0') {
          this.setHeight('five', 'fiveout')
        }
      })
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
    },
    setForm (e, index) {
      this['form' + index] = e
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
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    },
    showfive (val) {
      this.setHeight('five', 'fiveout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #fff;
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
  width: 83%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.preservation {
  margin-left: 32px;
}
</style>
