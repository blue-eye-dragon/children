<template>
  <div style="height: 100%;padding-bottom: 80px;">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <h2 style="margin: 2% 0;">儿童待收养信息：</h2>
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <PublishForm :addressmodel="addressmodel"
                     :heathModel="heathModel"
                     :disabled="true"
                     @callbackByIdCard="callbackByIdCard"
                     @setheath="setheath"
					 :adptFlag="adptFlag"
                     @setaddress="setaddress"></PublishForm>

      </ta-form>
      <ta-divider />
      <h2 style="margin: 2% 0;">撤销信息：</h2>
      <ta-form layout="horizontal" :autoFormCreate="(form)=>{this.revokeForm = form}">
        <RevokeForm :disabled="true" ref="revoke"></RevokeForm>
      </ta-form>
      <div class="bom">
        <ta-button @click="returns" class="btnleft">返回</ta-button>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import PublishForm from './publishForm.vue'
import RevokeForm from './revokeForm.vue'
import moment from 'moment'
export default {
  components: {
    PublishForm,
    RevokeForm
  },
  data () {
    return {
      addressmodel: [],
      heathModel: [],
	  adptFlag: '1', //adptFlag不为空，排除该福利机构下已送样的和做过收养登记的儿童信息
      id: '', // 列表跳转传过来的id
      flag: '' // 列表跳转传过来的flag
    }
  },
  activated () {
    this.initDatas()
  },
  mounted () {
  },
  methods: {
    // 初始化数据
    initDatas () {
      this.flag = this.$route.query.flag
      this.id = this.$route.query.id

      // 发布的
      this.post('/childrenToBeAdoptedAdd/queryById', { id: this.id, editYOrN: '0' }).then((res) => {
        if (res.serviceSuccess) {
          let { data } = res.data
          data['birthday'] = data.birthday ? moment(data.birthday) : null
          data['releaseDate'] = data.releaseDate ? moment(data.releaseDate) : null
          this.$nextTick(() => {
            this.form.setFieldsValue(data)
          })

          this.addressmodel = [
            data.province || '',
            data.city || '',
            data.country || ''
          ]
          this.heathModel = data.health ? data.health.split(',') : ''
        }
      })
      // 撤销的
      this.post('/childSeekingToBeAdopted/queryById', { id: this.id }).then((res) => {
        if (res.serviceSuccess) {
          let data = res.data.data.childSeekingRevokeVo
          this.$refs.revoke.selectValue = data.revokeReason
          data['deathDate'] = data.deathDate ? moment(data.deathDate) : null
          data['adopetDate'] = data.adopetDate ? moment(data.adopetDate) : null
          data['revokeDate'] = data.revokeDate ? moment(data.revokeDate) : null
          this.$nextTick(() => {
            this.revokeForm.setFieldsValue(data)
          })
        }
      })
    },
    // 返回
    returns () {
      // 重置表单数据
      this.form.resetFields()
      this.$router.go(-1)
    },
    // 提交
    submit (e) {
      let _self = this
      let form = _self.form.getFieldsValue()
      let url = '/childrenToBeAdoptedAdd/save'
      if (e == '2') { // 发布
        url = ''
      }
      if (this.flag == 'edit') {
        url = '/childrenToBeAdoptedAdd/update'
        form['id'] = _self.id
      }
      _self.form.validateFields((err, values) => {
        if (!err) {
          form['birthday'] = form.birthday ? moment(form.birthday).format('YYYY-MM-DD') : null
          form['province'] = form.address_Linkage instanceof Array ? form.address_Linkage[0] : null
          form['city'] = form.address_Linkage instanceof Array ? form.address_Linkage[1] : null
          form['country'] = form.address_Linkage instanceof Array ? form.address_Linkage[2] : null
          delete form.address_Linkage
          // 健康状况处理
          form['health'] = form.healths ? form.healths.join(',') : ''
          _self.post(url, form, true).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息保存成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('请填写必填信息！')
        }
      })
    },
    // 根据身份证号回显性别、年龄、生日
    callbackByIdCard (sex, age, birth) {
      this.form.setFieldsValue({
        sex: sex,
        birthday: birth ? moment(birth) : null
      })
    },
    // 健康状况传值
    setheath () {
      this.form.setFieldsValue({
        healths: this.heathModel
      })
    },
    // 地址传值
    setaddress () {
      this.form.setFieldsValue({
        address_Linkage: this.addressmodel
      })
    }
  }
}
</script>
<style scoped>
</style>
