<template>
  <div class="conts">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="救助申请信息"
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
        <div ref="threeout"
             class="mars">
          <!-- <Title id="anchorpoint_d" title="填报信息" :show.sync="showthree"></Title> -->
          <ta-form layout="horizontal"
                   ref="three"
                   :autoFormCreate="(buggetFrom)=>{this.buggetFrom = buggetFrom}">
            <CloseAccountInfo :fileListChildImg.sync="fileListChildImg"
                              :fileRecode.sync="fileRecode"
                              :fileqita.sync="fileqita"
                              :effectList="effectList"
                              :adviceList="adviceList"
                              :yesnoList="yesnoList"
                              :disabled="disabled"
                              :disabledT="disabledT"
                              :yesnoB.sync="yesnoB"
                              :goType="goType"
                              ref="closeAccount"></CloseAccountInfo>
          </ta-form>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="变更信息"
                   key="3"
                   :forceRender="true">
        <div ref="fourout"
             class="mars">
          <Title id="anchorpoint_d"
                 title="变更信息"
                 :show.sync="showfour"></Title>
          <ta-form layout="horizontal"
                   :autoFormCreate="(tabFrom)=>{this.tabFrom = tabFrom}"></ta-form>
          <ta-table ref="four"
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <a slot="name"
               slot-scope="val,obj,index"
               href="javascript:;"
               @click="childInfo(val,obj,index)">{{obj.name}}</a>
            <span slot="auditDate"
                  slot-scope="text,obj,index">{{text | auditDate}}</span>
            <div slot="auditDate"
                 slot-scope="val,obj,index">
              <span>
                <span>{{val | datafilter}}</span>
              </span>
            </div>
            <span slot="action"
                  slot-scope="text,obj,index"
                  class="btnlist">
              <span class="com_textsee"
                    @click="addAdoption(text,obj,index)">查看</span>
            </span>
          </ta-table>
        </div>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
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
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: '22%'
  },
  {
    title: '儿童身份类型',
    dataIndex: 'childIdentityType',
    collectionType: 'CHILDIDENTITYTYPE',
    width: '20%'
  },
  {
    title: '救助病种类型',
    dataIndex: 'rescueDiseaseType',
    collectionType: 'DISEASETYPE',
    width: '22%'
  },
  {
    title: '救治病种名称',
    dataIndex: 'rescueDiseaseName',
    width: '22%'
  },
  {
    title: '救助申请日期',
    dataIndex: 'createTime',
    width: '20%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
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
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      showfive: true,
      nowkey: '1',
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
      addreslistsmodel: [],
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
      qtsf: false,
      yesnoB: true,
      // 添加监护人
      guardianArray: [],
      idcardList: [],
      relationList: []
    }
  },
  created () { },
  activated () {
    this.loadData()
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    this.getnation()
    this.getsexList()
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
    this.fileListImg = []
    this.fileRecode = []
    this.fileqita = []
    this.nowkey = '1'
    // let goTypeTemp = this.$route.params.goType // 标志是在哪个页面跳转过来的
    if (this.$route.query.goType == 'medicalAidFilesDetails-detail') {
      // 预算---详情
      this.goType = '2'
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.medicalRescueApplyId = data.medicalRescueApplyId
      this.getDetails()
    } else {
      this.disabled = false
      this.goType = '1'
    }
    // this.lastNum.diagnoseCostNum = 222
  },
  mounted () { },
  methods: {
    loadData () {
      this.fileListImg = []
      this.fileRecode = []
      this.fileqita = []
      this.guardianArray = []
    },
    async getDetails () {
      this.fileListImg = []
      this.fileRecode = []
      this.fileqita = []
      let params = {
        settlementId: this.id,
        medicalRescueApplyId: this.medicalRescueApplyId
      }
      this.post('/medicalRescueArchives/medicalRescueDetail', params).then(
        res => {
          let obj = res.data.data
          // 儿童基本信息
          let medicalRescueApplyChildInfoVo = {}
          if (obj.medicalRescueApplyChildInfoVo !== null) {
            medicalRescueApplyChildInfoVo = obj.medicalRescueApplyChildInfoVo
            if (medicalRescueApplyChildInfoVo.birthday !== null) {
              medicalRescueApplyChildInfoVo.birthday = moment(
                medicalRescueApplyChildInfoVo.birthday
              )
            }
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
            if (medicalRescueApplyChildInfoVo.illnessType) {
              let illnessArr = medicalRescueApplyChildInfoVo.illnessType
              medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
            }

            let arr = []
            arr.push(
              medicalRescueApplyChildInfoVo.province,
              medicalRescueApplyChildInfoVo.city,
              medicalRescueApplyChildInfoVo.county
            )
            this.addressmodel = [...arr]
          }
          // 残疾类型赋值
          medicalRescueApplyChildInfoVo.disabilityType = medicalRescueApplyChildInfoVo.disabilityType ? medicalRescueApplyChildInfoVo.disabilityType.split(',') : []
          // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().orgName
          this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
          // 医疗基本信息赋值
          let medicalRescueVo = obj.medicalRescueVo
          if (
            obj.medicalRescueGuardianVos != null &&
            obj.medicalRescueGuardianVos.length > 0
          ) {
            this.guardianArray = []
            let medicalRescueGuardianVos = obj.medicalRescueGuardianVos
            medicalRescueGuardianVos.map((item, index) => {
              this.guardianArray.push(index)
              this.addreslistsmodel[index] = []
              this.$nextTick(() => {
                if (item.county && !item.province && !item.city) {
                  this.addreslistsmodel[index] = []
                  this.addreslistsmodel[index].push(item.county)
                }
                if (item.county && item.province && item.city) {
                  this.addreslistsmodel[index] = []
                  this.addreslistsmodel[index].push(item.city, item.county)
                }
                if (item.county && item.province && item.city) {
                  // this.addreslistsmodel[index].push(
                  //   item.province,
                  //   item.city,
                  //   item.county
                  // )
                  let arr = []
                  arr.push(item.province, item.city, item.county)
                  this.$set(this.addreslistsmodel, index, arr)
                }
                let bir
                if (item.birthday) {
                  bir = moment(item.birthday)
                }
                item = {
                  [`detail${index}`]: item.detail,
                  [`birthday${index}`]: bir,
                  [`contactNumber${index}`]: item.contactNumber,
                  [`guardian${index}`]: item.guardian,
                  [`idCard${index}`]: item.idCard,
                  [`idcardType${index}`]: item.idcardType,
                  [`relationship${index}`]: item.relationship,
                  [`sex${index}`]: item.sex
                }
                let medicalRescueVo = { ...item }
                this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
              })
            })
          } else if (
            obj.medicalRescueGuardianVos == [] ||
            obj.medicalRescueGuardianVos == null
          ) {
            // if (this.goType == '2') {
            this.guardianArray = [1]
            // } else {
            //   this.guardianArray = []
            // }
          }
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
          let arrAddress = []
          arrAddress.push(
            medicalRescueVo.province,
            medicalRescueVo.city,
            medicalRescueVo.county
          )
          this.addressmodel2 = [...arrAddress]
          // this.childBaseId = medicalRescueVo.childBaseId
          // this.medicalId = medicalRescueVo.id
          // this.orgId = medicalRescueVo.orgId
          // 医疗救助附件
          if (medicalRescueVo.filePathVos) {
            this.fileListImg = []
            this.fileListCard = []
            this.fileListFile = []
            this.incomeList = []
            this.diBaoList = []
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
          }

          this.cptAdoptorFrom.setFieldsValue(medicalRescueVo)
          this.$nextTick(() => {
            setTimeout(() => {
              this.setHeight('five', 'fiveout')
              this.setHeight('two', 'twoout')
            }, 1000)
          })
          // 经费明细
          let medicalRescueSettlementCostVo =
            res.data.data.medicalRescueSettlementCostVo
          // 治疗情况
          let medicalRescueSettlementTreatmentVo =
            res.data.data.medicalRescueSettlementTreatmentVo

          let medicalRescueSettlementVo =
            res.data.data.medicalRescueSettlementVo
          // 结账信息---治疗情况赋值
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
          if (medicalRescueSettlementTreatmentVo.hospitalization == '0') {
            this.yesnoB = false
          } else if (
            medicalRescueSettlementTreatmentVo.hospitalization == '1'
          ) {
            this.yesnoB = true
          }
          // this.$nextTick(() => {
          this.$refs['closeAccount'].adoptedFromo.setFieldsValue(
            medicalRescueSettlementTreatmentVo
          )
          // 结账附件
          if (obj.medicalRescueSettlementVo.filePathVos) {
            let filePathVos = JSON.parse(
              obj.medicalRescueSettlementVo.filePathVos
            )
            this.fileListChildImg = []
            this.fileqita = []
            this.fileRecode = []
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

          this.$refs['closeAccount'].obj = medicalRescueSettlementCostVo
          this.$refs['closeAccount'].cptAdoptorFrom.setFieldsValue(
            this.$refs['closeAccount'].obj
          )
          setTimeout(() => {
            this.setHeight('one', 'oneout')
            // this.setHeight('two', 'twoout')
          }, 1000)
          // })
          // 变更列表
          this.tableData = obj.medicalRescueApplyChangeListVos
        }
      )
    },
    addAdoption (text, obj, index) {
      let approveVisible = true
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'medicalAidFilesApplyFor',
        query: {
          obj: str,
          index: index,
          goType: 'medicalAidFilesApplyFor-detail'
        }
      })
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
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
      })
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
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      let orgType = window.parent.indexTool.getUserInfo().orgType
      let codeType = ''
      if (orgType == '99') {
        codeType = 'CHILDCATEGORYF'
        this.qtsf = false
        this.guardianArray = []
        setTimeout(() => {
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
        }, 1000)
      } else if (orgType != '98' && orgType != '99') {
        codeType = 'CHILDCATEGORYM'
        this.qtsf = true
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
    actualAddress (values) {
      this.cptAdoptorFrom.setFieldsValue({
        [`address_Linkage${values}`]: this.addreslistsmodel[values]
      })
    },
    childInfo (val, obj, index) {
      if (obj.childEnterId) {
        let param = {
          id: obj.childEnterId
        }
        this.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify(param),
            operateFlag: 'look_now'
          }
        })
      } else {
        // let str = JSON.stringify(obj)
        this.$router.push({
          name: 'detailDatas',
          query: {
            obj: obj,
            index: index,
            goType: 'applicationRecord-details'
          }
        })
      }
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
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
    // 治疗评估效果
    async geteffectList () {
      let data = await this.getDictionaries('THERAPEUTICEVALUATION')
      this.effectList = data
    },
    // 拟安置意见
    async getadviceList () {
      let data = await this.getDictionaries('PROPOSEDPLACEMENT')
      this.adviceList = data
    },
    // 是否
    async getyesnoList () {
      let data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    },
    backs () {
      this.$router.go(-1)
    }
  },

  watch: {
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
      // this.cptAdoptorFrom.resetFields()
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
