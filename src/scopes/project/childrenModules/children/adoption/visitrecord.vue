<template>
  <div style="height:100%"
       class='tadrawer'>
    <ta-border-layout :layout="{header:'68px'}">
      <div slot="header">
        <div class="visitbtn">
          <ta-button type="primary"
                     @click="add">添加回访记录</ta-button>
          <ta-button class="backs"
                     @click="goback">返回</ta-button>
        </div>
      </div>
      <div>
        <ta-table bordered
                  class="tables table-min-width"
                  :showOverflowTooltip="true"
                  :rowSelection="mixRowSelection"
                  :columns="tableColumns"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist btnponter">
            <span @click="edit(val, obj, index)"
                  class="com_textedit">编辑</span>
            <span @click="see(val, obj, index)"
                  class="com_textsee">查看</span>
            <span @click="deletes(val, obj, index)"
                  class="com_textdel">删除</span>
          </div>
        </ta-table>
        <ta-pagination :defaultCurrent="page"
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
    <ta-drawer title="回访记录"
               width="500"
               placement="right"
               @close="onClose"
               :getContainer="setContainer"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="儿童姓名"
                      fieldDecoratorId="childName"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.childName">
          <ta-input :disabled="true"
                    placeholder="请输入儿童姓名" />
        </ta-form-item>
        <ta-form-item label="回访日期"
                      fieldDecoratorId="visitDate"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择回访日期'}">
          <ta-date-picker :disabledDate="disabledStartDate"
                          :disabled="idedit"
                          style="width: 100%;"
                          placeholder="请选择回访日期" />
        </ta-form-item>
        <ta-form-item label="回访方式"
                      fieldDecoratorId="visitType"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择回访方式'}">
          <ta-select :disabled="idedit"
                     placeholder="请选择回访方式">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in modelist"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="回访情况"
                      fieldDecoratorId="visitContent"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.visitContent">
          <ta-textarea :disabled="idedit"
                    :rows="4"
                    placeholder="请输入回访情况" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="submit"
                   v-if='!idedit'
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
    title: '儿童姓名',
    width: '13%',
    dataIndex: 'childName'
  }, {
    title: '回访日期',
    width: '13%',
    dataIndex: 'visitDate'
  }, {
    title: '回访方式',
    dataIndex: 'visitType',
    width: '13%',
    collectionType: 'RETURNVISITMODE'
  }, {
    title: '回访情况',
    width: '26%',
    dataIndex: 'visitContent'
  }, {
    title: '登记机构',
    width: '13%',
    dataIndex: 'orgName'
  }, {
    title: '登记人员',
    width: '13%',
    dataIndex: 'createUser'
  }, {
    title: '登记日期',
    width: '13%',
    dataIndex: 'createDate'
  }, {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 220,
    scopedSlots: { customRender: 'action' }
  }]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      visible: false,
      idedit: false,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/adoption/visitRecordList', // 数据列表接口，API地址
        mixEditURL: '/adoption/updateVisitRecord',
        mixAddURL: '/adoption/saveVisitRecord',
        mixDeleteURL: '/adoption/deleteVisitRecordById', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      rules: {
        childName: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入儿童姓名' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        visitContent: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入回访情况' },
            { max: 70, message: '最大输入70个字符' }
          ]
        },
        orgName: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入登记机构' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        createUser: {
          validateTrigger: ['blur', 'change'],
          rules: [
            { required: true, message: '请输入登记人员' },
            { max: 72, message: '最大输入72个字符' }
          ]
        }
      },
      queryid: '',
      childId: '',
      registrationAdoptionId: '',
      modelist: []
    }
  },
  activated () {
    this.queryid = this.$route.query.id
    this.registrationAdoptionId = this.$route.query.registrationAdoptionId
    this.childId = this.$route.query.childId
    this.childName = this.$route.query.adoptorName
  },
  mounted () {
    this.getmode()
  },
  methods: {
    disabledStartDate (current) {
      return current && current > moment().endOf('day')
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 回访方式 RETURNVISITMODE
    async getmode () {
      const data = await this.getDictionaries('RETURNVISITMODE')
      this.modelist = data
    },
    // 增加按钮
    add () {
      this.fileList = []
      this.idedit = false
      // this.form.resetFields()
      this.visible = true
      this.nowtype = 1
      this.$nextTick(() => {
        this.form.setFieldsValue({
          childName: this.childName
        })
      })
    },
    other (obj) {
      obj.visitDate = moment(obj.visitDate)
      return obj
    },
    goback () {
      this.$router.go(-1)
    },
    userPageParams () {
      return {
        registrationAdoptionId: this.registrationAdoptionId
      }
    },
    addother (obj) {
      obj.registrationAdoptionId = this.queryid
      obj.childId = this.childId
      return obj
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.backs {
  margin-left: 20px;
}
</style>
