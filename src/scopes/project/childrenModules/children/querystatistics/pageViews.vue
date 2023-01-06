<template>
  <!-- 系统访问量及用户量统计 -->
  <div class="searchdata tadrawer"
       id="tmd">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'  }">
      <div class=" "
           style="padding-top:15px;">
        <div class="searchdata"
             style="height: 85px;position:relative">
          <div class="searchcont"
               ref="oneout">
            <ta-form layout="inline"
                     ref="one"
                     class="searchfroms"
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <!-- <ta-col :span="24">
                <AreaQuery msg="区域"
                           class="spilwid"
                           :ishide="true"
                           :addressmodel='addressmodel'
                           @setaddress='setaddr'
                           :labelCol="{span:7}"
                           :wrapperCol="{span:17}"
                           types="2"></AreaQuery>
              </ta-col> -->
              <ta-form-item label="统计时间"
                            fieldDecoratorId="statistics"
                            style="width:500px"
                            :labelCol="{span:4}"
                            :wrapperCol="{span:20}">
                <ta-range-picker :showTime="{
                                   hideDisabledOptions: true,
                                   defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                                 }"
                                 style="width:450px"
                                 format="YYYY-MM-DD HH:mm:ss" />
              </ta-form-item>
            </ta-form>
            <div class="searchbtn searchButton">
              <ta-button type="primary"
                         class="search"
                         icon="search"
                         @click="searchslist()">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
              <!-- <ta-button class="btnleft"
                         @click="advancedquery">高级查询
                <ta-icon :type="issearch?'up':'down'" />
              </ta-button> -->
            </div>
          </div>
        </div>
        <div style="float: right;  margin-bottom: 7px; margin-top: -7px;   z-index: 99;  position: relative;">
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
          <ta-button icon="rollback"
                     v-if="areaId!=oAreaId"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="spinning">

          <ta-table class=" tables table-min-width  hight "
                    :columns="tableColumns"
                    :showOverflowTooltip="false"
                    :dataSource="tableData"
                    :scroll="{ x: 1000,}"
                    bordered>
            <!-- <template slot="areaName"
                      slot-scope="a, b, c">
              <span v-if="b.areaLevel==4 || b.areaName=='合计' || b.isBenJi== 0">{{a}}</span>
              <a @click="searchslist(b,'click')"
                 v-else>{{a}}</a>
            </template> -->
          </ta-table>
        </ta-spin>

      </div>

    </ta-border-layout>
  </div>
</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    // AreaQuery
  },
  data () {
    return {
      spinning: null,
      addressmodel: [],
      ishide: true,
      tableData: [],
      tableColumns: [
        {
          title: '区域',
          dataIndex: 'areaName',
          align: 'center',
          width: '30%'
        },
        {
          title: '访问量PV',
          dataIndex: 'visitsCount',
          align: 'center',
          width: '40%'
        },
        {
          title: '用户量UV',
          dataIndex: 'userCount',
          align: 'center',
          width: '40%'
        }
      ],
      areaId: '',
      areaCode: '',
      mixListOptions: {
        mixGetDataListURL: '/operatingStatisticsApi/querySystemVisitsAndUser',
        mixActivatedIsNeed: false
      },
      issearch: false,
      oAreaId: '',
      showOn: false,
      mixPageRef: 'mixPageRef',
      page: 1,
      size: 10
    }
  },
  updated () {
  },
  mounted () {
  },
  activated () {
    this.isConfirm = ''
    this.nowText = 'all'
    this.areaId = window.parent.indexTool.getUserInfo().areaId
    this.oAreaId = window.parent.indexTool.getUserInfo().areaId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
    this.setHeight('one', 'oneout', !this.issearch)
    const nowDates = new Date()
    const nowDate1 = moment(nowDates).format('YYYY-MM-DD') + ' 00:00:00'
    const nowDate2 = moment(nowDates).format('YYYY-MM-DD') + ' 23:59:59'
    this.searchForm.setFieldsValue({ statistics: [moment(nowDate1, 'YYYY-MM-DD HH:mm:ss'), moment(nowDate2, 'YYYY-MM-DD HH:mm:ss')] })
    this.searchslist()
  },
  methods: {
    moment,
    setaddr () {
      this.$nextTick(() => {
        this.searchForm.setFieldsValue({ // 130000000000/130100000000/130102000000
          address_Linkage: this.addressmodel
        })
      })
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      const searchValue = this.searchForm.getFieldsValue()
      this.getlist(searchValue, '000')// 重置查寻处理
    },
    goback () {
      this.addressmodel.splice(-1, 1)
      this.searchslist()
    },
    // async getDictionarieMore () {
    //   this.sexList = await this.getDictionaries('SEX')
    //   this.censusregisterList = await this.getDictionaries('CENSUSREGISTER')
    //   this.schoolingList = await this.getDictionaries('DEGREEEDUCATION')
    //   this.adiscondlist = await this.getDictionaries('ADISCONDITION') // 患艾滋情况
    //   this.schoolList = await this.getDictionaries('SCHOOLSITUATION')// 就学情况
    //   this.guardianlist = await this.getDictionaries('GUARDIANSHIPTYPE')// 监护类型
    //   this.otherSpecialist = await this.getDictionaries('OTHERSPECIALCASES')// 其他特殊情况
    //   this.socialWelfarelist = await this.getDictionaries('SOCIALWELFAREIMPLEMENTATION')// 福利救助帮扶
    //   this.socialWelfarelist.sort((a, b) => {
    //     return a.value - b.value
    //   })
    //   this.guaediancilationlist = await this.getDictionaries('GUARDIANVIOLATION')// 遭监护人侵害情况
    // },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.statistics) {
        formData.statisticsStartDate = formData.statistics[0].format('YYYY-MM-DD HH:mm:ss')
        formData.statisticsEndDate = formData.statistics[1].format('YYYY-MM-DD HH:mm:ss')
        delete formData.statistics
      }
      return formData
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
    searchslist () {
      this.spinning = true
      const searchValue = this.userPageParams()
      this.advancedquery()

      // if (type == 'click') {
      //   // 点击下转
      //   this.dealArea(value.idPath)
      // }
      this.getlist(searchValue)
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
    },
    async getlist (params) {
      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      this.tableData = res.data.data
      if (this.issearch) {
        this.advancedquery()
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    Excel () {
      var data = this.userPageParams()
      const url = '/operatingStatisticsApi/querySystemVisitsAndUserExport'
      this.exportFile(url, data)
      this.showOn = false
    },
    showModal () {
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },
    handleOk (e) {
      this.exports()
      this.showOn = false
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }

}
</script>
<style lang="scss" scoped>
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
.searchcont {
  height: 66px;
  transition: all 1s ease 0s;
  position: absolute;
  width: 100%;
  z-index: 100;
  background: rgb(255, 255, 255);
}
.searchfroms {
  width: calc(100% - 330px);
}
.searchbtn {
  width: 330px;
  position: absolute;
  right: 0;
  top: 6px;
}
.ant-tabs-extra-content {
  display: none;
}
.searchdata {
  height: 100%;
}
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
</style>
