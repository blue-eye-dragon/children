<template>
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
                <ta-form-item label="出生日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              class="spilwid3"
                              fieldDecoratorId="birthday">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="变更申请日期"
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
        <div class="operateBtn">
          <div class="radioClass leftClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">审批中</ta-radio-button>
              <ta-radio-button value="4">通过</ta-radio-button>
              <ta-radio-button value="5">驳回</ta-radio-button>
              <ta-radio-button value="9">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div class="rightClass">
            <ta-button type="primary"
                       icon="plus"
                       @click="add">新增变更</ta-button>
            <!-- <ta-button class='btnleft exportbtn'
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns.sync="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList"
                  :pagination="false"
                  ref="hideOrShowTable">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="idCard"
               slot-scope="val">
            <span>{{val?val.substr(0,4)+'***'+val.substr(14,val.length):'-'}}</span>
          </div>
          <template slot="name"
                    slot-scope="a, b,">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a,">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="approveDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):'--'}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               class='btnlist'
               slot-scope="a, b">
            <span @click="revokeRecords(b)"
                  class="com_revocation"
                  v-if="b.status=='1'">撤回</span>
            <span @click="see(b)"
                  class="com_textsee"
                  v-if="b.status=='3'||b.status=='4'||b.status=='5'">查看</span>
            <span @click="edit(b)"
                  class="com_continue"
                  v-if="b.status=='5'">继续办理</span>
            <span @click="edit(b)"
                  class="com_textedit"
                  v-if="b.status=='0'||b.status=='2'">编辑</span>

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
               slot-scope="val, obj, index">
            <span :class="statusClass(obj)">{{val}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
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
import { type } from 'os'
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
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' }
  },

  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    width: '10%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '22%',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '25%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '变更申请日期',
    width: '25%',
    dataIndex: 'registerDate',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '审批日期',
    align: 'center',
    dataIndex: 'approveDate',
    width: '23%',
    scopedSlots: { customRender: 'approveDate' }
  },
  {
    title: '状态',
    align: 'center',
    width: '18%',
    dataIndex: 'statusLabel',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: '20%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      nowkey: '0', // 选择不同的tab值（1待审批、3审批中、4通过、5驳回、0待提交、9全部）
      childrenTypeList: [], // 儿童类别字典数据
      sexList: [], // 性别字典数据

      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childChangeRequestApi/pageApplyChangeChild' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      mixRowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      disabled: false,
      issearch: false,
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4 // 不是乡镇用户

    }
  },
  activated () {
    this.issearch = false
    // 通过列表显示审批时间
    this.$refs.hideOrShowTable[this.nowkey == '4' ? 'showColumns' : 'hideColumns'](['approveDate'])
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    // 字典数据获取
    getMenuDatas () {
      this.getMenu(this.childTypeCode, 'childrenTypeList') // 获取儿童类别字典数据

      this.getMenu('SEX', 'sexList') // 获取性别字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
          if (name == 'childrenTypeList' && this.childTypeCode == 'CHILDCATEGORYM') {
            _self[name].splice(-2, 0, { label: '福利机构养育孤弃儿童', value: '1' })
          }
        }
      })
    },
    // 新增变更
    add () {
      this.$router.push({
        name: 'childInfoChange'
      })
    },
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (e.status) {
        case 0: // 待提交
          classValue = 'no_submit'
          break
        case 1:// 待审批
          classValue = 'com_tobeaudited'
          break
        case 3:// 审批中
          classValue = 'com_inaudit'
          break
        case 4:// 通过
          classValue = 'com_adopt'
          break
        case 5:// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    // 导出
    exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/changeChild/exportChangeChildApply', data)
    },
    // 撤回
    revokeRecords (e) {
      this.$router.push({
        name: 'revokeChangeRecords',
        query: { id: e.id, childChangeId: e.childChangeId, workflowId: e.workflowId, status: e.status }
      })
    },
    see (e) {
      const flag = 'look'
      this.$router.push({
        name: 'changeApprovalFrom',
        query: { id: e.id, childChangeId: e.childChangeId, workflowId: e.workflowId, workflowPointId: e.workflowPointId, flag: 'look' }
      })
    },
    edit (e) {
      const _self = this
      _self.$router.push({
        name: 'changeApply',
        query: { url: '/childChangeRequestApi/childChangeUpdate', params: { childChangeId: e.childChangeId }, childChangeId: e.childChangeId, flag: 'edit_change' }
      })
    },
    dels (e) {
      const _self = this
      _self.post('/childChangeRequestApi/deleteChildChange', {
        childChangeId: e.childChangeId
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
    onClose () {
      this.form.resetFields()
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      const _self = this
      const formData = _self.searchForm.getFieldsValue()
      formData.type = _self.nowkey
      _self.changetime(formData)
      return formData
    },
    // 查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: e.id }), operateFlag: 'look_now' }
      })
    },
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.action {
  display: flex;
  justify-content: space-around;
}
.spilwid3 {
  width: 430px;
}
.spilwid4 {
  width: 350px;
}
</style>
