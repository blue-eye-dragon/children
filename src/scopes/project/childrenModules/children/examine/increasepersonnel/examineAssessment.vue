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
                <ta-form-item label="儿童姓名"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <!--<ta-form-item label="性别"-->
                <!--:labelCol="{span:7}"-->
                <!--:wrapperCol="{span:17}"-->
                <!--class="spilwid"-->
                <!--fieldDecoratorId="sex">-->
                <!--<ta-select allowClear-->
                <!--placeholder="请选择性别">-->
                <!--<ta-select-option value>全部</ta-select-option>-->
                <!--<ta-select-option v-for="item in sexList"-->
                <!--:key="item.value"-->
                <!--:value="item.value">{{item.label}}</ta-select-option>-->
                <!--</ta-select>-->
                <!--</ta-form-item>-->

                <ta-form-item label="儿童类别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType">
                  <ta-select allowClear
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in childTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              class="spilwid3"
                              fieldDecoratorId="birthday">
                  <ta-range-picker />
                </ta-form-item>

                <ta-form-item label="增员日期"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              class="spilwid3"
                              fieldDecoratorId="applyDay">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             style="    width: 109px;"
                             @click="advancedquery">
                    高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>

              </div>
            </div>
          </ta-form>

        </div>
        <div style="margin-top: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="mixDataList"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>

          </span>
          <template slot="name"
                    slot-scope="a, b, c">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>

          <div slot="action"
               slot-scope="a,b,c"
               class="btnlist">
            <span @click="assessmentOrLook(b)"
                  :class="b.assessmentStatus=='1'?'com_textsee':'com_audit'">{{b.assessmentStatusLabel}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       @change="pagechange"
                       :params="userPageParams"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '18%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '20%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '23%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '增员日期',
    dataIndex: 'registerDate',
    align: 'center',
    width: '20%',
    scopedSlots: { customRender: 'registerDate' }
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
  name: 'exam',
  data () {
    return {
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/addChildAssessmentApi/pageAddChildAssessment' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixPageRef: 'gridPager', // 用于获取分页ref值

      tableColumns,
      page: 1,
      size: 10,

      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据

      isExpand: false,
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      // 获取儿童类别字典
      this.getMenu(this.childTypeCode, 'childTypeList') // 获取儿童类别字典数据
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
    // 评估、查看
    assessmentOrLook (e) {
      let flag = 'assessment'
      let assessmentList = {}
      if (e.assessmentStatus == '1') { // 查看
        flag = 'look'
        this.post('/addChildAssessmentApi/detailChildAssessment', { assessmentId: e.assessmentId }).then((res) => {
          if (res.serviceSuccess) {
            assessmentList = res.data.data
            this.$router.push({
              name: 'assessmentFrom',
              query: { reportList: JSON.stringify(e), assessmentList: JSON.stringify(assessmentList), flag: flag }
            })
          }
        })
      } else {
        this.$router.push({
          name: 'assessmentFrom',
          query: { reportList: JSON.stringify(e), assessmentList: JSON.stringify(assessmentList), flag: flag }
        })
      }
    },
    // 点击姓名查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }

  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
