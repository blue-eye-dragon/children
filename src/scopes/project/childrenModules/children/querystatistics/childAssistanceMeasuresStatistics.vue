<template>
   <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'80px',footer:'80px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

              <areaQuery :msg="'区域'"
                         class="spilwid"
                         :fileldName="'areaId'"
                         :ishide="false"></areaQuery>

              <ta-form-item label="登记时间"
                            fieldDecoratorId="registerTime"
                            class="spilwid"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}">
                <ta-range-picker />
              </ta-form-item>

              <ta-form-item label="儿童类别"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="spilwid"
                            fieldDecoratorId="childType">
                <ta-select class="selectwid"
                           placeholder="请选择儿童类别">
                  <ta-select-option value>全部</ta-select-option>
                  <ta-select-option value='5'>事实无人抚养儿童</ta-select-option>
                  <ta-select-option value='8'>留守儿童 </ta-select-option>
                  <ta-select-option value='9'>困境儿童</ta-select-option>
                </ta-select>
              </ta-form-item>

              <ta-form-item>

 <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="getlist">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>

              </ta-form-item>

        </ta-form>
      </div>
      <div>
        <ta-table bordered
                  class="tables table-min-width"
                  style="margin-top:20px"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
        </ta-table>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '',
    dataIndex: 'areaName',
    width: '15%'
  },
  {
    title: '合计',
    dataIndex: 'hejiAmount',
    width: '6%'
  },
  {
    title: '建档立卡贫困户',
    dataIndex: 'jiandanglikaAmount',
    width: '12%'
  },
  {
    title: '最低生活保障',
    dataIndex: 'dibaojiatingAmount',
    width: '11%'
  },
  {
    title: '特困供养',
    dataIndex: 'jiuzhugongyangAmount',
    width: '8%'
  },
  {
    title: '临时救助',
    dataIndex: 'linshiAmount',
    width: '8%'
  },
  {
    title: '医疗救助',
    dataIndex: 'yiliaoAmount',
    width: '8%'
  },
  {
    title: '住房救助',
    dataIndex: 'zhufangAmount',
    width: '8%'
  },
  {
    title: '困难残疾人生活补助',
    dataIndex: 'kunnanAmount',
    width: '15%'
  },
  {
    title: '重度残疾人护理补助',
    dataIndex: 'zhongcanAmount',
    width: '15%'
  },
  {
    title: '孤儿津贴',
    dataIndex: 'guerAmount',
    width: '8%'
  },
  {
    title: '其他',
    dataIndex: 'qitajiuzhuAmount',
    width: '6%'
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    return {
      tableColumns,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        mixGetDataListURL: '/factNoOneRaisedWholeApi/queryUnattendedHelp' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  methods: {
    // 读取列表 无分页形式
    async getlist () {
      let formData = this.form ? this.form.getFieldsValue() : {}
      if (formData.areaId && formData.areaId.length > 0) {
        formData['areaId'] = formData.areaId.slice(-1).toString()
      }
      this.changetime(formData)
      let params = {
        ...formData
      }
      let res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.mixDataList = res.data.data
      }
    },
    // 重置
    resetFrom () {
      this.form.resetFields()
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.spilwid{
  width: 280px;
}
</style>
