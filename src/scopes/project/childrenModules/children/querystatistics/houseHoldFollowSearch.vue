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
                <AreaQuery msg="区域"
                           class="spilwid"
                           :ishide="true"
                           :labelCol="{span:7}"
                           :wrapperCol="{span:17}"
                           @setaddress="setaddress"
                           :addressmodel="addressmodel"
                           :fileldName="'address_Linkage'"
                           types="2"></AreaQuery>
                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              fieldDecoratorId="name"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>

                <ta-form-item label="儿童身份证号"
                              style="width:340px"
                              :labelCol="{span:10}"
                              fieldDecoratorId="idCard"
                              :wrapperCol="{span:14}">
                  <ta-input placeholder="请输入儿童身份证号" />
                </ta-form-item>
                <ta-form-item label="是否为重点关注"
                              class="spilwid"
                              :labelCol="{span:14}"
                              :wrapperCol="{span:10}"
                              fieldDecoratorId="iseEmphasisAttention"
                              :fieldDecoratorOptions="{initialValue: ''}">
                  <ta-select>
                    <ta-select-option :value="''">全部</ta-select-option>
                    <ta-select-option :value="'1'">是</ta-select-option>
                    <ta-select-option :value="'0'">否</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <!-- <ta-form-item label="随访时间"
                              style="width:400px"
                              :labelCol="{span:6}"
                              fieldDecoratorId="followVisitTime"
                              :wrapperCol="{span:18}">
                  <ta-range-picker format="YYYY-MM-DD"
                                   allowClear
                                   :placeholder="['开始日期', '结束日期']" />
                </ta-form-item> -->
                <ta-col :span="24">
                  <ta-form-item label="儿童类型"
                                style="width:100%"
                                fieldDecoratorId="childTypeList"
                                :labelCol="{span:2}"
                                :initValue="['110','120','400']"
                                :wrapperCol="{span:15}">
                    <!-- <ta-select allowClear
                             placeholder="请选择儿童类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="'110'">监护不当儿童</ta-select-option>
                    <ta-select-option :value="'120'">事实无人抚养儿童</ta-select-option>
                    <ta-select-option :value="'400'">留守儿童</ta-select-option>
                  </ta-select> -->
                    <ta-checkbox-group>
                      <ta-checkbox :value="'110'">监护不当儿童</ta-checkbox>
                      <ta-checkbox :value="'120'">事实无人抚养儿童</ta-checkbox>
                      <ta-checkbox :value="'400'">留守儿童</ta-checkbox>
                    </ta-checkbox-group>
                  </ta-form-item>
                </ta-col>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="search('000')">查询</ta-button>
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

        <!-- <div style="margin-bottom: 16px;"></div> -->
        <div style="height: 50px;">
          <div style="float:right;">
            <!-- <ta-button @click="returns"
                       slot="tabBarExtraContent"
                       icon="rollback"
                       v-if="returnName">返回</ta-button> -->
            <!-- <ta-button style=" margin-left: 10px;"
                       class="exportbtn"
                       icon="upload"
                       @click="showModal">导出</ta-button> -->
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
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">
          <ta-table bordered
                    class="tables table-min-width"
                    :showOverflowTooltip="false"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    :customRow="fnCustomRow">
            <span slot="num"
                  slot-scope="val, obj, index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>
            <span slot="type"
                  slot-scope="val, obj, index">
              <span>{{val|dochildType}}</span>
            </span>
            <span slot="iseEmphasisAttention"
                  slot-scope="val, obj, index">
              <span v-if="val == '1'">是</span>
              <span v-else>否</span>
            </span>

            <div slot="action"
                 slot-scope="val,obj"
                 class="btnlist">
              <span @click="see(val,obj)"
                    class="com_textsee">随访记录</span>
            </div>
          </ta-table>
        </ta-spin>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
    title: '儿童类型',
    width: '18%',
    dataIndex: 'type',
    overflowTooltip: true,
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '儿童编号',
    width: '10%',
    dataIndex: 'childNumber',
    overflowTooltip: true
  },
  {
    title: '儿童姓名',
    width: '15%',
    dataIndex: 'name',
    overflowTooltip: true
  },
  {
    title: '性别',
    width: '10%',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '现住址',
    dataIndex: 'childCurrentAddress',
    align: 'center',
    width: '15%',
    overflowTooltip: true
  },
  {
    title: '最新随访日期',
    dataIndex: 'followVisitTime',
    align: 'center',
    width: '12%'
  },
  {
    title: '是否重点关注',
    dataIndex: 'iseEmphasisAttention',
    width: '12%',
    align: 'center',
    scopedSlots: { customRender: 'iseEmphasisAttention' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    width: '250px',
    dataIndex: 'action',
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
      spinning: null,
      idedit: true,
      addressmodel: [],
      paymentList: [],
      sexList: [],
      adoptionlist: [],
      tableColumns,
      tableData: [],
      showOn: false,
      page: 1,
      size: 10,
      mixListOptions: {
        // /followVisit/list
        mixGetDataListURL: '/followVisit/recordList', // 数据列表接口，API地址
        mixActivatedIsNeed: false
      },
      mixPageRef: 'gridPager',
      visible: false,
      issearch: false
    }
  },
  filters: {
    dochildType (val) {
      const list = [
        {
          label: '监护不当儿童',
          value: '110'
        },
        {
          label: '留守儿童',
          value: '400'
        },
        {
          label: '事实无人抚养儿童',
          value: '120'
        }
      ]
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    }
  },
  mounted () {
    this.getchildtype()
    this.initData()
  },
  methods: {
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.adoptionlist = data
    },
    // 初始化数据
    initData () {
      this.type = ''
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch, this)
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      if (this.areaId == '1000000000000000000') {
        this.addressmodel = []
      } else {
        this.addressmodel = [this.areaId]
      }
      this.setaddress()
      this.search('000')
    },
    resetFrom (e) {
      this.page = 1
      this.size = 10
      this.type = ''
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.searchForm.resetFields()
      if (this.areaId != '1000000000000000000') {
        this.addressmodel = [this.areaId]
      }
      this.setaddress()
      this.search('000')
    },
    Excel () {
      var data = this.userPageParams()
      if (!data.areaId) {
        data.areaId = '1000000000000000000'
      }
      const url = '/WelfareMasterApi/queryFundsToIssueExport'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    search (e) {
      this.page = 1
      this.size = 10
      this.issearch = false
      this.setHeight('one', 'oneout', !this.issearch, this)
      this.spinning = true
      const formData = this.userPageParams()
      if (e == '000') {
        this.handleSubmit()
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.address_Linkage) {
        formData.areaId = formData.address_Linkage[formData.address_Linkage.length - 1]
        formData.areaCode = formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (formData.childTypeList.length > 0) {
        formData.childTypeList = formData.childTypeList.join(',')
      } else {
        formData.childTypeList = '110,120,400'
      }
      // if (formData.followVisitTime) {
      //   console.log(formData.followVisitTime)
      //   formData.followVisitTimeStart = moment(formData.followVisitTime[0]).format('YYYY-MM-DD')
      //   formData.followVisitTimeEnd = moment(formData.followVisitTime[1]).format('YYYY-MM-DD')
      //   delete formData.followVisitTime
      // }
      return formData
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    see (val, obj) {
      this.$router.push({
        name: 'followUpStatistics',
        query: {
          jump: 'yes',
          childId: obj.childId,
          obj: JSON.stringify(obj),
          disabled: true
        }
      })
    },
    add (val, obj) {
      this.$router.push({
        name: 'newHouseHoldFollow',
        query: {
          jump: 'yes',
          obj: JSON.stringify(obj),
          disabled: false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.prienttitle {
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 24px;
}
.prientout {
  width: 100%;
  padding: 0 20px;
}
.prientout /deep/.ant-radio-wrapper {
  width: 50%;
  margin-right: 0;
  margin-bottom: 32px;
}
</style>
