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
            <ta-input placeholder="请输入物资名称"/>
          </ta-form-item>
          <ta-form-item label="物资类别"
                        class="spilwid"
                        fieldDecoratorId="materialTypeId"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-tree-select :treeData="materialTypeList"
                            showCheckedStrategy="SHOW_CHILD"
                             placeholder="请选择物资类别"  />
          </ta-form-item>
          <ta-form-item label="出库日期"
                        class="spilwid3"
                        fieldDecoratorId="outHouseTime"
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
          <ta-button type="primary"
                     icon='plus'
                     @click="warehousing()">出库</ta-button>
          <!-- <ta-button class="btnleft exportbtn"
                       icon='upload'
                       @click="exportFils()">导出</ta-button> -->

        </div>
        <ta-table :columns="mixColumns"
                  class="table-min-width"
                  :showOverflowTooltip="true"
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
          <div class="btnlist"
               slot="operate"
               slot-scope="text, record">
            <a>
              <span class="com_textedit"
                    @click="seeData(text, record,'0')">编辑</span>
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
      </div>
      <div slot="footer">
        <ta-pagination v-if="mixListOptions.mixGetDataListIsPage"
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
    <!-- 出库弹窗 -->
    <div>
      <ta-drawer title="物资出库"
                 width="1000"
                 :getContainer="setContainer"
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
          <ta-table-edit slot="outNumber"
                         slot-scope="text, record"
                         type="inputNumber"
                         @change="changeData"></ta-table-edit>
          <ta-table-edit slot="outHouseTime"
                         slot-scope="text, record"
                         type="datePicker"
                         @change="changeDataOne"></ta-table-edit>
          <template slot="employeeName"
                    slot-scope="a,b,c">
            <div class="textout">
              <span class="tabtext">{{b.employeeName}}</span>
              <ta-button type="primary"
                         class="btn"
                         @click="getOptions(c)">选择</ta-button>
            </div>
          </template>
          <div slot="operate"
               slot-scope="val,obj,index">
            <a>
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deletes(val,obj,index)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <span>删除</span>
              </ta-popconfirm>
            </a>
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
                            url="/rescueMaterialOutHouse/queryMaterialList"></WarehousingGoods>
          <div slot="footer">
            <ta-button key="back"
                       @click="goodsCancel">取消</ta-button>
            <ta-button type="primary"
                       @click="getGoods">确定</ta-button>
          </div>
        </ta-drawer>
        <ta-drawer title="选择领用人"
                   width="700"
                   :getContainer="setContainer"
                   :closable="false"
                   @close="onChildrenDrawerClose"
                   :visible="peopleDrawer">
          <SelectPeople v-if="peopleDrawer"
                        :tableColumns="peopleTableColumns"
                        @onChangePeople="onChangePeople"
                        :goType="goType"
                        ref="mychildP"
                        url="/rescueMaterialOutHouse/queryRescueEmployeeList"></SelectPeople>
          <div slot="footer">
            <ta-button key="back"
                       @click="peopleCancel">取消</ta-button>
            <ta-button type="primary"
                       @click="getEmployee">确定</ta-button>
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
    <!-- 详情、修改弹窗 -->
    <div>
      <ta-drawer :title="type==0?'物资出库编辑':'物资出库详情'"
                 width="1010"
                 :getContainer="setContainer"
                 :closable="false"
                 @close="onClose"
                 :visible="editVisible">
        <ta-form :autoFormCreate="(peopleForm)=>{this.peopleForm = peopleForm}"
                 layout="horizontal"></ta-form>
        <ta-table class="tables"
                  :showOverflowTooltip="true"
                  :columns="editTableColumns"
                  :dataSource="editTableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <ta-table-edit slot="outNumber"
                         slot-scope="text, record"
                         type="inputNumber"
                         @change="changeData"></ta-table-edit>
          <ta-table-edit slot="outHouseTime"
                         slot-scope="text, record"
                         type="datePicker"
                         @change="changeDataOne"></ta-table-edit>

          <template slot="materialName"
                    slot-scope="a,b,c">
            <div class="textout">
              <span class="tabtext">{{b.materialName}}</span>
              <ta-button type="primary"
                         class="btn"
                         @click="getOptionsC(c)">选择</ta-button>
            </div>
          </template>
          <template slot="employeeName"
                    slot-scope="a,b,c">
            <div class="textout">
              <span class="tabtext">{{b.employeeName}}</span>
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
                   :getContainer="setContainer"
                   :closable="false"
                   @close="onChildrenDrawerClose"
                   :visible="nameDrawer">
          <WarehousingGoodsEdit v-if="nameDrawer"
                                :tableColumns="nameTableColumns"
                                @clickSelsec="clickSelsec"
                                :goType="goType"
                                ref="mychild"
                                url="/rescueMaterialOutHouse/queryMaterialList"></WarehousingGoodsEdit>
          <div slot="footer">
            <ta-button style="marginRight: 8px"
                       @click="onChildrenDrawerClose">取消</ta-button>
            <ta-button type="primary"
                       @click="getGoods">确定</ta-button>
          </div>
        </ta-drawer>
        <ta-drawer title="选择领用人"
                   width="700"
                   :closable="false"
                   :getContainer="setContainer"
                   @close="onChildrenDrawerClose"
                   :visible="peopleDrawer">
          <SelectPeople v-if="peopleDrawer"
                        :tableColumns="peopleTableColumns"
                        @onChangePeople="onChangePeople"
                        :goType="goType"
                        ref="mychildP"
                        url="/rescueMaterialOutHouse/queryRescueEmployeeList"></SelectPeople>
          <div slot="footer">
            <ta-button key="back"
                       @click="peopleCancel">取消</ta-button>
            <ta-button type="primary"
                       @click="getEmployee">确定</ta-button>
          </div>
        </ta-drawer>
        <div slot="footer">
          <ta-button key="back"
                     @click="handleCancel">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="type==0"
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
import SelectPeople from '../materialManagement/components/selectPeople'
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
    title: '出库日期',
    dataIndex: 'outHouseTime',
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
    title: '出库数量',
    dataIndex: 'outNumber',
    width: '16%'
  },
  {
    title: '领用人员',
    dataIndex: 'employeeName',
    width: '16%'
  },
  {
    title: '操作人员',
    dataIndex: 'updateUser',
    width: '20%'
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
    width: '30%'
  },
  {
    title: '物资类别',
    dataIndex: 'materialTypeName',
    width: '30%'
  },
  {
    title: '出库数量',
    dataIndex: 'outNumber',
    width: 150,
    scopedSlots: { customRender: 'outNumber' }
  },
  {
    title: '单位',
    dataIndex: 'meterageUnit',
    width: '20%'
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    width: '20%'
  },
  {
    title: '出库日期',
    dataIndex: 'outHouseTime',
    width: 170,
    scopedSlots: { customRender: 'outHouseTime' }
  },
  {
    title: '领用人',
    dataIndex: 'employeeName',
    width: 150,
    scopedSlots: { customRender: 'employeeName' }
  },
  // {
  //   title: '',
  //   dataIndex: 'select',
  //   width: 20,
  //   scopedSlots: { customRender: 'select' }
  // },
  {
    title: '操作',
    overflowTooltip: false,
    width: 70,
    dataIndex: 'operate',
    scopedSlots: { customRender: 'operate' }
  }
]

