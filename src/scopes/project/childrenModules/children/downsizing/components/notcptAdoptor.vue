<template>
  <div class="fromcom">
    <ta-row class="fromin fromintop">
      <ta-col :span="12"
              type="flex"
              justify="center"
              align="middle">
        <img src="static/img/man.png"
             alt />
        <div>男方信息</div>
      </ta-col>
      <ta-col :span="12"
              type="flex"
              justify="center"
              align="middle">
        <img src="static/img/woman.png"
             alt />
        <div>女方信息</div>
      </ta-col>
      <div class="equally">
        <ta-checkbox @change="chradio">同男方住址</ta-checkbox>
      </div>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="12">
        <ta-form-item label="男方姓名"
                      fieldDecoratorId="name"
                      :require="{message:'请输入男方姓名!'}">
          <ta-input disabled
                    placeholder="请输入男方姓名" />
        </ta-form-item>
        <ta-form-item label="身份类别"
                      fieldDecoratorId="name"
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
        <ta-form-item label="身份证号"
                      fieldDecoratorId="name"
                      :require="{message:'请输入身份证号!'}">
          <ta-input disabled
                    placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item label="证件类型"
                      fieldDecoratorId="name"
                      :require="{message:'请选择证件类型!'}">
          <ta-select disabled
                     placeholder="请选择证件类型">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择出生日期!'}">
          <ta-date-picker disabled
                          style="width: 100%;"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="phone"
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
        <ta-form-item label="国籍"
                      fieldDecoratorId="phone"
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
        <ta-form-item label="职业"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择职业!'}">
          <ta-select disabled
                     placeholder="请选择职业">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="工作单位"
                      fieldDecoratorId="phone"
                      :require="{message:'请输入工作单位!'}">
          <ta-input disabled
                    placeholder="请输入工作单位" />
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
        <ta-form-item label="健康状况"
                      fieldDecoratorId="phone"
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
        <ta-form-item label="婚姻状况"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择婚姻状况!'}">
          <ta-select disabled
                     placeholder="请选择婚姻状况">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="phone"
                      :require="{message:'请输入联系电话!'}"
                      :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的手机号码不合法'}]}">
          <ta-input disabled
                    placeholder="请输入联系电话" />
        </ta-form-item>
      </ta-col>

      <ta-col :span="12">
        <ta-form-item label="女方姓名"
                      fieldDecoratorId="name"
                      :require="{message:'请输入女方姓名!'}">
          <ta-input disabled
                    placeholder="请输入女方姓名" />
        </ta-form-item>
        <ta-form-item label="身份类别"
                      fieldDecoratorId="name"
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
        <ta-form-item label="身份证号"
                      fieldDecoratorId="name"
                      :require="{message:'请输入身份证号!'}">
          <ta-input disabled
                    placeholder="请输入身份证号" />
        </ta-form-item>
        <ta-form-item label="证件类型"
                      fieldDecoratorId="name"
                      :require="{message:'请选择证件类型!'}">
          <ta-select disabled
                     placeholder="请选择证件类型">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="出生日期"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择出生日期!'}">
          <ta-date-picker disabled
                          style="width: 100%;"
                          placeholder="请选择出生日期" />
        </ta-form-item>
        <ta-form-item label="民族"
                      fieldDecoratorId="phone"
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
        <ta-form-item label="国籍"
                      fieldDecoratorId="phone"
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
        <ta-form-item label="职业"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择职业!'}">
          <ta-select disabled
                     placeholder="请选择职业">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="工作单位"
                      fieldDecoratorId="phone"
                      :require="{message:'请输入工作单位!'}">
          <ta-input disabled
                    placeholder="请输入工作单位" />
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
        <ta-form-item label="健康状况"
                      fieldDecoratorId="phone"
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
        <ta-form-item label="婚姻状况"
                      fieldDecoratorId="phone"
                      :require="{message:'请选择婚姻状况!'}">
          <ta-select disabled
                     placeholder="请选择婚姻状况">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
        <ta-form-item label="联系电话"
                      fieldDecoratorId="phone"
                      :require="{message:'请输入联系电话!'}"
                      :fieldDecoratorOptions="{rules: [{ phone: 'mobile', message: '输入的手机号码不合法'}]}">
          <ta-input disabled
                    placeholder="请输入联系电话" />
        </ta-form-item>
      </ta-col>
    </ta-row>
    <ta-row class="frominadd">
      <ta-col :span="12">
        <ta-form-item label="地址"
                      fieldDecoratorId="name"
                      :require="{message:'请选择地址!'}">
          <ta-cascader :options="address"
                       placeholder="请选择地址"
                       :disabled="isDisabled" />
          <ta-input disabled
                    placeholder="请输入详细地址" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="12">
        <ta-form-item label="地址"
                      fieldDecoratorId="name"
                      :require="{message:'请选择性别!'}">
          <ta-cascader :options="address"
                       placeholder="请选择地址"
                       :disabled="isDisabled" />
          <ta-input disabled
                    placeholder="请输入详细地址" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="家庭年收入"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      fieldDecoratorId="cascader">
          <ta-input disabled
                    placeholder="请输入家庭年收入" />
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="与被收养人关系"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 9 }"
                      fieldDecoratorId="cascader">
          <ta-select disabled
                     placeholder="请选择与被收养人关系">
            <ta-select-option value="jack">Jack</ta-select-option>
            <ta-select-option value="lucy">Lucy</ta-select-option>
            <ta-select-option value="disabled"
                              :disabled="true">Disabled</ta-select-option>
            <ta-select-option value="Yiminghe">yiminghe</ta-select-option>
          </ta-select>
        </ta-form-item>
      </ta-col>
      <ta-col :span="24">
        <ta-form-item label="送养人意见"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 21 }"
                      fieldDecoratorId="cascader">
          <ta-textarea disabled
                       placeholder="请输入送养人意见"
                       :rows="1" />
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
      isDisabled: false,
      isequally: false
    }
  },
  methods: {
    chradio (e) {
      console.log(e.target.checked)
    }
  }
}
</script>
<style scoped lang="less">
.fromintop {
  margin: 20px 0;
  position: relative;
}
.equally {
  position: absolute;
  position: absolute;
  right: 40px;
  top: 50%;
  margin-top: -10px;
}
.frominadd {
  margin-top: 0;
}
</style>
