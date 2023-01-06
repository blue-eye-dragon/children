<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <div>
        <ta-form layout="inline"
                 :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
          <ta-form-item label="出生日期"
                        class="spilwid"
                        :labelCol="{span:7}"
                        :wrapperCol="{span:15}"
                        fieldDecoratorId="birthday">
            <ta-range-picker />
          </ta-form-item>
          <ta-form-item label
                        :labelCol="{span:0}"
                        :wrapperCol="{span:24}"
                        fieldDecoratorId="nameOrIdCardKeyword">
            <ta-input placeholder="请输入姓名或身份证号关键字"
                      style="width: 220px" />
          </ta-form-item>
          <ta-form-item>
            <ta-button type="primary"
                       @click="handleSubmit('search')"
                       class="btnleft">查询</ta-button>
            <ta-button @click="resetFrom"
                       class="btnleft">重置</ta-button>
          </ta-form-item>
        </ta-form>
        <ta-table class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :columns="tableColumns"
                  :dataSource="tableData"
                  bordered>
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val,obj,index"
               class="btnlist">
            <span @click="edit(val,obj)"
                  class="com_polish">确认</span>
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
          <ta-input placeholder=""
                    :disabled="true" />
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
          <!-- :require="{message:'请输入身份证号!'}" -->
          <ta-input placeholder=""
                    :disabled="true" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birthday">
          <ta-date-picker style="width: 100%;"
                          format="YYYY-MM-DD"
                          :disabled="true" />
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
                      :fieldDecoratorOptions="rules.applicationReason">
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
          <ta-select placeholder="请选择审核结果">
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
                   type="primary">确定</ta-button>
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
    title: '儿童类别',
    dataIndex: 'childType',
    width: '18%',
    collectionType: 'CHILDCATEGORYA'
  },
  {
    title: '儿童姓名',
    width: '18%',
    dataIndex: 'name'
  },
  {
    title: '性别',
    width: '16%',
    dataIndex: 'sex',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    width: '17%',
    dataIndex: 'birthday'
  },
  {
    title: '身份证号',
    width: '18%',
    dataIndex: 'idCard'
  },
  {
    title: '增员日期',
    width: '17%',
    dataIndex: 'registerDate'
  },
  // {
  //   title: '审核结果',
  //   dataIndex: 'auditResult',
  //   collectionType: 'RESULT'
  // },
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
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      childtypelist: [],
      sexList: [],
      worktudyList: [],
      reslutList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childInfoApi/pageChildInfo' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      rules: {
        applicant: this.verificationRules('申请人', 72), // { rules: [{ required: true, message: '请选择出生日期' }] },
        applicatDate: this.verificationRules('申请日期', true), // { rules: [{ required: true, message: '请选择民族' }] },
        applicationReason: this.verificationRules('申请事由', 200, true),
        applicationRehabilitation: this.verificationRules('申请康复机构', 200),
        acceptor: this.verificationRules('受理人', 72)
      },
      childId: ''
    }
  },
  mounted () {
    this.getchildtype()
    this.getsex()
    this.getreslutList()
  },
  methods: {
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
    async getreslutList () {
      let data = await this.getDictionaries('RESULT')
      this.reslutList = data
    },
    other (val) {
      let str = JSON.stringify(val)
      let data = JSON.parse(str)
      data.birthday = moment(data.birthday)
      data.applicationDate = moment(data.applicationDate)
      return data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    edit (val, obj) {
      this.idedit = false
      this.childId = obj.childId
      this.visible = true
      this.nowtype = 2
      let str = JSON.stringify(obj)
      let data = JSON.parse(str)
      this.$nextTick(() => {
        data = this.other(data)
        // 其他操作
        this.form.setFieldsValue(data)
      })
    },
    submit () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let params = this.form.getFieldsValue()
          params.childID = this.childId

          let num = await this.post('/serialApi/rehabilitationNumber')

          params.rehabilitationNum = num.data.code
          this.changetime(params)

          let data = await this.post('/rehabilitationAssistance/save', params)

          if (data.errors === null) {
            this.$message.success('增加成功')
            this.onClose()
            this.handleSubmit()
            this.$router.go(-1)
          }
          // if(data.)
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
