<template>
  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="运营商"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="simOperator"
                          class="spilwid">
              <ta-select placeholder='请选择运营商'
                         allowClear>
                <ta-select-option value="中国联通">中国联通</ta-select-option>
                <ta-select-option value="中国移动">中国移动</ta-select-option>
                <ta-select-option value="中国电信">中国电信</ta-select-option>
              </ta-select>
            </ta-form-item>

            <!-- <AreaQuery msg="号码归属地"
                       class="spilwid"
                       :labelCol="{ span: 10 }"
                       :wrapperCol="{span:14}"
                       :types="'2'"
                       :addressmodel="addressmodelSimArea"
                       @setaddress="setaddressArea('simArea', 'addressmodelSimArea')"
                       :fileldName="'simArea'"  :loadLeafLevel="2"
                       :ishide="false"></AreaQuery> -->

            <AddressComponent :addressmodel="addressmodelSimArea"
                              :msg="'号码归属地'"
                              :changeOnSelect="true"
                              arealevel="3"
                              :labelwidth="{label: 10, wrapper: 14}"
                              :isRequire="false"
                              fileldName='simArea'
                              :disabled="false"
                              :loadLeafLevel="2"
                              @setaddress="setaddressArea('simArea', 'addressmodelSimArea')"
                              @adsvalchange="adsvalchange"></AddressComponent>

            <ta-form-item label="SIM卡号"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="simCardNumber">
              <ta-input placeholder="请输入SIM卡号" />
            </ta-form-item>

            <ta-form-item label="是否关联设备"
                          fieldDecoratorId="isAssociatedEquipment"
                          class="spilwid"
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}">
              <ta-select placeholder='请选择是否关联'
                         allowClear>
                <ta-select-option value="1">是</ta-select-option>
                <ta-select-option value="0">否</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item class="spilwid">

              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit()">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>

          </ta-form>
        </div>

        <div class="operateBtn">
          <div class="rightClass">
            <!-- <ta-button type="primary"
                       icon=''
                       style="float: right;"
                       @click=" onImport">批量导入</ta-button> -->
            <ta-button type="primary"
                       icon=''
                       style="float: right;"
                       @click=" onAdd">新增SIM卡</ta-button>
          </div>
        </div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <span slot="isAssociatedEquipment"
                slot-scope="val">
            {{val=='0' ? '否' : '是'}}
          </span>

          <span slot="simState"
                slot-scope="val">
            {{val=='0' ? '禁用' : '启用'}}
          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="infoDetails(val,obj,index)"
                  class="com_textsee">查看</span>
          </div>

        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />

      </div>
    </ta-border-layout>

    <!-- 新增号段侧滑 -->
    <div>
      <ta-drawer :title="disabled ? '查看SIM卡' : '新增SIM卡'"
                 width="500px"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form v-if="visible"
                 :autoFormCreate="(addForm)=>{this.addForm = addForm}"
                 layout="horizontal"
                 :disabled="disabled">
          <ta-form-item label="运营商"
                        fieldDecoratorId="simOperator"
                        :fieldDecoratorOptions="this.verificationRules('运营商', 72)">
            <ta-select placeholder='请选择运营商'
                       allowClear>
              <ta-select-option value="中国联通">中国联通</ta-select-option>
              <ta-select-option value="中国移动">中国移动</ta-select-option>
              <ta-select-option value="中国电信">中国电信</ta-select-option>
            </ta-select>
          </ta-form-item>

          <AddressComponent :addressmodel="addressmodelSimAreaAdd"
                            :msg="'号码归属地'"
                            :changeOnSelect="true"
                            arealevel="2"
                            :labelwidth="{label: 6, wrapper: 18}"
                            :isRequire="true"
                            fileldName='simArea'
                            :disabled="false"
                            :loadLeafLevel="2"
                            @setaddress="setaddressAreaAdd('simArea', 'addressmodelSimAreaAdd')"
                            @adsvalchange="adsvalchangeSimAreaAdd"></AddressComponent>

          <ta-form-item label="SIM卡号"
                        fieldDecoratorId="simCardNumber"
                        :fieldDecoratorOptions="this.verificationRules('SIM卡号', 60)">
            <ta-input :placeholder="!disabled?'请输入SIM卡号':''"
                      type="number" />
          </ta-form-item>

          <!-- <ta-form-item label="号段"
                        fieldDecoratorId="husbandGoOutYear"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}"
                        :fieldDecoratorOptions="this.verificationRules('号段', 99999999999)">
            <ta-input-group compact>
              <ta-input-number style=" width: 150px; text-align: center"
                               placeholder=""
                               :max="99999999999"
                               :precision="1"
                               v-model="minVal"
                               @blur="compareData('minVal')"
                               :disabled="disabled" />
              <ta-input style=" width: 31px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                        placeholder="~"
                        disabled />
              <ta-input-number style="width: 150px; text-align: center; border-left: 0"
                               placeholder=""
                               :max="99999999999"
                               :precision="1"
                               v-model="maxVal"
                               @blur="compareData('maxVal')"
                               :disabled="disabled" />
            </ta-input-group>
          </ta-form-item> -->

          <ta-form-item label="套餐"
                        fieldDecoratorId="simPackage"
                        :fieldDecoratorOptions="this.verificationRules('套餐', 60, true)">
            <ta-textarea :placeholder="!disabled?'请输入套餐':''"
                         style="height: 150px;"> </ta-textarea>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="onClose">取消</ta-button>
          <ta-button v-if="!disabled"
                     key="submit"
                     type="primary"
                     @click="onAddSubmit()">确定</ta-button>

        </div>
      </ta-drawer>
    </div>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import AreaQuery from '@component/common/components/areaQuery'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
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
    title: 'SIM卡编号',
    width: '18%',
    dataIndex: 'simNumber',
    overflowTooltip: true
  },
  {
    title: '号码归属地',
    width: '35%',
    dataIndex: 'simAttributionRegionDetail',
    overflowTooltip: true
  },
  {
    title: 'SIM卡卡号',
    width: '25%',
    dataIndex: 'simCardNumber',
    overflowTooltip: true
  },
  {
    title: '运营商',
    width: '18%',
    align: 'center',
    dataIndex: 'simOperator',
    overflowTooltip: true
  },
  {
    title: '是否关联设备',
    width: '22%',
    dataIndex: 'isAssociatedEquipment',
    align: 'center',
    scopedSlots: { customRender: 'isAssociatedEquipment' }
  },
  {
    title: '套餐',
    width: '25%',
    dataIndex: 'simPackage',
    align: 'center'
  },
  {
    title: '状态',
    width: '15%',
    dataIndex: 'simState',
    align: 'center',
    scopedSlots: { customRender: 'simState' }
  },
  {
    title: '录入日期',
    width: '20%',
    dataIndex: 'entryDate',
    align: 'center'
  },
  {
    title: '激活日期',
    width: '20%',
    dataIndex: 'activationDate',
    align: 'center'
  },
  {
    title: '操作',
    width: '100px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    AddressComponent
  },
  data () {
    return {
      visible: false, // 侧滑开关
      disabled: false, // 表单禁用标志
      selectedRows: [],
      addressmodel: [], // 号码归属地
      mixListOptions: {
        mixGetDataListURL: '/simManagement/list',
        mixActivatedIsNeed: true
      },
      mixDataList: [], // 表体数据
      mixColumns, // 表头
      mixPageRef: 'gridPager',
      page: 1,
      size: 10,
      minVal: null, // 号段开头
      maxVal: null, // 号段结尾

      addressmodelSimArea: [], // sim号码归属地
      addressmodelSimAreaAdd: [], // 新增时 sim号码归属地
      areaLevel: null, // 选择的最下级的区域level
      areaLevelAdd: null, // 新增时 选择的最下级的区域level
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  mounted () {

  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 10:54:17
     * @information: 号码归属地更改时
     */
    adsvalchange (val, areaLevel) {
      if (areaLevel && areaLevel.length) {
        this.areaLevel = areaLevel[areaLevel.length - 1].arealevel
      } else {
        this.areaLevel = null
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 11:18:14
     * @information: 新增时 号码归属地更改时
     */
    adsvalchangeSimAreaAdd (val, areaLevel) {
      if (areaLevel && areaLevel.length) {
        this.areaLevelAdd = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.areaLevelAdd = null
      }
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 09:15:55
     * @information: 新增SIM卡
     */
    onAdd () {
      this.visible = true
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 09:16:06
     * @information: 批量导入
     */
    onImport () { },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 17:47:52
     * @information: 重置
     */
    resetFrom () {
      this.searchForm.resetFields()
      this.areaLevel = null
      this.areaLevelAdd = null
      this.handleSubmit('search')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-21 17:37:47
     * @information: 地址赋值
     */
    setaddressArea (fileName, fileValue) {
      this.searchForm.setFieldsValue({
        [fileName]: this[fileValue]
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 14:40:37
     * @information: 地址赋值 新增时
     */
    setaddressAreaAdd (fileName, fileValue) {
      this.addForm.setFieldsValue({
        [fileName]: this[fileValue]
      })
    },
    setaddress () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({
          address_Linkage: this.addressmodel
        })
      })
    },
    // 比较数据大小
    compareData (e) {
      const minVal = this.minVal
      const maxVal = this.maxVal
      if (typeof minVal == 'number' && typeof maxVal == 'number' && minVal > maxVal) {
        this.$message.warn('初始值不能大于结束值！')
        this[e] = null
      }
    },
    moment,
    /**
     * @author: yinpengfei
     * @Date: 2021-06-25 10:12:32
     * @information: 查看
     */
    infoDetails (val, obj, index) {
      this.disabled = true
      this.visible = true
      this.$nextTick(() => {
        // 表单赋值
        this.addForm.setFieldsValue(obj)
        // 地址处理
        this.addressmodelSimAreaAdd = [
          obj.simAttributionRegionPro || null,
          obj.simAttributionRegionCity || null,
        ]
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 14:29:48
     * @information: 查询参数
     */
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      let { simArea } = formData
      // 赋值归属地最低级id
      Reflect.set(formData, 'simAttributionRegionAreaId', simArea && simArea[simArea.length - 1] || null)
      // 赋值归属地最低级level
      Reflect.set(formData, 'areaLevel', this.areaLevel)
      // this.changetime(formData)
      return formData
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 10:09:10
     * @information: 新增号段提交
     */
    onAddSubmit () {
      // 表单校验 
      this.addForm.validateFields(async (err, values) => {
        if (err) return
        // const { minVal, maxVal } = this
        // // 号段检验
        // if (!minVal || !maxVal) {
        //   this.$message.error('请输入号段')
        // }
        let addForm = this.addForm.getFieldsValue()
        let { simArea } = addForm
        // 接口入参
        let model = {
          simAttributionRegionPro: simArea[0],
          simAttributionRegionCity: simArea[1],
          ...addForm
        }
        // 删除多余参数
        Reflect.deleteProperty(model, 'simArea')
        let res = await this.post('/simManagement/save', model)
        if (res.serviceSuccess) {
          this.$message.success('提交成功')
          this.visible = false
          this.handleSubmit('search')
        }
      })
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    onClose () {
      this.addForm.resetFields()
      this.minVal = null
      this.maxVal = null
      this.visible = false
      this.disabled = false
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 10:55:45
     * @information: 初始化数据
     */
    initData () {
      this.addressmodelSimArea = []
      this.addressmodelSimAreaAdd = []
      this.areaLevel = null
      this.areaLevelAdd = null
    }
  }
}
</script>

<style scoped lang='less'>
</style>
