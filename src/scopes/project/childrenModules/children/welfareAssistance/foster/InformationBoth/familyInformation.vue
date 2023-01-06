<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="主要照料人"
                          class='spilwid'
                          fieldDecoratorId="name"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入主要照料人" />
            </ta-form-item>

            <ta-form-item class='spilwid3'
                          label="申请日期"
                          fieldDecoratorId="applyDate"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-range-picker />
            </ta-form-item>

            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
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
          <ta-button type='primary'
                     icon="plus"
                     @click='add'>新增</ta-button>

        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <span @click="addAdoption(e,obj,index)"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
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
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    width: '11%'
  },
  {
    title: '主要照料人',
    dataIndex: 'name',
    width: '13%',
    overflowTooltip: true
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '8%'
  },
  // {
  //   title: '出生日期',
  //   dataIndex: 'birthday',
  //   width: '11%'
  // },
  {
    title: '家庭经济年收入(元/年)',
    dataIndex: 'familyIncome',
    width: '18%'
  },
  {
    title: '寄养儿童数量',
    dataIndex: 'fosterChildNumber',
    width: '13%'
  },
  // {
  //   title: '初次评估结果',
  //   dataIndex: 'assessmentResult',
  //   collectionType: 'EVALUATIONRESULTS',
  //   width: '12%',
  //   overflowTooltip: true
  // },
  {
    title: '评估分数',
    dataIndex: 'assessmentGrade',
    width: '10%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: '160px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/fosterFamilyInfo/list', // 数据列表接口，API地址
        mixDeleteURL: '/fosterFamilyInfo/updateDelStateByFosterFamilyIdOrFamilyId', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  mounted () {
  },
  methods: {
    // 删除
    dels (e) {
      const _self = this
      if (e.haveChildNumber && e.haveChildNumber > 0) {
        _self.$message.error('选中的寄养家庭中有寄养儿童，不能删除')
        return false
      }

      _self.post('/fosterFamilyInfo/updateDelStateByFosterFamilyIdOrFamilyId', {
        familyIds: e.id + ',',
        fosterFamilyIds: e.familyBaseId + ','
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('删除成功!')
          _self.handleSubmit()
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    add () {
      this.$router.push({
        name: 'familyInformationFrom'
      })
    },
    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
      this.$router.push({
        path: 'familyInformationEditFrom',
        query: {
          id: obj.id,
          familyId: obj.familyBaseId
          // isedit: true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 430px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
