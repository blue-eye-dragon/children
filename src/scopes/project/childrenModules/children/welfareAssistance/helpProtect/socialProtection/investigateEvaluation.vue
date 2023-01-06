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
                <ta-form-item label="姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>

                <!-- <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        class="spilwid"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-input placeholder="请输入证件号码" />
          </ta-form-item> -->
                <!-- <Health fileldName='healthConditionDatas'
                  class="spilwid"
                  :clearPlaceHolder="true"
                  :isRequire="false"
                  :heathmodel="heathModel"
                  @setheath="setHeaths"></Health> -->
                <ta-form-item label="调查状态"
                              fieldDecoratorId="investigationStatus"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择调查状态">
                    <ta-select-option key="all"
                                      value>全部</ta-select-option>
                    <ta-select-option key="1"
                                      value="1">待调查评估</ta-select-option>
                    <ta-select-option key="2"
                                      value="2">已调查评估</ta-select-option>
                    <!-- <ta-select-option v-for="item in helpingStateList"
                                :key="item.value"
                                :value="item.value">{{item.label}}</ta-select-option>registrationDate -->
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option key="all"
                                      value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="调查日期"
                              fieldDecoratorId="registrationDate"
                              class="spilwid3"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
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
        <div class="operateBtn"
             v-if="jump=='1'">
          <ta-button icon="rollback"
                     @click="back">返回</ta-button>

        </div>
        <div v-else
             style="margin-bottom: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="investigationStatus"
                slot-scope="a, b, c">
            <span :class="b.investigationStatus=='2'?'com_evaluated':'com_tobesubmitted'">{{ b.investigationStatus=='2'?'已调查评估':'待调查评估' }}</span>
          </span>
          <template slot="birth"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="createTime"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span @click="investigateEvaluate(obj)"
                  v-if="obj.investigationStatus=='1'||!obj.investigationStatus"
                  class="com_polish">调查评估</span>
            <span @click="look(obj)"
                  v-else
                  class="com_textsee">查看</span>
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
                       ref="gridPager" />

      </div>
    </ta-border-layout>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import Health from '@/scopes/project/common/components/health'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: '20%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '18%'
  },
  {
    title: '出生日期',
    dataIndex: 'birth',
    align: 'center',
    scopedSlots: { customRender: 'birth' },
    width: '20%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '12%'
  // },
  {
    title: '调查状态',
    dataIndex: 'investigationStatus',
    align: 'center',
    scopedSlots: { customRender: 'investigationStatus' },
    width: '20%'
  },
  {
    title: '健康状况',
    dataIndex: 'healthCondition',
    align: 'center',
    collectionType: 'HEALTH',
    width: '23%'
  },
  {
    title: '调查日期',
    dataIndex: 'investigationDate', // investigationDate
    align: 'center',
    // scopedSlots: { customRender: 'createTime' },
    width: '20%'
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
  components: {
    Health
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/investigationAndEvaluation/list' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixDataList1: [
        {
          name: '操作'
        }
      ],
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      heathModel: [],
      tag: false, // 判断是否从其他页面跳转过来
      sexList: [], // 性别字典数据
      healthConditionList: [], // 健康状况数据字典
      helpingStateList: [], // 帮扶状态字典数据
      isactive: false,
      paramsdata: {},
      jump: '',
      issearch: false
    }
  },
  activated () {
    // if (this.$route.params.obj) {
    //   console.log(this.$route.params.obj.name)
    //   this.isactive = true
    //   this.paramsdata = this.$route.params.obj
    // } else {
    //   this.isactive = false
    // }
    this.issearch = false

    this.setHeight('one', 'oneout', !this.issearch, this)
    this.initdatas()
    this.jump = this.$route.query.jump ? this.$route.query.jump : null
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    back () { this.$router.go(-1) },
    // 读取列表 分页形式
    handleSubmit () {
      this.page = 1
      this.size = 10
      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      let ref = this.mixPageRef
      this.$nextTick(() => {
        this.$refs[ref].loadData(data => {
          // if (this.isactive) {
          //   let obj = this.mixDataList[this.mixDataList.length - 1]
          //   obj = { ...obj, ...this.paramsdata }
          //   console.log(obj)
          //   this.mixDataList.unshift(obj)
          // }
        }, err => { })
      })
    },
    goadd () {
      this.$router.push({
        name: 'leftbehindchildren'
      })
    },
    // 获取字典数据
    getMenuDatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('HEALTH', 'healthConditionList') // 获取健康状况数据字典
      this.getMenu('SUPPORTSTATE', 'helpingStateList') // 获取帮扶状态字典数据
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
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 帮扶情况落实催办跳转至此
    initdatas () {
      this.tag = false
      this.heathModel = []
      this.searchForm.resetFields()
      let objs = this.$route.query.objs ? JSON.parse(this.$route.query.objs) : null
      if (objs) {
        this.tag = true
        this.searchForm.setFieldsValue({
          name: objs.name,
          sex: objs.sex,
          idCard: objs.scIdCard,
          investigationStatus: objs.helpingState,
          healthConditionDatas: objs.heathStatus && typeof objs.heathStatus == 'string' && objs.heathStatus != '' ? objs.heathStatus.split(',') : []
        })
        if (objs.heathStatus && typeof objs.heathStatus == 'string' && objs.heathStatus != '') {
          this.heathModel = objs.heathStatus.split(',')
        }
      }
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      if (formData.healthConditionDatas && formData.healthConditionDatas.length > 0) {
        formData['healthCondition'] = formData.healthConditionDatas.slice(-1).toString()
        delete formData.healthConditionDatas
      }
      this.changetime(formData)
      return formData
    },
    // 健康状况传值
    setHeaths () {
      this.searchForm.setFieldsValue({
        healthConditionDatas: this.heathModel
      })
    },
    // 调查评估
    investigateEvaluate (e) {
      this.$router.push({
        name: 'investigateEvaluationDo',
        query: { id: e.childBaseId, flag: 'investigate', childBaseId: e.childBaseId, troubleId: e.troubleId }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'investigateEvaluationDo',
        query: { id: e.id, flag: 'look', childBaseId: e.childBaseId }
      })
    },
    // 返回
    returns () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>
