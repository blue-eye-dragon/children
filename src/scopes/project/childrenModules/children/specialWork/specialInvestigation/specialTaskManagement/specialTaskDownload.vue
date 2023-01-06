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
                <ta-form-item label="任务标题"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="taskTitle"
                              class="spilwid">
                  <ta-input placeholder="请输入任务标题" />
                </ta-form-item>

                <ta-form-item label="任务文号"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="taskFileNo"
                              class="spilwid">
                  <ta-input placeholder="请输入任务文号" />
                </ta-form-item>

                <ta-form-item label="颁布机关"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="publishDeptName"
                              class="spilwid">
                  <ta-input placeholder="请输入颁布机关" />
                </ta-form-item>
                <ta-form-item label="颁布日期"
                              fieldDecoratorId="publishDate"
                              class="spilwid3"
                              :labelCol="{ span:6 }"
                              :wrapperCol="{span:18}">
                  <ta-range-picker :valid-now-time="'right'" />
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
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span class="com_textsee"
                @click="look(obj)">查看</span>
          <span class="com_textedit"
                v-if="obj.isHaveAttachment=='1'"
                @click="download(obj)">附件下载</span>
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
    align: 'center',
    dataIndex: 'publishDate',
    scopedSlots: { customRender: 'publishDate' }
  },
  {
    title: '任务开始日期',
    dataIndex: 'taskStartDate',
    align: 'center',
    width: '20%',
    scopedSlots: { customRender: 'taskStartDate' }
  },
  {
    title: '任务结束日期',
    width: '20%',
    align: 'center',
    dataIndex: 'taskEndDate',
    scopedSlots: { customRender: 'taskEndDate' }
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
        mixGetDataListURL: 'specialInvestigateTask/taskDownloadQueryPageList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
  },
  methods: {
    disabledEndDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData['taskState'] = '2'
      this.changetime(formData)
      return formData
    },
    // 附件下载
    download (e) {
      const filePathVos = e.fileIds ? e.fileIds.split(',') : []
      for (let i = 0; i < filePathVos.length; i++) {
        // 此处解决window.location.href多次下载被覆盖的问题
        var elemIF = document.createElement("iframe");
        elemIF.src = window.faceConfig.basePath + '/file/getFileFromDfs/' + filePathVos[i]
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      }
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'releaseBigTroubleshootingTasks',
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
