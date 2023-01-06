<template>
  <!-- =孤儿基本生活费发放详情 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>

            <ta-form-item label="儿童编号"
                          class="spilwid"
                          fieldDecoratorId="childNumber"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-input placeholder="请输入儿童编号" />
            </ta-form-item>
            <ta-form-item class="spilwid2">
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="visitbtn">
          <ta-button class="btnleft"
                     @click="back">返回</ta-button>
          <!-- <ta-button class="btnleft exportbtn"
                     @click="showModal">批量导出</ta-button> -->
          <ta-modal :visible="showOn"
                    @ok="handleOk"
                    @cancel="handleCancel">
            <div v-if="areaCode||issueYears">
              <h3>确认导出当前条件下的全部有效数据吗？</h3>
              <P>地区 : {{areaCode}}</P>
              <p>员工姓名 : {{issueYears}}</p>
            </div>
            <div v-if="!areaCode&&!issueYears">
              <h3>确认导出全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList"
                  :customRow="(record,index)=>({on:{dblclick:()=>{see(index,record)}}})"
                  :scroll="{ x: 2300 }">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="isBuFa"
                slot-scope="a, b, c">
            <span v-if="a == '0'">正常发放</span>
            <span v-if="a == '1'">补发</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
        <ta-pagination :defaultCurrent="page"
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

    <!--詳情-->
    <ta-drawer :title="idedit?'详情':'编辑'"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">

        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="true" />
        </ta-form-item>

        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="true">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="发放方式"
                      fieldDecoratorId="isBuFa"
                      :labelCol="{ span: 6 }">
          <ta-select placeholder="请选择发放方式"
                     :disabled="idedit">
            <ta-select-option :value="'0'">正常发放</ta-select-option>
            <ta-select-option :value="'1'">补发</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="发放时间"
                      fieldDecoratorId="issuingYears"
                      :labelCol="{ span: 6 }">
          <ta-input style="width: 100%;"
                    :disabled="idedit"
                    :placeholder="idedit?'':'请选择发放时间'" />
        </ta-form-item>
        <ta-form-item label="发放金额（元）"
                      fieldDecoratorId="costOfLiving"
                      :labelCol="{ span: 6 }">
          <ta-input-number :min="0"
                           :max="99999"
                           :precision="2"
                           @change="setTotal"
                           style="width:100%"
                           :placeholder="!(idedit?true:issuingDisabled)?'请输入发放金额':''"
                           :disabled="true" />
        </ta-form-item>
        <ta-form-item label="领取方式"
                      fieldDecoratorId="receiveType"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="true">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in paymentList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="领取人"
                      fieldDecoratorId="receivePerson"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="银行账号"
                      fieldDecoratorId="bankAccount"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="true" />
        </ta-form-item>
        <!-- <ta-form-item label="发放日期"
                      fieldDecoratorId="createTime"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="true" />
        </ta-form-item> -->
        <ta-form-item label="备注"
                      :labelCol="{ span: 6 }"
                      fieldDecoratorId="remark">
          <ta-input placeholder="请输入备注"
                    :disabled="true"
                    style="width:100%" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import AddressComponent from '@component/common/components/addressComponent'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '地区',
    dataIndex: 'areaName',
    width: '10%'
  },
  {
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '15%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '6%',
    collectionType: 'SEX'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '发放方式',
    dataIndex: 'isBuFa',
    scopedSlots: { customRender: 'isBuFa' },
    width: '15%'
  },
  {
    title: '发放时间',
    dataIndex: 'issuingYears',
    width: '10%'
  },
  {
    title: '发放金额（元）',
    dataIndex: 'costOfLiving',
    width: '15%'
  },
  {
    title: '领取方式',
    dataIndex: 'receiveType',
    collectionType: 'PAYMENT',
    width: '10%'
  },
  {
    title: '领取人',
    dataIndex: 'receivePerson',
    width: '10%'
  },
  // {
  //   title: '发放日期',
  //   dataIndex: 'issuingDate',
  //   width: '13%'
  // },
  {
    title: '开户银行',
    dataIndex: 'bank',
    width: '10%'
  },
  {
    title: '开户人',
    dataIndex: 'accountPerson',
    width: '10%'
  },
  {
    title: '银行账号',
    dataIndex: 'bankAccount',
    width: '13%'
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
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      showOn: false,
      issueYears: '',
      areaCode: '',
      mixDataList: [],
      mixListOptions: {
        mixGetDataListURL:
          '/WelfareSlave/list', // 数据列表接口，API地址
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },

      tableColumns,
      page: 1,
      size: 10,
      visible: false,
      mixPageRef: 'gridPager',
      id: '',
      sexList: [],
      childTypeList: [],
      paymentList: [],
      issuingDisabled: false, // 发放年月控制只读（值为“-”时与发放金额都只读）
      replaceDisabled: false, // 补发放年月控制只读（值为“-”时与补发放金额都只读）
      orphanLivingExpensesId1: '',
      id: '', // 列表传过来的id-弹窗用
      orphanLivingExpensesId: '', // 列表传过来的orphanLivingExpensesId-弹窗用
      childId: '' // 列表传过来的childInId-弹窗用
    }
  },
  activated () {
    this.orphanLivingExpensesId1 = this.$route.query.id
  },
  mounted () {
    this.getsexList()
    this.getchildType()
    this.getpayment()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    see (val, obj) {
      this.idedit = true
      this.visible = true
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      // data['issuingYears'] = data.issuingYears && data.issuingYears != '-' ? moment(data.issuingYears) : null
      // data['replacementYears'] = data.replacementYears && data.replacementYears != '-' ? moment(data.replacementYears) : null
      data.createTime = data.createTime.substring(0, 10)
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
    },
    // 根据发放金额与补发放金额计算总金额
    setTotal () {
      const formData = this.form.getFieldsValue()
      this.form.setFieldsValue({
        costOfLivingTotal: (parseFloat(formData.costOfLiving) || 0) + (parseFloat(formData.replacementAmount) || 0)
      })
    },
    // 领取方式 PAYMENT
    async getpayment () {
      const data = await this.getDictionaries('PAYMENT')
      this.paymentList = data
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.welfareMasterId = this.orphanLivingExpensesId1 // 'a390218487434eb8ab007541601afb41'//
      return formData
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类型  儿童类别-统计字典
    async getchildType () {
      const data = await this.getDictionaries('STATISTICSCHILDCATEGORYA')
      this.childTypeList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    back () {
      this.$router.push({
        name: 'paymentOfLivingAllowance'
        // unmennedRaiseYOrN: '1'
      })
    },
    // 抽屉提交
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const form = this.form.getFieldsValue()
          form.id = this.id
          form.orphanLivingExpensesId = this.orphanLivingExpensesId
          form.childId = this.childId
          form.issuingYears = form.issuingYears ? moment(form.issuingYears).format('YYYY-MM') : '-'
          form.replacementYears = form.replacementYears ? moment(form.replacementYears).format('YYYY-MM') : '-'
          this.post('/WelfareMaster/update', form).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据更新成功')
              this.form.resetFields()
              this.handleSubmit()
              this.visible = false
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    showModal () {
      const ss = this.searchForm.getFieldsValue()
      this.issueYears = ss.issueYears
      this.areaCode = ss.areaCode

      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    handleOk (e) {
      var data = this.userPageParams()
      this.exportFile('/orphanLivingExpenses/exportUnmennedLivingExpensesDetail', data)
      this.showOn = false
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid2 {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
