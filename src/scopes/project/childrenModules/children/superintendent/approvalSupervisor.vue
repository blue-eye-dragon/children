<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <ta-form-item label="机构"
                              fieldDecoratorId="lowerLevelOrgId"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select :placeholder="'前选择机构'">
                    <ta-select-option v-for="item in orgList"
                                      :key='item.orgId'
                                      :value='item.orgId'>{{item.orgName}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit()">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <!-- <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button> -->
              </div>
            </div>
          </ta-form>
        </div>
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
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
        <div style="margin-top: 16px;"></div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
        </ta-table>
        <div style="margin-top:20px">
          注：列表展示内容为管辖范围内超十五天未处理的审批事项。
        </div>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       @change="pagechange"
                       :dataSource.sync="mixDataList"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
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
    title: '机构',
    width: '30%',
    dataIndex: 'orgName'
  },
  {
    title: '审批类型',
    dataIndex: 'childTypeName',
    width: '40%',
    align: 'center'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '30%',
    align: 'center'
  }
  // {
  //   title: '申请日期',
  //   width: '15%',
  //   align: 'center',
  //   dataIndex: 'birthday'
  // },
  // {
  //   title: '申请单位',
  //   dataIndex: 'childType',
  //   width: '20%',
  //   collectionType: 'CHILDCATEGORYA'
  // },
  // {
  //   title: '申请人',
  //   width: '15%',
  //   align: 'center',
  //   dataIndex: 'overAgeDate'
  // }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      showOn: false,
      orgId: window.parent.indexTool.getUserInfo().orgId,
      orgList: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overseeApi/overSeeApproval' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值
    }
  },
  mounted () {
    this.initdatas()
  },
  activated () {
    this.issearch = false
    this.showOn = false
    this.getOrgList()
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    async getOrgList () {
      const res = await this.post('overseeApi/getOrgByParentId', { orgId: this.orgId })
      this.orgList = res.data.data
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      return formData
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 初始化数据
    initdatas () {
      this.showOn = false
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    // getMenu (code, name) {
    //   const _self = this
    //   _self.post('codetable/getCode', { codeType: code }).then(res => {
    //     if (res.serviceSuccess) {
    //       res.data.codeList.sort(function (a, b) {
    //         return parseInt(a.value) - parseInt(b.value)
    //       })
    //       _self[name] = res.data.codeList
    //     }
    //   })
    // },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    Excel () {
      var data = this.userPageParams()
      data.orgId = window.parent.indexTool.getUserInfo().orgId
      const url = '/overseeBusiness/exportOverSeeApprovalNum'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
