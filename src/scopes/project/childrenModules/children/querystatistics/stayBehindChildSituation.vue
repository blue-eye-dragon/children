<template>
  <div class="searchdata"
       id='tmd'>
    <!-- 留守儿童综合查询之统计报表 -->
    <ta-border-layout :layout="{header:'0px'}">
      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery msg="区域"
                     class="spilwid"
                     :ishide="true"
                     :addressmodel='addressmodel'
                     @setaddress='setaddr'
                     :labelCol="{span:7}"
                     :wrapperCol="{span:17}"
                     types="2"></AreaQuery>
          <ta-form-item>
            <div class="searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchslist('000')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
      </div>
      <div style="text-align:center;font-size:22px;margin-bottom:10px;font-weight: 600;">农村留守儿童基本情况排查汇总表
      </div>
      <div style="float: right;margin-right: 20px;font-size: 16px;margin-top: -40px;">统计时间：截止到{{yeartext}}</div>
      <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
        <ta-button style=" margin-left: 10px;"
                   class="exportbtn"
                   icon="upload"
                   @click="showOn = true">导出</ta-button>
        <ta-modal :centered="false"
                  style="top: 25%;"
                  :visible="showOn"
                  @ok="Excel"
                  @cancel="showOn = false">
          <div>
            <h3>确认导出查询条件下的全部有效数据吗？</h3>
          </div>
        </ta-modal>
        <ta-button icon="rollback"
                   v-if="areaId!=oAreaId"
                   @click="searchslist()">返回</ta-button>
      </div>
      <ta-table class=" tables table-min-width  hight "
                :columns="tableColumns"
                :dataSource="tableData"
                :showOverflowTooltip="true"
                :scroll="{ x: 6700, y: 420}"
                bordered>
        <template slot="areaName"
                  slot-scope="a, b, c">
          <span v-if="b.areaLevel==4 || b.areaName=='合计'">{{a}}</span>
          <a @click="searchslist(b,'click')"
             v-else>{{a}}</a>
        </template>
        <template slot="bfb"
                  slot-scope="a, b, c">
          <span> {{calculate(b)}} </span>
        </template>
      </ta-table>
      <div style="margin-top:10px;font-size:12px">
        <span>备注： </span>
        1.年龄段情况：“未采集”类型统计的是数据中没有标明性别的数据。
        2.教育情况：“其他”类型统计的是教学情况选择为“文盲、未说明情况和特殊教育”类型的数据。
        3.教育情况：“未采集”类型统计的数据中没有标明教育情况的数据。
        4.户籍性质：“其他”类型主要统计数据中户籍性质选项为“无户口、居民户口”类型的数据。
        5.户籍性质：“未采集”类型主要统计数据中没有标明户籍性质的数据。
        6.健康状况：“未采集”类型主要统计数据中没有标明健康状况的数据。
        7.寄宿情况：“未采集”类型主要统计数据中没有标明寄宿情况的数据。
        8.委托照料原因情况：“未采集”类型统计的是数据中没有标明委托照料原因情况的数据。
        9.监护情况：“未采集”类型统计的是数据中没有标明监护情况的数据。
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
export default {
  components: {
    AreaQuery
  },
  data () {
    return {
      yeartext: '',
      addressmodel: [],
      tableData: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          fixed: 'left',
          align: 'center',
          width: 160,
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '数量',
          dataIndex: 'sumcount',
          fixed: 'left',
          align: 'center',
          width: 150,
          scopedSlots: { customRender: 'goStayBehindChildSearch' }
        },
        {
          title: '占总统计量情况（%）',
          dataIndex: 'now',
          fixed: 'left',
          align: 'center',
          width: 150,
          scopedSlots: { customRender: 'bfb' }
        },
        {
          title: '年龄段情况',
          children: [
            {
              title: '0-5周岁',
              children: [
                {
                  title: '小计',
                  dataIndex: 'zeroToFiveYearXiaojiCount',
                  align: 'center',
                  width: 100
                },
                {
                  title: '男',
                  dataIndex: 'zeroToFiveYearManCount',
                  align: 'center',
                  width: 100
                },
                {
                  title: '女',
                  dataIndex: 'zeroToFiveYearWomanCount',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '6-13周岁',
              children: [
                {
                  title: '小计',
                  dataIndex: 'sixToThreeteenYearXiaojiCount',
                  align: 'center',
                  width: 100
                },
                {
                  title: '男',
                  dataIndex: 'sixToThreeteenYearManCount',
                  align: 'center',
                  width: 100
                },
                {
                  title: '女',
                  dataIndex: 'sixToThreeteenYearWomanCount',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '14-16周岁',
              children: [
                {
                  title: '小计',
                  dataIndex: 'fourteenToSixteenYearXiaojiCount',
                  align: 'center',
                  width: 100
                },
                {
                  title: '男',
                  dataIndex: 'fourteenToSixteenYearManCount',
                  align: 'center',
                  width: 100
                },
                {
                  title: '女',
                  dataIndex: 'fourteenToSixteenYearWomanCount',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '未采集',
              dataIndex: 'leftOverChildAgeOtherCount',
              align: 'center',
              width: 150
            }

          ]
        },
        {
          title: '教育情况',
          children: [
            {
              title: '学龄前',
              dataIndex: 'beforeSchoolCount',
              align: 'center',
              width: 100
            },
            {
              title: '幼儿园',
              dataIndex: 'kindergartenCount',
              align: 'center',
              width: 100
            },
            {
              title: '小学',
              dataIndex: 'primarySchoolCount',
              align: 'center',
              width: 100
            },
            {
              title: '初中',
              dataIndex: 'juniorHighSchoolCount',
              align: 'center',
              width: 100
            },
            {
              title: '高中',
              dataIndex: 'seniorHighSchoolCount',
              align: 'center',
              width: 100
            },
            {
              title: '中专及以上',
              dataIndex: 'technicalSchoolCount',
              align: 'center',
              width: 120
            },
            // {
            //   title: '辍学',
            //   dataIndex: 'chuoxueCount',
            //   align: 'center',
            //   width: 100
            // },
            {
              title: '其他',
              dataIndex: 'educationOtherCount',
              align: 'center',
              width: 100
            },
            {
              title: '未采集',
              dataIndex: 'educationWeiCaiJi',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '户籍性质',
          children: [
            {
              title: '农村居民户口',
              dataIndex: 'geoponicsRegisterCount',
              align: 'center',
              width: 120
            },
            {
              title: '城镇居民户口',
              dataIndex: 'noGeoponicsRegisterCount',
              align: 'center',
              width: 150
            },
            {
              title: '其他',
              dataIndex: 'otherRegisterCount',
              align: 'center',
              width: 120
            },
            {
              title: '未采集',
              dataIndex: 'registerWeiCaiJi',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '健康状况',
          children: [
            {
              title: '健康',
              dataIndex: 'healthCount',
              align: 'center',
              width: 100
            },
            {
              title: '一般或较弱',
              dataIndex: 'yibanCount',
              align: 'center',
              width: 120
            },
            {
              title: '重病',
              dataIndex: 'zhongbingCount',
              align: 'center',
              width: 100
            },
            {
              title: '慢性病',
              dataIndex: 'manxingbingCount',
              align: 'center',
              width: 100
            },
            {
              title: '残疾',
              dataIndex: 'canjiCount',
              align: 'center',
              width: 100
            },
            {
              title: '其他',
              dataIndex: 'healthOtherCount',
              align: 'center',
              width: 100
            },
            {
              title: '未采集',
              dataIndex: 'healthWeiCaiJi',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '寄宿情况',
          children: [
            {
              title: '寄宿生',
              dataIndex: 'jisuYesCount',
              align: 'center',
              width: 100
            },
            {
              title: '非寄宿生',
              dataIndex: 'jisuNoCount',
              align: 'center',
              width: 120
            },
            {
              title: '未采集',
              dataIndex: 'jisuOtherCount',
              align: 'center',
              width: 120
            }
          ]
        },
        {
          title: '委托照料原因情况',
          children: [
            {
              title: '父母双方同时外出',
              dataIndex: 'parentsAllGoOutCount',
              align: 'center',
              width: 150
            },
            {
              title: '父母一方外出，另一方无监护能力',
              dataIndex: 'parentsOneOut',
              align: 'center',
              width: 170
            },
            {
              title: '父母双方无监护能力',
              dataIndex: 'parentsAllNoAbility',
              align: 'center',
              width: 150
            },
            {
              title: '未采集',
              dataIndex: 'parentsStationWeiCaiJi',
              align: 'center',
              width: 150
            }
          ]
        },
        {
          title: '实际监护情况',
          children: [
            {
              title: '祖父母、外祖父母',
              dataIndex: 'shijijianhuGrandParentCount',
              align: 'center',
              width: 150
            },
            {
              title: '亲戚朋友',
              dataIndex: 'shijijianhuQinqiCount',
              align: 'center',
              width: 120
            },
            {
              title: '无委托照料人',
              dataIndex: 'shijijianhuWurenCount',
              align: 'center',
              width: 130
            }
          ]
        },
        {
          title: '监护情况',
          children: [
            {
              title: '较好',
              dataIndex: 'guardianshipGood',
              align: 'center',
              width: 120
            },
            {
              title: '一般',
              dataIndex: 'guardianshipYiBan',
              align: 'center',
              width: 120
            },
            {
              title: '差',
              dataIndex: 'guardianshipBad',
              align: 'center',
              width: 100
            },
            {
              title: '未采集',
              dataIndex: 'guardianshipOtherCount',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '救助措施',
          children: [
            {
              title: '建档立卡贫困户',
              dataIndex: 'helpStationJdlkCount',
              align: 'center',
              width: 150
            },
            {
              title: '最低生活保障',
              dataIndex: 'helpStationDbCount',
              align: 'center',
              width: 150
            },
            {
              title: '特困供养',
              dataIndex: 'helpStationTkCount',
              align: 'center',
              width: 120
            },
            {
              title: '临时救助',
              dataIndex: 'helpStationLinHelpCount',
              align: 'center',
              width: 120
            },
            {
              title: '医疗救助',
              dataIndex: 'helpStationYiLiaoHelpCount',
              align: 'center',
              width: 120
            },
            {
              title: '住房救助',
              dataIndex: 'helpStationHouseHelpCount',
              align: 'center',
              width: 120
            },
            {
              title: '残疾人生活补助',
              dataIndex: 'helpStationKunnanCount',
              align: 'center',
              width: 150
            },
            {
              title: '残疾人护理补助',
              dataIndex: 'helpStationZhongduCount',
              align: 'center',
              width: 150
            },
            {
              title: '孤儿津贴',
              dataIndex: 'helpStationGuerjintieCount',
              align: 'center',
              width: 100
            },
            {
              title: '其他',
              dataIndex: 'helpStationQitaCount',
              align: 'center',
              width: 100
            },
            {
              title: '无',
              dataIndex: 'helpStationWuCount',
              align: 'center'
            }
          ]
        }
      ],
      areaId: '',
      oAreaId: '',
      showOn: false
    }
  },
  activated () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.oAreaId = window.parent.indexTool.getUserInfo().areaId
    this.yeartext = moment().subtract(1, 'days').format('YYYY-MM-DD')
    this.addressmodel = [this.areaId]
    this.searchslist('000')
  },
  methods: {
    calculate (b) {
      if (parseInt(b.zongshu) == 0) {
        return '100%'
      } else if (b.areaName === '合计') {
        return '100%'
      } else {
        return (Math.round(parseFloat(b.sumcount) / parseFloat(b.zongshu) * 10000) / 100.00 + '%')
      }
    },
    setaddr () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.addressmodel = [this.areaId]
      this.searchslist('000')
    },
    // 查询参数处理
    queryParams (value) {
      const searchValue = this.searchForm.getFieldsValue()
      const areaId = ''
      if (!value) { // 下钻的返回
        searchValue.address_Linkage.splice(-1, 1)
      }
      if (searchValue.address_Linkage && searchValue.address_Linkage.length > 0) {
        searchValue.areaId = searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        delete searchValue.address_Linkage
        this.areaId = searchValue.areaId
      } else {
        searchValue.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = searchValue.areaId
      }
      if (value && value.areaId) {
        searchValue.areaId = value.areaId
        this.areaId = value.areaId
      }
      return searchValue
    },
    searchslist (value, type) {
      const searchValue = this.queryParams(value)
      if (type == 'click') {
        // 点击下转
        this.dealArea(value.idPath)
      }
      this.post('/leftBehindChildren/queryLeftBehindChildrenStatisticsCount', searchValue).then((res) => {
        this.tableData = res.data.data
      })
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
    },
    Excel () {
      this.exportFile('/leftOverChild/exportLeftOverChildStatistics', this.queryParams(1))
      this.showOn = false
    }
  }
}
</script>
<style lang="less">
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
</style>
