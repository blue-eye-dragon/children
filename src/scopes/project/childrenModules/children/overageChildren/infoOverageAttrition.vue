<template>
  <div class="searchdata">
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
                <ta-form-item label="儿童姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <!-- <ta-form-item label="儿童类别"
                              fieldDecoratorId="childType"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in childTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item> -->
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              style="width:350px"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
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

                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="申请日期"
                              fieldDecoratorId="registerDay"
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
        <div style="margin-top: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="name"
                slot-scope="a,b,c">
            <a @click="childDetail(a,b,c)">{{a}}</a>
          </span>
          <template slot="approveDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <span slot="action"
                slot-scope="a, b, c"
                class="btnlist">
            <span class="com_textsee"
                  @click="look(a,b,c)">查看</span>
          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%',
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '身份证号',
  //   width: '18%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '13%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '13%',
    align: 'center',
    dataIndex: 'birthday'
  },
  // {
  //   title: '儿童类别',
  //   width: '18%',
  //   dataIndex: 'childType',
  //   collectionType: 'CHILDCATEGORYA'
  // },
  {
    title: '减员申请日期',
    width: '13%',
    align: 'center',
    dataIndex: 'registerDate'
  },
  {
    title: '审核通过日期',
    align: 'center',
    width: '13%',
    dataIndex: 'approveDate',
    scopedSlots: { customRender: 'approveDate' }
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
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overAgeFactChildApi/pageOverAgeReductionFactChild' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },

      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据

      type: 1, // 查看和撤销的标识，1为查看，2为撤销,，3为申请

      // 新增/修改弹窗
      visible: false,
      width: '500px',
      confirmLoading: false,
      issearch: false

    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      let typeCode = 'CHILDCATEGORYF'
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用全的
        typeCode = 'CHILDCATEGORYA'
      }
      this.getMenu(typeCode, 'childTypeList') // 获取儿童类别字典数据
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
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.orgId = window.parent.indexTool.getUserInfo().orgId
      this.changetime(formData)
      return formData
    },
    look (text, obj, index) {
      const paramsData = JSON.stringify({
        obj: obj,
        index: index,
        approval: true,
        goType: 'infoChangeReportRecord-see'
      })
      this.$router.push({
        name: 'actualUnaccChildStatuChangeFor',
        query: {
          paramsData
        }
      })
    },
    // 取消点击事件
    handleCancel (e) {
      this.visible = false
      this.modelForm.resetFields()
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 点击姓名查看儿童详情
    childDetail (a, b, c) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 6,
          childtypedisabled: 1,
          id: b.unattendedChildId,
          isdisabled: 1
          // currentStatus: b.status
        }
      })
    }
  }
}
</script>
