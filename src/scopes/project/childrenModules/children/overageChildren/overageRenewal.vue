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
                <ta-form-item label="儿童类别"
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
                              class="spilwid3"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
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
        <div style="margin-top: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="birthday"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="superventionDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="superventionOverDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="currentStatus"
                    slot-scope="a, b">
            <span :class="b.currentStatus=='享受中'?'com_inaudit':'com_adopt'">{{b.currentStatus}}</span>
          </template>
          <div slot="action"
               slot-scope="a, b"
               class="btnlist">
            <span class="com_textsee"
                  @click="look(b)">查看</span>
            <span class="com_textedit"
                  v-if="!b.endYears&&!iswelfare&&b.currentStatus.trim()!='结束'"
                  @click="edit(b)">修改</span>
          </div>
          <template slot="name"
                    slot-scope="a,b">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       :dataSource.sync="mixDataList"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- 详情抽屉 -->
    <div>
      <ta-drawer :title="'详情'"
                 :visible="visible"
                 :getContainer="setContainer"
                 :width="width"
                 :confirmLoading="confirmLoading"
                 @close="handleCancel"
                 :bodyStyle="{height:'auto',overflow:'auto' ,paddingBottom:'0px'}">
        <ta-form :autoFormCreate="(modelForm)=>{this.modelForm = modelForm}"
                 layout="horizontal">
          <ta-form-item label="儿童姓名"
                        :fieldDecoratorId="'name'"
                        :require="{message:'请输入儿童姓名'}">
            <ta-input :disabled='true' />
            <!-- <a style="margin-left: 20%;"
               @click="childDetail('xf')">{{name}}</a> -->
          </ta-form-item>
          <ta-form-item label="出生日期"
                        :fieldDecoratorId="'birthday'"
                        :require="{message:'请选择出生日期'}">
            <ta-date-picker format="YYYY-MM-DD"
                            style="width: 100%"
                            :disabled='true' />
          </ta-form-item>
          <ta-form-item label="现住址"
                        :fieldDecoratorId="'currentAddress'"
                        :require="{message:'请输入现住址'}">
            <ta-input :disabled='true' />
          </ta-form-item>
          <ta-form-item label="超龄续发原因"
                        :fieldDecoratorId="'overAgeReason'"
                        :require="{message:'请输入超龄续发原因'}">
            <ta-select allowClear
                       @change="getReasonRadio"
                       :disabled='disabled'>
              <ta-select-option v-for="item in overAgeReasonList"
                                :key="item.value"
                                :value="item.value"
                                :require="{message:'请选择超龄续发原因'}">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label
                        v-if="radio == Enum.OVERAGERENEWALREASON.QT"
                        :fieldDecoratorId="'overAgeReasonOther'"
                        style="margin-left: 25%;">
            <ta-input :disabled='disabled' />
          </ta-form-item>
          <ta-form-item label="续发截止时间"
                        :fieldDecoratorId="'superventionOverDate'"
                        :require="{message:'请选择截止时间'}">
            <ta-month-picker format="YYYY-MM"
                             :disabledDate="disabledSupDate"
                             style="width: 100%"
                             :disabled='disabled' />
          </ta-form-item>
          <ta-form-item label="填报人"
                        :fieldDecoratorId="'createUser'"
                        :require="{message:'请输入填报人'}">
            <ta-input :disabled='true' />
          </ta-form-item>
          <ta-form-item label="续发提交日期"
                        :fieldDecoratorId="'superventionDate'"
                        :require="{message:'请选择续发提交日期'}">
            <ta-date-picker format="YYYY-MM-DD"
                            style="width: 100%"
                            :disabled='true' />
          </ta-form-item>
          <ta-form-item label="当前状态"
                        :fieldDecoratorId="'currentStatus'"
                        :require="{message:'请输入当前状态'}">
            <ta-input :disabled='true' />
          </ta-form-item>
          <ta-form-item label="备注"
                        :fieldDecoratorId="'remark'">
            <ta-textarea :rows="4"
                         :disabled='disabled' />
          </ta-form-item>
          <ta-form-item label="附件"
                        fieldDecoratorId="cooperativeAgreement"
                        style="width: 100%">
            <ta-upload :withCredentials="true"
                       name="file"
                       :multiple="true"
                       :action="action"
                       :disabled="disabled"
                       :fileList="fileList"
                       :remove="handleRemove"
                       @preview="preview"
                       :data="fileData('9','fileList')"
                       :beforeUpload="beforeUpload"
                       @change="filechange">
              <ta-button :disabled='disabled'>
                <ta-icon type="upload" />上传文件
              </ta-button>
            </ta-upload>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="handleCancel">返回</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="editFlag == 'edit'"
                     @click="handleOk">提交</ta-button>
        </div>
      </ta-drawer>
    </div>
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '22%',
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '身份证号',
  //   width: '18%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '18%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '18%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '20%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '续发提交日期',
    dataIndex: 'superventionDate',
    width: '20%',
    align: 'center',
    scopedSlots: { customRender: 'superventionDate' }
  },
  {
    title: '续发截止时间',
    dataIndex: 'superventionOverDate',
    align: 'center',
    width: '20%',
    scopedSlots: { customRender: 'superventionOverDate' }
  },
  {
    title: '末领年月',
    dataIndex: 'endYears',
    align: 'center',
    width: '20%'
  },
  {
    title: '享受状态',
    width: '18%',
    dataIndex: 'currentStatus',
    scopedSlots: { customRender: 'currentStatus' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      issearch: false,
      disabled: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overAgeTipApi/pageOverAgeSupervention' // 数据列表接口，API地址
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
      id: '', // 儿童入院id
      name: '', // 儿童姓名
      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据

      iswelfare: window.parent.indexTool.getUserInfo().orgType == 99,

      // 详情弹窗
      visible: false,
      width: '500px',
      confirmLoading: false,
      overAgeReasonList: [], // 超龄续发原因
      radio: '', // 超龄其他原因选择的数据
      fileList: [],
      reductionObj: {}, // 修改时的列表内容
      editFlag: '',
      upLoadPathIds: [] // 附件上传存放的id数组
    }
  },
  mounted () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    this.initdatas()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 超龄续发原因的选择
    getReasonRadio (e) {
      this.radio = e
    },
    // 初始化数据
    initdatas () {
      this.disabled = false
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
          if (name == 'childTypeList' && this.childTypeCode == 'CHILDCATEGORYM') {
            _self[name].splice(-2, 0, { label: '福利机构养育孤弃儿童', value: '1' }, { label: '福利机构代养困境儿童', value: '2' })
          }
        }
      })
    },
    // 续发截止日期不能小于当前日期
    disabledSupDate (current) {
      return current && current < moment(this.reductionObj.birthday).add(18, 'years') // 昨天下午4点21分
    },
    preview (file) { this.downloadFile(file) },
    // 取消点击事件
    handleCancel (e) {
      this.visible = false
      this.modelForm.resetFields()
      this.handleSubmit()
    },
    handleOk () {
      if (this.fileList) {
        if (this.fileList.length > 0) {
          this.fileList.forEach(item => {
            this.upLoadPathIds.push(item.response.data.data.fileid)
          })
        }
      }
      if (this.upLoadPathIds.length == 0) {
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
    toSubmit () {
      const _self = this
      const url = '/overAgeTipApi/updateSuperventionChildById' // '/overAgeTipApi/submitSuperventionChild'
      _self.modelForm.validateFields((err, values) => {
        if (!err) {
          const modelForm = _self.modelForm.getFieldsValue()
          modelForm.birthday = moment(modelForm.birthday).format('YYYY-MM-DD')
          modelForm.superventionOverDate = moment(modelForm.superventionOverDate).format('YYYY-MM')
          modelForm.id = _self.reductionObj.id
          if (_self.upLoadPathIds.length > 0) {
            modelForm.upLoadPathIds = _self.upLoadPathIds
          }
          _self.post(url, modelForm).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('数据操作成功！')
              _self.handleCancel()
            }
          })
        } else {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    look (e) {
      this.visible = true
      this.disabled = true
      this.reductionObj = e
      this.editFlag = 'look'
      this.post('/overAgeTipApi/detailOverAgeSupervention', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.id = e.childEnterId
          this.name = data.name
          this.radio = data.overAgeReason
          data.birthday = data.birthday ? moment(data.birthday) : null
          data.superventionDate = data.superventionDate ? moment(data.superventionDate) : null
          data.superventionOverDate = data.superventionOverDate ? moment(data.superventionOverDate, 'YYYY-MM') : null
          this.fileList = data.fileList
          this.$nextTick(() => {
            this.modelForm.setFieldsValue(data)
          })
        }
      })
    },
    edit (e) {
      this.visible = true
      this.disabled = false
      this.reductionObj = e
      this.editFlag = 'edit'
      this.post('/overAgeTipApi/detailOverAgeSupervention', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.id = e.childEnterId
          this.name = data.name
          this.radio = data.overAgeReason
          data.birthday = data.birthday ? moment(data.birthday) : null
          data.superventionDate = data.superventionDate ? moment(data.superventionDate) : null
          data.superventionOverDate = data.superventionOverDate ? moment(data.superventionOverDate, 'YYYY-MM') : null
          this.fileList = data.fileList
          this.$nextTick(() => {
            this.modelForm.setFieldsValue(data)
          })
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 点击姓名查看儿童详情
    childDetail (e) {
      let id = this.id
      if (e != 'xf') {
        id = e.childEnterId
      }
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: id }), operateFlag: 'look_now' }
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
          // this.upLoadPathIds.push(info.file.response.data.data.fileid)
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
    // 附件删除
    handleRemove (e) {
      if (this.editFlag == 'look') {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
          _self.$emit('fileDataProcess', 'del', fileId)
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
.spilwid3 {
  width: 430px;
}
</style>
