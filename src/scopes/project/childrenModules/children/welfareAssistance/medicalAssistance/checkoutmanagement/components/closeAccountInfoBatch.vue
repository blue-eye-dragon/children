<template>
  <div>
    <div :ref="index+'out'"
         class="mars"
         v-for="(item,index) in listArr"
         :key="index">
      <div>

        <Title :title="'儿童体检费用'+(index+1)"
               :show.sync="attributeObj['show'+index]"
               style="float: left; width: 93%;"></Title>
        <div style="margin-left: 95%;"
             v-if="!disabled">
          <ta-button style="top: 8px;"
                     @click="delListArr(index)">删除</ta-button>
        </div>
      </div>

      <div>
        <ta-form layout="horizontal"
                 :ref="index">
          <p class="warntext">
            <ta-icon type="info-circle-o"
                     class="icons" />请根据单个儿童所需体检费用填写如下经费明细
          </p>
          <div>
            <p class="textSize">医疗康复费用:</p>
            <ul class="ulData">
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi">其他</li>
              <li class="ulDataLi lastLi">小计</li>

              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabled"
                                 :min="0"
                                 :max="9999999"
                                 :precision="2"
                                 v-model="item.rehabilitationMedicalCost"
                                 @blur="blurChangeOne($event,index)" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number v-model="item.rehabilitationSubtotal"
                                 :disabled="true" />
              </li>
            </ul>
          </div>
          <div>
            <p class="textSize">扣除项目:</p>
            <ul class="ulData">
              <li class="ulDataLi">医保报销</li>
              <li class="ulDataLi">大病保险</li>
              <li class="ulDataLi">医疗救助</li>
              <li class="ulDataLi">康复救助</li>
              <li class="ulDataLi">慈善捐助</li>
              <li class="ulDataLi">其他</li>
              <li class="ulDataLi lastLi">小计</li>

              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
            </ul>
          </div>
          <div style="margin-bottom: 30px;">
            <p class="textSize">申请“明天计划”资助金额:</p>
            <ul class="ulData">
              <li class="ulDataLi">诊疗费用</li>
              <li class="ulDataLi">康复费用</li>
              <li class="ulDataLi">特殊药品费用</li>
              <li class="ulDataLi">康复器具费用</li>
              <li class="ulDataLi">体检费用</li>
              <li class="ulDataLi">住院服务费</li>
              <li class="ulDataLi lastLi">小计</li>

              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="disabled"
                                 v-model="item.fundMedicalCost"
                                 :min="0"
                                 :max="9999999"
                                 :precision="2"
                                 @blur="blurChangeThree($event,index)" />
              </li>
              <li class="ulDataLiTwo">
                <ta-input-number :disabled="true"
                                 value="0" />
              </li>
              <li class="ulDataLiTwo lastLi">
                <ta-input-number v-model="item.fundSubtotal"
                                 :disabled="true" />
              </li>
            </ul>
          </div>
          <div class="operateBtn"
               v-if="!disabled">
            <ta-button type="primary"
                       icon="plus"
                       @click="selectChild(index)">选择儿童</ta-button>
            <ta-button type="primary"
                       icon="close"
                       @click="deleteChild(index)">删除全部儿童</ta-button>
          </div>
          <ta-table bordered
                    class="tables"
                    :columns="tableColumns"
                    :dataSource="item.childInfoForSettlementBatchVos">
            <span slot="num"
                  slot-scope="val,obj,index">
              <span>{{ index + 1 }}</span>
            </span>
            <span slot="birthday"
                  slot-scope="text">{{ text != null ? text.substring(0, 10) : ''}}</span>
            <span slot="registerDate"
                  slot-scope="text">{{ text != null ? text.substring(0, 10) : ''}}</span>
            <div slot="action"
                 slot-scope="val,obj,index1"
                 class="btnlist">
              <span @click="see(obj)"
                    class="com_textsee">查看</span>
              <ta-popconfirm title="确定删除吗?"
                             v-if="!disabled"
                             @confirm="deletes(obj,index1,index)"
                             okText="确定"
                             cancelText="取消">
                <span class="com_textdel">删除</span>
              </ta-popconfirm>
            </div>
          </ta-table>
        </ta-form>
      </div>
    </div>
    <div class="operateBtn"
         v-if="!disabled">
      <ta-button type="primary"
                 icon="plus"
                 @click="addFundDetails">新增经费明细</ta-button>
    </div>
    <div class="operateBtn">
      <div class="item_title">
        <div class="lines"></div>
        <p class="item_text">申请体检费用儿童数量：<span class="numClass">{{childNum}}</span>人，医疗康复费用费用合计：<span class="numClass">{{firstTotal}}</span>元，“明天计划”资助金额：<span class="numClass">{{thirdTotal}}</span>元</p>
      </div>
    </div>
    <div class="operateBtn">
      <p class="warntext">
        <ta-icon type="info-circle-o"
                 class="icons" />批量申请的体检费用，最多可添加100位儿童
      </p>
    </div>
    <div class="operateBtn">
      <div class="item_title">
        <div class="lines"></div>
        <p class="item_text1">相关医疗票据：</p>
      </div>
    </div>
    <ta-upload :withCredentials="true"
               :multiple="true"
               :action="action"
               name="file"
               :disabled="disabled"
               :fileList="fileList"
               @remove="handleRemove"
               @preview="preview"
               :data="fileData"
               :beforeUpload="beforeUpload"
               @change="filechange($event,'other')">
      <ta-button v-if="!disabled">
        <ta-icon type="upload" /> 上传文件
      </ta-button>
      <h3 v-if="disabled&&fileList.length==0">（暂无相关票据）</h3>
    </ta-upload>
    <p class="warntext">
      <ta-icon type="info-circle-o"
               class="icons" />附件上传格式：图片(jpg、jpeg、png)、doc、docx、pdf；单个文件不能超过10M。
    </p>

    <div>
      <ta-modal title="选择儿童"
                v-model="visible"
                width="80%"
                height="750px"
                :footer="null">
        <ApplicationSettlement @addsure="addsure"
                               :selectedChildId="selectedChildId"
                               ref="ApplicationSettlement"></ApplicationSettlement>
      </ta-modal>
      <ta-modal title="查看"
                v-model="visibleLook"
                width="90%"
                height="900px"
                :footer="null">
        <ChildInfoAndGuardian :disabled="true"
                              :childId="childId"
                              :childEnterId="childEnterId"
                              ref="childbase"></ChildInfoAndGuardian>
      </ta-modal>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'
