<template>
  <div>
    <ta-tabs @change="callback"
             defaultActiveKey="1"
             type="line"
             style="padding: 0 1%;"
             :activeKey="nowkey">
      <ta-tab-pane tab="落户信息"
                   key="1"
                   :forceRender="true">
        <SettlingInformation :childBaseId="childBaseId"
                             ref="settle"></SettlingInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="受教育信息"
                   key="2"
                   :forceRender="true">
        <EducationInformation :childBaseId="childBaseId"
                              :increaseDatas="increaseDatas"
                              @educateLook="educateLook"
                              v-if="educateType"
                              ref="educate"></EducationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="体检信息"
                   key="3"
                   :forceRender="true">
        <PhysicalExaminationInformation :childBaseId="childBaseId"
                                        @physicalLook="physicalLook"
                                        v-if="physicalType"
                                        ref="physical"></PhysicalExaminationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="医疗保险信息"
                   key="4"
                   :forceRender="true">
        <MedicalInsuranceInformation :childBaseId="childBaseId"
                                     @medicalInsuranceLook="medicalInsuranceLook"
                                     v-if="medicalInsuranceType"
                                     ref="medicalInsurance"></MedicalInsuranceInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="疫苗接种信息"
                   key="5"
                   :forceRender="true">
        <VaccinationInformation :childBaseId="childBaseId"
                                @vaccinationLook="vaccinationLook"
                                v-if="vaccinationType"
                                ref="vaccination"> </VaccinationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="医疗信息"
                   key="6"
                   :forceRender="true">
        <MedicalInformation :childFosterId="childFosterId"
                            :childBaseId="childBaseId"
                            @medicalLook="medicalLook"
                            v-if="medicalType"
                            ref="medical"></MedicalInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="跟踪回访信息"
                   key="7"
                   :forceRender="true">
        <FollowUpInformation :childBaseId="childBaseId"
                             @followUpLook="followUpLook"
                             v-if="followUpType"
                             ref="followUp"></FollowUpInformation>
      </ta-tab-pane>

    </ta-tabs>
    <keep-alive>
      <router-view v-show="routeVisible"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import PhysicalExaminationInformation from './components/welfareArchives/physicalExaminationInformation'
import MedicalInsuranceInformation from './components/welfareArchives/medicalInsuranceInformation'
import VaccinationInformation from './components/welfareArchives/vaccinationInformation'
import MedicalInformation from './components/welfareArchives/medicalInformation'
import FollowUpInformation from './components/welfareArchives/followUpInformation'
import EducationInformation from './components/welfareArchives/educationInformation'
import SettlingInformation from './components/welfareArchives/settlingInformation'
export default {
  components: {
    EducationInformation,
    SettlingInformation,
    PhysicalExaminationInformation,
    MedicalInsuranceInformation,
    VaccinationInformation,
    MedicalInformation,
    FollowUpInformation
  },
  props: ['childBaseId', 'childFosterId', 'increaseDatas'],
  data () {
    return {
      nowkey: '1',

      routeVisible: true,
      educateType: true, // 受教育类型区分 true列表，false查看
      physicalType: true, // 体检信息
      medicalInsuranceType: true, // 医疗保险信息
      vaccinationType: true, // 疫苗接种信息
      medicalType: true, // 医疗信息
      followUpType: true // 跟踪回访信息
    }
  },
  activated () {
    this.nowkey = '1'
    this.initdatas()
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    // 初始化数据
    initdatas () {
      this.educateType = true
      this.physicalType = true
      this.medicalInsuranceType = true
      this.vaccinationType = true
      this.medicalType = true
      this.followUpType = true
      this.routeVisible = true
    },
    // 受教育-查看
    educateLook (obj) {
      this.routeVisible = true
      this.$router.push({
        name: 'educationInformation_look',
        query: {
          obj: JSON.stringify(obj)
        }
      })
    },
    // 体检-查看
    physicalLook (obj) {
      this.routeVisible = true
      this.$router.push({
        name: 'physicalExaminationInformation_look',
        query: {
          obj: JSON.stringify(obj)
        }
      })
    },
    // 医疗保险-查看
    medicalInsuranceLook (obj) {
      this.routeVisible = true
      this.$router.push({
        name: 'medicalInsuranceInformation_look',
        query: {
          obj: JSON.stringify(obj)
        }
      })
    },
    // 疫苗接种-查看
    vaccinationLook (obj) {
      this.routeVisible = true
      this.$router.push({
        name: 'vaccinationInformation_look',
        query: {
          obj: JSON.stringify(obj),
          type: 0
        }
      })
    },
    // 医疗-查看
    medicalLook (obj) {
      this.routeVisible = true
      this.$router.push({
        name: 'medicalInformation_look',
        query: {
          obj: JSON.stringify(obj),
          type: 0
        }
      })
    },
    // 跟踪回访-查看
    followUpLook (obj) {
      this.routeVisible = true
      this.$router.push({
        name: 'followUpInformation_look',
        query: {
          obj: JSON.stringify(obj),
          type: 0
        }
      })
    },
    callback (key) {
      this.nowkey = key + ''
    }
  },
  watch: {
    $route: function (newval, oldval) {
      if (newval.name == 'educationInformation_look') { // 受教育信息
        this.educateType = false
      } else if (newval.name == 'physicalExaminationInformation_look') { // 体检信息
        this.physicalType = false
      } else if (newval.name == 'medicalInsuranceInformation_look') { // 医疗保险信息
        this.medicalInsuranceType = false
      } else if (newval.name == 'vaccinationInformation_look') { // 疫苗接种信息
        this.vaccinationType = false
      } else if (newval.name == 'medicalInformation_look') { // 医疗信息
        this.medicalType = false
      } else if (newval.name == 'followUpInformation_look') { // 跟踪回访信息
        this.followUpType = false
      } else if (newval.name == 'welfareArchives') { // 首页
        let name = ''
        switch (this.nowkey) {
          case '2':
            name = 'educate' // 受教育
            break
          case '3':
            name = 'physical' // 体检
            break
          case '4':
            name = 'medicalInsurance' // 医疗保险
            break
          case '5':
            name = 'vaccination' // 疫苗接种
            break
          case '6':
            name = 'medical' // 医疗
            break
          case '7':
            name = 'followUp' // 疫苗接种
            break
        }
        if (name && !this[name + 'Type'] && name != 'followUp') {
          this[name + 'Type'] = true
          this.$nextTick(() => {
            this.$refs[name].handleSubmit()
          })
        }
      }
    },
    nowkey: function (newval, oldval) {
      let name = ''
      switch (newval) {
        case '2':
          name = 'educate' // 受教育
          break
        case '3':
          name = 'physical' // 体检
          break
        case '4':
          name = 'medicalInsurance' // 医疗保险
          break
        case '5':
          name = 'vaccination' // 疫苗接种
          break
        case '6':
          name = 'medical' // 医疗
          break
        case '7':
          name = 'followUp' // 跟踪回访
          break
      }
      if (name) {
        this[name + 'Type'] = true
        this.$nextTick(() => {
          if ((name != 'medical' || (name == 'medical' && this.childFosterId)) && name != 'followUp') {
            this.$refs[name].handleSubmit()
          }
        })
      }

      this.$router.push({
        name: 'welfareArchives'
      })
      this.routeVisible = false
    }
  }
}
</script>
<style scoped>
</style>
