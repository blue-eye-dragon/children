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
            <span>删除</span>
          </ta-popconfirm>  -->
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
    <ta-drawer title="培训信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="培训内容"
                      fieldDecoratorId="trainedContent"
                      :fieldDecoratorOptions="rules.trainedContent"
                      :labelCol="{ span: 6 }">
          <ta-textarea placeholder="请输入培训内容"
                       :disabled="idedit"
                       :rows="4" />
        </ta-form-item>
        <ta-form-item label="培训日期"
                      fieldDecoratorId="trainedDate"
                      :fieldDecoratorOptions="rules.trainedDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          placeholder="请选择培训日期"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item label="培训人员"
                      fieldDecoratorId="trainedMenber"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.trainedMenber">
          <ta-input :disabled="idedit"
                    placeholder="请输入培训人员" />
        </ta-form-item>
        <ta-form-item label="培训地点"
                      fieldDecoratorId="trainedAddress"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.trainedAddress">
          <ta-input :disabled="idedit"
                    placeholder="请输入培训地点" />
        </ta-form-item>
        <ta-form-item label="考核结果"
                      fieldDecoratorId="examineResult"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.examineResult">
          <ta-select :disabled="idedit"
                     placeholder="请选择考核结果">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in evaluationresultList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
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
    title: '培训日期',
    dataIndex: 'trainedDate'
  },
  {
    title: '培训人员',
    dataIndex: 'trainedMenber'
  },
  {
    title: '培训地点',
    dataIndex: 'trainedAddress'
  },
  {
    title: '培训内容',
    dataIndex: 'trainedContent'
  },
  {
    title: '考核结果',
    dataIndex: 'examineResult',
    collectionType: 'EVALUATIONRESULT'
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
    listFosterFamilyTrainedInfo: {
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
        trainedContent: this.verificationRules('培训内容', 200, false),
        trainedDate: this.verificationRules('培训日期'),
        trainedMenber: this.verificationRules('培训人员', 72),
        trainedAddress: this.verificationRules('培训地点', 72),
        examineResult: this.verificationRules('考核结果')
      },
      tablename: 'listFosterFamilyTrainedInfo',
      evaluationresultList: []
    }
  },
  mounted () {
    this.getevaluationresult()
  },
  activated () {
    this.visible = false
  },
  methods: {
    // 培训日期不能大于当前日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    async getevaluationresult () {
      let data = await this.getDictionaries('EVALUATIONRESULT')
      this.evaluationresultList = data
    },
    // 日期处理
    dateprocessing (data) {
      data.trainedDate = moment(data.trainedDate, 'YYYY-MM-DD')
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
</style>
