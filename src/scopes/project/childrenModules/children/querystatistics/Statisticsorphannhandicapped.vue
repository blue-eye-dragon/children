<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery v-if="isshow"
                           :ishide.sync="ishide"
                           class="spilwid3"
                           msg="区域"
                           :types="'2'"
                           :areaLevel1="areaLevel"
                           @setaddress="setaddress"
                           @adsvalchange="adsvalchange"
                           :addressmodel="addressmodel"
                           :fileldName="'address_Linkage'"></AreaQuery>
                <ta-form-item label="统计类型"
                              fieldDecoratorId="statisticsType"
                              :initValue="'1'"
                              class="spilwid"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-select>
                    <ta-select-option value="1">登记在册</ta-select-option>
                    <ta-select-option value="2">已减员</ta-select-option>
                    <ta-select-option value>全部</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="是否享受补贴"
                              style="width:250px"
                              :labelCol="{span:12}"
                              :wrapperCol="{span:12}"
                              fieldDecoratorId="isEnjoySubsidies">
                  <ta-select :placeholder="'请选择是否享受补贴'"
                             @change="changeIsEnjoySubsidies">
                    <ta-select-option value="">全部</ta-select-option>
                    <ta-select-option value="1">是</ta-select-option>
                    <ta-select-option value="0">否</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="享受年月"
                              fieldDecoratorId='startDate'
                              class="spilwid"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-month-picker :disabled="disabledType1"
                                   :allowClear="false"
                                   width='100%'
                                   format="YYYY-MM"
                                   :placeholder="'开始年月'" />
                </ta-form-item>
                <ta-form-item label="享受状态"
                              fieldDecoratorId="issueType"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{ span: 17 }"
                              class="spilwid">
                  <!-- <ta-select :placeholder=" '请选择享受状态'" :disabled="disabledType1" mode="multiple">
                       <ta-select-option value="1">超龄续发</ta-select-option>
                       <ta-select-option value="0">正常发放</ta-select-option>
                     </ta-select> -->
                  <ta-checkbox-group :placeholder=" '请选择享受状态'"
                                     :disabled="disabledType1">
                    <ta-checkbox value="0">正常发放</ta-checkbox>
                    <ta-checkbox value="1">超龄续发</ta-checkbox>
                  </ta-checkbox-group>
                </ta-form-item>
                <!-- <ta-form-item label="发放类型"
                          fieldDecoratorId="1"
                          :initValue="''"
                          class="spilwid"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-select defaultValue="1">
                <ta-select-option value="1">正常发放</ta-select-option>
                <ta-select-option value="2">续发</ta-select-option>
                <ta-select-option value>全部</ta-select-option>
              </ta-select>
            </ta-form-item> -->
                <!-- <ta-form-item class="spilwid"
                          label="单位名称"
                          fieldDecoratorId="orgName"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-auto-complete :dataSource="optiondata"
                                @search="handleSearch"
                                placeholder="请输入单位名称" />
            </ta-form-item> -->
                <!-- <ta-form-item class="spilwid2"
                          label="享受年月"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-range-picker :placeholder="['开始年月', '结束年月']"
                               format="YYYY-MM"
                               :value="value"
                               :mode="mode2"
                               @change="datechange"
                               @panelChange="handlePanelChange2" />
            </ta-form-item> -->
              </div>
              <div class="searchbtn searchButton">
                <div class="searchButton">
                  <ta-button class="search"
                             icon="search"
                             @click="searchs('000')">查询</ta-button>
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
            </div>
          </ta-form>
        </div>
        <div class="titlecont">
          <p class="titles">
            <span v-if="areaname!=''">
              {{areaname}}-
            </span>
            孤残儿童数量统计表
          </p>
          <p class="times"
             v-if="!disabledType1">享受年月：{{yeartext}}</p>
        </div>
        <div style="float:right;margin-top:-44px">
          <ta-button class="exportbtn"
                     icon="upload"
                     @click="exports">导出</ta-button>
          <ta-button v-if="isgoback"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <div class="tableout"
               id="tmd">
            <ta-table :columns="tableColumns"
                      :dataSource="tableData"
                      :scroll="{ x:1550, y: '100%' }"
                      bordered>
              <div slot="totalNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.totalNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'')">{{obj.totalNum}}</a>
                  <span v-else>{{obj.totalNum}}</span>
                </span>
              </div>
              <div slot="gqetNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.gqetNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'1')">{{obj.gqetNum}}</a>
                  <span v-else>{{obj.gqetNum}}</span>
                </span>
              </div>
              <div slot="dykjetNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.dykjetNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'2')">{{obj.dykjetNum}}</a>
                  <span v-else>{{obj.dykjetNum}}</span>
                </span>
              </div>
              <div slot="sjgeNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.sjgeNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'3')">{{obj.sjgeNum}}</a>
                  <span v-else>{{obj.sjgeNum}}</span>
                </span>
              </div>
              <div slot="azNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.azNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'6')">{{obj.azNum}}</a>
                  <span v-else>{{obj.azNum}}</span>
                </span>
              </div>
              <div slot="yygqNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.yygqNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'4')">{{obj.yygqNum}}</a>
                  <span v-else>{{obj.yygqNum}}</span>
                </span>
              </div>
              <div slot="qtNum"
                   slot-scope="val,obj,index">
                <span>
                  <a href="javascript:;"
                     v-if="0!=obj.qtNum && obj.areaName !='合计' && obj.areaId"
                     @click="lookInfo(val,obj,index,'7')">{{obj.qtNum}}</a>
                  <span v-else>{{obj.qtNum}}</span>
                </span>
              </div>
            </ta-table>
          </div>
        </ta-spin>
      </div>
      <!-- <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div> -->
      <ta-modal :centered="false"
                style="top: 25%;"
                :visible="showOn"
                @ok="Excel"
                @cancel="handleCancel">
        <div>
          <h3>确认导出查询条件下的全部有效数据吗？</h3>
        </div>
      </ta-modal>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'

