<template>
  <!--评估与总结 tb5-->
  <div :class="!noEdit?'padbottom conts  tadrawer':''">
    <div :class="!noEdit?'contin':''">
      <ta-form layout="horizontal"
               :autoFormCreate="(inAllFrom)=>{this.inAllFrom = inAllFrom}">
        <ta-row class="fromcom">
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="入院是否交接"
                            fieldDecoratorId="admissionHandover">
                <ta-select @change="doSum"
                           :disabled="noEdit"
                           placeholder="请选择入院是否移交">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="是否签订协议"
                            fieldDecoratorId="signAgreement"
                            :require="{message:'请选择是否签订协议'}">
                <ta-select @change="doSum"
                           :disabled="noEdit"
                           placeholder="请选择是否签订协议">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="儿童伙食情况"
                            fieldDecoratorId="childrenFood">
                <ta-rate @change="doSum"
                         :disabled="noEdit" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="基地护理情况"
                            fieldDecoratorId="nursingCondition"
                            :initValue="0">
                <ta-rate @change="doSum"
                         :disabled="noEdit" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="是否设有康复课程"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="rehabilitCourses">
                <ta-select @change="doSum"
                           :disabled="noEdit"
                           placeholder="请选择是否设有康复课程">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="康复效果"
                            fieldDecoratorId="rehabilitEffect"
                            :require="{message:'请选择康复效果'}"
                            :initValue="0">
                <ta-rate @change="doSum"
                         :disabled="noEdit"
                         placeholder="请选择康复效果" />
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="有没有跟班培训"
                            fieldDecoratorId="attendantTraining">
                <ta-select @change="doSum"
                           :disabled="noEdit"
                           placeholder="请选择有没有跟班培训">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :value="item.value"
                                    :key="index"
                                    @click="changyesShow(item.value)">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="是否设有康复医院"
                            :labelCol="{ span: 7 }"
                            :wrapperCol="{span:17}"
                            fieldDecoratorId="rehabilitatHospital">
                <ta-select @change="doSum"
                           :disabled="noEdit"
                           placeholder="请选择是否设有康复医院">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="出院后是否介绍后续的康复"
                            :labelCol="{ span: 10 }"
                            :wrapperCol="{span:14}"
                            fieldDecoratorId="followRehabilitat">
                <ta-select @change="doSum"
                           :disabled="noEdit"
                           placeholder="请选择出院后是否介绍后续的康复">
                  <ta-select-option v-for="(item,index) in yesNoList "
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>

          </ta-col>

          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item label="总体评价"
                            fieldDecoratorId="overallEvaluation">
                <ta-rate @change="doSum"
                         :disabled="noEdit" />
              </ta-form-item>

            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="服务评估分数"
                            fieldDecoratorId="serviceScore"
                            :require="{message:'请输入服务评估分数!'}">
                <ta-input :disabled="true"
                          placeholder="满分为100分" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="8">
              <ta-form-item label="培训效果"
                            v-if="yesShow"
                            fieldDecoratorId="trainingEffect"
                            :require="{message:'请选择培训效果'}">
                <ta-select :disabled="noEdit"
                           placeholder="请选择培训效果">
                  <ta-select-option v-for="(item,index) in  effectList"
                                    :value="item.value"
                                    :key="index">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-col :span="8">
              <ta-form-item v-if="yesShow"
                            label="跟班天数"
                            fieldDecoratorId="followingDays">
                <ta-input-number :min="1"
                                 :max="999"
                                 :precision="0"
                                 style="width:100%"
                                 placeholder="请输入跟班天数"
                                 :disabled="noEdit" />

                <!-- <ta-input @change="doSum" placeholder="请输入跟班天数"  /> -->
              </ta-form-item>
            </ta-col>
          </ta-col>
          <ta-col :span="24">
            <ta-form-item label="备注"
                          fieldDecoratorId="note"
                          :labelCol="{span:2}"
                          :wrapperCol="{span:22}"
                          :fieldDecoratorOptions="{rules: [{validator: fnValidateMore}]}">
              <ta-textarea :disabled="noEdit"
                           :rows="4"
                           placeholder="请填写备注" />
            </ta-form-item>
          </ta-col>
        </ta-row>
      </ta-form>
    </div>
    <div class="bom"
         v-if="!noEdit">
      <ta-button @click="back">返回</ta-button>
      <ta-button type="primary"
                 class="btnleft"
                 @click="save">提交</ta-button>

    </div>
  </div>
</template>
<script>
import { format } from 'path'
import moment from 'moment'

