<template>
  <!-- 结算明细 -->
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
      </ta-form-item>
    </ta-form>
    <!-- <template>
          <ta-button type="primary" class="marginBtm" @click="submit()">提交</ta-button>
          <ta-button type="primary" class="marginBtm" @click="save()">保存</ta-button>
        </template> -->
    <ta-table class="tables"
              :columns="tableColumns"
              :showOverflowTooltip="true"
              :dataSource="tableData"
              :rowSelection="rowSelection"
              bordered>
      <span slot="num"
            slot-scope="a, b, c">
        <span>{{ size * (page - 1) + c + 1 }}</span>
      </span>
      <!-- <a
            slot="childName"
            slot-scope="val,obj,index"
            href="javascript:;"
            @click="childInfo(val,obj,index)"
          >{{obj.childName}}</a>
          <span slot="auditDate" slot-scope="text,obj,index">{{text | auditDate}}</span>
          <div slot="auditDate" slot-scope="val,obj,index">
            <span>
              <span>{{val | datafilter}}</span>
            </span>
          </div>
          <div
            slot="action"
            slot-scope="text,obj,index"
           class="btnlist"
          >
          <span
          class="com_textsee"
          @click="addAdoption(text,obj,index)">详情</span>
         </div> -->
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
    <ta-drawer title="请选择提交年度"
               width="500"
               placement="right"
               @close="onClose"
               :getContainer="setContainer"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="年度"
                      fieldDecoratorId="year"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择年度'}">
          <ta-year-picker style="width: 100%;"
                          placeholder="请选择年度" />
        </ta-form-item>

      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submitData()"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
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

  }
  // {
  //   title: '操作',
  //   overflowTooltip: false,
  //   dataIndex: 'action',
  //   width: 150,
  //   scopedSlots: { customRender: 'action' }
  // }
]

export default {
  name: 'revoke',
  components: {
    areaQuery
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
        mixGetDataListURL: '/medicalRescueSettleAccounts/list', // 数据列表接口，API地址
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
      settlementIds: ''
      // diseasetypeList: []
    }
  },
  mounted () {
    this.handleSubmit()
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.settlementIds = ''
  },
  methods: {
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
    // submit提交
    submit () {
      this.types = '1'
      if (this.settlementIds.length > 0) {
        this.visible = true
      } else {
        this.visible = false
        this.$message.error('请选择')
      }
    },
    // save 保存
    save () {
      this.types = '2'
      if (this.settlementIds.length > 0) {
        this.visible = true
      } else {
        this.visible = false
        this.$message.error('请选择')
      }
    },
    async submitData () {
      let formData = this.form.getFieldsValue()
      this.changetime(formData)
      let params = {}
      let text = ''
      params = { ...formData }
      params.settlementId = this.settlementIds
      if (this.types == '1') {
        // 提交
        params.status = '2'
        text = '结算信息上报成功'
      } else if (this.types == '2') {
        // 保存
        params.status = '1'
        text = '结算信息保存成功'
      }
      await this.post(this.mixListOptions.mixAdd, params).then(res => {
        console.log(res)
        if (res.serviceSuccess) {
          this.$message.success(text)
          this.onClose()
          this.handleSubmit()
        }
      })
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
      this.$emit('onSelectChanget', val, val2)
      // console.log(val)
      // console.log(val2)
      // let str = ''
      // this.rowSelection.selectedRowKeys = val
      // val2.map((item, index) => {
      //   str += item.settlementIds + ','
      // })
      // if (str.length > 0) {
      //   str = str.substr(0, str.length - 1)
      // }
      // this.settlementIds = str
      // console.log(this.settlementIds)
    },
    setContainer () {
      return this.set_Container('tadrawer')
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
