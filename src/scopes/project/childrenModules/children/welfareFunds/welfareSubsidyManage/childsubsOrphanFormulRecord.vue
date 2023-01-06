<template>
  <div class="searchdata">
    <!-- 困境儿童福利补贴预算方案制定 -->
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="预算年度"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-range-picker :placeholder="['开始年度', '结束年度']"
                               format="YYYY"
                               :value="value3"
                               :mode="mode3"
                               @change="datechange"
                               @panelChange="handlePanelChange3" />
            </ta-form-item>
            <ta-form-item label="上报部门"
                          class="spilwid"
                          fieldDecoratorId="orgName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入上报部门" />
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
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="createTime"
                slot-scope="text,record">{{text | timeFilter}}</span>
          <span slot="action"
                class="btnlist"
                slot-scope="text,obj,index">
            <span @click="see(text,obj,index)"
                  class="com_textsee">查看</span>
          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>

    </ta-border-layout>
    <ta-drawer title="详情"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="预算方案编号"
                      fieldDecoratorId="taskNo"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.taskNo">
          <ta-input placeholder="请输入任务编号"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="预算类别"
                      fieldDecoratorId="taskType"
                      :labelCol="{span:6}"
                      :require="{message:'请选择预算类别'}">
          <ta-select style="width: 100%"
                     placeholder="请选择预算类别"
                     :disabled="disabled">
            <ta-select-option v-for="item in budgetList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="预算名称"
                      fieldDecoratorId="taskName"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.taskName">
          <ta-input placeholder="请输入任务名称"
                    :disabled="disabled" />
        </ta-form-item>

        <ta-form-item label="预算年度"
                      fieldDecoratorId="taskYear"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择预算年度'}">
          <ta-year-picker style="width:100%"
                          placeholder="请输入预算年度"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="预算总金额(万元)"
                      fieldDecoratorId="budgetAmount"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入预算总金额'}">
          <ta-input-number style="width:100%"
                           :min="0"
                           :max="max"
                           :precision="2"
                           placeholder="请输入预算总金额"
                           :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="上报部门"
                      fieldDecoratorId="orgName"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入上报部门'}">
          <ta-input placeholder="请输入上报部门"
                    :disabled="disabledOrg" />
        </ta-form-item>
        <ta-form-item label="上报日期"
                      fieldDecoratorId="createTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择上报日期'}">
          <ta-date-picker style="width:100%"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="附件上传"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18}">
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="adoption"
                     :multiple="true"
                     :action="action"
                     :fileList="fileList"
                     @change="upFileChange"
                     :beforeUpload="beforeUpload"
                     @preview="preview">
            <ta-button :disabled="disabled">
              <ta-icon type="upload" />上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
        <p class="warntext">
          <ta-icon type="info-circle-o"
                   class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
        </p>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import areaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  //   {
  //     title: '资金来源',
  //     dataIndex: 'fundSource',
  //     collectionType: 'CHILDWELFAREFUNDSOURCE'
  //   },
  {
    title: '预算方案编号',
    dataIndex: 'taskNo',
    width: '12%'
  },
  {
    title: '预算名称',
    dataIndex: 'taskName',
    width: '12%'
  },
  {
    title: '上报部门',
    dataIndex: 'orgName',
    width: '12%'
  },
  {
    title: '预算年度',
    dataIndex: 'taskYear',
    width: '12%'
  },
  {
    title: '预算类别',
    dataIndex: 'taskType',
    collectionType: 'BUDGETTYPE',
    width: '12%'
  },
  {
    title: '预算总金额(万元)',
    dataIndex: 'budgetAmount',
    width: '16%'
  },
  {
    title: '上报日期',
    dataIndex: 'createTime',
    align: 'center',
    scopedSlots: { customRender: 'createTime' },
    width: '12%'
  },
  //   {
  //     title: '当前状态',
  //     dataIndex: 'status',
  //     collectionType: 'TASKSTATUS'
  //   },
  {
    title: '操作',
    overflowTooltip: false,

    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'revoke',
  components: {
    areaQuery
  },
  mixins: [listMixin],
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      childidentitytypeList: [],
      reportManagementList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: 'childWelfareReportManagement/listRecord', // 数据列表接口，API地址
        mixAddURL: '/childWelfareReportManagement/save', // 数据新增接口，API地址
        mixDeleteURL: '/childWelfareReportManagement/updateDelStateById', // 数据删除接口，API地址
        mixEditURL: '/childWelfareReportManagement/update' // 数据编辑接口，API地址
      },
      disabledOrg: true,
      isdisabled: true,
      visible: false,
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      minRehabilitation: 0,
      maxRehabilitation: 999,
      disabled: false,
      gotype: false,
      nowtype: '',
      fundSourceList: [],
      budgetList: [],
      orgId: '',
      fileIds: [],
      adoption: {
        functionalType: 'f0'
      },
      mode3: ['year', 'year'],
      value3: [],
      fileldName: 'address_Linkage',
      ishide: true,
      types: '1',
      max: 99,
      fileList: [],
      rules: {
        taskNo: this.verificationRules('预算方案编号', 20),
        taskName: this.verificationRules('预算名称', 20),
        taskContent: this.verificationRules('任务内容', 72),
        publishPerson: this.verificationRules('颁布人员', 72)
      }
    }
  },
  filters: {
    timeFilter: function (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  mounted () {
  },
  activated () {
    this.reportManagementList = []
    this.getchildmedicaltypeList()
    this.getfundSourceList()
    this.getOrgId()
    this.getBudgetList()
    this.getReportManagement()
  },
  methods: {
    async getchildmedicaltypeList () {
      let data = await this.getDictionaries('MEDICAL_RESCUE_APPLY_LIST_STATUS')
      this.getchildmedicalList = data
    },
    // 获取上报部门
    async getReportManagement () {
      await this.post('childWelfareReportManagement/queryOrgBaseTree', {}).then(
        res => {
          // this.reportManagementList = res.data.data
          res.data.data.map((item, index) => {
            this.reportManagementList.push({
              label: item.orgName,
              value: item.orgId,
              key: item.orgId
            })
          })
        }
      )
    },
    // 编辑反显
    other (obj) {
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      // data.reachAccountTime = moment(data.reachAccountTime, 'YYYY-MM-DD')
      data.taskYear = moment(data.taskYear, 'YYYY')
      return data
    },
    // 查看
    see (text, obj, index) {
      this.visible = true
      this.disabled = true
      this.gotype = true
      this.nowtype = 2
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.detail(data)
    },
    async detail (data) {
      let params = {
        id: data.id
      }
      await this.post('/childWelfareReportManagement/queryById', params).then(
        res => {
          let ff = res.data.data.filePathVos
          let ffO = JSON.parse(ff)
          this.fileList = ffO
          // data.reachAccountTime = moment(data.reachAccountTime, "YYYY-MM-DD");
          res.data.data.taskYear = moment(res.data.data.taskYear, 'YYYY')
          let time = res.data.data.createTime.substring(0, 10)
          res.data.data.createTime = moment(time, 'YYYY-MM-DD')
          this.$nextTick(() => {
            this.form.setFieldsValue(res.data.data)
          })
        }
      )
    },
    // 抽屉关闭
    onClose () {
      this.form.resetFields()
      this.fileList = []
      this.fileIds = []
      this.visible = false
      this.disabled = false
      this.gotype = false
    },
    // 附件
    upFileChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.nowtype == '2') {
          return false
        } else {
          this.fileList = info.fileList
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        this.$message.success('文件上传成功!')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    preview (file) {
      this.downloadFile(file)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    datechange (value) {
      if (value.length == 0) {
        this.value3 = []
      }
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      //   formData.planType = '1'
      // this.changetime(formData)
      if (this.value3.length > 0) {
        formData.taskYearStart = this.value3[0].format('YYYY')
        formData.taskYearEnd = this.value3[1].format('YYYY')
      }
      formData.planType = '2'
      return formData
    },
    resetFrom () {
      this.value3 = []
      this.searchForm.resetFields()
      this.handleSubmit('search')
    },
    handlePanelChange3 (value, mode) {
      this.value3 = value
      this.mode3 = ['year', 'year']
    },
    onSelectTime (date, dateString) {
    },
    // 比较大小
    comparChange (e) {
      let inputStart = this.searchForm.getFieldValue('reachAccountMoneyStart')
      let inputEnd = this.searchForm.getFieldValue('reachAccountMoneyEnd')
      this.$nextTick(() => {
        if (e == '0') {
          if (inputStart != undefined) {
            this.maxRehabilitation = inputEnd
            this.minRehabilitation = inputStart
          }
        }
        if (e == '1') {
          if (inputEnd != undefined) {
            this.minRehabilitation = inputStart
            this.maxRehabilitation = inputEnd
          }
        }
      })
    },
    // 异步加载下拉树数据
    fnLoad (treeNode) {
      return new Promise(resolve => {
        this.Base.submit(null, {
          url: 'childWelfareReportManagement/queryOrgTree',
          data: {
            orgId: treeNode ? treeNode.eventKey : null
          }
        }).then(data => {
          let datas = []
          let ss = data.data.data
          ss.map(item => {
            if (item.isLeaf == true) {
              datas.push({
                orgName: item.label,
                orgId: item.key,
                parentId: item.parentId,
                isLeaf: item.isLeaf,
                children: null
              })
            } else {
              datas.push({
                orgName: item.label,
                orgId: item.key,
                parentId: item.parentId,
                isLeaf: item.isLeaf,
                children: []
              })
            }
          })
          // 将返回数据作为参数传入reslove方法进行渲染
          resolve(datas)
        })
      })
    },
    // 资金来源类型
    async getfundSourceList () {
      let data = await this.getDictionaries('TASKSTATUS')
      this.fundSourceList = data
    },
    // 预算类别
    async getBudgetList () {
      let data = await this.getDictionaries('BUDGETTYPE')
      this.budgetList = data
    },
    async getOrgId () {
      this.orgId = window.parent.indexTool.getUserInfo().orgName
    },
    setContainer () {
      return this.set_Container('searchdata')
    }
  }
}
</script>

<style scoped lang="less">
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
