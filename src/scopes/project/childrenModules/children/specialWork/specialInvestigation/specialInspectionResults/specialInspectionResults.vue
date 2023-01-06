 <template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <areaQuery :msg="'区域'"
                           v-if="getUserInfo.orgType != '99'"
                           :fileldName="'area'"
                           class="spilwid"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           :ishide="false"></areaQuery>
                <ta-form-item label="区域"
                              v-if="getUserInfo.orgType == '99'"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="areas"
                              class="spilwid">
                  <ta-input :disabled="true" />
                </ta-form-item>
                <ta-form-item label="检查部门"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="checkOrgName"
                              class="spilwid">
                  <ta-input placeholder="请输入检查部门" />
                </ta-form-item>
                <ta-form-item label="被检查部门"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="checkedOrgName"
                              class="spilwid">
                  <ta-input placeholder="请输入被检查部门" />
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
        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     v-if="getUserInfo.orgType != '99'"
                     @click="publish">录入专项排查结果</ta-button>
        </div>
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
            <span class="com_textedit"
                  v-if="obj.isCanEdit=='1'&&obj.delState=='1'"
                  @click="edit(obj)">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.isCanEdit=='1'&&obj.delState=='1'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <span class="com_textsee"
                  @click="look(obj)">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
    width: '25%'
  },
  {
    title: '专项排查任务',
    dataIndex: 'taskTitle',
    width: '23%'
  },
  {
    title: '被检查部门',
    width: '22%',
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
    width: '20%'
  },
  {
    title: '录入日期',
    width: '20%',
    dataIndex: 'recordDate'
  },
  {
    title: '当前状态',
    width: '15%',
    dataIndex: 'delState',
    collectionType: 'INVESTIGATE_TASK_STATE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
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
      tableColumns,
      issearch: false,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/specialInvestigateResult/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',

      minVal: null,
      maxVal: null,
      getUserInfo: window.parent.indexTool.getUserInfo(), // 当前用户信息
      taskIdList: [] // 专项排查任务的字典数据

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
      this.getMenu('SEX', 'sexList') // 家庭成员有无犯罪记录字典数据
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
    // 比较数据大小
    compareData (e) {
      let minVal = this.minVal
      let maxVal = this.maxVal
      if (typeof minVal == 'number' && typeof maxVal == 'number' && minVal > maxVal) {
        this.$message.warn('初始值不能大于结束值！')
        this[e] = null
      }
    },
    // 查询参数
    userPageParams () {
      this.setLabelAndWrapperWidth('29.3%', '70.7%', 'area') // 单独一行字段宽度控制
      let formData = this.searchForm.getFieldsValue()
      // 福利院的用户，区划显示当前区划，只读
      if (this.getUserInfo.orgType == '99') {
        this.searchForm.setFieldsValue({
          areas: this.getUserInfo.orgName
        })
        delete formData.areas
      }
      if (formData.area && formData.area.length > 0) {
        formData['area'] = formData.area.slice(-1).toString()
      }
      formData['resultType'] = '2' // 上级检查
      this.changetime(formData)
      return formData
    },
    // 重置
    resetFrom () {
      this.searchForm.resetFields()
      this.maxVal = null
      this.minVal = null
      this.handleSubmit()
    },
    // 录入专项排查结果
    publish () {
      this.$router.push({
        name: 'enterSpecialTroubleResult',
        query: { flag: 'add' }
      })
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'enterSpecialTroubleResult',
        query: { flag: 'edit', id: e.id }
      })
    },
    // 删除
    deletes (e) {
      this.post('/specialInvestigateResult/updateDelStateById', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已删除')
          this.handleSubmit()
        }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'enterSpecialTroubleResult',
        query: { flag: 'look', id: e.id }
      })
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
