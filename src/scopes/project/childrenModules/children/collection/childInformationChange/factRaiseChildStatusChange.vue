<template>
  <div class="searchdata">
    <!--事实无人抚养儿童身份状态变更  -->
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'80px',footer:'80px'}">

      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
          <ta-form-item label="儿童姓名"
                        fieldDecoratorId="name"
                        class="spilwid2"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入儿童姓名" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        class="spilwid2"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入身份证号"></ta-input>
          </ta-form-item>
          <ta-form-item>
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="handleSubmit('search')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>

          </ta-form-item>
        </ta-form>
      </div>
      <div>
        <div style="height: 50px;">
          <div style="float: left;">
            <ta-button @click="backs"
                       icon='rollback'>返回</ta-button>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered
                  :customRow="(text,record,index)=>({on:{dblclick:()=>{see(text,record,index)}}})">
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>

          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  @click="see(text,obj,index)">查看</span>

            <span class="com_textedit"
                  @click="addAdoption(text,obj,index)">减员</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="mixPageRef" />
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
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '11%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '13%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '11%',
    align: 'center',
    collectionType: 'SEX'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '12.5%'
  //   // scopedSlots: { customRender: 'idCard' }
  // },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '10%'
  },
  // {
  //   title: '儿童类别',
  //   dataIndex: 'childTypeLabel',
  //   align: 'center',
  //   width: '12%',
  //   collectionType: 'CHILDTYPE'
  // },
  {
    title: '登记日期',
    dataIndex: 'reportTime',
    align: 'center',
    width: '10%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'factRaiseChildInfoChange',
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixActivatedIsNeed: true,
        mixGetDataListURL: '/changeStatusUnattendedApi/reductionAddList'
      },
      mixPageRef: 'mixPageRef'
    }
  },
  methods: {
    backs () { this.$router.go(-1) },
    add () {
      this.$router.push({
        name: 'actualUnaccChildStatuChangeFor'

      })
    },
    //   查看
    see (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          id: obj.addUnattendedId,
          childtypedisabled: 1,
          isdisabled: 1
        }
      })
    },
    addAdoption (text, obj, index) {
      const str = {
        obj: obj,
        index: index,
        goType: 'factRaiseChildStatusChange-apply'
      }
      const paramsData = JSON.stringify(str)
      this.post('/unattendedStateChangeApi/checkStateChangeApply', { addUnattendedId: obj.addUnattendedId }).then((res) => {
        if (res.data.data == '1') {
          this.$message.error('该儿童已提出减员申请，还未审批，请等待审批完成后再提身份状态变更申请', 5)
        } else if (res.data.data == '2') {
          this.$message.error('该儿童已申请减员，上级已驳回，请到驳回列表进行操作！', 5)
        } else {
          this.$router.push({
            name: 'actualUnaccChildStatuChangeFor',
            query: {
              paramsData
            }
          })
        }
      })
    },
    //   编辑
    edit (text, obj, index) { },
    //   撤回
    returnBack (text, obj, index) { },
    //   查看

    dels (text, obj, index) { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.batchfrom {
  position: relative;
  width: 100%;
  height: 100%;
}
.boms {
  width: 100%;
  height: 58px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-right: 20px;
}
.spilwid {
  width: 300px;
}
.spilwid2 {
  width: 350px;
}
</style>
