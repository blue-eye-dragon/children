<template>
  <div style="padding: 1% 3%;"
       @click='allvalidator'>
    <div>
      <div class="visitbtn">
        <ta-button type="primary"
                   class="addbtn btnleft"
                   @click="addAdoption"
                   v-if="!disabled">新增</ta-button>
      </div>
      <ta-table bordered
                class="tables table-min-width"
                :columns="tableColumns"
                :showOverflowTooltip="true"
                :dataSource="tableDatas">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <span slot="healthCondition"
              slot-scope="a, b, c">
          <span>{{setHeathData(a,'HEALTH') }}</span>
        </span>
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span class="com_textedit"
                @click="edit(text,obj,index)"
                v-if="!disabled">编辑</span>
          <span class="com_textsee "
                @click="see(text,obj,index)">查看</span>
          <span class="com_textdel "
                @click="deletes(text,obj,index)"
                v-if="getIndex(index)">删除</span>
        </div>
      </ta-table>
      <ta-pagination  :defaultCurrent="page"
                     class='pagination'
                     showSizeChanger
                     showQuickJumper
                     :dataSource.sync="tableDatas"
                     @showSizeChange="showSizeChange"
                     :total="total" />
    </div>
    <!-- 新增、编辑、查看的抽屉 -->
    <ta-drawer :title="idedit?'查看':'新增/编辑'"
               :visible="visible"
               width="500"
               @close="onClose"
               :getContainer="setContainer"
               :bodyStyle="{height:'auto',overflow:'auto' ,paddingBottom:'0px'}">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label="姓名"
                      fieldDecoratorId="name"
                      :fieldDecoratorOptions="verificationRules('姓名',72)">
          <ta-input :disabled='idedit' />
        </ta-form-item>
        <ta-form-item label="与户主关系"
                      fieldDecoratorId="householderRelationship"
                      :require="{ message: '请选择与户主关系' }">
          <ta-select :disabled="sexdisabled?true:idedit"
                     :placeholder="!idedit ? '请选择与户主关系' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in relationAllList"
                              :disabled="item.value==Enum.FAMILYRELATIONS.BRHZ||item.value==Enum.FAMILYRELATIONS.PO?true:false"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="sex"
                      :require="{ message: '请选择性别' }">
          <ta-select :disabled="sexdisabled?true:idedit"
                     :placeholder="!idedit ? '请选择性别' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in sexList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份证号"
                      fieldDecoratorId="idCard"
                      :fieldDecoratorOptions="({validateTrigger: 'blur',rules: [{ required: true, message: '请输入身份证号' },{validator:idCardValid}]})">
          <ta-input :disabled='idedit' />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="birth"
                      :require="{message:'请选择出生日期'}">
          <ta-date-picker style="width: 100%;"
                          :disabled='true' />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="nation"
                      :require="{ message: '请选择民族' }">
          <ta-select :disabled="idedit"
                     :placeholder="!idedit ? '请选择民族' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in nationList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="文化程度"
                      fieldDecoratorId="educationLevels">
          <ta-select :disabled="idedit"
                     :placeholder="!idedit ? '请选择文化程度' : ''">
            <ta-select-option :value="item.value"
                              v-for="(item, index) in educationLevelsList"
                              :key="index">{{item.label}}
            </ta-select-option>
          </ta-select>
        </ta-form-item>
        <Health :labelwidth="labelwidth"
                :fileldName="'health'"
                :disabled="idedit"
                :heathmodel="heathmodel"
                @setheath="setheath"></Health>
        <ta-form-item label="职业"
                      fieldDecoratorId="occupation">
          <ta-select allowClear
                     placeholder="请选择职务"
                     :disabled='idedit'>
            <ta-select-option v-for="item in occupationList"
                              :key="item.value"
                              :value="item.value">{{item.label}}</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="单位或学校"
                      fieldDecoratorId="workUnit"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('单位或学校',50)">
          <ta-input :disabled='idedit' />
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="tel"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('联系电话',{type: 'phone'})">
          <ta-input :disabled='idedit' />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   type="primary"
                   @click="subfamily"
                   v-if="!idedit">确定</ta-button>
      </div>
    </ta-drawer>
  </div>
</template>

