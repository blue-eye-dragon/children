<template>
  <!-- 待收养寻亲信息发布管理 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="儿童姓名"
                        class="spilwid2"
                        fieldDecoratorId="name"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入姓名" />
          </ta-form-item>

          <ta-form-item label="儿童情况"
                        class="spilwid2"
                        fieldDecoratorId="childSituation"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-select placeholder="请选择儿童情况">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="(item,index) in childSituationList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="性别"
                        class="spilwid2"
                        fieldDecoratorId="sex"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-select placeholder="请选择性别">
              <ta-select-option value>全部</ta-select-option>
              <ta-select-option v-for="(item,index) in sexList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>

          <ta-form-item label="身份证号"
                        class="spilwid2"
                        fieldDecoratorId="idCard"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item>

          <ta-form-item label="登记（增员）日期"
                        class="spilwid2"
                        fieldDecoratorId="applyDay"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-range-picker @change="onSelectTime" />
          </ta-form-item>
          <ta-form-item label="所属机构"
                        class="spilwid2"
                        fieldDecoratorId="areaname"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入所属机构" />
          </ta-form-item>
          <template>
            <ta-button type="primary"
                       @click="handleSubmit('search')">查询</ta-button>
            <ta-button class="btnleft"
                       @click="resetFrom">重置</ta-button>

            <!-- <ta-button type="primary" class="btnleft">导出</ta-button> -->
          </template>

          <div class="visitbtn">
            <ta-button type="primary"
                       @click="newOne">新增</ta-button>
          </div>
        </ta-form>
        <div class="visitbtn">
          <ta-radio-group :value="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="0">未发布</ta-radio-button>
            <ta-radio-button value="1">已发布</ta-radio-button>
            <ta-radio-button value="2">已撤销</ta-radio-button>
            <ta-radio-button value=" ">全部</ta-radio-button>
          </ta-radio-group>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :rowSelection="rowSelection">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="birthday"
                slot-scope="text,obj,index">{{ text != null ? text.substring(0, 10) : ''}}</span>
          <span slot="childSituation"
                slot-scope="text,obj,index">{{ text |childSituation}}</span>

          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span v-if="obj.releaseYOrN==1"
                  @click="doAction(val,obj,1)"
                  class="com_publish">发布</span>
            <span v-if="obj.releaseState==1"
                  @click="doAction(val,obj,2)"
                  class="com_revocation">撤销</span>
            <span v-if="obj.releaseState&&obj.releaseState!=0"
                  @click="doAction(val,obj,3)"
                  class="com_textsee">查看</span>
          </div>
        </ta-table>
        <ta-pagination class='pagination'
                       :defaultCurrent="page"
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
              width="1200px"
              :footer="null">
      <adoptionReleaseManagement @handleSubmit="handleSubmit()"
                                 v-if="visible"
                                 :ishide="false"></adoptionReleaseManagement>
    </ta-modal>
  </div>
</template>
<script>
import adoptionReleaseManagement from './adoptionReleaseManagement'
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
    width: '18%',
    dataIndex: 'name'
  },
  {
    title: '出生日期',
    width: '17%',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '性别',
    width: '16%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '儿童情况',
    width: '18%',
    dataIndex: 'childSituation',
    scopedSlots: { customRender: 'childSituation' }
  },

  {
    title: '所属机构',
    width: '17%',
    dataIndex: 'areaname'
  },

  {
    title: '发布状态',
    width: '17%',
    dataIndex: 'releaseState',
    collectionType: 'RELAESESTATE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  components: {
    adoptionReleaseManagement
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,

      nowkey: ' ',
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      childidentitytypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childSeekingToBeAdopted/list' // 数据列表接口，API地址
      },
      // isdisabled: true,
      chosedata: [],
      visible: false,
      sexList: [],
      childSituationList: [],
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      fileldName: 'address_Linkage',
      types: '1',
      ishide: false
    }
  },
  mounted () {
    this.getsexList()
    this.getchildSituationList()
  },
  created () {
    that = this
  },
  filters: {
    childSituation (val) {
      let showData = ''
      const list = that.childSituationList
      const valList = val.split(',')
      valList.forEach(e => {
        list.forEach(b => {
          if (e == b.value) {
            showData += b.label + ','
          }
        })
      })

      return showData.substr(0, showData.length - 1)
    }
  },
  activated () { },
  methods: {
    newOne () {
      this.visible = true
    },
    doAction (val, obj, type) {
      // 操作
      if (type == 3) {
        // alert(obj.releaseState)
        if (obj.releaseState == 1) {
          // 已发布
          this.$router.push({
            path: 'releaseInfo',
            query: {
              childId: obj.childBaseId,
              NoEdit: true,
              waitId: obj.id ? obj.id : '2',
              url: '/childSeekingToBeAdopted/queryById'
            }
          })
        }
        if (obj.releaseState == 2) {
          // 撤销
          this.$router.push({
            path: 'backout',
            query: {
              childId: obj.childBaseId,
              NoEdit: true,
              ListId: obj.id,
              url: '/childSeekingToBeAdopted/queryById'
            }
          })
        }
      }
      if (type == 1) {
        // 发布
        this.$router.push({
          path: 'releaseInfo',
          query: {
            childId: obj.childBaseId,
            NoEdit: false,
            waitId: obj.id ? obj.id : '2',
            url: 'childSeeking/releaseInfoByChildBaseId' // '/childSeekingToBeAdopted/queryById'
          }
        })
      } else if (type == 2) {
        // 撤销
        this.$router.push({
          path: 'backout',
          query: {
            childId: obj.childBaseId,
            NoEdit: false,
            ListId: obj.id
          }
        })
      }
    },

    deletes (val) {
      console.log(val)
      this.list.splice(val, 1)
    },
    onSelectChange (val, val2) { },
    typechange (val) {
      console.log(val.target.value)
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.releaseState = this.nowkey
      if (formData.releaseState == ' ') {
        formData.releaseState = null
      }
      console.log(formData)

      return formData
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    addAdoption (text, obj, index) { },

    // 儿童性别
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童情况
    async getchildSituationList () {
      const data = await this.getDictionaries('CHILDSITUATION')
      this.childSituationList = data
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.batchfrom {
  position: relative;
  width: 100%;
  height: 100%;
}
.boms {
  width: 100%;
  height: 58px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-right: 20px;
}
.spilwid2 {
  width: 350px;
}
</style>
