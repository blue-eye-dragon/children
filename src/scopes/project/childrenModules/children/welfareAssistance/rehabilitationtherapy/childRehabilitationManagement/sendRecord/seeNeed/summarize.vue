<template>
  <!--评估与总结 tb5-->
  <div>
    <ta-form layout="horizontal"
             :autoFormCreate="(inAllFrom)=>{this.inAllFrom = inAllFrom}">
      <ta-row class="fromcom">
        <ta-col :span="12">
          <ta-form-item label="初至末期提高分数"
                        fieldDecoratorId="improveScore"
                        :require="{message:'请输入初至末期提高分数'}">
            <ta-input-number :min="0"
                             :max="999"
                             :precision="0"
                             style="width:100%"
                             placeholder="请输入初至末期提高分数"
                             :disabled="notShow" />

          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="训练效果"
                        fieldDecoratorId="trainingEffect"
                        :require="{message:'请输入训练效果'}">
            <ta-select placeholder='请选择训练效果'
                       :disabled="notShow">
              <ta-select-option v-for="(item,index) in trainingEffectList "
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
        <ta-col :span="24">
          <ta-form-item label="训练计划执行情况"
                        fieldDecoratorId="implementation"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
            <ta-textarea placeholder='请输入训练计划执行情况'
                         :disabled="notShow"
                         :rows="4" />
          </ta-form-item>
          <ta-form-item label="存在问题"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="problem"
                        :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
            <ta-textarea :disabled="notShow"
                         :rows="4"
                         placeholder="请输入存在问题" />
          </ta-form-item>
          <ta-form-item label="康复建议"
                        :labelCol="{span:3}"
                        :wrapperCol="{span:21}"
                        fieldDecoratorId="rehabilitationAdvice"
                        :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
            <ta-textarea :disabled="notShow"
                         :rows="4"
                         placeholder="请输入康复建议" />
          </ta-form-item>
        </ta-col>
        <ta-col :span="12">
          <ta-form-item label="是否转为下期康复"
                        fieldDecoratorId="toNext"
                        :require="{message:'请选择是否转为下期康复'}">
            <ta-select placeholder="请选择是否转为下期康复"
                       :disabled="notShow">
              <ta-select-option v-for="(item,index) in yesNoList "
                                :value="item.value"
                                :key="index">{{item.label}}</ta-select-option>
            </ta-select>
          </ta-form-item>
        </ta-col>
      </ta-row>
    </ta-form>
    <!-- <div class="bom">
      <ta-button v-if="!notShow"
                 type="primary"
                 @click="save">提交</ta-button>
      <ta-button class="btnleft"
                 @click="back">返回</ta-button>
    </div> -->
  </div>
</template>
<script>
import { format } from 'path'
import moment from 'moment'

export default {
  moment,

  props: {
    ids: {
      type: String,
      required: false
    },
    notShow: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      educationalBackgroundList: [],
      yesNoList: [],
      trainingEffectList: []
    }
  },
  activated () {
    setTimeout(() => {
      this.getData()
    })
    // alert('active')
    // alert(this.ids)
  },
  mounted () {
    this.getyesNoList()
    this.gettrainingEffectList()
    this.getData()
  },
  methods: {
    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '', value, callback, '0')
    },
    async  getData (e) {
      let p = {}
      if (!e) {
        p = {
          rehabiliteId: this.ids
        }
      } else {
        p = e
      }

      const datas = await this.post('/evaluationSummary/list', p)// 接口不通！！
      if (datas.data.pageBean.list) {
        this.$nextTick(() => {
          this.inAllFrom.setFieldsValue(datas.data.pageBean.list[0])
        })
      }
    },
    async gettrainingEffectList () {
      const data = await this.getDictionaries('EVALUATETRAININGEFFECT')
      this.trainingEffectList = data
    },
    async getyesNoList () {
      const data = await this.getDictionaries('YESNO')
      this.yesNoList = data
    },
    async save () {
      this.inAllFrom.validateFields(async (err, values) => {
        if (!err) {
          const params = this.inAllFrom.getFieldsValue()
          this.changetime(params)
          params.rehabiliteId = this.ids
          const result = await this.post('/evaluationSummary/save', params)
          if (!result.errors) {
            // this.$message.success('数据保存成功！')
            // this.back()
          }
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    // 评估与总结提交时检查基本信息是否校验通过
    async checkForm () {
      await this.inAllFrom.validateFields(async (err, values) => {
        if (!err) {
          this.$confirm({
            title: '请确认其他康复相关信息是否已经全部填写，提交后将结束本次康复训练',
            onOk: () => {
              this.$emit('basicInfoSave')
            },
            onCancel: () => { }
          })
        } else {
          this.$message.error('校验不通过，无法提交，请再次检查!')
        }
      })
    },
    changetime (data, e) {
      for (var k in data) {
        if (!(data[k] instanceof Array) && data[k] instanceof Object) {
          data[k] = data[k].format('YYYY-MM-DD')
        }
        if (data[k] instanceof Array && data[k][0] instanceof Object) {
          data[`${k}Start`] = data[k][0].format('YYYY-MM-DD')
          data[`${k}End`] = data[k][1].format('YYYY-MM-DD')
          delete data[k]
        }
      }
    },
    back () {
      this.inAllFrom.resetFields()
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.searchdata {
  height: 100%;
}
.spilwid {
  width: 400px;
}
.numwid {
  width: 118px;
}
.btnlist {
  cursor: pointer;
  color: rgba(24, 144, 255, 1);
}
</style>
