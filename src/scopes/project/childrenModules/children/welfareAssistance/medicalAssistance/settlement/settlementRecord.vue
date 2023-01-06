<template>
  <div class="searchdata">
    <!-- 结算记录  部级用户 -->
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="年度"
                        fieldDecoratorId="year"
                        class="spilwid2"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-year-picker placeholder="请选择年度" />
          </ta-form-item>
          <areaQuery class="spilwid2"
                     v-if="ishide"
                     :msg="'省份'"
                     :fileldName="fileldName"
                     :ishide.sync="ishide"
                     :types="types"></areaQuery>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
            <!-- <ta-button type="primary" class="btnleft">导出</ta-button> -->
          </ta-form-item>
        </ta-form>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee"
                  @click="addAdoption(text,obj,index)">详情</span>
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
import areaQuery from '@component/common/components/areaQuery'
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
    title: '年度',
    width: '13%',
    dataIndex: 'year'
  },
  {
    title: '省份',
    width: '13%',
    dataIndex: 'areaName'
  },
  {
    title: '儿童人数',
    width: '13%',
    dataIndex: 'number'
  },
  //   {
  //     title: '身份证号',
  //     width: '13%',
  //     dataIndex: 'idCard'
  //   },
  {
    title: '医疗康复总费用',
    width: '13%',
    dataIndex: 'rehabilitation'
  },

  {
    title: '申请明天计划资助金额（元）',
    width: '13%',
    dataIndex: 'fund'
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
  name: 'revoke',
  components: {
    areaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueSettleAccounts/settleAccountsRecordForMinistry' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      fileldName: 'address_Linkage',
      types: '1',
      ishide: true
      // diseasetypeList: []
    }
  },
  mounted () {
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () { },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()

      if (formData.address_Linkage) {
        let area = formData.address_Linkage
        delete formData.address_Linkage
        let length = area.length
        console.log(length)
        let lengthId = length - 1
        formData.areaId = area[lengthId]
      }
      this.changetime(formData)
      return formData
    },
    changetime (data) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            let arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY')
          }
        }
      }
    },
    addAdoption (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'bujiRecordDetails',
        query: {
          obj: str,
          index: index,
          goType: 'salvageApproval-Detail'
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
.batchfrom {
  position: relative;
  width: 100%;
  height: 100%;
}
.boms {
  width: 100%;
  height: 58px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-right: 20px;
}
.spilwid {
  width: 300px;
}
.spilwid2 {
  width: 350px;
}
</style>
