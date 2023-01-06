<template>
  <div>
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
            <ta-col :span="6">
              <ta-form-item label="儿童姓名"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="name">
                <a @click="childDetail"
                   class="lineHeight">{{name}}</a>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item :label="isAnotherPlaceApply=='0'?'上报日期':'申请日期'"
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
                <span class="lineHeight"
                      v-if="isAnotherPlaceApply=='0'">本地申请</span>
                <span class="lineHeight"
                      v-if="isAnotherPlaceApply=='1'">异地申请</span>
                <span class="lineHeight"
                      v-if="isAnotherPlaceApply=='2'">公众服务平台申请</span>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='0'">
              <ta-form-item label="上报单位"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="applyOrg">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='2'">
              <ta-form-item label="申请人"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="reportPerson">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='2'">
              <ta-form-item label="申请人手机号"
                            :labelCol="{span:8}"
                            :wrapperCol="{span:16}"
                            fieldDecoratorId="reportPersonMobil">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="isAnotherPlaceApply=='1'">
              <ta-form-item label="申请单位"
                            :labelCol="{span:7}"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="reportUnit">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
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
                     :autoFormCreate="(searchForm)=>{this.searchForm = searchForm}">
              <ta-col :span="24">
                <ta-form-item label="审核意见"
                              :labelCol="{span:2}"
                              :wrapperCol="{span:22}"
                              fieldDecoratorId="reason"
                              :fieldDecoratorOptions="verificationRules('审核意见', 200,false)">
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
  /*{
    title: '审核级别',
    align: 'center',
    dataIndex: 'pointTitle',
    width: '14%'
  },*/
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
const tableColumns1 = [
  {
    title: '序号',
    dataIndex: 'num',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'num' }
  },
  {
    title: '退回原因',
    align: 'center',
    dataIndex: 'backOrRejectReason',
    width: '30%'
  },
  {
    title: '上传附件',
    align: 'center',
    dataIndex: 'fileList',
    width: '70%',
    scopedSlots: { customRender: 'fileList' }
  }
]
export default {
  name: 'register',
  components: {
    Title
  },
  props: ['childEnterId', 'isAnotherPlaceApply', 'isOverAge'],
  data () {
    return {
      tableColumns,
      tableColumns1,
      basePath: window.faceConfig.basePath,
      tableData: [],
      tableData1: [],
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      list: [],
      showone: true,
      showtwo: true,
      disabled: true,
      reasonDisabled: true,
      name: '',
      currentStatus: ''
    }
  },
  updated () {
    this.setLabelAndWrapperWidth('7%', '93%', 'alonerow') // 审核意见字段宽度控制
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
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: _self.childEnterId }),
          operateFlag: 'look_now',
          isOverAge: _self.isOverAge
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
    attributeObj: {
      handler (newVal) {
        const keyname = this.getChangeAttr(newVal)
        if (keyname && keyname != '') {
          this.setHeight(keyname.replace('show', ''), keyname.replace('show', '') + 'out', !newVal[keyname])
        }
      },
      deep: true
    },
    showone (val, oldval) {
      this.setHeight('one', 'oneout', !val)
    },
    showtwo (val, oldval) {
      this.setHeight('two', 'twoout', !val)
    }
    // showthree (val, oldval) {
    //   this.setHeight('three', 'threeout', !val)
    // }
  }
}
</script>

<style scoped type="text/less">
.paddingClass {
  padding: 0 10px 10px 10px;
}
</style>
