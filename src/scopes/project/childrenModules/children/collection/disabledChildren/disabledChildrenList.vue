<template>
  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">

              <ta-input placeholder="请输入姓名" />

            </ta-form-item>

            <ta-form-item label="身份证号"
                          fieldDecoratorId="idCard"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">

              <ta-input placeholder="请输入身份证号" />

            </ta-form-item>

            <ta-form-item class="spilwid">

              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>

          </ta-form>
        </div>

        <div class="operateBtn radioClass">
          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">

            <ta-radio-button value="0">暂存列表</ta-radio-button>
            <ta-radio-button value="1">登记在册列表</ta-radio-button>

          </ta-radio-group>
          <div style="float:right">
            <ta-button v-if="nowkey=='0'"
                       class="exportbtn"
                       icon="upload"
                       @click="exports">导出</ta-button>
            <ta-modal :centered="false"
                      style="top: 25%;"
                      :visible="showOn"
                      @ok="Excel"
                      @cancel="handleCancel">
                <div>
                  <h3>确认导出查询条件下的全部有效数据吗？</h3>
                </div>
            </ta-modal>
          </div>
        </div>

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>

          <span slot="num"
                slot-scope="a, b, c">

            <span>{{ size * (page - 1) + c + 1 }}</span>

          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">

            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="nowkey=='1'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">编辑</span>
            <span v-if="nowkey=='0'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">信息确认</span>
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
                       ref="gridPager" />

      </div>

    </ta-border-layout>

    <div>
      <ta-drawer title="退出"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="退出原因"
                        fieldDecoratorId="exitReason"
                        :fieldDecoratorOptions="this.verificationRules('退出原因', 200,true)">
            <ta-textarea :placeholder="orSee?'':'请输入退出原因'"
                         :disabled='orSee'
                         style="height: 150px;"> </ta-textarea>
          </ta-form-item>

          <ta-form-item label="退出日期"
                        fieldDecoratorId="exitTime"
                        :require="{message:'请选择退出日期'}">
            <ta-date-picker :placeholder="orSee?'':'请选择退出日期'"
                            :disabled='orSee'
                            :disabledDate="disabledDate" />
          </ta-form-item>
          <ta-form-item label="id"
                        hidden
                        fieldDecoratorId="id">
            <ta-input />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button v-if="orSee"
                     key="back"
                     @click="onClose">返回</ta-button>
          <ta-button v-if="!orSee"
                     key="back"
                     @click="onClose">取消</ta-button>
          <ta-button v-if="!orSee"
                     key="submit"
                     type="primary"
                     @click="submit()">确定</ta-button>

        </div>
      </ta-drawer>
    </div>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns1 = [{
  title: '序号',
  dataIndex: 'num',
  align: 'center',
  width: '80px',
  scopedSlots: { customRender: 'num' }
},

{
  title: '姓名',
  width: '25%',
  dataIndex: 'name',
  overflowTooltip: true
},

{
  title: '身份证号',
  width: '25%',
  dataIndex: 'idCard',
  align: 'center',
  overflowTooltip: true
},
{
  title: '接收时间',
  width: '25%',
  align: 'center',
  dataIndex: 'receiveTime',
  overflowTooltip: true
},

{
  title: '操作',
  width: '200px',

  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}
]
const mixColumns2 = [{
  title: '序号',
  dataIndex: 'num',
  align: 'center',
  width: '80px',
  scopedSlots: { customRender: 'num' }
},
{
  title: '儿童编号',
  width: '22%',
  dataIndex: 'childNumber',
  overflowTooltip: true
},
{
  title: '姓名',
  width: '22%',
  dataIndex: 'name',
  overflowTooltip: true
},
{
  title: '性别',
  width: '20%',
  align: 'center',
  dataIndex: 'sex',
  collectionType: 'SEX',
  overflowTooltip: true
},
{
  title: '出生日期',
  width: '22%',
  dataIndex: 'birthday',
  align: 'center',
  overflowTooltip: true
},
{
  title: '上报日期',
  width: '22%',
  align: 'center',
  dataIndex: 'reportTime',
  overflowTooltip: true
},

{
  title: '操作',
  width: '220px',

  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}
]

