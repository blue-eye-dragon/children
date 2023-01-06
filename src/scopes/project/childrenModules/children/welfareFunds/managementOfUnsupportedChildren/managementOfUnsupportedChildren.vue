<template>
  <!-- 实事无人抚养儿童管理 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer: '80px'}">
      <div class="contentin">
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   class="searchfroms"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <!-- <ta-form layout="inline" :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"> -->
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>

            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input placeholder="请输入身份证号" />
            </ta-form-item>
            <ta-form-item label="性别"
                          fieldDecoratorId="sex"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择性别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in sexList "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="民族"
                          fieldDecoratorId="nation"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择民族">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in nationList "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <AreaQuery msg="区域"
                       class="spilwid"
                       :ishide="true"
                       types="1"></AreaQuery>
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item label="享受年月"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker :placeholder="['开始年月', '结束年月']"
                               format="YYYY-MM"
                               :value="value"
                               :mode="mode"
                               @panelChange="handlePanelChange2" />
            </ta-form-item>
            <ta-form-item label="申请日期"
                          fieldDecoratorId="applyDate"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item label="户籍性质"
                          fieldDecoratorId="householdRegistrationStatus"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择户籍性质">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in censusregisterList "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="户口分类"
                          fieldDecoratorId="registeredResidenceType"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择户口分类">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in houseHoldList "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="就学情况"
                          fieldDecoratorId="schoolStatus"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择就学情况">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in schoolingList "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="就业情况"
                          fieldDecoratorId="workStatus"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择就业情况">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in employmentlist "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="身份状态"
                          fieldDecoratorId="sfStatus"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}"
                          :initValue="['1']">
              <ta-select placeholder="请选择身份状态">
                <ta-select-option v-for="(item,index) in sfStatus "
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-form>
          <div class="searchbtn">
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="handleSubmit('search')">查询</ta-button>
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
        <div style="text-align: right;margin: 10px 0">
          <ta-button type="primary"
                     :disabled='choes'
                     @click="goRecord">生活补贴发放记录</ta-button>
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
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
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  class="table-min-width"
                  :showOverflowTooltip="true"
                  @change="handleTableChange"
                  :customRow="fnCustomRow"
                  :rowSelection="mixRowSelection"
                  :pagination="false"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj)"
                  class="com_textsee">查看</span>
          </div>
          <!-- <div slot="idCard" slot-scope="val,obj,index" >
             <span  >{{val?val.substr(0,4)+'***'+val.substr(14,val.length):'-'}}</span>
          </div> -->
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'

import moment from 'moment'

