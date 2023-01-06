<template>
  <div class="conts tadrawer">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="fam_a"
               title="儿童信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 ref="one"
                 :autoFormCreate="(adoptedFrom)=>{this.adoptedFrom = adoptedFrom}">
          <ChildInformation :name="name"
                            :childEnterId='childEnterId'></ChildInformation>
        </ta-form>
      </div>
      <div ref="twoout"
           class="mars marpad">
        <Title id="fam_a"
               title="受教育记录"
               :show.sync="showtwo"></Title>
        <div>
          <div class="visitbtn"
               v-if="iscanshow">
            <ta-button type="primary"
                       class="addbtn"
                       @click="add">新增</ta-button>
          </div>
          <ta-table ref="two"
                    class="tables"
                    :showOverflowTooltip="true"
                    :columns="tableColumns"
                    :dataSource="tableData"
                    bordered>
            <span slot="num"
                  slot-scope="val,obj,index">
              <span>{{ size * (page - 1) + index + 1 }}</span>
            </span>
            <div slot="action"
                 slot-scope="val,obj,index"
                 class="btnlist">
              <span @click="see(val,obj)"
                    class="com_textsee">查看</span>
              <template v-if="iscanshow">
                <span @click="edit(val,obj)"
                      class="com_textedit">编辑</span>
                <ta-popconfirm title="确定删除吗?"
                               @confirm="deletes(val,obj,index)"
                               @cancel="cancel"
                               okText="确定"
                               cancelText="取消">
                  <span class="com_textdel">删除</span>
                </ta-popconfirm>
              </template>
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
      </div>
    </div>
    <div class="bom">
      <ta-button @click="backs"
                 class="preservation">返回</ta-button>
    </div>
    <ta-drawer title="受教育情况"
               width="500"
               placement="right"
               :getContainer="setContainer"
               @close="onClose"
               :visible="visible"
               style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
      <ta-form class="drawerFrom"
               :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="工学情况"
                      fieldDecoratorId="workStudySituation"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择工学情况'}">
          <ta-select placeholder="请选择工学情况"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in worktudyList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="特教类型"
                      fieldDecoratorId="specialEducationType"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择特教类型'}">
          <ta-select placeholder="请选择特教类型"
                     mode="multiple"
                     @change="tjchange"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in pceialeducationtypeList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="学制年限"
                      fieldDecoratorId="lengthOfSchooling"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择学制年限'}">
          <ta-select placeholder="请选择学制年限"
                     :disabled="idedit">
            <ta-select-option :value="item.value"
                              v-for="(item,index) in lengthofschoolList"
                              :key="index">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="教育机构"
                      fieldDecoratorId="educationOrg"
                      :labelCol="{ span: 6 }"
                      :fieldDecoratorOptions="this.verificationRules('教育机构',72)"
                       >
          <ta-input placeholder="请输入教育机构"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="教育起止时间"
                      fieldDecoratorId="educationTime"
                      :labelCol="{ span: 6 }"
                      :wrapperCol="{span:18}"
                      :require="{message:'请选择教育起始时间'}">
          <ta-range-picker style="width: 100%;"
                           :disabled="idedit" />
        </ta-form-item>
        <!-- <ta-form-item
          label="教育地点"
          fieldDecoratorId="eduOrgAddr"
          :labelCol="{ span: 6 }"

        >-->
        <AddressComponent msg="教育地点"
                          :disabled="idedit"
                          :addressmodel="addressmodel"
                          @setaddress="setaddress"></AddressComponent>

        <!-- <ta-textarea placeholder="请输入教育地点" :rows="4" /> -->
        <!-- </ta-form-item> -->
        <ta-form-item label
                      fieldDecoratorId="addressDetails"
                      :labelCol="{ span: 0 }"
                      :wrapperCol="{ offset:6 }"
                      :fieldDecoratorOptions="{rules: [{ max: 100, message: '详细地址字段最大长度为100个字符' }]}"
                      :require="{message:'请输入详细地址'}">
          <ta-input placeholder="请输入详细地址"
                    :disabled="idedit" />
        </ta-form-item>
        <ta-form-item label="是否接受孤儿助学"
                      fieldDecoratorId="isAcceptHelpStudy"
                      :labelCol="{ span: 6 }"
                      :require="{message:'请选择是否接受孤儿助学'}">
          <ta-radio-group name="radioGroup"
                          @change="radiochange"
                          :disabled="idedit">
            <ta-radio :value="item.value"
                      v-for="(item,index) in isorphansschollList"
                      :key="index">{{item.label}}</ta-radio>
          </ta-radio-group>
        </ta-form-item>
        <template v-if="radioval==1">
          <ta-form-item label="助学经费标准(元）"
                        fieldDecoratorId="helpStudyFundsTotalAmount"
                        :require="{message:'请輸入助学经费标准(元）'}">
            <!-- <ta-input placeholder="助学经费总金额(元）" :disabled="idedit"/> -->
            <ta-input-number placeholder="请輸入助学经费标准(元）"
                             :min="1"
                             :max="999999"
                             :precision="2"
                             style="width:100%"
                             :disabled="idedit" />
          </ta-form-item>
          <ta-form-item label="发放周期"
                        fieldDecoratorId="provideCycle"
                        :require="{message:'请选择发放周期'}">
            <ta-select placeholder="请选择发放周期"
                       :disabled="idedit">
              <ta-select-option :value="item.value"
                                v-for="(item,index) in releasecycleList"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
          <!-- <ta-form-item
            label="发放次数"
            fieldDecoratorId="provideNumberOfTimes"
            :require="{message:'请輸入发放次数'}"
          >
            <ta-input-number
              placeholder="请輸入发放次数"
              :min="1"
              :max="999999"
              style="width:100%"
              :disabled="idedit"
            />
          </ta-form-item> -->
        </template>
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
import Title from '@component/common/components/Title'
import listMinxin from '@component/common/js/mixins/listMixin'
import ChildInformation from '../components/childInformation'
import AddressComponent from '@component/common/components/addressComponent'
import moment from 'moment'
import { setTimeout } from 'timers'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '工学情况',
    align: 'center',
    dataIndex: 'workStudySituation',
    collectionType: 'WORKSTUDY',
    width: '10%'
  },
  {
    title: '教育起始日期',
    align: 'center',
    dataIndex: 'educationTimeStart',
    width: '11%'
  },
  {
    title: '教育结束日期',
    align: 'center',
    dataIndex: 'educationTimeEnd',
    width: '11%'
  },
  {
    title: '是否接受孤儿助学',
    align: 'center',
    dataIndex: 'isAcceptHelpStudy',
    collectionType: 'YESNO',
    width: '14%'
  },
  {
    title: '助学经费标准(元）',
    align: 'center',
    dataIndex: 'helpStudyFundsTotalAmount',
    width: '14%'
  },
  {
    title: '发放周期',
    align: 'center',
    dataIndex: 'provideCycle',
    collectionType: 'RELEASECYCLE',
    width: '9%'
  },
  // {
  //   title: '发放次数',
  //   dataIndex: 'provideNumberOfTimes',
  //   width: '10%'
  // },
  {
    title: '登记日期',
    align: 'center',
    dataIndex: 'createTime',
    width: '10%'
  },
  {
    title: '操作',
    align: 'center',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  mixins: [listMinxin],
  components: {
    Title,
    ChildInformation,
    AddressComponent
  },
  data () {
    return {
      showone: true,
      showtwo: true,
      tableColumns,
      tableData: [],
      size: 10,
      page: 1,
      visible: false,
      obj: {},
      name: '',
      mixListOptions: {
        mixGetDataListURL: '/childEducation/queryChildEducationRecords', // 数据列表接口，API地址
        mixDeleteURL: '/childEducation/updateDelStateById', // 删除接口，API地址
        mixAddURL: '/childEducation/save', // 新增接口
        mixEditURL: '/childEducation/update', // 编辑接口
        mixExportURL: '' // 导出接口，API地址
      },
      mixPageRef: 'gridPager',
      worktudyList: [],
      pceialeducationtypeList: [],
      lengthofschoolList: [],
      isorphansschollList: [],
      releasecycleList: [],
      radioval: null,
      addressname: 'eduOrgAddr',
      addressmodel: [],
      childBaseId: '',
      iscanshow: false,
      childEnterId: ''
    }
  },
  activated () {
    const data = JSON.parse(this.$route.params.obj)
    console.log(data)
    this.obj = data
    this.name = this.obj.name
    this.iscanshow = this.$route.params.type == 1
    this.childBaseId = this.obj.childBaseId
    this.childEnterId = this.obj.childEnterId
    this.adoptedFrom.setFieldsValue({
      idCard: this.obj.idCard,
      childNumber: this.obj.childNumber,
      childType: this.obj.childType,
      registerDate: moment(this.obj.registerDate)
    })
    this.showone = true
    this.showtwo = true
    this.$nextTick(() => {
      this.setHeight('one', 'oneout')
      this.setHeight('two', 'twoout')
    })
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.setHeight('one', 'oneout')
        this.setHeight('two', 'twoout')
      }, 500)
    })
    this.getworktudy()
    this.getspceialeducationtype()
    this.getlengthofschool()
    this.getisorphansscholl()
    this.getreleasecycle()
  },
  methods: {
    tjchange (val, data) {
      // specialEducationType form
      console.log(val)
      if (val.length > 1) {
        if (val[0] == 1) {
          const arr = val.shift()
          this.form.setFieldsValue({
            specialEducationType: arr
          })
        }
        if (val[val.length - 1] == 1) {
          // val = arr
          this.$nextTick(() => {
            this.form.setFieldsValue({
              specialEducationType: ['1']
            })
          })
        }
      }
    },
    disabledStartDate (current) {
      return current && current > moment().endOf('day')
    },
    setContainer () {
      return this.$el.parentNode
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
      // this.$nextTick(() => {
      //   // this.showtwo = true
      //   this.setHeight('two', 'twoout')
      // })
    },
    addother (obj) {
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      data.childBaseId = this.childBaseId
      data.childEnterId = this.obj.childEnterId
      return data
    },
    other (obj) {
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      this.radioval = data.isAcceptHelpStudy
      if (data.specialEducationType) {
        data.specialEducationType = data.specialEducationType.split(',')
      }

      data.educationTime = [
        moment(data.educationTimeStart, 'YYYY-MM-DD'),
        moment(data.educationTimeEnd, 'YYYY-MM-DD')
      ]
      delete data.educationTimeStart
      delete data.educationTimeEnd
      const arr = []
      arr.push(data.province, data.city, data.county)
      this.addressmodel = [...arr]
      return data
      // this.$set(this, 'addressmodel', arr)
    },
    radiochange (val) {
      this.radioval = val.target.value
    },
    // 發放周期 RELEASECYCLE
    async getreleasecycle () {
      const data = await this.getDictionaries('RELEASECYCLE')
      this.releasecycleList = data
    },
    // 是否接受孤儿助学 YESNO
    async getisorphansscholl () {
      const data = await this.getDictionaries('YESNO')
      this.isorphansschollList = data
    },
    // 工学情况 WORKSTUDY
    async getworktudy () {
      const data = await this.getDictionaries('WORKSTUDY')
      this.worktudyList = data
    },
    // 特教类型 SPECIALEDUCATIONTYPE
    async getspceialeducationtype () {
      const data = await this.getDictionaries('SPECIALEDUCATIONTYPE')
      this.pceialeducationtypeList = data
    },
    // 特教change
    educationchange (val) {
      if (val.length == 0) {
        this.pceialeducationtypeList.map((item, index) => {
          item.isdisabled = false
        })
        return false
      }
      const status = val.includes('1')
      this.pceialeducationtypeList.map((item, index) => {
        if (index == 0) {
          item.isdisabled = status
        } else {
          item.isdisabled = !status
        }
      })
    },
    // 学制年限 LENGTHOFSCHOOLING
    async getlengthofschool () {
      const data = await this.getDictionaries('LENGTHOFSCHOOLING')
      this.lengthofschoolList = data
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'two') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    userPageParams () {
      return {
        childBaseId: this.childBaseId,
        childEnterId: this.obj.childEnterId
      }
    },
    backs () {
      this.$router.go(-1)
    }
  },
  watch: {
    showone (val) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val) {
      this.setHeight('two', 'twoout', !val)
    },
    tableData: {
      handler () {
        this.setHeight('two', 'twoout')
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.contin {
  padding-top: 1px;
  padding-bottom: 20px;
}
.mars {
  margin-top: 20px;
}
.tables {
  margin-top: 17px;
}
.marpad {
  padding-bottom: 20px;
}
.preservation {
  margin-left: 20px;
}
</style>
