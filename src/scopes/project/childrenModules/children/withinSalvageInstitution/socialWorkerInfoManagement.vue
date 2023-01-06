<!--
 * @Date: 2021-07-01 08:46:34
 * @information: 社工人员信息管理
-->
<template>
  <div id="social-worker-info-management"
       class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入社工人员姓名" />
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
                    @cancel="showOn = false">
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
                        :require="{message:'请选择机构名称'}"
                        fieldDecoratorId="organizationId">
            <ta-select placeholder="请选择机构名称"
                       :disabled="disabled"
                       @change="onChangeOrganizationId">
              <ta-select-option v-for="(item,index) in organizationIdList"
                                :value="item.orgId"
                                :title="item.orgName"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="verificationRules('姓名',72)">
            <ta-input :disabled="disabled"
                      placeholder="请输入姓名"
                      @blur="onBlur('name')" />
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

          <ta-form-item label="专业"
                        fieldDecoratorId="professional">
            <ta-input :placeholder="disabled ? '': '请输入专业'"
                      :disabled="disabled" />
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

          <ta-form-item label="联系方式"
                        fieldDecoratorId="telephone"
                        :fieldDecoratorOptions="verificationRules('联系方式',{type: 'phone'})">
            <ta-input :disabled="disabled"
                      placeholder="请输入联系方式" />
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
</template>

<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'

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
    width: '25%',
    dataIndex: 'organizationName',
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
    width: '8%',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '第一学历',
    width: '13%',
    dataIndex: 'education',
    collectionType: 'DEGREEEDUCATION',
    overflowTooltip: true
  },
  {
    title: '专业',
    width: '16%',
    dataIndex: 'professional',
    overflowTooltip: true
  },
  {
    title: '是否有社工证',
    width: '14%',
    dataIndex: 'isNotSocialWorkCard',
    collectionType: 'YESNO',
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
    width: '25%',
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
      mixColumns,
      mixDataList: [],
      mixPageRef: 'gridPager',
      showOn: false,
      selectedRows: [],
      page: 1,
      size: 10,
      organizationIdList: [], // 机构名称字典数据
      sexList: [], // 性别字典数据
      educationList: [], // 学历字典
      yesNoList: [], // 是否字典数据
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
      tableRow: {}, // 当前行信息
      orgPersonType: '02', // 即此菜单标志，后端用此字段区分 工作人员信息管理 和社工人员菜单
      userInfo: window.parent.indexTool.getUserInfo(), // 用户信息

    }
  },
  created () {

  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  activated () {
    this.initData()
    this.fetchOrgList()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:35:38
     * @information: 初始化数据
     */
    initData () {
      this.showOn = false
      this.visible = false
      this.type = 0
      this.disabled = false
      this.tableRow = {}
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:34:22
     * @information: 获取字典
     */
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX')
      this.yesNoList = await this.getDictionaries('YESNO')

      // 学历字典并处理
      let educationDic = await this.getDictionaries('DEGREEEDUCATION')
      this.educationList = this.handleEducationListDic(educationDic)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-02 11:49:49
     * @information: 机构名称字典数据
     */
    async fetchOrgList () {
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
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:08:45
     * @information: 新增
     */
    add () {
      this.type = 0
      this.visible = true
      this.$nextTick(() => {
        this.organizationIdList.length && this.form.setFieldsValue({
          organizationId: this.organizationIdList[0].orgId
        })
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-02 09:21:52
     * @information: 失焦
     */
    async onBlur (val, orgId) {
      let formData = this.form.getFieldsValue()
      if (!formData.organizationId || !formData[val]) return
      const model = {
        name: formData[val],
        resuceOrgId: formData.organizationId || orgId
      }
      let { data, serviceSuccess } = await this.post('rescueEmployeeManagement/queryWorkerNameExistBySocialName', model)
      if (serviceSuccess && data.data) {
        this.$message.warning(`该社工人员与机构工作人员(${formData[val]})重名，请确认是否为同一人`)
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-02 09:55:29
     * @information: 机构变化时
     */
    onChangeOrganizationId (val) {
      this.$nextTick(() => {
        this.onBlur('name', val)
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:32:54
     * @information: 侧滑 确定
     */
    submit () {
      this.form.validateFields(async (err) => {
        if (err) {
          this.$message.error('校验不通过，无法提交，请再次检查')
          return;
        }
        let { id } = this.tableRow
        let { mixAddURL, mixEditURL } = this.mixListOptions
        const model = this.form.getFieldsValue()
        model.orgPersonType = this.orgPersonType
        // 配置项
        let configArr = [
          { type: 0, api: mixAddURL, msg: '新增成功' }, // 新增
          { type: 1, api: mixEditURL, msg: '修改成功' }, // 修改
        ]
        let obj = configArr.find(el => el.type == this.type)
        if (!obj) return
        let { api, msg } = obj
        this.type == 1 && (model.id = id)
        let res = await this.post(api, model, true)
        if (res.serviceSuccess) {
          this.$message.success(msg)
          this.onClose()
          this.handleSubmit()
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:37:42
     * @information: 侧滑关闭
     */
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:09:24
     * @information: 导出
     */
    showModal () {
      this.showOn = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:09:55
     * @information: 导出弹窗确定
     */
    async handleOk () {
      let { areaId, orgType } = window.parent.indexTool.getUserInfo()
      let formData = this.userPageParams()
      Object.assign(formData, { areaId, orgType })
      this.exportFile('/rescueEmployeeManagement/exportSocial', formData)
      this.showOn = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:10:30
     * @information: 1编辑 2查看
     */
    edit (val, obj, tp) {
      // 处理数据
      obj.organizationId = obj.organizationId.replace(/\s/g, '')
      this.tableRow = obj
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:11:55
     * @information: 页码更改
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:11:52
     * @information: 参数
     */
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.orgPersonType = this.orgPersonType
      this.changetime(formData)
      return formData
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:15:13
     * @information: picker select 父容器
     */
    setPopupContainer () {
      return document.getElementById('content')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 10:16:18
     * @information: drawer 父容器
     */
    setContainer () {
      return this.set_Container('tadrawer')
    },


  },
}
</script>

<style lang="less">
#social-worker-info-management {
}
</style>