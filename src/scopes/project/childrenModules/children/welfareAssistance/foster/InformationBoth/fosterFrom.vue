<template>
  <div class="conts tadrawer">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="基本信息"
                   key="1">
        <div class="fromcont">
          <ta-form layout="horizontal"
                   :autoFormCreate="(From)=>{this.From = From}">
            <FosterBasic :sptdisabled='sptdisabled'
                         :basedisabled='basedisabled'
                         :addressmodel='addressmodel'
                         @setaddress='setaddress'></FosterBasic>
          </ta-form>
        </div>

      </ta-tab-pane>
      <ta-tab-pane tab="体检信息"
                   key="2">
        <Physicalexamination :basedisabled='basedisabled'
                             :physicalExaminationVoList="physicalExaminationVoList"
                             @chaadoptorChildrenVos="chaadoptorChildrenVos"></Physicalexamination>
      </ta-tab-pane>
      <ta-tab-pane tab="疫苗接种信息"
                   key="3">
        <Vaccination :basedisabled='basedisabled'
                     :vaccinationVosList="vaccinationVosList"
                     @chaadoptorChildrenVos="chaadoptorChildrenVos"></Vaccination>
      </ta-tab-pane>
      <ta-tab-pane tab="医疗信息"
                   key="4">
        <MedicalCare :basedisabled='basedisabled'
                     :medicalInfoVosList="medicalInfoVosList"
                     @chaadoptorChildrenVos="chaadoptorChildrenVos"></MedicalCare>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 @click="submit"
                 class="preservation"
                 v-if="!basedisabled">保存</ta-button>
    </div>
  </div>
</template>
<script>
import FosterBasic from '../../components/fosterBasic'
import Physicalexamination from '../../components/physicalexamination'
import Vaccination from '../../components/vaccination'
import MedicalCare from '../../components/medicalCare'
import moment from 'moment'
export default {
  components: {
    FosterBasic,
    Physicalexamination,
    Vaccination,
    MedicalCare
  },
  data () {
    return {
      nowkey: '1',
      addressmodel: [],
      physicalExaminationVoList: [], // 体检信息
      vaccinationVosList: [], // 疫苗接种
      medicalInfoVosList: [], // 医疗信息
      basedisabled: false,
      childBaseId: '',
      fosterChildId: '',
      childEnterId: '',
      sptdisabled: false
    }
  },
  activated () {
    this.loadData()
    this.childBaseId = this.$route.query.childBaseId
    this.fosterChildId = this.$route.query.fosterChildId
    this.childEnterId = this.$route.query.childEnterId
    this.$route.query.type == 1 ? this.basedisabled = false : this.basedisabled = true
    this.getbasic()
  },
  methods: {
    loadData () {
      this.physicalExaminationVoList = []
      this.vaccinationVosList = []
      this.medicalInfoVosList = []
      this.addressmodel = []
      this.nowkey = '1'
      this.isdisabled = false
      this.From.resetFields()
    },
    async getbasic () {
      let params = {
        childBaseId: this.childBaseId,
        fosterChildId: this.fosterChildId
      }
      let data = await this.post('/fosterChildrenInfo/queryById', params)
      if (data.errors === null) {
        this.physicalExaminationVoList = data.data.data.physicalExaminationVoList
        this.vaccinationVosList = data.data.data.vaccinationVosList
        this.medicalInfoVosList = data.data.data.medicalInfoVosList
        let fromdata = data.data.data.fosterChildrenInfoVo
        if (fromdata.suggestedPlacementType) {
          this.sptdisabled = true
        } else {
          this.sptdisabled = false
        }
        fromdata.birthday = moment(fromdata.birthday)
        if (fromdata.illnessType) {
          fromdata.illnessType = fromdata.illnessType.split(',')
        }

        if (fromdata.firstFosterDate) {
          fromdata.firstFosterDate = moment(fromdata.firstFosterDate)
        }
        if (fromdata.registerDate) {
          fromdata.registerDate = moment(fromdata.registerDate)
        }
        // 残疾类型数据处理
        fromdata.disabilityType = fromdata.disabilityType ? fromdata.disabilityType.split(',') : []

        this.addressmodel = [fromdata.censusRegisterPro || '', fromdata.censusRegisterCity || '', fromdata.censusRegisterCounty || '']
        this.From.setFieldsValue(fromdata)
      }
    },
    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
          // tablename 组件对应数据名字
        }
      } else {
        this[tablename] = val
      }
    },
    // 对应表单的地址赋值
    setaddress () {
      this.From.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    callback (key) {
      this.nowkey = key
    },
    backs () {
      this.$router.go(-1)
    },
    // 数据处理
    dataprocessing () {

    },
    async submit () {
      this.From.validateFields(async (err, values) => {
        if (!err) {
          // fosterChildrenInfoVo 表单  this.physicalExaminationVoList vaccinationVosList medicalInfoVosList
          let fosterChildrenInfoVo = this.From.getFieldsValue()
          fosterChildrenInfoVo.birthday = fosterChildrenInfoVo.birthday.format('YYYY-MM-DD')
          fosterChildrenInfoVo.firstFosterDate = fosterChildrenInfoVo.firstFosterDate ? fosterChildrenInfoVo.firstFosterDate.format('YYYY-MM-DD') : null
          fosterChildrenInfoVo.registerDate = fosterChildrenInfoVo.registerDate ? fosterChildrenInfoVo.registerDate.format('YYYY-MM-DD') : null
          fosterChildrenInfoVo.disabilityType = fosterChildrenInfoVo.disabilityType ? fosterChildrenInfoVo.disabilityType.join(',') : ''
          fosterChildrenInfoVo.illnessType = fosterChildrenInfoVo.illnessType ? fosterChildrenInfoVo.illnessType.join(',') : ''
          if (fosterChildrenInfoVo.address_Linkage) {
            fosterChildrenInfoVo.censusRegisterPro = fosterChildrenInfoVo.address_Linkage[0]
            fosterChildrenInfoVo.censusRegisterCity = fosterChildrenInfoVo.address_Linkage[1]
            fosterChildrenInfoVo.censusRegisterCounty = fosterChildrenInfoVo.address_Linkage[2]
            delete fosterChildrenInfoVo.address_Linkage
          }
          fosterChildrenInfoVo.childBaseId = this.childBaseId
          fosterChildrenInfoVo.childEnterId = this.childEnterId
          fosterChildrenInfoVo.id = this.fosterChildId
          this.physicalExaminationVoList.map(item => {
            item.childEnterId = this.childEnterId
          })
          this.vaccinationVosList.map(item => {
            item.childEnterId = this.childEnterId
          })
          this.medicalInfoVosList.map(item => {
            item.fosterChildTableId = this.fosterChildId
          })
          let params = {
            physicalExaminationVoList: this.physicalExaminationVoList,
            vaccinationVosList: this.vaccinationVosList,
            medicalInfoVosList: this.medicalInfoVosList,
            fosterChildrenInfoVo
          }
          this.post('/fosterChildrenInfo/update', params, true).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('修改成功')
              this.backs()
            }
          })
        } else {
          this.nowkey = '1'
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.preservation {
  margin-left: 20px;
}
.fromcont {
  padding-right: 2%;
  box-sizing: border-box;
}
</style>
