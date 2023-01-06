
<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div id="printDiv"
           ref="print">
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="物资名称"
                          class="spilwid"
                          fieldDecoratorId="materialName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入物资名称" />
            </ta-form-item>
            <ta-form-item label="物资类别"
                          class="spilwid"
                          fieldDecoratorId="materialTypeId"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-tree-select :treeData="materialTypeList"
                              showCheckedStrategy="SHOW_CHILD"
                              placeholder="请选择物资类别" />
            </ta-form-item>
            <ta-form-item label="入库日期"
                          class="spilwid3"
                          fieldDecoratorId="inHouseTime"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker :valid-now-time="'right'" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>

          </ta-form>
        </div>

        <div class="operateBtn">
          <div style="float: left;">
            <ta-button type="primary"
                       icon='plus'
                       @click="warehousing">入库</ta-button>
            <!-- <ta-button class="btnleft exportbtn"
                       icon='upload'
                       @click="exportFils()">批量导出</ta-button> -->
          </div>
        </div>
        <!-- <div ></div> -->
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="mixColumns"
                  :dataSource="tableData"
                  :rowSelection="mixRowSelection"
                  :pagination="false"
                  :scroll="mixColumns.length>8?{x: 2000 }:{}"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="operate"
               class="btnlist"
               slot-scope="val,obj,index">
            <a>
              <!-- <ta-table-operate :operateMenu="operateMenu" :record="record"></ta-table-operate> -->
              <span class="com_textedit"
                    @click="editRecord(val,obj)">编辑</span>
              <!-- <ta-divider type="vertical" /> -->
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deltrueMy(val,obj,index)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </a>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       v-if="mixListOptions.mixGetDataListIsPage"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
    <!-- 入库弹窗 -->
    <div>
      <ta-drawer title="物资入库"
                 :getContainer="setContainer"
                 width="1000"
                 :closable="false"
                 @close="onClose"
                 :visible="visible">
        <div style="padding:10px 0;">
          <ta-button type="primary"
                     icon='plus'
                     @click="showChildrenDrawer">新增</ta-button>
        </div>
        <ta-table class="tables"
                  :showOverflowTooltip="true"
                  :columns="addTableColumns"
                  :dataSource="addTableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <ta-table-edit slot="inNumber"
                         slot-scope="text, record"
                         type="inputNumber"
                         @change="changeData"></ta-table-edit>
          <ta-table-edit slot="inHouseTime"
                         slot-scope="text, record"
                         type="datePicker"
                         @change="changeDataOne"></ta-table-edit>
          <div slot="operate"
               slot-scope="val,obj,index"
               class="btnlist">
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"  
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
        <ta-drawer title="选择物资"
                   width="700"
                   :getContainer="setContainer"
                   :closable="false"
                   @close="onChildrenDrawerClose"
                   :visible="nameDrawer">
          <WarehousingGoods v-if="nameDrawer"
                            :tableColumns="nameTableColumns"
                            :addTableData="addTableData"
                            @clickSelsec="clickSelsec"
                            :goType="goType"
                            ref="mychild"
                            url="/rescueMaterialInHouse/queryMaterialList"></WarehousingGoods>
          <div slot="footer">
            <ta-button style="marginRight: 8px"
                       @click="onChildrenDrawerClose">取消</ta-button>
            <ta-button type="primary"
                       @click="getGoods">确定</ta-button>
          </div>
        </ta-drawer>
        <div slot="footer">
          <ta-button style="marginRight: 8px"
                     @click="onClose">取消</ta-button>
          <ta-button @click="submitData"
                     type="primary">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
    <!-- 修改弹窗 -->
    <div>
      <ta-drawer title="物资入库编辑"
                 width="1000"
                 :getContainer="setContainer"
                 :closable="false"
                 @close="onClose"
                 :visible="editVisible">
        <ta-form layout="inline"
                 :autoFormCreate="(importForm)=>{this.importForm = importForm}"></ta-form>
        <ta-table class="tables"
                  :showOverflowTooltip="true"
                  :columns="editTableColumns"
                  :dataSource="editTableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <ta-table-edit slot="inNumber"
                         slot-scope="text, record"
                         type="inputNumber"
                         @change="changeData"></ta-table-edit>
          <ta-table-edit slot="inHouseTime"
                         slot-scope="text, record"
                         type="datePicker"
                         @change="changeDataOne"></ta-table-edit>
          <template slot="materialName"
                    slot-scope="a,b,c">
            <div class="textout">
              <span class="tabtext">{{b.materialName}}</span>
              <ta-button type="primary"
                         class="btn"
                         @click="getOptions(c)">选择</ta-button>
            </div>
          </template>
        </ta-table>
        <ta-form :autoFormCreate="(modelForm)=>{this.modelForm = modelForm}"
                 layout="horizontal"></ta-form>
        <ta-drawer title="选择物资"
                   width="700"
                   :closable="false"
                   :getContainer="setContainer"
                   @close="onChildrenDrawerClose"
                   :visible="nameDrawer">
          <WarehousingGoodsEdit v-if="nameDrawer"
                                :tableColumns="nameTableColumns"
                                :addTableData="addTableData"
                                @clickSelsec="clickSelsec"
                                :goType="goType"
                                ref="mychild"
                                url="/rescueMaterialInHouse/queryMaterialList"></WarehousingGoodsEdit>
          <div slot="footer">
            <ta-button style="marginRight: 8px"
                       @click="onChildrenDrawerClose">取消</ta-button>
            <ta-button type="primary"
                       @click="getGoods">确定</ta-button>
          </div>
        </ta-drawer>
        <div slot="footer">
          <ta-button key="back"
                     @click="handleCancel">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     @click="handleOkRevoke">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import WarehousingGoods from '../materialManagement/components/warehousingGoods'
