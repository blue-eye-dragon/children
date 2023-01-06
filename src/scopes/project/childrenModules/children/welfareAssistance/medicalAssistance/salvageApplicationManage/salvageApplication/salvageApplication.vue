
<template>
  <!-- 救助申请 -->
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

            <ta-form-item label="性别"
                          class="spilwid"
                          fieldDecoratorId="sex"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择性别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in sexList"
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="儿童类别"
                          class="spilwid"
                          fieldDecoratorId="childType"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-select placeholder="请选择儿童类别">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in childType"
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="出生日期"
                          class="spilwid"
                          fieldDecoratorId="birthday"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-range-picker @change="onSelectTime" />
            </ta-form-item>

            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input placeholder="请填写姓名" />
            </ta-form-item>

            <ta-form-item label="身份证号"
                          class="spilwid"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:6}"
                          :wrapperCol="{span:18}">
              <ta-input placeholder="请填写身份证号" />
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
        <div style="height: 50px;margin-top: 10px;"
             v-if="this.returnName||isNotShowAdd">
          <ta-button type="primary"
                     v-if="isNotShowAdd"
                     @click="timeTool">录入申请</ta-button>
          <ta-button icon='rollback'
                     class="btnleft"
                     v-if="this.returnName"
                     @click="returns">返回</ta-button>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList">
          <span slot="num"
                slot-scope="val,obj,index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="text,obj,index"
               class="btnlist">
            <span class="com_textreject"
                  @click="gorecord(obj,index)">申请</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       class="pagination"
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
    scopedSlots: { customRender: 'name' },
    width: '22%'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '21%'
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'sex',
    collectionType: 'SEX',
    width: '19%'
  },

  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: '20%'
  },

  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    width: '22%'
  },

  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
    // fixed: 'right'
  }
]

export default {
  mixins: [listMixin],
  data () {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      mixDataList: [],
      mixListOptions: {
        mixGetDataListURL: '/medicalRescue/list', // 数据列表接口，API地址
        mixAddURL: '', // 新增接口
        mixEditURL: '' // 编辑接口
      },
      size: 10,
      page: 1,
      tableColumns,
      visible: false,
      register: false,
      details: false,
      sexList: [],
      typeList: [],
      untilList: [],
      childType: [],
      supportsateList: [],
      healthList: [],
      SUPPORTTYPES: [],
      isNotShowAdd: window.parent.indexTool.getUserInfo().orgType != '99',

      mixPageRef: 'gridPager',
      isExpand: false,
      issearch: false,
      returnName: null // 返回按钮要返回的页面
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch)
    this.returnName = this.$route.query.returnName
  },
  mounted () {
    this.typeList = [{ name: 'a', val: '1' }, { name: 'b', val: '2' }]
    this.getsexList()
    this.getChildType()
    let params = this.$route.params
    if (params.registerDate == '') {
      // 当无登记日期时，显示操作为落实帮扶措施
      this.register = true
      this.details = true
    } else {
      // 有登记日期时显示操作为详情
      this.register = true
      this.details = true
    }
  },
  methods: {
    // 返回 到原页面
    returns () {
      this.$router.push({
        name: this.returnName
      })
    },
    childInfo (val, obj, index) {
      let param = {
        id: obj.childEnterId
      }
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify(param),
          operateFlag: 'look_now'
        }
      })
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch)
    },
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          node.style.height = this.$refs[ref].$el.offsetHeight + 40 + 'px'
        } else {
          node.style.height = '70px'
        }
        node.style.transition = 'all 1s'
      })
    },
    timeTool (obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'applyFor',
        query: {
          obj: str,
          index: index,
          goType: 'salvageApplication-add'
        }
      })
    },
    // 儿童类别
    async getChildType () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.childType = data
    },
    // 儿童性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    async gorecord (obj, index) {
      let str = JSON.stringify(obj)
      console.log(str, 'strstrstrstrstrstrstrstr')
      await this.post('/medicalRescue/beforeCheck', { id: obj.id }).then(
        res => {
          if (res.errors == null) {
            this.$router.push({
              name: 'applyFor',
              query: {
                obj: str,
                index: index,
                goType: 'salvageApplication-dr'
              }
            })
          } else {
            // this.$message.error(res.errors[0].msg)
          }
        }
      )
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {
    },
    onChange (date, dateString) {
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.spilwid {
  width: 360px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
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
