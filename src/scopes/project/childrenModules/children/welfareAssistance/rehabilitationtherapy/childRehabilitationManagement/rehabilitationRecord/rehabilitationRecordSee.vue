<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'80px',footer:'80px'}">
      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="康复编号"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="rehabilitNumber">
            <ta-input placeholder="请输入康复编号" />
          </ta-form-item>
          <ta-form-item label="康复类型"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="rehabilitTypes">
            <ta-select placeholder="请选择康复类型">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="(item,index) in recoverTypesList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="康复批次"
                        fieldDecoratorId="rehabilitBatches"
                        class="spilwid2"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:14}">
            <ta-input placeholder="请输入康复批次" />
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

            <!-- <ta-button type="primary"
                       @click="handleSubmit('search')"
                       class="btnleft">查询</ta-button>
            <ta-button @click="resetFrom"
                       class="btnleft">重置</ta-button> -->
            <!-- <ta-button style="margin-left: 20px;" class="exportbtn" @click="showModal">导出</ta-button>
            <ta-modal
              :centered="false"
              style="top: 25%;"
              :visible="showOn"
              @ok="Excel"
              @cancel="handleCancel"
            >
              <div>
                <h3>确认导出查询条件下的全部有效数据吗？</h3>
              </div>
            </ta-modal> -->
          </ta-form-item>

        </ta-form>
      </div>
      <div class="visitbtn">
        <ta-button @click="back"
                   icon='rollback'>返回</ta-button>
        <ta-button class="exportbtn btnleft"
                   icon='upload'
                   @click="showModal">导出</ta-button>
        <ta-modal :centered="false"
                  style="top: 25%;"
                  :visible="showOn"
                  @ok="Excel"
                  @cancel="handleCancel">
          <div>
            <h3>确认导出查询条件下的全部有效数据吗？</h3>
          </div>
        </ta-modal>

      </div>
      <div>
        <ta-table class="table table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="rehabilitTypes"
                slot-scope="a, b, c">
            <span>{{ b.rehabilitTypes|dorehabilitTypes }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj,index)"
                  class="com_textsee">查看</span>
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
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
import { get } from 'http'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '康复编号',
    width: '10%',
    dataIndex: 'rehabilitNumber',
    overflowTooltip: true
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '12%',
    overflowTooltip: true
  },
  {
    title: '康复结束日期',
    dataIndex: 'rehabilitEndDate',
    width: '11%',
    overflowTooltip: true
  },
  {
    title: '康复类型',
    dataIndex: 'rehabilitTypes',
    scopedSlots: { customRender: 'rehabilitTypes' },
    width: '10%',
    overflowTooltip: true
  },
  {
    title: '康复批次',
    dataIndex: 'rehabilitBatches',
    width: '10%',
    overflowTooltip: true
  },
  {
    title: '主管康复医师',
    width: '12%',
    dataIndex: 'chiefPhysician',
    overflowTooltip: true
  },
  {
    title: '康复基地',
    width: '12%',
    dataIndex: 'baseName',
    collectionType: 'BASESTATE',
    overflowTooltip: true
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  mixins: [listMixin],
  components: {
    AddressComponent
  },

  data () {
    return {
      tableColumns,
      tableData: [],
      showOn: false,
      page: 1,
      size: 10,
      idedit: false,
      childtypelist: [],
      baseTypeList: [],
      sexList: [],
      worktudyList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/rehabilitManage/rehabilitationRecords', // 数据列表接口，API地址
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,

      ed: false,
      addressmodel: [],
      recoverTypesList: [],
      illnesstypeList: [],
      disabilitytypeList: [],
      ids: '',
      childrenId: ''
    }
  },
  created () {
    that = this
  },
  activated () {
    let crosse = this.$route.query
    let that = this
    this.ids = crosse.ids
    this.childrenId = crosse.childId
  },
  mounted () {
    this.userId = window.parent.indexTool.getUserInfo().userId

    this.getillnesstypeList()
    this.getdisabilitytypeList()
    this.getrecoverTypesList()
  },
  methods: {
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      formData.childNumber = this.ids
      formData.id = this.childrenId
      return formData
    },
    // 康复类型
    async getrecoverTypesList () {
      let data = await this.getDictionaries('REHABILITATTYPES')
      this.recoverTypesList = data
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },

    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },
    back () {
      // 取消。提交
      this.$router.go(-1)
    },

    see (val, obj, index) {
      this.$router.push({
        path: 'see',
        query: {
          rehabiliteId: obj.rehabiliteId,
          toto: '1'
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/exportRehabilitationRecordsList', data)
      this.showOn = false
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()
      // console.log(ss)
      this.showOn = true
    },
    handleCancel (e) {
      // console.log(e)
      this.showOn = false
    },

    other (val) {
      let str = JSON.stringify(val)
      let data = JSON.parse(str)
      data.recordDate = moment(data.recordDate)

      let arr = []
      arr.push(data.province)
      this.addressmodel = [...arr]

      return data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },
  filters: {
    dorehabilitTypes (val) {
      let list = that.recoverTypesList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 280px;
}
.spilwid2 {
  width: 240px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
