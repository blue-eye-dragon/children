<template>
  <!-- 业务配置 -->
  <div class="searchdata tadrawer"
       style="  margin-top: 30px; ">

    <div class="container-table">
      <div style="hight: 50%">
        <div class="visitbtnR">
          <ta-button :disabled="OrSee"
                     type="primary"
                     class="btnleft"
                     @click="add(1)">添加快捷入口</ta-button>
        </div>

        <template>
          <ta-table :dataSource="tableData"
                    :columns.sync="columns"
                    ref="table1">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>

            <ta-table-edit slot="sortNum"
                           slot-scope="text, record"
                           type="inputNumber"
                           :min='0'
                           @change="changeData"
                           :row-editable="OrSee"></ta-table-edit>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span v-if="!OrSee"
                    @click="fnRowDelete(obj,index) ">删除</span>
              <span v-else
                    style="color: #0202026b;">删除</span>

            </div>
            <div slot="titles"
                 slot-scope="a, b, c">
              <span>{{a}}</span>

            </div>

          </ta-table>
        </template>
      </div>
      <ta-modal title="选择标题"
                v-model="visible"
                width="90%"
                :footer="null">
        <newOne @propsChange='propsChange'
                :contactTabelDate='contactTabelDate'
                :types='type'
                v-if="visible"
                :ishide="false"></newOne>
      </ta-modal>
      <!-- </div> -->
      <div style="   margin-top: 1%;  hight: 50%; ">
        <div class="visitbtnR">
          <ta-button :disabled="OrSee"
                     type="primary"
                     class="btnleft"
                     @click="add(2)">添加统计类型</ta-button>
        </div>

        <template>
          <ta-table :dataSource="tableData2"
                    :columns.sync="columns2"
                    ref="table2">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>

            <ta-table-edit slot="configType"
                           slot-scope="text, record"
                           type="input"
                           @change="changeData2"
                           :row-editable="OrSee"></ta-table-edit>

            <ta-table-edit slot="configAdress"
                           slot-scope="text, record"
                           type="input"
                           @change="changeData2"
                           :row-editable="OrSee"></ta-table-edit>
            <ta-table-edit slot="sortNum"
                           slot-scope="text, record"
                           type="inputNumber"
                           @change="changeData2"
                           :row-editable="OrSee"></ta-table-edit>
            <ta-table-edit slot="configValue"
                           slot-scope="text, record"
                           type="select"
                           :option="statisticalList"
                           @change="changeData2"
                           :row-editable="OrSee"></ta-table-edit>

            <!-- <ta-table-edit :editForm="form1" slot="hobby" slot-scope="text, record" type="select" :multiple="true" :option="hobbyList" :row-editable="true"></ta-table-edit> -->
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span v-if="!OrSee"
                    @click="fnRowDelete2(obj,index) ">删除</span>
              <span v-else
                    style="color: #0202026b;">删除</span>
            </div>
          </ta-table>
        </template>
      </div>
      <div style="  margin-bottom: 5%;  margin-top: 1%;  hight: 50%; ">
        <div class="visitbtnR">
          <ta-button :disabled="OrSee"
                     type="primary"
                     class="btnleft"
                     @click="add(3)">添加待办事项类型</ta-button>
        </div>

        <template>
          <ta-table :dataSource="tableData3"
                    :columns.sync="columns3"
                    ref="table3">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>

            <ta-table-edit slot="configType"
                           slot-scope="text, record"
                           type="input"
                           @change="changeData3"
                           :row-editable="OrSee"></ta-table-edit>

            <ta-table-edit slot="configAdress"
                           slot-scope="text, record"
                           type="input"
                           @change="changeData3"
                           :row-editable="OrSee"></ta-table-edit>
            <ta-table-edit slot="sortNum"
                           slot-scope="text, record"
                           type="inputNumber"
                           @change="changeData3"
                           :row-editable="OrSee"></ta-table-edit>
            <ta-table-edit slot="configValue"
                           slot-scope="text, record"
                           type="select"
                           :option="todoTypeList"
                           @change="changeData3"
                           :row-editable="OrSee"></ta-table-edit>

            <!-- <ta-table-edit :editForm="form1" slot="hobby" slot-scope="text, record" type="select" :multiple="true" :option="hobbyList" :row-editable="true"></ta-table-edit> -->
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span v-if="!OrSee"
                    @click="fnRowDelete3(obj,index) ">删除</span>
              <span v-else
                    style="color: #0202026b;">删除</span>
            </div>
          </ta-table>
        </template>
      </div>
    </div>
    <div class="bom"
         style="height: 53px;">
      <ta-button class="btnleft"
                 @click=" back">返回</ta-button>
      <ta-button v-if="!OrSee"
                 type="primary"
                 class="btnleft"
                 @click=" comit">提交</ta-button>
    </div>
  </div>
