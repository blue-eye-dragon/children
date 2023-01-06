<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{ showBorder: true }"
                      :layout="{ header: '0px', footer: '80px' }">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="
              searchForm => {
                this.searchForm = searchForm;
              }
            ">
            <AreaQuery class="spilwid"
                       :ishide="ishide"
                       :types="types"
                       :labelCol="{span:9}"
                       :wrapperCol="{span:15}"
                       :fileldName="fileldName"
                       msg="区域"
                       v-if="userAreaLevel != '2'"></AreaQuery>
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
            <ta-form-item>
              <span class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </span>
            </ta-form-item>
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
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <!-- v-if="obj.isShowEditButton == '1'" -->
            <span @click="edit(obj)"
                  class="com_textedit">编辑</span>
            <span @click="see(obj)"
                  class="com_textsee">查看</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
          <div slot="setupTime"
               slot-scope="val, obj">
            <span>{{ obj.setupTime ? obj.setupTime.substr(0, 10) : '' }}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
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
    title: '机构名称',
    // width: '20%',
    dataIndex: 'agencyName'
  },
  {
    title: '机构类型',
    dataIndex: 'orgType',
    collectionType: 'ADOPTIONORGTYPE',
    overflowTooltip: true
  },
  {
    title: '成立时间',
    // width: '20%',
    dataIndex: 'setupTime',
    scopedSlots: { customRender: 'setupTime' }
  },
  {
    title: '办公时间',
    // width: '20%',
    dataIndex: 'officeHours'
  },
  {
    title: '登记机构性质',
    // width: '20%',
    dataIndex: 'agencyNature',
    collectionType: 'ADOPTIONORGNATURE'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    align: 'center',
    width: 220,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  name: 'organizationInformationMaintenance',
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
        mixGetDataListURL: '/adoptionRegisterAgency/list ', // 数据列表接口，API地址
        mixDeleteURL: '/adoptionRegisterAgency/updateDelStateById' // 数据列表接口，API地址
        // getAddressUrl: '/areaManagement/queryAreaByAsync'
      },
      mixPageRef: 'gridPager',
      orgTypeList: [], // 机构类型
      orgNature: [],
      userAreaLevel: '',
      ishide: true,
      types: '1',
      fileldName: 'address_Linkage'
    }
  },
  mounted () {
    this.getorgType()
    // this.getorgNature()
    this.getUserInfo()
  },
  methods: {
    // 机构类型
    async getorgType () {
      let data = await this.getDictionaries('ADOPTIONORGTYPE')
      this.orgTypeList = data
    },
    // 机构性质
    async getorgNature () {
      let data = await this.getDictionaries('INSTITUTIONPROPERTY')
      this.orgNature = data
    },
    // 获取当前登录用户的信息
    async getUserInfo () {
      // 区划级别
      let data = window.parent.indexTool.getUserInfo().areaLevel
      this.userAreaLevel = data
    },
    pagechange (page, size) {
      this.pageNumber = page
      this.pageSize = size
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        let idx = formData.address_Linkage.length - 1
        formData.areaCode = formData.address_Linkage[idx]
      }
      return formData
    },
    add () {
      this.$router.push({
        name: 'organizationInformationAdd',
        query: {
          nowtype: 1
        }
      })
    },

    edit (obj) {
      this.$router.push({
        name: 'organizationInformationAdd',
        query: {
          id: obj.id,
          disabled: false,
          nowtype: 2
        }
      })
    },
    see (obj) {
      this.$router.push({
        name: 'organizationInformationAdd',
        query: {
          id: obj.id,
          disabled: true,
          nowtype: 3
        }
      })
    }
  }
}
</script>