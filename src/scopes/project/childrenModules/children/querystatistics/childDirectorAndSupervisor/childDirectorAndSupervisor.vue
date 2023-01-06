<template>
  <!-- 儿童主任督导员数量统计 -->
  <div class="searchdata"
       id="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">
            <!-- form -->
            <!-- v-if="ishide"  上版本控制查询问题。 -->
            <AreaQuery types='2'
                       class="spilwid"
                       :ishide.sync="ishide"
                       msg="区域"
                       fileldName="areaId"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></AreaQuery>
            <ta-form-item label="是否认领"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          class="spilwid"
                          fieldDecoratorId="isConfirm"
                          :fieldDecoratorOptions="{initialValue: ''}">
              <ta-select>
                 <ta-select-option value="1">已认领</ta-select-option>
                 <ta-select-option value="2">未认领</ta-select-option>
                 <ta-select-option value="">全部</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="getlist('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn ">
          <ta-button @click="goback"
                     icon="rollback"
                     class="rightClass btnleft"
                     v-if="isShowReturn">返回</ta-button>
          <ta-button icon='upload'
                     class="exportbtn rightClass"
                     @click="showE">导出</ta-button>
        </div>
        <ta-modal :centered="false"
                  style="top: 25%;"
                  :visible="showM"
                  @ok="Excel"
                  @cancel="handleCancel">
          <div>
            <h3>确认导出查询条件下的全部有效数据吗？</h3>
          </div>
        </ta-modal>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <div class="tableout">
            <ta-table :columns="tableColumns"
                      :dataSource="tableData"
                      :locale="{emptyText: '请根据检索条件查询详细列表信息'}"
                      bordered>
              <span slot="num"
                    slot-scope="a, b, c">
                <span>{{ size * (page - 1) + c + 1 }}</span>
              </span>
              <span slot="areaName"
                    slot-scope="a,b">
                <span v-if="b.areaLevel > 3 || b.areaName == '总计' || b.isBenJi == 0">{{a}}</span>
                <a @click="areaClick(b)"
                   v-else>{{a}}</a>
                <!-- <span v-else>{{a}}</span> -->
              </span>
              <span slot="dNum"
                    slot-scope="val,obj,index">
                <a href="javascript:;"
                   v-if="0!=obj.serialNum&&obj.directorNum != 0"
                   @click="lookInfo(val,obj,index,'2')">{{obj.directorNum}}</a>

                <span v-else>{{obj.directorNum}}</span>
              </span>
              <span slot="sNum"
                    slot-scope="val,obj,index">
                <a href="javascript:;"
                   v-if="0!=obj.serialNum&&obj.supervisorNum != 0"
                   @click="lookInfo(val,obj,index,'1')">{{obj.supervisorNum}}</a>
                <span v-else>{{obj.supervisorNum}}</span>
              </span>
            </ta-table>
          </div>
        </ta-spin>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'

export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    AddressComponent
  },
  data () {
    const tableColumns = [
      //   {
      //     title: '行政区划',
      //     dataIndex: 'areaName',
      //     width: '30%',
      //     customRender: (text, record, index) => {
      //       return this.marge(text, record, index)
      //     }
      //   },
      {
        title: '区域',
        width: '30%',
        dataIndex: 'areaName',
        scopedSlots: { customRender: 'areaName' }
      },
      {
        title: '儿童主任',
        width: '35%',
        dataIndex: 'directorNum',
        scopedSlots: { customRender: 'dNum' }
      },
      {
        title: '儿童督导员',
        width: '35%',
        dataIndex: 'supervisorNum',
        scopedSlots: { customRender: 'sNum' }
      },
      //   {
      //     title: '合计',
      //     width: 80,
      //     dataIndex: 'directorAndsupervisorNum'
      //   }
    ]
    return {
      spinning: null,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childdirectorandsupervisor/getByAreaCode', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixGetDataListIsPage: false

      },
      mixPageRef: 'gridPager',
      ishide: true,
      showM: false,
      isConfirm: '',

      addressmodel: [],
      isbu: false,
      optiondata: [],
      areaId: null, // 基本数据统计列表的区域id
      isShowReturn: false, // 返回按钮是否显示
      clickNotQuery: false, // 区分是区域点击还是查询按钮的查询
    }
  },
  activated () {
    this.loadData()
  },
  methods: {
    // 区域点击事件
    areaClick (e) {
      this.isShowReturn = true
      this.areaId = e.areaCode
      this.addressmodel.push(e.areaCode)
      this.getlist()
    },
    // 返回
    goback () {
      this.areaId = null
      this.isShowReturn = false
      this.resetFrom()
    },
    // 查询条件处理
    queryDone () {
      let formData = this.form.getFieldsValue()
      if (this.clickNotQuery && this.areaId) { // 点击区域时传值
        formData['areaId'] = this.areaId
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
      if (formData.isConfirm) {
        this.isConfirm = formData.isConfirm
      }
      return formData
    },
    showE () {
      this.showM = true
    },
    Excel () {
      this.exportFile('/childrenDirectorNum/exportChildrenDirectorNum', this.queryDone())
      this.showM = false
    },
    handleCancel (e) {
      this.showM = false
    },
    adsvalchange (val) {
      this.nowcode = val[val.length - 1] ? val[val.length - 1] : ''
      this.form.setFieldsValue({
        orgName: ''
      })
    },
    setaddress () {
      this.form.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    loadData () {
      this.isShowReturn = false
      this.areaId = null
      this.isConfirm = ''
      this.clickNotQuery = false
      this.resetFrom()
    },
    marge (text, record, index, val) {
      let obj = {
        children: text,
        attrs: {}
      }
      if (index === this.tableData.length - 1) {
        obj.attrs.colSpan = parseFloat(val)
        if (val !== 0) {
          obj.children = '总计'
        }
      }
      return obj
    },
    async getlist (e) {
      this.spinning = true
      if (e) { // 只有点查询才重置参数
        this.clickNotQuery = false
      } else { // 区域点击
        this.clickNotQuery = true
      }
      let params = {
        ...this.queryDone()
      }
      
      let res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.tableData = res.data.data
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    lookInfo (a, obj, i, type) {
      this.$router.push({
        name: 'childrenDirectorInfoMaintain',
        query: {
          // url: '/childdirectorandsupervisor/viewByAreaCodeAndRegistType',
          registType: type,
          areaCode: obj.areaCode,
          isConfirm: this.isConfirm,
          areaArray: obj.idPath,
          isBenJi: obj.isBenJi,
          returnName: 'childDirectorAndSupervisor'
        }
      })
    },

    resetFrom () {
      this.form.resetFields()
      this.tableData = []
      if (window.parent.indexTool.getUserInfo().areaLevel != 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      } else {
        this.addressmodel = []
      }
      this.getlist('search')
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

<style scoped lang="less">
.tableout {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}
</style>