import WarehousingGoodsEdit from '../materialManagement/components/warehousingGoodsEdit'
import { debuglog } from 'util'
import moment from 'moment'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '入库日期',
    dataIndex: 'inHouseTime',
    width: '16%'
  },
  {
    title: '物资名称',
    dataIndex: 'materialName',
    width: '16%'
  },
  {
    title: '物资类别',
    dataIndex: 'materialTypeName',
    width: '16%'
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '入库数量',
    dataIndex: 'inNumber',
    width: '16%'
  },
  {
    title: '单位',
    dataIndex: 'meterageUnit',
    width: '13%'
  },
  {
    title: '操作人员',
    dataIndex: 'updateUser',
    width: '25%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'operate',
    width: 150,
    scopedSlots: { customRender: 'operate' }
  }
]
const addTableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '物资名称',
    dataIndex: 'materialName',
    width: '33%'
  },
  {
    title: '物资类别',
    dataIndex: 'materialTypeName',
    width: '33%'
  },
  {
    title: '入库数量',
    dataIndex: 'inNumber',
    width: 200,
    scopedSlots: { customRender: 'inNumber' }
  },
  {
    title: '单位',
    dataIndex: 'meterageUnit',
    width: '34%'
  },
  {
    title: '入库日期',
    dataIndex: 'inHouseTime',
    width: 200,
    scopedSlots: { customRender: 'inHouseTime' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'operate',
    width: 80,
    scopedSlots: { customRender: 'operate' }
  }
]
const editTableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '物资名称',
    dataIndex: 'materialName',
    width: 200,
    scopedSlots: { customRender: 'materialName' }
  },
  {
    title: '物资类别',
    dataIndex: 'materialTypeName',
    width: 140
  },
  {
    title: '入库数量',
    dataIndex: 'inNumber',
    width: 200,
    scopedSlots: { customRender: 'inNumber' }
  },
  {
    title: '单位',
    dataIndex: 'meterageUnit',
    width: '120px'
  },
  {
    title: '入库日期',
    dataIndex: 'inHouseTime',
    width: 200,
    scopedSlots: { customRender: 'inHouseTime' }
  }
]

const nameTableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '16%',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '物资名称',
    dataIndex: 'materialName',
    width: '47%'
  },
  {
    title: '所属类别',
    dataIndex: 'materialTypeName',
    width: '47%'
  }
]

