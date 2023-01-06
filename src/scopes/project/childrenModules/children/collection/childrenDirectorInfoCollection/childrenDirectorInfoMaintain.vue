<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   class="searchfroms"
                   :autoFormCreate="(form)=>{this.form = form}">
            <!-- form -->
            <AreaQuery class="spilwid"
                       :ishide="true"
                       types='2'
                       msg="区域"
                       :labelCol="{span:9}"
                       :wrapperCol="{span:15}"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></AreaQuery>
            <ta-form-item label="姓名"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          class="spilwid"
                          fieldDecoratorId="name">
              <ta-input placeholder="请输入姓名"
                        style="width : 100%" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          :labelCol="{ span: 8 }"
                          :wrapperCol="{span:16}"
                          class="spilwid"
                          fieldDecoratorId="idCard">
              <ta-input placeholder="请输入身份证号"
                        style="width : 100%" />
            </ta-form-item>
            <ta-form-item label="是否认领"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{span:14}"
                          style="width:220px"
                          fieldDecoratorId="isConfirm"
                          :fieldDecoratorOptions="{initialValue: ''}">
              <ta-select>
                <ta-select-option value="1">已认领</ta-select-option>
                <ta-select-option value="2">未认领</ta-select-option>
                <ta-select-option value="">全部</ta-select-option>
              </ta-select>
            </ta-form-item>
            <!-- <ta-form-item label="详细地址"
                          fieldDecoratorId="addressSupplement"
                          class="spilwid3"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-select showSearch
                         optionFilterProp="children"
                         :value="valueT"
                         :disabled="disabled"
                         :placeholder="disabled?'请先选择区域':'请选择详细地址'"
                         :defaultActiveFirstOption="false"
                         :showArrow="false"
                         :filterOption="false"
                         @search="handleSearch"
                         @change="handleChange">
                <ta-select-option :value="item.taorgId"
                                  v-for="(item,index) in addressSupplementList"
                                  :key="index">{{item.orgName}}</ta-select-option>
              </ta-select>
            </ta-form-item> -->

            <ta-form-item label="详细地址"
                          fieldDecoratorId="addressSupplement"
                          class="spilwid3"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input :placeholder="'请选择详细地址'">

              </ta-input>
            </ta-form-item>
          </ta-form>
          <div class="searchbtn searchButton">
            <ta-button type="primary"
                       class="search"
                       icon="search"
                       @click="search('search')">查询</ta-button>
            <ta-button class="btnleft reset"
                       icon="reload"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft"
                       @click="advancedquery">高级查询
              <ta-icon :type="issearch?'up':'down'" />
            </ta-button>
          </div>
        </div>

        <ta-tabs @change="callback"
                 :activeKey="nowkey">
          <ta-tab-pane tab="儿童督导员"
                       key="1"
                       :forceRender="true">
            <ta-spin tip="加载中..."
                     size="small"
                     :spinning="spinning">
              <ta-table bordered
                        class="tables table-min-width"
                        :columns="tableColumns"
                        :dataSource="tableData"
                        :locale="{emptyText: '请根据检索条件查询详细列表信息'}">
                <span slot="num"
                      slot-scope="val, obj, index">
                  <span>{{ size * (page - 1) + index + 1 }}</span>
                </span>
                <div slot="action"
                     slot-scope="val, obj, index"
                     class="btnlist">
                  <span @click="lookDirector(obj)"
                        class="com_textsee">查看</span>
                </div>
              </ta-table>
            </ta-spin>
          </ta-tab-pane>
          <ta-tab-pane tab="儿童主任"
                       key="2"
                       :forceRender="true">
            <ta-spin tip="加载中..."
                     size="small"
                     :spinning="spinning">
              <ta-table bordered
                        id="tmd"
                        class="tables table-min-width"
                        :columns="tableColumns"
                        :dataSource="tableData"
                        :locale="{emptyText: '请根据检索条件查询详细列表信息'}">
                <span slot="num"
                      slot-scope="val, obj, index">
                  <span>{{ size * (page - 1) + index + 1 }}</span>
                </span>
                <div slot="action"
                     slot-scope="val, obj, index"
                     class="btnlist">
                  <span @click="lookDirector(obj)"
                        class="com_textsee">查看</span>
                </div>
              </ta-table>
            </ta-spin>

          </ta-tab-pane>
          <ta-button @click="returns"
                     slot="tabBarExtraContent"
                     icon="rollback"
                     v-if="returnName">返回</ta-button>
          <ta-button icon='upload'
                     slot="tabBarExtraContent"
                     class="exportbtn btnleft"
                     v-if="isshow"
                     @click="showE">导出</ta-button>
        </ta-tabs>
        <ta-modal :centered="false"
                  style="top: 25%;"
                  :visible="showM"
                  @ok="Excel"
                  @cancel="handleCancel">
          <div>
            <h3>确认导出查询条件下的全部有效数据吗？</h3>
          </div>
        </ta-modal>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
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
    title: '姓名',
    width: '10%',
    overflowTooltip: true,
    dataIndex: 'name'

  },
  {
    title: '手机号',
    overflowTooltip: true,
    width: '13%',
    dataIndex: 'cellPhone'
  },
  {
    title: '职责范围',
    width: '30%',
    overflowTooltip: true,
    dataIndex: 'dutyBoundary'
  },
  {
    title: '类型',
    width: '10%',
    overflowTooltip: true,
    dataIndex: 'registType',
    collectionType: 'REGISTRATIONTYPE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: 150,
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {
    AreaQuery

  },
  data () {
    return {
      valueT: undefined,
      spinning: null,
      issearch: false,
      page: 1,
      size: 10,
      tableData: [],
      // addressSupplementList: [],
      tableColumns,
      registType: '', // tab切换的数据
      addressmodel: [],
      nowkey: '',
      areaLevel: '', // 当前登录人的区划级别
      ishide: true,
      type2: false,
      mixListOptions: {
        mixGetDataListURL: '/childdirectorandsupervisor/list', // 数据列表接口，API地址
        mixActivatedIsNeed: false
      },
      mixPageRef: 'gridPager',
      // url: '/childdirectorandsupervisor/list', // 从统计页面跳转带过来的url
      areaId: '', // 从统计页面跳转带过来的areaId
      returnName: null, // 返回按钮要返回的页面
      showM: false,
      isshow: true
    }
  },
  created () {
    // this.url = this.$route.query.url
    //   ? this.$route.query.url
    //   : '/childdirectorandsupervisor/list'
  },
  mounted () {
    this.addressmodel = []
    this.registType = '2'
    this.setHeight('one', 'oneout', !this.issearch)
    this.type2 = window.parent.indexTool.getUserInfo().orgType == 98
    this.nowkey = '2'
    this.isshow = true
    // 区县(2)登录时,默认为督导员，乡镇(3)默认为主任
    this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    if (this.areaId == '1000000000000000000') {
      this.tableData = []
      this.tableText = '请根据检索条件查询详细列表信息'
    } else {
      this.tableText = '暂无数据'
      this.addressmodel = [this.areaId]
    }
    this.$nextTick(() => {
      this.search('search')
    })
  },
  activated () {
    if (this.$route.query.returnName) { // 统计跳转
      this.returnName = this.$route.query.returnName
      this.isshow = false
      this.form.setFieldsValue({ isConfirm: this.$route.query.isConfirm })
      this.addressmodel = this.$route.query.areaArray.split('/').slice(window.parent.indexTool.getUserInfo().areaLevel == 0 ? 1 : window.parent.indexTool.getUserInfo().areaLevel) || []
      this.setaddress()
      if (this.$route.query.registType) {
        this.registType = this.$route.query.registType
        this.nowkey = this.registType
      }
      if (this.$route.query.areaCode) {
        this.areaId = this.$route.query.areaCode
      }
      this.$nextTick(() => {
        this.search('search')
      })
    }
    if (this.$route.query.isFromSearch) {
      if (this.$route.query.formDataSearch.address_Linkage) {
        this.addressmodel = this.$route.query.formDataSearch.address_Linkage
        this.setaddress()
      }
      this.nowkey = this.$route.query.formDataSearch.nowkey
      this.$nextTick(() => {
        this.form.setFieldsValue(this.$route.query.formDataSearch)
      })
    }
  },
  methods: {
    // async handleSearch (value) {
    //   const data = await this.post('/childdirectorandsupervisor/list', { addressSupplement: value })
    //   this.addressSupplementList = data.data.pageBean
    // },

    // // 机构名称change事件
    // handleChange (val) {
    //   this.valueT = val
    // },
    showE () {
      this.showM = true
    },
    Excel () {
      const formData = this.userPageParams()
      const url = '/childDirectorAndSupervisor/directorAndSupervisorExport'
      this.exportFile(url, formData)
      this.showM = false
    },
    handleCancel (e) {
      this.showM = false
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      // 对下拉框中的属性值的value值转成小写之后进行筛选
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    resetFrom (e) {
      this.form.resetFields()
      this.tableData = []
      if (window.parent.indexTool.getUserInfo().areaLevel != 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      }
      if (e != 'back') {
        this.search('search')
      }
    },
    search (e) {
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch)
      this.spinning = true
      this.handleSubmit(e)
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    adsvalchange (value, areaLevel) {
      let areaLevel1
      if (areaLevel) {
        areaLevel1 = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        areaLevel1 = ''
      }
      // if (areaLevel1 == '3' || areaLevel1 == '4') {
      //   this.disabled = false
      // }
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },

    // // 获取详细地址
    // getAddressSupplementList () {
    //   this.$nextTick(() => {
    //     this.form.setFieldsValue({ welfareOrgId: null })
    //     const addressAttr = this.form.getFieldsValue().address_Linkage
    //     if (addressAttr && addressAttr.length > 0) {
    //       this.post('welfareOrgManagement/queryWelfareOrgsByareaId', { areaId: addressAttr[addressAttr.length - 1] }).then((res) => {
    //         if (res.serviceSuccess) {
    //           this.welfareOrgNameList = res.data.data || []
    //         }
    //       })
    //       this.disabled = false
    //     } else {
    //       this.welfareOrgNameList = []
    //       this.disabled = true
    //     }
    //   })
    // },
    // 读取列表 分页形式
    // handleSubmit (e) {
    //   if (e) { // 只有点查询才重置参数
    //     this.page = 1
    //     this.size = 10
    //   }

    //   // 分页条提供方法，可查询第一页，一般用于查询按钮中调用 data为返回数据 这个方法已经配置page==1 返回数据自动绑定到table 有其他操作在里面添加。
    //   this.$nextTick(() => {
    //     if (window.parent.indexTool.getUserInfo().areaLevel == 0 && (!this.form.getFieldsValue().address_Linkage || this.form.getFieldsValue().address_Linkage.length == 0)) {
    //       if (e) this.$message.error('无区域信息，请选择查询的区域')
    //       return false
    //     }
    //     this.$refs.gridPager.loadData(data => { })
    //   })
    // },
    userPageParams () {
      // 这里返回的对象是分页要一同提交的参数
      const formData = this.form.getFieldsValue()
      if (this.nowkey == '1') {
        this.registType = 2
      } else {
        this.registType = 1
      }
      if (this.$route.query.isBenJi) {
        formData.isBenJi = this.$route.query.isBenJi
      }
      formData.whereFlag = 1
      formData.registType = this.registType
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      return formData
    },
    // tab切换
    callback (e) {
      this.nowkey = e

      this.registType = e
      this.search('search')
    },
    // 新增(关联儿童主任信息)
    add () {
      this.$router.push({
        name: 'relatedChildDirector',
        query: {
          flag: 'add'
        }
      })
    },
    // 关联儿童信息
    getChildrenInfo (e) {
      // alert(this.nowkey)
      if (this.nowkey == 1) {
        this.$router.push({
          name: 'toAssociation',
          query: { dutyBoundaryTown: e.town }
        })
      } else {
        this.$router.push({
          name: 'relatedChildrenList',
          query: { pid: e.id, town: e.town, childList: JSON.stringify(e) }
        })
      }
    },
    // 编辑儿童督导员信息
    updateSupervisor (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'edit' }
      })
    },
    // 查看儿童督导员信息
    lookSupervisor (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'look' }
      })
    },
    // 删除儿童主任（督导员）信息
    deleteDatas (e) {
      const _self = this
      _self
        .post('/childdirectorandsupervisor/updateDelStateById', {
          id: e.id
        })
        .then(res => {
          if (!res.errors) {
            _self.$message.success('删除成功!')
            _self.search('search')
          }
        })
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = 'auto'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 关联儿童主任信息
    getChildrenDirectorInfo (e) {
      this.$router.push({
        name: 'relatedChildDirectorList',
        query: { directorList: JSON.stringify(e) }
      })
    },
    // 编辑儿童主任信息
    updateDirector (e) {
      this.$router.push({
        name: 'relatedChildDirector',
        query: { directorList: JSON.stringify(e), flag: 'edit' }
      })
    },
    // 查看儿童主任信息
    lookDirector (e) {
      const formData = this.form.getFieldsValue()
      formData.pathUrl = this.$route.path.substr(1)
      formData.nowkey = this.nowkey
      this.$router.push({
        name: 'relatedChildDirector',
        query: {
          isFromSearch: true,
          formDataSearch: JSON.stringify(formData),
          directorList: JSON.stringify(e),
          flag: 'look'
        }
      })
    },
    cancel () { },
    // 返回 到原页面
    returns () {
      this.resetFrom('back')
      this.$router.push({
        name: this.returnName
      })
    }
  }
}
</script>
<style scoped>
.searchfroms {
  width: calc(100% - 330px);
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 0;
}
.spilwid3 {
  width: 350px;
}
</style>
