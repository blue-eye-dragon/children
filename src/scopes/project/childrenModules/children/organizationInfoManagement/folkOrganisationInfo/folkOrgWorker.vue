<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <!-- <ta-form-item label="员工编号"
                          fieldDecoratorId="employeeNumber"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入员工编号" />
            </ta-form-item> -->
            <!-- 需求暂未提出
            -->
            <ta-form-item label="所属民间机构"
                          fieldDecoratorId="folkOrgId"
                          :labelCol="{span:9}"
                          class="spilwid"
                          :wrapperCol="{span:15}">

              <ta-select placeholder="请选择所属民间机构">
                <ta-select-option v-for="(item,index) in folkOrgIdList"
                                  :value="item.id"
                                  :key="index">{{item.orgName}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="员工姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入员工姓名" />
            </ta-form-item>
            <ta-form-item>
              <span class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </span>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     @click="add">新增</ta-button>

          <ta-button class="btnleft exportbtn"
                     icon='upload'
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="handleOk"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
        <!-- :rowSelection="mixRowSelection" -->
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="createTime"
                slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="edit(val,obj,'2')"
                  class="com_textsee">查看</span>
            <span @click="edit(val,obj,'1')"
                  class="com_textedit">修改</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- 新增、编辑、详情弹窗 -->
    <div>
      <ta-drawer :title="type==0?'新增':(type==1?'编辑':'详情')"
                 :width="width"
                 :getContainer="setContainer"
                 :closable="false"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="所属民间机构"
                        :require="{message:'请选择所属民间机构'}"
                        fieldDecoratorId="folkOrgId">

            <ta-select placeholder="请选择所属民间机构"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in folkOrgIdList"
                                :value="item.id"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="人员类型"
                        fieldDecoratorId="personnelCategory"
                        :require="{message:'请选择人员类型'}">
            <ta-select placeholder="请选择人员类型"
                       :disabled="disabled"
                       @change="changeType"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in personnelCategoryList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="verificationRules('员工姓名',72)">
            <ta-input :disabled="disabled"
                      placeholder="请输入员工姓名" />
          </ta-form-item>

          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        :fieldDecoratorOptions="rules.idCard">
            <ta-input :placeholder=" '请输入身份证号'"
                      :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday">
            <ta-date-picker :disabledDate="disabledStartDate"
                            style="width: 100%"
                            :disabled="disabled"
                            :placeholder="disabled?'':'请选择出生日期'" />
            <!-- @change="changeAge" -->
          </ta-form-item>
          <div id="content">
            <ta-form-item label="性别"
                          fieldDecoratorId="sex"
                          :require="{message:'请选择性别'}">
              <ta-select placeholder="请选择性别"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in sexList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </div>

          <ta-form-item label="学历"
                        fieldDecoratorId="education"
                        :require="{message:'请选择学历'}">
            <ta-select placeholder="请选择学历"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in educationList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="毕业院校"
                        fieldDecoratorId="professional"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('毕业院校', 20)">
            <ta-input :disabled="disabled"
                      :placeholder="'毕业院校'" />
          </ta-form-item>
          <ta-form-item label="政治面貌"
                        fieldDecoratorId="education"
                        :require="{message:'请选择政治面貌'}">
            <ta-select placeholder="请选择政治面貌"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in educationList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="职称"
                        fieldDecoratorId="theTitle">
            <ta-select placeholder="请选择职称"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in theTitleList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="入职时间"
                        fieldDecoratorId="birthday">
            <ta-date-picker :disabledDate="disabledStartDate"
                            style="width: 100%"
                            :disabled="disabled"
                            :placeholder="disabled?'':'请选择入职时间'" />
            <!-- @change="changeAge" -->
          </ta-form-item>
          <div v-if="legalPersonShow">
            <ta-form-item label="是否法定代表人"
                          :require="{message:'请选择否法定代表人'}"
                          fieldDecoratorId="legalPerson">
              <ta-select placeholder="请选择否法定代表人"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in legalPersonList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </div>
          <div v-if="!legalPersonShow">
            <ta-form-item label="岗位"
                          fieldDecoratorId="jobs"
                          :fieldDecoratorOptions="this.verificationRulesNotMustFill('岗位', 20)">
              <ta-input :disabled="disabled"
                        placeholder="请输入岗位" />
            </ta-form-item>
          </div>
          <ta-form-item label="专业"
                        fieldDecoratorId="professional"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('专业', 20)">
            <ta-input :disabled="disabled" />
          </ta-form-item>
          <ta-form-item label="职业资质"
                        fieldDecoratorId="professionalQualification"
                        :require="{message:'请选择职业资质'}">
            <ta-select placeholder="请选择职业资质"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in professionalQualificationList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="员工编号"
                        hidden
                        fieldDecoratorId="employeeNumber">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-col :span="24">
            <ta-form-item label="无犯罪记录证明">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         :remove="handleRemove"
                         :data="fileData('9','fileList')"
                         :beforeUpload="beforeUpload"
                         @preview="preview"
                         @change="filechange">
                <ta-button :disabled='disabled'>
                  <ta-icon type="upload" />上传文件
                </ta-button>
              </ta-upload>
              <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-col>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="onClose">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="type!=2"
                     @click="submit()">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import moment from 'moment'

const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '所属民间机构',
    width: '13%',
    dataIndex: 'orgName',
    overflowTooltip: true
  },
  {
    title: '姓名',
    width: '13%',
    dataIndex: 'name',
    overflowTooltip: true
  },

  {
    title: '性别',
    width: '10%',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    width: '13%',
    dataIndex: 'birthday',
    overflowTooltip: true
  },
  {
    title: '人员类型',
    width: '13%',
    dataIndex: 'personnelCategory',
    overflowTooltip: true,
    collectionType: 'PERSONNELCATEGORY'
  },
  {
    title: '学历',
    width: '13%',
    dataIndex: 'education',
    overflowTooltip: true,
    collectionType: 'DEGREEEDUCATION'
  },

  {
    title: '职称',
    width: '16%',
    dataIndex: 'theTitle',
    collectionType: 'TITLE',
    overflowTooltip: true
  },
  {
    title: '岗位',
    width: '16%',
    dataIndex: 'jobs',
    overflowTooltip: true
  },

  {
    title: '操作',
    overflowTooltip: false,
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
  // {
  //   title: '员工编号',
  //   width: '13%',
  //   dataIndex: 'employeeNumber',
  //   overflowTooltip: true
  // },
  // {
  //   title: '身份证号',
  //   width: '13%',
  //   dataIndex: 'idCard',
  //   overflowTooltip: true
  // },
  // {
  //   title: '专业',
  //   width: '16%',
  //   dataIndex: 'professional',
  //   overflowTooltip: true
  // },
  // {
  //   title: '职业资质',
  //   width: '16%',
  //   dataIndex: 'professionalQualification',
  //   overflowTooltip: true
  // },
]
export default {
  mixins: [listMixin],
  data () {
    return {
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        }
      },
      legalPersonShow: false,
      personnelCategoryList: [],
      educationList: [],
      theTitleList: [],
      legalPersonList: [],
      folkOrgIdList: [],
      professionalQualificationList: [],

      number: '',
      namename: '',
      showOn: false,
      fileList: [],
      selectedRows: [],
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '600px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/folkOrgEmployeeManagement/list', // 数据列表接口，API地址
        mixAddURL: '/folkOrgEmployeeManagement/save', // 新增接口
        mixEditURL: '/folkOrgEmployeeManagement/update', // 编辑接口
        mixDeleteURL: '/folkOrgEmployeeManagement/updateDelStateById', // 删除接口，API地址
        mixExportURL: '/folkOrgEmployeeManagement/export' // 导出接口，API地址
      },
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      startValue: null,
      nowDate: ''
    }
  },
  mounted () {
    this.getsexList()
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    async idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this, null)
    },
    callbackByIdCard (sex, age, birth) {
      const idCardValue = this.form.getFieldsValue().idCard
      if (!idCardValue) {
        this.form.setFieldsValue({
          birthday: null,
          sex: null
        })
      } else {
        const res = age - 18
        this.form.setFieldsValue({
          birthday: birth ? moment(birth) : null,
          sex: sex
        })
      }
    },

    changeType (v) {
      this.legalPersonShow = v == 1
    },
    handleRemove () { },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) { this.downloadFile(file) },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    setPopupContainer (trigger) {
      return document.getElementById('content')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      this.professionalQualificationList = await this.getDictionaries('VOCATIONALQUALIFICATIONS')
      this.sexList = await this.getDictionaries('SEX')
      this.legalPersonList = await this.getDictionaries('YESNO')
      this.theTitleList = await this.getDictionaries('TITLE')
      this.educationList = await this.getDictionaries('DEGREEEDUCATION')
      this.personnelCategoryList = await this.getDictionaries('PERSONNELCATEGORY')
      const res = await this.post('/folkOrgManagement/folkInfoAll')
      this.folkOrgIdList = res.data.data
      this.getUserOrg()
    },
    async getUnmber () {
      const numberABC = await this.post('/serialApi/getEmployeeNumber')
      this.number = numberABC.data.code
    },
    async add () {
      await this.getUnmber()
      this.visible = true
      this.legalPersonShow = false
      this.$nextTick(() => {
        this.form.setFieldsValue({
          employeeNumber: this.number
        })
      })
      this.nowtype = 1
    },

    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let params = this.form.getFieldsValue()
          this.changetime(params)
          if (this.nowtype == 1) {
            // 新增
            url = this.mixListOptions.mixAddURL
            text = '增加成功'
          } else {
            // 编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          params = this.addother(params)
          const data = await this.post(url, params)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()

            if (
              this.mixListOptions.mixActivatedIsNeed &&
              this.mixListOptions.mixGetDataListIsPage
            ) {
              this.handleSubmit()
            } else if (
              this.mixListOptions.mixActivatedIsNeed &&
              !this.mixListOptions.mixGetDataListIsPage
            ) {
              this.getlist()
            }
            this.fileList = []
          }
        } else {
          this.errfocus(err, this.form)
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    edit (val, obj, tp) {
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      const str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.birthday) {
        obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
        this.changeAge('hello', obj.birthday)
      }
      this.legalPersonShow = obj.personnelCategory == 1
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },

    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
      this.userId = window.parent.indexTool.getUserInfo().userId
      const nowDates = new Date()
      this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    },
    changeAge (value, dateString) {
      // 年龄赋值
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: this.age ? this.age : ''
        })
      })
    },
    showModal () {
      const ss = this.searchForm.getFieldsValue()
      this.namename = ss.name
      this.number = ss.employeeNumber

      this.showOn = true
    },
    handleOk (e) {
      this.Excel()
      this.showOn = false
    },
    handleCancel (e) {
      this.showOn = false
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/folkOrgEmployeeManagement/export', data)
    },
    exports () {
      const ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/rescueEmployeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange (val, val2) {

    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
