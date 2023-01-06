<template>
  <div class='tadrawer'>
    <div class="visitbtn">
      <ta-button type="primary"
                 class="addbtn"
                 v-if="!this.thisP.disabled"
                 @click="addAdoption"
                 style="margin-left:20px">新增</ta-button>
      <ta-popconfirm title="确定删除吗?"
                     @confirm="Batchdeletion"
                     okText="确定"
                     cancelText="取消">
        <ta-button type="danger"
                   :disabled="isdisabled">删除</ta-button>
      </ta-popconfirm>
    </div>
    <ta-table class="tables"
              bordered
              :columns="tableColumns"
              :rowSelection="rowSelection"
              :dataSource="showlist">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <div slot="action"
           slot-scope="val,obj,index"
           class="btnlist">
        <span @click="edit(val,obj,'1')"
              class="com_textedit">查看</span>
      </div>
    </ta-table>

    <ta-drawer :title="key == 1 ? '新增家庭成员信息' : '查看家庭成员信息'"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal"
               id="content">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="rules.name">
          <ta-input placeholder="请输入姓名"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :require="{message:'请选择性别'}">
          <ta-select placeholder="请选择性别"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="rules.idCard">
          <ta-input placeholder="请输入身份证号"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation">
          <ta-select placeholder="请选择民族"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationList"
                              :key="index.childId">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <!-- <ta-form-item label="健康状况"
                      fieldDecoratorId="healthCondition">
          <ta-select placeholder="请选择健康状况"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in health"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item> -->
        
        <Health :disabled="disabled"
                :drawer="'content'"
                :labelwidth="{label: 6,wrapper: 18}"
                :heathmodel="heathmodel"
                @setheath="setheath"></Health>
        <ta-form-item label="单位/学校"
                      :fieldDecoratorOptions="verificationRules('单位/学校',30)"
                      fieldDecoratorId="workUnit">
          <ta-input placeholder="请输入单位/学校"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="与助养人关系"
                      fieldDecoratorId="relationship"
                      :require="{message:'请选择与助养人关系'}">
          <ta-select placeholder="请选择与助养人关系"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in familyRelations"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="disabled"
                          :disabledDate="disabledDate"
                          @change="setAgeByBirth($event,'birthday')"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="国籍"
                      fieldDecoratorId="nationality">
          <ta-select placeholder="请选择国籍"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in nationality"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="文化程度"
                      fieldDecoratorId="educationLevel">
          <ta-select placeholder="请选择文化程度"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in degreeEducation"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="职业"
                      fieldDecoratorId="profession">
          <ta-select placeholder="请选择职业"
                     :disabled="disabled"
                     :getPopupContainer="setPopupContainer">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in occupation"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="contactNumber"
                      :fieldDecoratorOptions="rules.phoneNumber">
          <ta-input placeholder="请输入联系电话"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
                  marginRight: 8,
                }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily1"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import localList from '@component/common/js/mixins/localList'
