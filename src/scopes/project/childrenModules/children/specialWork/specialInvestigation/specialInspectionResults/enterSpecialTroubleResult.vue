<template>
  <div class="conts"
        >

    <div class="contin">
      <div>
        <h3>检查基本信息</h3>
        <ta-divider style="margin: 10px 0;" />
      </div>
      <div>
        <ta-form layout="horizontal"
                 :id="'content'"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row class="fromcom">
            <ta-col :span="24">
              <ta-form-item label="专项排查任务"
                            :require="{message:'请选择专项排查任务'}"
                            class="alonerow"
                            fieldDecoratorId="taskId">
                <ta-select :placeholder="disabled?'':'请选择专项排查任务'"
                           :disabled="this.flag=='edit'?true:disabled"
                           @change="taskChange">
                  <ta-select-option v-for="(item ,index) in taskIdList "
                                    :key="index"
                                    :value="item.id">{{item.taskTitle}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <AreaQuery msg="区域"
                           :fileldName="'address_Linkage'"
                           :drawer="'content'"
                           :isrule="true"
                           :addressmodel="addressmodel"
                           @adsvalchange="adsvalchange"
                           @setaddress="setaddress"
                           :disabled="flag!='add'"
                           :allowClear="false"
                           :ishide="false"
                           class="area"></AreaQuery>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label="被检查单位"
                              fieldDecoratorId="checkedOrg"
                              :require="{enable:this.flag=='add',message:'请选择被检查单位'}"
                              :labelCol="{ span: 6 }"
                              :wrapperCol="{span:18}">
                  <ta-select :placeholder="flag!='add'?'':'请选择专项排查任务'"
                             :disabled="flag!='add'"
                             @change="checkedOrgChange">
                    <ta-select-option v-for="(item ,index) in checkedOrgNameList "
                                      :key="index"
                                      :name="item.orgName"
                                      :value="item.orgId">{{item.orgName}}</ta-select-option>
                  </ta-select>

                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="检查单位"
                              fieldDecoratorId="checkOrgName">
                  <ta-input :disabled='true'
                            :placeholder="''" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label='检查组成员'
                            fieldDecoratorId="checkTeamMember"
                            class='alonerow'
                            :fieldDecoratorOptions="verificationRulesNotMustFill('检查组成员',300,true)">
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
                              fieldDecoratorId="checkDate"
                              :require="{message:'请选择检查日期'}">
                  <ta-date-picker style="width: 100%;"
                                  :disabledDate="disabledDate"
                                  :placeholder="!disabled?'请选择检查日期':''"
                                  :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="被检查单位负责人"
                              :labelCol="{ span: 11 }"
                              :wrapperCol="{span:13}"
                              fieldDecoratorId="checkedOrgLeader"
                              :fieldDecoratorOptions="verificationRules('被检查单位负责人',20)">
                  <ta-input :disabled='disabled'
                            :placeholder="disabled?'':'请输入被检查单位负责人'" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="录入人员"
                              :labelCol="{ span: 10 }"
                              :wrapperCol="{span:14}"
                              fieldDecoratorId="recordUser"
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
                                  :disabledDate="disabledDate"
                                  :placeholder="!disabled?'请选择录入日期':''"
                                  :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label='检查结果小计'
                            fieldDecoratorId="checkResults"
                            class='alonerow'>
                <ta-textarea :placeholder="!disabled?'请输入检查结果小计':''"
                             :rows="4"
                             :disabled="true" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label='已整改内容或下步整改计划'
                            fieldDecoratorId="refromPlan"
                            class='alonerow'
                            :fieldDecoratorOptions="verificationRulesNotMustFill('已整改内容或下步整改计划',500,true)">
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
                :dataSource="dataSource">
        <span slot="checkSituation"
              slot-scope="a, b, c">
          <!-- 此处必须有一个占位  不然空值时，单选插槽无效 -->
          <div style="display: none;">&nbsp;</div>
          <ta-radio-group name="radioGroup"
                          @change="onChange($event,b,c)"
                          v-model="b.checkSituation"
                          :disabled="disabled">
            <ta-radio :style="radioStyle"
                      :value="'A'">A-符合</ta-radio>
            <ta-radio :style="radioStyle"
                      :value="'B'">B-部分符合</ta-radio>
            <ta-radio :style="radioStyle"
                      :value="'C'">C-不符合</ta-radio>
          </ta-radio-group>
        </span>
      </ta-table>
      <div style="text-align: right;">
        <ta-pagination :total="totalNum"
                       @change="paginChange"
                       v-model="current"
                       @showSizeChange="sizeChange" />
      </div>
    </div>
    <div class="bom">

      <ta-button @click="returns"
                 class="btnleft">返回</ta-button>
      <ta-button type="primary"
                 @click="submit('1')"
                 v-if="!disabled"
                 class="btnleft temporarystorage">保存</ta-button>
      <ta-button type="primary"
                 @click="submit('2')"
                 v-if="!disabled"
                 class="btnleft">提交</ta-button>

    </div>

  </div>

</template>
<script>
import AreaQuery from '@component/common/components/areaQuery'
import moment from 'moment'
// 检查项合并处理
const render = (text, record, index) => {
  const obj = {
    children: text,
    attrs: {}
  }
  obj.attrs.rowSpan = record.rowSpan
  return obj
}
// 检查结果合并处理
const render1 = (text, record, index) => {
  const obj = {
    children: text == '1' ? '整改' : '提升',
    attrs: {}
  }
  obj.attrs.rowSpan = record.rowSpan
  return obj
}
const tableColumns = [
  {
    title: '检查项',
    dataIndex: 'checkProject',
    width: '15%',
    scopedSlots: { customRender: 'checkProject' },
    customRender: (text, record, index) => {
      return render(text, record, index)
    }
  },
  {
    title: '序号',
    dataIndex: 'serialNum',
    align: 'center',
    width: '80px'
  },
  {
    title: '检查内容',
    dataIndex: 'checkContent',
    width: '15%'
  },
  {
    title: '检查细则',
    dataIndex: 'checkDetail',
    width: '15%'
  },
  {
    title: '检查方式',
    dataIndex: 'checkWay',
    width: '15%'
  },
  {
    title: '检查情况',
    dataIndex: 'checkSituation',
    width: '15%',
    scopedSlots: { customRender: 'checkSituation' }
  },
  {
    title: '检查结果',
    dataIndex: 'checkResult',
    width: '15%',
    scopedSlots: { customRender: 'checkResult' },
    customRender: (text, record, index) => {
      return render1(text, record, index)
    }
  }
]
export default {
  components: {
    AreaQuery
  },
  data () {
    return {
      tableColumns,
      page: 1,
      size: 10,

      disabled: false,
      addressmodel: [],
      visible: false,
      idedit: false,
      dataSource: [], // 表格当前页显示的数据
      dataList: [], // 表格总数据
      current: 1, // 当前选择的页数
      totalNum: 10, // 分页总条数
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      aResults: '', // A指标
      bResults: '', // B指标
      cResults: '', // C指标
      itemANum: 0, // A指标数量
      itemBNum: 0, // B指标数量
      itemCNum: 0, // C指标数量
      jcIndexNum: 0, // 基础指标数量
      tsIndexNum: 0, // 提示指标数量
      userInfo: '', // 当前登录人的用户信息
      checkedOrgName: '', // 被检查单位名称

      taskIdList: [], // 专项排查任务字典数据
      checkedOrgNameList: [], // 被检查单位字典数据
      options: [],
      resObj: null, // 后台返回的数据

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
    this.setLabelAndWrapperWidth('29.3%', '70.7%', 'area') // 单独一行字段宽度控制
    this.setLabelAndWrapperWidth('7.3%', '92.7%', 'alonerow') // 单独一行字段宽度控制
  },
  methods: {
    // 获取专项排查任务字典
    getTaskIdList () {
      // 专项排查任务字典数据
      this.post('specialInvestigateTask/taskDownloadQueryPageList', { taskState: '2' }).then((res) => {
        if (res.serviceSuccess) {
          this.taskIdList = res.data.pageBean.list
        }
      })
    },
    // 字典数据获取
    getMenuDatas () {
      // 专项排查任务字典数据
      // this.post('specialInvestigateTask/taskDownloadQueryPageList', { taskState: '2' }).then((res) => {
      //   if (res.serviceSuccess) {
      //     this.taskIdList = res.data.pageBean.list
      //   }
      // })
      this.getMenu('RESOURCE_TYPE', 'demandTypeList') // 获取需求类型字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
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
      this.current = 1
      this.dataList = []
      this.jcIndexNum = 0
      this.tsIndexNum = 0
      this.flag = this.$route.query.flag
      this.disabled = false
      this.userInfo = window.parent.indexTool.getUserInfo()
      this.checkedOrgName = ''
      this.getTaskIdList()
      // 编辑或查看数据回显
      if (this.flag != 'add') {
        this.id = this.$route.query.id
        if (this.flag == 'look') {
          this.disabled = true
        }
        this.post('/specialInvestigateResult/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            const { data } = res.data
            this.checkedOrgName = data.checkedOrgName
            data.checkDate = data.checkDate ? moment(data.checkDate) : null
            data.recordDate = data.recordDate ? moment(data.recordDate) : null
            this.form.setFieldsValue(data)
            this.dataList = data.resultDetailVos
            // 被检查单位下拉框赋值
            if (data.county) {
              this.getTreeDatas(data.county)
            } else if (data.city) {
              this.getTreeDatas(data.city)
            } else {
              this.getTreeDatas(data.province)
            }

            // 基础指标、提示指标赋值
            this.jcIndexNum = data.jcIndexNum || 0
            this.tsIndexNum = data.tsIndexNum || 0
            // 根据检查任务数据给检查细则赋值
            this.setCheckDetail()
            // 检查结果小计赋值
            this.setValue()
            // 区域回显
            if (this.userInfo.areaLevel == '1' || this.userInfo.areaLevel == '0') { // 省级
              this.addressmodel = [
                data.province || '',
                data.city || '',
                data.county || ''
              ]
            } else if (this.userInfo.areaLevel == '2') { // 市级
              this.addressmodel = [
                data.city || '',
                data.county || ''
              ]
            } else { // 县级
              this.addressmodel = [
                data.county || ''
              ]
            }
          }
        })
      } else {
        this.form.setFieldsValue({
          checkOrgName: this.userInfo.orgName,
          recordUser: this.userInfo.userName
        })
        // 根据专项排查任务给检查细则赋值
        this.setCheckDetail()
        // 检查结果小计赋值
        this.setValue()
      }
    },
    // 数组分组添加rowSpan属性进行列合并
    setRowSpan (attr, type) {
      attr = !(attr instanceof Array) ? [] : attr
      let count = 1 // 数组中重复数据的条数
      for (var i = 0; i < attr.length; i++) {
        if (i == 0) { // 第一条
          attr[i].rowSpan = 1
        } else if (i > 0 && attr[i - 1].checkProject == attr[i].checkProject) { // 非第一条并与上一条重复
          attr[i].rowSpan = 0
          count++
          attr[i - count + 1].rowSpan = count
        } else if (i > 0 && attr[i - 1].checkProject != attr[i].checkProject) { // 非第一条且与上一条不重复
          attr[i].rowSpan = 1
          attr[i - count].rowSpan = count
          count = 1
        }
      }
      return attr
    },
    // 检查结果小计赋值
    setValue () {
      this.form.setFieldsValue({
        checkResults: `1、检查情况为A（符合）指标为（${this.aResults || ''}），共（${this.itemANum || 0}）项；
2、检查情况为B（部分符合）指标为（${this.bResults || ''}），共（${this.itemBNum || 0}）项；
3、检查情况为C（不符合）指标为（${this.cResults || ''}），共（${this.itemCNum || 0}）项；
其中，基础指标（${this.jcIndexNum}）项，提示指标（${this.tsIndexNum}）项；`
      })
    },
    // 设置检查情况的默认值
    setDefault (e) {
      return e
    },
    // 页码改变的回调，参数是改变后的页码及每页条数
    paginChange (page, pageSize) {
      this.page = page
      this.size = pageSize
      this.dataSource = JSON.parse(JSON.stringify(this.setRowSpan(this.dataList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize))))
    },
    // pageSize 变化的回调
    sizeChange (current, size) {
      this.dataSource = JSON.parse(JSON.stringify(this.setRowSpan(this.dataList.slice((current - 1) * size, (current - 1) * size + size))))
    },
    // 检查情况的选择事件
    onChange (val, obj, index) {
      const allindex = (this.page - 1) * this.size + index

      // 新值添加
      switch (val.target.value) {
        case 'A':
          this.aResults += this.aResults.length == 0 ? obj.serialNum : ',' + obj.serialNum
          this.itemANum++
          break
        case 'B':
          this.bResults += this.bResults.length == 0 ? obj.serialNum : ',' + obj.serialNum
          this.itemBNum++

          break
        case 'C':
          this.cResults += this.cResults.length == 0 ? obj.serialNum : ',' + obj.serialNum
          this.itemCNum++
          break
      }
      // 旧值删除
      switch (this.dataList[allindex].checkSituation) {
        case 'A':
          this.delOldVal('aResults', obj.serialNum)
          this.itemANum--
          break
        case 'B':
          this.delOldVal('bResults', obj.serialNum)
          this.itemBNum--
          break
        case 'C':
          this.delOldVal('cResults', obj.serialNum)
          this.itemCNum--
          break
      }
      // 检查结果小计赋值
      this.setValue()
      this.dataList[allindex].checkSituation = val.target.value
      // 根据选择的检查情况（A,B,C）赋值检查结果
      this.addResult(allindex, val.target.value)
    },
    // 去除检查结果小计的旧值方法
    delOldVal (name, num) {
      if (this[name].length == 1) {
        this[name] = ''
      } else {
        if (this[name].indexOf(num + ',') == 0) { // 在最前面，要删除 序号+‘，’
          this[name] = this[name].replace(num + ',', '')
        } else if ((this[name].lastIndexOf(',' + num) == this[name].length - 1 - (num + '').length)) { // 在最后面，要删除 ‘，’+序号
          this[name] = this[name].substring(0, this[name].lastIndexOf(','))
        } else { // 中间的替换 ‘，’+序号+‘，’
          this[name] = this[name].replace(',' + num + ',', ',')
        }
      }
    },
    // 根据选择的检查情况（A,B,C）赋值检查结果（1整改（检查情况中有C）、2提升（检查情况中没有C））
    addResult (index, val) {
      const checkProject = this.dataList[index].checkProject // 检查项
      let result = this.dataList[index].checkSituation == 'C' ? '1' : '2'
      // 找出相同检查项的所有索引
      let minIndex = index // 相同检查项中的最小索引
      let maxIndex = index // 相同检查项中的最大索引
      // 向前找相同检查项中的索引
      if (index > 0) { // 当前不是第一个才执行下面操作
        let i = index - 1
        while (this.dataList[i].checkProject == checkProject) { // 同一检查项
          minIndex = i
          if (result == '2') { // 筛选过的不含C
            result = this.dataList[i].checkSituation == 'C' ? '1' : '2'
          }
          if (i == 0) { // 到了第一个，则跳出循环
            break
          } else {
            i--
          }
        }
      }

      // 向后找相同检查项中的索引
      if (index != this.dataList.length - 1) { // 当前不是最后一个才执行下面操作
        let j = index + 1
        while (this.dataList[j].checkProject == checkProject) { // 同一检查项
          maxIndex = j
          if (result == '2') { // 筛选过的不含C
            result = this.dataList[j].checkSituation == 'C' ? '1' : '2'
          }
          if (j == this.dataList.length - 1) { // 到了最后一个，则跳出循环
            break
          } else {
            j++
          }
        }
      }
      // 遍历给每项的检查结果赋值
      for (var k = minIndex; k < maxIndex + 1; k++) {
        this.dataList[k].checkResult = result
      }
      this.dataSource = JSON.parse(JSON.stringify(this.dataList.slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size)))
    },
    // 选择任务后获取任务数据
    taskChange (e) {
      this.post('specialInvestigateTask/queryCheckProjectInfoById', { taskId: e }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          this.jcIndexNum = data.jctotal // 基础指标数量
          this.tsIndexNum = data.tstotal // 提示指标数量
          this.dataList = data.checkProjectVos || []
          // 根据专项排查任务给检查细则赋值
          this.setCheckDetail()
          // 检查结果小计赋值
          this.setValue()
        }
      })
    },
    // 根据专项排查任务给检查细则赋值
    setCheckDetail () {
      // 初始化数据
      this.aResults = ''
      this.itemANum = 0
      this.bResults = ''
      this.itemBNum = 0
      this.cResults = ''
      this.itemCNum = 0
      for (var i = 0; i < this.dataList.length; i++) {
        switch (this.dataList[i].checkSituation) {
          case 'A':
            this.aResults += (i + 1) + ','
            this.itemANum++
            break
          case 'B':
            this.bResults += (i + 1) + ','
            this.itemBNum++
            break
          case 'C':
            this.cResults += (i + 1) + ','
            this.itemCNum++
            break
        }
      }
      // 去掉末尾的逗号
      if (this.aResults.length > 0) {
        this.aResults = this.aResults.substring(0, this.aResults.length - 1)
      }
      if (this.bResults.length > 0) {
        this.bResults = this.bResults.substring(0, this.bResults.length - 1)
      }
      if (this.cResults.length > 0) {
        this.cResults = this.cResults.substring(0, this.cResults.length - 1)
      }
      this.totalNum = this.dataList.length || 0
      this.dataSource = JSON.parse(JSON.stringify(this.setRowSpan(this.dataList.slice(0, 10))))
    },
    // 提交
    submit (e) {
      const _self = this
      const form = _self.form.getFieldsValue()
      let url = '/specialInvestigateResult/save'
      if (_self.flag == 'edit') {
        url = '/specialInvestigateResult/update'
        form.id = _self.id
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          if (_self.itemANum || _self.itemBNum || _self.itemCNum) { // ABC至少选了一个
            form.resultType = '2' // 上级检查

            form.buttonType = e
            form.checkDate = form.checkDate ? moment(form.checkDate).format('YYYY-MM-DD') : null
            form.recordDate = form.recordDate ? moment(form.recordDate).format('YYYY-MM-DD') : null
            form.resultDetailVos = this.dataList
            // 检查单位
            form.checkOrg = this.userInfo.orgId
            // 被检查单位名称
            form.checkedOrgName = this.checkedOrgName

            // A,B,C数量
            form.itemANum = this.itemANum
            form.itemBNum = this.itemBNum
            form.itemCNum = this.itemCNum
            // 基础指标、提示指标数量
            form.jcIndexNum = this.jcIndexNum
            form.tsIndexNum = this.tsIndexNum
            // 区域
            if (_self.userInfo.areaLevel == '1' || _self.userInfo.areaLevel == '0') { // 省级或部级
              form.province = form.address_Linkage instanceof Array ? form.address_Linkage[0] : null
              form.city = form.address_Linkage instanceof Array ? form.address_Linkage[1] : null
              form.county = form.address_Linkage instanceof Array ? form.address_Linkage[2] : null
            } else if (this.userInfo.areaLevel == '1') { // 市级用户
              form.city = form.address_Linkage instanceof Array ? form.address_Linkage[0] : null
              form.county = form.address_Linkage instanceof Array ? form.address_Linkage[1] : null
            } else { // 县级用户
              form.county = form.address_Linkage instanceof Array ? form.address_Linkage[0] : null
            }
            delete form.address_Linkage
            delete form.checkResults
            _self.post(url, form, true).then((res) => {
              if (res.serviceSuccess) {
                _self.$message.success('信息保存成功！')
                _self.returns()
              }
            })
          } else { // A,B,C都没选
            _self.$message.error('请选择检查情况！')
          }
        } else {
          _self.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.form.resetFields()
      this.$router.go(-1)
    },
    // 加载数据
    loadData (selectedOptions) {
      // 获取最后一个
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      // 从后台获取数据,然后添加到当前options中
      Base.submit(null, { url: 'org/queryOrgByArea', data: { parentId: targetOption.orgId } }).then(res => {
        const { orgList } = res.data
        targetOption.loading = false
        if (orgList.length > 0) {
          targetOption.children = JSON.parse(JSON.stringify(orgList || []).replace(/\}/g, ',\"isLeaf\":false}')) || []
        } else {
          delete targetOption.children
        }
        this.options = [...this.options]
      })
    },
    // 被检查单位change事件
    checkedOrgChange (e, opt) {
      this.checkedOrgName = opt.data.attrs.name
    },
    // 区域change事件
    adsvalchange (e) {
      this.form.setFieldsValue({
        checkedOrg: null
      })
      this.getTreeDatas(e[e.length - 1])
    },
    // 区划树获取数据接口
    async getTreeDatas (areaId) {
      await this.post('org/queryOrgByArea', { areaId: areaId }).then((res) => {
        if (res.serviceSuccess) {
          const { orgList } = res.data
          this.checkedOrgNameList = orgList || []
          //   this.options = JSON.parse(JSON.stringify(orgList || []).replace(/\}/g, ',\"isLeaf\":false}')) || []
        }
      })
    },
    moment,
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    // 时间处理
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    }
  }
}
</script>
<style scoped>
/* .bom1 {
  text-align: end;
  margin-top: 10px;
} */
</style>
