<template>
  <div class="tadrawer searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="科室名称"
                          class='spilwid'
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="departMentName">
              <ta-input placeholder="请输入科室名称" />
            </ta-form-item>
            <ta-form-item class='spilwid'>
              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button @click="resetFrom"
                           class="btnleft reset"
                           icon="reload"
                           style="margin-left:10px">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <ta-button type="primary"
                     class="plus"
                     icon="plus"
                     @click="add(0)">新增</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="action"
                slot-scope="val,obj,index"
                class="btnlist">
            <span class="com_textedit"
                  @click="edit(val,obj)">编辑</span>
            <span class="com_textsee"
                  @click="see(val,obj)">查看</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       :pageSize.sync="size"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :defaultPageSize="10"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <!-- 弹窗 -->
    <ta-drawer title="科室管理"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="科室名称"
                      fieldDecoratorId="departMentName"
                      :fieldDecoratorOptions="rules.departMentName">
          <ta-input placeholder="请输入科室名称"
                    :disabled="disabled" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import listMixin from '@component/common/js/mixins/listMixin'
export default {
  mixins: [listMixin],
  data () {
    return {
      disabled: false,
      // 弹窗
      visible: false,
      confirmLoading: false,
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/departMent/list', // 数据列表接口，API地址
        mixAddURL: '/departMent/save',
        mixEditURL: '/departMent/update',
        mixDeleteURL: '/departMent/updateDelStateById'
      },
      mixPageRef: 'gridPager',
      id: '',
      type: null,
      // 查询
      tableData: [],
      tableColumns: [
        {
          title: '科室',
          dataIndex: 'departMentName'
        },
        {
          title: '创建时间',
          align: 'center',
          width: '12%',
          dataIndex: 'createTime'
        },
        {
          title: '创建人员',
          dataIndex: 'createUser'
        },
        {
          title: '所属单位',
          dataIndex: 'orgName'
        },
        {
          title: '操作',
          overflowTooltip: false,
          dataIndex: 'action',
          width: '200px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      rules: {
        departMentName: this.verificationRules('科室名称', 100)
      }
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    add () {
      this.fileList = []
      this.idedit = false
      // this.form.resetFields()
      this.visible = true
      this.disabled = false
      this.nowtype = 1
      if (this.radioval) {
        this.radioval = null
      }
    },
    edit (val, obj) {
      this.idedit = false
      this.id = obj[this.idkey]
      this.visible = true
      this.nowtype = 2
      this.disabled = false
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.$nextTick(() => {
        data = this.other(data)
        // 其他操作
        this.$nextTick(() => {
          this.form.setFieldsValue(data)
        })
      })
    },
    see (val, obj) {
      this.idedit = true
      this.id = obj[this.idkey]
      this.visible = true
      this.nowtype = 2
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.$nextTick(() => {
        obj = this.other(data)
        // 其他操作
        this.form.setFieldsValue(obj)
      })
      this.disabled = true
    }
  }
}
</script>

