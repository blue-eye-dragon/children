<template>
  <div class="padbottom conts  tadrawer">
    <div class="contin">
      <ta-spin tip="加载中..."
               :spinning="spinning">
        <!-- <div v-if="isOtherAdd == '12'"
             style="font-size: 20px;text-align: center;">{{isAnotherPlaceApply == '1'?'此儿童为异地申请':'此儿童为公众服务平台上报儿童'}}</div> -->
        <ta-form layout="horizontal"
                 v-show="operateFlag != 'add'&&isLocal"
                 :autoFormCreate="(form)=>{this.topForm = form}">
          <ta-row ref="one"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="数据来源"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="currentStatus">
                  <span class="lineHeight"
                        v-if="isAnotherPlaceApply=='0'">本地申请</span>
                  <span class="lineHeight"
                        v-if="isAnotherPlaceApply=='1'">异地申请</span>
                  <span class="lineHeight"
                        v-if="isAnotherPlaceApply=='2'">公众服务平台申请</span>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item :label="isAnotherPlaceApply=='0'?'上报日期':'申请日期'"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="registerDate">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='0'">
                <ta-form-item label="上报单位"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="orgName">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="12"
                      v-if="isAnotherPlaceApply=='1'">
                <ta-form-item label="受理地"
                              :labelCol="{span:3}"
                              :wrapperCol="{span:20}"
                              class="form-item-reportUnit"
                              fieldDecoratorId="reportUnit">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='2'">
                <ta-form-item label="申请人"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="reportPerson">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6"
                      v-if="isAnotherPlaceApply=='2'">
                <ta-form-item label="申请人手机号"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="reportPersonMobil">
                  <ta-input :disabled="true" />
                </ta-form-item>
              </ta-col>
            </ta-col>
          </ta-row>
        </ta-form>
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal"
                 :hideRequiredMark="hideRequiredMark">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="儿童类别"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              :require="{message:'请选择儿童类别'}"
                              fieldDecoratorId="childType"
                              style="margin-top: 5px; margin-bottom: 15px;">
                  <ta-select @change="selectchange"
                             :disabled="disabled || isOtherAdd=='12'||changedisabled||areaLevel=='4'">
                    <ta-select-option v-for="(item,index) in childrenType"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24"
                    v-if="isOverAge">
              <ta-form-item label="补录原因"
                            :labelCol="{ span: 2 }"
                            :wrapperCol="{ span: 22 }"
                            class="alonerow"
                            fieldDecoratorId="buluReason"
                            :fieldDecoratorOptions="verificationRules('补录原因',100,true)">
                <ta-textarea :placeholder="!disabled?'请输入补录原因':''"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
        <ta-tabs :activeKey="nowkey"
                 @change="callback"
                 type="line"
                 id="orphanForm">
          <ta-tab-pane tab="儿童基本信息"
                       key="1"
                       :forceRender="true">
            <div ref="oneout"
                 class="mars">
              <Title id="anchorpoint_a"
                     class="bassInfor"
                     title="基本信息"
                     :show.sync="showone"></Title>
              <ta-form layout="horizontal"
                       ref="one"
                       :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
                       :hideRequiredMark="hideRequiredMark">
                <BaseInformation @changehei="changehei"
                                 :mechanismList.sync="mechanismList"
                                 @chosedata="chosedata"
                                 :welfare="welfare"
                                 :thisP="this"
                                 :isOnlyShow="isOnlyShow"
                                 :isOther="isOtherAdd == '12'"
                                 :birthable="birthable"
                                 @setTogather="setTogather"
                                 :disabled="disabled"
                                 :changedisabled="changedisabled"
                                 :addressmodel="addressmodel"
                                 :choselist.sync='choselist'
                                 :addressmodelNow="addressmodelNow"
                                 @clearAddress="clearAddress"
                                 :childType="childType"
                                 @setaddress="setaddress"
                                 @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                                 @setValueByIdCard="setValueByIdCard"
                                 @setAgeByBirth="setAgeByBirth"
                                 @clearDatas="clearDatas"
                                 @clearIfSeriously="clearIfSeriously"
                                 @clearDataAndErroInfo="clearDataAndErroInfo"
                                 :adopt.sync="adopt"
                                 :adoptOrSanju.sync="adoptOrSanju"
                                 :hasRegistered.sync="hasRegistered"
                                 @assignEndTime="assignEndTime"
                                 @adoptionEmitEvent="adoptionEmitEvent"
                                 :key="timer"
                                 :isOverAge="isOverAge"
                                 :isWshEdit="operateFlag=='edit_wsh'"
                                 ref="base"></BaseInformation>
              </ta-form>
            </div>

            <div ref="fourout"
                 class="mars"
                 v-if="this.childSituationAttr.filter(v => this.childSituation.includes(v)) != ''">
              <Title id="anchorpoint_d"
                     title="寻亲信息"
                     :show.sync="showfour"></Title>
              <ta-form layout="horizontal"
                       ref="four"
                       :autoFormCreate="(searchRelativesFrom)=>{this.searchRelativesFrom = searchRelativesFrom}"
                       :hideRequiredMark="hideRequiredMark">
                <SearchRelatives :disabled="disabled"
                                 ref="relative"></SearchRelatives>
              </ta-form>
            </div>

            <div ref="twoout"
                 class="mars">
              <Title id="anchorpoint_b"
                     title="生活费信息"
                     :show.sync="showtwo"></Title>
              <ta-form layout="horizontal"
                       ref="two"
                       :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}"
                       :hideRequiredMark="hideRequiredMark">
                <LivingExpenses :adopt.sync="adopt"
                                :iswelfare="iswelfare"
                                :changedisabled="changedisabled"
                                :isOther="isOtherAdd == '12'"
                                :childtype="childType"
                                :birthDate="birthDate"
                                @clearDataAndErroInfo="clearDataAndErroInfo"
                                @setErrorMessage="setErrorMessage"
                                ref='live'></LivingExpenses>
                <div>
                  <p class="warntext">
                    <ta-icon type="info-circle-o"
                             class="icons" />基本生活费补贴自儿童资格认定审核通过后次月开始享受，若儿童户籍所在地乡镇录入了起领年月、末领年月信息，最终以录入信息为准。
                  </p>
                </div>
              </ta-form>
            </div>

            <div ref="threeout"
                 class="mars"
                 v-if="childType!=Enum.CHILDCATEGORYA.SSWRFYET">
              <Title id="anchorpoint_c"
                     title="相关证明信息"
                     :show.sync="showthree"></Title>
              <ta-form layout="horizontal"
                       ref="three"
                       :autoFormCreate="(form)=>{this.childRelevantForm = form}"
                       :hideRequiredMark="hideRequiredMark">
                <EvidenceInformation @uochanhei="uochanhei"
                                     :disabled="disabled"
                                     :childType="childType"
                                     :hasRegistered="hasRegistered"
                                     :operateFlag="operateFlag"
                                     :isOther="isOtherAdd=='12'||isOtherEdit=='12'"
                                     :key="timer1"
                                     ref="baseFile"></EvidenceInformation>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="家庭成员及社会关系"
                       key="2"
                       :forceRender="true">
            <div ref="fam_oneout"
                 class="mars">
              <Title id="fam_a"
                     title="基本信息"
                     :show.sync="fam_showone"></Title>
              <ta-form layout="horizontal"
                       ref="fam_one"
                       class="formStyle"
                       :autoFormCreate="(adoptedFamFrom)=>{this.adoptedFamFrom = adoptedFamFrom}"
                       :hideRequiredMark="hideRequiredMark">
                <FamilyBase :disabled="disabled"></FamilyBase>
              </ta-form>
            </div>

            <div ref="fam_twoout"
                 class="mars">
              <Title id="fam_b"
                     title="家庭成员"
                     :show.sync="fam_showtwo"></Title>
              <div class="familyout">
                <Family ref="fam_two"
                        types="1"
                        @changehei="changeFamHei"
                        @getTableDatas="getTableDatas"></Family>
              </div>

            </div>
            <div ref="fam_threeout"
                 class="mars">
              <Title id="fam_c"
                     title="相关证明信息"
                     :show.sync="fam_showthree"></Title>
              <ta-form layout="horizontal"
                       ref="fam_three"
                       :autoFormCreate="(form)=>{this.famRelevantForm = form}"
                       :hideRequiredMark="hideRequiredMark">
                <FamilyCertificateInformation @uochanhei="uochanhei"
                                              :childType="childType"
                                              :disabled="disabled"
                                              :guardian="guardian"
                                              ref="famFile"></FamilyCertificateInformation>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="入院/增员体检信息"
                       key="4"
                       :forceRender="true">
            <div class="mars"
                 ref="pm_oneout">
              <Title title="入院/增员体检信息"
                     :show.sync="pm_showone"></Title>
              <ta-form layout="horizontal"
                       class="drawerFrom"
                       ref="pm_one"
                       :autoFormCreate="(form)=>{this.physicalPxaminationForm = form}"
                       :hideRequiredMark="hideRequiredMark">
                <PhysicalExamineInformation :disabled="disabled"
                                            @uochanhei="uochanhei"
                                            :addressmodelPm="addressmodelPm"
                                            @setphysicaladdress="setphysicaladdress"
                                            :adoptOrSanju.sync="adoptOrSanju"
                                            @clearDataAndErroInfo="clearDataAndErroInfo"
                                            ref="physic"></PhysicalExamineInformation>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="其他附件材料"
                       key="3"
                       :forceRender="true">
            <div class="mars"
                 ref="fam_fourout">
              <ta-form layout="horizontal"
                       ref="fam_four"
                       :autoFormCreate="(form)=>{this.otherRelevantForm = form}"
                       :hideRequiredMark="hideRequiredMark">
                <MultiMedia @uochanhei="uochanhei"
                            :disabled="disabled"
                            ref="mul"></MultiMedia>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="申请人/经办人信息"
                       key="5"
                       :forceRender="true">
            <div ref="peroneout"
                 class="mars">
              <Title title="申请人信息"
                     :show.sync="showperone"></Title>
              <ta-form ref="perone"
                       layout="horizontal"
                       :autoFormCreate="(form) => {this.applicantForm = form;}">
                <Applicant :disabled="disabled"
                           @setaddress="setaddressApp"
                           @setBirthAndSex="setBirthAndSex"
                           :isChange="operateFlag=='edit_change'"
                           :isSanju="childType==Enum.CHILDCATEGORYA.SHSJET"
                           ref="applicant"></Applicant>
              </ta-form>
            </div>
            <div ref="pertwoout"
                 class="mars">
              <Title title="经办人信息"
                     :show.sync="showpertwo"></Title>
              <ta-form ref="pertwo"
                       layout="horizontal"
                       :autoFormCreate="(form) => {this.agentForm = form;}">
                <ta-row>
                  <ta-col :span="24">
                    <ta-col :span="8">
                      <ta-form-item label="办理人"
                                    fieldDecoratorId="agentPersonName"
                                    :labelCol="{ span: 7 }"
                                    :wrapperCol="{span:17}"
                                    :fieldDecoratorOptions="childType==Enum.CHILDCATEGORYA.SHSJET&&operateFlag!='edit_change'?verificationRules('办理人姓名',72):verificationRulesNotMustFill('办理人姓名',72)">
                        <ta-input :disabled="disabled"
                                  :placeholder="disabled?'':'请输入办理人姓名'" />
                      </ta-form-item>
                    </ta-col>
                    <ta-col :span="8">
                      <ta-form-item label="办理人联系电话"
                                    fieldDecoratorId="agentPersonTel"
                                    :labelCol="{ span: 7 }"
                                    :wrapperCol="{span:17}"
                                    :fieldDecoratorOptions="childType==Enum.CHILDCATEGORYA.SHSJET&&operateFlag!='edit_change'?verificationRules('办理人联系电话', { type: 'phone' }):verificationRulesNotMustFill('办理人联系电话', { type: 'phone' })">
                        <ta-input :disabled="disabled"
                                  :placeholder="disabled?'':'请输入办理人联系电话'" />
                      </ta-form-item>
                    </ta-col>
                    <ta-col :span="8">
                      <ta-form-item label="办理机构"
                                    fieldDecoratorId="orgName"
                                    :labelCol="{ span: 7 }"
                                    :wrapperCol="{span:17}">
                        <ta-input :disabled="true" />
                      </ta-form-item>
                    </ta-col>
                  </ta-col>
                </ta-row>
              </ta-form>
            </div>
          </ta-tab-pane>
        </ta-tabs>
      </ta-spin>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="btnleft temporarystorage"
                 @click="submit(0,'add')"
                 v-if="!disabled&&!changedisabled&&operateFlag != 'edit_change'&&operateFlag != 'edit_wsh' && clickSourceType!='continue'">暂存</ta-button>
      <ta-button type="primary"
                 class="btnleft"
                 @click="submit(1,'add')"
                 v-if="!disabled&&operateFlag != 'edit_change'">提交</ta-button>
      <ta-button type="primary"
                 class="btnleft"
                 @click="submit(1,'edit')"
                 v-if="operateFlag == 'edit_change'">保存</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import BaseInformation from '../components/baseInformation'
