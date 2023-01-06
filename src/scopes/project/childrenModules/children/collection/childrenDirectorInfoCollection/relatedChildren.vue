<template>

  <div>
    <ta-steps :current="current"
              class="stepClass">
      <ta-step title="儿童基本信息">
        <span slot="icon"
              class="iconfont"
              style="font-size: 22px;">&#xe604;</span>
      </ta-step>
      <ta-step title="父母及其他监护人信息">
        <span slot="icon"
              class="iconfont">&#xe603;</span>
      </ta-step>
      <ta-step title="帮扶建议">
        <span slot="icon"
              class="iconfont"
              style="font-size: 18px;">&#xe602;</span>
      </ta-step>
    </ta-steps>
    <div class="steps-content">
      <ta-form layout="horizontal"
               :hideRequiredMark="true"
               :autoFormCreate="(form)=>{this.childForm = form}">
        <ChildBaseInformation v-if="current==0"
                              :addressChildModel="addressChildModel"
                              :addressChildModelNow="addressChildModelNow"
                              :heathChildModel="heathChildModel"
                              @setChildAddress="setChildAddress"
                              @setChildHeaths="setChildHeaths"
                              ref="child"></ChildBaseInformation>
      </ta-form>

      <ta-tabs defaultActiveKey="1"
               @change="callback"
               :activeKey="nowkey"
               v-if="current==1">

        <ta-tab-pane tab="父母基本信息"
                     key="1"
                     :forceRender="true">
          <ParentInformation :addressFatherModel="addressFatherModel"
                             :addressFatherModelNow="addressFatherModelNow"
                             :heathFatherModel="heathFatherModel"
                             :addressMotherModel="addressMotherModel"
                             :addressMotherModelNow="addressMotherModelNow"
                             :heathMotherModel="heathMotherModel"
                             ref="parents"></ParentInformation>

        </ta-tab-pane>
        <ta-tab-pane tab="其他监护人信息"
                     key="2"
                     :forceRender="true">
          <ta-form layout="horizontal"
                   :hideRequiredMark="true"
                   :autoFormCreate="(form)=>{this.otherForm = form}">
            <OtherGuardiansInformation :heathOtherModel="heathOtherModel"
                                       @setOtherHeaths="setOtherHeaths"
                                       :addressOtherModel="addressOtherModel"
                                       @setOtherAddress="setOtherAddress"></OtherGuardiansInformation>
          </ta-form>
        </ta-tab-pane>
      </ta-tabs>
      <ta-form layout="horizontal"
               :hideRequiredMark="true"
               :autoFormCreate="(form)=>{this.adviseForm = form}">
        <AdviseInformation v-if="current==2"></AdviseInformation>
      </ta-form>
    </div>
    <div class="steps-action">
      <ta-button v-if="current>0"
                 style="margin-left: 40%"
                 type="primary"
                 @click="prev">
        上一步
      </ta-button>
      <ta-button v-if="current>0"
                 @click="btnleft">
        重置
      </ta-button>
      <ta-button v-if="current < steps.length - 1"
                 type="primary"
                 :style="current==0?'margin: 0 auto':'margin-left: 8px'"
                 @click="next">
        下一步
      </ta-button>
      <ta-button v-if="current == steps.length - 1"
                 :style="current==0?'margin: 0 auto':'margin-left: 8px'"
                 @click="returnList">
        返回列表
      </ta-button>
    </div>
  </div>
