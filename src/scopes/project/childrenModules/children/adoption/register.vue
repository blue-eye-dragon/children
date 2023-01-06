<template>
  <div style="height:100%"
       class="regtion">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="operateBtn">
          <ta-button slot="tabBarExtraContent"
                     type="primary"
                     :class="{act:yy}"
                     @click="addAdoption">新增收养登记</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
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
                  :class="obj.handleType==0?'com-textsee':obj.handleType==1?'com_continue':'com_polish'">{{obj.handleType | handleTypefilter}}</span>

            <template v-if="obj.recordStatus==1">
              <ta-popconfirm title="确定删除吗?"
                             @confirm="deletes(val,obj,index)"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </template>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :defaultCurrent="page"
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
  {
    title: '性别',
    width: '10%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '收养类别',
    width: '30%',
    dataIndex: 'adoptionCategory',
    collectionType: 'adoptionCategory'
  },
  {
    title: '收养登记日期',
    width: '20%',
    align: 'center',
    dataIndex: 'registerDate'
  },
  {
    title: '登记机构',
    width: '25%',
    align: 'center',
    dataIndex: 'orgName'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 170,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      yy: false,
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
  methods: {
    // 查询参数
    userPageParams () {
      const formData = { additionalYesOrNo: '0' }
      this.changetime(formData)
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 当前状态
    async getsex () {
      const data = await this.getDictionaries('ADOPTIONSTATUS')
      this.sexList = data
    },

    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'registration',
        query: {
          additionalYesOrNo: '0'
        }
      })
    },
    continueprocessing (obj) {
      this.$router.push({
        name: 'registration',
        query: {
          id: obj.id,
          handleType: obj.handleType,
          additionalYesOrNo: '0',
          zcjxbl: true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.borderLayout > .center {
  padding-top: 0px;
}
.regtion /deep/ .header > div {
  padding: 6px 0 0 20px !important;
}
.visitbtn {
  margin-top: 6px;
  margin-bottom: 0;
  padding-right: 10px;
  box-sizing: border-box;
}
.act {
  color: red;
}
</style>
