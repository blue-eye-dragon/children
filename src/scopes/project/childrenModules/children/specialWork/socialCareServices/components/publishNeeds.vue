<template>
  <div class="padbottom conts ">
    <div class="contin">
      <div>
        <h3>需求信息</h3>
        <ta-divider style="margin: 10px 0;" />
      </div>
      <div>
        <ta-form layout="horizontal"
                 :autoFormCreate="(form)=>{this.form = form}">
          <ta-row class="fromcom">
            <ta-col :span="10">
              <ta-form-item label="经办人"
                            fieldDecoratorId="agent"
                            :fieldDecoratorOptions="verificationRules('经办人',20)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入经办人'" />
              </ta-form-item>
              <ta-form-item label="经办人联系电话"
                            fieldDecoratorId="agentPhone"
                            :fieldDecoratorOptions="verificationRules('经办人联系电话',{type: 'phone'})">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入经办人联系电话'" />
              </ta-form-item>
              <ta-form-item label="需求量"
                            fieldDecoratorId="demandTotal">
                <ta-input-number :min="0"
                                 :max="9999999"
                                 :precision="0"
                                 style="width:100%"
                                 :disabled="disabled"
                                 :placeholder="disabled?'':'请输入需求量'" />
              </ta-form-item>
            </ta-col>
            <ta-col :span="10">
              <ta-form-item label="部门名称"
                            fieldDecoratorId="departmentName"
                            :fieldDecoratorOptions="verificationRules('部门名称',30)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入部门名称'" />
              </ta-form-item>
              <ta-form-item label="经办人职务"
                            fieldDecoratorId="agentOffice"
                            :fieldDecoratorOptions="verificationRules('经办人职务',15)">
                <ta-input :disabled='disabled'
                          :placeholder="disabled?'':'请输入经办人职务'" />
              </ta-form-item>
              <ta-form-item label="需求类型"
                            :require="{message:'请输入需求类型'}"
                            fieldDecoratorId="demandType">
                <ta-select :placeholder="disabled?'':'请选择需求类型'"
                           :disabled="disabled">
                  <ta-select-option v-for="(item ,index) in demandTypeList "
                                    :key="index"
                                    :value="item.value">{{item.label}}</ta-select-option>
                </ta-select>
              </ta-form-item>

            </ta-col>
            <ta-col :span="20">
              <ta-col :span="12">
                <AddressComponent :addressmodel="addressmodel"
                                  :msg="'地址'"
                                  :disabled="disabled"
                                  fileldName='addressDatas'
                                  @setaddress="setaddress"></AddressComponent>
              </ta-col>
              <ta-col :span="8">
                <ta-form-item label
                              fieldDecoratorId="detailAddress"
                              :labelCol="{ span: 0 }"
                              :wrapperCol="{ span: 23,offset:1 }"
                              :fieldDecoratorOptions="verificationRules('详细地址',30)">
                  <ta-input :placeholder="disabled?'':'请输入详细地址'"
                            :disabled="disabled" />
                </ta-form-item>
              </ta-col>
            </ta-col>
            <ta-col :span="20">
              <ta-form-item label='备注'
                            fieldDecoratorId="remark"
                            :labelCol="{ span: 3 }"
                            :wrapperCol="{ span: 21 }"
                            :fieldDecoratorOptions="verificationRulesNotMustFill('备注',65,true)">
                <ta-textarea :placeholder="disabled?'':'请输入备注'"
                             :rows="4"
                             :disabled="disabled" />
              </ta-form-item>
            </ta-col>
          </ta-row>
        </ta-form>
      </div>
    </div>
    <div class="bom">
      <ta-button @click="returns"
                 class="btnleft">返回</ta-button>
      <!-- <ta-button type="primary"
                     @click="publishOrSave('1')"
                     v-if="flag!='query'"
                     class="btnleft temporarystorage">发布</ta-button> -->
      <ta-button type="primary"
                 @click="publishOrSave('1')"
                 v-if="flag!='query'"
                 class="btnleft">保存</ta-button>
    </div>
  </div>

</template>
<script>
import AddressComponent from '@/scopes/project/common/components/addressComponent'
import moment from 'moment'
export default {
  components: {
    AddressComponent
  },
  data () {
    return {
      addressmodel: [],
      disabled: false,
      addressDatas: [], // 地址存放的数据

      demandTypeList: [], // 需求类型字典数据

      flag: '', // 页面跳转带过来的标识（发布资源：publish，继续办理：handle）
      id: '' // 页面跳转带过来的id
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
    this.getMenuDatas() // 字典数据
  },
  methods: {
    // 儿童基本信息的字典数据获取
    getMenuDatas () {
      this.getMenu('RESOURCE_TYPE', 'demandTypeList') // 获取需求类型字典数据
    },
    // 获取字典数据 code为字典编码，name为对应vue对象
    getMenu (code, name) {
      let _self = this
      _self.post('codetable/getCode', { codeType: code }).then(res => {
        if (res.serviceSuccess) {
          res.data.codeList.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value)
          })
          _self[name] = res.data.codeList
        }
      })
    },
    // 初始化数据
    initDatas () {
      let _self = this
      _self.flag = _self.$route.query.flag
      _self.id = _self.$route.query.id
      _self.disabled = false
      if (_self.flag == 'handle' || _self.flag == 'query') {
        if (_self.flag == 'query') {
          _self.disabled = true
        }
        _self.post('/socialCareService/queryDemandById', { id: _self.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data
            _self.form.setFieldsValue(data)
            _self.addressmodel = [
              data.province ? data.province : '',
              data.city ? data.city : '',
              data.county ? data.county : ''
            ]
          }
        })
      }
    },
    // 发布(1)/保存(0)
    publishOrSave (e) {
      let _self = this
      let form = _self.form.getFieldsValue()
      let url = '/socialCareService/demandSave'
      if (this.flag == 'handle') {
        url = '/socialCareService/demandUpdate'
        form['id'] = _self.id
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          form['status'] = e
          form['province'] = form.addressDatas instanceof Array ? form.addressDatas[0] : null
          form['city'] = form.addressDatas instanceof Array ? form.addressDatas[1] : null
          form['county'] = form.addressDatas instanceof Array ? form.addressDatas[2] : null

          _self.post(url, form).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息发布/保存成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('请填写必填信息！')
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.form.resetFields()
      this.fileList = []
      this.upLoadPathIds = []

      this.$router.go(-1)
    },
    // 地址传值
    setaddress () {
      this.form.setFieldsValue({
        addressDatas: this.addressmodel
      })
    }
  }
}
</script>
<style scoped>
</style>
