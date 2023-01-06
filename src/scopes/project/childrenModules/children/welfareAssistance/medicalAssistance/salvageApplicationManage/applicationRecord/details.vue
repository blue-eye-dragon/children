<template>
  <div class="conts">
    <!-- 医疗申请记录----查看 -->
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="救助申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="儿童姓名"
                            :labelCol="{span:8}"
                            :wrapperCol="{span:15}"
                            fieldDecoratorId="name">
                <a @click="childDetail">{{name}}</a>
              </ta-form-item>
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
                <span>{{currentStatus}}</span>
              </ta-form-item>
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
          </ta-row>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars"
           v-if="approveVisible==false">
        <Title id="anchorpoint_b"
               title="医疗申请信息"
               :show.sync="showtwo"></Title>
        <ta-form layout="horizontal"
                 ref="two"
                 :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}">
          <ChildInfoMedi :fileListImg.sync="fileListImg"
                         :fileListCard.sync="fileListCard"
                         :fileListFile.sync="fileListFile"
                         :incomeList.sync="incomeList"
                         :diBaoList.sync="diBaoList"
                         @setaddress="setaddress2"
                         :addressmodel2="addressmodel2"
                         @clickSearch="clickSearch"
                         :disabled="disabled"
                         :guardianArray.sync="guardianArray"
                         @actualAddress="actualAddress"
                         :idcardList="idcardList"
                         :relationList="relationList"
                         :addreslistsmodel="addreslistsmodel"
                         :goType="goType"
                         :qtsf="qtsf"></ChildInfoMedi>
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
                 v-if="this.goType=='4'"
                 class="preservation"
                 @click="returnInfo()">撤回</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 v-if="approveVisible"
                 @click="submit('1')">通过</ta-button>
      <ta-button type="danger"
                 class="preservation"
                 v-if="approveVisible"
                 @click="submit('0')">驳回</ta-button>
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChildInfoMed from '../../../components/childInfoMed'
import ChildInfoMedi from '../../../components/childInfoMedi'
import Countyexamine from '../../../components/countyexamine'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'salvageApprovalBatches',
  components: {
    Title,
    ChildInfoMed,
    ChildInfoMedi,
    Countyexamine
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      goType: '0',
      // showone: true,
      saveOrno: true,
      // showtwo: true,
      bg: false, // 变更申请显示状态标志
      nowkey: '1',
      objTemp: [], // 上一个页面数据传入
      id: '',
      nationList: [],
      sexList: [],
      childcategoryaList: [],
      illnesstypeList: [],
      disabilitylevelList: [],
      censusregisterList: [],
      disabilitytypeList: [],
      // 是否提交保存
      buttonType: '1',
      fileListImg: [],
      fileListCard: [],
      fileListFile: [],
      incomeList: [],
      diBaoList: [],
      list: [],
      reasonDisabled: true,
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj

      addressmodel: [],
      addressmodel2: [],
      childBaseId: '',
      medicalId: '',
      orgId: '',
      guardianArray: [1],
      qtsf: false,
      idcardList: [],
      relationList: [],
      addreslistsmodel: [],
      disabled: true,
      visible: false,
      disabledProReason: true, // 控制省审核意见的只读
      disabledCityReason: true, // 控制市审核意见的只读
      disabledCountyReason: true, // 控制县审核意见的只读
      audittypeList: [],
      activeKey: ['1', '2', '3', '4'],
      getchildmedicalList: [],
      name: '',
      currentStatus: '',
      auditType: '',
      startWorkflowId: '',
      workflowId: '',
      approveVisible: false,
      proAuditShow: '2', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '2', // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      countyAuditShow: '2', // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      currentShow: '' // 当前待审批的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
    }
  },
  activated () {
    this.adoptedFrom.resetFields()
    this.cptAdoptorFrom.resetFields()
    this.getchildcategoryaList()
    this.getAudittypeList()
    this.getIdcardList()
    this.getRelationList()
    let goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      // this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
    })
    if (goTypeTemp == 'applicationRecord-details') {
      // 查看
      this.bg = false // 隐藏变更说明弹框
      this.goType = '1'
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
    } else if (goTypeTemp == 'applicationRecord-back') {
      // 撤回
      this.bg = false // 隐藏变更说明弹框
      this.goType = '4'
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
    }
    this.getShowDatas()
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      // this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.getnation()
      this.getsexList()
      this.getillnesstypeList()
      this.getdisabilitytypeList()
      this.getdisabilitylevelList()
      this.getcensusregisterList()
      window.onresize = () => {
        this.$nextTick(() => {
          this.setHeight('one', 'oneout', !this.showone)
          this.setHeight('three', 'threeout', !this.showthree)
        })
      }
    })
    this.getchildmedicaltypeList()
  },
  methods: {
    // 点击审批或查看时的页面数据获取
    getShowDatas () {
      let _self = this
      let aa = JSON.parse(_self.$route.query.obj)
      _self.startWorkflowId = aa.startWorkflowId // 流程节点id
      _self.workflowId = aa.workflowId // 流程节点id
      _self.approveVisible = _self.$route.query.approveVisible // 审批true、查看false

      _self.proAuditShow = '2' // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.cityAuditShow = '2' // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.countyAuditShow = '2' // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self
        .post('/medicalRescueApplyAudit/queryWorkflow', {
          businessId: _self.id,
          startWorkflowId: _self.startWorkflowId
        })
        .then(res => {
          if (res.serviceSuccess) {
            _self.disabled = true
            let obj = res.data.data
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
            let additionVue = {}
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
            let medicalRescueApplyChildInfoVo =
              obj.medicalRescueApplyChildInfoVo
            medicalRescueApplyChildInfoVo.birthday = moment(
              medicalRescueApplyChildInfoVo.birthday
            )
            if (
              medicalRescueApplyChildInfoVo.addChildDate == '' ||
              medicalRescueApplyChildInfoVo.addChildDate == null
            ) {
              delete medicalRescueApplyChildInfoVo.addChildDate
            } else {
              medicalRescueApplyChildInfoVo.addChildDate = moment(
                medicalRescueApplyChildInfoVo.addChildDate
              )
            }
            let illnessArr = medicalRescueApplyChildInfoVo.illnessType
            medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
            let arr = []
            arr.push(
              medicalRescueApplyChildInfoVo.province,
              medicalRescueApplyChildInfoVo.city,
              medicalRescueApplyChildInfoVo.county
            )
            this.addressmodel = [...arr]
            // 医疗基本信息赋值
            let medicalRescueVo = obj.medicalRescueVo
            medicalRescueVo.intoCivilAdministrationDate = moment(
              medicalRescueVo.intoCivilAdministrationDate
            )
            // medicalRescueVo.applyDate = moment(medicalRescueVo.applyDate)
            medicalRescueVo.intoOrgDate = moment(medicalRescueVo.intoOrgDate)
            let arrAddress = []
            arrAddress.push(
              medicalRescueVo.province,
              medicalRescueVo.city,
              medicalRescueVo.county
            )
            this.addressmodel2 = [...arrAddress]
            this.childBaseId = medicalRescueVo.childBaseId
            this.medicalId = medicalRescueVo.id
            this.orgId = medicalRescueVo.orgId
            let filePathVos = JSON.parse(medicalRescueVo.filePathVos)
            filePathVos.map(item => {
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
            this.name = medicalRescueApplyChildInfoVo.name
            let curData = JSON.parse(this.$route.query.obj).curStatus
            this.currentStatus = this.CollectionLabel('MEDICAL_RESCUE_APPLY_LIST_STATUS', curData)
            this.adoptedFrom.setFieldsValue({
              name: this.name,
              currentStatus: this.currentStatus,
              applyOrg: res.data.data.applyOrg,
              applyUnit: medicalRescueVo.applyUnit,
              applyDate: medicalRescueVo.applyDate
            })
            this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
          }
        })
    },
    // 审批通过-驳回
    submit (e) {
      let reason = this.from.getFieldsValue()[`${this.currentShow}`]
      if (e == '0') {
        // 驳回
        this.post('/medicalRescueApplyAudit/reject', {
          workflowId: this.workflowId,
          reason: reason
        }).then(res => {
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
        this.post('/medicalRescueApplyAudit/audit', {
          workflowId: this.workflowId,
          reason: reason
        }).then(res => {
          if (res.serviceSuccess) {
            if (!res.errors) {
              this.$message.success('信息已通过!')
              this.$router.go(-1)
            }
          }
        })
      }
    },
    // 撤回确定
    async returnInfo () {
      let params = {}
      params.id = this.medicalId
      await this.post('/medicalRescueApplyAudit/revoke', params).then(res => {
        if (res.errors == null) {
          this.$message.success(res.data.success)
          this.visible = false
          this.backs()
        }
      })
    },
    // 查看儿童详情
    childDetail () {
      this.$router.push({
        name: 'applyFor',
        query: {
          id: this.id,
          disabledD: true,
          goType: 'salvageApplication-detail'
        }
      })
    },
    // 审核类型
    async getAudittypeList () {
      let data = await this.getDictionaries('PLANTOMORROWAUDITTYPE')
      this.audittypeList = data
    },
    // 状态类型
    async getchildmedicaltypeList () {
      let data = await this.getDictionaries('MEDICAL_RESCUE_NODE_STATUS')
      this.getchildmedicalList = data
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
        this.setHeight('three', 'threeout')
      })
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.childcategoryaList = data
    },
    actualAddress (values) {
      this.cptAdoptorFrom.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
      })
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },

    // 残疾等级
    async getdisabilitylevelList () {
      let data = await this.getDictionaries('DISABILITYLEVEL')
      this.disabilitylevelList = data
    },
    // 户籍性质
    async getcensusregisterList () {
      let data = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    chans () {
    },
    backs () {
      this.$router.go(-1)
    },
    // 与儿童关系
    async getRelationList () {
      let data = await this.getDictionaries('RELATION')
      this.relationList = data
    },
    //  证件类型
    async getIdcardList () {
      let data = await this.getDictionaries('IDCARD_TYPE')
      this.idcardList = data
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
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
      let oldVal = this.attributeObj_copy
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
        let keyname = this.getChangeAttr(newVal)
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
