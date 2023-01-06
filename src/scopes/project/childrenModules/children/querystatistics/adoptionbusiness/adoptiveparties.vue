<template>
  <div class="conts">
    <ta-tabs class="contin"
             :activeKey="nowkey"
             @change="callback">
      <ta-tab-pane tab="统计报表"
                   key="1">
        <div class="search">
          <!-- <ta-radio-group v-model="termCategory"
                          @change="radiochange">
            <ta-radio-button v-for="(item,index) in termCategorylist"
                             :value="item.value"
                             :key="index">{{item.label}}</ta-radio-button>
          </ta-radio-group> -->
          <ta-form layout="inline"
                   v-if="nowkey=='1'"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <AreaQuery class="spilwid"
                       :ishide.sync="ishide"
                       msg="区域"
                       :addressmodel="addressmodel"
                       @setaddress="setaddress"></AreaQuery>
            <ta-form-item style="width:380px"
                          label="登记日期"
                          fieldDecoratorId="date"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker @change="datechange" />
            </ta-form-item>
            <ta-form-item label="收养类别:"
                          style="width:320px"
                          fieldDecoratorId="adoptionCategory"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-select :placeholder="'请选择收养类别'">
                <ta-select-option v-for="(item,index) in adoptionlist"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="btnleft reset"
                           icon="search"
                           style="background:rgb(78, 185, 52);border:1px solid #4eb934; "
                           @click="searchslist('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn ">
          <ta-button @click="goback"
                     class="rightClass btnleft"
                     icon="rollback"
                     v-if="isShowReturn">返回</ta-button>
          <ta-button class="exportbtn rightClass"
                     icon="upload"
                     @click="exports">导出</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning1">
          <ta-table bordered
                    class="tables table-min-width"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :locale="{emptyText: '请根据检索条件查询详细列表信息'}"
                    :dataSource="tableData">
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel >2 || b.areaName == '合计' || (b.areaLevel == 2 && areaLevel)">{{a}}</span>
              <a @click="areaClick(b)"
                 v-else-if="3!=b.areaLevel">{{a}}</a>
              <span v-else>{{a}}</span>
            </template>
            <span slot="total"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 @click="lookInfo(val,obj,index,'0')">{{obj.total}}</a>
            </span>
            <span slot="adoptionTotal"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 @click="lookInfo(val,obj,index,'1')">{{obj.adoptionTotal}}</a>
            </span>
            <span slot="relieveTotal"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 @click="lookInfo(val,obj,index,'2')">{{obj.relieveTotal}}</a>
            </span>
            <span slot="revokeTotal"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 @click="lookInfo(val,obj,index,'3')">{{obj.revokeTotal}}</a>
            </span>
            <span slot="certificateTotal"
                  slot-scope="val,obj,index">
              <a href="javascript:;"
                 @click="lookInfo(val,obj,index,'4')">{{obj.certificateTotal}}</a>
            </span>
          </ta-table>
        </ta-spin>
      </ta-tab-pane>
      <ta-tab-pane tab="统计图表"
                   key="2">
        <ta-form layout="inline"
                 v-if="nowkey=='2'"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery class="spilwid"
                     :ishide.sync="ishide"
                     msg="区域"
                     :addressmodel="addressmodel2"
                     @setaddress="setaddress2"></AreaQuery>
          <ta-form-item label="年度"
                        class="spilwid"
                        :labelCol="{span:7}"
                        fieldDecoratorId="year"
                        :wrapperCol="{span:17}">
            <ta-year-picker style="width:100%" />
          </ta-form-item>
          <ta-form-item>
            <div class="searchButton">
              <ta-button type="primary"
                         class="btnleft reset"
                         icon="search"
                         style="background:rgb(78, 185, 52);border:1px solid #4eb934; "
                         @click="searchs">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom2">重置</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
        
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning2">
          <div class="echarts">
            <div class="circular">
              <div class="echarttitle">收养登记业务类别统计</div>
              <div class="circularout">
                <div class="ecs">
                  <ta-e-charts chartsType="line"
                               :data="childrenSum"
                               :settings="chartSettings"
                               :data-empty="dataEmpty1"
                               :extend="chartSettingschartExtend"
                               height="250px"
                               :xAxis="xAxis1"
                               :yAxis="yAxis1"
                               :tooltip="childrenSumtooltip1" />
                </div>
              </div>
            </div>
            <div class="circular">
              <div class="echarttitle">收养儿童类别统计</div>
              <div class="circularout">
                <div class="ecs"
                     style="margin-top:-70px">
                  <ta-e-charts :data="ringdata"
                               chartsType="ring"
                               :settings="chartSettingsloop"
                               :extend="chartExtend"
                               :data-empty="dataEmpty2"
                               :legend-visible="false"
                               :tooltip="childrenSumtooltip2"
                               height='320px' />
                </div>
              </div>
            </div>
          </div>
          <div class="echarts">
            <div class='circular2'>
              <div class="echarttitle">收养登记业务趋势</div>
              <div class="circularout">
                <div class="ecs">
                  <ta-e-charts chartsType="histogram"
                               :data="schoolSituationData"
                               :data-empty="dataEmpty4"
                               :tooltip="schoolSituationDatatooltip"
                               height='340px'
                               :extend="parentdataExtend"
                               :xAxis="xAxis2"
                               :yAxis="yAxis2"
                               :legend-visible="false" />
                </div>
              </div>
            </div>
          </div>
        </ta-spin>
      </ta-tab-pane>
    </ta-tabs>
    <ta-modal :centered="false"
              style="top: 25%;"
              :visible="showOn"
              @ok="Excel"
              @cancel="handleCancel">
      <div>
        <h3>确认导出查询条件下的全部有效数据吗？</h3>
      </div>
    </ta-modal>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
