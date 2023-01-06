<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contin"
           style="padding-top:15px">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form layout="inline"
                     ref="one"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <ta-form-item label="机构名称"
                            fieldDecoratorId="orgName"
                            class="spilwid"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-input placeholder="请输入机构名称" />
              </ta-form-item>
              <ta-form-item label="统一社会信用代码"
                            fieldDecoratorId="creditCode"
                            class="spilwid"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-input placeholder="请输入号码" />
              </ta-form-item>
              <AreaQuery msg="区域"
                         class="spilwid"
                         :ishide="true"
                         :labelCol="{span:7}"
                         :wrapperCol="{span:17}"
                         types="2"></AreaQuery>
              <ta-form-item label="机构类型"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="orgType"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="jigoutypeList" />
              </ta-form-item>
              <ta-form-item label="机构性质"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="orgNature"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="jigouorgnatureList" />
              </ta-form-item>
              <ta-form-item label="成立日期"
                            fieldDecoratorId="createTime"
                            class="spilwid"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="机构认定日期"
                            fieldDecoratorId="maintainedTime"
                            class="spilwid"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="是否残联定点康复中心"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="disabledPersonsFederationDesignatedRehabilitationCenter"
                            class="spilwid1"
                            :initValue="'0'">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in boolStatus"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="是否蓝天计划项目"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="blueSkyProject"
                            class="spilwid1"
                            :initValue="'0'">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in boolStatus"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="是否114可查咨询电话"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="inquiryTelephoneBy114"
                            class="spilwid1"
                            :initValue="'0'">
                <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in boolStatus"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="功能区域"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="functionalAreaList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="areaList" />
              </ta-form-item>
              <ta-form-item label="无障碍区域"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="accessibleAreaList"
                            class="spilwid1"
                            :initValue="[]">
                <ta-checkbox-group :options="areaList" />
              </ta-form-item>

            </ta-form>
            <div class="searchbtn searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchslist('000')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft"
                         @click="advancedquery">高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button>
            </div>
          </div>
        </div>
        <ta-tabs :activeKey="nowkey"
                 @change="callback">
          <ta-tab-pane tab="基本数据统计"
                       key="1">
            <ta-table class="table-min-width"
                      :columns="tableColumns"
                      :showOverflowTooltip="true"
                      :dataSource="tableData"
                      bordered>
              <template slot="areaName"
                        slot-scope="a, b, c">
                <span v-if="b.areaLevel==4 || b.areaName=='合计'">{{a}}</span>
                <a @click="searchslist(b,'click')"
                   v-else>{{a}}</a>
              </template>
            </ta-table>

          </ta-tab-pane>
          <ta-tab-pane tab="详细列表查询"
                       key="2"
                       :forceRender='forceRenderBool'>
            <div style="height: 50px;">
              <div style="float:right;">
                <!-- <ta-button style=" margin-left: 10px;"
                           class="exportbtn"
                           icon="upload"
                           :disabled="this.nowkey1!='1'&&this.nowkey1!='2'"
                           @click="showModal">导出</ta-button> -->
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
            </ta-table>
          </ta-tab-pane>
          <ta-button slot="tabBarExtraContent"
                     v-if="!isgoback && nowkey ==1"
                     @click="goback">返回</ta-button>
          <ta-button slot="tabBarExtraContent"
                     v-if="!isgoback && nowkey ==2"
                     @click="goback">返回</ta-button>
        </ta-tabs>
      </div>
      <div slot="footer"
           v-if="this.nowkey == '2'">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="this.nowkey=='1'?mixListOptions.mixGetDataListURL:mixListOptions.mixGetDataListURL2"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      isgoback: true,
      value: [],
      forceRenderBool: true,
      mode2: ['month', 'month'],
      ishide: true,
      tableData: [],
      mixDataList: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: '50%',
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '数量',
          dataIndex: 'count',
          align: 'center',
          width: '50%'
        }
      ],
      mixColumns: [
        {
          title: '序号',
          dataIndex: 'num',
          align: 'center',
          width: '80px',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '地区',
          width: '40%',
          dataIndex: 'areaName',
          overflowTooltip: true
        },
        {
          title: '机构名称',
          width: '20%',
          dataIndex: 'orgName',
          overflowTooltip: true
        },
        {
          title: '机构类型',
          width: '15%',
          dataIndex: 'orgType',
          overflowTooltip: true
        },
        {
          title: '机构性质',
          width: '15%',
          dataIndex: 'orgNature',
          overflowTooltip: true
        },
        {
          title: '核定床位数',
          width: '15%',
          align: 'center',
          dataIndex: 'approvedBedNumber',
          overflowTooltip: true
        },
        {
          title: '操作',
          overflowTooltip: false,
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      areaId: '',
      areaCode: '',
      mixListOptions: {
        mixGetDataListURL: '/welfareOrgManagement/queryWelfareOrgCount',
        mixGetDataListURL2: 'welfareOrgManagement/queryWelfareOrg',

        mixActivatedIsNeed: false

        // mixGetDataListIsPage: false
      },
      choes: true,
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange,
        // hideDefaultSelections: true,
        type: 'checkbox'
      },
      statisticTimeStart: '',
      statisticTimeEnd: '',
      params: {},
      sexList: [],
      nationList: [],
      censusregisterList: [],
      jigouorgnatureList: [],
      jigoutypeList: [],
      houseHoldList: [],
      schoolingList: [],
      employmentlist: [],
      helpMeasurelist: [], // 保障情况字典数据
      heathlist: [], // 健康状况字典数据
      disabiliytypelist: [], // 残疾类型等字典数据
      canjileave: [], // 残疾等级字典数据
      disabilityTypeValues: [], // 残疾类别选择的数据
      areaList: [],
      heathval: '', // 健康状况选择的值
      issearch: false,
      sfStatus: [{ label: '累计增加', value: '1' }, { label: '已退出', value: '2' }, { label: '本月新增', value: '3' }],
      boolStatus: [{ label: '是', value: '1' }, { label: '否', value: '2' }],
      nowkey: '1',
      nowkey1: '1', // 详细列表页面

      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      choesP: [],
      tablist: [{ name: '事实无人抚养儿童', value: '1' }, { name: '监护不当儿童', value: '2' }, { name: '家庭贫困儿童', value: '3' }, { name: '残疾儿童', value: '4' }] // 详细列表查询 中的tab数据
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.7%', '91.3%', 'spilwid1') // 单独一行字段宽度控制
  },
  mounted () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.getDictionarieMore()
    this.getnation() // 健康状况字典上数据
    this.getdisabiliytype() // 残疾类型字典数据
    this.getleave() // 残疾等级字典数据
    this.searchslist('6')
  },
  activated () {
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    goback () {
      this.nowkey = '1'
      this.isgoback = true
      this.searchslist()
    },
    async getDictionarieMore () {
      this.employmentlist = await this.getDictionaries('EMPLOYMENTSITUATION')

      this.sexList = await this.getDictionaries('SEX')
      this.nationList = await this.getDictionaries('NATION')
      this.censusregisterList = await this.getDictionaries('CENSUSREGISTER')
      this.houseHoldList = await this.getDictionaries('HOUSEHOLDREGISTRYCLASSIFY')
      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
      this.helpMeasurelist = await this.getDictionaries('OTHERSALVATIONOFUNATTENDED') // 保障情况字典
      this.jigoutypeList = await this.getDictionaries('INSTITUTIONALTYPE')
      this.jigouorgnatureList = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.areaList = await this.getDictionaries('FUNCTIONALAREA')
    },
    // 健康狀況字典
    async getnation () {
      let formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      let data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val) {
      let formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      let data = await this.post('dict/queryDictByParentValue', formdata)
      this.disabiliytypelist = data.data.codeList
    },
    // 残疾等级  DISABILITYLEVEL
    async getleave () {
      let data = await this.getDictionaries('DISABILITYLEVEL')
      this.canjileave = data
    },
    // 健康状况的change事件
    onChange (e) {
      this.searchForm.setFieldsValue({
        disabledType: [],
        healthStatusOther: ''
      })
      this.heathval = e.target.value
      this.getdisabiliytype(e.target.value)
      this.$nextTick(() => {
        this.setHeight('one', 'oneout', !this.issearch)
      })
    },
    // 如果选了多重残疾外的超过2个残疾，则多重残疾为选中
    setMulti (e) {
      let index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      if (this.nowkey == '2') {
        formData['type'] = this.nowkey1
      }

      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      }

      this.changetime(formData)
      if (this.value.length > 0) {
        formData.yearsStart = this.value[0].format('YYYY-MM')
        formData.yearsEnd = this.value[1].format('YYYY-MM')
      }
      // if (formData.length > 0) {
      //   formData.yearsStart = formData.years[0].format('YYYY-MM')
      //   formData.yearsEnd = formData.years[1].format('YYYY-MM')
      // }
      if (this.areaId) {
        formData.areaCode = this.areaId
        formData.areaId = this.areaId
      }

      return formData
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
      if (this.nowkey == 2) {
        this.nowkey1 = '1'
        this.handleSubmit('search')
      } else {
        this.searchslist()
      }
    },
    // 导航菜单tab切换-详细列表页面
    callback1 (val) {
      this.nowkey1 = val.target.value
      this.handleSubmit('search')
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.value = []
      this.mode2 = ['month', 'month']
      this.statisticTimeStart = ''
      this.statisticTimeEnd = ''
    },
    handlePanelChange2 (value, mode) {
      if (value.length == 0) {
        this.value = []
      }
    },
    datechange (value, mode) {
      if (value.length == 0) {
        this.value = []
      }
      this.value = value

      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    adsvalchange (value) {

    },
    searchslist (value, type) {
      const searchValue = this.searchForm.getFieldsValue()
      let areaId = ''
      if (searchValue.address_Linkage && searchValue.address_Linkage.length > 0) {
        searchValue.areaId = searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        this.areaId = searchValue.areaId
      } else {
        searchValue.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = searchValue.areaId
      }

      this.changetime(searchValue)
      if (value == '000') {
        this.issearch = !this.issearch
        this.advancedquery()
      }
      if (!value) {
      } else {
        if (value && value != '6') {
          if (value.areaId) {
            searchValue.areaId = value.areaId
            this.areaId = value.areaId
          }
          if (this.value.length > 0) {
            searchValue.yearsStart = this.value[0].format('YYYY-MM')
            searchValue.yearsEnd = this.value[1].format('YYYY-MM')
          }
        }
      }
      if (!value || value == '6' || value.target) {
        this.isgoback = true
      } else {
        this.isgoback = false
      }

      this.getlist(searchValue, value)
    },
    async getlist (params, value) {
      let res = {}
      res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data.list
      if (this.issearch) {
        this.advancedquery()
      }
      if (value != '6') {
        if (this.nowkey == '2') {
          this.handleSubmit()
        }
      }
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      if (selectedRowKeys.length > 0) {
        this.choes = false
        this.choesP = selectedRows
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
      let url = '/welfareOrg/exportwelfareOrg'
      if (this.nowkey1 == '2') { // 监护不当
        url = '/welfareOrg/exportwelfareOrg'
      }

      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    see (val, obj) {
      if (this.nowkey1 == '1') { // 事实无人抚养儿童
        this.$router.push({
          path: 'noonesupportfact',
          query: {
            id: obj.addUnattendedId,
            status: 1,
            childtypedisabled: 1,
            isdisabled: 1
          }
        })
      } else if (this.nowkey1 == '2') { // 监护不当儿童
        this.$router.push({
          name: 'improperCareCollection',
          query: {
            jump: 'yes',
            id: obj.addUnattendedId,
            disabled: true,
            nowkey: null
          }
        })
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
  }

}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 16px; /*滚动条宽度*/
  height: 16px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: red; /*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: green; /*滚动条的背景颜色*/
}
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
.searchcont {
  height: 66px;
  transition: all 1s ease 0s;
  position: absolute;
  width: 100%;
  z-index: 100;
  background: rgb(255, 255, 255);
}
.searchfroms {
  width: calc(100% - 330px);
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 6px;
}
.ant-tabs-extra-content {
  display: none;
}
.searchdata {
  height: 100%;
}
.spilwid1 {
  width: 900px;
}
</style>
