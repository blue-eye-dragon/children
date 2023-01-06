<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item>
            <ta-button type="primary"
                       class="btnleft"
                        icon='plus'
                       @click="add">新增</ta-button>
            <!-- <ta-button class="btnleft exportbtn"
                       :disabled="disabledExp"
                           icon='upload'
                       @click="exportFils()">批量导出</ta-button> -->
            <ta-button class="btnleft"
              icon="rollback"
                       @click="retur">返回</ta-button>
          </ta-form-item>
        </ta-form>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="mixColumns"
                  :dataSource="tableData"
                  :pagination="false"
                  @expand="loadChild"
                  :expandedRowKeys="defaultExpandedRowKeys"
                  :defaultExpandedRowKeys="defaultExpandedRowKeys"
                  :scroll="mixColumns.length>8?{x: 2000 }:{}"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                  @change="handleTableChange">
          <!-- <span slot="num" slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span> -->
          <span slot="updateTime"
                slot-scope="text, record">{{ text | timedate}}</span>
          <div slot="operate"
          class='btnlist'
               slot-scope="text, record">
            <a>
              <!-- <ta-table-operate :operateMenu="operateMenu" :record="record"></ta-table-operate> -->
              <span @click="edit(text, record)"
                    class="com_textedit">编辑</span>
              <!-- <ta-divider type="vertical" /> -->
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deltrueMy(text, record)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </a>
          </div>
        </ta-table>
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :total="total"
                       :current="current"
                       :pageSize="pageSize"
                       :dataSource.sync="tableData"

                       :params="userPageParams"
                       @change="pagechange" />
      </div>
    </ta-border-layout>
    <!-- 新增、修改弹窗 -->
    <div>
      <ta-drawer :title="type==0?'新增':'修改'"
                 width="500"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="物资类别"
                        fieldDecoratorId="materialTypeName"
                        :fieldDecoratorOptions="rules.materialTypeName">
            <ta-input :disabled="disabled"
                      placeholder="请输入物资类别" />
          </ta-form-item>
          <ta-form-item label="父类别"
                        fieldDecoratorId="parentId"
                        :require="{message:'请选择父类别'}">
            <ta-tree-select :treeData="parentType"
                            showCheckedStrategy="SHOW_CHILD"
                            searchPlaceholder="Please select"
                            @change="treeChange"
                            placeholder="请选择父类别" />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button style="marginRight: 8px"
                     @click="onClose">取消</ta-button>
          <ta-button @click="addmaterialType()"
                     type="primary">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
