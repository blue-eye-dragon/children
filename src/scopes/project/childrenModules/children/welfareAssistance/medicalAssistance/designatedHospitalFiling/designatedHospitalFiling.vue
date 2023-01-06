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
                <!-- <ta-form-item label="所在省份"
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
                </ta-form-item> -->
                <ta-form-item label="定点医院名称"
                              fieldDecoratorId="hospitalName"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入定点医院名称" />
                </ta-form-item>
                <ta-form-item label="医院等级"
                              fieldDecoratorId="hospitalGrade"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择医院等级">
                    <ta-select-option key="all"
                                      value>全部</ta-select-option>
                    <ta-select-option v-for="item in hospitalGradeList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="医院分类"
                              fieldDecoratorId="hospitalCategory"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择医院分类">
                    <ta-select-option key="all"
                                      value>全部</ta-select-option>
                    <ta-select-option v-for="item in hospitalCategoryList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="医院性质"
                              fieldDecoratorId="hospitalNature"
                              class="spilwid"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择医院性质">
                    <ta-select-option key="all"
                                      value>全部</ta-select-option>
                    <ta-select-option v-for="item in hospitalNatureList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <!-- <ta-form-item label="备案日期"
                              fieldDecoratorId="createDate"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item> -->
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
                     icon="close"
                     v-else
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
               slot-scope="text,obj"
               class="btnlist">
            <span @click="update(obj)"
                  class="com_textedit"
                  v-if="isshow&&obj.isCanEdit=='1'">修改</span>
            <span @click="detail(obj)"
                  class="com_textsee">查看</span>
            <ta-popconfirm title="确定删除吗?"
                           v-if="isshow&&obj.isCanEdit=='1'"
                           @confirm="deletes(obj)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
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
    title: '所在省份',
    dataIndex: 'hospitalAddrProvinceName',
    width: '14%'
  },
  {
    title: '定点医院名称',
    dataIndex: 'hospitalName',
    width: '18%'
  },
  {
    title: '医院性质',
    dataIndex: 'hospitalNature',
    collectionType: 'HOSPITAL_NATURE',
    width: '14%'
  },
  {
    title: '医院分类',
    dataIndex: 'hospitalCategory',
    collectionType: 'HOSPITAL_CATEGORY',
    width: '14%'
  },
  {
    title: '医院等级',
    dataIndex: 'hospitalGrade',
    collectionType: 'HOSPITAL_GRADE',
    width: '14%'
  },
  {
    title: '相关联系人',
    dataIndex: 'relevantContacts',
    width: '18%'
  },
  {
    title: '联系电话',
    dataIndex: 'contactNumber',
    width: '20%'
  },
  {
    title: '操作',
    dataIndex: 'action',
    overflowTooltip: false,
    width: 200,
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
        mixGetDataListURL: '/designatedHospital/list' // 数据列表接口，API地址
      },
      // 默认属性
      mixDataList: [], // 数据列表
      // f分页组件属性
      mixPageRef: 'gridPager', // 用于获取分页ref值

      addressmodel: [],
      ishide: false,

      // hospitalAddrProvinceList: [], // 所在省份
      hospitalGradeList: [], // 医院等级
      hospitalCategoryList: [], // 医院分类
      hospitalNatureList: [], // 医院性质
      isshow: window.parent.indexTool.getUserInfo().areaLevel <= 2,
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.initdatas()
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },

    // 初始化数据
    initdatas () {
      // this.getProvince()
      this.getMenu('HOSPITAL_GRADE', 'hospitalGradeList') // 获取医院等级字典数据
      this.getMenu('HOSPITAL_CATEGORY', 'hospitalCategoryList') // 获取医院分类数据字典
      this.getMenu('HOSPITAL_NATURE', 'hospitalNatureList') // 获取医院性质字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
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
    // getProvince () {
    //   let _self = this
    //   _self.post('/zoning/queryStatistics', { parentId: null }).then(res => {
    //     if (res.serviceSuccess) {
    //       _self.hospitalAddrProvinceList = res.data.data
    //     }
    //   })
    // },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      this.changetime(formData)
      return formData
    },
    // 新增
    add () {
      this.$router.push({
        name: 'designatedHospitalFilingAdd',
        query: {
          flag: 'add'
        }
      })
    },
    // 修改
    update (e) {
      this.$router.push({
        name: 'designatedHospitalFilingAdd',
        query: {
          flag: 'update',
          id: e.id
        }
      })
    },
    // 详情
    detail (e) {
      this.$router.push({
        name: 'designatedHospitalFilingAdd',
        query: {
          flag: 'detail',
          id: e.id
        }
      })
    },
    // 删除
    deletes (e) {
      this.post('designatedHospital/updateDelStateById', { id: e.id }).then((res) => {
        if (res.serviceSuccess) {
          this.$message.success('该数据已删除')
          this.handleSubmit('search')
        }
      })
    }
  }
}
</script>
