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

                <ta-form-item label="男方姓名"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="manName"
                              class="spilwid">
                  <ta-input placeholder="请输入男方姓名" />
                </ta-form-item>

                <ta-form-item label="男方身份证号"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="manIdCard"
                              class="spilwid3">
                  <ta-input placeholder="请输入男方身份证号" />
                </ta-form-item>
                <ta-form-item label="女方姓名"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="womanName"
                              class="spilwid">
                  <ta-input placeholder="请输入女方姓名" />
                </ta-form-item>
                <ta-form-item label="女方身份证号"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="womanIdCard"
                              class="spilwid3">
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

        <div style="height: 50px;margin-top: 10px;">
          <ta-button type="primary"
                     class="addbtn"
                     icon='plus'
                     @click="add">新增</ta-button>
        </div>

        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textedit"
                  @click="edit(obj)">编辑</span>
            <span class="com_textsee "
                  @click="look(obj)">查看</span>
            <ta-popconfirm :title="obj.rearNum!=0?'现养育儿童数量非0，禁止删除！':'确定要删除吗?'"
                           @confirm="obj.rearNum==0?deletes(obj):''"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel ">删除</span>
            </ta-popconfirm>

          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
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
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '男方姓名',
    dataIndex: 'manName',
    width: '20%'
  },
  {
    title: '男方身份证号',
    width: '20%',
    dataIndex: 'manIdCard'
  },
  {
    title: '女方姓名',
    dataIndex: 'womanName',
    width: '20%'
  },
  {
    title: '女方身份证号',
    width: '20%',
    dataIndex: 'womanIdCard'
  },
  {
    title: '家庭年收入(元)',
    dataIndex: 'income',
    width: '20%'
  },
  {
    title: '现养育儿童数量',
    width: '20%',
    align: 'center',
    dataIndex: 'rearNum'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      issearch: false,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/familyLikeRear/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager'
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {

  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 新增
    add () {
      this.$router.push({
        name: 'addFamilyParenting',
        query: { flag: 'add' }
      })
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'addFamilyParenting',
        query: { flag: 'edit', familyId: e.familyId }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'addFamilyParenting',
        query: { flag: 'look', familyId: e.familyId }
      })
    },
    // 删除
    deletes (e) {
      this.post('/familyLikeRear/updateDelStateById', { id: e.familyId }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('数据删除成功！')
          this.handleSubmit()
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
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.addbtn {
  margin-right: 15px;
}
.spilwid3 {
  width: 350px;
}
</style>
