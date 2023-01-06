<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <AreaQuery v-if="ishide"
                       class="spilwid"
                       :labelCol="{span:9}"
                       :wrapperCol="{span:15}"
                       :ishide.sync="ishide"
                       @setaddress="setaddress"
                       @adsvalchange="adsvalchange"
                       :addressmodel="addressmodel"
                       msg="区域"
                       types='1'></AreaQuery>
            <ta-form-item label="发放周期"
                          style="width:220px"
                          fieldDecoratorId="issuingCycle"
                          :fieldDecoratorOptions="{initialValue: ''}"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}">
              <ta-select placeholder="请选择发放周期"
                         @change="handleChange">
                <ta-select-option value="">全部</ta-select-option>
                <ta-select-option v-for="(item,index) in issuingCycleList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="发放年份"
                          v-show="type == '2'"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          style="width:300px">
              <ta-range-picker :placeholder="['开始年份', '结束年份']"
                               format="YYYY"
                               :mode="mode3"
                               :value="value3"
                               @panelChange="handlePanelChange3" />
            </ta-form-item>
            <ta-form-item label="发放季度"
                          v-show="type == '1'"
                          fieldDecoratorId="issueQuarter"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          class="spilwid">
              <ta-quarter-picker placeholder="请选择发放季度"
                                 style="width:100%" />
            </ta-form-item>
            <ta-form-item label="发放年月"
                          v-show="type == '0'"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          style="width:300px">
              <ta-range-picker :placeholder="['开始年月', '结束年月']"
                               format="YYYY-MM"
                               :mode="mode2"
                               :value="value2"
                               @panelChange="handlePanelChange2" />
            </ta-form-item>
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
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     @click="addIssueFun">新增发放</ta-button>
          <ta-button type="primary"
                     icon='plus'
                     @click="addIssueFun1">新增补发</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="see(obj)"
                  class="com_textsee">查看</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
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
    width: '26%',
    dataIndex: 'areaName'
  },
  {
    title: '发放人数',
    width: '16%',
    dataIndex: 'grantingNumber'
  },
  {
    title: '发放方式',
    dataIndex: 'isBuFaListShow',
    width: '15%'
  },
  {
    title: '发放周期',
    dataIndex: 'issuingCycle',
    width: '15%',
    collectionType: 'ISSUINGCYCLE',
    scopedSlots: { customRender: 'issuingCycle' }
  },
  {
    title: '发放时间',
    dataIndex: 'issuingYears',
    width: '18%'
  },
  {
    title: '发放金额（元）',
    width: '22%',
    dataIndex: 'costOfLiving'
  },
  // {
  //   title: '补发时间',
  //   width: '18%',
  //   dataIndex: 'replacementYears'
  // },
  // {
  //   title: '补发金额',
  //   width: '22%',
  //   dataIndex: 'replacementAmount'
  // },
  {
    title: '登记日期',
    width: '18%',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      type: '',
      ishide: true,
      pageSize: 10,
      pageNum: 1,
      tableColumns,
      tableData: [],
      issuingCycleList: [],
      mixListOptions: {
        mixGetDataListURL: '/WelfareMaster/list', // 数据列表接口，API地址
        mixDeleteURL: 'WelfareMaster/updateDelStateById' // 删除数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      mode2: ['month', 'month'],
      mode3: ['year', 'year'],
      value2: [],
      value3: [],
      addressmodel: [],
      areaId: ''
    }
  },
  activated () {
    this.type = ''
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.addressmodel = [this.areaId]
    this.getissuingCycle()
    this.setaddress()
  },
  mounted () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.getissuingCycle()
  },
  methods: {
    // 重置
    resetFrom () {
      this.type = ''
      this.mode2 = ['month', 'month']
      this.mode3 = ['year', 'year']
      this.value2 = []
      this.value3 = []
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.handleSubmit('search')
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    adsvalchange (val) {
    },
    async getissuingCycle () {
      const data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingCycleList = data
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        this.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      }
      formData.areaId = this.areaId
      formData.childType = 120
      if (formData.issuingCycle == '2' && this.value3.length > 0) {
        formData.issueYearsStart = this.value3[0].format('YYYY')
        formData.issueYearsEnd = this.value3[1].format('YYYY')
      }
      if (formData.issuingCycle == '1' && formData.issueQuarter) {
        formData.issueQuarter = formData.issueQuarter.format('YYYY-Q季度')
      }
      if (formData.issuingCycle == '0' && this.value2.length > 0) {
        formData.issueYearsStart = this.value2[0].format('YYYY-MM')
        formData.issueYearsEnd = this.value2[1].format('YYYY-MM')
      }
      // this.changetime(formData)
      // if (this.value.length > 0) {
      //   formData.issueYearsStart = this.value[0].format('YYYY-MM')
      //   formData.issueYearsEnd = this.value[1].format('YYYY-MM')
      // }
      return formData
    },
    handleChange (e) {
      // this.disabled = false
      this.type = e
      this.value2 = []
      this.value3 = []
      this.searchForm.setFieldsValue({ issueQuarter: null })
    },
    onChange (value) {
      if (value.length == 0) {
        this.value = []
      }
    },
    handlePanelChange2 (value, mode) {
      this.value2 = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    handlePanelChange3 (value, mode) {
      this.value3 = value
      this.mode3 = ['year', 'year']
    },
    pagechange (page, size) {
      this.pageNum = page
      this.pageSize = size
    },
    addIssueFun () {
      this.$router.push({
        name: 'addIssue',
        query: {
          nowkey: '1'
        }
      })
    },
    addIssueFun1 () {
      this.$router.push({
        name: 'addIssue',
        query: {
          nowkey: '2'
        }
      })
    },
    see (obj) {
      this.$router.push({
        name: 'detail',
        query: {
          id: obj.id
        }
      })
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.fr {
  float: right;
}
</style>
