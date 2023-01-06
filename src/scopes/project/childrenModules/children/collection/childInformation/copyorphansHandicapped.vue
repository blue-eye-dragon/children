<template>
  <div class="tadrawer"
       @click='allvalidator'>
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback"
             :style="isChildFiles?'padding: unset':''"
             :type="isChildFiles?'card':'line'">
      <ta-tab-pane tab="儿童基本信息"
                   key="1"
                   :forceRender="true">
        <!-- <ta-anchor class="md"
                   :offsetTop="100"
                   @click.native="chans"
                   v-show="!isChildFiles">
          <ta-anchor-link href="#anchorpoint_a"
                          state="replace"
                          title="基本信息" />
          <ta-anchor-link href="#anchorpoint_d"
                          state="replace"
                          title="寻亲信息"
                          v-if="this.childSituationAttr.filter(v => this.childSituation.includes(v)) != ''" />
          <ta-anchor-link href="#anchorpoint_b"
                          state="replace"
                          title="生活费信息" />
          <ta-anchor-link href="#anchorpoint_c"
                          state="replace"
                          title="相关证明信息" />
        </ta-anchor> -->
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal"
                 :hideRequiredMark="hideRequiredMark"
                 v-show="!isChildFiles">
          <ta-form-item label="儿童类别:"
                        class="fromwid"
                        :require="{message:'请选择!'}"
                        fieldDecoratorId="childType"
                        style="margin-top: 5px; margin-bottom: 15px;">
            <ta-select class="selectwid"
                       @change="selectchange"
                       :defaultValue="this.$route.query.childType"
                       :disabled="collectDisabled">
              <ta-select-option v-for="(item,index) in childrenType"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form>

        <div ref="oneout"
             class="mars"
             :style="isChildFiles?'border: unset;':''">
          <Title id="anchorpoint_a"
                 class="bassInfor"
                 title="基本信息"
                 :show.sync="showone"
                 v-show="!isChildFiles"></Title>
          <ta-form layout="horizontal"
                   ref="one"
                   :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}"
                   :hideRequiredMark="hideRequiredMark">
            <BaseInformation @changehei="changehei"
                             @chosedata="chosedata"
                             @fileDataProcess="fileDataProcess"
                             :disabled="disabled"
                             :collectDisabled="collectDisabled"
                             :idCardDisabled="idCardDisabled"
                             :changedisabled="changedisabled"
                             :addressmodel="addressmodel"
                             :choselist.sync='choselist'
                             :addressmodelNow="addressmodelNow"
                             @setaddress="setaddress"
                             @setBirthAndAgeByIdCard="setBirthAndAgeByIdCard"
                             @setAgeByBirth="setAgeByBirth"
                             @clearDatas="clearDatas"
                             @clearIfSeriously="clearIfSeriously"
                             ref="base"></BaseInformation>
          </ta-form>
        </div>

        <div ref="fourout"
             class="mars"
             v-if="isChildFiles?!isChildFiles:this.childSituationAttr.filter(v => this.childSituation.includes(v)) != ''">
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
             class="mars"
             v-show="!isChildFiles">
          <Title id="anchorpoint_b"
                 title="生活费信息"
                 :show.sync="showtwo"></Title>
          <ta-form layout="horizontal"
                   ref="two"
                   :autoFormCreate="(cptAdoptorFrom)=>{this.cptAdoptorFrom = cptAdoptorFrom}"
                   :hideRequiredMark="hideRequiredMark">
            <LivingExpenses :disabled="disabled"
                            :changedisabled="changedisabled"
                            :childtype="childtype"
                            @setErrorMessage="setErrorMessage"
                            ref='live'></LivingExpenses>
          </ta-form>
        </div>

        <div ref="threeout"
             class="mars"
             v-if="isChildFiles?!isChildFiles:childtype!=5">
          <Title id="anchorpoint_c"
                 title="相关证明信息"
                 :show.sync="showthree"></Title>
          <ta-form layout="horizontal"
                   ref="three"
                   :autoFormCreate="(fiveRaiseFrom)=>{this.fiveRaiseFrom = fiveRaiseFrom}"
                   :hideRequiredMark="hideRequiredMark">
            <EvidenceInformation @uochanhei="uochanhei"
                                 @fileDataProcess="fileDataProcess"
                                 :disabled="disabled"
                                 ref="baseFile"></EvidenceInformation>
          </ta-form>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="家庭成员及社会关系"
                   key="2"
                   :forceRender="true">
        <ta-anchor class="md"
                   :offsetTop="100"
                   @click.native="chans"
                   v-show="!isChildFiles">
          <ta-anchor-link href="#fam_a"
                          state="replace"
                          title="基本信息" />
          <ta-anchor-link href="#fam_b"
                          state="replace"
                          title="家庭成员" />
          <ta-anchor-link href="#fam_c"
                          state="replace"
                          title="相关证明信息" />
        </ta-anchor>
        <div ref="fam_oneout"
             class="mars"
             v-show="!isChildFiles">
          <Title id="fam_a"
                 title="基本信息"
                 :show.sync="fam_showone"></Title>
          <ta-form layout="horizontal"
                   ref="fam_one"
                   :autoFormCreate="(adoptedFamFrom)=>{this.adoptedFamFrom = adoptedFamFrom}"
                   :hideRequiredMark="hideRequiredMark">
            <FamilyBase :disabled="disabled"></FamilyBase>
          </ta-form>
        </div>

        <div ref="fam_twoout"
             class="mars"
             :style="isChildFiles?'border: unset;':''">
          <Title id="fam_b"
                 title="家庭成员"
                 :show.sync="fam_showtwo"
                 v-show="!isChildFiles"></Title>
          <div class="familyout">
            <Family ref="fam_two"
                    types="1"
                    @changehei="changeFamHei"
                    @getTableDatas="getTableDatas"></Family>
          </div>

        </div>
        <div ref="fam_threeout"
             class="mars"
             v-show="!isChildFiles">
          <Title id="fam_c"
                 title="相关证明信息"
                 :show.sync="fam_showthree"></Title>
          <ta-form layout="horizontal"
                   ref="fam_three"
                   :autoFormCreate="(fiveRaiseFrom)=>{this.fiveRaiseFrom = fiveRaiseFrom}"
                   :hideRequiredMark="hideRequiredMark">
            <FamilyCertificateInformation @fileDataProcess="fileDataProcess"
                                          @uochanhei="uochanhei"
                                          :disabled="disabled"
                                          ref="famFile"></FamilyCertificateInformation>
          </ta-form>
        </div>
      </ta-tab-pane>
      <ta-tab-pane tab="多媒体"
                   key="3"
                   :forceRender="true"
                   v-if="!isChildFiles">
        <div class="mars">
          <ta-form layout="horizontal"
                   ref="fam_three"
                   :autoFormCreate="(fiveRaiseFrom)=>{this.fiveRaiseFrom = fiveRaiseFrom}"
                   :hideRequiredMark="hideRequiredMark">
            <MultiMedia @fileDataProcess="fileDataProcess"
                        @uochanhei="uochanhei"
                        :disabled="disabled"
                        ref="mul"></MultiMedia>
          </ta-form>
        </div>
      </ta-tab-pane>
    </ta-tabs>
    <div class="bom1"
         v-show="footerBtnDisabled">
      <ta-button type="primary"
                 class="preservation"
                 @click="submit(0)"
                 v-if="!disabled&&!changedisabled">暂存</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 @click="submit(1)"
                 v-if="!disabled">提交</ta-button>
      <ta-button @click="backs"
                 class="preservation">返回</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import BaseInformation from '../components/baseInformation'
