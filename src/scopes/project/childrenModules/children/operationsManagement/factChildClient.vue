<!--
 * @Date: 2021-06-10 11:10:27
 * @information: 事实儿童信息维护管理
-->
<template>
  <div id="fact-child-client" class="searchdata">
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
                <ta-form-item label="儿童编号"
                              fieldDecoratorId="childNum"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入儿童编号" />
                </ta-form-item>
                <ta-form-item label="身份证号"
                              fieldDecoratorId="idNum"
                              style="width:350px"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入身份证号" />
                </ta-form-item>
                <!-- <ta-form-item label="性别"
                              fieldDecoratorId="sex"
                              class="spilwid"
                              :labelCol="{ span: 9 }"
                              :wrapperCol="{span:15}">
                  <ta-select allowClear
                             placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option v-for="item in sexList"
                                      :key="item.value"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              fieldDecoratorId="birthday"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item>
                <ta-form-item label="申请日期"
                              fieldDecoratorId="registerDay"
                              class="spilwid1"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:16}">
                  <ta-range-picker />
                </ta-form-item> -->
              </div>
              <div class="searchbtn searchButton">
                <ta-button class="search "
                           icon="search"
                           @click="searchList('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
                <!-- <ta-button class="btnleft"
                           @click="advancedquery">
                  高级查询
                  <ta-icon :type="issearch?'up':'down'" />
                </ta-button> -->
              </div>
            </div>
          </ta-form>

        </div>
        <div style="margin-top: 16px;">
          <div class="visitbtntop radioClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange">
              <ta-radio-button :value="'3'">减员恢复</ta-radio-button>
              <ta-radio-button :value="'1'">机构迁移</ta-radio-button>
            </ta-radio-group>
          </div>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="mixDataList">
          <!-- <span slot="name"
                slot-scope="a,b,c">
            <a @click="childDetail(a,b,c)">{{a}}</a>
          </span> -->
          <template slot="approveDate"
                    slot-scope="a, b, c">
            <span>{{a!=undefined?a.substring(0,10):''}}</span>
          </template>
          <span slot="action"
                slot-scope="a, b, c"
                class="btnlist">
            <ta-popconfirm title="确定减员恢复吗?"
                           @confirm="deletes(b)"
                           @cancel="{}"
                           okText="确定"
                           v-if="nowkey == '3'"
                           cancelText="取消">
              <span class="com_textsee">减员恢复</span>
            </ta-popconfirm>
            <span class="com_textsee"
                  v-if="nowkey == '1'"
                  @click="remove(b)">机构迁移</span>
          </span>
        </ta-table>
        <!-- 提示文字 -->
        <div v-if="nowkey == '1'" style="font-size:18px;margin-top: 30px;color: red">
          <p>此功能仅限相同区县的两个乡镇进行迁移！</p>
        </div>
      </div>
      <ta-drawer title="退回原因"
                 width="500px"
                 placement="right"
                 :closable="false"
                 :maskClosable="false"
                 :visible="contentVisible"
                 :getContainer="setContainer">
        <ta-form layout="inline"
                 :autoFormCreate="(backForm)=>{this.backForm=backForm}">
          <ta-form-item label="机构主键"
                        fieldDecoratorId="migrateOrgId"
                        style="width:450px"
                        :fieldDecoratorOptions="this.verificationRules('退回原因', 60,false)"
                        :labelCol="{ span:5}"
                        :wrapperCol="{ span: 19 }">
            <ta-input placeholder="机构主键"/>
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button style="margin-right: 8"
                     @click="onClose">
            返回
          </ta-button>
          <ta-button @click="onSubmit"
                     type="primary">提交</ta-button>
        </div>
      </ta-drawer>
    </ta-border-layout>
  </div>
