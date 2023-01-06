<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="姓名"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="name">
            <ta-input placeholder="请输入姓名" />
          </ta-form-item>
          <ta-form-item label="身份证号"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="idCard">
            <ta-input placeholder="请输入身份证号" />
          </ta-form-item>
          <ta-form-item label="申请日期"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:17}"
                        fieldDecoratorId="applicatDate">
            <ta-range-picker />
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')"
                       class="btnleft">查询</ta-button>
            <ta-button @click="resetFrom"
                       class="btnleft">重置</ta-button>
          </ta-form-item>
          <div class="visitbtn">
            <ta-button type="primary"
                       @click="goadd">新增</ta-button>
          </div>
        </ta-form>
        <ta-table class="tables table-min-width"
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
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
          <span slot="illnessType"
                slot-scope="a, b, c">
            <span>{{b.illnessType|typeDataProcess(b.illnessType,tpy="1")}}</span>
          </span>
          <span slot="disabilityType"
                slot-scope="a, b, c">
            <span>{{b.disabilityType|typeDataProcess2}}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="see(val,obj)"
                  class="com_textsee">查看</span>
            <span @click="edit(val,obj)"
                  class="com_textedit">编辑</span>
            <ta-popconfirm title="确定删除吗?"
                           @confirm="deletes(val,obj,index)"
                           @cancel="cancel"
                           okText="确定"
                           cancelText="取消">
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
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
    <ta-drawer title="儿童康复救助"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name">
          <ta-input :disabled="true" />
        </ta-form-item>
        <ta-form-item label="儿童编号"
                      fieldDecoratorId="childNumber">
          <ta-input placeholder=""
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="儿童类别"
                      fieldDecoratorId="childType">
          <ta-select placeholder=""
                     :disabled="true">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in childtypelist"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>

        <ta-form-item label="性别"
                      fieldDecoratorId="sex">
          <ta-select placeholder=""
                     :disabled="true">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in sexList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard">
          <ta-input placeholder=""
                    :disabled="true" />
        </ta-form-item>

        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="true"
                          placeholder="" />
        </ta-form-item>

        <ta-form-item label="申请人"
                      fieldDecoratorId="applicant"
                      :fieldDecoratorOptions="rules.applicant">
          <ta-input placeholder="请输入申请人"
                    :disabled="idedit" />
        </ta-form-item>

        <ta-form-item label="申请日期"
                      fieldDecoratorId="applicatDate"
                      :fieldDecoratorOptions="rules.applicatDate">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="idedit"
                          placeholder="请选择申请日期" />
        </ta-form-item>

        <ta-form-item label="申请事由"
                      fieldDecoratorId="applicationReason"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '' },{validator: fnmustKeep }]}">
          <ta-textarea placeholder="请输入申请事由"
                       :disabled="idedit"
                       :rows="2" />
        </ta-form-item>

        <ta-form-item label="申请康复机构"
                      fieldDecoratorId="applicationRehabilitation"
                      :fieldDecoratorOptions="rules.applicationRehabilitation">
          <ta-input placeholder="请输入申请康复机构"
                    :disabled="idedit"
                    :rows="2" />
        </ta-form-item>

        <ta-form-item label="受理人"
                      fieldDecoratorId="acceptor"
                      :fieldDecoratorOptions="rules.acceptor">
          <ta-input placeholder="请输入受理人"
                    :disabled="idedit"
                    :rows="2" />
        </ta-form-item>
        <ta-form-item label="审核结果"
                      fieldDecoratorId="auditResult"
                      :require="{message:'请选择审核结果'}">
          <ta-select :disabled="idedit"
                     placeholder="请选择审核结果">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in reslutList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   type="primary"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
var that = null
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '姓名',
    width: '18%',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    width: '12%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '身份证号',
    width: '15%',
    dataIndex: 'idCard'
  },
  {
    title: '患病类型',
    width: '18%',
    dataIndex: 'illnessType',
    scopedSlots: { customRender: 'illnessType' }
    // collectionType: 'ILLNESSTYPE'
  },
  {
    title: '残疾类型',
    width: '18%',
    dataIndex: 'disabilityType',
    scopedSlots: { customRender: 'disabilityType' }
    // collectionType: 'DISABILITYTYPE'
  },
  {
    title: '申请日期',
    width: '10%',
    dataIndex: 'applicatDate'
  },
  {
    title: '审核结果',
    width: '10%',
    dataIndex: 'auditResult',
    collectionType: 'RESULT'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    overflowTooltip: false,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  data () {
    return {
      rules: {
        applicant: this.verificationRules('申请人', 72), // { rules: [{ required: true, message: '请选择出生日期' }] },
        applicatDate: this.verificationRules('申请日期', true), // { rules: [{ required: true, message: '请选择民族' }] },
        applicationReason: this.verificationRules('申请事由', 200),
        applicationRehabilitation: this.verificationRules('申请康复机构', 200),
        acceptor: this.verificationRules('受理人', 72)
      },
      tableColumns,
      tableData: [],
      reslutList: [],
      page: 1,
      size: 10,
      idedit: false,
      childtypelist: [],
      sexList: [],
      worktudyList: [],
      disabilitytypeList: [],
      illnesstypeList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/rehabilitationAssistance/getRehabilit', // 数据列表接口，API地址
        mixDeleteURL: '/rehabilitationAssistance/updateDelStateById', // 删除接口，API地址
        mixEditURL: '/rehabilitationAssistance/update' // 编辑接口
      },
      mixPageRef: 'gridPager'
    }
  },
  created () {
    // dom未生成
    that = this
  },
  mounted () {
    this.getchildtype()
    this.getsex()
    this.getreslutList()
    this.getdisabilitytypeList()
    this.getillnesstypeList()
  },
  filters: {

    typeDataProcess (val) {
      let list = that.illnesstypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
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
    typeDataProcess2 (val) {
      let list = that.disabilitytypeList
      let dataShow = ''
      if (val && val.length > 0) {
        let attr = val.split(',')
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
  },
  methods: {
    async getreslutList () {
      let data = await this.getDictionaries('RESULT')
      this.reslutList = data
    },
    fnmustKeep (a, v, callback) {
      let value = v || ''
      this.fnValidateTextarea(200, '申请事由', value, callback)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 获取儿童类型 CHILDCATEGORYA
    async getchildtype () {
      let data = await this.getDictionaries('CHILDCATEGORYA')
      this.childtypelist = data
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 患病类型
    async getillnesstypeList () {
      let data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
    },
    // 残疾类型
    async getdisabilitytypeList () {
      let data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
    },
    other (val) {
      let str = JSON.stringify(val)
      let data = JSON.parse(str)
      data.birthday = moment(data.birthday)
      data.applicatDate = moment(data.applicatDate)
      return data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) { },
    goadd () {
      this.$router.push({
        name: 'newChildren'
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
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
