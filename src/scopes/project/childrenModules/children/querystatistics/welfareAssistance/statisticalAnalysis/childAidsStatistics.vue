<template>
  <div class="searchdata tadrawer"
       id='searchdata'>
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
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
                       msg="区域"
                       :addressmodel="addressmodel"
                       @adsvalchange="adsvalchange"
                       @setaddress="setaddress"></AreaQuery>
            <ta-form-item class="spilwid"
                          label="单位名称"
                          fieldDecoratorId="orgName"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-auto-complete :dataSource="optiondata"
                                @search="handleSearch"
                                placeholder="请输入单位名称" />
            </ta-form-item>
            <ta-form-item class="spilwid"
                          label="享受年月"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}">
              <ta-range-picker :placeholder="['开始年月', '结束年月']"
                               format="YYYY-MM"
                               :value="value"
                               :mode="mode2"
                               @change="datechange"
                               @panelChange="handlePanelChange2" />
            </ta-form-item>
            <div class="cbox">
              <ta-checkbox :indeterminate="indeterminate"
                           @change="onCheckAllChange"
                           :checked="checkAll">全部</ta-checkbox>
              <ta-checkbox-group :options="plainOptions"
                                 @change="onChange"
                                 :value="checkedList" />
            </div>

          </ta-form>
          <div class="searchbtn">
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="searchs">查询</ta-button>
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
        <!-- <ta-button class="btnleft exportbtn"
                   icon="upload"
                   style="float: right;"
                   @click="exports">导出</ta-button> -->
        <div class="titlecont">
          <p class="titles">
            <span v-if="areaname!=''">
              {{areaname}}-
            </span>艾滋儿童情况统计表</p>
          <p class="times">享受年月：{{yeartext}}</p>
          <p class="types">儿童类型：{{typetext}}</p>
        </div>
        <div class="tableout">
          <ta-table :columns="tableColumns"
                    :scroll="{ x:1500 }"
                    :dataSource="tableData"

                    bordered></ta-table>
        </div>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
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
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
export default {
  mixins: [listMixin],
  components: {
    AreaQuery,
    AddressComponent
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
          return this.marge(text, record, index, '3', true)
        }
      },
      {
        title: '区域',
        dataIndex: 'areaName',
        width: 120,
        fixed: 'left',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', true)
        }
      },
      {
        title: '单位名称',
        fixed: 'left',
        width: 130,
        overflowTooltip: true,
        dataIndex: 'unitName',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', false)
        }
      },
      {
        title: '合计',
        width: 110,
        align: 'center',
        dataIndex: 'amount'
      },
      {
        title: '受艾滋病影响',
        children: [
          {
            title: '小计',
            width: 100,
            dataIndex: 'affectAmount'
          },
          {
            title: '0-3岁',
            width: 100,
            dataIndex: 'affectZeroThree'
          },
          {
            title: '4-6岁',
            width: 100,
            dataIndex: 'affectFourSix'
          },
          {
            title: '7-13岁',
            width: 100,
            dataIndex: 'affectSevenThirteen'
          },
          {
            title: '14-18岁',
            width: 100,
            dataIndex: 'affectFourteenEighteen'
          },
          {
            title: '18岁以上',
            width: 100,
            dataIndex: 'affectEighteenOver'
          }
        ]
      },
      {
        title: '携带或感染艾滋病',
        children: [
          {
            title: '小计',
            width: 100,
            dataIndex: 'carryAmount'
          },
          {
            title: '0-3岁',
            width: 100,
            dataIndex: 'carryZeroThree'
          },
          {
            title: '4-6岁',
            width: 100,
            dataIndex: 'carryFourSix'
          },
          {
            title: '7-13岁',
            width: 100,
            dataIndex: 'carrySevenThirteen'
          },
          {
            title: '14-18岁',
            width: 100,
            dataIndex: 'carryFourteenEighteen'
          },
          {
            title: '18岁以上',
            width: 100,
            dataIndex: 'carryEighteenOver'
          }
        ]
      },
      {
        title: '其他',
        children: [
          {
            title: '小计',
            width: 100,
            dataIndex: 'otherAmount'
          },
          {
            title: '0-3岁',
            width: 100,
            dataIndex: 'otherZeroThree'
          },
          {
            title: '4-6岁',
            width: 100,
            dataIndex: 'otherFourSix'
          },
          {
            title: '7-13岁',
            width: 100,
            dataIndex: 'otherSevenThirteen'
          },
          {
            title: '14-18岁',
            width: 100,
            dataIndex: 'otherFourteenEighteen'
          },
          {
            title: '18岁以上',
            width: 100,
            dataIndex: 'otherEighteenOver'
          }
        ]
      }
    ]
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/welfareAssistanceApi/pageAdisChild', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      indeterminate: false, // 半选初始状态
      checkAll: false, // 全选初始状态
      plainOptions: [], // checkboxgroup数据
      checkedList: [],
      yeartext: '',
      typetext: '全部',
      addressmodel: [],
      isbu: false,
      optiondata: [],
      nowcode: '',
      areaname: '',
      showOn: false,
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch)
    console.log(window.parent.indexTool.getUserInfo())

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
    this.loadData()
  },
  mounted () {
    // this.getchildtype()
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
    exports () {
      this.showOn = true
    },
    Excel () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      formData.childTypes = this.checkedList
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      if (this.value.length > 0) {
        formData.startDateStart = this.value[0].format('YYYY-MM')
        formData.startDateEnd = this.value[1].format('YYYY-MM')
      }
      this.exportFile('/querystatistics/exportAdisChild', formData)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    adsvalchange (val) {
      console.log('chans')
      console.log(val)
      this.nowcode = val[val.length - 1]
      this.searchForm.setFieldsValue({
        orgName: ''
      })
    },
    async handleSearch (value) {
      if (value.length > 0) {
        let params = {
          areaCode: this.nowcode,
          orgName: value
        }
        let data = await this.post(
          '/checkChildApi/getWelfareByAreaCode',
          params
        )
        console.log(data)
        if (!data.errors) {
          this.optiondata = data.data.success
        }
      }
    },
    // 根据输入项进行筛选
    filterOption (input, option) {
      console.log(option)
      // 对下拉框中的属性值的value值转成小写之后进行筛选z
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    loadData () {
      this.addressmodel = []
      this.value = [] // 查询条件起领年月
      this.indeterminate = false // 半选初始状态
      this.checkAll = true // 全选初始状态
      this.checkedList = []
      this.getchildtype();
      this.typetext = '全部'
      let nowDate = new Date()
      let nowyear = nowDate.getFullYear()
      let nowmonth = nowDate.getMonth() // 取上一個月的
      this.yeartext = '截止到 ' + nowyear + '-' + nowmonth
    },
    searchs () {
      console.log(this.value)
      if (this.value.length > 0) {
        let startDateStart = this.value[0].format('YYYY-MM')
        let startDateEnd = this.value[1].format('YYYY-MM')
        this.yeartext = startDateStart + ' ~ ' + startDateEnd
      } else {
        let nowDate = new Date()
        let nowyear = nowDate.getFullYear()
        let nowmonth = nowDate.getMonth() // 取上一個月的
        this.yeartext = '截止到 ' + nowyear + '-' + nowmonth
      }
      if (this.checkedList.length > 0) {
        this.typetext = this.getlabel()
      } else {
        this.typetext = '全部'
      }
      this.handleSubmit()
    },
    // 获取儿童类型
    async getchildtype () {
      this.checkedList = []
      const nodeType = window.parent.indexTool.getUserInfo().orgType
      let data = []
      if (nodeType == '99') {
        data = await this.getDictionaries('CHILDCATEGORYF')
      } else {
        data = await this.getDictionaries('CHILDCATEGORYA')
      }
      this.plainOptions = data
      this.plainOptions.map((item) => {
        this.checkedList.push(item.value);
      });
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
    marge (text, record, index, val, ismerge) {
      // val 行合并 ismerge是否列合并
      // 需要合并的返回合并个数下面需要合并的为0 本身不需要合并为1 合计为1
      let obj = {
        children: text,
        attrs: {}
      }
      if (ismerge) {
        obj.attrs.rowSpan = record.mergeNum
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
    userPageParams () {
      let _self = this
      let formData = _self.searchForm.getFieldsValue()
      formData.childTypes = this.checkedList
      // formData.childTypes = this.checkedList.join(',')
      if (formData.address_Linkage) {
        formData.areaCode =
          formData.address_Linkage[formData.address_Linkage.length - 1]
        delete formData.address_Linkage
      }
      if (this.value.length > 0) {
        formData.startDateStart = this.value[0].format('YYYY-MM')
        formData.startDateEnd = this.value[1].format('YYYY-MM')
      }
      return formData
    },
    resetFrom () {
      this.value = []
      this.checkedList = []
      this.checkAll = false
      this.indeterminate = false
      this.searchForm.resetFields()
      this.searchs()
    },
    datechange (value) {
      console.log('chansqqq')
      console.log(value)
      if (value.length == 0) {
        this.value = []
      }
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
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
  width: 2300px;
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
.times {
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  margin: 15px 0;
}
.types {
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
}
.cbox {
  display: flex;
  margin-bottom: 12px;
    position: relative;
      left: 28px;
        width: 137%;
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
