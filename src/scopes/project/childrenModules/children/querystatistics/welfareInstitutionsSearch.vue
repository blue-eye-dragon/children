
<template>
  <div class="searchdata tadrawer"
       id='tmd'>
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
                <AreaQuery class="spilwid"
                           :ishide="true"
                           :types="'1'"
                           fileldName="areaId"
                           msg="区域"
                           :labelCol="{span:8}"
                           :wrapperCol="{span:16}"
                           @setaddress="setaddress"
                           :addressmodel="addressmodel"></AreaQuery>
                <ta-form-item label="机构状态"
                              fieldDecoratorId="state"
                              class="spilwid"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              :initValue="'1'">
                  <ta-select>
                    <ta-select-option v-for=" (item,index ) in  [{ label: '正常', value: '1' }, { label: '已注销', value: '0' }, { label: '全部', value: '' }]"
                                      :key=" index"
                                      :value="item.value">
                      {{item.label}}
                    </ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="成立日期"
                              fieldDecoratorId="foundDate"
                              class="spilwid"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="机构名称"
                              fieldDecoratorId="orgName"
                              class="spilwid"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-input placeholder="请输入机构名称" />
                </ta-form-item>
                <ta-form-item label="机构类型"
                              fieldDecoratorId="orgType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select collection-type="INSTITUTIONALTYPE"
                             placeholder="请选择机构类型" />
                </ta-form-item>
                <ta-form-item label="机构性质"
                              fieldDecoratorId="orgNature"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select collection-type="ORGNATURE"
                             placeholder="请选择机构性质" />
                </ta-form-item>
                <ta-form-item label="登记机关"
                              fieldDecoratorId="registerOrg"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select collection-type="REGISTRATIONAUTHORITY"
                             placeholder="请选择登记机关" />
                </ta-form-item>

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
        <div style="height: 50px;">
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
            <span slot="foundDate"
                  slot-scope="a">
              <span>{{a!=undefined?a.substring(0,10):''}}</span>
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
  { // 福利机构
    title: '区域',
    dataIndex: 'namePath',
    align: 'center',
    width: 150
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
    align: 'center',
    width: 150
  },
  {
    title: '机构类型',
    dataIndex: 'orgType',
    align: 'center',
    collectionType: 'INSTITUTIONALTYPE',
    width: 150
  },
  {
    title: '机构性质',
    dataIndex: 'orgNature',
    align: 'center',
    collectionType: 'ORGNATURE',
    width: 100
  },
  {
    title: '登记机关',
    dataIndex: 'registerOrg',
    align: 'center',
    collectionType: 'REGISTRATIONAUTHORITY',
    width: 100
  },
  {
    title: '负责人',
    dataIndex: 'legalRepresentative',
    align: 'center',
    width: 130
  },
  {
    title: '负责人联系电话',
    dataIndex: 'tel',
    align: 'center',
    width: 120
  },
  {
    title: '福利机构抚养的孤弃儿童数量',
    dataIndex: 'gqetTotal',
    align: 'center',
    width: 150
  },
  {
    title: '福利机构代养的困境儿童数量',
    dataIndex: 'dykjetTotal',
    align: 'center',
    width: 150
  },
  {
    title: '事实无人抚养儿童数量',
    dataIndex: 'sswrfyTotal',
    align: 'center',
    width: 150
  },
  {
    title: '成立日期',
    dataIndex: 'foundDate',
    scopedSlots: { customRender: 'foundDate' },
    align: 'center',
    width: 150
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
        mixGetDataListURL1: 'orphanLivingExpensesAndChildren/pageUnattendedChildStatistics', // 详细列表数据列表接口
        mixGetDataListURL11: 'welfareOrgManagement/getWelfareOrgMsg', // 福利机构
        mixActivatedIsNeed: false
      },
      mixPageRef: 'mixPageRef',
      showOn: false, // 导出提示弹窗的显隐控制
      returnName: null, // 返回按钮要返回的页面
      addressmodel: [],
      issearch: false,
      addressmodelCome: []
    }
  },
  mounted () {
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
    this.addressmodelCome = []
    if (this.$route.query.returnName) { // 统计跳转
      this.returnName = this.$route.query.returnName
      this.addressmodel = this.$route.query.areaArray.split('/').slice(window.parent.indexTool.getUserInfo().areaLevel == 0 ? 1 : window.parent.indexTool.getUserInfo().areaLevel) || []
      this.setaddress()
      this.addressmodelCome = this.addressmodel
      console.log('this.addressmodel1111-->', this.addressmodel)
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
      this.nowtype = 3
      this.$router.push({
        path: 'seeAll',
        query: {
          parentId: this.parentId,
          parentOrgName: this.parentOrgName,
          nowtype: this.nowtype,
          orgType: this.orgType,
          id: e.id,
          disabled: true
        }
      })
    },
    resetFrom (e) {
      this.searchForm.resetFields()
      if (this.addressmodelCome.length > 0) {
        this.addressmodel = this.addressmodelCome
      } else {
        if (window.parent.indexTool.getUserInfo().areaLevel != 0) {
          this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
        }
      }

      this.setaddress()
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
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
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
