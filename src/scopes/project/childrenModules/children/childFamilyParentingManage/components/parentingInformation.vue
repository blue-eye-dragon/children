<template>
  <div style="padding: 1% 3%;">
    <div>
      <div class="visitbtn">
        <!-- label中的必填class class="ant-form-item-required" -->
        <!-- <div class="ant-col-2 ant-form-item-label"
             style="width: 6%;"><label for="name"
                 title="养育儿童"
                 style="font-size: 16px;">养育儿童</label></div> -->
        <ta-button type="primary"
                   class="addbtn btnleft"
                   :disabled="disabled"
                   @click="addAdoption">新增</ta-button>
      </div>
      <ta-table bordered
                style="margin: 1% 0%;"
                class="tables table-min-width"
                :columns.sync="tableColumns"
                :showOverflowTooltip="true"
                :dataSource="tableDatas"
                ref="table">
        <span slot="num"
              slot-scope="a, b, c">
          <span>{{ size * (page - 1) + c + 1 }}</span>
        </span>
        <div slot="action"
             slot-scope="text,obj,index"
             class="btnlist">
          <span class="com_textedit"
                @click="deleteChild(text,obj,index)"
                v-if="disabled?false:obj.delState=='1'">养育结束</span>
          <span class="over"
                v-if="disabled?false:obj.delState=='0'">养育已结束</span>
        </div>
      </ta-table>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.parentingForm = form}">
        <ta-form-item label="备注"
                      :labelCol="{ span: 1 }"
                      :wrapperCol="{span:22}"
                      fieldDecoratorId="remarks"
                      :fieldDecoratorOptions="verificationRulesNotMustFill('备注',200,true)">
          <ta-textarea :disabled='disabled'
                       :rows="4" />
        </ta-form-item>
      </ta-form>
    </div>
    <!-- 新增的抽屉 -->
    <ta-drawer :title="isDelete?'养育结束':'添加'"
               :visible="visible"
               @close="visible=false"
               width="800"
               :getContainer="setContainer"
               :bodyStyle="{height:'auto',overflow:'auto' ,paddingBottom:'0px'}">
      <ta-form :autoFormCreate="(form)=>{this.form = form}"
               layout="horizontal">
        <ta-form-item label
                      :labelCol="{ span: 1 }"
                      :wrapperCol="{span:23}">
          <ta-button type="primary"
                     class="preservation"
                     @click='selectChild'
                     :disabled='isDelete'>选择儿童</ta-button>
        </ta-form-item>

        <ta-form-item label="已选择儿童"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }">
          <!-- :fieldDecoratorOptions="{rules: [{ required: false, message: '11' }]}" -->
          <div class="chosechild">
            <div v-for="(item,index) in childList"
                 :key="index"
                 :value="item.childNumber"
                 class="children">
              {{item.name}}
              <ta-popconfirm title="确定删除吗?"
                             @confirm="del(index)"
                             @cancel="cancel"
                             okText="确定"
                             cancelText="取消"
                             v-if="!isDelete">
                <ta-icon class="dels"
                         type="close" />
              </ta-popconfirm>
            </div>
          </div>
        </ta-form-item>
        <ta-form-item label="养育开始日期"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      fieldDecoratorId="rearDateStart"
                      :require="{message:'请选择养育开始日期'}">
          <ta-date-picker style="width: 100%;"
                          :disabled='disabled1'
                          v-model="startValue"
                          :disabledDate="disabledStartDate" />
        </ta-form-item>
        <ta-form-item label="养育结束日期"
                      :labelCol="{ span: 4 }"
                      :wrapperCol="{ span: 20 }"
                      fieldDecoratorId="rearDateEnd"
                      :require="!isDelete?null:{message:'请选择养育结束日期'}">
          <ta-date-picker style="width: 100%;"
                          :disabled='!isDelete'
                          :disabledDate="disabledEndDate"
                          v-model="endValue" />
        </ta-form-item>
      </ta-form>
      <div slot="footer">
        <ta-button key="back"
                   @click="onClose">取消</ta-button>
        <ta-button key="submit"
                   type="primary"
                   @click="subfamily"
                   v-if="!disabled">确定</ta-button>
      </div>
    </ta-drawer>
    <!-- 抽屉中选择儿童的弹窗 -->
    <ta-modal title="选择儿童"
              v-model="visible1"
              width="90%"
              :footer="null">
      <ChoiceChildren :tableColumns="tableColumns1"
                      :isFamily="false"
                      v-if="visible1"
                      @addsure="addsure"
                      url="/familyLikeRear/getChildList"
                      :searchdata="searchdata"></ChoiceChildren>
    </ta-modal>
  </div>
</template>

