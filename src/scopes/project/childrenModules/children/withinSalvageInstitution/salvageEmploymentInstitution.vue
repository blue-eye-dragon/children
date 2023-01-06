<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="培训地点"
                          fieldDecoratorId="trainingVenue"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入培训地点" />
            </ta-form-item>

            <ta-form-item label="培训日期"
                          class="spilwid3"
                          fieldDecoratorId="trainingDate"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker @change="onSelectTime" />
            </ta-form-item>

            <ta-form-item class="spilwid">
              <span class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </span>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     @click="add">业务培训</ta-button>
        </div>
        <ta-table :columns="mixColumns"
                  class="tables"
                  :dataSource="mixDataList"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="edit(val,obj,'2')"
                  class="com_textsee">查看</span>
            <span @click="edit(val,obj,'1')"
                  class="com_textedit">修改</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- 新增、编辑、详情弹窗 -->
    <div>
      <ta-drawer :title="type==0?'业务培训':(type==1?'编辑':'详情')"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="培训内容"
                        fieldDecoratorId="trainingContent"
                        :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnValidateMore}]}">
            <!-- :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入培训内容' },   { max: 200, message: `最大输入200个字符` }]}" -->
            <ta-textarea :rows="4"
                         :disabled="disabled"
                         placeholder="请输入培训内容" />
          </ta-form-item>
          <ta-form-item label="培训人员"
                        fieldDecoratorId="trainingLecturer"
                        :fieldDecoratorOptions="verificationRules('培训人员',72)">
            <ta-input :disabled="disabled"
                      placeholder="请输入培训人员" />
          </ta-form-item>
          <ta-form-item label="培训日期"
                        fieldDecoratorId="trainingDate"
                        :require="{message:'请选择培训日期'}">
            <ta-date-picker format="YYYY-MM-DD"
                            style="width: 100%"
                            :disabled="disabled"
                            placeholder="请选择培训日期" />
          </ta-form-item>
          <ta-form-item label="培训地点"
                        fieldDecoratorId="trainingVenue"
                        :fieldDecoratorOptions="verificationRules('培训地点',100)">
            <ta-input :disabled="disabled"
                      placeholder="请输入培训地点" />
          </ta-form-item>
          <ta-form-item label="考核结果"
                        fieldDecoratorId="examinationResults"
                        :require="{message:'请选择考核结果'}">
            <ta-select :disabled="disabled"
                       placeholder="请选择考核结果">
              <ta-select-option v-for="(item, index) in evaluationResultList "
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="onClose">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="type!=2"
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
    title: '培训地点',
    width: '10%',
    dataIndex: 'trainingVenue',
    overflowTooltip: true
  },
  {
    title: '培训内容',
    width: '10%',
    dataIndex: 'trainingContent',
    overflowTooltip: true
  },
  {
    title: '培训日期',
    width: '10%',
    dataIndex: 'trainingDate',
    overflowTooltip: true
  },
  {
    title: '培训人员',
    width: '10%',
    dataIndex: 'trainingLecturer',
    overflowTooltip: true
  },
  {
    title: '考核结果',
    width: '10%',
    dataIndex: 'examinationResults',
    collectionType: 'EVALUATIONRESULT',
    overflowTooltip: true
  },

  {
    title: '登记人员',
    width: '10%',
    dataIndex: 'createUser',
    overflowTooltip: true
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      page: 1,
      size: 10,
      evaluationResultList: [],
      visible: false,
      width: '500px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/rescueBusinessTraining/list', // 数据列表接口，API地址
        mixAddURL: '/rescueBusinessTraining/save', // 新增接口
        mixEditURL: '/rescueBusinessTraining/update', // 编辑接口
        mixDeleteURL: '/rescueBusinessTraining/updateDelStateById' // 删除接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      mixDataList: [],
      trainingType: '01', // 即此菜单标志，后端用此字段区分 业务培训，参与未保工作，举办未保工作菜单 
    }
  },
  mounted () {
    this.getevaluationResultList()
  },
  methods: {
    // 提交
    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let params = this.form.getFieldsValue()
          this.changetime(params)
          if (this.nowtype == 1) {
            //新增
            url = this.mixListOptions.mixAddURL
            text = '增加成功'
          } else {
            //编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          params = this.addother(params)
          params.trainingType = this.trainingType
          let data = await this.post(url, params, true)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()

            if (
              this.mixListOptions.mixActivatedIsNeed &&
              this.mixListOptions.mixGetDataListIsPage
            ) {
              this.handleSubmit()
            } else if (
              this.mixListOptions.mixActivatedIsNeed &&
              !this.mixListOptions.mixGetDataListIsPage
            ) {
              this.getlist()
            }
            this.fileList = []
          }
        } else {
          this.errfocus(err, this.form)
          this.$message.error("校验不通过，无法提交，请再次检查!")
        }
      })
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    // 获取单位
    async getevaluationResultList () {
      this.evaluationResultList = await this.getDictionaries(
        'EVALUATIONRESULT'
      )
    },
    fnValidateMore (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '培训内容', value, callback)
    },
    addother (params) {
      params.trainingContent = params.trainingContent.trim()
      return params
    },
    add () {
      this.visible = true
      this.nowtype = 1
      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgId: this.orgId,
          orgName: this.orgName
        })
      })
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    onSelectTime (date, dateString) {
    },
    edit (val, obj, tp) {
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      let str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.trainingDate) {
        obj.trainingDate = moment(obj.trainingDate, 'YYYY-MM-DD')
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.trainingType = this.trainingType
      return formData
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
.spilwid3 {
  width: 420px;
}
</style>