const mixColumns = [
  // {
  //   title: '序号',
  //   dataIndex: 'num',
  //   align: 'center',
  //   width: '80px',
  //   scopedSlots: { customRender: 'num' }
  // },
  {
    title: '物资类别',
    dataIndex: 'materialTypeName',
    width: '33%'
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    scopedSlots: { customRender: 'updateTime' },
    width: '33%'
  },
  {
    title: '更新人员',
    dataIndex: 'updateUser',
    width: '34%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'operate',
    width: 150,
    scopedSlots: { customRender: 'operate' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      // 新增弹窗
      visible: false, // 入库弹窗显隐
      width: '500px',
      type: 0, // 新增（0）、编辑（1）标识符
      treeAll: false,
      // 列表
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/rescueMaterialType/list', // 数据列表接口，API地址
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: true, // 是否需要筛选
        mixDeleteURL: '/rescueMaterialType/updateDelStateById', // 删除接口，API地址
        mixExportURL: '/rescueMaterialType/export', // 导出接口，API地址
        mixAddURL: '/rescueMaterialType/save', // 新增接口
        mixEditURL: '/rescueMaterialType/update', // 编辑接口
        mixTypeURL: '/rescueMaterialType/queryMaterialType' // 获取物资类型
        // mixListURL: "" //选择物品列表接口
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],

      tableData: [], // 暂时写死，之后改为mixDataList
      rules: {
        materialTypeName: this.verificationRules('物资类别', 72)
      },
      selectedRowKeys: [],
      disabledExp: true,
      defaultExpandedRowKeys: [],
      page: 1,
      size: 10,
      total: 0,
      // 父类别
      parentType: [],
      // materialTypeId: '',
      // materialTypeName: '',
      parentIds: '',
      editId: '',
      dataObj: {
        pageNumber: 1,
        pageSize: 10
      },
      current: 1,
      pageSize: 10,
      materialTypeIds: '',
      disabled: false,
      operateMenu: [
        {
          name: '修改',
          class: 'com_textedit',
          onClick: record => {
            // let _self = this
            // _self.type = 1
            // _self.id = record.id
            // _self.visible = true
            this.edit(record)
          }
        },
        {
          name: '删除',
          class: 'com_textdel',
          onClick: record => {
            let _self = this
            _self.deleteListItemMy(record, 'id', 'id')
          }
        }
      ]
    }
  },
  filters: {
    // 将js生成的日期字符串
    timedate: function (value) {
      return value != null ? value.substring(0, 10) : ''
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next((vm) => {
  //     console.log(vm)
  //     vm.routeWatchType()
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   this.routeWatchType()
  //   next()
  // },
  activated () {
    // this.routeWatchType()
    this.current = 1
    this.pageSize = 10
    this.$nextTick(() => {
      this.fnQueryInfo()
    })
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    routeWatchType () {
      console.log(this.$route.params.baseType)
      if (this.$route.params.baseType == 'welfare') {
        // 查询
        this.mixListOptions.mixGetDataListURL =
          '/welfareMaterialType/queryRecursionById'
        // 批量导出
        this.mixListOptions.mixExportURL = '/welfareMaterialType/export'
        // 删除
        this.mixListOptions.mixDeleteURL =
          '/welfareMaterialType/updateDelStateById'
        // 新增
        this.mixListOptions.mixAddURL = '/welfareMaterialType/save'
        // 编辑
        this.mixListOptions.mixEditURL = '/welfareMaterialType/update'
        // 获取物资类型数据
        this.mixListOptions.mixTypeURL =
          '/welfareMaterialType/queryMaterialType'
      } else if (this.$route.params.baseType == 'rescue') {
        // 查询
        this.mixListOptions.mixGetDataListURL =
          '/rescueMaterialType/queryRecursionById'
        // 批量导出
        this.mixListOptions.mixExportURL = '/rescueMaterialType/export'
        // 删除
        this.mixListOptions.mixDeleteURL =
          '/rescueMaterialType/updateDelStateById'
        // 新增
        this.mixListOptions.mixAddURL = '/rescueMaterialType/save'
        // 编辑
        this.mixListOptions.mixEditURL = '/rescueMaterialType/update'
        // 获取物资类型数据
        this.mixListOptions.mixTypeURL =
          '/rescueMaterialType/queryMaterialType'
      }
      this.fnQueryInfo()
    },
    // 批量导出
    exportFils () {
      console.log(999)
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      let params = {
        ...formData
      }
      this.materialTypeIds = this.selectedRowKeys.join(',')
      params.materialTypeIds = encodeURI(this.materialTypeIds).replace(
        /,/g,
        '%2c'
      )
      this.exportFile(this.mixListOptions.mixExportURL, params)
      this.$nextTick(() => {
        this.materialTypeIds = []
        this.selectedRowKeys = []
      })
    },
    // 点击每行的checkbox会触发,点击全选也会触发
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      if (selectedRowKeys.length > 0) {
        this.disabledExp = false
      } else if (selectedRowKeys.length == 0) {
        this.disabledExp = true
      }
      this.selectedRowKeys = selectedRowKeys
      console.log(this.selectedRowKeys)
    },
    // // 自定义删除方法
    // deleteListItemMy(val, ids, id) {
    //   var _this = this;
    //   this.$confirm({
    //     title: "确定删除吗?",
    //     content: "",
    //     onOk() {
    //       let data = {
    //         [ids]: val[id]
    //       };
    //       _this.deltrueMy(data);
    //     },
    //     onCancel() {}
    //   });
    // },
    // 确定删除
    async deltrueMy (text, record) {
      console.log(record.id)
      let params = {}
      params.id = record.id
      let _self = this
      let data = await _self.post(_self.mixListOptions.mixDeleteURL, params)
      console.log(Object.keys(data.data))
      let keys = Object.keys(data.data)
      if (keys[0] == '0') {
        _self.$message.success(data.data[0])
        _self.fnQueryInfo()
      } else if (keys[0] == '1') {
        _self.$message.error(data.data[0])
        _self.fnQueryInfo()
      } else if (keys[0] == '2') {
        _self.$message.error(data.data[2])
        _self.fnQueryInfo()
      }
    },
    onClose () {
      this.visible = false
    },
    // 新增点击事件
    add () {
      this.type = 0
      this.visible = true
      this.$nextTick(() => {
        this.parentType = []
        this.form.resetFields()
      })

      // this.form.resetFields().then(() => {
      this.$nextTick(() => {
        this.getParentType()
      })
    },
    // 编辑
    edit (text, record) {
      console.log(record)
      this.type = 1
      this.visible = true
      this.$nextTick(() => {
        this.parentType = []
        this.form.resetFields()
      })

      this.$nextTick(() => {
        this.getParentType()
      })
      console.log(record.materialTypeName)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          materialTypeName: record.materialTypeName,
          parentId: record.parentId
        })
        this.editId = record.id
      })
    },
    // 新增获取物资类型
    async getParentType () {
      let data = await this.post(this.mixListOptions.mixTypeURL)
      console.log(data)
      if (data.data.errors == null) {
        this.parentType.push({
          label: '无',
          key: '0',
          value: '0'
        })
        data.data.data.map((item, index) => {
          this.parentType.push(item)
        })
      }
    },
    // 查询数据
    async fnQueryInfo () {
      let params = {
        pageNumber: this.current,
        pageSize: this.pageSize
      }
      this.post(this.mixListOptions.mixGetDataListURL, params).then(
        res => {
          console.log(res, 'fnQueryInfofnQueryInfofnQueryInfofnQueryInfo')
          // 分页中数据的总条数
          this.total = res.data.pageBean.total
          this.tableData = res.data.pageBean.list
          this.tableData.forEach((item, index) => {
            // 对列表中每条数据加入key
            item.key = item.id
            // 判断是否有子节点
            if (item.isExistChild == '1') {
              item.children = []
            } else if (item.isExistChild == '0') {
              item.children = null
            }
          })
        }
      )
      // 如果是新增调用此功能时清空被选择项
      this.selectedRowKeys = []
      // 对展开表格的功能进行清空
      this.defaultExpandedRowKeys = []
    },
    // 点击行展开时  加载下级组织机构
    loadChild (expanded, record) {
      console.log(expanded, record, 'asdddassaaaaaaaaaaaa')
      // 如果为展开,则进行请求
      if (expanded) {
        console.log(record)
        // 对点击展开的节点请求子数据
        this.post('/rescueMaterialType/queryRecursionById', {
          id: record.id
        }).then(res => {
          // 对返回的数据加入key值并进行判断，下面还有子节点是加入children
          console.log(res)
          res.data.pageBean.list.forEach((item, index) => {
            // 判断是否有子节点
            if (item.isExistChild == '1') {
              item.children = []
            }
            item.key = item.id
          })
          // 将值赋给子的children数组
          record.children = res.data.pageBean.list
          // 将需要展开的key加入defaultExpandedRowKeys数组内
          this.defaultExpandedRowKeys.push(record.id)
        })
      } else {
        // 合闭时删除对应key（也是其id）
        let index = this.defaultExpandedRowKeys.indexOf(record.id)
        this.defaultExpandedRowKeys.splice(index, 1)
      }
    },
    // 新增物资类别---确定
    async addmaterialType () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log(this.type)
          let formData = this.form.getFieldsValue()
          let params = {
            ...formData
          }
          params.id = this.editId
          console.log(params)
          let res
          let txt
          if (this.type == 0) {
            res = await this.post(this.mixListOptions.mixAddURL, params)
            txt = '新增成功'
          } else {
            res = await this.post(this.mixListOptions.mixEditURL, params)
            txt = '修改成功'
          }
          if (res.errors == null) {
            // this.$message.success(res.data.data)
            // this.visible = false
            // this.handleSubmit()
            if (Object.keys(res.data)[0] == '3') {
              console.log(11111111111)
              this.$message.error(res.data[3])
            } else if (Object.keys(res.data)[0] == '2') {
              this.$message.error(res.data[2])
            } else if (Object.keys(res.data)[0] == '1') {
              this.$message.success(res.data[1])
              this.visible = false
              this.fnQueryInfo()
            } else if (Object.keys(res.data)[0] == '4') {
              this.$message.error(res.data[4])
            }
          }
        }
      })
    },
    // 返回物资总揽页面
    retur () {
      this.$router.go(-1)
    },
    // 页面改变时的回调
    pagechange (pageNumber, pageSize) {
      this.current = pageNumber
      this.pageSize = pageSize
      this.dataObj.pageSize = pageSize
      this.dataObj.pageNumber = pageNumber
      this.fnQueryInfo()
      console.log(123456)
    },
    // 新增获取父id
    treeChange (value, label, extra) {
      this.parentIds = value
      console.log(this.parentIds)
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
</style>
