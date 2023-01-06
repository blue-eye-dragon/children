<template>
  <div>
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"
             class="formclass">
      <ta-form-item label="救助申请日期"
                    fieldDecoratorId="resuceApplyTime"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-range-picker />
      </ta-form-item>
      <ta-form-item label="结账申请日期"
                    fieldDecoratorId="checkoutApplyTime"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-range-picker />
      </ta-form-item>
      <ta-form-item>
        <div class="searchButton">
          <ta-button class="search "
                     icon="search"
                     @click="handleSubmit('search')">查询</ta-button>
          <ta-button class="btnleft reset"
                     icon="reload"
                     @click="resetFrom">重置</ta-button>
        </div>

      </ta-form-item>
    </ta-form>
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
           slot-scope="text,obj,index"
           class="btnlist">
        <span @click="look(obj,index)"
              class="com_textsee">查看</span>
      </div>
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
    title: '救助申请日期',
    dataIndex: 'resuceApplyTime',
    width: '13%'
  },
  {
    title: '救治病种类型',
    dataIndex: 'diseaseSpeciesType',
    collectionType: 'DISEASETYPE',
    width: '14%'
  },
  {
    title: '救治病种名称',
    dataIndex: 'diseaseSpeciesName',
    width: '15%'
  },
  {
    title: '当前状态',
    dataIndex: 'currentStatus',
    width: '14%'
  },
  {
    title: '结账状态',
    dataIndex: 'settlementStatus',
    width: '13%'
  },
  {
    title: '结账申请日期',
    dataIndex: 'checkoutApplyTime',
    width: '13%'
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
  props: ['childBaseId'],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childArchives/queryMedicalRescueInfoByChildBaseId' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值

    }
  },
  mounted () {
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData['childBaseId'] = this.childBaseId
      return formData
    },
    // 查看详情
    look (e, index) {
      this.$emit('medicalAssistanceLook', e, index)
    }
  }
}
</script>
<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.formclass {
  padding: 1% 0;
}
</style>
