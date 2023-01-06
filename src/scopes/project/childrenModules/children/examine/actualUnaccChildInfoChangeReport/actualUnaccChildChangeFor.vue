<template>
  <div class="conts">
    <div class="contin">
      <ta-form layout="horizontal"
               style="margin-top: 2%;"
               :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
        <ChangeBaseFrom :name="name"
                        :currentStatusLabel="currentStatusLabel"
                        :rejectBoolean="rejectBoolean"
                        :countyAuditShow="countyAuditShow"
                        :approval="approval"
                        :disabled="disabled"
                        :applyShow="applyShow"
                        :addressChangeModel="addressChangeModel"
                        @setOldAddress="setOldAddress"
                        @setNewAddress="setNewAddress"
                        @childDetail="childDetail"
                        ref="changes"></ChangeBaseFrom>
      </ta-form>
      <!-- </div> -->
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
      <ta-button v-if="goType=='1'"
                 type="danger"
                 class="btnleft"
                 @click="submit('0')">驳回</ta-button>
      <ta-button v-if="goType=='1'"
                 type="primary"
                 class="btnleft successbtn"
                 @click="submit('1')">通过</ta-button>
      <ta-button v-if="goType=='6'"
                 type="danger"
                 class="btnleft"
                 @click="returnBack()">撤回</ta-button>
    </div>
    <div>
      <ta-drawer title="驳回原因"
                 :width="500"
                 :closable="false"
                 @close="onCloseCanle"
                 :visible="visible">
        <div style="height:100px">
          <ta-form :autoFormCreate="(newform)=>{this.newform = newform}">
            <ta-col :span="24">
              <ta-form-item label="驳回原因"
                            fieldDecoratorId="reason"
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 19 }"
                            :fieldDecoratorOptions="this.verificationRules('驳回原因', 50,true)">
                <ta-textarea placeholder="请输入驳回原因"
                             :rows="4" />
              </ta-form-item>
            </ta-col>
          </ta-form>
        </div>
        <div slot="footer">
          <ta-button class="btnleft"
                     @click="onCloseCanle">取消</ta-button>
          <ta-button type="primary"
                     class="btnleft"
                     @click="ok()">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChangeBaseFrom from './components/changeBaseFrom'
