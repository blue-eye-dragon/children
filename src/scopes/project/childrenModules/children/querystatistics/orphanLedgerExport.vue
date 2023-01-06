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
              <AreaQuery class="spilwid1"
                         v-if="!ishides"
                         msg="区域"
                         :ishide="false"
                         :labelCol="{span:8}"
                         :wrapperCol="{span:16}"
                         :addressmodel="addressmodel"
                         @adsvalchange="adsvalchange"
                         @setaddress="setaddress"></AreaQuery>
              <ta-form-item label="福利机构"
                            fieldDecoratorId="welfareOrgId"
                            class="spilwid1"
                            :labelCol="{span:8}"
                            :wrapperCol="{span:16}"
                            v-if="!ishides">
                <!--  多选 mode="multiple" -->
                <ta-select showSearch
                           :disabled="disabled"
                           optionFilterProp="children"
                           :filterOption="filterOption"
                           :placeholder="disabled?'请先选择区域':'请选择福利机构'"
                           style="width : 100%">
                  <ta-select-option :value="item.taorgId"
                                    v-for="(item,index) in welfareOrgNameList"
                                    :key="index">{{item.orgName}}</ta-select-option>
                </ta-select>
              </ta-form-item>
              <ta-form-item label="姓名"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{span:16}"
                            class="spilwid1"
                            fieldDecoratorId="childName">
                <ta-input placeholder="请输入姓名"
                          style="width : 100%" />
              </ta-form-item>
              <ta-form-item label="享受年月"
                            fieldDecoratorId="startDate"
                            class="spilwid1"
                            :labelCol="{span:8}"
                            :wrapperCol="{span:16}">
                <ta-month-picker style="width : 100%" />
              </ta-form-item>
              <ta-form-item label="身份证号"
                            class="spilwid1"
                            :labelCol="{span:8}"
                            :wrapperCol="{span:16}"
                            fieldDecoratorId="childIdCard">
                <ta-input placeholder="请输入身份证号" />
              </ta-form-item>

              <div class="cbox">
                <span style="font-size: 16px">儿童类别：</span>
                <ta-checkbox :indeterminate="indeterminate"
                             @change="onCheckAllChange"
                             :checked="checkAll">全部</ta-checkbox>
                <ta-checkbox-group :options="plainOptions"
                                   @change="onChange"
                                   :value="checkedList" />
              </div>
            </ta-form>
            <div class="searchbtn searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchs">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft"
                         @click="advancedquery">高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button>
            </div>
            <!-- <div class="searchbtn searchButton"
             style="top:14px;">
          <ta-button type="primary"
                     class="search"
                     icon="search"
                     @click="searchs">查询</ta-button>
          <ta-button class="btnleft reset"
                     icon="reload"
                     @click="resetFrom">重置</ta-button>
        </div> -->
          </div>
        </div>
        <div>
          <div style="text-align:right;margin-bottom: 10px"
               v-if="isMinistry">
            <ta-button class="btnleft exportbtn"
                       icon="upload"
                       @click="exports">导出</ta-button>
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
          <div class="titlecont">
            <p class="titles">
              <span v-if="areaname!=''">
                {{areaname}}-
              </span>
              日常工作花名册
            </p>
            <p class="times">享受年月：{{yeartext}}</p>
            <p class="types">儿童类别：{{typetext}}</p>
          </div>
        </div>

        <!-- <div class="tableout"> -->
        <ta-table bordered
                  class="table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="name"
                slot-scope="a, b, c">
            <a @click="childDetail(b)">{{a}}</a>
          </span>
        </ta-table>
      </div>

      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    AddressComponent
  },
  data () {
    const tableColumns = [
      {
        title: '序号',
        dataIndex: 'serialNum',
        align: 'center',
        width: 70,
        scopedSlots: { customRender: 'num' }
      },
      {
        title: '儿童编号',
        width: 100,
        dataIndex: 'childNumber',
        overflowTooltip: true
      },
      {
        title: '姓名',
        width: 80,
        dataIndex: 'name',
        overflowTooltip: true,
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '性别',
        width: 70,
        dataIndex: 'sex',
        overflowTooltip: true,
        collectionType: 'sex'
      },
      {
        title: '出生日期',
        width: 100,
        dataIndex: 'birthday',
        overflowTooltip: true
      },
      {
        title: '儿童类别',
        width: 100,
        dataIndex: 'childType',
        collectionType: 'CHILDCATEGORYA',
        overflowTooltip: true
      },
      {
        title: '所属机构',
        width: 100,
        dataIndex: 'orgName',
        overflowTooltip: true
      },
      {
        title: '登记日期',
        width: 100,
        dataIndex: 'registerDate',
        overflowTooltip: true
      },
      //   {
      //     title: '养育类型',
      //     width: 100,
      //     dataIndex: 'bringUpType',
      //     collectionType: 'REARINGTYPE',
      //     overflowTooltip: true,
      //   },
      //   {
      //     title: '福利证号',
      //     width: 100,
      //     dataIndex: 'welfareNumber',
      //     overflowTooltip: true
      //   },
      //   {
      //     title: '户籍性质',
      //     width: 100,
      //     dataIndex: 'censusRegister',
      //     collectionType: 'CENSUSREGISTER',
      //     overflowTooltip: true,
      //   },
      {
        title: '儿童户籍地',
        width: 120,
        dataIndex: 'currentAddressDetailAll',
        overflowTooltip: true
      },
      {
        title: '起领年月',
        width: 100,
        dataIndex: 'startTime',
        overflowTooltip: true
      },
      {
        title: '监护人',
        width: 90,
        dataIndex: 'guardianName',
        overflowTooltip: true
      },
      {
        title: '联系电话',
        width: 100,
        dataIndex: 'guardianPhone',
        overflowTooltip: true
      }
    ]
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/orphanLivingExpenses/queryOrphanAccountInfo', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishides: window.parent.indexTool.getUserInfo().orgType == '99',
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      indeterminate: false, // 半选初始状态
      checkAll: true, // 全选初始状态
      plainOptions: [], // checkboxgroup数据
      checkedList: [],
      yeartext: '',
      typetext: '全部',
      issearch: false,
      addressmodel: [],
      isbu: false,
      nowcode: '',
      showOn: false,
      areaname: '',
      sexList: [],
      rearList: [],
      censList: [],
      welfareOrgNameList: [], // 福利机构字典数据
      isMinistry: window.parent.indexTool.getUserInfo().areaLevel != 0, // 是否是部级用户
      disabled: true // 福利机构查询的只读控制
    }
  },
  activated () {
    this.loadData()
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {

    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.childEnterId }), operateFlag: 'look_now' }
      })
    },
    // 获取福利机构数据
    getWelfareOrgNameList () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ welfareOrgId: undefined })
        const addressAttr = this.searchForm.getFieldsValue().address_Linkage
        if (addressAttr && addressAttr.length > 0) {
          this.post('welfareOrgManagement/queryWelfareOrgsByareaId', { areaId: addressAttr[addressAttr.length - 1] }).then((res) => {
            if (res.serviceSuccess) {
              this.welfareOrgNameList = res.data.data || []
            }
          })
          this.disabled = false
        } else {
          this.welfareOrgNameList = []
          this.disabled = true
        }
      })
    },
    exports () {
      this.showOn = true
    },
    Excel () {
      var data = this.userPageParams()
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      this.exportFile('/orphanLivingExpenses/queryOrphanAccountInfo', data)
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
      // 根据区域获取福利机构名称
      this.getWelfareOrgNameList()
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
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
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
    loadData () {
      this.setHeight('one', 'oneout', !this.issearch)
      this.$nextTick(() => {
        // 获取区域名称
        this.getareaname()
      })
      this.getWelfareOrgNameList()
      this.disabled = true
      this.addressmodel = []
      this.value = [] // 查询条件起领年月
      this.indeterminate = false // 半选初始状态
      this.checkAll = true // 全选初始状态
      this.checkedList = []
      this.getchildtype()
      this.typetext = '全部'
      this.showOn = false
      const nowDate = new Date()
      const nowyear = nowDate.getFullYear()
      const nowmonth = parseInt(nowDate.getMonth()) + 1
      this.yeartext = nowyear + '-' + nowmonth
    },
    searchs () {
      if (this.searchForm.getFieldsValue().startDate) {
        this.yeartext = moment(this.searchForm.getFieldsValue().startDate).format('YYYY-MM')
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
      this.handleSubmit()
    },
    async getareaname () {
      const data = await this.getarealabel(this.nowcode)
      if (data) {
        this.areaname = data.areaName
      } else {
        this.areaname = ''
      }
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    getMenuDatas () {
      this.getMenu('sex', 'sexList')
      this.getMenu('CHILDCATEGORYA', 'childtypeList')
      this.getMenu('REARINGTYPE', 'rearList')
      this.getMenu('CENSUSREGISTER', 'censList')
    },
    // 获取儿童类型
    async getchildtype () {
      let dictCode = 'CHILDCATEGORYA'
      if (window.parent.indexTool.getUserInfo().orgType == '99') { // 福利院用自己的字典
        dictCode = 'CHILDCATEGORYF'
      }
      const data = await this.getDictionaries(dictCode)
      this.plainOptions = data
      this.plainOptions.map((item) => {
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
      formData.childType = this.checkedList.join(',')
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (formData.startDate) {
        formData.startDate = moment(formData.startDate).format('YYYY-MM')
      }
      return formData
    },
    resetFrom () {
      this.value = []
      this.checkedList = []
      this.welfareOrgNameList = []
      this.disabled = true
      this.indeterminate = false
      this.searchForm.resetFields()
      // 全选
      this.checkAll = true
      this.checkedList = []
      this.plainOptions.map(item => {
        this.checkedList.push(item.value)
      })

      this.setaddress()
      setTimeout(() => {
        this.searchs()
      }, 500)
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
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 995px;
}
.searchbtn {
  width: 300px;
  position: absolute;
  right: 0;
  top: 60px;
}
.searchfroms {
  width: calc(100% - 330px);
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
  display: flex;
  margin-bottom: 12px;
  margin-left: 29px;
  width: 118%;
}
/deep/ .tableout td > div {
  width: unset !important;
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
// .spilwid1 {
//   width: 900px;
// }
.spilwid2 {
  width: 410px;
}
</style>
