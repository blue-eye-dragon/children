<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'80px',footer:'80px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-col :span='6'>
            <ta-form-item label="年度"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker :placeholder="['开始年度', '结束年度']"
                               format="YYYY"
                               :value="yearvalue"
                               @panelChange="yearchange"
                               :mode='mode' />
            </ta-form-item>
          </ta-col>
          <ta-col :span='6'>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-col>
        </ta-form>
      </div>
      <div>
        <div style="height: 50px;">
          <div style="float: right;">
            <ta-button type="primary"
                       icon="plus"
                       @click="add">新增</ta-button>
            <ta-popconfirm title="是否确定删除?"
                           @confirm="batchDeletion"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <ta-button class="btnleft"
                         type='danger'
                         :disabled="iscanchose">删除</ta-button>
            </ta-popconfirm>
            <ta-button @click="backs"
                       class="btnleft">返回</ta-button>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  :rowSelection="mixRowSelection"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="see(val,obj)"
                  class="com_textsee">查看</span>
            <span @click="edit(val,obj)"
                  class="com_textedit">修改</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ta-drawer title="寄养经费信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="年度"
                      fieldDecoratorId='year'
                      :fieldDecoratorOptions="rules.year">
          <ta-year-picker style="width: 100%;"
                          :disabled="idedit"
                          placeholder="请选择年度" />
        </ta-form-item>
        <ta-form-item label="发放周期"
                      fieldDecoratorId='sentoutCycle'
                      :fieldDecoratorOptions="rules.sentoutCycle">
          <ta-select placeholder="请选择发放周期"
                     :disabled="idedit"
                     @change="cyclechange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in issuingcycleList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item v-if="cyclenum==0"
                      label="发放月度"
                      fieldDecoratorId='sentoutDateStyle0'
                      :fieldDecoratorOptions="rules.sentoutDateStyle0">
          <ta-month-picker style="width: 100%;"
                           :disabled="idedit"
                           placeholder="请选择发放月度" />
        </ta-form-item>
        <ta-form-item v-else-if="cyclenum==1"
                      label="发放季度"
                      fieldDecoratorId='sentoutDateStyle1'
                      :fieldDecoratorOptions="rules.sentoutDateStyle1">
          <ta-quarter-picker style="width: 100%;"
                             :disabled="idedit"
                             placeholder="请选择发放季度" />
        </ta-form-item>
        <ta-form-item v-else
                      label="发放年度"
                      fieldDecoratorId='sentoutDateStyle2'
                      :fieldDecoratorOptions="rules.sentoutDateStyle2">
          <ta-year-picker style="width: 100%;"
                          :disabled="idedit"
                          placeholder="请选择发放年度" />
        </ta-form-item>

        <ta-form-item label="养育费用补贴（元）"
                      fieldDecoratorId='upbringingCostsAllowance'
                      :fieldDecoratorOptions="rules.upbringingCostsAllowance">
          <ta-input-number @blur='sum'
                           placeholder="请输入养育费用补贴（元）"
                           style="width:100%"
                           :min="1"
                           :precision="2"
                           :disabled="idedit"
                           :max="99999999" />
        </ta-form-item>
        <ta-form-item label="劳务补贴（元）"
                      fieldDecoratorId='labourServicesAllowance'
                      :fieldDecoratorOptions="rules.labourServicesAllowance">
          <ta-input-number @blur='sum'
                           placeholder="请输入劳务补贴（元）"
                           style="width:100%"
                           :disabled="idedit"
                           :min="1"
                           :precision="2"
                           :max="99999999" />
        </ta-form-item>
        <ta-form-item label="寄养工作经费（元）"
                      fieldDecoratorId='fosterWorkOutlay'
                      :fieldDecoratorOptions="rules.fosterWorkOutlay">
          <ta-input-number @blur='sum'
                           placeholder="请输入寄养工作经费（元）"
                           style="width:100%"
                           :disabled="idedit"
                           :min="1"
                           :precision="2"
                           :max="99999999" />
        </ta-form-item>
        <ta-form-item label="总计（元）"
                      fieldDecoratorId='totalOutlay'
                      :fieldDecoratorOptions="rules.totalOutlay">
          <ta-input-number :disabled="true"
                           placeholder="请输入总计（元）"
                           style="width:100%"
                           :min="1"
                           :precision="2"
                           :max="99999999" />
        </ta-form-item>
        <ta-form-item label="登记人"
                      fieldDecoratorId='registerMenber'
                      :fieldDecoratorOptions="rules.registerMenber">
          <ta-input placeholder="请输入登记人"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="登记日期"
                      fieldDecoratorId="registerDate"
                      :fieldDecoratorOptions="rules.registerDate">
          <ta-date-picker style="width: 100%;"
                          :disabled="idedit"
                          placeholder="请选择登记日期" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   v-if="!idedit"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: 80,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '年度',
    width: '13%',
    dataIndex: 'year'
  },
  {
    title: '发放周期',
    width: '15%',
    dataIndex: 'sentoutCycle',
    collectionType: 'ISSUINGCYCLE'
  },
  {
    title: '发放月份',
    width: '15%',
    dataIndex: 'sentoutDateStyle'
  },
  {
    title: '养育费用补贴（元）',
    width: '22%',
    dataIndex: 'upbringingCostsAllowance'
  },
  {
    title: '劳务补贴（元）',
    width: '18%',
    dataIndex: 'labourServicesAllowance'
  },
  {
    title: '寄养工作经费（元）',
    width: '22%',
    dataIndex: 'fosterWorkOutlay'
  },
  {
    title: '总计（元）',
    width: '15%',
    dataIndex: 'totalOutlay'
  },
  {
    title: '登记人',
    width: '15%',
    dataIndex: 'registerMenber'
  },
  {
    title: '登记日期',
    width: '15%',
    dataIndex: 'registerDate'
  },
  {
    title: '操作',
    align: 'center',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/fosterOutlay/list', // 数据列表接口，API地址
        mixAddURL: '/fosterOutlay/save', // 新增接口
        mixEditURL: '/fosterOutlay/update', // 编辑接口
        mixDeleteURL: '/fosterOutlay/updateDelStateById' // 删除接口，API地址
      },
      mixPageRef: 'gridPager',
      issuingcycleList: [],
      visible: false,
      rules: {
        sentoutCycle: this.verificationRules('发放周期'),
        year: this.verificationRules('年度', true),
        sentoutDateStyle0: this.verificationRules('发放月度', true),
        sentoutDateStyle1: this.verificationRules('发放季度', true),
        sentoutDateStyle2: this.verificationRules('发放年度', true),
        upbringingCostsAllowance: this.verificationRules('养育费用补贴（元）', '0'),
        labourServicesAllowance: this.verificationRules('劳务补贴（元）', '0'),
        fosterWorkOutlay: this.verificationRules('寄养工作经费（元）', '0'),
        totalOutlay: this.verificationRules('总计（元）', '0'),
        registerMenber: this.verificationRules('登记人', 72),
        registerDate: this.verificationRules('登记日期', true)
      },
      cyclenum: '0',
      childBaseId: '',
      yearvalue: [],
      mode: ['year', 'year']
    }
  },
  activated () {
    this.childBaseId = this.$route.query.childBaseId
  },
  mounted () {
    this.getissuingcycle()
  },
  methods: {
    backs () {
      this.$router.go(-1)
    },
    resetFrom () {
      this.yearvalue = []
    },
    sum () {
      // let upbringingCostsAllowance labourServicesAllowance fosterWorkOutlay
      let data = this.form.getFieldsValue()
      let sum = 0
      if (data.upbringingCostsAllowance) {
        sum += parseFloat(data.upbringingCostsAllowance)
      }
      if (data.labourServicesAllowance) {
        sum += parseFloat(data.labourServicesAllowance)
      }
      if (data.fosterWorkOutlay) {
        sum += parseFloat(data.fosterWorkOutlay)
      }
      this.form.setFieldsValue({
        totalOutlay: sum.toFixed(2)
      })
    },
    yearchange (value, mode) {
      this.yearvalue = value
      this.mode = [
        mode[0] === null ? 'year' : mode[0],
        mode[1] === null ? 'year' : mode[1]
      ]
      // this.mode = [
      //   'year',
      //   'year'
      // ]
    },
    other (data) {
      data.year = moment(data.year, 'YYYY')
      // "YYYY/MM/DD HH:mm:ss"
      if (data.sentoutCycle == 0) {
        data.sentoutDateStyle0 = moment(data.sentoutDateStyle, 'YYYY-MM')
      } else if (data.sentoutCycle == 1) {
        data.sentoutDateStyle1 = moment(data.sentoutDateStyle, 'YYYY-Q季度')
      } else {
        data.sentoutDateStyle2 = moment(data.sentoutDateStyle, 'YYYY')
      }
      data.registerDate = moment(data.registerDate)
      return data
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      // this.changetime(formData)
      formData.childBaseId = this.childBaseId
      if (this.yearvalue.length > 0) {
        formData.searchStartYear = this.yearvalue[0] ? this.yearvalue[0].format('YYYY') : null
        formData.searchEndYear = this.yearvalue[1] ? this.yearvalue[1].format('YYYY') : null
      }
      return formData
    },
    addother (params) {
      params.childBaseId = this.childBaseId
      return params
    },
    changetime (data) {
      if (data.sentoutDateStyle0) {
        data.sentoutDateStyle = data.sentoutDateStyle0 ? data.sentoutDateStyle0.format('YYYY-MM') : null
        delete data.sentoutDateStyle0
      }
      if (data.sentoutDateStyle1) {
        data.sentoutDateStyle = data.sentoutDateStyle1 ? data.sentoutDateStyle1.format('YYYY-Q季度') : null
        delete data.sentoutDateStyle1
      }
      if (data.sentoutDateStyle2) {
        data.sentoutDateStyle = data.sentoutDateStyle2 ? data.sentoutDateStyle2.format('YYYY') : null
        delete data.sentoutDateStyle2
      }
      data.registerDate = data.registerDate ? data.registerDate.format('YYYY-MM-DD') : null
      data.year = data.year ? data.year.format('YYYY') : null
    },
    cyclechange (val) {
      this.cyclenum = val
    },
    setContainer () {
      return this.set_Container('searchdata')
    },

    // 寄养状态 ISSUINGCYCLE
    async getissuingcycle () {
      let data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingcycleList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    continueprocessing (val) {
      //   this.$router.push({
      //     path: 'replacementnotFrom', // 补领解除
      //     query: {
      //       id: val.registrationAdoptionId,
      //       otherid: val.id
      //     }
      //   })
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.numwid {
  width: 118px;
}
.textnum {
  width: 600px;
  display: inline-block;
}
.textnum .spilwid {
  width: 300px;
}
.textnum .numwid {
  width: 200px;
}
.numwidwid {
  width: 210px;
}
.line {
  line-height: 40px;
  margin: 0 5px;
}
</style>
