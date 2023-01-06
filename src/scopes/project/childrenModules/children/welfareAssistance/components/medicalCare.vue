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
          <span @click="see(val,obj,index)"
                class="com_textsee">查看</span>
          <template v-if="!basedisabled">
            <!-- <ta-divider type="vertical" /> -->
            <span @click="edit(val,obj,index)"
                  class="com_textedit">编辑</span>
            <!-- <ta-divider type="vertical" />
          <ta-popconfirm title="确定删除吗?"  @confirm="deletes(val,obj,index)" okText="确定" cancelText="取消">
          <span>删除</span>
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
    <ta-drawer title="医疗信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="患病名称"
                      fieldDecoratorId="patientName"
                      :fieldDecoratorOptions="rules.patientName">
          <ta-input placeholder="请输入患病名称"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="治疗日期"
                      fieldDecoratorId="treatmentDate"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :fieldDecoratorOptions="rules.treatmentDate">
          <ta-date-picker :valid-now-time="'right'"
                          :disabled="idedit"
                          style="width: 100%;"
                          placeholder="请选择治疗日期" />
        </ta-form-item>
        <ta-form-item label="治疗医院"
                      fieldDecoratorId="treatmentHospital"
                      :fieldDecoratorOptions="rules.treatmentHospital">
          <ta-input placeholder="请输入治疗医院"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="陪同人员"
                      fieldDecoratorId="accompanyMen"
                      :fieldDecoratorOptions="rules.accompanyMen">
          <ta-input placeholder="请输入陪同人员"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="治疗结果"
                      fieldDecoratorId="treatmentResult"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.treatmentResult">
          <ta-textarea :disabled="idedit"
                       placeholder="请输入治疗结果" />
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
    title: '患病名称',
    dataIndex: 'patientName'
  },
  {
    title: '治疗日期',
    dataIndex: 'treatmentDate'
  },
  {
    title: '治疗医院',
    dataIndex: 'treatmentHospital'
  },
  {
    title: '治疗结果',
    dataIndex: 'treatmentResult'
  },
  {
    title: '陪同人员',
    dataIndex: 'accompanyMen'
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
    medicalInfoVosList: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      rules: {
        patientName: this.verificationRules('患病名称', 72),
        treatmentDate: this.verificationRules('治疗日期', true),
        treatmentHospital: this.verificationRules('治疗医院', 72),
        accompanyMen: this.verificationRulesNotMustFill('陪同人员', 72),
        treatmentResult: this.verificationRules('治疗结果', 200, true)
      },
      tablename: 'medicalInfoVosList',
      vaccinationList: []
    }
  },
  mounted () {
    this.getvaccination()
  },
  activated () {
    this.visible = false
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 是否接种 YESNO
    async getvaccination () {
      let data = await this.getDictionaries('YESNO')
      this.vaccinationList = data
    },
    // 时间处理
    dateprocessing (data) {
      data.treatmentDate = moment(data.treatmentDate)
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
