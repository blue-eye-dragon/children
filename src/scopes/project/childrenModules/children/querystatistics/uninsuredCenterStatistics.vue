<template>
  <!--未保中心情况统计 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(form)=>{this.form = form}">
            <AreaQuery class="spilwid"
                       :ishide="true"
                       types="1"
                       msg="区域"
                       :allowClear="false"
                       fileldName="areaId"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></AreaQuery>

            <ta-form-item label="机构级别"
                          hidden
                          fieldDecoratorId="level">
              <ta-input></ta-input>
            </ta-form-item>
            <ta-form-item style="width:380px"
                          label="成立日期"
                          fieldDecoratorId="incorporationDate"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker />
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
            <ta-form-item label="机构类型"
                          fieldDecoratorId="orgType"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select :collection-type="'TYPEOFPROTECTION'"
                         :dropdownMatchSelectWidth="false"
                         placeholder="请选择机构类型" />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="getlist('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn">
          <div class="radioClass rightClass">
            <ta-button class="exportbtn"
                       icon="upload"
                       @click="showOn = true">导出</ta-button>
            <ta-button icon="rollback"
                       v-if="isShowReturn"
                       @click="returns">返回</ta-button>
          </div>
        </div>
        <div class="tableout"
             id="tmd2"
             style="height: 630px">
          <ta-table :columns.sync="tableColumns"
                    :dataSource="tableData"
                    ref="teble"
                    bordered
                    :showOverflowTooltip="true"
                    :scroll="{x: 2750,y: '100%' }">
            <!-- <span slot="noIndependentSituation"
                  slot-scope="val,obj">{{obj.count-obj.independentSituationYes-obj.independentSituationNo}} </span> -->
          </ta-table>
          <span>备注：1.机构独立情况：“未采集”类型统计的是数据中没有标明机构是否独立的数据。</span>
        </div>
      </div>
    </ta-border-layout>
    <ta-modal :centered="false"
              style="top: 25%;"
              :visible="showOn"
              @ok="Excel"
              @cancel="showOn = false">
      <div>
        <h3>确认导出查询条件下的全部有效数据吗？</h3>
      </div>
    </ta-modal>
  </div>
</template>

