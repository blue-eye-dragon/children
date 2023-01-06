<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="收养登记证字号"
                              class="spilwid1"
                              :labelCol="{span:11}"
                              fieldDecoratorId="registionNumber"
                              :wrapperCol="{span:13}">
                  <ta-input placeholder="请输入收养登记证字号"
                            class="numwid" />
                </ta-form-item>
                <ta-form-item label="被收养人姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="childName"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入被收养人姓名" />
                </ta-form-item>
                <ta-form-item label="业务类别"
                              class="spilwid"
                              fieldDecoratorId="biztype"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: '1'}">
                  <ta-select placeholder="请选择业务类别">
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionbiztypelist"
                                      :key="index">{{item.label}}</ta-select-option>
                    <ta-select-option value>全部</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="儿童身份证号"
                              class="spilwid1"
                              :labelCol="{span:9}"
                              fieldDecoratorId="idCard"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童身份证号" />
                </ta-form-item>
                <!-- <ta-form-item label="收养人姓名"
                              class="spilwid"
                              fieldDecoratorId="maleName"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入收养人姓名" />
                </ta-form-item>
                <ta-form-item label="收养人身份证号"
                              class="spilwid"
                              fieldDecoratorId="maleIdCard"
                              :labelCol="{span:11}"
                              :wrapperCol="{span:13}">
                  <ta-input placeholder="请输入收养人身份证号" />
                </ta-form-item>-->
                <ta-form-item label="收养类别"
                              class="spilwid"
                              fieldDecoratorId="adoptionCategory"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select placeholder="请选择收养类别"
                             @change="adoptionTypeChange">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="登记日期"
                              v-show="adoptionTypeChangeResult"
                              class="spilwid1"
                              fieldDecoratorId="registerDate"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>
        </div>

        <div class="operateBtn">
          <ta-button type="primary"
                     @click="gorecord"
                     :disabled="isgo">回访记录</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :rowSelection="mixRowSelection"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <span slot="comeOutCard"
                slot-scope="val, obj, index">
            <span v-if="val=='0'"
                  class="com_adopt">未办结</span>
            <span v-else
                  class="com_reject">已办结</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="continueprocessing(obj,'0','see')"
                  class="com_textsee">查看</span>
            <!-- <ta-divider type="vertical" /> -->
            <span @click="seerevoke(obj)"
                  class="com_revocation"
                  v-if="obj.flowStatus==6">作废原因</span>
            <template v-else>
              <span @click="continueprocessing(obj)"
                    v-if="!obj.comeOutCard || obj.comeOutCard == '0'||(obj.biztype == '5'||obj.biztype == '6'||obj.biztype == '7')"
                    class="com_textedit">修改</span>
              <!-- <ta-divider type="vertical" /> -->
              <span @click="revoke(obj)"
                    v-if="!obj.comeOutCard || obj.comeOutCard == '0'||(obj.biztype == '5'||obj.biztype == '6'||obj.biztype == '7')"
                    class="com_relieve">作废</span>
              <span @click="prient(obj)"
                    class="com_correlation">打印</span>
              <span @click="Issue(obj)"
                    v-if="(!obj.comeOutCard || obj.comeOutCard == '0')&&!(obj.biztype == '5'||obj.biztype == '6'||obj.biztype == '7')"
                    class="com_publish">是否办结</span>
              <!-- v-if="" -->
            </template>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :defaultCurrent="page"
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ta-modal title="作废"
              :visible="visible"
              :closable="false">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="作废原因"
                      fieldDecoratorId="revokeReason"
                      :fieldDecoratorOptions="this.verificationRules('作废原因', 60,false)"
                      :labelCol="{ span: 5 }">
          <ta-textarea placeholder="请输入作废原因"
                       :disabled="reasondis"
                       :rows="4" />
        </ta-form-item>
      </ta-form>
      <template slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   v-if="!reasondis"
                   type="primary"
                   @click="onok">确定</ta-button>
      </template>
    </ta-modal>
    <!-- <ta-drawer
      title="作废"
      width="500"
      placement="right"
      :getContainer="setContainer"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
      <ta-form class="drawerFrom" :autoFormCreate="(form)=>{this.form = form}" layout="horizontal">
        <ta-form-item
          label="作废原因"
          fieldDecoratorId="name"
          :labelCol="{ span: 6 }"
          :require="{message:'请输入作废原因!'}"
        >
          <ta-textarea placeholder="请输入作废原因" :rows="4" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }" @click="onClose">取消</ta-button>
        <ta-button @click="submit" type="primary">确定</ta-button>
      </div>
    </ta-drawer>-->

    <ta-drawer title="打印"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onCloseP"
               :visible="visibleP"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <p class="prienttitle">选择需要打印的表单</p>
      <div class="prientout">
        <ta-radio-group @change="radiochange"
                        v-model="radiovalue">
          <ta-radio :value="item.url"
                    v-for="(item,index) in printlist"
                    :key="index">{{item.name}}</ta-radio>
        </ta-radio-group>
      </div>
    </ta-drawer>
    <!-- 打印证件组件 -->
    <printCertificateregister ref="printCertificateregister"></printCertificateregister>
    <printCertificateRelive ref="printCertificateRelive"></printCertificateRelive>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import printCertificateregister from '@/scopes/project/common/components/printCertificateregister'
