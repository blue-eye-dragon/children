<template>
  <div class="conts">
    <!-- 医疗申请记录----查看 -->
    <div class="contin">
      <!-- <ta-border-layout :header-cfg="{showBorder:false}" :layout="{header:'0px'}"> -->
      <div style="margin-top:30px">
        <ta-form layout="inline" :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"></ta-form>
      </div>
      <!-- </ta-border-layout> -->
      <ta-table
        class="tables"
        :rowSelection="rowSelection"
        :columns="tableColumns"
        :dataSource="tableData"
        bordered
      >
        <span slot="num" slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
      </ta-table>
      <ta-pagination
        class='pagination'
        showSizeChanger
        showQuickJumper
        :dataSource.sync="tableData"
        
        :params="userPageParams"
        @change="pagechange"
        :url="mixListOptions.mixGetDataListURL"
        ref="gridPager"
      />
    </div>
    <div class="bom">
      <ta-button type="primary" class="preservation" @click="nextPre()" :disabled="disabledExp">下一步</ta-button>
      <ta-button class="preservation" @click="backs">返回</ta-button>
    </div>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
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
    title: '机构代码',
    dataIndex: 'orgCreditCode'
  },
  {
    title: '机构名称',
    dataIndex: 'orgName'
  }
]
export default {
  name: 'salvageApprovalBatches',
  mixins: [listMixin],
  components: {
    Title
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/welfareFundAllocate/queryPageOrgList', // 数据列表接口，API地址
        mixAddURL: '', // 数据新增接口，API地址
        mixDeleteURL: '', // 数据删除接口，API地址
        mixEditURL: '' // 数据编辑接口，API地址
      },
      mixPageRef: 'gridPager',
      selectedRows: [],
      // 行选择配置
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      disabledExp: false,
      obj: [],
      type: '',
      goType: '0',
      arrData: [],
      isok: true,
      objData: {},
      id: ''
    }
  },
  activated () {
    this.rowSelection.selectedRowKeys = []
    this.selectedRows = []
    this.arrData = []
    this.obj = []
    let goTypeTemp = this.$route.query.goType

    if (goTypeTemp == 'registrationFund-edit') {
      let data = JSON.parse(this.$route.query.obj)
      console.log(data)
      this.id = data.id
      this.objData = JSON.parse(this.$route.query.obj)
      this.goType = '1'
      this.arrData = data.welfareFundAllocateMoneyVoList
      this.isok = true
      // let arr = []
      // console.log(this.arrData)
      // this.rowSelection.selectedRowKeyspush(this.arrData)
      // setTimeout(() => {
      //   this.tableData.map((item, index) => {
      //     this.arrData.map((items, i) => {
      //       if (item.orgId == items.orgId) {
      //       // selectedRowKeys
      //         arr.push(index)
      //       }
      //     })
      //   })
      //   this.$set(this.rowSelection, 'selectedRowKeys', arr)
      // }, 800)
    } else if (goTypeTemp == 'registrationFund-adds') {
      this.goType = '2'
      this.isok = false
    }
  },
  methods: {
    loadData () {
      this.rowSelection.selectedRowKeys = []
      this.selectedRows = []
      this.arrData = []
    },
    nextPre () {
      if (this.goType == '1') {
        console.log(this.obj)
        let objs = this.objData
        objs.troubledChildAllocateMoneyVoList = this.obj
        objs = JSON.stringify(objs)
        console.log(objs)
        if (this.rowSelection.selectedRowKeys.length > 0) {
          this.$router.push({
            name: 'xiaboTwo',
            query: {
              obj: objs,
              goType: 'registrationFund-edit'
            }
          })
        } else if (this.rowSelection.selectedRowKeys.length == 0) {
          this.$message.error('请选择机构')
        }
      } else if (this.goType == '2') {
        let obj = this.obj
        if (this.rowSelection.selectedRowKeys.length > 0) {
          // this.disabledExp = false
          // this.obj = selectedRows
          this.$router.push({
            name: 'xiaboTwo',
            query: {
              obj: obj,
              goType: 'registrationFundTwo-add'
            }
          })
        } else if (this.rowSelection.selectedRowKeys.length == 0) {
          // this.disabledExp = true
          this.$message.error('请选择机构')
        }
      }
    },
    // select选择框
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRows)
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.rowSelection.selectedRowKeys = selectedRowKeys
      console.log(this.selectedRowKeys)
      if (this.isok) {
        let arr = []
        this.tableData.map((item, index) => {
          this.arrData.map((items, i) => {
            if (item.orgId == items.orgId) {
              // selectedRowKeys
              arr.push(index)
              this.tableData[index].allocateMoney = this.arrData[
                i
              ].allocateMoney
              this.obj.push(items)
            }
          })
        })
        this.rowSelection.selectedRowKeys = arr
        this.isok = false
      } else {
        this.obj = selectedRows
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    backs () {
      this.$router.go(-1)
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[refout] != undefined) {
          if (!istrue) {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          } else {
            node.style.height = '50px'
          }
          node.style.transition = 'all 1s'
        }
      })
    }
  },
  watch: {
    showone (val) {
      console.log(111)
      console.log(val)
      this.setHeight('one', 'oneout', !val)
    },
    // showtwo (val) {
    //   this.setHeight('two', 'twoout', !val)
    // },
    showthree (val) {
      this.setHeight('three', 'threeout', !val)
    }
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  width: 83%;
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
.md {
  position: fixed;
  top: 50%;
  margin-top: -100px;
  right: 26px;
  width: 120px;
  z-index: 333;
}
.preservation {
  margin-left: 32px;
}
</style>
