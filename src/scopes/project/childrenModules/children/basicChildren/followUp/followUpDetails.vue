<template>
  <div class="conts tadrawer">
    <div class="contin">
      <div class="foruout">
        <Title id="fam_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ChildInformation :name="name"
                            :childEnterId='childEnterId'></ChildInformation>
        </ta-form>
        <ta-tabs :activeKey="nowkey"
                 @change="callback">
          <ta-tab-pane tab="就业信息"
                       key="1"
                       :forceRender="true">
            <FollowUpJiuye :childBaseId="childBaseId"
                           :childEnterId="childEnterId"
                           :iscanshow="iscanshow"></FollowUpJiuye>
          </ta-tab-pane>
          <ta-tab-pane tab="住房信息"
                       key="2"
                       :forceRender="true">
            <FollowUpZhufang :childBaseId="childBaseId"
                             :childEnterId="childEnterId"
                             :iscanshow="iscanshow"></FollowUpZhufang>
          </ta-tab-pane>
          <ta-tab-pane tab="回访记录"
                       key="3"
                       :forceRender="true">
            <FollowUpHuifang :childBaseId="childBaseId"
                             :childEnterId="childEnterId"
                             :iscanshow="iscanshow"></FollowUpHuifang>
          </ta-tab-pane>
        </ta-tabs>
      </div>
    </div>
    <div class="bom">
      <ta-button class="btnleft"
                 @click="back">返回</ta-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { setTimeout } from 'timers'
// import listMinxin from '@component/common/js/mixins/listMixin'
import FollowUpJiuye from './component/followUpJiuye'
import FollowUpZhufang from './component/followUpZhufang'
import FollowUpHuifang from './component/followUpHuifang'
import ChildInformation from '../components/childInformation'
import Title from '@component/common/components/Title'

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
    dataIndex: 'unit'
  },
  {
    title: '单位地址',
    dataIndex: 'addr'
  },

  {
    title: '开始时间',
    dataIndex: 'st'
  },

  {
    title: '结束时间',
    dataIndex: 'en'
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
  // mixins: [listMinxin],
  components: {
    FollowUpJiuye,
    FollowUpZhufang,
    FollowUpHuifang,
    ChildInformation,
    Title
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      showone: true,
      visible: false,
      idedit: false,
      de: false,
      ed: false,
      ne: false,
      list: [],
      obj: {},
      nowkey: '1',
      childBaseId: '',
      childEnterId: '',
      adoptionlist: [],
      iscanshow: false,
      name: ''
    }
  },
  activated () {
    this.loadData()
    const data = JSON.parse(this.$route.params.obj)
    this.obj = data
    this.name = this.obj.name
    this.iscanshow = this.$route.params.type == 1
    this.childBaseId = this.obj.childBaseId
    this.childEnterId = this.obj.childEnterId
    console.log(this.obj)
    this.adoptedFrom.setFieldsValue({
      idCard: this.obj.idCard,
      childNumber: this.obj.childNumber,
      childType: this.obj.childType,
      registerDate: moment(this.obj.registerDate)
    })
  },
  mounted () {
    this.getchildtype()

    // 接受数据
    const params = this.$route.params
    this.list = [{ name: 'zhans', val: 1 }, { name: 'zhans2', val: 2 }]
  },
  methods: {
    loadData () {
      this.nowkey = '1'
    },
    // 导航菜单tab切换
    callback (key) {
      this.nowkey = key
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },
    back () {
      // 返回到followUp页
      this.$router.push({
        name: 'followUp'
      })
    },
    onSelectTime (date, dateString) {
      // 时间选择
      console.log(date, dateString)
    },
    iii (ac) {
      // alert(ac)
      // this.$refs['aaa'].test()
      // 切换到了
      console.log(ac)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
    // userPageParams () {
    //   let formData = this.form.getFieldsValue()
    //   return {
    //     apap0003: formData.apap0003
    //   }
    // }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.foruout {
  width: 100%;
  padding-top: 1px;
}
.inbut {
  width: 77px;
  background-color: #1890ff;
  left: 92%;
  color: #ffffffe8;
  font-size: 16.5px;
  margin-bottom: 12px;
}
</style>
