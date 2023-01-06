<template>
  <!--基本信息tb7-->
  <div>
    <ta-form layout="horizontal"
             :autoFormCreate="(inAllFrom)=>{this.inAllFrom = inAllFrom}">
      <ta-row class="fromcom">
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="儿童编号"
                          fieldDecoratorId="childNumber">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="儿童类别"
                          fieldDecoratorId="childType">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item,index) in childtypelist"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="姓名"
                          fieldDecoratorId="name">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="性别"
                          fieldDecoratorId="sex">
              <ta-select :disabled="true">
                <ta-select-option v-for="(item,index) in sexList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="出生日期"
                          fieldDecoratorId="birthday">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="残疾类型"
                          fieldDecoratorId="disabilityType">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="患病类型"
                          fieldDecoratorId="illnessType">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item v-if="!isHidden"
                          label="所属福利机构"
                          :labelCol="{span:7}"
                          :wrapperCol="{span:17}"
                          fieldDecoratorId="orgName">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item v-if="isHidden"
                          label="所属民政部门"
                          fieldDecoratorId="orgName">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-col>

        <ta-col :span="24">
          <ta-col :span="6">
            <ta-form-item label="康复类型"
                          :require="{message:'请选择康复类型'}"
                          fieldDecoratorId="rehabilitTypes">
              <ta-select :disabled="noEdit"
                         mode="multiple">
                <ta-select-option v-for="(item,index) in recoverTypesList"
                                  :value="item.value"
                                  :key="index">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="来源"
                          fieldDecoratorId="sourceName">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="批次"
                          fieldDecoratorId="rehabilitBatches"
                          :require="{message:'请选择批次'}">
              <ta-input :disabled="true"
                        placeholder="请选择批次"
                        style="width: 68%;float: left;" />
              <ta-button type="primary"
                         @click="showModalSelect"
                         style="width: 30%;float: left;">选择</ta-button>
              <ta-modal title="批次选择"
                        v-model="selectVisible"
                        @ok="hideModalSelect"
                        okText="确认"
                        cancelText="取消">
                <div style="border: 1px solid lightgray;margin-top: 10px;height: 300px;     overflow: overlay;">
                  <div>
                    <ta-e-tree :data="pcdata"
                               node-key="id"
                               :props="defaultProps"
                               :highlight-current="true"
                               :default-expand-all="false"
                               @node-click="fnNodeClick">
                      <span slot-scope="{node,data}">
                        <!--自定义数据展示,如下就是将主键和label以及othermsg拼装显示- :disabled='false'style="color:red ;  position: relative;left: 319px; " -->
                        <div style="float: left;">
                          <span>{{data.name}}</span>
                          <!-- 如果是大于等于当前年，则显示后缀增删操作按钮。   style="color:green ;  position: relative;left: 319px;"     v-if="parseInt(nowYear)<=parseInt(data.labelo)"  -->
                          <div style="float: right;"
                               v-if="check(data)">
                            <span @click.stop="addOrDel(node,data,'1')">
                              <ta-icon style="color:green ; position: absolute; left: 414px;"
                                       type="plus-circle" />
                            </span>
                            <!-- <span @click.stop="addOrDel(node,data,'2')">
                              <ta-icon style="color:red ; position: absolute;left: 432px;"
                                       type="delete" />
                            </span> -->
                          </div>
                        </div>
                      </span>
                    </ta-e-tree>
                  </div>
                </div>
              </ta-modal>
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="康复师"
                          fieldDecoratorId="rehabiliter"
                          :fieldDecoratorOptions="verificationRules('康复师',72)">
              <ta-input :disabled="noEdit"
                        placeholder="请输入康复师" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">

          <ta-col :span="6">
            <ta-form-item label="登记日期"
                          fieldDecoratorId="registratDate"
                          :require="{message:'请输入登记日期'}">
              <ta-date-picker placeholder="请选择登记日期"
                              format="YYYY-MM-DD"
                              style="width: 100%"
                              :disabled="noEdit"
                              :disabledDate="disabledDate" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="主管康复医师"
                          :labelCol="{span:8}"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="chiefPhysician"
                          :fieldDecoratorOptions="verificationRules('主管康复医师',72)">
              <ta-input :disabled="noEdit"
                        placeholder="请输入主管康复医师" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="6">
            <ta-form-item label="护士"
                          fieldDecoratorId="nurse"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('护士',72)">
              <ta-input placeholder="请输入护士" />
            </ta-form-item>
          </ta-col>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="康复儿童情况描述"
                        class="recovered"
                        fieldDecoratorId="recoveredDescription"
                        :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
            <ta-textarea :disabled="noEdit"
                         :rows="4"
                         placeholder="请输入康复儿童情况描述" />
          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>
    <!-- <div class="bom">

      <ta-button class="preservation"
                 @click="back">返回</ta-button>
      <ta-button type="primary"
                 class="preservation"
                 @click="save">提交</ta-button>
    </div> -->
  </div>
