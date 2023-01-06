<!--
 * @Date: 2021-06-30 10:31:58
 * @information: 跨省通办数量统计
-->
<template>
  <div id="across-pro-number-statistics"
       class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="申请日期"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          class="spilwid2"
                          fieldDecoratorId="applyDate">
              <ta-range-picker />
            </ta-form-item>

            <ta-form-item label="儿童类型"
                          :labelCol="{span:5}"
                          :wrapperCol="{span:19}"
                          class="form-item-chil-type"
                          fieldDecoratorId="childType">
              <ta-radio-group :options="childTypeOption"
                              :defaultValue="3" />
            </ta-form-item>

            <ta-form-item class="form-item-btn">
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="onSearch">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div style="text-align:center;font-size:22px;margin-bottom:10px;font-weight: 600;">跨省通办数量统计</div>
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
          <ta-button v-show="runInAreaIdArr.length>1"
                     icon="rollback"
                     @click="onBack">返回</ta-button>
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
        </div>
        <div class="tableout"
             id="tmd3">
          <ta-table bordered
                    class="tables table-min-width"
                    :scroll="{ x: 3300,y: '100%' }"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="tableData">

            <span slot="anotherPlaceName"
                  :class="{'place_canIn': obj.isIn== '1'}"
                  @click="obj.isIn== '1' && onPlaceClick(val, obj)"
                  slot-scope="val, obj">
              <span>{{ val }}</span>
            </span>

          </ta-table>
        </div>

      </div>
      <!-- <div slot="footer"></div> -->
    </ta-border-layout>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    const tableColumns = [
      {
        width: 150,
        dataIndex: 'anotherPlaceName',
        align: 'center',
        fixed: 'left',
        scopedSlots: { customRender: 'anotherPlaceName' },
        // 在列定义中添加customHeaderCell表头单元格属性
        customHeaderCell: () => { return { class: 'myHeaderCellAge' } }
      },
      {
        title: '合计',
        width: 80,
        dataIndex: 'heji',
        align: 'center',
        fixed: 'left'
      },
      {
        title: '北京市',
        width: 90,
        dataIndex: 'beijing',
        align: 'center'
      },
      {
        title: '天津市',
        width: 90,
        dataIndex: 'tianjing',
        align: 'center'
      },
      {
        title: '河北省',
        width: 90,
        dataIndex: 'hebei',
        align: 'center'
      },
      {
        title: '山西省',
        width: 90,
        dataIndex: 'shanxisheng',
        align: 'center'
      },
      {
        title: '内蒙古自治区',
        width: 140,
        dataIndex: 'neimenggu',
        align: 'center'
      },
      {
        title: '辽宁省',
        width: 90,
        dataIndex: 'liaoning',
        align: 'center'
      },
      {
        title: '吉林省',
        width: 90,
        dataIndex: 'jilin',
        align: 'center'
      },
      {
        title: '黑龙江省',
        width: 110,
        dataIndex: 'heilongjiang',
        align: 'center'
      },
      {
        title: '上海市',
        width: 90,
        dataIndex: 'shanghai',
        align: 'center'
      },
      {
        title: '江苏省',
        width: 90,
        dataIndex: 'jiangsu',
        align: 'center'
      },
      {
        title: '浙江省',
        width: 90,
        dataIndex: 'zhejiang',
        align: 'center'
      },
      {
        title: '安徽省',
        width: 90,
        dataIndex: 'anhui',
        align: 'center'
      },
      {
        title: '福建省',
        width: 90,
        dataIndex: 'fujian',
        align: 'center'
      },
      {
        title: '江西省',
        width: 90,
        dataIndex: 'jiangxi',
        align: 'center'
      },
      {
        title: '山东省',
        width: 90,
        dataIndex: 'shandong',
        align: 'center'
      },
      {
        title: '河南省',
        width: 90,
        dataIndex: 'henan',
        align: 'center'
      },
      {
        title: '湖北省',
        width: 90,
        dataIndex: 'hubei',
        align: 'center'
      },
      {
        title: '湖南省',
        width: 90,
        dataIndex: 'hunan',
        align: 'center'
      },
      {
        title: '广东省',
        width: 90,
        dataIndex: 'guangdong',
        align: 'center'
      },
      {
        title: '广西壮族自治区',
        width: 180,
        dataIndex: 'guangxi',
        align: 'center'
      },
      {
        title: '海南省',
        width: 90,
        dataIndex: 'hainan',
        align: 'center'
      },
      {
        title: '重庆市',
        width: 90,
        dataIndex: 'chongqing',
        align: 'center'
      },
      {
        title: '四川省',
        width: 90,
        dataIndex: 'sichuan',
        align: 'center'
      },
      {
        title: '贵州省',
        width: 90,
        dataIndex: 'guizhou',
        align: 'center'
      },
      {
        title: '云南省',
        width: 90,
        dataIndex: 'yunnan',
        align: 'center'
      },
      {
        title: '西藏自治区',
        width: 140,
        dataIndex: 'xizang',
        align: 'center'
      },
      {
        title: '陕西省',
        width: 90,
        dataIndex: 'shanxi',
        align: 'center'
      },
      {
        title: '甘肃省',
        width: 90,
        dataIndex: 'gansu',
        align: 'center'
      },
      {
        title: '青海省',
        width: 90,
        dataIndex: 'qinghai',
        align: 'center'
      },
      {
        title: '宁夏回族自治区',
        width: 180,
        dataIndex: 'ningxia',
        align: 'center'
      },
      {
        title: '新疆维吾尔自治区',
        width: 180,
        dataIndex: 'xinjiang',
        align: 'center'
      },
      {
        title: '新疆兵团',
        width: 120,
        dataIndex: 'bingtuan',
        align: 'center'
      },
      {
        title: '台湾省',
        width: 90,
        dataIndex: 'taiwan',
        align: 'center'
      },
      {
        title: '香港特别行政区',
        width: 180,
        dataIndex: 'xianggang',
        align: 'center'
      },
      {
        title: '澳门特别行政区',
        width: 180,
        dataIndex: 'aomen',
        align: 'center'
      }
    ]

    return {
      tableColumns,
      tableData: [],
      // 儿童类别
      childTypeOption: [
        { label: '社会散居孤儿', value: 1 },
        { label: '事实无人抚养儿童', value: 2 },
        { label: '全部', value: 3 }
      ],
      showOn: false, // 导出弹窗
      inNowAreaLevel: 1, // 当前所在的下钻页面的区域等级（1 省级，2 市级，3 区县，4 乡镇，5 乡镇下一级）
      runInAreaIdArr: [], // 下钻时暂存的区域id列表
      userInfo: window.parent.indexTool.getUserInfo() // 当前登录用户信息

    }
  },
  created () {

  },
  mounted () {

  },
  async activated () {
    this.initData()
    await this.fetchData()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 11:30:18
     * @information: 初始化数据
     */
    initData () {
      this.searchForm.setFieldsValue({
        applyDate: [moment().subtract(1, 'months'), moment()],
        childType: 3
      })
      // 赋值当前区域
      const { areaLevel, areaId } = this.userInfo
      this.inNowAreaLevel = Number(areaLevel)
      this.runInAreaIdArr = [areaId]
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 15:21:29
     * @information: 加载数据
     */
    async fetchData (areaId) {
      const { applyDate, childType } = this.searchForm.getFieldsValue()
      // 接口入参
      const model = { areaId, childType }
      if (applyDate && applyDate.length) {
        model.applyStartTime = applyDate[0].format('YYYY-MM-DD')
        model.applyEndTime = applyDate[1].format('YYYY-MM-DD')
      }
      const { data } = await this.post('AnotherPlaceNumStatisticsApi/queryAnotherPlaceNumStatistics', model)
      data && data.data && (this.tableData = data.data)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 15:30:53
     * @information: 区域被点击
     */
    async onPlaceClick (val, obj) {
      const { areaId } = obj
      this.runInAreaIdArr.push(areaId)
      this.inNowAreaLevel++
      await this.fetchData(areaId)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 14:16:32
     * @information: 返回
     */
    async onBack () {
      if (!this.runInAreaIdArr.length) return
      this.inNowAreaLevel--
      await this.fetchData(this.runInAreaIdArr[this.runInAreaIdArr.length - 2] || undefined)
      this.runInAreaIdArr.pop()
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 14:16:59
     * @information: 导出excel
     */
    Excel () {
      const { applyDate, childType } = this.searchForm.getFieldsValue()
      // 接口入参
      const model = { areaId, childType }
      if (applyDate && applyDate.length) {
        model.applyStartTime = applyDate[0].format('YYYY-MM-DD')
        model.applyEndTime = applyDate[1].format('YYYY-MM-DD')
      }
      const areaId = this.runInAreaIdArr[this.runInAreaIdArr.length - 1] || this.userInfo.areaId
      model.areaId = areaId
      this.exportFile('/AnotherPlaceNumStatisticsApiExport/queryAnotherPlaceNumStatisticsExport', model)
      this.showOn = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 17:01:18
     * @information: 查询
     */
    async onSearch () {
      const areaId = this.runInAreaIdArr[this.runInAreaIdArr.length - 1] || undefined
      await this.fetchData(areaId)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-30 11:17:45
     * @information: 重置
     */
    async resetFrom () {
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({
        applyDate: [moment().subtract(1, 'months'), moment()],
        childType: 3
      })
      const areaId = this.runInAreaIdArr[this.runInAreaIdArr.length - 1] || undefined
      await this.fetchData(areaId)
    }

  }
}
</script>

<style lang="less">
#across-pro-number-statistics {
  .myHeaderCellAge:before {
    content: "受理地";
    text-align: center;
    position: absolute;
    top: 12px;
    left: 10px;
  }

  .myHeaderCellAge:after {
    content: "户籍地";
    text-align: center;
    position: absolute;
    top: 0;
    left: 88px;
  }
  .myHeaderCellAge span {
    position: absolute;
    top: 0;
    left: 0;
    width: 152px;
    height: 1px;
    background-color: #98a3b9;
    display: block;
    text-align: center;
    transform: rotate(13deg);
    transform-origin: top left;
    -ms-transform: rotate(13deg);
    -ms-transform-origin: top left;
    -webkit-transform: rotate(13deg);
    -webkit-transform-origin: top left;
  }

  .form-item-btn {
    float: right;
  }

  .form-item-chil-type {
    width: 500px;
  }

  .place_canIn {
    color: #1b65b9;
    cursor: pointer;
  }

  .tableout {
    width: 100%;
    height: 550px;
    overflow-x: auto;
    padding-bottom: 43px;
    overflow-y: hidden;
  }
  #tmd3 /deep/ .ant-table-body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  #tmd3 /deep/ .ant-table-body-inner::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
}
</style>
