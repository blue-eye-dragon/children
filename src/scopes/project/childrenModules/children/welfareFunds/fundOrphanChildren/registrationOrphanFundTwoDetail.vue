<template>
  <div class="conts">
    <div class="contin">
      <!-- <ta-border-layout :header-cfg="{showBorder:false}" :layout="{header:'0px'}"> -->
      <div class="mars">
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row class="fromcom">
            <ta-col :span="12">
              <ta-form-item label="文件编号"
                            fieldDecoratorId="fileCode"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :fieldDecoratorOptions="rules.fileCode">
                <ta-input placeholder="请输入文件编号"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="文件标题"
                            fieldDecoratorId="fileTitle"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :fieldDecoratorOptions="rules.fileTitle">
                <ta-input placeholder="请输入文件标题"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="使用年度"
                            fieldDecoratorId="useYear"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择使用年度'}">
                <ta-year-picker @change="onSelectTime"
                                :valid-now-time="'right'"
                                style="width: 100%;"
                                :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="下拨日期"
                            fieldDecoratorId="allocateTime"
                            :labelCol="{ span: 6 }"
                            :wrapperCol="{span:18}"
                            :require="{message:'请选择下拨日期!'}">
                <ta-date-picker style="width: 100%;"
                                :valid-now-time="'right'"
                                :disabled="disabled" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="12">
              <ta-form-item label="经办人"
                            fieldDecoratorId="agent"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            :fieldDecoratorOptions="rules.agent">
                <ta-input placeholder="请输入经办人"
                          :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
        <ta-table bordered
                  class="tables"
                  :columns="addTableColumns"
                  :dataSource="addTableData">
          <!-- <ta-table-edit slot="allocateMoney" slot-scope="text, record" type="inputNumber" @change="changeData"></ta-table-edit> -->
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
        </ta-table>
        <ta-form layout="horizontal"
                 style="margin-top:30px"
                 :autoFormCreate="(sumForm)=>{this.sumForm = sumForm}">
          <ta-col :span="12">
            <ta-form-item label="下拨总金额(元)"
                          fieldDecoratorId="allocateTotalSum"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          :require="{message:'请输入下拨总金额!'}">
              <ta-input-number style="width:100%"
                               placeholder="系统自动显示下拨总金额"
                               :disabled="disabledSum" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="备注"
                          fieldDecoratorId="remarks"
                          :labelCol="{span:3}"
                          :wrapperCol="{span:21}"
                          :fieldDecoratorOptions="rules.remarks">
              <!-- <ta-textarea placeholder="请输入备注" style="width:100%" :autosize="{ minRows: 3, maxRows: 6 }" :disabled="disabled" /> -->
              <ta-textarea placeholder="请输入备注"
                           :disabled="disabled"
                           :autosize="{ minRows: 2, maxRows: 6 }" />
            </ta-form-item>
          </ta-col>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button type="primary"
                 v-if="this.goType != '3'"
                 class="preservation"
                 @click="submit('2')">提交</ta-button>
      <ta-button type="primary"
                 v-if="this.goType != '3'"
                 class="preservation"
                 @click="submit('1')">保存</ta-button>
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>
      <!-- <ta-button class="preservation" @click="backs">返回</ta-button> -->
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
// import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
const addTableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '机构代码',
    dataIndex: 'orgCreditCode'
  },
  {
    title: '机构名称',
    dataIndex: 'orgName'
  },
  {
    title: '下拨金额（元）',
    dataIndex: 'allocateMoney',
    width: 200
    // scopedSlots: { customRender: 'allocateMoney' }
  }
]
export default {
  name: 'salvageApprovalBatches',
  //   mixins: [listMixin],
  components: {
    Title
  },
  data () {
    return {
      //   tableColumns,
      //   tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixAddURL: '/orphanLivingExpensesAllocate/save', // 数据新增接口，API地址
        mixDeleteURL: '', // 数据删除接口，API地址
        mixEditURL: '/orphanLivingExpensesAllocate/update' // 数据编辑接口，API地址
      },
      addTableColumns,
      addTableData: [],
      mixPageRef: 'gridPager',
      selectedRows: [],
      // 行选择配置
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      disabledExp: true,
      disabled: false,
      disabledSum: true,
      sum: 0,
      goType: '0',
      rules: {
        fileCode: this.verificationRules('文件编号', 20),
        fileTitle: this.verificationRules('文件标题', 20),
        // fundSource: this.verificationRules('资金来源', 1),
        agent: this.verificationRules('经办人', 72),
        remarks: this.verificationRules('备注', 200, true)
      }
    }
  },
  activated () {
    this.disabled = false
    this.addTableData = []
    this.$nextTick(() => {
      this.form.resetFields()
      this.sumForm.resetFields()
      this.sum = 0
    })
    console.log(this.$route.query)
    // this.addTableData = this.$route.params.obj
    let goTypeTemp = this.$route.query.goType
    if (goTypeTemp == 'registrationFundTwo-add') {
      this.goType = '1'
      this.disabled = false
      this.addTableData = this.$route.query.obj
      console.log(this.addTableData)
    } else if (goTypeTemp == 'registrationFund-edit') {
      // 编辑
      this.goType = '2'
      let data = JSON.parse(this.$route.query.obj)
      this.id = data.id
      console.log(data)
      this.$nextTick(() => {
        this.getDetails(data)
      })
    } else if (goTypeTemp == 'registrationFund-detail') {
      this.goType = '3'
      let data = JSON.parse(this.$route.query.obj)
      this.$nextTick(() => {
        this.getDetails(data)
      })
      this.disabled = true
    }
  },
  methods: {
    loadData () { },
    getDetails (data) {
      this.form.setFieldsValue({
        agent: data.agent,
        allocateTime: moment(data.allocateTime),
        fileCode: data.fileCode,
        fileTitle: data.fileTitle,
        useYear: moment(data.useYear)
      })
      // this.addTableData = data.orphanLivingExpensesAllocateMoneyVoList
      let dataTab = data.orphanLivingExpensesAllocateMoneyVoList
      if (this.goType == '2') {
        this.addTableData = dataTab
        let sum = 0
        this.addTableData.map(item => {
          if (item.allocateMoney) {
            let num = parseFloat(item.allocateMoney)
            sum += num
          }
        })
        sum = sum.toFixed(2)
        this.sumForm.setFieldsValue({
          allocateTotalSum: sum,
          remarks: data.remarks
        })
      } else if (this.goType == '3') {
        this.addTableData = data.orphanLivingExpensesAllocateMoneyVoList
        this.sumForm.setFieldsValue({
          allocateTotalSum: data.allocateTotalSum,
          remarks: data.remarks
        })
      }
    },
    async submit (e) {
      let saveType = e
      let isok = true
      this.form.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('yanzheng11' + isok)
        }
      })
      this.sumForm.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('yanzheng22' + isok)
        }
      })
      if (isok) {
        let params = this.form.getFieldsValue()
        this.changetime(params)
        params.useYear = params.useYear.substr(0, 4)
        let formData = this.sumForm.getFieldsValue()
        let troubledChildAllocateVo = { ...params, ...formData }
        troubledChildAllocateVo.saveType = saveType

        troubledChildAllocateVo.orphanLivingExpensesAllocateMoneyVoList = this.addTableData
        console.log(troubledChildAllocateVo)
        let text = ''
        let url
        if (e == '1') {
          text = '保存成功'
        } else if (e == '2') {
          text = '提交成功'
        }
        // 保存
        if (this.goType == '1') {
          await this.post(
            this.mixListOptions.mixAddURL,
            troubledChildAllocateVo,
            true
          ).then(res => {
            console.log(res)
            if (res.serviceSuccess == true) {
              this.$router.push({
                name: 'childOrphanAllocation'
              })
              this.$message.success(text)
            }
          })
        } else if (this.goType == '2') {
          troubledChildAllocateVo.id = this.id
          await this.post(
            this.mixListOptions.mixEditURL,
            troubledChildAllocateVo,
            true
          ).then(res => {
            console.log(res)
            if (res.serviceSuccess == true) {
              this.$router.push({
                name: 'childOrphanAllocation'
              })
              this.$message.success('修改成功')
            }
          })
        }
      }
    },
    // select选择框
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRows)
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      if (selectedRowKeys.length > 0) {
        this.disabledExp = false
      } else if (selectedRowKeys.length == 0) {
        this.disabledExp = true
      }
      this.rowSelection.selectedRowKeys = selectedRowKeys
      console.log(this.selectedRowKeys)
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    // 入库弹窗的列数据编辑
    changeData ({ newData, record, columnKey }) {
      if (newData < 0 || newData == 0) {
        newData = 0
      } else if (newData > 9999999999.99) {
        newData = 9999999999.99
      }
      // 将单元格数据修改为新值（newData：返回改变的值、record：该行的行数据、columnKey：该列的key）
      record[columnKey] = newData.toFixed(2)
      this.$nextTick(() => {
        this.summoney()
      })
    },
    summoney () {
      let sum = 0
      console.log(1111)
      console.log(this.addTableData)
      this.addTableData.map(item => {
        if (item.allocateMoney) {
          let num = parseFloat(item.allocateMoney)
          sum += num
        }
      })
      sum = sum.toFixed(2)
      this.sumForm.setFieldsValue({
        allocateTotalSum: sum
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        }
      })
    }
  },
  watch: {
    showone (val) {
      console.log(111)
      console.log(val)
      this.setHeight('one', 'oneout', !val)
    },
    // showtwo (val) {
    //   this.setHeight('two', 'twoout', !val)
    // },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  width: 100%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
// .mars:last-child {
//   margin-bottom: 50px;
// }
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.preservation {
  margin-left: 32px;
}
</style>
