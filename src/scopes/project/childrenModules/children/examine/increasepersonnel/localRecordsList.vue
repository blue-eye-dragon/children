<template>
  <!-- 原社会散居孤儿》基本生活费申请（本地）页面 -->
  <div class="searchdata tadrawer"
       id="content">
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
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类别"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              v-if="notCounty">
                  <ta-select class="selectwid"
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childrenTypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid4"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="性别"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid"
                              fieldDecoratorId="sex">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value"
                                      :require="{message:'请选择性别!'}">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="起领年月"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              class="spilwid">
                  <ta-range-picker :placeholder="['开始年月', '结束年月']"
                                   format="YYYY-MM"
                                   :value="value"
                                   :mode="mode2"
                                   @panelChange="handlePanelChange2" />
                </ta-form-item>
                <ta-form-item label="增员申请日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="applyDay">
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
          <div class="visitbtntop radioClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">审批中</ta-radio-button>
              <ta-radio-button value="4">通过</ta-radio-button>
              <ta-radio-button value="5">驳回</ta-radio-button>
            </ta-radio-group>
            <div style="float: right;">
              <ta-button type="primary"
                         icon="plus"
                         @click="add">新增</ta-button>
              <!-- <ta-button class='btnleft exportbtn'
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
            </div>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns.sync="tableColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  :showOverflowTooltip="true"
                  ref="hideOrShowTable">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="approveDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="startTime"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,7):'--'}}</span>
          </template>
          <div slot="action"
               class='btnlist'
               slot-scope="a, b">
            <span @click="revokeRecords(b)"
                  class="com_revocation"
                  v-if="b.status=='1'">撤回</span>
            <span @click="edit(b,'5')"
                  class="com_continue"
                  v-if="b.status=='5'">继续办理</span>
            <span @click="see(b)"
                  class="com_textsee"
                  v-if="b.status=='3'||b.status=='4'||b.status=='5'">查看</span>
            <span @click="edit(b)"
                  class="com_textedit"
                  v-if="(b.status=='0'||b.status=='2')">编辑</span>
            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(b)"
                           @cancel="{}"
                           okText="确定"
                           cancelText="取消"
                           v-if="b.status=='0'||b.status=='2'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>

          </div>
          <div slot="status"
               slot-scope="val, obj">
            <span :class="statusClass(obj).classValue">{{statusClass(obj).stateName}}</span>
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
                       :ref="mixPageRef" />
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '18%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '20%',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '22%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '登记日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '23%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '起领年月',
    width: '20%',
    align: 'center',
    dataIndex: 'startTime',
    scopedSlots: { customRender: 'startTime' }
  },
  {
    title: '状态',
    align: 'center',
    width: '18%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  name: 'revoke',
  props: ['isOverAge'],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      visible: false,
      idedit: false,
      nowkey: '0', // 选择不同的tab值（1待审批、3审批中、4通过、5驳回、0待提交、9全部）
      isdisabled: true,
      isorgtype: window.parent.indexTool.getUserInfo().orgType == '99',
      childrenTypeList: [], // 儿童类别字典数据
      sexList: [], // 性别字典数据
      yesNoList: [],
      value: [], // 查询条件起领年月
      fileList: [],
      mode2: ['month', 'month'],
      walfareType: {
        authority: '0',
        createDate: '2019-08-28',
        createUser: '1',
        label: '福利机构养育孤弃儿童',
        name: '儿童类别-福利院',
        newType: '0',
        sort: 10,
        status: '1',
        system: '1',
        type: 'CHILDCATEGORYF',
        value: '1',
        version: 1
      },
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/addChildApi/pageApplyChild'
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      obj: {},
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      issearch: false,
      childTypeCode: (window.parent.indexTool.getUserInfo().orgType == '99'
        ? 'CHILDCATEGORYF' // 儿童类别-福利院
        : (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99'
          ? 'CHILDCATEGORYM' // 儿童类别-民政局
          : 'CHILDCATEGORYA')), // 儿童类别-全
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4, // 不是乡镇用户
      isFirst: true // 第一次进页面标识
    }
  },
  activated () {
    this.isFirst = true
    this.issearch = false
    // 通过列表显示审批时间
    this.$refs.hideOrShowTable[this.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
    this.obj = {}
    const url = window.location.href
    var params = url.split('?')[1].split('&')
    params.map((item) => { this.obj[item.split('=')[0]] = item.split('=')[1] })
    this.handleSubmit()
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        this.fileList = info.fileList
      }
      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }

        this.$emit('uochanhei')
      }
    },
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 上传需要的参数
    fileData (e, flag) {
      return {
        busiType: e,
        functionalType: '2'
      }
    },
    preview (file) { this.downloadFile(file) },
    handleRemove (e) {
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
    },
    setContainer () {
      return document.getElementById('content')
    },
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('sex')
      // YESNO
      this.yesNoList = await this.getDictionaries('YESNO')
      this.childrenTypeList = await this.getDictionaries(this.childTypeCode)
      // 去除其他和福利机构供养困境儿童字典
      this.$nextTick(() => {
        const index = this.childrenTypeList.findIndex(item => item.value == this.Enum.CHILDCATEGORYA.QT)
        if (index != -1) {
          this.childrenTypeList.splice(index, 1)
          this.childrenTypeList.push(this.walfareType)
        }
      })
    },
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 状态颜色处理
    statusClass (e) {
      const obj = {}
      const stateData = e.status
      switch (+stateData) {
        case 0: // 待提交
          obj.classValue = 'no_submit'
          obj.stateName = '待提交'
          break
        case 1:// 待审批
          obj.classValue = 'com_tobeaudited'
          obj.stateName = '待审批'
          break
        case 2: // 待提交
          obj.classValue = 'no_submit'
          obj.stateName = '待提交'
          break
        case 3:// 审批中
          obj.classValue = 'com_inaudit'
          obj.stateName = '审批中'
          break
        case 4:// 通过
          obj.classValue = 'com_adopt'
          obj.stateName = '通过'
          break
        case 5:// 驳回
          obj.classValue = 'com_reject'
          obj.stateName = '驳回'
          break
      }
      return obj
    },
    // 新增
    async add () {
      // 判断机构信息是否已经完善
      const userInfo = window.parent.indexTool.getUserInfo()
      if (userInfo.orgType == '99') { // 福利院用户
        await this.post('addChildApi/checkWelfareOrgInfo', { welfareOrgId: userInfo.orgId }).then((res) => {
          if (res.serviceSuccess) {
            if (res.data.data) {
              this.$router.push({
                name: 'orphansHandicapped',
                query: { operateFlag: 'add', childType: this.Enum.CHILDCATEGORYA.FLJGYYGQET, isOtherAdd: '11', isOverAge: this.isOverAge }
              })
            } else {
              this.$message.error('请在机构管理中完善机构信息后再进行申请')
            }
          }
        })
      } else {
        this.$router.push({
          name: 'orphansHandicapped',
          query: { operateFlag: 'add', childType: this.Enum.CHILDCATEGORYA.SHSJET, isOtherAdd: '11', isOverAge: this.isOverAge }
        })
      }
    },
    // 导出
    exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/addChild/exportAddChildApply', data)
    },
    revokeRecords (e) {
      this.$router.push({
        name: 'revokeRecords',
        query: { childEnterId: e.id, workflowId: e.workflowId, status: e.status, isAnotherPlaceApply: e.isAnotherPlaceApply }
      })
    },
    see (e) {
      const flag = 'look'
      this.$router.push({
        name: 'ipApproval',
        query: { childEnterId: e.id, workflowId: e.workflowId, workflowPointId: e.workflowPointId, isAnotherPlaceApply: e.isAnotherPlaceApply, flag: flag, isOverAge: this.isOverAge }
      })
    },
    // 编辑和继续办理
    edit (e, type) { // type为5时是继续办理
      const userInfo = window.parent.indexTool.getUserInfo()
      const _self = this
      if (userInfo.orgType == '99') { // 福利院用户
        _self.$router.push({
          name: 'orphansHandicapped',
          query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: type == '5' ? 'edit_bh' : 'edit_zy', childType: this.Enum.CHILDCATEGORYA.FLJGYYGQET, isOtherEdit: '11', isOverAge: this.isOverAge }
        })
      } else {
        _self.$router.push({
          name: 'orphansHandicapped',
          query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: type == '5' ? 'edit_bh' : 'edit_zy', childType: this.Enum.CHILDCATEGORYA.SHSJET, isOtherEdit: '11', isOverAge: this.isOverAge }
        })
      }
    },
    dels (e) {
      const _self = this
      const url = '/addChildApi/deleteChildInfo'
      _self.post(url, {
        childEnterId: e.id
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('删除成功!')
          _self.handleSubmit()
        }
      })
    },
    typechange (val) {
      const _self = this
      _self.nowkey = val.target.value
      // 通过列表显示审批时间
      this.$refs.hideOrShowTable[_self.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
      _self.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    resetFrom () {
      this.value = []
      this.searchForm.resetFields()
      this.handleSubmit('search')
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    // 查询参数
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      formData.type = _self.nowkey
      formData.isBulu = _self.isOverAge ? 1 : 0
      _self.changetime(formData)
      if (this.value.length > 0) {
        formData.approveDayStart = this.value[0].format('YYYY-MM')
        formData.approveDayEnd = this.value[1].format('YYYY-MM')
      }
      // 如果是从工作台跳转过来的首次查询，则数据来源默认传两个值1异地、2平台
      if (window.location.href.includes('fromWorkTable') && !formData.isAnotherPlaceApply && this.isFirst) {
        formData.isAnotherPlaceApply = '1,2'
        this.isFirst = false
      }
      return formData
    },
    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now', isOverAge: this.isOverAge }
      })
    }
  }
}
</script>

<style scoped lang="less">
.action {
  display: flex;
  justify-content: space-around;
}
.spilwid3 {
  width: 450px;
}
.spilwid4 {
  width: 350px;
}
.warntext {
  width: 100%;
  height: 90px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  margin-bottom: 29px;
  align-items: center;
  p {
    display: flex;
    margin-top: 10px;
    .icons {
      margin: 0 7px 0 0;
    }
  }
}
</style>
