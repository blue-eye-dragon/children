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
              儿童类型：<ta-checkbox :indeterminate="indeterminate"
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
            </span>
            儿童患病类型统计表</p>
          <p class="times">享受年月：{{yeartext}}</p>
          <p class="types">儿童类型：{{typetext}}</p>
        </div>
        <div class="tableout">
          <ta-table bordered
                    :columns="tableColumns"
                    :scroll="{ x: 2760}"
                    :dataSource="tableData"></ta-table>
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
        width: 115,
        overflowTooltip: true,
        dataIndex: 'unitName',
        customRender: (text, record, index) => {
          return this.marge(text, record, index, '0', false)
        }
      },
      {
        title: '合计',
        width: 120,
        dataIndex: 'amount'
      },
      {
        title: '无疾病',
        width: 120,
        dataIndex: 'noDisease'
      },
      {
        title: '心脏病',
        width: 120,
        dataIndex: 'heartDisease'
      },
      {
        title: '脑瘫',
        width: 120,
        dataIndex: 'cerebralPalsy'
      },
      {
        title: '五官科疾病',
        width: 120,
        dataIndex: 'fiveDiseases'
      },
      {
        title: '外科疾病',
        width: 120,
        dataIndex: 'surgicalDiseases'
      },
      {
        title: '血液病',
        width: 120,
        dataIndex: 'hematopathy'
      },
      {
        title: '内分泌疾病',
        width: 120,
        dataIndex: 'endocrineDiseases'
      },
      {
        title: '精神和行为障碍',
        width: 120,
        dataIndex: 'behavioralDisorders'
      },
      {
        title: '神经系统疾病',
        width: 120,
        dataIndex: 'systemDiseases'
      },
      {
        title: '循环系统疾病',
        width: 120,
        dataIndex: 'circulatoryDiseases'
      },
      {
        title: '呼吸系统疾病',
        width: 120,
        dataIndex: 'respiratoryDiseases'
      },
      {
        title: '消化系统疾病',
        width: 120,
        dataIndex: 'digestiveDiseases'
      },
      {
        title: '皮肤病',
        width: 120,
        dataIndex: 'skinDisease'
      },
      {
        title: '肌肉骨骼病',
        width: 120,
        dataIndex: 'musculoskeletalDisease'
      },
      {
        title: '泌尿系统疾病',
        width: 120,
        dataIndex: 'urinarySystemDiseases'
      },
      {
        title: '妇科病',
        width: 120,
        dataIndex: 'gynaecopathia'
      },
      {
        title: '先天畸形',
        width: 120,
        dataIndex: 'congenitalMalformation'
      },
      {
        title: '染色体和遗传代谢疾病',
        width: 120,
        dataIndex: 'chromosomeDiseases'
      },
      {
        title: '儿童过敏性紫癜',
        width: 120,
        dataIndex: 'purpura'
      },
      {
        title: '慢性肾功能衰竭尿毒症期',
        width: 120,
        dataIndex: 'uremicPhase'
      },
      {
        title: '多重疾病',
        width: 120,
        dataIndex: 'multipleAmount'
      },
      {
        title: '其他',
        width: 120,
        dataIndex: 'otherDiseases'
      }
    ]
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/welfareAssistanceApi/pageIllChild', // 数据列表接口，API地址 /fosterFamilyAndChildRelation/list
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      ishide: true,
      value: [], // 查询条件起领年月
      mode2: ['month', 'month'],
      indeterminate: false, // 半选初始状态
      checkAll: true, // 全选初始状态
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
    this.loadData()

    if (window.parent.indexTool.getUserInfo().areaLevel == 0) {
      this.isbu = true
      this.nowcode = '110000000000'
      this.$nextTick(() => {
        this.addressmodel.push(window.parent.indexTool.getUserInfo().areaCode, '110000000000')
      })
    } else {
      this.isbu = false
      this.$nextTick(() => {
        console.log(window.parent.indexTool.getUserInfo())
        this.nowcode = window.parent.indexTool.getUserInfo().areaCode
        this.areaname = window.parent.indexTool.getUserInfo().areaName
        this.addressmodel.push(this.nowcode)
      })
    }
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
      this.exportFile('/querystatistics/exportIllChild', formData)
      this.showOn = false
    },
    handleCancel () {
      this.showOn = false
    },
    searchs () {
      if (this.value.length > 0) {
        let startDateStart = this.value[0].format('YYYY-MM')
        let startDateEnd = this.value[1].format('YYYY-MM')
        this.yeartext = startDateStart + ' ~ ' + startDateEnd
      } else {
        let nowDate = new Date()
        let nowYear = nowDate.getFullYear()
        let nowMonth = nowDate.getMonth()
        this.yeartext = '截止到 ' + nowYear + '-' + nowMonth
      }
      if (this.checkedList.length > 0) {
        this.typetext = this.getlabel()
      } else {
        this.typetext = '全部'
      }
      this.handleSubmit()
    },
    getlabel () {
      // 获取label
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
    onChange (checkedList) {
      console.log(checkedList)
      if (checkedList.length < this.plainOptions.length && checkedList.length != 0) {
        // 全选check设置为半选状态
        this.checkAll = false
        this.indeterminate = true
      } else if (checkedList.length === 0) {
        // 一个都不选，check设置为不选状态
        this.checkAll = false
        this.indeterminate = false
      } else {
        // 全选全部选中
        this.checkAll = true
        this.indeterminate = false
      }
      this.checkedList = checkedList
    },
    async handleSearch (value) {
      console.log(value)
      if (value.length > 0) {
        let params = {
          areaCode: this.nowcode,
          orgName: value
        }
        let data = await this.post('/checkChildApi/getWelfareByAreaCode', params)
        if (!data.errors) {
          this.optiondata = data.data.success
        }
      }
    },
    onCheckAllChange (e) {

    },
    adsvalchange (val) {
      console.log(val)
      this.nowcode = val[val.length - 1]
      this.searchForm.setFieldsValue({
        orgName: ''
      })
    },
    setaddress () {
      this.searchForm.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    marge (text, record, index, val, ismerge) {
      // val 行合并  ismerge是否列合并
      // 需要合并的返回合并个数，需要合并为0，合计为1，不需要合并的为1
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
          if (val != 0) {
            obj.children = '合计'
          }
        }
      }
      return obj
    },
    loadData () {
      this.addressmodel = []
      this.value = [] // 查询条件起领年月
      this.indeterminate = false // 半选初始状态
      this.checkAll = true // 全选初始状态
      this.checkedList = []
      this.getchildtype()
      let nowDate = new Date()
      let nowYear = nowDate.getFullYear()
      let nowMonth = nowDate.getMonth()
      this.yeartext = '截止到 ' + nowYear + '-' + nowMonth
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
  left: 28px;
  position: relative;
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
