<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer:'80px' }">
      <div class="searchcont">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery msg="地址"
                     class="spilwid"
                     :ishide="true"
                     :labelCol="{span:9}"
                     :wrapperCol="{span:15}"></AreaQuery>
          <ta-form-item label="需求类型"
                        fieldDecoratorId="demandType"
                        :labelCol="{span:9}"
                        :wrapperCol="{span:15}"
                        class="spilwid">
            <ta-select placeholder="请选择需求类型"
                       style="width: 100%;">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="(item ,index) in demandTypeList "
                                :key="index"
                                :value="item.value">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="需求总量"
                        fieldDecoratorId="demandTotal"
                        :labelCol="{span:8}"
                        :wrapperCol="{span:16}"
                        class="spilwid1">
            <ta-input-group compact 
                            style="margin-top:1px">
              <ta-input-number style=" width: 90px; text-align: center"
                               placeholder=""
                               :min=0
                               v-model="minVal"
                               @blur="compareData('minVal')" />
              <ta-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                        placeholder="~"
                        disabled />
              <ta-input-number style="width: 90px; text-align: center; border-left: 0"
                               placeholder=""
                               :min=0
                               v-model="maxVal"
                               @blur="compareData('maxVal')" />
            </ta-input-group>
          </ta-form-item>
          <ta-form-item label>
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
      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns"
                :showOverflowTooltip="true"
                :dataSource="mixDataList">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="status"
              slot-scope="a, b, c">
          <span :class="a=='0'?'com_tobesubmitted':(a=='1'?'com_tobeaudited':'com_adopt')">{{a=='0'?'未提交':(a=='1'?'未匹配':'已匹配')}}</span>
        </span>
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span @click="lookDetail(obj)"
                class="com_textsee">查看</span>

          <span class="com_correlation"
                @click="matching(obj)">匹配</span>
          <ta-popconfirm title="你确定删除本条数据吗?"
                         @confirm="deleteDatas(obj)"
                         okText="确定"
                         cancelText="取消"
                         v-if="obj.mark=='true'">
            <span style="margin-left: 5%;"
                  class="com_textdel">删除</span>
          </ta-popconfirm>

        </div>
      </ta-table>

      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />

      </div>
    </ta-border-layout>
    <!-- 资源弹窗 -->
    <ta-modal title="资源匹配"
              v-model="visible"
              width="90%"
              :mask="true"
              :footer="false">
      <ta-form layout="inline"
               :autoFormCreate="(searchForm1)=>{this.searchForm1 = searchForm1}"
               style="margin-bottom: 2%;">
        <AddressComponent :fileldName="'area'"
                          :msg="'通讯地址'"
                          :isRequire="false"
                          class="spilwid"
                          :addressmodel="addressmodel1"
                          @setaddress="setaddress1"></AddressComponent>
        <ta-form-item label="资源名称"
                      fieldDecoratorId="resourceName"
                      :labelCol="{span:6}"
                      :wrapperCol="{span:18}"
                      class="spilwid">
          <ta-input />
        </ta-form-item>
        <ta-form-item label="资源总量"
                      fieldDecoratorId="resourceTotal"
                      :labelCol="{span:6}"
                      :wrapperCol="{span:18}"
                      class="spilwid">
          <ta-input-group compact>
            <ta-input-number style=" width: 97px; text-align: center"
                             placeholder=""
                             :min=0
                             :max=9999999
                             :step="1"
                             :formatter="value => `${value}`.replace(/\D/g,'')"
                             :parser="value => value.replace(/\D/g,'')"
                             v-model="minVal1"
                             @blur="compareData1('minVal1')" />
            <ta-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                      placeholder="~"
                      disabled />
            <ta-input-number style="width: 98px; text-align: center; border-left: 0"
                             placeholder=""
                             :min=0
                             :max=9999999
                             :step="1"
                             :formatter="value => `${value}`.replace(/\D/g,'')"
                             :parser="value => value.replace(/\D/g,'')"
                             v-model="maxVal1"
                             @blur="compareData1('maxVal1')" />
          </ta-input-group>
        </ta-form-item>
        <ta-form-item>
          <div class="searchButton">
            <ta-button type="primary"
                       class="search "
                       icon="search"
                       @click="getlist">查询</ta-button>
            <ta-button class="btnleft reset"
                       icon="reload"
                       @click="resetFrom1">重置</ta-button>
          </div>
        </ta-form-item>
      </ta-form>

      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns1"
                :showOverflowTooltip="true"
                :dataSource="mixDataList1">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="status"
              slot-scope="a, b, c">
          <span>{{a=='0'?'未提交':(a=='1'?'未匹配':'已匹配')}}</span>
        </span>
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <ta-popconfirm title="匹配操作完成后匹配信息将不可修改，是否确认匹配?"
                         @confirm="confirmMatching(obj)"
                         okText="确定"
                         cancelText="取消">
            <span>确认匹配</span>
          </ta-popconfirm>
        </div>
      </ta-table>

    </ta-modal>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import AddressComponent from '@/scopes/project/common/components/addressComponent'
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
    title: '地址',
    width: '16%',
    dataIndex: 'area'
  },
  {
    title: '机构名称',
    width: '14%',
    dataIndex: 'departmentName'
  },
  {
    title: '经办人',
    width: '12%',
    dataIndex: 'agent'
  },
  {
    title: '经办人联系电话',
    width: '18%',
    dataIndex: 'agentPhone'
  },
  {
    title: '需求类型',
    width: '13%',
    dataIndex: 'demandType',
    collectionType: 'RESOURCE_TYPE'
  },
  {
    title: '需求总量',
    width: '13%',
    dataIndex: 'demandTotal'
  },
  {
    title: '事项状态',
    width: '12%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '发布日期',
    align: 'center',
    width: '13%',
    dataIndex: 'releaseTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '通讯地址',
    width: '17%',
    dataIndex: 'area'
  },
  {
    title: '机构名称',
    width: '17%',
    dataIndex: 'orgName'
  },
  {
    title: '资源名称',
    width: '17%',
    dataIndex: 'resourceName'
  },
  {
    title: '资源类型',
    width: '17%',
    dataIndex: 'resourceType',
    collectionType: 'RESOURCE_TYPE'
  },
  {
    title: '资源总量',
    width: '10%',
    dataIndex: 'resourceTotal'
  },
  {
    title: '事项状态',
    width: '10%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '发布日期',
    width: '13%',
    dataIndex: 'releaseTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: {
    AddressComponent,
    AreaQuery
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableColumns1,
      page: 1,
      size: 10,
      areaId: '',
      areaCode: '',
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/socialCareService/releaseDemandList', // 数据列表接口，API地址
        mixGetDataListIsPage: true // 数据列表接口，是否需要分页？
      },
      ishide: true,
      mixPageRef: 'gridPager',

      minVal: null,
      maxVal: null,
      minVal1: null,
      maxVal1: null,

      // 设置弹窗属性
      mixListOptions1: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/socialCareService/releaseResourceList', // 数据列表接口，API地址
        mixGetDataListIsPage: false // 数据列表接口，是否需要分页？
      },
      visible: false, // 资源匹配弹窗
      mixDataList1: [],
      resourceId: '', // 资源信息表id
      demandId: '', // 需求信息表id
      resourceTypeData: null, // 传到弹窗的资源类型查询参数

      addressmodel: [],
      addressmodel1: [],

      demandTypeList: [] // 需求类型字典数据

    }
  },
  mounted () {
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 字典数据获取
    getMenuDatas () {
      this.getMenu('RESOURCE_TYPE', 'demandTypeList') // 获取资源类型字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 比较数据大小
    compareData (e) {
      let minVal = this.minVal
      let maxVal = this.maxVal
      if (typeof minVal == 'number' && typeof maxVal == 'number' && Number(minVal) > Number(maxVal)) {
        this.$message.warn('初始值不能大于结束值！')
        this[e] = null
      }
    },
    // 比较数据大小-弹窗
    compareData1 (e) {
      let minVal = this.minVal1
      let maxVal = this.maxVal1
      if (typeof minVal == 'number' && typeof maxVal == 'number' && Number(minVal) > Number(maxVal)) {
        this.$message.warn('初始值不能大于结束值！')
        this[e] = null
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      delete formData.demandTotal
      if (this.minVal) {
        formData['demandTotalStart'] = this.minVal
      }
      if (this.maxVal) {
        formData['demandTotalEnd'] = this.maxVal
      }
      // if (formData.area && formData.area.length > 0) {
      //   formData['areaCode'] = formData.area.slice(-1).toString()
      //   delete formData.area
      // }

      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
      }
      if (this.areaId) {
        formData.areaCode = this.areaId
        formData.areaId = this.areaId
      }
      this.changetime(formData)
      return formData
    },
    // 设置地址
    setaddress () {
      this.searchForm.setFieldsValue({
        area: this.addressmodel
      })
    },
    // 设置地址-弹窗
    setaddress1 () {
      this.searchForm1.setFieldsValue({
        area: this.addressmodel1
      })
    },
    // 详情
    lookDetail (e) {
      this.$router.push({
        name: 'publishNeeds',
        query: { flag: 'query', id: e.id }
      })
    },
    // 删除
    deleteDatas (e) {
      this.post('/socialCareService/demandDelete', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('数据删除成功！')
          this.handleSubmit()
        }
      })
    },
    // 匹配
    matching (e) {
      this.resourceTypeData = e.demandType
      this.visible = true

      this.demandId = e.id
      this.$nextTick(() => {
        this.getlist()
      })
    },
    // 确认匹配
    confirmMatching (e) {
      this.resourceId = e.id
      this.visible = false
      this.post('/socialCareService/match', {
        resourceId: this.resourceId,
        demandId: this.demandId
      }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('匹配成功！')
          this.handleSubmit()
        }
      })
    },
    // 读取列表 无分页形式 弹窗
    async getlist () {
      let formData = this.searchForm1.getFieldsValue()
      delete formData.resourceTotal
      formData['resourceType'] = this.resourceTypeData
      if (this.minVal1) {
        formData['resourceTotalStart'] = this.minVal1
      }
      if (this.maxVal1) {
        formData['resourceTotalEnd'] = this.maxVal1
      }
      if (formData.area && formData.area.length > 0) {
        formData['areaCode'] = formData.area.slice(-1).toString()
        delete formData.area
      }
      let res = await this.post(this.mixListOptions1.mixGetDataListURL, formData)
      if (res.serviceSuccess) {
        this.mixDataList1 = res.data.pageBean.list
      }
    },
    // 重置
    resetFrom () {
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.searchForm.resetFields()
      this.maxVal = null
      this.minVal = null
      this.handleSubmit('search')
    },
    // 重置-弹窗
    resetFrom1 () {
      this.searchForm1.resetFields()
      this.maxVal1 = null
      this.minVal1 = null
      this.$nextTick(() => {
        this.getlist()
      })
    }

  }

}
</script>
<style scoped lang="less">
</style>
