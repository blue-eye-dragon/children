<template>
  <div @click="allvalidator">
    <div class="visitbtn"
         v-if="!disabled">
      <ta-button type="primary"
                 class="addbtn"
                 @click="addAdoption">新增</ta-button>
      <ta-popconfirm title="确定删除吗?"
                     @confirm="Batchdeletion"
                     okText="确定"
                     cancelText="取消">
        <ta-button type="danger"
                   :disabled="isdisabled">批量删除</ta-button>
      </ta-popconfirm>
    </div>
    <div>
      <ta-table bordered
                class="tables"
                :customRow="(record,index)=>({on:{dblclick:()=>{see('',record,index)}}})"
                :columns="tableColumns"
                :dataSource="showlist"
                :rowSelection="rowSelection">
        <span slot="num"
              slot-scope="val,obj,index">
          <span>{{ size * (page - 1) + index + 1 }}</span>
        </span>
        <div slot="idCard"
             slot-scope="val,obj,index">
          <span>{{!disabled?obj.idCard:obj.smIdCard}}</span>
          <!-- <span>{{val?val.substr(0,4)+'***'+val.substr(14,val.length):'-'}}</span> -->
        </div>
        <span slot="sex"
              slot-scope="val,obj">
          <span>{{ obj.sex | sexfilter}}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="see(val,obj,index)"
                class='com_textsee'>查看</span>
          <span @click="edit(val,obj,index)"
                v-if="!disabled"
                class='com_textedit'>编辑</span>
          <ta-popconfirm title="确定删除吗?"
                         @confirm="deletes(val,obj,index)"
                         okText="确定"
                         cancelText="取消"
                         v-if="!disabled">
            <span class='com_textdel'>删除</span>
          </ta-popconfirm>
        </div>
      </ta-table>
      <ta-pagination class='pagination'
                     showSizeChanger
                     showQuickJumper
                     @showSizeChange="showSizeChange"
                     @change="pagechange"
                     :total="total" />
    </div>
    <ta-drawer title="其他社会关系"
               width="500"
               placement="right"
               @close="onClose"
               :visible="visible"
               :getContainer="setContainer"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="类型"
                      v-show='false'
                      :fieldDecoratorOptions="{initialValue: '5'}"
                      fieldDecoratorId="typeRelation"
                      :labelCol="{ span: 6 }">
          <ta-input placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit"
                    maxlength='72'
                    placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item label="关系"
                      fieldDecoratorId="relationship"
                      :fieldDecoratorOptions="rules.relationship"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit"
                     placeholder="请选择关系"
                     @change="relationshipchange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in relationList"
                              :disabled="item.disabled"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="其他"
                      v-if='ishiderelationship'
                      fieldDecoratorId="relationshipOther"
                      :fieldDecoratorOptions="rules.relationshipOther"
                      :labelCol="{ span: 6 }">
          <ta-input placeholder="请输入其他关系"
                    maxlength='50'
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="证件类型"
                      fieldDecoratorId="memberIdType"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择证件类型' }]}"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{ span: 18 }">
          <ta-select placeholder="请选择证件类型"
                     :disabled='idedit'
                     @change="idCardTypeChange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in idCardTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="证件号码"
                      v-if='!idedit'
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: true, message: '请输入证件号码' },{validator:idCardValid}]}"
                      ref='idCard'>
          <ta-input :disabled='idedit'
                    maxlength='18'
                    placeholder="请输入证件号码" />
        </ta-form-item>
        <ta-form-item label="证件号码"
                      v-else
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{ required: true, message: '请输入证件号码' },{validator:idCardValid}]}"
                      ref='idCard'>
          <ta-input :disabled='idedit'
                    maxlength='18'
                    placeholder="请输入证件号码" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.sex">
          <ta-select :disabled="idedit"
                     placeholder="请选择性别">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId='contactNumber'
                      :fieldDecoratorOptions="rules.contactNumber">
          <ta-input placeholder="请输入联系电话"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    maxlength='17'
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="工作单位或家庭住址"
                      fieldDecoratorId="workUnit"
                      :fieldDecoratorOptions="rules.workUnit">
          <ta-input :disabled="idedit"
                    maxlength='50'
                    placeholder="请输入工作单位或家庭住址" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click.stop="subfamily"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import localList from '@component/common/js/mixins/localList'
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
    title: '姓名',
    dataIndex: 'name',
    width: '30%',
    overflowTooltip: true
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '24%'
  },
  {
    title: '关系',
    dataIndex: 'relationship',
    collectionType: 'RELATION',
    width: '24%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'smIdCard',
  //   width: '170px'
  //   // scopedSlots: { customRender: 'smIdCard' }
  // },
  {
    title: '工作单位或家庭住址',
    dataIndex: 'workUnit',
    overflowTooltip: true,
    width: '180px'
  },
  {
    title: '联系电话',
    dataIndex: 'contactNumber',
    overflowTooltip: true,
    width: '30%'
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
  mixins: [localList],
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    adoptorChildrenVos: {
      type: Array,
      required: true
    },
    idCardTypeList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      selectRelation: null, // 与儿童关系选择的数据
      errMsg: null, // 身份证号错误信息
      rules: {
        name: this.verificationRules('姓名', 72),
        idCard: this.verificationRules('身份证号', { type: 'idCard' }),
        sex: this.verificationRules('性别'),
        contactNumber: this.phoneRule(true),
        // contactNumber: this.verificationRules('联系电话', { type: 'phone' }),
        relationship: this.verificationRules('关系'),
        workUnit: this.verificationRules('工作单位或家庭住址', 50),
        relationshipOther: this.verificationRules('其他关系', 50)
      },
      tablename: 'adoptorChildrenVos',
      sexList: [],
      relationList: [],
      ishiderelationship: false,
      isvalidator: false
    }
  },
  mounted () {
    this.getsex()
    this.getrelation()
  },
  activated () {
    this.visible = false
    this.ishiderelationship = false
    this.selectRelation = null
    this.isvalidator = false
  },
  methods: {
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    subfamily () {
      this.isvalidator = false
      this.errMsg = this.form.getFieldError('idCard')
      this.form.validateFields((err, values) => {
        const datas = this.form.getFieldsValue()
        if (!err) {
          const data = this.form.getFieldsValue()
          this.changetime(data)
          if (data.memberIdType == '01') {
            data.smIdCard = data.idCard.slice(0, 6) + '******' + data.idCard.slice(-3, data.idCard.length)
          } else {
            data.smIdCard = data.idCard
          }

          if (this.key == 1) {
            // 新增
            const newData = [...this[this.tablename]]
            newData.unshift(data)
            this.$emit('chaadoptorChildrenVos', this.tablename, newData)
          } else {
            // 修改
            const e = parseFloat(this.nowindex + ((this.page - 1) * this.size))
            data.id = this.keyid
            this.$emit('chaadoptorChildrenVos', this.tablename, data, e)
          }
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    idCardTypeChange () {
      this.form.setFieldsValue({
        idCard: undefined
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
      this.$emit('pagechange')
    },
    relationshipchange (val) {
      this.ishiderelationship = val == 99
    },
    // 设置一组输入控件的值、Error与是否只读
    setFieldsByForm (formName, fieldName, errors, value) {
      if (fieldName) {
        this[formName].setFields({
          [fieldName]: {
            value: value,
            errors: errors ? [{ message: errors }] : null
          }
        })
      }
    },
    async getrelation () {
      this.relationList = await this.getDictionaries('RELATION')
      this.relationList.map(item => {
        item.disabled = item.value == this.Enum.RELATION.FQ || item.value == this.Enum.RELATION.MQ || item.value == this.Enum.RELATION.BR
      })
    },
    async getsex () {
      const data = await this.getDictionaries('sex')
      this.sexList = data
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 增加
    addAdoption () {
      this.selectRelation = null
      this.ishiderelationship = false
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.key = 1
      this.visible = true
      this.idedit = false
      this.fileList = []
      this.$nextTick(() => {
        this.form.resetFields()
        this.form.setFieldsValue({
          memberIdType: '01'
        })
      })
    },
    // 日期处理
    dateprocessing (data) {
      this.ishiderelationship = data.relationship == 99
      data.birthday = this.moment(data.birthday, 'YYYY-MM-DD')
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const idtext = this.form.getFieldsValue().memberIdType
      if (!this.isvalidator) {
        callback()
      } else {
        if (idtext == '01') {
          this.idCardValidate(rule, value, callback, this)
        } else {
          this.otherCardrules(rule, value, callback, this)
        }
      }
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }
      if (birth) {
        this.form.setFieldsValue({
          birthday: moment(birth),
          sex: sex
        })
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
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
.visitbtn {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}
</style>
