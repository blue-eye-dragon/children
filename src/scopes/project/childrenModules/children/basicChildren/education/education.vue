<template>
  <div class="searchdata tadrawer">
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
                              fieldDecoratorId="name"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类别"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童类别">

                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="工学情况"
                              class="spilwid"
                              fieldDecoratorId="workStudySituation"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择工学情况">

                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in worktudyList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="性别"
                              class="spilwid"
                              fieldDecoratorId="sex"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">

                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in sexList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              class="spilwid3"
                              fieldDecoratorId="birthdayTime"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>
                <ta-form-item label="增员日期"
                              class="spilwid3"
                              fieldDecoratorId="registerDate"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>
              </div>
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
          </ta-form>

        </div>
        <div style="margin-top: 16px;"></div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <span class="com_polish"
                  @click="addAdoption(e,obj,index,1)">录入</span>
            <!-- <span @click="addAdoption(e,obj,index,0)">查看</span> -->
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination class='pagination'
                       showSizeChanger
                       showQuickJumper
                        :defaultCurrent="page"
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
    title: '儿童姓名',
    dataIndex: 'name',
    align: 'center',
    scopedSlots: { customRender: 'name' },
    width: '17%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '13%'
  },
  {
    title: '出生日期',
    align: 'center',
    dataIndex: 'birthday',
    width: '14%'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    align: 'center',
    collectionType: 'CHILDCATEGORYA',
    width: '17%'
  },
  {
    title: '增员日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '18%'
  },
  {
    title: '工学情况',
    align: 'center',
    dataIndex: 'workStudySituation',
    collectionType: 'WORKSTUDY',
    width: '15%'
  },
  {
    title: '操作',
    align: 'center',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      adoptionlist: [],
      sexList: [],
      worktudyList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childEducation/list', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      isExpand: false,
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getchildtype()
    this.getsex()
    this.getworktudy()
  },
  methods: {
    childInfo (val, obj, index) {
      const param = {
        id: obj.childEnterId
      }
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },
    // 儿童类别
    async getchildtype () {
      // 获取儿童类别字典
      const data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 工学情况 WORKSTUDY
    async getworktudy () {
      const data = await this.getDictionaries('WORKSTUDY')
      this.worktudyList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {
    },
    addAdoption (e, obj, index, type) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'educationDetail',
        params: {
          obj: str,
          type
        }
      })
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }

  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
