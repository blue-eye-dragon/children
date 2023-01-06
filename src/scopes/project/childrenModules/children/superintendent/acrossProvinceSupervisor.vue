<!--
 * @Date: 2021-06-04 17:20:45
 * @information: 跨省通办提醒
-->
<template>
  <div id="across-province-supervisor">
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
                      :ishide="true"
                      msg="区域"
                      :allowClear="false"
                      :addressmodel="addressmodel"
                      @setaddress="setaddress"></AreaQuery>

            <div class="searchbtn searchButton">
              <ta-button class="search "
                          icon="search"
                          @click="onSearch">查询</ta-button>
              <ta-button class="btnleft reset"
                          icon="reload"
                          @click="onReset">重置</ta-button>
            </div>
          </div>
        </ta-form> -->
        </div>

        <div style="float:right">
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
            <!-- <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span> -->

            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.heji">{{a!=''?a:'合计'}}</span>
              <!-- <a v-else-if="b.isIn == '1'" @click="onItemClick(a, b, c)">{{a}}</a> -->
              <span v-else>{{a}}</span>
            </template>

            <template slot="guerNum"
                      slot-scope="a,b,c">
              <span v-if="b.heji">{{a}}</span>
              <a v-else
                 @click="onItemClick(a, b, c, 1)">{{a}}</a>
            </template>

            <template slot="unaNum"
                      slot-scope="a,b,c">
              <span v-if="b.heji">{{a}}</span>
              <a v-else
                 @click="onItemClick(a, b, c, 0)">{{a}}</a>
            </template>
          </ta-table>
        </ta-spin>
      </div>
    </ta-border-layout>
  </div>
</template>

<script>
import $ from 'jquery'
import AreaQuery from '@component/common/components/areaQuery'

// 表头
const tableColumns = [
  {
    title: '区域',
    align: 'center',
    dataIndex: 'areaName',
    scopedSlots: { customRender: 'areaName' },
  },
  {
    title: '孤儿跨省通办数量',
    align: 'center',
    dataIndex: 'guerNum',
    scopedSlots: { customRender: 'guerNum' },
  },
  {
    title: '事实无人抚养儿童跨省通办数量',
    align: 'center',
    dataIndex: 'unaNum',
    scopedSlots: { customRender: 'unaNum' },
  },
]

export default {
  components: {
    AreaQuery
  },
  data () {
    return {
      tableColumns, // 表头
      mixDataList: [], // 数据列表
      page: 1, // 页码
      size: 10, // 条数
      spinning: false, // 表格加载loading
      showOn: false, // 导出弹窗
      addressmodel: [], // 区域字典
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      areaLevel: top.indexTool.getUserInfo().areaLevel, // 角色类别
      // 不同角色对应不同接口
      roleConfigArr: [
        {
          areaLevel: 2, // 市级
          numListUrl: 'overseeApi/overSeeOfAnotherPlaceNum', // 数量接口
          excelUrl: '/overseeBusiness/exportOverSeeOfAnotherPlaceNum', // excel导出接口
        },
        {
          areaLevel: 3, // 区县级
          numListUrl: 'overseeApi/overSeeOfAnotherPlaceNum',
          excelUrl: '/overseeBusiness/exportOverSeeOfAnotherPlaceNum',
        },
      ],
    }
  },
  mounted () { },
  async activated () {
    // 赋值区域
    // this.handleAreaPath()
    $(".ant-table .no-data").addClass('pop')
    // 加载数据
    await this.fetchData()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-08 09:00:51
     * @information: 赋值区域
     */
    handleAreaPath () {
      const userInfo = top.indexTool.getUserInfo()
      // 地区id
      let { areaId } = userInfo
      this.addressmodel = [areaId]
      this.setaddress()
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 16:08:33
     * @information: 加载数据
     */
    async fetchData (val) {
      const userInfo = top.indexTool.getUserInfo()
      // 地区id 角色类别
      let { areaId, areaLevel } = userInfo
      let obj = this.roleConfigArr.find(el => el.areaLevel == areaLevel)
      if (!obj) return;
      let { numListUrl } = obj
      let res = await this.post(numListUrl, { areaId: val || areaId })
      this.mixDataList = res.data.data
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-07 16:26:17
     * @information: 查询
     */
    async onSearch () {
      const searchValue = this.searchForm.getFieldsValue()
      let areaId = searchValue.address_Linkage
        ? searchValue.address_Linkage[searchValue.address_Linkage.length - 1]
        : undefined
      await this.fetchData(areaId)
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-04 18:35:31
     * @information: 重置
     */
    onReset () {
      // 清空表单
      this.searchForm.resetFields()
      // 处理区域路径
      this.handleAreaPath()
      // 加载数据
      this.fetchData()
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-04 18:42:46
     * @information: 确认导出excel
     */
    onConfirmDownExcel () {
      const userInfo = top.indexTool.getUserInfo()
      // 地区id 角色类别
      let { areaId, areaLevel } = userInfo
      let obj = this.roleConfigArr.find(el => el.areaLevel == areaLevel)
      if (!obj) return;
      let { excelUrl } = obj
      this.exportFile(excelUrl, { areaId })
      this.showOn = false
    },
    /**
     * @author: yinpengfei
     * @Date: 2021-06-04 19:11:37
     * @information:  区域 or 孤儿数量 or 事实儿童数量被点击
     */
    onItemClick (text, obj, index, type) {
      let model = {
        name: 'acrossProvinceDetail',
        query: {
          childType: type,
          areaId: obj.areaId,
        }
      }
      this.$router.push(model)
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
    },

  },
}
</script>

<style lang="less">
#across-province-supervisor {
  height: 100%;
}
</style>
