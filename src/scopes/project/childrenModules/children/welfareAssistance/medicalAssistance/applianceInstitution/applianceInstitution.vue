<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="所在省份"
                          fieldDecoratorId="hospitalAddrProvince"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select allowClear
                         placeholder="请选择所在省份">
                <ta-select-option key="all"
                                  value>全部</ta-select-option>
                <ta-select-option v-for="item in hospitalAddrProvinceList"
                                  :key="item.areaid"
                                  :value="item.areaid">{{item.areaname}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item label="机构名称"
                          fieldDecoratorId="hospitalName"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入机构名称" />
            </ta-form-item>
            <!--<ta-form-item label="机构等级"-->
            <!--fieldDecoratorId="hospitalGrade"-->
            <!--class="spilwid"-->
            <!--:labelCol="{span:6}"-->
            <!--:wrapperCol="{span:18}">-->
            <!--<ta-select allowClear-->
            <!--placeholder="请选择机构等级">-->
            <!--<ta-select-option key="all"-->
            <!--value>全部</ta-select-option>-->
            <!--<ta-select-option v-for="item in hospitalGradeList"-->
            <!--:key="item.value"-->
            <!--:value="item.value">{{item.label}}</ta-select-option>-->
            <!--</ta-select>-->
            <!--</ta-form-item>-->
            <!--<ta-form-item label="机构分类"-->
            <!--fieldDecoratorId="hospitalCategory"-->
            <!--class="spilwids"-->
            <!--:labelCol="{span:8}"-->
            <!--:wrapperCol="{span:16}">-->
            <!--<ta-select allowClear-->
            <!--placeholder="请选择机构分类">-->
            <!--<ta-select-option key="all"-->
            <!--value>全部</ta-select-option>-->
            <!--<ta-select-option v-for="item in hospitalCategoryList"-->
            <!--:key="item.value"-->
            <!--:value="item.value">{{item.label}}</ta-select-option>-->
            <!--</ta-select>-->
            <!--</ta-form-item>-->
            <!--<ta-form-item label="机构性质"-->
            <!--fieldDecoratorId="hospitalNature"-->
            <!--class="spilwids"-->
            <!--:labelCol="{span:8}"-->
            <!--:wrapperCol="{span:16}">-->
            <!--<ta-select allowClear-->
            <!--placeholder="请选择机构性质">-->
            <!--<ta-select-option key="all"-->
            <!--value>全部</ta-select-option>-->
            <!--<ta-select-option v-for="item in hospitalNatureList"-->
            <!--:key="item.value"-->
            <!--:value="item.value">{{item.label}}</ta-select-option>-->
            <!--</ta-select>-->
            <!--</ta-form-item>-->
            <!-- <ta-form-item label="备案日期"
                          fieldDecoratorId="createDate"
                          class="spilwid3"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker />
            </ta-form-item> -->
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>

              </div>
            </ta-form-item>
          </ta-form>
        </div>
        <div class="operateBtn"
             v-if='isshow'>
          <ta-button type="primary"
                     icon="plus"
                     @click="add">新增</ta-button>
          <!-- <ta-button type="danger"
                     class="btnleft"
                     v-if="chose_data.length>0">
            <ta-popconfirm title="确定删除选择的数据吗？"
                           okText="删除"
                           okType="danger"
                           @confirm="deletes">
              <div>删除</div>
            </ta-popconfirm>
          </ta-button>
          <ta-button type="danger"
                     class="btnleft"
                     v-else
                     icon="close"
                     @click="deletes">删除 </ta-button> -->
        </div>
        <div v-else
             style="margin-bottom: 16px;"></div>
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
            <span @click="update(obj)"
                  class="com_textedit"
                  v-if='isshow'>修改</span>
            <span @click="detail(obj)"
                  class="com_textsee">查看</span>
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
    title: '所在省份',
    dataIndex: 'hospitalAddrProvinceName',
    width: '33%'
  },
  {
    title: '机构名称',
    dataIndex: 'hospitalName',
    width: '33%'
  },
  {
    title: '联系电话',
    dataIndex: 'contactNumber',
    width: '34%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
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
        mixGetDataListURL: '/applianceInstitution/list' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      addressmodel: [],
      ishide: false,

      hospitalAddrProvinceList: [], // 所在省份
      hospitalGradeList: [], // 机构等级
      hospitalCategoryList: [], // 机构分类
      hospitalNatureList: [], // 机构性质
      isshow: false,
    }
  },
  activated () {
    this.isshow = window.parent.indexTool.getUserInfo().areaLevel <= 1
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    // 初始化数据
    initdatas () {
      this.getProvince()
      this.getMenu('HOSPITAL_GRADE', 'hospitalGradeList') // 获取机构等级字典数据
      this.getMenu('HOSPITAL_CATEGORY', 'hospitalCategoryList') // 获取机构分类数据字典
      this.getMenu('HOSPITAL_NATURE', 'hospitalNatureList') // 获取机构性质字典数据
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
    // 获取所在省份下拉框数据
    getProvince () {
      let _self = this
      _self.post('/zoning/queryStatistics', { parentId: null }).then(res => {
        if (res.serviceSuccess) {
          _self.hospitalAddrProvinceList = res.data.data
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      return formData
    },
    // 新增
    add () {
      this.$router.push({
        name: 'applianceInstitutionAdd',
        query: {
          flag: 'add'
        }
      })
    },
    // 修改
    update (e) {
      this.$router.push({
        name: 'applianceInstitutionAdd',
        query: {
          flag: 'update',
          id: e.id
        }
      })
    },
    // 详情
    detail (e) {
      this.$router.push({
        name: 'applianceInstitutionAdd',
        query: {
          flag: 'detail',
          id: e.id
        }
      })
    },
    // 删除
    deletes (e) {
      if (this.chose_data.length > 0) {
        let idstr = this.chose_data.map(item => item.id).join(',')
        this.post('/applianceInstitution/updateDelStateById', { id: idstr }).then((res) => {
          if (res.serviceSuccess) {
            this.$message.success('数据删除成功！')
            this.handleSubmit()
          }
        })
      } else {
        this.$message.warn('请选择要删除的数据！')
      }
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>

