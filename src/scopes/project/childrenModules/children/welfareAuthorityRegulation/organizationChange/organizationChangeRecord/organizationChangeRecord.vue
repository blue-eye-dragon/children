<template>
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
                <AreaQuery :ishide="ishide"
                           class='spilwid'
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           msg="区域"
                           v-if="userAreaLevel != '2'"></AreaQuery>

                <ta-form-item label="机构名称"
                              fieldDecoratorId="orgName"
                              class='spilwid'
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder='请输入机构名称' />
                </ta-form-item>
                <ta-form-item label="变更人"
                              fieldDecoratorId="orgEstablishBidPerson"
                              class='spilwid'
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder='请输入变更人' />
                </ta-form-item>
                <ta-form-item label="变更日期"
                              class='spilwid3'
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="orgEstablishBidDate">
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
        <div class="operateBtn">
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增变更登记</ta-button>

        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ pageSize * (pageNum - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <!-- <span>{{obj}}</span> -->
            <span @click="see(obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
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
    </ta-border-layout>
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
    width: '26%',
    dataIndex: 'area'
  },
  {
    title: '机构名称',
    width: '26%',
    dataIndex: 'orgName'
  },
  {
    title: '变更人',
    width: '26%',
    dataIndex: 'orgEstablishBidPerson'
  },
  {
    title: '变更日期',
    width: '22%',
    dataIndex: 'orgEstablishBidDate'
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
  mixins: [listMixin],
  name: 'organizationChangeRecord',
  components: {
    AreaQuery
  },
  data () {
    return {
      ishide: true,
      userAreaLevel: '',
      tableColumns,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      mixListOptions: {
        mixGetDataListURL: '/welfareOrgChangeManagement/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      issearch: false
    }
  },
  mounted () {
    this.getUserInfo()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    add () {
      this.$router.push({
        name: 'organizationChangeRegister',
        query: {

        }

      })
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 获取当前登录用户的信息
    async getUserInfo () {
      // 区划级别
      let data = window.parent.indexTool.getUserInfo().areaLevel
      this.userAreaLevel = data
    },
    pagechange (page, size) {
      this.pageNum = page
      this.pageSize = size
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        let idx = formData.address_Linkage.length - 1
        formData.areaCode = formData.address_Linkage[idx]
        delete formData.address_Linkage
      }
      this.changetime(formData)
      return formData
    },
    see (obj) {
      this.$router.push({
        name: 'organizationChangeRegister',
        query: {
          id: obj.id,
          disabled: true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>
