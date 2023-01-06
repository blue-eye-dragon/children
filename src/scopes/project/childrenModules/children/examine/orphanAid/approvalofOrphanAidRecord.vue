<template>
  <div class="searchdata tadrawer">
    <!-- 助学申请记录 -->
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          class="spilwid1"
                          fieldDecoratorId="idCard"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入身份证号"></ta-input>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
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
          <ta-radio-group :value="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="02">暂存列表</ta-radio-button>
            <ta-radio-button value="4">登记在册列表</ta-radio-button>
            <ta-radio-button value="04">已退出列表</ta-radio-button>
          </ta-radio-group>
          <ta-button type="primary"
                     icon='plus'
                     style=" float: right;"
                     @click="toNew">新增</ta-button>

        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="fnCustomRow"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <span slot="name"
                slot-scope="a, b, c">
            <a @click="childDetail(b)">{{a}}</a>
          </span>
          <div slot="status"
               slot-scope="a,b,c">
            <span v-if="b.status==0||b.status==2"
                  class="com_tobesubmitted">待提交</span>
            <span v-if="b.status==1"
                  class="com_tobeaudited">待审批</span>
            <span v-if="b.status==3"
                  class="com_adopt">审核中</span>
            <span v-if="b.status==4"
                  class="com_reject">通过</span>
            <span v-if="b.status==5"
                  class="com_reject">驳回</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textreject"
                  v-if="obj.status=='1'"
                  @click="returnBack(obj)">撤回</span>
            <span class="com_textedit"
                  v-if="nowkey!='04'"
                  @click="edit(text,obj,index)">{{nowkey=='02'?'编辑':'信息维护'}}</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.status=='2'||obj.status=='0'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <span v-if="nowkey=='4'"
                  @click="opensamllwindows(obj.id,obj.childId)"
                  class="com_text_out">退出</span>
            <span class="com_textsee"
                  v-if="nowkey=='04'"
                  @click="see(obj)">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- <showone -->
    <div>
      <ta-drawer title="退出"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="showone">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="退出日期"
                        fieldDecoratorId="signOutDate"
                        :require="{message:'请选择退出日期'}">
            <ta-month-picker style="width:100%"
                             :placeholder=" '请选择退出日期'" />
          </ta-form-item>
          <ta-form-item label="退出原因"
                        fieldDecoratorId="signOutReason"
                        :fieldDecoratorOptions="this.verificationRules('退出原因', 100, false)">
            <ta-textarea :placeholder=" '请输入退出原因'"
                         style="height: 150px;"> </ta-textarea>
          </ta-form-item>
          <ta-form-item label="id"
                        hidden
                        fieldDecoratorId="id">
            <ta-input />
          </ta-form-item>
          <ta-form-item label="childId"
                        hidden
                        fieldDecoratorId="childId">
            <ta-input />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button @click="onClose">返回</ta-button>
          <ta-button key="submit"
                     type="primary"
                     @click="submit()">确定</ta-button>

        </div>
      </ta-drawer>
    </div>
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '20%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: '20%'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '20%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'SEX',
    width: '17%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '20%'
  },
  {
    title: '学历',
    dataIndex: 'education',
    collectionType: 'DEGREEEDUCATION',
    width: '17%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'approvalofOrphanAidRecord',
  mixins: [listMixin],
  data () {
    return {
      showone: false,
      width: '620px',
      nowkey: '02',
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL:
          '/childrenInStudentAssistanceProjec/recordList' // 数据列表接口，API地址
      }
    }
  },
  mounted () { },
  activated () {
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    onClose () {
      this.form.resetFields()
      this.showone = false
    },
    submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const param = this.form.getFieldsValue()
          param.signOutDate = param.signOutDate.format('YYYY-MM')
          const res = await this.post('/childrenInStudentAssistanceProjec/updateSignOutStateById', param)
          if (!res.errors) {
            this.$message.success('操作成功')
            this.onClose()
            this.handleSubmit()
          }
        }
      })
    },
    opensamllwindows (o, i) {
      this.showone = true
      this.$nextTick(() => {
        this.form.setFieldsValue({ id: o, childId: i })
      })
    },
    // 新增
    toNew () {
      this.$router.push({
        name: 'orphanProject',
        query: {
          operateFlag: 'add'
        }
      })
    },
    //   编辑
    edit (text, obj, index) {
      this.$router.push({
        name: 'orphanProject',
        query: {
          //   paramsData
          id: obj.id,
          startWorkflowId: obj.startWorkflowId,
          operateFlag: 'edit',
          tabVal: this.nowkey
        }
      })
    },
    //   撤回
    returnBack (e) {
      this.$router.push({
        name: 'aidRevokeRecords',
        query: { id: e.id, workflowId: e.workflowId, startWorkflowId: e.startWorkflowId, status: '1' }
      })
    },
    //   查看
    see (e) {
      const flag = 'look'
      const _self = this
      _self.$router.push({
        name: 'orphanProject',
        query: {
          id: e.id,
          startWorkflowId: e.startWorkflowId,
          operateFlag: 'look',
          operateFlag2: 'look2'
        }
      })
    },
    async dels (text, obj, index) {
      const params = {
        id: obj.id
      }
      this.post(
        '/childrenInStudentAssistanceProjec/informationCollectionDelete',
        params
      ).then(res => {
        if (res.errors == null) {
          this.$message.success('删除成功')
          this.handleSubmit()
        }
      })
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      if (this.nowkey != '04') {
        formData.status = this.nowkey
      } else {
        formData.status = '4'
      }
      if (this.nowkey == '02') {
        formData.dataState = '0'
      } else if (this.nowkey == '4') {
        formData.dataState = '1'
      } else {
        formData.dataState = '2'
      }

      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphanProject',
        query: {
          id: e.id,
          startWorkflowId: e.startWorkflowId,
          operateFlag: 'look'
        }
      })
    }
  }
}
</script>
