<template>
  <div class="searchdata tadrawer">
    <ta-border-layout :layout="{ header: '0px', footer: '80px' }">
      <div>
        <div class="searchcont">
          <ta-form
            layout="inline"
            :autoFormCreate="
              (searchForm) => {
                this.searchForm = searchForm;
              }
            "
          >
            <ta-form-item
              label="培训形式"
              class="spilwid"
              :labelCol="{ span: 9 }"
              :wrapperCol="{ span: 15 }"
              fieldDecoratorId="trainingForm"
            >
              <ta-select placeholder="请选择培训形式">
                <ta-select-option value>全部</ta-select-option>
                <ta-select-option
                  v-for="(item, index) in pxList"
                  :key="index"
                  :value="item.value"
                  >{{ item.label }}</ta-select-option
                >
              </ta-select>
            </ta-form-item>

            <ta-form-item
              label="培训日期"
              class="spilwid3"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 16 }"
              fieldDecoratorId="trainingDate"
            >
              <ta-range-picker />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button
                  class="search"
                  icon="search"
                  @click="handleSubmit('search')"
                  >查询</ta-button
                >
                <ta-button
                  class="btnleft reset"
                  icon="reload"
                  @click="resetFrom"
                  >重置</ta-button
                >
              </div>
            </ta-form-item>
          </ta-form>
        </div>

        <div class="operateBtn">
          <ta-button type="primary" icon="plus" @click="add">新增</ta-button>
          <!-- <ta-button class="btnleft exportbtn"
                     icon='upload'
                     @click="showModal">导出</ta-button> -->
          <ta-modal
            :centered="false"
            style="top: 25%"
            :visible="showOn"
            @ok="Excel"
            @cancel="handleCancel"
          >
            <div>
              <h3>确认导出查询条件下的全部有效数据吗？</h3>
            </div>
          </ta-modal>
        </div>

        <ta-table
          class="tables table-min-width"
          :showOverflowTooltip="true"
          :columns="tableColumns"
          :dataSource="tableData"
          bordered
        >
          <span slot="num" slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <span slot="trainingDate" slot-scope="a, b, c">
            <span>{{ a ? a.substring(0, 10) : "-" }}</span>
          </span>
          <div slot="action" slot-scope="val, obj, index" class="btnlist">
            <span @click="edit(val, obj, '2')" class="com_textsee">详情</span>

            <span @click="edit(val, obj, '1')" class="com_textedit">修改</span>

            <ta-popconfirm
              title="确定删除吗?"
              @confirm="deletes(val, obj, index)"
              @cancel="cancel"
              okText="确定"
              cancelText="取消"
            >
              <span class="com_textdel">删除</span>
            </ta-popconfirm>
          </div>
        </ta-table>
      </div>
      <div slot="footer">
        <ta-pagination
          :defaultCurrent="page"
          class="pagination"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="tableData"
          :params="userPageParams"
          @change="pagechange"
          :url="mixListOptions.mixGetDataListURL"
          ref="gridPager"
        />
      </div>
    </ta-border-layout>
    <ta-drawer
      :title="type == 0 ? '业务培训' : type == 1 ? '编辑' : '详情'"
      width="500px"
      :closable="false"
      :getContainer="setContainer"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px); overflow: auto; paddingbottom: 53px"
      id="XXX"
    >
      <ta-form
        :autoFormCreate="
          (form) => {
            this.form = form;
          }
        "
        layout="horizontal"
      >
        <ta-form-item
          label="培训内容"
          fieldDecoratorId="trainingContent"
          :require="{ message: '请输入培训内容' }"
          :fieldDecoratorOptions="verificationRules('培训内容', 200, false)"
        >
          <ta-textarea
            :rows="4"
            :disabled="disabled"
            placeholder="请输入培训内容"
          />
        </ta-form-item>
        <div id="CC">
          <ta-form-item
            label="培训日期"
            fieldDecoratorId="trainingDate"
            :require="{ message: '请选择培训日期' }"
          >
            <ta-date-picker
              format="YYYY-MM-DD"
              style="width: 100%"
              :getCalendarContainer="setCalendarContainer"
              :disabled="disabled"
            />
          </ta-form-item>
        </div>
        <ta-form-item
          label="授课老师"
          fieldDecoratorId="instructor"
          :require="{ message: '请输入授课老师' }"
          :fieldDecoratorOptions="{
            rules: [
              { max: 100, whitespace: true, message: '字段最大长度为100' },
            ],
          }"
        >
          <ta-input :disabled="disabled" placeholder="请输入授课老师" />
        </ta-form-item>
        <ta-form-item
          label="培训地点"
          fieldDecoratorId="trainingSite"
          :require="{ message: '请输入培训地点' }"
          :fieldDecoratorOptions="{
            rules: [
              { max: 100, whitespace: true, message: '字段最大长度为100' },
            ],
          }"
        >
          <ta-input :disabled="disabled" placeholder="请输入培训地点" />
        </ta-form-item>
        <ta-form-item label="本院人员数量" fieldDecoratorId="numberOur">
          <ta-input-number
            :disabled="disabled"
            placeholder=" "
            :max="99999"
            :precision="0"
            :min="1"
            style="width: 100%"
          />
        </ta-form-item>
        <ta-form-item label="外院人员数量" fieldDecoratorId="numberTheir">
          <ta-input-number
            :disabled="disabled"
            placeholder=" "
            :precision="0"
            :max="99999"
            :min="1"
            style="width: 100%"
          />
        </ta-form-item>
        <ta-form-item label="社会人员数量" fieldDecoratorId="numberSocial">
          <ta-input-number
            :disabled="disabled"
            placeholder=" "
            :precision="0"
            :max="99999"
            :min="1"
            style="width: 100%"
          />
        </ta-form-item>
        <ta-form-item label="培训形式" fieldDecoratorId="trainingForm">
          <ta-radio-group @change="onChange" :disabled="disabled">
            <ta-radio
              v-for="(item, index) in pxList"
              :value="item.value"
              :key="index"
              >{{ item.label }}</ta-radio
            >
          </ta-radio-group>
        </ta-form-item>
        <ta-form-item
          label="培训教材"
          fieldDecoratorId="trainingMaterials"
          :fieldDecoratorOptions="{
            rules: [{ max: 200, message: '字段最大长度为200' }],
          }"
        >
          <ta-textarea :rows="4" :disabled="disabled" placeholder=" " />
        </ta-form-item>
        <ta-form-item label="授课讲师来源" fieldDecoratorId="sourceLecturers">
          <ta-radio-group @change="onChange" :disabled="disabled">
            <ta-radio
              v-for="(item, index) in lyList"
              :value="item.value"
              :key="index"
              >{{ item.label }}</ta-radio
            >
          </ta-radio-group>
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button key="back" @click="onClose">取消</ta-button>
        <ta-button
          key="submit"
          type="primary"
          v-if="type != 2"
          @click="submit()"
          >确定</ta-button
        >
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
    title: '培训日期',
    width: '10%',
    dataIndex: 'trainingDate',
    scopedSlots: { customRender: 'trainingDate' }
  },
  {
    title: '授课讲师',
    width: '12%',
    dataIndex: 'instructor'
  },
  {
    title: '培训形式',
    dataIndex: 'trainingForm',
    width: '8%',
    collectionType: 'TRAININGFORM'
  },
  {
    title: '培训地点',
    width: '15%',
    dataIndex: 'trainingSite'
  },
  {
    title: '培训内容',
    width: '15%',
    dataIndex: 'trainingContent'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
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
      page: 1,
      size: 10,
      idedit: false,
      visible: false,
      childtypelist: [],
      sexList: [],
      worktudyList: [],
      lyList: [],
      pxList: [],
      showOn: false,
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/staffTraining/list', // 数据列表接口，API地址
        mixAddURL: '/staffTraining/save', // 新增接口
        mixEditURL: '/staffTraining/update', // 编辑接口
        mixDeleteURL: '/staffTraining/updateDelStateById' // 删除接口，API地址
      },
      mixPageRef: 'gridPager',
      type: 0, // 新增（0）、修改（1）、详情（2）的标识符
      disabled: false
    }
  },
  mounted () {
    this.getsex()
    this.getTRAININGFORM()
    this.getlyList()
  },
  methods: {
    setCalendarContainer (trigger) {
      return document.getElementById('CC')
    },

    setContainer () {
      return this.set_Container('tadrawer')
    },

    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 培训形式
    async getTRAININGFORM () {
      const data = await this.getDictionaries('TRAININGFORM')
      this.pxList = data
    },
    // 讲师来源
    async getlyList () {
      const data = await this.getDictionaries('SOURCELECTURERS')
      this.lyList = data
    },

    Excel () {
      var data = this.userPageParams()
      this.exportFile('/rehabilitManage/staffTraining', data)
      this.showOn = false
    },
    showModal () {
      const ss = this.searchForm.getFieldsValue()
      this.showOn = true
    },
    handleCancel (e) {
      this.showOn = false
    },
    add () {
      this.visible = true
      this.nowtype = 1
      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgId: this.orgId,
          orgName: this.orgName
        })
      })
    },
    onClose () {
      this.form.resetFields()
      this.visible = false
      this.type = 0
      this.disabled = false
    },

    other (val) {
      const str = JSON.stringify(val)
      const data = JSON.parse(str)
      data.birthday = moment(data.birthday)
      data.applicationDate = moment(data.applicationDate)
      return data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {},
    goadd () {
      this.$router.push({
        name: 'newChildren'
      })
    },
    addAdoption (e, obj, index) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'educationDetail',
        params: {
          obj: str
        }
      })
    },
    onChange (e) {},
    edit (val, obj, tp) {
      this.type = 1
      if (tp == '2') {
        this.type = 2
        this.disabled = true
      }
      const str = JSON.stringify(obj)
      obj = JSON.parse(str)
      this.id = obj.id
      this.visible = true
      this.nowtype = 2
      if (obj.trainingDate) {
        obj.trainingDate = moment(obj.trainingDate, 'YYYY-MM-DD')
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(obj)
      })
    }
  }
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 430px;
}
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
