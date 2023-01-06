<template>
  <div>
    <div class="visitbtn"
         v-if="!disabled">
      <ta-button type="primary"
                 class="addbtn"
                 @click="addAdoption">新增</ta-button>
      <ta-popconfirm title="确定删除吗?"
                     @confirm="Batchdeletion"
                     okText="确定"
                     cancelText="取消">
        <ta-button type="danger"
                   :disabled="isdisabled">批量删除</ta-button>
      </ta-popconfirm>
    </div>
    <div>
      <ta-table class="tables"
                :columns="tableColumns"
                :dataSource="showlist"
                :rowSelection="rowSelection"
                bordered>
        <span slot="num"
              slot-scope="val,obj,index">
          <span>{{ size * (page - 1) + index + 1 }}</span>
        </span>
        <span slot="sex"
              slot-scope="val,obj">
          <span>{{ obj.sex | sexfilter}}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="see(val,obj,index)"
                class="com_textsee">查看</span>
          <span @click="edit(val,obj,index)"
                v-if="!disabled"
                class="com_textedit">编辑</span>
          <!-- <ta-popconfirm title="确定删除吗?"
                         @confirm="deletes(val,obj,index)"
                         okText="确定"
                         cancelText="取消">
            <span class="com_textdel">删除</span>
          </ta-popconfirm> -->
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"
                     class='pagination'
                     showSizeChanger
                     showQuickJumper
                     @showSizeChange="showSizeChange"
                     @change="pagechange"
                     :total="total" />
    </div>
    <ta-drawer title="体检信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <div id="content">
        <ta-form class="drawerFrom"
                 :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="体检人"
                        fieldDecoratorId="physicalExaminationMember"
                        :fieldDecoratorOptions="rules.physicalExaminationMember"
                        :labelCol="{ span: 6 }">
            <ta-input :disabled="idedit"
                      placeholder="请输入体检人" />
          </ta-form-item>
          <ta-form-item label="体检日期"
                        fieldDecoratorId="physicalExaminationDate"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="rules.physicalExaminationDate">
            <ta-date-picker :disabled="idedit"
                            :disabledDate="disabledDate"
                            style="width: 100%;"
                            placeholder="请选择体检日期" />
          </ta-form-item>
          <ta-form-item label="体检总结"
                        fieldDecoratorId="physicalExaminationSummary"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="rules.physicalExaminationSummary">
            <ta-textarea placeholder="请输入体检总结"
                         :disabled="idedit"
                         :rows="4" />
          </ta-form-item>
          <ta-form-item label="附件上传"
                        fieldDecoratorId="filePathVo"
                        :labelCol="{ span: 6 }">
            <ta-upload :withCredentials="true"
                       name="file"
                       :multiple="true"
                       :action="action"
                       :data="updata"
                       :fileList="fileList"
                       :beforeUpload="beforeUpload"
                       @change="handleChange"
                       @preview="preview">
              <div>
                <ta-button :disabled="idedit">
                  <ta-icon type="upload" />上传
                </ta-button>
              </div>
            </ta-upload>
            <p class="warntext">
              <ta-icon type="info-circle-o"
                       class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
            </p>
          </ta-form-item>
        </ta-form>
      </div>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import localList from '@component/common/js/mixins/localList'
import Health from '@component/common/components/health'
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
    title: '体检日期',
    dataIndex: 'physicalExaminationDate'
  },
  {
    title: '体检人',
    dataIndex: 'physicalExaminationMember'
  },
  {
    title: '体检总结',
    dataIndex: 'physicalExaminationSummary'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [localList],
  props: {
    listFosterFamilyPhysicalExaminationInfo: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Health
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      rules: {
        physicalExaminationMember: this.verificationRules('体检人', 72),
        physicalExaminationDate: this.verificationRules('体检日期'),
        physicalExaminationSummary: this.verificationRules('体检总结', 200, false)
      },
      tablename: 'listFosterFamilyPhysicalExaminationInfo',
      updata: {
        functionalType: '1',
        busiType: '28'
      },
      fileList: []
    }
  },
  mounted () {
  },
  activated () {
    this.visible = false
  },
  methods: {
    // 申请日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 日期处理
    // 日期处理
    dateprocessing (data) {
      data.physicalExaminationDate = moment(data.physicalExaminationDate)
      let filePathVos = []
      if (data.filePathVos) {
        // 接口返回数据
        filePathVos = JSON.parse(data.filePathVos)
      } else {
        // 本地编辑数据
        if (data.filePathVo) {
          filePathVos = data.filePathVo.fileList
        }
      }
      // 字段名字 赋值
      data.filePathVo = {
        file: {},
        fileList: filePathVos
      }
      this.fileList = filePathVos
    },
    // dateprocessing (data) {
    //   data.physicalExaminationDate = moment(data.physicalExaminationDate)
    //   let filePathVos = []
    //   if (data.filePathVos) {
    //     // 接口返回数据
    //     filePathVos = JSON.parse(data.filePathVos)
    //   } else {
    //     // 本地编辑数据
    //     filePathVos = data.filePathVo.fileList
    //   }
    //   // 字段名字 赋值
    //   data.filePathVo = {
    //     file: {},
    //     fileList: filePathVos
    //   }
    //   this.fileList = filePathVos
    // },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    preview (file) { this.downloadFile(file) },
    handleChange (info) {
      console.log('chans')
      console.log(info)
      if (info.file.status === 'uploading') {
        console.log(info.file.status)
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.idedit) {
          return false
        }
        this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        if (info.file.response.errors && info.file.response.errors.length != 0) {
          this.$message.error('上传失败')
          this.fileList.splice(-1, 1)
          return false
        }
        // 上传成功
        this.fileList = info.fileList
        console.log(info.file.status)
        this.$message.success('文件上传成功!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 16px;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
.warntext {
  width: 100%;
  height: 80px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
</style>
