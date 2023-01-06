<template>
  <div class="searchdata tadrawer">
    <!-- 孤儿儿童福利补贴预算方案制定 -->
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
            <ta-form-item label="当前状态"
                          class="spilwid"
                          fieldDecoratorId="status"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择当前状态">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="item in fundSourceList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <!-- <ta-form-item
            label="上报部门"
            class="spilwid"
            fieldDecoratorId="orgid"
            :labelCol="{span:7}"
            :wrapperCol="{span:17}"
          >
           <ta-tree-select
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto'}"
              placeholder="请选择上报部门"
              :loadData="fnLoad"
              :treeData.sync="reportManagementList"
              treeDataLabel="orgName"
              treeDataValue="orgId"
            ></ta-tree-select>
          </ta-form-item> -->
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
                     @click="add"
                     icon='plus'>新增预算方案</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="createTime"
                slot-scope="text,record">{{text | timeFilter}}</span>
          <a slot="action"
             class="btnlist"
             slot-scope="text,obj,index">
            <span @click="edit(text,obj,obj)"
                  v-if="obj.status =='0'"
                  class="com_continue">继续办理</span>
            <span @click="see(text,obj,index)"
                  v-if="obj.status =='1'"
                  class="com_textsee">查看</span>
            <!-- <span @click="see(text,obj,index)" v-if="obj.status =='1'">查看详情</span> -->
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.status =='0'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <!-- <span @click="dels(text,obj,index)" v-if="obj.status =='0' || obj.status =='2'">删除</span> -->
          </a>
          <div slot="status"
               slot-scope="val, obj, index">
            <span :class="statusClass(val)">{{CollectionLabel('TASKSTATUS',val)}}</span>
          </div>
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
    <ta-drawer title="预算方案"
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
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16}"
                      :fieldDecoratorOptions="rules.taskNo">
          <ta-input placeholder="请输入预算方案编号"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="预算类别"
                      fieldDecoratorId="taskType"
                      :labelCol="{span:6}"
                      :fieldDecoratorOptions="{initialValue: '1'}"
                      :require="{message:'请选择预算类别!'}">
          <ta-select style="width: 100%"
                     placeholder="请选择预算类别"
                     :disabled="disabledF">
            <ta-select-option v-for="item in budgetList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="预算名称"
                      fieldDecoratorId="taskName"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.taskName">
          <ta-input placeholder="请输入预算名称"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="上报部门"
                      v-if="disabled"
                      fieldDecoratorId="orgName"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入上报部门'}">
          <ta-input placeholder="请输入上报部门"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="预算年度"
                      fieldDecoratorId="taskYear"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择预算年度'}">
          <ta-year-picker style="width:100%"
                          @change="disabledYear"
                          placeholder="请输入预算年度"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="预算总金额(万元)"
                      fieldDecoratorId="budgetAmount"
                      :labelCol="{ span: 8}"
                      :wrapperCol="{ span: 16}"
                      :require="{message:'请输入预算总金额'}">
          <ta-input-number style="width:100%"
                           :min="0"
                           :max="9999999.99"
                           :precision="2"
                           placeholder="请输入预算总金额"
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
        <ta-button v-if="this.gotype==false"
                   @click="submit('1')"
                   type="primary">发布</ta-button>
        <ta-button v-if="this.gotype==false"
                   @click="submit('0')"
                   type="primary">保存</ta-button>
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
    width: '12.5%'
  },
  {
    title: '预算名称',
    dataIndex: 'taskName',
    width: '10%'
  },
  // {
  //   title: '上报部门',
  //   dataIndex: 'orgName',
  //   width: '11.5%'
  // },
  {
    title: '预算年度',
    dataIndex: 'taskYear',
    width: '9%'
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
    width: '14%'
  },
  {
    title: '上报日期',
    dataIndex: 'createTime',
    align: 'center',
    scopedSlots: { customRender: 'createTime' },
    width: '12%'
  },
  {
    title: '当前状态',
    dataIndex: 'status',
    align: 'center',
    // collectionType: 'TASKSTATUS',
    width: '11.5%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',

    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'revoke',
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
        mixGetDataListURL: '/childWelfareReportManagement/list', // 数据列表接口，API地址
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
      disabledF: true,
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
      max: 9999999999,
      fileList: [],
      rules: {
        taskNo: this.verificationRules('预算方案编号', 72),
        taskName: this.verificationRules('预算名称', 200)
        // taskContent: this.verificationRules('任务内容', 72),
        // publishPerson: this.verificationRules('颁布人员', 72)
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
    // this.getchildmedicaltypeList()
    this.getfundSourceList()
    this.getOrgId()
    this.getBudgetList()
  },
  methods: {
    disabledYear (a, b) {
      let year = moment().year()
      if (Math.abs(b - year) > 100) {
        this.$message.error('请选择当前年前后100年的年度')
        this.$nextTick(() => {
          this.form.setFieldsValue({
            taskYear: null
          })
        })
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.TASKSTATUS.DFB:// 待发布
          classValue = 'com_tobesubmitted'
          break
        case this.Enum.TASKSTATUS.YFB:// 已发布
          classValue = 'com_adopt'
          break
      }
      return classValue
    },
    // 编辑反显
    other (obj) {
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      // data.reachAccountTime = moment(data.reachAccountTime, 'YYYY-MM-DD')
      data.taskYear = moment(data.taskYear, 'YYYY')
      return data
    },
    // 新增
    add () {
      this.nowtype = '1'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgName: this.orgId
        })
      })
    },
    // 查看
    see (text, obj, index) {
      this.visible = true
      this.disabled = true
      this.gotype = true
      this.nowtype = '2'
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.detail(data)
    },
    // 编辑
    edit (text, obj, index) {
      this.visible = true
      this.disabled = false
      this.gotype = false
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.id = data.id
      this.detail(data)
    },
    async detail (data) {
      let params = {
        id: data.id
      }
      await this.post('/childWelfareReportManagement/queryById', params).then(res => {
        let ff = res.data.data.filePathVos
        let ffO = JSON.parse(ff)
        this.fileList = ffO
        // data.reachAccountTime = moment(data.reachAccountTime, "YYYY-MM-DD");
        res.data.data.taskYear = moment(res.data.data.taskYear, 'YYYY')
        this.$nextTick(() => {
          this.form.setFieldsValue(res.data.data)
        })
      })
    },
    // 提交
    async submit (e) {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let formData = this.form.getFieldsValue()
          this.changetime(formData)
          formData.orgid = window.parent.indexTool.getUserInfo().orgId
          // 困境
          formData.planType = '2'
          let params = {}
          let url = ''
          let text = ''
          params = { ...formData }
          let upLoadPathIds = [...this.fileList]
          upLoadPathIds.map(item => {
            this.fileIds.push(item.response.data.data.fileid)
          })
          params.upLoadPathId = this.fileIds
          if (e == '0') {
            // 保存
            let status = '0'
            params.status = status
            text = '保存成功'
          } else if (e == '1') {
            // 发布
            let status = '1'
            params.status = status
            text = '发布成功'
          }
          if (this.nowtype == '1') {
            url = this.mixListOptions.mixAddURL
          } else {
            url = this.mixListOptions.mixEditURL
            text = '修改成功'
            params.id = this.id
          }
          await this.post(url, params).then(res => {
            if (res.data.data == true) {
              this.visible = false
              this.$message.success(text)
              this.form.resetFields()
              this.handleSubmit()
              this.nowtype = ''
              this.gotype = false
            }
          })
        }
      })
    },
    // 数据处理
    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            let arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY')
          }
        }
      }
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
    // 删除
    async dels (text, obj, index) {
      let params = {}
      params.id = obj.id
      params.planType = '2'
      await this.post(this.mixListOptions.mixDeleteURL, params).then(
        res => {
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
        }
      )
    },
    datechange (value) {
      if (value.length == 0) {
        this.value3 = []
      }
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
    // 医疗信息附件
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
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      //   formData.planType = '2'
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
      this.handleSubmit()
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
    handlePanelChange3 (value, mode) {
      this.value3 = value
      this.mode3 = ['year', 'year']
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
