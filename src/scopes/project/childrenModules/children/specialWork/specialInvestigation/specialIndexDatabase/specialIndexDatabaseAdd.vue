<template>
  <div class="conts tadrawer">
    <div class="contin">
      <div>
        <h3>新增检查项目</h3>
        <ta-divider style="margin: 10px 0;" />
      </div>
      <div>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.modelForm = form}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="指标库分类"
                            class="alonerow"
                            fieldDecoratorId="indexDbClassific"
                            :require="{message:'请选择指标库分类'}">
                <ta-select :placeholder="disabled?'':'请选择指标库分类'"
                           :disabled="disabled">
                  <ta-select-option v-for="(item ,index) in indexDbClassificList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="检查项目"
                              fieldDecoratorId="checkProject"
                              :fieldDecoratorOptions="verificationRules('检查项目',60)">
                  <ta-input :disabled='disabled'
                            :placeholder="disabled?'':'请输入检查项目'" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="指标类型"
                              fieldDecoratorId="indexType"
                              :require="{message:'请选择指标类型'}">
                  <ta-select :placeholder="disabled?'':'请选择指标类型'"
                             :disabled="disabled"
                             @change="typeChange">
                    <ta-select-option v-for="(item ,index) in indexTypeList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="指标适用机构"
                              :labelCol="{ span: 8 }"
                              :wrapperCol="{span:16}"
                              fieldDecoratorId="indexApplyOrg"
                              :require="{message:'请选择指标适用机构'}">
                  <ta-select :placeholder="disabled?'':'请选择指标适用机构'"
                             :disabled="disabled">
                    <ta-select-option v-for="(item ,index) in indexApplyOrgList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="编号"
                              fieldDecoratorId="indexNum">
                  <ta-input :disabled='true'
                            :placeholder="''" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <div>
                <div class="visitbtn">
                  <ta-button type="primary"
                             class="addbtn btnleft"
                             v-if="!disabled"
                             @click="addAdoption">新增</ta-button>
                </div>
                <ta-table bordered
                          class="tables table-min-width"
                          style="margin-bottom: 2%;"
                          :columns="tableColumns"
                          :showOverflowTooltip="true"
                          :dataSource="tableDatas">
                  <span slot="num"
                        slot-scope="a, b, c">
                    <span>{{ size * (page - 1) + c + 1 }}</span>
                  </span>
                  <div slot="action"
                       slot-scope="text,obj,index"
                       class="btnlist">
                    <span class="com_textedit"
                          v-if="!disabled"
                          @click="edit(text,obj,index)">编辑</span>
                    <ta-divider type="vertical"
                                v-if="!disabled" />

                    <span class="com_textdel"
                          v-if="!disabled"
                          @click="deletes(text,obj,index)">删除</span>
                    <ta-divider type="vertical"
                                v-if="!disabled" />
                    <span class="com_textsee"
                          @click="see(text,obj,index)">查看</span>
                  </div>
                </ta-table>
              </div>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="录入人员"
                              fieldDecoratorId="recordUserName"
                              :fieldDecoratorOptions="verificationRules('录入人员',20)">
                  <ta-input :disabled='disabled'
                            :placeholder="disabled?'':'请输入录入人员'" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="录入日期"
                              fieldDecoratorId="recordDate"
                              :require="{message:'请选择录入日期'}">
                  <ta-date-picker style="width: 100%;"
                                  :placeholder="!disabled?'请选择录入日期':''"
                                  :disabled="disabled"
                                  :valid-now-time="'right'"
                                  :disabledDate="disabledDate" />
                </ta-form-item>
              </ta-col>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
        <ta-button @click="returns"
                   class="btnleft">返回</ta-button>
        <ta-button type="primary"
                   @click="submit"
                   v-if="!disabled"
                   class="btnleft">提交</ta-button>
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
        <ta-form-item label="检查内容"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      fieldDecoratorId="checkContent"
                      :fieldDecoratorOptions="verificationRules('检查内容',300,false)">
          <ta-textarea style="width: 100%"
                       placeholder="请输入检查内容"
                       :rows="4"
                       :disabled='idedit' />
        </ta-form-item>
        <ta-form-item label="检查细则"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      fieldDecoratorId="checkDetail"
                      :fieldDecoratorOptions="verificationRules('检查细则',300,false)">
          <ta-textarea placeholder="请输入检查细则"
                       :rows="4"
                       :disabled='idedit' />
        </ta-form-item>
        <ta-form-item label="检查方式"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      fieldDecoratorId="checkWay"
                      :fieldDecoratorOptions="verificationRules('检查方式',300,false)">
          <ta-textarea style="width: 100%"
                       placeholder="请输入检查方式"
                       :rows="4"
                       :disabled='idedit' />
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
    title: '检查内容',
    dataIndex: 'checkContent',
    width: '35%'
  },
  {
    title: '检查细则',
    dataIndex: 'checkDetail',
    width: '35%'
  },
  {
    title: '检查方式',
    dataIndex: 'checkWay',
    width: '35%'
  },
  {
    title: '操作',
    overflowTooltip: false,
    dataIndex: 'action',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [localList],
  data () {
    return {
      disabled: false,
      tableColumns,
      tableDatas: [],
      tablename: 'tableDatas',
      visible: false,
      idedit: false,

      indexDbClassificList: [], // 指标库分类字典数据
      indexTypeList: [], // 指标类型字典数据
      indexApplyOrgList: [], // 指标适用机构字典数据

      flag: '', // 区分新增、编辑、查看的标识符
      id: '' // 编辑、查看时的列表id
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  updated () {
    this.setLabelAndWrapperWidth('7.3%', '92.7%', 'alonerow') // 单独一行字段宽度控制
  },
  methods: {
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('INDEXDBCLASSIFIC', 'indexDbClassificList') // 获取指标库分类字典数据
      this.getMenu('INDEXTYPE', 'indexTypeList') // 获取指标类型字典数据
      this.getMenu('INDEXAPPLYORG', 'indexApplyOrgList') // 获取指标适用机构字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 日期不能选择未来日期
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    // 初始化数据
    initDatas () {
      this.tableDatas = []
      this.flag = this.$route.query.flag
      this.disabled = false
      // 编辑或查看数据回显
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        if (this.flag == 'look') {
          this.disabled = true
        }
        this.post('/specialIndexDbManage/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data
            data['recordDate'] = data.recordDate ? moment(data.recordDate) : null
            this.modelForm.setFieldsValue(data)
            this.tableDatas = data.specialIndexCheckVos || []
          }
        })
      }
    },
    // 根据指标类型获取编号
    typeChange (e) {
      this.post('/specialIndexDbManage/getIndexNumByIndexType', { indexType: e }).then((res) => {
        if (res.serviceSuccess) {
          this.modelForm.setFieldsValue({
            indexNum: res.data.data
          })
        }
      })
    },
    // 提交
    submit (e) {
      let _self = this
      _self.modelForm.validateFields((err, values) => {
        if (!err) {
          if (_self.tableDatas.length > 0) {
            let formData = _self.modelForm.getFieldsValue()
            formData['recordDate'] = formData.recordDate ? moment(formData.recordDate).format('YYYY-MM-DD') : null
            let url = '/specialIndexDbManage/save'
            if (_self.flag == 'edit') {
              url = '/specialIndexDbManage/update'
              formData['id'] = _self.id
            }
            formData['specialIndexCheckVos'] = _self.tableDatas
            _self.post(url, formData, true).then((res) => {
              if (res.serviceSuccess) {
                _self.$message.success('信息保存成功！')
                _self.returns()
              }
            })
          } else {
            _self.$message.error('检查项不可为空!')
          }
        } else {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.modelForm.resetFields()

      this.$router.go(-1)
    },
    // 抽屉里面的确定
    subfamily () {
      this.form.validateFields((err, values) => {
        let datas = this.form.getFieldsValue()
        if (!err) {
          let data = this.form.getFieldsValue()
          this.changetime(data)
          if (this.key == 1) {
            // 新增
            let newData = [...this[this.tablename]]
            newData.unshift(data)
            this.tableDatas = newData
          } else {
            // 修改
            let e = parseFloat(this.nowindex + ((this.page - 1) * this.size))
            data.id = this.keyid
            this.tableDatas.splice(e, 1, data)
          }
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    // 删除
    deletes (val, obj, index) {
      let e = parseFloat(index + ((this.page - 1) * this.size))
      this.tableDatas.splice(e, 1)
    },
    setContainer () {
      return this.set_Container('tadrawer')
    }
  }
}
</script>
<style scoped>
</style>
