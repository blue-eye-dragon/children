<template>
  <div class="searchdata"
       id="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery v-if="ishide"
                     class="spilwid"
                     :ishide.sync="ishide"
                     :addressmodel="addressmodel"
                     @setaddress="setaddress"
                     msg="区域"></AreaQuery>
          <ta-form-item class="spilwid"
                        label="机构名称"
                        fieldDecoratorId="orgName"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-input />
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="机构分类"
                        fieldDecoratorId="orgSort"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-select placeholder="请选择机构分类">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in orgSort"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="机构类型"
                        fieldDecoratorId="orgType"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-select placeholder="请选择机构类型">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in orgType"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="机构性质"
                        fieldDecoratorId="orgNature"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-select placeholder="请选择机构性质">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in orgNature"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft exportbtn"
                       @click="exports">导出</ta-button>
          </ta-form-item>
        </ta-form>
        <div class='titlecont table-min-width'>
          <p class="titles">
            <span v-if="areaname!=''">
              {{areaname}}-
            </span>
            福利机构统计报表</p>
        </div>
        <div class="tableout">
          <ta-table bordered
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="tableData">
            <!-- <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span> -->
          </ta-table>
        </div>
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
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
        title: '区域',
        dataIndex: 'areaName',
        width: '10%'
      },
      {
        title: '机构分类',
        dataIndex: 'orgSort',
        width: '10%',
        collectionType: 'ORGSORT'
      },
      {
        title: '单位编码',
        dataIndex: 'orgCode',
        width: '10%'
      },
      {
        title: '机构名称',
        dataIndex: 'orgName',
        width: '10%'
      },
      {
        title: '机构类型',
        dataIndex: 'orgType',
        width: '10%',
        collectionType: 'INSTITUTIONALTYPE'
      },
      {
        title: '机构性质',
        dataIndex: 'orgNature',
        width: '10%',
        collectionType: 'INSTITUTIONPROPERTY'
      },
      {
        title: '登记机关',
        dataIndex: 'registerOrg',
        width: '10%',
        collectionType: 'REGISTRATIONAUTHORITY'
      },
      {
        title: '成立时间',
        dataIndex: 'foundDate',
        width: '7%'
      },
      {
        title: '院址',
        dataIndex: 'address',
        width: '7%'
      },
      {
        title: '邮政编码',
        dataIndex: 'postCode',
        width: '10%'
      },
      {
        title: '电话',
        dataIndex: 'tel',
        width: '10%'
      },
      {
        title: '占地面积（m²）',
        dataIndex: 'areaCovered',
        width: '14%'
      }
    ]
    return {
      ishide: true,
      indeterminate: false, // 半选初始状态
      checkAll: false, // 全选初始状态
      plainOptions: [],
      checkedList: [],
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: 'welfareOrgManagement/listForStatistics',
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      typetext: '全部',
      exportdata: {},
      showOn: false,
      addressmodel: [],
      isbu: false,
      nowcode: '',
      areaname: '',
      orgType: '',
      orgNature: '',
      orgSort: ''

    }
  },
  activated () {
    // this.loadData()
    console.log(window.parent.indexTool.getUserInfo())

    if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
      this.isbu = true
      this.nowcode = '110000000000'
      this.$nextTick(() => {
        this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '110000000000')
      })
    } else {
      this.isbu = false
      this.$nextTick(() => {
        this.nowcode = window.parent.indexTool.getUserInfo().areaCode
        this.areaname = window.parent.indexTool.getUserInfo().areaName
        this.addressmodel.push(this.nowcode)
      })
    }
  },
  mounted () {
    this.getorgSort()
    this.getorgType()
    this.getorgNature()
  },
  methods: {
    loadData () {
      this.value = []// 查询条件起领年月
      this.indeterminate = false// 半选初始状态
      this.checkAll = false // 全选初始状态
      this.checkedList = []
      this.typetext = '全部'
      this.searchForm.resetFields()
    },
    // 机构分类
    async getorgSort () {
      let data = await this.getDictionaries('ORGSORT')
      this.orgSort = data
    },
    // 机构类型
    async getorgType () {
      let data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.orgType = data
    },
    // 机构性质
    async getorgNature () {
      let data = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.orgNature = data
    },
    // 获取label
    getlabel () {
      let arr = []
      this.checkedList.map(item => {
        this.plainOptions.map(val => {
          if (val.value == item) {
            arr.push(val.label)
          }
        })
      })
      return arr.join('、')
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    Excel () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      console.log(formData)
      formData.fundType = this.checkedList.join(',')
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      this.exportdata = formData
      this.exportdata.pageNumber = this.page
      this.exportdata.pageSize = this.size
      // this.exportdata.excelTitle = this.areaname + '-福利机构统计报表'
      this.exportFile('/welfareOrgManagement/exportOrgList', this.exportdata)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    exports () {
      this.showOn = true
    },
    userPageParams () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      console.log(formData)
      formData.fundType = this.checkedList.join(',')
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      console.log(formData)
      return formData
    },
    resetFrom () {
      this.checkedList = []
      this.checkAll = false
      this.indeterminate = false
      this.searchForm.resetFields()
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style scoped lang="less">
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
.cbox {
  display: flex;
  margin-bottom: 12px;
}
</style>
