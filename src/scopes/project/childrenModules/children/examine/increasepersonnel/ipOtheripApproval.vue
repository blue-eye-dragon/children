<template>
  <div class="conts"
       id="content"
       style="position: relative">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="增员申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row ref="one"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="4">
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:11}"
                              :wrapperCol="{span:13}"
                              fieldDecoratorId="name">
                  <a @click="childDetail"
                     class="lineHeight">{{name}}</a>
                </ta-form-item>
              </ta-col>
              <ta-col :span="2">
                <ta-button v-if="!reasonDisabled"
                           @click="editInfo">修改儿童信息</ta-button>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="申请日期"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="applyDate">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="数据来源"
                              :labelCol="{span:7}"
                              :wrapperCol="{span:17}"
                              fieldDecoratorId="currentStatus">
                  <span class="lineHeight">异地申请</span>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-form-item label="受理地"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            class="alonerow"
                            fieldDecoratorId="reportUnit">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>

      <div class="paddingClass">
        <div ref="twoout"
             class="mars">
          <Title :title="'审核信息'"
                 :show.sync="showtwo"></Title>
          <div ref="two">
            <div style="overflow: hidden;"
                 v-if="!reasonDisabled">
              <ta-form layout="horizontal"
                       :autoFormCreate="(form)=>{this.auditForm = form}">
                <ta-col :span="24">
                  <ta-col :span="6">
                    <ta-form-item label="审核结果"
                                  :labelCol="{span:7}"
                                  :wrapperCol="{span:17}"
                                  fieldDecoratorId="result"
                                  :require="{message:'请选择审核结果'}">
                      <ta-select v-model="statusValue"
                                 placeholder="请选择审核结果"
                                 :getPopupContainer="setPopupContainer">
                        <ta-select-option value="4">通过</ta-select-option>
                        <ta-select-option value="6">不通过</ta-select-option>
                        <ta-select-option value="5">待补充材料</ta-select-option>
                      </ta-select>
                    </ta-form-item>
                  </ta-col>
                </ta-col>
                <ta-col :span="24">
                  <ta-form-item label="审核意见"
                                :labelCol="{span:2}"
                                :wrapperCol="{span:22}"
                                fieldDecoratorId="reason"
                                class="alonerow"
                                :fieldDecoratorOptions="statusValue!='4'?verificationRules('审核意见', 200,false):verificationRulesNotMustFill('审核意见', 200,false)">
                    <ta-textarea :rows="4" />
                  </ta-form-item>
                </ta-col>
              </ta-form>
            </div>
            <div>
              <ta-table :columns="tableColumns"
                        :dataSource="tableData"
                        bordered>
                <span slot="num"
                      slot-scope="a, b, c">
                  <span>{{ c + 1 }}</span>
                </span>
                <div slot="auditStatusLabel"
                     slot-scope="val">
                  <span :class="statusClass(val)">{{val}}</span>
                </div>
              </ta-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bom">
      <ta-button class="preservation"
                 @click="()=>{this.$router.go(-1)}">返回</ta-button>
      <ta-button class="preservation"
                 type="primary"
                 @click="submit"
                 v-if="flag=='approval'">提交</ta-button>
    </div>
    <ta-modal v-model="visible"
              width="800"
              title="提示">
      <template slot="footer">
        <ta-button key="back"
                   @click="visible=false">取消</ta-button>
        <ta-button key="submit"
                   type="primary"
                   @click="handleOk">
          确定
        </ta-button>
      </template>
      <div class="modalC">
        <p><span>{{name}}</span>申请认定社会散居孤儿,</p>
        <p>申请人<span>{{applicant}}</span>，受理地<span>{{reportUnit}}</span>，</p>
        <p>审核单位<span>{{userInfo.orgName}}</span>，</p>
        <p>审核结果<span>{{statusValue=='4'?'通过':(statusValue=='6'?'不通过':'待补充材料')}}</span>。</p>
      </div>
    </ta-modal>
  </div>