</template>

<script>
import newOne from './newOne'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'

const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '50px',
    scopedSlots: { customRender: 'num' }
  },
  {
    dataIndex: 'title',
    width: '10%',
    title: '标题',
    scopedSlots: { customRender: 'titles' },
    overflowTooltip: true
  },
  {
    title: '排序',
    width: '8%',
    dataIndex: 'sortNum',
    scopedSlots: { customRender: 'sortNum' }
  },
  {
    dataIndex: 'type',
    width: '8%',
    title: '类型',
    overflowTooltip: true
  },
  {
    dataIndex: 'adress', // 统计字典Or业务字典
    title: '地址',
    width: '15%'

  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
const columns2 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '50px',
    scopedSlots: { customRender: 'num' }
  },
  {
    dataIndex: 'title',
    width: '10%',
    title: '标题',
    scopedSlots: { customRender: 'titles' },
    overflowTooltip: true
  },
  {
    title: '排序',
    width: '8%',
    dataIndex: 'sortNum',
    scopedSlots: { customRender: 'sortNum' }
  },
  {
    dataIndex: 'type',
    width: '8%',
    title: '类型',
    overflowTooltip: true
  },
  {
    dataIndex: 'adress', // 统计字典Or业务字典
    title: '地址',
    width: '15%'

  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
const columns3 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '50px',
    scopedSlots: { customRender: 'num' }
  },
  {
    dataIndex: 'title',
    width: '10%',
    title: '标题',
    scopedSlots: { customRender: 'titles' },
    overflowTooltip: true
  },
  {
    title: '排序',
    width: '8%',
    dataIndex: 'sortNum',
    scopedSlots: { customRender: 'sortNum' }
  },
  {
    dataIndex: 'type',
    width: '8%',
    title: '类型',
    overflowTooltip: true
  },
  {
    dataIndex: 'adress', // 统计字典Or业务字典
    title: '地址',
    width: '15%'

  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    newOne
  },
  props: {
    // businessList: {
    //   type: Array,
    //   required: false
    // },
    // statisticalList: {
    //   type: Array,
    //   required: false
    // },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      contactTabelDate: [],
      visible: false,
      type: '',
      tableData: [],
      tableData2: [],
      tableData3: [],
      todoTypeList: [],
      businessList: [],
      statisticalList: [],
      columns,
      columns2,
      columns3,
      page: 1,
      size: 10,
      OrSee: false,
      yw: true, // yewu
      roleId: '',
      id: ''
    }
  },
  activated () {
    const params = this.$route.query
    this.businessList = params.businessList
    this.statisticalList = params.statisticalList
    this.todoTypeList = params.todoTypeList

    this.roleId = params.roleId
    this.id = params.ids
    const ty = params.ty
    if (ty == 2) {
      this.OrSee = true
    } else {
      this.OrSee = false
    }
    this.getData()
  },
  mounted () {
    this.$refs.table1.hideColumns(['adress', 'type'])
    this.$refs.table2.hideColumns(['adress', 'type'])
    this.$refs.table3.hideColumns(['adress', 'type'])
  },
  methods: {
    async getData () {
      const data = await this.post('/WorkbenchApi/queryByBusinessConfigId', {
        id: this.id
      })
      if (!data.data.errors) {
        const seeData = data.data.data
        if (seeData) {
          seeData.itemVoList.forEach(e => {
            if (e.type == '1') {
              this.tableData.push(e)
            }
            if (e.type == '2') {
              this.tableData2.push(e)
            }
            if (e.type == '3') {
              this.tableData3.push(e)
            }
          })
        }
      }
    },
    propsChange (obj, ty) {
      if (obj.length) {
        obj.map((e) => {
          e.configInfoId = e.id
          delete e.id
          if (e.type == 1) {
            this.tableData.push(e)
          }
          if (e.type == 2) {
            this.tableData2.push(e)
          }
          if (e.type == 3) {
            this.tableData3.push(e)
          }
        })
      }
      this.visible = false
    },
    add (ty) {
      this.type = ty
      if (ty == 1) {
        this.contactTabelDate = this.tableData
      } else if (ty == 2) {
        this.contactTabelDate = this.tableData2
      } else {
        this.contactTabelDate = this.tableData3
      }
      this.visible = true
    },
    changeData ({ newData, record, columnKey }) {
      // console.log('newData, record, columnKey -->', newData, record, columnKey)
      let arr = []
      record[columnKey] = newData
      if (columnKey == 'sortNum') {
        record[columnKey] = newData > 0 ? newData : 0
      }
      if (columnKey == 'configValue') {
        this.businessList.forEach(e => {
          if (e.value == record.configValue) {
            arr = e.label.split('-')
            record.configTitle = arr[1]
          }
        })
      }
    },
    changeData2 ({ newData, record, columnKey }) {
      // 将行数据修改为新值（newData：返回改变的值、record：该行的行数据、rowKey：该行的rowKey值）

      record[columnKey] = newData
      if (columnKey == 'sortNum') {
        record[columnKey] = newData > 0 ? newData : 0
      }
      let arr = []
      if (columnKey == 'configValue') {
        this.statisticalList.forEach(e => {
          if (e.value == record.configValue) {
            arr = e.label.split('-')
            record.configTitle = arr[1]
          }
        })
      }
    },
    changeData3 ({ newData, record, columnKey }) {
      // 将行数据修改为新值（newData：返回改变的值、record：该行的行数据、rowKey：该行的rowKey值）

      record[columnKey] = newData
      if (columnKey == 'sortNum') {
        record[columnKey] = newData > 0 ? newData : 0
      }
      let arr = []
      if (columnKey == 'configValue') {
        this.todoTypeList.forEach(e => {
          if (e.value == record.configValue) {
            arr = e.label.split('-')
            record.configTitle = arr[1]
          }
        })
      }
    },
    getwhoList (rowData) {
      // 互斥业务类型
      // console.log('rowData-->', rowData)
      // console.log('this.businessList-->', this.businessList)
      // console.log('this.statisticalList', this.statisticalList)
      const pot = []
      let oldeList = []
      if (rowData[type] == 1) {
        oldeList = this.businessList
        this.tableData.forEach(e => {
          if (e.type == 1) {
            pot.push(e.sex)
          }
        })
      } else {
        oldeList = this.statisticalList
        this.tableData.forEach(e => {
          if (e.type == 2) {
            pot.push(e.sex)
          }
        })
      }
      if (pot) {
        oldeList.forEach(e => {
          pot.forEach(r => {
            if (e.value != r) {
              this.whoList.push(e)
            }
          })
        })
      } else {
        this.whoList = oldeList
      }
    },
    // fnRowDelete (deleteId) {
    //   // 返回主键id，即rowKey的值
    // //   this.tableData = this.tableData.filter(item => item.key != this.tableData[deleteId])
    //   this.tableData = this.tableData.filter((item) => item.key != deleteId)
    // },
    fnRowDelete (val, deleteId) {
      // 删除行
      this.tableData = this.tableData.filter(
        item => item != this.tableData[deleteId]
      )
    },
    fnRowDelete2 (val, deleteId) {
      // 删除行
      this.tableData2 = this.tableData2.filter(
        item => item != this.tableData2[deleteId]
      )
    },
    fnRowDelete3 (val, deleteId) {
      // 删除行
      this.tableData3 = this.tableData3.filter(
        item => item != this.tableData3[deleteId]
      )
    },
    // fnRowDelete2 (deleteId) {
    //   // 返回主键id，即rowKey的值
    // //   this.tableData2 = this.tableData2.filter(item => item.key != this.tableData2[deleteId])
    //   this.tableData2 = this.tableData2.filter((item) => item.key != deleteId)
    // },
    back () {
      this.tableData2 = []
      this.tableData = []
      this.tableData3 = []
      this.$router.go(-1)
    },
    async comit () {
      let itemVoList = []
      itemVoList = [...this.tableData2, ...this.tableData, ...this.tableData3]
      // console.log('itemVoList-->', itemVoList)
      if (!itemVoList.length) {
        this.$message.error('请添加至少一项配置信息！')
      } else {
        const param = { id: this.id, roleId: this.roleId, itemVoList }
        const res = await this.post('/WorkbenchApi/update', param, true)
        if (!res.errors) {
          this.back()
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.modelcont {
  margin-bottom: 40px;
}
.visitbtnR {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.container-table {
  padding-bottom: 60px;
}
</style>
