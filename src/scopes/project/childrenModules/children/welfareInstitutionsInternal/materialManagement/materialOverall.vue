<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="物资名称"
                          fieldDecoratorId="materialName"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入物资名称" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn"
             v-if="isshow">
          <ta-button type="primary"
                     class="btnleft"
                     icon="bars"
                     @click="typeManage">物资类型管理</ta-button>
          <ta-button type="primary"
                     @click="add"
                     icon='plus'>新增物资</ta-button>
          <!-- <ta-button class="btnleft exportbtn"
                       style="float: right;"
                       icon="upload"
                       @click="exportFils()">批量导出</ta-button> -->

        </div>
        <div v-else
             style="margin-bottom: 16px;"></div>
        <ta-table bordered
                  class="table-min-width"
                  :showOverflowTooltip="true"
                  :columns="mixColumns"
                  :dataSource="tableData"
                  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                  :pagination="false"
                  :scroll="mixColumns.length>8?{x: 2000 }:{}"
                  @change="handleTableChange">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="operate"
                slot-scope="text, record">
            <ta-table-operate :operateMenu="operateMenu"
                              :record="record"></ta-table-operate>
          </span>
          <div class="btnlist"
               slot="operate"
               slot-scope="val,obj,index">
            <a>
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deletes(val,obj,index)"
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
        <ta-pagination  :defaultCurrent="page"
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
    <ta-drawer title="新增"
               width="500"
               :getContainer="setContainer"
               :closable="false"
               @close="onClose"
               :visible="visible">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="物资名称"
                      fieldDecoratorId="materialName"
                      :fieldDecoratorOptions="rules.materialName">
          <ta-input :disabled="disabled"
                    placeholder="请输入物资名称" />
        </ta-form-item>
        <ta-form-item label="所属类别"
                      fieldDecoratorId="materialTypeId"
                      :require="{message:'请选择所属类别'}">
          <ta-tree-select :treeData="parentType"
                          showCheckedStrategy="SHOW_CHILD"
                          searchPlaceholder="Please select"
                          placeholder="请选择所属类别" />
        </ta-form-item>
        <ta-form-item label="单位"
                      fieldDecoratorId="meterageUnit"
                      :fieldDecoratorOptions="rules.meterageUnit">
          <ta-input :disabled="disabled"
                    placeholder="请输入单位" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button style="marginRight: 8px"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
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
    title: '物资名称',
    dataIndex: 'materialName',
    width: '20%'
  },
  {
    title: '所属类别',
    dataIndex: 'materialTypeName',
    width: '20%'
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    width: '20%'
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
    width: '16%'
  },
  {
    title: '更新人员',
    dataIndex: 'updateUser',
    width: '24%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'operate',
    width: 100,
    scopedSlots: { customRender: 'operate' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      // 列表
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '', // 数据列表接口，API地址
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: true, // 是否需要筛选
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '', // 导出接口，API地址
        mixAddURL: '', // 新增接口
        mixEditURL: '', // 编辑接口
        mixListURL: '', // 选择物品列表接口
        mixTypeURL: '' // 获取物资类型
      },
      selectedRowKeys: [],
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      // mixLimit: 10,
      mixDataForm: ['name'],
      page: 1,
      size: 10,
      tableData: [], // 暂时写死，之后改为mixDataList
      visible: false,
      disabled: false,
      disabledExp: true,
      parentType: [],
      baseType: '',
      isshow: window.parent.indexTool.getUserInfo().orgType == '98' || window.parent.indexTool.getUserInfo().orgType == '99', //
      rules: {
        materialName: this.verificationRules('物资名称', 72),
        meterageUnit: this.verificationRules('单位', 20)
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routeWatchAll()
    next()
  },
  activated () {
    this.routeWatchAll()
    this.selectedRowKeys = []
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    routeWatchAll () {
      this.baseType = this.Base.getNowPageParam().type
      if (this.baseType == 'welfare') {
        // 查询
        this.mixListOptions.mixGetDataListURL = '/welfareMaterial/list'
        // 批量导出
        this.mixListOptions.mixExportURL = '/welfareMaterial/export'
        // 新增
        this.mixListOptions.mixAddURL = '/welfareMaterial/save'
        // 获取物资类型数据
        this.mixListOptions.mixTypeURL =
          '/welfareMaterialType/queryMaterialType'
        this.mixListOptions.mixDeleteURL =
          '/welfareMaterial/updateDelStateById'
      } else if (this.baseType == 'rescue') {
        this.mixListOptions.mixGetDataListURL = '/rescueMaterial/list'
        this.mixListOptions.mixExportURL = '/rescueMaterial/export'
        // 新增
        this.mixListOptions.mixAddURL = '/rescueMaterial/save'
        this.mixListOptions.mixTypeURL =
          '/rescueMaterialType/queryMaterialType'
        this.mixListOptions.mixDeleteURL = '/rescueMaterial/updateDelStateById'
      }
      this.handleSubmit()
    },
    // 物资类型管理
    typeManage () {
      if (this.baseType == 'welfare') {
        this.$router.push({
          name: 'materialType',
          params: {}
        })
      } else if (this.baseType == 'rescue') {
        this.$router.push({
          name: 'materialTypeTwo',
          params: {}
        })
      }
    },
    // 删除
    deletes (val, obj, index) {
      if (obj.inventory == '0') {
        this.post(this.mixListOptions.mixDeleteURL, { id: obj.id }).then(
          res => {
            if (res.errors == null) {
              this.$message.success('删除成功')
              this.handleSubmit()
            }
          }
        )
      } else {
        this.$message.error('该物资还存在库存，不可删除！')
      }
    },
    // 点击每行的checkbox会触发,点击全选也会触发
    onSelectChange (selectedRowKeys, selectedRows) {
      this.materialTypeIds = []
      this.selectedRowKeys = []
      if (selectedRowKeys.length > 0) {
        // this.disabledExp = false
      } else if (selectedRowKeys.length == 0) {
        // this.disabledExp = true
      }
      selectedRows.map((item, index) => {
        this.materialTypeIds.push(item.id)
      })
      this.selectedRowKeys = selectedRowKeys
    },
    // 批量导出
    exportFils () {
      const formData = this.searchForm.getFieldsValue()
      const params = {
        ...formData
      }
      if (this.materialTypeIds.length > 0) {
        this.materialTypeIds = this.materialTypeIds.join(',')
        params.materialTypeIds = encodeURI(this.materialTypeIds).replace(
          /,/g,
          '%2c'
        )
      }
      this.exportFile(this.mixListOptions.mixExportURL, params)
    },
    add () {
      this.visible = true
      this.$nextTick(() => {
        this.parentType = []
        this.form.resetFields()
      })
      this.$nextTick(() => {
        this.getParentType()
      })
    },
    // 新增获取物资类型
    async getParentType () {
      const data = await this.post(this.mixListOptions.mixTypeURL)
      if (data.data.errors == null) {
        data.data.data.map((item, index) => {
          this.parentType.push(item)
        })
      }
    },
    // 新增---确定
    async submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = this.form.getFieldsValue()
          const params = {
            ...formData
          }
          this.post(this.mixListOptions.mixAddURL, params).then(res => {
            if (res.errors == null) {
              if (Object.keys(res.data)[0] == '3') {
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
        }
      })
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