const nameTableColumns = [
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
    scopedSlots: { customRender: 'materialName' },
    width: '240px'
  },
  {
    title: '所属类别',
    dataIndex: 'materialTypeName',
    width: '230px'
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
    width: 175,
    scopedSlots: { customRender: 'materialName' }
  },
  {
    title: '物资类别',
    dataIndex: 'materialTypeName',
    width: 100
  },
  {
    title: '出库数量',
    dataIndex: 'outNumber',
    width: 150,
    scopedSlots: { customRender: 'outNumber' }
  },

  {
    title: '单位',
    dataIndex: 'meterageUnit',
    width: 70
  },
  {
    title: '库存',
    width: 80,
    dataIndex: 'inventory'
  },
  {
    title: '出库日期',
    dataIndex: 'outHouseTime',
    width: 150,
    scopedSlots: { customRender: 'outHouseTime' }
  },
  {
    title: '领用人',
    dataIndex: 'employeeName',
    width: 175,
    scopedSlots: { customRender: 'employeeName' }
  }
]
const peopleTableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '员工编号',
    dataIndex: 'employeeNumber',
    width: '100px'
  },
  {
    title: '员工姓名',
    dataIndex: 'name',
    width: '100px'
  },
  {
    title: '所在科室',
    dataIndex: 'department',
    width: '100px'
  },
  {
    title: '职务',
    dataIndex: 'post',
    width: '100px'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '100px'
  }
]

