<template>
  <div>
    <ta-tabs :defaultActiveKey="defaultActiveKey" @change="callback">
      <ta-tab-pane tab="儿童信息" key="1" :forceRender="true">
        <DJ :look="jump"></DJ>
      </ta-tab-pane>
      <ta-tab-pane tab="调查评估信息" key="2" :forceRender="false">
        <DCPG :look="jump" :dcpgId="dcpgId" ref="dcpg"></DCPG>
      </ta-tab-pane>
      <ta-tab-pane tab="临时监护信息" key="3" :forceRender="false">
        <LSJH :look="jump" :dcpgId="dcpgId" ref="lsjh"></LSJH>
      </ta-tab-pane>
      <ta-tab-pane tab="转接帮扶信息" key="4" :forceRender="false">
        <ZJBF :look="jump" :dcpgId="dcpgId" ref="zjbf"></ZJBF>
      </ta-tab-pane>
      <ta-tab-pane tab="监护结束信息" key="5" :forceRender="true">
        <div style="padding: 1% 5%;">
          <div ref="oneout" style="height: 387px;transition: all 1s;" :class="jump?null:'mars'">
            <Title id="anchorpoint_a" title="监护结束信息" :show.sync="showone"></Title>
            <ta-form
              layout="horizontal"
              :autoFormCreate="(form)=>{this.form = form}"
              :hideRequiredMark="disabled"
            >
              <ta-row ref="one" class="fromcom">
                <ta-col :span="12">
                  <ta-form-item
                    :labelCol="{ span: 3 }"
                    :wrapperCol="{ span: 21 }"
                    label="结束原因"
                    fieldDecoratorId="tutelageStopReason"
                  >
                    <ta-textarea :disabled="disabled"></ta-textarea>
                  </ta-form-item>
                  <ta-form-item
                    :labelCol="{ span:5 }"
                    :wrapperCol="{ span: 18 }"
                    label="监护照料结束日期"
                    fieldDecoratorId="tutelageStopReasonDate"
                  >
                    <ta-date-picker :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-row>
            </ta-form>
          </div>
        </div>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom">
      <ta-button class="btnleft" @click=" back">返回</ta-button>
    </div>
  </div>
</template>
<script>
import DJ from './protectionJuvenileCollection'
import DCPG from '../socialProtection/investigateEvaluationDo'
import LSJH from '../socialProtection/temporaryCustodyDo'
import ZJBF from '../socialProtection/referralAssistanceDo'
import Title from '@component/common/components/Title'
import moment from 'moment'
export default {
  components: {
    DJ,
    DCPG,
    LSJH,
    ZJBF,
    Title
  },
  data () {
    return {
      defaultActiveKey: '1',

      jump: true,
      troubleChildId: '',

      disabled: true,
      dcpgId: '',

      showone: true
    }
  },
  created () { },
  activated () {
    this.troubleChildId = this.$route.query.id
    this.dcpgId = this.$route.query.dcpgId ? this.$route.query.dcpgId : 'E'
    this.jS()
  },
  mounted () {
    this.getDic()
  },
  methods: {
    back () {
      this.$nextTick(() => {
        this.defaultActiveKey = '1'
      })

      this.$router.go(-1)
    },

    jS () {
      let tutelageStopReasonDate = this.$route.query.tutelageStopReasonDate
      let tutelageStopReason = this.$route.query.tutelageStopReason
      this.$nextTick(() => {
        this.form.setFieldsValue({
          tutelageStopReasonDate: tutelageStopReasonDate
            ? moment(tutelageStopReasonDate, 'YYYY-MM-DD')
            : '',
          tutelageStopReason: tutelageStopReason
        })
      })
    },
    async getDic () {
      let investigationMethodList = await this.getDictionaries('INVESTIGATION')
    },

    callback (key) {
      console.log(key)
      if (key == 2) {
        this.$refs.dcpg.initDatas()
      }
      if (key == 3) {
        this.$refs.lsjh.initDatas()
      }
      if (key == 4) {
        this.$refs.zjbf.initDatas()
      }
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    }
  }
}
</script>
