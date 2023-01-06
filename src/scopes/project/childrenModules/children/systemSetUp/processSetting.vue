<template>
  <div class="searchdata tadrawer">
    <!--身份状态变更审批  -->
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <div class="visitbtn">
          <ta-button type="primary"
                     @click="add">新增流程</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <!-- <span slot="operate" slot-scope="text, record">
            <ta-table-operate :operate-menu="operateMenu" :record="record" />
          </span>-->
          <div slot="operate"
               class="btnlist"
               slot-scope="text,obj,index">
            <template v-if="obj.workflowStatus=='0'">
              <ta-popconfirm title="禁用状态可以任意调整流程信息和流程节点，流程一旦启用就不可再禁用，确定启用吗?"
                             @confirm="subOk(text,obj,index)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <span class="com_audit">启用</span>
              </ta-popconfirm>
            </template>
            <span v-if="obj.workflowStatus=='1'"
                  class="textColor">启用</span>
            <span class="com_textsee"
                  @click="edit(obj)">流程编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">流程删除</span>
            </ta-popconfirm>
            <span class="com_textsee"
                  @click="adoption(obj)">节点操作</span>
          </div>
        </ta-table>
        <ta-pagination style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="mixPageRef" />
      </div>
      <ta-drawer :title="nowtype=='1'?'新增流程':'编辑流程'"
                 width="500"
                 placement="right"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="visible"
                 style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
        <ta-form class="drawerFrom"
                 :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="是否新建默认流程"
                        :labelCol="{ span: 6 }"
                        fieldDecoratorId="aa"
                        :require="{message:'是否新建默认流程'}">
            <ta-radio-group name="aa"
                            @change="changeData"
                            :disabled="disabledM">
              <ta-radio v-for="(item ,index) in yesnoList "
                        :key="index"
                        :value="item.value">{{item.label}}</ta-radio>
            </ta-radio-group>
            <!-- <ta-select placeholder="请选择是否使用默认流程" style="width : 100%" :disabled="disabled" @change="changeData">
              <ta-select-option
                :value="item.value"
                v-for="(item,index) in yesnoList "
                :key="index"
              >{{item.label}}</ta-select-option>
            </ta-select> -->
          </ta-form-item>
          <ta-form-item label="流程名称"
                        fieldDecoratorId="workflowName"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="rules.workflowName">
            <ta-input placeholder="请输入流程名称"
                      :disabled="disabled" />
          </ta-form-item>
          <AddressComponent v-if="showInput"
                            :addressmodel="addressmodel"
                            :disabled="disabledM"
                            :changeOnSelect="changeOnSelect"
                            @setaddress="setaddress"
                            :msg="'区划'"></AddressComponent>
          <ta-form-item label="业务类型"
                        fieldDecoratorId="businessType"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="rules.businessType">
            <ta-select placeholder="请选择业务类型"
                       style="width : 100%"
                       :disabled="disabledM">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in workflowType "
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button class="btnleft"
                     @click="submit()"
                     type="primary">提交</ta-button>
          <ta-button @click="onClose">取消</ta-button>
        </div>
      </ta-drawer>

      <ta-drawer title="节点操作"
                 width="800"
                 placement="right"
                 :getContainer="setContainer"
                 @close="onCloseTwo"
                 :visible="visibleEdit"
                 style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
        <div class="visitbtn">
          <ta-button type="primary"
                     :disabled="disabledP"
                     @click="addPoint">新增节点</ta-button>
        </div>
        <ta-table bordered
                  :columns="tableAddColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableDataAdd"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  @click="pointEdit(text,obj,index)">编辑</span>
            <template v-if="workflowStatus=='0'">
              <ta-popconfirm title="确定删除吗?"
                             @confirm="delPoint(text,obj,index)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </template>
            <span v-if="workflowStatus=='1'"
                  class="textColor">删除</span>
          </div>
        </ta-table>
        <div slot="footer">
          <!-- <ta-button class="btnleft" @click="submit()" type="primary">提交</ta-button> -->
          <ta-button @click="onCloseTwo">取消</ta-button>
        </div>
      </ta-drawer>
      <!-- 节点新增或编辑 -->
      <ta-drawer :title="nowtypeTwo=='1'?'新增节点':'编辑节点'"
                 width="500"
                 placement="right"
                 :getContainer="setContainer"
                 @close="onClosePoint"
                 :visible="visiblePoint"
                 style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
        <ta-form class="drawerFrom"
                 :autoFormCreate="(cptForm)=>{this.cptForm = cptForm}"
                 layout="horizontal">
          <ta-form-item label="上级节点"
                        fieldDecoratorId="pointParentId"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="!disabledPoint?rules.pointParentId:{}">
            <ta-select placeholder="请选择上级节点"
                       style="width : 100%"
                       :disabled="disabledP">
              <ta-select-option :value="item.id"
                                v-for="(item,index) in pointParentList "
                                :key="index">{{item.pointName}}</ta-select-option>
            </ta-select>
            <!-- <ta-input placeholder="请输入流程名称" :disabled="disabledP" /> -->
          </ta-form-item>
          <ta-form-item label="节点名称"
                        fieldDecoratorId="pointName"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="rules.pointName">
            <ta-input placeholder="请输入节点名称" />
          </ta-form-item>
          <ta-form-item label="审批级别"
                        fieldDecoratorId="roleId"
                        :labelCol="{ span: 6 }"
                        :fieldDecoratorOptions="rules.roleId">
            <ta-select placeholder="请选择审批级别"
                       style="width : 100%"
                       :disabled="disabledP">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in roleList "
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button class="btnleft"
                     @click="submitPoint()"
                     type="primary">提交</ta-button>
          <ta-button @click="onClosePoint">取消</ta-button>
        </div>
      </ta-drawer>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
