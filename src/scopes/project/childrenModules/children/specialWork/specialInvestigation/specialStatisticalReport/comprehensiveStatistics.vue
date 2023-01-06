 <template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(form)=>{this.form = form}">
          <areaQuery :msg="'区域'"
                     :labelCol="{span:9}"
                     :wrapperCol="{span:15}"
                     :fileldName="'area'"
                     class="spilwid area"
                     :ishide="false"></areaQuery>
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
                                :value="item.id">
                <ta-tooltip placement="topLeft">
                  <template slot='title'>
                    {{item.taskTitle}}
                  </template>
                  {{item.taskTitle}}
                </ta-tooltip>
              </ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label>
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="getlist">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>
          </ta-form-item>
        </ta-form>
        <div>
        </div>
        <div class="echarttitle">儿童福利专项排查结统计表</div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :customRow="fnCustomRow"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="bjzc"
                slot-scope="val, obj, index">
            <a @click="bjzcClick(obj)"
               v-if="index!=0">{{ val }}</a>
            <span v-else>{{ val }}</span>
          </span>
          <span slot="sjjc"
                slot-scope="val, obj, index">
            <a @click="sjjcClick(obj)"
               v-if="index!=0">{{ val }}</a>
            <span v-else>{{ val }}</span>
          </span>
          <span slot="hg"
                slot-scope="val, obj, index">
            <a @click="hgClick(obj)"
               v-if="index!=0">{{ val }}</a>
            <span v-else>{{ val }}</span>
          </span>
          <span slot="zg"
                slot-scope="val, obj, index">
            <a @click="zgClick(obj)"
               v-if="index!=0">{{ val }}</a>
            <span v-else>{{ val }}</span>
          </span>
          <span slot="passRate"
                slot-scope="a, b, c">
            <span>{{a?a+'%':'0%'}}</span>
          </span>
        </ta-table>

      </div>
      <div class="echarts">
        <div style="margin-left:20px">
          <div class="echarttitle">儿童福利专项排查结果柱状图</div>
          <div class="circularout">
            <div class="ecs">
              <ta-e-charts chartsType="histogram"
                           :data="childWelfareData"
                           :data-empty="dataEmpty"
                           :colors="colors"
                           :xAxis="xAxis"
                           :grid="grid"
                           :tooltip="tooltip"
                           height='340px'
                           :extend="parentdataExtend"
                           :yAxis="yAxis"
                           :legend-visible="true" />
            </div>
          </div>
        </div>
      </div>
    </ta-border-layout>
    <ta-modal title="详情"
              :visible="visible"
              @cancel="handleCancel"
              width="90%">
      <div slot="footer">
        <ta-button @click="handleCancel">返回</ta-button>
      </div>
      <ta-table class="tables"
                :columns="tableColumns2"
                :showOverflowTooltip="true"
                :dataSource="mixDataList2"
                bordered>
      </ta-table>
    </ta-modal>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
