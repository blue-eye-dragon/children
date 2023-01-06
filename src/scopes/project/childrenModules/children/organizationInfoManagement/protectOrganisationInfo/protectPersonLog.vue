<template>
  <div class="searchdata">
    <ta-table
    :columns="tableColumns"
    :dataSource="mixDataList"
     class="table-min-width"
    :showOverflowTooltip="true"
    bordered>
      <span slot="num" slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <span slot="birthday" slot-scope="a, b, c">
        <span>{{a.substring(0,10)}}</span>
      </span>
    </ta-table>
    <ta-pagination
      class='pagination'
      showSizeChanger
      showQuickJumper
      :dataSource.sync="mixDataList"

      :params="userPageParams"
      @change="pagechange"
      :url="mixListOptions.mixGetDataListURL"
      :ref="mixPageRef"
    />
  </div>
  <!-- </ta-border-layout>
  </div>-->
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { format } from 'path'
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
    width: '12%',
    dataIndex: 'chairmanName'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '12%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '12%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '学历',
    dataIndex: 'education',
    width: '12%',
    collectionType: 'DEGREEEDUCATION'
  },
  {
    title: '专业',
    width: '12%',
    dataIndex: 'major'
  },
  {
    title: '职称',
    width: '12%',
    dataIndex: 'title',
    collectionType: 'title'
  },
  {
    title: '是否法定代表人',
    width: '12%',
    dataIndex: 'legalRepresentativeYOrN',
    collectionType: 'YESNO'
  }
]

const tableData = [
  {
    name2: '9846841874561574654865000',
    name: '哈喽',
    age: '22',
    sex: '1',
    2: '2019-12-1',
    4: '好学生',
    5: '1994.8'
  },
  {
    key: '2',
    sex: '2',
    name: '小孩',
    age: 42,
    address: 'London No. 1 Lake Park',
    action: 0
  },
  {
    key: '3',
    sex: '0',
    name: '儿童',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    action: 1
  }
]

export default {
  moment,
  mixins: [listMixin],
  props: {
    idd: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      tableColumns,
      tableData,
      mixDataList: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/childProtectOrgChairman/list', // 数据列表接口，API地址
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: false // 是否需要筛选
      },
      mixPageRef: 'gridPager',

      educationalBackgroundList: []
    }
  },
  activated () {
    this.userPageParams()
  },
  mounted () {
    this.geteducationalBackgroundList()
  },
  methods: {
    // 学历
    async geteducationalBackgroundList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationalBackgroundList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      // let formData = this.form.getFieldsValue()
      const paramss = {
        childProtectOrgId: this.idd
      }
      return paramss
    },

    onSelectTime (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
