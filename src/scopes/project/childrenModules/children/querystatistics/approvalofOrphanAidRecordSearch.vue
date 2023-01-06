<template>
  <div class="searchdata tadrawer"
       id='tmd'>
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery class="spilwid"
                           :isshow1="!isshow1"
                           :labelCol="{span:9}"
                           :wrapperCol="{span:15}"
                           types="1"
                           :ishide="true"
                           :addressmodel="addressmodel"
                           @setaddress="setaddress"
                           msg="区域"></AreaQuery>
                <ta-form-item label="福利机构"
                              fieldDecoratorId="belongsToOrgId"
                              v-if="!isshow1"
                              class="spilwid3"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <!--  多选 mode="multiple" -->
                  <ta-select showSearch
                             allowClear
                             optionFilterProp="children"
                             :value="valueT"
                             placeholder="请输入福利机构名称"
                             :defaultActiveFirstOption="false"
                             :showArrow="false"
                             :filterOption="false"
                             :searchDelay="1"
                             @search="handleSearch"
                             @change="mechanismchange">
                    <ta-select-option :value="item.taorgId"
                                      v-for="(item,index) in welfareOrgNameList"
                                      :key="index">{{item.orgName}}</ta-select-option>
                  </ta-select>
                  <!-- <ta-select showSearch
                             :disabled="disabled"
                             optionFilterProp="children"
                             :filterOption="filterOption"
                             :placeholder="disabled?'请先选择区域':'请选择福利机构'">
                    <ta-select-option :value="item.taorgId"
                                      v-for="(item,index) in welfareOrgNameList"
                                      :key="index">{{item.orgName}}</ta-select-option>
                  </ta-select> -->
                </ta-form-item>
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

                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="name"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>

                <ta-form-item label="儿童身份证号"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="idCard"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童身份证号" />
                </ta-form-item>
                <ta-form-item label="儿童类型"
                              class="spilwid"
                              v-if="!isshow1"
                              fieldDecoratorId="childType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择儿童类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="学历"
                              class="spilwid"
                              fieldDecoratorId="education"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             :placeholder="'请选择学历'">
                    <ta-select-option v-for="item in educationList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="助学日期"
                              style="width:250px"
                              fieldDecoratorId="helpStudyDateStart"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-year-picker />
                  <!-- <ta-range-picker :placeholder="['开始年月', '结束年月']"
                                   format="YYYY-MM"
                                   :value="value"
                                   :mode="mode2"
                                   @panelChange="handlePanelChange2" /> -->
                </ta-form-item>
                <ta-form-item label="登记日期"
                              fieldDecoratorId="registerTime"
                              style="width:380px"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-range-picker :placeholder="['开始日期', '结束日期']" />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="search('000')">查询</ta-button>
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
          </ta-form>
        </div>

        <!-- <div style="margin-bottom: 16px;"></div> -->
        <div style="height: 50px;"
             :hidden="ExShow">
          <div style="float:right;">
            <!-- <ta-button @click="returns"
                       slot="tabBarExtraContent"
                       icon="rollback"
                       v-if="returnName">返回</ta-button> -->
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
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="false"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :scroll="{ x: 1800 }"
                    :customRow="fnCustomRow">
            <span slot="num"
                  slot-scope="val, obj, index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>
            <span slot="currentAddressDetailAll"
                  slot-scope="a, b, c">
              <span>{{a.indexOf('民政部')==-1?a:a.substring(3,a.length)}}</span>
            </span>
            <span slot="name"
                  slot-scope="val, obj, index">
              <a @click="continueprocessing(obj)">{{obj.name}}</a>
            </span>
            <span slot="birthday"
                  slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>
            <span slot="signOutDate"
                  slot-scope="text,obj,index">{{ text != null ? text.substring(0, 7) : ''}}</span>
          </ta-table>
        </ta-spin>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- <ta-modal title="作废"
              :visible="visible2"
              :closable="false">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="作废原因"
                      fieldDecoratorId="revokeReason"
                      :fieldDecoratorOptions="this.verificationRules('作废原因', 60,true)"
                      :labelCol="{ span: 5 }">
          <ta-textarea placeholder="请输入作废原因"
                       :disabled="reasondis"
                       :rows="4" />
        </ta-form-item>
      </ta-form>
      <template slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   v-if="!reasondis"
                   type="primary"
                   @click="onok">确定</ta-button>
      </template>
    </ta-modal> -->
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '区域',
    width: '20%',
    dataIndex: 'areaName',
    scopedSlots: { customRender: 'areaName' },
    overflowTooltip: true
  },
  {
    title: '儿童姓名',
    width: '15%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    overflowTooltip: true
  },
  {
    title: '儿童类型',
    width: '15%',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '8%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '15%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '学历',
    dataIndex: 'education',
    collectionType: 'DEGREEEDUCATION',
    width: '13%',
    overflowTooltip: true
  },
  {
    title: '上报单位',
    dataIndex: 'reportUnit',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '福利机构',
    dataIndex: 'belongsToOrgName',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '开始时间',
    dataIndex: 'schoolStartDate',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '结束时间',
    dataIndex: 'schoolEndDate',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '登记时间',
    dataIndex: 'registerTime',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '退出日期',
    dataIndex: 'signOutDate',
    align: 'center',
    width: '15%',
    overflowTooltip: true,
    scopedSlots: { customRender: 'signOutDate' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  name: 'revoke',
  data () {
    return {
      isshow1: window.parent.indexTool.getUserInfo().orgType == '99',
      spinning: null,
      valueT: '',
      value: [],
      mode2: ['month', 'month'],
      addressmodel: [],
      welfareOrgNameList: [], // 福利机构列表
      tableColumns,
      tableData: [],
      showOn: false,
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/childrenInStudentAssistanceProjec/queryStudentAssistanceRegister', // 数据列表接口，API地址
        mixActivatedIsNeed: true
      },
      mixPageRef: 'gridPager',
      visible: false,
      visible2: false,
      adoptionlist: [],
      educationList: [],
      // adoptionbiztypelist: [],
      adoptionid: '',
      registrationAdoptionId: '',
      adoptorName: '',
      childId: '',
      officelist: [],
      nowdata: {},
      reasondis: false,
      issearch: false,
      ishide: true,
      radiovalue: '',
      printlist: [],
      ExShow: false,
      returnName: null // 返回按钮要返回的页面
    }
  },
  activated () {
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
      }
      this.setaddress()
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
        this.search('000')
      })
    }
  },
  mounted () {
    this.getchildtype()
    this.geteducationList()
    this.ExShow = false
    this.issearch = false
    // this.returnName = this.$route.query.returnName
    // this.type = this.$route.query.type
    // let biztype = ''
    // this.searchForm.setFieldsValue({ biztype })
    this.setHeight('one', 'oneout', !this.issearch, this)
    const userInfo = window.parent.indexTool.getUserInfo()
    this.ishide = userInfo.areaLevel == 1
    if (userInfo.areaId == '1000000000000000000') {
      this.addressmodel = []
    } else {
      this.addressmodel = [userInfo.areaId]
    }
    this.setaddress()
    this.$nextTick(() => {
      this.search('000')
    })
  },
  methods: {
    resetFrom (e) {
      this.page = 1
      this.size = 10
      this.value = []
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.searchForm.resetFields()
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      } else {
        this.addressmodel = []
      }
      // if (e != 'back') {
      //   this.handleSubmit('search')
      // }
      this.tableData = []
      this.search('000')
    },
    // 返回 到原页面
    // returns () {
    //   this.resetFrom('back')
    //   this.$router.push({
    //     name: this.returnName
    //   })
    // },
    Excel () {
      var data = this.userPageParams()
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      const url = '/studentproject/queryStudentRegister'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    mechanismchange (value) {
      this.valueT = value
    },
    async handleSearch (value) {
      const res = await this.post('/welfareOrgManagement/queryWelfareOrgsByCurrentUserAreaId', { welfareOrgName: value })
      this.welfareOrgNameList = res.data.data
    },
    search (e) {
      this.page = 1
      this.size = 10
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch, this)
      this.spinning = true
      const formData = this.userPageParams()
      if (e == '000') {
        this.handleSubmit()
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }

      this.changetime(formData)
      if (formData.helpStudyDateStart) {
        formData.helpStudyDateStart = formData.helpStudyDateStart.substring(0, 4)
      }
      // if (this.value.length > 0) {
      //   formData.helpStudyRegisterTimeStart = this.value[0].format('YYYY-MM')
      //   formData.helpStudyRegisterTimeEnd = this.value[1].format('YYYY-MM')
      // }
      return formData
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      data.forEach(item => {
        if (item.value == '1' || item.value == '3' || item.value == '4') {
          this.adoptionlist.push(item)
        }
      })
    },
    async geteducationList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onClose () {
      this.visible2 = false
      this.visible = false
    },
    continueprocessing (e) {
      const _self = this
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      _self.$router.push({
        name: 'orphanProject',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          id: e.id,
          startWorkflowId: e.startWorkflowId,
          operateFlag: 'look'
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.prienttitle {
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 24px;
}
.prientout {
  width: 100%;
  padding: 0 20px;
}
.prientout /deep/.ant-radio-wrapper {
  width: 50%;
  margin-right: 0;
  margin-bottom: 32px;
}
.spilwid3 {
  width: 280px;
}
</style>
