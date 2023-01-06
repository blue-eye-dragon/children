<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
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
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button icon="solution"
                     type="primary"
                     @click="add">业务培训</ta-button>
        </div>
        <ta-table bordered
                  :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="trainingDate"
               slot-scope="val,obj,index">

            <span>{{val | namefilter}}</span>

          </div>

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
            <!-- [{ required: true, message: '请输入培训内容' },   { max: 200, message: `最大输入200个字符` }]999 {rules: [{ required: true, message: '' },{validator: fnValidateMore}]}-->
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
                            :disabledDate="disabledDate"
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
// import { debuglog } from 'util'
import moment from 'moment'
// import { get } from 'http'
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
    width: '18%',
    dataIndex: 'trainingVenue',
    overflowTooltip: true
  },
  {
    title: '培训内容',
    width: '18%',
    dataIndex: 'trainingContent',
    overflowTooltip: true
  },
  {
    title: '培训日期',
    width: '16%',
    align: 'center',
    dataIndex: 'trainingDate',
    overflowTooltip: true
  },
  {
    title: '培训人员',
    width: '15%',
    dataIndex: 'trainingLecturer',
    overflowTooltip: true
  },
  {
    title: '考核结果',
    width: '17%',
    dataIndex: 'examinationResults',
    collectionType: 'EVALUATIONRESULT',
    overflowTooltip: true
  },

  {
    title: '登记人员',
    width: '12%',
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
        mixGetDataListURL: '/businessTraining/list', // 数据列表接口，API地址
        mixAddURL: '/businessTraining/save', // 新增接口
        mixEditURL: '/businessTraining/update', // 编辑接口
        mixDeleteURL: '/businessTraining/updateDelStateById' // 删除接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],

      mixDataList: []
    }
  },
  mounted () {
    this.getevaluationResultList()
  },
  methods: {
    // enter () {
    //   if (window.event.keyCode == 13) {
    //     alert(3)
    //     var rawData = this.form.getFieldsValue().trainingContent
    //     this.$nextTick(() => {
    //       this.form.setFieldsValue({
    //         trainingContent: rawData + '\n'
    //       })
    //     })
    //   }
    // },
    disabledDate (current) {
      const startDates = moment(this.startDate)
      return current && current > startDates
    },
    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '培训内容', value, callback)
    },
    addother (params) {
      params.trainingContent = params.trainingContent.trim()
      return params
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
      console.log(date, dateString)
    },
    edit (val, obj, tp) {
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      const str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.trainingDate) {
        obj.trainingDate = moment(obj.trainingDate, 'YYYY-MM-DD')
      }
      console.log(this.sexList)
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },
  // 列表附件展示
  filters: {
    namefilter (val) {
      // alert(1)
      const dateT = moment(val, 'YYYY-MM-DD')
      return dateT
    }
  }

}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>
