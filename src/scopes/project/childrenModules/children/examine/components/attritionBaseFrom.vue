<template>
  <div>
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="减员申请信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="
          (form) => {this.form = form; }">
        <ta-row ref="one"
                class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="儿童姓名"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="name">
                <a @click="childDetail"
                   class="lineHeight">{{name}}</a>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="当前状态"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="currentStatus">
                <span class="lineHeight">{{ currentStatus }}</span>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="减员原因"
                          fieldDecoratorId="reductionType"
                          class="alonerow"
                          :fieldDecoratorOptions="{
                initialValue: '01',
                rules: [{ required: true, message: '请选择减员原因' }],
              }">
              <ta-radio-group name="radioGroup"
                              :disabled="disabled">
                <ta-radio :value="item.value"
                          v-for="(item, index) in reductionTypeList"
                          :key="index">{{ item.label }}</ta-radio>
              </ta-radio-group>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6"
                    v-if="
                type != Enum.REDUCTIONREASON.LRCW &&
                type != Enum.REDUCTIONREASON.HJQC &&
                type != Enum.REDUCTIONREASON.QT
              ">
              <ta-form-item :label="label"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="businessDate"
                            :require="{ message: '请选择' + label + '!' }">
                <ta-date-picker style="width: 100%"
                                :placeholder="!disabled ? '请选择' + label : ''"
                                :disabled="disabled" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="6"
                    v-if="type == Enum.REDUCTIONREASON.KJGS">
              <ta-form-item label="困境改善原因"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="reason">
                <ta-input :disabled="disabled"
                          :placeholder="!disabled ? '请输入困境改善原因' : ''" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="6"
                    v-if="type == Enum.REDUCTIONREASON.SW">
              <ta-form-item label="死亡原因"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="dieReason">
                <ta-select allowClear
                           :disabled="disabled"
                           :placeholder="!disabled ? '请选择死亡原因' : ''">
                  <ta-select-option v-for="item in dieReasonList"
                                    :key="item.value"
                                    :value="item.value">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>

            <ta-col :span="6"
                    v-if="type == Enum.REDUCTIONREASON.SW">
              <ta-form-item label="死亡处理方式"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="dieDeal">
                <ta-select allowClear
                           :disabled="disabled"
                           :placeholder="!disabled ? '请选择死亡处理方式' : ''">
                  <ta-select-option v-for="item in dieDealList"
                                    :key="item.value"
                                    :value="item.value">{{ item.label }}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="6"
                    v-if="type == Enum.REDUCTIONREASON.QT">
              <ta-form-item label="其他原因"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="reason">
                <ta-input :disabled="disabled"
                          :placeholder="!disabled ? '请输入其他原因' : ''" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="减员日期"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            :require="true"
                            fieldDecoratorId="reductionDate">
                <ta-date-picker style="width: 100%"
                                :placeholder="!disabled ? '请选择减员日期' : ''"
                                :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="末领年月"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="endTime"
                            :require="true">
                <ta-month-picker style="width: 100%"
                                 :placeholder="!disabled ? '请选择末领年月' : ''"
                                 :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="备注"
                          class="alonerow"
                          fieldDecoratorId="remark">
              <ta-textarea :placeholder="!disabled ? '请输入备注' : ''"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="上传"
                          class="alonerow">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         @preview="preview"
                         :disabled="disabled"
                         :fileList="fileList">
                <ta-button>
                  <ta-icon type="upload"
                           :disabled="disabled" /> 上传文件
                </ta-button>
              </ta-upload>
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="申请单位"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="applyOrg">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="6">
              <ta-form-item label="申请日期"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="applyDate">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="6">
              <ta-form-item label="申请人"
                            :labelCol="{ span: 8 }"
                            :wrapperCol="{ span: 15 }"
                            fieldDecoratorId="applicant">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>

    <div :ref="index + 'out'"
         class="mars"
         v-for="(item, index) in list"
         :key="index">
      <Title :title="item.pointTitle || ''"
             :show.sync="attributeObj['show' + index]"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate=" function (form) {   setForm(form, index);   }   ">
        <ta-row :ref="index"
                class="fromcom">
          <ta-col :span="24">
            <ta-col :span="6">
              <ta-form-item label="审核类型"
                            fieldDecoratorId="auditStatusLabel">
                <!-- <span>{{item.workflowStatusLabel}}</span> -->
                <span class="lineHeight">减员申请</span>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="6"
                    v-if="list.length != index + 1">
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
                    v-if="reasonDisabled||list.length != index + 1">
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
                          :fieldDecoratorOptions="verificationRules('审核意见', 200)">
              <ta-textarea :disabled="
                  reasonDisabled || list.length != index + 1 ? true : false
                "
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
  props: ['id', 'reductionType'],
  data () {
    return {
      attributeObj: {}, // 存放属性的obj
      attributeObj_copy: {}, // 对比用的obj
      list: [],
      showone: true,
      disabled: true,
      reasonDisabled: true,
      name: '',
      currentStatus: '',

      reductionTypeList: [], // 减员原因字典数据
      dieReasonList: [], // 死亡原因
      dieDealList: [], // 死亡处理方式
      label: '收养日期', // 收养日期（儿童超龄时期、找回父母日期、独立生活日期、困境改善日期、死亡日期、其他出库日期）的label
      type: '', // 减员原因选择的数据
      fileList: [],
      upLoadPathIds: [], // 附件上传存放的id数组
      reductionObj: {} // 减员操作的数据
    }
  },
  activated () {
    // this.$nextTick(() => {
    //   this.setHeight('one', 'oneout')
    //   for (var i = 0; i < this.list.length; i++) {
    //     this.setHeight(i, i + 'out')
    //   }
    // })
    this.initdatas()
  },
  updated () {
    this.setLabelAndWrapperWidth('8.33%', '91.67%', 'alonerow') // 减员单独一行字段宽度控制
    this.setLabelAndWrapperWidth('6.33%', '93.67%', 'reason') // 审核意见字段宽度控制
  },
  created () { },
  mounted () { },
  methods: {
    setForm (e, index) {
      this['form' + index] = e
    },
    preview (file) {
      this.downloadFile(file)
    },
    // 初始化数据
    initdatas () {
      this.getMenu('REDUCTIONREASON', 'reductionTypeList') // 获取减员原因字典数据
      this.getMenu('DIEDEAL', 'dieDealList') // 获取死亡处理方式字典数据
      this.getMenu('DEATHREASON', 'dieReasonList') // 获取死亡原因字典数据
    },
    // 根据减员原因显示不同的label值
    changeLabelByReason (e) {
      switch (e) {
        case this.Enum.REDUCTIONREASON.SNSY:
        case this.Enum.REDUCTIONREASON.KSSY:
        case this.Enum.REDUCTIONREASON.SWSGATSY:
          this.label = '收养日期'
          break
        case this.Enum.REDUCTIONREASON.ZHSFM:
          this.label = '找回父母日期'
          break
        case this.Enum.REDUCTIONREASON.DLSH:
          this.label = '独立生活日期'
          break
        case this.Enum.REDUCTIONREASON.KJGS:
          this.label = '困境改善日期'
          break
        case this.Enum.REDUCTIONREASON.SW:
          this.label = '死亡日期'
          break
        case this.Enum.REDUCTIONREASON.QTCK:
          this.label = '其他出库日期'
          break
        case this.Enum.REDUCTIONREASON.ETCL:
          this.label = '儿童超龄日期'
          break
        default:
      }
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      const _self = this
      _self.post('codetable/getCode', { codeType: code }).then((res) => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 查看儿童详情
    childDetail () {
      const _self = this
      _self.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: _self.id }),
          operateFlag: 'look_now'
        }
      })
    },
    // 设置高度
    setHeight (ref, refout, istrue) {
      const node = this.$refs[refout]
      this.$nextTick(() => {
        if (this.$refs[ref] && this.$refs[ref] != undefined && node) {
          if (
            !(this.$refs[ref] instanceof Array) &&
            this.$refs[ref].$el != undefined
          ) {
            if (!istrue) {
              node.style.height = this.$refs[ref].$el.offsetHeight + 90 + 'px'
            } else {
              node.style.height = '50px'
            }
            node.style.transition = 'all 1s'
          }
          if (
            this.$refs[ref] instanceof Array &&
            this.$refs[ref][0].$el != undefined
          ) {
            if (!istrue) {
              node[0].style.height =
                this.$refs[ref][0].$el.offsetHeight + 90 + 'px'
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
        this.setHeight(
          keyname.replace('show', ''),
          keyname.replace('show', '') + 'out',
          !newVal[keyname]
        )
      },
      deep: true
    },
    showone (val, oldval) {
      this.setHeight('one', 'oneout', !val)
    }
  }
}
</script>
