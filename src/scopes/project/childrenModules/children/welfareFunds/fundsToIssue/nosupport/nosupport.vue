<template>
  <!-- =孤儿基本生活费发放 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery msg='地区'
                     v-if="ishide"
                     :ishide.sync='ishide'
                     types='2'></AreaQuery>
          <ta-form-item label="儿童姓名"
                        class="spilwid"
                        fieldDecoratorId="name"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input placeholder="请输入儿童姓名" />
          </ta-form-item>
          <ta-form-item label="儿童性别"
                        class="spilwid"
                        fieldDecoratorId="sex"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select placeholder="请选择儿童性别">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option :value="item.value"
                                v-for="(item,index) in sexList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <!-- <ta-form-item fieldDecoratorId="searchKey"  :labelCol="{span:0}" :wrapperCol="{span:24}">
            <ta-input placeholder="请输入要搜索的内容" style="width:100%;" />
          </ta-form-item> -->
          <ta-form-item class="spilwid">
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
          </ta-form-item>
          <div class="visitbtn">
            <template>
              <ta-button type="primary"
                         @click="add">福利资金发放</ta-button>
            </template>
          </div>
        </ta-form>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="info(val,obj,index)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"
                       
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       
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
    title: '地区',
    dataIndex: 'areaName',
    width: '16%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'issuingCycle2',
    width: '16%'
  },
  {
    title: '性别',
    dataIndex: 'SEX',
    collectionType: 'SEX',
    width: '14%'
  },
  {
    title: '出生日期',
    dataIndex: 'issuingCycle',
    width: '15%'
  },
  {
    title: '身份状态',
    dataIndex: 'issueYears',
    collectionType: 'ADOPTIONCATEGORY',
    width: '15%'
  },
  {
    title: '户籍所在地',
    dataIndex: 'grantingNumber',
    width: '16%'
  },
  {
    title: '上报日期',
    dataIndex: 'costOfLiving',
    width: '15%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
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
      mixDataList: [],
      mixListOptions: {
        mixGetDataListURL: '/orphanLivingExpenses/list', // 数据列表接口，API地址
        mixAddURL: '/householdRegistration/saveSettle', // 新增接口
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },

      tableColumns,
      page: 1,
      size: 10,
      mixPageRef: 'gridPager',
      ishide: true,
      sexList: [],
      adoptionlist: []
    }
  },
  mounted () {
    this.getsex()
    this.getchildtype()
  },
  methods: {
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // // 获取儿童类型

    async getchildtype () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    // ---
    add () {
      // 新增跳转
    },

    info (val, obj, index) {
      console.log(obj)
      // 详情跳转
      this.$router.push({
        path: 'paymentOfLivingExpensesInfo',
        query: {
          id: obj.id
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
