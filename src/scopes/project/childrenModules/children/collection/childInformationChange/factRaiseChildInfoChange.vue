<template>
  <div class="searchdata">
    <!--事实无人抚养儿童信息变更  -->
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form layout="inline"
                   ref="one"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">

            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="儿童姓名"
                              fieldDecoratorId="name"
                              class="spilwid1"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童姓名" />
                </ta-form-item>
                <ta-form-item label="身份证号"
                              class="spilwid1"
                              fieldDecoratorId="idCard"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}">
                  <ta-input placeholder="请输入身份证号"></ta-input>
                </ta-form-item>

                <ta-form-item label="年龄"
                              class="spilwid1"
                              fieldDecoratorId="age"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input-number :step="1"
                                   :min="1"
                                   :precision=0
                                   placeholder="请输入年龄" />
                </ta-form-item>
                <ta-form-item label="申请日期"
                              fieldDecoratorId="applicationTime"
                              class="spilwid2"
                              :labelCol="{span:5}"
                              :wrapperCol="{span:19}">
                  <ta-range-picker />
                </ta-form-item>

              </div>
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
          </ta-form>
        </div>
        <div style="height: 50px;"
             :hidden="ishow">
          <ta-button @click="backs"
                     icon='rollback'>返回</ta-button>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered
                  :customRow="(record,index)=>({on:{dblclick:()=>{see(null,record,index)}}})">
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span class="com_textsee"
                  @click="see(text,obj,index)">查看</span>
            <span class="com_textedit"
                  v-if="areaLevel=='4' ||fljg"
                  @click="addAdoption(text,obj,index)">变更申请</span>
            <span class="com_textedit"
                  v-if="areaLevel=='4' ||fljg"
                  @click="justEdit(text,obj,index)">直接修改</span>
            <span class="com_textedit"
                  v-if="areaLevel<='3'&&!fljg"
                  @click="edit(text,obj,index)">编辑</span>
            <ta-popconfirm title="删除该儿童后，其相关业务数据将同步删除，请谨慎操作!"
                           @confirm="dels(text,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="areaLevel<='3' &&!fljg">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination  :defaultCurrent="page"
                       style="float:right;margin-top:10px"
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
    title: '区域',
    dataIndex: 'areaName',
    width: '13%'
  },
  {
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '13%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'SEX',
    width: '8%'
  },
  // {
  //   title: '身份证号',
  //   dataIndex: 'idCard',
  //   width: '17%'
  //   // scopedSlots: { customRender: 'idCard' }
  // },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center',
    width: '11%'

  }, {
    title: '申请日期',
    dataIndex: 'reportTime',
    align: 'center',
    width: '11%'

  },
  {
    title: '审批日期',
    dataIndex: 'approverTime',
    align: 'center',
    width: '11%'

  },
  {
    title: '儿童类别',
    dataIndex: 'childTypeLabel',
    align: 'center',
    width: '15%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: 260,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'factRaiseChildInfoChange',
  mixins: [listMixin],

  data () {
    return {
      issearch: false,
      ishow: true,
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      fljg: true,
      areaLevel: '',
      mixPageRef: 'gridPager',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/unattendedBaseChangeApi/pageUnattendedChild' // 数据列表接口，API地址
      }
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    this.areaLevel = window.parent.indexTool.getUserInfo().areaLevel
    this.fljg = window.parent.indexTool.getUserInfo().orgType == '99'
    this.ishow = !this.$route.query.goto
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    backs () { this.$router.go(-1) },
    addAdoption (text, obj, index) {
      const str = {
        obj: obj,
        index: index,
        goType: 'factRaiseChildInfoChange-apply'
      }
      const paramsData = JSON.stringify(str)
      this.post('/unattendedBaseChangeApi/checkBaseChangeApply', { addUnattendedId: obj.addUnattendedId }).then((res) => {
        if (res.data.data == '1') {
          this.$message.error('该儿童已提出信息变更申请，还未审批，请等待审批完成后再提信息变更申请', 5)
          return false
        } else {
          this.$router.push({
            name: 'applyChangeFrom',
            query: {
              paramsData
            }
          })
        }
      })
    },
    // 查询参数
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      if (formData.areaCode && formData.areaCode.length > 0) {
        formData.areaCode = formData.areaCode.slice(-1).toString()
      }
      this.changetime(formData)
      if (formData.applicationTimeEnd != '' && formData.applicationTimeEnd != null) {
        formData.applicationTimeEnd = formData.applicationTimeEnd.slice(0, 10)
      }
      // formData.pageFlag = '0'
      return formData
    },
    //   直接修改
    justEdit (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          justEdit: true,
          status: 4,
          id: obj.addUnattendedId,
          childtypedisabled: 1,
          isOtherEdit: '11'
        }
      })
    },
    //   编辑
    edit (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 4,
          id: obj.addUnattendedId,
          childtypedisabled: 1,
          isInfoMaintain: true // 表示是基础信息维护列表跳转过去的
        }
      })
    },
    //   撤回
    returnBack (text, obj, index) { },
    //   查看
    see (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          id: obj.addUnattendedId,
          childtypedisabled: 1,
          isdisabled: 1,
          isInfoMaintain: true // 表示是基础信息维护列表跳转过去的
        }
      })
    },
    dels (text, obj, index) {
      const params = {
        addUnattendedId: obj.addUnattendedId
      }
      this.post('/AddUnattendedChildApi/deleteUnattendedChild', params).then((res) => {
        if (res.errors == null) {
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
.spilwid1 {
  width: 290px;
}
.spilwid2 {
  width: 400px;
}
</style>