export default {
  mixins: [listMixin],
  data () {
    return {
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '620px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL2: 'disabledChildrenNew/list',
        mixGetDataListURL1: '/disabledChildren/list',
        mixGetDataListURL: '/disabledChildren/list', // '/improperCareChildApi/list', // '/worker/list', // 数据列表接口，API地址
        mixActivatedIsNeed: true,
        mixExportURL: '' // 导出接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns1,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: [],
      orSee: false,
      nowkey: '0'
    }
  },
  mounted () {
    let nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getCulture()
    // this.mixDataList = [{ name: '静态数据1' }, { idCard: '史迪仔' }]
  },
  activated () {
    this.mixListOptions.mixGetDataListURL = this.mixListOptions.mixGetDataListURL1
    this.mixColumns = mixColumns1
    console.log(this.Base.getNowPageParam())
    if (this.Base.getNowPageParam()._modulePartId_ == '0') {
      this.nowkey = '0'
    } else {
      this.nowkey = '0'
    }
  },
  methods: {
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    async del (v, o) {
      let res = await this.post('/improperCareChildApi/updateDelStateById', { 'id': o.improperCareChildId })
      if (res.errors) {

      } else {
        this.$message.success('删除成功！')
        this.handleSubmit()
      }
    },
    cancel (e) { },
    goAdd () {
      this.$router.push({
        name: 'disabledChildrenCollection',
        query: {
          jump: 'yes'
        }
      })
    },

    //   ************
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'disabledChildrenCollection',
        query: {
          jump: 'yes',
          id: obj.id,
          disabled: tp,
          nowkey: this.nowkey

        }
      })
    },

    async over (value, obj, index) {
      this.visible = true
      if (index == 'see') {
        this.orSee = true
        let res = await this.post('/improperCareChildApi/queryById', { id: obj.improperCareChildId })
        let data = res.data.data.improperCareChildVo
        if (data) {
          this.$nextTick(() => {
            this.form.setFieldsValue({
              exitTime: data.exitTime ? moment(data.exitTime, 'YYYY-MM-DD') : null,
              exitReason: data.exitReason
            })
          })
        }
      } else { this.orSee = false }

      this.$nextTick(() => {
        this.form.setFieldsValue({ id: obj.improperCareChildId })
      })
    },

    async submit () {
      let param = this.form.getFieldsValue()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          param.exitTime = param.exitTime.format('YYYY-MM-DD')
          let res = await this.post('/improperCareChildApi/saveExitMsg', param)
          if (!res.errors) {
            this.$message.success('操作成功！')
            this.onClose()
            this.handleSubmit()
          }
        }
      })
    },
    typechange (key) {
      this.nowkey = key.target.value
      if (this.nowkey == '0') { // 切换teb时事件。
        this.mixListOptions.mixGetDataListURL = this.mixListOptions.mixGetDataListURL1
        this.mixColumns = mixColumns1
      } else {
        this.mixListOptions.mixGetDataListURL = this.mixListOptions.mixGetDataListURL2
        this.mixColumns = mixColumns2
      }
      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey
      formData.childType = this.nowkey
      this.changetime(formData)
      return formData
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      let endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 文化程度
    async getCulture () {
      let data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },

    changeAge (date, dateString) {
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: this.age ? this.age : ''
        })
      })
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()

      this.namename = ss.name
      this.number = ss.employeeNumber

      this.showOn = true
    },

    handleCancel (e) {
      this.showOn = false
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    exports () {
      this.showOn = true
    },
    Excel () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      let url = '/leftOverChild/exporDisabledChild'
      this.exportFile(url, formData)
      this.showOn = false
    }
  }
}
</script>
