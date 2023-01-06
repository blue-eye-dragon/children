<!--
 * @Date: 2021-06-07 09:49:42
 * @information: 跨省通办详情
-->
<template>
  <div id="across-province-detail">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <!-- <ta-form  ref="one"
                  layout="inline"
                  :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <div class="__form-spec-line__ form-across">
            <AreaQuery class="spilwid"
                        :ishide="false"
                        msg="区域"
                        :allowClear="false"
                        :addressmodel="addressmodel"
                        @setaddress="setaddress"></AreaQuery>
            <div class="searchbtn searchButton">
              <ta-button class="search "
                          icon="search"
                          @click="handleSubmit('search')">查询</ta-button>
              <ta-button class="btnleft reset"
                          icon="reload"
                          @click="onReset">重置</ta-button>
            </div>
          </div>
        </ta-form> -->
        </div>

        <div style="float:right">
          <ta-button @click="$router.go(-1)">
            <ta-icon type="rollback" />返回
          </ta-button>
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showOn = true">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="onConfirmDownExcel"
                    @cancel="showOn = false">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">

          <ta-table class="tables table-min-width"
                    style="margin-top:60px"
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :dataSource="mixDataList"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <span slot="birthday"
                  slot-scope="a, b, c">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
            </span>
          </ta-table>
        </ta-spin>
      </div>

      <div style="margin-top:20px">
        <!-- 市级 -->
        <p v-if="areaLevel == '2'">
          注：列表展示内容为异地申请或公共服务平台申请户籍地区县十个工作日未审批的数据。请督办区县及时进行处理。
        </p>
        <!-- 区级 -->
        <p v-if="areaLevel == '3'">
          注：列表展示内容为异地申请或公共服务平台申请上报到户籍地乡镇十个工作日后，乡镇未查验的数据，请督办乡镇及时处理。
        </p>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       @change="onPageChange"
                       :dataSource.sync="mixDataList"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>

    </ta-border-layout>
  </div>
</template>

<script>
import moment from 'moment'
import $ from 'jquery'
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'

// 表头
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' } // 就像这个一样，比如要处理序号这一列就这样处理
  },
  {
    title: '区域',
    width: '20%',
    dataIndex: 'areaName'
  },
  {
    title: '儿童姓名',
    width: '20%',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '15%',
    align: 'center',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '数据来源',
    width: '15%',
    align: 'center',
    dataIndex: 'sourceFrom'
  },
  {
    title: '待审核单位',
    width: '15%',
    align: 'center',
    dataIndex: 'auditUnit'
  },
  {
    title: '申请单位',
    width: '15%',
    align: 'center',
    dataIndex: 'applyUnit'
  },
  {
    title: '申请日期',
    width: '15%',
    align: 'center',
    dataIndex: 'applyDate'
  }
]

export default {
  mixins: [listMixin],
  components: {
    // AreaQuery
  },
  data () {
    return {
      tableColumns, // 表头
      mixDataList: [], // 数据列表
      page: 1, // 页码
      size: 10, // 条数
      spinning: false, // 表格加载loading
      showOn: false, // 导出弹窗
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '' // 数据列表接口，API地址
      },
      addressmodel: [], // 区域字典
      areaLevel: top.indexTool.getUserInfo().areaLevel, // 角色类别
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      // 不同角色对应不同接口
      roleConfigArr: [
        {
          areaLevel: 2, // 市级
          detailListUrl: 'overseeApi/overSeeOfAnotherPlaceMsg', // 详情接口
          excelUrl: '/overseeBusiness/exportOverSeeOfAnotherPlaceMsg' // excel导出接口
        },
        {
          areaLevel: 3, // 区县级
          detailListUrl: 'overseeApi/overSeeOfAnotherPlaceMsg',
          excelUrl: '/overseeBusiness/exportOverSeeOfAnotherPlaceMsg'
        }
      ]
    }
  },
  created () {
    // 设置查询地址
    const obj = this.roleConfigArr.find(el => el.areaLevel == this.areaLevel)
    if (!obj) return
    this.mixListOptions.mixGetDataListURL = obj.detailListUrl
  },
  mounted () { },
  activated () {
    // 处理区域路径
    // this.handleAreaPath()
    // 加载数据
    this.handleSubmit()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-08 08:59:41
     * @information: 处理区域路径
     */
    handleAreaPath () {
      const userInfo = top.indexTool.getUserInfo()
      // 登录地区id
      const { areaId: loginAreaId } = userInfo
      // 所点击的区域id
      const { areaId } = this.$route.query
      this.addressmodel = [loginAreaId, areaId]
      // 赋值
      this.setaddress()
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 10:01:29
     * @information: 参数
     */
    userPageParams () {
      // 区域id 儿童类别
      const { areaId, childType } = this.$route.query
      const formData = { areaId, childType }
      return formData
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 10:01:48
     * @information: 重置
     */
    onReset () {
      // 清空表单
      this.searchForm.resetFields()
      // 处理区域路径
      this.handleAreaPath()
      // 加载数据
      this.handleSubmit('search')
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 10:01:57
     * @information: 改变页码
     */
    onPageChange (page, size) {
      this.page = page
      this.size = size
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 10:02:04
     * @information: 确认导出excel
     */
    onConfirmDownExcel () {
      const userInfo = top.indexTool.getUserInfo()
      // 角色类别
      const { areaLevel } = userInfo
      const obj = this.roleConfigArr.find(el => el.areaLevel == areaLevel)
      if (!obj) return
      const { excelUrl } = obj
      // 区域id 儿童类别
      const { areaId, childType } = this.$route.query
      const model = {
        areaId,
        areaLevel,
        childType
      }
      this.exportFile(excelUrl, model)
      this.showOn = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 13:45:54
     * @information: 区域赋值
     */
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    }
  }
}
</script>

<style lang="less">
#across-province-detail {
  height: 100%;
}
</style>