import '@yh/ta404-ui/es/echarts/lib/style.css'
import TaECharts from '@yh/ta404-ui/es/echarts/src/TaECharts'
const tableColumns = [
  {
    title: '专项排查任务',
    dataIndex: 'taskTitle',
    width: 150
  },
  {
    title: '被检查单位数量',
    dataIndex: 'checkedOrgTotal',
    width: 150
  },
  {
    title: '排查类型',
    children: [
      {
        title: '本级自查单位数量',
        width: 100,
        align: 'center',
        dataIndex: 'bjzc',
        scopedSlots: { customRender: 'bjzc' }
      },
      {
        title: '上级检查单位数量',
        width: 100,
        align: 'center',
        dataIndex: 'sjjc',
        scopedSlots: { customRender: 'sjjc' }
      }]
  },
  {
    title: '检查结果',
    children: [
      {
        title: '检查合格单位数量',
        width: 100,
        align: 'center',
        dataIndex: 'hg',
        scopedSlots: { customRender: 'hg' }
      },
      {
        title: '需要整改单位数量',
        width: 100,
        align: 'center',
        dataIndex: 'zg',
        scopedSlots: { customRender: 'zg' }
      }]
  },
  {
    title: '检查合格率',
    dataIndex: 'passRate',
    width: 150,
    scopedSlots: { customRender: 'passRate' }
  }
]
const tableColumns2 = [
  {
    title: '被检查单位',
    dataIndex: 'checkedOrgName',
    width: 150
  },
  {
    title: '专项排查任务',
    dataIndex: 'taskTitle',
    width: 150
  },
  {
    title: '排查类型',
    dataIndex: 'checkType',
    width: 150,
    collectionType: 'RESULT_TYPE'
  },
  {
    title: '检查情况',
    children: [
      {
        title: 'A项数量',
        width: 100,
        align: 'center',
        dataIndex: 'itemANum'
      },
      {
        title: 'B项数量',
        width: 100,
        align: 'center',
        dataIndex: 'itemBNum'
      },
      {
        title: 'C项数量',
        width: 100,
        align: 'center',
        dataIndex: 'itemCNum'
      }]
  },
  {
    title: '检查结果',
    dataIndex: 'checkResult',
    width: 150,
    customRender: (text, record, index) => {
      const obj = {
        children: text == '1' ? '整改' : '提升',
        attrs: {}
      }
      return obj
    }
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    TaECharts
  },
  data () {
    return {

      // 设置属性
      mixListOptions: {
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: 'specialInvestigateComprehenStatistics/querySpecialInvestigateResult' // 数据列表接口，API地址
      },
      tableColumns,
      mixDataList: [],

      tableColumns2, // 弹窗表头
      mixDataList2: [], // 弹窗数据

      taskIdList: [], // 专项排查任务的字典数据
      visible: false, // 弹窗显隐
      area: '', // 查询条件选择的区划数据

      // echarts 图表配置
      dataEmpty: false,
      colors: ['#FF8000', '#00CACA'],
      xAxis: [
        {
          data: []
        }
      ],
      yAxis: [
        {
          name: '数量（个）',
          axisTick: {
            show: false
          },
          minInterval: 1,
          nameTextStyle: {
            padding: [0, 0, 0, 20]
          }
        }
      ],
      grid: { x: '5%', y: '15%' },
      tooltip: {
        formatter: function (params) {
          var res = '<div><p>' + params.seriesName + '</br>' + '数量：' + params.data + '</p></div>'
          return res
        }
      },
      parentdataExtend: {
        barWidth: 20
      },
      childWelfareData: {
        columns: ['name', '本级自查', '上级检查'],
        rows: []
      }

    }
  },
  activated () {
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
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
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 读取列表 无分页形式
    async getlist () {
      const formData = this.form ? this.form.getFieldsValue() : {}
      this.area = ''
      if (formData.area && formData.area.length > 0) {
        formData.area = formData.area.slice(-1).toString()
        this.area = formData.area
      }
      this.changetime(formData)
      const params = {
        ...formData
      }
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.mixDataList = res.data.pageBean.list
      }
    },
    // 重置
    resetFrom () {
      this.form.resetFields()
      this.getlist()
    },
    // 本级自查点击事件
    bjzcClick (e) {
      const param = { taskId: e.taskId, checkType: '1', area: this.area }
      this.getModelData(param)
    },
    // 上级检查点击事件
    sjjcClick (e) {
      const param = { taskId: e.taskId, checkType: '2', area: this.area }
      this.getModelData(param)
    },
    // 合格点击事件
    hgClick (e) {
      const param = { taskId: e.taskId, checkResult: '2', area: this.area }
      this.getModelData(param)
    },
    // 整改点击事件
    zgClick (e) {
      const param = { taskId: e.taskId, checkResult: '1', area: this.area }
      this.getModelData(param)
    },
    // 弹窗数据获取
    getModelData (param) {
      this.visible = true
      this.post('specialInvestigateComprehenStatistics/queryCheckedOrgByTaskIdAndCheckTypeOrResult', param).then((res) => {
        if (res.serviceSuccess) {
          this.mixDataList2 = res.data.pageBean.list || []
        }
      })
    },
    // 弹窗关闭
    handleCancel () {
      this.visible = false
    }
  },
  watch: {
    mixDataList: {
      handler (val) {
        this.childWelfareData.rows = []
        this.xAxis = [{ data: [] }]
        if (val instanceof Array && val.length > 0) {
          for (var i = 1; i < val.length; i++) {
            this.xAxis[0].data.push(val[i].taskTitle)
          }

          this.childWelfareData.rows = JSON.parse(JSON.stringify(val.slice(1, val.length)).replace(/\"bjzc"/g, '"本级自查"').replace(/\"sjjc"/g, '"上级检查"'))
        }
      },
      deep: true
    }
  }

}
</script>
<style scoped lang="less">
.echarts {
  width: 100%;
  //   display: flex;
}
.echarttitle {
  width: 100%;
  font-size: 18px;
  height: 60px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  text-indent: 20px;
  line-height: 54px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  text-align: center;
}
.circularout {
  width: 100%;
  display: flex;
}
.ecs {
  width: 90% !important;
  margin-left: 1%;
}
</style>
