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
      </ta-anchor> -->
      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="变更申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ApplicationChangeInfo ref="changeInfo"></ApplicationChangeInfo>
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
                 class="preservation"
                 v-if="this.goType=='2'"
                 @click="submit()">撤回</ta-button>
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
// import ChildInfoMed from './components/childInfoMed'
// import ChildInfoMedi from './components/childInfoMedi'
// import Countyexamine from './components/countyexamine'
import ApplicationChangeInfo from '../../../components/applicationChangeInfo'
import { setTimeout } from 'timers'
import moment from 'moment'
export default {
  name: 'salvageApprovalBatches',
  components: {
    Title,
    // ChildInfoMed,
    // ChildInfoMedi,
    // Countyexamine,
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
      list: [],
      reasonDisabled: true,
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      // 是否提交保存
      buttonType: '1',
      audittypeList: [],
      fileListImg: [],
      fileListCard: [],
      fileListFile: [],
      incomeList: [],
      diBaoList: [],
      addressmodel: [],
      addressmodel2: [],
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
      proAuditShow: '', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '', // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      countyAuditShow: '', // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      currentShow: '' // 当前待审批的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
    }
  },
  activated () {
    this.adoptedFrom.resetFields()
    this.getchildcategoryaList()
    this.getAudittypeList()
    let goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办

    if (goTypeTemp == 'applicationRecord-details') {
      // 变更申请记录---查看
      this.bg = false // 隐藏变更说明弹框
      this.goType = 1
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      console.log(555555555)
      this.load()
      //  this.$refs['changeInfo'][`${k}Visible`] = [false, 'bbb']
      // this.getDetails();
      this.$nextTick(() => {
        this.getShowDatas()
      })
    } else if (goTypeTemp == 'applicationRecord-back') {
      this.load()
      this.bg = false // 隐藏变更说明弹框
      this.goType = 2
      let data = JSON.parse(this.$route.query.obj)
      this.medicalRescueApplyId = data.medicalRescueApplyId
      this.id = data.id
      console.log(data)
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
    load () {
      this.$refs['changeInfo'].rescueDiseaseTypeVisible[0] = false
      this.$refs['changeInfo'].rescueDiseaseNameVisible[0] = false
      this.$refs['changeInfo'].childIdentityTypeVisible[0] = false
      this.$refs['changeInfo'].contactVisible[0] = false
      this.$refs['changeInfo'].contactTelephoneVisible[0] = false
      this.$refs['changeInfo'].belongToOrgVisible[0] = false
      this.$refs['changeInfo'].intoOrgDate[0] = false
      this.$refs['changeInfo'].civilAdministrationDepartmentVisible[0] = false
      this.$refs['changeInfo'].intoCivilAdministrationDateVisible[0] = false
      this.$refs['changeInfo'].familyAverageAnnualIncomeVisible[0] = false
      this.$refs['changeInfo'].familyExplainVisible[0] = false
      this.$refs['changeInfo'].applyDateVisible[0] = false
      this.$refs['changeInfo'].whetherAddmedicalInsuranceVisible[0] = false
      this.$refs['changeInfo'].changeReasonVisible[0] = false
    },
    // 点击审批或查看时的页面数据获取
    getShowDatas () {
      let _self = this
      // _self.childEnterId = _self.$route.query.childEnterId // 儿童入院id
      // _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      let aa = JSON.parse(_self.$route.query.obj)
      console.log('1112212' + aa.startWorkflowId)
      _self.startWorkflowId = aa.startWorkflowId // 流程节点id
      _self.workflowId = aa.workflowId // 流程节点id
      _self.approveVisible = _self.$route.query.approveVisible // 审批true、查看false

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
            let medicalRescueApplyChangeVo =
              res.data.data.medicalRescueApplyChangeVo
            console.log(medicalRescueApplyChangeVo)
            let beforeChangeFieldInfo = JSON.parse(
              medicalRescueApplyChangeVo.beforeChangeFieldInfo
            )
            let afterChangeFieldInfo = JSON.parse(
              medicalRescueApplyChangeVo.afterChangeFieldInfo
            )
            // console.log(typeof (beforeChangeFieldInfo))
            // let beforeChangeFieldInfo = JSON.parse(medicalRescueApplyChangeVo.beforeChangeFieldInfo)
            let afterChangeFieldInfoO = JSON.parse(afterChangeFieldInfo)
            let beforeChangeFieldInfoO = JSON.parse(beforeChangeFieldInfo)
            let forData = {}
            forData = {
              ...afterChangeFieldInfoO,
              ...beforeChangeFieldInfoO
            }
            forData.changeReason = medicalRescueApplyChangeVo.changeReason
            // this.$nextTick(() => {
            console.log(Object.keys(afterChangeFieldInfoO).length)
            if (Object.keys(afterChangeFieldInfoO).length > 0) {
              for (var k in afterChangeFieldInfoO) {
                console.log(k)
                // _self.$refs['changeInfo'][`${k}Visible`][0] = false
                if (afterChangeFieldInfoO[k]) {
                  console.log(333333333)
                  _self.$refs['changeInfo'][`${k}Visible`] = [true, 'aaa']
                  console.log(_self.$refs['changeInfo'][`${k}Visible`])
                } else {
                  _self.$refs['changeInfo'][`${k}Visible`] = [false, 'bbb']
                  console.log(_self.$refs['changeInfo'][`${k}Visible`])
                }
              }
              this.$nextTick(() => {
                _self.adoptedFrom.setFieldsValue(forData)
                // setTimeout(() => {
                this.setHeight('one', 'oneout')
                // this.setHeight('two', 'twoout')
                this.setHeight('three', 'threeout')
                // }, 500)
              })
            }

            console.log(forData)
            // })
          }
        })
    },
    // 审批通过-驳回
    async submit (e) {
      let params = {}
      params.id = this.id
      this.post('/medicalRescueApplyChangeAudit/revoke', params).then(res => {
        if (res.errors == null) {
          this.$message.success(res.data.success)
          this.visible = false
          this.backs()
        }
      })
    },
    // 状态类型
    async getchildmedicaltypeList () {
      let data = await this.getDictionaries('MEDICAL_RESCUE_NODE_STATUS')
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
      let data = await this.getDictionaries('PLANTOMORROWAUDITTYPE')
      this.audittypeList = data
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
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
      // this.$router.go(-1)
      // console.log(111)
    },
    backs () {
      console.log(111)
      this.$router.go(-1)
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
      console.log(e)
      this['form' + index] = e
      console.log(this['form' + index])
    },
    // 儿童类别
    async getchildcategoryaList () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.childcategoryaList = data
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
      console.log(111)
      console.log(val)
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
