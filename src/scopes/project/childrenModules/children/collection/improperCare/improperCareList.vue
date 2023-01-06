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
                          class="spilwid3"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">

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

        <div class="operateBtn">
          <div class="radioClass leftClass">
            <ta-radio-group v-model="nowkey"
                            buttonStyle="solid"
                            @change="typechange">

              <ta-radio-button value="1">暂存列表</ta-radio-button>
              <ta-radio-button value="2">登记在册列表</ta-radio-button>
              <ta-radio-button value="3">已退出列表</ta-radio-button>

            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon='plus'
                       style="    float: right;"
                       @click="goAdd">新增</ta-button>
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

            <span v-if="nowkey!=3"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span>
            <span v-else
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看详情</span>
            <span v-if="nowkey!='3'"
                  @click="edit(val,obj,false)"
                  class="com_textedit">编辑</span>

            <!-- <ta-divider v-if="nowkey=='0'"
                        type="vertical" /> -->

            <!-- <span v-if="nowkey=='2'"
                  @click="edit(val,obj,true)"
                  class="com_textsee">查看</span> -->
            <span v-if="nowkey=='2'"
                  @click="over(val,obj,true)"
                  class="com_text_out">退出</span>
            <span v-if="nowkey=='3'"
                  @click="over(val,obj,'see')"
                  class="com_text_see">查看退出原因</span>
            <!-- <span v-if="nowkey=='3'"
                  @click="reOver(val,obj,false)"
                  class="com_publish">恢复</span> -->

            <ta-popconfirm v-if="nowkey=='1'"
                           title="确认删除吗?"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">

              <span v-if="nowkey=='1'"
                    class="com_textdel">删除</span>

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
                        :fieldDecoratorOptions="this.verificationRules('退出原因', 200,false)">
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
const mixColumns = [{
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
  align: 'center'

},
{
  title: '上报日期',
  width: '22%',
  align: 'center',
  dataIndex: 'reportTime'

},

{
  title: '操作',
  width: '240px',

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
        mixGetDataListURL: '/improperCareChildApi/list', // '/worker/list', // 数据列表接口，API地址
        mixActivatedIsNeed: true,
        mixExportURL: '' // 导出接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
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
      nowkey: '1'
    }
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getCulture()
    this.getksList()
  },
  activated () {
    console.log(this.Base.getNowPageParam())
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '1'
    } else {

    }
  },
  methods: {
    disabledDate (current) {
      return current > (moment().endOf('day'))
    },
    async del (v, o) {
      const res = await this.post('/improperCareChildApi/updateDelStateById', { id: o.improperCareChildId })
      if (res.errors) {

      } else {
        this.$message.success('删除成功！')
        this.handleSubmit()
      }
    },
    cancel (e) { },
    goAdd () {
      this.$router.push({
        name: 'improperCareCollection',
        query: {
          jump: 'yes',
          type: 'add'
        }
      })
    },

    //   ************
    async edit (val, obj, tp) {
      this.$router.push({
        name: 'improperCareCollection',
        query: {
          jump: 'yes',
          id: obj.improperCareChildId,
          disabled: tp,
          nowkey: this.nowkey,
          type: 'edit'
        }
      })
    },

    // over (value, obj, index) {
    //   this.visible = true
    //   this.$nextTick(() => {
    //     this.form.setFieldsValue({ id: obj.leftOverChildId })
    //   })
    // },
    async over (value, obj, index) {
      this.visible = true
      if (index == 'see') {
        this.orSee = true
        const res = await this.post('/improperCareChildApi/queryById', { id: obj.improperCareChildId })
        const data = res.data.data.improperCareChildVo
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

    // async  reOver (value, obj, tp) {
    //   // 接口未 2020年1月18日15:32:00
    //   let chenck = await this.post('/LeftOverChild/getTroubleChildMsgByChildId', { 'id': obj.id })
    //   if (chenck.data.data == 1) {
    //     this.$message.error('该儿童处于待提交恢复状态或正在监护中，不允许再次恢复')
    //   } else {
    //     this.$router.push({
    //       name: 'stayAtHomeCollection',
    //       query: {
    //         jump: 'yes',
    //         id: obj.leftOverChildId,
    //         disabled: tp,
    //         url: '/LeftOverChild/restoreGuardianship'
    //       }
    //     })
    //   }
    // },

    // async reOver (value, obj, tp) {
    //   this.$router.push({
    //     name: 'improperCareCollection',
    //     query: {
    //       jump: 'yes',
    //       id: obj.troubleChildId,
    //       disabled: tp,
    //       url: '/difficultiesChildren/restoreGuardianship'
    //     }
    //   })
    // },
    async submit () {
      const param = this.form.getFieldsValue()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          param.exitTime = param.exitTime.format('YYYY-MM-DD')
          const res = await this.post('/improperCareChildApi/saveExitMsg', param)
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
      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.type = this.nowkey
      this.changetime(formData)
      return formData
    },
    async getksList () {
      const param = { orgId: window.parent.indexTool.getUserInfo().orgId }
      const res = await this.post('/departMent/list', param)

      if (!res.errors) {
        this.ksList = res.data.pageBean.list
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 文化程度
    async getCulture () {
      const data = await this.getDictionaries('DEGREEEDUCATION')
      this.cultureList = data
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
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
      const ss = this.searchForm.getFieldsValue()

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
    }
  }
}
</script>
<style scoped lang='less'>
.spilwid3 {
  width: 300px;
}
</style>
