<template >
  <!-- 督导员 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">
            <AreaQuery class="spilwid"
                       :ishide.sync="ishide"
                       types='2'
                       :labelCol="{span:9}"
                       :wrapperCol="{span:15}"
                       msg="区域"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></AreaQuery>
            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">

              <ta-input placeholder="请输入姓名" />

            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="getlist">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn"
             v-if="isShow">
          <ta-button type="primary"
                     @click="add"
                     icon='plus'>新增</ta-button>

          <ta-popconfirm title="确定要删除选中的全部数据吗?"
                         @confirm="deleteAll"
                         @cancel="cancel"
                         v-if='selectedRows.length!=0'
                         okText="确定"
                         cancelText="取消">
            <ta-button type="primary"
                       class="del"
                       icon='delete'>批量删除</ta-button>
          </ta-popconfirm>
          <ta-button :disabled="true"
                     v-if='selectedRows.length==0'
                     icon='delete'>批量删除</ta-button>
        </div>
        <ta-table bordered
                  ref="tables"
                  :rowSelection="rowSelection"
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="getChildrenInfo(obj)"
                  class="com_continue">查看儿童主任信息</span>
            <span @click="lookDirector(obj)"
                  class="com_textsee">查看</span>
            <span @click="updateSupervisor(obj)"
                  class="com_textedit"
                  v-if="isShow">
              编辑
            </span>
            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="deleteDatas(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="isShow">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       url="/childdirectorandsupervisor/list"
                       ref="gridPager1" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import AreaQuery from '@component/common/components/areaQuery'
import Item from '../../../../../core/workTable/workTablePage/modulePart/page/part/item.vue'
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
    width: '10%',
    overflowTooltip: true,
    dataIndex: 'name'

  },
  {
    title: '手机号',
    overflowTooltip: true,
    width: '13%',
    dataIndex: 'cellPhone'
  },
  {
    title: '职责范围',
    width: '30%',
    overflowTooltip: true,
    dataIndex: 'dutyBoundary'
  },
  {
    title: '类型',
    width: '10%',
    overflowTooltip: true,
    dataIndex: 'registType',
    collectionType: 'REGISTRATIONTYPE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: '350px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    AreaQuery

  },
  data () {
    return {
      page: 1,
      size: 10,
      tableData: [],
      tableColumns,
      addressmodel: [],
      ishide: true,
      isShow: window.parent.indexTool.getUserInfo().orgType != 98 && (window.parent.indexTool.getUserInfo().areaLevel == 2 || window.parent.indexTool.getUserInfo().areaLevel == 3), // 新增、编辑、删除按钮的显示
      selectedRows: [],
      // 行选择配置
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
        // 选择框的默认属性配置
        // getCheckboxProps: this.fnGetCheckboxProps

      }
    }
  },
  watch: {
    // 监听行选择行的key,获取到对应的data
    'rowSelection.selectedRowKeys' (now, old) {
      this.selectedRows = now.map((item) => {
        return this.tableData[item]
      })
      // console.log(this.selectedRows)
    }
  },
  activated () {
    this.$nextTick(() => {
      this.handleSubmit()
    })
  },
  methods: {
    async getlist () {
      this.handleSubmit('9')
    },
    changetime (data, e) {
      for (var k in data) {
        if (k == 'address_Linkage') {
          if (data.address_Linkage) {
            data.areaId =
              data.address_Linkage[data.address_Linkage.length - 1]
            delete data.address_Linkage
          } else {
            data.areaId = null
          }
        }
      }
    },
    resetFrom () {
      this.form.resetFields()
      this.handleSubmit()
    },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1] ? val[val.length - 1] : ''
      this.form.setFieldsValue({
        orgName: ''
      })
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    loadData () {
      this.addressmodel = []
    },

    // 读取列表 分页形式
    handleSubmit () {
      const ref = 'gridPager1'
      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      this.$refs[ref].loadData(data => { })
    },
    userPageParams () {
      // 这里返回的对象是分页要一同提交的参数
      const formData = this.form.getFieldsValue()
      formData.whereFlag = 2
      formData.registType = 2
      this.changetime(formData)
      return formData
    },
    // 新增(关联儿童主任信息)
    add () {
      this.$router.push({
        name: 'relatedChildDirector',
        query: {
          flag: 'add'
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      // 设置选中项为点击选中的项
      this.rowSelection.selectedRowKeys = selectedRowKeys
    },

    // 删除督导员批量
    async deleteAll () {
      let ids = ''
      this.selectedRows.forEach(e => {
        ids += e.id + ','
      })
      const res = await this.post('/childdirectorandsupervisor/updateDelStateById', {
        id: ids
      })
      if (!res.errors) {
        if (res.data.data) {
          this.getlist()
        } else {
          this.$message.error('操作失败！')
        }
      } else {
        this.$message.error('操作失败！')
      }
    },

    // 关联儿童督导员信息
    getChildrenInfo (e) {
      this.$router.push({
        name: 'toAssociation',
        query: { dutyBoundaryTown: e.town }
      })
    },
    // 编辑儿童督导员信息
    updateSupervisor (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'edit' }
      })
    },
    // 删除儿童主任（督导员）信息
    deleteDatas (e) {
      if (e.id) {
        const _self = this
        _self
          .post('/childdirectorandsupervisor/updateDelStateById', {
            id: e.id
          })
          .then(res => {
            if (!res.errors) {
              _self.$message.success('删除成功!')
              _self.handleSubmit()
            }
          })
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查看儿童主任信息
    lookDirector (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'look' }
      })
    },
    cancel () { }
  }
}
</script>
<style lang="less" scoped>
.searchdata /deep/ .ant-table-fixed-left {
  width: 10px;
}
.del {
  // width:49px;
  // height:28px;
  background: rgba(255, 209, 209, 1);
  border: 1px solid rgba(243, 0, 0, 0.6509803921568627);
  opacity: 1;
  border-radius: 4px;
  display: inline-block;
  color: #f30000;
  text-align: center;
  margin-right: 8px;
}
</style>
