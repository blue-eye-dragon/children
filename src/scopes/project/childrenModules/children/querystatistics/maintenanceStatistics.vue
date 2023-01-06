<template>
  <div class="searchdata">
    <!-- 维护情况之统计报表 -->
    <ta-border-layout :layout="{header:'0px'}">
      <div class="searchcont"
           ref="oneout">
        <ta-form layout="inline"
                 ref="one"
                 class="searchfroms"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery msg="区域"
                     class="spilwid"
                     :ishide="true"
                     :addressmodel='addressmodel'
                     @setaddress='setaddr'
                     :labelCol="{span:7}"
                     :wrapperCol="{span:17}"
                     types="2"></AreaQuery>
          <ta-form-item label="统计日期"
                        fieldDecoratorId="statisticsTime"
                        class="spilwid2"
                        :labelCol="{span:5}"
                        :wrapperCol="{span:17}">
            <ta-range-picker :allowClear="false" />
          </ta-form-item>
          <ta-col>
            <ta-form-item label="儿童类型"
                          fieldDecoratorId="childTypeList"
                          style="width:100%"
                          :fieldDecoratorOptions="{initialValue:['01','02','04','05','06']}"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}">
              <ta-checkbox-group :options="plainOptions" />
            </ta-form-item>
          </ta-col>
          <!-- <ta-form-item>
            <div class="searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchslist('000')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>
          </ta-form-item> -->
        </ta-form>
        <div class="searchbtn">
          <div class="searchButton">
            <ta-button class="search "
                       icon="search"
                       @click="searchslist('000')">查询</ta-button>
            <ta-button class="btnleft reset"
                       icon="reload"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft"
                       style="    width: 109px;"
                       @click="advancedquery">
              高级查询
              <ta-icon :type="issearch?'up':'down'" />
            </ta-button>
          </div>

        </div>
      </div>
      <div style="text-align:center;font-size:22px;margin-bottom:10px;font-weight: 600;">维护情况统计
      </div>
      <!-- <div style="float: right;margin-right: 20px;font-size: 16px;margin-top: -40px;">统计时间：截止到{{yeartext}}</div> -->
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
      <div class="tableout"
           v-if="isShowByOrgid"
           id="tmd">
        <ta-table :columns="tableColumns"
                  :dataSource="tableData"
                  :showOverflowTooltip="true"
                  :scroll="isover? { y: 450}: {}"
                  bordered>
          <template slot="areaName"
                    slot-scope="a, b, c">
            <span v-if="b.areaLevel==4 || b.areaName=='合计'">{{a}}</span>
            <a @click="searchslist(b,'click')"
               v-else>{{a}}</a>
          </template>
        </ta-table>
        <table style="width:100%;border:1px solid #000000"
               v-if="ishow">
          <tr>
            <td style="width:458px"
                class="otherTable">合计</td>
            <td style="width:149px"
                class="otherTable">{{xiaoji}}</td>
            <td style="width:149px"
                class="otherTable">{{insertNum}}</td>
            <td style="width:149px"
                class="otherTable">{{updateNum}}</td>
            <td style="width:149px"
                class="otherTable">{{exitNum}}</td>
            <td style="width:152px"
                class="otherTable">{{currentNum}}</td>
          </tr>
        </table>
      </div>
      <div class="tableout"
           v-else
           id="tmd">
        <ta-table :columns="tableColumns1"
                  :dataSource="tableData"
                  :showOverflowTooltip="true"
                  :scroll="isover? { y: 450}: {}"
                  bordered>
          <template slot="areaName"
                    slot-scope="a, b, c">
            <span v-if="b.areaLevel==4 || b.areaName=='合计'">{{a}}</span>
            <a @click="searchslist(b,'click')"
               v-else>{{a}}</a>
          </template>
        </ta-table>
        <table style="width:100%;border:1px solid #000000"
               v-if="ishow">
          <tr>
            <td style="width:43.2%"
                class="otherTable">合计</td>
            <td style="width:14.1%"
                class="otherTable">{{xiaoji}}</td>
            <td style="width:14.1%"
                class="otherTable">{{insertNum}}</td>
            <td style="width:14.1%"
                class="otherTable">{{updateNum}}</td>
            <td style="width:14.5%"
                class="otherTable">{{exitNum}}</td>
          </tr>
        </table>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
