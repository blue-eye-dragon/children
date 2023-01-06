<template>
  <div style="height:100%">
    <div class="visitbtn"
         v-if="!basedisabled">
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
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span class="com_textsee"
                @click="see(val,obj,index)">查看</span>
          <!-- <ta-divider type="vertical"
                      v-if="!basedisabled" /> -->
          <span class="com_textedit"
                @click="edit(val,obj,index)"
                v-if="!basedisabled">编辑</span>
          <!-- <ta-divider type="vertical" />
          <ta-popconfirm title="确定删除吗?"  v-if="!basedisabled" @confirm="deletes(val,obj,index)" okText="确定" cancelText="取消">
          <span>删除</span>
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
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="体检日期"
                      fieldDecoratorId="physicalExaminationDate"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :fieldDecoratorOptions="rules.physicalExaminationDate">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          placeholder="请选择体检日期" />
        </ta-form-item>
        <ta-form-item label="身高（cm）"
                      fieldDecoratorId="height"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.height">
          <ta-input-number :min="1"
                           :max="300"
                           :precision='2'
                           style="width:100%"
                           :disabled="idedit"
                           placeholder="请输入身高" />
        </ta-form-item>
        <ta-form-item label="体重（kg）"
                      fieldDecoratorId="weight"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.weight">
          <ta-input-number :min="0.01"
                           :max="999.99"
                           :precision='2'
                           style="width:100%"
                           :disabled="idedit"
                           placeholder="请输入体重" />
        </ta-form-item>
        <ta-form-item label="体检总结"
                      fieldDecoratorId="physicalExaminationSummary"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.physicalExaminationSummary">
          <ta-textarea :disabled="idedit"
                       placeholder="请输入体检总结" />
        </ta-form-item>
        <ta-form-item label="附件"
                      fieldDecoratorId="filePathVo"
                      :fieldDecoratorOptions="rules.filePathVo">
          <ta-upload :withCredentials="true"
                     name="file"
                     :data="adoption"
                     :multiple="true"
                     :action="action"
                     :fileList="fileList"
                     :beforeUpload="beforeUpload"
                     @change="handleChange"
                     @preview="handlePreview">
            <ta-button :disabled="idedit">
              <ta-icon type="upload" />上传文件
            </ta-button>
          </ta-upload>
        </ta-form-item>
        <!-- <ta-form-item
          label=""
          :labelCol="{ span: 6 }"
        > -->
        <div class='uploadhintsout'>
          <div class='uploadhints'>
            附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
          </div>
        </div>
        <!-- </ta-form-item> -->
      </ta-form>
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
    width: ' 20%',
    dataIndex: 'physicalExaminationDate'
  },
  {
    title: '身高（cm）',
    width: ' 20%',
    dataIndex: 'height'
  },
  {
    title: '体重（kg）',
    width: ' 20%',
    dataIndex: 'weight'
  },
  {
    title: '体检总结',
    overflowTooltip: true,
    width: ' 40%',
    dataIndex: 'physicalExaminationSummary'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [localList],
  props: {
    physicalExaminationVoList: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    }
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
        physicalExaminationDate: this.verificationRules('体检日期', true),
        physicalExaminationSummary: this.verificationRules('体检总结', 200, true),
        filePathVo: this.verificationRules('附件')
      },
      tablename: 'physicalExaminationVoList',
      adoption: {
        functionalType: 4,
        busiType: 10
      },
      fileList: []
    }
  },
  activated () {
    this.visible = false
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 时间处理
    dateprocessing (data) {
      let filePathVos = []
      if (data.filePathVos) {
        // 接口返回数据
        filePathVos = JSON.parse(data.filePathVos)
      } else {
        // 本地编辑数据
        filePathVos = data.filePathVo.fileList
      }
      // 字段名字 赋值
      data.filePathVo = {
        file: {},
        fileList: filePathVos
      }
      data.physicalExaminationDate = moment(data.physicalExaminationDate)
      this.fileList = filePathVos
    },
    // 编辑
    edit (val, obj, index) {
      this.visible = true
      this.idedit = false
      this.nowindex = index
      // 单独处理日期
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.dateprocessing(data)
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
      this.key = 2
    },
    // 删除
    deletes (val, obj, index) {
      let e = parseFloat(index + ((this.page - 1) * this.size))
      this.$emit('chaadoptorChildrenVos', this.tablename, null, e)
      let arr = []
      if (obj.id) {
        arr.push(obj.id)
      }
      this.disengagement(arr)
    },
    // 批量删除
    Batchdeletion () {
      let index = 0
      let arr = []
      let isok = false
      this.chosedata.map(item => {
        if (item.id) {
          isok = true
          arr.push(item.id)
        }
      })
      this.rowSelection.selectedRowKeys.map(item => {
        let e = parseFloat((item - index) + ((this.page - 1) * this.size))
        this.$emit('chaadoptorChildrenVos', this.tablename, null, e)
        index++
      })
      if (!isok) {
        return false
      }
      this.disengagement(arr)
    },
    // 解除关系
    async disengagement (val) {
      let str = val.join(',')
      let params = {
        id: str
      }
      let data = this.post('/childPhysicalExamination/deleteAttachById', params)
    },
    // 增加
    addAdoption () {
      this.rowSelection.selectedRowKeys = []
      this.fileList = []
      this.isdisabled = true
      this.key = 1
      this.visible = true
      this.idedit = false
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    handlePreview (file) {
      this.downloadFile(file)
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
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
        this.$message.success('文件上传成功!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
  width: 100%;
  table-layout: inherit;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
.uploadhintsout {
  width: 75%;
  margin-left: 25%;
}
</style>
