<template>
  <div class="searchdata">
    <ta-border-layout :layout="{header:'0px',footer:'80px'}">
      <div>
        <div class="searchcont">
          <ta-form layout="inline"
                   :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
            <ta-form-item label="助养人/组织"
                          class='spilwid'
                          :labelCol="{span:9}"
                          :wrapperCol="{span:15}"
                          fieldDecoratorId="sponsorOrOrganizeName">
              <ta-input />
            </ta-form-item>
            <ta-form-item>
              <div class="searchButton">
                <ta-button class="search"
                           icon="search"
                           @click="handleSubmit('search')">查询</ta-button>
                <ta-button class="btnleft reset"
                           icon="reload"
                           @click="resetFrom">重置</ta-button>
              </div>

            </ta-form-item>
          </ta-form>
        </div>
        <ta-table bordered
                  class="tables table-min-width"
                  :columns="tableColumnsInfo"
                  :dataSource="tableData">
          <span slot="num"
                slot-scope="val, obj, index">
            <span>{{ size * (page - 1) + index + 1 }}</span>
          </span>
          <span slot="sponsorshipStatus"
                slot-scope="val, obj, index">
            <span :class="val=='助养中'?'com_inaudit':'no_submit'">{{val }}</span>
          </span>
          <div slot="action"
               slot-scope="val, obj, index"
               class="btnlist">
            <span @click="conformSponsorship(obj)"
                  v-if="obj.sponsorshipStatus=='待助养'"
                  class="com_polish">确定助养儿童</span>
            <span @click="relieveSponsorship(obj)"
                  v-if="obj.sponsorshipStatus=='助养中'"
                  class="com_relieve">解除助养关系</span>
          </div>
        </ta-table>
      </div>
      <div slot="footer">

        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="tableData"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       ref="gridPager" />
        <ta-modal title="确定助养儿童"
                  @cancel="onClose1"
                  :visible="visible1"
                  width="90%">

          <ta-form layout="horizontal"
                   :autoFormCreate="(identifySponsoredChildren)=>{this.identifySponsoredChildren = identifySponsoredChildren}">
            <ta-row>
              <ta-col :span="14">
                <ta-form-item label="选择儿童"
                              :labelCol="{span:10}"
                              :wrapperCol="{span:12}"
                              fieldDecoratorId="searchdataof">
                  <ta-input :disabled="disabled"
                            placeholder="快捷查找儿童" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="10">
                <ta-form-item>
                  <ta-button type="primary"
                             @click="conditionSearch()">查询</ta-button>
                  <ta-button type="primary"
                             @click="add"
                             style="margin-left:5px">全部添加</ta-button>
                  <ta-button type="primary"
                             @click="showModal"
                             style="margin-left:5px">查找全部儿童</ta-button>
                </ta-form-item>
              </ta-col>
            </ta-row>
            <ta-form-item label="助养儿童"
                          fieldDecoratorId="sponsorshipChildrenId"
                          :required="true"
                          :validateStatus='tag.length == "0"?"error":""'
                          :help='!ishelp?"请选择儿童":""'>
              <div class="chosechild">
                <div v-for="(item,index) in tag"
                     :key="index"
                     :value="item.childNumber"
                     class="children">
                  {{item.name}}
                  <ta-popconfirm title="确定删除吗?"
                                 @confirm="del(index)"
                                 @cancel="cancel"
                                 okText="确定"
                                 cancelText="取消">
                    <ta-icon class="dels"
                             type="close" />
                  </ta-popconfirm>
                </div>
              </div>
            </ta-form-item>
            <ta-form-item label="助养关系确定日期"
                          :validateStatus='!isensureValue?"error":""'
                          :help='!isensureValue?"请选择关系确定日期":""'
                          :required="true">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="disabled"
                              placeholder="请选择助养关系确定日期"
                              v-model="ensureValue"
                              :disabledDate="disabledEnsureDate"
                              @change="determineDateChange" />
            </ta-form-item>
            <ta-form-item label="助养关系开始日期"
                          :validateStatus='!isstartValue?"error":""'
                          :help='!isstartValue?"请选择关系开始日期":""'
                          :required="true">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="disabled"
                              placeholder="请选择助养关系开始日期"
                              v-model="startValue"
                              :disabledDate="disabledStartDate"
                              @change="startDateChange" />
            </ta-form-item>
            <ta-form-item label="助养关系结束日期"
                          :validateStatus='!isendValue?"error":""'
                          :help='!isendValue?"请选择关系结束日期":""'
                          :required="true">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="disabled"
                              placeholder="请选择助养关系结束日期"
                              v-model="endValue"
                              :disabledDate="disabledEndDate"
                              @change="endDateChange" />
            </ta-form-item>
            <!-- </ta-row> -->
          </ta-form>
          <div slot="footer">
            <ta-button :style="{
                  marginRight: 8,
                }"
                       @click="onClose1">取消</ta-button>
            <ta-button @click="submit"
                       type="primary">确定</ta-button>
          </div>
          <ta-modal title="查询儿童"
                    :visible="visible3"
                    width="95%"
                    :confirmLoading="confirmLoading"
                    @cancel="handleCancel"
                    :footer="null">
            <ChoiceChildren v-if='visible3'
                            :url="url"
                            :searchdata="searchdata"
                            @addsure="addsure"
                            :tableColumns="tableColumns"></ChoiceChildren>
          </ta-modal>
        </ta-modal>

        <ta-modal title="解除助养儿童"
                  width="950px"
                  @cancel="onClose2"
                  :visible="visible2">
          <ta-form layout="horizontal"
                   :autoFormCreate="(removeIdentifySponsoredChildren)=>{this.removeIdentifySponsoredChildren = removeIdentifySponsoredChildren}">
            <ta-form-item>
              <ta-button type="danger"
                         @click="removeBatch()">批量解除</ta-button>
            </ta-form-item>
            <ta-form-item label="助养儿童"
                          fieldDecoratorId="sponsorshipChildrenId">
              <div class="chosechild">
                <div v-for="(item,index) in childrenListObj"
                     :key="index"
                     :value="item.name"
                     class="children">
                  {{item.name}}
                  <ta-popconfirm title="确定添加吗?"
                                 @confirm="addOrAdded(index)"
                                 @cancel="cancel"
                                 okText="确定"
                                 cancelText="取消">
                    <ta-button type="primary"
                               size="small"
                               v-if="item.ifAdd=='false'">添加</ta-button>
                    <ta-button type="primary"
                               size="small"
                               v-if="item.ifAdd=='true'"
                               disabled>已添加</ta-button>
                  </ta-popconfirm>
                </div>
              </div>
            </ta-form-item>
            <ta-form-item label="解除关系"
                          fieldDecoratorId="cancelRation"
                          :required="true">
              <div class="cancelRationWindow"
                   v-for="(item,index) in singleAdd"
                   :key="index"
                   :value="item.val">
                <div class="cancelRationPerson">
                  <span style="margin-right:10px">助养儿童</span>
                  <span v-for="(val,index) in item.arr"
                        :key="index"
                        :value="item.val"
                        style="margin-right:10px;border:1px solid #fff">{{val.name}}</span>
                </div>
                <div class="cancelContent">
                  <ta-form-item label="解除助养关系原因"
                                :fieldDecoratorId="'removeReason'+index"
                                :labelCol="{span:5}"
                                :wrapperCol="{span:19}"
                                :require="{message:'请输入解除助养关系原因'}">
                    <ta-textarea style="width:100%"
                                 placeholder="请输入解除助养关系原因"></ta-textarea>
                  </ta-form-item>
                  <ta-form-item label="助养关系解除日期"
                                :fieldDecoratorId="'removeDate' +index"
                                :labelCol="{span:5}"
                                :wrapperCol="{span:19}"
                                :require="{message:'请选择助养关系解除日期'}">
                    <ta-date-picker style="width: 100%;"
                                    format="YYYY-MM-DD"
                                    :disabled="disabled"
                                    :valid-now-time="'right'"
                                    placeholder="请选择助养关系解除日期" />
                  </ta-form-item>
                </div>
              </div>
            </ta-form-item>
            <ta-form-item label="已添加儿童"
                          fieldDecoratorId="sponsorshipRelationId"
                          :validateStatus='removerChildrenList.length == "0"?"error":""'
                          :help='!isRemove?"请添加儿童":""'
                          :required="true">
              <div class="chosechild">
                <div v-for="(item,index) in removerChildrenList"
                     :key="index"
                     :value="item.val"
                     class="children">
                  {{item.name}}
                  <ta-popconfirm title="确定删除吗?"
                                 @confirm="delRemoverChildren(item)"
                                 @cancel="cancel"
                                 okText="确定"
                                 cancelText="取消">
                    <ta-icon class="dels"
                             type="close" />
                  </ta-popconfirm>
                </div>
              </div>
            </ta-form-item>
          </ta-form>
          <div slot="footer">
            <ta-button :style="{
              marginRight: 8,
            }"
                       @click="onClose2">关闭</ta-button>
            <ta-button @click="removeSubmit"
                       type="primary">保存</ta-button>
          </div>
        </ta-modal>
        <!-- 批量解除弹出框 -->
        <ta-modal title="批量解除"
                  width="850px"
                  @cancel="removeBatchClose"
                  :visible="visible4">
          <ta-form layout="horizontal"
                   :autoFormCreate="(removeBatchForm)=>{this.removeBatchForm = removeBatchForm}">
            <ta-form-item label="已添加儿童"
                          :validateStatus='removeBatchChildrenList.length == "0"?"error":""'
                          :help='!isRemoveLen?"请选择儿童":""'
                          :required="true">
              <div class="chosechild">
                <div v-for="(item,index) in removeBatchChildrenList"
                     :key="index"
                     :value="item.val"
                     class="children">
                  {{item.name}}
                  <ta-popconfirm title="确定删除吗?"
                                 @confirm="delRemoverBatchChildren(item)"
                                 @cancel="cancel"
                                 okText="确定"
                                 cancelText="取消">
                    <ta-icon class="dels"
                             type="close" />
                  </ta-popconfirm>
                </div>
              </div>
            </ta-form-item>
            <ta-form-item label="解除助养关系原因"
                          fieldDecoratorId="removeReasonBatch"
                          :require="{message:'请输入解除助养关系原因'}">
              <ta-textarea style="width:100%"></ta-textarea>
            </ta-form-item>
            <ta-form-item label="助养关系解除日期"
                          fieldDecoratorId="removeDateBatch"
                          :require="{message:'请选择助养关系解除日期'}">
              <ta-date-picker style="width: 100%;"
                              format="YYYY-MM-DD"
                              :disabled="disabled"
                              :valid-now-time="'right'"
                              placeholder="请选择助养关系解除日期" />
            </ta-form-item>
          </ta-form>
          <div slot="footer">
            <ta-button :style="{
                marginRight: 8,
              }"
                       @click="removeBatchClose">关闭</ta-button>
            <ta-button @click="removeBatchSubmit"
                       type="primary">保存</ta-button>
          </div>
        </ta-modal>

      </div>
    </ta-border-layout>
  </div>
