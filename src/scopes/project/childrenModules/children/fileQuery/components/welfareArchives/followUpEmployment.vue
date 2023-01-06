<template>
  <div style="height:100%"
       ref="twoout">
    <div>
      <ta-table bordered
                ref="two"
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
      <ta-pagination  :defaultCurrent="page"  class='pagination'
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="tableData"
                     
                     :params="userPageParams"
                     @change="pagechange"
                     :url="mixListOptions.mixGetDataListURL"
                     :ref="mixPageRef" />
    </div>
    <ta-drawer title="就业信息"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="工作单位"
                      fieldDecoratorId="workUnit"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <AddressComponent :disabled="idedit"
                          msg="单位地址"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"></AddressComponent>
        <ta-form-item label
                      fieldDecoratorId="addressDetails"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ offset:6 }">
          <ta-input :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="起始日期"
                      fieldDecoratorId="educationTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}">
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
    title: '工作单位',
    dataIndex: 'workUnit',
    width: '16%'
  },
  {
    title: '单位地址',
    dataIndex: 'unitAddress',
    width: '19.5%'
  },
  {
    title: '开始日期',
    dataIndex: 'startTime',
    width: '13%'
  },
  {
    title: '结束日期',
    dataIndex: 'endTime',
    width: '13%'
  },
  {
    title: '登记日期',
    dataIndex: 'createTime',
    width: '13%'
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
      validNowTime: 'right',
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      tableData: [],
      page: 1,
      size: 10,
      obj: {},
      adoptionlist: [],
      mixListOptions: {
        mixGetDataListURL: '/childArchives/queryChildArchivesFollowUpEmploymentInfo' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager1',
      addressmodel: []
    }
  },

  mounted () {
  },
  methods: {
    loadData () { },
    setContainer () {
      return this.set_Container('tadrawer')
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
      obj['educationTime'] = obj.startTime + '~' + obj.endTime
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
