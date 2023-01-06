<template>
  <div>
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="变更申请信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <ta-row ref="one"
                class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="儿童姓名"
                            fieldDecoratorId="name">
                <a @click="childDetail"
                   class="lineHeight">{{name}}</a>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="当前状态"
                            fieldDecoratorId="currentStatus">
                <span class="lineHeight">{{currentStatus}}</span>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-table bordered
                      :columns="tableColumns"
                      :dataSource="tableData"
                      class="tableclass">
            </ta-table>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="变更原因"
                          class="changereason"
                          fieldDecoratorId="changeReason">
              <ta-textarea :rows="4"
                           :disabled="true" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div :ref="index+'out'"
         class="mars"
         v-for="(item,index) in list"
         :key="index">
      <Title :title="item.pointTitle||''"
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
                <span class="lineHeight">变更申请</span>
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
            <ta-col :span="6">
              <ta-form-item label="审核结果"
                            fieldDecoratorId="auditStatusLabel">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="reasonDisabled||list.length != index+1">
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
                          class="reason"
                          fieldDecoratorId="reason"
                          :fieldDecoratorOptions="verificationRules('审核意见',200)">
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
import moment from 'moment'
const tableColumns = [
  {
    title: '变更内容',
    dataIndex: 'changeColumnName'
  }, {
    title: '变更前',
    dataIndex: 'changeBefore'
  }, {
    title: '变更后',
    dataIndex: 'changeAfter'
  }]

export default {
  name: 'register',
  components: {
    Title
  },
  props: ['id'],
  data () {
    return {
      tableColumns,
      tableData: [],
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
  created () { },
  mounted () {

  },
  updated () {
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'reason') // 审核意见字段宽度控制
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'changereason') // 变更原因字段宽度控制
  },
  methods: {
    setForm (e, index) {
      this['form' + index] = e
    },
    // 查看儿童详情
    childDetail () {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: { url: '/childInfoApi/getOrphansDisabledChildrenById', params: JSON.stringify({ id: _self.id }), operateFlag: 'look_now' }
      })
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
      })
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
    }
  },
  watch: {
    attributeObj: {
      handler (newVal) {
        const keyname = this.getChangeAttr(newVal)
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
.tableclass {
  margin: 0 auto;
  width: 87.5%;
  margin-bottom: 24px;
}
</style>
