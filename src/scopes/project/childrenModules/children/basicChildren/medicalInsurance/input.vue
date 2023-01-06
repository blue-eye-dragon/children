<template>
  <div class="conts tadrawer">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="fam_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ChildInformation :name="name"
                            :childEnterId='childEnterId'></ChildInformation>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars marpad">
        <Title id="fam_a"
               title="医疗保险记录"
               :show.sync="showtwo"></Title>
        <div>
          <div class="visitbtn">
            <ta-button type="primary"
                       class="addbtn"
                       @click="add">新增</ta-button>
          </div>
          <ta-table ref="two"
                    class="tables table-min-width"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="tableData"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span class="com_textsee"
                    @click="see(val,obj)">查看</span>

              <template>
                <span class="com_textedit"
                      @click="edit(val,obj)">编辑</span>
                <ta-popconfirm title="确定删除吗?"
                               @confirm="deletes(val,obj,index)"
                               @cancel="cancel"
                               okText="确定"
                               cancelText="取消">
                  <span class="com_textdel">删除</span>
                </ta-popconfirm>
              </template>
            </div>
          </ta-table>
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
      </div>
    </div>
    <div class="bom">
      <ta-button @click="backs"
                 class="preservation">返回</ta-button>
    </div>
    <ta-drawer title="医疗保险情况"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="缴费日期"
                      fieldDecoratorId="payTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择缴费日期'}">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          :valid-now-time="'right'"
                          placeholder="请选择缴费日期" />
        </ta-form-item>
        <ta-form-item label="类型"
                      fieldDecoratorId="medicalInsuranceType"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择类型'}">
          <ta-select placeholder="请选择类型"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in medicalInsuranceTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="周期"
                      fieldDecoratorId="medicalInsuranceCycle"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择周期'}">
          <ta-select placeholder="请选择周期"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in medicalInsuranceCycleList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <!-- <ta-form-item
          label="年度"
          fieldDecoratorId="name"
          :labelCol="{ span: 6 }"
          :require="{message:'请输入年度!'}"
        >
          <ta-input placeholder="请输入年度" />
        </ta-form-item>-->
        <ta-form-item label="金额(元)"
                      fieldDecoratorId="money"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请输入金额'}">
          <ta-input-number :disabled="idedit"
                           :min="0"
                           :max="9999999999"
                           placeholder="请输入金额"
                           :precision="2"
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
import Title from '@component/common/components/Title'
import listMinxin from '@component/common/js/mixins/listMixin'
import ChildInformation from '../components/childInformation'
import moment from 'moment'
import { setTimeout } from 'timers'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '缴费日期',
    dataIndex: 'payTime',
    align: 'center',
    width: '19%'
  },
  {
    title: '类型',
    dataIndex: 'medicalInsuranceType',
    align: 'center',
    collectionType: 'medicalInsuranceType',
    width: '20%'
  },
  {
    title: '周期',
    dataIndex: 'medicalInsuranceCycle',
    align: 'center',
    collectionType: 'medicalInsuranceCycle',
    width: '15%'
  },
  {
    title: '金额(元)',
    dataIndex: 'money',
    align: 'center',
    width: '20%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    align: 'center',
    width: '19%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    align: 'center',
    width: 240,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMinxin],
  components: {
    Title,
    ChildInformation
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      tableColumns,
      tableData: [],
      size: 10,
      page: 1,
      visible: false,
      obj: {},
      name: '',
      childBaseId: '',
      childEnterId: '',
      mixPageRef: 'gridPager',
      adoptionlist: [],
      disabledAdd: false,
      // 医疗类型
      medicalInsuranceTypeList: [],
      // 医疗周期
      medicalInsuranceCycleList: [],
      iscanshow: false,
      mixListOptions: {
        mixGetDataListURL:
          '/childMedicalInsurance/queryChildMedicalInsuranceRecords', // 数据列表接口，API地址
        mixDeleteURL: '/childMedicalInsurance/updateDelStateById', // 删除接口，API地址
        mixAddURL: '/childMedicalInsurance/save', // 新增接口
        mixEditURL: '/childMedicalInsurance/update', // 编辑接口
        mixExportURL: '' // 导出接口，API地址
      }
    }
  },
  activated () {
    this.loadData()
    const data = JSON.parse(this.$route.params.obj)
    console.log(this.$route.params.obj)
    this.obj = data
    this.name = this.obj.name
    this.iscanshow = this.$route.params.type == 1
    this.childBaseId = this.obj.childBaseId
    this.childEnterId = this.obj.childEnterId
    console.log('11111111111111111111')
    console.log(this.childEnterId)
    if (this.obj.childStatus == '1') {
      this.disabledAdd = false
    } else {
      this.disabledAdd = true
    }
    console.log(this.obj)
    this.adoptedFrom.setFieldsValue({
      idCard: this.obj.idCard,
      childNumber: this.obj.childNumber,
      childType: this.obj.childType,
      registerDate: moment(this.obj.registerDate)
    })
    this.showone = true
    this.showtwo = true
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    window.onresize = () => {
      this.setHeight('one', 'oneout', !this.showone)
      this.setHeight('two', 'twoout', !this.showtwo)
    }
    this.getchildtype()
    this.medicalInsuranceType()
    this.medicalInsuranceCycle()
  },
  methods: {
    loadData () {
      this.disabledAdd = false
    },
    setContainer () {
      return this.$el.parentNode
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    addother (obj) {
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      data.childBaseId = this.childBaseId
      data.childEnterId = this.childEnterId
      return data
    },
    other (obj) {
      console.log(obj)
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      // data.childBaseId = this.childBaseId
      data.payTime = moment(data.payTime, 'YYYY-MM-DD')
      // delete data.payTime
      return data
      // this.$set(this, 'addressmodel', arr)
    },
    // add () {},
    userPageParams () {
      const params = {}
      params.childEnterId = this.childEnterId
      // return {
      //   childEnterId: this.childEnterId
      // }
      return params
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      this.$router.go(-1)
    },
    see (val, obj) {
      this.idedit = true
      this.disabledAdd = true
      this.id = obj[this.idkey]
      this.visible = true
      this.nowtype = 2
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      this.$nextTick(() => {
        obj = this.other(data)
        // 其他操作
        this.form.setFieldsValue(obj)
      })
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },
    // 获取医疗保险类型
    async medicalInsuranceType () {
      const data = await this.getDictionaries('MEDICALINSURANCETYPE')
      this.medicalInsuranceTypeList = data
    },
    // // 获取医疗保险周期
    async medicalInsuranceCycle () {
      const data = await this.getDictionaries('MEDICALINSURANCECYCLE')
      console.log(data)
      this.medicalInsuranceCycleList = data
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    tableData: {
      handler () {
        this.setHeight('two', 'twoout')
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.contin {
  padding-top: 1px;
}
.mars {
  margin-top: 20px;
}
.tables {
  margin-top: 17px;
}
.marpad {
  padding-bottom: 20px;
}
.preservation {
  margin-left: 20px;
}
</style>
