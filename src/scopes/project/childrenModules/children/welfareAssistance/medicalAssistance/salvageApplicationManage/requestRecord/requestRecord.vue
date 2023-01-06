<template>
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

            <ta-form-item label="姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入姓名" />
            </ta-form-item>

            <ta-form-item label="儿童身份类型"
                          v-if="orgType=='01'"
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
            <ta-form-item label="变更申请日期"
                          fieldDecoratorId="createTime"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-range-picker @change="onSelectTime" />
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
        <div style="height: 50px;margin-top: 10px;">
          <div style="float: left;">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button value="1">待审批</ta-radio-button>
              <ta-radio-button value="3">审批中</ta-radio-button>
              <ta-radio-button value="4">通过</ta-radio-button>
              <ta-radio-button value="5">驳回</ta-radio-button>
              <!--<ta-radio-button value="02">待提交</ta-radio-button>-->
              <ta-radio-button value=" ">全部</ta-radio-button>
            </ta-radio-group>
          </div>
          <div style="float: right;">
            <ta-button type="primary"
                       icon="plus"
                       @click="add">新增</ta-button>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span @click="edit(text,obj,index)"
                  v-if="obj.curStatus=='0' || obj.curStatus=='2'"
                  class="com_textedit">编辑</span>
            <span @click="see(text,obj,index)"
                  v-if="obj.curStatus=='3' || obj.curStatus=='4' || obj.curStatus=='5'"
                  class="com_textsee">查看</span>
            <span @click="returnBack(text,obj,index)"
                  v-if="obj.curStatus=='1'"
                  class="com_revocation">撤回</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="obj.curStatus=='0' || obj.curStatus=='2'">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
            <!-- <span @click="dels(text,obj,index)" v-if="obj.curStatus=='0' || obj.curStatus=='2'">删除</span> -->
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
    width: '18%'
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
    title: '变更申请日期',
    align: 'center',
    dataIndex: 'createTime',
    width: '17%'
  },

  {
    title: '状态',
    align: 'center',
    dataIndex: 'curStatus',
    collectionType: 'MEDICAL_RESCUE_APPLY_LIST_STATUS',
    width: '16%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  //   name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      nowkey: ' ',
      childidentitytypeList: [],
      diseasetypeList: [],
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL:
          '/medicalRescueApplyChange/pageMedicalRescueApplyChangeList', // 数据列表接口，API地址
        mixAddURL: '', // 新增接口
        mixEditURL: '', // 编辑接口
        mixGetDataListIsPage: true, // 数据列表接口，是否需要分页？
        mixScreen: true, // 是否需要筛选
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      getchildmedicalList: [],
      data: {
        name: '张三'
      },
      orgType: '',
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch)
    this.orgType = window.parent.indexTool.getUserInfo().orgType
  },
  mounted () {
    this.getdiseasetypeList()
    this.getchildidentitytypeList()
    this.getchildmedicaltypeList()
  },
  methods: {
    // 新增
    add () {
      this.$router.push({
        name: 'changeRequests',
        query: {
          returnName: 'requestRecord'
        }
      })
    },
    advancedquery () {
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
    userPageParams () {
      let formData = this.searchForm.getFieldsValue()
      formData['flowStatus'] = this.nowkey
      if (formData.flowStatus == ' ') {
        formData.flowStatus = null
      }
      this.changetime(formData)
      console.log(formData)
      return formData
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
    // 状态类型
    async getchildmedicaltypeList () {
      let data = await this.getDictionaries('MEDICAL_RESCUE_APPLY_LIST_STATUS')
      this.getchildmedicalList = data
    },
    // 救治病种类型
    async getdiseasetypeList () {
      let data = await this.getDictionaries('DISEASETYPE')
      this.diseasetypeList = data
    },

    revokeRecords () {
      this.$router.push({
        name: 'revokeRecords'
      })
    },
    returnBack (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        // editingRecords
        name: 'requeirDetails',
        query: {
          obj: str,
          index: index,
          goType: 'applicationRecord-back'
        }
      })
    },
    see (text, obj, index) {
      console.log(111)
      let str = JSON.stringify(obj)
      this.$router.push({
        // name: 'registerInfo'
        name: 'requeirDetails',
        query: {
          obj: str,
          index: index,
          goType: 'applicationRecord-details'
        }
      })
    },
    edit (text, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        // editingRecords
        name: 'changeApplyFor',
        query: {
          obj: str,
          index: index,
          goType: 'applicationRecord-edit'
        }
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
        // let str = JSON.stringify(obj)
        this.$router.push({
          name: 'detailDatas',
          query: {
            obj: obj,
            index: index,
            goType: 'applicationRecord-details'
          }
        })
      }
      console.log(obj)
    },
    async dels (text, obj, index) {
      await this.post('/medicalRescueApplyChange/updateDelStateById', {
        id: obj.id
      }).then(res => {
        console.log(res)
        if (res.errors == null) {
          this.$message.success('删除成功')
          this.handleSubmit()
        }
      })
      console.log(obj)
    },
    typechange (val) {
      this.nowkey = val.target.value
      this.handleSubmit('search')
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    onSelectTime (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

<style scoped lang="less">
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