<script>
import localList from '@component/common/js/mixins/localList'
import ChoiceChildren from '@component/common/components/ChoiceChildren'
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
    title: '儿童姓名',
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
    title: '身份证号',
    dataIndex: 'idCard',
    width: '15%'
  },
  {
    title: '养育起始日期',
    width: '20%',
    dataIndex: 'rearDateStart'
  },
  {
    title: '养育结束日期',
    dataIndex: 'rearDateEnd',
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
const tableColumns1 = [
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
    width: '30%'
  },
  // {
  //   title: '出生日期',
  //   dataIndex: 'birth'
  // },
  // {
  //   title: '儿童类别',
  //   dataIndex: 'childType',
  //   collectionType: 'CHILDCATEGORYA'
  // },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '40%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    collectionType: 'sex',
    width: '30%'
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
  mixins: [localList],
  components: {
    ChoiceChildren
  },
  props: ['disabled'],
  data () {
    return {
      tableColumns,
      tableColumns1,
      tableDatas: [],
      tablename: 'tableDatas',
      disabled1: false, // 抽屉中的只读控制
      visible: false, // 抽屉控制
      visible1: false, // 弹窗控制
      heathmodel: [], // 健康状况数据
      labelwidth: { label: 6, wrapper: 18 },
      name: '', // 选择儿童的姓名
      searchdata: {},
      repeatdata: [], // 重复数据
      isall: true, // 全部添加的显隐
      childList: [], // 选择的儿童数据
      isDelete: false, // 判断是否是删除操作

      startValue: null, // 开始日期
      endValue: null // 结束日期
    }
  },
  activated () {
    this.initDatas()
  },
  methods: {
    initDatas () {
      this.tableDatas = []
      this.name = ''
      this.repeatdata = []
      if (this.parentingForm) {
        this.parentingForm.resetFields()
      }
    },
    // 选择儿童
    selectChild (val, data) {
      this.nowkey = val
      this.searchdata.name = data
      this.visible1 = true
    },
    // 增加
    addAdoption () {
      this.ishiderelationship = false
      this.rowSelection.selectedRowKeys = []
      this.isdisabled = true
      this.key = 1
      this.visible = true
      this.idedit = false
      this.isDelete = false
      this.disabled1 = false
      this.fileList = []
      this.$nextTick(() => {
        this.form.resetFields()
      })
    },
    cancel () {

    },
    del (e) {
      this.childList.splice(e, 1)
    },
    // 开始日期控制
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      } else {
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 结束日期控制
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!startValue || !endValue) {
        return false
      } else {
        return startValue.valueOf() >= endValue.valueOf()
      }
    },
    // 添加
    addsure (val) {
      const nowdata = this.childList
      const isrepeat = this.duplicateremoval(val, nowdata)
      if (isrepeat) {
        this.$message.error(`${this.repeatdata.name}已添加`)
        return false
      }

      const isrepeatByList = this.duplicateremovalByList(val, this.tableDatas)
      if (isrepeatByList) {
        this.$message.error(`${this.repeatdata.name}已添加`)
        return false
      }
      this.$message.success('添加成功')
      this.childList = [...this.childList, ...val]
    },
    // 去重
    duplicateremoval (val, data) {
      let isrepeat = false
      val.map(item => {
        data.map(e => {
          if (e.id == item.id) {
            isrepeat = true
            this.repeatdata = item
            return false
          }
        })
      })
      return isrepeat
    },

    // 和列表去重
    duplicateremovalByList (val, data) {
      let isrepeat = false
      val.map(item => {
        data.map(e => {
          if (e.childId == item.id) {
            isrepeat = true
            this.repeatdata = item
            return false
          }
        })
      })
      return isrepeat
    },
    // 抽屉里面的确定
    subfamily () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = this.form.getFieldsValue()
          this.changetime(data)
          if (this.key == 1) {
            // 新增
            const newData = [...this[this.tablename]]
            for (var i = 0; i < this.childList.length; i++) {
              const objs = {}
              Object.assign(objs, this.childList[i], data)
              objs.childId = objs.id
              delete objs.id
              // 添加删除状态（0已删除，1未删除）
              objs.delState = '1'
              newData.unshift(objs)
            }
            this.tableDatas = newData
          } else {
            // 修改
            const e = parseFloat(this.nowindex + ((this.page - 1) * this.size))
            data.childId = this.tableDatas[e].childId
            data.id = this.keyid
            const objs = {}
            Object.assign(objs, this.childList[0], data)
            if (data.rearDateEnd < data.rearDateStart) {
              this.$message.error('养育结束日期不能小于养育开始日期')
              return false
            }

            if (this.isDelete) { // 删除的确定，修改删除状态
              this.isDelete = false
              this.disabled1 = false
              objs.delState = '0'
            }
            this.tableDatas.splice(e, 1, objs)
          }
          this.form.resetFields()
          this.visible = false
        }
      })
    },
    // 删除（填写结束日期，更改删除状态）类似于编辑
    deleteChild (val, obj, index) {
      this.visible = true

      this.isDelete = true
      this.disabled1 = true
      this.nowindex = index
      const datas = JSON.parse(JSON.stringify(obj))
      this.dateprocessing(datas)
      this.keyid = datas.id
      this.$nextTick(() => {
        this.childList.push(obj)
        this.form.setFieldsValue({
          rearDateStart: obj.rearDateStart ? moment(obj.rearDateStart) : null,
          rearDateEnd: moment().locale('zh-cn') // 结束日期默认当前日期
        })
      })

      this.key = 2
    },
    // 时间及健康状况处理
    dateprocessing (e) {
      e.birthday = e.birthday ? moment(e.birthday) : null
      return e
    },
    setContainer () {
      return this.set_Container('tadrawer')
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.childList = []
      }
    }
    // disabled: {
    //   handler: function (val, n) {
    //     alert(val)
    //     let array = []
    //     array.push('action')
    //     if (val) {

    //       this.$refs.table.hideColumns(array)
    //     } else {

    //       this.$refs.table.showColumns(array)
    //     }
    //   },
    //   immediate: true
    // }
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
.preservation {
  margin-left: 20px;
}
.chosechild {
  padding: 11px 15px 0 15px;
  //   border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
  border: 1px solid #636363;

  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 100px;
  cursor: pointer;
  border-radius: 5px;
}
.children {
  padding: 0 10px;
  background: rgba(218, 238, 255, 1);
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
  margin-bottom: 11px;
  height: 40px; // 后添加的
}
.over {
  background: #ededed;
  border: 1px solid rgba(182, 182, 182, 0.65098);
  opacity: 1;
  border-radius: 4px;
  display: inline-block;
  color: #a1a1a1;
  text-align: center;
  margin-right: 8px;
}
</style>
