<template>
  <div>
    <div class="visitbtn"
         v-if="!basedisabled">
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
                :columns="tableColumns"
                :dataSource="showlist"
                :rowSelection="rowSelection">
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
          <span @click="edit(val,obj,index)"
                v-if="!basedisabled"
                class="com_textedit">编辑</span>
          <ta-popconfirm title="确定删除吗?"
                         @confirm="deletes(val,obj,index)"
                         okText="确定"
                         cancelText="取消">
            <span class="com_textdel">删除</span>
          </ta-popconfirm>
        </div>
      </ta-table>
      <!-- :dataSource="adoptorChildrenVos" -->
      <ta-pagination class='pagination'
                     showSizeChanger
                     showQuickJumper
                     @showSizeChange="showSizeChange"
                     @change="pagechange"
                     :total="total" />
    </div>
    <ta-drawer title="家庭子女信息"
               width="500"
               placement="right"
               @close="onClose"
               :visible="visible"
               :getContainer="setContainer"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入姓名'" />
        </ta-form-item>
        <ta-form-item label="与申请人关系"
                      fieldDecoratorId="relationship"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择与申请人关系'}">
          <ta-select :disabled="idedit"
                     :placeholder="idedit?'':'请选择与申请人关系'">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in eelationsApplicantsList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.idCard">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入身份证号'"
                    @blur='idCardValid' />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择性别'}">
          <ta-select :disabled="true"
                     placeholder="">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker :disabled="true"
                          style="width: 100%;"
                          placeholder="" />
        </ta-form-item>
        <ta-form-item label="文化程度"
                      fieldDecoratorId="educationLevel"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit"
                     :placeholder="idedit?'':'请选择文化程度'">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in cultureList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择民族'}">
          <ta-select :disabled="idedit"
                     :placeholder="idedit?'':'请选择民族'">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="国籍"
                      fieldDecoratorId="nationality"
                      :require="{message:'请选择国籍'}">
          <ta-select :disabled="idedit"
                     :placeholder="idedit?'':'请选择国籍'">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationalityList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <Health :disabled="idedit"
                :labelwidth="{label: 6,wrapper: 18}"
                :heathmodel="heathmodel"
                @setheath="setheath"></Health>
        <ta-form-item label="职业"
                      fieldDecoratorId="profession"
                      :labelCol="{ span: 6 }">
          <ta-select :disabled="idedit"
                     :placeholder="idedit?'':'请选择职业'">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in occupattioList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <AddressComponent msg="户籍所在地"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"
                          :disabled="idedit"></AddressComponent>
        <ta-form-item label=""
                      fieldDecoratorId="censusRegisterDetail"
                      :fieldDecoratorOptions="rules.censusRegisterDetail"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ span: 18,offset:6 }">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入户籍所在地详细地址'" />
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactNumber"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.contactNumber">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入联系电话'" />
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
import AddressComponent from '@component/common/components/addressComponent'
import Health from '@component/common/components/health'
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
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    // scopedSlots: { customRender: 'sex' }
    collectionType: 'sex'
  },
  {
    title: '民族',
    dataIndex: 'nation',
    collectionType: 'nation'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday'
  },
  {
    title: '与申请人关系',
    dataIndex: 'relationship',
    collectionType: 'FAMILYCHIDRELATIONSHIP' //  FAMILYRELATIONS RELATIONSAPPLICANTS
  },
  {
    title: '身份证号',
    dataIndex: 'idCard'
  },
  {
    title: '联系电话',
    dataIndex: 'contactNumber'
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
    basedisabled: {
      type: Boolean,
      required: true
    },
    adoptorChildrenVos: {
      type: Array,
      required: true
    },
    eelationsApplicantsList: {
      type: Array,
      required: true
    },
    sexList: {
      type: Array,
      required: true
    },
    cultureList: {
      type: Array,
      required: true
    },
    nationList: {
      type: Array,
      required: true
    },
    nationalityList: {
      type: Array,
      required: true
    },
    healthList: {
      type: Array,
      required: true
    },
    occupattioList: {
      type: Array,
      required: true
    }
  },
  // filters: {
  //   // 性别
  //   sexfilter (val) {
  //     let data = that.sexList.find((item) => item.value == val)
  //     return data.label
  //   }
  // },
  components: {
    AddressComponent,
    Health
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      rules: {
        name: { validateTrigger: 'change', rules: [{ required: true, message: '请输入姓名!' }, { max: 72, message: '最大输入72个字符' }] },
        contactNumber: this.verificationRulesNotMustFill('联系电话', { type: 'phone' }),
        //  {validateTrigger: 'blur', rules: [{ required: true, message: '请输入联系电话'}, { type: 'phone', message: '请输入正确联系电话'}]},
        idCard: { validateTrigger: 'blur', rules: [{ required: true, message: '请输入身份证号!' }, { type: 'idCard', message: '请输入正确身份证号' }] },
        // {validateTrigger: 'blur', rules: [{ required: true, message: '请输入身份证号'}, { type: 'idCard', message: '请输入正确身份证号'}]}
        censusRegisterDetail: { validateTrigger: 'change', rules: [{ required: true, message: '请输入户籍所在地详细地址' }, { max: 100, message: '最大输入100个字符' }] },
      },
      tablename: 'adoptorChildrenVos',
      addressmodel: [],
      heathmodel: []
    }
  },
  mounted () {
    console.log(this.adoptorChildrenVos)
  },
  activated () {
    this.visible = false
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    idCardValid (value) {
      let val = value.target.value
      let data = this.go(val, val.length, this, null)
      if (data.birth) {
        this.form.setFieldsValue({
          birthday: moment(data.birth),
          sex: data.sex
        })
      }
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
      this.addressmodel = [data.censusRegisterPro, data.censusRegisterCity, data.censusRegisterCounty]
      let arr = data.healthCondition.split(',')
      this.heathmodel = arr
      data.healthCondition = arr
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
</style>
