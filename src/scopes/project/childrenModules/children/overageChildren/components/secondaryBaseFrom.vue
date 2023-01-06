<template>
  <div>
    <div ref="oneout"
         class="mars">
      <Title id="anchorpoint_a"
             title="续发申请信息"
             :show.sync="showone"></Title>
      <ta-form layout="horizontal"
               :autoFormCreate="
          (form) => {this.form = form; }">
        <ta-row ref="one"
                class="fromcom">
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="儿童姓名"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="name">
                <a @click="childDetail"
                   class="lineHeight">{{name}}</a>

              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="当前状态"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="currentStatus">
                <span class="lineHeight">{{ currentStatus }}</span>

              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="出生日期"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="birthday"
                            :require="{message:'请选择出生日期'}">
                <ta-date-picker style="width: 100%;"
                                :disabled='true' />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="现住址"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="currentAddress">
                <ta-input :disabled='true' />
              </ta-form-item>
            </ta-col>
          </ta-col>

          <ta-col :span="8">
            <ta-form-item label="超龄续发原因"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          :fieldDecoratorId="'overAgeReason'"
                          :require="{message:'请选择超龄续发原因'}">
              <ta-select allowClear
                         :disabled='true'>
                <ta-select-option v-for="item in overAgeReasonList"
                                  :key="item.value"
                                  :value="item.value"
                                  :require="{message:'请选择超龄续发原因'}">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="overAgeReasons == 2">
            <ta-form-item label='其他原因'
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          :fieldDecoratorId="'overAgeReasonOther'">
              <ta-input :disabled="true" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="续发截止时间"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          :fieldDecoratorId="'superventionOverDate'"
                          :require="{message:'请选择续发截止时间'}">
              <ta-month-picker format="YYYY-MM"
                               :disabled='true'
                               style="width: 100%" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="20">
            <ta-form-item label="上传"
                          :labelCol="{ span: 4}"
                          :wrapperCol="{ span: 20 }"
                          class="alonerow">
              <ta-upload :withCredentials="true"
                         name="file"
                         :multiple="true"
                         @preview="preview"
                         :disabled="disabled"
                         :fileList="fileList">
                <ta-button :disabled="disabled">
                  <ta-icon type="upload" /> 上传文件
                </ta-button>
              </ta-upload>
            </ta-form-item>
          </ta-col>
          <ta-col :span="20">
            <ta-form-item label="备注"
                          :labelCol="{ span: 4}"
                          :wrapperCol="{ span: 20 }"
                          class="alonerow"
                          fieldDecoratorId="remark">
              <ta-textarea :placeholder="!disabled ? '请输入备注' : ''"
                           :disabled="disabled"
                           :rows="2" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="申请单位"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="applyOrg">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="申请日期"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="applyDate">
                <ta-input :disabled="disabled" />
              </ta-form-item>
            </ta-col>

            <ta-col :span="8">
              <ta-form-item label="申请人"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
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
            <ta-col :span="8">
              <ta-form-item label="审核类型"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{ span: 14 }"
                            fieldDecoratorId="auditStatusLabel">
                <!-- <span>{{item.workflowStatusLabel}}</span> -->
                <span class="lineHeight">续发申请</span>
              </ta-form-item>
            </ta-col>
          </ta-col>

          <ta-col :span="8"
                  v-if="list.length != index + 1">
            <ta-form-item label="审核单位"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          fieldDecoratorId="auditUnit">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="审核结果"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          fieldDecoratorId="auditStatusLabel">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8"
                  v-if="reasonDisabled||list.length != index + 1">
            <ta-form-item label="审核日期"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          fieldDecoratorId="auditDate">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>
          <ta-col :span="8">
            <ta-form-item label="审核人"
                          :labelCol="{ span: 10 }"
                          :wrapperCol="{ span: 14 }"
                          fieldDecoratorId="auditUser">
              <ta-input :disabled="disabled" />
            </ta-form-item>
          </ta-col>

          <ta-col :span="20">
            <ta-form-item label="审核意见"
                          class="reason"
                          :labelCol="{ span: 4}"
                          :wrapperCol="{ span: 20 }"
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
  props: ['id'],
  data () {
    return {
      overAgeReasonList: [], // 超龄续发原因
      overAgeReasons: '',
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
    this.initdatas()
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
      this.getMenu('OVERAGERENEWALREASON', 'overAgeReasonList') // 获取超龄续发原因字典数据
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
      this.$router.push({
        name: 'orphansHandicapped',
        query: {
          url: '/childInfoApi/getOrphansDisabledChildrenById',
          params: JSON.stringify({ id: this.id }),
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
