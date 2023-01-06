<template>
  <div class="conts">
    <div class="contin">
      <div ref="oneout"
           class="mars">
        <Title id="anchorpoint_a"
               title="孤儿助学申请信息"
               :show.sync="showone"></Title>
        <ta-form layout="horizontal"
                 :autoFormCreate="(baseform)=>{this.baseform = baseform}">
          <ta-row ref="one"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="儿童姓名"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="name">
                  <a @click="childDetail">{{name}}</a>
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="当前状态"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="currentStatus">
                  <span>{{currentStatus}}</span>
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="申请单位"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="applyOrg">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
              <ta-col :span="6">
                <ta-form-item label="申请日期"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="applyDate">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>

              <ta-col :span="6">
                <ta-form-item label="申请人"
                              :labelCol="{span:8}"
                              :wrapperCol="{span:15}"
                              fieldDecoratorId="applicant">
                  <ta-input :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>

      <div :ref="index+'out'"
           class="mars"
           v-for="(item,index) in list"
           :key="index">
        <Title :title="item.auditName||''"
               :show.sync="attributeObj['show'+index]"></Title>
        <ta-form layout="horizontal"
                 :autoFormCreate="function(form){setForm(form,index)}">
          <ta-row :ref="index"
                  class="fromcom">
            <ta-col :span="24">
              <ta-col :span="6">
                <ta-form-item label="审核类型"
                              fieldDecoratorId="auditStatusLabel">
                  <span>{{item.workflowStatusLabel}}</span>
                </ta-form-item>
              </ta-col>
            </ta-col>

            <ta-col :span="24">
              <ta-form-item label="审核意见"
                            class="reason"
                            fieldDecoratorId="reason"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('审核意见',200,true)">
                <ta-textarea :disabled="reasonDisabled||list.length != index+1?true:false"
                             :rows="4" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button type="primary"
                 class="btnleft"
                 v-if="status==2"
                 @click="submit('1')">通过</ta-button>
      <ta-button type="danger"
                 class="btnleft"
                 v-if="status==2"
                 @click="submit('0')">驳回</ta-button>
      <ta-button class="btnleft"
                 @click="backs">返回</ta-button>
    </div>
  </div>
</template>

<script>
import Title from '@component/common/components/Title'

export default {
  name: 'register',
  components: {
    Title
  },
  data () {
    return {
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      list: [],
      showone: true,
      disabled: '',
      reasonDisabled: true,
      name: '',
      currentStatus: '',

      reductionTypeList: [], // 减员原因字典数据
      label: '收养日期', // 收养日期（儿童超龄时期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: '', // 减员原因选择的数据
      fileList: [],
      upLoadPathIds: [], // 附件上传存放的id数组
      reductionObj: {}, // 减员操作的数据
      status: '2',
      id: '', // 列表跳转带过来的id
      startWorkflowId: '' // 列表跳转带过来的startWorkflowId
    }
  },
  activated () {
    // this.$nextTick(() => {
    //   this.setHeight('one', 'oneout')
    //   for (var i = 0; i < this.list.length; i++) {
    //     this.setHeight(i, i + 'out')
    //   }
    // })
    this.status = this.$route.query.status
    console.log(this.status)
    if (this.status == 2) {
      this.disabled = false
      this.reasonDisabled = false
    } else {
      this.disabled = true
      this.reasonDisabled = true
    }
    // this.initdatas()
    this.$nextTick(() => {
      this.getShowDatas()
    })
  },
  updated () {
    this.setLabelAndWrapperWidth('8.33%', '91.67%', 'alonerow') // 减员单独一行字段宽度控制
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'reason') // 审核意见字段宽度控制
  },
  created () { },
  mounted () {

  },
  methods: {
    backs () {
      console.log(111)
      this.$router.go(-1)
    },
    setForm (e, index) {
      this['form' + index] = e
    },
    // 点击审批或查看时的页面数据获取
    async getShowDatas () {
      let businessId = this.$route.query.id
      this.id = businessId
      let startWorkflowId = this.$route.query.startWorkflowId
      this.startWorkflowId = startWorkflowId
      console.log(businessId + '+' + startWorkflowId)
      let params = {
        businessId,
        startWorkflowId
      }
      let data = await this.post('/childrenInStudentAssistanceProjec/queryWorkflow', params)
      console.log(data)
      let dataDetail = data.data.data
      this.list = dataDetail.auditResultsList
      for (var i = 0; i < this.list.length; i++) {
        this.$set(this.attributeObj, 'show' + i, true)
        this.$set(this.attributeObj_copy, 'show' + i, true)
      }
      this.$nextTick(() => {
        this.name = dataDetail.childBaseInformationVo.name
        for (var i = 0; i < this.list.length; i++) {
          this['form' + i].setFieldsValue(this.list[i])
          this.setHeight(i, i + 'out')
        }
      })
    },

    // 查看儿童详情
    childDetail () {
      let _self = this
      let obj = this.$route.query.obj
      _self.$router.push({
        name: 'orphanProject',
        query: {
          id: _self.id,
          startWorkflowId: this.startWorkflowId,
          operateFlag: 'look'
        }
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      let node = this.$refs[refout]
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
      })
    },
    // 对比获取相同属性名不同值的属性名
    getChangeAttr (newVal) {
      let oldVal = this.attributeObj_copy
      let attrname = ''
      for (var k in oldVal) {
        if (newVal[k] != oldVal[k]) {
          attrname = k
        }
      }
      this.attributeObj_copy = JSON.parse(JSON.stringify(this.attributeObj))
      return attrname
    }
  },
  watch: {
    attributeObj: {
      handler (newVal) {
        let keyname = this.getChangeAttr(newVal)
        this.setHeight(keyname.replace('show', ''), keyname.replace('show', '') + 'out', !newVal[keyname])
      },
      deep: true
    },
    showone (val, oldval) {
      this.setHeight('one', 'oneout', !val)
    }
  }
}
</script>

<style scoped type="text/less">
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
  /* //   width: 83%; */
  margin-top: 30px;
  border: 1px dashed rgba(0, 0, 0, 0.34901960784313724);
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;
}
.mars:last-child {
  margin-bottom: 30px;
}
</style>
