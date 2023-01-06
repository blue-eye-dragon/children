 <template>
  <div class="searchdata">
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
                <ta-form-item label="颁布机关"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="publishDeptName"
                              class="spilwid">
                  <ta-input placeholder="请输入颁布机关" />
                </ta-form-item>
                <ta-form-item label="任务状态"
                              fieldDecoratorId="taskState"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择任务状态">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in taskStateList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="任务文号"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="taskFileNo"
                              class="spilwid">
                  <ta-input placeholder="请输入任务文号" />
                </ta-form-item>
                <ta-form-item label="任务标题"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="taskTitle"
                              class="spilwid">
                  <ta-input placeholder="请输入任务标题" />
                </ta-form-item>
                <ta-form-item label="颁布日期"
                              fieldDecoratorId="publishDate"
                              class="spilwid3"
                              :labelCol="{ span: 6 }"
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
                     icon="plus"
                     @click="publish">发布大排查任务</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :customRow="fnCustomRow"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="publishDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="taskStartDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="taskEndDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <span slot="delState"
                slot-scope="a, b, c">
            <span :class="a==Enum.INVESTIGATE_TASK_STATE.ZF?'com_reject':(a==Enum.INVESTIGATE_TASK_STATE.SX?'com_adopt':'com_tobeaudited')">{{ a==Enum.INVESTIGATE_TASK_STATE.ZF?'作废':(a==Enum.INVESTIGATE_TASK_STATE.SX?'生效':'待发布')}}</span>
          </span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee"
                  v-if="obj.taskState==Enum.INVESTIGATE_TASK_STATE.SX||obj.taskState==Enum.INVESTIGATE_TASK_STATE.ZF"
                  @click="look(obj)">查看</span>
            <span class="com_textedit"
                  v-if="obj.taskState==Enum.INVESTIGATE_TASK_STATE.DFB"
                  @click="edit(obj)">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           v-if="obj.taskState==Enum.INVESTIGATE_TASK_STATE.DFB"
                           @confirm="deletes(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <ta-popconfirm title="确定作废吗?"
                           v-if="obj.taskState==Enum.INVESTIGATE_TASK_STATE.SX"
                           @confirm="toVoid(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textedit">作废</span>
            </ta-popconfirm>
          </div>
        </ta-table>

      </div>
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
    title: '任务文号',
    dataIndex: 'taskFileNo',
    width: '20%'
  },
  {
    title: '任务标题',
    width: '20%',
    dataIndex: 'taskTitle'
  },
  {
    title: '颁布机关',
    dataIndex: 'publishDeptName',
    width: '20%'
  },
  {
    title: '颁布日期',
    width: '20%',
    dataIndex: 'publishDate',
    scopedSlots: { customRender: 'publishDate' }
  },
  {
    title: '任务开始日期',
    dataIndex: 'taskStartDate',
    width: '20%',
    scopedSlots: { customRender: 'taskStartDate' }
  },
  {
    title: '任务结束日期',
    width: '20%',
    dataIndex: 'taskEndDate',
    scopedSlots: { customRender: 'taskEndDate' }
  },
  {
    title: '任务状态',
    width: '20%',
    dataIndex: 'taskState',
    scopedSlots: { customRender: 'delState' }
    // collectionType: 'INVESTIGATE_TASK_STATE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      issearch: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/specialInvestigateTask/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',

      taskStateList: [] // 任务状态的字典数据

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
      this.getMenu('INVESTIGATE_TASK_STATE', 'taskStateList') // 任务状态字典数据
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
    // 发布大排查任务
    publish () {
      this.$router.push({
        name: 'releaseBigTroubleshootingTasks',
        query: { flag: 'add' }
      })
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'releaseBigTroubleshootingTasks',
        query: { flag: 'edit', id: e.id }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'releaseBigTroubleshootingTasks',
        query: { flag: 'look', id: e.id }
      })
    },
    // 生效
    takeEffect (e) {
      this.post('/specialInvestigateTask/updateTaskStateById', { id: e.id, taskState: this.Enum.INVESTIGATE_TASK_STATE.SX }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已生效')
          this.handleSubmit()
        }
      })
    },
    // 作废
    toVoid (e) {
      this.post('/specialInvestigateTask/updateTaskStateById', { id: e.id, taskState: this.Enum.INVESTIGATE_TASK_STATE.ZF }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已作废')
          this.handleSubmit()
        }
      })
    },
    // 删除
    deletes (e) {
      this.post('/specialInvestigateTask/updateDelStateById', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已删除')
          this.handleSubmit()
        }
      })
    },
    // 取消删除
    cancel () {

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
