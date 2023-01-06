 <template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="检查项目"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="checkProject"
                              class="spilwid">
                  <ta-input placeholder="请输入检查项目" />
                </ta-form-item>
                <ta-form-item label="指标适用机构"
                              fieldDecoratorId="indexApplyOrg"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择指标适用机构">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in indexApplyOrgList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="指标状态"
                              fieldDecoratorId="delState"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择指标状态">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in delStateList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="指标库分类"
                              fieldDecoratorId="indexDbClassific"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择指标库分类">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in indexDbClassificList"
                                      :key="item.value"
                                      :value="item.value">
                      <ta-tooltip placement="topLeft">
                        <template slot='title'>
                          {{item.label}}
                        </template>
                        {{item.label}}
                      </ta-tooltip>
                    </ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="指标类型"
                              fieldDecoratorId="indexType"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择指标类型">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in indexTypeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
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
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :customRow="fnCustomRow"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="delState"
                slot-scope="a, b, c">
            <span :class="a=='1'?'com_adopt':'com_reject'">{{ a=='1'?'生效':'作废'}}</span>
          </span>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textsee"
                  @click="look(obj)">查看</span>
            <span class="com_textedit"
                  v-if="obj.delState==Enum.INDEXSTATE.SX"
                  @click="edit(obj)">编辑</span>
            <ta-popconfirm title="确定生效吗?"
                           v-if="obj.delState==Enum.INDEXSTATE.ZF"
                           @confirm="takeEffect(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textedit">生效</span>
            </ta-popconfirm>
            <!-- <ta-divider type="vertical"
                        v-if="obj.delState==Enum.INDEXSTATE.ZF" /> -->
            <ta-popconfirm title="确定作废吗?"
                           v-if="obj.delState==Enum.INDEXSTATE.SX"
                           @confirm="toVoid(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textedit">作废</span>
            </ta-popconfirm>
            <!-- <ta-divider type="vertical"
                        v-if="obj.delState==Enum.INDEXSTATE.SX" /> -->

            <!-- <ta-divider type="vertical"
                        v-if="obj.delState==Enum.INDEXSTATE.SX" /> -->

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
    title: '指标库分类',
    dataIndex: 'indexDbClassific',
    width: '20%',
    collectionType: 'INDEXDBCLASSIFIC'
  },
  {
    title: '检查项目',
    width: '20%',
    dataIndex: 'checkProject'
  },
  {
    title: '指标类型',
    dataIndex: 'indexType',
    width: '20%',
    collectionType: 'INDEXTYPE'
  },
  {
    title: '编号',
    width: '20%',
    dataIndex: 'indexNum'
  },
  {
    title: '指标适用机构',
    dataIndex: 'indexApplyOrg',
    width: '20%',
    collectionType: 'INDEXAPPLYORG'
  },
  {
    title: '当前状态',
    width: '20%',
    dataIndex: 'delState',
    scopedSlots: { customRender: 'delState' }
    // collectionType: 'INDEXSTATE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 220,
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
        mixGetDataListURL: '/specialIndexDbManage/list' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',

      indexDbClassificList: [], // 指标库分类的字典数据
      indexTypeList: [], // 指标类型的字典数据
      indexApplyOrgList: [], // 指标适用机构的字典数据
      delStateList: [] // 指标状态的字典数据

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
    getMenuDatas () {
      this.getMenu('INDEXDBCLASSIFIC', 'indexDbClassificList') // 指标库分类字典数据
      this.getMenu('INDEXTYPE', 'indexTypeList') // 指标类型字典数据
      this.getMenu('INDEXAPPLYORG', 'indexApplyOrgList') // 指标适用机构字典数据
      this.getMenu('INDEXSTATE', 'delStateList') // 指标状态字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 新增
    add () {
      this.$router.push({
        name: 'specialIndexDatabaseAdd',
        query: { flag: 'add' }
      })
    },
    // 编辑
    edit (e) {
      this.$router.push({
        name: 'specialIndexDatabaseAdd',
        query: { flag: 'edit', id: e.id }
      })
    },
    // 查看
    look (e) {
      this.$router.push({
        name: 'specialIndexDatabaseAdd',
        query: { flag: 'look', id: e.id }
      })
    },
    // 生效
    takeEffect (e) {
      this.post('/specialIndexDbManage/updateDelStateById', { id: e.id, delState: this.Enum.INDEXSTATE.SX }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已生效')
          this.handleSubmit()
        }
      })
    },
    // 作废
    toVoid (e) {
      this.post('/specialIndexDbManage/updateDelStateById', { id: e.id, delState: this.Enum.INDEXSTATE.ZF }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已作废')
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
</style>
