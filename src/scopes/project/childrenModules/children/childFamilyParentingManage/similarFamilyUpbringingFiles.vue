<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="儿童姓名"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="name"
                          class="spilwid">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="idCard"
                          class="spilwid3">
              <ta-input placeholder="请输入身份证号" />
            </ta-form-item>
            <!-- <ta-form-item label="儿童类别"
                          fieldDecoratorId="childType"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select allowClear
                         placeholder="请选择儿童类别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="item in childTypeList"
                                  :title="item.label"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item> -->
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
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="birthday"
                slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <span slot="createDate"
                slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee btnleft"
                  @click="look(obj)">详情</span>
          </div>
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
                       :ref="mixPageRef" />

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
    title: '儿童编号',
    dataIndex: 'childNum',
    width: '15%'

  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '15%',
    scopedSlots: { customRender: 'name' }

  },
  // {
  //   title: '身份证号',
  //   width: '13%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birth',
    align: 'center',
    width: '12%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '15%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '登记（增员）日期',
    dataIndex: 'createDate',
    align: 'center',
    width: '18%',
    scopedSlots: { customRender: 'createDate' }
  },
  {
    title: '类家庭养育次数',
    width: '17%',
    align: 'center',
    dataIndex: 'rearCount'

  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: '10%',
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
        mixGetDataListURL: '/familyLikeRear/getRearList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      childTypeList: [] // 儿童类别字典数据
    }
  },
  activated () {
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    async getMenuDatas () {
      let typeCode = 'CHILDCATEGORYF'
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用全的
        typeCode = 'CHILDCATEGORYA'
      }
      this.childTypeList = await this.getDictionaries(typeCode) // 获取儿童类别字典数据
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'similarFamilyUpbringingList',
        query: { childId: e.childId }
      })
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
.addbtn {
  margin-right: 15px;
}
.spilwid3 {
  width: 350px;
}
</style>
