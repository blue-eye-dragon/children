<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item v-show="false"
                          fieldDecoratorId="additionalYesOrNo"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}"
                          :fieldDecoratorOptions="{initialValue: '1'}">
              <ta-input />
            </ta-form-item>
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
                <ta-button class="search"
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
        <div v-show="isdifferent"
             key="1">
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

              <span v-if="obj.saveStatus == '0'"></span>
              <span @click="continueprocessing(obj)"
                    v-else
                    :class="obj.handleType==3?'com_relieve':'com_textsee'">{{obj.handleType | handleTypefilter}}</span>
            </div>
          </ta-table>

        </div>

      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       :defaultCurrent="page"
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
  mixins: [listMixin],
  data () {
    return {
      isExpand: false,
      issearch: false,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/relieveList', // 数据列表接口，API地址
        copymixGetDataListURL: '/adoption/relieveAllList'
      },
      mixPageRef: 'gridPager',
      copymixPageRef: 'copygridPager',
      isdifferent: true,
      visible: false,
      id: ''
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
  activated () {
    this.isdifferent = true
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch)
  },
  mounted () { },
  methods: {
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue && node && node.style) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 70 + 'px'
        } else if (node && node.style) {
          node.style.height = '70px'
        }
        if (node && node.style) {
          node.style.transition = 'all 1s'
        }
      })
    },
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
        path: 'relieve',
        query: {
          id: obj.id,
          zcjcsy: '0',
          handleType: obj.handleType,
          additionalYesOrNo: '1',
          isbulu: '1'
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
