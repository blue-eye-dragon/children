<!--
 * @Date: 2021-06-21 10:37:36
 * @information: 设备出库记录列表
-->
<template>
  <div id="device-out-record-list"
       class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <!-- 搜索区域 -->
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.searchForm = form}">

            <AreaQuery msg="使用区域"
                       class="spilwid"
                       :labelCol="{ span: 7 }"
                       :wrapperCol="{span:14}"
                       types='2'
                       :addressmodel="addressmodel"
                       @setaddress="setaddress('areaId', 'addressmodel')"
                       @adsvalchange="adsvalchange"
                       :fileldName="'areaId'"
                       :ishide="false"></AreaQuery>

            <ta-form-item label="合同编号"
                          class="spilwid"
                          fieldDecoratorId="contractNumber"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入合同编号" />
            </ta-form-item>

            <ta-form-item label="出库时间"
                          class="spilwid"
                          fieldDecoratorId="outBoundTime"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:17}">
              <ta-range-picker />
            </ta-form-item>

            <ta-form-item label="运维结束日期"
                          class="spilwid"
                          fieldDecoratorId="maintainValidityTime"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-range-picker />
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
        <!-- 列表区域 -->
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <!-- <span slot="activationDate"
                slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </span> -->

          <span slot="action"
                class="btnlist"
                slot-scope="text,obj">
            <span @click="onEdit(obj)"
                  class="com_textsee">编辑</span>
          </span>
        </ta-table>
      </div>
      <!-- 底部区域 -->
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       @showSizeChange="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>

    <!-- 编辑侧滑 -->
    <ta-drawer title="编辑"
               width="600"
               placement="right"
               :getContainer="setContainer"
               @close="onEditCancel"
               :visible="isShowEditDrawer"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <deviceEditForm v-if="isShowEditDrawer"
                      ref="deviceEditFormRef"
                      :tableRow="tableRow"
                      :disabled="disabled"></deviceEditForm>

      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="onEditCancel">取消</ta-button>
        <ta-button @click="onEditSubmit"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>

  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import deviceEditForm from './components/deviceEditForm.vue'
import moment from 'moment'

