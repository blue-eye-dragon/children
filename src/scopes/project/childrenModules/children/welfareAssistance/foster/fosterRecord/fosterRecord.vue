<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="寄养儿童"
                          class='spilwid'
                          fieldDecoratorId="childrenName"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入寄养儿童" />
            </ta-form-item>

            <ta-form-item label="寄养开始日期"
                          class="spilwid3"
                          fieldDecoratorId="forsterDate"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-range-picker />
            </ta-form-item>

            <ta-form-item label="寄养状态"
                          class='spilwid'
                          fieldDecoratorId="relationStatus"
                          :fieldDecoratorOptions="{initialValue: ''}"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择寄养状态">
                <ta-select-option value="">全部</ta-select-option>
                <ta-select-option :value="item.value"
                                  v-for="(item,index) in fosterList"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
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
        <div class="operateBtn">
          <ta-button type="primary"
                     icon="plus"
                     @click="gocare"
                     :disabled='this.chose_data.length==0'>寄养情况跟踪评估</ta-button>
          <ta-button type="primary"
                     @click='gofunds'
                     icon="plus"
                     class="btnleft"
                     :disabled='this.chose_data.length==0'>寄养经费</ta-button>

        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :rowSelection="mixRowSelection"
                  :dataSource="tableData"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <a slot='primaryCaregiverName'
             slot-scope="val, obj, index"
             @click="gofamily(val, obj, index)">
            {{obj.primaryCaregiverName}}
          </a>
          <a slot='childrenName'
             slot-scope="val, obj, index"
             @click="gochildren(val, obj, index,2)">
            {{obj.childrenName}}
          </a>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="godetail(obj)"
                  class="com_textsee">查看</span>
          </div>
          <div slot="status"
               slot-scope="val, obj, index">
            <span :class="statusClass(val)">{{CollectionLabel('FOSTER_STATUS',val)}}</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
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
    title: '主照料人姓名',
    width: '15%',
    dataIndex: 'primaryCaregiverName',
    scopedSlots: { customRender: 'primaryCaregiverName' }
  },
  {
    title: '性别',
    width: '12%',
    align: 'center',
    dataIndex: 'sex'
  },
  {
    title: '寄养儿童',
    width: '14%',
    dataIndex: 'childrenName',
    scopedSlots: { customRender: 'childrenName' }
  },
  // {
  //   title: '寄养关系确定日期',
  //   width: '12%',
  //   dataIndex: 'fosterRelationConfirmDate'
  // },
  {
    title: '寄养开始日期',
    width: '15%',
    dataIndex: 'fosterStartDate'
  },
  {
    title: '寄养结束日期',
    width: '15%',
    dataIndex: 'forsterEndDate'
  },
  {
    title: '寄养关系解除日期',
    width: '18%',
    dataIndex: 'cancelFosterRelationDate'
  },
  {
    title: '寄养状态',
    width: '13%',
    dataIndex: 'relationStatus',
    // collectionType: 'FOSTER_STATUS'
    scopedSlots: { customRender: 'status' }
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
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/fosterRecord/list' // 数据列表接口，API地址
      },
      mixRowSelection: {
        type: 'radio',
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [], // 多选数组
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      mixPageRef: 'gridPager',
      fosterList: []
      // hideDefaultSelections
    }
  },
  activated () {

  },
  mounted () {
    this.getfoster()
  },
  methods: {
    // 寄养状态 FOSTER_STATUS
    async getfoster () {
      let data = await this.getDictionaries('FOSTER_RECORD_STATUS')
      this.fosterList = data
    },
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.FOSTER_STATUS.DJY:// 待寄养
          classValue = 'com_tobeaudited'
          break
        case this.Enum.FOSTER_STATUS.RHZ:// 融合中
          classValue = 'com_inaudit'
          break
        case this.Enum.FOSTER_STATUS.JYZ:// 寄养中
          classValue = 'com_inaudit'
          break
        case this.Enum.FOSTER_STATUS.RHJS: // 融合结束
          classValue = 'com_adopt'
          break
        case this.Enum.FOSTER_STATUS.YJC:// 已解除
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    gocare () {
      this.$router.push({
        path: 'fostercare',
        query: {
          childBaseId: this.chose_data[0].id// childBaseId
        }
      })
    },
    gofunds () {
      this.$router.push({
        name: 'fosterCarefund',
        query: {
          childBaseId: this.chose_data[0].id// childBaseId
        }
      })
    },
    gofamily (val, obj, index) {
      this.$router.push({
        path: 'familyInformationEditFrom',
        query: {
          id: obj.fosterFamilyId,
          familyId: obj.familyId,
          isedit: true
        }
      })
    },
    gochildren (e, obj, index, type) {
      this.$router.push({
        path: 'fosterFrom',
        query: {
          childBaseId: obj.childBaseId,
          fosterChildId: obj.fosterChildId,
          childEnterId: obj.enterId,
          type
        }
      })
    },
    godetail (val) {
      let dataStr = JSON.stringify(val)
      this.$router.push({
        path: 'recorddetails',
        query: {
          dataStr: dataStr
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>
