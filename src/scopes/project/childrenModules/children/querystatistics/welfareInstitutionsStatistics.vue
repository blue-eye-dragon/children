<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">

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

            <ta-form-item label="成立日期"
                          fieldDecoratorId="found"
                          style="width:380px"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker :placeholder="['开始日期', '结束日期']" />
            </ta-form-item>
            <ta-form-item label="机构状态"
                          fieldDecoratorId="state"
                          class="spilwid"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          :initValue="'1'">
              <ta-select>
                <ta-select-option v-for=" (item,index ) in  [{ label: '正常', value: '1' }, { label: '已注销', value: '0' }, { label: '全部', value: '' }]"
                                  :key=" index"
                                  :value="item.value">
                  {{item.label}}
                </ta-select-option>
              </ta-select>
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
                 :spinning="spinning">
          <div class="tableout"
               id="tmd">
            <ta-table bordered
                      :scroll="{ x: 3350, y: '100%' }"
                      :columns.sync="tableColumns"
                      ref="teble"
                      :dataSource="tableData">
              <span slot="number"
                    slot-scope="val,obj,i"> {{obj.county+obj.city+obj.province}} </span>
              <span slot="on1"
                    slot-scope="val,obj,i"> {{obj.county+obj.city+obj.province-obj.orgNatureOne-obj.orgNatureTwo-obj.orgNatureThree}} </span>
              <span slot="on2"
                    slot-scope="val,obj,i"> {{obj.county+obj.city+obj.province-obj.orgTypeOne-obj.orgTypeTwo}} </span>
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
        width: 300,
        align: 'center',
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', true, 'areaname')
        }
      },
      {
        title: '福利机构名称',
        hidden: true,
        dataIndex: 'noProtectOrgName',
        width: 300,
        align: 'center',
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', true, 'areaname')
        }
      },
      {
        title: '机构总数量',
        dataIndex: 'number',
        width: 180,
        align: 'center',
        fixed: 'left',
        scopedSlots: { customRender: 'number' }
      },

      {
        title: '机构级别',
        children: [
          {
            title: '区县',
            dataIndex: 'county',
            width: 120,
            align: 'center'
          },
          {
            title: '市',
            dataIndex: 'city',
            width: 120,
            align: 'center'
          },
          {
            title: '省',
            dataIndex: 'province',
            width: 120,
            align: 'center'
          }
        ]
      },

      {
        title: '机构性质',
        children: [
          {
            title: '公益一类事业单位',
            dataIndex: 'orgNatureOne',
            width: 200,
            align: 'center'
          },
          {
            title: '公益二类事业单位',
            dataIndex: 'orgNatureTwo',
            width: 200,
            align: 'center'
          },
          {
            title: '国家不拨款事业单位',
            dataIndex: 'orgNatureThree',
            width: 200,
            align: 'center'
          },
          {
            title: '未采集',
            dataIndex: 'orgNatureWeicaiji',
            width: 200,
            align: 'center'
            // scopedSlots: { customRender: 'on1' }
          }
        ]
      },
      {
        title: '机构类型',
        children: [
          {
            title: '独立的儿童福利院',
            dataIndex: 'orgTypeOne',
            width: 200,
            align: 'center'
          },
          {
            title: '设有儿童部的社会福利院',
            dataIndex: 'orgTypeTwo',
            width: 250,
            align: 'center'
          },
          {
            title: '未采集',
            dataIndex: 'orgTypeWeicaiji',
            width: 200,
            align: 'center'
            // scopedSlots: { customRender: 'on2' }
          }
        ]

      },
      {
        title: '登记机关',
        children: [
          {
            title: '编制部门',
            dataIndex: 'registerOne',
            width: 100,
            align: 'center'
          },
          {
            title: '民政部门',
            dataIndex: 'registerTwo',
            width: 100,
            align: 'center'
          },
          {
            title: '工商部门',
            dataIndex: 'registerThree',
            width: 100,
            align: 'center'
          },
          {
            title: '未登记',
            dataIndex: 'registerFour',
            width: 100,
            align: 'center'
          },
          {
            title: '其他',
            dataIndex: 'registerFive',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '基础设施情况',
        children: [
          {
            title: '占地面积',
            dataIndex: 'basicOne',
            width: 100,
            align: 'center'
          },
          {
            title: '使用面积',
            dataIndex: 'basicTwo',
            width: 100,
            align: 'center'
          },
          {
            title: '建筑面积',
            dataIndex: 'basicThree',
            width: 100,
            align: 'center'
          },
          {
            title: '床位数',
            dataIndex: 'basicFour',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '职工人数',
        children: [
          {
            title: '职工总数',
            dataIndex: 'workersTotal',
            width: 100,
            align: 'center'
          },
          {
            title: '正式编制人员',
            dataIndex: 'workersOne',
            width: 150,
            align: 'center'
          },
          {
            title: '临聘人员',
            dataIndex: 'workersTwo',
            width: 100,
            align: 'center'
          },
          {
            title: '公益岗位',
            dataIndex: 'workersThree',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '社会工作者',
        children: [
          {
            title: '在编人员',
            dataIndex: 'socialWorkersOne',
            width: 100,
            align: 'center'
          },
          {
            title: '临聘人员',
            dataIndex: 'socialWorkersTwo',
            width: 100,
            align: 'center'
          },
          {
            title: '公益岗位',
            dataIndex: 'socialWorkersThree',
            width: 100,
            align: 'center'
          }
        ]
      },
      {
        title: '岗位设置',
        children: [
          {
            title: '专业技术人员',
            dataIndex: 'professional',
            width: 150,
            align: 'center'
          },
          {
            title: '工勤技能人员',
            dataIndex: 'skilledWorkers',
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
        mixGetDataListURL: '/welfareOrgStatisticsApi/queryWelfareOrgConditionStatistics' // 数据列表接口，API地址
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
      flagName: false

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
      this.nowType = '1'
      this.addressmodel = []
      this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
      this.areaId = window.parent.indexTool.getUserInfo().areaId
      this.showOn = false
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
      this.nowType = '1'
      this.flagName = false
      this.getlist('000')
    },
    // 读取列表 无分页形式
    async getlist (item, data) {
      this.spinning = true
      const formData = this.userPageParams()
      formData.type = 1
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
        this.isgoback = true
        if (data.arealevel == 3 || data.areaName.indexOf('本级') > -1) {
          if (data.areaName.indexOf('本级') > -1) {
            this.flagName = true
          } else {
            this.flagName = false
          }
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
      if (formData.address_Linkage) {
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
          // if (record.arealevel == '3' || record.areaLevel == '4' || record.orgOrWelfare == '0') {
          if (!record.isIn || record.isIn == 0) {
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
      this.nowcode = record.areaId
      this.dealArea(record.idpath)
      this.form.setFieldsValue({
        level: record.arealevel
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
        if(this.areaLevel == 3) {
          areaIdPathS.splice(0, 2)
        }
        const areaArray = areaIdPathS.map(item => {
          return item.trim()
        })
        this.addressmodel = areaArray
        this.setaddress()
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
      // 特殊处理导出接口入参type传错的问题: 省级
      let {areaLevel} = window.parent.indexTool.getUserInfo()
      if (['1'].includes(areaLevel) && this.addressmodel.length==2 && this.isgoback) {
        formData.type = 1
      }
      // 特殊处理导出接口入参type传错的问题
      if (['1', '2', '3'].includes(areaLevel) && this.addressmodel.length==1 && !this.isgoback) {
        formData.type = 1
      }
      this.exportFile('/welfareOrgStatisticsApi/exportWelfareOrgConditionStatistics', formData)
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
