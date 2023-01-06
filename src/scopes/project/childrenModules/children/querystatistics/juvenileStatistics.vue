<template>
  <!-- 未保工作人员 -->
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">
            <!-- :types="'2'" -->
            <areaQuery class="spilwid"
                       msg="区域"
                       :ishide="true"
                       types="1"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></areaQuery>
            <ta-form-item label="机构级别"
                          hidden
                          fieldDecoratorId="level">
              <ta-input></ta-input>
            </ta-form-item>

            <ta-form-item>

              <div class="searchButton">
                <ta-button type="primary"
                           class="search"
                           icon="search"
                           @click="getlist('000')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>

          </ta-form>
        </div>
        <div style="text-align:center;font-size:22px;margin-bottom:10px;font-weight: 600;">未保机构工作人员情况统计表</div>
        <div style="float: right;margin-right: 20px;font-size: 16px;margin-top: -40px;">统计时间：截止到{{yeartext}}</div>
        <div style="text-align:right;margin-bottom:5px">
          <ta-button class="exportbtn"
                     icon="upload"
                     hidden
                     @click="exports">导出</ta-button>
          <ta-button v-if="isgoback"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="false">
          <div class="tableout"
               id="tmd3">
            <ta-table bordered
                      ref="teble"
                      :showOverflowTooltip="true"
                      :scroll="{ x: 3300,y: '100%' }"
                      :columns.sync="tableColumns"
                      :dataSource="tableData">

            </ta-table>
            <div style="margin-top:10px;font-size:12px">
              备注：1.年龄段情况：“其他”类型统计的是未符合列表中年龄段的年龄在20周岁以下的数据。
              2.年龄段情况：“未采集”类型统计的是没有标明年龄的数据。
              3.学历情况：“其他”类型统计的是学历选择为“文盲或半文盲、学龄前、幼儿园、小学、初中、高中、技工学校、未说明情况和特殊教育”类型的数据。
              4.学历情况：“未采集”类型主要统计历史数据中没有填写学历情况的数据。
              5.职业资质：“未采集”类型统计的是历史数据中没有标明职业资质的数据。
              6.编制方式：“未采集”类型统计的是历史数据中没有标明编制方式的数据。
            </div>
          </div>
        </ta-spin>
      </div>
    </ta-border-layout>
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
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    const tableColumns = [
      // {
      //   title: '序号',
      //   dataIndex: 'serialNum',
      //   align: 'center',
      //   width: 80,
      //   fixed: 'left',
      //   customRender: (text, record, index) => {
      //     return this.marge(text, record, index, '2', true, 'serialNum')
      //   }
      // },'区域'
      {
        title: '区域',
        hidden: true,
        dataIndex: 'areaName',
        width: 300,
        align: 'center',
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '1', true, 'areaname')
        }
      },
      {
        title: '未保机构名称',
        hidden: true,
        dataIndex: 'noProtectOrgName',
        width: 300,
        align: 'center',
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '1', true, 'areaname')
        }
      },
      // {
      //   title: '未保机构名称',
      //   dataIndex: 'noProtectOrgName',
      //   width: 300,
      //   // align: 'center',
      //   fixed: 'left'
      // },
      {
        title: '人员总数量',
        dataIndex: 'sumCount',
        width: 150,
        fixed: 'left',
        align: 'center'
      },
      {
        title: '年龄段情况',
        children: [
          {
            title: '20-24周岁',
            dataIndex: 'twentyToTwentyfive',
            width: 160,
            align: 'center'
          },
          {
            title: '25-34周岁',
            dataIndex: 'twentyfiveToThirtyfive',
            width: 160,
            align: 'center'
          },
          {
            title: '35-44周岁',
            dataIndex: 'thirtyfiveToFortyfive',
            width: 160,
            align: 'center'
          },
          {
            title: '45-59周岁',
            dataIndex: 'fortyfiveToSixty',
            width: 160,
            align: 'center'
          },
          {
            title: '60周岁及以上',
            dataIndex: 'sixtyOver',
            width: 160,
            align: 'center'
          },
          {
            title: '其他',
            dataIndex: 'ageOther',
            width: 100,
            align: 'center'
          },
          {
            title: '未采集',
            dataIndex: 'ageWeicaiji',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '学历情况',
        children: [
          {
            title: '中等专业学校或中等技术学校',
            dataIndex: 'educationSecondarySpecialize',
            width: 250,
            align: 'center'
          },
          {
            title: '大学专业和专科学校',
            dataIndex: 'educationJuniorCollege',
            width: 250,
            align: 'center'
          },
          {
            title: '大学本科',
            dataIndex: 'educationUndergraduateCourse',
            width: 100,
            align: 'center'
          },
          {
            title: '硕士研究生',
            dataIndex: 'educationMaster',
            width: 150,
            align: 'center'
          },
          {
            title: '博士研究生',
            dataIndex: 'educationDoctor',
            width: 150,
            align: 'center'
          },
          {
            title: '其他',
            dataIndex: 'educationOther',
            width: 100,
            align: 'center'
          },
          {
            title: '未采集',
            dataIndex: 'educationWeicaiji',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '职业资质',
        children: [
          {
            title: '教师资格',
            dataIndex: 'qualificationTeacher',
            width: 100,
            align: 'center'
          },
          {
            title: '法律职业资格',
            dataIndex: 'qualificationLaw',
            width: 150,
            align: 'center'
          },
          {
            title: '医师',
            dataIndex: 'qualificationPhysician',
            width: 100,
            align: 'center'
          },
          {
            title: '护士职业资格',
            dataIndex: 'qualificationNurse',
            width: 200,
            align: 'center'
          },
          {
            title: '职业药师',
            dataIndex: 'qualificationMedicine',
            width: 100,
            align: 'center'
          },
          {
            title: '社会工作者职业资格',
            dataIndex: 'qualificationCaseworker',
            width: 200,
            align: 'center'
          },
          {
            title: '卫生专业技术资格',
            dataIndex: 'qualificationSanitation',
            width: 200,
            align: 'center'
          },
          {
            title: '心理咨询师',
            dataIndex: 'qualificationPsychologist',
            width: 120,
            align: 'center'
          }, {
            title: '无',
            dataIndex: 'qualificationNo',
            width: 120,
            align: 'center'
          }, {
            title: '未采集',
            dataIndex: 'qualificationWcaiji',
            width: 120,
            align: 'center'
          }
        ]
      },
      {
        title: '编制方式',
        children: [
          {
            title: '公务员',
            dataIndex: 'bianzhiServant',
            width: 100,
            align: 'center'
          },
          {
            title: '事业编',
            dataIndex: 'bianzhiUndertaking',
            width: 100,
            align: 'center'
          },
          {
            title: '合同制',
            dataIndex: 'bianzhiContract',
            width: 100,
            align: 'center'
          },
          {
            title: '临时',
            dataIndex: 'bianzhiTemporary',
            width: 100,
            align: 'center'
          },
          {
            title: '其他',
            dataIndex: 'bianzhiOther',
            width: 100,
            align: 'center'
          },
          {
            title: '未采集',
            dataIndex: 'bianzhiWeicaiji',
            width: 100,
            align: 'center'
          }
        ]
      }

    ]
    return {
      spinning: null,
      tableColumns,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: false, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        mixGetDataListURL: '/uninsuredCenterStatistics/listByPeople' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      areaLevel: '',
      tableData: [],
      addressmodel: [],
      ishide: true,
      showOn: false,
      areaname: '',
      nowcode: '',
      isgoback: false,
      nowType: '1',
      flagName: false,
      nameTitle: '区域',
      yeartext: ''

    }
  },
  activated () {
    this.yeartext = moment().subtract(1, 'days').format('YYYY-MM-DD')
    this.loadData()
    if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
      this.$nextTick(() => {
        this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '100000000000')
      })
    } else {
      this.$nextTick(() => {
        this.areaname = window.parent.indexTool.getUserInfo().areaName
        this.nowcode = window.parent.indexTool.getUserInfo().areaCode
        this.addressmodel.push(this.nowcode)
      })
    }

    if (window.parent.indexTool.getUserInfo().orgType == '99') {
      this.isorgType = false
    }
    this.loadData()
    this.getlist('000')
  },
  methods: {
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    loadData () {
      this.addressmodel = []
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.showOn = false
      this.nowType = '1'
      this.flagName = false
    },
    // 重置
    resetFrom () {
      this.form.resetFields()
      this.areaname = window.parent.indexTool.getUserInfo().areaName
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.areaCode = window.parent.indexTool.getUserInfo().areaCode
      this.addressmodel = [this.areaId]
      this.showOn = false
      this.areaname = ''
      this.nowcode = ''
      this.isgoback = false
      this.flagName = false
      this.nowType = '1'
      this.getlist('000')
    },
    // 读取列表 无分页形式
    async getlist (item, data) {
      this.spinning = true
      const formData = this.userPageParams()
      if (item != '000') {
        formData.areaId = item
      }
      if (item == '000') {
        if (formData && formData.level == 3) {
          formData.type = 2
          this.nowType = 2
        } else {
          this.nowType = 1
          formData.type = 1

          if (formData.areaId == this.areaId) {
            this.isgoback = false
          }
        }
      }
      if (this.flagName) {
        this.isgoback = false
      }
      if (data) {
        if (data.areaLevel == 3 || data.areaName.indexOf('本级') > -1) {
          if (data.areaName.indexOf('本级') > -1) {
            this.flagName = true
          } else {
            this.flagName = false
          }
          this.isgoback = true
          this.nowType = 2
          formData.type = this.nowType
        } else {
          this.nowType = 1
        }
      }
      const res = await this.post(this.mixListOptions.mixGetDataListURL, formData)
      if (res.serviceSuccess) {
        this.tableData = res.data.data
        if (this.tableData && this.tableData.length > 0) {
          this.tableData.forEach((e) => {
            e.noProtectOrgName = e.areaName
          })

          if (!this.tableData[0].isIn || this.tableData[0].isIn == 0) {
            this.$refs.teble.showColumns('noProtectOrgName')
            this.$refs.teble.hideColumns('areaName')
          } else {
            this.$refs.teble.showColumns('areaName')
            this.$refs.teble.hideColumns('noProtectOrgName')
          }
        }
      }
      this.$nextTick(() => {
        this.spinning = false
      })
    },
    userPageParams (item) {
      const _self = this
      const formData = _self.form.getFieldsValue()
      if (formData.address_Linkage && formData.address_Linkage.length > 0) {
        formData.areaId =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      } else {
        formData.areaId = window.parent.indexTool.getUserInfo().areaId
      }
      if (formData.found) {
        formData.foundStartDate = formData.found[0].format('YYYY-MM-DD')
        formData.foundEndDate = formData.found[1].format('YYYY-MM-DD')
        delete formData.found
      }
      return formData
    },
    marge (text, record, index, val, ismerge, name) {
      // val 列合并 ismerge是否行合并
      // 需要合并的返回合并个数下面需要合并的为0 本身不需要合并为1 合计为1
      const obj = {
        children: text,
        attrs: {}
      }
      if (name == 'serialNum') {
        if (index !== this.tableData.length - 1) {
          obj.children = (<div>
            <span>{this.size * (this.page - 1) + index + 1}</span>
          </div>)
        }
      }
      if (name == 'areaname') {
        if (index !== this.tableData.length - 1) {
          // if (record.areaName.indexOf('市区') != -1 || record.areaLevel == '3' || record.areaLevel == '4' || record.orgOrWelfare == '0') {
          if (record.isIn == 0) {
            obj.children = (<div>
              <span>{text}</span>
            </div>)
          } else {
            obj.children = (<div>
              <a onClick={() => this.add(record)}>{text}</a>
            </div>)
          }
        }
      }
      if (val) {
        if (index === this.tableData.length - 1) {
          obj.attrs.colSpan = parseFloat(val)
          if (val !== 0) {
            obj.children = '合计'
          }
        }
      }
      return obj
    },
    async add (record) {
      this.isgoback = true
      this.nowcode = record.areaId
      this.dealArea(record.idpath)
      this.form.setFieldsValue({
        level: record.areaLevel
      })

      this.getlist(record.areaId, record)
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        if (this.areaLevel == 2) {
          areaIdPathS.shift()
        }
        const areaArray = areaIdPathS.map(item => {
          return item.trim()
        })
        this.addressmodel = areaArray
      }
    },
    adsvalchange (val, areaLevel) {
      this.form.setFieldsValue({
        level: areaLevel.length > 1 ? areaLevel[1].areaLevel : ''
      })
    },

    exports () {
      this.showOn = true
    },
    goback () {
      this.addressmodel.splice(-1, 1)
      if (this.addressmodel.length == 0 || (this.addressmodel.length == 1 && this.addressmodel[0] == window.parent.indexTool.getUserInfo().areaId)) {
        this.isgoback = false
      }
      if (this.addressmodel.length == 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      }
      const idti = this.addressmodel[this.addressmodel.length - 1]
      this.getlist(idti)
    },
    Excel () {
      const _self = this
      const formData = _self.userPageParams()

      formData.type = 1
      if (this.nowType == 2 || (formData && formData.level == 3)) {
        formData.type = 2
      }
      this.exportFile('/folkOrgStatistics/toExcel', formData)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    }
  }
}
</script>
<style scoped>
.tableout {
  width: 100%;
  height: 600px;
  overflow-x: auto;
  padding-bottom: 43px;
  overflow-y: hidden;
}
#tmd3 /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd3 /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
</style>
