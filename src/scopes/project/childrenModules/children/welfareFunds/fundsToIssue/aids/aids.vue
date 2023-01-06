<template>
  <!-- =孤儿基本生活费发放 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery msg="区域"
                           class="spilwid"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           v-if="ishide"
                           :addressmodel="addressmodel"
                           @setaddress="setaddress"
                           :disabled="areaDisabled"
                           :fileldName="'areaId'"
                           :ishide.sync="ishide"></AreaQuery>
                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              fieldDecoratorId="name"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="身份证号"
                              style="width:320px"
                              fieldDecoratorId="idCard"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="儿童性别"
                              class="spilwid"
                              fieldDecoratorId="sex"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in sexList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="儿童类别"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="出生日期"
                              style="width:380px"
                              fieldDecoratorId="birthday"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{span: 17 }">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
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
        <div style="margin-bottom: 16px;"></div>
        <!-- <div style="text-align:left;margin-bottom:10px">
          <ta-button type="primary"
                     @click="add">福利资金发放</ta-button>
        </div> -->
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="info(val,obj,index)"
                  class="com_textsee">查看</span>
            <span @click="add(obj)"
                  class="com_continue">福利资金发放记录</span>
          </div>
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
                       ref="gridPager" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
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
    dataIndex: 'areaName',
    width: '16%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '16%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '16%'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    width: '12%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '14%'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    width: '16%'
  },
  {
    title: '最有可能感染艾滋病途径',
    dataIndex: 'mostPossibleWay',
    collectionType: 'TRANSMISSIONWAYOTHER',
    width: '22%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      issearch: false,
      mixDataList: [],
      mixListOptions: {
        mixGetDataListURL: 'orphanLivingExpenses/listOfChildrenStatistics', // 数据列表接口，API地址
        mixActivatedIsNeed: false,
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      tableColumns,
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      ishide: true,
      areaDisabled: window.parent.indexTool.getUserInfo().orgType == '99', // 福利院用户只读并显示当前区划
      addressmodel: [],
      sexList: [],
      adoptionlist: [],
      childId: ''
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
      })
    }
  },
  mounted () {
    this.getsex()
    this.getchildtype()
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    // 福利院用户区域回显当前登录人的
    if (this.areaDisabled) {
      const userInfo = window.parent.indexTool.getUserInfo()
      if (userInfo.areaLevel == '1') { // 省级
        this.addressmodel = [
          userInfo.province || '',
          userInfo.city || '',
          userInfo.county || ''
        ]
      } else if (userInfo.areaLevel == '2') { // 市级
        this.addressmodel = [
          userInfo.city || '',
          userInfo.county || ''
        ]
      } else if (userInfo.areaLevel == '3') { // 县级
        this.addressmodel = [
          userInfo.county || ''
        ]
      }
    }
    this.$nextTick(() => {
      this.handleSubmit()
    })
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 获取儿童类型
    async getchildtype () {
      if (this.areaDisabled) { // 福利院用户
        this.adoptionlist = await this.getDictionaries('CHILDCATEGORYF')
      } else { // 民政局用户
        this.adoptionlist = await this.getDictionaries('CHILDCATEGORYA')
      }
    },
    // 查询地址
    setaddress () {
      this.searchForm.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (this.areaDisabled) { // 福利院用户-默认不传
        delete formData.areaId
      } else { // 民政局用户
        if (formData.areaId && formData.areaId.length > 0) {
          formData.areaId = formData.areaId.slice(-1).toString()
        }
      }
      this.changetime(formData)
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    // --
    add (e) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      this.$router.push({
        path: 'paymentfunds',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          childId: e.childId
        }
      })
    },
    info (val, obj, index) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: obj.beHospitalizedId }),
          operateFlag: 'look_now'
        }
      })
    }
  }
}
</script>
