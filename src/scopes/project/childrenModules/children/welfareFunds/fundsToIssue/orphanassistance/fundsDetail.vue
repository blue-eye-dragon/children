<template>
  <!-- =孤儿基本生活费发放详情 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   style="display:flex"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          class="spilwid">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="儿童编号"
                          fieldDecoratorId="childNumber"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          class="spilwid">
              <ta-input placeholder="请输入儿童编号" />
            </ta-form-item>
            <ta-form-item class="spilwid">
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
          <!-- <ta-button class="btnleft exportbtn" type="primary" @click="showModal">批量导出</ta-button> -->
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
                slot-scope="a">
            <span v-if="a == '0'">正常发放</span>
            <span v-if="a == '1'">补发</span>
          </span>
          <div slot="action"
               slot-scope="val,obj"
               class="btnlist">
            <span @click="see(val,obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>

    <!--详情-->
    <ta-drawer title="详情"
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
          <ta-input :disabled="idedit" />
        </ta-form-item>

        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber"
                      :labelCol="{ span: 6 }">
          <ta-input placeholder="请输入登记人"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 6 }">
          <ta-select placeholder="请选择性别"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }">
          <ta-input placeholder="请输入身份证号"
                    :disabled="idedit" />
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
                    placeholder="请选择发放时间" />
        </ta-form-item>
        <ta-form-item label="助学经费金额（元）"
                      fieldDecoratorId="costOfLiving"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="领取方式"
                      fieldDecoratorId="receiveType"
                      :labelCol="{ span: 6 }">
          <ta-select placeholder="请选择领取方式"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in paymentList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="领取人"
                      fieldDecoratorId="receivePerson"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="银行账号"
                      fieldDecoratorId="bankAccount"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <!-- <ta-form-item label="发放日期"
                      fieldDecoratorId="issuingDate"
                      :labelCol="{ span: 6 }">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="idedit"
                          placeholder="请选择发放日期" />
        </ta-form-item> -->
        <ta-form-item label="备注"
                      :labelCol="{ span: 6 }"
                      fieldDecoratorId="remark">
          <ta-input placeholder="请输入备注"
                    :disabled="idedit"
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
  // {
  //   title: '补发时间',
  //   dataIndex: 'replacementYears',
  //   width: '10%'
  // },
  // {
  //   title: '补发金额（元）',
  //   dataIndex: 'replacementAmount',
  //   width: '13%'
  // },
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
  data () {
    return {
      type: '1',
      showOn: false,
      issueYears: '',
      areaCode: '',
      idedit: true,
      mixDataList: [],
      mixListOptions: {
        mixGetDataListURL: '/WelfareSlave/list', // 数据列表接口，API地址
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
      releasecyleList: [],
      paymentList: []
    }
  },
  computed: {},
  activated () {
    this.page = 1
    this.size = 10
    this.type = '1'
    this.id = this.$route.query.id
  },
  mounted () {
    this.getsexList()
    this.getchildType()
    this.getreleasecyle()
    this.getpayment()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    async getreleasecyle () {
      const data = await this.getDictionaries('RELEASECYCLE')
      this.releasecyleList = data
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.welfareMasterId = this.id
      return formData
    },
    see (val, obj) {
      this.idedit = true
      this.visible = true
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      data.issuingDate = moment(data.issuingDate)
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
    },
    other (obj) {
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      data.issuingDate = moment(data.issuingDate)
      data.birthday = moment(data.birthday)
      return data
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 领取方式 PAYMENT
    async getpayment () {
      const data = await this.getDictionaries('PAYMENT')
      this.paymentList = data
    },
    // 儿童类型
    async getchildType () {
      const data = await this.getDictionaries('CHILDTYPE')
      this.childTypeList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    back () {
      this.$router.go(-1)
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
      this.exports()
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
