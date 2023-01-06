<template>
  <!-- 儿童寻亲信息发布 -->
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contentin">
        <div class="searchcont"
             ref="oneout">

          <ta-form layout="inline"
                   ref="one"
                   class="formWidth"
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

          </ta-form>
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

        <div class="visitbtntop">
          <ta-radio-group :value="nowkey"
                          buttonStyle="solid"
                          @change="typechange">
            <ta-radio-button value="0">未发布</ta-radio-button>
            <ta-radio-button value="1">已发布</ta-radio-button>
            <ta-radio-button value="2">已撤销</ta-radio-button>
            <ta-radio-button value=" ">全部</ta-radio-button>
          </ta-radio-group>

          <!--<ta-button type="primary"-->
                     <!--icon='plus'-->
                     <!--style="    float: right;"-->
                     <!--@click="newOne">新增</ta-button>-->
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
          <span slot="releaseState"
                slot-scope="text,obj,index">
            <span v-if="obj.releaseState==0"
                  class="com_tobesubmitted">
              {{'未发布'}}
            </span>
            <span v-if="obj.releaseState==1"
                  class="com_adopt">
              {{'已发布'}}
            </span>
            <span v-if="obj.releaseState==2"
                  class="com_reject">
              {{'已撤销'}}
            </span>

          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span class="com_publish"
                  v-if="obj.releaseYOrN==1"
                  @click="doAction(val,obj,1)">发布</span>
            <!-- <ta-divider v-if="obj.releaseYOrN==1&&obj.releaseState==1"
                        type="vertical" /> -->
            <span class="com_textreject"
                  v-if="obj.releaseState==1"
                  @click="doAction(val,obj,2)">撤销</span>
            <!-- <ta-divider type="vertical"
                        v-if="(obj.releaseState==1&&obj.releaseState&&obj.releaseState!=0)||(obj.releaseYOrN==1&&obj.releaseState&&obj.releaseState!=0)" /> -->
            <span class="com_textsee"
                  v-if="obj.releaseState&&obj.releaseState!=0"
                  @click="doAction(val,obj,3)">查看</span>
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

    <ta-modal title="新增"
              v-model="visible"
              width="90%"
              :footer="null">
      <newOne @handleSubmit="handleSubmit()"
              v-if="visible"
              :ishide="false"></newOne>
    </ta-modal>
  </div>
</template>
<script>
import newOne from './newOne'
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
    align: 'center',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '性别',
    width: '16%',
    dataIndex: 'sex',
    align: 'center',
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
    align: 'center',
    dataIndex: 'releaseState',
    scopedSlots: { customRender: 'releaseState' }
    // collectionType: 'RELAESESTATE'
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
    newOne
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
      issearch: false,
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
      const valList = val ? val.split(',') : []
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
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 'px'
        } else {
          node.style.height = '66px'
        }
        node.style.transition = 'all 1s'
      })
    },
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
      this.list.splice(val, 1)
    },
    onSelectChange (val, val2) { },
    typechange (val) {
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
.spilwid {
  width: 300px;
}
.spilwid2 {
  width: 350px;
}
.formWidth {
  width: 860px;
}
.searchcont {
  width: 100%;
  position: relative;
  height: 66px;
  overflow: hidden;
  transition: all 0.5s;
  width: 100%;
  height: 70px;
  border-bottom: 13px solid #e4e4e4;
}
.searchbtn {
  width: 360px;
  position: absolute;
  right: -43px;
  top: 6px;
}
</style>
