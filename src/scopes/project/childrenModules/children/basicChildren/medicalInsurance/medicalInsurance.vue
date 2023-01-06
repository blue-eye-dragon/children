<template>
  <div class="searchdata tadrawer">
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
                <ta-form-item label="姓名"
                              class="spilwid"
                              fieldDecoratorId="name"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-input placeholder="请输入姓名" />
                </ta-form-item>
                <ta-form-item label="儿童类别"
                              class="spilwid"
                              fieldDecoratorId="childType"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择儿童类别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in adoptionlist"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="性别"
                              class="spilwid"
                              fieldDecoratorId="sex"
                              :labelCol="{span:9}"
                              :wrapperCol="{span:15}">
                  <ta-select placeholder="请选择性别">
                    <ta-select-option value>全部</ta-select-option>
                    <ta-select-option :value="item.value"
                                      v-for="(item,index) in sexList"
                                      :key="index">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>

                <ta-form-item label="出生日期"
                              class="spilwid3"
                              fieldDecoratorId="birthdayTime"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>

                <ta-form-item label="增员日期"
                              class="spilwid3"
                              fieldDecoratorId="registerDate"
                              :labelCol="{span:6}"
                              :wrapperCol="{span:18}">
                  <ta-range-picker @change="onSelectTime" />
                </ta-form-item>
              </div>
              <div class="searchbtn">
                <div class="searchButton">
                  <ta-button class="search "
                             icon="search"
                             @click="handleSubmit('search')">查询</ta-button>
                  <ta-button class="btnleft reset"
                             icon="reload"
                             @click="resetFrom">重置</ta-button>
                  <ta-button class="btnleft"
                             style="    width: 109px;"
                             @click="advancedquery">
                    高级查询
                    <ta-icon :type="issearch?'up':'down'" />
                  </ta-button>
                </div>
              </div>
            </div>
          </ta-form>

        </div>

        <div class="operateBtn">
          <ta-button type="primary"
                     icon='plus'
                     :disabled="isdisabled"
                     @click="add">批量录入</ta-button>
        </div>

        <ta-table class="tables table-min-width"
                  bordered
                  :columns="tableColumns"
                  :showOverflowTooltip="true"
                  :dataSource="tableData"
                  :rowSelection="rowSelection">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <a slot="name"
             slot-scope="val,obj,index"
             href="javascript:;"
             @click="childInfo(val,obj,index)">{{obj.name}}</a>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist">
            <span class="com_polish"
                  @click="addAdoption(e,obj,index,1)">录入</span>
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
      </div>
    </ta-border-layout>
    <ta-drawer title="批量录入"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="已选择儿童"
                      :required="true"
                      :fieldDecoratorOptions="{rules: [{ required: false, message: '11' }]}"
                      :labelCol="{ span: 6 }">
          <!-- <div class="border">
             <p v-for="(item,index) in child" :key="index" :value="item"><span>{{item.childName}}</span><span @click="del(index)" class="delColor">X</span></p>
            </div>-->
          <div class="chosechild">
            <div v-for="(item,index) in child"
                 :key="index"
                 :value="item"
                 class="children">
              {{item.childName}}
              <ta-icon class="dels"
                       type="close"
                       @click="del(index)" />
            </div>
          </div>
        </ta-form-item>
        <ta-form-item label="缴费日期"
                      fieldDecoratorId="payTime"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择缴费日期!'}">
          <ta-date-picker style="width: 100%;"
                          :valid-now-time="'right'"
                          placeholder="请选择缴费日期" />
        </ta-form-item>
        <ta-form-item label="类型"
                      fieldDecoratorId="medicalInsuranceType"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择类型!'}">
          <ta-select placeholder="请选择类型">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in medicalInsuranceTypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="周期"
                      fieldDecoratorId="medicalInsuranceCycle"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择周期!'}">
          <ta-select placeholder="请选择周期">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in medicalInsuranceCycleList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="金额"
                      fieldDecoratorId="money"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请输入金额!'}">
          <ta-input-number :min="0"
                           :max="9999999999"
                           placeholder="请输入金额"
                           :precision="2"
                           style="width:100%" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button :style="{
            marginRight: 8,
          }"
                   @click="onClose">取消</ta-button>
        <ta-button @click="subfamily"
                   type="primary">确定</ta-button>
      </div>
    </ta-drawer>
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
    title: '儿童姓名',
    dataIndex: 'name',
    align: 'center',
    width: '24%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    collectionType: 'sex',
    width: '18%'
  },
  {
    title: '出生日期',
    align: 'center',
    dataIndex: 'birthday',
    width: '18%'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    align: 'center',
    collectionType: 'CHILDCATEGORYA',
    width: '24%'
  },
  {
    title: '增员日期',
    align: 'center',
    dataIndex: 'registerDate',
    width: '21%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    align: 'center',
    dataIndex: 'action',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMixin],
  name: 'revoke',
  data () {
    return {
      tableColumns,
      tableData: [],
      page: 1,
      size: 10,
      idedit: false,
      adoptionlist: [],
      sexList: [],
      // 设置属性
      mixListOptions: {
        mixGetDataListURL: '/childMedicalInsurance/list', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      isdisabled: true,
      visible: false,
      // 医疗类型
      medicalInsuranceTypeList: [],
      // 医疗周期
      medicalInsuranceCycleList: [],
      childBaseIds: [],
      childEnterIds: [],
      childIds: [],
      child: [],
      showtwo: true,
      isExpand: false,
      issearch: false
    }
  },
  activated () {
    this.issearch = false
    this.isExpand = false
    this.setHeight('one', 'oneout', !this.issearch, this)
  },
  mounted () {
    this.getchildtype()
    this.getsex()
    this.medicalInsuranceType()
    this.medicalInsuranceCycle()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    filechange () { },
    childInfo (val, obj, index) {
      const param = {
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
    },
    // 多选
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      this.childIds = val2
    },
    add () {
      this.child = []
      this.childBaseIds = []
      this.childEnterIds = []
      this.childIds.map((item, index) => {
        this.child.push({
          childBaseId: item.childBaseId,
          childName: item.name,
          childEnterId: item.childEnterId
        })
      })
      this.visible = true
      this.nowtype = 1
    },
    del (val) {
      this.child.splice(val, 1)
    },
    // 获取儿童类型
    // 儿童类别
    async getchildtype () {
      const data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },
    // 性别列表
    async getsex () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {
    },
    addAdoption (e, obj, index, type) {
      const str = JSON.stringify(obj)
      this.$router.push({
        name: 'input',
        params: {
          obj: str,
          type
        }
      })
    },
    gorecord () {
      this.$router.push({
        name: 'visitrecord'
      })
    },
    async subfamily () {
      this.form.validateFields(async (err, values) => {
        // let params=this.form.getFieldsValue()
        //   console.log(params)
        if (!err) {
          // if (this.nowkey == 1) {
          //   document.getElementById('anchorpoint_d').scrollIntoView(true)
          // }
          const url = ''
          let text = ''
          let aa = ''
          const params = this.form.getFieldsValue()
          this.changetime(params)
          this.child.map((item, index) => {
            this.childBaseIds.push(item.childBaseId)
            this.childEnterIds.push(item.childEnterId)
          })
          aa = this.childEnterIds.join(',')
          if (this.childBaseIds.length == 0) {
            this.$message.error('已选择儿童不能为空')
            return false
          } else {
            params.childBaseIds = this.childBaseIds
            params.childEnterIds = aa
            params.childEnterId = '123'
            // params.childBaseIds = this.childBaseIds
          }

          if (this.nowtype == 1) {
            // 新增
            const res = await this.post(
              '/childMedicalInsurance/saveBatch',
              params
            )
            text = '批量录入成功'
            if (res.errors === null) {
              this.$message.success(text)
              this.onClose()
              if (
                this.mixListOptions.mixActivatedIsNeed &&
                this.mixListOptions.mixGetDataListIsPage
              ) {
                this.handleSubmit()
              } else if (
                this.mixListOptions.mixActivatedIsNeed &&
                !this.mixListOptions.mixGetDataListIsPage
              ) {
                this.getlist()
              }
            }
          }

          // if(data.)
        }
      })
    },
    // 获取医疗保险类型
    async medicalInsuranceType () {
      const data = await this.getDictionaries('MEDICALINSURANCETYPE')
      this.medicalInsuranceTypeList = data
    },
    // // 获取医疗保险周期
    async medicalInsuranceCycle () {
      const data = await this.getDictionaries('MEDICALINSURANCECYCLE')
      this.medicalInsuranceCycleList = data
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
