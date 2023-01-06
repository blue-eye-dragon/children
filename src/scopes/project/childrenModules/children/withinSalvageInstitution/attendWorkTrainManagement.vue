<!--
 * @Date: 2021-07-01 08:47:26
 * @information: 参加未保工作培训情况
-->
<template>
  <div id="attend-work-train-management"
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

          <ta-form-item label="机构名称"
                        :require="{message:'请选择机构名称'}"
                        fieldDecoratorId="organizationId"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-select placeholder="请选择机构名称"
                       :disabled="disabled"
                       @change="onChangeOrganization">
              <ta-select-option v-for="(item,index) in organizationIdList"
                                :value="item.orgId"
                                :title="item.orgName"
                                :key="index">{{item.orgName}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="培训主题"
                        fieldDecoratorId="trainingTheme"
                        :fieldDecoratorOptions="verificationRules('培训主题')"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
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
                        :fieldDecoratorOptions="verificationRules('培训时长')"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
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
                        :fieldDecoratorOptions="verificationRules('培训内容', 300, true)"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-textarea :rows="4"
                         :disabled="disabled"
                         placeholder="请输入培训内容" />
          </ta-form-item> -->

          <ta-form-item label="培训日期"
                        :disabled="disabled"
                        class="form-item-attent-date"
                        fieldDecoratorId="trainingDate"
                        :fieldDecoratorOptions="verificationRules('培训日期')"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-date-picker placeholder="请选择培训日期" />
          </ta-form-item>

          <!-- <ta-form-item label="人员数量(人)"
                        fieldDecoratorId="traineesNumber"
                        :fieldDecoratorOptions="verificationRules('人员数量')"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input :disabled="disabled"
                      type="number"
                      placeholder="请输入人员数量" />
          </ta-form-item> -->

          <ta-form-item label="培训层级"
                        fieldDecoratorId="trainingLevel"
                        :require="{message:'请选择培训层级'}"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-select placeholder="请选择培训层级"
                       :disabled="disabled"
                       :getPopupContainer="setPopupContainer">
              <ta-select-option v-for="(item,index) in trainLevelDic"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="培训人员"
                        required
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-button :disabled="disabled"
                       @click="onSelectPerson">选择</ta-button>
          </ta-form-item>

          <ta-form-item v-show="selectedPersonArr.length"
                        label="已选择"
                        class="form-item_list-person">
            <div class="list-person">
              <div class="item-person"
                   v-for="(item, index) in selectedPersonArr"
                   :key="index">
                {{item.name}}
                <div v-if="!disabled"
                     class="item-person_icon"
                     title="点击移除"
                     @click="onDelPerson(item, index)">X</div>
              </div>
            </div>
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

    <!-- 选择人员弹窗 -->
    <ta-modal title="选择人员"
              :visible="isShowSelectPersonModal"
              width="80%"
              height="760px"
              :footer="null"
              @cancel="isShowSelectPersonModal=false">
      <selectPerson v-if="isShowSelectPersonModal"
                    ref="selectPersonRef"
                    :selectedOrganizationId="selectedOrganizationId"
                    :selectedPersonArr="selectedPersonArr"
                    @onAddPerson="onAddPerson"></selectPerson>
    </ta-modal>

  </div>
</template>

<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import moment from 'moment'
import selectPerson from './components/selectPerson'

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
    width: '20%',
    dataIndex: 'trainingTheme',
    overflowTooltip: true
  },
  // {
  //   title: '培训内容',
  //   width: '20%',
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
  // {
  //   title: '参加人员数量',
  //   width: '20%',
  //   dataIndex: 'traineesNumber',
  //   align: 'center',
  //   overflowTooltip: true
  // },
  {
    title: '培训层级',
    width: '20%',
    dataIndex: 'trainingLevel',
    collectionType: 'RESCUEORG_TRAININGLEVEL',
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
    selectPerson
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
      trainLevelDic: [], // 培训层级字典
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
      tableRow: {}, // 当前行信息
      trainingType: '02', // 即此菜单标志，后端用此字段区分 业务培训，参与未保工作，举办未保工作菜单 
      userInfo: window.parent.indexTool.getUserInfo(), // 用户信息

      selectedOrganizationId: null, // 已选择的机构id
      selectedPersonArr: [], // 已选择的人员信息
      isShowSelectPersonModal: false, // 选择人员弹窗开关
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
      this.selectedPersonArr = []
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 17:29:19
     * @information: 加载字典
     */
    async fetchDic () {
      this.trainLevelDic = await this.getDictionaries('RESCUEORG_TRAININGLEVEL')
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
        // 校验人员
        if (!this.selectedPersonArr.length) {
          this.$message.error('请选择培训人员')
          return
        }
        let { id } = this.tableRow
        let { mixAddURL, mixEditURL } = this.mixListOptions
        const model = this.form.getFieldsValue()
        // 菜单标志
        model.trainingType = this.trainingType
        // 人员id
        model.trainers = this.selectedPersonArr.map(el => el.id) || []
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
      this.selectedPersonArr = []
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
      this.exportFile('/rescueTraining/exportJoinTraining', formData)
      this.showOn = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-01 14:08:36
     * @information: 1编辑 2查看
     */
    async edit (val, obj, tp) {
      let res = await this.post('/rescueBusinessTraining/queryById', { id: obj.id })
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
        // 人员
        this.selectedPersonArr = data.rescueEmployeeManagementVos || []
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

    /**
     * @author: yinpengfei
     * @Date: 2021-07-07 11:18:32
     * @information: 机构更改时
     */
    onChangeOrganization (val) {
      this.selectedPersonArr = []
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 17:24:24
     * @information: 点击选择时
     */
    onSelectPerson () {
      let { organizationId } = this.form.getFieldsValue()
      if (!organizationId) {
        this.$message.warning('请先选择机构名称')
        return
      }
      this.selectedOrganizationId = organizationId.replace(/\s/g, '')
      this.isShowSelectPersonModal = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:01:17
     * @information: 侧滑中X号被点击 - 移除人员
     */
    onDelPerson (item, index) {
      this.selectedPersonArr.splice(index, 1)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-06 18:57:26
     * @information: 添加人员
     */
    onAddPerson ({ arr, msgText, isTotal }) {
      if (isTotal) { // 全部添加
        arr.forEach(el => {
          let mark = this.selectedPersonArr.some(item => item.id == el.id)
          !mark && this.selectedPersonArr.push(el)
        })
      } else { // 非全部添加
        // 判重
        let reName = ''
        let mark = this.selectedPersonArr.some(el => {
          return arr.some(item => {
            if (el.id == item.id) {
              reName = el.name
              return true
            }
            return false
          })
        })
        if (mark && reName) {
          this.$message.warning(`该人员(${reName})已添加至列表中，请重新选择`)
          return
        }
        this.selectedPersonArr.push(...arr)
      }
      this.$message.success(msgText || '数据添加成功')
    },
  },
}
</script>

<style lang="less">
#attend-work-train-management {
  .form-item-attent-date {
    .ant-calendar-picker {
      width: 100%;
    }
  }

  .form-item_list-person {
    .ant-form-item-control-wrapper {
      margin-top: 8px;
    }

    .list-person {
      display: flex;
      flex-wrap: wrap;
    }

    .item-person {
      margin: 5px 8px;
      padding: 2px 8px;
      border-radius: 4px;
      cursor: default;
      background-color: #c0d5f5;
      position: relative;

      .item-person_icon {
        width: 19px;
        height: 19px;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        top: -7px;
        right: -7px;
        color: #ef363c;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgb(167, 164, 164);
        }
      }
    }
  }
}
</style>