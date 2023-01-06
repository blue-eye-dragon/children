<template>
  <!-- 体检信息 tb1 -->
  <div class="searchdata">
    <div v-if="!notShow"
         class="visitbtn">
      <ta-popconfirm title="确定删除吗?"
                     @confirm="dels"
                     @cancel="cancel"
                     okText="确定"
                     cancelText="取消">
        <ta-button style="  margin-right: 15px;"
                   type="danger">删除</ta-button>
      </ta-popconfirm>

      <ta-button type="primary"
                 @click="adds(1,'')">新增</ta-button>
    </div>

    <ta-table v-if="!notShow"
              class="tables table-min-width"
              :columns="tableColumns"
              :dataSource="mixDataList"
              :rowSelection="mixRowSelection"
              bordered>
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <span slot="examinationDate"
            slot-scope="a, b, c">
        <span>{{a?a.substring(0,10):'--'}}</span>
      </span>

      <div slot="action"
           slot-scope="val,obj,index"
           class="btnlist">
        <span v-if="!notShow"
              @click="adds(2,obj)"
              class="com_textedit">编辑</span>
        <span @click="adds(3,obj)"
              class="com_textsee">查看</span>
      </div>
    </ta-table>
    <ta-table v-if="notShow"
              class="tables table-min-width"
              :columns="tableColumns"
              :dataSource="mixDataList"
              :showOverflowTooltip="true"
              bordered>
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <span slot="examinationDate"
            slot-scope="a, b, c">
        <span>{{a?a.substring(0,10):'--'}}</span>
      </span>

      <div slot="action"
           slot-scope="val,obj,index"
           class="btnlist">
        <span v-if="!notShow"
              @click="adds(2,obj)"
              class="com_textedit">编辑</span>
        <span @click="adds(3,obj)"
              class="com_textsee">查看</span>
      </div>
    </ta-table>
    <ta-pagination class='pagination'
                   showSizeChanger
                   showQuickJumper
                   :dataSource.sync="mixDataList"
                   :params="userPageParams"
                   @change="pagechange"
                   :url="mixListOptions.mixGetDataListURL"
                   :ref="mixPageRef" />
    <!-- <div class="bom">
      <ta-button class="preservation"
                 @click="back">返回</ta-button>
    </div> -->
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
    width: 80,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '体检日期',
    dataIndex: 'examinationDate',
    width: '18%',
    scopedSlots: { customRender: 'examinationDate' }
  },
  {
    title: '体检小结',
    dataIndex: 'medicalSummary',
    width: '82%',
    overflowTooltip: true
    // collectionType: 'sex'
  },

  {
    title: '操作',
    overflowTooltip: false,
    width:200,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const tableData = [
  {
    name2: '9846841874561574654865000',
    name: '哈喽',
    sex: '22',

    chairmanName: '2019-12-1',
    4: '好学生',
    birthday: '1994.8',
    action: 0
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
    ids: {
      type: String,
      required: false
    },
    notShow: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      tableColumns,
      mixDataList: [],
      // tableData: this.mixDataList,
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/medicalInformation/list', // 数据列表接口，API地址
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: false // 是否需要筛选
      },
      mixPageRef: 'gridPager',
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      selectIdList: '',

      educationalBackgroundList: []
    }
  },
  activated () {
    this.userPageParams()
  },
  mounted () {
    // let params = this.$route.query
    // if (params) {
    //   this.ids = params.ids // 当前操作数据id
    // }
    this.geteducationalBackgroundList()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    // 学历
    async geteducationalBackgroundList () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationalBackgroundList = data
    },

    adds (types, obj) {
      // 添加
      this.$router.push({
        path: 'checkBodyInfo',
        query: {
          types: types,
          ids: obj ? obj.id : this.ids
        }
      })
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      this.selectIdList = selectedRows
    },
    async dels () {
      let idAll = ''
      this.selectIdList.forEach(item => {
        idAll += item.id + ','
      })

      idAll = idAll.substring(0, idAll.length - 1)
      let par = {
        id: idAll
      }
      let until = await this.post(
        '/medicalInformation/updateDelStateById',
        par
      )

      if (!until.error) {
        this.handleSubmit()
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      let paramss = {
        rehabiliteId: this.ids
      }
      return paramss
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
