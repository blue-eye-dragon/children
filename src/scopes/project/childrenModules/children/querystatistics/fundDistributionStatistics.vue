<template>
  <div class="searchdata"
       id="tmd">
    <ta-border-layout :layout="{header:'0px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">
            <div class="__form-spec-line__">
              <div>

                <AreaQuery :msg="'区域'"
                           class="spilwid"
                           :fileldName="'address_Linkage'"
                           types="1"
                           :ishide="true"
                           :addressmodel="addressmodel"
                           @setaddress="setaddress"></areaQuery>

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
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
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
                <ta-form-item label="发放方式"
                              style="width:220px"
                              fieldDecoratorId="isBuFa"
                              :fieldDecoratorOptions="{initialValue: ''}"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-select placeholder="请选择发放周期">
                    <ta-select-option value="">全部</ta-select-option>
                    <ta-select-option value="0">正常发放</ta-select-option>
                    <ta-select-option value="1">补发</ta-select-option>
                  </ta-select>
                </ta-form-item>

              </div>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="getlist('000')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>

          </ta-form>
        </div>

        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
          <!-- <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal> -->
          <ta-button icon="rollback"
                     v-if="areaId!=oAreaId"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table bordered
                    class="tables table-min-width"
                    style="margin-top:20px"
                    :columns="tableColumns"
                    :scroll="{ x: 2500,}"
                    :showOverflowTooltip="true"
                    :dataSource="mixDataList">
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel==3 || b.areaLevel==4 || b.areaName=='合计' || b.isIn== 0">{{a}}</span>
              <a @click="getlist(b,'click')"
                 v-else>{{a}}</a>
            </template>
          </ta-table>
        </ta-spin>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '区域',
    dataIndex: 'areaName',
    width: 150,
    scopedSlots: { customRender: 'areaName' }
  },
  {
    title: '合计',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'totalNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'total'
      }]
  },
  {
    title: '集中供养事实无人抚养儿童',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'concentratedFeedNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'concentratedFeedTotal'
      }]
  },
  {
    title: '社会散居事实无人抚养儿童',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'noConcentratedFeedNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'noConcentratedFeedTotal'
      }]
  },
  {
    title: '孤儿助学金',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'orphanStudyNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'orphanStudyTotal'
      }]
  },
  {
    title: '社会散居孤儿',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'orphanLivingNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'orphanLivingTotal'
      }]
  },
  {
    title: '福利机构养育孤弃儿童',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'gqetNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'gqetTotal'
      }]
  },
  {
    title: '福利机构代养困境儿童',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'dykjetNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'dykjetTotal'
      }]
  },
  {
    title: '艾滋感染儿童',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'azNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'azTotal'
      }]
  },
  {
    title: '民间机构养育孤弃儿童',
    children: [
      {
        title: '人数',
        width: 100,
        align: 'center',
        dataIndex: 'yygqNumber'
      },
      {
        title: '资金（元）',
        width: 100,
        align: 'center',
        dataIndex: 'yygqTotal'
      }]
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      showOn: false,
      spinning: null,
      issearch: false,
      addressmodel: [],
      issuingCycleList: [],
      mode2: ['month', 'month'],
      mode3: ['year', 'year'],
      value2: [],
      value3: [],
      type: '',
      areaId: '',
      oAreaId: '',
      tableColumns,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        mixGetDataListURL: '/orphanLivingExpenses/queryGrantSituationStatistics' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      value: [], // 发放月份的值
      mode: ['month', 'month']

    }
  },
  activated () {
    const userInfo = window.parent.indexTool.getUserInfo()
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.oAreaId = window.parent.indexTool.getUserInfo().areaId
    if (userInfo.areaId == '1000000000000000000') {
      this.addressmodel = []
    } else {
      this.addressmodel = [userInfo.areaId]
    }
  },
  mounted () {
    this.type = ''
    this.getissuingCycle()
  },
  methods: {
    handleChange (e) {
      this.type = e
      this.value2 = []
      this.value3 = []
      this.form.setFieldsValue({ issueQuarter: null })
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
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 读取列表 无分页形式
    async getlist (value, type) {
      this.spinning = true
      const formData = this.form.getFieldsValue()
      console.log(formData)
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (this.value.length > 0) {
        formData.registerTimeStart = this.value[0].format('YYYY-MM')
        formData.registerTimeEnd = this.value[1].format('YYYY-MM')
      }
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
      if (type == 'click') {
        this.dealArea(value.idpath)
        formData.areaId = value.areaId
        this.areaId = value.areaId
      } else {
      }
      const params = {
        ...formData
      }
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.mixDataList = res.data.data
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
        this.setaddress()
      }
    },
    goback () {
      this.addressmodel.splice(-1, 1)
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.getlist()
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 重置
    resetFrom () {
      this.form.resetFields()
      this.page = 1
      this.size = 10
      this.type = ''
      this.mode2 = ['month', 'month']
      this.mode3 = ['year', 'year']
      this.value2 = []
      this.value3 = []
      this.getlist('000')
    },
    async getissuingCycle () {
      const data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingCycleList = data
    },
    handlePanelChange (value, mode) {
      this.value = value
      this.mode = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    Excel () {
      var data = this.userPageParams()
      const url = '/leftOverWoman/exportLeftOverWomanNum'
      this.exportFile(url, data)
      this.showOn = false
    }
  }
}
</script>
<style scoped>
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
.searchdata {
  height: 100%;
}
</style>
