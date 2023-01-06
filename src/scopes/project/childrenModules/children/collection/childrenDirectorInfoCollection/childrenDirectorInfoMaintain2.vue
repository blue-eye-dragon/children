<template>
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
                       msg="区域"
                       :labelCol="{span:9}"
                       :wrapperCol="{span:15}"
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
                           @click="handleSubmit">查询</ta-button>
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
                         @cancel="{}"
                         okText="确定"
                         v-if='selectedRows.length!=0'
                         cancelText="取消">
            <ta-button type="primary"
                       class="del"
                       icon='delete'>批量删除</ta-button>

          </ta-popconfirm>

          <ta-button :disabled="true"
                     v-if='selectedRows.length==0'
                     icon='delete'>批量删除</ta-button>
          <div style="float:right;">
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       @click="showModal">导出</ta-button>
            <ta-modal :centered="false"
                      style="top: 25%;"
                      :visible="showOn"
                      @ok="Excel"
                      @cancel="handleCancel">
              <div>
                <h3>确认导出查询条件下的全部有效数据吗？</h3>
              </div>
            </ta-modal>
          </div>

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
                  class="com_correlation">关联儿童信息 </span>
            <span @click="lookDirector(obj)"
                  class="com_textsee">查看</span>

            <span @click="updateDirector(obj)"
                  v-if="isShow"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="deleteDatas(obj)"
                           @cancel="{}"
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
import moment from 'moment'
import AreaQuery from '@component/common/components/areaQuery'
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
    width: '18%',
    overflowTooltip: true,
    dataIndex: 'name'

  },
  {
    title: '手机号',
    overflowTooltip: true,
    width: '18%',
    dataIndex: 'cellPhone'
  },
  {
    title: '职责范围',
    width: '50%',
    overflowTooltip: true,
    dataIndex: 'dutyBoundary'
  },
  {
    title: '类型',
    width: '18%',
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
  watch: {
    // 监听行选择行的key,获取到对应的data
    'rowSelection.selectedRowKeys' (now, old) {
      this.selectedRows = now.map((item) => {
        return this.tableData[item]
      })
    }
  },
  data () {
    return {
      page: 1,
      size: 10,
      tableData: [],
      tableColumns,
      showOn: false,
      addressmodel: [],
      areaLevel: '', // 当前登录人的区划级别
      ishide: true,
      isShow: window.parent.indexTool.getUserInfo().orgType != 98 && window.parent.indexTool.getUserInfo().areaLevel == 4, // 新增、编辑、删除按钮的显示
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
  activated () {
    this.page = 1
    this.size = 10
    this.handleSubmit()
  },
  methods: {
    changetime (data, e) {
      for (var k in data) {
        if (k == 'address_Linkage') {
          if (data.address_Linkage) {
            data.areaId =
              data.address_Linkage[data.address_Linkage.length - 1]
            delete data.address_Linkage
          } else {
            data.areaId = window.parent.indexTool.getUserInfo().areaId
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
      formData.registType = 1
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
    // 关联儿童信息
    getChildrenInfo (e) {
      this.$router.push({
        name: 'relatedChildrenList',
        query: { pid: e.id, town: e.town, childList: JSON.stringify(e) }
      })
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
          this.handleSubmit()
        } else {
          this.$notification.open({
            message: '提示',
            description: '选择中存在已关联儿童的儿童主任，无法批量删除！',
            icon: <ta-icon type="frown-o" style="color: #108ee9" />
          })
        }
      } else {
        this.$message.error('操作失败！')
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      // 设置选中项为点击选中的项
      this.rowSelection.selectedRowKeys = selectedRowKeys
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
              if (!res.data.data) {
                this.$message.error('此儿童主任已关联儿童,请取消关联后删除!')
              } else {
                _self.$message.success('删除成功!')
                _self.handleSubmit()
              }
            }
          })
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    Excel () {
      var data = this.userPageParams()
      if (!data.areaId) {
        data.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      const url = '/childDirectorAndSupervisor/directorExportForTown'
      this.exportFile(url, data)
      this.showOn = false
    },
    // 编辑儿童主任信息
    updateDirector (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'edit' }
      })
    },
    // 查看儿童主任信息
    lookDirector (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'look' }
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
