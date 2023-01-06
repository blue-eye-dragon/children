<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div ref="oneout"
           style="transition:all 0.5s;width:100%;height:80px;border-bottom: 20px solid #e4e4e4">
        <ta-form layout="inline"
                 ref="one"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-row>

            <ta-col :span="8"
                    v-show="isExpand">
              <ta-form-item label="使用年度"
                            class="spilwid"
                            fieldDecoratorId="useYear"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-year-picker style="width:100%" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8"
                    v-show="isExpand">
              <ta-form-item label="下拨日期"
                            class="spilwid"
                            fieldDecoratorId="allocateTime"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-range-picker @change="onSelectTime" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8"
                    v-show="isExpand">
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
                  <ta-form-item :labelCol="{span:0}"
                                :wrapperCol="{span: 24}"
                                fieldDecoratorId="allocateTotalSumEnd">
                    <ta-input-number style="width: 100%"
                                     :precision="2"
                                     :min="minRehabilitation"
                                     @blur="comparChange('1')" />
                  </ta-form-item>
                </ta-col>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="文件标题"
                            class="spilwid"
                            fieldDecoratorId="fileTitle"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-input placeholder="请输入文件标题" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="文件编号"
                            class="spilwid"
                            fieldDecoratorId="fileCode"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-input placeholder="请输入文件编号" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item>
                <div class="searchButton">
                  <ta-button type="primary"
                             class="search"
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
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
        <div class="searchbtn"></div>
        <div style="height: 50px;">
          <ta-button type="primary"
                     icon='plus'
                     style="float: right;"
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
                  v-if="obj.state =='01'"
                  class="com_textedit">编辑</span>
            <span @click="see(text,obj,index)"
                  v-if="obj.state =='02'"
                  class="com_textsee">查看</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.state =='01'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <!-- <span @click="dels(text,obj,index)" v-if="obj.state =='0' || obj.state =='2'">删除</span> -->
            <div slot="status"
                 slot-scope="val, obj, index">
              <span :class="statusClass(val)">{{CollectionLabel('WELFAREFUNDREGISTERSTATE',val)}}</span>
            </div>
          </a>
        </ta-table>
      </div>
      <div slot="footer">
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
    align: 'center',
    // collectionType: 'WELFAREFUNDREGISTERSTATE',
    width: '9.4%',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
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
        mixGetDataListURL: '/orphanLivingExpensesAllocate/list', // 数据列表接口，API地址
        mixAddURL: '', // 数据新增接口，API地址
        mixDeleteURL: '/orphanLivingExpensesAllocate/updateDelStateById', // 数据删除接口，API地址
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
      type: '',
      isExpand: false,
      issearch: false
      // diseasetypeList: []
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch)
    // this.getchildmedicaltypeList()
    // this.routeWatchMange()
  },
  methods: {
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.WELFAREFUNDREGISTERSTATE.WTJ:// 未提交
          classValue = 'com_tobesubmitted'
          break
        case this.Enum.WELFAREFUNDREGISTERSTATE.YTJ:// 已提交
          classValue = 'com_adopt'
          break
      }
      return classValue
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 40 + 'px'
          document.getElementsByClassName('searchbtn')[0].style.marginTop = this.$refs[ref].$el.offsetHeight - 105 + 'px'
        } else {
          node.style.height = '70px'
          document.getElementsByClassName('searchbtn')[0].style.marginTop = this.$refs[ref].$el.offsetHeight - 20 + 'px'
        }
        node.style.transition = 'all 1s'
      })
    },
    // 新增
    add () {
      this.$router.push({
        name: 'registrationOrphanFund',
        query: {
          goType: 'registrationFund-adds'
        }
      })
    },
    // 编辑
    edit (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        // name: 'registrationOrphanFundTwo',
        name: 'registrationOrphanFund',
        query: {
          obj: str,
          index: index,
          goType: 'registrationFund-edit'
        }
      })
    },
    // 查看
    see (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'registrationOrphanFundTwoDetail',
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
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
        }
      )
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
      return formData
    },
    onSelectTime (date, dateString) {
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
