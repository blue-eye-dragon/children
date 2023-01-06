<template>
  <div style="height: 100%;">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px',footer: '80px'}">
      <div>
        <div>
          <h3>检查基本信息</h3>
          <ta-divider style="margin: 10px 0;" />
        </div>
        <div>
          <ta-form layout="horizontal"
                   :autoFormCreate="(form)=>{this.form = form}">
            <ta-row class="fromcom">
              <ta-col :span="24">
                <ta-form-item label="专项排查任务"
                              class="alonerow"
                              fieldDecoratorId="agent">
                  <ta-select :placeholder="disabled?'':'请选择专项排查任务'"
                             :disabled="disabled">
                    <ta-select-option v-for="(item ,index) in demandTypeList "
                                      :key="index"
                                      :value="item.value">{{item.label}}</ta-select-option>
                  </ta-select>
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <AddressComponent msg="地址"
                                    :addressmodel="addressmodel"
                                    @setaddress="setaddress"
                                    :disabled="disabled"
                                    :labelwidth="{label: 7,wrapper: 17}"></AddressComponent>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="被检查单位"
                                fieldDecoratorId="agent1"
                                :labelCol="{ span: 7 }"
                                :wrapperCol="{span:17}"
                                :fieldDecoratorOptions="verificationRules('被检查单位',72)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入被检查单位'" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="检查单位"
                                fieldDecoratorId="agent12"
                                :fieldDecoratorOptions="verificationRules('检查单位',72)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入检查单位'" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label='检查组成员'
                              fieldDecoratorId="remark"
                              class='alonerow'
                              :fieldDecoratorOptions="verificationRulesNotMustFill('检查组成员',200,true)">
                  <ta-textarea :placeholder="!disabled?'请输入检查组成员':''"
                               :rows="4"
                               :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-col :span="6">
                  <ta-form-item label="检查日期"
                                :labelCol="{ span: 7 }"
                                :wrapperCol="{span:17}"
                                fieldDecoratorId="agent11"
                                :require="{message:'请选择检查日期'}">
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择检查日期':''"
                                    :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="被检查单位负责人"
                                :labelCol="{ span: 10 }"
                                :wrapperCol="{span:14}"
                                fieldDecoratorId="agent112"
                                :fieldDecoratorOptions="verificationRules('被检查单位负责人',72)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入被检查单位负责人'" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="录入人员"
                                fieldDecoratorId="agent123"
                                :fieldDecoratorOptions="verificationRules('录入人员',72)">
                    <ta-input :disabled='disabled'
                              :placeholder="disabled?'':'请输入录入人员'" />
                  </ta-form-item>
                </ta-col>
                <ta-col :span="6">
                  <ta-form-item label="录入日期"
                                fieldDecoratorId="agent21"
                                :require="{message:'请选择录入日期'}">
                    <ta-date-picker style="width: 100%;"
                                    :placeholder="!disabled?'请选择录入日期':''"
                                    :disabled="disabled" />
                  </ta-form-item>
                </ta-col>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label='检查结果小计'
                              fieldDecoratorId="remark1"
                              class='alonerow'
                              :fieldDecoratorOptions="verificationRulesNotMustFill('检查结果小计',200,true)">
                  <ta-textarea :placeholder="!disabled?'请输入检查结果小计':''"
                               :rows="4"
                               :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="24">
                <ta-form-item label='已整改内容或下步整改计划'
                              fieldDecoratorId="remark2"
                              class='alonerow'
                              :fieldDecoratorOptions="verificationRulesNotMustFill('已整改内容或下步整改计划',200,true)">
                  <ta-textarea :placeholder="!disabled?'请输入已整改内容或下步整改计划':''"
                               :rows="4"
                               :disabled="disabled" />
                </ta-form-item>
              </ta-col>

            </ta-row>
          </ta-form>
        </div>
        <div>
          <h3>检查细则</h3>
          <ta-divider style="margin: 10px 0;" />
        </div>
        <ta-table bordered
                  class="tables"
                  :columns="tableColumns"
                  :dataSource="mixDataList"
                  :rowSelection="mixRowSelection">
          <span slot="num"
                slot-scope="a, b, c">
            <span>{{ size * (page - 1) + c + 1 }}</span>
          </span>
          <div slot="action"
               slot-scope="e,obj,index"
               class="btnlist btnponter">
            <span @click="addsure(e,obj,index)">确认添加</span>
          </div>
        </ta-table>
        <ta-pagination  :defaultCurrent="page"
                       class='pagination'
                       showSizeChanger
                       showQuickJumper
                       :dataSource.sync="mixDataList"
                       :params="userPageParams"
                       @change="pagechange"
                       :url="mixListOptions.mixGetDataListURL"
                       :ref="mixPageRef" />
        <div class="bom">
          <ta-button @click="returns"
                     class="btnleft">取消</ta-button>
          <ta-button type="primary"
                     @click="submit"
                     class="btnleft">提交</ta-button>
        </div>
      </div>
    </ta-border-layout>
  </div>

</template>
<script>
import AddressComponent from '@component/common/components/addressComponent'
import listMixin from '@component/common/js/mixins/listMixin'
import moment from 'moment'
const tableColumns = [
  {
    title: '检查项',
    dataIndex: 'name21',
    width: '20%'
  },
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '检查内容',
    dataIndex: 'name',
    width: '20%'
  },
  {
    title: '检查细则',
    dataIndex: 'name1',
    width: '20%'
  },
  {
    title: '检查方式',
    dataIndex: 'name2',
    width: '20%'
  },
  {
    title: '检查结果',
    dataIndex: 'name23',
    width: '20%'
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
  mixins: [listMixin],
  components: {
    AddressComponent
  },
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,
      // 设置属性
      mixListOptions: {
        mixActivatedIsNeed: true, // 此页面是否在激活（进入）时，调用查询数据列表接口？
        mixGetDataListURL: '/childInfoApi/pageChildInfo' // 数据列表接口，API地址
      },
      mixPageRef: 'gridPager',

      disabled: false,
      addressmodel: [],
      visible: false,
      idedit: false,

      demandTypeList: [], // xxxx字典数据

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
      this.getMenu('RESOURCE_TYPE', 'demandTypeList') // 获取需求类型字典数据
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
    // 初始化数据
    initDatas () {
      this.flag = this.$route.query.flag
      this.disabled = false
      // 编辑或查看数据回显
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        if (this.flag == 'look') {
          this.disabled = true
        }
        this.post('', {}).then((res) => {
          if (res.serviceSuccess) {

          }
        })
      }
    },
    // 提交
    submit (e) {
      let _self = this
      let form = _self.form.getFieldsValue()
      let url = ''
      if (this.flag == 'edit') {
        url = ''
        form['id'] = _self.id
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          _self.post(url, form).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息保存成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('请填写必填信息！')
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.form.resetFields()

      this.$router.go(-1)
    },
    // 查询参数
    userPageParams () {
      let formData = {}
      return formData
    },
    setaddress () {
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    }
  }
}
</script>
<style scoped>
</style>
