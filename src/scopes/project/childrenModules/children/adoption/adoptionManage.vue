<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <AreaQuery :ishide.sync="ishide"
                           class="spilwid3"
                           msg="区域"
                           :types="'2'"
                           @setaddress="setaddress"
                           @adsvalchange="adsvalchange"
                           :addressmodel="addressmodel"
                           :fileldName="'address_Linkage'"></AreaQuery>
                <!-- <ta-form-item label="收养登记证字号"
                              class="spilwid1"
                              :labelCol="{span:11}"
                              fieldDecoratorId="registionNumber"
                              :wrapperCol="{span:13}">
                  <ta-input placeholder="请输入收养登记证字号"
                            class="numwid" />
                </ta-form-item> -->
                <ta-form-item label="办理机构"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="orgid"
                              :wrapperCol="{span:15}">
                  <!-- <ta-input placeholder="请选择组织机构" /> -->
                  <ta-select showSearch
                             allowClear
                             :disabled="disabled"
                             :placeholder="disabled?'请先选择区域':'请选择办理机构'">
                    <ta-select-option :value="item.orgId"
                                      v-for="(item,index) in OrgNameList"
                                      :key="index">{{item.orgName}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="登记日期"
                              class="spilwid2"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="registerDate">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="被收养人姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="childName"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入被收养人姓名" />
                </ta-form-item>
                <ta-form-item label="儿童身份证号"
                              class="spilwid1"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入儿童身份证号" />
                </ta-form-item>
                <ta-form-item label="性别"
                              style="width:200px"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="childSex">
                  <ta-select :placeholder="'请选择性别'">
                    <ta-select-option :value="item.value"
                                      v-for="(item, index) in sexList"
                                      :key="index">{{item.label}}
                    </ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="当前状态"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="curStatus">
                  <ta-select :placeholder="'请选择当前状态'">
                    <ta-select-option :value="'1'">收养中</ta-select-option>
                    <ta-select-option :value="'2'">已解除</ta-select-option>
                    <ta-select-option :value="'3'">已撤销</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="年龄段"
                              style="width:230px"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="age">
                  <ta-select :placeholder="'请选择年龄段'">
                    <ta-select-option :value="'1'">1岁内</ta-select-option>
                    <ta-select-option :value="'2'">1~3岁</ta-select-option>
                    <ta-select-option :value="'3'">3~5岁</ta-select-option>
                    <ta-select-option :value="'4'">5~8岁</ta-select-option>
                    <ta-select-option :value="'5'">8~13岁</ta-select-option>
                    <ta-select-option :value="'6'">13~18岁</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="收养类别"
                              class="spilwid"
                              fieldDecoratorId="adoptionCategory"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select placeholder="请选择收养类别"
                             @change="adoptionTypeChange">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button>
              </div>
            </div>
          </ta-form>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <span slot="curStatus"
                slot-scope="val, obj, index">
            <span v-if="obj.curStatus == 1">收养中</span>
            <span v-else-if="obj.curStatus == 2">已解除</span>
            <span v-else>已撤销</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="continueprocessing(obj,'0')"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :defaultCurrent="page"
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
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '被收养人姓名',
    width: '20%',
    align: 'center',
    dataIndex: 'childName'
  },
  {
    title: '性别',
    width: '10%',
    align: 'center',
    dataIndex: 'childSex',
    collectionType: 'SEX'
  },
  {
    title: '收养类别',
    width: '20%',
    align: 'center',
    dataIndex: 'adoptionCategory',
    collectionType: 'ADOPTIONCATEGORY'
  },
  {
    title: '当前状态',
    width: '10%',
    align: 'center',
    dataIndex: 'curStatus',
    scopedSlots: { customRender: 'curStatus' }
  },
  {
    title: '收养登记机构',
    width: '15%',
    align: 'center',
    dataIndex: 'hanlderOrgName'
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
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/queryChildRecordList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,
      adoptionlist: [],
      adoptionbiztypelist: [],
      isgo: true,
      ishide: true,
      adoptionid: '',
      sexList: [], // 性别字典数据
      registrationAdoptionId: '',
      adoptorName: '',
      childId: '',
      addressmodel: [],
      nowdata: {},
      reasondis: false,
      issearch: false,
      radiovalue: '',
      printlist: [],
      OrgNameList: [],
      visibleP: false,
      disabled: true
    }
  },
  activated () {
    this.OrgNameList = []
    this.addressmodel = []
    this.isgo = true
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getchildtype()
    this.getadoptionbiztype()
    this.getsex()
  },
  methods: {
    // 获取住址机构数据
    getOrgNameList () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ orgid: undefined })
        const addressAttr = this.searchForm.getFieldsValue().address_Linkage
        if (addressAttr && addressAttr.length > 0) {
          this.post('org/queryMzOrgByArea', { areaId: addressAttr[addressAttr.length - 1] }).then((res) => {
            if (res.serviceSuccess) {
              this.OrgNameList = res.data.orgList || []
            }
          })
          this.disabled = false
        } else {
          this.OrgNameList = []
          this.disabled = true
        }
      })
    },
    adsvalchange (val) {
      this.getOrgNameList()
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.handleSubmit('search')
    },
    adoptionTypeChange (v) {
    },
    userPageParams () {
      const params = this.searchForm.getFieldsValue()
      if (params.address_Linkage) {
        params.areaId = params.address_Linkage[params.address_Linkage.length - 1]
        params.areaCode = params.address_Linkage[params.address_Linkage.length - 1]
      } else {
        params.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      this.changetime(params)
      if (params.age) {
        switch (params.age) {
          case '1':// 0-1
            params.ageStart = '0'
            params.ageEnd = '1'
            break
          case '2':// 1-3
            params.ageStart = '1'
            params.ageEnd = '3'
            break
          case '3':// 3-5
            params.ageStart = '3'
            params.ageEnd = '5'
            break
          case '4':// 5-8
            params.ageStart = '5'
            params.ageEnd = '8'
            break
          case '5':// 8-13
            params.ageStart = '8'
            params.ageEnd = '13'
            break
          case '6':// 13-18
            params.ageStart = '13'
            params.ageEnd = '18'
            break
        }
      }
      return params
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },

    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 业务类别 ADOPTIONBIZTYPE
    async getadoptionbiztype () {
      const data = await this.getDictionaries('ADOPTIONBIZTYPE')
      this.adoptionbiztypelist = data
    },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('ADOPTIONCATEGORY')
      this.adoptionlist = data
    },
    // 获取性别
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    continueprocessing (val, e) {
      this.$router.push({
        name: 'fileDetails', // 收养登记
        query: {
          childNumber: val.childNumber
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
