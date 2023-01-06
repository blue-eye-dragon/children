<template>
  <div class="searchdata tadrawer">
    <!-- 结算明细 -->
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <areaQuery class="spilwid2"
                     v-if="ishide"
                     :msg="'地区'"
                     :fileldName="fileldName"
                     :ishide.sync="ishide"
                     :types="types"></areaQuery>
          <ta-form-item label="姓名"
                        class="spilwid2"
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入姓名" />
          </ta-form-item>
          <ta-form-item label="所属单位"
                        class="spilwid2"
                        fieldDecoratorId="orgName"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入所属单位" />
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft"
                       @click="back">返回</ta-button>
          </ta-form-item>
        </ta-form>
        <template>
          <ta-button type="primary"
                     class="marginBtm"
                     @click="add()">新增</ta-button>
          <!-- <ta-button type="danger" class="marginBtm" @click="showModal()">批量删除</ta-button> -->
          <ta-popconfirm title="确定删除吗?"
                         @confirm="del()"
                         okText="确定"
                         cancelText="取消">
            <ta-button type="danger">批量删除</ta-button>
          </ta-popconfirm>
        </template>
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
          <a slot="childName"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.childName}}</a>
          <span slot="auditDate"
                slot-scope="text,obj,index">{{text | auditDate}}</span>
          <div slot="auditDate"
               slot-scope="val,obj,index">
            <span>
              <span>{{val | datafilter}}</span>
            </span>
          </div>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee"
                  @click="addAdoption(text,obj,index)">详情</span>
          </div>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"
                       
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
    <ta-drawer title="新增"
               width="1200"
               placement="right"
               @close="onCloseTwo"
               :getContainer="setContainer"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <settlementDetails v-if="visible"
                         @onSelectChanget="onSelectChanget"
                         @handleSubmit="handleSubmit()"
                         :ishide="false"
                         ref="child"></settlementDetails>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onCloseTwo">取消</ta-button>
        <!-- <ta-button @click="submitData()" type="primary">确定</ta-button> -->
        <ta-button type="primary"
                   class="marginBtm"
                   @click="submit('2')">提交</ta-button>
        <ta-button type="primary"
                   class="marginBtm"
                   @click="submit('1')">保存</ta-button>
      </div>
    </ta-drawer>
    <ta-modal title="删除"
              v-model="visibleDel"
              @ok="del()"
              okText="确认"
              cancelText="取消">
      <p>确定删除吗？</p>
    </ta-modal>
  </div>
</template>
<script>
import settlementDetails from './components/settlementData'
import areaQuery from '@component/common/components/areaQuery'
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
    title: '地区',
    width: '13%',
    dataIndex: 'areaName'
  },
  {
    title: '儿童编号',
    width: '13%',
    dataIndex: 'childNumber'
  },
  {
    title: '姓名',
    width: '13%',
    scopedSlots: { customRender: 'childName' },
    dataIndex: 'childName'
  },
  {
    title: '所属单位',
    width: '13%',
    dataIndex: 'orgName'
  },
  {
    title: '治疗次数',
    width: '13%',
    dataIndex: 'treatmentNumber'
  },
  {
    title: '医疗康复费用总金额（元）',
    width: '13%',
    dataIndex: 'rehabilitation'
  },
  {
    title: '申请明天计划资助总金额（元）',
    width: '13%',
    dataIndex: 'fund'
  },
  {
    title: '结账状态',
    width: '13%',
    dataIndex: 'status'
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
  name: 'revoke',
  components: {
    areaQuery,
    settlementDetails
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL:
          '/medicalRescueSettleAccounts/settleAccountsRecordDetail', // 数据列表接口，API地址
        mixAdd: '/medicalRescueSettleAccounts/submit' // 结算提交
      },
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      visible: false,
      types: '1',
      ishide: true,
      mixPageRef: 'gridPager',
      fileldName: 'address_Linkage',
      settlementIds: '',
      year: '',
      status: '',
      visibleDel: false
      // diseasetypeList: []
    }
  },
  mounted () { },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.settlementIds = ''
    let data = JSON.parse(this.$route.query.obj)
    console.log(data)
    // this.status=data.status
    this.year = data.year
  },
  methods: {
    showModal () {
      this.visibleDel = true
    },
    userPageParams () {
      let data = JSON.parse(this.$route.query.obj)
      let params = {}
      params.orgId = data.orgId
      params.year = data.year
      //   params.year = moment(data.year)
      return params
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    addAdoption (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'detailsOne',
        query: {
          obj: str,
          index: index,
          goType: 'details'
        }
      })
    },
    add () {
      this.types = '1'
      this.visible = true
      this.$nextTick(() => {
        console.log(this.$refs['child'])
        // this.$refs['child'].handleSubmit()
      })
    },
    async del () {
      let params = {}
      if (this.settlementIds.length > 0) {
        params.deleteId = this.settlementIds
        params.year = this.year
        params.status = '1'
        await this.post(this.mixListOptions.mixAdd, params).then(res => {
          console.log(res)
          if (res.serviceSuccess) {
            this.$message.success('删除成功')
            // this.onCloseTwo()
            // this.back()
            this.handleSubmit()
          }
        })
      } else {
        // this.visible = false
        this.$message.error('请选择')
      }
    },
    // submit提交
    async submit (e) {
      let text = ''
      if (this.settlementIds.length > 0) {
        let params = {}
        if (e == '1') {
          //   保存
          params.status = '1'
          text = '结算信息保存成功'
        } else if (e == '2') {
          //   提交
          params.status = '2'
          text = '结算信息上报成功'
        }
        params.year = this.year
        params.settlementId = this.settlementIds
        await this.post(this.mixListOptions.mixAdd, params).then(res => {
          console.log(res)
          if (res.serviceSuccess) {
            this.$message.success(text)
            this.onCloseTwo()
            this.back()
            this.handleSubmit()
          }
        })
      } else {
        // this.visible = false
        this.$message.error('请选择')
      }
    },
    // save 保存
    save () {
      this.types = '2'
      if (this.settlementIds.length > 0) {
        // this.visible = true
      } else {
        // this.visible = false
        this.$message.error('请选择')
      }
    },

    changetime (data) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          if (data[k].file) {
            let arr = []
            data[k].fileList.map(item => {
              arr.push(item.response.data.data.fileid)
            })
            data[`${k}Id`] = arr
          } else {
            data[k] = data[k].format('YYYY')
          }
        }
      }
    },
    onSelectChange (val, val2) {
      console.log(val)
      console.log(val2)
      let str = ''
      this.rowSelection.selectedRowKeys = val
      val2.map((item, index) => {
        str += item.settlementIds + ','
      })
      if (str.length > 0) {
        str = str.substr(0, str.length - 1)
      }
      this.settlementIds = str
      console.log(this.settlementIds)
    },
    onSelectChanget (val, val2) {
      console.log(val)
      console.log(val2)
      this.$refs['child'].rowSelection.selectedRowKeys = val
      let str = ''
      val2.map((item, index) => {
        str += item.settlementIds + ','
      })
      if (str.length > 0) {
        str = str.substr(0, str.length - 1)
      }
      this.settlementIds = str
      console.log(this.settlementIds)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    back () {
      this.$router.go(-1)
    },
    // 抽屉关闭
    onCloseTwo () {
      this.visible = false
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

.marginBtm {
  margin-bottom: 15px;
}
</style>
