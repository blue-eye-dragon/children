<template>
  <!-- 儿童寻亲信息发布 -->
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
                <ta-form-item label="儿童姓名"
                              class="spilwid"
                              fieldDecoratorId="name"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>

                <ta-form-item label="儿童情况"
                              class="spilwid"
                              fieldDecoratorId="childSituation"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童情况">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in childSituationList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="性别"
                              class="spilwid"
                              fieldDecoratorId="sex"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="(item,index) in sexList"
                                      :value="item.value"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="身份证号"
                              class="spilwid"
                              fieldDecoratorId="idCard"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>

                <ta-form-item label="所属机构"
                              class="spilwid"
                              fieldDecoratorId="areaname"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入所属机构" />
                </ta-form-item>
                <ta-form-item label="登记（增员）日期"
                              style="width:470px"
                              fieldDecoratorId="applyDay"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-range-picker @change="onSelectTime" />
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

        <div class="radioClass operateBtn">
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
                  :dataSource="tableData">
          <!-- :rowSelection="rowSelection" -->
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
            <!-- <ta-divider v-if="obj.releaseYOrN==1&&obj.releaseState==1" type="vertical" /> -->
            <span class="com_revocation"
                  v-if="obj.releaseState==1"
                  @click="doAction(val,obj,2)">撤销</span>
            <!-- <ta-divider type="vertical" v-if="(obj.releaseState==1&&obj.releaseState&&obj.releaseState!=0)||(obj.releaseYOrN==1&&obj.releaseState&&obj.releaseState!=0)" /> -->
            <span class="com_textsee"
                  v-if="obj.releaseState&&obj.releaseState!=0"
                  @click="doAction(val,obj,3)">查看</span>
            <span class="com_textsee"
                  v-if="obj.releaseState==1"
                  @click="printGo(val,obj,3)">打印</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
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
    width: '18%',
    dataIndex: 'name'
  },
  {
    title: '出生日期',
    width: '16%',
    align: 'center',
    dataIndex: 'birthday',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '性别',
    width: '15%',
    align: 'center',
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
    width: '18%',
    dataIndex: 'areaname'
  },

  {
    title: '发布状态',
    width: '16%',
    align: 'center',
    dataIndex: 'releaseState',
    scopedSlots: { customRender: 'releaseState' }
    // collectionType: 'RELAESESTATE'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 220,
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  components: {
  },
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
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
        mixGetDataListURL: '/childSeeking/list' // 数据列表接口，API地址
      },
      isdisabled: true,
      chosedata: [],
      visible: false,
      sexList: [],
      childSituationList: [],
      issearch: false,
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
  created () { that = this },
  filters: {
    childSituation (val) {
      let showData = ''
      let list = that.childSituationList
      let valList = val.split(',')
      valList.forEach((e) => {
        list.forEach((b) => {
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
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  methods: {
    printGo (a, item) {
      item.url = '/childSeeking/printSeekingInfo'

      const titile = '寻亲信息发布'

      const url = `${window.faceConfig.basePath}${item.url}?id=${item.id}`
      // if (this.bizId) {
      //   url += `&&bizId=${this.bizId}`
      // }
      const Aaa = '../../../../../../../static/print.html?src=' + url + '&&titile=' + titile
      window.open(encodeURI(Aaa))
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    doAction (val, obj, type) { // 操作
      if (type == 3) {
        if (obj.releaseState == 1) { // 已发布
          this.$router.push({
            path: 'releaseInfo',
            query: {
              childId: obj.childBaseId,
              ListId: obj.id,
              NoEdit: true,
              url: '/childSeeking/queryByIdAndChildBaseId'
            }
          })
        }
        if (obj.releaseState == 2) { // 撤销
          this.$router.push({
            path: 'backout',
            query: {
              childId: obj.childBaseId,
              NoEdit: true,
              ListId: obj.id,
              url: '/childSeeking/queryByIdAndChildBaseId'

            }
          })
        }
      }
      if (type == 1) { // 发布
        this.$router.push({
          path: 'releaseInfo',
          query: {
            childId: obj.childBaseId,
            NoEdit: false,
            url: 'childSeeking/releaseInfoByChildBaseId'
          }
        })
      } else if (type == 2) { // 撤销
        this.$router.push({
          path: 'backout',
          query: {
            childId: obj.childBaseId,
            NoEdit: false,
            ListId: obj.id,
            where: '0'
          }
        })
      }
    },

    deletes (val) {
      this.list.splice(val, 1)
    },
    onSelectChange (val, val2) {

    },
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
      let formData = this.searchForm.getFieldsValue()
      formData['releaseState'] = this.nowkey
      if (formData.releaseState == ' ') {
        formData.releaseState = null
      }
      console.log(formData)
      this.changetime(formData)
      return formData
    },
    onSelectTime (date, dateString) {
      console.log(date, dateString)
    },
    addAdoption (text, obj, index) {

    },
    gobatch () {
      this.visible = true
    },
    // 儿童性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 儿童情况
    async getchildSituationList () {
      let data = await this.getDictionaries('CHILDSITUATION')
      let _self = this
      // 只保留寻亲儿童情况的字典项
      _self.childSituationList = data.reduce((prev, current) => {
        (current.value == _self.Enum.CHILDSITUATION.LLQT || current.value == _self.Enum.CHILDSITUATION.DGJJ || current.value == _self.Enum.CHILDSITUATION.YSBYQET
          || current.value == _self.Enum.CHILDSITUATION.YSYSZS) && prev.push(current)
        return prev
      }, [])
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 420px;
}
</style>

