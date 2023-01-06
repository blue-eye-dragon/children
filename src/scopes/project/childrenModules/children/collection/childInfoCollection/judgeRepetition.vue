<template>
  <div style="height: 100%">
    <ta-border-layout :layout="{ header: '0px' }">
      <div>
        <div style="padding:10px 0;">
          <!-- <ta-button type="primary"
                     @click="add">继续新增</ta-button> -->
          <ta-button @click="returns">返回</ta-button>
        </div>

        <ta-table bordered
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="showlist">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b, c">
            <a><span @click="childDetail(b)">{{ a }}</span></a>
          </template>
          <template slot="illnessType"
                    slot-scope="a, b, c">
            <span>{{ b | typeDataProcess("ILLNESSTYPE", b.illnessType, b.illnessTypeOther, "illnessType") }}</span>
          </template>
          <div slot="operate"
               slot-scope="a, b, c"
               class="btnlist">
            <span @click="reapply(b)"
                  class="com_textreject"
                  v-if="b.workflowStatus == '5'">重新申请</span>
            <span @click="edit(b)"
                  class="com_correlation"
                  v-if="!b.workflowStatus">导入</span>
            <span @click="look(b)"
                  class="com_textsee"
                  v-if="['0', '1', '2', '3', '4', '5'].indexOf(b.workflowStatus) != -1">查看</span>
          </div>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="showlist"
                       :total="total"
                       @showSizeChange="showSizeChange"
                       @change="pagechange"
                       url=""
                       ref="roleGridPager" />
      </div>
    </ta-border-layout>
    <div></div>
  </div>
</template>

<script>
import moment from 'moment'
import localList from '@component/common/js/mixins/localList'
import filtermixin from '@component/common/js/mixins/filtermixin'
let that
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '身份证号',
    dataIndex: 'idCard'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '户籍性质',
    dataIndex: 'censusRegister',
    collectionType: 'CENSUSREGISTER'
  },
  // {
  //   title: '患病类型',
  //   dataIndex: 'illnessType',
  //   scopedSlots: { customRender: 'illnessType' }
  // },
  {
    title: '户籍所在地',
    dataIndex: 'censusRegisterDetailAll'
  },
  {
    title: '状态',
    dataIndex: 'workflowStatusLabel'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'operate',
    width: 180,
    scopedSlots: { customRender: 'operate' },
    fixed: 'right'
  }
]
export default {
  mixins: [localList],
  data () {
    return {
      tableColumns,
      tableDatas: [],
      tablename: 'tableDatas',
      istranslate: true, // 是否分页

      illnessTypeList: [], // 患病类型字典数据
      childType: ''
    }
  },

  watch: {},
  created () {
    that = this
    this.post('codetable/getCode', { codeType: 'ILLNESSTYPE' }).then(res => {
      if (res.serviceSuccess) {
        this.illnessTypeList = res.data.codeList
      }
    })
  },
  activated () {
    const _self = this
    _self.$nextTick(() => {
      _self.tableDatas = JSON.parse(_self.$route.query.repetitionList)
    })
  },
  mounted () { },
  methods: {
    // 新增
    add () {
      if (this.childType == this.Enum.CHILDCATEGORYA.SSWRFYET) {
        // 事实无人
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1,
            childrenFrom: this.$route.query.collectionDatas
          }
        })
        return false
      }
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { operateFlag: 'add', collectionDatas: _self.$route.query.collectionDatas, routeName: 'childInfoCollection' }
      })
    },
    // 返回
    returns () {
      this.$router.go(-1)
    },
    // 查看
    look (e) {
      if (this.childType == this.Enum.CHILDCATEGORYA.SSWRFYET) {
        // 事实无人
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1,
            id: e.id,
            isdisabled: 1
          }
        })
        return false
      }
      const _self = this
      if (e.workflowStatus == '0' || e.workflowStatus == '2') {
        // 待提交(已撤回)（不在流程中，同点人名查看）
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify({ id: e.childEnterId }),
            operateFlag: 'look_now'
          }
        })
      }
      if (['1', '3', '4', '5'].indexOf(e.workflowStatus) != -1) {
        // 待审核（1）、审批中（3）、通过（4）、驳回（5）
        _self.$router.push({
          name: 'lookProcess',
          query: {
            url: '/addChildApi/detailWorkflow',
            params: JSON.stringify({ childEnterId: e.childEnterId, workflowId: e.workflowId }),
            judegObj: JSON.stringify(e),
            operateFlag: 'look'
          }
        })
      }
    },
    // 重新申请
    reapply (e) {
      if (this.childType == this.Enum.CHILDCATEGORYA.SSWRFYET) {
        // 事实无人
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1
          }
        })
        return false
      }
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: e.childEnterId }),
          operateFlag: 'edit_bh',
          collectionDatas: _self.$route.query.collectionDatas,
          routeName: 'childInfoCollection'
        }
      })
    },
    // 导入
    edit (e) {
      if (this.childType == this.Enum.CHILDCATEGORYA.SSWRFYET) {
        // 事实无人
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1,
            exportid: e.id
          }
        })
        return false
      }
      const _self = this
      if (!e.workflowStatus) {
        // 在档
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/orphansDisabledChildrenApi/getChildBaseInformationById',
            params: JSON.stringify({ id: e.id }),
            collectionDatas: _self.$route.query.collectionDatas,
            operateFlag: 'edit_zd',
            routeName: 'childInfoCollection'
          }
        })
      }
    },
    // 查看儿童详情
    childDetail (e) {
      console.log('chose')
      console.log(e)
      if (this.childType == this.Enum.CHILDCATEGORYA.SSWRFYET) {
        // 事实无人
        this.$router.push({
          name: 'noonesupportfact',
          query: {
            status: 1,
            id: e.id,
            isdisabled: true
          }
        })
        return false
      }
      const _self = this
      if (!e.workflowStatus) {
        // 在档的查看
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/orphansDisabledChildrenApi/getChildBaseInformationById',
            params: JSON.stringify({ id: e.id }),
            collectionDatas: _self.$route.query.collectionDatas,
            operateFlag: 'look_zd',
            routeName: 'childInfoCollection'
          }
        })
      }

      if (['0', '1', '2', '3', '4', '5'].indexOf(e.workflowStatus) != -1) {
        // 审批中、待审核、待提交、通过、驳回的查看（实时的）
        _self.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify({ id: e.childEnterId }),
            operateFlag: 'look_now'
          }
        })
      }
    }
  },
  filters: {
    // 获取患病类型(其他类型也可)字典数据，并进行赋值（code为字典编码，val为数据值，name为字段名）
    typeDataProcess (obj, code, val, otherval, name, compare = (a, b) => a === b) {
      let list = []
      let attr = []
      let showData = ''
      const _self = that
      list = _self.illnessTypeList
      if (val && val.length > 0) {
        attr = val.split(',')
        attr.forEach((val, index) => {
          list.forEach((item, index) => {
            if (compare(item.value, val)) {
              showData = showData + item.label + ','
            }
          })
        })
      }
      if (showData != '') {
        showData = showData.substring(0, showData.length - 1)
      }
      if (name == 'illnessType') {
        if (val == this.Enum.ILLNESSTYPE.QT) {
          showData = showData.replace(',', ':')
          return showData + (otherval != null ? otherval : '')
        } else {
          return showData
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
