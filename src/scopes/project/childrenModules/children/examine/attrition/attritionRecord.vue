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

                <ta-form-item label="儿童类别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              v-if="notCounty">
                  <ta-select class="selectwid"
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childrenTypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              class="spilwid4"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>

                <ta-form-item label="性别"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="sex">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value"
                                      :require="{message:'请选择性别'}">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="birthday">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="减员申请日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="applyDay">
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
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">审批中</ta-radio-button>
              <ta-radio-button value="4">通过</ta-radio-button>
              <ta-radio-button value="5">驳回</ta-radio-button>
              <ta-radio-button value="9">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon="plus"
                       @click="add">新增减员</ta-button>
            <!-- <ta-button class='btnleft exportbtn'
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns.sync="tableColumns"
                  :dataSource="mixDataList"
                  :showOverflowTooltip="true"
                  :pagination="false"
                  ref="hideOrShowTable">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="approveDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               class='btnlist'
               slot-scope="a, b">
            <span @click="revokeRecords(b)"
                  class="com_revocation"
                  v-if="b.status=='1'">撤回</span>
            <span @click="see(b)"
                  class="com_textsee"
                  v-if="b.status=='3'||b.status=='4'||b.status=='5'">查看</span>
            <span @click="edit(b)"
                  class="com_continue"
                  v-if="b.status=='5'">继续办理</span>
            <span @click="edit(b)"
                  class="com_textedit"
                  v-if="b.status=='0'||b.status=='2'">编辑</span>

            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(b)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消"
                           v-if="b.status=='0'||b.status=='2'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>

          </div>
          <div slot="status"
               slot-scope="val, obj">
            <span :class="statusClass(obj)">{{val}}</span>
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
                       :ref="mixPageRef" />
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
                          :require="{message:'请输入儿童姓名'}">
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
            <ta-form-item label="现住址"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="currentDetail"
                          :require="{message:'请输入现住址'}">
              <ta-input :disabled='true' />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="减员原因"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reductionType"
                          :fieldDecoratorOptions="{initialValue: '01',rules: [{ required: true, message: '请选择减员原因'}]}">
              <ta-radio-group name="radioGroup"
                              @change="getReason">
                <ta-radio :value="item.value"
                          v-for="(item,index) in reductionTypeList"
                          :key="index">{{item.label}}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item :label="label"
                          v-if="type!=Enum.REDUCTIONREASON.LRCW&&type!=Enum.REDUCTIONREASON.HJQC&&type!=Enum.REDUCTIONREASON.QT"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="businessDate"
                          :require="{message:'请选择'+label}">
              <ta-date-picker style="width: 100%;"
                              :placeholder="'请选择'+label" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="困境改善原因"
                          v-if="type==Enum.REDUCTIONREASON.KJGS"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reason">
              <ta-input :disabled="disabled"
                        placeholder="请输入困境改善原因" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="死亡原因"
                          v-if="type==Enum.REDUCTIONREASON.SW"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="dieReason">
              <ta-select allowClear
                         :disabled="disabled"
                         placeholder="请选择死亡原因">
                <ta-select-option v-for="item in dieReasonList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="死亡处理方式"
                          v-if="type==Enum.REDUCTIONREASON.SW"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="dieDeal">
              <ta-select allowClear
                         :disabled="disabled"
                         placeholder="请选择死亡处理方式">
                <ta-select-option v-for="item in dieDealList"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="其他原因"
                          v-if="type==Enum.REDUCTIONREASON.QT"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reason">
              <ta-input :disabled="disabled"
                        placeholder="请输入其他原因" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="减员日期"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="reductionDate"
                          :require="{message:'请选择减员日期'}">
              <ta-date-picker style="width: 100%;"
                              :disabled="disabled"
                              placeholder="请选择减员日期" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="末领年月"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="endTime"
                          :require="{message:'请选择末领年月'}">
              <ta-month-picker style="width: 100%;"
                               placeholder="请选择末领年月" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="24">
            <ta-form-item label="备注"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }"
                          fieldDecoratorId="remark"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
              <ta-textarea placeholder="请输入备注"
                           :rows="2" />
            </ta-form-item>
            <ta-form-item label="上传"
                          :labelCol="{ span: 5 }"
                          :wrapperCol="{ span: 19 }">

              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         :action="action"
                         :disabled="disabled"
                         :fileList="fileList"
                         @remove="handleRemove"
                         @preview="preview"
                         :data="fileData('9','fileList')"
                         :beforeUpload="beforeUpload"
                         @change="filechange">
                <ta-button>
                  <ta-icon type="upload" /> 上传文件
                </ta-button>
              </ta-upload>

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
import { type } from 'os'
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
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },

  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '10%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '15%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '20%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '减员申请日期',
    dataIndex: 'registerDate',
    width: '15%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '审批日期',
    align: 'center',
    dataIndex: 'approveDate',
    width: '23%',
    scopedSlots: { customRender: 'approveDate' }
  },
  {
    title: '状态',
    width: '10%',
    align: 'center',
    dataIndex: 'statusLabel',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,

    dataIndex: 'action',
    width: '15%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      visible: false,
      idedit: false,
      nowkey: '0', // 选择不同的tab值（1待审批、3审批中、4通过、5驳回、0待提交、9全部）
      isdisabled: true,
      childrenTypeList: [], // 儿童类别字典数据
      sexList: [], // 性别字典数据

      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/reductionChildRequestApi/pageApplyReductionChild' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      // 减员编辑
      childTypeList: [], // 儿童类别字典数据
      reductionTypeList: [], // 减员原因字典数据
      dieReasonList: [], // 死亡原因
      dieDealList: [], // 死亡处理方式

      disabled: false,
      depletionDisible: false, // 减员抽屉显隐
      label: '收养日期', // 收养日期（儿童超龄时期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: '01', // 减员原因选择的数据
      nowdate: null, // 当前日期

      fileList: [],
      reductionObj: {}, // 减员操作的数据
      issearch: false,
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4 // 不是乡镇用户

    }
  },
  activated () {
    this.issearch = false

    this.type = '01'
    // 通过列表显示审批时间
    this.$refs.hideOrShowTable[this.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
    this.nowdate = moment().locale('zh-cn')
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.childrenTypeList = await this.getDictionaries(this.childTypeCode) // 获取儿童类别字典数据
      if (this.childTypeCode == 'CHILDCATEGORYM') {
        this.childrenTypeList.splice(3, 0, { label: '福利机构养育孤弃儿童', value: '1' })
      }
      this.dieReasonList = await this.getDictionaries('DEATHREASON') // 获取死亡原因字典数据
      this.reductionTypeList = await this.getDictionaries('REDUCTIONREASON') // 获取减员原因字典数据
      this.dieDealList = await this.getDictionaries('DIEDEAL') // 获取死亡处理方式字典数据
    },
    // 新增减员
    add () {
      this.$router.push({
        name: 'depletion'
      })
    },
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (e.status) {
        case 0: // 待提交
          classValue = 'no_submit'
          break
        case 1:// 待审批
          classValue = 'com_tobeaudited'
          break
        case 3:// 审批中
          classValue = 'com_inaudit'
          break
        case 4:// 通过
          classValue = 'com_adopt'
          break
        case 5:// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    // 点击减员原因事件
    getReason (e) {
      this.type = e.target.value
      if (this.form.getFieldsValue().businessDate != undefined) {
        this.form.setFieldsValue({ businessDate: null })
      }
      if (this.form.getFieldsValue().reason != undefined) {
        this.form.setFieldsValue({ reason: null })
      }
      this.changeLabelByReason(e.target.value)
    },
    // 根据减员原因显示不同的label值
    changeLabelByReason (e) {
      switch (e) {
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
          break
        default:
      }
    },
    // 提交
    submitOn () {
      let isok = true
      const _self = this
      _self.form.validateFields((err, values) => {
        if (err) {
          isok = false
        }
      })
      if (isok) {
        const form = _self.form.getFieldsValue()
        form.birthday = moment(form.birthday).format('YYYY-MM-DD')
        form.id = _self.reductionObj.id
        if (form.reductionDate != undefined) {
          form.reductionDate = moment(form.reductionDate).format('YYYY-MM-DD')
        }
        if (form.endTime != undefined) {
          form.endTime = moment(form.endTime).format('YYYY-MM-DD')
        }
        if (form.businessDate != undefined) {
          form.businessDate = moment(form.businessDate).format('YYYY-MM-DD')
        }
        const upLoadPathIds = []
        for (let i = 0; i < _self.fileList.length; i++) {
          upLoadPathIds.push(_self.fileList[i].response.data.data.fileid)
        }
        form.upLoadPathIds = upLoadPathIds

        this.post('/reductionChildApplyApi/deleteChildInfo', form).then((res) => {
          if (res.serviceSuccess) {
            _self.$message.success('数据保存成功！')
            _self.backOn()
          }
        })
      } else {
        _self.$message.error('校验不通过，无法提交，请再次检查!')
      }
    },
    // 返回
    backOn () {
      this.form.resetFields()
      this.fileList = []
      this.type = '01'
      this.label = '收养日期'
      this.depletionDisible = false
      this.handleSubmit()
    },
    // 导出
    exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/reductionChild/exportAddChildApply', data)
    },
    revokeRecords (e) {
      this.$router.push({
        name: 'revokeAttritionRecords',
        query: { childReductionId: e.childReductionId, id: e.id, workflowId: e.workflowId, status: e.status }
      })
    },
    see (e) {
      const flag = 'look'
      this.$router.push({
        name: 'attritionApprovalFrom',
        query: { id: e.id, childReductionId: e.childReductionId, workflowId: e.workflowId, workflowPointId: e.workflowPointId, flag: 'look' }
      })
    },
    edit (e) {
      const _self = this
      _self.depletionDisible = true

      _self.$nextTick(() => {
        _self.form.setFieldsValue({
          name: e.name,
          birthday: moment(e.birthday)
        })
      })

      _self.post('/reductionChildRequestApi/childReductionUpdate', {
        childReductionId: e.childReductionId
      }).then(res => {
        if (res.serviceSuccess) {
          const obj = res.data.data
          _self.reductionObj = obj
          // 根据减员原因显示不同的内容
          _self.changeLabelByReason(obj.reductionType)
          _self.type = obj.reductionType

          obj.reductionDate = obj.reductionDate ? moment(obj.reductionDate) : null
          obj.endTime = obj.endTime ? moment(obj.endTime) : null
          obj.businessDate = obj.businessDate ? moment(obj.businessDate) : null
          obj.currentDetail = obj.currentAddress
          _self.$nextTick(() => {
            _self.form.setFieldsValue(obj)
          })
          this.fileList = obj.fileList
        }
      })
    },
    dels (e) {
      const _self = this
      _self.post('/reductionChildRequestApi/deleteChildReduction', {
        childReductionId: e.childReductionId
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('删除成功!')
          _self.handleSubmit()
        }
      })
    },
    typechange (val) {
      const _self = this
      _self.nowkey = val.target.value
      // 通过列表显示审批时间
      this.$refs.hideOrShowTable[_self.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
      _self.handleSubmit('search')
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
    },
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      formData.type = _self.nowkey
      _self.changetime(formData)
      return formData
    },
    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    },
    // 上传
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
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
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    },
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  watch: {
    type (val) {
      if (val != 7) {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            reductionDate: this.nowdate
          })
        })
      }
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
</style>
