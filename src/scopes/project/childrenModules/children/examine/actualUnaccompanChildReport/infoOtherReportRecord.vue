<template>
  <div class="searchdata">
    <!-- 信息上报记录 -->
    <ta-border-layout v-if="isOpening"
                      :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm=searchForm}">
            <ta-form-item label="儿童姓名"
                          fieldDecoratorId="name"
                          class="spilwid"
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="身份证号"
                          class="spilwid3"
                          fieldDecoratorId="idCard"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}">
              <ta-input placeholder="请输入身份证号"></ta-input>
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <div>
          <div class="visitbtntop radioClass">
            <ta-radio-group :value="nowkey"
                            buttonStyle="solid"
                            @change="typechange2">
              <ta-radio-button value="0">待提交</ta-radio-button>
              <ta-radio-button value="1">已提交</ta-radio-button>
            </ta-radio-group>
            <div style="float: right;">
              <ta-button type="primary"
                         icon="plus"
                         @click="toNew">新增</ta-button>
              <!-- <ta-button class='btnleft exportbtn'
                       icon='upload'
                       @click="exportFileList">导出</ta-button> -->
            </div>
          </div>
        </div>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :customRow="(record,index)=>({on:{dblclick:()=>{see(null,record,index)}}})"
                  bordered>
          <span slot="num"
                slot-scope="a,b,c">
            <span>{{size*(page-1)+c+1}}</span>
          </span>
          <div slot="statusLabel"
               slot-scope="a,b,c">
            <span v-if="b.status==0||b.status==2"
                  class="no_submit">{{a}}</span>
            <span v-if="b.status==1"
                  class="com_tobeaudited">{{a}}</span>
            <span v-if="b.status==3"
                  class="com_adopt">{{a}}</span>
            <span v-if="b.status==4"
                  class="no_submit">{{a}}</span>
            <span v-if="b.status==6"
                  class="com_reject">{{a}}</span>
          </div>
          <div slot="action"
               class="btnlist"
               slot-scope="text,obj,index">
            <span @click="edit(text,obj,index)"
                  class="com_continue"
                  v-if="nowkey=='0'||nowkey =='1'&&obj.status=='4'">{{nowkey=='0'?'编辑':'继续办理'}}</span>
            <span class="com_textsee"
                  v-if="nowkey =='1'"
                  @click="see(text,obj,index)">查看</span>
            <!-- <span class="com_textreject"
                  @click="returnBack(text,obj,index)"
                  v-if="obj.status==1">撤回</span> -->
            <ta-popconfirm title="确定删除吗?"
                           @confirm="dels(obj)"
                           @cancel="cancel"
                           v-if="nowkey=='0'"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination :defaultCurrent="page"
                       style="float:right;margin-top:10px"
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="mixPageRef" />
      </div>
    </ta-border-layout>

    <div v-if="!isOpening"
         class="container-not-support">
      系统尚未联通
    </div>

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
  {
    title: '儿童编号',
    dataIndex: 'childNumber',
    width: '18%'
  },
  {
    title: '儿童姓名',
    dataIndex: 'name',
    width: '18%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '15%'
  },
  {
    title: '出生日期',
    align: 'center',
    dataIndex: 'birthday',
    width: '17%'
  },
  {
    title: '申请日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '17%'
  },
  // {
  //   title: '上报单位',
  //   align: 'center',
  //   dataIndex: 'reportUnit',
  //   width: '18%'
  // },
  {
    title: '报请区域',
    align: 'center',
    dataIndex: 'reportToUnit',
    width: '18%'
  },
  {
    title: '当前状态',
    align: 'center',
    dataIndex: 'statusLabel',
    scopedSlots: { customRender: 'statusLabel' },
    width: '15%'
  },
  {
    title: '操作',
    overflowTooltip: false,

    dataIndex: 'action',
    width: 230,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'infoReportApproval',
  mixins: [listMixin],
  data () {
    return {
      nowkey: '0',
      tableColumns,
      tableData: [],
      yesNoList: [],
      page: 1,
      size: 10,
      mixPageRef: 'mixPageRef',
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: 'unattendedChildApplyAnotherPlaceApi/queryUnattendedAnotherPlaceApplyList' // 数据列表接口，API地址
      },
      key: '5',
      orgId: '',
      areaCode: '',
      isorgtype: window.parent.indexTool.getUserInfo().orgType == '99',

      isOpening: true, // 当前用户地是否已联通 - 新疆、新疆兵团 未联通
      notSupportAreaIdArr: ['650000000000', '659900000000'], // 暂未联通跨省通办的省级地 - 新疆、新疆兵团
    }
  },
  mounted () {
    this.getdit()
    this.orgId = window.parent.indexTool.getUserInfo().orgId
    this.areaCode = window.parent.indexTool.getUserInfo().areaCode
  },
  activated () {
    // 判断联通情况
    let { provinceId } = window.parent.indexTool.getUserInfo()
    if (this.notSupportAreaIdArr.includes(provinceId)) {
      this.isOpening = false
      return;
    }

    this.isOpening = true

    this.page = 1
  },
  methods: {
    async getdit () {
      this.yesNoList = await this.getDictionaries('YESNO')
    },
    // 新增
    toNew () {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          holle: 'yes',
          isadd: 'sd',
          type: 'add',
          isOtherAdd: '12',
          isOffSite: 1 // 从异地页面过去
        }
      })
    },
    //   编辑
    edit (text, obj, index) {
      let { nowkey } = this
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          childtypedisabled: 1,
          id: obj.id,
          type: 'edit',
          isOtherEdit: '12',
          isOtherRedit: true,
          isOffSite: 1, // 从异地页面过去
          clickSourceType: nowkey == '1' ? 'continue' : '' // 点击的按钮类别：continue继续办理
        }
      })
    },
    // 驳回编辑
    retuedit (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 1,
          childtypedisabled: 1,
          isreject: true,
          id: obj.addUnattendedId,
          isOffSite: 1 // 从异地页面过去
        }
      })
    },
    //   撤回
    returnBack (text, obj, index) {
      this.$router.push({
        name: 'noonesupportfact',
        query: {
          status: 3,
          childtypedisabled: 1,
          id: obj.addUnattendedId,
          isdisabled: 1,
          currentStatus: obj.status,
          isOffSite: 1 // 从异地页面过去
        }
      })
    },
    //   查看
    see (text, obj, index) {
      this.$router.push({
        name: 'otherInformation',
        query: {
          obj: JSON.stringify(obj),
          nowkey: '1',
          childType: '1',
          isOffSite: 1 // 从异地页面过去
        }
      })
    },
    async dels (obj) {
      let params = {
        addUnattendedId: obj.addUnattendedId
      }
      const url = 'AddUnattendedChildApi/deleteUnattendedChildAnotherPlace'
      params = {
        addUnattendedId: obj.id
      }
      const data = await this.post(url, params
      )
      if (!data.errors) {
        this.$message.success('删除成功')
        this.handleSubmit()
      }
    },
    otherRemove (e) {
      const _self = this
      _self.post('AddUnattendedChildApi/backToUnattendedChild', {
        addUnattendedId: e.addUnattendedId
      }).then(res => {
        if (!res.errors) {
          _self.$message.success('退回成功!')
          _self.handleSubmit()
        }
      })
    },
    typechange2 (val) {
      this.tableData = []
      this.nowkey = val.target.value
      this.handleSubmit()
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const formData = this.searchForm.getFieldsValue()
      formData.pageFlag = 1
      formData.orgId = this.orgId
      formData.areaCode = this.areaCode
      formData.dataStatus = this.nowkey
      this.changetime(formData)
      return formData
    },
    resetFrom () {
      this.value = []
      this.searchForm.resetFields()
      this.handleSubmit('search')
    }
  }
}
</script>
<style scoped lang='less'>
.spilwid3 {
  width: 300px;
}

.container-not-support {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
</style>
