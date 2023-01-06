<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <!-- <areaQuery v-if="ishide"
                     class="spilwid"
                     :msg="'地区'"
                     :fileldName="fileldName"
                     :ishide="ishide" 
                     :types="types"></areaQuery> -->
            <ta-form-item label="儿童姓名"
                          class="spilwid"
                          fieldDecoratorId="childName"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="性别"
                          class="spilwid"
                          fieldDecoratorId="sex"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择性别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in sexList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <!--<ta-form-item label="医疗救助申请次数"-->
            <!--class="spilwid"-->
            <!--fieldDecoratorId="count"-->
            <!--:labelCol="{span:10}"-->
            <!--:wrapperCol="{span:14}">-->
            <!--<ta-input-number style="width:100%"-->
            <!--:precision="0"-->
            <!--:max="999999"-->
            <!--placeholder="请输入医疗救助申请次数" />-->
            <!--</ta-form-item>-->

            <!--<ta-form-item label="出生日期"-->
            <!--class="spilwid"-->
            <!--fieldDecoratorId="birthDate"-->
            <!--:labelCol="{span:6}"-->
            <!--:wrapperCol="{span:18}">-->
            <!--<ta-range-picker @change="onSelectTime" />-->
            <!--</ta-form-item>-->

            <ta-form-item label="所属机构"
                          class="spilwid"
                          fieldDecoratorId="orgName"
                          :labelCol="{ span: 9 }"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入所属机构" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>

          </ta-form>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
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
          <span slot="action"
                slot-scope="text,obj,index"
                class="btnlist">
            <span class="com_textsee"
                  @click="addAdoption(text,obj,index)">查看</span>
          </span>
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
    dataIndex: 'areaName',
    width: '16%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'childName',
    scopedSlots: { customRender: 'childName' },
    width: '15%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    width: '12%'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '12%'
  },
  // {
  //   title: '儿童身份类型',
  //   dataIndex: 'childIdentityType',
  //   collectionType: 'CHILDIDENTITYTYPE',
  //   width: '13%'
  // },
  {
    title: '所属机构',
    dataIndex: 'orgName',
    width: '16%'
  },
  {
    title: '医疗费用(元)',
    dataIndex: 'rehabilitation',
    width: '14%'
  },

  {
    title: '医疗救助申请次数',
    dataIndex: 'count',
    width: '18%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    align: 'center',
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
        mixGetDataListURL: '/medicalRescueArchives/list' // 数据列表接口，API地址
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
      ishide: false,
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
  methods: {
    deletes (val) {
      this.list.splice(val, 1)
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
      this.handleSubmit()
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
      if (obj.nodesState == '2') {
        // 待审批
        approveVisible = true
      }
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'medicalAidFilesChildDetail',
        query: {
          obj: str,
          index: index,
          goType: 'medicalAidFilesChildDetail-detail'
        }
      })
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
    },
    gobatch () {
      this.visible = true
      // this.$router.push({
      //   name: 'batch'
      // })
    },
    // 儿童身份类型
    async getchildidentitytypeList () {
      let data = await this.getDictionaries('CHILDIDENTITYTYPE')
      this.childidentitytypeList = data
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
    }
    // // 儿童身份类型
    // async getchildidentitytypeList () {
    //   let data = await this.getDictionaries('CHILDIDENTITYTYPE')
    //   this.childidentitytypeList = data
    // }
    // // 救治病种类型
    // async getdiseasetypeList () {
    //   let data = await this.getDictionaries('DISEASETYPE')
    //   this.diseasetypeList = data
    // }
  }
}
</script>