import AreaQuery from '@component/common/components/areaQuery'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '区域',
    width: '40%',
    dataIndex: 'currentAddressDetailAll',
    overflowTooltip: true
  },
  {
    title: '儿童编号',
    width: '18%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '儿童姓名',
    width: '12%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '10%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    overflowTooltip: true
  },

  // {
  //   title: '出生日期',
  //   width: '12%',
  //   dataIndex: 'birthday',
  //   overflowTooltip: true
  // },
  // {
  //   title: '身份证号',
  //   width: '12%',
  //   dataIndex: 'idCard',
  //   // scopedSlots: { customRender: 'idCard' },
  //   overflowTooltip: true
  // },

  {
    title: '申请日期',
    width: '15%',
    dataIndex: 'reportTime',
    align: 'center',
    overflowTooltip: true
  },
  {
    title: '起领年月',
    width: '15%',
    dataIndex: 'issuingYearsStart',
    align: 'center',
    overflowTooltip: true
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const mixDataList = []
var that = ''
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      width: '500px',
      mixListOptions: {
        mixGetDataListURL: 'orphanLivingExpensesAndChildren/pageUnattendedChildStatistics' // 数据列表接口，API地址orphanLivingExpensesAndChildren/pageUnattendedChild
      },
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange,
        // hideDefaultSelections: true,
        type: 'radio'
      },
      mixColumns: mixColumns,
      choes: true,
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList,
      addressmodel: [],
      choesP: [],
      sexList: [],
      nationList: [],
      censusregisterList: [],
      houseHoldList: [],
      schoolingList: [],
      employmentlist: [],
      mode: ['month', 'month'],
      value: [],
      issearch: false,
      sfStatus: [{ label: '在享受', value: '1' }, { label: '已退出', value: '2' }]
    }
  },
  created () {
    that = this
  },
  mounted () {
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getDictionarieMore()
  },
  activated () {
    this.choesP = []
    this.choes = true
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch)
    // this.getDictionarieMore()
  },
  methods: {
    moment,
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 'px'
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    onChange (value) {
      if (value.length == 0) {
        this.value = []
      }
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)

      if (this.value.length > 0) {
        formData.yearsStart = this.value[0].format('YYYY-MM')
        formData.yearsEnd = this.value[1].format('YYYY-MM')
      }
      return formData
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.value = []
      this.handleSubmit('search')
    },
    // 数据处理
    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            let arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY-MM-DD')
          }
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
        // 是数组  数组元素不为对象
        if (data[k] instanceof Array && !(data[k][0] instanceof Object)) {
          if (k == 'address_Linkage') {
            // 后期修改下
            if (data[k][2]) {
              data.areaCode = data[k][2]
            } else if (data[k][1]) {
              data.areaCode = data[k][1]
            } else {
              data.areaCode = data[k][0]
            }
            // data.province = data[k][0]
            // data.city = data[k][1]
            // data.county = data[k][2]
          } else {
            data[k] = data[k].join(',')
          }
        }
      }
    },
    async getDictionarieMore () {
      this.employmentlist = await this.getDictionaries('EMPLOYMENTSITUATION')

      let data2 = await this.getDictionaries('SEX')
      this.sexList = data2

      let data3 = await this.getDictionaries('NATION')
      this.nationList = data3

      let data4 = await this.getDictionaries('CENSUSREGISTER')
      this.censusregisterList = data4

      let data5 = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY')
      this.houseHoldList = data5

      let data6 = await this.getDictionaries('DEGREEEDUCATION')
      this.schoolingList = data6
    },

    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
      }
    },
    fnCustomRow (record, index) {
      return {
        props: {},
        on: {
          // 事件:支持DOM的标准事件,使用箭头表达式写法
          click: e => {
            if (this.choesP) {
              this.mixRowSelection.selectedRowKeys = []
              this.choesP = []
              this.choes = true
            }
            if (event.detail == 2) {
              this.see('', record)
            }
          }
        }
      }
    },
    goRecord () {
      this.$router.push({
        path: 'maintenancePaymentRecord',
        query: {
          baseId: this.choesP[0].baseId
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/orphanLivingExpenses/exportUnattendedChildren', data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    see (val, obj) {
      // 查看跳转
      this.$router.push({
        path: 'noonesupportfact',
        query: {
          id: obj.addUnattendedId,
          status: 1,
          childtypedisabled: 1,
          isdisabled: 1
        }
      })
    },

    childInfo (val, obj, index) {
      let param = {
        id: obj.id
      }
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },

    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },

    handleOk (e) {
      this.exports()
      this.showOn = false
    },

    async exports () {
      let ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },
  filters: {}
}
</script>

<style scoped lang="less">
.active {
  /* background: #eee; */
  color: #1e82d2;
  font-weight: bolder;
}
.searchdata {
  height: 100%;
}
.spilwid {
  width: 380px;
}
.but {
  margin-left: 20px;
}
.searchfroms {
  width: calc(100% - 282px);
}
.line {
  line-height: 40px;
  margin: 0 15px 0 5px;
}
.searchcont {
  width: 100%;
  position: relative;
  height: 60px;
  overflow: hidden;
  border-bottom: 13px solid #e4e4e4;
}
.searchbtn {
  width: 319px;
  position: absolute;
  right: 0;
  top: 6px;
}
</style>
