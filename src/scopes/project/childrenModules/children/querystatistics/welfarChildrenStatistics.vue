<template>
  <div class="searchdata"
       id='tmd'>
    <!-- 福利机构养育儿童情况统计表 -->
    <ta-border-layout :layout="{header:'0px'}">
      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery msg="区域"
                     class="spilwid"
                     :ishide="true"
                     :addressmodel='addressmodel'
                     @setaddress='setaddr'
                     @adsvalchange='adsvalchange'
                     style="width:250px"
                     :labelCol="{span:7}"
                     :wrapperCol="{span:13}"
                     types="1"></AreaQuery>

          <ta-form-item label="机构级别"
                        hidden
                        fieldDecoratorId="level">
            <ta-input></ta-input>
          </ta-form-item>
          <ta-form-item label="人员状态"
                        fieldDecoratorId="delstate"
                        style="width:257px"
                        :fieldDecoratorOptions="{initialValue:['1']}"
                        :labelCol="{ span: 8 }"
                        :wrapperCol="{span:16}">
            <ta-checkbox-group :options="plainOptions2" />

          </ta-form-item>
          <ta-form-item label="儿童类型"
                        fieldDecoratorId="type"
                        style="width:749px"
                        :fieldDecoratorOptions="{initialValue:['1']}"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}">
            <ta-checkbox-group :options="plainOptions" />

          </ta-form-item>
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
      <div style="text-align:center;font-size:22px;margin-bottom:10px;font-weight: 600;">福利机构养育儿童情况统计表</div>
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
                   v-if="isgoback"
                   @click="goback()">返回</ta-button>
      </div>
      <ta-table class="tables table-min-width  hight "
                :showOverflowTooltip="true"
                :columns.sync="tableColumns"
                bordered
                ref="teble"
                :dataSource="tableData"
                :scroll="{ x: 3000, y: 390}">
        <!-- <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span> -->
        <template slot="areaName"
                  slot-scope="a, b, c">
          <span v-if="b.areaLevel==4 || b.areaName=='合计'">{{a}}</span>
          <a @click="searchslist(b,'click')"
             v-else>{{a}}</a>
        </template>
      </ta-table>
      <!-- <div style="margin-top:10px;font-size:12px">
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
      </div> -->
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
        // {
        //   title: '序号',
        //   dataIndex: 'num',
        //   align: 'center',
        //   width: '80px',
        //   scopedSlots: { customRender: 'num' }
        // },
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          fixed: 'left',
          width: 300,
          customRender: (text, record, index) => {
            return this.marge(text, record, index, '1', true, 'areaname')
          }
        },
        {
          title: '福利机构名称',
          hidden: true,
          dataIndex: 'noProtectOrgName',
          width: 300,
          align: 'center',
          fixed: 'left',
          customRender: (text, record, index) => {
            return this.marge(text, record, index, '1', true, 'areaname')
          }
        },

        {
          title: '儿童总量',
          dataIndex: 'childSum',
          align: 'center',
          fixed: 'left',
          width: 150
        },
        {
          title: '年龄段情况',
          children: [
            {
              title: '0-3周岁',
              dataIndex: 'zeroThree',
              width: 150,
              align: 'center'
            },
            {
              title: '4-6周岁',
              dataIndex: 'fourSix',
              width: 150,
              align: 'center'
            },
            {
              title: '7-13周岁',
              dataIndex: 'sevenThirteen',
              width: 150,
              align: 'center'
            },
            {
              title: '14-17周岁',
              dataIndex: 'fourteenEighteen',
              width: 150,
              align: 'center'
            },
            {
              title: '18周岁及以上',
              dataIndex: 'eighteenOver',
              width: 150,
              align: 'center'
            }
            // {
            //   title: '未采集',
            //   dataIndex: 'ageWeiCaiJi',
            //   align: 'center',
            //   width: 100
            // }
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
              dataIndex: 'healthOtherCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未说明情况',
              dataIndex: 'weishuomingCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'weicaijiCount',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '教育情况',
          children: [
            {
              title: '学龄前',
              dataIndex: 'beforeSchoolCount',
              width: 100,
              align: 'center'
            },
            {
              title: '幼儿园',
              dataIndex: 'kindergartenSchoolCount',
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
              title: '大中专及以上',
              dataIndex: 'technicalSchoolCount',
              width: 130,
              align: 'center'
            },

            {
              title: '其他',
              dataIndex: 'educationOtherSchoolCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'weicaijiSchoolCount',
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
              dataIndex: 'nongcunRegisterCount',
              width: 100,
              align: 'center'
            },
            {
              title: '城镇居民户口',
              dataIndex: 'chengzhenRegisterCount',
              width: 100,
              align: 'center'
            },
            {
              title: '其他',
              dataIndex: 'otherRegisterCount',
              width: 100,
              align: 'center'
            },
            {
              title: '未采集',
              dataIndex: 'weicaijiRegisterCount',
              align: 'center',
              width: 100
            }
          ]
        }
      ],
      plainOptions: [
        {
          label: '福利机构养育孤弃儿童',
          value: '1'
        },
        {
          label: '福利机构代养困境儿童',
          value: '2'
        },
        {
          label: '集中供养事实无人抚养儿童',
          value: '3'
        }
      ],
      plainOptions2: [
        {
          label: '登记在册',
          value: '1'
        },
        {
          label: '减员',
          value: '0'
        }
      ],
      areaId: '',
      oAreaId: '',
      showOn: false,
      addressmodel: [],
      nowType: '1',
      isgoback: false,
      flagName: false

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
    adsvalchange (val, areaLevel) {
      this.searchForm.setFieldsValue({
        level: areaLevel.length > 1 ? areaLevel[1].areaLevel : ''
      })
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
      this.nowType = '1'
      this.flagName = false
      this.isgoback = false
      this.searchslist('000')
    },
    goback () {
      this.addressmodel.splice(-1, 1)
      if (this.addressmodel.length == 0 || (this.addressmodel.length == 1 && this.addressmodel[0] == window.parent.indexTool.getUserInfo().areaId)) {
        this.isgoback = false
      }
      if (this.addressmodel.length == 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
        this.resetFrom()
      }
      const idti = this.addressmodel[this.addressmodel.length - 1]
      this.searchslist(idti, 'back')
    },
    // 查询参数处理
    queryParams (value) {
      const searchValue = this.searchForm.getFieldsValue()
      if (searchValue.delstate) {
        searchValue.delstate = searchValue.delstate == [] ? undefined : searchValue.delstate
        searchValue.delstate = searchValue.delstate.length > 1 ? undefined : searchValue.delstate[0]
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
      if (searchValue.type) {
        searchValue.type = searchValue.type.join(',')
      }
      this.changetime(searchValue)
      return searchValue
    },
    searchslist (value, type) {
      const searchValue = this.queryParams(value)
      if (type == 'back') {
        searchValue.areaId = value
      }
      // searchValue && searchValue.areaId && searchValue.areaId.indexOf('00') == 6
      if (searchValue && searchValue.level == 3) {
        searchValue.levelType = 2
        this.nowType = 2
      } else {
        this.nowType = 1
        searchValue.levelType = 1
        if (searchValue.areaId == this.areaId) {
          this.isgoback = false
        }
      }
      if (this.flagName) {
        this.isgoback = false
      }
      if (type == 'click') {
        this.isgoback = true
        // 点击下转
        this.dealArea(value.idpath)

        this.searchForm.setFieldsValue({
          level: value.areaLevel
        })
        if (value.areaLevel == 3 || value.areaName.indexOf('本级') > -1) {
          if (value.areaName.indexOf('本级') > -1) {
            this.flagName = true
          } else {
            this.flagName = false
          }
          this.nowType = 2
          searchValue.levelType = this.nowType
        } else {
          this.nowType = 1
        }
      }

      this.post('welfareOrgStatisticsApi/queryWelfareOrgBringChildConditionStatistics', searchValue).then((res) => {
        this.tableData = res.data.data
        if (this.tableData && this.tableData.length > 0) {
          this.tableData.forEach((e) => {
            e.noProtectOrgName = e.areaName
          })
          if (!this.tableData[0].isIn || this.tableData[0].isIn == 0) {
            this.$refs.teble.showColumns('noProtectOrgName')
            this.$refs.teble.hideColumns('areaName')
          } else {
            this.$refs.teble.showColumns('areaName')
            this.$refs.teble.hideColumns('noProtectOrgName')
          }
        }
      })
    },
    marge (text, record, index, val, ismerge, name) {
      const obj = {
        children: text,
        attrs: {}
      }
      obj.attrs.rowSpan = record.mergeNum

      if (name == 'areaname') {
        if (index !== this.tableData.length - 1) {
          if (record.isIn != '1') {
            obj.children = (<div>
              <span>{text}</span>
            </div>)
          } else {
            obj.children = (<div>
              <a onClick={() => this.searchslist(record, 'click')}>{text}</a>
            </div>)
          }
        }
      }
      if (val) {
        if (index === this.tableData.length - 1) {
          obj.attrs.colSpan = parseFloat(val)
          if (val !== 0) {
            obj.children = '合计'
          }
        }
      }
      return obj
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        if (window.parent.indexTool.getUserInfo().areaLevel == 2) {
          areaIdPathS.shift()
        }
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
      this.setaddr()
    },

    Excel () {
      const params = this.queryParams()
      params.levelType = 1
      if (this.nowType == 2 || (params && params.level == 3)) {
        params.levelType = 2
      }
      this.exportFile('/welfareOrgStatisticsApi/exportWelfareOrgBringChildConditionStatistics', params)
      this.showOn = false
    }

  }
}
</script>
<style scoped lang="less">
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
