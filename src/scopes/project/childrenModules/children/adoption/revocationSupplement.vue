<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <!-- <div slot="header">
        <div class="visitbtn">
          <ta-button type="primary" @click="addAdoption">新增收养登记</ta-button>
        </div>
      </div> -->
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
                          class="spilwid1"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="idCard">
              <ta-input placeholder="请输入被收养人证件号" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           type="primary"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>

        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :customRow="fnCustomRow"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="continueprocessing(obj)"
                  :class="obj.handleType==4?'com_revocation':'com_textsee'">{{obj.handleType | handleTypefilter}}</span>
          </div>
          <!-- <a
            slot="action"
            slot-scope="text"
            href="javascript:;"
            @click="addAdoption(e,obj,index)"
          >{{text}}</a> -->
        </ta-table>

      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       :defaultCurrent="page"
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
    title: '被收养人姓名',
    width: '20%',
    dataIndex: 'childName'
  },
  // {
  //   title: '儿童身份证号',
  //   width: '15%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '性别',
    width: '18%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '收养类别',
    width: '22%',
    dataIndex: 'adoptionCategory',
    collectionType: 'adoptionCategory'
  },
  {
    title: '收养登记日期',
    width: '22%',
    dataIndex: 'registerDate'
  },
  {
    title: '登记机构',
    width: '20%',
    dataIndex: 'orgName'
  },
  // {
  //   title: '登记员',
  //   width: '15%',
  //   dataIndex: 'createUser'
  // },
  // {
  //   title: '当前状态',
  //   width: '8%',
  //   dataIndex: 'flowStatus',
  //   collectionType: 'ADOPTIONSTATUS'
  // },
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
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/revokeList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  filters: {
    handleTypefilter (val) {
      switch (val) {
        case 0:
          return '查看'
          break
        case 1:
          return '继续办理'
          break
        case 2:
          return '补全材料'
          break
        case 3:
          return '解除收养'
          break
        case 4:
          return '撤销收养'
          break
        case 5:
          return '出具证明'
          break
        case 6:
          return '补领'
          break
      }
    }
  },
  mounted () { },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // userPageParams () {
    //   let formData = this.form.getFieldsValue()
    //   return {
    //     apap0003: formData.apap0003
    //   }
    // },
    continueprocessing (obj) {
      this.$router.push({
        path: 'revokeForm',
        query: {
          id: obj.id,
          handleType: obj.handleType,
          additionalYesOrNo: '1'
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
</style>
