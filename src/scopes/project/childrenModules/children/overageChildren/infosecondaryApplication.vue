<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <ta-form-item label="儿童姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <!-- <ta-form-item label="儿童类别"
                              fieldDecoratorId="childType"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in childTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item> -->
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              style="width:350px"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              style="width:390px"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="searchList('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>
        </div>

        <div class="operateBtn">
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="2">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <!-- <ta-radio-button value="3">审批中</ta-radio-button> -->
              <ta-radio-button value="3">通过</ta-radio-button>
              <ta-radio-button value="4">驳回</ta-radio-button>
              <ta-radio-button value="5">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <!-- <div class="rightClass">
            <ta-button class='btnleft exportbtn'
                       icon='upload'
                       v-if="!isWelfare && isCounty"
                       @click="showModal">导出</ta-button>
            <ta-modal :centered="false"
                      style="top: 25%;"
                      :visible="showOn"
                      @ok="Excel"
                      @cancel="handleCancel1">
              <div>
                <h3>确认导出查询条件下的全部有效数据吗？</h3>
              </div>
            </ta-modal>
          </div> -->
        </div>
        <!-- <div style="float:right">
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     v-if="!isWelfare && isCounty"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel1">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div> -->
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <!-- <span slot="operate"
                slot-scope="text, record,index"
                class="btnlist">

            <span v-if="(isTown || isWelfare)"
                  class="com_relieve"
                  @click="jy(text, record,index)"> 减员 </span>
            <span v-else-if="!(isTown || isWelfare)&&record.superventionOverDate"
                  class="com_textedit"
                  @click="xf(record)"> 修改 </span>
            <span v-else
                  class="com_continue"
                  @click="xf(record)"> 续发 </span>
          </span> -->
          <template slot="name"
                    slot-scope="a,b,c">
            <a @click="childDetail(a,b,c)">{{a}}</a>
          </template>
          <template slot="superventionOverDate"
                    slot-scope="a,b,c">
            <span>{{a?a.substring(0,7):'--'}}</span>
          </template>
          <!-- <template slot="overAgeType"
                    slot-scope="a,b,c">
            <span v-if="a == '1'"
                  :class="getColor(a)">超龄待续发</span>
            <span v-if="a == '2'"
                  :class="getColor(a)">续发已到期</span>
            <span v-if="a == '3'"
                  :class="getColor(a)">即将超龄</span>
            <span v-if="a == '4'"
                  :class="getColor(a)">续发未到期</span>
          </template> -->
          <div slot="status"
               slot-scope="val, obj">
            <span :class="statusClass(obj)">{{val}}</span>
          </div>
          <div slot="operate"
               class='btnlist'
               slot-scope="a, b">
            <span @click="revokeRecords(b)"
                  class="com_revocation"
                  v-if="b.checkStatus=='1'">撤回</span>
            <span @click="xf(b, 'see')"
                  class="com_textsee"
                  v-if="b.checkStatus=='3'||b.checkStatus=='4'||b.checkStatus=='5'">查看</span>
            <span @click="xf(b)"
                  class="com_textedit"
                  v-if="b.checkStatus=='0'||b.checkStatus=='2'">编辑</span>
            <span @click="xf(b)"
                  class="com_textedit"
                  v-if="b.checkStatus=='4'">继续办理</span>

            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(b)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消"
                           v-if="b.checkStatus=='0'||b.checkStatus=='2'||b.checkStatus=='4'">
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
                       :params="userPageParams"
                       @change="pagechange"
                       :dataSource.sync="mixDataList"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <div></div>
    <!-- 弹窗 -->
    <div>
      <ta-drawer title="续发"
                 :visible="visible"
                 :width="width"
                 :getContainer="setContainer"
                 :confirmLoading="confirmLoading"
                 @close="handleCancel"
                 :bodyStyle="{height:'auto',overflow:'auto' ,paddingBottom:'0px'}">
        <ta-form :autoFormCreate="(modelForm)=>{this.modelForm = modelForm}"
                 layout="horizontal">
          <ta-col :span="24">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          :fieldDecoratorOptions="verificationRules('儿童姓名',72)">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday"
                          :require="{message:'请选择出生日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="现住址"
                          fieldDecoratorId="currentDetail">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="超龄续发原因"
                          :fieldDecoratorId="'overAgeReason'"
                          :require="{message:'请选择超龄续发原因'}">
              <ta-select allowClear
                         :disabled='disabled'
                         @change="getReasonRadio">
                <ta-select-option v-for="item in overAgeReasonList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{message:'请选择超龄续发原因'}">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="radio == Enum.OVERAGERENEWALREASON.QT">
            <ta-form-item label
                          :fieldDecoratorId="'overAgeReasonOther'"
                          style="margin-left: 25%;">
              <ta-input :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="续发截止日期"
                          :fieldDecoratorId="'superventionOverDate'"
                          :require="{message:'请选择续发截止日期'}">
              <ta-month-picker :disabled='disabled'
                              :disabledDate="disabledSupDate"
                              style="width: 100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="备注"
                          :fieldDecoratorId="'remark'"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
              <ta-textarea :rows="4"
                           :disabled='disabled' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="附件上传">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         :remove="handleRemove"
                         :data="fileData('9','fileList')"
                         :beforeUpload="beforeUpload"
                         @preview="preview"
                         @change="filechange">
                <ta-button :disabled='disabled'>
                  <ta-icon type="upload" />上传文件
                </ta-button>
              </ta-upload>
              <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-col>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="handleCancel">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="!disabled"
                     @click="handleOk">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import loginVue from '../../../../../corePage/login/login.vue'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童姓名',
    width: '20%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    align: 'center',
    collectionType: 'sex'
  },
  // {
  //   title: '超龄类型',
  //   width: '15%',
  //   align: 'center',
  //   dataIndex: 'overAgeType',
  //   scopedSlots: { customRender: 'overAgeType' }
  // },
  {
    title: '出生日期',
    width: '15%',
    align: 'center',
    dataIndex: 'birthday'
  },
  {
    title: '超龄日期',
    width: '15%',
    align: 'center',
    dataIndex: 'overAgeDate'
  },
  {
    title: '延期截止日期',
    width: '15%',
    align: 'center',
    dataIndex: 'superventionOverDate',
    scopedSlots: { customRender: 'superventionOverDate' }
  },
  {
    title: '状态',
    width: '10%',
    align: 'center',
    dataIndex: 'statusLabel',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 230,
    scopedSlots: { customRender: 'operate' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      issearch: false,
      nowkey: '2',
      showOn: false,
      tableColumns,
      obj: {}, // 存储url中的信息
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overAgeFactChildApi/pageOverAgeUnaChildByStatus' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },

      // 续发弹窗
      visible: false,
      width: '500px',
      confirmLoading: false,
      radio: '', // 超龄续发原因选择的数据
      overAgeReasonList: [], // 超龄续发原因
      fileList: [],

      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      plainOptions: [
        {
          label: '超龄待续发',
          value: '1'
        },
        {
          label: '续发已到期',
          value: '2'
        },
        {
          label: '即将超龄',
          value: '3'
        },
        {
          label: '续发未到期',
          value: '4'
        }
      ],
      adopt: false, // 福利孤弃儿童养育类型为收养
      disabled: false,
      id: '', // 查看接口返回的id
      orgId: '', // 查看接口返回的orgId
      isWelfare: window.parent.indexTool.getUserInfo().orgType == '99', // 是否福利机构
      isCounty: window.parent.indexTool.getUserInfo().areaLevel == 3, // 是否是区县
      isTown: window.parent.indexTool.getUserInfo().areaLevel == 4 // 是否是乡镇
    }
  },
  mounted () {
    this.initdatas()
  },
  activated () {
    this.obj = {}
    this.nowkey = '2'
    this.disabled = false
    this.issearch = false
    this.searchList()
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    xf (record, type) {
      this.radio = ''
      this.visible = true
      this.addUnattendedId = record.addUnattendedId
      if (type == 'see') {
        this.disabled = true
      } else {
        this.disabled = false
      }
      this.post('/overAgeFactChildApi/queryById', { addUnattendedId: record.addUnattendedId }).then(res => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.id = data.id
          this.orgId = data.orgId
          data.birthday = data.birthday ? moment(data.birthday) : null
          data.superventionOverDate = data.superventionOverDate ? moment(data.superventionOverDate, 'YYYY-MM') : null
          this.fileList = data.fileList || []
          this.$nextTick(() => {
            this.modelForm.setFieldsValue(data)
          })
        }
      })
    },
    jy (text, obj, index) {
      const str = {
        obj: obj,
        index: index,
        goType: 'factRaiseChildStatusChange-apply'
      }
      const paramsData = JSON.stringify(str)
      this.post('/unattendedStateChangeApi/checkStateChangeApply', { addUnattendedId: obj.addUnattendedId }).then((res) => {
        if (res.data.data == '1') {
          this.$message.error('该儿童已提出减员申请，还未审批，请等待审批完成后再提身份状态变更申请', [5])
          return false
        } else {
          this.$router.push({
            name: 'actualUnaccChildStatuChangeFor',
            query: {
              paramsData
            }
          })
        }
      })
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (+e.checkStatus) {
        case 2: // 待提交
          classValue = 'no_submit'
          break
        case 1:// 待审批
          classValue = 'com_tobeaudited'
          break
        case 3:// 审批中
          classValue = 'com_inaudit'
          break
        case 4:// 通过
          classValue = 'com_adopt'
          break
        case 5:// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    // getColor (val) {
    //   let classValue = ''
    //   switch (val) {
    //     case '1':// 超龄待续发
    //       classValue = 'color1'
    //       break
    //     case '4':// 续发未到期
    //       classValue = 'color2'
    //       break
    //     case '3':// 即将超龄
    //       classValue = 'color3'
    //       break
    //     case '2': // 续发已到期
    //       classValue = 'color4'
    //       break
    //   }
    //   return classValue
    // },
    searchList () {
      this.handleSubmit()
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.orgId = window.parent.indexTool.getUserInfo().orgId
      if (this.isWelfare || this.isTown) {
        formData.isOverAgeOrJianYuan = '0'
      } else {
        formData.isOverAgeOrJianYuan = '1'
      }
      if (this.obj.todoFlag) {
        formData.todoFlag = this.obj.todoFlag
      }
      if (this.nowkey) {
        formData.type = +this.nowkey
      }
      this.changetime(formData)
      return formData
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('OVERAGERENEWALREASON', 'overAgeReasonList') // 获取超龄续发原因字典数据
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 点击姓名查看儿童详情
    childDetail (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 6,
          childtypedisabled: 1,
          id: obj.addUnattendedId,
          isdisabled: 1,
          currentStatus: obj.status
        }
      })
    },
    // 超龄续发原因的选择
    getReasonRadio (e) {
      this.radio = e
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.obj = {}
      this.handleSubmit('search')
    },
    // 取消点击事件
    handleCancel (e) {
      this.visible = false
      this.modelForm.resetFields()
      this.fileList = []
      this.handleSubmit()
    },
    // 续发截止日期不能小于当前日期
    disabledSupDate (current) {
      return current && current < moment().startOf('day')
    },
    handleOk () {
      const _self = this
      _self.modelForm.validateFields((err, values) => {
        if (!err) {
          const modelForm = _self.modelForm.getFieldsValue()
          modelForm.id = _self.id
          modelForm.birthday = moment(modelForm.birthday).format('YYYY-MM-DD')
          modelForm.superventionOverDate = moment(modelForm.superventionOverDate).format('YYYY-MM')
          modelForm.addUnattendedId = _self.addUnattendedId
          modelForm.orgId = _self.orgId

          const upLoadPathIds = []
          this.fileList.map(item => {
            upLoadPathIds.push(item.response.data.data.fileid)
          })
          modelForm.upLoadPathIds = upLoadPathIds || []
          _self.post('/overAgeFactChildApi/submitSuperventionFactChild', modelForm).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('数据操作成功！')
              _self.handleCancel()
            }
          })
        }
      })
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },

    revokeRecords (e) {
      this.post('/overAgeFactChildApi/recallOverAgeFactChild', {
        id: e.id
      }).then(res => {
        if (!res.errors) {
          this.$message.success('撤回成功!')
          this.handleSubmit()
        }
      })
    },
    dels (e) {
      this.post('/overAgeFactChildApi/deleteOverAgeFactChild', {
        id: e.id
      }).then(res => {
        if (res.data.data) {
          this.$message.success('删除成功!')
          this.handleSubmit()
        } else {
          this.$message.error('删除失败!')
        }
      })
    },
    showModal () {
      this.showOn = true
    },
    handleCancel1 (e) {
      this.showOn = false
    },
    Excel () {
      const par = this.userPageParams()
      par.orgId = window.parent.indexTool.getUserInfo().orgId
      const url = '/overageChild/exportUnattendedOverageManagement'
      this.exportFile(url, par)
      this.showOn = false
    },
    preview (file) { this.downloadFile(file) },
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
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
.color1 {
  color: #ff2b2b;
}
.color2 {
  color: #379b37;
}
.color3 {
  color: #ff9a02;
}
.color4 {
  color: #ff68ff;
}
</style>
