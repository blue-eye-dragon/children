<template>
  <div>
    <ta-tabs @change="callback"
             defaultActiveKey="1"
             type="line"
             :activeKey="nowkey">
      <ta-tab-pane tab="增员信息"
                   key="1"
                   :forceRender="true">
        <IncreasingStaffInformation :childBaseId="childBaseId"
                                    @increaseLook="increaseLook"
                                    @getIncreaseDatas="getIncreaseDatas"
                                    v-if="increaseType=='0'"
                                    ref='increase'></IncreasingStaffInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="儿童基本情况"
                   key="2"
                   :forceRender="true">
        <ChildrenBasicInformation :childBaseId="childBaseId"
                                  :childFosterId="childFosterId"
                                  :increaseDatas="increaseDatas"
                                  ref="childrenBasic"></ChildrenBasicInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="助养信息"
                   key="3"
                   :forceRender="true">
        <FosterInformation :childBaseId="childBaseId"
                           @fosterLook="fosterLook"
                           v-if="fosterType=='0'"
                           ref="foster"></FosterInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="寄养信息"
                   key="4"
                   :forceRender="true">
        <FosterCareInformation :childBaseId="childBaseId"
                               v-if="fosterCareType=='0'"
                               @setFosterCareType="setFosterCareType"
                               @FosterCareLook="FosterCareLook"
                               ref="fosterCare"></FosterCareInformation>
        <FosterCareTrackingRecord :childBaseId="childBaseId"
                                  v-if="fosterCareType=='1'"
                                  @setFosterCareType="setFosterCareType"
                                  @fosterCareTrackingRecordLook="fosterCareTrackingRecordLook"
                                  ref="fosterCareTrackingRecord"></FosterCareTrackingRecord>
        <FosterCareExpenditureRecord :childBaseId="childBaseId"
                                     v-if="fosterCareType=='2'"
                                     @setFosterCareType="setFosterCareType"
                                     @fosterCareExpenditureRecordLook="fosterCareExpenditureRecordLook"
                                     ref="fosterCareExpenditureRecord"></FosterCareExpenditureRecord>
      </ta-tab-pane>
      <ta-tab-pane tab="医疗救助信息"
                   key="5"
                   :forceRender="true">
        <MedicalAssistanceInformation :childBaseId="childBaseId"
                                      v-if="medicalAssistanceType=='0'"
                                      @medicalAssistanceLook="medicalAssistanceLook"
                                      ref="medicalAssistance"></MedicalAssistanceInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="康复治疗信息"
                   key="6"
                   :forceRender="true">
        <RehabilitationInformation :childBaseId="childBaseId"
                                   v-if="rehabilitationType=='0'"
                                   @rehabilitationLook="rehabilitationLook"
                                   ref="rehabilitation"></RehabilitationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="减员信息"
                   key="7"
                   :forceRender="true">
        <DownsizingInformation :childBaseId="childBaseId"
                               v-if="downsizingType=='0'"
                               @downsizingLook="downsizingLook"
                               ref="downsizing"></DownsizingInformation>
      </ta-tab-pane>

    </ta-tabs>
    <keep-alive>
      <router-view v-show="routeVisible"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import IncreasingStaffInformation from './components/welfareArchives/increasingStaffInformation'
