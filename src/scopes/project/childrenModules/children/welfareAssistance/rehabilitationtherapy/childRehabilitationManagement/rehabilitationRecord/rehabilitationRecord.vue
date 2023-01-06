<template>
  <!-- 康复档案 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="姓名"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="name">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>

                <ta-form-item label="身份证号"
                              class="spilwid4"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="idCard">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>

                <ta-form-item label="患病类型"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="illnessType">
                  <ta-select placeholder="请选择患病类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in illnesstypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="残疾类型"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="disabilityType">
                  <ta-select placeholder="请选择残疾类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in disabilitytypeList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="性别"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="sex">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in  sexList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label=" 出生日期"
                              class="spilwid3"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="birthday">
                  <ta-range-picker format="YYYY-MM-DD" />
                </ta-form-item>
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
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
        <div style="margin-top:16px;"></div>
        <!-- <div style="height: 50px;margin-top:15px;">
          <ta-button class="exportbtn"
                     icon='upload'
                     @click="showModal">导出</ta-button>
          <ta-modal :centered="false"
                    style="top: 25%; "
                    :visible="showOn"
                    @ok="Excel"
                    @cancel="handleCancel">
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div> -->
        <ta-table class="table table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="illnessType"
                slot-scope="a, b, c">
            <span>{{ b.illnessType|doillnessType }}</span>
          </span>
          <div slot="disabilityType"
               slot-scope="a, b, c">
            <span>{{ b.disabilityType|dodisabilityType }}</span>
          </div>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj,index)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
        <!--  -->
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
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
import AddressComponent from '@component/common/components/addressComponent'
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
    title: '姓名',
    width: '15%',
    dataIndex: 'name'
  },
  {
    title: '性别',
    width: '12%',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '13%',
    align: 'center',
    dataIndex: 'birthday'
  },
  // {
  //   title: '身份证号',
  //   width: '17%',
  //   dataIndex: 'idCard'
  // },
  {
    title: '患病类型',
    width: '18%',
    dataIndex: 'illnessType',
    scopedSlots: { customRender: 'illnessType' }
  },
  {
    title: '残疾类型',
    width: '18%',
    dataIndex: 'disabilityType',
    scopedSlots: { customRender: 'disabilityType' }
  },
  {
    title: '来源',
    width: '16%',
    dataIndex: 'sourceName'
  },
  {
    title: '康复疗程次数',
    width: '15%',
    align: 'center',
    dataIndex: 'rehabilitNum'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    overflowTooltip: false,
    scopedSlots: { customRender: 'action' }
  }
]
var that = null
export default {
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      showOn: false,
      page: 1,
      size: 10,
      idedit: false,
      childtypelist: [],
      baseTypeList: [],
      sexList: [],
      worktudyList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/rehabilitManage/rehabilitationFiles', // 数据列表接口，API地址
        mixEditURL: '/rehabilitationBase/update', // 编辑接口
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,
      ed: false,
      addressmodel: [],
      sfList: [],
      illnesstypeList: [],
      disabilitytypeList: [],
      comeList: [], // 来源list
      nowkey: '',
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getsex()
    this.getillnesstypeList()
    this.getdisabilitytypeList()
  },
  created () {
    that = this
  },
  filters: {
    dodisabilityType (val) {
      let list = that.disabilitytypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    doillnessType (val) {
      let list = that.illnesstypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
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
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    handleSubmit () {
      // 生成选择下拉条件
      let ref = this.mixPageRef
      let point = ''
      this.$refs[ref].loadData(
        data => {
          let listData = data.data.pageBean.list
          listData.forEach((item, index) => {
            if (item.baseCode) {
              item.orgnizationName = '本院'
            }
          })
          listData.forEach((item, index) => {
            let flag = this.comeList.some(e => {
              if (item.orgnizationName === e.orgnizationName) {
                return true
              }
            })
            if (!flag) {
              this.comeList.push(item)
            }
          })
        },
        err => {
          console.log(err)
        }
      )
    },

    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },

    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },

    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },

    see (val, obj, index) {
      this.$router.push({
        path: 'rehabilitationRecordSee',
        query: {
          ids: obj.childNumber,
          childId: obj.id
        }
      })
    },
    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/exportRehabilitationFilesList', data)
      this.showOn = false
    },
    showModal () {
      let ss = this.searchForm.getFieldsValue()
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
.spilwid4 {
  width: 350px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
