<template>
  <div style="height:100%">
    <!-- class="conts tadrawer"  -->
    <ta-border-layout :layout="{header:'150px'}">
      <ta-modal title="自定义查询条件"
                :width="590"
                @cancel="handleCancel"
                @ok="handleOk()"
                :visible="searchShow">
        <ta-form :autoFormCreate="(form)=>{this.addOrImportform = form}"
                 layout="horizontal">
          <ta-form-item label=""
                        :initValue="['1','2']"
                        fieldDecoratorId="addOrImport">
            <ta-checkbox-group>
              <ta-checkbox value="1">被收养人信息</ta-checkbox>
              <ta-checkbox value="2">收养人信息</ta-checkbox>
            </ta-checkbox-group>
          </ta-form-item>
        </ta-form>
      </ta-modal>
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchDataForm)=>{this.searchDataForm = searchDataForm}">
          <ta-col :span="24">
            <ta-form-item label="被收养人姓名"
                          class="spilwid1"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          :require="isOwnRequire?false:{message:'请输入被收养人姓名'}"
                          fieldDecoratorId="childName">
              <ta-input :placeholder=" '请输入被收养人姓名'" />
            </ta-form-item>
            <ta-form-item label="被收养人身份证号"
                          class="spilwid1"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          :require="isOwnIdcard?false:{message:'请输入被收养人身份证号'}"
                          fieldDecoratorId="idCard">
              <ta-input :placeholder=" '请输入身份证号'" />
            </ta-form-item>
            <ta-form-item class="spilwid1"
                          style="margin-left: 50px;"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="searchData">查询</ta-button>
                <ta-button @click="selectSearch">自定义查询条件</ta-button>
              </div>
            </ta-form-item>
          </ta-col>
          <ta-form-item label="收养人姓名"
                        class="spilwid1"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        :require="isOtherRequire?false:{message:'请输入姓名'}"
                        fieldDecoratorId="adopterName">
            <ta-input :placeholder=" '请输入姓名'" />
          </ta-form-item>
          <ta-form-item label="收养人身份证号"
                        class="spilwid1"
                        :labelCol="{span:10}"
                        :wrapperCol="{span:14}"
                        :require="isOtherRequire?false:{message:'请输入身份证号'}"
                        fieldDecoratorId="adopterIdCard">
            <ta-input :placeholder=" '请输入身份证号'" />
          </ta-form-item>

          <ta-form-item label="收养登记证字号"
                        class="spilwid1"
                        :labelCol="{span:10}"
                        :wrapperCol="{span:14}"
                        :require="isRequire?false:{message:'请输入登记证字号'}"
                        fieldDecoratorId="registionNumber">
            <ta-input :placeholder=" '请输入登记字号'" />
          </ta-form-item>

        </ta-form>
      </div>

      <!-- <ta-divider /> -->

      <div :hidden="!hiddens"
           style="position: absolute;  left: 43%;">
        <p style="text-align: center;  font-size: 24px;  opacity: 0.3;">暂无收养信息哦！</p>
      </div>
      <div class="tadrawer">
        <ta-tabs class="contin"
                 :hidden="hiddens"
                 :activeKey="nowkey"
                 @change="OnTabsChangeCallback">
          <ta-tab-pane tab="基本信息"
                       key="1"
                       :forceRender="true">
            <Basic :id="id"
                   :additionalYesOrNo="additionalYesOrNo"
                   :basedisabled="false"
                   :adoptive="true"
                   :thisP="thisP"
                   ref="basic"
                   @setData="setData"></Basic>
          </ta-tab-pane>
          <ta-tab-pane tab="笔录信息"
                       key="2"
                       :forceRender="true">
            <Record :basedisabled="isprint"
                    :notesRecordVos="notesRecordVos"
                    @chaadoptorChildrenVos="chaadoptorChildrenVos"></Record>
          </ta-tab-pane>
          <ta-tab-pane tab="文件上传"
                       key="3"
                       :forceRender="true">
            <FileUpload :fileList.sync="fileList"
                        :adoptionfileList.sync="adoptionfileList"
                        :adopterfileList.sync='adopterfileList'
                        :filedisabled="isprint"></FileUpload>
          </ta-tab-pane>
          <ta-tab-pane tab="情况说明"
                       key="5"
                       :forceRender='true'>
            <div ref="fourout"
                 class="mars">
              <Title id="anchorpoint_d"
                     title="解除情况说明"
                     :show.sync="showfour"></Title>
              <ta-form layout="horizontal"
                       ref="four"
                       :autoFormCreate="(from1)=>{this.from1 = from1}">
                <InformationNote :basedisabled="isprint||basedisabled"
                                 :relieveOtherReason.sync='relieveOtherReason'
                                 :isZY="false"
                                 :relieveOtherReasonshow.sync='relieveOtherReasonshow'
                                 :additionalYesOrNo='additionalYesOrNo'></InformationNote>
              </ta-form>
            </div>
          </ta-tab-pane>
          <ta-tab-pane tab="打印"
                       key="4"
                       v-if='isprint'
                       :forceRender="true">
            <Printing :printlist='printlist'
                      :printId='printId'></Printing>
          </ta-tab-pane>
        </ta-tabs>
      </div>
      <div class="bom">
        <ta-button class="preservation"
                   @click="backs">返回</ta-button>
        <ta-button type="primary"
                   :hidden="hiddens"
                   class="btnleft temporarystorage"
                   @click="submit('6')"
                   v-if='submitbtn'>暂存</ta-button>
        <ta-button type="primary"
                   :hidden="hiddens"
                   class="btnleft"
                   @click="submit"
                   v-if='submitbtn'>提交</ta-button>
      </div>
      <ta-modal title="提交成功"
                :visible="printshow"
                @ok="printOk"
                okText="打印"
                @cancel="printno">
        <p><b>解除收养登记操作成功！是否需要打印相关材料？</b></p>
        <p>后续打印请到收养业务查询页面打印。</p>
      </ta-modal>
    </ta-border-layout>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import FileUpload from './components/fileUpload'