</template>
<script>
import Title from '@component/common/components/Title'
const tableColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  // {
  //   title: '审核类型',
  //   dataIndex: 'auditType',
  //   align: 'center',
  //   collectionType: 'PLANTOMORROWAUDITTYPE',
  //   width: '13%'
  // },
  /* {
    title: '审核级别',
    align: 'center',
    dataIndex: 'pointTitle',
    width: '14%'
  }, */
  {
    title: '审核单位',
    align: 'center',
    dataIndex: 'auditUnit',
    width: '14%',
    collectionType: 'DISEASETYPE'
  },
  {
    title: '审核人',
    align: 'center',
    dataIndex: 'auditUser',
    width: '14%'
  },
  {
    title: '审核日期',
    align: 'center',
    dataIndex: 'auditDate',
    width: '17%'
  },
  {
    title: '审核结果',
    align: 'center',
    dataIndex: 'auditStatusLabel',
    width: '15%',
    scopedSlots: { customRender: 'auditStatusLabel' }
  },
  {
    title: '审核意见',
    align: 'center',
    dataIndex: 'reason',
    width: '25%'
  }
]
export default {
  components: {
    Title
  },
  data () {
    return {
      tableColumns,
      tableData: [],
      list: [],
      showone: true,
      showtwo: true,
      disabled: true,
      reasonDisabled: true,
      childEnterId: '', // 儿童入院id
      workflowId: '', // 儿童流程id
      workflowPointId: '', // 流程节点id
      approveVisible: true, // 审核true、查看false
      name: '', // 儿童姓名
      applicant: '', // 申请人
      reportUnit: '', // 受理地
      visible: false, // 控制弹窗显隐
      statusValue: '', // 审核结果选择的值
      userInfo: window.parent.indexTool.getUserInfo(), // 当前登录人的用户信息
      flag: '' // 审核approval/查看look标识

    }
  },
  updated () {
    this.setLabelAndWrapperWidth('7.3%', '42.7%', 'alonerow') // 受理地/审核意见字段宽度控制
  },
  activated () {
    this.getShowDatas()
  },
  methods: {
    // 提交
    submit () {
      this.auditForm.validateFields(err => {
        if (!err) {
          this.visible = true
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 弹窗确定
    handleOk () {
      const formData = this.auditForm.getFieldsValue()
      formData.workflowPointId = this.workflowPointId
      this.post('addChildApi/checkChildInfoAnotherApply', formData).then(res => {
        if (res.serviceSuccess) {
          this.$message.success('数据审核成功')
          this.visible = false
          this.$router.go(-1)
        }
      })
    },
    // 设置下拉框弹出框容器
    setPopupContainer (trigger) {
      // 设置他的弹出框容器为content,如果不设置默认为body
      // 设置弹出框容器主要是为了解决页面滚动时可能会出现的弹出框脱离输入框的情况
      return document.getElementById('content')
    },
    // 查看儿童详情
    childDetail () {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: _self.childEnterId }),
          operateFlag: 'look_now'
        }
      })
    },
    // 编辑儿童信息
    editInfo () {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: _self.childEnterId }), operateFlag: 'edit_wsh' }
      })
    },
    // 点击审核或查看时的页面数据获取
    getShowDatas () {
      const _self = this
      _self.flag = _self.$route.query.flag
      _self.childEnterId = _self.$route.query.childEnterId // 儿童入院id
      _self.workflowId = _self.$route.query.workflowId // 儿童流程id
      _self.workflowPointId = _self.$route.query.workflowPointId // 流程节点id
      //_self.applicant = _self.$route.query.applyPersonName // 申请人姓名
      _self.approveVisible = true
      _self.reasonDisabled = false
      _self.form.resetFields()
      if (_self.flag == 'approval') {
        _self.$nextTick(() => {
          _self.auditForm.resetFields()
        })
      }
      if (_self.$route.query.flag == 'look') { // 审核true、查看false
        _self.approveVisible = false
        _self.reasonDisabled = true
      }

      _self.post('/addChildApi/detailWorkflowForAnotherApply', { childEnterId: _self.childEnterId, workflowId: _self.workflowId }).then((res) => {
        if (res.serviceSuccess) {
          const { data } = res.data
          _self.reportUnit = data.reportUnit
          const list = data.approvalPointList || []
          _self.tableData = data.approvalPointList
          _self.list = list
          _self.$nextTick(() => {
            if (_self.isAnotherPlaceApply) {
              _self.tableData1 = data.rejectVoLists
            }
            _self.form.setFieldsValue(data)
            this.name = data.name
            this.applicant = data.applyPersonName // 申请人姓名
            _self.currentStatus = data.currentStatus
            _self.setHeight('two', 'twoout')
            _self.setHeight('one', 'oneout')
          })
        }
      })
    },
    // 布局调整
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (!istrue) {
          if (ref == 'one') {
            node.style.height = this.$refs[ref].$el.offsetHeight + 180 + 'px'
          } else if (ref == 'two') {
            node.style.height = this.$refs[ref].offsetHeight + 90 + 'px'
          } else {
            node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
          }
        } else {
          node.style.height = '50px'
        }
        node.style.transition = 'all 1s'
      })
    },
    statusClass (e) {
      let classValue = ''
      switch (e) {
        case '撤回':// 撤回
          classValue = 'com_tobesubmitted'
          break
        case '待审核':// 待审核
          classValue = 'com_tobeaudited'
          break
        case '通过':// 通过
          classValue = 'com_adopt'
          break
        case '驳回':// 驳回
          classValue = 'com_reject'
          break
      }
      return classValue
    }
  },
  watch: {
    showone (val, oldval) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val, oldval) {
      this.setHeight('two', 'twoout', !val)
    },
    statusValue (val) {
      this.auditForm.setFields({
        reason: {
          value: undefined,
          errors: null
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.conts {
  width: 100%;
  min-height: 600px;
  background: #eff1f4;
  padding: 14px 14px 98px 14px;
}
.contin {
  width: 100%;
  min-height: 720px;
  background: #fff;
  padding: 1px 25px;
  box-sizing: border-box;
}
.mars {
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding-left: 38px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
.bom {
  width: calc(100% - 28px);
  height: 80px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  left: 14px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eff1f4;
}
.preservation {
  margin-left: 32px;
}
.modalC {
  font-size: 16px;
  line-height: 2;
  span {
    font-weight: bold;
    margin: 0 5px;
  }
}
</style>
