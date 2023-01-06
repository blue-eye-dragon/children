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
                <AreaQuery class='spilwid'
                           :ishide="ishide"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           msg="区域"
                           v-if="userAreaLevel !='2'"></AreaQuery>
                <ta-form-item label="机构名称"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="orgName"
                              class='spilwid'>
                  <ta-input placeholder="请输入机构名称" />
                </ta-form-item>

                <ta-form-item label="类型"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class='spilwid'
                              :fieldDecoratorOptions="{initialValue: ''}"
                              fieldDecoratorId="operationType">
                  <ta-select placeholder="请选择性质">
                    <ta-select-option value=''>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in operType"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="登记日期"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="operationDate"
                              class='spilwid3'>
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
                     @click="add">新增分立/合并/解散登记</ta-button>

        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj"
               class="btnlist">
            <span @click="edit(obj)"
                  v-if="obj.editStatus =='1'"
                  class="com_textedit">编辑</span>
            <!-- <ta-divider type="vertical"
                        v-if="obj.editStatus =='1'" /> -->
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
    dataIndex: 'areaName'
  },

  {
    title: '类型',
    width: '26%',
    dataIndex: 'operationType',
    collectionType: 'OPERATIONTYPE'
  },
  {
    title: '机构名称',
    width: '26%',
    dataIndex: 'orgName'
  },
  {
    title: '登记日期',
    width: '22%',
    dataIndex: 'operationDate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    overflowTooltip: false,
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
      operType: [],
      ishide: true,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/welfareInstitutionChanges/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      userAreaLevel: '',
      issearch: false
    }
  },
  mounted () {
    this.getoperType()
    this.getUserInfo()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    add () {
      this.$router.push({
        name: 'orgDiscreteOrCombineRegister'
      })
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    async getoperType () {
      let data = await this.getDictionaries('OPERATIONTYPE')
      console.log(data)
      this.operType = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 获取当前登录用户的信息
    async getUserInfo () {
      // 区划级别
      let data = window.parent.indexTool.getUserInfo().areaLevel
      this.userAreaLevel = data
    },
    edit (obj) {
      console.log(obj)
      if (obj.operationType == '1') {
        this.$router.push({
          name: 'orgDiscreteOrCombineRegister',
          query: {
            id: obj.id,
            disabled: false,
            ifdisabled: true,
            nowkey: '1',
            iscombineFormShow: true,
            isdissolveFormShow: true
          }
        })
      }
      if (obj.operationType == '2') {
        this.$router.push({
          name: 'orgDiscreteOrCombineRegister',
          query: {
            id: obj.id,
            disabled: false,
            ifdisabled: true,
            nowkey: '2',
            isdiscreteShow: true,
            isdissolveFormShow: true
          }
        })
      }
      if (obj.operationType == '3') {
        this.$router.push({
          name: 'orgDiscreteOrCombineRegister',
          query: {
            id: obj.id,
            disabled: false,
            ifdisabled: true,
            nowkey: '3',
            isdiscreteShow: true,
            iscombineFormShow: true
          }
        })
      }
    },
    see (obj) {
      if (obj.operationType == '1') {
        this.$router.push({
          name: 'orgDiscreteOrCombineRegister',
          query: {
            id: obj.id,
            disabled: true,
            nowkey: '1',
            iscombineFormShow: true,
            isdissolveFormShow: true
          }
        })
      }
      if (obj.operationType == '2') {
        this.$router.push({
          name: 'orgDiscreteOrCombineRegister',
          query: {
            id: obj.id,
            disabled: true,
            nowkey: '2',
            isdiscreteShow: true,
            isdissolveFormShow: true
          }
        })
      }
      if (obj.operationType == '3') {
        this.$router.push({
          name: 'orgDiscreteOrCombineRegister',
          query: {
            id: obj.id,
            disabled: true,
            nowkey: '3',
            isdiscreteShow: true,
            iscombineFormShow: true
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>
