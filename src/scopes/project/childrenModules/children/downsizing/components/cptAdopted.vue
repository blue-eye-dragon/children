<template>
  <div>
    <ta-row class="fromcom">
      <ta-col :span="12">
        <ta-form-item label="身份证号"
                      fieldDecoratorId="aa"
                      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入身份证'},{ validator: idcardrole}]}">
          <ta-input disabled
                    placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item label="被收养后姓名"
                      fieldDecoratorId="bb"
                      :require="{message:'请输入被收养后姓名!'}">
          <ta-input disabled
                    placeholder="请输入被收养后姓名" />
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="name"
                      :require="{message:'请选择出生日期!'}">
          <ta-date-picker disabled
                          style="width: 100%;"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="name"
                      :require="{message:'请选择民族!'}">
          <ta-select disabled
                     placeholder="请选择民族">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="文化程度"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择文化程度!'}">
          <ta-select disabled
                     placeholder="请选择文化程度">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="入院时间"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择入院时间!'}">
          <ta-date-picker disabled
                          style="width: 100%;"
                          placeholder="请选择入院时间" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item label="姓名"
                      fieldDecoratorId="identityType"
                      :require="{message:'请输入姓名!'}">
          <ta-input disabled
                    placeholder="请输入姓名" />
        </ta-form-item>
        <ta-form-item label="性别"
                      fieldDecoratorId="0"
                      :require="{message:'请选择性别!'}">
          <ta-select disabled
                     placeholder="请选择性别">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="国籍"
                      fieldDecoratorId="0"
                      :require="{message:'请选择国籍!'}">
          <ta-select disabled
                     placeholder="请选择国籍">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="健康状况"
                      fieldDecoratorId="idcard"
                      :require="{message:'请选择健康状况!'}">
          <ta-select disabled
                     placeholder="请选择健康状况">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="身份类别"
                      fieldDecoratorId="idcard"
                      :require="{message:'请选择身份类别!'}">
          <ta-select disabled
                     placeholder="请选择身份类别">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="被收养的户籍地或现住址"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                      fieldDecoratorId="cascader">
          <ta-input-group disabled
                          compact>
            <ta-cascader style="width:330px"
                         :options="address"
                         placeholder="请选择地址"
                         :disabled="true" />
            <!-- "isDisabled" -->
            <ta-input disabled
                      style="width: calc(100% - 330px)"
                      placeholder="请输入详细地址" />
          </ta-input-group>
        </ta-form-item>
        <ta-form-item label="年满八周岁被收养人对收养登记的意见"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                      :require="{message:'请输入被收养人的意见!'}">
          <ta-textarea disabled
                       placeholder="请输入被收养人的意见"
                       :rows="4" />
        </ta-form-item>
      </ta-col>
    </ta-row>
  </div>
</template>
<script>
export default {
  name: 'applicant',
  data () {
    return {
      address: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      isDisabled: false
    }
  },
  methods: {
    async idcardrole (rule, value, callback) {
      if (!value || value == '') {
        callback()
        return false
      }
      if (value.length != 18 && value.length != 15) {
        callback('请输入正确的身份证格式')
      } else {
        if (value.length == 15) {
          if (parseInt(value.substr(13, 1)) % 2 != 0) {
            const resobj = await this.post('marriage/validateIdCard', data)
            if (resobj.errors) {
              callback(resobj.data.msg)
            } else {
              const aa = this.getBirthdayFromIdCard(value)

              callback()
            }
          } else {
            callback('请输入男方身份证')
          }
        } else {
          if (parseInt(value.substr(16, 1)) % 2 != 0) {
            const data = {
              idCard: value,
              sex: 1
            }
            const resobj = await this.post('marriage/validateIdCard', data)
            if (resobj.errors) {
              callback(resobj.errors[0].msg)
            } else {
              const aa = this.getBirthdayFromIdCard(value)

              callback()
            }
          } else {
            callback('请输入男方身份证')
          }
        }
      }
    },
    getBirthdayFromIdCard (idCard) {
      var birthday = ''
      if (idCard != null && idCard != '') {
        if (idCard.length == 15) {
          birthday = '19' + idCard.substr(6, 6)
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8)
        }

        birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
      }

      return birthday
    }
  }
}
</script>
<style scoped lang="less">
</style>
