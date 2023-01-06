<template>
  <div class="searchdata tadrawer">
    <!-- 儿童福利补贴预算任务下载 -->
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
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
            <ta-form-item label="颁布日期"
                          style="width:400px"
                          fieldDecoratorId="createTime"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker @change="onSelectTime" />
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
          <span slot="action"
                class="btnlist"
                slot-scope="text,obj,index">
            <span @click="see(text,obj,index)"
                  v-if="obj.publishStatus =='0' || obj.publishStatus =='1'"
                  class="com_textsee">查看</span>
          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
        <ta-form-item label="颁布日期"
                      fieldDecoratorId="createTime"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width:100%"
                          placeholder="请输入颁布日期"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="颁布状态"
                      fieldDecoratorId="publishStatus"
                      :labelCol="{ span: 6 }">
          <ta-select style="width: 100%"
                     :disabled="disabled">
            <ta-select-option v-for="item in fundSourceList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
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
        <!-- <ta-button v-if="this.gotype==false" @click="submit('1')" type="primary">发布</ta-button>
          <ta-button v-if="this.gotype==false" @click="submit('0')" type="primary">保存</ta-button>-->
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
  {
    title: '任务编号',
    dataIndex: 'taskNo',
    width: '25%'
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: '25%'
  },
  {
    title: '颁布人员',
    dataIndex: 'publishPerson',
    width: '25%'
  },
  {
    title: '颁布日期',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' },
    width: '25%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',

    width: 150,
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
      fileIds: [],
      adoption: {
        functionalType: 'f0'
      },
      fileList: [],
      rules: {
        taskNo: this.verificationRules('任务编号', 72),
        taskName: this.verificationRules('任务名称', 100),
        taskContent: this.verificationRules('任务内容', 200, true),
        publishPerson: this.verificationRules('颁布人员', 50)
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
    // this.getchildmedicaltypeList()
    this.getfundSourceList()
    this.getOrgId()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
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
          orgid: this.orgId
        })
      })
    },
    // 查看
    see (text, obj, index) {
      this.visible = true
      this.disabled = true
      this.gotype = true
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.detail(data)
    },
    // 编辑
    edit (text, obj, index) {
      this.visible = true
      this.disabled = false
      this.gotype = true
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.detail(data)
    },
    async detail (data) {
      let params = {
        id: data.id
      }
      await this.post('/subsidyBudgetTask/queryById', params).then(res => {
        let ff = res.data.data.filePathVos
        let ffO = JSON.parse(ff)
        this.fileList = ffO
        if (res.data.data.createTime) {
          res.data.data.createTime = moment(res.data.data.createTime)
        }
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
          let formData = this.form.getFieldsValue()
          this.changetime(formData)
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
            if (res.serviceSuccess == true) {
              this.visible = false
              this.$message.success(text)
              this.form.resetFields()
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
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
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
    // 医疗信息附件
    upFileChange (info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        // this.fileList = info.fileList
        return false
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
      formData['publishStatus'] = 1
      this.changetime(formData)
      return formData
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
    // 资金来源类型
    async getfundSourceList () {
      let data = await this.getDictionaries('TASKSTATUS')
      this.fundSourceList = data
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
