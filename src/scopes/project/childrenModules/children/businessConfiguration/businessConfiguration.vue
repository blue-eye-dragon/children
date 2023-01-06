<template>
  <!-- 业务配置 -->
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:true}"
                      :layout="{header:'80px',footer:'80px'}">

      <div slot="header">
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="角色"
                        fieldDecoratorId="roleName"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入角色" />
          </ta-form-item>
          <ta-form-item label="业务类型"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="businessType">
            <ta-input placeholder="请输入业务类型" />
          </ta-form-item>
          <ta-form-item label="统计类型"
                        class="spilwid"
                        fieldDecoratorId="statisticalType"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}">
            <ta-input placeholder="请输入统计类型" />
          </ta-form-item>
          <ta-form-item>
            <div class="searchButton">
              <ta-button class="search "
                         icon="search"
                         @click="handleSubmit('search')">查询</ta-button>
              <ta-button class="btnleft reset"
                         icon="reload"
                         @click="resetFrom">重置</ta-button>
            </div>

          </ta-form-item>
        </ta-form>
        <!--
        <div class="visitbtn">
          <ta-button class="btnleft newt" @click="add">新增</ta-button>
        </div>-->
      </div>
      <div>
        <ta-table :columns="mixColumns"
                  :dataSource="mixDataList"
                  :pagination="false"
                  @change="handleTableChange"
                  class="tables"
                  bordered>
          <!-- :haveSn="true"
          :rowSelection="mixRowSelection"-->
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="businessType"
                slot-scope="a,b,c">
            <span>{{b.businessType|dobusinessType}}</span>
          </span>
          <span slot="statisticalType"
                slot-scope="a,b,c">
            <span>{{b.statisticalType|dostatisticalType}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="edit(val,obj,'2')"
                  class="com_textsee">查看</span>
            <!-- <ta-divider type="vertical" /> -->
            <span @click="edit(val,obj,'1')"
                  class="com_textedit">编辑</span>

            <!-- <ta-divider v-if="!!obj.id" type="vertical" /> -->

            <ta-popconfirm title="确定还原配置信息吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消"
                           v-if="!!obj.id">
              <span class="com_textdel">还原配置</span>
            </ta-popconfirm>
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

    <ta-modal title="新增 "
              v-model="visible"
              width="1200px"
              :footer="null">
      <roleConfig @handleSubmit="handleSubmit()"
                  v-if="visible"
                  :statisticalList='statisticalList'
                  :businessList='businessList'
                  :ishide="disabled"></roleConfig>
    </ta-modal>
    <!-- 新增、编辑、详情弹窗 -->
    <div>
      <ta-drawer :title="type==0?'新增':type==1?'编辑':'详情'"
                 :width="width"
                 :closable="false"
                 :getContainer="setContainer"
                 @close="onClose"
                 :visible="false">
        <ta-form :autoFormCreate="(form)=>{this.form = form}"
                 layout="horizontal">
          <ta-form-item label="角色"
                        fieldDecoratorId="roleName">
            <ta-input :disabled="true"
                      placeholder="请输入角色" />
          </ta-form-item>
          <ta-form-item hidden
                        label="id"
                        fieldDecoratorId="id">
            <ta-input />
          </ta-form-item>
          <ta-form-item hidden
                        label="roleId"
                        fieldDecoratorId="roleId">
            <ta-input />
          </ta-form-item>
          <ta-form-item label="业务类型"
                        fieldDecoratorId="businessType"
                        :require="{message:'请选择业务类型!'}">
            <ta-select mode="multiple"
                       :disabled="disabled"
                       placeholder="请选择业务类型">
              <ta-select-option v-for="(item,index) in businessList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item label="统计类型"
                        fieldDecoratorId="statisticalType"
                        :require="{message:'请选择统计类型!'}">
            <ta-select mode="multiple"
                       :disabled="disabled"
                       placeholder="请选择统计类型">
              <ta-select-option v-for="(item,index) in statisticalList"
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <ta-form-item v-if="disabled"
                        label="创建人"
                        fieldDecoratorId="createUser">
            <ta-input :disabled="true" />
          </ta-form-item>
          <ta-form-item v-if="disabled"
                        label="创建时间"
                        fieldDecoratorId="createTime">
            <ta-input :disabled="true" />
          </ta-form-item>
        </ta-form>
        <div slot="footer">
          <ta-button key="back"
                     @click="onClose">取消</ta-button>
          <ta-button key="submit"
                     type="primary"
                     v-if="type!=2"
                     @click="submit()">确定</ta-button>
        </div>
      </ta-drawer>
    </div>
  </div>
</template>
<script>
import roleConfig from './roleConfig'
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { debuglog } from 'util'
import moment from 'moment'
import { get } from 'http'
const mixColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '角色',
    width: '26%',
    dataIndex: 'roleName',
    overflowTooltip: true
  },
  {
    title: '业务类型',
    width: '32%',
    dataIndex: 'businessType',
    // collectionType: 'WORKBENCH_BUSINESS_TYPE',
    // scopedSlots: { customRender: 'businessType' },
    overflowTooltip: true
  },
  {
    title: '统计类型',
    width: '32%',
    dataIndex: 'statisticalType',
    // scopedSlots: { customRender: 'statisticalType' },

    overflowTooltip: true
  },
  {
    title: '待办事项类型',
    width: '32%',
    dataIndex: 'todoType',
    // scopedSlots: { customRender: 'statisticalType' },

    overflowTooltip: true
  },
  {
    title: '操作',
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
var that = ''
export default {
  components: { roleConfig },
  mixins: [listMixin],
  data () {
    return {
      number: '',
      namename: '',
      showOn: false,
      page: 1,
      size: 10,
      sexList: [],
      businessList: [],
      dutyList: [],
      administrativeOfficeList: [],
      age: '',
      visible: false,
      width: '500px',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/WorkbenchApi/queryBusinessConfig', // 数据列表接口，API地址
        mixAddURL: '/WorkbenchApi/save', // 新增接口
        mixEditURL: '/WorkbenchApi/update', // 编辑接口
        mixDeleteURL: '/WorkbenchApi/updateDelStateById' // 删除接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      mixLimit: 10,
      mixDataForm: ['name'],
      id: '',
      userId: '',
      orgId: '',
      orgName: [],
      mixDataList: [],
      cultureList: [],
      startValue: null,
      nowDate: '',
      ksList: [],
      statisticalList: [],
      todoTypeList: []
    }
  },
  created () {
    that = this
  },
  mounted () {
    const nowDates = new Date()
    this.nowDate = moment(nowDates).format('YYYY-MM-DD')
    this.userId = window.parent.indexTool.getUserInfo().userId
    this.getUserOrg()
    this.getDic()
  },

  methods: {
    async deletes (v, b, i) {
      const res = await this.post('/WorkbenchApi/updateDelStateById', { id: b.id })
      if (!res.errors) {
        this.handleSubmit()
      }
    },
    // 字典
    async getDic () {
      this.businessList = await this.getDictionaries('WORKBENCH_BUSINESS_TYPE')
      this.statisticalList = await this.getDictionaries('WORKBENCH_STATISTICAL_TYPE')
      this.todoTypeList = await this.getDictionaries('TODOTYPT')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    moment,
    disabledStartDate (startValue) {
      const endValue = this.nowDate
      return moment(startValue).format('YYYY-MM-DD') > endValue
    },

    // 获取单位
    async getUserOrg () {
      this.orgId = window.parent.indexTool.getUserInfo().orgId
      this.orgName = window.parent.indexTool.getUserInfo().orgName
    },

    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },
    async edit (val, obj, tp) {
      // 添加
      this.$router.push({
        path: 'roleConfig',
        query: {
          businessList: this.businessList,
          statisticalList: this.statisticalList,
          todoTypeList: this.todoTypeList,
          types: tp,
          ids: obj.id,
          roleId: obj.roleId,
          ty: tp
        }
      })
    },

    // this.type = 1
    // if (tp == '2') { // ck
    //   this.type = 2
    //   this.disabled = true
    // }
    // let str = JSON.stringify(obj)
    // obj = JSON.parse(str)
    // let roleName = obj.roleName
    // let data = await this.post('/WorkbenchApi/queryByBusinessConfigId', {
    //   id: obj.id
    // })
    // console.log('获取查看--》', data)

    // if (data.data.data) {
    //   obj = data.data.data
    // }
    // obj.roleName = roleName
    // obj.businessType = obj.businessType ? obj.businessType.split(',') : []
    // obj.statisticalType = obj.statisticalType ? obj.statisticalType.split(',') : []
    // this.id = obj.id
    // this.visible = true
    // this.nowtype = 2
    // if (obj.birthday) {
    //   obj.birthday = moment(obj.birthday, 'YYYY-MM-DD')
    //   this.changeAge('hello', obj.birthday)
    // }

    // this.$nextTick(() => {
    //   // this.form.setFieldsValue(obj)
    // })
    // },
    changeAge (date, dateString) {
      var birthDayTime = new Date(dateString).getTime()
      var nowTime = new Date().getTime()
      this.age = Math.ceil((nowTime - birthDayTime) / 31536000000)
      this.$nextTick(() => {
        // this.form.setFieldsValue({
        //   age: this.age ? this.age : ''
        // })
      })
    },

    handleTableChange () { },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  },
  filters: {
    dobusinessType (val) {
      const list = that.businessList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    },
    dostatisticalType (val) {
      const list = that.statisticalList
      let dataShow = ''
      if (val && val.length > 0) {
        const attr = val.split(',')
        attr.forEach((e, index) => {
          list.forEach((item, index) => {
            if (e == item.value) {
              dataShow += item.label + ','
            }
          })
        })
      }
      return dataShow.substring(0, dataShow.length - 1)
    }
  }
}
</script>

<style scoped lang="less">
.searchdata {
  height: 100%;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
.newt {
  background-color: #7cc16b;
  color: #fff;
}
.visitbtnR {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
</style>
