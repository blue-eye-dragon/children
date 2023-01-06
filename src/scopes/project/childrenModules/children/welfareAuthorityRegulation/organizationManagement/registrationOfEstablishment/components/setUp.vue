<template>
  <div>
    <div ref="oneout"
         class="mars">
      <al-title :title="'机构基础信息'"
                id="anchorpoint_a"
                :show.sync="showone"></al-title>
      <div class="hei">
        <OrgBasicInfor ref="one"
                       :disabled="disabled"
                       @reForm="reForm"
                       :orgType="orgType"
                       :yesorno="yesorno"
                       :orgNature="orgNature"
                       :registerOrg="registerOrg"
                       :claimReportfileList="claimReportfileList"
                       @claimReportFun='claimReportFun'
                       :siteOwnershipfileList="siteOwnershipfileList"
                       @siteOwnershipFun="siteOwnershipFun"
                       :capitalVerificationfileList="capitalVerificationfileList"
                       @capitalVerificationFun="capitalVerificationFun"
                       :institutionalfileList="institutionalfileList"
                       @institutionalFun="institutionalFun"
                       :otherInformationfileList="otherInformationfileList"
                       @otherInformationFun="otherInformationFun"
                       :approvalOfOrganizationfileList="approvalOfOrganizationfileList"
                       @approvalOfOrganizationFun="approvalOfOrganizationFun"
                       :constructionfileList="constructionfileList"
                       @constructionFun="constructionFun"
                       :shenbanrenfileList="shenbanrenfileList"
                       @shenbanrenFun="shenbanrenFun"
                       :keyPersonnelfileList="keyPersonnelfileList"
                       @keyPersonnelFun="keyPersonnelFun"></OrgBasicInfor>
      </div>
    </div>
    <div ref="twoout"
         class="mars">
      <al-title :title="'实地验收情况'"
                id="anchorpoint_b"
                :show.sync="showtwo"></al-title>
      <div class="hei">
        <FieldAcceptance ref="two"
                         :disabled="disabled"
                         :yesorno="yesorno"
                         :havingFunctionalAreas="havingFunctionalAreas"
                         :medicalModel="medicalModel"></FieldAcceptance>
      </div>
    </div>
  </div>

</template>
<script>
import alTitle from '@component/common/components/Title'
import OrgBasicInfor from './orgBasicInformation'
import FieldAcceptance from './fieldAcceptance'
export default {
  components: {
    alTitle,
    OrgBasicInfor,
    FieldAcceptance
  },
  props: {
    disabled: {
      type: Boolean
    },
    // 登记机关
    registerOrg: {
      type: Array,
      require: true
    },
    // 机构类型
    orgType: {
      type: Array,
      require: true
    },
    // 机构性质
    orgNature: {
      type: Array,
      require: true
    },
    // 医疗模式
    medicalModel: {
      type: Array,
      require: true
    },
    // 拥有功能区域
    havingFunctionalAreas: {
      type: Array,
      require: true
    },
    yesorno: {
      type: Array
    },
    claimReportfileList: {
      type: Array
    },
    siteOwnershipfileList: {
      type: Array
    },
    capitalVerificationfileList: {
      type: Array
    },
    institutionalfileList: {
      type: Array
    },
    otherInformationfileList: {
      type: Array
    },
    approvalOfOrganizationfileList: {
      type: Array
    },
    constructionfileList: {
      type: Array
    },
    shenbanrenfileList: {
      type: Array
    },
    keyPersonnelfileList: {
      type: Array
    }
  },
  data () {
    return {
      showone: true,
      showtwo: true
    }
  },
  methods: {
    claimReportFun (val) {
      this.$emit('claimReportFun', val)
    },
    siteOwnershipFun (val) {
      this.$emit('siteOwnershipFun', val)
    },
    capitalVerificationFun (val) {
      this.$emit('capitalVerificationFun', val)
    },
    institutionalFun (val) {
      this.$emit('institutionalFun', val)
    },
    otherInformationFun (val) {
      this.$emit('otherInformationFun', val)
    },
    approvalOfOrganizationFun (val) {
      this.$emit('approvalOfOrganizationFun', val)
    },
    constructionFun (val) {
      this.$emit('constructionFun', val)
    },
    shenbanrenFun (val) {
      this.$emit('shenbanrenFun', val)
    },
    keyPersonnelFun (val) {
      this.$emit('keyPersonnelFun', val)
    },
    reForm () {
      this.setHeight('one', 'oneout')
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    loadData () {
      this.showone = true
      this.showtwo = true
      this.setHeight('one', 'oneout', !this.showone)
      this.setHeight('two', 'twoout', !this.showtwo)
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
<style scoped>
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
</style>
