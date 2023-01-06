<template>
  <!-- 留守困境回访list   -->

  <div class="searchdata tadrawer">

    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">

      <div>

        <ta-form layout="inline"
                 :forceRender="true"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

          <ta-form-item label="姓名"
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入姓名" />

          </ta-form-item>

          <!-- <ta-form-item label="出生日期"
                        fieldDecoratorId="birthday"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-range-picker />

          </ta-form-item> -->

          <ta-form-item label="证件号码"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">

            <ta-input placeholder="请输入证件号码" />

          </ta-form-item>

          <!-- <ta-form-item label="儿童类型"
                        fieldDecoratorId="childType"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
 <ta-select allowClear

                     :placeholder=" '请选择儿童类型'">

            <ta-select-option v-for="item in childTypeList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>

          </ta-form-item> -->

          <ta-form-item>

            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>

            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>

          </ta-form-item>

        </ta-form>

        <div class="visitbtntop">

          <ta-radio-group v-model="nowkey"
                          buttonStyle="solid"
                          @change="typechange">

            <ta-radio-button value="6">困境儿童</ta-radio-button>

            <ta-radio-button value="4">留守儿童</ta-radio-button>

          </ta-radio-group>

        </div>

        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  bordered>

          <!-- :haveSn="true"

              :rowSelection="mixRowSelection"-->

          <span slot="num"
                slot-scope="a, b, c">

            <span>{{ size * (page - 1) + c + 1 }}</span>

          </span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="visit(val,obj,false,index)"
                  class="com_textsee">回访</span>
            <span @click="visit(val,obj,true)"
                  class="com_textsee">详情</span>

          </div>

        </ta-table>

        <ta-pagination  :defaultCurrent="page"
                       class="pagination"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />

      </div>

    </ta-border-layout>

  </div>
</template>
<script>
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [

  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },

  {
    title: '儿童编号',
    width: '18%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '儿童姓名',
    width: '14%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '12%',
    dataIndex: 'sex',
    collectionType: 'SEX',
    overflowTooltip: true
  },
  {
    title: '身份证号',
    width: '14%',
    dataIndex: 'idCard',
    overflowTooltip: true
  }, {
    title: '儿童类型',
    width: '14%',
    dataIndex: 'sourceOfData',
    collectionType: 'INFOCOLLECTCHILDTYPE',
    overflowTooltip: true
  }, {
    title: '户籍地址',
    width: '14%',
    dataIndex: 'censusRegisterDetailAll',
    overflowTooltip: true
  },
  {
    title: '上报日期',
    width: '14%',
    dataIndex: 'reportTime',
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '250px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      childTypeList: [{ value: '4', label: '留守儿童' }, { value: '6', label: '困境儿童' }],
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '620px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/DilemmaChildApi/list', // 数据列表接口，API地址
        // mixAddURL: '/employeeManagement/save', // 新增接口

        mixExportURL: '' // 导出接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',

      nowkey: '6'

    }
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.getsexList()
    this.userId = window.parent.indexTool.getUserInfo().userId
  },
  activated () {
    console.log(this.Base.getNowPageParam())
    if (this.Base.getNowPageParam()._modulePartId_ == '1') {
      this.nowkey = '4'
    } else {
      // this.nowkey = '1'
    }
  },
  methods: {
    async visit (val, obj, see) {
      let ids = ''
      if (this.nowkey == 6) {
        ids = obj.dilemmaChildId
      } else {
        ids = obj.leftOverChildId
      }
      console.log('ids-->', ids)
      this.$router.push({
        name: 'troubleStayingCallbackInfo',
        query: {
          id: ids, // 未定id
          disabled: see,
          name: obj.name
        }
      })
    },

    typechange (key) {
      this.nowkey = key.target.value
      this.userPageParams()
      this.handleSubmit('search')
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      // formData.type = this.nowkey
      formData.insertType = 1
      if (this.nowkey == '4') { // 留守
        this.mixListOptions.mixGetDataListURL = '/LeftOverChild/list'
      } else { // 困境
        this.mixListOptions.mixGetDataListURL = '/DilemmaChildApi/list'
      }
      this.changetime(formData)
      return formData
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },
    // 性别字典
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.disabled = false
    },

    handleTableChange () { },
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

.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
