<template>
  <div>
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="孤儿助学申请信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row ref="one"
                class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="儿童姓名"
                            fieldDecoratorId="name">
                <a @click="childDetail">{{name}}</a>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="申请日期"
                            fieldDecoratorId="applyDate">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="当前状态"
                            fieldDecoratorId="currentStatus">
                <span>{{currentStatus}}</span>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="申请单位"
                            fieldDecoratorId="applyOrgName">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="申请人"
                            fieldDecoratorId="applyUser">
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
                <!-- <span>{{item.workflowStatusLabel}}</span> -->
                <span>孤儿助学申请</span>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6"
                    v-if="list.length != index+1">
              <ta-form-item label="审核单位"
                            fieldDecoratorId="auditUnit">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <!-- <ta-col :span="6">
              <ta-form-item label="审核结果"
                            fieldDecoratorId="auditStatusLabel">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col> -->
            <ta-col :span="6"
                    v-if="list.length != index+1">
              <ta-form-item label="审核日期"
                            fieldDecoratorId="auditDate">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="审核人"
                            fieldDecoratorId="auditUser">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="审核意见"
                          class="alonerow"
                          fieldDecoratorId="auditOpinion"
                          :fieldDecoratorOptions="verificationRulesNotMustFill('审核意见',200,true)">
              <ta-textarea :disabled="reasonDisabled||list.length != index+1?true:false"
                           :rows="4" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
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
  props: ['id', 'startWorkflowId'],
  data () {
    return {
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      list: [],
      showone: true,
      disabled: true,
      reasonDisabled: true,
      name: '',
      currentStatus: ''
    }
  },
  activated () {

    // this.$nextTick(() => {
    //   this.setHeight('one', 'oneout')
    //   for (var i = 0; i < this.list.length; i++) {
    //     this.setHeight(i, i + 'out')
    //   }
    // })
  },
  updated () {
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'alonerow') // 审核意见字段宽度控制
  },
  created () { },
  mounted () {

  },
  methods: {
    setForm (e, index) {
      this['form' + index] = e
    },
    // 查看儿童详情
    childDetail () {
      let _self = this
      _self.$router.push({
        name: 'orphanProject',
        query: {
          id: _self.id,
          startWorkflowId: _self.startWorkflowId,
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
</style>
