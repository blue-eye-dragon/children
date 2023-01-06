 <template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   class="searchfroms"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="资金发放类型"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}"
                          class="spilwid"
                          fieldDecoratorId="childType">
              <ta-select class="selectwid"
                         placeholder="请选择儿童类别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in childrenTypeList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button @click="resetFrom"
                           icon="reload"
                           class="btnleft reset">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增配置</ta-button>
          <!-- <ta-button class="btnleft"
          @click="back">返回</ta-button>-->
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :customRow="fnCustomRow"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="startReceiveDate"
                slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee"
                  @click="look(obj)">查看</span>
            <span class="com_textedit"
                  @click="edit(obj)">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(text,obj,index)"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
    <ta-modal :title="flag=='add'?'新增配置':flag=='edit'?'编辑':'查看'"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
              height="315px"
              width="600px">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row>
          <ta-col :span="24">
            <ta-form-item label="资金发放类型"
                          fieldDecoratorId="childType"
                          :require="{message:'请选择资金发放类型'}">
              <ta-select class="selectwid"
                         placeholder="请选择儿童类别"
                         :disabled="disabled || isedit"
                         @change="changeType">
                <ta-select-option v-for="(item,index) in childrenTypeList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="发放年度"
                          fieldDecoratorId="issuingYear"
                          :require="{message:'请选择发放年度'}">
              <ta-year-picker style="width:100%"
                              :disabled="disabled || isedit" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="发放周期"
                          fieldDecoratorId="issuingCycle"
                          :require="{message:'请选择发放周期'}">
              <ta-select class="selectwid"
                         placeholder="请选择发放周期"
                         :disabled="disabled || isedit">
                <ta-select-option v-for="(item,index) in issuingCycleList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="发放金额"
                          fieldDecoratorId="costOfLiving"
                          :require="{message:'请输入发放金额）'}">
              <ta-input-number :disabled="disabled"
                               :min="1.00"
                               :max="999999.99"
                               :placeholder="'请输入发放金额'"
                               :precision="2"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <!-- <ta-col :span="24"
                  v-if="issuingType == '2'">
            <ta-form-item label="季发放标准（元/人）"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="costOfLivingQuarter">
              <ta-input-number :min="1.00"
                               :max="999999.99"
                               :disabled="disabled"
                               :placeholder="'请输入发放金额'"
                               :precision="2"
                               style="width:100%" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24"
                  v-if="issuingType == '3'">
            <ta-form-item label="月发放标准（元/人）"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="costOfLivingMonth">
              <ta-input-number :min="1.00"
                               :max="999999.99"
                               :disabled="disabled"
                               :placeholder="'请输入发放金额'"
                               :precision="2"
                               style="width:100%" />
            </ta-form-item>
          </ta-col> -->
        </ta-row>
      </ta-form>
    </ta-modal>
    <!-- <ta-modal
      title="新增配置"
      :visible="isshow"
      @ok="handleOk"
      @cancel="handleCancel"
      height="315px"
      width="600px"
    >
      <ta-form layout="horizontal" :autoFormCreate="(form)=>{this.form = form}">
        <ta-row>
          <ta-col :span="24">
            <ta-form-item label="资金发放类型" fieldDecoratorId="childType">
              <ta-select class="selectwid" placeholder="请选择儿童类别">
                <ta-select-option
                  v-for="(item,index) in childrenTypeList"
                  :value="item.value"
                  :key="index"
                >{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="发放金额（元）" fieldDecoratorId="costOfLiving">
              <ta-input-number
                :min="1.00"
                :max="999999.99"
                :placeholder="'请输入发放金额'"
                :precision="2"
                style="width:100%"
              />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="发放年度" fieldDecoratorId="issuingYear">
              <ta-year-picker
               style="width:100%"/>
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </ta-modal> -->
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import poorFamiliesChildrenChangeInfoVue from '../../collection/poorFamiliesChildren/poorFamiliesChildrenChangeInfo.vue'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '资金发放类型',
    dataIndex: 'name',
    align: 'center',
    width: '30%',
    collectionType: 'FUNDISSUETYPE'
  },
  {
    title: '发放年度',
    align: 'center',
    dataIndex: 'issuingYear',
    width: '20%'
  },
  {
    title: '发放周期',
    align: 'center',
    dataIndex: 'issuingCycle',
    width: '20%',
    collectionType: 'ISSUINGCYCLE'
  },
  {
    title: '发放金额',
    align: 'center',
    dataIndex: 'costOfLiving',
    width: '20%'
  },
  // {
  //   title: '发放标准（元）',
  //   children: [
  //     {
  //       title: '年度',
  //       dataIndex: 'costOfLiving',
  //       width: '10%'
  //     },
  //     {
  //       title: '季度',
  //       dataIndex: 'costOfLivingQuarter',
  //       width: '10%'
  //     },
  //     {
  //       title: '月度',
  //       dataIndex: 'costOfLivingMonth',
  //       width: '10%'
  //     }
  //   ]
  // },
  {
    title: '配置时间',
    align: 'center',
    dataIndex: 'configTime',
    width: '30%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 220,
    scopedSlots: { customRender: 'action' }
  }
]
const childrenTypeList = [
  { label: '社会散居孤儿', value: '201' },
  { label: '福利机构养育孤弃儿童', value: '202' },
  { label: '福利机构代养困境儿童', value: '199' },
  { label: '民间机构养育孤弃儿童', value: '203' },
  { label: '艾滋病病毒感染儿童', value: '300' },
  { label: '集中供养事实无人抚养儿童', value: '121' },
  { label: '社会散居事实无人抚养儿童', value: '120' },
  { label: '孤儿助学工程', value: '205' },
  { label: '其他（孤儿）', value: '999' }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      // issuingType: '',
      isedit: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        // mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/WelfareConfig/list', // 数据列表接口，API地址
        mixDeleteURL: '/WelfareConfig/updateDelStateById', // 删除数据列表接口，API地址
        mixGetDataListIsPage: true // 数据列表接口，是否需要分页？
      },
      mixDataList: [],
      issuingCycleList: [],
      mixPageRef: 'gridPager',
      disabled: false, // 只读控制
      visible: false, // 弹窗控制显隐
      childrenTypeList, // 资金发放类型字典数据
      investigationList: [], // 发放周期字典数据
      id: '', // 列表id
      flag: 'add' // 操作flag，区分新增（add）、编辑（edit）、查看（look）
    }
  },
  activated () {
    this.isedit = false
    // this.issuingType = ''
    this.getissuingCycle()
  },
  mounted () {
    this.loadData()
    this.getissuingCycle()
  },
  watch: {
    mixDataList (newValue, oldValue) {
      this.mixDataList.forEach((item) => {
        this.childrenTypeList.forEach((val) => {
          if (item.childType == val.value) {
            item.name = val.label
          }
        })
      })
    }
  },
  methods: {
    // getMenuDatas () {
    //   this.getMenu('ISSUINGCYCLE', 'investigationList') // 获取儿童情况字典数据
    // },
    // // 获取字典数据 code为字典编码，name为对应vue对象
    // getMenu (code, name) {
    //   let _self = this
    //   _self.post('codetable/getCode', { codeType: code }).then((res) => {
    //     if (res.serviceSuccess) {
    //       res.data.codeList.sort(function (a, b) {
    //         return parseInt(a.value) - parseInt(b.value)
    //       })
    //       _self[name] = res.data.codeList
    //     }
    //   })
    // },
    // 初始化数据
    async loadData () {
      this.page = 1
      this.size = 10
      const res = await this.post('/WelfareConfig/list', {
        pageNumber: this.page,
        pageSize: this.size
      })
      this.mixDataList = res.data.pageBean.list
    },
    // handleChange (e) {
    //   this.issuingType = e
    // },
    // async changeTime (date, dateString) {
    //   const childData = this.form.getFieldValue('childType')
    //   console.log(dateString, 88)
    //   if (childData) {
    //     const res = await this.post('', {
    //       issuingYear: dateString,
    //       childType: childData
    //     })
    //   } else {
    //     this.$message.error('请选择资金发放类型')
    //   }
    // },
    changeType (e) {
    },
    async deletes (val, obj, index) {
      const params = {
        id: obj.id,
        childType: obj.childType,
        issuingYear: obj.issuingYear
      }
      const data = await this.post(this.mixListOptions.mixDeleteURL, params)
      if (data.errors === null) {
        this.$message.success('删除成功')
        this.page = 1
        this.size = 10
        this.handleSubmit()
      }
    },
    async getissuingCycle () {
      const data = await this.getDictionaries('ISSUINGCYCLE')
      this.issuingCycleList = data
    },
    // 编辑
    edit (e) {
      this.visible = true
      this.flag = 'edit'
      this.id = e.id
      // 加载列表数据
      this.$nextTick(() => {
        this.loadListData()
      })
    },
    // 查看
    look (e) {
      this.visible = true
      this.flag = 'look'
      this.id = e.id
      // 加载列表数据
      this.$nextTick(() => {
        this.loadListData()
      })
    },
    add () {
      this.visible = true
      this.flag = 'add'
      this.disabled = false
      this.isedit = false
      this.form.resetFields()
    },
    // 加载列表数据
    async loadListData () {
      this.form.resetFields()
      this.disabled = false
      this.isedit = false
      if (this.flag == 'look') {
        // 查看
        this.disabled = true
      }
      if (this.flag == 'edit') {
        // 查看
        this.isedit = true
      }
      const res = await this.post('/WelfareConfig/queryById', { id: this.id })
      if (res.serviceSuccess) {
        //  this.childrenTypeList.forEach((item) => {
        //    if (item.value == res.data.data.childType) {
        //      res.data.data.childType = item.label
        //    }
        //  })
        res.data.data.issuingYear = moment(res.data.data.issuingYear)
        //  if (res.data.data.childType == '205') {
        //    this.isshow = true
        //  } else {
        //    this.isshow = false
        //  }
        this.$nextTick(() => {
          this.form.setFieldsValue(res.data.data)
        })
      }
    },
    // 弹窗确定
    handleOk () {
      if (this.flag == 'look') {
        this.visible = false
        return
      }
      this.form.validateFields((err, value) => {
        if (!err) {
          // 编辑的接口
          if (this.flag == 'edit') {
            const formData = this.form.getFieldsValue()
            formData.issuingYear = this.form.getFieldValue('issuingYear').format('YYYY')
            formData.id = this.id
            this.childrenTypeList.forEach((item) => {
              if (item.label == formData.childType) {
                formData.childType = item.value
              }
            })
            this.post('/WelfareConfig/update', formData).then((res) => {
              if (res.serviceSuccess) {
                this.$message.success('数据更新成功!')
                this.loadData()
                this.visible = false
              }
            })
          }
          // 新增的接口
          if (this.flag == 'add') {
            const formData = this.form.getFieldsValue()
            formData.issuingYear = this.form.getFieldValue('issuingYear').format('YYYY')
            this.post('/WelfareConfig/save', formData).then((res) => {
              if (res.serviceSuccess) {
                this.$message.success('数据添加成功!')
                this.loadData()
                this.visible = false
              }
            })
          }
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },

    // 弹窗取消
    handleCancel () {
      this.form.resetFields()
      this.visible = false
      // this.isshow = false
    },
    // 分页change
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
</style>
