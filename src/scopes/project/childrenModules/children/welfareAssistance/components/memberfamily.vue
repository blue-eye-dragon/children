<template>
  <div>
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
      <ta-table class="tables"
                :columns="tableColumns"
                :dataSource="showlist"
                :rowSelection="rowSelection"
                bordered>
        <span slot="num"
              slot-scope="val,obj,index">
          <span>{{ size * (page - 1) + index + 1 }}</span>
        </span>
        <span slot="sex"
              slot-scope="val,obj">
          <span>{{ obj.sex | sexfilter}}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="see(val,obj,index)"
                class="com_textsee">查看</span>
          <template v-if="obj.relationship!=0&&obj.relationship!=1">
            <span @click="edit(val,obj,index)"
                  v-if='!disabled'
                  class="com_textedit">编辑</span>
          </template>

          <!-- <ta-divider type="vertical" />
          <ta-popconfirm title="确定删除吗?" @confirm="deletes(val,obj,index)" okText="确定" cancelText="取消">
          <span>删除</span>
          </ta-popconfirm> -->
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"
                     class='pagination'
                     showSizeChanger
                     showQuickJumper
                     @showSizeChange="showSizeChange"
                     @change="pagechange"
                     :total="total" />
    </div>
    <ta-drawer title="家庭成员信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               id="content"
               layout="horizontal">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit"
                    placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item label="与主照料人关系"
                      fieldDecoratorId="relationship"
                      :fieldDecoratorOptions="rules.relationship"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     placeholder="请选择与主照料人关系">
            <ta-select-option :value="item.value"
                              :disabled="item.value==Enum.FAMILYRELATIONS.BRHZ||item.value==Enum.FAMILYRELATIONS.PO"
                              v-for="(item,index) in familyrelationsList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.sex">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     placeholder="请选择性别">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.idCard">
          <ta-input :disabled="idedit"
                    placeholder="请输入身份证号"
                    @blur="idcardchange" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :fieldDecoratorOptions="rules.birthday">
          <ta-date-picker :disabled="true"
                          style="width: 100%;"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="文化程度"
                      fieldDecoratorId="educationLevel"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.educationLevel">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     placeholder="请选择文化程度">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in cultureList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.nation">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     placeholder="请选择民族">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="国籍"
                      fieldDecoratorId="nationality"
                      :fieldDecoratorOptions="rules.nationality">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     placeholder="请选择国籍">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationalityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <Health :disabled="idedit"
                :drawer="'content'"
                :labelwidth="{label:6,wrapper: 18}"
                :heathmodel="heathmodel"
                @setheath="setheath"></Health>
        <ta-form-item label="职业"
                      fieldDecoratorId="profession"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.profession">
          <ta-select :disabled="idedit"
                     :getPopupContainer="setPopupContainer"
                     placeholder="请选择职业">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in occupattioList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="单位或学校"
                      fieldDecoratorId="workUnit"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.workUnit">
          <ta-input :disabled="idedit"
                    placeholder="请输入单位或学校" />
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactNumber"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.contactNumber">
          <ta-input :disabled="idedit"
                    placeholder="请输入联系电话" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import localList from '@component/common/js/mixins/localList'
import Health from '@component/common/components/health'
import moment from 'moment'
// import filtermixin from '@component/common/js/mixins/filtermixin'
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
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday'
  },
  {
    title: '单位/学校',
    dataIndex: 'workUnit'
  },
  // {
  //   title: '健康状况',
  //   dataIndex: 'healthCondition'
  // },
  {
    title: '与主照料人关系',
    dataIndex: 'relationship',
    collectionType: 'FAMILYRELATIONS'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [localList],
  props: {
    listFamilyMember: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Health
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      rules: {
        name: this.verificationRules('姓名', 72),
        relationship: this.verificationRules('与主照料人关系'),
        sex: this.verificationRules('性别'),
        birthday: this.verificationRules('出生日期', true),
        educationLevel: this.verificationRules('文化程度'),
        nation: this.verificationRules('民族'),
        nationality: this.verificationRules('国籍'),
        profession: this.verificationRules('职业'),
        workUnit: this.verificationRulesNotMustFill('联系电话', 72),
        contactNumber: this.verificationRulesNotMustFill('联系电话', { type: 'phone' }),
        //  {validateTrigger: 'blur', rules: [{ required: true, message: '请输入联系电话'}, { type: 'phone', message: '请输入正确联系电话'}]},
        idCard: this.verificationRules('身份证号', { type: 'idCard' })
      },
      tablename: 'listFamilyMember',
      addressmodel: [],
      sexList: [],
      nationList: [],
      cultureList: [],
      occupattioList: [],
      nationalityList: [],
      familyrelationsList: [],
      heathmodel: []
    }
  },
  mounted () {
    this.getsex()
    this.getnation()
    this.getCulture()
    this.getnationality()
    this.getOccupattion()
    this.getfamilyrelations()
  },
  activated () {
    this.visible = false
  },
  methods: {
    setPopupContainer (trigger) {
      return document.getElementById('content')
    },
    Batchdeletion () {
      let isok = false
      this.chose_data.map(item => {
        if (item.relationship == 0 || item.relationship == 1) {
          isok = true
        }
      })
      if (isok) {
        this.$message.error('不能删除主照料人和配偶信息')
        return false
      }
      // console.log(this.rowSelection.selectedRowKeys)
      let index = 0
      this.rowSelection.selectedRowKeys.map(item => {
        let e = parseFloat((item - index) + ((this.page - 1) * this.size))
        this.$emit('chaadoptorChildrenVos', this.tablename, null, e)
        index++
      })
    },
    idcardchange (value) {
      let val = value.target.value
      let data = this.go(val, val.length, this, null)
      if (data.birth) {
        this.form.setFieldsValue({
          birthday: moment(data.birth)
        })
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // DEGREEEDUCATION 文化程度
    async getCulture () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // NATIONALITY 國籍
    async getnationality () {
      let data = await this.getDictionaries('NATIONALITY')
      this.nationalityList = data
    },
    // 职业 OCCUPATION
    async getOccupattion () {
      let data = await this.getDictionaries('OCCUPATION')
      this.occupattioList = data
    },
    // FAMILYRELATIONS
    async getfamilyrelations () {
      let data = await this.getDictionaries('FAMILYRELATIONS')
      this.familyrelationsList = data
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    setheath () {
      this.form.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    // 日期处理
    dateprocessing (data) {
      data.birthday = this.moment(data.birthday, 'YYYY-MM-DD')
      let arr = data.healthCondition.split(',')
      data.healthCondition = arr
      this.heathmodel = arr
      //   this.addressmodel = [data.censusRegisterPro, data.censusRegisterCity, data.censusRegisterCounty]
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 16px;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
</style>
