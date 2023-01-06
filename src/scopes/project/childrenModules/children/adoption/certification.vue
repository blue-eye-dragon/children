<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'100px'}">

      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="收养登记日期"
                          class="spilwid2"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="registerDate">
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item label="被收养人姓名"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="childName">
              <ta-input placeholder="请输入被收养人姓名" />
            </ta-form-item>
            <ta-form-item label="被收养人证件号"
                          class="spilwid3"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="idCard">
              <ta-input placeholder="请输入被收养人证件号" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button @click="resetFrom"
                           icon="reload"
                           class="btnleft reset">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>

          <div slot="flowStatus"
               slot-scope="val, obj, index">
            <span :class="flowStatusClass(val)">{{CollectionLabel('ADOPTIONSTATUS',val)}}</span>
          </div>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">

            <span @click="continueprocessing(obj)"
                  :class="obj.handleType==0?'com_textsee':'com_relieve'">{{obj.handleType | handleTypefilter}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :defaultCurrent="page"
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
    title: '被收养人姓名',
    width: '15%',
    dataIndex: 'childName'
  },
  // {
  //   title: '儿童身份证号',
  //   width: '15%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '收养类别',
    width: '15%',
    dataIndex: 'adoptionCategory',
    align: 'center',
    collectionType: 'adoptionCategory'
  },
  {
    title: '收养登记日期',
    width: '14%',
    dataIndex: 'registerDate'
  },
  {
    title: '登记机构',
    width: '15%',
    dataIndex: 'orgName'
  },
  // {
  //   title: '登记员',
  //   width: '15%',
  //   dataIndex: 'createUser'
  // },
  {
    title: '当前状态',
    width: '8%',
    align: 'center',
    dataIndex: 'flowStatus',
    // collectionType: 'ADOPTIONSTATUS',
    scopedSlots: { customRender: 'flowStatus' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' },
    overflowTooltip: false
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/certificateList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  filters: {
    handleTypefilter (val) {
      let returnVal = ''
      switch (val) {
        case 0:
          returnVal = '查看'
          break
        case 1:
          returnVal = '继续办理'
          break
        case 2:
          returnVal = '补全材料'
          break
        case 3:
          returnVal = '解除收养'
          break
        case 4:
          returnVal = '撤销收养'
          break
        case 5:
          returnVal = '出具证明'
          break
        case 6:
          returnVal = '补领'
          break
      }
      return returnVal
    }
  },
  mounted () { },
  methods: {
    flowStatusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.ADOPTIONSTATUS.SYZ:// 收养中
          classValue = 'com_inaudit'
          break
        case this.Enum.ADOPTIONSTATUS.YJC:// 已解除
          classValue = 'com_tobesubmitted'
          break
        case this.Enum.ADOPTIONSTATUS.YCX:// 已撤销
          classValue = 'com_reject'
          break
        case this.Enum.ADOPTIONSTATUS.BCLZ: // 补材料中
          classValue = 'com_tobeaudited'
          break
        case this.Enum.ADOPTIONSTATUS.YBQCL:// 已补全材料
          classValue = 'com_adopt'
          break
      }
      return classValue
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    continueprocessing (obj) {
      this.$router.push({
        path: 'certificationfrom',
        query: {
          id: obj.id,
          handleType: obj.handleType,
          flowStatus: obj.flowStatus
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid2 {
  width: 430px;
}
.spilwid3 {
  width: 350px;
}
</style>
