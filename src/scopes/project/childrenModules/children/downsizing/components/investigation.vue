<template>
  <div style="height:100%"
       class='tadrawer'>
    <div class="visitbtn">
      <ta-button type="primary"
                 class="addbtn"
                 @click="addAdoption">新增</ta-button>
      <ta-button type="danger"
                 @click="addAdoption"
                 :disabled="isdisabled">批量删除</ta-button>
    </div>
    <div>
      <ta-table class="tables"
                :columns="tableColumns"
                :dataSource="tableData"
                :rowSelection="rowSelection"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,c"
             class="btnlist">
          <span @click="see(val,obj)"
                class="com_textsee">查看</span>
          <span @click="edit(val,obj)"
                class="com_textedit">编辑</span>
          <span class="com_textdel">删除</span>
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"
                     class='pagination'
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="tableData"
                     :params="userPageParams"
                     @change="pagechange"
                     url="marriage/registrationList"
                     ref="gridPager" />
    </div>
    <ta-drawer title="调查信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="调查时间"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择调查时间!'}">
          <ta-date-picker disabled
                          style="width: 100%;"
                          placeholder="请选择调查时间" />
        </ta-form-item>
        <ta-form-item label="调查地点"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入调查地点!'}">
          <ta-input disabled
                    placeholder="请输入调查地点" />
        </ta-form-item>
        <ta-form-item label="调查人员"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入调查人员!'}">
          <ta-input disabled
                    placeholder="请输入调查人员" />
        </ta-form-item>
        <ta-form-item label="被调查人员"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入被调查人员!'}">
          <ta-input disabled
                    placeholder="请输入被调查人员" />
        </ta-form-item>
        <ta-form-item label="记录人员"
                      fieldDecoratorId="name"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入记录人员!'}">
          <ta-input disabled
                    placeholder="请输入记录人员" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '调查时间',
    dataIndex: 'name'
  },
  {
    title: '调查地点',
    dataIndex: 'age'
  },
  {
    title: '调查人员',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '被调查人员',
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
    width: 180,
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
  props: {
    types: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tableColumns,
      tableData,
      page: 1,
      size: 10,
      isdisabled: true,
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      visible: false,
      idedit: false
    }
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    see (val, obl, c) {
      console.log(val)
      console.log(obl)
      console.log(c)
      this.visible = true
      this.idedit = true
    },
    edit () {
      this.visible = true
      this.idedit = false
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    onSelectChange (val, val2) {
      console.log(val)
      console.log(val2)
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.form.getFieldsValue()
      return {
        apap0003: formData.apap0003
      }
    },
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
.tables {
  margin-top: 17px;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
</style>