import ChildrenBasicInformation from './childrenBasicInformation'
import DownsizingInformation from './components/welfareArchives/downsizingInformation'
import FosterCareInformation from './components/welfareArchives/fosterCareInformation'
import FosterCareTrackingRecord from './components/welfareArchives/fosterCareTrackingRecord'
import FosterCareExpenditureRecord from './components/welfareArchives/fosterCareExpenditureRecord'
import FosterInformation from './components/welfareArchives/fosterInformation'
import MedicalAssistanceInformation from './components/welfareArchives/medicalAssistanceInformation'
import RehabilitationInformation from './components/welfareArchives/rehabilitationInformation'
export default {
  components: {
    IncreasingStaffInformation,
    ChildrenBasicInformation,
    DownsizingInformation,
    FosterCareInformation,
    FosterCareTrackingRecord,
    FosterCareExpenditureRecord,
    FosterInformation,
    MedicalAssistanceInformation,
    RehabilitationInformation
  },
  data () {
    return {
      childBaseId: '', // 儿童基本信息id
      childFosterId: '', // 寄养id
      increaseType: '0', // 增员类型区分 0列表，1查看
      fosterType: '0', // 助养类型区分 0列表，1查看
      fosterCareType: '0', // 寄养类型区分 0列表，1查看
      medicalAssistanceType: '0', // 医疗类型区分 0列表，1查看
      rehabilitationType: '0', // 康复治疗类型区分 0列表，1查看
      downsizingType: '0', // 减员管理类型区分 0列表，1查看
      nowkey: '1',
      routeVisible: true,

      increaseDatas: null // 增员的列表数据
    }
  },
  created () {

  },
  activated () {
    this.childBaseId = this.$route.query.childBaseId
    this.childFosterId = this.$route.query.childFosterId

    this.fosterCareType = '0'
    this.increaseType = '0'
    this.medicalAssistanceType = '0'
    this.rehabilitationType = '0'
    this.downsizingType = '0'
    this.fosterType = '0'
    this.nowkey = '1'
    this.$nextTick(() => {
      this.$refs.increase.handleSubmit()
    })

    this.routeVisible = true
  },
  mounted () {
  },
  methods: {
    callback (key) {
      this.nowkey = key + ''
    },
    setFosterCareType (e) {
      this.fosterCareType = e
    },
    // 增员查看
    increaseLook (e) {
      let _self = this
      _self.routeVisible = true
      _self.$router.push({
        name: 'welfareArchives_orphansHandicapped',
        query: {
          url: '/childArchives/queryAddChildDetailsByChildEnterId',
          params: JSON.stringify({ childEnterId: e }),
          childBaseId: this.childBaseId,
          operateFlag: 'look_now',
          isChildFilesLook: true
        }
      })
    },
    // 助养查看
    fosterLook (obj) {
      this.routeVisible = true
      let nowkey = '1'
      if (obj.sponsorPartyType == '2') {
        nowkey = '2'
      }
      this.$router.push({
        name: 'welfareArchives_sponsorInfo',
        query: {
          url: '/sponsorshipRelation/queryById',
          id: obj.sponsorshipHistoryId,
          nowkey: nowkey,
          type: obj.sponsorPartyType,
          disabled: true,
          isdisabled: true
        }
      })
    },
    // 寄养查看
    FosterCareLook (e) {
      this.routeVisible = true
      let dataStr = JSON.stringify(e)
      this.$router.push({
        name: 'welfareArchives_recorddetails',
        query: {
          dataStr: dataStr
        }
      })
    },
    // 寄养跟踪记录查看
    fosterCareTrackingRecordLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'welfareArchives_fostercareevaluation', // 补领解除
        query: {
          childBaseId: this.childBaseId,
          status: 1,
          id: e.id
        }
      })
    },
    // 寄养经费记录查看
    fosterCareExpenditureRecordLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'fosterCareExpenditureRecord_look',
        query: {
          obj: JSON.stringify(e)
        }
      })
    },
    // 医疗救助信息查看
    medicalAssistanceLook (obj, index) {
      this.routeVisible = true
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'welfareArchives_medicalAidFilesDetails',
        query: {
          obj: str,
          index: index,
          goType: 'medicalAidFilesDetails-detail'
        }
      })
    },
    // 康复治疗信息查看
    rehabilitationLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'welfareArchives_see',
        query: {
          rehabiliteId: e,
          toto: '1'
        }
      })
    },
    // 减员管理信息查看
    downsizingLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'downsizingInformation_look',
        query: {
          obj: JSON.stringify(e)
        }
      })
    },
    // 获取到增员列表的数据传给儿童基本情况的受教育信息
    getIncreaseDatas (e) {
      this.increaseDatas = JSON.parse(e)
    }

  },
  watch: {
    $route: function (newval, oldval) {
      if (newval.name == 'welfareArchives_orphansHandicapped') { // 增员
        this.increaseType = '1'
      } else if (newval.name == 'welfareArchives_sponsorInfo') { // 助养
        this.fosterType = '1'
      } else if (newval.name == 'welfareArchives_recorddetails') { // 寄养
        this.fosterCareType = '01'
      } else if (newval.name == 'welfareArchives_fostercareevaluation') { // 寄养跟踪
        this.fosterCareType = '11'
      } else if (newval.name == 'fosterCareExpenditureRecord_look') { // 寄养经费
        this.fosterCareType = '21'
      } else if (newval.name == 'welfareArchives_medicalAidFilesDetails') { // 医疗救助
        this.medicalAssistanceType = '1'
      } else if (newval.name == 'welfareArchives_see') { // 康复治疗
        this.rehabilitationType = '1'
      } else if (newval.name == 'downsizingInformation_look') { // 减员管理
        this.downsizingType = '1'
      } else if (newval.name == 'welfareArchives') {
        if (oldval.name == 'welfareArchives_orphansHandicapped') {
          this.increaseType = '0'
          this.$nextTick(() => {
            this.$refs.increase.handleSubmit()
          })
        }
        if (oldval.name == 'welfareArchives_sponsorInfo') {
          this.fosterType = '0'
          this.$nextTick(() => {
            this.$refs.foster.handleSubmit()
          })
        }
        if (oldval.name == 'welfareArchives_recorddetails') {
          this.fosterCareType = '0'
          this.$nextTick(() => {
            this.$refs.fosterCare.handleSubmit()
          })
        }
        if (oldval.name == 'welfareArchives_fostercareevaluation') {
          this.fosterCareType = '1'
          this.$nextTick(() => {
            this.$refs.fosterCareTrackingRecord.handleSubmit()
          })
        }
        if (oldval.name == 'fosterCareExpenditureRecord_look') {
          this.fosterCareType = '2'
          this.$nextTick(() => {
            this.$refs.fosterCareExpenditureRecord.handleSubmit()
          })
        }
        if (oldval.name == 'welfareArchives_orphansHandicapped') {
          this.medicalAssistanceType = '0'
          this.$nextTick(() => {
            this.$refs.medicalAssistance.handleSubmit()
          })
        }
        if (oldval.name == 'welfareArchives_see') {
          this.rehabilitationType = '0'
          this.$nextTick(() => {
            this.$refs.rehabilitation.handleSubmit()
          })
        }
        if (oldval.name == 'downsizingInformation_look') {
          this.downsizingType = '0'
          this.$nextTick(() => {
            this.$refs.downsizing.handleSubmit()
          })
        }
      }
    },
    nowkey: function (newval, oldval) {
      let name = ''
      switch (newval) {
        case '1':
          name = 'increase'
          break
        case '3':
          name = 'foster'
          break
        case '4':
          name = 'fosterCare'
          break
        case '5':
          name = 'medicalAssistance'
          break
        case '6':
          name = 'rehabilitation'
          break
        case '7':
          name = 'downsizing'
          break
      }
      if (name) {
        this[name + 'Type'] = '0'
        this.$nextTick(() => {
          this.$refs[name].handleSubmit()
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
