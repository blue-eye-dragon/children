<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>

                <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="身份证号"
                              fieldDecoratorId="idCard"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <ta-form-item label="儿童姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>

                <ta-form-item label="儿童类别"
                              fieldDecoratorId="childType"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              v-if="notCounty">
                  <ta-select allowClear
                             placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in childTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              class="spilwid2"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="登记增员日期"
                              fieldDecoratorId="applyDay"
                              class="spilwid2"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
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
          <ta-button @click="back"
                     icon='rollback'>返回</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :customRow="fnCustomRow"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <template slot="name"
                    slot-scope="a, b">
            <a @click="childDetail(b)">{{a}}</a>
          </template>
          <template slot="birthday"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <template slot="registerDate"
                    slot-scope="a">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <div slot="action"
               slot-scope="text,obj"
               class="btnlist">
            <span class="com_textreject"
                  @click="changeApply(obj)">变更申请</span>
            <span class="com_textedit"
                  @click="directChange(obj)">直接修改</span>
          </div>
        </ta-table>

      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
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
    title: '儿童姓名',
    dataIndex: 'name',
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    align: 'center',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '15%',
    dataIndex: 'birthday',
    align: 'center',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    width: '20%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '登记增员日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '15%',
    scopedSlots: { customRender: 'registerDate' }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      issearch: false,
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childInfoApi/pageChildInfo' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值
      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      notCounty: window.parent.indexTool.getUserInfo().areaLevel != 4 // 不是乡镇用户

    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getMenuDatas()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 获取性别字典数据
      this.dieReasonList = await this.getDictionaries('DEATHREASON') // 获取死亡原因字典数据
      this.reductionTypeList = await this.getDictionaries('REDUCTIONREASON') // 获取减员原因字典数据
      this.dieDealList = await this.getDictionaries('DIEDEAL') // 获取死亡处理方式字典数据
      this.childTypeList = await this.getDictionaries(this.childTypeCode) // 获取儿童类别字典数据
    },
    // 返回变更申请记录列表
    back () {
      this.$router.push({
        name: 'changesRecord'
      })
    },
    // 点击姓名查看儿童详情
    childDetail (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: e.id }),
          operateFlag: 'look_now'
        }
      })
    },
    // 变更申请
    changeApply (obj) {
      this.post('/checkChildApi/beforeChangeCheck', {
        childEnterId: obj.id
      }).then(res => {
        if (res.serviceSuccess) {
          if (obj.startTime) {
            obj.startTime = moment(obj.startTime).format('YYYY-MM')
          }
          this.$router.push({
            name: 'changeApply',
            query: {
              obj: JSON.stringify(obj),
              isFlag: res.data.data == '1'
            }
          })
        }
      })
    },
    // 直接修改
    directChange (e) {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: e.id }),
          operateFlag: 'edit_change'
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
