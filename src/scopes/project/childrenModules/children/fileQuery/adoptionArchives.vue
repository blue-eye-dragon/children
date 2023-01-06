<template>
  <div>
    <ta-tabs @change="callback"
             defaultActiveKey="1"
             type="line"
             :activeKey="nowkey">
      <ta-tab-pane tab="收养信息"
                   key="1"
                   :forceRender="true">
        <AdoptionInformation :childBaseId="childBaseId"
                             @adoptionInformationLook="adoptionInformationLook"
                             v-if="adoptionType"
                             ref="adoption"></AdoptionInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="解除收养信息"
                   key="2"
                   :forceRender="true">
        <TerminationInformation :childBaseId="childBaseId"
                                @terminationLook="terminationLook"
                                v-if="terminationType"
                                ref="termination"></TerminationInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="撤销收养信息"
                   key="3"
                   :forceRender="true">
        <CancelAdoptionInformation :childBaseId="childBaseId"
                                   @cancelAdoptionLook="cancelAdoptionLook"
                                   v-if="cancelAdoptionType"
                                   ref="cancelAdoption"></CancelAdoptionInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="补录信息"
                   key="4"
                   :forceRender="true">
        <AupplementaryInformation :childBaseId="childBaseId"
                                  @aupplementaryLook="aupplementaryLook"
                                  v-if="aupplementaryType"
                                  ref="aupplementary"></AupplementaryInformation>
      </ta-tab-pane>
      <ta-tab-pane tab="补领信息"
                   key="5"
                   :forceRender="true">
        <ReplacementInformation :childBaseId="childBaseId"
                                @replacementLook="replacementLook"
                                v-if="replacementType"
                                ref="replacement"></ReplacementInformation>
      </ta-tab-pane>
    </ta-tabs>
    <keep-alive>
      <router-view v-show="routeVisible"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import AdoptionInformation from './components/adoptionArchives/adoptionInformation'
import TerminationInformation from './components/adoptionArchives/terminationInformation'
import CancelAdoptionInformation from './components/adoptionArchives/cancelAdoptionInformation'
import AupplementaryInformation from './components/adoptionArchives/supplementaryInformation'
import ReplacementInformation from './components/adoptionArchives/replacementInformation'
export default {
  components: {
    AdoptionInformation,
    TerminationInformation,
    CancelAdoptionInformation,
    AupplementaryInformation,
    ReplacementInformation
  },
  data () {
    return {
      id: '', // 儿童入院或收养id
      childBaseId: '', // 儿童基本信息id
      flag: '', // 儿童入院（beHospitalized）、收养（adoption）的标识符
      adoptionType: true, // 列表为true，查看为false
      terminationType: true, // 列表为true，查看为false
      cancelAdoptionType: true, // 列表为true，查看为false
      aupplementaryType: true, // 列表为true，查看为false
      replacementType: true, // 列表为true，查看为false
      nowkey: '1',
      routeVisible: true
    }
  },
  activated () {
    this.id = this.$route.query.id
    this.childBaseId = this.$route.query.childBaseId
    this.flag = this.$route.query.id
    this.adoptionType = true
    this.terminationType = true
    this.cancelAdoptionType = true
    this.aupplementaryType = true
    this.replacementType = true

    this.nowkey = '1'
  },
  mounted () {
  },
  methods: {
    callback (key) {
      this.nowkey = key + ''
    },
    // 收养信息查看
    adoptionInformationLook (e) {
      this.routeVisible = true
      this.$router.replace({
        name: 'adoptionArchives_registration', // 收养登记
        params: {
          id: e.adoptionRegisterId,
          handleType: '0',
          additionalYesOrNo: '0'
        }
      })
    },
    // 解除收养信息查看
    terminationLook (e) {
      this.routeVisible = true
      this.$router.replace({
        name: 'adoptionArchives_relieve',
        query: {
          id: e.adoptionRegisterId,
          handleType: '0',
          additionalYesOrNo: '0'
        }
      })
    },
    // 撤销收养信息查看
    cancelAdoptionLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'adoptionArchives_revokeForm',
        query: {
          id: e.adoptionRegisterId,
          handleType: '0',
          additionalYesOrNo: '0'
        }
      })
    },
    // 补录信息查看
    aupplementaryLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'adoptionArchives_registration1',
        params: {
          id: e.adoptionRegisterId,
          handleType: '0',
          additionalYesOrNo: '1'
        }
      })
    },
    // 补领信息查看
    replacementLook (e) {
      this.routeVisible = true
      this.$router.push({
        name: 'adoptionArchives_replacementFrom',
        query: {
          id: e.adoptionRegisterId,
          handleType: '0'
        }
      })
    }
  },
  watch: {
    $route: function (newval, oldval) {
      if (newval.name == 'adoptionArchives_registration') { // 收养信息
        this.adoptionType = false
      } else if (newval.name == 'adoptionArchives_relieve') { // 解除收养信息
        this.terminationType = false
      } else if (newval.name == 'adoptionArchives_revokeForm') { // 撤销收养信息
        this.cancelAdoptionType = false
      } else if (newval.name == 'adoptionArchives_registration1') { // 补录信息
        this.aupplementaryType = false
      } else if (newval.name == 'adoptionArchives_replacementFrom') { // 补录信息
        this.replacementType = false
      } else if (newval.name == 'adoptionArchives') { // 首页
        let name = ''
        switch (this.nowkey) {
          case '1':
            name = 'adoption'
            break
          case '2':
            name = 'termination'
            break
          case '3':
            name = 'cancelAdoption'
            break
          case '4':
            name = 'aupplementary'
            break
          case '5':
            name = 'replacement'
            break
        }
        if (!this[name + 'Type']) {
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
        case '1':
          name = 'adoption'
          break
        case '2':
          name = 'termination'
          break
        case '3':
          name = 'cancelAdoption'
          break
        case '4':
          name = 'aupplementary'
          break
        case '5':
          name = 'replacement'
          break
      }
      if (name) {
        this[name + 'Type'] = true
        this.$nextTick(() => {
          this.$refs[name].handleSubmit()
        })
      }

      this.$router.push({
        name: 'adoptionArchives'
      })
      this.routeVisible = false
    }
  }
}
</script>
<style scoped>
</style>
