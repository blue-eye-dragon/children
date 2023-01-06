<template>
  <div class="searchdata">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0',footer:'80px'}">
      <div>
        <div class="searchcont"
             ref="oneout">
          <ta-form ref="one"
                   layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <div class="__form-spec-line__">
              <div>
                <ta-form-item label="被收养人姓名"
                              class="spilwid"
                              fieldDecoratorId="childName"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入被收养人姓名"></ta-input>
                </ta-form-item>
                <ta-form-item label="是否评估"
                              class="spilwid"
                              fieldDecoratorId="isAssess"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select :placeholder="'请选择是否评估'">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :key="3"
                                      value="是">是</ta-select-option>
                    <ta-select-option :key="4"
                                      value="否">否</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="是否融合"
                              class="spilwid"
                              fieldDecoratorId="isFuse"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select :placeholder="'请选择是否融合'">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :key="3"
                                      value="是">是</ta-select-option>
                    <ta-select-option :key="4"
                                      value="否">否</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="收养申请人姓名"
                              fieldDecoratorId="name"
                              class="spilwid"
                              :labelCol="{span:12}"
                              :wrapperCol="{span:12}">
                  <ta-input placeholder="请输入收养申请人姓名" />
                </ta-form-item>
                <ta-form-item label="收养申请人身份证号"
                              class="spilwid2"
                              fieldDecoratorId="idCard"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:14}">
                  <ta-input placeholder="请输入收养申请人身份证号"></ta-input>
                </ta-form-item>
                <ta-form-item label="评估结论"
                              class="spilwid"
                              fieldDecoratorId="assessResult"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select :placeholder="'请选择评估结论'">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :key="1"
                                      :value="1">符合收养条件</ta-select-option>
                    <ta-select-option :key="2"
                                      :value="0">不符合收养条件</ta-select-option>
                  </ta-select>
                </ta-form-item>
                <ta-form-item label="融合结论"
                              class="spilwid"
                              fieldDecoratorId="fuseResult"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select :placeholder="'请选择融合结论'">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :key="3"
                                      :value="1">融合成功</ta-select-option>
                    <ta-select-option :key="4"
                                      :value="0">融合失败</ta-select-option>
                  </ta-select>
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
        <div style="margin-top: 16px;"></div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <!-- <div slot="idCard" slot-scope="val,obj,index" >
            <span>{{val?val.substr(0,4)+'***'+val.substr(14,val.length):'-'}}</span>
          </div> -->
          <div slot="currentStatusLabel"
               slot-scope="a,b,c">
            <span v-if="b.currentStatus==2"
                  class="com_tobesubmitted">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==1"
                  class="com_tobeaudited">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==3"
                  class="com_adopt">{{b.currentStatusLabel}}</span>
            <span v-if="b.currentStatus==4"
                  class="com_reject">{{b.currentStatusLabel}}</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span @click="look(obj)"
                  class='com_textsee'>查看</span>
            <span @click="assessOrFuseEdit(obj,'1')"
                  v-if="obj.assessId"
                  class='com_continue'>评估修改</span>
            <span @click="assessOrFuseEdit(obj,'2')"
                  v-if="obj.fuseId"
                  class='com_textedit'>融合修改</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :defaultCurrent="page"
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
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
  //   width: '10%'
  // },
  {
    title: '被收养人姓名',
    dataIndex: 'childName',
    width: '11%'
  },
  {
    title: '申请人姓名',
    dataIndex: 'name',
    width: '10%'
  },

  {
    title: '申请人身份证号',
    dataIndex: 'idCard',
    width: '12%'
  },
  {
    title: '上报儿童机构',
    dataIndex: 'orgName',
    width: '10%'
  },
  {
    title: '是否评估',
    dataIndex: 'isAssess',
    width: '10%'
  },
  {
    title: '评估结论',
    dataIndex: 'assessResult',
    width: '10%',
    customRender: (text, record, index) => {
      const obj = {
        children: text == '1' ? '符合收养条件' : '不符合收养条件',
        attrs: {}
      }
      return obj
    }
  },
  {
    title: '是否融合',
    dataIndex: 'isFuse',
    width: '10%'
  },
  {
    title: '融合结论',
    dataIndex: 'fuseResult',
    width: '12%',
    customRender: (text, record, index) => {
      const obj = {
        children: text == '1' ? '融合成功' : '未融合/融合失败',
        attrs: {}
      }
      return obj
    }
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 280,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/adoptionAppointment/approveandassesslist' // 数据列表接口，API地址
      },
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    this.orgType = window.parent.indexTool.getUserInfo().orgType
  },
  methods: {
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.auditStatusList = ['3', '4']
      this.changetime(formData)
      return formData
    },
    // 查看
    look (e) {
      if (e.auditStatus == '99') {
        this.$router.push({
          name: 'additionalToEvaluate',
          query: {
            id: e.id,
            titleName: '22',
            flag: '22'
          }
        })
      } else {
        this.$router.push({
          name: 'evaluationmanagementFrom',
          query: { flag: 'look', id: e.id }
        })
      }
    },
    // 评估/融合修改
    assessOrFuseEdit (obj, flag) {
      this.$router.push({
        name: 'assessOrFuse',
        query: { id: obj.id, assessOrFuseId: flag == '1' ? obj.assessId : obj.fuseId, childNumber: obj.childNumber, isEdit: 1, flag }
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 350px;
}
</style>
