<template>
  <!-- 选送儿童 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
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
                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="民族"
                              fieldDecoratorId="nation"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择民族">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in nationList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="残疾类型"
                              fieldDecoratorId="disabilityType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择残疾类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in disabilitytypeList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="患病类型"
                              fieldDecoratorId="illnessType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择患病类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in illnesstypeList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
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
        <div>
          <div class="operateBtn">
            <ta-button type="primary"
                       @click="alot()">批量选送</ta-button>
            <!-- <ta-button class="exportbtn btnleft"
                       icon='upload'
                       @click="showModal">导出</ta-button> -->
          </div>
          <ta-modal :centered="false"
                    style="top: 25%; "
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
        <ta-table class="table-min-width"
                  :showOverflowTooltip="true"
                  :columns="mixColumns"
                  :dataSource="mixDataList"
                  :rowSelection="mixRowSelection"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="birthday"
                slot-scope="a, b, c">
            <span>{{ a?a.substring(0,10):"-" }}</span>
          </span>
          <span slot="illnessType"
                slot-scope="a, b, c">
            <span>{{b.illnessType|typeDataProcess(b.illnessType,tpy="1")}}</span>
          </span>
          <span slot="disabilityType"
                slot-scope="a, b, c">
            <span>{{b.disabilityType|typeDataProcess2}}</span>
          </span>
          <span slot="rehabilitTypes"
                slot-scope="a, b, c">
            <span>{{ b.rehabilitTypes|dorehabilitTypes }}</span>
          </span>
          <span slot="onlyState"
                slot-scope="a, b, c">
            <span :class="a==2?'com_adopt':'com_tobesubmitted'">{{b.onlyState|doOnlyState}}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="val,obj,qq"
               class="btnlist">
            <span class="com_publish"
                  v-if="obj.onlyState!=3&&obj.onlyState!=2"
                  @click="add(val,obj,qq)">
              <a>选送</a>
            </span>
            <span v-if="obj.onlyState==3||obj.onlyState==2">
              <a style="color: #00000078;">选送</a>
            </span>
            <!-- <span @click="edit(val,obj,'1')">修改</span>
            <ta-popconfirm
              title="确定删除吗?"
              @confirm="deletes(val,obj,index)"
              @cancel="cancel"
              okText="确定"
              cancelText="取消"
            >
              <span>删除</span>
            </ta-popconfirm>-->
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- 新增、编辑、详情弹窗 -->
    <ta-drawer :title="title"
               width="500px"
               :closable="true"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童情况描述"
                      fieldDecoratorId="recoveredDescription"
                      :require="{message:'请输入儿童情况描述'}"
                      :fieldDecoratorOptions="{rules: [{ max: 200, message: '字段最大长度为200' }]}">
          <ta-textarea :rows="4"
                       :disabled="disabled"
                       placeholder="请输入儿童情况描述" />
        </ta-form-item>
        <ta-form-item hidden
                      label="入园id"
                      fieldDecoratorId="enterId">
          <ta-input />
        </ta-form-item>
        <ta-form-item hidden
                      label="儿童基本信息id"
                      fieldDecoratorId="childId">
          <ta-input />
        </ta-form-item>
        <ta-form-item hidden
                      label="childIds"
                      fieldDecoratorId="childIds">
          <ta-input />
        </ta-form-item>
        <ta-form-item hidden
                      label="索引"
                      fieldDecoratorId="index">
          <ta-input />
        </ta-form-item>
        <ta-form-item hidden
                      label="儿童id"
                      fieldDecoratorId="ids">
          <ta-input />
        </ta-form-item>

        <ta-form-item label="康复类型"
                      fieldDecoratorId="rehabilitTypes"
                      :require="{message:'请选择康复类型'}">
          <ta-select placeholder="请选择康复类型" mode="multiple">
            <ta-select-option v-for="(item,index) in rehabilitatyList"
                              :value="item.value"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <AddressComponent @adsvalchange="adsvalchange"
                          :addressmodel="addressmodel"
                          :msg="'康复基地所属区域'"
                          @setaddress="setaddress"></AddressComponent>

        <ta-form-item label="选送康复基地"
                      fieldDecoratorId="rehabilitBase"
                      :require="{message:'请选择康复基地'}">
          <ta-select placeholder="请选择康复基地">
            <ta-select-option v-for="(item,index) in baseList"
                              :value="item.orgCode"
                              :key="index">{{item.baseName}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button @click="submit(2)"
                   type="primary">确认选送</ta-button>
        <!-- <ta-button @click="submit(2)" type="primary">保存</ta-button> -->
        <ta-button @click="onClose">返回</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
import AddressComponent from '@component/common/components/addressComponent'
var that = null
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    width: '15%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  // {
  //   title: '身份证号',
  //   width: '13%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    width: '12%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX'
  },
  {
    title: '出生日期',
    width: '15%',
    dataIndex: 'birthday',
    align: 'center',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '患病类型',
    width: '20%',

    dataIndex: 'illnessType',
    scopedSlots: { customRender: 'illnessType' }
  },
  {
    title: '残疾类型',
    width: '20%',
    dataIndex: 'disabilityType',
    scopedSlots: { customRender: 'disabilityType' }
    // collectionType: 'disabilitytypeList'
  },
  {
    title: '选送状态',
    width: '12%',
    align: 'center',
    dataIndex: 'onlyState',
    scopedSlots: { customRender: 'onlyState' }
  },
  {
    title: '康复类型',
    dataIndex: 'rehabilitTypes',
    scopedSlots: { customRender: 'rehabilitTypes' },
    width: '10%',
    overflowTooltip: true
  },
  {
    title: '操作',
    width: 150,
    dataIndex: 'action',
    overflowTooltip: false,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      title: '选送',
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
      width: '500px',
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/rehabilitManage/rehabilitChilds', // 数据列表接口，API地址
        mixAddURL: '/rehabilitManage/save', // 新增接口
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
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
      //   -------
      illnesstypeList: [],
      nationList: [],
      disabilitytypeList: [],
      addressmodel: [],
      rehabilitatyList: [],
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      alotId: [],
      alotIdC: [],
      onlyStateList: [],
      baseList: [],
      poit: true,
      issearch: false
    }
  },
  mounted () {
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()

    // ----------
    this.getillnesstypeList()
    this.getnation()
    this.getdisabilitytypeList()
    this.getrehabilitatyList()
    this.getOnlyStateList()
    // this.getBase()
  },
  created () {
    // dom未生成
    that = this
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    async adsvalchange (v) {
      let res = await this.post('/rehabilitManage/queryBaseListByAreaCode', { areaCode: v.slice(-1).toString() })
      if (!res.errors) {
        this.baseList = res.data.data
        console.log(this.baseList)
      }
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,

    handleSubmit () {
      // 生成选择下拉条件
      let ref = this.mixPageRef
      this.$refs[ref].loadData(
        data => {
          // console.log('列表数据：：：', data)
          // let listData = data.data.pageBean.list
          // listData.forEach((item, index) => {
          //   if (item.onlyState == null) {
          //     item.onlyState = 1
          //   }
          // })
        },
        err => {
          console.log(err)
        }
      )
    },
    // 性别字典
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 选送字典
    async getOnlyStateList () {
      let data = await this.getDictionaries('ANDSTATE')
      this.onlyStateList = data
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 民族
    async getnation () {
      let data = await this.getDictionaries('NATION')
      this.nationList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },
    // 康复类型
    async getrehabilitatyList () {
      let data = await this.getDictionaries('REHABILITATTYPES')
      this.rehabilitatyList = data
    },
    // -----------
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    childInfo (val, obj, index) {
      // alert(666)

      let param = {
        id: obj.id
      }
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/exportChilds', data)
      this.showOn = false
    },

    alot () {
      // 批量送
      if (!this.poit && this.alotId.length != 0) {
        this.$notification.open({
          message: '提示',
          description: '选择中包含已选送的儿童，无法批量选送哦！',
          icon: <ta-icon type="frown-o" style="color: #108ee9" />
        })
      } else {
        if (this.alotId.length == 0) {
          this.$notification.open({
            message: '提示',
            description: '尚未选择任何儿童，无法批量选送哦！',
            icon: <ta-icon type="frown-o" style="color: #108ee9" />
          })
        } else {
          this.visible = true
          this.title = '批量选送'
          this.nowtype = 1
          this.$nextTick(() => {
            this.form.setFieldsValue({
              // 需要修改，等待接口明确字段后处理 2019年9月24日15:50:46
              ids: this.alotId.toString(),
              childIds: this.alotIdC.toString()
            })
          })
        }
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.alotId = []
      this.alotIdC = []
      this.mixRowSelection.selectedRowKeys = selectedRowKeys

      this.poit = true
      let stateList = []
      for (let item in selectedRows) {
        // id需要修改，等待接口明确字段 2019年9月24日15:39:10

        stateList.push(selectedRows[item].onlyState)
        this.alotId.push(selectedRows[item].id)
        this.alotIdC.push(selectedRows[item].childId)
      }
      if (stateList.indexOf('2') != -1) {
        this.poit = false
      }
    },
    async submit (types) {
      // 判断是保存还是选送
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let url = ''
          let text = ''
          let logo = types // 操作标志
          let params = this.form.getFieldsValue()
          params.onlyState = logo
          let indexs = params.index

          this.changetime(params)
          url = this.mixListOptions.mixAddURL
          text = '操作成功'
          let data = await this.post(url, params)
          if (data.errors === null) {
            this.$message.success(text)
            this.onClose()
            this.handleSubmit()
          }
        }
      })
    },
    add (val, obj, qq) {
      this.visible = true
      this.title = '选送'
      this.nowtype = 1

      this.$nextTick(() => {
        this.form.setFieldsValue({
          ids: obj.id,
          childIds: obj.childId
        })
      })
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()

      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    handleOk (e) {
      this.exports()
      this.showOn = false
    },
    async exports () {
      let ss = this.searchForm.getFieldsValue()
      ss.name = ss.name ? ss.name : ''
      ss.employeeNumber = ss.employeeNumber ? ss.employeeNumber : ''
      window.location.href = `${window.faceConfig.basePath}/employeeManagement/export?name=${ss.name}&&employeeNumber=${ss.employeeNumber}`
    },
    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },

  filters: {
    doOnlyState (val) {
      let onlyStateLists = that.onlyStateList
      let show = val
      if (val == null) {
        show = '未选送'
      } else {
        onlyStateLists.forEach(e => {
          if (parseInt(e.value) == parseInt(val)) {
            show = e.label
          }
        })
      }
      return show
    },
    typeDataProcess (val) {
      let list = that.illnesstypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    typeDataProcess2 (val) {
      let list = that.disabilitytypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    dorehabilitTypes (val) {
      let list = that.recoverTypesList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    }
  }
}
</script>

<style scoped lang="less">
</style>
