<template>
  <div>
    <ta-table bordered
              class="tables table-min-width"
              style="padding-top: 17px;"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="mixDataList">
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <div slot="action"
           slot-scope="text,obj,index"
           class="btnlist">
        <span @click="look(obj)"
              class="com_textsee">查看</span>
      </div>
    </ta-table>
    <ta-pagination  :defaultCurrent="page"
                   
                   class='pagination'
                   showSizeChanger
                   showQuickJumper
                   :dataSource.sync="mixDataList"
                   
                   :params="userPageParams"
                   @change="pagechange"
                   :url="mixListOptions.mixGetDataListURL"
                   ref="gridPager" />
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
    title: '工学情况',
    dataIndex: 'workStudySituation',
    collectionType: 'WORKSTUDY',
    width: '12%'
  },
  {
    title: '教育起始时间',
    dataIndex: 'educationTimeStart',
    width: '10%'
  },
  {
    title: '教育结束时间',
    dataIndex: 'educationTimeEnd',
    width: '10%'
  },
  {
    title: '是否为孤儿助学',
    dataIndex: 'isAcceptHelpStudy',
    width: '10%',
    collectionType: 'YESNO'
  },
  {
    title: '助学经费总金额（元）',
    width: '15%',
    dataIndex: 'helpStudyFundsTotalAmount'
  },
  {
    title: '发放周期',
    dataIndex: 'provideCycle',
    width: '10%'
  },
  {
    title: '发放次数',
    dataIndex: 'provideNumberOfTimes',
    width: '10%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  props: ['childEnterId', 'childBaseId', 'increaseDatas'],
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childArchives/queryChildArchivesEducationInfoList' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值

    }
  },
  mounted () {
  },
  methods: {
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      return {
        childBaseId: this.childBaseId
      }
    },
    // 详情
    look (e) {
      let obj = e
      obj['name'] = this.increaseDatas.length > 0 ? this.increaseDatas[0].name : null
      obj['idCard'] = this.increaseDatas.length > 0 ? this.increaseDatas[0].idCard : null
      obj['childNumber'] = this.increaseDatas.length > 0 ? this.increaseDatas[0].childNumber : null
      obj['childType'] = this.increaseDatas.length > 0 ? this.increaseDatas[0].childType : null
      obj['registerDate'] = this.increaseDatas.length > 0 ? moment(this.increaseDatas[0].registerDate) : null
      this.$emit('educateLook', obj)
    }
  }
}
</script>
<style scoped lang="less">
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
