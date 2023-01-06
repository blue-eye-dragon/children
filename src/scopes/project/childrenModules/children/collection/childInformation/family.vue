<template>
  <div>
    <div class="visitbtn"
         v-if="operateVisible">
      <ta-button type="primary"
                 class="addbtn"
                 @click="addHomeMember">新增</ta-button>
    </div>
    <div>
      <ta-table bordered
                class="tables"
                :columns="tableColumns"
                :dataSource="showlist"
                :showOverflowTooltip="true">
        <span slot="num"
              slot-scope="val, obj, index">
          <span>{{ size * (page - 1) + index + 1 }}</span>
        </span>
        <span slot="sex"
              slot-scope="val, obj">
          <span>{{ obj.sex | sexfilter }}</span>
        </span>
        <span slot="relationship"
              slot-scope="val, obj, index">
          <span>
            {{obj.relationship != Enum.RELATION.QT
            ? CollectionLabel("RELATION", val)
            : CollectionLabel("RELATION", val) + "：" + (obj.relationshipOther || "")
            }}
          </span>
        </span>
        <div slot="action"
             slot-scope="val, obj, index"
             class="btnlist">
          <span @click="see(val, obj, index)"
                class="com_textsee">查看</span>
          <span @click="edit(val, obj, index)"
                v-if="operateVisible"
                class="com_textedit">编辑</span>
          <ta-popconfirm title="确定删除吗?"
                         @confirm="deletes(val, obj, index)"
                         okText="确定"
                         cancelText="取消"
                         v-if="index != 0 && operateVisible">
            <span class="com_textdel">删除</span>
          </ta-popconfirm>
        </div>
      </ta-table>
    </div>
    <!-- 新增、编辑弹窗 -->
    <ta-drawer :title="types == 0 ? '新增家庭成员' : types == 1 ? '编辑家庭成员' : '查看家庭成员'"
               width="650"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px;">
      <ta-form class="drawerFrom"
               :id='drawer'
               :autoFormCreate="form => {this.form = form;}"
               layout="horizontal"
               :hideRequiredMark="hideRequiredMark">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="verificationRules('姓名', 72)">
          <ta-input :disabled="isOneself == 0 ? idedit : true"
                    :placeholder="!(isOneself == 0 ? idedit : true) ? '请输入姓名' : ''" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :require="{ message: '请选择性别' }">
          <ta-select :disabled="isOneself == 0 ? idedit : true"
                     :getPopupContainer="setPopupContainer"
                     :placeholder="!(isOneself == 0 ? idedit : true) ? '请选择性别' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in sexList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="关系"
                      fieldDecoratorId="relationship"
                      :require="{ message: '请选择关系' }">
          <ta-input-group compact>
            <ta-select allowClear
                       :getPopupContainer="setPopupContainer"
                       :placeholder="!(isOneself == 0 ? idedit : true) ? '请选择关系' : ''"
                       @change="getRelation"
                       :disabled="isOneself == 0 ? idedit : true"
                       v-model="valueSelect"
                       :style="{ width: valueSelect != Enum.RELATION.QT ? '100%' : '45%' }">
              <ta-select-option :value="item.value"
                                :disabled="isOneself == 0&&item.value==Enum.RELATION.BR"
                                v-for="(item, index) in relationshipList"
                                :key="index">{{item.label}}
              </ta-select-option>
            </ta-select>
            <ta-auto-complete :dataSource="dataSource"
                              :disabled="isOneself == 0 ? idedit : true"
                              v-if="valueSelect == Enum.RELATION.QT"
                              v-model="valueInput"
                              style="width: 55%;"
                              @blur="setErrorMessage(valueInput)"
                              :placeholder="!(isOneself == 0 ? idedit : true) ? '请输入其他关系' : ''" />
          </ta-input-group>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="{
                      validateTrigger: 'blur',
                      rules: [{ required: false, message: '必输验证' }, { validator: idCardValid }]}">
          <ta-input :disabled="isOneself == 0 ? idedit : true"
                    @blur="idCardTime"
                    :placeholder="!(isOneself == 0 ? idedit : true) ? '请输入身份证号' : ''" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday">
          <ta-date-picker :disabled="isOneself == 0 ? birthDisabled : true"
                          :getCalendarContainer="setPopupContainer"
                          @change="onChange"
                          style="width: 100%;"
                          :placeholder="!(isOneself == 0 ? birthDisabled : true) ? '请选择出生日期' : ''" />
        </ta-form-item>
        <ta-form-item label="年收入(元)"
                      fieldDecoratorId="yearIncome">
          <ta-input-number :min="0"
                           :max="99999999"
                           :precision="2"
                           style="width:100%"
                           :disabled="idedit"
                           :placeholder="!idedit ? '请输入年收入' : ''" />
        </ta-form-item>
        <ta-form-item label="是否监护人"
                      fieldDecoratorId="ifGuardian"
                      :require="{ message: '请选择是否监护人' }">
          <ta-select :disabled="isOneself == 0 ? idedit : true"
                     :getPopupContainer="setPopupContainer"
                     @change="ifGuardianChange"
                     :placeholder="!(isOneself == 0 ? idedit : true) ? '请选择是否监护人' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in ifGuardianList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactNumber"
                      :fieldDecoratorOptions="ifGuardianFlag?verificationRules('联系电话', { type: 'phone' }):verificationRulesNotMustFill('联系电话', { type: 'phone' })">
          <ta-input :disabled="idedit"
                    :placeholder="!idedit ? '请输入联系电话' : ''" />
        </ta-form-item>
        <ta-form-item label="当前情况"
                      fieldDecoratorId="currentSituation"
                      :require="{ message: '请选择当前情况' }">
          <ta-select :disabled="idedit"
                     :placeholder="!idedit ? '请选择当前情况' : ''"
                     :getPopupContainer="setPopupContainer"
                     @change="setDeath">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in currentSituationList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item class="radios"
                      label="患艾滋病情况"
                      fieldDecoratorId="adisCondition"
                      :fieldDecoratorOptions="{ initialValue: '1', rules: [{ required: true, message: '请选择患艾滋病情况' }] }">
          <ta-radio-group @change="radiochange"
                          style="width:100%"
                          :disabled="isOneself == 0 ? idedit : true">
            <ta-radio v-for="(item, index) in adisConditionList"
                      :key="index"
                      :value="item.value">{{ item.label }}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item fieldDecoratorId="adisConditionOther"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('原因', 200)"
                      v-if="radiovalue == Enum.ADISCONDITION.QT"
                      class="otherClass">
          <ta-input :placeholder="!(isOneself == 0 ? idedit : true) ? '请输入原因' : ''"
                    style="width:300px;"
                    :disabled="isOneself == 0 ? idedit : true" />
        </ta-form-item>
        <ta-form-item label="工作单位"
                      fieldDecoratorId="workUnit"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('工作单位', 50)">
          <ta-input :disabled="idedit"
                    :placeholder="!idedit ? '请输入工作单位' : ''" />
        </ta-form-item>
        <ta-form-item label="残疾类别"
                      fieldDecoratorId="disabilityType"
                      :initValue="[]">
          <ta-checkbox-group style="width: 100%"
                             :placeholder="!(isOneself == 0 ? idedit : true) ? '请选择残疾类别' : ''"
                             :disabled="isOneself == 0 ? idedit : true"
                             @change="setMulti"
                             :values="disabilityTypeValues"
                             :options="disabilityTypeList">
          </ta-checkbox-group>
        </ta-form-item>
        <ta-form-item label="患病类型"
                      fieldDecoratorId="illnessType">
          <ta-input :placeholder="!(isOneself == 0 ? idedit : true) ? '请选择患病类型' : ''"
                    @click="chose('illnessType', 'illnessTypeList', '患病类型')"
                    :disabled="isOneself == 0 ? idedit : true"
                    :readOnly="true" />
        </ta-form-item>
        <ta-form-item label="死亡日期"
                      fieldDecoratorId="deathDate">
          <ta-date-picker :disabled="isDeath?idedit:true"
                          :getCalendarContainer="setPopupContainer"
                          style="width: 100%;"
                          :disabledDate="disabledDate"
                          :placeholder="!(isDeath?idedit:true) ? '请选择死亡日期' : ''" />
        </ta-form-item>
        <ta-form-item label="死亡原因"
                      fieldDecoratorId="deathReason">
          <ta-select :disabled="isDeath?idedit:true"
                     :getPopupContainer="setPopupContainer"
                     :placeholder="!(isDeath?idedit:true) ? '请选择死亡原因' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in deathReasonList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="是否同住"
                      fieldDecoratorId="ifLivingTogether"
                      :require="{ message: '请选择是否同住' }">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     :placeholder="!idedit ? '请选择是否同住' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in ifLivingTogetherList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="备注"
                      fieldDecoratorId="remark"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('备注', 200,true)">
          <ta-textarea :placeholder="!(isOneself == 0 ? idedit : true) ? '请输入备注' : ''"
                       :rows="4"
                       :disabled="isOneself == 0 ? idedit : true" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{marginRight: 8}"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
      <ta-drawer :title="title"
                 placement="right"
                 :width="590"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="handleCancel"
                 :visible="choseshow">
        <selectModule v-if="choseshow"
                      :labelval.sync="labelval"
                      :selection.sync="selection"
                      :defaultval="defaultval"
                      :otherval.sync="otherval"
                      :data="
            type == 'illnessTypeList'
              ? illnessTypeList
              : type == 'specialEducationTypeList'
              ? specialEducationTypeList
              : type == 'childSituationList'
              ? childSituationList
              : otherRescueList
          "></selectModule>
        <div slot="footer">
          <ta-button :style="{marginRight: 8}"
                     @click="handleCancel">取消</ta-button>
          <ta-button @click="handleOk"
                     type="primary">确定</ta-button>
        </div>
      </ta-drawer>
    </ta-drawer>
  </div>