import ApplicationSettlement from '../applicationSettlement'
import ChildInfoAndGuardian from './childInfoAndGuardian'

export default {
  components: {
    Title,
    ApplicationSettlement,
    ChildInfoAndGuardian
  },
  props: ['prominentChildId'],
  data () {
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
        // 在列定义中添加customCell单元格属性
        customCell: this.fnCustomCell
      },
      {
        title: '性别',
        align: 'center',
        dataIndex: 'sex',
        collectionType: 'sex'
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        align: 'center',
        scopedSlots: { customRender: 'birthday' }
      },
      {
        title: '儿童类别',
        align: 'center',
        dataIndex: 'childType',
        collectionType: 'CHILDCATEGORYA'
      },
      {
        title: '登记增员日期',
        dataIndex: 'registerDate',
        align: 'center',
        scopedSlots: { customRender: 'registerDate' }
      },
      {
        title: '操作',
        overflowTooltip: false,
        dataIndex: 'action',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }]
    return {
      tableColumns,
      listArr: [], // 生成的表单列表数组
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      disabled: false, // 字段只读控制
      visible: false, // 选择儿童的显隐控制
      visibleLook: false, // 选择儿童列表的查看控制显隐
      childId: '', // 选择儿童列表中儿童的id
      childEnterId: '', // 选择儿童列表中儿童的入院id
      index: 0, // 当前在操作的索引
      selectedChildId: [], // 已选择的儿童的入院id
      childNum: 0, // 申请体检费用儿童数量
      firstTotal: 0, // 医疗康复费用费用合计
      thirdTotal: 0, // “明天计划”资助金额
      fileList: [], // 相关医疗票据
      // 上传需要的参数
      fileData: {
        busiType: 11,
        functionalType: '2'
      }
    }
  },
  computed: {
    action () {
      return window.faceConfig.basePath + '/file/uploadFile'
    }
  },
  methods: {
    // record行信息,这里可以用来定义该列头的属性
    fnCustomCell (record) {
      const myCell = {
        class: 'myCellClass',
        style: {
          color: this.prominentChildId == record.childId ? 'red' : 'unset'
        },
        on: {
          click: () => {
            // console.log('CellClick')
          }
        }
      }
      return myCell
    },
    // 初始化数据
    initData () {
      this.repeatdata = []
      this.listArr = [{ childInfoForSettlementBatchVos: [], rehabilitationMedicalCost: 0, rehabilitationSubtotal: 0, fundMedicalCost: 0, fundSubtotal: 0 }]
      this.$set(this.attributeObj, 'show0', true)
      this.selectedChild = []
      this.childNum = 0
      this.firstTotal = 0
      this.thirdTotal = 0
    },
    // 删除体检信息
    delListArr (index) {
      const _self = this
      _self.listArr.forEach((item1, index1) => {
        if (index1 == index) {
          item1.childInfoForSettlementBatchVos.forEach(item2 => {
            _self.selectedChildId.splice(_self.selectedChildId.indexOf(item2.childEnterId), 1)
          })
        }
      })
      this.listArr.splice(index, 1)
      delete this.attributeObj['show' + index]
      this.$emit('uochanhei')
    },
    // 新增经费明细
    addFundDetails () {
      this.listArr.push({ childInfoForSettlementBatchVos: [], rehabilitationMedicalCost: 0, rehabilitationSubtotal: 0, fundMedicalCost: 0, fundSubtotal: 0 })
      this.$set(this.attributeObj, 'show' + (this.listArr.length - 1), true)
      this.$nextTick(() => {
        this.setHeight(this.listArr.length - 1, (this.listArr.length - 1) + 'out')
      })
    },
    // 第一行的体检费用blur事件
    blurChangeOne (e, index) {
      this.listArr[index].rehabilitationSubtotal = e.target.value
    },
    // 第三行的体检费用blur事件
    blurChangeThree (e, index) {
      this.listArr[index].fundSubtotal = e.target.value
    },
    // 计算总人数、总费用
    computeTotal () {
      let firstTotal = 0 // 医疗康复费用费用合计
      let thirdTotal = 0 // “明天计划”资助金额
      let childNum = 0
      this.listArr.forEach((item) => {
        firstTotal += this.multiply(item.rehabilitationMedicalCost, item.childInfoForSettlementBatchVos.length)// 医疗康复费用费用合计
        thirdTotal += this.multiply(item.fundMedicalCost, item.childInfoForSettlementBatchVos.length)// “明天计划”资助金额
        childNum += item.childInfoForSettlementBatchVos.length
      })
      this.childNum = childNum
      this.firstTotal = firstTotal
      this.thirdTotal = thirdTotal
    },
    // 删除
    deletes (e, index1, index) { // index1是列表中的索引，index是总的位置
      const _self = this
      _self.listArr[index].childInfoForSettlementBatchVos.splice(index1, 1)
      _self.selectedChildId.forEach((item, index3) => {
        if (item == e.childEnterId) {
          _self.selectedChildId.splice(index3, 1)
        }
      })

      this.setHeight(this.index, this.index + 'out')
    },
    // 选择儿童
    selectChild (index) {
      this.visible = true
      this.index = index
      this.$nextTick(() => {
        this.$refs.ApplicationSettlement.isNotChoseChildren = true
        const excludeChildEnterIds = [] // 要排除的儿童
        const includeChildEnterIds = [] // 本身的儿童
        this.listArr.forEach((item1, index1) => {
          item1.childInfoForSettlementBatchVos.forEach(item2 => {
            index != index1 ? excludeChildEnterIds.push(item2.childEnterId) : includeChildEnterIds.push(item2.childEnterId)
          })
        })
        this.$refs.ApplicationSettlement.excludeChildEnterIds = excludeChildEnterIds
        this.$refs.ApplicationSettlement.includeChildEnterIds = includeChildEnterIds
        setTimeout(() => {
          this.$refs.ApplicationSettlement.handleSubmit('search')
        }, 300)

        this.$refs.ApplicationSettlement.searchForm.resetFields()
      })
    },
    // 删除全部儿童
    deleteChild (index) {
      const _self = this
      _self.listArr[index].childInfoForSettlementBatchVos.forEach((item) => {
        _self.selectedChildId.splice(_self.selectedChildId.indexOf(item.childEnterId), 1)
      })
      _self.listArr[index].childInfoForSettlementBatchVos = []
      _self.$message.success('已删除全部儿童')
      this.setHeight(this.index, this.index + 'out')
    },
    // 查看儿童详情
    see (obj) {
      this.visibleLook = true
      this.childId = obj.childId
      this.childEnterId = obj.childEnterId
      this.$nextTick(() => {
        // 加载儿童基本信息和监护人信息数据
        this.$refs.childbase.loadData()
      })
    },
    // 添加
    addsure (val, tableData) {
      if (val.length > 100) {
        this.$message.warn('选择的儿童数量已超过100条，表单将不能正常提交！')
        return
      }

      this.$message.success('添加成功')
      const tableDataIds = []
      tableData.forEach(item => {
        tableDataIds.push(item.childEnterId)
      })
      const { childInfoForSettlementBatchVos } = this.listArr[this.index]
      // 遍历删除重复数据重新添加
      if (childInfoForSettlementBatchVos.length > 0) {
        for (let i = childInfoForSettlementBatchVos.length - 1; i >= 0; i--) {
          if (tableDataIds.includes(childInfoForSettlementBatchVos[i].childEnterId)) {
            childInfoForSettlementBatchVos.splice(i, 1)
          }
        }
      }

      childInfoForSettlementBatchVos.push(...val)
      const selectedChildId = []
      this.listArr.forEach(element => {
        element.childInfoForSettlementBatchVos.forEach(item => {
          selectedChildId.push(item.childEnterId)
        })
      })

      this.selectedChildId = selectedChildId

      this.setHeight(this.index, this.index + 'out')
    },
    // 对比获取相同属性名不同值的属性名
    getChangeAttr (newVal) {
      const oldVal = this.attributeObj_copy
      let attrname = ''
      for (var k in oldVal) {
        if (newVal[k] != oldVal[k]) {
          attrname = k
        }
      }
      this.attributeObj_copy = JSON.parse(JSON.stringify(this.attributeObj))
      return attrname
    },
    // 附件预览
    preview (file) { this.downloadFile(file) },
    // 附件change事件
    filechange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        this.fileList = info.fileList
      }
      if (info.file.status === 'removed') {
        if (this.disabled) {
          return false
        }
        this.fileList = info.fileList
      }

      if (info.file.status === 'done') {
        // 上传成功
        if (info.file.response.serviceSuccess) {
          this.fileList = info.fileList
          this.$message.success('文件上传成功!')
        } else {
          this.fileList = []
          this.$message.error('文件上传失败!')
        }
      }

      this.$emit('uochanhei')
    },
    // 附件上传前的验证
    beforeUpload (file) {
      return this.before_Upload(file)
    },
    // 附件删除
    handleRemove (e) {
      if (this.disabled) {
        return false
      }
      const fileId = e.response.data.data.fileid
      const _self = this
      _self.post('file/deleteBatchFileByReturnFileIds', {
        returnFileIds: fileId
      })
        .then((response) => {
          _self.$message.success('文件删除成功!')
          _self.$emit('fileDataProcess', 'del', fileId)
        })
        .catch(() => {
          _self.$message.error('文件删除失败!')
        })
      this.$emit('uochanhei')
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (!(this.$refs[ref] instanceof Array) && this.$refs[ref].$el != undefined) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
          if (this.$refs[ref] instanceof Array && this.$refs[ref][0].$el != undefined) {
            if (!istrue) {
              node[0].style.height = this.$refs[ref][0].$el.offsetHeight + 90 + 'px'
            } else {
              node[0].style.height = '50px'
            }
            node[0].style.transition = 'all 1s'
          }
        }
        setTimeout(() => {
          this.$emit('uochanhei')
        }, 1001)
      })
    }
  },
  watch: {
    attributeObj: {
      handler (newVal) {
        const keyname = this.getChangeAttr(newVal)
        if (keyname && keyname.length > 0) {
          setTimeout(() => {
            this.setHeight(keyname.replace('show', ''), keyname.replace('show', '') + 'out', !newVal[keyname])
          }, 300)
        }
      },
      deep: true
    },
    listArr: {
      handler () {
        this.computeTotal()
      },
      deep: true
    },
    childNum (val) {
      if (val > 100) {
        this.$message.warn('选择的儿童数量已超过100条，表单将不能正常提交！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.ulData {
  width: 100%;
  height: 100px;
  margin: 10px 0 10px 0;
  border-radius: 4px 4px 0 0;
  margin-left: 2%;
}
.ulData li {
  list-style: none;
  float: left;
  width: 14%;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  text-align: center;
}
.ulData .ulDataLi {
  background: rgba(240, 247, 253, 1);
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
}
.ulData .lastLi {
  border-right: 1px solid rgba(0, 0, 0, 0.09);
}
.ulData .ulDataLiTwo,
.ulData .ulDataLiThree,
.ulData .ulDataLiFour {
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  opacity: 1;
}
.ulData .ulDataLiFour {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.ant-input-number {
  border: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.textSize {
  font-size: 16px;
  padding-top: 20px;
}
.warntext {
  width: 100%;
  height: 47px;
  background: rgba(255, 251, 230, 0.6);
  border: 1px solid rgba(255, 229, 143, 0.6);
  margin-top: 23px;
  display: flex;
  align-items: center;
}
.item_title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.item_text {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.item_text1 {
  width: 140px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 5px;
}
.lines {
  width: 3px;
  height: 15px;
  background: rgba(24, 144, 255, 1);
  opacity: 1;
}
.numClass {
  font-weight: bold;
  font-size: 20px;
  color: #0099ec;
  margin: auto 5px;
}
.tables {
  margin-bottom: 25px;
}
</style>
