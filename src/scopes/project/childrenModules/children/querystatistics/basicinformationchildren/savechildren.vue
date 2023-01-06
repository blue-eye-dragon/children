<template>
  <div class="searchdata"
       id="searchdata"
       ref="doms">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery v-if="ishide"
                     class="spilwid"
                     :ishide.sync="ishide"
                     msg="区域"></AreaQuery>
          <ta-form-item class="spilwid"
                        label="享受年月"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-range-picker :placeholder="['开始年月', '结束年月']"
                             format="YYYY-MM"
                             :value="value"
                             :mode="mode2"
                             @panelChange="handlePanelChange2" />
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="searchs">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft exportbtn"
                       @click="exports">导出</ta-button>
            <!-- <ta-button class="btnleft exportbtn" @click="imgexports">图片导出</ta-button> -->
          </ta-form-item>
        </ta-form>
        <div class="titlecont">
          <p class="titles">救助儿童分类统计表</p>
          <p class="times">享受年月：{{yeartext}}</p>
        </div>
        <div class="tableout">
          <ta-table bordered
                    :columns="tableColumns"
                    :scroll="{ x: 1900 }"
                    :dataSource="tableData"></ta-table>
        </div>
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
        <div style="clear:both"></div>
      </div>
      <div class="lines"></div>
      <div class="echarts">
        <div class="circular">
          <div class="echarttitle">儿童类别占比</div>
          <div class="circularout">
            <div class="ecs">
              <ta-e-charts :data-empty="dataEmpty"
                           :data="ringdata"
                           :settings="chartSettingsloop"
                           :extend="chartExtend"
                           chartsType="ring" />
            </div>
            <!-- <div class="echarttext">111</div> -->
          </div>
        </div>
        <div class="linetwo"></div>
        <div class="circular">
          <div class="echarttitle">儿童总数量排名统计</div>
          <div class="circularout">
            <ta-e-charts class="ecs"
                         :data="histogramdata"
                         :legend-visible="false"
                         :data-empty="dataEmptytwo"
                         chartsType="histogram" />
            <div class="echarttext"
                 v-if="!dataEmptytwo">
              <ul>
                <li v-for="(item,index) in histogramdata.rows"
                    :key="index">
                  <div :class="index>2?'ecnumtwo':'ecnum'">{{index+1}}</div>
                  <div class="ectext">{{item.areaName}}</div>
                  <div class="ecline"></div>
                  <div class="ecmoney">{{item.totalNum}}人</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ta-border-layout>
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
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
// import TaECharts from '@yh/ta404-ui/es/echarts/src/Echarts'
import TaECharts from '@yh/ta404-ui/es/echarts'
import '@yh/ta404-ui/es/echarts/lib/style.css'
var that = null
export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    TaECharts
  },
  data () {
    const tableColumns = [
      {
        title: '',
        dataIndex: 'areaname',
        align: 'center',
        width: 120,
        fixed: 'left',
        customRender: (text, record, index) => {
          const obj = {
            children: text,
            attrs: {}
          }
          if (index === this.tableData.length - 1) {
            obj.children = '合计'
          }
          return obj
        }
      },
      {
        title: '总人数',
        dataIndex: 'totalNum',
        width: 80,
        fixed: 'left'
      },
      {
        title: '留守儿童',
        width: 120,
        overflowTooltip: true,
        dataIndex: 'lset'
      },
      {
        title: '困境儿童',
        width: 120,
        dataIndex: 'kjet'
      },
      {
        title: '流浪未成年人',
        width: 140,
        dataIndex: 'llwcnr'
      },
      {
        title: '孤残儿童',
        children: [
          {
            title: '总数',
            width: 80,
            dataIndex: 'gcet_total'
          },
          {
            title: '福利机构养育孤弃儿童',
            width: 180,
            dataIndex: 'gcet_fljgyygqet'
          },
          {
            title: '福利机构代养困境儿童',
            width: 180,
            dataIndex: 'gcet_fljgdykjet'
          },
          {
            title: '社会散居孤儿',
            width: 180,
            dataIndex: 'gcet_shsjge'
          },
          {
            title: '民间机构养育孤弃儿童',
            width: 180,
            dataIndex: 'gcet_mbjgyygqet'
          }
        ]
      },
      {
        title: '艾滋病病毒感染儿童',
        width: 220,
        dataIndex: 'gcet_fmyyazbbdgret'
      },
      {
        title: '事实无人抚养儿童',
        width: 160,
        dataIndex: 'sswrfyet'
      },
      {
        title: '被收养儿童',
        width: 120,
        children: [
          {
            title: '总数',
            width: 80,
            dataIndex: 'bsyet_total'
          },
          {
            title: '国内收养',
            width: 120,
            dataIndex: 'bsyet_gnsy'
          },
          {
            title: '涉外收养',
            width: 120,
            dataIndex: 'bsyet_swsy'
          }
        ]
      }
    ]
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childrenClassify/queryChildrenClassify', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      yeartext: '',
      typetext: '全部',
      searchdata: {},
      totals: '300',
      // echartsdata: {},
      ringdata: {
        columns: ['childrenCategory', 'totalNum'],
        rows: []
      },
      histogramdata: {
        columns: ['areaName', 'totalNum'],
        rows: []
      },
      chartSettingsloop: {
        // radius: ['90%', '40%'], //环大小
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
      gridloop: {
        left: '-30%',
        top: 800
      },
      chartExtend: {
        title: {
          text: '儿童总数',
          subtext: 0,
          textAlign: 'center',
          textStyle: {
            fontSize: 24,
            color: '#2a2a2a'
          },
          subtextStyle: {
            fontSize: 26,
            color: '#1990ff'
          },
          x: '48%',
          y: '44%'
        },
        legend: {
          orient: 'vertical',
          x: '75%',
          y: '38%',
          itemWidth: 12,
          itemHeight: 12,
          formatter: function (name) {
            console.log('sssss')
            console.log(this)
            let value = ''
            that.ringdata.rows.map(item => {
              if (item.childrenCategory == name) {
                value = item.totalNum
              }
            })
            return name + ' ' + value
          }
        },
        label: {
          normal: {
            show: false,
            position: 'center'
            // formatter: this.formatter,
            // textStyle: {
            //   fontSize: '24'
            // }
          }
        }
      },
      dataEmpty: false,
      dataEmptytwo: false,
      showOn: false,
      screenUrl: ''
    }
  },
  created () {
    that = this
  },
  activated () {
    this.loadData()
    setTimeout(() => {
      this.getalldata()
    }, 500)
  },
  mounted () { },
  methods: {
    // 下载
    downloadFile (fileName, content) {
      const aLink = document.createElement('a')
      const blob = this.base64ToBlob(content) // new Blob([content]);
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))// 兼容火狐
    },
    // base64转blob
    base64ToBlob (code) {
      const parts = code.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length

      const uInt8Array = new Uint8Array(rawLength)

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    },
    imgexports () {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      const dom = this.$refs.doms
      this.html2canvas(dom, {
        height: 1000
      }).then(canvas => {
        // document.body.appendChild(canvas)
        const str = canvas.toDataURL()
        this.downloadFile('export.jpg', str)
        // window.top.location.href = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2631684291,1365689381&fm=26&gp=0.jpg'
        // this.screenUrl = str
      })
      this.html2canvas(dom, {
        onrendered: function (canvas) {
          const str = canvas.toDataURL()
          location.href = str
        },
        width: 300,
        height: 300
      })
    },
    exports () {
      this.showOn = true
    },
    Excel () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      if (this.value.length > 0) {
        formData.startDateStart = this.value[0].format('YYYY-MM')
        formData.startDateEnd = this.value[1].format('YYYY-MM')
      }
      this.exportFile('/querystatistics/exportChildrenClassify', formData)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    formatter () {
      const str = '123' // '<p class="textchild">儿童总数</p><p class="totaschild">123</p>'
      return str
    },
    loadData () {
      this.dataEmpty = false
      this.dataEmptytwo = false
      this.showOn = false
      this.value = [] // 查询条件起领年月
      this.searchdata = {}
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() // 取上一個月的
      this.yeartext = '截止到 ' + nowyear + '-' + nowmonth
    },
    searchs () {
      console.log(this.value)
      if (this.value.length > 0) {
        const startDateStart = this.value[0].format('YYYY-MM')
        const startDateEnd = this.value[1].format('YYYY-MM')
        this.yeartext = startDateStart + ' ~ ' + startDateEnd
      } else {
        const nowDate = new Date()
        const nowyear = nowDate.getFullYear()
        const nowmonth = nowDate.getMonth() // 取上一個月的
        this.yeartext = '截止到 ' + nowyear + '-' + nowmonth
      }
      this.handleSubmit()
      this.$nextTick(() => {
        this.getalldata()
      })
    },
    async getalldata () {
      /// childrenClassify/queryChildrenCategoryAndTotalNum
      const data = await this.post(
        '/childrenClassify/queryChildrenCategoryAndTotalNum',
        this.searchdata
      )
      if (!data.errors) {
        console.log('shuju')
        console.log(data)
        this.ringdata.rows =
          data.data.data.childrenCategoryMap.ChildrenCategoryLists
        this.chartExtend.title.subtext =
          data.data.data.childrenCategoryMap.totalCount
        this.histogramdata.rows = data.data.data.childrenTotalNumLists
        console.log(this.ringdata.rows)
        if (this.ringdata.rows.length == 0) {
          this.dataEmpty = true
          this.chartExtend.title.text = ''
          this.chartExtend.title.subtext = ''
        } else {
          this.dataEmpty = false
        }
        if (this.histogramdata.rows.length == 0) {
          this.dataEmptytwo = true
        } else {
          this.dataEmptytwo = false
        }
      }
    },
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      if (this.value.length > 0) {
        formData.startDateStart = this.value[0].format('YYYY-MM')
        formData.startDateEnd = this.value[1].format('YYYY-MM')
      }
      this.searchdata = formData
      return formData
    },
    resetFrom () {
      this.value = []
      this.searchForm.resetFields()
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.tableout {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}
.tables {
  width: 2200px;
}
.titlecont {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
}
.titles {
  font-size: 22px;
  margin-top: 20px;
  font-weight: 600;
  line-height: 26px;
  color: rgba(0, 0, 0, 1);
}
.times {
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  margin: 15px 0;
}
.cbox {
  display: flex;
  margin-bottom: 12px;
}
.echarts {
  width: 100%;
  display: flex;
}
.circular {
  width: calc((100% - 10px) / 2);
}
.circularout {
  width: 100%;
  display: flex;
}
.ecs {
  width: 65% !important;
  margin-left: 1%;
}
.echarttext {
  width: 32%;
  margin-left: 2%;
  display: flex;
  align-items: center;
}
.echarttext ul {
  width: 100%;
}
.echarttext ul li {
  width: 100%;
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 20px;
  height: 30px;
}
.linetwo {
  width: 10px;
  background: rgba(239, 241, 244, 1);
}
.lines {
  width: 100%;
  background: rgba(239, 241, 244, 1);
  height: 10px;
  margin-top: 20px;
}
.textchild {
  font-size: 24px;
  font-weight: bold;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}
.totaschild {
  font-size: 26px;
  font-weight: bold;
  line-height: 22px;
  color: rgba(24, 144, 255, 1);
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
.ecnum {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(21, 169, 193, 1);
  line-height: 22px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.ectext {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.ecnumtwo {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  line-height: 22px;
  text-align: center;
  background: rgba(35, 194, 219, 1);
  color: rgba(255, 255, 255, 1);
}
.ecline {
  flex: 1;
  height: 1px;
  border: 1px dashed rgba(0, 0, 0, 0.25);
}
.ecmoney {
  margin-left: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.circularout /deep/ .v-charts-data-empty {
  left: 40%;
}
</style>
