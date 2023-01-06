<template>
  <div class="searchdata tadrawer">
    <!-- 儿童福利补贴预算任务维护 -->
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="任务名称"
                          class="spilwid"
                          fieldDecoratorId="taskName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入任务名称" />
            </ta-form-item>
            <!-- <ta-form-item
            label="颁布机关"
            class="spilwid"
            fieldDecoratorId="orgid"
            :labelCol="{span:7}"
            :wrapperCol="{span:17}"
          >
            <ta-input placeholder="请输入颁布机关" />
          </ta-form-item>-->
            <ta-form-item label="颁布日期"
                          class="spilwid1"
                          fieldDecoratorId="createTime"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-range-picker @change="onSelectTime" />
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
                     icon="plus"
                     @click="add">新增预算任务</ta-button>
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
            <span @click="edit(text,obj,obj)"
                  v-if="obj.publishStatus =='0'"
                  class="com_textedit">编辑</span>
            <span @click="see(text,obj,index)"
                  v-if="obj.publishStatus =='0' || obj.publishStatus =='1'"
                  class="com_textsee">查看</span>
            <!-- <span @click="see(text,obj,index)" v-if="obj.publishStatus =='1'">查看详情</span> -->
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.publishStatus =='0'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <!-- <span @click="dels(text,obj,index)" v-if="obj.publishStatus =='0' || obj.publishStatus =='2'">删除</span> -->
          </span>
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
    <ta-drawer title="预算任务"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="任务编号"
                      fieldDecoratorId="taskNo"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.taskNo">
          <ta-input placeholder="请输入任务编号"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="任务名称"
                      fieldDecoratorId="taskName"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.taskName">
          <ta-input placeholder="请输入任务名称"
                    :disabled="disabled" />
        </ta-form-item>
        <!-- <ta-form-item label="颁布机关"
                        v-if="disabled"
                        fieldDecoratorId="orgName"
                        :labelCol="{ span: 6 }"
                        :require="{message:'请输入颁布机关!'}">
            <ta-input placeholder="请输入颁布机关"
                      :disabled="disabledOrg" />
          </ta-form-item> -->
        <!-- <ta-form-item style="display:none"
                        label="颁布机关"
                        fieldDecoratorId="orgid"
                        :labelCol="{ span: 6 }"
                        :require="{message:'请输入颁布机关!'}">
            <ta-input placeholder="请输入颁布机关"
                      :disabled="disabledOrg" />
          </ta-form-item> -->
        <ta-form-item label="任务内容"
                      fieldDecoratorId="taskContent"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.taskContent">
          <ta-textarea placeholder="请输入任务内容"
                       :disabled="disabled"
                       :rows="4" />
        </ta-form-item>
        <ta-form-item label="颁布人员"
                      fieldDecoratorId="publishPerson"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules. publishPerson">
          <ta-input placeholder="请输入颁布人员"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="附件上传"
                      :required="true"
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
    title: '任务编号',
    dataIndex: 'taskNo',
    width: '20%'
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: '20%'
  },
  // {
  //   title: '颁布机关',
  //   dataIndex: 'orgName',
  //   width: '14%'
  // },
  {
    title: '颁布人员',
    dataIndex: 'publishPerson',
    width: '20%'
  },
  {
    title: '颁布日期',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' },
    width: '20%'
  },
  {
    title: '任务状态',
    dataIndex: 'publishStatus',
    align: 'center',
    // collectionType: 'TASKSTATUS',
    width: '20%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
    // fixed: 'right'
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
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/subsidyBudgetTask/list', // 数据列表接口，API地址
        mixAddURL: '/subsidyBudgetTask/save', // 数据新增接口，API地址
        mixDeleteURL: '/subsidyBudgetTask/updateDelStateById', // 数据删除接口，API地址
        mixEditURL: '/subsidyBudgetTask/update' // 数据编辑接口，API地址
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
      orgId: '',
      id: '',
      fileIds: [],
      adoption: {
        functionalType: 'f0'
      },
      orgName: '',
      fileList: [],
      rules: {
        taskNo: this.verificationRules('任务编号', 20),
        taskName: this.verificationRules('任务名称', 20),
        taskContent: this.verificationRules('任务内容', 72, true),
        publishPerson: this.verificationRules('颁布人员', 72)
      }
    }
  },
  filters: {
    timeFilter: function (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.loadData()
    // this.getchildmedicaltypeList()
    this.getfundSourceList()
    console.log(window.parent.indexTool.getUserInfo())
    this.getOrgId()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    loadData () {
      this.nowtype = 1
    },
    // 编辑反显
    other (obj) {
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      data.reachAccountTime = moment(data.reachAccountTime, 'YYYY-MM-DD')
      data.useYear = moment(data.useYear, 'YYYY')
      return data
    },
    // 新增
    add () {
      this.nowtype = 1
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgName: this.orgName,
          orgid: this.orgId
        })
      })
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
    // 查看
    see (text, obj, index) {
      console.log(obj)
      this.visible = true
      this.disabled = true
      this.gotype = true
      this.nowtype = 2
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      console.log(data)
      this.detail(data)
    },
    // 编辑
    edit (text, obj, index) {
      this.visible = true
      this.disabled = false
      this.gotype = false
      this.nowtype = 0
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      console.log(data)
      this.detail(data)
    },
    async detail (data) {
      let params = {
        id: data.id
      }
      await this.post('/subsidyBudgetTask/queryById', params).then(res => {
        console.log(res.data.data)
        this.id = res.data.data.id
        let ff = []
        let ffO = []
        ff = res.data.data.filePathVos
        ffO = JSON.parse(ff)
        console.log(ffO)
        console.log(typeof ffO)
        this.fileList = ffO
        // data.reachAccountTime = moment(data.reachAccountTime, "YYYY-MM-DD");
        // data.useYear = moment(data.useYear, "YYYY");
        this.$nextTick(() => {
          this.form.setFieldsValue(res.data.data)
        })
      })
    },
    // 提交
    async submit (e) {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.fileList.length == 0) {
            this.$message.error('请上传附件')
            return false
          }
          let formData = this.form.getFieldsValue()
          this.fileIds = []
          console.log(formData)
          this.changetime(formData)
          let params = {}
          let url = ''
          let text = ''
          let upLoadPathIds = []
          params = { ...formData }
          upLoadPathIds = [...this.fileList]
          upLoadPathIds.map(item => {
            this.fileIds.push(item.response.data.data.fileid)
          })
          params.upLoadPathId = this.fileIds
          if (e == '0') {
            // 保存
            let publishStatus = '0'
            params.publishStatus = publishStatus
            text = '保存成功'
          } else if (e == '1') {
            // 发布
            let publishStatus = '1'
            params.publishStatus = publishStatus
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
            console.log(res)
            if (res.serviceSuccess == true) {
              this.visible = false
              this.$message.success(text)
              this.form.resetFields()
              this.fileList = []
              this.handleSubmit()
              this.gotype = false
            }
          })
        }
      })
    },
    // 删除
    async dels (text, obj, index) {
      await this.post(this.mixListOptions.mixDeleteURL, { id: obj.id }).then(
        res => {
          console.log(res)
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
        }
      )
      console.log(obj)
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
        console.log(info.file.status)
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        console.log(info.file.status)
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
        console.log(this.fileList)
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
      this.changetime(formData)
      console.log(formData)
      return formData
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
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
    // 资金来源类型
    async getfundSourceList () {
      let data = await this.getDictionaries('TASKSTATUS')
      this.fundSourceList = data
    },
    async getOrgId () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
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
