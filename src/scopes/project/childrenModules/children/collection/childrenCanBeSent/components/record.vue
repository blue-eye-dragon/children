<template>
  <div style="height:100%">
    <div class="visitbtn"
         v-if="!basedisabled">
      <ta-button type="primary"
                 class="addbtn"
                 @click="addAdoption">新增</ta-button>
      <ta-popconfirm title="确定删除吗?"
                     @confirm="Batchdeletion"
                     okText="确定"
                     cancelText="取消">
        <ta-button type="danger"
                   :disabled="isdisabled">批量删除</ta-button>
      </ta-popconfirm>
    </div>
    <div>
      <ta-table class="tables"
                :columns="tableColumns"
                :dataSource="showlist"
                :showOverflowTooltip="true"
                :rowSelection="rowSelection">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="val,obj,index"
             class="btnlist">
          <span @click="see(val,obj,index)"
                class="com_textsee">查看</span>
          <span @click="edit(val,obj,index)"
                v-if="!basedisabled"
                class="com_textedit">编辑</span>
          <ta-popconfirm title="确定删除吗?"
                         @confirm="deletes(val,obj,index)"
                         okText="确定"
                         cancelText="取消">
            <span class="com_textdel">删除</span>
          </ta-popconfirm>
        </div>
      </ta-table>
      <ta-pagination class='pagination'
                     showSizeChanger
                     showQuickJumper
                     @showSizeChange="showSizeChange"
                     @change="pagechange"
                     :total="total" />
    </div>
    <ta-drawer title="笔录信息"
               width="500"
               placement="right"
               @close="onClose"
               :getContainer="setContainer"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="询问时间"
                      fieldDecoratorId="enquireDate"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择询问时间'}">
          <ta-date-picker :disabled="idedit"
                          style="width: 100%;"
                          :disabledDate="disabledDate"
                          :placeholder="idedit?'':'请选择询问时间'" />
        </ta-form-item>
        <ta-form-item label="询问地点"
                      fieldDecoratorId="enquirePlace"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.enquirePlace">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入询问地点'" />
        </ta-form-item>
        <ta-form-item label="询问人员"
                      fieldDecoratorId="enquirePerson"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.enquirePerson">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入询问人员'" />
        </ta-form-item>
        <ta-form-item label="询问人员职务"
                      fieldDecoratorId="enquirePersonPostion"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.enquirePersonPostion">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入询问人员职务'" />
        </ta-form-item>
        <ta-form-item label="被询问人员"
                      fieldDecoratorId="enquiredPerson"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.enquiredPerson">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入被询问人员'" />
        </ta-form-item>
        <ta-form-item label="被询问人员与申请者关系"
                      fieldDecoratorId="withAdoptorRelationShip"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.withAdoptorRelationShip">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入被询问人员与申请者关系'" />
        </ta-form-item>
        <ta-form-item label="被询问人员与送养人关系"
                      fieldDecoratorId="withPlacingOutPersonRelationShip"
                      :fieldDecoratorOptions="rules.withPlacingOutPersonRelationShip"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入被询问人员与送养人关系'" />
        </ta-form-item>
        <ta-form-item label="被询问人员与被收养人关系"
                      fieldDecoratorId="withAdopteeRelationShip"
                      :fieldDecoratorOptions="rules.withAdopteeRelationShip"
                      :labelCol="{ span: 6 }">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入被询问人员与被收养人关系'" />
        </ta-form-item>
        <ta-form-item label="记录人员"
                      fieldDecoratorId="recordPerson"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.recordPerson">
          <ta-input :disabled="idedit"
                    :placeholder="idedit?'':'请输入记录人员'" />
        </ta-form-item>
        <ta-form-item label="询问笔录"
                      fieldDecoratorId="enquireRecord"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="rules.enquireRecord">
          <ta-textarea :disabled="idedit"
                       :placeholder="idedit?'':'请输入询问笔录'"
                       :rows="2" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily"
                   v-if="!idedit"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>
<script>
import localList from '@component/common/js/mixins/localList'
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
    title: '询问时间',
    width: '20%',
    dataIndex: 'enquireDate'
  },
  {
    title: '询问地点',
    width: '20%',
    dataIndex: 'enquirePlace'
  },
  {
    title: '询问人员',
    width: '20%',
    dataIndex: 'enquirePerson'
  },
  {
    title: '被询问人员',
    width: '20%',
    dataIndex: 'enquiredPerson'
  },
  {
    title: '记录人员',
    width: '20%',
    dataIndex: 'recordPerson'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [localList],
  props: {
    notesRecordVos: {
      type: Array,
      required: true
    },
    basedisabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      tableColumns,
      isdisabled: true,
      visible: false,
      idedit: false,
      rules: {
        enquirePlace: this.verificationRules('询问地点', 70),
        enquirePerson: this.verificationRules('询问人员', 72),
        enquirePersonPostion: this.verificationRules('询问人员职务', 50),
        withAdoptorRelationShip: this.verificationRules('被询问人员与申请者关系', 50),
        withPlacingOutPersonRelationShip: this.verificationRulesNotMustFill('被询问人员与送养人关系', 50),
        withAdopteeRelationShip: this.verificationRulesNotMustFill('被询问人员与送养人关系', 50),
        enquiredPerson: this.verificationRules('被询问人员', 72),
        recordPerson: this.verificationRules('记录人员', 72),
        enquireRecord: this.verificationRules('询问笔录', 70, true)
      },
      tablename: 'notesRecordVos'
    }
  },
  activated () {
    this.visible = false
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // QUESTIONWITHADOPTEE
    // 日期处理
    dateprocessing (data) {
      data.enquireDate = this.moment(data.enquireDate, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped lang="less">
.tables {
  margin-top: 17px;
}
.addbtn {
  margin-right: 15px;
}
.btnlist span {
  cursor: pointer;
}
</style>
