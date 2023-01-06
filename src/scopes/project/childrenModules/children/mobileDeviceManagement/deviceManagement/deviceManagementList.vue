<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.searchForm = form}">
            <AreaQuery msg="使用区域"
                       class="spilwid"
                       :labelCol="{ span: 7 }"
                       :wrapperCol="{span:14}"
                       :types="'1'"
                       :addressmodel="addressmodel"
                       @setaddress="setaddress"
                       @adsvalchange="adsvalchange"
                       :fileldName="'areaId'"
                       :ishide.sync="ishide"></AreaQuery>

            <ta-form-item label="是否关联SIM卡"
                          fieldDecoratorId="isAssociatedSim"
                          class="spilwid"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}">
              <ta-select placeholder='请选择是否关联'
                         allowClear>
                <ta-select-option value="1">是</ta-select-option>
                <ta-select-option value="0">否</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="出库状态"
                          fieldDecoratorId="equipmentState"
                          class="spilwid"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:14}">
              <ta-select placeholder='请选择出库状态'
                         allowClear>
                <ta-select-option value="0">未出库</ta-select-option>
                <ta-select-option value="1">已出库</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="使用状态"
                          fieldDecoratorId="equipmentStatus"
                          class="spilwid"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:14}">
              <ta-select placeholder='请选择使用状态'
                         allowClear>
                <ta-select-option value="0">未激活</ta-select-option>
                <ta-select-option value="1">正常</ta-select-option>
                <ta-select-option value="2">挂失</ta-select-option>
                <ta-select-option value="5">注销</ta-select-option>
                <ta-select-option value="6">解挂</ta-select-option>
              </ta-select>
            </ta-form-item>

            <!-- <ta-form-item label="设备编号"
                          class="spilwid"
                          fieldDecoratorId="equipmentNum"
                          :labelCol="{ span: 7 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入设备编号" />
            </ta-form-item> -->

            <!-- <ta-form-item label="设备激活人"
                          class="spilwid"
                          fieldDecoratorId="activatorName"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入设备激活人" />
            </ta-form-item> -->

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
        <div class="operateBtn device-btn">
          <!-- <ta-button type="primary"
                     @click="add"
                     icon="plus">新增</ta-button> -->

          <ta-button type="primary"
                     @click="isShowOutDrawer = true"
                     class="ml--10"
                     icon="">出库</ta-button>

          <ta-button type="primary"
                     class="ml--10"
                     @click="add"
                     icon="">入库</ta-button>

          <!-- <ta-button type="primary"
                     class="ml--10"
                     @click="onBatchImport"
                     icon="">批量导入</ta-button> -->
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="activationDate"
                slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </span>

          <span slot="equipmentStatus"
                :class="returnClass(a)"
                slot-scope="a">
            <span>{{CollectionLabel('EQUIPMENTSTATUS',statusJudge(a))}}</span>
          </span>

          <span slot="isAssociatedSim"
                slot-scope="a">
            <span>{{a == '0' ? '否' : '是'}}</span>
          </span>

          <span slot="equipmentState"
                slot-scope="a">
            <span>{{a == '0' ? '未出库' : '已出库'}}</span>
          </span>

          <span slot="action"
                class="btnlist"
                slot-scope="text,obj">
            <!-- <span v-if="!obj.activatorName&&obj.equipmentStatus==Enum.EQUIPMENTSTATUS.ZC"
                  @click="update(obj)"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           v-if="!obj.activatorName&&obj.equipmentStatus==Enum.EQUIPMENTSTATUS.ZC"
                           @confirm="deletes(obj)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm> -->
            <span @click="see(obj)"
                  class="com_textsee">查看</span>
            <span v-if="obj.equipmentStatus==Enum.EQUIPMENTSTATUS.ZC||obj.equipmentStatus==Enum.EQUIPMENTSTATUS.JG"
                  class="com_textedit"
                  @click="confirm(obj,'挂失')">挂失</span>
            <span v-if="obj.equipmentStatus==Enum.EQUIPMENTSTATUS.GS||obj.equipmentStatus==Enum.EQUIPMENTSTATUS.CSH"
                  class="com_textdel"
                  @click="confirm(obj,'解挂')">解挂</span>
            <span v-if="obj.equipmentStatus==Enum.EQUIPMENTSTATUS.GS"
                  class="com_continue"
                  @click="confirm(obj,'数据清除')">数据清除</span>
            <span v-if="obj.equipmentStatus!=Enum.EQUIPMENTSTATUS.WJH&&obj.equipmentStatus!=Enum.EQUIPMENTSTATUS.ZX&&obj.equipmentStatus!=Enum.EQUIPMENTSTATUS.JB"
                  class="com_textreject"
                  @click="confirm(obj,'解绑')">解绑</span>
            <span v-if="obj.equipmentStatus==Enum.EQUIPMENTSTATUS.CSH"
                  class="com_revocation"
                  @click="confirm(obj,'注销')">注销</span>
          </span>
        </ta-table>
      </div>
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

    <!-- 新增、编辑侧滑 -->
    <ta-drawer :title="flag=='add'?'入库':'编辑'"
               width="600"
               placement="right"
               @close="visible = false"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               v-if="visible"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-col :span="24">
          <ta-form-item label="SN编码"
                        fieldDecoratorId="equipmentNumber"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{ span: 8}"
                        :fieldDecoratorOptions="this.verificationRules('SN编码', 72)">
            <ta-input :placeholder="!disabled?'请输入SN编码':''"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="设备型号"
                        fieldDecoratorId="equipmentModel"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{ span: 8}"
                        :fieldDecoratorOptions="this.verificationRules('设备型号', 72)">
            <ta-input :placeholder="!disabled?'请输入设备型号':''"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="MEID"
                        fieldDecoratorId="equipmentMeid"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{ span: 8}">
            <ta-input :placeholder="!disabled?'请输入MEID':''"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="IMEI"
                        fieldDecoratorId="equipmentImei"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{ span: 8}">
            <ta-input :placeholder="!disabled?'请输入IMEI':''"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="MAC地址"
                        fieldDecoratorId="equipmentMacAddress"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{ span: 8}">
            <ta-input :placeholder="!disabled?'请输入MAC地址':''"
                      :disabled="disabled" />
          </ta-form-item>
        </ta-col>

        <ta-col :span="24">
          <ta-form-item label="备注"
                        :labelCol="{ span: 4 }"
                        :wrapperCol="{span:20}"
                        fieldDecoratorId="remark"
                        :fieldDecoratorOptions="this.verificationRulesNotMustFill('备注', 150,true)">
            <ta-textarea :placeholder="!disabled?'请输入备注':''"
                         :rows="4"
                         :disabled="disabled" />
          </ta-form-item>
        </ta-col>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="back">取消</ta-button>
        <ta-button @click="submit"
                   v-if="!disabled"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>

    <!-- 1挂失、2解挂、3数据清除、4解绑 等类型侧滑 -->
    <ta-drawer :title="drawerName"
               width="600"
               placement="right"
               :getContainer="setContainer"
               @close="back1(false)"
               :visible="visible1"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form1 = form}"
               layout="horizontal">
        <ta-form-item label="设备编号"
                      fieldDecoratorId="equipmentNum"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{ span: 10}">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item :label="'设备'+drawerName+'原因'"
                      :require="{message:'请输入设备'+drawerName+'原因'}"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span: 17}"
                      fieldDecoratorId="operationReason"
                      :fieldDecoratorOptions="this.verificationRulesNotMustFill('设备'+drawerName+'原因', 150,true)">
          <ta-textarea :placeholder="!disabled1?'请输入设备'+drawerName+'原因':''"
                       :rows="4"
                       :disabled="disabled1" />
        </ta-form-item>
        <ta-form-item :label="'设备'+drawerName+'时间'"
                      fieldDecoratorId="operationTime"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span: 10}"
                      :require="{message:'请选择设备'+drawerName+'时间'}">
          <ta-date-picker style="width: 100%;"
                          :placeholder="!disabled1?'请选择设备'+drawerName+'时间':''"
                          :disabled="disabled1"
                          :disabledDate="disabledDate" />
        </ta-form-item>
        <ta-form-item :label="'设备'+drawerName+'挂失人'"
                      fieldDecoratorId="operationUser"
                      :labelCol="{ span: 7 }"
                      :wrapperCol="{span: 10}"
                      :fieldDecoratorOptions="this.verificationRules('设备'+drawerName+'人', 50)">
          <ta-input :placeholder="!disabled1?'请输入设备'+drawerName+'人':''"
                    :disabled="disabled1" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="back1(false)">取消</ta-button>
        <ta-button @click="submit1"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>

    <!-- 出库侧滑 -->
    <ta-drawer title="出库"
               width="600"
               placement="right"
               :getContainer="setContainer"
               @close="onOutCancel"
               :visible="isShowOutDrawer"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <deviceOutForm v-if="isShowOutDrawer"
                     ref="deviceOutFormRef"
                     :disabled="disabled"
                     :selectedDeviceArr="selectedDeviceArr"
                     @onSelectDevice="onSelectDevice"></deviceOutForm>

      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="onOutCancel">取消</ta-button>
        <ta-button @click="onOutSubmit"
                   v-if="!disabled"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>

    <!-- 选择出库 弹窗 -->
    <ta-modal title="选择出库设备"
              v-model="isShowOutModal"
              width="70%"
              :zIndex='1001'
              height="550px"
              :footer="null">
      <selectOutDevice v-if="isShowOutModal"
                       ref="selectOutDeviceRef"
                       :tableColumns="tableColumnsOutDevice"
                       url="/deviceManagement/list"
                       @selectAdd="selectAdd"></selectOutDevice>
    </ta-modal>

  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import deviceOutForm from './components/deviceOutForm.vue'
