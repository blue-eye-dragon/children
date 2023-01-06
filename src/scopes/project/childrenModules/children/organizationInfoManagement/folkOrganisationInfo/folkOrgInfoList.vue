<template>
  <!-- 民间机构 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-col :span="24">
              <AreaQuery class='spilwid'
                         :ishide="ishide"
                         :types="types"
                         :labelCol="{ span: 9 }"
                         :wrapperCol="{span:15}"
                         :fileldName="fileldName"
                         msg="区域"
                         v-if="userAreaLevel != '2'"></AreaQuery>
              <ta-form-item label="机构注册性质"
                            class='spilwid'
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{span:15}"
                            fieldDecoratorId="orgRegistered"
                            :fieldDecoratorOptions="{initialValue: ''}">
                <ta-select placeholder="请选择机构性质">
                  <ta-select-option value=''>全部</ta-select-option>
                  <ta-select-option :value="item.value"
                                    v-for="(item,index) in orgNature"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item label="机构名称"
                            class='spilwid'
                            :labelCol="{ span: 9 }"
                            :wrapperCol="{span:15}"
                            fieldDecoratorId="orgName">
                <ta-input placeholder="请输入机构名称" />
              </ta-form-item>

              <ta-form-item>
                <div class="searchbtn searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                </div>
              </ta-form-item>
            </ta-col>
          </ta-form>
        </div>

        <div class="operateBtn">
          <ta-button type="primary"
                     icon="plus"
                     @click="seeOredit">新增机构登记</ta-button>

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
          <span slot="delState"
                slot-scope="val, obj, index">
            <span :class="obj.delState=='1'?'color1':'color2'">{{ obj.delState=="1"?"正常":"已注销"}}</span>
          </span>

          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">

            <span @click="seeOredit(obj,true)"
                  class="com_textsee">查看</span>
            <span v-if="obj.delState=='1'"
                  @click="seeOredit(obj,false)"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="该机构下人员会被删除，确定注销此机构吗?"
                           @confirm="dels(obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           v-if="obj.delState=='1'"
                           cancelText="取消">
              <span v-if="obj.delState=='1'"
                    class="com_textdel">注销</span>
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
    dataIndex: 'areaCode'
  },
  {
    title: '机构名称',
    width: '20%',
    dataIndex: 'orgName'
  },
  {
    title: '机构注册性质',
    width: '20%',
    dataIndex: 'orgRegistered',
    collectionType: 'ORGREGISTERED'
  },
  {
    title: '业务主管单位',
    width: '20%',
    dataIndex: 'competentOrganization'

  },
  {
    title: '是否有委托代养协议',
    dataIndex: 'raisingAgreement',
    width: '21%',
    collectionType: 'YESNO'
  },
  {
    title: '业务范围是否包括抚养儿童',
    dataIndex: 'raisingChild',
    width: '24%',
    collectionType: 'YESNO'
  },
  {
    title: '机构状态',
    dataIndex: 'delState',
    width: '10%',
    scopedSlots: { customRender: 'delState' }
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
        mixGetDataListURL: '/folkOrgManagement/list' // 数据列表接口，API地址
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
  },
  methods: {
    async dels (o) {
      const until = await this.post('/folkOrgManagement/delById ', { id: o.id })
      if (!until.error) {
        this.$message.success('操作成功！')
        this.handleSubmit()
      } else {
        this.$message.error('操作失败！')
      }
    },
    seeOredit (obj, type) {
      let data = {}
      if (!obj) {
        // 新增
        data = { id: '', disabled: false }
      } else {
        data = {
          id: obj.id,
          disabled: type
        }
      }
      this.$router.push({
        name: 'folkOrgInfo',
        query: data
      })
    },

    // 机构注册性质
    async getorgNature () {
      const data = await this.getDictionaries('ORGREGISTERED')
      this.orgNature = data
    },
    advancedquery () {
      this.issearch = !this.issearch
    },
    // 机构类型
    async getorgType () {
      const data = await this.getDictionaries('INSTITUTIONALTYPE')
      this.orgType = data
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
        formData.areaId = formData.address_Linkage[idx]
      }
      return formData
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
