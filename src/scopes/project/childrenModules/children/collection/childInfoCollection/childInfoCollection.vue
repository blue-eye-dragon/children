<template>
  <div>
    <div role="document"
         class="ant-modal"
         style="width: 520px; transform-origin: -527px 335.5px;">
      <div class="ant-modal-content">
        <div class="ant-modal-header">
          <div id="rcDialogTitle0"
               class="ant-modal-title">信息重复性验证</div>
        </div>
        <div class="ant-modal-body">
          <ta-form :autoFormCreate="(form)=>{this.form = form}">
            <ta-form-item label="身份证号"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="idCard"
                          :fieldDecoratorOptions="{validateTrigger: 'blur',rules: [{validator: idCardValid}]}">
              <ta-input placeholder="请输入身份证号" />
            </ta-form-item>
            <ta-form-item label="儿童姓名"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="name"
                          :fieldDecoratorOptions="rules.name">
              <ta-input placeholder="请输入儿童姓名" />
            </ta-form-item>
            <ta-form-item label="出生日期"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="birthday"
                          :require="{message:'请选择出生日期!'}">
              <ta-date-picker :disabled="birthDisabled"
                              :disabledDate="disabledDate"
                              style="width:100%"
                              :valid-now-time="'right'" />
            </ta-form-item>
            <ta-form-item label="儿童类别"
                          :wrapperCol="{span:16}"
                          fieldDecoratorId="childType"
                          :require="{message:'请选择儿童类别!'}">
              <ta-select allowClear
                         placeholder="请选择儿童类别">
                <ta-select-option v-for="item in childrenType"
                                  :key="item.value"
                                  :value="item.value">{{item.label}}</ta-select-option>
              </ta-select>
            </ta-form-item>
            <ta-form-item style="text-align: center;"
                          :wrapperCol="{span:21}">
              <ta-button type="primary"
                         @click="nextStep">下一步</ta-button>
            </ta-form-item>
          </ta-form>
        </div>
      </div>
      <div tabindex="0"
           style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>
    </div>
  </div>
</template>
<script>
import { debuglog } from 'util'
import moment from 'moment'
export default {
  data () {
    return {
      birthDisabled: false,
      childrenType: [], // 儿童类别字典数据
      rules: {
        name: this.verificationRules('姓名', 72)
      },
      childType: '' // 选择的儿童类别
    }
  },
  activated () {
    // 初始化数据
    this.form.resetFields()
    this.birthDisabled = false
  },
  mounted: function () {
    this.getchildtype()
  },
  methods: {
    async getchildtype () {
      const data = await this.getchildtypelist()
      this.childrenType = data
    },
    disabledDate (current) {
      // 不能选择今天以及今天以前的日期
      return current && current > moment().endOf('day')
    },
    nextStep (e) {
      const _self = this
      _self.form.validateFields((err, values) => {
        if (!err) {
          const judgeURL = '/orphansDisabledChildrenApi/getChildByNameAndType'
          const form = _self.form.getFieldsValue()

          form.birthday = form.birthday
            ? moment(form.birthday).format('YYYY-MM-DD')
            : ''
          _self.post(judgeURL, form).then(res => {
            if (res.data && res.data.data.length > 0) {
              _self.$router.push({
                name: 'judgeRepetition',
                query: {
                  repetitionList: JSON.stringify(res.data.data),
                  collectionDatas: JSON.stringify(form)
                } //
              })
            } else {
              if (form.childType == _self.Enum.CHILDCATEGORYA.SSWRFYET) {
                // 事实无人抚养  暂时未开发
                _self.$router.push({
                  name: 'noonesupportfact',
                  query: {
                    status: 1,
                    childrenFrom: JSON.stringify(form)
                    // isdisabled: true
                  }
                })
              } else {
                _self.$router.push({
                  name: 'orphansHandicapped',
                  query: {
                    collectionDatas: JSON.stringify(form),
                    operateFlag: 'add'
                  }
                })
              }
            }
          })
        }
      })
    },
    idCardValid (rule, value, callback) {
      const _self = this
      if (value == '') {
        _self.birthDisabled = false
        this.form.setFieldsValue({
          birthday: null
        })
      }
      this.idCardValidate(rule, value, callback, _self)
    },
    // 身份证号后台验重等（不需要可以不定义）
    // validateIdCard (value) {
    //   // 调后台接口进行验重
    // },
    // 根据身份证号回显性别、年龄、生日（不需要可以不定义）
    callbackByIdCard (sex, age, birth) {
      // 性别、年龄、生日等赋值
      this.form.setFieldsValue({
        birthday: moment(birth)
      })
      this.birthDisabled = true
    }
  }
}
</script>
<style scoped>
</style>
