<template>
  <!-- 训练计划 tadrawer tb3-->
  <div class="searchdata">
    <div>
      <div v-if="!notShow"
           class="visitbtn">
        <ta-popconfirm title="确定删除吗?"
                       @confirm="dels"
                       @cancel="cancel"
                       okText="确定"
                       cancelText="取消">
          <ta-button style=" margin-right: 15px;"
                     type="danger">删除</ta-button>
        </ta-popconfirm>

        <ta-button type="primary"
                   @click="adds(1,'')">新增</ta-button>
      </div>

      <ta-table bordered
                v-if="!notShow"
                class="tables table-min-width"
                :columns="tableColumns"
                :dataSource="mixDataList"
                :rowSelection="mixRowSelection">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="birthday"
              slot-scope="a">
          <span>{{a.substring(0,10)}}</span>
        </span>

        <div slot="action"
             slot-scope="val,obj"
             class="btnlist">
          <span v-if="!notShow"
                @click="adds(2,obj)"
                class="com_textedit">编辑</span>
          <span @click="adds(3,obj)"
                class="com_textsee">查看</span>
        </div>
      </ta-table>
      <ta-table bordered
                v-if="notShow"
                class="tables table-min-width"
                :columns="tableColumns"
                :dataSource="mixDataList"
                :showOverflowTooltip="true">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="birthday"
              slot-scope="a">
          <span>{{a.substring(0,10)}}</span>
        </span>

        <div slot="action"
             slot-scope="val,obj"
             class="btnlist">
          <span v-if="!notShow"
                @click="adds(2,obj)"
                class="com_textedit">编辑</span>
          <span @click="adds(3,obj)"
                class="com_textsee">查看</span>
        </div>
      </ta-table>
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
    <ta-drawer :title="oneTitle"
               width="610px"
               :closable="false"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="训练目标"
                      fieldDecoratorId="trainingGoal"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnmustKeep }]}">
          <ta-textarea :disabled="noEdit"
                       :rows="4"
                       placeholder="请输入训练目标" />
        </ta-form-item>

        <ta-form-item label="训练计划名称"
                      fieldDecoratorId="trainingProgramName"
                      :fieldDecoratorOptions="rules.checkName">
          <ta-input :disabled="noEdit"
                    placeholder="请输入训练计划名称" />
        </ta-form-item>
        <ta-form-item label="计划制定人"
                      fieldDecoratorId="planner"
                      :fieldDecoratorOptions="verificationRules('计划制定人',72)">
          <ta-input :disabled="noEdit"
                    placeholder="请输入计划制定人" />
        </ta-form-item>
        <ta-form-item label="训练开始日期"
                      fieldDecoratorId="trainingStartDate"
                      :require="{message:'请选择训练开始日期'}">
          <ta-date-picker :disabledDate="disabledStartDate"
                          format="YYYY-MM-DD"
                          v-model="startValue"
                          @openChange="handleStartOpenChange"
                          :disabled="noEdit"
                          style="width: 100%;"
                          placeholder="请选择训练开始日期" />
        </ta-form-item>
        <ta-form-item label="训练结束日期"
                      fieldDecoratorId="trainingEndDate"
                      :require="{message:'请选择训练结束日期'}">
          <ta-date-picker :disabledDate="disabledEndDate"
                          format="YYYY-MM-DD"
                          v-model="endValue"
                          :open="endOpen"
                          @openChange="handleEndOpenChange"
                          :disabled="noEdit"
                          style="width: 100%;"
                          placeholder="请选择训练结束日期" />
        </ta-form-item>
      </ta-form>
      <div style="height: auto;">
        <ta-alert :hidden="errorTip"
                  :message="errorTipText"
                  type="error"
                  @close="onCloses"
                  showIcon />

        <ta-button :disabled="noEdit"
                   @click="newRow"
                   type="primary"
                   style="left: 86%;">新增</ta-button>

        <ta-table bordered
                  :columns="columnsTow"
                  :dataSource="tableDataTow">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <ta-table-edit slot="trainingNumber"
                         type="inputNumber"
                         @change="changeData"
                         :row-editable="noEdit"></ta-table-edit>
          <ta-table-edit slot="trainingMode"
                         type="select"
                         :option="wayList1"
                         :row-editable="noEdit"
                         @change="changeData"></ta-table-edit>
          <div slot="actionTow"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="!noEdit"
                  @click="fnRowDelete(obj,index)">删除</span>
            <span v-else
                  style="color: #0202026b;">删除</span>
          </div>
        </ta-table>
      </div>

      <div slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button v-if="!noEdit"
                   key="submit"
                   type="primary"
                   @click="submit()">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { format } from 'path'
import moment from 'moment'
import { nextTick } from 'q'

