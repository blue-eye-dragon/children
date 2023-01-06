<template>
  <div class="modelcont">
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
      <ta-form-item label="物资名称"
                    fieldDecoratorId="materialName"
                    class="spilwid"
                    :labelCol="{span:9}"
                    :wrapperCol="{span:15}">
        <ta-input placeholder="请输入物资名称" />
      </ta-form-item>
      <ta-form-item>
        <div class="searchButton">
          <ta-button type="primary"
                    class="search"
                    icon="search"
                    @click="handleSubmit('search')">查询</ta-button>
          <ta-button class="btnleft reset"
                    @click="resetFrom">重置</ta-button>
        </div>
      </ta-form-item>
    </ta-form>
    <ta-table class="tables"
              :showOverflowTooltip="true"
              :columns="tableColumns"
              :dataSource="tableData"
              :rowSelection="mixRowSelectionName"
              bordered>
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
    </ta-table>
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
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  mixins: [listMixin],
  props: {
    tableColumns: {
      type: Array
    },
    url: {
      type: String,
      required: true
    },
    searchdata: {
      type: Object
    },
    goType: {
      type: String
    },
    addTableData: {
      type: Array
    }
  },
  data () {
    return {
      tableData: [],
      page: 1,
      size: 10,
      isOk: true,
      mixPageRef: 'gridPager',
      mixListOptions: {
        mixActivatedIsNeed: false,
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixRowSelectionName: {
        // 控制选项的属性需要和 onChange 进行配合
        // selectedRowKeys: [],
        selectedRowKeys: [], // 多选数组
        selectedRowValuesName: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      isdisabled: true,
      chosedata: []
    }
  },
  mounted () {
    console.log(this.url)
    this.$set(this.mixListOptions, 'mixGetDataListURL', this.url)
    this.$nextTick(() => {
      this.handleSubmit()
    })
    this.loadData()
  },
  watch: {
    addTableData () {
      if (this.addTableData.length > 0) {
        this.isOk = true
      } else if (this.addTableData.length == 0) {
        this.isOk = false
      }
    }
  },
  methods: {
    loadData () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 多选
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(this.addTableData)

      console.log(selectedRowKeys)
      // 0入库     1出库
      if (this.isOk) {
        let arr = []
        this.tableData.map((item, index) => {
          this.addTableData.map((items, i) => {
            if (item.id == items.id) {
              arr.push(index)
              if (this.goType == '0') {
                this.tableData[index].inNumber = this.addTableData[i].inNumber
              } else if (this.goType == '1') {
                this.tableData[index].outNumber = this.addTableData[
                  i
                ].outNumber
              }
            }
          })
        })
        this.mixRowSelectionName.selectedRowKeys = arr
        this.isOk = false
      } else {
        if (this.goType == '0') {
          const currentDate = moment(new Date()).format('YYYY-MM-DD')
          this.mixRowSelectionName.selectedRowKeys = selectedRowKeys
          selectedRows.forEach(item => {
            item.inHouseTime = currentDate // 入库时间默认为当前时间
            // item.meterageUnit = '个' // 单位暂时写死，后期去掉
          })
          this.mixRowSelectionName.selectedRowValuesName = selectedRows
          console.log(this.mixRowSelectionName.selectedRowValuesName)
          this.$emit(
            'clickSelsec',
            this.mixRowSelectionName.selectedRowValuesName
          )
        } else if (this.goType == '1') {
          const currentDate = moment(new Date()).format('YYYY-MM-DD')
          this.mixRowSelectionName.selectedRowKeys = selectedRowKeys
          selectedRows.forEach(item => {
            item.outHouseTime = currentDate // 入库时间默认为当前时间
            // item.meterageUnit = '个' // 单位暂时写死，后期去掉
          })
          this.mixRowSelectionName.selectedRowValuesName = selectedRows
          console.log(this.mixRowSelectionName.selectedRowValuesName)
          this.$emit(
            'clickSelsec',
            this.mixRowSelectionName.selectedRowValuesName
          )
        }
      }

      // if (this.addTableData.length > 0) {
      //   let arr = []
      //   this.tableData.map((item, index) => {
      //     this.addTableData.map((items, i) => {
      //       if (item.id == items.id) {
      //         arr.push(index)
      //       }
      //     })
      //   })
      //   this.mixRowSelectionName.selectedRowKeys = arr
      // }else {
      // if (this.goType == '0') {
      //   const currentDate = moment(new Date()).format('YYYY-MM-DD')
      //   this.mixRowSelectionName.selectedRowKeys = selectedRowKeys
      //   selectedRows.forEach(item => {
      //     item.inHouseTime = currentDate // 入库时间默认为当前时间
      //     // item.meterageUnit = '个' // 单位暂时写死，后期去掉
      //   })
      //   this.mixRowSelectionName.selectedRowValuesName = selectedRows
      //   console.log(this.mixRowSelectionName.selectedRowValuesName)
      //   this.$emit(
      //     'clickSelsec',
      //     this.mixRowSelectionName.selectedRowValuesName
      //   )
      // } else if (this.goType == '1') {
      //   const currentDate = moment(new Date()).format('YYYY-MM-DD')
      //   this.mixRowSelectionName.selectedRowKeys = selectedRowKeys
      //   selectedRows.forEach(item => {
      //     item.outHouseTime = currentDate // 入库时间默认为当前时间
      //     // item.meterageUnit = '个' // 单位暂时写死，后期去掉
      //   })
      //   this.mixRowSelectionName.selectedRowValuesName = selectedRows
      //   console.log(this.mixRowSelectionName.selectedRowValuesName)
      //   this.$emit(
      //     'clickSelsec',
      //     this.mixRowSelectionName.selectedRowValuesName
      //   )
      // }
      // }
    },
    // 批量添加
    batch () {
      this.$emit('addsure', this.chosedata)
    },
    // 确认添加
    addsure (e, obj, index) {
      let arr = []
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
}
</style>
