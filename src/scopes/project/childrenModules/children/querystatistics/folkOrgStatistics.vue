<template>
  <!-- 民间机构统计 -->
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">

            <areaQuery class="spilwid"
                       msg="区域"
                       :types="'2'"
                       :ishide.sync="ishide"
                       :areaLevel1="areaLevel"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></areaQuery>

            <ta-form-item label="成立日期"
                          fieldDecoratorId="found"
                          style="width:380px"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker :placeholder="['开始日期', '结束日期']" />
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

        <div style="text-align:right;margin-bottom:20px">
          <ta-button class="exportbtn"
                     icon="upload"
                     @click="exports">导出</ta-button>
          <ta-button v-if="isgoback"
                     @click="goback">返回</ta-button>
        </div>
        <ta-spin tip="加载中..."
                 size="small"
                 :spinning="false">
          <div class="tableout"
               id="tmd">
            <ta-table bordered
                      :scroll="{ x: 3830, y: '100%' }"
                      :columns="tableColumns"
                      :dataSource="tableData">

            </ta-table>
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
export default {
  mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    const tableColumns = [
      {
        title: '序号',
        dataIndex: 'serialNum',
        align: 'center',
        width: 80,
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '2', true, 'serialNum')
        }
      },
      {
        title: '区域',
        dataIndex: 'areaName',
        width: 150,
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', true, 'areaname')
        }
      },
      {
        title: '机构总数量',
        dataIndex: 'orgNum',
        width: 150,
        fixed: 'left',
        align: 'center'
      },
      {
        title: '机构注册性质',
        children: [
          {
            title: '工商注册',
            dataIndex: 'registeredCommerce',
            width: 100,
            align: 'center'
          },
          {
            title: '民非注册',
            dataIndex: 'registeredFolkServe',
            width: 100,
            align: 'center'
          },
          {
            title: '未注册',
            dataIndex: 'registeredUnregistered',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '登记机关',
        children: [
          {
            title: '编制部门',
            dataIndex: 'registerOrgCompile',
            width: 100,
            align: 'center'
          },
          {
            title: '民政部门',
            dataIndex: 'registerOrgCivilAffairs',
            width: 100,
            align: 'center'
          },
          {
            title: '工商部门',
            dataIndex: 'registerOrgCommerce',
            width: 100,
            align: 'center'
          },
          {
            title: '未登记',
            dataIndex: 'registerOrgNo',
            width: 100,
            align: 'center'
          },
          {
            title: '其他',
            dataIndex: 'registerOrgOther',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '场所权属',
        children: [
          {
            title: '自有',
            dataIndex: 'placeOwn',
            width: 100,
            align: 'center'
          },
          {
            title: '租赁',
            dataIndex: 'placeLease',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '养育儿童数量',
        children: [
          {
            title: '福利机构养育的孤弃儿童数量',
            dataIndex: 'placeOwn1',
            width: 150,
            align: 'center'
          },
          {
            title: '福利机构代养的困境儿童数量',
            dataIndex: 'placeLease2',
            width: 150,
            align: 'center'
          },
          {
            title: '事实无人抚养儿童数量',
            dataIndex: 'placeLease3',
            width: 150,
            align: 'center'
          }
        ]
      },
      {
        title: '业务人员',
        children: [
          {
            title: '学历',
            children: [
              {
                title: '文盲或半文盲',
                dataIndex: 'educationIlliteracy',
                width: 100,
                align: 'center'
              },
              {
                title: '博士研究生',
                dataIndex: 'educationDoctor',
                width: 100,
                align: 'center'
              },
              {
                title: '硕士研究生',
                dataIndex: 'educationMaster',
                width: 100,
                align: 'center'
              },
              {
                title: '大学本科',
                dataIndex: 'educationUndergraduateCourse',
                width: 100,
                align: 'center'
              },
              {
                title: '大学专科和专科学校',
                dataIndex: 'educationJuniorCollege',
                width: 100,
                align: 'center'
              },
              {
                title: '中专及以下',
                dataIndex: 'educationSecondarySpecialize',
                width: 100,
                align: 'center'
              },
              {
                title: '其他',
                dataIndex: 'educationNo',
                width: 100,
                align: 'center'
              }

            ]
          },
          {
            title: '职称',
            children: [
              {
                title: '初级',
                dataIndex: 'titleLow',
                width: 100,
                align: 'center'
              },
              {
                title: '中级',
                dataIndex: 'titleMiddle',
                width: 100,
                align: 'center'
              },
              {
                title: '副高级',
                dataIndex: 'titleSubtropicalHigh',
                width: 100,
                align: 'center'
              },
              {
                title: '正高级',
                dataIndex: 'titleHeight',
                width: 100,
                align: 'center'
              },
              {
                title: '无',
                dataIndex: 'titleNo',
                width: 50,
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
                width: 100,
                align: 'center'
              },
              {
                title: '医师',
                dataIndex: 'qualificationPhysician',
                width: 50,
                align: 'center'
              },
              {
                title: '护士职业资格',
                dataIndex: 'qualificationNurse',
                width: 100,
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
                width: 100,
                align: 'center'
              },
              {
                title: '卫生专业技术资格',
                dataIndex: 'qualificationSanitation',
                width: 100,
                align: 'center'
              },
              {
                title: '心理咨询师',
                dataIndex: 'qualificationPsychologist',
                width: 100,
                align: 'center'
              },
              {
                title: '无',
                dataIndex: 'qualificationNo',
                width: 100,
                align: 'center'
              }
            ]
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
        mixGetDataListURL: '/folkOrgStatistics/queryfolkOrgStatistics' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      areaLevel: '',
      tableData: [],
      addressmodel: [],
      ishide: true,
      showOn: false,
      areaname: '',
      nowcode: '',
      isgoback: false

    }
  },
  activated () {
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
      this.showOn = false
    },
    // 读取列表 无分页形式
    async getlist (item) {
      this.spinning = true
      const formData = this.userPageParams()
      if (item != '000') {
        formData.areaId = item
      }
      const res = await this.post(this.mixListOptions.mixGetDataListURL, formData)
      if (res.serviceSuccess) {
        this.tableData = res.data.data
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
          if (record.areaName.indexOf('市区') != -1 || record.arealevel == '3' || record.areaLevel == '4' || record.orgOrWelfare == '0') {
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
      this.getlist(record.areaId)
    },
    dealArea (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        areaIdPathS.shift()
        const areaArray = areaIdPathS.map(item => {
          return item.trim()
        })
        this.addressmodel = areaArray
      }
    },
    adsvalchange () {
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
      this.getlist()
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
.searchdata {
  height: 100%;
}
.tableout {
  width: 100%;
  height: 600px;
  overflow-x: auto;
  padding-bottom: 20px;
}
.tables {
  width: 2200px;
}
#tmd /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
</style>
