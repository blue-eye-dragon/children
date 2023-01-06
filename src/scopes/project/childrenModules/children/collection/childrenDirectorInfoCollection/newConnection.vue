<template>
  <!-- 儿童寻亲信息发布 -->
  <div class="modelcont">

    <ta-form layout="inline"
             style="overflow:hidden"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
      <ta-form-item label="儿童姓名"
                    class="spilwid2"
                    fieldDecoratorId="name"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-input placeholder="请输入姓名" />
      </ta-form-item>
      <ta-form-item label="身份证号"
                    class="spilwid2"
                    fieldDecoratorId="idCard"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-input placeholder="请输入身份证号" />
      </ta-form-item>
      <template>
        <div class="searchButton"
             style="float: right;">
          <ta-button class="search "
                     icon="search"
                     @click="handleSubmit('search')">查询</ta-button>
          <ta-button class="btnleft reset"
                     icon="reload"
                     @click="resetFrom">重置</ta-button>
          <ta-button class="btnleft"
                     style="width: 90px;   background:rgb(61, 192, 231); border:1px solid rgba(1, 124, 155, 0.651); color: rgb(255, 255, 255);"
                     @click="selectOk">确认选择</ta-button>
        </div>
      </template>
    </ta-form>
    <ta-table class="tables"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="tableData"
              :rowSelection="rowSelection"
              bordered>
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <span slot="birthday"
            slot-scope="text">{{ text != null ? text.substring(0, 10) : ''}}</span>
    </ta-table>
    <ta-pagination :defaultCurrent="page"
                   class='pagination'
                   showSizeChanger
                   showQuickJumper
                   :dataSource.sync="tableData"
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
    width: '20%',
    dataIndex: 'name'
  },

  {
    title: '身份证号',
    width: '25%',
    dataIndex: 'idCard'
  },
  {
    title: '性别',
    width: '20%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
      title: '户籍所在地',
      width: '55%',
      dataIndex: 'currentAddress',
      collectionType: 'currentAddress'
    }
]
var that = ''
export default {
  props: {
    thisP: {
      required: true
    }
  },
  components: {},
  mixins: [listMixin],
  data () {
    return {
      selectedRows: [],
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childdirectorandsupervisor/selectNoRelationChild' // 数据列表接口，API地址
      },
      isdisabled: true,
      chosedata: [],
      visible: false,
      sexList: [],
      childSituationList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      fileldName: 'address_Linkage',
      types: '1',
      ishide: false
    }
  },
  mounted () {
    this.getsexList()
    this.handleSubmit()
  },
  created () {
    that = this
  },

  activated () { },
  methods: {

    async selectOk () {
      const ids = []
      await this.selectedRows.map(e => {
        ids.push(e.childId)
      })
      const params = {
        childIdList: [...ids],
        id: this.thisP.pid,
        childType: this.thisP.nowkey
      }
      const res = await this.post('/childdirectorandsupervisor/insertDirectorRelationChild', params, true)// 暂无接口
      if (!res.errors) {
        this.thisP.visible = false
        this.thisP.handleSubmit()
      }
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.childType = this.thisP.nowkey
      formData.areaId = this.thisP.town
      this.changetime(formData)
      return formData
    },
    async doAction (val, obj) {
      // 操作
      const param = { childBaseId: obj.childBaseId }
      const result = await this.post(
        '/childSeekingToBeAdopted/saveToBeAdoptedChild',
        param
      )
      if (!result.errors) {
        this.handleSubmit()
        this.$emit('handleSubmit')
      }
    },

    deletes (val) {
      this.list.splice(val, 1)
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.rowSelection.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },

    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    gobatch () {
      this.visible = true
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    }
  }
}
</script>

<style scoped lang="less">
.modelcont {
  margin-bottom: 40px;
}
.spilwid2 {
  width: 350px;
}
</style>
