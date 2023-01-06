<template>
  <div :class="evaluate=='yes'?'':'conts tadrawer'"
       style=' padding: 6px 8px 80px 20px !important;'>
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="OnTabsChangeCallback">
      <ta-tab-pane tab="基本信息"
                   key="1">
        <Basic :id="id"
               :additionalYesOrNo="additionalYesOrNo"
               :isbulu="isbulu"
               :basedisabled="basedisabled"
               :thisP="thisP"
               :adoptive="true"
               :jichu="true"
               :isnext="isnext"
               ref="basic"
               @getData="getData"
               :adoptionCategory="adoptionCategory"
               @setBirthDay="setBirthDay"
               @setData="setData"></Basic>

      </ta-tab-pane>
      <ta-tab-pane tab="笔录信息"
                   key="2">
        <Record :basedisabled="isprint||basedisabled"
                :notesRecordVos="notesRecordVos"
                @chaadoptorChildrenVos="chaadoptorChildrenVos"></Record>
      </ta-tab-pane>
      <ta-tab-pane tab="文件上传"
                   key="3">
        <FileUpload :fileList.sync="fileList"
                    :syCardFileList.sync="syCardFileList"
                    :adoptionfileList.sync="adoptionfileList"
                    :adopterfileList.sync='adopterfileList'
                    :filedisabled="isprint||filedisabled"></FileUpload>
      </ta-tab-pane>
      <ta-tab-pane tab="情况说明"
                   :forceRender='true'
                   key="4">

        <div class="separate">
          <div class="line"></div>
          <p style='width: 170px;'>解除情况说明</p>
          <ta-divider />
        </div>

        <ta-form layout="horizontal"
                 ref="four"
                 :autoFormCreate="(from)=>{this.from = from}">
          <InformationNote :basedisabled="isprint||basedisabled"
                           :isZY="isZY"
                           :isshow="isshow"
                           :relieveOtherReason.sync='relieveOtherReason'
                           :relieveOtherReasonshow.sync='relieveOtherReasonshow'
                           :additionalYesOrNo='additionalYesOrNo1'></InformationNote>
        </ta-form>
        <!-- </div> -->
      </ta-tab-pane>
      <ta-tab-pane tab="打印"
                   key="5"
                   v-if='isprint1'>
        <Printing :printlist='printlist'
                  :printId='printId'></Printing>
      </ta-tab-pane>

    </ta-tabs>
    <div class="bom"
         v-if="evaluate!='yes'">
      <ta-button class="btnleft"
                 v-if="isFromSearch"
                 @click="backsSearch">返回</ta-button>
      <ta-button class="btnleft"
                 v-if="!isFromSearch"
                 @click="backs">返回</ta-button>
      <ta-button type="primary"
                 class="temporarystorage"
                 @click="submit('6')"
                 v-if='!onlyWh&&handleType!=0&&additionalYesOrNo1==0'>暂存</ta-button>
      <ta-button type="primary"
                 @click="submit"
                 v-if='handleType!=0'>提交</ta-button>
    </div>
    <ta-modal title="提交成功"
              :visible="printshow"
              @ok="printOk"
              okText="打印"
              @cancel="printno">
      <p><b>操作成功！是否需要打印相关材料？</b></p>
      <p>后续打印请到收养业务查询页面打印。</p>
    </ta-modal>
  </div>
</template>

