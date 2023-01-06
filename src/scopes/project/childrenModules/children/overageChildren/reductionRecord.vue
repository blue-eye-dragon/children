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
                <ta-form-item label="儿童类别"
                              fieldDecoratorId="childType"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
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
                <ta-form-item label="审核日期"
                              fieldDecoratorId="auditDate"
                              class="spilwid3"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item>

                <ta-form-item label="减员原因"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{ span: 15 }"
                              class="spilwid"
                              fieldDecoratorId="reductionType">
                  <ta-select allowClear
                             placeholder="请选择减员原因">
                    <ta-select-option v-for="item in reductionTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
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
        <div style="margin-top: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="name"
                slot-scope="a,b,c">
            <a @click="childDetail(b)">{{a}}</a>
          </span>
          <template slot="approveDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <span slot="action"
                slot-scope="a, b, c"
                class="btnlist">
            <span class="com_textsee"
                  @click="look(b)">查看</span>
            <span class="com_relieve"
                  @click="depletion(b)">信息维护</span>

          </span>
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
    <!-- 减员抽屉 -->
    <ta-drawer title="减员"
               width=500
               placement="right"
               :getContainer="setContainer"
               @close="backOn"
               :visible="depletionDisible">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row>
          <ta-col :span="24">
            <ta-form-item label="儿童姓名"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="name"
                          :fieldDecoratorOptions="verificationRules('儿童姓名',72)">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="出生日期"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="birthday"
                          :require="{message:'请选择出生日期'}">
              <ta-date-picker style="width: 100%;"
                              placeholder="请选择出生日期"
                              :disabled='true' />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="现住地址"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="currentDetail">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="减员原因"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reductionType"
                          :fieldDecoratorOptions="{initialValue: this.Enum.REDUCTIONREASON.SNSY,rules: [{ required: true, message: '请选择减员原因'}]}">
              <ta-radio-group name="radioGroup"
                              :disabled='true'
                              @change="getReason">
                <ta-radio :value="item.value"
                          v-for="(item,index) in reductionTypeList"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-col>

          <div v-if="type!=Enum.REDUCTIONREASON.LRCW&&type!=Enum.REDUCTIONREASON.HJQC&&type!=Enum.REDUCTIONREASON.QT">
            <ta-col :span="24">
              <div id="label">
                <ta-form-item :label="label"
                              :labelCol="{ span: 5 }"
                              :wrapperCol="{ span: 19 }"
                              fieldDecoratorId="businessDate"
                              :require="{message:'请选择'+label}">
                  <ta-date-picker style="width: 100%;"
                                  :disabled='true'
                                  :getCalendarContainer="setCalendarContainer3"
                                  :placeholder="'请选择'+label"
                                  :disabledDate="disabledDate" />
                </ta-form-item>
              </div>
            </ta-col>
          </div>
          <ta-col :span="24"
                  v-if="type==Enum.REDUCTIONREASON.KJGS">
            <ta-form-item label="困境改善原因"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reason"
                          :fieldDecoratorOptions="verificationRules('困境改善原因',100)">
              <ta-input placeholder="请输入困境改善原因"
                        :disabled='true' />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24"
                  v-if="type==Enum.REDUCTIONREASON.SW">
            <ta-form-item label="死亡原因"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="dieReason"
                          :require="{message:'请选择死亡原因'}">
              <ta-select allowClear
                         :disabled='true'
                         placeholder="请选择死亡原因">
                <ta-select-option v-for="item in dieReasonList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="24"
                  v-if="type==Enum.REDUCTIONREASON.SW">
            <ta-form-item label="死亡处理方式"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="dieDeal">
              <ta-select allowClear
                         :disabled='true'
                         placeholder="请选择死亡处理方式">
                <ta-select-option v-for="item in dieDealList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="24"
                  v-if="type==Enum.REDUCTIONREASON.QT">
            <ta-form-item label="其他原因"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reason"
                          :fieldDecoratorOptions="verificationRules('其他原因',200)">
              <ta-input placeholder="请输入其他原因"
                        :disabled='true' />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <div id="jianyuan">
              <ta-form-item label="减员日期"
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 19 }"
                            fieldDecoratorId="reductionDate"
                            :require="{message:'请选择减员日期'}">
                <ta-date-picker style="width: 100%;"
                                :disabled='!userOrgType'
                                :getCalendarContainer="setCalendarContainer1"
                                placeholder="请选择减员日期" />
              </ta-form-item>
            </div>
          </ta-col>
          <ta-col :span="24">
            <div id="moling">
              <ta-form-item label="末领年月"
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 19 }"
                            fieldDecoratorId="endTime"
                            :require="{enable:adopt,message:'请选择末领年月'}">
                <ta-month-picker style="width: 100%;"
                                 :disabled='!userOrgType'
                                 :getCalendarContainer="setCalendarContainer2"
                                 :disabledDate="disabledDate1"
                                 placeholder="请选择末领年月" />
              </ta-form-item>
            </div>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="备注"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="remark"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
              <ta-textarea placeholder="请输入备注"
                           :disabled='true'
                           :rows="2" />
            </ta-form-item>
            <ta-form-item label="上传"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }">

              <ta-upload :withCredentials="true"
                         name="file"
                         :beforeUpload="beforeUpload"
                         :multiple="true"
                         :action="action"
                         :fileList="fileList"
                         @remove="handleRemove"
                         @preview="preview"
                         :data="fileData('9','fileList')"
                         @change="filechange">
                <ta-button>
                  <ta-icon type="upload" /> 上传文件
                </ta-button>
              </ta-upload>
              <p class="warntext"
                 style="font-size:14px;line-height: normal;">
                <ta-icon type="info-circle-o"
                         class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
              </p>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
      <div slot="footer">
        <ta-button @click="backOn">返回</ta-button>
        <ta-button class="btnleft"
                   type="primary"
                   @click="submitOn">提交</ta-button>
      </div>
    </ta-drawer>
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '13%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '18%',
    align: 'center',
    dataIndex: 'birthday'
  },
  {
    title: '儿童类别',
    width: '18%',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '减员申请日期',
    width: '18%',
    align: 'center',
    dataIndex: 'reductionDate'
  },
  {
    title: '减员原因',
    width: '14%',
    dataIndex: 'reductionType',
    collectionType: 'REDUCTIONREASON'
  },
  {
    title: '审核通过日期',
    align: 'center',
    width: '18%',
    dataIndex: 'approveDate',
    scopedSlots: { customRender: 'approveDate' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      userOrgType: false,
      issearch: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/reductionChildApplyApi/queryChildReductionRecord' // 数据列表接口，API地址
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

      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      reductionTypeList: [], // 减员原因字典数据
      dieReasonList: [], // 死亡原因
      dieDealList: [], // 死亡处理方式
      depletionDisible: false, // 减员抽屉显隐
      label: '收养日期', // 收养日期（儿童超龄时期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: this.Enum.REDUCTIONREASON.SNSY, // 减员原因选择的数据
      nowdate: null, // 当前日期

      fileList: [],
      upLoadPathIds: [], // 附件上传存放的id数组
      reductionObj: {}, // 减员操作的数据
      adopt: false // 福利孤弃儿童养育类型为收养

    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      this.getMenu('REDUCTIONREASON', 'reductionTypeList') // 获取减员原因字典数据
      this.getMenu('DEATHREASON', 'dieReasonList') // 获取死亡原因字典数据
      this.getMenu('DIEDEAL', 'dieDealList') // 获取死亡处理方式字典数据
      let typeCode = 'CHILDCATEGORYF'
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用全的
        typeCode = 'CHILDCATEGORYA'
        this.userOrgType = true// 民政局
      } else {
        this.userOrgType = false
      }
      this.getMenu(typeCode, 'childTypeList') // 获取儿童类别字典数据
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
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 末领年月不能小于起领年月
    disabledDate1 (current) {
      let { startTime } = this.reductionObj
      startTime = startTime ? moment(startTime) : null
      return current && current < startTime
    },
    // 点击减员原因事件
    getReason (e) {
      this.form.setFields({
        businessDate: {
          errors: null
        }
      })
      this.form.setFieldsValue({ endTime: null })
      this.type = e.target.value
      if (this.form.getFieldsValue().businessDate != undefined) {
        this.form.setFieldsValue({ businessDate: null })
      }
      if (this.form.getFieldsValue().reason != undefined) {
        this.form.setFieldsValue({ reason: null })
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
          this.$nextTick(() => {
            this.form.setFieldsValue({
              businessDate: moment(this.form.getFieldsValue().birthday).add({ years: 18 })
            })
          })
          break
        default:
      }
    },
    setCalendarContainer1 () {
      return document.getElementById('jianyuan')
    },
    setCalendarContainer2 () {
      return document.getElementById('moling')
    },
    setCalendarContainer3 () {
      return document.getElementById('label')
    },
    // 减员
    depletion (obj) {
      const _self = this
      _self.post('/reductionChildRequestApi/childReductionWorkflow', { childReductionId: obj.id, workflowId: obj.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          _self.depletionDisible = true
          _self.reductionObj = obj
          _self.nowdate = moment().locale('zh-cn')
          const childData = res.data.data.reductionChildVo
          if (childData.businessDate) {
            childData.businessDate = moment(childData.businessDate)
          }
          if (childData.reductionDate) {
            childData.reductionDate = moment(childData.reductionDate)
          }
          if (childData.endTime) {
            childData.endTime = moment(childData.endTime)
          }
          if (childData.fileList.length > 0) {
            this.fileList = childData.fileList
          }
          this.type = childData.reductionType
          switch (this.type) {
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
              this.$nextTick(() => {
                this.form.setFieldsValue({
                  businessDate: moment(this.form.getFieldsValue().birthday).add({ years: 18 })
                })
              })
              break
            default:
          }
          // 福利孤弃儿童养育类型为收养时末领年月非必填
          _self.adopt = !(obj.childType == _self.Enum.CHILDCATEGORYA.FLJGYYGQET && obj.bringUpType == _self.Enum.REARINGTYPE.SY)
          _self.$nextTick(() => {
            _self.form.setFieldsValue({
              name: obj.name,
              birthday: obj.birthday ? moment(obj.birthday) : null,
              currentDetail: childData.currentAddress
            })
            _self.form.setFieldsValue(childData)
          })
        }
      })
    },
    // 提交
    submitOn () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.fileList.length > 0) {
            this.fileList.forEach(item => {
              this.upLoadPathIds.push(item.response.data.data.fileid)
            })
          }
          if (this.fileList.length == 0) {
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
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    toSubmit () {
      const form = {}
      const _self = this
      const obj = _self.form.getFieldsValue()
      form.orgType = _self.userOrgType
      form.id = _self.reductionObj.id
      if (_self.upLoadPathIds.length > 0) {
        form.upLoadPathIds = _self.upLoadPathIds
      }
      if (_self.userOrgType) { // 民政局可编辑末领年月和减员日期
        form.reductionDate = moment(obj.reductionDate).format('YYYY-MM-DD')
        form.endTime = moment(obj.endTime).format('YYYY-MM')
        const mlny = form.endTime ? form.endTime : '         '
        _self.$confirm({
          title: '提示',
          content: '该儿童的减员日期为:' + form.reductionDate + '，末领年月为:' + mlny + ',确认操作吗?',
          onOk: () => {
            _self.post('/reductionChildApplyApi/reductionRecordForEdit', form).then((res) => {
              if (res.serviceSuccess) {
                _self.$message.success('数据提交成功！')
                _self.backOn()
              }
            })
          },
          onCancel: () => {
            _self.$message.error('已取消操作!')
          },
          class: 'test'
        })
      } else {
        _self.post('/reductionChildApplyApi/reductionRecordForEdit', form).then((res) => {
          if (res.serviceSuccess) {
            _self.$message.success('数据提交成功！')
            _self.backOn()
          }
        })
      }
    },
    look (e) {
      const flag = 'look'
      this.$router.push({
        name: 'attritionApprovalFrom',
        query: { id: e.childEnterId, childReductionId: e.id, workflowId: e.workflowId, workflowPointId: e.workflowPointId, flag: 'look' }
      })
    },
    // 取消点击事件
    handleCancel (e) {
      this.visible = false
      this.modelForm.resetFields()
    },
    // 返回
    backOn () {
      this.form.resetFields()
      this.resetFrom()
      this.fileList = []
      this.upLoadPathIds = []
      this.type = '01'
      this.label = '收养日期'
      this.depletionDisible = false
    },
    // 点击姓名查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.childEnterId }), operateFlag: 'look_now' }
      })
    },
    // 死亡日期与找回父母日期不能大于当前日期
    disabledDate (current) {
      if (this.type == this.Enum.REDUCTIONREASON.SW || this.type == this.Enum.REDUCTIONREASON.ZHSFM) {
        // 不能选择今天以后的日期
        return current > moment().endOf('day')
      } else {
        return false
      }
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
          this.$message.success('文件上传成功!')
        } else {
          this.fileList.splice(-1, 1)
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
  width: 430px;
}
.spilwid4 {
  width: 350px;
}
.searchdata {
  height: 100%;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