import selectOutDevice from './components/selectOutDevice.vue'
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
    title: '设备编号',
    align: 'center',
    dataIndex: 'equipmentNum',
    width: '20%'
  },
  {
    title: 'SN编码',
    align: 'center',
    dataIndex: 'equipmentNumber',
    width: '30%'
  },
  {
    title: '使用区域',
    align: 'center',
    dataIndex: 'useAreaName',
    width: '40%'
  },
  {
    title: '是否关联SIM卡',
    dataIndex: 'isAssociatedSim',
    width: '15%',
    scopedSlots: { customRender: 'isAssociatedSim' },
  },
  {
    title: '关联SIM卡',
    dataIndex: 'simCardNumber',
    width: '30%'
  },
  {
    title: '设备激活日期',
    dataIndex: 'activationDate',
    align: 'center',
    scopedSlots: { customRender: 'activationDate' },
    width: '25%'
  },
  {
    title: '出库状态',
    dataIndex: 'equipmentState',
    width: '20%',
    scopedSlots: { customRender: 'equipmentState' },
  },
  {
    title: '设备状态',
    align: 'center',
    dataIndex: 'equipmentStatus',
    scopedSlots: { customRender: 'equipmentStatus' },
    width: '16%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 280,
    scopedSlots: { customRender: 'action' }
  }
]

