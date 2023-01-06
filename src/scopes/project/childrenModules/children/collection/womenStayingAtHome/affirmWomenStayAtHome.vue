<template>
  <!-- 留守妇女确认列表 -->

  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">

      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <ta-form-item label="姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">

                  <ta-input placeholder="请输入姓名" />

                </ta-form-item>

                <ta-form-item label="证件号码"
                              fieldDecoratorId="idCard"
                              class="spilwid"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">

                  <ta-input placeholder="请输入证件号码" />

                </ta-form-item>
                <ta-form-item label="户籍所在地"
                              style="width:400px"
                              v-if="nowkey != 2"
                              fieldDecoratorId="censusRegisterDetail"
                              :labelCol="{ span: 7 }"
                              :wrapperCol="{ span: 17 }">
                  <ta-input maxlength="100"
                            :placeholder=" '请输入详细地址'  " />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             v-if="this.nowkey2 != 4"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="search "
                             icon="search"
                             v-else
                             @click="getlist()">查询</ta-button>
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
            </div>

          </ta-form>
        </div>
        <div>
          <div class="visitbtntop">

            <ta-radio-group v-model="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="9">待认领列表</ta-radio-button>
              <ta-radio-button value="2">已认领列表</ta-radio-button>

            </ta-radio-group>
            <!-- <ta-button type="primary"
                     icon='plus'
                     style="    float: right;"
                     @click="goAdd">新增</ta-button> -->

          </div>
          <div class="visitbtntop"
               :hidden='nowkey!="9"'>
            <ta-radio-group v-model="nowkey2"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">本地区</ta-radio-button>
              <ta-radio-button value="1">未明确地区</ta-radio-button>
              <ta-radio-button value="4">其他地区</ta-radio-button>

            </ta-radio-group>
            <div style="float:right">
              <ta-button type="primary"
                         @click="addAdoption"
                         :disabled="selectedRows.length == 0">批量认领</ta-button>
            </div>
          </div>

          <ta-table :columns="mixColumns1"
                    v-if="nowkey == '9'"
                    :rowSelection="rowSelection"
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

              <span v-if="nowkey=='9'"
                    @click="edit(val,obj,true,'1')"
                    class="com_textsee">查看</span>

              <ta-popconfirm v-if="nowkey=='9'"
                             title="确认认领吗?"
                             @confirm="doGet(val,obj,true)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">

                <span class="com_textedit">认领</span>
              </ta-popconfirm>

              <span v-if="nowkey=='2'"
                    @click="edit(val,obj,true,'2')"
                    class="com_textsee">查看</span>
              <ta-popconfirm v-if="nowkey=='2'"
                             title="确认取消认领吗?"
                             @confirm="del(val,obj)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">

                <span class="com_textdel">取消认领</span>

              </ta-popconfirm>

            </div>

          </ta-table>
          <ta-table :columns="mixColumns"
                    v-if="nowkey == '2'"
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

              <span v-if="nowkey=='9'"
                    @click="edit(val,obj,true,'1')"
                    class="com_textsee">查看</span>

              <ta-popconfirm v-if="nowkey=='9'"
                             title="确认认领吗?"
                             @confirm="doGet(val,obj,true)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">

                <span class="com_textedit">认领</span>
              </ta-popconfirm>

              <span v-if="nowkey=='2'"
                    @click="edit(val,obj,true,'2')"
                    class="com_textsee">查看</span>
              <ta-popconfirm v-if="nowkey=='2'"
                             title="确认取消认领吗?"
                             @confirm="del(val,obj)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">

                <span class="com_textdel">取消认领</span>

              </ta-popconfirm>

            </div>

          </ta-table>
        </div>
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

    <div></div>

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
  title: '留守妇女编号',
  width: '12%',
  dataIndex: 'womenNumber',
  overflowTooltip: true
},
{
  title: '姓名',
  width: '12%',
  dataIndex: 'name',
  overflowTooltip: true
},

