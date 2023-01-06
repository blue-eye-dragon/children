<template>
  <!-- =孤儿基本生活费发放详情 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <div class="visitbtn">
          <ta-button class="btnleft"
                     @click="back">返回</ta-button>
          <ta-button style=" margin-left: 10px;"
                                 class="exportbtn"
                                 icon="upload"
                                 @click="showModal">导出</ta-button>
                      <ta-button v-if="isgoback"
                                 @click="goback">返回</ta-button>
                      <ta-modal :centered="false"
                                style="top: 25%;"
                                :visible="showOn"
                                @ok="Excel"
                                @cancel="handleCancel">
                        <div>
                          <h3>确认导出查询条件下的全部有效数据吗？</h3>
                        </div>
                      </ta-modal>
                      <ta-button v-if="isgoback"
                                           icon="rollback"
                                           @click="goback">返回</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="type"
                slot-scope="val, obj, index">
            <span>{{val|dochildType}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj"
               class="btnlist">
            <span @click="see(val,obj)"
                  class="com_textsee">查看</span>
            <span @click="edit(val,obj)"
                  v-if="areaLevel"
                  class="com_textedit">修改</span>
            <!-- <ta-popconfirm title="确认删除吗?"
                           @confirm="del(val,obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">

              <span class="com_textdel">删除</span>

            </ta-popconfirm> -->
          </div>
        </ta-table>
        <ta-pagination :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
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
import moment from 'moment'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童类型',
    width: '18%',
    dataIndex: 'type',
    overflowTooltip: true,
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    align: 'center',
    width: '10%'
  },
  {
    title: '随访地点',
    dataIndex: 'childCurrentAddress',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '随访时间',
    dataIndex: 'followVisitTime',
    align: 'center',
    width: '8%'
  },
  {
    title: '上报时间',
    dataIndex: 'reportTime',
    align: 'center',
    width: '8%'
  },
  {
    title: '随访问询对象',
    dataIndex: 'enquiryObjectName',
    align: 'center',
    width: '10%'
  },
  {
    title: '随访对象与儿童关系',
    width: '12%',
    dataIndex: 'enquiryObjectRelation',
    overflowTooltip: true,
    align: 'center',
    collectionType: 'RECEIVERRELATION'
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
      type: '1',
      obj: '',
      showOn: false,
      isgoback: false,
      idedit: true,
      mixDataList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/followVisit/queryFollowVisitListById', // 数据列表接口，API地址
        mixEditURL: '', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },

      tableColumns,
      page: 1,
      size: 10,
      visible: false,
      mixPageRef: 'gridPager',
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel == 4
    }
  },
  filters: {
    dochildType (val) {
      const list = [
        {
          label: '监护不当儿童',
          value: '110'
        },
        {
          label: '留守儿童',
          value: '400'
        },
        {
          label: '事实无人抚养儿童',
          value: '120'
        }
      ]
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
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
  },
  computed: {},
  activated () {
    this.obj = ''
    this.childId = this.$route.query.childId
    this.obj = this.$route.query.obj
    // this.getList(this.id)
  },
  mounted () {
  },
  methods: {
    async getList (id) {
      const res = await this.post('/followVisit/queryFollowVisitListById', { childId: this.childId, page: this.page })
      this.mixDataList = res.data.data
    },
    see (val, obj) {
      this.$router.push({
        name: 'newHouseHoldFollow',
        query: {
          jump: 'yes',
          id: obj.id,
          obj: this.obj,
          disabled: true
        }
      })
    },
    edit (val, obj) {
      this.$router.push({
        name: 'newHouseHoldFollow',
        query: {
          jump: 'yes',
          id: obj.id,
          obj: this.obj,
          disabled: false
        }
      })
    },
    async del (v, o) {
      const res = await this.post('/followVisit/updateDelStateById', { id: o.id })
      if (res.errors) {
        // this.$message.error('删除意外失败！')
      } else {
        this.$message.success('操作成功！')
        this.handleSubmit()
      }
    },
    userPageParams () {
      const formData = {}
      formData.childId = this.childId
      return formData
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    back () {
      this.$router.go(-1)
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    handleOk (e) {
      this.exports()
      this.showOn = false
    },
  Excel () {
        var childId = this.$route.query.childId
        let url = '/followVisitApi/queryFollowVisitList'
        this.exportFile(url, {childId})
        this.showOn = false
      }
  }

}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid2 {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
