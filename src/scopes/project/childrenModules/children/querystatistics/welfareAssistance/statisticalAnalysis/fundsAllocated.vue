<template>
  <div class="searchdata"
       id="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer:'80px'}">
      <div class="contentin">
        <div class="searchcont"
             ref="oneout">
        <ta-form layout="inline"
                 ref="one"
                 class="formWidth"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <AreaQuery v-if="ishide"
                     class="spilwid"
                     :ishide.sync="ishide"
                     :addressmodel="addressmodel"
                     @setaddress="setaddress"
                     types='1'
                     msg="区域"></AreaQuery>
          <ta-form-item class="spilwid"
                        label="使用年度"
                        fieldDecoratorId="useYear"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-year-picker format="YYYY" placeholder="请选择使用年度"/>
          </ta-form-item>
          <div class="cbox">
            <ta-checkbox :indeterminate="indeterminate"
                         @change="onCheckAllChange"
                         :checked="checkAll">
              全部
            </ta-checkbox>
            <ta-checkbox-group :options="plainOptions"
                               @change="onChange"
                               :value="checkedList" />
          </div>
          <!--<ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft exportbtn"
                       @click="exports">导出</ta-button>
          </ta-form-item>-->
        </ta-form>
        <div class="searchbtn">
          <div class="searchButton">
            <ta-button class="search "
                       icon="search"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft reset"
                       icon="reload"
                       @click="resetFrom">重置</ta-button>
            <ta-button class="btnleft"
                       style="    width: 109px;"
                       @click="advancedquery">
              高级查询
              <ta-icon :type="issearch?'up':'down'" />
            </ta-button>
          </div>

        </div>
      </div>
        <ta-button class="btnleft exportbtn"
                   icon="upload"
                   style="float: right;"
                   @click="exports">导出</ta-button>
        <div class='titlecont'>
          <p class="titles">
            <span v-if="areaname!=''">
              {{areaname}}-
            </span>
            资金下拨情况统计表</p>
        </div>
        <div class="tableout">
          <ta-table bordered
                    :columns="tableColumns"
                    :showOverflowTooltip="true"
                    :scroll="{ x: '100%' }"
                    :dataSource="tableData">
            <!-- <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span> -->
          </ta-table>
        </div>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"

                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"

                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
      </div>
      <ta-modal :centered="false"
                style="top: 25%;"
                :visible="showOn"
                @ok="Excel"
                @cancel="handleCancel">
        <div>
          <h3>确认导出查询条件下的全部有效数据吗？</h3>
        </div>
      </ta-modal>
    </ta-border-layout>
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
      {
        title: '序号',
        dataIndex: 'serialNum',
        align: 'center',
        width: '6%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '10')
        }
      },
      {
        title: '区域',
        dataIndex: 'areaName',
        width: '9%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '资金类型',
        dataIndex: 'fundType',
        width: '10%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '机构代码',
        dataIndex: 'orgCreditCode',
        width: '10%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '下拨单位名称',
        dataIndex: 'orgName',
        width: '10%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '下拨日期',
        dataIndex: 'allocateTime',
        width: '10%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '文件编号',
        dataIndex: 'fileCode',
        width: '10%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '文件标题',
        dataIndex: 'fileTitle',
        width: '10%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '经办人',
        dataIndex: 'agent',
        width: '7%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '使用年度',
        dataIndex: 'useYearStr',
        width: '8%',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0')
        }
      },
      {
        title: '下拨金额(元)',
        dataIndex: 'allocateMoney',
        width: '10%'
      }
    ]
    return {
      ishide: true,
      indeterminate: false, // 半选初始状态
      checkAll: false, // 全选初始状态
      plainOptions: [],
      checkedList: [],
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/fundAllocateSituationList/queryFundAllocateStatistic',
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      typetext: '全部',
      exportdata: {},
      showOn: false,
      addressmodel: [],
      isbu: false,
      nowcode: '',
      areaname: '',
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch)
    // console.log(window.parent.indexTool.getUserInfo())

    if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
      this.isbu = true
      this.nowcode = '110000000000'
      this.$nextTick(() => {
        this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '110000000000')
      })
    } else {
      this.isbu = false
      this.$nextTick(() => {
        this.nowcode = window.parent.indexTool.getUserInfo().areaCode
        this.areaname = window.parent.indexTool.getUserInfo().areaName
        this.addressmodel.push(this.nowcode)
      })
    }
  },
  mounted () {
    this.getFundtype()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 40 + 'px'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
    loadData () {
      this.value = []// 查询条件起领年月
      this.indeterminate = false// 半选初始状态
      this.checkAll = false // 全选初始状态
      this.checkedList = []
      this.typetext = '全部'
      this.searchForm.resetFields()
    },
    // 获取资金类型
    async getFundtype () {
      let data = await this.getDictionaries('FUNDTYPE')
      this.plainOptions = data
    },
    // 获取label
    getlabel () {
      let arr = []
      this.checkedList.map(item => {
        this.plainOptions.map(val => {
          if (val.value == item) {
            arr.push(val.label)
          }
        })
      })
      return arr.join('、')
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    onChange (checkedList) {
      console.log(checkedList)
      // 未全部选中的情况
      if (
        checkedList.length < this.plainOptions.length &&
        checkedList.length !== 0
      ) {
        // 全选check设置为半选状态
        this.checkAll = false
        this.indeterminate = true
      } else if (checkedList.length === 0) {
        // 一个都没选的情况
        // 全选check设置为不选状态
        this.checkAll = false
        this.indeterminate = false
      } else {
        // 全选全部选中的情况
        // 全选check设置为选中状态
        this.checkAll = true
        this.indeterminate = false
      }
      this.checkedList = checkedList
    },
    onCheckAllChange (e) {
      console.log(e)
      let isChecked = e.target.checked

      if (isChecked) {
        // 全选
        this.checkAll = true
        this.checkedList = []
        this.plainOptions.map(item => {
          this.checkedList.push(item.value)
        })
      } else {
        // 反选
        this.checkAll = false
        this.checkedList = []
      }
      this.indeterminate = false
    },
    Excel () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      console.log(formData)
      formData.fundType = this.checkedList.join(',')
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      console.log(formData.useYear)
      if (formData.useYear) {
        formData.useYear = formData.useYear.format('YYYY-MM-DD')
      }
      this.exportdata = formData
      this.exportdata.excelTitle = this.areaname + '-资金下拨情况统计表'
      this.exportFile('/fundAllocateStatisticsExportApi/export', this.exportdata)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    exports () {
      this.showOn = true
    },
    marge (text, record, index, val) {
      // val 行合并 ismerge是否列合并
      // 需要合并的返回合并个数下面需要合并的为0 本身不需要合并为1 合计为1
      let obj = {
        children: text,
        attrs: {}
      }
      if (index === this.tableData.length - 1) {
        obj.attrs.colSpan = parseFloat(val)
        if (val !== 0) {
          obj.children = '合计'
        }
      }
      return obj
    },
    userPageParams () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      console.log(formData)
      formData.fundType = this.checkedList.join(',')
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      console.log(formData.useYear)
      if (formData.useYear) {
        formData.useYear = formData.useYear.format('YYYY-MM-DD')
      }
      console.log(formData)
      return formData
    },
    resetFrom () {
      this.checkedList = []
      this.checkAll = false
      this.indeterminate = false
      this.searchForm.resetFields()
      this.handleSubmit('search')
    },
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
.tableout {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}
.tables {
  width: 2200px;
}
.titlecont {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
}
.titles {
  font-size: 22px;
  margin-top: 20px;
  font-weight: 600;
  line-height: 26px;
  color: rgba(0, 0, 0, 1);
}
.cbox {
  display: flex;
  margin-bottom: 12px;
  left: 28px;
  position: relative;
}
.searchcont {
  width: 100%;
  position: relative;
  height: 54px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
}
.searchbtn {
  width: 319px;
  position: absolute;
  right: 0;
  top: 6px;
}
.formWidth {
  width: 860px;
}
</style>
