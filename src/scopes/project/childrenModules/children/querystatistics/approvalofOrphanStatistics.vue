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
          <div class="__form-spec-line__">
            <div>
              <AreaQuery v-if="isorgType"
                         class="spilwid"
                         :ishide.sync="ishide"
                         msg="区域"
                         :types="'2'"
                         :areaLevel1="areaLevel"
                         :addressmodel="addressmodel"
                         @adsvalchange="adsvalchange"
                         @setaddress="setaddress"></AreaQuery>
              <ta-form-item label="登记状态"
                            class="spilwid"
                            fieldDecoratorId="dataState"
                            :labelCol="{span:9}"
                            :initValue="'1'"
                            :wrapperCol="{span:15}">
                <ta-select allowClear
                           :placeholder="'请选择登记状态'">
                  <ta-select-option value="">全部</ta-select-option>
                  <ta-select-option value="1">登记在册</ta-select-option>
                  <ta-select-option value="2">已退出</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="儿童类型"
                            v-if="!iswarlfe"
                            style="width:280px"
                            fieldDecoratorId="childType"
                            :fieldDecoratorOptions="{initialValue: ''}"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-select :placeholder=" '请选择儿童类型'">
                  <ta-select-option value="">全部</ta-select-option>
                  <ta-select-option v-for="item in childTypeList"
                                    :key="item.value"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item label="登记日期"
                            fieldDecoratorId="registerTime"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>

              <ta-form-item label="助学日期"
                            fieldDecoratorId="helpStudyDateStart"
                            style="width:280px"
                            :labelCol="{span:10}"
                            :wrapperCol="{span:14}">
                <ta-year-picker />
              </ta-form-item>
            </div>
            <div class="searchbtn">
              <div class="searchButton">
                <ta-button class="search "
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
      <div id="tmd">
        <!-- <div style="text-align:right;margin-bottom: 10px">
          <ta-button class="btnleft exportbtn" icon="upload" @click="exports">导出</ta-button>
        </div> -->
        <div class="titlecont">
          <p class="titles">
            <span v-if="areaname!=''">
              {{areaname}}-
            </span>
            孤儿助学数量统计表
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
          <div class="tableout"
               id="tmd">
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
      iswarlfe: window.parent.indexTool.getUserInfo().orgType == 99,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: 'childrenInStudentAssistanceProjec/queryStudentAssistanceRegisterNum', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixActivatedIsNeed: false,
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      childTypeList: [], // 儿童类别字典数据
      childTypeList1: [],
      yeartext: '',
      typetext: '全部',
      addressmodel: [],
      nowcode: '',
      showOn: false,
      areaname: '',
      areaId: '',
      areaLevel: '',
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
    this.searchs('000')
  },
  mounted () {
    this.getDictionarieMore()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    async getDictionarieMore () {
      const data = await this.getDictionaries('CHILDCATEGORYA') // 儿童类型
      data.forEach(item => {
        if (item.value == '1' || item.value == '3' || item.value == '4') {
          this.childTypeList.push(item)
        }
      })
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
      const _self = this
      const formData = this.userPageParams()
      this.exportFile('/studentproject/queryStudentAssistanceRegisterNumExport', formData)
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
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.addressmodel = []
      this.showOn = false
    },
    async searchs (item) {
      this.spinning = true
      this.issearch = false
      const params = this.userPageParams()
      if (item != '000') {
        params.areaId = item
      }
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data
      this.$nextTick(() => {
        this.spinning = false
      })
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
        areaIdPathS.splice(0, (this.areaLevel == '2' || this.areaLevel == '3') ? Number(this.areaLevel) : 1)
        const areaArray = areaIdPathS.map(item => {
          return item.trim()
        })
        this.addressmodel = areaArray
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
          if (record.areaLevel == '4' || record.isIn == '0') {
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
      this.changetime(formData)
      if (formData.helpStudyDateStart) {
        formData.helpStudyDateStart = formData.helpStudyDateStart.substring(0, 4)
      }
      return formData
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.showOn = false
      this.nowcode = ''
      this.searchs('000')
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
  height: 66px;
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
