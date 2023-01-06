<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="儿童姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="建档日期"
                              fieldDecoratorId="fileTime"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item>
                <AreaQuery :fileldName="'location'"
                           v-if="ishide"
                           :msg="'行政区划'"
                           :ishide="ishide"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           class="spilwid"
                           :addressmodel="addressmodel"
                           @setaddress="setaddress"></AreaQuery>
                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
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
        <!-- <div style="text-align:right;margin-bottom: 10px">
            <ta-button @click="exportFileList" class='exportbtn' icon="upload">导出</ta-button>
          </div> -->
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
          <div slot="action"
               slot-scope="text,obj"
               class="btnlist">
            <span @click="lookDetail(obj)"
                  class="com_textsee">查看</span>
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
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@/scopes/project/common/components/areaQuery'
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '20%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '身份证号',
  //   width: '20%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '15%',
    align: 'center',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '现住址',
    dataIndex: 'location',
    width: '20%'
  },
  {
    title: '建档日期',
    dataIndex: 'fileTime',
    width: '15%',
    align: 'center',
    scopedSlots: { customRender: 'fileTime' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    AreaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      issearch: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childArchives/queryChildArchivesList', // 数据列表接口，API地址
        mixGetDataListIsPage: true // 数据列表接口，是否需要分页？
      },
      ishide: true,
      mixPageRef: 'gridPager',

      addressmodel: [],

      sexList: [], // 性别字典数据
      childTypeList: [] // 儿童类别字典数据

    }
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  activated () {
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
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
      if (formData.location && formData.location.length > 0) {
        let { areaLevel } = window.parent.indexTool.getUserInfo()
        if (areaLevel == '1') { // 省级
          formData['locationPro'] = formData.location[0]
          formData['locationCity'] = formData.location[1]
          formData['locationCounty'] = formData.location[2]
        }
        if (areaLevel == '2') { // 市级
          formData['locationCity'] = formData.location[0]
          formData['locationCounty'] = formData.location[1]
        }
        if (areaLevel == '3') { // 区县级
          formData['locationCounty'] = formData.location[0]
        }

        delete formData.location
      }
      this.changetime(formData)
      return formData
    },
    // 设置地址
    setaddress () {
      this.searchForm.setFieldsValue({
        location: this.addressmodel
      })
    },
    // 查看
    lookDetail (e) {
      // 根据儿童基本信息id获取寄养id
      this.post('/childArchives/queryFosterChildrenIdByChildBaseId', { childBaseId: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$router.push({
            name: 'fileQueryLook',
            query: { childBaseId: e.id, childFosterId: res.data.data }
          })
        }
      })
    },
    // 导出
    exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/addChild/exportAddChildApply', data)
    },

    // 重置
    resetFrom () {
      this.searchForm.resetFields()
      this.maxVal = null
      this.minVal = null
      this.handleSubmit()
    }

  }

}
</script>
