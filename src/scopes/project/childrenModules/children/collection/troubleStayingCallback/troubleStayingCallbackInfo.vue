<template>
  <!-- 留守困境回访list   -->

  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :forceRender="true"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item>
            <ta-button type="primary"
                       v-if='!disabled'
                       @click="newOne">新增记录</ta-button>
            <ta-button class="btnleft"
                       @click="back">返回</ta-button>
          </ta-form-item>
        </ta-form>

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>

          <!-- :haveSn="true"   :rowSelection="mixRowSelection"-->

          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj,true)"
                  class="com_textsee">查看</span>
            <span @click="see(val,obj,false)"
                  v-if='!disabled'
                  class="com_textsee">编辑</span>

            <ta-popconfirm title="确认删除吗?"
                           v-if='!disabled'
                           @confirm="del(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <!-- <span @click="visit(val,obj,index)"
                  class="com_textsee">回访</span> -->
          </div>
        </ta-table>

        <ta-pagination class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <div>
      <ta-drawer title="回访信息"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">

          <ta-form-item label="姓名"
                        fieldDecoratorId="name">
            <ta-input :placeholder="disabled2?'':'请输入姓名'"
                      :disabled='true'> </ta-input>

          </ta-form-item>

          <ta-form-item label="回访日期"
                        fieldDecoratorId="returnVisitDate"
                        :require="{message:'请选择回访日期!'}">

            <ta-date-picker :placeholder="disabled2?'':'请选择回访日期'"
                            :disabled='disabled2' />

          </ta-form-item>
          <ta-form-item label="回访方式"
                        fieldDecoratorId="returnVisitType"
                        :require="{message:'请选择回访方式!'}">

            <ta-select allowClear
                       :disabled='disabled2'
                       :placeholder=" '请选择回访方式'">
              <ta-select-option v-for="item in returnVisitTypeList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="回访情况"
                        fieldDecoratorId="returnVisitContent"
                        :fieldDecoratorOptions="this.verificationRules('回访情况', 200,true)">

            <ta-textarea :placeholder="disabled?'':'请输入回访情况'"
                         :disabled='disabled2'> </ta-textarea>

          </ta-form-item>
          <ta-form-item label="回访人员"
                        :fieldDecoratorOptions="this.verificationRules('回访人员', 72)"
                        fieldDecoratorId="returnVisitorName">
            <ta-input :placeholder="disabled?'':'请输入回访人员'"
                      :disabled='disabled2'> </ta-input>

          </ta-form-item>

          <ta-form-item label="附件上传"
                        :labelCol="{ span: 6 }">
            <!-- name="file" -->
            <ta-upload :withCredentials="true"
                       name="file"
                       :data="data_"
                       :multiple="true"
                       :action="action"
                       :fileList="fileList"
                       @change="handleChange"
                       @preview="confirmDownload"
                       :beforeUpload="beforeUpload">
              <ta-button :disabled="disabled2">
                <ta-icon type="upload" />上传文件
              </ta-button>
            </ta-upload>
          </ta-form-item>

          <ta-form-item v-if="disabled2"
                        label="登记机构"
                        fieldDecoratorId="orgName">
            <ta-input :disabled='true'> </ta-input>

          </ta-form-item>
          <ta-form-item v-if="disabled2"
                        label="登记人员"
                        fieldDecoratorId="createUserName">
            <ta-input :disabled='true'> </ta-input>

          </ta-form-item>
          <ta-form-item v-if="disabled2"
                        label="登记日期"
                        fieldDecoratorId="createTime"
                        :require="{message:'请选择退出日期'}">

            <ta-date-picker :disabled='true' />

          </ta-form-item>
          <ta-form-item label=" "
                        hidden
                        fieldDecoratorId="childId">
            <ta-input />
          </ta-form-item>
          <ta-form-item label=" "
                        hidden
                        fieldDecoratorId="id">
            <ta-input />
          </ta-form-item>

        </ta-form>

        <div slot="footer">

          <ta-button v-if="disabled2"
                     key="back"
                     @click="onClose">返回</ta-button>

          <ta-button v-if="!disabled2"
                     key="back"
                     @click="onClose">取消</ta-button>

          <ta-button v-if="!disabled2"
                     key="submit"
                     type="primary"
                     @click="submit()">确定</ta-button>

        </div>

      </ta-drawer>

    </div>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [

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
    overflowTooltip: true
  },
  {
    title: '回访日期',
    width: '16%',
    dataIndex: 'returnVisitDate',
    overflowTooltip: true
  },

  {
    title: '回访方式',
    width: '16%',
    dataIndex: 'returnVisitType',
    collectionType: 'RETURNVISITMODE',
    overflowTooltip: true
  },
  {
    title: '回访情况',
    width: '20%',
    dataIndex: 'returnVisitContent',
    overflowTooltip: true
  },
  {
    title: '回访人员',
    width: '16%',
    dataIndex: 'returnVisitorName',
    overflowTooltip: true
  },

  {
    title: '登记日期',
    width: '16%',
    dataIndex: 'createTime',
    overflowTooltip: true
  },
  {
    title: '操作',
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],

  data () {
    return {
      childTypeList: [{ value: '4', label: '留守儿童' }, { value: '6', label: '困境儿童' }],
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      returnVisitTypeList: [],
      visible: false,
      width: '620px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/leftOverAndDilemmaChildReturnVisit/list' // 数据列表接口，API地址
        // mixAddURL: '/employeeManagement/save', // 新增接口
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      childId: '',
      name: '',
      mixDataList: [],
      disabled2: false,
      data_: {
        functionalType: 77,
        busiType: 77
      },
      fileList: []

    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.getDicList()
  },
  activated () {
    this.disabled = this.$route.query.disabled
    this.disabled2 = this.disabled// ? this.disabled : false
    this.childId = this.$route.query.id
    this.name = this.$route.query.name
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled2) {
          return false
        } else {
          console.log(info.file.status)
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
    confirmDownload (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    async del (v, o) {
      const res = await this.post('/leftOverAndDilemmaChildReturnVisit/updateDelStateById', { id: o.id })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$message.success('删除成功')
        this.handleSubmit()
      }
    },
    cancel (e) { },
    newOne () {
      this.visible = true
      // this.form.resetFields()
      this.$nextTick(() => {
        this.form.setFieldsValue({
          childId: this.childId,
          name: this.name
        })
      })
    },
    back () {
      this.$router.go(-1)
    },
    async see (value, obj, index) {
      this.visible = true
      this.disabled2 = index

      const res = await this.post('/leftOverAndDilemmaChildReturnVisit/queryById', { id: obj.id }) // id未定
      const data = res.data.data

      if (data) {
        if (res.data.data.fileList) {
          const ffO = res.data.data.fileList
          this.fileList = ffO // 文件列表赋值回显
        }

        this.$nextTick(() => {
          this.form.setFieldsValue(data)
          this.form.setFieldsValue({
            returnVisitDate: data.returnVisitDate ? moment(data.returnVisitDate, 'YYYY-MM-DD') : null,
            createTime: data.createTime ? moment(data.createTime, 'YYYY-MM-DD') : null

          })
        })
      }

      // this.$nextTick(() => {
      //   this.form.setFieldsValue({ id: obj.id })
      // })
    },

    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const param = this.form.getFieldsValue()
          param.returnVisitDate = param.returnVisitDate.format('YYYY-MM-DD')
          const upLoadPathIds = [...this.fileList]
          const fileIds = []
          upLoadPathIds.map(item => {
            fileIds.push(item.response.data.data.fileid)
          })
          param.upLoadPathIds = fileIds
          let url = ''
          if (param.id) {
            url = '/leftOverAndDilemmaChildReturnVisit/update'
          } else {
            url = '/leftOverAndDilemmaChildReturnVisit/save'
          }
          const res = await this.post(url, param)
          if (!res.errors) {
            this.onClose()
            this.handleSubmit()
          }
        }
      })
    },

    userPageParams () {
      const formData = { childId: this.childId }
      return formData
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,

    //  字典
    async getDicList () {
      this.returnVisitTypeList = await this.getDictionaries('RETURNVISITMODE')
    },
    // 获取单位

    onClose () {
      this.fileList = []
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },

    showModal () {
      const ss = this.searchForm.getFieldsValue()

      this.namename = ss.name
      this.number = ss.employeeNumber

      this.showOn = true
    },
    handleOk (e) {
      this.Excel()
      this.showOn = false
    },
    handleCancel (e) {
      this.showOn = false
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}

.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