export default {
  moment,
  props: {
    idss: {
      type: String,
      required: false
    },
    noEditt: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      noEdit: false,
      educationalBackgroundList: [],
      yesNoList: [],
      ids: '',
      yesShow: false,
      keep: '',
      effectList: [],
      value: ''
    }
  },
  activated () {
    const param = this.$route.query

    setTimeout(() => {
      if (param) {
        this.ids = param.ids
      }
    })
    setTimeout(() => {
      if (this.idss) {
        this.noEdit = true
        this.ids = this.idss
        this.getSource()
      }
    })
  },
  watch: {
    keep (value) {
      if (value == 10) {
        this.yesShow = true
      } else {
        this.yesShow = false
      }
    }
  },
  mounted () {
    this.geteducationalBackgroundList()
    this.getyesNoList()
    this.getSource()
  },
  methods: {
    bank (model) {
      if (model && model != 0) {
        return model / 2
      } else {
        return 0
      }
    },
    async getSource (e) {
      if (this.idss) {
        this.noEdit = true
        let param = {}

        if (e) {
          param = e
        } else {
          param = { rehabiliteId: this.ids }
        }
        const result = await this.post('/serviceEvaluation/list ', param)

        if (result.data.pageBean.list.length > 0) {
          this.stringToNumber(result.data.pageBean.list[0])
          this.$nextTick(() => {
            this.inAllFrom.setFieldsValue(result.data.pageBean.list[0])
            this.inAllFrom.setFieldsValue({
              childrenFood: this.bank(
                result.data.pageBean.list[0].childrenFood
              ),
              nursingCondition: this.bank(
                result.data.pageBean.list[0].nursingCondition
              ),
              rehabilitEffect: this.bank(
                result.data.pageBean.list[0].rehabilitEffect
              ),
              overallEvaluation: this.bank(
                result.data.pageBean.list[0].overallEvaluation
              )
            })
          })
        }
      }
    },
    stringToNumber (data, e) {
      for (var k in data) {
        if (
          k == 'childrenFood' ||
          k == 'nursingCondition' ||
          k == 'rehabilitEffect' ||
          k == 'overallEvaluation' ||
          k == 'serviceScore'
        ) {
          data[k] = parseInt(data[k])
        }
        if (k == 'attendantTraining') {
          if (data[k] == '10') {
            this.yesShow = true
          } else {
            this.yesShow = false
          }
        }
      }
    },
    fnValidateMore (a, v, callback) {
      const value = v || ''
      this.fnValidateTextarea(200, '备注', value, callback, 0)
    },
    changyesShow (e) {
      this.keep = e
    },
    doSum () {
      this.$nextTick(() => {
        let itemAll = null
        itemAll = this.inAllFrom.getFieldsValue()

        let sums = 0
        let number = ''
        for (const key of Object.keys(itemAll)) {
          if (
            itemAll[key] &&
            itemAll[key] != 'undefined' &&
            key != 'serviceScore' &&
            key != 'trainingEffect' &&
            key != 'followingDays' &&
            key != 'note'
          ) {
            number = itemAll[key]

            if (
              key == 'childrenFood' ||
              key == 'overallEvaluation' ||
              key == 'nursingCondition' ||
              key == 'rehabilitEffect'
            ) {
              number = number * 2
            }
            sums += parseInt(number)
          }
        }
        this.inAllFrom.setFieldsValue({
          serviceScore: sums
        })
      })
    },
    async geteducationalBackgroundList () {
      const data = await this.getDictionaries('TRAININGEFFECT')
      this.effectList = data
    },
    async getyesNoList () {
      const data = await this.getDictionaries('YESNOSCORE')
      this.yesNoList = data
    },
    save () {
      this.inAllFrom.validateFields((err, values) => {
        if (!err) {
          this.$confirm({
            title: '请确认其他康复相关信息是否已经全部填写，提交后将结束本次康复训练',
            onOk: () => {
              const params = this.inAllFrom.getFieldsValue()
              this.changetime(params)

              params.rehabiliteId = this.ids
              if (params.childrenFood) {
                params.childrenFood = params.childrenFood * 2
              }
              if (params.overallEvaluation) {
                params.overallEvaluation = params.overallEvaluation * 2
              }
              if (params.nursingCondition) {
                params.nursingCondition = params.nursingCondition * 2
              }
              if (params.rehabilitEffect) {
                params.rehabilitEffect = params.rehabilitEffect * 2
              }
              this.post('/serviceEvaluation/save', params).then((res) => {
                if (res.serviceSuccess) {
                  this.back()
                }
              })
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
      // 取消。提交
      this.inAllFrom.resetFields()
      this.$router.go(-1)
    },
    dels () { },
    adds (types, obj) {
      // 添加
      this.$router.push({
        path: 'checkBodyInfo',
        query: {
          types: types,
          ids: obj ? obj.id : ''
        }
      })
    },
    add () {
      this.$router.push({
        path: 'checkBodyInfo',
        query: {}
      })
    },
    pagechange (page, size) {
      this.page = page
      this.size = size
    },
    userPageParams () {
      const paramss = {
        welfOrgId: this.idd
      }
      return paramss
    },

    onSelectTime (date, dateString) { }
  }
}
</script>
<style scoped lang="less">
</style>
