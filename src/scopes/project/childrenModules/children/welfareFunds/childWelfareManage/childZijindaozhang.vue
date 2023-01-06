<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   class="formWidth"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="使用年度"
                              class="spilwid"
                              fieldDecoratorId="useYear"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-year-picker style="width:100%"
                                  placeholder="请选择使用年度" />
                </ta-form-item>

                <ta-form-item label="文件编号"
                              class="spilwid1"
                              fieldDecoratorId="fileCode"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入文件编号" />
                </ta-form-item>
                <ta-form-item label="资金类型"
                              class="spilwid"
                              fieldDecoratorId="fundType"
                              :fieldDecoratorOptions="{initialValue: ''}"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择资金类型">
                    <ta-select-option value="">全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in fundTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="文件标题"
                              class="spilwid"
                              fieldDecoratorId="fileTitle"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入文件标题" />
                </ta-form-item>

                <ta-form-item label="到账日期"
                              style="width:400px"
                              fieldDecoratorId="reachAccountTime"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>

                <ta-form-item label="到账金额(元)"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">

                  <ta-form-item style="width: 34%;"
                                fieldDecoratorId="reachAccountMoneyStart">
                    <ta-input-number style="width:110%"
                                     :min="0"
                                     :max="999999999999"
                                     :precision="2"
                                     @blur="comparChange('1')" />
                  </ta-form-item>

                  <span style="width:4%;margin-right: 3%;">至</span>

                  <ta-form-item style="width: 32%;"
                                fieldDecoratorId="reachAccountMoneyEnd">
                    <ta-input-number style="width:140%"
                                     :precision="2"
                                     :min="minRehabilitation"
                                     :max="999999999999"
                                     @blur="comparChange('0')" />
                  </ta-form-item>

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
          <ta-button type="primary"
                     icon="plus"
                     @click="add">本级配套资金登记</ta-button>
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
          <span slot="action"
                class="btnlist"
                slot-scope="text,obj,index">
            <span @click="edit(text,obj,obj)"
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

          </span>
          <div slot="status"
               slot-scope="val, obj, index">
            <span :class="statusClass(val)">{{CollectionLabel('WELFAREFUNDREGISTERSTATE',val)}}</span>
          </div>
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
    <ta-drawer title="本级配套资金登记"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="文件编号"
                      fieldDecoratorId="fileCode"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.fileCode">
          <ta-input placeholder="请输入文件编号"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="文件标题"
                      fieldDecoratorId="fileTitle"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.fileTitle">
          <ta-input placeholder="请输入文件标题"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="资金类型"
                      fieldDecoratorId="fundType"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.fundTypeList">
          <ta-select placeholder="请选择资金类型"
                     :disabled="disabled">
            <ta-select-option v-for="(item,index) in fundTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="到账金额(元)"
                      fieldDecoratorId="reachAccountMoney"
                      :labelCol="{ span: 8 }"
                      :wrapperCol="{span:16}"
                      :require="{message:'请输入到账金额'}">
          <ta-input-number style="width: 100%;"
                           :precision="2"
                           :min="0"
                           :max="9999999999.99"
                           placeholder="请输入到账金额"
                           :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="使用年度"
                      fieldDecoratorId="useYear"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择使用年度'}">
          <ta-year-picker style="width: 100%;"
                          placeholder="请选择使用年度"
                          @change="disabledYear"
                          :disabled="disabled" />
          <!-- :valid-now-time="'right'" 无效 -->
        </ta-form-item>
        <ta-form-item label="到账日期"
                      fieldDecoratorId="reachAccountTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择到账日期'}">
          <ta-date-picker style="width: 100%;"
                          :valid-now-time="'right'"
                          :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="经办人"
                      fieldDecoratorId="agent"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.agent">
          <ta-input placeholder="请输入经办人"
                    :disabled="disabled" />
        </ta-form-item>
        <ta-form-item label="资金来源"
                      fieldDecoratorId="fundSource"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择资金来源'}">
          <!-- <ta-input placeholder="请输入资金来源" :disabled="disabled" /> -->
          <ta-select placeholder="请选择资金来源"
                     :disabled="disabled">
            <ta-select-option v-for="(item,index) in fundSourceList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button v-if="this.gotype==false"
                   @click="submit('2')"
                   type="primary">提交</ta-button>
        <ta-button v-if="this.gotype==false"
                   @click="submit('1')"
                   type="primary">保存</ta-button>
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
      </div>
    </ta-drawer>
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
  // {
  //   title: '资金来源',
  //   dataIndex: 'fundSource',
  //   collectionType: 'CHILDWELFAREFUNDSOURCE',
  //   width: '10.6%'
  // },
  {
    title: '文件编号',
    dataIndex: 'fileCode',
    width: '10.6%'
  },
  {
    title: '文件标题',
    dataIndex: 'fileTitle',
    width: '10.6%'
  },
  {
    title: '资金类型',
    dataIndex: 'fundType',
    width: '10.6%',
    collectionType: 'CHILDWELFAREFUNDTYPE'
  },
  {
    title: '到账金额(元)',
    dataIndex: 'reachAccountMoney',
    width: '14%'
  },
  {
    title: '使用年度',
    dataIndex: 'useYear',
    scopedSlots: { customRender: 'useYear' },
    width: '10.6%'
  },
  {
    title: '到账日期',
    dataIndex: 'reachAccountTime',
    width: '10.6%'
  },
  // {
  //   title: '登记单位',
  //   dataIndex: 'orgName',
  //   width: '10.6%'
  // },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' },
    width: '10.6%'
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    align: 'center',
    // collectionType: 'WELFAREFUNDREGISTERSTATE',
    width: '10.6%',
    scopedSlots: { customRender: 'status' }
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
        mixGetDataListURL: '/welfareFundReachAccountApi/list', // 数据列表接口，API地址
        mixAddURL: '/welfareFundReachAccountApi/save', // 数据新增接口，API地址
        mixDeleteURL: '/welfareFundReachAccountApi/updateDelStateById', // 数据删除接口，API地址
        mixEditURL: '/welfareFundReachAccountApi/update' // 数据编辑接口，API地址
      },
      isdisabled: true,
      visible: false,
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      minRehabilitation: 0,
      maxRehabilitation: 999999999999999,
      disabled: false,
      gotype: false,
      nowtype: '',
      fundSourceList: [],
      fundTypeList: [],
      rules: {
        fileCode: this.verificationRules('文件编号', 20),
        fileTitle: this.verificationRules('文件标题', 20),
        // fundSource: this.verificationRules('资金来源', 1),
        agent: this.verificationRules('经办人', 72),
        fundTypeList: this.verificationRules('资金类型')
      },
      issearch: false
    }
  },
  mounted () {
  },
  activated () {
    // this.getchildmedicaltypeList()
    this.getfundSourceList()
    this.getfundTypeList()
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    disabledYear (a, b) {
      let year = moment().year()
      if (Math.abs(b - year) > 100) {
        this.$message.error('请选择当前年前后100年的年度')
        this.$nextTick(() => {
          this.form.setFieldsValue({
            useYear: null
          })
        })
      }
    },
    // 增加按钮
    add () {
      this.fileList = []
      this.idedit = false
      this.visible = true
      this.nowtype = 1
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
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
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 编辑反显
    other (obj) {
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      data.reachAccountTime = moment(data.reachAccountTime, 'YYYY-MM-DD')
      data.useYear = moment(data.useYear, 'YYYY')
      return data
    },
    // 查看
    see (text, obj, index) {
      this.visible = true
      this.disabled = true
      this.gotype = true
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      data.reachAccountTime = moment(data.reachAccountTime, 'YYYY-MM-DD')
      data.useYear = moment(data.useYear, 'YYYY')
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
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
            // text = '修改成功'
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
      let inputStart = this.searchForm.getFieldValue('reachAccountMoneyStart')
      let inputEnd = this.searchForm.getFieldValue('reachAccountMoneyEnd')
      this.$nextTick(() => {
        if (e == '0') {
          if (inputStart != undefined) {
            this.maxRehabilitation = inputEnd
            this.minRehabilitation = inputStart
          } else {
            this.maxRehabilitation = 999999999999999
            this.minRehabilitation = 0
          }
        }
        if (e == '1') {
          if (inputEnd != undefined) {
            this.minRehabilitation = inputStart
            this.maxRehabilitation = inputEnd
          }
        }
      })
    },
    // 资金来源类型
    async getfundSourceList () {
      let data = await this.getDictionaries('CHILDWELFAREFUNDSOURCE')
      this.fundSourceList = data
    },
    // 资金fundType
    async getfundTypeList () {
      let data = await this.getDictionaries('CHILDWELFAREFUNDTYPE')
      this.fundTypeList = data
    }
  }
}
</script>

<style scoped lang="less">
</style>