const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '出库时间',
    align: 'center',
    dataIndex: 'outBoundTime',
    width: '20%'
  },
  {
    title: '合同编号',
    align: 'center',
    dataIndex: 'contractNumber',
    width: '20%'
  },
  {
    title: '使用区域',
    align: 'center',
    dataIndex: 'useAreaDetailAll',
    width: '30%'
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'equipmentCount',
    width: '12%'
  },
  {
    title: '出库人',
    align: 'center',
    dataIndex: 'outBoundPeople',
    width: '20%'
  },
  {
    title: '收货地点',
    align: 'center',
    dataIndex: 'takeGoodsAddressDetailAll',
    width: '30%'
  },
  {
    title: '发货日期',
    align: 'center',
    dataIndex: 'sendGoodsTime',
    width: '25%'
  },
  {
    title: '收货人',
    align: 'center',
    dataIndex: 'consignee',
    width: '20%'
  },
  {
    title: '运维开始日期',
    align: 'center',
    dataIndex: 'maintainValidityTimeStart',
    width: '25%'
  },
  {
    title: '运维结束日期',
    align: 'center',
    dataIndex: 'maintainValidityTimeEnd',
    width: '25%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: '100px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    deviceEditForm
  },
  data () {
    return {
      mixListOptions: {
        mixGetDataListURL: '/deviceManagement/deviceOutWarehouseList' // 数据列表接口，API地址
      },
      tableColumns, // 表头
      tableData: [], // 表体
      mixPageRef: 'gridPager', // 页码组件ref
      page: 1, // 当前页码
      size: 10, // 当前条数
      addressmodel: [], // 使用区域
      disabled: false, // 编辑表单 禁用标志
      isShowEditDrawer: false, // 编辑弹窗显示标志
      selectedAreaLevel: null, // 选择的最下级的地址level
      tableRow: {} // 当前行信息
    }
  },
  created () {

  },
  mounted () {

  },
  activated () {
    this.clearData()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:21:03
     * @information: 地址赋值
     */
    setaddress (fileName, fileValue) {
      this.searchForm.setFieldsValue({
        [fileName]: this[fileValue]
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 12:00:17
     * @information: 地址选择时
     */
    adsvalchange (val, areaLevel) {
      if (areaLevel && areaLevel.length) {
        this.selectedAreaLevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.selectedAreaLevel = null
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:40:41
     * @information: 分页change
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:41:43
     * @information: 查询参数
     */
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      // 添加区域查询条件
      if (formData.areaId && formData.areaId.length > 0) {
        formData.areaId = formData.areaId[formData.areaId.length - 1]
      } else {
        formData.areaId = '' // window.parent.indexTool.getUserInfo().areaId
      }
      this.changetime(formData)
      // 赋值区域最下级level
      Reflect.set(formData, 'areaLevel', this.selectedAreaLevel)
      // 日期格式化
      let { maintainValidityTimeEnd, outBoundTimeEnd } = formData
      maintainValidityTimeEnd && (formData.maintainValidityTimeEnd = moment(maintainValidityTimeEnd).format('YYYY-MM-DD'))
      outBoundTimeEnd && (formData.outBoundTimeEnd = moment(outBoundTimeEnd).format('YYYY-MM-DD'))
      return formData
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:45:47
     * @information: 编辑
     */
    onEdit (obj) {
      this.tableRow = obj
      this.isShowEditDrawer = true
      this.$nextTick(() => {
        // 赋值表单
        this.$refs.deviceEditFormRef.assignmentForm()
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:51:26
     * @information: 抽屉容器悬浮处理
     */
    setContainer () {
      return document.body
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:53:23
     * @information: 编辑侧滑取消
     */
    onEditCancel () {
      this.isShowEditDrawer = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:53:58
     * @information: 编辑侧滑确定
     */
    onEditSubmit () {
      this.$refs.deviceEditFormRef.outDeviceForm.validateFields(async (err) => {
        if (err) {
          this.$message.error('校验不通过，无法提交，请再次检查!')
          return
        }
        let outDeviceForm = this.$refs.deviceEditFormRef.outDeviceForm.getFieldsValue()
        let { useArea, reveiveAddress, termTime, outTime, sendTime } = outDeviceForm
        // 设备id 设备编号列表
        let { id, equipmentNumLists } = this.tableRow
        // 整理入参
        let model = {
          outBoundTime: outTime,
          sendGoodsTime: sendTime,
          equipmentNumLists,
          id,
          ...outDeviceForm
        }
        // 日期格式化
        if (termTime && termTime.length) {
          Object.assign(model, {
            maintainValidityTimeStart: termTime[0],
            maintainValidityTimeEnd: termTime[1]
          })
        }
        this.changetime(model)
        // 添加使用区域的最下级id
        Reflect.set(model, 'useAreaid', useArea[useArea.length - 1] || useArea[useArea.length - 2])
        // 区域格式化
        if (useArea && useArea.length) {
          Object.assign(model, {
            useAreaPro: useArea[0],
            useAreaCity: useArea[1],
            useAreaCounty: useArea[2],
            useAreaTown: useArea[3],
          })
        }
        if (reveiveAddress && reveiveAddress.length) {
          Object.assign(model, {
            takeGoodsAddressPro: reveiveAddress[0],
            takeGoodsAddressCity: reveiveAddress[1],
            takeGoodsAddressCounty: reveiveAddress[2],
            takeGoodsAddressTown: reveiveAddress[3],
          })
        }
        // 删除多余参数
        let delArr = ['outTime', 'reveiveAddress', 'sendTime', 'termTime', 'useArea', 'termTimeStart', 'termTimeEnd']
        delArr.forEach(el => {
          Reflect.deleteProperty(model, el)
        })
        let res = await this.post('/deviceManagement/updateDeviceOutWarehouse', model)
        if (res.serviceSuccess) {
          this.$message.success('更新成功')
          this.isShowEditDrawer = false
          this.handleSubmit('search')
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-26 09:17:16
     * @information: 重置
     */
    resetFrom () {
      this.searchForm.resetFields()
      this.selectedAreaLevel = null
      this.handleSubmit('search')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 13:37:20
     * @information: 还原数据
     */
    clearData () {
      this.addressmodel = []
      this.disabled = false
      this.isShowEditDrawer = false
      this.addressmodel = []
      this.selectedAreaLevel = null
      this.tableRow = {}
    }

  }
}
</script>

<style lang="less">
#device-out-record-list {
}
</style>
