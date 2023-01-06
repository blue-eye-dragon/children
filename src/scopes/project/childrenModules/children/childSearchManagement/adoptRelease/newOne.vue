<template>
  <!-- 儿童寻亲信息发布 -->
  <div class="modelcont">
    <!-- <ta-border-layout :header-cfg="{showBorder:false}" :layout="{header:'0px'}">
    <div>-->
    <ta-form layout="inline"
             :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
      <ta-form-item label="儿童姓名"
                    class="spilwid2"
                    fieldDecoratorId="name"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-input placeholder="请输入姓名" />
      </ta-form-item>

      <ta-form-item label="身份证号"
                    class="spilwid2"
                    fieldDecoratorId="idCard"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-input placeholder="请输入身份证号" />
      </ta-form-item>

      <ta-form-item label="出生日期"
                    class="spilwid2"
                    fieldDecoratorId="birthday"
                    :labelCol="{span:7}"
                    :wrapperCol="{span:17}">
        <ta-range-picker @change="onSelectTime" />
      </ta-form-item>

      <template>
        <ta-button type="primary"
                   @click="handleSubmit('search')">查询</ta-button>
        <ta-button class="btnleft"
                   @click="resetFrom">重置</ta-button>
        <!-- <ta-button class="primary" @click="backs">返回</ta-button> -->
      </template>
    </ta-form>

    <ta-table class="tables table-min-width"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="tableData"
              :rowSelection="rowSelection"
              bordered>
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <span slot="birthday"
            slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>

      <div slot="action"
           slot-scope="val,obj,index"
           class="btnlist">
        <span class="com_continue"
              v-if="obj.addState==0"
              @click="doAction(val,obj)">确认添加</span>
        <span v-else
              style="color: rgba(0,0,0,.45);">确认添加</span>
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
                   ref="gridPager" />
  </div>
  <!-- </ta-border-layout>

  </div>-->
</template>
<script>
// import SalvageApprovalBatches from './components/salvageApprovalBatches'
// import areaQuery from '@component/common/components/areaQuery'
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
    title: '儿童姓名',
    width: '16%',
    dataIndex: 'name'
  },
  {
    title: '出生日期',
    width: '15%',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    width: '17%',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '身份证号',
    width: '16%',
    dataIndex: 'idCard'
  },
  {
    title: '性别',
    width: '14%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '年龄',
    width: '13%',
    dataIndex: 'age'
  },
  {
    title: '状态',
    width: '13%',
    dataIndex: 'addState',
    collectionType: 'ADDSTATE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  components: {},
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childSeekingToBeAdopted/passChildInfo' // 数据列表接口，API地址
      },
      isdisabled: true,
      chosedata: [],
      visible: false,
      sexList: [],
      childSituationList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      fileldName: 'address_Linkage',
      types: '1',
      ishide: false
    }
  },
  mounted () {
    this.getsexList()
    this.handleSubmit()
  },
  created () {
    that = this
  },

  activated () { },
  methods: {
    async doAction (val, obj) {
      // 操作
      const param = { childBaseId: obj.childBaseId }
      const result = await this.post(
        '/childSeekingToBeAdopted/saveToBeAdoptedChild',
        param
      )
      if (!result.errors) {
        // alert('变色')
        this.handleSubmit()
        // this.$parent.handleSubmit()
        this.$emit('handleSubmit')
      }
    },

    deletes (val) {
      console.log(val)
      this.list.splice(val, 1)
    },
    onSelectChange (val, val2) { },

    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    addAdoption (text, obj, index) { },
    gobatch () {
      this.visible = true
    },
    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    }
  }
}
</script>

<style scoped lang="less">
.modelcont {
  margin-bottom: 40px;
}
// .searchdata {
//   height: 100%;
// }
// .btnleft {
//   margin-left: 16px;
// }
// .visitbtn {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 15px;
// }
// .batchfrom {
//   position: relative;
//   width: 100%;
//   height: 100%;
// }
// .boms {
//   width: 100%;
//   height: 58px;
//   background: rgba(255, 255, 255, 1);
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   border-top: 1px solid #eff1f4;
// }
// .preservation {
//   margin-right: 20px;
// }
// .spilwid {
//   width: 300px;
// }
// .spilwid2 {
//   width: 350px;
// }
</style>
