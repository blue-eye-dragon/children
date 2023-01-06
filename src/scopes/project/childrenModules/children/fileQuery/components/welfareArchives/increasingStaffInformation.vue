<template>
  <div>
    <ta-table bordered
              class="tables table-min-width"
              style="padding-top: 17px;"
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '12%'
  },
  //   {
  //     title: '身份证号',
  //     width: '15%',
  //     dataIndex: 'idCard'
  //   },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '10%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '15%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '所属福利机构或民政部门',
    dataIndex: 'orgName',
    width: '18%'
  },
  {
    title: '登记（增员）日期',
    dataIndex: 'registerDate',
    width: '14%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '起领年月',
    width: '10%',
    dataIndex: 'startTime'
  },
  {
    title: '状态',
    width: '7%',
    dataIndex: 'currentStatus'
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
  props: ['childBaseId'],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childArchives/queryAddChildInfo' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值

    }
  },
  mounted () {
  },
  updated () {
    console.log('这是update方法。。。')
    this.$emit('getIncreaseDatas', JSON.stringify(this.mixDataList))
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      console.log('这是增员的userPageParams')
      return { childBaseId: this.childBaseId }
    },
    // 查看详情
    look (e) {
      this.$emit('increaseLook', e.id)
    }
  }
}
</script>
<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
