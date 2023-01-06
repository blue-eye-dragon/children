<template>
  <!-- 民间机构综合查询 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <ta-col>
                  <AreaQuery class="spilwid"
                             :ishide="true"
                             :types="'1'"
                             fileldName="areaId"
                             msg="区域"
                             :labelCol="{span:8}"
                             :wrapperCol="{span:16}"
                             @setaddress="setaddress"
                             :addressmodel="addressmodel"></AreaQuery>

                  <ta-form-item label="机构名称"
                                fieldDecoratorId="folkOrgName"
                                class="spilwid"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}">
                    <ta-input />
                  </ta-form-item>
                </ta-col>
                <ta-col>
                  <ta-form-item label="登记日期"
                                fieldDecoratorId="register"
                                class="spilwid2"
                                :labelCol="{span:6}"
                                :wrapperCol="{span:18}">
                    <ta-range-picker />
                  </ta-form-item>

                  <ta-form-item label="机构注册性质"
                                fieldDecoratorId="orgRegistered"
                                class="spilwid2"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}">
                    <ta-select>
                      <ta-select-option v-for=" (item,index ) in orgRegisteredList "
                                        :key=" index"
                                        :value="item.value">
                        {{item.label}}
                      </ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>

                <ta-col>
                  <ta-form-item label="机构状态"
                                fieldDecoratorId="state"
                                class="spilwid"
                                :labelCol="{span:8}"
                                :wrapperCol="{span:16}">
                    <ta-select>
                      <ta-select-option v-for=" (item,index ) in  [{ label: '正常', value: '1' }, { label: '已注销', value: '0' }]"
                                        :key=" index"
                                        :value="item.value">
                        {{item.label}}
                      </ta-select-option>
                    </ta-select>
                  </ta-form-item>
                </ta-col>

              </div>

              <div class="searchbtn searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>
        </div>
        <div style="margin-bottom: 16px;"></div>
        <div style=" height: 50px;"
             hidden>
          <div style="float:right;">
            <ta-button @click="returns"
                       slot="tabBarExtraContent"
                       icon="rollback"
                       v-if="returnName">返回</ta-button>
            <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       @click="showModal">导出</ta-button>
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
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table class="table-min-width"
                    :columns.sync="tableColumns1"
                    :showOverflowTooltip="true"
                    :dataSource="mixDataList"
                    :scroll="{ x: 1500}"
                    :locale="{emptyText: '请根据检索条件查询详细列表信息'}"
                    bordered>
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>

            <span slot="state"
                  slot-scope="val, obj, index">
              <span :class="obj.state=='1'?'color1':'color2'">{{ obj.state=="1"?"正常":"已注销"}}</span>
            </span>
            <span slot="action"
                  slot-scope="val,obj"
                  class="btnlist">
              <span @click="see(obj)"
                    class="com_textsee">查看</span>
            </span>
          </ta-table>
        </ta-spin>

      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL11"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '区域',
    dataIndex: 'areaName',
    align: 'center',
    width: 150
  },
  {
    title: '机构名称',
    dataIndex: 'folkOrgName',
    align: 'center',
    width: 150
  },
  {
    title: '机构注册性质',
    dataIndex: 'orgRegistered',
    align: 'center',
    collectionType: 'ORGREGISTERED',
    width: 150
  },
  {
    title: '业务主管单位',
    dataIndex: 'competentOrganization',
    align: 'center',
    width: 100
  },
  {
    title: '是否有委托代养协议',
    dataIndex: 'raisingAgreement',
    align: 'center',
    collectionType: 'YESNO',
    width: 130
  },
  {
    title: '业务范围是否包括抚养儿童',
    dataIndex: 'raisingChild',
    align: 'center',
    collectionType: 'YESNO',
    width: 130
  },
  {
    title: '机构状态',
    dataIndex: 'state',
    width: 130,
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    width: '150px',
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
      spinning: null,
      tableColumns1, // 详细列表查询-福利机构
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL11: 'folkOrgStatistics/folkOrgComprehensiveInquiry',
        mixActivatedIsNeed: false
      },
      mixPageRef: 'mixPageRef',
      showOn: false, // 导出提示弹窗的显隐控制
      returnName: null, // 返回按钮要返回的页面
      addressmodel: [],
      orgRegisteredList: [],
      issearch: false
    }
  },
  mounted () {
    this.getDic()
    const { areaId } = window.parent.indexTool.getUserInfo()
    if (areaId != 1000000000000000000) {
      this.addressmodel = [areaId]
    }
    this.$nextTick(() => {
      this.handleSubmit()
    })
    this.setHeight2('one', 'oneout', !this.issearch)
  },
  activated () {
    if (this.$route.query.returnName) { // 统计跳转
      this.returnName = this.$route.query.returnName
      this.addressmodel = this.$route.query.areaArray.split('/').slice(window.parent.indexTool.getUserInfo().areaLevel == 0 ? 1 : window.parent.indexTool.getUserInfo().areaLevel) || []
      this.setaddress()
      this.handleSubmit()
    }
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
      }
      this.setaddress()
      this.$nextTick(() => {
        this.searchForm.setFieldsValue(this.$route.query.formDataSearch)
      })
    }
  },
  methods: {
    async getDic () {
      // 机构注册性质
      this.orgRegisteredList = await this.getDictionaries('ORGREGISTERED')
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight2('one', 'oneout', !this.issearch)
    },
    setHeight2 (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },

    // 地址赋值
    setaddress () {
      this.searchForm.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    // 详细列表查询列表中的查看
    see (e) {
      const formData = this.searchForm.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      this.$router.push({
        path: 'folkOrgInfo',
        query: {
          id: e.folkOrgId,
          disabled: true
        }
      })
    },
    resetFrom (e) {
      this.searchForm.resetFields()
      if (window.parent.indexTool.getUserInfo().areaLevel != 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      }
      if (e != 'back') {
        this.handleSubmit('search')
      }
    },
    // 分页查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.areaId && formData.areaId.length > 0) {
        formData.areaId = formData.areaId.slice(-1).toString()
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (this.$route.query.isPrimaryLevel == '1') {
        formData.isPrimaryLevel = '1'
      }
      this.changetime(formData)
      return formData
    },
    // 返回 到原页面
    returns () {
      this.resetFrom('back')
      this.$router.push({
        name: this.returnName
      })
    },
    // 读取列表 分页形式
    handleSubmit (e) {
      if (e) { // 只有点查询才重置参数
        this.page = 1
        this.size = 10
      }
      this.nowtype = 0
      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      const ref = this.mixPageRef
      this.$nextTick(() => {
        this.$refs[ref].loadData(data => {
          this.spinning = false
          this.issearch = !this.issearch
          this.advancedquery()
        })
      })
    },
    // 分页change事件
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 导出按钮的点击事件
    showModal () {
      this.showOn = true
    },
    // 导出提示弹窗的取消事件
    handleCancel (e) {
      this.showOn = false
    },
    // 导出事件
    Excel () {
      var data = this.userPageParams()
      const url = '/welfareOrgManagement/exportWelfareOrgList'
      this.exportFile(url, data)
      this.showOn = false
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.searchbtn {
  width: 330px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  margin-left: auto;
  margin-top: 2px;
}
.color1 {
  color: #068c07;
}
.color2 {
  color: #f95d02;
}
</style>
