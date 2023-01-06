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
            <span >删除</span>
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
    <ta-drawer title="寄养协议"
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
          <ta-form-item label="寄养儿童"
                        fieldDecoratorId="fosterChild"
                        :fieldDecoratorOptions="rules.fosterChild"
                        :labelCol="{ span: 6 }">
            <ta-input :disabled="idedit"
                      placeholder="请输入寄养儿童" />
          </ta-form-item>
          <ta-form-item label="协议类型"
                        fieldDecoratorId="agreementType"
                        :fieldDecoratorOptions="rules.agreementType"
                        :labelCol="{ span: 6 }">
            <ta-select :disabled="idedit"
                       placeholder="请选择协议类型">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in familyrelationsList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="协议签订日期"
                        fieldDecoratorId="agreementStartDate"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        :fieldDecoratorOptions="rules.agreementStartDate">
            <ta-date-picker :disabled="idedit"
                            style="width: 100%;"
                            v-model="startValue"
                            :disabledDate="disabledStartDate"
                            placeholder="请选择协议签订日期" />
          </ta-form-item>
          <ta-form-item label="协议到期日期"
                        fieldDecoratorId="agreementEndDate"
                        :labelCol="{ span: 6 }"
                        :wrapperCol="{span:18}"
                        :fieldDecoratorOptions="rules.agreementEndDate">
            <ta-date-picker :disabled="idedit"
                            style="width: 100%;"
                            v-model="endValue"
                            :disabledDate="disabledEndDate"
                            placeholder="请选择协议到期日期" />
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
            <p class="warntext"
               style="font-size:14px">
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
    title: '协议签订日期',
    dataIndex: 'agreementStartDate'
  },
  {
    title: '协议类型',
    dataIndex: 'agreementType',
    collectionType: 'FOSTERCAREAGREEMENTTYPE'
  },
  {
    title: '寄养儿童',
    dataIndex: 'fosterChild'
  },
  {
    title: '协议到期日期',
    dataIndex: 'agreementEndDate'
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
    listFosterFamilyFosterAgreement: {
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
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      rules: {
        fosterChild: this.verificationRules('寄养儿童', 72),
        agreementType: this.verificationRules('协议类型'),
        agreementStartDate: this.verificationRules('协议签订日期', true),
        agreementEndDate: this.verificationRules('协议签订日期', true)
      },
      tablename: 'listFosterFamilyFosterAgreement',
      familyrelationsList: [],
      updata: {
        functionalType: '1',
        busiType: '34'
      },
      fileList: [],
      startValue: null, // 协议签订日期
      endValue: null // 协议到期日期
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  mounted () {
    this.getfamilyrelations()
  },
  activated () {
    this.visible = false
  },
  methods: {
    // 新增
    addAdoption () {
      this.startValue = null
      this.endValue = null
      this.visible = true
      this.ishiderelationship = false
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.key = 1
      this.idedit = false
      this.fileList = []
    },
    // 协议签订日期处理（小于协议到期日期）
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      } else { // 开始日期小于结束日期
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 协议到期日期处理（大于协议签订日期）
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!startValue || !endValue) {
        return false
      } else { // 开始日期小于结束日期
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // FAMILYRELATIONS
    async getfamilyrelations () {
      const data = await this.getDictionaries('FOSTERCAREAGREEMENTTYPE')
      this.familyrelationsList = data
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    preview (file) { this.downloadFile(file) },
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
    },
    // 日期处理
    dateprocessing (data) {
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
      data.agreementStartDate = moment(data.agreementStartDate, 'YYYY-MM-DD')
      data.agreementEndDate = moment(data.agreementEndDate, 'YYYY-MM-DD')
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
  height: 70px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
}
</style>
