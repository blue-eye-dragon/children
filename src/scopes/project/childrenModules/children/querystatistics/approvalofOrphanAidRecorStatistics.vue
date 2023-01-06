<template>
  <div class="searchdata"
       id="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0'}">
      <div class="searchcont"
           ref="oneout">
        <ta-form layout="inline"
                 ref="one"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"
                 class="searchfroms">
          <AreaQuery v-if="isorgType"
                     class="spilwid"
                     :ishide.sync="ishide"
                     msg="区域"
                     :types="'2'"
                     :areaLevel1="areaLevel"
                     :addressmodel="addressmodel"
                     @adsvalchange="adsvalchange"
                     @setaddress="setaddress"></AreaQuery>
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
          <!-- <div class="cbox">
            儿童类型：<ta-checkbox :indeterminate="indeterminate"
                         @change="onCheckAllChange"
                         :checked="checkAll">全部</ta-checkbox>
            <ta-checkbox-group :options="plainOptions"
                               @change="onChange"
                               :value="checkedList" />
          </div> -->
          <!-- <ta-form-item style="display:block;text-align:right">
            <div class="searchButton" style="text-align:right">
              <ta-button type="primary" class="seach" icon="search" @click="searchs">查询</ta-button>
              <ta-button class="btnleft reset" icon="reload" @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft exportbtn" icon="upload" @click="exports">导出</ta-button>
            </div>
          </!-->
        </ta-form>
        <div class="searchbtn">
          <div class="searchButton">
            <ta-button class="search "
                       icon="search"
                       @click="searchs('000')">查询</ta-button>
            <ta-button class="btnleft reset"
                       icon="reload"
                       @click="resetFrom">重置</ta-button>
            <!-- <ta-button class="btnleft"
                       style="    width: 109px;"
                       @click="advancedquery">
              高级查询
              <ta-icon :type="issearch?'up':'down'" />
            </ta-button> -->
          </div>

        </div>
      </div>
      <div id="tmd">
        <!-- <div style="text-align:right;margin-bottom: 10px">
          <ta-button class="btnleft exportbtn" icon="upload" @click="exports">导出</ta-button>
        </div> -->
        <div class="titlecont">
          <p class="titles">
            <span v-if="areaname!=''">
              {{areaname}}-
            </span>
            孤儿助学工程资金发放人数统计表
          </p>
          <!-- <p class="times">统计时间：截止到{{yeartext}}</p>
          <p class="types">儿童类型：{{typetext}}</p> -->
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
          <!-- <div class="tableout"> -->
          <div class="tableout" id="tmd">
            <ta-table bordered
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :scroll="{ x: 1500, y: '100%' }"
                    :dataSource="tableData"></ta-table>
          </div>
        </ta-spin>
        <!-- </div> -->
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
import $ from 'jquery'
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
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '2', true, 'serialNum')
        }
      },
      {
        title: '区域',
        dataIndex: 'areaName',
        width: 250,
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', true, 'areaname')
        }
      },
      {
        title: '合计',
        width: 150,
        dataIndex: 'subTotal'
      },
      {
        title: '学历情况',
        children: [
          {
            title: '中等专业学校或中等技术学校',
            width: 250,
            dataIndex: 'technicalSecondaryNum'
          },
          {
            title: '大学专科和专科学校',
            width: 200,
            dataIndex: 'universityCollegeNum'
          },
          {
            title: '大学本科',
            width: 150,
            dataIndex: 'universityDegreeNum'
          },
          {
            title: '硕士研究生',
            width: 150,
            dataIndex: 'masterCandidateNum'
          },
          {
            title: '博士研究生',
            width: 150,
            dataIndex: 'coctoralCandidateNum'
          },
          {
            title: '其他',
            dataIndex: 'otherNum'
          }
        ]
      }
    ]
    return {
      spinning: null,
      isorgType: true,
      issearch: false,
      isgoback: false,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: 'childrenInStudentAssistanceProjec/queryStudentAssistanceRegisterMoneyNum', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixActivatedIsNeed: false,
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      indeterminate: false, // 半选初始状态
      checkAll: true, // 全选初始状态
      plainOptions: [], // checkboxgroup数据
      checkedList: [],
      yeartext: '',
      typetext: '全部',
      addressmodel: [],
      nowcode: '',
      showOn: false,
      areaname: '',
      areaId: '',
      areaLevel: '',
      type: '',
      mode2: ['month', 'month'],
      mode3: ['year', 'year'],
      value2: [],
      value3: [],
      issuingCycleList: []
    }
  },
  activated () {
    // this.setHeight('one', 'oneout', !this.issearch)
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
      this.isorgType = false
    }

    this.$nextTick(() => {
      this.getareaname()
    })
    this.searchs('000')
  },
  mounted () {
    this.getchildtype()
    this.getissuingCycle()
  },
  methods: {
    // advancedquery () {
    //   this.issearch = !this.issearch
    //   this.setHeight('one', 'oneout', !this.issearch)
    // },
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
    exports () {
      this.showOn = true
    },
    Excel () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      this.exportFile('/studentproject/queryStudentAssistanceRegisterMoneyNumExport', formData)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1]
      this.searchForm.setFieldsValue({
        orgName: ''
      })
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    loadData () {
      this.type = ''
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.addressmodel = []
      this.value = [] // 查询条件起领年月
      this.indeterminate = false // 半选初始状态
      this.checkAll = true // 全选初始状态
      this.checkedList = []
      this.getchildtype()
      this.getissuingCycle()
      this.typetext = '全部'
      this.showOn = false
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth
    },
    async searchs (item) {
      this.spinning = true
      this.issearch = false
      // this.setHeight('one', 'oneout', !this.issearch)
      const params = this.userPageParams()
      if (item != '000') {
        params.areaId = item
      }
      if (this.checkedList.length > 0) {
        this.typetext = this.getlabel()
      } else {
        this.typetext = '全部'
      }
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
    async getissuingCycle () {
      const data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingCycleList = data
    },
    // 获取儿童类型
    async getchildtype () {
      this.checkedList = []
      const nodeType = window.parent.indexTool.getUserInfo().orgType
      let data = []
      if (nodeType == '99') {
        data = await this.getDictionaries('CHILDCATEGORYF')
      } else {
        data = await this.getDictionaries('CHILDCATEGORYA')
      }
      this.plainOptions = data
      this.plainOptions.map(item => {
        this.checkedList.push(item.value)
      })
    },
    onChange (checkedList) {
      // 未全部选中的情况
      if (
        checkedList.length < this.plainOptions.length &&
        checkedList.length !== 0
      ) {
        // 全选check设置为半选状态
        this.checkAll = false
        this.indeterminate = true
      } else if (checkedList.length === 0) {
        // 一个都没选的情况
        // 全选check设置为不选状态
        this.checkAll = false
        this.indeterminate = false
      } else {
        // 全选全部选中的情况
        // 全选check设置为选中状态
        this.checkAll = true
        this.indeterminate = false
      }
      this.checkedList = checkedList
    },
    onCheckAllChange (e) {
      const isChecked = e.target.checked

      if (isChecked) {
        // 全选
        this.checkAll = true
        this.checkedList = []
        this.plainOptions.map(item => {
          this.checkedList.push(item.value)
        })
      } else {
        // 反选
        this.checkAll = false
        this.checkedList = []
      }
      this.indeterminate = false
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
    marge (text, record, index, val, ismerge, name) {
      // val 列合并 ismerge是否行合并
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
          if (record.areaLevel == '3' || record.areaLevel == '4' || record.orgOrWelfare == '0') {
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
    // 获取label
    getlabel () {
      const arr = []
      this.checkedList.map(item => {
        this.plainOptions.map(val => {
          if (val.value == item) {
            arr.push(val.label)
          }
        })
      })
      return arr.join('、')
    },
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      // formData.childTypes = this.checkedList.join(',')
      if (formData.address_Linkage) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
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
      return formData
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.type = ''
      this.mode2 = ['month', 'month']
      this.mode3 = ['year', 'year']
      this.value2 = []
      this.value3 = []
      this.areaname = window.parent.indexTool.getUserInfo().areaName
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.typetext = '全部'
      this.showOn = false
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth
      this.areaname = ''
      this.nowcode = ''
      this.value = []
      this.checkedList = []
      this.checkAll = false
      this.indeterminate = false
      this.searchs('000')
    },
    handleChange (e) {
      // this.disabled = false
      this.type = e
      this.value2 = []
      this.value3 = []
      this.searchForm.setFieldsValue({ issueQuarter: null })
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
    datechange (value) {
      if (value.length == 0) {
        this.value = []
      }
    },
    goback () {
      this.isgoback = false
      this.resetFrom()
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

<style scoped lang='less'>
.searchcont {
  width: 100%;
  position: relative;
  height: 100px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
  margin-bottom: 10px;
}
.searchbtn {
  width: 330px;
  position: absolute;
  text-align: right;
  right: 0;
  top: 6px;
}
.searchfroms {
  width: calc(100% - 330px);
}
.searchdata {
  height: 100%;
}
.tableout {
  width: 100%;
  height: 550px;
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
.types {
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
}
.cbox {
  display: block;
  margin-bottom: 12px;
  margin-left: 30px;
  width: 124%;
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

#tmd /deep/.ant-table-body {
  overflow: scroll !important;
  max-height: 600px !important;
}
</style>
