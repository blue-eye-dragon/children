<template>
  <div style="height: 100%;padding-bottom: 80px;">
    <ta-border-layout :header-cfg="{showBorder:false}"
                      :layout="{header:'0px'}">
      <ta-form layout="horizontal"
               :autoFormCreate="(form)=>{this.form = form}">
        <RevokeForm :disabled="disabled"
                    ref="revoke"></RevokeForm>
      </ta-form>
      <div class="bom">
        <ta-button @click="returns"
                   class="btnleft">返回</ta-button>
        <ta-button type="primary"
                   @click="submit()"
                   v-if="!disabled"
                   class="btnleft temporarystorage">提交</ta-button>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import RevokeForm from './revokeForm.vue'
import moment from 'moment'
export default {
  components: {
    RevokeForm
  },
  data () {
    return {
      disabled: false,

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
      this.disabled = false
      this.flag = this.$route.query.flag
      this.id = this.$route.query.id
      // 编辑或查看数据回显
      if (this.flag != 'add') {
        if (this.flag == 'look') {
          this.disabled = true
        }
        this.post('/childrenToBeAdoptedAdd/queryById', { id: this.id }).then((res) => {
          if (res.serviceSuccess) {
            let { data } = res.data
            data['birthday'] = data.birthday ? moment(data.birthday) : null
            this.form.setFieldsValue(data)
          }
        })
      }
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
      let url = '/childrenToBeAdoptedAdd/revokeReleaseData'
      _self.form.validateFields((err, values) => {
        let selectValue = this.$refs.revoke.selectValue
        if (err) {
          switch (selectValue) {
            case this.Enum.REVOKEREASON.BSY:
              delete err.deathDate
              break
            case this.Enum.REVOKEREASON.ETSW:
              delete err.adopetDate
              break
          }
        }
        if (!err || Object.keys(err).length == 0) {
          form['deathDate'] = form.deathDate ? moment(form.deathDate).format('YYYY-MM-DD') : null
          form['adopetDate'] = form.adopetDate ? moment(form.adopetDate).format('YYYY-MM-DD') : null
          form['tobeAdoptedId'] = this.id
          _self.post(url, form, true).then((res) => {
            if (res.serviceSuccess) {
              _self.$message.success('信息撤销成功！')
              _self.returns()
            }
          })
        } else {
          _self.$message.error('请填写必填信息！')
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
