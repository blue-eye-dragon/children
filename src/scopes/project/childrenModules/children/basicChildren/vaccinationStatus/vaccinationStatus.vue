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
                  :dataSource="tableData"
                  :showOverflowTooltip="true"
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
                      :labelCol="{ span: 6 }"
                      :required="true"
                      :fieldDecoratorOptions="{rules: [{ required: false, message: '11' }]}">
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
        <ta-form-item label="疫苗名称"
                      fieldDecoratorId="vaccineName"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入疫苗名称'}"
                      :fieldDecoratorOptions="{rules: [{ max: 100, message: '疫苗名称字段最大输入100个字符' }]}">
          <ta-input placeholder="请输入疫苗名称" />
        </ta-form-item>
        <ta-form-item label="疫苗批号"
                      fieldDecoratorId="vaccineBatchNumber"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入疫苗批号'}"
                      :fieldDecoratorOptions="{rules: [{ max: 20, message: '疫苗批号字段最大输入20个字符' }]}">
          <ta-input placeholder="请输入疫苗批号" />
        </ta-form-item>
        <ta-form-item label="接种部位"
                      fieldDecoratorId="inoculationPosition"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入接种部位'}"
                      :fieldDecoratorOptions="{rules: [{ max: 50, message: '接种部位字段最大输入50个字符' }]}">
          <ta-input placeholder="请输入接种部位" />
        </ta-form-item>
        <ta-form-item label="疫苗生产企业"
                      fieldDecoratorId="vaccineProductionEnterprise"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请输入疫苗生产企业'}"
                      :fieldDecoratorOptions="{rules: [{ max: 100, message: '疫苗生产企业字段最大输入100个字符' }]}">
          <ta-input placeholder="请输入疫苗生产企业" />
        </ta-form-item>
        <ta-form-item label="接种人"
                      fieldDecoratorId="vaccinator"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请输入接种人'}"
                      :fieldDecoratorOptions="{rules: [{ max: 72, message: '接种人字段最大输入72个字符' }]}">
          <ta-input placeholder="请输入接种人" />
        </ta-form-item>
        <ta-form-item label="接种单位"
                      fieldDecoratorId="inoculateUnit"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请输入接种单位'}"
                      :fieldDecoratorOptions="{rules: [{ max: 72, message: '接种单位字段最大输入72个字符' }]}">
          <ta-input placeholder="请输入接种单位" />
        </ta-form-item>
        <ta-form-item label="接种日期"
                      fieldDecoratorId="inoculateTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择接种日期'}">
          <ta-date-picker style="width: 100%;"
                          :valid-now-time="'right'"
                          placeholder="请选择接种日期" />
        </ta-form-item>
        <!-- <ta-form-item
          label="提醒"
          fieldDecoratorId="name"
          :labelCol="{ span: 6 }"
          :wrapperCol="{span:18}"
          :require="{message:'请输入提醒!'}"
        >
         <ta-input placeholder="请输入提醒" />
          </ta-form-item>-->
        <ta-form-item label="是否已接种"
                      fieldDecoratorId="isInoculated"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择是否已接种'}">
          <ta-select placeholder="请选择是否已接种"
                     @change="selectchange">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in isInoculatedList"
                              :key="index">{{item.label}}</ta-select-option>>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="未接种原因"
                      fieldDecoratorId="noInoculatedReason"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      v-if="this.showInput==true"
                      :require="{message:'请输入未接种原因'}"
                      :fieldDecoratorOptions="{rules: [{ max: 200, message: '未接种原因字段最大输入200个字符' }]}">
          <ta-textarea placeholder="请输入未接种原因"
                       :rows="4" />
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
    scopedSlots: { customRender: 'name' },
    width: '24%'
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
    dataIndex: 'birthday',
    align: 'center',
    width: '18%'
  },
  {
    title: '儿童类别',
    dataIndex: 'childType',
    collectionType: 'CHILDCATEGORYA',
    width: '24%'
  },
  {
    title: '增员日期',
    dataIndex: 'registerDate',
    align: 'center',
    width: '21%'
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
        mixGetDataListURL: '/childVaccination/list', // 数据列表接口，API地址
        mixDeleteURL: '', // 删除接口，API地址
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      isdisabled: true,
      visible: false,
      // 医疗类型
      medicalInsuranceTypeList: [],
      // 医疗周期
      medicalInsuranceCycleList: [],
      childBaseIds: [],
      childEnterIds: [],
      childIds: [],
      childName: [],
      rowSelection: {
        // 控制选项的属性需要和 onChange 进行配合
        selectedRowKeys: [],
        // 行选择改变事件
        onChange: this.onSelectChange
      },
      showInput: false,
      isInoculatedList: [],
      child: [],
      rules: {
        vaccineName: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入疫苗名称!' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        vaccineBatchNumber: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入疫苗批号!' },
            { max: 20, message: '最大输入20个字符' }
          ]
        },
        inoculationPosition: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入接种部位!' },
            { max: 50, message: '最大输入50个字符' }
          ]
        },
        vaccineProductionEnterprise: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入疫苗生产企业!' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        vaccinator: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入接种人!' },
            { max: 72, message: '最大输入72个字符' }
          ]
        },
        inoculateUnit: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入接种单位!' },
            { max: 100, message: '最大输入100个字符' }
          ]
        },
        noInoculatedReason: {
          validateTrigger: 'blur',
          rules: [
            { required: true, message: '请输入未接种原因!' },
            { max: 200, message: '最大输入200个字符' }
          ]
        }
      },
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
    this.getYESNO()
  },
  methods: {
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 高级查询
    advancedquery () {
      this.isExpand = !this.isExpand
      this.issearch = !this.issearch
      this.setHeight('one', 'oneout', !this.issearch, this)
    },

    // 儿童基本信息
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
    },
    // 获取是否已接种
    async getYESNO () {
      let data = await this.getDictionaries('YESNO')
      this.isInoculatedList = data
    },
    add () {
      this.child = []
      this.childBaseIds = []
      this.childEnterIds = []
      this.showInput = false
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
    selectchange (val) {
      if (val == '0') {
        this.showInput = true
      } else {
        this.showInput = false
      }
    },
    // 多选
    onSelectChange (val, val2) {
      this.rowSelection.selectedRowKeys = val
      val.length > 0 ? (this.isdisabled = false) : (this.isdisabled = true)
      this.childIds = val2
    },
    // add () {
    //   console.log(111)
    //   this.child = []
    //   this.showInput = false
    //   console.log(this.childIds)
    //   this.childIds.map((item, index) => {
    //     this.child.push({
    //       childBaseId: item.childBaseId,
    //       childName: item.name,
    //       childEnterIds: item.childEnterIds
    //     })
    //     // this.childName.push({item.name)
    //   })
    //   console.log(this.child)
    //   this.visible = true
    //   this.nowtype = 1
    // },
    del (val) {
      this.child.splice(val, 1)
    },
    // 获取儿童类型
    // 儿童类别
    async getchildtype () {
      let data = await this.getDictionaries(this.childTypeCode)
      this.adoptionlist = data
    },
    // 性别列表
    async getsex () {
      let data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    onSelectTime (date, dateString) {
    },

    addAdoption (e, obj, index, type) {
      let str = JSON.stringify(obj)
      this.$router.push({
        name: 'vaccineInput',
        params: {
          obj: str,
          type
        }
      })
    },
    async subfamily () {
      this.form.validateFields(async (err, values) => {
        // let params=this.form.getFieldsValue()
        //   console.log(params)
        if (!err) {
          // if (this.child.length == 0 || this.child == 'undefined') {
          //   this.$message.error('已选人员不能为空')
          //   return false
          // }
          let url = ''
          let text = ''
          let aa = ''
          let params = this.form.getFieldsValue()
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
          }

          this.changetime(params)
          if (this.nowtype == 1) {
            // 新增
            let res = await this.post('/childVaccination/saveBatch', params)
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
      let data = await this.getDictionaries('MEDICALINSURANCETYPE')
      this.medicalInsuranceTypeList = data
    },
    // // 获取医疗保险周期
    async medicalInsuranceCycle () {
      let data = await this.getDictionaries('MEDICALINSURANCECYCLE')
      this.medicalInsuranceCycleList = data
    },
    gorecord () {
      this.$router.push({
        name: 'visitrecord'
      })
    }
  }
}
</script>
<style scoped lang="less">
.spilwid3 {
  width: 400px;
}
</style>
