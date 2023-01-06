<template>
  <!-- 打印预览收养登记证、解除收养关系证明组件 -->
  <div>
    <ta-modal :maskClosable="false"
              v-model="printCertificateVisible"
              :title="isType=='1'?'收养登记证':'解除收养关系证明'"
              @cancel="printCertificateVisible=false"
              width="800px"
              class="wjps_header">
      <div v-if="isType=='1'">是否打印收养登记证</div>
      <div v-else>是否打印解除收养关系证明</div>
      <!-- <div class="print-marry-content">
        <span class="span1">{{printCertificateInfo.mainName}}</span>
        <span class="span2">{{printCertificateInfo.certificateDate}}</span>
        <span class="span3">{{printCertificateInfo.certificateNumber}}</span>
        <span class="span4">{{printCertificateInfo.remark}}</span>
        <span class="span5">{{printCertificateInfo.name1}}</span>
        <span class="span6">{{printCertificateInfo.sex1}}</span>
        <span class="span7">{{printCertificateInfo.nationality1}}</span>
        <span class="span8">{{printCertificateInfo.birthday1}}</span>
        <span class="span9">{{printCertificateInfo.idNo1}}</span>
        <span class="span10">{{printCertificateInfo.name2}}</span>
        <span class="span11">{{printCertificateInfo.sex2}}</span>
        <span class="span12">{{printCertificateInfo.nationality2}}</span>
        <span class="span13">{{printCertificateInfo.birthday2}}</span>
        <span class="span14">{{printCertificateInfo.idNo2}}</span>
      </div> -->
      <span slot="footer">
        <ta-button @click="printCertificateVisible=false">返回</ta-button>
        <ta-button type="primary"
                   @click="printCertificate('0')">打印</ta-button>
      </span>
    </ta-modal>
  </div>
