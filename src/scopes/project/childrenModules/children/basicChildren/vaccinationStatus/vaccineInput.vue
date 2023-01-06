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
               title="疫苗记录"
               :show.sync="showtwo"></Title>
        <div>
          <div class="visitbtn">
            <ta-button type="primary"
                       class="addbtn"
                       @click="add">新增</ta-button>
          </div>
          <ta-table ref="two"
                    class="tables"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :showOverflowTooltip="true"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span @click="see(val,obj)"
                    class="com_textsee">查看</span>
              <template>

                <span @click="edit(val,obj)"
                      class="com_textedit">编辑</span>

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
    <ta-drawer :title="this.nowtype==1?'疫苗接种情况':'疫苗接种情况'"
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
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入疫苗名称'}"
                      :fieldDecoratorOptions="{rules: [{ max: 100,whitespace:true, message: '疫苗名称字段最大输入100个字符' }]}">
          <ta-input placeholder="请输入疫苗名称"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="疫苗批号"
                      fieldDecoratorId="vaccineBatchNumber"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入疫苗批号'}"
                      :fieldDecoratorOptions="{rules: [{ max: 20,whitespace:true, message: '疫苗批号字段最大输入20个字符' }]}">
          <ta-input placeholder="请输入疫苗批号"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种部位"
                      fieldDecoratorId="inoculationPosition"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入接种部位'}"
                      :fieldDecoratorOptions="{rules: [{ max: 50,whitespace:true, message: '接种部位字段最大输入50个字符' }]}">
          <ta-input placeholder="请输入接种部位"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="疫苗生产企业"
                      fieldDecoratorId="vaccineProductionEnterprise"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入疫苗生产企业'}"
                      :fieldDecoratorOptions="{rules: [{ max: 100,whitespace:true, message: '疫苗生产企业字段最大输入100个字符' }]}">
          <ta-input placeholder="请输入疫苗生产企业"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种人"
                      fieldDecoratorId="vaccinator"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请输入接种人'}"
                      :fieldDecoratorOptions="{rules: [{ max: 72,whitespace:true, message: '接种人字段最大输入72个字符' }]}">
          <ta-input placeholder="请输入接种人"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种单位"
                      fieldDecoratorId="inoculateUnit"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请输入接种单位'}"
                      :fieldDecoratorOptions="{rules: [{ max: 72,whitespace:true, message: '接种单位字段最大输入72个字符' }]}">
          <ta-input placeholder="请输入接种单位"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="接种日期"
                      fieldDecoratorId="inoculateTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择接种日期'}">
          <ta-date-picker style="width: 100%;"
                          :valid-now-time="'right'"
                          :disabled="idedit"
                          placeholder="请选择接种日期" />
        </ta-form-item>
        <!-- <ta-form-item
          label="提醒"
          fieldDecoratorId="name"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :require="{message:'请输入提醒!'}"
        >
         <ta-input placeholder="请输入提醒" />
        </ta-form-item>-->
        <ta-form-item label="是否已接种"
                      fieldDecoratorId="isInoculated"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择是否已接种'}">
          <ta-select placeholder="请选择是否已接种"
                     @change="selectchange"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in isInoculatedList"
                              :key="index">{{item.label}}</ta-select-option>>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="未接种原因"
                      fieldDecoratorId="noInoculatedReason"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      v-if="this.showInput==true"
                      :require="{message:'请输入未接种原因'}"
                      :fieldDecoratorOptions="{rules: [{ max: 200, message: '未接种原因字段最大输入200个字符' }]}">
          <ta-textarea placeholder="请输入未接种原因"
                       :rows="4"
                       :disabled="idedit" />
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
    title: '疫苗名称',
    dataIndex: 'vaccineName',
    width: '18%'
  },
  {
    title: '疫苗批号',
    dataIndex: 'vaccineBatchNumber',
    width: '18.1%'
  },
  // {
  //   title: '接种部位',
  //   dataIndex: 'inoculationPosition',
  //   width: '12.1%'
  // },
  // {
  //   title: '接种人',
  //   dataIndex: 'vaccinator',
  //   width: '11%'
  // },
  {
    title: '接种日期',
    dataIndex: 'inoculateTime',
    width: '17%'
  },
  {
    title: '是否已接种',
    dataIndex: 'isInoculated',
    collectionType: 'YESNO',
    width: '17%'
  },
  {
    title: '接种日期',
    dataIndex: 'createTime',
    width: '17%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
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
      mixListOptions: {
        mixGetDataListURL: '/childVaccination/queryChildVaccinationRecords', // 数据列表接口，API地址
        mixDeleteURL: '/childVaccination/updateDelStateById', // 删除接口，API地址
        mixAddURL: '/childVaccination/save', // 新增接口
        mixEditURL: '/childVaccination/update', // 编辑接口
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      childBaseId: '',
      childEnterId: '',
      isInoculatedList: [],
      showInput: false,
      iscanshow: false,
      rules: {
        vaccineName: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入疫苗名称!' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        vaccineBatchNumber: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入疫苗批号!' },
            { max: 20, message: '最大输入20个字符' }
          ]
        },
        inoculationPosition: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入接种部位!' },
            { max: 50, message: '最大输入50个字符' }
          ]
        },
        vaccineProductionEnterprise: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入疫苗生产企业!' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        vaccinator: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入接种人!' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        inoculateUnit: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入接种单位!' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        noInoculatedReason: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入未接种原因!' },
            { max: 200, message: '最大输入200个字符' }
          ]
        }
      }
    }
  },
  activated () {
    this.loadData()
    const data = JSON.parse(this.$route.params.obj)
    this.obj = data
    this.name = this.obj.name
    this.iscanshow = this.$route.params.type == 1
    this.childBaseId = this.obj.childBaseId
    this.childEnterId = this.obj.childEnterId
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
    console.log('routers')
    console.log(this.Base.getNowPageParam())
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
    window.onresize = () => {
      this.setHeight('one', 'oneout', !this.showone)
      this.setHeight('two', 'twoout', !this.showtwo)
    }
    this.getYESNO()
  },
  methods: {
    loadData () { },
    setContainer () {
      return this.$el.parentNode
    },
    selectchange (val) {
      console.log(val)
      if (val == '0') {
        this.showInput = true
      } else {
        this.showInput = false
      }
    },
    // 获取是否已接种
    async getYESNO () {
      const data = await this.getDictionaries('YESNO')
      this.isInoculatedList = data
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
      data.inoculateTime = moment(data.inoculateTime, 'YYYY-MM-DD')
      if (data.isInoculated == '0') {
        this.showInput = true
      } else {
        this.showInput = false
      }
      return data
      // this.$set(this, 'addressmodel', arr)
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
    add () {
      this.fileList = []
      this.idedit = false
      // this.form.resetFields()
      this.visible = true
      this.nowtype = 1
      this.showInput = false
    },
    userPageParams () {
      const params = {}
      params.childEnterId = this.childEnterId
      return params
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      this.$router.go(-1)
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
.ant-drawer-body {
    width: 350px !important;
}
</style>
