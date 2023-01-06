
<template>
  <!-- 申请变更 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px' ,footer:'80px'}">
      <div class="contentin">
        <div class="searchcont"
             ref="oneout">

          <ta-form layout="inline"
                   ref="one"
                   class="formWidth"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">

            <ta-form-item label="救治病种类型"
                          fieldDecoratorId="rescueDiseaseType"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择救治病种类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in diseasetypeList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="救治病种名称"
                          fieldDecoratorId="rescueDiseaseName"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入救治病种名称" />
            </ta-form-item>

            <ta-form-item label="所属机构"
                          fieldDecoratorId="orgName"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入所属机构" />
            </ta-form-item>

            <ta-form-item label="救助申请日期"
                          fieldDecoratorId="applyDate"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-range-picker @change="onSelectTime" />
            </ta-form-item>

            <ta-form-item label="儿童身份类型"
                          fieldDecoratorId="childIdentityType"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-select placeholder="请选择儿童身份类型">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option v-for="(item,index) in childidentitytypeList "
                                  :key="index"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>

            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
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
             v-if="this.returnName">
          <ta-button icon='rollback'
                     @click="returns">返回</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="mixDataList"
                  bordered>
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
            <!-- <span id="register"  @click="gorecord(obj,index)">申请</span> -->
            <span class="com_textreject"
                  @click="gorecord(obj,index)">变更申请</span>
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
    <!-- 申请变更确认弹窗 -->
    <ta-drawer title="友情提示"
               width="500"
               :closable="false"
               :getContainer="setContainer"
               @close="onClose"
               :visible="editVisible">
      <div>
        <p>该儿童存在审核驳回记录，是否获取之前申请时填写的儿童业务信息？</p>
      </div>
      <div slot="footer">
        <ta-button key="back"
                   @click="handleOkRevoke('0')">取消</ta-button>
        <ta-button key="submit"
                   type="primary"
                   @click="handleOkRevoke('1')">确定</ta-button>
      </div>
    </ta-drawer>
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
    width: '18%'
  },
  {
    title: '儿童身份类型',
    dataIndex: 'childIdentityType',
    collectionType: 'CHILDIDENTITYTYPE',
    width: '17%'
  },
  {
    title: '救助病种类型',
    dataIndex: 'rescueDiseaseType',
    collectionType: 'DISEASETYPE',
    width: '18%'
  },
  {
    title: '救治病种名称',
    dataIndex: 'rescueDiseaseName',
    width: '18%'
  },
  {
    title: '所属机构',
    dataIndex: 'orgName',
    width: '18%'
  },
  {
    title: '救助申请日期',
    dataIndex: 'applyDate',
    width: '16%'
  },

  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    align: 'center',
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
        mixGetDataListURL: '/medicalRescueApplyChange/list' // 数据列表接口，API地址
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
      childidentitytypeList: [],
      diseasetypeList: [],
      mixPageRef: 'gridPager',
      editVisible: false,
      strData: {},
      orgType: '',
      isExpand: false,
      issearch: false,
      returnName: null // 返回按钮要返回的页面
    }
  },
  mounted () {
    this.typeList = [{ name: 'a', val: '1' }, { name: 'b', val: '2' }]
    this.getsexList()
    this.getChildType()
  },
  activated () {
    this.returnName = this.$route.query.returnName
    this.getdiseasetypeList()
    this.getchildidentitytypeList()
    this.orgType = window.parent.indexTool.getUserInfo().orgType
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch)
  },
  methods: {
    // 返回 到原页面
    returns () {
      this.$router.push({
        name: this.returnName
      })
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    onClose () {
      this.editVisible = false
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
    childInfo (val, obj, index) {
      if (obj.childEnterId) {
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
      } else {
        this.$router.push({
          name: 'detailDatas',
          query: {
            obj: obj,
            index: index,
            goType: 'applicationRecord-details'
          }
        })
      }
    },
    // 儿童类型
    async getChildType () {
      let data = await this.getDictionaries('CHILDTYPE')
      this.childType = data
    },
    // 儿童性别
    async getsexList () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    async gorecord (obj, index) {
      let str = JSON.stringify(obj)
      await this.post('/medicalRescueApplyChange/beforeCheck', {
        id: obj.id
      }).then(res => {
        if (res.errors == null) {
          this.$router.push({
            name: 'changeApplyFor',
            query: {
              obj: str,
              index: index,
              goType: 'salvageApplication-biangengApp'
            }
          })
        } else {
        }
      })
    },
    handleOkRevoke (val) {
      if (val == '0') {
        this.$router.push({
          name: 'applyFor',
          query: {
            obj: this.strData,
            goType: 'salvageApplication-biangengcancle'
          }
        })
      } else if (val == '1') {
        this.$router.push({
          name: 'applyFor',
          query: {
            obj: this.strData,
            goType: 'salvageApplication-biangengApp'
          }
        })
      }
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    //  儿童身份类型
    async getchildidentitytypeList () {
      await this.getDictionaries('CHILDIDENTITYTYPE').then(res => {
        let data = res
        let orgType = window.parent.indexTool.getUserInfo().orgType
        if (orgType == '99') {
          data.map((item, index) => {
            if (item.value == '1') {
              this.childidentitytypeList.push(item)
            }
          })
        } else if (orgType != '98' && orgType != '99') {
          data.map((item, index) => {
            if (item.value != '1') {
              this.childidentitytypeList.push(item)
            }
          })
        } else {
          this.childidentitytypeList = data
        }
      })
    },
    // 救治病种类型
    async getdiseasetypeList () {
      let data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },
    onSelectTime (date, dateString) {
    }
  }
}
</script>
<style scoped>
.searchdata {
  height: 100%;
}
.spilwid {
  width: 350px;
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
