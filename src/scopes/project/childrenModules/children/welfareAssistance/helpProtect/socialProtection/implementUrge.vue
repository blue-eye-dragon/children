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
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item>
          <Health fileldName='healthConditionDatas'
                  class="spilwid"
                  :clearPlaceHolder="true"
                  :isRequire="false"
                  :heathmodel="heathModel"
                  @setheath="setHeaths"></Health> -->
            <ta-form-item label="催办状态"
                          fieldDecoratorId="pressingState"
                          class="spilwid"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-select allowClear
                         placeholder="请选择催办状态">
                <ta-select-option key="all"
                                  value>全部</ta-select-option>
                <ta-select-option v-for="item in pressingStateList"
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
        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     @click="setTimelimit">催办时限设置</ta-button>

        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="age"
                slot-scope="text,obj">
            <span>{{getAgeByIdCard(obj)}}</span>
          </span>
          <span slot="progress"
                slot-scope="text,obj">
            <ta-progress :percent="getPercent(obj)" />
          </span>
          <span slot="overdueDuration"
                slot-scope="text,obj">
            {{getOverdueDuration(obj)}}
          </span>
          <template slot="birth"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="pressingState"
                    slot-scope="a, b, c">
            <span :class="b.pressingState=='0'?'com_tobeaudited':'com_adopt'">{{b.pressingState=='0'?'未催办':'已催办'}}</span>
          </template>
          <template slot="implementType"
                    slot-scope="a, b, c">
            <span>{{b.implementType=='1'?'调查评估':(b.implementType=='2'?'临时监护':'转介帮扶')}}</span>
          </template>
          <template slot="createTime"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span @click="toImplement(obj)"
                  class="com_polish"
                  v-if="obj.implementType=='1'&&obj.pressingState=='0'">调查评估</span>
            <span @click="toImplement(obj)"
                  class="com_relieve"
                  v-if="obj.implementType=='2'&&obj.pressingState=='0'">临时监护</span>
            <span @click="toImplement(obj)"
                  class="com_publish"
                  v-if="obj.implementType=='3'&&obj.pressingState=='0'">转介帮扶</span>
            <span @click="look(obj)"
                  v-if="obj.pressingState=='1'"
                  class="com_textsee">查看</span>
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
    <!-- 催办时限设置弹窗 -->
    <ta-modal title="催办时限设置"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
              height="315px"
              width="600px">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row>
          <ta-col :span="24">
            <AddressComponent :addressmodel="addressmodel"
                              :msg="'区域'"
                              :labelwidth="{label:8,wrapper:16}"
                              fileldName='addressDatas'
                              @setaddress="setaddress"
                              :disabled="true"></AddressComponent>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="调查评估办理时长"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :fieldDecoratorOptions="verificationRules('调查评估办理时长',30)"
                          fieldDecoratorId="lengthOfTimeForInvest">
              <ta-input-group compact>
                <ta-auto-complete placeholder="请输入调查评估办理时长"
                                  style="width: 75%;"
                                  v-model="value1"
                                  :oninput="value1=value1?value1.replace(/[^\d]/g,''):null" />
                <ta-select defaultValue="2"
                           v-model="unitForInvest"
                           style="width: 25%;">
                  <ta-select-option value="2">月</ta-select-option>
                  <ta-select-option value="1">天</ta-select-option>
                </ta-select>
              </ta-input-group>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="转介帮扶办理时长"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :fieldDecoratorOptions="verificationRules('转介帮扶办理时长',30)"
                          fieldDecoratorId="lengthOfTimeForHelping">
              <ta-input-group compact>
                <ta-auto-complete placeholder="请输入转介帮扶办理时长"
                                  style="width: 75%;"
                                  v-model="value2"
                                  :oninput="value2=value2?value2.replace(/[^\d]/g,''):null" />
                <ta-select defaultValue="2"
                           v-model="unitForHelping"
                           style="width: 25%;">
                  <ta-select-option value="2">月</ta-select-option>
                  <ta-select-option value="1">天</ta-select-option>
                </ta-select>
              </ta-input-group>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="临时监护办理时长"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :fieldDecoratorOptions="verificationRules('临时监护办理时长',30)"
                          fieldDecoratorId="lengthOfTimeForTemporary">
              <ta-input-group compact>
                <ta-auto-complete placeholder="请输入临时监护办理时长"
                                  style="width: 75%;"
                                  v-model="value3"
                                  :oninput="value3=value3?value3.replace(/[^\d]/g,''):null" />
                <ta-select defaultValue="2"
                           v-model="unitForTemporary"
                           style="width: 25%;">
                  <ta-select-option value="2">月</ta-select-option>
                  <ta-select-option value="1">天</ta-select-option>
                </ta-select>
              </ta-input-group>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </ta-modal>
  </div>
