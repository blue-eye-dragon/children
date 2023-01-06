<template>
  <div style="height: 100%;">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div>
          <h3>{{disabled?'查看大排查任务':'发布大排查任务'}}</h3>
          <ta-divider style="margin: 10px 0;" />
        </div>
        <div>
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.form = form}">
            <ta-row class="fromcom">
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label="任务文号"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="taskFileNo"
                                :fieldDecoratorOptions="verificationRules('任务文号',50)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入任务文号'" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="任务标题"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="taskTitle"
                                :fieldDecoratorOptions="verificationRules('任务标题',50)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入任务标题'" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="颁布机关"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="publishDeptName">
                    <ta-input :disabled='true'
                              :placeholder="''" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="任务类别"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                :require="{message:'请选择任务类别'}"
                                fieldDecoratorId="taskType"
                                :initValue="this.Enum.TASK_RESULT.DXPC">
                    <ta-select :placeholder="disabled?'':'请选择任务类别'"
                               :disabled="disabled"
                               @change="taskChange">
                      <ta-select-option v-for="(item ,index) in taskTypeList "
                                        :key="index"
                                        :value="item.value">{{item.label}}</ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="指标库分类"
                              v-if="this.taskTypeSelect==this.Enum.TASK_RESULT.DXPC"
                              class="alonerow"
                              fieldDecoratorId="indexDbClassific"
                              :require="{message:'请选择指标库分类'}">
                  <ta-select :placeholder="disabled?'':'请选择指标库分类'"
                             :disabled="disabled"
                             @change="dbClassChange">
                    <ta-select-option v-for="(item ,index) in indexDbClassificList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label='颁布内容'
                              fieldDecoratorId="taskContent"
                              class='alonerow'
                              :fieldDecoratorOptions="verificationRulesNotMustFill('颁布内容',300,true)">
                  <ta-textarea :placeholder="!disabled?'请输入颁布内容':''"
                               :rows="4"
                               :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label='颁布日期'
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="publishDate"
                                :require="{message:'请选择颁布日期'}">
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择颁布日期':''"
                                    :disabled="disabled"
                                    :disabledDate="disabledDate" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="颁布人员"
                                :labelCol="{span:7}"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="publishUser"
                                :fieldDecoratorOptions="verificationRules('颁布人员',20)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入颁布人员'" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label='任务开始日期'
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="taskStartDate"
                                :require="{message:'请选择任务开始日期'}">
                    <ta-date-picker style="width: 100%;"
                                    :disabledDate="disabledStartDate"
                                    v-model="startValue"
                                    :placeholder="!disabled?'请选择任务开始日期':''"
                                    :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label='任务结束日期'
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}"
                                fieldDecoratorId="taskEndDate"
                                :require="{message:'请选择任务结束日期'}">
                    <ta-date-picker style="width: 100%;"
                                    :disabledDate="disabledEndDate"
                                    v-model="endValue"
                                    :placeholder="!disabled?'请选择任务结束日期':''"
                                    :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label="选择检查项目"
                                :labelCol="{span:9}"
                                :wrapperCol="{span:15}"
                                fieldDecoratorId="selectItem"
                                :require="{message:'请选择检查项目'}">
                    <ta-button type="primary"
                               :disabled="disabled"
                               class="preservation"
                               @click='addItem'>添加</ta-button>
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label>
                  <div class="chosechild">
                    <div v-if="this.taskTypeSelect==this.Enum.TASK_RESULT.ZHPC|| this.dbClassSelect==this.Enum.INDEXDBCLASSIFIC.ETFLJG"
                         style="width: 100%;">
                      <!-- 儿童福利机构、收留抚养孤弃儿童的民间机构儿童养育情况自查和检查表数据 -->
                      <h4>儿童福利机构、收留抚养孤弃儿童的民间机构儿童养育情况自查和检查表:</h4>
                      <div v-for="(item,index) in welfareInsData"
                           :key="index"
                           :value="item.indexNum"
                           class="children">
                        {{item.indexNum}}
                        <ta-popconfirm title="确定删除吗?"
                                       @confirm="del(index,'01')"
                                       @cancel="cancel"
                                       okText="确定"
                                       cancelText="取消"
                                       v-if="!disabled">
                          <ta-icon class="dels"
                                   type="close" />
                        </ta-popconfirm>
                      </div>
                    </div>
                    <div v-if="this.taskTypeSelect==this.Enum.TASK_RESULT.ZHPC|| this.dbClassSelect==this.Enum.INDEXDBCLASSIFIC.SJGE"
                         style="width: 100%;">
                      <!-- 散居孤儿保障工作、收养工作自查和检查表数据 -->
                      <h4>散居孤儿保障工作、收养工作自查和检查表:</h4>
                      <div v-for="(item,index) in orphanOrphansData"
                           :key="index+'-'"
                           :value="item.indexNum"
                           class="children">
                        {{item.indexNum}}
                        <ta-popconfirm title="确定删除吗?"
                                       @confirm="del(index,'02')"
                                       @cancel="cancel"
                                       okText="确定"
                                       cancelText="取消"
                                       v-if="!disabled">
                          <ta-icon class="dels"
                                   type="close" />
                        </ta-popconfirm>
                      </div>
                    </div>
                  </div>
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label="附件"
                              class="alonerow">
                  <ta-upload :withCredentials="true"
                             name="file"
                             :multiple="true"
                             :action="action"
                             :disabled="disabled"
                             :fileList="fileList"
                             @remove="handleRemove"
                             @preview="preview"
                             :data="fileData('9','fileList')"
                             :beforeUpload="beforeUpload"
                             @change="filechange">
                    <ta-button>
                      <ta-icon type="upload" /> 上传文件
                    </ta-button>
                  </ta-upload>

                </ta-form-item>
                <ta-form-item label=""
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 22,offset:2}">
                  <p class="warntext">
                    <ta-icon type="info-circle-o"
                             class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
                  </p>
                </ta-form-item>
              </ta-col>

            </ta-row>
          </ta-form>
        </div>
      </div>
      <div slot="footer">
        <div class="bom1">
          <ta-button @click="returns"
                     class="btnleft">取消</ta-button>
          <ta-button type="primary"
                     @click="submit('1')"
                     v-if="!disabled"
                     class="btnleft temporarystorage">暂存</ta-button>
          <ta-button type="primary"
                     @click="submit('2')"
                     v-if="!disabled"
                     class="btnleft">发布</ta-button>
        </div>
      </div>
    </ta-border-layout>
    <!-- 选择检查项目的弹窗-全部 -->
    <ta-modal title="选择检查项目"
              v-model="visible"
              width="90%"
              @cancel="closePane"
              okText="确定"
              cancelText="取消"
              @ok="handleSubmit">
      <ChoiceInspectionItems :tableColumns="tableColumns"
                             v-if="visible"
                             @addData="addData"
                             @dels="dels"
                             :taskTypeSelect="taskTypeSelect"
                             :dbClassSelect="dbClassSelect"
                             :welfareInsList="welfareInsList"
                             :orphanOrphansList="orphanOrphansList"
                             :repeatdata="repeatdata"
                             url="specialIndexDbManage/checkProjectQueryPageList"></ChoiceInspectionItems>
    </ta-modal>
    <!-- 儿童福利机构检测表 -->
    <ta-modal title="选择检查项目"
              v-model="visible1"
              width="90%"
              @cancel="closePane"
              okText="确定"
              cancelText="取消"
              @ok="handleSubmit">
      <ChoiceInspectionItems1 :tableColumns="tableColumns"
                              v-if="visible1"
                              @addData="addData"
                              @dels="dels"
                              :taskTypeSelect="taskTypeSelect"
                              :dbClassSelect="dbClassSelect"
                              :welfareInsList="welfareInsList"
                              :orphanOrphansList="orphanOrphansList"
                              :repeatdata="repeatdata"
                              url="specialIndexDbManage/checkProjectQueryPageList"></ChoiceInspectionItems1>
    </ta-modal>
    <!-- 散居孤儿检查表 -->
    <ta-modal title="选择检查项目"
              v-model="visible2"
              width="90%"
              @cancel="closePane"
              okText="确定"
              cancelText="取消"
              @ok="handleSubmit">
      <ChoiceInspectionItems2 :tableColumns="tableColumns"
                              v-if="visible2"
                              @addData="addData"
                              @dels="dels"
                              :taskTypeSelect="taskTypeSelect"
                              :dbClassSelect="dbClassSelect"
                              :welfareInsList="welfareInsList"
                              :orphanOrphansList="orphanOrphansList"
                              :repeatdata="repeatdata"
                              url="specialIndexDbManage/checkProjectQueryPageList"></ChoiceInspectionItems2>
    </ta-modal>

  </div>

