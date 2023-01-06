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
                <ta-form-item label="行政区划代码"
                              fieldDecoratorId="areaCode"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入行政区划代码" />
                </ta-form-item>

                <ta-form-item label="组织单位编码"
                              fieldDecoratorId="orgCode"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入组织单位编码" />
                </ta-form-item>

                <ta-form-item label="咨询电话"
                              fieldDecoratorId="tel"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入咨询电话" />
                </ta-form-item>

                <ta-form-item label="负责人"
                              fieldDecoratorId="legalRepresentative"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入负责人" />
                </ta-form-item>

                <ta-form-item label="机构名称"
                              fieldDecoratorId="orgName"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入机构名称" />
                </ta-form-item>

                <ta-form-item label="机构类型"
                              fieldDecoratorId="orgType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择机构类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in orgTypeList "
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
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
      </div>
      <div v-if="status"
           style="height: 50px;margin-top: 15px;">
        <ta-button type="primary"
                   v-if="status"
                   icon='plus'
                   @click="add">新增机构</ta-button>
      </div>
      <!-- <div style="margin-top: 16px;"></div> -->
      <ta-table :columns="mixColumns"
                :dataSource="mixDataList"
                :pagination="false"
                bordered>
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span class="com_textsee"
                @click="edit(val,obj,'2')">查看</span>
          <span class="com_textedit"
                v-if="status"
                @click="editForMZ(obj)">修改</span>

          <ta-popconfirm title="该机构下已录入人员信息会被删除，确定注销此机构吗？"
                         @confirm="dels(obj,index)"
                         @cancel="cancel"
                         v-if="status"
                         okText="确定"
                         cancelText="取消">
            <span class="com_textdel">注销</span>
          </ta-popconfirm>
          <!-- <span v-if="obj.editStatus=='1'||orgType=='04'" @click="edit(val,obj,'1')">修改</span> -->
          <span class="com_textedit"
                v-if="orgType == '99'"
                @click="edit(val,obj,'1')">修改</span>
          <!-- <ta-popconfirm title="确定删除此机构相关内容吗?"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textedit"
                    v-if="areaLevel=='0'">删除</span>
            </ta-popconfirm> -->
        </div>
      </ta-table>

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
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '行政区划代码',
    width: '15%',
    dataIndex: 'areaCode',
    overflowTooltip: true
  },
  {
    title: '组织单位编码',
    width: '15%',
    dataIndex: 'orgCode',
    overflowTooltip: true
  },
  {
    title: '机构名称',
    width: '20%',
    dataIndex: 'orgName',
    overflowTooltip: true
  },
  {
    title: '机构类型',
    width: '15%',
    dataIndex: 'orgType',
    collectionType: 'INSTITUTIONALTYPE',
    overflowTooltip: true
  },
  {
    title: '咨询电话',
    width: '13%',
    dataIndex: 'tel',
    overflowTooltip: true
  },
  {
    title: '负责人',
    width: '12%',
    dataIndex: 'legalRepresentative',
    overflowTooltip: true
  },
  // {
  //   title: '创建时间',
  //   align: 'center',
  //   width: '15%',
  //   dataIndex: 'createTime',
  //   overflowTooltip: true
  // },
  {
    title: '操作',
    overflowTooltip: false,
    width: 200,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      number: '',
      namename: '',
      showOn: false,
      selectedRows: [],
      page: 1,
      size: 10,
      orgTypeList: [],

      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/welfareOrgManagement/list' // 数据列表接口，API地址
      },
      status: false,
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      mixDataList: [],
      orgType: '',
      orgLevel: '11',
      parentId: '',
      parentOrgName: '暂无',
      allDateEdit: '',
      areaLevel: '',
      issearch: false
    }
  },

  activated () {
    this.getUserOrg()
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.institutionalType()
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
  },
  methods: {
    // 机构注销
    async dels (o) {
      const until = await this.post('/orgEstablishRegister/delByOrgId', { id: o.id })
      if (!until.error && until.data.data.message == 'true') {
        this.$message.success('操作成功！')
        this.handleSubmit()
      } else if (until.data.data.message != 'true') {
        this.$message.error(until.data.data.message)
      } else {
        this.$message.error('操作失败！')
      }
    },
    moment,
    // 机构类型字典获取
    async institutionalType () {
      const data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.orgTypeList = data
    },
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 获取单位
    async getUserOrg () {
      const some = window.parent.indexTool.getUserInfo()
      // 新增  areaLevel 1或2  并且 orgType 不等于 99、98
      // 删除 areaLevel  -1
      // 2019年12月3日10:49:24
      this.areaLevel = some.areaLevel // 区划级别
      this.orgType = some.orgType // 区划级别

      if ((this.areaLevel == '1' || this.areaLevel == '2' || this.areaLevel == '3') && (this.orgType != 99 && this.orgType != 98)) {
        this.status = true
      } else {
        this.status = false
      }
    },
    // 添加跳转
    add (obj) {
      const that = this
      that.nowtype = 1
      that.$router.push({
        // path: 'operationInfo',
        path: 'registrationOfEstablishment', // 机构设置登记新增
        query: {
          parentId: that.parentId,
          parentOrgName: that.parentOrgName,
          nowtype: that.nowtype,
          orgType: that.orgType
        }
      })
    },
    // 原机构设立编辑--
    editForMZ (obj) {
      this.$router.push({
        name: 'registrationOfEstablishment',
        query: {
          id: obj.id,
          disabled: false,
          ishide: false
        }
      })
    },
    async del (val, obj) {
      const p = {
        id: obj.id
      }
      const res = await this.post('welfareOrgManagement/updateDelStateById', p)
      if (!res.error) {
        this.handleSubmit()
      }
    },
    onClose () {
      this.form.resetFields()
      this.visible = false

      this.disabled = false
    },
    async edit (val, obj, tp) {
      // //判断 1.是福利院还是民政局
      // if(this.orgType=='04'){//福利院
      // basedisabled=true
      // }
      const that = this

      if (tp == '1') {
        // 编辑
        that.nowtype = 2
        that.$router.push({
          path: 'operationInfo',
          query: {
            parentId: that.parentId,
            parentOrgName: that.parentOrgName,
            nowtype: that.nowtype,
            orgType: that.orgType,
            orgLevel: that.orgLevel,
            id: obj.id
          }
        })
      }
      if (tp == '2') {
        // 详情
        that.nowtype = 3
        that.$router.push({
          // path: 'operationInfo',
          path: 'seeAll',
          query: {
            parentId: that.parentId,
            parentOrgName: that.parentOrgName,
            nowtype: that.nowtype,
            orgType: that.orgType,
            id: obj.id,
            // 添加原机构设立
            //  id: obj.id, registrationOfEstablishment
            disabled: true
          }
        })
      }
    },
    changeAge (value, dateString) {
      // 年龄赋值
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          age: this.age
        })
      })
    },
    showModal () {
      this.showOn = true
      this.$nextTick(() => {
        const ss = this.searchForm.getFieldsValue()
        this.namename = ss.name
        this.number = ss.employeeNumber
      })
    },
    handleOk (e) {
      this.showOn = false
    },
    handleCancel (e) {
      this.showOn = false
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
