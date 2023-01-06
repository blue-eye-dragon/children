<template>
  <div class="searchdata"
       id="content">
    <!-- 信息上报记录 -->
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          class="spilwid3"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入身份证号"></ta-input>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <div>
          <div class="visitbtntop radioClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审核</ta-radio-button>
              <ta-radio-button value="3">通过</ta-radio-button>
              <ta-radio-button value="4">驳回</ta-radio-button>
            </ta-radio-group>
            <div style="float: right;">
              <ta-button type="primary"
                         icon="plus"
                         @click="toNew">新增</ta-button>
            </div>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :columns.sync="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{see(null,record,index)}}})"
                  bordered
                  ref="table">
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="currentStatus"
               slot-scope="a,b,c">
            <span v-if="b.currentStatus==0||b.currentStatus==2"
                  class="com_tobesubmitted">待提交</span>
            <span v-if="b.currentStatus==1"
                  class="com_tobeaudited">待审核</span>
            <span v-if="b.currentStatus==3"
                  class="com_adopt">通过</span>
            <span v-if="b.currentStatus==4"
                  class="com_reject">驳回</span>
          </div>
          <div slot="status"
               slot-scope="a,b,c">
            <span v-if="b.status==0||b.status==2"
                  class="com_tobesubmitted">待提交</span>
            <span v-if="b.status==1"
                  class="com_tobeaudited">待审核</span>
            <span v-if="b.status==3"
                  class="com_adopt">通过</span>
            <span v-if="b.status==4"
                  class="com_reject">驳回</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  v-if="obj.currentStatus!=0&&obj.currentStatus!=2"
                  @click="see(text,obj,index)">查看</span>
            <span class="com_textreject"
                  @click="returnBack(text,obj,index)"
                  v-if="obj.currentStatus==1">撤回</span>
            <template v-if="obj.currentStatus==0||obj.currentStatus==2">
              <span @click="edit(text,obj,index)"
                    class="com_textedit">编辑</span>
              <ta-popconfirm title="确定删除吗?"
                             @confirm="dels(obj)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </template>
            <span v-if="obj.currentStatus==4"
                  @click="retuedit(text,obj,index)"
                  class="com_textedit">编辑</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="mixPageRef" />
      </div>
      <ta-drawer title="退回原因"
                 width="500px"
                 placement="right"
                 :closable="false"
                 :maskClosable="false"
                 :visible="contentVisible"
                 :getContainer="setContainer">
        <ta-form layout="inline"
                 :autoFormCreate="(backForm)=>{this.backForm=backForm}">
          <ta-form-item label="退回原因"
                        fieldDecoratorId="remark"
                        style="width:450px"
                        :fieldDecoratorOptions="this.verificationRules('退回原因', 60,false)"
                        :labelCol="{ span:5}"
                        :wrapperCol="{ span: 19 }">
            <ta-textarea placeholder="请输入退回原因"
                         :rows="10" />
          </ta-form-item>
          <ta-form-item label="材料上传"
                        fieldDecoratorId="type2"
                        style="width:450px"
                        :labelCol="{ span:5 }"
                        :wrapperCol="{span:19}"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '请上传材料'}]}">
            <ta-upload :withCredentials="true"
                       :multiple="true"
                       :action="action"
                       name="file"
                       :fileList="fileList"
                       :remove="handleRemove"
                       @preview="preview"
                       :data="fileData('43','fileList')"
                       :beforeUpload="beforeUpload"
                       @change="filechange($event)">
              <ta-button>
                <ta-icon type="upload" /> 上传文件
              </ta-button>
            </ta-upload>
            <div class="warntext">
              请上传身份不符合认定标准的相关证明材料
              <p>
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </div>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button style="margin-right: 8"
                     @click="onClose">
            返回
          </ta-button>
          <ta-button @click="onSubmit"
                     type="primary">提交</ta-button>
        </div>
      </ta-drawer>
    </ta-border-layout>
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '18%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '15%'
  },
  {
    title: '出生日期',
    align: 'center',
    dataIndex: 'birthday',
    width: '17%'
  },
  {
    title: '申请日期',
    align: 'center',
    dataIndex: 'reportTime',
    width: '17%'
  },
  {
    title: '当前状态',
    align: 'center',
    dataIndex: 'currentStatus',
    scopedSlots: { customRender: 'currentStatus' },
    width: '15%'
  },
  {
    title: '操作',
    overflowTooltip: false,

    dataIndex: 'action',
    width: 220,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '0',
      backObj: {},
      tableColumns,
      tableData: [],
      yesNoList: [],
      fileList: [],
      page: 1,
      size: 10,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/AddUnattendedChildApi/pageUnattendedChildByStatus' // 数据列表接口，API地址
      },
      key: '5',
      orgId: '',
      areaCode: '',
      contentVisible: false,
      notWelfare: window.parent.indexTool.getUserInfo().orgType != '99', // 不是福利院
      isCounty: window.parent.indexTool.getUserInfo().areaLevel == '4', // 乡镇用户
      isFirst: true // 第一次进页面标识
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.getdit()
    this.orgId = window.parent.indexTool.getUserInfo().orgId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
  },
  activated () {
    this.isFirst = true
    this.backObj = {}
    this.contentVisible = false
    this.page = 1
  },
  methods: {
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

        this.$emit('uochanhei')
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
    },
    async getdit () {
      this.yesNoList = await this.getDictionaries('YESNO')
      console.log(this.yesNoList)
    },
    // 新增
    toNew () {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          holle: 'yes',
          isadd: 'sd',
          type: 'add',
          isOtherAdd: '11'
        }

      })
    },
    //   编辑
    edit (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          childtypedisabled: 1,
          id: obj.addUnattendedId,
          type: 'edit',
          isOtherEdit: '11'
        }
      })
    },
    // 驳回编辑
    retuedit (text, obj, index) {
      console.log(123)
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          childtypedisabled: 1,
          isreject: true,
          isOtherEdit: '11',
          id: obj.addUnattendedId
        }
      })
    },
    //   撤回
    returnBack (text, obj, index) {
      this.post('/AddUnattendedChildApi/beforeCheckOfUna', { addUnattendedId: obj.addUnattendedId }).then((res) => {
        if (!res.errors) {
          this.$router.push({
            name: 'noonesupportfact',
            query: {
              status: 3,
              childtypedisabled: 1,
              id: obj.addUnattendedId,
              isdisabled: 1,
              currentStatus: obj.currentStatus
            }
          })
        } else {
        }
      })
    },
    //   查看
    see (text, obj, index) {
      obj.disabled = true
      this.$router.push({
        name: 'auditLog',
        query: {
          obj: JSON.stringify(obj)
        }
      })
    },
    async dels (obj) {
      const url = '/AddUnattendedChildApi/deleteUnattendedChild'
      const params = {
        addUnattendedId: obj.addUnattendedId
      }
      const data = await this.post(url, params
      )
      if (!data.errors) {
        this.$message.success('删除成功')
        this.handleSubmit()
      }
    },
    onClose () {
      this.contentVisible = false
      this.fileList = []
      this.backForm.resetFields()
    },
    onSubmit () {
      this.backForm.validateFields((err, values) => {
        if (!err) {
          if (this.fileList.length == 0) {
            this.$message.error('请上传必要附件！')
            return false
          }
          const params = this.backForm.getFieldsValue()
          if (params.type2) {
            delete params.type2
          }
          params.addUnattendedId = this.backObj.addUnattendedId
          params.isAnotherPlaceApply = this.backObj.isAnotherPlaceApply
          params.upLoadPathIds = []
          this.fileList.forEach(item => {
            params.upLoadPathIds.push(item.response.data.data.fileid)
          })
          const _self = this
          _self.post('AddUnattendedChildApi/backToUnattendedChild', params).then(res => {
            if (!res.errors) {
              this.fileList = []
              _self.$message.success('退回成功!')
              _self.contentVisible = false
              _self.handleSubmit()
            }
          })
        } else {
          this.$message.error('检验不通过，请重新进行查验')
        }
      })
    },
    setContainer () {
      return document.getElementById('content')
    },
    otherRemove (e) {
      console.log(11)
      const _self = this
      _self.post('AddUnattendedChildApi/backToUnattendedChild', {
        addUnattendedId: e.addUnattendedId
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('退回成功!')
          _self.handleSubmit()
        }
      })
    },
    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.pageFlag = 1
      formData.orgId = this.orgId
      formData.areaCode = this.areaCode
      formData.type = this.nowkey
      // 如果是从工作台跳转过来的首次查询，则数据来源默认传两个值1异地、2平台
      if (window.location.href.includes('fromWorkTable') && !formData.isAnotherPlaceApply && this.isFirst) {
        formData.isAnotherPlaceApply = '1,2'
        this.isFirst = false
      }

      this.changetime(formData)
      return formData
    },
    resetFrom () {
      this.value = []
      this.searchForm.resetFields()
      this.handleSubmit('search')
    }
  }
}
</script>
<style scoped lang='less'>
.spilwid3 {
  width: 300px;
}
.warntext {
  width: 100%;
  height: 90px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  align-items: center;
  p {
    display: flex;
    margin-top: 10px;
    .icons {
      margin: 0 7px 0 0;
    }
  }
}
</style>
