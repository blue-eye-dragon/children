<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contentin">
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   class="formWidth"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="救治病种类型"
                          class="spilwid2"
                          fieldDecoratorId="rescueDiseaseType"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-select placeholder="请选择救治病种类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in diseasetypeList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="姓名"
                          class="spilwid2"
                          fieldDecoratorId="name"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>

            <ta-form-item label="救治病种名称"
                          class="spilwid2"
                          fieldDecoratorId="rescueDiseaseName"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入救治病种名称" />
            </ta-form-item>

            <ta-form-item label="救助申请日期"
                          class="spilwid2"
                          fieldDecoratorId="applyDate"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-range-picker @change="onSelectTime" />
            </ta-form-item>

            <ta-form-item label="所属机构"
                          class="spilwid2"
                          fieldDecoratorId="orgName"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入所属机构" />
            </ta-form-item>

            <areaQuery class="spilwid2"
                       :labelCol="{span:8}"
                       :wrapperCol="{span:16}"
                       v-if="ishide"
                       :msg="'区域'"
                       :fileldName="fileldName"
                       :ishide.sync="ishide"
                       :types="types"></areaQuery>

            <ta-form-item label="儿童身份类型"
                          class="spilwid2"
                          fieldDecoratorId="childIdentityType"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-select placeholder="请选择儿童身份类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in childidentitytypeList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

          </ta-form>
          <div class="searchbtn">
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="handleSubmit('search')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <ta-button class="btnleft"
                         style="    width: 109px;"
                         @click="advancedquery">
                高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button>
            </div>

          </div>
        </div>

        <div style="height: 50px;">
          <ta-radio-group :value="nowkey"
                          buttonStyle="solid"
                          style="float: left;"
                          @change="typechange">
            <ta-radio-button value="2">待审批</ta-radio-button>
            <ta-radio-button value="3">通过</ta-radio-button>
            <ta-radio-button value="4">驳回</ta-radio-button>
            <ta-radio-button value=" ">全部</ta-radio-button>
          </ta-radio-group>
          <!-- <ta-button type="primary" @click="gobatch" :disabled="isdisabled">批量审批</ta-button> -->
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
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
            <span :class="obj.nodesState=='2' ? 'com_audit' : 'com_textsee'"
                  @click="addAdoption(text,obj,index)"> {{obj.nodesState=='2' ? '审批' : '查看'}}</span>
          </div>
          <div slot="status"
               slot-scope="val, obj, index">
            <span :class="statusClass(val)">{{CollectionLabel('MEDICAL_RESCUE_NODE_STATUS',val)}}</span>
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
    title: '区域',
    width: '10%',
    dataIndex: 'areaName'
  },
  {
    title: '儿童姓名',
    width: '10%',
    scopedSlots: { customRender: 'name' },
    dataIndex: 'name'
  },
  {
    title: '儿童身份类型',
    width: '13%',
    dataIndex: 'childIdentityType',
    collectionType: 'CHILDIDENTITYTYPE'
  },
  // {
  //   title: '救治病种类型',
  //   width: '13%',
  //   dataIndex: 'rescueDiseaseType',
  //   collectionType: 'DISEASETYPE'
  // },
  {
    title: '救治病种名称',
    width: '13%',
    dataIndex: 'rescueDiseaseName'

  },
  {
    title: '所属机构',
    width: '13%',
    dataIndex: 'orgName'
  },
  // {
  //   title: '所属民政部门',
  //   dataIndex: 'civilOrgName'
  // },
  {
    title: '申请日期',
    width: '11%',
    align: 'center',
    dataIndex: 'applyDate'
  },
  {
    title: '审核日期',
    width: '11%',
    dataIndex: 'auditDate',
    align: 'center',
    scopedSlots: { customRender: 'auditDate' }
  },
  {
    title: '审核状态',
    width: '9%',
    align: 'center',
    dataIndex: 'nodesState',
    scopedSlots: { customRender: 'status' }
    // collectionType: 'MEDICAL_RESCUE_NODE_STATUS'
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
    areaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      nowkey: ' ',
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/medicalRescueApplyAudit/list' // 数据列表接口，API地址
      },
      isdisabled: true,
      chosedata: [],
      visible: false,
      sexList: [],
      childType: [],
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      fileldName: 'address_Linkage',
      types: '1',
      ishide: true,
      isExpand: false,
      issearch: false
      // diseasetypeList: []
    }
  },
  mounted () {
    this.getsexList()
    this.getChildType()
    this.getchildmedicaltypeList()
    this.getchildidentitytypeList()
    this.getdiseasetypeList()
  },
  filters: {
    datafilter (val) {
      return val != null ? val.substring(0, 10) : ''
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    deletes (val) {
      this.list.splice(val, 1)
    },
    // 状态颜色处理
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.CH:// 撤回
          classValue = 'com_tobesubmitted'
          break
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.DSP:// 待审批
          classValue = 'com_tobeaudited'
          break
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.TG:// 通过
          classValue = 'com_adopt'
          break
        case this.Enum.MEDICAL_RESCUE_NODE_STATUS.BH:// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 40 + 'px'
        } else {
          node.style.height = '70px'
        }
        node.style.transition = 'all 1s'
      })
    },
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      this.chosedata = val2
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      for (var i = 0; i < this.chosedata.length; i++) {
        if (this.chosedata.nodesState == '2') {

        } else {

        }
      }
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
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
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData['nodesState'] = this.nowkey
      if (formData.nodesState == ' ') {
        formData.nodesState = null
      }

      if (formData.address_Linkage) {
        let area = formData.address_Linkage
        delete formData.address_Linkage
        let length = area.length
        let lengthId = length - 1
        formData.areaCode = area[lengthId]
      }
      this.changetime(formData)
      return formData
    },
    onSelectTime (date, dateString) {
    },
    addAdoption (text, obj, index) {
      let approveVisible = false // 审批true、查看fasle
      let goType = ''
      if (obj.nodesState == '2') { // 待审批
        approveVisible = true
        goType = 'salvageApproval-edit'
      } else {
        goType = 'salvageApproval-see'
      }
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'salvageApprovalBatches',
        query: {
          obj: str,
          index: index,
          approveVisible: approveVisible,
          goType: goType
        }
      })
    },
    gobatch () {
      this.visible = true
      // this.$router.push({
      //   name: 'batch'
      // })
    },
    // 儿童类型
    async getChildType () {
      let data = await this.getDictionaries('CHILDTYPE')
      this.childType = data
    },
    // 状态类型
    async getchildmedicaltypeList () {
      let data = await this.getDictionaries('MEDICAL_RESCUE_NODE_STATUS')
      this.getchildmedicalList = data
    },
    // 儿童性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 救治病种类型
    async getdiseasetypeList () {
      let data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },
    // 儿童身份类型
    async getchildidentitytypeList () {
      // 儿童类别字典（福利院用户用福利院的，民政局用全的）
      let childTypeDict = 'CHILDCATEGORYF' // 福利院的字典
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用户
        childTypeDict = 'CHILDCATEGORYA' // 全的字典
      }
      let data = await this.getDictionaries(childTypeDict)
      this.childidentitytypeList = data
    },
    childInfo (val, obj, index) {
      if (obj.childEnterId) {
        let param = {
          id: obj.childEnterId
        }
        this.$router.push({
          name: 'orphansHandicapped',
          query: {
            url: '/childInfoApi/getOrphansDisabledChildrenById',
            params: JSON.stringify(param),
            operateFlag: 'look_now'
          }
        })
      } else {
        // let str = JSON.stringify(obj)
        this.$router.push({
          name: 'detailDatas',
          query: {
            obj: obj,
            index: index,
            goType: 'applicationRecord-details'
          }
        })
      }
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

.searchcont {
  width: 100%;
  position: relative;
  height: 54px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
}
.searchbtn {
  width: 319px;
  position: absolute;
  right: 0;
  top: 6px;
}
.formWidth {
  width: 860px;
}
</style>