import LivingExpenses from '../components/livingExpenses'
import EvidenceInformation from '../components/evidenceInformation'
import FamilyBase from '../components/familyBase'
import Family from './family'
import SearchRelatives from './searchRelatives'
import FamilyCertificateInformation from '../components/familyCertificateInformation'
import MultiMedia from '../components/multiMedia'
import moment from 'moment'
import DataProcess from './childrenDataProcess'

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
    MultiMedia,
    SearchRelatives
  },
  data () {
    return {
      current: ['1'],
      menulist: [
        { title: '儿童基本信息', key: '1' },
        { title: '家庭成员及社会关系', key: '2' },
        { title: '多媒体', key: '3' },
        { title: '打印', key: '4' }
      ],
      showone: true,
      ishide: false,
      showtwo: true,
      showthree: true,
      showfour: true,
      fam_showone: true,
      fam_showtwo: true,
      fam_showthree: true,
      // 男 女 收养
      typeadoption: '1',
      childtype: 0, // 选择的儿童类别
      familyobj: [],
      nowkey: '1',

      childrenType: [], // 儿童类别字典数据
      operateFlag: '', // 区分新增（add）、编辑（edit）、查看（look）的标识符
      childSituation: '',
      childSituationAttr: [
        this.Enum.CHILDSITUATION.LLQT,
        this.Enum.CHILDSITUATION.DGJJ,
        this.Enum.CHILDSITUATION.YSBYQET,
        this.Enum.CHILDSITUATION.YSYSZS,
        this.Enum.CHILDSITUATION.LDET], // 显示寻亲情况时满足的儿童情况数据
      disabled: false,
      changedisabled: false, // 儿童变更字段的只读（基本信息：性别、户籍性质、登记日期、患病情况、户籍所在地；生活费：起领年月）
      collectDisabled: false, // 儿童采集字段的只读
      idCardDisabled: false, // 身份证号的只读
      isChildFiles: false, // 是否是儿童档案跳过来的
      footerBtnDisabled: true, // 控制底部所有操作按钮的显隐
      addressmodelNow: [],
      addressmodel: [],

      familyMemberInfoFrom: [], // 家庭成员信息列表数据
      hasChild: false, // 家庭成员列表中是否已放入此儿童信息

      choselist: {},
      fileIdList: [], // 文件上传id数组

      hideRequiredMark: false, // 隐藏所有表单项的必填标记就是红色的*

      orphansHandicappedList: {}, // 存放路由跳转儿童基本信息列表数据
      enterObj: {}, // 跳转带过来的入院信息obj
      baseObj: {}, // 跳转带过来的儿童信息obj
      relateObj: {}, // 跳转带过来的寻亲信息obj
      liveObj: {}, // 跳转带过来的生活信息obj
      famObj: {}, // 跳转带过来的家庭信息obj
      famMemObj: [], // 跳转带过来的家庭成员信息obj

      routeName: '', // 数据提交成功后跳转的路由
      routeObjs: '', // 数据提交成功后跳转带的参数

      collectionDatas: {}, // 采集页面的数据

      isvalidator: false

    }
  },
  created () { },
  activated () {
    this.addOrUpdate() // 新增编辑查看前的数据处理
  },
  mounted () {
    this.isvalidator = false
  },
  methods: {

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
              showData = showData.replace(',', '：')
              _self.adoptedFrom.setFieldsValue({ childSituation: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ childSituation: showData })
            }
          }
          if (name == 'illnessType') {
            if (val == _self.Enum.ILLNESSTYPE.QT) {
              showData = showData.replace(',', '：')
              _self.adoptedFrom.setFieldsValue({ illnessType: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ illnessType: showData })
            }
          }
          if (name == 'specialEducationType') {
            if (val == _self.Enum.SPECIALEDUCATIONTYPE.QT) {
              showData = showData.replace(',', '：')
              _self.adoptedFrom.setFieldsValue({ specialEducationType: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ specialEducationType: showData })
            }
          }
          if (name == 'otherRescue') {
            if (val == _self.Enum.OTHERRESCUE.QT) {
              showData = showData.replace(',', '：')
              _self.adoptedFrom.setFieldsValue({ otherRescue: showData + (otherval != null ? otherval : '') })
            } else {
              _self.adoptedFrom.setFieldsValue({ otherRescue: showData })
            }
          }
          this.choselist[`${name}Label`] = showData
        }
      })
    },

    // 地址传值
    setaddress () {
      this.adoptedFrom.setFieldsValue({
        censusRegisterDatas: this.addressmodel,
        currentAddressDatas: this.addressmodelNow
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
    chans () {
      // this.$router.go(-1)
    },
    backs () {
      this.familyMemberInfoFrom = []
      this.$refs.fam_two.tableDatas = []
      this.fileIdList = []
      this.$refs.base.resetFileDatas()
      if (!this.isChildFiles) {
        this.$refs.baseFile.resetFileDatas()
        this.$refs.famFile.resetFileDatas()
        this.$refs.mul.resetFileDatas()
      }

      this.$router.go(-1)
    },
    uochanhei () {
      this.setHeight('three', 'threeout')
      this.setHeight('fam_three', 'fam_threeout')
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
      if (key == '2') {
        // 切换到家庭时，将输入的儿童信息作为家庭成员进行赋值-新增
        this.autoSet()

        this.$nextTick(() => {
          this.setHeight('fam_one', 'fam_oneout', !this.fam_showone)
          this.setHeight('fam_two', 'fam_twoout', !this.fam_showtwo)
          this.setHeight(
            'fam_three',
            'fam_threeout',
            !this.fam_showthree
          )
        })
      }
    },
    // tab 切换到家庭时，将输入的儿童信息作为家庭成员进行赋值
    autoSet () {
      const famTableDatas = this.$refs.fam_two.tableDatas
      let datas = {}
      if (famTableDatas instanceof Array && famTableDatas.length > 0) {
        datas = famTableDatas[0]
        datas.name = this.adoptedFrom.getFieldsValue().name
        datas.sex = this.adoptedFrom.getFieldsValue().sex
        datas.idCard = this.adoptedFrom.getFieldsValue().idCard
        datas.adisCondition = this.adoptedFrom.getFieldsValue().adisCondition
        datas.disabilityType = this.adoptedFrom.getFieldsValue().disabilityType || []
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
        datas.remark = this.adoptedFrom.getFieldsValue().remark
      } else {
        datas = {
          name: this.adoptedFrom.getFieldsValue().name,
          sex: this.adoptedFrom.getFieldsValue().sex,
          relationship: this.Enum.RELATION.QT,
          idCard: this.adoptedFrom.getFieldsValue().idCard,
          adisCondition: this.adoptedFrom.getFieldsValue().adisCondition,
          ifGuardian: this.Enum.YESNO.FOU,
          currentSituation: this.Enum.CURRENTSITUATION.ZC,
          disabilityType: this.adoptedFrom.getFieldsValue().disabilityType || [],
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
          remark: this.adoptedFrom.getFieldsValue().remark
        }
      }

      // 患艾滋病情况其他
      if (this.adoptedFrom.getFieldsValue().adisCondition == this.Enum.ADISCONDITION.QT) {
        datas.adisConditionOther = this.$refs.base.$refs.adisConditionOther.stateValue
      }
      // 若患艾滋病情况为携带或感染艾滋病时，传入确认艾滋病感染时间、最有可能感染艾滋病途径数据
      if (this.adoptedFrom.getFieldsValue().adisCondition == this.Enum.ADISCONDITION.XDHGRAZB) {
        datas.infectionTime = this.adoptedFrom.getFieldsValue().infectionTime ? moment(this.adoptedFrom.getFieldsValue().infectionTime).format('YYYY-MM-DD') : null
        datas.transmissionWay = this.adoptedFrom.getFieldsValue().transmissionWay
        // 最有可能感染艾滋病途径数据-其他
        if (this.adoptedFrom.getFieldsValue().transmissionWay == this.Enum.TRANSMISSIONWAYOTHER.QT) {
          datas.transmissionWayOther = this.$refs.base.$refs.transmissionWayOther.stateValue
        }
      }

      if (this.adoptedFrom.getFieldsValue().birthday != undefined) {
        const birthday = this.adoptedFrom.getFieldsValue().birthday ? moment(this.adoptedFrom.getFieldsValue().birthday).format('YYYY-MM-DD') : null
        datas.birthday = birthday
      }
      if (famTableDatas.length == 0) {
        famTableDatas.push(datas)
      } else {
        famTableDatas.splice(0, 1, datas)
      }
      this.hasChild = true
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
    selectchange (val) {
      this.setHeight('three', 'threeout')
    },
    // 家庭成员数据获取
    getTableDatas (val) {
      const _self = this
      _self.familyMemberInfoFrom = val
    },
    // 文件id存值与删除
    fileDataProcess (flag, val) {
      if (flag == 'save') {
        this.fileIdList.push(val)
      }
      if (flag == 'del') {
        this.fileIdList.splice(this.fileIdList.indexOf(val), 1)
      }
    },
    // 无户口时，清空户籍性质及户籍所在地数据
    clearDatas () {
      this.adoptedFrom.setFieldsValue({
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
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
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
    // 根据身份证号设置性别、年龄、出生日期
    setBirthAndAgeByIdCard (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }

      this.adoptedFrom.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      this.setAgeByBirth(birth)
    },
    // 根据出生日期设置年龄
    setAgeByBirth (e) {
      this.post('/orphansDisabledChildrenApi/getAgeByBirthday', { birthday: e }).then((res) => {
        if (res.serviceSuccess) {
          this.adoptedFrom.setFieldsValue({
            age: res.data.data
          })
        }
      })
    },
    // 信息采集数据带入并回显
    setDatasByCollection () {
      const _self = this
      // 采集页面填了身份证号,则回显并设为只读
      if (_self.collectionDatas.idCard && _self.collectionDatas.idCard != '') {
        _self.adoptedFrom.setFieldsValue({
          idCard: _self.collectionDatas.idCard
        })
        //   _self.idCardDisabled = true (暂时不做限制)
        _self.idCardDisabled = false
      } else {
        _self.idCardDisabled = false
      }
      // 当儿童类型为“福利机构抚养的孤弃儿童”时，委托方、委托日期不可填
      _self.$refs.base.principalRequire = false
      if (_self.collectionDatas.childType == '1') {
        _self.$refs.base.principalRequire = true
      }

      // 姓名、出生日期、儿童类别 回显数据，并设为只读
      _self.adoptedFrom.setFieldsValue({
        name: _self.collectionDatas.name,
        birthday: _self.collectionDatas.birthday ? moment(_self.collectionDatas.birthday) : null
      })
      _self.setAgeByBirth(_self.collectionDatas.birthday)

      _self.form.setFieldsValue({ childType: _self.collectionDatas.childType })
      _self.childtype = _self.form.getFieldsValue().childType

      _self.collectDisabled = true
    },
    // 暂存（0）和提交（1）
    submit (val) {
      let isok = true
      this.isvalidator = false
      const _self = this
      // 暂存时 只验证大小等格式不验证必填，提交时 都进行验证
      if (val == 0) { // 暂存
        _self.$refs.live.submitNotSave = false
        _self.$refs.base.submitNotSave = false
        if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
          _self.$refs.relative.submitNotSave = false
        }
      } else { // 提交
        _self.$refs.live.submitNotSave = true
        _self.$refs.base.submitNotSave = true
        if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
          _self.$refs.relative.submitNotSave = true
        }
      }

      _self.$nextTick(() => {
        this.isvalidator = false
        _self.fiveRaiseFrom.validateFields((err, values) => {
          if (err) {
            if (val == 0) {
              for (var i in values) {
                if (values[i] != undefined && err.hasOwnProperty(i)) {
                  isok = false
                }
              }
            } else {
              isok = false
            }
          }
        })
        // 生活费信息
        // 与儿童关系验证处理
        _self.cptAdoptorFrom.setFieldsValue({
          receiverRelation: _self.$refs.live.valueSelect
        })

        _self.cptAdoptorFrom.validateFields((err, values) => {
          if (err) {
            // 处理
            if (val == 0) {
              for (var i in values) {
                if (values[i] != undefined && err.hasOwnProperty(i)) {
                  isok = false
                }
              }
            } else {
              isok = false
            }
          }
        })
        // 与儿童关系-其他 验证
        if (_self.$refs.live.valueSelect == _self.Enum.RELATION.QT) {
          if (val == 1 && !_self.$refs.live.valueInput) { // 提交
            _self.setErrorMessage(null)
            isok = false
          }
          if (_self.$refs.live.valueInput) {
            const errmsg = _self.setErrorMessage(_self.$refs.live.valueInput)
            if (errmsg) {
              isok = false
            }
          }
        }
        // 寻亲信息需要判断是否存在
        if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
          _self.searchRelativesFrom.validateFields((err, values) => {
            if (err) {
              if (val == 0) {
                for (var i in values) {
                  if (values[i] != undefined && err.hasOwnProperty(i)) {
                    isok = false
                  }
                }
              } else {
                isok = false
              }
            }
          })
        }

        _self.adoptedFrom.validateFields((err, values) => {
          if (err) {
            if (val == 0) {
              for (var i in values) {
                if (values[i] != undefined && err.hasOwnProperty(i)) {
                  isok = false
                }
              }
            } else {
              isok = false
            }
          }
        })
        // 点击暂存或提交并校验后，再次显示必填 *
        _self.$refs.live.submitNotSave = true
        _self.$refs.base.submitNotSave = true
        if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
          _self.$refs.relative.submitNotSave = true
        }
        // 养育类型选择为“父母养育、（外）祖父母养育、其他亲属养育”时，家庭成员必填一个监护人信息
        const { rearingType } = _self.adoptedFrom.getFieldsValue()
        if (rearingType == this.Enum.REARINGTYPE.FMYY || rearingType == this.Enum.REARINGTYPE.ZFMYY || rearingType == this.Enum.REARINGTYPE.QTQSYY) {
          if (_self.operateFlag == 'add') { // 新增
            if (!_self.hasChild || (_self.hasChild && _self.familyMemberInfoFrom.length == 1)) {
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
        if (isok) {
          let saveOrUpdateUrl = '/orphansDisabledChildrenApi/saveOrphansDisabledChildren'
          if (_self.operateFlag == 'edit_zd') { // 在档
            saveOrUpdateUrl = '/orphansDisabledChildrenApi/updateChildBaseInfoSaveOther'
          }
          if (_self.operateFlag == 'edit_bh' || _self.operateFlag == 'edit_zy') { // 驳回(重新申请)、待提交
            saveOrUpdateUrl = '/addChildApi/updateChildInfo'
          }
          if (_self.operateFlag == 'edit_change') { // 变更
            saveOrUpdateUrl = '/childInfoApi/updateOrphansDisabledChildrenById'
          }
          const adoptedFromValue = _self.adoptedFrom.getFieldsValue()
          const cptAdoptorFromValue = _self.cptAdoptorFrom.getFieldsValue()
          // 添加生活费信息中的与儿童关系下拉框的值与其他  输入框的值
          cptAdoptorFromValue.receiverRelation = _self.$refs.live.valueSelect
          // 若选择了其他
          if (_self.$refs.live.valueSelect == _self.Enum.RELATION.QT) {
            cptAdoptorFromValue.receiverRelationOther = _self.$refs.live.valueInput
          }

          let searchRelativesFromValue = null
          if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
            searchRelativesFromValue = _self.searchRelativesFrom.getFieldsValue()
          }
          const fiveRaiseFromValue = _self.fiveRaiseFrom.getFieldsValue()
          const adoptedFamFromValue = _self.adoptedFamFrom.getFieldsValue()
          // 填写完儿童基本信息tab页直接点击提交时将儿童信息存入家庭成员
          _self.autoSet()

          const { familyMemberInfoFrom } = _self
          for (var i = 0; i < familyMemberInfoFrom.length; i++) {
            familyMemberInfoFrom[i].familyId = _self.famObj.id
            if (familyMemberInfoFrom[i].disabilityType instanceof Array && familyMemberInfoFrom[i].disabilityType.length > 0) {
              familyMemberInfoFrom[i].disabilityType = familyMemberInfoFrom[i].disabilityType.join(',')
            } else if (typeof familyMemberInfoFrom[i].disabilityType != 'string') {
              familyMemberInfoFrom[i].disabilityType = ''
            }
          }

          adoptedFromValue.childType = _self.form.getFieldsValue().childType // 添加儿童类别

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
          // 文件上传id数据
          adoptedFromValue.upLoadPathIds = _self.fileIdList
          // 编辑查看时的id赋值
          if (_self.operateFlag != 'add') {
            // 儿童基本信息id
            adoptedFromValue.ids = _self.enterObj.id // 入院id
            adoptedFromValue.id = _self.baseObj.id // 基本信息id
            if (searchRelativesFromValue) {
              searchRelativesFromValue.id = _self.relateObj.id // 寻亲信息id
            }
            adoptedFamFromValue.id = _self.famObj.id // 家庭信息id
            if (_self.liveObj) {
              cptAdoptorFromValue.id = _self.liveObj.id // 生活费id
            }
          }
          // 传参数据格式化处理
          const record = _self.dataProcess(
            val,
            adoptedFromValue,
            cptAdoptorFromValue,
            searchRelativesFromValue,
            fiveRaiseFromValue,
            adoptedFamFromValue,
            familyMemberInfoFrom
          )

          _self.post(saveOrUpdateUrl, record, true).then(res => {
            if (res.serviceSuccess) {
              // 提交成功后重置数据
              _self.fiveRaiseFrom.resetFields() // 相关证明信息
              if (this.childSituationAttr.filter(v => this.childSituation.includes(v)) != '') {
                _self.searchRelativesFrom.resetFields() // 寻亲信息
              }
              _self.adoptedFamFrom.resetFields() // 家庭基本信息信息
              _self.$refs.fam_two.tableDatas = [] // 家庭成员信息
              _self.cptAdoptorFrom.resetFields() // 生活费信息
              _self.adoptedFrom.resetFields() // 基本信息

              _self.fileIdList = [] // 清空附加id数据
              _self.$refs.base.resetFileDatas()
              if (!_self.isChildFiles) {
                _self.$refs.baseFile.resetFileDatas()
                _self.$refs.famFile.resetFileDatas()
                _self.$refs.mul.resetFileDatas()
              }

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
          _self.nowkey = '1'
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 新增、编辑、查看前的数据处理
    async addOrUpdate () {
      const _self = this
      // 加载页面时重置数据
      _self.nowkey = '1'
      _self.disabled = false
      _self.changedisabled = false
      _self.hideRequiredMark = false
      _self.footerBtnDisabled = true
      _self.form.resetFields()
      _self.adoptedFrom.resetFields()
      _self.cptAdoptorFrom.resetFields()
      // 加载页面时重置数据
      if (_self.searchRelativesFrom && _self.searchRelativesFrom != undefined) {
        _self.searchRelativesFrom.resetFields()
      }
      _self.adoptedFamFrom.resetFields()
      _self.choselist = {} // 重置多选抽屉的数据（新增时）

      this.familyMemberInfoFrom = []
      this.$refs.fam_two.tableDatas = []
      this.fileIdList = []
      this.$refs.base.resetFileDatas()
      if (!_self.isChildFiles) {
        this.$refs.baseFile.resetFileDatas()
        this.$refs.famFile.resetFileDatas()
        this.$refs.mul.resetFileDatas()
      }

      // 重置身份证号非必填
      _self.$refs.base.idCardRequire = false

      // 数据处理
      _self.choselist = {}
      if (_self.$route.query.collectionDatas != undefined) {
        // 儿童信息采集页面带过来的数据
        _self.collectionDatas = JSON.parse(_self.$route.query.collectionDatas)
      }

      _self.operateFlag = _self.$route.query.operateFlag
      if (_self.$route.query.isChildFiles) {
        _self.isChildFiles = _self.$route.query.isChildFiles
      }

      _self.routeName = _self.$route.query.routeName
      _self.routeObjs = _self.$route.query.routeObjs

      // 获取儿童类别字典
      let codeType = ''
      const orgType = window.parent.indexTool.getUserInfo().orgType
      if (_self.operateFlag.indexOf('look') != -1) { // 查看时选择全的养育类型字典
        _self.$refs.base.getMenu('REARINGTYPE', 'rearingTypeList') // 获取养育类型字典数据
      } else { // 非查看
        if (orgType == '99') { // 福利院用户
          codeType = 'CHILDCATEGORYF'
          // 儿童类别为“福利机构养育孤弃儿童”的养育类型字典
          if (_self.collectionDatas.childType == _self.Enum.CHILDCATEGORYA.FLJGYYGQET) {
            _self.$refs.base.getMenu('REARINGTYPEWO', 'rearingTypeList') // 获取养育类型字典数据
          } else if (_self.collectionDatas.childType == _self.Enum.CHILDCATEGORYA.FLJGGYKJET) { // 儿童类别为“福利机构供养困境儿童”的养育类型字典
            _self.$refs.base.getMenu('REARINGTYPEWD', 'rearingTypeList') // 获取养育类型字典数据
          } else { // 其他的显示全部
            _self.$refs.base.getMenu('REARINGTYPE', 'rearingTypeList') // 获取养育类型字典数据
          }
        }
        if (orgType != '98' && orgType != '99') { // 民政局用户
          codeType = 'CHILDCATEGORYM'
          // 民政局用户的养育类型字典
          _self.$refs.base.getMenu('REARINGTYPEORG', 'rearingTypeList') // 获取养育类型字典数据
        }
      }
      _self.post('codetable/getCode', { codeType: codeType }).then(res => {
        if (res.serviceSuccess) {
          _self.childrenType = res.data.codeList
        }
      })

      // 新增
      if (_self.operateFlag == 'add') {
        // 是否展示儿童基本信息中的条件模块（确认艾滋病感染时间、其他情况、其他途径等）
        _self.$refs.base.ifDatasProcess(null, 'add')
        _self.getChildNum()
        // 信息采集数据带入并回显
        _self.setDatasByCollection()
      }
      // 其他页面跳转到此页面时的加载
      if (_self.operateFlag != 'add') {
        if (_self.operateFlag.indexOf('look') != -1) {
          _self.idCardDisabled = true // 身份证号

          _self.disabled = true
          _self.changedisabled = true
          _self.$refs.base.delVisible = false
          _self.hideRequiredMark = true
          // 儿童档案查看隐藏底部按钮
          if (_self.isChildFiles) {
            _self.footerBtnDisabled = false
          }
        } else {
          _self.hideRequiredMark = false
          _self.idCardDisabled = false // 身份证号
        }
        if (_self.operateFlag == 'edit_change') { // 变更页面跳转至此
          _self.changedisabled = true
          _self.idCardDisabled = true // 身份证号
        }
        _self.collectDisabled = true // 儿童类型、姓名、出生日期
        // 查看的接口（所有业务模块跳转）
        const url = _self.$route.query.url
        const params = JSON.parse(_self.$route.query.params)
        console.log('The params is : ', params)
        await _self.post(url, params).then(res => {
          if (res.serviceSuccess) {
            _self.orphansHandicappedList = res.data.data
          }
        })
        // 查看显示全的儿童类别字典
        this.post('codetable/getCode', { codeType: 'CHILDCATEGORYA' }).then(res => {
          if (res.serviceSuccess) {
            _self.childrenType = res.data.codeList
          }
        })

        if (_self.operateFlag == 'look_now' || _self.operateFlag == 'edit_bh' || _self.operateFlag == 'edit_zy' || _self.operateFlag == 'edit_change') { // 实时查看和驳回编辑和变更
          _self.$refs.base.ifDatasProcess(_self.orphansHandicappedList, 'look_now')
          _self.enterObj = _self.orphansHandicappedList.childBaseEnterWelfareInstitutionVo// 入院的vo对象
          _self.baseObj = _self.orphansHandicappedList.childBaseInformationVo// 基本信息的vo对象
          _self.relateObj = _self.orphansHandicappedList.childBaseRelativesVo// 寻亲的vo对象
          _self.liveObj = _self.orphansHandicappedList.livingCostVo // 生活费的vo对象
          _self.famObj = _self.orphansHandicappedList.familyInfoVo// 家庭的vo对象
          _self.famMemObj = _self.orphansHandicappedList.familyMemberInfoList // 家庭成员的vo对象

          // 附件回显
          this.fileShow(_self.enterObj)
          setTimeout(() => {
            _self.setHeight('three', 'threeout')
          }, 1000)
        }
        if (_self.operateFlag == 'edit_zd' || _self.operateFlag == 'look_zd') { // 在档
          _self.$refs.base.ifDatasProcess(_self.orphansHandicappedList, 'look_zd')
          if (_self.orphansHandicappedList.birthday) {
            _self.setAgeByBirth(_self.orphansHandicappedList.birthday)
          }
          _self.enterObj = _self.orphansHandicappedList// 入院的vo对象
          _self.baseObj = _self.orphansHandicappedList// 基本信息的vo对象
          _self.relateObj = _self.orphansHandicappedList// 寻亲的vo对象
          _self.liveObj = _self.orphansHandicappedList// 生活费的vo对象
          _self.famObj = {}// 家庭的vo对象
          _self.famMemObj = []// 家庭成员的vo对象
        }

        // 是否显示寻亲信息
        if (_self.baseObj.childSituation != undefined && _self.baseObj.childSituation.length != 0) {
          _self.childSituation = _self.baseObj.childSituation.split(',')
        }
        // 儿童类别赋值
        _self.$nextTick(() => {
          _self.form.setFieldsValue(_self.enterObj)
          if (_self.operateFlag == 'edit_zd' || _self.operateFlag == 'look_zd' || _self.operateFlag == 'edit_bh') { // 在档导入、驳回重新申请的儿童类别使用采集页面带过来的，而不是接口中的
            _self.form.setFieldsValue({ childType: _self.collectionDatas.childType })
          }
          _self.childType = _self.form.getFieldsValue().childType
          // 当儿童类型为“福利机构抚养的孤弃儿童”时，委托方、委托日期不可填
          _self.$refs.base.principalRequire = false
          if (_self.form.getFieldsValue().childType == '1') {
            _self.$refs.base.principalRequire = true
          }

          // 儿童基本信息赋值
          _self.enterObj.registerDate = _self.enterObj.registerDate
            ? moment(_self.enterObj.registerDate) : null
          _self.enterObj.principalDate = _self.enterObj.principalDate
            ? moment(_self.enterObj.principalDate) : null
          _self.enterObj.pickingDate = _self.enterObj.pickingDate
            ? moment(_self.enterObj.pickingDate) : null
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
          _self.adoptedFrom.setFieldsValue(_self.enterObj)
          _self.adoptedFrom.setFieldsValue(_self.baseObj)

          // 户籍所在地、现住址赋值
          if (_self.baseObj.censusRegisterPro != undefined) {
            _self.addressmodel = [
              _self.baseObj.censusRegisterPro ? _self.baseObj.censusRegisterPro : '',
              _self.baseObj.censusRegisterCity ? _self.baseObj.censusRegisterCity : '',
              _self.baseObj.censusRegisterCounty ? _self.baseObj.censusRegisterCounty : ''
            ]
          }
          if (_self.baseObj.currentAddressPro != undefined) {
            _self.addressmodelNow = [
              _self.baseObj.currentAddressPro ? _self.baseObj.currentAddressPro : '',
              _self.baseObj.currentAddressCity ? _self.baseObj.currentAddressCity : '',
              _self.baseObj.currentAddressCounty ? _self.baseObj.currentAddressCounty : ''
            ]
          }

          // 如果户口分类为有户口，则身份证号必填
          if (_self.baseObj.householdRegistryClassify != this.Enum.HOUSEHOLDREGISTRYCLASSIFY.WHK) { // 有户口
            _self.$refs.base.idCardRequire = true
            _self.$refs.base.censusRegisterRequire = true
            _self.$refs.base.localDisabled = false
          } else {
            _self.$refs.base.idCardRequire = false
            _self.$refs.base.censusRegisterRequire = false
            _self.$refs.base.tag = 1
            _self.$refs.base.localDisabled = true
          }
          // 将其他途径、患艾滋病情况的其他数据传到页面
          _self.$refs.base.setOtherDatas(_self.baseObj.transmissionWayOther, _self.baseObj.adisConditionOther)

          // 获取儿童情况、患病类型、特教类型、其他救助字典数据
          _self.typeDataProcess('CHILDSITUATION', _self.baseObj.childSituation, _self.baseObj.childSituationOther, 'childSituation')
          _self.typeDataProcess('ILLNESSTYPE', _self.baseObj.illnessType, _self.baseObj.illnessTypeOther, 'illnessType')
          _self.typeDataProcess('SPECIALEDUCATIONTYPE', _self.baseObj.specialEducationType, _self.baseObj.specialEducationTypeOther, 'specialEducationType')
          _self.typeDataProcess('OTHERRESCUE', _self.enterObj.otherRescue, _self.enterObj.otherReliefOther, 'otherRescue')
        })

        // 若存在寻亲信息，赋值
        if (_self.relateObj && !_self.isChildFiles) {
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
          _self.cptAdoptorFrom.setFieldsValue(_self.liveObj)
          // 与儿童关系单独赋值
          _self.$refs.live.valueSelect = _self.liveObj.receiverRelation
          if (_self.liveObj.receiverRelation == _self.Enum.RELATION.QT) { // 其他
            _self.$nextTick(() => {
              _self.$refs.live.valueInput = _self.liveObj.receiverRelationOther
            })
          }
        }
        // 家庭基本信息及成员信息赋值
        _self.adoptedFamFrom.setFieldsValue(_self.famObj)
        const memberDatas = _self.famMemObj
        for (var i = 0; i < memberDatas.length; i++) {
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
      }
    },
    // 附件回显（编辑或查看时）
    fileShow (enterObj) {
      const _self = this
      enterObj.fileList.forEach((item, index) => {
        switch (item.busiType) {
          case '50':
            _self.$refs.base.fileList.push(item)
            _self.$refs.base.headImgId = item.response.data.data.fileid
            if (_self.operateFlag.indexOf('look') == -1) {
              _self.$refs.base.delVisible = true
            }
            _self.$refs.base.imageUrl = window.faceConfig.basePath + '/file/getFileFromDfs/' + item.response.data.data.fileid
            // _self.post('/file/getFileUrls', { returnFileIds:item.response.data.data.fileid }).then(res => {
            //   if (res.serviceSuccess) {
            //     _self.$refs['base'].imageUrl = window.faceConfig.basePath + res.data.fileUrlList[0]
            //   }
            // })
            break
          case '3':
            if (!_self.isChildFiles) {
              _self.$refs.baseFile.proveFileList.push(item)
            }

            break
          case '5':
            if (!_self.isChildFiles) {
              _self.$refs.baseFile.copyFileList.push(item)
            }

            break
          case '7':
            if (!_self.isChildFiles) {
              _self.$refs.baseFile.retentionFileList.push(item)
            }

            break
          case '4':
            if (!_self.isChildFiles) {
              _self.$refs.baseFile.oldPeopleFileList.push(item)
            }

            break
          case '6':
            if (!_self.isChildFiles) {
              _self.$refs.baseFile.disabilityFileList.push(item)
            }

            break
          case '43':
            if (!_self.isChildFiles) {
              _self.$refs.famFile.proveFileList.push(item)
            }

            break
          case '44':
            if (!_self.isChildFiles) {
              _self.$refs.famFile.copyFileList.push(item)
            }

            break
          case '45':
            if (!_self.isChildFiles) {
              _self.$refs.famFile.retentionFileList.push(item)
            }

            break
          case '46':
            if (!_self.isChildFiles) {
              _self.$refs.famFile.oldPeopleFileList.push(item)
            }

            break
          case '11':
            if (!_self.isChildFiles) {
              _self.$refs.mul.imgFileList.push(item)
            }

            break
          case '12':
            if (!_self.isChildFiles) {
              _self.$refs.mul.videoFileList.push(item)
            }

            break
          default:
        }
      })
    }
  },
  watch: {
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
    typeadoption () {
      this.setHeight('two', 'twoout')
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin-left: 32px;
}

.fromwid {
  width: 324px;
  margin-top: 24px;
  margin-bottom: 30px;
}

.selectwid {
  width: 224px;
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
  /* left: 14px; */
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
  z-index: 999;
}
.tadrawer {
  padding: 25px 0;
}
</style>
