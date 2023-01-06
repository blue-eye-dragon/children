<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer: '80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="男方姓名"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="manName"
                              class="spilwid">
                  <ta-input placeholder="请输入男方姓名" />
                </ta-form-item>
                <ta-form-item label="女方姓名"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="womanName"
                              class="spilwid">
                  <ta-input placeholder="请输入女方姓名" />
                </ta-form-item>
                <ta-form-item label="男方身份证号"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="manIdCard"
                              class="spilwid">
                  <ta-input placeholder="请输入男方身份证号" />
                </ta-form-item>
                <ta-form-item label="女方身份证号"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="womanIdCard"
                              class="spilwid">
                  <ta-input placeholder="请输入女方身份证号" />
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
          <ta-button @click="returns"
                     icon="rollback">返回</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="number"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="rearDateStart"
                slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <span slot="rearDateEnd"
                slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee btnleft"
                  @click="look(obj)">查看</span>
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
                       :ref="mixPageRef" />

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
    dataIndex: 'number',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'number' }
  },
  {
    title: '儿童编号',
    dataIndex: 'num',
    width: '15%'

  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '15%',
    scopedSlots: { customRender: 'name' }

  },
  {
    title: '身份证号',
    width: '15%',
    dataIndex: 'idCard'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    collectionType: 'sex'
  },
  {
    title: '男方姓名',
    dataIndex: 'manName',
    width: '20%'
  },
  {
    title: '男方身份证号',
    width: '20%',
    dataIndex: 'manidCard'
  },
  {
    title: '女方姓名',
    dataIndex: 'womanName',
    width: '20%'
  },
  {
    title: '女方身份证号',
    width: '20%',
    dataIndex: 'womanidCard'
  },
  {
    title: '养育开始日期',
    dataIndex: 'rearDateStart',
    width: '20%',
    scopedSlots: { customRender: 'rearDateStart' }
  },
  {
    title: '养育结束日期',
    width: '20%',
    dataIndex: 'rearDateEnd',
    scopedSlots: { customRender: 'rearDateEnd' }
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
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/familyLikeRear/getChildRearList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      issearch: false,
      childId: '' // 编辑、查看时的儿童id
    }
  },
  activated () {
    this.childId = this.$route.query.childId
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    // 高级查询
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'addFamilyParenting',
        query: { flag: 'look_list', familyId: e.familyId }
      })
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.childId = this.childId
      this.changetime(formData)
      return formData
    },
    // 返回
    returns () {
      this.$router.go(-1)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }

}
</script>