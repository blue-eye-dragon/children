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
                <AreaQuery class='spilwid'
                           :ishide="ishide"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           msg="区域"
                           v-if="!orgtype"></AreaQuery>

                <ta-form-item label="机构名称"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="orgName"
                              class='spilwid'
                              v-show='!loginType'>
                  <ta-input placeholder="请输入机构名称" />
                </ta-form-item>
                <ta-form-item label="报送年度"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="reportSendYear"
                              class='spilwid'>
                  <ta-year-picker style="width:100%;"
                                  placeholder="请选择报送年度" />
                </ta-form-item>
                <ta-form-item label="报送人"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="reportSendPerson"
                              class='spilwid'
                              :fieldDecoratorOptions="this.verificationRulesNotMustFill('报送人', 72)">
                  <ta-input placeholder="请输入报送人" />
                </ta-form-item>
                <ta-form-item label="报送日期"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}"
                              fieldDecoratorId="reportSendDate"
                              class='spilwid3'>
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           v-if="!orgtype"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>
        </div>
        <div class="operateBtn"
             v-if="this.orgtype">
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增工作报告和计划</ta-button>

        </div>
        <div v-else
             style="margin-bottom: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ pageSize * (pageNum - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <!-- <span>{{obj}}</span> -->
            <span @click="edit(obj)"
                  class="com_textedit"
                  v-if='loginType'>编辑</span>
            <!-- <ta-divider v-if='loginType'
                        type="vertical" /> -->
            <span @click="see(obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '区域',
    width: '22%',
    dataIndex: 'areaName'
  },
  {
    title: '机构名称',
    width: '22%',
    dataIndex: 'orgName'
  },
  {
    title: '报送年度',
    width: '18%',
    dataIndex: 'reportSendYear'
  },
  {
    title: '报送人',
    width: '22%',
    dataIndex: 'reportSendPerson'
  },
  {
    title: '报送日期',
    align: 'center',
    width: '20%',
    dataIndex: 'reportSendDate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
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
      ishide: true,
      tableColumns,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      mixListOptions: {
        mixGetDataListURL: '/welfareOrgWorkReportManagement/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      loginType: false,
      userAreaLevel: '',
      issearch: false,
      orgtype: window.parent.indexTool.getUserInfo().orgType == '99' // 福利院用户有新增
    }
  },
  mounted () {
    this.getLoginType()
    this.getUserInfo()
  },
  activated () {
    this.issearch = false

    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    // 新增
    add () {
      this.$router.push({
        name: 'workReportSubmission',
        query: { ifdisabled: false }
      })
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 获取当前登录用户的信息
    async getUserInfo () {
      // 区划级别
      let data = window.parent.indexTool.getUserInfo().areaLevel
      this.userAreaLevel = data
    },
    pagechange (page, size) {
      this.pageNum = page
      this.pageSize = size
    },
    // 判断登陆人是福利院还是民政局
    async getLoginType () {
      let data = await this.post('/welfareOrgWorkReportManagement/isShowTheEditButton')
      this.loginType = data.data.data.isShowTheEditButton
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      console.log(formData)
      if (formData.address_Linkage) {
        let idx = formData.address_Linkage.length - 1
        formData.areaCode = formData.address_Linkage[idx]
        delete formData.address_Linkage
      }
      this.changetime(formData)
      if (formData.reportSendYear) {
        console.log(formData.reportSendYear.substring(0, 4))
        formData.reportSendYear = formData.reportSendYear.substring(0, 4)
      }

      return formData
    },
    edit (obj) {
      this.$router.push({
        name: 'workReportSubmission',
        query: {
          id: obj.id,
          disabled: false,
          ifdisabled: true
        }
      })
    },
    see (obj) {
      this.$router.push({
        name: 'workReportSubmission',
        query: {
          id: obj.id,
          disabled: true,
          ifdisabled: true
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>