</template>

<script>
import listMixin from '@component/common/js/mixins/listMixin'
import ChoiceChildren from '@component/common/components/ChoiceChildren'
import moment from 'moment'
const tableColumnsInfo = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '助养人/组织',
    dataIndex: 'sponsorOrOrganizeName',
    width: '8%',
    overflowTooltip: true
  },
  {
    title: '助养方类型',
    overflowTooltip: true,
    width: '8%',
    dataIndex: 'sponsorPartyType',
    collectionType: 'SPONSORPARTYTYPE'
  },
  {
    title: '所在地',
    overflowTooltip: true,
    width: '8%',
    dataIndex: 'location'
  },
  {
    title: '审核意见',
    overflowTooltip: true,
    width: '8%',
    dataIndex: 'auditOpinion'
  },
  {
    title: '助养儿童',
    overflowTooltip: true,
    width: '8%',
    dataIndex: 'sponsorshipChildren'
  },
  {
    title: '助养状态',
    overflowTooltip: true,
    width: '8%',
    scopedSlots: { customRender: 'sponsorshipStatus' },
    dataIndex: 'sponsorshipStatus'
  },
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
  name: 'helpRelation',
  components: {
    ChoiceChildren
  },
  data () {
    return {
      tableColumnsInfo,
      tableData: [],
      page: 1,
      size: 10,
      disabled: false,
      mixListOptions: {
        mixGetDataListURL: '/sponsorshipRelation/sponsorshipRelationList' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',
      // 确定助养儿童弹出框按钮
      visible1: false,
      // 解除助养儿童关闭按钮
      visible2: false,
      // 确定助养儿童查询按钮弹出框
      visible3: false,
      // 批量解除弹出框
      visible4: false,
      confirmLoading: false,
      tableColumns: [
        {
          title: '序号',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '儿童姓名',
          dataIndex: 'name'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          collectionType: 'SEX'
        },
        {
          title: '出生日期',
          dataIndex: 'birthday'
        },
        {
          title: '儿童类别',
          dataIndex: 'childType',
          collectionType: 'CHILDCATEGORYA'
        },
        {
          title: '主患病状态',
          dataIndex: 'illnessType',
          // collectionType: 'ILLNESSTYPE'
          scopedSlots: { customRender: 'illnessType' }
        },
        {
          title: '身份证号',
          dataIndex: 'idCard'
        },
        {
          title: '操作',
          overflowTooltip: false,
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: '/sponsorshipRelation/queryChildList',
      searchdata: {},
      tag: [],
      sponsorshipId: '',
      childrenListObj: [],
      removerChildrenList: [],
      removeBatchChildrenList: [],
      singleAdd: [],
      index: 0,
      ishelp: true,
      isensureValue: true,
      isstartValue: true,
      isendValue: true,
      startValue: null,
      endValue: null,
      endOpen: false,
      ensureValue: null,
      ifensureValue: true,
      isRemoveLen: true,
      isRemove: true
    }
  },
  activated () {

  },
  mounted () { },
  methods: {
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (current) {
      // 不能选择今天以及今天以前的日期
      return current && current < moment().endOf('day')
    },
    disabledDateTime () {
      // 返回不可选的时间集合
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56]
      }
    },

    disabledEnsureDate (ensureValue) {
      const startValue = this.startValue
      const endValue = this.endValue
      if ((!startValue && !endValue) || !ensureValue) {
        return false
      }
      if (!startValue && endValue) {
        return ensureValue.valueOf() >= endValue.valueOf()
      }
      return startValue.valueOf() <= ensureValue.valueOf()
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue
      const ensureValue = this.ensureValue
      if (!startValue || (!endValue && !ensureValue)) {
        return false
      }
      if (ensureValue && !endValue) {
        return startValue.valueOf() <= this.ensureValue.valueOf()
      }
      if (endValue && !this.ensureValue) {
        return startValue.valueOf() >= endValue.valueOf()
      }
      if (this.ensureValue && endValue) {
        return startValue.valueOf() >= endValue.valueOf() || startValue.valueOf() <= this.ensureValue.valueOf()
      }
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      const ensureValue = this.ensureValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    determineDateChange (date, dateString) {
      this.isensureValue = true
    },
    startDateChange (date, dateString) {
      this.isstartValue = true
    },
    endDateChange (date, dateString) {
      this.isendValue = true
    },

    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    addAdoption (e, obj, index) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'helpRelation'
      })
    },
    // 确定助养助养弹出框
    conformSponsorship (obj) {
      this.sponsorshipId = obj.sponsorshipId
      this.visible1 = true
    },

    // 关闭按钮事件
    onClose1 () {
      this.visible1 = false
      this.tag = []
      this.ensureValue = null
      this.startValue = null
      this.endValue = null
      this.identifySponsoredChildren.resetFields()
    },
    onClose2 () {
      this.visible2 = false
      // this.visible3 = false
      this.childrenListObj = []
      this.singleAdd = []
      this.removerChildrenList = []
      this.removeIdentifySponsoredChildren.resetFields()
    },
    // 确定助养儿童-查找全部儿童按钮弹出框显示
    showModal () {
      this.searchdata.name = ''
      this.visible3 = true
    },
    // 确定助养儿童-查询按钮后-关闭事件
    handleCancel (e) {
      this.visible3 = false
    },
    addsure (val) {
      var conflictnames = []
      val.map(item => {
        this.tag.map((itemof, index) => {
          if (itemof.childId == item.childId) {
            this.tag.splice(index, 1)
            conflictnames.push(item.name)
          }
        })
        this.tag.push(item)
      })
      this.visible3 = false
      this.ishelp = true
      this.$message.info(conflictnames + '已添加')
    },
    closeTag (e) {
    },
    del (e) {
      this.tag.splice(e, 1)
      if (this.tag.length == 0) {
        this.ishelp = false
      } else {
        this.ishelp = true
      }
    },
    // 确定助养-条件查询按钮
    conditionSearch () {
      const values = this.identifySponsoredChildren.getFieldsValue()
      let searchdataof = values.searchdataof
      this.searchdata.name = searchdataof
      this.visible3 = true
    },
    // 确定助养-全部添加按钮事件
    async add () {
      let data = await this.post('/sponsorshipRelation/queryChildList', {})
      const dataList = data.data.pageBean.list
      this.tag = dataList
      this.ishelp = true
    },
    async submit () {
      let isok = true
      let text = ''
      let url = ''
      let identifySponsoredChildren = []
      let sponsorshipChildrenIds = []
      if (this.tag.length == 0) {
        this.ishelp = false
      } else {
        this.ishelp = true
      }
      if (this.ensureValue == null) {
        this.isensureValue = false
      } else {
        this.isensureValue = true
      }
      if (this.startValue == null) {
        this.isstartValue = false
      } else {
        this.isstartValue = true
      }
      if (this.endValue == null) {
        this.isendValue = false
      } else {
        this.isendValue = true
      }
      this.identifySponsoredChildren.validateFields(async (err, values) => {
        identifySponsoredChildren = values
        if (err) {
          isok = false
        }
      })
      if (isok && this.isensureValue && this.isstartValue && this.isendValue) {
        text = '确定成功'
        url = '/sponsorshipRelation/determine'
        const sponsorshipId = this.sponsorshipId
        this.tag.map(item => {
          sponsorshipChildrenIds.push(item.childId)
        })
        let sponsorshipChildrenId = sponsorshipChildrenIds.join(',')
        const params = {
          ...identifySponsoredChildren,
          sponsorshipId,
          sponsorshipChildrenId,
          determineDate: this.ensureValue.format('YYYY-MM-DD'),
          startDate: this.startValue.format('YYYY-MM-DD'),
          endDate: this.endValue.format('YYYY-MM-DD')
        }
        let data = await this.post(url, params)
        if (data.errors === null) {
          this.$message.success(text)
          this.onClose1()
          this.identifySponsoredChildren.resetFields()
          this.handleSubmit()
        }
      }
    },
    // 点击解除助养儿童-弹出框需要处理的逻辑
    relieveSponsorship (obj) {
      // 助养儿童名称
      let childrenListText = obj.sponsorshipChildren
      var childrenList = childrenListText.split(',')
      // 助养儿童id
      let childrenListIdText = obj.sponsorshipRelationId
      var childrenListId = childrenListIdText.split(',')
      let childrenListObj = this.childrenListObj
      childrenList.map((item, index) => {
        childrenListObj.push({
          name: item,
          val: childrenListId[index],
          ifAdd: 'false'
        })
      })
      this.visible2 = true
    },
    // 解除助养-点击添加按钮的事件
    addOrAdded (idx) {
      this.childrenListObj.map((item, index) => {
        if (idx == index) {
          item.ifAdd = 'true'
          this.removerChildrenList.push(item)

          let arr = []
          arr.push(item)
          let index = this.singleAdd.length
          let data = {
            arr,
            [`removeReason${index}`]: '',
            [`removeDate${index}`]: ''
          }
          this.singleAdd.push(data)
          if (this.removerChildrenList.length != '0') {
            this.isRemove = true
          }
        }
      })
    },
    // 解除助养-已添加儿童-删除事件
    delRemoverChildren (item) {
      this.removerChildrenList.map((itemof, index) => {
        if (itemof == item) {
          item.ifAdd = 'false'
          this.removerChildrenList.splice(index, 1)
          if (this.removerChildrenList.length != '0') {
            this.isRemove = true
          }
        }
      })
      this.singleAdd.map((itemof, index) => {
        if (itemof.arr[0] == item) {
          this.singleAdd.splice(index, 1)
        }
      })
    },
    // 点击批量解除按钮事件
    removeBatch () {
      this.visible4 = true
      this.removeBatchChildrenList = []
      this.childrenListObj.map(item => {
        if (item.ifAdd == 'false') {
          this.removeBatchChildrenList.push(item)
        }
      })
    },
    // 批量解除弹窗关闭按钮
    removeBatchClose () {
      this.visible4 = false
      this.removeBatchChildrenList = []
      this.removeBatchForm.resetFields()
    },
    // 批量删除-已添加儿童的删除按钮事件
    delRemoverBatchChildren (item) {
      this.removeBatchChildrenList.map((itemof, index) => {
        if (item == itemof) {
          this.removeBatchChildrenList.splice(index, 1)
        }
      })
      if (this.removeBatchChildrenList.length == 0) {
        this.isRemoveLen = false
      }
    },
    // 批量删除弹出框保存按钮事件
    removeBatchSubmit () {
      let removeBatchFormValue
      let isok = true
      this.removeBatchForm.validateFields(async (err, values) => {
        removeBatchFormValue = values
        if (err) {
          isok = false
        }
      })
      if (isok) {
        let index = this.singleAdd.length
        let data = {
          arr: this.removeBatchChildrenList,
          [`removeReason${index}`]: removeBatchFormValue.removeReasonBatch,
          [`removeDate${index}`]: removeBatchFormValue.removeDateBatch
        }
        let removeReasonof = `removeReason${index}`
        let removeDateof = `removeDate${index}`
        this.singleAdd.push(data)

        this.removerChildrenList = this.removerChildrenList.concat(this.removeBatchChildrenList)
        if (this.removerChildrenList.length != '0') {
          this.isRemove = true
        }
        this.removeBatchChildrenList.map(item => {
          this.childrenListObj.map(itemof => {
            if (item == itemof) {
              itemof.ifAdd = 'true'
            }
          })
        })
        this.visible4 = false
        this.removeBatchForm.resetFields()
        this.$nextTick(() => {
          this.removeIdentifySponsoredChildren.setFieldsValue({
            [removeReasonof]: removeBatchFormValue.removeReasonBatch,
            [removeDateof]: removeBatchFormValue.removeDateBatch
          })
        })
      }
    },
    // 确定移除儿童事件
    async removeSubmit () {
      let isok = true
      let text = ''
      let url = ''
      let removeIdentifySponsoredChildrenValue = ''

      let removeReason = []
      let removeDate = []
      let sponsorshipRelationRemoveVoList = []
      let sponsorshipRelationId
      this.removeIdentifySponsoredChildren.validateFields(async (err, values) => {
        removeIdentifySponsoredChildrenValue = values
        if (err) {
          isok = false
        }
      })
      if (this.singleAdd.length == '0') {
        this.isRemove = false
      }
      if (isok && this.isRemove) {
        text = '解除成功'
        url = '/sponsorshipRelation/remove'
        this.singleAdd.map((item, index) => {
          let removeReason = ''
          let removeDate = ''
          let sponsorshipRelationIds = []
          item.arr.map(itemof => {
            sponsorshipRelationIds.push(itemof.val)

            sponsorshipRelationId = sponsorshipRelationIds.join(',')
          })
          let removeReasonobj = [`removeReason${index}`]
          let removeDateobj = [`removeDate${index}`]
          const objKey = Object.keys(removeIdentifySponsoredChildrenValue)
          objKey.map(itemval => {
            if (itemval == removeReasonobj) {
              removeReason = removeIdentifySponsoredChildrenValue[itemval]
            }
            if (itemval == removeDateobj) {
              removeDate = moment(removeIdentifySponsoredChildrenValue[itemval]).format('YYYY-MM-DD')
            }
          })
          sponsorshipRelationRemoveVoList.push({ sponsorshipRelationId, removeReason, removeDate })
        })
        const params = { sponsorshipRelationRemoveVoList }
        let data = await this.post(url, params, true)
        if (data.errors === null) {
          this.$message.success(text)
          this.onClose2()
          this.handleSubmit()
          sponsorshipRelationId = ''
          this.removeIdentifySponsoredChildren.resetFields()
        }
      }
    }

  }
}
</script>

<style scoped lang="less">
.chosechild {
  padding: 11px 15px 0 15px;
  //   border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
  border: 1px solid #636363;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 40px;
  cursor: pointer;
}
.children {
  padding: 0 10px;
  background: rgba(218, 238, 255, 1);
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
  margin-bottom: 11px;
}
.preservation {
  margin-left: 20px;
}
.cancelRationWindow {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
.cancelRationPerson {
  background: #1890ff;
  color: #fff;
  margin-bottom: 10px;
  // border-radius:5px 5px 0 0;
  padding-left: 10px;
}
.cancelContent {
  padding: 10px;
}
</style>
