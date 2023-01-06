<template>
  <div>
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"
             style="padding: 1%;">
      <ta-form-item label="登记日期"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="registerTime">
        <ta-range-picker />
      </ta-form-item>
      <ta-form-item label="收养人男方姓名"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="adoptionManName">
        <ta-input placeholder="请输入收养人男方姓名" />
      </ta-form-item>
      <ta-form-item label="收养人女方姓名"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="adoptionWomanName">
        <ta-input placeholder="请输入收养人女方姓名" />
      </ta-form-item>
      <ta-form-item label="登记机构"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="registerOrgName">
        <ta-input placeholder="请输入登记机构" />
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
    <ta-table bordered
              class="tables table-min-width"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="mixDataList">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <template slot="name"
                slot-scope="a,b,c">
        <a><span @click="childDetail(b)">{{a}}</span></a>
      </template>
      <div slot="action"
           slot-scope="text,obj,index"
           class="btnlist">
        <span @click="look(obj)"
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
    title: '儿童姓名',
    width: '18%',
    dataIndex: 'name'
  },
  {
    title: '收养人男方姓名',
    width: '18%',
    dataIndex: 'adoptionManName'
  },
  {
    title: '收养人女方姓名',
    width: '18%',
    dataIndex: 'adoptionWomanName'
  },
  {
    title: '登记日期',
    width: '13%',
    dataIndex: 'registerTime'
  },
  {
    title: '登记机构',
    width: '13%',
    dataIndex: 'orgName'
  }, {
    title: '登记员',
    width: '13%',
    dataIndex: 'registrar'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  props: ['childBaseId'],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childArchives/queryAdoptionInfoByChildBaseId' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值

    }
  },
  activated () {
  },
  mounted () {
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData['childBaseId'] = this.childBaseId
      formData['searchType'] = '1'
      return formData
    },
    // 详情
    look (e) {
      this.$emit('adoptionInformationLook', e)
    }
  }
}
</script>
<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