<script>
import AreaQuery from '@component/common/components/areaQuery'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
export default {
  // mixins: [listMixin],
  components: {
    AreaQuery
  },
  data () {
    const tableColumns = [
      {
        title: '序号',
        dataIndex: 'serialNum',
        key: 'serialNum',
        width: 80,
        align: 'center',
        fixed: 'left',
        customRender: (text, record, index) => {
          return {
            children: index === 0 ? '合计' : text,
            attrs: index === 0 ? { colSpan: 2 } : {}
          }
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
          let children
          if (index === 0) {
            children = '合计'
          } else if (record.isIn == '0') {
            children = (<span>{text}</span>)
          } else {
            children = (<a onClick={() => this.areaClick(record)}>{text}</a>)
          }
          return {
            children,
            attrs: index === 0 ? { colSpan: 0 } : {}
          }
        }
      },
      {
        title: '区域',
        dataIndex: 'areaName',
        key: 'areaName',
        align: 'center',
        width: 300,
        fixed: 'left',
        customRender: (text, record, index) => {
          let children
          if (index === 0) {
            children = '合计'
          } else if (record.isIn == '0') {
            children = (<span>{text}</span>)
          } else {
            children = (<a onClick={() => this.areaClick(record)}>{text}</a>)
          }
          return {
            children,
            attrs: index === 0 ? { colSpan: 0 } : {}
          }
        }
      },
      {
        title: '机构总数量',
        dataIndex: 'count',
        align: 'center',
        key: 'count',
        width: 150,
        fixed: 'left'
      },
      {
        title: '经编办批准成立数量',
        dataIndex: 'isApprovalCount',
        align: 'center',
        width: 220,
        fixed: 'left'
      },
      {
        title: '机构独立情况',
        children: [
          {
            title: '机构独立',
            dataIndex: 'independentSituationYes',
            width: 120,
            align: 'center'
          },
          {
            title: '机构不独立',
            children: [
              {
                title: '小计',
                dataIndex: 'independentSituationNoCount',
                width: 120,
                align: 'center'

              },
              {
                title: '相对独立',
                dataIndex: 'peopleNum',
                width: 120,
                align: 'center'

              },
              {
                title: '挂牌成立',
                dataIndex: 'workNum',
                width: 120,
                align: 'center'

              }, {
                title: '自行挂牌',
                dataIndex: 'independentSituationNo', // 未提供
                width: 120,
                align: 'center'

              }
            ]
          },
          {
            title: '未采集',
            dataIndex: 'independentSituationNo',
            width: 120,
            align: 'center'
          }
        ]
      },
      {
        title: '机构级别',
        children: [
          {
            title: '省',
            dataIndex: 'provinceNum',
            width: 120,
            align: 'center'
          },
          {
            title: '市',
            dataIndex: 'cityNum',
            width: 120,
            align: 'center'
          },
          {
            title: '区县',
            dataIndex: 'countyNum',
            width: 120,
            align: 'center'
          }
        ]
      },
      {
        title: '机构性质',
        children: [{
          title: '事业编',
          align: 'center',
          dataIndex: 'careerEditor',
          key: 'careerEditor',
          width: 110
        }, {
          title: '参公',
          align: 'center',
          dataIndex: 'canGong',
          key: 'canGong',
          width: 110
        }, {
          title: '不在编',
          align: 'center',
          dataIndex: 'notEditing',
          key: 'notEditing',
          width: 110
        }, {
          title: '其他',
          align: 'center',
          dataIndex: 'otherNature',
          key: 'otherNature',
          width: 110
        }]
      },
      {
        title: '机构类型',
        children: [{
          title: '未成年救助保护机构',
          align: 'center',
          dataIndex: 'protectionCenter',
          key: 'protectionCenter',
          width: 250
        }, {
          title: '乡镇（街道）未保工作站',
          align: 'center',
          dataIndex: 'townUninsuredStation',
          key: 'townUninsuredStation',
          width: 280
        }]
      },
      {
        title: '基础设施情况',
        children: [{
          title: '占地面积(m²)',
          align: 'center',
          dataIndex: 'areaCovered',
          key: 'areaCovered',
          width: 160
        }, {
          title: '建筑面积(m²)',
          align: 'center',
          dataIndex: 'builtUpArea',
          key: 'builtUpArea',
          width: 160
        }, {
          title: '床位数',
          align: 'center',
          dataIndex: 'bedsNumber',
          key: 'bedsNumber',
          width: 120
        }]
      }
    ]
    return {
      tableColumns,
      type: '',
      tableData: [], // 列表数据
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/uninsuredCenterStatistics/list', // 数据列表接口，API地址
        mixGetDataListIsPage: false, // 数据列表接口，是否需要分页？
        mixExportURL: '' // 导出接口，API地址
      },
      arealevel: '',
      ishide: false, // 是否隐藏
      addressmodel: [], // 区划查询条件赋值
      showOn: false, // 导出提示弹窗的显隐控制
      userInfo: window.parent.indexTool.getUserInfo(), // 当前登录用户的用户信息
      isShowReturn: false, // 返回按钮的显隐控制
      flagName: false,
      nowType: '1'
    }
  },
  activated () {
    // 初始化数据
    this.initData()
  },
  methods: {
    // 读取列表 无分页形式
    async getlist (e) {
      const params = this.userPageParams()
      if (this.flagName) {
        this.isShowReturn = false
      }
      if (e == 'search') {
        // 加上它 !['0', '1', '2', '3'].includes(this.userInfo.areaLevel) 主要解决部分情况下返回按钮请求数据入参不对导致级别往上返时错乱的问题
        if (params && params.level == 3 && !['0', '1', '2', '3'].includes(this.userInfo.areaLevel)) {
          params.type = 2
          this.nowType = 2
        } else {
          this.nowType = 1
          params.type = 1
          if (params.areaId == this.userInfo.areaId) {
            this.isShowReturn = false
          }
          // 若当前登录的是区县且下钻的的是区县（主要解决当前登录是区县，下钻的是区县，但返回按钮错误的返回至市级列表的问题）
          if (params.areaId != this.userInfo.areaId && this.userInfo.areaLevel == 3 && this.form.getFieldsValue().level == 3) {
            this.isShowReturn = false
            params.areaId = this.userInfo.areaId
          }
        }
      } else {
        this.isShowReturn = true
        if (e.areaLevel == 3 || e.areaName.indexOf('本级') > -1) {
          if (e.areaName.indexOf('本级') > -1) {
            this.flagName = true
          } else {
            this.flagName = false
          }
          this.nowType = 2
          params.type = this.nowType
        } else {
          this.nowType = 1
        }
      }

      const res = await this.post(this.mixListOptions.mixGetDataListURL, params)
      if (res.serviceSuccess) {
        this.tableData = res.data.data
        if (this.tableData && this.tableData.length > 0) {
          this.tableData.forEach((e) => {
            e.noProtectOrgName = e.areaName
          })
          if (!this.tableData[1].isIn || this.tableData[1].isIn == 0) {
            this.$refs.teble.showColumns('noProtectOrgName')
            this.$refs.teble.hideColumns('areaName')
          } else {
            this.$refs.teble.showColumns('areaName')
            this.$refs.teble.hideColumns('noProtectOrgName')
          }
        }
      }
    },
    // 参数处理
    userPageParams () {
      const formData = this.form ? this.form.getFieldsValue() : {}
      if (formData.areaId && formData.areaId.length > 0) {
        formData.areaId = formData.areaId[formData.areaId.length - 1]
      } else {
        formData.areaId = this.userInfo.areaId
      }
      if (formData.incorporationDate && formData.incorporationDate.length > 0) {
        formData.incorporationDateStart = moment(formData.incorporationDate[0]).format('YYYY-MM-DD')
        formData.incorporationDateEnd = moment(formData.incorporationDate[1]).format('YYYY-MM-DD')
        delete formData.incorporationDate
      }
      return formData
    },
    // 初始化数据
    initData () {
      this.type = ''
      this.arealevel = this.userInfo.areaLevel
      this.addressmodel = this.userInfo.areaLevel == 0 ? [] : [this.userInfo.areaId]
      this.form.resetFields()
      this.getlist('search')
      this.isShowReturn = false
      this.flagName = false
      this.nowType = '1'
    },
    // 区域下钻
    areaClick (e) {
      this.delAddr(e.idpath)
      this.setaddress()
      this.form.setFieldsValue({
        level: e.areaLevel
      })
      this.getlist(e)
    },
    delAddr (areaIdPath) {
      if (areaIdPath) {
        const areaIdPathS = areaIdPath.split('/')
        if (window.parent.indexTool.getUserInfo().areaLevel == 2) {
          areaIdPathS.shift()
        }
        areaIdPathS.shift()
        this.addressmodel = areaIdPathS
      }
    },
    returns () {
      this.addressmodel.splice(-1, 1)
      if (this.addressmodel.length == 0 || (this.addressmodel.length == 1 && this.addressmodel[0] == window.parent.indexTool.getUserInfo().areaId)) {
        this.isgoback = false
      }
      if (this.addressmodel.length == 0) {
        this.addressmodel = [window.parent.indexTool.getUserInfo().areaId]
      }
      const idti = this.addressmodel[this.addressmodel.length - 1]
      this.getlist('search')
    },
    adsvalchange (value, areaLevel) {
      this.form.setFieldsValue({
        level: areaLevel.length > 1 ? areaLevel[1].areaLevel : ''
      })
      if (areaLevel) {
        this.arealevel = areaLevel[areaLevel.length - 1].areaLevel
      } else {
        this.arealevel = ''
      }
    },
    // 区域赋值
    setaddress () {
      this.form.setFieldsValue({
        areaId: this.addressmodel
      })
    },
    // 重置
    resetFrom () {
      this.form.resetFields()
      this.areaLevel = this.userInfo.areaLevel
      this.addressmodel = this.userInfo.areaLevel == 0 ? [] : [this.userInfo.areaId]
      this.getlist('search')
      this.isShowReturn = false
      this.flagName = false
      this.nowType = '1'
    },
    // 导出事件
    Excel () {
      var data = this.userPageParams()
      data.type = 1
      if (this.nowType == 2 || (data && data.level == 3)) {
        data.type = 2
      }
      const url = '/uninsuredCenterStatistics/exportList'
      if (!data.areaId) {
        data.areaId = this.userInfo.areaId
      }
      // 特殊处理导出接口入参type传错的问题: 省级
      if (['1'].includes(this.userInfo.areaLevel) && this.addressmodel.length == 2 && this.isShowReturn) {
        data.type = 1
      }
      // 特殊处理导出接口入参type传错的问题: 省级、市级
      if (['1', '2'].includes(this.userInfo.areaLevel) && this.addressmodel.length == 1 && !this.isShowReturn) {
        data.type = 1
      }
      // 特殊处理导出接口入参type传错的问题: 区县级
      if (this.userInfo.areaLevel == '3' && !this.isShowReturn) {
        data.type = 1
        data.areaId = this.userInfo.areaId
      }
      this.exportFile(url, data)
      this.showOn = false
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
// #tmd /deep/ .ant-table-body::-webkit-scrollbar {
//   /*滚动条整体样式*/
//   width: 5px;
//   /*高宽分别对应横竖滚动条的尺寸*/
//   height: 10px;
// }
// #tmd /deep/ .ant-table-body-inner::-webkit-scrollbar {
//   /*滚动条整体样式*/
//   width: 5px;
//   /*高宽分别对应横竖滚动条的尺寸*/
//   height: 10px;
// }
.tables {
  width: 2200px;
}
.tableout {
  width: 100%;
  height: 600px;
  overflow-x: auto;
  padding-bottom: 20px;
  overflow-y: hidden;
}
#tmd2 /deep/ .ant-table-body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#tmd2 /deep/ .ant-table-body-inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
</style>