import moment from 'moment'
export default {
  components: {
    Title,
    ChangeBaseFrom
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      showthree: true,
      goType: '0',
      addUnattendedId: '',
      changeBaseId: '',
      name: '',
      currentStatusLabel: '',
      countyAuditShow: false,
      id: '', // 儿童入院id
      rejectBoolean: false,
      approval: false,
      disabled: false,
      visible: false,
      applyShow: false,
      addressChangeModel: [],

      workflowId: '', // 儿童流程id
      workflowPointId: '', // 流程节点id
      approveVisible: false, // 审核true、查看false

      currentShow: '' // 当前待审核的是省（proAuditOpinion）、市（cityAuditOpinion）、县（countyAuditOpinion）的标识
    }
  },
  activated () {
    this.loadData()
    const paramsData = JSON.parse(this.$route.query.paramsData)
    const goTypeTemp = paramsData.goType // 标志是在哪个页面跳转过来的
    this.addUnattendedId = paramsData.obj.addUnattendedId
    this.changeBaseId = paramsData.obj.changeBaseId
    this.name = paramsData.obj.name
    this.currentStatusLabel = paramsData.obj.currentStatusLabel
    if (goTypeTemp == 'informationChangeApproval-apply') {
      // 变更审核
      this.goType = '1'
      this.countyAuditShow = false
      this.rejectBoolean = false
      this.applyShow = false
      this.getDetails()
    } else if (goTypeTemp == 'informationChangeApproval-reject') {
      // 驳回查看
      this.goType = '4'
      this.countyAuditShow = false
      this.disabled = true
      if (paramsData.obj.currentStatus == '4') {
        this.rejectBoolean = true
        this.applyShow = true
      } else if (paramsData.obj.currentStatus == '3') {
        this.rejectBoolean = false
        this.applyShow = false
      }

      this.getDetails()
    } else if (goTypeTemp == 'informationChangeRecord-see') {
      // 变更申请记录---查看
      this.goType = '5'
      this.countyAuditShow = true
      this.rejectBoolean = false
      this.disabled = true
      this.approval = paramsData.approval
      this.applyShow = true
      this.getDetails()
      if (paramsData.obj.currentStatus == '4') {
        this.rejectBoolean = true
      }
    } else if (goTypeTemp == 'informationChangeRecord-reject') {
      // 变更申请记录---撤回
      this.goType = '6'
      this.countyAuditShow = true
      this.rejectBoolean = false
      this.disabled = true
      this.applyShow = true
      this.approval = paramsData.approval
      this.getDetails()
    }
  },
  mounted () { },
  methods: {
    loadData () {
      this.goType = '0'
      this.countyAuditShow = false
      this.rejectBoolean = false
      this.rejectBoolean = false
      this.approval = false
      this.adoptedFrom.resetFields()
      this.$refs.changes.nameVisible = [false, '姓名']
      this.$refs.changes.smIdCardVisible = [false, '身份证号']
      this.$refs.changes.sexVisible = [false, '联系人']
      this.$refs.changes.censusRegisterVisible = [false, '户籍性质']
      this.$refs.changes.birthdayVisible = [false, '']
      this.$refs.changes.householdRegistryClassifyVisible = [false, '户口分类']
      this.$refs.changes.censusRegisterDatasVisible = [true, '户籍所在地']
      this.$refs.changes.isEnjoyMoneyVisible = [false, ' ']
      this.$refs.changes.receiveWayVisible = [false, ' ']
      this.$refs.changes.memberIdTypeVisible = [false, ' ']
      this.$refs.changes.depositBankVisible = [false, ' ']
      this.$refs.changes.startReceiveDateVisible = [false, ' ']
      this.$refs.changes.endReceiveDateVisible = [false, ' ']
      this.$refs.changes.receiverIdCardVisible = [false, ' ']
      this.$refs.changes.bankAccountVisible = [false, ' ']
      this.$refs.changes.securityMoneyVisible = [false, ' ']
      this.$refs.changes.contactNumberVisible = [false, ' ']
      this.$refs.changes.openCardPersonVisible = [false, ' ']
      this.$refs.changes.receiverNameVisible = [false, ' ']
      this.$refs.changes.receiverToChildRelationVisible = [false, ' ']
      this.$refs.changes.relationshipOtherVisible = [false, ' ']
    },
    onCloseCanle () {
      this.visible = false
    },
    async getDetails () {
      await this.post('/changeBaseUnattendedApi/detailChangeBaseUnattended', {
        changeBaseId: this.changeBaseId
      }).then(res => {
        const unattendedChildInfoChangeVo =
          res.data.data.unattendedChildInfoChangeVo
        // 变更前后内容
        const unattendedHisList = res.data.data.unattendedHisList
        const changeBefore = {}
        const changeAfter = {}
        const OldDate = {}
        let areaShow = false // 判断省市县是否显示
        const areaAttr = [
          'censusRegisterPro',
          'censusRegisterCity',
          'censusRegisterCounty',
          'censusRegisterTown',
          'censusRegisterVillage'
        ]
        if (unattendedHisList.length > 0) {
          unattendedHisList.map((item, index) => {
            if (item.changeStatus == '0') {
              for (var k in item) {
                changeBefore['copy_' + `${k}`] = item[k]
                OldDate[k] = item[k]
              }
            } else if (item.changeStatus == '1') {
              for (var i in item) {
                changeAfter[i] = item[i]
              }
            }
          })

          changeBefore.copy_startReceiveDate = changeBefore.copy_startReceiveDate ? moment(changeBefore.copy_startReceiveDate, 'YYYY-MM') : null
          changeBefore.copy_endReceiveDate = changeBefore.copy_endReceiveDate ? moment(changeBefore.copy_endReceiveDate, 'YYYY-MM') : null
          changeBefore.copy_birthday = changeBefore.copy_birthday ? moment(changeBefore.copy_birthday, 'YYYY-MM-DD') : null
          changeAfter.birthday = changeAfter.birthday ? moment(changeAfter.birthday, 'YYYY-MM-DD') : null
          changeAfter.startReceiveDate = changeAfter.startReceiveDate ? moment(changeAfter.startReceiveDate, 'YYYY-MM') : null
          changeAfter.endReceiveDate = changeAfter.endReceiveDate ? moment(changeAfter.endReceiveDate, 'YYYY-MM') : null
          const forData = { ...changeBefore, ...changeAfter }
          if (Object.keys(OldDate).length > 0 && Object.keys(changeAfter).length > 0) {
            let modalList = {}
            modalList = Object.keys(OldDate).length > Object.keys(changeAfter).length ? OldDate : changeAfter
            for (var k in modalList) {
              this.$refs.changes[`${k}Visible`] = [false, 'aaa']
              if (modalList[k]) {
                this.$refs.changes[`${k}Visible`] = [true, 'aaa']
                if (
                  k == 'censusRegisterPro' ||
                  k == 'censusRegisterCity' ||
                  k == 'censusRegisterCounty' ||
                  k == 'censusRegisterDetail' ||
                  k == 'censusRegisterTown' ||
                  k == 'censusRegisterVillage'
                ) {
                  areaShow = true
                }
              } else {
                this.$refs.changes[`${k}Visible`] = [false, 'aaa']
              }
            }
            if (areaShow) {
              this.$refs.changes.censusRegisterDatasVisible[0] = true
            } else {
              this.$refs.changes.censusRegisterDatasVisible = [false, 'aaa']
            }
            this.$refs.changes.addressOldModel = [
              changeBefore.copy_censusRegisterPro || '',
              changeBefore.copy_censusRegisterCity || '',
              changeBefore.copy_censusRegisterCounty || '',
              changeBefore.copy_censusRegisterTown || '',
              changeBefore.copy_censusRegisterVillage || ''
            ]
            // 变更后地址赋值
            this.addressChangeModel = [
              changeAfter.censusRegisterPro || '',
              changeAfter.censusRegisterCity || '',
              changeAfter.censusRegisterCounty || '',
              changeAfter.censusRegisterTown || '',
              changeAfter.censusRegisterVillage || ''
            ]
            if (this.$refs.changes.censusRegisterDatasVisible[0]) {
              this.adoptedFrom.setFieldsValue({
                censusRegisterDetail: changeAfter.censusRegisterDetail ? changeAfter.censusRegisterDetail : '',
                copy_censusRegisterDetail: changeBefore.copy_censusRegisterDetail ? changeBefore.copy_censusRegisterDetail : ''

              })
            }

            this.$nextTick(() => {
              this.adoptedFrom.setFieldsValue(forData)
              this.adoptedFrom.setFieldsValue({
                changeReason: unattendedChildInfoChangeVo.changeReason
              })
              if (this.rejectBoolean) {
                this.adoptedFrom.setFieldsValue({
                  rejectPassReason: unattendedChildInfoChangeVo.rejectPassReason
                })
              }
              if (this.goType == '5' || this.goType == '6') {
                this.adoptedFrom.setFieldsValue({
                  auditDate: moment(unattendedChildInfoChangeVo.auditDate),
                  auditUnit: unattendedChildInfoChangeVo.auditUnit,
                  reportUnit: unattendedChildInfoChangeVo.reportUnit,
                  requestChangeDate: moment(
                    unattendedChildInfoChangeVo.requestChangeDate
                  )
                })
              }
            })

            setTimeout(() => {
              this.$refs.changes.setHeight('one', 'oneout')
              this.$refs.changes.setHeight('two', 'twoout')
            }, 1000)
          }
        }

        this.adoptedFrom.setFieldsValue({
          // name:
        })
      })
    },
    // 撤回
    async returnBack () {
      const params = {
        changeBaseId: this.changeBaseId
      }
      await this.post(
        '/changeBaseUnattendedApi/recallChangeBaseUnattended',
        params
      ).then(res => {
        if (res.errors == null) {
          this.backs()
        }
      })
    },
    async submit (e) {
      if (e == '0') {
        this.visible = true
      }
      if (e == '1') {
        this.visible = false
        // 通过
        // this.newform.validateFields((err, values) => {
        //   if (!err) {
        //   }
        // })
        const params = {}
        params.changeBaseId = this.changeBaseId
        this.post(
          '/changeBaseUnattendedApi/checkChangeBaseUnattended',
          params
        ).then(res => {
          if (res.errors == null) {
            this.$message.success('信息审核通过')
            this.backs()
          }
        })
      }
    },
    ok () {
      // this.$nextTick(() => {
      const form = this.newform.getFieldsValue()
      form.changeBaseId = this.changeBaseId
      // })
      // 驳回
      this.newform.validateFields((err, values) => {
        if (!err) {
          this.post(
            '/changeBaseUnattendedApi/rejectChangeBaseUnattended',
            form
          ).then(res => {
            if (res.errors == null) {
              this.visible = false
              this.$message.success('信息审核驳回')
              this.newform.resetFields()
              this.backs()
            }
          })
        }
      })
    },
    childDetail () {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          id: this.addUnattendedId,
          childtypedisabled: 1,
          isdisabled: true
        }
      })
    },
    // 变更前地址传值
    setOldAddress () {
      this.adoptedFrom.setFieldsValue({
        copy_censusRegisterDatas: this.$refs.changes.addressOldModel
      })
    },
    // 变更后地址传值
    setNewAddress () {
      this.adoptedFrom.setFieldsValue({
        censusRegisterDatas: this.addressChangeModel
      })
    },
    backs () {
      this.$router.go(-1)
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
</style>