import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery

  },
  data () {
    const tableColumns = [
      {
        title: '序号',
        dataIndex: 'serialNum',
        align: 'center',
        width: 80,
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '2', true, 'serialNum')
        }
      },
      {
        title: '区域',
        dataIndex: 'areaName',
        width: 250,
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', true, 'areaname')
        }
      },
      // {
      //   title: '单位名称',
      //   fixed: 'left',
      //   width: 250,
      //   // overflowTooltip: true,
      //   dataIndex: 'orgname',
      //   customRender: (text, record, index) => {
      //     return this.marge(text, record, index, '0', true, 'left')
      //   }
      // },
      {
        title: '合计',
        width: 180,
        dataIndex: 'totalNum',
        scopedSlots: { customRender: 'totalNum' }
      },
      {
        title: '福利机构养育孤弃儿童',
        width: 200,
        dataIndex: 'gqetNum',
        scopedSlots: { customRender: 'gqetNum' }
      },
      {
        title: '福利机构代养困境儿童',
        width: 200,
        dataIndex: 'dykjetNum',
        scopedSlots: { customRender: 'dykjetNum' }
      },
      {
        title: '社会散居孤儿',
        width: 150,
        dataIndex: 'sjgeNum',
        scopedSlots: { customRender: 'sjgeNum' }
      },
      {
        title: '艾滋病病毒感染儿童',
        width: 200,
        dataIndex: 'azNum',
        scopedSlots: { customRender: 'azNum' }
      },
      {
        title: '民间机构养育孤弃儿童',
        width: 200,
        dataIndex: 'yygqNum',
        scopedSlots: { customRender: 'yygqNum' }
      },
      {
        title: '其他',
        dataIndex: 'qtNum',
        scopedSlots: { customRender: 'qtNum' }
      }
    ]
    return {

      spinning: null,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/disabledChildrenNum/list', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixActivatedIsNeed: false,
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      isshow: true,
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      addressmodel: [],
      isbu: false,
      yeartext: '',
      optiondata: [],
      nowcode: '',
      exportdata: {},
      showOn: false,
      isgoback: false,
      disabledType1: true,
      areaname: '',
      issearch: false,
      isStatisticsType: '',
      areaLevel: ''
    }
  },
  activated () {
    this.isStatisticsType = ''
    this.disabledType1 = true
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.setHeight('one', 'oneout', !this.issearch)
    this.loadData()
    if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
      this.nowcode = '100000000000'
      this.$nextTick(() => {
        this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '100000000000')
      })
    } else {
      this.$nextTick(() => {
        this.areaname = window.parent.indexTool.getUserInfo().areaName
        this.nowcode = window.parent.indexTool.getUserInfo().areaCode
        this.addressmodel.push(this.nowcode)
      })
    }
    if (window.parent.indexTool.getUserInfo().orgType == '99') {
      this.isshow = false
    } else {
      this.isshow = true
    }
    this.$nextTick(() => {
      this.getareaname()
    })
    this.searchs('6')
  },
  mounted () {
  },
  methods: {
    changeIsEnjoySubsidies (e) {
      if (e == '1') {
        this.disabledType1 = false
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ startDate: moment(new Date(), 'YYYY-MM-DD') })
          this.searchForm.setFieldsValue({ issueType: ['0'] })
        })
      } else {
        this.disabledType1 = true
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({ startDate: null })
          this.searchForm.setFieldsValue({ issueType: [''] })
        })
      }
    },
    async add (record) {
      this.isgoback = true
      this.nowcode = record.areaId
      this.dealArea(record.idpath)
      this.searchs(record.areaId)
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        const areaArray = areaIdPathS.map(item => {
          return item.trim()
        })
        this.addressmodel = areaArray
        console.log(this.addressmodel)
      }
    },
    // fnCustomHeaderCell (column) {
    //   const myCol = {
    //     style: {
    //       padding: 0
    //     }
    //   }
    //   return myCol
    // },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1]
      this.searchForm.setFieldsValue({
        orgName: ''
      })
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    async handleSearch (value) {
      if (value.length) {
        const params = {
          areaCode: this.nowcode,
          orgName: value
        }
        const data = await this.post(
          '/checkChildApi/getWelfareByAreaCode',
          params
        )
        if (!data.errors) {
          this.optiondata = data.data.success
        }
      }
    },
    // 根据输入项进行筛选
    // filterOption (input, option) {
    //   // 对下拉框中的属性值的value值转成小写之后进行筛选
    //   return (
    //     option.componentOptions.children[0].text
    //       .toLowerCase()
    //       .indexOf(input.toLowerCase()) >= 0
    //   )
    // },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    loadData () {
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({ isEnjoySubsidies: '' })
      this.addressmodel = []
      this.value = [] // 查询条件起领年月
      this.showOn = false
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth
      // this.searchForm.setFieldsValue({ startDate: moment(this.yeartext, 'YYYY-MM') })
      this.searchForm.setFieldsValue({ statisticsType: '1' })
      // this.searchForm.setFieldsValue({'1': ''})
    },
    async searchs (value) {
      this.spinning = true
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch)
      const params = this.userPageParams()
      if (value != '000' && value != '6') {
        params.areaId = value
      }
      if (params.startDate) {
        this.yeartext = params.startDate
      } else {
        const nowDate = new Date()
        const nowyear = nowDate.getFullYear()
        const nowmonth = nowDate.getMonth() + 1
        this.yeartext = nowyear + '-' + nowmonth
      }
      this.isStatisticsType = params.statisticsType
      console.log(params, '=>12456')
      this.getareaname()
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    async getareaname () {
      const data = await this.getarealabel(this.nowcode)
      if (this.nowcode == '100000000000') { // 如果是部级，显示全国。
        this.areaname = '全国'
      } else {
        if (data) {
          this.areaname = data.areaName
        } else {
          this.areaname = ''
        }
      }
    },
    marge (text, record, index, val, ismerge, name) {
      // val 行合并 ismerge是否列合并
      // 需要合并的返回合并个数下面需要合并的为0 本身不需要合并为1 合计为1
      const obj = {
        children: text,
        attrs: {}
      }
      if (name == 'serialNum') {
        if (index !== this.tableData.length - 1) {
          obj.children = (<div>
            <span>{this.size * (this.page - 1) + index + 1}</span>
          </div>)
        }
      }
      if (name == 'areaname') {
        if (index !== this.tableData.length - 1) {
          if (record.areaLevel == '3' || record.areaLevel == '4' || record.isIn == '01') {
            obj.children = (<div>
              <span>{text}</span>
            </div>)
          } else {
            obj.children = (<div>
              <a onClick={() => this.add(record)}>{text}</a>
            </div>)
          }
        }
      }
      // if (ismerge) {
      //   obj.attrs.rowSpan = record.mergeNum
      // }
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
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      //   if (this.value.length > 0) {
      //     // startDateStart
      //     formData.startDateStart = this.value[0].format('YYYY-MM')
      //     formData.startDateEnd = this.value[1].format('YYYY-MM')
      //   }
      this.changetime(formData)
      if (formData.startDate) {
        formData.startDate = moment(formData.startDate).format('YYYY-MM')
      }
      return formData
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    Excel () {
      var data = this.userPageParams()
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      this.exportFile('/disabledChildrenNum/exportDisabledChildrenNum', data)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    exports () {
      this.showOn = true
    },
    resetFrom () {
      this.value = []
      this.areaname = ''
      this.nowcode = ''
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({ isEnjoySubsidies: '' })
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.addressmodel = [this.areaId]
      this.showOn = false
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth
      // this.searchForm.setFieldsValue({ startDate: moment(this.yeartext, 'YYYY-MM') })
      this.searchForm.setFieldsValue({ statisticsType: '1' })
      // this.searchForm.setFieldsValue({'1': ''})
      this.searchs()
    },
    datechange (value) {
      if (value.length == 0) {
        this.value = []
      }
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    // pagechange (page, size) {
    //   this.page = page
    //   this.size = size
    // }
    goback () {
      this.isgoback = false
      this.resetFrom()
    },
    lookInfo (val, obj, index, type) {
      const _this = this
      let welfareList = ''
      _this.tableData.forEach(item => {
        if (item.isIn == '02') {
          welfareList = item.idpath
        }
      })
      const params = this.userPageParams()

      this.$router.push({
        name: 'orphanedDisChildStatistics',
        query: {
          url: './orphanedDisChildStatistics',
          registType: type,
          areaCode: obj.areaId,
          areaArray: obj.idpath,
          welfareList: welfareList,
          params: params
          // isRegistered: this.isStatisticsType,
          // startDate: this.yeartext
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.tableout {
  width: 100%;
  height: 600px;
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
#tmd /deep/.ant-table-body-outer {
  margin-bottom: -6px;
  padding-bottom: 0px;
}

#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}

// #tmd /deep/.ant-table-body {
//   overflow: scroll !important;
//   max-height: 600px !important;
// }
.spilwid2 {
  width: 280px;
}
.spilwid3 {
  width: 280px;
}
</style>
