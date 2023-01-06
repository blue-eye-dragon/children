<template>
  <div class="conts">
    <div class="contin">
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
          <ChildInfoMedi :fileListImg.sync="fileListImg"
                         :fileListCard.sync="fileListCard"
                         :fileListFile.sync="fileListFile"
                         :incomeList.sync="incomeList"
                         :diBaoList.sync="diBaoList"
                         @setaddress="setaddress2"
                         :addressmodel="addressmodel2"
                         @clickSearch="clickSearch"
                         :disabled="disabled"
                         :disabledM="disabledM"
                         :guardianArray.sync="guardianArray"
                         @actualAddress="actualAddress"
                         :idcardList="idcardList"
                         :relationList="relationList"
                         :addreslistsmodel="addreslistsmodel"
                         :goType="goType"
                         :qtsf="qtsf"
                         ref="cc"></ChildInfoMedi>
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
import ChildInfoMed from './components/childInfoMed'
import ChildInfoMedi from './components/childInfoMedi'
import Countyexamine from './components/countyexamine'
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
      audittypeList: [],
      // 是否提交保存
      buttonType: '1',
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
      approveVisible: false,
      workflowId: '',
      proAuditShow: '2', // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      cityAuditShow: '2', // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      auditShow: '2', // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      currentShow: '', // 当前待审批的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
      rules: {
        proAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200),
        // name: this.verificationRules('联系人', 72),
        cityAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200),
        countyAuditOpinion: this.verificationRulesNotMustFill('审核意见', 200, true)
      },
      qtsf: false,
      idcardList: [],
      relationList: [],
      disabledM: true,
      addreslistsmodel: [],
      // 添加监护人
      guardianArray: [],
      list: [],
      reasonDisabled: true,
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {} // 对比用的obj
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.33%', '91.67%', 'auditOpinion') // 审核意见字段宽度控制
  },
  activated () {
    this.qtsf = false
    this.adoptedFrom.resetFields()
    this.cptAdoptorFrom.resetFields()
    this.fileListImg = []
    this.fileListCard = []
    this.fileListFile = []
    this.incomeList = []
    this.diBaoList = []
    this.getchildList()
    this.getchildcategoryaList()
    this.getAudittypeList()
    const goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    if (goTypeTemp == 'salvageApproval-edit') {
      // 救助审核-待审批
      this.bg = false // 隐藏变更说明弹框
      this.goType = '4'
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.approveVisible = true
      this.reasonDisabled = false
    } else if (goTypeTemp == 'salvageApproval-see') {
      this.goType = '4'
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.approveVisible = false
      this.reasonDisabled = true
    }
    this.$nextTick(() => {
      this.getShowDatas()
    })
    this.guardianArray = []
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.getnation()
      this.getsexList()
      this.getchildcategoryaList()
      this.getillnesstypeList()
      this.getdisabilitytypeList()
      this.getdisabilitylevelList()
      this.getcensusregisterList()
      this.getIdcardList()
      this.getRelationList()
      window.onresize = () => {
        this.$nextTick(() => {
          this.setHeight('one', 'oneout', !this.showone)
          this.setHeight('two', 'twoout', !this.showtwo)
        })
      }
    })
    this.getchildmedicaltypeList()
  },
  methods: {
    setForm (e, index) {
      this['form' + index] = e
    },
    // 点击审批或查看时的页面数据获取
    getShowDatas () {
      const _self = this
      const aa = JSON.parse(_self.$route.query.obj)
      _self.startWorkflowId = aa.startWorkflowId // 流程节点id
      _self.workflowId = aa.workflowId // 流程节点id
      _self.approveVisible = _self.$route.query.approveVisible
      _self.proAuditShow = '2' // 省级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.cityAuditShow = '2' // 市级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）
      _self.auditShow = '2' // 县级控制显示判断，0未开始（全不显示），1待审核（显示部分），2已审核（全部显示）

      _self
        .post('/medicalRescueApplyAudit/queryWorkflow', {
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

            if (_self.approveVisible) {
              _self.disabledCountyReason = false
            } else {
              // 控制意见只读
              _self.disabledCountyReason = true
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
            if (obj.medicalRescueApplyChildInfoVo != null) {
              const medicalRescueApplyChildInfoVo =
                obj.medicalRescueApplyChildInfoVo
              if (medicalRescueApplyChildInfoVo.birthday) {
                medicalRescueApplyChildInfoVo.birthday = moment(
                  medicalRescueApplyChildInfoVo.birthday
                )
              }

              if (
                medicalRescueApplyChildInfoVo.addChildDate
              ) {
                delete medicalRescueApplyChildInfoVo.addChildDate
              } else {
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
              // 根据儿童类别数据控制家庭收入与家庭说明的显隐
              this.qtsf = [this.Enum.CHILDCATEGORYA.FLJGYYGQET, this.Enum.CHILDCATEGORYA.FLJGGYKJET].indexOf(medicalRescueApplyChildInfoVo.childType) == -1

              // 残疾类型赋值
              medicalRescueApplyChildInfoVo.disabilityType = medicalRescueApplyChildInfoVo.disabilityType ? medicalRescueApplyChildInfoVo.disabilityType.split(',') : []
              this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
            }

            // 医疗基本信息赋值
            let medicalRescueVo = obj.medicalRescueVo
            medicalRescueVo.intoCivilAdministrationDate = moment(
              medicalRescueVo.intoCivilAdministrationDate
            )
            medicalRescueVo.applyDate = moment(medicalRescueVo.applyDate)
            medicalRescueVo.intoOrgDate = moment(medicalRescueVo.intoOrgDate)
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
            const filePathVos = JSON.parse(medicalRescueVo.filePathVos)
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
            this.$nextTick(() => {
              setTimeout(() => {
                this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
                this.setHeight('one', 'oneout')
                this.setHeight('two', 'twoout')
              }, 1000)
            })
          }
        })
    },
    actualAddress (values) {
      this.cptAdoptorFrom.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
      })
    },
    // 审批通过-驳回
    submit (e) {
      const len = this.list.length - 1
      const reason = this['form' + len].getFieldsValue().auditOpinion
      const params = {}
      params.workflowId = this.workflowId
      params.reason = reason
      let isok = true
      this['form' + len].validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })

      if (isok) {
        if (e == '0') {
          // 驳回
          this.post('/medicalRescueApplyAudit/reject', params).then(res => {
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
          this.post('/medicalRescueApplyAudit/audit', params).then(res => {
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
    // 审核类型
    async getAudittypeList () {
      const data = await this.getDictionaries('PLANTOMORROWAUDITTYPE')
      this.audittypeList = data
    },
    // 状态类型
    async getchildmedicaltypeList () {
      const data = await this.getDictionaries('MEDICAL_RESCUE_NODE_STATUS')
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
        this.setHeight('two', 'twoout')
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
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.childcategoryaList = data
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
    },
    backs () {
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
    // 儿童类别
    async getchildList () {
      const orgType = window.parent.indexTool.getUserInfo().orgType
      let codeType = ''
      if (orgType == '99') {
        codeType = 'CHILDCATEGORYF'
        // this.qtsf = false
        this.guardianArray = []
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 1000)
      } else if (orgType != '98' && orgType != '99') {
        codeType = 'CHILDCATEGORYM'
        // this.qtsf = true
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 1000)
      }
      this.post('codetable/getCode', { codeType: codeType }).then(res => {
        if (res.serviceSuccess) {
          this.childcategoryaList = res.data.codeList
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
  //   width: 83%;
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
