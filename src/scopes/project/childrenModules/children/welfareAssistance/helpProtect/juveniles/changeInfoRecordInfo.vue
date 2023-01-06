<template>
  <div class="conts">
    <!-- <ta-border-layout> -->
    <div class="contin">

      <ta-form layout="horizontal"
               :autoFormCreate="(childInfoForm)=>{this.childInfoForm = childInfoForm}">
        <ta-row class="fromcom">
              <div class="item_title">
              <div class="lines"></div>
              <p class="item_text"
                 style="width:120px">儿童基本信息</p>
              <div class="horizontalline"></div>
            </div>
          <ta-col :span="6">
              <ta-form-item label="儿童编号"
                          fieldDecoratorId="childNumber"
                             :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                          >

              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
            <ta-col :span="6">
            <ta-form-item label="儿童姓名"
        :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                          fieldDecoratorId="name">
              <ta-input :disabled="true"
                        placeholder="请输入儿童姓名" />
            </ta-form-item>
        </ta-col>
            <ta-col :span="6">
            <ta-form-item label="性别"
        :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                          fieldDecoratorId="sex">
              <ta-select :disabled="true"
                         placeholder="请选择性别">
                <ta-select-option v-for="(item,index) in sexList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="出生日期"
        :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                          fieldDecoratorId="birthday">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
               <ta-col :span="6">
            <ta-form-item label="身份证号"
        :labelCol="{ span: 8 }"
                      :wrapperCol="{ span: 16 }"
                          fieldDecoratorId="idCard">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
               <ta-col :span="6">
            <ta-form-item label="累计救助次数"
        :labelCol="{ span: 9 }"
                      :wrapperCol="{ span: 15 }"
                          fieldDecoratorId="rescueCount">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>

        </ta-row>
      </ta-form>
      <!-- ------ -->

            <div class="item_title">
              <div class="lines"></div>
              <p class="item_text"
                 style="width:120px">救助记录表</p>
              <div class="horizontalline"></div>
            </div>

       <ta-table
          :columns="mixColumns"
           class="tables table-min-width"
          :dataSource="mixDataList"
          :pagination="false"
          @change="handleTableChange"
          bordered
        >
          <span slot="num" slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action" slot-scope="val,obj,index" class="btnlist">
            <span @click="editAll(val,obj,true)" class="com_textsee">详情</span>

          </div>
        </ta-table>
        <ta-pagination
          class="pagination"
          showSizeChanger
          showQuickJumper
          :dataSource.sync="mixDataList"

  :params="userPageParams"
          @change="pagechange"
          :url="mixListOptions.mixGetDataListURL"
          ref="gridPager"
        />

    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="backs">返回</ta-button>

    </div>

  </div>
</template>
<script>

import moment from 'moment'
import listMixin from '@/scopes/project/common/js/mixins/listMixin.js'
import { async } from 'q'
const mixColumns = [

  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '登记日期',
    width: '14%',
    dataIndex: 'recordDate',
    overflowTooltip: true
  },
  {
    title: '帮扶类型',
    width: '12%',
    dataIndex: 'helpType',
    collectionType: 'SUPPORTTYPES',
    overflowTooltip: true
  },
  {
    title: '帮扶措施',
    width: '12%',
    dataIndex: 'helpMeasure',
    // collectionType: 'ADMINISTRATIVEOFFICE',
    overflowTooltip: true
  },
  {
    title: '帮扶时长',
    width: '12%',
    dataIndex: 'duration',

    overflowTooltip: true
  },
  {
    title: '救助机构',
    width: '12%',
    dataIndex: 'troubleOrgName',
    overflowTooltip: true
  },
  {
    title: '监护照料结束日期',
    width: '13%',
    dataIndex: 'tutelageStopReasonDate',
    overflowTooltip: true
  },

  {
    title: '操作',
    width: '200px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [listMixin],
  components: {

  },
  data () {
    return {
      page: 1,
      size: 10,
      mixListOptions: {
        mixGetDataListURL: '/difficultiesChildren/getTroubleChildDetails', // 数据列表接口，API地址
        // mixAddURL: '/employeeManagement/save', // 新增接口

        mixExportURL: '' // 导出接口，API地址
      },
      dataSource: [],
      mixColumns: mixColumns,
      mixPageRef: 'gridPager',
      sexList: [],
      id: ''

    }
  },
  updated () {
    // this.setLabelAndWrapperWidth('6.3%', '93.7%', 'explain') // 说明 字段宽度控制
    // this.setLabelAndWrapperWidth('10%', '90%', 'alonerow') // 单独一行字段宽度控制
  },
  activated () {
    this.childInfoForm.resetFields()
    this.id = this.$route.query.id
    this.showBaseInfo()
  },
  mounted () {
    this.getList()
  },
  methods: {
    showBaseInfo () {
      let childNumber = this.$route.query.childNumber
      let name = this.$route.query.name
      let sex = this.$route.query.sex
      let birthday = this.$route.query.birthday
      let idCard = this.$route.query.idCard
      let rescueCount = this.$route.query.rescueCount
      this.$nextTick(() => {
        this.childInfoForm.setFieldsValue({
          childNumber: childNumber,
          name: name,
          sex: sex,
          birthday: birthday,
          idCard: idCard,
          rescueCount: rescueCount
        })
      })
    },
    async editAll (val, obj, tp) {
      let resobj = await this.post('/difficultiesChildren/queryById', {'id': obj.id})

      let dcpgId = resobj.data.data.difficultiesChildrenVo.dcpgId
      // alert(dcpgId)
      let tutelageStopReason = resobj.data.data.difficultiesChildrenVo.tutelageStopReason
      let tutelageStopReasonDate = resobj.data.data.difficultiesChildrenVo.tutelageStopReasonDate

      this.$router.push({
        name: 'LookAllInfo',
        query: {
          jump: 'yes',
          id: obj.id,
          dcpgId: dcpgId,
          tutelageStopReasonDate: tutelageStopReasonDate,
          tutelageStopReason: tutelageStopReason
        }
      })
    },
    userPageParams () {
      let formData = {}
      formData.id = this.id
      return formData
    },

    backs () { this.$router.go(-1) },
    handleTableChange () {},
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    async getList () {
      this.sexList = await this.getDictionaries('SEX')
    }
  }
}
</script>
<style scoped>
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cursors {
  cursor: pointer;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.item_text {
  width: 60px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.horizontalline {
  width: calc(100% - 135px);
  margin-left: 15px;
  margin-right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
}
.preservation {
  margin-left: 20px;
}
</style>
