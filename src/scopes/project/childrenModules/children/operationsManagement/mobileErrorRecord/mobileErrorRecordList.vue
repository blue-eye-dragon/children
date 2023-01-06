<!--
 * @Date: 2021-06-21 11:07:15
 * @information: 移动端错误日志列表
-->
<template>
  <div id="mobile-error-recordList"
       class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <!-- <AreaQuery msg="使用区域"
                       class="spilwid"
                       :labelCol="{ span: 10 }"
                       :wrapperCol="{span:14}"
                       types='2'
                       :addressmodel="addressmodelArea"
                       @setaddress="setaddressArea('useArea', 'addressmodelArea')"
                       :fileldName="'useArea'"
                       :ishide="false"></AreaQuery> -->

            <ta-form-item label="设备绑定人"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="deviceBindPerson">
              <ta-input placeholder="请输入设备绑定人" />
            </ta-form-item>

            <AreaQuery msg="设备绑定人职责范围"
                       class="spilwid1"
                       :labelCol="{ span: 11 }"
                       :wrapperCol="{span:13}"
                       types='2'
                       :addressmodel="addressmodelWorkArea"
                       @setaddress="setaddressArea('workArea', 'addressmodelWorkArea')"
                       :fileldName="'workArea'"
                       :ishide="false"></AreaQuery>

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

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <span slot="equipmentStatus"
                slot-scope="val">
            <span>{{CollectionLabel('EQUIPMENTSTATUS', statusJudge(val))}}</span>
          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="onLook(val,obj,index)"
                  class="com_textsee">查看错误日志</span>
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

  </div>
</template>

<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import AreaQuery from '@component/common/components/areaQuery'

const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '设备编码',
    width: '18%',
    dataIndex: 'equipmentNum',
    overflowTooltip: true
  },
  {
    title: 'SN编码',
    width: '22%',
    dataIndex: 'equipmentNumber',
    overflowTooltip: true
  },
  {
    title: '设备绑定人',
    width: '20%',
    align: 'center',
    dataIndex: 'deviceBindPerson',
    overflowTooltip: true
  },
  {
    title: '设备绑定人职责范围',
    width: '30%',
    dataIndex: 'deviceBindPersonAreaId'
  },
  {
    title: '使用状态',
    width: '15%',
    dataIndex: 'equipmentStatus',
    align: 'center',
    scopedSlots: { customRender: 'equipmentStatus' }
  },
  {
    title: '最新错误日志时间',
    width: '15%',
    dataIndex: 'errorLogTime',
    align: 'center'
  },
  {
    title: '操作',
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      addressmodel: [], // 号码归属地
      mixListOptions: {
        mixGetDataListURL: 'deviceManagement/exceptionLogList',
        mixActivatedIsNeed: true
      },
      mixDataList: [], // 表体数据
      mixColumns, // 表头
      mixPageRef: 'gridPager',
      page: 1,
      size: 10,
      addressmodelArea: [], // 使用区域
      addressmodelWorkArea: [], // 设备绑定人职责范围
    }
  },
  created () {

  },
  mounted () {

  },
  activated () {
    this.initData()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 15:34:15
     * @information: 状态处理
     */
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
     * @Date: 2021-06-22 14:29:48
     * @information: 查询参数
     */
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      let { addressmodelWorkArea } = this
      Reflect.set(formData, 'deviceBindPersonAreaId', addressmodelWorkArea && addressmodelWorkArea[addressmodelWorkArea.length - 1] || null)
      // this.changetime(formData)
      return formData
    },

    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 14:29:16
     * @information: 查看错误日志
     */
    onLook (val, obj, index) {
      this.$router.push({
        name: 'mobileErrorRecordDetail',
        query: {
          equipmentNum: obj.equipmentNum
        }
      })
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-22 14:33:26
     * @information: 页码改变
     */
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-28 15:20:10
     * @information: 数据初始化
     */
    initData () {
      this.addressmodelArea = []
      this.addressmodelWorkArea = []
    }

  }
}
</script>

<style lang="less">
#mobile-error-recordList {
}
</style>
