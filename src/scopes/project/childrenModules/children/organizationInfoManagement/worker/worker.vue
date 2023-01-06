<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="员工姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入员工姓名" />
            </ta-form-item>
            <ta-form-item class="spilwid">
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <!-- <div class="operateBtn">
          <div style="padding:10px 0;text-align:left">
            <ta-button class="exportbtn upload"
                       icon="upload"
                       @click="showModal">导出</ta-button>
          </div>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="handleOk"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div> -->
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
          <!-- :haveSn="true"
          :rowSelection="mixRowSelection"-->
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="edit(val,obj,'2')"
                  class="com_textsee">查看</span>
            <!-- <ta-divider type="vertical" /> -->
            <span @click="edit(val,obj,'1')"
                  class="com_textedit">修改</span>
            <!-- <ta-divider type="vertical" />
            <ta-popconfirm
              title="确定删除吗?"
              @confirm="deletes(val,obj,index)"
              @cancel="cancel"
              okText="确定"
              cancelText="取消"
            >
              <span class="com_textdel">删除</span>
            </ta-popconfirm>-->
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- <ta-modal title="新增员工" v-model="visible" width="1200px" :footer="null">
      <adoptionReleaseManagement @handleSubmit="handleSubmit()" v-if="visible" :ishide="false"></adoptionReleaseManagement>
    </ta-modal>-->
    <!-- 新增、编辑、详情弹窗 -->
    <div>
      <ta-drawer :title="type==1?'编辑':'详情'"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="员工姓名"
                        fieldDecoratorId="name">
            <!--
              :fieldDecoratorOptions="verificationRules('员工姓名',72)"
            -->
            <ta-input :disabled="true"
                      placeholder="请输入员工姓名" />
          </ta-form-item>
          <ta-form-item hidden
                        label="员工id"
                        fieldDecoratorId="userid">
            <ta-input hidden
                      placeholder="请输入员工姓名" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        :fieldDecoratorOptions="rules.idCard">
            <ta-input :disabled="disabled"
                      placeholder="请输入身份证号" />
          </ta-form-item>

          <ta-form-item label="出生日期"
                        fieldDecoratorId="birthDate">
            <ta-date-picker style="width:100%;"
                            :disabled="disabled"
                            :disabledDate="disabledDate"
                            placeholder="请输入出生日期" />
          </ta-form-item>
          <ta-form-item label="性别"
                        fieldDecoratorId="sex">
            <!-- :require="{message:'请选择性别'}"-->
            <ta-select :disabled="disabled"
                       placeholder="请选择性别">
              <ta-select-option v-for="(item,index) in sexList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="年龄"
                        fieldDecoratorId="age">
            <!-- <ta-input :disabled="disabled" /> -->
            <ta-input-number :min="1"
                             :max="200"
                             :precision="0"
                             style="width:100%"
                             :disabled="disabled" />
          </ta-form-item>
          <!-- :placeholder="disabled?'':'不可编辑，根据出生日期自动计算年龄'" -->
          <ta-form-item label="所属单位"
                        fieldDecoratorId="orgName">
            <!-- :require="{message:'请输入所属单位!'}" -->
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item v-show="false"
                        label="所属单位Id"
                        fieldDecoratorId="orgId">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item label="文化程度"
                        fieldDecoratorId="edutLevel">
            <!-- :require="{message:'请选择性别'}"-->
            <ta-select placeholder="请选择文化程度"
                       :disabled="disabled">
              <ta-select-option v-for="(item,index) in cultureList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="科室"
                        fieldDecoratorId="departMentId"
                        :require="{message:'请选择科室!'}">
            <!--  -->
            <ta-select placeholder="请选择科室"
                       :disabled="disabled">
              <ta-select-option v-for="(item,index) in ksList"
                                :value="item.id"
                                :key="index">{{item.departMentName}}</ta-select-option>
            </ta-select>
            <!-- <ta-input :disabled="disabled" placeholder="请输入科室" /> -->
          </ta-form-item>

          <ta-form-item label="职务"
                        fieldDecoratorId="duty"
                        :fieldDecoratorOptions="verificationRules('职务',50)">
            <ta-input :disabled="disabled"
                      placeholder="请输入职务" />
          </ta-form-item>
          <ta-form-item label="联系方式"
                        fieldDecoratorId="contact"
                        :fieldDecoratorOptions="verificationRules('联系方式',{type: 'phone'})">
            <ta-input :disabled="disabled"
                      placeholder="请输入联系方式" />
          </ta-form-item>
          <!-- <ta-form-item
            label="员工编号"
            fieldDecoratorId="employeeNumber"
            :require="{message:'请输入员工编号!'}"
          >
            <ta-input :disabled="true" />
          </ta-form-item>-->
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
  // {
  //   title: '员工编号',
  //   width: '100px',
  //   dataIndex: 'employeeNumber',
  //   overflowTooltip: true
  // },
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '员工姓名',
    width: '25%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '25%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '科室',
    width: '25%',
    dataIndex: 'departMent',
    collectionType: 'ADMINISTRATIVEOFFICE',
    overflowTooltip: true
  },
  {
    title: '职务',
    width: '25%',
    dataIndex: 'duty',
    collectionType: 'DUTY',
    overflowTooltip: true
  },
  {
    title: '联系方式',
    width: '25%',
    dataIndex: 'contact',
    overflowTooltip: true
  },
  // {
  //   title: '创建时间',
  //   width: '12%',
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
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '500px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/worker/list', // 数据列表接口，API地址
        // mixAddURL: '/employeeManagement/save', // 新增接口
        mixEditURL: '/worker/update', // 编辑接口
        mixDeleteURL: '/worker/updateDelStateById', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            { validator: this.idcardrole }
          ]
        }
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
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: []
    }
  },
  mounted () {
    let nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getCulture()
    this.getksList()
  },
  methods: {
    async getksList () {
      let param = { orgId: window.parent.indexTool.getUserInfo().orgId }
      let res = await this.post('/departMent/list', param)
      if (!res.errors) {
        this.ksList = res.data.pageBean.list
      }
    },
    async idcardrole (rule, value, callback) {
      let _IDRe18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      let _IDre15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
      // 校验身份证：
      if (!value || value == '') {
        callback()
        return false
      }
      if (_IDRe18.test(value) || _IDre15.test(value)) {
        // let data = await this.idcardrule(value)
        // if (data.errors) {
        //   callback(data.errors[0].msg)
        //   this.$emit('setFrom', data.data, value)
        // } else {

        //   if (data.data.data.name) {
        //     if (data.data.data.inputEnabled == 1) {
        //       this.isDisabled = false
        //     } else {
        //       this.isDisabled = true
        //     }
        //   } else {
        //     this.isDisabled = false
        //   }
        //   this.$emit('setFrom', data.data.data, value)

        //   callback()
        // }
        callback()
      } else {
        callback('请输入正确的身份证格式')
      }
    },
    // 身份證验证
    async idcardrule (val) {
      let data = await this.postRules('adoption/checkChildBaseInfo', {
        idCard: val,
        adoptionCategory: this.childtype,
        bizKey: this.id
      })
      return data
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      let endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 文化程度
    async getCulture () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    async edit (val, obj, tp) {
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      let str = JSON.stringify(obj)
      obj = JSON.parse(str)
      let data = await this.post('/worker/queryById', { userId: obj.userid })

      if (data.data.data) {
        obj = data.data.data
      }
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.birthDate) {
        obj.birthDate = moment(obj.birthDate, 'YYYY-MM-DD')
        this.changeAge('hello', obj.birthDate)
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    changeAge (date, dateString) {
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
      let ss = this.searchForm.getFieldsValue()

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
      this.exportFile('/welfareEmployeeManagement/export', data)
    },
    async exports () {
      let ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      return current && current > moment().endOf('day')
    }
  }
}
</script>
