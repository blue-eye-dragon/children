<template>
  <div class="modelcont">
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
      <ta-form-item label="姓名"
                    fieldDecoratorId="name"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    class="spilwid">
        <ta-input placeholder="请输入姓名" />
      </ta-form-item>
      <!-- <ta-form-item label="出生日期"
                    v-if="isFamily"
                    fieldDecoratorId="birthday"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    class="spilwid">
        <ta-range-picker />
      </ta-form-item> -->
      <!-- <ta-form-item label='身份证号'
                    fieldDecoratorId="idCard"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}"
                    class="spilwid2">
        <ta-input placeholder="请输入身份证号" />
      </ta-form-item>
      <ta-form-item> -->
      <ta-form-item>
        <div class="searchButton">
          <ta-button class="search "
                     icon="search"
                     @click="handleSubmit('search')">查询</ta-button>
          <ta-button class="btnleft reset"
                     icon="reload"
                     @click="resetFrom">重置</ta-button>
        </div>

        <!--
        <ta-button type="primary"
                   @click="handleSubmit('search')">查询</ta-button> -->
      </ta-form-item>
    </ta-form>
    <div>
      <ta-button type="primary"
                 @click="batch"
                 :disabled="isdisabled"
                 v-if="ishide">批量添加</ta-button>
      <ta-button type="primary"
                 @click="allAdd"
                 v-if="ishide1">全部添加</ta-button>
    </div>
    <ta-table bordered
              class="tables"
              :columns="tableColumns"
              :dataSource="tableData"
              :rowSelection="rowSelection">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <template slot="illnessType"
                slot-scope="a, b, c">
        <span>{{ b | typeDataProcess("ILLNESSTYPE", b.illnessType, b.illnessTypeOther, "illnessType") }}</span>
      </template>
      <div slot="action"
           slot-scope="e,obj,index"
           class="btnlist btnponter">
        <span @click="addsure(e,obj,index)">确认添加</span>
      </div>
    </ta-table>
    <ta-pagination  :defaultCurrent="page"
                   style="float: right;margin-top: 10px"
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
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: 80,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '30%'
  },
  // {
  //   title: '出生日期',
  //   dataIndex: 'birth'
  // },
  // {
  //   title: '儿童类别',
  //   dataIndex: 'childType',
  //   collectionType: 'CHILDCATEGORYA'
  // },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '40%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '30%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

let that
export default {
  mixins: [listMixin],
  props: {
    // tableColumns: {
    //   type: Array
    // },
    url: {
      type: String,
      required: true
    },
    isType: {
      type: String,
      default: ''
    },
    searchdata: {
      type: Object,
      default: () => {
        return {}
      }
    },
    ishide: {
      type: Boolean,
      default: true
    },
    ishide1: {
      type: Boolean,
      default: false
    },
    isFamily: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      mixListOptions: {
        mixActivatedIsNeed: false,
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      isdisabled: true,
      chosedata: []
    }
  },
  created () {
    that = this
    this.post('codetable/getCode', { codeType: 'ILLNESSTYPE' }).then(res => {
      if (res.serviceSuccess) {
        that.illnessTypeList = res.data.codeList
      }
    })
  },
  mounted () {
    if (!this.ishide) {
      this.rowSelection = null
    }
    if (this.searchdata) {
      this.searchForm.setFieldsValue({
        name: this.searchdata.name
      })
    }
    this.$set(this.mixListOptions, 'mixGetDataListURL', this.url)
    this.$nextTick(() => {
      this.handleSubmit()
    })
  },
  filters: {
    // 获取患病类型(其他类型也可)字典数据，并进行赋值（code为字典编码，val为数据值，name为字段名）
    typeDataProcess (obj, code, val, otherval, name, compare = (a, b) => a === b) {
      let list = []
      let attr = []
      let showData = ''
      const _self = that
      list = _self.illnessTypeList
      if (val && val.length > 0) {
        attr = val.split(',')
        attr.forEach((val, index) => {
          list.forEach((item, index) => {
            if (compare(item.value, val)) {
              showData = showData + item.label + ','
            }
          })
        })
      }
      if (showData != '') {
        showData = showData.substring(0, showData.length - 1)
      }
      if (name == 'illnessType') {
        if (val == _self.Enum.ILLNESSTYPE.QT) {
          showData = showData.replace(',', ':')
          return showData + (otherval != null ? otherval : '')
        } else {
          return showData
        }
      }
    }
  },
  methods: {
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (this.searchdata.childType) { // 1.事实无人抚养、2.孤儿、3.助学
        formData.childType = this.searchdata.childType
      }
      if (this.searchdata.isFaOrBuFa || this.searchdata.isFaOrBuFa == '0') { // 0.正常发放、1.补发
        formData.isFaOrBuFa = this.searchdata.isFaOrBuFa
      }
      if (this.searchdata.issuingCycle) {
        formData.issuingCycle = this.searchdata.issuingCycle
      }
      if (this.searchdata.issuingYears) {
        formData.currentTime = this.searchdata.issuingYears
        formData.issuingYears = this.searchdata.issuingYears
        formData.issuingYear = this.searchdata.issuingYears.substring(0, 4)
      }
      if (this.searchdata.issuingCycle) {
        formData.issuingCycle = this.searchdata.issuingCycle
      }
      formData.orgId = window.parent.indexTool.getUserInfo().orgId
      this.changetime(formData)
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 多选
    onSelectChange (val, val2) {
      this.chosedata = val2
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
    },
    // 批量添加
    batch () {
      this.$emit('addsure', this.chosedata)
    },
    // 全部添加
    allAdd () {
      let url = 'welfarePlan/queryAllList'
      if (this.isType == 'funds') {
        url = 'welfarePlan/orphanAssistanceAllList'
      }
      this.post(url, this.userPageParams()).then((res) => {
        this.$emit('addsure', res.data.data, true)
      })
    },
    // 确认添加
    addsure (e, obj, index) {
      const arr = []
      arr.push(obj)
      this.$emit('addsure', arr)
    }
  }
}
</script>
<style lang="less" scoped>
.modelcont {
  margin-bottom: 40px;
}
.tables {
  margin-top: 20px;
  height: 295px;
  overflow-y: scroll;
  position: relative;
}
.visitbtn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.spilwid {
  width: 280px;
}
.spilwid4 {
  width: 170px;
}
.spilwid2 {
  width: 220px;
}
.spilwid3 {
  width: 200px;
}
</style>
