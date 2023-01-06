<!--
 * @Date: 2021-07-01 08:48:10
 * @information: 举办未保工作培训情况
-->
<template>
  <div id="hold-work-train-management"
       class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="培训日期"
                          class="spilwid2"
                          fieldDecoratorId="trainingDate"
                          :labelCol="{span:5}"
                          :wrapperCol="{span:19}">
              <ta-range-picker />
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

    <!-- 新增、编辑、详情侧滑 -->
    <ta-drawer :title="type==0?'新增':(type==1?'编辑':'详情')"
               :width="'500px'"
               :getContainer="setContainer"
               :closable="false"
               @close="onClose"
               :visible="visible">
      <div id="content">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">

          <!-- <AddressComponent :addressmodel="addressmodel"
                            msg="培训地点"
                            :changeOnSelect="true"
                            arealevel="4"
                            :labelwidth="{label: 6, wrapper: 18}"
                            :isRequire="true"
                            fileldName='trainArea'
                            :disabled="disabled"
                            :loadLeafLevel="0"
                            @setaddress="setaddress('trainArea', 'addressmodel')"></AddressComponent> -->

          <ta-form-item label="机构名称"
                        :require="{message:'请选择机构名称'}"
                        fieldDecoratorId="organizationId">
            <ta-select placeholder="请选择机构名称"
                       :disabled="disabled">
              <ta-select-option v-for="(item,index) in organizationIdList"
                                :value="item.orgId"
                                :title="item.orgName"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="培训主题"
                        fieldDecoratorId="trainingTheme"
                        :fieldDecoratorOptions="verificationRules('培训主题', 300)">
            <ta-select placeholder="请选择培训层级"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in trainThemeDic"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="培训时长"
                        fieldDecoratorId="trainingDuration"
                        :fieldDecoratorOptions="verificationRules('培训时长')">
            <ta-select placeholder="请选择培训时长"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in trainDurationDic"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <!-- <ta-form-item label="培训内容"
                        fieldDecoratorId="trainingContent"
                        :fieldDecoratorOptions="verificationRules('培训内容', 300, true)">
            <ta-textarea :rows="4"
                         :disabled="disabled"
                         placeholder="请输入培训内容" />
          </ta-form-item> -->

          <ta-form-item label="培训日期"
                        class="form-item-attent-date"
                        :disabled="disabled"
                        fieldDecoratorId="trainingDate"
                        :fieldDecoratorOptions="verificationRules('培训日期')"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-date-picker placeholder="请选择培训时间" />
          </ta-form-item>

          <ta-form-item label="培训对象"
                        fieldDecoratorId="trainees"
                        :fieldDecoratorOptions="verificationRules('培训对象')">
            <ta-select placeholder="请选择培训对象"
                       mode="multiple"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in trainTargetDic"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="人员数量"
                        fieldDecoratorId="traineesNumber"
                        :fieldDecoratorOptions="verificationRules('人员数量')">
            <ta-input :disabled="disabled"
                      type="number"
                      placeholder="请输入人员数量" />
          </ta-form-item>

          <ta-form-item label="培训地点"
                        fieldDecoratorId="trainingVenue"
                        :fieldDecoratorOptions="verificationRules('培训地点', 300)">
            <ta-input :disabled="disabled"
                      placeholder="请输入培训地点" />
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
import AddressComponent from '@/scopes/project/common/components/addressComponent'
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
    title: '培训主题',
    width: '25%',
    dataIndex: 'trainingTheme',
    overflowTooltip: true
  },
  // {
  //   title: '培训内容',
  //   width: '25%',
  //   dataIndex: 'trainingContent',
  //   overflowTooltip: true
  // },
  {
    title: '培训时长',
    width: '20%',
    dataIndex: 'trainingDuration',
    overflowTooltip: true
  },
  {
    title: '培训日期',
    width: '20%',
    dataIndex: 'trainingDate',
    overflowTooltip: true
  },
  {
    title: '培训对象',
    width: '20%',
    dataIndex: 'traineesName',
    align: 'center',
    // collectionType: 'RESCUEORG_TRAINEES',
    overflowTooltip: true
  },
  // {
  //   title: '参加人员数量',
  //   width: '25%',
  //   dataIndex: 'traineesNumber',
  //   align: 'center',
  //   overflowTooltip: true
  // },
  {
    title: '培训地点',
    width: '25%',
    dataIndex: 'trainingVenue',
    overflowTooltip: true
  },
  {
    title: '登记人员',
    width: '20%',
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
  components: {
    AddressComponent
  },
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
      trainThemeDic: [], // 培训主题字典
      trainDurationDic: [], // 培训时长字典
      trainTargetDic: [], // 培训对象字典
      visible: false,
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/rescueBusinessTraining/list', // 数据列表接口，API地址
        mixAddURL: '/rescueBusinessTraining/save', // 新增接口
        mixEditURL: '/rescueBusinessTraining/update', // 编辑接口
        mixDeleteURL: '/rescueBusinessTraining/updateDelStateById', // 删除接口，API地址
        mixExportURL: '/rescueEmployeeManagement/export' // 导出接口，API地址
      },
      addressmodel: [], // 回显地址列表
      tableRow: {}, // 当前行信息
      trainingType: '03', // 即此菜单标志，后端用此字段区分 业务培训，参与未保工作，举办未保工作菜单 
      userInfo: window.parent.indexTool.getUserInfo(), // 用户信息

    }
  },
  created () {

  },
  mounted () {
    this.fetchDic()
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
     * @Date: 2021-07-01 17:29:19
     * @information: 加载字典
     */
    async fetchDic () {
      this.trainTargetDic = await this.getDictionaries('RESCUEORG_TRAINEES')
      this.trainThemeDic = await this.getDictionaries('RESCUEORG_TRAININGTHEME')
      this.trainDurationDic = await this.getDictionaries('RESCUEORG_TRAININGDURATION')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 16:54:24
     * @information: 获取机构名称字典
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
     * @Date: 2021-07-06 16:54:27
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
     * @Date: 2021-07-01 14:07:22
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
     * @Date: 2021-07-01 14:07:43
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
        model.trainingType = this.trainingType
        model.trainees = model.trainees.join(',')
        if (model.trainingDate) {
          model.trainingDate = moment(model.trainingDate).format('YYYY-MM-DD')
        }
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
     * @Date: 2021-07-01 14:07:57
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
     * @Date: 2021-07-01 14:08:08
     * @information: 导出
     */
    showModal () {
      this.showOn = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:08:18
     * @information: 导出弹窗确定
     */
    async handleOk () {
      let { orgId } = window.parent.indexTool.getUserInfo()
      let formData = this.userPageParams()
      Object.assign(formData, { orgId })
      this.exportFile('/rescueTraining/exportHoldTraining', formData)
      this.showOn = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:08:36
     * @information: 1编辑 2查看
     */
    async edit (val, obj, tp) {
      let res = await this.post('rescueBusinessTraining/queryById', { id: obj.id })
      if (!res.serviceSuccess) return
      let { data } = res.data
      // 处理数据 并暂存此行信息
      obj.organizationId = obj.organizationId && obj.organizationId.replace(/\s/g, '')
      this.tableRow = obj
      // 处理数据
      data.organizationId = data.organizationId && data.organizationId.replace(/\s/g, '')
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
        // 日期处理
        this.form.setFieldsValue({
          trainingDate: moment(data.trainingDate) || null
        })
        // 培训对象格式处理
        this.form.setFieldsValue({
          trainees: data.trainees?.split(',') || []
        })
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:08:46
     * @information: 页码更改
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:09:00
     * @information: 参数
     */
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.trainingType = this.trainingType
      return formData
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 15:15:34
     * @information: 赋值地址
     */
    setaddress (fileName, valueName) {
      this.form.setFieldsValue({
        [fileName]: this[valueName]
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:09:15
     * @information: picker select 父容器
     */
    setPopupContainer () {
      return document.getElementById('content')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:09:22
     * @information: drawer 父容器
     */
    setContainer () {
      return this.set_Container('tadrawer')
    },
  },
}
</script>

<style lang="less">
#hold-work-train-management {
  .form-item-attent-date {
    .ant-calendar-picker {
      width: 100%;
    }
  }
}
</style>