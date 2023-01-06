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
                <ta-form-item label="机构名称"
                              fieldDecoratorId="orgName"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入机构名称" />
                </ta-form-item>

                <ta-form-item label="机构类型"
                              v-if="userInfo.orgType!=98&&userInfo.areaLevel!=4"
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
        <div class="operateBtn"
             v-if="userInfo.orgType != 98&&userInfo.orgType != 99||userInfo.orgType == 98&&mixDataList.length==0">
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增机构</ta-button>
        </div>
        <div style="margin-bottom: 16px;"></div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <span slot="state"
                slot-scope="val, obj, index">
            <span :class="obj.state=='1'?'color1':'color2'">{{ obj.state=="1"?"正常":"已注销"}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj"
               class="btnlist">

            <span class="com_textsee"
                  @click="edit(val,obj,'2')">查看</span>

            <span class="com_textedit"
                  v-if="obj.editStatus==1&&obj.state=='1'"
                  @click="edit(val,obj,'1')">修改</span>
            <ta-popconfirm title="该机构下已录入人员信息会被删除，确定注销此机构吗？"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.editStatus==1&&obj.state=='1'&&userInfo.orgType!='98'">
              <span class="com_textdel">注销</span>
            </ta-popconfirm>
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
    title: '行政区划代码',
    width: '13%',
    dataIndex: 'areaCode',
    overflowTooltip: true
  },
  {
    title: '机构名称',
    width: '17%',
    dataIndex: 'orgName',
    overflowTooltip: true
  },
  {
    title: '机构类型',
    width: '17%',
    dataIndex: 'orgType',
    collectionType: 'TYPEOFPROTECTION',
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
    width: '17%',
    dataIndex: 'legalRepresentative',
    overflowTooltip: true
  },
  {
    title: '机构状态',
    dataIndex: 'state',
    width: '10%',
    scopedSlots: { customRender: 'state' }
  },
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
        mixGetDataListURL: '/childProtectOrgManagement/list'
      },
      status: false,
      dataSource: [],
      mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      mixDataList: [],
      parentId: '',
      parentOrgName: '',
      allDateEdit: '',
      issearch: false,
      userInfo: window.parent.indexTool.getUserInfo() // 登录用户信息
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    this.getUserOrg()
  },
  mounted () {
    this.institutionalType()
    this.userId = this.userInfo.userId
  },
  methods: {
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 机构类型字典获取
    async institutionalType () {
      const data = await this.getDictionaries('TYPEOFPROTECTION')
      this.orgTypeList = data
    },
    // 获取单位
    async getUserOrg () {
      this.status = (this.userInfo.areaLevel == '2' || this.userInfo.areaLevel == '3') && (this.userInfo.orgType != 99 && this.userInfo.orgType != 98)
    },
    // 添加跳转
    add (obj) {
      if (this.userInfo.orgType == '98') { // 未保机构用户直接跳转新增
        this.judgeToAdd()
      } else {
        this.post('childProtectOrgManagement/queryProjectOrgSetting', { orgId: this.userInfo.orgId }).then(res => {
          if (res.serviceSuccess) {
            if (res.data.data && res.data.data.protectOrgNum) {
              this.judgeToAdd()
            } else { // 没有机构
              this.$message.error('请先到【机构设置】菜单下完善机构设置信息，再进行机构信息维护！')
            }
          }
        })
      }
    },
    // 跳转至新增页面
    judgeToAdd () {
      const that = this
      that.$router.push({
        path: 'protectOperationInfo',
        query: {
          parentId: that.parentId,
          parentOrgName: that.parentOrgName,
          nowtype: 1,
          orgType: that.userInfo.orgType,
          isCanEdit: true
        }
      })
    },
    async del (val, obj) {
      const until = await this.post('childProtectOrgManagement/updateDelStateById', { id: obj.id })
      if (!until.error && until.data.data.message == 'true') {
        this.$message.success('操作成功！')
        this.handleSubmit()
      } else if (until.data.data.message != 'true') {
        this.$message.error(until.data.data.message)
      } else {
        this.$message.error('操作失败！')
      }
    },
    async edit (val, obj, tp) {
      const that = this
      if (tp == '1') {
        // 编辑
        that.$router.push({
          path: 'protectOperationInfo',
          query: {
            parentId: that.parentId,
            parentOrgName: that.parentOrgName,
            nowtype: 2,
            orgType: that.userInfo.orgType,
            id: obj.id,
            isCanEdit: obj.editStatus == 1 // 是否可以编辑
          }
        })
      }
      if (tp == '2') {
        // 详情
        that.$router.push({
          path: 'protectOperationInfo',
          query: {
            parentId: that.parentId,
            parentOrgName: that.parentOrgName,
            nowtype: 3,
            orgType: that.userInfo.orgType,
            id: obj.id,
            isCanEdit: obj.editStatus == 1 // 是否可以编辑
          }
        })
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style scoped>
.color1 {
  color: #068c07;
}
.color2 {
  color: #f95d02;
}
</style>