export default {
  mixins: [listMixin],
  components: {
    WarehousingGoods,
    WarehousingGoodsEdit
  },
  data () {
    return {
      // 入库弹窗
      visible: false, // 入库弹窗显隐
      width: '500px',
      confirmLoading: false,
      addTableColumns: addTableColumns,
      addTableData: [],

      // 入库弹窗中的物资名称弹窗
      nameTableColumns: nameTableColumns,
      editTableColumns: editTableColumns,
      nameTableData: [],
      editTableData: [],
      nameDrawer: false, // 物品名称弹窗显隐
      disabledExp: true,
      headers: {
        // 文件上传
        authorization: 'authorization-text'
      },
      fileName: 'xxx.txt',
      totalGoods: 0,
      total: 0,

      // 列表
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/rescueMaterialInHouse/list', // 数据列表接口，API地址
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: true, // 是否需要筛选
        mixDeleteURL: '/rescueMaterialInHouse/updateDelStateById', // 删除接口，API地址
        mixExportURL: '/rescueMaterialInHouse/export', // 导出接口，API地址
        mixAddURL: '/rescueMaterialInHouse/save', // 新增接口
        mixEditURL: '/rescueMaterialInHouse/update', // 编辑接口
        mixTypeURL: '/rescueMaterialType/queryMaterialType', // 获取物资类型
        mixListURL: '/rescueMaterialInHouse/queryMaterialList' // 选择物品列表接口
      },
      dataSource: [],
      mixColumns,
      mixPageRef: 'gridPagerO',
      size: 10,
      page: 1,
      mixDataForm: ['name'],
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      tableData: [], // 暂时写死，之后改为mixDataList

      // 入库弹窗中物资名称的行选择
      mixRowSelectionName: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        selectedRowValuesName: [],
        // 行选择改变事件
        onChange: this.onSelectChangeName
      },
      materialInHouseIds: [],
      materialTypeList: [],
      childMaterialType: [],

      // 入库修改弹窗
      disabled: false,
      editVisible: false,
      baseType: '',
      nowType: '',
      goType: '0'
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   this.routeWatchT()
  //   next()
  // },
  activated () {
    // this.routeWatchT()
    this.materialType()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    routeWatchT () {
      console.log(this.Base.getNowPageParam())
      this.baseType = this.Base.getNowPageParam().type
      console.log(this.baseType)
      if (this.baseType == 'welfare') {
        // 查询
        this.mixListOptions.mixGetDataListURL = '/welfareMaterialInHouse/list'
        // 批量导出
        this.mixListOptions.mixExportURL = '/welfareMaterialInHouse/export'
        // 删除
        this.mixListOptions.mixDeleteURL =
          '/welfareMaterialInHouse/updateDelStateById'
        // 新增
        this.mixListOptions.mixAddURL = '/welfareMaterialInHouse/save'
        // 编辑
        this.mixListOptions.mixEditURL = '/welfareMaterialInHouse/update'
        // 获取选择物品列表
        this.mixListOptions.mixListURL =
          '/welfareMaterialInHouse/queryMaterialList'
        // 获取物资类型数据
        this.mixListOptions.mixTypeURL =
          '/welfareMaterialType/queryMaterialType'
      } else if (this.baseType == 'rescue') {
        this.mixListOptions.mixGetDataListURL = '/rescueMaterialInHouse/list'
        this.mixListOptions.mixExportURL = '/rescueMaterialInHouse/export'
        this.mixListOptions.mixDeleteURL =
          '/rescueMaterialInHouse/updateDelStateById'
        // 新增
        this.mixListOptions.mixAddURL = '/rescueMaterialInHouse/save'
        // 编辑
        this.mixListOptions.mixEditURL = '/rescueMaterialInHouse/update'
        this.mixListOptions.mixListURL =
          '/rescueMaterialInHouse/queryMaterialList'
        this.mixListOptions.mixTypeURL =
          '/rescueMaterialType/queryMaterialType'
      }
      this.handleSubmit()
    },
    deletes (val, obj, index) {
      console.log(index)
      this.addTableData.splice(index, 1)
    },
    // 批量导出
    exportFils () {
      let formData = this.searchForm.getFieldsValue()
      console.log(formData)
      // this.changetime(formData)
      let params = {
        ...formData
      }
      console.log(this.materialInHouseIds)
      if (this.materialInHouseIds.length > 0) {
        this.materialInHouseIds = this.materialInHouseIds.join(',')
        params.materialInHouseIds = encodeURI(this.materialInHouseIds).replace(
          /,/g,
          '%2c'
        )
      }
      this.exportFile(this.mixListOptions.mixExportURL, params)
    },
    // 确定删除
    async deltrueMy (val, obj, index) {
      console.log(obj)
      if (obj.isDelete == '1') {
        let params = {}
        params.id = obj.id
        params.materialId = obj.materialId
        params.inNumber = obj.inNumber
        let _self = this
        await _self.post(this.mixListOptions.mixDeleteURL, params).then(res => {
          if (Object.keys(res.data)[0] == '3') {
            console.log(11111111111)
            this.$message.error(res.data[3])
          } else if (Object.keys(res.data)[0] == '2') {
            this.$message.error(res.data[2])
          } else if (Object.keys(res.data)[0] == '1') {
            this.$message.success(res.data[1])
            this.editVisible = false
            this.handleSubmit()
            // this.aa()
          }
        })
      } else if (obj.isDelete == '0') {
        this.$message.error('该物资名称已经删除，不能对本条记录进行删除操作')
      }
    },
    // 多选
    onSelectChangeName (selectedRowKeys, selectedRows) {
      const currentDate = moment(new Date()).format('YYYY-MM-DD')
      this.mixRowSelectionName.selectedRowKeys = selectedRowKeys
      selectedRows.forEach(item => {
        item.inHouseTime = currentDate // 入库时间默认为当前时间
        // item.meterageUnit = '个' // 单位暂时写死，后期去掉
      })
      this.mixRowSelectionName.selectedRowValuesName = selectedRows
      console.log(this.mixRowSelectionName.selectedRowValuesName)
    },
    // 入库选择框
    onSelectChange (selectedRowKeys, selectedRows) {
      this.materialInHouseIds = []
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      selectedRows.map((item, index) => {
        this.materialInHouseIds.push(item.id)
      })
      if (selectedRowKeys.length > 0) {
        // this.disabledExp = false
      } else if (selectedRowKeys.length == 0) {
        // this.disabledExp = true
      }
      console.log(this.mixRowSelection.selectedRowKeys)
      console.log(this.materialInHouseIds)
    },
    onClose () {
      this.visible = false
      // this.page = 1
      // this.pageSize = 10
    },
    // 入库--确定提交
    async submitData () {
      console.log(this.addTableData)
      if (this.addTableData.length > 0) {
        this.addTableData.map((item, index) => {
          item.materialId = item.id
          console.log(item)
        })
        let params
        params = {
          rescueMaterialInHouseVoList: this.addTableData
        }
        for (var i = 0; i < this.addTableData.length; i++) {
          if (this.addTableData[i].inNumber == null) {
            this.$message.error('请填写入库数量')
            return false
          }
        }
        this.post(this.mixListOptions.mixAddURL, params, true).then(res => {
          console.log(res)
          if (res.errors == null) {
            // this.$message.success('入库成功')
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
              this.handleSubmit()
            }
          }
        })
      } else {
        this.$message.error('请新增入库数据')
      }
    },
    // 选择物品弹框
    getOptions (index) {
      this.nameDrawer = true
      this.nowType = ''
      console.log(this.mixRowSelectionName)
      this.$nextTick(() => {
        this.searchForm.resetFields()
      })
      this.$nextTick(() => {
        this.mixRowSelectionName.selectedRowKeys = []
        this.mixRowSelectionName.selectedRowValuesName = []
      })
      // this.$nextTick(() => {
      //   this.getList()
      // })
      // this.$refs.gridPager.loadData(data => {
      //   // 这里是查询后的回调,可以不实现
      // })
    },
    // 选择物品
    showChildrenDrawer () {
      this.nowType = 1
      if (this.nowType == '1') {
      }
      this.nameDrawer = true

      console.log(this.mixRowSelectionName)
      this.$nextTick(() => {
        this.searchForm.resetFields()
      })
      this.$nextTick(() => {
        this.mixRowSelectionName.selectedRowKeys = []
        this.mixRowSelectionName.selectedRowValuesName = []
      })
    },
    // 关闭选择物品
    onChildrenDrawerClose () {
      this.nameDrawer = false
      let _self = this
      _self.mixRowSelectionName.selectedRowKeys = []
      _self.mixRowSelectionName.selectedRowValuesName = []
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 入库点击事件
    warehousing () {
      this.visible = true
      this.addTableData = []
    },
    // 子组件传递
    clickSelsec (val) {
      this.mixRowSelectionName.selectedRowValuesName = val
    },
    // 选择物品的确定事件
    getGoods () {
      console.log(2222)
      let _self = this
      console.log(_self.mixRowSelectionName.selectedRowValuesName)
      if (_self.mixRowSelectionName.selectedRowValuesName.length > 0) {
        _self.nameDrawer = false
        _self.$nextTick(() => {
          if (this.nowType == '1') {
            _self.addTableData =
              _self.mixRowSelectionName.selectedRowValuesName
          } else {
            console.log(
              _self.mixRowSelectionName.selectedRowValuesName.materialName
            )
            _self.editTableData[0].materialName =
              _self.mixRowSelectionName.selectedRowValuesName[0].materialName
            _self.editTableData[0].materialTypeName =
              _self.mixRowSelectionName.selectedRowValuesName[0].materialTypeName
            _self.editTableData[0].materialTypeId =
              _self.mixRowSelectionName.selectedRowValuesName[0].materialTypeId
            _self.editTableData[0].materialId =
              _self.mixRowSelectionName.selectedRowValuesName[0].id
            _self.editTableData[0].meterageUnit =
              _self.mixRowSelectionName.selectedRowValuesName[0].meterageUnit
            console.log(_self.editTableData[0].materialTypeName)
            // _self.addTableData.map((item, index) => {
            //   inHouseTime=item.date
            // })
            _self.mixRowSelectionName.selectedRowKeys = []
            _self.mixRowSelectionName.selectedRowValuesName = []
          }
        })
      } else {
        this.$message.error('请选择物品')
      }
      this.page = 1
      this.pageSize = 10
    },
    // 入库弹窗的列数据编辑
    changeData ({ newData, record, columnKey }) {
      // 将单元格数据修改为新值（newData：返回改变的值、record：该行的行数据、columnKey：该列的key）
      if (newData < 0 || newData == 0) {
        newData = 1
      } else if (newData > 2147483647) {
        newData = 2147483647
      }
      record[columnKey] = newData.toFixed(0)
    },
    changeDataOne ({ newData, record, columnKey }) {
      record[columnKey] = newData
    },
    // 修改弹窗取消点击事件
    handleCancel (e) {
      this.editVisible = false
      this.modelForm.resetFields()
    },
    // 修改弹窗确定点击事件
    async handleOkRevoke () {
      this.modelForm.validateFields(async (err, values) => {
        if (!err) {
          let formData = this.modelForm.getFieldsValue()
          console.log(formData)
          this.changetime(formData)
          formData = { ...this.editTableData[0] }
          this.post(this.mixListOptions.mixEditURL, formData).then(res => {
            console.log(res)
            if (Object.keys(res.data)[0] == '3') {
              console.log(11111111111)
              this.$message.error(res.data[3])
            } else if (Object.keys(res.data)[0] == '2') {
              this.$message.error(res.data[2])
            } else if (Object.keys(res.data)[0] == '1') {
              this.$message.success(res.data[1])
              this.editVisible = false
              this.handleSubmit()
              // this.aa()
            } else if (Object.keys(res.data)[0] == '4') {
              this.$message.error(res.data[4])
            }
          })
        }
      })
    },
    // 入库修改
    editRecord (val, obj) {
      let res = obj
      let str = JSON.stringify(res)
      res = JSON.parse(str)
      this.editTableData = []
      if (res.isDelete == '1') {
        this.editVisible = true
        // this.changetime(record)
        // this.$nextTick(() => {
        this.editTableData.push(res)
        // })
      } else if (res.isDelete == '0') {
        this.editVisible = false
        this.$message.error('该物资名称已经删除，不能对本条记录进行修改操作')
      }
    },
    // 获取物资类别
    async materialType () {
      let data = await this.post(this.mixListOptions.mixTypeURL)
      console.log(data)
      this.materialTypeList = data.data.data
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>