// {
//   title: '证件号码',
//   width: '14%',
//   dataIndex: 'idCard',
//   overflowTooltip: true
// },
{
  title: '出生日期',
  width: '12%',
  dataIndex: 'birthday',
  align: 'center',
  overflowTooltip: true
},
{
  title: '当前机构',
  width: '15%',
  align: 'center',
  dataIndex: 'orgName',
  overflowTooltip: true
},
{
  title: '上报日期', // 上报
  width: '10%',
  align: 'center',
  dataIndex: 'reportTime',
  overflowTooltip: true
},
{
  title: '操作',
  width: '200px',
  align: 'center',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}
]
const mixColumns1 = [{
  title: '序号',
  dataIndex: 'num',
  align: 'center',
  width: '80px',
  scopedSlots: { customRender: 'num' }
},
{
  title: '留守妇女编号',
  width: '10%',
  dataIndex: 'womenNumber',
  overflowTooltip: true
},
{
  title: '姓名',
  width: '10%',
  dataIndex: 'name',
  overflowTooltip: true
},

// {
//   title: '证件号码',
//   width: '14%',
//   dataIndex: 'idCard',
//   overflowTooltip: true
// },
{
  title: '出生日期',
  width: '10%',
  dataIndex: 'birthday',
  align: 'center',
  overflowTooltip: true
},
{
  title: '户籍所在地',
  width: '12%',
  dataIndex: 'censusRegisterDetailAll',
  align: 'center',
  overflowTooltip: true
},
{
  title: '现住址',
  width: '12%',
  dataIndex: 'currentAddress',
  align: 'center',
  overflowTooltip: true
},
{
  title: '当前机构',
  width: '10%',
  align: 'center',
  dataIndex: 'orgName',
  overflowTooltip: true
},
{
  title: '上报日期', // 上报
  width: '10%',
  align: 'center',
  dataIndex: 'reportTime',
  overflowTooltip: true
},
{
  title: '操作',
  width: '200px',
  align: 'center',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' }
}
]
export default {
  mixins: [listMixin],
  data () {
    return {
      mixColumns,
      mixColumns1,
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
        mixGetDataListURL: '/LeftOverWomen/claimList', // '/worker/list', // 数据列表接口，API地址

        mixExportURL: '' // 导出接口，API地址
      },
      selectedRows: [],
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange

      },
      list: [],
      dataSource: [],
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
      issearch: false,
      nowkey2: '0',
      nowkey: '9'
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
    this.nowkey2 = '0'
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '9'
    } else {

    }
  },
  methods: {

    onSelectChange (selectedRowKeys, selectedRows) {
      // 设置选中项为点击选中的项
      this.rowSelection.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    addAdoption () {
      this.$confirm({
        title: '是否批量认领所选妇女',
        onOk: () => {
          this.list = []
          this.selectedRows.forEach((item) => {
            this.list.push(item.id)
          })
          const pra = { womanIdVo: this.list, claimFlag: '0' }
          this.post('/LeftOverWomen/claimInfoUpdate', pra).then((res) => {
            if (res.errors == null) {
              this.$message.success('认领成功')
              this.resetFrom()
              this.nowkey2 = '0'
              this.list = []
              this.handleSubmit()
            }
          })
        },
        onCancel: () => { }
      })
    },
    async doGet (a, b, c) {
      this.list = []
      this.list.push(b.id)
      const pra = { womanIdVo: this.list, claimFlag: '0' }
      // /LeftOverWomen/claimInfoUpdate
      const res = await this.post('/LeftOverWomen/claimInfoUpdate', pra)
      if (!res.errors) {
        this.$message.success('操作成功！')
        this.list = []
        this.nowkey2 = '0'
        this.resetFrom()
      }
    },

    async del (v, o) {
      this.list = []
      this.list.push(o.id)
      const res = await this.post('/LeftOverWomen/claimInfoUpdate', { womanIdVo: this.list, claimFlag: '1' })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$message.success('操作成功！')
        this.list = []
        this.handleSubmit()
      }
    },
    cancel (e) { },
    goAdd () {
      this.$router.push({
        name: 'womenStayingAtHome'
      })
    },

    //   ************
    async edit (val, obj, tp, type) {
      this.$router.push({
        name: 'womenStayingAtHome',
        query: {
          isshow: type,
          id: obj.id, // id未定
          disabled: tp
        }
      })
    },

    typechange (key) {
      if (key.target.value != '2') {
        this.nowkey = '9'
        if (key.target.value == '9') {
          this.nowkey2 = '0'
        } else {
          this.nowkey2 = key.target.value
        }
      } else {
        this.nowkey = '2'
        this.nowkey2 = '0'
      }
      if (this.nowkey2 == '4') {
        this.$message.info('请同时输入姓名和身份证号进行查询')
        this.mixDataList = []
      } else {
        this.userPageParams()
        this.handleSubmit('search')
      }
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    getlist () {
      const params = this.userPageParams()
      if (params.name && params.idCard) {
        this.post('LeftOverWomen/claimAccurateQuery', params).then(res => {
          if (res.serviceSuccess) {
            this.mixDataList = res.data.pageBean.list
          }
        })
      } else {
        this.$message.error('请同时输入姓名和身份证号进行查询')
      }
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.insertType = this.nowkey == '9' ? this.nowkey2 : this.nowkey
      formData.claimFlag = this.nowkey == '9' ? this.nowkey2 : this.nowkey
      this.changetime(formData)
      if (formData.censusRegisterDetail) {
        formData.censusRegisterDetail = formData.censusRegisterDetail.trim()
      }
      return formData
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
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
    handleOk (e) {
      this.Excel()
      this.showOn = false
    },
    handleCancel (e) {
      this.showOn = false
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/welfareEmployeeManagement/export', data)
    },
    async exports () {
      const ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
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

.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
