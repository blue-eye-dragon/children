<template>
  <!-- 留守儿童综合查询之统计报表 -->
  <div class="searchdata tadrawer"
       id="tmd">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'  }">
      <div class=" "
           style="padding-top:15px;">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form layout="inline"
                     ref="one"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <ta-col :span="24">
                <AreaQuery msg="区域"
                           class="spilwid"
                           :ishide="true"
                           :addressmodel='addressmodel'
                           @setaddress='setaddr'
                           :labelCol="{span:7}"
                           :wrapperCol="{span:17}"
                           types="2"></AreaQuery>
                <ta-form-item label="是否认领"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              class="spilwid"
                              fieldDecoratorId="isConfirm"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select @change="reform">
                    <ta-select-option value="1"
                                      @click="deuRadio('1','isConfirm')">已认领</ta-select-option>
                    <ta-select-option value="2"
                                      @click="deuRadio('2','isConfirm')">未认领</ta-select-option>
                    <ta-select-option value=""
                                      @click="()=>{this.nowText='all' }">全部</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <!-- <ta-form-item label="出生日期"
                            fieldDecoratorId="birthday"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item label="登记日期"
                            fieldDecoratorId="createTime"
                            class="spilwid2"
                            :labelCol="{span:5}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item> -->
              <ta-form-item label="性别"
                            fieldDecoratorId="sex"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid1">
                <!-- <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in sex"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group> -->
                <ta-radio-group :disabled="nowText!='all'&&nowText!='sex'">
                  <ta-radio @click="deuRadio(item.value,'sex')"
                            :value="item.value"
                            v-for="(item,index) in sexList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>

                <!-- <ta-checkbox-group :options="sexList"
                                   @change="dealSameSth()" /> -->
              </ta-form-item>
              <ta-form-item label="户籍性质"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="householdRegistrationStatus"
                            class="spilwid1">
                <!-- <ta-radio-group>
                  <ta-radio :value="item.value"
                            v-for="(item,index) in censusregisterList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group> -->
                <!-- <ta-checkbox-group :options="censusregisterList" /> -->
                <ta-radio-group :disabled="nowText!='all'&&nowText!='householdRegistrationStatus'">
                  <ta-radio @click="deuRadio(item.value,'householdRegistrationStatus')"
                            :value="item.value"
                            v-for="(item,index) in censusregisterList"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>

              </ta-form-item>

              <ta-form-item label="监护类型"
                            fieldDecoratorId="guardianship"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }">
                <!-- <ta-checkbox-group :options="guardianlist" /> -->
                <ta-radio-group :disabled="nowText!='all'&&nowText!='guardianship'">
                  <ta-radio @click="deuRadio(item.value,'guardianship')"
                            :value="item.value"
                            v-for="(item,index) in guardianlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <ta-form-item label="其他特殊情况"
                            fieldDecoratorId="specialSituate"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }">
                <!-- <ta-checkbox-group :options="otherSpecialist" /> -->
                <ta-radio-group :disabled="nowText!='all'&&nowText!='specialSituate'">
                  <ta-radio @click="deuRadio(item.value,'specialSituate')"
                            :value="item.value"
                            v-for="(item,index) in otherSpecialist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
              </ta-form-item>
              <!-- <ta-form-item label="救助措施"
                            fieldDecoratorId="welfareAssistAssistancList"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                           >
                <ta-checkbox-group :options="socialWelfarelist" />
              </ta-form-item> -->
              <ta-form-item label="监护不当情形"
                            fieldDecoratorId="victimizatByguardians"
                            class="spilwid1"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }">
                <!-- <ta-checkbox-group :options="guaediancilationlist" /> -->
                <ta-radio-group :disabled="nowText!='all'&&nowText!='victimizatByguardians'">
                  <ta-radio @click="deuRadio(item.value,'victimizatByguardians')"
                            :value="item.value"
                            v-for="(item,index) in guaediancilationlist"
                            :key="index">{{item.label}}</ta-radio>
                </ta-radio-group>
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
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
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
          <ta-button icon="rollback"
                     v-if="areaId!=oAreaId"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">

          <ta-table class=" tables table-min-width  hight "
                    :columns="tableColumns"
                    :showOverflowTooltip="false"
                    :dataSource="tableData"
                    :scroll="{ x: 1000,}"
                    bordered>
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel==4 || b.areaName=='合计' || b.isBenJi== 0">{{a}}</span>
              <a @click="searchslist(b,'click')"
                 v-else>{{a}}</a>
            </template>
            <template slot="goStayBehindChildSearch"
                      slot-scope="a, b, c">
              <span v-if=" b.areaName=='合计'">{{b.zongshu}}</span>
              <a @click="toGoStayBehindChildSearch(b,'click')"
                 v-else>{{a}}</a>
            </template>
            <template slot="bfb"
                      slot-scope="a, b, c">
              <span> {{calculate(b)}} </span>
            </template>

          </ta-table>
        </ta-spin>

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
      spinning: null,
      nowText: 'all',
      value: [],
      addressmodel: [],
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
          width: '10%',
          scopedSlots: { customRender: 'areaName' }
        },
        {
          title: '数量',
          dataIndex: 'count',
          align: 'center',
          width: '8%',
          scopedSlots: { customRender: 'goStayBehindChildSearch' }
        },
        {
          title: '占总统计量情况（%）',
          dataIndex: 'now',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'bfb' }
        }
      ],
      areaId: '',
      isConfirm: '',
      areaCode: '',
      mixListOptions: {
        mixGetDataListURL: '/leftBehindChildren/queryLeftBehindChildrenCount',
        mixActivatedIsNeed: false
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
      sexList: [],
      censusregisterList: [],
      schoolingList: [],
      heathlist: [], // 健康状况字典数据
      disabiliytypelist: [], // 残疾类型等字典数据
      canjileave: [], // 残疾等级字典数据
      disabilityTypeValues: [], // 残疾类别选择的数据
      adiscondlist: [],
      schoolList: [],
      guardianlist: [],
      otherSpecialist: [],
      socialWelfarelist: [],
      guaediancilationlist: [],
      heathval: '', // 健康状况选择的值
      issearch: false,
      sfStatus: [{ label: '累计增加', value: '1' }, { label: '已退出', value: '2' }, { label: '本月新增', value: '3' }],
      isConfirmList: [{ label: '全部', value: '' }, { label: '已认领', value: '1' }, { label: '未认领', value: '1' }],
      oAreaId: '',
      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10,
      choesP: []
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('8.7%', '91.3%', 'spilwid1') // 单独一行字段宽度控制
  },
  mounted () {
    this.getDictionarieMore()
    this.getnation() // 健康状况字典上数据
    this.getdisabiliytype() // 残疾类型字典数据
    this.getleave() // 残疾等级字典数据
  },
  activated () {
    this.isConfirm = ''
    this.nowText = 'all'
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.oAreaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.setHeight('one', 'oneout', !this.issearch)

    this.addressmodel = [this.areaId]
    this.searchslist('000')
  },
  methods: {

    reform () {
      this.searchForm.resetFields()
    },
    calculate (b) {
      if (parseInt(b.zongshu) == 0) {
        return '100%'
      } else if (b.areaName === '合计') {
        return '100%'
      } else {
        return (Math.round(parseFloat(b.count) / parseFloat(b.zongshu) * 10000) / 100.00 + '%')
      }
    },
    toGoStayBehindChildSearch (b) {
      this.$router.push({
        name: 'stayBehindChildSearch',
        query: {
          areaLevel: b.areaLevel,
          areaCode: b.areaCode,
          areaId: b.areaId,
          areaIdPath: b.idPath,
          isBenJi: b.isBenJi,
          isConfirm: this.isConfirm
        }
      })
    },

    setaddr () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ // 130000000000/130100000000/130102000000
          address_Linkage: this.addressmodel
        })
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.value = []
      this.mode2 = ['month', 'month']
      this.statisticTimeStart = ''
      this.statisticTimeEnd = ''
      this.nowText = 'all'
      const searchValue = this.searchForm.getFieldsValue()
      this.getlist(searchValue, '000')// 重置查寻处理
    },
    goback () {
      this.addressmodel.splice(-1, 1)
      this.searchslist()
    },
    async getDictionarieMore () {
      this.sexList = await this.getDictionaries('SEX')

      this.censusregisterList = await this.getDictionaries('CENSUSREGISTER')

      this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
      this.adiscondlist = await this.getDictionaries('ADISCONDITION') // 患艾滋情况
      this.schoolList = await this.getDictionaries('SCHOOLSITUATION')// 就学情况
      this.guardianlist = await this.getDictionaries('GUARDIANSHIPTYPE')// 监护类型
      this.otherSpecialist = await this.getDictionaries('OTHERSPECIALCASES')// 其他特殊情况
      this.socialWelfarelist = await this.getDictionaries('SOCIALWELFAREIMPLEMENTATION')// 福利救助帮扶
      this.socialWelfarelist.sort((a, b) => {
        return a.value - b.value
      })
      this.guaediancilationlist = await this.getDictionaries('GUARDIANVIOLATION')// 遭监护人侵害情况
    },
    // 健康狀況字典
    async getnation () {
      const formdata = {
        parentValue: null,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.heathlist = data.data.codeList
    },
    // 残疾类型 DISABILITYTYPE
    async getdisabiliytype (val) {
      const formdata = {
        parentValue: val,
        codeType: 'HEALTH'
      }
      const data = await this.post('dict/queryDictByParentValue', formdata)
      this.disabiliytypelist = data.data.codeList
    },
    // 残疾等级  DISABILITYLEVEL
    async getleave () {
      const data = await this.getDictionaries('DISABILITYLEVEL')
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
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
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
      const formData = this.searchForm.getFieldsValue()

      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      }

      this.changetime(formData)
      if (this.value.length > 0) {
        formData.yearsStart = this.value[0].format('YYYY-MM')
        formData.yearsEnd = this.value[1].format('YYYY-MM')
      }

      if (this.areaId) {
        formData.areaCode = this.areaId
        formData.areaId = this.areaId
      }
      if (this.nowText && this.nowText != 'all') {
        formData.flag = '1'
      } else {
        formData.flag = '0'
      }
      return formData
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

    searchslist (value, type) {
      this.spinning = true
      const searchValue = this.searchForm.getFieldsValue()
      const areaId = ''
      if (searchValue.address_Linkage && searchValue.address_Linkage.length > 0) {
        searchValue.areaId = searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        this.areaId = searchValue.areaId
      } else {
        searchValue.areaId = window.parent.indexTool.getUserInfo().areaId
        this.areaId = searchValue.areaId
      }
      console.log(searchValue.isConfirm)
      if (searchValue.isConfirm) {
        this.isConfirm = searchValue.isConfirm
      }
      console.log(this.isConfirm)

      this.changetime(searchValue)
      if (value == '000') {
        this.issearch = !this.issearch
        this.advancedquery()
      }
      if (!value) {
      } else {
        if (value) {
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

      if (type == 'click') {
        // 点击下转
        this.dealArea(value.idPath)
      }
      this.getlist(searchValue, value)
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
    },
    async getlist (params, value) {
      let res = {}
      if (this.nowText && this.nowText != 'all') {
        params.flag = '1'
      } else {
        params.flag = '0'
      }
      res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data.list
      if (this.issearch) {
        this.advancedquery()
      }
      this.$nextTick(() => {
        this.spinning = false
      })
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

      const url = '/leftOverChild/exportLeftOverChildNum'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },

    async see (val, obj) {
      this.$router.push({
        name: 'stayAtHomeCollection',
        query: {
          jump: 'yes',
          id: obj.id,
          disabled: true
        }
      })
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
      const param = {
        id: obj.id
      }
      console.log(isConfirm, 444)
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
    handleOk (e) {
      this.exports()
      this.showOn = false
    },

    async exports () {
      const ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    changeFirm (e) {
      console.log(e)
    },
    deuRadio (v, a) {
      const b = this.searchForm.getFieldsValue()[a]
      console.log(v, a, b)

      if (b == v) {
        this.$nextTick(() => {
          this.searchForm.setFieldsValue({
            [a]: ''
          })
          this.nowText = 'all'
        })
      } else {
        this.nowText = a
      }
    }
  }

}
</script>
<style lang="scss" scoped>
// ::-webkit-scrollbar {
//   width: 16px; /*滚动条宽度*/
//   height: 16px; /*滚动条高度*/
// }

// /*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   border-radius: 10px; /*滚动条的背景区域的圆角*/
//   background-color: red; /*滚动条的背景颜色*/
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px; /*滚动条的圆角*/
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: green; /*滚动条的背景颜色*/
// }
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
.spilwid2 {
  width: 410px;
}

// /deep/ .ant-table-tbody > tr > td > div {
//   width: unset !important;
// }
// /deep/.borderLayout .header {
//   border-bottom: 14px solid #e4e4e4;
// }

// #tmd /deep/.myCellClass {
//   border-right-color: #8181824d !important;
//   border-right-width: 5px !important;
// }
// #tmd /deep/.myHeaderCellAge {
//   border-right-width: 5px !important;
//   border-right-color: #8181824d !important;
// }

// #tmd /deep/.ant-table-body-inner {
//   //固定列下部滚动条。
//   max-height: calc(100vh - 218px) !important;
//   width: 358px !important;
//   overflow: hidden !important;
// }

#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}

// #tmd /deep/.ant-table-body {
//   overflow-y: scroll !important;
//   max-height: calc(100vh - 210px) !important;
//   // overflow-x: hidden !important;
// }
// #tmd /deep/ .layoutCon {
//   overflow: hidden;
// }
</style>
