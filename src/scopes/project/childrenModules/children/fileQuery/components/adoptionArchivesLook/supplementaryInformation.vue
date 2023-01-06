<template>
  <div class="contentin">
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
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
      <ta-form-item label="补录登记类别"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="biztype">
        <ta-select placeholder="请选择补录登记类别">
          <ta-select-option value>全部</ta-select-option>
          <ta-select-option :value="item.value"
                            v-for="(item,index) in biztypeList"
                            :key="index">{{item.label}}</ta-select-option>
        </ta-select>
      </ta-form-item>
      <ta-form-item label="登记机构"
                    class="spilwid"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}"
                    fieldDecoratorId="registerOrgName">
        <ta-input placeholder="请输入登记机构" />
      </ta-form-item>
      <ta-form-item>
        <ta-button type="primary"
                   @click="handleSubmit('search')">查询</ta-button>
        <ta-button class="btnleft"
                   @click="resetFrom">重置</ta-button>
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
    title: '补录登记类别',
    width: '18%',
    dataIndex: 'biztype',
    collectionType: 'ADDITIONALREGISTERCATEGORY'
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
      mixPageRef: 'gridPager', // 用于获取分页ref值

      biztypeList: [] // 补录登记类别字典数据

    }
  },
  mounted () {
    this.getAllMenuDatas()
  },
  methods: {
    // 所有字典数据获取
    getAllMenuDatas () {
      this.getMenu('ADDITIONALREGISTERCATEGORY', 'biztypeList') // 补录登记类别下拉框数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          _self[name] = res.data.codeList
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData['childBaseId'] = this.childBaseId
      formData['searchType'] = '4'
      return formData
    },
    // 详情
    look (e) {
      this.$emit('aupplementaryLook', e)
    }
  }
}
</script>
<style scoped lang="less">
.contentin {
  padding: 0 20px;
  box-sizing: border-box;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
