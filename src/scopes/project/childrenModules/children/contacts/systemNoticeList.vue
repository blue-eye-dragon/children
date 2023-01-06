<!--
 * @Date: 2021-07-03 10:50:17
 * @information: 系统公告列表
-->
<template>
  <div id="system-notice-list"
       class="searchdata tadrawer">
    <!-- 布局 -->
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(form)=>{this.searchForm = form}">
        </ta-form>
        <div class="operateBtn">
          <ta-button type="primary"
                     @click="add"
                     icon="plus">新增</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>

          <span slot="isPopup"
                slot-scope="a">
            <span>{{ a == '1' ? '是' : '否'}}</span>
          </span>

          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <span slot="content"
                slot-scope="a, b, c">
            <span>{{a|deleteHtml }}</span>
          </span>

          <span slot="action"
                slot-scope="text, record"
                class="btnlist">
            <span @click="see(record)"
                  class="com_textsee">查看</span>

            <span @click="edit(record)"
                  class="com_textedit">编辑</span>

            <ta-popconfirm title="确认删除吗?"
                           @confirm="del(text,record)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>

          </span>

        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       @change="pagechange"
                       :dataSource.sync="tableData"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>

    <!-- 侧滑 -->
    <ta-drawer :title="getTitle(newFlag)"
               wrapClassName="wrap-container"
               width="1000px"
               placement="right"
               @close="visible = false"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">

        <ta-col :span="24">
          <ta-form-item label="标题"
                        fieldDecoratorId="title"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{ span: 20}"
                        :fieldDecoratorOptions="this.verificationRules('标题', 72)">
            <ta-input :placeholder="!disabled?'请输入标题':''"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="内容"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}"
                        style="height:550px"
                        fieldDecoratorId="content">
            <ta-rich-editor :custom-config="customConfig"
                            ref="richEditor"
                            style="height:500px"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="附件"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}">
            <ta-upload :withCredentials="true"
                       name="file"
                       :multiple="true"
                       :action="action"
                       :fileList="fileList"
                       :remove="handleRemove"
                       :beforeUpload="beforeUpload"
                       @preview="preview"
                       @change="filechange">
              <!-- :data="fileData('9','fileList')" -->
              <ta-button :disabled='disabled'>
                <ta-icon type="upload" />上传文件
              </ta-button>
            </ta-upload>
            <p class="warntext"
               style="margin: 10px 0;">
              <ta-icon type="info-circle-o"
                       class="icons"
                       style="margin-right: 5px;" />
              附件上传格式：doc、docx、pdf、odf；单个文件不能超过10M。
            </p>
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="是否弹框"
                        fieldDecoratorId="isPopup"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}"
                        :require="{message:'请选择是否弹框'}"
                        :fieldDecoratorOptions="{initialValue: '1'}">
            <ta-radio-group :options="options"
                            :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="公告展示日期"
                        fieldDecoratorId="noticeDate"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}"
                        :require="{message:'请选择公告展示日期'}">
            <ta-range-picker :disabled="disabled" />
          </ta-form-item>
        </ta-col>

      </ta-form>

      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="back">返回</ta-button>
        <ta-button @click="submit('0')"
                   v-if="newFlag!='see'"
                   type="primary">暂存</ta-button>
        <ta-button @click="submit('1')"
                   v-if="newFlag!='see'"
                   type="primary">推送</ta-button>
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
    width: '70px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: '25%'
  },
  {
    title: '内容',
    dataIndex: 'content',
    scopedSlots: { customRender: 'content' },
    width: '40%'
  },
  {
    title: '是否弹框',
    align: 'center',
    dataIndex: 'isPopup',
    width: '15%',
    scopedSlots: { customRender: 'isPopup' }
  },
  {
    title: '公告开始日期',
    align: 'center',
    dataIndex: 'noticeStartDate',
    width: '18%'
  },
  {
    title: '公告结束日期',
    align: 'center',
    dataIndex: 'noticeEndDate',
    width: '18%'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    width: '15%'
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
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      mixListOptions: {
        mixGetDataListURL: '/announcements/querySystemNoticeMsgList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      page: 1,
      size: 10,
      visible: false, // 新增抽屉控制显隐
      disabled: false, // 新增只读控制
      // 配置可输入图片内容
      customConfig: {
        uploadImgShowBase64: true
      },
      newFlag: '', // 侧滑类型标志，新增、编辑、查看
      fileList: [],
      uploadFiles: [],
      nowData: {}, // 当前行数据
      // 是否弹窗选项
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    }
  },
  filters: {
    deleteHtml (e) {
      return e.replace(/(<[^>]+>)/g, '').replace(/(&(lt|gt|nbsp|amp|quot);)/ig, (all, t) => { return { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }[t.replace(/&|;/g, '')] })
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  created () {

  },
  mounted () {

  },
  activated () {

  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:00:22
     * @information: 初始化数据
     */
    initData () {
      this.disabled = false
      this.newFlag = ''
      this.fileList = []
      this.uploadFiles = []
      this.nowData = {}
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:00:07
     * @information: 侧滑title
     */
    getTitle (val) {
      let title = ''
      switch (val) {
        case 'see':
          title = '查看'
          break
        case 'add':
          title = '新增'
          break
        case 'edit':
          title = '修改'
          break
      }
      return title
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 10:53:46
     * @information: 新增
     */
    add () {
      this.newFlag = 'add'
      this.disabled = false
      this.visible = true
      this.fileList = []
      this.uploadFiles = []
      this.$nextTick(() => {
        this.form.resetFields()
        this.$refs.richEditor.setContent('')
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 10:55:48
     * @information: 查看
     */
    see (e) {
      this.nowData = e
      this.newFlag = 'see'
      this.disabled = false
      this.post('/announcements/querySystemNoticeMsg', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(res.data.data)
            this.$refs.richEditor.setContent(res.data.data.content)
            if (res.data.data.fileList) {
              this.fileList = res.data.data.fileList
            }
            // 日期赋值
            let { noticeStartDate, noticeEndDate } = res.data.data
            if (noticeStartDate || noticeEndDate) {
              this.form.setFieldsValue({
                noticeDate: [
                  noticeStartDate ? moment(noticeStartDate) : '',
                  noticeEndDate ? moment(noticeEndDate) : ''
                ]
              })
            }
            this.disabled = true
          })
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 10:55:58
     * @information: 编辑
     */
    edit (e) {
      this.nowData = e
      this.newFlag = 'edit'
      this.disabled = false
      this.post('/announcements/querySystemNoticeMsg', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(res.data.data)
            this.$refs.richEditor.setContent(res.data.data.content)
            if (res.data.data.fileList) {
              this.fileList = res.data.data.fileList
            }
            // 日期赋值
            let { noticeStartDate, noticeEndDate } = res.data.data
            if (noticeStartDate || noticeEndDate) {
              this.form.setFieldsValue({
                noticeDate: [
                  noticeStartDate ? moment(noticeStartDate) : '',
                  noticeEndDate ? moment(noticeEndDate) : ''
                ]
              })
            }
            this.disabled = false
          })
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 10:56:44
     * @information: 删除
     */
    del (val, e) {
      this.post('/announcements/deleteSystemNoticeMsg', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('删除成功！')
          this.handleSubmit('search')
        }
      })
    },
    // 
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 10:59:32
     * @information: 分页change
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 12:17:11
     * @information: 返回
     */
    back () {
      this.form.resetFields()
      this.visible = false
      this.handleSubmit('search')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:05:17
     * @information: 0暂存， 1推送
     */
    submit (val) {
      this.uploadFiles = []
      let url = '/announcements/saveSystemNoticeMsg'
      if (this.newFlag == 'edit') {
        url = '/announcements/updateSystemNoticeMsg'
      }
      this.form.setFieldsValue({
        content: this.$refs.richEditor.getHtml()
      })
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = this.form.getFieldsValue()
          if (val == '0') {
            formData.saveStatus = '0'
          } else {
            formData.saveStatus = '1'
          }
          if (this.fileList) {
            if (this.fileList.length > 0) {
              this.fileList.forEach(item => {
                this.uploadFiles.push(item.response.data.data.fileid)
              })
            }
          }
          if (this.newFlag == 'edit') {
            formData.id = this.nowData.id
          }
          formData.uploadFiles = this.uploadFiles
          // 日期处理
          if (formData.noticeDate && formData.noticeDate.length) {
            formData.noticeStartDate = moment(formData.noticeDate[0]).format('YYYY-MM-DD')
            formData.noticeEndDate = moment(formData.noticeDate[1]).format('YYYY-MM-DD 23:59:59')
          }
          // 删除多余参数
          Reflect.deleteProperty(formData, 'noticeDate')
          this.post(url, formData, true).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据提交成功')
              this.back()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查')
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:02:27
     * @information: 文件删除
     */
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
          _self.$message.success('文件删除成功')
        })
        .catch(() => {
          _self.$message.error('文件删除失败')
        })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:02:54
     * @information: 文件预览
     */
    preview (file) {
      this.downloadFile(file)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:03:07
     * @information: 文件上传前
     */
    beforeUpload (file) {
      if (this.disabled) {
        return false
      } else {
        return this.before_Upload(file, 'fileWord')
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-07-03 11:03:49
     * @information: 上传 - 文件项更改时
     */
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
          this.$message.success('文件上传成功')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败')
        }
      }
    },


  },
}
</script>

<style lang="less">
#system-notice-list {
}
</style>

