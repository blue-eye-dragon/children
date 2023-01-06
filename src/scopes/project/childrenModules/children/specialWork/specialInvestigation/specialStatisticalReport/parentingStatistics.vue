 <template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(form)=>{this.form = form}">
          <areaQuery :msg="'区域'"
                     class="spilwid"
                     :fileldName="'area'"
                     :labelCol="{span:9}"
                     :wrapperCol="{span:15}"
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
          <ta-form-item label="排查类型"
                        fieldDecoratorId="checkType"
                        class="spilwid"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select allowClear
                       placeholder="请选择排查类型">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="item in resultTypeList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>
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
      </div>
      <div class="echarttitle">散居儿童保障、收养工作自查和检查结果汇总表</div>
      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns"
                :showOverflowTooltip="true"
                :dataSource="mixDataList">
      </ta-table>

    </ta-border-layout>
  </div>
</template>

<script>
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'

export default {
  components: {
    AreaQuery
  },
  data () {
    const tableColumns = [
      {
        title: '',
        dataIndex: 'name',
        width: '15%',
        customRender: (text, record, index) => {
          let obj = {
            children: text,
            attrs: {}
          }
          if (record.rowSpan || record.rowSpan == 0) {
            obj.attrs.rowSpan = record.rowSpan
          }
          return obj
        }
      },
      {
        title: '被检查单位',
        dataIndex: 'checkedOrgName',
        width: 150,
        customRender: (text, record, index) => {
          let obj = {
            children: text,
            attrs: {}
          }
          // 合并列
          if (record.finish) {
            obj.attrs.colSpan = 7
            obj.attrs.class = 'hb'
          }
          return obj
        }
      },
      {
        title: '专项排查任务',
        dataIndex: 'taskTitle',
        width: 150,
        customRender: (text, record, index) => {
          let obj = {
            children: text,
            attrs: {}
          }
          // 合并列
          if (record.finish) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      },
      {
        title: '排查类型',
        dataIndex: 'checkType',
        width: 150,
        customRender: (text, record, index) => {
          let obj = {
            children: this.CollectionLabel('RESULT_TYPE', text),
            attrs: {}
          }
          // 合并列
          if (record.finish) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      },
      {
        title: '检查情况',
        children: [
          {
            title: 'A项数量',
            width: 100,
            align: 'center',
            dataIndex: 'itemANum',
            customRender: (text, record, index) => {
              let obj = {
                children: text,
                attrs: {}
              }
              // 合并列
              if (record.finish) {
                obj.attrs.colSpan = 0
              }
              return obj
            }
          },
          {
            title: 'B项数量',
            width: 100,
            align: 'center',
            dataIndex: 'itemBNum',
            customRender: (text, record, index) => {
              let obj = {
                children: text,
                attrs: {}
              }
              // 合并列
              if (record.finish) {
                obj.attrs.colSpan = 0
              }
              return obj
            }
          },
          {
            title: 'C项数量',
            width: 100,
            align: 'center',
            dataIndex: 'itemCNum',
            customRender: (text, record, index) => {
              let obj = {
                children: text,
                attrs: {}
              }
              // 合并列
              if (record.finish) {
                obj.attrs.colSpan = 0
              }
              return obj
            }
          }]

      },
      {
        title: '检查结果',
        dataIndex: 'checkResult',
        width: 150,
        customRender: (text, record, index) => {
          let obj = {
            children: text == 1 ? '整改' : '提升',
            attrs: {}
          }
          // 合并列
          if (record.finish) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      }
    ]
    return {
      tableColumns,
      mixDataList: [],

      taskIdList: [], // 专项排查任务的字典数据
      resultTypeList: [] // 专项排查任务的字典数据

    }
  },
  activated () {
    this.getlist()
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
      this.getMenu('RESULT_TYPE', 'resultTypeList') // 排查类型字典数据
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
    // 重置
    resetFrom () {
      this.form.resetFields()
      this.getlist()
    },
    // 读取列表 无分页形式
    async getlist () {
      let _self = this
      let formData = this.form ? this.form.getFieldsValue() : {}
      if (formData.area && formData.area.length > 0) {
        formData['area'] = formData.area.slice(-1).toString()
      }
      let params = {
        ...formData
      }
      let res = await this.post('diasporaChildRearingStatistics/queryCheckResult', params)
      if (res.serviceSuccess) {
        let { list } = res.data.data.checkResultList || []
        for (var i = 0; i < list.length; i++) {
          if (i == 0) {
            list[i].rowSpan = list.length
          } else {
            list[i].rowSpan = 0
          }
          list[i].name = '民政部门'
        }
        let text = `
        被检查单位总个数（${res.data.data.checkedorgnum || 0}）个，
        检查结果中，需要整改的单位有（${res.data.data.zg || 0}）个；需要提升的单位有（${res.data.data.ts || 0}）个。
        `
        list.push({
          checkedOrgName: text,
          taskTitle: text,
          checkType: text,
          itemANum: text,
          itemBNum: text,
          itemCNum: text,
          checkResult: text,
          name: '合计',
          finish: 1
        })
        this.mixDataList = list
      }
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
/deep/ .hb div {
  width: 100% !important;
}
</style>
