<template>
  <div class="conts">
    <div class="contin">
      <!-- <ta-anchor class="md" :offsetTop="10" @click.native="chans">
        <ta-anchor-link href="#anchorpoint_a" title="变更申请信息" />
        <ta-anchor-link
          href="#anchorpoint_c"
          v-if="countyAuditShow!='0'"
          state="replace"
          title="区县审核信息"
        />
        <ta-anchor-link
          href="#anchorpoint_d"
          v-if="cityAuditShow!='0'"
          state="replace"
          title="市级审核信息"
        />
        <ta-anchor-link
          href="#anchorpoint_e"
          v-if="proAuditShow!='0'"
          state="replace"
          title="省级审核信息"
        />
      </ta-anchor>-->
      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="变更申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ApplicationChangeInfo ref="changeInfo"></ApplicationChangeInfo>
          <ta-row class="frominadd">
            <ta-col :span="24">
              <ta-form-item label="变更原因"
                            fieldDecoratorId="changeReason"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }">
                <ta-textarea placeholder
                             :rows="4"
                             :disabled="true" />
              </ta-form-item>
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
// import ChildInfoMed from './components/childInfoMed'
// import ChildInfoMedi from './components/childInfoMedi'
import Countyexamine from './components/countyexamine'
import ApplicationChangeInfo from './components/applicationChangeInfo'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'salvageApprovalBatches',
  components: {
    Title,
    // ChildInfoMed,
    // ChildInfoMedi,
    Countyexamine,
    ApplicationChangeInfo
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      goType: 0,
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
      addressmodel: [],
      addressmodel2: [],
      audittypeList: [],
      childBaseId: '',
      medicalId: '',
      orgId: '',
      disabled: true,
      visible: false,
      disabledProReason: true, // 控制省审核意见的只读
      disabledCityReason: true, // 控制市审核意见的只读
      disabledCountyReason: true, // 控制县审核意见的只读

      activeKey: ['1', '2', '3', '4'],
      getchildmedicalList: [],
      name: '',
      currentStatus: '',
      auditType: '',
      startWorkflowId: '',
      workflowId: '',
      approveVisible: false,
      medicalRescueApplyId: '',
      list: [],
      reasonDisabled: true,
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      proAuditShow: '', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '', // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      countyAuditShow: '', // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      currentShow: '', // 当前待审批的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
      rules: {
        proAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200),
        // name: this.verificationRules('联系人', 72),
        cityAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200),
        countyAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200)
      }
    }
  },
  activated () {
    this.adoptedFrom.resetFields()
    this.loadData()
    // this.cptAdoptorFrom.resetFields()
    this.getchildcategoryaList()
    this.getAudittypeList()
    const goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办

    if (goTypeTemp == 'salvageApproval-edit') {
      // 救助审核-待审批
      this.bg = false // 隐藏变更说明弹框
      this.goType = 1
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      console.log(555555555)
      // this.getDetails();
      this.$nextTick(() => {
        this.getShowDatas()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      // this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.getnation()
      this.getsexList()
      // this.getchildcategoryaList()
      this.getillnesstypeList()
      this.getdisabilitytypeList()
      this.getdisabilitylevelList()
      this.getcensusregisterList()
      window.onresize = () => {
        console.log(this.showone)
        // this.showone = true
        this.$nextTick(() => {
          this.setHeight('one', 'oneout', !this.showone)
          // this.setHeight('two', 'twoout', !this.showtwo)
          this.setHeight('three', 'threeout', !this.showthree)
        })
      }
    })
    this.getchildmedicaltypeList()
  },
  methods: {
    setForm (e, index) {
      console.log(e)
      this['form' + index] = e
      console.log(this['form' + index])
    },
    loadData () {
      this.$refs.changeInfo.rescueDiseaseTypeVisible = [
        false,
        '救治病种类型'
      ]
      this.$refs.changeInfo.rescueDiseaseNameVisible = [
        false,
        '救治病种名称'
      ]
      this.$refs.changeInfo.childIdentityTypeVisible = [
        false,
        '儿童身份类型'
      ]
      this.$refs.changeInfo.contactVisible = [false, '联系人']
      this.$refs.changeInfo.contactTelephoneVisible = [false, '联系电话']
      this.$refs.changeInfo.belongToOrgVisible = [false, '所属福利机构']
      this.$refs.changeInfo.intoCivilAdministrationDateVisible = [
        false,
        '进入福利机构日期'
      ]
      this.$refs.changeInfo.civilAdministrationDepartmentVisible = [
        false,
        '所属民政部门'
      ]
      this.$refs.changeInfo.address_LinkageVisible = [false, '户籍所在地']
      this.$refs.changeInfo.familyAverageAnnualIncomeVisible = [
        false,
        '家庭人均年收入(元)'
      ]
      this.$refs.changeInfo.familyExplainVisible = [false, '家庭说明']
      this.$refs.changeInfo.applyDateVisible = [false, '申请日期']
      this.$refs.changeInfo.whetherAddmedicalInsuranceVisible = [
        false,
        '是否加入低保'
      ]
      this.$refs.changeInfo.changeReasonVisible = [false, '变更原因']
      this.$refs.changeInfo.upLoadPathIdVisible = [false, '附件']
    },
    // 点击审批或查看时的页面数据获取
    getShowDatas () {
      const _self = this
      // _self.from.resetFields()
      // _self.fromOne.resetFields()
      // _self.fromTwo.resetFields()
      // _self.childEnterId = _self.$route.query.childEnterId // 儿童入院id
      // _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      const aa = JSON.parse(_self.$route.query.obj)
      console.log('1112212' + aa.startWorkflowId)
      _self.medicalRescueApplyId = aa.medicalRescueApplyId
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

      _self
        .post('/medicalRescueApplyChangeAudit/queryWorkflow', {
          businessId: _self.id,
          startWorkflowId: _self.startWorkflowId
        })
        .then(res => {
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
            // _self.proAuditShow = res.data.data.proAuditShow // 省级控制显示
            // _self.cityAuditShow = res.data.data.cityAuditShow // 市级控制显示
            // _self.countyAuditShow = res.data.data.countyAuditShow // 县级控制显示
            // _self.auditType = res.data.data.auditType // 审核类型显示
            // if (_self.approveVisible) {
            //   // 审批
            //   _self.currentStatus = res.data.data.currentStatus // 当前状态
            //   if (res.data.data.currentStatus.indexOf('省') != -1) {
            //     _self.currentShow = 'proAuditOpinion'
            //     _self.disabledProReason = false // 控制省审核意见非只读
            //     _self.disabledCityReason = true // 控制市审核意见非只读
            //     _self.disabledCountyReason = true // 控制县审核意见非只读
            //     _self.from.setFieldsValue(res.data.data)
            //     _self.fromOne.setFieldsValue(res.data.data)
            //     _self.fromTwo.setFieldsValue(res.data.data)
            //   }
            //   if (res.data.data.currentStatus.indexOf('市') != -1) {
            //     console.log(res.data.data.currentStatus.indexOf('市') != -1)
            //     _self.currentShow = 'cityAuditOpinion'
            //     _self.disabledCityReason = false // 控制市审核意见非只读
            //     _self.disabledCountyReason = true // 控制县审核意见非只读
            //     console.log(res.data.data)
            //     _self.from.setFieldsValue(res.data.data)
            //     _self.fromOne.setFieldsValue(res.data.data)
            //   }
            //   if (res.data.data.currentStatus.indexOf('县') != -1) {
            //     _self.currentShow = 'countyAuditOpinion'
            //     _self.disabledCountyReason = false // 控制县审核意见非只读
            //     _self.from.setFieldsValue(res.data.data)
            //   }
            // } else {
            //   _self.disabledProReason = true // 控制省审核意见非只读
            //   _self.disabledCityReason = true // 控制市审核意见非只读
            //   _self.disabledCountyReason = true // 控制县审核意见非只读
            //   this.$nextTick(() => {
            //     // 查看
            //     if (res.data.data.currentStatus.indexOf('省') != -1) {
            //       _self.currentShow = 'proAuditOpinion'
            //       _self.from.setFieldsValue(res.data.data)
            //       _self.fromOne.setFieldsValue(res.data.data)
            //       _self.fromTwo.setFieldsValue(res.data.data)
            //     }
            //     if (res.data.data.currentStatus.indexOf('市') != -1) {
            //       console.log(res.data.data.currentStatus.indexOf('市') != -1)
            //       _self.currentShow = 'cityAuditOpinion'
            //       _self.from.setFieldsValue(res.data.data)
            //       _self.fromOne.setFieldsValue(res.data.data)
            //     }
            //     if (res.data.data.currentStatus.indexOf('县') != -1) {
            //       _self.currentShow = 'countyAuditOpinion'
            //       _self.from.setFieldsValue(res.data.data)
            //     }
            //   })
            // }

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
            const medicalRescueApplyChangeVo =
              res.data.data.medicalRescueApplyChangeVo
            console.log(medicalRescueApplyChangeVo)
            let beforeChangeFieldInfo = {}
            let afterChangeFieldInfoO = {}
            let beforeChangeFieldInfoO = {}
            let forData = {}
            if (medicalRescueApplyChangeVo.beforeChangeFieldInfo) {
              beforeChangeFieldInfo = JSON.parse(
                medicalRescueApplyChangeVo.beforeChangeFieldInfo
              )
              beforeChangeFieldInfoO = JSON.parse(beforeChangeFieldInfo)
              // forData = {
              //   ...beforeChangeFieldInfoO
              // }
            }
            let afterChangeFieldInfo = {}
            if (medicalRescueApplyChangeVo.afterChangeFieldInfo) {
              afterChangeFieldInfo = JSON.parse(
                medicalRescueApplyChangeVo.afterChangeFieldInfo
              )
              afterChangeFieldInfoO = JSON.parse(afterChangeFieldInfo)
              // forData = {
              //   ...afterChangeFieldInfoO
              // }
            }
            if (afterChangeFieldInfoO && beforeChangeFieldInfoO) {
              forData = {}
              this.$nextTick(() => {
                forData = {
                  ...afterChangeFieldInfoO,
                  ...beforeChangeFieldInfoO
                }
              })
              forData = {
                ...afterChangeFieldInfoO,
                ...beforeChangeFieldInfoO
              }
            }
            console.log(medicalRescueApplyChangeVo.changeReason)
            // let beforeChangeFieldInfo = JSON.parse(medicalRescueApplyChangeVo.beforeChangeFieldInfo)

            if (medicalRescueApplyChangeVo.changeReason) {
              forData.changeReason = medicalRescueApplyChangeVo.changeReason
            }
            // this.$nextTick(() => {
            console.log(Object.keys(afterChangeFieldInfoO).length)
            if (Object.keys(afterChangeFieldInfoO).length > 0) {
              for (var k in afterChangeFieldInfoO) {
                console.log(k)
                _self.$refs.changeInfo[`${k}Visible`] = [false, 'aaa']
                if (afterChangeFieldInfoO[k]) {
                  console.log(333333333)
                  _self.$refs.changeInfo[`${k}Visible`] = [true, 'aaa']
                  console.log(_self.$refs.changeInfo[`${k}Visible`])
                } else {
                  _self.$refs.changeInfo[`${k}Visible`] = [false, 'aaa']
                }
              }
              this.$nextTick(() => {
                _self.adoptedFrom.setFieldsValue(forData)
                _self.adoptedFrom.setFieldsValue({
                  changeReason: medicalRescueApplyChangeVo.changeReason
                })
              })
            }

            console.log(forData)
            // })
            setTimeout(() => {
              this.setHeight('one', 'oneout')
              this.setHeight('two', 'twoout')
              this.setHeight('three', 'threeout')
              this.setHeight('five', 'fiveout')
              this.setHeight('four', 'fourout')
            }, 800)
          }
        })
    },
    // 审批通过-驳回
    submit (e) {
      console.log(222222222)
      // let countyAuditOpinion = this.from.getFieldsValue().countyAuditOpinion
      // let cityAuditOpinion = this.fromOne.getFieldsValue().cityAuditOpinion
      // let proAuditOpinion = this.fromTwo.getFieldsValue().proAuditOpinion
      const len = this.list.length - 1
      console.log(this.list)
      console.log('form' + len)
      console.log(this['form' + len])
      const reason = this['form' + len].getFieldsValue().auditOpinion
      const params = {}
      params.reason = reason
      params.workflowId = this.workflowId
      params.id = this.id
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
      console.log(params)
      // if (this.countyAuditShow != '0') {
      //   this.from.validateFields((err, values) => {
      //     if (err) {
      //       isok = false
      //       console.log('yanzheng11' + isok)
      //     }
      //   })
      // }
      // if (this.cityAuditShow != '0') {
      //   this.fromOne.validateFields((err, values) => {
      //     if (err) {
      //       isok = false
      //       console.log('yanzheng11' + isok)
      //     }
      //   })
      // }
      // if (this.proAuditShow != '0') {
      //   this.fromTwo.validateFields((err, values) => {
      //     if (err) {
      //       isok = false
      //       console.log('yanzheng11' + isok)
      //     }
      //   })
      // }
      this['form' + len].validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('yanzheng11' + isok)
        }
      })
      if (isok) {
        if (e == '0') {
          // 驳回
          this.post('/medicalRescueApplyChangeAudit/reject', params).then(
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
          this.post('/medicalRescueApplyChangeAudit/audit', params).then(
            res => {
              if (res.serviceSuccess) {
                if (!res.errors) {
                  this.$message.success('信息已通过!')
                  this.$router.go(-1)
                }
              }
            }
          )
        }
      }
    },
    // 状态类型
    async getchildmedicaltypeList () {
      const data = await this.getDictionaries('MEDICAL_RESCUE_NODE_STATUS')
      this.getchildmedicalList = data
      console.log(this.getchildmedicalList)
    },
    // 对应表单的地址赋值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setaddress2 () {
      // this.cptAdoptorFrom.setFieldsValue({
      //   address_Linkage: this.addressmodel2
      // })
    },
    clickSearch () {
      console.log(111)
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        // this.setHeight('two', 'twoout')
        this.setHeight('three', 'threeout')
      })
    },
    // 审核类型
    async getAudittypeList () {
      const data = await this.getDictionaries('PLANTOMORROWAUDITTYPE')
      this.audittypeList = data
    },
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 患病类型
    async getillnesstypeList () {
      const data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      const data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
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
    chans () {
      // this.$router.go(-1)
      // console.log(111)
    },
    backs () {
      console.log(111)
      this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (!(this.$refs[ref] instanceof Array) && this.$refs[ref].$el != undefined) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
          if (this.$refs[ref] instanceof Array && this.$refs[ref][0].$el != undefined) {
            if (!istrue) {
              node[0].style.height = this.$refs[ref][0].$el.offsetHeight + 90 + 'px'
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
    // 儿童类别
    async getchildcategoryaList () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.childcategoryaList = data
    }
  },
  watch: {
    attributeObj: {
      handler (newVal) {
        const keyname = this.getChangeAttr(newVal)
        this.setHeight(keyname.replace('show', ''), keyname.replace('show', '') + 'out', !newVal[keyname])
      },
      deep: true
    },
    showone (val) {
      console.log(111)
      console.log(val)
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
