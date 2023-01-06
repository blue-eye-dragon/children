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
          <template v-if="!disabled">
            <span @click="edit(val,obj,index)"
                  class="com_textedit">编辑</span>
            <!-- <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm> -->
          </template>
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
    <ta-drawer title="评估信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="评估结果"
                      fieldDecoratorId="assessmentResult"
                      :fieldDecoratorOptions="rules.assessmentResult"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit"
                     placeholder="请选择评估结果">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in assessmentList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="评估分数"
                      fieldDecoratorId="assessmentGrade"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.assessmentGrade">
          <ta-input-number :min="0"
                           :max="100"
                           :precision='0'
                           style="width:100%"
                           placeholder="请输入评估分数"
                           :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="评估负责人"
                      fieldDecoratorId="assessmentPersonInCharge"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.assessmentPersonInCharge">
          <ta-input :disabled="idedit"
                    placeholder="请输入评估负责人" />
        </ta-form-item>
        <ta-form-item label="评估日期"
                      fieldDecoratorId="assessmentDate"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :fieldDecoratorOptions="rules.assessmentDate">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          placeholder="请选择评估日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="是否初次评估"
                      fieldDecoratorId="isFirstAssessment"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.isFirstAssessment">
          <ta-select :disabled="idedit"
                     placeholder="请选择是否初次评估">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in yesnoList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="评估小结"
                      fieldDecoratorId="assessmentSummary"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.assessmentSummary">
          <ta-textarea placeholder="请输入评估小结"
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
    title: '评估日期',
    dataIndex: 'assessmentDate'
  },
  {
    title: '评估结果',
    dataIndex: 'assessmentResult',
    collectionType: 'ASSESSMENT_RESULTS'
  },
  {
    title: '评估分数',
    dataIndex: 'assessmentGrade'
  },
  {
    title: '评估负责人',
    dataIndex: 'assessmentPersonInCharge'
  },
  {
    title: '是否初次评估',
    dataIndex: 'isFirstAssessment',
    collectionType: 'YESNO'
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
  mixins: [localList],
  props: {
    listFosterFamilyAssessment: {
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
        assessmentResult: this.verificationRules('评估结果'),
        assessmentGrade: this.verificationRules('评估分数', '0'),
        assessmentPersonInCharge: this.verificationRules('评估负责人', 72),
        assessmentDate: this.verificationRules('评估日期', true),
        isFirstAssessment: this.verificationRules('是否初次评估'),
        assessmentSummary: this.verificationRulesNotMustFill('评估小结', 200, true)
      },
      tablename: 'listFosterFamilyAssessment',
      assessmentList: [],
      yesnoList: [],
      updata: {
        functionalType: '1',
        busiType: '33'
      },
      fileList: []
    }
  },
  mounted () {
    this.getassessment()
    this.getyesno()
  },
  activated () {
    this.visible = false
  },
  methods: {
    // 评估日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    setContainer () {
      return this.set_Container('tadrawer')
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
    // 评估结果
    async getassessment () {
      let data = await this.getDictionaries('ASSESSMENT_RESULTS')
      this.assessmentList = data
    },
    // 是否
    async getyesno () {
      let data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    },
    // 日期处理
    dateprocessing (data) {
      let filePathVos = []
      if (data.filePathVos) {
        // 接口返回数据
        filePathVos = JSON.parse(data.filePathVos)
      } else if (data.filePathVo) {
        // 本地编辑数据
        filePathVos = data.filePathVo.fileList
      }
      // 字段名字 赋值
      data.filePathVo = {
        file: {},
        fileList: filePathVos
      }
      this.fileList = filePathVos
      data.assessmentDate = moment(data.assessmentDate, 'YYYY-MM-DD')
      //   this.addressmodel = [data.censusRegisterPro, data.censusRegisterCity, data.censusRegisterCounty]
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
.warntext {
  width: 100%;
  // height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  // display: flex;
  align-items: center;
}
</style>
