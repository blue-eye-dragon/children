<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="文件标题"
                        class="spilwid"
                        fieldDecoratorId="fileTitle"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入文件标题" />
          </ta-form-item>
          <ta-form-item label="文件编号"
                        class="spilwid"
                        fieldDecoratorId="fileCode"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入文件编号" />
          </ta-form-item>
          <ta-form-item label="使用年度"
                        class="spilwid"
                        fieldDecoratorId="useYear"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-year-picker style="width:100%" />
          </ta-form-item>
          <ta-form-item label="下拨日期"
                        class="spilwid"
                        fieldDecoratorId="allocateTime"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-range-picker @change="onSelectTime" />
          </ta-form-item>
          <ta-form-item label="下拨金额(元)"
                        class="spilwid spilwidnoright"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-col :span="10">
              <ta-form-item :wrapperCol="{span: 24}"
                            fieldDecoratorId="allocateTotalSumStart">
                <ta-input-number style="width: 100%"
                                 :min="0"
                                 :max="maxRehabilitation"
                                 :precision="2"
                                 @blur="comparChange('0')" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="4">
              <span :style="{ display: 'inline-block', width: '100%', textAlign: 'center' }">至</span>
            </ta-col>
            <ta-col :span="10">
              <ta-form-item :wrapperCol="{span: 24}"
                            fieldDecoratorId="allocateTotalSumEnd">
                <ta-input-number style="width: 100%"
                                 :precision="2"
                                 :min="minRehabilitation"
                                 @blur="comparChange('1')" />
              </ta-form-item>
            </ta-col>
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
          </ta-form-item>
        </ta-form>
        <div class="visitbtn">
          <ta-button type="primary"
                     @click="add">资金下拨登记</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="action"
             class="btnlist"
             slot-scope="text,obj,index">
            <span @click="edit(text,obj,index)"
                  v-if="obj.state =='01'">编辑</span>
            <span @click="see(text,obj,index)"
                  v-if="obj.state =='02'">查看</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.state =='01'">
              <span>删除</span>
            </ta-popconfirm>
            <!-- <span @click="dels(text,obj,index)" v-if="obj.state =='0' || obj.state =='2'">删除</span> -->
          </a>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
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
    title: '文件编号',
    dataIndex: 'fileCode',
    width: '9.4%'
  },
  {
    title: '文件标题',
    dataIndex: 'fileTitle',
    width: '9.4%'
  },
  {
    title: '下拨单位总数',
    dataIndex: 'allocateUnitTotalSum',
    width: '9.4%'
  },
  {
    title: '下拨总金额(元)',
    dataIndex: 'allocateTotalSum',
    width: '9.4%'
  },
  {
    title: '使用年度',
    dataIndex: 'useYearStr',
    scopedSlots: { customRender: 'useYearStr' },
    width: '9.4%'
  },
  {
    title: '下拨日期',
    dataIndex: 'allocateTime',
    width: '9.4%'
  },
  {
    title: '登记单位',
    dataIndex: 'orgName',
    width: '10%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' },
    width: '9.4%'
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    collectionType: 'WELFAREFUNDREGISTERSTATE',
    width: '9.4%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'revoke',
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/troubledChildAllocate/list', // 数据列表接口，API地址
        mixAddURL: '', // 数据新增接口，API地址
        mixDeleteURL: '/troubledChildAllocate/updateDelStateById', // 数据删除接口，API地址
        mixEditURL: '' // 数据编辑接口，API地址
      },
      isdisabled: true,
      visible: false,
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      minRehabilitation: 0,
      maxRehabilitation: 999,
      disabled: false,
      gotype: false,
      nowtype: '',
      type: ''
    }
  },
  mounted () {
  },
  activated () {
    // this.getchildmedicaltypeList()
  },
  methods: {
    // 新增
    add () {
      this.$router.push({
        name: 'registrationFund',
        query: {
          type: this.type,
          goType: 'registrationFund-adds'
        }
      })
    },
    // 编辑
    edit (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'registrationFund',
        query: {
          obj: str,
          index: index,
          goType: 'registrationFund-edit'
        }
      })
    },
    // 编辑反显
    // other (obj) {
    //   let str = JSON.stringify(obj)
    //   let data = JSON.parse(str)
    //   data.reachAccountTime = moment(data.reachAccountTime, 'YYYY-MM-DD')
    //   data.useYear = moment(data.useYear, 'YYYY')
    //   return data
    // },
    // 查看
    see (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'registrationFundTwoDetail',
        query: {
          obj: str,
          index: index,
          goType: 'registrationFund-detail'
        }
      })
    },
    // 提交
    async submit (e) {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let formData = this.form.getFieldsValue()
          this.changetime(formData)
          let params = {}
          let url = ''
          let text = ''
          params = { ...formData }
          if (e == '1') {
            // 保存
            let saveType = '1'
            params.saveType = saveType
            text = '保存成功'
          } else if (e == '2') {
            // 提交
            let saveType = '2'
            params.saveType = saveType
            text = '提交成功'
          }
          if (this.nowtype == '1') {
            url = this.mixListOptions.mixAddURL
          } else {
            url = this.mixListOptions.mixEditURL
            text = '修改成功'
            params.id = this.id
          }
          await this.post(url, params).then(res => {
            console.log(res)
            if (res.serviceSuccess == true) {
              this.visible = false
              this.$message.success(text)
              this.handleSubmit()
              this.gotype = false
            }
          })
        }
      })
    },
    // 删除
    async dels (text, obj, index) {
      await this.post(this.mixListOptions.mixDeleteURL, { id: obj.id }).then(
        res => {
          console.log(res)
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
        }
      )
      console.log(obj)
    },
    // 抽屉关闭
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
      this.gotype = false
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      console.log(formData)
      return formData
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    // 比较大小
    comparChange (e) {
      let inputStart = this.searchForm.getFieldValue('allocateTotalSumStart')
      let inputEnd = this.searchForm.getFieldValue('allocateTotalSumEnd')
      this.$nextTick(() => {
        if (e == '0') {
          if (inputStart != undefined) {
            this.maxRehabilitation = inputEnd
            this.minRehabilitation = inputStart
          }
        }
        if (e == '1') {
          if (inputEnd != undefined) {
            this.minRehabilitation = inputStart
            this.maxRehabilitation = inputEnd
          }
        }
      })
    }
    // 状态类型
    // async getchildmedicaltypeList () {
    //   let data = await this.getDictionaries('WELFAREFUNDREGISTERSTATE')
    //   this.getchildmedicalList = data
    // }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.batchfrom {
  position: relative;
  width: 100%;
  height: 100%;
}
.boms {
  width: 100%;
  height: 58px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-right: 20px;
}
.spilwidnoright .ant-form-item {
  margin-right: 0;
}
</style>