function marge (text, record, index) {
  const obj = {
    children: text,
    attrs: {}
  }
  obj.attrs.rowSpan = record.mergeNum
  return obj
}
export default {
  components: {
    AreaQuery
  },
  data () {
    return {
      yeartext: '',
      isShowByOrgid: window.parent.indexTool.getUserInfo().areaLevel != '0',
      addressmodel: [],
      tableData: [],
      issearch: false,
      ishow: false,
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: 160,
          customRender: (text, record, index) => {
            return marge(text, record, index)
          }
        },
        {
          title: '合计',
          dataIndex: 'heJi',
          align: 'center',
          width: 150,
          customRender: (text, record, index) => {
            return marge(text, record, index)
          }
        },
        {
          title: '对象类型',
          dataIndex: 'objectType',
          align: 'center',
          width: 150
        },
        {
          title: '变更操作',
          children: [
            {
              title: '小计',
              dataIndex: 'xiaoji',
              align: 'center',
              width: 150
            },
            {
              title: '新增',
              dataIndex: 'insertNum',
              align: 'center',
              width: 150
            },
            {
              title: '修改',
              dataIndex: 'updateNum',
              align: 'center',
              width: 150
            },
            {
              title: '退出',
              dataIndex: 'exitNum',
              align: 'center',
              width: 150
            }
          ]
        },
        {
          title: '当前数量',
          dataIndex: 'currentNum',
          align: 'center',
          width: 150
        }
      ],
      tableColumns1: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: 160,
          customRender: (text, record, index) => {
            return marge(text, record, index)
          }
        },
        {
          title: '合计',
          dataIndex: 'heJi',
          align: 'center',
          width: 150,
          customRender: (text, record, index) => {
            return marge(text, record, index)
          }
        },
        {
          title: '对象类型',
          dataIndex: 'objectType',
          align: 'center',
          width: 150
        },
        {
          title: '变更操作',
          children: [
            {
              title: '小计',
              dataIndex: 'xiaoji',
              align: 'center',
              width: 150
            },
            {
              title: '新增',
              dataIndex: 'insertNum',
              align: 'center',
              width: 150
            },
            {
              title: '修改',
              dataIndex: 'updateNum',
              align: 'center',
              width: 150
            },
            {
              title: '退出',
              dataIndex: 'exitNum',
              align: 'center',
              width: 150
            }
          ]
        }
      ],
      xiaoji: '',
      insertNum: '',
      updateNum: '',
      exitNum: '',
      currentNum: '',
      plainOptions: [], // checkboxgroup数据
      areaId: '',
      oAreaId: '',
      showOn: false,
      tableLength: 12,
      isover: true
    }
  },
  mounted () {
    this.getchildtype()
    console.log(this.isShowByOrgid)
  },
  activated () {
    this.tableData = []
    this.tableLength = 12
    this.isover = true
    this.ishow = false
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.oAreaId = window.parent.indexTool.getUserInfo().areaId
    this.searchForm.setFieldsValue({ statisticsTime: [moment().subtract(3, 'months'), moment()] })
    const nowDate = new Date()
    const nowyear = nowDate.getFullYear()
    const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
    const nowdate = nowDate.getDate() - 1 // 取昨天
    this.yeartext = nowyear + '-' + nowmonth + '-' + nowdate
    this.addressmodel = [this.areaId]
    this.searchslist('000')
  },
  methods: {
    async getchildtype () {
      this.plainOptions = await this.getDictionaries('MAINTAINSTATISTICAL')
    },
    marge (text, record, index) {
      const obj = {
        children: text,
        attrs: {}
      }
      obj.attrs.rowSpan = obj.mergeNum
      return obj
    },
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
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 30 + 'px'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.tableLength = 12
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.searchForm.setFieldsValue({ statisticsTime: [moment().subtract(3, 'months'), moment()] })
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
      this.changetime(searchValue)
      if (searchValue.statisticsTime) {
        searchValue.statisticsTimeStart = searchValue.statisticsTime[0].format('YYYY-MM-DD')
        searchValue.statisticsTimeEnd = searchValue.statisticsTime[1].format('YYYY-MM-DD')
        delete searchValue.statisticsTime
      }
      if (searchValue.childTypeList) {
        if (searchValue.childTypeList && searchValue.childTypeList.length != 0) {
          this.tableLength = searchValue.childTypeList.length
        } else {
          this.tableLength = 12
        }
        searchValue.childTypeList = searchValue.childTypeList.join(',')
      }
      return searchValue
    },
    searchslist (value, type) {
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch)
      const searchValue = this.queryParams(value)
      if (type == 'click') {
        // 点击下转
        this.dealArea(value.idPath)
      }
      this.post('maintenanceStatisticsApi/maintenanceStatisticsList', searchValue).then((res) => {
        const list = res.data.data
        this.tableData = []
        list.forEach((item, index) => {
          if (index == list.length - 1) {
            this.xiaoji = item.xiaoji
            this.insertNum = item.insertNum
            this.updateNum = item.updateNum
            this.exitNum = item.exitNum
            this.currentNum = item.currentNum
          } else {
            item.maintenanceStatisticsTempList.forEach((item1, index1) => {
              item1.areaName = item.areaName
              item1.heJi = item.heJi
              if (index1 == '0') {
                item1.mergeNum = this.tableLength
              } else {
                item1.mergeNum = 0
              }
              this.tableData.push(item1)
            })
          }
        })
        this.$nextTick(() => {
          this.ishow = true
          if (this.tableData.length > 13) {
            this.isover = true
          } else {
            this.isover = false
          }
        })
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
      this.exportFile('/overseeBusiness/exportMaintenanceStatistics', this.queryParams('000'))
      this.showOn = false
    }
  }
}
</script>
<style scoped>
.tableout {
  width: 100%;
  height: 700px;
  overflow-x: auto;
  padding-bottom: 20px;
}
#tmd /deep/.ant-table-body-outer {
  margin-bottom: -6px;
  padding-bottom: 0px;
}
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.cbox {
  display: block;
  margin-bottom: 12px;
  margin-left: 30px;
  width: 124%;
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 6px;
}
.searchfroms {
  width: calc(100% - 330px);
}
.otherTable {
  height: 50px;
  border-right: 1px solid #000000;
  text-align: center;
  font-size: 16px;
}
</style>