// import AddressComponent from '@component/common/components/areaQuery'
import AddressComponent from '@component/common/components/addressComponent'
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
    title: '区划',
    dataIndex: 'areaName',
    width: '17%'
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
    collectionType: 'WORKFLOW_BUSINESS_TYPE',
    width: '18.5%'
  },
  {
    title: '流程名称',
    dataIndex: 'workflowName',
    width: '17%'
  },
  {
    title: '流程状态',
    dataIndex: 'workflowStatusName',
    width: '17%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 350,
    scopedSlots: { customRender: 'operate' }
  }
]
const tableAddColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '节点名称',
    dataIndex: 'pointName',
    width: '180px'
  },
  {
    title: '审批级别',
    dataIndex: 'roleId',
    collectionType: 'AREALEVEL',
    width: '180px'
  },
  {
    title: '上级节点',
    dataIndex: 'pointParentName',
    width: '180px'
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
  name: 'infoReportApproval',
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      tableColumns,
      tableAddColumns,
      tableData: [],
      tableDataAdd: [],
      roleList: [],
      yesnoList: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/workflowConfigApi/pageWorkflowConfig' // 数据列表接口，API地址
      },
      mixPageRef: 'mixPageRef',
      visible: false,
      visibleEdit: false,
      visiblePoint: false,
      disabled: false,
      disabledM: false,
      disabledT: false,
      disabledP: false,
      showInput: false,
      disabledPoint: false,
      changeOnSelect: true,
      ishide: true,
      isrule: true,
      types: '1',
      workflowStatus: '',
      id: '',
      nowtype: 0,
      addressmodel: [],
      workflowType: [],
      pointParentList: [],
      dataList: [],
      nowtypeTwo: 0,
      workflowId: '',
      operateMenu: [
        {
          name: '启用',
          disabled: record => {
            return record.workflowStatus == 0
          },
          onClick: record => {
            this.subOk(record)
          }
        },
        {
          name: '流程编辑',
          onClick: record => {
            this.edit(record)
          }
        },
        {
          name: '流程删除',
          type: 'confirm',
          confirmTitle: '确认删除该信息？',
          onOk: record => {
            console.log('aa')
            // this.dels(record)
          },
          onCancel: record => {
            this.$message.info('取消删除')
          }
        },
        {
          name: '节点操作',
          onClick: record => {
            this.adoption(record)
          }
        }
      ],
      rules: {
        workflowName: this.verificationRules('流程名称', 20),
        pointName: this.verificationRules('节点名称', 20),
        pointParentId: this.verificationRules('上级节点'),
        roleId: this.verificationRules('审批角色'),
        businessType: this.verificationRules('业务类型')
      }
    }
  },
  mounted () {
    this.getWorkflowType()
    this.getRoleList()
    this.getYesnoList()
  },
  activated () { },
  methods: {
    loadData () {
      this.showInput = false
    },
    changeData (val) {
      console.log(val)
      if (val.target.value == '0') {
        this.showInput = true
      } else if (val.target.value == '1') {
        this.showInput = false
      }
    },
    // changeDatas (val) {
    //   console.log(val)
    //   if (val == '0') {
    //     this.showInput = true
    //   } else if (val == '1') {
    //     this.showInput = false
    //   }
    // },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 新增
    add () {
      this.visible = true
      this.disabledM = false
      this.nowtype = 1
      this.showInput = false
    },
    // 流程启用
    async subOk (text, obj, index) {
      // let obj = record
      const params = {}
      params.workflowId = obj.id
      await this.post('/workflowConfigApi/openWorkflow', params).then(res => {
        if (!res.errors) {
          this.$message.success('流程启用成功')
          this.handleSubmit()
        }
      })
    },
    // 流程编辑
    edit (record) {
      const obj = record
      this.visible = true
      this.nowtype = 2
      //   this.form.resetFields()
      if (obj.workflowStatus == '1') {
        // 状态为启用的情况下，只允许修改名称
        this.disabledM = true
      } else if (obj.workflowStatus == '0') {
        // 状态为禁用的情况下，可以修改全部
        this.disabledM = false
      }
      this.$nextTick(() => {
        this.getDetails(obj)
      })
    },
    async getDetails (data) {
      const params = {}
      params.workflowId = data.id
      await this.post('/workflowConfigApi/detailWorkflowConfig', params).then(
        res => {
          if (!res.errors) {
            this.disabledT = true
            this.dataList = []
            this.dataList = res.data.data
            if (this.dataList.areaCode == '0') {
              this.aa = '1'
              this.showInput = false
            } else {
              this.aa = '0'
              this.showInput = true
              const arr = []
              arr.push(
                this.dataList.proCode,
                this.dataList.cityCode,
                this.dataList.countyCode
              )
              this.addressmodel = arr
            }

            this.dataList.aa = this.aa
            this.form.setFieldsValue(this.dataList)
          } else {
            this.disabledT = false
          }
        }
      )
    },
    // 流程删除
    async dels (record) {
      const obj = record
      const params = {}
      params.workflowId = obj.id
      await this.post('/workflowConfigApi/delWorkflowConfig', params).then(
        res => {
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.handleSubmit()
          }
        }
      )
    },
    // 节点新增
    async addPoint () {
      this.visiblePoint = true
      this.nowtypeTwo = 1
      this.getpointParent()
    },
    async getpointParent () {
      const params = {}
      params.workflowId = this.workflowId
      params.pointId = this.id
      await this.post('/workflowPointApi/pointNotMyList', params).then(res => {
        console.log(res)
        if (!res.errors) {
          if (res.data.data.length > 0) {
            this.disabledPoint = false
          } else {
            this.disabledPoint = true
          }
          this.pointParentList = res.data.data
        }
      })
    },
    // 节点编辑
    pointEdit (text, obj, index) {
      this.visiblePoint = true
      this.id = obj.id
      this.nowtypeTwo = 2
      this.getpointParent()
      this.getDetailPoint(obj)
    },
    // 获取节点详情
    async getDetailPoint (obj) {
      const params = {}
      let url = ''
      if (this.nowtypeTwo == '1') {
        url = '/workflowConfigApi/queryPointByWorkflowId'
      } else if (this.nowtypeTwo == '2') {
        params.pointId = obj.id
        url = '/workflowPointApi/detailWorkflowPoint'
      }
      await this.post(url, params).then(
        res => {
          if (!res.errors) {
            this.cptForm.setFieldsValue(res.data.data)
          }
        }
      )
    },
    // 节点提交
    async submitPoint () {
      let isok = true
      this.cptForm.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('yanzheng1' + isok)
        }
      })
      if (isok) {
        const formData = this.cptForm.getFieldsValue()
        formData.workflowId = this.workflowId
        let url = ''
        let text = ''
        if (this.nowtypeTwo == '1') {
          url = '/workflowPointApi/insertWorkflowPoint'
          text = '节点新增成功'
        } else if (this.nowtypeTwo == '2') {
          url = '/workflowPointApi/updateWorkflowPoint'
          text = '节点编辑成功'
          formData.id = this.id
        }
        const obj = {}
        obj.id = this.workflowId
        await this.post(url, formData).then(res => {
          if (!res.errors) {
            this.$message.success(text)
            this.visiblePoint = false
            this.cptForm.resetFields()
            this.getList(obj)
          }
        })
      }
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 节点操作
    async adoption (record) {
      this.visibleEdit = true
      this.workflowId = record.id
      this.workflowStatus = record.workflowStatus
      if (this.workflowStatus == '1') {
        // 禁用
        this.disabledP = true
      } else if (this.workflowStatus == '0') {
        this.disabledP = false
      }
      this.getList(record)
    },
    async getList (record) {
      const params = {}
      params.workflowId = record.id
      await this.post('/workflowConfigApi/queryPointByWorkflowId', params).then(
        res => {
          if (!res.errors) {
            this.tableDataAdd = res.data.data
          }
        }
      )
    },
    // 节点删除
    async delPoint (text, obj, index) {
      const params = {}
      params.pointId = obj.id
      params.workflowId = this.workflowId
      const objData = {}
      objData.id = this.workflowId
      await this.post('/workflowPointApi/delWorkflowPoint', params).then(
        res => {
          if (res.errors == null) {
            this.$message.success('删除成功')
            this.getList(objData)
          }
        }
      )
    },
    // 提交
    async submit () {
      let isok = true
      this.form.validateFields((err, values) => {
        if (err) {
          isok = false
          console.log('yanzheng1' + isok)
        }
      })
      if (isok) {
        const formData = this.form.getFieldsValue()

        console.log(formData)
        const areaCode = ''
        if (formData.aa == '1') {
          formData.areaCode = '0'
        } else if (formData.aa == '0') {
          if (formData.address_Linkage.length > 0) {
            formData.areaCode =
              formData.address_Linkage[formData.address_Linkage.length - 1]
          }
          delete formData.address_Linkage
        }
        delete formData.aa
        // formData.areaCode = areaCode
        console.log(formData)
        console.log(areaCode)
        let url = ''
        let text = ''
        if (this.nowtype == '1') {
          url = '/workflowConfigApi/insertWorkflowConfig'
          text = '流程创建成功'
        } else if (this.nowtype == '2') {
          url = '/workflowConfigApi/updateWorkflowConfig'
          text = '流程编辑成功'
          formData.id = this.dataList.id
        }
        await this.post(url, formData).then(res => {
          if (!res.errors) {
            this.$message.success(text)
            this.visible = false
            this.form.resetFields()
            this.handleSubmit()
          }
        })
      }
    },
    // 抽屉关闭
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
      //   this.handleSubmit()
    },
    onCloseTwo () {
      this.visibleEdit = false
      this.disabled = false
    },
    onClosePoint () {
      this.cptForm.resetFields()
      this.visiblePoint = false
    },
    // addAdoption (text, obj, index) {},
    userPageParams () {
      //   let formData = this.searchForm.getFieldsValue()
      //   this.changetime(formData)
      //   return formData
    },
    see (text, obj, index) {
      //   console.log(obj.changeStateId)
      //   this.$router.push({
      //     path: 'actualUnaccChildStatuChangeFor',
      //     query: {
      //       id: obj.changeStateId,
      //       currentStatus: obj.currentStatus,
      //       disabled: true
      //     }
      //   })
    },
    // 对应表单的地址赋值
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    async getWorkflowType () {
      const data = await this.getDictionaries('WORKFLOW_BUSINESS_TYPE')
      this.workflowType = data
    },
    // 角色列表
    async getRoleList () {
      // await this.post('/workflowPointApi/roleList').then(res => {
      //   if (!res.errors) {
      //     this.roleList = res.data.data
      //   }
      // })
      const data = await this.getDictionaries('AREALEVEL')
      this.roleList = data
    },
    async getYesnoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesnoList = data
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.visitbtn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
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
.textColor {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}
</style>
