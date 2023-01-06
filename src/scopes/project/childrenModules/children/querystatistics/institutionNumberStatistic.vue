<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px'}">

      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row>
            <AreaQuery class="spilwid"
                       :ishide="true"
                       :types="'1'"
                       fileldName="areaId"
                       msg="区域"
                       :addressmodel="addressmodel"
                       @setaddress="setaddress"></AreaQuery>
            <ta-form-item label="成立日期"
                          fieldDecoratorId="foundDate"
                          class="spilwid3"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item label
                          class="spilwid"
                          :labelCol="{span:0}"
                          :wrapperCol="{span:24}">
              <span class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="getlist('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFroms">重置</ta-button>
              </span>
            </ta-form-item>
          </ta-row>
        </ta-form>
      </div>
      <div>
        <div class="operateBtn ">
          <ta-button @click="goback"
                     class="rightClass btnleft"
                     icon="rollback"
                     v-if="isShowReturn">返回</ta-button>
          <ta-button class="exportbtn rightClass"
                     icon="upload"
                     @click="exports">导出</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table class="table-min-width"
                    :columns="tableColumns"
                    :dataSource="mixDataList"
                    :locale="{emptyText: '请根据检索条件查询详细列表信息'}"
                    bordered>
            <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel >2 || b.areaName == '合计'">{{a}}</span>
              <a @click="areaClick(b)"
                 v-else-if="3!=b.areaLevel">{{a}}</a>
              <span v-else>{{a}}</span>
            </template>
            <span slot="welfareOrgAmount"
                  slot-scope="val,obj,index">
              <span v-if="obj.areaName == '合计'">{{obj.welfareOrgAmount}}</span>
              <a href="javascript:;"
                 v-else
                 @click="lookInfo(val,obj,index,'1')">{{obj.welfareOrgAmount}}</a>
            </span>
            <span slot="projectOrgAmount"
                  slot-scope="val,obj,index">
              <span v-if="obj.areaName == '合计'">{{obj.projectOrgAmount}}</span>
              <a href="javascript:;"
                 v-else
                 @click="lookInfo(val,obj,index,'2')">{{obj.projectOrgAmount}}</a>
            </span>
          </ta-table>
        </ta-spin>
      </div>
    </ta-border-layout>
    <ta-modal :centered="false"
              style="top: 25%;"
              :visible="showOn"
              @ok="Excel"
              @cancel="handleCancel">
      <div>
        <h3>确认导出查询条件下的全部有效数据吗？</h3>
      </div>
    </ta-modal>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
const tableColumns = [
  {
    title: '区域',
    dataIndex: 'areaName',
    align: 'center',
    width: '25%',
    scopedSlots: { customRender: 'areaName' }
  },
  {
    title: '福利机构数量',
    dataIndex: 'welfareOrgAmount',
    align: 'center',
    width: '25%',
    scopedSlots: { customRender: 'welfareOrgAmount' }
  },
  {
    title: '未保中心数量',
    dataIndex: 'projectOrgAmount',
    align: 'center',
    width: '25%',
    scopedSlots: { customRender: 'projectOrgAmount' }
  }
  //   {
  //     title: '合计',
  //     align: 'center',
  //     dataIndex: 'sumAmount',
  //     width: '25%'
  //   }
]
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      spinning: null,
      tableColumns, // 基础数据统计
      mixListOptions: {
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        mixGetDataListURL: 'childProtectOrgManagement/queryProjectAndWelfareOrgCount', // 基本数据统计列表接口
        mixActivatedIsNeed: true
      },
      mixPageRef: 'mixPageRef',
      areaId: null, // 基本数据统计列表的区域id
      isShowReturn: false, // 返回按钮是否显示
      clickNotQuery: false, // 区分是区域点击还是查询按钮的查询
      showOn: false,
      addressmodel: []
    }
  },
  activated () {
    this.initDatas() // 初始化数据
  },
  methods: {
    // 初始化数据
    initDatas () {
      this.showOn = false
      this.isShowReturn = false
      this.areaId = null
      this.clickNotQuery = false
      this.addressmodel = window.parent.indexTool.getUserInfo().areaLevel == 0 ? [] : [window.parent.indexTool.getUserInfo().areaId]
    },
    setaddress () {
      this.form.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    // 导出按钮
    exports () {
      this.showOn = true
    },
    // 导出确定
    Excel () {
      var data = this.queryDone()
      data.orgType = window.parent.indexTool.getUserInfo().orgType
      this.exportFile('/orgAllNum/exportOrgAllNum', data)
      this.showOn = false
    },
    // 导出取消
    handleCancel () {
      this.showOn = false
    },
    // 点击数字跳转
    lookInfo (val, obj, index, type) { // type: 1福利机构数量 2未保中心数量
      if (type == '1') {
        this.$router.push({
          name: 'welfareInstitutionsSearch',
          query: {
            areaId: obj.areaId,
            returnName: 'institutionNumberStatistic',
            areaArray: obj.idPath,
            isPrimaryLevel: obj.isPrimaryLevel || '0'
          }
        })
      } else {
        this.$router.push({
          name: 'institutionNumberQuery',
          query: {
            areaId: obj.areaId,
            returnName: 'institutionNumberStatistic',
            areaArray: obj.idPath,
            isPrimaryLevel: obj.isPrimaryLevel || '0'
          }
        })
      }
    },
    // 返回
    goback () {
      this.areaId = null
      this.isShowReturn = false
      this.resetFroms()
    },
    // 重置
    resetFroms () {
      this.form.resetFields()
      this.tableData = []
      if (window.parent.indexTool.getUserInfo().areaLevel != 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      } else {
        this.addressmodel = []
      }
      this.getlist('search')
    },
    // 区域点击事件
    areaClick (e) {
      this.isShowReturn = true
      this.areaId = e.areaId
      this.addressmodel.push(e.areaId)
      this.getlist()
    },
    // 读取列表 无分页形式
    async getlist (e) {
      this.spinning = true
      if (e) { // 只有点查询才重置参数
        this.clickNotQuery = false
      } else { // 区域点击
        this.clickNotQuery = true
      }
      const params = {
        ...this.queryDone()
      }
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.mixDataList = res.data.data
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    // 查询条件处理
    queryDone () {
      const formData = this.form.getFieldsValue()
      if (this.clickNotQuery && this.areaId) { // 点击区域时传值
        formData.areaId = this.areaId
      } else { // 点击查询按钮时传值
        if (formData.areaId && formData.areaId.length > 0) {
          formData.areaId = formData.areaId.slice(-1).toString()
        } else {
          formData.areaId = window.parent.indexTool.getUserInfo().areaId
        }
        // 所选区划与当前登录人区划相同或者为空时，不显示返回按钮
        if (formData.areaId == window.parent.indexTool.getUserInfo().areaId || !formData.areaId) {
          this.isShowReturn = false
        } else {
          this.isShowReturn = true
        }
      }
      this.changetime(formData)
      if (formData.foundDateEnd) {
        formData.foundDateEnd = moment(formData.foundDateEnd).format('YYYY-MM-DD')
      }
      return formData
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.spilwid3 {
  width: 390px;
}
</style>
