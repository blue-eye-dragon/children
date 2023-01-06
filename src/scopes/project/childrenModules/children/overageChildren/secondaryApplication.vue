<template>
  <!-- 续发申请 -->
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
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>

                <ta-form-item label="儿童类别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              v-if="notCounty">
                  <ta-select class="selectwid"
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childrenTypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              class="spilwid4"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>

                <ta-form-item label="性别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="sex">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value"
                                      :require="{message:'请选择性别'}">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="birthday">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="减员申请日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="applyDay">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
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
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">审批中</ta-radio-button>
              <ta-radio-button value="4">通过</ta-radio-button>
              <ta-radio-button value="5">驳回</ta-radio-button>
              <ta-radio-button value="9">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <!-- <ta-button type="primary"
                       icon="plus"
                       @click="add">新增减员</ta-button> -->
            <!-- <ta-button class='btnleft exportbtn'
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns.sync="tableColumns"
                  :dataSource="mixDataList"
                  :showOverflowTooltip="true"
                  :pagination="false"
                  ref="hideOrShowTable">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="approveDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               class='btnlist'
               slot-scope="a, b">
            <span @click="revokeRecords(b)"
                  class="com_revocation"
                  v-if="b.status=='1'">撤回</span>
            <span @click="see(b)"
                  class="com_textsee"
                  v-if="b.status=='3'||b.status=='4'||b.status=='5'">查看</span>
            <span @click="edit(b)"
                  class="com_textedit"
                  v-if="b.status=='0'||b.status=='2'">编辑</span>
            <span @click="edit(b)"
                  class="com_textedit"
                  v-if="b.status=='5'">继续办理</span>

            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(b)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消"
                           v-if="b.status=='0'||b.status=='2'||b.status=='5'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>

          </div>
          <div slot="status"
               slot-scope="val, obj">
            <span :class="statusClass(obj)">{{val}}</span>
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
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
    <!-- 续发抽屉 -->
    <div>
      <ta-drawer :title="'续发'"
                 :visible="visible"
                 :width="width"
                 :getContainer="setContainer"
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
                          fieldDecoratorId="currentAddress">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="超龄续发原因"
                          :fieldDecoratorId="'overAgeReason'"
                          :require="{message:'请选择超龄续发原因'}">
              <ta-select allowClear
                         @change="getReasonRadio">
                <ta-select-option v-for="item in overAgeReasonList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{message:'请选择超龄续发原因'}">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if=" radio == Enum.OVERAGERENEWALREASON.QT">
            <ta-form-item label
                          :fieldDecoratorId="'overAgeReasonOther'"
                          style="margin-left: 25%;">
              <ta-input />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="续发截止时间"
                          :fieldDecoratorId="'superventionOverDate'"
                          :require="{message:'请选择续发截止时间'}">
              <ta-month-picker format="YYYY-MM"
                               :disabledDate="disabledSupDate"
                               style="width: 100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="备注"
                          :fieldDecoratorId="'remark'"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
              <ta-textarea :rows="4" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="附件上传"
                          fieldDecoratorId="cooperativeAgreement">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         @remove="handleRemove"
                         :data="fileData('9','fileList')"
                         :beforeUpload="beforeUpload"
                         @preview="preview"
                         @change="filechange">
                <ta-button>
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
                     @click="handleOk">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import { type } from 'os'
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },

  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '10%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '15%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '20%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '续发申请日期',
    dataIndex: 'registerDate',
    width: '15%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '审批日期',
    align: 'center',
    dataIndex: 'approveDate',
    width: '23%',
    scopedSlots: { customRender: 'approveDate' }
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
    width: '18%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      width: '500px',
      visible: false,
      idedit: false,
      nowkey: '0', // 选择不同的tab值（1待审批、3审批中、4通过、5驳回、0待提交、9全部）
      isdisabled: true,
      childrenTypeList: [], // 儿童类别字典数据
      sexList: [], // 性别字典数据

      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overAgeTipApi/pageApplyReductionChild' // '/reductionChildRequestApi/pageApplyReductionChild' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      radio: '', // 超龄续发原因选择的数据
      overAgeReasonList: [], // 超龄续发原因
      childTypeList: [], // 儿童类别字典数据
      reductionTypeList: [], // 减员原因字典数据
      dieReasonList: [], // 死亡原因
      dieDealList: [], // 死亡处理方式

      disabled: false,
      depletionDisible: false, // 减员抽屉显隐
      label: '收养日期', // 收养日期（儿童超龄时期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: '01',
      nowdate: null, // 当前日期

      fileList: [],
      upLoadPathIds: [], // 附件上传存放的id数组
      reductionObj: {},
      issearch: false,
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4 // 不是乡镇用户
    }
  },
  activated () {
    this.issearch = false
    // 通过列表显示审批时间
    this.$refs.hideOrShowTable[this.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
    this.nowdate = moment().locale('zh-cn')
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.overAgeReasonList = await this.getDictionaries('OVERAGERENEWALREASON') // 获取超龄续发原因字典数据
      this.childrenTypeList = await this.getDictionaries(this.childTypeCode) // 获取儿童类别字典数据
      this.dieReasonList = await this.getDictionaries('DEATHREASON') // 获取死亡原因字典数据
      this.reductionTypeList = await this.getDictionaries('REDUCTIONREASON') // 获取减员原因字典数据
      this.dieDealList = await this.getDictionaries('DIEDEAL') // 获取死亡处理方式字典数据
    },
    // 超龄续发原因的选择
    getReasonRadio (e) {
      this.radio = e
    },
    // 取消点击事件
    handleCancel (e) {
      this.visible = false
      this.modelForm.resetFields()
      this.fileList = []
      this.upLoadPathIds = []
      this.handleSubmit()
    },
    // 续发截止日期不能小于当前日期
    disabledSupDate (current) {
      return current && current < moment(new Date()).add(-1, 'days') // 昨天下午4点21分
    },
    // 末领年月不能小于起领年月
    disabledDate (current) {
      let { startTime } = this.reductionObj
      startTime = startTime ? moment(startTime, 'YYYY-MM') : null
      return current < startTime
    },
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (e.status) {
        case 0: // 待提交
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

    handleOk () {
      if (this.fileList.length == 0) {
        this.$confirm({
          title: '提示',
          content: '上传文件信息项为空，提交后将不可修改，确认提交吗?',
          onOk: () => {
            this.toSubmit()
          },
          onCancel: () => {

          },
          class: 'test'
        })
      } else {
        this.toSubmit()
      }
    },
    // 提交
    toSubmit () {
      const url = '/overAgeTipApi/updateChildSuperventionProcess'
      this.modelForm.validateFields((err, values) => {
        if (!err) {
          const modelForm = this.modelForm.getFieldsValue()
          modelForm.birthday = moment(modelForm.birthday).format('YYYY-MM-DD')
          modelForm.superventionOverDate = moment(modelForm.superventionOverDate).format('YYYY-MM')
          modelForm.id = this.reductionObj.id
          modelForm.upLoadPathIds = []
          if (this.fileList.length > 0) {
            this.fileList.forEach((w) => {
              modelForm.upLoadPathIds.push(w.response.data.data.fileid)
            })
          }
          this.post(url, modelForm).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据操作成功！')
              this.handleCancel()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 返回
    backOn () {
      this.form.resetFields()
      this.fileList = []
      this.type = '01'
      this.label = '收养日期'
      this.depletionDisible = false
      this.handleSubmit()
    },
    // 导出
    exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/reductionChild/exportAddChildApply', data)
    },
    revokeRecords (e) {
      this.$router.push({
        name: 'secondaryApprovalFrom',
        query: { id: e.id, childEnterId: e.childEnterId, workflowId: e.workflowId, workflowPointId: e.workflowPointId, flag: 'back' }
      })
    },
    see (e) {
      this.$router.push({
        name: 'secondaryApprovalFrom',
        query: { id: e.id, childEnterId: e.childEnterId, workflowId: e.workflowId, workflowPointId: e.workflowPointId, flag: 'look' }
      })
    },
    async edit (e) {
      this.radio = ''
      this.visible = true

      const res = await this.post('/overAgeTipApi/detailOverAgeSupervention', { id: e.id })
      if (res.serviceSuccess) {
        const recordDatas = res.data.data
        this.reductionObj.id = e.id
        this.radio = recordDatas.overAgeReason
        if (recordDatas.fileList.length > 0) {
          recordDatas.fileList.forEach((r) => {
            this.fileList.push(r)
          })
        }
        recordDatas.birthday = recordDatas.birthday ? moment(recordDatas.birthday) : null
        recordDatas.endTime = recordDatas.endTime ? moment(recordDatas.endTime) : null
        recordDatas.superventionOverDate = recordDatas.superventionOverDate ? moment(recordDatas.superventionOverDate, 'YYYY-MM') : null
        this.$nextTick(() => {
          this.modelForm.setFieldsValue(recordDatas)
        })
      }
    },
    dels (e) {
      this.post('/overAgeTipApi/updateDelStateById', {
        id: e.id
      }).then(res => {
        if (!res.errors) {
          this.$message.success('删除成功!')
          this.handleSubmit()
        }
      })
    },
    typechange (val) {
      this.nowkey = val.target.value
      // 通过列表显示审批时间
      this.$refs.hideOrShowTable[this.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
      this.handleSubmit('search')
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey
      this.changetime(formData)
      return formData
    },
    // 查看儿童详情
    childDetail (e) {
      this.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.childEnterId }), operateFlag: 'look_now' }
      })
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
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
    preview (file) { this.downloadFile(file) },
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid

      this.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          this.$message.success('文件删除成功!')
        })
        .catch(() => {
          this.$message.error('文件删除失败!')
        })
    },
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    type (val) {
      if (val != 7) {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            reductionDate: this.nowdate
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 430px;
}
.spilwid4 {
  width: 350px;
}
</style>