const columnsTow = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '康复训练方式',
    dataIndex: 'trainingMode',
    width: 200,
    scopedSlots: { customRender: 'trainingMode' },
    overflowTooltip: true
  },
  {
    title: '康复训练次数',
    dataIndex: 'trainingNumber',
    width: 150,
    scopedSlots: { customRender: 'trainingNumber' },
    overflowTooltip: true
  },

  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'actionTow',
    width: 150,
    scopedSlots: { customRender: 'actionTow' }
  }
]

const tempData = []
for (let i = 0; i < 1; i++) {
  tempData.push({
    trainingNumber: '',
    trainingMode: ''
  })
}
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '计划制定人',
    width: '33%',
    dataIndex: 'planner'
  },
  {
    title: '训练开始日期',
    width: '33%',
    dataIndex: 'trainingStartDate'
  },
  {
    title: '训练结束日期',
    width: '34%',
    dataIndex: 'trainingEndDate'
  },

  {
    title: '操作',
    overflowTooltip: false,
    width: '200',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const tableData = [
  {
    name2: '9846841874561574654865000',
    name: '哈喽',
    trainingMode: '22',

    chairmanName: '2019-12-1',
    4: '好学生',
    birthday: '1994.8',
    action: 0
  },
  {
    key: '2',
    sex: '2',
    name: '小孩',
    age: 42,
    address: 'London No. 1 Lake Park',
    action: 0
  },
  {
    key: '3',
    sex: '0',
    name: '儿童',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    action: 1
  }
]

export default {
  moment,
  mixins: [listMixin],
  props: {
    ids: {
      type: String,
      required: false
    },
    notShow: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      rules: {
        checkName: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '训练计划名称' },
            { validator: this.checkNames }
          ]
        }
      },
      tableColumns,
      tableData,
      mixDataList: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/trainingPlan/list', // 数据列表接口，API地址
        mixAddURL: '/trainingPlan/save', // 新增接口
        mixEditURL: '/trainingPlan/update', // 编辑接口
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: false // 是否需要筛选
      },
      mixPageRef: 'gridPager',

      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      selectIdList: '',
      educationalBackgroundList: [],
      visible: false,
      noEdit: false,
      oneTitle: '添加',
      // ---
      tableDataTow: [],
      columnsTow,
      wayList: [], // 康复训练方式字典
      wayList1: [], // 康复训练方式字典（实际使用）
      tip: false,
      errorTip: true,
      errorTipText: '',
      cosol: '',
      html: ''
    }
  },
  watch: {
    startValue (val) { },
    endValue (val) { }
  },
  activated () {
    this.userPageParams()
    this.getXXXXList()
  },
  mounted () {
    this.geteducationalBackgroundList()

    this.getXXXXList()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    fnmustKeep (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '训练目标', value, callback)
    },

    async checkNames (rule, value, callback) {
      this.tip = false
      if (!value || value == '') {
        callback()
        return false
      }
      if (value.length < 73) {
        let params = {}
        if (this.cosol == '2') {
          params = {
            rehabiliteId: this.ids,
            trainingProgramName: value,
            id: this.id
          }
        } else {
          params = { rehabiliteId: this.ids, trainingProgramName: value }
        }
        const result = await this.post(
          '/trainingPlan/verifyTrainingProgramName',
          params
        )

        if (!result.data.data) {
          this.tip = true
          callback('此训练计划名称已存在，请重新录入')
        } else {
          callback()
        }
      } else {
        this.tip = true
        callback('最大输入72个字符')
      }
    },
    async checkName () {
      this.tip = false
      const name = this.form.getFieldsValue().trainingProgramName
      if (name) {
        const names = { rehabiliteId: this.ids, trainingProgramName: name }
        const res = await this.post('/trainingPlan/list', names)

        if (res.data.pageBean.currentSize != 0) {
          this.tip = true

          this.form.setFieldsValue({ trainingProgramName: '' })
        } else {
          this.tip = false
        }
      }
    },
    async getXXXXList () {
      const data = await this.getDictionaries('REHABILITTRAININGMODE')
      this.wayList = data
    },
    changeData ({ newData, record, columnKey }) {
      // 将单元格数据修改为新值（newData：返回改变的值、record：该行的行数据、columnKey：该列的key）
      record[columnKey] = newData
      if (columnKey != 'trainingNumber') {
        this.filt()
      } else {
        if (
          parseInt(newData) <= 0 ||
          parseInt(newData) > 999 ||
          !parseInt(newData)
        ) {
          this.$nextTick(() => {
            this.errorTipText = '康复训练次数请输入0至4位正整数'
            this.errorTip = false
          })

          this.tableDataTow.forEach(e => {
            if (e.trainingNumber == newData) {
              e.trainingNumber = ''
            }
          })
        } else {
          this.errorTipText = ''
          this.errorTip = true
        }
      }
    },
    fnTableChange (dataSource) {
      // 将返回有editable属性的表格数据，赋给表格
      this.tableDataTow = dataSource
    },
    filt () {
      const arr = []
      this.tableDataTow.map(item => {
        arr.push(item.trainingMode)
      })

      this.wayList1.map(item => {
        if (arr.includes(item.value)) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
    },
    fnRowDelete (val, deleteId) {
      // 删除行
      this.tableDataTow = this.tableDataTow.filter(
        item => item != this.tableDataTow[deleteId]
      )
      this.filt()
    },
    back () {
      this.$router.go(-1)
    },
    newRow () {
      // 添加行
      this.tableDataTow.push({ trainingMode: '', trainingNumber: '' })
    },
    // 学历
    async geteducationalBackgroundList () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.educationalBackgroundList = data
    },
    onClose () {
      this.form.resetFields()
      this.tableDataTow = []
      this.errorTip = true
      this.visible = false
    },
    async dels () {
      let idAll = ''
      this.selectIdList.forEach(item => {
        idAll += item.id + ','
      })

      idAll = idAll.substring(0, idAll.length - 1)
      const par = {
        id: idAll
      }
      const until = await this.post('/trainingPlan/updateDelStateById', par)

      if (!until.errors) {
        this.handleSubmit()
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.mixRowSelection.selectedRowKeys = selectedRowKeys
      this.selectIdList = selectedRows
    },
    async adds (types, obj) {
      this.wayList1 = JSON.parse(JSON.stringify(this.wayList))
      this.errorTip = true
      this.html = ''
      this.tip = false
      this.cosol = types
      if (types == 2) {
        // 编辑
        this.tableDataTow = []
        this.oneTitle = '编辑'
        this.noEdit = false
        this.id = obj[this.idkey]
        this.visible = true
        this.nowtype = 2
        const result = await this.post('/trainingPlan/queryById', { id: obj.id })
        const str = JSON.stringify(obj)
        const data = JSON.parse(str)
        this.$nextTick(() => {
          this.tableDataTow = result.data.data.trainingProgramVo
          this.filt()
          this.form.setFieldsValue(result.data.data)
          this.form.setFieldsValue({
            trainingStartDate: moment(result.data.data.trainingStartDate),
            trainingEndDate: moment(result.data.data.trainingEndDate)
          })
        })
      }
      if (types == 3) {
        this.tableDataTow = []
        // 查看
        this.oneTitle = '查看'
        this.noEdit = true
        this.id = obj[this.idkey]
        this.visible = true
        this.nowtype = 2
        this.$nextTick(() => {
          obj = this.other(obj)
          // 其他操作
          this.tableDataTow = obj.trainingProgramVo
          this.form.setFieldsValue(obj)
          this.form.setFieldsValue({
            trainingStartDate: moment(obj.trainingStartDate),
            trainingEndDate: moment(obj.trainingEndDate)
          })
        })
      }
      if (types == 1) {
        this.tableDataTow = []
        this.oneTitle = '新增'
        this.noEdit = false
        this.nowtype = 1
        this.visible = true
        this.tableDataTow.push({ trainingMode: '', trainingNumber: '' })
      }
    },

    addother (obj) {
      obj.rehabiliteId = this.ids // 添加相应的康复id

      const someList = []
      this.tableDataTow.forEach(element => {
        someList.push(element)
      })
      obj.trainingProgramVo = JSON.parse(JSON.stringify(this.tableDataTow))

      return obj
    },
    async submit () {
      this.form.validateFields(async (err, values) => {
        const submitData = this.tableDataTow
        console.log(submitData)
        if (submitData) {
          submitData.forEach((e, index) => {
            if (!e.trainingMode || !e.trainingNumber) {
              this.errorTipText = '请完整填写康复训练方式和次数!'
              this.errorTip = false
              // })
              err = '请完整填写康复训练方式和次数!'
            }
          })
        } else {
          this.errorTipText = '请完整填写康复训练方式和次数!'
          this.errorTip = false
          err = '请完整填写康复训练方式和次数!'
        }

        if (this.tip) {
          err = '名称'
        }

        if (!err) {
          let url = ''
          let text = ''
          let params = this.form.getFieldsValue()
          this.changetime(params)
          if (this.nowtype == 1) {
            // 新增
            url = this.mixListOptions.mixAddURL
            text = '增加成功'
          } else {
            // 编辑
            text = '修改成功'
            url = this.mixListOptions.mixEditURL
            params[this.idkey] = this.id
          }
          params = this.addother(params)
          const data = await this.post(url, params, true)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()
            if (
              this.mixListOptions.mixActivatedIsNeed &&
              this.mixListOptions.mixGetDataListIsPage
            ) {
              this.handleSubmit()
            } else if (
              this.mixListOptions.mixActivatedIsNeed &&
              !this.mixListOptions.mixGetDataListIsPage
            ) {
              this.getlist()
            }
            this.fileList = []
            this.tableDataTow = tempData
          }
        }
      })
    },
    onCloses () {
      this.errorTip = false
      this.errorTipText = ''
    },
    onClosesTow () {
      this.tip = false
    },
    add () {
      this.$router.push({
        path: 'checkBodyInfo',
        query: {}
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const paramss = {
        rehabiliteId: this.ids
      }
      return paramss
    },

    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