</template>
<script>
import moment from 'moment'
import ChoiceInspectionItems from '../components/choiceInspectionItems.vue'
import ChoiceInspectionItems1 from '../components/choiceInspectionItems_1.vue'
import ChoiceInspectionItems2 from '../components/choiceInspectionItems_2.vue'
const tableColumns = [
  {
    title: '编号',
    width: '35%',
    overflowTooltip: true,
    dataIndex: 'indexNum'
  },
  {
    title: '检查项目',
    overflowTooltip: true,
    width: '35%',
    dataIndex: 'checkProject'
  },
  {
    title: '指标类型',
    overflowTooltip: true,
    dataIndex: 'indexType',
    width: '30%',
    collectionType: 'INDEXTYPE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    ChoiceInspectionItems,
    ChoiceInspectionItems1,
    ChoiceInspectionItems2
  },
  data () {
    return {
      disabled: false,
      tableColumns,
      visible: false, // 弹窗显隐
      visible1: false, // 弹窗显隐-福利机构
      visible2: false, // 弹窗显隐-散居孤儿
      startValue: null, // 开始日期的值
      endValue: null, // 结束日期的值

      fileList: [],
      repeatdata: [], // 重复的数据
      taskTypeSelect: '1', // 任务类别选择的数据
      taskTypeList: [], // 任务类别的字典数据
      dbClassSelect: '', // 指标库分类选择的数据
      indexDbClassificList: [], // 指标库分类字典数据

      welfareInsList: [], // 儿童福利机构、收留抚养孤弃儿童的民间机构儿童养育情况自查和检查表数据（弹窗中）
      orphanOrphansList: [], // 散居孤儿保障工作、收养工作自查和检查表数据（弹窗中）
      welfareInsData: [], // 儿童福利机构、收留抚养孤弃儿童的民间机构儿童养育情况自查和检查表数据
      orphanOrphansData: [], // 散居孤儿保障工作、收养工作自查和检查表数据

      flag: '', // 区分新增、编辑、查看的标识符
      id: '' // 编辑、查看时的列表id
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  updated () {
    this.setLabelAndWrapperWidth('7.3%', '92.7%', 'alonerow') // 单独一行字段宽度控制
  },
  methods: {
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('INDEXDBCLASSIFIC', 'indexDbClassificList') // 获取指标库分类字典数据
      this.getMenu('TASK_RESULT', 'taskTypeList') // 获取任务类别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 初始化数据
    initDatas () {
      this.tableDatas = []
      this.taskTypeSelect = this.Enum.TASK_RESULT.DXPC
      this.dbClassSelect = ''
      this.flag = this.$route.query.flag
      this.disabled = false
      this.welfareInsData = []
      this.orphanOrphansData = []
      this.startValue = null
      this.endValue = null
      this.fileList = []
      // 颁布机关赋值
      const orgName = window.parent.indexTool.getUserInfo().orgName
      this.form.setFieldsValue({
        publishDeptName: orgName
      })
      // 编辑或查看数据回显
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        if (this.flag == 'look') {
          this.disabled = true
        }
        this.post('/specialInvestigateTask/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data
            data['taskStartDate'] = data.taskStartDate ? moment(data.taskStartDate) : null
            data['taskEndDate'] = data.taskEndDate ? moment(data.taskEndDate) : null
            data['publishDate'] = data.publishDate ? moment(data.publishDate) : null
            this.form.setFieldsValue(data)
            this.taskTypeSelect = data.taskType
            this.dbClassSelect = data.indexDbClassific
            // 附件赋值
            if (data.fileList && data.fileList instanceof Array) {
              this.fileList = data.fileList
            }
            // 选择检查项目赋值
            if (data.taskPlanVoList && data.taskPlanVoList instanceof Array) {
              for (var i = 0; i < data.taskPlanVoList.length; i++) {
                if (data.taskPlanVoList[i].indexDbClassific == '01') { // 福利机构
                  this.welfareInsData.push(data.taskPlanVoList[i])
                } else { // 散居孤儿
                  this.orphanOrphansData.push(data.taskPlanVoList[i])
                }
              }
            }
            for (let i = 0; i < this.welfareInsData.length; i++) {
              this.welfareInsData[i].id = this.welfareInsData[i].indexId
            }
            for (let i = 0; i < this.orphanOrphansData.length; i++) {
              this.orphanOrphansData[i].id = this.orphanOrphansData[i].indexId
            }
          }
        })
      }
    },
    // 任务开始日期限制
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    // 任务结束日期限制
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    // 任务类别的change事件
    taskChange (e) {
      this.welfareInsData = []
      this.orphanOrphansData = []
      this.taskTypeSelect = e
      if (e == this.Enum.TASK_RESULT.ZHPC) {
        this.dbClassSelect = ''
      }
    },
    // 指标库分类的change事件
    dbClassChange (e) {
      this.welfareInsData = []
      this.orphanOrphansData = []
      this.dbClassSelect = e
    },
    // 添加检查项目
    addItem (val, data) {
      if (this.taskTypeSelect != this.Enum.TASK_RESULT.ZHPC && this.dbClassSelect == '') {
        this.$message.error('请选择指标库分类！')
      } else {
        this.nowkey = val
        this.welfareInsList = JSON.parse(JSON.stringify(this.welfareInsData))
        this.orphanOrphansList = JSON.parse(JSON.stringify(this.orphanOrphansData))

        if (this.taskTypeSelect == this.Enum.TASK_RESULT.ZHPC) {
          this.visible = true
        } else if (this.dbClassSelect == this.Enum.INDEXDBCLASSIFIC.ETFLJG) {
          this.visible1 = true
        } else if (this.dbClassSelect == this.Enum.INDEXDBCLASSIFIC.SJGE) {
          this.visible2 = true
        }
      }
    },
    // 添加数据
    addData (val, type) {
      type == '01' ? this.welfareInsList = this.welfareInsList.concat(val) : this.orphanOrphansList = this.orphanOrphansList.concat(val)
    },
    // 判断是否选择了检查项目
    judgeSelectItem () {
      let tag = true
      if (this.taskTypeSelect == this.Enum.TASK_RESULT.ZHPC) { // 综合排查
        if ((!this.welfareInsData || this.welfareInsData.length == 0) && (!this.orphanOrphansData || this.orphanOrphansData.length == 0)) {
          tag = false
        }
      } else if (this.dbClassSelect == this.Enum.INDEXDBCLASSIFIC.ETFLJG) { // 单项排查-福利机构检查表
        if (!this.welfareInsData || this.welfareInsData.length == 0) {
          tag = false
        }
      } else if (this.dbClassSelect == this.Enum.INDEXDBCLASSIFIC.SJGE) { // 单项排查-散居孤儿检查表
        if (!this.orphanOrphansData || this.orphanOrphansData.length == 0) {
          tag = false
        }
      } else { // 指标库分类未选择数据
        tag = false
      }
      return tag
    },
    // 保存
    submit (e) {
      let _self = this
      let form = _self.form.getFieldsValue()
      if (this.judgeSelectItem()) { // 选择了检查项目
        _self.form.setFieldsValue({
          selectItem: 1
        })
      } else { // 未选择检查项目
        _self.form.setFieldsValue({
          selectItem: null
        })
      }

      let url = '/specialInvestigateTask/save'
      if (this.flag == 'edit') {
        url = '/specialInvestigateTask/update'
        form['id'] = _self.id
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          form['buttonType'] = e // 按钮类型（1保存，2发布）
          // 附件
          let upLoadPathIds = []
          for (var i = 0; i < this.fileList.length; i++) {
            upLoadPathIds.push(this.fileList[i].response.data.data.fileid)
          }
          form['upLoadPathIds'] = upLoadPathIds
          form['taskStartDate'] = form.taskStartDate ? moment(form.taskStartDate).format('YYYY-MM-DD') : null
          form['taskEndDate'] = form.taskEndDate ? moment(form.taskEndDate).format('YYYY-MM-DD') : null
          form['publishDate'] = form.publishDate ? moment(form.publishDate).format('YYYY-MM-DD') : null
          // 选择的检查项目
          const taskPlanVoList = this.welfareInsData.concat(this.orphanOrphansData)
          for (let i = 0; i < taskPlanVoList.length; i++) {
            taskPlanVoList[i]['indexId'] = taskPlanVoList[i].id
          }
          form['taskPlanVoList'] = taskPlanVoList
          _self.post(url, form, true).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息保存成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.form.resetFields()

      this.$router.go(-1)
    },
    // 表单删除
    del (e, type) {
      type == '01' ? this.welfareInsData.splice(e, 1) : this.orphanOrphansData.splice(e, 1)
    },
    // 弹窗删除
    dels (e, type) {
      type == '01' ? this.welfareInsList.splice(e, 1) : this.orphanOrphansList.splice(e, 1)
    },
    // 取消删除
    cancel () {

    },
    // 弹窗确定
    handleSubmit () {
      this.welfareInsData = JSON.parse(JSON.stringify(this.welfareInsList))
      this.orphanOrphansData = JSON.parse(JSON.stringify(this.orphanOrphansList))
      this.visible = false
      this.visible1 = false
      this.visible2 = false
    },
    // 弹窗取消
    closePane () {
      this.visible = false
      this.visible1 = false
      this.visible2 = false
    },
    // 颁布日期不能选择未来日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
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
      let fileId = e.response.data.data.fileid
      let _self = this
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
<style scoped>
.bom1 {
  text-align: end;
  margin-top: 10px;
}
.chosechild {
  padding: 11px 15px 0 15px;
  /* border: 1px solid rgba(0, 0, 0, 0.14901960784313725); */
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 100px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 9.8%;
}
.children {
  width: 130px;
  padding: 0 10px;
  background: rgba(218, 238, 255, 1);
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
  margin-bottom: 11px;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  display: flex;
  align-items: center;
}
</style>