import Health from '@component/common/components/health'
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    overflowTooltip: true,
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'SEX',
    width: '13%',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '文化程度',
    dataIndex: 'educationLevel',
    // 列表形式加此代码
    collectionType: 'DEGREEEDUCATION',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '职业',
    dataIndex: 'profession',
    collectionType: 'OCCUPATION',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '单位/学校',
    dataIndex: 'workUnit',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '健康状况',
    dataIndex: 'healthCondition',
    collectionType: 'HEALTH',
    overflowTooltip: true,
    width: '13%'
  },
  {
    title: '与助养人关系',
    dataIndex: 'relationship',
    collectionType: 'FAMILYRELATIONS',
    overflowTooltip: true,
    width: '14%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [localList],
  props: {
    notesRecordVos: {
      type: Array
    },
    thisP: {
      required: true
    }
  },
  components: {
    Health
  },
  data () {
    return {
      tableColumns,
      // rowSelection,
      sponsorshipType: [],
      nationList: [],
      occupation: [],
      degreeEducation: [],
      familyRelations: [],
      nationality: [],
      health: [],
      sexList: [],
      heathmodel: [],
      visible: false,
      disabled: false,
      isdisabled: true,
      page: 1,
      size: 100,
      key: 1,
      mixListOptions: {
        mixGetDataListURL: '/sponsorship/list' // 数据列表接口，API地址
      },
      tablename: 'notesRecordVos',
      // mixPageRef: 'gridPager'
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      familyInfor: [],
      rules: {
        idCard: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入身份证号' },
            // { type: 'idCard', message: '请输入正确身份证号' },
            { validator: this.idcardrole }
          ]
        },
        name: this.verificationRules('姓名', 72),
        phoneNumber: this.verificationRules('联系电话', { type: 'phone' })
      }
    }
  },
  // activated () {
  //   console.log(this[this.tablename])
  //   this.$emit('familyChange', this[this.tablename])
  // },
  mounted () {
    this.getsex()
    this.getMenuDatas() // 字典数据
  },
  methods: {
    setheath () {
      this.form.setFieldsValue({
        healthCondition: this.heathmodel
      })
    },
    setPopupContainer (trigger) {
      return document.getElementById('content')
    },
    edit (val, obj, tp) {
      this.key = 2
      let str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.disabled = true
      this.heathmodel = obj.healthCondition ? obj.healthCondition.split(',') : []
      delete obj.healthCondition
      if (obj.birthday) {
        obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    moment,
    disabledDate (current) {
      // 不能选择今天以及今天以前的日期
      return current && current > moment().endOf('day')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 多选
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      this.familyInfor = val2
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
      this.disabled = false
    },
    gorecord () {
      console.log('新增')
    },
    // 获取性别
    async getsex () {
      let data = await this.getDictionaries('SEX')
      console.log(data)
      this.sexList = data
    },
    getMenuDatas () {
      this.getMenu('NATION', 'nationList') // 获取民族字典数据
      this.getMenu('HEALTH', 'health')
      this.getMenu('NATIONALITY', 'nationality')
      this.getMenu('FAMILYRELATIONS', 'familyRelations') // 与助养人关系
      this.getMenu('DEGREEEDUCATION', 'degreeEducation') // 文化水平
      this.getMenu('OCCUPATION', 'occupation') // 职业
    },
    idcardrole (rule, value, callback) {
      this.idCardValidate(rule, value, callback, this)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.form.setFieldsValue({
        birthday: birth ? moment(birth, 'YYYY-MM-DD') : null,
        sex: sex
      })
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          // 与助养人关系取消本人
          if (name === 'familyRelations') {
            res.data.codeList.splice(0, 1)
          }
          _self[name] = res.data.codeList
        }
      })
    },
    subfamily1 () {
      this.form.validateFields((err, values) => {
        let datas = this.form.getFieldsValue()
        if (!err) {
          let data = this.form.getFieldsValue()
          this.changetime(data)
          if (this.key == 1) {
            // 新增
            let newData = [...this[this.tablename]]
            newData.unshift(data)
            this.$emit('chaadoptorChildrenVos', this.tablename, newData)
          } else {
            // 修改
            let e = parseFloat(this.nowindex + ((this.page - 1) * this.size))
            data.id = this.keyid
            this.$emit('chaadoptorChildrenVos', this.tablename, data, e)
          }
          this.form.resetFields()
          this.visible = false
          this.disabled = false
          this.thisP.setHeight('two', 'twoout', !this.thisP.showtwo)
        }
      })
    },
    addAdoption () {
      console.log(111)
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.key = 1
      this.visible = true
      this.idedit = false
      this.fileList = []
      this.$nextTick(() => {
        this.form.resetFields()
        this.$emit('familyChange', this[this.tablename])
        this.thisP.setHeight('two', 'twoout', !this.thisP.showtwo)
      })
      this.thisP.setHeight('two', 'twoout', !this.thisP.showtwo)
    }
  }
}
</script>
<style lang="less" scoped>
.addbtn {
  margin-right: 15px;
}
</style>
