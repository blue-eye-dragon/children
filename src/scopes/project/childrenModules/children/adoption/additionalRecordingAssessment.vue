<template>
  <div style="height:100%"
       class="regtion">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label='被收养人姓名'
                          :labelCol="{span:10}"
                          :wrapperCol="{span:14}"
                          fieldDecoratorId="childName">
              <ta-input placeholder="请输入被收养人姓名" />
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
            <span @click="goAdd(obj,'评估','1')"
                  :class="'com_polish'">评估</span>
            <span v-if="obj.isFuse=='否'"
                  @click="goAdd(obj,'融合','2')"
                  :class="'com_correlation'">融合</span>
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '16%'
  },
  {
    title: '被收养人姓名',
    dataIndex: 'childName',
    width: '16%'
  },
  {
    title: '收养申请人姓名',
    dataIndex: 'name',
    width: '16%'
  },
  {
    title: '收养申请人身份证号',
    dataIndex: 'idCard',
    width: '17%'
  },
  {
    title: '收养登记机关',
    dataIndex: 'orgName',
    width: '16%'
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
        mixGetDataListURL: '/adoptionAssessmentFuse/adoptionRegisterAssessHandleList' // 数据列表接口，API地址

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
      const formData = this.searchForm.getFieldsValue()
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
    goAdd (obj, name, flag) {
      if (name == '评估') {
        if (obj.isFuse != '是') {
          this.$confirm({
            title: '该收养业务未录入融合信息，评估后将不可进行融合，是否直接进行评估？',
            content: ' ',
            onOk: () => {
              this.$router.push({
                name: 'additionalToEvaluate',
                query: {
                  id: obj.id,
                  titleName: name,
                  flag: flag
                }
              })
            },
            onCancel: () => { }
          })
        } else {
          this.$router.push({
            name: 'additionalToEvaluate',
            query: {
              id: obj.id,
              titleName: name,
              flag: flag
            }
          })
        }
      } else {
        this.$router.push({
          name: 'additionalToEvaluate',
          query: {
            id: obj.id,
            titleName: name,
            flag: flag
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
