<template>
  <div class="conts"
       id="tmd">
    <div class="contin">
      <ta-steps progressDot
                style="width:600px"
                :current="current">
        <ta-step v-for="(item, index) in steps"
                 :key="index"
                 @click="changeStep(item,index)"
                 :title="item.title"
                 :description="item.time" />
        <template slot="title">
        </template>
        <span slot="description"></span>
      </ta-steps>
      <div class="steps-content">
        <div v-show="current1 == '1'">
          <SY :evaluate='"yes"'
              :additionalYesOrNo1='additionalYesOrNo'
              ref="SY"
              :goId='registrationAdoptionId'></SY>
        </div>
        <div v-show="current1 == '8'&&obj.mark == '2'">
          <PG :evaluate='"yes"'
              ref="PG"
              :goId='registrationAdoptionId'
              :bizId="bizId"></PG>
        </div>
        <!-- <div v-show="current1 == '8'&&obj.mark == '1'">
          <FLPG :evaluate='"yes"'
                :handleType='"0"'
                :additionalYesOrNo='"0"'
                :info='"0"'
                ref="FLPG"
                :goId='id'></FLPG>
        </div> -->
        <!-- <div v-show="current1 == '4'">
          <CJSYZM :evaluate='"yes"'
                  :handleType='"0"'
                  :additionalYesOrNo='"0"'
                  :info='"0"'
                  ref="CJSYZM"
                  :goId='id'></CJSYZM>
        </div> -->
        <div v-show="current1 == '2'">
          <JCSY :evaluate='"yes"'
                :additionalYesOrNo2='additionalYesOrNo'
                ref="JCSY"
                :goId='registrationAdoptionId'
                :bizId="bizId"></JCSY>
        </div>
        <!-- <div v-show="current1 == '3'">
          <CXSY :evaluate='"yes"'
                :handleType='"0"'
                :additionalYesOrNo='"0"'
                :info='"0"'
                ref="CXSY"
                :goId='id'></CXSY>
        </div> -->
        <!-- <div v-show="current1 == '5'">
          <BLSYDJZ :evaluate='"yes"'
                   :handleType='"0"'
                   :additionalYesOrNo='"0"'
                   :info='"0"'
                   ref="BLSYDJZ"
                   :goId='id'></BLSYDJZ>
        </div> -->
        <!-- <div v-show="current1 == '6'">
          <BLJCSYDJZ :evaluate='"yes"'
                     :handleType='"0"'
                     :additionalYesOrNo='"0"'
                     :info='"0"'
                     ref="BLJCSYDJZ"
                     :goId='id'></BLJCSYDJZ>
        </div> -->
        <!-- <div v-show="current1 == '7'">
          <HFJL :evaluate='"yes"'
                :handleType='"0"'
                :additionalYesOrNo='"0"'
                :info='"0"'
                ref="HFJL"
                :goId='id'></HFJL>
        </div> -->
      </div>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
// import listMixin from '@component/common/js/mixins/listMixin'
import SY from './registration'
import FLPG from './additionalToEvaluate'
import PG from '../adoptionassessment/evaluationmanagement/evaluationmanagementFrom'
import JCSY from './relieve'
import CXSY from './revokeForm'
import CJSYZM from './certificationfrom'
import BLSYDJZ from './replacementFrom'
import BLJCSYDJZ from './replacementnotFrom'
import HFJL from './visitrecord'

export default {
  components: {
    SY,
    FLPG,
    PG,
    JCSY,
    CXSY,
    CJSYZM,
    BLSYDJZ,
    BLJCSYDJZ,
    HFJL
  },
  name: 'fileDetails',
  data () {
    return {
      current: 0,
      current1: 0,
      registrationAdoptionId: '',
      additionalYesOrNo: '',
      bizId: '',
      obj: {},
      steps: []
    }
  },
  activated () {
    this.steps = []
    this.obj = {}
    this.childNumber = this.$route.query.childNumber
    this.registrationAdoptionId = ''
    this.additionalYesOrNo = ''
    this.current = 0
    this.current1 = 0
    this.getSteps()
    // this.$nextTick(() => {
    //   this.$refs.SY.loaddata()
    // })
  },
  methods: {
    async getSteps () {
      const res = await this.post('/adoption/getChildRecordTimeAxisByChildNumber', { childNumber: this.childNumber })
      const arrData = res.data.data
      arrData.forEach(item => {
        this.steps.push({
          title: this.getBizName(item.bizType),
          time: item.createTime,
          mark: item.mark,
          bizId: item.bizId,
          bizType: item.bizType,
          registrationAdoptionId: item.registrationAdoptionId
        })
      })
      if (this.steps[0].registrationAdoptionId) {
        this.registrationAdoptionId = this.steps[0].registrationAdoptionId
      }
      if (this.steps[0].additionalYesOrNo) {
        this.additionalYesOrNo = this.steps[0].additionalYesOrNo
      }
      if (this.steps[0].bizId) {
        this.bizId = this.steps[0].bizId
      }
      if (this.steps[0].bizType) {
        this.current1 = this.steps[0].bizType
      }
    },
    getBizName (val) {
      let name = ''
      switch (val) {
        case '1':
          name = '收养登记'
          break
        case '2':
          name = '解除收养登记'
          break
        case '3':
          name = '撤销收养登记'
          break
        case '4':
          name = '出具收养关系证明'
          break
        case '5':
          name = '补领收养登记证'
          break
        case '6':
          name = '补领解除收养登记证'
          break
        case '7':
          name = '回访记录'
          break
        case '8':
          name = '收养评估'
          break
      }
      return name
    },
    changeStep (item, val) {
      this.obj = item
      this.current1 = item.bizType
      this.current = val
      this.additionalYesOrNo = item.additionalYesOrNo
      this.registrationAdoptionId = item.registrationAdoptionId
      if (item.bizId) {
        this.bizId = item.bizId
      }
      if (item.bizType == '1') {
        this.$refs.SY.loaddata()
      }
      if (item.bizType == '2') {
        this.$refs.JCSY.$refs.basic.getDetails()
        this.$refs.JCSY.getdetails()
      }
      if (item.bizType == '8' && item.mark == '2') {
        this.$refs.PG.loadData()
      }
    },

    backs () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
#tmd /deep/.ant-steps-item-process .ant-steps-item-icon {
  width: 15px;
  height: 15px;
}
</style>
