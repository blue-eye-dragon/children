<template>
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
                              class='spilwid'
                              fieldDecoratorId="childName"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类别"
                              class='spilwid'
                              fieldDecoratorId="childType"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              class='spilwid4'
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="性别"
                              class='spilwid'
                              fieldDecoratorId="childSex"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in sexlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              class='spilwid3'
                              fieldDecoratorId="birthday"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
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
        <div class="operateBtn">
          <ta-button class="exportbtn"
                     icon='upload'
                     @click='exportFileList'>导出</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  :showOverflowTooltip="true">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="continueprocessing(obj)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
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
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
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
    width: '17%',
    dataIndex: 'childName'
  },
  // {
  //   title: '身份证号',
  //   width: '17%',
  //   dataIndex: 'childIdCard'
  // },
  {
    title: '性别',
    dataIndex: 'childSex',
    width: '12%',
    align: 'center',
    collectionType: 'sex'

  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '17%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '出生日期',
    align: 'center',
    width: '12%',
    dataIndex: 'birthday'
  },
  {
    title: '收养人姓名',
    width: '17%',
    dataIndex: 'adoptorName'
  },
  {
    title: '收养登记日期',
    align: 'center',
    width: '12%',
    dataIndex: 'registerDate'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      issearch: false,
      tableData: [],
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/adoption/adoptionRecordList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      adoptionlist: [],
      sexlist: []
    }
  },
  mounted () {
    this.getchildtype()
    this.getsex()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 导出
    async exportFileList () {
      var data = this.userPageParams()
      this.exportFile('/adoption/export', data)
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.orgType = window.parent.indexTool.getUserInfo().orgType
      this.changetime(formData)
      return formData
    },
    // 业务类别 ADOPTIONBIZTYPE
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexlist = data
    },
    async getchildtype () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.adoptionlist = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    continueprocessing (val) {
      this.$router.push({
        name: 'registration', // 收养登记
        query: {
          id: val.registrationAdoptionId,
          handleType: 0,
          additionalYesOrNo: '0'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 450px;
}
.spilwid4 {
  width: 350px;
}
.searchdata {
  height: 100%;
}
.numwid {
  width: 118px;
}
.textnum {
  width: 600px;
  display: inline-block;
}
.textnum .spilwid {
  width: 300px;
}
.textnum .numwid {
  width: 200px;
}
.numwidwid {
  width: 210px;
}
.line {
  line-height: 40px;
  margin: 0 5px;
}
</style>
