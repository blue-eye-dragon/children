<template>
  <div style="height:100%"
       class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <!-- <div class="forms"> -->
      <ta-form layout="inline"
               :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
        <ta-form-item label="姓名"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      class="spilwid"
                      fieldDecoratorId="name">
          <ta-input placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item label="身份证号"
                      :labelCol="{span:7}"
                      :wrapperCol="{span:17}"
                      class="spilwid"
                      fieldDecoratorId="idCard">
          <ta-input placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item>
          <ta-button type="primary"
                     @click="handleSubmit('search')">查询</ta-button>
          <ta-button class="btnleft"
                     @click="resetFrom">重置</ta-button>
          <ta-button class="btnleft"
                     @click="returns">返回</ta-button>
        </ta-form-item>
      </ta-form>
      <!-- </div> -->
      <div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b, c">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birth"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <span slot="action"
                slot-scope="a,b,c"
                class="btnlist">
            <span @click="lookDetail(b)"
                  class="com_textsee">查看</span>
          </span>
        </ta-table>
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
  }, {
    title: '姓名',
    width: '22%',
    dataIndex: 'name'
  }, {
    title: '性别',
    width: '18%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '20%',
    dataIndex: 'birth',
    scopedSlots: { customRender: 'birth' }
  },
  {
    title: '手机号',
    width: '20%',
    dataIndex: 'cellPhone'
  },
  {
    title: '职责范围',
    width: '25%',
    dataIndex: 'dutyBoundary'
  }, {
    title: '操作',
    overflowTooltip: false,
    width: 150,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }]
export default {
  mixins: [listMixin],
  data () {
    return {
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childdirectorandsupervisor/relatedDirector' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      sexList: [], // 性别字典数据
      childrenTypeList: [], // 儿童类别字典数据
      tableColumns,
      listDatas: {} // 儿童主任（督导员）信息维护数据

    }
  },
  activated () {
    this.listDatas = this.$route.query.directorList ? JSON.parse(this.$route.query.directorList) : null
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('sex') // 获取性别字典数据
    },
    // 点击姓名查看儿童详情
    childDetail (e) {
      let _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    },
    // 关联儿童主任信息
    lookDetail (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'look' }
      })
    },
    // 返回
    returns () {
      this.$router.go(-1)
    },
    userPageParams () {
      // 这里返回的对象是分页要一同提交的参数
      let formData = this.searchForm.getFieldsValue()
      formData['dutyBoundaryTown'] = this.listDatas ? this.listDatas.town : null
      this.changetime(formData)
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }

  }
}
</script>
<style scoped>
.forms {
  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