import Printing from './components/printing'
import Record from './components/record'
import InformationNote from './components/InformationNote'
import Basic from './components/basic'
import moment from 'moment'

export default {
  name: 'register',
  components: {
    Title,
    FileUpload,
    Printing,
    InformationNote,
    Basic,
    Record
  },
  data () {
    return {
      isOwnRequire: false,
      isOwnIdcard: true,
      isOtherRequire: false,
      isRequire: false,
      searchShow: false,
      thisP: this,
      outDo: true, // 按钮
      submitbtn: true,
      hiddens: true,
      searchTip: false,
      //
      showfour: true,
      id: '',
      handleType: '',
      basedisabled: false,
      notesRecordVos: [],
      fileList: [],
      // 文件上传
      adoptionfileList: [],
      adopterfileList: [],
      filedisabled: false,
      distantApply: '0',
      otherid: '',
      relieveOtherReasonshow: false,
      relieveOtherReason: '',
      nowkey: '1',
      printlist: [
        { name: '解除收养登记申请书', url: '/adoption/printRelieve', src: '/../../../../../../../../static/img/relive1.jpg' },
        { name: '解除收养登记询问笔录', url: '/adoption/printRelieveNotes', src: '/../../../../../../../../static/img/relive2.jpg' },
        { name: '解除收养登记审查处理表', url: '/adoption/printRelieveApproverecord', src: '/../../../../../../../../static/img/relive3.jpg' },
        { name: '解除收养关系证明', url: '/adoption/printRelieveAdoptRelationProve', src: '/../../../../../../../../static/img/relive4.jpg' }
      ],
      printId: '',
      printshow: false,
      isprint: false,
      additionalYesOrNo: '0'
    }
  },
  activated () {
    this.isOwnRequire = false
    this.isOwnIdcard = true
    this.isOtherRequire = false
    this.isRequire = false
    this.searchShow = false
    this.hiddens = true
    this.id = ''
    this.addOrImportform.setFieldsValue({ addOrImport: ['1', '2'] })
    this.searchDataForm.resetFields()
  },
  methods: {
    selectSearch () {
      this.searchShow = true
    },
    handleOk () {
      const val = this.addOrImportform.getFieldsValue().addOrImport
      if (val == '1') {
        this.isOwnRequire = false
        this.isOwnIdcard = false
        this.isRequire = true
        this.isOtherRequire = true
      } else if (val == '2') {
        this.isOwnRequire = true
        this.isOwnIdcard = true
        this.isRequire = true
        this.isOtherRequire = false
      } else {
        this.isOwnRequire = false
        this.isOwnIdcard = true
        this.isRequire = false
        this.isOtherRequire = false
      }
      this.searchShow = false
      this.$nextTick(() => {
        const searchData = this.searchDataForm.getFieldsValue()
        this.searchDataForm.resetFields()
        this.searchDataForm.setFieldsValue(searchData)
      })
    },
    handleCancel () {
      this.searchShow = false
    },
    handleChange (value) {
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    async searchData () {
      const childName = this.searchDataForm.getFieldValue('childName')
      const orgId = this.searchDataForm.getFieldValue('orgId')
      const idCard = this.searchDataForm.getFieldValue('idCard')
      const adopterName = this.searchDataForm.getFieldValue('adopterName')
      const registionNumber = this.searchDataForm.getFieldValue('registionNumber')
      const adopterIdCard = this.searchDataForm.getFieldValue('adopterIdCard')
      const fromData = { childName, orgId, idCard, adopterName, registionNumber, adopterIdCard }
      const fromDatas = [childName, orgId, idCard, adopterName, registionNumber, adopterIdCard]

      this.searchDataForm.validateFields(async (err, values) => {
        if (!err) {
          const res = await this.post('/adoption/queryRelieveReal', fromData)
          if (!res.errors && res.data.data) {
            const { data } = res.data
            this.hiddens = false
            this.loadData()
            this.id = data.adopteeVo.registrationAdoptionId
            this.printId = this.id
            this.basedisabled = false
            this.filedisabled = false
            // if (data.registrationAdoptionVo) {
            //   if (data.registrationAdoptionVo.relieveReason == 4) {
            //     this.relieveOtherReasonshow = true
            //     this.relieveOtherReason = data.registrationAdoptionVo.relieveOtherReason
            //   }
            //   data.registrationAdoptionVo.registerDate = data.registrationAdoptionVo.registerDate ? moment(data.registrationAdoptionVo.registerDate) : null
            //   data.registrationAdoptionVo.relieveDate = data.registrationAdoptionVo.relieveDate ? moment(data.registrationAdoptionVo.relieveDate) : null
            //   this.from1.setFieldsValue(data.registrationAdoptionVo)
            // }
            // 文件信息 filePathVos
            // if (data.filePathVos) {
            //   const filePathVos = JSON.parse(data.filePathVos)
            //   filePathVos.map(item => {
            //     if (item.busiType == '1') {
            //       this.fileList.push(item)
            //     } else if (item.busiType == '2') {
            //       this.adoptionfileList.push(item)
            //     } else {
            //       this.adopterfileList.push(item)
            //     }
            //   })
            // }
            this.setHeight('four', 'fourout', !this.showfour)
          } else {
            this.hiddens = true
          }
        } else {
          this.$message.error('请完整填写信息后查询！')
        }
      })
    },
    loadData () {
      this.printId = ''
      this.notesRecordVos = []
      this.fileList = []
      this.adoptionfileList = []
      this.adopterfileList = []
      this.relieveOtherReasonshow = false
      this.relieveOtherReason = ''
      this.nowkey = '1'
      this.id = ''
      this.otherid = ''
      // this.otherid = ''
      this.handleType = '3'
      this.filedisabled = false
      this.basedisabled = false
      this.showfour = true
      this.printshow = false
      this.isprint = false
      this.from1.resetFields()
    },
    backs () {
      this.$router.go(-1)
    },
    setData (val) {
      this.from1.setFieldsValue({
        orgName: val.orgName,
        registerDate: moment(val.registerDate),
        adoptionRegistionCertificateNumber: val.adoptionRegistionCertificateNumber
      })
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
      this.setHeight('four', 'fourout')
    },
    printOk () {
      this.isprint = true
      this.submitbtn = false
      this.printshow = false
      this.nowkey = '4'
    },
    printno () {
      this.printshow = false
      this.submitbtn = false
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
        delete mendata.address_Linkage
      }
      if (womandata.address_Linkage) {
        womandata.censusRegisterPro = womandata.address_Linkage[0] || ''
        womandata.censusRegisterCity = womandata.address_Linkage[1] || ''
        womandata.censusRegisterCounty = womandata.address_Linkage[2] || ''
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
      const fromData = this.from1.getFieldsValue()

      fromData.registerDate = fromData.registerDate ? fromData.registerDate.format('YYYY-MM-DD') : null
      fromData.relieveDate = fromData.relieveDate ? fromData.relieveDate.format('YYYY-MM-DD') : null
      fromData.relieveOtherReason = this.relieveOtherReason
      // 文件信息
      const upLoadPathIds = []
      // let fileids = [...this.syCardFileList, ...this.fileList, ...this.adoptionfileList, ...this.adopterfileList]
      const fileids = [...this.fileList, ...this.adoptionfileList, ...this.adopterfileList]
      fileids.map(item => {
        upLoadPathIds.push(item.response.data.data.fileid)
      })
      fromData.upLoadPathIds = upLoadPathIds
      // 笔录信息
      fromData.notesRecordVos = this.notesRecordVos

      fromData.registrationAdoptionId = this.id
      fromData.additionalYesOrNo = this.additionalYesOrNo
      fromData.distantApply = '1'
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
      const fromData1 = this.submitDataDue()// 处理提交时的数据
      const fromData2 = this.processingData()// 处理提交时的数据
      const fromData = { ...fromData1, ...fromData2 }
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

      if (zc == '6') { // 解除暂存
        const restList = this.duejustData()
        this.from1.validateFieldsAndScroll(restList, async (err, values) => {
          if (!err) {
            if (this.otherid) {
              // 编辑--暂存
              url = '/adoption/relieve'// ---接口暂无 2020年8月18日 09:06:13
              fromData.id = this.otherid
              fromData.saveStatus = '0'
            } else {
              // 新增--暂存
              url = '/adoption/relieve'// ---接口暂无 2020年8月18日 09:06:13
              fromData.saveStatus = '0'
            }
            issure = true
          } else {
            this.nowkey = '5'
            this.$message.error('已填写内容不符合校验规则，请再次检查！')
          }
        })
      } else {
        this.from1.validateFieldsAndScroll(async (err, values) => {
          if (!err) {
            if (this.otherid) {
              // 编辑
              url = '/adoption/updateRelieve'
              fromData.id = this.otherid
              fromData.saveStatus = '1'
            } else {
              url = '/adoption/relieve'
              fromData.saveStatus = '1'
            }
            issure = true
          } else {
            this.nowkey = '5'
            this.setHeight('four', 'fourout')
            // this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        })
      } if (this.$refs.basic.childtype == 3) {
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
        if (zc == '6') {
          this.postGo(url, fromData, 6)
        } else {
          this.postGo(url, fromData)
        }
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
  },
  watch: {
    showfour (val) {
      this.setHeight('four', 'fourout', !val)
    }
  }
}

</script>
<style lang="less" scoped>
.bom {
  width: calc(100% - 25px);
  height: 80px;
  background: white;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
  z-index: 999;
  margin-left: -17px;
  box-sizing: border-box;
}
.spilwid1 {
  width: 430px;
}
</style>