import printCertificateRelive from '@/scopes/project/common/components/printCertificateRelive'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '登记字号',
    width: '24%',
    dataIndex: 'certificateNumber'
  },
  {
    title: '被收养人姓名',
    width: '15%',
    dataIndex: 'childName'
  },
  // {
  //   title: '收养人男方姓名',
  //   width: '17%',
  //   dataIndex: 'maleName'
  // },
  // {
  //   title: '收养人女方姓名',
  //   width: '17%',
  //   dataIndex: 'femaleName'
  //   // collectionType: 'sex'
  // },
  {
    title: '收养类别',
    width: '15%',
    dataIndex: 'adoptionCategory',
    collectionType: 'ADOPTIONCATEGORY'
  },
  {
    title: '业务类别',
    width: '15%',
    dataIndex: 'biztype',
    collectionType: 'ADOPTIONBIZTYPE'
  },
  {
    title: '登记日期',
    width: '18%',
    dataIndex: 'registerDate'
  },
  {
    title: '办结状态',
    width: '15%',
    align: 'center',
    dataIndex: 'comeOutCard',
    scopedSlots: { customRender: 'comeOutCard' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 330,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  components: {
    printCertificateregister,
    printCertificateRelive
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/adoptionList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,
      adoptionlist: [],
      adoptionbiztypelist: [],
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange,
        type: 'radio'
      },
      isgo: true,
      adoptionid: '',
      registrationAdoptionId: '',
      adoptorName: '',
      childId: '',
      officelist: [],
      nowdata: {},
      reasondis: false,
      issearch: false,
      prientData: {},
      radiovalue: '',
      printlist: [],
      visibleP: false,
      adoptionTypeChangeResult: false,
      printlist4: [
        {
          name: '收养登记证明书',
          url: '/adoption/printRegisterCertificate',
          src: 'static/img/certificationfrom1.jpg'
        },
        {
          name: '出具收养登记证明申请书 ',
          url: '/adoption/printCertificateApply',
          src: 'static/img/certificationfrom2.jpg'
        },
        {
          name: '出具收养登记证明询问笔录',
          url: '/adoption/printCertificateNotes',
          src: 'static/img/certificationfrom3.jpg'
        },
        {
          name: '出具收养登记证明审查处理表',
          url: '/adoption/printCertificateApproverecord',
          src: 'static/img/certificationfrom4.jpg'
        }
      ],
      // 收养登记
      printlist1: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        },
        {
          name: '收养登记证',
          url: '/adoption/printRegistration',
          src: 'static/img/register5.jpg'
        }
      ],
      // 补录收养登记
      printlist5: [
        {
          name: '收养登记申请书',
          url: '/adoption/printAdoption',
          src: 'static/img/register1.jpg'
        },
        {
          name: '收养登记调查记录',
          url: '/adoption/printSurvey',
          src: 'static/img/register2.jpg'
        },
        {
          name: '收养登记询问笔录',
          url: '/adoption/printNotes',
          src: 'static/img/register3.jpg'
        },
        {
          name: '收养登记审查处理表',
          url: '/adoption/printApproverecord',
          src: 'static/img/register4.jpg'
        }
      ],
      // 撤销收养登记
      printlist3: [
        {
          name: '撤销收养登记申请书',
          url: '/adoption/printRevoke',
          src: 'static/img/revoke1.jpg'
        },
        {
          name: '撤销收养登记决定书 ',
          url: '/adoption/printRevokeApproverecord',
          src: 'static/img/revoke2.jpg'
        }
      ],
      // 补录撤销收养登记
      printlist7: [
        {
          name: '撤销收养登记申请书',
          url: '/adoption/printRevoke',
          src: 'static/img/revoke1.jpg'
        },
        {
          name: '撤销收养登记决定书 ',
          url: '/adoption/printRevokeApproverecord',
          src: 'static/img/revoke2.jpg'
        }
      ],
      // 解除收养登记
      printlist2: [
        {
          name: '解除收养登记申请书',
          url: '/adoption/printRelieve',
          src: 'static/img/relive1.jpg'
        },
        {
          name: '解除收养登记询问笔录',
          url: '/adoption/printRelieveNotes',
          src: 'static/img/relive2.jpg'
        },
        {
          name: '解除收养登记审查处理表',
          url: '/adoption/printRelieveApproverecord',
          src: 'static/img/relive3.jpg'
        },
        {
          name: '解除收养关系证明',
          url: '/adoption/printRelieveAdoptRelationProve',
          src: 'static/img/relive4.jpg'
        }
      ],
      // 补录解除收养登记
      printlist6: [
        {
          name: '解除收养登记申请书',
          url: '/adoption/printRelieve',
          src: 'static/img/relive1.jpg'
        },
        {
          name: '解除收养登记询问笔录',
          url: '/adoption/printRelieveNotes',
          src: 'static/img/relive2.jpg'
        },
        {
          name: '解除收养登记审查处理表',
          url: '/adoption/printRelieveApproverecord',
          src: 'static/img/relive3.jpg'
        }
      ],
      // 补领收养登记
      printlist8: [
        {
          name: '补领收养登记证明申请书',
          url: '/adoption/printAdditionCertificate',
          src: 'static/img/replacement1.jpg'
        },
        {
          name: '补领收养登记证询问笔录 ',
          url: '/adoption/printAdditionCertificateNotes',
          src: 'static/img/replacement2.jpg'
        },
        {
          name: '补领收养登记证审查处理表',
          url: '/adoption/printAdditionCertificateApproverecord',
          src: 'static/img/replacement3.jpg'
        },
        {
          name: '收养登记证',
          url: '/adoption/printRegistration',
          src: 'static/img/register5.jpg'
        }
      ],
      // 补领解除
      printlist9: [
        {
          name: ' 补领解除收养登记证明申请书',
          url: '/adoption/printAdditionRelieveCertificate',
          src: 'static/img/replacement1.jpg'
        },
        {
          name: '补领解除收养登记证询问笔录',
          url: '/adoption/printAdditionRelieveCertificateNotes',
          src: 'static/img/replacement2.jpg'
        },
        {
          name: '补领解除收养登记证审查处理表',
          url: '/adoption/printAdditionRelieveCertificateApproverecord',
          src: 'static/img/replacement3.jpg'
        }
      ]
    }
  },
  activated () {
    this.adoptionTypeChangeResult = false
    this.isgo = true
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getchildtype()
    this.getadoptionbiztype()
    this.getoffice()
    var that = this
    // window.onresize = function () {
    //   // this.issearch = true
    //   that.setHeight('one', 'oneout')
    // }
  },
  methods: {
    resetFrom () {
      this.searchForm.resetFields()
      this.adoptionTypeChangeResult = false
      this.handleSubmit('search')
    },
    adoptionTypeChange (v) {
      if (v == 8) {
        this.adoptionTypeChangeResult = true
      } else {
        this.adoptionTypeChangeResult = false
      }
    },
    userPageParams () {
      const data = this.searchForm.getFieldsValue()
      this.changetime(data)
      data.queryType = '1'
      return data
    },
    async radiochange (val) {
      const params = {
        id: this.prientData.registrationAdoptionId
      }
      if (
        this.prientData.biztype == '4' ||
        this.prientData.biztype == '8' ||
        this.prientData.biztype == '9'
      ) {
        params.bizId = this.prientData.id
      }
      if (val.target.value == '/adoption/printRegistration') {
        const res = await this.post('/adoption/printRegistrationData', params)
        this.$refs.printCertificateregister.printCertificateInfo = res.data.data
        this.$refs.printCertificateregister.printCertificate()
      } else if (val.target.value == '/adoption/printRelieveAdoptRelationProve') {
        const res = await this.post('/adoption/printRelieveAdoptRelationProveData', params)
        this.$refs.printCertificateRelive.printCertificateInfo = res.data.data
        this.$refs.printCertificateRelive.printCertificate()
      } else {
        let titile = ''
        for (const k in this.printlist) {
          if (this.printlist[k].url == this.radiovalue) {
            titile = this.printlist[k].name
          }
        }
        let url = `${window.faceConfig.basePath}${val.target.value}?id=${this.prientData.registrationAdoptionId}`
        if (
          this.prientData.biztype == '4' ||
          this.prientData.biztype == '8' ||
          this.prientData.biztype == '9'
        ) {
          url += `&&bizId=${this.prientData.id}`
        }
        const Aaa =
          '../../../../../../../static/print.html?src=' +
          url +
          '&&titile=' +
          titile
        window.open(encodeURI(Aaa))
      }
    },
    onCloseP () {
      this.visibleP = false
    },
    prient (val) {
      this.prientData = JSON.parse(JSON.stringify(val))
      this.printlist = this['printlist' + val.biztype]
      this.radiovalue = ''
      this.visibleP = true
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },

    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    seerevoke (val) {
      this.visible = true
      this.reasondis = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          revokeReason: val.revokeReason
        })
      })
    },
    revoke (val) {
      const str = JSON.stringify(val)
      this.nowdata = JSON.parse(str)
      this.visible = true
      this.reasondis = false
    },
    async onok () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.$confirm({
            title: '作废操作完成后，此收养业务事项将不再生效，是否确定作废？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
              const formData = this.form.getFieldsValue()
              const params = {
                bizId: this.nowdata.id,
                adoptBizId: this.nowdata.bizId,
                revokeReason: formData.revokeReason,
                biztype: this.nowdata.biztype
              }
              const data = await this.post('adoption/revokeAdoption', params)
              if (data.errors == null) {
                this.$message.success('作废成功')
                this.form.resetFields()
                this.visible = false
                this.handleSubmit()
              }
            },
            onCancel: () => { },
            class: 'test'
          })
        }
      })
    },
    Issue (obj) {
      this.$confirm({
        title: '设置业务办理状态',
        content: "确定将该数据标记为'已办结'状态？标记后将不可进行修改或作废操作",
        onOk: async () => {
          const params = {
            id: obj.bizId,
            bizType: obj.biztype
          }
          const res = await this.post('/adoption/updateComeOutCardById', params)
          if (res.data.data) {
            this.$message.success('设置状态成功')
            this.handleSubmit()
          }
        },
        onCancel: () => {
        },
        class: 'test'
      })
    },
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    // 获取登记机关 officelist
    async getoffice () {
      const data = await this.post('welfareOrgManagement/listOwnerOrgs')
      this.officelist = data.data.data
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      if (selectedRows.length != 0) {
        if (selectedRows[0].biztype == 1) {
          this.isgo = false
          this.adoptionid = selectedRows[0].id
          this.childId = selectedRows[0].childId
          this.adoptorName = selectedRows[0].childName
          this.registrationAdoptionId = selectedRows[0].registrationAdoptionId
        } else {
          this.isgo = true
        }
      }
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      // this.mixRowSelection.selectedRowKeys = selectedRows
    },
    // 业务类别 ADOPTIONBIZTYPE
    async getadoptionbiztype () {
      const data = await this.getDictionaries('ADOPTIONBIZTYPE')
      this.adoptionbiztypelist = data
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    continueprocessing (val, e, type) {
      // alert(val.biztype)
      switch (val.biztype) {
        case '1':
          var info = !e ? '1' : '0'
          this.$router.push({
            name: 'registration', // 收养登记
            query: {
              id: val.registrationAdoptionId,
              handleType: e || 1,
              additionalYesOrNo: '0',
              info: info
            }
          })
          break
        case '2':
          this.$router.push({
            path: 'relieve', // 解除
            query: {
              wh: '1',
              zcjcsy: '1',
              id: val.registrationAdoptionId,
              otherid: val.bizId, // val.id,
              handleType: e || 1,
              additionalYesOrNo: '0',
              childType: val.adoptionCategory,
              type: type
            }
          })
          break
        case '3':
          this.$router.push({
            path: 'revokeForm', // 撤销收养登记
            query: {
              id: val.registrationAdoptionId,
              isedit: true,
              handleType: e || 1,
              additionalYesOrNo: '0'
            }
          })
          break
        case '4':
          this.$router.push({
            path: 'certificationfrom', // 出具证明
            query: {
              id: val.registrationAdoptionId,
              otherid: val.id,
              handleType: e || 5,
              additionalYesOrNo: '0'
            }
          })
          break
        case '5':
          this.$router.push({
            name: 'registration', // 补录收养
            query: {
              id: val.registrationAdoptionId,
              handleType: e || 1,
              additionalYesOrNo: '1',
              info: '1'
            }
          })
          break
        case '6':
          this.$router.push({
            path: 'relieve', // 补录解除收养
            query: {
              id: val.registrationAdoptionId,
              otherid: val.bizId, // val.id,
              handleType: e || 1,
              zcjcsy: '1',
              childType: val.adoptionCategory,
              additionalYesOrNo: '1',
              islook: '1',
              type: type
            }
          })
          break
        case '7':
          this.$router.push({
            path: 'revokeForm', // 补录作废收养
            query: {
              id: val.registrationAdoptionId,
              handleType: e || 1,
              isedit: true,
              additionalYesOrNo: '1'
            }
          })
          break
        case '8':
          this.$router.push({
            path: 'replacementFrom', // 补领收养
            query: {
              id: val.registrationAdoptionId,
              otherid: val.id,
              handleType: e || 1,
              additionalYesOrNo: '0'
            }
          })
          break
        case '9':
          this.$router.push({
            path: 'replacementnotFrom', // 补领解除
            query: {
              id: val.registrationAdoptionId,
              otherid: val.id,
              handleType: e || 1,
              additionalYesOrNo: '0',
              type: type
            }
          })
          break
      }
    },
    gorecord () {
      this.$router.push({
        path: 'visitrecord',
        query: {
          id: this.adoptionid,
          childId: this.childId,
          adoptorName: this.adoptorName,
          registrationAdoptionId: this.registrationAdoptionId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