<script>
import localList from '@component/common/js/mixins/localList'
import Health from '@component/common/components/health'
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
    title: '姓名',
    dataIndex: 'name',
    width: '20%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    collectionType: 'sex'
  },
  {
    title: '出生日期',
    dataIndex: 'birth',
    width: '15%'
  },
  {
    title: '单位或学校',
    width: '20%',
    dataIndex: 'workUnit'
  },
  {
    title: '健康状况',
    dataIndex: 'healthCondition',
    width: '20%',
    scopedSlots: { customRender: 'healthCondition' }
  },
  {
    title: '与户主人关系',
    width: '20%',
    dataIndex: 'householderRelationship',
    collectionType: 'FAMILYRELATIONS'
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
  mixins: [localList],
  components: {
    Health
  },
  props: ['disabled'],
  data () {
    return {
      tableColumns,
      tableDatas: [],
      deleteDatas: [], // 存放删除的数据数组
      tablename: 'tableDatas',
      idedit: false,
      sexdisabled: false, // 关系为户主或配偶时，性别只读
      visible: false,
      heathmodel: [], // 健康状况数据
      labelwidth: { label: 6, wrapper: 18 },
      isvalidator: false, // 提交时不验证

      sexList: [], // 性别字典数据
      relationAllList: [], // 与户主关系字典数据(全)
      nationList: [], // 民族字典数据
      educationLevelsList: [], // 文化程度字典数据
      occupationList: [] // 职务字典数据
    }
  },
  activated () {
    this.tableDatas = []
    this.deleteDatas = []
  },
  mounted () {
    this.getMenuDatas()
    this.isvalidator = false
  },
  methods: {
    // 字典数据获取
    async getMenuDatas () {
      this.sexList = await this.getDictionaries('SEX') // 性别字典数据
      this.relationAllList = await this.getDictionaries('FAMILYRELATIONS') // 与户主关系字典数据(全)
      this.nationList = await this.getDictionaries('NATION') // 民族字典数据
      this.educationLevelsList = await this.getDictionaries('DEGREEEDUCATION') // 文化程度字典数据
      this.occupationList = await this.getDictionaries('OCCUPATION') // 获取职务字典数据
    },
    // 全局验证状态
    allvalidator () {
      this.isvalidator = true
    },
    // 获取户主及配偶的索引
    getIndex (e) {
      if (this.disabled) { // 查看
        return false
      } else {
        const index = this.tableDatas.findIndex((e, index) => (
          e.householderRelationship == this.Enum.FAMILYRELATIONS.BRHZ
        ))
        const index1 = this.tableDatas.findIndex((e, index) => (
          e.householderRelationship == this.Enum.FAMILYRELATIONS.PO
        ))
        return e != index && e != index1
      }
    },
    // 增加
    addAdoption () {
      this.ishiderelationship = false
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.key = 1
      this.visible = true
      this.idedit = false
      this.fileList = []
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    // 编辑
    edit (val, obj, index) {
      if (index == 0 || index == 1) { // 户主或配偶的编辑，关系为只读，性别也是只读
        this.sexdisabled = true
      } else { // 非户主或配偶的编辑
        this.sexdisabled = false
      }
      this.visible = true
      this.idedit = false
      this.nowindex = index
      // 单独处理日期
      const str = JSON.stringify(obj)
      const data = JSON.parse(str)
      this.dateprocessing(data)
      this.keyid = data.id
      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
      this.key = 2
    },
    // 抽屉里面的确定
    subfamily () {
      this.isvalidator = false
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.form.getFieldsValue()
          data.healthCondition = data.health.join(',')
          //   this.changetime(data)
          data.birth = data.birth ? moment(data.birth).format('YYYY-MM-DD') : null
          data.delState = '1'
          if (this.key == 1) {
            // 新增（新增的数据都不是户主）
            data.isHouseholder = '0'

            const newData = [...this[this.tablename]]
            newData.unshift(data)
            this.tableDatas = newData
          } else {
            if (data.householderRelationship == this.Enum.FAMILYRELATIONS.BRHZ) { // 户主
              data.isHouseholder = '1'
            }
            if (data.householderRelationship == this.Enum.FAMILYRELATIONS.PO) { // 配偶
              data.isHouseholder = '0'
            }
            // 修改
            const e = parseFloat(this.nowindex + ((this.page - 1) * this.size))
            data.id = this.keyid

            this.tableDatas.splice(e, 1, data)
            // 户主及配偶的编辑需要同步到男女方信息中
            const index = this.tableDatas.findIndex((e, index) => (
              e.householderRelationship == this.Enum.FAMILYRELATIONS.BRHZ
            ))
            if (this.nowindex == index) { // 户主
              this.$emit('updateDatas', true)
            }
            const index1 = this.tableDatas.findIndex((e, index) => (
              e.householderRelationship == this.Enum.FAMILYRELATIONS.PO
            ))
            if (this.nowindex == index1) { // 配偶
              this.$emit('updateDatas', false)
            }
          }
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    // 删除
    deletes (val, obj, index) {
      const e = parseFloat(index + ((this.page - 1) * this.size))
      this.tableDatas[e].delState = '0'
      this.deleteDatas.push(this.tableDatas[e])
      this.tableDatas.splice(e, 1)
    },
    // 时间及健康状况处理
    dateprocessing (e) {
      e.birth = e.birth ? moment(e.birth) : null
      this.$nextTick(() => {
        this.heathmodel = e.healthCondition ? e.healthCondition.split(',') : []
      })
      return e
    },
    setContainer () {
      return this.set_Container('tadrawer')
    },
    // 设置健康状况
    setheath () {
      this.form.setFieldsValue({
        health: this.heathmodel
      })
    },
    // 身份证号验证
    idCardValid (rule, value, callback) {
      const _self = this
      _self.idCardValidate(rule, value, callback, _self)
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      if (!this.isvalidator) {
        return false
      }
      this.$emit('setBirthAndAgeByIdCard', birth, 'form', 'birth')
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.$nextTick(() => {
          if (this.form.getFieldsValue().householderRelationship == this.Enum.FAMILYRELATIONS.BRHZ ||
            this.form.getFieldsValue().householderRelationship == this.Enum.FAMILYRELATIONS.PO) {
            this.sexdisabled = true
          } else {
            this.sexdisabled = false
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.addbtn {
  margin-right: 15px;
}
</style>
