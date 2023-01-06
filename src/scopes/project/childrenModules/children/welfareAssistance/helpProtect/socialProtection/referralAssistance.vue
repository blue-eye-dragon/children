<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <ta-form-item label="性别"
                          fieldDecoratorId="sex"
                          class="spilwid"
                          :labelCol="{ span: 9 }"
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
            <!-- <ta-form-item label="身份证号"
                        fieldDecoratorId="idCard"
                        class="spilwid"
                        :labelCol="{span:6}"
                        :wrapperCol="{span:18}">
            <ta-input placeholder="请输入证件号码" />
          </ta-form-item>
          <Health fileldName='healthConditionDatas'
                  class="spilwid"
                  :clearPlaceHolder="true"
                  :isRequire="false"
                  :heathmodel="heathModel"
                  @setheath="setHeaths"></Health> -->
            <ta-form-item label="帮扶状态"
                          fieldDecoratorId="helpingState"
                          class="spilwid"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-select allowClear
                         placeholder="请选择帮扶状态">
                <ta-select-option key="all"
                                  value>全部</ta-select-option>
                <ta-select-option v-for="item in helpingStateList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>

              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn"
             v-if="tag">
          <ta-button @click="returns"
                     icon="rollback">返回</ta-button>
        </div>
        <div style="margin-bottom: 16px;"
             v-else></div>

        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="birth"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="duration"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="helpingState"
                    slot-scope="a, b, c">
            <span v-if="b.helpingState==1"
                  class="com_tobesubmitted">{{'待转介帮扶'}}</span>
            <span v-if="b.helpingState==2"
                  class="com_inaudit">{{'正在帮扶'}}</span>
            <span v-if="b.helpingState==3"
                  class="com_adopt">{{'帮扶结束'}}</span>
          </template>
          <template slot="createTime"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span @click="help(obj)"
                  v-if="obj.helpingState=='1'"
                  class="com_publish">转介帮扶</span>
            <span @click="look(obj)"
                  class="com_textsee"
                  v-else>查看</span>
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
    width: '20%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    width: '18%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '20%',
    dataIndex: 'birth',
    align: 'center',
    scopedSlots: { customRender: 'birth' }
  },
  // {
  //   title: '身份证号',
  //   width: '12%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '帮扶状态',
    width: '20%',
    align: 'center',
    dataIndex: 'helpingState',
    // collectionType: 'SUPPORTSTATE'
    scopedSlots: { customRender: 'helpingState' }
  },
  {
    title: '健康状况',
    width: '22%',
    dataIndex: 'healthCondition',
    collectionType: 'HEALTH'
  },
  {
    title: '帮扶日期',
    width: '20%',
    align: 'center',
    dataIndex: 'registrationDate', // registrationDate
    scopedSlots: { customRender: 'createTime' }
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
        mixGetDataListURL: '/juvenilesHelp/list' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      heathModel: [],
      tag: false, // 判断是否从其他页面跳转过来

      sexList: [], // 性别字典数据
      healthConditionList: [], // 健康状况数据字典
      helpingStateList: [] // 帮扶状态字典数据

    }
  },
  activated () {
    this.initdatas()
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 初始化数据
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
    // 帮扶情况落实催办跳转至此
    initdatas () {
      this.heathModel = []
      this.tag = false
      this.searchForm.resetFields()
      let objs = this.$route.query.objs ? JSON.parse(this.$route.query.objs) : null
      if (objs) {
        this.tag = true
        this.searchForm.setFieldsValue({
          name: objs.name,
          sex: objs.sex,
          idCard: objs.idCard,
          guardianshipStatus: objs.guardianshipStatus,
          healthConditionDatas: objs.heathStatus && typeof objs.heathStatus == 'string' && objs.heathStatus != ''
            ? objs.heathStatus.split(',') : []
        })
        if (objs.heathStatus && typeof objs.heathStatus == 'string' && objs.heathStatus != '') {
          this.heathModel = objs.heathStatus.split(',')
        }
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
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
    // 转介帮扶
    help (e) {
      this.$router.push({
        name: 'referralAssistanceDo',
        query: { id: e.childBaseId, flag: 'help', investId: e.dcpgId, troubleId: e.troubleId }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'referralAssistanceDo',
        query: { id: e.id, flag: 'look', investId: e.dcpgId }
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
</style>
