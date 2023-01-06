<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery class="spilwid"
                           :ishide="false"
                           msg="区域"
                           :allowClear="false"
                           :addressmodel="addressmodel"
                           @setaddress="setaddress"></AreaQuery>
                <ta-form-item label="是否集中供养"
                              :labelCol="{ span: 10 }"
                              :wrapperCol="{span:14}"
                              style="width:300px"
                              fieldDecoratorId="isConcentratedFeed">
                  <ta-select placeholder="请选择是否集中供养">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="'0'">否</ta-select-option>
                    <ta-select-option :value="'1'">是</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit()">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <!-- <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button> -->
              </div>
            </div>
          </ta-form>
        </div>
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
          <ta-button @click="goback"
                     class="rightClass btnleft"
                     icon="rollback"
                     v-if="isShowReturn">返回</ta-button>
          <ta-button style=" margin-left: 10px;"
                     class="exportbtn"
                     icon="upload"
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%;"
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>
        <div style="margin-top: 16px;"></div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
        </ta-table>
        <div style="margin-top:20px">
          <p v-if="areaLevel == '0'">
            <span>列表展示的数据为:</span>
            1.乡镇、区县民政局和福利机构三个月未处理的超龄儿童。
          </p>
          <p v-if="areaLevel == '1'">
            <span>列表展示的数据为:</span>
            1.省级福利机构一个月未处理的超龄儿童;
            2.市级福利机构一个半月未处理的超龄儿童;
            3.乡镇和​区县福利机构两个月未处理的超龄儿童，请督办省级福利机构或市级福利机构或区县福利机构到【事实无人抚养儿童-超龄儿童-超龄管理】页面或乡镇到【超龄事实无人抚养儿童-超龄管理】页面进行处理。
          </p>
          <p v-if="areaLevel == '2'">
            <span>列表展示的数据为:</span>
            1.市级福利机构一个月未处理的超龄儿童;
            2.乡镇和区县福利机构一个半月未处理的超龄儿童，请督办市级福利机构或区县福利机构到【事实无人抚养儿童-超龄儿童-超龄管理】页面或乡镇到【超龄事实无人抚养儿童-超龄管理】页面进行处理。
          </p>
          <p v-if="areaLevel == '3'">
            注：列表展示内容为乡镇和区县福利机构内超龄一个月未处理的事实无人抚养儿童，请督办乡镇到【超龄事实无人抚养儿童-超龄管理】或区县福利机构到【事实无人抚养儿童-超龄儿童-超龄管理】页面进行处理。
          </p>
        </div>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :params="userPageParams"
                       @change="pagechange"
                       :dataSource.sync="mixDataList"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
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
    width: '20%',
    dataIndex: 'areaName'
  },
  {
    title: '儿童姓名',
    width: '20%',
    dataIndex: 'name'
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '15%',
    align: 'center',
    dataIndex: 'birthday'
  },
  {
    title: '超龄日期',
    width: '15%',
    align: 'center',
    dataIndex: 'overAgeDate'
  }
]

export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  name: 'revoke',
  data () {
    return {
      tableColumns,
      showOn: false,
      isShowReturn: false,
      orgId: window.parent.indexTool.getUserInfo().orgId,
      areaLevel: window.parent.indexTool.getUserInfo().areaLevel,
      idPath: '',
      isIn: '',
      addressmodel: [], // 区划查询条件赋值
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/overseeApi/overSeeUnattendedByCounty' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager' // 用于获取分页ref值
    }
  },
  mounted () {
    this.showOn = false
    this.isShowReturn = false
    this.initdatas()
    this.$nextTick(() => {
      this.handleSubmit()
    })
  },
  activated () {
    if (this.$route.query.areaId) {
      this.isShowReturn = true
      this.idPath = this.$route.query.areaIdPath
      this.isIn = this.$route.query.isIn
      const areaIdPathS = this.idPath.split('/')
      areaIdPathS.shift()
      this.addressmodel = areaIdPathS
      this.setaddress()
      this.$nextTick(() => {
        this.handleSubmit()
      })
    }
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    async getOrgList () {
      const res = await this.post('overseeApi/getOrgByParentId', { orgId: this.orgId })
      this.orgList = res.data.data
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      }
      this.idPath = null
      this.isIn = null
      this.setaddress()
      this.$nextTick(() => {
        this.handleSubmit()
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (this.idPath) {
        formData.idpath = this.idPath
      }
      if (this.isIn) {
        formData.isIn = this.isIn
      }
      this.changetime(formData)
      return formData
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    // 初始化数据
    initdatas () {
      this.showOn = false
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    // getMenu (code, name) {
    //   const _self = this
    //   _self.post('codetable/getCode', { codeType: code }).then(res => {
    //     if (res.serviceSuccess) {
    //       res.data.codeList.sort(function (a, b) {
    //         return parseInt(a.value) - parseInt(b.value)
    //       })
    //       _self[name] = res.data.codeList
    //     }
    //   })
    // },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    Excel () {
      const data = this.searchForm.getFieldsValue()
      if (data.address_Linkage) {
        data.areaId =
          data.address_Linkage[data.address_Linkage.length - 1]
        delete data.address_Linkage
      } else {
        data.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      data.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      data.idPath = window.parent.indexTool.getUserInfo().areaIdPath
      if (this.isIn) {
        data.isIn = this.isIn
      }
      const url = '/overseeBusiness/exportOverSeeUnattendedNum'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