</template>
<script>
const tableColumns = [
  {
    title: '儿童编号',
    width: '15%',
    dataIndex: 'childNum'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '15%'
  },
  {
    title: '儿童身份证号',
    dataIndex: 'idNum',
    width: '15%',
    align: 'center'
  },
  {
    title: '户籍地',
    width: '30%',
    align: 'center',
    dataIndex: 'censusRegisterDetail'
  },
  {
    title: '所属机构',
    width: '30%',
    align: 'center',
    dataIndex: 'orgName'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 220,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      tableColumns,
      // 默认属性
      mixDataList: [], // 数据列表
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },

      sexList: [], // 性别字典数据
      childTypeList: [], // 儿童类别字典数据
      // 新增/修改弹窗
      visible: false,
      contentVisible: false,
      issearch: false,
      nowkey: '3', // 当前所在选项类型（3减员恢复 1机构迁移）
      backObj: {}

    }
  },
  activated () {
    this.issearch = false
    this.backObj = {}
    this.contentVisible = false
    this.setHeight('one', 'oneout', !this.issearch, this)
    // 表格列项增加判断
    this.judgeAddTableColumn()
  },
  mounted () {
    // this.initdatas()
  },
  methods: {
    /**
     * @author: yinpengfei
     * @Date: 2021-06-10 15:22:36
     * @information: 表格列项增加判断
     */    
    judgeAddTableColumn() {
      // 是否存在此项
      let mark = this.tableColumns.some(el => el.dataIndex == 'attritionDate')
      if(this.nowkey == '3' && !mark) {
        let columnObj = {
          title: '减员日期',
          width: '30%',
          align: 'center',
          dataIndex: 'attritionDate',
        }
        this.tableColumns.splice(this.tableColumns.length-1, 0, columnObj)
      }
      if(this.nowkey == '1' && mark) {
        this.tableColumns.splice(this.tableColumns.length-2, 1)
      }
    },

    // 打开退回栏
    remove (obj) {
      this.backObj = obj
      this.contentVisible = true
    },
    onClose () {
      this.contentVisible = false
      this.backForm.resetFields()
    },
    onSubmit () {
      const params = this.backForm.getFieldsValue()
      params.childEnterId = this.backObj.childEnterId
      const _self = this
      _self.post('sqlClientApi/migrateUnaOrg', params).then(res => {
        if (!res.errors) {
          _self.$message.success('迁移成功!')
          _self.contentVisible = false
          _self.searchList()
        }
      })
    },
    setContainer () {
      return document.getElementById('fact-child-client')
    },
    typechange (e) {
      this.nowkey = e.target.value
      // 表格列项增加判断
      this.judgeAddTableColumn()
      this.searchList()
    },
    advancedquery () {
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },
    // 初始化数据
    initdatas () {
      this.getMenu('SEX', 'sexList') // 获取性别字典数据
      let typeCode = 'CHILDCATEGORYF'
      if (window.parent.indexTool.getUserInfo().orgType != '98' && window.parent.indexTool.getUserInfo().orgType != '99') { // 民政局用全的
        typeCode = 'CHILDCATEGORYA'
      }
      this.getMenu(typeCode, 'childTypeList') // 获取儿童类别字典数据
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
    async searchList () {
      const formData = this.searchForm.getFieldsValue()
      formData.enterState = this.nowkey
      // if (!formData.childNum) {
      //   this.$message.error('儿童编号为必填项')
      //   return false
      // }
      const res = await this.post('sqlClientApi/queryUnaChildInfoByChildNumOrIdNum', formData)
      this.mixDataList = res.data.data
    },
    resetFrom () {
      this.searchForm.resetFields()
      this.mixDataList = []
    },
    deletes (obj) {
      const params = {
        childBaseId: obj.childBaseId,
        childEnterId: obj.childEnterId,
        attritionId: obj.attritionId
      }
      this.post('sqlClientApi/restoreUnaAttrition', params).then(res => {
        if (res.data.data) {
          this.$message.success('减员恢复成功')
          this.searchForm.resetFields()
          this.mixDataList = []
        } else {
          this.$message.success('减员恢复失败')
        }
      })
    },
    // 点击姓名查看儿童详情
    childDetail (a, b, c) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 6,
          childtypedisabled: 1,
          id: b.unattendedChildId,
          isdisabled: 1
          // currentStatus: b.status
        }
      })
    }
  }
}
</script>


