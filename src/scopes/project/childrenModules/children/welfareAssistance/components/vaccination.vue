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
          <!-- <ta-divider type="vertical"
                      v-if="!basedisabled" /> -->
          <span @click="edit(val,obj,index)"
                v-if="!basedisabled"
                class="com_textedit">编辑</span>
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
    <ta-drawer title="疫苗接种信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="疫苗名称"
                      fieldDecoratorId="vaccineName"
                      :fieldDecoratorOptions="rules.vaccineName">
          <ta-input placeholder="请输入疫苗名称"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="疫苗批号"
                      fieldDecoratorId="vaccineBatchNumber"
                      :fieldDecoratorOptions="rules.vaccineBatchNumber">
          <ta-input placeholder="请输入疫苗批号"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种部位"
                      fieldDecoratorId="inoculationPosition"
                      :fieldDecoratorOptions="rules.inoculationPosition">
          <ta-input placeholder="请输入接种部位"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="疫苗生产企业"
                      fieldDecoratorId="vaccineProductionEnterprise"
                      :fieldDecoratorOptions="rules.vaccineProductionEnterprise">
          <ta-input placeholder="请输入疫苗生产企业"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种人"
                      fieldDecoratorId="vaccinator"
                      :fieldDecoratorOptions="rules.vaccinator">
          <ta-input placeholder="请输入接种人"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种单位"
                      fieldDecoratorId="inoculateUnit"
                      :fieldDecoratorOptions="rules.inoculateUnit">
          <ta-input placeholder="请输入接种单位"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种日期"
                      fieldDecoratorId="inoculateTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :fieldDecoratorOptions="rules.inoculateTime">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          placeholder="请选择接种日期" />
        </ta-form-item>
        <ta-form-item label="是否已接种"
                      fieldDecoratorId="isInoculated"
                      :fieldDecoratorOptions="rules.isInoculated">
          <ta-select placeholder="请选择是否已接种"
                     :disabled="idedit"
                     @change="Inoculatedchange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in vaccinationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item v-if='Inoculatedshow'
                      label="未接种原因"
                      fieldDecoratorId="noInoculatedReason"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.noInoculatedReason">
          <ta-textarea :disabled="idedit"
                       placeholder="请输入未接种原因" />
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
    title: '疫苗名称',
    dataIndex: 'vaccineName'
  },
  {
    title: '疫苗批号',
    dataIndex: 'vaccineBatchNumber'
  },
  {
    title: '接种部位',
    dataIndex: 'inoculationPosition'
  },
  {
    title: '接种人',
    dataIndex: 'vaccinator'
  },
  {
    title: '接种时间',
    dataIndex: 'inoculateTime'
  },
  {
    title: '是否已接种',
    dataIndex: 'isInoculated',
    collectionType: 'YESNO'
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
    vaccinationVosList: {
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
        vaccineName: this.verificationRules('疫苗名称', 100),
        vaccineBatchNumber: this.verificationRules('疫苗批号', 20),
        inoculationPosition: this.verificationRulesNotMustFill('接种部位', 50),
        vaccineProductionEnterprise: this.verificationRulesNotMustFill('疫苗生产企业', 100),
        vaccinator: this.verificationRules('接种人', 72),
        inoculateUnit: this.verificationRulesNotMustFill('接种单位', 100),
        inoculateTime: this.verificationRules('接种日期'),
        isInoculated: this.verificationRules('是否已接种'),
        noInoculatedReason: this.verificationRules('未接种原因', 200, true)
      },
      tablename: 'vaccinationVosList',
      vaccinationList: [],
      Inoculatedshow: false
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
    addAdoption () {
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.visible = true
      this.idedit = false
      this.Inoculatedshow = false
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    // 时间处理
    dateprocessing (data) {
      // 2
      data.isInoculated == 0 ? this.Inoculatedshow = true : this.Inoculatedshow = false
      data.inoculateTime = moment(data.inoculateTime)
    },
    Inoculatedchange (val) {
      console.log(val)
      val == 0 ? this.Inoculatedshow = true : this.Inoculatedshow = false
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
