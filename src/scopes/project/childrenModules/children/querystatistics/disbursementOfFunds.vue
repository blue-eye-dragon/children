<template>
  <div class="conts">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'80px' ,footer:'80px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item class="spilwid"
                        label="统计年月"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        style="width:350px">
            <ta-range-picker :allowClear='false'
                             :placeholder="['开始年月', '结束年月']"
                             format="YYYY-MM"
                             :value="value"
                             :mode="mode"
                             @panelChange="datechange" />
          </ta-form-item>
          <AreaQuery v-if="ishide"
                     class="spilwid"
                     :ishide.sync="ishide"
                     msg="区域"
                     :addressmodel="addressmodel"
                     @adsvalchange="adsvalchange"
                     @setaddress="setaddress"></AreaQuery>
          <ta-form-item>
            <div class="searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchslist">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
      </div>
      <div>
        <div style="text-align:right;margin-bottom: 10px">
          <ta-button @click="exportFileList"
                     slot="tabBarExtraContent"
                     icon='upload'
                     class="exportbtn">导出</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
        </ta-table>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
var that = null
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      value: [],
      mode: ['month', 'month'],
      nowcode: '',
      ishide: true,
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: 170
        },
        {
          title: '总金额(元)',
          width: 70,
          align: 'center',
          dataIndex: 'totalNumber'
        },
        {
          title: '孤儿基本生活费(元)',
          width: 170,
          align: 'center',
          dataIndex: 'totalNumber1'
        },
        {
          title: '事实无人抚养儿童福利补贴(元)',
          width: 170,
          align: 'center',
          dataIndex: 'totalNumber2'
        },
        {
          title: '孤儿助学金(元)',
          width: 170,
          align: 'center',
          dataIndex: 'totalNumber3'
        },
        {
          title: '明天计划资金(元)',
          width: 170,
          align: 'center',
          dataIndex: 'totalNumber4'
        }
      ],
      mixListOptions: {
        mixGetDataListURL: '/factNoOneRaisedWholeApi/queryFactNoOneRaisedWholeReport',
        mixGetDataListIsPage: false // 数据列表接口，是否需要分页？
      },
      tableData: [],
      orgId: '',
      areaCode: '',
      areaLevel: '',
      areaId: '',
      params: {},
      addressmodel: [],
      isbu: false
    }
  },
  created () {
    that = this
  },
  activated () {
    this.sum = 0
    this.getArea()
  },
  mounted () {
    this.orgId = window.parent.indexTool.getUserInfo().orgId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    // 当前时间
    /* let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    this.params.statisticTimeStart = ``
    this.params.statisticTimeEnd = `${year}-${month}-${day}` */
  },
  methods: {
    getArea () {
      // 区域
      if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
        this.isbu = true
        this.nowcode = '110000000000'
        this.$nextTick(() => {
          this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '110000000000')
        })
      } else {
        this.isbu = false
        this.$nextTick(() => {
          this.nowcode = window.parent.indexTool.getUserInfo().areaCode
          this.addressmodel.push(this.nowcode)
        })
      }
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 导出
    exportFile (url, obj) {
      const paramsUrl = window.parent.indexTool.getUserInfo()
      url = `${window.faceConfig.exportUrl + url}?userId=${paramsUrl.userId}`
      if (paramsUrl.orgId) {
        url += `&orgId=${paramsUrl.orgId}`
      }
      for (var i in obj) {
        if (obj[i] != undefined) {
          url += `&${i}=${obj[i]}`
        }
      }
      window.location.href = url
    },
    exportFileList () {
      const data = {
        statisticTimeStart: this.params.statisticTimeStart,
        statisticTimeEnd: this.params.statisticTimeEnd,
        areaId: this.params.areaId
      }
      this.exportFile('/factNoOneRaisedWholeApi/export', data)
    },
    datechange (value, mode) {
      this.value = value
      this.mode = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.value = []
      this.mode = ['month', 'month']
      this.setaddress()
      setTimeout(() => {
        this.searchslist()
      }, 500)
    },
    searchslist () {
      this.sum = 0
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (this.value.length > 0) {
        this.params.statisticTimeStart = this.value[0].format('YYYY-MM')
        this.params.statisticTimeEnd = this.value[1].format('YYYY-MM')
      }
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        this.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        this.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      this.getlist()
    },
    async getlist () {
      let res = {}
      this.params.orgId = this.orgId
      this.params.areaCode = this.areaCode
      this.params.areaLevel = this.areaLevel
      this.params.areaId = this.areaId
      if (!this.params.areaCode) {
        this.params.areaCode = window.parent.indexTool.getUserInfo().areaCode
      }
      res = await this.post(this.mixListOptions.mixGetDataListURL, this.params)
      if (!res.errors) {
        this.tableData = res.data.data
      }
      if (res.data.data.length != 0) {
        this.sum = res.data.data[res.data.data.length - 1].totalNumber
      }
    },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1]
    }
  }
}
</script>
<style lang="less" scoped>
.conts {
  padding: 14px;
  height: 100%;
}
.echarts {
  width: 100%;
  display: flex;
}
.circular {
  width: calc((100% - 20px) / 2);
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
}
.ecs {
  width: 90% !important;
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
.peopleSum {
  font-size: 30px;
  font-weight: bold;
  margin-right: 30px;
}
.noData {
  position: relative;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.nameStyle {
  height: 35px;
  display: inline-block;
  line-height: 35px;
  margin-top: 20px;
}
.tableHeight td {
  padding: 4px 16px !important;
}
.visitbtnRight {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
/deep/ .ant-table-tbody > tr > td > div {
  width: unset !important;
}
/deep/.borderLayout .header {
  border-bottom: 14px solid #e4e4e4;
}
</style>
