<template>
  <div class="searchdata"
       id="tmd">
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
          <!-- <ta-form-item class="spilwid"
                        label="单位名称"
                        fieldDecoratorId="orgName"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-auto-complete :dataSource="optiondata"
                              @search="handleSearch"
                              placeholder="请输入单位名称" />
         </ta-form-item>
            <ta-form-item class="spilwid"
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
          <!-- <ta-form-item label="享受年月"
                        fieldDecoratorId="startDate"
                        class="spilwid"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-month-picker />
          </ta-form-item> -->

          <ta-form-item label="统计类型"
                        fieldDecoratorId="statisticsType"
                        :initValue="''"
                        class="spilwid"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}">
            <ta-select defaultValue="1">
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
          <div class="cbox">
            儿童类型：<ta-checkbox :indeterminate="indeterminate"
                         @change="onCheckAllChange"
                         :checked="checkAll">全部</ta-checkbox>
            <ta-checkbox-group :options="plainOptions"
                               @change="onChange"
                               :value="checkedList" />
          </div>
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
            <ta-button class="btnleft"
                       style="    width: 109px;"
                       @click="advancedquery">
              高级查询
              <ta-icon :type="issearch?'up':'down'" />
            </ta-button>
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
            孤残儿童情况统计表
          </p>
          <p class="times"
             v-if="!disabledType1">享受年月：{{yeartext}}</p>
          <p class="types">儿童类型：{{typetext}}</p>
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
          <ta-table bordered
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :scroll="{ x: 3150, y: 450 }"
                    :dataSource="tableData"></ta-table>

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
      // {
      //   title: '合计',
      //   width: 200,
      //   dataIndex: 'totalNum'
      // },
      {
        title: '孤儿',
        width: 200,
        dataIndex: 'ge'
      },
      {
        title: '疑似被遗弃儿童',
        width: 200,
        dataIndex: 'ysbyqet'
      },
      {
        title: '流浪乞讨儿童',
        width: 180,
        dataIndex: 'llqtet'
      },
      {
        title: '打拐解救儿童',
        width: 170,
        dataIndex: 'dgjjet'
      },
      {
        title: '留守儿童',
        width: 140,
        dataIndex: 'lset'
      },
      {
        title: '流动儿童',
        width: 180,
        dataIndex: 'ldet'
      },
      {
        title: '灾害致困儿童',
        width: 180,
        dataIndex: 'zhzket'
      },
      {
        title: '大病致困儿童',
        width: 180,
        dataIndex: 'dbzket'
      },
      {
        title: '非婚生儿童',
        width: 180,
        dataIndex: 'fhset'
      },
      {
        title: '单亲家庭儿童',
        width: 180,
        dataIndex: 'dqjtet'
      },
      {
        title: '受家庭暴力影响儿童',
        width: 230,
        dataIndex: 'sjtblyxet'
      },
      {
        title: '父母无抚养能力儿童',
        width: 230,
        dataIndex: 'fmwfynlet'
      },
      {
        title: '痴呆傻救助对象所生子女',
        width: 230,
        dataIndex: 'cdsjzdxsszn'
      },
      {
        title: '疑似遗弃走失儿童',
        width: 170,
        dataIndex: 'ysbyqzset'
      },
      {
        title: '其他',
        dataIndex: 'qt'
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
        mixGetDataListURL: '/childSituation/list', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixActivatedIsNeed: false,
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      indeterminate: false, // 半选初始状态
      checkAll: true, // 全选初始状态
      plainOptions: [], // checkboxgroup数据
      checkedList: [],
      yeartext: '',
      typetext: '全部',
      addressmodel: [],
      isbu: false,
      optiondata: [],
      nowcode: '',
      showOn: false,
      disabledType1: true,
      areaname: '',
      areaLevel: ''
    }
  },
  activated () {
    this.setHeight('one', 'oneout', !this.issearch)
    this.loadData()

    if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
      this.isbu = true
      this.nowcode = '100000000000'
      this.$nextTick(() => {
        this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '100000000000')
      })
    } else {
      this.isbu = false
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
    // this.getchildtype()
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
    exports () {
      this.showOn = true
    },
    Excel () {
      this.exportFile('/querystatistics/exportChildSituation', this.userPageParams())
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
    async handleSearch (value) {
      if (value.length > 0) {
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
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    loadData () {
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.addressmodel = []
      this.disabledType1 = true
      this.value = [] // 查询条件起领年月
      this.indeterminate = false // 半选初始状态
      this.checkAll = true // 全选初始状态
      this.checkedList = []
      this.getchildtype()

      this.typetext = '全部'
      this.showOn = false
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = nowDate.getMonth() + 1 // 取上一個月的
      this.yeartext = nowyear + '-' + nowmonth
      // this.searchForm.setFieldsValue({ startDate: moment(this.yeartext, 'YYYY-MM') })

      this.searchForm.setFieldsValue({ isEnjoySubsidies: '' })
      this.searchForm.setFieldsValue({ statisticsType: '1' })
    },
    async searchs (item) {
      this.spinning = true
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch)
      const params = this.userPageParams()
      console.log(item)
      if (item != '000') {
        params.areaId = item
      }
      if (params.startDate) {
        this.yeartext = params.startDate
      } else {
        const nowDate = new Date()
        const nowyear = nowDate.getFullYear()
        const nowmonth = nowDate.getMonth() + 1
        this.yeartext = nowyear + '-' + nowmonth
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
      formData.childTypes = this.checkedList.join(',')
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      this.changetime(formData)
      if (formData.startDate) {
        formData.startDate = moment(formData.startDate).format('YYYY-MM')
      }
      return formData
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.searchForm.setFieldsValue({ isEnjoySubsidies: '' })
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
      // this.searchForm.setFieldsValue({ startDate: moment(this.yeartext, 'YYYY-MM') })

      this.searchForm.setFieldsValue({ isEnjoySubsidies: '' })
      this.searchForm.setFieldsValue({ statisticsType: '1' })
      // this.searchForm.setFieldsValue({'1': ''})
      this.areaname = ''
      this.nowcode = ''
      this.value = []
      this.checkedList = []
      this.checkAll = false
      this.indeterminate = false
      this.searchs('000')
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
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
      // console.log('***2-->01-->', moment(this.value[0]).format('YYYY-MM'), '02->', moment(this.value[1]).format('YYYY-MM'))
      // $('.ant-calendar-picker-container').css({
      //   display: 'none'
      // })
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