</template>
<script>
import localList from '@component/common/js/mixins/localList'
import filtermixin from '@component/common/js/mixins/filtermixin'
import moment from 'moment'
import SelectModule from '../components/selectModule'
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
    width: '8%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '8%'
  },
  {
    title: '关系',
    dataIndex: 'relationship',
    scopedSlots: { customRender: 'relationship' },
    width: '12%'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '13%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '10%'
  },
  {
    title: '当前状况',
    dataIndex: 'currentSituation',
    collectionType: 'CURRENTSITUATION',
    width: '12%'
  },
  {
    title: '患艾滋病情况',
    dataIndex: 'adisCondition',
    collectionType: 'ADISCONDITION',
    width: '14%'
  },
  {
    title: '是否同住',
    dataIndex: 'ifLivingTogether',
    collectionType: 'YESNO',
    width: '10%'
  },
  {
    title: '是否监护人',
    dataIndex: 'ifGuardian',
    collectionType: 'YESNO',
    width: '12%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    SelectModule
  },
  mixins: [localList],
  data () {
    return {
      birthDate: '',
      drawer: 'drawer',
      tableColumns,
      tableDatas: [],
      isdisabled: true,
      visible: false,
      isOneself: 0, // 是（1）否（0）是本人
      idedit: false,
      isDeath: true, // 当前情况是否是死亡
      ifGuardianFlag: false, // 是否是监护人，是监护人时联系电话必填
      birthDisabled: false, // 出生日期控制显隐
      sexList: [], // 性别下拉框数据
      relationshipList: [], // 关系下拉框数据
      currentSituationList: [], // 当前情况下拉框数据
      adisConditionList: [], // 患艾滋病情况下拉框数据
      ifGuardianList: [], // 是否监护人下拉框数据
      deathReasonList: [], // 死亡原因下拉框数据
      ifLivingTogetherList: [], // 是否同住下拉框数据,
      disabilityTypeList: [], // 残疾类别下拉框数据
      illnessTypeList: [], // 患病类型下拉框数据
      choseshow: false, // 患病类型/残疾类别抽屉
      title: '',
      choselist: {},
      radiovalue: '1', // 患艾滋病情况选择的数据
      disabilityTypeValues: [], // 残疾类别选择的数据

      types: 1, // 新增（0）、编辑（1）的标识符
      index: 0, // 编辑时选择的数据索引
      hideRequiredMark: false, // 隐藏所有表单项的必填标记就是红色的*

      operateVisible: true, // 控制查看时是否显示操作按钮
      istranslate: false, // table是否分页

      tablename: 'tableDatas',
      selection: [],

      dataSource: [],
      valueSelect: null, // 与儿童关系下拉框数据
      valueInput: '' // 与儿童关系其他输入框数据
    }
  },
  activated () {
    this.operateVisible = true
    this.choselist = {}
    this.birthDate = ''
    this.tableDatas = []
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 是否是监护人change事件
    ifGuardianChange (e) {
      this.ifGuardianFlag = e == this.Enum.YESNO.SHI
      // 如果联系电话有报错提示则清空联系电话的值
      if (this.form.getFieldError('contactNumber')) {
        this.form.setFieldsValue({
          contactNumber: undefined
        })
      }
    },
    setPopupContainer (trigger) {
      return document.getElementById(this.drawer)
    },
    // 选择与儿童关系
    getRelation (e) {
      this.valueSelect = e
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    idCardTime () {
      setTimeout(() => {
        this.birthDate = this.form.getFieldsValue().birthday.format('YYYY-MM-DD')
      }, 300)
    },
    onChange (date, dateString) {
      this.birthDate = dateString
    },
    // 登记日期不能选择收养（解除）登记日期之前及当前日期之后的日期
    disabledDate (current) {
      if (this.birthDate.length > 0) {
        return current > moment().endOf('day') || current < moment(this.birthDate)
      } else {
        return current > moment().endOf('day')
      }
    },
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('sex') // 性别下拉框数据
      this.relationshipList = await this.getDictionaries('RELATION') // 关系下拉框数据
      this.currentSituationList = await this.getDictionaries('CURRENTSITUATION') // 当前情况下拉框数据
      this.adisConditionList = await this.getDictionaries('ADISCONDITION') // 患艾滋病情况下拉框数据
      this.ifGuardianList = await this.getDictionaries('YESNO') // 是否监护人下拉框数据
      this.deathReasonList = await this.getDictionaries('DEATHREASON') // 死亡原因下拉框数据
      this.ifLivingTogetherList = await this.getDictionaries('YESNO') // 是否同住下拉框数据
      this.disabilityTypeList = await this.getDictionaries('DISABILITYTYPE') // 残疾类别下拉框数据
      this.illnessTypeList = await this.getDictionaries('ILLNESSTYPE') // 患病类型下拉框数据
    },
    // 编辑查看时将家庭成员数据赋到列表
    setMemberDatas (e, flag) {
      this.$nextTick(() => {
        this.tableDatas = e
        if (flag.indexOf('look') != -1) {
          this.operateVisible = false
        }
      })
    },
    // 日期处理
    dateprocessing (data) {
      data.birthday = this.moment(data.birthday, 'YYYY-MM-DD')
    },
    // 新增家庭成员开启弹窗
    addHomeMember () {
      const _self = this
      _self.isOneself = 0
      _self.idedit = false
      _self.isDeath = true
      _self.birthDisabled = false
      _self.index = _self.tableDatas.length + 1
      _self.types = 0
      _self.visible = true
      _self.hideRequiredMark = false
      _self.valueSelect = null
      _self.valueInput = ''
      _self.disabilityTypeValues = []
    },
    // 根据字典数据code获取其name
    getAttrValue (datas, code) {
      var data = datas.filter(function (item) {
        return item.value == code
      })
      if (data && data.length > 0) {
        return data[0].label
      }
    },
    // 患艾滋病情况
    radiochange (val) {
      this.radiovalue = val.target.value + ''
    },
    onClose () {
      this.visible = false
      this.radiovalue = '1'
      this.form.resetFields()
    },
    // 如果选了多重残疾外的超过2个残疾，则多重残疾为选中
    setMulti (e) {
      const index = e.indexOf(this.Enum.DISABILITYTYPE.DCCJ)
      // 选择超过两个（不包括多重残疾）时，勾选多重残疾
      if (index == -1 && e.length > 1) {
        e.push(this.Enum.DISABILITYTYPE.DCCJ)
        this.disabilityTypeValues = e
      }
      // 除多重残疾外，选择一个时，取消勾选多重残疾
      if (index != -1 && e.length == 2) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
      // 不能直接选择多重残疾
      if (index != -1 && e.length == 1) {
        e.splice(index, 1)
        this.disabilityTypeValues = e
      }
    },
    // 新增、编辑确定事件
    subfamily () {
      let isok = true
      const _self = this
      let errorMessage = '校验不通过，无法提交，请再次检查!'
      const { index } = _self
      _self.form.setFieldsValue({
        relationship: _self.valueSelect
      })
      _self.form.validateFields((err, values) => {
        if (_self.isOneself == 1) {
          // 是本人
          if (err) {
            if (err.name || err.sex) {
              errorMessage = '请先完善儿童基本信息内容!'
              _self.visible = false
            }
            isok = false
          }
        } else {
          if (err) {
            isok = false
            this.errfocus(err, _self.form)
          }
        }
      })
      // 判断其他关系是否有值
      if (_self.valueSelect == _self.Enum.RELATION.QT) {
        const errmsg = _self.setErrorMessage(_self.valueInput)
        if (errmsg) {
          isok = false
        }
      }
      setTimeout(() => {
        if (isok) {
          // _self.visible = false
          const form = _self.form.getFieldsValue()
          form.birthday = form.birthday
            ? moment(form.birthday).format('YYYY-MM-DD')
            : null
          form.deathDate = form.deathDate
            ? moment(form.deathDate).format('YYYY-MM-DD')
            : null
          form.infectionTime = form.infectionTime
            ? moment(form.infectionTime).format('YYYY-MM-DD')
            : null

          // 与儿童关系数据
          form.relationship = _self.valueSelect
          if (_self.valueSelect == _self.Enum.RELATION.QT) {
            // 其他
            form.relationshipOther = _self.valueInput
          }

          // 患病类型
          if (index == _self.tableDatas.length + 1) {
            // 新增
            form.illnessType = _self.choselist.illnessType
            if (_self.choselist.illnessType == _self.Enum.ILLNESSTYPE.QT) {
              form.illnessTypeOther = _self.choselist.illnessTypeOther
            }
          } else {
            form.illnessType = _self.tableDatas[index].illnessType
            if (
              _self.tableDatas[index].illnessType == _self.Enum.ILLNESSTYPE.QT
            ) {
              form.illnessTypeOther = _self.tableDatas[index].illnessTypeOther
            }
          }

          if (_self.types == 0) {
            // 新增
            _self.tableDatas.push(form)
          } else {
            _self.$set(_self.tableDatas, index, form)
          }

          _self.onClose()
          _self.$emit('changehei')
          _self.$emit('getTableDatas', _self.tableDatas)
        } else {
          _self.$message.error(errorMessage)
        }
      }, 300)
    },
    // 编辑弹窗打开
    edit (val, obj, index) {
      const _self = this
      const objs = JSON.parse(JSON.stringify(obj))
      _self.isOneself = 0
      _self.index = index
      _self.types = 1
      _self.visible = true
      _self.idedit = false
      _self.birthDisabled = false
      _self.hideRequiredMark = false
      _self.valueSelect = null
      _self.valueInput = ''

      _self.radiovalue = objs.adisCondition
      // 根据当前情况设置死亡原因、死亡日期的只读
      _self.isDeath = objs.currentSituation == _self.Enum.CURRENTSITUATION.SW
      // 是否是监护人标识赋值
      this.ifGuardianFlag = objs.ifGuardian == this.Enum.YESNO.SHI

      // 如果身份证号有值，则出生日期只读
      if (objs.idCard && objs.idCard != '') {
        _self.birthDisabled = true
      }
      if (index == 0) {
        // 本人数据
        _self.isOneself = 1
      }
      objs.deathDate = objs.deathDate ? moment(objs.deathDate) : null
      objs.birthday = objs.birthday ? moment(objs.birthday) : null
      objs.infectionTime = objs.infectionTime
        ? moment(objs.infectionTime)
        : null
      this.$nextTick(() => {
        _self.form.setFieldsValue(objs)
        // 与儿童关系 回显
        this.valueSelect = objs.relationship
        if (objs.relationship == this.Enum.RELATION.QT) {
          this.$nextTick(() => {
            this.valueInput = objs.relationshipOther
          })
        }
        _self.typeDataProcess(
          'ILLNESSTYPE',
          objs.illnessType,
          objs.illnessTypeOther,
          'illnessType'
        )
      })
    },
    // 查看弹窗打开
    see (val, obj, index) {
      const _self = this
      const objs = JSON.parse(JSON.stringify(obj))
      _self.index = index
      _self.types = 2
      _self.visible = true
      _self.idedit = true
      _self.birthDisabled = true
      _self.hideRequiredMark = true
      _self.valueSelect = null
      _self.valueInput = ''

      _self.radiovalue = objs.adisCondition

      objs.deathDate = objs.deathDate ? moment(objs.deathDate) : null
      objs.birthday = objs.birthday ? moment(objs.birthday) : null
      objs.infectionTime = objs.infectionTime
        ? moment(objs.infectionTime)
        : null

      this.$nextTick(() => {
        _self.form.setFieldsValue(objs)
        // 与儿童关系 回显
        this.valueSelect = objs.relationship
        if (objs.relationship == this.Enum.RELATION.QT) {
          this.$nextTick(() => {
            this.valueInput = objs.relationshipOther
          })
        }

        _self.typeDataProcess(
          'ILLNESSTYPE',
          objs.illnessType,
          objs.illnessTypeOther,
          'illnessType'
        )
      })
    },
    // 删除
    deletes (val, obj, index) {
      const _self = this
      _self.tableDatas.splice(index, 1)
      _self.$emit('getTableDatas', _self.tableDatas)
    },
    // 根据选择的当前情况控制死亡日期、死亡原因的只读
    setDeath (e) {
      if (e == this.Enum.CURRENTSITUATION.SW) { // 当前情况为死亡时，死亡日期、死亡原因非只读
        this.isDeath = true
      } else { // 当前情况为非死亡时，死亡日期、死亡原因只读
        this.isDeath = false
        this.form.setFieldsValue({
          deathDate: null,
          deathReason: null
        })
      }
    },
    // 患病类型
    chose (filed, dataname, title) {
      // 抽屉打开时清空缓存数据、
      this.selection = []
      this.othername = ''
      this.otherval = ''
      this.labelval = ''
      this.defaultval = ''
      const { index } = this
      this.type = dataname
      if (index != this.tableDatas.length + 1) {
        // 非新增
        if (this.tableDatas[index][filed]) {
          this.defaultval = this.tableDatas[index][filed]
        } else {
          this.defaultval = ''
        }
        if (this.tableDatas[index][`${filed}Other`]) {
          this.otherval = this.tableDatas[index][`${filed}Other`]
        } else {
          this.otherval = ''
        }
      }

      this.choseshow = true
      this.filed = filed
      this.name = name
      this.title = title
    },
    // 患病类型抽屉取消
    handleCancel () {
      this.choseshow = false
    },
    // 患病类型抽屉确定
    handleOk () {
      const obj = {
        filed: this.filed,
        val: this.selection,
        othername: this.othername,
        otherval: this.otherval,
        labelval: this.labelval
      }
      //   this[`${ obj.filed }Data`] = obj.val
      const { index } = this
      let str = ''
      // 判斷是不是其他
      if (obj.otherval == '') {
        str = obj.labelval
        if (index == this.tableDatas.length + 1) {
          // 新增
          this.choselist[`${obj.filed}Other`] = ''
        } else {
          this.tableDatas[index][`${obj.filed}Other`] = ''
        }
      } else {
        str = obj.labelval + obj.otherval
        if (index == this.tableDatas.length + 1) {
          // 新增
          this.choselist[`${obj.filed}Other`] = obj.otherval
        } else {
          this.tableDatas[index][`${obj.filed}Other`] = obj.otherval
        }
      }
      this.form.setFieldsValue({
        [obj.filed]: str
      })
      if (index == this.tableDatas.length + 1) {
        // 新增
        this.choselist[`${obj.filed}`] = obj.val
        this.choselist[`${obj.filed}Label`] = str // 列表展示用（暂时没展示）
      } else {
        this.tableDatas[index][`${obj.filed}`] = obj.val
        this.tableDatas[index][`${obj.filed}Label`] = str // 列表展示用（暂时没展示）
      }

      this.choseshow = false
    },
    // 获取患病类型、特教类型字典数据，并进行赋值（code为字典编码，val为数据值，name为字段名）
    typeDataProcess (code, val, otherval, name, compare = (a, b) => a === b) {
      let list = []
      let attr = []
      let showData = ''
      const _self = this
      _self.choselist[name] = val
      _self.choselist[`${name}Other`] = otherval

      list = _self[`${name}List`]
      if (val && val.length > 0) {
        attr = val.split(',')
        attr.forEach((val, index) => {
          list.forEach((item, index) => {
            if (compare(item.value, val)) {
              showData = showData + item.label + ','
            }
          })
        })
      }
      if (showData != '') {
        showData = showData.substring(0, showData.length - 1)
      }
      _self.choselist[`${name}Label`] = showData
      if (name == 'illnessType') {
        if (val == _self.Enum.ILLNESSTYPE.QT) {
          showData = showData + '：'
          _self.form.setFieldsValue({
            illnessType: showData + (otherval || '')
          })
        } else {
          _self.form.setFieldsValue({ illnessType: showData })
        }
      }
    },
    idCardValid (rule, value, callback) {
      const _self = this
      if (value == '') {
        _self.birthDisabled = false
      }
      this.idCardValidate(rule, value, callback, _self)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.form.setFieldsValue({
        sex: sex,
        birthday: moment(birth)
      })
      this.setAgeByBirth(birth)
      this.birthDisabled = true
    },
    setAgeByBirth (e) {
      this.post('/orphansDisabledChildrenApi/getAgeByBirthday', {
        birthday: e
      }).then(res => {
        if (res.serviceSuccess) {
          this.form.setFieldsValue({
            age: res.data.data
          })
        }
      })
    },
    // 与儿童关系设置验证提示
    setErrorMessage (newval) {
      let errmsg = null
      if (!(this.isOneself == 0 ? this.idedit : true)) {
        if (newval && newval.length > 20) {
          errmsg = '最大输入20个字符'
        } else if (!newval) {
          errmsg = '请输入其他关系'
        }
        this.form.setFields({
          relationship: errmsg
            ? {
              errors: [{ message: errmsg }]
            }
            : null
        })
      }

      return errmsg
    }
  },
  watch: {
    valueInput: function (newval, oldval) {
      this.setErrorMessage(newval)
    },
    valueSelect: function (newval, oldval) {
      if (newval != this.Enum.RELATION.QT) {
        this.setErrorMessage('1')
      } else {
        this.setErrorMessage(this.valueInput)
      }
    },
    visible: function (newval, oldval) {
      if (newval == false) { // 抽屉关闭时重置患病类型等公共抽屉及残疾类别
        this.choselist = {}
        this.disabilityTypeValues = []
      }
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.addbtn {
  margin-right: 94%;
}
.btnlist span {
  cursor: pointer;
}
.otherClass {
  margin-left: 25%;
}
.otherClass1 {
  margin-left: 45%;
  margin-top: -8%;
  position: absolute;
}
</style>
