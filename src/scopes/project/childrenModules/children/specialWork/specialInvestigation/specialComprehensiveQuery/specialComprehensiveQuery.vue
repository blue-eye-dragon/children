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
                <ta-form-item label="被检查部门"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="checkedOrgName"
                              class="spilwid">
                  <ta-input placeholder="请输入被检查部门" />
                </ta-form-item>

                <ta-form-item label="排查类型"
                              fieldDecoratorId="resultType"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择排查类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in resultTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <areaQuery :msg="'区域'"
                           class="spilwid area"
                           :fileldName="'area'"
                           :labelCol="{span:9}"
                           :wrapperCol="{span:15}"
                           :ishide="ishide"></areaQuery>

                <ta-form-item label="检查部门"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="checkOrgName"
                              class="spilwid">
                  <ta-input placeholder="请输入检查部门" />
                </ta-form-item>

                <ta-form-item label="专项排查任务"
                              fieldDecoratorId="taskId"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择专项排查任务">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in taskIdList"
                                      :key="item.id"
                                      :value="item.id">{{item.taskTitle}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="检查日期"
                              fieldDecoratorId="checkDate"
                              class="spilwid3"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
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
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>

        </div>
      </div>
      <div style="margin-bottom: 16px;"></div>
      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns"
                :customRow="fnCustomRow"
                :showOverflowTooltip="true"
                :dataSource="mixDataList">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span class="com_textsee "
                @click="look(obj)">查看</span>
        </div>
      </ta-table>

      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
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
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
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
    title: '区域',
    dataIndex: 'area',
    width: '20%'
  },
  {
    title: '排查类型',
    dataIndex: 'resultType',
    width: '20%',
    collectionType: 'RESULT_TYPE'
  },
  {
    title: '专项排查任务',
    dataIndex: 'taskTitle',
    width: '20%'
  },
  {
    title: '被检查部门',
    width: '20%',
    dataIndex: 'checkedOrgName'
  },
  {
    title: '检查部门',
    dataIndex: 'checkOrgName',
    width: '20%'
  },
  {
    title: '检查日期',
    dataIndex: 'checkDate',
    align: 'center',
    width: '20%'

  },
  {
    title: '录入日期',
    width: '20%',
    align: 'center',
    dataIndex: 'recordDate'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
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
      issearch: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: 'specialInvestigateComprehenQuery/comprehenQueryList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: window.parent.indexTool.getUserInfo().orgType == '99', // 福利院的不进行展示
      minVal: null,
      maxVal: null,

      taskIdList: [], // 专项排查任务的字典数据
      resultTypeList: [] // 专项排查任务的字典数据

    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    getMenuDatas () {
      // 专项排查任务字典数据
      this.post('specialInvestigateTask/taskDownloadQueryPageList', { taskState: '2' }).then((res) => {
        if (res.serviceSuccess) {
          this.taskIdList = res.data.pageBean.list
        }
      })
      this.getMenu('RESULT_TYPE', 'resultTypeList') // 排查任务字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      if (formData.area && formData.area.length > 0) {
        formData['area'] = formData.area.slice(-1).toString()
      }
      this.changetime(formData)
      return formData
    },
    // 查看详情
    look (e) {
      if (e.resultType == '1') { // 本级自查
        this.$router.push({
          name: 'enterSpecialTroubleshootingResults',
          query: { flag: 'look', id: e.id }
        })
      } else { // 上级检查
        this.$router.push({
          name: 'enterSpecialTroubleResult',
          query: { flag: 'look', id: e.id }
        })
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }

}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
