<template>
  <ta-row class="fromcom">
    <div style="height: 50px;"
         v-if="!disabled">
      <ta-button type="primary"
                 @click='chosePersonnel'>选择人员</ta-button>
      <ta-button type="primary"
                 @click='deleteall'>清空已选择人员</ta-button>
    </div>
    <ta-table bordered
              class="tables table-min-width"
              :showOverflowTooltip="true"
              :columns.sync="tableColumns"
              :dataSource="tableData"
              :haveSn="true"
              ref="table">
      <span slot="action"
            class="btnlist"
            slot-scope="text,obj,index">
        <ta-popconfirm title="确认删除吗?"
                       @confirm="del(obj,index)"
                       @cancel="{}"
                       okText="确定"
                       cancelText="取消">
          <span class="com_textdel">删除</span>
        </ta-popconfirm>
      </span>
    </ta-table>
    <ta-modal title="选择人员"
              v-model="visible"
              width="80%"
              height="760px"
              :footer="null">
      <ChoseTrainingStaff ref="ChoseTrainingStaff"
                          :selectIds="selectIds"
                          :staffData="tableData"
                          @setSelectData="setSelectData"></ChoseTrainingStaff>
    </ta-modal>
  </ta-row>
</template>
<script>
import ChoseTrainingStaff from './choseTrainingStaff'
import $ from 'jquery'
const tableColumns = [
  {
    title: '姓名',
    width: '20%',
    dataIndex: 'name'
  },
  {
    title: '性别',
    width: '15%',
    collectionType: 'sex',
    dataIndex: 'sex'
  },
  {
    title: '手机号',
    width: '20%',
    dataIndex: 'cellPhone'
  },
  {
    title: '职责范围',
    width: '45%',
    dataIndex: 'dutyBoundary'
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: 120,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  props: ['personnelList', 'disabled'],
  components: {
    ChoseTrainingStaff
  },
  data () {
    return {
      visible: false,
      tableColumns,
      selectIds: [], // 选择的人员id
      tableData: []
    }
  },
  methods: {
    chosePersonnel () {
      this.visible = true
      this.$nextTick(() => {
        const { ChoseTrainingStaff } = this.$refs
        ChoseTrainingStaff.nowkey = '1'
        ChoseTrainingStaff.handleSubmit('search')
      })
    },
    // 选择的人员赋值
    setSelectData (arr, currentTableData, name, nowkey) { // arr:选中的数据，currentTableData:当前分页的table数据，name:提示信息（xx、批量、全部），nowkey:当前tab
      // 删除原有主任（督导员）的数据
      if (arr.length > 0 && currentTableData.length > 0 && nowkey) {
        const ids = []
        currentTableData.forEach(item => {
          ids.push(item.id)
        })
        for (let i = this.tableData.length - 1; i >= 0; i--) {
          if (this.tableData[i].registType == nowkey && ids.includes(this.tableData[i].id)) {
            this.tableData.splice(i, 1)
          }
        }
      }

      this.tableData = [...this.tableData, ...arr]
      const selectIds = []
      this.tableData.forEach(element => {
        selectIds.push(element.id)
      })
      this.selectIds = selectIds

      if (name.includes('全部')) {
        this.visible = false
      }
      this.$message.success(name + '添加成功')
    },
    // 清除所有人员
    deleteall () {
      this.selectIds = []
      this.tableData = []
    },
    // 删除
    del (e, index) {
      this.tableData.splice(index, 1)
      for (let i = 0; i < this.selectIds.length; i++) {
        if (this.selectIds[i] == e.id) {
          this.selectIds.splice(index, 1)
          break
        }
      }
    }
  },
  watch: {
    selectIds (val) {
      if (val && val.length > 0) {
        this.$emit('clearTip')
        $('.ant-table .no-data').removeClass('pop')
      } else {
        this.$nextTick(() => {
          $('.ant-table .no-data').addClass('pop')
        })
      }
    },
    disabled (val) {
      if (val) { // 查看时隐藏列
        this.$refs.table.hideColumns(['action'])
      } else {
        this.$refs.table.showColumns(['action'])
      }
    }
  }
}
</script>
