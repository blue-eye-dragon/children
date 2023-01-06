<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="文号"
                        class="spilwid"
                        fieldDecoratorId="referenceNumber"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input placeholder="请输入文号" />
          </ta-form-item>
          <ta-form-item label="公文名称"
                        class="spilwid"
                        fieldDecoratorId="documentName"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input placeholder="请输入公文名称" />
          </ta-form-item>
          <ta-form-item label="主题分类"
                        class="spilwid"
                        fieldDecoratorId="subjectClassification"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select placeholder="请选择主题分类"
                       :disabled="idedit">
              <!-- <ta-select-option value>全部</ta-select-option> -->
              <ta-select-option v-for="(item,index) in subjectClassificationList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="发布日期"
                        class="spilwid"
                        fieldDecoratorId="birthdayTime"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-range-picker />
          </ta-form-item>
          <ta-form-item class="spilwid">
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
          </ta-form-item>
        </ta-form>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <span @click="see(e,obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
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
    title: '文号',
    width: '20%',
    dataIndex: 'referenceNumber'
  },

  {
    title: '主题分类',
    width: '19%',
    dataIndex: 'subjectClassification',
    collectionType: 'SUBJECTCLASSIFICATION'
  },
  {
    title: '公文名称',
    width: '19%',
    dataIndex: 'documentName'
  },
  {
    title: '发布日期',
    width: '19%',
    dataIndex: 'publishDate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
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
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/policyRelease/queryPageListPublish', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixAddURL: '', // 新增接口，API地址
        mixEditURL: '', // 修改接口，API地址
        mixQueryByIdURL: '', // 查看详情接口，API地址
        mixPublishURL: '' // 发布接口，API地址
      },
      mixPageRef: 'gridPager',
      subjectClassificationList: []
    }
  },
  mounted () {
    this.getsubjectClassification()
  },
  methods: {
    // 主题分类
    async getsubjectClassification () {
      const data = await this.getDictionaries('SUBJECTCLASSIFICATION')
      this.subjectClassificationList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    see (e, obj) {
      this.$router.push({
        path: 'policyViewDetail',
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
