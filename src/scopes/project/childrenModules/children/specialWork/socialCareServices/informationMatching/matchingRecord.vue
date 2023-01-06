<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer:'80px' }">
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
                           :ishide="true"
                           :labelCol="{span:9}"
                           :wrapperCol="{span:15}"></AreaQuery>
                <ta-form-item label="需求类型"
                              fieldDecoratorId="demandType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid">
                  <ta-select placeholder="请选择需求类型"
                             style="width: 100%;">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item ,index) in demandTypeList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="资源发布方机构名称"
                              fieldDecoratorId="resourceOrgName"
                              :labelCol="{span:13}"
                              :wrapperCol="{span:11}"
                              class="spilwid">
                  <ta-input placeholder="请输入资源发布方机构名称" />
                </ta-form-item>
                <ta-form-item label="需求发布方机构名称"
                              fieldDecoratorId="demandDepartmentName"
                              :labelCol="{span:13}"
                              :wrapperCol="{span:11}"
                              class="spilwid">
                  <ta-input placeholder="请输入需求发布方机构名称" />
                </ta-form-item>
                <ta-form-item label="匹配日期"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="matchDate"
                              style="width:385px">
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
      </div>
      <div style="margin-bottom: 16px;"></div>
      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns"
                :showOverflowTooltip="true"
                :dataSource="mixDataList">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="status"
              slot-scope="a, b, c">
          <span>{{a=='0'?'未提交':(a=='1'?'未匹配':'已匹配')}}</span>
        </span>
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span @click="lookDetail(obj)"
                class="com_textsee">查看</span>
        </div>
      </ta-table>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
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
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
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
    title: '资源发布方机构名称',
    width: '20%',
    dataIndex: 'resourceOrgName'
  },
  {
    title: '资源总量',
    width: '15%',
    dataIndex: 'resourceTotal'
  },
  {
    title: '需求发布方机构名称',
    width: '20%',
    dataIndex: 'demandDepartmentName'
  },
  {
    title: '需求类型',
    width: '20%',
    dataIndex: 'demandType',
    collectionType: 'RESOURCE_TYPE'
  },
  {
    title: '匹配日期',
    width: '15%',
    dataIndex: 'matchDate'
  },
  {
    title: '事项状态',
    width: '12%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    AddressComponent,
    AreaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      areaId: '',
      areaCode: '',
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/socialCareService/matchList', // 数据列表接口，API地址
        mixGetDataListIsPage: true // 数据列表接口，是否需要分页？
      },
      ishide: true,
      mixPageRef: 'gridPager',

      addressmodel: [],

      demandTypeList: [], // 需求类型字典数据
      issearch: false,

    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('RESOURCE_TYPE', 'demandTypeList') // 获取资源类型字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      delete formData.demandTotal
      if (this.minVal) {
        formData['demandTotalStart'] = this.minVal
      }
      if (this.maxVal) {
        formData['demandTotalEnd'] = this.maxVal
      }
      // if (formData.area && formData.area.length > 0) {
      //   formData['areaCode'] = formData.area.slice(-1).toString()
      //   delete formData.area
      // }

      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      }
      if (this.areaId) {
        formData.areaCode = this.areaId
        formData.areaId = this.areaId
      }
      this.changetime(formData)
      return formData
    },
    // 设置地址
    setaddress () {
      this.searchForm.setFieldsValue({
        area: this.addressmodel
      })
    },
    // 重置
    resetFrom () {
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.searchForm.resetFields()
    },
    // 详情
    lookDetail (e) {
      this.$router.push({
        name: 'needsAndResourcesDetail',
        query: { id: e.id }
      })
    }
  }

}
</script>
<style scoped lang="less">
</style>
