<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="被收养人姓名"
                          class="spilwid"
                          fieldDecoratorId="childName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入被收养人姓名" />
            </ta-form-item>
            <ta-form-item label="收养申请人姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{span:11}"
                          :wrapperCol="{span:13}">
              <ta-input placeholder="请输入收养申请人姓名" />
            </ta-form-item>
            <ta-form-item label="收养申请人身份证号"
                          class="spilwid2"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:11}"
                          :wrapperCol="{span:13}">
              <ta-input placeholder="请输入收养申请人身份证号" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div style=" height: 50px;">
          <ta-button type="primary"
                     style="float: left;"
                     icon='plus'
                     @click='newadd'>新增</ta-button>
        </div>
        <div>
          <ta-table bordered
                    class="tables table-min-width"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :showOverflowTooltip="true">
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <a slot="name"
               slot-scope="val,obj"
               href="javascript:;"
               @click="adoptUserInfo(obj)">{{obj.name}}</a>
            <div slot="action"
                 slot-scope="e,obj"
                 class="btnlist">
              <!-- <span class="com_publish"
                    @click="send(obj)">发送评估通知</span> -->
              <span @click="look(obj)"
                    class='com_textsee'>查看</span>
              <span class="com_polish"
                    v-if="obj.isAssess!='是'"
                    @click='assessment(obj)'>评估</span>
              <span class="com_correlation"
                    v-if="obj.isFuse!='是'"
                    @click='fuse(obj)'>融合</span>
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deletes(obj)"
                             okText="确定"
                             cancelText="取消">
                <span class='com_textdel'>删除</span>
              </ta-popconfirm>
            </div>
            <div slot="currentStatusLabel"
                 slot-scope="text,record">
              <span v-if="record.auditStatus==='2'"
                    class="com_tobesubmitted">待评估</span>
              <span v-if="record.auditStatus==='3'"
                    class="com_tobeaudited">已评估</span>
            </div>
          </ta-table>
        </div>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       :defaultCurrent="page"
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
    width: '16%'
  },
  {
    title: '被收养人姓名',
    dataIndex: 'childName',
    width: '16%'
  },
  {
    title: '收养申请人姓名',
    // scopedSlots: { customRender: 'name' },
    dataIndex: 'name',
    width: '16%'
  },
  {
    title: '收养申请人身份证号',
    dataIndex: 'idCard',
    width: '17%'
  },
  {
    title: '上报儿童机构',
    dataIndex: 'orgName',
    width: '16%'
  },
  // {
  //   title: '审核状态',
  //   overflowTooltip: false,
  //   dataIndex: 'auditStatus',
  //   width: '16%',
  //   scopedSlots: { customRender: 'currentStatusLabel' }
  // },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 260,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/adoptionAppointment/approveandassesslist', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  activated () { },
  mounted () {
  },
  methods: {
    // 收养人基本信息
    adoptUserInfo (e) {
      this.$router.push({
        name: 'evaluationmanagementFrom',
        query: { flag: 'lookInfo', id: e.id }
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.assessOrFuse = '否'
      formData.auditStatus = '2'
      // formData.auditStatusList = [2, 3]
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 新增
    newadd () {
      this.$router.push({
        name: 'evaluationmanagementFrom',
        query: { flag: 'add' }
      })
    },
    // 评估
    assessment (obj) {
      if (obj.isFuse != '是') {
        this.$confirm({
          title: '该收养业务未录入融合信息，评估后将不可进行融合，是否直接进行评估？',
          content: ' ',
          onOk: () => {
            this.$router.push({
              name: 'assessOrFuse',
              query: { id: obj.id, childNumber: obj.childNumber, flag: '1' }
            })
          },
          onCancel: () => { }
        })
      } else {
        this.$router.push({
          name: 'assessOrFuse',
          query: { id: obj.id, childNumber: obj.childNumber, flag: '1' }
        })
      }
    },
    // 融合
    fuse (obj) {
      this.$router.push({
        name: 'assessOrFuse',
        query: { id: obj.id, flag: '2' }
      })
    },
    send (obj) {

    },
    // 查看
    look (e) {
      if (e.auditStatus == '99') {
        this.$router.push({
          name: 'additionalToEvaluate',
          query: {
            id: e.id,
            titleName: '22',
            flag: '22'
          }
        })
      } else {
        this.$router.push({
          name: 'evaluationmanagementFrom',
          query: { flag: 'look', id: e.id }
        })
      }
    },
    // 删除
    deletes (e) {
      this.post('/adoptionAppointment/delete', { appointmentId: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('数据删除成功')
          this.handleSubmit()
        }
      })
    }
  }
}
</script>