<script>
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import Record from './components/record'
import InformationNote from './components/InformationNote'
import Basic from './components/basic'
import moment from 'moment'
export default {
  name: 'register',
  props: {
    evaluate: { type: String, require: false },
    goId: { type: String, require: false },
    bizId: { type: String, require: false },
    additionalYesOrNo2: { type: String, require: false }
  },
  components: {

    FileUpload,
    Printing,
    InformationNote,
    Basic,
    Record
  },
  data () {
    return {
      thisP: this,
      isZY: true,
      isnext: false,
      isshow: false,

      id: '',
      handleType: '',
      basedisabled: false,
      notesRecordVos: [],
      fileList: [],
      // 文件上传
      adoptionfileList: [],
      syCardFileList: [],
      adopterfileList: [],
      filedisabled: false,
      distantApply: '0',
      otherid: '',
      relieveOtherReasonshow: false,
      relieveOtherReason: '',
      nowkey: '1',
      printlist: [
        { name: '解除收养登记申请书', url: '/adoption/printRelieve', src: 'static/img/relive1.jpg' },
        { name: '解除收养登记询问笔录', url: '/adoption/printRelieveNotes', src: 'static/img/relive2.jpg' },
        { name: '解除收养登记审查处理表', url: '/adoption/printRelieveApproverecord', src: 'static/img/relive3.jpg' },
        { name: '解除收养关系证明', url: '/adoption/printRelieveAdoptRelationProve', src: 'static/img/relive4.jpg' }
      ],
      printId: '',
      printshow: false,
      isprint: false,
      isprint1: false,
      additionalYesOrNo: '0',
      additionalYesOrNo1: '0',
      isbulu: '',
      onlyWh: false,
      adoptionCategory: '',
      zcOrxz: '',
      seeType: '',
      isFromSearch: false,
      formDataSearch: {}
    }
  },
  activated () {
    this.loadData()
    if (this.$route.query.wh == '1') {
      this.onlyWh = true
    } else { this.onlyWh = false }
    this.additionalYesOrNo1 = this.$route.query.additionalYesOrNo
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.printId = this.id
    }
    if (this.evaluate == 'yes') {
      this.id = this.goId
      this.isnext = true
      this.printId = this.id
      this.otherid = this.bizId
      this.additionalYesOrNo1 = this.additionalYesOrNo2
    }
    this.handleType = this.$route.query.handleType
    this.adoptionCategory = this.$route.query.childType
    if (this.handleType == 0) { // 查看
      this.basedisabled = true
      this.filedisabled = true
    } else { // writ au
      this.basedisabled = false
      this.filedisabled = false
    }
    if (this.$route.query.zcjcsy == '1') {
      this.isprint1 = true
    } else {
      this.isprint1 = false
    }
    if (this.$route.query.type == 'see') {
      this.seeType = 'see'
      this.basedisabled = true
      this.filedisabled = true
    } else {
      this.seeType = ''
      this.basedisabled = false
      this.filedisabled = false
    }
    if ((this.$route.query.zcjcsy == '1' && this.$route.query.additionalYesOrNo == '0') || (this.$route.query.islook == '1')) {
      this.isnext = true
    } else {
      this.isnext = false
    }
    // 是否是从查询跳转
    if (this.$route.query.isFromSearch) {
      this.formDataSearch = JSON.parse(this.$route.query.formDataSearch)
      this.isFromSearch = this.$route.query.isFromSearch
    }
    if (this.$route.query.nowkey) {
      this.zcOrxz = this.$route.query.nowkey
    }
    if (this.$route.query.otherRelieveId) {
      this.otherid = this.$route.query.otherRelieveId
    }
    if (this.$route.query.otherid) {
      this.otherid = this.$route.query.otherid
    }
    if (this.$route.query.isbulu) {
      this.isbulu = this.$route.query.isbulu
    }
  },
  mounted () {
  },
  methods: {
    loadData () {
      this.additionalYesOrNo1 = this.$route.query.additionalYesOrNo
      this.isFromSearch = false
      this.formDataSearch = {}
      this.printId = ''
      this.isbulu = ''
      this.isshow = false
      this.isZY = true
      this.isnext = false
      this.seeType = ''
      this.adoptionCategory = ''
      this.notesRecordVos = []
      this.fileList = []
      this.adoptionfileList = []
      this.syCardFileList = []
      this.adopterfileList = []
      this.relieveOtherReasonshow = false
      this.relieveOtherReason = ''
      this.nowkey = '1'
      this.id = ''
      this.otherid = ''
      this.zcOrxz = ''
      this.handleType = ''
      this.filedisabled = false
      this.basedisabled = false

      this.printshow = false
      this.isprint = false
      this.isprint1 = false
      this.from.resetFields()
    },
    backs () {
      this.$router.go(-1)
    },
    backsSearch () {
      this.$router.push({
        path: this.formDataSearch.pathUrl,
        query: {
          isFromSearch: true,
          formDataSearch: this.formDataSearch
        }
      })
    },
    // 获取详情
    getdetails () {
      const params = {
        id: this.id
      }

      this.post('/adoption/queryRelieveById', params).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          if (!data) {
            return false
          }
          if (data.relieveReason == 4) {
            this.relieveOtherReasonshow = true
            this.relieveOtherReason = data.relieveOtherReason
          }
          this.notesRecordVos = data.notesRecordVos
          data.registerDate = data.registerDate ? moment(data.registerDate) : null
          data.relieveDate = data.relieveDate ? moment(data.relieveDate) : null
          this.from.setFieldsValue(data)

          // 文件信息 filePathVos
          if (data.filePathVos) {
            const filePathVos = JSON.parse(data.filePathVos)
            filePathVos.map(item => {
              if (item.busiType == '1') {
                this.fileList.push(item)
              } else if (item.busiType == '2') {
                this.adoptionfileList.push(item)
              } else if (item.busiType == '22') {
                this.syCardFileList.push(item)
              } else {
                this.adopterfileList.push(item)
              }
            })
          }
        }
      })
    },
    getData (data) {
      if (data.relieveReason == 4) {
        this.relieveOtherReasonshow = true
        this.relieveOtherReason = data.relieveOtherReason
      }
      if (data.notesRecordVos) {
        this.notesRecordVos = data.notesRecordVos
      }
      if (data.handleTime) {
        data.handleTime = moment(data.handleTime, 'YYYY-MM-DD')
      } else {
        this.from.setFieldsValue({
          handlePersonName: window.parent.indexTool.getUserInfo().userName,
          handleOrgName: window.parent.indexTool.getUserInfo().orgName,
          handleTime: moment()
        })
      }
      // data.registerDate = data.registerDate ? moment(data.registerDate) : null
      data.relieveDate = data.relieveDate ? moment(data.relieveDate) : null
      this.$nextTick(() => {
        this.from.setFieldsValue(data)
      })
      // 文件信息 filePathVos
      if (data.filePathVos) {
        const filePathVos = JSON.parse(data.filePathVos)
        filePathVos.map(item => {
          if (item.busiType == '1') {
            this.fileList.push(item)
          } else if (item.busiType == '2') {
            this.adoptionfileList.push(item)
          } else if (item.busiType == '22') {
            this.syCardFileList.push(item)
          } else {
            this.adopterfileList.push(item)
          }
        })
      }
    },
    setBirthDay (val) {
      let nowDates = new Date()
      nowDates = moment(nowDates).format('YYYY-MM-DD')
      const nowdate = nowDates.split('-').join('')
      const olddate = val.split('-').join('')
      const ageNum = nowdate - olddate

      if (ageNum > 80000) {
        this.isshow = true
      }
    },
    setData (val) {
      this.from.setFieldsValue({
        registerOrgName: val.registerOrgName,
        registerDate: moment(val.registerDate, 'YYYY-MM-DD'),
        adoptionRegistionCertificateNumber: val.adoptionRegistionCertificateNumber
      })
    },
    chans () {
      // this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = (this.$refs[ref].$el.offsetHeight + 90) + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    OnTabsChangeCallback (index) {
      this.nowkey = index
    },
    printOk () {
      this.isprint = true
      this.isprint1 = true
      this.printshow = false
      this.handleType = '0'
      this.nowkey = '5'
      this.isZY = false
    },
    printno () {
      this.printshow = false
      this.backs()
    },
    // 筛选数据
    screeningData (data) {
      const arrdata = []
      const mendata = {}
      const womandata = {}
      for (var k in data) {
        if (k.includes('copy')) {
          if (k == 'copy_address_Linkage') {
            womandata.address_Linkage = data[k]
          } else {
            const keys = k.split('_')[1]
            womandata[keys] = data[k]
          }
        } else {
          mendata[k] = data[k]
        }
      }
      womandata.sameAddress = mendata.sameAddress
      // 健康状况
      if (mendata.healthCondition) {
        mendata.healthCondition = mendata.healthCondition.join(',')
      }
      if (womandata.healthCondition) {
        womandata.healthCondition = womandata.healthCondition.join(',')
      }
      mendata.sex = '1'
      womandata.sex = '2'
      if (mendata.address_Linkage) {
        mendata.censusRegisterPro = mendata.address_Linkage[0] || ''
        mendata.censusRegisterCity = mendata.address_Linkage[1] || ''
        mendata.censusRegisterCounty = mendata.address_Linkage[2] || ''
        mendata.censusRegisterTown = mendata.address_Linkage[3] || ''
        delete mendata.address_Linkage
      }
      if (womandata.address_Linkage) {
        womandata.censusRegisterPro = womandata.address_Linkage[0] || ''
        womandata.censusRegisterCity = womandata.address_Linkage[1] || ''
        womandata.censusRegisterCounty = womandata.address_Linkage[2] || ''
        womandata.censusRegisterTown = womandata.address_Linkage[3] || ''
        delete womandata.address_Linkage
      } else {
        womandata.censusRegisterPro = mendata.censusRegisterPro || ''
        womandata.censusRegisterCity = mendata.censusRegisterCity || ''
        womandata.censusRegisterCounty = mendata.censusRegisterCounty || ''
        womandata.censusRegisterDetail = mendata.censusRegisterDetail || ''
      }
      if (mendata.familyIncome) {
        womandata.familyIncome = mendata.familyIncome
        womandata.relationship = mendata.relationship
        womandata.opinion = mendata.opinion
      }
      arrdata.push(mendata, womandata)
      return arrdata
    },
    // 处理数据
    processingData () {
      // 总数据对象
      const registerAdoptionVo = {}

      // 家庭年收入
      let familyIncome = ''

      // 被收养人数据
      let relieveAdopteeVo = {}

      relieveAdopteeVo = Object.assign({}, this.$refs.basic.adoptedFrom.getFieldsValue())
      this.changetime(relieveAdopteeVo)
      if (relieveAdopteeVo.address_Linkage) {
        relieveAdopteeVo.censusRegisterPro = relieveAdopteeVo.address_Linkage[0] || ''
        relieveAdopteeVo.censusRegisterCity = relieveAdopteeVo.address_Linkage[1] || ''
        relieveAdopteeVo.censusRegisterCounty = relieveAdopteeVo.address_Linkage[2] || ''
        relieveAdopteeVo.censusRegisterTown = relieveAdopteeVo.address_Linkage[3] || ''
        delete relieveAdopteeVo.address_Linkage
      }

      // 健康状况
      // if (relieveAdopteeVo.healthCondition) {
      //   relieveAdopteeVo.healthCondition = relieveAdopteeVo.healthCondition.join(',')
      // }
      if (
        relieveAdopteeVo.healthSecondLevel &&
        relieveAdopteeVo.healthSecondLevel.length > 0
      ) {
        relieveAdopteeVo.healthSecondLevel = relieveAdopteeVo.healthSecondLevel.join(',')
      }
      relieveAdopteeVo.childrenId = this.$refs.basic.childrenId
      if (this.$refs.basic.childtype <= 2) {
        relieveAdopteeVo.childBaseId = this.$refs.basic.childBaseId
      }
      registerAdoptionVo.relieveAdopteeVo = relieveAdopteeVo

      // 收养人数据
      let relieveAdoptorVos = []

      const AdoptorVo = Object.assign(this.$refs.basic[this.$refs.basic.nowformname].getFieldsValue())
      this.changetime(AdoptorVo)

      // 取出家庭年收入
      familyIncome = this.$refs.basic.familyIncome

      if (this.$refs.basic.adoptionTabKey == 3) {
        relieveAdoptorVos = this.screeningData(AdoptorVo)
        if (this.$refs.basic.applytype == 1) {
          relieveAdoptorVos[0].keyMember = 1
          relieveAdoptorVos[1].keyMember = 0
        } else {
          relieveAdoptorVos[0].keyMember = 0
          relieveAdoptorVos[1].keyMember = 1
        }
      } else {
        // 1男 2 女
        AdoptorVo.sex = this.$refs.basic.adoptionTabKey
        AdoptorVo.keyMember = 1
        // 健康状况
        if (AdoptorVo.healthCondition) {
          AdoptorVo.healthCondition = AdoptorVo.healthCondition.join(',')
        }
        if (AdoptorVo.address_Linkage) {
          AdoptorVo.censusRegisterPro = AdoptorVo.address_Linkage[0] || ''
          AdoptorVo.censusRegisterCity = AdoptorVo.address_Linkage[1] || ''
          AdoptorVo.censusRegisterCounty = AdoptorVo.address_Linkage[2] || ''
          AdoptorVo.censusRegisterTown = AdoptorVo.address_Linkage[3] || ''
        }
        delete AdoptorVo.address_Linkage

        relieveAdoptorVos.push(AdoptorVo)
      }

      registerAdoptionVo.relieveAdoptorVos = relieveAdoptorVos
      registerAdoptionVo.familyIncome = familyIncome
      if (this.$refs.basic.childtype != 8) {
        // 送样信息处理
        if (this.$refs.basic.childtype <= 2) {
          const fromData = Object.assign(
            {},
            this.$refs.basic.fiveRaiseFrom.getFieldsValue()
          )
          this.changetime(fromData)
          // 送样机构
          let relieveAdoptionAgencyVo = {}
          relieveAdoptionAgencyVo = Object.assign(
            { welfareInstitutionId: this.$refs.basic.welfareInstitutionId },
            fromData
          )
          registerAdoptionVo.relieveAdoptionAgencyVo = relieveAdoptionAgencyVo
        } else {
          // 送养人
          let relievePlacingOutPersonVos = []
          // nowmaintenanceFrom
          const PlacingOutPersonVo = Object.assign(
            {},
            this.$refs.basic[this.$refs.basic.nowmaintenanceFrom].getFieldsValue()
          )
          this.changetime(PlacingOutPersonVo)
          if (this.$refs.basic.sendTabKey == 3) {
            relievePlacingOutPersonVos = this.screeningData(PlacingOutPersonVo)
          } else {
            // 1男 2 女
            PlacingOutPersonVo.sex = this.$refs.basic.sendTabKey
            PlacingOutPersonVo.keyMember = 1
            // 健康状况
            if (PlacingOutPersonVo.healthCondition) {
              PlacingOutPersonVo.healthCondition = PlacingOutPersonVo.healthCondition.join(
                ','
              )
            }
            if (PlacingOutPersonVo.address_Linkage) {
              PlacingOutPersonVo.censusRegisterPro =
                PlacingOutPersonVo.address_Linkage[0] || ''
              PlacingOutPersonVo.censusRegisterCity =
                PlacingOutPersonVo.address_Linkage[1] || ''
              PlacingOutPersonVo.censusRegisterCounty =
                PlacingOutPersonVo.address_Linkage[2] || ''
              PlacingOutPersonVo.censusRegisterTown =
                PlacingOutPersonVo.address_Linkage[3] || ''
            }
            delete PlacingOutPersonVo.address_Linkage
            relievePlacingOutPersonVos.push(PlacingOutPersonVo)
          }
          // 送不养数据
          registerAdoptionVo.relievePlacingOutPersonVos = relievePlacingOutPersonVos
        }
      }
      // 生父母 parentFrom
      if (this.$refs.basic.childtype == 3) {
        let relieveParentsVos = []
        const parentsVo = Object.assign({}, this.$refs.basic.parentFrom.getFieldsValue())
        // 单亲
        const parentFromObj = this.$refs.basic.$refs.parentFrom
        parentsVo.isOneParent =
          parentFromObj.manrequire && parentFromObj.womanrequire
            ? '0'
            : parentFromObj.manrequire && !parentFromObj.womanrequire
              ? '1'
              : '2'
        this.changetime(parentsVo)
        relieveParentsVos = this.screeningData(parentsVo)
        registerAdoptionVo.relieveParentsVos = relieveParentsVos
      }

      return registerAdoptionVo
    },
    // 请求前数据处理
    submitDataDue () {
      const fromData = this.from.getFieldsValue()

      fromData.registerDate = fromData.registerDate ? fromData.registerDate.format('YYYY-MM-DD') : null
      fromData.relieveDate = fromData.relieveDate ? fromData.relieveDate.format('YYYY-MM-DD') : null
      fromData.relieveOtherReason = this.relieveOtherReason
      // 文件信息
      const upLoadPathIds = []
      const fileids = [...this.syCardFileList, ...this.fileList, ...this.adoptionfileList, ...this.adopterfileList]
      fileids.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      fromData.upLoadPathIds = upLoadPathIds
      // 笔录信息
      fromData.notesRecordVos = this.notesRecordVos

      fromData.registrationAdoptionId = this.id
      fromData.additionalYesOrNo = this.additionalYesOrNo1

      return fromData
    },
    // 编辑、提交，暂存---暂存发送
    async postGo (url, fromData, n) {
      const data = await this.post(
        url,
        fromData,
        true
      )
      if (data.errors == null) {
        this.$message.success('操作成功')
        if (this.additionalYesOrNo == 0 && !n) {
          this.printshow = true
          this.basedisabled = true
        } else {
          this.backs()
        }
      }
    },
    // 取出非空字段id集合
    duejustData () {
      const fromData = this.from.getFieldsValue()
      const validList = []
      for (const key in fromData) {
        if (fromData[key] && fromData[key] != undefined) {
          validList.push(key)
        }
      }
      return validList
    },
    async submit (zc) {
      const fromData1 = this.submitDataDue()// 处理提交时的数据
      const fromData2 = this.processingData()// 处理提交时的数据
      const fromData = { ...fromData1, ...fromData2 }
      let url = ''
      let issure = false
      // 情况说明
      if (zc == '6') { // 解除暂存
        const restList = this.duejustData()
        this.from.validateFieldsAndScroll(restList, async (err, values) => {
          if (!err) {
            if (this.zcOrxz == '0') {
              // 暂存--暂存
              url = '/adoption/updateRelieve'// ---接口暂无 2020年8月18日 09:06:13
              fromData.id = this.otherid
              fromData.saveStatus = '0'
            } else {
              // 新增--暂存
              url = '/adoption/relieve'// ---接口暂无 2020年8月18日 09:06:13
              fromData.saveStatus = '0'
            }
            issure = true
          } else {
            this.nowkey = '4'
            this.$message.error('已填写内容不符合校验规则，请再次检查！')
          }
        })
      } else {
        this.from.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            if (this.zcOrxz == '0') { // 暂存的提交
              url = '/adoption/updateRelieve'// ---接口暂无 2020年8月18日 09:06:13
              fromData.id = this.otherid
              fromData.saveStatus = '1'
            } else {
              if (this.otherid) {
                // 编辑
                url = '/adoption/infonMaintUpdateRelieve'/// updateRelieve'// '/adoption/updateRelieve'
                fromData.id = this.otherid
                fromData.saveStatus = '1'
              } else {
                url = '/adoption/relieve'
                fromData.saveStatus = '1'
              }
            }
            issure = true
          } else {
            this.nowkey = '4'
            // this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      }
      if (this.$refs.basic.childtype == 3) {
        this.$refs.basic.parentFrom.validateFields((err, values) => {
          if (err) {
            if (zc == '6') {
              for (const k in err) {
                if (!this.$refs.basic.parentFrom.getFieldsValue()[k]) {
                  this.$refs.basic.parentFrom.resetFields(k)
                } else {
                  issure = false
                }
              }
            } else {
              issure = false
            }
            this.nowkey = '1'
          }
        })
      }
      if (this.$refs.basic.childtype != 8) {
        // 送养人信息
        if (this.$refs.basic.childtype > 2) {
          this.$refs.basic[this.$refs.basic.nowmaintenanceFrom].validateFields((err, values) => {
            if (err) {
              if (zc == '6') {
                for (const k in err) {
                  if (!this.$refs.basic[this.$refs.basic.nowmaintenanceFrom].getFieldsValue()[k]) {
                    this.$refs.basic[this.$refs.basic.nowmaintenanceFrom].resetFields(k)
                  } else {
                    issure = false
                  }
                }
              } else {
                issure = false
              }
              this.nowkey = '1'
            }
          })
        } else {
          this.$refs.basic.fiveRaiseFrom.validateFields((err, values) => {
            if (err) {
              if (zc == '6') {
                for (const k in err) {
                  if (!this.$refs.basic.fiveRaiseFrom.getFieldsValue()[k]) {
                    this.$refs.basic.fiveRaiseFrom.resetFields(k)
                  } else {
                    issure = false
                  }
                }
              } else {
                issure = false
              }
              this.nowkey = '1'
            }
          })
        }
      }
      this.$refs.basic[this.$refs.basic.nowformname].validateFields((err, values) => {
        if (err) {
          if (zc == '6') {
            for (const k in err) {
              if (!this.$refs.basic[this.$refs.basic.nowformname].getFieldsValue()[k]) {
                this.$refs.basic[this.$refs.basic.nowformname].resetFields(k)
              } else {
                issure = false
              }
            }
          } else {
            issure = false
          }
          this.nowkey = '1'
        }
      })
      // 被收养人信息
      // if(this.$refs.basic.imgfilelist.length==0)
      this.$refs.basic.adoptedFrom.validateFields((err, values) => {
        if (err) {
          if (zc == '6') {
            for (const k in err) {
              if (
                this.$refs.basic.childtype <= 2
                  ? !this.$refs.basic.adoptedFrom.getFieldsValue()[k] &&
                  k != 'name' &&
                  k != 'welfareInstitutionName'
                  : !this.$refs.basic.adoptedFrom.getFieldsValue()[k] && k != 'name'
              ) {
                this.$refs.basic.adoptedFrom.resetFields(k)
              } else {
                issure = false
              }
            }
          } else {
            issure = false
          }
          this.nowkey = '1'
        }
      })
      if (issure == true) {
        this.postGo(url, fromData)
      } else {
        this.$message.error('校验不通过，无法提交，请再次检查！')
      }
    },
    // 家庭子女 笔录信息 调查信息 对应的数据变化
    chaadoptorChildrenVos (tablename, val, e) {
      if (e || e == 0) {
        if (val) {
          this[tablename].splice(e, 1, val)
        } else {
          this[tablename].splice(e, 1)
        }
      } else {
        this[tablename] = val
      }
    }
  }
}
</script>

<style scoped type="text/less">
.preservation {
  margin: 0 20px 0 32px;
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
  height: 626px;
  transition: all 1s;
  overflow: hidden;
}
.mars {
  width: 100%;
  margin-bottom: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.hei {
  height: 500px;
  background: pink;
}
.md {
  position: absolute;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}

.separate {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 22px 0;
  height: 22px;
}
.line {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  margin-right: 3px;
}
.separate p {
  font-size: 16px;
  font-weight: 400;
}
</style>