const tableColumnsOutDevice = [
  {
    title: '设备编号',
    align: 'center',
    dataIndex: 'equipmentNum',
    width: '30%'
  },
  {
    title: 'SN编码',
    align: 'center',
    dataIndex: 'equipmentNumber',
    width: '30%'
  },
  {
    title: '设备型号',
    align: 'center',
    dataIndex: 'equipmentModel',
    width: '30%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    deviceOutForm,
    selectOutDevice
  },
  data () {
    return {
      addressmodel: [],
      tableColumns,
      tableData: [],
      mixListOptions: {
        mixGetDataListURL: '/deviceManagement/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      page: 1,
      size: 10,
      ishide: false, // 区域是否隐藏
      visible: false, // 新增抽屉控制显隐
      disabled: false, // 新增只读控制
      visible1: false, // 挂失、解挂、数据清除、解绑抽屉控制显隐
      disabled1: false, // 挂失、解挂、数据清除、解绑只读控制
      drawerName: '挂失', // 操作类型（1挂失、2解挂、3数据清除、4解绑）
      equipmentId: '', // 列表中挂失、解挂、数据清除、解绑的设备数据id
      oldEquipmentNum: '', // 编辑前的设备编号
      flag: 'add', // 新增（add）、编辑（update）的标识

      areaLevel: null, // 选择的使用区域最低级level
      isShowOutDrawer: false, // 出库侧滑标志
      isShowOutModal: false, // 选择出库弹窗
      tableColumnsOutDevice, // 选择出库表头
      selectedDeviceArr: [], // 要添加出库的设备
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 19:57:57
     * @information: 添加 / 批量添加 被点击
     */
    selectAdd (arr) {
      // 判重
      let repeatEquipmentNum = null
      let mark = this.selectedDeviceArr.some(el => {
        return arr.some(item => {
          if (el.equipmentNum == item.equipmentNum) {
            repeatEquipmentNum = item.equipmentNum
            return true
          }
          return false
        })
      })
      // 判断
      if (mark && repeatEquipmentNum) {
        this.$message.error(`设备编号(${repeatEquipmentNum})已添加至列表中，请重新选择`)
        return;
      }
      this.isShowOutModal = false
      this.selectedDeviceArr.push(...arr)
      // 赋值数量
      this.$refs.deviceOutFormRef.assignmentForm()
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 18:58:32
     * @information: 设备编号被点击 - 打开选择弹窗
     */
    onSelectDevice () {
      this.isShowOutModal = true
    },

    /**
     * @author: yinpengfei
     * @Date: 2021-06-21 15:32:46
     * @information: 出库侧滑确定
     */
    onOutSubmit () {
      // 校验设备编号
      let { selectedDeviceArr } = this
      if (!selectedDeviceArr || !selectedDeviceArr.length) {
        this.$message.error('请选择添加设备编号')
        return
      }
      this.$refs.deviceOutFormRef.outDeviceForm.validateFields(async (err) => {
        if (err) {
          this.$message.error('校验不通过，无法提交，请再次检查!')
          return
        }
        let equipmentNumLists = selectedDeviceArr.map(el => el.equipmentNum)
        // 整理入参
        let outDeviceForm = this.$refs.deviceOutFormRef.outDeviceForm.getFieldsValue()
        let { operationDate, useArea, reveiveAddress } = outDeviceForm
        let model = { ...outDeviceForm, }
        // 日期格式化
        if (operationDate && operationDate.length) {
          Object.assign(model, {
            maintainValidityTimeStart: operationDate[0],
            maintainValidityTimeEnd: operationDate[1]
          })
        }
        this.changetime(model)
        // 添加设备编号
        Reflect.set(model, 'equipmentNumLists', equipmentNumLists)
        // 添加使用区域的最下级id
        Reflect.set(model, 'useAreaid', useArea[useArea.length - 1])
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
            akeGoodsAddressPro: reveiveAddress[0],
            akeGoodsAddressCity: reveiveAddress[1],
            akeGoodsAddressCounty: reveiveAddress[2],
            akeGoodsAddressTown: reveiveAddress[3],
          })
        }
        // 删除多余参数
        let delArr = ['equipmentNum', 'useArea', 'operationDate', 'reveiveAddress', 'operationDateStart', 'operationDateEnd']
        delArr.forEach(el => {
          Reflect.deleteProperty(model, el)
        })
        let res = await this.post('/deviceManagement/deviceOutWarehouse', model)
        if (res.serviceSuccess) {
          this.$message.success('出库成功')
          this.isShowOutDrawer = false
          this.clearOutDevice()
          this.handleSubmit('search')
        }
      })
    },

    /**
     * @author: yinpengfei
     * @Date: 2021-06-21 15:32:20
     * @information: 出库侧滑关闭回调
     */
    onOutCancel () {
      this.clearOutDevice()
      this.isShowOutDrawer = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 09:48:19
     * @information: 清空部分数据
     */
    clearOutDevice () {
      // 清空刚刚已选择的设备列表
      this.selectedDeviceArr = []
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-21 13:49:53
     * @information: 批量导入
     */
    onBatchImport () { },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 17:47:52
     * @information: 重置
     */
    resetFrom () {
      this.searchForm.resetFields()
      this.areaLevel = null
      this.handleSubmit('search')
    },
    // 初始化数据
    initData () {
      this.disabled = false
      this.disabled1 = false
      this.drawerName = '挂失'
      this.areaLevel = null
      this.isShowOutDrawer = false
      this.isShowOutModal = false
    },
    // 状态处理
    statusJudge (e) {
      if (e == this.Enum.EQUIPMENTSTATUS.CSH) { // 初始化是挂失状态
        return this.Enum.EQUIPMENTSTATUS.GS
      } else if (e == this.Enum.EQUIPMENTSTATUS.JB) { // 解绑是未激活状态
        return this.Enum.EQUIPMENTSTATUS.WJH
      } else if (e == this.Enum.EQUIPMENTSTATUS.JG) { // 解挂是正常状态
        return this.Enum.EQUIPMENTSTATUS.ZC
      } else { // 其他
        return e
      }
    },
    // 列表状态样式
    returnClass (e) {
      let statusClass = ''
      switch (e) {
        case this.Enum.EQUIPMENTSTATUS.WJH:
          statusClass = 'com_tobeaudited'
          break
        case this.Enum.EQUIPMENTSTATUS.ZC:
          statusClass = 'com_adopt'
          break
        case this.Enum.EQUIPMENTSTATUS.GS:
          statusClass = 'no_submit'
          break
        case this.Enum.EQUIPMENTSTATUS.CSH:
          statusClass = 'no_submit'
          break
        case this.Enum.EQUIPMENTSTATUS.JB:
          statusClass = 'com_tobeaudited'
          break
        case this.Enum.EQUIPMENTSTATUS.ZX:
          statusClass = 'com_reject'
          break
        case this.Enum.EQUIPMENTSTATUS.JG:
          statusClass = 'com_adopt'
          break
      }
      return statusClass
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      // 添加区域查询条件
      if (formData.areaId && formData.areaId.length > 0) {
        formData.areaId = formData.areaId[formData.areaId.length - 1]
      } else {
        formData.areaId = '' // window.parent.indexTool.getUserInfo().areaId
      }
      this.changetime(formData)
      Reflect.set(formData, 'areaLevel', this.areaLevel)
      return formData
    },
    // 查询地址
    setaddress () {
      this.searchForm.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-24 18:00:16
     * @information: 使用区域更改时
     */
    adsvalchange (val, areaLevel) {
      if (areaLevel && areaLevel.length) {
        this.areaLevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.areaLevel = null
      }
    },
    // 操作时间处理
    disabledDate (current) {
      // 不能选择今天以前的日期
      return current < moment().endOf('day').subtract({ days: 1 })
    },
    // 新增、 入库
    add () {
      this.visible = true
      this.flag = 'add'
      this.disabled = false
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    // 编辑
    update (e) {
      this.visible = true
      this.flag = 'update'
      this.equipmentId = e.equipmentId
      this.oldEquipmentNum = e.equipmentNum
      this.$nextTick(() => {
        this.form.setFieldsValue(e)
      })
    },
    // 删除
    deletes (e) {
      this.post('/deviceManagement/delete', { equipmentId: e.equipmentId, equipmentNumber: e.equipmentNum }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('设备删除成功')
          this.handleSubmit('search')
        }
      })
    },
    // 新增-取消
    back () {
      this.form.resetFields()
      this.visible = false
      this.handleSubmit('search')
    },
    // 新增/编辑-确定
    submit () {
      const formData = this.form.getFieldsValue()
      let url = 'deviceManagement/save'
      if (this.flag == 'update') {
        url = 'deviceManagement/update'
        formData.equipmentId = this.equipmentId
        formData.oldEquipmentNumber = this.oldEquipmentNum
      }
      this.form.validateFields((err) => {
        if (!err) {
          this.post(url, formData).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据提交成功')
              this.back()
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 挂失、解挂、数据清除、解绑-取消
    back1 (needReLoad) {
      this.form1.resetFields()
      this.visible1 = false
      needReLoad && this.handleSubmit('search')
    },
    // 挂失、解挂、数据清除、解绑-确定
    submit1 () {
      const formData = this.form1.getFieldsValue()
      formData.operationTime = formData.operationTime ? moment(formData.operationTime).format('YYYY-MM-DD') : null
      formData.equipmentId = this.equipmentId
      formData.equipmentNumber = this.equipmentNumber
      this.form1.validateFields((err, values) => {
        if (!err) {
          // 处理设备操作类型
          let operationType = ''
          switch (this.drawerName) {
            case '挂失':
              operationType = '2'
              break
            case '解挂':
              operationType = '6'
              break
            case '数据清除':
              operationType = '3'
              break
            case '解绑':
              operationType = '4'
              break
            case '注销':
              operationType = '5'
              break
          }
          formData.operationType = operationType
          this.post('deviceManagement/operationSave', formData).then((res) => {
            if (res.serviceSuccess) {
              this.$message.success('数据提交成功')
              this.back1(true)
            }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 查看
    see (e) {
      if (e.equipmentStatus == this.Enum.EQUIPMENTSTATUS.WJH) { // 未激活查看设备信息
        this.visible = true
        this.flag = 'look'
        this.equipmentId = e.equipmentId
        this.disabled = true
        this.$nextTick(() => {
          this.form.setFieldsValue(e)
        })
      } else { // 已激活查看设备记录信息
        this.$router.push({
          name: 'deviceManagementLook',
          query: { equipmentId: e.equipmentId }
        })
      }
    },
    // 分页change
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 操作
    confirm (obj, type) { // type: 挂失、解挂、数据清除、解绑
      this.drawerName = type
      this.equipmentNumber = obj.equipmentNumber
      this.equipmentId = obj.equipmentId
      this.visible1 = true
      this.$nextTick(() => {
        this.form1.setFieldsValue({
          equipmentNum: obj.equipmentNum
        })
      })
    },
    // 取消操作
    cancel () {
      this.visible1 = false
    },
    // 抽屉容器悬浮处理
    setContainer () {
      return document.body
    }
  }

}
</script>
<style scoped lang="less">
.textClass {
  text-align: center;
  line-height: 31px;
}

.device-btn {
  display: flex;
  justify-content: flex-end;
}

.ml--10 {
  margin-left: 10px;
}
</style>
