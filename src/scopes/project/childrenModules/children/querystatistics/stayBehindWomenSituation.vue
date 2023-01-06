<template>
  <div class="searchdata"
       id='tmd'>
    <!-- 留守妇女综合查询之统计报表 -->
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
      <div style="text-align:center;font-size:22px;margin-bottom:10px;font-weight: 600;">农村留守妇女基本情况排查汇总表</div>
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
      <ta-table class="tables table-min-width  hight "
                :columns="tableColumns"
                bordered
                :dataSource="tableData"
                :scroll="{ x: 5900, y: 390}">
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
        1.年龄段情况：“其他”类型统计的是未符合留守妇女年龄段要求的统计到系统的数据。
        2.年龄段情况：“未采集”类型主要统计数据中没有选择年龄段情况的数据。
        3.文化程度情况：“其他”类型统计的是文化程度选择为“学龄前、幼儿园、未说明情况和特殊教育”类型的数据。
        4.文化程度情况：“未采集”类型主要统计数据中没有填写文化程度情况的数据。
        5.婚姻登记：“未采集”类型主要统计数据中没有填写婚姻登记情况的数据。
        6.健康状况：“未采集”类型主要统计数据中没有填写健康状况的数据。
        7.丈夫外出务工情况：“未采集”类型统计的是数据中没有填写丈夫外出务工情况的数据。
        8.公婆情况：“未采集”类型统计的是数据中没有填写公婆信息的数据。
        9.子女情况：“其他”类型统计的是子女情况为其他情况的数据。
        10.家庭主要经济来源：“未采集”类型统计的是数据中没有填写家庭主要经济来源的数据。
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
      tableData: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          fixed: 'left',
          width: 220,
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '数量',
          dataIndex: 'sumcount',
          align: 'center',
          fixed: 'left',
          width: 120,
          scopedSlots: { customRender: 'goStayBehindChildSearch' }
        },
        {
          title: '占总统计量情况（%）',
          dataIndex: 'now',
          align: 'center',
          fixed: 'left',
          width: 120,
          scopedSlots: { customRender: 'bfb' }
        },
        {
          title: '年龄段情况',
          children: [
            {
              title: '20-24周岁',
              dataIndex: 'ageTwentyToTwentyFive',
              width: 150,
              align: 'center'
            },
            {
              title: '25-34周岁',
              dataIndex: 'ageTwentyFiveToThreetyFive',
              width: 150,
              align: 'center'
            },
            {
              title: '35-44周岁',
              dataIndex: 'ageThreetyFiveToFourtyFive',
              width: 150,
              align: 'center'
            },
            {
              title: '45-60周岁',
              dataIndex: 'ageFourtyFiveToSixty',
              width: 150,
              align: 'center'
            },
            {
              title: '其他',
              dataIndex: 'ageOtherCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'ageWeiCaiJi',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '文化程度情况',
          children: [
            {
              title: '文盲',
              dataIndex: 'illiteracyCount',
              width: 100,
              align: 'center'
            },
            {
              title: '小学',
              dataIndex: 'primarySchoolCount',
              width: 100,
              align: 'center'
            },
            {
              title: '初中',
              dataIndex: 'juniorHighSchoolCount',
              width: 100,
              align: 'center'
            },
            {
              title: '高中',
              dataIndex: 'seniorHighSchoolCount',
              width: 100,
              align: 'center'
            },
            {
              title: '中专及以上',
              dataIndex: 'technicalSchoolCount',
              width: 130,
              align: 'center'
            },
            {
              title: '其他',
              dataIndex: 'educationOtherCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'educationWeiCaiJiCount',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '婚姻登记',
          children: [
            {
              title: '登记领证',
              dataIndex: 'dengJiLingZhengCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未登记领证',
              dataIndex: 'noDengJiLingZhengCount',
              width: 130,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'dengJiLingZhengOtherCount',
              width: 130,
              align: 'center'
            }
          ]
        },
        {
          title: '健康状况',
          children: [
            {
              title: '健康',
              dataIndex: 'healthCount',
              width: 100,
              align: 'center'
            },
            {
              title: '一般或较弱',
              dataIndex: 'yibanCount',
              width: 120,
              align: 'center'
            },
            {
              title: '重病',
              dataIndex: 'zhongbingCount',
              width: 100,
              align: 'center'
            },
            {
              title: '慢性病',
              dataIndex: 'manxingbingCount',
              width: 100,
              align: 'center'
            },
            {
              title: '残疾',
              dataIndex: 'canjiCount',
              width: 100,
              align: 'center'
            },
            {
              title: '其他',
              dataIndex: 'healthOthersCount',
              width: 100,
              align: 'center'
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
          title: '丈夫外出务工情况',
          children: [
            {
              title: '外出务工年限',
              children: [
                {
                  title: '务工十年以上',
                  dataIndex: 'workingTenYearUp',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '务工五年以上十年以内',
                  dataIndex: 'workingFiveToTenYear',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '务工三年以上五年以内 ',
                  dataIndex: 'workingThreeToFiveYear',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '务工一年以上三年以内',
                  dataIndex: 'workingOneToThreeYear',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '务工半年以上一年以内',
                  dataIndex: 'workingDianFiveToOneYear',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '未采集',
                  dataIndex: 'workingWeiCaiJi',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '外出未回年限',
              children: [
                {
                  title: '十年以上未回',
                  dataIndex: 'goHomeTenYearUp',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '五年以上十年以内未回',
                  dataIndex: 'goHomeFiveYearUp',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '两年以上五年以内未回',
                  dataIndex: 'goHomeThreeYearDown',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '一年以上两年以内未回',
                  dataIndex: 'goHomeTwoYearDown',
                  width: 150,
                  align: 'center'
                },
                {
                  title: '一年内未回',
                  dataIndex: 'goHomeOneYearDown',
                  width: 100,
                  align: 'center'
                }
              ]
            }
          ]
        },
        {
          title: '家庭状况',
          children: [
            {
              title: '公婆情况',
              children: [
                {
                  title: '双方健在',
                  dataIndex: 'shuangFangJianZaiCount',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '一方健在',
                  dataIndex: 'yiFangJianZaiCount',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '双方去世',
                  dataIndex: 'shuangFangDieCount',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '未采集',
                  dataIndex: 'gongpoStationOtherCount',
                  width: 100,
                  align: 'center'
                }
              ]
            },
            {
              title: '子女情况',
              children: [
                {
                  title: '无子女',
                  dataIndex: 'noChild',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '1个子女',
                  dataIndex: 'oneChild',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '2个子女',
                  dataIndex: 'twoChild',
                  width: 100,
                  align: 'center'
                },
                {
                  title: '3个及以上',
                  dataIndex: 'threeChildUp',
                  width: 120,
                  align: 'center'
                },
                {
                  title: '其他',
                  dataIndex: 'childNumOtherCount',
                  width: 120,
                  align: 'center'
                }
              ]
            }
          ]
        },
        {
          title: '家庭主要经济来源',
          children: [
            {
              title: '打工',
              dataIndex: 'waichudagongCount',
              width: 100,
              align: 'center'
            },
            {
              title: '种养殖业',
              dataIndex: 'zhongzhiCount',
              width: 100,
              align: 'center'
            },
            {
              title: '亲朋接济',
              dataIndex: 'qinpengjiejiCount',
              width: 100,
              align: 'center'
            },
            {
              title: '政府救助',
              dataIndex: 'zhengfujiujiCount',
              width: 100,
              align: 'center'
            },
            {
              title: '其他',
              dataIndex: 'moneyFromOther',
              width: 100,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'moneyWeiCaiJi',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '获得生产生活帮扶情况',
          children: [
            {
              title: '社会救助',
              dataIndex: 'getShehuiHelpCount',
              width: 100,
              align: 'center'
            },
            {
              title: '小额担保贷款',
              dataIndex: 'getdaikuaiCount',
              width: 100,
              align: 'center'
            },
            {
              title: '加入生产互助',
              dataIndex: 'shengchanhuzhuzuCount',
              width: 100,
              align: 'center'
            },
            {
              title: '技能培训',
              dataIndex: 'getJinengPeixunCount',
              width: 100,
              align: 'center'
            },
            {
              title: '其他帮扶',
              dataIndex: 'helpOtherCount',
              width: 100,
              align: 'center'
            },
            {
              title: '无',
              dataIndex: 'helpNoCount',
              align: 'center'
            }
          ]
        }
      ],
      areaId: '',
      oAreaId: '',
      showOn: false,
      addressmodel: []

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
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
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
      this.post('/leftBehindWomenStatistics/queryLeftBehindWomanStatisticsCount', searchValue).then((res) => {
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
    async getlist (params, value) {
      let res = {}
      res = await this.post('/leftBehindWomenStatistics/queryLeftBehindWomanStatisticsCount', params)
      this.tableData = res.data.data
    },
    Excel () {
      this.exportFile('/leftOverWoman/exportLeftOverWomanStatistics', this.queryParams(1))
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
