<template>
  <div class="searchdata"
       id="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0',footer:'90px'}">
      <div class="searchcont"
           ref="oneout">
        <ta-form layout="inline"
                 ref="one"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}"
                 class="searchfroms">
          <ta-form-item class="spilwid"
                        label="儿童姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input placeholder="请输入儿童姓名" />
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="儿童类别"
                        fieldDecoratorId="childType"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-select placeholder="请选择儿童类别">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="(item,index) in childTypeList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="儿童性别"
                        fieldDecoratorId="sex"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-select placeholder="请选择儿童性别">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="(item,index) in sexList"
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="身份证号"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="出生日期"
                        fieldDecoratorId="birthday"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-range-picker />
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="起领年月"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-range-picker :placeholder="['开始年月', '结束年月']"
                             format="YYYY-MM"
                             :allowClear="false"
                             :value="value"
                             :mode="mode2"
                             @panelChange="handlePanelChange2" />
          </ta-form-item>
          <ta-form-item class="spilwid"
                        label="末领年月"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}">
            <ta-range-picker :placeholder="['开始年月', '结束年月']"
                             :allowClear="false"
                             format="YYYY-MM"
                             :value="value3"
                             :mode="mode3"
                             @panelChange="handlePanelChange3" />
          </ta-form-item>
          <!-- <ta-form-item>
            <div class="searchButton">
              <ta-button type="primary" class="search" icon="search" @click="handleSubmit">查询</ta-button>
              <ta-button class="btnleft reset" icon="reload" @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft exportbtn" icon="upload" @click="exports">导出</ta-button>
            </div>
          </ta-form-item> -->
        </ta-form>
        <div class="searchbtn searchButton">
          <ta-button type="primary"
                     class="search"
                     icon="search"
                     @click="handleSubmit">查询</ta-button>
          <ta-button class="btnleft reset"
                     icon="reload"
                     @click="resetFrom">重置</ta-button>
          <ta-button class="btnleft"
                     @click="advancedquery">高级查询
            <ta-icon :type="issearch?'up':'down'" />
          </ta-button>
        </div>
      </div>
      <div class="tableout">
        <div style="text-align:right;margin-bottom: 10px">
          <ta-button class="btnleft exportbtn"
                     icon="upload"
                     @click="exports">导出</ta-button>
        </div>
        <ta-table bordered
                  :columns="tableColumns"
                  :scroll="{ x: 1000 }"
                  :dataSource="tableData"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="status"
                slot-scope="a, b, c">
            <span :class="a=='享受中'?'com_inaudit':'com_tobesubmitted'">{{ a=='享受中'?'享受中':'未享受'}}</span>
          </span>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
      <ta-modal :centered="false"
                style="top: 25%;"
                :visible="showOn"
                @ok="Excel"
                @cancel="handleCancel">
        <div>
          <h3>确认导出查询条件下的全部有效数据吗？</h3>
        </div>
      </ta-modal>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
function marge (text, record, index) {
  let obj = {
    children: text,
    attrs: {}
  }
  obj.attrs.rowSpan = record.mergeNum
  //   if (index === 2) {
  //     obj.attrs.colSpan = 3
  //     obj.children = '合計'
  //   }
  return obj
}
export default {
  mixins: [listMixin],
  data () {
    const tableColumns = [
      {
        title: '序号',
        dataIndex: 'num',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'num' }
      },
      {
        title: '儿童姓名',
        width: '15%',
        dataIndex: 'name'
      },
      // {
      //   title: '身份证号',
      //   width: '15%',
      //   dataIndex: 'idCard'
      // },
      {
        title: '性别',
        width: '14%',
        align: 'center',
        dataIndex: 'sex',
        collectionType: 'SEX'
      },
      {
        title: '儿童类别',
        width: '15%',
        dataIndex: 'childType',
        collectionType: 'CHILDCATEGORYA'
      },
      {
        title: '出生日期',
        width: '14%',
        align: 'center',
        dataIndex: 'birthday'
      },
      {
        title: '起领年月',
        width: '13%',
        align: 'center',
        dataIndex: 'startTime'
      },
      {
        title: '末领年月',
        width: '13%',
        align: 'center',
        dataIndex: 'endTime'
      },
      {
        title: '状态',
        width: '12%',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      }
    ]
    return {
      issearch: false,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/welfareAssistanceApi/pageChildStartTime', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      childTypeList: [],
      sexList: [],
      mixPageRef: 'gridPager',
      mode2: ['month', 'month'],
      value: [],
      mode3: ['month', 'month'],
      value3: [],
      showOn: false
    }
  },
  activated () {
    this.loadData()
    this.getchildcategoryaList()
    this.getsexList()
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 'px'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    loadData () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    resetFrom () {
      this.value = []
      this.value3 = []
      this.searchForm.resetFields()
    },
    exports () {
      this.showOn = true
    },
    Excel () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      // formData['type'] = _self.nowkey
      _self.changetime(formData)
      if (this.value.length > 0) {
        formData.startTimeStart = this.value[0].format('YYYY-MM')
        formData.startTimeEnd = this.value[1].format('YYYY-MM')
      }
      if (this.value3.length > 0) {
        formData.endTimeStart = this.value3[0].format('YYYY-MM')
        formData.endTimeEnd = this.value3[1].format('YYYY-MM')
      }
      this.exportFile('/querystatistics/exportChildStartTime', formData)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    // 查询参数
    userPageParams () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      formData['type'] = _self.nowkey
      _self.changetime(formData)
      if (this.value.length > 0) {
        formData.startTimeStart = this.value[0].format('YYYY-MM')
        formData.startTimeEnd = this.value[1].format('YYYY-MM')
      }
      if (this.value3.length > 0) {
        formData.endTimeStart = this.value3[0].format('YYYY-MM')
        formData.endTimeEnd = this.value3[1].format('YYYY-MM')
      }
      return formData
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      console.log(value)
      console.log(mode)
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
      console.log(this.mode2)
    },
    handlePanelChange3 (value, mode) {
      console.log(value)
      console.log(mode)
      this.value3 = value
      this.mode3 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    // 性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童类别
    async getchildcategoryaList () {
      let data = await this.getDictionaries('CHILDCATEGORYA')
      this.childTypeList = data
    }
  }
}
</script>

<style scoped lang="less">
.searchcont {
  width: 100%;
  position: relative;
  height: 100px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
  margin-bottom: 10px;
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 6px;
}
.searchdata {
  height: 100%;
}
.searchfroms {
  width: calc(100% - 330px);
}
.tableout {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}
/deep/.borderLayout .header {
  border-bottom: 13px solid #e4e4e4;
}
</style>
