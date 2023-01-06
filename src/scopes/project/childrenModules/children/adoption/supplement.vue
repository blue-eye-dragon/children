<template>
  <div style="height:100%">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0',footer:'80px'}">
      <!-- <div slot="header">
        <div class="visitbtn">
          <ta-button type="primary"
                     @click="addAdoption">补录收养登记</ta-button>
        </div>
      </div> -->
      <div>
        <div class="operateBtn">
          <ta-button type="primary"
                     @click="addAdoption">补录收养登记</ta-button>
        </div>
        <!-- <ta-tabs defaultActiveKey="1">
          <ta-tab-pane tab="未办结事项"
                       key="1"> -->
        <!-- <ta-form layout="inline"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <ta-form-item label="收养登记日期"
                            :labelCol="{span:6}"
                            :wrapperCol="{span:18}"
                            fieldDecoratorId="registerDate">
                <ta-range-picker />
              </ta-form-item>
              <ta-form-item fieldDecoratorId="searchKey">
                <ta-input placeholder="请输入姓名、身份证号"
                          style="width:250px;" />
              </ta-form-item>
              <ta-form-item v-show="false"
                            fieldDecoratorId="additionalYesOrNo"
                            :labelCol="{span:2}"
                            :wrapperCol="{span:22}"
                            :fieldDecoratorOptions="{initialValue: '1'}">
                <ta-input />
              </ta-form-item>
              <ta-form-item>
                <ta-button type="primary"
                           @click="handleSubmit('search')">查询</ta-button>
              </ta-form-item>
            </ta-form> -->
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
                  :class="obj.handleType==3?'com_relieve':'com_textsee'">{{obj.handleType | handleTypefilter}}</span>
            <template v-if="obj.recordStatus==1">
              <!-- <ta-divider type="vertical" /> -->
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deletes(val,obj,index)"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </template>
          </div>
        </ta-table>
        <!-- <ta-pagination class='pagination'
                           showSizeChanger
                            :defaultCurrent="page"
                           showQuickJumper
                           :dataSource.sync="tableData"

                           :params="userPageParams"
                           @change="pagechange"
                           :url="mixListOptions.mixGetDataListURL"
                           ref="gridPager" /> -->
        <!-- </ta-tab-pane> -->

        <!-- </ta-tabs> -->
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
  //   dataIndex: 'flowStatus',
  //   width: '8%',
  //   collectionType: 'ADOPTIONSTATUS'
  // },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
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
        mixGetDataListURL: '/adoption/list', // 数据列表接口，API地址
        mixDeleteURL: '/adoption/delete'
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
    // 查询参数
    userPageParams () {
      const formData = { additionalYesOrNo: '1' }
      this.changetime(formData)
      return formData
    },
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
    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'registration',
        query: {
          additionalYesOrNo: '1'
        }
      })
    },
    continueprocessing (val) {
      this.$router.push({
        name: 'registration',
        query: {
          id: val.id,
          handleType: val.handleType,
          additionalYesOrNo: '1'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
