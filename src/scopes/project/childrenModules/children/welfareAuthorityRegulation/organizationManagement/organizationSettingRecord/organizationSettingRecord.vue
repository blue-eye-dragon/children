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
                <AreaQuery class='spilwid'
                           :ishide="ishide"
                           :types="types"
                           :labelCol="{ span: 9 }"
                           :wrapperCol="{span:15}"
                           :fileldName="fileldName"
                           msg="区域"
                           v-if="userAreaLevel != '2'"></AreaQuery>
                <ta-form-item label="机构性质"
                              class='spilwid'
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="orgNature"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select placeholder="请选择机构性质">
                    <ta-select-option value=''>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in orgNature"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <!-- <ta-col :span="8"> -->
                <ta-form-item label="机构名称"
                              class='spilwid'
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="orgName">
                  <ta-input placeholder="请输入机构名称" />
                </ta-form-item>
                <ta-form-item label="申办人"
                              class='spilwid'
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="bidPerson">
                  <ta-input placeholder="请输入申办人" />
                </ta-form-item>

                <!-- <ta-col :span="8"> -->
                <ta-form-item label="机构类型"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="orgType"
                              :fieldDecoratorOptions="{initialValue: ''}"
                              class='spilwid'>
                  <ta-select placeholder="请选择机构类型">
                    <ta-select-option value=''>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in orgType"
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
        <div class="operateBtn">
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增机构登记</ta-button>

        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ pageSize * (pageNumber - 1) + index + 1 }}</span>
          </span>

          <span slot="state"
                slot-scope="val, obj, index">
            <span :class="obj.state=='1'?'color1':'color2'">{{ obj.state=="1"?"正常":"已注销"}}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">

            <span @click="see(obj)"
                  class="com_textsee">查看</span>
            <span @click="edit(obj)"
                  class="com_textedit"
                  v-if="obj.isShowEditButton=='1'&&obj.state=='1'">编辑</span>
            <ta-popconfirm title="该机构下已录入人员信息会被删除，确定注销此机构吗？"
                           @confirm="dels(obj,index)"
                           @cancel="cancel"
                           v-if="(obj.isShowEditButton=='1')&&userOrgtype &&obj.state=='1'"
                           okText="确定"
                           cancelText="取消">
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
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '区域',
    width: '20%',
    dataIndex: 'area'
  },
  {
    title: '机构名称',
    width: '20%',
    dataIndex: 'orgName'
  },
  {
    title: '机构类型',
    width: '20%',
    dataIndex: 'orgType',
    collectionType: 'INSTITUTIONALTYPE'
  },
  {
    title: '机构性质',
    width: '20%',
    dataIndex: 'orgNature',
    collectionType: 'INSTITUTIONPROPERTY'
  },
  {
    title: '申办人',
    width: '20%',
    dataIndex: 'bidPerson'
  },
  {
    title: '机构状态',
    dataIndex: 'state',
    width: '10%',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  name: 'organizationSettingRecord',
  components: {
    AreaQuery
  },
  data () {
    return {
      disabled: true,
      tableColumns,
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      mixListOptions: {
        mixGetDataListURL: '/orgEstablishRegister/list', // 数据列表接口，API地址
        getAddressUrl: '/areaManagement/queryAreaByAsync'
      },
      mixPageRef: 'gridPager',
      orgType: [],
      userOrgtype: window.parent.indexTool.getUserInfo().orgType == '01',
      orgNature: [],
      userAreaLevel: '',
      ishide: true,
      types: '1',
      fileldName: 'address_Linkage',
      issearch: false
    }
  },
  mounted () {
    this.getorgType()

    this.getorgNature()
    this.getUserInfo()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
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
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 机构类型
    async getorgType () {
      const data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.orgType = data
    },
    // 机构性质
    async getorgNature () {
      const data = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.orgNature = data
    },
    // 获取当前登录用户的信息
    async getUserInfo () {
      // 区划级别
      const data = window.parent.indexTool.getUserInfo().areaLevel
      this.userAreaLevel = data
    },
    pagechange (page, size) {
      this.pageNumber = page
      this.pageSize = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        const idx = formData.address_Linkage.length - 1
        formData.areaCode = formData.address_Linkage[idx]
      }
      return formData
    },
    add () {
      this.$router.push({
        name: 'registrationOfEstablishment'
      })
    },
    edit (obj) {
      this.$router.push({
        name: 'registrationOfEstablishment',
        query: {
          id: obj.id,
          disabled: false,
          ishide: false
        }
      })
    },
    see (obj) {
      this.$router.push({
        name: 'registrationOfEstablishment',
        query: {
          id: obj.id,
          disabled: true
        }
      })
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