export default {
  mixins: [listMixin],
  components: {
    WarehousingGoods,
    WarehousingGoodsEdit,
    SelectPeople
  },
  data () {
    return {
      sexList: [],
      // 出库弹窗
      visible: false, // 出库弹窗显隐
      width: '500px',
      confirmLoading: false,
      addTableColumns: addTableColumns,
      addTableData: [],
      addOperateMenu: [
        {
          name: '删除',
          class: 'com_textdel',
          onClick: record => {
            let _self = this
            _self.deleteListItemMy(record, 'id', 'id')
          }
        }
      ],
      // 修改rules
      rules: {
        materialName: this.verificationRules('物资名称', 72),
        // outNumber: this.verificationRules('出库数量', 20),
        meterageUnit: this.verificationRules('计量单位', 20)
      },
      // 出库弹窗中的物资名称弹窗
      nameTableColumns: nameTableColumns,
      nameTableData: [],
      editTableColumns: editTableColumns,
      editTableData: [],
      nameDrawer: false, // 物品名称弹窗显隐
      // 出库弹窗中物资名称的行选择
      mixRowSelectionName: {
        // type: 'radio',
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        selectedRowValuesName: [],
        // 行选择改变事件
        onChange: this.onSelectChangeName
      },
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      materialInHouseIds: [],
      // 出库弹窗中的领用人弹窗
      peopleTableColumns: peopleTableColumns,
      peopleTableData: [],
      peopleDrawer: false, // 领用人弹窗显隐
      // 出库弹窗中领用人的行选择
      mixRowSelectionPeople: {
        type: 'radio',
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 单选选数组
        selectedRowValuesPeople: [],
        // 行选择改变事件
        onChange: this.onSelectChangePeople
      },
      index: -1, // 出库列表选择领用人的行索引

      headers: {
        // 文件上传
        authorization: 'authorization-text'
      },
      fileName: 'xxx.txt',

      // 列表
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/rescueMaterialOutHouse/list', // 数据列表接口，API地址
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: true, // 是否需要筛选
        mixDeleteURL: '/rescueMaterialOutHouse/updateDelStateById', // 删除接口，API地址
        mixExportURL: '/rescueMaterialOutHouse/export', // 导出接口，API地址
        mixAddURL: '/rescueMaterialOutHouse/save', // 新增接口
        mixEditURL: '/rescueMaterialOutHouse/update', // 编辑接口
        mixListURL: '/rescueMaterialOutHouse/queryMaterialList', // 选择物品列表接口
        mixTypeURL: '/rescueMaterialType/queryMaterialType', // 获取物资类型
        mixSelectPeopleURL: '/rescueMaterialOutHouse/queryRescueEmployeeList' // 获取领用人
      },
      dataSource: [],
      mixColumns,
      mixPageRef: 'gridPagerO',
      size: 10,
      page: 1,
      totalGoods: 0,
      total: 0,
      mixDataForm: ['name'],

      tableData: [], // 暂时写死，之后改为mixDataList

      // 详情、修改弹窗
      disabled: false,
      editVisible: false,
      baseType: '',
      type: 0, // 详情（1）、编辑（0）标识符
      materialTypeList: [],
      nowType: '',
      goType: '1'
    }
  },
  //   beforeRouteUpdate (to, from, next) {
  //     console.log(to)
  //     console.log(from)
  //     this.routeWatchDept()
  //     next()
  //   },
  activated () {
    // this.page = 1
    // this.size = 10
    this.materialType()
  },
  mounted () {
    // this.routeWatchDept()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    routeWatchDept () {
      console.log(this.Base.getNowPageParam())
      this.baseType = this.Base.getNowPageParam().type
      console.log(this.baseType)
      if (this.baseType == 'welfare') {
        // 查询
        this.mixListOptions.mixGetDataListURL = '/welfareMaterialOutHouse/list'
        // 批量导出
        this.mixListOptions.mixExportURL = '/welfareMaterialOutHouse/export'
        // 删除
        this.mixListOptions.mixDeleteURL =
          '/welfareMaterialOutHouse/updateDelStateById'
        // 新增
        this.mixListOptions.mixAddURL = '/welfareMaterialOutHouse/save'
        // 编辑
        this.mixListOptions.mixEditURL = '/welfareMaterialOutHouse/update'
        // 获取选择物品列表
        this.mixListOptions.mixListURL =
          '/welfareMaterialOutHouse/queryMaterialList'
        // 获取物资类型数据
        this.mixListOptions.mixTypeURL =
          '/welfareMaterialType/queryMaterialType'
        // 选择领用人
        this.mixListOptions.mixSelectPeopleURL =
          '/welfareMaterialOutHouse/queryWelfareEmployeeList'
      } else if (this.baseType == 'rescue') {
        this.mixListOptions.mixGetDataListURL = '/rescueMaterialOutHouse/list'
        this.mixListOptions.mixExportURL = '/rescueMaterialOutHouse/export'
        this.mixListOptions.mixDeleteURL =
          '/rescueMaterialOutHouse/updateDelStateById'
        // 新增
        this.mixListOptions.mixAddURL = '/rescueMaterialOutHouse/save'
        // 编辑
        this.mixListOptions.mixEditURL = '/rescueMaterialOutHouse/update'
        this.mixListOptions.mixListURL =
          '/rescueMaterialOutHouse/queryMaterialList'
        // 获取物资类型数据
        this.mixListOptions.mixTypeURL =
          '/rescueMaterialType/queryMaterialType'
        this.mixListOptions.mixSelectPeopleURL =
          '/rescueMaterialOutHouse/queryRescueEmployeeList'
      }
      this.handleSubmit()
    },
    // 数据反显
    seeData (text, record, val) {
      console.log(record)
      this.nowType = ''
      let res = record
      let str = JSON.stringify(res)
      res = JSON.parse(str)
      console.log('.....' + res)
      if (res.isDelete == '1') {
        if (val == '1') {
          this.type = 1
          this.editVisible = true
          this.disabled = true
        } else {
          this.type = 0
          this.editTableData = []
          this.editVisible = true
          this.disabled = false
          this.$nextTick(() => {
            this.editTableData.push(res)
          })
        }
      } else if (res.isDelete == '0') {
        this.editVisible = false
        this.$message.error('该物资名称已经删除，不能对本条记录进行修改操作')
      }

      console.log(record)
      this.$nextTick(() => {
        let data = res
        // data.outHouseTime = moment(data.outHouseTime);
        this.modelForm.setFieldsValue(data)
      })
    },
    // 导出选择框
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
    // 批量导出
    exportFils () {
      let formData = this.searchForm.getFieldsValue()
      console.log(formData)
      this.changetime(formData)
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
    // 自定义删除方法
    deleteListItemMy (val, ids, id) {
      console.log(val)
      var _this = this
      this.$confirm({
        title: '确定删除吗?',
        content: '',
        onOk () {
          let data = {
            [ids]: val[id]
          }
          _this.deltrueMy(data)
        },
        onCancel () { }
      })
    },
    // 删除
    async deltrueMy (text, record) {
      console.log(record)
      if (record.isDelete == '1') {
        let params = {}
        params.id = record.id
        params.materialId = record.materialId
        params.outNumber = record.outNumber
        let _self = this
        let data = await _self.post(this.mixListOptions.mixDeleteURL, params)
        if (data.errors == null) {
          _self.$message.success('删除成功')
          _self.handleSubmit()
        } else {
          for (let i = 0; i < data.errors.length; i++) {
            _self.$message.error(data.errors[i].msg)
          }
        }
      } else if (record.isDelete == '0') {
        this.$message.error('该物资名称已经删除，不能对本条记录进行删除操作')
      }
    },
    // 多选-物品名称
    onSelectChangeName (selectedRowKeys, selectedRows) {
      const currentDate = moment(new Date()).format('YYYY-MM-DD')
      this.mixRowSelectionName.selectedRowKeys = selectedRowKeys
      selectedRows.forEach(item => {
        item.outHouseTime = currentDate // 出库时间默认为当前时间
        // item.meterageUnit = '个' // 单位暂时写死，后期去掉
        // item.inventory  = "200"; // 库存暂时写死，后期去掉
      })
      this.mixRowSelectionName.selectedRowValuesName = selectedRows
    },
    // 单选-领用人
    onSelectChangePeople (selectedRowKeys, selectedRows) {
      this.mixRowSelectionPeople.selectedRowKeys = selectedRowKeys
      this.mixRowSelectionPeople.selectedRowValuesPeople = selectedRows
    },
    // 子组件onChangePeople
    onChangePeople (val1, val2) {
      console.log('111111111111')
      console.log(val1)
      console.log('22222222222')
      console.log(val2)
      this.mixRowSelectionPeople.selectedRowKeys = val1
      this.mixRowSelectionPeople.selectedRowValuesPeople = val2
    },
    onClose () {
      this.visible = false
    },
    showChildrenDrawer () {
      this.nowType = 1
      if (this.nowType == '1') {
        this.mixRowSelectionName.type = 'checkbox'
      }
      this.nameDrawer = true
      this.$nextTick(() => {
        this.mixRowSelectionName.selectedRowKeys = []
        this.mixRowSelectionName.selectedRowValuesName = []
      })
    },
    onChildrenDrawerClose () {
      this.nameDrawer = false
    },
    // 出库点击事件
    warehousing () {
      this.visible = true
      this.addTableData = []
      this.nowType = '1'
    },
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
            _self.editTableData[0].inventory =
              _self.mixRowSelectionName.selectedRowValuesName[0].inventory
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
    },
    // 子组件传递
    clickSelsec (val) {
      console.log(val)
      this.mixRowSelectionName.selectedRowValuesName = val
    },
    // 出库弹窗的列数据编辑
    changeData ({ newData, record, columnKey }) {
      if (newData < 0 || newData == 0) {
        newData = 1
      } else if (newData > 2147483647) {
        newData = 2147483647
      }
      // 将单元格数据修改为新值（newData：返回改变的值、record：该行的行数据、columnKey：该列的key）
      record[columnKey] = newData.toFixed(0)
    },
    changeDataOne ({ newData, record, columnKey }) {
      record[columnKey] = newData
    },
    // 选择领用人
    getOptions (index) {
      let _self = this
      _self.index = index
      _self.peopleDrawer = true
      // this.page = 1
      // this.size = 10
      this.$nextTick(() => {
        this.peopleForm.resetFields()
      })
      this.$nextTick(() => {
        this.mixRowSelectionName.selectedRowKeys = []
        this.mixRowSelectionName.selectedRowValuesName = []
      })
    },
    // 选择物品弹框
    getOptionsC (index) {
      this.nameDrawer = true
      this.nowType = ''
      if (this.nowType == '1') {
        this.mixRowSelectionName.type = 'checkbox'
      } else {
        this.mixRowSelectionName.type = 'radio'
      }
      console.log(this.mixRowSelectionName)
      this.$nextTick(() => {
        this.mixRowSelectionName.selectedRowKeys = []
        this.mixRowSelectionName.selectedRowValuesName = []
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    peopleCancel () {
      this.peopleDrawer = false
    },
    goodsCancel () {
      this.nameDrawer = false
    },
    // 选择领用人的确定事件
    getEmployee () {
      let _self = this
      _self.peopleDrawer = false

      if (this.nowType == '1') {
        _self.$set(
          _self.addTableData[_self.index],
          'employeeName',
          _self.mixRowSelectionPeople.selectedRowValuesPeople[0].name
        )
        _self.$set(
          _self.addTableData[_self.index],
          'employeeId',
          _self.mixRowSelectionPeople.selectedRowValuesPeople[0].id
        )
      } else {
        _self.$set(
          _self.editTableData[_self.index],
          'employeeName',
          _self.mixRowSelectionPeople.selectedRowValuesPeople[0].name
        )
        _self.$set(
          _self.editTableData[_self.index],
          'employeeId',
          _self.mixRowSelectionPeople.selectedRowValuesPeople[0].id
        )
      }
      console.log(_self.addTableData[_self.index])
      console.log(_self.mixRowSelectionPeople.selectedRowValuesPeople)
      _self.mixRowSelectionPeople.selectedRowKeysPeople = []
      _self.mixRowSelectionPeople.selectedRowValuesPeople = []
    },
    // 出库删除
    deletes (val, obj, index) {
      console.log(index)
      this.addTableData.splice(index, 1)
    },
    // 出库--确定提交
    async submitData () {
      console.log(this.addTableData)
      if (this.addTableData.length > 0) {
        this.addTableData.map((item, index) => {
          item.materialId = item.id
          console.log(item)
        })
        let params
        params = {
          rescueMaterialOutHouseVoList: this.addTableData
        }
        // let params = {
        //   welfareMaterialOutHouseVoList: this.addTableData
        // }
        for (var i = 0; i < this.addTableData.length; i++) {
          if (this.addTableData[i].outNumber == null) {
            this.$message.error('请填写出库数量')
            return false
          } else if (this.addTableData[i].employeeName == null) {
            this.$message.error('请选择领用人')
            return false
          }
        }
        this.post(this.mixListOptions.mixAddURL, params, true).then(res => {
          console.log(res)
          console.log(Object.keys(res.data))
          if (res.serviceSuccess == true) {
            if (Object.keys(res.data)[0] == '1') {
              console.log(11111111111)
              this.$message.error(res.data[1])
              // this.visible = false
              // this.handleSubmit()
            } else if (Object.keys(res.data)[0] == '0') {
              this.$message.success(res.data[0])
              this.visible = false
              this.handleSubmit()
            }
          }
        })
      } else {
        this.$message.error('请新增出库数据')
      }
    },
    // 详情、修改弹窗取消点击事件
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
              this.$message.error(res.data[1])
            } else if (Object.keys(res.data)[0] == '0') {
              this.$message.success(res.data[0])
              this.editVisible = false
              this.$nextTick(() => {
                // this.handleSubmit()
                this.aa()
              })
            }
          })
        }
      })
    },
    aa () {
      this.handleSubmit()
    },
    // 获取物资类别
    async materialType () {
      let data = await this.post(this.mixListOptions.mixTypeURL)
      console.log(data)
      this.materialTypeList = data.data.data
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
