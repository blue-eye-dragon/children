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
      <div>
        <div ref="twoout"
             class="mars">
          <Title id="anchorpoint_a"
                 title="医疗救助登记表"
                 :show.sync="showtwo"></Title>
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="true"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    ref='two'>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
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
      </div>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
import ChildInfoMed from './components/childInfoMed'
import { setTimeout } from 'timers'
// import listMixin from '@component/common/js/mixins/listMixin'
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
    title: '救助申请日期',
    dataIndex: 'applyDate',
    width: '14%'
  },
  {
    title: '救治病种类型',
    dataIndex: 'rescueDiseaseType',
    collectionType: 'DISEASETYPE',
    width: '14%'
  },
  {
    title: '救治病种名称',
    dataIndex: 'rescueDiseaseName',
    width: '15%'
  },
  {
    title: '救助申请状态',
    dataIndex: 'rescueApplyStatus',
    width: '14%'
  },
  {
    title: '结账状态',
    dataIndex: 'status',
    width: '11%'
  },
  {
    title: '结账申请日期',
    dataIndex: 'settlementApplyDate',
    width: '14%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'salvageApprovalBatches',
  components: {
    Title,
    ChildInfoMed
  },
  // mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      showone: true,
      showtwo: true,
      goType: 0,
      // showone: true,
      saveOrno: true,
      // showtwo: true,
      bg: false, // 变更申请显示状态标志
      nowkey: '1',
      objTemp: [], // 上一个页面数据传入
      id: '',
      childEnterId: '',
      childId: '', // 儿童基本信息id
      total: 0,
      nationList: [],
      sexList: [],
      childcategoryaList: [],
      illnesstypeList: [],
      disabilitylevelList: [],
      censusregisterList: [],
      disabilitytypeList: [],
      addressmodel: [],
      addressmodel2: [],
      childBaseId: '',
      medicalId: '',
      orgId: '',
      disabled: true,
      visible: false
    }
  },
  activated () {
    this.adoptedFrom.resetFields()
    this.tableData = []
    this.getchildcategoryaList()
    this.getnation()
    this.getsexList()
    // this.getchildcategoryaList()
    this.getillnesstypeList()
    this.getdisabilitytypeList()
    this.getdisabilitylevelList()
    this.getcensusregisterList()
    const goTypeTemp = this.$route.query.goType // 标志是在哪个页面跳转过来的，urged--->催办
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    if (goTypeTemp == 'medicalAidFilesChildDetail-detail') {
      const data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      this.childEnterId = data.childEnterId
      this.$nextTick(() => {
        this.getDetails()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      window.onresize = () => {
        this.$nextTick(() => {
          this.setHeight('one', 'oneout', !this.showone)
          this.setHeight('two', 'twoout', !this.showtwo)
        })
      }
    })
  },
  methods: {
    loadData () {

    },
    // 详情
    async getDetails () {
      const params = {}
      params.id = this.id
      params.childEnterId = this.childEnterId
      this.post('/medicalRescueArchives/archivesDetail', params).then(res => {
        if (res.serviceSuccess) {
          this.childId = res.data.data.medicalRescueApplyChildInfoVo.id
          const medicalRescueApplyChildInfoVo =
            res.data.data.medicalRescueApplyChildInfoVo
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
          if (medicalRescueApplyChildInfoVo.illnessType) {
            const illnessArr = medicalRescueApplyChildInfoVo.illnessType
            medicalRescueApplyChildInfoVo.illnessType = illnessArr.split(',')
          }
          const medicalRescueSettlementListVos =
            res.data.data.medicalRescueSettlementListVos
          this.tableData = medicalRescueSettlementListVos
          this.total = medicalRescueSettlementListVos.length
          const arr = []
          arr.push(
            medicalRescueApplyChildInfoVo.province,
            medicalRescueApplyChildInfoVo.city,
            medicalRescueApplyChildInfoVo.county
          )
          this.addressmodel = [...arr]
          // 残疾类型赋值
          medicalRescueApplyChildInfoVo.disabilityType = medicalRescueApplyChildInfoVo.disabilityType ? medicalRescueApplyChildInfoVo.disabilityType.split(',') : []
          // medicalRescueApplyChildInfoVo.orgName = window.parent.indexTool.getUserInfo().orgName
          this.adoptedFrom.setFieldsValue(medicalRescueApplyChildInfoVo)
          this.$nextTick(() => {
            setTimeout(() => {
              this.$nextTick(() => {
                this.setHeight('one', 'oneout')
                this.setHeight('two', 'twoout')
              })
            })
          })
        }
      })
    },
    // 详情跳转
    addAdoption (text, obj, index) {
      this.$router.push({
        name: 'settlementChangeFor',
        query: {
          id: obj.id,
          childEnterId: this.childEnterId,
          childId: this.childId,
          isNotBatch: obj.isBatch == 1,
          flag: 'look'
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
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
    // 性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      console.log(data, 888)
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
    // 救治病种类型
    async getdiseasetypeList () {
      const data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
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
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        }
      })
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
  width: 100%;
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
