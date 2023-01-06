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
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类型"
                              fieldDecoratorId="overAgeTypeList"
                              style="width:600px"
                              :fieldDecoratorOptions="{initialValue:['1','2','3','4']}"
                              :labelCol="{ span: 4 }"
                              :wrapperCol="{span:20}">
                  <ta-checkbox-group :options="plainOptions" />

                </ta-form-item>
                <ta-form-item label="儿童类别"
                              fieldDecoratorId="childType"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              v-if="notCounty">
                  <ta-select allowClear
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in childTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              class="spilwid4"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              class="spilwid3"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="searchList('search')">查询</ta-button>
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
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel1">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
          <!-- <ta-button icon="rollback"
                     v-if="areaId!=oAreaId"
                     @click="goback">返回</ta-button> -->
        </div>
        <div style="margin-top: 16px;"></div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="operate"
                slot-scope="text, record"
                class="btnlist">
            <span class="com_relieve"
                  @click="jy(record)"> 减员 </span>
            <span v-if="record.status ==1&&isNextState&&record.bringUpType!='14'"
                  class="com_continue"
                  @click="xf(record)"> 续发 </span>

          </span>
          <template slot="name"
                    slot-scope="a,b,c">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="overAgeType"
                    slot-scope="a,b,c">
            <span v-if="a == '1'"
                  :class="getColor(a)">超龄待续发</span>
            <span v-if="a == '2'"
                  :class="getColor(a)">续发已到期</span>
            <span v-if="a == '3'"
                  :class="getColor(a)">即将超龄</span>
            <span v-if="a == '4'"
                  :class="getColor(a)">续发未到期</span>
          </template>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       @change="pagechange"
                       :dataSource.sync="mixDataList"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <div></div>
    <!-- 弹窗 -->
    <div>
      <ta-drawer :title="types == 0?'减员申请':'续发'"
                 :visible="visible"
                 :width="width"
                 :getContainer="setContainer"
                 :confirmLoading="confirmLoading"
                 @close="handleCancel"
                 :bodyStyle="{height:'auto',overflow:'auto' ,paddingBottom:'0px'}">
        <ta-form :autoFormCreate="(modelForm)=>{this.modelForm = modelForm}"
                 layout="horizontal"
                 :key="new Date().getTime()">
          <ta-col :span="24">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          :fieldDecoratorOptions="verificationRules('儿童姓名',72)">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday"
                          :require="{message:'请选择出生日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="现住址"
                          fieldDecoratorId="currentDetail">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0">
            <ta-form-item label="减员原因"
                          fieldDecoratorId="reductionType"
                          :fieldDecoratorOptions="{initialValue:  this.Enum.REDUCTIONREASON.SNSY,rules: [{ required: true,message: '请选择减员原因'}]}">
              <ta-radio-group name="radioGroup"
                              @change="getReason">
                <ta-radio :value="item.value"
                          v-for="(item,index) in reductionTypeList"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0&&type!=Enum.REDUCTIONREASON.LRCW&&type!=Enum.REDUCTIONREASON.HJQC&&type!=Enum.REDUCTIONREASON.QT">
            <ta-form-item :label="label"
                          fieldDecoratorId="businessDate"
                          :require="{message:'请选择'+label}">
              <ta-date-picker style="width: 100%;"
                              :disabled="type==Enum.REDUCTIONREASON.ETCL" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0&&type==Enum.REDUCTIONREASON.KJGS">
            <ta-form-item label="困境改善原因"
                          fieldDecoratorId="reason"
                          :fieldDecoratorOptions="verificationRules('困境改善原因',100)">
              <ta-input />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0&&type==Enum.REDUCTIONREASON.SW">
            <ta-form-item label="死亡原因"
                          fieldDecoratorId="dieReason"
                          :require="{message:'请选择死亡原因'}">
              <ta-select allowClear>
                <ta-select-option v-for="item in dieReasonList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0&&type==Enum.REDUCTIONREASON.SW">
            <ta-form-item label="死亡处理方式"
                          fieldDecoratorId="dieDeal">
              <ta-select allowClear>
                <ta-select-option v-for="item in dieDealList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0&&type==Enum.REDUCTIONREASON.QT">
            <ta-form-item label="其他原因"
                          fieldDecoratorId="reason"
                          :fieldDecoratorOptions="verificationRules('其他原因',200)">
              <ta-input />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0">
            <ta-form-item label="减员日期"
                          :require="{message:'请选择减员日期'}"
                          fieldDecoratorId="reductionDate">
              <ta-date-picker style="width: 100%;" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 0">
            <ta-form-item label="末领年月"
                          fieldDecoratorId="endTime"
                          :require="{enable:adopt,message:'请选择末领年月'}">
              <ta-month-picker style="width: 100%;"
                               :disabledDate="disabledDate" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 1">
            <ta-form-item label="超龄续发原因"
                          :fieldDecoratorId="'overAgeReason'"
                          :require="{message:'请选择超龄续发原因'}">
              <ta-select allowClear
                         @change="getReasonRadio">
                <ta-select-option v-for="item in overAgeReasonList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{message:'请选择超龄续发原因'}">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 1&&radio == Enum.OVERAGERENEWALREASON.QT">
            <ta-form-item label
                          :fieldDecoratorId="'overAgeReasonOther'"
                          style="margin-left: 25%;">
              <ta-input />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="types == 1">
            <ta-form-item label="续发截止时间"
                          :fieldDecoratorId="'superventionOverDate'"
                          :require="{message:'请选择续发截止时间'}">
              <ta-month-picker format="YYYY-MM"
                               :disabledDate="disabledSupDate"
                               style="width: 100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="备注"
                          :fieldDecoratorId="'remark'"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
              <ta-textarea :rows="4" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="附件上传"
                          fieldDecoratorId="cooperativeAgreement">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         @remove="handleRemove"
                         :data="fileData('9','fileList')"
                         :beforeUpload="beforeUpload"
                         @preview="preview"
                         @change="filechange">
                <ta-button>
                  <ta-icon type="upload" />上传文件
                </ta-button>
              </ta-upload>
              <p class="warntext">
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-col>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="handleCancel">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     @click="handleOk">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import $ from 'jquery'
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
    width: '20%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '身份证号',
  //   width: '20%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '儿童类型',
    width: '15%',
    align: 'center',
    dataIndex: 'overAgeType',
    scopedSlots: { customRender: 'overAgeType' }
  },
  {
    title: '出生日期',
    width: '15%',
    align: 'center',
    dataIndex: 'birthday'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '20%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '超龄日期',
    width: '15%',
    align: 'center',
    dataIndex: 'overAgeDate'
  },
  {
    title: '续发截止时间',
    width: '15%',
    align: 'center',
    dataIndex: 'superventionOverDate'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'operate' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      issearch: false,
      showOn: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overAgeTipApi/pageOverAgeChild' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },

      types: -1, // 减员0和续发1的标识类型
      // 续发/减员弹窗
      visible: false,
      width: '500px',
      confirmLoading: false,
      radio: '', // 超龄续发原因选择的数据
      overAgeReasonList: [], // 超龄续发原因
      reductionTypeList: [], // 减员原因字典数据
      dieReasonList: [], // 死亡原因
      dieDealList: [], // 死亡处理方式

      label: '收养日期', // 收养日期（儿童超龄日期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: this.Enum.REDUCTIONREASON.SNSY, // 减员原因选择的数据

      fileList: [],
      plainOptions: [
        {
          label: '超龄待续发',
          value: '1'
        },
        {
          label: '续发已到期',
          value: '2'
        },
        {
          label: '即将超龄',
          value: '3'
        },
        {
          label: '续发未到期',
          value: '4'
        }
      ],
      upLoadPathIds: [], // 附件上传存放的id数组
      isNextState: false,

      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      obj: {}, // 存储url中的信息
      reductionObj: {}, // 减员对象
      adopt: false, // 福利孤弃儿童养育类型为收养
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4 // 不是乡镇用户
    }
  },
  mounted () {
    this.initdatas()
  },
  activated () {
    this.obj = {}
    this.isNextState = false
    this.mixDataList = []
    const url = window.location.href
    var params = url.split('?')[1].split('&')
    params.map((item) => { this.obj[item.split('=')[0]] = item.split('=')[1] })
    if (this.obj.towork) {
      this.searchForm.setFieldsValue({ overAgeTypeList: ['1', '2', '3'] })
    }
    this.issearch = false
    this.type = this.Enum.REDUCTIONREASON.SNSY
    this.radio = ''
    this.searchList()
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    xf (record) {
      this.post('overAgeTipApi/beforeSuperventionCheck', { id: record.id }).then((res) => {
        if (!res.errors) {
          this.reductionObj = record
          this.dataProcess(1)
          const recordDatas = record ? JSON.parse(JSON.stringify(record)) : {}
          recordDatas.birthday = recordDatas.birthday ? moment(recordDatas.birthday) : null
          recordDatas.endTime = recordDatas.endTime ? moment(recordDatas.endTime) : null
          // recordDatas.superventionOverDate = recordDatas.superventionOverDate ? moment(recordDatas.superventionOverDate, 'YYYY-MM') : null
          this.$nextTick(() => {
            this.modelForm.setFieldsValue(recordDatas)
          })
        }
      })
    },
    jy (record) {
      const _self = this
      _self.post('/checkChildApi/beforeReductionCheck', { childEnterId: record.id }).then((res) => {
        if (res.serviceSuccess) {
          _self.dataProcess(0)
          // 福利孤弃儿童养育类型为收养时末领年月非必填
          _self.adopt = !(record.childType == _self.Enum.CHILDCATEGORYA.FLJGYYGQET && record.bringUpType == _self.Enum.REARINGTYPE.SY)
          _self.reductionObj = record
          const recordDatas = record ? JSON.parse(JSON.stringify(record)) : {}
          recordDatas.reductionDate = moment().locale('zh-cn')
          recordDatas.birthday = recordDatas.birthday ? moment(recordDatas.birthday) : null
          recordDatas.endTime = res.data.data ? moment(res.data.data, 'YYYY-MM') : null
          //   recordDatas['businessDate'] = recordDatas.birthday ? moment(recordDatas.birthday).add(18, 'y') : null

          _self.$nextTick(() => {
            this.modelForm.setFieldsValue(recordDatas)
          })
        }
      })
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (this.obj.todoFlag) {
        formData.todoFlag = this.obj.todoFlag
      }
      this.changetime(formData)
      return formData
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    searchList () {
      this.handleSubmit()
    },
    handleSubmit (e) {
      $('.ant-table .no-data').removeClass('pop')

      if (e) { // 只有点查询才重置参数
        this.page = 1
        this.size = 10
      }
      this.nowtype = 0
      // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
      const ref = this.mixPageRef
      this.$nextTick(() => {
        this.$refs[ref].loadData(data => {
          this.isNextState = data.data.isSuperventionApply == '1'
          setTimeout(() => {
            $('.ant-table .no-data').addClass('pop')
          }, 300)
        }, err => { }
        )
      })
    },
    getColor (val) {
      let classValue = ''
      switch (val) {
        case '1':// 超龄待续发
          classValue = 'color1'
          break
        case '4':// 续发未到期
          classValue = 'color2'
          break
        case '3':// 即将超龄
          classValue = 'color3'
          break
        case '2': // 续发已到期
          classValue = 'color4'
          break
      }
      return classValue
    },
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('DEATHREASON', 'dieReasonList') // 获取死亡原因字典数据
      this.getMenu('REDUCTIONREASON', 'reductionTypeList') // 获取减员原因字典数据
      this.getMenu('DIEDEAL', 'dieDealList') // 获取死亡处理方式字典数据
      this.getMenu('OVERAGERENEWALREASON', 'overAgeReasonList') // 获取超龄续发原因字典数据
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
          if (name == 'childTypeList' && this.childTypeCode == 'CHILDCATEGORYM') {
            _self[name].splice(-2, 0, { label: '福利机构养育孤弃儿童', value: '1' })
          }
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    Excel () {
      var data = this.userPageParams()
      data.orgId = window.parent.indexTool.getUserInfo().orgId
      const url = '/overageChild/exportOverAgeChild'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel1 (e) {
      this.showOn = false
    },
    // 点击姓名查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    },
    // 点击减员原因事件
    getReason (e) {
      // 减员原因切换时，清除必填错误提示
      this.modelForm.setFields({
        businessDate: { value: null, errors: null }
      })
      this.type = e.target.value
      if (this.modelForm.getFieldsValue().businessDate != undefined) {
        this.modelForm.setFieldsValue({ businessDate: null })
      }
      if (this.modelForm.getFieldsValue().reason != undefined) {
        this.modelForm.setFieldsValue({ reason: null })
      }
      switch (e.target.value) {
        case this.Enum.REDUCTIONREASON.SNSY:
        case this.Enum.REDUCTIONREASON.KSSY:
        case this.Enum.REDUCTIONREASON.SWSGATSY:
          this.label = '收养日期'
          break
        case this.Enum.REDUCTIONREASON.ZHSFM:
          this.label = '找回父母日期'
          break
        case this.Enum.REDUCTIONREASON.DLSH:
          this.label = '独立生活日期'
          break
        case this.Enum.REDUCTIONREASON.KJGS:
          this.label = '困境改善日期'
          break
        case this.Enum.REDUCTIONREASON.SW:
          this.label = '死亡日期'
          break
        case this.Enum.REDUCTIONREASON.QTCK:
          this.label = '其他出库日期'
          break
        case this.Enum.REDUCTIONREASON.ETCL:
          this.label = '儿童超龄日期'
          // 自动计算超龄日期（出生日期加18），并赋值
          const date = moment(this.modelForm.getFieldsValue().birthday).add({ years: 18, days: 1 })
          this.$nextTick(() => {
            this.modelForm.setFieldsValue({
              businessDate: date
            })
          })
          break
        default:
      }
    },
    // 超龄续发原因的选择
    getReasonRadio (e) {
      this.radio = e
    },
    // 取消点击事件
    handleCancel (e) {
      this.visible = false
      this.obj = {}
      this.modelForm.resetFields()
      this.fileList = []
      this.type = this.Enum.REDUCTIONREASON.SNSY
      this.label = '收养日期'
      this.upLoadPathIds = []
      this.handleSubmit()
    },
    // 续发截止时间不能小于当前时间
    disabledSupDate (current) {
      if (this.reductionObj.superventionOverDate) {
        if (this.reductionObj.superventionOverDate == moment().format('YYYY-MM')) {
          return current && current < moment(new Date(), 'YYYY-MM')
        }
      }
      if (this.reductionObj.overAgeDate) {
        if (this.reductionObj.overAgeDate.substring(0, 7) == moment().format('YYYY-MM')) {
          return current && current < moment(new Date(), 'YYYY-MM')
        }
      }
      return current && current < moment(new Date()).add(-1, 'days') // 昨天下午4点21分
    },
    // 末领年月不能小于起领年月
    disabledDate (current) {
      let { startTime } = this.reductionObj
      startTime = startTime ? moment(startTime, 'YYYY-MM') : null
      return current < startTime
    },
    handleOk () {
      if (this.upLoadPathIds.length == 0) {
        this.$confirm({
          title: '提示',
          content: '上传文件信息项为空，提交后将不可修改，确认提交吗?',
          onOk: () => {
            this.toSubmit()
          },
          onCancel: () => {

          },
          class: 'test'
        })
      } else {
        this.toSubmit()
      }
    },
    toSubmit () {
      const _self = this
      let url = '/reductionChildApplyApi/deleteChildInfo' // 减员url
      if (_self.types == 1) { // 续发
        url = '/overAgeTipApi/submitChildSuperventionProcess' // '/overAgeTipApi/submitSuperventionChild'
      }
      _self.modelForm.validateFields((err, values) => {
        if (!err) {
          const modelForm = _self.modelForm.getFieldsValue()
          modelForm.birthday = moment(modelForm.birthday).format('YYYY-MM-DD')
          if (_self.types == 0) { // 减员
            modelForm.reductionDate = moment(modelForm.reductionDate).format('YYYY-MM-DD')
            modelForm.endTime = moment(modelForm.endTime).format('YYYY-MM')
            modelForm.childEnterId = _self.reductionObj.id

            if (modelForm.businessDate != undefined) {
              modelForm.businessDate = moment(modelForm.businessDate).format('YYYY-MM-DD')
            }
            if (_self.upLoadPathIds.length > 0) {
              modelForm.upLoadPathIds = _self.upLoadPathIds
            }
          }
          if (_self.types == 1) { // 续发
            modelForm.superventionOverDate = moment(modelForm.superventionOverDate).format('YYYY-MM')
            modelForm.childEnterId = _self.reductionObj.id
          }
          if (_self.upLoadPathIds.length > 0) {
            modelForm.upLoadPathIds = _self.upLoadPathIds
          }
          const mlny = modelForm.endTime ? modelForm.endTime : '  '
          if (_self.types == 1) {
            _self.post(url, modelForm).then((res) => {
              if (res.serviceSuccess) {
                _self.$message.success('数据操作成功！')
                _self.handleCancel()
              }
            })
          } else {
            this.$confirm({
              title: '提示',
              content: '该儿童的减员日期为:' + modelForm.reductionDate + '，末领年月为:' + mlny + ',确认对该儿童做减员操作吗?',
              onOk: () => {
                _self.post(url, modelForm).then((res) => {
                  if (res.serviceSuccess) {
                    _self.$message.success('数据操作成功！')
                    _self.handleCancel()
                  }
                })
              },
              onCancel: () => {
                this.$message.error('已取消操作!')
              },
              class: 'test'
            })
          }
        } else {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 点击续发/减员按钮时的数据处理 types 1为续发，2为减员
    dataProcess (types) {
      const _self = this
      _self.radio = ''
      _self.visible = true
      _self.types = types
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.upLoadPathIds.push(info.file.response.data.data.fileid)
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) { this.downloadFile(file) },
    handleRemove (e) {
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
          _self.upLoadPathIds.splice(_self.upLoadPathIds.indexOf(fileId), 1)
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 450px;
}
.spilwid4 {
  width: 350px;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  display: flex;
  align-items: center;
}
.color1 {
  color: #ff2b2b;
}
.color2 {
  color: #379b37;
}
.color3 {
  color: #ff9a02;
}
.color4 {
  color: #ff68ff;
}
</style>
