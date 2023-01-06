<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="机构名称"
                          v-if="userInfo.orgType!='98'"
                          fieldDecoratorId="organizationId"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择机构名称">
                <ta-select-option v-for="(item,index) in organizationIdList"
                                  :value="item.orgId"
                                  :title="item.orgName"
                                  :key="index">{{item.orgName}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入人员姓名" />
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
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="createTime"
                slot-scope="a">
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
                 :width="'500px'"
                 :getContainer="setContainer"
                 :closable="false"
                 @close="onClose"
                 :visible="visible">
        <div id="content">
          <ta-form :autoFormCreate="(form)=>{this.form = form}"
                   layout="horizontal">
            <ta-form-item label="机构名称"
                          fieldDecoratorId="organizationId"
                          :require="{message:'请选择机构名称'}">
              <ta-select placeholder="请选择机构名称"
                         :disabled="userInfo.orgType=='98'||disabled"
                         :getPopupContainer="setPopupContainer"
                         @change="organizationIdChange">
                <ta-select-option v-for="(item,index) in organizationIdList"
                                  :value="item.orgId"
                                  :title="item.orgName"
                                  :tag="item"
                                  :key="index">{{item.orgName}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="员工姓名"
                          fieldDecoratorId="name"
                          :fieldDecoratorOptions="verificationRules('员工姓名',72)">
              <ta-input :disabled="disabled"
                        placeholder="请输入员工姓名" />
            </ta-form-item>

            <ta-form-item label="是否负责人/法人"
                          fieldDecoratorId="isNotLegal"
                          :require="{message:'请选择是否负责人/法人'}">
              <ta-select placeholder="请选择是否负责人/法人"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in yesNoList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday">
              <ta-date-picker :disabledDate="disabledStartDate"
                              :getCalendarContainer="setPopupContainer"
                              @change="changeAge"
                              style="width: 100%"
                              :disabled="disabled"
                              :placeholder="disabled?'':'请选择出生日期'" />
            </ta-form-item>
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
            <ta-form-item label="年龄(岁)"
                          fieldDecoratorId="age">
              <ta-input :placeholder="disabled?'':'不可编辑，根据出生日期自动计算年龄'"
                        :disabled="true" />
            </ta-form-item>
            <!-- <ta-form-item label="所属单位"
                          fieldDecoratorId="orgName"
                          :require="{message:'请输入所属单位'}">
              <ta-input :disabled="true" />
            </ta-form-item> -->
            <ta-form-item v-show="false"
                          label="所属单位Id"
                          fieldDecoratorId="orgId"
                          :require="{message:'请输入所属单位'}">
              <ta-input :disabled="true" />
            </ta-form-item>

            <ta-form-item label="科室"
                          fieldDecoratorId="department">
              <ta-input :disabled="disabled"
                        placeholder="请输入科室" />
            </ta-form-item>
            <ta-form-item label="职务"
                          fieldDecoratorId="post"
                          :fieldDecoratorOptions="verificationRules('职务',50)">
              <ta-input :disabled="disabled"
                        placeholder="请输入职务" />
            </ta-form-item>

            <ta-form-item label="第一学历"
                          fieldDecoratorId="education"
                          :require="{message:'请选择第一学历'}">
              <ta-select placeholder="请选择第一学历"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in educationList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="最终学历"
                          fieldDecoratorId="finalEducation"
                          :require="{message:'请选择最终学历'}">
              <ta-select placeholder="请选择最终学历"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in educationList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <!-- <ta-form-item label="职称"
                        fieldDecoratorId="theTitle">
            <ta-select placeholder="请选择职称"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in theTitleList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item> -->
            <ta-form-item label="专业"
                          fieldDecoratorId="professional"
                          :fieldDecoratorOptions="this.verificationRulesNotMustFill('专业', 20)">
              <ta-input :disabled="disabled" />
            </ta-form-item>

            <ta-form-item label="联系方式"
                          fieldDecoratorId="telephone"
                          :fieldDecoratorOptions="verificationRules('联系方式',{type: 'phone'})">
              <ta-input :disabled="disabled"
                        placeholder="请输入联系方式" />
            </ta-form-item>
            <!-- <ta-form-item label="员工编号"
                          fieldDecoratorId="employeeNumber"
                          :require="{message:'请输入员工编号'}">
              <ta-input :disabled="disabled"
                        placeholder="请输入员工编号" />
            </ta-form-item> -->
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
            <ta-form-item label="是否有社工证"
                          fieldDecoratorId="isNotSocialWorkCard"
                          :require="{message:'请选择是否有社工证'}">
              <ta-select placeholder="请选择是否有社工证"
                         :disabled="disabled"
                         :getPopupContainer="setPopupContainer">
                <ta-select-option v-for="(item,index) in yesNoList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
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
          </ta-form>
        </div>
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
    title: '机构名称',
    width: '13%',
    dataIndex: 'organizationName',
    overflowTooltip: true
  },
  {
    title: '员工姓名',
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
    title: '科室',
    width: '13%',
    dataIndex: 'department',
    overflowTooltip: true
  },
  {
    title: '职务',
    width: '13%',
    dataIndex: 'post',
    overflowTooltip: true
  }, {
    title: '是否负责人/法人',
    width: '13%',
    dataIndex: 'isNotLegal',
    collectionType: 'YESNO',
    overflowTooltip: true
  },
  {
    title: '联系方式',
    width: '13%',
    dataIndex: 'telephone',
    overflowTooltip: true
  },
  {
    title: '创建时间',
    width: '13%',
    dataIndex: 'createTime',
    overflowTooltip: true,
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '登记人员',
    width: '16%',
    dataIndex: 'createUser',
    overflowTooltip: true
  },
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
      showOn: false,
      selectedRows: [],
      page: 1,
      size: 10,
      sexList: [], // 性别字典数据
      organizationIdList: [], // 机构名称字典数据
      vocationalQualificationsList: [], // 职业资质字典数据
      yesNoList: [], // 是否字典数据
      compilationMethodList: [], // 编制方式字典数据
      visible: false,
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/rescueEmployeeManagement/list', // 数据列表接口，API地址
        mixAddURL: '/rescueEmployeeManagement/save', // 新增接口
        mixEditURL: '/rescueEmployeeManagement/update', // 编辑接口
        mixDeleteURL: '/rescueEmployeeManagement/updateDelStateById', // 删除接口，API地址
        mixExportURL: '/rescueEmployeeManagement/export' // 导出接口，API地址
      },
      mixColumns,
      mixPageRef: 'gridPager',
      id: '',
      mixDataList: [],
      theTitleList: [],
      educationList: [],
      userInfo: window.parent.indexTool.getUserInfo(), // 用户信息
      orgName: '', // 机构名称数据
      orgPersonType: '01', // 即此菜单标志，后端用此字段区分 工作人员信息管理 和社工人员菜单
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {

    // 获取字典数据
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') //  获取性别字典数据
      this.vocationalQualificationsList = await this.getDictionaries('VOCATIONALQUALIFICATIONS') // 获取职业资质字典数据
      this.yesNoList = await this.getDictionaries('YESNO') // 获取是否字典数据
      this.compilationMethodList = await this.getDictionaries('COMPILATIONMETHOD') // 获取编制方式字典数据

      this.theTitleList = await this.getDictionaries('TITLE')

      // 学历字典并处理
      let educationDic = await this.getDictionaries('DEGREEEDUCATION')
      this.educationList = this.handleEducationListDic(educationDic)
    },
    // 初始化数据
    initData () {
      // 获取机构名称
      if (this.userInfo.orgType == '01') { // 民政局用户
        this.post('rescueEmployeeManagement/queryProtectOrgList').then(res => {
          if (res.serviceSuccess) {
            this.organizationIdList = this.handleOrgDicData(res.data.data)
          }
        })
      } else {
        this.organizationIdList = [
          {
            orgId: this.userInfo.orgId,
            orgName: this.userInfo.orgName
          }
        ]
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 15:20:15
     * @information: 处理字典数据 - 学历
     */
    handleEducationListDic (data) {
      return data.filter(el => !['90', '91'].includes(el.value))
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-05 14:04:51
     * @information: 处理字典数据 - 机构
     */
    handleOrgDicData (data) {
      return data.map(el => {
        el.orgId = el.orgId.replace(/\s/g, '')
        return { ...el }
      })
    },
    // 提交
    submit () {
      this.form.validateFields((err) => {
        if (!err) {
          let url = this.mixListOptions.mixAddURL
          let text = '增加成功'
          const params = this.form.getFieldsValue()
          params.organizationName = this.userInfo.orgType == '98' ? this.userInfo.orgName : this.orgName
          params.orgPersonType = this.orgPersonType
          if (this.userInfo.orgType == '98') {
            params.organizationId = this.userInfo.orgId
          }
          this.changetime(params)
          if (this.nowtype != 1) {
            // 编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          this.post(url, params, true).then(res => {
            if (res.serviceSuccess) {
              this.$message.success(text)
              this.onClose()
              this.handleSubmit()
            }
          })
        } else {
          this.errfocus(err, this.form)
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 机构名称change
    organizationIdChange (e, o) {
      this.orgName = o.data.attrs.tag.orgName
    },
    setPopupContainer () {
      return document.getElementById('content')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = moment(new Date()).format('YYYY-MM-DD')
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    async add () {
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          organizationId: this.userInfo.orgType == '98' ? this.userInfo.orgId : [],
          orgId: this.userInfo.orgId,
          orgName: this.userInfo.orgName
        })
        this.organizationIdList.length && this.form.setFieldsValue({
          organizationId: this.organizationIdList[0].orgId
        })
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
      // 处理数据
      obj.organizationId = obj.organizationId.replace(/\s/g, '')
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      const str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      obj.birthday = obj.birthday ? moment(obj.birthday, 'YYYY-MM-DD') : null
      this.visible = true
      this.nowtype = 2
      this.orgName = obj.organizationName
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    changeAge (value, dateString) {
      // 年龄赋值
      var birthDayTime = moment(dateString).format('YYYY-MM-DD').split('-').join('')
      var nowTime = moment().format('YYYY-MM-DD').split('-').join('')
      const ageTime = (nowTime - birthDayTime) + ''
      const age = ageTime.substring(0, ageTime.length - 4)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: age || 0
        })
      })
    },
    showModal () {
      const ss = this.searchForm.getFieldsValue()
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
      data.areaId = window.parent.indexTool.getUserInfo().areaId
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      this.exportFile('/rescueEmployeeManagement/export', data)
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.areaId = window.parent.indexTool.getUserInfo().areaId
      formData.orgType = window.parent.indexTool.getUserInfo().orgType
      formData.orgPersonType = this.orgPersonType
      this.changetime(formData)
      return formData
    }
  }
}
</script>
