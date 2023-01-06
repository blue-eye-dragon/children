<template>
  <div style="height:100%"
       ref="twoout">
    <div>
      <ta-table bordered
                ref="three"
                class="tables table-min-width"
                :showOverflowTooltip="true"
                :columns="tableColumns"
                :dataSource="tableData">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="look(obj)"
                class="com_textsee">查看</span>
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
                     ref="gridPager2" />
    </div>
    <ta-drawer title="住房信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="住房性质"
                      fieldDecoratorId="housingNature"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-select :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in housList"
                              :key="index">{{item.label}}</ta-select-option>>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="住房面积(㎡)"
                      fieldDecoratorId="housingArea"
                      :labelCol="{ span: 6 }">
          <ta-input-number :min="0"
                           :max="99999999"
                           :precision="2"
                           :disabled="idedit"
                           style="width:100%" />
        </ta-form-item>
        <AddressComponent :disabled="idedit"
                          msg="工作地址"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"></AddressComponent>
        <ta-form-item label
                      fieldDecoratorId="addressDetails"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ offset:6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="起始日期"
                      fieldDecoratorId="startTime"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">返回</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMinxin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
import { setTimeout } from 'timers'
import AddressComponent from '@component/common/components/addressComponent'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '住房性质',
    dataIndex: 'housingNature',
    collectionType: 'HOUSINGNATURE',
    width: '20.6%'
  },
  {
    title: '住房面积(㎡)',
    dataIndex: 'housingArea',
    width: '20.6%'
  },
  {
    title: '起始日期',
    dataIndex: 'startTime',
    width: '20.6%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '20.6%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMinxin],
  props: {
    childBaseId: {
      types: String
    }
  },
  components: {
    AddressComponent
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      tableData: [],
      page: 1,
      size: 10,
      obj: {},
      housList: [],
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryChildArchivesFollowUpHousingInfo' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager2',
      addressmodel: []
    }
  },
  activated () {

  },
  mounted () {
    this.housingList()
  },
  methods: {
    loadData () { },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 住房性质
    async housingList () {
      let data = await this.getDictionaries('HOUSINGNATURE')
      this.housList = data
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },
    // 查看
    look (obj) {
      this.idedit = true
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
        let arr = []
        arr.push(obj.province, obj.city, obj.county)
        this.addressmodel = [...arr]
      })
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.btnlist span {
  cursor: pointer;
}
</style>