import LivingExpenses from '../components/livingExpenses'
import PhysicalExamineInformation from '../components/physicalExamineInformation'
import EvidenceInformation from '../components/evidenceInformation'
import FamilyBase from '../components/familyBase'
import Family from './family'
import SearchRelatives from './searchRelatives'
import FamilyCertificateInformation from '../components/familyCertificateInformation'
import MultiMedia from '../components/multiMedia'
import Applicant from '../components/applicantInfo'
import moment from 'moment'
import DataProcess from './childrenDataProcess'
import $ from 'jquery'

export default {
  mixins: [DataProcess],
  name: 'register',
  components: {
    Title,
    BaseInformation,
    LivingExpenses,
    EvidenceInformation,
    FamilyBase,
    Family,
    FamilyCertificateInformation,
    PhysicalExamineInformation,
    MultiMedia,
    SearchRelatives,
    Applicant
  },
  data () {
    return {
      menulist: [
        { title: '儿童基本信息', key: '1' },
        { title: '家庭成员及社会关系', key: '2' },
        { title: '其他附件材料', key: '3' },
        { title: '打印', key: '4' }
      ],
      walfareType: {
        authority: '0',
        createDate: '2019-08-28',
        createUser: '1',
        label: '福利机构养育孤弃儿童',
        name: '儿童类别-福利院',
        newType: '0',
        sort: 10,
        status: '1',
        system: '1',
        type: 'CHILDCATEGORYF',
        value: '1',
        version: 1
      },
      childTypeCode: (window.parent.indexTool.getUserInfo().orgType == '99'
        ? 'CHILDCATEGORYF' // 儿童类别-福利院
        : (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99'
          ? 'CHILDCATEGORYM' // 儿童类别-民政局
          : 'CHILDCATEGORYA')), // 儿童类别-全
      welfare: false,
      iswelfare: false,
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      fam_showone: true,
      fam_showtwo: true,
      fam_showthree: true,
      pm_showone: true,
      showperone: true, // 申请人
      showpertwo: true, // 经办人
      // 男 女 收养
      typeadoption: '1',
      childType: 1, // 儿童类别
      familyobj: [],
      nowkey: '1',
      isOtherAdd: '', // 异地新增传值
      isOtherEdit: '', // 异地新增传值
      clickSourceType: '', // 点击的按钮来源类别：continue继续办理
      isAnotherPlaceApply: '1', // 编辑时的判断是否异地
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel,
      mechanismList: [],
      childrenType: [], // 儿童类别字典数据
      operateFlag: '', // 区分新增（add）、编辑（edit）、查看（look）的标识符
      childSituation: '',
      childSituationAttr: [
        this.Enum.CHILDSITUATION.LLQT,
        this.Enum.CHILDSITUATION.DGJJ,
        this.Enum.CHILDSITUATION.YSBYQET,
        this.Enum.CHILDSITUATION.YSYSZS], // 显示寻亲情况时满足的儿童情况数据
      disabled: false,
      changedisabled: false, // 儿童变更字段的只读（基本信息：性别、户籍性质、登记日期、患病情况、户籍所在地；生活费：起领年月）
      addressmodelNow: [],
      addressmodel: [],
      addressmodelPm: [],
      familyMemberInfoFrom: [], // 家庭成员信息列表数据
      choselist: {},
      hideRequiredMark: false, // 隐藏所有表单项的必填标记就是红色的*
      orphansHandicappedList: {}, // 存放路由跳转儿童基本信息列表数据
      enterObj: {}, // 跳转带过来的入院信息obj
      physicObj: {}, // 跳转带过来的入院体检信息obj
      baseObj: {}, // 跳转带过来的儿童信息obj
      relateObj: {}, // 跳转带过来的寻亲信息obj
      liveObj: {}, // 跳转带过来的生活信息obj
      famObj: {}, // 跳转带过来的家庭信息obj
      famMemObj: [], // 跳转带过来的家庭成员信息obj
      childBaseId: null, // 儿童基本信息id（身份证号重复后带出来的）
      routeName: '', // 数据提交成功后跳转的路由
      routeObjs: '', // 数据提交成功后跳转带的参数
      adopt: true, // 是否是福利孤弃儿童且养育类型为收养
      adoptOrSanju: true, // 是否是福利孤弃儿童且养育类型为收养或是否是区县的散居孤儿
      spinning: false, // 加载中
      birthable: false,
      orgData: {}, // 异地机构信息
      isOnlyShow: false,
      isFromSearch: false,
      formDataSearch: {},
      birthDate: null, // 儿童基本信息 出生日期的值
      guardian: false,
      isLocal: false, // 是否显示数据来源等（当前登录用户区划和申请单位不相等时需要展示）
      hasRegistered: true, // 有无户口
      timer: '', // 儿童基本信息的key
      timer1: '', // 儿童基本信息附件的key
      businessId: null, // 申请人/经办人编辑所需的字段
      userInfo: window.parent.indexTool.getUserInfo(), // 当前登录用户信息
      isOverAge: false // 是否是超龄补录列表过来的
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('7.3%', '92.7%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    // 重置儿童基本信息的key 防止共用时出现问题
    this.timer = new Date().getTime()
    // 重置儿童基本信息附件的key 防止共用时出现问题
    this.timer1 = new Date().getTime()
    this.addOrUpdate() // 新增编辑查看前的数据处理
  },
  methods: {
    // 清除户籍地
    clearAddress () {
      this.$nextTick(() => {
        this.addressmodel = []
        this.adoptedFrom.setFieldsValue({
          censusRegisterDatas: []
        })
      })
    },
    // 根据身份证号设置出生日期和性别-申请人/经办人信息
    setBirthAndSex (sex, birth) {
      this.applicantForm.setFieldsValue({
        sex: sex,
        birthday: birth
      })
    },
    // 申请人户籍地/现住址赋值
    setaddressApp (filedName, fieldValue) {
      this.applicantForm.setFieldsValue({
        [filedName]: fieldValue
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-10 19:58:13
     * @information: 选择的类型为收养时的响应事件
     */
    adoptionEmitEvent () {
      // 末领年月非必填
      this.$refs.live.isNotRequiredEndTime = true
    },

    // 儿童编号接口获取数据
    getChildNum () {
      this.post('/serialApi/getChildNumber', {}).then((res) => {
        if (res.serviceSuccess) {
          this.adoptedFrom.setFieldsValue({ childNumber: res.data.code }) // 儿童编号
        }
      })
    },
    // 获取患病类型、特教类型字典数据，并进行赋值（code为字典编码，val为数据值，name为字段名）
    typeDataProcess (code, val, otherval, name, compare = (a, b) => a === b) {
      let list = []
      let attr = []
      let showData = ''
      const _self = this
      _self.choselist[name] = val
      _self.choselist[`${name}Other`] = otherval

      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          list = res.data.codeList
          if (val && val.length > 0) {
            attr = val.split(',')
            attr.forEach((val, index) => {
              list.forEach((item, index) => {
                if (compare(item.value, val)) {
                  showData = showData + item.label + ','
                }
              })
            })
          }
          if (showData != '') {
            showData = showData.substring(0, showData.length - 1)
          }
          if (name == 'childSituation') {
            if (val == _self.Enum.CHILDSITUATION.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.adoptedFrom.setFieldsValue({ childSituation: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ childSituation: showData })
              // 当儿童情况为“疑似被遗弃儿童05”、“疑似遗失走失06”，则捡拾地、捡拾日期为必填项，否则为不必填项。
              if (val && (val.indexOf(this.Enum.CHILDSITUATION.YSBYQET) != -1 || val.indexOf(this.Enum.CHILDSITUATION.YSYSZS) != -1)) {
                this.$refs.base.pickingRequire = true
              } else {
                this.$refs.base.pickingRequire = false
              }
            }
          }
          if (name == 'illnessType') {
            if (val == _self.Enum.ILLNESSTYPE.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.adoptedFrom.setFieldsValue({ illnessType: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ illnessType: showData })
            }
          }
          if (name == 'specialEducationType') {
            if (val == _self.Enum.SPECIALEDUCATIONTYPE.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.adoptedFrom.setFieldsValue({ specialEducationType: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ specialEducationType: showData })
            }
          }
          if (name == 'otherRescue') {
            if (val == _self.Enum.OTHERRESCUE.QT) {
              // showData = showData.replace(',', '：')
              showData += '：'
              _self.adoptedFrom.setFieldsValue({ otherRescue: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ otherRescue: showData })
            }
          }
          this.choselist[`${name}Label`] = showData
        }
      })
    },
    // 出生日期、民族、户口分类、户籍性质、户籍所在地一个填了全都必填
    setTogather (e, name) {
      if (e) {
        this.$refs.base.togather = true
      } else {
        const formdata = this.adoptedFrom.getFieldsValue()
        const birthday = !name || (name && name != 'birthday') ? formdata.birthday : null // 出生日期
        const nation = !name || (name && name != 'nation') ? formdata.nation : null// 民族
        const censusRegister = !name || (name && name != 'censusRegister') ? formdata.censusRegister : null // 户籍性质
        const householdRegistryClassify = !name || (name && name != 'householdRegistryClassify') ? formdata.householdRegistryClassify : null // 户口分类
        const censusRegisterDatas = !name || (name && name != 'censusRegisterDatas') ? formdata.censusRegisterDatas || [] : [] // 户籍地址
        const censusRegisterDetail = !name || (name && name != 'censusRegisterDetail') ? formdata.censusRegisterDetail : null // 地址详情

        if (birthday || nation || censusRegister || householdRegistryClassify || censusRegisterDatas.length > 0 || censusRegisterDetail) {
          this.$refs.base.togather = true
        } else {
          this.$refs.base.togather = false
          this.$refs.base.idCardRequire = false
          this.$refs.base.localDisabled = false
        }
      }
    },
    // 地址传值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        censusRegisterDatas: this.addressmodel,
        currentAddressDatas: this.addressmodelNow
      })
    },
    // 体检信息地址传值
    setphysicaladdress () {
      this.physicalPxaminationForm.setFieldsValue({
        physicalDatas: this.addressmodelPm
      })
    },
    chosedata (val) {
      this[`${val.filed}Data`] = val.val

      let str = ''
      // 判斷是不是其他
      if (val.otherval == '') {
        str = val.labelval
        this.choselist[`${val.filed}Other`] = ''
      } else {
        str = val.labelval + val.otherval
        this.choselist[`${val.filed}Other`] = val.otherval
      }
      this.adoptedFrom.setFieldsValue({
        [val.filed]: str
      })
      this.choselist[`${val.filed}Label`] = str
      this.choselist[val.filed] = val.val
      if (val.filed == 'childSituation') {
        this.childSituation = val.val
      }
    },
    backs () {
      if (this.isFromSearch) {
        this.$router.push({
          path: this.formDataSearch.pathUrl,
          query: {
            isFromSearch: true,
            formDataSearch: this.formDataSearch
          }
        })
      } else {
        this.familyMemberInfoFrom = []
        this.$refs.fam_two.tableDatas = []
        this.$router.go(-1)
      }
    },
    backsSearch () {

    },
    uochanhei () {
      this.setHeight('three', 'threeout')
      this.setHeight('pm_one', 'pm_oneout')
      this.setHeight('fam_three', 'fam_threeout')
      this.setHeight('fam_four', 'fam_fourout')
    },
    // 子组件改变高度
    changehei () {
      this.setHeight('one', 'oneout')
    },
    // 子组件改变高度-家庭成员
    changeFamHei () {
      this.setHeight('fam_two', 'fam_twoout')
    },
    callback (key) {
      this.nowkey = key
      this.showone = true
      this.showtwo = true
      this.showthree = true
      this.showfour = true
      this.fam_showone = true
      this.fam_showtwo = true
      this.fam_showthree = true
      this.pm_showone = true
      this.showperone = true
      this.showperone = true

      this.changeMunotResetHeight()
    },
    changeMunotResetHeight () {
      // setTimeout(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
      this.setHeight('three', 'threeout')
      this.setHeight('four', 'fourout')
      this.setHeight('fam_one', 'fam_oneout')
      this.setHeight('fam_two', 'fam_twoout')
      this.setHeight('fam_three', 'fam_threeout')
      this.setHeight('fam_four', 'fam_fourout')
      this.setHeight('pm_one', 'pm_oneout')
      this.setHeight('perone', 'peroneout')
      this.setHeight('pertwo', 'pertwoout')
      // }, 500)
    },
    // tab 切换到家庭时，将输入的儿童信息作为家庭成员进行赋值
    autoSet () {
      const famTableDatas = this.$refs.fam_two.tableDatas
      const _self = this
      let datas = {}
      const form = this.adoptedFrom.getFieldsValue()
      // 将家庭成员数组中的儿童数据调到第一行
      if (famTableDatas instanceof Array && famTableDatas.length > 0) {
        let index1 = 0
        famTableDatas.forEach((item, index) => {
          if (item.relationship == _self.Enum.RELATION.BR) {
            index1 = index
          }
        })
        if (index1) {
          famTableDatas[0] = famTableDatas.splice(index1, 1, famTableDatas[0])[0]
        }
        datas = famTableDatas[0]
        datas.name = form.name
        datas.sex = form.sex
        datas.idCard = form.idCard
        datas.adisCondition = form.adisCondition
        datas.disabilityType = form.disabilityType || []
        datas.illnessType = this.choselist.illnessType != undefined
          ? this.choselist.illnessType
          : (this.orphansHandicappedList && this.baseObj != undefined
            ? this.baseObj.illnessType
            : null)
        datas.illnessTypeOther = this.choselist.illnessType != undefined
          ? this.choselist.illnessTypeOther
          : (this.orphansHandicappedList && this.baseObj != undefined
            ? this.baseObj.illnessTypeOther
            : null)
        datas.remark = form.remark
      } else {
        datas = {
          name: form.name,
          sex: form.sex,
          relationship: this.Enum.RELATION.BR,
          idCard: form.idCard,
          adisCondition: form.adisCondition,
          ifGuardian: this.Enum.YESNO.FOU,
          currentSituation: this.Enum.CURRENTSITUATION.ZC,
          disabilityType: form.disabilityType || [],
          illnessType:
            this.choselist.illnessType != undefined
              ? this.choselist.illnessType
              : (this.orphansHandicappedList && this.baseObj != undefined
                ? this.baseObj.illnessType
                : null),
          illnessTypeOther:
            this.choselist.illnessType != undefined
              ? this.choselist.illnessTypeOther
              : (this.orphansHandicappedList && this.baseObj != undefined
                ? this.baseObj.illnessTypeOther
                : null),
          remark: form.remark
        }
      }

      // 患艾滋病情况其他
      if (form.adisCondition == this.Enum.ADISCONDITION.QT) {
        datas.adisConditionOther = this.$refs.base.$refs.adisConditionOther.stateValue
      }
      // 若患艾滋病情况为携带或感染艾滋病时，传入确认艾滋病感染时间、最有可能感染艾滋病途径数据
      if (form.adisCondition == this.Enum.ADISCONDITION.XDHGRAZB) {
        datas.infectionTime = form.infectionTime ? moment(form.infectionTime).format('YYYY-MM-DD') : null
        datas.transmissionWay = form.transmissionWay
        // 最有可能感染艾滋病途径数据-其他
        if (form.transmissionWay == this.Enum.TRANSMISSIONWAYOTHER.QT) {
          datas.transmissionWayOther = this.$refs.base.$refs.transmissionWayOther.stateValue
        }
      }

      if (form.birthday != undefined) {
        const birthday = form.birthday ? moment(form.birthday).format('YYYY-MM-DD') : null
        datas.birthday = birthday
      }
      if (famTableDatas.length == 0) {
        famTableDatas.push(datas)
      } else {
        famTableDatas.splice(0, 1, datas)
      }
      this.getTableDatas(famTableDatas)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'fam_two') {
            node.style.height =
              this.$refs[ref].$el.offsetHeight + 140 + 'px'
          } else if (ref == 'fam_three') {
            node.style.height =
              this.$refs[ref].$el.offsetHeight + 140 + 'px'
          } else {
            if (this.$refs[ref] && this.$refs[ref] != undefined) {
              node.style.height =
                this.$refs[ref].$el.offsetHeight + 90 + 'px'
            }
          }
        } else {
          node.style.height = '50px'
        }
        if (node && node != undefined) {
          node.style.transition = 'all 1s'
        }
      })
    },
    // 根据选择的不同儿童类别跳转不同页面
    async selectchange (val, params) {
      this.adoptedFrom.setFieldsValue({ rearingType: null })
      if (val == '1') {
        this.welfare = true
        this.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEWO')
      } else {
        this.welfare = false
        this.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEORG')
      }
      this.childType = val
      // 儿童类型为福利孤弃儿童，养育类型为收养时，生活费信息表单非必填
      if ((val == '1' || val == '2') && this.adoptedFrom.getFieldsValue().rearingType == this.Enum.REARINGTYPE.SY) {
        this.adopt = true
        this.adoptOrSanju = true
      } else {
        this.adopt = false
        if (val == this.Enum.CHILDCATEGORYA.SHSJET) { // 区县的散居孤儿
          this.adoptOrSanju = true
        } else {
          this.adoptOrSanju = false
        }
      }

      // 儿童类别为艾滋病毒感染儿童时，患艾滋病情况默认为携带或感染艾滋病
      const adisCondition = val == this.Enum.CHILDCATEGORYA.AZBBDGRET ? this.Enum.ADISCONDITION.XDHGRAZB : this.Enum.ADISCONDITION.WAZB
      this.adoptedFrom.setFieldsValue({ adisCondition })
      this.$refs.base.radiovalue = adisCondition
      this.$refs.base.radiovalue1 = adisCondition

      if (this.childType == '6') {
        this.adoptOrSanju = true
      }
      this.clearDataAndErroInfo('adoptedFrom', ['pickingUpLand', 'pickingDate', 'ifIsolatedCare', 'physicalExaminationDay'])
      this.clearDataAndErroInfo('cptAdoptorFrom', ['startTime', 'receiver', 'payment', 'receiverRelation', 'openBank', 'bankNumber'])
      this.clearDataAndErroInfo('physicalPxaminationForm', ['physicalDate', 'physicalOrg', 'physicalSummed', 'file'])
      // 切换儿童类别时，清空附件错误提示
      const relevant = this.childRelevantForm.getFieldsValue()
      const _self = this
      for (const k in relevant) {
        _self.childRelevantForm.setFields({
          [k]: {
            errors: null
          }
        })
      }
      // 重置儿童基本信息附件的key 防止共用时出现问题
      this.timer1 = new Date().getTime()
      this.$nextTick(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'threeout')
        this.setHeight('three', 'threeout')
      })
    },
    // 家庭成员数据获取
    getTableDatas (val) {
      this.guardian = false
      const _self = this
      _self.familyMemberInfoFrom = val
      _self.familyMemberInfoFrom.forEach(item => {
        if (item.ifGuardian == '1') {
          this.guardian = true
        }
      })
    },
    // 无户口时，清空户籍性质及户籍所在地数据
    clearDatas () {
      this.adoptedFrom.setFieldsValue({
        idCard: null,
        censusRegister: null,
        censusRegisterDatas: [],
        censusRegisterDetail: null
      })
    },
    // 患病类型为无疾病时，清空是否重病数据
    clearIfSeriously () {
      this.adoptedFrom.setFieldsValue({
        ifSeriously: null
      })
    },
    // 清空数据与错误提示
    clearDataAndErroInfo (formName, filedNames) {
      for (let i = 0; i < filedNames.length; i++) {
        this[formName].setFields({
          [filedNames[i]]: {
            value: null,
            errors: null
          }
        })
      }
    },

    // 生活费信息-与儿童关系设置验证提示
    setErrorMessage (newval) {
      let errmsg = null
      if (newval && newval.length > 20) {
        errmsg = '最大输入20个字符'
      } else if (!newval) {
        errmsg = '请输入其他关系'
      }
      this.cptAdoptorFrom.setFields({
        receiverRelation: errmsg ? {
          errors: [{ message: errmsg }]
        } : null
      })
      return errmsg
    },
    // 回显时 时间字段处理
    momentValue (val) {
      return val ? moment(val) : null
    },
    // 身份证号存在重复，带出数据回显
    setValueByIdCard (val) {
      if (val) { // 需要进行回显
        this.childBaseId = val.id
        val.registerDate = val.registerDate ? moment(val.registerDate) : moment().locale('zh-cn')
        val.pickingDate = this.momentValue(val.pickingDate)
        val.principalDate = this.momentValue(val.principalDate)
        val.infectionTime = this.momentValue(val.infectionTime)
        val.birthday = this.momentValue(val.birthday)
        val.disabilityType = val.disabilityType ? val.disabilityType.split(',') : []
        // 将其他途径、患艾滋病情况的其他数据传到页面
        this.$refs.base.setOtherDatas(val.transmissionWayOther, val.adisConditionOther)

        // 获取儿童情况、患病类型、特教类型、其他救助字典数据
        this.typeDataProcess('CHILDSITUATION', val.childSituation, val.childSituationOther, 'childSituation')
        this.typeDataProcess('ILLNESSTYPE', val.illnessType, val.illnessTypeOther, 'illnessType')
        this.typeDataProcess('SPECIALEDUCATIONTYPE', val.specialEducationType, val.specialEducationTypeOther, 'specialEducationType')

        this.$nextTick(() => {
          this.adoptedFrom.setFieldsValue(val)
          this.setAgeByBirth(moment(val.birthday).format('YYYY-MM-DD'))
        })

        // 户籍所在地处理
        this.addressmodel = [
          val.censusRegisterPro || '',
          val.censusRegisterCity || '',
          val.censusRegisterCounty || '',
          val.censusRegisterTown || ''

        ]
        // 现住址处理
        this.addressmodelNow = [
          val.currentAddressPro || '',
          val.currentAddressCity || '',
          val.currentAddressCounty || '',
          val.currentAddressTown || ''
        ]
      } else { // 不能进行回显（报错：已暂存。。）则清除身份证号信息
        this.getChildNum()
        this.adoptedFrom.setFieldsValue({
          idCard: null
        })
      }
    },
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      if (moment(this.adoptedFrom.getFieldsValue().birthday).format('YYYY-MM-DD') != birth) {
        this.adoptedFrom.setFieldsValue({
          sex: sex,
          birthday: moment(birth)
        })
        this.setAgeByBirth(birth)
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-09 17:31:23
     * @information: 赋值末领日期初始值（选择【养育类型】为非收养时，才会赋值末领年月）
     */
    assignEndTime () {
      this.$nextTick(() => {
        // 收养类型 身份证号
        const { rearingType, birthday } = this.adoptedFrom.getFieldsValue()
        this.birthDate = birthday
        this.cptAdoptorFrom.setFieldsValue({ endTime: rearingType && rearingType == '14' ? undefined : moment(this.birthDate, 'YYYY-MM').add({ years: 18 }) })
      })
    },
    // 根据出生日期设置年龄
    setAgeByBirth (e) {
      const idCardNum = this.adoptedFrom.getFieldsValue().idCard
      if (e) {
        this.assignEndTime()
        this.post('/orphansDisabledChildrenApi/getAgeByBirthday', { birthday: e }).then((res) => {
          if (res.serviceSuccess) {
            this.adoptedFrom.setFieldsValue({
              age: res.data.data
            })
          }
        })
      } else {
        this.adoptedFrom.setFieldsValue({
          age: null
        })
      }
    },
    // 暂存（0）和提交（1）
    submit (val, type) {
      let isok = true
      const _self = this
      let nowkey = '1'
      _self.$refs.base.errMsg = _self.adoptedFrom.getFieldError('idCard')

      _self.$refs.base.isNotSubmit = false // 暂存时不走身份证号重复验证
      // 附件的必填校验
      _self.childRelevantForm.setFieldsValue({
        copyFileList: _self.$refs.baseFile.copyFileList.length == 0 && val == '1' && _self.hasRegistered && _self.operateFlag != 'edit_change' ? undefined : 1
      })
      if (_self.childType == _self.Enum.CHILDCATEGORYA.SHSJET) {
        _self.childRelevantForm.setFieldsValue({
          parentsProveFileList: _self.$refs.baseFile.parentsProveFileList.length == 0 && val == '1' && _self.operateFlag != 'edit_change' ? undefined : 1
        })
      }
      if (_self.childType == _self.Enum.CHILDCATEGORYA.AZBBDGRET || _self.childType == _self.Enum.CHILDCATEGORYA.SHSJET) {
        _self.childRelevantForm.setFieldsValue({
          jhrFileList: _self.$refs.baseFile.jhrFileList == 0 && val == '1' && _self.operateFlag != 'edit_change' ? undefined : 1
        })
      }
      if (_self.childType == _self.Enum.CHILDCATEGORYA.FLJGYYGQET || _self.childType == _self.Enum.CHILDCATEGORYA.MBJGYYGQET) {
        _self.childRelevantForm.setFieldsValue({
          gaFileList: _self.$refs.baseFile.gaFileList.length == 0 && val == '1' && _self.operateFlag != 'edit_change' ? undefined : 1
        })
      }

      // 申请人信息
      _self.applicantForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.applicantForm.getFieldsValue()[k] || this.applicantForm.getFieldsValue()[k].length == 0) {
                this.applicantForm.resetFields(k)
              } else {
                nowkey = '5'
                isok = false
                this.setHeight('perone', 'peroneout')
              }
            }
          } else {
            nowkey = '5'
            isok = false
            this.setHeight('perone', 'peroneout')
          }
        }
      })
      // 经办人信息
      this.agentForm.validateFields({ force: true }, (err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.agentForm.getFieldsValue()[k] || this.agentForm.getFieldsValue()[k].length == 0) {
                this.agentForm.resetFields(k)
              } else {
                nowkey = '5'
                isok = false
                this.setHeight('pertwo', 'pertwoout')
              }
            }
          } else {
            nowkey = '5'
            isok = false
            this.setHeight('pertwo', 'pertwoout')
          }
        }
      })
      // 体检信息需要判断是否存在
      if (_self.$refs.physic.fileList && _self.$refs.physic.fileList.length > 0 || _self.adoptOrSanju) {
        _self.physicalPxaminationForm.setFieldsValue({
          file: '1'
        })
      } else {
        _self.physicalPxaminationForm.setFieldsValue({
          file: undefined
        })
      }
      _self.physicalPxaminationForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.physicalPxaminationForm.getFieldsValue()[k] || this.physicalPxaminationForm.getFieldsValue()[k].length == 0) {
                this.physicalPxaminationForm.resetFields(k)
              } else {
                nowkey = '4'
                isok = false
                this.setHeight('pm_one', 'pm_oneout')
              }
            }
          } else {
            nowkey = '4'
            isok = false
            this.setHeight('pm_one', 'pm_oneout')
          }
        }
      })
      // 相关证明信息-儿童
      _self.childRelevantForm.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.childRelevantForm.getFieldsValue()[k] || this.childRelevantForm.getFieldsValue()[k].length == 0) {
                this.childRelevantForm.resetFields(k)
              } else {
                isok = false
                nowkey = '1'
                this.setHeight('three', 'threeout')
              }
            }
          } else {
            isok = false
            nowkey = '1'
            this.setHeight('three', 'threeout')
          }
        }
      })
      // 生活费信息
      // 与儿童关系-其他 验证
      const receiverRelation = _self.$refs.live.valueSelect
      const receiverRelationOther = _self.$refs.live.valueInput
      if (receiverRelation == _self.Enum.RECEIVERRELATION.QT && (val == 1 && _self.cptAdoptorFrom.getFieldError('receiverRelation') || !receiverRelationOther)) { // 提交
        const errmsg = _self.setErrorMessage(receiverRelationOther)
        if (val == 1 || errmsg) {
          this.nowkey = '1'
          this.setHeight('one', 'oneout')
          this.setHeight('two', 'twoout')
          this.setHeight('three', 'threeout')
          this.setHeight('four', 'fourout')
          _self.$message.error('校验不通过，无法提交，请再次检查!')
          return false
        }
      }

      // 与儿童关系验证处理
      _self.cptAdoptorFrom.setFieldsValue({ receiverRelation })

      _self.cptAdoptorFrom.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.cptAdoptorFrom.getFieldsValue()[k] || this.cptAdoptorFrom.getFieldsValue()[k].length == 0) {
                this.cptAdoptorFrom.resetFields(k)
              } else {
                isok = false
                nowkey = '1'
                this.setHeight('one', 'oneout')
                this.setHeight('two', 'twoout')
                this.setHeight('three', 'threeout')
                this.setHeight('four', 'fourout')
              }
            }
          } else {
            isok = false
            nowkey = '1'
            this.setHeight('one', 'oneout')
            this.setHeight('two', 'twoout')
            this.setHeight('three', 'threeout')
            this.setHeight('four', 'fourout')
          }
        }
      })

      // 寻亲信息需要判断是否存在
      if (_self.childSituationAttr.filter(v => _self.childSituation.includes(v)) != '') {
        _self.searchRelativesFrom.validateFields((err, values) => {
          if (err) {
            if (val == 0) {
              for (const k in err) {
                if (!this.searchRelativesFrom.getFieldsValue()[k] || this.searchRelativesFrom.getFieldsValue()[k].length == 0) {
                  this.searchRelativesFrom.resetFields(k)
                } else {
                  isok = false
                  nowkey = '1'
                  this.setHeight('one', 'oneout')
                  this.setHeight('two', 'twoout')
                  this.setHeight('three', 'threeout')
                  this.setHeight('four', 'fourout')
                }
              }
            } else {
              isok = false
              nowkey = '1'
              this.setHeight('one', 'oneout')
              this.setHeight('two', 'twoout')
              this.setHeight('three', 'threeout')
              this.setHeight('four', 'fourout')
            }
          }
        })
      }
      // 身份证号必填时的验证
      if (!_self.adoptedFrom.getFieldsValue().idCard && _self.$refs.base.idCardRequire) {
        _self.adoptedFrom.setFields({
          idCard: {
            value: null,
            errors: '请输入身份证号'
          }
        })
      }
      if (_self.adoptedFrom.getFieldsValue().idCard && type == 'add') {
        const idCardNum = _self.adoptedFrom.getFieldsValue().idCard
        const childAge = this.isAgeOver(idCardNum)
        if (this.$refs.base.idCardWhitList.indexOf(idCardNum) == -1) {
          if (!this.isOverAge && childAge >= 18) {
            this.$message.error('该儿童已满18周岁，不能进行基本生活费申请')
            this.adoptedFrom.setFieldsValue({ idCard: null })
            return false
          }
          if (this.isOverAge && childAge < 18) { // 超龄补录的孩子必须大于18岁
            this.$message.error('该儿童未满18周岁，不能进行超龄补录申请')
            this.adoptedFrom.setFieldsValue({ idCard: null })
            return false
          }
        }
      }
      _self.adoptedFrom.validateFields((err, values) => {
        // 处理提交时验证身份证号带出出生日期导致验证出错的问题
        if (err && err.birthday && values.birthday) {
          delete err.birthday
          if (Object.keys(err).length == 0) {
            err = null
          }
        }
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (k != 'name' && (!this.adoptedFrom.getFieldsValue()[k] || this.adoptedFrom.getFieldsValue()[k].length == 0)) {
                this.adoptedFrom.resetFields(k)
              } else {
                isok = false
                nowkey = '1'
                this.setHeight('one', 'oneout')
                this.setHeight('two', 'twoout')
                this.setHeight('three', 'threeout')
                this.setHeight('four', 'fourout')
              }
            }
          } else {
            isok = false
            nowkey = '1'
            this.setHeight('one', 'oneout')
            this.setHeight('two', 'twoout')
            this.setHeight('three', 'threeout')
            this.setHeight('four', 'fourout')
          }
        }
      })
      // 儿童类型、补录原因验证
      if (this.isOverAge) {
        const buluReason = this.form.getFieldsValue().buluReason.trim()
        if (!buluReason) {
          this.form.setFieldsValue({ buluReason })
        }
      }

      _self.form.validateFields((err, values) => {
        if (err) {
          if (val == 0) {
            for (const k in err) {
              if (!this.form.getFieldsValue()[k] || this.form.getFieldsValue()[k].length == 0) {
                this.form.resetFields(k)
              } else {
                isok = false
                nowkey = '1'
              }
            }
          } else {
            isok = false
            nowkey = '1'
          }
        }
      })
      // 儿童类型为散居孤儿且点击提交时，家庭成员必填一个监护人信息
      const { childType } = _self.form.getFieldsValue()
      if ((childType == _self.Enum.CHILDCATEGORYA.SHSJET) && (val == '1')) {
        if (_self.operateFlag == 'add') { // 新增
          if (_self.familyMemberInfoFrom.length < 2) {
            _self.$message.error('请填写家庭成员-监护人信息！')
            _self.callback('2')
            return
          }
        } else { // 编辑
          if (_self.famMemObj.length == 1 || _self.familyMemberInfoFrom.length == 1) {
            _self.$message.error('请填写家庭成员-监护人信息！')
            _self.callback('2')
            return
          }
        }
      }

      setTimeout(() => {
        _self.$refs.base.isNotSubmit = true
        if (isok) {
          let saveOrUpdateUrl = '/orphansDisabledChildrenApi/saveOrphansDisabledChildren'
          if (val == 0) { // 暂存
            saveOrUpdateUrl = '/orphansDisabledChildrenApi/stagingOrphansDisabledChildren'
          }
          if (this.isOtherAdd == '12') {
            saveOrUpdateUrl = '/orphansDisabledChildrenApi/saveOrphanAnotherPlaceApply'
          }
          if (this.isOverAge) { // 超龄补录
            saveOrUpdateUrl = 'overAgeTipApi/saveOrphansDisabledChildrenForBulu'
          }
          if (_self.operateFlag == 'edit_zd') { // 在档
            saveOrUpdateUrl = '/orphansDisabledChildrenApi/updateChildBaseInfoSaveOther'
          }
          if (_self.operateFlag == 'edit_bh' || _self.operateFlag == 'edit_zy') { // 驳回(重新申请)、待提交
            saveOrUpdateUrl = '/addChildApi/updateChildInfo'
            if (this.isOtherAdd == '12' && this.isOtherEdit == '12') {
              saveOrUpdateUrl = 'orphansDisabledChildrenApi/updateOrphanAnotherPlaceApply'
            }
            if (this.isOverAge) { // 超龄补录
              saveOrUpdateUrl = 'overAgeTipApi/updateOrphansDisabledChildrenForBulu'
            }
          }
          if (_self.operateFlag == 'edit_change') { // 变更
            saveOrUpdateUrl = '/childInfoApi/updateOrphansDisabledChildrenById'
          }
          if (_self.operateFlag == 'edit_wsh') { // 未审核的编辑
            saveOrUpdateUrl = 'orphansDisabledChildrenApi/updateOrphanAnotherPlaceApplyForAudit'
          }
          const adoptedFromValue = _self.adoptedFrom.getFieldsValue()
          const cptAdoptorFromValue = _self.cptAdoptorFrom.getFieldsValue()
          // 添加生活费信息中的与儿童关系下拉框的值与其他  输入框的值
          cptAdoptorFromValue.receiverRelation = _self.$refs.live.valueSelect
          // 若选择了其他
          if (_self.$refs.live.valueSelect == _self.Enum.RECEIVERRELATION.QT) {
            cptAdoptorFromValue.receiverRelationOther = _self.$refs.live.valueInput
          }
          // if (!cptAdoptorFromValue.endTime) {
          //   cptAdoptorFromValue.endTime = moment(adoptedFromValue.birthday, 'YYYY-MM').add({ years: 18 })
          // }
          // 体检信息的数据
          const physicalPxaminationFormValue = _self.physicalPxaminationForm.getFieldsValue()

          let searchRelativesFromValue = null
          if (_self.childSituationAttr.filter(v => _self.childSituation.includes(v)) != '') {
            searchRelativesFromValue = _self.searchRelativesFrom.getFieldsValue()
          }
          const adoptedFamFromValue = _self.adoptedFamFrom.getFieldsValue()
          // 填写完儿童基本信息tab页直接点击提交时将儿童信息存入家庭成员
          _self.autoSet()

          const { familyMemberInfoFrom } = _self
          for (var i = 0; i < familyMemberInfoFrom.length; i++) {
            familyMemberInfoFrom[i].familyId = _self.famObj.id
            familyMemberInfoFrom[i].memberIdType = '01'
            if (familyMemberInfoFrom[i].disabilityType instanceof Array && familyMemberInfoFrom[i].disabilityType.length > 0) {
              familyMemberInfoFrom[i].disabilityType = familyMemberInfoFrom[i].disabilityType.join(',')
            } else if (typeof familyMemberInfoFrom[i].disabilityType != 'string') {
              familyMemberInfoFrom[i].disabilityType = ''
            }
          }

          adoptedFromValue.childType = _self.form.getFieldsValue().childType == '其他' ? _self.Enum.CHILDCATEGORYA.QT : _self.form.getFieldsValue().childType// 添加儿童类别
          adoptedFromValue.buluReason = _self.form.getFieldsValue().buluReason
          if (adoptedFromValue.adisCondition == _self.Enum.ADISCONDITION.QT) {
            adoptedFromValue.adisConditionOther = _self.$refs.base.$refs.adisConditionOther.stateValue // 添加其他情况
          }
          if (adoptedFromValue.transmissionWay == _self.Enum.TRANSMISSIONWAYOTHER.QT) {
            adoptedFromValue.transmissionWayOther = _self.$refs.base.$refs.transmissionWayOther.stateValue // 添加其他途径
          }

          // 处理儿童基本信息的其他字段（儿童情况、患病类型、特教类型、其他救助）
          // 儿童情况
          if (_self.choselist.childSituation == _self.Enum.CHILDSITUATION.QT) {
            adoptedFromValue.childSituationOther = _self.choselist.childSituationOther
          }
          adoptedFromValue.childSituation = _self.choselist.childSituation

          // 患病类型
          if (_self.choselist.illnessType == _self.Enum.ILLNESSTYPE.QT) {
            adoptedFromValue.illnessTypeOther = _self.choselist.illnessTypeOther
          }
          adoptedFromValue.illnessType = _self.choselist.illnessType
          // 特教类型
          if (_self.choselist.specialEducationType == _self.Enum.SPECIALEDUCATIONTYPE.QT) {
            adoptedFromValue.specialEducationTypeOther = _self.choselist.specialEducationTypeOther
          }
          adoptedFromValue.specialEducationType = _self.choselist.specialEducationType
          // 其他救助
          if (_self.choselist.otherRescue == _self.Enum.OTHERRESCUE.QT) {
            adoptedFromValue.otherRescueOther = _self.choselist.otherRescueOther
          }
          adoptedFromValue.otherRescue = _self.choselist.otherRescue
          // 残疾类别处理
          if (adoptedFromValue.disabilityType && adoptedFromValue.disabilityType.length > 0) {
            adoptedFromValue.disabilityType = adoptedFromValue.disabilityType.join(',')
          } else {
            adoptedFromValue.disabilityType = ''
          }
          // 附件
          if (_self.childType != _self.Enum.CHILDCATEGORYA.SHSJET) {
            _self.$refs.baseFile.parentsProveFileList = []
          }
          if (_self.childType != _self.Enum.CHILDCATEGORYA.AZBBDGRET && _self.childType != _self.Enum.CHILDCATEGORYA.SHSJET) {
            _self.$refs.baseFile.jhrFileList = []
          }
          if (_self.childType != _self.Enum.CHILDCATEGORYA.FLJGYYGQET && _self.childType != _self.Enum.CHILDCATEGORYA.MBJGYYGQET) {
            _self.$refs.baseFile.gaFileList = []
          }
          const fileList = [
            ..._self.$refs.base.fileList,
            ..._self.$refs.baseFile.copyFileList,
            ..._self.$refs.baseFile.parentsProveFileList,
            ..._self.$refs.baseFile.otherFileList,
            ..._self.$refs.baseFile.stayFileList,
            ..._self.$refs.baseFile.jhrFileList,
            ..._self.$refs.baseFile.gaFileList,
            ..._self.$refs.famFile.retentionFileList,
            ..._self.$refs.famFile.oldPeopleFileList,
            ..._self.$refs.physic.fileList,
            ..._self.$refs.mul.imgFileList,
            ..._self.$refs.mul.videoFileList
          ]
          const upLoadPathIds = []
          for (let i = 0; i < fileList.length; i++) {
            upLoadPathIds.push(fileList[i].response.data.data.fileid)
          }
          adoptedFromValue.upLoadPathIds = upLoadPathIds

          // 编辑查看时的id赋值
          if (_self.operateFlag != 'add') {
            // 儿童基本信息id
            adoptedFromValue.ids = _self.enterObj ? _self.enterObj.id : null // 入院id
            adoptedFromValue.id = _self.baseObj ? _self.baseObj.id : null // 基本信息id
            physicalPxaminationFormValue.id = _self.physicObj ? _self.physicObj.id : null // 入院体检id
            if (searchRelativesFromValue) {
              searchRelativesFromValue.id = _self.relateObj ? _self.relateObj.id : null // 寻亲信息id
            }
            adoptedFamFromValue.id = _self.famObj ? _self.famObj.id : null // 家庭信息id
            if (_self.liveObj) {
              cptAdoptorFromValue.id = _self.liveObj ? _self.liveObj.id : null // 生活费id
            }
            adoptedFromValue.isBulu = _self.isOverAge ? 1 : 0 // 超龄补录
          }

          // 身份证号已存在，带出的儿童基本信息id
          if (this.childBaseId) {
            adoptedFromValue.id = this.childBaseId
          }
          if (!adoptedFromValue.disabilityLevel) {
            adoptedFromValue.disabilityLevel = ''
          }
          // 申请人/经办人信息
          const childAnotherPlaceApplyPersonVo = Object.assign({}, this.applicantForm.getFieldsValue(), this.agentForm.getFieldsValue())
          if (this.operateFlag != 'add') {
            childAnotherPlaceApplyPersonVo.businessId = this.businessId
            childAnotherPlaceApplyPersonVo.id = this.$refs.applicant.id
          }

          // 申请人户籍所在地处理
          const { censusRegister } = childAnotherPlaceApplyPersonVo
          if (censusRegister && censusRegister.length > 0) {
            childAnotherPlaceApplyPersonVo.censusRegisterPro = censusRegister[0]
            childAnotherPlaceApplyPersonVo.censusRegisterCity = censusRegister[1]
            childAnotherPlaceApplyPersonVo.censusRegisterCounty = censusRegister[2]
            childAnotherPlaceApplyPersonVo.censusRegisterTown = censusRegister[3]
            delete childAnotherPlaceApplyPersonVo.censusRegister
          }

          // 申请人现住址处理
          const { currentAddress } = childAnotherPlaceApplyPersonVo
          if (currentAddress && currentAddress.length > 0) {
            childAnotherPlaceApplyPersonVo.currentAddressPro = currentAddress[0]
            childAnotherPlaceApplyPersonVo.currentAddressCity = currentAddress[1]
            childAnotherPlaceApplyPersonVo.currentAddressCounty = currentAddress[2]
            childAnotherPlaceApplyPersonVo.currentAddressTown = currentAddress[3]
            delete childAnotherPlaceApplyPersonVo.currentAddress
          }

          // 传参数据格式化处理
          const record = _self.dataProcess(
            val,
            adoptedFromValue,
            physicalPxaminationFormValue,
            cptAdoptorFromValue,
            searchRelativesFromValue,
            adoptedFamFromValue,
            familyMemberInfoFrom,
            childAnotherPlaceApplyPersonVo
          )
          if (this.orgData.anotherPlaceAreaId) {
            record.childBaseEnterWelfareInstitutionVo.anotherPlaceAreaId = this.orgData.anotherPlaceAreaId
          }
          if (this.orgData.anotherPlaceAreaName) {
            record.childBaseEnterWelfareInstitutionVo.anotherPlaceAreaName = this.orgData.anotherPlaceAreaName
          }
          if (this.isAnotherPlaceApply) {
            record.childBaseEnterWelfareInstitutionVo.isAnotherPlaceApply = this.isAnotherPlaceApply
          }
          if (cptAdoptorFromValue.endTime) {
            record.livingCostVo.endTime = cptAdoptorFromValue.endTime.format('YYYY-MM')
          }
          _self.post(saveOrUpdateUrl, record, true).then(res => {
            if (res.serviceSuccess) {
              // 提交成功后重置数据
              if (_self.childSituationAttr.filter(v => _self.childSituation.includes(v)) != '') {
                _self.searchRelativesFrom.resetFields() // 寻亲信息
              }
              _self.adoptedFamFrom.resetFields() // 家庭基本信息信息
              _self.$refs.fam_two.tableDatas = [] // 家庭成员信息
              _self.cptAdoptorFrom.resetFields() // 生活费信息
              _self.adoptedFrom.resetFields() // 基本信息
              _self.physicalPxaminationForm.resetFields() // 体检信息

              _self.$refs.base.resetFileDatas()
              _self.$refs.physic.resetFileDatas()

              // 重置头像数据
              _self.$refs.base.imageUrl = 'static/img/defalimg.png'
              _self.$refs.base.delVisible = false

              _self.$message.success('信息提交成功!')
              // _self.success('1', '新增', '信息提交成功!', '确定', _self)
              // 信息提交成功后跳转的页面
              if (_self.routeName == '' || !_self.routeName) {
                _self.$router.go(-1)
              } else { // 指定跳转页面
                _self.$router.push({
                  name: _self.routeName,
                  query: _self.routeObjs
                })
              }
            }
          })
        } else {
          _self.nowkey = nowkey
          _self.$message.error('校验不通过，无法提交，请再次检查!')
          this.changeMunotResetHeight()
        }
      }, 300)
    },
    isAgeOver (value) {
      const iden = value
      const myDate = new Date()
      const month = myDate.getMonth() + 1
      const day = myDate.getDate()
      const len = value.length
      let age = 0
      if (len === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1
        if (
          iden.substring(10, 12) < month ||
          (iden.substring(10, 12) == month && iden.substring(12, 14) < day)
        ) {
          age++
        }
      }
      if (len === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901
        if (
          iden.substring(8, 10) < month ||
          (iden.substring(8, 10) == month && iden.substring(10, 12) < day)
        ) {
          age++
        }
      }
      return age
    },
    // 新增、编辑、查看前的数据处理
    async addOrUpdate () {
      const _self = this
      // 加载页面时重置数据
      _self.hasRegistered = true
      _self.orgData = {}
      _self.isLocal = false
      _self.isFromSearch = false
      _self.formDataSearch = {}
      _self.mechanismList = []
      _self.birthable = false
      _self.isOnlyShow = false
      _self.spinning = false
      _self.birthDate = null
      _self.isOtherAdd = ''
      _self.isOtherEdit = ''
      _self.clickSourceType = ''
      _self.isAnotherPlaceApply = '1'
      _self.nowkey = '1'
      _self.adopt = false
      _self.adoptOrSanju = false
      _self.childBaseId = null
      _self.disabled = false
      _self.$refs.base.idCardDisabled = false // 身份证号
      _self.$refs.base.birthDisabled = true // 身份证号
      _self.changedisabled = false
      _self.guardian = false
      _self.hideRequiredMark = false
      _self.form.resetFields()
      _self.adoptedFrom.resetFields()
      _self.physicalPxaminationForm.resetFields()
      _self.cptAdoptorFrom.resetFields()
      _self.childRelevantForm.resetFields()
      _self.addressmodel = []
      _self.addressmodelNow = []
      _self.addressmodelPm = []
      // 申请人信息初始化
      _self.showperone = true
      _self.showpertwo = true
      _self.applicantForm.resetFields()
      // 经办人初始化值
      _self.agentForm.resetFields()
      _self.agentForm.setFieldsValue({
        agentPersonName: _self.userInfo.userName,
        orgName: _self.userInfo.orgName
      })
      // 加载页面时重置数据
      if (_self.searchRelativesFrom && _self.searchRelativesFrom != undefined) {
        _self.searchRelativesFrom.resetFields()
      }
      _self.adoptedFamFrom.resetFields()
      _self.choselist = {} // 重置多选抽屉的数据（新增时）

      this.familyMemberInfoFrom = []
      this.$refs.fam_two.tableDatas = []
      this.$refs.base.id = null
      this.$refs.base.resetFileDatas()
      this.$refs.physic.resetFileDatas()
      this.$refs.baseFile.resetFileDatas()
      this.$refs.baseFile.resetFileDatas()
      this.$refs.famFile.resetFileDatas()
      this.$refs.mul.resetFileDatas()

      // 重置身份证号必填
      _self.$refs.base.idCardRequire = true
      // 重置开户行、银行账号必填
      _self.$refs.live.bankRequire = true
      // 数据处理
      _self.choselist = {}
      _self.operateFlag = _self.$route.query.operateFlag
      _self.isOtherAdd = _self.$route.query.isOtherAdd
      _self.isOtherEdit = _self.$route.query.isOtherEdit
      _self.clickSourceType = _self.$route.query.clickSourceType
      _self.childType = _self.$route.query.childType
      _self.isOverAge = _self.$route.query.isOverAge
      // 是否是从查询跳转
      if (this.$route.query.isFromSearch) {
        this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
        this.isFromSearch = this.$route.query.isFromSearch
      }

      _self.routeName = _self.$route.query.routeName
      _self.routeObjs = _self.$route.query.routeObjs

      // 获取儿童类别字典
      const orgType = _self.userInfo.orgType
      if (orgType == '99') { // 福利院用户
        _self.iswelfare = true
        // 儿童类别为“福利机构养育孤弃儿童”的养育类型字典
        if (_self.childType == _self.Enum.CHILDCATEGORYA.FLJGYYGQET) {
          _self.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEWO') // 获取养育类型字典数据
        } else if (_self.childType == _self.Enum.CHILDCATEGORYA.FLJGGYKJET) { // 儿童类别为“福利机构供养困境儿童”的养育类型字典
          _self.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEWD') // 获取养育类型字典数据
        } else { // 其他的显示全部
          _self.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPE') // 获取养育类型字典数据
        }
      }
      if (orgType != '98' && orgType != '99') { // 民政局用户
        _self.iswelfare = false
        // 民政局用户的养育类型字典
        _self.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEORG') // 获取养育类型字典数据
      }
      _self.post('codetable/getCode', { codeType: this.childTypeCode }, false, true).then(res => {
        if (res.serviceSuccess) {
          _self.childrenType = res.data.codeList
          // 去除其他和福利机构供养困境儿童字典
          const index = _self.childrenType.findIndex(item => item.value == _self.Enum.CHILDCATEGORYA.QT)
          if (index != -1) {
            _self.childrenType.splice(index, 1)
            _self.childrenType.push(this.walfareType)
          }
        }
      })

      // 新增
      if (_self.operateFlag == 'add') {
        // 是否展示儿童基本信息中的条件模块（确认艾滋病感染时间、其他情况、其他途径等）
        _self.$refs.base.ifDatasProcess(null, 'add')
        // 儿童类别赋值

        this.$nextTick(() => {
          _self.form.setFieldsValue({ childType: _self.childType == _self.Enum.CHILDCATEGORYA.QT ? '其他' : _self.childType })
          if (_self.childType == this.Enum.CHILDCATEGORYA.SHSJET) { // 区县的散居孤儿
            this.adoptOrSanju = true
          } else {
            this.adoptOrSanju = false
          }
        })

        _self.getChildNum()
      }
      // 其他页面跳转到此页面时的加载
      if (_self.operateFlag != 'add') {
        if (_self.operateFlag.indexOf('look') != -1) { // 详情时
          _self.$refs.base.idCardDisabled = true // 身份证号
          _self.$refs.base.birthDisabled = true // 身份证号

          _self.disabled = true
          _self.changedisabled = true
          _self.$refs.base.delVisible = false
          _self.hideRequiredMark = true
        } else { // 修改时
          _self.hideRequiredMark = false
          _self.$refs.base.idCardDisabled = false // 身份证号
          _self.$refs.base.birthDisabled = true // 身份证号
        }
        if (_self.operateFlag == 'edit_change') { // 变更页面跳转至此
          _self.changedisabled = true
          _self.$refs.base.idCardDisabled = true // 身份证号
          _self.$refs.base.birthDisabled = true // 身份证号
        }

        // 查看的接口（所有业务模块跳转）
        const url = _self.$route.query.url
        const params = JSON.parse(_self.$route.query.params)
        if (url) {
          _self.spinning = true
          const res = await _self.post(url, params, false, true)
          if (res) {
            _self.spinning = false
            if (res.serviceSuccess) {
              _self.orphansHandicappedList = res.data.data
            }
          }
        }
        if (_self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.childType == '1' && orgType != '99' && orgType != '98') {
          this.welfare = true
          this.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEWO')
        } else if (orgType == '99') {
          this.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEWO')
        } else {
          this.welfare = false
          this.$refs.base.rearingTypeList = await this.getDictionaries('REARINGTYPEORG')
        }
        if (Object.keys(_self.orphansHandicappedList).length != 0) {
          if (_self.operateFlag.indexOf('look') != -1) {
            // 查看显示全的儿童类别字典
            _self.post('codetable/getCode', { codeType: 'CHILDCATEGORYA' }).then(res => {
              if (res.serviceSuccess) {
                _self.childrenType = res.data.codeList
              }
            })
          }

          if (_self.operateFlag == 'look_now' || _self.operateFlag == 'edit_wsh' || _self.operateFlag == 'edit_bh' || _self.operateFlag == 'edit_zy' || _self.operateFlag == 'edit_change') { // 实时查看和驳回编辑和变更
            this.orgData = {
              anotherPlaceAreaId: _self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.anotherPlaceAreaId,
              anotherPlaceAreaName: _self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.anotherPlaceAreaName
            }
            if (_self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.anotherPlaceAreaId) {
              if (_self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.anotherPlaceAreaId == _self.userInfo.orgId) {
                this.isOnlyShow = true
              }
            }
            this.isAnotherPlaceApply = _self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.isAnotherPlaceApply
            if (this.isAnotherPlaceApply == '1' || this.isAnotherPlaceApply == '2') {
              this.isOtherAdd = '12'
            }
            _self.$refs.base.ifDatasProcess(_self.orphansHandicappedList, 'look_now')
            _self.enterObj = _self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo// 入院的vo对象
            _self.physicObj = _self.orphansHandicappedList.childEnterPhysicalVo// 入院体检的vo对象
            _self.baseObj = _self.orphansHandicappedList.childBaseInformationVo// 基本信息的vo对象
            _self.relateObj = _self.orphansHandicappedList.childBaseRelativesVo// 寻亲的vo对象
            _self.liveObj = _self.orphansHandicappedList.livingCostVo // 生活费的vo对象
            _self.famObj = _self.orphansHandicappedList.familyInfoVo// 家庭的vo对象
            _self.famMemObj = _self.orphansHandicappedList.familyMemberInfoList // 家庭成员的vo对象
            // _self.liveObj.endTime = _self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo.endTime
            // 附件回显
            this.fileShow(_self.enterObj)
            setTimeout(() => {
              _self.setHeight('three', 'threeout')
            }, 1000)
          }
          if (_self.operateFlag == 'edit_zd' || _self.operateFlag == 'look_zd') { // 在档
            _self.$refs.base.ifDatasProcess(_self.orphansHandicappedList, 'look_zd')
            _self.enterObj = _self.orphansHandicappedList// 入院的vo对象
            _self.physicObj = _self.orphansHandicappedList// 入院体检的vo对象
            _self.baseObj = _self.orphansHandicappedList// 基本信息的vo对象
            _self.relateObj = _self.orphansHandicappedList// 寻亲的vo对象
            _self.liveObj = _self.orphansHandicappedList// 生活费的vo对象
            _self.famObj = {}// 家庭的vo对象
            _self.famMemObj = []// 家庭成员的vo对象
          }

          if (_self.operateFlag == 'edit_zy') { // 修改时
            _self.$refs.base.tag = 1
            // 判断逻辑
            _self.$refs.base.judgeDisabledOrEdit(_self.orphansHandicappedList)
          }

          // 是否显示寻亲信息
          if (_self.baseObj.childSituation != undefined && _self.baseObj.childSituation.length != 0) {
            _self.childSituation = _self.baseObj.childSituation.split(',')
          }
          _self.isLocal = _self.enterObj.reportUnit && _self.enterObj.reportUnit != _self.userInfo.orgName
          // 儿童类别赋值
          _self.$nextTick(() => {
            _self.topForm.setFieldsValue(_self.enterObj)
            _self.form.setFieldsValue({
              childType: _self.enterObj.childType == _self.Enum.CHILDCATEGORYA.QT ? '其他' : _self.enterObj.childType,
              buluReason: _self.enterObj.buluReason
            })
            _self.childType = _self.form.getFieldsValue().childType
            // 将编辑时刚进页面时的身份证号及操作标识传到页面
            _self.$refs.base.oldIdCard = _self.baseObj.idCard
            _self.$refs.base.id = _self.baseObj.id
            _self.$refs.base.operateFlag = _self.operateFlag
            // 儿童基本信息赋值
            if (_self.enterObj) {
              _self.enterObj.registerDate = _self.enterObj.registerDate
                ? moment(_self.enterObj.registerDate) : null
              _self.enterObj.principalDate = _self.enterObj.principalDate
                ? moment(_self.enterObj.principalDate) : null
              _self.enterObj.pickingDate = _self.enterObj.pickingDate
                ? moment(_self.enterObj.pickingDate) : null
              _self.$refs.base.healthval = _self.enterObj.health
            }
            if (_self.baseObj.birthday) {
              _self.birthDate = _self.baseObj.birthday
            }
            _self.baseObj.birthday = _self.baseObj.birthday
              ? moment(_self.baseObj.birthday) : null
            _self.baseObj.infectionTime = _self.baseObj.infectionTime
              ? moment(_self.baseObj.infectionTime) : null
            // 残疾类型转为数组
            if (_self.baseObj.disabilityType) {
              _self.baseObj.disabilityType = _self.baseObj.disabilityType.split(',')
            } else {
              _self.baseObj.disabilityType = []
            }
            if (_self.baseObj.idCard) {
              this.birthable = true
            }
            this.$nextTick(() => {
              _self.adoptedFrom.setFieldsValue(_self.enterObj)
              _self.adoptedFrom.setFieldsValue(_self.baseObj)
            })

            // 户籍所在地、现住址赋值
            if (_self.baseObj.censusRegisterPro != undefined) {
              _self.addressmodel = [
                _self.baseObj.censusRegisterPro ? _self.baseObj.censusRegisterPro : '',
                _self.baseObj.censusRegisterCity ? _self.baseObj.censusRegisterCity : '',
                _self.baseObj.censusRegisterCounty ? _self.baseObj.censusRegisterCounty : '',
                _self.baseObj.censusRegisterTown ? _self.baseObj.censusRegisterTown : ''
              ]
            }
            if (_self.baseObj.currentAddressPro != undefined) {
              _self.addressmodelNow = [
                _self.baseObj.currentAddressPro ? _self.baseObj.currentAddressPro : '',
                _self.baseObj.currentAddressCity ? _self.baseObj.currentAddressCity : '',
                _self.baseObj.currentAddressCounty ? _self.baseObj.currentAddressCounty : '',
                _self.baseObj.currentAddressTown ? _self.baseObj.currentAddressTown : ''
              ]
            }

            // 如果户口分类为有户口，则身份证号必填
            _self.hasRegistered = _self.baseObj.householdRegistryClassify != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
            _self.$refs.base.idCardRequire = _self.baseObj.householdRegistryClassify != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
            _self.$refs.base.localDisabled = _self.baseObj.householdRegistryClassify == this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK
            // 福利孤弃儿童且养育类型为收养的，生活费信息为非必填
            if (_self.childType == _self.Enum.CHILDCATEGORYA.FLJGYYGQET && _self.enterObj.rearingType == _self.Enum.REARINGTYPE.SY) {
              this.adopt = true
              this.adoptOrSanju = true
            } else {
              this.adopt = false
              this.adoptOrSanju = _self.childType == this.Enum.CHILDCATEGORYA.SHSJET // 区县的散居孤儿
            }
            if (_self.childType == this.Enum.CHILDCATEGORYA.AZBBDGRET) {
              this.adoptOrSanju = true
            }

            // 将其他途径、患艾滋病情况的其他数据传到页面
            _self.$refs.base.setOtherDatas(_self.baseObj.transmissionWayOther, _self.baseObj.adisConditionOther)

            // 获取儿童情况、患病类型、特教类型、其他救助字典数据
            _self.typeDataProcess('CHILDSITUATION', _self.baseObj.childSituation, _self.baseObj.childSituationOther, 'childSituation')
            _self.typeDataProcess('ILLNESSTYPE', _self.baseObj.illnessType, _self.baseObj.illnessTypeOther, 'illnessType')
            _self.typeDataProcess('SPECIALEDUCATIONTYPE', _self.baseObj.specialEducationType, _self.baseObj.specialEducationTypeOther, 'specialEducationType')
            if (_self.enterObj) {
              _self.typeDataProcess('OTHERRESCUE', _self.enterObj.otherRescue, _self.enterObj.otherReliefOther, 'otherRescue')
            }
          })

          // 若存在寻亲信息，赋值
          if (_self.relateObj) {
            _self.relateObj.findTime = _self.relateObj.findTime
              ? moment(_self.relateObj.findTime) : null
            if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
              _self.$nextTick(() => {
                _self.searchRelativesFrom.setFieldsValue(_self.relateObj)
              })
            }
          }
          // 若存在生活费信息，赋值
          if (_self.liveObj) {
            _self.liveObj.startTime = _self.liveObj.startTime
              ? moment(_self.liveObj.startTime) : null
            _self.liveObj.endTime = _self.liveObj.endTime
              ? moment(_self.liveObj.endTime) : null
            _self.cptAdoptorFrom.setFieldsValue(_self.liveObj)
            // 开户行、银行账号必填控制
            if (_self.liveObj.payment == _self.Enum.PAYMENT.XJLQ) {
              _self.$refs.live.bankRequire = false
            } else {
              _self.$refs.live.bankRequire = true
            }

            // 与儿童关系单独赋值
            _self.$refs.live.valueSelect = _self.liveObj.receiverRelation
            if (_self.liveObj.receiverRelation == _self.Enum.RECEIVERRELATION.QT) { // 其他
              _self.$nextTick(() => {
                _self.$refs.live.valueInput = _self.liveObj.receiverRelationOther
              })
            }
          }
          // 体检信息赋值
          if (_self.physicObj) {
            _self.physicObj.physicalDate = _self.physicObj.physicalDate ? moment(_self.physicObj.physicalDate) : null
            _self.$nextTick(() => {
              _self.physicalPxaminationForm.setFieldsValue(_self.physicObj)
            })

            _self.addressmodelPm = [
              _self.physicObj.physicalPro ? _self.physicObj.physicalPro : '',
              _self.physicObj.physicalCity ? _self.physicObj.physicalCity : '',
              _self.physicObj.physicalCounty ? _self.physicObj.physicalCounty : ''
            ]
          }

          // 家庭基本信息及成员信息赋值
          _self.adoptedFamFrom.setFieldsValue(_self.famObj)
          const memberDatas = _self.famMemObj
          for (var i = 0; i < memberDatas.length; i++) {
            if (memberDatas[i].ifGuardian == '1') {
              this.guardian = true
            }
            if (memberDatas[i].disabilityType) {
              memberDatas[i].disabilityType = memberDatas[i].disabilityType.split(',')
            } else {
              memberDatas[i].disabilityType = []
            }
          }
          // 将家庭成员数据传到页面 famId
          _self.$refs.fam_two.setMemberDatas(memberDatas, _self.operateFlag)
          _self.setHeight('one', 'oneout')
          _self.setHeight('two', 'twoout')

          // 申请人/经办人信息赋值
          const { childAnotherPlaceApplyPersonVo } = _self.orphansHandicappedList
          if (childAnotherPlaceApplyPersonVo) {
            this.$refs.applicant.relationshipValue = childAnotherPlaceApplyPersonVo.relationship
            this.$nextTick(() => {
              this.applicantForm.setFieldsValue(childAnotherPlaceApplyPersonVo)
              this.agentForm.setFieldsValue(childAnotherPlaceApplyPersonVo)
              // 处理历史数据问题 赋值办理人、办理机构
              const { agentPersonName, orgName } = childAnotherPlaceApplyPersonVo
              _self.agentForm.setFieldsValue({
                agentPersonName: agentPersonName || null,
                orgName: orgName || null
              })
            })
            this.$refs.applicant.id = childAnotherPlaceApplyPersonVo.id
            this.$refs.applicant.addressmodel1 = [
              childAnotherPlaceApplyPersonVo.censusRegisterPro || '',
              childAnotherPlaceApplyPersonVo.censusRegisterCity || '',
              childAnotherPlaceApplyPersonVo.censusRegisterCounty || '',
              childAnotherPlaceApplyPersonVo.censusRegisterTown || ''
            ]
            this.$refs.applicant.addressmodel2 = [
              childAnotherPlaceApplyPersonVo.currentAddressPro || '',
              childAnotherPlaceApplyPersonVo.currentAddressCity || '',
              childAnotherPlaceApplyPersonVo.currentAddressCounty || '',
              childAnotherPlaceApplyPersonVo.currentAddressTown || ''
            ]
            this.businessId = childAnotherPlaceApplyPersonVo.businessId
          }
        }
      }
      this.changeMunotResetHeight()
    },
    // 附件回显（编辑或查看时）
    fileShow (enterObj) {
      const _self = this
      if (enterObj && enterObj.fileList) {
        enterObj.fileList.forEach((item, index) => {
          switch (item.busiType) {
            case '50':
              _self.$refs.base.fileList.push(item)
              _self.$refs.base.headImgId = item.response.data.data.fileid
              if (_self.operateFlag.indexOf('look') == -1) {
                _self.$refs.base.delVisible = true
              }
              _self.$refs.base.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + item.response.data.data.fileid
              break
            case '5':
              _self.$refs.baseFile.copyFileList.push(item)
              break
            case '43':
              _self.$refs.baseFile.parentsProveFileList.push(item)
              break
            case '7': // 续留证明
              _self.$refs.baseFile.stayFileList.push(item)
              break
            case '53': // 基本信息附件-其它
            case '3':
            case '4':
            case '6':
              _self.$refs.baseFile.otherFileList.push(item)
              break
            case '44':
              _self.$refs.baseFile.jhrFileList.push(item)
              break
            case '54':
              _self.$refs.baseFile.gaFileList.push(item)
              break
            case '45':
              _self.$refs.famFile.retentionFileList.push(item)
              break
            case '46':
              _self.$refs.famFile.oldPeopleFileList.push(item)
              break
            case '49':
              _self.$refs.mul.imgFileList.push(item)
              break
            case '51':
              _self.$refs.mul.videoFileList.push(item)
              break
            case '52':
              _self.$refs.physic.fileList.push(item)
              break
            default:
          }
        })
      }
    },
    preview (file) { this.downloadFile(file) }
  },
  watch: {
    childType: {
      handler (newVal, oldVal) {
        // 儿童类别为社会散居儿童时隐藏体检信息tab
        $('#orphanForm .ant-tabs-nav >div >div:nth-child(3)')[newVal != this.Enum.CHILDCATEGORYA.SHSJET ? 'show' : 'hide']()// 其他
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    },
    nowkey (val) {
      if (val == 2) {
        // 切换到家庭时，将输入的儿童信息作为家庭成员进行赋值-新增
        this.autoSet()
        this.$nextTick(() => {
          this.setHeight('fam_one', 'fam_oneout')
          this.setHeight('fam_two', 'fam_twoout')
          this.setHeight('fam_three', 'fam_threeout')
        })
      }
    },
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    },
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    },
    fam_showone (val) {
      this.setHeight('fam_one', 'fam_oneout', !val)
    },
    fam_showtwo (val) {
      this.setHeight('fam_two', 'fam_twoout', !val)
    },
    fam_showthree (val) {
      this.setHeight('fam_three', 'fam_threeout', !val)
    },
    pm_showone (val) {
      this.setHeight('pm_one', 'pm_oneout', !val)
    },
    showperone (val) {
      this.setHeight('perone', 'peroneout', !val)
    },
    showpertwo (val) {
      this.setHeight('pertwo', 'pertwoout', !val)
    },
    typeadoption () {
      this.setHeight('two', 'twoout')
    }
  }
}
</script>

<style lang="less" scoped>
.warntext {
  width: 100%;
  height: 47px;
  margin-left: 20px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
  .icons {
    margin: 0 7px 0 24px;
  }
}
.contitem {
  height: 50px;
  transition: all 1s;
  overflow: hidden;
}

.contitemshow {
  transition: all 1s;
  overflow: hidden;
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.familyout {
  width: calc(100% - 28px);
}
.bom1 {
  width: calc(100% - 28px);
  height: 50px;
  background: white;
  position: fixed;
  bottom: 0;
  padding-right: 28px;
  text-align: right;
  border-top: 1px solid #eff1f4;
  z-index: 999;
}
</style>
