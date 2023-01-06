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
            <ta-form-item label="助养儿童"
                          class='spilwid'
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="sponsorshipChildren">
              <ta-input />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <ta-table bordered
                  class="tables"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <template slot="sponsorOrOrganizeName"
                    slot-scope="a, b, c">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
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
    title: '助养人/组织',
    dataIndex: 'sponsorOrOrganizeName',
    scopedSlots: { customRender: 'sponsorOrOrganizeName' }
  },
  {
    title: '助养方类型',
    dataIndex: 'sponsorPartyType',
    collectionType: 'SPONSORPARTYTYPE'
  },
  {
    title: '助养儿童',
    dataIndex: 'sponsorshipChildren'
  },
  {
    title: '助养确定日期',
    dataIndex: 'determineDate'
  },
  {
    title: '助养开始日期',
    dataIndex: 'startDate'
  },
  {
    title: '助养结束日期',
    dataIndex: 'endDate'
  },
  {
    title: '助养状态',
    dataIndex: 'sponsorshipStatus'
  },
  {
    title: '助养解除原因',
    dataIndex: 'removeReason'
  },
  {
    title: '助养解除日期',
    dataIndex: 'removeDate'
  }
]

export default {
  mixins: [listMixin],
  name: 'helpRecord',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/sponsorshipRelation/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  mounted () { },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    addAdoption (e, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'helpRelation'
      })
    },
    childDetail (obj) {
      if (obj.sponsorPartyType == '1') {
        this.$router.push({
          path: 'sponsorInfo',
          query: {
            url: '/sponsorshipRelation/queryById',
            id: obj.sponsorshipHistoryId,
            nowkey: '1',
            type: obj.sponsorPartyType,
            disabled: true,
            isdisabled: true,
            isorgShow: true
          }
        })
      }
      if (obj.sponsorPartyType == '2') {
        this.$router.push({
          path: 'sponsorInfo',
          query: {
            url: '/sponsorshipRelation/queryById',
            id: obj.sponsorshipHistoryId,
            nowkey: '2',
            type: obj.sponsorPartyType,
            disabled: true,
            isdisabled: true,
            ispersonShow: true
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
