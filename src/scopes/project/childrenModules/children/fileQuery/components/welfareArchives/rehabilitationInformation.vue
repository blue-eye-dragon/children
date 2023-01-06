<template>
  <div>
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"
             class="formclass">
      <ta-form-item label="康复批次"
                    fieldDecoratorId="rehabilitBatches"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-input />
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
        <span @click="look(obj)"
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
    title: '姓名',
    dataIndex: 'name',
    width: '13%'
  },
  {
    title: '康复批次',
    dataIndex: 'rehabilitBatches',
    collectionType: 'DISEASETYPE',
    width: '14%'
  },
  {
    title: '康复类型',
    dataIndex: 'rehabilitTypes',
    width: '15%'
  },
  {
    title: '患病类型',
    dataIndex: 'typeOfIllness',
    width: '14%'
  },
  {
    title: '残疾类型',
    dataIndex: 'disabilityType',
    width: '13%'
  },
  {
    title: '康复治疗机构',
    dataIndex: 'rehabilitOrg',
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
        mixGetDataListURL: '/childArchives/queryRehabilitationInfoByChildEnterId' // 数据列表接口，API地址
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
    look (e) {
      this.$emit('rehabilitationLook', e.id)
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