</template>
<script>
import { getLodop } from '@component/common/js/mixins/lodopEdit'
export default {
  data () {
    return {
      printCertificateVisible: false,
      printCertificateInfo: {},
      isType: '',
      // imgStr: `${window.faceConfig.basePath.split('/j')[0]}/static/img/register7.png`,
      // imgStr1: `${window.faceConfig.basePath.split('/j')[0]}/static/img/relive5.jpg`
      imgStr: 'http://123.182.234.124:11601/upgrade//static/img/register7.png',
      imgStr1: 'http://123.182.234.124:11601/upgrade//static/img/relive5.jpg'
      // imgStr: 'http://localhost:8080//static/img/register7.png',
      // imgStr1: 'http://localhost:8080//static/img/relive5.jpg'
    }
  },
  mounted () {
  },
  methods: {
    // 打印代码
    printCertificate (typeStr) {
      this.printCertificateFanally(typeStr)
    },
    // 最后打印证件
    printCertificateFanally (typeStr) {
      const vm = this
      const LODOP = getLodop(vm)
      if (LODOP && LODOP.webskt && LODOP.webskt.readyState == 1) {
        this.CreateFullBill(typeStr)
      }
    },
    // 打印收养登记证/解除收养关系证明，打印内容
    CreateFullBill (typeStr) {
      const vm = this
      const LODOP = getLodop(vm)
      if (this.isType == '1') {
        LODOP.PRINT_INIT('打印收养登记证')
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
        LODOP.PRINT_INITA(0, 0, '20.1cm', '29.7cm')// 打印收养登记证

        LODOP.ADD_PRINT_TEXT('4.08cm', '14.002cm', '5.572cm', '0.7cm', this.printCertificateInfo.adoptionRegistionCertificateNumber)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('4.64cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.bothName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('5.64cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.maleName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('6.54cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.maleNationality)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('7.15cm', '6.9cm', '2cm', '0.7cm', this.printCertificateInfo.maleBirthdayYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('7.15cm', '9.7cm', '0.9cm', '0.7cm', this.printCertificateInfo.maleBirthdayMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('7.15cm', '11.3cm', '0.9cm', '0.7cm', this.printCertificateInfo.maleBirthdayDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('7.9cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.maleIdCard)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('8.7cm', '5.7cm', '7.6cm', '1.25cm', this.printCertificateInfo.maleCensusRegisterDetail)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('10cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.femaleName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('10.86cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.femaleNationality)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('11.77cm', '6.9cm', '2cm', '0.7cm', this.printCertificateInfo.femaleBirthdayYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('11.77cm', '9.7cm', '0.9cm', '0.7cm', this.printCertificateInfo.femaleBirthdayMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('11.77cm', '11.3cm', '0.9cm', '0.7cm', this.printCertificateInfo.femaleBirthdayDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('12.5cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.femaleIdCard)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('13.31cm', '5.7cm', '7.6cm', '1.84cm', this.printCertificateInfo.femaleCensusRegisterDetail)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('15.21cm', '5.7cm', '7.6cm', '0.65cm', this.printCertificateInfo.childName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('15.89cm', '5.7cm', '7.6cm', '0.65cm', this.printCertificateInfo.childName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('16.6cm', '5.7cm', '7.6cm', '0.65cm', this.printCertificateInfo.nickName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('17.275cm', '5.7cm', '7.6cm', '0.65cm', this.printCertificateInfo.childSex)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('17.955cm', '6.7cm', '2cm', '0.65cm', this.printCertificateInfo.childBirthdayYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('17.955cm', '9.5cm', '0.9cm', '0.65cm', this.printCertificateInfo.childBirthdayMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('17.955cm', '11.1cm', '0.9cm', '0.65cm', this.printCertificateInfo.childBirthdayDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('18.611cm', '5.7cm', '7.6cm', '0.65cm', this.printCertificateInfo.adoptionCategory)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('19.325cm', '5.7cm', '7.6cm', '0.7cm', this.printCertificateInfo.childIdCard)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('19.934cm', '5.7cm', '13cm', '0.65cm', this.printCertificateInfo.childAddress)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('20.57cm', '6.86cm', '11cm', '0.65cm', this.printCertificateInfo.welfareInstitutionName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('25.109cm', '10.827cm', '1.445cm', '0.65cm', this.printCertificateInfo.year)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('25.109cm', '12.88cm', '0.9cm', '0.65cm', this.printCertificateInfo.month)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('25.109cm', '14.248cm', '0.9cm', '0.65cm', this.printCertificateInfo.day)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_TEXT('26.916cm', '4.273cm', '11.43cm', '1.5cm', this.printCertificateInfo.remark)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
        LODOP.ADD_PRINT_SETUP_BKIMG(this.imgStr)
        LODOP.SET_SHOW_MODE('BKIMG_WIDTH', '230mm')
        LODOP.SET_SHOW_MODE('BKIMG_HEIGHT', '297mm')
      }
      if (this.isType == '2') {
        LODOP.PRINT_INIT('打印解除收养关系证明')
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'B5')
        LODOP.PRINT_INITA(0, 0, '25cm', '17cm')// 打印解除收养关系证明

        LODOP.ADD_PRINT_TEXT('2.59cm', '19.778cm', '1.244cm', '0.6cm', this.printCertificateInfo.registerYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9)
        LODOP.ADD_PRINT_TEXT('2.59cm', '21.492cm', '0.582cm', '0.6cm', this.printCertificateInfo.registerMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9)
        LODOP.ADD_PRINT_TEXT('2.59cm', '22.312cm', '0.582cm', '0.6cm', this.printCertificateInfo.registerDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9)
        LODOP.ADD_PRINT_TEXT('3.58cm', '15.28cm', '1.905cm', '0.997cm', this.printCertificateInfo.registerOrgName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('4.977cm', '5.887cm', '5.05cm', '0.6cm', this.printCertificateInfo.relieveAdoptCertificateNumber)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('5.897cm', '4.961cm', '5.05cm', '0.6cm', this.printCertificateInfo.maleName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('6.95cm', '2.765cm', '0.979cm', '0.6cm', this.printCertificateInfo.maleSex)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('6.95cm', '5.966cm', '1.296cm', '0.6cm', this.printCertificateInfo.maleBirthdayYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('6.95cm', '7.845cm', '0.7cm', '0.6cm', this.printCertificateInfo.maleBirthdayMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('6.95cm', '8.93cm', '0.71cm', '0.6cm', this.printCertificateInfo.maleBirthdayDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('8.01cm', '4.961cmcm', '5.05cm', '0.6cm', this.printCertificateInfo.femaleName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('9.279cm', '2.765cm', '0.979cm', '0.6cm', this.printCertificateInfo.femaleSex)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('9.279cm', '5.966cm', '1.296cm', '0.6cm', this.printCertificateInfo.femaleBirthdayYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('9.279cm', '7.845cm', '0.7cm', '0.6cm', this.printCertificateInfo.femaleBirthdayMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('9.279cm', '8.93cm', '0.71cm', '0.6cm', this.printCertificateInfo.femaleBirthdayDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('10.528cm', '5.464cmcm', '5.05cm', '0.6cm', this.printCertificateInfo.childName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('11.66cm', '2.765cm', '0.979cm', '0.6cm', this.printCertificateInfo.childSex)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('11.66cm', '5.966cm', '1.296cm', '0.6cm', this.printCertificateInfo.childBirthdayYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('11.66cm', '7.845cm', '0.7cm', '0.6cm', this.printCertificateInfo.childBirthdayMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('11.66cm', '8.93cm', '0.71cm', '0.6cm', this.printCertificateInfo.childBirthdayDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('12.882cm', '6.39cm', '1.905cm', '0.6cm', this.printCertificateInfo.placingOutMaleName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('12.882cm', '8.506m', '1.905cm', '0.6cm', this.printCertificateInfo.placingOutFemaleName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('12.909cm', '6.443cm', '5.054cm', '0.6cm', this.printCertificateInfo.placingOutOrgName)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('5.358cm', '14.698cm', '8.334cm', '1.183cm', this.printCertificateInfo.relieveReason)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('13.279cm', '16.417cm', '1.508cm', '0.6cm', this.printCertificateInfo.relieveYear)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('13.279cm', '18.561cm', '0.7cm', '0.6cm', this.printCertificateInfo.relieveMonth)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_TEXT('13.279cm', '19.725cm', '0.7cm', '0.6cm', this.printCertificateInfo.relieveDay)
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
        LODOP.ADD_PRINT_SETUP_BKIMG(this.imgStr1)
        LODOP.SET_SHOW_MODE('BKIMG_WIDTH', '250mm')
        LODOP.SET_SHOW_MODE('BKIMG_HEIGHT', '176mm')
      }
      // LODOP.SET_PRINT_PAGESIZE(1, "12.8cm", "18.6cm", "");
      LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1)
      LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)// 设置以纸张边缘为基点
      LODOP.SET_SHOW_MODE('BKIMG_LEFT', 0)
      LODOP.SET_SHOW_MODE('BKIMG_TOP', 0)
      LODOP.SET_SHOW_MODE('BKIMG_PRINT', 0)
      LODOP.SET_SHOW_MODE('SHOW_SCALEBAR', 1)
      LODOP.SET_SHOW_MODE('BKIMG_IN_PREVIEW', 1)// 设置打印预览时是否显示背景图
      LODOP.SET_SHOW_MODE('HIDE_PBUTTIN_SETUP', 1)
      LODOP.SET_PRINT_STYLE('FontName', '宋体')

      LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 800, 800)
      if (typeStr == '0') {
        LODOP.SET_SHOW_MODE('HIDE_PBUTTIN_SETUP', 1)
        LODOP.PRINT_DESIGN()
        // LODOP.PRINT_SETUP()
      } else if (typeStr == '1') {
        LODOP.PRINT_SETUP()
        // LODOP.PREVIEW();
      }
    }
  }
}
</script>
