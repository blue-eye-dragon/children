
<template>
  <div id="components-layout-demo-basic"
       class="searchdata">
    <ta-layout>
      <ta-layout-sider style="overflow:scroll">
        <div class="siderdiv">
          <div>
            <ta-e-tree :load="loadNode"
                       highlight-current
                       :props="defaultProps"
                       node-key="orgId"
                       tree-node-id="parentId"
                       @node-click="click"
                       lazy />
          </div>
        </div>
      </ta-layout-sider>

      <ta-layout>
      <!-- <ta-layout> -->
      <ta-border-layout :layout="{header:'0px',footer:'80px'}" style="width:100%">
        <!-- <ta-layout-header> -->
        <div>
          <div class="searchcont">
            <ta-form layout="inline"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <ta-form-item label="员工姓名"
                            fieldDecoratorId="name"
                            class="spilwid"
                            :labelCol="{span:9}"
                            :wrapperCol="{span:15}">
                <ta-input placeholder="请输入员工姓名" />
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
            <!-- </ta-layout-header> -->
          </div>
          <ta-table :columns="mixColumns"
                    :dataSource="mixDataList"
                    :pagination="false"
                    @change="handleTableChange"
                    bordered>
            <!-- :haveSn="true"
            :rowSelection="mixRowSelection"-->
            <span slot="num"
                  slot-scope="a, b, c">
              <span>{{ size * (page - 1) + c + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span @click="edit(val,obj)"
                    class="com_textsee">查看</span>
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
                         :ref="mixPageRef" />
        </div>
        <!-- <ta-drawer
        :title="'详情'"
        width="500px"
        :closable="false"
        :getContainer="setContainer"
        @close="onClose"
        :visible="visible"
          >-->
       
        <!-- </ta-drawer> -->

        <!-- <ta-layout-footer>操作</ta-layout-footer> -->
        <!-- </ta-layout> -->
      </ta-border-layout>
      </ta-layout>
    </ta-layout>
     <ta-modal title="详情"
                  v-model="visible"
                  class="modal"
                  :footer="null">
          <ta-form :autoFormCreate="(form)=>{this.form = form}"
                   layout="horizontal">
            <ta-col :span="12">
              <ta-form-item hidden
                            label="员工id"
                            fieldDecoratorId="userid">
                <ta-input hidden
                          placeholder="请输入员工姓名" />
              </ta-form-item>
              <ta-form-item label="员工姓名"
                            fieldDecoratorId="name">
                <ta-input :disabled="true"
                          placeholder="请输入员工姓名" />
              </ta-form-item>
              <ta-form-item label="出生日期"
                            fieldDecoratorId="birthDate">
                <ta-date-picker :disabled="true"
                                placeholder="请输入出生日期" />
              </ta-form-item>
              <ta-form-item label="年龄"
                            fieldDecoratorId="age">
                <ta-input-number :min="1"
                                 :max="200"
                                 :precision="0"
                                 style="width:100%"
                                 :disabled="disabled" />
              </ta-form-item>
              <ta-form-item label="所属单位"
                            fieldDecoratorId="orgName">
                <ta-input :disabled="true" />
              </ta-form-item>

              <ta-form-item label="文化程度"
                            fieldDecoratorId="edutLevel">
                <ta-select placeholder="请选择文化程度"
                           :disabled="disabled">
                  <ta-select-option v-for="(item,index) in cultureList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="12">
              <ta-form-item label="身份证号"
                            fieldDecoratorId="idCardNo">
                <ta-input :disabled="disabled"
                          placeholder="请输入身份证号" />
              </ta-form-item>

              <ta-form-item label="性别"
                            fieldDecoratorId="sex">
                <!-- :require="{message:'请选择性别'}"-->
                <ta-select :disabled="disabled"
                           placeholder="请选择性别">
                  <ta-select-option v-for="(item,index) in sexList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <!-- :placeholder="disabled?'':'不可编辑，根据出生日期自动计算年龄'" -->

              <ta-form-item v-show="false"
                            label="所属单位Id"
                            fieldDecoratorId="orgId">
                <ta-input :disabled="true" />
              </ta-form-item>

              <ta-form-item label="科室"
                            fieldDecoratorId="departMentId"
                            :require="{message:'请选择科室!'}">
                <ta-select placeholder="请选择科室"
                           :disabled="disabled">
                  <ta-select-option v-for="(item,index) in ksList"
                                    :value="item.id"
                                    :key="index">{{item.departMentName}}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item label="职务"
                            fieldDecoratorId="duty"
                            :fieldDecoratorOptions="verificationRules('职务',50)">
                <ta-input :disabled="disabled"
                          placeholder="请输入职务" />
              </ta-form-item>
              <ta-form-item label="联系方式"
                            fieldDecoratorId="contact"
                            :fieldDecoratorOptions="verificationRules('联系方式',{type: 'phone'})">
                <ta-input :disabled="disabled"
                          placeholder="请输入联系方式" />
              </ta-form-item>
            </ta-col>
            <!-- <ta-form-item
            label="员工编号"
            fieldDecoratorId="employeeNumber"
            :require="{message:'请输入员工编号!'}"
          >
            <ta-input :disabled="true" />
              </ta-form-item>-->
          </ta-form>
          <!-- <div slot="footer">
          <ta-button key="back" @click="onClose">取消</ta-button>
            </div>-->
        </ta-modal>
  </div>
</template>

<script>
import { get } from 'http'
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '员工姓名',
    width: '20%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '16%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '所属单位',
    width: '16%',
    dataIndex: 'orgName',
    overflowTooltip: true
  },
  {
    title: '科室',
    width: '16%',
    dataIndex: 'departMentName',
    collectionType: 'ADMINISTRATIVEOFFICE',
    overflowTooltip: true
  },
  {
    title: '职务',
    width: '16%',
    dataIndex: 'duty',
    collectionType: 'DUTY',
    overflowTooltip: true
  },
  {
    title: '联系方式',
    width: '16%',
    dataIndex: 'mobile',
    overflowTooltip: true
  },

  {
    title: '操作',
    overflowTooltip: false,
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      mixListOptions: {
        mixActivatedIsNeed: false,
        mixGetDataListURL: '/addressBook/queryUserListByOrgId', // 数据列表接口，API地址
        mixGetDataListIsPage: true
      },
      mixDataList: [],
      mixColumns: mixColumns,
      mixPageRef: 'mixPageRef',

      page: 1,
      size: 10,

      orgIdNow: '',
      defaultProps: {
        label: 'orgName', // 指定json数组中，当前节点在页面上显示的文本的key，默认：label
        id: 'orgId', // 指定json数组中节点的唯一标识，默认：id，必须与node-key属性指定的值一致
        isLeaf: 'isLeaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      },
      visible: false,
      sexList: [],
      cultureList: [],
      ksList: [],
      disabled: true
    }
  },
  mounted () {
    this.getDic()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    async edit (val, obj) {
      this.disabled = true
      let str = JSON.stringify(obj)
      obj = JSON.parse(str)
      let data = await this.post('/addressBook/getUserById', { id: obj.userId })
      if (data.data.data) {
        obj = data.data.data
      }
      this.id = obj.id
      this.visible = true
      if (obj.birthday) {
        obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
    },

    // 字典
    async getDic () {
      this.sexList = await this.getDictionaries('SEX')

      this.cultureList = await this.getDictionaries('DEGREEEDUCATION')

      let res = await this.post('/departMent/list', {
        orgId: window.parent.indexTool.getUserInfo().orgId
      })
      if (!res.errors) {
        this.ksList = res.data.pageBean.list
      }
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.orgId = this.orgIdNow
      return formData
    },
    // left st
    async click (data, node, self) {
      this.orgIdNow = data.orgId
      this.handleSubmit()
    },
    // 加载子节点方法
    loadNode (node, resolve) {
      let param = {}
      if (node.data) {
        param = { orgId: node.data.orgId }
      } else {
        param = {}
      }
      this.post('/addressBook/queryOrgByAsync', param).then(result => {
        const treeData = result.data.data
        resolve(treeData)
      })
    },
    // left en
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(24, 144, 255, 0.2);
}
#components-layout-demo-basic .ant-layout-sider-children {
  height: 100%;
  padding-top: 34px;
  padding-left: 20px;
}
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic > .ant-layout:last-child {
  background: #ffffff;
  /* height: auto; */
  height: 100%;
  margin-top: 10px;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #ffffff;
  color: #fff;
  height: 88px;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #ffffff;
  color: #fff;
  line-height: 100%;
  margin-right: 2px;
  flex: 0 0 auto !important;
  max-width: 600px !important;
  min-width: 300px !important;
  width: auto !important;

  overflow: overlay;
  padding-right: 1%;
  border: 1px solid lightgray;
}
#components-layout-demo-basic .ant-layout-content {
  background: #ffffff;
  color: #fff;
  min-height: 120px;
  line-height: 100%;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.visitright {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.searchbtn {
  width: 282px;
  position: absolute;
  right: 0;
  transform: translate(0, 23%);
}
.el-tree-node__label {
  font-size: 16px;
}
.siderdiv {
  margin-top: 0px;
  min-height: 650px;
  height: 100%;
}
.ant-modal-content {
  position: relative;
  height: 70%;
}
.modal {
  width: 800px !important;
  height: 630px;
}
</style>