</template>

<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
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
    width: '13%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    width: '10%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '10%',
    align: 'center',
    dataIndex: 'birth',
    scopedSlots: { customRender: 'birth' }
  },
  //   {
  //     title: '年龄',
  //     width: '9%',
  //     dataIndex: 'age',
  //     scopedSlots: { customRender: 'age' }
  //   },
  // {
  //   title: '身份证号',
  //   width: '13%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '催办事项',
    width: '10%',
    align: 'center',
    dataIndex: 'implementType',
    scopedSlots: { customRender: 'implementType' }
  },
  {
    title: '催办状态',
    width: '9%',
    align: 'center',
    dataIndex: 'pressingState',
    scopedSlots: { customRender: 'pressingState' }
    // collectionType: 'PRESSINGSTATE'
  },
  //   {
  //     title: '帮扶进度',
  //     width: '10%',
  //     dataIndex: 'progress',
  //     scopedSlots: { customRender: 'progress' }
  //   },
  {
    title: '超期时长(天)',
    width: '12%',
    align: 'center',
    dataIndex: 'overdueDuration',
    scopedSlots: { customRender: 'overdueDuration' }
  },
  {
    title: '健康状况',
    width: '12%',
    dataIndex: 'healthCondition',
    collectionType: 'HEALTH'
  },
  {
    title: '登记日期',
    width: '10%',
    align: 'center',
    dataIndex: 'registrationDate',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,

    overflowTooltip: false,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    AddressComponent,
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
        mixGetDataListURL: '/implementUrge/list' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      heathModel: [],
      addressmodel: [],
      visible: false, // 催办时限设置显隐
      value1: null, // 调查评估输入框
      unitForInvest: '2', // 调查评估选择框
      value2: null, // 转介帮扶输入框
      unitForHelping: '2', // 转介帮扶选择框
      value3: null, // 临时监护输入框
      unitForTemporary: '2', // 临时监护选择框

      sexList: [], // 性别字典数据
      healthConditionList: [], // 健康状况数据字典
      pressingStateList: [], // 催办状态字典数据

      id: 'id', // 催办时限列表id
      flag: 'add' // 区分催办时限操作是新增add还是编辑edit

    }
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('HEALTH', 'healthConditionList') // 获取健康状况数据字典
      this.getMenu('PRESSINGSTATE', 'pressingStateList') // 获取催办状态数据字典
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
    // 获取帮扶进度
    getPercent (obj) {
      if (obj.helpingState == '1') { // 待调查审核
        return 0
      }
      if (obj.helpingState == '2') { // 待转介帮扶
        if (obj.isTempCustody == '1') { // 进行临时监护
          if (obj.guardianshipStatus == '0') { // 根据监护状态分为待临时监护
            return 20
          }
          if (obj.guardianshipStatus == '1') { // 正在临时监护
            return 40
          }
          if (obj.guardianshipStatus == '2') { // 临时监护完成
            return 60
          }
        }
        return 60
      }
      if (obj.helpingState == '3') { // 正在转介帮扶
        return 80
      }
      if (obj.helpingState == '4') { // 帮扶结束
        return 100
      }
    },
    // 获取列表中的超期时长（最终日期finalDate到当前日期的时间）
    getOverdueDuration (e) {
      var time = moment(e.finalDate).format('YYYY-MM-DD')
      var mydate = moment(moment(new Date()).format('YYYY-MM-DD'))
      return mydate.diff(time, 'day')
    },
    // 地址传值
    setaddress () {
      this.form.setFieldsValue({
        addressDatas: this.addressmodel
      })
    },
    // 催办时限设置
    setTimelimit () {
      this.visible = true

      this.post('limitTime/list', {}).then(async (res) => {
        if (res.serviceSuccess) {
          let { list } = res.data.pageBean || []
          // 赋值区域默认值
          const { areaIdPath } = window.parent.indexTool.getUserInfo()
          const areaIdArr = areaIdPath?.split('/') || []
          areaIdArr.length > 1 && areaIdArr.shift()
          this.addressmodel = areaIdArr
          this.flag = 'add'
          if (list.length > 0) { // 编辑
            this.id = list[0].id
            await this.post('/limitTime/queryById', { id: list[0].id }).then((res) => {
              if (res.serviceSuccess) {
                let { data } = res.data
                if (data) {
                  this.flag = 'edit'
                  this.value1 = data.lengthOfTimeForInvest
                  this.value2 = data.lengthOfTimeForHelping
                  this.value3 = data.lengthOfTimeForTemporary
                  this.unitForInvest = data.unitForInvest
                  this.unitForHelping = data.unitForHelping
                  this.unitForTemporary = data.unitForTemporary
                }
              }
            })
          }
        }
      })
    },
    // 催办时限设置-确定
    handleOk () {
      let _self = this
      this.form.setFieldsValue({
        lengthOfTimeForInvest: this.value1,
        lengthOfTimeForHelping: this.value2,
        lengthOfTimeForTemporary: this.value3
      })
      _self.form.validateFields((err, values) => {
        if (!err) {
          let url = this.flag == 'add' ? 'limitTime/save' : 'limitTime/update'
          let formData = _self.form.getFieldsValue()
          formData['id'] = this.flag == 'add' ? '' : this.id
          formData['limitTimeProvince'] = formData.addressDatas[0]
          formData['limitTimeCity'] = formData.addressDatas[1]
          formData['limitTimeCounty'] = formData.addressDatas[2]
          formData['unitForInvest'] = _self.unitForInvest
          formData['unitForHelping'] = _self.unitForHelping
          formData['unitForTemporary'] = _self.unitForTemporary
          delete formData.addressDatas
          _self.post(url, formData).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('数据提交成功！')
              this.value1 = this.value2 = this.value3 = this.unitForInvest = this.unitForHelping = this.unitForTemporary = ''
              _self.visible = false
            }
          })
        }
      })
    },
    // 催办时限设置-取消
    handleCancel () {
      this.form.resetFields()
      this.addressmodel = []
      this.value1 = null
      this.unitForInvest = null
      this.value2 = null
      this.unitForHelping = null
      this.value3 = null
      this.unitForTemporary = null
      this.visible = false
    },
    // 根据身份证号获取年龄
    getAgeByIdCard (e) {
      // 获取年龄
      let UUserCard = e.idCard
      var myDate = new Date()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
      if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
        age++
      }
      return age
    },
    // 健康状况传值
    setHeaths () {
      this.searchForm.setFieldsValue({
        healthConditionDatas: this.heathModel
      })
    },
    // 落实帮扶措施
    toImplement (e) {
      if (e.implementType == '1') { // 调查评估
        this.$router.push({
          name: 'investigateEvaluation',
          query: { jump: '1', objs: JSON.stringify(e) }
        })
      }
      if (e.implementType == '2') { // 临时监护
        this.$router.push({
          name: 'temporaryCustody',
          query: { objs: JSON.stringify(e) }
        })
      }
      if (e.implementType == '3') { // 转介帮扶
        this.$router.push({
          name: 'referralAssistance',
          query: { objs: JSON.stringify(e) }
        })
      }
    },
    // 查看
    look (e) {
      if (e.implementType == '1') { // 调查评估
        this.$router.push({
          name: 'investigateEvaluationDo',
          query: { id: e.id, flag: 'look_imp', childBaseId: e.cid }
        })
      }
      if (e.implementType == '2') { // 临时监护
        this.$router.push({
          name: 'temporaryCustodyDo',
          query: { id: e.cid, flag: 'look_imp' }
        })
      }
      if (e.implementType == '3') { // 转介帮扶
        this.$router.push({
          name: 'referralAssistanceDo',
          query: { id: e.cid, flag: 'look_imp' }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>
