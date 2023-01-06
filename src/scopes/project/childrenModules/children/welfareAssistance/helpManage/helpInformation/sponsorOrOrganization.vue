<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="助养人/组织"
                          class='spilwid'
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="sponsorOrOrganizeName">
              <ta-input />
            </ta-form-item>
            <ta-form-item label="助养类型"
                          class='spilwid'
                          fieldDecoratorId="sponsorshipType"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择助养类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item ,index) in sponsorshipType "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item v-show="false"
                          fieldDecoratorId="additionalYesOrNo"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :fieldDecoratorOptions="{initialValue: '0'}">
              <ta-input />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     @click="addAdoption">新增</ta-button>
        </div>
        <ta-table bordered
                  class="tables"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="gorecord(obj,index, 1)"
                  class="com_textedit">查看</span>
            <span @click="gorecord(obj,index, 2)"
                  v-if="obj.mark=='true'"
                  class="com_textedit"> 编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.mark=='true'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>

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
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '申请日期',
    dataIndex: 'applicationDate'
  },
  {
    title: '助养人/组织',
    dataIndex: 'sponsorOrOrganizeName'
  },
  {
    title: '助养方类型',
    dataIndex: 'sponsorPartyType',
    collectionType: 'SPONSORPARTYTYPE'
  },
  {
    title: '助养儿童意向',
    dataIndex: 'sponsorshipIntention',
    // 列表形式加此代码
    collectionType: 'SPONSORSHIPINTENTION'
  },
  {
    title: '助养类型',
    dataIndex: 'sponsorshipType',
    collectionType: 'SPONSORSHIPTYPE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  // name: 'sponsorOrOrganization',
  data () {
    return {
      nowkey: '1',
      tableColumns,
      tableData: [],
      sponsorshipType: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/sponsorship/list', // 数据列表接口，API地址
        // 删除接口
        mixDeleteURL: '/sponsorship/updateDelStateById'
      },
      mixPageRef: 'gridPager'
    }
  },
  filters: {
    markfilter (val) {
      switch (val) {
        case 'true':
          return '编辑'

        case 'false':
          return ''
      }
    },
    markfilter2 (val) {
      switch (val) {
        case 'true':
          return '删除'

        case 'false':
          return ''
      }
    }
  },
  activated () {
    // this.loadData()
  },
  mounted () {
    this.getHelpType()
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 获取助养类型
    async getHelpType () {
      const data = await this.getDictionaries('SPONSORSHIPTYPE')
      this.sponsorshipType = data
    },
    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'sponsorInfo',
        query: {
          nowkey: '1'
        }
      })
    },
    // 查看是1 编辑是2
    gorecord (obj, index, optype) {
      if (obj.sponsorPartyType == '1') {
        // nowkey= 1
        this.$router.push({
          path: 'sponsorInfo',
          query: {
            id: obj.sponsorshipId,
            nowkey: '1',
            type: obj.sponsorPartyType,
            isorgShow: true,
            disabled: optype == 1,
            isdisabled: optype == 1
          }
        })
      }
      if (obj.sponsorPartyType == '2') {
        // nowkey = 2
        this.$router.push({
          path: 'sponsorInfo',
          query: {
            id: obj.sponsorshipId,
            nowkey: '2',
            type: obj.sponsorPartyType,
            ispersonShow: true,
            disabled: optype == 1,
            isdisabled: optype == 1
          }
        })
      }
    },
    continueprocessing (obj) {
      this.$router.push({
        name: 'registration',
        query: {
          id: obj.id,
          handleType: obj.mark,
          additionalYesOrNo: '0'
        }
      })
    },
    // 单个删除
    async deletes (val, obj, index) {
      const params = {
        sponsorshipId: obj.sponsorshipId,
        type: obj.sponsorPartyType
      }
      const data = await this.post(this.mixListOptions.mixDeleteURL, params)
      if (data.errors === null) {
        this.$message.success('删除成功')
        if (
          this.mixListOptions.mixActivatedIsNeed &&
          this.mixListOptions.mixGetDataListIsPage
        ) {
          this.handleSubmit()
        } else if (
          this.mixListOptions.mixActivatedIsNeed &&
          !this.mixListOptions.mixGetDataListIsPage
        ) {
          this.getlist()
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