</template>
<script>
import ChildBaseInformation from '../components/childBaseInformation'
import ParentInformation from '../components/parentInformation'
import OtherGuardiansInformation from '../components/otherGuardiansInformation'
import AdviseInformation from '../components/adviseInformation'
import moment from 'moment'
export default {
  components: {
    ChildBaseInformation,
    ParentInformation,
    AdviseInformation,
    OtherGuardiansInformation
  },
  data () {
    return {
      current: 0, // 儿童基本信息（1）、父母监护人信息（2）、帮扶建议（3）的标识符
      steps: [{
        title: '儿童基本信息'
      }, {
        title: '父母及其他监护人信息'
      }, {
        title: '帮扶建议'
      }],

      // 儿童地址与健康状况
      addressChildModel: [],
      addressChildModelNow: [],
      heathChildModel: [],
      // 父母地址与健康状况
      addressFatherModel: [],
      addressFatherModelNow: [],
      heathFatherModel: [],
      addressMotherModel: [],
      addressMotherModelNow: [],
      heathMotherModel: [],
      // 其他监护人地址与健康状况
      addressOtherModel: [],
      heathOtherModel: [],

      disabled: false,

      nowkey: '1', // 父母及监护人的tab值

      childList: this.$route.query.childList // 儿童主任（督导员）信息维护列表数据
    }
  },
  activated () {
    this.childList = JSON.parse(this.$route.query.childList)
    this.reset()
  },
  mounted () {

  },
  methods: {
    next () {
      this.current++
      this.setValues()
    },
    prev () {
      this.current--
      this.setValues()
    },
    // 重置
    reset () {
      this.current = 0
      this.setValues()
    },
    setValues () {
      let url = '/childdirectorandsupervisor/getDetail'
      let obj = {}

      // 儿童基本信息赋值
      if (this.current == 0) {
        this.post(url, { id: this.childList.id }).then((res) => {
          if (res.serviceSuccess) {
            obj = res.data.data

            obj['birthday'] = obj.birthday ? moment(obj.birthday) : null
            // 健康状况处理
            this.heathChildModel = obj.healthCondition ? obj.healthCondition.split(',') : []
            // 地址处理
            this.addressChildModel = [
              obj.censusRegisterPro ? obj.censusRegisterPro : '',
              obj.censusRegisterCity ? obj.censusRegisterCity : '',
              obj.censusRegisterCounty ? obj.censusRegisterCounty : ''
            ]

            this.addressChildModelNow = [
              obj.currentAddressPro ? obj.currentAddressPro : '',
              obj.currentAddressCity ? obj.currentAddressCity : '',
              obj.currentAddressCounty ? obj.currentAddressCounty : ''
            ]
            // 头像处理
            if (obj.fileList) {
              _self.$refs['child'].imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + obj.fileList[0].response.data.data.fileid
              //   _self.post('/file/getFileUrls', { returnFileIds: obj.fileList[0].uid }).then(res => {
              //     if (res.serviceSuccess) {
              //       _self.$refs['child'].imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]
              //     }
              //   })
            }

            this.childForm.setFieldsValue(obj)
          }
        })
      }

      if (this.current == 1 && this.nowkey == '1') { // 父母
        url = '/childdirectorandsupervisor/getParentDetail'
        this.post(url, { id: this.childList.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data

            for (var i = 0; i < data.length; i++) {
              if (data[i].fatherId) { // 父亲
                // 健康状况处理
                this.heathFatherModel = data[i].healthCondition ? data[i].healthCondition.split(',') : []
                // 地址处理
                this.addressFatherModel = [
                  data[i].censusRegisterPro ? data[i].censusRegisterPro : '',
                  data[i].censusRegisterCity ? data[i].censusRegisterCity : '',
                  data[i].censusRegisterCounty ? data[i].censusRegisterCounty : '',
                  data[i].censusRegisterTown ? data[i].censusRegisterTown : '',
                  data[i].censusRegisterVillage ? data[i].censusRegisterVillage : ''

                ]
                this.addressFatherModelNow = [
                  data[i].currentAddressPro ? data[i].currentAddressPro : '',
                  data[i].currentAddressCity ? data[i].currentAddressCity : '',
                  data[i].currentAddressCounty ? data[i].currentAddressCounty : '',
                  data[i].currentAddressTown ? data[i].currentAddressTown : '',
                  data[i].currentAddressVillage ? data[i].currentAddressVillage : ''
                ]
                this.$refs['parents'].fatherForm.setFieldsValue(data[i])
              }
              if (data[i].motherId) { // 母亲
                // 健康状况处理
                this.heathMotherModel = data[i].healthCondition ? data[i].healthCondition.split(',') : []
                // 地址处理
                this.addressMotherModel = [
                  data[i].censusRegisterPro ? data[i].censusRegisterPro : '',
                  data[i].censusRegisterCity ? data[i].censusRegisterCity : '',
                  data[i].censusRegisterCounty ? data[i].censusRegisterCounty : '',
                  data[i].censusRegisterTown ? data[i].censusRegisterTown : '',
                  data[i].censusRegisterVillage ? data[i].censusRegisterVillage : ''
                ]
                this.addressMotherModelNow = [
                  data[i].currentAddressPro ? data[i].currentAddressPro : '',
                  data[i].currentAddressCity ? data[i].currentAddressCity : '',
                  data[i].currentAddressCounty ? data[i].currentAddressCounty : '',
                  data[i].currentAddressTown ? data[i].currentAddressTown : '',
                  data[i].currentAddressVillage ? data[i].currentAddressVillage : ''
                ]
                this.$refs['parents'].motherForm.setFieldsValue(data[i])
              }
            }
          }
        })
      }
      if (this.current == 1 && this.nowkey == '2') { // 监护人
        url = '/childdirectorandsupervisor/getOtherGuarder'
        this.post(url, { id: this.childList.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data

            // 健康状况处理
            this.heathOtherModel = data.healthCondition ? data.healthCondition.split(',') : []
            // 地址处理
            this.addressOtherModel = [
              data.guardenOrganizationVo.unitPro ? data.guardenOrganizationVo.unitPro : '',
              data.guardenOrganizationVo.unitCity ? data.guardenOrganizationVo.unitCity : '',
              data.guardenOrganizationVo.unitCount ? data.guardenOrganizationVo.unitCount : ''
            ]

            // 时间处理
            data['grandpaBirth'] = data.grandpaBirth ? moment(data.grandpaBirth) : null
            data['grandmaBirth'] = data.grandmaBirth ? moment(data.grandmaBirth) : null
            data['wgrandpaBirth'] = data.wgrandpaBirth ? moment(data.wgrandpaBirth) : null
            data['wgrandmaBirth'] = data.wgrandmaBirth ? moment(data.wgrandmaBirth) : null
            this.otherForm.setFieldsValue(data)
            this.otherForm.setFieldsValue(data.guardenOrganizationVo)
          }
        })
      }

      if (this.current == 2) { // 帮扶建议
        this.post('/childdirectorandsupervisor/supportRecommendations', { id: this.childList.id }).then((res) => {
          if (res.serviceSuccess) {
            this.adviseForm.setFieldsValue({ supportRecommend: res.data.data ? res.data.data.supportRecommendations : null })
          }
        })
      }
    },
    // 儿童地址传值
    setChildAddress () {
      this.childForm.setFieldsValue({
        censusRegisterDatas: this.addressChildModel,
        currentAddressDatas: this.addressChildModelNow
      })
    },
    // 其他监护人地址传值
    setOtherAddress () {
      this.otherForm.setFieldsValue({
        unitDatas: this.addressOtherModel
      })
    },

    // 儿童健康状况传值
    setChildHeaths () {
      this.childForm.setFieldsValue({
        healthConditionDatas: this.heathChildModel
      })
    },
    // 其他监护人健康状况传值
    setOtherHeaths () {
      this.otherForm.setFieldsValue({
        healthConditionDatas: this.heathOtherModel
      })
    },

    // 父母基本信息、其他监护人信息的tab切换
    callback (key) {
      this.nowkey = key
      this.setValues()
    },
    // 返回至儿童主任列表
    returnList () {
      this.$router.push({
        name: 'childrenDirectorInfoMaintain'
      })
    }
  }
}
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  min-height: 200px;
  /* text-align: center; */
  width: 80%;
  margin-left: 10%;
  padding-bottom: 60px;
}
.steps-action {
  width: calc(100% - 28px);
  height: 60px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 14px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
}
.stepClass {
  width: 50%;
  margin-left: 29%;
  margin-top: 1%;
}
</style>