</template>
<script>
import { format } from 'path'
import moment from 'moment'
import { nextTick } from 'q'

const data = [
  {
    ids: 1,
    labelo: '2018000',
    label: '2018年',
    children: [
      {
        ids: 2,
        label: '2018001',
        labelo: '2018001'
      }
    ]
  },
  {
    ids: 4,
    labelo: '2019000',
    label: '2019年',
    children: [
      {
        label: '2019001',
        labelo: '2019001',
        ids: 5
      }
    ]
  }
]
export default {
  moment,

  props: {
    ids: {
      type: String,
      required: false
    },
    notShow: {
      type: Boolean,
      required: false
    },
    thisP: {
      required: true
    },
    pcdata: {
      type: Array,
      required: false
    },
    nowYear: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      noEdit: false,
      selectVisible: false,
      defaultProps: {
        id: 'id',
        children: 'children',
        name: 'name'
      },
      data,
      illnesstypeList: [],
      disabilitytypeList: [],
      childtypelist: [],
      sexList: [],
      recoverTypesList: [],
      disabilitytypeLists: '',
      getillnesstypeLists: '',
      orgType: '',
      isHidden: false,
      comeId: '',
      mustInfos: [],
      selectValue: null // 康复批次选择的数据

    }
  },
  created () {
    this.setLabelAndWrapperWidth('9%', '91%', 'recovered') // 康复儿童情况描述 字段宽度控制
  },
  activated () {
    // this.getData() // 获取默认显示数据 2019年10月10日10:12:20未
    setTimeout(() => {
      this.setLabelAndWrapperWidth('9%', '91%', 'recovered') // 康复儿童情况描述 字段宽度控制
      this.getData()
    })
  },
  mounted () {
    this.setLabelAndWrapperWidth('9%', '91%', 'recovered') // 康复儿童情况描述 字段宽度控制
    this.getchildtype()
    this.getsexList()
    this.getrecoverTypesList()

    setTimeout(() => {
      this.getData()
    })
  },
  methods: {
    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '', value, callback, '0')
    },
    // async getpcdata () {
    //   const data = await this.post('/pitchManager/getTreeJson')

    //   this.pcdata = Array.from(data)
    // },
    // 获取儿童类型
    async getchildtype () {
      const data = await this.getDictionaries('CHILDCATEGORYA')
      this.childtypelist = data
    },
    // 患病类型
    async getillnesstypeList () {
      this.getillnesstypeLists = []
      const data = await this.getDictionaries('ILLNESSTYPE')
      this.illnesstypeList = data
      if (this.mustInfos[0].illnessType) {
        const arr = this.mustInfos[0].illnessType.split(',')
        arr.forEach(element => {
          this.illnesstypeList.forEach(item => {
            if (element == item.value) {
              this.getillnesstypeLists += item.label + ','
            }
          })
        })

        this.$nextTick(() => {
          this.inAllFrom.setFieldsValue({
            illnessType: this.getillnesstypeLists.substring(
              0,
              this.getillnesstypeLists.length - 1
            )
          })
        })
      }
    },

    // 残疾类型
    async getdisabilitytypeList () {
      this.disabilitytypeLists = []
      const data = await this.getDictionaries('DISABILITYTYPE')
      this.disabilitytypeList = data
      if (this.mustInfos[0].disabilityType) {
        const arr = this.mustInfos[0].disabilityType.split(',')
        arr.forEach(element => {
          this.disabilitytypeList.forEach(item => {
            if (element == item.value) {
              this.disabilitytypeLists += item.label + ','
            }
          })
        })
        this.inAllFrom.setFieldsValue({
          disabilityType: this.disabilitytypeLists.substring(
            0,
            this.disabilitytypeLists.length - 1
          )
        })
      }
    },
    async getsexList () {
      const data = await this.getDictionaries('SEX')
      this.sexList = data
    },
    // 康复类型
    async getrecoverTypesList () {
      const data = await this.getDictionaries('REHABILITATTYPES')
      this.recoverTypesList = data
    },
    // 登记日期处理
    disabledDate (current) {
      // 不能选择今天以后的日期
      return current > moment().endOf('day')
    },
    save (e) {
      this.inAllFrom.validateFields(async (err, values) => {
        if (!err) {
          this.$confirm({
            title: '请确认其他康复相关信息是否已经全部填写，提交后将结束本次康复训练',
            onOk: () => {
              const params = this.inAllFrom.getFieldsValue()
              this.changetime(params)
              params.rehabiliteId = this.ids
              params.rehabilitTypes = params.rehabilitTypes.join(',')
              params.enterId = this.comeId //
              let url = ''
              if (this.ids) {
                url = '/rehabilitManage/update'
              } else {
                url = '/rehabilitManage/save'
              }
              this.post(url, params).then((res) => {
                if (res.serviceSuccess) {
                  if (e) { // 评估总结提交
                    this.$emit('summarizeSave')
                  }
                  this.$message.success('数据保存/更新成功!')
                  this.back()
                }
              })
            },
            onCancel: () => { }
          })
        } else {
          if (e) { // 评估总结的提交
            this.$emit('update:intbegin', '7')
            this.$message.error('请先填写基本信息数据再进行评估总结!')
          } else { // 基本信息的提交
            this.$message.error('校验不通过，无法提交，请再次检查!')
          }
        }
      })
    },
    async getData () {
      const params = { rehabiliteId: this.ids } // 康复治疗的id

      const result = await this.post('/rehabilitManage/queryRehabilitManageBaseInfo', params) // 暂无接口 2019年10月10日10:20:09'/rehabilitManage/queryById'
      if (!result.errors) {
        this.mustInfos = result.data.data
        this.comeId = result.data.data[0].id
        if (result.data.data[0].rehabilitTypes) {
          result.data.data[0].rehabilitTypes = result.data.data[0].rehabilitTypes.split(',')
        }
        if (result.data.data[0].orgType == 0) {

        } else {
          this.isHidden = false
        }
        this.$nextTick(() => {
          this.inAllFrom.setFieldsValue(result.data.data[0])

          this.inAllFrom.setFieldsValue({
            registratDate: result.data.data[0].registratDate
              ? moment(result.data.data[0].registratDate)
              : null,
            birthday: result.data.data[0].birthday
            // ? moment(result.data.data[0].birthday)
            // : null
          })
        })
      }

      this.getillnesstypeList()
      this.getdisabilitytypeList()
    },
    changetime (data, e) {
      for (var k in data) {
        // 是对象 不是数组
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        // 是数组  数组元素为对象
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
      }
    },

    showModalSelect () {
      this.selectValue = null
      this.selectVisible = true
    },
    hideModalSelect () {
      this.selectVisible = false
      // 只有在点击树中的批次时才进行批次赋值
      if (this.selectValue) {
        this.inAllFrom.setFieldsValue({
          rehabilitBatches: this.selectValue
        })
      }
    },

    /**
     * 节点被点击时调用
     * @param data data数组中表示该节点的对象
     * @param node 当前节点
     * @param nodeComponent 节点组件本身
     */
    fnNodeClick (data, node, nodeComponent) {
      if (node.isLeaf) {
        this.$nextTick(() => {
          this.selectValue = data.name
          //   this.inAllFrom.setFieldsValue({
          //     rehabilitBatches: data.name
          //   })
        })
        // this.hideModalSelect()
      }
    },
    async addOrDel (node, data, or) {
      let url = ''
      if (or == 1) {
        url = '/pitchManager/addTreeNode'
      } else {
        url = '/pitchManager/updateDelStateById'
      }
      const param = {
        name: data.name
      }
      const add = await this.post(url, param)
      if (!add.error) {
        this.thisP.getpcdata()
      }
    },
    check (a) {
      if (parseInt(a.name).toString().length == 4) {
        if (this.nowYear <= parseInt(a.name)) {
          const labelList = []
          this.thisP.pcdata.forEach(e => {
            if (parseInt(e.name).toString().length == 4) {
              labelList.push(parseInt(e.name))
            }
          })
          labelList.sort(function (a, b) {
            return a - b
          })
          if (parseInt(a.name) == labelList[labelList.length - 1]) {
            return true
          }
        } else {
          return false
        }
      } else {
        if (a.name <= parseInt(this.nowYear + '000')) {
          return false
        } else {
          // 当前以后批次号
          const labelList = []
          let bol = false
          this.thisP.pcdata.forEach(e => {
            if (e.name == a.name.substr(0, 4) + '年') {
              e.children.forEach(item => {
                labelList.push(item.name)
              })
              labelList.sort(function (a, b) {
                return a - b
              })
              if (a.name == labelList[labelList.length - 1]) {
                bol = true
              }
            }
          })
          return bol
        }
      }
    },
    back () {
      // 取消。提交
      this.$router.go(-1)
    },
    dels () { },
    adds (types, obj) {
      // 添加
      this.$router.push({
        path: 'checkBodyInfo',
        query: {
          types: types,
          ids: obj ? obj.id : ''
        }
      })
    },
    add () {
      this.$router.push({
        path: 'checkBodyInfo',
        query: {}
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },

    onSelectTime (date, dateString) { }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.preservation {
  margin: 20px;
}
/deep/ .el-tree-node:focus > .el-tree-node__content {
  background-color: #a2cfe8 !important;
}
</style>
