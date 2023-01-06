<template>
  <div style="height:100%">
    <div>
      <ta-form layout="inline">
        <ta-form-item>
          <ta-button type="primary">新增</ta-button>
        </ta-form-item>
        <ta-form-item>
          <ta-button type="primary">修改</ta-button>
        </ta-form-item>
        <ta-form-item>
          <ta-button type="primary">删除</ta-button>
        </ta-form-item>
      </ta-form>
    </div>
    <ta-table
      class="tables"
      :columns="tableColumns"
      :dataSource="tableData"
      :haveSn="true"
      :pagination="{ pageSize: 20 }"
      bordered
    >
      <a
        slot="action"
        slot-scope="text"
        href="javascript:;"
        @click="$router.push('relieve')"
      >{{text}}</a>
    </ta-table>
  </div>
</template>
<script>
const tableColumns = [
  {
    title: '询问时间',
    dataIndex: 'name'
  },
  {
    title: '询问地点',
    dataIndex: 'age'
  },
  {
    title: '询问人员',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '被询问人员',
    dataIndex: '2'
  },
  {
    title: '记录人员',
    dataIndex: '4'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

const tableData = [
  {
    key: '1',
    sex: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    action: 1
  },
  {
    key: '2',
    sex: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    action: 0
  },
  {
    key: '3',
    sex: '0',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    action: 1
  }
]

export default {
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData
    }
  },
  methods: {
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    addAdoption () {
      this.$router.push({
        name: 'registration'
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