import '@yh/ta404-ui/es/echarts/lib/style.css'
export default {
  components: {
    AreaQuery,
    TaECharts
  },
  data () {
    return {
      spinning1: null,
      spinning2: null,
      nowkey: '1',
      termCategory: ' ',
      termCategorylist: [
        { value: '1', label: '本周' },
        { value: '2', label: '本月' },
        { value: '3', label: '三个月' },
        { value: '4', label: '六个月' },
        { value: ' ', label: '全部' }
      ],
      ishide: false,
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: '22%',
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '收养业务总数',
          width: '15%',
          dataIndex: 'total',
          scopedSlots: { customRender: 'total' }
        },
        {
          title: '收养登记总数',
          width: '15%',
          dataIndex: 'adoptionTotal',
          scopedSlots: { customRender: 'adoptionTotal' }
        },
        {
          title: '解除收养登记总数',
          width: '15%',
          dataIndex: 'relieveTotal',
          scopedSlots: { customRender: 'relieveTotal' }
        },
        {
          title: '撤销收养登记总数',
          width: '16%',
          dataIndex: 'revokeTotal',
          scopedSlots: { customRender: 'revokeTotal' }
        },
        {
          title: '出具收养关系证明总数',
          width: '18%',
          dataIndex: 'certificateTotal',
          scopedSlots: { customRender: 'certificateTotal' }
        },
        // {
        //   title: '补录登记总数',
        //   width: '15%',
        //   dataIndex: 'additonalTotal'
        // },
        // {
        //   title: '补领登记总数',
        //   width: '15%',
        //   dataIndex: 'renewTotal'
        // }
      ],
      dateText: '全部',
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoptionstatistics/statisticsQtyByAll',
        mixGetDataListIsPage: false // 数据列表接口，是否需要分页？
      },
      mixPageRef: 'gridPager',
      typelist: [],
      chartSettings: {
        area: false
      },
      childrenSum: {
        columns: ['月份', '出具收养登记证明', '撤销收养登记', '收养登记', '补录撤销收养登记', '补录收养登记', '补录解除收养登记', '补领收养登记', '补领解除收养登记', '解除收养登记'],
        rows: []
      },
      ringdata: {
        columns: ['childType', 'adoptionAmount'],
        rows: []
      },
      dataEmpty1: false,
      dataEmpty2: false,
      dataEmpty4: false,
      colors1: ['#9400d3'],
      childrenSumtooltip1: {
        visible: false,
        formatter: function (params) {
          var res = '<div><p>月份：' + params.data[0] + '</br>' + '数量：' + params.data[1] + ' 人</p></div>'
          return res
        }
      },
      childrenSumtooltip2: {
        visible: false,
        formatter: function (params) {
          var res = '<div>' + params.marker + params.name + ': ' + params.value + ' 人 (' + params.percent + '%)' + '</div>'
          return res
        }
      },
      xAxis1: [
        {
          name: '月份',
          nameLocation: 'end',
          axisLine: {
            show: true
          },
          show: true,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          nameTextStyle: {
            padding: [0, 0, -28, -28]
          }
        }
      ],
      yAxis1: [
        {
          name: '人数（/人）',
          show: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          nameTextStyle: {
            padding: [0, 0, 0, 50]
          }
        }
      ],
      xAxis2: [
        {
          name: '月份（/月）',
          nameLocation: 'end',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          nameTextStyle: {
            padding: [0, 0, -26, -28]
          }
        }
      ],
      yAxis2: [
        {
          name: '业务量',
          show: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          min: 0,
          minInterval: 1,
          nameTextStyle: {
            padding: [0, 0, 0, -26]
          }
        }
      ],
      chartSettingsloop: {
        radius: ['40%', '55%'], // 环大小
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          show: false
        }
      },
      chartSettingschartExtend: {
        grid: {
          top: '30%',
          bottom: 0
        }
      },
      chartExtend: {
        title: {
          text: '',
          subtext: 0,
          textAlign: 'center',
          textStyle: {
            fontSize: 16,
            color: '#2a2a2a'
          },
          subtextStyle: {
            fontSize: 16,
            color: 'red'
          },
          x: '49%',
          y: '56%'
        },
        legend: {
          orient: 'vertical',
          x: '75%',
          y: '40%',
          itemWidth: 12,
          itemHeight: 12
        }

      },
      schoolSituationData: {
        columns: ['month', 'adoptionAmount'],
        rows: []
      },
      schoolSituationDatatooltip: {
        formatter: function (params) {
          var res = '<div><p>' + params.name + '</br>' + '分布：' + params.data + ' 人</p></div>'
          return res
        }
      },
      parentdataExtend: {
        barWidth: 20,
        grid: {
          left: '10%'
        }
      },
      addressmodel: [],
      addressmodel2: [],
      adoptionlist: [],
      areaId: null, // 基本数据统计列表的区域id
      isShowReturn: false, // 返回按钮是否显示
      clickNotQuery: false, // 区分是区域点击还是查询按钮的查询
      showOn: false,
      timeArray1: '',
      timeArray2: '',
      isBenJi: '',
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel == '2'
    }
  },
  activated () {
    this.getchildtype()
    this.showOn = false
    this.isShowReturn = false
    this.isBenJi = ''
    this.timeArray1 = ''
    this.timeArray2 = ''
    this.areaId = null
    this.clickNotQuery = false
    this.resetFrom()
    this.resetFrom2()
  },
  methods: {
    // 获取收养类型 ADOPTIONCATEGORY
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 区域点击事件
    areaClick (e) {
      this.isShowReturn = true
      this.areaId = e.areaId
      this.addressmodel.push(e.areaId)
      this.searchslist();
    },
    // 报表区域查询条件赋值
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 图表区域查询条件赋值
    setaddress2 () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel2
      })
    },
    // 返回
    goback () {
      this.areaId = null
      this.isShowReturn = false
      this.resetFrom()
    },
    // 导出按钮
    exports () {
      this.showOn = true
    },
    // 导出确定
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/adoption/statisticsQtyByAll', data)
      this.showOn = false
    },
    // 导出取消
    handleCancel () {
      this.showOn = false
    },
    // 点击数字跳转
    lookInfo (val, obj, index, type) { // type: 0收养业务总数 1收养登记总数 2解除收养登记总数 3撤销收养登记总数 4出具收养关系证明总数
      if (obj.areaLevel == 2 && this.areaLevel) {
        this.isBenJi = 1
      }
      let formData = JSON.stringify(this.searchForm.getFieldsValue())
      console.log(formData, 44);
      this.$router.push({
        name: 'adoptionbusinessquery',
        query: {
          type,
          formData: formData,
          timeArray1: this.timeArray1,
          timeArray2: this.timeArray2,
          areaId: obj.areaId,
          isBenJi: this.isBenJi,
          returnName: 'adoptiveparties',
          areaArray: obj.idpath
        }
      })
    },
    async searchs () {
      this.spinning2 = true
      const froms = this.searchForm.getFieldsValue()
      if (froms.address_Linkage && froms.address_Linkage.length > 0) {
        froms.areaId = froms.address_Linkage.slice(-1).toString()
        delete froms.address_Linkage
      } else {
        froms.areaId = window.parent.indexTool.getUserInfo().areaId
      }

      if (froms.year) {
        froms.year = froms.year.format('YYYY')
      }
      
      const data = await this.post('/adoptionstatistics/statisticsAdoptionByBusinessType', froms)
      this.childrenSum.rows = data.data.data.adoptionBusinessTypeMap
      if (this.childrenSum.rows && this.childrenSum.rows.length == 0) {
        this.childrenSum.rows = [
          {
            录撤销收养登记: 0,
            补录解除收养登记: 0,
            收养登记: 0,
            月份: '暂无数据',
            解除收养登记: 0,
            出具收养登记证明: 0,
            补录收养登记: 0,
            补领解除收养登记: 0,
            补领收养登记: 0,
            撤销收养登记: 0
          }
        ]
      }
      this.ringdata.rows = data.data.data.adoptionChildTypeMap.adoptionChildLists
      this.chartExtend.title.subtext = data.data.data.adoptionChildTypeMap.totalCount + '人'
      this.chartExtend.title.text = '总共'
      if (this.ringdata.rows && this.ringdata.rows.length == 0) {
        this.chartExtend.title.subtext = ''
        this.chartExtend.title.text = '暂无数据'
        this.ringdata.rows = [
          {
            childType: '暂无数据',
            adoptionAmount: 0
          }
        ]
      }
      this.schoolSituationData.rows = data.data.data.adoptionRegisterAreaMap
      if (this.schoolSituationData.rows && this.schoolSituationData.rows.length == 0) {
        this.schoolSituationData.rows = [
          {
            month: '暂无数据',
            adoptionAmount: 0
          }
        ]
      }
      this.dataEmpty1 = this.childrenSum.rows.length == 0
      this.dataEmpty2 = this.ringdata.rows.length == 0
      this.dataEmpty4 = this.schoolSituationData.rows.length == 0
      // adoptionRegisterAreaMap
      this.$nextTick(() => {
        this.spinning2 = false
      })
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
      this.$nextTick(() => {
        if (key == '1') {
          this.resetFrom()
        } else {
          this.resetFrom2()
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    datechange () {
      this.termCategory = null
    },
    radiochange () {
      this.searchForm.setFieldsValue({
        date: []
      })
    },
    searchslist (e) {
      if (e) { // 只有点查询才重置参数
        this.clickNotQuery = false
      } else { // 区域点击
        this.clickNotQuery = true
      }
      let dateText = ''
      if (this.termCategory !== null) {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        if (this.termCategory == 1) {
          // 本周第一天
          var WeekFirstDay = (new Date(date - (date.getDay() - 1) * 86400000)).getDate()
          // 本周最后一天
          // var WeekLastDay = (new Date((date / 1000 + 6 * 86400) * 1000)).getDate()
          dateText = `本周（${year}-${month}-${WeekFirstDay}~${year}-${month}-${day}）`
        } else if (this.termCategory == 2) {
          dateText = `本月（${year}-${month}-01~${year}-${month}-${day}）`
        } else if (this.termCategory == 3) {
          dateText = `三个月（${year}-${month}-01~${year}-${month}-${day}）`
          const prevyear = month - 3 < 0 ? year - 1 : year
          let prevmonth = month - 3 <= 0 ? month + 9 : month - 3
          prevmonth = prevmonth < 10 ? '0' + prevmonth : prevmonth
          const lastDay = new Date(prevyear, prevmonth, 0).getDate()
          const prevday = lastDay < day ? lastDay : day
          dateText = `三个月（${prevyear}-${prevmonth}-${prevday}~${year}-${month}-${day}）`
        } else if (this.termCategory == 4) {
          dateText = `三个月（${year}-${month}-01~${year}-${month}-${day}）`
          const prevyear = month - 6 < 0 ? year - 1 : year
          let prevmonth = month - 6 <= 0 ? month + 6 : month - 6
          prevmonth = prevmonth < 10 ? '0' + prevmonth : prevmonth
          const lastDay = new Date(prevyear, prevmonth, 0).getDate()
          const prevday = lastDay < day ? lastDay : day
          dateText = `三个月（${prevyear}-${prevmonth}-${prevday}~${year}-${month}-${day}）`
        } else {
          dateText = '全部'
        }
      }
      const formData = this.searchForm.getFieldsValue()
      if (formData.date && formData.date.length > 0) {
        const dateStart = formData.date[0].format('YYYY-MM-DD')
        const dateEnd = formData.date[1].format('YYYY-MM-DD')
        this.timeArray1 = dateStart
        this.timeArray2 = dateEnd
        dateText = `${dateStart}~${dateEnd}`
      }
      //   this.tableColumns[0].title = dateText
      this.getlist()
    },
    async getlist () {
      this.spinning1 = true
      const params = this.userPageParams()
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (!res.errors) {
        this.tableData = res.data.data
      }
      this.$nextTick(() => {
        this.spinning1 = false
      })
    },
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (this.clickNotQuery && this.areaId) { // 点击区域时传值
        formData.areaId = this.areaId
        delete formData.address_Linkage
      } else { // 点击查询按钮时传值
        if (formData.address_Linkage && formData.address_Linkage.length > 0) {
          formData.areaId = formData.address_Linkage.slice(-1).toString()
          delete formData.address_Linkage
        } else {
          formData.areaId = window.parent.indexTool.getUserInfo().areaId
        }
        // 所选区划与当前登录人区划相同或者为空时，不显示返回按钮
        if (formData.areaId == window.parent.indexTool.getUserInfo().areaId || !formData.areaId) {
          this.isShowReturn = false
        } else {
          this.isShowReturn = true
        }
      }

      if (formData.date && formData.date.length > 0) {
        formData.dateStart = formData.date[0].format('YYYY-MM-DD')
        formData.dateEnd = formData.date[1].format('YYYY-MM-DD')
        delete formData.date
      }
      formData.termCategory = this.termCategory
      return formData
    },
    // 重置
    resetFrom () {
      this.searchForm.resetFields()
      this.isBenJi = ''
      this.addressmodel = window.parent.indexTool.getUserInfo().areaLevel == 0 ? [] : [window.parent.indexTool.getUserInfo().areaId]
      this.searchslist('search');
    },
    // 重置
    resetFrom2 () {
      this.searchForm.resetFields()
      this.isBenJi = ''
      this.addressmodel2 = window.parent.indexTool.getUserInfo().areaLevel == 0 ? [] : [window.parent.indexTool.getUserInfo().areaId]
      this.searchs();
    },
  }
}
</script>
<style lang="less" scoped>
.spilwid3 {
  width: 380px;
}
.conts {
  padding: 14px;
}
.search {
  width: 100%;
  height: 40px;
  margin: 0px 0 18px;
  display: flex;
  align-items: center;
}
.echarts {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.circular {
  width: calc((100% - 20px) / 2);
}
.circular2 {
  width: calc(100% - 20px);
}
.circulartop {
  width: calc((100% - 300px) / 2);
  // border: 1px solid #ccc;
  margin-right: 110px;
  margin-left: 50px;
  border: 1px solid #ccc;
  height: 60% !important;
  margin-top: 20px;
}
.echarttitle1 {
  width: 100%;
  font-size: 16px;
  height: 40px;
  // font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  text-indent: 20px;
  line-height: 40px;
}
.echarttitle {
  width: 100%;
  font-size: 18px;
  height: 54px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  text-indent: 20px;
  line-height: 54px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
}
.circularout {
  width: 100%;
  display: flex;
  padding-top: 20px;
}
.ecs {
  width: 90% !important;
  margin-left: 1%;
}
</style>
