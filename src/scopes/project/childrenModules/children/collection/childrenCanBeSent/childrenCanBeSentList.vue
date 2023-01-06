<template>
  <!--可送养儿童 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="儿童姓名"
                          class="spilwid"
                          fieldDecoratorId="name"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>
            <!--<ta-form-item label="性别"-->
            <!--class="spilwid2"-->
            <!--fieldDecoratorId="sex"-->
            <!--:labelCol="{span:7}"-->
            <!--:wrapperCol="{span:17}">-->
            <!--<ta-select placeholder="请选择性别">-->
            <!--<ta-select-option value>全部</ta-select-option>-->
            <!--<ta-select-option v-for="(item,index) in sexList"-->
            <!--:value="item.value"-->
            <!--:key="index">{{item.label}}</ta-select-option>-->
            <!--</ta-select>-->
            <!--</ta-form-item>-->
            <ta-form-item label="证件号码"
                          class="spilwid1"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入证件号码" />
            </ta-form-item>
            <ta-form-item>
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
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待确认</ta-radio-button>
              <ta-radio-button value="5">已确认</ta-radio-button>
              <ta-radio-button value="3">已驳回</ta-radio-button>
              <ta-radio-button value="10">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon='plus'
                       @click="add">新增</ta-button>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="birthday"
                slot-scope="text">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <div slot="replyState"
               slot-scope="val, obj">
            <span v-if="obj.replyState == 0"
                  class="no_submit">待提交</span>
            <span v-if="obj.replyState == 1"
                  class="com_adopt">待确认</span>
            <!-- <span v-if="obj.replyState == 2"
                  class="com_reject">已发布</span> -->
            <span v-if="obj.replyState == 5 || obj.replyState == 2"
                  class="com_reject">已确认</span>
            <span v-if="obj.replyState == 3"
                  class="com_reject">已驳回</span>
          </div>
          <div slot="action"
               slot-scope="val,obj"
               class="btnlist">
            <span class="com_textsee"
                  @click="look(obj, 0)">查看</span>
            <!-- <span class="com_publish" v-if="obj.replyState == 0" @click="publish(obj)">确认</span> -->
            <span class="com_textedit"
                  v-if="obj.replyState == 0"
                  @click="look(obj, 1)">编辑</span>
            <!-- <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel" v-if="obj.replyState == 0">删除</span>
            </ta-popconfirm> -->
            <!-- <span class="com_revocation" v-if="obj.replyState==0" @click="revoke(obj)">撤销</span> -->

          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
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
    title: '儿童姓名',
    width: '17%',
    dataIndex: 'name'
  },
  {
    title: '出生日期',
    width: '17%',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '性别',
    width: '15%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  // {
  //   title: '身份证号',
  //   width: '18%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '收养类别',
    width: '19%',
    dataIndex: 'adoptionType',
    collectionType: 'ADOPTIONCATEGORY'
  },
  {
    title: '确认状态',
    width: '17%',
    align: 'center',
    dataIndex: 'replyState',
    // collectionType: 'RELAESESTATE',
    scopedSlots: { customRender: 'replyState' }
  },
  {
    title: '操作',

    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  mixins: [listMixin],
  data () {
    return {
      searchForm: {
        name: ''
      },
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/readyAdoptionChildren/listReport' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',

      nowkey: '10',
      disabled: false,

      sexList: [], // 性别字典数据
      adoptList: [] // 收养类别字典数据

    }
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.adoptList = await this.getDictionaries('ADOPTIONCATEGORY') // 获取收养类别字典数据
      this.sexList = await this.getDictionaries('sex') // 获取性别字典数据
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'adoptAdd',
        query: { flag: 'edit', id: e.id }
      })
    },
    // 删除
    deletes (e) {
      this.post('/childrenToBeAdoptedAdd/updateDelStateById', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已删除')
          this.handleSubmit()
        }
      })
    },
    // 删除取消
    cancel () {

    },
    // 撤销
    revoke (e) {
      this.$router.push({
        name: 'adoptRevoke',
        query: { flag: 'add', id: e.id }
      })
    },
    // 查看
    look (obj, isEdit) {
      this.$router.push({
        name: 'canBeSentForm',
        query: { handleType: isEdit, id: obj.id }
      })
    },
    // 新增
    add () {
      this.$router.push({
        name: 'canBeSentForm',
        params: {
          additionalYesOrNo: '0'
        }
      })
    },
    // 确认
    publish (e) {
      const vm = this
      vm.$confirm({
        title: '提示',
        content: '是否确认该条信息？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          vm.post('/readyAdoptionChildren/releaseById', { id: e.id }).then((res) => {
            console.log(res)
            vm.handleSubmit('search')
          })
        },
        onCancel: () => { }
      })
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.adoptionTypeList = [3, 5]
      formData.dataSource = 1
      if (this.nowkey == '10') { // 全部
        formData.replyStateList = [0, 1, 2, 3, 5]
      } else if (this.nowkey == '5') { // 已确认
        formData.replyStateList = [2, 5]
      } else {
        formData.replyState = this.nowkey
      }
      return formData
    }
  }
}
</script>
<style scoped lang="less">
.spilwid1 {
  width: 320px;
}
</style>
