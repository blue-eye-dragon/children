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
            <ta-form-item label="员工姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入员工姓名" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增</ta-button>
          <ta-button class="btnleft exportbtn"
                     icon="upload"
                     @click="showModal">批量导出</ta-button>
          <!-- <ta-button class="btnleft">批量导出</ta-button> -->

          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="handleOk"
                    @cancel="handleCancel">
            <!-- <div v-if="number||namename">
                <h3>确认导出当前条件下的全部有效数据吗？</h3>
                <P>员工编号 : {{number}}</P>
                <p>员工姓名 : {{namename}}</p>
              </div>
              <div v-if="!number&&!namename">
                <h3>确认导出全部有效数据吗？</h3>
              </div>-->
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
        <!-- :rowSelection="mixRowSelection"     :haveSn="true"-->
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
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
        <ta-pagination :defaultCurrent="page"
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
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">

          <ta-form-item label="员工姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="verificationRules('员工姓名',72)">
            <!--
            -->
            <ta-input :disabled="disabled"
                      placeholder="请输入员工姓名" />
          </ta-form-item>
          <div id="time">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday">
              <ta-date-picker :disabledDate="disabledStartDate"
                              @change="changeAge"
                              style="width: 100%"
                              :disabled="disabled"
                              :placeholder="disabled?'':'请选择出生日期'" />
            </ta-form-item>
          </div>
          <div id="content">
            <ta-form-item label="性别"
                          fieldDecoratorId="sex"
                          :require="{message:'请选择性别'}">
              <!-- -->

              <ta-select placeholder="请选择性别"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in sexList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>

            </ta-form-item>
          </div>
          <ta-form-item label="年龄(岁)"
                        fieldDecoratorId="age">
            <ta-input :placeholder="disabled?'':'不可编辑，根据出生日期自动计算年龄'"
                      :disabled="true" />
          </ta-form-item>
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
          <ta-form-item label="专业"
                        fieldDecoratorId="professional"
                        :require="{message:'请选择专业'}">
            <ta-input :placeholder="'请输入专业'"></ta-input>
            <!-- <ta-select placeholder="请选择专业"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in professionalList"
                                :value="item.id"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select> -->

          </ta-form-item>
          <ta-form-item label="职称"
                        fieldDecoratorId="title"
                        :require="{message:'请选择职称'}">

            <ta-select placeholder="请选择职称"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in titleList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>
          <ta-form-item label="是否负责人/法定代表人"
                        fieldDecoratorId="isNotLegal"
                        :labelCol="{ span: 12 }"
                        :wrapperCol="{ span: 12 }"
                        :require="{message:'请选择是否负责人/法定代表人'}">

            <ta-select placeholder="请选择是否负责人/法定代表人"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in yesNoList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>
          <ta-form-item label="编制方式"
                        fieldDecoratorId="compilationMethod"
                        :require="{message:'请选择编制方式'}">

            <ta-select placeholder="请选择编制方式"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in compilationMethodList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>
          <ta-form-item label="岗位类型"
                        fieldDecoratorId="stationType"
                        :require="{message:'请选择岗位类型'}">

            <ta-select placeholder="请选择岗位类型"
                       :disabled="disabled"
                       @change="changestation"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in stationTypeList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>
          <ta-form-item label="护理级别"
                        v-if="isshowState"
                        fieldDecoratorId="nurseLevel"
                        :require="{message:'请选择护理级别'}">

            <ta-select placeholder="请选择护理级别"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in nurseLevelList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>
          <ta-form-item label="是否孤残儿童护理员"
                        v-if="isshowState"
                        fieldDecoratorId="isOrphanNurser"
                        :require="{message:'请选择是否孤残儿童护理员'}">

            <ta-select placeholder="请选择是否孤残儿童护理员"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in yesNoList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>
          <ta-form-item label="职业资质"
                        fieldDecoratorId="vocationalQualifications"
                        :require="{message:'请选择职业资质'}">

            <ta-select placeholder="请选择职业资质"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in vocationalQualificationsList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>

          </ta-form-item>

          <div v-if="this.orgType=='99'">
            <ta-form-item label="所属机构"
                          fieldDecoratorId="orgName"
                          :require="{message:'请输入所属机构!'}">
              <ta-input :disabled="true" />
            </ta-form-item>
            <ta-form-item v-show="false"
                          label="所属单位Id"
                          fieldDecoratorId="orgId"
                          :require="{message:'请输入所属单位!'}">
              <ta-input :disabled="true" />
            </ta-form-item>
          </div>
          <div v-else>

            <ta-form-item label="所属机构"
                          fieldDecoratorId="orgId"
                          :require="{message:'请选择所属机构'}">

              <ta-select placeholder="请选择所属机构"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in orgIdList"
                                  :value="item.id"
                                  :key="index">{{item.orgName}}</ta-select-option>
              </ta-select>

            </ta-form-item>
          </div>
          <ta-form-item label="科室"
                        fieldDecoratorId="department"
                        :fieldDecoratorOptions="verificationRules('科室',50)">
            <!--  -->

            <ta-input :disabled="disabled"
                      placeholder="请输入科室" />
          </ta-form-item>

          <ta-form-item label="职务"
                        fieldDecoratorId="post"
                        :fieldDecoratorOptions="verificationRules('职务',50)">
            <ta-input :disabled="disabled"
                      placeholder="请输入职务" />
          </ta-form-item>
          <ta-form-item label="联系方式"
                        fieldDecoratorId="telephone"
                        :fieldDecoratorOptions="verificationRules('联系方式',{type: 'phone'})">

            <ta-input :disabled="disabled"
                      placeholder="请输入联系方式" />
          </ta-form-item>
          <ta-form-item label="员工编号"
                        hidden
                        fieldDecoratorId="employeeNumber"
                        :require="{message:'请输入员工编号!'}">
            <ta-input hidden
                      :disabled="true" />
          </ta-form-item>
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
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  // {
  //   title: '员工编号',
  //   width: '12%',
  //   dataIndex: 'employeeNumber',
  //   overflowTooltip: true
  // },
  {
    title: '员工姓名',
    width: '13%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '10%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '机构名称',
    width: '16%',
    dataIndex: 'orgName',
    overflowTooltip: true
  },
  {
    title: '科室',
    width: '12%',
    dataIndex: 'department',
    overflowTooltip: true
  },
  {
    title: '职务',
    width: '12%',
    dataIndex: 'post',
    overflowTooltip: true
  },
  {
    title: '联系方式',
    width: '12%',
    dataIndex: 'telephone',
    overflowTooltip: true
  },
  // {
  //   title: '创建时间',
  //   width: '24%',
  //   align: 'center',
  //   dataIndex: 'createTime',
  //   overflowTooltip: true
  // },
  // {
  //   title: '操作员',
  //   width: '12%',
  //   dataIndex: 'createUser',
  //   overflowTooltip: true
  // },
  {
    title: '操作',
    overflowTooltip: false,
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      yesNoList: [],
      educationList: [],
      professionalList: [],
      titleList: [],
      compilationMethodList: [],
      stationTypeList: [],
      vocationalQualificationsList: [],
      nurseLevelList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      isshowState: false,
      width: '500px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/employeeManagement/list', // 数据列表接口，API地址
        mixAddURL: '/employeeManagement/save', // 新增接口
        mixEditURL: '/employeeManagement/update', // 编辑接口
        mixDeleteURL: '/employeeManagement/updateDelStateById', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
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
      nowDate: '',
      orgType: '',
      orgIdList: []
    }
  },
  activated () {
    this.orgIdList = []
    this.orgType = window.parent.indexTool.getUserInfo().orgType
    if (this.orgType != '99') {
      this.getOrgList()
    }
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
  },
  methods: {
    async getOrgList () {
      const List = await this.post('/orgEstablishRegister/list', { areaCode: window.parent.indexTool.getUserInfo().areaId, state: '1' })
      List.data.pageBean.list.forEach((e, i) => {
        e.id = e.id.trim()
        this.orgIdList.push(e)
      })
    },
    setPopupContainer (trigger) {
      // trigger为触发弹出框的节点

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
    changestation (e) {
      if (e == '07') {
        this.isshowState = true
      } else {
        this.isshowState = false
      }
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName

      this.sexList = await this.getDictionaries('SEX')
      this.yesNoList = await this.getDictionaries('YESNO')
      this.educationList = await this.getDictionaries('DEGREEEDUCATION')
      // this.professionalList = await this.getDictionaries('')
      this.titleList = await this.getDictionaries('TITLE')
      this.compilationMethodList = await this.getDictionaries('COMPILATIONMETHOD_WELFARE')
      this.stationTypeList = await this.getDictionaries('STATIONTYPE')
      this.vocationalQualificationsList = await this.getDictionaries('VOCATIONALQUALIFICATIONS_WELFARE')
      this.nurseLevelList = await this.getDictionaries('NURSELEVEL')
    },
    async getUnmber () {
      const numberABC = await this.post('/serialApi/getEmployeeNumber')
      this.number = numberABC.data.code
    },
    async add () {
      await this.getUnmber()
      this.visible = true
      this.isshowState = false
      let ini = {
        employeeNumber: this.number
      }
      if (this.orgType == '99') {
        ini = {
          ...ini, ...{ orgId: this.orgId, orgName: this.orgName }
        }
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(ini)
      })

      this.nowtype = 1
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    edit (val, obj, tp) {
      this.type = 1
      this.isshowState = false
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      const str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.stationType == '07') {
        this.isshowState = true
      } else {
        this.isshowState = false
      }
      if (obj.birthday) {
        obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
        this.changeAge('hello', obj.birthday)
      }
      obj.orgId = obj.orgId.trim()
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    changeAge (date, dateString) {
      const birthdays = new Date(dateString)
      const d = new Date()
      this.age =
        d.getFullYear() -
        birthdays.getFullYear() -
        (d.getMonth() < birthdays.getMonth() ||
          (d.getMonth() == birthdays.getMonth() &&
            d.getDate() < birthdays.getDate())
          ? 1
          : 0)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: this.age ? this.age : '0'
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
      data.orgType = this.orgType
      this.exportFile('/welfareEmployeeManagement/export', data)
    },
    async exports () {
      const ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
