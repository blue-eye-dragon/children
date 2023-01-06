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
                              fieldDecoratorId="name"
                              class="spilwid"
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
                    <ta-select-option value="">全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="寄养次数"
                              class="spilwid"
                              fieldDecoratorId="fosterFrequency"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择寄养次数">
                    <ta-select-option value="">全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in fosteringtimesList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="首次寄养日期"
                              class="spilwid3"
                              fieldDecoratorId="firstFoster"
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
          <ta-button type="primary"
                     icon="plus"
                     @click="modelshow">新增</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="relationStatus"
                slot-scope="a, b, c">
            <span v-if='a==1'
                  class="com_tobesubmitted">{{ '待寄养' }}</span>
            <span v-if='a==2'
                  class="com_inaudit">{{ '融合中' }}</span>
            <span v-if='a==3'
                  class="com_inaudit">{{ '寄养中' }}</span>
            <span v-if='a==4'
                  class="com_adopt">{{ '融合结束' }}</span>
            <span v-if='a==5'
                  class="com_reject">{{ '已解除' }}</span>

          </span>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <span @click="addAdoption(e,obj,index,1)"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="确定要删除这条数据吗?"
                           @confirm="dels(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <span @click="addAdoption(e,obj,index,2)"
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
    <ta-modal title="新增寄养儿童"
              v-model="visible"
              width="90%"
              :footer="null">
      <ChoiceChildren :tableColumns="chlidtableColumns"
                      v-if="visible"
                      :ishide="false"
                      @addsure="addsure"
                      ref="mychild"
                      url="/fosterChildrenInfo/getEnterYardAndPassTheAuditlist"></ChoiceChildren>
    </ta-modal>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import ChoiceChildren from '@component/common/components/ChoiceChildren'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  // {
  //   title: '儿童编号',
  //   dataIndex: 'childNumber',
  //   width: '120px'
  // },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '12%',
    overflowTooltip: true
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '8%',
    overflowTooltip: true
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '13%',
    overflowTooltip: true
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',

    width: '12%',
    overflowTooltip: true
  },
  // {
  //   title: '患病类型',
  //   dataIndex: 'illnessType',
  //   collectionType: 'ILLNESSTYPE',
  //   width: '12%',
  //   overflowTooltip: true
  // },

  {
    title: '首次寄养日期',
    dataIndex: 'firstFosterDate',
    width: '16%',
    overflowTooltip: true
  },
  {
    title: '寄养次数',
    dataIndex: 'fosterFrequencyShow',
    collectionType: 'FOSTERINGTIMES',
    width: '12%',
    overflowTooltip: true
  },
  {
    title: '累计寄养时间',
    dataIndex: 'fosterTotal',
    width: '14%',
    overflowTooltip: true
  },
  {
    title: '寄养状态',
    dataIndex: 'fosterStatus',
    // collectionType: 'FOSTER_STATUS',
    scopedSlots: { customRender: 'relationStatus' },
    width: '12%',
    overflowTooltip: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]
const chlidtableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '儿童编号',
    dataIndex: 'childNumber'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '登记增员日期',
    dataIndex: 'registerDate'
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
  components: {
    ChoiceChildren
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      chlidtableColumns,
      page: 1,
      size: 10,
      idedit: false,
      adoptionlist: [],
      fosteringtimesList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/fosterChildrenInfo/list', // 数据列表接口，API地址
        mixDeleteURL: '/fosterChildrenInfo/updateDelStateById', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      visible: false,
      issearch: false
    }
  },
  mounted () {
    this.getchildtype()
    this.getfosteringtimes()
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    // 删除
    dels (e) {
      let _self = this
      if (e.fosterStatus != 1) {
        _self.$message.error('选中的寄养家庭中有寄养儿童，不能删除')
        return false
      }

      _self.post('/fosterChildrenInfo/updateDelStateById', {
        id: e.id + ","
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('删除成功!')
          _self.handleSubmit()
        }
      })
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 获取儿童类型
    async getchildtype () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },
    // 几样次数
    async getfosteringtimes () {
      let data = await this.getDictionaries('FOSTERINGTIMES')
      this.fosteringtimesList = data
    },
    modelshow () {
      this.visible = true
    },
    // 添加儿童
    async addsure (val) {
      let params = {
        childBaseId: val[0].childBaseId
      }
      let data = await this.post('/fosterChildrenInfo/save', params)
      if (data.errors == null) {
        this.$message.success('添加成功')
        this.handleSubmit()
        this.$refs.mychild.handleSubmit()
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    addAdoption (e, obj, index, type) {
      this.$router.push({
        path: 'fosterFrom',
        query: {
          childBaseId: obj.childBaseId,
          fosterChildId: obj.id,
          childEnterId: obj.childEnterId,
          type
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 430px;
}
</style>
